---
id: security
title: 보안
---

WebdriverIO는 솔루션을 제공할 때 보안 측면을 고려합니다. 아래는 테스트를 더 안전하게 보호하는 몇 가지 방법입니다.

## 모범 사례

- 노출 시 조직에 해를 끼칠 수 있는 민감한 데이터를 평문으로 하드코딩하지 마세요.
- 키와 비밀번호를 안전하게 저장하고 엔드-투-엔드 테스트를 시작할 때 검색할 수 있는 메커니즘(예: 볼트)을 사용하세요.
- 네트워크 로그의 인증 토큰과 같은 민감한 데이터가 로그 및 클라우드 제공업체에 노출되지 않는지 확인하세요.

:::info

테스트 데이터라도 악의적인 사람이 잘못된 방법으로 정보를 검색하거나 악의적인 의도로 해당 리소스를 사용할 수 있는지 묻는 것이 중요합니다.

:::

## 민감한 데이터 마스킹

테스트 중에 민감한 데이터를 사용하는 경우, 로그와 같은 곳에서 모든 사람에게 표시되지 않도록 하는 것이 중요합니다. 또한 클라우드 제공업체를 사용할 때는 종종 개인 키가 관련됩니다. 이 정보는 로그, 리포터 및 기타 접점에서 마스킹되어야 합니다. 다음은 이러한 값을 노출하지 않고 테스트를 실행하기 위한 몇 가지 마스킹 솔루션을 제공합니다.

### WebDriverIO

#### 명령어의 텍스트 값 마스킹하기

`addValue`와 `setValue` 명령은 로그와 리포터에서 마스킹하기 위한 불리언 마스크 값을 지원합니다. 또한 성능 도구 및 타사 도구와 같은 다른 도구도 마스크 버전을 수신하여 보안을 강화합니다.

예를 들어, 실제 프로덕션 사용자를 사용하고 마스킹하려는 비밀번호를 입력해야 하는 경우 다음과 같이 가능합니다:

```ts
  async enterPassword(userPassword) {
    const passwordInputElement = $('Password');

    // Get focus
    await passwordInputElement.click();

    await passwordInputElement.setValue(userPassword, { mask: true });
  }
```

위의 코드는 WDIO 로그에서 텍스트 값을 다음과 같이 숨깁니다:

로그 예시:
```text
INFO webdriver: DATA { text: "**MASKED**" }
```

Allure 리포터와 같은 리포터와 BrowserStack의 Percy와 같은 타사 도구도 마스킹된 버전을 처리합니다.
적절한 Appium 버전과 함께 사용하면 Appium 로그에서도 민감한 데이터가 제외됩니다.

:::info

제한사항:
  - Appium에서는 마스킹을 요청해도 추가 플러그인에서 정보가 유출될 수 있습니다.
  - 클라우드 제공업체는 설정된 마스크 메커니즘을 우회하는 HTTP 로깅 프록시를 사용할 수 있습니다.
  - `getValue` 명령은 지원되지 않습니다. 또한 동일한 요소에 사용하면 `addValue` 또는 `setValue`를 사용할 때 마스킹하려는 값이 노출될 수 있습니다.

최소 필요 버전:
 - WDIO v9.15.0
 - Appium v3.0.0

:::

#### WDIO 로그에서 마스킹하기

`maskingPatterns` 구성을 사용하면 WDIO 로그에서 민감한 정보를 마스킹할 수 있습니다. 그러나 Appium 로그는 포함되지 않습니다.

예를 들어, 클라우드 제공업체를 사용하고 info 레벨을 사용하는 경우 아래와 같이 사용자 키가 "유출"될 가능성이 높습니다:

```text
INFO @wdio/local-runner: Start worker 0-0 with arg: ./wdio.conf.ts --user=cloud_user --key=myCloudSecretExposedKey --spec myTest.test.ts
```

이를 방지하기 위해 정규 표현식 `'--key=([^ ]*)'`을 전달하면 로그에서 다음과 같이 표시됩니다: 

```text
INFO @wdio/local-runner: Start worker 0-0 with arg: ./wdio.conf.ts --user=cloud_user --key=**MASKED** --spec myTest.test.ts
```

구성의 `maskingPatterns` 필드에 정규 표현식을 제공하여 위와 같은 결과를 얻을 수 있습니다.
  - 여러 정규 표현식의 경우 쉼표로 구분된 값이 있는 단일 문자열을 사용하세요.
  - 마스킹 패턴에 대한 자세한 내용은 [WDIO Logger README의 마스킹 패턴 섹션](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-logger/README.md#masking-patterns)을 참조하세요.

```ts
export const config: WebdriverIO.Config = {
    specs: [...],
    capabilities: [{...}],
    services: ['lighthouse'],

    /**
     * test configurations
     */
    logLevel: 'info',
    maskingPatterns: '/--key=([^ ]*)/',
    framework: 'mocha',
    outputDir: __dirname,

    reporters: ['spec'],

    mochaOpts: {
        ui: 'bdd',
        timeout: 60000
    }
}
```

:::info

최소 필요 버전:
 - WDIO v9.15.0

:::

#### WDIO 로거 비활성화하기

민감한 데이터의 로깅을 차단하는 또 다른 방법은 로그 레벨을 낮추거나 무음으로 설정하거나 로거를 비활성화하는 것입니다.
다음과 같이 수행할 수 있습니다:

```ts
import logger from '@wdio/logger';

/**
  * Set the logger level of the WDIO logger to 'silent' before *running a promise, which helps hide sensitive information in the logs.
 */
export const withSilentLogger = async <T>(promise: () => Promise<T>): Promise<T> => {
  const webdriverLogLevel = driver.options.logLevel ?? 'error';

  try {
    logger.setLevel('webdriver', 'silent');
    return await promise();
  } finally {
    logger.setLevel('webdriver', webdriverLogLevel);
  }
};
```

### 타사 솔루션

#### Appium
Appium은 자체 마스킹 솔루션을 제공합니다. [Log filter](https://appium.io/docs/en/latest/guides/log-filters/) 참조
 - 그들의 솔루션을 사용하는 것은 까다로울 수 있습니다. 가능하다면 `@mask@`와 같은 토큰을 문자열에 전달하고 정규 표현식으로 사용하는 방법이 있습니다.
 - 일부 Appium 버전에서는 각 문자가 쉼표로 구분되어 값이 기록되므로 주의해야 합니다.
 - 안타깝게도 BrowserStack은 이 솔루션을 지원하지 않지만 로컬에서는 여전히 유용합니다.
 
앞서 언급한 `@mask@` 예제를 사용하면 다음과 같은 JSON 파일인 `appiumMaskLogFilters.json`을 사용할 수 있습니다
```json
[
  {
    "pattern": "@mask@(.*)",
    "flags": "s",
    "replacer": "**MASKED**"
  },
  {
    "pattern": "\\[(\\\"@\\\",\\\"m\\\",\\\"a\\\",\\\"s\\\",\\\"k\\\",\\\"@\\\",\\S+)\\]",
    "flags": "s",
    "replacer": "[*,*,M,A,S,K,E,D,*,*]"
  }
]
```

그런 다음 appium 서비스 구성의 `logFilters` 필드에 JSON 파일 이름을 전달합니다:
```ts
import { AppiumServerArguments, AppiumServiceConfig } from '@wdio/appium-service';
import { ServiceEntry } from '@wdio/types/build/Services';

const appium = [
  'appium',
  {
    args: {
      log: './logs/appium.log',
      logFilters: './appiumMaskLogFilters.json',
    } satisfies AppiumServerArguments,
  } satisfies AppiumServiceConfig,
] satisfies ServiceEntry;
```

#### BrowserStack

BrowserStack도 일부 데이터를 숨기기 위한 마스킹 기능을 제공합니다. [hide sensitive data](https://www.browserstack.com/docs/automate/selenium/hide-sensitive-data) 참조
 - 안타깝게도 이 솔루션은 전부 또는 전무의 접근 방식이므로 제공된 명령어의 모든 텍스트 값이 마스킹됩니다.