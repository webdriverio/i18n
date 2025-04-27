---
id: type
title: тип
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/dialog/type.ts
---

Возвращает тип диалога, может быть одним из `alert`, `beforeunload`, `confirm` или `prompt`.

##### Использование

```js
await dialog.type()
```

##### Пример

```js title="dialogType.js"
const type = await dialog.type();
```

##### Возвращает

- **&lt;string&gt;**
            **<code><var>returns</var></code>:**   Тип диалога    