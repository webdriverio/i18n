---
id: getElements
title: getElements
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/getElements.ts
---

Accede a las propiedades de `WebdriverIO.ElementArray` como `length` o `selector` desde la referencia de elementos.

##### Uso

```js
$(selector).getElements()
```

##### Ejemplo

```ts title="getElements.ts"
it('should allow me to inspect WebdriverIO.Element properties', async () => {
    const divs = await $$('div').getElements();
    console.log(divs.length); // outputs: 43
});
```

##### Retorna

- **&lt;WebdriverIO.ElementArray&gt;**