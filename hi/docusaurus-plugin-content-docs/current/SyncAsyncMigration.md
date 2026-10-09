---
id: async-migration
title: सिंक से एसिंक तक
description: "WebdriverIO टेस्ट को सिंक्रोनस से एसिंक्रोनस कमांड एक्ज़ीक्यूशन में चरण-दर-चरण माइग्रेट करें, जिसमें forEach लूप, असर्शन और सिंक पेज ऑब्जेक्ट शामिल हैं।"
---

V8 में बदलावों के कारण WebdriverIO टीम ने अप्रैल 2023 तक सिंक्रोनस कमांड एक्ज़ीक्यूशन को डेप्रिकेट करने की [घोषणा](https://webdriver.io/blog/2021/07/28/sync-api-deprecation) की थी। टीम इस बदलाव को यथासंभव आसान बनाने के लिए कड़ी मेहनत कर रही है। इस गाइड में हम बताते हैं कि आप अपने टेस्ट सूट को धीरे-धीरे सिंक से एसिंक में कैसे माइग्रेट कर सकते हैं। उदाहरण प्रोजेक्ट के रूप में हम [Cucumber Boilerplate](https://github.com/webdriverio/cucumber-boilerplate) का उपयोग करते हैं, लेकिन यही तरीका अन्य सभी प्रोजेक्ट्स पर भी लागू होता है।

## JavaScript में Promises

WebdriverIO में सिंक्रोनस एक्ज़ीक्यूशन के लोकप्रिय होने का कारण यह है कि यह promises से निपटने की जटिलता को दूर करता है। खासकर यदि आप ऐसी अन्य भाषाओं से आते हैं जहाँ यह अवधारणा इस रूप में मौजूद नहीं है, तो शुरुआत में यह भ्रमित करने वाला हो सकता है। हालाँकि, Promises एसिंक्रोनस कोड से निपटने के लिए एक बहुत ही शक्तिशाली टूल हैं और आज का JavaScript वास्तव में इनसे निपटना आसान बनाता है। यदि आपने कभी Promises के साथ काम नहीं किया है, तो हम इसके लिए [MDN रेफरेंस गाइड](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) देखने की सलाह देते हैं, क्योंकि यहाँ इसे समझाना इस गाइड के दायरे से बाहर होगा।

## एसिंक ट्रांज़िशन

WebdriverIO टेस्टरनर एक ही टेस्ट सूट के भीतर एसिंक और सिंक दोनों एक्ज़ीक्यूशन को संभाल सकता है। इसका मतलब है कि आप अपनी गति से अपने टेस्ट और PageObjects को चरण-दर-चरण धीरे-धीरे माइग्रेट कर सकते हैं। उदाहरण के लिए, Cucumber Boilerplate ने आपके प्रोजेक्ट में कॉपी करने के लिए [स्टेप डेफ़िनिशन का एक बड़ा सेट](https://github.com/webdriverio/cucumber-boilerplate/tree/main/src/support/action) परिभाषित किया है। हम एक बार में एक स्टेप डेफ़िनिशन या एक फ़ाइल माइग्रेट कर सकते हैं।

:::tip

WebdriverIO एक [codemod](https://github.com/webdriverio/codemod) प्रदान करता है जो आपके सिंक कोड को लगभग पूरी तरह से स्वचालित रूप से एसिंक कोड में बदलने की सुविधा देता है। पहले डॉक्स में बताए अनुसार codemod चलाएँ और आवश्यकता होने पर मैन्युअल माइग्रेशन के लिए इस गाइड का उपयोग करें।

:::

कई मामलों में, बस इतना करना आवश्यक है कि जिस फ़ंक्शन में आप WebdriverIO कमांड कॉल करते हैं उसे `async` बनाएँ और हर कमांड के आगे `await` जोड़ें। बॉयलरप्लेट प्रोजेक्ट में बदलने वाली पहली फ़ाइल `clearInputField.ts` को देखें, तो हम इसे इससे:

```ts
export default (selector: Selector) => {
    $(selector).clearValue();
};
```

इसमें बदलते हैं:

```ts
export default async (selector: Selector) => {
    await $(selector).clearValue();
};
```

बस इतना ही। आप सभी रीराइट उदाहरणों के साथ पूरा कमिट यहाँ देख सकते हैं:

#### कमिट्स:

- _सभी स्टेप डेफ़िनिशन को ट्रांसफ़ॉर्म करें_ [[af6625f]](https://github.com/webdriverio/cucumber-boilerplate/pull/481/commits/af6625fcd01dc087479e84562f237ecf38b3537d)

:::info
यह ट्रांज़िशन इस बात से स्वतंत्र है कि आप TypeScript का उपयोग करते हैं या नहीं। यदि आप TypeScript का उपयोग करते हैं, तो बस यह सुनिश्चित करें कि आप अंततः अपनी `tsconfig.json` में `types` प्रॉपर्टी को `webdriverio/sync` से `@wdio/globals/types` में बदल दें। साथ ही यह भी सुनिश्चित करें कि आपका कंपाइल टारगेट कम से कम `ES2018` पर सेट हो।
:::

## विशेष मामले

बेशक हमेशा कुछ विशेष मामले होते हैं जहाँ आपको थोड़ा अधिक ध्यान देने की आवश्यकता होती है।

### ForEach लूप्स

यदि आपके पास `forEach` लूप है, उदाहरण के लिए एलिमेंट्स पर इटरेट करने के लिए, तो आपको यह सुनिश्चित करना होगा कि इटरेटर कॉलबैक को एसिंक तरीके से ठीक से हैंडल किया जाए, उदाहरण के लिए:

```js
const elems = $$('div')
elems.forEach((elem) => {
    elem.click()
})
```

जो फ़ंक्शन हम `forEach` में पास करते हैं वह एक इटरेटर फ़ंक्शन है। सिंक्रोनस दुनिया में यह आगे बढ़ने से पहले सभी एलिमेंट्स पर क्लिक करेगा। यदि हम इसे एसिंक्रोनस कोड में बदलते हैं, तो हमें यह सुनिश्चित करना होगा कि हम हर इटरेटर फ़ंक्शन के एक्ज़ीक्यूशन के पूरा होने की प्रतीक्षा करें। `async`/`await` जोड़ने से ये इटरेटर फ़ंक्शन एक promise लौटाएँगे जिसे हमें resolve करना होगा। अब, `forEach` एलिमेंट्स पर इटरेट करने के लिए आदर्श नहीं रह जाता क्योंकि यह इटरेटर फ़ंक्शन का परिणाम, यानी वह promise जिसकी हमें प्रतीक्षा करनी है, वापस नहीं करता। इसलिए हमें `forEach` को `map` से बदलना होगा जो वह promise लौटाता है। `map` के साथ-साथ Arrays के अन्य सभी इटरेटर मेथड जैसे `find`, `every`, `reduce` आदि को इस तरह से लागू किया गया है कि वे इटरेटर फ़ंक्शन के भीतर promises का सम्मान करते हैं और इसलिए एसिंक संदर्भ में उनका उपयोग सरल हो जाता है। ऊपर दिया गया उदाहरण बदलने के बाद इस तरह दिखता है:

```js
const elems = await $$('div')
await elems.forEach((elem) => {
    return elem.click()
})
```

उदाहरण के लिए, सभी `<h3 />` एलिमेंट्स को प्राप्त करने और उनका टेक्स्ट कंटेंट पाने के लिए, आप यह चला सकते हैं:

```js
await browser.url('https://webdriver.io')

const h3Texts = await browser.$$('h3').map((img) => img.getText())
console.log(h3Texts);
/**
 * लौटाता है:
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

यदि यह बहुत जटिल लगता है, तो आप साधारण for लूप्स का उपयोग करने पर विचार कर सकते हैं, उदाहरण के लिए:

```js
const elems = await $$('div')
for (const elem of elems) {
    await elem.click()
}
```

`$$` एक [`ElementArray`](/docs/api/browser/$$) लौटाता है। आप सूची को await करने से पहले भी उस पर इटरेट कर सकते हैं:

```js
for await (const elem of $$('div')) {
    await elem.click()
}
```

`for (const elem of $$('div'))` तब तक एरर देता है जब तक सूची resolve नहीं हो जाती, क्योंकि एक सिंक्रोनस लूप क्वेरी की प्रतीक्षा नहीं कर सकता। ऊपर दिए गए उदाहरण की तरह पहले सूची को await करें, या `for await` का उपयोग करें।

### WebdriverIO असर्शन

यदि आप WebdriverIO असर्शन हेल्पर [`expect-webdriverio`](https://webdriver.io/docs/api/expect-webdriverio) का उपयोग करते हैं, तो हर `expect` कॉल के आगे `await` लगाना सुनिश्चित करें, उदाहरण के लिए:

```ts
expect($('input')).toHaveAttribute('class', expect.stringContaining('form'))
```

को इसमें बदलना होगा:

```ts
await expect($('input')).toHaveAttribute('class', expect.stringContaining('form'))
```

### सिंक PageObject मेथड और एसिंक टेस्ट

यदि आप अपने टेस्ट सूट में PageObjects को सिंक्रोनस तरीके से लिखते आए हैं, तो आप अब उन्हें एसिंक्रोनस टेस्ट में उपयोग नहीं कर पाएँगे। यदि आपको किसी PageObject मेथड को सिंक और एसिंक दोनों टेस्ट में उपयोग करने की आवश्यकता है, तो हम मेथड को डुप्लिकेट करने और दोनों एनवायरनमेंट के लिए उन्हें उपलब्ध कराने की सलाह देते हैं, उदाहरण के लिए:

```js
class MyPageObject extends Page {
    /**
     * एलिमेंट्स परिभाषित करें
     */
    get btnStart () { return $('button=Start') }
    get loadedPage () { return $('#finish') }

    someMethod () {
        // सिंक कोड
    }

    someMethodAsync () {
        // MyPageObject.someMethod() का एसिंक संस्करण
    }
}
```

माइग्रेशन पूरा करने के बाद आप सिंक्रोनस PageObject मेथड हटा सकते हैं और नामकरण को साफ़ कर सकते हैं।

यदि आप किसी PageObject मेथड के दो अलग-अलग संस्करण मेंटेन नहीं करना चाहते, तो आप पूरे PageObject को एसिंक में माइग्रेट भी कर सकते हैं और सिंक्रोनस एनवायरनमेंट में मेथड को एक्ज़ीक्यूट करने के लिए [`browser.call`](https://webdriver.io/docs/api/browser/call) का उपयोग कर सकते हैं, उदाहरण के लिए:

```js
// पहले:
// MyPageObject.someMethod()
// बाद में:
browser.call(() => MyPageObject.someMethod())
```

`call` कमांड यह सुनिश्चित करेगी कि अगली कमांड पर जाने से पहले एसिंक्रोनस `someMethod` resolve हो जाए।

## निष्कर्ष

जैसा कि आप [परिणामी रीराइट PR](https://github.com/webdriverio/cucumber-boilerplate/pull/481/files) में देख सकते हैं, इस रीराइट की जटिलता काफ़ी आसान है। याद रखें कि आप एक बार में एक स्टेप-डेफ़िनिशन को रीराइट कर सकते हैं। WebdriverIO एक ही फ्रेमवर्क में सिंक और एसिंक एक्ज़ीक्यूशन को संभालने में पूरी तरह सक्षम है।