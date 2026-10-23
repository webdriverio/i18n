---
id: wdio
title: WebDriverIO DevTools
description: "Installez et configurez le service WebdriverIO DevTools pour déboguer vos tests grâce à la relecture du DOM, aux captures d'écran, à la capture du réseau et de la console, ainsi qu'aux enregistrements vidéo d'écran."
---

Un service WebdriverIO qui fournit une interface d'outils de développement pour exécuter, déboguer et inspecter les tests d'automatisation de navigateur. Ses fonctionnalités incluent la relecture des mutations du DOM, des captures d'écran par commande, l'inspection des requêtes réseau, la capture des logs de la console et l'enregistrement vidéo de la session.

## Installation

```sh
npm install @wdio/devtools-service --save-dev
```

## Utilisation

### Test Runner

```ts
// wdio.conf.ts
export const config = {
  services: ['devtools'],
}
```

### Standalone

```ts
import { remote } from 'webdriverio'
import { setupForDevtools } from '@wdio/devtools-service'

const browser = await remote(setupForDevtools({
  capabilities: { browserName: 'chrome' }
}))
await browser.url('https://example.com')
await browser.deleteSession()
```

Nécessite une session de navigateur avec WebDriver BiDi (Chrome 114+, Firefox 130+), que WebdriverIO active automatiquement. Les sessions Appium ignorent la capture de page qui en dépend ; définissez `'wdio:enforceWebDriverClassic': true` dans un bloc de capabilities Appium (voir [Tests mobiles](/docs/devtools/mobile)).

## Options du service

```ts
services: [['devtools', options]]
```

| Option | Type | Par défaut | Description |
|---|---|---|---|
| `port` | `number` | `3000` (un port libre est utilisé s'il est déjà pris) | Port sur lequel le serveur de l'interface DevTools écoute |
| `hostname` | `string` | `'localhost'` | Nom d'hôte auquel le serveur de l'interface DevTools est lié |
| `devtoolsCapabilities` | `Capabilities` | Chrome 1600x1200 | Capabilities utilisées pour ouvrir la fenêtre de l'interface DevTools |
| `screencast` | `ScreencastOptions` | - | Enregistrement vidéo de la session ([voir Screencast](/docs/devtools/wdio/screencast)) |
| `mode` | `'live' \| 'trace'` | `'live'` | `live` ouvre l'interface DevTools ; `trace` l'ignore et écrit à la place un artefact portable ([voir Trace Mode](/docs/devtools/wdio/trace-mode)) |
| `traceFormat` | `'zip' \| 'ndjson-directory'` | `'zip'` | Structure de l'artefact de trace — archive unique ou répertoire décompressé. S'applique uniquement lorsque `mode: 'trace'` |
| `traceGranularity` | `'session' \| 'spec' \| 'test'` | `'session'` | Une trace par session / fichier de spec / test. `'test'` écrit chacune dans `test-results/<spec>-<title>-<browser>[-retryN]/trace.zip`. S'applique uniquement lorsque `mode: 'trace'` ([voir Trace Mode](/docs/devtools/wdio/trace-mode#trace-granularity--tracegranularity)) |
| `tracePolicy` | `'on' \| 'retain-on-failure' \| 'retain-on-first-failure' \| 'on-first-retry' \| 'on-all-retries' \| 'retain-on-failure-and-retries'` | `'on'` | Quelles traces conserver. S'associe à `traceGranularity: 'test'`. S'applique uniquement lorsque `mode: 'trace'` |
| `filmstrip` | `boolean` | `true` | Enregistre une pellicule (filmstrip) dense et continue du screencast *dans* la trace pour une lecture fluide et navigable dans le lecteur — des images denses en plus des images par action, allégées et adressées par contenu lors de l'export. S'applique uniquement lorsque `mode: 'trace'` |
| `screenshot` | `'off' \| 'on' \| 'only-on-failure'` | `'off'` | Capture d'écran par test, jointe en ligne à Allure (`image/png`). Nécessite `mode: 'trace'` + `traceGranularity: 'test'` |
| `video` | `'off' \| TraceRetentionPolicy` | `'off'` | Vidéo screencast par test, conservée selon la politique donnée et jointe en ligne à Allure (`video/webm`). Nécessite `mode: 'trace'` + `traceGranularity: 'test'` |
| `emitArtifactsManifest` | `boolean` | `false` | Écrit `devtools-artifacts-<sessionId>.json` — un index générique de chaque artefact produit ainsi que de l'état de chaque test, destiné aux reporters/à la CI. Activé automatiquement lorsque `@wdio/allure-reporter` figure dans la configuration. S'applique uniquement lorsque `mode: 'trace'` |
| `captureAssertions` | `boolean` | `true` | Capture les assertions sous forme de lignes d'action de trace — `node:assert` ainsi que les matchers `expect(...)` réussis/échoués. Définissez `false` pour désactiver |

## Snapshot à l'exécution

Le service ajoute une commande `browser.getSnapshot()` qui renvoie un arbre d'accessibilité lisible par une IA de la page actuelle (`text`) ainsi qu'une map `elements` associant des références courtes (`e1`, `e2`, …) à des sélecteurs :

```ts
const { text, elements } = await browser.getSnapshot({ inViewportOnly: true })
```

Elle lit directement la page en cours, sans la surcharge du mode trace. Ses localisateurs utilisent toujours du CSS / XPath portable, de sorte qu'un localisateur textuel peut différer de celui en dialecte WebdriverIO affiché dans l'onglet A11y du lecteur de traces.

## Prise en main

1. Exécutez vos tests WebdriverIO
2. L'interface DevTools s'ouvre automatiquement dans une fenêtre de navigateur externe
3. Les tests commencent à s'exécuter immédiatement avec une visualisation en temps réel
4. Consultez l'aperçu en direct du navigateur, la progression des tests et l'exécution des commandes
5. Une fois la première exécution terminée, utilisez les boutons de lecture pour relancer des tests ou des suites individuellement
6. Cliquez à tout moment sur le bouton d'arrêt pour interrompre les tests en cours
7. Explorez les actions, les métadonnées, les logs de la console et le code source dans les onglets de l'espace de travail

## Fonctionnalités

Découvrez en détail les fonctionnalités de WebDriverIO DevTools :

- **[Relance interactive des tests et visualisation](/docs/devtools/wdio/interactive-test-rerunning)** - Aperçus du navigateur en temps réel avec relance des tests
- **[Conserver et relancer (comparaison)](/docs/devtools/wdio/preserve-and-rerun)** - Capturez un test en échec, relancez-le et comparez les deux exécutions côte à côte
- **[Prise en charge multi-frameworks](/docs/devtools/wdio/multi-framework-support)** - Fonctionne avec Mocha, Jasmine et Cucumber
- **[Logs de la console](/docs/devtools/wdio/console-logs)** - Capturez et inspectez la sortie de la console du navigateur
- **[Logs réseau](/docs/devtools/wdio/network-logs)** - Surveillez les appels d'API et l'activité réseau
- **[Métadonnées](/docs/devtools/wdio/metadata)** - Capabilities de la session, environnement et durées pour chaque session de navigateur
- **[TestLens](/docs/devtools/wdio/testlens)** - Accédez au code source grâce à une navigation intelligente dans le code
- **[Screencast de session](/docs/devtools/wdio/screencast)** - Enregistrement vidéo automatique des sessions de navigateur
- **[Trace Mode](/docs/devtools/wdio/trace-mode)** - Chemin de capture headless produisant un artefact portable `trace.zip` (sans fenêtre d'interface) ; prend en charge les formats de sortie `zip` et `ndjson-directory`, une granularité par session/spec/test, des politiques de conservation tenant compte des relances et une `filmstrip` dense optionnelle, le tout consultable dans le lecteur officiel `show-trace`

## Lecteur de traces

Une trace enregistrée avec `mode: 'trace'` s'ouvre dans le lecteur officiel `show-trace` (`npx show-trace path/to/trace.zip`) — voyage dans le temps du DOM, onglet A11y et superposition d'éléments pour la sélection de localisateurs, onglet Transcript avec Copy-for-LLM, onglets Errors / Console / Network / Source, et une timeline navigable (filmstrip dense, imbrication Scenario → Step de Cucumber).

Consultez la page **[Lecteur de traces](/docs/devtools/trace-player)** pour une présentation complète et d'autres visionneuses compatibles.

## Rapports Allure

Lorsque `@wdio/allure-reporter` figure dans la configuration, les artefacts du mode trace (le zip de trace, ainsi que la capture d'écran et la vidéo par test avec `traceGranularity: 'test'`) sont automatiquement joints au rapport Allure, et `emitArtifactsManifest` est activé automatiquement.

Consultez **[Intégration Allure](/docs/devtools/allure)** pour les détails sur les pièces jointes et les options de masquage des étapes du reporter.