---
id: testingbot-service
title: टेस्टिंगबॉट सर्विस
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-testingbot-service/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> WebdriverIO सर्विस जो टेस्टिंगबॉट के साथ बेहतर एकीकरण प्रदान करती है। यह जॉब मेटाडेटा ('name', 'passed', 'tags', 'public', 'build', 'extra') को अपडेट करती है और आवश्यकतानुसार TestingBot टनल चलाती है।

## इंस्टॉलेशन

सबसे आसान तरीका है `@wdio/testingbot-service` को अपने `package.json` में devDependency के रूप में रखना, इस प्रकार:

```sh
npm install @wdio/testingbot-service --save-dev
```

`WebdriverIO` को कैसे इंस्टॉल करना है, इसकी जानकारी [यहां](https://webdriver.io/docs/gettingstarted) मिल सकती है।

## कॉन्फिगरेशन

सर्विस का उपयोग करने के लिए आपको अपनी `wdio.conf.js` फाइल में `user` और `key` सेट करने की आवश्यकता है, और `hostname` विकल्प को `hub.testingbot.com` पर सेट करें। यदि आप [TestingBot टनल](https://testingbot.com/support/other/tunnel) का उपयोग करना चाहते हैं तो आपको `tbTunnel: true` सेट करना होगा।

```js
// wdio.conf.js
export const config = {
    // ...
    user: process.env.TB_KEY,
    key: process.env.TB_SECRET,
    services: [
        ['testingbot', {
            tbTunnel: true
        }]
    ],
    // ...
};
```

## विकल्प

TestingBot सर्विस को अधिकृत करने के लिए आपके कॉन्फिग में [`user`](https://webdriver.io/docs/options#user) और [`key`](https://webdriver.io/docs/options#key) विकल्प होने चाहिए।

### tbTunnel
यदि सत्य है तो यह TestingBot टनल चलाता है और आपके ब्राउज़र परीक्षणों को चलाने वाले TestingBot वर्चुअल मशीन के बीच एक सुरक्षित कनेक्शन खोलता है।

प्रकार: `Boolean`<br />
डिफ़ॉल्ट: `false`

### tbTunnelOpts
TestingBot टनल विकल्पों को लागू करें (जैसे पोर्ट नंबर या logFile सेटिंग्स बदलने के लिए)। अधिक जानकारी के लिए [यह सूची](https://github.com/testingbot/testingbot-tunnel-launcher) देखें।

प्रकार: `Object`<br />
डिफ़ॉल्ट: `{}`