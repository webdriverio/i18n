---
id: web
title: Προγράμματα περιήγησης Web
description: Ρυθμίστε και εκτελέστε end-to-end δοκιμές, δοκιμές components, οπτικές δοκιμές και δοκιμές προσβασιμότητας με το WebdriverIO σε Chrome, Firefox, Microsoft Edge και Safari.
---

Το WebdriverIO αυτοματοποιεί προγράμματα περιήγησης desktop (Chrome, Chromium, Firefox, Microsoft Edge και Safari) μέσω τυπικών browser drivers. Από προεπιλογή, προσπαθεί να ανοίξει μια συνεδρία [WebDriver BiDi](/docs/automationProtocols), τον αμφίδρομο διάδοχο του κλασικού πρωτοκόλλου WebDriver. Το BiDi υποστηρίζει λειτουργίες όπως το network mocking και την εξομοίωση Web API. Ορίστε `wdio:enforceWebDriverClassic: true` στα capabilities σας για να το απενεργοποιήσετε. Δεν χρειάζεται να εγκαταστήσετε drivers μόνοι σας: ορίστε ένα `browserName` και το WebdriverIO κατεβάζει και εκκινεί τον αντίστοιχο Chromedriver, Geckodriver ή Edgedriver. Επίσης εγκαθιστά Chrome, Chromium ή Firefox όταν δεν βρεθεί τοπική εγκατάσταση. Ο Microsoft Edge πρέπει να είναι ήδη εγκατεστημένος, ενώ ο Safaridriver περιλαμβάνεται στο macOS. Ο ίδιος testrunner μπορεί επίσης να εκτελεί δοκιμές μέσα στο πρόγραμμα περιήγησης με τον Browser Runner. Αυτό καλύπτει unit tests και δοκιμές components για React, Vue, Svelte, SolidJS, Preact, Lit και Stencil.

## Γρήγορη εκκίνηση

Δημιουργήστε ένα project διαδραστικά με `npm init wdio@latest .`. Η παράμετρος `--yes` επιλέγει τις προεπιλογές: Mocha, Chrome και page objects. Για να ρυθμίσετε ένα project χειροκίνητα, εγκαταστήστε τον testrunner, έναν framework adapter, έναν reporter και το `tsx` για TypeScript:

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

```ts title="wdio.conf.ts"
export const config: WebdriverIO.Config = {
    runner: 'local',
    specs: ['./test/specs/**/*.ts'],
    maxInstances: 10,
    capabilities: [{
        browserName: 'chrome'
    }, {
        browserName: 'firefox'
    }],
    logLevel: 'info',
    waitforTimeout: 10000,
    framework: 'mocha',
    reporters: ['spec'],
    mochaOpts: {
        ui: 'bdd',
        timeout: 60000
    }
}
```

```ts title="test/specs/login.e2e.ts"
import { expect, browser, $ } from '@wdio/globals'

describe('My Login application', () => {
    it('should login with valid credentials', async () => {
        await browser.url('https://the-internet.herokuapp.com/login')

        await $('#username').setValue('tomsmith')
        await $('#password').setValue('SuperSecretPassword!')
        await $('button[type="submit"]').click()

        await expect($('#flash')).toBeExisting()
        await expect($('#flash')).toHaveText(
            expect.stringContaining('You logged into a secure area!'))
    })
})
```

```sh
npx wdio run ./wdio.conf.ts
```

Κάθε capability αποκτά τις δικές του worker processes, οπότε αυτό εκτελεί το spec τόσο σε Chrome όσο και σε Firefox. Άλλες έγκυρες τιμές για το `browserName` είναι `chromium`, `msedge` και `safari`. Για εκτέλεση σε headless λειτουργία, προσθέστε ορίσματα προγράμματος περιήγησης όπως `'goog:chromeOptions': { args: ['headless', 'disable-gpu'] }`. Δείτε το [Run Browser Headless](/docs/capabilities#run-browser-headless) για Firefox και Edge· ο Safari δεν διαθέτει headless λειτουργία.

## Επιλέξτε τη διαδρομή σας

End-to-end δοκιμές σε διάφορα προγράμματα περιήγησης:

- [Capabilities](/docs/capabilities): επιλογές προγράμματος περιήγησης, headless λειτουργία, κανάλια προγραμμάτων περιήγησης (Canary, Nightly, Safari Technology Preview) και επιλογές driver `wdio:*`.
- [Driver Binaries](/docs/driverbinaries): πώς λειτουργεί η αυτόματη ρύθμιση προγραμμάτων περιήγησης και drivers, και πώς να ορίσετε προσαρμοσμένα binaries.
- [Automation Protocols](/docs/automationProtocols): WebDriver έναντι WebDriver BiDi.
- [WebDriver BiDi commands](/docs/api/webdriverBidi): ακατέργαστες εντολές του πρωτοκόλλου BiDi διαθέσιμες στο αντικείμενο `browser`.
- [Selectors](/docs/selectors): CSS, κειμένου, ARIA, deep (shadow DOM) και React selectors.
- [Auto-waiting](/docs/autowait) και [Timeouts](/docs/timeouts): πώς το WebdriverIO περιμένει τα στοιχεία και τι μπορείτε να ρυθμίσετε.
- [Multi-remote](/docs/multiremote): ελέγξτε πολλά προγράμματα περιήγησης σε μία δοκιμή, π.χ. για εφαρμογές chat ή WebRTC.

Δυνατότητες προγράμματος περιήγησης που απαιτούν WebDriver BiDi (Chrome, Edge και Firefox· όχι Safari):

- [Request Mocks and Spies](/docs/mocksandspies): υποκλέψτε, τροποποιήστε ή αντικαταστήστε αιτήματα δικτύου με `browser.mock()`. Δείτε επίσης το [Mock object](/docs/api/mock).
- [Emulation](/docs/emulation): εξομοιώστε γεωγραφική θέση, media features, user agent, κατάσταση εκτός σύνδεσης, locale, ζώνη ώρας, οθόνη και συσκευές με `browser.emulate()`.

Δοκιμές components και unit tests σε πραγματικό πρόγραμμα περιήγησης:

- [Component Testing](/docs/component-testing): πώς λειτουργεί ο [Browser Runner](/docs/runner#browser-runner) που βασίζεται στο Vite και πώς να τον ρυθμίσετε.
- Οδηγοί για frameworks: [React](/docs/component-testing/react), [Vue.js](/docs/component-testing/vue), [Svelte](/docs/component-testing/svelte), [SolidJS](/docs/component-testing/solid), [Preact](/docs/component-testing/preact), [Lit](/docs/component-testing/lit), [Stencil](/docs/component-testing/stencil).
- [Mocking](/docs/component-testing/mocking) και [Coverage](/docs/component-testing/coverage) για δοκιμές components.

Οπτικές δοκιμές και δοκιμές προσβασιμότητας:

- [Visual Testing](/docs/visual-testing): σύγκριση εικόνων οθόνης, στοιχείων και ολόκληρης σελίδας με `@wdio/visual-service`.
- [Snapshot](/docs/snapshot): assertions με snapshots DOM και αντικειμένων.
- [Axe Core](/docs/accessibility-testing/axe-core): εκτελέστε σαρώσεις προσβασιμότητας Deque axe από τις δοκιμές σας.

Κλιμάκωση:

- [Selenium Grid](/docs/seleniumgrid), [Cloud Services](/docs/cloudservices) και [Docker](/docs/docker): εκτελέστε προγράμματα περιήγησης απομακρυσμένα.
- [Sharding](/docs/sharding): διαχωρίστε μια σουίτα σε πολλαπλά μηχανήματα CI.

Μια δοκιμή component χρησιμοποιεί το ίδιο αρχείο ρυθμίσεων με διαφορετικό runner. Για παράδειγμα, για να χρησιμοποιήσετε το React preset:

```ts title="wdio.conf.ts"
export const config: WebdriverIO.Config = {
    runner: ['browser', {
        preset: 'react'
    }],
    specs: ['./src/**/*.test.tsx'],
    capabilities: [{
        browserName: 'chrome'
    }],
    framework: 'mocha',
    reporters: ['spec']
}
```

Ο Browser Runner απαιτεί το `@wdio/browser-runner`. Το React preset χρειάζεται επίσης το `@vitejs/plugin-react`, και οι οδηγοί προτείνουν το `@testing-library/react` για το rendering. Υπάρχουν presets για `vue`, `svelte`, `solid`, `react`, `preact` και `stencil`. Για οτιδήποτε άλλο, χρησιμοποιήστε το `viteConfig`.

## Αντιμετώπιση προβλημάτων

- Ο Chrome αποτυγχάνει να εκκινήσει σε CI με το μήνυμα "user data directory is already in use" ή "DevToolsActivePort file doesn't exist": δείτε το [Headless & Display Servers](/docs/headless-and-display-servers#troubleshooting).
- Το `browser.mock()` ή το `browser.emulate()` δεν έχει κανένα αποτέλεσμα: η συνεδρία δεν χρησιμοποιεί WebDriver BiDi. Ελέγξτε το πρόγραμμα περιήγησής σας (ο Safari δεν υποστηρίζει BiDi), τον πάροχο cloud σας και το `wdio:enforceWebDriverClassic`.
- Οι drivers ή τα προγράμματα περιήγησης δεν μπορούν να ληφθούν πίσω από proxy: δείτε το [Custom Driver Download Host](/docs/capabilities#custom-driver-download-host) και το [Proxy Setup](/docs/proxy).
- Ασταθείς δοκιμές: δείτε το [Retry Flaky Tests](/docs/retry) και το [Debugging](/docs/debugging).

## Επόμενα βήματα

- Αναφορά [Configuration](/docs/configuration) για κάθε επιλογή του `wdio.conf.ts`.
- [TypeScript Setup](/docs/typescript) και [Frameworks](/docs/frameworks) (Mocha, Jasmine, Cucumber).
- [Page Object Pattern](/docs/pageobjects) για τη δόμηση μεγαλύτερων σουιτών.
- [MCP](/docs/mcp) για να επιτρέψετε σε έναν AI agent να χειρίζεται μια συνεδρία προγράμματος περιήγησης μέσω του WebdriverIO.
- Άλλες πλατφόρμες: [Mobile Apps](/docs/platforms/mobile), [Desktop Apps](/docs/platforms/desktop), [Extensions & Editors](/docs/platforms/apps-and-extensions).