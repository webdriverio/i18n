---
id: sumologic-reporter
title: सुमोलॉजिक रिपोर्टर
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-sumologic-reporter/README.md
---


> एक WebdriverIO रिपोर्टर जो डेटा विश्लेषण के लिए परीक्षण परिणामों को [Sumologic](https://www.sumologic.com/) पर भेजता है

![Sumologic Dashboard](/img/sumologic.png "Sumologic Dashboard")

## इंस्टालेशन

सबसे आसान तरीका है `@wdio/sumologic-reporter` को अपने `package.json` में devDependency के रूप में रखना, इसके माध्यम से:

```sh
npm install @wdio/sumologic-reporter --save-dev
```

`WebdriverIO` को कैसे इंस्टॉल करें, इसके निर्देश [यहां](https://webdriver.io/docs/gettingstarted) पाए जा सकते हैं।

## कॉन्फ़िगरेशन

सबसे पहले हमें एक नया कलेक्टर बनाना होगा जो आपके परीक्षणों के सभी लॉग्स को एकत्रित करता है। ऐसा करने के लिए नेविगेशन बार में __Manage__ पर क्लिक करें और __Collection__ पर जाएं। वहां आपको एक नया "Hosted Collector" जोड़ना होगा। एक उपयुक्त नाम लागू करें, जैसे "test integration logs", विवरण और एक श्रेणी, जैसे "wdio"। कलेक्टर बनाने के लिए Save पर क्लिक करें।

![Add Collector](https://webdriver.io/images/sumo-collector.png "Add Collector")

अगला कदम एक स्रोत जोड़ना है। अपने प्रत्येक वातावरण के लिए एक अलग स्रोत रखना समझदारी है (जैसे ब्रांच बिल्ड, इंटीग्रेशन)। अपने कलेक्टर के बगल में "Add Source" लिंक पर क्लिक करें और एक __HTTP Source__ जोड़ें। फिर से एक उपयुक्त नाम और विवरण लागू करें और एक "Source Category" सेट करें जो वातावरण को दर्शाता है। अन्य विकल्पों को डिफ़ॉल्ट स्थिति में छोड़ दें और save पर क्लिक करें।

![Add Source](https://webdriver.io/images/sumo-source.png "Add Source")

एक मॉडल स्रोत एंडपॉइंट के साथ पॉप अप होता है। उस url को कॉपी करें और अपने wdio.conf.js में पेस्ट करें ताकि रिपोर्टर को पता चले कि डेटा कहां भेजना है।

निम्नलिखित कोड डिफ़ॉल्ट wdio टेस्ट रनर कॉन्फ़िगरेशन दिखाता है। बस array में रिपोर्टर के रूप में `'sumologic'` जोड़ें और अपना स्रोत एंडपॉइंट जोड़ें:

```js
// wdio.conf.js
module.exports = {
  // ...
  reporters: [
    'spec',
    ['sumologic', {
        // define sync interval how often logs get pushed to Sumologic
        syncInterval: 100,
        // endpoint of collector source
        sourceAddress: process.env.SUMO_SOURCE_ADDRESS
    }]
  ],
  // ...
};
```

रिपोर्टर के साथ पहले परीक्षण चलाने के बाद आपको निम्नलिखित क्वेरी के साथ परीक्षण लॉग्स की जांच करने में सक्षम होना चाहिए:

```
_source=wdio
| parse "\"type\":\"*:*\"" as type,status
| json auto
```

मैं जल्द ही Sumologic के लिए कुछ उपयोगी डैशबोर्ड टेम्प्लेट प्रदान करूंगा।

----

WebdriverIO पर अधिक जानकारी के लिए [होमपेज](https://webdriver.io) देखें।