---
id: dialog
title: डायलॉग ऑब्जेक्ट
---

डायलॉग ऑब्जेक्ट्स को [`browser`](/docs/api/browser) द्वारा `browser.on('dialog')` इवेंट के माध्यम से डिस्पैच किया जाता है।

डायलॉग ऑब्जेक्ट का उपयोग करने का एक उदाहरण:

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

डायलॉग स्वचालित रूप से डिसमिस कर दिए जाते हैं, जब तक कि कोई `browser.on('dialog')` लिसनर न हो। जब लिसनर मौजूद होता है, तो उसे या तो [`dialog.accept()`](/docs/api/dialog/accept) या [`dialog.dismiss()`](/docs/api/dialog/dismiss) के द्वारा डायलॉग को निपटाना होगा - अन्यथा पेज डायलॉग के इंतजार में फ्रीज हो जाएगा, और क्लिक जैसे एक्शन कभी पूरे नहीं होंगे।

:::