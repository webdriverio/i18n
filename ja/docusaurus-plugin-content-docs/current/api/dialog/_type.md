---
id: type
title: タイプ
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/dialog/type.ts
---

ダイアログのタイプを返します。`alert`、`beforeunload`、`confirm`、または`prompt`のいずれかになります。

##### 使用方法

```js
await dialog.type()
```

##### 例

```js title="dialogType.js"
const type = await dialog.type();
```

##### 戻り値

- **&lt;string&gt;**
            **<code><var>returns</var></code>:**   ダイアログのタイプ    