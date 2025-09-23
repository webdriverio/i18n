---
id: testrunner
title: Δοκιμαστής
---

Το WebdriverIO διαθέτει τον δικό του δοκιμαστή για να σας βοηθήσει να ξεκινήσετε τις δοκιμές όσο το δυνατόν πιο γρήγορα. Υποτίθεται ότι κάνει όλη τη δουλειά για εσάς, επιτρέπει την ενσωμάτωση σε υπηρεσίες τρίτων και σας βοηθά να εκτελείτε τις δοκιμές σας όσο το δυνατόν πιο αποτελεσματικά.

Ο δοκιμαστής του WebdriverIO είναι συσκευασμένος ξεχωριστά στο πακέτο NPM `@wdio/cli`.

Εγκαταστήστε το ως εξής:

```sh npm2yarn
npm install @wdio/cli
```

Για να δείτε τη βοήθεια της διεπαφής γραμμής εντολών, πληκτρολογήστε την ακόλουθη εντολή στο τερματικό σας:

```sh
$ npx wdio --help

wdio <command>

Commands:
  wdio config                           Initialize WebdriverIO and setup configuration in
                                        your current project.
  wdio install <type> <name>            Add a `reporter`, `service`, or `framework` to
                                        your WebdriverIO project
  wdio repl <option> [capabilities]     Run WebDriver session in command line
  wdio run <configPath>                 Run your WDIO configuration file to initialize
                                        your tests.

Options:
  --version  Show version number                                       [boolean]
  --help     Show help                                                 [boolean]
```

Τέλεια! Τώρα πρέπει να ορίσετε ένα αρχείο διαμόρφωσης όπου θα οριστούν όλες οι πληροφορίες σχετικά με τις δοκιμές, τις δυνατότητες και τις ρυθμίσεις σας. Μεταβείτε στην ενότητα [Αρχείο Διαμόρφωσης](/docs/configuration) για να δείτε πώς πρέπει να μοιάζει αυτό το αρχείο.

Με τον βοηθό διαμόρφωσης `wdio`, είναι πολύ εύκολο να δημιουργήσετε το αρχείο διαμόρφωσής σας. Απλώς εκτελέστε:

```sh
$ npx wdio config
```

...και θα ξεκινήσει το βοηθητικό πρόγραμμα.

Θα σας κάνει ερωτήσεις και θα δημιουργήσει ένα αρχείο διαμόρφωσης για εσάς σε λιγότερο από ένα λεπτό.

![Βοηθητικό πρόγραμμα διαμόρφωσης WDIO](/img/config-utility.gif)

Μόλις ρυθμίσετε το αρχείο διαμόρφωσης, μπορείτε να ξεκινήσετε τις δοκιμές σας εκτελώντας:

```sh
npx wdio run wdio.conf.js
```

Μπορείτε επίσης να αρχικοποιήσετε την εκτέλεση της δοκιμής σας χωρίς την εντολή `run`:

```sh
npx wdio wdio.conf.js
```

Αυτό είναι όλο! Τώρα, μπορείτε να έχετε πρόσβαση στο στιγμιότυπο του selenium μέσω της καθολικής μεταβλητής `browser`.

## Εντολές

### `wdio config`

Η εντολή `config` εκτελεί τον βοηθό διαμόρφωσης του WebdriverIO. Αυτός ο βοηθός θα σας κάνει μερικές ερωτήσεις σχετικά με το έργο WebdriverIO σας και θα δημιουργήσει ένα αρχείο `wdio.conf.js` με βάση τις απαντήσεις σας.

Παράδειγμα:

```sh
wdio config
```

Επιλογές:

```
--help            prints WebdriverIO help menu                                [boolean]
--npm             Wether to install the packages using NPM instead of yarn    [boolean]
```

### `wdio run`

> Αυτή είναι η προεπιλεγμένη εντολή για την εκτέλεση της διαμόρφωσής σας.

Η εντολή `run` αρχικοποιεί το αρχείο διαμόρφωσης WebdriverIO και εκτελεί τις δοκιμές σας.

Παράδειγμα:

```sh
wdio run ./wdio.conf.js --watch
```

Επιλογές:

```
--help                prints WebdriverIO help menu                   [boolean]
--version             prints WebdriverIO version                     [boolean]
--hostname, -h        automation driver host address                  [string]
--port, -p            automation driver port                          [number]
--user, -u            username if using a cloud service as automation backend
                                                                        [string]
--key, -k             corresponding access key to the user            [string]
--watch               watch specs for changes                        [boolean]
--logLevel, -l        level of logging verbosity
                            [choices: "trace", "debug", "info", "warn", "error", "silent"]
--bail                stop test runner after specific amount of tests have
                        failed                                          [number]
--baseUrl             shorten url command calls by setting a base url [string]
--waitforTimeout, -w  timeout for all waitForXXX commands             [number]
--framework, -f       defines the framework (Mocha, Jasmine or Cucumber) to
                        run the specs                                   [string]
--reporters, -r       reporters to print out the results on stdout      [array]
--suite               overwrites the specs attribute and runs the defined
                        suite                                            [array]
--spec                run a certain spec file or wildcards - overrides specs piped
                        from stdin                                       [array]
--exclude             exclude spec file(s) from a run - overrides specs piped
                        from stdin                                       [array]
--repeat              Repeat specific specs and/or suites N times        [number]
--mochaOpts           Mocha options
--jasmineOpts         Jasmine options
--cucumberOpts        Cucumber options
--tsConfigPath        Custom path for `tsconfig.json` or use wdio config's [tsConfigPath setting](/docs/configurationfile)
```

> Σημείωση: Ο αυτόματος μεταγλωττισμός μπορεί να ελεγχθεί εύκολα με τις μεταβλητές περιβάλλοντος `tsx`. Δείτε επίσης την [τεκμηρίωση TypeScript](/docs/typescript).

### `wdio install`
Η εντολή `install` σας επιτρέπει να προσθέσετε αναφορείς και υπηρεσίες στα έργα WebdriverIO σας μέσω του CLI.

Παράδειγμα:

```sh
wdio install service sauce # installs @wdio/sauce-service
wdio install reporter dot # installs @wdio/dot-reporter
wdio install framework mocha # installs @wdio/mocha-framework
```

Εάν θέλετε να εγκαταστήσετε τα πακέτα χρησιμοποιώντας το `yarn`, μπορείτε να περάσετε τη σημαία `--yarn` στην εντολή:

```sh
wdio install service sauce --yarn
```

Θα μπορούσατε επίσης να περάσετε μια προσαρμοσμένη διαδρομή διαμόρφωσης εάν το αρχείο διαμόρφωσης WDIO δεν βρίσκεται στον ίδιο φάκελο με αυτόν που εργάζεστε:

```sh
wdio install service sauce --config="./path/to/wdio.conf.js"
```

#### Λίστα υποστηριζόμενων υπηρεσιών

```
sauce
testingbot
firefox-profile
devtools
browserstack
appium
intercept
zafira-listener
reportportal
docker
wiremock
lambdatest
vite
nuxt
```

#### Λίστα υποστηριζόμενων αναφορέων

```
dot
spec
junit
allure
sumologic
concise
reportportal
video
html
json
mochawesome
timeline
```

#### Λίστα υποστηριζόμενων πλαισίων

```
mocha
jasmine
cucumber
```

### `wdio repl`

Η εντολή repl επιτρέπει την εκκίνηση μιας διαδραστικής διεπαφής γραμμής εντολών για την εκτέλεση εντολών WebdriverIO. Μπορεί να χρησιμοποιηθεί για δοκιμαστικούς σκοπούς ή απλά για να ξεκινήσετε γρήγορα μια συνεδρία WebdriverIO.

Εκτέλεση δοκιμών σε τοπικό chrome:

```sh
wdio repl chrome
```

ή εκτέλεση δοκιμών στο Sauce Labs:

```sh
wdio repl chrome -u $SAUCE_USERNAME -k $SAUCE_ACCESS_KEY
```

Μπορείτε να εφαρμόσετε τα ίδια ορίσματα που μπορείτε να χρησιμοποιήσετε στην [εντολή run](#wdio-run).