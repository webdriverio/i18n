---
id: isFocused
title: isFocused
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/isFocused.ts
---

Retorna verdadeiro ou falso se o elemento DOM selecionado atualmente tem foco. Se o seletor corresponder a
múltiplos elementos, retornará verdadeiro se um dos elementos tiver foco.

##### Uso

```js
$(selector).isFocused()
```

##### Exemplos

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

##### Retorna

- **&lt;Boolean&gt;**
            **<code><var>return</var></code>:**          verdadeiro se um dos elementos correspondentes tiver foco