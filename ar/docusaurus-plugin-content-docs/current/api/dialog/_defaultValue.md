---
id: defaultValue
title: القيمة الافتراضية
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/dialog/defaultValue.ts
---

إذا كان الحوار هو مربع إدخال، فإنه يُرجع القيمة الافتراضية للإدخال. وإلا، يُرجع سلسلة فارغة.

##### الاستخدام

```js
await dialog.defaultValue()
```

##### مثال

```js title="dialogDefaultValue.js"
const value = await dialog.defaultValue();
```