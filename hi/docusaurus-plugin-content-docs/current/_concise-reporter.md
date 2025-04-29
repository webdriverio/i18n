---
id: concise-reporter
title: संक्षिप्त रिपोर्टर
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-concise-reporter/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> एक WebdriverIO प्लगइन जो संक्षिप्त शैली में रिपोर्ट करता है।

## इंस्टालेशन

सबसे आसान तरीका है `@wdio/concise-reporter` को अपने `package.json` में devDependency के रूप में रखना, इसके माध्यम से:

```sh
npm install @wdio/concise-reporter --save-dev
```

`WebdriverIO` को कैसे इंस्टॉल करें इस पर निर्देश [यहां](https://webdriver.io/docs/gettingstarted) मिल सकते हैं।

## कॉन्फिगरेशन

निम्नलिखित कोड डिफ़ॉल्ट wdio टेस्ट रनर कॉन्फिगरेशन दिखाता है। बस `'concise'` को एरे में रिपोर्टर के रूप में जोड़ें।

```js
// wdio.conf.js
module.exports = {
  // ...
  reporters: ['dot', 'concise'],
  // ...
};
```