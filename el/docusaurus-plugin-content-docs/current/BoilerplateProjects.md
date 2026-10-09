---
id: boilerplates
title: Έργα Boilerplate
description: "Περιηγηθείτε σε έργα boilerplate της κοινότητας για το WebdriverIO με Mocha, Jasmine, Cucumber, Electron και ρυθμίσεις για κινητά, για να ξεκινήσετε τη δική σας σουίτα δοκιμών."
---

Με την πάροδο του χρόνου, η κοινότητά μας έχει αναπτύξει διάφορα έργα που μπορείτε να χρησιμοποιήσετε ως έμπνευση για να δημιουργήσετε τη δική σας σουίτα δοκιμών.

# Έργα Boilerplate v9

## [webdriverio/cucumber-boilerplate](https://github.com/webdriverio/cucumber-boilerplate)

Το δικό μας boilerplate για σουίτες δοκιμών Cucumber. Δημιουργήσαμε για εσάς πάνω από 150 προκαθορισμένους ορισμούς βημάτων, ώστε να μπορείτε να αρχίσετε αμέσως να γράφετε αρχεία feature στο έργο σας.

- Framework:
    - Cucumber
    - WebdriverIO
- Χαρακτηριστικά:
    - Πάνω από 150 προκαθορισμένα βήματα που καλύπτουν σχεδόν οτιδήποτε χρειάζεστε
    - Ενσωματώνει τη λειτουργικότητα multi-remote του WebdriverIO
    - Δική του εφαρμογή επίδειξης

## [webdriverio/jasmine-boilerplate](https://github.com/webdriverio/jasmine-boilerplate)
Έργο boilerplate για την εκτέλεση δοκιμών WebdriverIO με Jasmine, χρησιμοποιώντας χαρακτηριστικά του Babel και το μοτίβο page objects.

- Frameworks
    - WebdriverIO
    - Jasmine
- Χαρακτηριστικά
    - Μοτίβο Page Object
    - Ενσωμάτωση με Sauce Labs

## [webdriverio/electron-boilerplate](https://github.com/webdriverio/electron-boilerplate)
Έργο boilerplate για την εκτέλεση δοκιμών WebdriverIO σε μια ελάχιστη εφαρμογή Electron.

- Frameworks
    - WebdriverIO
    - Mocha
- Χαρακτηριστικά
    - Mocking του Electron API

## [syamphaneendra/webdriverio9-boilerplate](https://github.com/syamphaneendra/webdriverio9-boilerplate)

Αυτό το έργο boilerplate περιέχει δοκιμές για κινητά με WebdriverIO 9, Cucumber, TypeScript και Appium για τις πλατφόρμες Android και iOS, ακολουθώντας το μοτίβο Page Object Model. Περιλαμβάνει ολοκληρωμένη καταγραφή (logging), αναφορές, χειρονομίες κινητών, πλοήγηση από εφαρμογή σε web και ενσωμάτωση CI/CD.

- Frameworks:
    - WebdriverIO v9
    - Cucumber v9
    - Appium v2.5
    - TypeScript v5

- Χαρακτηριστικά:
    - Υποστήριξη πολλαπλών πλατφορμών
      - Android (UiAutomator2)
      - iOS (XCUITest)
    - Χειρονομίες κινητών
      - Κύλιση (Scroll)
      - Σάρωση (Swipe)
      - Παρατεταμένο πάτημα (Long press)
      - Απόκρυψη πληκτρολογίου
    - Πλοήγηση από εφαρμογή σε web
      - Εναλλαγή context
      - Υποστήριξη WebView
      - Αυτοματοποίηση προγράμματος περιήγησης (Chrome/Safari)
    - Καθαρή κατάσταση εφαρμογής
      - Αυτόματη επαναφορά της εφαρμογής μεταξύ σεναρίων
      - Παραμετροποιήσιμη συμπεριφορά επαναφοράς (noReset, fullReset)
    - Διαμόρφωση συσκευών
      - Κεντρική διαχείριση συσκευών
      - Εύκολη εναλλαγή πλατφόρμας
    - Παράδειγμα δομής καταλόγων για JavaScript / TypeScript. Παρακάτω είναι για την έκδοση JS, η έκδοση TS έχει επίσης την ίδια δομή.

## [amiya-pattnaik/wdio-testgen-from-gherkin-js](https://github.com/amiya-pattnaik/wdio-testgen-from-gherkin-js)
## [amiya-pattnaik/wdio-testgen-from-gherkin-ts](https://github.com/amiya-pattnaik/wdio-testgen-from-gherkin-ts)
Δημιουργήστε αυτόματα κλάσεις Page Object του WebdriverIO και προδιαγραφές δοκιμών Mocha από αρχεία Gherkin .feature — μειώνοντας τη χειροκίνητη προσπάθεια, βελτιώνοντας τη συνέπεια και επιταχύνοντας την αυτοματοποίηση QA. Αυτό το έργο όχι μόνο παράγει κώδικα συμβατό με το webdriver.io, αλλά ενισχύει επίσης όλες τις λειτουργίες του webdriver.io. Δημιουργήσαμε δύο εκδοχές, μία για χρήστες JavaScript και μία για χρήστες TypeScript. Και τα δύο έργα όμως λειτουργούν με τον ίδιο τρόπο.

***Πώς λειτουργεί;***
- Η διαδικασία ακολουθεί αυτοματοποίηση δύο βημάτων:
- Βήμα 1: Από Gherkin σε stepMap (Δημιουργία αρχείων stepMap.json)
  - Δημιουργία αρχείων stepMap.json:
    - Αναλύει αρχεία .feature γραμμένα σε σύνταξη Gherkin.
    - Εξάγει σενάρια και βήματα.
    - Παράγει ένα δομημένο αρχείο .stepMap.json που περιέχει:
      - action προς εκτέλεση (π.χ. click, setText, assertVisible)
      - selectorName για λογική αντιστοίχιση
      - selector για το στοιχείο DOM
      - note για τιμές ή assertion
- Βήμα 2: Από stepMap σε κώδικα (Δημιουργία κώδικα WebdriverIO).
  Χρησιμοποιεί το stepMap.json για να:
  - Δημιουργήσει μια βασική κλάση page.js με κοινές μεθόδους και ρύθμιση browser.url().
  - Δημιουργήσει κλάσεις Page Object Model (POM) συμβατές με το WebdriverIO ανά feature μέσα στο test/pageobjects/.
  - Δημιουργήσει προδιαγραφές δοκιμών βασισμένες στο Mocha.
- Παράδειγμα δομής καταλόγων για JavaScript / TypeScript. Παρακάτω είναι για την έκδοση JS, η έκδοση TS έχει επίσης την ίδια δομή.
```
project-root/
├── features/                   # Αρχεία Gherkin .feature (είσοδος χρήστη / αρχείο πηγής)
├── stepMaps/                   # Αυτόματα παραγόμενα αρχεία .stepMap.json
├── test/
│   ├── pageobjects/            # Αυτόματα παραγόμενες κλάσεις Page Object Model για δοκιμές WebdriverIO
│   └── specs/                  # Αυτόματα παραγόμενες προδιαγραφές δοκιμών Mocha
├── src/
│   ├── cli.js                  # Κύρια λογική CLI
│   ├── generateStepsMap.js     # Γεννήτρια Feature-σε-stepMap
│   ├── generateTestsFromMap.js # Γεννήτρια stepMap-σε-page/spec
│   ├── utils.js                # Βοηθητικές μέθοδοι
│   └── config.js               # Διαδρομές, εναλλακτικοί selectors, ψευδώνυμα
│   └── __tests__/              # Unit tests (Vitest)
├── testgen.js                  # Σημείο εισόδου CLI
│── wdio.config.js              # Διαμόρφωση WebdriverIO
├── package.json                # Scripts και εξαρτήσεις
├── selector-aliases.json       # Προαιρετικές παρακάμψεις selector ορισμένες από τον χρήστη, που υπερισχύουν του κύριου selector
```
---
# Έργα Boilerplate v8

## [amiya-pattnaik/webdriverIO-with-cucumberBDD](https://github.com/amiya-pattnaik/webdriverIO-with-cucumberBDD)

- Framework: WDIO-V8 με Cucumber (V8x).
- Χαρακτηριστικά:
    - Χρήση Page Objects Model με προσέγγιση βασισμένη σε κλάσεις στυλ ES6 /ES7 και υποστήριξη TypeScript
    - Παραδείγματα επιλογής πολλαπλών selectors για αναζήτηση στοιχείου με περισσότερους από έναν selectors ταυτόχρονα
    - Παραδείγματα εκτέλεσης σε πολλαπλά προγράμματα περιήγησης και headless προγράμματα περιήγησης με χρήση - Chrome και Firefox
    - Ενσωμάτωση δοκιμών στο cloud με BrowserStack, Sauce Labs, TestMu AI (Πρώην LambdaTest)
    - Παραδείγματα ανάγνωσης/εγγραφής δεδομένων από MS-Excel για εύκολη διαχείριση δεδομένων δοκιμών από εξωτερικές πηγές δεδομένων, με παραδείγματα
    - Υποστήριξη βάσεων δεδομένων για οποιοδήποτε RDBMS (Oracle, MySql, TeraData, Vertica κ.λπ.), εκτέλεση οποιωνδήποτε ερωτημάτων / ανάκτηση συνόλων αποτελεσμάτων κ.λπ. με παραδείγματα για δοκιμές E2E
    - Πολλαπλές αναφορές (Spec, Xunit/Junit, Allure, JSON) και φιλοξενία αναφορών Allure και Xunit/Junit σε WebServer.
    - Παραδείγματα με την εφαρμογή επίδειξης https://search.yahoo.com/  και http://the-internet.herokuapp.com.
    - Αρχείο `.config` ειδικά για BrowserStack, Sauce Labs, TestMu AI (Πρώην LambdaTest) και Appium (για αναπαραγωγή σε κινητή συσκευή). Για ρύθμιση του Appium με ένα κλικ σε τοπικό μηχάνημα για iOS και Android, ανατρέξτε στο [appium-setup-made-easy-OSX](https://github.com/amiya-pattnaik/appium-setup-made-easy-OSX).

## [amiya-pattnaik/webdriverIO-with-mochaBDD](https://github.com/amiya-pattnaik/webdriverIO-with-mochaBDD)

- Framework: WDIO-V8 με Mocha (V10x).
- Χαρακτηριστικά:
    -  Χρήση Page Objects Model με προσέγγιση βασισμένη σε κλάσεις στυλ ES6 /ES7 και υποστήριξη TypeScript
    -  Παραδείγματα με την εφαρμογή επίδειξης https://search.yahoo.com  και http://the-internet.herokuapp.com
    -  Παραδείγματα εκτέλεσης σε πολλαπλά προγράμματα περιήγησης και headless προγράμματα περιήγησης με χρήση - Chrome και Firefox
    -  Ενσωμάτωση δοκιμών στο cloud με BrowserStack, Sauce Labs, TestMu AI (Πρώην LambdaTest)
    -  Πολλαπλές αναφορές (Spec, Xunit/Junit, Allure, JSON) και φιλοξενία αναφορών Allure και Xunit/Junit σε WebServer.
    -  Παραδείγματα ανάγνωσης/εγγραφής δεδομένων από MS-Excel για εύκολη διαχείριση δεδομένων δοκιμών από εξωτερικές πηγές δεδομένων, με παραδείγματα
    -  Παραδείγματα σύνδεσης με βάση δεδομένων σε οποιοδήποτε RDBMS (Oracle, MySql, TeraData, Vertica κ.λπ.), εκτέλεση οποιουδήποτε ερωτήματος / ανάκτηση συνόλων αποτελεσμάτων κ.λπ. με παραδείγματα για δοκιμές E2E
    -  Αρχείο `.config` ειδικά για BrowserStack, Sauce Labs, TestMu AI (Πρώην LambdaTest) και Appium (για αναπαραγωγή σε κινητή συσκευή). Για ρύθμιση του Appium με ένα κλικ σε τοπικό μηχάνημα για iOS και Android, ανατρέξτε στο [appium-setup-made-easy-OSX](https://github.com/amiya-pattnaik/appium-setup-made-easy-OSX).

## [amiya-pattnaik/webdriverIO-with-jasmineBDD](https://github.com/amiya-pattnaik/webdriverIO-with-jasmineBDD)

- Framework: WDIO-V8 με Jasmine (V4x).
- Χαρακτηριστικά:
    -  Χρήση Page Objects Model με προσέγγιση βασισμένη σε κλάσεις στυλ ES6 /ES7 και υποστήριξη TypeScript
    -  Παραδείγματα με την εφαρμογή επίδειξης https://search.yahoo.com  και http://the-internet.herokuapp.com
    -  Παραδείγματα εκτέλεσης σε πολλαπλά προγράμματα περιήγησης και headless προγράμματα περιήγησης με χρήση - Chrome και Firefox
    -  Ενσωμάτωση δοκιμών στο cloud με BrowserStack, Sauce Labs, TestMu AI (Πρώην LambdaTest)
    -  Πολλαπλές αναφορές (Spec, Xunit/Junit, Allure, JSON) και φιλοξενία αναφορών Allure και Xunit/Junit σε WebServer.
    -  Παραδείγματα ανάγνωσης/εγγραφής δεδομένων από MS-Excel για εύκολη διαχείριση δεδομένων δοκιμών από εξωτερικές πηγές δεδομένων, με παραδείγματα
    -  Παραδείγματα σύνδεσης με βάση δεδομένων σε οποιοδήποτε RDBMS (Oracle, MySql, TeraData, Vertica κ.λπ.), εκτέλεση οποιουδήποτε ερωτήματος / ανάκτηση συνόλων αποτελεσμάτων κ.λπ. με παραδείγματα για δοκιμές E2E
    -  Αρχείο `.config` ειδικά για BrowserStack, Sauce Labs, TestMu AI (Πρώην LambdaTest) και Appium ( για αναπαραγωγή σε κινητή συσκευή). Για ρύθμιση του Appium με ένα κλικ σε τοπικό μηχάνημα για iOS και Android, ανατρέξτε στο [appium-setup-made-easy-OSX](https://github.com/amiya-pattnaik/appium-setup-made-easy-OSX).

## [syamphaneendra/webdriverio-web-mobile-boilerplate](https://github.com/syamphaneendra/webdriverio-web-mobile-boilerplate)

Αυτό το έργο boilerplate περιέχει δοκιμές WebdriverIO 8 με cucumber και typescript, ακολουθώντας το μοτίβο page objects.

- Frameworks:
    - WebdriverIO v8
    - Cucumber v8

- Χαρακτηριστικά:
    - Typescript v5
    - Μοτίβο Page Object
    - Prettier
    - Υποστήριξη πολλαπλών προγραμμάτων περιήγησης
      - Chrome
      - Firefox
      - Edge
      - Safari
      - Standalone
    - Παράλληλη εκτέλεση σε διαφορετικά προγράμματα περιήγησης
    - Appium
    - Ενσωμάτωση δοκιμών στο cloud με BrowserStack & Sauce Labs
    - Υπηρεσία Docker
    - Υπηρεσία κοινής χρήσης δεδομένων
    - Ξεχωριστά αρχεία διαμόρφωσης για κάθε υπηρεσία
    - Διαχείριση δεδομένων δοκιμών & ανάγνωση ανά τύπο χρήστη
    - Αναφορές
      - Dot
      - Spec
      - Πολλαπλές αναφορές html του cucumber με στιγμιότυπα οθόνης αποτυχιών
    - Gitlab pipelines για αποθετήριο Gitlab
    - Github actions για αποθετήριο Github
    - Docker compose για τη ρύθμιση του docker hub
    - Δοκιμές προσβασιμότητας με χρήση AXE
    - Οπτικές δοκιμές με χρήση Applitools
    - Μηχανισμός καταγραφής (log)


## [klassijs/klassi-js (cucumber-template)](https://github.com/klassijs/klassi-example-test-suite.git)

- Frameworks
    - WebdriverIO (v8)
    - Cucumber (v8)

- Χαρακτηριστικά
    - Περιέχει δείγμα σεναρίου δοκιμής σε cucumber
    - Ενσωματωμένες αναφορές html του cucumber με ενσωματωμένα βίντεο σε αποτυχίες
    - Ενσωματωμένες υπηρεσίες Lambdatest και CircleCI
    - Ενσωματωμένες οπτικές δοκιμές, δοκιμές προσβασιμότητας και δοκιμές API
    - Ενσωματωμένη λειτουργικότητα Email
    - Ενσωματωμένο s3 bucket για αποθήκευση και ανάκτηση αναφορών δοκιμών

## [serenity-js/serenity-js-mocha-webdriverio-template/](https://github.com/serenity-js/serenity-js-mocha-webdriverio-template/)

Έργο προτύπου [Serenity/JS](https://serenity-js.org?pk_campaign=wdio8&pk_source=webdriver.io) που σας βοηθά να ξεκινήσετε με δοκιμές αποδοχής των web εφαρμογών σας χρησιμοποιώντας τις πιο πρόσφατες εκδόσεις των WebdriverIO, Mocha και Serenity/JS.

- Frameworks
    - WebdriverIO (v8)
    - Mocha (v10)
    - Serenity/JS (v3)
    - Αναφορές Serenity BDD

- Χαρακτηριστικά
    - [Screenplay Pattern](https://serenity-js.org/handbook/design/screenplay-pattern/?pk_campaign=wdio8&pk_source=webdriver.io)
    - Αυτόματα στιγμιότυπα οθόνης σε αποτυχία δοκιμής, ενσωματωμένα στις αναφορές
    - Ρύθμιση Continuous Integration (CI) με χρήση [GitHub Actions](https://github.com/serenity-js/serenity-js-mocha-webdriverio-template/blob/main/.github/workflows/main.yml)
    - [Αναφορές επίδειξης Serenity BDD](https://serenity-js.github.io/serenity-js-mocha-webdriverio-template/) δημοσιευμένες στο GitHub Pages
    - TypeScript
    - ESLint

## [serenity-js/serenity-js-cucumber-webdriverio-template/](https://github.com/serenity-js/serenity-js-cucumber-webdriverio-template/)

Έργο προτύπου [Serenity/JS](https://serenity-js.org?pk_campaign=wdio8&pk_source=webdriver.io) που σας βοηθά να ξεκινήσετε με δοκιμές αποδοχής των web εφαρμογών σας χρησιμοποιώντας τις πιο πρόσφατες εκδόσεις των WebdriverIO, Cucumber και Serenity/JS.

- Frameworks
    - WebdriverIO (v8)
    - Cucumber (v9)
    - Serenity/JS (v3)
    - Αναφορές Serenity BDD

- Χαρακτηριστικά
    - [Screenplay Pattern](https://serenity-js.org/handbook/design/screenplay-pattern/?pk_campaign=wdio8&pk_source=webdriver.io)
    - Αυτόματα στιγμιότυπα οθόνης σε αποτυχία δοκιμής, ενσωματωμένα στις αναφορές
    - Ρύθμιση Continuous Integration (CI) με χρήση [GitHub Actions](https://github.com/serenity-js/serenity-js-cucumber-webdriverio-template/blob/main/.github/workflows/main.yml)
    - [Αναφορές επίδειξης Serenity BDD](https://serenity-js.github.io/serenity-js-mocha-webdriverio-template/) δημοσιευμένες στο GitHub Pages
    - TypeScript
    - ESLint

## [Muralijc/wdio-headspin-boilerplate](https://github.com/Muralijc/Wdio-Headspin-boilerplate/)
Έργο boilerplate για την εκτέλεση δοκιμών WebdriverIO στο Headspin Cloud (https://www.headspin.io/) χρησιμοποιώντας features του Cucumber και το μοτίβο page objects.
- Frameworks
    - WebdriverIO (v8)
    - Cucumber (v8)

- Χαρακτηριστικά
    - Ενσωμάτωση cloud με [Headspin](https://www.headspin.io/)
    - Υποστηρίζει Page Object Model
    - Περιέχει δείγματα σεναρίων γραμμένα σε δηλωτικό (Declarative) στυλ BDD
    - Ενσωματωμένες αναφορές html του cucumber

# Έργα Boilerplate v7
---

## [webdriverio/appium-boilerplate](https://github.com/webdriverio/appium-boilerplate/)

Έργο boilerplate για την εκτέλεση δοκιμών Appium με WebdriverIO για:

- Εγγενείς (Native) εφαρμογές iOS/Android
- Υβριδικές (Hybrid) εφαρμογές iOS/Android
- Προγράμματα περιήγησης Android Chrome και iOS Safari

Αυτό το boilerplate περιλαμβάνει τα εξής:

- Framework: Mocha
- Χαρακτηριστικά:
    - Διαμορφώσεις για:
        - Εφαρμογές iOS και Android
        - Προγράμματα περιήγησης iOS και Android
    - Βοηθητικά εργαλεία για:
        - WebView
        - Χειρονομίες (Gestures)
        - Εγγενείς ειδοποιήσεις (Native alerts)
        - Επιλογείς (Pickers)
     - Παραδείγματα δοκιμών για:
        - WebView
        - Σύνδεση (Login)
        - Φόρμες
        - Σάρωση (Swipe)
        - Προγράμματα περιήγησης

## [serhatbolsu/webdriverio-mocha-uiautomation-boiler](https://github.com/serhatbolsu/webdriverio-mocha-uiautomation-boiler)
Δοκιμές WEB ATDD με Mocha, WebdriverIO v6 με PageObject

- Frameworks
  - WebdriverIO (v7)
  - Mocha
- Χαρακτηριστικά
  - Μοντέλο [Page Object](pageobjects)
  - Ενσωμάτωση με Sauce Labs μέσω του [Sauce Service](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-sauce-service/README.md)
  - Αναφορά Allure
  - Αυτόματη λήψη στιγμιοτύπων οθόνης για αποτυχημένες δοκιμές
  - Παράδειγμα CircleCI
  - ESLint

## [WarleyGabriel/demo-webdriverio-mocha](https://github.com/WarleyGabriel/demo-webdriverio-mocha)

Έργο boilerplate για την εκτέλεση δοκιμών E2E με Mocha.

- Frameworks:
    - WebdriverIO (v7)
    - Mocha
- Χαρακτηριστικά:
    -   TypeScript
    -   [Expect-webdriverio](https://github.com/webdriverio/expect-webdriverio)
    -   [Δοκιμές οπτικής παλινδρόμησης](https://github.com/wswebcreation/wdio-image-comparison-service)
    -   Μοτίβο Page Object
    -   [Commit lint](https://github.com/conventional-changelog/commitlint) και [Commitizen](https://github.com/commitizen/cz-cli#making-your-repo-commitizen-friendly)
    -   ESlint
    -   Prettier
    -   Husky
    -   Παράδειγμα Github Actions
    -   Αναφορά Allure (στιγμιότυπα οθόνης σε αποτυχία)

## [17thSep/WebdriverIO_Master](https://github.com/17thSep/WebdriverIO_Master)

Έργο boilerplate για την εκτέλεση δοκιμών **WebdriverIO v7** για τα εξής:

[Scripts WDIO 7 με TypeScript στο Cucumber Framework](https://github.com/17thSep/WebdriverIO_Master/tree/master/TypeScript/Cucumber)
[Scripts WDIO 7 με TypeScript στο Mocha Framework](https://github.com/17thSep/WebdriverIO_Master/tree/master/TypeScript/Mocha)
[Εκτέλεση script WDIO 7 σε Docker](https://github.com/17thSep/WebdriverIO_Master/tree/master/TypeScript/Docker)
[Αρχεία καταγραφής δικτύου](https://github.com/17thSep/MonitorNetworkLogs/)

Έργο boilerplate για:

- Καταγραφή αρχείων καταγραφής δικτύου
- Καταγραφή όλων των κλήσεων GET/POST ή ενός συγκεκριμένου REST API
- Έλεγχο (assert) παραμέτρων αιτήματος
- Έλεγχο (assert) παραμέτρων απόκρισης
- Αποθήκευση όλων των αποκρίσεων σε ξεχωριστό αρχείο

## [Arjun-Ar91/Wdio7-appium-cucumber](https://github.com/Arjun-Ar91/Wdio7-appium-cucumber.git)

Έργο boilerplate για την εκτέλεση δοκιμών appium για εγγενείς εφαρμογές και προγράμματα περιήγησης κινητών, χρησιμοποιώντας cucumber v7 και wdio v7 με το μοτίβο page object.

- Frameworks
    - WebdriverIO v7
    - Cucumber v7
    - Appium

- Χαρακτηριστικά
    - Εγγενείς εφαρμογές Android και iOS
    - Πρόγραμμα περιήγησης Android Chrome
    - Πρόγραμμα περιήγησης iOS Safari
    - Page Object Model
    - Περιέχει δείγματα σεναρίων δοκιμών σε cucumber
    - Ενσωματωμένο με πολλαπλές αναφορές html του cucumber

## [praveendvd/webdriverIODockerBoilerplate/](https://github.com/praveendvd/webdriverIODockerBoilerplate)

Αυτό είναι ένα έργο προτύπου που σας δείχνει πώς μπορείτε να εκτελέσετε δοκιμές webdriverio σε web εφαρμογές χρησιμοποιώντας τις πιο πρόσφατες εκδόσεις του WebdriverIO και του framework Cucumber. Αυτό το έργο προορίζεται να λειτουργήσει ως βασική εικόνα που μπορείτε να χρησιμοποιήσετε για να κατανοήσετε πώς να εκτελείτε δοκιμές WebdriverIO σε docker

Αυτό το έργο περιλαμβάνει:

- DockerFile
- Έργο cucumber

Διαβάστε περισσότερα στο: [Medium Blog](https://praveendavidmathew.medium.com/running-webdriverio-in-wsl2-windows-91d3a0dc7746)

## [praveendvd/WebdriverIO_electronAppAutomation_boilerplate/](https://github.com/praveendvd/WebdriverIO_electronAppAutomation_boilerplate)

Αυτό είναι ένα έργο προτύπου που σας δείχνει πώς μπορείτε να εκτελέσετε δοκιμές electronJS χρησιμοποιώντας το WebdriverIO. Αυτό το έργο προορίζεται να λειτουργήσει ως βασική εικόνα που μπορείτε να χρησιμοποιήσετε για να κατανοήσετε πώς να εκτελείτε δοκιμές electronJS με WebdriverIO.

Αυτό το έργο περιλαμβάνει:

- Δείγμα εφαρμογής electronjs
- Δείγματα scripts δοκιμών cucumber

Διαβάστε περισσότερα στο: [Medium Blog](https://praveendavidmathew.medium.com/first-step-into-automation-of-electronjs-applications-ef89b7423ddd)

## [praveendvd/webdriverIO_winappdriver_boilerplate/](https://github.com/praveendvd/webdriverIO_winappdriver_boilerplate)

Αυτό είναι ένα έργο προτύπου που σας δείχνει πώς μπορείτε να αυτοματοποιήσετε εφαρμογές windows χρησιμοποιώντας το winappdriver και το WebdriverIO. Αυτό το έργο προορίζεται να λειτουργήσει ως βασική εικόνα που μπορείτε να χρησιμοποιήσετε για να κατανοήσετε πώς να εκτελείτε δοκιμές με windappdriver και WebdriverIO.

Διαβάστε περισσότερα στο: [Medium Blog](https://praveendavidmathew.medium.com/winappdriver-first-step-into-windows-app-test-automation-using-webdriverio-and-winappdriver-46320d89570b)

## [praveendvd/appium-chromedriver-multiremote-wdio-boilerplate/](https://github.com/praveendvd/appium-chromedriver-multiremote-wdio-boilerplate)


Αυτό είναι ένα έργο προτύπου που σας δείχνει πώς μπορείτε να χρησιμοποιήσετε τη δυνατότητα multi-remote του webdriverio με τις πιο πρόσφατες εκδόσεις του WebdriverIO και του framework Jasmine. Αυτό το έργο προορίζεται να λειτουργήσει ως βασική εικόνα που μπορείτε να χρησιμοποιήσετε για να κατανοήσετε πώς να εκτελείτε δοκιμές WebdriverIO σε docker

Αυτό το έργο χρησιμοποιεί:
     - chromedriver
     - jasmine
     - appium

## [webdriverio-roku-appium-boilerplate](https://github.com/AntonKostenko/webdriverIO-roku-appium)

Έργο προτύπου για την εκτέλεση δοκιμών appium σε πραγματικές συσκευές Roku χρησιμοποιώντας mocha με το μοτίβο page object.

- Frameworks
    - WebdriverIO Async v7
    - Appium 3.0
    - Mocha v7
    - Αναφορές Allure

- Χαρακτηριστικά
    - Page Object Model
    - Typescript
    - Στιγμιότυπο οθόνης σε αποτυχία
    - Παραδείγματα δοκιμών με χρήση ενός δείγματος καναλιού Roku

## [krishnapollu/wdio-cucumber-poc](https://github.com/krishnapollu/wdio-cucumber-poc)

Έργο PoC για δοκιμές E2E multi-remote με Cucumber καθώς και δοκιμές Mocha βασισμένες σε δεδομένα (Data driven)

- Framework:
    - Cucumber (v8)
    - WebdriverIO (v8)
    - Mocha (v8)

- Χαρακτηριστικά:
    - Δοκιμές E2E βασισμένες στο Cucumber
    - Δοκιμές βασισμένες σε δεδομένα (Data Driven) με Mocha
    - Δοκιμές μόνο για Web - τοπικά καθώς και σε πλατφόρμες cloud
    - Δοκιμές μόνο για κινητά - τοπικοί καθώς και απομακρυσμένοι εξομοιωτές (ή συσκευές) στο cloud
    - Δοκιμές Web + Κινητά - multi-remote - τοπικά καθώς και σε πλατφόρμες cloud
    - Πολλαπλές ενσωματωμένες αναφορές, συμπεριλαμβανομένης της Allure
    - Τα δεδομένα δοκιμών ( JSON / XLSX ) διαχειρίζονται καθολικά, ώστε να εγγράφονται τα δεδομένα (που δημιουργούνται δυναμικά) σε αρχείο μετά την εκτέλεση των δοκιμών
    - Github workflow για την εκτέλεση των δοκιμών και τη μεταφόρτωση της αναφοράς allure

## [Rondleysg/wdio-multiremote-appium-chromedriver-boilerplate](https://github.com/Rondleysg/wdio-multiremote-appium-chromedriver-boilerplate)

Αυτό είναι ένα έργο boilerplate που δείχνει πώς να εκτελείτε το webdriverio σε λειτουργία multi-remote χρησιμοποιώντας την υπηρεσία appium και chromedriver με την πιο πρόσφατη έκδοση του WebdriverIO.

- Frameworks
  - WebdriverIO (v9)
  - Appium (v2)
  - Mocha

- Χαρακτηριστικά
  - Μοντέλο [Page Object](pageobjects)
  - Typescript
  - Δοκιμές Web + Κινητά - multi-remote
  - Εγγενείς εφαρμογές Android και iOS
  - Appium
  - Chromedriver
  - ESLint
  - Παραδείγματα δοκιμών για σύνδεση (Login) στο http://the-internet.herokuapp.com και στην [εφαρμογή επίδειξης native του WebdriverIO](https://github.com/webdriverio/native-demo-app)