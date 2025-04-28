---
id: dialog
title: Obiekt Dialog
---

Obiekty Dialog są wysyłane przez [`browser`](/docs/api/browser) za pośrednictwem zdarzenia `browser.on('dialog')`.

Przykład użycia obiektu Dialog:

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

Dialogi są automatycznie odrzucane, chyba że istnieje nasłuchiwacz `browser.on('dialog')`. Gdy nasłuchiwacz jest obecny, musi on albo [`dialog.accept()`](/docs/api/dialog/accept) lub [`dialog.dismiss()`](/docs/api/dialog/dismiss) dialog - w przeciwnym razie strona zawiesi się czekając na dialog, a akcje takie jak kliknięcie nigdy się nie zakończą.

:::