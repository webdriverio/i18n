---
id: isFocused
title: isFocused
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/isFocused.ts
---

Retorna verdadero o falso si el elemento DOM seleccionado actualmente tiene foco. Si el selector coincide con
múltiples elementos, devolverá verdadero si uno de los elementos tiene foco.

##### Uso

```js
$(selector).isFocused()
```

##### Ejemplos

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
            **<code><var>return</var></code>:**          verdadero si uno de los elementos coincidentes tiene foco