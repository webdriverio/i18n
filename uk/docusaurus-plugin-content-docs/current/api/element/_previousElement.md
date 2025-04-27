---
id: previousElement
title: попередній Елемент
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/previousElement.ts
---

Повертає попередній споріднений елемент вибраного DOM-елемента.

##### Використання

```js
$(selector).previousElement()
```

##### Приклади

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

##### Повертає

- **&lt;WebdriverIO.Element&gt;**