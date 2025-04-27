---
id: isFocused
title: isFocused
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/isFocused.ts
---

Renvoie vrai ou faux si l'élément DOM sélectionné a actuellement le focus. Si le sélecteur correspond à plusieurs éléments, il renverra vrai si l'un des éléments a le focus.

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
            **<code><var>return</var></code>:**          true si l'un des éléments correspondants a le focus