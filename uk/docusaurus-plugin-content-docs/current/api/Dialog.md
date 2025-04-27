---
id: dialog
title: Об'єкт Діалогу
---

Об'єкти діалогу відправляються [`browser`](/docs/api/browser) за допомогою події `browser.on('dialog')`.

Приклад використання об'єкта Dialog:

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

Діалоги автоматично закриваються, якщо немає слухача `browser.on('dialog')`. Коли слухач присутній, він повинен або прийняти діалог за допомогою [`dialog.accept()`](/docs/api/dialog/accept), або закрити його за допомогою [`dialog.dismiss()`](/docs/api/dialog/dismiss) - інакше сторінка зависне в очікуванні діалогу, і такі дії, як клік, ніколи не завершаться.

:::