---
id: waitForExist
title: waitForExist
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/waitForExist.ts
---

Attendre qu'un élément soit présent dans le DOM pendant le nombre de
millisecondes fourni. Renvoie vrai si le sélecteur
correspond à au moins un élément qui existe dans le DOM, sinon lance une
erreur. Si le drapeau reverse est vrai, la commande renverra plutôt vrai
si le sélecteur ne correspond à aucun élément.

:::info

Contrairement aux autres commandes d'élément, WebdriverIO n'attendra pas que
l'élément existe pour exécuter cette commande.

:::

##### Utilisation

```js
$(selector).waitForExist({ timeout, reverse, timeoutMsg, interval })
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
      <td>options de waitForEnabled (optionnel)</td>
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

```js title="waitForExistSyncExample.js"
it('should display a notification message after successful form submit', async () => {
    const form = await $('form');
    const notification = await $('.notification');
    await form.$(".send").click();
    await notification.waitForExist({ timeout: 5000 });
    expect(await notification.getText()).to.be.equal('Data transmitted successfully!')
});
it('should remove a message after successful form submit', async () => {
    const form = await $('form');
    const message = await $('.message');
    await form.$(".send").click();
    await message.waitForExist({ reverse: true });
});
```

##### Retourne

- **&lt;Boolean&gt;**
            **<code><var>return</var></code>:**  vrai     si l'élément existe (ou n'existe pas si le drapeau est défini)