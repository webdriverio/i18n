---
id: type
title: نوع
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/dialog/type.ts
---

يُرجع نوع مربع الحوار، ويمكن أن يكون إما `alert` أو `beforeunload` أو `confirm` أو `prompt`.

##### الاستخدام

```js
await dialog.type()
```

##### مثال

```js title="dialogType.js"
const type = await dialog.type();
```

##### يُرجع

- **&lt;string&gt;**
            **<code><var>returns</var></code>:**   نوع مربع الحوار