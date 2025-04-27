---
id: nextElement
title: nextElement
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/nextElement.ts
---

Devuelve el elemento hermano siguiente del elemento DOM seleccionado.

##### Uso

```js
$(selector).nextElement()
```

##### Ejemplos

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

##### Retorna

- **&lt;WebdriverIO.Element&gt;**