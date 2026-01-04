---
id: globals
title: Глобальні змінні
---

У ваших тестових файлах WebdriverIO розміщує кожен із цих методів та об'єктів у глобальному середовищі. Вам не потрібно імпортувати будь-що, щоб використовувати їх. Однак, якщо ви віддаєте перевагу явним імпортам, ви можете використати `import { browser, $, $$, expect } from '@wdio/globals'` і встановити `injectGlobals: false` у вашій конфігурації WDIO.

Наступні глобальні об'єкти встановлюються, якщо не налаштовано інакше:

- `browser`: [Browser object](https://webdriver.io/docs/api/browser) WebdriverIO
- `driver`: псевдонім для `browser` (використовується при запуску мобільних тестів)
- `multiRemoteBrowser`: псевдонім для `browser` або `driver`, але встановлюється лише для сесій [Multiremote](/docs/multiremote)
- `$`: команда для отримання елемента (більше інформації в [API docs](/docs/api/browser/$))
- `$$`: команда для отримання елементів (більше інформації в [API docs](/docs/api/browser/$$))
- `expect`: фреймворк тверджень для WebdriverIO (див. [API docs](/docs/api/expect-webdriverio))

__Примітка:__ WebdriverIO не контролює використовувані фреймворки (наприклад, Mocha або Jasmine), які встановлюють глобальні змінні при завантаженні свого середовища.