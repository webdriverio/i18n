---
id: bamboo
title: बांबू
---

WebdriverIO [Bamboo](https://www.atlassian.com/software/bamboo) जैसे CI सिस्टम के साथ एकीकरण प्रदान करता है। [JUnit](https://webdriver.io/docs/junit-reporter.html) या [Allure](https://webdriver.io/docs/allure-reporter.html) रिपोर्टर के साथ, आप आसानी से अपने टेस्ट को डीबग कर सकते हैं और अपने टेस्ट परिणामों को ट्रैक कर सकते हैं। एकीकरण काफी आसान है।

1. JUnit टेस्ट रिपोर्टर इंस्टॉल करें: `$ npm install @wdio/junit-reporter --save-dev`)
1. अपने कॉन्फिग को अपडेट करें ताकि आपके JUnit परिणाम वहां सेव हो जहां Bamboo उन्हें ढूंढ सके (और `junit` रिपोर्टर निर्दिष्ट करें):

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
नोट: *टेस्ट परिणामों को रूट फोल्डर के बजाय अलग फोल्डर में रखना हमेशा एक अच्छा मानक है।*

```js
// wdio.conf.js - समानांतर में चलने वाले टेस्ट के लिए
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

सभी फ्रेमवर्क के लिए रिपोर्ट समान होंगी और आप किसी भी एक का उपयोग कर सकते हैं: Mocha, Jasmine या Cucumber।

इस समय तक, हमें विश्वास है कि आपके पास टेस्ट लिखे हुए हैं और परिणाम ```./testresults/``` फोल्डर में जनरेट होते हैं, और आपका Bamboo चल रहा है।

## अपने टेस्ट को Bamboo में एकीकृत करें

1. अपना Bamboo प्रोजेक्ट खोलें
    > एक नया प्लान बनाएं, अपने रिपॉजिटरी को लिंक करें (सुनिश्चित करें कि यह हमेशा आपके रिपॉजिटरी के नवीनतम वर्जन की ओर इशारा करता है) और अपने स्टेज बनाएं

    ![Plan Details](/img/bamboo/plancreation.png "Plan Details")

    मैं डिफॉल्ट स्टेज और जॉब के साथ जाऊंगा। आपके मामले में, आप अपने स्वयं के स्टेज और जॉब बना सकते हैं

    ![Default Stage](/img/bamboo/defaultstage.png "Default Stage")
2. अपना टेस्टिंग जॉब खोलें और Bamboo में अपने टेस्ट चलाने के लिए टास्क बनाएं
    >**टास्क 1:** सोर्स कोड चेकआउट

    >**टास्क 2:** अपने टेस्ट चलाएं ```npm i && npm run test```। आप उपरोक्त कमांड चलाने के लिए *स्क्रिप्ट* टास्क और *शेल इंटरप्रेटर* का उपयोग कर सकते हैं (यह टेस्ट परिणामों को जनरेट करेगा और उन्हें ```./testresults/``` फोल्डर में सेव करेगा)

    ![Test Run](/img/bamboo/testrun.png "Test Run")

    >**टास्क: 3** अपने सेव किए गए टेस्ट परिणामों को पार्स करने के लिए *jUnit पार्सर* टास्क जोड़ें। कृपया यहां टेस्ट परिणाम डायरेक्टरी निर्दिष्ट करें (आप Ant स्टाइल पैटर्न का भी उपयोग कर सकते हैं)

    ![jUnit Parser](/img/bamboo/junitparser.png "jUnit Parser")

    नोट: *सुनिश्चित करें कि आप परिणाम पार्सर टास्क को *फाइनल* सेक्शन में रख रहे हैं, ताकि यह हमेशा एक्जीक्यूट हो, भले ही आपका टेस्ट टास्क फेल हो जाए*

    >**टास्क: 4** (वैकल्पिक) यह सुनिश्चित करने के लिए कि आपके टेस्ट परिणाम पुरानी फाइलों के साथ गड़बड़ न हों, आप Bamboo को सफलतापूर्वक पार्स करने के बाद ```./testresults/``` फोल्डर को हटाने के लिए एक टास्क बना सकते हैं। आप परिणामों को हटाने के लिए ```rm -f ./testresults/*.xml``` या पूरे फोल्डर को हटाने के लिए ```rm -r testresults``` जैसी शेल स्क्रिप्ट जोड़ सकते हैं

उपरोक्त *रॉकेट साइंस* पूरी होने के बाद, कृपया प्लान को इनेबल करें और इसे चलाएं। आपका अंतिम आउटपुट इस प्रकार होगा:

## सफल टेस्ट

![Successful Test](/img/bamboo/successfulltest.png "Successful Test")

## विफल टेस्ट

![Failed Test](/img/bamboo/failedtest.png "Failed Test")

## विफल और फिक्स्ड

![Failed and Fixed](/img/bamboo/failedandfixed.png "Failed and Fixed")

यायy!! बस इतना ही। आपने अपने WebdriverIO टेस्ट को Bamboo में सफलतापूर्वक एकीकृत कर लिया है।