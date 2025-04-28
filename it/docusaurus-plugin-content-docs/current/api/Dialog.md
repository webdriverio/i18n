---
id: dialog
title: L'Oggetto Dialog
---

Gli oggetti Dialog vengono inviati da [`browser`](/docs/api/browser) tramite l'evento `browser.on('dialog')`.

Un esempio di utilizzo dell'oggetto Dialog:

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

I dialoghi vengono chiusi automaticamente, a meno che non ci sia un listener `browser.on('dialog')`. Quando il listener è presente, deve accettare il dialogo con [`dialog.accept()`](/docs/api/dialog/accept) o chiuderlo con [`dialog.dismiss()`](/docs/api/dialog/dismiss) - altrimenti la pagina si bloccherà in attesa del dialogo, e azioni come click non verranno mai completate.

:::