---
id: defaultValue
title: defaultValue (значение по умолчанию)
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/dialog/defaultValue.ts
---

Если диалог является приглашением ввода (prompt), возвращает значение по умолчанию для приглашения. В противном случае возвращает пустую строку.

##### Использование

```js
await dialog.defaultValue()
```

##### Пример

```js title="dialogDefaultValue.js"
const value = await dialog.defaultValue();
```