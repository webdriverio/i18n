---
id: sumologic-reporter
title: सूमोलॉजिक रिपोर्टर
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-sumologic-reporter/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> एक WebdriverIO रिपोर्टर जो परीक्षण परिणामों को डेटा विश्लेषण के लिए [Sumologic](https://www.sumologic.com/) पर भेजता है

![Sumologic Dashboard](/img/sumologic.png "Sumologic Dashboard")

## इंस्टालेशन

सबसे आसान तरीका `@wdio/sumologic-reporter` को आपके `package.json` में devDependency के रूप में रखना है, इसके माध्यम से:

```sh
npm install @wdio/sumologic-reporter --save-dev
```

`WebdriverIO` को कैसे इंस्टॉल करें इसके निर्देश [यहां](https://webdriver.io/docs/gettingstarted) मिल सकते हैं।

## कॉन्फिगरेशन

सबसे पहले हमें एक नया कलेक्टर बनाना होगा जो आपके परीक्षणों के सभी लॉग एकत्र करता है। ऐसा करने के लिए नेविगेशन बार में __Manage__ पर क्लिक करें और __Collection__ पर जाएं। वहां आपको एक नया "Hosted Collector" जोड़ने की आवश्यकता है। एक उपयुक्त नाम, उदाहरण के लिए "test integration logs", विवरण और एक श्रेणी, जैसे "wdio" लागू करें। कलेक्टर बनाने के लिए Save पर क्लिक करें।

![Add Collector](https://webdriver.io/images/sumo-collector.png "Add Collector")

अगला कदम एक स्रोत जोड़ना है। अपने प्रत्येक वातावरण के लिए एक अलग स्रोत होना समझदारी है (जैसे ब्रांच बिल्ड, एकीकरण)। अपने कलेक्टर के बगल में "Add Source" लिंक पर क्लिक करें और एक __HTTP Source__ जोड़ें। फिर से एक उपयुक्त नाम और विवरण लागू करें और वातावरण को दर्शाने वाली "Source Category" सेट करें। अन्य विकल्पों को डिफ़ॉल्ट स्थिति में छोड़ दें और save पर क्लिक करें।

![Add Source](https://webdriver.io/images/sumo-source.png "Add Source")

स्रोत एंडपॉइंट के साथ एक मॉडल पॉप अप होता है। उस URL को कॉपी करें और अपने wdio.conf.js में पेस्ट करें ताकि रिपोर्टर को पता चले कि डेटा कहां भेजना है।

निम्नलिखित कोड डिफ़ॉल्ट wdio टेस्ट रनर कॉन्फिगरेशन दिखाता है। बस `'sumologic'` को array में रिपोर्टर के रूप में जोड़ें और अपना स्रोत एंडपॉइंट जोड़ें:

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

रिपोर्टर के साथ पहले परीक्षण चलाने के बाद आप निम्न क्वेरी के साथ परीक्षण लॉग की जांच कर सकते हैं:

```
_source=wdio
| parse "\"type\":\"*:*\"" as type,status
| json auto
```

मैं जल्द ही Sumologic के लिए कुछ उपयोगी डैशबोर्ड टेम्पलेट प्रदान करूंगा।

----

WebdriverIO पर अधिक जानकारी के लिए [होमपेज](https://webdriver.io) देखें।