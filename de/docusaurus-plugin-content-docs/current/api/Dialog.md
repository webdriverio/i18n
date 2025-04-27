---
id: dialog
title: Das Dialog-Objekt
---

Dialog-Objekte werden von [`browser`](/docs/api/browser) über das `browser.on('dialog')` Ereignis ausgelöst.

Ein Beispiel für die Verwendung des Dialog-Objekts:

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

Dialoge werden automatisch geschlossen, es sei denn, es gibt einen `browser.on('dialog')` Listener. Wenn ein Listener vorhanden ist, muss er entweder mit [`dialog.accept()`](/docs/api/dialog/accept) oder [`dialog.dismiss()`](/docs/api/dialog/dismiss) den Dialog bestätigen oder abbrechen - andernfalls wird die Seite einfrieren und auf den Dialog warten, und Aktionen wie Klicks werden nie abgeschlossen.

:::
