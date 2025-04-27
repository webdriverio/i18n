---
id: shadow$$
title: shadow$$
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/shadow$$.ts
---

Accéder aux éléments à l'intérieur du shadowRoot d'un élément donné. Si vous travaillez
avec beaucoup de shadow roots imbriqués, une approche alternative à `shadow$$`
est d'utiliser le [sélecteur deep](https://webdriver.io/docs/selectors#deep-selectors).

:::info

WebdriverIO traverse automatiquement les shadow roots lors de l'utilisation des commandes `$` ou `$$`.
Cette commande n'est nécessaire que si vous automatisez dans un environnement qui ne
prend pas encore en charge WebDriver Bidi, par exemple les tests web mobiles avec Appium.

:::

##### Utilisation

```js
$(selector).shadow$$(selector)
```

##### Paramètres

<table>
  <thead>
    <tr>
      <th>Nom</th><th>Type</th><th>Détails</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>selector</var></code></td>
      <td>`String, Function`</td>
      <td>sélecteur ou fonction JS pour récupérer un certain élément</td>
    </tr>
  </tbody>
</table>

##### Exemple

```js title="shadow$$.js"
it('should return elements inside a shadowRoot', async () => {
    const innerEl = await $('.input').shadow$$('#innerEl');
    console.log(await innerEl.getValue()); // outputs: 'test123'
});
```

##### Retourne

- **&lt;WebdriverIO.ElementArray&gt;**