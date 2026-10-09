---
id: dialog
title: Dialog-objektet
---

Dialog-objekt skickas av [`browser`](/docs/api/browser) via händelsen `browser.on('dialog')`.

Ett exempel på hur Dialog-objektet används:

```ts
import { browser } from '@wdio/globals'

await browser.url('https://webdriver.io')
browser.on('dialog', async (dialog) => {
    console.log(dialog.message()) // skriver ut: "Hello Dialog"
    await dialog.dismiss()
})

await browser.execute(() => alert('Hello Dialog'))
```

:::note

Dialoger avfärdas automatiskt, såvida det inte finns minst en `browser.on('dialog')`- eller `browser.once('dialog')`-lyssnare. När en lyssnare finns måste den antingen anropa [`dialog.accept()`](/docs/api/dialog/accept) eller [`dialog.dismiss()`](/docs/api/dialog/dismiss) för dialogen – annars fryser sidan i väntan på dialogen, och åtgärder som klick kommer aldrig att slutföras.

:::

:::info Inbyggda mobildialoger

Webbläsarens dialoghändelser skickas inte för inbyggda behörighetsdialoger i iOS/Android. Hantera dessa med [`browser.acceptDialog`](/docs/api/mobile/acceptDialog) och [`browser.dismissDialog`](/docs/api/mobile/dismissDialog) istället.

:::