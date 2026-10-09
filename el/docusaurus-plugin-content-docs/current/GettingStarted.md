---
id: gettingstarted
title: Ξεκινώντας
description: Δημιουργήστε ένα έργο WebdriverIO με npm init wdio@latest, εκτελέστε το πρώτο σας τεστ και βρείτε τον επόμενο οδηγό για την πλατφόρμα σας.
---

Ρυθμίστε το WebdriverIO σε ένα υπάρχον ή νέο έργο με μία εντολή και, στη συνέχεια, εκτελέστε το πρώτο σας τεστ. Ο οδηγός διαμόρφωσης ρωτά τι θέλετε να ελέγξετε (web, mobile, desktop ή επεκτάσεις VS Code), ποιο framework και ποιους reporters θα χρησιμοποιήσετε, και εγκαθιστά τα πάντα για εσάς.

:::info
Αυτή είναι η τεκμηρίωση για το WebdriverIO __v10__. Χρησιμοποιείτε ακόμα την v9; Χρησιμοποιήστε την [τεκμηρίωση της v9](https://v9.webdriver.io) ή ακολουθήστε τον [οδηγό μετάβασης στην v10](/docs/v10-migration).
:::

:::tip Χρησιμοποιείτε coding agent;
Κατευθύνετέ τον στο [`https://webdriver.io/llms.txt`](https://webdriver.io/llms.txt) ή συνδέστε τον MCP server της τεκμηρίωσης στο `https://webdriver.io/mcp`. Δείτε το [WebdriverIO για Coding Agents](/docs/ai-agents).
:::

## Ξεκινήστε μια εγκατάσταση WebdriverIO

Το [WebdriverIO Starter Toolkit](https://www.npmjs.com/package/create-wdio) προσθέτει μια πλήρη εγκατάσταση WebdriverIO σε ένα υπάρχον ή νέο έργο. Στον ριζικό κατάλογο ενός υπάρχοντος έργου, εκτελέστε:

<Tabs
  defaultValue="npm"
  values={[
    {label: 'NPM', value: 'npm'},
    {label: 'Yarn', value: 'yarn'},
    {label: 'pnpm', value: 'pnpm'},
    {label: 'bun', value: 'bun'},
  ]
}>
<TabItem value="npm">

```sh
npm init wdio@latest .
```

ή αν θέλετε να δημιουργήσετε ένα νέο έργο:

```sh
npm init wdio@latest ./path/to/new/project
```

</TabItem>
<TabItem value="yarn">

```sh
yarn create wdio .
```

ή αν θέλετε να δημιουργήσετε ένα νέο έργο:

```sh
yarn create wdio ./path/to/new/project
```

</TabItem>
<TabItem value="pnpm">

```sh
pnpm create wdio@latest .
```

ή αν θέλετε να δημιουργήσετε ένα νέο έργο:

```sh
pnpm create wdio@latest ./path/to/new/project
```

</TabItem>
<TabItem value="bun">

```sh
bun create wdio@latest .
```

ή αν θέλετε να δημιουργήσετε ένα νέο έργο:

```sh
bun create wdio@latest ./path/to/new/project
```

</TabItem>
</Tabs>

Αυτή η μοναδική εντολή κατεβάζει το εργαλείο WebdriverIO CLI και εκτελεί έναν οδηγό διαμόρφωσης που σας βοηθά να διαμορφώσετε τη σουίτα τεστ σας.

<CreateProjectAnimation />

Ο οδηγός θα σας θέσει μια σειρά ερωτήσεων που σας καθοδηγούν στη διαδικασία εγκατάστασης. Μπορείτε να δώσετε την παράμετρο `--yes` για να επιλέξετε μια προεπιλεγμένη εγκατάσταση που θα χρησιμοποιεί Mocha με Chrome και το μοτίβο [Page Object](https://martinfowler.com/bliki/PageObject.html).

<Tabs
  defaultValue="npm"
  values={[
    {label: 'NPM', value: 'npm'},
    {label: 'Yarn', value: 'yarn'},
    {label: 'pnpm', value: 'pnpm'},
    {label: 'bun', value: 'bun'},
  ]
}>
<TabItem value="npm">

```sh
npm init wdio@latest . -- --yes
```

</TabItem>
<TabItem value="yarn">

```sh
yarn create wdio . --yes
```

</TabItem>
<TabItem value="pnpm">

```sh
pnpm create wdio@latest . --yes
```

</TabItem>
<TabItem value="bun">

```sh
bun create wdio@latest . --yes
```

</TabItem>
</Tabs>

### Απαντήστε στον οδηγό με flags

Κάθε ερώτηση του οδηγού έχει ένα αντίστοιχο flag γραμμής εντολών. Ένα flag απαντά στην ερώτησή του και ο οδηγός ρωτά μόνο τις υπόλοιπες. Σε συνδυασμό με το `--yes`, ο οδηγός χρησιμοποιεί τις προεπιλογές για τις υπόλοιπες και δεν σας ρωτά ποτέ τίποτα, κάτι που χρειάζεται ένας coding agent ή μια εργασία CI:

```sh
# Cucumber σε JavaScript, με τους reporters spec και JUnit
npm init wdio@latest . -- --yes --framework cucumber --no-typescript --reporters spec,junit

# Firefox και Edge αντί για Chrome
npm init wdio@latest . -- --yes --browsers firefox,edge

# Μια εφαρμογή Android με Appium
npm init wdio@latest . -- --yes --mobile-environment android

# Τεστ React components
npm init wdio@latest . -- --yes --runner component --preset react

# Γράψτε τη διαμόρφωση, αλλά εγκαταστήστε τις εξαρτήσεις μόνοι σας
npm init wdio@latest . -- --yes --no-npm-install
```

Με Yarn, pnpm και bun, δώστε τα flags χωρίς το διαχωριστικό `--`, π.χ. `pnpm create wdio@latest . --yes --framework cucumber`.

Τα πιο συνηθισμένα flags:

| Flag | Τιμές |
| --- | --- |
| `--runner` | `e2e` (προεπιλογή), `component`, `desktop`, `vscode`, `roku` |
| `--framework` | `mocha` (προεπιλογή), `jasmine`, `cucumber`, `serenity-mocha`, `serenity-jasmine`, `serenity-cucumber` |
| `--typescript` / `--no-typescript` | Το TypeScript είναι η προεπιλογή όταν το έργο διαθέτει `tsconfig.json` |
| `--browsers` | Λίστα διαχωρισμένη με κόμματα από `chrome` (προεπιλογή), `firefox`, `safari`, `edge` |
| `--mobile-environment` | `android`, `ios` |
| `--backend` | `local` (προεπιλογή), `saucelabs`, `browserstack`, `experitest`, `grid`, `other` |
| `--preset` | `lit`, `vue`, `svelte`, `solid`, `stencil`, `react`, `preact`, `other`, με `--runner component` |
| `--desktop-framework` | `electron`, `tauri`, `dioxus`, `macos`, με `--runner desktop` |
| `--reporters`, `--services`, `--plugins` | Σύντομα ονόματα διαχωρισμένα με κόμματα, π.χ. `--reporters spec,junit --services visual` |
| `--agent-support` / `--no-agent-support` | Γράφει την ενότητα `AGENTS.md` και το skill `wdio-session` (ενεργό από προεπιλογή) |
| `--npm-install` / `--no-npm-install` | Εγκαθιστά τις εξαρτήσεις (ενεργό από προεπιλογή) |

Η εντολή `npm init wdio@latest -- --help` εμφανίζει κάθε flag, τις τιμές που δέχεται και την ερώτηση στην οποία απαντά. Τα boolean flags δέχονται το πρόθεμα `--no-`. Τα ίδια flags λειτουργούν και με το `npx wdio config`.

Ο οδηγός ελέγχει κάθε flag σε σχέση με την εγκατάστασή σας. Μια άγνωστη τιμή, ένα flag για ερώτηση που δεν θα έθετε, ή μια τιμή που δεν θα πρόσφερε για την εγκατάστασή σας τον σταματά με κωδικό εξόδου 2 πριν γράψει οποιοδήποτε αρχείο:

```
Error: --preset does not apply to this setup. UI framework of your components (with --runner component).
```

## Χειροκίνητη εγκατάσταση του CLI

Μπορείτε επίσης να προσθέσετε το πακέτο CLI στο έργο σας χειροκίνητα μέσω:

```sh
npm i --save-dev @wdio/cli
npx wdio --version # εμφανίζει π.χ. `8.13.10`

# εκτέλεση του οδηγού διαμόρφωσης
npx wdio config
```

## Εκτέλεση τεστ

Μπορείτε να ξεκινήσετε τη σουίτα τεστ σας χρησιμοποιώντας την εντολή `run` και υποδεικνύοντας τη διαμόρφωση WebdriverIO που μόλις δημιουργήσατε:

```sh
npx wdio run ./wdio.conf.js
```

Αν θέλετε να εκτελέσετε συγκεκριμένα αρχεία τεστ, μπορείτε να προσθέσετε την παράμετρο `--spec`:

```sh
npx wdio run ./wdio.conf.js --spec example.e2e.js
```

ή να ορίσετε σουίτες στο αρχείο διαμόρφωσής σας και να εκτελέσετε μόνο τα αρχεία τεστ που ορίζονται σε μια σουίτα:

```sh
npx wdio run ./wdio.conf.js --suite exampleSuiteName
```

## Εκτέλεση σε script

Αν θέλετε να χρησιμοποιήσετε το WebdriverIO ως μηχανή αυτοματοποίησης σε [Standalone Mode](/docs/setuptypes#standalone-mode) μέσα σε ένα script Node.JS, μπορείτε επίσης να εγκαταστήσετε απευθείας το WebdriverIO και να το χρησιμοποιήσετε ως πακέτο, π.χ. για να δημιουργήσετε ένα στιγμιότυπο οθόνης ενός ιστότοπου:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/fc362f2f8dd823d294b9bb5f92bd5991339d4591/getting-started/run-in-script.js#L2-L19
```

__Σημείωση:__ όλες οι εντολές του WebdriverIO είναι ασύγχρονες και πρέπει να χειρίζονται σωστά με τη χρήση [`async/await`](https://javascript.info/async-await).

## Καταγραφή τεστ

Το WebdriverIO παρέχει εργαλεία που σας βοηθούν να ξεκινήσετε, καταγράφοντας τις ενέργειες των τεστ σας στην οθόνη και δημιουργώντας αυτόματα scripts τεστ WebdriverIO. Δείτε το [Καταγραφή τεστ με το Chrome DevTools Recorder](/docs/record) για περισσότερες πληροφορίες.

## Απαιτήσεις συστήματος

Θα χρειαστείτε εγκατεστημένο το [Node.js](http://nodejs.org).

- Εγκαταστήστε τουλάχιστον την v22.19.0 ή νεότερη, καθώς αυτή είναι η παλαιότερη υποστηριζόμενη έκδοση LTS
- Υποστηρίζονται επίσημα μόνο οι εκδόσεις που είναι ή θα γίνουν εκδόσεις LTS

Αν το Node δεν είναι εγκατεστημένο αυτή τη στιγμή στο σύστημά σας, προτείνουμε να χρησιμοποιήσετε ένα εργαλείο όπως το [NVM](https://github.com/creationix/nvm) ή το [Volta](https://volta.sh/) για να διαχειρίζεστε πολλαπλές ενεργές εκδόσεις του Node.js. Το NVM είναι δημοφιλής επιλογή, ενώ το Volta αποτελεί επίσης μια καλή εναλλακτική.

## Δείτε την εισαγωγή

<LiteYouTubeEmbed
    id="rA4IFNyW54c"
    title="Getting Started with WebdriverIO"
/>

Περισσότερα βίντεο θα βρείτε στο [επίσημο κανάλι YouTube](https://youtube.com/@webdriverio).

## Επόμενα βήματα

- Επιλέξτε την πλατφόρμα σας: [Web Browsers](/docs/platforms/web), [Mobile Apps](/docs/platforms/mobile), [Desktop Apps](/docs/platforms/desktop) ή [Extensions & Editors](/docs/platforms/apps-and-extensions)
- Μάθετε πώς να [επιλέγετε στοιχεία](/docs/selectors) και να γράφετε [assertions](/docs/assertion)
- Διαμορφώστε τον test runner στο [`wdio.conf.ts`](/docs/configurationfile)
- Λάβετε βοήθεια στο [Discord](https://discord.webdriver.io)