---
id: cloud-providers
title: Fournisseurs cloud
description: "Exécutez des sessions navigateur et mobiles WebdriverIO MCP sur des fermes d'appareils cloud, avec gestion des identifiants, téléversement d'applications, tunnels et rapports."
---

Le serveur WebdriverIO MCP prend en charge nativement l'exécution de sessions d'automatisation navigateur et mobile sur des fermes d'appareils cloud. Aucun pilote local, émulateur ou simulateur n'est nécessaire. Quatre fournisseurs sont pris en charge :

- **BrowserStack** — [Automate](https://www.browserstack.com/automate) (navigateurs) et [App Automate](https://www.browserstack.com/app-automate) (applications mobiles)
- **Sauce Labs** — cloud d'appareils réels et navigateurs virtuels [Sauce Labs](https://saucelabs.com)
- **TestMu (anciennement LambdaTest)** — cloud d'appareils réels et de navigateurs [TestMu](https://www.lambdatest.com)
- **TestingBot** — cloud d'appareils réels et grille de navigateurs [TestingBot](https://testingbot.com)

Les quatre fournisseurs partagent le même flux de travail : définir les identifiants, téléverser éventuellement une application mobile, puis appeler `start_session` avec le nom du fournisseur. Les libellés de rapport, la configuration du tunnel et le cycle de vie des applications mobiles sont identiques d'un fournisseur à l'autre.

## Prérequis

Définissez vos identifiants en tant que variables d'environnement avant de démarrer le serveur MCP :

```bash
# BrowserStack
export BROWSERSTACK_USERNAME="your_username"
export BROWSERSTACK_ACCESS_KEY="your_access_key"

# Sauce Labs
export SAUCE_USERNAME="your_username"
export SAUCE_ACCESS_KEY="your_access_key"

# TestMu
export TESTMU_USERNAME="your_username"
export TESTMU_ACCESS_KEY="your_access_key"

# TestingBot
export TESTINGBOT_KEY="your_key"
export TESTINGBOT_SECRET="your_secret"
```

| Fournisseur  | Variable du nom d'utilisateur | Variable de la clé d'accès | Où la trouver                                                           |
| ------------ | ----------------------------- | -------------------------- | ----------------------------------------------------------------------- |
| BrowserStack | `BROWSERSTACK_USERNAME`       | `BROWSERSTACK_ACCESS_KEY`  | [Paramètres du compte](https://www.browserstack.com/accounts/settings)  |
| Sauce Labs   | `SAUCE_USERNAME`              | `SAUCE_ACCESS_KEY`         | [Paramètres utilisateur](https://app.saucelabs.com/user-settings)       |
| TestMu       | `TESTMU_USERNAME`             | `TESTMU_ACCESS_KEY`        | [Paramètres du compte](https://accounts.lambdatest.com/detail/profile)  |
| TestingBot   | `TESTINGBOT_KEY`              | `TESTINGBOT_SECRET`        | [Paramètres du compte](https://testingbot.com/membership)               |

## Automatisation du navigateur

Exécutez une session navigateur sur n'importe quel fournisseur cloud en définissant `provider` dans `start_session` :

```js
// BrowserStack — Windows + Chrome
start_session({
  provider: "browserstack",
  platform: "browser",
  browser: "chrome",
  browserVersion: "latest",
  os: "Windows",
  osVersion: "11"
})

// Sauce Labs — macOS + Safari
start_session({
  provider: "saucelabs",
  platform: "browser",
  browser: "safari",
  browserVersion: "latest",
  os: "macOS",
  osVersion: "Sequoia"
})

// TestMu — Linux + Firefox
start_session({
  provider: "testmu",
  platform: "browser",
  browser: "firefox",
  browserVersion: "latest",
  os: "Linux"
})

// TestingBot — Windows + Chrome
start_session({
  provider: "testingbot",
  platform: "browser",
  browser: "chrome",
  browserVersion: "latest",
  os: "Windows",
  osVersion: "11"
})
```

Tous les fournisseurs prennent en charge `browser` : `"chrome"`, `"firefox"`, `"edge"`, `"safari"`. Si vous omettez `os` / `osVersion`, le fournisseur utilise des valeurs par défaut raisonnables (généralement la dernière version de Linux pour les sessions navigateur).

### Régions Sauce Labs

Sauce Labs prend en charge plusieurs régions de centres de données. Définissez le paramètre `region` dans `start_session` :

```js
start_session({
  provider: "saucelabs",
  platform: "browser",
  browser: "chrome",
  region: "us-west-1"
})
```

Valeurs prises en charge : `"us-west-1"`, `"eu-central-1"` (par défaut), `"apac-southeast-1"`.

## Automatisation des applications mobiles

Le flux de travail mobile comporte trois étapes, identiques pour tous les fournisseurs :

### Étape 1 : Téléverser votre application

```js
upload_app({ provider: "browserstack", path: "/absolute/path/to/app.apk" })
upload_app({ provider: "saucelabs", path: "/path/to/app.ipa" })
upload_app({ provider: "testmu", path: "/path/to/app.apk" })
upload_app({ provider: "testingbot", path: "/path/to/app.apk" })
```

Chaque appel renvoie une référence d'application que vous utiliserez dans `start_session` :
- BrowserStack : `bs://abc123...`
- Sauce Labs : `storage:filename=MyApp.ipa`
- TestMu : `lt://abc123...`
- TestingBot : `https://api.testingbot.com/v1/storage/<app_url>`

Vous pouvez éventuellement définir un `customId` pour obtenir des références stables d'un téléversement à l'autre :

```js
upload_app({ provider: "saucelabs", path: "/path/to/app.ipa", customId: "MyApp-v2.1" })
```

Pour Sauce Labs, ajoutez `region` afin de correspondre à votre région de stockage (par défaut `"eu-central-1"`).

### Étape 2 : Lister les applications disponibles

```js
list_apps({ provider: "browserstack" })
list_apps({ provider: "saucelabs" })
list_apps({ provider: "testmu" })
list_apps({ provider: "testingbot" })
```

Paramètres optionnels pour tous les fournisseurs :
- `sortBy` : `"app_name"` ou `"uploaded_at"` (par défaut)
- `limit` : nombre maximal de résultats (par défaut 20)

BrowserStack prend également en charge `organizationWide: true` pour lister tous les téléversements de l'organisation. Sauce Labs accepte `region`.

### Étape 3 : Démarrer la session

Utilisez la référence d'application renvoyée par `upload_app`, ou un `customId` :

```js
// BrowserStack — Android
start_session({
  provider: "browserstack",
  platform: "android",
  deviceName: "Samsung Galaxy S24",
  platformVersion: "14.0",
  app: "bs://abc123..."
})

// Sauce Labs — iOS
start_session({
  provider: "saucelabs",
  platform: "ios",
  deviceName: "iPhone 15",
  platformVersion: "17.0",
  app: "storage:filename=MyApp.ipa"
})

// TestMu — Android
start_session({
  provider: "testmu",
  platform: "android",
  deviceName: "Samsung Galaxy S24",
  platformVersion: "14.0",
  app: "lt://abc123..."
})

// TestingBot — Android
start_session({
  provider: "testingbot",
  platform: "android",
  deviceName: "Samsung Galaxy S24",
  platformVersion: "14.0",
  app: "<app_url from upload_app>"
})
```

## Tunnel local

Tous les fournisseurs prennent en charge un tunnel local afin que les sessions cloud puissent atteindre les serveurs de votre machine (localhost, environnements de préproduction, services internes).

Le serveur MCP utilise un **paramètre `tunnel` unifié** qui fonctionne de manière identique pour tous les fournisseurs :

### Tunnel géré automatiquement (recommandé)

Le serveur MCP démarre et arrête le tunnel automatiquement :

```js
start_session({
  provider: "browserstack",
  platform: "browser",
  browser: "chrome",
  tunnel: true
})
```

Avant votre première session avec `tunnel: true`, le serveur MCP se charge de télécharger et de démarrer le binaire du tunnel. Si vous souhaitez vérifier la configuration manuellement, consultez la ressource local-binary du fournisseur :

- `wdio://browserstack/local-binary`
- `wdio://saucelabs/local-binary`
- `wdio://testmu/local-binary`
- `wdio://testingbot/local-binary`

Le tunnel s'arrête automatiquement lorsque vous fermez la session.

### Tunnel externe

Si vous exécutez déjà le tunnel dans un processus séparé :

```js
start_session({
  provider: "saucelabs",
  platform: "browser",
  browser: "chrome",
  tunnel: "external",
  tunnelName: "my-sauce-tunnel"
})
```

`"external"` indique au serveur MCP qu'un tunnel est déjà en cours d'exécution ; il définit les indicateurs de capacités appropriés mais ne démarre ni n'arrête aucun processus. Définissez `tunnelName` pour qu'il corresponde au tunnel en cours d'exécution.

### Configuration manuelle du tunnel

Si vous préférez exécuter le tunnel manuellement, consultez les instructions de configuration dans la ressource MCP correspondant à votre fournisseur et à votre plateforme. Par exemple :

```text
// Lire les instructions de configuration (depuis votre client IA)
wdio://saucelabs/local-binary
wdio://testingbot/local-binary
```

Chaque ressource renvoie l'URL de téléchargement, les commandes spécifiques à la plateforme et les instructions pour le démon.

## Rapports

Étiquetez les sessions avec des libellés de projet, de build et de session pour le tableau de bord du fournisseur. Cela fonctionne de manière identique pour tous les fournisseurs :

```js
start_session({
  provider: "browserstack",
  platform: "browser",
  browser: "chrome",
  reporting: {
    project: "My Project",
    build: "v2.1.0",
    session: "Login flow test"
  }
})
```

Les sessions apparaissent dans le tableau de bord du fournisseur sous le projet et le build spécifiés :
- BrowserStack : [Tableau de bord Automate](https://automate.browserstack.com)
- Sauce Labs : [Résultats des tests](https://app.saucelabs.com/dashboard/builds)
- TestMu : [Tableau de bord Automation](https://automation.lambdatest.com)
- TestingBot : [Résultats des tests](https://testingbot.com/members)

## Remarques spécifiques aux fournisseurs

### BrowserStack

- Sessions navigateur : `os` accepte `"Windows"` ou `"OS X"`. Versions de Windows : `"10"`, `"11"`. Versions de macOS : `"Ventura"`, `"Sonoma"`, `"Sequoia"`.
- API de gestion des applications : `organizationWide: true` sur `list_apps` liste tous les téléversements de l'équipe.

### Sauce Labs

- **Les régions sont importantes.** La région par défaut est `eu-central-1`. Si votre compte se trouve dans une autre région, définissez `region` sur `start_session`, `list_apps` et `upload_app` en conséquence.
- Les sessions mobiles prennent en charge `automationName` (`"XCUITest"` ou `"UiAutomator2"`) ; les valeurs par défaut sont adaptées à chaque plateforme.
- Le tunnel Sauce Connect est géré automatiquement via le paquet npm `saucelabs`. Aucun binaire externe n'est nécessaire pour `tunnel: true`.

### TestMu

- Le nom du fournisseur est `"testmu"` dans `start_session`, `list_apps` et `upload_app`.
- Les sessions navigateur se connectent à `hub.lambdatest.com` ; les sessions mobiles se connectent à `mobile-hub.lambdatest.com` ; cela est géré automatiquement.
- Le tunnel est géré automatiquement via le paquet npm `@lambdatest/node-tunnel`.
- La gestion des applications mobiles récupère les applications Android et iOS via des appels API distincts, puis fusionne les résultats.

### TestingBot

- Le nom du fournisseur est `"testingbot"` dans `start_session`, `list_apps` et `upload_app`.
- Les sessions navigateur et mobiles se connectent toutes deux à `hub.testingbot.com` sur le port 443 (géré automatiquement).
- Les identifiants utilisent `TESTINGBOT_KEY` et `TESTINGBOT_SECRET` (et non une paire nom d'utilisateur/clé d'accès comme les autres fournisseurs).
- Le tunnel est géré automatiquement via le paquet npm `testingbot-tunnel-launcher` (nécessite Java 11+).
- Pas de paramètre de région — le hub de TestingBot est global.
- Le mode navigateur mobile/émulateur est pris en charge : définissez `platform: "android"` ou `"ios"` avec un nom de `browser` (par ex. `"chrome"`) au lieu de `app`.