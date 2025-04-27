---
id: getElement
title: getElement
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/getElement.ts
---

Acessa propriedades do `WebdriverIO.Element` como `selector` ou `elementId` a partir da referência do elemento.

##### Uso

```js
$(selector).getElement()
```

##### Exemplo

```ts title="getElement.ts"
it('should allow me to inspect WebdriverIO.Element properties', async () => {
    const elem = await $('#elem').getElement();
    console.log(elem.selector); // outputs: '#elem'
});
```

##### Retorna

- **&lt;WebdriverIO.Element&gt;**