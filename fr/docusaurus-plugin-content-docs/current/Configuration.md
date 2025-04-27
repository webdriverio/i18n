---
id: configuration
title: Configuration
---

Selon le [type de configuration](/docs/setuptypes) (par exemple, en utilisant les liaisons de protocole brutes, WebdriverIO en tant que package autonome ou le testrunner WDIO), il existe différentes options disponibles pour contrôler l'environnement.

## Options WebDriver

Les options suivantes sont définies lors de l'utilisation du package de protocole [`webdriver`](https://www.npmjs.com/package/webdriver) :

### protocol

Protocole à utiliser lors de la communication avec le serveur de pilote.

Type: `String`<br />
Default: `http`

### hostname

Hôte de votre serveur de pilote.

Type: `String`<br />
Default: `0.0.0.0`

### port

Port sur lequel se trouve votre serveur de pilote.

Type: `Number`<br />
Default: `undefined`

### path

Chemin vers le point de terminaison du serveur de pilote.

Type: `String`<br />
Default: `/`

### queryParams

Paramètres de requête qui sont propagés au serveur de pilote.

Type: `Object`<br />
Default: `undefined`

### user

Votre nom d'utilisateur de service cloud (fonctionne uniquement pour les comptes [Sauce Labs](https://saucelabs.com), [Browserstack](https://www.browserstack.com), [TestingBot](https://testingbot.com) ou [LambdaTest](https://www.lambdatest.com)). Si défini, WebdriverIO définira automatiquement les options de connexion pour vous. Si vous n'utilisez pas de fournisseur cloud, cela peut être utilisé pour authentifier n'importe quel autre backend WebDriver.

Type: `String`<br />
Default: `undefined`

### key

Votre clé d'accès au service cloud ou clé secrète (fonctionne uniquement pour les comptes [Sauce Labs](https://saucelabs.com), [Browserstack](https://www.browserstack.com), [TestingBot](https://testingbot.com) ou [LambdaTest](https://www.lambdatest.com)). Si défini, WebdriverIO définira automatiquement les options de connexion pour vous. Si vous n'utilisez pas de fournisseur cloud, cela peut être utilisé pour authentifier n'importe quel autre backend WebDriver.

Type: `String`<br />
Default: `undefined`

### capabilities

Définit les capacités que vous souhaitez exécuter dans votre session WebDriver. Consultez le [Protocole WebDriver](https://w3c.github.io/webdriver/#capabilities) pour plus de détails. Si vous exécutez un pilote plus ancien qui ne prend pas en charge le protocole WebDriver, vous devrez utiliser les [capacités JSONWireProtocol](https://github.com/SeleniumHQ/selenium/wiki/DesiredCapabilities) pour exécuter avec succès une session.

En plus des capacités basées sur WebDriver, vous pouvez appliquer des options spécifiques au navigateur et au fournisseur qui permettent une configuration plus approfondie du navigateur ou de l'appareil distant. Celles-ci sont documentées dans les documents du fournisseur correspondant, par exemple :

- `goog:chromeOptions`: pour [Google Chrome](https://chromedriver.chromium.org/capabilities#h.p_ID_106)
- `moz:firefoxOptions`: pour [Mozilla Firefox](https://firefox-source-docs.mozilla.org/testing/geckodriver/Capabilities.html)
- `ms:edgeOptions`: pour [Microsoft Edge](https://docs.microsoft.com/en-us/microsoft-edge/webdriver-chromium/capabilities-edge-options#using-the-edgeoptions-class)
- `sauce:options`: pour [Sauce Labs](https://docs.saucelabs.com/dev/test-configuration-options/#desktop-and-mobile-capabilities-sauce-specific--optional)
- `bstack:options`: pour [BrowserStack](https://www.browserstack.com/automate/capabilities?tag=selenium-4#)
- `selenoid:options`: pour [Selenoid](https://github.com/aerokube/selenoid/blob/master/docs/special-capabilities.adoc)

De plus, un utilitaire utile est le [Configurateur de test automatisé](https://docs.saucelabs.com/basics/platform-configurator/) de Sauce Labs, qui vous aide à créer cet objet en cliquant sur vos capacités souhaitées.

Type: `Object`<br />
Default: `null`

**Exemple:**

```js
{
    browserName: 'chrome', // options: `chrome`, `edge`, `firefox`, `safari`
    browserVersion: '27.0', // version du navigateur
    platformName: 'Windows 10' // plateforme OS
}
```

Si vous exécutez des tests web ou natifs sur des appareils mobiles, `capabilities` diffère du protocole WebDriver. Consultez la [Documentation Appium](https://appium.github.io/appium.io/docs/en/writing-running-appium/caps/) pour plus de détails.

### logLevel

Niveau de verbosité de la journalisation.

Type: `String`<br />
Default: `info`<br />
Options: `trace` | `debug` | `info` | `warn` | `error` | `silent`

### outputDir

Répertoire pour stocker tous les fichiers journaux du testrunner (y compris les journaux du rapporteur et les journaux `wdio`). Si non défini, tous les journaux sont diffusés vers `stdout`. Étant donné que la plupart des rapporteurs sont conçus pour enregistrer dans `stdout`, il est recommandé d'utiliser cette option uniquement pour des rapporteurs spécifiques où il est plus logique de pousser le rapport dans un fichier (comme le rapporteur `junit`, par exemple).

En mode autonome, le seul journal généré par WebdriverIO sera le journal `wdio`.

Type: `String`<br />
Default: `null`

### connectionRetryTimeout

Délai d'attente pour toute requête WebDriver vers un pilote ou une grille.

Type: `Number`<br />
Default: `120000`

### connectionRetryCount

Nombre maximum de tentatives de requêtes vers le serveur Selenium.

Type: `Number`<br />
Default: `3`

### agent

Vous permet d'utiliser un `http`/`https`/`http2` [agent](https://www.npmjs.com/package/got#agent) personnalisé pour effectuer des requêtes.

Type: `Object`<br />
Default:

```js
{
    http: new http.Agent({ keepAlive: true }),
    https: new https.Agent({ keepAlive: true })
}
```

### headers

Spécifiez des `headers` personnalisés à transmettre dans chaque requête WebDriver. Si votre grille Selenium nécessite une authentification de base, nous vous recommandons de transmettre un en-tête `Authorization` via cette option pour authentifier vos requêtes WebDriver, par exemple :

```ts wdio.conf.ts
import { Buffer } from 'buffer';
// Read the username and password from environment variables
const username = process.env.SELENIUM_GRID_USERNAME;
const password = process.env.SELENIUM_GRID_PASSWORD;

// Combine the username and password with a colon separator
const credentials = `${username}:${password}`;
// Encode the credentials using Base64
const encodedCredentials = Buffer.from(credentials).toString('base64');

export const config: WebdriverIO.Config = {
    // ...
    headers: {
        Authorization: `Basic ${encodedCredentials}`
    }
    // ...
}
```

Type: `Object`<br />
Default: `{}`

### transformRequest

Fonction interceptant les [options de requête HTTP](https://github.com/sindresorhus/got#options) avant qu'une requête WebDriver ne soit effectuée

Type: `(RequestOptions) => RequestOptions`<br />
Default: *aucun*

### transformResponse

Fonction interceptant les objets de réponse HTTP après l'arrivée d'une réponse WebDriver. La fonction reçoit l'objet de réponse original comme premier argument et les `RequestOptions` correspondantes comme deuxième argument.

Type: `(Response, RequestOptions) => Response`<br />
Default: *aucun*

### strictSSL

Indique s'il n'est pas nécessaire que le certificat SSL soit valide.
Il peut être défini via des variables d'environnement comme `STRICT_SSL` ou `strict_ssl`.

Type: `Boolean`<br />
Default: `true`

### enableDirectConnect

Indique s'il faut activer la [fonctionnalité de connexion directe d'Appium](https://appiumpro.com/editions/86-connecting-directly-to-appium-hosts-in-distributed-environments).
Cela ne fait rien si la réponse n'avait pas les clés appropriées alors que le drapeau est activé.

Type: `Boolean`<br />
Default: `true`

### cacheDir

Le chemin vers la racine du répertoire de cache. Ce répertoire est utilisé pour stocker tous les pilotes qui sont téléchargés lors de la tentative de démarrage d'une session.

Type: `String`<br />
Default: `process.env.WEBDRIVER_CACHE_DIR || os.tmpdir()`

---

## WebdriverIO

Les options suivantes (y compris celles listées ci-dessus) peuvent être utilisées avec WebdriverIO en mode autonome :

### automationProtocol

Définissez le protocole que vous souhaitez utiliser pour votre automatisation de navigateur. Actuellement, seul [`webdriver`](https://www.npmjs.com/package/webdriver) est pris en charge, car c'est la principale technologie d'automatisation de navigateur utilisée par WebdriverIO.

Si vous souhaitez automatiser le navigateur à l'aide d'une technologie d'automatisation différente, assurez-vous de définir cette propriété sur un chemin qui résout un module qui adhère à l'interface suivante :

```ts
import type { Capabilities } from '@wdio/types';
import type { Client, AttachOptions } from 'webdriver';

export default class YourAutomationLibrary {
    /**
     * Start a automation session and return a WebdriverIO [monad](https://github.com/webdriverio/webdriverio/blob/940cd30939864bdbdacb2e94ee6e8ada9b1cc74c/packages/wdio-utils/src/monad.ts)
     * with respective automation commands. See the [webdriver](https://www.npmjs.com/package/webdriver) package
     * as a reference implementation
     *
     * @param {Capabilities.RemoteConfig} options WebdriverIO options
     * @param {Function} hook that allows to modify the client before it gets released from the function
     * @param {PropertyDescriptorMap} userPrototype allows user to add custom protocol commands
     * @param {Function} customCommandWrapper allows to modify the command execution
     * @returns a WebdriverIO compatible client instance
     */
    static newSession(
        options: Capabilities.RemoteConfig,
        modifier?: (...args: any[]) => any,
        userPrototype?: PropertyDescriptorMap,
        customCommandWrapper?: (...args: any[]) => any
    ): Promise<Client>;

    /**
     * allows user to attach to existing sessions
     * @optional
     */
    static attachToSession(
        options?: AttachOptions,
        modifier?: (...args: any[]) => any, userPrototype?: {},
        commandWrapper?: (...args: any[]) => any
    ): Client;

    /**
     * Changes The instance session id and browser capabilities for the new session
     * directly into the passed in browser object
     *
     * @optional
     * @param   {object} instance  the object we get from a new browser session.
     * @returns {string}           the new session id of the browser
     */
    static reloadSession(
        instance: Client,
        newCapabilities?: WebdriverIO.Capabilitie
    ): Promise<string>;
}
```

Type: `String`<br />
Default: `webdriver`

### baseUrl

Raccourcissez les appels de commande `url` en définissant une URL de base.
- Si votre paramètre `url` commence par `/`, alors `baseUrl` est ajouté en préfixe (sauf le chemin `baseUrl`, s'il en a un).
- Si votre paramètre `url` commence sans schéma ni `/` (comme `some/path`), alors le `baseUrl` complet est ajouté directement en préfixe.

Type: `String`<br />
Default: `null`

### waitforTimeout

Délai d'attente par défaut pour toutes les commandes `waitFor*`. (Notez le 'f' minuscule dans le nom de l'option.) Ce délai __affecte uniquement__ les commandes commençant par `waitFor*` et leur temps d'attente par défaut.

Pour augmenter le délai d'attente pour un _test_, veuillez consulter la documentation du framework.

Type: `Number`<br />
Default: `5000`

### waitforInterval

Intervalle par défaut pour toutes les commandes `waitFor*` pour vérifier si un état attendu (par exemple, la visibilité) a été modifié.

Type: `Number`<br />
Default: `100`

### region

Si vous exécutez sur Sauce Labs, vous pouvez choisir d'exécuter des tests entre différents centres de données : US ou EU.
Pour changer votre région en EU, ajoutez `region: 'eu'` à votre configuration.

__Remarque :__ Cela n'a d'effet que si vous fournissez des options `user` et `key` qui sont connectées à votre compte Sauce Labs.

Type: `String`<br />
Default: `us`

*(uniquement pour les machines virtuelles et/ou les émulateurs/simulateurs)*

---

## Options du Testrunner

Les options suivantes (y compris celles listées ci-dessus) sont définies uniquement pour l'exécution de WebdriverIO avec le testrunner WDIO :

### specs

Définissez les spécifications pour l'exécution des tests. Vous pouvez soit spécifier un modèle glob pour faire correspondre plusieurs fichiers à la fois, soit envelopper un glob ou un ensemble de chemins dans un tableau pour les exécuter dans un seul processus de travail. Tous les chemins sont considérés comme relatifs au chemin du fichier de configuration.

Type: `(String | String[])[]`<br />
Default: `[]`

### exclude

Exclure des spécifications de l'exécution des tests. Tous les chemins sont considérés comme relatifs au chemin du fichier de configuration.

Type: `String[]`<br />
Default: `[]`

### suites

Un objet décrivant diverses suites, que vous pouvez ensuite spécifier avec l'option `--suite` sur l'interface de ligne de commande `wdio`.

Type: `Object`<br />
Default: `{}`

### capabilities

Identique à la section `capabilities` décrite ci-dessus, sauf avec la possibilité de spécifier soit un objet [`multiremote`](/docs/multiremote), soit plusieurs sessions WebDriver dans un tableau pour une exécution parallèle.

Vous pouvez appliquer les mêmes capacités spécifiques au fournisseur et au navigateur que celles définies [ci-dessus](/docs/configuration#capabilities).

Type: `Object`|`Object[]`<br />
Default: `[{ 'wdio:maxInstances': 5, browserName: 'firefox' }]`

### maxInstances

Nombre maximum total de travailleurs parallèles en cours d'exécution.

__Remarque :__ ce nombre peut être aussi élevé que `100`, lorsque les tests sont effectués sur des fourn