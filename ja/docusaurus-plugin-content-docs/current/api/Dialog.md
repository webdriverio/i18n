---
id: dialog
title: Dialogオブジェクト
---

Dialogオブジェクトは、[`browser`](/docs/api/browser)によって`browser.on('dialog')`イベントを介してディスパッチされます。

Dialogオブジェクトの使用例：

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

`browser.on('dialog')`または`browser.once('dialog')`のリスナーが1つも存在しない場合、ダイアログは自動的に閉じられます。リスナーが存在する場合は、ダイアログに対して[`dialog.accept()`](/docs/api/dialog/accept)または[`dialog.dismiss()`](/docs/api/dialog/dismiss)のいずれかを必ず実行する必要があります。そうしないと、ページはダイアログを待機したままフリーズし、クリックなどのアクションが完了しなくなります。

:::

:::info モバイルのネイティブダイアログ

ネイティブのiOS/Androidの権限ダイアログでは、ブラウザのダイアログイベントは発行されません。それらのダイアログは、代わりに[`browser.acceptDialog`](/docs/api/mobile/acceptDialog)および[`browser.dismissDialog`](/docs/api/mobile/dismissDialog)を使用して処理してください。

:::