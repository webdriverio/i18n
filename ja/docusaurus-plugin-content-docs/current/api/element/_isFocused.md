---
id: isFocused
title: isFocused
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/isFocused.ts
---

選択されたDOM要素が現在フォーカスされているかどうかをtrueまたはfalseで返します。セレクタが複数の要素に一致する場合、それらのうちの一つにフォーカスがあればtrueを返します。

##### 使用法

```js
$(selector).isFocused()
```

##### 例

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

##### 戻り値

- **&lt;Boolean&gt;**
            **<code><var>return</var></code>:**          一致する要素のいずれかにフォーカスがある場合はtrue