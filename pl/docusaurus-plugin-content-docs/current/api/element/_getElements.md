---
id: getElements
title: getElements
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/getElements.ts
---

Dostęp do właściwości `WebdriverIO.ElementArray` takich jak `length` lub `selector` z referencji elementów.

##### Użycie

```js
$(selector).getElements()
```

##### Przykład

```ts title="getElements.ts"
it('should allow me to inspect WebdriverIO.Element properties', async () => {
    const divs = await $$('div').getElements();
    console.log(divs.length); // outputs: 43
});
```

##### Zwraca

- **&lt;WebdriverIO.ElementArray&gt;**