---
id: dialog
title: உரையாடல் பொருள்
---

உரையாடல் பொருள்கள் [`browser`](/docs/api/browser) மூலமாக `browser.on('dialog')` நிகழ்வின் வழியாக அனுப்பப்படுகின்றன.

உரையாடல் பொருளைப் பயன்படுத்துவதற்கான எடுத்துக்காட்டு:

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

உரையாடல்கள் தானாகவே நிராகரிக்கப்படுகின்றன, `browser.on('dialog')` கேட்பவர் இல்லாத வரை. கேட்பவர் இருக்கும்போது, அது ஒன்று [`dialog.accept()`](/docs/api/dialog/accept) அல்லது [`dialog.dismiss()`](/docs/api/dialog/dismiss) செய்ய வேண்டும் - இல்லையெனில் பக்கம் உரையாடலுக்காக காத்திருந்து உறைந்துவிடும், மேலும் கிளிக் போன்ற செயல்கள் ஒருபோதும் முடிவடையாது.

:::