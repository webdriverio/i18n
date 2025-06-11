---
id: testrunner
title: Εκτελεστής Δοκιμών
---

Το WebdriverIO διαθέτει τον δικό του εκτελεστή δοκιμών για να σας βοηθήσει να ξεκινήσετε τις δοκιμές όσο το δυνατόν γρηγορότερα. Σκοπός του είναι να κάνει όλη τη δουλειά για εσάς, επιτρέπει την ενσωμάτωση σε υπηρεσίες τρίτων και σας βοηθά να εκτελείτε τις δοκιμές σας όσο το δυνατόν πιο αποτελεσματικά.

Ο εκτελεστής δοκιμών του WebdriverIO είναι συσκευασμένος ξεχωριστά στο πακέτο NPM `@wdio/cli`.

Εγκαταστήστε το ως εξής:

```sh npm2yarn
npm install @wdio/cli
```

Για να δείτε τη βοήθεια διεπαφής γραμμής εντολών, πληκτρολογήστε την ακόλουθη εντολή στο τερματικό σας:

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

Τέλεια! Τώρα πρέπει να ορίσετε ένα αρχείο διαμόρφωσης όπου καθορίζονται όλες οι πληροφορίες σχετικά με τις δοκιμές, τις δυνατότητες και τις ρυθμίσεις σας. Μεταβείτε στην ενότητα [Αρχείο Διαμόρφωσης](/docs/configuration) για να δείτε πώς πρέπει να είναι αυτό το αρχείο.

Με το βοηθητικό πρόγραμμα διαμόρφωσης `wdio`, είναι πολύ εύκολο να δημιουργήσετε το αρχείο διαμόρφωσής σας. Απλά εκτελέστε:

```sh
$ npx wdio config
```

...και ξεκινάει το βοηθητικό πρόγραμμα.

Θα σας κάνει ερωτήσεις και θα δημιουργήσει ένα αρχείο διαμόρφωσης για εσάς σε λιγότερο από ένα λεπτό.

![Βοηθητικό πρόγραμμα διαμόρφωσης WDIO](/img/config-utility.gif)

Μόλις ρυθμίσετε το αρχείο διαμόρφωσής σας, μπορείτε να ξεκινήσετε τις δοκιμές σας εκτελώντας:

```sh
npx wdio run wdio.conf.js
```

Μπορείτε επίσης να αρχικοποιήσετε την εκτέλεση της δοκιμής σας χωρίς την εντολή `run`:

```sh
npx wdio wdio.conf.js
```

Αυτό είναι! Τώρα, μπορείτε να έχετε πρόσβαση στην παρουσία του selenium μέσω της παγκόσμιας μεταβλητής `browser`.

## Εντολές

### `wdio config`

Η εντολή `config` εκτελεί το βοηθητικό πρόγραμμα διαμόρφωσης WebdriverIO. Αυτό το βοηθητικό πρόγραμμα θα σας κάνει μερικές ερωτήσεις σχετικά με το έργο WebdriverIO σας και θα δημιουργήσει ένα αρχείο `wdio.conf.js` με βάση τις απαντήσεις σας.

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
```

> Σημείωση: Η αυτόματη μεταγλώττιση μπορεί να ελεγχθεί εύκολα με τις μεταβλητές περιβάλλοντος `tsx`. Δείτε επίσης την [τεκμηρίωση TypeScript](/docs/typescript).

### `wdio install`
Η εντολή `install` σάς επιτρέπει να προσθέσετε reporters και υπηρεσίες στα έργα WebdriverIO σας μέσω του CLI.

Παράδειγμα:

```sh
wdio install service sauce # installs @wdio/sauce-service
wdio install reporter dot # installs @wdio/dot-reporter
wdio install framework mocha # installs @wdio/mocha-framework
```

Αν θέλετε να εγκαταστήσετε τα πακέτα χρησιμοποιώντας το `yarn`, μπορείτε να περάσετε τη σημαία `--yarn` στην εντολή:

```sh
wdio install service sauce --yarn
```

Θα μπορούσατε επίσης να περάσετε μια προσαρμοσμένη διαδρομή διαμόρφωσης εάν το αρχείο διαμόρφωσης WDIO δεν βρίσκεται στον ίδιο φάκελο στον οποίο εργάζεστε:

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

#### Λίστα υποστηριζόμενων reporters

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

#### Λίστα υποστηριζόμενων frameworks

```
mocha
jasmine
cucumber
```

### `wdio repl`

Η εντολή repl επιτρέπει την εκκίνηση μιας διαδραστικής διεπαφής γραμμής εντολών για την εκτέλεση εντολών WebdriverIO. Μπορεί να χρησιμοποιηθεί για σκοπούς δοκιμών ή απλώς για γρήγορη έναρξη μιας συνεδρίας WebdriverIO.

Εκτέλεση δοκιμών στο τοπικό Chrome:

```sh
wdio repl chrome
```

ή εκτελέστε δοκιμές στο Sauce Labs:

```sh
wdio repl chrome -u $SAUCE_USERNAME -k $SAUCE_ACCESS_KEY
```

Μπορείτε να εφαρμόσετε τα ίδια ορίσματα όπως μπορείτε στην [εντολή run](#wdio-run).