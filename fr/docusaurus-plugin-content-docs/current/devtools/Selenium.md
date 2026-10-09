---
id: selenium
title: Selenium DevTools
description: "Ajoutez l'interface de débogage DevTools à vos tests Selenium WebDriver en Node.js ou Python, avec n'importe quel lanceur de tests, et activez le mode trace."
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Adaptateur Selenium WebDriver pour [WebdriverIO DevTools](https://github.com/webdriverio/devtools) - il apporte la même interface de débogage visuelle à n'importe quel test Selenium, en **Node.js** ou en **Python**, quel que soit le lanceur de tests.

En Node.js, il fonctionne avec **Mocha**, **Jest**, **Cucumber** ou un simple script - le plugin détecte automatiquement le lanceur et relie les limites des tests en conséquence. En Python, il fonctionne avec **pytest** ou un simple script, et sous pytest il ne nécessite aucune modification de vos fichiers de test.

Choisissez votre langage dans les onglets ci-dessous ; ce choix est conservé tout au long de la page.

## Installation

<Tabs groupId="devtools-language">
<TabItem value="node" label="Node.js" default>

```bash
npm install @wdio/selenium-devtools
```

</TabItem>
<TabItem value="python" label="Python">

```bash
pip install selenium-devtools-py
```

**Nécessite Python 3.10+ et `selenium>=4.44`.** Les deux sont déclarés dans les métadonnées du paquet, de sorte que pip les impose au lieu de vous laisser découvrir un onglet Network vide à l'exécution. La capture réseau s'abonne via l'API publique d'événements BiDi que selenium a régénérée en 4.44 ; la connexion privée qu'elle remplace a été supprimée dans la même version, et c'est la 4.44 qui fixe la version minimale de Python.

</TabItem>
</Tabs>

## Configuration

<Tabs groupId="devtools-language">
<TabItem value="node" label="Node.js" default>

Chaque bloc ci-dessous est un **exemple complet, prêt à copier-coller**, incluant l'appel `DevTools.configure(...)`. Choisissez le lanceur que vous utilisez, déposez l'extrait dans votre projet et exécutez-le.

### Mocha

```js
// tests/example.test.js
import { strict as assert } from 'node:assert'
import { Builder, By, until } from 'selenium-webdriver'
import { DevTools } from '@wdio/selenium-devtools'

DevTools.configure({
  screencast: { enabled: true, quality: 70, maxWidth: 1280, maxHeight: 720 }
})

describe('smoke test', function () {
  let driver

  before(async function () {
    driver = await new Builder().forBrowser('chrome').build()
  })

  after(async function () {
    if (driver) {
      await driver.quit()
    }
  })

  it('loads example.com and reads the heading', async function () {
    await driver.get('https://example.com')
    const heading = await driver.wait(until.elementLocated(By.css('h1')), 10000)
    assert.equal(await heading.getText(), 'Example Domain')
  })
})
```

Exécutez-le :

```bash
mocha --timeout 60000 tests/example.test.js
```

> Alternative : évitez l'import dans chaque fichier et utilisez `mocha --require @wdio/selenium-devtools` pour charger le plugin une seule fois pour toute l'exécution.

### Jest

```js
// test/example.js
import { DevTools } from '@wdio/selenium-devtools'
import { Builder, By, until } from 'selenium-webdriver'

DevTools.configure({
  screencast: { enabled: true, quality: 70, maxWidth: 1280, maxHeight: 720 }
})

describe('login flow', () => {
  let driver

  beforeEach(async () => {
    driver = await new Builder().forBrowser('chrome').build()
  }, 60000)

  afterEach(async () => {
    if (driver) {
      await driver.quit()
    }
  })

  test('logs in with valid credentials', async () => {
    await driver.get('https://the-internet.herokuapp.com/login')
    await driver.findElement(By.id('username')).sendKeys('tomsmith')
    await driver.findElement(By.id('password')).sendKeys('SuperSecretPassword!')
    await driver.findElement(By.css('button[type="submit"]')).click()

    await driver.wait(until.urlContains('/secure'), 10000)
    const flash = await driver.findElement(By.id('flash'))
    expect(await flash.getText()).toMatch(/You logged into a secure area/i)
  }, 60000)
})
```

`jest.config.json` :

```json
{
  "testEnvironment": "node",
  "testMatch": ["<rootDir>/test/example.js"],
  "testTimeout": 60000,
  "transform": {}
}
```

Exécutez-le (ESM nécessite le flag expérimental) :

```bash
NODE_OPTIONS=--experimental-vm-modules jest --config jest.config.json
```

### Cucumber

L'organisation éclatée de Cucumber implique trois petits fichiers - un pour charger le plugin, un pour le World/les hooks, et un pour les définitions d'étapes.

`features/support/setup.js` - charger le plugin et le configurer une seule fois :

```js
import { DevTools } from '@wdio/selenium-devtools'

DevTools.configure({
  screencast: { enabled: true, quality: 70, maxWidth: 1280, maxHeight: 720 }
})
```

`features/support/world.js` - cycle de vie du driver :

```js
import {
  setWorldConstructor,
  World,
  Before,
  After,
  setDefaultTimeout
} from '@cucumber/cucumber'
import { Builder } from 'selenium-webdriver'

setDefaultTimeout(60000)

class CustomWorld extends World {
  constructor (options) {
    super(options)
    this.driver = null
  }
}

setWorldConstructor(CustomWorld)

Before(async function () {
  this.driver = await new Builder().forBrowser('chrome').build()
})

After(async function () {
  if (this.driver) {
    await this.driver.quit()
    this.driver = null
  }
})
```

`cucumber.json` - référencez le fichier de setup **en premier** pour que le plugin patche Selenium avant l'exécution de toute étape :

```json
{
  "default": {
    "import": [
      "features/support/setup.js",
      "features/support/world.js",
      "features/support/steps.js"
    ],
    "paths": ["features/*.feature"],
    "format": ["progress"]
  }
}
```

Exécutez-le :

```bash
cucumber-js --config cucumber.json
```

### Script Node simple (sans lanceur de tests)

Si vous exécutez directement `node tests/google.test.js`, il n'y a aucun lanceur auquel le plugin puisse se raccorder automatiquement. Par défaut, vous obtenez une seule ligne « Selenium Session » dans le tableau de bord. Pour obtenir une limite de test nommée, appelez `DevTools.startTest` / `endTest` autour de votre code :

```js
// tests/google.test.js
import { DevTools } from '@wdio/selenium-devtools'
import { Builder, By, until, Key } from 'selenium-webdriver'

DevTools.configure({
  screencast: { enabled: true, quality: 70, maxWidth: 1280, maxHeight: 720 },
  headless: false
})

async function run () {
  DevTools.startTest('search Google for Selenium')   // optionnel - nomme la ligne du test

  const driver = await new Builder().forBrowser('chrome').build()
  try {
    await driver.get('https://www.google.com')
    const searchBox = await driver.findElement(By.name('q'))
    await searchBox.sendKeys('Selenium WebDriver JavaScript', Key.ENTER)
    await driver.wait(until.titleContains('Selenium'), 10000)
    DevTools.endTest('passed')
  } catch (err) {
    DevTools.endTest('failed')
    throw err
  } finally {
    await driver.quit()
  }
}

run()
```

```bash
node tests/google.test.js
```

> N'utilisez `startTest` / `endTest` que pour les scripts Node simples. Sous Mocha / Jest / Cucumber, le plugin sait déjà quand chaque test commence et se termine - les appeler manuellement créerait des lignes en double.

</TabItem>
<TabItem value="python" label="Python">

### pytest

Rien à ajouter dans vos fichiers de test - le plugin est découvert automatiquement, et un flag l'active pour l'exécution :

```bash
pytest --devtools tests/              # tableau de bord en direct
pytest --devtools-trace tests/        # écrire une archive de trace à la place (implique --devtools)
```

Ou committez ce choix, pour que personne n'ait à se souvenir du flag :

```toml title="pyproject.toml"
[tool.pytest.ini_options]
devtools = true
# devtools_trace = true                          # archive de trace au lieu d'un tableau de bord
# devtools_trace_granularity = "test"            # ... une archive par test
# devtools_trace_policy = "retain-on-failure"    # ... en ne gardant que ce qui a échoué
```

Un `pytest.ini` avec une section `[pytest]` accepte les mêmes clés. Les deux paramètres de trace sont décrits dans [Combien d'archives, et lesquelles conserver](#how-many-archives-and-which-ones-to-keep).

La capture est toujours opt-in - installer le paquet ne doit jamais modifier le comportement d'une suite existante. Seule *la manière* de dire oui diffère :

| Comment activer | Portée |
|---|---|
| `--devtools` / `--devtools-trace` | cette exécution |
| `devtools` / `devtools_trace` dans `[tool.pytest.ini_options]` | ce projet |
| `DEVTOOLS_ENABLE=1` (ou `DEVTOOLS_PORT=<n>`, qui se connecte aussi à un tableau de bord déjà en cours d'exécution) | ce shell - pour la CI |

Le plus prioritaire l'emporte : CLI, puis ini, puis environnement. `pytest -o devtools=false` désactive une valeur par défaut du projet pour une seule exécution, c'est pourquoi il n'existe pas de `--no-devtools`. `DEVTOOLS_TRACE=1` sélectionne le mode trace mais n'active **pas** la capture à lui seul, de sorte que l'exporter pour vos propres scripts ne capture jamais une exécution pytest que vous n'avez pas demandée.

En mode live, le tableau de bord s'ouvre dans une fenêtre de navigateur dédiée et **reste ouvert après l'exécution** pour que vous puissiez inspecter ce qui s'est passé ; fermez-le (ou `Ctrl-C`) pour terminer. Deux types d'exécution restent non capturés même lorsque vous activez la capture : `--collect-only`, où rien ne s'exécute, et une exécution qui n'a collecté aucun test - sinon, un chemin mal saisi bloquerait votre terminal sur un tableau de bord vide.

### Script Python simple (sans lanceur de tests)

Deux lignes autour de votre code Selenium existant :

```python title="login.py"
import selenium_devtools as devtools
from selenium import webdriver

devtools.enable()                     # ouvrir le tableau de bord, capturer chaque commande
# devtools.enable(trace=True)         # ou : écrire un trace.zip sans ouvrir de fenêtre

driver = webdriver.Chrome()
driver.get('https://the-internet.herokuapp.com/login')
driver.find_element('id', 'username').send_keys('tomsmith')
driver.quit()

devtools.wait_for_dashboard_close()   # garder l'interface ouverte pour l'inspection (sans effet si aucune fenêtre n'est ouverte)
devtools.disable()
```

Si le backend ne peut pas être lancé ou joint, `enable()` affiche un avertissement et renvoie `None`. La capture est ignorée et vos tests s'exécutent quand même - un tableau de bord absent ne fait jamais échouer une suite.

### Exécutions parallèles (`pytest -n`)

**pytest-xdist fonctionne sans configuration supplémentaire.** Tous les processus qui rapportent dans une même exécution doivent s'accorder sur un identifiant d'exécution, sinon le backend traite chaque connexion comme une nouvelle exécution et efface ce que la précédente a capturé. Avec xdist, ils s'accordent : le plugin se charge aussi dans le **contrôleur**, et activer la capture à ce niveau résout l'identifiant avant que xdist ne lance le moindre worker - les workers étant des processus enfants, ils en héritent.

Ce qui apparaît réellement comme des exécutions distinctes : deux invocations `pytest` indépendantes, ou un worker démarré sans l'environnement. Exportez vous-même `DEVTOOLS_RUN_ID` pour regrouper ces processus dans une seule exécution.

</TabItem>
</Tabs>

## Options de configuration {#configuration-options}

<Tabs groupId="devtools-language">
<TabItem value="node" label="Node.js" default>

| Option | Type | Défaut | Description |
|--------|------|---------|-------------|
| `port` | `number` | `3000` | Port du serveur backend DevTools. Incrémenté automatiquement s'il est déjà utilisé. |
| `hostname` | `string` | `'localhost'` | Nom d'hôte sur lequel le serveur backend écoute. |
| `openUi` | `boolean` | `true` | Ouvre automatiquement l'interface DevTools dans une nouvelle fenêtre Chrome. Mettez `false` pour la CI. |
| `captureScreenshots` | `boolean` | `true` | Capture une capture d'écran après chaque commande WebDriver. |
| `headless` | `boolean` | `false` | Exécute le navigateur de **test** en mode headless (injecte `--headless=old`). La fenêtre de l'interface DevTools n'est pas affectée. |
| `screencast` | `ScreencastOptions` | `{ enabled: false }` | Enregistrement vidéo `.webm` par session. Les options correspondent à la page [WebdriverIO Screencast](/docs/devtools/wdio/screencast). |
| `rerunCommand` | `string` | auto | Modèle de commande pour relancer un test. `{{testName}}` est substitué. Déduit automatiquement de l'argv du lanceur s'il est omis. |
| `mode` | `'live' \| 'trace'` | `'live'` | `live` ouvre l'interface DevTools ; `trace` l'ignore et écrit un artefact portable à la place. Voir [Mode trace](/docs/devtools/wdio/trace-mode). Prend le pas sur `openUi`. |
| `traceFormat` | `'zip' \| 'ndjson-directory'` | `'zip'` | Structure de l'artefact de trace. S'applique uniquement avec `mode: 'trace'`. |
| `traceGranularity` | `'session' \| 'spec' \| 'test'` | `'session'` | Une trace par session / fichier de spec / test. `'test'` écrit chacune dans `test-results/<spec>-<title>-<browser>[-retryN]/trace.zip`. S'applique uniquement avec `mode: 'trace'`. Voir [Mode trace](/docs/devtools/wdio/trace-mode#trace-granularity--tracegranularity). |
| `tracePolicy` | `'on' \| 'retain-on-failure' \| 'retain-on-first-failure' \| 'on-first-retry' \| 'on-all-retries' \| 'retain-on-failure-and-retries'` | `'on'` | Quelles traces conserver. S'associe à `traceGranularity: 'test'`. S'applique uniquement avec `mode: 'trace'`. |
| `filmstrip` | `boolean` | `true` | Enregistre un screencast dense et continu dans la trace pour un défilement image par image dans le lecteur. S'applique uniquement avec `mode: 'trace'`. |
| `screenshot` | `'off' \| 'on' \| 'only-on-failure'` | `'off'` | Mode trace + `traceGranularity: 'test'`. Capture d'écran par test, jointe directement à Allure (`image/png`) via `allure-js-commons` lorsqu'un adaptateur de lanceur Allure est actif. |
| `video` | `'off' \| TraceRetentionPolicy` | `'off'` | Mode trace + `traceGranularity: 'test'`. Vidéo screencast par test, conservée selon la politique donnée, jointe directement à Allure (`video/webm`) via `allure-js-commons` lorsqu'un adaptateur de lanceur Allure est actif. |
| `emitArtifactsManifest` | `boolean` | auto | Écrit le manifeste `devtools-artifacts-<sessionId>.json` — l'index générique que les reporters/la CI consomment pour découvrir les artefacts produits — à côté de la trace. Désactivé par défaut ; **s'active automatiquement** lorsqu'un runtime `allure-js-commons` est actif. Mode trace uniquement. |
| `captureAssertions` | `boolean` | `true` | Capture les assertions `node:assert` (réussies comme échouées) sous forme de lignes d'action dans la trace. Mettez `false` pour désactiver. |

```js
DevTools.configure({
  port: 3000,
  hostname: 'localhost',
  headless: false,
  openUi: true
})
```

> **Pour la CI**, définissez à la fois `headless: true` (masquer le navigateur de test) et `openUi: false` (ne pas tenter d'ouvrir la fenêtre du tableau de bord - les environnements de CI n'ont pas d'écran). Le backend continue de tourner sur le port configuré, vous pouvez donc toujours ouvrir l'interface plus tard si nécessaire.

</TabItem>
<TabItem value="python" label="Python">

Il n'y a pas d'objet d'options - rien de spécifique à devtools n'a besoin d'apparaître dans votre code de test. Sous pytest, vous configurez l'adaptateur comme vous configurez pytest ; un script passe des arguments nommés à `enable()` ; tout ce qui n'a pas de flag est une variable d'environnement.

| Flag pytest | `[tool.pytest.ini_options]` | Effet |
|---|---|---|
| `--devtools` | `devtools = true` | Capture cette exécution et ouvre le tableau de bord. |
| `--devtools-trace` | `devtools_trace = true` | Capture cette exécution et écrit une archive de trace au lieu d'ouvrir un tableau de bord. Implique `--devtools`. |
| `--devtools-trace-granularity <session\|test>` | `devtools_trace_granularity = test` | Une archive pour toute l'exécution (`session`, par défaut) ou une par test. Implique `--devtools-trace`. |
| `--devtools-trace-policy <policy>` | `devtools_trace_policy = "retain-on-failure"` | Quelles archives méritent d'être conservées. Implique `--devtools-trace`. Voir [Combien d'archives, et lesquelles conserver](#how-many-archives-and-which-ones-to-keep). |

Le plus prioritaire l'emporte : CLI, puis ini, puis l'environnement ci-dessous. `pytest -o devtools=false` désactive une valeur par défaut du projet pour une exécution, et `pytest -o devtools_trace_policy=on` fait de même pour n'importe laquelle des autres.

| Variable | Effet |
|---|---|
| `DEVTOOLS_ENABLE=1` | Active la capture, si aucun flag ni option ini ne l'a déjà fait. |
| `DEVTOOLS_PORT=<n>` | Se connecte à un tableau de bord qui écoute déjà sur ce port ; active aussi la capture. |
| `DEVTOOLS_HOST=<host>` | Hôte sur lequel le tableau de bord est joignable (par défaut `localhost`). |
| `DEVTOOLS_TRACE=1` | Écrit une archive de trace au lieu d'ouvrir un tableau de bord. Sélectionne le mode pour un script simple ; sous pytest, elle n'active pas la capture à elle seule. |
| `DEVTOOLS_TRACE_GRANULARITY=<session\|test>` | Mode trace : une archive pour toute l'exécution, ou une par test. Ambiante, elle ne sélectionne donc jamais le mode trace à elle seule - associez-la à `DEVTOOLS_TRACE=1`. |
| `DEVTOOLS_TRACE_POLICY=<policy>` | Mode trace : quelles archives méritent d'être conservées. Ambiante, elle ne sélectionne donc jamais le mode trace à elle seule - associez-la à `DEVTOOLS_TRACE=1`. |
| `DEVTOOLS_FILMSTRIP=0` | Mode trace : exclut le filmstrip dense de l'archive. |
| `DEVTOOLS_A11Y=0` | Mode trace : ignore l'arbre A11y et les rectangles d'éléments par action. |
| `DEVTOOLS_OPEN=0` | N'ouvre pas la fenêtre du tableau de bord (CI). |
| `DEVTOOLS_BIDI=0` | Désactive BiDi, et avec lui la capture de la console et du réseau. |
| `DEVTOOLS_RUN_ID=<id>` | Regroupe plusieurs processus dans une seule exécution. |
| `DEVTOOLS_BACKEND_CMD=<cmd>` | Démarre le backend avec une commande explicite au lieu de celle résolue. |

Le backend est une application Node, donc **Node.js 22.19 ou ultérieur doit être disponible dans tous les modes** - même en mode trace, où aucune fenêtre de tableau de bord ne s'ouvre jamais. Il ne s'agit pas seulement de l'interface : le collecteur de page est servi par le backend, tout le flux d'événements transite par son WebSocket, et en mode trace c'est aussi lui qui construit l'archive. `enable()` vérifie la présence de Node dès le départ et indique ce qui manque plutôt que d'échouer plus tard sur un timeout de lancement. L'adaptateur trouve ou lance le backend pour vous - voir [exécuter le backend de manière autonome](/docs/devtools/dashboard#running-the-backend-on-its-own) si vous préférez le gérer vous-même, ou pointez `DEVTOOLS_PORT` vers un backend déjà en cours d'exécution, auquel cas aucun Node local n'est nécessaire.

### Assertions

Les instructions `assert` réussies et échouées apparaissent sous forme de lignes portant les valeurs **attendue** et **réelle**, et les échecs remontent dans l'onglet Errors. En Python, `assert` est une instruction et non un appel ; contrairement au patch de `node:assert` de l'adaptateur Node, il n'y a donc rien à envelopper - le résultat provient du lanceur.

**Sous pytest**, les valeurs proviennent du réécrivain d'assertions, chaque ligne porte donc de vrais opérandes. Capturer les assertions *réussies* nécessite le `enable_assertion_pass_hook` de pytest, que le plugin active lui-même. Une réserve : pytest décide, module par module et *au moment de la réécriture*, s'il émet ce hook ; un module dont le bytecode réécrit a été mis en cache avant l'installation du plugin continue donc de ne signaler que les échecs. L'adaptateur le signale une fois lors de la collecte et nomme le cache à supprimer - qui n'est **pas** toujours le `__pycache__` à côté de vos tests, puisque `sys.pycache_prefix` (défini par défaut sur le Python système de macOS) envoie chaque module réécrit dans une arborescence centrale unique.

**Dans un script simple**, il n'y a pas de réécrivain ; les résultats proviennent donc des événements de ligne de l'interpréteur et les valeurs sont lues depuis la frame sur le point d'exécuter l'assert. Seules les lectures qui ne peuvent pas exécuter votre code sont résolues : un littéral ou une variable locale est résolu, un attribut ou un appel ne l'est pas, car évaluer `driver.current_url` une seconde fois émettrait une autre commande WebDriver.

</TabItem>
</Tabs>

## Mode trace {#trace-mode}

Chemin de capture headless, dans **les deux langages** - aucune fenêtre d'interface DevTools ne s'ouvre, et l'exécution écrit une archive de trace portable dans un dossier `test-results/`, avec la même structure que l'artefact de trace WebdriverIO. Les deux diffèrent uniquement par la part de l'artefact que vous pouvez ajuster, et par qui le construit.

<Tabs groupId="devtools-language">
<TabItem value="node" label="Node.js" default>

À la fin de la session, l'adaptateur écrit lui-même `trace-<sessionId>.zip` (ou un répertoire) dans `test-results/`, à côté du répertoire de test / de configuration résolu.

```js
DevTools.configure({
  mode: 'trace',
  traceFormat: 'ndjson-directory'  // optionnel ; 'zip' par défaut
})
```

La liaison du port du backend, la fenêtre de l'interface et l'option `screencast` sont toutes ignorées en mode trace. Pour la référence complète des fonctionnalités (contenu de l'artefact, visionneuse, tests mobiles, quand choisir `zip` ou `ndjson-directory`), consultez la [page Mode trace](/docs/devtools/wdio/trace-mode).

### Artefacts par test et rétention

Avec `traceGranularity: 'test'`, chaque test obtient son propre dossier d'artefacts, et `tracePolicy` décide lesquels sont conservés (p. ex. `retain-on-failure`). Dans ce mode, vous pouvez aussi capturer une `screenshot` (PNG) et une `video` (`.webm`) par test, et activer un `filmstrip` dense enregistré dans la trace pour un défilement image par image. Lorsqu'un adaptateur de lanceur `allure-js-commons` est actif, les traces / captures d'écran / vidéos par test sont jointes directement au rapport Allure (et `emitArtifactsManifest` s'active automatiquement) ; sinon, elles sont écrites dans `test-results/` et référencées dans le manifeste.

```js
DevTools.configure({
  mode: 'trace',
  traceGranularity: 'test',
  tracePolicy: 'retain-on-failure',
  filmstrip: true,
  screenshot: 'only-on-failure',
  video: 'retain-on-failure'
})
```

</TabItem>
<TabItem value="python" label="Python">

Il n'y a pas d'objet d'options à définir - un flag sous pytest, un argument nommé dans un script :

```bash
pytest --devtools-trace tests/        # implique --devtools
DEVTOOLS_TRACE=1 python3 login.py     # script simple ; équivaut à devtools.enable(trace=True)
```

```python title="login.py"
devtools.enable(trace=True)           # écrire un trace.zip au lieu d'ouvrir un tableau de bord
```

L'archive est déposée dans `test-results/` à côté du fichier de test d'où provient la première commande capturée - le même répertoire où les vidéos screencast sont déjà écrites - sous le nom `trace-<sessionId>.zip`, ou nommée d'après chaque test lorsque vous demandez [une archive par test](#how-many-archives-and-which-ones-to-keep). Si aucune commande ne porte une localisation source issue de votre code, elle se replie sur `test-results/` dans le répertoire courant.

**Aucune fenêtre de tableau de bord ne s'ouvre.** L'artefact est le résultat, et une exécution live reste bloquée sur la fenêtre jusqu'à ce que vous la fermiez - une fenêtre transformerait l'écriture d'un fichier en session interactive. Le backend démarre quand même, car c'est lui qui *construit* l'archive : les transformations de trace sont écrites en TypeScript, donc une exécution Python les demande au backend plutôt que d'en embarquer une seconde copie. C'est la seule différence avec le mode trace sans backend de l'adaptateur Node.js, et la raison pour laquelle [Node.js 22.19 ou ultérieur est requis dans tous les modes](#configuration-options).

En plus des lignes de commande, des captures d'écran et sélecteurs par commande, de la console et du réseau capturés dans les deux modes, l'archive contient :

| Dans l'archive | Défaut | Désactivation |
|---|---|---|
| Voyage dans le temps du DOM - le flux de mutations que le lecteur rejoue étape par étape | activé | - |
| Filmstrip dense - les images du screencast, intégrées à la trace au lieu d'un `.webm` | activé | `DEVTOOLS_FILMSTRIP=0` |
| Arbre A11y et superposition des éléments - lus à côté de chaque action, au prix de deux allers-retours supplémentaires par commande | activé | `DEVTOOLS_A11Y=0` |

Le mode trace n'encode aucun `.webm`, il n'a donc pas besoin de `ffmpeg` - les images *sont* le filmstrip.

**L'export est demandé à la fin de l'exécution, pas à la sortie du processus** - pytest le demande à `sessionfinish` et le `disable()` d'un script exporte avant de fermer le transport, de sorte que la CI obtient l'artefact, qu'une fenêtre ait été impliquée ou non.

### Combien d'archives, et lesquelles conserver {#how-many-archives-and-which-ones-to-keep}

Deux paramètres en décident, et aucun n'a de sens en dehors du mode trace.

**Granularité** - combien d'archives l'exécution écrit :

| `--devtools-trace-granularity` | Résultat |
|---|---|
| `session` (défaut) | Une archive pour toute l'exécution. |
| `test` | Une archive par test, chacune ne contenant que les commandes, la console, le réseau, les mutations du DOM, les arbres a11y et les images de screencast de ce test. |

Il n'y a volontairement pas de valeur `spec` ici. Pour cet adaptateur, la spec *est* le fichier de test, donc un troisième nom ne pourrait que signifier implicitement l'une des deux valeurs ci-dessus.

**Politique** - lesquelles de ces archives sont conservées :

| `--devtools-trace-policy` | Résultat |
|---|---|
| `on` (défaut) | Tout conserver. |
| `retain-on-failure` | Ne conserver que ce qui a échoué. |
| `retain-on-first-failure`, `on-first-retry`, `on-all-retries`, `retain-on-failure-and-retries` | Acceptées, mais elles se comportent aujourd'hui **exactement comme `retain-on-failure`**. |

Ces quatre dernières ne tiennent pas encore compte des nouvelles tentatives, et il vaut mieux le dire clairement que de le découvrir à partir d'une archive attendue : rien de ce que cet adaptateur transmet ne porte de numéro de tentative, donc un test relancé écrase son propre résultat précédent et la question liée aux nouvelles tentatives ne peut pas du tout être posée. Le backend journalise cette dégradation plutôt que de faire semblant. N'en choisissez une que si vous voulez `retain-on-failure` sous un nom qui aura plus de sens plus tard.

Les deux se combinent :

| Granularité | Politique | Ce que vous obtenez |
|---|---|---|
| `test` | `retain-on-failure` | Uniquement les tests qui ont échoué. |
| `session` | `retain-on-failure` | L'archive de toute l'exécution, si quelque chose y a échoué. |
| l'une ou l'autre | `on` | Tout. |

Chaque archive conservée avec la granularité `test` est nommée d'après son test (`trace-<test>-<hash>.zip`, le hash étant calculé à partir du nodeid du test pour que deux cas paramétrés partageant un même titre ne puissent pas s'écraser mutuellement). Une exécution qui ne conserve rien n'écrit rien du tout, et c'est tout l'intérêt - les archives qui vous restent sont celles qui valent la peine d'être ouvertes, et un export refusé signifie que la politique fonctionne, pas qu'il y a un échec.

Définissez-les pour une exécution :

```bash
pytest --devtools-trace-granularity test --devtools-trace-policy retain-on-failure tests/
```

Ou committez-les, pour qu'un contributeur qui clone le projet capture de la même manière sans qu'on ait à le lui dire :

```ini title="pytest.ini"
[pytest]
devtools_trace = true
devtools_trace_granularity = test
devtools_trace_policy = retain-on-failure
```

`[tool.pytest.ini_options]` dans `pyproject.toml` accepte les mêmes clés, et `pytest -o devtools_trace_policy=on tests/` en remplace une pour une seule exécution sans modifier le fichier. Une version entièrement commentée - chaque paramètre et chaque variable d'environnement, avec leur rôle - se trouve dans le dépôt à [`examples/selenium/python-test/trace-py-test/`](https://github.com/webdriverio/devtools/tree/main/examples/selenium/python-test/trace-py-test).

Un script simple passe les deux mêmes paramètres comme arguments nommés :

```python title="login.py"
devtools.enable(trace_granularity='test', trace_policy='retain-on-failure')
```

**Nommer explicitement l'un ou l'autre sélectionne le mode trace.** Le flag CLI, l'option ini et l'argument de `enable()` l'impliquent tous, puisqu'une politique ou une granularité n'a aucun sens en mode live et qu'en honorer une sans le mode abandonnerait silencieusement ce que vous avez demandé. `DEVTOOLS_TRACE_POLICY` et `DEVTOOLS_TRACE_GRANULARITY` ne le font volontairement **pas** : une variable exportée est ambiante et peut avoir été définie pour un autre script dans le même shell ; basculer une exécution live en mode trace sur cette base retirerait un tableau de bord que personne n'a demandé à perdre - associez-les à `DEVTOOLS_TRACE=1`. Une exécution qui finit par ignorer un paramètre de trace exporté affiche un avertissement, plutôt que de vous laisser remarquer une archive qui n'est jamais apparue.

</TabItem>
</Tabs>

### Visualiser la trace

Ouvrez n'importe quel `.zip` de trace dans le lecteur officiel — la même interface DevTools dans un mode **player** dédié :

```bash
npx show-trace path/to/trace.zip      # dans un projet qui installe l'adaptateur
pnpm show-trace path/to/trace.zip     # depuis le monorepo devtools
```

Le binaire `show-trace` est livré avec `@wdio/selenium-devtools`, il est donc disponible dans tout projet qui l'installe — sans dépendance supplémentaire. Un projet Python n'installe aucun adaptateur Node.js, mais le même lecteur est livré avec le backend que l'adaptateur récupère déjà pour vous : `npx -p @wdio/devtools-backend show-trace path/to/trace.zip`.

Comme l'adaptateur Selenium capture le **flux de mutations du DOM** de la page ainsi qu'un instantané d'élément / d'accessibilité par commande à côté de chaque capture d'écran, une trace Selenium exploite l'ensemble des fonctionnalités du lecteur — voyage dans le temps du DOM, l'onglet A11y et la superposition de sélection de locator, l'onglet Transcript avec Copy-for-LLM, l'imbrication Feature → Scenario → Step de Cucumber, et la timeline navigable. Une trace Python contient le même flux de mutations et le même instantané par action (la lecture élément / a11y n'y existe qu'en mode trace, et est activée par défaut) ; l'imbrication Gherkin est le seul élément sans équivalent pytest.

La trace utilise un schéma NDJSON portable, de sorte que le même `.zip` (ou répertoire) s'ouvre aussi dans d'autres visionneuses de traces compatibles. Consultez la page **[Trace Player](/docs/devtools/trace-player)** pour le guide complet.

## API publique

<Tabs groupId="devtools-language">
<TabItem value="node" label="Node.js" default>

```js
import { DevTools } from '@wdio/selenium-devtools'

DevTools.configure(opts)             // définir les options d'exécution (voir ci-dessus)
DevTools.startTest(name, meta?)      // marquer une limite de test nommée (scripts Node simples uniquement)
DevTools.endTest('passed'|'failed'|'skipped'|'pending')
```

Sous Mocha / Jest / Cucumber, le plugin se raccorde automatiquement au cycle de vie du lanceur, vous n'avez donc pas besoin d'appeler `startTest` / `endTest` manuellement - les appeler créerait des lignes en double.

</TabItem>
<TabItem value="python" label="Python">

```python
import selenium_devtools as devtools

devtools.enable()                     # se connecter et instrumenter ; idempotent
devtools.disable()                    # tout arrêter ; peut être appelé deux fois sans risque
devtools.wait_for_dashboard_close()   # bloquer jusqu'à la fermeture de la fenêtre
devtools.get_capturer()               # le SessionCapturer actif, ou None
devtools.dashboard_url()              # l'URL sur laquelle le tableau de bord est servi
```

`enable()` accepte un `host` et un `port` optionnels, ainsi que des arguments nommés :

```python
devtools.enable(trace=True)                            # écrire un trace.zip ; n'ouvrir aucune fenêtre
devtools.enable(trace=True, filmstrip=False)           # ... sans le filmstrip dense
devtools.enable(trace=True, a11y=False)                # ... sans la lecture élément / a11y par action
devtools.enable(trace_granularity='test')              # ... une archive par test (implique trace=True)
devtools.enable(trace_policy='retain-on-failure')      # ... ne garder que ce qui a échoué (implique trace=True)
```

`filmstrip` et `a11y` ne s'appliquent qu'au mode trace, et chacun est activé par défaut (`DEVTOOLS_FILMSTRIP` / `DEVTOOLS_A11Y` définissent la même chose depuis l'environnement). `trace` se replie sur `DEVTOOLS_TRACE`. `trace_granularity` et `trace_policy` se replient sur `DEVTOOLS_TRACE_GRANULARITY` / `DEVTOOLS_TRACE_POLICY`, et passer l'un ou l'autre active le mode trace à lui seul - voir [Combien d'archives, et lesquelles conserver](#how-many-archives-and-which-ones-to-keep). Une valeur hors de l'ensemble accepté déclenche un avertissement et se replie sur la valeur par défaut plutôt que d'être découverte plus tard sous la forme d'un fichier manquant.

Sous pytest, le plugin pilote tout cela à partir de `--devtools` / `--devtools-trace` (ou de l'option ini correspondante, ou de `DEVTOOLS_ENABLE=1`), et les limites des tests proviennent des hooks propres à pytest - il n'y a pas d'équivalent à `startTest` / `endTest` à appeler.

</TabItem>
</Tabs>

## Exemples

<Tabs groupId="devtools-language">
<TabItem value="node" label="Node.js" default>

Des exemples fonctionnels se trouvent dans le répertoire `examples/` à la racine du dépôt. Construisez l'espace de travail une fois (`pnpm install && pnpm build`), puis exécutez depuis la racine du dépôt. `pnpm demo:selenium` exécute l'exemple par défaut (Cucumber) ; les variantes par lanceur sont :

| Répertoire | Lanceur | Commande |
|-----------|--------|---------|
| [`examples/selenium/mocha-test/`](https://github.com/webdriverio/devtools/tree/main/examples/selenium/mocha-test) | Mocha | `pnpm --filter @wdio/selenium-devtools example:mocha` |
| [`examples/selenium/jest-test/`](https://github.com/webdriverio/devtools/tree/main/examples/selenium/jest-test) | Jest | `pnpm --filter @wdio/selenium-devtools example:jest` |
| [`examples/selenium/cucumber-test/`](https://github.com/webdriverio/devtools/tree/main/examples/selenium/cucumber-test) | Cucumber | `pnpm demo:selenium` |

</TabItem>
<TabItem value="python" label="Python">

Les exemples Python se trouvent dans [`examples/selenium/python-test/`](https://github.com/webdriverio/devtools/tree/main/examples/selenium/python-test). Installez l'adaptateur et construisez l'espace de travail une fois (`pnpm install && pnpm build`, pour que le backend existe), puis exécutez depuis la racine du dépôt :

| Exemple | Ce qu'il montre | Commande |
|---|---|---|
| `web_form.py` | La configuration en trois lignes pour un script simple | `pnpm demo:python` |
| `login.py` | Un script plus long : navigation, remplissage de formulaire, assertions | `pnpm demo:python:login` |
| `trace-py-test/` | pytest avec une classe et un test au niveau du module, plus un `pytest.ini` qui fixe le mode trace, la granularité et la rétention - chaque paramètre y est commenté avec ce qu'il fait | `pnpm demo:python:pytest` |

</TabItem>
</Tabs>

## Fonctionnalités

L'adaptateur Selenium offre la même expérience d'interface DevTools que WebdriverIO, dans les deux langages. Chaque fonctionnalité ci-dessous est capturée automatiquement sans configuration spécifique — le `DevTools.configure({})` de base en Node.js, ou `pytest --devtools` en Python. La console et le réseau sont transmis via les gestionnaires BiDi de Selenium, avec un repli sur un collecteur injecté en Node.js. Les liens mènent à la référence complète de chaque fonctionnalité.

- **[Relance interactive des tests et visualisation](/docs/devtools/wdio/interactive-test-rerunning)** - Aperçus du navigateur en direct, captures d'écran par commande et relance d'un test/d'une suite en un clic
- **[Préserver et relancer (comparer)](/docs/devtools/wdio/preserve-and-rerun)** - Capturez un instantané d'un test en échec, relancez-le et comparez les deux exécutions côte à côte
- **[Prise en charge multi-framework](/docs/devtools/wdio/multi-framework-support)** - Détecte automatiquement Mocha, Jest, Cucumber ou un script simple en Node.js ; pytest ou un script simple en Python
- **[Logs de la console](/docs/devtools/wdio/console-logs)** - Capturez et inspectez la sortie de la console du navigateur
- **[Logs réseau](/docs/devtools/wdio/network-logs)** - Surveillez les appels d'API et l'activité réseau
- **[Métadonnées](/docs/devtools/wdio/metadata)** - Capabilities de session, environnement et durées par session de navigateur
- **[TestLens](/docs/devtools/wdio/testlens)** - Passez de n'importe quelle commande à la ligne source qui l'a déclenchée
- **[Screencast de session](/docs/devtools/wdio/screencast)** - Enregistrement vidéo automatique des sessions de navigateur
- **[Mode trace](/docs/devtools/wdio/trace-mode)** - Capture headless produisant un `trace.zip` portable (sans fenêtre d'interface), dans les deux langages, avec découpage par test et rétention dans les deux (`traceGranularity` / `tracePolicy` en Node.js ; `--devtools-trace-granularity` / `--devtools-trace-policy` en Python). Les options `screenshot` / `video` par test et la pièce jointe Allure intégrée restent propres à Node.js ; voir [Mode trace](#trace-mode)

En Node.js, le screencast est la seule fonctionnalité dotée de ses propres options (voir [Options de configuration](#configuration-options)) :

```js
DevTools.configure({ screencast: { enabled: true, quality: 70, maxWidth: 1280, maxHeight: 720 } })
```

En Python, il ne nécessite aucune configuration : Chrome transmet les images via CDP, les autres navigateurs se replient sur une capture d'écran par commande, et l'encodage du `.webm` nécessite `ffmpeg` dans le `PATH`. En mode trace, les mêmes images deviennent le filmstrip dense de l'archive au lieu d'un `.webm`, donc rien n'est encodé et `ffmpeg` n'est pas nécessaire.

## Fonctionnement

<Tabs groupId="devtools-language">
<TabItem value="node" label="Node.js" default>

Le plugin patche les prototypes `Builder`, `WebDriver` et `WebElement` de `selenium-webdriver` au moment de l'import :

- **`Builder.build()`** - après la construction, le driver est enregistré auprès du capteur de session et le backend DevTools est démarré dans un processus enfant détaché.
- **Chaque méthode publique de `WebDriver` / `WebElement`** - enveloppée avec la capture de commande (arguments + résultat + capture d'écran + source de l'appel).
- **`WebDriver.quit()`** - un hook de nettoyage attendu vide l'encodage du screencast, le tampon WebSocket et les métadonnées finales avant l'exécution du quit d'origine.

Lorsque BiDi est disponible (Chrome ≥114), les logs de la console, les exceptions JavaScript et les événements réseau sont transmis directement via les gestionnaires BiDi de Selenium. Sinon, le plugin se replie sur un script collecteur injecté côté navigateur.

Le même collecteur injecté enregistre aussi le **flux de mutations du DOM** de la page et un instantané d'élément / d'accessibilité par commande, de sorte qu'une trace contient suffisamment d'informations pour reconstruire le DOM réel à chaque étape (correspondance par navigation) — c'est ce qui alimente le voyage dans le temps du DOM et l'onglet A11y du lecteur, plutôt qu'une relecture basée uniquement sur des captures d'écran.

</TabItem>
<TabItem value="python" label="Python">

Il n'y a pas de prototypes à patcher, l'adaptateur Python enveloppe donc une seule méthode :

- **`WebDriver.execute()`** - le point de passage unique par lequel transite chaque commande. Les méthodes des éléments y délèguent aussi (`self._parent.execute`), donc `click`, `send_keys` et `text` sont capturés par le même wrapper sans toucher aux classes d'éléments.
- **Initialisation de la session** - à la première commande réelle, le driver est enregistré, les métadonnées sont envoyées, et BiDi, le collecteur et le screencast sont armés.
- **`quit()`** - intercepté avant la destruction de la session, de sorte que le screencast est encodé et les dernières images vidées tant que le driver existe encore.

La console, les exceptions JavaScript et le réseau sont transmis via la couche BiDi de selenium (4.44+), que l'adaptateur active pour vous en injectant la capability `webSocketUrl` dans la requête `newSession`.

Le **flux de mutations du DOM** provient du même collecteur côté navigateur qu'en Node.js, enregistré au début du document via BiDi afin qu'une page s'instrumente avant l'exécution de ses propres scripts. Sur Chrome, le screencast est poussé par le navigateur via son propre websocket CDP — distinct du canal de commandes de la session, ce qui rend un véritable flux d'images sûr alors qu'une session Selenium n'est pas thread-safe.

</TabItem>
</Tabs>

## Limitations

<Tabs groupId="devtools-language">
<TabItem value="node" label="Node.js" default>

| Limitation | Détail |
|-----------|--------|
| Relance d'une étape feuille Cucumber | Le filtre `--name` de Cucumber cible des scénarios, pas des étapes Gherkin individuelles. La relance par étape du tableau de bord est désactivée sous Cucumber. |
| Réserve sur le mode headless | `headless: true` injecte `--headless=old` ; `--headless=new` produit des images CDP entièrement noires dans le screencast. |
| Viewport initial | L'iframe d'instantané du tableau de bord utilise par défaut 1280×800 jusqu'à ce que la première navigation se termine et que le collecteur côté navigateur signale le viewport réel. |

</TabItem>
<TabItem value="python" label="Python">

| Limitation | Détail |
|-----------|--------|
| Pas de capture d'écran, de vidéo ni de pièce jointe Allure par test | Les **archives de trace** par test sont prises en charge (`--devtools-trace-granularity test`), mais les options `screenshot` et `video` par test de l'adaptateur Node.js ainsi que sa pièce jointe `allure-js-commons` intégrée n'ont pas d'équivalent Python - les archives sont les artefacts. |
| La rétention tenant compte des nouvelles tentatives est dégradée | `retain-on-first-failure`, `on-first-retry`, `on-all-retries` et `retain-on-failure-and-retries` sont acceptées mais se comportent exactement comme `retain-on-failure` : rien de ce qui est transmis ne porte de numéro de tentative, donc un test relancé écrase son propre résultat précédent. Le backend journalise cette dégradation. |
| Node est requis dans tous les modes | Le backend est une application Node - il sert le collecteur de page, transporte le flux d'événements et construit l'archive de trace - donc Node.js 22.19 ou ultérieur doit être présent même en mode trace, où aucune fenêtre ne s'ouvre. L'adaptateur le trouve ou le lance pour vous. |
| Les options du navigateur vous appartiennent | Il n'y a pas d'option `headless` ; configurez Chrome via l'objet `Options` de selenium comme vous le feriez habituellement. |
| La vidéo en mode live nécessite ffmpeg | Sans `ffmpeg` dans le `PATH`, l'encodage du `.webm` est ignoré avec un avertissement plutôt qu'une erreur. Le mode trace n'encode rien - ses images vont dans le filmstrip - il n'a donc jamais besoin de ffmpeg. |

</TabItem>
</Tabs>