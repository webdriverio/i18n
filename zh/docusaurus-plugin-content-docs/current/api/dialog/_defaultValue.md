---
id: defaultValue
title: 默认值
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/dialog/defaultValue.ts
---

如果对话框是提示框，则返回默认提示值。否则，返回空字符串。

##### 用法

```js
await dialog.defaultValue()
```

##### 示例

```js title="dialogDefaultValue.js"
const value = await dialog.defaultValue();
```