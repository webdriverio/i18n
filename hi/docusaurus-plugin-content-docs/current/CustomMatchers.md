---
id: custommatchers
title: कस्टम मैचर्स
description: "expect.extend के साथ कस्टम ब्राउज़र और एलिमेंट मैचर्स रजिस्टर करें और उनके लिए TypeScript टाइप्स जोड़ें।"
---

WebdriverIO एक Jest स्टाइल [`expect`](https://webdriver.io/docs/api/expect-webdriverio) असर्शन लाइब्रेरी का उपयोग करता है जो वेब और मोबाइल टेस्ट चलाने के लिए विशेष सुविधाओं और कस्टम मैचर्स के साथ आती है। हालांकि मैचर्स की लाइब्रेरी बड़ी है, फिर भी यह निश्चित रूप से सभी संभावित स्थितियों में फिट नहीं बैठती। इसलिए मौजूदा मैचर्स को आपके द्वारा परिभाषित कस्टम मैचर्स के साथ विस्तारित करना संभव है।

:::warning

हालांकि वर्तमान में [`browser`](/docs/api/browser) ऑब्जेक्ट या किसी [element](/docs/api/element) इंस्टेंस के लिए विशिष्ट मैचर्स को परिभाषित करने के तरीके में कोई अंतर नहीं है, लेकिन भविष्य में यह निश्चित रूप से बदल सकता है। इस विकास के बारे में अधिक जानकारी के लिए [`webdriverio/expect-webdriverio#1408`](https://github.com/webdriverio/expect-webdriverio/issues/1408) पर नज़र रखें।

:::

:::info Jasmine

Jasmine फ्रेमवर्क के साथ, टेस्ट चलने से पहले किसी स्पेक फ़ाइल में या `before` हुक में `expect.extend` को कॉल करें। मैचर्स Jasmine async मैचर्स बन जाते हैं, इसलिए उन्हें `await` करें। Jasmine sync मैचर के नाम वाला मैचर केवल WebdriverIO वैल्यूज़ के लिए चलता है, WebdriverIO मैचर्स की तरह। कस्टम असिमेट्रिक मैचर्स (`expect.myMatcher()`) उपलब्ध नहीं हैं। आप sync मैचर के लिए `jasmine.addMatchers` या async मैचर के लिए `jasmine.addAsyncMatchers` का भी उपयोग कर सकते हैं, [Jasmine कस्टम मैचर्स ट्यूटोरियल](https://jasmine.github.io/tutorials/custom_matchers) देखें।

:::

## कस्टम ब्राउज़र मैचर्स

कस्टम ब्राउज़र मैचर रजिस्टर करने के लिए, `expect` ऑब्जेक्ट पर `extend` को कॉल करें, या तो सीधे अपनी स्पेक फ़ाइल में या उदाहरण के लिए अपनी `wdio.conf.js` में `before` हुक के हिस्से के रूप में:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e719632df8f241f923c8d9301aab6bccee5cb109/customMatchers/example.ts#L3-L18
```

जैसा कि उदाहरण में दिखाया गया है, मैचर फ़ंक्शन पहले पैरामीटर के रूप में अपेक्षित ऑब्जेक्ट, जैसे browser या element ऑब्जेक्ट, और दूसरे पैरामीटर के रूप में अपेक्षित वैल्यू लेता है। फिर आप मैचर का उपयोग इस प्रकार कर सकते हैं:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e719632df8f241f923c8d9301aab6bccee5cb109/customMatchers/example.ts#L50-L52
```

## कस्टम एलिमेंट मैचर्स

कस्टम ब्राउज़र मैचर्स की तरह, एलिमेंट मैचर्स में कोई अंतर नहीं है। यहाँ एक उदाहरण है कि किसी एलिमेंट के aria-label को असर्ट करने के लिए कस्टम मैचर कैसे बनाया जाए:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e719632df8f241f923c8d9301aab6bccee5cb109/customMatchers/example.ts#L20-L38
```

यह आपको असर्शन को इस प्रकार कॉल करने की अनुमति देता है:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e719632df8f241f923c8d9301aab6bccee5cb109/customMatchers/example.ts#L54-L57
```

## TypeScript सपोर्ट

यदि आप TypeScript का उपयोग कर रहे हैं, तो अपने कस्टम मैचर्स की टाइप सेफ्टी सुनिश्चित करने के लिए एक और कदम आवश्यक है। अपने कस्टम मैचर्स के साथ `Matcher` इंटरफ़ेस को विस्तारित करके, सभी टाइप समस्याएँ गायब हो जाती हैं:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e719632df8f241f923c8d9301aab6bccee5cb109/customMatchers/example.ts#L40-L47
```

यदि आपने कोई कस्टम [असिमेट्रिक मैचर](https://jestjs.io/docs/expect#expectextendmatchers) बनाया है, तो आप इसी तरह `expect` टाइप्स को इस प्रकार विस्तारित कर सकते हैं:

```ts
declare global {
  namespace ExpectWebdriverIO {
    interface AsymmetricMatchers {
      myCustomMatcher(value: string): ExpectWebdriverIO.PartialMatcher;
    }
  }
}
```