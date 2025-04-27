---
id: waitForClickable
title: waitForClickable
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/waitForClickable.ts
---

Attendre qu'un élément soit cliquable ou non cliquable pendant le nombre de millisecondes fourni.

:::info

Contrairement à d'autres commandes d'élément, WebdriverIO n'attendra pas que l'élément existe pour exécuter
cette commande.

:::

##### Utilisation

```js
$(selector).waitForClickable({ timeout, reverse, timeoutMsg, interval })
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
      <td>options waitForEnabled (optionnel)</td>
    </tr>
    <tr>
      <td><code><var>options.timeout</var></code><br /><span className="label labelWarning">optionnel</span></td>
      <td>`Number`</td>
      <td>temps en ms (valeur par défaut basée sur la configuration [`waitforTimeout`](/docs/configuration#waitfortimeout))</td>
    </tr>
    <tr>
      <td><code><var>options.reverse</var></code><br /><span className="label labelWarning">optionnel</span></td>
      <td>`Boolean`</td>
      <td>si vrai, attend l'opposé (par défaut: false)</td>
    </tr>
    <tr>
      <td><code><var>options.timeoutMsg</var></code><br /><span className="label labelWarning">optionnel</span></td>
      <td>`String`</td>
      <td>s'il existe, il remplace le message d'erreur par défaut</td>
    </tr>
    <tr>
      <td><code><var>options.interval</var></code><br /><span className="label labelWarning">optionnel</span></td>
      <td>`Number`</td>
      <td>intervalle entre les vérifications (par défaut: `waitforInterval`)</td>
    </tr>
  </tbody>
</table>

##### Exemple

```js title="waitForClickable.js"
it('should detect when element is clickable', async () => {
    const elem = await $('#elem')
    await elem.waitForClickable({ timeout: 3000 });
});
it('should detect when element is no longer clickable', async () => {
    const elem = await $('#elem')
    await elem.waitForClickable({ reverse: true });
});
```

##### Retours

- **&lt;Boolean&gt;**
            **<code><var>return</var></code>:**  `true` si l'élément est cliquable (ou ne l'est pas si le drapeau est défini)