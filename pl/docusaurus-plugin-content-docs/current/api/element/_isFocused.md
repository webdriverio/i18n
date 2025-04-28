---
id: isFocused
title: isFocused
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/isFocused.ts
---

Zwraca wartość prawda lub fałsz, jeśli wybrany element DOM jest obecnie aktywny (ma fokus). Jeśli selektor pasuje do wielu elementów, zwróci prawdę, jeśli jeden z elementów ma fokus.

##### Użycie

```js
$(selector).isFocused()
```

##### Przykłady

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

##### Zwraca

- **&lt;Boolean&gt;**
            **<code><var>return</var></code>:**          true jeśli jeden z pasujących elementów ma fokus