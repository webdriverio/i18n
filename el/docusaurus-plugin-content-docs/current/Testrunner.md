---
id: testrunner
title: Testrunner
description: "Εγκαταστήστε τον WDIO testrunner από το @wdio/cli και χρησιμοποιήστε τις εντολές config, run, install, repl και session για να ρυθμίσετε και να εκτελέσετε σουίτες δοκιμών."
---

Ο testrunner του WebdriverIO εκτελεί τη σουίτα δοκιμών σας από ένα αρχείο διαμόρφωσης. Ξεκινά έναν worker ανά capability, συνδέει το framework, τα services και τους reporters σας, και εκτελεί τα specs παράλληλα. Χρησιμοποιήστε τον για κάθε έργο δοκιμών· χρησιμοποιήστε τη [standalone λειτουργία](/docs/setuptypes) μόνο όταν ενσωματώνετε το WebdriverIO στα δικά σας εργαλεία.

Ο testrunner περιλαμβάνεται στο πακέτο `@wdio/cli`:

```sh npm2yarn
npm install --save-dev @wdio/cli
```

Το `npx wdio` εκτελεί το ίδιο CLI όταν το `@wdio/cli` δεν έχει εγκατασταθεί ακόμα. Το npm εγκαθιστά το πακέτο χωρίς scope [`wdio`](https://www.npmjs.com/package/wdio), και αυτό το πακέτο εκκινεί το `@wdio/cli`.

Για να ρυθμίσετε ένα νέο έργο, εκτελέστε τον οδηγό διαμόρφωσης. Κάνει μερικές ερωτήσεις, εγκαθιστά τα πακέτα και γράφει ένα `wdio.conf.ts`:

```sh
npx wdio config
```

Στη συνέχεια εκτελέστε τις δοκιμές σας:

```sh
npx wdio run wdio.conf.ts
```

Το `run` είναι η προεπιλεγμένη εντολή, επομένως το `npx wdio wdio.conf.ts` κάνει το ίδιο. Στα specs σας, κάντε import τη συνεδρία από το `@wdio/globals`:

```ts title="test/specs/example.e2e.ts"
import { browser, $, expect } from '@wdio/globals'

describe('webdriver.io', () => {
    it('has a title', async () => {
        await browser.url('https://webdriver.io')
        await expect(browser).toHaveTitle(expect.stringContaining('WebdriverIO'))
    })
})
```

Δείτε το [Αρχείο Διαμόρφωσης](/docs/configurationfile) για κάθε επιλογή του `wdio.conf.ts`.

## Εντολές

```sh
$ npx wdio --help

wdio [command]

Commands:
  wdio config                           Initialize WebdriverIO and setup
                                        configuration in your current project.
  wdio install <type> <name>            Add a `reporter`, `service`, or
                                        `framework` to your WebdriverIO project.
  wdio repl [option] [capabilities]     Run WebDriver session in command line
  wdio run <configPath>                 Run your WDIO configuration file to
                                        initialize your tests. (default)
  wdio session [action..]               Drive a browser, mobile app or desktop
                                        app from the shell

Options:
  --help     Show help                                                 [boolean]
  --version  Show version number                                       [boolean]
```

Κάθε εντολή εμφανίζει τις δικές της επιλογές με το `--help`, π.χ. `npx wdio run --help`.

### `wdio config`

Η εντολή `config` εκτελεί τον οδηγό διαμόρφωσης και δημιουργεί ένα `wdio.conf.ts` (ή `wdio.conf.js`) με βάση τις απαντήσεις σας.

```sh
npx wdio config
```

Περάστε το `--yes` για να χρησιμοποιήσετε τις προεπιλογές (Mocha, Chrome και page objects) χωρίς ερωτήσεις. Κάθε ερώτηση του οδηγού έχει επίσης ένα flag, ώστε να μπορείτε να απαντήσετε σε μερικές ή σε όλες από τη γραμμή εντολών:

```sh
npx wdio config --yes --framework cucumber --no-typescript --reporters spec,junit
```

Επιλογές:

```
-y, --yes      will fill in all config defaults without prompting
                                                      [boolean] [default: false]
-t, --npmTag   define NPM tag to use for WebdriverIO related packages
                                                    [string] [default: "latest"]
    --help     Show help, including a flag for every wizard question   [boolean]
```

Ο οδηγός εγκαθιστά πακέτα με τον package manager που τον εκτελεί: το `pnpm wdio config` χρησιμοποιεί pnpm, το `yarn wdio config` χρησιμοποιεί Yarn, και το `npx` χρησιμοποιεί npm.

Το `npx wdio config --help` παραθέτει τα flags του οδηγού και τις τιμές που δέχονται. Ένα flag για ερώτηση που ο οδηγός δεν κάνει για τη δική σας ρύθμιση αποτελεί σφάλμα, όπως και μια τιμή που δεν προσφέρει. Δείτε το [Απαντήστε στον οδηγό με flags](/docs/gettingstarted#answer-the-wizard-with-flags) για παραδείγματα.

### `wdio run`

> Αυτή είναι η προεπιλεγμένη εντολή για την εκτέλεση της διαμόρφωσής σας.

Η εντολή `run` φορτώνει το αρχείο διαμόρφωσής σας και εκτελεί τις δοκιμές σας. Οι επιλογές της γραμμής εντολών υπερισχύουν των αντίστοιχων επιλογών στο αρχείο διαμόρφωσης.

```sh
npx wdio run wdio.conf.ts --spec test/specs/login.e2e.ts
```

Επιλογές:

```
    --watch            Run WebdriverIO in watch mode                   [boolean]
-h, --hostname         automation driver host address                   [string]
-p, --port             automation driver port                           [number]
    --path             path to WebDriver endpoints (default "/")        [string]
-u, --user             username if using a cloud service as automation backend
                                                                        [string]
-k, --key              corresponding access key to the user             [string]
-l, --logLevel         level of logging verbosity
                [choices: "trace", "debug", "info", "warn", "error", "silent"]
    --bail             stop test runner after specific amount of tests have
                       failed                                           [number]
    --baseUrl          shorten url command calls by setting a base url  [string]
-w, --waitforTimeout   timeout for all waitForXXX commands              [number]
-s, --updateSnapshots  update DOM, image or test snapshots              [string]
-f, --framework        defines the framework (Mocha, Jasmine or Cucumber) to
                       run the specs                                    [string]
-r, --reporters        reporters to print out the results on stdout      [array]
    --suite            overwrites the specs attribute and runs the defined
                       suite                                             [array]
    --spec             run only a certain spec file or wildcard - overrides
                       specs piped from stdin                            [array]
    --exclude          exclude certain spec file or wildcard from the test run
                       - overrides exclude piped from stdin              [array]
    --repeat           Repeat specific specs and/or suites N times      [number]
    --mochaOpts        Mocha options
    --jasmineOpts      Jasmine options
    --cucumberOpts     Cucumber options
    --coverage         Enable coverage for browser runner
    --headless         run all browser instances in headless mode, overrides
                       capability settings in wdio.conf.js             [boolean]
    --shard            Shard tests and execute only the selected shard.
                       Specify in the one-based form like `--shard x/y`, where
                       x is the current and y the total shard.
    --cpuProf          Enable Node.js CPU profiling for worker processes
                       (--cpu-prof)                                    [boolean]
    --heapProf         Enable Node.js heap profiling for worker processes
                       (--heap-prof)                                   [boolean]
    --debug            Pause failing tests and browser.debug() in an agent
                       session. Only `agent` is supported
                                                   [string] [choices: "agent"]
    --tsConfigPath     custom path for `tsconfig.json`                  [string]
```

Παραδείγματα:

```sh
# εκτέλεση μίας σουίτας
npx wdio run wdio.conf.ts --suite login

# εκτέλεση του πρώτου από τέσσερα shards, π.χ. σε ένα CI matrix
npx wdio run wdio.conf.ts --shard 1/4

# εκτέλεση όλων των browsers σε headless λειτουργία, ή επιβολή headed λειτουργίας
npx wdio run wdio.conf.ts --headless
npx wdio run wdio.conf.ts --headless=false

# ορισμός επιλογών framework με dot notation
npx wdio run wdio.conf.ts --mochaOpts.timeout 60000

# εκτέλεση ενός σεναρίου Cucumber βάσει αριθμού γραμμής
npx wdio run wdio.conf.ts --spec ./features/login.feature:5

# χρήση προσαρμοσμένου tsconfig.json
npx wdio run wdio.conf.ts --tsConfigPath=./configs/bdd-tsconfig.json

# παύση αποτυχημένων δοκιμών και του browser.debug() ώστε ένας coding agent να μπορεί να τα επιθεωρήσει
npx wdio run wdio.conf.ts --debug=agent
```

Το `--tsConfigPath` υπερισχύει της ρύθμισης [`tsConfigPath`](/docs/configurationfile) της διαμόρφωσής σας. Δείτε το [TypeScript](/docs/typescript) για το πώς το WebdriverIO μεταγλωττίζει τα specs σας με το `tsx`.

### `wdio install`

Η εντολή `install` προσθέτει έναν reporter, service, framework, plugin ή runner σε ένα υπάρχον έργο. Εγκαθιστά το πακέτο, το προσθέτει στο `package.json` σας και ενημερώνει το αρχείο διαμόρφωσής σας.

```sh
npx wdio install service sauce        # εγκαθιστά το @wdio/sauce-service
npx wdio install reporter dot         # εγκαθιστά το @wdio/dot-reporter
npx wdio install framework mocha      # εγκαθιστά το @wdio/mocha-framework
```

Τα πακέτα εγκαθίστανται με τον package manager που εκτελεί την εντολή, επομένως το `pnpm wdio install reporter dot` εγκαθιστά με pnpm και το `yarn wdio install reporter dot` με Yarn. Το `npx` και οι απευθείας κλήσεις χρησιμοποιούν npm.

Αν το αρχείο διαμόρφωσής σας δεν είναι το `wdio.conf.(js|ts|cjs|mjs)` στον τρέχοντα φάκελο, περάστε τη θέση του:

```sh
npx wdio install service sauce --config="./path/to/wdio.conf.ts"
```

Το `npx wdio install --help` εμφανίζει κάθε υποστηριζόμενο πακέτο μαζί με το όνομά του στο npm.

#### Λίστα υποστηριζόμενων services

```
visual, ai, vite, nuxt, firefox-profile, gmail, sauce, testingbot,
browserstack, lighthouse, vscode, electron, tauri, tauri-plugin, dioxus,
appium, camera, eslinter, lambdatest, tvlabs, zafira-listener, reportportal,
docker, ui5, wiremock, ng-apimock, slack, cucumber-viewport-logger, intercept,
novus-visual-regression, rerun, winappdriver, ywinappdriver, performancetotal,
cleanuptotal, aws-device-farm, ms-teams, tesults, azure-devops, google-chat,
qmate-service, robonut, qunit, roku, obsidian, null-driver
```

#### Λίστα υποστηριζόμενων reporters

```
spec, dot, junit, allure, sumologic, concise, json, reportportal, video,
cucumberjs-json, mochawesome, timeline, html-nice, slack, teamcity, delta,
testrail, light, jsonhtml
```

#### Λίστα υποστηριζόμενων frameworks

```
mocha, jasmine, cucumber
```

#### Λίστα υποστηριζόμενων plugins και runners

```
plugin: wait-for, harness, testing-library
runner: local, browser
```

### `wdio repl`

Η εντολή `repl` ξεκινά μια συνεδρία WebDriver και ανοίγει ένα διαδραστικό prompt όπου εκτελείτε εντολές WebdriverIO. Χρησιμοποιήστε την για να δοκιμάσετε selectors και εντολές χωρίς να γράψετε spec. Δείτε το [Διεπαφή REPL](/docs/repl) για περισσότερα.

Εκκίνηση ενός τοπικού Chrome:

```sh
npx wdio repl chrome
```

Εκτέλεση στο cloud του Sauce Labs:

```sh
npx wdio repl chrome --user $SAUCE_USERNAME --key $SAUCE_ACCESS_KEY
```

Χρησιμοποιήστε ένα capability από το αρχείο διαμόρφωσής σας, με βάση τον δείκτη ή το όνομα multi-remote:

```sh
npx wdio repl ./wdio.conf.ts 0 -p 9515
```

Συνδεθείτε σε μια εκτελούμενη [`wdio session`](/docs/session) αντί να ξεκινήσετε νέο browser:

```sh
npx wdio repl --session default
```

Το `repl` δέχεται τις επιλογές σύνδεσης της [εντολής run](#wdio-run) (`--hostname`, `--port`, `--path`, `--user`, `--key`, `--logLevel`, ...) και αυτές τις επιλογές για κινητές συσκευές. Χρησιμοποιήστε τις μακριές μορφές `--user` και `--udid`: το `-u` είναι το σύντομο ψευδώνυμο και των δύο.

```
-v, --platformVersion  Version of OS for mobile devices                 [string]
-d, --deviceName       Device name for mobile devices                   [string]
    --udid             UDID of real mobile devices                      [string]
-s, --session          Attach to a running `wdio session` instead of starting a
                       browser                                          [string]
```

### `wdio session`

Η εντολή `session` χειρίζεται έναν browser, μια εφαρμογή κινητού ή μια εφαρμογή desktop από το shell, μία εντολή ανά κλήση. Έχει σχεδιαστεί για coding agents: ανοίγουν μια συνεδρία, λαμβάνουν snapshots, κάνουν κλικ και πληκτρολογούν, και εξάγουν όσα έκαναν ως δοκιμή. Δείτε το [wdio session](/docs/session) για τη ροή εργασίας και το [εντολές wdio session](/docs/session-commands) για κάθε ενέργεια.

```sh
npx wdio session --help
```

## Επόμενα βήματα

- [Αρχείο Διαμόρφωσης](/docs/configurationfile): κάθε επιλογή του `wdio.conf.ts`
- [Ξεκινώντας](/docs/gettingstarted): ρυθμίστε ένα έργο με τον οδηγό
- [Διεπαφή REPL](/docs/repl): αποσφαλματώστε εντολές διαδραστικά
- [wdio session](/docs/session): χειριστείτε έναν browser από το shell ή έναν agent