---
id: selenium
title: Selenium DevTools
description: "Aggiungi l'interfaccia di debug DevTools ai test Selenium WebDriver in Node.js o Python con qualsiasi test runner, e abilita la modalità trace."
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Adapter Selenium WebDriver per [WebdriverIO DevTools](https://github.com/webdriverio/devtools): porta la stessa interfaccia di debug visuale in qualsiasi test Selenium, in **Node.js** o **Python**, indipendentemente dal test runner.

Node.js funziona con **Mocha**, **Jest**, **Cucumber** o un semplice script: il plugin rileva automaticamente il runner e collega di conseguenza i confini dei test. Python funziona con **pytest** o un semplice script e, con pytest, non richiede alcuna modifica ai file di test.

Scegli il tuo linguaggio nelle schede qui sotto; la scelta viene mantenuta in tutta la pagina.

## Installazione

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

**Richiede Python 3.10+ e `selenium>=4.44`.** Entrambi sono dichiarati nei metadati del pacchetto, quindi è pip a imporli, invece di lasciarti scoprire una scheda Network vuota in fase di esecuzione. La cattura di rete si sottoscrive tramite l'API pubblica degli eventi BiDi che selenium ha rigenerato nella 4.44; la connessione privata che ha sostituito è stata rimossa nella stessa release, ed è la 4.44 a fissare il requisito minimo di Python.

</TabItem>
</Tabs>

## Configurazione iniziale

<Tabs groupId="devtools-language">
<TabItem value="node" label="Node.js" default>

Ogni blocco qui sotto è un **esempio completo, pronto da copiare e incollare**, inclusa la chiamata `DevTools.configure(...)`. Scegli il runner che usi, inserisci lo snippet nel tuo progetto ed eseguilo.

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

Eseguilo:

```bash
mocha --timeout 60000 tests/example.test.js
```

> Alternativa: evita l'import in ogni file e usa `mocha --require @wdio/selenium-devtools` per caricare il plugin una sola volta per l'intera esecuzione.

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

`jest.config.json`:

```json
{
  "testEnvironment": "node",
  "testMatch": ["<rootDir>/test/example.js"],
  "testTimeout": 60000,
  "transform": {}
}
```

Eseguilo (ESM richiede il flag sperimentale):

```bash
NODE_OPTIONS=--experimental-vm-modules jest --config jest.config.json
```

### Cucumber

La struttura suddivisa di Cucumber prevede tre piccoli file: uno per caricare il plugin, uno per World/hook e uno per le step definition.

`features/support/setup.js` - carica il plugin e configuralo una volta:

```js
import { DevTools } from '@wdio/selenium-devtools'

DevTools.configure({
  screencast: { enabled: true, quality: 70, maxWidth: 1280, maxHeight: 720 }
})
```

`features/support/world.js` - ciclo di vita del driver:

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

`cucumber.json` - collega il file di setup per **primo**, così il plugin applica le patch a Selenium prima che venga eseguito qualsiasi step:

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

Eseguilo:

```bash
cucumber-js --config cucumber.json
```

### Script Node semplice (senza test runner)

Se esegui direttamente `node tests/google.test.js`, non c'è alcun runner a cui il plugin possa agganciarsi automaticamente. Per impostazione predefinita ottieni un'unica riga "Selenium Session" nella dashboard. Per ottenere un confine di test con un nome, chiama `DevTools.startTest` / `endTest` attorno al tuo codice:

```js
// tests/google.test.js
import { DevTools } from '@wdio/selenium-devtools'
import { Builder, By, until, Key } from 'selenium-webdriver'

DevTools.configure({
  screencast: { enabled: true, quality: 70, maxWidth: 1280, maxHeight: 720 },
  headless: false
})

async function run () {
  DevTools.startTest('search Google for Selenium')   // opzionale - assegna il nome alla riga del test

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

> Usa `startTest` / `endTest` solo per script Node semplici. Con Mocha / Jest / Cucumber il plugin sa già quando ogni test inizia e finisce: chiamarli manualmente creerebbe righe duplicate.

</TabItem>
<TabItem value="python" label="Python">

### pytest

Nei file di test non va aggiunto nulla: il plugin viene rilevato automaticamente e un flag lo attiva per l'esecuzione:

```bash
pytest --devtools tests/              # dashboard live
pytest --devtools-trace tests/        # scrive invece un archivio trace (implica --devtools)
```

Oppure salva la scelta nel progetto, così nessuno deve ricordarsi il flag:

```toml title="pyproject.toml"
[tool.pytest.ini_options]
devtools = true
# devtools_trace = true                          # archivio trace invece di una dashboard
# devtools_trace_granularity = "test"            # ... un archivio per test
# devtools_trace_policy = "retain-on-failure"    # ... conservando solo ciò che è fallito
```

Un `pytest.ini` con una sezione `[pytest]` accetta le stesse chiavi. Le due impostazioni del trace sono descritte in [Quanti archivi, e quali conservare](#how-many-archives-and-which-ones-to-keep).

La cattura è sempre su attivazione esplicita: installare il pacchetto non deve mai cambiare il comportamento di una suite esistente. Ciò che cambia è solo *come* dai il tuo consenso:

| Come la attivi | Ambito |
|---|---|
| `--devtools` / `--devtools-trace` | questa esecuzione |
| `devtools` / `devtools_trace` in `[tool.pytest.ini_options]` | questo progetto |
| `DEVTOOLS_ENABLE=1` (o `DEVTOOLS_PORT=<n>`, che si collega anche a una dashboard già in esecuzione) | questa shell - per la CI |

Vince il livello più alto: CLI, poi ini, poi ambiente. `pytest -o devtools=false` disattiva un'impostazione predefinita del progetto per una singola esecuzione, motivo per cui non esiste `--no-devtools`. `DEVTOOLS_TRACE=1` sceglie la modalità trace ma **non** attiva da solo la cattura, quindi esportarla per i tuoi script non cattura mai un'esecuzione pytest che non hai richiesto.

In modalità live la dashboard si apre in una finestra del browser dedicata e **rimane aperta dopo l'esecuzione**, così puoi esaminare cosa è successo; chiudila (o premi `Ctrl-C`) per terminare. Due tipi di esecuzione restano non catturati anche se attivi la cattura: `--collect-only`, in cui non viene eseguito nulla, e un'esecuzione che non ha raccolto alcun test, altrimenti un percorso digitato male bloccherebbe il terminale su una dashboard vuota.

### Script Python semplice (senza test runner)

Due righe attorno al tuo codice Selenium esistente:

```python title="login.py"
import selenium_devtools as devtools
from selenium import webdriver

devtools.enable()                     # apre la dashboard, cattura ogni comando
# devtools.enable(trace=True)         # oppure: scrive un trace.zip e non apre alcuna finestra

driver = webdriver.Chrome()
driver.get('https://the-internet.herokuapp.com/login')
driver.find_element('id', 'username').send_keys('tomsmith')
driver.quit()

devtools.wait_for_dashboard_close()   # mantiene aperta la UI per l'ispezione (nessun effetto se non c'è una finestra aperta)
devtools.disable()
```

Se il backend non può essere avviato o raggiunto, `enable()` registra un avviso e restituisce `None`. La cattura viene saltata e i test vengono comunque eseguiti: una dashboard mancante non fa mai fallire una suite.

### Esecuzioni parallele (`pytest -n`)

**pytest-xdist funziona senza configurazione aggiuntiva.** Tutti i processi che riportano in un'unica esecuzione devono concordare su un run id, altrimenti il backend tratta ogni connessione come una nuova esecuzione e cancella ciò che la precedente ha catturato. Con xdist concordano: il plugin viene caricato anche nel **controller**, e attivare lì la cattura risolve l'id prima che xdist avvii qualsiasi worker; i worker sono processi figli, quindi lo ereditano.

Ciò che viene effettivamente interpretato come esecuzioni separate: due invocazioni `pytest` indipendenti, o un worker avviato senza l'ambiente. Esporta tu stesso `DEVTOOLS_RUN_ID` per unire tali processi in un'unica esecuzione.

</TabItem>
</Tabs>

## Opzioni di configurazione {#configuration-options}

<Tabs groupId="devtools-language">
<TabItem value="node" label="Node.js" default>

| Opzione | Tipo | Predefinito | Descrizione |
|--------|------|---------|-------------|
| `port` | `number` | `3000` | Porta del server backend DevTools. Incrementata automaticamente se già in uso. |
| `hostname` | `string` | `'localhost'` | Hostname a cui si collega il server backend. |
| `openUi` | `boolean` | `true` | Apre automaticamente la UI DevTools in una nuova finestra di Chrome. Imposta `false` per la CI. |
| `captureScreenshots` | `boolean` | `true` | Cattura uno screenshot dopo ogni comando WebDriver. |
| `headless` | `boolean` | `false` | Esegue il browser **di test** in modalità headless (inserisce `--headless=old`). La finestra della UI DevTools non è interessata. |
| `screencast` | `ScreencastOptions` | `{ enabled: false }` | Registrazione video `.webm` per sessione. Le opzioni corrispondono a quelle della pagina [WebdriverIO Screencast](/docs/devtools/wdio/screencast). |
| `rerunCommand` | `string` | auto | Template del comando per rieseguire un singolo test. `{{testName}}` viene sostituito. Se omesso, viene derivato automaticamente dagli argv del runner. |
| `mode` | `'live' \| 'trace'` | `'live'` | `live` apre la UI DevTools; `trace` la salta e scrive invece un artefatto portabile. Vedi [Trace Mode](/docs/devtools/wdio/trace-mode). Sovrascrive `openUi`. |
| `traceFormat` | `'zip' \| 'ndjson-directory'` | `'zip'` | Struttura dell'artefatto trace. Si applica solo con `mode: 'trace'`. |
| `traceGranularity` | `'session' \| 'spec' \| 'test'` | `'session'` | Un trace per sessione / file spec / test. `'test'` scrive ciascuno in `test-results/<spec>-<title>-<browser>[-retryN]/trace.zip`. Si applica solo con `mode: 'trace'`. Vedi [Trace Mode](/docs/devtools/wdio/trace-mode#trace-granularity--tracegranularity). |
| `tracePolicy` | `'on' \| 'retain-on-failure' \| 'retain-on-first-failure' \| 'on-first-retry' \| 'on-all-retries' \| 'retain-on-failure-and-retries'` | `'on'` | Quali trace conservare. Si abbina a `traceGranularity: 'test'`. Si applica solo con `mode: 'trace'`. |
| `filmstrip` | `boolean` | `true` | Registra nel trace uno screencast denso e continuo per scorrere fotogramma per fotogramma nel player. Si applica solo con `mode: 'trace'`. |
| `screenshot` | `'off' \| 'on' \| 'only-on-failure'` | `'off'` | Modalità trace + `traceGranularity: 'test'`. Screenshot per test, allegato inline ad Allure (`image/png`) tramite `allure-js-commons` quando è attivo un adapter Allure del runner. |
| `video` | `'off' \| TraceRetentionPolicy` | `'off'` | Modalità trace + `traceGranularity: 'test'`. Video screencast per test, conservato secondo la policy indicata, allegato inline ad Allure (`video/webm`) tramite `allure-js-commons` quando è attivo un adapter Allure del runner. |
| `emitArtifactsManifest` | `boolean` | auto | Scrive accanto al trace il manifest `devtools-artifacts-<sessionId>.json`, l'indice generico che reporter/CI utilizzano per individuare gli artefatti prodotti. Disattivato per impostazione predefinita; **si attiva automaticamente** quando è attivo un runtime `allure-js-commons`. Solo modalità trace. |
| `captureAssertions` | `boolean` | `true` | Cattura le asserzioni `node:assert` (sia superate sia fallite) come righe di azione nel trace. Imposta `false` per disattivarle. |

```js
DevTools.configure({
  port: 3000,
  hostname: 'localhost',
  headless: false,
  openUi: true
})
```

> **Per la CI**, imposta sia `headless: true` (nasconde il browser di test) sia `openUi: false` (non tenta di aprire la finestra della dashboard, dato che gli ambienti CI non hanno un display). Il backend continua a funzionare sulla porta configurata, così puoi comunque aprire la UI in seguito se necessario.

</TabItem>
<TabItem value="python" label="Python">

Non c'è alcun oggetto di opzioni: nel codice dei test non deve comparire nulla di specifico di devtools. Con pytest configuri l'adapter come configuri pytest; uno script passa argomenti keyword a `enable()`; tutto ciò che non ha un flag è una variabile d'ambiente.

| Flag pytest | `[tool.pytest.ini_options]` | Effetto |
|---|---|---|
| `--devtools` | `devtools = true` | Cattura questa esecuzione e apre la dashboard. |
| `--devtools-trace` | `devtools_trace = true` | Cattura questa esecuzione e scrive un archivio trace invece di aprire una dashboard. Implica `--devtools`. |
| `--devtools-trace-granularity <session\|test>` | `devtools_trace_granularity = test` | Un archivio per l'intera esecuzione (`session`, il predefinito) o uno per test. Implica `--devtools-trace`. |
| `--devtools-trace-policy <policy>` | `devtools_trace_policy = "retain-on-failure"` | Quali archivi vale la pena conservare. Implica `--devtools-trace`. Vedi [Quanti archivi, e quali conservare](#how-many-archives-and-which-ones-to-keep). |

Vince il livello più alto: CLI, poi ini, poi l'ambiente qui sotto. `pytest -o devtools=false` disattiva un'impostazione predefinita del progetto per un'esecuzione, e `pytest -o devtools_trace_policy=on` fa lo stesso per qualsiasi altra.

| Variabile | Effetto |
|---|---|
| `DEVTOOLS_ENABLE=1` | Attiva la cattura, se nessun flag o opzione ini l'ha già fatto. |
| `DEVTOOLS_PORT=<n>` | Si collega a una dashboard già in ascolto su questa porta; attiva anche la cattura. |
| `DEVTOOLS_HOST=<host>` | Host su cui è raggiungibile la dashboard (predefinito `localhost`). |
| `DEVTOOLS_TRACE=1` | Scrive un archivio trace invece di aprire una dashboard. Seleziona la modalità per uno script semplice; con pytest non attiva da sola la cattura dell'esecuzione. |
| `DEVTOOLS_TRACE_GRANULARITY=<session\|test>` | Modalità trace: un archivio per l'intera esecuzione, o uno per test. È ambientale, quindi non seleziona mai da sola la modalità trace: abbinala a `DEVTOOLS_TRACE=1`. |
| `DEVTOOLS_TRACE_POLICY=<policy>` | Modalità trace: quali archivi vale la pena conservare. È ambientale, quindi non seleziona mai da sola la modalità trace: abbinala a `DEVTOOLS_TRACE=1`. |
| `DEVTOOLS_FILMSTRIP=0` | Modalità trace: esclude il filmstrip denso dall'archivio. |
| `DEVTOOLS_A11Y=0` | Modalità trace: salta l'albero A11y e i rettangoli degli elementi per ogni azione. |
| `DEVTOOLS_OPEN=0` | Non apre la finestra della dashboard (CI). |
| `DEVTOOLS_BIDI=0` | Disattiva BiDi e, con esso, la cattura di console e rete. |
| `DEVTOOLS_RUN_ID=<id>` | Unisce più processi in un'unica esecuzione. |
| `DEVTOOLS_BACKEND_CMD=<cmd>` | Avvia il backend con un comando esplicito invece di quello risolto. |

Il backend è un'applicazione Node, quindi **Node.js 22.19 o successivo deve essere disponibile in ogni modalità**, anche in modalità trace, in cui non si apre mai una finestra della dashboard. Non si tratta solo della UI: il collector della pagina è servito dal backend, l'intero flusso di eventi viaggia sul suo WebSocket e, in modalità trace, è anche ciò che costruisce l'archivio. `enable()` verifica la presenza di Node in anticipo e indica cosa manca, invece di fallire più tardi con un timeout di avvio. L'adapter trova o avvia il backend per te: vedi [eseguire il backend in modo autonomo](/docs/devtools/dashboard#running-the-backend-on-its-own) se preferisci gestirlo tu, oppure punta `DEVTOOLS_PORT` a uno già in esecuzione, nel qual caso non serve Node in locale.

### Asserzioni

Le istruzioni `assert` superate e fallite compaiono come righe che riportano **expected** e **actual**, e i fallimenti arrivano nella scheda Errors. In Python `assert` è un'istruzione e non una chiamata, quindi, a differenza della patch di `node:assert` dell'adapter Node, non c'è nulla da avvolgere: l'esito proviene dal runner.

**Con pytest**, i valori provengono dall'assertion rewriter, quindi ogni riga riporta gli operandi reali. Catturare le asserzioni *superate* richiede `enable_assertion_pass_hook` di pytest, che il plugin attiva da sé. Un'avvertenza: pytest decide per ogni modulo, *mentre lo riscrive*, se emettere quell'hook, quindi un modulo il cui bytecode riscritto è stato messo in cache prima dell'installazione del plugin continua a riportare solo i fallimenti. L'adapter lo segnala una volta durante la raccolta e indica quale cache eliminare, che **non** è sempre la `__pycache__` accanto ai test, poiché `sys.pycache_prefix` (impostato per impostazione predefinita nel Python di sistema di macOS) invia ogni modulo riscritto a un unico albero centrale.

**In uno script semplice** non c'è alcun rewriter, quindi gli esiti provengono dagli eventi di riga dell'interprete e i valori vengono letti dal frame che sta per eseguire l'assert. Vengono risolte solo le letture che non possono eseguire il tuo codice: un letterale o una variabile locale vengono risolti, un attributo o una chiamata no, perché valutare `driver.current_url` una seconda volta emetterebbe un altro comando WebDriver.

</TabItem>
</Tabs>

## Modalità trace {#trace-mode}

Percorso di cattura headless, in **entrambi i linguaggi**: non si apre alcuna finestra della UI DevTools e l'esecuzione scrive un archivio trace portabile in una cartella `test-results/`, con la stessa struttura dell'artefatto trace di WebdriverIO. I due differiscono solo per quanto dell'artefatto puoi regolare e per chi lo costruisce.

<Tabs groupId="devtools-language">
<TabItem value="node" label="Node.js" default>

Al termine della sessione l'adapter scrive da sé `trace-<sessionId>.zip` (o una directory) in `test-results/`, accanto alla directory risolta dei test / della configurazione.

```js
DevTools.configure({
  mode: 'trace',
  traceFormat: 'ndjson-directory'  // opzionale; predefinito 'zip'
})
```

In modalità trace vengono saltati il bind della porta del backend, la finestra della UI e l'opzione `screencast`. Per il riferimento completo delle funzionalità (contenuto dell'artefatto, visualizzatore, test mobile, quando scegliere `zip` o `ndjson-directory`), consulta la [pagina Trace Mode](/docs/devtools/wdio/trace-mode).

### Artefatti per test e conservazione

Con `traceGranularity: 'test'` ogni test ottiene la propria cartella di artefatti, e `tracePolicy` decide quali conservare (ad es. `retain-on-failure`). In questa modalità puoi anche catturare uno `screenshot` (PNG) e un `video` (`.webm`) per test, e abilitare un `filmstrip` denso registrato nel trace per scorrere fotogramma per fotogramma. Quando è attivo un adapter del runner `allure-js-commons`, trace / screenshot / video per test vengono allegati inline al report Allure (e `emitArtifactsManifest` si attiva automaticamente); altrimenti vengono scritti in `test-results/` e registrati nel manifest.

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

Non c'è alcun oggetto di opzioni da impostare: un flag con pytest, un argomento keyword in uno script:

```bash
pytest --devtools-trace tests/        # implica --devtools
DEVTOOLS_TRACE=1 python3 login.py     # script semplice; equivale a devtools.enable(trace=True)
```

```python title="login.py"
devtools.enable(trace=True)           # scrive un trace.zip invece di aprire una dashboard
```

L'archivio viene salvato in `test-results/` accanto al file di test da cui proviene il primo comando catturato (la stessa directory in cui vengono già scritti i video screencast), con il nome `trace-<sessionId>.zip`, oppure con il nome di ciascun test quando richiedi [un archivio per test](#how-many-archives-and-which-ones-to-keep). Se nessun comando riporta una posizione nel tuo codice sorgente, ripiega su `test-results/` nella directory corrente.

**Non si apre alcuna finestra della dashboard.** L'output è l'artefatto, e un'esecuzione live resta bloccata sulla finestra finché non la chiudi: una finestra trasformerebbe la scrittura di un file in una sessione interattiva. Il backend si avvia comunque, perché è ciò che *costruisce* l'archivio: le trasformazioni del trace sono in TypeScript, quindi un'esecuzione Python le chiede al backend invece di includerne una seconda copia. È questo l'unico aspetto in cui differisce dalla modalità trace senza backend dell'adapter Node.js, ed è il motivo per cui [Node.js 22.19 o successivo è richiesto in ogni modalità](#configuration-options).

Oltre alle righe dei comandi, agli screenshot e ai selettori per comando, alla console e alla rete che entrambe le modalità catturano, l'archivio contiene:

| Nell'archivio | Predefinito | Disattivazione |
|---|---|---|
| DOM time-travel - il flusso di mutazioni che il player riproduce passo dopo passo | attivo | - |
| Filmstrip denso - i fotogrammi dello screencast, inclusi nel trace invece che in un `.webm` | attivo | `DEVTOOLS_FILMSTRIP=0` |
| Albero A11y e overlay degli elementi - letti accanto a ogni azione, al costo di due round trip extra per comando | attivo | `DEVTOOLS_A11Y=0` |

La modalità trace non codifica alcun `.webm`, quindi non ha bisogno di `ffmpeg`: i fotogrammi *sono* il filmstrip.

**L'esportazione viene richiesta al termine dell'esecuzione, non all'uscita del processo**: pytest la richiede in `sessionfinish` e il `disable()` di uno script esporta prima di chiudere il trasporto, così la CI ottiene l'artefatto indipendentemente dal fatto che una finestra sia mai stata coinvolta.

### Quanti archivi, e quali conservare {#how-many-archives-and-which-ones-to-keep}

Lo decidono due impostazioni, e nessuna delle due ha significato al di fuori della modalità trace.

**Granularità** - quanti archivi scrive l'esecuzione:

| `--devtools-trace-granularity` | Risultato |
|---|---|
| `session` (predefinito) | Un archivio per l'intera esecuzione. |
| `test` | Un archivio per test, ciascuno contenente solo i comandi, la console, la rete, le mutazioni DOM, gli alberi a11y e i fotogrammi dello screencast di quel test. |

Qui volutamente non esiste il valore `spec`. Lo spec di questo adapter *è* il suo file di test, quindi un terzo nome potrebbe solo significare, senza dirlo, uno dei due precedenti.

**Policy** - quali di questi archivi vengono conservati:

| `--devtools-trace-policy` | Risultato |
|---|---|
| `on` (predefinito) | Conserva tutto. |
| `retain-on-failure` | Conserva solo ciò che è fallito. |
| `retain-on-first-failure`, `on-first-retry`, `on-all-retries`, `retain-on-failure-and-retries` | Accettati, ma attualmente si comportano **esattamente come `retain-on-failure`**. |

Questi ultimi quattro non tengono ancora conto dei retry, ed è meglio dirlo chiaramente piuttosto che scoprirlo da un archivio che ti aspettavi: nulla di ciò che questo adapter invia riporta un numero di tentativo, quindi un test ritentato sovrascrive il proprio esito precedente e la domanda relativa ai retry non può proprio essere posta. Il backend registra questa degradazione invece di far finta di nulla. Scegline uno solo se vuoi `retain-on-failure` con un nome che in futuro avrà un significato più preciso.

Le due si combinano:

| Granularità | Policy | Cosa ottieni |
|---|---|---|
| `test` | `retain-on-failure` | Solo i test falliti. |
| `session` | `retain-on-failure` | L'archivio dell'intera esecuzione, se qualcosa al suo interno è fallito. |
| qualsiasi | `on` | Tutto. |

Ogni archivio conservato con granularità `test` prende il nome dal proprio test (`trace-<test>-<hash>.zip`, con l'hash ricavato dal nodeid del test, così due casi parametrizzati con lo stesso titolo non possono sovrascriversi a vicenda). Un'esecuzione che non conserva nulla non scrive nulla, ed è proprio questo lo scopo: gli archivi che ti restano sono quelli che vale la pena aprire, e un'esportazione rifiutata è la policy che funziona, non un errore.

Impostale per una singola esecuzione:

```bash
pytest --devtools-trace-granularity test --devtools-trace-policy retain-on-failure tests/
```

Oppure salvale nel progetto, così chi clona il progetto cattura allo stesso modo senza che glielo si debba dire:

```ini title="pytest.ini"
[pytest]
devtools_trace = true
devtools_trace_granularity = test
devtools_trace_policy = retain-on-failure
```

`[tool.pytest.ini_options]` in `pyproject.toml` accetta le stesse chiavi, e `pytest -o devtools_trace_policy=on tests/` ne sovrascrive una per una singola esecuzione senza modificare il file. Una versione completamente commentata, con ogni impostazione e ogni variabile d'ambiente e lo scopo di ciascuna, si trova nel repository in [`examples/selenium/python-test/trace-py-test/`](https://github.com/webdriverio/devtools/tree/main/examples/selenium/python-test/trace-py-test).

Uno script semplice passa le stesse due come argomenti keyword:

```python title="login.py"
devtools.enable(trace_granularity='test', trace_policy='retain-on-failure')
```

**Indicarne esplicitamente una seleziona la modalità trace.** Il flag CLI, l'opzione ini e l'argomento di `enable()` la implicano tutti, poiché una policy o una granularità non hanno significato in modalità live, e rispettarne una senza la modalità scarterebbe silenziosamente ciò che hai chiesto. `DEVTOOLS_TRACE_POLICY` e `DEVTOOLS_TRACE_GRANULARITY` volutamente **non** lo fanno: una variabile esportata è ambientale e potrebbe essere stata impostata per un altro script nella stessa shell, quindi passare un'esecuzione live alla modalità trace su questa base toglierebbe una dashboard che nessuno ha chiesto di perdere; abbinale a `DEVTOOLS_TRACE=1`. Un'esecuzione che finisce per ignorare un'impostazione di trace esportata registra un avviso, invece di lasciarti notare un archivio mai comparso.

</TabItem>
</Tabs>

### Visualizzare il trace

Apri qualsiasi `.zip` di trace nel player ufficiale, la stessa UI DevTools in una modalità **player** dedicata:

```bash
npx show-trace path/to/trace.zip      # in un progetto che installa l'adapter
pnpm show-trace path/to/trace.zip     # dal monorepo devtools
```

Il bin `show-trace` è incluso in `@wdio/selenium-devtools`, quindi è disponibile in qualsiasi progetto che lo installa, senza dipendenze aggiuntive. Un progetto Python non installa alcun adapter Node.js, ma lo stesso player è incluso nel backend che l'adapter scarica già per te: `npx -p @wdio/devtools-backend show-trace path/to/trace.zip`.

Poiché l'adapter Selenium cattura il **flusso di mutazioni DOM** della pagina e uno snapshot per comando di elementi / accessibilità insieme a ogni screenshot, un trace Selenium sfrutta l'intero set di funzionalità del player: DOM time-travel, la scheda A11y e l'overlay pick-locator, la scheda Transcript con Copy-for-LLM, l'annidamento Cucumber Feature → Scenario → Step e la timeline scorrevole. Un trace Python contiene lo stesso flusso di mutazioni e lo snapshot per azione (lì la lettura di elementi / a11y è solo in modalità trace, ed è attiva per impostazione predefinita); l'annidamento Gherkin è l'unica voce che non ha un equivalente in pytest.

Il trace utilizza uno schema NDJSON portabile, quindi lo stesso `.zip` (o directory) si apre anche in altri visualizzatori di trace compatibili. Consulta la pagina **[Trace Player](/docs/devtools/trace-player)** per la guida completa.

## API pubblica

<Tabs groupId="devtools-language">
<TabItem value="node" label="Node.js" default>

```js
import { DevTools } from '@wdio/selenium-devtools'

DevTools.configure(opts)             // imposta le opzioni di runtime (vedi sopra)
DevTools.startTest(name, meta?)      // segna un confine di test con nome (solo script Node semplici)
DevTools.endTest('passed'|'failed'|'skipped'|'pending')
```

Con Mocha / Jest / Cucumber il plugin si aggancia automaticamente al ciclo di vita del runner, quindi non è necessario chiamare `startTest` / `endTest` manualmente: farlo creerebbe righe duplicate.

</TabItem>
<TabItem value="python" label="Python">

```python
import selenium_devtools as devtools

devtools.enable()                     # si connette e strumenta; idempotente
devtools.disable()                    # smonta tutto; sicuro da chiamare due volte
devtools.wait_for_dashboard_close()   # blocca finché la finestra non viene chiusa
devtools.get_capturer()               # il SessionCapturer attivo, o None
devtools.dashboard_url()              # l'URL su cui è servita la dashboard
```

`enable()` accetta opzionalmente `host` e `port`, oltre ad argomenti keyword:

```python
devtools.enable(trace=True)                            # scrive un trace.zip; non apre alcuna finestra
devtools.enable(trace=True, filmstrip=False)           # ... senza il filmstrip denso
devtools.enable(trace=True, a11y=False)                # ... senza la lettura elementi / a11y per azione
devtools.enable(trace_granularity='test')              # ... un archivio per test (implica trace=True)
devtools.enable(trace_policy='retain-on-failure')      # ... conserva solo ciò che è fallito (implica trace=True)
```

`filmstrip` e `a11y` si applicano solo alla modalità trace, e ciascuna è attiva per impostazione predefinita (`DEVTOOLS_FILMSTRIP` / `DEVTOOLS_A11Y` impostano la stessa cosa dall'ambiente). `trace` ripiega su `DEVTOOLS_TRACE`. `trace_granularity` e `trace_policy` ripiegano su `DEVTOOLS_TRACE_GRANULARITY` / `DEVTOOLS_TRACE_POLICY`, e passarne una attiva da sola la modalità trace: vedi [Quanti archivi, e quali conservare](#how-many-archives-and-which-ones-to-keep). Un valore al di fuori dell'insieme accettato genera un avviso e ripiega sul predefinito, invece di essere scoperto più tardi come un file mancante.

Con pytest il plugin gestisce tutto questo tramite `--devtools` / `--devtools-trace` (o l'opzione ini corrispondente, o `DEVTOOLS_ENABLE=1`), e i confini dei test provengono dagli hook di pytest stesso: non esiste un equivalente di `startTest` / `endTest` da chiamare.

</TabItem>
</Tabs>

## Esempi

<Tabs groupId="devtools-language">
<TabItem value="node" label="Node.js" default>

Gli esempi funzionanti si trovano nella directory `examples/` di primo livello del repository. Compila il workspace una volta (`pnpm install && pnpm build`), poi esegui dalla root del repository. `pnpm demo:selenium` esegue l'esempio predefinito (Cucumber); le varianti per runner sono:

| Directory | Runner | Comando |
|-----------|--------|---------|
| [`examples/selenium/mocha-test/`](https://github.com/webdriverio/devtools/tree/main/examples/selenium/mocha-test) | Mocha | `pnpm --filter @wdio/selenium-devtools example:mocha` |
| [`examples/selenium/jest-test/`](https://github.com/webdriverio/devtools/tree/main/examples/selenium/jest-test) | Jest | `pnpm --filter @wdio/selenium-devtools example:jest` |
| [`examples/selenium/cucumber-test/`](https://github.com/webdriverio/devtools/tree/main/examples/selenium/cucumber-test) | Cucumber | `pnpm demo:selenium` |

</TabItem>
<TabItem value="python" label="Python">

Gli esempi Python si trovano in [`examples/selenium/python-test/`](https://github.com/webdriverio/devtools/tree/main/examples/selenium/python-test). Installa l'adapter e compila il workspace una volta (`pnpm install && pnpm build`, così che il backend esista), poi esegui dalla root del repository:

| Esempio | Cosa mostra | Comando |
|---|---|---|
| `web_form.py` | La configurazione in tre righe per uno script semplice | `pnpm demo:python` |
| `login.py` | Uno script più lungo: navigazione, compilazione di form, asserzioni | `pnpm demo:python:login` |
| `trace-py-test/` | pytest con una classe e un test a livello di modulo, più un `pytest.ini` che salva modalità trace, granularità e conservazione; ogni impostazione è commentata con ciò che fa | `pnpm demo:python:pytest` |

</TabItem>
</Tabs>

## Funzionalità

L'adapter Selenium offre la stessa esperienza della UI DevTools di WebdriverIO, in entrambi i linguaggi. Ogni funzionalità qui sotto viene catturata automaticamente senza configurazione specifica: basta il `DevTools.configure({})` di base in Node.js, o `pytest --devtools` in Python. Console e rete vengono trasmesse tramite gli handler BiDi di Selenium, con un collector iniettato come fallback in Node.js. I link portano al riferimento completo di ciascuna funzionalità.

- **[Riesecuzione e visualizzazione interattiva dei test](/docs/devtools/wdio/interactive-test-rerunning)** - Anteprime live del browser, screenshot per comando e riesecuzione di test/suite con un clic
- **[Preserve & Rerun (Compare)](/docs/devtools/wdio/preserve-and-rerun)** - Salva uno snapshot di un test fallito, rieseguilo e confronta le due esecuzioni affiancate
- **[Supporto multi-framework](/docs/devtools/wdio/multi-framework-support)** - Rileva automaticamente Mocha, Jest, Cucumber o uno script semplice in Node.js; pytest o uno script semplice in Python
- **[Console Logs](/docs/devtools/wdio/console-logs)** - Cattura e ispeziona l'output della console del browser
- **[Network Logs](/docs/devtools/wdio/network-logs)** - Monitora le chiamate API e l'attività di rete
- **[Metadata](/docs/devtools/wdio/metadata)** - Capabilities della sessione, ambiente e tempi per ogni sessione del browser
- **[TestLens](/docs/devtools/wdio/testlens)** - Passa da qualsiasi comando alla riga di codice sorgente che lo ha attivato
- **[Session Screencast](/docs/devtools/wdio/screencast)** - Registrazione video automatica delle sessioni del browser
- **[Trace Mode](/docs/devtools/wdio/trace-mode)** - Cattura headless che produce un `trace.zip` portabile (nessuna finestra della UI), in entrambi i linguaggi, con suddivisione per test e conservazione in entrambi (`traceGranularity` / `tracePolicy` in Node.js; `--devtools-trace-granularity` / `--devtools-trace-policy` in Python). `screenshot` / `video` per test e l'allegato inline ad Allure restano solo per Node.js; vedi [Modalità trace](#trace-mode)

In Node.js, lo screencast è l'unica funzionalità con opzioni proprie (vedi [Opzioni di configurazione](#configuration-options)):

```js
DevTools.configure({ screencast: { enabled: true, quality: 70, maxWidth: 1280, maxHeight: 720 } })
```

In Python non richiede configurazione: Chrome trasmette i fotogrammi tramite CDP, gli altri browser ripiegano su uno screenshot per comando, e la codifica del `.webm` richiede `ffmpeg` nel `PATH`. In modalità trace gli stessi fotogrammi diventano il filmstrip denso dell'archivio invece di un `.webm`, quindi non viene codificato nulla e `ffmpeg` non è necessario.

## Come funziona

<Tabs groupId="devtools-language">
<TabItem value="node" label="Node.js" default>

Il plugin applica patch ai prototipi `Builder`, `WebDriver` e `WebElement` di `selenium-webdriver` al momento dell'import:

- **`Builder.build()`** - dopo la costruzione, il driver viene registrato presso il session capturer e il backend DevTools viene avviato in un processo figlio separato.
- **Ogni metodo pubblico di `WebDriver` / `WebElement`** - avvolto con la cattura del comando (argomenti + risultato + screenshot + sorgente della chiamata).
- **`WebDriver.quit()`** - un hook di pulizia atteso svuota la codifica dello screencast, il buffer WebSocket e i metadati finali prima che venga eseguito il quit originale.

Quando BiDi è disponibile (Chrome ≥114), i log della console, le eccezioni JavaScript e gli eventi di rete vengono trasmessi direttamente tramite gli handler BiDi di Selenium. Altrimenti il plugin ripiega su uno script collector iniettato lato browser.

Lo stesso collector iniettato registra anche il **flusso di mutazioni DOM** della pagina e uno snapshot per comando di elementi / accessibilità, così un trace contiene abbastanza informazioni per ricostruire il DOM live a ogni passo (mappatura per navigazione): è ciò che alimenta il DOM time-travel e la scheda A11y del player, invece di una riproduzione basata solo su screenshot.

</TabItem>
<TabItem value="python" label="Python">

Non ci sono prototipi a cui applicare patch, quindi l'adapter Python avvolge invece un singolo metodo:

- **`WebDriver.execute()`** - l'unico punto di passaggio di ogni comando. Anche i metodi degli elementi delegano a esso (`self._parent.execute`), quindi `click`, `send_keys` e `text` vengono catturati dallo stesso wrapper senza toccare le classi degli elementi.
- **Configurazione della sessione** - al primo comando reale il driver viene registrato, i metadati vengono inviati e BiDi, il collector e lo screencast vengono attivati.
- **`quit()`** - intercettato prima che la sessione venga smontata, così lo screencast viene codificato e i fotogrammi finali svuotati mentre il driver esiste ancora.

Console, eccezioni JavaScript e rete vengono trasmesse tramite il livello BiDi di selenium (4.44+), che l'adapter abilita per te iniettando la capability `webSocketUrl` nella richiesta `newSession`.

Il **flusso di mutazioni DOM** proviene dallo stesso collector lato browser di Node.js, registrato all'inizio del documento tramite BiDi, così una pagina si strumenta prima che venga eseguito qualsiasi suo script. Su Chrome lo screencast viene inviato dal browser tramite un proprio websocket CDP, separato dal canale dei comandi della sessione: è ciò che rende sicuro un vero flusso di fotogrammi, dato che una sessione Selenium non è thread-safe.

</TabItem>
</Tabs>

## Limitazioni

<Tabs groupId="devtools-language">
<TabItem value="node" label="Node.js" default>

| Limitazione | Dettaglio |
|-----------|--------|
| Riesecuzione dei singoli step Cucumber | Il filtro `--name` di Cucumber agisce sugli scenari, non sui singoli step Gherkin. La riesecuzione per step della dashboard è disattivata con Cucumber. |
| Avvertenza sulla modalità headless | `headless: true` inserisce `--headless=old`; `--headless=new` produce fotogrammi CDP completamente neri nello screencast. |
| Viewport iniziale | L'iframe dello snapshot della dashboard usa 1280×800 come fallback finché non si completa la prima navigazione e il collector lato browser non riporta il viewport reale. |

</TabItem>
<TabItem value="python" label="Python">

| Limitazione | Dettaglio |
|-----------|--------|
| Nessuno screenshot, video o allegato Allure per test | Gli **archivi trace** per test sono supportati (`--devtools-trace-granularity test`), ma le opzioni `screenshot` e `video` per test dell'adapter Node.js e il suo allegato inline `allure-js-commons` non hanno un equivalente Python: gli artefatti sono gli archivi. |
| La conservazione basata sui retry si degrada | `retain-on-first-failure`, `on-first-retry`, `on-all-retries` e `retain-on-failure-and-retries` sono accettati ma si comportano esattamente come `retain-on-failure`: nulla di ciò che viene trasmesso riporta un numero di tentativo, quindi un test ritentato sovrascrive il proprio esito precedente. Il backend registra la degradazione. |
| Node è richiesto in ogni modalità | Il backend è un'applicazione Node (serve il collector della pagina, trasporta il flusso di eventi e costruisce l'archivio trace), quindi Node.js 22.19 o successivo deve essere presente anche in modalità trace, in cui non si apre alcuna finestra. L'adapter lo trova o lo avvia per te. |
| Le opzioni del browser sono tue | Non esiste un'opzione `headless`; configura Chrome tramite l'oggetto `Options` di selenium come faresti normalmente. |
| Il video in modalità live richiede ffmpeg | Senza `ffmpeg` nel `PATH` la codifica del `.webm` viene saltata con un avviso anziché con un errore. La modalità trace non ne codifica nessuno (i suoi fotogrammi finiscono nel filmstrip), quindi non ha mai bisogno di ffmpeg. |

</TabItem>
</Tabs>