---
id: custommatchers
title: कस्टम मैचर्स
---

WebdriverIO जेस्ट शैली की [`expect`](https://webdriver.io/docs/api/expect-webdriverio) एसर्शन लाइब्रेरी का उपयोग करता है जिसमें वेब और मोबाइल टेस्ट चलाने के लिए विशेष सुविधाएं और कस्टम मैचर्स होते हैं। हालांकि मैचर्स की लाइब्रेरी बड़ी है, यह निश्चित रूप से सभी संभावित स्थितियों के लिए उपयुक्त नहीं है। इसलिए मौजूदा मैचर्स को आपके द्वारा परिभाषित कस्टम मैचर्स के साथ विस्तारित करना संभव है।

:::warning

हालांकि वर्तमान में मैचर्स को परिभाषित करने में कोई अंतर नहीं है जो [`browser`](/docs/api/browser) ऑब्जेक्ट या [element](/docs/api/element) इंस्टेंस के लिए विशिष्ट हैं, यह निश्चित रूप से भविष्य में बदल सकता है। इस विकास पर अधिक जानकारी के लिए [`webdriverio/expect-webdriverio#1408`](https://github.com/webdriverio/expect-webdriverio/issues/1408) पर नज़र रखें।

:::

## कस्टम ब्राउज़र मैचर्स

कस्टम ब्राउज़र मैचर को रजिस्टर करने के लिए, `expect` ऑब्जेक्ट पर `extend` को कॉल करें, या तो सीधे अपनी स्पेक फ़ाइल में या आपके `wdio.conf.js` में `before` हुक के हिस्से के रूप में:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e719632df8f241f923c8d9301aab6bccee5cb109/customMatchers/example.ts#L3-L18
```

जैसा कि उदाहरण में दिखाया गया है, मैचर फ़ंक्शन अपेक्षित ऑब्जेक्ट को, जैसे ब्राउज़र या एलिमेंट ऑब्जेक्ट, पहले पैरामीटर के रूप में और अपेक्षित वैल्यू को दूसरे पैरामीटर के रूप में लेता है। फिर आप मैचर का उपयोग इस प्रकार कर सकते हैं:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e719632df8f241f923c8d9301aab6bccee5cb109/customMatchers/example.ts#L50-L52
```

## कस्टम एलिमेंट मैचर्स

कस्टम ब्राउज़र मैचर्स के समान, एलिमेंट मैचर्स भिन्न नहीं होते हैं। यहां एक उदाहरण है कि किसी एलिमेंट के aria-label को एसर्ट करने के लिए कस्टम मैचर कैसे बनाया जाए:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e719632df8f241f923c8d9301aab6bccee5cb109/customMatchers/example.ts#L20-L38
```

यह आपको एसर्शन को इस प्रकार कॉल करने की अनुमति देता है:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e719632df8f241f923c8d9301aab6bccee5cb109/customMatchers/example.ts#L54-L57
```

## टाइपस्क्रिप्ट सपोर्ट

यदि आप टाइपस्क्रिप्ट का उपयोग कर रहे हैं, तो आपके कस्टम मैचर्स की टाइप सुरक्षा सुनिश्चित करने के लिए एक और चरण आवश्यक है। `Matcher` इंटरफेस को अपने कस्टम मैचर्स के साथ विस्तारित करके, सभी टाइप समस्याएं दूर हो जाती हैं:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e719632df8f241f923c8d9301aab6bccee5cb109/customMatchers/example.ts#L40-L47
```

यदि आपने एक कस्टम [असिमेट्रिक मैचर](https://jestjs.io/docs/expect#expectextendmatchers) बनाया है, तो आप इसी तरह `expect` टाइप्स को निम्नानुसार विस्तारित कर सकते हैं:

```ts
declare global {
  namespace ExpectWebdriverIO {
    interface AsymmetricMatchers {
      myCustomMatcher(value: string): ExpectWebdriverIO.PartialMatcher;
    }
  }
}
```