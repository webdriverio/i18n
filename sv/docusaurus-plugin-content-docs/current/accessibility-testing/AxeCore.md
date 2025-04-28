---
id: axe-core
title: Axe Core
---

Du kan inkludera tillgänglighetstester i din WebdriverIO-testsvit med hjälp av de öppna källkodsverktygen för tillgänglighet [från Deque som kallas Axe](https://www.deque.com/axe/). Installationen är mycket enkel, allt du behöver göra är att installera WebdriverIO Axe-adaptern via:

```bash npm2yarn
npm install -g @axe-core/webdriverio
```

Axe-adaptern kan användas antingen i [fristående eller testrunner](/docs/setuptypes)-läge genom att enkelt importera och initialisera den med [browser-objektet](/docs/api/browser), t.ex.:

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

Du kan hitta mer dokumentation om Axe WebdriverIO-adaptern [på GitHub](https://github.com/dequelabs/axe-core-npm/tree/develop/packages/webdriverio#usage).