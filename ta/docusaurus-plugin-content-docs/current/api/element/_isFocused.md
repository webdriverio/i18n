---
id: isFocused
title: isFocused
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/isFocused.ts
---

தேர்ந்தெடுக்கப்பட்ட DOM-எலிமென்ட் தற்போது கவனத்தில் உள்ளதா என்பதற்கு உண்மை அல்லது பொய் என்று திரும்பிக் கொடுக்கிறது. செலக்டர் பல எலிமென்ட்களுடன் பொருந்தினால், எலிமென்ட்களில் ஒன்று கவனத்தில் இருந்தால் அது உண்மை என்று திரும்பிக் கொடுக்கும்.

##### பயன்பாடு

```js
$(selector).isFocused()
```

##### எடுத்துக்காட்டுகள்

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

##### திரும்பப் பெறுபவை

- **&lt;Boolean&gt;**
            **<code><var>return</var></code>:**          பொருந்தும் எலிமென்ட்களில் ஒன்று கவனத்தில் இருந்தால் உண்மை