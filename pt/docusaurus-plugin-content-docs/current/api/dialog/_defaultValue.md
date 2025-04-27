---
id: defaultValue
title: defaultValue
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/dialog/defaultValue.ts
---

Se o diálogo for de prompt, retorna o valor padrão do prompt. Caso contrário, retorna uma string vazia.

##### Uso

```js
await dialog.defaultValue()
```

##### Exemplo

```js title="dialogDefaultValue.js"
const value = await dialog.defaultValue();
```