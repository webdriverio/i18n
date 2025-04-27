---
id: type
title: type
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/dialog/type.ts
---

Renvoie le type de la boîte de dialogue, qui peut être `alert`, `beforeunload`, `confirm` ou `prompt`.

##### Utilisation

```js
await dialog.type()
```

##### Exemple

```js title="dialogType.js"
const type = await dialog.type();
```

##### Retourne

- **&lt;string&gt;**
            **<code><var>returns</var></code>:**   Le type de la boîte de dialogue