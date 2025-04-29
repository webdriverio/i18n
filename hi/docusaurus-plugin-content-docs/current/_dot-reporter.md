---
id: dot-reporter
title: डॉट रिपोर्टर
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-dot-reporter/README.md
---


> डॉट स्टाइल में रिपोर्ट करने के लिए एक WebdriverIO प्लगइन।

![Dot Reporter](/img/dot.png "Dot Reporter")

## इंस्टालेशन

सबसे आसान तरीका है `@wdio/dot-reporter` को अपने `package.json` में devDependency के रूप में रखना, इस प्रकार:

```sh
npm install @wdio/dot-reporter --save-dev
```

`WebdriverIO` को कैसे इंस्टॉल करें इसके निर्देश [यहां](/docs/gettingstarted) मिल सकते हैं।

## कॉन्फिगरेशन

निम्नलिखित कोड डिफ़ॉल्ट wdio टेस्ट रनर कॉन्फिगरेशन दिखाता है। बस एरे में रिपोर्टर के रूप में `'dot'` जोड़ें।

```js
// wdio.conf.js
module.exports = {
  // ...
  reporters: ['dot'],
  // ...
};
```

----

WebdriverIO के बारे में अधिक जानकारी के लिए [होमपेज](https://webdriver.io) देखें।