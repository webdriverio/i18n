---
id: dialog
title: O Objeto Dialog
---

Objetos Dialog são despachados pelo [`browser`](/docs/api/browser) através do evento `browser.on('dialog')`.

Um exemplo de uso do objeto Dialog:

```ts
import { browser } from '@wdio/globals'

await browser.url('https://webdriver.io')
browser.on('dialog', async (dialog) => {
    console.log(dialog.message()) // exibe: "Hello Dialog"
    await dialog.dismiss()
})

await browser.execute(() => alert('Hello Dialog'))
```

:::note

Os diálogos são descartados automaticamente, a menos que exista pelo menos um listener `browser.on('dialog')` ou `browser.once('dialog')`. Quando um listener está presente, ele deve chamar [`dialog.accept()`](/docs/api/dialog/accept) ou [`dialog.dismiss()`](/docs/api/dialog/dismiss) no diálogo - caso contrário, a página ficará congelada aguardando o diálogo, e ações como clique nunca serão concluídas.

:::

:::info Diálogos nativos em dispositivos móveis

Eventos de diálogo do navegador não são emitidos para diálogos nativos de permissão do iOS/Android. Em vez disso, trate-os com [`browser.acceptDialog`](/docs/api/mobile/acceptDialog) e [`browser.dismissDialog`](/docs/api/mobile/dismissDialog).

:::