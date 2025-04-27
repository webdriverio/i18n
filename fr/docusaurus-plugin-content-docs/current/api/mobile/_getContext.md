---
id: getContext
title: getContext
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/mobile/getContext.ts
---

Récupère le contexte de la session actuelle.

Cette méthode améliore la commande Appium `context`/WebdriverIO `getContext` par défaut en offrant une option pour
renvoyer des informations détaillées sur le contexte, facilitant ainsi le travail avec des applications hybrides qui utilisent des webviews.

### Comment fonctionnent les contextes
Consultez la [documentation sur les applications hybrides](/docs/api/mobile#hybrid-apps) pour plus d'informations. Voici une explication des défis associés à la commande `getContext` :

#### Pour Android :
- Les webviews peuvent contenir plusieurs pages (comme des onglets de navigateur), et l'identification de la page correcte nécessite des métadonnées supplémentaires
  telles que `title` ou `url`.
- Les méthodes Appium par défaut ne fournissent que des noms de contexte basiques (par exemple, `WEBVIEW_{packageName}`) sans information détaillée
  sur les pages à l'intérieur de la webview.

#### Pour iOS :
- Chaque webview est identifiée par une chaîne générique `WEBVIEW_{id}`, qui n'indique pas son contenu ou l'écran de l'application
  auquel elle appartient.

### Pourquoi utiliser cette méthode ?
- **Comportement par défaut** :
  - Renvoie le contexte actuel sous forme de chaîne (par exemple, `NATIVE_APP` ou `WEBVIEW_{id}`).
- **Contexte détaillé** :
  - Lorsque `returnDetailedContext` est activé, récupère des métadonnées telles que :
    - **Android** : `packageName`, `title`, `url`, et `webviewPageId`.
    - **iOS** : `bundleId`, `title`, et `url`.
- **Options spécifiques à Android** :
  - Les intervalles de nouvelles tentatives et les délais d'attente peuvent être personnalisés pour gérer les retards d'initialisation de webview.

:::info Remarques et limitations

- Si `returnDetailedContext` n'est pas activé, la méthode se comporte comme la méthode Appium `getContext` par défaut.
- Si vous souhaitez utiliser la méthode Appium `context` "par défaut", vous pouvez utiliser la méthode `driver.getAppiumContext()`, voir
également la commande [Appium Contexts](/docs/api/appium#getappiumcontext).
- **Android :** Les options spécifiques à Android (`androidWebviewConnectionRetryTime` et `androidWebviewConnectTimeout`) n'ont aucun effet sur iOS.
- Affiche des avertissements si plusieurs contextes détaillés ou aucun ne sont trouvés :
  - `Nous avons trouvé plus d'un contexte détaillé pour le contexte actuel '{context}'. Nous retournerons le premier contexte.`
  - `Nous n'avons pas récupéré de contexte détaillé pour le contexte actuel '{context}'. Nous retournerons le contexte actuel sous forme de chaîne.`

:::

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
      <td>`GetContextsOptions`</td>
      <td>Les options de `getContext` (optionnel)</td>
    </tr>
    <tr>
      <td><code><var>options.returnDetailedContext</var></code><br /><span className="label labelWarning">optionnel</span></td>
      <td>`boolean`</td>
      <td>Par défaut, nous ne retournons que le nom du contexte basé sur l'API Appium `context` par défaut, qui n'est qu'une chaîne. Si vous souhaitez obtenir des informations détaillées sur le contexte, définissez cette valeur à `true`. La valeur par défaut est `false` (optionnel).</td>
    </tr>
    <tr>
      <td><code><var>options.androidWebviewConnectionRetryTime</var></code><br /><span className="label labelWarning">optionnel</span></td>
      <td>`number`</td>
      <td>Le temps en millisecondes à attendre entre chaque tentative de connexion à la webview. La valeur par défaut est `500` ms (optionnel). <br /><strong>ANDROID UNIQUEMENT</strong></td>
    </tr>
    <tr>
      <td><code><var>options.androidWebviewConnectTimeout</var></code><br /><span className="label labelWarning">optionnel</span></td>
      <td>`number`</td>
      <td>Le temps maximum en millisecondes à attendre pour qu'une page web view soit détectée. La valeur par défaut est `5000` ms (optionnel). <br /><strong>ANDROID UNIQUEMENT</strong></td>
    </tr>
  </tbody>
</table>

##### Exemples

```js title="default.test.js"
it('should return the current context with the default Appium `context` method', async () => {
    // For Android
    await driver.getContext()
    // Returns 'WEBVIEW_com.wdiodemoapp' or 'NATIVE_APP'
    //
    // For iOS, the context will be 'WEBVIEW_{number}'
    await driver.getContext()
    // Returns 'WEBVIEW_94703.19' or 'NATIVE_APP'
})

```

```js title="detailed.test.js"
it('should return the context of the current session with more detailed information', async () => {
    // For Android
    await driver.getContext({ returnDetailedContext: true})
    // Returns or `NATIVE_APP`, or
    // {
    //   id: 'WEBVIEW_com.wdiodemoapp',
    //   title: 'WebdriverIO · Next-gen browser and mobile automation test framework for Node.js | WebdriverIO',
    //   url: 'https://webdriver.io/',
    //   packageName: 'com.wdiodemoapp',
    //   webviewPageId: '5C0425CF67E9B169245F48FF21172912'
    // }
    //
    // For iOS, the context will be 'WEBVIEW_{number}'
    await driver.getContext({ returnDetailedContext: true})
    // Returns or `NATIVE_APP`, or
    // {
    //   id: 'WEBVIEW_64981.1',
    //   title: 'WebdriverIO · Next-gen browser and mobile automation test framework for Node.js | WebdriverIO',
    //   url: 'https://webdriver.io/',
    //   bundleId: 'org.reactjs.native.example.wdiodemoapp'
    // }
})

```

```js title="customize.retry.test.js"
it('should be able to cusomize the retry intervals and timeouts to handle delayed webview initialization', async () => {
    // For Android
    await driver.getContext({
        returnDetailedContext: true,
        // NOTE: The following options are Android-specific
        // For Android we might need to wait a bit longer to connect to the webview, so we can provide some additional options
        androidWebviewConnectionRetryTime: 1*1000,  // Retry every 1 second
        androidWebviewConnectTimeout: 10*1000,      // Timeout after 10 seconds
    })
})
```