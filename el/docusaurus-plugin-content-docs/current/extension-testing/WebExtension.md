---
id: web-extensions
title: Δοκιμές Επεκτάσεων Ιστού
---

Το WebdriverIO είναι το ιδανικό εργαλείο για την αυτοματοποίηση ενός προγράμματος περιήγησης. Οι επεκτάσεις ιστού αποτελούν μέρος του προγράμματος περιήγησης και μπορούν να αυτοματοποιηθούν με τον ίδιο τρόπο. Όποτε η επέκταση ιστού σας χρησιμοποιεί content scripts για να εκτελέσει JavaScript σε ιστοσελίδες ή προσφέρει ένα αναδυόμενο παράθυρο, μπορείτε να εκτελέσετε μια δοκιμή e2e γι' αυτό χρησιμοποιώντας το WebdriverIO.

## Φόρτωση μιας Επέκτασης Ιστού στο Πρόγραμμα Περιήγησης

Ως πρώτο βήμα πρέπει να φορτώσουμε την επέκταση υπό δοκιμή στο πρόγραμμα περιήγησης ως μέρος της συνεδρίας μας. Αυτό λειτουργεί διαφορετικά για Chrome και Firefox.

:::info

Αυτά τα έγγραφα παραλείπουν τις επεκτάσεις ιστού Safari καθώς η υποστήριξή τους είναι πολύ πίσω και η ζήτηση από τους χρήστες δεν είναι υψηλή. Εάν δημιουργείτε μια επέκταση ιστού για Safari, παρακαλούμε [δημιουργήστε ένα issue](https://github.com/webdriverio/webdriverio/issues/new?assignees=&labels=Docs+%F0%9F%93%96%2CNeeds+Triaging+%E2%8F%B3&template=documentation.yml&title=%5B%F0%9F%93%96+Docs%5D%3A+%3Ctitle%3E) και συνεργαστείτε για να συμπεριληφθεί κι αυτό εδώ.

:::

### Chrome

Η φόρτωση μιας επέκτασης ιστού στο Chrome μπορεί να γίνει παρέχοντας μια κωδικοποιημένη συμβολοσειρά `base64` του αρχείου `crx` ή παρέχοντας μια διαδρομή προς τον φάκελο της επέκτασης ιστού. Το ευκολότερο είναι απλά να κάνετε το δεύτερο, ορίζοντας τις δυνατότητες Chrome ως εξής:

```js wdio.conf.js
import path from 'node:path'
import url from 'node:url'

const __dirname = url.fileURLToPath(new URL('.', import.meta.url))

export const config = {
    // ...
    capabilities: [{
        browserName,
        'goog:chromeOptions': {
            // given your wdio.conf.js is in the root directory and your compiled
            // web extension files are located in the `./dist` folder
            args: [`--load-extension=${path.join(__dirname, '..', '..', 'dist')}`]
        }
    }]
}
```

:::info

Εάν αυτοματοποιείτε ένα διαφορετικό πρόγραμμα περιήγησης από το Chrome, π.χ. Brave, Edge ή Opera, είναι πιθανό οι επιλογές του προγράμματος περιήγησης να ταιριάζουν με το παραπάνω παράδειγμα, απλά χρησιμοποιώντας ένα διαφορετικό όνομα δυνατότητας, π.χ. `ms:edgeOptions`.

:::

Εάν συμπιλείτε την επέκτασή σας ως αρχείο `.crx` χρησιμοποιώντας π.χ. το πακέτο NPM [crx](https://www.npmjs.com/package/crx), μπορείτε επίσης να εισαγάγετε την συσκευασμένη επέκταση μέσω:

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

Για να δημιουργήσετε ένα προφίλ Firefox που περιλαμβάνει επεκτάσεις, μπορείτε να χρησιμοποιήσετε την [Υπηρεσία Προφίλ Firefox](/docs/firefox-profile-service) για να ρυθμίσετε ανάλογα τη συνεδρία σας. Ωστόσο, μπορεί να αντιμετωπίσετε προβλήματα όπου η τοπικά αναπτυγμένη επέκτασή σας δεν μπορεί να φορτωθεί λόγω προβλημάτων υπογραφής. Σε αυτήν την περίπτωση, μπορείτε επίσης να φορτώσετε μια επέκταση στο hook `before` μέσω της εντολής [`installAddOn`](/docs/api/gecko#installaddon), π.χ.:

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

Για να δημιουργήσετε ένα αρχείο `.xpi`, συνιστάται να χρησιμοποιήσετε το πακέτο NPM [`web-ext`](https://www.npmjs.com/package/web-ext). Μπορείτε να συσκευάσετε την επέκτασή σας χρησιμοποιώντας το ακόλουθο παράδειγμα εντολής:

```sh
npx web-ext build -s dist/ -a . -n web-extension-firefox.xpi
```

## Συμβουλές & Κόλπα

Η ακόλουθη ενότητα περιέχει ένα σύνολο χρήσιμων συμβουλών και κόλπων που μπορεί να βοηθήσουν κατά τη δοκιμή μιας επέκτασης ιστού.

### Δοκιμή Αναδυόμενου Παραθύρου στο Chrome

Εάν ορίσετε μια καταχώριση ενέργειας προγράμματος περιήγησης `default_popup` στο [manifest της επέκτασης](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/manifest.json/browser_action), μπορείτε να δοκιμάσετε αυτή τη σελίδα HTML απευθείας, καθώς το κλικ στο εικονίδιο επέκτασης στην επάνω γραμμή του προγράμματος περιήγησης δεν θα λειτουργήσει. Αντίθετα, πρέπει να ανοίξετε το αρχείο popup html απευθείας.

Στο Chrome αυτό λειτουργεί ανακτώντας το αναγνωριστικό της επέκτασης και ανοίγοντας τη σελίδα popup μέσω του `browser.url('...')`. Η συμπεριφορά σε αυτή τη σελίδα θα είναι η ίδια όπως μέσα στο popup. Για να το κάνετε αυτό, συνιστούμε να γράψετε την ακόλουθη προσαρμοσμένη εντολή:

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

Στο `wdio.conf.js` μπορείτε να εισαγάγετε αυτό το αρχείο και να καταχωρίσετε την προσαρμοσμένη εντολή στο hook `before`, π.χ.:

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

Τώρα, στη δοκιμή σας, μπορείτε να αποκτήσετε πρόσβαση στη σελίδα popup μέσω:

```ts
await browser.openExtensionPopup('My Web Extension')
```