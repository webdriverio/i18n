---
id: defaultValue
title: डिफ़ॉल्टवैल्यू (defaultValue)
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/dialog/defaultValue.ts
---

अगर डायलॉग प्रॉम्प्ट है, तो डिफ़ॉल्ट प्रॉम्प्ट वैल्यू लौटाता है। अन्यथा, खाली स्ट्रिंग लौटाता है।

##### उपयोग

```js
await dialog.defaultValue()
```

##### उदाहरण

```js title="dialogDefaultValue.js"
const value = await dialog.defaultValue();
```