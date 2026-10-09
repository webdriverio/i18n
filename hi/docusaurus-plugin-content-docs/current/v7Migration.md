---
id: v7-migration
title: v6 से v7 तक
description: "निर्भरताओं (dependencies) को अपडेट करके, कॉन्फ़िग फ़ाइल को रूपांतरित करके और Cucumber स्टेप डेफ़िनिशन को अपडेट करके WebdriverIO प्रोजेक्ट को v6 से v7 में अपग्रेड करें।"
---

यह ट्यूटोरियल उन लोगों के लिए है जो अभी भी WebdriverIO का `v6` उपयोग कर रहे हैं और `v7` में माइग्रेट करना चाहते हैं। जैसा कि हमारे [रिलीज़ ब्लॉग पोस्ट](https://webdriver.io/blog/2021/02/09/webdriverio-v7-released) में बताया गया है, ज़्यादातर बदलाव अंदरूनी (under the hood) हैं और अपग्रेड करना एक सीधी प्रक्रिया होनी चाहिए।

:::info

यदि आप WebdriverIO `v5` या उससे पुराना संस्करण उपयोग कर रहे हैं, तो कृपया पहले `v6` में अपग्रेड करें। कृपया हमारी [v6 माइग्रेशन गाइड](v6-migration) देखें।

:::

हालाँकि हम चाहेंगे कि इसके लिए एक पूरी तरह से स्वचालित प्रक्रिया हो, लेकिन वास्तविकता अलग है। हर किसी का सेटअप अलग होता है। हर चरण को चरण-दर-चरण निर्देश के बजाय मार्गदर्शन के रूप में देखा जाना चाहिए। यदि आपको माइग्रेशन में कोई समस्या आती है, तो [हमसे संपर्क करने](https://github.com/webdriverio/codemod/discussions/new) में संकोच न करें।

## सेटअप

अन्य माइग्रेशन की तरह हम WebdriverIO [codemod](https://github.com/webdriverio/codemod) का उपयोग कर सकते हैं। इस ट्यूटोरियल के लिए हम एक कम्युनिटी सदस्य द्वारा सबमिट किए गए [boilerplate प्रोजेक्ट](https://github.com/WarleyGabriel/demo-webdriverio-cucumber) का उपयोग करते हैं और इसे पूरी तरह से `v6` से `v7` में माइग्रेट करते हैं।

codemod इंस्टॉल करने के लिए, चलाएँ:

```sh
npm install jscodeshift @wdio/codemod
```

#### कमिट्स:

- _install codemod deps_ [[6ec9e52]](https://github.com/WarleyGabriel/demo-webdriverio-cucumber/pull/11/commits/6ec9e52038f7e8cb1221753b67040b0f23a8f61a)

## WebdriverIO निर्भरताओं को अपग्रेड करें

चूँकि सभी WebdriverIO संस्करण एक-दूसरे से जुड़े हुए हैं, इसलिए हमेशा किसी विशिष्ट टैग, जैसे `latest`, पर अपग्रेड करना सबसे अच्छा है। ऐसा करने के लिए हम अपनी `package.json` से WebdriverIO से संबंधित सभी निर्भरताओं को कॉपी करते हैं और उन्हें इसके माध्यम से फिर से इंस्टॉल करते हैं:

```sh
npm i --save-dev @wdio/allure-reporter@7 @wdio/cli@7 @wdio/cucumber-framework@7 @wdio/local-runner@7 @wdio/spec-reporter@7 @wdio/sync@7 wdio-chromedriver-service@7 wdio-timeline-reporter@7 webdriverio@7
```

आमतौर पर WebdriverIO निर्भरताएँ dev dependencies का हिस्सा होती हैं, हालाँकि यह आपके प्रोजेक्ट के अनुसार भिन्न हो सकता है। इसके बाद आपकी `package.json` और `package-lock.json` अपडेट हो जानी चाहिए। __नोट:__ ये [उदाहरण प्रोजेक्ट](https://github.com/WarleyGabriel/demo-webdriverio-cucumber) द्वारा उपयोग की गई निर्भरताएँ हैं, आपकी निर्भरताएँ भिन्न हो सकती हैं।

#### कमिट्स:

- _updated dependencies_ [[7097ab6]](https://github.com/WarleyGabriel/demo-webdriverio-cucumber/pull/11/commits/7097ab6297ef9f37ead0a9c2ce9fce8d0765458d)

## कॉन्फ़िग फ़ाइल को रूपांतरित करें

एक अच्छा पहला कदम कॉन्फ़िग फ़ाइल से शुरुआत करना है। WebdriverIO `v7` में हमें अब किसी भी कंपाइलर को मैन्युअल रूप से रजिस्टर करने की आवश्यकता नहीं है। वास्तव में, उन्हें हटाना आवश्यक है। यह codemod के साथ पूरी तरह से स्वचालित रूप से किया जा सकता है:

```sh
npx jscodeshift -t ./node_modules/@wdio/codemod/v7 ./wdio.conf.js
```

:::caution

codemod अभी TypeScript प्रोजेक्ट्स को सपोर्ट नहीं करता है। देखें [`@webdriverio/codemod#10`](https://github.com/webdriverio/codemod/issues/10)। हम जल्द ही इसके लिए सपोर्ट लागू करने पर काम कर रहे हैं। यदि आप TypeScript का उपयोग कर रहे हैं, तो कृपया इसमें शामिल हों!

:::

#### कमिट्स:

- _transpile config file_ [[6015534]](https://github.com/WarleyGabriel/demo-webdriverio-cucumber/pull/11/commits/60155346a386380d8a77ae6d1107483043a43994)

## स्टेप डेफ़िनिशन अपडेट करें

यदि आप Jasmine या Mocha का उपयोग कर रहे हैं, तो आपका काम यहीं पूरा हो गया है। अंतिम चरण Cucumber.js इम्पोर्ट्स को `cucumber` से `@cucumber/cucumber` में अपडेट करना है। यह भी codemod के माध्यम से स्वचालित रूप से किया जा सकता है:

```sh
npx jscodeshift -t ./node_modules/@wdio/codemod/v7 ./src/e2e/*
```

बस इतना ही! अब और किसी बदलाव की आवश्यकता नहीं है 🎉

#### कमिट्स:

- _transpile step definitions_ [[8c97b90]](https://github.com/WarleyGabriel/demo-webdriverio-cucumber/pull/11/commits/8c97b90a8b9197c62dffe4e2954f7dad814753cc)

## निष्कर्ष

हमें आशा है कि यह ट्यूटोरियल WebdriverIO `v7` में माइग्रेशन प्रक्रिया में आपका थोड़ा मार्गदर्शन करेगा। कम्युनिटी विभिन्न संगठनों की विभिन्न टीमों के साथ codemod का परीक्षण करते हुए इसे लगातार बेहतर बना रही है। यदि आपके पास कोई फ़ीडबैक है तो [इश्यू दर्ज करने](https://github.com/webdriverio/codemod/issues/new) में, या यदि माइग्रेशन प्रक्रिया के दौरान आपको कठिनाई होती है तो [चर्चा शुरू करने](https://github.com/webdriverio/codemod/discussions/new) में संकोच न करें।