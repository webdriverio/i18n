---
id: nightwatch
title: Nightwatch DevTools
description: "Ajoutez l'interface de débogage DevTools à une suite de tests Nightwatch sans modifier les tests, et configurez les screencasts, la capture BiDi et le mode trace."
---

Adaptateur Nightwatch pour [WebdriverIO DevTools](https://github.com/webdriverio/devtools) : il apporte la même interface de débogage visuel à votre suite de tests Nightwatch, sans aucune modification du code de vos tests.

## Installation

```bash
npm install @wdio/nightwatch-devtools
```

## Configuration

### Nightwatch standard (style mocha)

```js
// nightwatch.conf.cjs
const nightwatchDevtools = require('@wdio/nightwatch-devtools').default

module.exports = {
  src_folders: ['tests'],

  test_settings: {
    default: {
      desiredCapabilities: {
        browserName: 'chrome',
        // Requis pour la capture des requêtes réseau
        'goog:loggingPrefs': { performance: 'ALL' }
      },
      globals: nightwatchDevtools({ port: 3000 })
    }
  }
}
```

Lancez vos tests comme d'habitude : l'interface DevTools s'ouvre automatiquement dans une nouvelle fenêtre de navigateur :

```bash
nightwatch
```

> Aucune modification de vos fichiers de test n'est nécessaire.

### Cucumber / BDD

Importez `cucumberHooksPath` en plus de l'export principal et passez-le à l'option `require` de Cucumber. Cela enregistre des hooks de scénario `Before` / `After` qui reproduisent le comportement `beforeScenario` / `afterScenario` du service WebdriverIO.

```js
// nightwatch.conf.cjs
const nightwatchDevtools = require('@wdio/nightwatch-devtools').default
const { cucumberHooksPath } = require('@wdio/nightwatch-devtools')

module.exports = {
  src_folders: ['features/step_definitions'],

  test_runner: {
    type: 'cucumber',
    options: {
      feature_path: 'features',
      require: [cucumberHooksPath] // <-- enregistre les hooks Cucumber de DevTools
    }
  },

  test_settings: {
    default: {
      desiredCapabilities: {
        browserName: 'chrome',
        'goog:loggingPrefs': { performance: 'ALL' }
      },
      globals: nightwatchDevtools({ port: 3000 })
    }
  }
}
```

## Options de configuration

| Option | Type | Valeur par défaut | Description |
|--------|------|---------|-------------|
| `port` | `number` | `3000` | Port du serveur backend DevTools. Incrémenté automatiquement s'il est déjà utilisé. |
| `hostname` | `string` | `'localhost'` | Nom d'hôte auquel le serveur backend se lie. |
| `screencast` | `ScreencastOptions` | `{ enabled: false }` | Enregistrement vidéo `.webm` par session. Voir [Screencast](#screencast) ci-dessous. |
| `bidi` | `boolean` | `false` | Active la capture WebDriver BiDi pour la console du navigateur, les exceptions JS et le réseau. Nécessite `webSocketUrl: true` dans vos capabilities et un chromedriver compatible BiDi. Lorsqu'elle est active, la capture réseau par commande via les logs de performance Chrome est désactivée afin d'éviter les requêtes en double. |
| `mode` | `'live' \| 'trace'` | `'live'` | `live` ouvre l'interface DevTools ; `trace` l'ignore et écrit à la place un artefact portable. Voir [Mode trace](/docs/devtools/wdio/trace-mode). |
| `traceFormat` | `'zip' \| 'ndjson-directory'` | `'zip'` | Structure de l'artefact de trace. S'applique uniquement lorsque `mode: 'trace'`. |
| `traceGranularity` | `'session' \| 'spec' \| 'test'` | `'session'` | Une trace par session / fichier de spec / test. `'test'` écrit chacune dans `test-results/<spec>-<title>-<browser>[-retryN]/trace.zip`. S'applique uniquement lorsque `mode: 'trace'`. Voir [Mode trace](/docs/devtools/wdio/trace-mode#trace-granularity--tracegranularity). **Mise en garde :** l'interface BDD `describe/it` se réduit à une seule tranche au niveau de la session (voir [Découpage par test](#per-test-slicing--the-bdd-describeit-caveat)). |
| `tracePolicy` | `'on' \| 'retain-on-failure' \| 'retain-on-first-failure' \| 'on-first-retry' \| 'on-all-retries' \| 'retain-on-failure-and-retries'` | `'on'` | Quelles traces conserver. S'associe à `traceGranularity: 'test'`. S'applique uniquement lorsque `mode: 'trace'`. |
| `filmstrip` | `boolean` | `true` | Enregistre dans la trace une pellicule de screencast dense et continue, permettant une lecture navigable dans le lecteur de traces — et non une seule image par action. Exécute l'enregistreur de screencast (mode polling sous Nightwatch) pendant la session. S'applique uniquement lorsque `mode: 'trace'`. |
| `screenshot` | `'off' \| 'on' \| 'only-on-failure'` | `'off'` | Capture d'écran par test. Mode trace + `traceGranularity: 'test'` uniquement. **Production uniquement** — le PNG est écrit dans le répertoire de sortie de la trace (et dans le manifeste lorsque `emitArtifactsManifest: true`) ; il n'est pas joint directement à Allure (voir la note ci-dessous). |
| `video` | `'off' \| TraceRetentionPolicy` | `'off'` | Segment vidéo par test, conservé selon la politique indiquée (par ex. `'retain-on-failure'`). Mode trace + `traceGranularity: 'test'` uniquement. Une valeur autre que `off` démarre elle-même l'enregistreur de screencast — vous n'avez **pas** besoin d'activer en plus `filmstrip` ou `screencast.enabled`. **Production uniquement** — le `.webm` est écrit dans le répertoire de sortie de la trace (et dans le manifeste lorsque `emitArtifactsManifest: true`) ; il n'est pas joint directement à Allure. |
| `emitArtifactsManifest` | `boolean` | `false` | Écrit le manifeste `devtools-artifacts-<sessionId>.json` (l'index générique que les reporters/la CI consomment pour découvrir les artefacts produits) à côté de la trace. **Activation explicite pour Nightwatch** — il n'existe aucun signal Allure en direct à détecter, donc contrairement à WDIO/Selenium, il ne s'active jamais automatiquement. S'applique uniquement lorsque `mode: 'trace'`. |
| `captureAssertions` | `boolean` | `true` | Capture les assertions sous forme de lignes d'action dans la trace — `node:assert` ainsi que les `browser.assert`/`browser.verify` natifs, y compris les matchers négatifs `.not.*`. Définissez `false` pour désactiver. |

> **L'attachement direct à Allure n'est pas pris en charge pour Nightwatch.** Son reporter officiel `nightwatch-allure` fonctionne a posteriori (pas d'API d'attachement en direct), et la fonction `attachment()` de `allure-js-commons` n'a aucun effet lors d'une exécution Nightwatch. Les artefacts `screenshot` / `video` sont donc *produits* (fichiers, plus le manifeste des artefacts lorsque `emitArtifactsManifest: true`) dans le répertoire de sortie de la trace, mais ne sont pas joints à un test Allure. Le découpage par test — et donc ces artefacts — n'a de sens que pour les interfaces Cucumber et exports-object ; l'interface BDD `describe/it` se réduit à la granularité de session, donc le filtre par test n'a aucun effet dans ce cas.

```js
globals: nightwatchDevtools({
  port: 3000,
  hostname: 'localhost',
  screencast: { enabled: true },
  bidi: true
})
```

## Screencast

Enregistrez une vidéo `.webm` continue de la session du navigateur. L'enregistrement démarre sur la première session détectée par le plugin et est finalisé dans le hook `after()` de Nightwatch.

**Mode polling uniquement.** Nightwatch n'expose pas d'accès CDP stable comme le font WebdriverIO (`browser.getPuppeteer()`) et Selenium (`driver.createCDPConnection`) ; le screencast capture donc les images en appelant `browser.takeScreenshot()` à intervalle fixe. Fonctionne sur tous les navigateurs pris en charge par Nightwatch.

```js
globals: nightwatchDevtools({
  port: 3000,
  screencast: { enabled: true, pollIntervalMs: 200 }
})
```

| Option | Type | Valeur par défaut | Remarques |
|--------|------|---------|-------|
| `enabled` | `boolean` | `false` | Interrupteur principal. |
| `pollIntervalMs` | `number` | `200` | Intervalle entre les captures d'écran (ms). Plus la valeur est basse, plus la vidéo est fluide, mais plus il y a d'allers-retours WebDriver. 200 ms ≈ 5 fps. |
| `captureFormat` | `'jpeg' \| 'png'` | `'jpeg'` | Format de pixel par image transmis à l'encodeur ffmpeg avant le multiplexage final en `.webm`. En mode polling, les captures d'écran sources sont toujours prises en PNG, donc cette option ne modifie **pas** la capture — seulement le format que l'encodeur reçoit pour chaque image. |
| `maxWidth` / `maxHeight` / `quality` | - | - | Options réservées au CDP, ignorées en mode polling. Listées pour la compatibilité de forme avec les adaptateurs WDIO/Selenium. |

**Prérequis :** `fluent-ffmpeg` (déjà une dépendance d'exécution du package) ainsi que le binaire `ffmpeg` dans le PATH. macOS : `brew install ffmpeg`. Linux : `apt install ffmpeg`. Sans ffmpeg, l'enregistreur fonctionne quand même, mais l'étape d'encodage affiche un avertissement et n'écrit pas le fichier.

**Sortie :** le fichier vidéo est écrit à côté du fichier de test qui vient d'être exécuté (avec le répertoire de `nightwatch.conf.*` comme solution de repli, puis `process.cwd()` en dernier recours). Le chemin complet apparaît dans la ligne de log Nightwatch `📹 Screencast video: <path>` et la vidéo est également diffusée dans l'onglet Screencast du tableau de bord.

Pour la référence complète de la fonctionnalité screencast (prise en charge des navigateurs, chemins de sortie pour les trois adaptateurs), consultez la [page Screencast](/docs/devtools/wdio/screencast).

## Capture BiDi (optionnelle)

Activez la capture WebDriver BiDi pour les messages de la console du navigateur, les exceptions JS et les requêtes réseau. Équivalent au mécanisme utilisé par selenium-devtools — les deux adaptateurs partagent la même logique d'attachement dans `@wdio/devtools-core`.

```js
globals: nightwatchDevtools({
  port: 3000,
  bidi: true
})
```

Vous avez également besoin de `webSocketUrl: true` dans vos capabilities pour que chromedriver expose effectivement le canal BiDi :

```js
desiredCapabilities: {
  browserName: 'chrome',
  webSocketUrl: true,                           // ← active BiDi
  'goog:chromeOptions': { /* ... */ }
}
```

Lorsque BiDi est attaché, la capture réseau par commande via les logs de performance Chrome est désactivée afin que les requêtes n'apparaissent pas deux fois dans le tableau de bord. Si `webSocketUrl` est absent ou si la version de chromedriver n'expose pas BiDi, l'attachement échoue silencieusement et la solution de repli via les logs de performance continue de fonctionner.

## Mode trace

Mécanisme de capture headless — aucune fenêtre d'interface DevTools ne s'ouvre. À la fin de la session, l'adaptateur écrit un fichier portable `trace-<sessionId>.zip` (ou un répertoire) dans un dossier `test-results/` (à côté du répertoire de test / de configuration résolu), avec la même structure que l'artefact de trace WebdriverIO.

```js
globals: nightwatchDevtools({
  mode: 'trace',
  traceFormat: 'ndjson-directory'  // optionnel ; 'zip' par défaut
})
```

### Granularité et Cucumber

`traceGranularity` détermine ce que couvre un artefact — `'session'` (par défaut), `'spec'` ou `'test'`.

Nightwatch ferme le navigateur après chaque scénario Cucumber. Une trace `'session'` couvre l'ensemble : un seul zip pour toute l'exécution, chaque scénario étant imbriqué sous sa feature. `'test'` écrit un zip par scénario dans son propre dossier, ce qui est recommandé pour Cucumber — des artefacts plus petits, et la granularité sur laquelle s'appuie la rétention `tracePolicy`.

```js
globals: nightwatchDevtools({
  mode: 'trace',
  traceGranularity: 'test'  // une trace par scénario Cucumber
})
```

Avec l'interface BDD `describe/it`, `'test'` se réduit à une seule tranche au niveau de la session : Nightwatch exécute chaque `it()` en interne et ne déclenche le hook par test du plugin qu'une seule fois par module. L'arbre des actions affiche néanmoins chaque `it` comme un groupe distinct.

La liaison du port backend, la fenêtre d'interface et l'option `screencast` sont toutes ignorées en mode trace. Pour la référence complète de la fonctionnalité (contenu des artefacts, visualiseur, tests mobiles, quand choisir `zip` ou `ndjson-directory`), consultez la [page Mode trace](/docs/devtools/wdio/trace-mode).

Nightwatch partage le même pipeline de trace que les adaptateurs WebdriverIO et Selenium, de sorte que la structure de l'artefact est identique quel que soit l'adaptateur qui l'a produit. Une trace Nightwatch contient la capture complète par action — une capture d'écran, l'instantané de l'arbre d'accessibilité indenté par profondeur, la liste des éléments interactifs et la transcription Markdown — elle s'ouvre donc dans le lecteur `show-trace` avec le voyage dans le temps du DOM/des instantanés, les onglets **A11y** et **Transcript**, la superposition d'éléments pick-locator et (pour Cucumber) l'imbrication **Feature → Scenario → Step**.

Ouvrez une trace avec le binaire `show-trace`, fourni avec `@wdio/nightwatch-devtools` (aucune dépendance supplémentaire) :

```sh
npx show-trace test-results/trace-<sessionId>.zip   # dans un projet qui installe l'adaptateur
pnpm show-trace test-results/trace-<sessionId>.zip  # depuis le monorepo devtools
```

Consultez la page [Lecteur de traces](/docs/devtools/trace-player) pour une présentation complète et les raccourcis clavier.

### Découpage par test et la mise en garde concernant BDD `describe/it`

Les options par test — `traceGranularity: 'test'`, ainsi que les options `tracePolicy`, `screenshot` et `video` qui s'y associent — nécessitent un hook par test pour découper la tranche de chaque test. L'interface **exports-object (style mocha)** et **Cucumber** (hooks par scénario) en exposent un, et bénéficient donc d'un véritable découpage par test. L'interface **BDD `describe/it`** fait exception : Nightwatch exécute chaque `it()` en interne et ne déclenche le hook par test du plugin qu'une seule fois par module, donc `traceGranularity: 'test'` se réduit à une seule tranche **au niveau de la session**, associée au premier test. Le manifeste des artefacts liste toujours chaque cas de test avec son état correct ; seule l'association tranche/artefact par test est réduite. Les traces de granularité session et spec ne sont pas affectées.

## Exemples

Des exemples fonctionnels se trouvent dans le répertoire `examples/` à la racine du dépôt. Compilez l'espace de travail une fois (`pnpm install && pnpm build`), puis exécutez depuis la racine du dépôt :

| Répertoire | Runner | Commande |
|-----------|--------|---------|
| [`examples/nightwatch/`](https://github.com/webdriverio/devtools/tree/main/examples/nightwatch) | Nightwatch style mocha | `pnpm demo:nightwatch` |

## Fonctionnalités

L'adaptateur Nightwatch offre la même expérience d'interface DevTools que WebdriverIO. Chaque fonctionnalité ci-dessous est capturée automatiquement avec la configuration de base `globals: nightwatchDevtools({ port: 3000 })` — aucune configuration spécifique par fonctionnalité (les logs réseau nécessitent en plus `'goog:loggingPrefs': { performance: 'ALL' }`, comme indiqué dans [Configuration](#setup)). Les liens mènent à la référence complète de chaque fonctionnalité.

- **[Réexécution interactive des tests et visualisation](/docs/devtools/wdio/interactive-test-rerunning)** - Aperçus du navigateur en direct, captures d'écran par commande et réexécution d'un test/d'une suite en un clic
- **[Préserver et réexécuter (Comparer)](/docs/devtools/wdio/preserve-and-rerun)** - Prenez un instantané d'un test en échec, réexécutez-le et comparez les deux exécutions côte à côte
- **[Prise en charge multi-frameworks](/docs/devtools/wdio/multi-framework-support)** - Runners standard (style mocha) et Cucumber/BDD
- **[Logs de la console](/docs/devtools/wdio/console-logs)** - Capturez et inspectez la sortie de la console du navigateur (en temps réel avec `bidi: true`)
- **[Logs réseau](/docs/devtools/wdio/network-logs)** - Surveillez les appels d'API et l'activité réseau
- **[Métadonnées](/docs/devtools/wdio/metadata)** - Capabilities de session, environnement et temps d'exécution par session de navigateur
- **[TestLens](/docs/devtools/wdio/testlens)** - Passez de n'importe quelle commande à la ligne de code source qui l'a déclenchée
- **[Screencast de session](/docs/devtools/wdio/screencast)** - Enregistrement `.webm` continu de la session du navigateur
- **[Mode trace](/docs/devtools/wdio/trace-mode)** - Capture headless produisant un fichier portable `trace.zip` (sans fenêtre d'interface)

Le screencast est la seule fonctionnalité dotée de ses propres options (liste complète sous [Screencast](#screencast)) :

```js
globals: nightwatchDevtools({ port: 3000, screencast: { enabled: true, pollIntervalMs: 200 } })
```

## Limitations

Nightwatch ne fournit pas des hooks de framework aussi complets que WebdriverIO ; il existe donc quelques différences par rapport au service WDIO DevTools :

| Limitation | Détail |
|-----------|--------|
| Pas de hooks de commande natifs | Nightwatch n'a pas de hook `beforeCommand` / `afterCommand`. Les commandes sont interceptées à la place via un wrapper proxy du navigateur. |
| Contexte de test limité | `browser.currentTest` fournit moins de métadonnées que le contexte du runner WDIO ; les noms de tests et les chemins de fichiers nécessitent des heuristiques supplémentaires. |
| Imbrication de suites à plat | Nightwatch ne prend pas en charge nativement les blocs `describe` imbriqués sur plusieurs niveaux ; le plugin rapporte au maximum deux niveaux. |
| Disponibilité différée des résultats | Les résultats des tests ne sont finalisés que dans `afterEach` et ne sont pas disponibles en cours de test. |
| Screencast en mode polling uniquement | Contrairement à WDIO (push CDP via `browser.getPuppeteer()`) et Selenium (push CDP via `driver.createCDPConnection`), Nightwatch ne dispose pas d'un accès CDP stable ; les images sont donc capturées en interrogeant `browser.takeScreenshot()`. Fonctionne sur tous les navigateurs pris en charge par Nightwatch ; léger coût par image proportionnel à l'intervalle de polling. |
| Découpage des traces par test (BDD `describe/it`) | L'interface BDD déclenche le hook par test du plugin une fois par module, donc `traceGranularity: 'test'` se réduit à une seule tranche au niveau de la session. Les interfaces exports-object (style mocha) et Cucumber bénéficient d'un véritable découpage par test. Voir [Découpage par test](#per-test-slicing--the-bdd-describeit-caveat). |
| Artefacts de trace en production uniquement | Les fichiers `screenshot` / `video` par test sont écrits dans le répertoire de sortie de la trace (et dans le manifeste lorsque `emitArtifactsManifest: true`), mais ne sont pas joints directement à Allure — Nightwatch ne dispose d'aucune API d'attachement Allure en direct. |

La parité fonctionnelle globale avec le service WebdriverIO DevTools est d'environ **80-90 %**.