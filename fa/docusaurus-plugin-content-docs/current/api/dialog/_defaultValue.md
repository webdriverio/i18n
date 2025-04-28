---
id: defaultValue
title: مقدار پیش‌فرض
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/dialog/defaultValue.ts
---

اگر دیالوگ از نوع prompt باشد، مقدار پیش‌فرض prompt را برمی‌گرداند. در غیر این صورت، رشته خالی برمی‌گرداند.

##### استفاده

```js
await dialog.defaultValue()
```

##### مثال

```js title="dialogDefaultValue.js"
const value = await dialog.defaultValue();
```