---
id: security
title: Безопасность
---

WebdriverIO разрабатывается с учетом аспекта безопасности. Ниже приведены некоторые способы улучшения безопасности ваших тестов.

# Маскировка конфиденциальных данных

Если вы используете конфиденциальные данные во время тестирования, важно убедиться, что они не видны всем, например, в логах. Также при использовании облачного провайдера часто задействованы приватные ключи. Эта информация должна быть скрыта из логов, репортеров и других точек взаимодействия. Ниже приведены некоторые решения для маскировки, позволяющие запускать тесты без раскрытия этих значений.

## WebDriverIO

### Маскировка текстовых значений команд

Команды `addValue` и `setValue` поддерживают булево значение mask для маскировки в логах WDIO и Appium, а также в репортерах. Более того, другие инструменты, такие как инструменты производительности и сторонние инструменты, также получат замаскированную версию, повышая безопасность.

Например, если вы используете реального пользователя продакшена и вам нужно ввести пароль, который вы хотите скрыть, это теперь возможно следующим образом:

```ts
  async enterPassword(userPassword) {
    const passwordInputElement = $('Password');

    // Get focus
    await passwordInputElement.click();

    await passwordInputElement.setValue(userPassword, { mask: true });
  }
```

Это скроет текстовое значение из логов WDIO, а также из логов Appium.

Пример логов:
```text
2025-05-25T23:02:42. 336Z INFO webdriver: DATA { text: "**MASKED**" }
```

Ограничения:
  - В Appium дополнительные плагины могут привести к утечке информации, даже если мы просим замаскировать ее.
  - Облачные провайдеры могут использовать прокси для HTTP-логирования, что обходит внедренный механизм маскировки.

:::info

Минимальная требуемая версия:
 - WDIO v9.15.0
 - Appium v2.19.0

### Маскировка в логах WDIO

Используя конфигурацию `maskingPatterns`, мы можем маскировать конфиденциальную информацию в логах WDIO. Однако логи Appium не покрываются.

Например, если вы используете облачного провайдера и уровень логирования info, то, скорее всего, произойдет "утечка" ключа пользователя, как показано ниже:

```text
2025-05-29T19:09:11.309Z INFO @wdio/local-runner: Start worker 0-0 with arg: ./wdio.conf.ts --user=cloud_user --key=myCloudSecretExposedKey --spec myTest.test.ts
```

Чтобы противодействовать этому, мы можем передать регулярное выражение `'--key=([^ ]*)'`, и теперь в логах вы увидите:

```text
2025-05-29T19:09:11.309Z INFO @wdio/local-runner: Start worker 0-0 with arg: ./wdio.conf.ts --user=cloud_user --key=**MASKED** --spec myTest.test.ts
```

Вы можете достичь этого, предоставив регулярное выражение в поле `maskingPatterns` конфигурации.
  - Для нескольких регулярных выражений используйте одну строку с разделением запятыми.
  - Для получения дополнительной информации о шаблонах маскировки см. [раздел Masking Patterns в README WDIO Logger](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-logger/README.md#masking-patterns).

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

Минимальная требуемая версия:
 - WDIO v9.15.0

### Отключение логгеров WDIO

Другой способ блокировки логирования конфиденциальных данных — понизить уровень логирования, перевести его в режим тишины или отключить логгер.
Это можно сделать следующим образом:

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

## Сторонние решения

### Appium
Appium предлагает свое решение для маскировки; см. [Log filter](https://appium.io/docs/en/latest/guides/log-filters/)
 - Использовать их решение может быть сложно. Один из способов, если возможно, — передать токен в строке, например `@mask@`, и использовать его как регулярное выражение
 - В некоторых версиях Appium значения также логируются с разделением символов запятыми, поэтому нужно быть осторожным.
 - К сожалению, BrowserStack не поддерживает это решение, но оно все еще полезно локально
 
Используя пример с `@mask@`, упомянутый ранее, мы можем использовать следующий JSON-файл с именем `appiumMaskLogFilters.json`
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

Затем передайте имя JSON-файла в поле `logFilters` в конфигурации сервиса appium:
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

BrowserStack также предлагает некоторый уровень маскировки для скрытия данных; см. [hide sensitive data](https://www.browserstack.com/docs/automate/selenium/hide-sensitive-data)
 - К сожалению, решение является полным или ничего, поэтому все текстовые значения предоставленных команд будут замаскированы.