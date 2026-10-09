---
id: configurationfile
title: Αρχείο Ρυθμίσεων
description: "Περιηγηθείτε σε ένα σχολιασμένο παράδειγμα wdio.conf.js που παραθέτει κάθε υποστηριζόμενη επιλογή του testrunner, capability και hook με επεξηγήσεις."
---

Το αρχείο ρυθμίσεων περιέχει όλες τις απαραίτητες πληροφορίες για την εκτέλεση της σουίτας δοκιμών σας. Είναι ένα module του NodeJS που εξάγει ένα JSON.

Ακολουθεί ένα παράδειγμα ρυθμίσεων με όλες τις υποστηριζόμενες ιδιότητες και πρόσθετες πληροφορίες:

```js
export const config = {

    // ==================================
    // Πού πρέπει να εκκινηθεί η δοκιμή σας
    // ==================================
    //
    runner: 'local',
    //
    // =====================
    // Ρυθμίσεις Διακομιστή
    // =====================
    // Διεύθυνση host του εκτελούμενου διακομιστή Selenium. Αυτή η πληροφορία συνήθως δεν χρειάζεται, καθώς
    // το WebdriverIO συνδέεται αυτόματα στο localhost. Επίσης, αν χρησιμοποιείτε μία από τις
    // υποστηριζόμενες υπηρεσίες cloud όπως Sauce Labs, Browserstack, Testing Bot ή TestMu AI (πρώην LambdaTest), επίσης δεν
    // χρειάζεται να ορίσετε πληροφορίες host και port (επειδή το WebdriverIO μπορεί να τις εντοπίσει
    // από τις πληροφορίες user και key). Ωστόσο, αν χρησιμοποιείτε ένα ιδιωτικό Selenium
    // backend, θα πρέπει να ορίσετε εδώ τα `hostname`, `port` και `path`.
    //
    hostname: 'localhost',
    port: 4444,
    path: '/',
    // Πρωτόκολλο: http | https
    // protocol: 'http',
    //
    // =================
    // Πάροχοι Υπηρεσιών
    // =================
    // Το WebdriverIO υποστηρίζει Sauce Labs, Browserstack, Testing Bot και TestMu AI (πρώην LambdaTest). (Και άλλοι πάροχοι cloud
    // θα πρέπει να λειτουργούν.) Αυτές οι υπηρεσίες ορίζουν συγκεκριμένες τιμές `user` και `key` (ή access key)
    // που πρέπει να βάλετε εδώ, ώστε να συνδεθείτε σε αυτές τις υπηρεσίες.
    //
    user: 'webdriverio',
    key:  'xxxxxxxxxxxxxxxx-xxxxxx-xxxxx-xxxxxxxxx',

    // Αν εκτελείτε τις δοκιμές σας στο Sauce Labs, μπορείτε να καθορίσετε την περιοχή στην οποία θέλετε να εκτελούνται οι δοκιμές
    // μέσω της ιδιότητας `region`. Οι διαθέσιμες συντομεύσεις για περιοχές είναι `us` (προεπιλογή) και `eu`.
    // Αυτές οι περιοχές χρησιμοποιούνται για το Sauce Labs VM cloud και το Sauce Labs Real Device Cloud.
    // Αν δεν δώσετε περιοχή, η προεπιλογή είναι `us`.
    region: 'us',
    //
    // Το Sauce Labs παρέχει μια [headless προσφορά](https://saucelabs.com/products/web-testing/sauce-headless-testing)
    // που σας επιτρέπει να εκτελείτε δοκιμές Chrome και Firefox σε headless λειτουργία.
    //
    headless: false,
    //
    // ==================
    // Καθορισμός Αρχείων Δοκιμών
    // ==================
    // Ορίστε ποια test specs πρέπει να εκτελεστούν. Το μοτίβο είναι σχετικό με τον κατάλογο
    // του αρχείου ρυθμίσεων που εκτελείται.
    //
    // Τα specs ορίζονται ως πίνακας αρχείων spec (προαιρετικά με χρήση wildcards
    // που θα επεκταθούν). Η δοκιμή για κάθε αρχείο spec θα εκτελεστεί σε ξεχωριστή
    // διεργασία worker. Για να εκτελεστεί μια ομάδα αρχείων spec στην ίδια διεργασία
    // worker, περικλείστε τα σε έναν πίνακα μέσα στον πίνακα specs.
    //
    // Η διαδρομή των αρχείων spec θα επιλυθεί σχετικά με τον κατάλογο
    // του αρχείου ρυθμίσεων, εκτός αν είναι απόλυτη.
    //
    specs: [
        'test/spec/**',
        ['group/spec/**']
    ],
    // Μοτίβα προς εξαίρεση.
    exclude: [
        'test/spec/multibrowser/**',
        'test/spec/mobile/**'
    ],
    //
    // ============
    // Capabilities
    // ============
    // Ορίστε εδώ τα capabilities σας. Το WebdriverIO μπορεί να εκτελεί πολλά capabilities ταυτόχρονα.
    // Ανάλογα με τον αριθμό των capabilities, το WebdriverIO εκκινεί αρκετές συνεδρίες
    // δοκιμών. Μέσα στα `capabilities` σας, μπορείτε να αντικαταστήσετε ποια αρχεία εκτελούνται με
    // `wdio:specs` και `wdio:exclude` ώστε να ομαδοποιήσετε συγκεκριμένα specs σε ένα συγκεκριμένο capability.
    //
    // Πρώτα, μπορείτε να ορίσετε πόσα instances πρέπει να ξεκινούν ταυτόχρονα. Ας
    // πούμε ότι έχετε 3 διαφορετικά capabilities (Chrome, Firefox και Safari) και έχετε
    // ορίσει το `maxInstances` σε 1. Το wdio θα δημιουργήσει 3 διεργασίες.
    //
    // Επομένως, αν έχετε 10 αρχεία spec και ορίσετε το `maxInstances` σε 10, όλα τα αρχεία spec
    // θα ελεγχθούν ταυτόχρονα και θα δημιουργηθούν 30 διεργασίες.
    //
    // Η ιδιότητα καθορίζει πόσα capabilities από την ίδια δοκιμή πρέπει να εκτελούν δοκιμές.
    //
    maxInstances: 10,
    //
    // Ή ορίστε ένα όριο για την εκτέλεση δοκιμών με ένα συγκεκριμένο capability.
    maxInstancesPerCapability: 10,
    //
    // Εισάγει τα globals του WebdriverIO (π.χ. `browser`, `$` και `$$`) στο global περιβάλλον.
    // Αν το ορίσετε σε `false`, θα πρέπει να κάνετε import από το `@wdio/globals`. Σημείωση: Το WebdriverIO δεν
    // χειρίζεται την εισαγωγή globals που αφορούν συγκεκριμένα test frameworks.
    //
    injectGlobals: true,
    //
    // Αν δυσκολεύεστε να συγκεντρώσετε όλα τα σημαντικά capabilities, δείτε τον
    // Sauce Labs platform configurator - ένα εξαιρετικό εργαλείο για τη ρύθμιση των capabilities σας:
    // https://docs.saucelabs.com/basics/platform-configurator
    //
    capabilities: [{
        browserName: 'chrome',
        'goog:chromeOptions': {
        // για να εκτελέσετε το chrome σε headless λειτουργία απαιτούνται οι παρακάτω σημαίες
        // (δείτε https://developers.google.com/web/updates/2017/04/headless-chrome)
        // args: ['--headless', '--disable-gpu'],
        }
        //
        // Παράμετρος για την παράβλεψη ορισμένων ή όλων των προεπιλεγμένων σημαιών
        // - αν η τιμή είναι true: παραβλέπονται όλες οι 'default flags' του DevTools και τα 'default arguments' του Puppeteer
        // - αν η τιμή είναι πίνακας: το DevTools φιλτράρει τα δοσμένα προεπιλεγμένα ορίσματα
        // 'wdio:devtoolsOptions': {
        //    ignoreDefaultArgs: true,
        //    ignoreDefaultArgs: ['--disable-sync', '--disable-extensions'],
        // }
    }, {
        // Το maxInstances μπορεί να αντικατασταθεί ανά capability. Έτσι, αν έχετε ένα εσωτερικό Selenium
        // grid με μόνο 5 διαθέσιμα instances firefox, μπορείτε να διασφαλίσετε ότι δεν θα ξεκινούν
        // περισσότερα από 5 instances ταυτόχρονα.
        'wdio:maxInstances': 5,
        browserName: 'firefox',
        'wdio:specs': [
            'test/ffOnly/*'
        ],
        'moz:firefoxOptions': {
          // σημαία για ενεργοποίηση της headless λειτουργίας του Firefox (δείτε https://github.com/mozilla/geckodriver/blob/master/README.md#firefox-capabilities για περισσότερες λεπτομέρειες σχετικά με το moz:firefoxOptions)
          // args: ['-headless']
        },
        // Αν παρέχεται το outputDir, το WebdriverIO μπορεί να καταγράφει τα logs συνεδρίας του driver
        // είναι δυνατό να ρυθμίσετε ποια logTypes θα εξαιρεθούν.
        // excludeDriverLogs: ['*'], // δώστε '*' για να εξαιρέσετε όλα τα logs συνεδρίας του driver
        excludeDriverLogs: ['bugreport', 'server'],
        //
        // Παράμετρος για την παράβλεψη ορισμένων ή όλων των προεπιλεγμένων ορισμάτων του Puppeteer
        // ignoreDefaultArgs: ['-foreground'], // ορίστε την τιμή σε true για να παραβλέψετε όλα τα προεπιλεγμένα ορίσματα
    }],
    //
    // Πρόσθετη λίστα ορισμάτων node που χρησιμοποιούνται κατά την εκκίνηση θυγατρικών διεργασιών
    execArgv: [],
    //
    // ===================
    // Ρυθμίσεις Δοκιμών
    // ===================
    // Ορίστε εδώ όλες τις επιλογές που σχετίζονται με το instance του WebdriverIO
    //
    // Επίπεδο λεπτομέρειας καταγραφής: trace | debug | info | warn | error | silent
    logLevel: 'info',
    //
    // Ορίστε συγκεκριμένα επίπεδα καταγραφής ανά logger
    // χρησιμοποιήστε το επίπεδο 'silent' για να απενεργοποιήσετε τον logger
    logLevels: {
        webdriver: 'info',
        '@wdio/appium-service': 'info'
    },
    //
    // Ορίστε τον κατάλογο στον οποίο θα αποθηκεύονται όλα τα logs
    outputDir: __dirname,
    //
    // Αν θέλετε να εκτελούνται οι δοκιμές σας μόνο μέχρι να αποτύχει ένας συγκεκριμένος αριθμός δοκιμών, χρησιμοποιήστε
    // το bail (η προεπιλογή είναι 0 - χωρίς διακοπή, εκτέλεση όλων των δοκιμών).
    bail: 0,
    //
    // Ορίστε ένα βασικό URL για να συντομεύσετε τις κλήσεις της εντολής `url()`. Αν η παράμετρος `url` ξεκινά
    // με `/`, το `baseUrl` προτάσσεται, χωρίς να περιλαμβάνεται το τμήμα διαδρομής του `baseUrl`.
    //
    // Αν η παράμετρος `url` ξεκινά χωρίς scheme ή `/` (όπως `some/path`), το `baseUrl`
    // προτάσσεται απευθείας.
    baseUrl: 'http://localhost:8080',
    //
    // Προεπιλεγμένο χρονικό όριο για όλες τις εντολές waitForXXX.
    waitforTimeout: 1000,
    //
    // Προσθέστε αρχεία προς παρακολούθηση (π.χ. κώδικα εφαρμογής ή page objects) όταν εκτελείτε την εντολή `wdio`
    // με τη σημαία `--watch`. Υποστηρίζεται το globbing.
    filesToWatch: [
        // π.χ. επανεκτέλεση δοκιμών αν αλλάξω τον κώδικα της εφαρμογής μου
        // './app/**/*.js'
    ],
    //
    // Framework με το οποίο θέλετε να εκτελείτε τα specs σας.
    // Υποστηρίζονται τα εξής: 'mocha', 'jasmine' και 'cucumber'
    // Δείτε επίσης: https://webdriver.io/docs/frameworks.html
    //
    // Βεβαιωθείτε ότι έχετε εγκαταστήσει το πακέτο προσαρμογέα wdio για το συγκεκριμένο framework πριν εκτελέσετε οποιαδήποτε δοκιμή.
    framework: 'mocha',
    //
    // Ο αριθμός των φορών που θα επαναληφθεί ολόκληρο το specfile όταν αποτυγχάνει στο σύνολό του
    specFileRetries: 1,
    // Καθυστέρηση σε δευτερόλεπτα μεταξύ των προσπαθειών επανάληψης του αρχείου spec
    specFileRetriesDelay: 0,
    // Αν τα αρχεία spec που επαναλαμβάνονται θα πρέπει να επαναληφθούν αμέσως ή να μετατεθούν στο τέλος της ουράς
    specFileRetriesDeferred: false,
    //
    // Test reporter για το stdout.
    // Ο μόνος που υποστηρίζεται από προεπιλογή είναι ο 'dot'
    // Δείτε επίσης: https://webdriver.io/docs/dot-reporter.html , και κάντε κλικ στο "Reporters" στην αριστερή στήλη
    reporters: [
        'dot',
        ['allure', {
            //
            // Αν χρησιμοποιείτε τον reporter "allure", θα πρέπει να ορίσετε τον κατάλογο όπου
            // το WebdriverIO θα αποθηκεύει όλες τις αναφορές allure.
            outputDir: './'
        }]
    ],
    //
    // Επιλογές που θα μεταβιβαστούν στο Mocha.
    // Δείτε την πλήρη λίστα στο: http://mochajs.org
    mochaOpts: {
        ui: 'bdd'
    },
    //
    // Επιλογές που θα μεταβιβαστούν στο Jasmine.
    // Δείτε επίσης: https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-jasmine-framework#jasmineopts-options
    jasmineOpts: {
        //
        // Προεπιλεγμένο χρονικό όριο του Jasmine
        defaultTimeoutInterval: 5000,
        //
        // Το framework Jasmine επιτρέπει την παρεμβολή σε κάθε assertion ώστε να καταγράφεται η κατάσταση της εφαρμογής
        // ή του ιστότοπου ανάλογα με το αποτέλεσμα. Για παράδειγμα, είναι αρκετά χρήσιμο να λαμβάνεται ένα στιγμιότυπο οθόνης κάθε φορά
        // που αποτυγχάνει ένα assertion.
        expectationResultHandler: function(passed, assertion) {
            // κάντε κάτι
        },
        //
        // Αξιοποιήστε τη λειτουργικότητα grep που είναι ειδική για το Jasmine
        grep: null,
        invertGrep: null
    },
    //
    // Αν χρησιμοποιείτε το Cucumber, πρέπει να καθορίσετε πού βρίσκονται οι ορισμοί των βημάτων σας.
    // Δείτε επίσης: https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-cucumber-framework#cucumberopts-options
    cucumberOpts: {
        require: [],        // <string[]> (file/dir) φόρτωση αρχείων πριν από την εκτέλεση των features
        backtrace: false,   // <boolean> εμφάνιση πλήρους backtrace για σφάλματα
        compiler: [],       // <string[]> ("extension:module") φόρτωση αρχείων με τη δοσμένη EXTENSION μετά τη φόρτωση του MODULE (επαναλαμβανόμενο)
        dryRun: false,      // <boolean> κλήση των formatters χωρίς εκτέλεση βημάτων
        failFast: false,    // <boolean> διακοπή της εκτέλεσης στην πρώτη αποτυχία
        snippets: true,     // <boolean> απόκρυψη αποσπασμάτων ορισμών βημάτων για εκκρεμή βήματα
        source: true,       // <boolean> απόκρυψη URIs πηγής
        strict: false,      // <boolean> αποτυχία αν υπάρχουν μη ορισμένα ή εκκρεμή βήματα
        tags: '',           // <string> (expression) εκτέλεση μόνο των features ή scenarios με tags που ταιριάζουν στην έκφραση
        timeout: 20000,     // <number> χρονικό όριο για τους ορισμούς βημάτων
        ignoreUndefinedDefinitions: false, // <boolean> Ενεργοποιήστε αυτή τη ρύθμιση για να αντιμετωπίζονται οι μη ορισμένοι ορισμοί ως προειδοποιήσεις.
        scenarioLevelReporter: false // Ενεργοποιήστε το ώστε το webdriver.io να συμπεριφέρεται σαν τα scenarios και όχι τα βήματα να είναι οι δοκιμές.
    },
    // Καθορίστε μια προσαρμοσμένη διαδρομή tsconfig - το WDIO χρησιμοποιεί το `tsx` για τη μεταγλώττιση αρχείων TypeScript
    // Το TSConfig σας εντοπίζεται αυτόματα από τον τρέχοντα κατάλογο εργασίας
    // αλλά μπορείτε να καθορίσετε μια προσαρμοσμένη διαδρομή εδώ ή ορίζοντας τη μεταβλητή περιβάλλοντος TSX_TSCONFIG_PATH
    // Δείτε την τεκμηρίωση του `tsx`: https://tsx.is/dev-api/node-cli#custom-tsconfig-json-path
    //
    // Σημείωση: Αυτή η ρύθμιση θα παρακαμφθεί από τη μεταβλητή περιβάλλοντος TSX_TSCONFIG_PATH ή/και το όρισμα cli --tsConfigPath αν έχουν καθοριστεί.
    // Αυτή η ρύθμιση θα αγνοηθεί αν το node δεν μπορεί να αναλύσει το αρχείο wdio.conf.ts χωρίς βοήθεια από το tsx, π.χ. αν έχετε
    // ρυθμίσει path aliases στο tsconfig.json και χρησιμοποιείτε αυτά τα path aliases μέσα στο αρχείο wdio.config.ts.
    // Χρησιμοποιήστε το μόνο αν χρησιμοποιείτε αρχείο ρυθμίσεων .js ή αν το αρχείο ρυθμίσεων .ts είναι έγκυρη JavaScript.
    tsConfigPath: 'path/to/tsconfig.json',
    //
    // =====
    // Hooks
    // =====
    // Το WebdriverIO παρέχει αρκετά hooks που μπορείτε να χρησιμοποιήσετε για να παρέμβετε στη διαδικασία δοκιμών ώστε να τη βελτιώσετε
    // και να δημιουργήσετε υπηρεσίες γύρω από αυτήν. Μπορείτε να εφαρμόσετε είτε μία μόνο συνάρτηση είτε έναν πίνακα
    // μεθόδων. Αν μία από αυτές επιστρέψει ένα promise, το WebdriverIO θα περιμένει μέχρι να επιλυθεί αυτό το promise
    // για να συνεχίσει.
    //
    /**
     * Εκτελείται μία φορά πριν εκκινηθούν όλοι οι workers.
     * @param {object} config αντικείμενο ρυθμίσεων wdio
     * @param {Array.<Object>} capabilities λίστα με λεπτομέρειες capabilities
     */
    onPrepare: function (config, capabilities) {
    },
    /**
     * Εκτελείται πριν δημιουργηθεί μια διεργασία worker και μπορεί να χρησιμοποιηθεί για την αρχικοποίηση συγκεκριμένης υπηρεσίας
     * για αυτόν τον worker καθώς και για την τροποποίηση περιβαλλόντων εκτέλεσης με ασύγχρονο τρόπο.
     * @param  {string} cid      capability id (π.χ. 0-0)
     * @param  {object} caps     αντικείμενο που περιέχει τα capabilities για τη συνεδρία που θα δημιουργηθεί στον worker
     * @param  {object} specs    specs που θα εκτελεστούν στη διεργασία worker
     * @param  {object} args     αντικείμενο που θα συγχωνευθεί με τις κύριες ρυθμίσεις μόλις αρχικοποιηθεί ο worker
     * @param  {object} execArgv λίστα ορισμάτων string που μεταβιβάζονται στη διεργασία worker
     */
    onWorkerStart: function (cid, caps, specs, args, execArgv) {
    },
    /**
     * Εκτελείται αφού τερματιστεί μια διεργασία worker.
     * @param  {string} cid      capability id (π.χ. 0-0)
     * @param  {number} exitCode 0 - επιτυχία, 1 - αποτυχία
     * @param  {object} specs    specs που θα εκτελεστούν στη διεργασία worker
     * @param  {number} retries  αριθμός επαναλήψεων που χρησιμοποιήθηκαν
     */
    onWorkerEnd: function (cid, exitCode, specs, retries) {
    },
    /**
     * Εκτελείται πριν από την αρχικοποίηση της συνεδρίας webdriver και του test framework. Σας επιτρέπει
     * να χειριστείτε τις ρυθμίσεις ανάλογα με το capability ή το spec.
     * @param {object} config αντικείμενο ρυθμίσεων wdio
     * @param {Array.<Object>} capabilities λίστα με λεπτομέρειες capabilities
     * @param {Array.<String>} specs Λίστα διαδρομών αρχείων spec που πρόκειται να εκτελεστούν
     */
    beforeSession: function (config, capabilities, specs) {
    },
    /**
     * Εκτελείται πριν ξεκινήσει η εκτέλεση των δοκιμών. Σε αυτό το σημείο έχετε πρόσβαση σε όλες τις global
     * μεταβλητές όπως το `browser`. Είναι το ιδανικό σημείο για τον ορισμό προσαρμοσμένων εντολών.
     * @param {Array.<Object>} capabilities λίστα με λεπτομέρειες capabilities
     * @param {Array.<String>} specs        Λίστα διαδρομών αρχείων spec που πρόκειται να εκτελεστούν
     * @param {object}         browser      instance της δημιουργημένης συνεδρίας browser/συσκευής
     */
    before: function (capabilities, specs, browser) {
    },
    /**
     * Εκτελείται πριν ξεκινήσει η σουίτα (μόνο σε Mocha/Jasmine).
     * @param {object} suite λεπτομέρειες σουίτας
     */
    beforeSuite: function (suite) {
    },
    /**
     * Αυτό το hook εκτελείται _πριν_ ξεκινήσει κάθε hook μέσα στη σουίτα.
     * (Για παράδειγμα, εκτελείται πριν από την κλήση των `before`, `beforeEach`, `after`, `afterEach` στο Mocha.). Στο Cucumber το `context` είναι το αντικείμενο World.
     *
     */
    beforeHook: function (test, context, hookName) {
    },
    /**
     * Hook που εκτελείται _μετά_ το τέλος κάθε hook μέσα στη σουίτα.
     * (Για παράδειγμα, εκτελείται μετά την κλήση των `before`, `beforeEach`, `after`, `afterEach` στο Mocha.). Στο Cucumber το `context` είναι το αντικείμενο World.
     */
    afterHook: function (test, context, { error, result, duration, passed, retries }, hookName) {
    },
    /**
     * Συνάρτηση που εκτελείται πριν από μια δοκιμή (μόνο σε Mocha/Jasmine)
     * @param {object} test    αντικείμενο δοκιμής
     * @param {object} context αντικείμενο εμβέλειας με το οποίο εκτελέστηκε η δοκιμή
     */
    beforeTest: function (test, context) {
    },
    /**
     * Εκτελείται πριν από την εκτέλεση μιας εντολής WebdriverIO.
     * @param {string} commandName όνομα εντολής του hook
     * @param {Array} args ορίσματα που θα λάμβανε η εντολή
     */
    beforeCommand: function (commandName, args) {
    },
    /**
     * Εκτελείται μετά την εκτέλεση μιας εντολής WebdriverIO
     * @param {string} commandName όνομα εντολής του hook
     * @param {Array} args ορίσματα που θα λάμβανε η εντολή
     * @param {*} result αποτέλεσμα της εντολής
     * @param {Error} error αντικείμενο σφάλματος, αν υπάρχει
     */
    afterCommand: function (commandName, args, result, error) {
    },
    /**
     * Συνάρτηση που εκτελείται μετά από μια δοκιμή (μόνο σε Mocha/Jasmine)
     * @param {object}  test             αντικείμενο δοκιμής
     * @param {object}  context          αντικείμενο εμβέλειας με το οποίο εκτελέστηκε η δοκιμή
     * @param {Error}   result.error     αντικείμενο σφάλματος σε περίπτωση αποτυχίας της δοκιμής, διαφορετικά `undefined`
     * @param {*}       result.result    αντικείμενο επιστροφής της συνάρτησης δοκιμής
     * @param {number}  result.duration  διάρκεια της δοκιμής
     * @param {boolean} result.passed    true αν η δοκιμή πέρασε, διαφορετικά false
     * @param {object}  result.retries   πληροφορίες για επαναλήψεις σχετικές με το spec, π.χ. `{ attempts: 0, limit: 0 }`
     */
    afterTest: function (test, context, { error, result, duration, passed, retries }) {
    },
    /**
     * Hook που εκτελείται αφού τελειώσει η σουίτα (μόνο σε Mocha/Jasmine).
     * @param {object} suite λεπτομέρειες σουίτας
     */
    afterSuite: function (suite) {
    },
    /**
     * Εκτελείται αφού ολοκληρωθούν όλες οι δοκιμές. Εξακολουθείτε να έχετε πρόσβαση σε όλες τις global μεταβλητές από
     * τη δοκιμή.
     * @param {number} result 0 - επιτυχία δοκιμής, 1 - αποτυχία δοκιμής
     * @param {Array.<Object>} capabilities λίστα με λεπτομέρειες capabilities
     * @param {Array.<String>} specs Λίστα διαδρομών αρχείων spec που εκτελέστηκαν
     */
    after: function (result, capabilities, specs) {
    },
    /**
     * Εκτελείται αμέσως μετά τον τερματισμό της συνεδρίας webdriver.
     * @param {object} config αντικείμενο ρυθμίσεων wdio
     * @param {Array.<Object>} capabilities λίστα με λεπτομέρειες capabilities
     * @param {Array.<String>} specs Λίστα διαδρομών αρχείων spec που εκτελέστηκαν
     */
    afterSession: function (config, capabilities, specs) {
    },
    /**
     * Εκτελείται αφού τερματιστούν όλοι οι workers και η διεργασία πρόκειται να τερματιστεί.
     * Ένα σφάλμα που προκύπτει στο hook `onComplete` θα οδηγήσει σε αποτυχία της εκτέλεσης δοκιμών.
     * @param {object} exitCode 0 - επιτυχία, 1 - αποτυχία
     * @param {object} config αντικείμενο ρυθμίσεων wdio
     * @param {Array.<Object>} capabilities λίστα με λεπτομέρειες capabilities
     * @param {<Object>} results αντικείμενο που περιέχει τα αποτελέσματα των δοκιμών
     */
    onComplete: function (exitCode, config, capabilities, results) {
    },
    /**
    * Εκτελείται όταν συμβαίνει ανανέωση.
    * @param {string} oldSessionId session ID της παλιάς συνεδρίας
    * @param {string} newSessionId session ID της νέας συνεδρίας
    */
    onReload: function(oldSessionId, newSessionId) {
    },
    /**
     * Hooks του Cucumber
     *
     * Εκτελείται πριν από ένα Feature του Cucumber.
     * @param {string}                   uri      διαδρομή προς το αρχείο feature
     * @param {GherkinDocument.IFeature} feature  αντικείμενο feature του Cucumber
     */
    beforeFeature: function (uri, feature) {
    },
    /**
     *
     * Εκτελείται πριν από ένα Scenario του Cucumber.
     * @param {ITestCaseHookParameter} world    αντικείμενο world που περιέχει πληροφορίες για το pickle και το βήμα δοκιμής
     * @param {object}                 context  αντικείμενο World του Cucumber
     */
    beforeScenario: function (world, context) {
    },
    /**
     *
     * Εκτελείται πριν από ένα Step του Cucumber.
     * @param {Pickle.IPickleStep} step     δεδομένα βήματος
     * @param {IPickle}            scenario pickle του scenario
     * @param {object}             context  αντικείμενο World του Cucumber
     */
    beforeStep: function (step, scenario, context) {
    },
    /**
     *
     * Εκτελείται μετά από ένα Step του Cucumber.
     * @param {Pickle.IPickleStep} step             δεδομένα βήματος
     * @param {IPickle}            scenario         pickle του scenario
     * @param {object}             result           αντικείμενο αποτελεσμάτων που περιέχει τα αποτελέσματα του scenario
     * @param {boolean}            result.passed    true αν το scenario πέρασε
     * @param {string}             result.error     stack σφάλματος αν το scenario απέτυχε
     * @param {number}             result.duration  διάρκεια του scenario σε χιλιοστά του δευτερολέπτου
     * @param {object}             context          αντικείμενο World του Cucumber
     */
    afterStep: function (step, scenario, result, context) {
    },
    /**
     *
     * Εκτελείται μετά από ένα Scenario του Cucumber.
     * @param {ITestCaseHookParameter} world            αντικείμενο world που περιέχει πληροφορίες για το pickle και το βήμα δοκιμής
     * @param {object}                 result           αντικείμενο αποτελεσμάτων που περιέχει τα αποτελέσματα του scenario `{passed: boolean, error: string, duration: number}`
     * @param {boolean}                result.passed    true αν το scenario πέρασε
     * @param {string}                 result.error     stack σφάλματος αν το scenario απέτυχε
     * @param {number}                 result.duration  διάρκεια του scenario σε χιλιοστά του δευτερολέπτου
     * @param {object}                 context          αντικείμενο World του Cucumber
     */
    afterScenario: function (world, result, context) {
    },
    /**
     *
     * Εκτελείται μετά από ένα Feature του Cucumber.
     * @param {string}                   uri      διαδρομή προς το αρχείο feature
     * @param {GherkinDocument.IFeature} feature  αντικείμενο feature του Cucumber
     */
    afterFeature: function (uri, feature) {
    },
    /**
     * Εκτελείται πριν η βιβλιοθήκη assertions του WebdriverIO εκτελέσει ένα assertion.
     * @param {object} params                 πληροφορίες assertion
     * @param {string} params.matcherName     όνομα του matcher που κάλεσε η δοκιμή (για alias, το όνομα του alias)
     * @param {*}      params.expectedValue   τιμή που μεταβιβάζεται στον matcher
     * @param {object} params.options         επιλογές assertion
     */
    beforeAssertion: function (params) {
    },
    /**
     * Εκτελείται αφού η βιβλιοθήκη assertions του WebdriverIO εκτελέσει ένα assertion.
     * @param {object} params                 πληροφορίες assertion, ίδιες με αυτές του `beforeAssertion`
     * @param {object} params.result          αποτέλεσμα του matcher, με `pass` (boolean) και `message()`.
     *                                        το `pass` είναι true όταν η τιμή ταιριάζει, επίσης με `.not`
     */
    afterAssertion: function (params) {
    }
}
```

Μπορείτε επίσης να βρείτε ένα αρχείο με όλες τις πιθανές επιλογές και παραλλαγές στον [φάκελο παραδειγμάτων](https://github.com/webdriverio/webdriverio/blob/main/examples/wdio.conf.js).