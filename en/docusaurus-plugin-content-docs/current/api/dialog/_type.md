---
id: type
title: type
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/dialog/type.ts
---

Returns dialog's type, can be one of `alert`, `beforeunload`, `confirm` or `prompt`.

##### Usage

```js
await dialog.type()
```

##### Example

```js title="dialogType.js"
const type = await dialog.type();
```

##### Returns

- **&lt;string&gt;**
            **<code><var>returns</var></code>:**   The type of the dialog    

