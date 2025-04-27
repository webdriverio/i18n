---
id: type
title: tipo
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/dialog/type.ts
---

Devuelve el tipo de diálogo, puede ser uno de `alert`, `beforeunload`, `confirm` o `prompt`.

##### Uso

```js
await dialog.type()
```

##### Ejemplo

```js title="dialogType.js"
const type = await dialog.type();
```

##### Devuelve

- **&lt;string&gt;**
            **<code><var>returns</var></code>:**   El tipo del diálogo