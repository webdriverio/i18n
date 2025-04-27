---
id: type
title: 类型
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/dialog/type.ts
---

返回对话框的类型，可以是 `alert`、`beforeunload`、`confirm` 或 `prompt` 之一。

##### 用法

```js
await dialog.type()
```

##### 示例

```js title="dialogType.js"
const type = await dialog.type();
```

##### 返回值

- **&lt;string&gt;**
            **<code><var>returns</var></code>:**   对话框的类型    