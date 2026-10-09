---
id: axe-core
title: Axe Core
description: "Ejecuta comprobaciones de accesibilidad automatizadas en tus pruebas con el adaptador de código abierto Axe de Deque, en modo standalone o testrunner."
---

Puedes incluir pruebas de accesibilidad dentro de tu suite de pruebas de WebdriverIO utilizando las herramientas de accesibilidad de código abierto [de Deque llamadas Axe](https://www.deque.com/axe/). La configuración es muy sencilla, todo lo que necesitas hacer es instalar el adaptador Axe de WebdriverIO mediante:

```bash npm2yarn
npm install -g @axe-core/webdriverio
```

El adaptador Axe se puede usar en modo [standalone o testrunner](/docs/setuptypes) simplemente importándolo e inicializándolo con el [objeto browser](/docs/api/browser), por ejemplo:

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

Puedes encontrar más documentación sobre el adaptador Axe de WebdriverIO [en GitHub](https://github.com/dequelabs/axe-core-npm/tree/develop/packages/webdriverio#usage).