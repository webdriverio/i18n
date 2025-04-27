---
id: globals
title: Глобальные переменные
---

В ваших тестовых файлах WebdriverIO помещает каждый из этих методов и объектов в глобальную среду. Вам не нужно импортировать что-либо для их использования. Однако, если вы предпочитаете явные импорты, вы можете сделать `import { browser, $, $$, expect } from '@wdio/globals'` и установить `injectGlobals: false` в вашей конфигурации WDIO.

Следующие глобальные объекты устанавливаются, если не настроено иное:

- `browser`: [Объект Browser](https://webdriver.io/docs/api/browser) WebdriverIO
- `driver`: псевдоним для `browser` (используется при запуске мобильных тестов)
- `multiremotebrowser`: псевдоним для `browser` или `driver`, но устанавливается только для сессий [Multiremote](/docs/multiremote)
- `$`: команда для получения элемента (подробнее в [API docs](/docs/api/browser/$))
- `$$`: команда для получения элементов (подробнее в [API docs](/docs/api/browser/$$))
- `expect`: фреймворк утверждений для WebdriverIO (см. [API docs](/docs/api/expect-webdriverio))

__Примечание:__ WebdriverIO не контролирует используемые фреймворки (например, Mocha или Jasmine), устанавливающие глобальные переменные при инициализации их среды.