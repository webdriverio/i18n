---
id: waitForDisplayed
title: waitForDisplayed
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/waitForDisplayed.ts
---

Attendre qu'un élément soit affiché ou non pendant le nombre de millisecondes fourni.

:::info

Contrairement à d'autres commandes d'élément, WebdriverIO n'attendra pas que l'élément existe pour exécuter
cette commande.

:::

##### Utilisation

```js
$(selector).waitForDisplayed({ timeout, reverse, timeoutMsg, interval, withinViewport })
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
      <td><code><var>options</var></code><br /><span className="label labelWarning">optionnel</span></td>
      <td>`WaitForOptions`</td>
      <td>options waitForDisplayed (optionnel)</td>
    </tr>
    <tr>
      <td><code><var>options.timeout</var></code><br /><span className="label labelWarning">optionnel</span></td>
      <td>`Number`</td>
      <td>temps en ms (par défaut basé sur la valeur de configuration [`waitforTimeout`](/docs/configuration#waitfortimeout))</td>
    </tr>
    <tr>
      <td><code><var>options.reverse</var></code><br /><span className="label labelWarning">optionnel</span></td>
      <td>`Boolean`</td>
      <td>si true, attend l'opposé (par défaut : false)</td>
    </tr>
    <tr>
      <td><code><var>options.timeoutMsg</var></code><br /><span className="label labelWarning">optionnel</span></td>
      <td>`String`</td>
      <td>s'il existe, il remplace le message d'erreur par défaut</td>
    </tr>
    <tr>
      <td><code><var>options.interval</var></code><br /><span className="label labelWarning">optionnel</span></td>
      <td>`Number`</td>
      <td>intervalle entre les vérifications (par défaut : `waitforInterval`)</td>
    </tr>
    <tr>
      <td><code><var>options.withinViewport</var></code><br /><span className="label labelWarning">optionnel</span></td>
      <td>`Boolean`</td>
      <td>définir sur `true` pour attendre que l'élément soit affiché dans le viewport (par défaut : `false`)</td>
    </tr>
  </tbody>
</table>

##### Exemples

```html reference title="index.html" useHTTPS
https://github.com/webdriverio/example-recipes/blob/0bfb2b8d212b627a2659b10f4449184b657e1d59/waitForDisplayed/index.html#L3-L8
```

```js reference title="waitForDisplayedExample.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/9ac16b4d4cf4bc8ec87f6369439a2d0bcaae4483/waitForDisplayed/waitForDisplayedExample.js#L6-L14
```

##### Retourne

- **&lt;Boolean&gt;**
            **<code><var>return</var></code>:**  true    si l'élément est affiché (ou ne l'est pas si le drapeau est défini)