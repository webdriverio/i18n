---
id: axe-core
title: Axe Core
description: "Execute verificações automatizadas de acessibilidade nos seus testes com o adaptador Axe de código aberto da Deque, no modo standalone ou testrunner."
---

Você pode incluir testes de acessibilidade em sua suíte de testes WebdriverIO usando as ferramentas de acessibilidade de código aberto [da Deque chamadas Axe](https://www.deque.com/axe/). A configuração é muito fácil, tudo o que você precisa fazer é instalar o adaptador Axe do WebdriverIO via:

```bash npm2yarn
npm install -g @axe-core/webdriverio
```

O adaptador Axe pode ser usado tanto no modo [standalone quanto testrunner](/docs/setuptypes), simplesmente importando-o e inicializando-o com o [objeto browser](/docs/api/browser), por exemplo:

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

Você pode encontrar mais documentação sobre o adaptador Axe para WebdriverIO [no GitHub](https://github.com/dequelabs/axe-core-npm/tree/develop/packages/webdriverio#usage).