---
id: previousElement
title: முந்தைய தனிமம்
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/previousElement.ts
---

தேர்ந்தெடுக்கப்பட்ட DOM-தனிமத்தின் முந்தைய சகோதர தனிமத்தை திருப்பித் தருகிறது.

##### பயன்பாடு

```js
$(selector).previousElement()
```

##### எடுத்துக்காட்டுகள்

```html title="index.html"
<div class="parent">
    <p>Sibling One</p>
    <p>Sibling Two</p>
    <p>Sibling Three</p>
</div>
```

```js title="previousElement.js"
it('should get text from previous sibling element', async () => {
    const elem = await $$('p');
    const previousElem = await elem[1].previousElement()
    console.log(await previousElem.getText()); // outputs: "Sibling One"
});
```

##### திரும்பப் பெறுபவை

- **&lt;WebdriverIO.Element&gt;**