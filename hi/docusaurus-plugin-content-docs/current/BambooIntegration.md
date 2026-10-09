---
id: bamboo
title: Bamboo
description: "Atlassian Bamboo में WebdriverIO टेस्ट चलाएँ और JUnit परिणाम प्रकाशित करें ताकि आप प्रत्येक बिल्ड में पास होने वाले, फेल होने वाले और ठीक किए गए टेस्ट को ट्रैक कर सकें।"
---

WebdriverIO [Bamboo](https://www.atlassian.com/software/bamboo) जैसे CI सिस्टम के साथ घनिष्ठ इंटीग्रेशन प्रदान करता है। [JUnit](https://webdriver.io/docs/junit-reporter.html) या [Allure](https://webdriver.io/docs/allure-reporter.html) रिपोर्टर के साथ, आप आसानी से अपने टेस्ट डीबग कर सकते हैं और साथ ही अपने टेस्ट परिणामों पर नज़र रख सकते हैं। इंटीग्रेशन काफ़ी आसान है।

1. JUnit टेस्ट रिपोर्टर इंस्टॉल करें: `$ npm install @wdio/junit-reporter --save-dev`)
1. अपने कॉन्फ़िग को अपडेट करें ताकि आपके JUnit परिणाम ऐसी जगह सेव हों जहाँ Bamboo उन्हें ढूँढ सके, (और `junit` रिपोर्टर निर्दिष्ट करें):

```js
// wdio.conf.js
module.exports = {
    // ...
    reporters: [
        'dot',
        ['junit', {
            outputDir: './testresults/'
        }]
    ],
    // ...
}
```
नोट: *टेस्ट परिणामों को रूट फ़ोल्डर के बजाय एक अलग फ़ोल्डर में रखना हमेशा एक अच्छा मानक है।*

```js
// wdio.conf.js - For tests running in parallel
module.exports = {
    // ...
    reporters: [
        'dot',
        ['junit', {
            outputDir: './testresults/',
            outputFileFormat: function (options) {
                return `results-${options.cid}.xml`;
            }
        }]
    ],
    // ...
}
```

रिपोर्ट सभी फ़्रेमवर्क के लिए एक जैसी होंगी और आप इनमें से किसी का भी उपयोग कर सकते हैं: Mocha, Jasmine या Cucumber।

अब तक, हम मानते हैं कि आपने टेस्ट लिख लिए हैं और परिणाम ```./testresults/``` फ़ोल्डर में जेनरेट हो रहे हैं, और आपका Bamboo चालू है और चल रहा है।

## अपने टेस्ट को Bamboo में इंटीग्रेट करें

1. अपना Bamboo प्रोजेक्ट खोलें
    > एक नया प्लान बनाएँ, अपनी रिपॉज़िटरी लिंक करें (सुनिश्चित करें कि यह हमेशा आपकी रिपॉज़िटरी के नवीनतम संस्करण की ओर इंगित करे) और अपने स्टेज बनाएँ

    ![Plan Details](/img/bamboo/plancreation.png "Plan Details")

    मैं डिफ़ॉल्ट स्टेज और जॉब के साथ आगे बढ़ूँगा। आपके मामले में, आप अपने स्वयं के स्टेज और जॉब बना सकते हैं

    ![Default Stage](/img/bamboo/defaultstage.png "Default Stage")
2. अपना टेस्टिंग जॉब खोलें और Bamboo में अपने टेस्ट चलाने के लिए टास्क बनाएँ
    >**टास्क 1:** सोर्स कोड चेकआउट

    >**टास्क 2:** अपने टेस्ट चलाएँ ```npm i && npm run test```। उपरोक्त कमांड चलाने के लिए आप *Script* टास्क और *Shell Interpreter* का उपयोग कर सकते हैं (यह टेस्ट परिणाम जेनरेट करेगा और उन्हें ```./testresults/``` फ़ोल्डर में सेव करेगा)

    ![Test Run](/img/bamboo/testrun.png "Test Run")

    >**टास्क: 3** अपने सेव किए गए टेस्ट परिणामों को पार्स करने के लिए *jUnit Parser* टास्क जोड़ें। कृपया यहाँ टेस्ट परिणाम डायरेक्टरी निर्दिष्ट करें (आप Ant स्टाइल पैटर्न का भी उपयोग कर सकते हैं)

    ![jUnit Parser](/img/bamboo/junitparser.png "jUnit Parser")

    नोट: *सुनिश्चित करें कि आप परिणाम पार्सर टास्क को *Final* सेक्शन में रख रहे हैं, ताकि यह हमेशा एक्ज़ीक्यूट हो, भले ही आपका टेस्ट टास्क फेल हो जाए*

    >**टास्क: 4** (वैकल्पिक) यह सुनिश्चित करने के लिए कि आपके टेस्ट परिणाम पुरानी फ़ाइलों के साथ गड़बड़ न हों, आप Bamboo में सफल पार्स के बाद ```./testresults/``` फ़ोल्डर को हटाने के लिए एक टास्क बना सकते हैं। परिणामों को हटाने के लिए आप ```rm -f ./testresults/*.xml``` या पूरे फ़ोल्डर को हटाने के लिए ```rm -r testresults``` जैसी शेल स्क्रिप्ट जोड़ सकते हैं

उपरोक्त *रॉकेट साइंस* पूरा हो जाने के बाद, कृपया प्लान को सक्षम करें और इसे चलाएँ। आपका अंतिम आउटपुट इस प्रकार होगा:

## सफल टेस्ट

![Successful Test](/img/bamboo/successfulltest.png "Successful Test")

## फेल टेस्ट

![Failed Test](/img/bamboo/failedtest.png "Failed Test")

## फेल और ठीक किया गया

![Failed and Fixed](/img/bamboo/failedandfixed.png "Failed and Fixed")

वाह!! बस इतना ही। आपने अपने WebdriverIO टेस्ट को Bamboo में सफलतापूर्वक इंटीग्रेट कर लिया है।