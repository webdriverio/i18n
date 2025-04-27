---
id: defaultValue
title: valorPredeterminado
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/dialog/defaultValue.ts
---

Si el diálogo es una solicitud (prompt), devuelve el valor predeterminado de la solicitud. De lo contrario, devuelve una cadena vacía.

##### Uso

```js
await dialog.defaultValue()
```

##### Ejemplo

```js title="dialogDefaultValue.js"
const value = await dialog.defaultValue();
```