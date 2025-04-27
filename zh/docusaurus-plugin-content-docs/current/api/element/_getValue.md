---
id: getValue
title: 获取值
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/getValue.ts
---

获取通过给定选择器找到的 `<textarea>`、`<select>` 或文本 `<input>` 的值。
如果通过给定选择器找到多个元素，则返回值数组。
对于带有checkbox或radio类型的输入，请使用isSelected。

##### 用法

```js
$(selector).getValue()
```

##### 示例

```html title="index.html"
<input type="text" value="John Doe" id="username">
```

```js title="getValue.js"
it('should demonstrate the getValue command', async () => {
    const inputUser = await $('#username');
    const value = await inputUser.getValue();
    console.log(value); // outputs: "John Doe"
});
```

##### 返回值

- **&lt;String&gt;**
            **<code><var>return</var></code>:**   请求元素的值    