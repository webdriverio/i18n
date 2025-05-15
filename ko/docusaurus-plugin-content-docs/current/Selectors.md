---
id: selectors
title: 선택자
---

[WebDriver 프로토콜](https://w3c.github.io/webdriver/)은 요소를 쿼리하기 위한 여러 선택자 전략을 제공합니다. WebdriverIO는 요소 선택을 간단하게 유지하기 위해 이를 단순화합니다. 요소를 쿼리하는 명령이 `$`와 `$$`로 호출되지만, 이들은 jQuery나 [Sizzle 선택자 엔진](https://github.com/jquery/sizzle)과는 관련이 없습니다.

다양한 선택자가 있지만, 그 중 일부만이 올바른 요소를 찾는 탄력적인 방법을 제공합니다. 예를 들어, 다음과 같은 버튼이 있다고 가정해 봅시다:

```html
<button
  id="main"
  class="btn btn-large"
  name="submission"
  role="button"
  data-testid="submit"
>
  Submit
</button>
```

다음 선택자들을 __권장하거나__ __권장하지 않습니다__:

| 선택자 | 권장 여부 | 참고 |
| -------- | ----------- | ----- |
| `$('button')` | 🚨 절대 사용하지 말 것 | 최악 - 너무 일반적이고 컨텍스트가 없음. |
| `$('.btn.btn-large')` | 🚨 절대 사용하지 말 것 | 나쁨. 스타일링과 결합됨. 변경 가능성이 높음. |
| `$('#main')` | ⚠️ 가끔씩 사용 | 더 나음. 그러나 여전히 스타일링이나 JS 이벤트 리스너와 결합됨. |
| `$(() => document.queryElement('button'))` | ⚠️ 가끔씩 사용 | 효과적인 쿼리링, 작성하기 복잡함. |
| `$('button[name="submission"]')` | ⚠️ 가끔씩 사용 | HTML 의미를 가진 `name` 속성과 결합됨. |
| `$('button[data-testid="submit"]')` | ✅ 좋음 | 추가 속성이 필요하며, 접근성과 연결되지 않음. |
| `$('aria/Submit')` 또는 `$('button=Submit')` | ✅ 항상 권장 | 최고. 사용자가 페이지와 상호작용하는 방식을 닮음. 프론트엔드의 번역 파일을 사용하여 번역이 업데이트될 때 테스트가 실패하지 않도록 하는 것이 좋습니다. |

## CSS 쿼리 선택자

달리 지정되지 않는 한, WebdriverIO는 [CSS 선택자](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors) 패턴을 사용하여 요소를 쿼리합니다. 예:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L7-L8
```

## 링크 텍스트

특정 텍스트가 포함된 앵커 요소를 가져오려면 등호(`=`) 기호로 시작하는 텍스트를 쿼리하세요.

예를 들어:

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.html#L3
```

다음과 같이 호출하여 이 요소를 쿼리할 수 있습니다:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L16-L18
```

## 부분 링크 텍스트

보이는 텍스트가 검색 값과 부분적으로 일치하는 앵커 요소를 찾으려면, 쿼리 문자열 앞에 `*=`를 사용하여 쿼리합니다(예: `*=driver`).

위 예제의 요소를 다음과 같이 호출하여 쿼리할 수도 있습니다:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L24-L26
```

__참고:__ 하나의 선택자에서 여러 선택자 전략을 혼합할 수 없습니다. 대신 여러 연결된 요소 쿼리를 사용하여 같은 목표를 달성하세요. 예:

```js
const elem = await $('header h1*=Welcome') // 작동하지 않음!!!
// 대신 다음을 사용
const elem = await $('header').$('*=driver')
```

## 특정 텍스트가 있는 요소

같은 기술을 요소에도 적용할 수 있습니다. 또한 쿼리 내에서 `.=` 또는 `.*=`를 사용하여 대소문자를 구분하지 않는 매칭을 수행할 수도 있습니다.

예를 들어, "Welcome to my Page"라는 텍스트가 있는 수준 1 제목에 대한 쿼리는 다음과 같습니다:

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.html#L2
```

다음과 같이 호출하여 이 요소를 쿼리할 수 있습니다:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/13eddfac6f18a2a4812cc09ed7aa5e468f392060/selectors/example.js#L35C1-L38
```

또는 부분 텍스트를 쿼리하여 사용:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/13eddfac6f18a2a4812cc09ed7aa5e468f392060/selectors/example.js#L44C9-L47
```

`id`와 `class` 이름에도 동일하게 작동합니다:

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.html#L4
```

다음과 같이 호출하여 이 요소를 쿼리할 수 있습니다:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/13eddfac6f18a2a4812cc09ed7aa5e468f392060/selectors/example.js#L49-L67
```

__참고:__ 하나의 선택자에서 여러 선택자 전략을 혼합할 수 없습니다. 대신 여러 연결된 요소 쿼리를 사용하여 같은 목표를 달성하세요. 예:

```js
const elem = await $('header h1*=Welcome') // 작동하지 않음!!!
// 대신 다음을 사용
const elem = await $('header').$('h1*=Welcome')
```

## 태그 이름

특정 태그 이름을 가진 요소를 쿼리하려면 `<tag>` 또는 `<tag />`를 사용하세요.

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.html#L5
```

다음과 같이 호출하여 이 요소를 쿼리할 수 있습니다:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L61-L62
```

## 이름 속성

특정 name 속성을 가진 요소를 쿼리하려면 일반 CSS3 선택자를 사용하거나, [JSONWireProtocol](https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol)에서 제공하는 name 전략을 사용하여 [name="some-name"]과 같은 것을 선택자 매개변수로 전달할 수 있습니다:

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.html#L6
```

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L68-L69
```

__참고:__ 이 선택자 전략은 더 이상 사용되지 않으며 JSONWireProtocol 프로토콜로 실행되는 오래된 브라우저나 Appium을 사용할 때만 작동합니다.

## xPath

특정 [xPath](https://developer.mozilla.org/en-US/docs/Web/XPath)를 통해 요소를 쿼리하는 것도 가능합니다.

xPath 선택자는 `//body/div[6]/div[1]/span[1]`과 같은 형식을 가집니다.

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/xpath.html
```

다음과 같이 호출하여 두 번째 단락을 쿼리할 수 있습니다:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L75-L76
```

xPath를 사용하여 DOM 트리를 위아래로 탐색할 수도 있습니다:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L78-L79
```

## 접근성 이름 선택자

접근성 이름으로 요소를 쿼리합니다. 접근성 이름은 해당 요소가 포커스를 받을 때 스크린 리더가 발표하는 내용입니다. 접근성 이름의 값은 시각적 콘텐츠나 숨겨진 텍스트 대안 모두가 될 수 있습니다.

:::info

이 선택자에 대한 자세한 내용은 [릴리스 블로그 포스트](/blog/2022/09/05/accessibility-selector)에서 읽을 수 있습니다.

:::

### `aria-label`로 가져오기

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/aria.html#L1
```

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L86-L87
```

### `aria-labelledby`로 가져오기

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/aria.html#L2-L3
```

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L93-L94
```

### 내용으로 가져오기

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/aria.html#L4
```

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L100-L101
```

### 제목으로 가져오기

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/aria.html#L5
```

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L107-L108
```

### `alt` 속성으로 가져오기

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/aria.html#L6
```

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L114-L115
```

## ARIA - 역할 속성

[ARIA 역할](https://www.w3.org/TR/html-aria/#docconformance)을 기반으로 요소를 쿼리하려면, 선택자 매개변수로 `[role=button]`과 같이 요소의 역할을 직접 지정할 수 있습니다:

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/aria.html#L13
```

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L131-L132
```

## ID 속성

로케이터 전략 "id"는 WebDriver 프로토콜에서 지원되지 않습니다. ID를 사용하여 요소를 찾으려면 CSS 또는 xPath 선택자 전략을 대신 사용해야 합니다.

그러나 일부 드라이버(예: [Appium You.i Engine Driver](https://github.com/YOU-i-Labs/appium-youiengine-driver#selector-strategies))는 여전히 이 선택자를 [지원](https://github.com/YOU-i-Labs/appium-youiengine-driver#selector-strategies)할 수 있습니다.

현재 지원되는 ID 선택자 구문은 다음과 같습니다:

```js
//css 로케이터
const button = await $('#someid')
//xpath 로케이터
const button = await $('//*[@id="someid"]')
//id 전략
// 참고: Appium 또는 "ID" 로케이터 전략을 지원하는 유사한 프레임워크에서만 작동
const button = await $('id=resource-id/iosname')
```

## JS 함수

웹 네이티브 API를 사용하여 JavaScript 함수로 요소를 가져올 수도 있습니다. 물론 웹 컨텍스트 내에서만(예: `browser` 또는 모바일의 웹 컨텍스트) 이 작업을 수행할 수 있습니다.

다음과 같은 HTML 구조가 있다고 가정합시다:

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/js.html
```

다음과 같이 `#elem`의 형제 요소를 쿼리할 수 있습니다:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L139-L143
```

## 딥 선택자

:::warning

WebdriverIO의 `v9`부터는 자동으로 Shadow DOM을 통과하므로 이 특별한 선택자가 필요하지 않습니다. 선택자 앞에 있는 `>>>`를 제거하여 이 선택자에서 마이그레이션하는 것이 좋습니다.

:::

많은 프론트엔드 애플리케이션이 [shadow DOM](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_shadow_DOM)이 있는 요소에 크게 의존합니다. 해결책 없이는 shadow DOM 내의 요소를 쿼리하는 것은 기술적으로 불가능합니다. [`shadow$`](https://webdriver.io/docs/api/element/shadow$)와 [`shadow$$`](https://webdriver.io/docs/api/element/shadow$$)는 [한계](https://github.com/Georgegriff/query-selector-shadow-dom#how-is-this-different-to-shadow)가 있는 해결책이었습니다. 딥 선택자를 사용하면 이제 일반 쿼리 명령을 사용하여 shadow DOM 내의 모든 요소를 쿼리할 수 있습니다.

다음과 같은 구조의 애플리케이션이 있다고 가정해 봅시다:

![Chrome Example](https://github.com/Georgegriff/query-selector-shadow-dom/raw/main/Chrome-example.png "Chrome Example")

이 선택자를 사용하면 다른 shadow DOM 내에 중첩된 `<button />` 요소를 쿼리할 수 있습니다. 예:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L147-L149
```

## 모바일 선택자

하이브리드 모바일 테스트의 경우, 명령을 실행하기 전에 자동화 서버가 올바른 *컨텍스트*에 있는 것이 중요합니다. 제스처를 자동화하려면 드라이버가 네이티브 컨텍스트로 설정되어야 합니다. 그러나 DOM에서 요소를 선택하려면 드라이버가 플랫폼의 웹뷰 컨텍스트로 설정되어야 합니다. 그래야만 위에서 언급한 메서드를 사용할 수 있습니다.

네이티브 모바일 테스트의 경우 컨텍스트 간의 전환이 없으며, 모바일 전략을 사용하고 기본 디바이스 자동화 기술을 직접 사용해야 합니다. 이는 테스트에서 요소를 찾기 위한 세밀한 제어가 필요할 때 특히 유용합니다.

### Android UiAutomator

Android의 UI Automator 프레임워크는 요소를 찾는 여러 방법을 제공합니다. [UI Automator API](https://developer.android.com/tools/testing-support-library/index.html#uia-apis), 특히 [UiSelector 클래스](https://developer.android.com/reference/androidx/test/uiautomator/UiSelector)를 사용하여 요소를 찾을 수 있습니다. Appium에서는 Java 코드를 문자열로 서버에 전송하고, 서버는 이를 애플리케이션 환경에서 실행하여 요소를 반환합니다.

```js
const selector = 'new UiSelector().text("Cancel").className("android.widget.Button")'
const button = await $(`android=${selector}`)
await button.click()
```

### Android DataMatcher 및 ViewMatcher (Espresso만 해당)

Android의 DataMatcher 전략은 [Data Matcher](https://developer.android.com/reference/android/support/test/espresso/DataInteraction)로 요소를 찾는 방법을 제공합니다.

```js
const menuItem = await $({
  "name": "hasEntry",
  "args": ["title", "ViewTitle"]
})
await menuItem.click()
```

마찬가지로 [View Matcher](https://developer.android.com/reference/android/support/test/espresso/ViewInteraction)

```js
const menuItem = await $({
  "name": "hasEntry",
  "args": ["title", "ViewTitle"],
  "class": "androidx.test.espresso.matcher.ViewMatchers"
})
await menuItem.click()
```

### Android View Tag (Espresso만 해당)

뷰 태그 전략은 [태그](https://developer.android.com/reference/android/support/test/espresso/matcher/ViewMatchers.html#withTagValue%28org.hamcrest.Matcher%3Cjava.lang.Object%3E%29)로 요소를 찾는 편리한 방법을 제공합니다.

```js
const elem = await $('-android viewtag:tag_identifier')
await elem.click()
```

### iOS UIAutomation

iOS 애플리케이션을 자동화할 때, Apple의 [UI Automation 프레임워크](https://developer.apple.com/library/prerelease/tvos/documentation/DeveloperTools/Conceptual/InstrumentsUserGuide/UIAutomation.html)를 사용하여 요소를 찾을 수 있습니다.

이 JavaScript [API](https://developer.apple.com/library/ios/documentation/DeveloperTools/Reference/UIAutomationRef/index.html#//apple_ref/doc/uid/TP40009771)는 뷰와 그 위의 모든 것에 접근하는 메서드를 제공합니다.

```js
const selector = 'UIATarget.localTarget().frontMostApp().mainWindow().buttons()[0]'
const button = await $(`ios=${selector}`)
await button.click()
```

Appium에서 iOS UI Automation 내에서 predicate 검색을 사용하여 요소 선택을 더욱 세분화할 수도 있습니다. 자세한 내용은 [여기](https://github.com/appium/appium/blob/master/docs/en/writing-running-appium/ios/ios-predicate.md)를 참조하세요.

### iOS XCUITest predicate 문자열 및 클래스 체인

iOS 10 이상(`XCUITest` 드라이버 사용)에서는 [predicate 문자열](https://github.com/facebook/WebDriverAgent/wiki/Predicate-Queries-Construction-Rules)을 사용할 수 있습니다:

```js
const selector = `type == 'XCUIElementTypeSwitch' && name CONTAINS 'Allow'`
const switch = await $(`-ios predicate string:${selector}`)
await switch.click()
```

그리고 [클래스 체인](https://github.com/facebook/WebDriverAgent/wiki/Class-Chain-Queries-Construction-Rules):

```js
const selector = '**/XCUIElementTypeCell[`name BEGINSWITH "D"`]/**/XCUIElementTypeButton'
const button = await $(`-ios class chain:${selector}`)
await button.click()
```

### Accessibility ID

`accessibility id` 로케이터 전략은 UI 요소에 대한 고유 식별자를 읽기 위해 설계되었습니다. 이는 지역화나 텍스트를 변경할 수 있는 다른 프로세스 중에 변경되지 않는 이점이 있습니다. 또한 요소가 기능적으로 동일한 경우 크로스 플랫폼 테스트를 만드는 데 도움이 될 수 있습니다.

- iOS의 경우 이는 Apple에서 [여기](https://developer.apple.com/library/prerelease/ios/documentation/UIKit/Reference/UIAccessibilityIdentification_Protocol/index.html)에 설명된 `accessibility identifier`입니다.
- Android의 경우 `accessibility id`는 [여기](https://developer.android.com/training/accessibility/accessible-app.html)에 설명된 대로 요소의 `content-description`에 매핑됩니다.

두 플랫폼 모두에서 `accessibility id`로 요소(또는 여러 요소)를 가져오는 것이 일반적으로 가장 좋은 방법입니다. 또한 더 이상 사용되지 않는 `name` 전략보다 선호되는 방식입니다.

```js
const elem = await $('~my_accessibility_identifier')
await elem.click()
```

### 클래스 이름

`class name` 전략은 현재 보기의 UI 요소를 나타내는 `string`입니다.

- iOS의 경우 [UIAutomation 클래스](https://developer.apple.com/library/prerelease/tvos/documentation/DeveloperTools/Conceptual/InstrumentsUserGuide/UIAutomation.html)의 전체 이름이며, 텍스트 필드의 경우 `UIATextField`와 같이 `UIA-`로 시작합니다. 전체 참조는 [여기](https://developer.apple.com/library/ios/navigation/#section=Frameworks&topic=UIAutomation)에서 찾을 수 있습니다.
- Android의 경우 [UI Automator](https://developer.android.com/tools/testing-support-library/index.html#UIAutomator) [클래스](https://developer.android.com/reference/android/widget/package-summary.html)의 정규화된 이름으로, 텍스트 필드의 경우 `android.widget.EditText`와 같습니다. 전체 참조는 [여기](https://developer.android.com/reference/android/widget/package-summary.html)에서 찾을 수 있습니다.
- Youi.tv의 경우 Youi.tv 클래스의 전체 이름이며, 푸시 버튼 요소의 경우 `CYIPushButtonView`와 같이 `CYI-`로 시작합니다. 전체 참조는 [You.i Engine Driver의 GitHub 페이지](https://github.com/YOU-i-Labs/appium-youiengine-driver)에서 찾을 수 있습니다.

```js
// iOS 예제
await $('UIATextField').click()
// Android 예제
await $('android.widget.DatePicker').click()
// Youi.tv 예제
await $('CYIPushButtonView').click()
```

## 체인 선택자

쿼리에서 더 구체적인 내용을 원한다면, 올바른 요소를 찾을 때까지 선택자를 연결할 수 있습니다. 실제 명령 전에 `element`를 호출하면 WebdriverIO는 해당 요소에서 쿼리를 시작합니다.

예를 들어, 다음과 같은 DOM 구조가 있다면:

```html
<div class="row">
  <div class="entry">
    <label>Product A</label>
    <button>Add to cart</button>
    <button>More Information</button>
  </div>
  <div class="entry">
    <label>Product B</label>
    <button>Add to cart</button>
    <button>More Information</button>
  </div>
  <div class="entry">
    <label>Product C</label>
    <button>Add to cart</button>
    <button>More Information</button>
  </div>
</div>
```

그리고 제품 B를 장바구니에 추가하려면, CSS 선택자만으로는 이 작업을 수행하기 어려울 수 있습니다.

선택자 체이닝을 사용하면 훨씬 쉽습니다. 단계별로 원하는 요소를 좁혀 나가기만 하면 됩니다:

```js
await $('.row .entry:nth-child(2)').$('button*=Add').click()
```

### Appium 이미지 선택자

`-image` 로케이터 전략을 사용하면 접근하려는 요소를 나타내는 이미지 파일을 Appium에 보낼 수 있습니다.

지원되는 파일 형식: `jpg,png,gif,bmp,svg`

전체 참조는 [여기](https://github.com/appium/appium/blob/master/packages/images-plugin/docs/find-by-image.md)에서 찾을 수 있습니다.

```js
const elem = await $('./file/path/of/image/test.jpg')
await elem.click()
```

**참고**: Appium이 이 선택자와 작동하는 방식은 내부적으로 (앱)스크린샷을 만들고 제공된 이미지 선택자를 사용하여 해당 (앱)스크린샷에서 요소를 찾을 수 있는지 확인하는 것입니다.

Appium이 촬영한 (앱)스크린샷의 크기를 조정하여 (앱)화면의 CSS 크기와 일치시킬 수 있다는 점에 유의하세요(이는 iPhone에서 발생하며 DPR이 1보다 큰 Retina 디스플레이가 있는 Mac 기기에서도 발생함). 제공된 이미지 선택자가 원본 스크린샷에서 가져왔을 수 있기 때문에 일치하는 항목을 찾지 못하는 결과가 될 수 있습니다.
Appium 서버 설정을 업데이트하여 이 문제를 해결할 수 있습니다. 설정에 대해서는 [Appium 문서](https://github.com/appium/appium/blob/master/packages/images-plugin/docs/find-by-image.md#related-settings)를 참조하고, 자세한 설명은 [이 댓글](https://github.com/webdriverio/webdriverio/issues/6097#issuecomment-726675579)을 참조하세요.

## React 선택자

WebdriverIO는 컴포넌트 이름을 기반으로 React 컴포넌트를 선택하는 방법을 제공합니다. 이를 위해 `react$`와 `react$$` 두 가지 명령 중 하나를 선택할 수 있습니다.

이러한 명령을 사용하면 [React VirtualDOM](https://reactjs.org/docs/faq-internals.html)에서 컴포넌트를 선택하고 단일 WebdriverIO 요소 또는 요소 배열을 반환할 수 있습니다(사용된 함수에 따라 다름).

**참고**: `react$`와 `react$$` 명령은 기능이 유사하지만, `react$$`는 *모든* 일치하는 인스턴스를 WebdriverIO 요소 배열로 반환하고, `react$`는 첫 번째로 찾은 인스턴스를 반환합니다.

#### 기본 예제

```jsx
// index.jsx
import React from 'react'
import ReactDOM from 'react-dom'

function MyComponent() {
    return (
        <div>
            MyComponent
        </div>
    )
}

function App() {
    return (<MyComponent />)
}

ReactDOM.render(<App />, document.querySelector('#root'))
```

위 코드에서는 애플리케이션 내에 간단한 `MyComponent` 인스턴스가 있으며, React는 이를 `id="root"`인 HTML 요소 내에 렌더링합니다.

`browser.react$` 명령을 사용하여 `MyComponent` 인스턴스를 선택할 수 있습니다:

```js
const myCmp = await browser.react$('MyComponent')
```

이제 `myCmp` 변수에 WebdriverIO 요소가 저장되었으므로, 이에 대해 요소 명령을 실행할 수 있습니다.

#### 컴포넌트 필터링

WebdriverIO가 내부적으로 사용하는 라이브러리를 통해 컴포넌트의 props 및/또는 state로 선택을 필터링할 수 있습니다. 이를 위해 브라우저 명령에 두 번째 인수로 props를 전달하거나 세 번째 인수로 state를 전달해야 합니다.

```jsx
// index.jsx
import React from 'react'
import ReactDOM from 'react-dom'

function MyComponent(props) {
    return (
        <div>
            Hello { props.name || 'World' }!
        </div>
    )
}

function App() {
    return (
        <div>
            <MyComponent name="WebdriverIO" />
            <MyComponent />
        </div>
    )
}

ReactDOM.render(<App />, document.querySelector('#root'))
```

prop `name`이 `WebdriverIO`인 `MyComponent` 인스턴스를 선택하려면 다음과 같이 명령을 실행할 수 있습니다:

```js
const myCmp = await browser.react$('MyComponent', {
    props: { name: 'WebdriverIO' }
})
```

state로 선택을 필터링하려면 `browser` 명령은 다음과 같이 보일 것입니다:

```js
const myCmp = await browser.react$('MyComponent', {
    state: { myState: 'some value' }
})
```

#### `React.Fragment` 다루기

`react$` 명령을 사용하여 React [fragments](https://reactjs.org/docs/fragments.html)를 선택할 때, WebdriverIO는 해당 컴포넌트의 노드로 컴포넌트의 첫 번째 자식을 반환합니다. `react$$`를 사용하면 선택자와 일치하는 fragments 내의 모든 HTML 노드를 포함하는 배열이 반환됩니다.

```jsx
// index.jsx
import React from 'react'
import ReactDOM from 'react-dom'

function MyComponent() {
    return (
        <React.Fragment>
            <div>
                MyComponent
            </div>
            <div>
                MyComponent
            </div>
        </React.Fragment>
    )
}

function App() {
    return (<MyComponent />)
}

ReactDOM.render(<App />, document.querySelector('#root'))
```

위 예제에서는 명령이 다음과 같이 작동합니다:

```js
await browser.react$('MyComponent') // 첫 번째 <div />에 대한 WebdriverIO 요소 반환
await browser.react$$('MyComponent') // 배열 [<div />, <div />]에 대한 WebdriverIO 요소 반환
```

**참고:** `MyComponent`의 여러 인스턴스가 있고 `react$$`를 사용하여 이러한 fragment 컴포넌트를 선택하면, 모든 노드가 1차원 배열로 반환됩니다. 즉, 3개의 `<MyComponent />` 인스턴스가 있는 경우 6개의 WebdriverIO 요소로 구성된 배열이 반환됩니다.

## 사용자 정의 선택자 전략


앱이 요소를 가져오는 특정 방법을 요구하는 경우, `custom$`와 `custom$$`로 사용할 수 있는 사용자 정의 선택자 전략을 직접 정의할 수 있습니다. 이를 위해 테스트 시작 부분, 예를 들어 `before` 훅에서 전략을 한 번 등록하세요:

```js reference
https://github.com/webdriverio/example-recipes/blob/f5730428ec3605e856e90bf58be17c9c9da891de/queryElements/customStrategy.js#L2-L11
```

다음과 같은 HTML 스니펫이 주어졌을 때:

```html reference
https://github.com/webdriverio/example-recipes/blob/f5730428ec3605e856e90bf58be17c9c9da891de/queryElements/example.html#L8-L12
```

다음과 같이 호출하여 사용할 수 있습니다:

```js reference
https://github.com/webdriverio/example-recipes/blob/f5730428ec3605e856e90bf58be17c9c9da891de/queryElements/customStrategy.js#L16-L19
```

**참고:** 이는 [`execute`](/docs/api/browser/execute) 명령을 실행할 수 있는 웹 환경에서만 작동합니다.