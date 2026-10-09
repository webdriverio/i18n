---
id: axe-core
title: Axe Core
description: "Kör automatiserade tillgänglighetskontroller i dina tester med Deques Axe-adapter med öppen källkod, i fristående läge eller testrunner-läge."
---

Du kan inkludera tillgänglighetstester i din WebdriverIO-testsvit med hjälp av tillgänglighetsverktygen med öppen källkod [från Deque som heter Axe](https://www.deque.com/axe/). Installationen är mycket enkel, allt du behöver göra är att installera WebdriverIO Axe-adaptern via:

```bash npm2yarn
npm install -g @axe-core/webdriverio
```

Axe-adaptern kan användas antingen i [fristående läge eller testrunner-läge](/docs/setuptypes) genom att helt enkelt importera och initiera den med [browser-objektet](/docs/api/browser), t.ex.:

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

Du hittar mer dokumentation om Axe WebdriverIO-adaptern [på GitHub](https://github.com/dequelabs/axe-core-npm/tree/develop/packages/webdriverio#usage).