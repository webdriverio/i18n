---
id: assertion
title: एसर्शन
description: "बिल्ट-इन expect-webdriverio लाइब्रेरी के साथ ब्राउज़र और एलिमेंट की स्थिति पर एसर्शन लिखें, सॉफ्ट एसर्शन का उपयोग करें और Chai से माइग्रेट करें।"
---

[WDIO टेस्टरनर](https://webdriver.io/docs/clioptions) एक बिल्ट-इन एसर्शन लाइब्रेरी के साथ आता है जो आपको ब्राउज़र या आपके (वेब) एप्लिकेशन के भीतर एलिमेंट्स के विभिन्न पहलुओं पर शक्तिशाली एसर्शन करने की अनुमति देती है। यह [Jests Matchers](https://jestjs.io/docs/en/using-matchers) की कार्यक्षमता को e2e टेस्टिंग के लिए अनुकूलित अतिरिक्त मैचर्स के साथ विस्तारित करती है, उदाहरण के लिए:

```js
const $button = await $('button')
await expect($button).toBeDisplayed()
```

या

```js
const selectOptions = await $$('form select>option')

// सुनिश्चित करें कि select में कम से कम एक option है
await expect(selectOptions).toHaveChildren({ gte: 1 })
```

पूरी सूची के लिए, [expect API डॉक](/docs/api/expect-webdriverio) देखें।

:::info Jasmine

Jasmine फ्रेमवर्क के साथ, `expect` Jasmine के मैचर्स और WebdriverIO मैचर्स को संयोजित करता है। Jasmine के सिंक मैचर्स को `await` की आवश्यकता नहीं होती है, और `expect` के Jest वाले हिस्से, जैसे `expect.soft()`, उपलब्ध नहीं हैं। [Jasmine का उपयोग](/docs/frameworks#assertions) देखें।

:::

## सॉफ्ट एसर्शन

WebdriverIO में डिफ़ॉल्ट रूप से `expect-webdriverio` (5.2.0 से) के सॉफ्ट एसर्शन शामिल हैं। सॉफ्ट एसर्शन आपके टेस्ट को किसी एसर्शन के विफल होने पर भी निष्पादन जारी रखने की अनुमति देते हैं। सभी विफलताओं को एकत्र किया जाता है और टेस्ट के अंत में रिपोर्ट किया जाता है।

### उपयोग

```js
// ये विफल होने पर तुरंत throw नहीं करेंगे
await expect.soft(await $('h1').getText()).toEqual('Basketball Shoes');
await expect.soft(await $('#price').getText()).toMatch(/€\d+/);

// सामान्य एसर्शन अभी भी तुरंत throw करते हैं
await expect(await $('.add-to-cart').isClickable()).toBe(true);
```

## Chai से माइग्रेट करना

[Chai](https://www.chaijs.com/) और [expect-webdriverio](https://github.com/webdriverio/expect-webdriverio#readme) एक साथ मौजूद रह सकते हैं, और कुछ छोटे समायोजनों के साथ expect-webdriverio में सहज परिवर्तन प्राप्त किया जा सकता है। यदि आपने WebdriverIO v6 में अपग्रेड किया है तो डिफ़ॉल्ट रूप से आपको `expect-webdriverio` के सभी एसर्शन तुरंत उपलब्ध होंगे। इसका मतलब है कि वैश्विक रूप से जहाँ भी आप `expect` का उपयोग करते हैं, आप एक `expect-webdriverio` एसर्शन को कॉल करेंगे। यह तब तक लागू है, जब तक कि आपने [`injectGlobals`](/docs/configuration#injectglobals) को `false` पर सेट नहीं किया है या Chai का उपयोग करने के लिए वैश्विक `expect` को स्पष्ट रूप से ओवरराइड नहीं किया है। ऐसी स्थिति में आपको expect-webdriverio के किसी भी एसर्शन तक पहुँच नहीं होगी, जब तक कि आप जहाँ आवश्यक हो वहाँ expect-webdriverio पैकेज को स्पष्ट रूप से इम्पोर्ट न करें।

यह गाइड उदाहरण दिखाएगी कि यदि Chai को स्थानीय रूप से ओवरराइड किया गया है तो Chai से कैसे माइग्रेट करें और यदि Chai को वैश्विक रूप से ओवरराइड किया गया है तो Chai से कैसे माइग्रेट करें।

### स्थानीय

मान लें कि Chai को किसी फ़ाइल में स्पष्ट रूप से इम्पोर्ट किया गया था, उदाहरण के लिए:

```js
// myfile.js - मूल कोड
import { expect as expectChai } from 'chai'

describe('Homepage', () => {
    it('should assert', async () => {
        await browser.url('./')
        expectChai(await browser.getUrl()).to.include('/login')
    })
})
```

इस कोड को माइग्रेट करने के लिए Chai इम्पोर्ट को हटा दें और इसके बजाय नई expect-webdriverio एसर्शन मेथड `toHaveUrl` का उपयोग करें:

```js
// myfile.js - माइग्रेट किया गया कोड
describe('Homepage', () => {
    it('should assert', async () => {
        await browser.url('./')
        await expect(browser).toHaveUrl('/login') // नई expect-webdriverio API मेथड https://webdriver.io/docs/api/expect-webdriverio.html#tohaveurl
    });
});
```

यदि आप एक ही फ़ाइल में Chai और expect-webdriverio दोनों का उपयोग करना चाहते हैं, तो आप Chai इम्पोर्ट को रखेंगे और `expect` डिफ़ॉल्ट रूप से expect-webdriverio एसर्शन होगा, उदाहरण के लिए:

```js
// myfile.js
import { expect as expectChai } from 'chai'
import { expect as expectWDIO } from '@wdio/globals'

describe('Element', () => {
    it('should be displayed', async () => {
        const isDisplayed = await $("#element").isDisplayed()
        expectChai(isDisplayed).to.equal(true); // Chai एसर्शन
    })
});

describe('Other element', () => {
    it('should not be displayed', async () => {
        await expectWDIO($("#element")).not.toBeDisplayed(); // expect-webdriverio एसर्शन
    })
})
```

### वैश्विक

मान लें कि Chai का उपयोग करने के लिए `expect` को वैश्विक रूप से ओवरराइड किया गया था। expect-webdriverio एसर्शन का उपयोग करने के लिए हमें "before" हुक में वैश्विक रूप से एक वेरिएबल सेट करना होगा, उदाहरण के लिए:

```js
// wdio.conf.js
before: async () => {
    await import('expect-webdriverio');
    global.wdioExpect = global.expect;
    const chai = await import('chai');
    global.expect = chai.expect;
}
```

अब Chai और expect-webdriverio का एक साथ उपयोग किया जा सकता है। अपने कोड में आप Chai और expect-webdriverio एसर्शन का उपयोग इस प्रकार करेंगे, उदाहरण के लिए:

```js
// myfile.js
describe('Element', () => {
    it('should be displayed', async () => {
        const isDisplayed = await $("#element").isDisplayed()
        expect(isDisplayed).to.equal(true); // Chai एसर्शन
    });
});

describe('Other element', () => {
    it('should not be displayed', async () => {
        await expectWdio($("#element")).not.toBeDisplayed(); // expect-webdriverio एसर्शन
    });
});
```

माइग्रेट करने के लिए आप धीरे-धीरे प्रत्येक Chai एसर्शन को expect-webdriverio में स्थानांतरित करेंगे। एक बार जब पूरे कोड बेस में सभी Chai एसर्शन बदल दिए जाएँ, तो "before" हुक को हटाया जा सकता है। इसके बाद `wdioExpect` के सभी उदाहरणों को `expect` से बदलने के लिए एक वैश्विक find और replace करने से माइग्रेशन पूरा हो जाएगा।