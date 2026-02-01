---
id: boilerplates
title: Έργα Πρότυπα
---

Με την πάροδο του χρόνου, η κοινότητά μας έχει αναπτύξει διάφορα έργα που μπορείτε να χρησιμοποιήσετε ως έμπνευση για να δημιουργήσετε τη δική σας σουίτα δοκιμών.

# v9 Έργα Πρότυπα

## [webdriverio/cucumber-boilerplate](https://github.com/webdriverio/cucumber-boilerplate)

Το δικό μας πρότυπο για σουίτες δοκιμών Cucumber. Δημιουργήσαμε πάνω από 150 προκαθορισμένους ορισμούς βημάτων για εσάς, ώστε να μπορείτε να ξεκινήσετε να γράφετε αρχεία χαρακτηριστικών στο έργο σας αμέσως.

- Framework:
    - Cucumber
    - WebdriverIO
- Χαρακτηριστικά:
    - Πάνω από 150 προκαθορισμένα βήματα που καλύπτουν σχεδόν ό,τι χρειάζεστε
    - Ενσωματώνει τη λειτουργικότητα Multiremote του WebdriverIO
    - Δική του εφαρμογή επίδειξης

## [webdriverio/jasmine-boilerplate](https://github.com/webdriverio/jasmine-boilerplate)
Πρότυπο έργο για την εκτέλεση δοκιμών WebdriverIO με Jasmine χρησιμοποιώντας χαρακτηριστικά Babel και το πρότυπο αντικειμένων σελίδας.

- Frameworks
    - WebdriverIO
    - Jasmine
- Χαρακτηριστικά
    - Πρότυπο Αντικειμένων Σελίδας
    - Ενσωμάτωση με Sauce Labs

## [webdriverio/electron-boilerplate](https://github.com/webdriverio/electron-boilerplate)
Πρότυπο έργο για την εκτέλεση δοκιμών WebdriverIO σε μια ελάχιστη εφαρμογή Electron.

- Frameworks
    - WebdriverIO
    - Mocha
- Χαρακτηριστικά
    - Προσομοίωση του API του Electron
 
## [syamphaneendra/webdriverio9-boilerplate](https://github.com/syamphaneendra/webdriverio9-boilerplate)

Αυτό το πρότυπο έργο έχει δοκιμές για κινητές συσκευές WebdriverIO 9 με Cucumber, TypeScript και Appium για πλατφόρμες Android και iOS, ακολουθώντας το πρότυπο Μοντέλου Αντικειμένων Σελίδας. Διαθέτει ολοκληρωμένη καταγραφή, αναφορές, χειρονομίες κινητών, πλοήγηση από εφαρμογή σε ιστό και ενσωμάτωση CI/CD.

- Frameworks:
    - WebdriverIO v9
    - Cucumber v9
    - Appium v2.5
    - TypeScript v5

- Χαρακτηριστικά:
    - Υποστήριξη πολλαπλών πλατφορμών
      - Android (UiAutomator2)
      - iOS (XCUITest)
    - Χειρονομίες Κινητών
      - Κύλιση
      - Σάρωση
      - Παρατεταμένο πάτημα
      - Απόκρυψη πληκτρολογίου
    - Πλοήγηση από Εφαρμογή σε Ιστό
      - Εναλλαγή περιεχομένου
      - Υποστήριξη WebView
      - Αυτοματισμός προγράμματος περιήγησης (Chrome/Safari)
    - Νέα Κατάσταση Εφαρμογής
      - Αυτόματη επαναφορά εφαρμογής μεταξύ σεναρίων
      - Διαμορφώσιμη συμπεριφορά επαναφοράς (noReset, fullReset)
    - Διαμόρφωση Συσκευής
      - Κεντρική διαχείριση συσκευών
      - Εύκολη εναλλαγή πλατφόρμας
    - Παράδειγμα Δομής Καταλόγου για JavaScript / TypeScript. Παρακάτω είναι για την έκδοση JS, η έκδοση TS έχει την ίδια δομή επίσης.

## [amiya-pattnaik/wdio-testgen-from-gherkin-js](https://github.com/amiya-pattnaik/wdio-testgen-from-gherkin-js)
## [amiya-pattnaik/wdio-testgen-from-gherkin-ts](https://github.com/amiya-pattnaik/wdio-testgen-from-gherkin-ts)
Αυτόματη δημιουργία κλάσεων Page Object του WebdriverIO και προδιαγραφών δοκιμών Mocha από αρχεία Gherkin .feature — μειώνοντας τη χειροκίνητη προσπάθεια, βελτιώνοντας τη συνέπεια και επιταχύνοντας τον αυτοματισμό QA. Αυτό το έργο όχι μόνο παράγει κώδικες συμβατούς με webdriver.io αλλά επίσης ενισχύει όλες τις λειτουργίες του webdriver.io. Έχουμε δημιουργήσει δύο εκδοχές, μία για χρήστες JavaScript και άλλη για χρήστες TypeScript. Αλλά και τα δύο έργα λειτουργούν με τον ίδιο τρόπο.

***Πώς Λειτουργεί;***
- Η διαδικασία ακολουθεί έναν αυτοματισμό δύο βημάτων:
- Βήμα 1: Gherkin σε stepMap (Δημιουργία αρχείων stepMap.json)
  - Δημιουργία αρχείων stepMap.json:
    - Αναλύει αρχεία .feature γραμμένα σε σύνταξη Gherkin.
    - Εξάγει σενάρια και βήματα.
    - Παράγει ένα δομημένο αρχείο .stepMap.json που περιέχει:
      - ενέργεια για εκτέλεση (π.χ. click, setText, assertVisible)
      - selectorName για λογική αντιστοίχιση
      - επιλογέα για το στοιχείο DOM
      - σημείωση για τιμές ή ισχυρισμούς
- Βήμα 2: stepMap σε Κώδικα (Δημιουργία Κώδικα WebdriverIO).
  Χρησιμοποιεί το stepMap.json για να δημιουργήσει:
  - Δημιουργία μιας βασικής κλάσης page.js με κοινές μεθόδους και ρύθμιση browser.url().
  - Δημιουργία κλάσεων Page Object Model (POM) συμβατών με WebdriverIO ανά χαρακτηριστικό μέσα στο test/pageobjects/.
  - Δημιουργία προδιαγραφών δοκιμών βασισμένων στο Mocha.
- Παράδειγμα Δομής Καταλόγου για JavaScript / TypeScript. Παρακάτω είναι για την έκδοση JS, η έκδοση TS έχει την ίδια δομή επίσης.
```
project-root/
├── features/                   # Gherkin .feature files (user input / source file)
├── stepMaps/                   # Auto-generated .stepMap.json files
├── test/                 
│   ├── pageobjects/            # Auto-generated WebdriverIO tests Page Object Model classes
│   └── specs/                  # Auto-generated Mocha test specs
├── src/
│   ├── cli.js                  # Main CLI logic
│   ├── generateStepsMap.js     # Feature-to-stepMap generator
│   ├── generateTestsFromMap.js # stepMap-to-page/spec generator
│   ├── utils.js                # Helper methods
│   └── config.js               # Paths, fallback selectors, aliases
│   └── __tests__/              # Unit tests (Vitest)
├── testgen.js                  # CLI entry point
│── wdio.config.js              # WebdriverIO configuration
├── package.json                # Scripts and dependencies
├── selector-aliases.json       # Optional user-defined selector overrides the primary selector
```
---
# v8 Έργα Πρότυπα

## [amiya-pattnaik/webdriverIO-with-cucumberBDD](https://github.com/amiya-pattnaik/webdriverIO-with-cucumberBDD)

- Framework: WDIO-V8 με Cucumber (V8x).
- Χαρακτηριστικά:
    - Μοντέλο Αντικειμένων Σελίδας χρησιμοποιώντας προσέγγιση βάσης κλάσεων ES6 /ES7 και υποστήριξη TypeScript
    - Παραδείγματα επιλογής πολλαπλών επιλογέων για αναζήτηση στοιχείων με περισσότερους από έναν επιλογείς ταυτόχρονα
    - Παραδείγματα εκτέλεσης πολλαπλών προγραμμάτων περιήγησης και προγραμμάτων περιήγησης χωρίς κεφαλή χρησιμοποιώντας - Chrome και Firefox
    - Ενσωμάτωση δοκιμών στο Cloud με BrowserStack, Sauce Labs, LambdaTest
    - Παραδείγματα ανάγνωσης/εγγραφής δεδομένων από MS-Excel για εύκολη διαχείριση δεδομένων δοκιμών από εξωτερικές πηγές δεδομένων με παραδείγματα
    - Υποστήριξη βάσεων δεδομένων σε οποιοδήποτε RDBMS (Oracle, MySql, TeraData, Vertica κλπ.), εκτέλεση οποιωνδήποτε ερωτημάτων / λήψη συνόλου αποτελεσμάτων κλπ. με παραδείγματα για δοκιμές E2E
    - Πολλαπλές αναφορές (Spec, Xunit/Junit, Allure, JSON) και Φιλοξενία αναφορών Allure και Xunit/Junit σε WebServer.
    - Παραδείγματα με εφαρμογή επίδειξης https://search.yahoo.com/  και http://the-internet.herokuapp.com.
    - Ειδικό αρχείο `.config` για BrowserStack, Sauce Labs, LambdaTest και Appium (για αναπαραγωγή σε κινητή συσκευή). Για εγκατάσταση Appium με ένα κλικ σε τοπικό μηχάνημα για iOS και Android ανατρέξτε στο [appium-setup-made-easy-OSX](https://github.com/amiya-pattnaik/appium-setup-made-easy-OSX).

## [amiya-pattnaik/webdriverIO-with-mochaBDD](https://github.com/amiya-pattnaik/webdriverIO-with-mochaBDD)

- Framework: WDIO-V8 με Mocha (V10x).
- Χαρακτηριστικά:
    -  Μοντέλο Αντικειμένων Σελίδας χρησιμοποιώντας προσέγγιση βάσης κλάσεων ES6 /ES7 και υποστήριξη TypeScript
    -  Παραδείγματα με εφαρμογή επίδειξης https://search.yahoo.com  και http://the-internet.herokuapp.com
    -  Παραδείγματα εκτέλεσης πολλαπλών προγραμμάτων περιήγησης και προγραμμάτων περιήγησης χωρίς κεφαλή χρησιμοποιώντας - Chrome και Firefox
    -  Ενσωμάτωση δοκιμών στο Cloud με BrowserStack, Sauce Labs, LambdaTest
    -  Πολλαπλές αναφορές (Spec, Xunit/Junit, Allure, JSON) και Φιλοξενία αναφορών Allure και Xunit/Junit σε WebServer.
    -  Παραδείγματα ανάγνωσης/εγγραφής δεδομένων από MS-Excel για εύκολη διαχείριση δεδομένων δοκιμών από εξωτερικές πηγές δεδομένων με παραδείγματα
    -  Παραδείγματα σύνδεσης DB σε οποιοδήποτε RDBMS (Oracle, MySql, TeraData, Vertica κλπ.), εκτέλεση οποιωνδήποτε ερωτημάτων / λήψη συνόλου αποτελεσμάτων κλπ. με παραδείγματα για δοκιμές E2E
    -  Ειδικό αρχείο `.config` για BrowserStack, Sauce Labs, LambdaTest και Appium (για αναπαραγωγή σε κινητή συσκευή). Για εγκατάσταση Appium με ένα κλικ σε τοπικό μηχάνημα για iOS και Android ανατρέξτε στο [appium-setup-made-easy-OSX](https://github.com/amiya-pattnaik/appium-setup-made-easy-OSX).

## [amiya-pattnaik/webdriverIO-with-jasmineBDD](https://github.com/amiya-pattnaik/webdriverIO-with-jasmineBDD)

- Framework: WDIO-V8 με Jasmine (V4x).
- Χαρακτηριστικά:
    -  Μοντέλο Αντικειμένων Σελίδας χρησιμοποιώντας προσέγγιση βάσης κλάσεων ES6 /ES7 και υποστήριξη TypeScript
    -  Παραδείγματα με εφαρμογή επίδειξης https://search.yahoo.com  και http://the-internet.herokuapp.com
    -  Παραδείγματα εκτέλεσης πολλαπλών προγραμμάτων περιήγησης και προγραμμάτων περιήγησης χωρίς κεφαλή χρησιμοποιώντας - Chrome και Firefox
    -  Ενσωμάτωση δοκιμών στο Cloud με BrowserStack, Sauce Labs, LambdaTest
    -  Πολλαπλές αναφορές (Spec, Xunit/Junit, Allure, JSON) και Φιλοξενία αναφορών Allure και Xunit/Junit σε WebServer.
    -  Παραδείγματα ανάγνωσης/εγγραφής δεδομένων από MS-Excel για εύκολη διαχείριση δεδομένων δοκιμών από εξωτερικές πηγές δεδομένων με παραδείγματα
    -  Παραδείγματα σύνδεσης DB σε οποιοδήποτε RDBMS (Oracle, MySql, TeraData, Vertica κλπ.), εκτέλεση οποιωνδήποτε ερωτημάτων / λήψη συνόλου αποτελεσμάτων κλπ. με παραδείγματα για δοκιμές E2E
    -  Ειδικό αρχείο `.config` για BrowserStack, Sauce Labs, LambdaTest και Appium (για αναπαραγωγή σε κινητή συσκευή). Για εγκατάσταση Appium με ένα κλικ σε τοπικό μηχάνημα για iOS και Android ανατρέξτε στο [appium-setup-made-easy-OSX](https://github.com/amiya-pattnaik/appium-setup-made-easy-OSX).

## [syamphaneendra/webdriverio-web-mobile-boilerplate](https://github.com/syamphaneendra/webdriverio-web-mobile-boilerplate)

Αυτό το πρότυπο έργο έχει δοκιμές WebdriverIO 8 με cucumber και typescript, ακολουθώντας το πρότυπο αντικειμένων σελίδας.

- Frameworks:
    - WebdriverIO v8
    - Cucumber v8

- Χαρακτηριστικά:
    - Typescript v5
    - Πρότυπο Αντικειμένων Σελίδας
    - Prettier
    - Υποστήριξη πολλαπλών προγραμμάτων περιήγησης
      - Chrome
      - Firefox
      - Edge
      - Safari
      - Standalone
    - Παράλληλη εκτέλεση διαφορετικών προγραμμάτων περιήγησης
    - Appium
    - Ενσωμάτωση δοκιμών στο Cloud με BrowserStack & Sauce Labs
    - Υπηρεσία Docker
    - Υπηρεσία κοινής χρήσης δεδομένων
    - Ξεχωριστά αρχεία διαμόρφωσης για κάθε υπηρεσία
    - Διαχείριση δεδομένων δοκιμών και ανάγνωση ανά τύπο χρήστη
    - Αναφορές
      - Dot
      - Spec
      - Πολλαπλές αναφορές html cucumber με στιγμιότυπα αποτυχίας
    - Pipelines Gitlab για αποθετήριο Gitlab
    - Ενέργειες Github για αποθετήριο Github
    - Docker compose για τη δημιουργία του docker hub
    - Δοκιμές προσβασιμότητας χρησιμοποιώντας AXE
    - Οπτικές δοκιμές χρησιμοποιώντας Applitools
    - Μηχανισμός καταγραφής


## [klassijs/klassi-js (cucumber-template)](https://github.com/klassijs/klassi-example-test-suite.git)

- Frameworks
    - WebdriverIO (v8)
    - Cucumber (v8)

- Χαρακτηριστικά
    - Περιέχει δείγμα σεναρίου δοκιμής σε cucumber
    - Ενσωματωμένες αναφορές html cucumber με ενσωματωμένα βίντεο σε αποτυχίες
    - Ενσωματωμένες υπηρεσίες Lambdatest και CircleCI
    - Ενσωματωμένες οπτικές δοκιμές, δοκιμές προσβασιμότητας και δοκιμές API
    - Ενσωματωμένη λειτουργικότητα email
    - Ενσωματωμένος κάδος s3 για αποθήκευση και ανάκτηση αναφορών δοκιμών

## [serenity-js/serenity-js-mocha-webdriverio-template/](https://github.com/serenity-js/serenity-js-mocha-webdriverio-template/)

[Serenity/JS](https://serenity-js.org?pk_campaign=wdio8&pk_source=webdriver.io) πρότυπο έργο για να σας βοηθήσει να ξεκινήσετε με δοκιμές αποδοχής για τις εφαρμογές ιστού σας χρησιμοποιώντας τα τελευταία WebdriverIO, Mocha και Serenity/JS.

- Frameworks
    - WebdriverIO (v8)
    - Mocha (v10)
    - Serenity/JS (v3)
    - Αναφορές Serenity BDD

- Χαρακτηριστικά
    - [Screenplay Pattern](https://serenity-js.org/handbook/design/screenplay-pattern/?pk_campaign=wdio8&pk_source=webdriver.io)
    - Αυτόματα στιγμιότυπα οθόνης σε αποτυχία δοκιμής, ενσωματωμένα στις αναφορές
    - Ρύθμιση Συνεχούς Ενσωμάτωσης (CI) χρησιμοποιώντας [GitHub Actions](https://github.com/serenity-js/serenity-js-mocha-webdriverio-template/blob/main/.github/workflows/main.yml)
    - [Δοκιμαστικές αναφορές Serenity BDD](https://serenity-js.github.io/serenity-js-mocha-webdriverio-template/) που δημοσιεύονται στις Σελίδες GitHub
    - TypeScript
    - ESLint

## [serenity-js/serenity-js-cucumber-webdriverio-template/](https://github.com/serenity-js/serenity-js-cucumber-webdriverio-template/)

[Serenity/JS](https://serenity-js.org?pk_campaign=wdio8&pk_source=webdriver.io) πρότυπο έργο για να σας βοηθήσει να ξεκινήσετε με δοκιμές αποδοχής για τις εφαρμογές ιστού σας χρησιμοποιώντας τα τελευταία WebdriverIO, Cucumber και Serenity/JS.

- Frameworks
    - WebdriverIO (v8)
    - Cucumber (v9)
    - Serenity/JS (v3)
    - Αναφορές Serenity BDD

- Χαρακτηριστικά
    - [Screenplay Pattern](https://serenity-js.org/handbook/design/screenplay-pattern/?pk_campaign=wdio8&pk_source=webdriver.io)
    - Αυτόματα στιγμιότυπα οθόνης σε αποτυχία δοκιμής, ενσωματωμένα στις αναφορές
    - Ρύθμιση Συνεχούς Ενσωμάτωσης (CI) χρησιμοποιώντας [GitHub Actions](https://github.com/serenity-js/serenity-js-cucumber-webdriverio-template/blob/main/.github/workflows/main.yml)
    - [Δοκιμαστικές αναφορές Serenity BDD](https://serenity-js.github.io/serenity-js-mocha-webdriverio-template/) που δημοσιεύονται στις Σελίδες GitHub
    - TypeScript
    - ESLint

## [Muralijc/wdio-headspin-boilerplate](https://github.com/Muralijc/Wdio-Headspin-boilerplate/)
Πρότυπο έργο για την εκτέλεση δοκιμών WebdriverIO στο Headspin Cloud (https://www.headspin.io/) χρησιμοποιώντας χαρακτηριστικά Cucumber και το πρότυπο αντικειμένων σελίδας.
- Frameworks
    - WebdriverIO (v8)
    - Cucumber (v8)

- Χαρακτηριστικά
    - Ενσωμάτωση Cloud με [Headspin](https://www.headspin.io/)
    - Υποστηρίζει το Μοντέλο Αντικειμένων Σελίδας
    - Περιέχει δείγματα σεναρίων γραμμένα σε δηλωτικό στυλ BDD
    - Ενσωματωμένες αναφορές html cucumber

# v7 Έργα Πρότυπα
---

## [webdriverio/appium-boilerplate](https://github.com/webdriverio/appium-boilerplate/)

Πρότυπο έργο για την εκτέλεση δοκιμών Appium με WebdriverIO για:

- Εφαρμογές iOS/Android
- Υβριδικές εφαρμογές iOS/Android
- Προγράμματα περιήγησης Android Chrome και iOS Safari

Αυτό το πρότυπο περιλαμβάνει τα εξής:

- Framework: Mocha
- Χαρακτηριστικά:
    - Διαμορφώσεις για:
        - Εφαρμογές iOS και Android
        - Προγράμματα περιήγησης iOS και Android
    - Βοηθητικά προγράμματα για:
        - WebView
        - Χειρονομίες
        - Εγγενείς ειδοποιήσεις
        - Επιλογείς
     - Παραδείγματα δοκιμών για:
        - WebView
        - Σύνδεση
        - Φόρμες
        - Σάρωση
        - Προγράμματα περιήγησης

## [serhatbolsu/webdriverio-mocha-uiautomation-boiler](https://github.com/serhatbolsu/webdriverio-mocha-uiautomation-boiler)
Δοκιμές ATDD WEB με Mocha, WebdriverIO v6 με PageObject

- Frameworks
  - WebdriverIO (v7)
  - Mocha
- Χαρακτηριστικά
  - Μοντέλο [Page Object](pageobjects)
  - Ενσωμάτωση Sauce Labs με [Sauce Service](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-sauce-service/README.md)
  - Αναφορά Allure
  - Αυτόματη λήψη στιγμιότυπων οθόνης για αποτυχημένες δοκιμές
  - Παράδειγμα CircleCI
  - ESLint

## [WarleyGabriel/demo-webdriverio-mocha](https://github.com/WarleyGabriel/demo-webdriverio-mocha)

Πρότυπο έργο για την εκτέλεση δοκιμών E2E με Mocha.

- Frameworks:
    - WebdriverIO (v7)
    - Mocha
- Χαρακτηριστικά:
    -   TypeScript
    -   [Expect-webdriverio](https://github.com/webdriverio/expect-webdriverio)
    -   [Δοκιμές οπτικής παλινδρόμησης](https://github.com/wswebcreation/wdio-image-comparison-service)
    -   Πρότυπο Αντικειμένων Σελίδας
    -   [Commit lint](https://github.com/conventional-changelog/commitlint) και [Commitizen](https://github.com/commitizen/cz-cli#making-your-repo-commitizen-friendly)
    -   ESlint
    -   Prettier
    -   Husky
    -   Παράδειγμα Github Actions
    -   Αναφορά Allure (στιγμιότυπα οθόνης σε αποτυχία)

## [17thSep/WebdriverIO_Master](https://github.com/17thSep/WebdriverIO_Master)

Πρότυπο έργο για την εκτέλεση δοκιμών **WebdriverIO v7** για τα εξής:

[WDIO 7 scripts with TypeScript in Cucumber Framework](https://github.com/17thSep/WebdriverIO_Master/tree/master/TypeScript/Cucumber)
[WDIO 7 scripts with TypeScript in Mocha Framework](https://github.com/17thSep/WebdriverIO_Master/tree/master/TypeScript/Mocha)
[Run WDIO 7 script in Docker](https://github.com/17thSep/WebdriverIO_Master/tree/master/TypeScript/Docker)
[Network logs](https://github.com/17thSep/MonitorNetworkLogs/)

Πρότυπο έργο για:

- Καταγραφή Αρχείων Καταγραφής Δικτύου
- Καταγραφή όλων των κλήσεων GET/POST ή συγκεκριμένου REST API
- Επιβεβαίωση παραμέτρων αιτημάτων
- Επιβεβαίωση παραμέτρων απόκρισης
- Αποθήκευση όλων των αποκρίσεων σε ξεχωριστό αρχείο

## [Arjun-Ar91/Wdio7-appium-cucumber](https://github.com/Arjun-Ar91/Wdio7-appium-cucumber.git)

Πρότυπο έργο για την εκτέλεση δοκιμών appium για εγγενείς εφαρμογές και προγράμματα περιήγησης για κινητά χρησιμοποιώντας cucumber v7 και wdio v7 με πρότυπο αντικειμένων σελίδας.

- Frameworks
    - WebdriverIO v7
    - Cucumber v7
    - Appium

- Χαρακτηριστικά
    - Εγγενείς εφαρμογές Android και iOS
    - Πρόγραμμα περιήγησης Android Chrome
    - Πρόγραμμα περιήγησης iOS Safari
    - Μοντέλο Αντικειμένων Σελίδας
    - Περιέχει δείγματα σεναρίων δοκιμών σε cucumber
    - Ενσωματωμένο με πολλαπλές αναφορές html cucumber

## [praveendvd/webdriverIODockerBoilerplate/](https://github.com/praveendvd/webdriverIODockerBoilerplate)

Αυτό είναι ένα πρότυπο έργο που σας βοηθά να δείξει πώς μπορείτε να εκτελέσετε δοκιμές webdriverio από εφαρμογές Web χρησιμοποιώντας τα τελευταία WebdriverIO και το πλαίσιο Cucumber. Αυτό το έργο προορίζεται να λειτουργήσει ως βασική εικόνα που μπορείτε να χρησιμοποιήσετε για να κατανοήσετε πώς να εκτελέσετε δοκιμές WebdriverIO σε docker

Αυτό το έργο περιλαμβάνει:

- DockerFile
- Έργο cucumber

Διαβάστε περισσότερα στο: [Medium Blog](https://praveendavidmathew.medium.com/running-webdriverio-in-wsl2-windows-91d3a0dc7746)

## [praveendvd/WebdriverIO_electronAppAutomation_boilerplate/](https://github.com/praveendvd/WebdriverIO_electronAppAutomation_boilerplate)

Αυτό είναι ένα πρότυπο έργο που σας βοηθά να δείξει πώς μπορείτε να εκτελέσετε δοκιμές electronJS χρησιμοποιώντας το WebdriverIO. Αυτό το έργο προορίζεται να λειτουργήσει ως βασική εικόνα που μπορείτε να χρησιμοποιήσετε για να κατανοήσετε πώς να εκτελέσετε δοκιμές WebdriverIO electronJS.

Αυτό το έργο περιλαμβάνει:

- Δείγμα εφαρμογής electronjs
- Δείγμα σεναρίων δοκιμών cucumber

Διαβάστε περισσότερα στο: [Medium Blog](https://praveendavidmathew.medium.com/first-step-into-automation-of-electronjs-applications-ef89b7423ddd)

## [praveendvd/webdriverIO_winappdriver_boilerplate/](https://github.com/praveendvd/webdriverIO_winappdriver_boilerplate)

Αυτό είναι ένα πρότυπο έργο που σας βοηθά να δείξει πώς μπορείτε να αυτοματοποιήσετε εφαρμογές των Windows χρησιμοποιώντας winappdriver και WebdriverIO. Αυτό το έργο προορίζεται να λειτουργήσει ως βασική εικόνα που μπορείτε να χρησιμοποιήσετε για να κατανοήσετε πώς να εκτελέσετε δοκιμές windappdriver και WebdriverIO.

Διαβάστε περισσότερα στο: [Medium Blog](https://praveendavidmathew.medium.com/winappdriver-first-step-into-windows-app-test-automation-using-webdriverio-and-winappdriver-46320d89570b)

## [praveendvd/appium-chromedriver-multiremote-wdio-boilerplate/](https://github.com/praveendvd/appium-chromedriver-multiremote-wdio-boilerplate)


Αυτό είναι ένα πρότυπο έργο που σας βοηθά να δείξει πώς μπορείτε να εκτελέσετε τη δυνατότητα πολλαπλής απομακρυσμένης σύνδεσης webdriverio με τα τελευταία WebdriverIO και το πλαίσιο Jasmine. Αυτό το έργο προορίζεται να λειτουργήσει ως βασική εικόνα που μπορείτε να χρησιμοποιήσετε για να κατανοήσετε πώς να εκτελέσετε δοκιμές WebdriverIO σε docker

Αυτό το έργο χρησιμοποιεί:
     - chromedriver
     - jasmine
     - appium

## [webdriverio-roku-appium-boilerplate](https://github.com/AntonKostenko/webdriverIO-roku-appium)

Πρότυπο έργο για την εκτέλεση δοκιμών appium σε πραγματικές συσκευές Roku χρησιμοποιώντας mocha με πρότυπο αντικειμένων σελίδας.

- Frameworks
    - WebdriverIO Async v7
    - Appium 2.0
    - Mocha v7
    - Αναφορές Allure

- Χαρακτηριστικά
    - Μοντέλο Αντικειμένων Σελίδας
    - Typescript
    - Στιγμιότυπο οθόνης σε αποτυχία
    - Παραδείγματα δοκιμών χρησιμοποιώντας ένα δείγμα καναλιού Roku

## [krishnapollu/wdio-cucumber-poc](https://github.com/krishnapollu/wdio-cucumber-poc)

Έργο PoC για δοκιμές E2E Multiremote Cucumber καθώς και δοκιμές Mocha με βάση τα δεδομένα

- Framework:
    - Cucumber (v8)
    - WebdriverIO (v8)
    - Mocha (v8)

- Χαρακτηριστικά:
    - Δοκιμές E2E βασισμένες στο Cucumber
    - Δοκιμές με βάση τα δεδομένα σε Mocha
    - Δοκιμές μόνο για Web - σε τοπικές και πλατφόρμες cloud
    - Δοκιμές μόνο για κινητά - τοπικούς καθώς και απομακρυσμένους προσομοιωτές cloud (ή συσκευές)
    - Δοκιμές Web + Mobile - Πολλαπλές απομακρυσμένες - τοπικές καθώς και πλατφόρμες cloud
    - Πολλαπλές αναφορές ενσωματωμένες συμπεριλαμβανομένου του Allure
    - Δεδομένα δοκιμών (JSON / XLSX) που χειρίζονται παγκοσμίως ώστε να γράφουν τα δεδομένα (που δημιουργήθηκαν κατά τη διάρκεια) σε ένα αρχείο μετά την εκτέλεση της δοκιμής
    - Ροή εργασίας Github για την εκτέλεση της δοκιμής και τη μεταφόρτωση της αναφοράς allure

## [Rondleysg/wdio-multiremote-appium-chromedriver-boilerplate](https://github.com/Rondleysg/wdio-multiremote-appium-chromedriver-boilerplate)

Αυτό είναι ένα πρότυπο έργο για να βοηθήσει να δείξει πώς να εκτελέσετε πολλαπλή απομακρυσμένη λειτουργία webdriverio χρησιμοποιώντας την υπηρεσία appium και chromedriver με τα τελευταία WebdriverIO.

- Frameworks
  - WebdriverIO (v9)
  - Appium (v2)
  - Mocha

- Χαρακτηριστικά
  - Μοντέλο [Page Object](pageobjects)
  - Typescript
  - Δοκιμές Web + Mobile - Πολλαπλές απομακρυσμένες
  - Εγγενείς εφαρμογές Android και iOS
  - Appium
  - Chromedriver
  - ESLint
  - Παραδείγματα δοκιμών για Σύνδεση στο http://the-internet.herokuapp.com και [εγγενής εφαρμογή επίδειξης WebdriverIO](https://github.com/webdriverio/native-demo-app)