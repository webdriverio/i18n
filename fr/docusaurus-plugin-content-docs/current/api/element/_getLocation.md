---
id: getLocation
title: getLocation
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/getLocation.ts
---

Déterminer l'emplacement d'un élément sur la page. Le point (0, 0) fait référence au
coin supérieur gauche de la page.

##### Utilisation

```js
$(selector).getLocation(prop)
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
      <td><code><var>prop</var></code></td>
      <td>`string`</td>
      <td>peut être "x" ou "y" pour obtenir directement une valeur de résultat pour des assertions plus faciles</td>
    </tr>
  </tbody>
</table>

##### Exemple

```js title="getLocation.js"
it('should demonstrate the getLocation function', async () => {
    await browser.url('http://github.com');
    const logo = await $('.octicon-mark-github')
    const location = await logo.getLocation();
    console.log(location); // outputs: { x: 150, y: 20 }

    const xLocation = await logo.getLocation('x')
    console.log(xLocation); // outputs: 150

    const yLocation = await logo.getLocation('y')
    console.log(yLocation); // outputs: 20
});
```

##### Retourne

- **&lt;Object|Number&gt;**
            **<code><var>return</var></code>:**   Les coordonnées X et Y de l'élément sur la page `{x:number, y:number}`