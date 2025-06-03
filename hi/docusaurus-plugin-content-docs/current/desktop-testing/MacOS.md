---
id: macos
title: मैकओएस
---

WebdriverIO [Appium](https://appium.io/) का उपयोग करके किसी भी मनमानी मैकओएस एप्लिकेशन को स्वचालित कर सकता है। आपको केवल अपने सिस्टम पर [XCode](https://developer.apple.com/xcode/) इंस्टॉल करने की आवश्यकता है, Appium और [Mac2 Driver](https://github.com/appium/appium-mac2-driver) को निर्भरता के रूप में इंस्टॉल करना और सही कैपेबिलिटीज़ सेट करना है।

## शुरुआत करना

एक नया WebdriverIO प्रोजेक्ट शुरू करने के लिए, चलाएँ:

```sh
npm create wdio@latest ./
```

एक इंस्टॉलेशन विज़ार्ड आपको प्रक्रिया के माध्यम से मार्गदर्शन करेगा। सुनिश्चित करें कि आप _"Desktop Testing - of MacOS Applications"_ का चयन करें जब यह पूछता है कि आप किस प्रकार का परीक्षण करना चाहते हैं। इसके बाद बस डिफ़ॉल्ट रखें या अपनी प्राथमिकता के अनुसार संशोधित करें।

कॉन्फ़िगरेशन विज़ार्ड सभी आवश्यक Appium पैकेज इंस्टॉल करेगा और मैकओएस पर परीक्षण करने के लिए आवश्यक कॉन्फ़िगरेशन के साथ एक `wdio.conf.js` या `wdio.conf.ts` बनाएगा। यदि आप कुछ परीक्षण फ़ाइलों को स्वचालित रूप से जनरेट करने के लिए सहमत हुए हैं, तो आप अपना पहला परीक्षण `npm run wdio` के माध्यम से चला सकते हैं।

<CreateMacOSProjectAnimation />

बस इतना ही 🎉

## उदाहरण

यह एक सरल परीक्षण का उदाहरण है जो कैलकुलेटर एप्लिकेशन खोलता है, एक गणना करता है और उसके परिणाम को सत्यापित करता है:

```js
describe('My Login application', () => {
    it('should set a text to a text view', async function () {
        await $('//XCUIElementTypeButton[@label="seven"]').click()
        await $('//XCUIElementTypeButton[@label="multiply"]').click()
        await $('//XCUIElementTypeButton[@label="six"]').click()
        await $('//XCUIElementTypeButton[@title="="]').click()
        await expect($('//XCUIElementTypeStaticText[@label="main display"]')).toHaveText('42')
    });
})
```

__नोट:__ कैलकुलेटर ऐप सेशन की शुरुआत में स्वचालित रूप से खोला गया था क्योंकि `'appium:bundleId': 'com.apple.calculator'` को कैपेबिलिटी विकल्प के रूप में परिभाषित किया गया था। आप सेशन के दौरान किसी भी समय ऐप्स स्विच कर सकते हैं।

## अधिक जानकारी

मैकओएस पर परीक्षण के बारे में विशिष्ट जानकारी के लिए हम [Appium Mac2 Driver](https://github.com/appium/appium-mac2-driver) प्रोजेक्ट को देखने की सलाह देते हैं।