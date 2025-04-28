---
id: type
title: النوع
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/dialog/type.ts
---

يرجع نوع مربع الحوار، ويمكن أن يكون أحد هذه الأنواع: `alert`، `beforeunload`، `confirm` أو `prompt`.

##### الاستخدام

```js
await dialog.type()
```

##### مثال

```js title="dialogType.js"
const type = await dialog.type();
```

##### العائد

- **&lt;string&gt;**
            **<code><var>returns</var></code>:**   نوع مربع الحوار