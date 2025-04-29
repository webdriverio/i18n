---
id: wdio-vscode-service
title: Service de Test d'Extension VSCode
custom_edit_url: https://github.com/webdriverio-community/wdio-vscode-service/edit/main/README.md
---


> wdio-vscode-service est un package tiers, pour plus d'informations, consultez [GitHub](https://github.com/webdriverio-community/wdio-vscode-service) | [npm](https://www.npmjs.com/package/wdio-vscode-service)

Testé sur :

[![VSCode Version](https://img.shields.io/badge/VSCode%20Version-insiders%20/%20stable%20/%20v1.86.0%20/%20web-brightgreen)](https://github.com/webdriverio-community/wdio-vscode-service/actions/workflows/ci.yml) [![CI Status](https://img.shields.io/badge/Platform-windows%20%2F%20macos%20%2F%20ubuntu-brightgreen)](https://github.com/webdriverio-community/wdio-vscode-service/actions/workflows/ci.yml)

> Service WebdriverIO pour tester les extensions VSCode.

Ce service WebdriverIO vous permet de tester de manière transparente vos extensions VSCode de bout en bout dans l'IDE VSCode Desktop ou en tant qu'extension web. Vous n'avez qu'à fournir un chemin vers votre extension et le service s'occupe du reste en :

- 🏗️ Installant VSCode (soit `stable`, `insiders` ou une version spécifiée)
- ⬇️ Téléchargeant Chromedriver spécifique à une version donnée de VSCode
- 🚀 Vous permettant d'accéder à l'API VSCode depuis vos tests
- 🖥️ Démarrant VSCode avec des paramètres utilisateur personnalisés (y compris la prise en charge de VSCode sur Ubuntu, MacOS et Windows)
- 🌐 Ou servant VSCode à partir d'un serveur pour être accessible par n'importe quel navigateur pour tester les [extensions web](https://code.visualstudio.com/api/extension-guides/web-extensions)
- 📔 Initialisant des objets de page avec des localisateurs correspondant à votre version VSCode

Ce projet a été fortement inspiré par le projet [vscode-extension-tester](https://www.npmjs.com/package/vscode-extension-tester) qui est basé sur Selenium. Ce package reprend l'idée et l'adapte à WebdriverIO.

À partir de VSCode v1.86, il est nécessaire d'utiliser `webdriverio` v8.14 ou ultérieur pour installer Chromedriver sans configuration nécessaire. Si vous devez tester des versions antérieures de VSCode, consultez la section [Configuration de Chromedriver](#chromedriver) ci-dessous.

## Installation

Pour démarrer un nouveau projet WebdriverIO, exécutez :

```bash
npm create wdio ./
```

Un assistant d'installation vous guidera à travers le processus. Assurez-vous de sélectionner TypeScript comme compilateur et de ne pas générer d'objets de page car ce projet est livré avec tous les objets de page nécessaires. Ensuite, assurez-vous de sélectionner `vscode` dans la liste des services :

![Install Demo](https://raw.githubusercontent.com/webdriverio-community/wdio-vscode-service/main/.github/assets/demo.gif "Install Demo")

Pour plus d'informations sur l'installation de `WebdriverIO`, veuillez consulter la [documentation du projet](https://webdriver.io/docs/gettingstarted).

## Configuration d'exemple

Pour utiliser le service, vous devez ajouter `vscode` à votre liste de services, éventuellement suivi d'un objet de configuration. Cela permettra à WebdriverIO de télécharger les binaires VSCode donnés et la version appropriée de Chromedriver :

```js
// wdio.conf.ts
export const config = {
    outputDir: 'trace',
    // ...
    capabilities: [{
        browserName: 'vscode',
        browserVersion: '1.86.0', // "insiders" ou "stable" pour la dernière version de VSCode
        'wdio:vscodeOptions': {
            extensionPath: __dirname,
            userSettings: {
                "editor.fontSize": 14
            }
        }
    }],
    services: ['vscode'],
    /**
     * Définissez éventuellement le chemin où WebdriverIO stocke tous les binaires VSCode, par exemple :
     * services: [['vscode', { cachePath: __dirname }]]
     */
    // ...
};
```

Si vous définissez `wdio:vscodeOptions` avec un autre `browserName` que `vscode`, par exemple `chrome`, le service servira l'extension comme une extension web. Si vous testez sur Chrome, aucun service de pilote supplémentaire n'est requis, par exemple :

```js
// wdio.conf.ts
export const config = {
    outputDir: 'trace',
    // ...
    capabilities: [{
        browserName: 'chrome',
        'wdio:vscodeOptions': {
            extensionPath: __dirname
        }
    }],
    services: ['vscode'],
    // ...
};
```

_Remarque:_ lors du test des extensions web, vous ne pouvez choisir qu'entre `stable` ou `insiders` comme `browserVersion`.

### Configuration TypeScript

Dans votre `tsconfig.json`, assurez-vous d'ajouter `wdio-vscode-service` à votre liste de types :

```json
{
    "compilerOptions": {
        "types": [
            "node",
            "webdriverio/async",
            "@wdio/mocha-framework",
            "expect-webdriverio",
            "wdio-vscode-service"
        ],
        "target": "es2019",
        "moduleResolution": "node",
        "esModuleInterop": true
    }
}
```

## Utilisation

Vous pouvez ensuite utiliser la méthode `getWorkbench` pour accéder aux objets de page pour les localisateurs correspondant à votre version VSCode souhaitée :

```ts
describe('WDIO VSCode Service', () => {
    it('should be able to load VSCode', async () => {
        const workbench = await browser.getWorkbench()
        expect(await workbench.getTitleBar().getTitle())
            .toBe('[Extension Development Host] - README.md - wdio-vscode-service - Visual Studio Code')
    })
})
```

### Accès aux API VSCode

Si vous souhaitez exécuter certaines automatisations via l'[API VSCode](https://code.visualstudio.com/api/references/vscode-api), vous pouvez le faire en exécutant des commandes à distance via la commande personnalisée `executeWorkbench`. Cette commande vous permet d'exécuter à distance du code de votre test dans l'environnement VSCode et vous permet d'accéder à l'API VSCode. Vous pouvez passer des paramètres arbitraires dans la fonction qui seront ensuite propagés dans la fonction. L'objet `vscode` sera toujours passé en premier argument, suivi des paramètres de la fonction externe. Notez que vous ne pouvez pas accéder aux variables en dehors de la portée de la fonction car le rappel est exécuté à distance. Voici un exemple :

```ts
const workbench = await browser.getWorkbench()
await browser.executeWorkbench((vscode, param1, param2) => {
    vscode.window.showInformationMessage(`I am an ${param1} ${param2}!`)
}, 'API', 'call')

const notifs = await workbench.getNotifications()
console.log(await notifs[0].getMessage()) // affiche : "I am an API call!"
```

Pour la documentation complète des objets de page, consultez la [documentation](https://webdriverio-community.github.io/wdio-vscode-service/modules.html). Vous pouvez trouver divers exemples d'utilisation dans la [suite de tests de ce projet](https://github.com/webdriverio-community/wdio-vscode-service/blob/main/test/specs).

## Configuration

Via la configuration du service, vous pouvez gérer la version VSCode ainsi que les paramètres utilisateur pour VSCode :

### Options de service

Les options de service sont des options nécessaires au service pour configurer l'environnement de test.

#### `cachePath`

Définissez un chemin de cache pour éviter de télécharger à nouveau les bundles VS Code. C'est utile pour le CI/CD afin d'éviter de télécharger VSCode à chaque exécution de test.

Type: `string`<br />
Par défaut: `process.cwd()`

### Capacités VSCode (`wdio:vscodeOptions`)

Pour exécuter des tests via VSCode, vous devez définir `vscode` comme `browserName`. Vous pouvez spécifier la version VSCode en fournissant une capacité `browserVersion`. Les options personnalisées de VSCode sont ensuite définies dans la capacité personnalisée `wdio:vscodeOptions`. Les options sont les suivantes :

#### `binary`

Chemin vers une installation VSCode installée localement. Si l'option n'est pas fournie, le service téléchargera VSCode en fonction de la `browserVersion` donnée (ou `stable` si non spécifiée).

Type: `string`

#### `extensionPath`

Définissez le répertoire de l'extension que vous souhaitez tester.

Type: `string`

#### `storagePath`

Définissez un emplacement personnalisé pour que VS Code stocke toutes ses données. Il s'agit de la racine des répertoires internes de VS Code tels que (liste partielle)
* **user-data-dir**: Le répertoire où tous les paramètres utilisateur (paramètres globaux), les journaux d'extension, etc. sont stockés.
* **extension-install-dir**: Le répertoire où les extensions VS Code sont installées.

Si non fourni, un répertoire temporaire est utilisé.

Type: `string`

#### `userSettings`

Définissez des paramètres utilisateur personnalisés à appliquer à VSCode.

Type: `Record<string, number | string | object | boolean>`<br />
Par défaut: `{}`

#### `workspacePath`

Ouvre VSCode pour un espace de travail spécifique. Si ce n'est pas fourni, VSCode démarre sans qu'un espace de travail ne soit ouvert.

Type: `string`

#### `filePath`

Ouvre VSCode avec un fichier spécifique ouvert.

Type: `string`

#### `vscodeArgs`

Arguments de démarrage supplémentaires sous forme d'objet, par exemple

```ts
vscodeArgs: { fooBar: true, 'bar-foo': '/foobar' }
```

sera transmis comme :

```ts
--foo-bar --fooBar --bar-foo=/foobar
```

Type: `Record<string, string | boolean>`<br />
Par défaut: voir [`constants.ts#L5-L14`](https://github.com/webdriverio-community/wdio-vscode-service/blob/196a69be3ac2fb82d9c7e4f19a2a1c8ccbaec1e2/src/constants.ts#L5-L14)

#### `verboseLogging`

Si défini sur true, le service enregistre la sortie VSCode à partir de l'hôte d'extension et de l'API de console.

Type: `boolean`<br />
Par défaut: `false`

#### `vscodeProxyOptions`

Les configurations du proxy de l'API VSCode définissent comment WebdriverIO se connecte au workbench VSCode pour vous donner accès à l'API VSCode.

Type: `VSCodeProxyOptions`<br />
Par défaut:

```ts
{
    /**
     * Si défini sur true, le service tente d'établir une connexion avec
     * le workbench VSCode pour permettre l'accès à l'API VSCode
     */
    enable: true,
    /**
     * Port de la connexion WebSocket utilisée pour se connecter au workbench.
     * Par défaut défini sur un port disponible dans votre système d'exploitation.
     */
    // port?: number
    /**
     * Délai d'attente pour la connexion à WebSocket dans VSCode
     */
    connectionTimeout: 5000,
    /**
     * Délai d'attente pour l'exécution de la commande dans VSCode
     */
    commandTimeout: 5000
}
```

### Chromedriver

À partir de VSCode v1.86, il est nécessaire d'utiliser `webdriverio` v8.14 ou ultérieur pour installer Chromedriver sans configuration nécessaire. La [configuration simplifiée d'automatisation de navigateur](https://webdriver.io/blog/2023/07/31/driver-management) s'occupe de tout pour vous.

Pour tester les versions antérieures de VS Code, trouvez la version attendue de Chromedriver dans les journaux, téléchargez [Chromedriver](https://chromedriver.chromium.org/downloads) et configurez le chemin. Par exemple :

```
[0-0] ERROR webdriver: Failed downloading chromedriver v108: Download failed: ...
```

```ts
    capabilities: [{
        browserName: 'vscode',
        browserVersion: '1.80.0',
        'wdio:chromedriverOptions': {
            binary: path.join(cacheDir, 'chromedriver-108.0.5359.71')
```

## Créer vos propres objets de page

Vous pouvez réutiliser les composants utilisés dans ce service pour vos propres objets de page. Pour cela, créez d'abord un fichier qui définit tous vos sélecteurs, par exemple :

```ts
// par exemple dans /test/pageobjects/locators.ts
export const componentA = {
    elem: 'form', // élément conteneur du composant
    submit: 'button[type="submit"]', // bouton de soumission
    username: 'input.username', // champ de nom d'utilisateur
    password: 'input.password' // champ de mot de passe
}
```

Maintenant, vous pouvez créer un objet de page comme suit :

```ts
// par exemple dans /test/pageobjects/loginForm.ts
import { PageDecorator, IPageDecorator, BasePage } from 'wdio-vscode-service'
import * as locatorMap, { componentA as componentALocators } from './locators'
export interface LoginForm extends IPageDecorator<typeof componentALocators> {}
@PageDecorator(componentALocators)
export class LoginForm extends BasePage<typeof componentALocators, typeof locatorMap> {
    /**
     * @private clé de localisateur pour identifier la carte des localisateurs (voir locators.ts)
     */
    public locatorKey = 'componentA' as const

    public login (username: string, password: string) {
        await this.username$.setValue(username)
        await this.password$.setValue(password)
        await this.submit$.click()
    }
}
```

Maintenant, dans votre test, vous pouvez utiliser votre objet de page comme suit :

```ts
import { LoginForm } from '../pageobjects/loginForm'
import * as locatorMap from '../locators'

// par exemple dans /test/specs/example.e2e.ts
describe('my extension', () => {
    it('should login', async () => {
        const loginForm = new LoginForm(locatorMap)
        await loginForm.login('admin', 'test123')

        // vous pouvez également utiliser directement les éléments de l'objet de page via `[selector]$`
        // ou `[selector]$$`, par exemple:
        await loginForm.submit$.click()

        // ou accéder directement aux localisateurs
        console.log(loginForm.locators.username)
        // affiche: "input.username"
    })
})
```

## Support TypeScript

Si vous utilisez WebdriverIO avec TypeScript, assurez-vous d'ajouter `wdio-vscode-service` à vos `types` dans votre `tsconfig.json`, par exemple :

```json
{
    "compilerOptions": {
        "moduleResolution": "node",
        "types": [
            "webdriverio/async",
            "@wdio/mocha-framework",
            "expect-webdriverio",
            // ajoutez ce service à vos types
            "wdio-devtools-service"
        ],
        "target": "es2019"
    }
}
```

## Support du proxy

Pendant l'initialisation de ce service, une distribution ChromeDriver et VSCode est téléchargée. Vous pouvez acheminer ces requêtes via un proxy en définissant la variable d'environnement `HTTPS_PROXY` ou `https_proxy`. Par exemple :

```bash
HTTPS_PROXY=http://127.0.0.1:1080 npm run wdio
```

## Références

Les extensions VS Code suivantes utilisent `wdio-vscode-service` :

- [Marquee](https://marketplace.visualstudio.com/items?itemName=stateful.marquee) (27k téléchargements)
- [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) (27.8m téléchargements)
- [DVC Extension for Visual Studio Code](https://marketplace.visualstudio.com/items?itemName=Iterative.dvc) (11.2k téléchargements)
- [Nx Console](https://marketplace.visualstudio.com/items?itemName=nrwl.angular-console) (1.2m téléchargements)
- [inlang – i18n supercharged](https://marketplace.visualstudio.com/items?itemName=inlang.vs-code-extension) (3k téléchargements)

## Contribuer

Avant de soumettre une pull request, veuillez exécuter les éléments suivants :

1. `git clone git@github.com:webdriverio-community/wdio-vscode-service.git`
1. `cd wdio-vscode-service`
1. `npm install`
1. `npm run build`
1. `npm run test` (ou `npm run ci`)

## En savoir plus

Si vous souhaitez en savoir plus sur les tests d'extensions VSCode, consultez la présentation de [Christian Bromann](https://twitter.com/bromann) à [OpenJS World 2022](https://www.youtube.com/watch?v=PhGNTioBUiU) :

[![Testing VSCode Extensions at OpenJS World 2022](https://img.youtube.com/vi/PhGNTioBUiU/sddefault.jpg)](https://www.youtube.com/watch?v=PhGNTioBUiU)

---

Pour plus d'informations sur WebdriverIO, consultez la [page d'accueil](https://webdriver.io) du projet.