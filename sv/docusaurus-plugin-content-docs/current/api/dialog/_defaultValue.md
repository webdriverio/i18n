---
id: defaultValue
title: standardvärde
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/dialog/defaultValue.ts
---

Om dialogen är en prompt, returnerar standardvärdet för prompten. Annars returneras en tom sträng.

##### Användning

```js
await dialog.defaultValue()
```

##### Exempel

```js title="dialogDefaultValue.js"
const value = await dialog.defaultValue();
```