---
id: defaultValue
title: defaultValue
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/dialog/defaultValue.ts
---

Якщо діалог є вікном підказки (prompt), повертає значення підказки за замовчуванням. В іншому випадку повертає порожній рядок.

##### Використання

```js
await dialog.defaultValue()
```

##### Приклад

```js title="dialogDefaultValue.js"
const value = await dialog.defaultValue();
```