---
id: executeAsync
title: executeAsync
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/executeAsync.ts
---

:::warning
La commande `executeAsync` est dépréciée et sera supprimée dans une version future.
Veuillez utiliser la commande `execute` à la place car elle offre un meilleur support pour
la gestion des erreurs via `async`/`await`.
:::

Injecte un extrait de JavaScript dans la page pour l'exécution dans le contexte du cadre actuellement 
sélectionné en utilisant l'élément donné comme portée. Comme c'est dans la portée de l'élément, WebdriverIO 
attendra automatiquement que l'élément existe avant d'exécuter le script.
Le script exécuté est supposé être asynchrone et doit signaler qu'il est terminé en invoquant
le callback fourni, qui est toujours fourni comme dernier argument de la fonction. La valeur
passée à ce callback sera retournée au client.

Les commandes de script asynchrones ne peuvent pas s'étendre sur plusieurs chargements de page. Si un événement de 
déchargement est déclenché pendant l'attente du résultat d'un script, une erreur sera renvoyée au client.

L'argument script définit le script à exécuter sous forme de corps de fonction. La fonction sera
invoquée avec le tableau d'arguments fourni et les valeurs peuvent être accessibles via l'objet arguments
dans l'ordre spécifié. Le dernier argument sera toujours une fonction de callback qui doit être invoquée
pour signaler que le script est terminé.

Les arguments peuvent être n'importe quelle primitive JSON, tableau ou objet JSON. Les objets JSON qui définissent une référence 
WebElement seront convertis en l'élément DOM correspondant. De même, tous les WebElements dans le résultat 
du script seront renvoyés au client sous forme d'objets JSON WebElement.

:::caution

Veuillez utiliser `execute` à la place
:::

##### Utilisation

```js
$(selector).executeAsync(script, arguments)
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

```js title="executeAsync.js"
it('should wait for the element to exist, then executes async javascript on the page with the element as first argument', async () => {
    await browser.setTimeout({ script: 5000 })
    const text = await $('div').execute((elem, a, b, c, d) => {
        // browser context - you may not access client or console
        setTimeout(() => {
            done(elem.textContent + a + b + c + d)
        }, 3000);
    }, 1, 2, 3, 4);
    // node.js context - client and console are available
    // node.js context - client and console are available
    console.log(text); // outputs "Hello World1234"
});
```

##### Retourne

- **&lt;*&gt;**
            **<code><var>return</var></code>:**              Le résultat du script.