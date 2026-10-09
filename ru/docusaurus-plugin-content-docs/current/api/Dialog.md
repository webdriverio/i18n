---
id: dialog
title: Объект Dialog
---

Объекты Dialog отправляются объектом [`browser`](/docs/api/browser) через событие `browser.on('dialog')`.

Пример использования объекта Dialog:

```ts
import { browser } from '@wdio/globals'

await browser.url('https://webdriver.io')
browser.on('dialog', async (dialog) => {
    console.log(dialog.message()) // выводит: "Hello Dialog"
    await dialog.dismiss()
})

await browser.execute(() => alert('Hello Dialog'))
```

:::note

Диалоги закрываются автоматически, если нет хотя бы одного слушателя `browser.on('dialog')` или `browser.once('dialog')`. Если слушатель присутствует, он должен либо принять диалог с помощью [`dialog.accept()`](/docs/api/dialog/accept), либо отклонить его с помощью [`dialog.dismiss()`](/docs/api/dialog/dismiss) — в противном случае страница зависнет в ожидании диалога, и такие действия, как клик, никогда не завершатся.

:::

:::info Нативные диалоги на мобильных устройствах

События диалогов браузера не генерируются для нативных диалогов разрешений iOS/Android. Вместо этого обрабатывайте их с помощью [`browser.acceptDialog`](/docs/api/mobile/acceptDialog) и [`browser.dismissDialog`](/docs/api/mobile/dismissDialog).

:::