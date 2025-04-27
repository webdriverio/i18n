---
id: type
title: type
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/dialog/type.ts
---

Retorna o tipo do diálogo, pode ser um dos seguintes: `alert`, `beforeunload`, `confirm` ou `prompt`.

##### Uso

```js
await dialog.type()
```

##### Exemplo

```js title="dialogType.js"
const type = await dialog.type();
```

##### Retorna

- **&lt;string&gt;**
            **<code><var>returns</var></code>:**   O tipo do diálogo