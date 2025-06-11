---
id: vscode-extensions
title: Δοκιμή Επεκτάσεων VS Code
---

Το WebdriverIO σας επιτρέπει να δοκιμάζετε απρόσκοπτα τις επεκτάσεις [VS Code](https://code.visualstudio.com/) από άκρο σε άκρο στο VS Code Desktop IDE ή ως διαδικτυακή επέκταση. Χρειάζεται μόνο να παρέχετε μια διαδρομή προς την επέκτασή σας και το framework κάνει τα υπόλοιπα. Με το [`wdio-vscode-service`](https://www.npmjs.com/package/wdio-vscode-service) όλα φροντίζονται και πολλά περισσότερα:

- 🏗️ Εγκατάσταση του VSCode (είτε σταθερή έκδοση, insiders ή συγκεκριμένη έκδοση)
- ⬇️ Λήψη του Chromedriver συγκεκριμένα για τη δεδομένη έκδοση VSCode
- 🚀 Σας επιτρέπει να έχετε πρόσβαση στο VSCode API από τις δοκιμές σας
- 🖥️ Εκκίνηση του VSCode με προσαρμοσμένες ρυθμίσεις χρήστη (συμπεριλαμβανομένης υποστήριξης για VSCode σε Ubuntu, MacOS και Windows)
- 🌐 Ή εξυπηρετεί το VSCode από έναν διακομιστή για πρόσβαση από οποιονδήποτε περιηγητή για δοκιμή διαδικτυακών επεκτάσεων
- 📔 Προετοιμασία αντικειμένων σελίδας με εντοπιστές που ταιριάζουν με την έκδοση VSCode σας

## Ξεκινώντας

Για να ξεκινήσετε ένα νέο έργο WebdriverIO, εκτελέστε:

```sh
npm create wdio@latest ./
```

Ένας οδηγός εγκατάστασης θα σας καθοδηγήσει στη διαδικασία. Βεβαιωθείτε ότι επιλέγετε _"VS Code Extension Testing"_ όταν σας ρωτά τι είδους δοκιμή θέλετε να κάνετε, στη συνέχεια απλά κρατήστε τις προεπιλογές ή τροποποιήστε με βάση τις προτιμήσεις σας.

## Παράδειγμα Διαμόρφωσης

Για να χρησιμοποιήσετε την υπηρεσία πρέπει να προσθέσετε το `vscode` στη λίστα των υπηρεσιών σας, προαιρετικά ακολουθούμενο από ένα αντικείμενο διαμόρφωσης. Αυτό θα κάνει το WebdriverIO να κατεβάσει τα δεδομένα δυαδικά αρχεία VSCode και την κατάλληλη έκδοση Chromedriver:

```js
// wdio.conf.ts
export const config = {
    outputDir: 'trace',
    // ...
    capabilities: [{
        browserName: 'vscode',
        browserVersion: '1.71.0', // "insiders" ή "stable" για την τελευταία έκδοση VSCode
        'wdio:vscodeOptions': {
            extensionPath: __dirname,
            userSettings: {
                "editor.fontSize": 14
            }
        }
    }],
    services: ['vscode'],
    /**
     * προαιρετικά μπορείτε να ορίσετε τη διαδρομή όπου το WebdriverIO αποθηκεύει όλα
     * τα δυαδικά αρχεία VSCode και Chromedriver, π.χ.:
     * services: [['vscode', { cachePath: __dirname }]]
     */
    // ...
};
```

Εάν ορίσετε το `wdio:vscodeOptions` με οποιοδήποτε άλλο `browserName` εκτός από το `vscode`, π.χ. `chrome`, η υπηρεσία θα εξυπηρετήσει την επέκταση ως διαδικτυακή επέκταση. Εάν κάνετε δοκιμή στο Chrome, δεν απαιτείται πρόσθετη υπηρεσία οδηγού, π.χ.:

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

_Σημείωση:_ κατά τη δοκιμή διαδικτυακών επεκτάσεων μπορείτε να επιλέξετε μόνο μεταξύ `stable` ή `insiders` ως `browserVersion`.

### Ρύθμιση TypeScript

Στο αρχείο `tsconfig.json` σας, βεβαιωθείτε ότι προσθέτετε το `wdio-vscode-service` στη λίστα των τύπων σας:

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

Στη συνέχεια μπορείτε να χρησιμοποιήσετε τη μέθοδο `getWorkbench` για να αποκτήσετε πρόσβαση στα αντικείμενα σελίδας για τους εντοπιστές που ταιριάζουν με την επιθυμητή έκδοση VSCode:

```ts
describe('WDIO VSCode Service', () => {
    it('should be able to load VSCode', async () => {
        const workbench = await browser.getWorkbench()
        expect(await workbench.getTitleBar().getTitle())
            .toBe('[Extension Development Host] - README.md - wdio-vscode-service - Visual Studio Code')
    })
})
```

Από εκεί μπορείτε να αποκτήσετε πρόσβαση σε όλα τα αντικείμενα σελίδας χρησιμοποιώντας τις σωστές μεθόδους αντικειμένων σελίδας. Μάθετε περισσότερα σχετικά με όλα τα διαθέσιμα αντικείμενα σελίδας και τις μεθόδους τους στα [έγγραφα αντικειμένων σελίδας](https://webdriverio-community.github.io/wdio-vscode-service/).

### Πρόσβαση στα API του VSCode

Εάν θέλετε να εκτελέσετε συγκεκριμένους αυτοματισμούς μέσω του [VSCode API](https://code.visualstudio.com/api/references/vscode-api), μπορείτε να το κάνετε εκτελώντας απομακρυσμένες εντολές μέσω της προσαρμοσμένης εντολής `executeWorkbench`. Αυτή η εντολή επιτρέπει την απομακρυσμένη εκτέλεση κώδικα από τη δοκιμή σας μέσα στο περιβάλλον VSCode και σας επιτρέπει να έχετε πρόσβαση στο VSCode API. Μπορείτε να περάσετε αυθαίρετες παραμέτρους στη συνάρτηση, οι οποίες στη συνέχεια θα μεταδοθούν στη συνάρτηση. Το αντικείμενο `vscode` θα περνάει πάντα ως πρώτο όρισμα ακολουθούμενο από τις παραμέτρους της εξωτερικής συνάρτησης. Σημειώστε ότι δεν μπορείτε να έχετε πρόσβαση σε μεταβλητές εκτός του πεδίου εφαρμογής της συνάρτησης καθώς η επανάκληση εκτελείται απομακρυσμένα. Ακολουθεί ένα παράδειγμα:

```ts
const workbench = await browser.getWorkbench()
await browser.executeWorkbench((vscode, param1, param2) => {
    vscode.window.showInformationMessage(`I am an ${param1} ${param2}!`)
}, 'API', 'call')

const notifs = await workbench.getNotifications()
console.log(await notifs[0].getMessage()) // εμφανίζει: "I am an API call!"
```

Για την πλήρη τεκμηρίωση των αντικειμένων σελίδας, ελέγξτε τα [έγγραφα](https://webdriverio-community.github.io/wdio-vscode-service/modules.html). Μπορείτε να βρείτε διάφορα παραδείγματα χρήσης στη [σουίτα δοκιμών αυτού του έργου](https://github.com/webdriverio-community/wdio-vscode-service/blob/main/test/specs).

## Περισσότερες Πληροφορίες

Μπορείτε να μάθετε περισσότερα σχετικά με το πώς να διαμορφώσετε το [`wdio-vscode-service`](https://www.npmjs.com/package/wdio-vscode-service) και πώς να δημιουργήσετε προσαρμοσμένα αντικείμενα σελίδας στα [έγγραφα υπηρεσίας](/docs/wdio-vscode-service). Μπορείτε επίσης να παρακολουθήσετε την ακόλουθη ομιλία του [Christian Bromann](https://twitter.com/bromann) με θέμα [_Testing Complex VSCode Extensions With the Power of Web Standards_](https://www.youtube.com/watch?v=PhGNTioBUiU):

<LiteYouTubeEmbed
    id="PhGNTioBUiU"
    title="Testing Complex VSCode Extensions With the Power of Web Standards"
/>