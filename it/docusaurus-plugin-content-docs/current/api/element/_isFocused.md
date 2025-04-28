---
id: isFocused
title: isFocused
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/isFocused.ts
---

Restituisce true o false se l'elemento DOM selezionato ha attualmente il focus. Se il selettore corrisponde a più elementi, restituirà true se uno degli elementi ha il focus.

##### Utilizzo

```js
$(selector).isFocused()
```

##### Esempi

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

##### Restituisce

- **&lt;Boolean&gt;**
            **<code><var>return</var></code>:**          true se uno degli elementi corrispondenti ha il focus