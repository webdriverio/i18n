---
id: type
title: type
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/dialog/type.ts
---

Restituisce il tipo di dialogo, può essere uno tra `alert`, `beforeunload`, `confirm` o `prompt`.

##### Utilizzo

```js
await dialog.type()
```

##### Esempio

```js title="dialogType.js"
const type = await dialog.type();
```

##### Restituisce

- **&lt;string&gt;**
            **<code><var>returns</var></code>:**   Il tipo del dialogo