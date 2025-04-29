---
id: wdio-performancetotal-service
title: परफॉरमेंस टोटल सर्विस
custom_edit_url: https://github.com/tzurp/performance-total/edit/master/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-performancetotal-service एक तृतीय पक्ष पैकेज है, अधिक जानकारी के लिए कृपया देखें [GitHub](https://github.com/tzurp/performance-total) | [npm](https://www.npmjs.com/package/wdio-performancetotal-service)
नोट:<br/>
WebdriverIO v9 के लिए संस्करण 4.x.x का उपयोग करें।<br/>
WebdriverIO v8 के लिए संस्करण 3.x.x का उपयोग करें।<br/>
WebdriverIO v7 के लिए संस्करण 2.x.x का उपयोग करें।<br/>
WebdriverIO v6 के लिए संस्करण 1.x.x का उपयोग करें।

---

![chart](https://github.com/tzurp/performance-total/blob/master/resources/chart.png)

[webdriver.io](https://webdriver.io/) के लिए इस प्लगइन के साथ आप अपने परीक्षणों में किसी भी प्रवाह के लिए आसानी से प्रदर्शन विश्लेषण जोड़ सकते हैं, चाहे वह शुद्ध UI, API, या दोनों का संयोजन हो। यह प्लगइन विभिन्न प्रक्रियाओं के प्रतिक्रिया समय को मापने और आपके एप्लिकेशन में संभावित बाधाओं की पहचान करने का एक सरल और कुशल तरीका प्रदान करता है। इस जानकारी के साथ, आप अपने एप्लिकेशन के समग्र प्रदर्शन को बढ़ाने के लिए अनुकूलन और सुधार के बारे में सूचित निर्णय ले सकते हैं।

## इंस्टॉलेशन

इस मॉड्यूल को dev डिपेंडेंसी के रूप में इंस्टॉल करने का सबसे आसान तरीका निम्न कमांड का उपयोग करके है:

```
npm install wdio-performancetotal-service --save-dev
```

## उपयोग

अपने `wdio.conf.js` में wdio-performancetotal-service जोड़ें:

```typescript
exports.config = {
  // ...
  services: ['performancetotal']
  // ...
};
```
...या सर्विस विकल्पों के साथ:

```typescript
exports.config = {
  // ...
  services: [
      ['performancetotal',
      // विकल्प (डिफ़ॉल्ट मूल्यों के साथ)
        {
            disableAppendToExistingFile: false,
            performanceResultsFileName: "performance-results",
            dropResultsFromFailedTest: false,
            performanceResultsDirectory: "performance-results",
            analyzeByBrowser: false,
            recentDays: 0
        }]
      ]
  // ...
};
```

### विकल्प

#### __disableAppendToExistingFile__

जब `true` पर सेट किया जाता है, नए टेस्ट रन ताजा शुरू होंगे और किसी भी मौजूदा प्रदर्शन डेटा को ओवरराइट करेंगे।
जब `false` (डिफ़ॉल्ट) पर सेट किया जाता है, प्रदर्शन डेटा मौजूदा डेटा में जोड़ा जाएगा।

> **⚠️ सावधानी:**
>
> यह क्रिया आपके सभी प्रदर्शन डेटा को स्थायी रूप से हटा देगी। आगे बढ़ने से पहले सुनिश्चित करें कि आपके पास बैकअप है।

#### __performanceResultsFileName__

आप डिफ़ॉल्ट परिणाम फ़ाइल नाम (`performance-results`) को ओवरराइड कर सकते हैं।
एक नई बनाई गई परिणाम फ़ाइल आमतौर पर पुरानी फ़ाइल को ओवरराइट करती है। यदि आप पुरानी फ़ाइलें रखना चाहते हैं, तो फ़ाइल नाम में टाइमस्टैम्प जोड़ने की सिफारिश की जाती है। उदाहरण के लिए:

```typescript
...
performanceResultsFileName: `performance-results_${new Date().getTime()}`
...
```

#### __dropResultsFromFailedTest__

डिफ़ॉल्ट `false` है। जब मान `true` पर सेट किया जाता है, असफल परीक्षणों से प्रदर्शन विश्लेषण को बाहर रखा जाएगा।

#### __recentDays__

डिफ़ॉल्ट `0` है (कोई सीमा नहीं)। प्रदर्शन विश्लेषण के लिए विचार करने के लिए दिनों की संख्या सेट करने के लिए दिनों की संख्या सेट करें। आंशिक दिन भी समर्थित हैं (जैसे `recentDays: 0.5`)

#### __performanceResultsDirectory__

आप प्रोजेक्ट के रूट डायरेक्टरी में परिणाम डायरेक्टरी के लिए डिफ़ॉल्ट पाथ को ओवरराइड कर सकते हैं।
उदाहरण के लिए:

```typescript
...
performanceResultsDirectory: "results-dir/performance-total-results"
...
```

#### __analyzeByBrowser__

डिफ़ॉल्ट `false` है। यदि `true` है, तो प्रदर्शन डेटा का विश्लेषण ब्राउज़र प्रकार के अनुसार भी किया जाएगा।


### परीक्षण में उपयोग

बस __performancetotal__ को वहां इम्पोर्ट करें जहां आपको इसकी आवश्यकता है, चाहे वह आपकी टेस्ट फ़ाइल में हो या किसी अन्य क्लास में। यह ऑब्जेक्ट आपके परीक्षणों में प्रदर्शन डेटा को मापने के लिए विधियां प्रदान करता है, जिसमें प्रदर्शन मापन शुरू करने और समाप्त करने के लिए sampleStart और sampleEnd शामिल हैं।
यहां एक उदाहरण है कि आप दो वेबसाइटों के स्टार्टअप प्रदर्शन को मापने के लिए performancetotal ऑब्जेक्ट का उपयोग कैसे कर सकते हैं:

```typescript
// यह टेस्ट केस performancetotal ऑब्जेक्ट का उपयोग करके Github और SourceForge के स्टार्टअप प्रदर्शन को मापता है।

import { performancetotal } from "wdio-performancetotal-service";

it("should test github and sourceforge startup performance", () => {
    // Github के लिए एक नया प्रदर्शन मापन शुरू करें
    performancetotal.sampleStart("GH-Startup");

    // Github पर नेविगेट करें
    browser.url("https://github.com/");

    // Github मापन को समाप्त करें और परिणाम सहेजें
    performancetotal.sampleEnd("GH-Startup");

    // ...

    // SourceForge के लिए एक नया प्रदर्शन मापन शुरू करें
    performancetotal.sampleStart("SF-Startup");

    // SourceForge पर नेविगेट करें
    await browser.url("https://sourceforge.net/");

    // SourceForge मापन को समाप्त करें और परिणाम सहेजें
    performancetotal.sampleEnd("SF-Startup");
});

```

आप अपने परीक्षण में performancetotal.getSampleTime(sampleName) को कॉल करके एकल प्रदर्शन सैंपल के लिए लिया गया समय प्राप्त कर सकते हैं। यह आपको कोड के एक विशिष्ट हिस्से के प्रदर्शन की जांच करने और यह सुनिश्चित करने की अनुमति देता है कि वह आपकी अपेक्षाओं को पूरा करता है।

```typescript
// एकल सैंपल के लिए लिया गया समय प्राप्त करें
const sampleTime = performancetotal.getSampleTime(sampleName);

```

## परिणाम प्राप्त करना

जब सभी परीक्षण पूरे हो जाते हैं, तो आपके प्रोजेक्ट के रूट फोल्डर में एक नई परिणाम डायरेक्टरी बनाई जाती है (डिफॉल्ट डायरेक्टरी का नाम performance-results है)। इस डायरेक्टरी के अंदर, दो फाइलें बनाई जाती हैं: performance-results.json और performance-results.csv। इन फाइलों में प्रत्येक सैंपल के लिए विश्लेषित डेटा होता है, जिसमें औसत समय, मीन का मानक त्रुटि (SEM), सैंपल की संख्या, न्यूनतम मूल्य, अधिकतम मूल्य, सबसे पहले का समय और नवीनतम समय शामिल हैं। आप इस डेटा का उपयोग समय के साथ किसी भी प्रदर्शन प्रतिगमन या सुधार की पहचान करने के लिए कर सकते हैं।

### बल्क में प्रदर्शन डेटा का विश्लेषण

नए परीक्षण उत्पन्न किए बिना मौजूदा प्रदर्शन डेटा का बल्क में विश्लेषण करने के लिए, [__performancetotal-cli__ टूल](https://www.npmjs.com/package/performancetotal-cli) का उपयोग करने की सिफारिश की जाती है।

## Typescript समर्थन

इस प्लगइन के लिए Typescript समर्थित है।

## समर्थन

समर्थन और सुझावों के लिए, बेझिझक मुझसे [tzur.paldi@outlook.com](https://github.com/tzurp/performance-total/blob/master/mailto:tzur.paldi@outlook.com) पर संपर्क करें।