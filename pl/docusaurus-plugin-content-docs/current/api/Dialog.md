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
    console.log(dialog.message()) // wyświetla: "Hello Dialog"
    await dialog.dismiss()
})

await browser.execute(() => alert('Hello Dialog'))
```

:::note

Okna dialogowe są automatycznie odrzucane, chyba że istnieje co najmniej jeden nasłuchiwacz `browser.on('dialog')` lub `browser.once('dialog')`. Gdy nasłuchiwacz jest obecny, musi on zaakceptować okno dialogowe za pomocą [`dialog.accept()`](/docs/api/dialog/accept) lub odrzucić je za pomocą [`dialog.dismiss()`](/docs/api/dialog/dismiss) - w przeciwnym razie strona zawiesi się, oczekując na okno dialogowe, a akcje takie jak kliknięcie nigdy się nie zakończą.

:::

:::info Natywne okna dialogowe na urządzeniach mobilnych

Zdarzenia okien dialogowych przeglądarki nie są emitowane dla natywnych okien dialogowych uprawnień w systemach iOS/Android. Zamiast tego obsłuż je za pomocą [`browser.acceptDialog`](/docs/api/mobile/acceptDialog) i [`browser.dismissDialog`](/docs/api/mobile/dismissDialog).

:::