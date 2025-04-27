---
id: axe-core
title: Axe Core
---

Вы можете включить тесты на доступность в ваш набор тестов WebdriverIO, используя инструменты доступности с открытым исходным кодом [от Deque под названием Axe](https://www.deque.com/axe/). Настройка очень проста, всё что вам нужно сделать, это установить адаптер WebdriverIO Axe через:

```bash npm2yarn
npm install -g @axe-core/webdriverio
```

Адаптер Axe может использоваться как в [автономном режиме, так и в режиме тестового запуска](/docs/setuptypes), просто импортируя и инициализируя его с [объектом browser](/docs/api/browser), например:

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

Более подробную документацию по адаптеру Axe WebdriverIO можно найти [на GitHub](https://github.com/dequelabs/axe-core-npm/tree/develop/packages/webdriverio#usage).