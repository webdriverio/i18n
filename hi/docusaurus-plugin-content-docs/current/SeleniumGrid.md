---
id: seleniumgrid
title: सेलेनियम ग्रिड
---

आप अपने मौजूदा सेलेनियम ग्रिड इंस्टेंस के साथ WebdriverIO का उपयोग कर सकते हैं। अपने टेस्ट को सेलेनियम ग्रिड से कनेक्ट करने के लिए, आपको बस अपने टेस्ट रनर कॉन्फिगरेशन में विकल्पों को अपडेट करने की आवश्यकता है।

यहां नमूना wdio.conf.ts से एक कोड स्निपेट दिया गया है।

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
आपको अपने सेलेनियम ग्रिड सेटअप के आधार पर प्रोटोकॉल, होस्टनेम, पोर्ट और पाथ के लिए उचित मान प्रदान करने होंगे।
यदि आप अपने टेस्ट स्क्रिप्ट के साथ एक ही मशीन पर सेलेनियम ग्रिड चला रहे हैं, तो यहां कुछ सामान्य विकल्प हैं:

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

### सुरक्षित सेलेनियम ग्रिड के साथ बेसिक प्रमाणीकरण

अपने सेलेनियम ग्रिड को सुरक्षित करना अत्यधिक अनुशंसित है। यदि आपके पास एक सुरक्षित सेलेनियम ग्रिड है जिसे प्रमाणीकरण की आवश्यकता है, तो आप विकल्पों के माध्यम से प्रमाणीकरण हेडर भेज सकते हैं।
अधिक जानकारी के लिए कृपया दस्तावेज़ीकरण में [headers](https://webdriver.io/docs/configuration/#headers) अनुभाग देखें।

### गतिशील सेलेनियम ग्रिड के साथ टाइमआउट कॉन्फिगरेशन

जब डायनामिक सेलेनियम ग्रिड का उपयोग किया जाता है जहां ब्राउज़र पॉड्स मांग पर स्पिन अप होते हैं, तो सत्र निर्माण में कोल्ड स्टार्ट का सामना करना पड़ सकता है। ऐसे मामलों में, सत्र निर्माण टाइमआउट बढ़ाने की सलाह दी जाती है। विकल्पों में डिफ़ॉल्ट मान 120 सेकंड है, लेकिन आप इसे बढ़ा सकते हैं यदि आपके ग्रिड को एक नया सत्र बनाने में अधिक समय लगता है।

```ts
connectionRetryTimeout: 180000,
```

### उन्नत कॉन्फिगरेशन

उन्नत कॉन्फिगरेशन के लिए, कृपया टेस्टरनर [configuration file](https://webdriver.io/docs/configurationfile) देखें।

### सेलेनियम ग्रिड के साथ फ़ाइल ऑपरेशंस

रिमोट सेलेनियम ग्रिड के साथ टेस्ट केस चलाते समय, ब्राउज़र एक रिमोट मशीन पर चलता है, और आपको फ़ाइल अपलोड और डाउनलोड से जुड़े टेस्ट केसों के साथ विशेष ध्यान रखने की आवश्यकता होती है।

### फ़ाइल डाउनलोड्स

क्रोमियम-आधारित ब्राउज़रों के लिए, आप [Download file](https://webdriver.io/docs/api/browser/downloadFile) दस्तावेज़ीकरण देख सकते हैं। यदि आपके टेस्ट स्क्रिप्ट को डाउनलोड की गई फ़ाइल की सामग्री पढ़ने की आवश्यकता है, तो आपको इसे दूरस्थ सेलेनियम नोड से टेस्ट रनर मशीन पर डाउनलोड करने की आवश्यकता है। यहां क्रोम ब्राउज़र के लिए नमूना `wdio.conf.ts` कॉन्फिगरेशन से एक उदाहरण कोड स्निपेट दिया गया है:

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

### रिमोट सेलेनियम ग्रिड के साथ फ़ाइल अपलोड

रिमोट ब्राउज़र में वेब ऐप पर फ़ाइल अपलोड करने के लिए, आपको पहले फ़ाइल को रिमोट ग्रिड पर अपलोड करने की आवश्यकता होती है। विवरण के लिए आप [uploadFile](https://webdriver.io/docs/api/browser/uploadFile) दस्तावेज़ीकरण देख सकते हैं।

### अन्य फ़ाइल/ग्रिड ऑपरेशंस

कुछ और ऑपरेशंस हैं जिन्हें आप सेलेनियम ग्रिड के साथ कर सकते हैं। सेलेनियम स्टैंडअलोन के लिए निर्देश सेलेनियम ग्रिड के साथ भी ठीक से काम करने चाहिए। उपलब्ध विकल्पों के लिए कृपया [Selenium Standalone](https://webdriver.io/docs/api/selenium/) दस्तावेज़ीकरण देखें।


### सेलेनियम ग्रिड आधिकारिक दस्तावेज़ीकरण

सेलेनियम ग्रिड के बारे में अधिक जानकारी के लिए, आप आधिकारिक सेलेनियम ग्रिड [documentation](https://www.selenium.dev/documentation/grid/) देख सकते हैं।

यदि आप डॉकर, डॉकर कंपोज या कुबेरनेट्स में सेलेनियम ग्रिड चलाना चाहते हैं, तो कृपया सेलेनियम-डॉकर [GitHub repository](https://github.com/SeleniumHQ/docker-selenium) देखें।