---
id: dialog
title: Das Dialog-Objekt
---

Dialog-Objekte werden vom [`browser`](/docs/api/browser) über das Event `browser.on('dialog')` ausgelöst.

Ein Beispiel für die Verwendung des Dialog-Objekts:

```ts
import { browser } from '@wdio/globals'

await browser.url('https://webdriver.io')
browser.on('dialog', async (dialog) => {
    console.log(dialog.message()) // gibt aus: "Hello Dialog"
    await dialog.dismiss()
})

await browser.execute(() => alert('Hello Dialog'))
```

:::note

Dialoge werden automatisch geschlossen, es sei denn, es gibt mindestens einen `browser.on('dialog')`- oder `browser.once('dialog')`-Listener. Wenn ein Listener vorhanden ist, muss dieser den Dialog entweder mit [`dialog.accept()`](/docs/api/dialog/accept) annehmen oder mit [`dialog.dismiss()`](/docs/api/dialog/dismiss) ablehnen – andernfalls friert die Seite ein, während sie auf den Dialog wartet, und Aktionen wie Klicks werden nie abgeschlossen.

:::

:::info Native mobile Dialoge

Browser-Dialog-Events werden für native iOS/Android-Berechtigungsdialoge nicht ausgelöst. Verwenden Sie stattdessen [`browser.acceptDialog`](/docs/api/mobile/acceptDialog) und [`browser.dismissDialog`](/docs/api/mobile/dismissDialog), um diese zu behandeln.

:::