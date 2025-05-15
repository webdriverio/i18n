---
id: async-migration
title: 동기식에서 비동기식으로
---

V8의 변경 사항으로 인해 WebdriverIO 팀은 2023년 4월까지 동기식 명령 실행을 폐지할 것을 [발표했습니다](https://webdriver.io/blog/2021/07/28/sync-api-deprecation). 팀은 전환을 최대한 쉽게 만들기 위해 열심히 노력해 왔습니다. 이 가이드에서는 테스트 스위트를 동기식에서 비동기식으로 점진적으로 마이그레이션하는 방법을 설명합니다. 예제 프로젝트로 [Cucumber Boilerplate](https://github.com/webdriverio/cucumber-boilerplate)를 사용하지만 접근 방식은 다른 모든 프로젝트에서도 동일합니다.

## JavaScript의 프로미스

WebdriverIO에서 동기식 실행이 인기 있었던 이유는 프로미스 처리의 복잡성을 제거했기 때문입니다. 특히 이러한 개념이 이런 방식으로 존재하지 않는 다른 언어에서 온 경우, 처음에는 혼란스러울 수 있습니다. 그러나 프로미스는 비동기 코드를 다루는 매우 강력한 도구이며, 오늘날의 JavaScript는 실제로 이를 쉽게 다룰 수 있게 합니다. 프로미스를 사용해 본 적이 없다면, 여기서 설명하기에는 범위를 벗어나기 때문에 [MDN 참조 가이드](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)를 확인하는 것이 좋습니다.

## 비동기 전환

WebdriverIO 테스트러너는 동일한 테스트 스위트 내에서 비동기 및 동기 실행을 모두 처리할 수 있습니다. 이는 테스트와 PageObject를 자신의 속도에 맞게 단계별로 천천히 마이그레이션할 수 있음을 의미합니다. 예를 들어, Cucumber Boilerplate는 프로젝트에 복사할 수 있는 [대규모 스텝 정의 세트](https://github.com/webdriverio/cucumber-boilerplate/tree/main/src/support/action)를 정의했습니다. 한 번에 하나의 스텝 정의 또는 하나의 파일을 마이그레이션할 수 있습니다.

:::tip

WebdriverIO는 동기 코드를 거의 완전 자동으로 비동기 코드로 변환할 수 있는 [codemod](https://github.com/webdriverio/codemod)를 제공합니다. 문서에 설명된 대로 codemod를 먼저 실행하고 필요한 경우 수동 마이그레이션을 위해 이 가이드를 사용하세요.

:::

많은 경우, 필요한 것은 WebdriverIO 명령을 호출하는 함수를 `async`로 만들고 모든 명령 앞에 `await`를 추가하는 것뿐입니다. 보일러플레이트 프로젝트에서 변환할 첫 번째 파일 `clearInputField.ts`를 살펴보면, 다음과 같이 변환합니다:

```ts
export default (selector: Selector) => {
    $(selector).clearValue();
};
```

에서:

```ts
export default async (selector: Selector) => {
    await $(selector).clearValue();
};
```

이게 전부입니다. 모든 재작성 예제가 포함된 전체 커밋은 여기에서 확인할 수 있습니다:

#### 커밋:

- _모든 스텝 정의 변환_ [[af6625f]](https://github.com/webdriverio/cucumber-boilerplate/pull/481/commits/af6625fcd01dc087479e84562f237ecf38b3537d)

:::info
이 전환은 TypeScript 사용 여부와 관계없이 독립적입니다. TypeScript를 사용하는 경우 `tsconfig.json`의 `types` 속성을 `webdriverio/sync`에서 `@wdio/globals/types`로 변경하세요. 또한 컴파일 대상이 최소한 `ES2018`로 설정되어 있는지 확인하세요.
:::

## 특별한 케이스

물론 더 많은 주의가 필요한 특별한 경우가 항상 있습니다.

### ForEach 루프

엘리먼트를 반복하는 등의 `forEach` 루프가 있는 경우, 반복자 콜백이 비동기 방식으로 제대로 처리되는지 확인해야 합니다. 예:

```js
const elems = $$('div')
elems.forEach((elem) => {
    elem.click()
})
```

`forEach`에 전달하는 함수는 반복자 함수입니다. 동기식 세계에서는 다음으로 넘어가기 전에 모든 요소를 클릭할 것입니다. 이를 비동기 코드로, 변환하면 모든 반복자 함수가 실행을 완료할 때까지 기다리도록 해야 합니다. `async`/`await`를 추가하면 이러한 반복자 함수는 우리가 해결해야 하는 프로미스를 반환합니다. 이제 `forEach`는 반복자 함수의 결과, 즉 우리가 기다려야 하는 프로미스를 반환하지 않기 때문에 더 이상 요소를 반복하는 데 이상적이지 않습니다. 따라서 해당 프로미스를 반환하는 `map`으로 `forEach`를 대체해야 합니다. `map`과 `find`, `every`, `reduce` 등 배열의 다른 모든 반복자 메서드는 반복자 함수 내의 프로미스를 존중하고 비동기 컨텍스트에서 사용하기 단순화되도록 구현되어 있습니다. 위의 예는 다음과 같이 변환됩니다:

```js
const elems = await $$('div')
await elems.forEach((elem) => {
    return elem.click()
})
```

예를 들어 모든 `<h3 />` 요소를 가져와 텍스트 내용을 얻으려면 다음을 실행할 수 있습니다:

```js
await browser.url('https://webdriver.io')

const h3Texts = await browser.$$('h3').map((img) => img.getText())
console.log(h3Texts);
/**
 * 반환값:
 * [
 *   'Extendable',
 *   'Compatible',
 *   'Feature Rich',
 *   'Who is using WebdriverIO?',
 *   'Support for Modern Web and Mobile Frameworks',
 *   'Google Lighthouse Integration',
 *   'Watch Talks about WebdriverIO',
 *   'Get Started With WebdriverIO within Minutes'
 * ]
 */
```

이것이 너무 복잡해 보인다면 간단한 for 루프를 사용하는 것을 고려해 볼 수 있습니다. 예:

```js
const elems = await $$('div')
for (const elem of elems) {
    await elem.click()
}
```

### WebdriverIO 어서션

WebdriverIO 어서션 헬퍼 [`expect-webdriverio`](https://webdriver.io/docs/api/expect-webdriverio)를 사용하는 경우 모든 `expect` 호출 앞에 `await`를 설정해야 합니다. 예:

```ts
expect($('input')).toHaveAttributeContaining('class', 'form')
```

다음과 같이 변환해야 합니다:

```ts
await expect($('input')).toHaveAttributeContaining('class', 'form')
```

### 동기식 PageObject 메서드와 비동기 테스트

테스트 스위트에서 동기식으로 PageObject를 작성했다면, 더 이상 비동기 테스트에서 사용할 수 없습니다. 동기 및 비동기 테스트 모두에서 PageObject 메서드를 사용해야 하는 경우, 메서드를 복제하고 두 환경 모두에 제공하는 것을 권장합니다. 예:

```js
class MyPageObject extends Page {
    /**
     * 요소 정의
     */
    get btnStart () { return $('button=Start') }
    get loadedPage () { return $('#finish') }

    someMethod () {
        // 동기 코드
    }

    someMethodAsync () {
        // MyPageObject.someMethod()의 비동기 버전
    }
}
```

마이그레이션을 완료하면 동기식 PageObject 메서드를 제거하고 이름을 정리할 수 있습니다.

PageObject 메서드의 두 가지 다른 버전을 유지하는 것이 마음에 들지 않는다면, 전체 PageObject를 비동기로 마이그레이션하고 동기 환경에서 [`browser.call`](https://webdriver.io/docs/api/browser/call)을 사용하여 메서드를 실행할 수도 있습니다. 예:

```js
// 이전:
// MyPageObject.someMethod()
// 이후:
browser.call(() => MyPageObject.someMethod())
```

`call` 명령은 다음 명령으로 이동하기 전에 비동기 `someMethod`가 해결되도록 합니다.

## 결론

[결과적인 재작성 PR](https://github.com/webdriverio/cucumber-boilerplate/pull/481/files)에서 볼 수 있듯이 이 재작성의 복잡성은 상당히 간단합니다. 한 번에 하나의 스텝 정의를 재작성할 수 있다는 것을 기억하세요. WebdriverIO는 단일 프레임워크 내에서 동기 및 비동기 실행을 완벽하게 처리할 수 있습니다.