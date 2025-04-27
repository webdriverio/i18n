---
id: defaultValue
title: இயல்புநிலை மதிப்பு
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/dialog/defaultValue.ts
---

உரையாடல் உள்ளீட்டுக் குறிப்பு எனில், இயல்புநிலை உள்ளீட்டு மதிப்பை திருப்பித் தருகிறது. இல்லையெனில், வெற்று சரத்தை திருப்பித் தருகிறது.

##### பயன்பாடு

```js
await dialog.defaultValue()
```

##### எடுத்துக்காட்டு

```js title="dialogDefaultValue.js"
const value = await dialog.defaultValue();
```