---
id: getContexts
title: getContexts
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/mobile/getContexts.ts
---

La méthode `getContexts` de WebdriverIO est une version améliorée de la commande Appium `contexts` par défaut
(et de la précédente WebdriverIO `getContexts`). Elle fournit des informations détaillées et exploitables
sur les contextes disponibles dans une session d'application mobile, répondant aux limitations des méthodes Appium par défaut.

### Comment fonctionnent les Webviews et en quoi cette méthode aide
Pour plus de détails, consultez la [documentation sur les applications hybrides](/docs/api/mobile#hybrid-apps). Voici un résumé des défis relevés par la commande `getContexts` :

#### Défis sur Android
- Une seule webview (par exemple, `WEBVIEW_{packageName}`) peut contenir plusieurs pages (similaires aux onglets du navigateur).
- Les méthodes Appium par défaut n'incluent pas de détails sur ces pages, comme leur `title`, `url` ou visibilité,
  ce qui rend difficile l'identification de la page correcte et peut entraîner des instabilités.

#### Défis sur iOS
- La méthode Appium par défaut renvoie uniquement des identifiants génériques de webview (par exemple, `WEBVIEW_{id}`) sans métadonnées supplémentaires.
- Cela rend difficile la détermination de quelle webview correspond à l'écran de l'application cible.

La méthode améliorée `getContexts` résout ces problèmes en renvoyant des objets de contexte détaillés, qui incluent :
- **Pour Android :** `title`, `url`, `packageName`, `webviewPageId`, et détails de disposition (`screenX`, `screenY`, `width`, et `height`).
- **Pour iOS :** `bundleId`, `title`, et `url`.

Ces améliorations rendent le débogage et l'interaction avec les applications hybrides plus fiables.

### Pourquoi utiliser cette méthode ?
Par défaut, la méthode Appium `contexts` renvoie uniquement un tableau de chaînes représentant les contextes disponibles :
- **Pour Android :** `['NATIVE_APP', 'WEBVIEW_com.wdiodemoapp', ...]`
- **Pour iOS :** `['NATIVE_APP', 'WEBVIEW_84392.1', ...]`

Bien que suffisantes pour des scénarios simples, ces réponses par défaut manquent de métadonnées critiques pour les tests d'applications hybrides :
- **Pour Android :** L'absence de métadonnées spécifiques à la page rend difficile l'interaction avec la webview correcte.
- **Pour iOS :** Les identifiants génériques de webview ne donnent aucune indication sur le contenu ou l'écran de l'application qu'ils représentent.

La méthode améliorée `getContexts` fournit :
- Des métadonnées détaillées pour Android et iOS.
- Des options pour filtrer et personnaliser les contextes renvoyés pour un meilleur ciblage et une meilleure interaction.

:::info Remarques et limitations

- La méthode améliorée `getContexts` fonctionne sur les plateformes Android et iOS. Cependant, les données renvoyées peuvent varier selon la plateforme et l'application testée.
- Si vous ne spécifiez pas l'option `returnDetailedContexts`, la méthode se comporte comme la méthode Appium `contexts` par défaut, renvoyant un simple tableau de contextes.
- Pour utiliser la méthode Appium `contexts` "par défaut", utilisez `driver.getAppiumContexts()`. Pour plus d'informations, consultez la [documentation Appium sur les contextes](/docs/api/appium#getappiumcontexts).

#### Webviews Android :
- Les métadonnées telles que `androidWebviewData` ne sont disponibles que lorsque `returnAndroidDescriptionData` est `true`.
- L'utilisation de la méthode `getContexts` sur un navigateur Chrome peut parfois renvoyer des données incomplètes en raison de versions incompatibles entre le navigateur, la Webview et ChromeDriver. Dans ces cas, des valeurs par défaut ou un `webviewPageId` incorrect (par exemple, `0`) peuvent être renvoyés.

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
      <td>Les options `getContexts` (optionnel)</td>
    </tr>
    <tr>
      <td><code><var>options.returnDetailedContexts</var></code><br /><span className="label labelWarning">optionnel</span></td>
      <td>`boolean`</td>
      <td>Par défaut, nous ne renvoyons que les noms de contexte basés sur l'API Appium `contexts` par défaut. Si vous souhaitez obtenir toutes les données, vous pouvez définir cette option à `true`. La valeur par défaut est `false` (optionnel).</td>
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
    <tr>
      <td><code><var>options.filterByCurrentAndroidApp</var></code><br /><span className="label labelWarning">optionnel</span></td>
      <td>`boolean`</td>
      <td>Par défaut, nous renvoyons toutes les webviews. Si vous souhaitez filtrer les webviews par l'application Android actuelle qui est ouverte, vous pouvez définir cette option à `true`. La valeur par défaut est `false` (optionnel). <br /><strong>REMARQUE :</strong> Soyez conscient que vous pourriez également NE PAS trouver de Webview en raison de cette "restriction". <br /><strong>ANDROID UNIQUEMENT</strong></td>
    </tr>
    <tr>
      <td><code><var>options.isAndroidWebviewVisible</var></code><br /><span className="label labelWarning">optionnel</span></td>
      <td>`boolean`</td>
      <td>Par défaut, nous ne renvoyons que les webviews qui sont attachées et visibles. Si vous souhaitez obtenir toutes les webviews, vous pouvez définir cette option à `false` (optionnel). La valeur par défaut est `true`. <br /><strong>ANDROID UNIQUEMENT</strong></td>
    </tr>
    <tr>
      <td><code><var>options.returnAndroidDescriptionData</var></code><br /><span className="label labelWarning">optionnel</span></td>
      <td>`boolean`</td>
      <td>Par défaut, aucune donnée de description de Webview Android (Chrome) n'est renvoyée. Si vous souhaitez obtenir toutes les données, vous pouvez définir cette option à `true`. La valeur par défaut est `false` (optionnel). <br />En activant cette option, vous obtiendrez des données supplémentaires dans la réponse, voir le fichier `description.data.test.js` pour plus d'informations. <br /><strong>ANDROID UNIQUEMENT</strong></td>
    </tr>
  </tbody>
</table>

##### Exemples

```js title="example.test.js"
it('should return all contexts in the current session with the default Appium `contexts`-method.', async () => {
    // For Android
    await driver.getContexts()
    // Returns ['NATIVE_APP', 'WEBVIEW_com.wdiodemoapp', ...]
    //
    // For iOS, the context will be 'WEBVIEW_{number}'
    await driver.getContexts()
    // Returns [ 'NATIVE_APP', 'WEBVIEW_84392.1', ... ]
})

```

```js title="detailed.test.js"
it('should return all contexts in the current session with detailed info.', async () => {
    // For Android
    await driver.getContexts({returnDetailedContexts: true})
    // Returns [
    //   { id: 'NATIVE_APP' },
    //   {
    //       id: 'WEBVIEW_com.wdiodemoapp',
    //       title: 'WebdriverIO · Next-gen browser and mobile automation test framework for Node.js | WebdriverIO',
    //       url: 'https://webdriver.io/',
    //       packageName: 'com.wdiodemoapp',
    //       webviewPageId: '58B0AA2DBBBBBE9008C35AE42385BB0D'
    //   },
    //   {
    //       id: 'WEBVIEW_chrome',
    //       title: 'Android | Get more done with Google on Android-phones and devices',
    //       url: 'https://www.android.com/',
    //       packageName: 'com.android.chrome',
    //       webviewPageId: '0'
    //   }
    // ]
    //
    // For iOS, the context will be 'WEBVIEW_{number}'
    await driver.getContexts({returnDetailedContexts: true})
    // Returns: [
    //   { id: 'NATIVE_APP' },
    //   {
    //       id: 'WEBVIEW_86150.1',
    //       title: 'WebdriverIO · Next-gen browser and mobile automation test framework for Node.js | WebdriverIO',
    //       url: 'https://webdriver.io/',
    //       bundleId: 'org.reactjs.native.example.wdiodemoapp'
    //   },
    //   {
    //       id: 'WEBVIEW_86152.1',
    //       title: 'Apple',
    //       url: 'https://www.apple.com/',
    //       bundleId: 'com.apple.mobilesafari'
    //   }
    // ]
})

```

```js title="description.data.test.js"
it('should return Android description data for the webview', async () => {
    // For Android
    await driver.getContexts({returnDetailedContexts: true, returnAndroidDescriptionData: true})
    // Returns [
    //   { id: 'NATIVE_APP' },
    //   {
    //       androidWebviewData: {
    //          // Indicates whether the web page is currently attached to a web view.
    //          // `true` means the page is attached and likely active, `false` indicates it is not.
    //          attached: true,
    //          // Indicates whether the web page is empty or not. An empty page typically means that
    //          // there is no significant content loaded in it. `true` indicates the page is empty,
    //          // `false` indicates it has content.
    //          empty: false,
    //          // Indicates whether the page has never been attached to a web view. If `true`, the
    //          // page has never been attached, which could indicate a new or unused page. If `false`,
    //          // the page has been attached at some point.
    //          neverAttached: false,
    //          // Indicates whether the web page is visible on the screen. `true` means the page is
    //          // visible to the user, `false` means it is not.
    //          visible: true,
    //          // This data can be super useful to determine where on the screen the webview is located
    //          // and can come in handy when you want to interact with elements on the screen based on
    //          // coordinates based on the top-left corner of the screen
    //          screenX: 0,
    //          screenY: 151,
    //          height: 2589,
    //          width: 1344
    //       },
    //       id: 'WEBVIEW_com.wdiodemoapp',
    //       title: 'WebdriverIO · Next-gen browser and mobile automation test framework for Node.js | WebdriverIO',
    //       url: 'https://webdriver.io/',
    //       packageName: 'com.wdiodemoapp',
    //       webviewPageId: '58B0AA2DBBBBBE9008C35AE42385BB0D'
    //   }
    // ]
})
```