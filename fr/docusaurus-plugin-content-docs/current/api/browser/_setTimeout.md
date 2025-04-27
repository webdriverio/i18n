---
id: setTimeout
title: setTimeout
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/setTimeout.ts
---

Définit les délais d'attente associés à la session en cours, les durées de délai d'attente contrôlent des
comportements tels que les délais d'attente pour l'injection de scripts, la navigation dans les documents et la récupération d'éléments.
Pour plus d'informations et d'exemples, consultez le [guide des délais d'attente](https://webdriver.io/docs/timeouts#selenium-timeouts).

:::info

Il n'est pas recommandé de définir des délais d'attente `implicit` car ils affectent le comportement de WebdriverIO
et peuvent provoquer des erreurs dans certaines commandes, par exemple `waitForExist` avec l'option reverse.

:::

##### Usage

```js
browser.setTimeout({ implicit, pageLoad, script })
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
      <td><code><var>timeouts</var></code></td>
      <td>`Timeouts`</td>
      <td>Objet contenant les valeurs de délai d'attente de session</td>
    </tr>
    <tr>
      <td><code><var>timeouts.implicit</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`Number`</td>
      <td>Temps en millisecondes pour réessayer la stratégie de localisation d'éléments lors de la recherche d'un élément.</td>
    </tr>
    <tr>
      <td><code><var>timeouts.pageLoad</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`Number`</td>
      <td>Temps en millisecondes à attendre pour que le document termine son chargement.</td>
    </tr>
    <tr>
      <td><code><var>timeouts.script</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`Number`</td>
      <td>Les scripts injectés avec [`execute`](https://webdriver.io/docs/api/browser/execute) ou [`executeAsync`](https://webdriver.io/docs/api/browser/executeAsync) s'exécuteront jusqu'à ce qu'ils atteignent la durée du délai d'attente de script, qui est également donnée en millisecondes.</td>
    </tr>
  </tbody>
</table>

##### Example

```js title="setTimeout.js"
it('should change timeout duration for session with long code duration', async () => {
    await browser.setTimeout({
        'pageLoad': 10000,
        'script': 60000
    });
    // Execute code which takes a long time
    await browser.executeAsync((done) => {
        console.log('Wake me up before you go!');
        setTimeout(done, 59000);
    });
});
```