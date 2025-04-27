---
id: defaultValue
title: defaultValue
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/dialog/defaultValue.ts
---

Si la boîte de dialogue est une invite, renvoie la valeur par défaut de l'invite. Sinon, renvoie une chaîne vide.

##### Utilisation

```js
await dialog.defaultValue()
```

##### Exemple

```js title="dialogDefaultValue.js"
const value = await dialog.defaultValue();
```