---
id: defaultValue
title: デフォルト値
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/dialog/defaultValue.ts
---

ダイアログがプロンプトの場合、デフォルトのプロンプト値を返します。それ以外の場合は、空の文字列を返します。

##### 使用法

```js
await dialog.defaultValue()
```

##### 例

```js title="dialogDefaultValue.js"
const value = await dialog.defaultValue();
```