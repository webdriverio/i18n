---
id: dialog
title: L'oggetto Dialog
---

Gli oggetti Dialog vengono inviati da [`browser`](/docs/api/browser) tramite l'evento `browser.on('dialog')`.

Un esempio di utilizzo dell'oggetto Dialog:

```ts
import { browser } from '@wdio/globals'

await browser.url('https://webdriver.io')
browser.on('dialog', async (dialog) => {
    console.log(dialog.message()) // restituisce: "Hello Dialog"
    await dialog.dismiss()
})

await browser.execute(() => alert('Hello Dialog'))
```

:::note

I dialog vengono chiusi automaticamente, a meno che non ci sia almeno un listener `browser.on('dialog')` o `browser.once('dialog')`. Quando è presente un listener, questo deve eseguire [`dialog.accept()`](/docs/api/dialog/accept) o [`dialog.dismiss()`](/docs/api/dialog/dismiss) sul dialog, altrimenti la pagina si bloccherà in attesa del dialog e azioni come il clic non verranno mai completate.

:::

:::info Dialog nativi su mobile

Gli eventi dialog del browser non vengono emessi per i dialog nativi di autorizzazione di iOS/Android. Gestiscili invece con [`browser.acceptDialog`](/docs/api/mobile/acceptDialog) e [`browser.dismissDialog`](/docs/api/mobile/dismissDialog).

:::