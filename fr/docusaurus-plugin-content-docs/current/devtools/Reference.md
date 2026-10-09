---
id: reference
title: Référence de configuration
description: "Consultez toutes les options DevTools pour le mode live et le mode trace sur les adaptateurs WebdriverIO, Selenium et Nightwatch, avec leurs valeurs par défaut."
---

Toutes les options DevTools en un coup d'œil, pour les trois adaptateurs. Les **noms, types et valeurs par défaut des options sont identiques** sur chaque adaptateur ; lorsque le comportement diffère, cela est indiqué. Pour l'explication complète de chaque option de trace, consultez la section correspondante de la page [Trace Mode](/docs/devtools/wdio/trace-mode).

Transmettez les options de la manière attendue par chaque adaptateur :

- **WebdriverIO** — `services: [['devtools', { … }]]`
- **Selenium** — `DevTools.configure({ … })`
- **Nightwatch** — `globals: nightwatchDevtools({ … })`

## Options de mode et du mode live

| Option | Type / valeurs | Défaut | Remarques |
|---|---|---|---|
| `mode` | `'live' \| 'trace'` | `'live'` | `'live'` ouvre le tableau de bord de l'interface DevTools ; `'trace'` l'ignore et écrit un artefact portable. Les deux sont mutuellement exclusifs. |
| `port` | `number` | aléatoire | Port sur lequel l'interface / le backend DevTools est lié. Mode live uniquement. |
| `hostname` | `string` | `'localhost'` | Nom d'hôte sur lequel le serveur est lié. Mode live uniquement. |
| `screencast` | `ScreencastOptions` | `{ enabled: false }` | Vidéo continue de la session (`.webm`). Mode live uniquement — pour le mode trace, utilisez `video`. Voir [Screencast](/docs/devtools/wdio/screencast). |
| `devtoolsCapabilities` | `Capabilities` | Chrome 1600×1200 | Capabilities utilisées pour ouvrir la fenêtre de l'interface DevTools. WebdriverIO, mode live uniquement. |

## Options du mode trace

S'appliquent uniquement lorsque `mode: 'trace'`.

| Option | Type / valeurs | Défaut | Détails |
|---|---|---|---|
| `traceFormat` | `'zip' \| 'ndjson-directory'` | `'zip'` | Archive unique ou répertoire décompressé. [Format de sortie](/docs/devtools/wdio/trace-mode#output-format--traceformat) |
| `traceGranularity` | `'session' \| 'spec' \| 'test'` | `'session'` | Une trace par session / fichier de spec / test. `'test'` est requis pour les captures d'écran/vidéos par test et l'attachement inline Allure. [Granularité de la trace](/docs/devtools/wdio/trace-mode#trace-granularity--tracegranularity) |
| `tracePolicy` | `'on' \| 'retain-on-failure' \| 'retain-on-first-failure' \| 'on-first-retry' \| 'on-all-retries' \| 'retain-on-failure-and-retries'` | `'on'` | Quelles traces conserver. S'associe à `traceGranularity: 'test'`. [Rétention](/docs/devtools/wdio/trace-mode#retention--tracepolicy) |
| `filmstrip` | `boolean` | `true` | Screencast dense et continu dans la trace pour une navigation fluide ; `false` enregistre une image par action. [Filmstrip dense](/docs/devtools/wdio/trace-mode#dense-filmstrip--filmstrip) |
| `screenshot` | `'off' \| 'on' \| 'only-on-failure'` | `'off'` | Capture d'écran par test (nécessite `traceGranularity: 'test'`). Option du service WebdriverIO. [Capture d'écran et vidéo par test](/docs/devtools/wdio/trace-mode#per-test-screenshot--video--screenshot--video) |
| `video` | `'off' \| <tracePolicy value>` | `'off'` | Segment vidéo par test (nécessite `traceGranularity: 'test'`). Option du service WebdriverIO. [Capture d'écran et vidéo par test](/docs/devtools/wdio/trace-mode#per-test-screenshot--video--screenshot--video) |
| `emitArtifactsManifest` | `boolean` | `false` | Écrit `devtools-artifacts-<sessionId>.json`. Activé automatiquement lorsqu'un reporter Allure est détecté (opt-in sur Nightwatch). [Manifeste des artefacts](/docs/devtools/wdio/trace-mode#artifacts-manifest--emitartifactsmanifest) |
| `captureAssertions` | `boolean` | `true` | Capture `node:assert` (et les matchers `expect` du framework lorsqu'ils sont pris en charge) en tant qu'actions de trace. [Assertions](/docs/devtools/wdio/trace-mode#assertions--captureassertions) |

## Spécifique à Nightwatch

| Option | Type / valeurs | Défaut | Remarques |
|---|---|---|---|
| `bidi` | `boolean` | `false` | Active la capture WebDriver BiDi (console + exceptions JS + réseau). Nécessite `webSocketUrl: true` dans les capabilities. Sur WebdriverIO et Selenium, BiDi est attaché automatiquement. Voir [Nightwatch → Capture BiDi](/docs/devtools/nightwatch#bidi-capture-opt-in). |

## Différences selon l'adaptateur

Certaines fonctionnalités de trace sont dégradées sur certains adaptateurs — consultez la [matrice de compatibilité multi-framework](/docs/devtools/cross-framework) pour une vue d'ensemble. Les plus notables :

- **Rétention tenant compte des retries sur Nightwatch** — seule `retain-on-failure` est fiable ; les autres valeurs de `tracePolicy` se rabattent sur celle-ci.
- **BDD `describe/it` sur Nightwatch** — `traceGranularity: 'test'` se réduit à un seul segment à l'échelle de la session.
- **Attachement Allure sur Nightwatch** — les `screenshot`/`video` par test sont uniquement produits (fichiers + manifeste), sans être attachés inline.