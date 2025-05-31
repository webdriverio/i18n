---
id: security
title: 보안
---

WebdriverIO는 솔루션을 제공할 때 보안 측면을 고려합니다. 아래는 테스트를 더 안전하게 보호하는 몇 가지 방법입니다.

# 민감한 데이터 마스킹

테스트 중에 민감한 데이터를 사용하는 경우, 로그와 같은 곳에서 이러한 정보가 모든 사람에게 보이지 않도록 하는 것이 중요합니다. 또한 클라우드 제공업체를 사용할 때는 개인 키가 자주 관련됩니다. 이 정보는 로그, 리포터 및 기타 접점에서 마스킹되어야 합니다. 다음은 이러한 값을 노출하지 않고 테스트를 실행하기 위한 몇 가지 마스킹 솔루션을 제공합니다.

## WebDriverIO

### 명령의 텍스트 값 마스킹

`addValue`와 `setValue` 명령은 WDIO 및 Appium 로그와 리포터에서 마스킹하기 위한 불리언 마스크 값을 지원합니다. 또한 성능 도구 및 타사 도구와 같은 다른 도구도 마스크 버전을 받게 되어 보안이 향상됩니다.

예를 들어, 실제 프로덕션 사용자를 사용하고 마스킹하려는 비밀번호를 입력해야 하는 경우, 다음과 같이 가능합니다:

```ts
  async enterPassword(userPassword) {
    const passwordInputElement = $('Password');

    // Get focus
    await passwordInputElement.click();

    await passwordInputElement.setValue(userPassword, { mask: true });
  }
```

위 코드는 WDIO 로그와 Appium 로그에서 텍스트 값을 숨깁니다.

로그 예시:
```text
2025-05-25T23:02:42. 336Z INFO webdriver: DATA { text: "**MASKED**" }
```

제한사항:
  - Appium에서는 마스킹을 요청해도 추가 플러그인이 정보를 유출할 수 있습니다.
  - 클라우드 제공업체는 HTTP 로깅을 위한 프록시를 사용할 수 있으며, 이는 마스킹 메커니즘을 우회합니다.

:::info

최소 필요 버전:
 - WDIO v9.15.0
 - Appium v2.19.0

### WDIO 로그에서 마스킹

`maskingPatterns` 구성을 사용하여 WDIO 로그에서 민감한 정보를 마스킹할 수 있습니다. 그러나 Appium 로그는 이에 포함되지 않습니다.

예를 들어, 클라우드 제공업체를 사용하고 info 레벨을 사용하는 경우 아래와 같이 사용자 키가 "유출"될 가능성이 높습니다:

```text
2025-05-29T19:09:11.309Z INFO @wdio/local-runner: Start worker 0-0 with arg: ./wdio.conf.ts --user=cloud_user --key=myCloudSecretExposedKey --spec myTest.test.ts
```

이를 방지하기 위해 정규 표현식 `'--key=([^ ]*)'`를 전달하면 로그에서 다음과 같이 표시됩니다:

```text
2025-05-29T19:09:11.309Z INFO @wdio/local-runner: Start worker 0-0 with arg: ./wdio.conf.ts --user=cloud_user --key=**MASKED** --spec myTest.test.ts
```

구성의 `maskingPatterns` 필드에 정규 표현식을 제공하여 위의 결과를 얻을 수 있습니다.
  - 여러 정규 표현식의 경우 쉼표로 구분된 단일 문자열을 사용하세요.
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

### WDIO 로거 비활성화

민감한 데이터의 로깅을 차단하는 또 다른 방법은 로그 레벨을 낮추거나 무음으로 설정하거나 로거를 비활성화하는 것입니다.
다음과 같이 구현할 수 있습니다:

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

## 타사 솔루션

### Appium
Appium은 자체적인 마스킹 솔루션을 제공합니다. [로그 필터](https://appium.io/docs/en/2.0/guides/log-filters/)를 참조하세요.
 - 그들의 솔루션을 사용하는 것은 까다로울 수 있습니다. 가능한 방법 중 하나는 `@mask@`와 같은 토큰을 문자열에 전달하고 이를 정규 표현식으로 사용하는 것입니다.
 - 일부 Appium 버전에서는 값도 각 문자가 쉼표로 구분되어 로깅되므로 주의해야 합니다.
 - 불행히도 BrowserStack은 이 솔루션을 지원하지 않지만, 로컬에서는 여전히 유용합니다.
 
앞서 언급한 `@mask@` 예제를 사용하여 `appiumMaskLogFilters.json`이라는 다음 JSON 파일을 사용할 수 있습니다.
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

그런 다음 JSON 파일 이름을 appium 서비스 구성의 `logFilters` 필드에 전달합니다:
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

### BrowserStack

BrowserStack도 일부 데이터를 숨기기 위한 일정 수준의 마스킹을 제공합니다. [민감한 데이터 숨기기](https://www.browserstack.com/docs/automate/selenium/hide-sensitive-data)를 참조하세요.
 - 불행히도 이 솔루션은 전부 아니면 전무(all-or-nothing)이므로 제공된 명령의 모든 텍스트 값이 마스킹됩니다.