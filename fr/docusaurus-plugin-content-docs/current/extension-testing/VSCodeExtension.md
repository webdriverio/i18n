---
id: vscode-extensions
title: Tests d'extensions VS Code
description: "Testez des extensions VS Code de bout en bout dans l'IDE de bureau ou en tant qu'extensions web avec WebdriverIO et le service VS Code."
---

WebdriverIO vous permet de tester facilement vos extensions [VS Code](https://code.visualstudio.com/) de bout en bout dans l'IDE VS Code Desktop ou en tant qu'extension web. Il vous suffit de fournir un chemin vers votre extension et le framework s'occupe du reste. Avec le [`wdio-vscode-service`](https://www.npmjs.com/package/wdio-vscode-service), tout est pris en charge, et bien plus encore :

- 🏗️ Installation de VSCode (version stable, insiders ou une version spécifiée)
- ⬇️ Téléchargement de Chromedriver spécifique à la version de VSCode donnée
- 🚀 Vous permet d'accéder à l'API VSCode depuis vos tests
- 🖥️ Démarrage de VSCode avec des paramètres utilisateur personnalisés (y compris la prise en charge de VSCode sur Ubuntu, MacOS et Windows)
- 🌐 Ou sert VSCode depuis un serveur pour être accessible par n'importe quel navigateur afin de tester des extensions web
- 📔 Initialisation des page objects avec des sélecteurs correspondant à votre version de VSCode

## Premiers pas

Pour initier un nouveau projet WebdriverIO, exécutez :

```sh
npm create wdio@latest ./
```

Un assistant d'installation vous guidera tout au long du processus. Assurez-vous de sélectionner _"VS Code Extension Testing"_ lorsqu'il vous demande quel type de test vous souhaitez effectuer, puis conservez simplement les valeurs par défaut ou modifiez-les selon vos préférences.

## Exemple de configuration

Pour utiliser le service, vous devez ajouter `vscode` à votre liste de services, éventuellement suivi d'un objet de configuration. Cela permettra à WebdriverIO de télécharger les binaires VSCode donnés et la version appropriée de Chromedriver :

```js
// wdio.conf.ts
export const config = {
    outputDir: 'trace',
    // ...
    capabilities: [{
        browserName: 'vscode',
        browserVersion: '1.71.0', // "insiders" ou "stable" pour la dernière version de VSCode
        'wdio:vscodeOptions': {
            extensionPath: __dirname,
            userSettings: {
                "editor.fontSize": 14
            }
        }
    }],
    services: ['vscode'],
    /**
     * vous pouvez éventuellement définir le chemin où WebdriverIO stocke tous
     * les binaires VSCode et Chromedriver, par exemple :
     * services: [['vscode', { cachePath: __dirname }]]
     */
    // ...
};
```

Si vous définissez `wdio:vscodeOptions` avec un `browserName` autre que `vscode`, par exemple `chrome`, le service servira l'extension en tant qu'extension web. Si vous testez sur Chrome, aucun service de pilote supplémentaire n'est requis, par exemple :

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

_Remarque :_ lors du test d'extensions web, vous ne pouvez choisir qu'entre `stable` ou `insiders` comme `browserVersion`.

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
        "target": "es2020",
        "moduleResolution": "node16"
    }
}
```

## Utilisation

Vous pouvez ensuite utiliser la méthode `getWorkbench` pour accéder aux page objects dont les sélecteurs correspondent à la version de VSCode souhaitée :

```ts
describe('WDIO VSCode Service', () => {
    it('should be able to load VSCode', async () => {
        const workbench = await browser.getWorkbench()
        expect(await workbench.getTitleBar().getTitle())
            .toBe('[Extension Development Host] - README.md - wdio-vscode-service - Visual Studio Code')
    })
})
```

À partir de là, vous pouvez accéder à tous les page objects en utilisant les méthodes de page object appropriées. Découvrez-en plus sur tous les page objects disponibles et leurs méthodes dans la [documentation des page objects](https://webdriverio-community.github.io/wdio-vscode-service/).

### Accéder aux API VSCode

Si vous souhaitez exécuter certaines automatisations via l'[API VSCode](https://code.visualstudio.com/api/references/vscode-api), vous pouvez le faire en exécutant des commandes à distance via la commande personnalisée `executeWorkbench`. Cette commande permet d'exécuter à distance du code depuis votre test dans l'environnement VSCode et d'accéder à l'API VSCode. Vous pouvez passer des paramètres arbitraires à la fonction, qui seront ensuite propagés dans celle-ci. L'objet `vscode` sera toujours passé comme premier argument, suivi des paramètres de la fonction externe. Notez que vous ne pouvez pas accéder aux variables en dehors de la portée de la fonction, car le callback est exécuté à distance. Voici un exemple :

```ts
const workbench = await browser.getWorkbench()
await browser.executeWorkbench((vscode, param1, param2) => {
    vscode.window.showInformationMessage(`I am an ${param1} ${param2}!`)
}, 'API', 'call')

const notifs = await workbench.getNotifications()
console.log(await notifs[0].getMessage()) // affiche : "I am an API call!"
```

Pour la documentation complète des page objects, consultez la [documentation](https://webdriverio-community.github.io/wdio-vscode-service/modules.html). Vous trouverez divers exemples d'utilisation dans la [suite de tests de ce projet](https://github.com/webdriverio-community/wdio-vscode-service/blob/main/test/specs).

## Plus d'informations

Vous pouvez en apprendre davantage sur la configuration du [`wdio-vscode-service`](https://www.npmjs.com/package/wdio-vscode-service) et sur la création de page objects personnalisés dans la [documentation du service](/docs/wdio-vscode-service). Vous pouvez également regarder la présentation suivante de [Christian Bromann](https://twitter.com/bromann) sur [_Testing Complex VSCode Extensions With the Power of Web Standards_](https://www.youtube.com/watch?v=PhGNTioBUiU) :

<LiteYouTubeEmbed
    id="PhGNTioBUiU"
    title="Testing Complex VSCode Extensions With the Power of Web Standards"
/>