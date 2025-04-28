---
id: type
title: نوع
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/dialog/type.ts
---

نوع دیالوگ را برمی‌گرداند، می‌تواند یکی از موارد `alert`، `beforeunload`، `confirm` یا `prompt` باشد.

##### استفاده

```js
await dialog.type()
```

##### مثال

```js title="dialogType.js"
const type = await dialog.type();
```

##### برمی‌گرداند

- **&lt;string&gt;**
            **<code><var>returns</var></code>:**   نوع دیالوگ    