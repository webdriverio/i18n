---
id: previousElement
title: previousElement
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/previousElement.ts
---

Zwraca poprzedni element rodzeństwa wybranego elementu DOM.

##### Użycie

```js
$(selector).previousElement()
```

##### Przykłady

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

##### Zwraca

- **&lt;WebdriverIO.Element&gt;**