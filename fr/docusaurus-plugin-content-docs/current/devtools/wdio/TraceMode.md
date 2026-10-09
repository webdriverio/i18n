---
id: trace-mode
title: Mode trace
description: "Capturez des artefacts de trace en mode headless avec le mode trace de DevTools et configurez le format, la granularité, la rétention, les captures d'écran, la vidéo et les assertions."
---

Chemin de capture headless : aucune fenêtre d'interface DevTools ne s'ouvre. À la fin de la session, l'adaptateur écrit les artefacts de trace dans un dossier `test-results/` situé à côté de votre répertoire de spec / de configuration. Pour la granularité `session` / `spec`, il s'agit d'un `trace-<sessionId>.zip` (ou d'un répertoire `trace-<sessionId>/`) ; pour la granularité `test`, chaque test obtient son propre sous-dossier (voir [Granularité de la trace](#trace-granularity--tracegranularity)). L'artefact est portable et contient tout le nécessaire pour une relecture hors ligne, une comparaison par un agent IA, ou tout consommateur qui préfère un fichier à une interface en direct.

Le mode trace est **mutuellement exclusif avec le mode live**. Choisissez-en un par session : les humains qui déboguent de manière interactive veulent le mode live ; les agents qui comparent des exécutions ou les bots de CI qui collectent des artefacts veulent le mode trace.

## Activation

```ts
// wdio.conf.ts
services: [
  [
    'devtools',
    {
      mode: 'trace',
      traceFormat: 'zip' // optional; 'zip' (default) | 'ndjson-directory'
    }
  ]
]
```

Une configuration de référence complète, prête à copier-coller, est fournie dans [`examples/wdio/wdio.trace.conf.ts`](https://github.com/webdriverio/devtools/blob/main/examples/wdio/wdio.trace.conf.ts).

Selenium et Nightwatch embarquent le même pipeline de trace — consultez leurs pages d'adaptateur pour la syntaxe d'activation propre à chaque framework : [Selenium](/docs/devtools/selenium#trace-mode) · [Nightwatch](/docs/devtools/nightwatch#trace-mode).

## Contenu de l'artefact

| Fichier | Contenu |
|---|---|
| `trace.trace` | NDJSON `context-options` + événements d'action `before` / `after` ; une ligne par enregistrement |
| `trace.network` | Entrées réseau au format HAR, une par ligne |
| `transcript.md` | Résumé Markdown lisible par un humain/LLM avec les temps, les sélecteurs et les annotations de valeurs |
| `resources/page@<id>-<ts>.jpeg` | Capture d'écran prise à chaque action visible par l'utilisateur |
| `resources/page@<id>-<ts>-elements.json` | Liste à plat des éléments interactifs au moment de cette action |
| `resources/page@<id>-<ts>-snapshot.txt` | Instantané de l'arbre d'accessibilité indenté par profondeur (adapté à l'IA) |

### Ce qui compte comme une « action »

Les commandes sont filtrées par une liste d'autorisation avant de produire des entrées de trace. Exemples qui apparaissent dans la trace :

- `url` / `get` → `Page.navigate`
- `click` → `Element.click`
- `setValue` / `sendKeys` → `Element.fill`
- `submit`, `clear`, `selectByVisibleText`, …

Les commandes internes comme `findElement`, `waitUntil`, `executeScript` sont délibérément exclues — elles ne représentent pas une intention visible par l'utilisateur et ajouteraient du bruit à la chronologie. La liste d'autorisation complète se trouve dans [`@wdio/devtools-core/action-mapping.ts`](https://github.com/webdriverio/devtools/blob/main/packages/core/src/action-mapping.ts).

## Format de sortie — `traceFormat`

```ts
{
  mode: 'trace',
  traceFormat: 'zip' | 'ndjson-directory'  // default: 'zip'
}
```

- **`zip`** (par défaut) — une seule archive dans `test-results/trace-<sessionId>.zip`.
- **`ndjson-directory`** — les mêmes fichiers décompressés dans `test-results/trace-<sessionId>/`. Une étape de décompression en moins pour les consommateurs scriptés ou agentiques qui souhaitent faire un grep / lire le NDJSON en flux directement.

Les deux formats s'ouvrent dans le [lecteur `show-trace`](/docs/devtools/trace-player) officiel et dans d'autres visionneuses de traces compatibles.

## Granularité de la trace — `traceGranularity`

Le nombre d'artefacts de trace produits par une exécution :

```ts
{
  mode: 'trace',
  traceGranularity: 'session' | 'spec' | 'test' // default: 'session'
}
```

| Valeur | Sortie |
|---|---|
| `session` (par défaut) | Une trace par worker/session — `test-results/trace-<sessionId>.zip`. |
| `spec` | Une trace par fichier de spec. Plus petite, plus facile à parcourir. |
| `test` | Une trace **par test**, chacune dans son propre dossier : `test-results/<spec>-<title>-<browser>[-retry<N>]/trace.zip`. |

Pour la granularité `test`, le nom du dossier est construit à partir du nom de base de la spec, d'un slug du titre du test, du navigateur et d'un suffixe `-retry<N>` pour les tentatives relancées — par ex. `test-results/login_e2e-logs-in-chrome/trace.zip`, avec une première relance dans `test-results/login_e2e-logs-in-chrome-retry1/trace.zip`. Les traces par test sont les plus faciles à parcourir et se combinent idéalement avec une politique de rétention afin que seules les traces qui vous intéressent soient écrites.

## Rétention — `tracePolicy`

Par défaut, toutes les traces sont conservées (`'on'`). Pour ne conserver que les plus intéressantes — idéal avec `traceGranularity: 'test'` :

```ts
{
  mode: 'trace',
  traceGranularity: 'test',
  tracePolicy: 'retain-on-failure' // default: 'on'
}
```

| Politique | Conserve la trace lorsque… |
|---|---|
| `'on'` (par défaut) | Toujours — chaque trace est écrite. |
| `'retain-on-failure'` | La tentative **finale** du test a échoué. Une séquence de relances échec-puis-succès se termine par `passed`, elle n'est donc *pas* conservée — vous ne conservez pas inutilement un test instable qui a fini par passer. |
| `'retain-on-first-failure'` | La **tentative 0** a échoué, qu'une relance ultérieure ait réussi ou non. |
| `'on-first-retry'` | Le test a été relancé au moins une fois (une tentative 1 existe). |
| `'on-all-retries'` | Il existe au moins une tentative relancée (tentative ≥ 1). |
| `'retain-on-failure-and-retries'` | La tentative finale a échoué **ou** le test a été relancé. |

Une tranche non conservée est écartée et n'est jamais écrite sur le disque. Les politiques tenant compte des relances s'appuient sur un **registre des résultats** par tentative que l'adaptateur tient pour chaque identifiant de test stable entre les relances, de sorte que `retain-on-failure` et `retain-on-first-failure` évaluent la bonne tentative. Lorsqu'un runner n'expose pas d'informations de relance par tentative, toutes les politiques sauf `retain-on-failure` se rabattent sur `retain-on-failure` ; une exécution sans aucun résultat observé (par ex. un simple script autonome) échoue en mode **ouvert** et conserve la trace plutôt que de risquer d'en supprimer une dont vous avez besoin.

> La rétention tenant compte des relances est vérifiée de bout en bout pour **WebdriverIO** (mocha / cucumber) et **Selenium** (mocha). Pour **Nightwatch**, `retain-on-failure` fonctionne, mais les autres politiques tenant compte des relances se rabattent sur celle-ci, car l'option `--retries` de Nightwatch relance un cas de test en interne sans redéclencher les hooks par test. Les `specFileRetries` inter-processus de WDIO échappent également au registre (par worker). Consultez la [page de l'adaptateur Nightwatch](/docs/devtools/nightwatch#trace-mode) pour les détails.

## Filmstrip dense — `filmstrip`

**Par défaut**, la trace enregistre un screencast **dense et continu** afin que le lecteur offre une lecture fluide lors du défilement plutôt que de sauter d'image en image. Les images denses côtoient les images par action (qui portent les instantanés DOM). Définissez `filmstrip: false` pour n'enregistrer qu'une image par action — une trace plus légère, sans enregistreur continu :

```ts
{
  mode: 'trace',
  filmstrip: false // opt out — one frame per action (default is true)
}
```

- Les images denses sont ajoutées **en plus** des images par action (qui portent les instantanés DOM), si bien qu'aucune donnée DOM n'est perdue — lorsque des images denses sont présentes, elles remplacent le filmstrip clairsemé par action pour le défilement.
- Les images sont espacées à l'export (≥ 100 ms d'écart) et adressées par contenu, de sorte que des images identiques (une attente statique) sont fusionnées en une seule ressource. Le tampon de la session en direct est limité par `screencast.maxBufferFrames` (2000 par défaut).
- L'enregistrement utilise l'enregistreur de screencast — push CDP sur Chrome/Chromium, interrogation par captures d'écran ailleurs. Sur les navigateurs autres que Chrome, l'interrogation émet de nombreuses commandes `takeScreenshot` ; combinez-la avec l'option de masquage des étapes de votre reporter (voir [Intégration Allure](/docs/devtools/allure)).

`filmstrip` est disponible sur les trois adaptateurs (WebdriverIO / Selenium / Nightwatch).

## Capture d'écran et vidéo par test — `screenshot` / `video`

Avec `traceGranularity: 'test'`, chaque test peut également produire une capture d'écran autonome et/ou une tranche vidéo par test, reprenant l'ergonomie familière de la capture d'écran/vidéo en cas d'échec :

```ts
{
  mode: 'trace',
  traceGranularity: 'test',
  screenshot: 'only-on-failure', // 'off' (default) | 'on' | 'only-on-failure'
  video: 'retain-on-failure'     // 'off' (default) | any tracePolicy value
}
```

| Option | Valeurs | Comportement |
|---|---|---|
| `screenshot` | `'off'` (par défaut) · `'on'` · `'only-on-failure'` | `'on'` capture après chaque test ; `'only-on-failure'` uniquement après un test en échec. PNG. |
| `video` | `'off'` (par défaut) · toute valeur de `tracePolicy` | Enregistre le screencast en continu et conserve la tranche de chaque test selon la même sémantique de rétention que `tracePolicy`. WebM. Définir une valeur autre que `off` démarre l'enregistreur de lui-même — vous n'avez pas besoin d'activer également `filmstrip` ou `screencast.enabled`. |

Les deux sont limités au mode trace + `traceGranularity: 'test'` (la portée par test à laquelle ils se rattachent). Avec des granularités plus larges, ils sont sans effet.

- **WebdriverIO** — `screenshot` / `video` sont des options du service ; ils sont joints directement à Allure lorsque `@wdio/allure-reporter` est présent.
- **Selenium** — mêmes options dans ses `DevToolsOptions` ; joints directement à Allure via `allure-js-commons` lorsqu'un adaptateur de runner Allure est actif.
- **Nightwatch** — **production uniquement** : les fichiers sont écrits dans le répertoire de sortie de la trace (et listés dans le manifeste), mais ne sont pas joints directement à Allure — Nightwatch ne dispose d'aucune API d'attachement Allure en direct. Voir [Limitations du mode trace](/docs/devtools/limitations).

> `screencast.enabled` correspond à l'enregistrement `.webm` continu distinct du **mode live** et est ignoré en mode trace. En mode trace, utilisez `filmstrip` (images denses dans la trace) ou `video` par test ; les champs de réglage du screencast (`quality`, `maxWidth`, `pollIntervalMs`, …) s'appliquent toujours à l'enregistreur en cours d'exécution.

## Manifeste des artefacts — `emitArtifactsManifest`

Écrit un fichier `devtools-artifacts-<sessionId>.json` à côté de la trace — un index générique que les reporters et la CI consomment pour découvrir les artefacts produits (chaque trace / capture d'écran / vidéo, ainsi que l'état de chaque test) :

```ts
{
  mode: 'trace',
  emitArtifactsManifest: true // default: off; auto-on when Allure is detected
}
```

- **Désactivé par défaut.** Il s'**active automatiquement** lorsqu'un reporter Allure est détecté — `@wdio/allure-reporter` de WebdriverIO dans la configuration, ou un runtime Selenium `allure-js-commons` actif.
- **Nightwatch nécessite une activation explicite** : il n'existe aucun signal Allure en direct à détecter (`nightwatch-allure` intervient a posteriori), il ne s'active donc jamais automatiquement — définissez-le explicitement si vous voulez le manifeste.

## Assertions — `captureAssertions`

Les assertions apparaissent comme des lignes d'action à part entière dans la trace (activé par défaut ; définissez `captureAssertions: false` pour le désactiver) :

- **`node:assert`** — capturées sur les trois adaptateurs sous forme de lignes `assert.<method>`.
- **`expect` de WebdriverIO** — les matchers `expect(...)` réussis *et* en échec (`expect($el).toHaveText(...)`, `toBeExisting()`, …) apparaissent sous forme de lignes `expect.<matcher>` contenant la valeur attendue, l'emplacement dans le code source de l'élément et un instantané ; les commandes d'interrogation internes du matcher sont masquées afin que seule l'assertion apparaisse.
- **`browser.assert.*` / `browser.verify.*` de Nightwatch** — les assertions natives apparaissent sous forme de lignes `assert.<m>` / `verify.<m>`.

Les assertions réussies s'affichent en vert ; celles en échec s'affichent en rouge avec le message d'erreur.

## Tests mobiles

Le mode trace détecte les sessions mobiles via `platformName: 'android' | 'ios'` (insensible à la casse) et s'adapte :

- **Web mobile** (Chrome sur Android, Safari sur iOS) : même pipeline d'instantanés basé sur le DOM que sur desktop.
- **Mobile natif** : les scripts DOM injectés dans la page sont désactivés ; `getPageSource()` est utilisé pour récupérer l'arbre XML d'Appium, qui alimente alors le sérialiseur d'instantanés.

Le `context-options` de la trace enregistre `title: 'android — <deviceName>'` / `'ios — <deviceName>'` afin que la visionneuse étiquette correctement les images. Une configuration WDIO de référence pour Chrome sur Android via Appium est fournie dans [`examples/wdio/wdio.mobile.conf.ts`](https://github.com/webdriverio/devtools/blob/main/examples/wdio/wdio.mobile.conf.ts).

## Visualiser l'artefact

Ouvrez une trace dans le **[Trace Player](/docs/devtools/trace-player)** officiel — l'interface WebdriverIO DevTools dans un mode lecteur dédié en lecture seule :

```sh
show-trace trace-<sessionId>.zip          # bin on PATH after install
npx show-trace trace-<sessionId>.zip      # or via npx
```

Le lecteur vous offre le voyage dans le temps du DOM, l'onglet A11y et la superposition de sélection de localisateur, l'onglet Transcript avec Copy-for-LLM, les onglets de dock Errors / Console / Network / Source, et une chronologie que l'on peut faire défiler. Le même `.zip` portable s'ouvre également dans d'autres visionneuses de traces autonomes et dans la visionneuse intégrée d'un rapport Allure. Consultez la page **[Trace Player](/docs/devtools/trace-player)** pour la présentation complète, les fonctionnalités et les raccourcis clavier.

## En savoir plus
Le bin `show-trace` fourni par chaque adaptateur ouvre la même archive dans le lecteur DevTools, qui expose en plus un **onglet A11y** : l'arbre d'accessibilité capturé à chaque action, où un clic sur une ligne copie le localisateur de cet élément.

Ces localisateurs sont écrits dans le dialecte propre au runner ayant effectué l'enregistrement, de sorte qu'ils se collent directement dans le framework qui a produit la trace. Un élément identifié uniquement par son texte s'écrit `a*=Logout` avec WebdriverIO et `//a[contains(., "Logout")]` avec Selenium — accompagné de l'appel qui le résout, `By.xpath()`. Nightwatch privilégie un localisateur CSS natif tel que `button[type="submit"]`, car c'est le seul runner qui lit une chaîne de sélecteur brute avec une stratégie CSS par défaut, et ne se rabat sur XPath (accompagné de `useXpath()` / `locateStrategy: 'xpath'`) que lorsqu'aucun localisateur CSS unique n'existe. Tous les autres localisateurs sont en CSS portable.

Pour une consommation par un LLM / agent, lisez directement `transcript.md` — c'est un rendu Markdown concis des actions avec les sélecteurs et les valeurs.

- **[Trace Player](/docs/devtools/trace-player)** — la présentation complète du lecteur `show-trace`, ses fonctionnalités et ses raccourcis clavier.
- **[Intégration Allure](/docs/devtools/allure)** — comment les artefacts de trace / capture d'écran / vidéo sont joints à un rapport Allure.
- **[Prise en charge multi-frameworks](/docs/devtools/cross-framework)** — la matrice des capacités par adaptateur (WebdriverIO / Selenium / Nightwatch).
- **[Limitations du mode trace](/docs/devtools/limitations)** — ce que le mode trace ignore et les lacunes connues par adaptateur.
- **[Référence de configuration](/docs/devtools/reference)** — toutes les options en un coup d'œil.