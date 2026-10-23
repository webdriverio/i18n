---
id: nightwatch
title: Nightwatch DevTools
description: "Ajoutez l'interface de débogage DevTools à une suite de tests Nightwatch sans modifier les tests, et configurez les screencasts, la capture BiDi et le mode trace."
---

Adaptateur Nightwatch pour [WebdriverIO DevTools](https://github.com/webdriverio/devtools) : il apporte la même interface de débogage visuel à votre suite de tests Nightwatch, sans aucune modification du code de test.

## Installation

```bash
npm install @wdio/nightwatch-devtools
```

Nécessite Nightwatch 3 ou une version ultérieure. Pour Cucumber, `@cucumber/cucumber` doit être installé dans votre projet ; l'adaptateur utilise votre copie plutôt que d'en embarquer une.

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
        // Required for network request capture
        'goog:loggingPrefs': { performance: 'ALL' }
      },
      globals: nightwatchDevtools({ port: 3000 })
    }
  }
}
```

Exécutez vos tests normalement : l'interface DevTools s'ouvre automatiquement dans une nouvelle fenêtre de navigateur :

```bash
nightwatch
```

> Aucune modification de vos fichiers de test n'est nécessaire.

En mode live, l'exécution reste ouverte après la fin de vos tests afin que vous puissiez examiner les résultats. Fermez la fenêtre DevTools pour y mettre fin, ou appuyez sur Ctrl+C pour quitter en laissant la fenêtre ouverte.

### Cucumber / BDD

Importez `cucumberHooksPath` en plus de l'export principal et passez-le à l'option `require` de Cucumber. Cela enregistre les hooks de scénario `Before` / `After` et les hooks d'étape `BeforeStep` / `AfterStep`, qui reproduisent le comportement `beforeScenario` / `afterScenario` du service WebdriverIO. Un hook `After` exécuté avant la fermeture vide la trace de chaque scénario tant que sa session de navigateur est encore active.

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
      require: [cucumberHooksPath] // <-- enregistre les hooks Cucumber DevTools
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

| Option | Type | Défaut | Description |
|--------|------|---------|-------------|
| `port` | `number` | `3000` | Port du serveur backend DevTools. Incrémenté automatiquement s'il est déjà utilisé. |
| `hostname` | `string` | `'localhost'` | Nom d'hôte auquel le serveur backend se lie. |
| `screencast` | `ScreencastOptions` | `{ enabled: false }` | Enregistrement vidéo `.webm` par session, en mode live uniquement. En mode trace, utilisez `filmstrip` / `video`. Voir [Screencast](#screencast) ci-dessous. |
| `bidi` | `boolean` | `false` | Active la capture WebDriver BiDi pour la console du navigateur, les exceptions JS et le réseau. Nécessite `webSocketUrl: true` dans vos capabilities et un chromedriver compatible BiDi. Lorsqu'elle est attachée, la capture réseau par commande via le perf-log Chrome est désactivée afin que les requêtes ne soient pas dupliquées. |
| `mode` | `'live' \| 'trace'` | `'live'` | `live` ouvre l'interface DevTools ; `trace` l'ignore et écrit à la place un artefact portable. Voir [Mode trace](/docs/devtools/wdio/trace-mode). |
| `traceFormat` | `'zip' \| 'ndjson-directory'` | `'zip'` | Structure de l'artefact de trace. S'applique uniquement lorsque `mode: 'trace'`. |
| `traceGranularity` | `'session' \| 'spec' \| 'test'` | `'session'` | Une trace par session / fichier de spec / test. `'test'` écrit chacune dans `test-results/<spec>-<title>-<browser>[-retryN]/trace.zip`. S'applique uniquement lorsque `mode: 'trace'`. Voir [Mode trace](/docs/devtools/wdio/trace-mode#trace-granularity--tracegranularity). **Mise en garde :** l'interface BDD `describe/it` se réduit à une seule tranche à l'échelle de la session (voir [Découpage par test](#per-test-slicing--the-bdd-describeit-caveat)). |
| `tracePolicy` | `'on' \| 'retain-on-failure' \| 'retain-on-first-failure' \| 'on-first-retry' \| 'on-all-retries' \| 'retain-on-failure-and-retries'` | `'on'` | Quelles traces conserver. S'associe à `traceGranularity: 'test'`. S'applique uniquement lorsque `mode: 'trace'` ; la définir hors du mode trace affiche un avertissement. **Mise en garde :** seule `'retain-on-failure'` est fiable sur Nightwatch. Les autres politiques tenant compte des nouvelles tentatives se replient sur celle-ci, car `--retries` relance un cas de test en interne sans redéclencher les hooks par test du plugin. |
| `filmstrip` | `boolean` | `true` | Enregistre dans la trace une pellicule de screencast dense et continue, permettant une lecture navigable dans le lecteur de traces — et pas seulement une image par action. Exécute l'enregistreur de screencast (mode polling sur Nightwatch) pendant la session. S'applique uniquement lorsque `mode: 'trace'`. |
| `screenshot` | `'off' \| 'on' \| 'only-on-failure'` | `'off'` | Capture d'écran par test. Mode trace + `traceGranularity: 'test'` uniquement. **Production uniquement** — le PNG est écrit dans le répertoire de sortie de la trace (et dans le manifeste lorsque `emitArtifactsManifest: true`) ; il n'est pas joint en ligne à Allure (voir la note ci-dessous). |
| `video` | `'off' \| TraceRetentionPolicy` | `'off'` | Segment vidéo par test, conservé selon la politique donnée (par ex. `'retain-on-failure'`). Mode trace + `traceGranularity: 'test'` uniquement. Une valeur autre que `off` démarre elle-même l'enregistreur de screencast — vous n'avez **pas** besoin de `filmstrip` ni de `screencast.enabled` en plus. **Production uniquement** — le `.webm` est écrit dans le répertoire de sortie de la trace (et dans le manifeste lorsque `emitArtifactsManifest: true`) ; il n'est pas joint en ligne à Allure. |
| `emitArtifactsManifest` | `boolean` | `false` | Écrit le manifeste `devtools-artifacts-<sessionId>.json` (l'index générique que les reporters/la CI consomment pour découvrir les artefacts produits) à côté de la trace. **Optionnel pour Nightwatch** — il n'existe aucun signal Allure en direct à détecter, donc contrairement à WDIO/Selenium il ne s'active jamais automatiquement. S'applique uniquement lorsque `mode: 'trace'`. |
| `captureAssertions` | `boolean` | `true` | Capture les assertions sous forme de lignes d'action dans la trace — `node:assert` ainsi que les `browser.assert`/`browser.verify` natifs, y compris les matchers négatifs `.not.*`. Définissez `false` pour désactiver. |

> **La pièce jointe Allure en ligne n'est pas prise en charge pour Nightwatch.** Son reporter officiel `nightwatch-allure` fonctionne a posteriori (pas d'API de pièce jointe en direct), et `attachment()` de `allure-js-commons` ne fait rien dans une exécution Nightwatch. Les artefacts `screenshot` / `video` sont donc *produits* (fichiers, plus le manifeste d'artefacts lorsque `emitArtifactsManifest: true`) dans le répertoire de sortie de la trace, mais ne sont pas joints à un test Allure. Le découpage par test — et donc ces artefacts — a du sens pour les interfaces Cucumber et exports-object ; l'interface BDD `describe/it` se réduit à la granularité de session, donc le filtre par test n'a aucun effet dans ce cas.

```js
globals: nightwatchDevtools({
  port: 3000,
  hostname: 'localhost',
  screencast: { enabled: true },
  bidi: true
})
```

## Screencast

Enregistrez une vidéo `.webm` continue de la session de navigateur. Chaque session WebDriver dispose de son propre enregistrement : un `browser.end()` en cours d'exécution, ou la fermeture du navigateur à chaque scénario dans Cucumber, finalise la vidéo en cours et en démarre une nouvelle pour la session suivante. Le dernier enregistrement est finalisé dans le hook `after()` de Nightwatch, et chaque enregistrement peut être sélectionné dans la liste déroulante de l'onglet Screencast.

**Mode polling uniquement.** Nightwatch n'expose pas d'accès CDP stable comme le font WebdriverIO (`browser.getPuppeteer()`) et Selenium (`driver.createCDPConnection`), donc le screencast capture les images en demandant une capture d'écran WebDriver à intervalle fixe. La requête passe directement par le transport HTTP WebDriver, en contournant la file de commandes de Nightwatch, de sorte qu'elle n'attend jamais derrière les commandes de votre test. Fonctionne sur tous les navigateurs pris en charge par Nightwatch.

```js
globals: nightwatchDevtools({
  port: 3000,
  screencast: { enabled: true, pollIntervalMs: 200 }
})
```

| Option | Type | Défaut | Remarques |
|--------|------|---------|-------|
| `enabled` | `boolean` | `false` | Interrupteur principal. |
| `pollIntervalMs` | `number` | `200` | Intervalle entre les captures d'écran (ms). Plus bas = vidéo plus fluide, plus d'allers-retours WebDriver. 200 ms ≈ 5 fps. |
| `captureFormat` | `'jpeg' \| 'png'` | `'jpeg'` | Format de pixels par image transmis à l'encodeur ffmpeg avant le multiplexage final en `.webm`. En mode polling, les captures d'écran sources sont toujours prises en PNG, donc cette option ne modifie **pas** la capture — seulement le format que l'encodeur reçoit pour chaque image. |
| `maxBufferFrames` | `number` | `2000` | Limite du nombre d'images conservées en mémoire. Au-delà, le tampon est allégé sur place en conservant la première et la dernière image. |
| `maxWidth` / `maxHeight` / `quality` | - | - | Options propres au CDP, ignorées en mode polling. Listées pour la compatibilité de structure avec les adaptateurs WDIO/Selenium. |

**Prérequis :** `fluent-ffmpeg` (déjà une dépendance d'exécution du package) ainsi que le binaire `ffmpeg` dans le PATH. macOS : `brew install ffmpeg`. Linux : `apt install ffmpeg`. Sans ffmpeg, l'enregistreur fonctionne toujours, mais l'étape d'encodage affiche un avertissement et n'écrit pas le fichier.

**Sortie :** `nightwatch-video-<sessionId>.webm` est écrit dans un dossier `test-results/` à côté du fichier de test qui vient de s'exécuter, avec repli sur le répertoire de `nightwatch.conf.*`, puis sur `process.cwd()`. Les répertoires situés sous `node_modules/` sont ignorés, et si le répertoire choisi n'est pas accessible en écriture, le fichier est placé dans le répertoire temporaire du système. Le chemin complet apparaît dans la ligne de log Nightwatch `📹 Screencast video: <path>` et la vidéo est également diffusée dans l'onglet Screencast du tableau de bord.

Pour la référence complète de la fonctionnalité screencast (prise en charge des navigateurs, chemins de sortie pour les trois adaptateurs), consultez la [page Screencast](/docs/devtools/wdio/screencast).

## Capture BiDi (optionnelle)

Activez la capture WebDriver BiDi pour les messages de la console du navigateur, les exceptions JS et les requêtes réseau. Équivalent au mécanisme utilisé par selenium-devtools — les deux adaptateurs partagent la même logique d'attachement dans `@wdio/devtools-core`.

```js
globals: nightwatchDevtools({
  port: 3000,
  bidi: true
})
```

Vous avez également besoin de `webSocketUrl: true` dans vos capabilities pour que chromedriver expose réellement le canal BiDi :

```js
desiredCapabilities: {
  browserName: 'chrome',
  webSocketUrl: true,                           // ← active BiDi
  'goog:chromeOptions': { /* ... */ }
}
```

Lorsque BiDi est attaché, la capture réseau par commande via le performance-log de Chrome est désactivée afin que les requêtes n'apparaissent pas en double dans le tableau de bord. Si `webSocketUrl` est absent ou si la version de chromedriver n'expose pas BiDi, l'attachement affiche un avertissement et le repli sur le perf-log continue de fonctionner. Le collecteur injecté liste lui aussi chaque requête, à partir de deux sources propres à la page : un appel `fetch` / `XMLHttpRequest` passe par son patch et transporte la méthode, les en-têtes, le statut et le corps, et tout autre chargement provient du tampon Resource Timing de la page, avec son minutage et sa taille. Sur Chrome, le performance-log enrichit ensuite ces lignes Resource Timing sur place avec les en-têtes et le statut ; sur Safari, ou pour toute session servie par Appium, elles restent telles que la page les a vues, sans en-têtes ni corps, et sans statut sur Safari. Voir [Logs réseau](/docs/devtools/wdio/network-logs#without-webdriver-bidi).

**Définissez `webSocketUrl: true` même sans `bidi: true`.** Avec cette option, l'adaptateur enregistre son collecteur de page dès le début du document sur chaque page, de sorte que le voyage dans le temps du DOM reste précis d'une navigation à l'autre. Sans elle, l'adaptateur se rabat sur l'injection du collecteur après chaque navigation, ce qui peut manquer les premiers instants d'une nouvelle page.

## Mode trace

Mécanisme de capture headless — aucune fenêtre d'interface DevTools ne s'ouvre. À la fin de la session, l'adaptateur écrit un `trace-<sessionId>.zip` portable (ou un répertoire) dans un dossier `test-results/` (à côté du répertoire de test / de configuration résolu), avec la même structure que l'artefact de trace de WebdriverIO.

```js
globals: nightwatchDevtools({
  mode: 'trace',
  traceFormat: 'ndjson-directory'  // optionnel ; 'zip' par défaut
})
```

### Granularité et Cucumber

`traceGranularity` détermine ce que couvre un artefact — `'session'` (par défaut), `'spec'` ou `'test'`.

Nightwatch ferme le navigateur après chaque scénario Cucumber. Une trace `'session'` couvre l'ensemble : un seul zip pour toute l'exécution, avec chaque scénario imbriqué sous sa feature. `'test'` écrit un zip par scénario dans son propre dossier, ce qui est la recommandation pour Cucumber — des artefacts plus petits, et la granularité sur laquelle s'appuie la rétention `tracePolicy`.

```js
globals: nightwatchDevtools({
  mode: 'trace',
  traceGranularity: 'test'  // une trace par scénario Cucumber
})
```

Sur l'interface BDD `describe/it`, `'test'` se réduit à une seule tranche à l'échelle de la session : Nightwatch exécute chaque `it()` en interne et ne déclenche le hook par test du plugin qu'une seule fois par module. L'arbre des actions affiche néanmoins chaque `it` comme un groupe distinct.

La liaison du port backend et la fenêtre d'interface sont ignorées en mode trace, et `screencast.enabled` est ignoré (un avertissement est affiché lorsque rien d'autre n'a besoin de l'enregistreur). Le mode trace enregistre à la place la `filmstrip` dense par défaut, et les paramètres de réglage du screencast (`pollIntervalMs`, `captureFormat`, `maxBufferFrames`) s'appliquent toujours à cet enregistreur. Pour la référence complète de la fonctionnalité (contenu de l'artefact, visualiseur, tests mobiles, quand choisir `zip` ou `ndjson-directory`), consultez la [page Mode trace](/docs/devtools/wdio/trace-mode).

Nightwatch partage le même pipeline de trace que les adaptateurs WebdriverIO et Selenium, de sorte que la structure de l'artefact est identique quel que soit l'adaptateur qui l'a produit. Une trace Nightwatch contient la capture complète par action — une capture d'écran, l'instantané de l'arbre d'accessibilité indenté par profondeur, la liste des éléments interactifs et la transcription Markdown — elle s'ouvre donc dans le lecteur `show-trace` avec le voyage dans le temps DOM/instantané, les onglets **A11y**, **Transcript** et **Errors** (échecs avec saut vers la source), la superposition de sélection de locator sur les éléments et (pour Cucumber) l'imbrication **Feature → Scenario**. Les étapes sont suivies dans le tableau de bord live, mais ne sont pas encore imbriquées comme groupes distincts dans la trace. Les locators copiés privilégient le CSS simple, que Nightwatch lit par défaut ; ce n'est que lorsqu'aucun sélecteur CSS unique n'existe que le lecteur vous fournit un XPath, accompagné de la mention `useXpath()` / `locateStrategy: 'xpath'`.

Ouvrez une trace avec le binaire `show-trace`, fourni avec `@wdio/nightwatch-devtools` (aucune dépendance supplémentaire) :

```sh
npx show-trace test-results/trace-<sessionId>.zip   # dans un projet qui installe l'adaptateur
pnpm show-trace test-results/trace-<sessionId>.zip  # depuis le monorepo devtools
```

Consultez la page [Lecteur de traces](/docs/devtools/trace-player) pour la présentation complète et les raccourcis clavier.

### Découpage par test et la mise en garde BDD `describe/it`

Les options par test — `traceGranularity: 'test'`, ainsi que les options `tracePolicy`, `screenshot` et `video` qui s'y associent — nécessitent un hook par test pour découper la tranche de chaque test. L'interface **exports-object (style mocha)** et **Cucumber** (hooks par scénario) en exposent un, et bénéficient donc d'un véritable découpage par test. L'interface **BDD `describe/it`** est l'exception : Nightwatch exécute chaque `it()` en interne et ne déclenche le hook par test du plugin qu'une seule fois par module, donc `traceGranularity: 'test'` se réduit à une seule tranche **à l'échelle de la session**, rattachée au premier test. Le manifeste d'artefacts liste toujours chaque cas de test avec son état correct ; seul le rattachement des tranches/artefacts par test est réduit. Les traces de granularité session et spec ne sont pas affectées.

## Exemples

Des exemples fonctionnels se trouvent dans le répertoire `examples/` à la racine du dépôt. Compilez l'espace de travail une fois (`pnpm install && pnpm build`), puis exécutez depuis la racine du dépôt :

| Répertoire | Runner | Commande |
|-----------|--------|---------|
| [`examples/nightwatch/`](https://github.com/webdriverio/devtools/tree/main/examples/nightwatch) | Nightwatch BDD `describe/it` (mode trace par défaut ; `DEVTOOLS_MODE=live` pour l'interface) | `pnpm demo:nightwatch` (`pnpm demo:nightwatch:retry` ajoute `--retries 1`) |
| [`examples/nightwatch/cucumber/`](https://github.com/webdriverio/devtools/tree/main/examples/nightwatch/cucumber) | Nightwatch + Cucumber | `pnpm --filter @wdio/nightwatch-devtools example:cucumber` |
| [`examples/nightwatch/`](https://github.com/webdriverio/devtools/tree/main/examples/nightwatch) (`nightwatch.mobile.conf.cjs`) | Appium (application Horloge Android ; Réglages iOS avec `DEVTOOLS_MOBILE_PLATFORM=ios`) | `pnpm demo:nightwatch:mobile` |

## Mobile (Appium)

Les sessions Appium sont capturées en mode live et en mode trace. Déclarez Appium sous `selenium` avec `use_appium: true`, `start_process: false` et `default_path_prefix: ''`. Pour une application native, définissez `browserName: null` ; sinon Nightwatch renseigne Firefox et l'adaptateur considère que la session possède une page web. Laissez `bidi` désactivé, car Appium ne fournit pas BiDi. Le réseau d'une application native est capturé lorsque `desiredCapabilities` définit `'appium:intercept': true` et qu'Appium exécute le plugin appium-interceptor ; voir [Réseau des applications natives](/docs/devtools/mobile#native-app-network).

```js
// nightwatch.mobile.conf.cjs
const nightwatchDevtools = require('@wdio/nightwatch-devtools').default

module.exports = {
  selenium: {
    start_process: false,
    use_appium: true,
    host: '127.0.0.1',
    port: 4723,
    default_path_prefix: ''
  },
  test_settings: {
    default: {
      desiredCapabilities: {
        browserName: null,
        platformName: 'Android',
        'appium:automationName': 'UiAutomator2'
      },
      globals: nightwatchDevtools({ mode: 'trace', bidi: false })
    }
  }
}
```

Les sessions natives enregistrent les commandes, les captures d'écran et les données des éléments à partir de l'arbre XML de la plateforme, sans DOM. La webview d'une application hybride est capturée comme si elle était toujours native. Essayez avec `pnpm demo:nightwatch:mobile`, exécuté depuis la racine d'un checkout compilé du dépôt devtools (étapes de configuration dans [Exécuter un exemple](/docs/devtools/mobile#running-an-example)). Consultez la [page Tests mobiles](/docs/devtools/mobile) pour la référence mobile complète.

## Fonctionnalités

L'adaptateur Nightwatch offre la même expérience d'interface DevTools que WebdriverIO. Chaque fonctionnalité ci-dessous est capturée automatiquement avec la configuration de base `globals: nightwatchDevtools({ port: 3000 })` — aucune configuration par fonctionnalité (les logs réseau nécessitent en plus `'goog:loggingPrefs': { performance: 'ALL' }`, présenté dans [Configuration](#setup)). Les liens mènent à la référence complète de chaque fonctionnalité.

- **[Réexécution interactive des tests et visualisation](/docs/devtools/wdio/interactive-test-rerunning)** - Aperçus du navigateur en direct, captures d'écran par commande et réexécution des tests/suites en un clic
- **[Conserver et réexécuter (comparaison)](/docs/devtools/wdio/preserve-and-rerun)** - Capturez un test en échec, réexécutez-le et comparez les deux exécutions côte à côte. Les réexécutions Nightwatch relancent votre configuration avec `DEVTOOLS_RERUN_LABEL` défini et filtrent jusqu'à ce test ; elles nécessitent un `nightwatch.conf.*` détectable, sans lequel le plugin affiche un avertissement et la réexécution n'est pas disponible
- **[Prise en charge multi-frameworks](/docs/devtools/wdio/multi-framework-support)** - Runners standard (style mocha) et Cucumber/BDD
- **[Logs de la console](/docs/devtools/wdio/console-logs)** - Capturez et inspectez la sortie de la console du navigateur (en temps réel avec `bidi: true`)
- **[Logs réseau](/docs/devtools/wdio/network-logs)** - Surveillez les appels d'API et l'activité réseau
- **[Métadonnées](/docs/devtools/wdio/metadata)** - Capabilities de la session, environnement et minutage pour chaque session de navigateur
- **[TestLens](/docs/devtools/wdio/testlens)** - Accédez depuis n'importe quelle commande à la ligne de code source qui l'a déclenchée
- **[Screencast de session](/docs/devtools/wdio/screencast)** - Enregistrement `.webm` continu de la session de navigateur
- **[Mode trace](/docs/devtools/wdio/trace-mode)** - Capture headless produisant un `trace.zip` portable (sans fenêtre d'interface)

Le screencast est la seule fonctionnalité disposant de ses propres options (liste complète sous [Screencast](#screencast)) :

```js
globals: nightwatchDevtools({ port: 3000, screencast: { enabled: true, pollIntervalMs: 200 } })
```

## Limitations

Nightwatch n'offre pas la même richesse de hooks de framework que WebdriverIO, il existe donc quelques différences par rapport au service WDIO DevTools :

| Limitation | Détail |
|-----------|--------|
| Pas de hooks de commande natifs | Nightwatch n'a pas de hook `beforeCommand` / `afterCommand`. Les commandes sont interceptées à la place via un wrapper proxy du navigateur. |
| Contexte de test limité | `browser.currentTest` fournit moins de métadonnées que le contexte du runner WDIO ; les noms de tests et les chemins de fichiers nécessitent des heuristiques supplémentaires. |
| Imbrication de suites aplatie | Nightwatch ne prend pas en charge nativement les blocs `describe` imbriqués sur plusieurs niveaux ; le plugin rapporte au maximum deux niveaux. |
| Disponibilité différée des résultats | Les résultats des tests ne sont finalisés que dans `afterEach` et ne sont pas disponibles en cours de test. |
| Screencast en mode polling uniquement | Contrairement à WDIO (push CDP via `browser.getPuppeteer()`) et Selenium (push CDP via `driver.createCDPConnection`), Nightwatch ne dispose pas d'un accès CDP stable, donc les images sont capturées en interrogeant l'endpoint de capture d'écran WebDriver. Fonctionne sur tous les navigateurs pris en charge par Nightwatch ; faible coût par image, proportionnel à l'intervalle de polling. |
| Découpage de trace par test (BDD `describe/it`) | L'interface BDD déclenche le hook par test du plugin une fois par module, donc `traceGranularity: 'test'` se réduit à une seule tranche à l'échelle de la session. Les interfaces exports-object (style mocha) et Cucumber bénéficient d'un véritable découpage par test. Voir [Découpage par test](#per-test-slicing--the-bdd-describeit-caveat). |
| Rétention tenant compte des nouvelles tentatives | Seule `tracePolicy: 'retain-on-failure'` est fiable ; les autres politiques tenant compte des nouvelles tentatives se replient sur celle-ci. |
| Artefacts de trace en production uniquement | Les fichiers `screenshot` / `video` par test sont écrits dans le répertoire de sortie de la trace (et dans le manifeste lorsque `emitArtifactsManifest: true`), mais ne sont pas joints en ligne à Allure — Nightwatch ne dispose d'aucune API de pièce jointe Allure en direct. |

La parité fonctionnelle globale avec le service WebdriverIO DevTools est d'environ **80-90 %**.