---
id: axe-core
title: Axe Core
---

Puoi includere test di accessibilità all'interno della tua suite di test WebdriverIO utilizzando gli strumenti di accessibilità open-source [di Deque chiamati Axe](https://www.deque.com/axe/). La configurazione è molto semplice, tutto ciò che devi fare è installare l'adattatore WebdriverIO Axe tramite:

```bash npm2yarn
npm install -g @axe-core/webdriverio
```

L'adattatore Axe può essere utilizzato sia in modalità [standalone che testrunner](/docs/setuptypes) semplicemente importandolo e inizializzandolo con l'[oggetto browser](/docs/api/browser), ad esempio:

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

Puoi trovare maggiori informazioni sull'adattatore Axe WebdriverIO [su GitHub](https://github.com/dequelabs/axe-core-npm/tree/develop/packages/webdriverio#usage).