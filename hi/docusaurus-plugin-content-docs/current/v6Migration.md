---
id: v6-migration
title: v5 से v6 तक
description: "डिपेंडेंसीज़ को अपडेट करके, कॉन्फ़िग फ़ाइल को रूपांतरित करके और स्पेक्स तथा पेज ऑब्जेक्ट्स को अपडेट करके WebdriverIO प्रोजेक्ट को v5 से v6 में अपग्रेड करें।"
---

यह ट्यूटोरियल उन लोगों के लिए है जो अभी भी WebdriverIO के `v5` का उपयोग कर रहे हैं और `v6` या WebdriverIO के नवीनतम संस्करण में माइग्रेट करना चाहते हैं। जैसा कि हमारे [रिलीज़ ब्लॉग पोस्ट](https://webdriver.io/blog/2020/03/26/webdriverio-v6-released) में बताया गया है, इस संस्करण अपग्रेड के बदलावों को संक्षेप में इस प्रकार बताया जा सकता है:

- हमने कुछ कमांड्स (जैसे `newWindow`, `react$`, `react$$`, `waitUntil`, `dragAndDrop`, `moveTo`, `waitForDisplayed`, `waitForEnabled`, `waitForExist`) के पैरामीटर्स को समेकित किया है और सभी वैकल्पिक पैरामीटर्स को एक ही ऑब्जेक्ट में स्थानांतरित कर दिया है, उदाहरण के लिए

    ```js
    // v5
    browser.newWindow(
        'https://webdriver.io',
        'WebdriverIO window',
        'width=420,height=230,resizable,scrollbars=yes,status=1'
    )
    // v6
    browser.newWindow('https://webdriver.io', {
        windowName: 'WebdriverIO window',
        windowFeature: 'width=420,height=230,resizable,scrollbars=yes,status=1'
    })
    ```

- सर्विसेज़ के लिए कॉन्फ़िगरेशन को सर्विस सूची में स्थानांतरित कर दिया गया है, उदाहरण के लिए

    ```js
    // v5
    exports.config = {
        services: ['sauce'],
        sauceConnect: true,
        sauceConnectOpts: { foo: 'bar' },
    }
    // v6
    exports.config = {
        services: [['sauce', {
            sauceConnect: true,
            sauceConnectOpts: { foo: 'bar' }
        }]],
    }
    ```

- सरलीकरण के उद्देश्य से कुछ सर्विस विकल्पों के नाम बदल दिए गए हैं
- हमने Chrome WebDriver सेशन्स के लिए कमांड `launchApp` का नाम बदलकर `launchChromeApp` कर दिया है

:::info

यदि आप WebdriverIO `v4` या उससे नीचे के संस्करण का उपयोग कर रहे हैं, तो कृपया पहले `v5` में अपग्रेड करें।

:::

हालाँकि हम इसके लिए पूरी तरह से स्वचालित प्रक्रिया चाहेंगे, लेकिन वास्तविकता कुछ और है। हर किसी का सेटअप अलग होता है। प्रत्येक चरण को चरण-दर-चरण निर्देश के बजाय मार्गदर्शन के रूप में देखा जाना चाहिए। यदि आपको माइग्रेशन में समस्याएँ आती हैं, तो [हमसे संपर्क करने](https://github.com/webdriverio/codemod/discussions/new) में संकोच न करें।

## सेटअप

अन्य माइग्रेशन की तरह हम WebdriverIO [codemod](https://github.com/webdriverio/codemod) का उपयोग कर सकते हैं। codemod इंस्टॉल करने के लिए, यह चलाएँ:

```sh
npm install jscodeshift @wdio/codemod
```

## WebdriverIO डिपेंडेंसीज़ अपग्रेड करें

चूँकि सभी WebdriverIO संस्करण एक-दूसरे से जुड़े हुए हैं, इसलिए हमेशा किसी विशिष्ट टैग, जैसे `6.12.0`, में अपग्रेड करना सबसे अच्छा है। यदि आप `v5` से सीधे `v7` में अपग्रेड करने का निर्णय लेते हैं, तो आप टैग को छोड़ सकते हैं और सभी पैकेजों के नवीनतम संस्करण इंस्टॉल कर सकते हैं। ऐसा करने के लिए हम अपने `package.json` से WebdriverIO से संबंधित सभी डिपेंडेंसीज़ को कॉपी करते हैं और उन्हें इसके माध्यम से फिर से इंस्टॉल करते हैं:

```sh
npm i --save-dev @wdio/allure-reporter@6 @wdio/cli@6 @wdio/cucumber-framework@6 @wdio/local-runner@6 @wdio/spec-reporter@6 @wdio/sync@6 wdio-chromedriver-service@6 webdriverio@6
```

आमतौर पर WebdriverIO डिपेंडेंसीज़ dev डिपेंडेंसीज़ का हिस्सा होती हैं, हालाँकि आपके प्रोजेक्ट के आधार पर यह भिन्न हो सकता है। इसके बाद आपकी `package.json` और `package-lock.json` अपडेट हो जानी चाहिए। __नोट:__ ये उदाहरण डिपेंडेंसीज़ हैं, आपकी डिपेंडेंसीज़ अलग हो सकती हैं। सुनिश्चित करें कि आप नवीनतम v6 संस्करण का पता लगाएँ, उदाहरण के लिए यह कमांड चलाकर:

```sh
npm show webdriverio versions
```

सभी कोर WebdriverIO पैकेजों के लिए उपलब्ध नवीनतम संस्करण 6 को इंस्टॉल करने का प्रयास करें। कम्युनिटी पैकेजों के लिए यह हर पैकेज में अलग हो सकता है। यहाँ हम सलाह देते हैं कि आप changelog देखें ताकि पता चल सके कि कौन-सा संस्करण अभी भी v6 के साथ संगत है।

## कॉन्फ़िग फ़ाइल को रूपांतरित करें

एक अच्छा पहला कदम कॉन्फ़िग फ़ाइल से शुरुआत करना है। सभी ब्रेकिंग बदलावों को codemod का उपयोग करके पूरी तरह से स्वचालित रूप से हल किया जा सकता है:

```sh
npx jscodeshift -t ./node_modules/@wdio/codemod/v6 ./wdio.conf.js
```

:::caution

codemod अभी TypeScript प्रोजेक्ट्स को सपोर्ट नहीं करता है। देखें [`@webdriverio/codemod#10`](https://github.com/webdriverio/codemod/issues/10)। हम जल्द ही इसके लिए सपोर्ट लागू करने पर काम कर रहे हैं। यदि आप TypeScript का उपयोग कर रहे हैं तो कृपया इसमें शामिल हों!

:::

## स्पेक फ़ाइलें और पेज ऑब्जेक्ट्स अपडेट करें

सभी कमांड बदलावों को अपडेट करने के लिए अपनी उन सभी e2e फ़ाइलों पर codemod चलाएँ जिनमें WebdriverIO कमांड्स हैं, उदाहरण के लिए:

```sh
npx jscodeshift -t ./node_modules/@wdio/codemod/v6 ./e2e/*
```

बस इतना ही! अब और कोई बदलाव आवश्यक नहीं है 🎉

## निष्कर्ष

हमें आशा है कि यह ट्यूटोरियल WebdriverIO `v6` में माइग्रेशन प्रक्रिया में आपका थोड़ा मार्गदर्शन करेगा। हम दृढ़ता से सलाह देते हैं कि आप नवीनतम संस्करण में अपग्रेड करना जारी रखें, क्योंकि लगभग कोई ब्रेकिंग बदलाव न होने के कारण `v7` में अपडेट करना बहुत आसान है। कृपया [v7 में अपग्रेड करने के लिए](v7-migration) माइग्रेशन गाइड देखें।

कम्युनिटी विभिन्न संगठनों की विभिन्न टीमों के साथ परीक्षण करते हुए codemod को लगातार बेहतर बना रही है। यदि आपके पास कोई फ़ीडबैक है तो [issue दर्ज करने](https://github.com/webdriverio/codemod/issues/new) में, या यदि माइग्रेशन प्रक्रिया के दौरान आपको कठिनाई होती है तो [चर्चा शुरू करने](https://github.com/webdriverio/codemod/discussions/new) में संकोच न करें।