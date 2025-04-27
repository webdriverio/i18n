---
id: parentElement
title: parentElement
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/parentElement.ts
---

தேர்ந்தெடுக்கப்பட்ட DOM-உறுப்பின் பெற்றோர் உறுப்பை திருப்பித் தருகிறது.

##### பயன்பாடு

```js
$(selector).parentElement()
```

##### எடுத்துக்காட்டுகள்

```html title="index.html"
<div class="parent">
    <p>Sibling One</p>
    <p>Sibling Two</p>
    <p>Sibling Three</p>
</div>
```

```js title="parentElement.js"
it('should get class from parent element', async () => {
    const elem = await $$('p');
    const parent = await elem[2].parentElement()
    console.log(await parent.getAttribute('class')); // outputs: "parent"
});
```

##### திருப்பி அனுப்புகிறது

- **&lt;WebdriverIO.Element&gt;**