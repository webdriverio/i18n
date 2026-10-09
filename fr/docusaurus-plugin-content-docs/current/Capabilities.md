---
id: capabilities
title: Capacités
description: "Définissez des capacités pour choisir le navigateur ou l'environnement mobile dans lequel vos tests s'exécutent, y compris les capacités personnalisées des fournisseurs et les cas d'utilisation spécifiques."
---

Une capacité est une définition pour une interface distante. Elle aide WebdriverIO à comprendre dans quel navigateur ou environnement mobile vous souhaitez exécuter vos tests. Les capacités sont moins cruciales lors du développement de tests en local, car vous les exécutez la plupart du temps sur une seule interface distante, mais elles deviennent plus importantes lors de l'exécution d'un grand ensemble de tests d'intégration en CI/CD.

:::info

Le format d'un objet de capacité est bien défini par la [spécification WebDriver](https://w3c.github.io/webdriver/#capabilities). Le testrunner WebdriverIO échouera rapidement si les capacités définies par l'utilisateur ne respectent pas cette spécification.

:::

## Capacités personnalisées

Bien que le nombre de capacités définies de manière fixe soit très faible, chacun peut fournir et accepter des capacités personnalisées spécifiques au pilote d'automatisation ou à l'interface distante :

### Extensions de capacités spécifiques aux navigateurs

- `goog:chromeOptions` : extensions [Chromedriver](https://chromedriver.chromium.org/capabilities), applicables uniquement pour les tests dans Chrome
- `moz:firefoxOptions` : extensions [Geckodriver](https://firefox-source-docs.mozilla.org/testing/geckodriver/Capabilities.html), applicables uniquement pour les tests dans Firefox
- `ms:edgeOptions` : [EdgeOptions](https://learn.microsoft.com/en-us/microsoft-edge/webdriver-chromium/capabilities-edge-options) pour spécifier l'environnement lors de l'utilisation d'EdgeDriver pour tester Chromium Edge

### Extensions de capacités des fournisseurs cloud

- `sauce:options` : [Sauce Labs](https://docs.saucelabs.com/dev/test-configuration-options/#w3c-webdriver-browser-capabilities--optional)
- `bstack:options` : [BrowserStack](https://www.browserstack.com/docs/automate/selenium/organize-tests)
- `tb:options` : [TestingBot](https://testingbot.com/support/other/test-options)
- `LT:Options` : [LambdaTest](https://www.lambdatest.com/support/docs/webdriverio-with-selenium-running-webdriverio-automation-scripts-on-lambdatest-selenium-grid/)
- et bien d'autres...

### Extensions de capacités des moteurs d'automatisation

- `appium:xxx` : [Appium](https://appium.io/docs/en/latest/guides/caps/)
- `selenoid:xxx` : [Selenoid](https://github.com/aerokube/selenoid/blob/master/docs/special-capabilities.adoc)
- et bien d'autres...

### Capacités WebdriverIO pour gérer les options des pilotes de navigateur

WebdriverIO gère l'installation et l'exécution du pilote de navigateur pour vous. WebdriverIO utilise une capacité personnalisée qui vous permet de transmettre des paramètres au pilote.

#### `wdio:chromedriverOptions`

Options spécifiques transmises à Chromedriver lors de son démarrage.

#### `wdio:geckodriverOptions`

Options spécifiques transmises à Geckodriver lors de son démarrage.

#### `wdio:edgedriverOptions`

Options spécifiques transmises à Edgedriver lors de son démarrage.

#### `wdio:safaridriverOptions`

Options spécifiques transmises à Safari lors de son démarrage.

#### `wdio:maxInstances`

<Option type="number">

Nombre maximal total de workers s'exécutant en parallèle pour le navigateur/la capacité spécifique. Prévaut sur [maxInstances](#configuration#maxInstances) et [maxInstancesPerCapability](configuration/#maxinstancespercapability).

</Option>

#### `wdio:specs`

<Option type="(String | String[])[]">

Définit les specs pour l'exécution des tests pour ce navigateur/cette capacité. Identique à l'[option de configuration `specs` habituelle](configuration#specs), mais spécifique au navigateur/à la capacité. Prévaut sur `specs`.

</Option>

#### `wdio:exclude`

<Option type="String[]">

Exclut des specs de l'exécution des tests pour ce navigateur/cette capacité. Identique à l'[option de configuration `exclude` habituelle](configuration#exclude), mais spécifique au navigateur/à la capacité. L'exclusion s'applique après l'option de configuration globale `exclude`.

</Option>

#### `wdio:enforceWebDriverClassic`

<Option type="boolean">

Par défaut, WebdriverIO tente d'établir une session WebDriver Bidi. Si vous ne le souhaitez pas, vous pouvez définir ce flag pour désactiver ce comportement.

</Option>

#### `wdio:electronVersion`

<Option type="string">

Télécharge le Chromedriver fourni avec cette version d'Electron au lieu de celui de Chrome for Testing, pour tester une application Electron définie comme `goog:chromeOptions.binary`. Si `browserVersion` est également défini, WebdriverIO utilise à la place le Chromedriver correspondant à cette version lorsque la version d'Electron ne peut pas être téléchargée ou que `CHROMEDRIVER_CDNURL` est défini. Les versions nightly proviennent de [electron/nightlies](https://github.com/electron/nightlies/releases). Le service Electron la définit pour vous à partir de la version d'Electron de l'application.

```ts
{
    browserName: 'chrome',
    'wdio:electronVersion': '33.2.1',
    // une session BiDi remplace la fenêtre de l'application par `data:,`
    'wdio:enforceWebDriverClassic': true,
    'goog:chromeOptions': {
        binary: './out/my-app-darwin-arm64/my-app.app/Contents/MacOS/my-app'
    }
}
```

</Option>

#### Options communes des pilotes

Bien que tous les pilotes proposent différents paramètres de configuration, il en existe quelques-uns de communs que WebdriverIO comprend et utilise pour configurer votre pilote ou votre navigateur :

##### `cacheDir`

<Option type="string" default="process.env.WEBDRIVER_CACHE_DIR || os.tmpdir()">

Le chemin vers la racine du répertoire de cache. Ce répertoire est utilisé pour stocker tous les pilotes téléchargés lors d'une tentative de démarrage de session.

</Option>

##### `binary`

<Option type="string">

Chemin vers un binaire de pilote personnalisé. S'il est défini, WebdriverIO ne tentera pas de télécharger un pilote mais utilisera celui fourni par ce chemin. Assurez-vous que le pilote est compatible avec le navigateur que vous utilisez.

Vous pouvez fournir ce chemin via les variables d'environnement `CHROMEDRIVER_PATH`, `GECKODRIVER_PATH` ou `EDGEDRIVER_PATH`.

</Option>
:::caution

Si le `binary` du pilote est défini, WebdriverIO ne tentera pas de télécharger un pilote mais utilisera celui fourni par ce chemin. Assurez-vous que le pilote est compatible avec le navigateur que vous utilisez.

:::

#### Hôte de téléchargement personnalisé pour les pilotes

Si les CDN publics des pilotes ne sont pas accessibles depuis votre environnement, par exemple parce que vous exécutez vos tests derrière un proxy d'entreprise ou que vous répliquez les pilotes dans un registre d'artefacts interne, vous pouvez rediriger le téléchargement vers un hôte personnalisé à l'aide des variables d'environnement suivantes :

- Chrome : `CHROMEDRIVER_CDNURL`, par défaut `https://storage.googleapis.com/chrome-for-testing-public`
- Microsoft Edge : `EDGEDRIVER_CDNURL`, par défaut `https://msedgedriver.microsoft.com`

Le miroir doit servir les archives des pilotes sous les mêmes chemins que le CDN d'origine, par exemple pour Chrome :

```sh
CHROMEDRIVER_CDNURL=https://artifactory.company.com/chrome-for-testing npx wdio run wdio.conf.js
```

ce qui résout le pilote en `https://artifactory.company.com/chrome-for-testing/<buildId>/<platform>/chromedriver-<platform>.zip`, où `<platform>` est l'une des valeurs `linux64`, `linux-arm64`, `mac-x64`, `mac-arm64`, `win32` ou `win64`, par exemple `.../140.0.7339.207/mac-arm64/chromedriver-mac-arm64.zip`.

:::info Environnements entièrement hors ligne

Ces variables redirigent uniquement le téléchargement du pilote. Pour empêcher totalement WebdriverIO d'accéder à l'internet public, quatre conditions supplémentaires doivent être remplies :

- **Un navigateur doit être disponible localement.** Si WebdriverIO ne trouve pas de Chrome ou de Firefox installé, il télécharge également le navigateur, et ce téléchargement ne tient pas compte de ces variables. Installez le navigateur sur la machine ou indiquez-le à WebdriverIO via `goog:chromeOptions.binary` / `moz:firefoxOptions.binary`.
- **Utilisez un numéro de version complet.** Si `browserVersion` est omis, WebdriverIO lit la version exacte à partir du navigateur local et aucune recherche de version n'est nécessaire. Si vous la définissez, utilisez la version complète en quatre parties, par exemple `140.0.7339.207`. Un canal de publication (`stable`), un jalon (`140`) ou une version partielle (`140.0.7339`) nécessite une recherche de version auprès d'un endpoint public de Google qui ne peut pas être redirigé.
- **Chromedriver doit provenir de Chrome for Testing.** Pour les versions de Chrome antérieures à `153.0.8001.0` sur Linux ARM64, ainsi qu'avec `wdio:electronVersion` sans `browserVersion`, Chromedriver est téléchargé depuis les releases GitHub d'Electron, que ces variables ne redirigent pas.
- **Assurez-vous que le miroir dispose réellement de la version dont vous avez besoin.** Si le pilote ne peut pas être récupéré depuis votre hôte — parce que la version n'est pas répliquée, mais aussi parce que l'URL est incorrecte ou que les identifiants ont été rejetés — WebdriverIO affiche un avertissement puis recherche la version valide connue la plus proche, ce qui interroge à nouveau l'endpoint public. Consultez l'avertissement pour connaître l'hôte essayé si une exécution accède de manière inattendue à internet ou choisit une version que vous n'avez pas demandée.

:::

#### Options des pilotes spécifiques aux navigateurs

Pour transmettre des options au pilote, vous pouvez utiliser les capacités personnalisées suivantes :

- Chrome ou Chromium : `wdio:chromedriverOptions`
- Firefox : `wdio:geckodriverOptions`
- Microsoft Egde : `wdio:edgedriverOptions`
- Safari : `wdio:safaridriverOptions`

<Tabs
  defaultValue="chrome"
  values={[
    {label: 'wdio:chromedriverOptions', value: 'chrome'},
    {label: 'wdio:geckodriverOptions', value: 'firefox'},
    {label: 'wdio:edgedriverOptions', value: 'msedge'},
    {label: 'wdio:safaridriverOptions', value: 'safari'},
  ]
}>
<TabItem value="chrome">

##### adbPort

<Option type="number">

Le port sur lequel le pilote ADB doit s'exécuter.

Exemple : `9515`

</Option>

##### urlBase

<Option type="string">

Préfixe du chemin d'URL de base pour les commandes, par exemple `wd/url`.

Exemple : `/`

</Option>

##### logPath

<Option type="string">

Écrit le journal du serveur dans un fichier au lieu de stderr, augmente le niveau de journalisation à `INFO`

</Option>

##### logLevel

<Option type="string">

Définit le niveau de journalisation. Options possibles : `ALL`, `DEBUG`, `INFO`, `WARNING`, `SEVERE`, `OFF`.

</Option>

##### verbose

<Option type="boolean">

Journalisation détaillée (équivalent à `--log-level=ALL`)

</Option>

##### silent

<Option type="boolean">

Aucune journalisation (équivalent à `--log-level=OFF`)

</Option>

##### appendLog

<Option type="boolean">

Ajoute au fichier journal au lieu de le réécrire.

</Option>

##### replayable

<Option type="boolean">

Journalisation détaillée sans tronquer les longues chaînes afin que le journal puisse être rejoué (expérimental).

</Option>

##### readableTimestamp

<Option type="boolean">

Ajoute des horodatages lisibles au journal.

</Option>

##### enableChromeLogs

<Option type="boolean">

Affiche les journaux du navigateur (remplace les autres options de journalisation).

</Option>

##### bidiMapperPath

<Option type="string">

Chemin personnalisé du mapper bidi.

</Option>

##### allowedIps

<Option type="string[]" default="['']">

Liste d'autorisation, séparée par des virgules, des adresses IP distantes autorisées à se connecter à EdgeDriver.

</Option>

##### allowedOrigins

<Option type="string[]" default="['*']">

Liste d'autorisation, séparée par des virgules, des origines de requêtes autorisées à se connecter à EdgeDriver. Utiliser `*` pour autoriser n'importe quelle origine d'hôte est dangereux !

</Option>

##### spawnOpts

<Option type="SpawnOptionsWithoutStdio | SpawnOptionsWithStdioTuple<StdioOption, StdioOption, StdioOption>" default="undefined">

Options à transmettre au processus du pilote.

</Option>
</TabItem>
<TabItem value="firefox">

Consultez toutes les options de Geckodriver dans le [package du pilote](https://github.com/webdriverio-community/node-geckodriver#options) officiel.

</TabItem>
<TabItem value="msedge">

Consultez toutes les options d'Edgedriver dans le [package du pilote](https://github.com/webdriverio-community/node-edgedriver#options) officiel.

</TabItem>
<TabItem value="safari">

Consultez toutes les options de Safaridriver dans le [package du pilote](https://github.com/webdriverio-community/node-safaridriver#options) officiel.

</TabItem>
</Tabs>

## Capacités spéciales pour des cas d'utilisation spécifiques

Voici une liste d'exemples montrant quelles capacités doivent être appliquées pour réaliser un cas d'utilisation donné.

### Exécuter le navigateur en mode headless

Exécuter un navigateur en mode headless signifie exécuter une instance de navigateur sans fenêtre ni interface utilisateur. Ceci est principalement utilisé dans les environnements CI/CD où aucun écran n'est utilisé. Pour exécuter un navigateur en mode headless, appliquez les capacités suivantes :

<Tabs
  defaultValue="chrome"
  values={[
    {label: 'Chrome', value: 'chrome'},
    {label: 'Firefox', value: 'firefox'},
    {label: 'Microsoft Edge', value: 'msedge'},
    {label: 'Safari', value: 'safari'},
  ]
}>
<TabItem value="chrome">

```ts
{
    browserName: 'chrome',   // ou 'chromium'
    'goog:chromeOptions': {
        args: ['headless', 'disable-gpu']
    }
}
```

</TabItem>
<TabItem value="firefox">

```ts
    browserName: 'firefox',
    'moz:firefoxOptions': {
        args: ['-headless']
    }
```

</TabItem>
<TabItem value="msedge">

```ts
    browserName: 'msedge',
    'ms:edgeOptions': {
        args: ['--headless']
    }
```

</TabItem>
<TabItem value="safari">

Il semble que Safari [ne prenne pas en charge](https://discussions.apple.com/thread/251837694) l'exécution en mode headless.

</TabItem>
</Tabs>

### Automatiser différents canaux de navigateur

Si vous souhaitez tester une version de navigateur qui n'est pas encore publiée en version stable, par exemple Chrome Canary, vous pouvez le faire en définissant des capacités et en pointant vers le navigateur que vous souhaitez démarrer, par exemple :

<Tabs
  defaultValue="chrome"
  values={[
    {label: 'Chrome', value: 'chrome'},
    {label: 'Firefox', value: 'firefox'},
    {label: 'Microsoft Edge', value: 'msedge'},
    {label: 'Safari', value: 'safari'},
  ]
}>
<TabItem value="chrome">

Lors des tests sur Chrome, WebdriverIO téléchargera automatiquement la version du navigateur et le pilote souhaités en fonction du `browserVersion` défini, par exemple :

```ts
{
    browserName: 'chrome', // ou 'chromium'
    browserVersion: '116' // ou '116.0.5845.96', 'stable', 'dev', 'canary', 'beta' ou 'latest' (identique à 'canary')
}
```

Si vous souhaitez tester un navigateur téléchargé manuellement, vous pouvez fournir un chemin vers le binaire du navigateur via :

```ts
{
    browserName: 'chrome',  // ou 'chromium'
    'goog:chromeOptions': {
        binary: '/Applications/Google\ Chrome\ Canary.app/Contents/MacOS/Google\ Chrome\ Canary'
    }
}
```

De plus, si vous souhaitez utiliser un pilote téléchargé manuellement, vous pouvez fournir un chemin vers le binaire du pilote via :

```ts
{
    browserName: 'chrome', // ou 'chromium'
    'wdio:chromedriverOptions': {
        binary: '/path/to/chromdriver'
    }
}
```

</TabItem>
<TabItem value="firefox">

Lors des tests sur Firefox, WebdriverIO téléchargera automatiquement la version du navigateur et le pilote souhaités en fonction du `browserVersion` défini, par exemple :

```ts
{
    browserName: 'firefox',
    browserVersion: '119.0a1' // ou 'latest'
}
```

Si vous souhaitez tester une version téléchargée manuellement, vous pouvez fournir un chemin vers le binaire du navigateur via :

```ts
{
    browserName: 'firefox',
    'moz:firefoxOptions': {
        binary: '/Applications/Firefox\ Nightly.app/Contents/MacOS/firefox'
    }
}
```

De plus, si vous souhaitez utiliser un pilote téléchargé manuellement, vous pouvez fournir un chemin vers le binaire du pilote via :

```ts
{
    browserName: 'firefox',
    'wdio:geckodriverOptions': {
        binary: '/path/to/geckodriver'
    }
}
```

</TabItem>
<TabItem value="msedge">

Lors des tests sur Microsoft Edge, assurez-vous que la version souhaitée du navigateur est installée sur votre machine. Vous pouvez indiquer à WebdriverIO le navigateur à exécuter via :

```ts
{
    browserName: 'msedge',
    'ms:edgeOptions': {
        binary: '/Applications/Microsoft\ Edge\ Canary.app/Contents/MacOS/Microsoft\ Edge\ Canary'
    }
}
```

WebdriverIO téléchargera automatiquement la version du pilote souhaitée en fonction du `browserVersion` défini, par exemple :

```ts
{
    browserName: 'msedge',
    browserVersion: '109' // ou '109.0.1467.0', 'stable', 'dev', 'canary', 'beta'
}
```

De plus, si vous souhaitez utiliser un pilote téléchargé manuellement, vous pouvez fournir un chemin vers le binaire du pilote via :

```ts
{
    browserName: 'msedge',
    'wdio:edgedriverOptions': {
        binary: '/path/to/msedgedriver'
    }
}
```

</TabItem>
<TabItem value="safari">

Lors des tests sur Safari, assurez-vous que [Safari Technology Preview](https://developer.apple.com/safari/technology-preview/) est installé sur votre machine. Vous pouvez indiquer cette version à WebdriverIO via :

```ts
{
    browserName: 'safari technology preview'
}
```

</TabItem>
</Tabs>

## Étendre les capacités personnalisées

Si vous souhaitez définir votre propre ensemble de capacités afin, par exemple, de stocker des données arbitraires à utiliser dans les tests pour cette capacité spécifique, vous pouvez le faire en définissant par exemple :

```js title=wdio.conf.ts
export const config = {
    // ...
    capabilities: [{
        browserName: 'chrome',
        'custom:caps': {
            // configurations personnalisées
        }
    }]
}
```

Il est conseillé de suivre le [protocole W3C](https://w3c.github.io/webdriver/#dfn-extension-capability) en ce qui concerne le nommage des capacités, qui exige un caractère `:` (deux-points) désignant un espace de noms spécifique à l'implémentation. Dans vos tests, vous pouvez accéder à votre capacité personnalisée via, par exemple :

```ts
browser.capabilities['custom:caps']
```

Afin de garantir la sécurité des types, vous pouvez étendre l'interface de capacités de WebdriverIO via :

```ts
declare global {
    namespace WebdriverIO {
        interface Capabilities {
            'custom:caps': {
                // ...
            }
        }
    }
}
```