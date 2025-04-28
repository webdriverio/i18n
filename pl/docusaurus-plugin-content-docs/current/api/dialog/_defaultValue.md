---
id: defaultValue
title: domyślna wartość
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/dialog/defaultValue.ts
---

Jeśli dialog jest typu prompt, zwraca domyślną wartość prompt. W przeciwnym razie zwraca pusty ciąg znaków.

##### Użycie

```js
await dialog.defaultValue()
```

##### Przykład

```js title="dialogDefaultValue.js"
const value = await dialog.defaultValue();
```