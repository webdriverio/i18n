---
id: axe-core
title: Axe Core
---

Ви можете включити тести доступності у ваш WebdriverIO тестовий набір, використовуючи інструменти доступності з відкритим кодом [від Deque під назвою Axe](https://www.deque.com/axe/). Налаштування дуже просте, все, що вам потрібно зробити, це встановити WebdriverIO Axe адаптер за допомогою:

```bash npm2yarn
npm install -g @axe-core/webdriverio
```

Axe адаптер можна використовувати як у [автономному режимі, так і в режимі testrunner](/docs/setuptypes), просто імпортувавши та ініціалізувавши його з [об'єктом browser](/docs/api/browser), наприклад:

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

Більше документації про Axe WebdriverIO адаптер можна знайти [на GitHub](https://github.com/dequelabs/axe-core-npm/tree/develop/packages/webdriverio#usage).