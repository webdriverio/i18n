---
id: axe-core
title: Axe Core
description: "Uruchamiaj automatyczne testy dostępności w swoich testach za pomocą otwartoźródłowego adaptera Axe od Deque, w trybie standalone lub testrunner."
---

Możesz włączyć testy dostępności do swojego zestawu testów WebdriverIO, korzystając z otwartoźródłowych narzędzi do testowania dostępności [od Deque o nazwie Axe](https://www.deque.com/axe/). Konfiguracja jest bardzo prosta – wystarczy zainstalować adapter WebdriverIO Axe za pomocą:

```bash npm2yarn
npm install -g @axe-core/webdriverio
```

Adapter Axe może być używany zarówno w trybie [standalone, jak i testrunner](/docs/setuptypes), po prostu importując go i inicjalizując z [obiektem browser](/docs/api/browser), np.:

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

Więcej dokumentacji na temat adaptera Axe dla WebdriverIO znajdziesz [na GitHubie](https://github.com/dequelabs/axe-core-npm/tree/develop/packages/webdriverio#usage).