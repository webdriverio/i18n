---
id: dialog
title: Объект Dialog
---

Объекты Dialog отправляются через [`browser`](/docs/api/browser) с помощью события `browser.on('dialog')`.

Пример использования объекта Dialog:

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

Диалоги автоматически закрываются, если нет слушателя `browser.on('dialog')`. Когда слушатель присутствует, он должен либо вызвать [`dialog.accept()`](/docs/api/dialog/accept), либо [`dialog.dismiss()`](/docs/api/dialog/dismiss) для диалога - иначе страница зависнет в ожидании диалога, и действия вроде click никогда не завершатся.

:::