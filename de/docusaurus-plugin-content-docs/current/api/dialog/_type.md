---
id: type
title: Typ
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/dialog/type.ts
---

Gibt den Typ des Dialogs zurück, kann einer von `alert`, `beforeunload`, `confirm` oder `prompt` sein.

##### Verwendung

```js
await dialog.type()
```

##### Beispiel

```js title="dialogType.js"
const type = await dialog.type();
```

##### Gibt zurück

- **&lt;string&gt;**
            **<code><var>returns</var></code>:**   Der Typ des Dialogs    