---
id: dialog
title: L'objet Dialog
---

Les objets Dialog sont émis par [`browser`](/docs/api/browser) via l'événement `browser.on('dialog')`.

Un exemple d'utilisation de l'objet Dialog :

```ts
import { browser } from '@wdio/globals'

await browser.url('https://webdriver.io')
browser.on('dialog', async (dialog) => {
    console.log(dialog.message()) // affiche : "Hello Dialog"
    await dialog.dismiss()
})

await browser.execute(() => alert('Hello Dialog'))
```

:::note

Les boîtes de dialogue sont automatiquement fermées, sauf s'il existe au moins un écouteur `browser.on('dialog')` ou `browser.once('dialog')`. Lorsqu'un écouteur est présent, il doit soit accepter la boîte de dialogue avec [`dialog.accept()`](/docs/api/dialog/accept), soit la fermer avec [`dialog.dismiss()`](/docs/api/dialog/dismiss) - sinon la page restera bloquée en attente de la boîte de dialogue, et des actions comme le clic ne se termineront jamais.

:::

:::info Boîtes de dialogue natives mobiles

Les événements de boîte de dialogue du navigateur ne sont pas émis pour les boîtes de dialogue natives de permissions iOS/Android. Gérez-les plutôt avec [`browser.acceptDialog`](/docs/api/mobile/acceptDialog) et [`browser.dismissDialog`](/docs/api/mobile/dismissDialog).

:::