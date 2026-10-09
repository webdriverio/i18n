---
id: configuration
title: Configuration
description: "Consultez toutes les options de configuration pour WebDriver, WebdriverIO en mode autonome et le testrunner WDIO, y compris tous les hooks du testrunner."
---

Selon le [type de configuration](/docs/setuptypes) (par exemple en utilisant directement les liaisons de protocole, WebdriverIO comme package autonome ou le testrunner WDIO), différents ensembles d'options sont disponibles pour contrôler l'environnement.

## Options WebDriver

Les options suivantes sont définies lors de l'utilisation du package de protocole [`webdriver`](https://www.npmjs.com/package/webdriver) :

### protocol

<Option type="String" default="http">

Protocole à utiliser pour communiquer avec le serveur du driver.

</Option>

### hostname

<Option type="String" default="0.0.0.0">

Hôte de votre serveur de driver.

</Option>

### port

<Option type="Number" default="undefined">

Port sur lequel se trouve votre serveur de driver.

</Option>

### path

<Option type="String" default="/">

Chemin vers le point de terminaison du serveur de driver.

</Option>

### queryParams

<Option type="Object" default="undefined">

Paramètres de requête transmis au serveur de driver.

</Option>

### user

<Option type="String" default="undefined">

Le nom d'utilisateur de votre service cloud (fonctionne uniquement pour les comptes [Sauce Labs](https://saucelabs.com), [Browserstack](https://www.browserstack.com), [TestingBot](https://testingbot.com) ou [TestMu AI](https://www.testmuai.com/)). Si cette option est définie, WebdriverIO configurera automatiquement les options de connexion pour vous. Si vous n'utilisez pas de fournisseur cloud, cette option peut servir à s'authentifier auprès de tout autre backend WebDriver.

</Option>

### key

<Option type="String" default="undefined">

La clé d'accès ou clé secrète de votre service cloud (fonctionne uniquement pour les comptes [Sauce Labs](https://saucelabs.com), [Browserstack](https://www.browserstack.com), [TestingBot](https://testingbot.com) ou [TestMu AI](https://www.testmuai.com/)). Si cette option est définie, WebdriverIO configurera automatiquement les options de connexion pour vous. Si vous n'utilisez pas de fournisseur cloud, cette option peut servir à s'authentifier auprès de tout autre backend WebDriver.

</Option>

### capabilities

<Option type="Object" default="null">

Définit les capabilities que vous souhaitez exécuter dans votre session WebDriver. Consultez le [protocole WebDriver](https://w3c.github.io/webdriver/#capabilities) pour plus de détails.

En plus des capabilities basées sur WebDriver, vous pouvez appliquer des options spécifiques au navigateur et au fournisseur qui permettent une configuration plus poussée du navigateur ou de l'appareil distant. Celles-ci sont documentées dans la documentation correspondante du fournisseur, par exemple :

- `goog:chromeOptions` : pour [Google Chrome](https://chromedriver.chromium.org/capabilities#h.p_ID_106)
- `moz:firefoxOptions` : pour [Mozilla Firefox](https://firefox-source-docs.mozilla.org/testing/geckodriver/Capabilities.html)
- `ms:edgeOptions` : pour [Microsoft Edge](https://docs.microsoft.com/en-us/microsoft-edge/webdriver-chromium/capabilities-edge-options#using-the-edgeoptions-class)
- `sauce:options` : pour [Sauce Labs](https://docs.saucelabs.com/dev/test-configuration-options/#desktop-and-mobile-capabilities-sauce-specific--optional)
- `bstack:options` : pour [BrowserStack](https://www.browserstack.com/automate/capabilities?tag=selenium-4#)
- `selenoid:options` : pour [Selenoid](https://github.com/aerokube/selenoid/blob/master/docs/special-capabilities.adoc)

De plus, un outil utile est l'[Automated Test Configurator](https://docs.saucelabs.com/basics/platform-configurator/) de Sauce Labs, qui vous aide à créer cet objet en sélectionnant d'un clic les capabilities souhaitées.

</Option>
**Exemple :**

```js
{
    browserName: 'chrome', // options : `chrome`, `edge`, `firefox`, `safari`
    browserVersion: '27.0', // version du navigateur
    platformName: 'Windows 10' // plateforme du système d'exploitation
}
```

Si vous exécutez des tests web ou natifs sur des appareils mobiles, `capabilities` diffère du protocole WebDriver. Consultez la [documentation Appium](https://appium.io/docs/en/latest/guides/caps/) pour plus de détails.

### logLevel

<Option type="String" default="info" values="trace | debug | info | warn | error | silent">

Niveau de verbosité des logs.

</Option>

### outputDir

<Option type="String" default="null">

Répertoire où stocker tous les fichiers de log du testrunner (y compris les logs des reporters et les logs `wdio`). S'il n'est pas défini, tous les logs sont envoyés vers `stdout`. Étant donné que la plupart des reporters sont conçus pour écrire dans `stdout`, il est recommandé de n'utiliser cette option que pour des reporters spécifiques pour lesquels il est plus pertinent d'écrire le rapport dans un fichier (comme le reporter `junit`, par exemple).

En mode autonome, le seul log généré par WebdriverIO sera le log `wdio`.

</Option>

### connectionRetryTimeout

<Option type="Number" default="120000">

Délai d'expiration pour toute requête WebDriver vers un driver ou une grille.

</Option>

### connectionRetryCount

<Option type="Number" default="3">

Nombre maximal de nouvelles tentatives de requête vers le serveur Selenium.

</Option>

### bidiResponseTimeout

<Option type="Number" default="180000">

Délai d'expiration (en ms) pour qu'une commande WebDriver Bidi reçoive une réponse du navigateur. Augmentez cette valeur si vous exécutez des commandes, par exemple [`execute`](/docs/api/browser/execute), qui prennent légitimement plus de temps que la valeur par défaut pour se résoudre ; sinon, WebdriverIO cesse d'attendre avant que le navigateur n'ait terminé.

</Option>

### agent

<Option type="Object" default={`{
    http: new http.Agent({ keepAlive: true }),
    https: new https.Agent({ keepAlive: true })
}`}>

Vous permet d'utiliser un [agent](https://www.npmjs.com/package/got#agent) ` http`/`https`/`http2` personnalisé pour effectuer les requêtes.

</Option>

### headers

<Option type="Object" default={`{}`}>

Spécifiez des `headers` personnalisés à transmettre dans chaque requête WebDriver. Si votre Selenium Grid nécessite une authentification Basic, nous vous recommandons de transmettre un en-tête `Authorization` via cette option pour authentifier vos requêtes WebDriver, par exemple :

```ts wdio.conf.ts
import { Buffer } from 'buffer';
// Lire le nom d'utilisateur et le mot de passe depuis les variables d'environnement
const username = process.env.SELENIUM_GRID_USERNAME;
const password = process.env.SELENIUM_GRID_PASSWORD;

// Combiner le nom d'utilisateur et le mot de passe avec un deux-points comme séparateur
const credentials = `${username}:${password}`;
// Encoder les identifiants en Base64
const encodedCredentials = Buffer.from(credentials).toString('base64');

export const config: WebdriverIO.Config = {
    // ...
    headers: {
        Authorization: `Basic ${encodedCredentials}`
    }
    // ...
}
```

</Option>

### transformRequest

<Option type="(RequestOptions) => RequestOptions" default="none">

Fonction interceptant les [options de requête HTTP](https://github.com/sindresorhus/got#options) avant qu'une requête WebDriver ne soit effectuée

</Option>

### transformResponse

<Option type="(Response, RequestOptions) => Response" default="none">

Fonction interceptant les objets de réponse HTTP après l'arrivée d'une réponse WebDriver. La fonction reçoit l'objet de réponse original comme premier argument et les `RequestOptions` correspondantes comme second argument.

</Option>

### strictSSL

<Option type="Boolean" default="true">

Indique s'il est requis que le certificat SSL soit valide.
Cette option peut être définie via les variables d'environnement `STRICT_SSL` ou `strict_ssl`.

</Option>

### enableDirectConnect

<Option type="Boolean" default="true">

Indique s'il faut activer la [fonctionnalité de connexion directe d'Appium](https://appiumpro.com/editions/86-connecting-directly-to-appium-hosts-in-distributed-environments).
Elle n'a aucun effet si la réponse ne contient pas les clés appropriées alors que l'option est activée.

</Option>

### cacheDir

<Option type="String" default="process.env.WEBDRIVER_CACHE_DIR || os.tmpdir()">

Le chemin vers la racine du répertoire de cache. Ce répertoire est utilisé pour stocker tous les drivers téléchargés lors d'une tentative de démarrage de session.

</Option>

### maskingPatterns

<Option type="String" default="undefined">

Pour une journalisation plus sécurisée, les expressions régulières définies avec `maskingPatterns` peuvent masquer les informations sensibles dans les logs.
 - Le format de la chaîne est une expression régulière avec ou sans flags (par exemple `/.../i`), séparées par des virgules pour plusieurs expressions régulières.
 - Pour plus de détails sur les motifs de masquage, consultez la [section Masking Patterns du README de WDIO Logger](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-logger/README.md#masking-patterns).

</Option>
**Exemple :**

```js
{
    maskingPatterns: '/--key=([^ ]*)/i,/RESULT (.*)/'
}
```

## WebdriverIO

Les options suivantes (y compris celles listées ci-dessus) peuvent être utilisées avec WebdriverIO en mode autonome :

### automationProtocol

<Option type="String" default="webdriver">

Définissez le protocole que vous souhaitez utiliser pour l'automatisation de votre navigateur. Actuellement, seul [`webdriver`](https://www.npmjs.com/package/webdriver) est pris en charge, car il s'agit de la principale technologie d'automatisation de navigateur utilisée par WebdriverIO.

Si vous souhaitez automatiser le navigateur à l'aide d'une autre technologie d'automatisation, assurez-vous de définir cette propriété sur un chemin qui résout vers un module respectant l'interface suivante :

```ts
import type { Capabilities } from '@wdio/types';
import type { Client, AttachOptions } from 'webdriver';

export default class YourAutomationLibrary {
    /**
     * Démarre une session d'automatisation et renvoie une [monade](https://github.com/webdriverio/webdriverio/blob/940cd30939864bdbdacb2e94ee6e8ada9b1cc74c/packages/wdio-utils/src/monad.ts) WebdriverIO
     * avec les commandes d'automatisation correspondantes. Voir le package [webdriver](https://www.npmjs.com/package/webdriver)
     * comme implémentation de référence
     *
     * @param {Capabilities.RemoteConfig} options options WebdriverIO
     * @param {Function} hook permettant de modifier le client avant qu'il ne soit renvoyé par la fonction
     * @param {PropertyDescriptorMap} userPrototype permet à l'utilisateur d'ajouter des commandes de protocole personnalisées
     * @param {Function} customCommandWrapper permet de modifier l'exécution des commandes
     * @returns une instance de client compatible avec WebdriverIO
     */
    static newSession(
        options: Capabilities.RemoteConfig,
        modifier?: (...args: any[]) => any,
        userPrototype?: PropertyDescriptorMap,
        customCommandWrapper?: (...args: any[]) => any
    ): Promise<Client>;

    /**
     * permet à l'utilisateur de s'attacher à des sessions existantes
     * @optional
     */
    static attachToSession(
        options?: AttachOptions,
        modifier?: (...args: any[]) => any, userPrototype?: {},
        commandWrapper?: (...args: any[]) => any
    ): Client;

    /**
     * Modifie l'identifiant de session de l'instance et les capabilities du navigateur pour la nouvelle session
     * directement dans l'objet navigateur transmis
     *
     * @optional
     * @param   {object} instance  l'objet obtenu à partir d'une nouvelle session de navigateur.
     * @returns {string}           le nouvel identifiant de session du navigateur
     */
    static reloadSession(
        instance: Client,
        newCapabilities?: WebdriverIO.Capabilitie
    ): Promise<string>;
}
```

</Option>

### baseUrl

<Option type="String" default="null">

Raccourcissez les appels à la commande `url` en définissant une URL de base.
- Si votre paramètre `url` commence par `/`, alors `baseUrl` est ajoutée en préfixe (à l'exception du chemin de `baseUrl`, si elle en possède un).
- Si votre paramètre `url` ne commence ni par un schéma ni par `/` (comme `some/path`), alors la `baseUrl` complète est directement ajoutée en préfixe.

</Option>

### waitforTimeout

<Option type="Number" default="5000">

Délai d'expiration par défaut pour toutes les commandes `waitFor*`. (Notez le `f` minuscule dans le nom de l'option.) Ce délai affecte __uniquement__ les commandes commençant par `waitFor*` et leur temps d'attente par défaut.

Pour augmenter le délai d'expiration d'un _test_, veuillez consulter la documentation du framework.

</Option>

### waitforInterval

<Option type="Number" default="100">

Intervalle par défaut utilisé par toutes les commandes `waitFor*` pour vérifier si un état attendu (par exemple, la visibilité) a changé.

</Option>

### strictSelectors

<Option type="Boolean" default="true">

Fait en sorte que la commande [`$`](/docs/api/browser/$) lève une `StrictSelectorError` lorsque le sélecteur donné correspond à plus d'un élément, au lieu d'utiliser silencieusement la première correspondance. `$$` n'est pas concerné.

Vous pouvez désactiver ce comportement pour une seule requête en passant `{ strict: false }` comme second argument, par exemple `$('button', { strict: false })`.

Consultez le guide des [Sélecteurs](/docs/selectors#strict-mode) pour plus de détails.

</Option>

### maxSpyCollectedBodySize

<Option type="Number" default="10485760 (10MB)">

Taille maximale du corps de réponse (en octets) pouvant être renvoyé lors de l'utilisation de la commande [`mock`](/docs/api/browser/mock). Utilisez `0` pour désactiver la collecte des données du payload espionné.

</Option>

### region

<Option type="String" default="us" values="us | eu | us-west-1 | eu-central-1 | us-east-4 | asia-south-2 | staging">

Si vous exécutez vos tests sur Sauce Labs, vous pouvez choisir de les exécuter dans différents centres de données.
Utilisez les identifiants de région courts `us` (par défaut, correspond à `us-west-1`) ou `eu` (correspond à `eu-central-1`), ou directement les noms de région complets.

__Remarque :__ Cela n'a d'effet que si vous fournissez des options `user` et `key` associées à votre compte Sauce Labs.

</Option>
*(uniquement pour les VM et/ou les émulateurs/simulateurs, à l'exception de `us-east-4` et `asia-south-2` qui hébergent uniquement des appareils réels)*

## Options du testrunner

Les options suivantes (y compris celles listées ci-dessus) sont définies uniquement pour l'exécution de WebdriverIO avec le testrunner WDIO :

### specs

<Option type="(String | String[])[]" default="[]">

Définit les specs pour l'exécution des tests. Vous pouvez soit spécifier un motif glob pour faire correspondre plusieurs fichiers à la fois, soit regrouper un glob ou un ensemble de chemins dans un tableau pour les exécuter dans un seul processus worker. Tous les chemins sont considérés comme relatifs au chemin du fichier de configuration.

</Option>

### exclude

<Option type="String[]" default="[]">

Exclut des specs de l'exécution des tests. Tous les chemins sont considérés comme relatifs au chemin du fichier de configuration.

</Option>

### suites

<Option type="Object" default={`{}`}>

Un objet décrivant diverses suites, que vous pouvez ensuite spécifier avec l'option `--suite` de la CLI `wdio`.

</Option>

### capabilities

<Option type="Object|Object[]" default={`[{ 'wdio:maxInstances': 5, browserName: 'firefox' }]`}>

Identique à la section `capabilities` décrite ci-dessus, avec en plus la possibilité de spécifier soit un objet [multi-remote](/docs/multiremote), soit plusieurs sessions WebDriver dans un tableau pour une exécution parallèle.

Vous pouvez appliquer les mêmes capabilities spécifiques au fournisseur et au navigateur que celles définies [ci-dessus](/docs/configuration#capabilities).

</Option>

### maxInstances

<Option type="Number" default="100">

Nombre maximal total de workers s'exécutant en parallèle.

__Remarque :__ ce nombre peut atteindre `100` lorsque les tests sont exécutés chez des fournisseurs externes, par exemple sur les machines de Sauce Labs. Dans ce cas, les tests ne sont pas exécutés sur une seule machine, mais plutôt sur plusieurs VM. Si les tests doivent être exécutés sur une machine de développement locale, utilisez un nombre plus raisonnable, comme `3`, `4` ou `5`. Il s'agit essentiellement du nombre de navigateurs qui seront démarrés simultanément et exécuteront vos tests en même temps ; cela dépend donc de la quantité de RAM de votre machine et du nombre d'autres applications qui y sont en cours d'exécution.

Vous pouvez également appliquer `maxInstances` dans vos objets de capabilities à l'aide de la capability `wdio:maxInstances`. Cela limitera le nombre de sessions parallèles pour cette capability particulière.

</Option>

### maxInstancesPerCapability

<Option type="Number" default="100">

Nombre maximal total de workers s'exécutant en parallèle par capability.

</Option>

### injectGlobals

<Option type="Boolean" default="true">

Insère les variables globales de WebdriverIO (par exemple `browser`, `$` et `$$`) dans l'environnement global.
Si vous définissez cette option sur `false`, vous devez les importer depuis `@wdio/globals`, par exemple :

```ts
import { browser, $, $$, expect } from '@wdio/globals'
```

Remarque : WebdriverIO ne gère pas l'injection des variables globales spécifiques au framework de test.

</Option>

### bail

<Option type="Number" default="0 (don't bail; run all tests)">

Si vous souhaitez que votre exécution de tests s'arrête après un nombre spécifique d'échecs, utilisez `bail`.
(La valeur par défaut est `0`, ce qui exécute tous les tests quoi qu'il arrive.) **Remarque :** Dans ce contexte, un test correspond à l'ensemble des tests d'un même fichier de spec (avec Mocha ou Jasmine) ou à l'ensemble des étapes d'un fichier de feature (avec Cucumber). Si vous souhaitez contrôler le comportement de `bail` au sein des tests d'un seul fichier de test, consultez les options de [framework](frameworks) disponibles.

</Option>

### specFileRetries

<Option type="Number" default="0">

Le nombre de nouvelles tentatives pour un fichier de spec entier lorsqu'il échoue dans son ensemble.

</Option>

### specFileRetriesDelay

<Option type="Number" default="0">

Délai en secondes entre les nouvelles tentatives d'exécution d'un fichier de spec

</Option>

### specFileRetriesDeferred

<Option type="Boolean" default="true">

Indique si les fichiers de spec à réessayer doivent l'être immédiatement ou être reportés à la fin de la file d'attente.

</Option>

### groupLogsByTestSpec

<Option type="Boolean" default="false">

Choisissez le mode d'affichage des logs.

Si la valeur est `false`, les logs des différents fichiers de test seront affichés en temps réel. Veuillez noter que cela peut entraîner un mélange des sorties de logs de différents fichiers lors d'une exécution en parallèle.

Si la valeur est `true`, les sorties de logs seront regroupées par spec de test et affichées uniquement lorsque la spec de test sera terminée.

Par défaut, la valeur est `false`, les logs sont donc affichés en temps réel.

</Option>

### autoAssertOnTestEnd

<Option type="Boolean" default="true">

Contrôle si WebdriverIO vérifie automatiquement toutes les assertions souples (soft assertions) à la fin de chaque test. Lorsque la valeur est `true`, toutes les assertions souples accumulées seront automatiquement vérifiées et feront échouer le test si l'une d'elles a échoué. Lorsque la valeur est `false`, vous devez appeler manuellement la méthode assert pour vérifier les assertions souples.

</Option>

### services

<Option type="String[]|Object[]" default="[]">

Les services prennent en charge une tâche spécifique dont vous ne voulez pas vous occuper. Ils enrichissent votre configuration de test pratiquement sans effort.

</Option>

### framework

<Option type="String" default="mocha" values="mocha | jasmine | cucumber">

Définit le framework de test à utiliser par le testrunner WDIO.

</Option>

### mochaOpts, jasmineOpts and cucumberOpts

<Option type="Object" default={`{ timeout: 10000 }`}>

Options spécifiques au framework. Consultez la documentation de l'adaptateur de framework pour connaître les options disponibles. Pour en savoir plus, consultez [Frameworks](frameworks).

</Option>

### cucumberFeaturesWithLineNumbers

<Option type="String[]" default="[]">

Liste des features Cucumber avec numéros de ligne (lorsque vous [utilisez le framework Cucumber](./Frameworks.md#using-cucumber)).

</Option>

### reporters

<Option type="String[]|Object[]" default="[]">

Liste des reporters à utiliser. Un reporter peut être soit une chaîne de caractères, soit un tableau de la forme
`['reporterName', { /* reporter options */}]` où le premier élément est une chaîne contenant le nom du reporter et le second élément un objet contenant les options du reporter.

</Option>
Exemple :

```js
reporters: [
    'dot',
    'spec'
    ['junit', {
        outputDir: `${__dirname}/reports`,
        otherOption: 'foobar'
    }]
]
```

### reporterSyncInterval

<Option type="Number" default="100 (ms)">

Détermine l'intervalle auquel les reporters doivent vérifier s'ils sont synchronisés lorsqu'ils transmettent leurs logs de manière asynchrone (par exemple si les logs sont envoyés en continu à un fournisseur tiers).

</Option>

### reporterSyncTimeout

<Option type="Number" default="5000 (ms)">

Détermine le temps maximal dont disposent les reporters pour terminer l'envoi de tous leurs logs avant qu'une erreur ne soit levée par le testrunner.

</Option>

### execArgv

<Option type="String[]" default="null">

Arguments Node à spécifier lors du lancement des processus enfants.

</Option>

### cpuProf

<Option type="Boolean" default="false">

Active le profilage CPU pour le processus worker. Le profil sera généré automatiquement à la fin du processus worker.

</Option>

### heapProf

<Option type="Boolean" default="false">

Active le profilage du tas (heap) pour le processus worker. Le snapshot sera généré automatiquement à la fin du processus worker (utilise le profileur de tas par échantillonnage).

</Option>

### profileOutputDir

<Option type="String" default="./profiles">

Répertoire dans lequel les profils CPU (`.cpuprofile`) et les profils de tas (`.heapprofile`) seront enregistrés.

</Option>

### filesToWatch

<Option type="String[]" default="[]">

Une liste de motifs de chaînes prenant en charge les globs, qui indiquent au testrunner de surveiller également d'autres fichiers, par exemple des fichiers de l'application, lorsqu'il est exécuté avec le flag `--watch`. Par défaut, le testrunner surveille déjà tous les fichiers de spec.

</Option>

### updateSnapshots

<Option type="'new' | 'all' | 'none'" default="none if not provided and tests run in CI, new if not provided, otherwise what's been provided">

À définir si vous souhaitez mettre à jour vos snapshots. Idéalement utilisé comme paramètre de la CLI, par exemple `wdio run wdio.conf.js --s`.

</Option>

### resolveSnapshotPath

<Option type="(testPath: string, snapExtension: string) => string" default="stores snapshot files in __snapshots__ directory next to test file">

Remplace le chemin par défaut des snapshots. Par exemple, pour stocker les snapshots à côté des fichiers de test.

```ts title="wdio.conf.ts"
export const config: WebdriverIO.Config = {
    resolveSnapshotPath: (testPath, snapExtension) => testPath + snapExtension,
}
```

</Option>

### tsConfigPath

<Option type="String" default="null">

WDIO utilise `tsx` pour compiler les fichiers TypeScript. Votre TSConfig est automatiquement détecté à partir du répertoire de travail courant, mais vous pouvez spécifier un chemin personnalisé ici ou en définissant la variable d'environnement TSX_TSCONFIG_PATH.

Consultez la documentation de `tsx` : https://tsx.is/dev-api/node-cli#custom-tsconfig-json-path

</Option>

### displayServerEnabled

<Option type="Boolean" default="true">

Démarre un affichage virtuel pour l'exécution sous Linux lorsque ni `DISPLAY` ni `WAYLAND_DISPLAY` ne sont définis. Définissez cette option sur `false` lorsque vous exécutez vos tests en mode headless ou uniquement sur un service cloud ou une grille distante. Elle contrôle uniquement le démarrage d'un serveur d'affichage : si seul `WAYLAND_DISPLAY` est défini, le testrunner définit tout de même `XDG_SESSION_TYPE`, `GDK_BACKEND` et `ELECTRON_OZONE_PLATFORM_HINT` sur `wayland` pour l'exécution. Voir [Headless et serveurs d'affichage](/docs/headless-and-display-servers).

</Option>

### displayServer

<Option type="String" default="auto" values="auto | wayland | xvfb">

Le serveur d'affichage à démarrer. `auto` essaie Weston et se rabat sur Xvfb lorsque Weston est absent ou ne parvient pas à démarrer. `wayland` et `xvfb` n'essaient que le serveur correspondant.

</Option>

### displayServerAutoInstall

<Option type="Boolean" default="false">

Installe un serveur d'affichage manquant à l'aide du gestionnaire de paquets du système lorsqu'aucun serveur installé ne démarre.

</Option>

### displayServerAutoInstallMode

<Option type="String" default="sudo" values="root | sudo">

Mode d'exécution de l'installation intégrée : `root` n'installe que lors d'une exécution en tant que root, `sudo` utilise `sudo -n` en mode non interactif lorsque l'exécution n'est pas en tant que root, ou installe sans `sudo` lorsque celui-ci n'est pas installé.

</Option>

### displayServerAutoInstallCommand

<Option type="String | String[]">

Une commande à exécuter à la place de l'installation intégrée, telle quelle et sans `sudo`. Elle ne s'exécute qu'avec `displayServerAutoInstall: true`. Une chaîne de caractères s'exécute dans un shell, un tableau s'exécute sans shell. Avec `auto`, elle s'exécute d'abord pour Weston, puis à nouveau pour Xvfb uniquement si Weston n'est toujours pas disponible ou ne parvient pas à démarrer, et que Xvfb est toujours absent. Définissez `displayServer` sur le serveur qu'elle installe pour éviter la tentative avec l'autre serveur.

</Option>

### displayServerWidth

<Option type="Number" default="1920">

Largeur d'écran de l'affichage virtuel en pixels.

</Option>

### displayServerHeight

<Option type="Number" default="1080">

Hauteur d'écran de l'affichage virtuel en pixels.

</Option>

### displayServerDepth

<Option type="Number" default="24">

Profondeur de couleur de l'affichage virtuel. Xvfb uniquement.

</Option>

## Hooks

Le testrunner WDIO vous permet de définir des hooks déclenchés à des moments précis du cycle de vie des tests. Cela permet d'effectuer des actions personnalisées (par exemple, prendre une capture d'écran si un test échoue).

Chaque hook reçoit en paramètre des informations spécifiques sur le cycle de vie (par exemple, des informations sur la suite de tests ou le test). Pour en savoir plus sur toutes les propriétés des hooks, consultez [notre exemple de configuration](https://github.com/webdriverio/webdriverio/blob/master/examples/wdio.conf.js#L183-L326).

**Remarque :** Certains hooks (`onPrepare`, `onWorkerStart`, `onWorkerEnd` et `onComplete`) sont exécutés dans un processus différent et ne peuvent donc partager aucune donnée globale avec les autres hooks qui s'exécutent dans le processus worker.

### onPrepare

S'exécute une fois avant le lancement de tous les workers.

Paramètres :

- `config` (`object`) : objet de configuration WebdriverIO
- `param` (`object[]`) : liste des détails des capabilities

### onWorkerStart

S'exécute avant la création d'un processus worker et peut être utilisé pour initialiser un service spécifique pour ce worker ainsi que pour modifier les environnements d'exécution de manière asynchrone.

Paramètres :

- `cid` (`string`) : identifiant de capability (par exemple 0-0)
- `caps` (`object`) : contient les capabilities de la session qui sera créée dans le worker
- `specs` (`string[]`) : specs à exécuter dans le processus worker
- `args` (`object`) : objet qui sera fusionné avec la configuration principale une fois le worker initialisé
- `execArgv` (`string[]`) : liste d'arguments sous forme de chaînes transmis au processus worker

### onWorkerEnd

S'exécute juste après la fin d'un processus worker.

Paramètres :

- `cid` (`string`) : identifiant de capability (par exemple 0-0)
- `exitCode` (`number`) : 0 - succès, 1 - échec. Un worker terminé par un signal renvoie à la place `128` + le numéro du signal, par exemple `139` pour un `SIGSEGV`
- `specs` (`string[]`) : specs à exécuter dans le processus worker
- `retries` (`number`) : nombre de nouvelles tentatives au niveau de la spec utilisées, tel que défini dans [_« Ajouter des nouvelles tentatives par fichier de spec »_](./Retry.md#add-retries-on-a-per-specfile-basis)
- `signal` (`string`) : signal ayant terminé le worker, par exemple `SIGSEGV`, ou `null` s'il s'est terminé de lui-même

### beforeSession

S'exécute juste avant l'initialisation de la session webdriver et du framework de test. Il vous permet de manipuler les configurations en fonction de la capability ou de la spec.

Paramètres :

- `config` (`object`) : objet de configuration WebdriverIO
- `caps` (`object`) : contient les capabilities de la session qui sera créée dans le worker
- `specs` (`string[]`) : specs à exécuter dans le processus worker

### before

S'exécute avant le début de l'exécution des tests. À ce stade, vous avez accès à toutes les variables globales comme `browser`. C'est l'endroit idéal pour définir des commandes personnalisées.

Paramètres :

- `caps` (`object`) : contient les capabilities de la session qui sera créée dans le worker
- `specs` (`string[]`) : specs à exécuter dans le processus worker
- `browser` (`object`) : instance de la session navigateur/appareil créée

### beforeSuite

Hook exécuté avant le démarrage de la suite (dans Mocha/Jasmine uniquement)

Paramètres :

- `suite` (`object`) : détails de la suite

### beforeHook

Hook exécuté *avant* le démarrage d'un hook au sein de la suite (par exemple, s'exécute avant l'appel de beforeEach dans Mocha)

Paramètres :

- `test` (`object`) : détails du test
- `context` (`object`) : contexte du test (représente l'objet World dans Cucumber)

### afterHook

Hook exécuté *après* la fin d'un hook au sein de la suite (par exemple, s'exécute après l'appel de afterEach dans Mocha)

Paramètres :

- `test` (`object`) : détails du test
- `context` (`object`) : contexte du test (représente l'objet World dans Cucumber)
- `result` (`object`) : résultat du hook (contient les propriétés `error`, `result`, `duration`, `passed`, `retries`)

### beforeTest

Fonction à exécuter avant un test (dans Mocha/Jasmine uniquement).

Paramètres :

- `test` (`object`) : détails du test
- `context` (`object`) : objet de portée avec lequel le test a été exécuté

### beforeCommand

S'exécute avant l'exécution d'une commande WebdriverIO.

Paramètres :

- `commandName` (`string`) : nom de la commande
- `args` (`*`) : arguments que la commande recevrait

### afterCommand

S'exécute après l'exécution d'une commande WebdriverIO.

Paramètres :

- `commandName` (`string`) : nom de la commande
- `args` (`*`) : arguments que la commande recevrait
- `result` (`*`) : résultat de la commande
- `error` (`Error`) : objet d'erreur, le cas échéant

### afterTest

Fonction à exécuter après la fin d'un test (dans Mocha/Jasmine).

Paramètres :

- `test` (`object`) : détails du test
- `context` (`object`) : objet de portée avec lequel le test a été exécuté
- `result.error` (`Error`) : objet d'erreur si le test échoue, sinon `undefined`
- `result.result` (`Any`) : objet renvoyé par la fonction de test
- `result.duration` (`Number`) : durée du test
- `result.passed` (`Boolean`) : true si le test a réussi, sinon false
- `result.retries` (`Object`) : informations sur les nouvelles tentatives liées à un test individuel, telles que définies pour [Mocha et Jasmine](./Retry.md#rerun-single-tests-in-jasmine-or-mocha) ainsi que pour [Cucumber](./Retry.md#rerunning-in-cucumber), par exemple `{ attempts: 0, limit: 0 }`, voir
- `result` (`object`) : résultat du hook (contient les propriétés `error`, `result`, `duration`, `passed`, `retries`)

### afterSuite

Hook exécuté après la fin de la suite (dans Mocha/Jasmine uniquement)

Paramètres :

- `suite` (`object`) : détails de la suite

### after

S'exécute une fois tous les tests terminés. Vous avez toujours accès à toutes les variables globales du test.

Paramètres :

- `result` (`number`) : 0 - test réussi, 1 - test échoué
- `caps` (`object`) : contient les capabilities de la session qui sera créée dans le worker
- `specs` (`string[]`) : specs à exécuter dans le processus worker

### afterSession

S'exécute juste après la fin de la session webdriver.

Paramètres :

- `config` (`object`) : objet de configuration WebdriverIO
- `caps` (`object`) : contient les capabilities de la session qui sera créée dans le worker
- `specs` (`string[]`) : specs à exécuter dans le processus worker

### onComplete

S'exécute après l'arrêt de tous les workers, lorsque le processus est sur le point de se terminer. Une erreur levée dans le hook onComplete entraînera l'échec de l'exécution des tests.

Paramètres :

- `exitCode` (`number`) : 0 - succès, 1 - échec
- `config` (`object`) : objet de configuration WebdriverIO
- `caps` (`object`) : contient les capabilities de la session qui sera créée dans le worker
- `result` (`object`) : objet de résultats contenant les résultats des tests

### onReload

S'exécute lorsqu'un rafraîchissement se produit.

Paramètres :

- `oldSessionId` (`string`) : identifiant de l'ancienne session
- `newSessionId` (`string`) : identifiant de la nouvelle session

### beforeFeature

S'exécute avant une Feature Cucumber.

Paramètres :

- `uri` (`string`) : chemin vers le fichier de feature
- `feature` ([`GherkinDocument.IFeature`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/json-to-messages/javascript/src/cucumber-generic/JSONSchema.ts#L8-L17)) : objet feature de Cucumber

### afterFeature

S'exécute après une Feature Cucumber.

Paramètres :

- `uri` (`string`) : chemin vers le fichier de feature
- `feature` ([`GherkinDocument.IFeature`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/json-to-messages/javascript/src/cucumber-generic/JSONSchema.ts#L8-L17)) : objet feature de Cucumber

### beforeScenario

S'exécute avant un Scenario Cucumber.

Paramètres :

- `world` ([`ITestCaseHookParameter`](https://github.com/cucumber/cucumber-js/blob/ac124f7b2be5fa54d904c7feac077a2657b19440/src/support_code_library_builder/types.ts#L10-L15)) : objet world contenant des informations sur le pickle et l'étape de test
- `context` (`object`) : objet World de Cucumber

### afterScenario

S'exécute après un Scenario Cucumber.

Paramètres :

- `world` ([`ITestCaseHookParameter`](https://github.com/cucumber/cucumber-js/blob/ac124f7b2be5fa54d904c7feac077a2657b19440/src/support_code_library_builder/types.ts#L10-L15)) : objet world contenant des informations sur le pickle et l'étape de test
- `result` (`object`) : objet de résultats contenant les résultats du scénario
- `result.passed` (`boolean`) : true si le scénario a réussi
- `result.error` (`string`) : pile d'erreur si le scénario a échoué
- `result.duration` (`number`) : durée du scénario en millisecondes
- `context` (`object`) : objet World de Cucumber

### beforeStep

S'exécute avant une Step Cucumber.

Paramètres :

- `step` ([`Pickle.IPickleStep`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/messages/jsonschema/Pickle.json#L20-L49)) : objet step de Cucumber
- `scenario` ([`IPickle`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/messages/jsonschema/Pickle.json#L137-L175)) : objet scenario de Cucumber
- `context` (`object`) : objet World de Cucumber

### afterStep

S'exécute après une Step Cucumber.

Paramètres :

- `step` ([`Pickle.IPickleStep`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/messages/jsonschema/Pickle.json#L20-L49)) : objet step de Cucumber
- `scenario` ([`IPickle`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/messages/jsonschema/Pickle.json#L137-L175)) : objet scenario de Cucumber
- `result` : (`object`) : objet de résultats contenant les résultats de l'étape
- `result.passed` (`boolean`) : true si le scénario a réussi
- `result.error` (`string`) : pile d'erreur si le scénario a échoué
- `result.duration` (`number`) : durée du scénario en millisecondes
- `context` (`object`) : objet World de Cucumber

### beforeAssertion

Hook exécuté avant qu'une assertion WebdriverIO n'ait lieu.

Paramètres :

- `params` : informations sur l'assertion
- `params.matcherName` (`string`) : nom du matcher appelé par le test (par exemple `toHaveTitle`). Pour un alias, il s'agit du nom de l'alias (par exemple `toBeExisting`, et non `toExist`).
- `params.expectedValue` : valeur transmise au matcher
- `params.options` : options de l'assertion

### afterAssertion

Hook exécuté après qu'une assertion WebdriverIO a eu lieu.

Paramètres :

- `params` : informations sur l'assertion
- `params.matcherName` (`string`) : nom du matcher appelé par le test (par exemple `toHaveTitle`). Pour un alias, il s'agit du nom de l'alias (par exemple `toBeExisting`, et non `toExist`).
- `params.expectedValue` : valeur transmise au matcher
- `params.options` : options de l'assertion
- `params.result` (`object`) : résultat du matcher, avec `pass` (`boolean`) et `message()`. `pass` vaut `true` lorsque la valeur correspond à la valeur attendue, y compris avec `.not` : avec `.not`, l'assertion réussit lorsque `pass` vaut `false`.