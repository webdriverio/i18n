---
id: dialog
title: डायलॉग ऑब्जेक्ट
---

डायलॉग ऑब्जेक्ट [`browser`](/docs/api/browser) द्वारा `browser.on('dialog')` इवेंट के माध्यम से भेजे जाते हैं।

डायलॉग ऑब्जेक्ट के उपयोग का एक उदाहरण:

```ts
import { browser } from '@wdio/globals'

await browser.url('https://webdriver.io')
browser.on('dialog', async (dialog) => {
    console.log(dialog.message()) // आउटपुट: "Hello Dialog"
    await dialog.dismiss()
})

await browser.execute(() => alert('Hello Dialog'))
```

:::note

डायलॉग स्वचालित रूप से खारिज (dismiss) कर दिए जाते हैं, जब तक कि कम से कम एक `browser.on('dialog')` या `browser.once('dialog')` लिसनर मौजूद न हो। जब कोई लिसनर मौजूद हो, तो उसे डायलॉग को या तो [`dialog.accept()`](/docs/api/dialog/accept) या [`dialog.dismiss()`](/docs/api/dialog/dismiss) करना होगा - अन्यथा पेज डायलॉग की प्रतीक्षा में फ्रीज़ हो जाएगा, और क्लिक जैसी क्रियाएं कभी पूरी नहीं होंगी।

:::

:::info मोबाइल नेटिव डायलॉग

नेटिव iOS/Android परमिशन डायलॉग के लिए ब्राउज़र डायलॉग इवेंट उत्सर्जित (emit) नहीं होते हैं। उन्हें संभालने के लिए इसके बजाय [`browser.acceptDialog`](/docs/api/mobile/acceptDialog) और [`browser.dismissDialog`](/docs/api/mobile/dismissDialog) का उपयोग करें।

:::