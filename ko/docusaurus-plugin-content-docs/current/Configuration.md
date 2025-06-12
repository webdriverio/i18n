---
id: configuration
title: 구성
---

[설정 유형](/docs/setuptypes) (예: 원시 프로토콜 바인딩 사용, 독립형 패키지로서의 WebdriverIO 또는 WDIO 테스트러너)에 따라 환경을 제어하는 데 사용할 수 있는 다양한 옵션 세트가 있습니다.

## WebDriver 옵션

다음 옵션은 [`webdriver`](https://www.npmjs.com/package/webdriver) 프로토콜 패키지를 사용할 때 정의됩니다:

### protocol

드라이버 서버와 통신할 때 사용할 프로토콜입니다.

Type: `String`<br />
Default: `http`

### hostname

드라이버 서버의 호스트입니다.

Type: `String`<br />
Default: `0.0.0.0`

### port

드라이버 서버가 실행 중인 포트입니다.

Type: `Number`<br />
Default: `undefined`

### path

드라이버 서버 엔드포인트의 경로입니다.

Type: `String`<br />
Default: `/`

### queryParams

드라이버 서버로 전달되는 쿼리 매개변수입니다.

Type: `Object`<br />
Default: `undefined`

### user

클라우드 서비스 사용자 이름 ([Sauce Labs](https://saucelabs.com), [Browserstack](https://www.browserstack.com), [TestingBot](https://testingbot.com) 또는 [LambdaTest](https://www.lambdatest.com) 계정에서만 작동). 설정하면 WebdriverIO가 자동으로 연결 옵션을 설정합니다. 클라우드 제공업체를 사용하지 않는 경우, 다른 WebDriver 백엔드에 인증하는 데 사용할 수 있습니다.

Type: `String`<br />
Default: `undefined`

### key

클라우드 서비스 액세스 키 또는 비밀 키 ([Sauce Labs](https://saucelabs.com), [Browserstack](https://www.browserstack.com), [TestingBot](https://testingbot.com) 또는 [LambdaTest](https://www.lambdatest.com) 계정에서만 작동). 설정하면 WebdriverIO가 자동으로 연결 옵션을 설정합니다. 클라우드 제공업체를 사용하지 않는 경우, 다른 WebDriver 백엔드에 인증하는 데 사용할 수 있습니다.

Type: `String`<br />
Default: `undefined`

### capabilities

WebDriver 세션에서 실행하려는 기능을 정의합니다. 자세한 내용은 [WebDriver 프로토콜](https://w3c.github.io/webdriver/#capabilities)을 확인하세요. WebDriver 프로토콜을 지원하지 않는 이전 드라이버를 실행하는 경우, 세션을 성공적으로 실행하려면 [JSONWireProtocol 기능](https://github.com/SeleniumHQ/selenium/wiki/DesiredCapabilities)을 사용해야 합니다.

WebDriver 기반 기능 외에도 원격 브라우저나 장치에 대한 더 깊은 구성을 허용하는 브라우저 및 공급업체별 옵션을 적용할 수 있습니다. 이러한 옵션은 해당 공급업체 문서에 설명되어 있습니다. 예:

- `goog:chromeOptions`: [Google Chrome](https://chromedriver.chromium.org/capabilities#h.p_ID_106)용
- `moz:firefoxOptions`: [Mozilla Firefox](https://firefox-source-docs.mozilla.org/testing/geckodriver/Capabilities.html)용
- `ms:edgeOptions`: [Microsoft Edge](https://docs.microsoft.com/en-us/microsoft-edge/webdriver-chromium/capabilities-edge-options#using-the-edgeoptions-class)용
- `sauce:options`: [Sauce Labs](https://docs.saucelabs.com/dev/test-configuration-options/#desktop-and-mobile-capabilities-sauce-specific--optional)용
- `bstack:options`: [BrowserStack](https://www.browserstack.com/automate/capabilities?tag=selenium-4#)용
- `selenoid:options`: [Selenoid](https://github.com/aerokube/selenoid/blob/master/docs/special-capabilities.adoc)용

또한, Sauce Labs의 [자동화된 테스트 구성기](https://docs.saucelabs.com/basics/platform-configurator/)는 원하는 기능을 클릭하여 이 객체를 생성하는 데 도움이 되는 유용한 도구입니다.

Type: `Object`<br />
Default: `null`

**예시:**

```js
{
    browserName: 'chrome', // 옵션: `chrome`, `edge`, `firefox`, `safari`
    browserVersion: '27.0', // 브라우저 버전
    platformName: 'Windows 10' // OS 플랫폼
}
```

모바일 장치에서 웹 또는 네이티브 테스트를 실행하는 경우, `capabilities`는 WebDriver 프로토콜과 다릅니다. 자세한 내용은 [Appium 문서](https://appium.io/docs/en/latest/guides/caps/)를 참조하세요.

### logLevel

로깅 상세도 수준.

Type: `String`<br />
Default: `info`<br />
Options: `trace` | `debug` | `info` | `warn` | `error` | `silent`

### outputDir

모든 테스트러너 로그 파일(리포터 로그 및 `wdio` 로그 포함)을 저장할 디렉토리입니다. 설정하지 않으면 모든 로그가 `stdout`으로 스트리밍됩니다. 대부분의 리포터는 `stdout`에 로깅하도록 만들어졌기 때문에, 보고서를 파일로 푸시하는 것이 더 합리적인 특정 리포터(예: `junit` 리포터)에만 이 옵션을 사용하는 것이 좋습니다.

독립 실행형 모드에서 실행할 때 WebdriverIO가 생성하는 유일한 로그는 `wdio` 로그입니다.

Type: `String`<br />
Default: `null`

### connectionRetryTimeout

드라이버나 그리드에 대한 WebDriver 요청의 타임아웃입니다.

Type: `Number`<br />
Default: `120000`

### connectionRetryCount

Selenium 서버에 대한 요청 재시도의 최대 횟수입니다.

Type: `Number`<br />
Default: `3`

### agent

요청을 만들기 위해 사용자 정의 `http`/`https`/`http2` [에이전트](https://www.npmjs.com/package/got#agent)를 사용할 수 있습니다.

Type: `Object`<br />
Default:

```js
{
    http: new http.Agent({ keepAlive: true }),
    https: new https.Agent({ keepAlive: true })
}
```

### headers

모든 WebDriver 요청에 전달할 사용자 정의 `headers`를 지정합니다. Selenium Grid에 기본 인증이 필요한 경우, 이 옵션을 통해 WebDriver 요청을 인증하기 위해 `Authorization` 헤더를 전달하는 것이 좋습니다. 예:

```ts wdio.conf.ts
import { Buffer } from 'buffer';
// 환경 변수에서 사용자 이름과 비밀번호 읽기
const username = process.env.SELENIUM_GRID_USERNAME;
const password = process.env.SELENIUM_GRID_PASSWORD;

// 사용자 이름과 비밀번호를 콜론 구분자와 함께 결합
const credentials = `${username}:${password}`;
// Base64를 사용하여 자격 증명 인코딩
const encodedCredentials = Buffer.from(credentials).toString('base64');

export const config: WebdriverIO.Config = {
    // ...
    headers: {
        Authorization: `Basic ${encodedCredentials}`
    }
    // ...
}
```

Type: `Object`<br />
Default: `{}`

### transformRequest

WebDriver 요청이 이루어지기 전에 [HTTP 요청 옵션](https://github.com/sindresorhus/got#options)을 가로채는 함수

Type: `(RequestOptions) => RequestOptions`<br />
Default: *none*

### transformResponse

WebDriver 응답이 도착한 후 HTTP 응답 객체를 가로채는 함수입니다. 이 함수는 원본 응답 객체를 첫 번째 인수로, 해당 `RequestOptions`를 두 번째 인수로 전달받습니다.

Type: `(Response, RequestOptions) => Response`<br />
Default: *none*

### strictSSL

SSL 인증서가 유효해야 하는지 여부입니다.
환경 변수 `STRICT_SSL` 또는 `strict_ssl`을 통해 설정할 수 있습니다.

Type: `Boolean`<br />
Default: `true`

### enableDirectConnect

[Appium 직접 연결 기능](https://appiumpro.com/editions/86-connecting-directly-to-appium-hosts-in-distributed-environments)을 활성화할지 여부입니다.
플래그가 활성화된 상태에서 응답에 적절한 키가 없으면 아무 작업도 수행하지 않습니다.

Type: `Boolean`<br />
Default: `true`

### cacheDir

캐시 디렉토리의 루트 경로입니다. 이 디렉토리는 세션을 시작하려고 할 때 다운로드된 모든 드라이버를 저장하는 데 사용됩니다.

Type: `String`<br />
Default: `process.env.WEBDRIVER_CACHE_DIR || os.tmpdir()`

### maskingPatterns

더 안전한 로깅을 위해 `maskingPatterns`로 설정된 정규 표현식은 로그에서 민감한 정보를 난독화할 수 있습니다.
 - 문자열 형식은 플래그가 있거나 없는 정규 표현식(예: `/.../i`)이며, 여러 정규 표현식은 쉼표로 구분됩니다.
 - 마스킹 패턴에 대한 자세한 내용은 [WDIO 로거 README의 마스킹 패턴 섹션](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-logger/README.md#masking-patterns)을 참조하세요.

Type: `String`<br />
Default: `undefined`

**예시:**

```js
{
    maskingPatterns: '/--key=([^ ]*)/i,/RESULT (.*)/'
}
```

---

## WebdriverIO

다음 옵션(위에 나열된 옵션 포함)은 독립 실행형 WebdriverIO에서 사용할 수 있습니다:

### automationProtocol

브라우저 자동화에 사용할 프로토콜을 정의합니다. 현재는 [`webdriver`](https://www.npmjs.com/package/webdriver)만 지원되며, 이는 WebdriverIO가 사용하는 주요 브라우저 자동화 기술입니다.

다른 자동화 기술을 사용하여 브라우저를 자동화하려면, 다음 인터페이스를 준수하는 모듈로 해결되는 경로를 이 속성에 설정하세요:

```ts
import type { Capabilities } from '@wdio/types';
import type { Client, AttachOptions } from 'webdriver';

export default class YourAutomationLibrary {
    /**
     * 자동화 세션을 시작하고 해당 자동화 명령이 있는 WebdriverIO [모나드](https://github.com/webdriverio/webdriverio/blob/940cd30939864bdbdacb2e94ee6e8ada9b1cc74c/packages/wdio-utils/src/monad.ts)를 반환합니다. 
     * 참조 구현으로 [webdriver](https://www.npmjs.com/package/webdriver) 패키지를 참조하세요.
     *
     * @param {Capabilities.RemoteConfig} options WebdriverIO 옵션
     * @param {Function} hook 함수에서 클라이언트가 릴리스되기 전에 수정할 수 있게 해주는 훅
     * @param {PropertyDescriptorMap} userPrototype 사용자가 사용자 정의 프로토콜 명령을 추가할 수 있게 해줌
     * @param {Function} customCommandWrapper 명령 실행을 수정할 수 있게 해줌
     * @returns WebdriverIO와 호환되는 클라이언트 인스턴스
     */
    static newSession(
        options: Capabilities.RemoteConfig,
        modifier?: (...args: any[]) => any,
        userPrototype?: PropertyDescriptorMap,
        customCommandWrapper?: (...args: any[]) => any
    ): Promise<Client>;

    /**
     * 사용자가 기존 세션에 연결할 수 있도록 함
     * @optional
     */
    static attachToSession(
        options?: AttachOptions,
        modifier?: (...args: any[]) => any, userPrototype?: {},
        commandWrapper?: (...args: any[]) => any
    ): Client;

    /**
     * 새 세션에 대한 인스턴스 세션 ID와 브라우저 기능을 변경하고
     * 전달된 브라우저 객체에 직접 적용합니다.
     *
     * @optional
     * @param   {object} instance  새 브라우저 세션에서 얻은 객체
     * @returns {string}           브라우저의 새 세션 ID
     */
    static reloadSession(
        instance: Client,
        newCapabilities?: WebdriverIO.Capabilitie
    ): Promise<string>;
}
```

Type: `String`<br />
Default: `webdriver`

### baseUrl

기본 URL을 설정하여 `url` 명령 호출을 줄입니다.
- `url` 매개변수가 `/`로 시작하면 `baseUrl`이 앞에 추가됩니다(경로가 있는 경우 `baseUrl` 경로 제외).
- `url` 매개변수가 스키마나 `/` 없이 시작하면(예: `some/path`), 전체 `baseUrl`이 직접 앞에 추가됩니다.

Type: `String`<br />
Default: `null`

### waitforTimeout

모든 `waitFor*` 명령에 대한 기본 타임아웃입니다. (옵션 이름의 소문자 `f`에 주의하세요.) 이 타임아웃은 `waitFor*`로 시작하는 명령과 해당 기본 대기 시간에만 영향을 줍니다.

_테스트_에 대한 타임아웃을 늘리려면 프레임워크 문서를 참조하세요.

Type: `Number`<br />
Default: `5000`

### waitforInterval

예상 상태(예: 가시성)가 변경되었는지 확인하기 위한 모든 `waitFor*` 명령의 기본 간격입니다.

Type: `Number`<br />
Default: `100`

### region

Sauce Labs에서 실행 중인 경우, 미국 또는 EU의 다른 데이터 센터 간에 테스트를 실행하도록 선택할 수 있습니다.
지역을 EU로 변경하려면 구성에 `region: 'eu'`를 추가하세요.

__참고:__ 이는 Sauce Labs 계정에 연결된 `user`와 `key` 옵션을 제공한 경우에만 효과가 있습니다.

Type: `String`<br />
Default: `us`

*(VM 및 em/시뮬레이터에만 해당)*

---

## 테스트러너 옵션

다음 옵션(위에 나열된 옵션 포함)은 WDIO 테스트러너로 WebdriverIO를 실행할 때만 정의됩니다:

### specs

테스트 실행을 위한 스펙을 정의합니다. 한 번에 여러 파일과 일치하는 글로벌 패턴을 지정하거나, 글로벌 또는 경로 집합을 배열로 래핑하여 단일 작업자 프로세스 내에서 실행할 수 있습니다. 모든 경로는 구성 파일 경로에서 상대적으로 간주됩니다.

Type: `(String | String[])[]`<br />
Default: `[]`

### exclude

테스트 실행에서 스펙을 제외합니다. 모든 경로는 구성 파일 경로에서 상대적으로 간주됩니다.

Type: `String[]`<br />
Default: `[]`

### suites

다양한 스위트를 설명하는 객체로, `wdio` CLI에서 `--suite` 옵션으로 지정할 수 있습니다.

Type: `Object`<br />
Default: `{}`

### capabilities

위에서 설명한 `capabilities` 섹션과 동일하지만, [`multiremote`](/docs/multiremote) 객체 또는 병렬 실행을 위한 다중 WebDriver 세션을 배열로 지정할 수 있는 옵션이 있습니다.

[위](/docs/configuration#capabilities)에서 정의된 것과 동일한 공급업체 및 브라우저별 기능을 적용할 수 있습니다.

Type: `Object`|`Object[]`<br />
Default: `[{ 'wdio:maxInstances': 5, browserName: 'firefox' }]`

### maxInstances

총 병렬 실행 작업자의 최대 수입니다.

__참고:__ Sauce Labs와 같은 외부 공급업체의 머신에서 테스트가 수행되는 경우 `100`과 같이 높은 수가 될 수 있습니다. 이 경우 테스트는 단일 머신이 아닌 여러 VM에서 테스트됩니다. 테스트를 로컬 개발 머신에서 실행하는 경우 `3`, `4` 또는 `5`와 같이 더 합리적인 숫자를 사용하세요. 기본적으로 이것은 동시에 시작되어 테스트를 실행하는 브라우저의 수이므로, 머신의 RAM과 실행 중인 다른 앱에 따라 달라집니다.

`wdio:maxInstances` 기능을 사용하여 capability 객체 내에 `maxInstances`를 적용할 수도 있습니다. 이렇게 하면 해당 특정 기능에 대한 병렬 세션 수가 제한됩니다.

Type: `Number`<br />
Default: `100`

### maxInstancesPerCapability

capability당 병렬 실행 작업자의 최대 수입니다.

Type: `Number`<br />
Default: `100`

### injectGlobals

WebdriverIO의 전역(예: `browser`, `$`, `$$`)을 전역 환경에 삽입합니다.
`false`로 설정하면 `@wdio/globals`에서 가져와야 합니다. 예:

```ts
import { browser, $, $$, expect } from '@wdio/globals'
```

참고: WebdriverIO는 테스트 프레임워크별 전역 변수의 주입을 처리하지 않습니다.

Type: `Boolean`<br />
Default: `true`

### bail

특정 수의 테스트 실패 후에 테스트 실행을 중지하려면 `bail`을 사용하세요.
(기본값은 `0`으로, 모든 테스트를 실행합니다.) **참고:** 이 컨텍스트에서 테스트는 단일 스펙 파일 내의 모든 테스트(Mocha 또는 Jasmine 사용 시) 또는 기능 파일 내의 모든 단계(Cucumber 사용 시)입니다. 단일 테스트 파일 내의 테스트에 대한 bail 동작을 제어하려면 사용 가능한 [프레임워크](frameworks) 옵션을 살펴보세요.

Type: `Number`<br />
Default: `0` (중단하지 않고 모든 테스트 실행)

### specFileRetries

전체적으로 실패했을 때 전체 스펙 파일을 재시도하는 횟수입니다.

Type: `Number`<br />
Default: `0`

### specFileRetriesDelay

스펙 파일 재시도 시도 사이의 지연 시간(초)입니다.

Type: `Number`<br />
Default: `0`

### specFileRetriesDeferred

재시도된 스펙 파일을 즉시 재시도할지 또는 대기열 끝으로 연기할지 여부입니다.

Type: `Boolean`<br />
Default: `true`

### groupLogsByTestSpec

로그 출력 보기를 선택합니다.

`false`로 설정하면 다른 테스트 파일의 로그가 실시간으로 출력됩니다. 병렬로 실행할 때 다른 파일의 로그 출력이 섞일 수 있습니다.

`true`로 설정하면 로그 출력이 테스트 스펙별로 그룹화되며 테스트 스펙이 완료된 후에만 출력됩니다.

기본적으로 `false`로 설정되어 로그가 실시간으로 출력됩니다.

Type: `Boolean`<br />
Default: `false`

### autoAssertOnTestEnd

WebdriverIO가 각 테스트 종료 시 모든 소프트 어설션을 자동으로 확인하는지 여부를 제어합니다. `true`로 설정하면 누적된 소프트 어설션이 자동으로 확인되고 어떤 어설션이 실패하면 테스트가 실패합니다. `false`로 설정하면 소프트 어설션을 확인하기 위해 직접 assert 메서드를 호출해야 합니다.

Type: `Boolean`<br />
Default: `true`

### services

서비스는 사용자가 처리하고 싶지 않은 특정 작업을 대신 수행합니다. 거의 노력 없이 테스트 설정을 향상시킵니다.

Type: `String[]|Object[]`<br />
Default: `[]`

### framework

WDIO 테스트러너가 사용할 테스트 프레임워크를 정의합니다.

Type: `String`<br />
Default: `mocha`<br />
Options: `mocha` | `jasmine`

### mochaOpts, jasmineOpts and cucumberOpts

특정 프레임워크 관련 옵션입니다. 어떤 옵션이 사용 가능한지에 대한 프레임워크 어댑터 문서를 참조하세요. 이에 대한 자세한 내용은 [프레임워크](frameworks)에서 확인하세요.

Type: `Object`<br />
Default: `{ timeout: 10000 }`

### cucumberFeaturesWithLineNumbers

줄 번호가 있는 cucumber 기능 목록입니다([cucumber 프레임워크 사용 시](./Frameworks.md#using-cucumber)).

Type: `String[]`
Default: `[]`

### reporters

사용할 리포터 목록입니다. 리포터는 문자열이거나, 첫 번째 요소가 리포터 이름이 있는 문자열이고 두 번째 요소가 리포터 옵션이 있는 객체인 `['reporterName', { /* reporter options */}]` 배열일 수 있습니다.

Type: `String[]|Object[]`<br />
Default: `[]`

예시:

```js
reporters: [
    'dot',
    'spec'
    ['junit', {
        outputDir: `${__dirname}/reports`,
        otherOption: 'foobar'
    }]
]
```

### reporterSyncInterval

리포터가 로그를 비동기적으로 보고하는 경우(예: 로그가 3rd 파티 공급업체로 스트리밍되는 경우) 동기화되었는지 확인하는 간격을 결정합니다.

Type: `Number`<br />
Default: `100` (ms)

### reporterSyncTimeout

리포터가 모든 로그 업로드를 완료하는 데 걸리는 최대 시간을 결정하며, 이 시간이 지나면 테스트러너가 오류를 발생시킵니다.

Type: `Number`<br />
Default: `5000` (ms)

### execArgv

하위 프로세스를 시작할 때 지정할 Node 인수입니다.

Type: `String[]`<br />
Default: `null`

### filesToWatch

테스트러너에게 `--watch` 플래그와 함께 실행할 때 다른 파일(예: 애플리케이션 파일)도 추가로 감시하도록 지시하는 글로벌 패턴을 지원하는 문자열 목록입니다. 기본적으로 테스트러너는 이미 모든 스펙 파일을 감시합니다.

Type: `String[]`<br />
Default: `[]`

### updateSnapshots

스냅샷을 업데이트하려면 true로 설정하세요. 이상적으로 CLI 매개변수의 일부로 사용됩니다(예: `wdio run wdio.conf.js --s`).

Type: `'new' | 'all' | 'none'`<br />
Default: 제공되지 않고 테스트가 CI에서 실행되는 경우 `none`, 제공되지 않으면 `new`, 그렇지 않으면 제공된 값

### resolveSnapshotPath

기본 스냅샷 경로를 재정의합니다. 예를 들어, 테스트 파일 옆에 스냅샷을 저장합니다.

```ts title="wdio.conf.ts"
export const config: WebdriverIO.Config = {
    resolveSnapshotPath: (testPath, snapExtension) => testPath + snapExtension,
}
```

Type: `(testPath: string, snapExtension: string) => string`<br />
Default: 테스트 파일 옆의 `__snapshots__` 디렉토리에 스냅샷 파일을 저장합니다.

### tsConfigPath

WDIO는 TypeScript 파일을 컴파일하기 위해 `tsx`를 사용합니다. TSConfig는 현재 작업 디렉토리에서 자동으로 감지되지만 여기에 사용자 정의 경로를 지정하거나 TSX_TSCONFIG_PATH 환경 변수를 설정할 수 있습니다.

`tsx` 문서 참조: https://tsx.is/dev-api/node-cli#custom-tsconfig-json-path

Type: `String`<br />
Default: `null`<br />

## 훅

WDIO 테스트러너는 테스트 수명 주기의 특정 시점에 트리거되는 훅을 설정할 수 있게 해줍니다. 이를 통해 사용자 정의 작업(예: 테스트 실패 시 스크린샷 촬영)이 가능합니다.

모든 훅은 수명 주기에 대한 특정 정보(예: 테스트 스위트나 테스트에 대한 정보)를 매개변수로 가집니다. [예제 구성](https://github.com/webdriverio/webdriverio/blob/master/examples/wdio.conf.js#L183-L326)에서 모든 훅 속성에 대해 자세히 알아보세요.

**참고:** 일부 훅(`onPrepare`, `onWorkerStart`, `onWorkerEnd` 및 `onComplete`)은 다른 프로세스에서 실행되므로 작업자 프로세스에 있는 다른 훅과 전역 데이터를 공유할 수 없습니다.

### onPrepare

모든 작업자가 시작되기 전에 한 번 실행됩니다.

매개변수:

- `config` (`object`): WebdriverIO 구성 객체
- `param` (`object[]`): 기능 세부 정보 목록

### onWorkerStart

작업자 프로세스가 생성되기 전에 실행되며, 해당 작업자에 대한 특정 서비스를 초기화하고 비동기 방식으로 런타임 환경을 수정하는 데 사용할 수 있습니다.

매개변수:

- `cid` (`string`): 기능 ID(예: 0-0)
- `caps` (`object`): 작업자에서 생성될 세션에 대한 기능 포함
- `specs` (`string[]`): 작업자 프로세스에서 실행할 스펙
- `args` (`object`): 작업자가 초기화된 후 메인 구성과 병합될 객체
- `execArgv` (`string[]`): 작업자 프로세스에 전달된 문자열 인수 목록

### onWorkerEnd

작업자 프로세스가 종료된 직후 실행됩니다.

매개변수:

- `cid` (`string`): 기능 ID(예: 0-0)
- `exitCode` (`number`): 0 - 성공, 1 - 실패
- `specs` (`string[]`): 작업자 프로세스에서 실행할 스펙
- `retries` (`number`): [_"스펙 파일 단위로 재시도 추가"_](./Retry.md#add-retries-on-a-per-specfile-basis)에 정의된 스펙 수준 재시도 수

### beforeSession

webdriver 세션과 테스트 프레임워크를 초기화하기 직전에 실행됩니다. 기능이나 스펙에 따라 구성을 조작할 수 있습니다.

매개변수:

- `config` (`object`): WebdriverIO 구성 객체
- `caps` (`object`): 작업자에서 생성될 세션에 대한 기능 포함
- `specs` (`string[]`): 작업자 프로세스에서 실행할 스펙

### before

테스트 실행이 시작되기 전에 실행됩니다. 이 시점에서 `browser`와 같은 모든 전역 변수에 접근할 수 있습니다. 이는 사용자 정의 명령을 정의하기에 완벽한 장소입니다.

매개변수:

- `caps` (`object`): 작업자에서 생성될 세션에 대한 기능 포함
- `specs` (`string[]`): 작업자 프로세스에서 실행할 스펙
- `browser` (`object`): 생성된 브라우저/장치 세션의 인스턴스

### beforeSuite

스위트가 시작되기 전에 실행되는 훅(Mocha/Jasmine에서만)

매개변수:

- `suite` (`object`): 스위트 세부 정보

### beforeHook

스위트 내에서 훅이 시작되기 *전에* 실행되는 훅(예: Mocha에서 beforeEach를 호출하기 전에 실행)

매개변수:

- `test` (`object`): 테스트 세부 정보
- `context` (`object`): 테스트 컨텍스트(Cucumber에서 World 객체 표현)

### afterHook

스위트 내에서 훅이 끝난 *후에* 실행되는 훅(예: Mocha에서 afterEach를 호출한 후 실행)

매개변수:

- `test` (`object`): 테스트 세부 정보
- `context` (`object`): 테스트 컨텍스트(Cucumber에서 World 객체 표현)
- `result` (`object`): 훅 결과(`error`, `result`, `duration`, `passed`, `retries` 속성 포함)

### beforeTest

테스트 전에 실행되는 함수(Mocha/Jasmine에서만).

매개변수:

- `test` (`object`): 테스트 세부 정보
- `context` (`object`): 테스트가 실행된 스코프 객체

### beforeCommand

WebdriverIO 명령이 실행되기 전에 실행됩니다.

매개변수:

- `commandName` (`string`): 명령 이름
- `args` (`*`): 명령이 받을 인수

### afterCommand

WebdriverIO 명령이 실행된 후 실행됩니다.

매개변수:

- `commandName` (`string`): 명령 이름
- `args` (`*`): 명령이 받을 인수
- `result` (`number`): 0 - 명령 성공, 1 - 명령 오류
- `error` (`Error`): 오류가 있는 경우 오류 객체

### afterTest

테스트(Mocha/Jasmine에서)가 끝난 후 실행되는 함수.

매개변수:

- `test` (`object`): 테스트 세부 정보
- `context` (`object`): 테스트가 실행된 스코프 객체
- `result.error` (`Error`): 테스트가 실패한 경우 오류 객체, 그렇지 않으면 `undefined`
- `result.result` (`Any`): 테스트 함수의 반환 객체
- `result.duration` (`Number`): 테스트 지속 시간
- `result.passed` (`Boolean`): 테스트가 통과했으면 true, 그렇지 않으면 false
- `result.retries` (`Object`): [Mocha 및 Jasmine](./Retry.md#rerun-single-tests-in-jasmine-or-mocha)와 [Cucumber](./Retry.md#rerunning-in-cucumber)에 정의된 단일 테스트 관련 재시도에 대한 정보, 예: `{ attempts: 0, limit: 0 }` 참조
- `result` (`object`): 훅 결과(`error`, `result`, `duration`, `passed`, `retries` 속성 포함)

### afterSuite

스위트가 끝난 후 실행되는 훅(Mocha/Jasmine에서만)

매개변수:

- `suite` (`object`): 스위트 세부 정보

### after

모든 테스트가 완료된 후 실행됩니다. 여전히 테스트의 모든 전역 변수에 접근할 수 있습니다.

매개변수:

- `result` (`number`): 0 - 테스트 통과, 1 - 테스트 실패
- `caps` (`object`): 작업자에서 생성될 세션에 대한 기능 포함
- `specs` (`string[]`): 작업자 프로세스에서 실행할 스펙

### afterSession

webdriver 세션을 종료한 직후 실행됩니다.

매개변수:

- `config` (`object`): WebdriverIO 구성 객체
- `caps` (`object`): 작업자에서 생성될 세션에 대한 기능 포함
- `specs` (`string[]`): 작업자 프로세스에서 실행할 스펙

### onComplete

모든 작업자가 종료되고 프로세스가 종료되려고 할 때 실행됩니다. onComplete 훅에서 발생한 오류는 테스트 실행 실패로 이어집니다.

매개변수:

- `exitCode` (`number`): 0 - 성공, 1 - 실패
- `config` (`object`): WebdriverIO 구성 객체
- `caps` (`object`): 작업자에서 생성될 세션에 대한 기능 포함
- `result` (`object`): 테스트 결과를 포함하는 결과 객체

### onReload

새로 고침이 발생할 때 실행됩니다.

매개변수:

- `oldSessionId` (`string`): 이전 세션의 세션 ID
- `newSessionId` (`string`): 새 세션의 세션 ID

### beforeFeature

Cucumber 기능 전에 실행됩니다.

매개변수:

- `uri` (`string`): 기능 파일 경로
- `feature` ([`GherkinDocument.IFeature`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/json-to-messages/javascript/src/cucumber-generic/JSONSchema.ts#L8-L17)): Cucumber 기능 객체

### afterFeature

Cucumber 기능 후에 실행됩니다.

매개변수:

- `uri` (`string`): 기능 파일 경로
- `feature` ([`GherkinDocument.IFeature`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/json-to-messages/javascript/src/cucumber-generic/JSONSchema.ts#L8-L17)): Cucumber 기능 객체

### beforeScenario

Cucumber 시나리오 전에 실행됩니다.

매개변수:

- `world` ([`ITestCaseHookParameter`](https://github.com/cucumber/cucumber-js/blob/ac124f7b2be5fa54d904c7feac077a2657b19440/src/support_code_library_builder/types.ts#L10-L15)): pickle 및 테스트 단계에 대한 정보를 포함하는 world 객체
- `context` (`object`): Cucumber World 객체

### afterScenario

Cucumber 시나리오 후에 실행됩니다.

매개변수:

- `world` ([`ITestCaseHookParameter`](https://github.com/cucumber/cucumber-js/blob/ac124f7b2be5fa54d904c7feac077a2657b19440/src/support_code_library_builder/types.ts#L10-L15)): pickle 및 테스트 단계에 대한 정보를 포함하는 world 객체
- `result` (`object`): 시나리오 결과를 포함하는 결과 객체
- `result.passed` (`boolean`): 시나리오가 통과한 경우 true
- `result.error` (`string`): 시나리오가 실패한 경우 오류 스택
- `result.duration` (`number`): 시나리오 지속 시간(밀리초)
- `context` (`object`): Cucumber World 객체

### beforeStep

Cucumber 단계 전에 실행됩니다.

매개변수:

- `step` ([`Pickle.IPickleStep`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/messages/jsonschema/Pickle.json#L20-L49)): Cucumber 단계 객체
- `scenario` ([`IPickle`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/messages/jsonschema/Pickle.json#L137-L175)): Cucumber 시나리오 객체
- `context` (`object`): Cucumber World 객체

### afterStep

Cucumber 단계 후에 실행됩니다.

매개변수:

- `step` ([`Pickle.IPickleStep`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/messages/jsonschema/Pickle.json#L20-L49)): Cucumber 단계 객체
- `scenario` ([`IPickle`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/messages/jsonschema/Pickle.json#L137-L175)): Cucumber 시나리오 객체
- `result`: (`object`): 단계 결과를 포함하는 결과 객체
- `result.passed` (`boolean`): 시나리오가 통과한 경우 true
- `result.error` (`string`): 시나리오가 실패한 경우 오류 스택
- `result.duration` (`number`): 시나리오 지속 시간(밀리초)
- `context` (`object`): Cucumber World 객체

### beforeAssertion

WebdriverIO 어설션이 발생하기 전에 실행되는 훅입니다.

매개변수:

- `params`: 어설션 정보
- `params.matcherName` (`string`): 매처의 이름(예: `toHaveTitle`)
- `params.expectedValue`: 매처에 전달되는 값
- `params.options`: 어설션 옵션

### afterAssertion

WebdriverIO 어설션이 발생한 후 실행되는 훅입니다.

매개변수:

- `params`: 어설션 정보
- `params.matcherName` (`string`): 매처의 이름(예: `toHaveTitle`)
- `params.expectedValue`: 매처에 전달되는 값
- `params.options`: 어설션 옵션
- `params.result`: 어설션 결과