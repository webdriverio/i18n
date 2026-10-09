---
id: selenium
title: Selenium DevTools
description: "Προσθέστε το περιβάλλον αποσφαλμάτωσης DevTools στα τεστ Selenium WebDriver σε Node.js ή Python με οποιονδήποτε test runner και ενεργοποιήστε το trace mode."
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Adapter του Selenium WebDriver για το [WebdriverIO DevTools](https://github.com/webdriverio/devtools). Φέρνει το ίδιο οπτικό περιβάλλον αποσφαλμάτωσης σε οποιοδήποτε τεστ Selenium, σε **Node.js** ή **Python**, ανεξάρτητα από τον test runner.

Στο Node.js λειτουργεί με **Mocha**, **Jest**, **Cucumber** ή ένα απλό script. Το plugin εντοπίζει αυτόματα τον runner και συνδέει ανάλογα τα όρια των τεστ. Στην Python λειτουργεί με **pytest** ή ένα απλό script. Με το pytest δεν χρειάζεται καμία αλλαγή στα αρχεία των τεστ σας.

Επιλέξτε τη γλώσσα σας στις καρτέλες παρακάτω. Η επιλογή σας διατηρείται σε όλη τη σελίδα.

## Εγκατάσταση

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

**Απαιτεί Python 3.10+ και `selenium>=4.44`.** Και τα δύο δηλώνονται στα metadata του πακέτου, οπότε το pip τα επιβάλλει. Έτσι δεν θα ανακαλύψετε μια άδεια καρτέλα Network κατά την εκτέλεση. Η καταγραφή δικτύου εγγράφεται μέσω του δημόσιου BiDi event API που το selenium αναδημιούργησε στην έκδοση 4.44. Η ιδιωτική σύνδεση που αντικατέστησε αφαιρέθηκε στην ίδια έκδοση, και γι' αυτό η 4.44 καθορίζει την ελάχιστη απαίτηση για την Python.

</TabItem>
</Tabs>

## Ρύθμιση

<Tabs groupId="devtools-language">
<TabItem value="node" label="Node.js" default>

Κάθε μπλοκ παρακάτω είναι ένα **πλήρες παράδειγμα, έτοιμο για αντιγραφή και επικόλληση**, που περιλαμβάνει την κλήση `DevTools.configure(...)`. Επιλέξτε τον runner που χρησιμοποιείτε, προσθέστε το απόσπασμα στο project σας και εκτελέστε το.

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

Εκτελέστε το:

```bash
mocha --timeout 60000 tests/example.test.js
```

> Εναλλακτικά: παραλείψτε το import σε κάθε αρχείο και χρησιμοποιήστε `mocha --require @wdio/selenium-devtools` για να φορτώσετε το plugin μία φορά για ολόκληρη την εκτέλεση.

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

Εκτελέστε το (το ESM χρειάζεται το πειραματικό flag):

```bash
NODE_OPTIONS=--experimental-vm-modules jest --config jest.config.json
```

### Cucumber

Η διαχωρισμένη δομή του Cucumber σημαίνει τρία μικρά αρχεία: ένα για τη φόρτωση του plugin, ένα για το World/hooks και ένα για τους ορισμούς των βημάτων.

`features/support/setup.js` - φόρτωση του plugin και ρύθμιση μία φορά:

```js
import { DevTools } from '@wdio/selenium-devtools'

DevTools.configure({
  screencast: { enabled: true, quality: 70, maxWidth: 1280, maxHeight: 720 }
})
```

`features/support/world.js` - κύκλος ζωής του driver:

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

`cucumber.json` - συνδέστε το αρχείο ρύθμισης **πρώτο**, ώστε το plugin να τροποποιήσει το Selenium πριν εκτελεστεί οποιοδήποτε βήμα:

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

Εκτελέστε το:

```bash
cucumber-js --config cucumber.json
```

### Απλό Node script (χωρίς test runner)

Αν εκτελείτε απευθείας `node tests/google.test.js`, δεν υπάρχει runner στον οποίο να συνδεθεί αυτόματα το plugin. Από προεπιλογή εμφανίζεται μία μόνο γραμμή "Selenium Session" στο dashboard. Για να ορίσετε ένα όριο τεστ με όνομα, καλέστε `DevTools.startTest` / `endTest` γύρω από τον κώδικά σας:

```js
// tests/google.test.js
import { DevTools } from '@wdio/selenium-devtools'
import { Builder, By, until, Key } from 'selenium-webdriver'

DevTools.configure({
  screencast: { enabled: true, quality: 70, maxWidth: 1280, maxHeight: 720 },
  headless: false
})

async function run () {
  DevTools.startTest('search Google for Selenium')   // προαιρετικό - δίνει όνομα στη γραμμή του τεστ

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

> Χρησιμοποιήστε τα `startTest` / `endTest` μόνο σε απλά Node scripts. Με Mocha / Jest / Cucumber το plugin γνωρίζει ήδη πότε ξεκινά και τελειώνει κάθε τεστ. Αν τα καλέσετε χειροκίνητα, θα δημιουργηθούν διπλές γραμμές.

</TabItem>
<TabItem value="python" label="Python">

### pytest

Δεν χρειάζεται τίποτα στα αρχεία των τεστ σας. Το plugin εντοπίζεται αυτόματα και ένα flag το ενεργοποιεί για την εκτέλεση:

```bash
pytest --devtools tests/              # ζωντανό dashboard
pytest --devtools-trace tests/        # εγγραφή αρχείου trace αντί αυτού (συνεπάγεται --devtools)
```

Ή αποθηκεύστε την επιλογή στο project, ώστε κανείς να μη χρειάζεται να θυμάται το flag:

```toml title="pyproject.toml"
[tool.pytest.ini_options]
devtools = true
# devtools_trace = true                          # αρχείο trace αντί για dashboard
# devtools_trace_granularity = "test"            # ... ένα αρχείο ανά τεστ
# devtools_trace_policy = "retain-on-failure"    # ... διατηρώντας μόνο όσα απέτυχαν
```

Ένα `pytest.ini` με ενότητα `[pytest]` δέχεται τα ίδια κλειδιά. Οι δύο ρυθμίσεις trace περιγράφονται στην ενότητα [Πόσα αρχεία, και ποια να διατηρηθούν](#how-many-archives-and-which-ones-to-keep).

Η καταγραφή ενεργοποιείται πάντα ρητά, γιατί η εγκατάσταση του πακέτου δεν πρέπει ποτέ να αλλάζει τη συμπεριφορά μιας υπάρχουσας σουίτας. Το μόνο που διαφέρει είναι *ο τρόπος* με τον οποίο τη ζητάτε:

| Πώς την ενεργοποιείτε | Εμβέλεια |
|---|---|
| `--devtools` / `--devtools-trace` | αυτή η εκτέλεση |
| `devtools` / `devtools_trace` στο `[tool.pytest.ini_options]` | αυτό το project |
| `DEVTOOLS_ENABLE=1` (ή `DEVTOOLS_PORT=<n>`, που επίσης συνδέεται σε dashboard που ήδη εκτελείται) | αυτό το shell - για CI |

Υπερισχύει η υψηλότερη προτεραιότητα: πρώτα το CLI, μετά το ini και τέλος το περιβάλλον. Το `pytest -o devtools=false` απενεργοποιεί μια προεπιλογή του project για μία εκτέλεση, γι' αυτό δεν υπάρχει `--no-devtools`. Το `DEVTOOLS_TRACE=1` επιλέγει το trace mode αλλά **δεν** ενεργοποιεί από μόνο του την καταγραφή. Έτσι, αν το κάνετε export για τα δικά σας scripts, δεν θα καταγραφεί ποτέ μια εκτέλεση του pytest που δεν ζητήσατε.

Στο live mode το dashboard ανοίγει σε ξεχωριστό παράθυρο browser και **παραμένει ανοιχτό μετά την εκτέλεση**, ώστε να εξετάσετε τι συνέβη. Κλείστε το (ή πατήστε `Ctrl-C`) για να ολοκληρωθεί. Δύο είδη εκτελέσεων δεν καταγράφονται ακόμη κι αν την έχετε ενεργοποιήσει. Το πρώτο είναι το `--collect-only`, όπου δεν εκτελείται τίποτα. Το δεύτερο είναι μια εκτέλεση που δεν συνέλεξε κανένα τεστ, αφού διαφορετικά ένα λάθος path θα κρατούσε το τερματικό σας σε ένα άδειο dashboard.

### Απλό Python script (χωρίς test runner)

Δύο γραμμές γύρω από τον υπάρχοντα κώδικα Selenium:

```python title="login.py"
import selenium_devtools as devtools
from selenium import webdriver

devtools.enable()                     # άνοιγμα του dashboard, καταγραφή κάθε εντολής
# devtools.enable(trace=True)         # ή: εγγραφή ενός trace.zip χωρίς άνοιγμα παραθύρου

driver = webdriver.Chrome()
driver.get('https://the-internet.herokuapp.com/login')
driver.find_element('id', 'username').send_keys('tomsmith')
driver.quit()

devtools.wait_for_dashboard_close()   # διατήρηση του UI για επιθεώρηση (δεν κάνει τίποτα αν δεν υπάρχει ανοιχτό παράθυρο)
devtools.disable()
```

Αν το backend δεν μπορεί να εκκινηθεί ή να βρεθεί, το `enable()` καταγράφει μια προειδοποίηση και επιστρέφει `None`. Η καταγραφή παραλείπεται και τα τεστ σας εκτελούνται κανονικά. Ένα dashboard που λείπει δεν προκαλεί ποτέ αποτυχία της σουίτας.

### Παράλληλες εκτελέσεις (`pytest -n`)

**Το pytest-xdist λειτουργεί χωρίς επιπλέον ρύθμιση.** Όλες οι διεργασίες που αναφέρουν στην ίδια εκτέλεση πρέπει να συμφωνούν σε ένα run id. Διαφορετικά, το backend αντιμετωπίζει κάθε σύνδεση ως νέα εκτέλεση και διαγράφει ό,τι κατέγραψε η προηγούμενη. Με το xdist συμφωνούν, γιατί το plugin φορτώνεται και στον **controller**. Η ενεργοποίηση της καταγραφής εκεί καθορίζει το id πριν το xdist δημιουργήσει workers. Οι workers είναι θυγατρικές διεργασίες, οπότε το κληρονομούν.

Ως ξεχωριστές εκτελέσεις εμφανίζονται πράγματι δύο ανεξάρτητες κλήσεις του `pytest` ή ένας worker που ξεκίνησε χωρίς το περιβάλλον. Για να ενώσετε τέτοιες διεργασίες σε μία εκτέλεση, κάντε εσείς export το `DEVTOOLS_RUN_ID`.

</TabItem>
</Tabs>

## Επιλογές ρύθμισης {#configuration-options}

<Tabs groupId="devtools-language">
<TabItem value="node" label="Node.js" default>

| Επιλογή | Τύπος | Προεπιλογή | Περιγραφή |
|--------|------|---------|-------------|
| `port` | `number` | `3000` | Θύρα για τον backend server του DevTools. Αυξάνεται αυτόματα αν χρησιμοποιείται ήδη. |
| `hostname` | `string` | `'localhost'` | Hostname στο οποίο δεσμεύεται ο backend server. |
| `openUi` | `boolean` | `true` | Αυτόματο άνοιγμα του DevTools UI σε νέο παράθυρο Chrome. Ορίστε `false` για CI. |
| `captureScreenshots` | `boolean` | `true` | Λήψη screenshot μετά από κάθε εντολή WebDriver. |
| `headless` | `boolean` | `false` | Εκτέλεση του browser του **τεστ** σε headless λειτουργία (προσθέτει `--headless=old`). Το παράθυρο του DevTools UI δεν επηρεάζεται. |
| `screencast` | `ScreencastOptions` | `{ enabled: false }` | Εγγραφή βίντεο `.webm` ανά session. Οι επιλογές αντιστοιχούν σε αυτές της σελίδας [WebdriverIO Screencast](/docs/devtools/wdio/screencast). |
| `rerunCommand` | `string` | αυτόματο | Πρότυπο εντολής για επανεκτέλεση ανά τεστ. Το `{{testName}}` αντικαθίσταται. Αν παραλειφθεί, προκύπτει αυτόματα από τα argv του runner. |
| `mode` | `'live' \| 'trace'` | `'live'` | Το `live` ανοίγει το DevTools UI. Το `trace` το παραλείπει και γράφει αντί αυτού ένα φορητό artifact. Δείτε [Trace Mode](/docs/devtools/wdio/trace-mode). Υπερισχύει του `openUi`. |
| `traceFormat` | `'zip' \| 'ndjson-directory'` | `'zip'` | Μορφή του trace artifact. Ισχύει μόνο όταν `mode: 'trace'`. |
| `traceGranularity` | `'session' \| 'spec' \| 'test'` | `'session'` | Ένα trace ανά session / αρχείο spec / τεστ. Με το `'test'` το καθένα γράφεται στο `test-results/<spec>-<title>-<browser>[-retryN]/trace.zip`. Ισχύει μόνο όταν `mode: 'trace'`. Δείτε [Trace Mode](/docs/devtools/wdio/trace-mode#trace-granularity--tracegranularity). |
| `tracePolicy` | `'on' \| 'retain-on-failure' \| 'retain-on-first-failure' \| 'on-first-retry' \| 'on-all-retries' \| 'retain-on-failure-and-retries'` | `'on'` | Ποια traces διατηρούνται. Συνδυάζεται με `traceGranularity: 'test'`. Ισχύει μόνο όταν `mode: 'trace'`. |
| `filmstrip` | `boolean` | `true` | Εγγραφή ενός πυκνού, συνεχούς screencast μέσα στο trace για περιήγηση καρέ προς καρέ στον player. Ισχύει μόνο όταν `mode: 'trace'`. |
| `screenshot` | `'off' \| 'on' \| 'only-on-failure'` | `'off'` | Trace mode + `traceGranularity: 'test'`. Screenshot ανά τεστ, που επισυνάπτεται inline στο Allure (`image/png`) μέσω του `allure-js-commons` όταν είναι ενεργός ένας Allure runner adapter. |
| `video` | `'off' \| TraceRetentionPolicy` | `'off'` | Trace mode + `traceGranularity: 'test'`. Βίντεο screencast ανά τεστ, που διατηρείται σύμφωνα με την πολιτική που ορίζεται και επισυνάπτεται inline στο Allure (`video/webm`) μέσω του `allure-js-commons` όταν είναι ενεργός ένας Allure runner adapter. |
| `emitArtifactsManifest` | `boolean` | αυτόματο | Εγγραφή του manifest `devtools-artifacts-<sessionId>.json` δίπλα στο trace. Είναι το γενικό ευρετήριο που χρησιμοποιούν οι reporters/το CI για να εντοπίσουν τα artifacts που παρήχθησαν. Απενεργοποιημένο από προεπιλογή. **Ενεργοποιείται αυτόματα** όταν είναι ενεργό ένα runtime του `allure-js-commons`. Μόνο σε trace mode. |
| `captureAssertions` | `boolean` | `true` | Καταγραφή των assertions του `node:assert` (επιτυχημένων και αποτυχημένων) ως γραμμές ενεργειών στο trace. Ορίστε `false` για να το απενεργοποιήσετε. |

```js
DevTools.configure({
  port: 3000,
  hostname: 'localhost',
  headless: false,
  openUi: true
})
```

> **Για CI**, ορίστε και το `headless: true` (απόκρυψη του browser του τεστ) και το `openUi: false` (να μη γίνεται προσπάθεια ανοίγματος του παραθύρου του dashboard, αφού τα περιβάλλοντα CI δεν έχουν οθόνη). Το backend συνεχίζει να εκτελείται στη ρυθμισμένη θύρα, ώστε να μπορείτε να ανοίξετε το UI αργότερα αν χρειαστεί.

</TabItem>
<TabItem value="python" label="Python">

Δεν υπάρχει αντικείμενο επιλογών, οπότε τίποτα ειδικό για το devtools δεν χρειάζεται να εμφανίζεται στον κώδικα των τεστ σας. Με το pytest ρυθμίζετε τον adapter όπως ρυθμίζετε το pytest. Ένα script περνά keyword arguments στο `enable()`. Οτιδήποτε δεν έχει flag είναι μεταβλητή περιβάλλοντος.

| Flag του pytest | `[tool.pytest.ini_options]` | Αποτέλεσμα |
|---|---|---|
| `--devtools` | `devtools = true` | Καταγραφή αυτής της εκτέλεσης και άνοιγμα του dashboard. |
| `--devtools-trace` | `devtools_trace = true` | Καταγραφή αυτής της εκτέλεσης και εγγραφή αρχείου trace αντί για άνοιγμα dashboard. Συνεπάγεται `--devtools`. |
| `--devtools-trace-granularity <session\|test>` | `devtools_trace_granularity = test` | Ένα αρχείο για ολόκληρη την εκτέλεση (`session`, η προεπιλογή) ή ένα ανά τεστ. Συνεπάγεται `--devtools-trace`. |
| `--devtools-trace-policy <policy>` | `devtools_trace_policy = "retain-on-failure"` | Ποια αρχεία αξίζει να διατηρηθούν. Συνεπάγεται `--devtools-trace`. Δείτε [Πόσα αρχεία, και ποια να διατηρηθούν](#how-many-archives-and-which-ones-to-keep). |

Υπερισχύει η υψηλότερη προτεραιότητα: πρώτα το CLI, μετά το ini και τέλος το περιβάλλον παρακάτω. Το `pytest -o devtools=false` απενεργοποιεί μια προεπιλογή του project για μία εκτέλεση. Το `pytest -o devtools_trace_policy=on` κάνει το ίδιο για οποιαδήποτε από τις υπόλοιπες.

| Μεταβλητή | Αποτέλεσμα |
|---|---|
| `DEVTOOLS_ENABLE=1` | Ενεργοποίηση της καταγραφής, όταν δεν την έχει ήδη ενεργοποιήσει κάποιο flag ή επιλογή ini. |
| `DEVTOOLS_PORT=<n>` | Σύνδεση σε dashboard που ήδη ακούει σε αυτή τη θύρα. Ενεργοποιεί επίσης την καταγραφή. |
| `DEVTOOLS_HOST=<host>` | Host στον οποίο βρίσκεται το dashboard (προεπιλογή `localhost`). |
| `DEVTOOLS_TRACE=1` | Εγγραφή αρχείου trace αντί για άνοιγμα dashboard. Επιλέγει τη λειτουργία για ένα απλό script. Με το pytest δεν ενεργοποιεί από μόνο του την καταγραφή της εκτέλεσης. |
| `DEVTOOLS_TRACE_GRANULARITY=<session\|test>` | Trace mode: ένα αρχείο για ολόκληρη την εκτέλεση ή ένα ανά τεστ. Είναι ρύθμιση περιβάλλοντος, οπότε δεν επιλέγει ποτέ από μόνη της το trace mode. Συνδυάστε τη με `DEVTOOLS_TRACE=1`. |
| `DEVTOOLS_TRACE_POLICY=<policy>` | Trace mode: ποια αρχεία αξίζει να διατηρηθούν. Είναι ρύθμιση περιβάλλοντος, οπότε δεν επιλέγει ποτέ από μόνη της το trace mode. Συνδυάστε τη με `DEVTOOLS_TRACE=1`. |
| `DEVTOOLS_FILMSTRIP=0` | Trace mode: εξαίρεση του πυκνού filmstrip από το αρχείο. |
| `DEVTOOLS_A11Y=0` | Trace mode: παράλειψη του δέντρου A11y και των ορθογωνίων των στοιχείων ανά ενέργεια. |
| `DEVTOOLS_OPEN=0` | Να μην ανοίγει το παράθυρο του dashboard (CI). |
| `DEVTOOLS_BIDI=0` | Απενεργοποίηση του BiDi και, μαζί του, της καταγραφής console και δικτύου. |
| `DEVTOOLS_RUN_ID=<id>` | Ένωση πολλών διεργασιών σε μία εκτέλεση. |
| `DEVTOOLS_BACKEND_CMD=<cmd>` | Εκκίνηση του backend με ρητή εντολή αντί για αυτήν που εντοπίζεται αυτόματα. |

Το backend είναι εφαρμογή Node, οπότε **πρέπει να είναι διαθέσιμο το Node.js 22.19 ή νεότερο σε κάθε λειτουργία**, ακόμη και στο trace mode, όπου δεν ανοίγει ποτέ παράθυρο dashboard. Δεν πρόκειται μόνο για το UI. Το backend σερβίρει τον page collector και ολόκληρη η ροή συμβάντων περνά από το WebSocket του. Στο trace mode είναι επίσης αυτό που δημιουργεί το αρχείο. Το `enable()` ελέγχει εκ των προτέρων για το Node και κατονομάζει ό,τι λείπει, αντί να αποτύχει αργότερα με timeout κατά την εκκίνηση. Ο adapter εντοπίζει ή εκκινεί το backend για εσάς. Αν προτιμάτε να το διαχειρίζεστε μόνοι σας, δείτε την ενότητα [εκτέλεση του backend αυτόνομα](/docs/devtools/dashboard#running-the-backend-on-its-own). Εναλλακτικά, ορίστε το `DEVTOOLS_PORT` σε ένα backend που ήδη εκτελείτε, οπότε δεν χρειάζεται τοπικό Node.

### Assertions

Οι επιτυχημένες και αποτυχημένες εντολές `assert` εμφανίζονται ως γραμμές με τις τιμές **expected** και **actual**, και οι αποτυχίες εμφανίζονται στην καρτέλα Errors. Στην Python το `assert` είναι εντολή και όχι κλήση. Έτσι, σε αντίθεση με την τροποποίηση του `node:assert` στον adapter του Node, δεν υπάρχει κάτι να περιτυλιχθεί και το αποτέλεσμα προέρχεται από τον runner.

**Με το pytest**, οι τιμές προέρχονται από τον assertion rewriter, οπότε κάθε γραμμή περιέχει τους πραγματικούς τελεστέους. Η καταγραφή *επιτυχημένων* assertions χρειάζεται το `enable_assertion_pass_hook` του pytest, το οποίο το plugin ενεργοποιεί μόνο του. Υπάρχει μία επιφύλαξη: το pytest αποφασίζει ανά module, *τη στιγμή που το ξαναγράφει*, αν θα εκπέμψει αυτό το hook. Επομένως, ένα module του οποίου το ξαναγραμμένο bytecode αποθηκεύτηκε στην cache πριν εγκατασταθεί το plugin συνεχίζει να αναφέρει μόνο αποτυχίες. Ο adapter το επισημαίνει μία φορά κατά τη συλλογή και κατονομάζει την cache που πρέπει να διαγραφεί. Αυτή **δεν** είναι πάντα το `__pycache__` δίπλα στα τεστ σας, γιατί το `sys.pycache_prefix` (που ορίζεται από προεπιλογή στην Python του συστήματος στο macOS) στέλνει κάθε ξαναγραμμένο module σε ένα κεντρικό δέντρο.

**Σε ένα απλό script** δεν υπάρχει rewriter. Τα αποτελέσματα προέρχονται από τα line events του interpreter και οι τιμές διαβάζονται από το frame που πρόκειται να εκτελέσει το assert. Επιλύονται μόνο αναγνώσεις που δεν μπορούν να εκτελέσουν τον κώδικά σας. Ένα literal ή μια τοπική μεταβλητή επιλύονται, ενώ ένα attribute ή μια κλήση όχι, γιατί αν το `driver.current_url` αξιολογούνταν δεύτερη φορά θα έστελνε άλλη μια εντολή WebDriver.

</TabItem>
</Tabs>

## Trace mode {#trace-mode}

Πρόκειται για μια λειτουργία καταγραφής χωρίς UI, διαθέσιμη και στις **δύο γλώσσες**. Δεν ανοίγει παράθυρο του DevTools UI και η εκτέλεση γράφει ένα φορητό αρχείο trace σε φάκελο `test-results/`, με την ίδια μορφή με το trace artifact του WebdriverIO. Οι δύο γλώσσες διαφέρουν μόνο στο πόσο μπορείτε να προσαρμόσετε το artifact και στο ποιος το δημιουργεί.

<Tabs groupId="devtools-language">
<TabItem value="node" label="Node.js" default>

Στο τέλος του session ο adapter γράφει μόνος του το `trace-<sessionId>.zip` (ή έναν κατάλογο) στο `test-results/`, δίπλα στον κατάλογο του τεστ / της ρύθμισης που εντοπίστηκε.

```js
DevTools.configure({
  mode: 'trace',
  traceFormat: 'ndjson-directory'  // προαιρετικό· προεπιλογή 'zip'
})
```

Στο trace mode παραλείπονται η δέσμευση θύρας του backend, το παράθυρο του UI και η επιλογή `screencast`. Για την πλήρη τεκμηρίωση των δυνατοτήτων (περιεχόμενα artifact, viewer, mobile testing, πότε να επιλέξετε `zip` ή `ndjson-directory`), δείτε τη [σελίδα Trace Mode](/docs/devtools/wdio/trace-mode).

### Artifacts ανά τεστ και διατήρηση

Με `traceGranularity: 'test'` κάθε τεστ αποκτά τον δικό του φάκελο artifacts, και το `tracePolicy` αποφασίζει ποια διατηρούνται (π.χ. `retain-on-failure`). Σε αυτή τη λειτουργία μπορείτε επίσης να καταγράψετε `screenshot` (PNG) και `video` (`.webm`) ανά τεστ, καθώς και να ενεργοποιήσετε ένα πυκνό `filmstrip` που εγγράφεται στο trace για περιήγηση καρέ προς καρέ. Όταν είναι ενεργός ένας runner adapter του `allure-js-commons`, τα traces / screenshots / βίντεο ανά τεστ επισυνάπτονται inline στην αναφορά Allure (και το `emitArtifactsManifest` ενεργοποιείται αυτόματα). Διαφορετικά γράφονται στο `test-results/` και καταγράφονται στο manifest.

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

Δεν υπάρχει αντικείμενο επιλογών για ρύθμιση. Χρησιμοποιείτε ένα flag με το pytest και ένα keyword argument σε script:

```bash
pytest --devtools-trace tests/        # συνεπάγεται --devtools
DEVTOOLS_TRACE=1 python3 login.py     # απλό script· ίδιο με devtools.enable(trace=True)
```

```python title="login.py"
devtools.enable(trace=True)           # εγγραφή ενός trace.zip αντί για άνοιγμα dashboard
```

Το αρχείο αποθηκεύεται στο `test-results/` δίπλα στο αρχείο τεστ από το οποίο προήλθε η πρώτη καταγεγραμμένη εντολή. Είναι ο ίδιος κατάλογος όπου γράφονται ήδη τα βίντεο screencast. Ονομάζεται `trace-<sessionId>.zip`, ή παίρνει το όνομα κάθε τεστ όταν ζητάτε [ένα αρχείο ανά τεστ](#how-many-archives-and-which-ones-to-keep). Όταν καμία εντολή δεν περιέχει τοποθεσία από τον δικό σας κώδικα, χρησιμοποιείται το `test-results/` στον τρέχοντα κατάλογο.

**Δεν ανοίγει παράθυρο dashboard.** Το artifact είναι η έξοδος, και μια live εκτέλεση περιμένει μέχρι να κλείσετε το παράθυρο. Ένα παράθυρο θα μετέτρεπε την εγγραφή ενός αρχείου σε διαδραστική συνεδρία. Το backend εξακολουθεί να ξεκινά, γιατί αυτό *δημιουργεί* το αρχείο. Οι μετασχηματισμοί του trace είναι γραμμένοι σε TypeScript, οπότε μια εκτέλεση Python τους ζητά από το backend αντί να περιέχει ένα δεύτερο αντίγραφό τους. Αυτή είναι η μόνη διαφορά από το trace mode του adapter του Node.js, που λειτουργεί χωρίς backend, και ο λόγος για τον οποίο [απαιτείται Node.js 22.19 ή νεότερο σε κάθε λειτουργία](#configuration-options).

Και οι δύο λειτουργίες καταγράφουν τις γραμμές εντολών, τα screenshots και τους selectors ανά εντολή, το console και το δίκτυο. Πέρα από αυτά, το αρχείο περιέχει:

| Στο αρχείο | Προεπιλογή | Απενεργοποίηση |
|---|---|---|
| DOM time-travel - η ροή μεταλλάξεων που αναπαράγει ο player βήμα προς βήμα | ενεργό | - |
| Πυκνό filmstrip - τα καρέ του screencast, που αποθηκεύονται στο trace αντί για `.webm` | ενεργό | `DEVTOOLS_FILMSTRIP=0` |
| Δέντρο A11y και overlay στοιχείων - διαβάζονται δίπλα σε κάθε ενέργεια, με δύο επιπλέον round trips ανά εντολή | ενεργό | `DEVTOOLS_A11Y=0` |

Το trace mode δεν κωδικοποιεί `.webm`, οπότε δεν χρειάζεται `ffmpeg`. Τα καρέ *αποτελούν* το filmstrip.

**Η εξαγωγή ζητείται όταν ολοκληρώνεται η εκτέλεση, όχι όταν τερματίζεται η διεργασία.** Το pytest τη ζητά στο `sessionfinish` και το `disable()` ενός script κάνει την εξαγωγή πριν κλείσει το transport. Έτσι το CI λαμβάνει το artifact είτε άνοιξε ποτέ παράθυρο είτε όχι.

### Πόσα αρχεία, και ποια να διατηρηθούν {#how-many-archives-and-which-ones-to-keep}

Αυτό καθορίζεται από δύο ρυθμίσεις, καμία από τις οποίες δεν έχει νόημα εκτός trace mode.

**Granularity** - πόσα αρχεία γράφει η εκτέλεση:

| `--devtools-trace-granularity` | Αποτέλεσμα |
|---|---|
| `session` (προεπιλογή) | Ένα αρχείο για ολόκληρη την εκτέλεση. |
| `test` | Ένα αρχείο ανά τεστ. Το καθένα περιέχει μόνο τις εντολές, το console, το δίκτυο, τις μεταλλάξεις DOM, τα δέντρα a11y και τα καρέ screencast του συγκεκριμένου τεστ. |

Σκόπιμα δεν υπάρχει τιμή `spec` εδώ. Για αυτόν τον adapter, το spec *είναι* το αρχείο τεστ, οπότε ένα τρίτο όνομα θα σήμαινε σιωπηρά μία από τις δύο παραπάνω τιμές.

**Policy** - ποια από αυτά τα αρχεία διατηρούνται:

| `--devtools-trace-policy` | Αποτέλεσμα |
|---|---|
| `on` (προεπιλογή) | Διατήρηση όλων. |
| `retain-on-failure` | Διατήρηση μόνο όσων απέτυχαν. |
| `retain-on-first-failure`, `on-first-retry`, `on-all-retries`, `retain-on-failure-and-retries` | Γίνονται δεκτές, αλλά προς το παρόν συμπεριφέρονται **ακριβώς όπως το `retain-on-failure`**. |

Οι τέσσερις τελευταίες δεν λαμβάνουν ακόμη υπόψη τις επαναλήψεις. Αξίζει να ειπωθεί καθαρά, ώστε να μην το ανακαλύψετε από ένα αρχείο που περιμένατε να βρείτε. Τίποτα από όσα στέλνει αυτός ο adapter δεν περιέχει αριθμό προσπάθειας. Έτσι, ένα τεστ που επαναλαμβάνεται αντικαθιστά το προηγούμενο αποτέλεσμά του και δεν είναι δυνατό να ληφθούν υπόψη οι επαναλήψεις. Το backend καταγράφει αυτόν τον περιορισμό αντί να τον αποκρύπτει. Επιλέξτε μία από αυτές μόνο αν θέλετε το `retain-on-failure` με ένα όνομα που θα αποκτήσει περισσότερο νόημα αργότερα.

Οι δύο ρυθμίσεις συνδυάζονται:

| Granularity | Policy | Τι λαμβάνετε |
|---|---|---|
| `test` | `retain-on-failure` | Μόνο τα τεστ που απέτυχαν. |
| `session` | `retain-on-failure` | Το αρχείο ολόκληρης της εκτέλεσης, αν απέτυχε κάτι σε αυτήν. |
| οποιοδήποτε | `on` | Τα πάντα. |

Κάθε αρχείο που διατηρείται με granularity `test` παίρνει το όνομα του τεστ του (`trace-<test>-<hash>.zip`). Το hash προέρχεται από το nodeid του τεστ, ώστε δύο παραμετροποιημένες περιπτώσεις με τον ίδιο τίτλο να μην αντικαθιστούν η μία την άλλη. Μια εκτέλεση που δεν διατηρεί τίποτα δεν γράφει απολύτως τίποτα, και αυτός είναι ο σκοπός. Τα αρχεία που απομένουν είναι αυτά που αξίζει να ανοίξετε, και μια εξαγωγή που απορρίφθηκε σημαίνει ότι η πολιτική λειτουργεί, όχι ότι υπήρξε αποτυχία.

Ορίστε τις για μία εκτέλεση:

```bash
pytest --devtools-trace-granularity test --devtools-trace-policy retain-on-failure tests/
```

Ή αποθηκεύστε τις στο project, ώστε όποιος κλωνοποιεί το project να καταγράφει με τον ίδιο τρόπο χωρίς να χρειάζεται οδηγίες:

```ini title="pytest.ini"
[pytest]
devtools_trace = true
devtools_trace_granularity = test
devtools_trace_policy = retain-on-failure
```

Το `[tool.pytest.ini_options]` στο `pyproject.toml` δέχεται τα ίδια κλειδιά. Το `pytest -o devtools_trace_policy=on tests/` παρακάμπτει ένα από αυτά για μία εκτέλεση χωρίς να επεξεργαστείτε το αρχείο. Μια πλήρως σχολιασμένη έκδοση, με κάθε ρύθμιση και κάθε μεταβλητή περιβάλλοντος και τον σκοπό της καθεμιάς, υπάρχει στο repo στο [`examples/selenium/python-test/trace-py-test/`](https://github.com/webdriverio/devtools/tree/main/examples/selenium/python-test/trace-py-test).

Ένα απλό script περνά τις ίδιες δύο ως keyword arguments:

```python title="login.py"
devtools.enable(trace_granularity='test', trace_policy='retain-on-failure')
```

**Αν ορίσετε ρητά οποιαδήποτε από τις δύο, επιλέγεται το trace mode.** Το flag του CLI, η επιλογή ini και το όρισμα του `enable()` το συνεπάγονται όλα, γιατί μια πολιτική ή ένα granularity δεν έχει νόημα στο live mode. Αν εφαρμοζόταν χωρίς τη λειτουργία, αυτό που ζητήσατε θα χανόταν σιωπηρά. Τα `DEVTOOLS_TRACE_POLICY` και `DEVTOOLS_TRACE_GRANULARITY` σκόπιμα **δεν** το κάνουν. Μια μεταβλητή που έχει γίνει export ισχύει για όλο το περιβάλλον και μπορεί να έχει οριστεί για άλλο script στο ίδιο shell. Αν μια live εκτέλεση άλλαζε σε trace mode εξαιτίας της, θα χανόταν ένα dashboard που κανείς δεν ζήτησε να χαθεί. Γι' αυτό συνδυάστε τις με `DEVTOOLS_TRACE=1`. Μια εκτέλεση που τελικά αγνοεί μια ρύθμιση trace από το περιβάλλον καταγράφει μια προειδοποίηση, ώστε να μην αναρωτιέστε γιατί δεν εμφανίστηκε ποτέ ένα αρχείο.

</TabItem>
</Tabs>

### Προβολή του trace

Ανοίξτε οποιοδήποτε trace `.zip` στον επίσημο player, που είναι το ίδιο DevTools UI σε ειδική λειτουργία **player**:

```bash
npx show-trace path/to/trace.zip      # σε project που εγκαθιστά τον adapter
pnpm show-trace path/to/trace.zip     # από το monorepo του devtools
```

Το εκτελέσιμο `show-trace` περιλαμβάνεται στο `@wdio/selenium-devtools`, οπότε είναι διαθέσιμο σε κάθε project που το εγκαθιστά, χωρίς επιπλέον εξάρτηση. Ένα project Python δεν εγκαθιστά τον adapter του Node.js, αλλά ο ίδιος player περιλαμβάνεται στο backend που ο adapter ήδη κατεβάζει για εσάς: `npx -p @wdio/devtools-backend show-trace path/to/trace.zip`.

Ο adapter του Selenium καταγράφει τη **ροή μεταλλάξεων DOM** της σελίδας και ένα snapshot στοιχείων / προσβασιμότητας ανά εντολή μαζί με κάθε screenshot. Γι' αυτό ένα trace του Selenium αξιοποιεί όλες τις δυνατότητες του player: DOM time-travel, την καρτέλα A11y και το overlay επιλογής locator, την καρτέλα Transcript με Copy-for-LLM, την ιεράρχηση Cucumber Feature → Scenario → Step και το timeline με δυνατότητα περιήγησης. Ένα trace της Python περιέχει την ίδια ροή μεταλλάξεων και snapshot ανά ενέργεια (εκεί η ανάγνωση στοιχείων / a11y γίνεται μόνο σε trace mode και είναι ενεργή από προεπιλογή). Η ιεράρχηση Gherkin είναι η μόνη δυνατότητα που δεν έχει αντίστοιχη στο pytest.

Το trace χρησιμοποιεί ένα φορητό σχήμα NDJSON, οπότε το ίδιο `.zip` (ή κατάλογος) ανοίγει και σε άλλους συμβατούς trace viewers. Δείτε τη σελίδα **[Trace Player](/docs/devtools/trace-player)** για τον πλήρη οδηγό.

## Δημόσιο API

<Tabs groupId="devtools-language">
<TabItem value="node" label="Node.js" default>

```js
import { DevTools } from '@wdio/selenium-devtools'

DevTools.configure(opts)             // ορισμός επιλογών runtime (δείτε παραπάνω)
DevTools.startTest(name, meta?)      // σήμανση ενός ονομασμένου ορίου τεστ (μόνο σε απλά Node scripts)
DevTools.endTest('passed'|'failed'|'skipped'|'pending')
```

Με Mocha / Jest / Cucumber το plugin συνδέεται αυτόματα στον κύκλο ζωής του runner, οπότε δεν χρειάζεστε τα `startTest` / `endTest`. Αν τα καλέσετε, θα δημιουργηθούν διπλές γραμμές.

</TabItem>
<TabItem value="python" label="Python">

```python
import selenium_devtools as devtools

devtools.enable()                     # σύνδεση και instrumentation· idempotent
devtools.disable()                    # τερματισμός· ασφαλές να κληθεί δύο φορές
devtools.wait_for_dashboard_close()   # αναμονή μέχρι να κλείσει το παράθυρο
devtools.get_capturer()               # ο ενεργός SessionCapturer, ή None
devtools.dashboard_url()              # το URL στο οποίο σερβίρεται το dashboard
```

Το `enable()` δέχεται προαιρετικά `host` και `port`, καθώς και keyword arguments:

```python
devtools.enable(trace=True)                            # εγγραφή ενός trace.zip· χωρίς άνοιγμα παραθύρου
devtools.enable(trace=True, filmstrip=False)           # ... χωρίς το πυκνό filmstrip
devtools.enable(trace=True, a11y=False)                # ... χωρίς την ανάγνωση στοιχείων / a11y ανά ενέργεια
devtools.enable(trace_granularity='test')              # ... ένα αρχείο ανά τεστ (συνεπάγεται trace=True)
devtools.enable(trace_policy='retain-on-failure')      # ... διατήρηση μόνο όσων απέτυχαν (συνεπάγεται trace=True)
```

Τα `filmstrip` και `a11y` ισχύουν μόνο σε trace mode και είναι ενεργά από προεπιλογή (τα `DEVTOOLS_FILMSTRIP` / `DEVTOOLS_A11Y` ορίζουν το ίδιο από το περιβάλλον). Αν δεν οριστεί, το `trace` παίρνει την τιμή του `DEVTOOLS_TRACE`. Τα `trace_granularity` και `trace_policy` παίρνουν αντίστοιχα τις τιμές των `DEVTOOLS_TRACE_GRANULARITY` / `DEVTOOLS_TRACE_POLICY`. Αν περάσετε οποιοδήποτε από τα δύο, ενεργοποιείται από μόνο του το trace mode. Δείτε [Πόσα αρχεία, και ποια να διατηρηθούν](#how-many-archives-and-which-ones-to-keep). Μια τιμή εκτός του αποδεκτού συνόλου εμφανίζει προειδοποίηση και επιστρέφει στην προεπιλογή, ώστε να μην το ανακαλύψετε αργότερα από ένα αρχείο που λείπει.

Με το pytest το plugin τα διαχειρίζεται όλα αυτά από τα `--devtools` / `--devtools-trace` (ή την αντίστοιχη επιλογή ini, ή το `DEVTOOLS_ENABLE=1`). Τα όρια των τεστ προέρχονται από τα hooks του ίδιου του pytest, οπότε δεν υπάρχει αντίστοιχο `startTest` / `endTest` για να καλέσετε.

</TabItem>
</Tabs>

## Παραδείγματα

<Tabs groupId="devtools-language">
<TabItem value="node" label="Node.js" default>

Λειτουργικά παραδείγματα υπάρχουν στον κατάλογο `examples/` στη ρίζα του repo. Κάντε build το workspace μία φορά (`pnpm install && pnpm build`) και εκτελέστε από τη ρίζα του repo. Το `pnpm demo:selenium` εκτελεί το προεπιλεγμένο παράδειγμα (Cucumber). Οι παραλλαγές ανά runner είναι:

| Κατάλογος | Runner | Εντολή |
|-----------|--------|---------|
| [`examples/selenium/mocha-test/`](https://github.com/webdriverio/devtools/tree/main/examples/selenium/mocha-test) | Mocha | `pnpm --filter @wdio/selenium-devtools example:mocha` |
| [`examples/selenium/jest-test/`](https://github.com/webdriverio/devtools/tree/main/examples/selenium/jest-test) | Jest | `pnpm --filter @wdio/selenium-devtools example:jest` |
| [`examples/selenium/cucumber-test/`](https://github.com/webdriverio/devtools/tree/main/examples/selenium/cucumber-test) | Cucumber | `pnpm demo:selenium` |

</TabItem>
<TabItem value="python" label="Python">

Τα παραδείγματα Python βρίσκονται στο [`examples/selenium/python-test/`](https://github.com/webdriverio/devtools/tree/main/examples/selenium/python-test). Εγκαταστήστε τον adapter και κάντε build το workspace μία φορά (`pnpm install && pnpm build`, ώστε να υπάρχει το backend). Στη συνέχεια εκτελέστε από τη ρίζα του repo:

| Παράδειγμα | Τι δείχνει | Εντολή |
|---|---|---|
| `web_form.py` | Τη ρύθμιση τριών γραμμών για απλό script | `pnpm demo:python` |
| `login.py` | Ένα μεγαλύτερο script: πλοήγηση, συμπλήρωση φόρμας, assertions | `pnpm demo:python:login` |
| `trace-py-test/` | pytest με μια κλάση και ένα τεστ σε επίπεδο module, μαζί με ένα `pytest.ini` που αποθηκεύει το trace mode, το granularity και τη διατήρηση. Κάθε ρύθμιση σε αυτό έχει σχόλιο για το τι κάνει | `pnpm demo:python:pytest` |

</TabItem>
</Tabs>

## Δυνατότητες

Ο adapter του Selenium προσφέρει την ίδια εμπειρία DevTools UI με το WebdriverIO, και στις δύο γλώσσες. Κάθε δυνατότητα παρακάτω καταγράφεται αυτόματα, χωρίς ρύθμιση ανά δυνατότητα: αρκεί το βασικό `DevTools.configure({})` στο Node.js ή το `pytest --devtools` στην Python. Το console και το δίκτυο μεταδίδονται μέσω των BiDi handlers του Selenium, με εναλλακτική λύση ενός injected collector στο Node.js. Οι σύνδεσμοι οδηγούν στην πλήρη τεκμηρίωση κάθε δυνατότητας.

- **[Interactive Test Rerunning & Visualization](/docs/devtools/wdio/interactive-test-rerunning)** - Ζωντανή προεπισκόπηση browser, screenshots ανά εντολή και επανεκτέλεση τεστ/σουίτας με ένα κλικ
- **[Preserve & Rerun (Compare)](/docs/devtools/wdio/preserve-and-rerun)** - Λήψη snapshot ενός αποτυχημένου τεστ, επανεκτέλεσή του και σύγκριση των δύο εκτελέσεων δίπλα-δίπλα
- **[Multi-Framework Support](/docs/devtools/wdio/multi-framework-support)** - Αυτόματος εντοπισμός Mocha, Jest, Cucumber ή απλού script στο Node.js, και pytest ή απλού script στην Python
- **[Console Logs](/docs/devtools/wdio/console-logs)** - Καταγραφή και επιθεώρηση της εξόδου του console του browser
- **[Network Logs](/docs/devtools/wdio/network-logs)** - Παρακολούθηση κλήσεων API και δραστηριότητας δικτύου
- **[Metadata](/docs/devtools/wdio/metadata)** - Capabilities του session, περιβάλλον και χρονισμοί ανά session browser
- **[TestLens](/docs/devtools/wdio/testlens)** - Μετάβαση από οποιαδήποτε εντολή στη γραμμή κώδικα που την προκάλεσε
- **[Session Screencast](/docs/devtools/wdio/screencast)** - Αυτόματη εγγραφή βίντεο των sessions του browser
- **[Trace Mode](/docs/devtools/wdio/trace-mode)** - Καταγραφή χωρίς UI που παράγει ένα φορητό `trace.zip` (χωρίς παράθυρο UI), και στις δύο γλώσσες. Υποστηρίζεται διαχωρισμός και διατήρηση ανά τεστ και στις δύο (`traceGranularity` / `tracePolicy` στο Node.js, `--devtools-trace-granularity` / `--devtools-trace-policy` στην Python). Τα `screenshot` / `video` ανά τεστ και η inline επισύναψη στο Allure παραμένουν μόνο στο Node.js. Δείτε [Trace mode](#trace-mode)

Στο Node.js, το screencast είναι η μόνη δυνατότητα με δικές της επιλογές (δείτε [Επιλογές ρύθμισης](#configuration-options)):

```js
DevTools.configure({ screencast: { enabled: true, quality: 70, maxWidth: 1280, maxHeight: 720 } })
```

Στην Python δεν χρειάζεται ρύθμιση. Το Chrome μεταδίδει καρέ μέσω CDP, ενώ οι άλλοι browsers χρησιμοποιούν ένα screenshot ανά εντολή. Η κωδικοποίηση του `.webm` χρειάζεται το `ffmpeg` στο `PATH`. Στο trace mode τα ίδια καρέ γίνονται το πυκνό filmstrip του αρχείου αντί για `.webm`, οπότε δεν κωδικοποιείται τίποτα και δεν χρειάζεται `ffmpeg`.

## Πώς λειτουργεί

<Tabs groupId="devtools-language">
<TabItem value="node" label="Node.js" default>

Το plugin τροποποιεί τα prototypes `Builder`, `WebDriver` και `WebElement` του `selenium-webdriver` κατά το import:

- **`Builder.build()`** - μετά τη δημιουργία, ο driver καταχωρείται στον session capturer και το backend του DevTools ξεκινά σε μια αποσυνδεδεμένη θυγατρική διεργασία.
- **Κάθε δημόσια μέθοδος `WebDriver` / `WebElement`** - περιτυλίγεται με καταγραφή εντολών (ορίσματα + αποτέλεσμα + screenshot + πηγή κλήσης).
- **`WebDriver.quit()`** - ένα hook καθαρισμού, που αναμένεται να ολοκληρωθεί, ολοκληρώνει την κωδικοποίηση του screencast, αδειάζει τον buffer του WebSocket και στέλνει τα τελικά metadata πριν εκτελεστεί το αρχικό quit.

Όταν το BiDi είναι διαθέσιμο (Chrome ≥114), τα console logs, οι εξαιρέσεις JavaScript και τα συμβάντα δικτύου μεταδίδονται απευθείας μέσω των BiDi handlers του Selenium. Διαφορετικά, το plugin χρησιμοποιεί ένα collector script που εισάγεται στον browser.

Ο ίδιος injected collector καταγράφει επίσης τη **ροή μεταλλάξεων DOM** της σελίδας και ένα snapshot στοιχείων / προσβασιμότητας ανά εντολή. Έτσι ένα trace περιέχει αρκετά δεδομένα για να ανασυνθέσει το ζωντανό DOM σε κάθε βήμα (με αντιστοίχιση ανά πλοήγηση). Αυτό τροφοδοτεί το DOM time-travel και την καρτέλα A11y του player, αντί για μια αναπαραγωγή που βασίζεται μόνο σε screenshots.

</TabItem>
<TabItem value="python" label="Python">

Δεν υπάρχουν prototypes για τροποποίηση, οπότε ο adapter της Python περιτυλίγει μία μόνο μέθοδο:

- **`WebDriver.execute()`** - το μοναδικό σημείο από το οποίο περνά κάθε εντολή. Και οι μέθοδοι των στοιχείων καταλήγουν σε αυτό (`self._parent.execute`), οπότε τα `click`, `send_keys` και `text` καταγράφονται από τον ίδιο wrapper χωρίς να αγγίζονται οι κλάσεις των στοιχείων.
- **Ρύθμιση του session** - στην πρώτη πραγματική εντολή ο driver καταχωρείται, στέλνονται τα metadata και ενεργοποιούνται το BiDi, ο collector και το screencast.
- **`quit()`** - παρεμβαίνει πριν τερματιστεί το session, ώστε το screencast να κωδικοποιηθεί και τα τελικά καρέ να σταλούν όσο ο driver υπάρχει ακόμη.

Το console, οι εξαιρέσεις JavaScript και το δίκτυο μεταδίδονται μέσω του BiDi layer του selenium (4.44+). Ο adapter το ενεργοποιεί για εσάς, προσθέτοντας το capability `webSocketUrl` στο αίτημα `newSession`.

Η **ροή μεταλλάξεων DOM** προέρχεται από τον ίδιο collector στην πλευρά του browser με το Node.js. Καταχωρείται στην αρχή του εγγράφου μέσω BiDi, ώστε η σελίδα να κάνει instrumentation στον εαυτό της πριν εκτελεστεί οποιοδήποτε δικό της script. Στο Chrome το screencast στέλνεται από τον browser μέσω ενός δικού του CDP websocket, ξεχωριστού από το κανάλι εντολών του session. Αυτό κάνει ασφαλή μια πραγματική ροή καρέ, δεδομένου ότι ένα session του Selenium δεν είναι thread-safe.

</TabItem>
</Tabs>

## Περιορισμοί

<Tabs groupId="devtools-language">
<TabItem value="node" label="Node.js" default>

| Περιορισμός | Λεπτομέρεια |
|-----------|--------|
| Επανεκτέλεση μεμονωμένων βημάτων Cucumber | Το φίλτρο `--name` του Cucumber στοχεύει σενάρια, όχι μεμονωμένα βήματα Gherkin. Η επανεκτέλεση ανά βήμα του dashboard είναι απενεργοποιημένη με το Cucumber. |
| Επιφύλαξη για τη λειτουργία headless | Το `headless: true` προσθέτει `--headless=old`. Το `--headless=new` παράγει εντελώς μαύρα καρέ CDP στο screencast. |
| Αρχικό viewport | Το iframe του snapshot στο dashboard χρησιμοποιεί 1280×800 μέχρι να ολοκληρωθεί η πρώτη πλοήγηση και ο collector στην πλευρά του browser να αναφέρει το πραγματικό viewport. |

</TabItem>
<TabItem value="python" label="Python">

| Περιορισμός | Λεπτομέρεια |
|-----------|--------|
| Χωρίς screenshot, βίντεο ή επισύναψη Allure ανά τεστ | Τα **αρχεία trace** ανά τεστ υποστηρίζονται (`--devtools-trace-granularity test`). Οι επιλογές `screenshot` και `video` ανά τεστ του adapter του Node.js και η inline επισύναψη μέσω `allure-js-commons` δεν έχουν αντίστοιχο στην Python. Τα αρχεία trace είναι τα artifacts. |
| Η διατήρηση με βάση τις επαναλήψεις υποβαθμίζεται | Τα `retain-on-first-failure`, `on-first-retry`, `on-all-retries` και `retain-on-failure-and-retries` γίνονται δεκτά αλλά συμπεριφέρονται ακριβώς όπως το `retain-on-failure`. Τίποτα από όσα στέλνονται δεν περιέχει αριθμό προσπάθειας, οπότε ένα τεστ που επαναλαμβάνεται αντικαθιστά το προηγούμενο αποτέλεσμά του. Το backend καταγράφει αυτόν τον περιορισμό. |
| Το Node απαιτείται σε κάθε λειτουργία | Το backend είναι εφαρμογή Node. Σερβίρει τον page collector, μεταφέρει τη ροή συμβάντων και δημιουργεί το αρχείο trace. Γι' αυτό πρέπει να υπάρχει Node.js 22.19 ή νεότερο ακόμη και στο trace mode, όπου δεν ανοίγει παράθυρο. Ο adapter το εντοπίζει ή το εκκινεί για εσάς. |
| Οι επιλογές του browser είναι δική σας ευθύνη | Δεν υπάρχει επιλογή `headless`. Ρυθμίστε το Chrome μέσω του αντικειμένου `Options` του selenium, όπως θα κάνατε κανονικά. |
| Το βίντεο σε live mode χρειάζεται ffmpeg | Χωρίς `ffmpeg` στο `PATH`, η κωδικοποίηση `.webm` παραλείπεται με προειδοποίηση αντί για σφάλμα. Το trace mode δεν κωδικοποιεί βίντεο, αφού τα καρέ του πηγαίνουν στο filmstrip, οπότε δεν χρειάζεται ποτέ ffmpeg. |

</TabItem>
</Tabs>

---

Πρόσθεσα ρητά IDs (`{#configuration-options}`, `{#trace-mode}`, `{#how-many-archives-and-which-ones-to-keep}`) στις τρεις επικεφαλίδες που στοχεύουν εσωτερικοί σύνδεσμοι. Χωρίς αυτά, οι μεταφρασμένες επικεφαλίδες θα δημιουργούσαν νέα anchors και οι σύνδεσμοι θα έσπαγαν. Αν προτιμάτε να μείνουν εντελώς χωρίς αλλαγή, αφαιρέστε τα IDs, αλλά τότε οι σύνδεσμοι αυτοί δεν θα λειτουργούν.