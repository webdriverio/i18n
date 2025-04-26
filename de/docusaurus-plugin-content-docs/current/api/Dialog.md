---
id: dialog
title: Das Dialog-Objekt
---

Dialog-Objekte werden vom [`browser`](/docs/api/browser) über das `browser.on('dialog')`-Ereignis ausgelöst.

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

Dialoge werden automatisch abgelehnt, es sei denn, es gibt einen `browser.on('dialog')`-Listener. Wenn ein Listener vorhanden ist, muss er entweder [`dialog.accept()`](/docs/api/dialog/accept) oder [`dialog.dismiss()`](/docs/api/dialog/dismiss) für den Dialog aufrufen - andernfalls wird die Seite beim Warten auf den Dialog einfrieren, und Aktionen wie Klicks werden niemals abgeschlossen.

:::