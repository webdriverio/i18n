---
id: isClickable
title: isClickable
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/isClickable.ts
---

Un élément est considéré comme cliquable lorsque les conditions suivantes sont remplies :

- l'élément existe
- l'élément est affiché
- l'élément n'est pas désactivé
- l'élément est dans la zone visible
- l'élément peut être défilé dans la zone visible
- le centre de l'élément n'est pas chevauché par un autre élément

sinon retourne false.

:::info

Veuillez noter que `isClickable` fonctionne uniquement dans les navigateurs web et dans les webviews mobiles,
il ne fonctionne pas dans le contexte natif des applications mobiles. De plus, contrairement aux autres commandes d'éléments,
WebdriverIO n'attendra pas que l'élément existe pour exécuter cette commande.

:::

##### Usage

```js
$(selector).isClickable()
```

##### Example

```js title="isClickable.js"
it('should detect if an element is clickable', async () => {
    const el = await $('#el')
    let clickable = await el.isClickable();
    console.log(clickable); // outputs: true or false

    // wait for element to be clickable
    await browser.waitUntil(() => el.isClickable())
});
```

##### Returns

- **&lt;Boolean&gt;**
            **<code><var>return</var></code>:**             true si l'élément est cliquable