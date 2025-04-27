---
id: isExisting
title: isExisting
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/isExisting.ts
---

Renvoie true si l'élément existe dans le DOM.

:::info

Contrairement aux autres commandes d'élément, WebdriverIO n'attendra pas que l'élément
existe pour exécuter cette commande.

:::

##### Utilisation

```js
$(selector).isExisting()
```

##### Exemples

```html title="index.html"
<div id="notDisplayed" style="display: none"></div>
<div id="notVisible" style="visibility: hidden"></div>
<div id="notInViewport" style="position:absolute; left: 9999999"></div>
<div id="zeroOpacity" style="opacity: 0"></div>
```

```js title="isExisting.js"
it('should detect if elements are existing', async () => {
    let elem = await $('#someRandomNonExistingElement')
    let isExisting = await elem.isExisting()
    console.log(isExisting); // outputs: false

    elem = await $('#notDisplayed')
    isExisting = await elem.isExisting()
    console.log(isExisting); // outputs: true

    elem = await $('#notVisible')
    isExisting = await elem.isExisting()
    console.log(isExisting); // outputs: true

    elem = await $('#notInViewport')
    isExisting = await elem.isExisting()
    console.log(isExisting); // outputs: true

    elem = await $('#zeroOpacity')
    isExisting = await elem.isExisting()
    console.log(isExisting); // outputs: true
});
```

##### Retourne

- **&lt;Boolean&gt;**
            **<code><var>return</var></code>:**             true si l'élément/les éléments* existe(nt)