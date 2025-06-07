---
id: security
title: Безпека
---

WebdriverIO враховує аспект безпеки при наданні рішень. Нижче наведені деякі способи кращого захисту ваших тестів.

## Найкращі практики

- Ніколи не вписуйте в код безпосередньо конфіденційні дані, які можуть зашкодити вашій організації, якщо вони будуть розкриті у відкритому тексті.
- Використовуйте механізм (наприклад, сховище) для безпечного зберігання ключів і паролів та отримання їх при запуску ваших наскрізних тестів.
- Перевіряйте, що конфіденційні дані не відображаються в журналах та у хмарних провайдерів, наприклад, токени аутентифікації в журналах мережі.

:::info

Навіть для тестових даних важливо запитати, чи зможе зловмисник у разі отримання доступу отримати інформацію або використати ці ресурси зі злими намірами.

:::

## Маскування конфіденційних даних

Якщо ви використовуєте конфіденційні дані під час тестування, важливо переконатися, що вони не видимі для всіх, наприклад, у журналах. Крім того, при використанні хмарного провайдера часто задіяні приватні ключі. Ця інформація повинна бути замаскована в журналах, репортерах та інших точках контакту. Нижче наведені деякі рішення для маскування при запуску тестів без розкриття цих значень.

### WebDriverIO

#### Маскування текстових значень команд

Команди `addValue` та `setValue` підтримують булеве значення mask для маскування в журналах, а також у репортерах. Крім того, інші інструменти, такі як інструменти продуктивності та сторонні інструменти, також отримуватимуть замасковану версію, підвищуючи безпеку.

Наприклад, якщо ви використовуєте реального виробничого користувача і вам потрібно ввести пароль, який ви хочете замаскувати, то це можливо за допомогою наступного:

```ts
  async enterPassword(userPassword) {
    const passwordInputElement = $('Password');

    // Get focus
    await passwordInputElement.click();

    await passwordInputElement.setValue(userPassword, { mask: true });
  }
```

Вищенаведений код приховає текстове значення з журналів WDIO таким чином:

Приклад журналів:
```text
INFO webdriver: DATA { text: "**MASKED**" }
```

Репортери, такі як Allure, та сторонні інструменти, такі як Percy від BrowserStack, також оброблятимуть замасковану версію.
Разом з відповідною версією Appium, журнали Appium також не міститимуть ваших конфіденційних даних.

:::info

Обмеження:
  - В Appium додаткові плагіни можуть витікати інформацію, навіть якщо ми просимо замаскувати інформацію.
  - Хмарні провайдери можуть використовувати проксі для HTTP-журналювання, що обходить встановлений механізм маскування.
  - Команда `getValue` не підтримується. Крім того, якщо вона використовується для того ж елемента, вона може розкрити значення, яке планувалося замаскувати при використанні `addValue` або `setValue`.

Мінімальна необхідна версія:
 - WDIO v9.15.0
 - Appium v3.0.0

:::

#### Маскування в журналах WDIO

За допомогою конфігурації `maskingPatterns` ми можемо маскувати конфіденційну інформацію з журналів WDIO. Однак журнали Appium не покриваються.

Наприклад, якщо ви використовуєте хмарного провайдера і використовуєте рівень інформації (info), то, швидше за все, ви "витікаєте" ключ користувача, як показано нижче:

```text
INFO @wdio/local-runner: Start worker 0-0 with arg: ./wdio.conf.ts --user=cloud_user --key=myCloudSecretExposedKey --spec myTest.test.ts
```

Щоб протидіяти цьому, ми можемо передати регулярний вираз `'--key=([^ ]*)'`, і тепер у журналах ви побачите 

```text
INFO @wdio/local-runner: Start worker 0-0 with arg: ./wdio.conf.ts --user=cloud_user --key=**MASKED** --spec myTest.test.ts
```

Ви можете досягти вищезазначеного, надавши регулярний вираз у поле `maskingPatterns` конфігурації.
  - Для кількох регулярних виразів використовуйте один рядок, але з розділеними комами значеннями.
  - Для отримання додаткової інформації про шаблони маскування див. [розділ Шаблони маскування в README журналу WDIO](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-logger/README.md#masking-patterns).

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

:::

#### Вимкнення журналів WDIO

Інший спосіб блокування журналювання конфіденційних даних — знизити або відключити рівень журналювання чи вимкнути журнал.
Це можна зробити таким чином:

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

### Сторонні рішення

#### Appium
Appium пропонує своє рішення для маскування; див. [Log filter](https://appium.io/docs/en/latest/guides/log-filters/)
 - Їхнє рішення може бути складним у використанні. Один із способів — передати в рядку токен, наприклад, `@mask@` і використовувати його як регулярний вираз
 - У деяких версіях Appium значення також журналюються з розділенням кожного символу комами, тому потрібно бути обережним.
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

Потім передайте назву JSON-файлу в поле `logFilters` конфігурації сервісу appium:
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

BrowserStack також пропонує певний рівень маскування для приховування деяких даних; див. [hide sensitive data](https://www.browserstack.com/docs/automate/selenium/hide-sensitive-data)
 - На жаль, це рішення працює за принципом "все або нічого", тому всі текстові значення наданих команд будуть замасковані.