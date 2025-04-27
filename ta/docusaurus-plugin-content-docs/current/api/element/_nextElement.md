---
id: nextElement
title: அடுத்த உறுப்பு
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/nextElement.ts
---

தேர்ந்தெடுக்கப்பட்ட DOM-உறுப்பின் அடுத்த உடன்பிறப்பு உறுப்பை திருப்பித் தருகிறது.

##### பயன்பாடு

```js
$(selector).nextElement()
```

##### உதாரணங்கள்

```html title="index.html"
<div class="parent">
    <p>Sibling One</p>
    <p>Sibling Two</p>
    <p>Sibling Three</p>
</div>
```

```js title="nextElement.js"
it('should get text from next sibling element', async () => {
    const elem = await $$('p');
    const nextElement = await elem[1].nextElement()
    console.log(await nextElement.getText()); // outputs: "Sibling Three"
});
```

##### திரும்பக் கிடைப்பவை

- **&lt;WebdriverIO.Element&gt;**