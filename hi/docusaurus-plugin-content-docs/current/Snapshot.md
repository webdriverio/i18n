---
id: snapshot
title: स्नैपशॉट
---

स्नैपशॉट टेस्ट आपके कंपोनेंट या लॉजिक के विभिन्न पहलुओं को एक साथ जांचने के लिए बहुत उपयोगी हो सकते हैं। WebdriverIO में आप किसी भी मनमाने ऑब्जेक्ट के साथ-साथ WebElement DOM स्ट्रक्चर या WebdriverIO कमांड रिजल्ट के स्नैपशॉट ले सकते हैं।

अन्य टेस्ट फ्रेमवर्क की तरह, WebdriverIO दिए गए वैल्यू का स्नैपशॉट लेगा, फिर उसे टेस्ट के साथ संग्रहित रेफरेंस स्नैपशॉट फाइल से तुलना करेगा। अगर दो स्नैपशॉट मैच नहीं करते हैं तो टेस्ट फेल हो जाएगा: या तो परिवर्तन अप्रत्याशित है, या रेफरेंस स्नैपशॉट को परिणाम के नए वर्जन के अनुसार अपडेट करने की आवश्यकता है।

:::info क्रॉस प्लेटफॉर्म सपोर्ट

ये स्नैपशॉट क्षमताएं Node.js एनवायरनमेंट में एंड-टू-एंड टेस्ट चलाने के साथ-साथ ब्राउज़र या मोबाइल डिवाइस पर [यूनिट और कंपोनेंट](/docs/component-testing) टेस्ट चलाने के लिए भी उपलब्ध हैं।

:::

## स्नैपशॉट का उपयोग करें
किसी वैल्यू का स्नैपशॉट लेने के लिए, आप [`expect()`](/docs/api/expect-webdriverio) API से `toMatchSnapshot()` का उपयोग कर सकते हैं:

```ts
import { browser, expect } from '@wdio/globals'

it('can take a DOM snapshot', () => {
    await browser.url('https://guinea-pig.webdriver.io/')
    await expect($('.findme')).toMatchSnapshot()
})
```

जब यह टेस्ट पहली बार चलाया जाता है, तो WebdriverIO इस प्रकार की स्नैपशॉट फाइल बनाता है:

```js
// Snapshot v1

exports[`main suite 1 > can take a DOM snapshot 1`] = `"<h1 class="findme">Test CSS Attributes</h1>"`;
```

स्नैपशॉट आर्टिफैक्ट को कोड परिवर्तनों के साथ कमिट किया जाना चाहिए और आपकी कोड समीक्षा प्रक्रिया के हिस्से के रूप में समीक्षा की जानी चाहिए। बाद के टेस्ट रन में, WebdriverIO रेंडर किए गए आउटपुट की तुलना पिछले स्नैपशॉट से करेगा। यदि वे मिलते हैं, तो टेस्ट पास हो जाएगा। यदि वे मेल नहीं खाते हैं, तो या तो टेस्ट रनर ने आपके कोड में एक बग पाया है जिसे ठीक किया जाना चाहिए, या कार्यान्वयन बदल गया है और स्नैपशॉट को अपडेट करने की आवश्यकता है।

स्नैपशॉट को अपडेट करने के लिए, `wdio` कमांड में `-s` फ्लैग (या `--updateSnapshot`) पास करें, उदाहरण के लिए:

```sh
npx wdio run wdio.conf.js -s
```

__नोट:__ यदि आप एक साथ कई ब्राउज़रों के साथ टेस्ट चलाते हैं, तो केवल एक स्नैपशॉट बनाया जाता है और उसकी तुलना की जाती है। यदि आप प्रति क्षमता अलग-अलग स्नैपशॉट चाहते हैं, तो कृपया [मुद्दा उठाएँ](https://github.com/webdriverio/webdriverio/issues/new?assignees=&labels=Idea+%F0%9F%92%A1%2CNeeds+Triaging+%E2%8F%B3&projects=&template=feature-request.yml&title=%5B%F0%9F%92%A1+Feature%5D%3A+%3Ctitle%3E) और हमें अपने उपयोग के मामले के बारे में बताएँ।

## इनलाइन स्नैपशॉट

इसी तरह, आप टेस्ट फाइल के भीतर स्नैपशॉट को इनलाइन स्टोर करने के लिए `toMatchInlineSnapshot()` का उपयोग कर सकते हैं।

```ts
import { expect, $ } from '@wdio/globals'

it('can take inline DOM snapshots', () => {
  const elem = $('.container')
  await expect(elem.getCSSProperty()).toMatchInlineSnapshot()
})
```

स्नैपशॉट फाइल बनाने के बजाय, Vitest स्नैपशॉट को एक स्ट्रिंग के रूप में अपडेट करने के लिए सीधे टेस्ट फाइल को संशोधित करेगा:

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

यह आपको विभिन्न फाइलों में जाने के बिना सीधे अपेक्षित आउटपुट देखने की अनुमति देता है।

## विजुअल स्नैपशॉट

किसी एलिमेंट का DOM स्नैपशॉट लेना सबसे अच्छा विचार नहीं हो सकता है, खासकर यदि DOM स्ट्रक्चर बहुत बड़ा है और इसमें डायनामिक एलिमेंट प्रॉपर्टीज शामिल हैं। इन मामलों में, एलिमेंट्स के लिए विजुअल स्नैपशॉट पर निर्भर रहना अनुशंसित है।

विजुअल स्नैपशॉट को सक्षम करने के लिए, अपने सेटअप में `@wdio/visual-service` जोड़ें। आप विजुअल टेस्टिंग के लिए [दस्तावेज़ीकरण](/docs/visual-testing#installation) में सेट-अप निर्देशों का पालन कर सकते हैं।

फिर आप `toMatchElementSnapshot()` के माध्यम से विजुअल स्नैपशॉट ले सकते हैं, उदाहरण के लिए:

```ts
import { expect, $ } from '@wdio/globals'

it('can take inline DOM snapshots', () => {
  const elem = $('.container')
  await expect(elem.getCSSProperty()).toMatchInlineSnapshot()
})
```

फिर बेसलाइन डायरेक्टरी में एक इमेज स्टोर की जाती है। अधिक जानकारी के लिए [विजुअल टेस्टिंग](/docs/visual-testing) देखें।