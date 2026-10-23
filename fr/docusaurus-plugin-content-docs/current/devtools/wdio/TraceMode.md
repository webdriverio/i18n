---
id: trace-mode
title: Mode trace
description: "Capturez des artefacts de trace headless avec le mode trace de DevTools et configurez le format, la granularité, la rétention, les captures d'écran, la vidéo et les assertions."
---

Chemin de capture headless — aucune fenêtre de l'interface DevTools ne s'ouvre. À la fin de la session, l'adaptateur écrit les artefacts de trace dans un dossier `test-results/` : sous l'`outputDir` (ou le `rootDir`) de WebdriverIO, et pour Selenium et Nightwatch à côté du fichier de test, avec repli sur le répertoire de configuration, puis sur le répertoire courant. Pour les granularités `session` / `spec`, il s'agit d'un `trace-<sessionId>.zip` (ou d'un répertoire `trace-<sessionId>/`) ; pour la granularité `test`, chaque test obtient son propre sous-dossier (voir [Granularité de la trace](#trace-granularity--tracegranularity)). L'artefact est portable et contient tout le nécessaire pour la relecture hors ligne, la comparaison par des agents IA, ou tout consommateur qui préfère un fichier à une interface en direct.

Le mode trace est **mutuellement exclusif avec le mode live**. Choisissez-en un par session : les humains qui déboguent de manière interactive veulent le mode live ; les agents qui comparent des exécutions ou les bots de CI qui collectent des artefacts veulent le mode trace.

## Activation

```ts
// wdio.conf.ts
services: [
  [
    'devtools',
    {
      mode: 'trace',
      traceFormat: 'zip' // optionnel ; 'zip' (par défaut) | 'ndjson-directory'
    }
  ]
]
```

Le mode trace nécessite WebDriver BiDi (Chrome 114+, Firefox 130+), que WebdriverIO active automatiquement.

Pour l'essayer, exécutez l'exemple mocha en mode trace avec `DEVTOOLS_MODE=trace pnpm demo:wdio:mocha` ; ajoutez `DEVTOOLS_TRACE_GRANULARITY=test DEVTOOLS_TRACE_POLICY=retain-on-failure` pour une rétention par test. La configuration se trouve dans [`examples/wdio/mocha/wdio.conf.ts`](https://github.com/webdriverio/devtools/blob/main/examples/wdio/mocha/wdio.conf.ts).

Selenium et Nightwatch embarquent le même pipeline de trace — consultez leurs pages d'adaptateur pour la syntaxe d'activation spécifique au framework : [Selenium](/docs/devtools/selenium#trace-mode) · [Nightwatch](/docs/devtools/nightwatch#trace-mode).

## Contenu de l'artefact

| Fichier | Contenu |
|---|---|
| `trace.trace` | NDJSON `context-options` + événements d'action `before` / `after` ; une ligne par enregistrement |
| `trace.network` | Entrées réseau au format HAR, une par ligne ; une entrée lue depuis le buffer Resource Timing de la page (sans BiDi, par ex. Safari ou Appium) porte `_source: "resource-timing"` et `_resourceType` |
| `trace.mutations` | Flux NDJSON des mutations DOM derrière le voyage dans le temps du DOM ; omis si rien n'a été capturé |
| `transcript.md` | Résumé Markdown lisible par un humain/LLM avec timing, sélecteurs et annotations de valeurs |
| `resources/page@<id>-<ts>.jpeg` | Capture d'écran prise à chaque action utilisateur |
| `resources/page@<id>-<ts>-elements.json` | Liste plate des éléments interactifs au moment de cette action |
| `resources/page@<id>-<ts>-snapshot.txt` | Instantané de l'arbre d'accessibilité indenté par profondeur (adapté à l'IA) |
| `resources/<sha1>.jpeg` | Images de la pellicule dense, adressées par contenu |
| `resources/src@<sha1>.txt` | Source du test capturée pour l'onglet Source |
| `resources/<sha1>` | Corps des réponses réseau, adressés par contenu |

### Ce qui compte comme une « action »

Les commandes sont filtrées par une liste d'autorisation avant de produire des entrées de trace. Exemples qui apparaissent dans la trace :

- `url` / `get` → `Page.navigate`
- `click` → `Element.click`
- `setValue` / `sendKeys` → `Element.fill`
- `submit`, `clear`, `selectByVisibleText`, …

La résolution des localisateurs (`$`, `$$`, `findElement(s)`), le polling `executeScript` de Selenium et le `clearValue` que `setValue` déclenche en interne sont délibérément exclus : ils ne représentent pas une intention de l'utilisateur et encombreraient la timeline. Les attentes explicites (`waitFor*`, `waitUntil`, `waitForElement*` de Nightwatch), les lectures d'éléments (`getText`, `isDisplayed`, …) et `execute` apparaissent bien. La liste d'autorisation est `ACTION_MAP` dans [`packages/shared/src/trace-actions.ts`](https://github.com/webdriverio/devtools/blob/main/packages/shared/src/trace-actions.ts).

## Format de sortie — `traceFormat`

```ts
{
  mode: 'trace',
  traceFormat: 'zip' | 'ndjson-directory'  // par défaut : 'zip'
}
```

- **`zip`** (par défaut) — une seule archive dans `test-results/trace-<sessionId>.zip`.
- **`ndjson-directory`** — les mêmes fichiers décompressés dans `test-results/trace-<sessionId>/`. Une étape de décompression en moins pour les consommateurs scriptés ou agentiques qui veulent faire un grep / lire le NDJSON en flux directement.

Le `zip` s'ouvre dans le [lecteur `show-trace`](/docs/devtools/trace-player) officiel ; une trace `ndjson-directory` s'ouvre dans d'autres visionneuses de traces compatibles, ou compressez-la d'abord pour l'ouvrir dans `show-trace`.

## Granularité de la trace — `traceGranularity`

Le nombre d'artefacts de trace produits par une exécution :

```ts
{
  mode: 'trace',
  traceGranularity: 'session' | 'spec' | 'test' // par défaut : 'session'
}
```

| Valeur | Sortie |
|---|---|
| `session` (par défaut) | Une trace par worker/session — `test-results/trace-<sessionId>.zip`. |
| `spec` | Une trace par fichier de spec, dans `test-results/trace-<spec>-<hash>-<sessionId8>.zip`. Plus petite, plus facile à parcourir. |
| `test` | Une trace **par test**, chacune dans son propre dossier : `test-results/<spec>-<title>-<browser>[-retry<N>]/trace.zip`. |

Pour la granularité `test`, le nom du dossier est construit à partir du nom de base de la spec, d'un slug du titre du test, du navigateur et d'un suffixe `-retry<N>` pour les tentatives relancées — par ex. `test-results/login_e2e-logs-in-chrome/trace.zip`, avec une première relance dans `test-results/login_e2e-logs-in-chrome-retry1/trace.zip`. Les traces par test sont les plus faciles à parcourir et se combinent idéalement avec une politique de rétention afin que seules les traces qui vous intéressent soient écrites.

## Rétention — `tracePolicy`

Par défaut, chaque trace est conservée (`'on'`). Pour ne garder que celles qui sont intéressantes — idéal avec `traceGranularity: 'test'` :

```ts
{
  mode: 'trace',
  traceGranularity: 'test',
  tracePolicy: 'retain-on-failure' // par défaut : 'on'
}
```

| Politique | Conserve la trace lorsque… |
|---|---|
| `'on'` (par défaut) | Toujours — chaque trace est écrite. |
| `'retain-on-failure'` | La tentative **finale** du test a échoué. Une séquence échec-puis-succès se termine par `passed`, elle n'est donc *pas* conservée — vous ne conservez pas inutilement un test instable qui a fini par passer au vert. |
| `'retain-on-first-failure'` | La **tentative 0** a échoué, qu'une relance ultérieure ait réussi ou non. |
| `'on-first-retry'` | Le test a été relancé au moins une fois (une tentative 1 existe). |
| `'on-all-retries'` | Une tentative relancée (tentative ≥ 1) existe. |
| `'retain-on-failure-and-retries'` | La tentative finale a échoué **ou** le test a été relancé. |

Une tranche non conservée est écartée et n'est jamais écrite sur le disque. Les politiques tenant compte des relances s'appuient sur un **registre des résultats** par tentative que l'adaptateur tient pour chaque identifiant de test stable entre les relances, afin que `retain-on-failure` et `retain-on-first-failure` évaluent la bonne tentative. Lorsqu'un runner n'expose pas d'informations de relance par tentative, toutes les politiques sauf `retain-on-failure` se dégradent en `retain-on-failure` ; une exécution sans résultat observé (par ex. un simple script autonome) échoue en mode **ouvert** et conserve la trace plutôt que de risquer d'en supprimer une dont vous avez besoin.

> La rétention tenant compte des relances est vérifiée de bout en bout pour **WebdriverIO** (mocha / cucumber) et **Selenium** (mocha). Pour **Nightwatch**, `retain-on-failure` fonctionne, mais les autres politiques tenant compte des relances se dégradent en celle-ci, car le `--retries` de Nightwatch relance un cas de test en interne sans redéclencher les hooks par test. Le `specFileRetries` inter-processus de WDIO échappe également au registre (par worker). Consultez la [page de l'adaptateur Nightwatch](/docs/devtools/nightwatch#trace-mode) pour les détails.

## Pellicule dense — `filmstrip`

**Par défaut**, la trace enregistre un screencast **dense et continu** afin que le lecteur offre une lecture fluide plutôt que de sauter d'image en image. Les images denses s'ajoutent aux images par action (qui portent les instantanés DOM). Définissez `filmstrip: false` pour n'enregistrer qu'une image par action — une trace plus petite, sans enregistreur continu :

```ts
{
  mode: 'trace',
  filmstrip: false // désactivation — une image par action (true par défaut)
}
```

- Les images denses sont ajoutées **en plus** des images par action (qui portent les instantanés DOM), donc aucune donnée DOM n'est perdue — lorsque des images denses sont présentes, elles remplacent la pellicule clairsemée par action pour la navigation.
- Les images sont espacées à l'export (≥ 100 ms d'intervalle) et adressées par contenu, de sorte que des images identiques (une attente statique) sont fusionnées en une seule ressource. Le buffer de la session live est limité par `screencast.maxBufferFrames` (2000 par défaut).
- L'enregistrement utilise l'enregistreur de screencast — push CDP sur Chrome/Chromium, polling de captures d'écran ailleurs. Sur les navigateurs autres que Chrome, le polling émet de nombreuses commandes `takeScreenshot` ; combinez-le avec l'option de masquage des étapes de votre reporter (voir [Intégration Allure](/docs/devtools/allure)).

`filmstrip` est disponible sur les trois adaptateurs (WebdriverIO / Selenium / Nightwatch).

## Capture d'écran et vidéo par test — `screenshot` / `video`

Avec `traceGranularity: 'test'`, chaque test peut également produire une capture d'écran autonome et/ou une tranche vidéo par test, reprenant l'ergonomie familière de capture d'écran/vidéo en cas d'échec :

```ts
{
  mode: 'trace',
  traceGranularity: 'test',
  screenshot: 'only-on-failure', // 'off' (par défaut) | 'on' | 'only-on-failure'
  video: 'retain-on-failure'     // 'off' (par défaut) | toute valeur de tracePolicy
}
```

| Option | Valeurs | Comportement |
|---|---|---|
| `screenshot` | `'off'` (par défaut) · `'on'` · `'only-on-failure'` | `'on'` capture après chaque test ; `'only-on-failure'` uniquement après un test en échec. PNG. |
| `video` | `'off'` (par défaut) · toute valeur de `tracePolicy` | Enregistre le screencast en continu et conserve la tranche de chaque test selon la même sémantique de rétention que `tracePolicy`. WebM ; l'encodage nécessite `ffmpeg` dans le `PATH`. Définir une valeur autre que `off` démarre l'enregistreur de lui-même — vous n'avez pas besoin d'activer également `filmstrip` ou `screencast.enabled`. |

Les deux sont limités au mode trace + `traceGranularity: 'test'` (la portée par test à laquelle ils se rattachent). Avec des granularités plus grossières, ils n'ont aucun effet.

- **WebdriverIO** — `screenshot` / `video` sont des options du service ; ils sont joints en ligne à Allure lorsque `@wdio/allure-reporter` est présent.
- **Selenium** — mêmes options dans ses `DevToolsOptions` ; jointes en ligne à Allure via `allure-js-commons` lorsqu'un adaptateur de runner Allure est actif.
- **Nightwatch** — **production uniquement** : les fichiers sont écrits dans le répertoire de sortie de la trace (et listés dans le manifeste), mais ne sont pas joints en ligne à Allure — Nightwatch ne dispose pas d'API d'attachement Allure en direct. Voir [Limitations du mode trace](/docs/devtools/limitations).

> `screencast.enabled` correspond à l'enregistrement `.webm` continu distinct du **mode live** et est ignoré en mode trace. En mode trace, utilisez `filmstrip` (images denses dans la trace) ou `video` par test ; les champs de réglage du screencast (`quality`, `maxWidth`, `pollIntervalMs`, …) s'appliquent toujours à l'enregistreur actif.

## Manifeste des artefacts — `emitArtifactsManifest`

Écrit un `devtools-artifacts-<sessionId>.json` à côté de la trace — un index générique que les reporters et la CI consomment pour découvrir les artefacts produits (chaque trace / capture d'écran / vidéo, plus l'état de chaque test) :

```ts
{
  mode: 'trace',
  emitArtifactsManifest: true // par défaut : désactivé ; activé automatiquement si Allure est détecté
}
```

- **Désactivé par défaut.** Il **s'active automatiquement** lorsqu'un reporter Allure est détecté — `@wdio/allure-reporter` de WebdriverIO dans la configuration, ou un runtime Selenium `allure-js-commons` actif.
- **Nightwatch nécessite une activation explicite** : il n'a aucun signal Allure en direct à détecter (`nightwatch-allure` intervient a posteriori), il ne s'active donc jamais automatiquement — définissez-le explicitement si vous voulez le manifeste.

## Assertions — `captureAssertions`

Les assertions apparaissent comme des lignes d'action à part entière dans la trace (activé par défaut ; définissez `captureAssertions: false` pour le désactiver) :

- **`node:assert`** — capturé sur les trois adaptateurs sous forme de lignes `assert.<method>`.
- **`expect` de WebdriverIO** — les matchers `expect(...)` réussis *et* échoués (`expect($el).toHaveText(...)`, `toBeExisting()`, …) apparaissent sous forme de lignes `expect.<matcher>` portant la valeur attendue, l'emplacement source de l'élément et un instantané ; les commandes de polling internes du matcher sont supprimées afin que seule l'assertion s'affiche.
- **`browser.assert.*` / `browser.verify.*` de Nightwatch** — les assertions natives apparaissent sous forme de lignes `assert.<m>` / `verify.<m>`.

Les assertions réussies s'affichent en vert ; celles qui échouent s'affichent en rouge avec le message d'erreur.

## Tests mobiles

Les sessions Appium sont capturées en mode live et en mode trace. Le critère discriminant est le **nom du navigateur** dans les capabilities, et non l'appareil :

- **Web mobile** (Chrome sur Android, Safari sur iOS) : même pipeline d'instantanés basé sur le DOM que sur desktop.
- **Application native** (sans `browserName`) : les scripts DOM injectés dans la page sont désactivés ; l'arbre XML d'Appium alimente à la place le sérialiseur d'instantanés.
- **Application hybride** : seul WebdriverIO suit la session dans sa webview ; les autres adaptateurs décident à partir des capabilities de démarrage.

Le `context-options` de la trace enregistre la plateforme, le modèle et la version de l'OS afin que la visionneuse étiquette correctement les images. Exécutez les exemples avec `pnpm demo:wdio:mobile` (également `:selenium:mobile`, `:nightwatch:mobile`, `:python:mobile`). Voir **[Tests mobiles](/docs/devtools/mobile)** pour la référence complète.

## Visualiser l'artefact

Ouvrez une trace dans le **[Trace Player](/docs/devtools/trace-player)** officiel — l'interface WebdriverIO DevTools dans un mode lecteur dédié en lecture seule :

```sh
show-trace trace-<sessionId>.zip          # binaire dans le PATH après installation
npx show-trace trace-<sessionId>.zip      # ou via npx
```

Le lecteur vous offre le voyage dans le temps du DOM, l'onglet A11y et la superposition de sélection de localisateur, l'onglet Transcript avec Copy-for-LLM, les onglets Errors / Console / Network / Source et une timeline navigable. Le même `.zip` portable s'ouvre également dans d'autres visionneuses de traces autonomes et dans la visionneuse intégrée d'un rapport Allure. Consultez la page **[Trace Player](/docs/devtools/trace-player)** pour la présentation complète, les fonctionnalités et les raccourcis clavier.

## Localisateurs dans l'onglet A11y

Le binaire `show-trace` fourni par chaque adaptateur ouvre la même archive dans le lecteur DevTools, qui expose en plus un **onglet A11y** : l'arbre d'accessibilité capturé pour chaque action, où cliquer sur une ligne copie le localisateur de cet élément.

Ces localisateurs sont écrits dans le dialecte propre au runner qui a enregistré la trace, ils se collent donc directement dans le framework qui l'a produite. Un élément identifié uniquement par son texte devient `a*=Logout` sous WebdriverIO et `//a[contains(., "Logout")]` sous Selenium — accompagné de l'appel qui le résout, `By.xpath()`. Nightwatch privilégie un localisateur CSS natif tel que `button[type="submit"]`, car c'est le seul runner qui lit une simple chaîne de sélecteur avec une stratégie CSS par défaut, et ne se rabat sur XPath (accompagné de `useXpath()` / `locateStrategy: 'xpath'`) que lorsqu'aucun localisateur CSS unique n'existe. Tous les autres localisateurs sont en CSS portable.

Pour une consommation par un LLM / agent, lisez directement `transcript.md` — c'est un rendu Markdown concis des actions avec leurs sélecteurs et leurs valeurs.

## En savoir plus

- **[Trace Player](/docs/devtools/trace-player)** — la présentation complète du lecteur `show-trace`, ses fonctionnalités et ses raccourcis clavier.
- **[Intégration Allure](/docs/devtools/allure)** — comment les artefacts de trace / capture d'écran / vidéo sont joints à un rapport Allure.
- **[Support multi-frameworks](/docs/devtools/cross-framework)** — la matrice des capacités par adaptateur (WebdriverIO / Selenium / Nightwatch).
- **[Limitations du mode trace](/docs/devtools/limitations)** — ce que le mode trace ignore et les lacunes connues par adaptateur.
- **[Référence de configuration](/docs/devtools/reference)** — toutes les options en un coup d'œil.