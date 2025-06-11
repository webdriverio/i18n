---
id: gettingstarted
title: Ξεκινώντας
---

Καλώς ήρθατε στην τεκμηρίωση του WebdriverIO. Θα σας βοηθήσει να ξεκινήσετε γρήγορα. Εάν αντιμετωπίσετε προβλήματα, μπορείτε να βρείτε βοήθεια και απαντήσεις στον [Διακομιστή Υποστήριξης Discord](https://discord.webdriver.io) ή μπορείτε να επικοινωνήσετε μαζί μου στο [Twitter](https://twitter.com/webdriverio).

:::info
Αυτή είναι η τεκμηρίωση για την τελευταία έκδοση (__>=9.x__) του WebdriverIO. Εάν χρησιμοποιείτε ακόμα παλαιότερη έκδοση, παρακαλώ επισκεφθείτε τους [παλιούς ιστότοπους τεκμηρίωσης](/versions)!
:::

<LiteYouTubeEmbed
    id="rA4IFNyW54c"
    title="Getting Started with WebdriverIO"
/>

:::tip Επίσημο Κανάλι YouTube 🎥

Μπορείτε να βρείτε περισσότερα βίντεο σχετικά με το WebdriverIO στο [επίσημο κανάλι YouTube](https://youtube.com/@webdriverio). Βεβαιωθείτε ότι έχετε εγγραφεί!

:::

## Ξεκινήστε μια εγκατάσταση WebdriverIO

Για να προσθέσετε μια πλήρη εγκατάσταση WebdriverIO σε υπάρχον ή νέο έργο χρησιμοποιώντας το [WebdriverIO Starter Toolkit](https://www.npmjs.com/package/create-wdio), εκτελέστε:

Εάν βρίσκεστε στον ριζικό κατάλογο ενός υπάρχοντος έργου, εκτελέστε:

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

Αυτή η μοναδική εντολή κατεβάζει το εργαλείο CLI του WebdriverIO και εκτελεί έναν οδηγό διαμόρφωσης που σας βοηθά να ρυθμίσετε την δοκιμαστική σας σουίτα.

<CreateProjectAnimation />

Ο οδηγός θα σας θέσει μια σειρά ερωτήσεων που σας καθοδηγούν στη ρύθμιση. Μπορείτε να περάσετε μια παράμετρο `--yes` για να επιλέξετε μια προεπιλεγμένη ρύθμιση που θα χρησιμοποιεί το Mocha με το Chrome χρησιμοποιώντας το μοτίβο [Page Object](https://martinfowler.com/bliki/PageObject.html).

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

## Εγκαταστήστε το CLI χειροκίνητα

Μπορείτε επίσης να προσθέσετε το πακέτο CLI στο έργο σας χειροκίνητα μέσω:

```sh
npm i --save-dev @wdio/cli
npx wdio --version # prints e.g. `8.13.10`

# run configuration wizard
npx wdio config
```

## Εκτέλεση δοκιμής

Μπορείτε να ξεκινήσετε τη σουίτα δοκιμών σας χρησιμοποιώντας την εντολή `run` και δείχνοντας στη διαμόρφωση WebdriverIO που μόλις δημιουργήσατε:

```sh
npx wdio run ./wdio.conf.js
```

Αν θέλετε να εκτελέσετε συγκεκριμένα αρχεία δοκιμών, μπορείτε να προσθέσετε μια παράμετρο `--spec`:

```sh
npx wdio run ./wdio.conf.js --spec example.e2e.js
```

ή ορίστε σουίτες στο αρχείο διαμόρφωσης και εκτελέστε μόνο τα αρχεία δοκιμών που ορίζονται σε μια σουίτα:

```sh
npx wdio run ./wdio.conf.js --suite exampleSuiteName
```

## Εκτέλεση σε script

Εάν θέλετε να χρησιμοποιήσετε το WebdriverIO ως μηχανή αυτοματισμού σε [Αυτόνομη Λειτουργία](/docs/setuptypes#standalone-mode) μέσα σε ένα script Node.JS, μπορείτε επίσης να εγκαταστήσετε απευθείας το WebdriverIO και να το χρησιμοποιήσετε ως πακέτο, π.χ. για να δημιουργήσετε ένα στιγμιότυπο οθόνης μιας ιστοσελίδας:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/fc362f2f8dd823d294b9bb5f92bd5991339d4591/getting-started/run-in-script.js#L2-L19
```

__Σημείωση:__ όλες οι εντολές WebdriverIO είναι ασύγχρονες και πρέπει να χειρίζονται σωστά χρησιμοποιώντας [`async/await`](https://javascript.info/async-await).

## Καταγραφή δοκιμών

Το WebdriverIO παρέχει εργαλεία για να σας βοηθήσει να ξεκινήσετε καταγράφοντας τις ενέργειες δοκιμών σας στην οθόνη και να δημιουργήσετε αυτόματα scripts δοκιμών WebdriverIO. Δείτε [Καταγραφή δοκιμών με το Chrome DevTools Recorder](/docs/record) για περισσότερες πληροφορίες.

## Απαιτήσεις συστήματος

Θα χρειαστείτε εγκατεστημένο το [Node.js](http://nodejs.org).

- Εγκαταστήστε τουλάχιστον την έκδοση v18.20.0 ή νεότερη καθώς αυτή είναι η παλαιότερη ενεργή έκδοση LTS
- Επίσημα υποστηρίζονται μόνο εκδόσεις που είναι ή θα γίνουν έκδοση LTS

Εάν το Node δεν είναι εγκατεστημένο στο σύστημά σας, προτείνουμε τη χρήση ενός εργαλείου όπως το [NVM](https://github.com/creationix/nvm) ή το [Volta](https://volta.sh/) για να βοηθήσει στη διαχείριση πολλαπλών ενεργών εκδόσεων Node.js. Το NVM είναι μια δημοφιλής επιλογή, ενώ το Volta είναι επίσης μια καλή εναλλακτική.