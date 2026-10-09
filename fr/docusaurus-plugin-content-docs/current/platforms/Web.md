---
id: web
title: Navigateurs Web
description: Configurez et exécutez des tests WebdriverIO de bout en bout, de composants, visuels et d'accessibilité dans Chrome, Firefox, Microsoft Edge et Safari.
---

WebdriverIO automatise les navigateurs de bureau (Chrome, Chromium, Firefox, Microsoft Edge et Safari) grâce aux pilotes de navigateur standard. Par défaut, il tente d'ouvrir une session [WebDriver BiDi](/docs/automationProtocols), le successeur bidirectionnel du protocole WebDriver classique. BiDi permet des fonctionnalités telles que la simulation réseau (mocking) et l'émulation des Web API. Définissez `wdio:enforceWebDriverClassic: true` dans vos capabilities pour le désactiver. Vous n'avez pas besoin d'installer les pilotes vous-même : définissez un `browserName` et WebdriverIO télécharge et démarre le Chromedriver, Geckodriver ou Edgedriver correspondant. Il installe également Chrome, Chromium ou Firefox lorsqu'aucune installation locale n'est trouvée. Microsoft Edge doit déjà être installé, et Safaridriver est fourni avec macOS. Le même testrunner peut également exécuter des tests à l'intérieur du navigateur avec le Browser Runner. Cela couvre les tests unitaires et de composants pour React, Vue, Svelte, SolidJS, Preact, Lit et Stencil.

## Démarrage rapide

Créez un projet de manière interactive avec `npm init wdio@latest .`. L'option `--yes` sélectionne les valeurs par défaut : Mocha, Chrome et page objects. Pour configurer un projet manuellement, installez le testrunner, un adaptateur de framework, un reporter et `tsx` pour TypeScript :

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

```ts title="wdio.conf.ts"
export const config: WebdriverIO.Config = {
    runner: 'local',
    specs: ['./test/specs/**/*.ts'],
    maxInstances: 10,
    capabilities: [{
        browserName: 'chrome'
    }, {
        browserName: 'firefox'
    }],
    logLevel: 'info',
    waitforTimeout: 10000,
    framework: 'mocha',
    reporters: ['spec'],
    mochaOpts: {
        ui: 'bdd',
        timeout: 60000
    }
}
```

```ts title="test/specs/login.e2e.ts"
import { expect, browser, $ } from '@wdio/globals'

describe('My Login application', () => {
    it('should login with valid credentials', async () => {
        await browser.url('https://the-internet.herokuapp.com/login')

        await $('#username').setValue('tomsmith')
        await $('#password').setValue('SuperSecretPassword!')
        await $('button[type="submit"]').click()

        await expect($('#flash')).toBeExisting()
        await expect($('#flash')).toHaveText(
            expect.stringContaining('You logged into a secure area!'))
    })
})
```

```sh
npx wdio run ./wdio.conf.ts
```

Chaque capability dispose de ses propres processus workers, ce qui permet d'exécuter le spec à la fois dans Chrome et Firefox. Les autres valeurs valides de `browserName` sont `chromium`, `msedge` et `safari`. Pour une exécution en mode headless, ajoutez des arguments de navigateur tels que `'goog:chromeOptions': { args: ['headless', 'disable-gpu'] }`. Consultez [Exécuter le navigateur en mode headless](/docs/capabilities#run-browser-headless) pour Firefox et Edge ; Safari ne dispose pas de mode headless.

## Choisissez votre parcours

Tests de bout en bout sur plusieurs navigateurs :

- [Capabilities](/docs/capabilities) : options du navigateur, mode headless, canaux de navigateur (Canary, Nightly, Safari Technology Preview) et options de pilote `wdio:*`.
- [Binaires des pilotes](/docs/driverbinaries) : fonctionnement de la configuration automatique des navigateurs et des pilotes, et comment pointer vers des binaires personnalisés.
- [Protocoles d'automatisation](/docs/automationProtocols) : WebDriver vs. WebDriver BiDi.
- [Commandes WebDriver BiDi](/docs/api/webdriverBidi) : commandes brutes du protocole BiDi disponibles sur l'objet `browser`.
- [Sélecteurs](/docs/selectors) : sélecteurs CSS, texte, ARIA, profonds (shadow DOM) et React.
- [Attente automatique](/docs/autowait) et [Délais d'attente](/docs/timeouts) : comment WebdriverIO attend les éléments et quels paramètres ajuster.
- [Multi-remote](/docs/multiremote) : contrôlez plusieurs navigateurs dans un seul test, par exemple pour des applications de chat ou WebRTC.

Fonctionnalités de navigateur nécessitant WebDriver BiDi (Chrome, Edge et Firefox ; pas Safari) :

- [Mocks et espions de requêtes](/docs/mocksandspies) : interceptez, modifiez ou simulez des requêtes réseau avec `browser.mock()`. Voir aussi l'[objet Mock](/docs/api/mock).
- [Émulation](/docs/emulation) : émulez la géolocalisation, les fonctionnalités média, l'agent utilisateur, l'état hors ligne, la locale, le fuseau horaire, l'écran et les appareils avec `browser.emulate()`.

Tests de composants et tests unitaires dans un vrai navigateur :

- [Tests de composants](/docs/component-testing) : fonctionnement du [Browser Runner](/docs/runner#browser-runner) basé sur Vite et comment le configurer.
- Guides des frameworks : [React](/docs/component-testing/react), [Vue.js](/docs/component-testing/vue), [Svelte](/docs/component-testing/svelte), [SolidJS](/docs/component-testing/solid), [Preact](/docs/component-testing/preact), [Lit](/docs/component-testing/lit), [Stencil](/docs/component-testing/stencil).
- [Mocking](/docs/component-testing/mocking) et [Couverture](/docs/component-testing/coverage) pour les tests de composants.

Tests visuels et d'accessibilité :

- [Tests visuels](/docs/visual-testing) : comparaison d'images de l'écran, d'éléments et de pages entières avec `@wdio/visual-service`.
- [Snapshot](/docs/snapshot) : assertions de snapshots du DOM et d'objets.
- [Axe Core](/docs/accessibility-testing/axe-core) : exécutez des analyses d'accessibilité Deque axe depuis vos tests.

Passage à l'échelle :

- [Selenium Grid](/docs/seleniumgrid), [Services cloud](/docs/cloudservices) et [Docker](/docs/docker) : exécutez des navigateurs à distance.
- [Sharding](/docs/sharding) : répartissez une suite sur plusieurs machines CI.

Un test de composant utilise le même fichier de configuration avec un runner différent. Par exemple, pour utiliser le preset React :

```ts title="wdio.conf.ts"
export const config: WebdriverIO.Config = {
    runner: ['browser', {
        preset: 'react'
    }],
    specs: ['./src/**/*.test.tsx'],
    capabilities: [{
        browserName: 'chrome'
    }],
    framework: 'mocha',
    reporters: ['spec']
}
```

Le Browser Runner nécessite `@wdio/browser-runner`. Le preset React nécessite également `@vitejs/plugin-react`, et les guides recommandent `@testing-library/react` pour le rendu. Des presets existent pour `vue`, `svelte`, `solid`, `react`, `preact` et `stencil`. Pour tout le reste, utilisez plutôt `viteConfig`.

## Dépannage

- Chrome ne parvient pas à démarrer en CI avec l'erreur « user data directory is already in use » ou « DevToolsActivePort file doesn't exist » : consultez [Headless & serveurs d'affichage](/docs/headless-and-display-servers#troubleshooting).
- `browser.mock()` ou `browser.emulate()` n'a aucun effet : la session n'utilise pas WebDriver BiDi. Vérifiez votre navigateur (Safari ne prend pas en charge BiDi), votre fournisseur cloud et `wdio:enforceWebDriverClassic`.
- Les pilotes ou navigateurs ne peuvent pas être téléchargés derrière un proxy : consultez [Hôte de téléchargement personnalisé des pilotes](/docs/capabilities#custom-driver-download-host) et [Configuration du proxy](/docs/proxy).
- Tests instables : consultez [Relancer les tests instables](/docs/retry) et [Débogage](/docs/debugging).

## Prochaines étapes

- Référence de [Configuration](/docs/configuration) pour chaque option de `wdio.conf.ts`.
- [Configuration TypeScript](/docs/typescript) et [Frameworks](/docs/frameworks) (Mocha, Jasmine, Cucumber).
- [Modèle Page Object](/docs/pageobjects) pour structurer des suites plus importantes.
- [MCP](/docs/mcp) pour permettre à un agent IA de piloter une session de navigateur via WebdriverIO.
- Autres plateformes : [Applications mobiles](/docs/platforms/mobile), [Applications de bureau](/docs/platforms/desktop), [Extensions & éditeurs](/docs/platforms/apps-and-extensions).