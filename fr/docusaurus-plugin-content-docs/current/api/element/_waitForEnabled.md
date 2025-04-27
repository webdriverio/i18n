---
id: waitForEnabled
title: waitForEnabled
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/waitForEnabled.ts
---

Attendre qu'un élément (sélectionné par sélecteur CSS) soit (dés/act)ivé pendant le nombre de
millisecondes fourni. Si plusieurs éléments sont interrogés par le sélecteur donné,
il renvoie vrai si au moins un élément est (dés/act)ivé.

:::info

Contrairement aux autres commandes d'éléments, WebdriverIO n'attendra pas que l'élément
existe pour exécuter cette commande.

:::

##### Utilisation

```js
$(selector).waitForEnabled({ timeout, reverse, timeoutMsg, interval })
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
      <td>si vrai, il attend l'opposé (par défaut: false)</td>
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

##### Exemples

```html title="index.html"
<input type="text" id="username" value="foobar" disabled="disabled"></input>
<script type="text/javascript">
    setTimeout(() => {
        document.getElementById('username').disabled = false
    }, 2000);
</script>
```

```js title="waitForEnabledExample.js"
it('should detect when element is enabled', async () => {
    await $('#username').waitForEnabled({ timeout: 3000 });
});

it('should detect when element is disabled', async () => {
    elem = await $('#username');
    await elem.waitForEnabled({ reverse: true })
});
```

##### Retourne

- **&lt;Boolean&gt;**
            **<code><var>return</var></code>:**  true     si l'élément est (dés/act)ivé