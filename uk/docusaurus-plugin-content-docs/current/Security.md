---
id: security
title: Безпека
---

WebdriverIO має на увазі аспект безпеки під час надання рішень. Нижче наведено кілька способів кращого захисту ваших тестів.

# Маскування конфіденційних даних

Якщо ви використовуєте конфіденційні дані під час тестування, важливо переконатися, що вони не видимі для всіх, наприклад, у логах. Крім того, під час використання хмарного провайдера часто залучаються приватні ключі. Ця інформація повинна бути замаскована в логах, звітах та інших точках взаємодії. Нижче наведено деякі рішення з маскування для запуску тестів без розкриття цих значень.

## WebDriverIO

### Маскування текстових значень команд

Команди `addValue` та `setValue` підтримують булеве значення маски для маскування в логах WDIO та Appium, а також у звітах. Крім того, інші інструменти, такі як інструменти продуктивності та сторонні інструменти, також отримають замасковану версію, покращуючи безпеку.

Наприклад, якщо ви використовуєте реального виробничого користувача і вам потрібно ввести пароль, який ви хочете замаскувати, це можливо зробити наступним чином:

```ts
  async enterPassword(userPassword) {
    const passwordInputElement = $('Password');

    // Get focus
    await passwordInputElement.click();

    await passwordInputElement.setValue(userPassword, { mask: true });
  }
```

Вищезазначене приховає текстове значення від логів WDIO, а також від логів Appium.

Приклад логів:
```text
2025-05-25T23:02:42. 336Z INFO webdriver: DATA { text: "**MASKED**" }
```

Обмеження:
  - У Appium додаткові плагіни можуть витікати, хоча ми просимо маскувати інформацію.
  - Хмарні провайдери можуть використовувати проксі для HTTP-логування, що обходить встановлений механізм маскування.

:::info

Мінімальна необхідна версія:
 - WDIO v9.15.0
 - Appium v2.19.0

### Маскування в логах WDIO

Використовуючи конфігурацію `maskingPatterns`, ми можемо маскувати конфіденційну інформацію з логів WDIO. Однак логи Appium не покриваються.

Наприклад, якщо ви використовуєте хмарного провайдера і використовуєте рівень info, то, швидше за все, ви "витікаєте" ключ користувача, як показано нижче:

```text
2025-05-29T19:09:11.309Z INFO @wdio/local-runner: Start worker 0-0 with arg: ./wdio.conf.ts --user=cloud_user --key=myCloudSecretExposedKey --spec myTest.test.ts
```

Щоб протидіяти цьому, ми можемо передати регулярний вираз `'--key=([^ ]*)'`, і тепер у логах ви побачите 

```text
2025-05-29T19:09:11.309Z INFO @wdio/local-runner: Start worker 0-0 with arg: ./wdio.conf.ts --user=cloud_user --key=**MASKED** --spec myTest.test.ts
```

Ви можете досягти вищезазначеного, надавши регулярний вираз у полі `maskingPatterns` конфігурації.
  - Для кількох регулярних виразів використовуйте один рядок, але з розділеними комами значеннями.
  - Для отримання додаткової інформації про шаблони маскування див. [розділ "Шаблони маскування" у README логера WDIO](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-logger/README.md#masking-patterns).

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

Мінімальна необхідна версія:
 - WDIO v9.15.0

### Вимкнення логерів WDIO

Інший спосіб блокування запису конфіденційних даних - це знизити або заглушити рівень логування або вимкнути логер.
Це можна зробити так:

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

## Рішення третіх сторін

### Appium
Appium пропонує своє рішення для маскування; див. [Log filter](https://appium.io/docs/en/2.0/guides/log-filters/)
 - Використання їхнього рішення може бути складним. Один зі способів, якщо можливо, - передати токен у своєму рядку, як `@mask@`, і використовувати його як регулярний вираз
 - У деяких версіях Appium значення також записуються з кожним символом, розділеним комами, тому потрібно бути обережним.
 - На жаль, BrowserStack не підтримує це рішення, але воно все ще корисне локально
 
Використовуючи приклад `@mask@`, згаданий раніше, ми можемо використовувати наступний JSON-файл з назвою `appiumMaskLogFilters.json`
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

Потім передайте ім'я JSON-файлу в поле `logFilters` у конфігурації сервісу appium:
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

BrowserStack також пропонує певний рівень маскування для приховування деяких даних; див. [hide sensitive data](https://www.browserstack.com/docs/automate/selenium/hide-sensitive-data)
 - На жаль, рішення є "все або нічого", тому всі текстові значення наданих команд будуть замасковані.