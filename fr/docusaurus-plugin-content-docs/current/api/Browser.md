---
id: browser
title: L'Objet Browser
---

__Étend :__ [EventEmitter](https://nodejs.org/api/events.html#class-eventemitter)

L'objet browser est l'instance de session que vous utilisez pour contrôler le navigateur ou l'appareil mobile. Si vous utilisez le test runner WDIO, vous pouvez accéder à l'instance WebDriver via l'objet global `browser` ou `driver` ou l'importer en utilisant [`@wdio/globals`](/docs/api/globals). Si vous utilisez WebdriverIO en mode autonome, l'objet browser est retourné par la méthode [`remote`](/docs/api/modules#remoteoptions-modifier).

La session est initialisée par le test runner. Il en va de même pour la fin de la session. Cela est également fait par le processus du test runner.

## Propriétés

Un objet browser possède les propriétés suivantes :

| Nom | Type | Détails |
| ---- | ---- | ------- |
| `capabilities` | `Object` | Capacités assignées par le serveur distant.<br /><b>Exemple :</b><pre>\{<br />  acceptInsecureCerts: false,<br />  browserName: 'chrome',<br />  browserVersion: '105.0.5195.125',<br />  chrome: \{<br />    chromedriverVersion: '105.0.5195.52',<br />    userDataDir: '/var/folders/3_/pzc_f56j15vbd9z3r0j050sh0000gn/T/.com.google.Chrome.76HD3S'<br />  \},<br />  'goog:chromeOptions': \{ debuggerAddress: 'localhost:64679' \},<br />  networkConnectionEnabled: false,<br />  pageLoadStrategy: 'normal',<br />  platformName: 'mac os x',<br />  proxy: \{},<br />  setWindowRect: true,<br />  strictFileInteractability: false,<br />  timeouts: \{ implicit: 0, pageLoad: 300000, script: 30000 \},<br />  unhandledPromptBehavior: 'dismiss and notify',<br />  'webauthn:extension:credBlob': true,<br />  'webauthn:extension:largeBlob': true,<br />  'webauthn:virtualAuthenticators': true<br />\}</pre> |
| `requestedCapabilities` | `Object` | Capacités demandées au serveur distant.<br /><b>Exemple :</b><pre>\{ browserName: 'chrome' \}</pre>
| `sessionId` | `String` | ID de session assigné par le serveur distant. |
| `options` | `Object` | [Options](/docs/configuration) WebdriverIO selon la façon dont l'objet browser a été créé. Voir plus dans [types de configuration](/docs/setuptypes). |
| `commandList` | `String[]` | Une liste de commandes enregistrées pour l'instance du navigateur |
| `isW3C` | `Boolean` | Indique s'il s'agit d'une session W3C |
| `isChrome` | `Boolean` | Indique s'il s'agit d'une instance Chrome |
| `isFirefox` | `Boolean` | Indique s'il s'agit d'une instance Firefox |
| `isBidi` | `Boolean` | Indique si cette session utilise Bidi |
| `isSauce` | `Boolean` | Indique si cette session s'exécute sur Sauce Labs |
| `isMacApp` | `Boolean` | Indique si cette session s'exécute pour une application Mac native |
| `isWindowsApp` | `Boolean` | Indique si cette session s'exécute pour une application Windows native |
| `isMobile` | `Boolean` | Indique une session mobile. Voir plus sous [Indicateurs mobiles](#mobile-flags). |
| `isIOS` | `Boolean` | Indique une session iOS. Voir plus sous [Indicateurs mobiles](#mobile-flags). |
| `isAndroid` | `Boolean` | Indique une session Android. Voir plus sous [Indicateurs mobiles](#mobile-flags). |
| `isNativeContext` | `Boolean`  | Indique si le mobile est dans le contexte `NATIVE_APP`. Voir plus sous [Indicateurs mobiles](#mobile-flags). |
| `mobileContext` | `string`  | Fournit le contexte **actuel** dans lequel se trouve le pilote, par exemple `NATIVE_APP`, `WEBVIEW_<packageName>` pour Android ou `WEBVIEW_<pid>` pour iOS. Cela économise un WebDriver supplémentaire pour `driver.getContext()`. Voir plus sous [Indicateurs mobiles](#mobile-flags). |


## Méthodes

En fonction du backend d'automatisation utilisé pour votre session, WebdriverIO identifie quelles [Commandes de Protocole](/docs/api/protocols) seront attachées à [l'objet browser](/docs/api/browser). Par exemple, si vous exécutez une session automatisée dans Chrome, vous aurez accès aux commandes spécifiques à Chromium comme [`elementHover`](/docs/api/chromium#elementhover) mais pas aux [commandes Appium](/docs/api/appium).

De plus, WebdriverIO fournit un ensemble de méthodes pratiques recommandées pour interagir avec le [navigateur](/docs/api/browser) ou les [éléments](/docs/api/element) sur la page.

En plus de cela, les commandes suivantes sont disponibles :

| Nom | Paramètres | Détails |
| ---- | ---------- | ------- |
| `addCommand` | - `commandName` (Type: `String`)<br />- `fn` (Type: `Function`)<br />- `attachToElement` (Type: `boolean`) | Permet de définir des commandes personnalisées qui peuvent être appelées depuis l'objet browser à des fins de composition. En savoir plus dans le guide [Commande personnalisée](/docs/customcommands). |
| `overwriteCommand` | - `commandName` (Type: `String`)<br />- `fn` (Type: `Function`)<br />- `attachToElement` (Type: `boolean`) | Permet de remplacer n'importe quelle commande du navigateur par une fonctionnalité personnalisée. À utiliser avec précaution car cela peut confondre les utilisateurs du framework. En savoir plus dans le guide [Commande personnalisée](/docs/customcommands#overwriting-native-commands). |
| `addLocatorStrategy` | - `strategyName` (Type: `String`)<br />- `fn` (Type: `Function`) | Permet de définir une stratégie de sélecteur personnalisée, en savoir plus dans le guide [Sélecteurs](/docs/selectors#custom-selector-strategies). |

## Remarques

### Indicateurs mobiles

Si vous devez modifier votre test selon que votre session s'exécute ou non sur un appareil mobile, vous pouvez accéder aux indicateurs mobiles pour vérifier.

Par exemple, avec cette configuration :

```js
// wdio.conf.js
export const config = {
    // ...
    capabilities: \\{
        platformName: 'iOS',
        app: 'net.company.SafariLauncher',
        udid: '123123123123abc',
        deviceName: 'iPhone',
        // ...
    }
    // ...
}
```

Vous pouvez accéder à ces indicateurs dans votre test comme ceci :

```js
// Remarque : `driver` est l'équivalent de l'objet `browser` mais sémantiquement plus correct
// vous pouvez choisir quelle variable globale vous souhaitez utiliser
console.log(driver.isMobile) // affiche : true
console.log(driver.isIOS) // affiche : true
console.log(driver.isAndroid) // affiche : false
```

Cela peut être utile si, par exemple, vous souhaitez définir des sélecteurs dans vos [objets de page](../pageobjects) en fonction du type d'appareil, comme ceci :

```js
// mypageobject.page.js
import Page from './page'

class LoginPage extends Page {
    // ...
    get username() {
        const selectorAndroid = 'new UiSelector().text("Cancel").className("android.widget.Button")'
        const selectorIOS = 'UIATarget.localTarget().frontMostApp().mainWindow().buttons()[0]'
        const selectorType = driver.isAndroid ? 'android' : 'ios'
        const selector = driver.isAndroid ? selectorAndroid : selectorIOS
        return $(`${selectorType}=${selector}`)
    }
    // ...
}
```

Vous pouvez également utiliser ces indicateurs pour exécuter uniquement certains tests pour certains types d'appareils :

```js
// mytest.e2e.js
describe('my test', () => {
    // ...
    // exécuter le test uniquement avec les appareils Android
    if (driver.isAndroid) {
        it('tests something only for Android', () => {
            // ...
        })
    }
    // ...
})
```

### Événements
L'objet browser est un EventEmitter et plusieurs événements sont émis pour vos cas d'utilisation.

Voici une liste d'événements. Gardez à l'esprit que ce n'est pas encore la liste complète des événements disponibles.
N'hésitez pas à contribuer pour mettre à jour le document en ajoutant des descriptions d'autres événements ici.

#### `command`

Cet événement est émis chaque fois que WebdriverIO envoie une commande WebDriver Classic. Il contient les informations suivantes :

- `command` : le nom de la commande, par ex. `navigateTo`
- `method` : la méthode HTTP utilisée pour envoyer la demande de commande, par ex. `POST`
- `endpoint` : le point de terminaison de la commande, par ex. `/session/fc8dbda381a8bea36a225bd5fd0c069b/url`
- `body` : la charge utile de la commande, par ex. `{ url: 'https://webdriver.io' }`

#### `result`

Cet événement est émis chaque fois que WebdriverIO reçoit un résultat d'une commande WebDriver Classic. Il contient les mêmes informations que l'événement `command` avec l'ajout des informations suivantes :

- `result` : le résultat de la commande

#### `bidiCommand`

Cet événement est émis chaque fois que WebdriverIO envoie une commande WebDriver Bidi au pilote du navigateur. Il contient des informations sur :

- `method` : méthode de commande WebDriver Bidi
- `params` : paramètre de commande associé (voir [API](/docs/api/webdriverBidi))

#### `bidiResult`

En cas d'exécution réussie de la commande, la charge utile de l'événement sera :

- `type` : `success`
- `id` : l'identifiant de la commande
- `result` : le résultat de la commande (voir [API](/docs/api/webdriverBidi))

En cas d'erreur de commande, la charge utile de l'événement sera :

- `type` : `error`
- `id` : l'identifiant de la commande
- `error` : le code d'erreur, par ex. `invalid argument`
- `message` : détails sur l'erreur
- `stacktrace` : une trace de la pile

#### `request.start`
Cet événement est déclenché avant qu'une requête WebDriver ne soit envoyée au pilote. Il contient des informations sur la requête et sa charge utile.

```ts
browser.on('request.start', (ev: RequestInit) => {
    // ...
})
```

#### `request.end`
Cet événement est déclenché une fois que la requête au pilote a reçu une réponse. L'objet d'événement contient soit le corps de la réponse comme résultat, soit une erreur si la commande WebDriver a échoué.

```ts
browser.on('request.end', (ev: { result: unknown, error?: Error }) => {
    // ...
})
```

#### `request.retry`
L'événement de nouvelle tentative peut vous informer lorsque WebdriverIO tente de réexécuter la commande, par exemple en raison d'un problème de réseau. Il contient des informations sur l'erreur qui a provoqué la nouvelle tentative et le nombre de tentatives déjà effectuées.

```ts
browser.on('request.retry', (ev: { error: Error, retryCount: number }) => {
    // ...
})
```

#### `request.performance`
Il s'agit d'un événement pour mesurer les opérations au niveau WebDriver. Chaque fois que WebdriverIO envoie une requête au backend WebDriver, cet événement sera émis avec des informations utiles :

- `durationMillisecond` : Durée de la requête en millisecondes.
- `error` : Objet d'erreur si la requête a échoué.
- `request` : Objet de requête. Vous pouvez trouver url, méthode, en-têtes, etc.
- `retryCount` : S'il est `0`, la requête était la première tentative. Il augmentera lorsque WebDriverIO réessaie en interne.
- `success` : Booléen pour indiquer si la requête a réussi ou non. S'il est `false`, la propriété `error` sera également fournie.

Un exemple d'événement :
```js
Object {
  "durationMillisecond": 0.01770925521850586,
  "error": [Error: Timeout],
  "request": Object { ... },
  "retryCount": 0,
  "success": false,
},
```

### Commandes personnalisées

Vous pouvez définir des commandes personnalisées dans la portée du navigateur pour abstraire les flux de travail couramment utilisés. Consultez notre guide sur les [Commandes personnalisées](/docs/customcommands#adding-custom-commands) pour plus d'informations.