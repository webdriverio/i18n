---
id: security
title: Безопасность
---

WebdriverIO учитывает аспект безопасности при создании решений. Ниже приведены некоторые способы повышения безопасности ваших тестов.

## Лучшие практики

- Никогда не кодируйте конфиденциальные данные, которые могут нанести вред вашей организации при раскрытии в виде открытого текста.
- Используйте механизм (например, хранилище) для безопасного хранения ключей и паролей и извлечения их при запуске end-to-end тестов.
- Проверяйте, что конфиденциальные данные не раскрываются в логах и облачным провайдером, например, токены аутентификации в сетевых логах.

:::info

Даже для тестовых данных важно спросить, может ли злоумышленник получить информацию или использовать эти ресурсы со злым умыслом.

:::

## Маскировка конфиденциальных данных

Если вы используете конфиденциальные данные во время тестирования, важно убедиться, что они не видны всем, например, в логах. Также при использовании облачного провайдера часто задействованы приватные ключи. Эта информация должна быть скрыта от логов, репортеров и других точек соприкосновения. Далее представлены некоторые решения для маскировки данных при запуске тестов без раскрытия этих значений.

### WebDriverIO

#### Маскировка текстовых значений команд

Команды `addValue` и `setValue` поддерживают булево значение mask для маскировки в логах и репортерах. Более того, другие инструменты, такие как инструменты производительности и сторонние инструменты, также получат маскированную версию, повышая безопасность.

Например, если вы используете реального производственного пользователя и вам нужно ввести пароль, который вы хотите замаскировать, теперь это возможно следующим образом:

```ts
  async enterPassword(userPassword) {
    const passwordInputElement = $('Password');

    // Get focus
    await passwordInputElement.click();

    await passwordInputElement.setValue(userPassword, { mask: true });
  }
```

Это скроет текстовое значение из логов WDIO следующим образом:

Пример логов:
```text
INFO webdriver: DATA { text: "**MASKED**" }
```

Репортеры, такие как Allure, и сторонние инструменты, такие как Percy от BrowserStack, также будут использовать маскированную версию.
В сочетании с подходящей версией Appium, логи Appium также будут защищены от ваших конфиденциальных данных.

:::info

Ограничения:
  - В Appium дополнительные плагины могут раскрыть информацию, несмотря на то, что мы просим ее замаскировать.
  - Облачные провайдеры могут использовать прокси для HTTP-логирования, который обходит установленный механизм маскировки.
  - Команда `getValue` не поддерживается. Более того, если она используется для того же элемента, она может раскрыть значение, которое предполагалось замаскировать при использовании `addValue` или `setValue`.

Минимальная требуемая версия:
 - WDIO v9.15.0
 - Appium v3.0.0

:::

#### Маскировка в логах WDIO

Используя конфигурацию `maskingPatterns`, мы можем маскировать конфиденциальную информацию из логов WDIO. Однако логи Appium не покрываются.

Например, если вы используете облачного провайдера и уровень логирования info, то, скорее всего, вы "утечете" ключ пользователя, как показано ниже:

```text
INFO @wdio/local-runner: Start worker 0-0 with arg: ./wdio.conf.ts --user=cloud_user --key=myCloudSecretExposedKey --spec myTest.test.ts
```

Чтобы противодействовать этому, мы можем передать регулярное выражение `'--key=([^ ]*)'`, и теперь в логах вы увидите:

```text
INFO @wdio/local-runner: Start worker 0-0 with arg: ./wdio.conf.ts --user=cloud_user --key=**MASKED** --spec myTest.test.ts
```

Вы можете достичь этого, предоставив регулярное выражение в поле `maskingPatterns` конфигурации.
  - Для нескольких регулярных выражений используйте одну строку со значениями, разделенными запятыми.
  - Для получения дополнительной информации о шаблонах маскирования см. [раздел Masking Patterns в README WDIO Logger](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-logger/README.md#masking-patterns).

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

:::

#### Отключение логгеров WDIO

Другой способ блокировки логирования конфиденциальных данных — понизить или отключить уровень логирования или отключить логгер.
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

### Сторонние решения

#### Appium
Appium предлагает свое решение для маскировки; см. [Log filter](https://appium.io/docs/en/latest/guides/log-filters/)
 - Использование их решения может быть сложным. Один из способов, если возможно, — передать токен в вашей строке, например `@mask@`, и использовать его как регулярное выражение
 - В некоторых версиях Appium значения также регистрируются с каждым символом, разделенным запятыми, поэтому нужно быть осторожным.
 - К сожалению, BrowserStack не поддерживает это решение, но оно все еще полезно локально
 
Используя пример `@mask@`, упомянутый ранее, мы можем использовать следующий JSON-файл с именем `appiumMaskLogFilters.json`
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

#### BrowserStack

BrowserStack также предлагает некоторый уровень маскировки для скрытия данных; см. [hide sensitive data](https://www.browserstack.com/docs/automate/selenium/hide-sensitive-data)
 - К сожалению, решение является «всё или ничего», поэтому все текстовые значения предоставленных команд будут замаскированы.