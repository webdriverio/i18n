---
id: axe-core
title: Axe Core
description: "Deque के ओपन-सोर्स Axe एडाप्टर के साथ, स्टैंडअलोन या टेस्टरनर मोड में, अपने टेस्ट में स्वचालित एक्सेसिबिलिटी जाँच चलाएँ।"
---

आप [Deque के Axe नामक](https://www.deque.com/axe/) ओपन-सोर्स एक्सेसिबिलिटी टूल्स का उपयोग करके अपने WebdriverIO टेस्ट सूट में एक्सेसिबिलिटी टेस्ट शामिल कर सकते हैं। सेटअप बहुत आसान है, आपको बस WebdriverIO Axe एडाप्टर को इस प्रकार इंस्टॉल करना है:

```bash npm2yarn
npm install -g @axe-core/webdriverio
```

Axe एडाप्टर का उपयोग [स्टैंडअलोन या टेस्टरनर](/docs/setuptypes) मोड में किया जा सकता है, बस इसे इम्पोर्ट करें और [browser ऑब्जेक्ट](/docs/api/browser) के साथ इनिशियलाइज़ करें, उदाहरण के लिए:

```ts
import { browser } from '@wdio/globals'
import AxeBuilder from '@axe-core/webdriverio'

describe('Accessibility Test', () => {
    it('should get the accessibility results from a page', async () => {
        const builder = new AxeBuilder({ client: browser })

        await browser.url('https://testingbot.com')
        const result = await builder.analyze()
        console.log('Acessibility Results:', result)
    })
})
```

Axe WebdriverIO एडाप्टर पर अधिक दस्तावेज़ीकरण आप [GitHub पर](https://github.com/dequelabs/axe-core-npm/tree/develop/packages/webdriverio#usage) पा सकते हैं।