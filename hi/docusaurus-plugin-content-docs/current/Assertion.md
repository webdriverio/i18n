---
id: assertion
title: सत्यापन
---

[WDIO टेस्टरनर](https://webdriver.io/docs/clioptions) एक अंतर्निहित सत्यापन लाइब्रेरी के साथ आता है जो आपको ब्राउज़र के विभिन्न पहलुओं या आपके (वेब) एप्लिकेशन के भीतर तत्वों पर शक्तिशाली सत्यापन करने की अनुमति देता है। यह [Jests Matchers](https://jestjs.io/docs/en/using-matchers) की कार्यक्षमता को अतिरिक्त, e2e परीक्षण अनुकूलित, मैचर्स के साथ विस्तारित करता है, उदाहरण के लिए:

```js
const $button = await $('button')
await expect($button).toBeDisplayed()
```

या

```js
const selectOptions = await $$('form select>option')

// make sure there is at least one option in select
await expect(selectOptions).toHaveChildren({ gte: 1 })
```

पूरी सूची के लिए, [expect API doc](/docs/api/expect-webdriverio) देखें।

## सॉफ्ट सत्यापन

WebdriverIO में expect-webdriver(5.2.0) से सॉफ्ट सत्यापन डिफ़ॉल्ट रूप से शामिल हैं। सॉफ्ट सत्यापन आपके परीक्षणों को तब भी जारी रखने की अनुमति देते हैं जब कोई सत्यापन विफल हो जाता है। सभी विफलताओं को एकत्रित किया जाता है और परीक्षण के अंत में रिपोर्ट किया जाता है।

### उपयोग

```js
// These won't throw immediately if they fail
await expect.soft(await $('h1').getText()).toEqual('Basketball Shoes');
await expect.soft(await $('#price').getText()).toMatch(/€\d+/);

// Regular assertions still throw immediately
await expect(await $('.add-to-cart').isClickable()).toBe(true);
```

## Chai से माइग्रेट करना

[Chai](https://www.chaijs.com/) और [expect-webdriverio](https://github.com/webdriverio/expect-webdriverio#readme) एक साथ रह सकते हैं, और कुछ छोटे समायोजनों के साथ expect-webdriverio में एक सुचारू संक्रमण प्राप्त किया जा सकता है। यदि आपने WebdriverIO v6 में अपग्रेड किया है, तो डिफ़ॉल्ट रूप से आपके पास `expect-webdriverio` से सभी सत्यापन तक पहुंच होगी। इसका मतलब है कि वैश्विक रूप से जहां भी आप `expect` का उपयोग करते हैं, आप एक `expect-webdriverio` सत्यापन को कॉल करेंगे। ऐसा तब तक है, जब तक आप [`injectGlobals`](/docs/configuration#injectglobals) को `false` पर सेट नहीं करते या वैश्विक `expect` को स्पष्ट रूप से Chai का उपयोग करने के लिए ओवरराइड नहीं करते। इस मामले में, आपके पास expect-webdriverio पैकेज को स्पष्ट रूप से आयात किए बिना किसी भी expect-webdriverio सत्यापन तक पहुंच नहीं होगी, जहां आपको इसकी आवश्यकता है।

यह गाइड दिखाएगी कि कैसे Chai से माइग्रेट करें अगर इसे स्थानीय रूप से ओवरराइड किया गया है और कैसे Chai से माइग्रेट करें अगर इसे वैश्विक रूप से ओवरराइड किया गया है।

### स्थानीय

मान लें कि Chai को स्पष्ट रूप से एक फ़ाइल में आयात किया गया था, उदाहरण के लिए:

```js
// myfile.js - original code
import { expect as expectChai } from 'chai'

describe('Homepage', () => {
    it('should assert', async () => {
        await browser.url('./')
        expectChai(await browser.getUrl()).to.include('/login')
    })
})
```

इस कोड को माइग्रेट करने के लिए Chai आयात को हटा दें और नए expect-webdriverio सत्यापन विधि `toHaveUrl` का उपयोग करें:

```js
// myfile.js - migrated code
describe('Homepage', () => {
    it('should assert', async () => {
        await browser.url('./')
        await expect(browser).toHaveUrl('/login') // new expect-webdriverio API method https://webdriver.io/docs/api/expect-webdriverio.html#tohaveurl
    });
});
```

यदि आप एक ही फ़ाइल में Chai और expect-webdriverio दोनों का उपयोग करना चाहते हैं, तो आप Chai आयात को रखेंगे और `expect` डिफ़ॉल्ट रूप से expect-webdriverio सत्यापन होगा, उदाहरण के लिए:

```js
// myfile.js
import { expect as expectChai } from 'chai'
import { expect as expectWDIO } from '@wdio/globals'

describe('Element', () => {
    it('should be displayed', async () => {
        const isDisplayed = await $("#element").isDisplayed()
        expectChai(isDisplayed).to.equal(true); // Chai assertion
    })
});

describe('Other element', () => {
    it('should not be displayed', async () => {
        await expectWDIO($("#element")).not.toBeDisplayed(); // expect-webdriverio assertion
    })
})
```

### वैश्विक

मान लें कि `expect` को वैश्विक रूप से Chai का उपयोग करने के लिए ओवरराइड किया गया था। expect-webdriverio सत्यापनों का उपयोग करने के लिए हमें "before" हुक में वैश्विक रूप से एक वैरिएबल सेट करने की आवश्यकता है, उदाहरण के लिए:

```js
// wdio.conf.js
before: async () => {
    await import('expect-webdriverio');
    global.wdioExpect = global.expect;
    const chai = await import('chai');
    global.expect = chai.expect;
}
```

अब Chai और expect-webdriverio को एक-दूसरे के साथ उपयोग किया जा सकता है। अपने कोड में आप Chai और expect-webdriverio सत्यापनों का उपयोग निम्नानुसार करेंगे, उदाहरण के लिए:

```js
// myfile.js
describe('Element', () => {
    it('should be displayed', async () => {
        const isDisplayed = await $("#element").isDisplayed()
        expect(isDisplayed).to.equal(true); // Chai assertion
    });
});

describe('Other element', () => {
    it('should not be displayed', async () => {
        await expectWdio($("#element")).not.toBeDisplayed(); // expect-webdriverio assertion
    });
});
```

माइग्रेट करने के लिए आप धीरे-धीरे प्रत्येक Chai सत्यापन को expect-webdriverio में ले जाएंगे। एक बार जब कोड बेस में सभी Chai सत्यापनों को बदल दिया गया है, तो "before" हुक को हटाया जा सकता है। `wdioExpect` के सभी उदाहरणों को `expect` से बदलने के लिए एक वैश्विक खोज और प्रतिस्थापन माइग्रेशन को समाप्त कर देगा।