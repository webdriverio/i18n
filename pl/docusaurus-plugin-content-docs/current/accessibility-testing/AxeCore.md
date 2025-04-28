---
id: axe-core
title: Axe Core
---

Możesz włączyć testy dostępności do swojego zestawu testów WebdriverIO, korzystając z narzędzi open-source [od Deque o nazwie Axe](https://www.deque.com/axe/). Konfiguracja jest bardzo prosta, wystarczy zainstalować adapter WebdriverIO Axe za pomocą:

```bash npm2yarn
npm install -g @axe-core/webdriverio
```

Adapter Axe może być używany zarówno w trybie [standalone, jak i testrunner](/docs/setuptypes) poprzez proste zaimportowanie i zainicjowanie go za pomocą [obiektu browser](/docs/api/browser), np.:

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

Więcej dokumentacji na temat adaptera Axe WebdriverIO znajdziesz [na GitHubie](https://github.com/dequelabs/axe-core-npm/tree/develop/packages/webdriverio#usage).