---
id: switchContext
title: switchContext
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/mobile/switchContext.ts
---

Basculer vers un contexte spécifique en utilisant un `name`, `title`, ou `url` de Webview donné.

Cette méthode améliore la commande `context` par défaut d'Appium en offrant plus de flexibilité et de précision
pour basculer entre les contextes natifs et webview dans les applications mobiles hybrides.

### Comment fonctionnent les contextes
Pour un aperçu des applications hybrides et des webviews, référez-vous à la [documentation sur les applications hybrides](/docs/api/mobile#hybrid-apps).
Voici un résumé de la façon dont la commande `switchContext` répond aux défis courants :

#### Défis sur Android
- Les webviews contiennent souvent plusieurs pages (similaires aux onglets de navigateur). L'identification de la page correcte nécessite des
  métadonnées supplémentaires comme le `title` ou l'`url`, qui ne sont pas fournies par les méthodes Appium par défaut.
- Les méthodes Appium par défaut renvoient uniquement les noms de contexte de base (par exemple, `WEBVIEW_{packageName}`) sans détails sur
  le contenu ou les pages au sein de la webview.
- Le basculement de contexte sur Android implique deux étapes, qui sont gérées automatiquement par cette méthode :
  1. Basculer vers le contexte Webview en utilisant `WEBVIEW_{packageName}`.
  2. Sélectionner la page appropriée dans la Webview en utilisant la méthode `switchToWindow`.

#### Défis sur iOS
- Les webviews sont identifiées par des ID génériques (par exemple, `WEBVIEW_{id}`), qui ne fournissent pas d'informations sur le contenu
  ou l'écran de l'application auxquels ils correspondent.
- Déterminer la webview correcte pour l'interaction nécessite souvent des essais et des erreurs.

La méthode `switchContext` simplifie ce processus en récupérant des métadonnées détaillées (par exemple, `title`, `url` et visibilité)
pour assurer un basculement de contexte précis et fiable.

### Pourquoi utiliser cette méthode ?
- **Basculement simplifié** : Si vous connaissez le `title` ou l'`url` de la webview souhaitée, cette méthode élimine le besoin
  d'appels supplémentaires à `getContexts` ou de combiner plusieurs méthodes comme `switchContext({id})` et `getTitle()`.
- **Correspondance automatique de contexte** : Trouve la meilleure correspondance pour un contexte basée sur :
  - Des identifiants spécifiques à la plateforme (`bundleId` pour iOS, `packageName` pour Android).
  - Des correspondances exactes ou partielles pour `title` ou `url` (prend en charge à la fois les chaînes et les expressions régulières).
  - Des vérifications spécifiques à Android pour s'assurer que les webviews sont attachées et visibles.
- **Contrôle précis** : Des intervalles de réessai et des délais d'attente personnalisés (Android uniquement) vous permettent de gérer les délais dans l'initialisation de la webview.
- **Accès à la méthode Appium par défaut** : Si nécessaire, vous pouvez utiliser la commande `switchContext` d'Appium par défaut via `driver.switchAppiumContext()`.

:::info Remarques et limitations

- Si le `title` ou l'`url` de la webview souhaitée est connu, cette méthode peut automatiquement localiser et basculer vers le contexte correspondant sans appels supplémentaires à `getContexts`.
- Les options spécifiques à Android comme `androidWebviewConnectionRetryTime` et `androidWebviewConnectTimeout` ne sont pas applicables à iOS.
- Enregistre les raisons des échecs de correspondance de contexte pour aider au débogage.
- Lors de l'utilisation d'un objet comme entrée, soit `title` soit `url` est requis.

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
      <td><code><var>context</var></code></td>
      <td>`string, SwitchContextOptions`</td>
      <td>Le nom du contexte vers lequel basculer. Un objet avec plus d'options de contexte peut être fourni.</td>
    </tr>
    <tr>
      <td><code><var>options</var></code></td>
      <td>`SwitchContextOptions`</td>
      <td>Options de la commande switchContext</td>
    </tr>
    <tr>
      <td><code><var>options.title</var></code><br /><span className="label labelWarning">optionnel</span></td>
      <td>`string, RegExp`</td>
      <td>Le titre de la page vers laquelle basculer. Ce sera le contenu de la balise title d'une page webview. Vous pouvez utiliser une chaîne qui doit correspondre parfaitement ou une expression régulière.<br /><strong>IMPORTANT :</strong> Lorsque vous utilisez des options, soit la propriété `title` soit la propriété `url` est requise.</td>
    </tr>
    <tr>
      <td><code><var>options.url</var></code><br /><span className="label labelWarning">optionnel</span></td>
      <td>`string, RegExp`</td>
      <td>L'URL de la page vers laquelle basculer. Ce sera l'`url` d'une page webview. Vous pouvez utiliser une chaîne qui doit correspondre parfaitement ou une expression régulière.<br /><strong>IMPORTANT :</strong> Lorsque vous utilisez des options, soit la propriété `title` soit la propriété `url` est requise.</td>
    </tr>
    <tr>
      <td><code><var>options.androidWebviewConnectionRetryTime</var></code><br /><span className="label labelWarning">optionnel</span></td>
      <td>`number`</td>
      <td>Le temps en millisecondes à attendre entre chaque tentative de connexion à la webview. La valeur par défaut est `500` ms (optionnel). <br /><strong>ANDROID UNIQUEMENT</strong> et ne sera utilisé que lorsqu'un `title` ou une `url` est fourni.</td>
    </tr>
    <tr>
      <td><code><var>options.androidWebviewConnectTimeout</var></code><br /><span className="label labelWarning">optionnel</span></td>
      <td>`number`</td>
      <td>Le temps maximum en millisecondes à attendre pour qu'une page webview soit détectée. La valeur par défaut est `5000` ms (optionnel). <br /><strong>ANDROID UNIQUEMENT</strong> et ne sera utilisé que lorsqu'un `title` ou une `url` est fourni.</td>
    </tr>
  </tbody>
</table>

##### Exemples

```js title="example.test.js"
it('should switch to a webview by name and uses the default Appium `context`-method', async () => {
    // For Android, the context will be '`WEBVIEW_{packageName}`'
    await driver.switchContext('WEBVIEW_com.wdiodemoapp')
    // For iOS, the context will be 'WEBVIEW_{number}'
    await driver.switchContext('WEBVIEW_94703.19')
})

```

```js title="exact.title.test.js"
it('should switch to a webview and match a webview based on an EXACT match of the `title` of the webview', async () => {
    await driver.switchContext({
        // In this case the title needs to be an exact match
        title: 'Webview Title',
    })
})

```

```js title="exact.url.test.js"
it('should switch to a webview and match a webview based on an EXACT match of the `title` of the webview', async () => {
    await driver.switchContext({
        // In this case the url needs to be an exact match
        url: 'https://webdriver.io',
    })
})

```

```js title="regex.title.url.test.js"
it('should switch to a webview and match a webview based on regex match of the `title` and `url` of the webview', async () => {
    await driver.switchContext({
        // The title should NOT end with 'foo'
        title: /^(?!.*foo$)/,
        // Matches any string that contains the substring `docs/api/mobile/switchContext`
        url: /.*docs\/api\/mobile\/switchContext/,
    })
})

```

```js title="android.context.waits.test.js"
it('should switch to a webview for Android but wait longer to connect and find a webview based on provided options', async () => {
    await driver.switchContext({
        // In this case the title need to be an exact match
        title: 'Webview Title',
        // For Android we might need to wait a bit longer to connect to the webview, so we can provide some additional options
        androidWebviewConnectionRetryTime: 1*1000,  // Retry every 1 second
        androidWebviewConnectTimeout: 10*1000,      // Timeout after 10 seconds
    })
})
```