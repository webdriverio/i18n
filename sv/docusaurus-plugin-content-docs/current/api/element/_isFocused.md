---
id: isFocused
title: isFocused
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/isFocused.ts
---

Returnerar sant eller falskt om det valda DOM-elementet för närvarande har fokus. Om selektorn 
matchar flera element kommer den att returnera sant om ett av elementen har fokus.

##### Användning

```js
$(selector).isFocused()
```

##### Exempel

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

##### Returnerar

- **&lt;Boolean&gt;**
            **<code><var>return</var></code>:**          true om ett av de matchande elementen har fokus