---
id: seleniumgrid
title: Selenium Grid
description: "अपने कॉन्फ़िगरेशन में protocol, hostname, port और path सेट करके WebdriverIO टेस्ट को किसी मौजूदा Selenium Grid से कनेक्ट करें।"
---

आप अपने मौजूदा Selenium Grid इंस्टेंस के साथ WebdriverIO का उपयोग कर सकते हैं। अपने टेस्ट को Selenium Grid से कनेक्ट करने के लिए, आपको बस अपने टेस्ट रनर कॉन्फ़िगरेशन में विकल्पों को अपडेट करना होगा।

यहाँ नमूना wdio.conf.ts से एक कोड स्निपेट दिया गया है।

```ts title=wdio.conf.ts
export const config: WebdriverIO.Config = {
    // ...
    protocol: 'https',
    hostname: 'yourseleniumgridhost.yourdomain.com',
    port: 443,
    path: '/wd/hub',
    // ...

}
```
आपको अपने Selenium Grid सेटअप के आधार पर protocol, hostname, port और path के लिए उपयुक्त मान प्रदान करने होंगे।
यदि आप Selenium Grid को उसी मशीन पर चला रहे हैं जिस पर आपकी टेस्ट स्क्रिप्ट्स चलती हैं, तो यहाँ कुछ सामान्य विकल्प दिए गए हैं:

```ts title=wdio.conf.ts
export const config: WebdriverIO.Config = {
    // ...
    protocol: 'http',
    hostname: 'localhost',
    port: 4444,
    path: '/wd/hub',
    // ...

}
```

### सुरक्षित Selenium Grid के साथ बेसिक ऑथेंटिकेशन

अपने Selenium Grid को सुरक्षित करने की अत्यधिक अनुशंसा की जाती है। यदि आपके पास एक सुरक्षित Selenium Grid है जिसके लिए ऑथेंटिकेशन आवश्यक है, तो आप विकल्पों के माध्यम से ऑथेंटिकेशन हेडर पास कर सकते हैं। 
अधिक जानकारी के लिए कृपया डॉक्यूमेंटेशन में [headers](https://webdriver.io/docs/configuration/#headers) सेक्शन देखें।

### डायनामिक Selenium Grid के साथ टाइमआउट कॉन्फ़िगरेशन

डायनामिक Selenium Grid का उपयोग करते समय, जहाँ ब्राउज़र पॉड्स मांग पर शुरू किए जाते हैं, सेशन बनाने में कोल्ड स्टार्ट की समस्या आ सकती है। ऐसे मामलों में, सेशन निर्माण टाइमआउट को बढ़ाने की सलाह दी जाती है। विकल्पों में डिफ़ॉल्ट मान 120 सेकंड है, लेकिन यदि आपके ग्रिड को नया सेशन बनाने में अधिक समय लगता है तो आप इसे बढ़ा सकते हैं। 

```ts
connectionRetryTimeout: 180000,
```

### उन्नत कॉन्फ़िगरेशन

उन्नत कॉन्फ़िगरेशन के लिए, कृपया Testrunner [कॉन्फ़िगरेशन फ़ाइल](https://webdriver.io/docs/configurationfile) देखें।

### Selenium Grid के साथ फ़ाइल ऑपरेशन

रिमोट Selenium Grid के साथ टेस्ट केस चलाते समय, ब्राउज़र एक रिमोट मशीन पर चलता है, और आपको फ़ाइल अपलोड और डाउनलोड से जुड़े टेस्ट केस में विशेष ध्यान रखना होगा।

### फ़ाइल डाउनलोड

Chromium-आधारित ब्राउज़रों के लिए, आप [Download file](https://webdriver.io/docs/api/browser/downloadFile) डॉक्यूमेंटेशन देख सकते हैं। यदि आपकी टेस्ट स्क्रिप्ट्स को डाउनलोड की गई फ़ाइल की सामग्री पढ़नी है, तो आपको उसे रिमोट Selenium नोड से टेस्ट रनर मशीन पर डाउनलोड करना होगा। यहाँ Chrome ब्राउज़र के लिए नमूना `wdio.conf.ts` कॉन्फ़िगरेशन से एक उदाहरण कोड स्निपेट दिया गया है:

```ts title=wdio.conf.ts
export const config: WebdriverIO.Config = {
    // ...
    protocol: 'https',
    hostname: 'yourseleniumgridhost.yourdomain.com',
    port: 443,
    path: '/wd/hub',
    // ...
    capabilities: [{
        browserName: 'chrome',
        'se:downloadsEnabled': true
    }],
    //...
}
```

### रिमोट Selenium Grid के साथ फ़ाइल अपलोड

[`element.setFiles()`](/docs/api/element/setFiles) WebDriver BiDi के माध्यम से एक फ़ाइल इनपुट सेट करता है। आपके द्वारा पास किए गए पाथ ब्राउज़र द्वारा खोले जाते हैं, इसलिए उनका उस मशीन पर मौजूद होना आवश्यक है जिस पर ब्राउज़र चलता है। WebdriverIO किसी लोकल फ़ाइल को Selenium नोड पर स्टेज नहीं करता है।

```ts
await $('#file-upload').setFiles('/path/on/the/node/file.png')
```

जो सुइट नोड पर बाइट्स भेजने के लिए `browser.uploadFile()` का उपयोग करता था, उसे फ़ाइल को ऐसी जगह रखना होगा जहाँ ब्राउज़र उसे पढ़ सके, और फिर `setFiles` को कॉल करना होगा। Selenium [`file`](/docs/api/selenium#file) एंडपॉइंट अभी भी Chromedriver, Edgedriver और Selenium Grid के लिए `browser.file()` के रूप में उपलब्ध है। यह कोई WebDriver या WebDriver BiDi कमांड नहीं है।

### अन्य फ़ाइल/ग्रिड ऑपरेशन

कुछ और ऑपरेशन हैं जिन्हें आप Selenium Grid के साथ कर सकते हैं। Selenium Standalone के निर्देश Selenium Grid के साथ भी ठीक से काम करने चाहिए। उपलब्ध विकल्पों के लिए कृपया [Selenium Standalone](https://webdriver.io/docs/api/selenium/) डॉक्यूमेंटेशन देखें।


### Selenium Grid आधिकारिक डॉक्यूमेंटेशन

Selenium Grid के बारे में अधिक जानकारी के लिए, आप आधिकारिक Selenium Grid [डॉक्यूमेंटेशन](https://www.selenium.dev/documentation/grid/) देख सकते हैं। 

यदि आप Selenium Grid को Docker, Docker compose या Kubernetes में चलाना चाहते हैं, तो कृपया Selenium-Docker [GitHub रिपॉजिटरी](https://github.com/SeleniumHQ/docker-selenium) देखें।