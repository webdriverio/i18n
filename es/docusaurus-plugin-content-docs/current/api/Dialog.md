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
    console.log(dialog.message()) // outputs: "Hello Dialog"
    await dialog.dismiss()
})

await browser.execute(() => alert('Hello Dialog'))
```

:::note

Los diálogos se descartan automáticamente, a menos que haya un listener `browser.on('dialog')`. Cuando el listener está presente, debe aceptar el diálogo con [`dialog.accept()`](/docs/api/dialog/accept) o descartarlo con [`dialog.dismiss()`](/docs/api/dialog/dismiss) - de lo contrario, la página se congelará esperando el diálogo, y acciones como click nunca terminarán.

:::