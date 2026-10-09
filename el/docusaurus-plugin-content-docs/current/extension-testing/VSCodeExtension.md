---
id: vscode-extensions
title: Έλεγχος Επεκτάσεων VS Code
description: "Ελέγξτε επεκτάσεις VS Code από άκρο σε άκρο στο desktop IDE ή ως web extensions με το WebdriverIO και το VS Code service."
---

Το WebdriverIO σάς επιτρέπει να ελέγχετε απρόσκοπτα τις επεκτάσεις σας για το [VS Code](https://code.visualstudio.com/) από άκρο σε άκρο στο VS Code Desktop IDE ή ως web extension. Χρειάζεται μόνο να δώσετε τη διαδρομή προς την επέκτασή σας και το framework κάνει τα υπόλοιπα. Με το [`wdio-vscode-service`](https://www.npmjs.com/package/wdio-vscode-service) φροντίζει για όλα αυτά και για πολλά περισσότερα:

- 🏗️ Εγκατάσταση του VSCode (είτε stable, είτε insiders, είτε μιας συγκεκριμένης έκδοσης)
- ⬇️ Λήψη του Chromedriver που αντιστοιχεί στη δεδομένη έκδοση του VSCode
- 🚀 Σας δίνει πρόσβαση στο VSCode API από τα tests σας
- 🖥️ Εκκίνηση του VSCode με προσαρμοσμένες ρυθμίσεις χρήστη (συμπεριλαμβανομένης υποστήριξης για VSCode σε Ubuntu, MacOS και Windows)
- 🌐 Ή εξυπηρέτηση του VSCode από έναν server ώστε να είναι προσβάσιμο από οποιονδήποτε browser για τον έλεγχο web extensions
- 📔 Αρχικοποίηση page objects με locators που αντιστοιχούν στην έκδοση του VSCode σας

## Ξεκινώντας

Για να δημιουργήσετε ένα νέο project WebdriverIO, εκτελέστε:

```sh
npm create wdio@latest ./
```

Ένας οδηγός εγκατάστασης θα σας καθοδηγήσει στη διαδικασία. Βεβαιωθείτε ότι επιλέγετε _"VS Code Extension Testing"_ όταν σας ρωτήσει τι είδους έλεγχο θέλετε να κάνετε, και στη συνέχεια απλώς κρατήστε τις προεπιλογές ή τροποποιήστε τις σύμφωνα με τις προτιμήσεις σας.

## Παράδειγμα Διαμόρφωσης

Για να χρησιμοποιήσετε το service πρέπει να προσθέσετε το `vscode` στη λίστα των services σας, προαιρετικά ακολουθούμενο από ένα αντικείμενο διαμόρφωσης. Αυτό θα κάνει το WebdriverIO να κατεβάσει τα δεδομένα binaries του VSCode και την κατάλληλη έκδοση του Chromedriver:

```js
// wdio.conf.ts
export const config = {
    outputDir: 'trace',
    // ...
    capabilities: [{
        browserName: 'vscode',
        browserVersion: '1.71.0', // "insiders" or "stable" for latest VSCode version
        'wdio:vscodeOptions': {
            extensionPath: __dirname,
            userSettings: {
                "editor.fontSize": 14
            }
        }
    }],
    services: ['vscode'],
    /**
     * optionally you can define the path WebdriverIO stores all
     * VSCode and Chromedriver binaries, e.g.:
     * services: [['vscode', { cachePath: __dirname }]]
     */
    // ...
};
```

Αν ορίσετε το `wdio:vscodeOptions` με οποιοδήποτε άλλο `browserName` εκτός από `vscode`, π.χ. `chrome`, το service θα εξυπηρετήσει την επέκταση ως web extension. Αν κάνετε έλεγχο σε Chrome δεν απαιτείται επιπλέον driver service, π.χ.:

```js
// wdio.conf.ts
export const config = {
    outputDir: 'trace',
    // ...
    capabilities: [{
        browserName: 'chrome',
        'wdio:vscodeOptions': {
            extensionPath: __dirname
        }
    }],
    services: ['vscode'],
    // ...
};
```

_Σημείωση:_ κατά τον έλεγχο web extensions μπορείτε να επιλέξετε μόνο μεταξύ `stable` ή `insiders` ως `browserVersion`.

### Ρύθμιση TypeScript

Στο `tsconfig.json` σας βεβαιωθείτε ότι έχετε προσθέσει το `wdio-vscode-service` στη λίστα των types σας:

```json
{
    "compilerOptions": {
        "types": [
            "node",
            "webdriverio/async",
            "@wdio/mocha-framework",
            "expect-webdriverio",
            "wdio-vscode-service"
        ],
        "target": "es2020",
        "moduleResolution": "node16"
    }
}
```

## Χρήση

Στη συνέχεια μπορείτε να χρησιμοποιήσετε τη μέθοδο `getWorkbench` για να αποκτήσετε πρόσβαση στα page objects για τους locators που αντιστοιχούν στην επιθυμητή έκδοση του VSCode:

```ts
describe('WDIO VSCode Service', () => {
    it('should be able to load VSCode', async () => {
        const workbench = await browser.getWorkbench()
        expect(await workbench.getTitleBar().getTitle())
            .toBe('[Extension Development Host] - README.md - wdio-vscode-service - Visual Studio Code')
    })
})
```

Από εκεί μπορείτε να αποκτήσετε πρόσβαση σε όλα τα page objects χρησιμοποιώντας τις κατάλληλες μεθόδους page object. Μάθετε περισσότερα για όλα τα διαθέσιμα page objects και τις μεθόδους τους στην [τεκμηρίωση των page objects](https://webdriverio-community.github.io/wdio-vscode-service/).

### Πρόσβαση στα VSCode APIs

Αν θέλετε να εκτελέσετε συγκεκριμένους αυτοματισμούς μέσω του [VSCode API](https://code.visualstudio.com/api/references/vscode-api), μπορείτε να το κάνετε εκτελώντας απομακρυσμένες εντολές μέσω της προσαρμοσμένης εντολής `executeWorkbench`. Αυτή η εντολή επιτρέπει την απομακρυσμένη εκτέλεση κώδικα από το test σας μέσα στο περιβάλλον του VSCode και παρέχει πρόσβαση στο VSCode API. Μπορείτε να περάσετε αυθαίρετες παραμέτρους στη συνάρτηση, οι οποίες θα μεταβιβαστούν στη συνάρτηση. Το αντικείμενο `vscode` θα περνιέται πάντα ως πρώτο όρισμα, ακολουθούμενο από τις παραμέτρους της εξωτερικής συνάρτησης. Σημειώστε ότι δεν μπορείτε να έχετε πρόσβαση σε μεταβλητές εκτός του εύρους της συνάρτησης, καθώς το callback εκτελείται απομακρυσμένα. Ακολουθεί ένα παράδειγμα:

```ts
const workbench = await browser.getWorkbench()
await browser.executeWorkbench((vscode, param1, param2) => {
    vscode.window.showInformationMessage(`I am an ${param1} ${param2}!`)
}, 'API', 'call')

const notifs = await workbench.getNotifications()
console.log(await notifs[0].getMessage()) // εμφανίζει: "I am an API call!"
```

Για την πλήρη τεκμηρίωση των page objects, ανατρέξτε στην [τεκμηρίωση](https://webdriverio-community.github.io/wdio-vscode-service/modules.html). Μπορείτε να βρείτε διάφορα παραδείγματα χρήσης στο [test suite αυτού του project](https://github.com/webdriverio-community/wdio-vscode-service/blob/main/test/specs).

## Περισσότερες Πληροφορίες

Μπορείτε να μάθετε περισσότερα για το πώς να διαμορφώσετε το [`wdio-vscode-service`](https://www.npmjs.com/package/wdio-vscode-service) και πώς να δημιουργήσετε προσαρμοσμένα page objects στην [τεκμηρίωση του service](/docs/wdio-vscode-service). Μπορείτε επίσης να παρακολουθήσετε την παρακάτω ομιλία του [Christian Bromann](https://twitter.com/bromann) με θέμα [_Testing Complex VSCode Extensions With the Power of Web Standards_](https://www.youtube.com/watch?v=PhGNTioBUiU):

<LiteYouTubeEmbed
    id="PhGNTioBUiU"
    title="Testing Complex VSCode Extensions With the Power of Web Standards"
/>