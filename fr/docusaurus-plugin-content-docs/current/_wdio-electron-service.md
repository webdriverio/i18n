---
id: wdio-electron-service
title: Service Electron
custom_edit_url: https://github.com/webdriverio-community/wdio-electron-service/edit/main/README.md
---


> wdio-electron-service est un package tiers, pour plus d'informations veuillez consulter [GitHub](https://github.com/webdriverio-community/wdio-electron-service) | [npm](https://www.npmjs.com/package/wdio-electron-service)

<a href="https://www.npmjs.com/package/wdio-electron-service" alt="NPM Version">
  <img src="https://img.shields.io/npm/v/wdio-electron-service" /></a>
<a href="https://www.npmjs.com/package/wdio-electron-service/v/lts" alt="NPM LTS Version">
  <img src="https://img.shields.io/npm/v/wdio-electron-service/lts" /></a>
<a href="https://www.npmjs.com/package/wdio-electron-service/v/next" alt="NPM Next Version">
  <img src="https://img.shields.io/npm/v/wdio-electron-service/next" /></a>
<a href="https://www.npmjs.com/package/wdio-electron-service" alt="NPM Downloads">
  <img src="https://img.shields.io/npm/dw/wdio-electron-service" /></a>

<br />

**Service WebdriverIO pour tester les applications Electron**

Permet les tests E2E multiplateforme des applications Electron via l'écosystème étendu de WebdriverIO.

Successeur spirituel de [Spectron](https://github.com/electron-userland/spectron) ([RIP](https://github.com/electron-userland/spectron/issues/1045)).

### Fonctionnalités

Facilite grandement le test des applications Electron grâce à :

- 🚗 configuration automatique du Chromedriver requis (pour Electron v26 et supérieur)
- 📦 détection automatique du chemin de votre application Electron
  - prend en charge [Electron Forge](https://www.electronforge.io/), [Electron Builder](https://www.electron.build/) et les applications non empaquetées
- 🧩 accès aux API Electron dans vos tests
- 🕵️ simulation des API Electron via une API de style Vitest

## Installation

Vous devrez installer `WebdriverIO`, les instructions se trouvent [ici](https://webdriver.io/docs/gettingstarted).

## Démarrage rapide

La méthode recommandée pour démarrer rapidement est d'utiliser l'[assistant de configuration WDIO](https://webdriver.io/docs/gettingstarted#initiate-a-webdriverio-setup).

### Démarrage rapide manuel

Pour commencer sans utiliser l'assistant de configuration, vous devrez installer le service et `@wdio/cli` :

```bash
npm install --dev @wdio/cli wdio-electron-service
```

Ou utilisez votre gestionnaire de paquets préféré - pnpm, yarn, etc.

Ensuite, créez votre fichier de configuration WDIO. Si vous avez besoin d'inspiration, il existe une configuration fonctionnelle dans le [répertoire d'exemples](https://github.com/webdriverio-community/wdio-electron-service/blob/main/./example/wdio.conf.ts) de ce dépôt, ainsi que la [page de référence de configuration WDIO](https://webdriver.io/docs/configuration).

Vous devrez ajouter `electron` à votre tableau de services et définir une capacité Electron, par exemple :

_`wdio.conf.ts`_

```ts
export const config = {
  // ...
  services: ['electron'],
  capabilities: [
    {
      browserName: 'electron',
    },
  ],
  // ...
};
```

Enfin, [exécutez des tests](https://webdriver.io/docs/gettingstarted#run-test) en utilisant votre fichier de configuration.

Cela lancera une instance de votre application de la même manière que WDIO gère les navigateurs comme Chrome ou Firefox. Le service fonctionne avec [WDIO (parallel) multiremote](https://webdriver.io/docs/multiremote) si vous avez besoin d'exécuter des instances supplémentaires simultanément, par exemple plusieurs instances de votre application ou différentes combinaisons de votre application et d'un navigateur Web.

Si vous utilisez [Electron Forge](https://www.electronforge.io/) ou [Electron Builder](https://www.electron.build/) pour empaqueter votre application, le service tentera automatiquement de trouver le chemin vers votre application Electron empaquetée. Vous pouvez fournir un chemin personnalisé vers le binaire via des capacités de service personnalisées, par exemple :

_`wdio.conf.ts`_

```ts
export const config = {
  // ...
  capabilities: [
    {
      'browserName': 'electron',
      'wdio:electronServiceOptions': {
        appBinaryPath: './path/to/built/electron/app.exe',
        appArgs: ['foo', 'bar=baz'],
      },
    },
  ],
  // ...
};
```

Consultez la [documentation de configuration](https://github.com/webdriverio-community/wdio-electron-service/blob/main/./docs/configuration/service-configuration.md#appbinarypath) pour savoir comment trouver la valeur de votre `appBinaryPath` pour les différents systèmes d'exploitation pris en charge par Electron.

Alternativement, vous pouvez diriger le service vers une application non empaquetée en fournissant le chemin vers le script `main.js`. Electron devra être installé dans vos `node_modules`. Il est recommandé de regrouper les applications non empaquetées à l'aide d'un bundler tel que Rollup, Parcel, Webpack, etc.

_`wdio.conf.ts`_

```ts
export const config = {
  // ...
  capabilities: [
    {
      'browserName': 'electron',
      'wdio:electronServiceOptions': {
        appEntryPoint: './path/to/bundled/electron/main.bundle.js',
        appArgs: ['foo', 'bar=baz'],
      },
    },
  ],
  // ...
};
```

## Configuration de Chromedriver

**Si votre application utilise une version d'Electron inférieure à v26, vous devrez [configurer manuellement Chromedriver](https://github.com/webdriverio-community/wdio-electron-service/blob/main/./docs/configuration/chromedriver-configuration.md#user-managed).**

Cela est dû au fait que WDIO utilise Chrome for Testing pour télécharger Chromedriver, qui ne fournit que des versions de Chromedriver v115 ou plus récentes.

## Documentation

**[Configuration du service](https://github.com/webdriverio-community/wdio-electron-service/blob/main/./docs/configuration/service-configuration.md)** \
**[Configuration de Chromedriver](https://github.com/webdriverio-community/wdio-electron-service/blob/main/./docs/configuration/chromedriver-configuration.md)** \
**[Accès aux API Electron](https://github.com/webdriverio-community/wdio-electron-service/blob/main/./docs/electron-apis/accessing-apis.md)** \
**[Simulation des API Electron](https://github.com/webdriverio-community/wdio-electron-service/blob/main/./docs/electron-apis/mocking-apis.md)** \
**[Gestion des fenêtres](https://github.com/webdriverio-community/wdio-electron-service/blob/main/./docs/window-management.md)** \
**[Mode autonome](https://github.com/webdriverio-community/wdio-electron-service/blob/main/./docs/standalone-mode.md)** \
**[Développement](https://github.com/webdriverio-community/wdio-electron-service/blob/main/./docs/development.md)** \
**[Problèmes courants et débogage](https://github.com/webdriverio-community/wdio-electron-service/blob/main/./docs/common-issues-debugging.md)**

## Développement

Lisez la [documentation de développement](https://github.com/webdriverio-community/wdio-electron-service/blob/main/./docs/development.md) si vous souhaitez contribuer.

## Exemples d'intégrations

Consultez notre projet [Electron boilerplate](https://github.com/webdriverio/electron-boilerplate) qui montre comment intégrer WebdriverIO dans une application exemple. Vous pouvez également consulter les répertoires [Example Apps](https://github.com/webdriverio-community/wdio-electron-service/blob/main/./apps/) et [E2Es](https://github.com/webdriverio-community/wdio-electron-service/blob/main/./e2e/) dans ce dépôt.

## Support

Si vous rencontrez des problèmes lors de l'exécution de WDIO avec le service, vous devriez d'abord consulter les [Problèmes courants](https://github.com/webdriverio-community/wdio-electron-service/blob/main/./docs/common-issues.md) documentés, puis ouvrir une discussion dans le [forum principal de WDIO](https://github.com/webdriverio/webdriverio/discussions).

Le forum de discussion du service Electron est beaucoup moins actif que celui de WDIO, mais si le problème que vous rencontrez est spécifique à Electron ou à l'utilisation du service, vous pouvez ouvrir une discussion [ici](https://github.com/webdriverio-community/wdio-electron-service/discussions).