---
id: type
title: type
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/dialog/type.ts
---

Zwraca typ okna dialogowego, może być jednym z `alert`, `beforeunload`, `confirm` lub `prompt`.

##### Użycie

```js
await dialog.type()
```

##### Przykład

```js title="dialogType.js"
const type = await dialog.type();
```

##### Zwraca

- **&lt;string&gt;**
            **<code><var>returns</var></code>:**   Typ okna dialogowego