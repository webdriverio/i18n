---
id: isFocused
title: isFocused
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/isFocused.ts
---

返回所选DOM元素当前是否具有焦点（true或false）。如果选择器匹配多个元素，只要其中一个元素有焦点，就会返回true。

##### 用法

```js
$(selector).isFocused()
```

##### 示例

```html title="index.html"
<input name="login" autofocus="" />
```

```js title="hasFocus.js"
it('should detect the focus of an element', async () => {
    await browser.url('/');
    const loginInput = await $('[name="login"]');
    console.log(await loginInput.isFocused()); // outputs: false

    await loginInput.click();
    console.log(await loginInput.isFocused()); // outputs: true
})
```

##### 返回值

- **&lt;Boolean&gt;**
            **<code><var>return</var></code>:**          如果匹配元素中有一个具有焦点则返回true