---
id: type
title: टाइप
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/dialog/type.ts
---

डायलॉग का प्रकार देता है, जो `alert`, `beforeunload`, `confirm` या `prompt` में से एक हो सकता है।

##### उपयोग

```js
await dialog.type()
```

##### उदाहरण

```js title="dialogType.js"
const type = await dialog.type();
```

##### रिटर्न्स

- **&lt;string&gt;**
            **<code><var>returns</var></code>:**   डायलॉग का प्रकार