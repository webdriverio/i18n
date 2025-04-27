---
id: getElement
title: getElement
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/getElement.ts
---

Accède aux propriétés `WebdriverIO.Element` comme `selector` ou `elementId` à partir de la référence d'élément.

##### Utilisation

```js
$(selector).getElement()
```

##### Exemple

```ts title="getElement.ts"
it('should allow me to inspect WebdriverIO.Element properties', async () => {
    const elem = await $('#elem').getElement();
    console.log(elem.selector); // outputs: '#elem'
});
```

##### Retourne

- **&lt;WebdriverIO.Element&gt;**