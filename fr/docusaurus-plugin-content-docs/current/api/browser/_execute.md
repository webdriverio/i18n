---
id: execute
title: execute
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/execute.ts
---

Injecte un snippet de JavaScript dans la page pour l'exécution dans le contexte du cadre actuellement sélectionné.
Le script exécuté est supposé être synchrone et le résultat de l'évaluation du script est renvoyé au
client.

L'argument script définit le script à exécuter sous la forme d'un corps de fonction. La valeur renvoyée par
cette fonction sera retournée au client. La fonction sera invoquée avec le tableau args fourni
et les valeurs pourront être accessibles via l'objet arguments dans l'ordre spécifié.

Les arguments peuvent être n'importe quelle primitive JSON, tableau ou objet JSON. Les objets JSON qui définissent une référence WebElement
seront convertis en l'élément DOM correspondant. De même, tous les WebElements dans le résultat
du script seront renvoyés au client sous forme d'objets JSON WebElement.

##### Usage

```js
browser.execute(script, arguments)
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
      <td><code><var>script</var></code></td>
      <td>`String, Function`</td>
      <td>Le script à exécuter.</td>
    </tr>
    <tr>
      <td><code><var>arguments</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`*`</td>
      <td>arguments du script</td>
    </tr>
  </tbody>
</table>

##### Example

```js title="execute.js"
it('should inject javascript on the page', async () => {
    const result = await browser.execute((a, b, c, d) => {
        // browser context - you may not access client or console
        return a + b + c + d
    }, 1, 2, 3, 4)
    // node.js context - client and console are available
    console.log(result) // outputs: 10
});
```

##### Returns

- **&lt;*&gt;**
            **<code><var>return</var></code>:**              Le résultat du script.