---
id: dialog
title: 다이얼로그 객체
---

다이얼로그 객체는 `browser.on('dialog')` 이벤트를 통해 [`browser`](/docs/api/browser)에 의해 발송됩니다.

다이얼로그 객체 사용 예시:

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

다이얼로그는 `browser.on('dialog')` 리스너가 없는 경우 자동으로 무시됩니다. 리스너가 있는 경우에는 반드시 [`dialog.accept()`](/docs/api/dialog/accept) 또는 [`dialog.dismiss()`](/docs/api/dialog/dismiss)를 통해 다이얼로그를 처리해야 합니다. 그렇지 않으면 페이지가 다이얼로그를 기다리며 멈추고, 클릭과 같은 동작이 완료되지 않습니다.

:::