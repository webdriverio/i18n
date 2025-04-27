---
id: type
title: type
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/dialog/type.ts
---

Повертає тип діалогу, може бути одним з `alert`, `beforeunload`, `confirm` або `prompt`.

##### Використання

```js
await dialog.type()
```

##### Приклад

```js title="dialogType.js"
const type = await dialog.type();
```

##### Повертає

- **&lt;string&gt;**
            **<code><var>returns</var></code>:**   Тип діалогу    