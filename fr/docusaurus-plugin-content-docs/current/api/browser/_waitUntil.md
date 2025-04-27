---
id: waitUntil
title: waitUntil
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/waitUntil.ts
---

Cette commande d'attente est votre arme universelle si vous souhaitez attendre quelque chose. Elle attend une condition
et patiente jusqu'à ce que cette condition soit remplie avec une valeur véridique à retourner.

Un exemple courant est d'attendre qu'un certain élément contienne un certain texte (voir exemple).

##### Utilisation

```js
browser.waitUntil(condition, { timeout, timeoutMsg, interval })
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
      <td><code><var>condition</var></code></td>
      <td>`Function`</td>
      <td>condition à attendre jusqu'à ce qu'elle renvoie une valeur véridique</td>
    </tr>
    <tr>
      <td><code><var>options</var></code><br /><span className="label labelWarning">optionnel</span></td>
      <td>`WaitUntilOptions`</td>
      <td>options de commande</td>
    </tr>
    <tr>
      <td><code><var>options.timeout</var></code><br /><span className="label labelWarning">optionnel</span></td>
      <td>`Number`</td>
      <td>temps en ms (valeur par défaut basée sur la valeur de configuration [`waitforTimeout`](/docs/configuration#waitfortimeout))</td>
    </tr>
    <tr>
      <td><code><var>options.timeoutMsg</var></code><br /><span className="label labelWarning">optionnel</span></td>
      <td>`String`</td>
      <td>message d'erreur à lancer lorsque waitUntil expire</td>
    </tr>
    <tr>
      <td><code><var>options.interval</var></code><br /><span className="label labelWarning">optionnel</span></td>
      <td>`Number`</td>
      <td>intervalle entre les vérifications de condition (valeur par défaut basée sur la valeur de configuration [`waitforInterval`](/docs/configuration#waitforinterval))</td>
    </tr>
  </tbody>
</table>

##### Exemples

```html reference title="index.html" useHTTPS
https://github.com/webdriverio/example-recipes/blob/0bfb2b8d212b627a2659b10f4449184b657e1d59/waitUntil/index.html#L3-L8
```

```js reference title="waitUntilExample.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/0c9252b0a4f7e18a34cece74e5798c1fe464c120/waitUntil/waitUntilExample.js#L16-L24
```

##### Retourne

- **&lt;Boolean&gt;**
            **<code><var>return</var></code>:**  vrai si la condition est remplie