---
id: getElement
title: getElement
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/getElement.ts
---

Accede a las propiedades de `WebdriverIO.Element` como `selector` o `elementId` desde la referencia del elemento.

##### Uso

```js
$(selector).getElement()
```

##### Ejemplo

```ts title="getElement.ts"
it('should allow me to inspect WebdriverIO.Element properties', async () => {
    const elem = await $('#elem').getElement();
    console.log(elem.selector); // outputs: '#elem'
});
```

##### Retorna

- **&lt;WebdriverIO.Element&gt;**