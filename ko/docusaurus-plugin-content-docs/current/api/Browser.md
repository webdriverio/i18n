---
id: browser
title: 브라우저 객체
---

__확장:__ [EventEmitter](https://nodejs.org/api/events.html#class-eventemitter)

브라우저 객체는 브라우저나 모바일 기기를 제어하는 데 사용하는 세션 인스턴스입니다. WDIO 테스트 러너를 사용한다면, 전역 `browser` 또는 `driver` 객체를 통해 WebDriver 인스턴스에 접근하거나 [`@wdio/globals`](/docs/api/globals)를 사용하여 가져올 수 있습니다. WebdriverIO를 독립 실행 모드로 사용한다면, 브라우저 객체는 [`remote`](/docs/api/modules#remoteoptions-modifier) 메서드에 의해 반환됩니다.

세션은 테스트 러너에 의해 초기화됩니다. 세션 종료도 마찬가지로 테스트 러너 프로세스에 의해 수행됩니다.

## 속성

브라우저 객체는 다음 속성을 가집니다:

| 이름 | 타입 | 상세 내용 |
| ---- | ---- | ------- |
| `capabilities` | `Object` | 원격 서버에서 할당된 기능들.<br /><b>예시:</b><pre>\{<br />  acceptInsecureCerts: false,<br />  browserName: 'chrome',<br />  browserVersion: '105.0.5195.125',<br />  chrome: \{<br />    chromedriverVersion: '105.0.5195.52',<br />    userDataDir: '/var/folders/3_/pzc_f56j15vbd9z3r0j050sh0000gn/T/.com.google.Chrome.76HD3S'<br />  \},<br />  'goog:chromeOptions': \{ debuggerAddress: 'localhost:64679' \},<br />  networkConnectionEnabled: false,<br />  pageLoadStrategy: 'normal',<br />  platformName: 'mac os x',<br />  proxy: \{},<br />  setWindowRect: true,<br />  strictFileInteractability: false,<br />  timeouts: \{ implicit: 0, pageLoad: 300000, script: 30000 \},<br />  unhandledPromptBehavior: 'dismiss and notify',<br />  'webauthn:extension:credBlob': true,<br />  'webauthn:extension:largeBlob': true,<br />  'webauthn:virtualAuthenticators': true<br />\}</pre> |
| `requestedCapabilities` | `Object` | 원격 서버에 요청된 기능들.<br /><b>예시:</b><pre>\{ browserName: 'chrome' \}</pre>
| `sessionId` | `String` | 원격 서버에서 할당된 세션 ID. |
| `options` | `Object` | 브라우저 객체가 생성된 방식에 따른 WebdriverIO [옵션](/docs/configuration). 더 자세한 내용은 [설정 유형](/docs/setuptypes)을 참조하세요. |
| `commandList` | `String[]` | 브라우저 인스턴스에 등록된 명령 목록 |
| `isW3C` | `Boolean` | W3C 세션인지 나타냅니다 |
| `isChrome` | `Boolean` | Chrome 인스턴스인지 나타냅니다 |
| `isFirefox` | `Boolean` | Firefox 인스턴스인지 나타냅니다 |
| `isBidi` | `Boolean` | 이 세션이 Bidi를 사용하는지 나타냅니다 |
| `isSauce` | `Boolean` | 이 세션이 Sauce Labs에서 실행 중인지 나타냅니다 |
| `isMacApp` | `Boolean` | 이 세션이 네이티브 Mac 앱용으로 실행 중인지 나타냅니다 |
| `isWindowsApp` | `Boolean` | 이 세션이 네이티브 Windows 앱용으로 실행 중인지 나타냅니다 |
| `isMobile` | `Boolean` | 모바일 세션임을 나타냅니다. [모바일 플래그](#mobile-flags)에서 더 자세한 내용을 확인하세요. |
| `isIOS` | `Boolean` | iOS 세션임을 나타냅니다. [모바일 플래그](#mobile-flags)에서 더 자세한 내용을 확인하세요. |
| `isAndroid` | `Boolean` | Android 세션임을 나타냅니다. [모바일 플래그](#mobile-flags)에서 더 자세한 내용을 확인하세요. |
| `isNativeContext` | `Boolean`  | 모바일이 `NATIVE_APP` 컨텍스트에 있는지 나타냅니다. [모바일 플래그](#mobile-flags)에서 더 자세한 내용을 확인하세요. |
| `mobileContext` | `string`  | 드라이버가 현재 있는 **현재** 컨텍스트를 제공합니다. 예를 들어 `NATIVE_APP`, 안드로이드의 경우 `WEBVIEW_<packageName>` 또는 iOS의 경우 `WEBVIEW_<pid>`입니다. `driver.getContext()`에 대한 추가 WebDriver를 저장합니다. [모바일 플래그](#mobile-flags)에서 더 자세한 내용을 확인하세요. |


## 메서드

세션에 사용된 자동화 백엔드에 따라 WebdriverIO는 [브라우저 객체](/docs/api/browser)에 연결될 [프로토콜 명령](/docs/api/protocols)을 식별합니다. 예를 들어 Chrome에서 자동화된 세션을 실행하는 경우, [`elementHover`](/docs/api/chromium#elementhover)와 같은 Chromium 특정 명령에 액세스할 수 있지만 [Appium 명령](/docs/api/appium)은 사용할 수 없습니다.

또한 WebdriverIO는 [브라우저](/docs/api/browser) 또는 페이지의 [요소](/docs/api/element)와 상호 작용하는 데 사용할 것을 권장하는 편리한 메서드 세트를 제공합니다.

이 외에도 다음 명령을 사용할 수 있습니다:

| 이름 | 매개변수 | 상세 내용 |
| ---- | ---------- | ------- |
| `addCommand` | - `commandName` (타입: `String`)<br />- `fn` (타입: `Function`)<br />- `attachToElement` (타입: `boolean`) | 구성 목적으로 브라우저 객체에서 호출할 수 있는 사용자 지정 명령을 정의할 수 있습니다. [사용자 지정 명령](/docs/customcommands) 가이드에서 자세한 내용을 확인하세요. |
| `overwriteCommand` | - `commandName` (타입: `String`)<br />- `fn` (타입: `Function`)<br />- `attachToElement` (타입: `boolean`) | 모든 브라우저 명령을 사용자 지정 기능으로 재정의할 수 있습니다. 프레임워크 사용자를 혼란스럽게 할 수 있으므로 신중하게 사용하세요. [사용자 지정 명령](/docs/customcommands#overwriting-native-commands) 가이드에서 자세한 내용을 확인하세요. |
| `addLocatorStrategy` | - `strategyName` (타입: `String`)<br />- `fn` (타입: `Function`) | 사용자 지정 선택자 전략을 정의할 수 있습니다. [선택자](/docs/selectors#custom-selector-strategies) 가이드에서 자세한 내용을 확인하세요. |

## 참고 사항

### 모바일 플래그

세션이 모바일 기기에서 실행되는지 여부에 따라 테스트를 수정해야 하는 경우, 모바일 플래그에 액세스하여 확인할 수 있습니다.

예를 들어, 다음 구성이 있다고 가정해봅시다:

```js
// wdio.conf.js
export const config = {
    // ...
    capabilities: \\{
        platformName: 'iOS',
        app: 'net.company.SafariLauncher',
        udid: '123123123123abc',
        deviceName: 'iPhone',
        // ...
    }
    // ...
}
```

다음과 같이 테스트에서 이러한 플래그에 액세스할 수 있습니다:

```js
// 참고: `driver`는 `browser` 객체와 동등하지만 의미론적으로 더 정확합니다
// 어떤 전역 변수를 사용할지 선택할 수 있습니다
console.log(driver.isMobile) // 출력: true
console.log(driver.isIOS) // 출력: true
console.log(driver.isAndroid) // 출력: false
```

예를 들어, [페이지 객체](../pageobjects)에서 기기 유형에 따라 선택자를 정의하려는 경우 이 기능이 유용할 수 있습니다:

```js
// mypageobject.page.js
import Page from './page'

class LoginPage extends Page {
    // ...
    get username() {
        const selectorAndroid = 'new UiSelector().text("Cancel").className("android.widget.Button")'
        const selectorIOS = 'UIATarget.localTarget().frontMostApp().mainWindow().buttons()[0]'
        const selectorType = driver.isAndroid ? 'android' : 'ios'
        const selector = driver.isAndroid ? selectorAndroid : selectorIOS
        return $(`${selectorType}=${selector}`)
    }
    // ...
}
```

특정 기기 유형에 대해서만 특정 테스트를 실행하는 데도 이러한 플래그를 사용할 수 있습니다:

```js
// mytest.e2e.js
describe('my test', () => {
    // ...
    // Android 기기에서만 테스트 실행
    if (driver.isAndroid) {
        it('tests something only for Android', () => {
            // ...
        })
    }
    // ...
})
```

### 이벤트
브라우저 객체는 EventEmitter이며 여러 이벤트가 사용 사례에 맞게 발생합니다.

다음은 이벤트 목록입니다. 이것이 아직 사용 가능한 모든 이벤트의 전체 목록이 아님을 유의하세요.
여기에 더 많은 이벤트 설명을 추가하여 문서를 업데이트하는 데 기여해 주세요.

#### `command`

이 이벤트는 WebdriverIO가 WebDriver Classic 명령을 보낼 때마다 발생합니다. 다음 정보를 포함합니다:

- `command`: 명령 이름, 예: `navigateTo`
- `method`: 명령 요청을 보내는 데 사용된 HTTP 메서드, 예: `POST`
- `endpoint`: 명령 엔드포인트, 예: `/session/fc8dbda381a8bea36a225bd5fd0c069b/url`
- `body`: 명령 페이로드, 예: `{ url: 'https://webdriver.io' }`

#### `result`

이 이벤트는 WebdriverIO가 WebDriver Classic 명령의 결과를 받을 때마다 발생합니다. `command` 이벤트와 동일한 정보와 함께 다음 정보를 추가로 포함합니다:

- `result`: 명령 결과

#### `bidiCommand`

이 이벤트는 WebdriverIO가 WebDriver Bidi 명령을 브라우저 드라이버에 보낼 때마다 발생합니다. 다음에 대한 정보를 포함합니다:

- `method`: WebDriver Bidi 명령 메서드
- `params`: 관련 명령 매개변수 ([API](/docs/api/webdriverBidi) 참조)

#### `bidiResult`

명령이 성공적으로 실행된 경우, 이벤트 페이로드는 다음과 같습니다:

- `type`: `success`
- `id`: 명령 ID
- `result`: 명령 결과 ([API](/docs/api/webdriverBidi) 참조)

명령 오류가 발생한 경우, 이벤트 페이로드는 다음과 같습니다:

- `type`: `error`
- `id`: 명령 ID
- `error`: 오류 코드, 예: `invalid argument`
- `message`: 오류에 대한 세부 정보
- `stacktrace`: 스택 트레이스

#### `request.start`
이 이벤트는 WebDriver 요청이 드라이버로 전송되기 전에 발생합니다. 요청과 그 페이로드에 대한 정보를 포함합니다.

```ts
browser.on('request.start', (ev: RequestInit) => {
    // ...
})
```

#### `request.end`
이 이벤트는 드라이버에 대한 요청이 응답을 받으면 발생합니다. 이벤트 객체는 결과로 응답 본문을 포함하거나 WebDriver 명령이 실패한 경우 오류를 포함합니다.

```ts
browser.on('request.end', (ev: { result: unknown, error?: Error }) => {
    // ...
})
```

#### `request.retry`
재시도 이벤트는 WebdriverIO가 네트워크 문제 등으로 인해 명령을 재시도할 때 알려줄 수 있습니다. 재시도를 유발한 오류와 이미 수행된 재시도 횟수에 대한 정보를 포함합니다.

```ts
browser.on('request.retry', (ev: { error: Error, retryCount: number }) => {
    // ...
})
```

#### `request.performance`
이것은 WebDriver 수준 작업을 측정하기 위한 이벤트입니다. WebdriverIO가 WebDriver 백엔드로 요청을 보낼 때마다 이 이벤트는 다음과 같은 유용한 정보와 함께 발생합니다:

- `durationMillisecond`: 요청의 시간 지속 시간(밀리초).
- `error`: 요청이 실패한 경우 오류 객체.
- `request`: 요청 객체. URL, 메서드, 헤더 등을 찾을 수 있습니다.
- `retryCount`: `0`이면 요청이 첫 번째 시도였습니다. WebDriverIO가 내부적으로 재시도할 때 증가합니다.
- `success`: 요청이 성공했는지 여부를 나타내는 부울. `false`인 경우 `error` 속성도 함께 제공됩니다.

예시 이벤트:
```js
Object {
  "durationMillisecond": 0.01770925521850586,
  "error": [Error: Timeout],
  "request": Object { ... },
  "retryCount": 0,
  "success": false,
},
```

### 사용자 정의 명령

일반적으로 사용되는 워크플로우를 추상화하기 위해 브라우저 범위에 사용자 정의 명령을 설정할 수 있습니다. 자세한 내용은 [사용자 정의 명령](/docs/customcommands#adding-custom-commands) 가이드를 확인하세요.