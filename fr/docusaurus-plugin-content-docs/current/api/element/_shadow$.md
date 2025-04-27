---
id: shadow$
title: shadow$
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/shadow$.ts
---

Accéder à un élément dans le shadowRoot d'un élément donné. Si vous travaillez
avec beaucoup de shadow roots imbriqués, une approche alternative à `shadow$` est
d'utiliser le [sélecteur deep](https://webdriver.io/docs/selectors#deep-selectors).

:::info

WebdriverIO traverse automatiquement les shadow roots lors de l'utilisation des commandes `$` ou `$$`.
Cette commande n'est nécessaire que si vous automatisez dans un environnement qui ne
prend pas encore en charge WebDriver Bidi, par exemple pour les tests web mobiles avec Appium.

:::

##### Usage

```js
$(selector).shadow$(selector)
```

##### Parameters

<table>
  <thead>
    <tr>
      <th>Name</th><th>Type</th><th>Details</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>selector</var></code></td>
      <td>`String, Function`</td>
      <td>selector or JS Function to fetch a certain element</td>
    </tr>
  </tbody>
</table>

##### Example

```js title="shadow$$.js"
it('should return an element inside a shadowRoot', async () => {
    const innerEl = await $('custom-component').shadow$('#innerEl');
    console.log(await innerEl.getValue()); // outputs: 'test123'
});
```

##### Returns

- **&lt;WebdriverIO.Element&gt;**
    