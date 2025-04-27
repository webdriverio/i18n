---
id: execute
title: execute
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/execute.ts
---

Injecte un extrait de JavaScript dans la page pour l'exécution dans le contexte du cadre actuellement sélectionné
en utilisant l'élément donné comme portée. Comme cette commande est dans la portée de l'élément, cela signifie que WebdriverIO
attendra automatiquement que l'élément existe avant d'exécuter le script.
Le script exécuté est supposé être synchrone et le résultat de l'évaluation du script est renvoyé au
client.

L'argument script définit le script à exécuter sous forme de corps de fonction. La valeur renvoyée par
cette fonction sera retournée au client. La fonction sera invoquée avec le tableau d'arguments fourni
et les valeurs peuvent être accessibles via l'objet arguments dans l'ordre spécifié.

Les arguments peuvent être n'importe quelle primitive JSON, tableau ou objet JSON. Les objets JSON qui définissent une référence
WebElement seront convertis en l'élément DOM correspondant. De même, tous les WebElements dans le résultat
du script seront renvoyés au client sous forme d'objets JSON WebElement.

##### Utilisation

```js
$(selector).execute(script, arguments)
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
      <td><code><var>script</var></code></td>
      <td>`String, Function`</td>
      <td>Le script à exécuter.</td>
    </tr>
    <tr>
      <td><code><var>arguments</var></code><br /><span className="label labelWarning">optionnel</span></td>
      <td>`*`</td>
      <td>arguments du script</td>
    </tr>
  </tbody>
</table>

##### Exemple

```js title="execute.js"
it('should wait for the element to exist, then executes javascript on the page with the element as first argument', async () => {
    const text = await $('div').execute((elem, a, b, c, d) => {
        return elem.textContent + a + b + c + d
    }, 1, 2, 3, 4);
    // node.js context - client and console are available
    console.log(text); // outputs "Hello World1234"
});
```

##### Retourne

- **&lt;*&gt;**
            **<code><var>return</var></code>:**              Le résultat du script.