---
id: axe-core
title: Axe Core
description: "Запускайте автоматические проверки доступности в своих тестах с помощью адаптера Axe с открытым исходным кодом от Deque в режиме standalone или testrunner."
---

Вы можете включить тесты доступности в свой набор тестов WebdriverIO, используя инструменты для проверки доступности с открытым исходным кодом [от Deque под названием Axe](https://www.deque.com/axe/). Настройка очень проста: всё, что вам нужно сделать, — это установить адаптер WebdriverIO Axe с помощью команды:

```bash npm2yarn
npm install -g @axe-core/webdriverio
```

Адаптер Axe можно использовать как в режиме [standalone, так и в режиме testrunner](/docs/setuptypes), просто импортировав его и инициализировав с помощью [объекта browser](/docs/api/browser), например:

```ts
import { browser } from '@wdio/globals'
import AxeBuilder from '@axe-core/webdriverio'

describe('Accessibility Test', () => {
    it('should get the accessibility results from a page', async () => {
        const builder = new AxeBuilder({ client: browser })

        await browser.url('https://testingbot.com')
        const result = await builder.analyze()
        console.log('Acessibility Results:', result)
    })
})
```

Дополнительную документацию по адаптеру Axe для WebdriverIO можно найти [на GitHub](https://github.com/dequelabs/axe-core-npm/tree/develop/packages/webdriverio#usage).