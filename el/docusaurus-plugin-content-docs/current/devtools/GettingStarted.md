---
id: getting-started
title: Ξεκινώντας
description: "Εγκαταστήστε το WebdriverIO DevTools και εκτελέστε το πρώτο σας τεστ σε live mode ή trace mode για αναπαραγωγή του DOM, των στιγμιότυπων οθόνης, του δικτύου και της εξόδου της κονσόλας."
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Το WebdriverIO DevTools προσφέρει στα end-to-end τεστ περιηγητή σας ένα περιβάλλον developer tools για την εκτέλεση, την αποσφαλμάτωση και την επιθεώρηση του αυτοματισμού — αναπαραγωγή του DOM, στιγμιότυπα οθόνης ανά εντολή, καταγραφή δικτύου και κονσόλας, καθώς και screencasts της συνεδρίας. Λειτουργεί σε δύο καταστάσεις. Το **Live mode** ανοίγει ένα διαδραστικό [dashboard](/docs/devtools/dashboard) σε ένα παράθυρο περιηγητή ενώ εκτελούνται τα τεστ σας, ώστε να μπορείτε να τα παρακολουθείτε και να τα επανεκτελείτε σε πραγματικό χρόνο. Το **Trace mode** παρακάμπτει το περιβάλλον χρήστη και δημιουργεί ένα φορητό, offline [trace artifact](/docs/devtools/wdio/trace-mode) (`trace.zip`) που μπορείτε να ανοίξετε αργότερα στο πρόγραμμα αναπαραγωγής `show-trace` — ιδανικό για CI. Αυτή η σελίδα σας βοηθά να ξεκινήσετε γρήγορα με το live mode· το trace mode απέχει μόλις μία επιλογή.

## Εγκατάσταση & πρώτη εκτέλεση

Επιλέξτε τον adapter σας, εγκαταστήστε τον και προσθέστε την ελάχιστη ρύθμιση που ακολουθεί. Εκτελέστε τα τεστ σας όπως συνήθως — το dashboard του DevTools ανοίγει αυτόματα σε ένα νέο παράθυρο περιηγητή.

<Tabs
defaultValue="wdio"
values={[
{label: 'WebdriverIO', value: 'wdio'},
{label: 'Selenium', value: 'selenium'},
{label: 'Nightwatch', value: 'nightwatch'},
]}
>
<TabItem value="wdio">

Εγκαταστήστε την υπηρεσία:

```sh
npm install @wdio/devtools-service --save-dev
```

Προσθέστε την στη διαμόρφωση του test runner σας:

```ts
// wdio.conf.ts
export const config = {
  services: ['devtools'],
}
```

Εκτελέστε τα τεστ WebdriverIO σας κανονικά — το περιβάλλον του DevTools ανοίγει αυτόματα και τα τεστ αρχίζουν να οπτικοποιούνται αμέσως.

</TabItem>
<TabItem value="selenium">

Λειτουργεί με Mocha, Jest, Cucumber ή ένα απλό σενάριο `node` — το plugin ανιχνεύει αυτόματα τον runner. Εγκαταστήστε το:

```bash
npm install @wdio/selenium-devtools
```

Προσθέστε ένα μόνο import και μία κλήση `configure` στην αρχή του αρχείου τεστ σας (εμφανίζεται το Mocha):

```js
// tests/example.test.js
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

  it('loads example.com', async function () {
    await driver.get('https://example.com')
    await driver.wait(until.elementLocated(By.css('h1')), 10000)
  })
})
```

Εκτελέστε το — το περιβάλλον του DevTools ανοίγει σε ένα νέο παράθυρο Chrome:

```bash
mocha --timeout 60000 tests/example.test.js
```

Δείτε τη [σελίδα του Selenium](/docs/devtools/selenium) για τις ρυθμίσεις με Jest, Cucumber και απλό Node.

</TabItem>
<TabItem value="nightwatch">

Εγκαταστήστε τον adapter:

```bash
npm install @wdio/nightwatch-devtools
```

Συνδέστε τον στη διαμόρφωση του Nightwatch μέσω των `globals` — δεν απαιτούνται αλλαγές στα αρχεία τεστ:

```js
// nightwatch.conf.cjs
const nightwatchDevtools = require('@wdio/nightwatch-devtools').default

module.exports = {
  src_folders: ['tests'],

  test_settings: {
    default: {
      desiredCapabilities: {
        browserName: 'chrome',
        // Απαιτείται για την καταγραφή αιτημάτων δικτύου
        'goog:loggingPrefs': { performance: 'ALL' }
      },
      globals: nightwatchDevtools({ port: 3000 })
    }
  }
}
```

Εκτελέστε τα τεστ σας κανονικά — το περιβάλλον του DevTools ανοίγει αυτόματα:

```bash
nightwatch
```

Δείτε τη [σελίδα του Nightwatch](/docs/devtools/nightwatch) για τη ρύθμιση με Cucumber/BDD.

</TabItem>
</Tabs>

## Επόμενα βήματα

- **[Trace Mode](/docs/devtools/wdio/trace-mode)** — ορίστε `mode: 'trace'` για να παρακάμψετε το περιβάλλον χρήστη και να δημιουργήσετε ένα φορητό, offline trace artifact για CI.
- **[Αναφορά Διαμόρφωσης](/docs/devtools/reference)** — όλες οι επιλογές και για τους τρεις adapters.
- **Frameworks** — πλήρεις οδηγοί ανά adapter: [WebdriverIO](/docs/devtools/wdio), [Selenium](/docs/devtools/selenium), [Nightwatch](/docs/devtools/nightwatch).