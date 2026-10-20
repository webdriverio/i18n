---
id: dialog
title: El objeto Dialog
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

Los diálogos se descartan automáticamente, a menos que haya al menos un listener `browser.on('dialog')` o `browser.once('dialog')`. Cuando hay un listener presente, este debe aceptar con [`dialog.accept()`](/docs/api/dialog/accept) o descartar con [`dialog.dismiss()`](/docs/api/dialog/dismiss) el diálogo; de lo contrario, la página se congelará esperando al diálogo y acciones como hacer clic nunca terminarán.

:::

:::info Diálogos nativos en móviles

Los eventos de diálogo del navegador no se emiten para los diálogos de permisos nativos de iOS/Android. En su lugar, gestiónalos con [`browser.acceptDialog`](/docs/api/mobile/acceptDialog) y [`browser.dismissDialog`](/docs/api/mobile/dismissDialog).

:::