---
id: dialog
title: El Objeto Dialog
---

Los objetos Dialog son enviados por [`browser`](/docs/api/browser) a través del evento `browser.on('dialog')`.

Un ejemplo de uso del objeto Dialog:

```ts
import { browser } from '@wdio/globals'

await browser.url('https://webdriver.io')
browser.on('dialog', async (dialog) => {
    console.log(dialog.message()) // muestra: "Hello Dialog"
    await dialog.dismiss()
})

await browser.execute(() => alert('Hello Dialog'))
```

:::note

Los diálogos se descartan automáticamente, a menos que haya al menos un listener `browser.on('dialog')` o `browser.once('dialog')`. Cuando hay un listener presente, este debe aceptar el diálogo con [`dialog.accept()`](/docs/api/dialog/accept) o descartarlo con [`dialog.dismiss()`](/docs/api/dialog/dismiss); de lo contrario, la página se congelará esperando el diálogo, y acciones como hacer clic nunca terminarán.

:::

:::info Diálogos nativos móviles

Los eventos de diálogo del navegador no se emiten para los diálogos de permisos nativos de iOS/Android. En su lugar, gestiónelos con [`browser.acceptDialog`](/docs/api/mobile/acceptDialog) y [`browser.dismissDialog`](/docs/api/mobile/dismissDialog).

:::