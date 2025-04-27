---
id: async-migration
title: सिंक से एसिंक तक
---

V8 में हुए परिवर्तनों के कारण WebdriverIO टीम ने अप्रैल 2023 तक सिंक्रोनस कमांड एक्जीक्यूशन को [डेप्रिकेट करने की घोषणा](https://webdriver.io/blog/2021/07/28/sync-api-deprecation) की है। टीम ने इस ट्रांज़िशन को जितना संभव हो सके आसान बनाने के लिए कड़ी मेहनत की है। इस गाइड में हम बताते हैं कि आप अपने टेस्ट सूट को सिंक से एसिंक में धीरे-धीरे कैसे माइग्रेट कर सकते हैं। एक उदाहरण प्रोजेक्ट के रूप में हम [Cucumber Boilerplate](https://github.com/webdriverio/cucumber-boilerplate) का उपयोग करते हैं, लेकिन यह दृष्टिकोण अन्य सभी प्रोजेक्ट्स के लिए भी समान है।

## JavaScript में प्रॉमिसेज

WebdriverIO में सिंक्रोनस एक्जीक्यूशन लोकप्रिय होने का कारण यह है कि यह प्रॉमिसेज से निपटने की जटिलता को हटा देता है। विशेष रूप से अगर आप अन्य भाषाओं से आते हैं जहां यह अवधारणा इस तरह से मौजूद नहीं है, तो शुरुआत में यह भ्रमित करने वाला हो सकता है। हालांकि, प्रॉमिसेज एसिंक्रोनस कोड से निपटने के लिए एक बहुत ही शक्तिशाली टूल हैं और आज का JavaScript वास्तव में इससे निपटना आसान बनाता है। अगर आपने कभी प्रॉमिसेज के साथ काम नहीं किया है, तो हम [MDN रेफरेंस गाइड](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) देखने की सलाह देते हैं, क्योंकि यहां इसे समझाना अत्यधिक विस्तृत होगा।

## एसिंक ट्रांज़िशन

WebdriverIO टेस्टरनर एक ही टेस्ट सूट के भीतर एसिंक और सिंक एक्जीक्यूशन को संभाल सकता है। इसका मतलब है कि आप अपने टेस्ट और PageObjects को अपनी गति से धीरे-धीरे माइग्रेट कर सकते हैं। उदाहरण के लिए, Cucumber Boilerplate ने [स्टेप डेफिनिशन का एक बड़ा सेट](https://github.com/webdriverio/cucumber-boilerplate/tree/main/src/support/action) परिभाषित किया है जिसे आप अपने प्रोजेक्ट में कॉपी कर सकते हैं। हम एक समय में एक स्टेप डेफिनिशन या एक फ़ाइल को माइग्रेट कर सकते हैं।

:::tip

WebdriverIO एक [codemod](https://github.com/webdriverio/codemod) प्रदान करता है जो आपके सिंक कोड को लगभग पूरी तरह से स्वचालित रूप से एसिंक कोड में बदलने की अनुमति देता है। पहले डॉक्स में बताए अनुसार codemod चलाएं और जरूरत पड़ने पर मैनुअल माइग्रेशन के लिए इस गाइड का उपयोग करें।

:::

कई मामलों में, जो करना आवश्यक है वह है कि जिस फंक्शन में आप WebdriverIO कमांड्स कॉल करते हैं उसे `async` बनाएं और हर कमांड के सामने `await` जोड़ें। बॉयलरप्लेट प्रोजेक्ट में पहली फ़ाइल `clearInputField.ts` को ट्रांसफॉर्म करते हुए, हम इसे:

```ts
export default (selector: Selector) => {
    $(selector).clearValue();
};
```

से बदलकर यह करते हैं:

```ts
export default async (selector: Selector) => {
    await $(selector).clearValue();
};
```

बस इतना ही। आप सभी रिराइट उदाहरणों के साथ पूरा कमिट यहां देख सकते हैं:

#### कमिट्स:

- _सभी स्टेप परिभाषाओं को ट्रांसफॉर्म करना_ [[af6625f]](https://github.com/webdriverio/cucumber-boilerplate/pull/481/commits/af6625fcd01dc087479e84562f237ecf38b3537d)

:::info
यह ट्रांज़िशन इस बात से स्वतंत्र है कि आप TypeScript का उपयोग करते हैं या नहीं। अगर आप TypeScript का उपयोग करते हैं तो सुनिश्चित करें कि आप अंततः अपने `tsconfig.json` में `types` प्रॉपर्टी को `webdriverio/sync` से `@wdio/globals/types` में बदल दें। यह भी सुनिश्चित करें कि आपका कंपाइल टारगेट कम से कम `ES2018` पर सेट है।
:::

## विशेष मामले

निश्चित रूप से हमेशा विशेष मामले होते हैं जहां आपको थोड़ा और ध्यान देने की आवश्यकता होती है।

### ForEach लूप्स

अगर आपके पास `forEach` लूप है, जैसे elements पर इटरेट करने के लिए, तो आपको सुनिश्चित करना होगा कि इटरेटर कॉलबैक एसिंक तरीके से सही ढंग से हैंडल किया जाता है, उदाहरण के लिए:

```js
const elems = $$('div')
elems.forEach((elem) => {
    elem.click()
})
```

हम `forEach` में जो फंक्शन पास करते हैं वह एक इटरेटर फंक्शन है। सिंक्रोनस वर्ल्ड में यह आगे बढ़ने से पहले सभी elements पर क्लिक करेगा। अगर हम इसे एसिंक्रोनस कोड में ट्रांसफॉर्म करते हैं, तो हमें यह सुनिश्चित करना होगा कि हम हर इटरेटर फंक्शन के एक्जीक्यूशन के खत्म होने का इंतजार करते हैं। `async`/`await` जोड़ने से ये इटरेटर फंक्शन एक प्रॉमिस लौटाएंगे जिसे हमें रिज़ॉल्व करने की आवश्यकता है। अब, `forEach` तब elements पर इटरेट करने के लिए आदर्श नहीं है क्योंकि यह इटरेटर फंक्शन का रिजल्ट नहीं लौटाता है, वह प्रॉमिस जिसका हमें इंतजार करने की आवश्यकता है। इसलिए हमें `forEach` को `map` से बदलने की आवश्यकता है जो उस प्रॉमिस को लौटाता है। `map` के साथ-साथ Arrays के अन्य सभी इटरेटर मेथड्स जैसे `find`, `every`, `reduce` और अन्य ऐसे तरीके से लागू किए गए हैं कि वे इटरेटर फंक्शन के भीतर प्रॉमिसेज का सम्मान करते हैं और इसलिए एसिंक कॉन्टेक्स्ट में उनका उपयोग करना सरल है। उपरोक्त उदाहरण ट्रांसफॉर्म होकर ऐसा दिखता है:

```js
const elems = await $$('div')
await elems.forEach((elem) => {
    return elem.click()
})
```

उदाहरण के लिए, सभी `<h3 />` elements को फेच करने और उनकी टेक्स्ट सामग्री प्राप्त करने के लिए, आप चला सकते हैं:

```js
await browser.url('https://webdriver.io')

const h3Texts = await browser.$$('h3').map((img) => img.getText())
console.log(h3Texts);
/**
 * returns:
 * [
 *   'Extendable',
 *   'Compatible',
 *   'Feature Rich',
 *   'Who is using WebdriverIO?',
 *   'Support for Modern Web and Mobile Frameworks',
 *   'Google Lighthouse Integration',
 *   'Watch Talks about WebdriverIO',
 *   'Get Started With WebdriverIO within Minutes'
 * ]
 */
```

अगर यह बहुत जटिल लगता है तो आप साधारण for लूप्स का उपयोग करने पर विचार कर सकते हैं, उदाहरण के लिए:

```js
const elems = await $$('div')
for (const elem of elems) {
    await elem.click()
}
```

### WebdriverIO असर्शन्स

अगर आप WebdriverIO असर्शन हेल्पर [`expect-webdriverio`](https://webdriver.io/docs/api/expect-webdriverio) का उपयोग करते हैं, तो सुनिश्चित करें कि हर `expect` कॉल के सामने एक `await` सेट करें, उदाहरण के लिए:

```ts
expect($('input')).toHaveAttributeContaining('class', 'form')
```

को ट्रांसफॉर्म करके ऐसा बनाना होगा:

```ts
await expect($('input')).toHaveAttributeContaining('class', 'form')
```

### सिंक PageObject मेथड्स और एसिंक टेस्ट्स

अगर आपने अपने टेस्ट सूट में PageObjects को सिंक्रोनस तरीके से लिखा है, तो आप उन्हें एसिंक्रोनस टेस्ट में अब और उपयोग नहीं कर पाएंगे। अगर आपको एक PageObject मेथड को दोनों सिंक और एसिंक टेस्ट में उपयोग करने की आवश्यकता है, तो हम मेथड को डुप्लिकेट करने और उन्हें दोनों वातावरणों के लिए प्रदान करने की सलाह देते हैं, उदाहरण के लिए:

```js
class MyPageObject extends Page {
    /**
     * define elements
     */
    get btnStart () { return $('button=Start') }
    get loadedPage () { return $('#finish') }

    someMethod () {
        // sync code
    }

    someMethodAsync () {
        // async version of MyPageObject.someMethod()
    }
}
```

एक बार जब आप माइग्रेशन पूरा कर लेते हैं, तो आप सिंक्रोनस PageObject मेथड्स को हटा सकते हैं और नामकरण को क्लीन अप कर सकते हैं।

अगर आप PageObject मेथड के दो अलग-अलग संस्करणों को मेंटेन नहीं करना चाहते हैं, तो आप पूरे PageObject को एसिंक में माइग्रेट कर सकते हैं और सिंक्रोनस वातावरण में मेथड को एक्जीक्यूट करने के लिए [`browser.call`](https://webdriver.io/docs/api/browser/call) का उपयोग कर सकते हैं, उदाहरण के लिए:

```js
// before:
// MyPageObject.someMethod()
// after:
browser.call(() => MyPageObject.someMethod())
```

`call` कमांड यह सुनिश्चित करेगा कि एसिंक्रोनस `someMethod` को अगले कमांड पर जाने से पहले रिज़ॉल्व किया जाता है।

## निष्कर्ष

जैसा कि आप [परिणामी रिराइट PR](https://github.com/webdriverio/cucumber-boilerplate/pull/481/files) में देख सकते हैं, इस रिराइट की जटिलता काफी आसान है। याद रखें कि आप एक समय में एक स्टेप-डेफिनिशन को रिराइट कर सकते हैं। WebdriverIO एक सिंगल फ्रेमवर्क में सिंक और एसिंक एक्जीक्यूशन को पूरी तरह से हैंडल करने में सक्षम है।