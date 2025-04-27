---
id: dialog
title: O Objeto Dialog
---

Os objetos Dialog são despachados pelo [`browser`](/docs/api/browser) através do evento `browser.on('dialog')`.

Um exemplo de uso do objeto Dialog:

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

Os diálogos são automaticamente dispensados, a menos que exista um listener `browser.on('dialog')`. Quando o listener está presente, ele deve aceitar o diálogo com [`dialog.accept()`](/docs/api/dialog/accept) ou dispensar com [`dialog.dismiss()`](/docs/api/dialog/dismiss) - caso contrário, a página ficará congelada esperando pelo diálogo, e ações como click nunca serão concluídas.

:::