---
id: parentElement
title: elementoPadre
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/parentElement.ts
---

Devuelve el elemento padre del elemento DOM seleccionado.

##### Uso

```js
$(selector).parentElement()
```

##### Ejemplos

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

##### Devuelve

- **&lt;WebdriverIO.Element&gt;**