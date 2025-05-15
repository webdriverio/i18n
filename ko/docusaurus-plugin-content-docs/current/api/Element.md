---
id: element
title: Element 객체
---

Element 객체는 원격 사용자 에이전트의 요소를 나타내는 객체입니다. 예를 들어 브라우저 내에서 세션을 실행할 때는 [DOM 노드](https://developer.mozilla.org/en-US/docs/Web/API/Element)를, 모바일에서는 [모바일 요소](https://developer.apple.com/documentation/swift/sequence/element)를 나타냅니다. 이 객체는 [`$`](/docs/api/element/$), [`custom$`](/docs/api/element/custom$), [`react$`](/docs/api/element/react$) 또는 [`shadow$`](/docs/api/element/shadow$)와 같은 다양한 요소 쿼리 명령을 사용하여 얻을 수 있습니다.

## 속성

element 객체는 다음과 같은 속성을 가집니다:

| 이름 | 타입 | 세부 사항 |
| ---- | ---- | ------- |
| `sessionId` | `String` | 원격 서버에서 할당된 세션 ID입니다. |
| `elementId` | `String` | 프로토콜 레벨에서 요소와 상호 작용하는 데 사용할 수 있는 관련 [웹 요소 참조](https://w3c.github.io/webdriver/#elements)입니다. |
| `selector` | `String` | 요소를 쿼리하는 데 사용된 [선택자](/docs/selectors)입니다. |
| `parent` | `Object` | 요소가 브라우저에서 가져온 경우(예: `const elem = browser.$('selector')`) [Browser 객체](/docs/api/browser)이거나, 요소 범위에서 가져온 경우(예: `elem.$('selector')`) [Element 객체](/docs/api/element)입니다. |
| `options` | `Object` | 브라우저 객체가 생성된 방식에 따른 WebdriverIO [옵션](/docs/configuration)입니다. 자세한 내용은 [설정 유형](/docs/setuptypes)을 참조하세요. |

## 메소드
element 객체는 [WebDriver](/docs/api/webdriver) 프로토콜과 같은 프로토콜 섹션의 모든 메소드와 element 섹션에 나열된 명령을 제공합니다. 사용 가능한 프로토콜 명령은 세션 유형에 따라 다릅니다. 자동화된 브라우저 세션을 실행하는 경우 Appium [명령](/docs/api/appium)은 사용할 수 없으며, 그 반대의 경우도 마찬가지입니다.

추가적으로 다음과 같은 명령을 사용할 수 있습니다:

| 이름 | 매개변수 | 세부 사항 |
| ---- | ---------- | ------- |
| `addCommand` | - `commandName` (타입: `String`)<br />- `fn` (타입: `Function`) | 구성 목적으로 브라우저 객체에서 호출할 수 있는 사용자 정의 명령을 정의할 수 있습니다. [사용자 정의 명령](/docs/customcommands) 가이드에서 자세히 알아보세요. |
| `overwriteCommand` | - `commandName` (타입: `String`)<br />- `fn` (타입: `Function`) | 모든 브라우저 명령을 사용자 정의 기능으로 덮어쓸 수 있습니다. 프레임워크 사용자에게 혼란을 줄 수 있으므로 주의해서 사용하세요. [사용자 정의 명령](/docs/customcommands#overwriting-native-commands) 가이드에서 자세히 알아보세요. |

## 참고 사항

### Element 체인

WebdriverIO는 요소로 작업할 때 요소 쿼리를 단순화하고 복잡한 중첩 요소 조회를 구성하기 위한 특별한 구문을 제공합니다. element 객체를 사용하면 일반적인 쿼리 메소드를 사용하여 트리 분기 내에서 요소를 찾을 수 있으므로 다음과 같이 중첩된 요소를 가져올 수 있습니다:

```js
const header = await $('#header')
const headline = await header.$('#headline')
console.log(await headline.getText()) // "I am a headline" 출력
```

깊게 중첩된 구조에서 모든 중첩 요소를 배열에 할당한 다음 사용하는 것은 상당히 장황할 수 있습니다. 따라서 WebdriverIO에는 다음과 같이 중첩된 요소를 가져올 수 있는 연결된 요소 쿼리 개념이 있습니다:

```js
console.log(await $('#header').$('#headline').getText())
```

이것은 요소 집합을 가져올 때도 작동합니다. 예:

```js
// 두 번째 헤더 내의 세 번째 헤드라인 텍스트 가져오기
console.log(await $$('#header')[1].$$('#headline')[2].getText())
```

요소 집합으로 작업할 때 이는 특히 요소와 상호 작용하려고 할 때 유용할 수 있습니다. 따라서 다음과 같이 하는 대신:

```js
const elems = await $$('div')
const locations = await Promise.all(
    elems.map((el) => el.getLocation())
)
```

요소 체인에서 직접 배열 메소드를 호출할 수 있습니다. 예:

```js
const location = await $$('div').map((el) => el.getLocation())
```

다음과 동일합니다:

```js
const divs = await $$('div')
const location = await divs.map((el) => el.getLocation())
```

WebdriverIO는 내부적으로 비동기 반복자를 지원하는 사용자 정의 구현을 사용하므로 이러한 사용 사례에서 API의 모든 명령도 지원됩니다.

__참고:__ 모든 비동기 반복자는 콜백이 프로미스를 반환하지 않더라도 프로미스를 반환합니다. 예:

```ts
const divs = await $$('div')
console.log(divs.map((div) => div.selector)) // ❌ "Promise<string>[]" 반환
console.log(await divs.map((div) => div.selector)) // ✅ "string[]" 반환
```

### 사용자 정의 명령

자주 사용되는 워크플로우를 추상화하기 위해 브라우저 범위에 사용자 정의 명령을 설정할 수 있습니다. 자세한 내용은 [사용자 정의 명령](/docs/customcommands#adding-custom-commands) 가이드를 확인하세요.