---
id: configuration
title: Configuration
---

Selon le [type d'installation](/docs/setuptypes) (par exemple, en utilisant les liaisons brutes du protocole, WebdriverIO en tant que package autonome ou le testrunner WDIO), il existe un ensemble différent d'options disponibles pour contrôler l'environnement.

## Options WebDriver

Les options suivantes sont définies lors de l'utilisation du package de protocole [`webdriver`](https://www.npmjs.com/package/webdriver) :

### protocol

Protocole à utiliser lors de la communication avec le serveur de pilote.

Type : `String`<br />
Défaut : `http`

### hostname

Hôte de votre serveur de pilote.

Type : `String`<br />
Défaut : `0.0.0.0`

### port

Port sur lequel se trouve votre serveur de pilote.

Type : `Number`<br />
Défaut : `undefined`

### path

Chemin vers le point de terminaison du serveur de pilote.

Type : `String`<br />
Défaut : `/`

### queryParams

Paramètres de requête qui sont propagés au serveur de pilote.

Type : `Object`<br />
Défaut : `undefined`

### user

Votre nom d'utilisateur de service cloud (fonctionne uniquement pour les comptes [Sauce Labs](https://saucelabs.com), [Browserstack](https://www.browserstack.com), [TestingBot](https://testingbot.com) ou [TestMu AI](https://www.testmuai.com/)). Si défini, WebdriverIO définira automatiquement les options de connexion pour vous. Si vous n'utilisez pas de fournisseur cloud, cela peut être utilisé pour authentifier tout autre backend WebDriver.

Type : `String`<br />
Défaut : `undefined`

### key

Votre clé d'accès ou clé secrète du service cloud (fonctionne uniquement pour les comptes [Sauce Labs](https://saucelabs.com), [Browserstack](https://www.browserstack.com), [TestingBot](https://testingbot.com) ou [TestMu AI](https://www.testmuai.com/)). Si défini, WebdriverIO définira automatiquement les options de connexion pour vous. Si vous n'utilisez pas de fournisseur cloud, cela peut être utilisé pour authentifier tout autre backend WebDriver.

Type : `String`<br />
Défaut : `undefined`

### capabilities

Définit les capacités que vous souhaitez exécuter dans votre session WebDriver. Consultez le [Protocole WebDriver](https://w3c.github.io/webdriver/#capabilities) pour plus de détails. Si vous exécutez un pilote plus ancien qui ne prend pas en charge le protocole WebDriver, vous devrez utiliser les [capacités JSONWireProtocol](https://github.com/SeleniumHQ/selenium/wiki/DesiredCapabilities) pour exécuter avec succès une session.

Outre les capacités basées sur WebDriver, vous pouvez appliquer des options spécifiques au navigateur et au fournisseur qui permettent une configuration plus approfondie du navigateur distant ou de l'appareil. Celles-ci sont documentées dans les docs correspondants des fournisseurs, par exemple :

- `goog:chromeOptions` : pour [Google Chrome](https://chromedriver.chromium.org/capabilities#h.p_ID_106)
- `moz:firefoxOptions` : pour [Mozilla Firefox](https://firefox-source-docs.mozilla.org/testing/geckodriver/Capabilities.html)
- `ms:edgeOptions` : pour [Microsoft Edge](https://docs.microsoft.com/en-us/microsoft-edge/webdriver-chromium/capabilities-edge-options#using-the-edgeoptions-class)
- `sauce:options` : pour [Sauce Labs](https://docs.saucelabs.com/dev/test-configuration-options/#desktop-and-mobile-capabilities-sauce-specific--optional)
- `bstack:options` : pour [BrowserStack](https://www.browserstack.com/automate/capabilities?tag=selenium-4#)
- `selenoid:options` : pour [Selenoid](https://github.com/aerokube/selenoid/blob/master/docs/special-capabilities.adoc)

De plus, un utilitaire utile est le [Configurateur de test automatisé](https://docs.saucelabs.com/basics/platform-configurator/) de Sauce Labs, qui vous aide à créer cet objet en cliquant sur vos capacités souhaitées.

Type : `Object`<br />
Défaut : `null`

**Exemple :**

```js
{
    browserName: 'chrome', // options: `chrome`, `edge`, `firefox`, `safari`
    browserVersion: '27.0', // version du navigateur
    platformName: 'Windows 10' // plateforme OS
}
```

Si vous exécutez des tests web ou natifs sur des appareils mobiles, `capabilities` diffère du protocole WebDriver. Consultez la [Documentation Appium](https://appium.io/docs/en/latest/guides/caps/) pour plus de détails.

### logLevel

Niveau de verbosité de journalisation.

Type : `String`<br />
Défaut : `info`<br />
Options : `trace` | `debug` | `info` | `warn` | `error` | `silent`

### outputDir

Répertoire pour stocker tous les fichiers journaux du testrunner (y compris les journaux de rapporteur et les journaux `wdio`). Si non défini, tous les journaux sont diffusés vers `stdout`. Comme la plupart des rapporteurs sont conçus pour écrire dans `stdout`, il est recommandé de n'utiliser cette option que pour des rapporteurs spécifiques où il est plus logique de pousser le rapport dans un fichier (comme le rapporteur `junit`, par exemple).

En mode autonome, le seul journal généré par WebdriverIO sera le journal `wdio`.

Type : `String`<br />
Défaut : `null`

### connectionRetryTimeout

Délai d'expiration pour toute requête WebDriver à un pilote ou à une grille.

Type : `Number`<br />
Défaut : `120000`

### connectionRetryCount

Nombre maximal de tentatives de requêtes au serveur Selenium.

Type : `Number`<br />
Défaut : `3`

### agent

Vous permet d'utiliser un `http`/`https`/`http2` [agent](https://www.npmjs.com/package/got#agent) personnalisé pour effectuer des requêtes.

Type : `Object`<br />
Défaut :

```js
{
    http: new http.Agent({ keepAlive: true }),
    https: new https.Agent({ keepAlive: true })
}
```

### headers

Spécifiez des `headers` personnalisés à transmettre à chaque requête WebDriver. Si votre grille Selenium nécessite une authentification de base, nous vous recommandons de passer un en-tête `Authorization` via cette option pour authentifier vos requêtes WebDriver, par exemple :

```ts wdio.conf.ts
import { Buffer } from 'buffer';
// Lire le nom d'utilisateur et le mot de passe des variables d'environnement
const username = process.env.SELENIUM_GRID_USERNAME;
const password = process.env.SELENIUM_GRID_PASSWORD;

// Combiner le nom d'utilisateur et le mot de passe avec un séparateur deux-points
const credentials = `${username}:${password}`;
// Encoder les informations d'identification en utilisant Base64
const encodedCredentials = Buffer.from(credentials).toString('base64');

export const config: WebdriverIO.Config = {
    // ...
    headers: {
        Authorization: `Basic ${encodedCredentials}`
    }
    // ...
}
```

Type : `Object`<br />
Défaut : `{}`

### transformRequest

Fonction interceptant les [options de requête HTTP](https://github.com/sindresorhus/got#options) avant qu'une requête WebDriver ne soit effectuée

Type : `(RequestOptions) => RequestOptions`<br />
Défaut : *aucun*

### transformResponse

Fonction interceptant les objets de réponse HTTP après qu'une réponse WebDriver est arrivée. La fonction reçoit l'objet de réponse original comme premier argument et les `RequestOptions` correspondantes comme deuxième argument.

Type : `(Response, RequestOptions) => Response`<br />
Défaut : *aucun*

### strictSSL

S'il n'est pas nécessaire que le certificat SSL soit valide.
Il peut être défini via une variable d'environnement comme `STRICT_SSL` ou `strict_ssl`.

Type : `Boolean`<br />
Défaut : `true`

### enableDirectConnect

Activation de la [fonctionnalité de connexion directe d'Appium](https://appiumpro.com/editions/86-connecting-directly-to-appium-hosts-in-distributed-environments).
Cela ne fait rien si la réponse n'a pas les clés appropriées lorsque l'indicateur est activé.

Type : `Boolean`<br />
Défaut : `true`

### cacheDir

Le chemin vers la racine du répertoire de cache. Ce répertoire est utilisé pour stocker tous les pilotes qui sont téléchargés lors de la tentative de démarrage d'une session.

Type : `String`<br />
Défaut : `process.env.WEBDRIVER_CACHE_DIR || os.tmpdir()`

### maskingPatterns

Pour une journalisation plus sécurisée, les expressions régulières définies avec `maskingPatterns` peuvent masquer les informations sensibles du journal.
 - Le format de chaîne est une expression régulière avec ou sans drapeaux (par exemple, `/.../i`) et séparé par des virgules pour plusieurs expressions régulières.
 - Pour plus de détails sur les modèles de masquage, consultez la [section Masking Patterns dans le README de WDIO Logger](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-logger/README.md#masking-patterns).

Type : `String`<br />
Défaut : `undefined`

**Exemple :**

```js
{
    maskingPatterns: '/--key=([^ ]*)/i,/RESULT (.*)/'
}
```

---

## WebdriverIO

Les options suivantes (y compris celles listées ci-dessus) peuvent être utilisées avec WebdriverIO en mode autonome :

### automationProtocol

Définissez le protocole que vous souhaitez utiliser pour votre automatisation de navigateur. Actuellement, seul [`webdriver`](https://www.npmjs.com/package/webdriver) est pris en charge, car c'est la principale technologie d'automatisation de navigateur utilisée par WebdriverIO.

Si vous souhaitez automatiser le navigateur à l'aide d'une technologie d'automatisation différente, assurez-vous de définir cette propriété sur un chemin qui résout vers un module respectant l'interface suivante :

```ts
import type { Capabilities } from '@wdio/types';
import type { Client, AttachOptions } from 'webdriver';

export default class YourAutomationLibrary {
    /**
     * Démarre une session d'automatisation et renvoie une [monade](https://github.com/webdriverio/webdriverio/blob/940cd30939864bdbdacb2e94ee6e8ada9b1cc74c/packages/wdio-utils/src/monad.ts) WebdriverIO
     * avec les commandes d'automatisation respectives. Voir le package [webdriver](https://www.npmjs.com/package/webdriver)
     * comme implémentation de référence
     *
     * @param {Capabilities.RemoteConfig} options Options WebdriverIO
     * @param {Function} hook qui permet de modifier le client avant qu'il ne soit libéré de la fonction
     * @param {PropertyDescriptorMap} userPrototype permet à l'utilisateur d'ajouter des commandes de protocole personnalisées
     * @param {Function} customCommandWrapper permet de modifier l'exécution de la commande
     * @returns une instance client compatible WebdriverIO
     */
    static newSession(
        options: Capabilities.RemoteConfig,
        modifier?: (...args: any[]) => any,
        userPrototype?: PropertyDescriptorMap,
        customCommandWrapper?: (...args: any[]) => any
    ): Promise<Client>;

    /**
     * permet à l'utilisateur de se connecter à des sessions existantes
     * @optional
     */
    static attachToSession(
        options?: AttachOptions,
        modifier?: (...args: any[]) => any, userPrototype?: {},
        commandWrapper?: (...args: any[]) => any
    ): Client;

    /**
     * Modifie l'ID de session d'instance et les capacités du navigateur pour la nouvelle session
     * directement dans l'objet de navigateur passé
     *
     * @optional
     * @param   {object} instance  l'objet que nous obtenons d'une nouvelle session de navigateur.
     * @returns {string}           le nouvel ID de session du navigateur
     */
    static reloadSession(
        instance: Client,
        newCapabilities?: WebdriverIO.Capabilitie
    ): Promise<string>;
}
```

Type : `String`<br />
Défaut : `webdriver`

### baseUrl

Raccourcissez les appels de commande `url` en définissant une URL de base.
- Si votre paramètre `url` commence par `/`, alors `baseUrl` est ajouté en préfixe (sauf le chemin de `baseUrl`, s'il en a un).
- Si votre paramètre `url` commence sans schéma ni `/` (comme `some/path`), alors le `baseUrl` complet est ajouté directement en préfixe.

Type : `String`<br />
Défaut : `null`

### waitforTimeout

Délai par défaut pour toutes les commandes `waitFor*`. (Notez le 'f' minuscule dans le nom de l'option.) Ce délai __uniquement__ affecte les commandes commençant par `waitFor*` et leur temps d'attente par défaut.

Pour augmenter le délai d'un _test_, veuillez consulter la documentation du framework.

Type : `Number`<br />
Défaut : `5000`

### waitforInterval

Intervalle par défaut pour toutes les commandes `waitFor*` pour vérifier si un état attendu (par exemple, la visibilité) a été modifié.

Type : `Number`<br />
Défaut : `100`

### region

Si vous exécutez sur Sauce Labs, vous pouvez choisir d'exécuter des tests entre différents centres de données : US ou EU.
Pour changer votre région en EU, ajoutez `region: 'eu'` à votre configuration.

__Note :__ Cela n'a d'effet que si vous fournissez des options `user` et `key` qui sont liées à votre compte Sauce Labs.

Type : `String`<br />
Défaut : `us`

*(uniquement pour les vm et/ou émulateurs/simulateurs)*

---

## Options du Testrunner

Les options suivantes (y compris celles listées ci-dessus) sont définies uniquement pour l'exécution de WebdriverIO avec le testrunner WDIO :

### specs

Définissez les spécifications pour l'exécution des tests. Vous pouvez soit spécifier un modèle glob pour faire correspondre plusieurs fichiers à la fois, soit envelopper un glob ou un ensemble de chemins dans un tableau pour les exécuter dans un seul processus de travail. Tous les chemins sont considérés comme relatifs par rapport au chemin du fichier de configuration.

Type : `(String | String[])[]`<br />
Défaut : `[]`

### exclude

Exclure des spécifications de l'exécution des tests. Tous les chemins sont considérés comme relatifs par rapport au chemin du fichier de configuration.

Type : `String[]`<br />
Défaut : `[]`

### suites

Un objet décrivant diverses suites, que vous pouvez ensuite spécifier avec l'option `--suite` sur l'interface de ligne de commande `wdio`.

Type : `Object`<br />
Défaut : `{}`

### capabilities

Identique à la section `capabilities` décrite ci-dessus, avec la possibilité de spécifier soit un objet [`multiremote`](/docs/multiremote), soit plusieurs sessions WebDriver dans un tableau pour une exécution parallèle.

Vous pouvez appliquer les mêmes capacités spécifiques au fournisseur et au navigateur définies [ci-dessus](/docs/configuration#capabilities).

Type : `Object`|`Object[]`<br />
Défaut : `[{ 'wdio:maxInstances': 5, browserName: 'firefox' }]`

### maxInstances

Nombre maximal de travailleurs parallèles au total.

__Note :__ il peut s'agir d'un nombre aussi élevé que `100`, lorsque les tests sont effectués sur des machines de fournisseurs externes tels que Sauce Labs. Là, les tests ne sont pas testés sur une seule machine, mais plutôt sur plusieurs machines virtuelles. Si les tests doivent être exécutés sur une machine de développement locale, utilisez un nombre plus raisonnable, comme `3`, `4` ou `5`. Essentiellement, c'est le nombre de navigateurs qui seront démarrés simultanément et qui exécuteront vos tests en même temps, donc cela dépend de la quantité de RAM disponible sur votre machine et du nombre d'autres applications en cours d'exécution sur votre machine.

Vous pouvez également appliquer `maxInstances` dans vos objets de capacité en utilisant la capacité `wdio:maxInstances`. Cela limitera le nombre de sessions parallèles pour cette capacité particulière.

Type : `Number`<br />
Défaut : `100`

### maxInstancesPerCapability

Nombre maximal de travailleurs parallèles au total par capacité.

Type : `Number`<br />
Défaut : `100`

### injectGlobals

Insère les globales de WebdriverIO (par exemple, `browser`, `$` et `$$`) dans l'environnement global.
Si vous définissez à `false`, vous devez importer depuis `@wdio/globals`, par exemple :

```ts
import { browser, $, $$, expect } from '@wdio/globals'
```

Note : WebdriverIO ne gère pas l'injection de globales spécifiques au framework de test.

Type : `Boolean`<br />
Défaut : `true`

### bail

Si vous souhaitez que votre exécution de test s'arrête après un nombre spécifique d'échecs de test, utilisez `bail`.
(Par défaut, c'est `0`, ce qui exécute tous les tests quoi qu'il arrive.) **Remarque :** Un test dans ce contexte correspond à tous les tests dans un seul fichier de spécification (lors de l'utilisation de Mocha ou Jasmine) ou toutes les étapes d'un fichier de fonctionnalité (lors de l'utilisation de Cucumber). Si vous souhaitez contrôler le comportement de bail dans les tests d'un seul fichier de test, consultez les options [framework](frameworks) disponibles.

Type : `Number`<br />
Défaut : `0` (ne pas arrêter; exécuter tous les tests)

### specFileRetries

Le nombre de fois pour réessayer un fichier de spécification entier lorsqu'il échoue dans son ensemble.

Type : `Number`<br />
Défaut : `0`

### specFileRetriesDelay

Délai en secondes entre les tentatives de fichier de spécification

Type : `Number`<br />
Défaut : `0`

### specFileRetriesDeferred

Indique si les fichiers de spécification réessayés doivent être réessayés immédiatement ou reportés à la fin de la file d'attente.

Type : `Boolean`<br />
Défaut : `true`

### groupLogsByTestSpec

Choisissez la vue de sortie du journal.

Si défini sur `false`, les journaux de différents fichiers de test seront imprimés en temps réel. Veuillez noter que cela peut entraîner le mélange des sorties de journaux de différents fichiers lors d'une exécution parallèle.

Si défini sur `true`, les sorties de journal seront regroupées par spécification de test et imprimées uniquement lorsque la spécification de test est terminée.

Par défaut, il est défini sur `false` pour que les journaux soient imprimés en temps réel.

Type : `Boolean`<br />
Défaut : `false`

### autoAssertOnTestEnd

Contrôle si WebdriverIO vérifie automatiquement toutes les assertions souples à la fin de chaque test. Lorsqu'il est défini sur `true`, toutes les assertions souples accumulées seront automatiquement vérifiées et provoqueront l'échec du test si des assertions ont échoué. Lorsqu'il est défini sur `false`, vous devez appeler manuellement la méthode assert pour vérifier les assertions souples.

Type : `Boolean`<br />
Défaut : `true`

### services

Les services prennent en charge une tâche spécifique dont vous ne voulez pas vous occuper. Ils améliorent votre configuration de test sans presque aucun effort.

Type : `String[]|Object[]`<br />
Défaut : `[]`

### framework

Définit le framework de test à utiliser par le testrunner WDIO.

Type : `String`<br />
Défaut : `mocha`<br />
Options : `mocha` | `jasmine`

### mochaOpts, jasmineOpts et cucumberOpts

Options spécifiques au framework. Consultez la documentation de l'adaptateur de framework pour connaître les options disponibles. Pour en savoir plus à ce sujet, consultez [Frameworks](frameworks).

Type : `Object`<br />
Défaut : `{ timeout: 10000 }`

### cucumberFeaturesWithLineNumbers

Liste des fonctionnalités cucumber avec numéros de ligne (lors de l'[utilisation du framework cucumber](./Frameworks.md#using-cucumber)).

Type : `String[]`
Défaut : `[]`

### reporters

Liste des rapporteurs à utiliser. Un rapporteur peut être soit une chaîne de caractères, soit un tableau de
`['reporterName', { /* options du rapporteur */}]` où le premier élément est une chaîne avec le nom du rapporteur et le second élément un objet avec les options du rapporteur.

Type : `String[]|Object[]`<br />
Défaut : `[]`

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

Détermine à quel intervalle le rapporteur doit vérifier s'ils sont synchronisés s'ils rapportent leurs journaux de manière asynchrone (par exemple, si les journaux sont diffusés vers un fournisseur tiers).

Type : `Number`<br />
Défaut : `100` (ms)

### reporterSyncTimeout

Détermine le temps maximum dont disposent les rapporteurs pour terminer le téléchargement de tous leurs journaux avant qu'une erreur ne soit générée par le testrunner.

Type : `Number`<br />
Défaut : `5000` (ms)

### execArgv

Arguments Node à spécifier lors du lancement des processus enfants.

Type : `String[]`<br />
Défaut : `null`

### filesToWatch

Une liste de modèles de chaînes supportant glob qui indiquent au testrunner de surveiller d'autres fichiers, par exemple des fichiers d'application, lors de son exécution avec le drapeau `--watch`. Par défaut, le testrunner surveille déjà tous les fichiers de spécification.

Type : `String[]`<br />
Défaut : `[]`

### updateSnapshots

Définissez à true si vous souhaitez mettre à jour vos instantanés. Idéalement utilisé dans le cadre d'un paramètre CLI, par exemple `wdio run wdio.conf.js --s`.

Type : `'new' | 'all' | 'none'`<br />
Défaut : `none` si non fourni et les tests s'exécutent dans CI, `new` si non fourni, sinon ce qui a été fourni

### resolveSnapshotPath

Remplace le chemin d'instantané par défaut. Par exemple, pour stocker des instantanés à côté des fichiers de test.

```ts title="wdio.conf.ts"
export const config: WebdriverIO.Config = {
    resolveSnapshotPath: (testPath, snapExtension) => testPath + snapExtension,
}
```

Type : `(testPath: string, snapExtension: string) => string`<br />
Défaut : stocke les fichiers d'instantanés dans le répertoire `__snapshots__` à côté du fichier de test

### tsConfigPath

WDIO utilise `tsx` pour compiler les fichiers TypeScript. Votre TSConfig est automatiquement détecté à partir du répertoire de travail actuel, mais vous pouvez spécifier un chemin personnalisé ici ou en définissant la variable d'environnement TSX_TSCONFIG_PATH.

Consultez la documentation de `tsx` : https://tsx.is/dev-api/node-cli#custom-tsconfig-json-path

Type : `String`<br />
Défaut : `null`<br />

## Hooks

Le testrunner WDIO vous permet de définir des hooks à déclencher à des moments spécifiques du cycle de vie du test. Cela permet des actions personnalisées (par exemple, prendre une capture d'écran si un test échoue).

Chaque hook a comme paramètre des informations spécifiques sur le cycle de vie (par exemple, des informations sur la suite de tests ou le test). Lisez plus sur toutes les propriétés des hooks dans [notre exemple de configuration](https://github.com/webdriverio/webdriverio/blob/master/examples/wdio.conf.js#L183-L326).

**Note :** Certains hooks (`onPrepare`, `onWorkerStart`, `onWorkerEnd` et `onComplete`) sont exécutés dans un processus différent et ne peuvent donc pas partager de données globales avec les autres hooks qui vivent dans le processus de travail.

### onPrepare

Est exécuté une fois avant que tous les travailleurs soient lancés.

Paramètres :

- `config` (`object`) : objet de configuration WebdriverIO
- `param` (`object[]`) : liste des détails des capacités

### onWorkerStart

Est exécuté avant qu'un processus de travail ne soit lancé et peut être utilisé pour initialiser des services spécifiques pour ce travailleur ainsi que pour modifier les environnements d'exécution de manière asynchrone.

Paramètres :

- `cid` (`string`) : id de capacité (par exemple 0-0)
- `caps` (`object`) : contenant les capacités pour la session qui sera créée dans le travailleur
- `specs` (`string[]`) : spécifications à exécuter dans le processus de travail
- `args` (`object`) : objet qui sera fusionné avec la configuration principale une fois le travailleur initialisé
- `execArgv` (`string[]`) : liste d'arguments de chaîne passés au processus de travail

### onWorkerEnd

Est exécuté juste après qu'un processus de travail a quitté.

Paramètres :

- `cid` (`string`) : id de capacité (par exemple 0-0)
- `exitCode` (`number`) : 0 - succès, 1 - échec
- `specs` (`string[]`) : spécifications à exécuter dans le processus de travail
- `retries` (`number`) : nombre de nouvelles tentatives au niveau de la spécification utilisées comme défini dans [_"Ajouter des nouvelles tentatives sur la base d'un fichier de spécification"_](./Retry.md#add-retries-on-a-per-specfile-basis)

### beforeSession

Est exécuté juste avant l'initialisation de la session webdriver et du framework de test. Il vous permet de manipuler les configurations en fonction de la capacité ou de la spécification.

Paramètres :

- `config` (`object`) : objet de configuration WebdriverIO
- `caps` (`object`) : contenant les capacités pour la session qui sera créée dans le travailleur
- `specs` (`string[]`) : spécifications à exécuter dans le processus de travail

### before

Est exécuté avant le début de l'exécution du test. À ce stade, vous pouvez accéder à toutes les variables globales comme `browser`. C'est l'endroit idéal pour définir des commandes personnalisées.

Paramètres :

- `caps` (`object`) : contenant les capacités pour la session qui sera créée dans le travailleur
- `specs` (`string[]`) : spécifications à exécuter dans le processus de travail
- `browser` (`object`) : instance de la session de navigateur/appareil créée

### beforeSuite

Hook qui est exécuté avant le démarrage de la suite (dans Mocha/Jasmine uniquement)

Paramètres :

- `suite` (`object`) : détails de la suite

### beforeHook

Hook qui est exécuté *avant* un hook dans la suite (par exemple, s'exécute avant d'appeler beforeEach dans Mocha)

Paramètres :

- `test` (`object`) : détails du test
- `context` (`object`) : contexte de test (représente l'objet World dans Cucumber)

### afterHook

Hook qui est exécuté *après* un hook dans la suite (par exemple, s'exécute après avoir appelé afterEach dans Mocha)

Paramètres :

- `test` (`object`) : détails du test
- `context` (`object`) : contexte de test (représente l'objet World dans Cucumber)
- `result` (`object`) : résultat du hook (contient les propriétés `error`, `result`, `duration`, `passed`, `retries`)

### beforeTest

Fonction à exécuter avant un test (dans Mocha/Jasmine uniquement).

Paramètres :

- `test` (`object`) : détails du test
- `context` (`object`) : objet de portée avec lequel le test a été exécuté

### beforeCommand

S'exécute avant qu'une commande WebdriverIO ne soit exécutée.

Paramètres :

- `commandName` (`string`) : nom de la commande
- `args` (`*`) : arguments que la commande recevrait

### afterCommand

S'exécute après qu'une commande WebdriverIO a été exécutée.

Paramètres :

- `commandName` (`string`) : nom de la commande
- `args` (`*`) : arguments que la commande recevrait
- `result` (`*`) : résultat de la commande
- `error` (`Error`) : objet d'erreur si présent

### afterTest

Fonction à exécuter après qu'un test (dans Mocha/Jasmine) se termine.

Paramètres :

- `test` (`object`) : détails du test
- `context` (`object`) : objet de portée avec lequel le test a été exécuté
- `result.error` (`Error`) : objet d'erreur en cas d'échec du test, sinon `undefined`
- `result.result` (`Any`) : objet de retour de la fonction de test
- `result.duration` (`Number`) : durée du test
- `result.passed` (`Boolean`) : true si le test a réussi, sinon false
- `result.retries` (`Object`) : informations sur les nouvelles tentatives de test unique définies pour [Mocha et Jasmine](./Retry.md#rerun-single-tests-in-jasmine-or-mocha) ainsi que [Cucumber](./Retry.md#rerunning-in-cucumber), par exemple `{ attempts: 0, limit: 0 }`, voir
- `result` (`object`) : résultat du hook (contient les propriétés `error`, `result`, `duration`, `passed`, `retries`)

### afterSuite

Hook qui est exécuté après la fin de la suite (dans Mocha/Jasmine uniquement)

Paramètres :

- `suite` (`object`) : détails de la suite

### after

Est exécuté après la fin de tous les tests. Vous avez toujours accès à toutes les variables globales du test.

Paramètres :

- `result` (`number`) : 0 - test réussi, 1 - test échoué
- `caps` (`object`) : contenant les capacités pour la session qui sera créée dans le travailleur
- `specs` (`string[]`) : spécifications à exécuter dans le processus de travail

### afterSession

Est exécuté juste après la fin de la session webdriver.

Paramètres :

- `config` (`object`) : objet de configuration WebdriverIO
- `caps` (`object`) : contenant les capacités pour la session qui sera créée dans le travailleur
- `specs` (`string[]`) : spécifications à exécuter dans le processus de travail

### onComplete

Est exécuté après que tous les travailleurs ont été arrêtés et que le processus est sur le point de se terminer. Une erreur lancée dans le hook onComplete entraînera l'échec de l'exécution du test.

Paramètres :

- `exitCode` (`number`) : 0 - succès, 1 - échec
- `config` (`object`) : objet de configuration WebdriverIO
- `caps` (`object`) : contenant les capacités pour la session qui sera créée dans le travailleur
- `result` (`object`) : objet de résultats contenant les résultats des tests

### onReload

Est exécuté lors d'un rafraîchissement.

Paramètres :

- `oldSessionId` (`string`) : ID de session de l'ancienne session
- `newSessionId` (`string`) : ID de session de la nouvelle session

### beforeFeature

S'exécute avant une fonctionnalité Cucumber.

Paramètres :

- `uri` (`string`) : chemin vers le fichier de fonctionnalité
- `feature` ([`GherkinDocument.IFeature`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/json-to-messages/javascript/src/cucumber-generic/JSONSchema.ts#L8-L17)) : objet de fonctionnalité Cucumber

### afterFeature

S'exécute après une fonctionnalité Cucumber.

Paramètres :

- `uri` (`string`) : chemin vers le fichier de fonctionnalité
- `feature` ([`GherkinDocument.IFeature`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/json-to-messages/javascript/src/cucumber-generic/JSONSchema.ts#L8-L17)) : objet de fonctionnalité Cucumber

### beforeScenario

S'exécute avant un scénario Cucumber.

Paramètres :

- `world` ([`ITestCaseHookParameter`](https://github.com/cucumber/cucumber-js/blob/ac124f7b2be5fa54d904c7feac077a2657b19440/src/support_code_library_builder/types.ts#L10-L15)) : objet monde contenant des informations sur pickle et l'étape de test
- `context` (`object`) : objet Cucumber World

### afterScenario

S'exécute après un scénario Cucumber.

Paramètres :

- `world` ([`ITestCaseHookParameter`](https://github.com/cucumber/cucumber-js/blob/ac124f7b2be5fa54d904c7feac077a2657b19440/src/support_code_library_builder/types.ts#L10-L15)) : objet monde contenant des informations sur pickle et l'étape de test
- `result` (`object`) : objet de résultats contenant les résultats du scénario
- `result.passed` (`boolean`) : true si le scénario a réussi
- `result.error` (`string`) : stack d'erreur si le scénario a échoué
- `result.duration` (`number`) : durée du scénario en millisecondes
- `context` (`object`) : objet Cucumber World

### beforeStep

S'exécute avant une étape Cucumber.

Paramètres :

- `step` ([`Pickle.IPickleStep`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/messages/jsonschema/Pickle.json#L20-L49)) : objet étape Cucumber
- `scenario` ([`IPickle`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/messages/jsonschema/Pickle.json#L137-L175)) : objet scénario Cucumber
- `context` (`object`) : objet Cucumber World

### afterStep

S'exécute après une étape Cucumber.

Paramètres :

- `step` ([`Pickle.IPickleStep`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/messages/jsonschema/Pickle.json#L20-L49)) : objet étape Cucumber
- `scenario` ([`IPickle`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/messages/jsonschema/Pickle.json#L137-L175)) : objet scénario Cucumber
- `result`: (`object`) : objet de résultats contenant les résultats de l'étape
- `result.passed` (`boolean`) : true si le scénario a réussi
- `result.error` (`string`) : stack d'erreur si le scénario a échoué
- `result.duration` (`number`) : durée du scénario en millisecondes
- `context` (`object`) : objet Cucumber World

### beforeAssertion

Hook qui est exécuté avant qu'une assertion WebdriverIO ne se produise.

Paramètres :

- `params` : informations d'assertion
- `params.matcherName` (`string`) : nom du matcher (par exemple, `toHaveTitle`)
- `params.expectedValue` : valeur qui est passée dans le matcher
- `params.options` : options d'assertion

### afterAssertion

Hook qui est exécuté après qu'une assertion WebdriverIO s'est produite.

Paramètres :

- `params` : informations d'assertion
- `params.matcherName` (`string`) : nom du matcher (par exemple, `toHaveTitle`)
- `params.expectedValue` : valeur qui est passée dans le matcher
- `params.options` : options d'assertion
- `params.result` : résultats de l'assertion