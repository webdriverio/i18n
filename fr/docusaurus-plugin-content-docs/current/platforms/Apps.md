---
id: apps-and-extensions
title: Extensions et éditeurs
description: Chargez une extension de navigateur ou une extension VS Code dans une session WebdriverIO et testez-la de bout en bout.
---

WebdriverIO teste les extensions de navigateur et les extensions d'éditeur en les chargeant dans l'application hôte réelle. Les extensions de navigateur (web) s'exécutent dans Chrome ou Firefox. Vous les chargez via les capabilities du navigateur : `--load-extension` ou un `.crx` encodé en base64 via `goog:chromeOptions` dans Chrome, ou `browser.installAddOn()` pour un `.xpi` dans Firefox. Dans une session WebDriver BiDi, vous pouvez également installer et supprimer une extension en cours de session avec `browser.installExtension()` et `browser.uninstallExtension()`. Safari ne dispose pas de session BiDi, cette commande ne couvre donc pas Safari. À partir de là, vous testez les content scripts et les pages popup avec les commandes WebDriver habituelles. Les extensions VS Code sont testées avec le service communautaire [`wdio-vscode-service`](/docs/wdio-vscode-service). Il télécharge VS Code (stable, insiders ou une version spécifique) ainsi que le Chromedriver correspondant, puis démarre VS Code avec votre extension et des paramètres utilisateur personnalisés. Des page objects pour le workbench sont disponibles via `browser.getWorkbench()`, et `browser.executeWorkbench()` exécute du code sur l'API VS Code. Le même service peut également servir VS Code dans un navigateur pour tester des extensions web. Les plugins Obsidian disposent eux aussi d'un service communautaire.

## Démarrage rapide

Installez d'abord le testrunner et la prise en charge de TypeScript :

```sh
npm install --save-dev @wdio/cli @wdio/local-runner @wdio/mocha-framework @wdio/spec-reporter tsx
```

```json title="tsconfig.json"
{
    "compilerOptions": {
        "types": ["node", "@wdio/globals/types", "@wdio/mocha-framework"]
    }
}
```

### Extension Chrome

Compilez votre extension dans un dossier (ici `./dist`) et chargez-la avec l'argument Chrome `--load-extension` :

```ts title="wdio.conf.ts"
import path from 'node:path'
import url from 'node:url'

const __dirname = url.fileURLToPath(new URL('.', import.meta.url))

export const config: WebdriverIO.Config = {
    runner: 'local',
    specs: ['./test/specs/**/*.ts'],
    capabilities: [{
        browserName: 'chrome',
        'goog:chromeOptions': {
            args: [`--load-extension=${path.join(__dirname, 'dist')}`]
        }
    }],
    framework: 'mocha',
    reporters: ['spec'],
    mochaOpts: {
        ui: 'bdd',
        timeout: 60000
    }
}
```

```ts title="test/specs/extension.e2e.ts"
import { expect, browser, $ } from '@wdio/globals'

describe('My Web Extension', () => {
    it('should inject its content script', async () => {
        await browser.url('https://webdriver.io')
        // remplacez par un élément que votre content script ajoute à la page
        await expect($('#my-extension-root')).toBeExisting()
    })
})
```

Cliquer sur l'icône de l'extension dans la barre d'outils ne fonctionne pas. Pour tester une `default_popup`, trouvez l'identifiant de l'extension sur `chrome://extensions/` et ouvrez `chrome-extension://<id>/<popup>.html` avec `browser.url()`. Le [guide des extensions web](/docs/extension-testing/web-extensions#test-popup-modal-in-chrome) propose une commande personnalisée `openExtensionPopup` prête à l'emploi à cet effet.

### Extension VS Code

```sh
npm install --save-dev wdio-vscode-service
```

Ajoutez `"wdio-vscode-service"` au tableau `types` dans `tsconfig.json`.

```ts title="wdio.conf.ts"
import url from 'node:url'

const __dirname = url.fileURLToPath(new URL('.', import.meta.url))

export const config: WebdriverIO.Config = {
    runner: 'local',
    specs: ['./test/specs/**/*.ts'],
    capabilities: [{
        browserName: 'vscode',
        browserVersion: 'stable', // également possible : "insiders" ou une version spécifique, p. ex. "1.80.0"
        'wdio:vscodeOptions': {
            // pointe vers le répertoire où se trouve le package.json de l'extension
            extensionPath: __dirname,
            userSettings: {
                'editor.fontSize': 14
            }
        }
    }],
    services: ['vscode'],
    framework: 'mocha',
    reporters: ['spec'],
    mochaOpts: {
        ui: 'bdd',
        timeout: 60000
    }
}
```

```ts title="test/specs/vscode.e2e.ts"
import { browser, expect } from '@wdio/globals'

describe('VS Code Extension Testing', () => {
    it('should be able to load VSCode', async () => {
        const workbench = await browser.getWorkbench()
        expect(await workbench.getTitleBar().getTitle())
            .toContain('[Extension Development Host]')
    })
})
```

Pour tester l'extension en tant qu'extension web VS Code, définissez `browserName: 'chrome'` et conservez `wdio:vscodeOptions`. Dans ce mode, `browserVersion` ne peut être que `stable` ou `insiders`. `npm create wdio@latest ./` avec l'option « VS Code Extension Testing » génère cette configuration pour vous.

## Choisissez votre parcours

- [Test d'extensions web](/docs/extension-testing/web-extensions) : chargez des extensions dans Chrome (dossier ou `.crx`) et Firefox (`.xpi` via [`installAddOn`](/docs/api/gecko#installaddon)), ou installez-en et supprimez-en une en cours de session avec [`installExtension`](/docs/api/browser/installExtension). Les extensions web Safari ne sont pas prises en charge.
- [Service de profil Firefox](/docs/firefox-profile-service) : créez un profil Firefox incluant des extensions.
- [Test d'extensions VS Code](/docs/extension-testing/vscode-extensions) : configuration, mise en place de TypeScript, page objects du workbench et `executeWorkbench`.
- [Service VS Code](/docs/wdio-vscode-service) : toutes les options du service, comme `cachePath`, et comment écrire des page objects personnalisés.
- [Service de test de plugins Obsidian](/docs/wdio-obsidian-service) : un service communautaire qui teste les plugins Obsidian sur différentes versions d'Obsidian sous Windows, macOS, Linux et Android.
- [Commandes personnalisées](/docs/customcommands) : regroupez des utilitaires comme `openExtensionPopup` pour les réutiliser.

Les tests d'extensions web s'exécutent dans une session Chrome ou Firefox classique, donc tout ce qui figure dans [Navigateurs web](/docs/platforms/web) s'applique, y compris les sélecteurs, le mocking réseau et les tests visuels.

## Dépannage

- Firefox refuse une extension compilée localement en raison de la signature : installez-la dans le hook `before` avec `browser.installAddOn(extension.toString('base64'), true)` plutôt que via un profil. Compilez le `.xpi` avec `npx web-ext build`.
- Utilisation d'Edge, Brave ou Opera au lieu de Chrome : les mêmes arguments fonctionnent généralement avec la capability d'options de ce navigateur, p. ex. `ms:edgeOptions`.
- Les binaires de VS Code et de Chromedriver sont téléchargés dans un répertoire de cache. Pour contrôler leur emplacement, p. ex. pour les mettre en cache en CI, définissez `services: [['vscode', { cachePath: __dirname }]]`.
- TypeScript ne trouve pas `getWorkbench` ou `executeWorkbench` : ajoutez `wdio-vscode-service` à `compilerOptions.types`.

## Étapes suivantes

- Référence de [configuration](/docs/configuration) pour chaque option de `wdio.conf.ts`.
- [Electron](/docs/desktop-testing/electron) pour tester des applications de bureau complètes basées sur Chromium.
- Autres plateformes : [Navigateurs web](/docs/platforms/web), [Applications mobiles](/docs/platforms/mobile), [Applications de bureau](/docs/platforms/desktop).