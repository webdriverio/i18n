---
id: url
title: url
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/url.ts
---

La commande `url` charge une URL dans le navigateur. Si une baseUrl est spécifiée dans la configuration,
elle sera ajoutée comme préfixe au paramètre url en utilisant la méthode url.resolve() de Node. Appeler
`browser.url('...')` avec la même url que précédemment déclenchera un rechargement de la page. Cependant,
si l'url contient un hachage, le navigateur ne déclenchera pas une nouvelle navigation et l'utilisateur
devra [rafraîchir](/docs/api/webdriver#refresh) la page pour en déclencher une.

La commande renvoie un objet `WebdriverIO.Request` qui contient des informations sur les
données de requête et de réponse du chargement de la page :

```ts
interface WebdriverIO.Request {
  id?: string
  url: string
  timestamp: number
  navigation?: string
  redirectChain?: string[],
  headers: Record<string, string>
  cookies?: NetworkCookie[]
  \/**
   * Message d'erreur si la requête a échoué
   *\/
  error?: string
  response?: {
      fromCache: boolean
      headers: Record<string, string>
      mimeType: string
      status: number
  },
  /**
   * Liste de toutes les requêtes qui ont été faites en raison de la requête principale.
   * Remarque : la liste peut être incomplète et ne contient pas les requêtes qui ont été
   * faites après la fin de la commande.
   *
   * La propriété sera indéfinie si la requête n'est pas une requête de document
   * qui a été initiée par le navigateur.
   *\/
  children?: Request[]
}
```

La commande prend en charge les options suivantes :

### wait
L'état souhaité dans lequel la ressource demandée doit se trouver avant de terminer la commande.
Elle prend en charge les états suivants :

 - `none` : pas d'attente après la requête de page et la réception de la réponse
 - `interactive` : attendre jusqu'à ce que la page soit interactive
 - `complete` : attendre jusqu'à ce que l'arbre DOM de la page soit complètement chargé
 - `networkIdle` : attendre jusqu'à ce qu'il n'y ait plus de requêtes réseau en attente

### headers

En-têtes à envoyer avec la requête.

__Par défaut :__ `{}`

### auth

Identifiants d'authentification de base.
Remarque : cela écrasera l'en-tête `Authorization` existant s'il est fourni dans l'option `headers`.

### timeout

Si défini sur un nombre, la commande attendra le nombre spécifié de millisecondes pour que la page charge
toutes les réponses avant de retourner.

Remarque : pour que cela ait un impact, l'option `wait` doit être définie sur `networkIdle`.

__Par défaut :__ `5000`

##### Utilisation

```js
browser.url(url, { wait, timeout, onBeforeLoad, auth, headers })
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
      <td><code><var>url</var></code><br /><span className="label labelWarning">optionnel</span></td>
      <td>`string`</td>
      <td>l'URL vers laquelle naviguer</td>
    </tr>
    <tr>
      <td><code><var>options</var></code><br /><span className="label labelWarning">optionnel</span></td>
      <td>`UrlOptions`</td>
      <td>options de navigation</td>
    </tr>
    <tr>
      <td><code><var>options.wait</var></code><br /><span className="label labelWarning">optionnel</span></td>
      <td>`'none', 'interactive', 'networkIdle', 'complete'`</td>
      <td>L'état souhaité dans lequel la ressource demandée doit se trouver avant de terminer la commande. Par défaut : 'complete'</td>
    </tr>
    <tr>
      <td><code><var>options.timeout</var></code><br /><span className="label labelWarning">optionnel</span></td>
      <td>`number`</td>
      <td>Si défini sur un nombre, la commande attendra le nombre spécifié de millisecondes pour que la page charge
toutes les réponses avant de retourner. Par défaut : 5000</td>
    </tr>
    <tr>
      <td><code><var>options.onBeforeLoad</var></code><br /><span className="label labelWarning">optionnel</span></td>
      <td>`Function`</td>
      <td>Une fonction qui est appelée avant que votre page ait chargé toutes ses ressources. Elle vous permet de simuler facilement
l'environnement, par exemple en remplaçant les API Web que votre application utilise.</td>
    </tr>
    <tr>
      <td><code><var>options.auth</var></code><br /><span className="label labelWarning">optionnel</span></td>
      <td>`{user: string, pass: string}`</td>
      <td>identifiants d'authentification de base</td>
    </tr>
    <tr>
      <td><code><var>options.headers</var></code><br /><span className="label labelWarning">optionnel</span></td>
      <td>`Record<string, string>`</td>
      <td>en-têtes à envoyer avec la requête</td>
    </tr>
  </tbody>
</table>

##### Exemples

```js title="url.js"
// naviguer vers une nouvelle URL
const request = await browser.url('https://webdriver.io');
// afficher l'url
console.log(request.url); // affiche : "https://webdriver.io"
console.log(request.response?.status); // affiche : 200
console.log(request.response?.headers); // affiche : { 'content-type': 'text/html; charset=UTF-8' }

```

```js title="baseUrlResolutions.js"
// Avec une URL de base http://example.com/site, les paramètres d'url suivants se résolvent comme suit :
// En fournissant un schéma :
// https://webdriver.io
await browser.url('https://webdriver.io');

// Lorsqu'elle ne commence pas par une barre oblique, l'URL se résout par rapport à la baseUrl
// http://example.com/site/relative
await browser.url('relative');

// Lorsqu'elle commence par une barre oblique, l'URL se résout par rapport au chemin racine de la baseUrl
// http://example.com/rootRelative
await browser.url('/rootRelative');

```

```js title="basicAuth.js"
// naviguer vers une URL avec authentification de base
await browser.url('https://the-internet.herokuapp.com/basic_auth', {
    auth: {
        user
        pass
    }
});
await expect($('p=Congratulations! You must have the proper credentials.').toBeDisplayed();

```

```js title="onBeforeLoad.js"
// naviguer vers une URL et simuler l'API batterie
await browser.url('https://pazguille.github.io/demo-battery-api/', {
    onBeforeLoad (win) {
        // simuler la propriété "navigator.battery"
        // en renvoyant un objet de charge fictif
        win.navigator.getBattery = () => Promise.resolve({
            level: 0.5,
            charging: false,
            chargingTime: Infinity,
            dischargingTime: 3600, // secondes
        })
    }
})
// maintenant nous pouvons affirmer le texte réel - nous sommes chargés à 50%
await expect($('.battery-percentage')).toHaveText('50%')
// et a suffisamment de jus pour 1 heure
await expect($('.battery-remaining')).toHaveText('01:00)
```

##### Retourne

- **&lt;WebdriverIO.Request&gt;**
            **<code><var>returns</var></code>:**  un objet de requête du chargement de page avec des informations sur les données de requête et de réponse