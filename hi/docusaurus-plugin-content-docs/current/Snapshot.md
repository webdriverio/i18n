---
id: snapshot
title: स्नैपशॉट
description: "स्नैपशॉट और इनलाइन स्नैपशॉट टेस्ट के साथ ऑब्जेक्ट्स, DOM संरचनाओं और कमांड परिणामों को असर्ट करें, और विज़ुअल स्नैपशॉट की तुलना करें।"
---

स्नैपशॉट टेस्ट आपके कंपोनेंट या लॉजिक के कई अलग-अलग पहलुओं को एक साथ असर्ट करने के लिए बहुत उपयोगी हो सकते हैं। WebdriverIO में आप किसी भी मनमाने ऑब्जेक्ट के साथ-साथ WebElement DOM संरचना या WebdriverIO कमांड परिणामों के स्नैपशॉट ले सकते हैं।

अन्य टेस्ट फ्रेमवर्क की तरह, WebdriverIO दिए गए मान का एक स्नैपशॉट लेगा, फिर उसकी तुलना टेस्ट के साथ संग्रहीत एक रेफरेंस स्नैपशॉट फ़ाइल से करेगा। यदि दोनों स्नैपशॉट मेल नहीं खाते हैं तो टेस्ट विफल हो जाएगा: या तो परिवर्तन अप्रत्याशित है, या रेफरेंस स्नैपशॉट को परिणाम के नए संस्करण में अपडेट करने की आवश्यकता है।

:::info क्रॉस प्लेटफ़ॉर्म सपोर्ट

ये स्नैपशॉट क्षमताएँ Node.js वातावरण में एंड-टू-एंड टेस्ट चलाने के साथ-साथ ब्राउज़र या मोबाइल डिवाइस पर [यूनिट और कंपोनेंट](/docs/component-testing) टेस्ट चलाने के लिए भी उपलब्ध हैं।

:::

## स्नैपशॉट का उपयोग करें
किसी मान का स्नैपशॉट लेने के लिए, आप [`expect()`](/docs/api/expect-webdriverio) API से `toMatchSnapshot()` का उपयोग कर सकते हैं:

```ts
import { browser, expect } from '@wdio/globals'

it('can take a DOM snapshot', () => {
    await browser.url('https://guinea-pig.webdriver.io/')
    await expect($('.findme')).toMatchSnapshot()
})
```

जब यह टेस्ट पहली बार चलाया जाता है, तो WebdriverIO एक स्नैपशॉट फ़ाइल बनाता है जो इस तरह दिखती है:

```js
// Snapshot v1

exports[`main suite 1 > can take a DOM snapshot 1`] = `"<h1 class="findme">Test CSS Attributes</h1>"`;
```

स्नैपशॉट आर्टिफ़ैक्ट को कोड परिवर्तनों के साथ कमिट किया जाना चाहिए, और आपकी कोड रिव्यू प्रक्रिया के हिस्से के रूप में उसकी समीक्षा की जानी चाहिए। बाद के टेस्ट रन में, WebdriverIO रेंडर किए गए आउटपुट की तुलना पिछले स्नैपशॉट से करेगा। यदि वे मेल खाते हैं, तो टेस्ट पास हो जाएगा। यदि वे मेल नहीं खाते हैं, तो या तो टेस्ट रनर को आपके कोड में एक बग मिला है जिसे ठीक किया जाना चाहिए, या इम्प्लीमेंटेशन बदल गया है और स्नैपशॉट को अपडेट करने की आवश्यकता है।

स्नैपशॉट को अपडेट करने के लिए, `wdio` कमांड में `-s` फ़्लैग (या `--updateSnapshot`) पास करें, उदाहरण के लिए:

```sh
npx wdio run wdio.conf.js -s
```

__नोट:__ यदि आप कई ब्राउज़रों के साथ समानांतर में टेस्ट चलाते हैं तो केवल एक ही स्नैपशॉट बनाया जाता है और उसी से तुलना की जाती है। यदि आप प्रति कैपेबिलिटी एक अलग स्नैपशॉट चाहते हैं, तो कृपया [एक इश्यू दर्ज करें](https://github.com/webdriverio/webdriverio/issues/new?assignees=&labels=Idea+%F0%9F%92%A1%2CNeeds+Triaging+%E2%8F%B3&projects=&template=feature-request.yml&title=%5B%F0%9F%92%A1+Feature%5D%3A+%3Ctitle%3E) और हमें अपने उपयोग के मामले के बारे में बताएं।

## इनलाइन स्नैपशॉट

इसी तरह, आप स्नैपशॉट को टेस्ट फ़ाइल के भीतर इनलाइन संग्रहीत करने के लिए `toMatchInlineSnapshot()` का उपयोग कर सकते हैं।

```ts
import { expect, $ } from '@wdio/globals'

it('can take inline DOM snapshots', () => {
  const elem = $('.container')
  await expect(elem.getCSSProperty()).toMatchInlineSnapshot()
})
```

स्नैपशॉट फ़ाइल बनाने के बजाय, Vitest स्नैपशॉट को एक स्ट्रिंग के रूप में अपडेट करने के लिए सीधे टेस्ट फ़ाइल को संशोधित करेगा:

```ts
import { expect, $ } from '@wdio/globals'

it('can take inline DOM snapshots', () => {
    const elem = $('.container')
    await expect(elem.getCSSProperty()).toMatchInlineSnapshot(`
        {
            "parsed": {
                "alpha": 0,
                "hex": "#000000",
                "rgba": "rgba(0,0,0,0)",
                "type": "color",
            },
            "property": "background-color",
            "value": "rgba(0,0,0,0)",
        }
    `)
})
```

इससे आप अलग-अलग फ़ाइलों के बीच जाए बिना सीधे अपेक्षित आउटपुट देख सकते हैं।

## विज़ुअल स्नैपशॉट

किसी एलिमेंट का DOM स्नैपशॉट लेना सबसे अच्छा विचार नहीं हो सकता है, खासकर यदि DOM संरचना बहुत बड़ी है और उसमें डायनामिक एलिमेंट प्रॉपर्टीज़ हैं। ऐसे मामलों में, एलिमेंट्स के लिए विज़ुअल स्नैपशॉट पर निर्भर रहने की सलाह दी जाती है।

विज़ुअल स्नैपशॉट सक्षम करने के लिए, अपने सेटअप में `@wdio/visual-service` जोड़ें। आप विज़ुअल टेस्टिंग के लिए [डॉक्यूमेंटेशन](/docs/visual-testing#installation) में दिए गए सेटअप निर्देशों का पालन कर सकते हैं।

फिर आप `toMatchElementSnapshot()` के माध्यम से एक विज़ुअल स्नैपशॉट ले सकते हैं, उदाहरण के लिए:

```ts
import { expect, $ } from '@wdio/globals'

it('can take inline DOM snapshots', () => {
  const elem = $('.container')
  await expect(elem.getCSSProperty()).toMatchInlineSnapshot()
})
```

इसके बाद एक इमेज बेसलाइन डायरेक्टरी में संग्रहीत की जाती है। अधिक जानकारी के लिए [विज़ुअल टेस्टिंग](/docs/visual-testing) देखें।