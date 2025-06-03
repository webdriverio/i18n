---
id: security
title: Безпека
---

WebdriverIO враховує аспект безпеки при створенні рішень. Нижче наведено кілька способів кращого захисту ваших тестів.

# Маскування конфіденційних даних

Якщо ви використовуєте конфіденційні дані під час тестування, важливо переконатися, що вони не видимі для всіх, наприклад, у логах. Крім того, при використанні хмарного провайдера часто задіяні приватні ключі. Ця інформація повинна бути замаскована в логах, звітах та інших точках взаємодії. Нижче наведено деякі рішення для маскування, щоб запускати тести без розкриття цих значень.

## WebDriverIO

### Маскування текстових значень команд

Команди `addValue` та `setValue` підтримують булеве значення маски для приховування в логах WDIO та Appium, а також у звітах. Крім того, інші інструменти, такі як інструменти продуктивності та сторонні інструменти, також отримають замасковану версію, що підвищує безпеку.

Наприклад, якщо ви використовуєте реального користувача продукту і вам потрібно ввести пароль, який ви хочете замаскувати, це можливо зробити таким чином:

```ts
  async enterPassword(userPassword) {
    const passwordInputElement = $('Password');

    // Get focus
    await passwordInputElement.click();

    await passwordInputElement.setValue(userPassword, { mask: true });
  }
```

Вищенаведений код приховає текстове значення в логах WDIO, а також у логах Appium.

Приклад логів:
```text
2025-05-25T23:02:42. 336Z INFO webdriver: DATA { text: "**MASKED**" }
```

Обмеження:
  - В Appium додаткові плагіни можуть витікати інформацію, хоча ми просимо замаскувати її.
  - Хмарні провайдери можуть використовувати проксі для HTTP-логування, яке обходить встановлений механізм маскування.

:::info

Мінімально необхідна версія:
 - WDIO v9.15.0
 - Appium v2.19.0

### Маскування в логах WDIO

Використовуючи конфігурацію `maskingPatterns`, ми можемо замаскувати конфіденційну інформацію в логах WDIO. Однак, логи Appium не покриваються.

Наприклад, якщо ви використовуєте хмарного провайдера і використовуєте рівень info, тоді, найімовірніше, ви "витечете" ключ користувача, як показано нижче:

```text
2025-05-29T19:09:11.309Z INFO @wdio/local-runner: Start worker 0-0 with arg: ./wdio.conf.ts --user=cloud_user --key=myCloudSecretExposedKey --spec myTest.test.ts
```

Щоб протидіяти цьому, ми можемо передати регулярний вираз `'--key=([^ ]*)'`, і тепер у логах ви побачите:

```text
2025-05-29T19:09:11.309Z INFO @wdio/local-runner: Start worker 0-0 with arg: ./wdio.conf.ts --user=cloud_user --key=**MASKED** --spec myTest.test.ts
```

Ви можете досягти цього, надавши регулярний вираз у поле `maskingPatterns` конфігурації.
  - Для кількох регулярних виразів використовуйте один рядок, але з розділеними комами значеннями.
  - Для отримання додаткової інформації про шаблони маскування див. [розділ Masking Patterns у README логера WDIO](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-logger/README.md#masking-patterns).

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

Мінімально необхідна версія:
 - WDIO v9.15.0

### Вимкнення логерів WDIO

Ще один спосіб блокувати логування конфіденційних даних - це знизити або вимкнути рівень логування або вимкнути логер.
Це можна зробити наступним чином:

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

## Сторонні рішення

### Appium
Appium пропонує своє рішення для маскування; див. [Log filter](https://appium.io/docs/en/latest/guides/log-filters/)
 - Може бути складно використовувати їхнє рішення. Один із способів, якщо можливо, це передати токен у вашому рядку, як `@mask@`, і використати його як регулярний вираз
 - У деяких версіях Appium значення також логуються з кожним символом, розділеним комами, тому потрібно бути обережним.
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

Потім передайте ім'я JSON-файлу в поле `logFilters` конфігурації сервісу appium:
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
 - На жаль, рішення працює за принципом "все або нічого", тому всі текстові значення наданих команд будуть замасковані.