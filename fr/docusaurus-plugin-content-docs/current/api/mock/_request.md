---
id: request
title: request
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/mock/request.ts
---

Permet de modifier les requêtes que le navigateur effectue pendant la session. Cela peut être utile pour les cas d'utilisation suivants :

- valider si votre application envoie des charges utiles de requêtes correctes
- transmettre des en-têtes d'autorisation pour tester des ressources protégées
- définir des cookies de session pour tester l'authentification des utilisateurs
- modifier des requêtes pour tester des cas limites

##### Utilisation

```js
mock.request({ header, cookies, method, url, header, statusCode, fetchResponse })
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
      <td><code><var>overwrites</var></code></td>
      <td>`MockOverwrite`</td>
      <td>charge utile pour remplacer la réponse</td>
    </tr>
    <tr>
      <td><code><var>overwrites.header</var></code></td>
      <td>`Record<string,string>`</td>
      <td>remplacer des en-têtes spécifiques</td>
    </tr>
    <tr>
      <td><code><var>overwrites.cookies</var></code></td>
      <td>`Record<string,string>`</td>
      <td>remplacer les cookies de requête</td>
    </tr>
    <tr>
      <td><code><var>overwrites.method</var></code></td>
      <td>`string`</td>
      <td>remplacer la méthode de requête</td>
    </tr>
    <tr>
      <td><code><var>overwrites.url</var></code></td>
      <td>`string`</td>
      <td>remplacer l'URL de requête pour initier une redirection</td>
    </tr>
    <tr>
      <td><code><var>params</var></code><br /><span className="label labelWarning">optionnel</span></td>
      <td>`MockResponseParams`</td>
      <td>paramètres de réponse supplémentaires à remplacer</td>
    </tr>
    <tr>
      <td><code><var>params.header</var></code><br /><span className="label labelWarning">optionnel</span></td>
      <td>`Object`</td>
      <td>remplacer des en-têtes spécifiques</td>
    </tr>
    <tr>
      <td><code><var>params.statusCode</var></code><br /><span className="label labelWarning">optionnel</span></td>
      <td>`Number`</td>
      <td>remplacer le code d'état de la réponse</td>
    </tr>
    <tr>
      <td><code><var>params.fetchResponse</var></code><br /><span className="label labelWarning">optionnel</span></td>
      <td>`Boolean`</td>
      <td>récupérer la réponse réelle avant de répondre avec des données simulées</td>
    </tr>
  </tbody>
</table>

##### Exemple

```js title="respond.js"
it('adds an auth header to my API requests', async () => {
    const mock = await browser.mock('https://application.com/api', {
        method: 'get'
    })

    mock.request({
        headers: { 'Authorization': 'Bearer token' }
    })

    await browser.url('https://application.com')
    // ...
})
```