---
id: dialog
title: L'Objet Dialog
---

Les objets Dialog sont envoyés par [`browser`](/docs/api/browser) via l'événement `browser.on('dialog')`.

Un exemple d'utilisation de l'objet Dialog :

```ts
import { browser } from '@wdio/globals'

await browser.url('https://webdriver.io')
browser.on('dialog', async (dialog) => {
    console.log(dialog.message()) // affiche: "Hello Dialog"
    await dialog.dismiss()
})

await browser.execute(() => alert('Hello Dialog'))
```

:::note

Les dialogues sont automatiquement fermés, sauf s'il existe un écouteur `browser.on('dialog')`. Lorsqu'un écouteur est présent, il doit soit accepter le dialogue avec [`dialog.accept()`](/docs/api/dialog/accept) soit le rejeter avec [`dialog.dismiss()`](/docs/api/dialog/dismiss) - sinon la page se figera en attendant le dialogue, et les actions comme le clic ne se termineront jamais.

:::