---
id: capabilities
title: 기능(Capabilities)
---

Capability는 원격 인터페이스에 대한 정의입니다. 이는 WebdriverIO가 어떤 브라우저나 모바일 환경에서 테스트를 실행하고자 하는지 이해하는 데 도움을 줍니다. Capability는 로컬에서 테스트를 개발할 때는 대부분 하나의 원격 인터페이스에서 실행하기 때문에 덜 중요하지만, CI/CD에서 대규모 통합 테스트를 실행할 때 더 중요해집니다.

:::info

Capability 객체의 형식은 [WebDriver 명세](https://w3c.github.io/webdriver/#capabilities)에 잘 정의되어 있습니다. WebdriverIO 테스트러너는 사용자 정의 capability가 해당 명세를 준수하지 않는 경우 초기에 실패합니다.

:::

## 사용자 정의 Capabilities

고정적으로 정의된 capability의 수는 매우 적지만, 누구나 자동화 드라이버나 원격 인터페이스에 특화된 사용자 정의 capability를 제공하고 수용할 수 있습니다:

### 브라우저 특정 Capability 확장

- `goog:chromeOptions`: [Chromedriver](https://chromedriver.chromium.org/capabilities) 확장, Chrome에서 테스트할 때만 적용 가능
- `moz:firefoxOptions`: [Geckodriver](https://firefox-source-docs.mozilla.org/testing/geckodriver/Capabilities.html) 확장, Firefox에서 테스트할 때만 적용 가능
- `ms:edgeOptions`: [EdgeOptions](https://learn.microsoft.com/en-us/microsoft-edge/webdriver-chromium/capabilities-edge-options) Chromium Edge 테스팅을 위해 EdgeDriver 사용 시 환경 지정

### 클라우드 벤더 Capability 확장

- `sauce:options`: [Sauce Labs](https://docs.saucelabs.com/dev/test-configuration-options/#w3c-webdriver-browser-capabilities--optional)
- `bstack:options`: [BrowserStack](https://www.browserstack.com/docs/automate/selenium/organize-tests)
- `tb:options`: [TestingBot](https://testingbot.com/support/other/test-options)
- 그 외 다수...

### 자동화 엔진 Capability 확장

- `appium:xxx`: [Appium](https://appium.io/docs/en/latest/guides/caps/)
- `selenoid:xxx`: [Selenoid](https://github.com/aerokube/selenoid/blob/master/docs/special-capabilities.adoc)
- 그 외 다수...

### 브라우저 드라이버 옵션 관리를 위한 WebdriverIO Capabilities

WebdriverIO는 브라우저 드라이버 설치 및 실행을 관리합니다. WebdriverIO는 드라이버에 매개변수를 전달할 수 있게 해주는 사용자 정의 capability를 사용합니다.

#### `wdio:chromedriverOptions`

Chromedriver를 시작할 때 전달되는 특정 옵션입니다.

#### `wdio:geckodriverOptions`

Geckodriver를 시작할 때 전달되는 특정 옵션입니다.

#### `wdio:edgedriverOptions`

Edgedriver를 시작할 때 전달되는 특정 옵션입니다.

#### `wdio:safaridriverOptions`

Safari를 시작할 때 전달되는 특정 옵션입니다.

#### `wdio:maxInstances`

특정 브라우저/capability에 대한 총 병렬 실행 작업자의 최대 수입니다. [maxInstances](#configuration#maxInstances)와 [maxInstancesPerCapability](configuration/#maxinstancespercapability)보다 우선합니다.

타입: `number`

#### `wdio:specs`

해당 브라우저/capability에 대한 테스트 실행을 위한 스펙을 정의합니다. [일반 `specs` 구성 옵션](configuration#specs)과 동일하지만 특정 브라우저/capability에 한정됩니다. `specs`보다 우선합니다.

타입: `(String | String[])[]`

#### `wdio:exclude`

해당 브라우저/capability에 대한 테스트 실행에서 제외할 스펙을 정의합니다. [일반 `exclude` 구성 옵션](configuration#exclude)과 동일하지만 특정 브라우저/capability에 한정됩니다. 전역 `exclude` 구성 옵션이 적용된 후에 제외됩니다.

타입: `String[]`

#### `wdio:enforceWebDriverClassic`

기본적으로 WebdriverIO는 WebDriver Bidi 세션을 설정하려고 시도합니다. 이 동작을 선호하지 않는 경우 이 플래그를 설정하여 비활성화할 수 있습니다.

타입: `boolean`

#### 공통 드라이버 옵션

모든 드라이버는 구성을 위한 다양한 매개변수를 제공하지만, WebdriverIO가 이해하고 드라이버나 브라우저를 설정하는 데 사용하는 공통 옵션이 있습니다:

##### `cacheDir`

캐시 디렉토리의 루트 경로입니다. 이 디렉토리는 세션을 시작하려고 할 때 다운로드되는 모든 드라이버를 저장하는 데 사용됩니다.

타입: `string`<br />
기본값: `process.env.WEBDRIVER_CACHE_DIR || os.tmpdir()`

##### `binary`

사용자 정의 드라이버 바이너리 경로입니다. 설정하면 WebdriverIO는 드라이버를 다운로드하지 않고 이 경로에서 제공하는 드라이버를 사용합니다. 드라이버가 사용 중인 브라우저와 호환되는지 확인하세요.

`CHROMEDRIVER_PATH`, `GECKODRIVER_PATH` 또는 `EDGEDRIVER_PATH` 환경 변수를 통해 이 경로를 제공할 수 있습니다.

타입: `string`

:::caution

드라이버 `binary`가 설정되면 WebdriverIO는 드라이버를 다운로드하지 않고 이 경로에서 제공하는 드라이버를 사용합니다. 드라이버가 사용 중인 브라우저와 호환되는지 확인하세요.

:::

#### 브라우저 특정 드라이버 옵션

드라이버에 옵션을 전달하기 위해 다음과 같은 사용자 정의 capability를 사용할 수 있습니다:

- Chrome 또는 Chromium: `wdio:chromedriverOptions`
- Firefox: `wdio:geckodriverOptions`
- Microsoft Edge: `wdio:edgedriverOptions`
- Safari: `wdio:safaridriverOptions`

<Tabs
  defaultValue="chrome"
  values={[
    {label: 'wdio:chromedriverOptions', value: 'chrome'},
    {label: 'wdio:geckodriverOptions', value: 'firefox'},
    {label: 'wdio:edgedriverOptions', value: 'msedge'},
    {label: 'wdio:safaridriverOptions', value: 'safari'},
  ]
}>
<TabItem value="chrome">

##### adbPort
ADB 드라이버가 실행되어야 하는 포트입니다.

예: `9515`

타입: `number`

##### urlBase
명령어의 기본 URL 경로 접두사, 예: `wd/url`.

예: `/`

타입: `string`

##### logPath
stderr 대신 파일에 서버 로그를 작성하고, 로그 레벨을 `INFO`로 증가시킵니다.

타입: `string`

##### logLevel
로그 레벨을 설정합니다. 가능한 옵션은 `ALL`, `DEBUG`, `INFO`, `WARNING`, `SEVERE`, `OFF`입니다.

타입: `string`

##### verbose
상세하게 로깅합니다(`--log-level=ALL`과 동일).

타입: `boolean`

##### silent
아무것도 로깅하지 않습니다(`--log-level=OFF`와 동일).

타입: `boolean`

##### appendLog
로그 파일을 다시 쓰는 대신 추가합니다.

타입: `boolean`

##### replayable
상세하게 로깅하고 긴 문자열을 잘라내지 않아 로그를 재생할 수 있습니다(실험적).

타입: `boolean`

##### readableTimestamp
로그에 읽기 쉬운 타임스탬프를 추가합니다.

타입: `boolean`

##### enableChromeLogs
브라우저의 로그를 표시합니다(다른 로깅 옵션을 재정의).

타입: `boolean`

##### bidiMapperPath
사용자 정의 bidi 매퍼 경로입니다.

타입: `string`

##### allowedIps
EdgeDriver에 연결할 수 있는 원격 IP 주소의 쉼표로 구분된 허용 목록입니다.

타입: `string[]`<br />
기본값: `['']`

##### allowedOrigins
EdgeDriver에 연결할 수 있는 요청 출처의 쉼표로 구분된 허용 목록입니다. 모든 호스트 출처를 허용하는 `*` 사용은 위험합니다!

타입: `string[]`<br />
기본값: `['*']`

##### spawnOpts
드라이버 프로세스에 전달할 옵션입니다.

타입: `SpawnOptionsWithoutStdio | SpawnOptionsWithStdioTuple<StdioOption, StdioOption, StdioOption>`<br />
기본값: `undefined`

</TabItem>
<TabItem value="firefox">

모든 Geckodriver 옵션은 공식 [드라이버 패키지](https://github.com/webdriverio-community/node-geckodriver#options)에서 확인할 수 있습니다.

</TabItem>
<TabItem value="msedge">

모든 Edgedriver 옵션은 공식 [드라이버 패키지](https://github.com/webdriverio-community/node-edgedriver#options)에서 확인할 수 있습니다.

</TabItem>
<TabItem value="safari">

모든 Safaridriver 옵션은 공식 [드라이버 패키지](https://github.com/webdriverio-community/node-safaridriver#options)에서 확인할 수 있습니다.

</TabItem>
</Tabs>

## 특정 사용 사례를 위한 특별 Capabilities

다음은 특정 사용 사례를 달성하기 위해 적용해야 하는 capability를 보여주는 예시 목록입니다.

### 헤드리스 브라우저 실행

헤드리스 브라우저를 실행한다는 것은 창이나 UI 없이 브라우저 인스턴스를 실행하는 것을 의미합니다. 이는 주로 디스플레이가 사용되지 않는 CI/CD 환경에서 사용됩니다. 헤드리스 모드에서 브라우저를 실행하려면 다음 capability를 적용하세요:

<Tabs
  defaultValue="chrome"
  values={[
    {label: 'Chrome', value: 'chrome'},
    {label: 'Firefox', value: 'firefox'},
    {label: 'Microsoft Edge', value: 'msedge'},
    {label: 'Safari', value: 'safari'},
  ]
}>
<TabItem value="chrome">

```ts
{
    browserName: 'chrome',   // 또는 'chromium'
    'goog:chromeOptions': {
        args: ['headless', 'disable-gpu']
    }
}
```

</TabItem>
<TabItem value="firefox">

```ts
    browserName: 'firefox',
    'moz:firefoxOptions': {
        args: ['-headless']
    }
```

</TabItem>
<TabItem value="msedge">

```ts
    browserName: 'msedge',
    'ms:edgeOptions': {
        args: ['--headless']
    }
```

</TabItem>
<TabItem value="safari">

Safari는 헤드리스 모드에서 실행을 [지원하지 않는 것으로 보입니다](https://discussions.apple.com/thread/251837694).

</TabItem>
</Tabs>

### 다양한 브라우저 채널 자동화

아직 안정 버전으로 출시되지 않은 브라우저 버전(예: Chrome Canary)을 테스트하려는 경우, 다음과 같이 capability를 설정하고 시작하려는 브라우저를 지정할 수 있습니다:

<Tabs
  defaultValue="chrome"
  values={[
    {label: 'Chrome', value: 'chrome'},
    {label: 'Firefox', value: 'firefox'},
    {label: 'Microsoft Edge', value: 'msedge'},
    {label: 'Safari', value: 'safari'},
  ]
}>
<TabItem value="chrome">

Chrome에서 테스트할 때 WebdriverIO는 정의된 `browserVersion`에 따라 원하는 브라우저 버전과 드라이버를 자동으로 다운로드합니다:

```ts
{
    browserName: 'chrome', // 또는 'chromium'
    browserVersion: '116' // 또는 '116.0.5845.96', 'stable', 'dev', 'canary', 'beta' 또는 'latest' ('canary'와 동일)
}
```

수동으로 다운로드한 브라우저를 테스트하려면 브라우저에 바이너리 경로를 제공할 수 있습니다:

```ts
{
    browserName: 'chrome',  // 또는 'chromium'
    'goog:chromeOptions': {
        binary: '/Applications/Google\ Chrome\ Canary.app/Contents/MacOS/Google\ Chrome\ Canary'
    }
}
```

또한 수동으로 다운로드한 드라이버를 사용하려면 드라이버에 바이너리 경로를 제공할 수 있습니다:

```ts
{
    browserName: 'chrome', // 또는 'chromium'
    'wdio:chromedriverOptions': {
        binary: '/path/to/chromdriver'
    }
}
```

</TabItem>
<TabItem value="firefox">

Firefox에서 테스트할 때 WebdriverIO는 정의된 `browserVersion`에 따라 원하는 브라우저 버전과 드라이버를 자동으로 다운로드합니다:

```ts
{
    browserName: 'firefox',
    browserVersion: '119.0a1' // 또는 'latest'
}
```

수동으로 다운로드한 버전을 테스트하려면 브라우저에 바이너리 경로를 제공할 수 있습니다:

```ts
{
    browserName: 'firefox',
    'moz:firefoxOptions': {
        binary: '/Applications/Firefox\ Nightly.app/Contents/MacOS/firefox'
    }
}
```

또한 수동으로 다운로드한 드라이버를 사용하려면 드라이버에 바이너리 경로를 제공할 수 있습니다:

```ts
{
    browserName: 'firefox',
    'wdio:geckodriverOptions': {
        binary: '/path/to/geckodriver'
    }
}
```

</TabItem>
<TabItem value="msedge">

Microsoft Edge에서 테스트할 때는 원하는 브라우저 버전이 머신에 설치되어 있는지 확인하세요. WebdriverIO에게 실행할 브라우저를 다음과 같이 지정할 수 있습니다:

```ts
{
    browserName: 'msedge',
    'ms:edgeOptions': {
        binary: '/Applications/Microsoft\ Edge\ Canary.app/Contents/MacOS/Microsoft\ Edge\ Canary'
    }
}
```

WebdriverIO는 정의된 `browserVersion`에 따라 원하는 드라이버 버전을 자동으로 다운로드합니다:

```ts
{
    browserName: 'msedge',
    browserVersion: '109' // 또는 '109.0.1467.0', 'stable', 'dev', 'canary', 'beta'
}
```

또한 수동으로 다운로드한 드라이버를 사용하려면 드라이버에 바이너리 경로를 제공할 수 있습니다:

```ts
{
    browserName: 'msedge',
    'wdio:edgedriverOptions': {
        binary: '/path/to/msedgedriver'
    }
}
```

</TabItem>
<TabItem value="safari">

Safari에서 테스트할 때는 [Safari Technology Preview](https://developer.apple.com/safari/technology-preview/)가 머신에 설치되어 있는지 확인하세요. WebdriverIO에게 해당 버전을 다음과 같이 지정할 수 있습니다:

```ts
{
    browserName: 'safari technology preview'
}
```

</TabItem>
</Tabs>

## 사용자 정의 Capabilities 확장

해당 특정 capability에 대한 테스트 내에서 사용할 임의의 데이터를 저장하기 위해 자체적인 capability 세트를 정의하려면 다음과 같이 설정할 수 있습니다:

```js title=wdio.conf.ts
export const config = {
    // ...
    capabilities: [{
        browserName: 'chrome',
        'custom:caps': {
            // 사용자 정의 구성
        }
    }]
}
```

capability 이름 지정과 관련하여 구현별 네임스페이스를 나타내는 `:` (콜론) 문자가 필요한 [W3C 프로토콜](https://w3c.github.io/webdriver/#dfn-extension-capability)을 따르는 것이 좋습니다. 테스트 내에서 다음과 같이 사용자 정의 capability에 접근할 수 있습니다:

```ts
browser.capabilities['custom:caps']
```

타입 안전성을 보장하기 위해 WebdriverIO의 capability 인터페이스를 다음과 같이 확장할 수 있습니다:

```ts
declare global {
    namespace WebdriverIO {
        interface Capabilities {
            'custom:caps': {
                // ...
            }
        }
    }
}
```