---
id: type
title: வகை
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/dialog/type.ts
---

உரையாடல் பெட்டியின் வகையைத் திருப்பித் தருகிறது, இது `alert`, `beforeunload`, `confirm` அல்லது `prompt` என இருக்கலாம்.

##### பயன்பாடு

```js
await dialog.type()
```

##### எடுத்துக்காட்டு

```js title="dialogType.js"
const type = await dialog.type();
```

##### திருப்பித் தருவது

- **&lt;string&gt;**
            **<code><var>returns</var></code>:**   உரையாடல் பெட்டியின் வகை    