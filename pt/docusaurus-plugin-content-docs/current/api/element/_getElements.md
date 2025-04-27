---
id: getElements
title: getElements
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/getElements.ts
---

Acessa propriedades do `WebdriverIO.ElementArray` como `length` ou `selector` a partir da referência de elementos.

##### Uso

```js
$(selector).getElements()
```

##### Exemplo

```ts title="getElements.ts"
it('should allow me to inspect WebdriverIO.Element properties', async () => {
    const divs = await $$('div').getElements();
    console.log(divs.length); // outputs: 43
});
```

##### Retorna

- **&lt;WebdriverIO.ElementArray&gt;**