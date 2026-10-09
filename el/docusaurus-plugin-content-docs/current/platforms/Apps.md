---
id: apps-and-extensions
title: Επεκτάσεις & Επεξεργαστές
description: Φορτώστε μια επέκταση προγράμματος περιήγησης ή μια επέκταση VS Code σε μια συνεδρία WebdriverIO και δοκιμάστε την από άκρο σε άκρο.
---

Το WebdriverIO δοκιμάζει επεκτάσεις προγραμμάτων περιήγησης και επεκτάσεις επεξεργαστών φορτώνοντάς τες στην πραγματική εφαρμογή-ξενιστή. Οι επεκτάσεις προγραμμάτων περιήγησης (web) εκτελούνται μέσα στο Chrome ή στο Firefox. Τις φορτώνετε μέσω των capabilities του προγράμματος περιήγησης: με `--load-extension` ή ένα base64 `.crx` μέσω του `goog:chromeOptions` στο Chrome, ή με `browser.installAddOn()` για ένα `.xpi` στο Firefox. Σε μια συνεδρία WebDriver BiDi μπορείτε επίσης να εγκαταστήσετε και να αφαιρέσετε μια επέκταση κατά τη διάρκεια της συνεδρίας με τα `browser.installExtension()` και `browser.uninstallExtension()`. Το Safari δεν διαθέτει συνεδρία BiDi, επομένως αυτή η εντολή δεν καλύπτει το Safari. Από εκεί και πέρα, δοκιμάζετε τα content scripts και τις σελίδες popup με τις συνήθεις εντολές WebDriver. Οι επεκτάσεις VS Code δοκιμάζονται με το κοινοτικό [`wdio-vscode-service`](/docs/wdio-vscode-service). Αυτό κατεβάζει το VS Code (stable, insiders ή μια συγκεκριμένη έκδοση) και τον αντίστοιχο Chromedriver και, στη συνέχεια, εκκινεί το VS Code με την επέκτασή σας και προσαρμοσμένες ρυθμίσεις χρήστη. Τα page objects για το workbench είναι διαθέσιμα μέσω του `browser.getWorkbench()`, ενώ το `browser.executeWorkbench()` εκτελεί κώδικα έναντι του VS Code API. Η ίδια υπηρεσία μπορεί επίσης να σερβίρει το VS Code σε πρόγραμμα περιήγησης για τη δοκιμή web επεκτάσεων. Και για τα plugins του Obsidian υπάρχει κοινοτική υπηρεσία.

## Γρήγορη εκκίνηση

Εγκαταστήστε πρώτα τον testrunner και την υποστήριξη TypeScript:

```sh
npm install --save-dev @wdio/cli @wdio/local-runner @wdio/mocha-framework @wdio/spec-reporter tsx
```

```json title="tsconfig.json"
{
    "compilerOptions": {
        "types": ["node", "@wdio/globals/types", "@wdio/mocha-framework"]
    }
}
```

### Επέκταση Chrome

Κάντε build την επέκτασή σας σε έναν φάκελο (εδώ `./dist`) και φορτώστε την με το όρισμα `--load-extension` του Chrome:

```ts title="wdio.conf.ts"
import path from 'node:path'
import url from 'node:url'

const __dirname = url.fileURLToPath(new URL('.', import.meta.url))

export const config: WebdriverIO.Config = {
    runner: 'local',
    specs: ['./test/specs/**/*.ts'],
    capabilities: [{
        browserName: 'chrome',
        'goog:chromeOptions': {
            args: [`--load-extension=${path.join(__dirname, 'dist')}`]
        }
    }],
    framework: 'mocha',
    reporters: ['spec'],
    mochaOpts: {
        ui: 'bdd',
        timeout: 60000
    }
}
```

```ts title="test/specs/extension.e2e.ts"
import { expect, browser, $ } from '@wdio/globals'

describe('My Web Extension', () => {
    it('should inject its content script', async () => {
        await browser.url('https://webdriver.io')
        // αντικαταστήστε με ένα στοιχείο που προσθέτει το content script σας στη σελίδα
        await expect($('#my-extension-root')).toBeExisting()
    })
})
```

Το κλικ στο εικονίδιο της επέκτασης στη γραμμή εργαλείων δεν λειτουργεί. Για να δοκιμάσετε ένα `default_popup`, βρείτε το id της επέκτασης στο `chrome://extensions/` και ανοίξτε το `chrome-extension://<id>/<popup>.html` με το `browser.url()`. Ο [οδηγός Web Extension](/docs/extension-testing/web-extensions#test-popup-modal-in-chrome) περιλαμβάνει μια έτοιμη προσαρμοσμένη εντολή `openExtensionPopup` για αυτόν τον σκοπό.

### Επέκταση VS Code

```sh
npm install --save-dev wdio-vscode-service
```

Προσθέστε το `"wdio-vscode-service"` στον πίνακα `types` του `tsconfig.json`.

```ts title="wdio.conf.ts"
import url from 'node:url'

const __dirname = url.fileURLToPath(new URL('.', import.meta.url))

export const config: WebdriverIO.Config = {
    runner: 'local',
    specs: ['./test/specs/**/*.ts'],
    capabilities: [{
        browserName: 'vscode',
        browserVersion: 'stable', // επίσης δυνατό: "insiders" ή μια συγκεκριμένη έκδοση π.χ. "1.80.0"
        'wdio:vscodeOptions': {
            // δείχνει στον κατάλογο όπου βρίσκεται το package.json της επέκτασης
            extensionPath: __dirname,
            userSettings: {
                'editor.fontSize': 14
            }
        }
    }],
    services: ['vscode'],
    framework: 'mocha',
    reporters: ['spec'],
    mochaOpts: {
        ui: 'bdd',
        timeout: 60000
    }
}
```

```ts title="test/specs/vscode.e2e.ts"
import { browser, expect } from '@wdio/globals'

describe('VS Code Extension Testing', () => {
    it('should be able to load VSCode', async () => {
        const workbench = await browser.getWorkbench()
        expect(await workbench.getTitleBar().getTitle())
            .toContain('[Extension Development Host]')
    })
})
```

Για να δοκιμάσετε την επέκταση ως web επέκταση του VS Code, ορίστε `browserName: 'chrome'` και διατηρήστε το `wdio:vscodeOptions`. Σε αυτήν τη λειτουργία, το `browserVersion` μπορεί να είναι μόνο `stable` ή `insiders`. Η εντολή `npm create wdio@latest ./` με την επιλογή "VS Code Extension Testing" δημιουργεί αυτήν τη ρύθμιση για εσάς.

## Επιλέξτε τη διαδρομή σας

- [Δοκιμή Web Extension](/docs/extension-testing/web-extensions): φορτώστε επεκτάσεις στο Chrome (φάκελος ή `.crx`) και στο Firefox (`.xpi` μέσω [`installAddOn`](/docs/api/gecko#installaddon)), ή εγκαταστήστε και αφαιρέστε μία κατά τη διάρκεια της συνεδρίας με το [`installExtension`](/docs/api/browser/installExtension). Οι web επεκτάσεις του Safari δεν καλύπτονται.
- [Firefox Profile Service](/docs/firefox-profile-service): δημιουργήστε ένα προφίλ Firefox που περιλαμβάνει επεκτάσεις.
- [Δοκιμή VS Code Extension](/docs/extension-testing/vscode-extensions): διαμόρφωση, ρύθμιση TypeScript, page objects του workbench και `executeWorkbench`.
- [VS Code Service](/docs/wdio-vscode-service): όλες οι επιλογές της υπηρεσίας, όπως το `cachePath`, και πώς να γράψετε προσαρμοσμένα page objects.
- [Obsidian Plugin Testing Service](/docs/wdio-obsidian-service): μια κοινοτική υπηρεσία που δοκιμάζει plugins του Obsidian σε διάφορες εκδόσεις του Obsidian σε Windows, macOS, Linux και Android.
- [Προσαρμοσμένες εντολές](/docs/customcommands): πακετάρετε βοηθητικές συναρτήσεις όπως το `openExtensionPopup` για επαναχρησιμοποίηση.

Οι δοκιμές web επεκτάσεων εκτελούνται σε μια κανονική συνεδρία Chrome ή Firefox, επομένως ισχύουν όλα όσα αναφέρονται στα [Προγράμματα περιήγησης](/docs/platforms/web), συμπεριλαμβανομένων των selectors, του network mocking και του visual testing.

## Αντιμετώπιση προβλημάτων

- Το Firefox απορρίπτει μια τοπικά δημιουργημένη επέκταση λόγω υπογραφής: εγκαταστήστε την στο hook `before` με `browser.installAddOn(extension.toString('base64'), true)` αντί μέσω προφίλ. Δημιουργήστε το `.xpi` με `npx web-ext build`.
- Χρήση Edge, Brave ή Opera αντί για Chrome: τα ίδια ορίσματα συνήθως λειτουργούν με το αντίστοιχο capability επιλογών του εκάστοτε προγράμματος περιήγησης, π.χ. `ms:edgeOptions`.
- Τα εκτελέσιμα του VS Code και του Chromedriver κατεβαίνουν σε έναν κατάλογο cache. Για να ελέγξετε πού αποθηκεύονται, π.χ. για να τα κάνετε cache στο CI, ορίστε `services: [['vscode', { cachePath: __dirname }]]`.
- Το TypeScript δεν βρίσκει τα `getWorkbench` ή `executeWorkbench`: προσθέστε το `wdio-vscode-service` στο `compilerOptions.types`.

## Επόμενα βήματα

- Αναφορά [Διαμόρφωσης](/docs/configuration) για κάθε επιλογή του `wdio.conf.ts`.
- [Electron](/docs/desktop-testing/electron) για δοκιμή πλήρων εφαρμογών επιφάνειας εργασίας βασισμένων στο Chromium.
- Άλλες πλατφόρμες: [Προγράμματα περιήγησης](/docs/platforms/web), [Εφαρμογές για κινητά](/docs/platforms/mobile), [Εφαρμογές επιφάνειας εργασίας](/docs/platforms/desktop).