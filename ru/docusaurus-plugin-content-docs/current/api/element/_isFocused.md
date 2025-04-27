---
id: isFocused
title: isFocused
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/isFocused.ts
---

Возвращает true или false, если выбранный DOM-элемент в настоящее время находится в фокусе. Если селектор соответствует 
нескольким элементам, он вернет true, если один из элементов находится в фокусе.

##### Usage

```js
$(selector).isFocused()
```

##### Examples

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

##### Returns

- **&lt;Boolean&gt;**
            **<code><var>return</var></code>:**          true если один из соответствующих элементов находится в фокусе