---
id: redirect
title: redirect
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/mock/redirect.ts
---

Configure une redirection pour un mock donné. Cela vous permet de rediriger une requête vers une autre URL.
Remarque : ces redirections s'appliquent uniquement aux requêtes effectuées par un script dans le navigateur, et non lors de l'appel à la commande `url`.

##### Utilisation

```js
mock.redirect(url)
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
      <td><code><var>url</var></code></td>
      <td>`string`</td>
      <td>ressource cible vers laquelle rediriger les requêtes</td>
    </tr>
  </tbody>
</table>

##### Exemple

```js title="respond.js"
it('redirects all my API request to my staging server', async () => {
    const mock = await browser.mock('https://application.com/api/*')
    mock.redirect('https://staging.application.com/api/*')

    // is the same as
    mock.request({ url: 'https://staging.application.com/api/*' })

    // ...
})
```