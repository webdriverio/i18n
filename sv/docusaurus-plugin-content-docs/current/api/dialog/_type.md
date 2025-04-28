---
id: type
title: typ
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/dialog/type.ts
---

Returnerar dialogens typ, kan vara en av `alert`, `beforeunload`, `confirm` eller `prompt`.

##### Användning

```js
await dialog.type()
```

##### Exempel

```js title="dialogType.js"
const type = await dialog.type();
```

##### Returnerar

- **&lt;string&gt;**
            **<code><var>returns</var></code>:**   Dialogens typ    