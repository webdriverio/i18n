---
id: dialog
title: Dialog-objektet
---

Dialog-objekt skickas av [`browser`](/docs/api/browser) via händelsen `browser.on('dialog')`.

Ett exempel på hur man använder Dialog-objektet:

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

Dialogrutor avfärdas automatiskt, såvida det inte finns en `browser.on('dialog')` lyssnare. När lyssnaren är närvarande måste den antingen [`dialog.accept()`](/docs/api/dialog/accept) eller [`dialog.dismiss()`](/docs/api/dialog/dismiss) dialogen - annars kommer sidan att frysa i väntan på dialogen, och åtgärder som klick kommer aldrig att slutföras.

:::