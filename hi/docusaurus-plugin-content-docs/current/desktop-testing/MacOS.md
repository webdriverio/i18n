---
id: macos
title: MacOS
description: "प्रोजेक्ट सेटअप विज़ार्ड से शुरुआत करते हुए, Appium और Mac2 ड्राइवर का उपयोग करके WebdriverIO के साथ नेटिव macOS एप्लिकेशन को ऑटोमेट करें।"
---

WebdriverIO [Appium](https://appium.io/) का उपयोग करके किसी भी MacOS एप्लिकेशन को ऑटोमेट कर सकता है। आपको बस अपने सिस्टम पर [XCode](https://developer.apple.com/xcode/) इंस्टॉल करना है, Appium और [Mac2 Driver](https://github.com/appium/appium-mac2-driver) को डिपेंडेंसी के रूप में इंस्टॉल करना है और सही capabilities सेट करनी हैं।

## शुरुआत करें

एक नया WebdriverIO प्रोजेक्ट शुरू करने के लिए, यह चलाएँ:

```sh
npm create wdio@latest ./
```

एक इंस्टॉलेशन विज़ार्ड आपको पूरी प्रक्रिया में मार्गदर्शन करेगा। जब यह पूछे कि आप किस प्रकार की टेस्टिंग करना चाहते हैं, तो _"Desktop Testing - of MacOS Applications"_ अवश्य चुनें। इसके बाद बस डिफ़ॉल्ट विकल्प रखें या अपनी पसंद के अनुसार उन्हें बदलें।

कॉन्फ़िगरेशन विज़ार्ड सभी आवश्यक Appium पैकेज इंस्टॉल करेगा और MacOS पर टेस्ट करने के लिए आवश्यक कॉन्फ़िगरेशन के साथ एक `wdio.conf.js` या `wdio.conf.ts` बनाएगा। यदि आपने कुछ टेस्ट फ़ाइलें ऑटो-जेनरेट करने की सहमति दी है, तो आप `npm run wdio` के माध्यम से अपना पहला टेस्ट चला सकते हैं।

<CreateMacOSProjectAnimation />

बस इतना ही 🎉

## उदाहरण

एक सरल टेस्ट कुछ इस तरह दिख सकता है, जो Calculator एप्लिकेशन खोलता है, एक गणना करता है और उसके परिणाम की पुष्टि करता है:

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

__नोट:__ सेशन की शुरुआत में calculator ऐप अपने आप खुल गया था क्योंकि `'appium:bundleId': 'com.apple.calculator'` को capability विकल्प के रूप में परिभाषित किया गया था। आप सेशन के दौरान किसी भी समय ऐप्स बदल सकते हैं।

## अधिक जानकारी

MacOS पर टेस्टिंग से संबंधित विशिष्ट जानकारी के लिए हम [Appium Mac2 Driver](https://github.com/appium/appium-mac2-driver) प्रोजेक्ट देखने की सलाह देते हैं।