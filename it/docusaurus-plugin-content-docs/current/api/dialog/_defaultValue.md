---
id: defaultValue
title: valore predefinito
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/dialog/defaultValue.ts
---

Se la finestra di dialogo è un prompt, restituisce il valore predefinito del prompt. Altrimenti, restituisce una stringa vuota.

##### Utilizzo

```js
await dialog.defaultValue()
```

##### Esempio

```js title="dialogDefaultValue.js"
const value = await dialog.defaultValue();
```