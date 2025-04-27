---
id: selenium
title: Selenium Standalone
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-protocols/src/protocols/selenium.ts
---
## file
Télécharger un fichier sur la machine distante sur laquelle le navigateur s'exécute.<br /><br />Commande Selenium Standalone. Plus de détails peuvent être trouvés dans la [documentation officielle du protocole](https://www.seleniumhq.org/).



##### Usage

```js
browser.file(file)
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
      <td><code><var>file</var></code></td>
      <td>string</td>
      <td>Archive zip encodée en base64 contenant __un seul__ fichier à télécharger. Si les données encodées en base64 ne représentent pas une archive zip ou si l'archive contient plus d'un fichier, une erreur inconnue sera générée.</td>
    </tr>
  </tbody>
</table>


##### Returns

- **&lt;String&gt;**
            **<code><var>path</var></code>:** Chemin absolu du fichier téléchargé sur la machine distante.    


---
## getDownloadableFiles
Liste les fichiers de la machine distante disponibles pour téléchargement.<br /><br />Commande Selenium Standalone. Plus de détails peuvent être trouvés dans la [documentation officielle du protocole](https://www.seleniumhq.org/).



##### Usage

```js
browser.getDownloadableFiles()
```




##### Returns

- **&lt;Object&gt;**
            **<code><var>names</var></code>:** Objet contenant une liste de fichiers téléchargeables sur la machine distante.    


---
## download
Télécharger un fichier depuis la machine distante sur laquelle le navigateur s'exécute.<br /><br />Commande Selenium Standalone. Plus de détails peuvent être trouvés dans la [documentation officielle du protocole](https://www.seleniumhq.org/).



##### Usage

```js
browser.download(name)
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
      <td><code><var>name</var></code></td>
      <td>string</td>
      <td>Nom du fichier à télécharger</td>
    </tr>
  </tbody>
</table>


##### Returns

- **&lt;Object&gt;**
            **<code><var>data</var></code>:** Objet contenant le nom du fichier téléchargé et son contenu    


---
## deleteDownloadableFiles
Supprimer tous les fichiers téléchargeables de la machine distante sur laquelle le navigateur s'exécute.<br /><br />Commande Selenium Standalone. Plus de détails peuvent être trouvés dans la [documentation officielle du protocole](https://www.seleniumhq.org/).



##### Usage

```js
browser.deleteDownloadableFiles()
```







---
## getHubConfig
Recevoir la configuration du hub à distance.<br /><br />Commande Selenium Standalone. Plus de détails peuvent être trouvés dans la [documentation officielle du protocole](https://github.com/nicegraham/selenium-grid2-api#gridapihub).



##### Usage

```js
browser.getHubConfig()
```




##### Returns

- **&lt;Object&gt;**
            **<code><var>config</var></code>:** Renvoie la configuration du hub avec le nombre d'emplacements, les délais d'attente et d'autres informations.    


---
## gridTestSession
Obtenir les détails du nœud Selenium Grid exécutant une session.<br /><br />Commande Selenium Standalone. Plus de détails peuvent être trouvés dans la [documentation officielle du protocole](https://github.com/nicegraham/selenium-grid2-api#gridapitestsession).



##### Usage

```js
browser.gridTestSession(session)
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
      <td><code><var>session</var></code></td>
      <td>String</td>
      <td>L'identifiant de la session pour laquelle recevoir les détails du hub.</td>
    </tr>
  </tbody>
</table>


##### Returns

- **&lt;Object&gt;**
            **<code><var>details</var></code>:** Objet contenant des informations sur les détails de la session.    


---
## gridProxyDetails
Obtenir les détails du proxy.<br /><br />Commande Selenium Standalone. Plus de détails peuvent être trouvés dans la [documentation officielle du protocole](https://github.com/nicegraham/selenium-grid2-api#gridapiproxy).



##### Usage

```js
browser.gridProxyDetails(id)
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
      <td><code><var>id</var></code></td>
      <td>string</td>
      <td>l'identifiant du proxy (peut être reçu en utilisant la commande gridTestSession).</td>
    </tr>
  </tbody>
</table>


##### Returns

- **&lt;Object&gt;**
            **<code><var>details</var></code>:** Objet contenant des informations sur le proxy.    


---
## manageSeleniumHubLifecycle
Gérer le cycle de vie du nœud hub.<br /><br />Commande Selenium Standalone. Plus de détails peuvent être trouvés dans la [documentation officielle du protocole](https://github.com/nicegraham/selenium-grid2-api#lifecycle-manager).



##### Usage

```js
browser.manageSeleniumHubLifecycle(action)
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
      <td><code><var>action</var></code></td>
      <td>String</td>
      <td>Commande à appeler sur Selenium Hub. La seule action implémentée est 'shutdown' pour arrêter le hub.</td>
    </tr>
  </tbody>
</table>





---
## queryGrid
Envoyer des requêtes GraphQL au serveur Selenium (hub ou nœud) pour récupérer des données. (Uniquement pris en charge avec Selenium v4 Server)<br /><br />Commande Selenium Standalone. Plus de détails peuvent être trouvés dans la [documentation officielle du protocole](https://www.selenium.dev/documentation/grid/advanced_features/graphql_support/).



##### Usage

```js
browser.queryGrid(query)
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
      <td><code><var>query</var></code></td>
      <td>string</td>
      <td>Une requête GraphQL à envoyer au serveur.</td>
    </tr>
  </tbody>
</table>

##### Example


```js
const result = await browser.queryGrid('{ nodesInfo { nodes { status, uri } } }');
console.log(JSON.stringify(result, null, 4))
/**
 * outputs:
 * {
 *   "data": {
 *     "nodesInfo": {
 *       "nodes": [{
 *         "status": "UP",
 *         "uri": "http://192.168.0.39:4444"
 *       }]
 *     }
 *   }
 * }
 */
```


##### Returns

- **&lt;Object&gt;**
            **<code><var>data</var></code>:** Résultat de la requête GraphQL.    