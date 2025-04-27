---
id: defaultValue
title: Standardwert
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/dialog/defaultValue.ts
---

Falls der Dialog eine Eingabeaufforderung ist, gibt diese Funktion den Standard-Eingabewert zurück. Andernfalls wird eine leere Zeichenfolge zurückgegeben.

##### Verwendung

```js
await dialog.defaultValue()
```

##### Beispiel

```js title="dialogDefaultValue.js"
const value = await dialog.defaultValue();
```
