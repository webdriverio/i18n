---
id: axe-core
title: एक्स कोर
---

आप अपने WebdriverIO टेस्ट सूट के भीतर एक्सेसिबिलिटी टेस्ट को [Deque के एक्स नामक ओपन-सोर्स एक्सेसिबिलिटी टूल्स](https://www.deque.com/axe/) का उपयोग करके शामिल कर सकते हैं। सेटअप बहुत आसान है, आपको केवल WebdriverIO Axe एडाप्टर को इस प्रकार इंस्टॉल करने की आवश्यकता है:

```bash npm2yarn
npm install -g @axe-core/webdriverio
```

Axe एडाप्टर का उपयोग [स्टैंडअलोन या टेस्टरनर](/docs/setuptypes) मोड में [ब्राउज़र ऑब्जेक्ट](/docs/api/browser) के साथ आयात और इनिशियलाइज़ करके किया जा सकता है, उदाहरण के लिए:

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

आप Axe WebdriverIO एडाप्टर पर अधिक दस्तावेज़ [GitHub पर](https://github.com/dequelabs/axe-core-npm/tree/develop/packages/webdriverio#usage) पा सकते हैं।