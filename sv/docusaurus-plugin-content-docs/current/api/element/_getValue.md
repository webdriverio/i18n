---
id: getValue
title: getValue
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/getValue.ts
---

Hämta värdet av en `<textarea>`, `<select>` eller text `<input>` som hittas av angiven väljare.
Om flera element hittas via den angivna väljaren, returneras en array med värden istället.
För input med checkbox eller radio-typ, använd isSelected.

##### Användning

```js
$(selector).getValue()
```

##### Exempel

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

##### Returnerar

- **&lt;String&gt;**
            **<code><var>return</var></code>:**   begärt element(s) värde