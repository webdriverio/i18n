---
id: web-extensions
title: Δοκιμή Επεκτάσεων Web
description: "Φορτώστε μια επέκταση web στο Chrome ή στο Firefox για μια συνεδρία WebdriverIO, συμπεριλαμβανομένης της εγκατάστασης και απεγκατάστασης μέσω BiDi κατά τη διάρκεια της συνεδρίας."
---

Το WebdriverIO είναι το ιδανικό εργαλείο για την αυτοματοποίηση ενός προγράμματος περιήγησης. Οι Επεκτάσεις Web αποτελούν μέρος του προγράμματος περιήγησης και μπορούν να αυτοματοποιηθούν με τον ίδιο τρόπο. Όποτε η επέκταση web σας χρησιμοποιεί content scripts για να εκτελεί JavaScript σε ιστοσελίδες ή προσφέρει ένα αναδυόμενο παράθυρο (popup modal), μπορείτε να εκτελέσετε μια δοκιμή e2e γι' αυτό χρησιμοποιώντας το WebdriverIO.

Φορτώστε την επέκταση πριν από την πρώτη πλοήγηση με τη ρύθμιση capabilities που ακολουθεί. Για να εγκαταστήσετε και να αφαιρέσετε μια επέκταση κατά τη διάρκεια μιας συνεδρίας [WebDriver BiDi](https://w3c.github.io/webdriver-bidi/#module-webExtension), χρησιμοποιήστε τις [`installExtension`](/docs/api/browser/installExtension) και [`uninstallExtension`](/docs/api/browser/uninstallExtension).

## Φόρτωση μιας Επέκτασης Web στο Πρόγραμμα Περιήγησης

Ως πρώτο βήμα πρέπει να φορτώσουμε την υπό δοκιμή επέκταση στο πρόγραμμα περιήγησης ως μέρος της συνεδρίας μας. Αυτό λειτουργεί διαφορετικά για το Chrome και το Firefox.

:::info

Αυτή η τεκμηρίωση παραλείπει τις επεκτάσεις web του Safari, καθώς η υποστήριξή του γι' αυτές υστερεί σημαντικά και η ζήτηση από τους χρήστες δεν είναι υψηλή. Το Safari επίσης δεν διαθέτει συνεδρία WebDriver BiDi, επομένως η [`installExtension`](/docs/api/browser/installExtension) δεν καλύπτει το Safari. Αν αναπτύσσετε μια επέκταση web για το Safari, παρακαλούμε [ανοίξτε ένα issue](https://github.com/webdriverio/webdriverio/issues/new?assignees=&labels=Docs+%F0%9F%93%96%2CNeeds+Triaging+%E2%8F%B3&template=documentation.yml&title=%5B%F0%9F%93%96+Docs%5D%3A+%3Ctitle%3E) και συνεργαστείτε ώστε να συμπεριληφθεί και αυτό εδώ.

:::

### Chrome

Η φόρτωση μιας επέκτασης web στο Chrome μπορεί να γίνει παρέχοντας μια συμβολοσειρά κωδικοποιημένη σε `base64` του αρχείου `crx` ή παρέχοντας μια διαδρομή προς τον φάκελο της επέκτασης web. Το πιο εύκολο είναι απλώς να κάνετε το δεύτερο, ορίζοντας τα capabilities του Chrome ως εξής:

```js wdio.conf.js
import path from 'node:path'
import url from 'node:url'

const __dirname = url.fileURLToPath(new URL('.', import.meta.url))

export const config = {
    // ...
    capabilities: [{
        browserName,
        'goog:chromeOptions': {
            // δεδομένου ότι το wdio.conf.js βρίσκεται στον ριζικό κατάλογο και τα μεταγλωττισμένα
            // αρχεία της επέκτασης web βρίσκονται στον φάκελο `./dist`
            args: [`--load-extension=${path.join(__dirname, '..', '..', 'dist')}`]
        }
    }]
}
```

:::info

Αν αυτοματοποιείτε ένα διαφορετικό πρόγραμμα περιήγησης από το Chrome, π.χ. Brave, Edge ή Opera, το πιθανότερο είναι ότι οι επιλογές του προγράμματος περιήγησης ταιριάζουν με το παραπάνω παράδειγμα, απλώς χρησιμοποιώντας ένα διαφορετικό όνομα capability, π.χ. `ms:edgeOptions`.

:::

Αν μεταγλωττίζετε την επέκτασή σας ως αρχείο `.crx` χρησιμοποιώντας π.χ. το πακέτο NPM [crx](https://www.npmjs.com/package/crx), μπορείτε επίσης να εισαγάγετε την πακεταρισμένη επέκταση μέσω:

```js wdio.conf.js
import path from 'node:path'
import url from 'node:url'

const __dirname = url.fileURLToPath(new URL('.', import.meta.url))
const extPath = path.join(__dirname, `web-extension-chrome.crx`)
const chromeExtension = (await fs.readFile(extPath)).toString('base64')

export const config = {
    // ...
    capabilities: [{
        browserName,
        'goog:chromeOptions': {
            extensions: [chromeExtension]
        }
    }]
}
```

### Firefox

Για να δημιουργήσετε ένα προφίλ Firefox που περιλαμβάνει επεκτάσεις, μπορείτε να χρησιμοποιήσετε την [Firefox Profile Service](/docs/firefox-profile-service) για να ρυθμίσετε τη συνεδρία σας αναλόγως. Ωστόσο, ενδέχεται να αντιμετωπίσετε προβλήματα όπου η τοπικά αναπτυγμένη επέκτασή σας δεν μπορεί να φορτωθεί λόγω ζητημάτων υπογραφής. Σε αυτή την περίπτωση μπορείτε επίσης να φορτώσετε μια επέκταση στο hook `before` μέσω της εντολής [`installAddOn`](/docs/api/gecko#installaddon), π.χ.:

```js wdio.conf.js
import path from 'node:path'
import url from 'node:url'

const __dirname = url.fileURLToPath(new URL('.', import.meta.url))
const extensionPath = path.resolve(__dirname, `web-extension.xpi`)

export const config = {
    // ...
    before: async (capabilities) => {
        const browserName = (capabilities as WebdriverIO.Capabilities).browserName
        if (browserName === 'firefox') {
            const extension = await fs.readFile(extensionPath)
            await browser.installAddOn(extension.toString('base64'), true)
        }
    }
}
```

Για να δημιουργήσετε ένα αρχείο `.xpi`, συνιστάται να χρησιμοποιήσετε το πακέτο NPM [`web-ext`](https://www.npmjs.com/package/web-ext). Μπορείτε να πακετάρετε την επέκτασή σας χρησιμοποιώντας την ακόλουθη ενδεικτική εντολή:

```sh
npx web-ext build -s dist/ -a . -n web-extension-firefox.xpi
```

## Εγκατάσταση μιας επέκτασης κατά τη διάρκεια της συνεδρίας

Από την έκδοση v10, οι [`browser.installExtension`](/docs/api/browser/installExtension) και [`browser.uninstallExtension`](/docs/api/browser/uninstallExtension) εγκαθιστούν μια επέκταση web κατά τη διάρκεια μιας συνεδρίας WebDriver BiDi και επιστρέφουν το id της. Χρησιμοποιήστε τις όταν η επέκταση δεν πρέπει να υπάρχει κατά την εκκίνηση, ή όταν η ίδια δοκιμή την εγκαθιστά, τη χρησιμοποιεί και την αφαιρεί.

Η ρύθμιση capabilities και η `installAddOn` παραπάνω παραμένουν ο τρόπος για τη φόρτωση μιας επέκτασης πριν από την πρώτη πλοήγηση. Η `installExtension` δεν τις αντικαθιστά. Οι `browser.webExtensionInstall` και `browser.webExtensionUninstall` παραμένουν διαθέσιμες όταν θέλετε να διαμορφώσετε μόνοι σας το [payload της προδιαγραφής](https://w3c.github.io/webdriver-bidi/#command-webExtension-install).

```ts title="test/specs/extension.e2e.ts"
import path from 'node:path'
import url from 'node:url'
import { browser, expect } from '@wdio/globals'

const extensionPath = path.resolve(
    path.dirname(url.fileURLToPath(import.meta.url)),
    '../../dist'
)

describe('web extension', () => {
    it('installs and removes the extension', async () => {
        const extensionId = await browser.installExtension(extensionPath)
        expect(extensionId).not.toEqual('')

        await browser.url('https://webdriver.io')
        await browser.uninstallExtension(extensionId)
    })
})
```

Η `installExtension` δέχεται τρεις τύπους εισόδου:

| Είσοδος | Payload που αποστέλλεται στο πρόγραμμα περιήγησης |
| --- | --- |
| Μια διαδρομή καταλόγου | `{ type: 'path', path }` μετά από `path.resolve`. Το πρόγραμμα περιήγησης πρέπει να μπορεί να διαβάσει αυτόν τον κατάλογο. |
| Μια διαδρομή `.zip`, `.xpi` ή `.crx` | `{ type: 'archivePath', path }` μετά από `path.resolve`. |
| `{ base64: string }` | `{ type: 'base64', value }`. Bytes αρχείου συμπίεσης. Οποιοδήποτε άλλο αντικείμενο απορρίπτεται. |

Μια διαδρομή σε μορφή συμβολοσειράς επιλύεται πάντα στον test runner. Σε μια απομακρυσμένη συνεδρία — ένα hostname διαφορετικό από `localhost`, `127.0.0.1` ή `::1`, ή ένα `user` και `key` υπηρεσίας cloud — αυτή η διαδρομή δεν είναι διαδρομή στο μηχάνημα του προγράμματος περιήγησης. Η εντολή διαβάζει ένα αρχείο συμπίεσης, ή συμπιέζει έναν κατάλογο σε zip στη μνήμη, και στέλνει `base64`. Δεν χρειάζεται να διακρίνετε μόνοι σας μεταξύ τοπικής και απομακρυσμένης συνεδρίας. Οι τοπικές συνεδρίες στέλνουν `path` ή `archivePath` και δεν διαβάζουν τα bytes.

Όταν χρησιμοποιείτε κατάλογο, ορίστε τον στη ρίζα της επέκτασης, δηλαδή τον φάκελο που περιέχει το `manifest.json`.

Η συνεδρία πρέπει να υποστηρίζει WebDriver BiDi. Μια κλασική συνεδρία προκαλεί το σφάλμα `installExtension requires a WebDriver BiDi session (webExtension.install)`. Ένα πρόγραμμα περιήγησης που υλοποιεί το BiDi αλλά όχι αυτό το module αποτυγχάνει στην εντολή με `unsupported operation` (ή `unknown command` όταν το module απουσιάζει). Ένα μη έγκυρο αρχείο συμπίεσης αποτυγχάνει με `invalid web extension`. Η απεγκατάσταση ενός id που δεν γνωρίζει το πρόγραμμα περιήγησης αποτυγχάνει με `no such web extension`.

Η `uninstallExtension` δέχεται τη συμβολοσειρά id που επέστρεψε η `installExtension`.

### Chromium

Το Chrome και το Edge υλοποιούν το `webExtension.install` αλλά το διατηρούν απενεργοποιημένο μέχρι να εκκινήσετε το πρόγραμμα περιήγησης με `--enable-unsafe-extension-debugging` και `--remote-debugging-pipe`. Το Chrome 136 και νεότερες εκδόσεις απαιτούν επίσης `--user-data-dir` όποτε έχει οριστεί το `--remote-debugging-pipe`. Χωρίς αυτά τα ορίσματα η εντολή αποτυγχάνει με `unknown error - Method not available`.

Το `--remote-debugging-pipe` είναι το κανάλι (pipe) μεταξύ του driver και του προγράμματος περιήγησης. Η συνεδρία BiDi εξακολουθεί να χρησιμοποιεί το `webSocketUrl`.

```ts title="wdio.conf.ts"
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'

const userDataDir = fs.mkdtempSync(path.join(os.tmpdir(), 'wdio-chrome-'))

export const config: WebdriverIO.Config = {
    // ...
    capabilities: [{
        browserName: 'chrome',
        'goog:chromeOptions': {
            args: [
                '--enable-unsafe-extension-debugging',
                '--remote-debugging-pipe',
                `--user-data-dir=${userDataDir}`
            ]
        }
    }]
}
```

Χρησιμοποιήστε `ms:edgeOptions` για το Edge. Το Firefox φορτώνει την επέκταση σε μια κανονική συνεδρία BiDi και δεν χρειάζεται αυτά τα ορίσματα.

## Συμβουλές & Κόλπα

Η ακόλουθη ενότητα περιέχει ένα σύνολο χρήσιμων συμβουλών και κόλπων που μπορούν να φανούν χρήσιμα κατά τη δοκιμή μιας επέκτασης web.

### Δοκιμή Αναδυόμενου Παραθύρου στο Chrome

Αν ορίσετε μια καταχώρηση browser action `default_popup` στο [manifest της επέκτασής σας](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/manifest.json/browser_action), μπορείτε να δοκιμάσετε απευθείας αυτή τη σελίδα HTML, καθώς το κλικ στο εικονίδιο της επέκτασης στην επάνω γραμμή του προγράμματος περιήγησης δεν θα λειτουργήσει. Αντ' αυτού, πρέπει να ανοίξετε απευθείας το αρχείο html του αναδυόμενου παραθύρου.

Στο Chrome αυτό γίνεται ανακτώντας το ID της επέκτασης και ανοίγοντας τη σελίδα του αναδυόμενου παραθύρου μέσω `browser.url('...')`. Η συμπεριφορά σε αυτή τη σελίδα θα είναι η ίδια με εκείνη μέσα στο αναδυόμενο παράθυρο. Για να το κάνετε αυτό, συνιστούμε να γράψετε την ακόλουθη προσαρμοσμένη εντολή:

```ts customCommand.ts
export async function openExtensionPopup (this: WebdriverIO.Browser, extensionName: string, popupUrl = 'index.html') {
  if ((this.capabilities as WebdriverIO.Capabilities).browserName !== 'chrome') {
    throw new Error('This command only works with Chrome')
  }
  await this.url('chrome://extensions/')

  const extensions = await this.$$('extensions-item')
  const extension = await extensions.find(async (ext) => (
    await ext.$('#name').getText()) === extensionName
  )

  if (!extension) {
    const installedExtensions = await extensions.map((ext) => ext.$('#name').getText())
    throw new Error(`Couldn't find extension "${extensionName}", available installed extensions are "${installedExtensions.join('", "')}"`)
  }

  const extId = await extension.getAttribute('id')
  await this.url(`chrome-extension://${extId}/popup/${popupUrl}`)
}

declare global {
  namespace WebdriverIO {
      interface Browser {
        openExtensionPopup: typeof openExtensionPopup
      }
  }
}
```

Στο `wdio.conf.js` σας μπορείτε να εισαγάγετε αυτό το αρχείο και να καταχωρήσετε την προσαρμοσμένη εντολή στο hook `before`, π.χ.:

```ts wdio.conf.ts
import { browser } from '@wdio/globals'

import { openExtensionPopup } from './support/customCommands'

export const config: WebdriverIO.Config = {
  // ...
  before: () => {
    browser.addCommand('openExtensionPopup', openExtensionPopup)
  }
}
```

Τώρα, στη δοκιμή σας, μπορείτε να αποκτήσετε πρόσβαση στη σελίδα του αναδυόμενου παραθύρου μέσω:

```ts
await browser.openExtensionPopup('My Web Extension')
```