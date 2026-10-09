---
id: wdio
title: WebDriverIO DevTools
description: "Installez et configurez le service WebdriverIO DevTools pour déboguer les tests grâce à la relecture du DOM, aux captures d'écran, à la capture du réseau et de la console, et aux enregistrements vidéo d'écran."
---

Un service WebdriverIO qui fournit une interface d'outils de développement pour exécuter, déboguer et inspecter les tests d'automatisation du navigateur. Les fonctionnalités incluent la relecture des mutations du DOM, des captures d'écran par commande, l'inspection des requêtes réseau, la capture des logs de la console et l'enregistrement vidéo (screencast) de la session.

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

### Mode autonome

```ts
import { remote } from 'webdriverio'
import { setupForDevtools } from '@wdio/devtools-service'

const browser = await remote(setupForDevtools({
  capabilities: { browserName: 'chrome' }
}))
await browser.url('https://example.com')
await browser.deleteSession()
```

## Options du service

```ts
services: [['devtools', options]]
```

| Option | Type | Défaut | Description |
|---|---|---|---|
| `port` | `number` | aléatoire | Port sur lequel écoute le serveur de l'interface DevTools |
| `hostname` | `string` | `'localhost'` | Nom d'hôte auquel se lie le serveur de l'interface DevTools |
| `devtoolsCapabilities` | `Capabilities` | Chrome 1600x1200 | Capabilities utilisées pour ouvrir la fenêtre de l'interface DevTools |
| `screencast` | `ScreencastOptions` | - | Enregistrement vidéo de la session ([voir Screencast](/docs/devtools/wdio/screencast)) |
| `mode` | `'live' \| 'trace'` | `'live'` | `live` ouvre l'interface DevTools ; `trace` l'ignore et écrit à la place un artefact portable ([voir Mode Trace](/docs/devtools/wdio/trace-mode)) |
| `traceFormat` | `'zip' \| 'ndjson-directory'` | `'zip'` | Structure de l'artefact de trace — archive unique ou répertoire décompressé. S'applique uniquement avec `mode: 'trace'` |
| `traceGranularity` | `'session' \| 'spec' \| 'test'` | `'session'` | Une trace par session / fichier de spec / test. `'test'` écrit chacune dans `test-results/<spec>-<title>-<browser>[-retryN]/trace.zip`. S'applique uniquement avec `mode: 'trace'` ([voir Mode Trace](/docs/devtools/wdio/trace-mode#trace-granularity--tracegranularity)) |
| `tracePolicy` | `'on' \| 'retain-on-failure' \| 'retain-on-first-failure' \| 'on-first-retry' \| 'on-all-retries' \| 'retain-on-failure-and-retries'` | `'on'` | Quelles traces conserver. S'associe à `traceGranularity: 'test'`. S'applique uniquement avec `mode: 'trace'` |
| `filmstrip` | `boolean` | `true` | Enregistre une pellicule (filmstrip) de screencast dense et continue *dans* la trace pour une lecture fluide et navigable dans le lecteur — des images denses en plus des images par action, allégées et adressées par contenu lors de l'export. S'applique uniquement avec `mode: 'trace'` |
| `screenshot` | `'off' \| 'on' \| 'only-on-failure'` | `'off'` | Capture d'écran par test, jointe en ligne à Allure (`image/png`). Nécessite `mode: 'trace'` + `traceGranularity: 'test'` |
| `video` | `'off' \| TraceRetentionPolicy` | `'off'` | Vidéo screencast par test, conservée selon la politique indiquée et jointe en ligne à Allure (`video/webm`). Nécessite `mode: 'trace'` + `traceGranularity: 'test'` |
| `emitArtifactsManifest` | `boolean` | `false` | Écrit `devtools-artifacts-<sessionId>.json` — un index générique de chaque artefact produit ainsi que l'état de chaque test, pour les reporters/la CI. Activé automatiquement lorsque `@wdio/allure-reporter` est présent dans la configuration. S'applique uniquement avec `mode: 'trace'` |
| `captureAssertions` | `boolean` | `true` | Capture les assertions sous forme de lignes d'action dans la trace — `node:assert` ainsi que les matchers `expect(...)` réussis/échoués. Définissez `false` pour désactiver |

## Prise en main

1. Exécutez vos tests WebdriverIO
2. L'interface DevTools s'ouvre automatiquement dans une fenêtre de navigateur externe
3. Les tests commencent à s'exécuter immédiatement avec une visualisation en temps réel
4. Visualisez l'aperçu du navigateur en direct, la progression des tests et l'exécution des commandes
5. Une fois la première exécution terminée, utilisez les boutons de lecture pour relancer des tests ou des suites individuels
6. Cliquez à tout moment sur le bouton d'arrêt pour interrompre les tests en cours
7. Explorez les actions, les métadonnées, les logs de la console et le code source dans les onglets de l'espace de travail

## Fonctionnalités

Découvrez en détail les fonctionnalités de WebDriverIO DevTools :

- **[Relance interactive des tests et visualisation](/docs/devtools/wdio/interactive-test-rerunning)** - Aperçus du navigateur en temps réel avec relance des tests
- **[Conserver et relancer (Comparer)](/docs/devtools/wdio/preserve-and-rerun)** - Capturez un instantané d'un test en échec, relancez-le et comparez les deux exécutions côte à côte
- **[Prise en charge multi-frameworks](/docs/devtools/wdio/multi-framework-support)** - Fonctionne avec Mocha, Jasmine et Cucumber
- **[Logs de la console](/docs/devtools/wdio/console-logs)** - Capturez et inspectez la sortie de la console du navigateur
- **[Logs réseau](/docs/devtools/wdio/network-logs)** - Surveillez les appels d'API et l'activité réseau
- **[Métadonnées](/docs/devtools/wdio/metadata)** - Capabilities de la session, environnement et durées pour chaque session de navigateur
- **[TestLens](/docs/devtools/wdio/testlens)** - Accédez au code source grâce à une navigation intelligente dans le code
- **[Screencast de session](/docs/devtools/wdio/screencast)** - Enregistrement vidéo automatique des sessions de navigateur
- **[Mode Trace](/docs/devtools/wdio/trace-mode)** - Mode de capture sans interface produisant un artefact portable `trace.zip` (aucune fenêtre d'interface) ; prend en charge les formats de sortie `zip` et `ndjson-directory`, une granularité par session/spec/test, des politiques de conservation tenant compte des relances et une `filmstrip` dense optionnelle, le tout consultable dans le lecteur officiel `show-trace`

## Lecteur de traces

Une trace enregistrée avec `mode: 'trace'` s'ouvre dans le lecteur officiel `show-trace` (`npx show-trace path/to/trace.zip`) — voyage dans le temps du DOM, onglet A11y et superposition d'éléments du sélecteur de locator, onglet Transcript avec Copy-for-LLM, onglets Errors / Console / Network / Source, et une timeline navigable (filmstrip dense, imbrication Cucumber Feature → Scenario → Step).

Consultez la page **[Lecteur de traces](/docs/devtools/trace-player)** pour le guide complet et les autres visionneuses compatibles.

## Rapports Allure

Lorsque `@wdio/allure-reporter` est présent dans la configuration, les artefacts du mode trace (le zip de trace, ainsi que la capture d'écran et la vidéo par test avec `traceGranularity: 'test'`) sont automatiquement joints au rapport Allure, et `emitArtifactsManifest` est activé automatiquement.

Consultez **[Intégration Allure](/docs/devtools/allure)** pour les détails des pièces jointes et les options de masquage des étapes du reporter.