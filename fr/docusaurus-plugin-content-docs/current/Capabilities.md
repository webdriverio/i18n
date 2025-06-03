---
id: capabilities
title: Capacités
---

Une capacité est une définition pour une interface distante. Elle aide WebdriverIO à comprendre dans quel environnement de navigateur ou mobile vous souhaitez exécuter vos tests. Les capacités sont moins cruciales lors du développement de tests en local, car vous les exécutez la plupart du temps sur une seule interface distante, mais elles deviennent plus importantes lors de l'exécution d'un grand ensemble de tests d'intégration en CI/CD.

:::info

Le format d'un objet de capacité est bien défini par la [spécification WebDriver](https://w3c.github.io/webdriver/#capabilities). Le testrunner WebdriverIO échouera rapidement si les capacités définies par l'utilisateur ne respectent pas cette spécification.

:::

## Capacités personnalisées

Bien que le nombre de capacités définies de manière fixe soit très faible, chacun peut fournir et accepter des capacités personnalisées spécifiques au pilote d'automatisation ou à l'interface distante :

### Extensions de capacités spécifiques au navigateur

- `goog:chromeOptions` : Extensions [Chromedriver](https://chromedriver.chromium.org/capabilities), applicables uniquement pour les tests dans Chrome
- `moz:firefoxOptions` : Extensions [Geckodriver](https://firefox-source-docs.mozilla.org/testing/geckodriver/Capabilities.html), applicables uniquement pour les tests dans Firefox
- `ms:edgeOptions` : [EdgeOptions](https://learn.microsoft.com/en-us/microsoft-edge/webdriver-chromium/capabilities-edge-options) pour spécifier l'environnement lors de l'utilisation d'EdgeDriver pour tester Chromium Edge

### Extensions de capacités des fournisseurs cloud

- `sauce:options` : [Sauce Labs](https://docs.saucelabs.com/dev/test-configuration-options/#w3c-webdriver-browser-capabilities--optional)
- `bstack:options` : [BrowserStack](https://www.browserstack.com/docs/automate/selenium/organize-tests)
- `tb:options` : [TestingBot](https://testingbot.com/support/other/test-options)
- et bien d'autres...

### Extensions de capacités du moteur d'automatisation

- `appium:xxx` : [Appium](https://appium.io/docs/en/latest/guides/caps/)
- `selenoid:xxx` : [Selenoid](https://github.com/aerokube/selenoid/blob/master/docs/special-capabilities.adoc)
- et bien d'autres...

### Capacités WebdriverIO pour gérer les options du pilote de navigateur

WebdriverIO gère l'installation et l'exécution du pilote de navigateur pour vous. WebdriverIO utilise une capacité personnalisée qui vous permet de passer des paramètres au pilote.

#### `wdio:chromedriverOptions`

Options spécifiques transmises à Chromedriver lors de son démarrage.

#### `wdio:geckodriverOptions`

Options spécifiques transmises à Geckodriver lors de son démarrage.

#### `wdio:edgedriverOptions`

Options spécifiques transmises à Edgedriver lors de son démarrage.

#### `wdio:safaridriverOptions`

Options spécifiques transmises à Safari lors de son démarrage.

#### `wdio:maxInstances`

Nombre maximum total de travailleurs exécutés en parallèle pour le navigateur/capacité spécifique. Prend la priorité sur [maxInstances](#configuration#maxInstances) et [maxInstancesPerCapability](configuration/#maxinstancespercapability).

Type : `number`

#### `wdio:specs`

Définit les spécifications pour l'exécution des tests pour ce navigateur/capacité. Identique à l'[option de configuration `specs` standard](configuration#specs), mais spécifique au navigateur/capacité. Prend la priorité sur `specs`.

Type : `(String | String[])[]`

#### `wdio:exclude`

Exclut les spécifications de l'exécution des tests pour ce navigateur/capacité. Identique à l'[option de configuration `exclude` standard](configuration#exclude), mais spécifique au navigateur/capacité. Prend la priorité sur `exclude`.

Type : `String[]`

#### `wdio:enforceWebDriverClassic`

Par défaut, WebdriverIO tente d'établir une session WebDriver Bidi. Si vous ne préférez pas cela, vous pouvez définir ce drapeau pour désactiver ce comportement.

Type : `boolean`

#### Options de pilote communes

Bien que tous les pilotes offrent différents paramètres de configuration, il existe des options communes que WebdriverIO comprend et utilise pour configurer votre pilote ou navigateur :

##### `cacheDir`

Le chemin vers la racine du répertoire de cache. Ce répertoire est utilisé pour stocker tous les pilotes téléchargés lors des tentatives de démarrage d'une session.

Type : `string`<br />
Par défaut : `process.env.WEBDRIVER_CACHE_DIR || os.tmpdir()`

##### `binary`

Chemin vers un binaire de pilote personnalisé. Si défini, WebdriverIO ne tentera pas de télécharger un pilote mais utilisera celui fourni par ce chemin. Assurez-vous que le pilote est compatible avec le navigateur que vous utilisez.

Vous pouvez fournir ce chemin via les variables d'environnement `CHROMEDRIVER_PATH`, `GECKODRIVER_PATH` ou `EDGEDRIVER_PATH`.

Type : `string`

:::caution

Si le `binary` du pilote est défini, WebdriverIO ne tentera pas de télécharger un pilote mais utilisera celui fourni par ce chemin. Assurez-vous que le pilote est compatible avec le navigateur que vous utilisez.

:::

#### Options de pilote spécifiques au navigateur

Pour propager des options au pilote, vous pouvez utiliser les capacités personnalisées suivantes :

- Chrome ou Chromium : `wdio:chromedriverOptions`
- Firefox : `wdio:geckodriverOptions`
- Microsoft Edge : `wdio:edgedriverOptions`
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
Le port sur lequel le pilote ADB doit s'exécuter.

Exemple : `9515`

Type : `number`

##### urlBase
Préfixe de chemin d'URL de base pour les commandes, par exemple `wd/url`.

Exemple : `/`

Type : `string`

##### logPath
Écrire le journal du serveur dans un fichier au lieu de stderr, augmente le niveau de journalisation à `INFO`

Type : `string`

##### logLevel
Définir le niveau de journalisation. Options possibles `ALL`, `DEBUG`, `INFO`, `WARNING`, `SEVERE`, `OFF`.

Type : `string`

##### verbose
Journaliser en mode verbeux (équivalent à `--log-level=ALL`)

Type : `boolean`

##### silent
Ne rien journaliser (équivalent à `--log-level=OFF`)

Type : `boolean`

##### appendLog
Ajouter au fichier journal au lieu de le réécrire.

Type : `boolean`

##### replayable
Journaliser en mode verbeux et ne pas tronquer les longues chaînes afin que le journal puisse être rejoué (expérimental).

Type : `boolean`

##### readableTimestamp
Ajouter des horodatages lisibles au journal.

Type : `boolean`

##### enableChromeLogs
Afficher les journaux du navigateur (remplace les autres options de journalisation).

Type : `boolean`

##### bidiMapperPath
Chemin du mappeur bidi personnalisé.

Type : `string`

##### allowedIps
Liste d'adresses IP distantes autorisées à se connecter à EdgeDriver, séparées par des virgules.

Type : `string[]`<br />
Par défaut : `['']`

##### allowedOrigins
Liste d'origines de requêtes autorisées à se connecter à EdgeDriver, séparées par des virgules. L'utilisation de `*` pour autoriser n'importe quelle origine d'hôte est dangereuse !

Type : `string[]`<br />
Par défaut : `['*']`

##### spawnOpts
Options à passer au processus du pilote.

Type : `SpawnOptionsWithoutStdio | SpawnOptionsWithStdioTuple<StdioOption, StdioOption, StdioOption>`<br />
Par défaut : `undefined`

</TabItem>
<TabItem value="firefox">

Voir toutes les options de Geckodriver dans le [package de pilote](https://github.com/webdriverio-community/node-geckodriver#options) officiel.

</TabItem>
<TabItem value="msedge">

Voir toutes les options d'Edgedriver dans le [package de pilote](https://github.com/webdriverio-community/node-edgedriver#options) officiel.

</TabItem>
<TabItem value="safari">

Voir toutes les options de Safaridriver dans le [package de pilote](https://github.com/webdriverio-community/node-safaridriver#options) officiel.

</TabItem>
</Tabs>

## Capacités spéciales pour des cas d'utilisation spécifiques

Voici une liste d'exemples montrant quelles capacités doivent être appliquées pour atteindre un certain cas d'utilisation.

### Exécuter le navigateur en mode headless

Exécuter un navigateur en mode headless signifie exécuter une instance de navigateur sans fenêtre ni interface utilisateur. Cela est principalement utilisé dans les environnements CI/CD où aucun affichage n'est utilisé. Pour exécuter un navigateur en mode headless, appliquez les capacités suivantes :

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

Lors des tests sur Chrome, WebdriverIO téléchargera automatiquement la version de navigateur et le pilote souhaités en fonction du `browserVersion` défini, par exemple :

```ts
{
    browserName: 'chrome', // ou 'chromium'
    browserVersion: '116' // ou '116.0.5845.96', 'stable', 'dev', 'canary', 'beta' ou 'latest' (identique à 'canary')
}
```

Si vous souhaitez tester un navigateur téléchargé manuellement, vous pouvez fournir un chemin binaire vers le navigateur via :

```ts
{
    browserName: 'chrome',  // ou 'chromium'
    'goog:chromeOptions': {
        binary: '/Applications/Google\ Chrome\ Canary.app/Contents/MacOS/Google\ Chrome\ Canary'
    }
}
```

De plus, si vous souhaitez utiliser un pilote téléchargé manuellement, vous pouvez fournir un chemin binaire vers le pilote via :

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

Lors des tests sur Firefox, WebdriverIO téléchargera automatiquement la version de navigateur et le pilote souhaités en fonction du `browserVersion` défini, par exemple :

```ts
{
    browserName: 'firefox',
    browserVersion: '119.0a1' // ou 'latest'
}
```

Si vous souhaitez tester une version téléchargée manuellement, vous pouvez fournir un chemin binaire vers le navigateur via :

```ts
{
    browserName: 'firefox',
    'moz:firefoxOptions': {
        binary: '/Applications/Firefox\ Nightly.app/Contents/MacOS/firefox'
    }
}
```

De plus, si vous souhaitez utiliser un pilote téléchargé manuellement, vous pouvez fournir un chemin binaire vers le pilote via :

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

Lors des tests sur Microsoft Edge, assurez-vous d'avoir la version de navigateur souhaitée installée sur votre machine. Vous pouvez indiquer à WebdriverIO le navigateur à exécuter via :

```ts
{
    browserName: 'msedge',
    'ms:edgeOptions': {
        binary: '/Applications/Microsoft\ Edge\ Canary.app/Contents/MacOS/Microsoft\ Edge\ Canary'
    }
}
```

WebdriverIO téléchargera automatiquement la version de pilote souhaitée en fonction du `browserVersion` défini, par exemple :

```ts
{
    browserName: 'msedge',
    browserVersion: '109' // ou '109.0.1467.0', 'stable', 'dev', 'canary', 'beta'
}
```

De plus, si vous souhaitez utiliser un pilote téléchargé manuellement, vous pouvez fournir un chemin binaire vers le pilote via :

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

Lors des tests sur Safari, assurez-vous d'avoir [Safari Technology Preview](https://developer.apple.com/safari/technology-preview/) installé sur votre machine. Vous pouvez pointer WebdriverIO vers cette version via :

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

Il est conseillé de suivre le [protocole W3C](https://w3c.github.io/webdriver/#dfn-extension-capability) en ce qui concerne la dénomination des capacités, qui nécessite un caractère `:` (deux-points), indiquant un espace de noms spécifique à l'implémentation. Dans vos tests, vous pouvez accéder à votre capacité personnalisée via, par exemple :

```ts
browser.capabilities['custom:caps']
```

Pour assurer la sécurité des types, vous pouvez étendre l'interface de capacité de WebdriverIO via :

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