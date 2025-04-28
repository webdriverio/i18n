---
id: dialog
title: Dialogオブジェクト
---

Dialogオブジェクトは[`browser`](/docs/api/browser)によって`browser.on('dialog')`イベントを通じて送信されます。

Dialogオブジェクトを使用する例：

```ts
import { browser } from '@wdio/globals'

await browser.url('https://webdriver.io')
browser.on('dialog', async (dialog) => {
    console.log(dialog.message()) // 出力: "Hello Dialog"
    await dialog.dismiss()
})

await browser.execute(() => alert('Hello Dialog'))
```

:::note

Dialogは`browser.on('dialog')`リスナーがない限り、自動的に閉じられます。リスナーが存在する場合、[`dialog.accept()`](/docs/api/dialog/accept)または[`dialog.dismiss()`](/docs/api/dialog/dismiss)のいずれかでダイアログを処理する必要があります - そうしないとページはダイアログを待機して凍結し、クリックなどのアクションは完了しなくなります。

:::