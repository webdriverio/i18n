---
id: boilerplates
title: Έργα Πρότυπα (Boilerplate)
---

Με την πάροδο του χρόνου, η κοινότητά μας έχει αναπτύξει αρκετά έργα που μπορείτε να χρησιμοποιήσετε ως έμπνευση για να δημιουργήσετε τη δική σας σουίτα δοκιμών.

# v9 Boilerplate Projects

## [webdriverio/cucumber-boilerplate](https://github.com/webdriverio/cucumber-boilerplate)

Το δικό μας πρότυπο για σουίτες δοκιμών Cucumber. Δημιουργήσαμε περισσότερους από 150 προκαθορισμένους ορισμούς βημάτων για εσάς, ώστε να μπορείτε να αρχίσετε να γράφετε αρχεία χαρακτηριστικών στο έργο σας αμέσως.

- Framework:
    - Cucumber
    - WebdriverIO
- Features:
    - Πάνω από 150 προκαθορισμένα βήματα που καλύπτουν σχεδόν ό,τι χρειάζεστε
    - Ενσωματώνει τη λειτουργικότητα Multiremote του WebdriverIO
    - Δική μας επίδειξη εφαρμογής

## [webdriverio/jasmine-boilerplate](https://github.com/webdriverio/jasmine-boilerplate)
Πρότυπο έργο για την εκτέλεση δοκιμών WebdriverIO με Jasmine χρησιμοποιώντας χαρακτηριστικά Babel και το μοτίβο αντικειμένων σελίδας.

- Frameworks
    - WebdriverIO
    - Jasmine
- Features
    - Page Object Pattern
    - Ενσωμάτωση Sauce Labs

## [webdriverio/electron-boilerplate](https://github.com/webdriverio/electron-boilerplate)
Πρότυπο έργο για την εκτέλεση δοκιμών WebdriverIO σε μια ελάχιστη εφαρμογή Electron.

- Frameworks
    - WebdriverIO
    - Mocha
- Features
    - Electron API mocking

## [amiya-pattnaik/gherkin-to-webdriverIO-test-generator](https://github.com/amiya-pattnaik/gherkin-to-webdriverIO-test-generator)
Αυτόματη δημιουργία κλάσεων Page Object του WebdriverIO και προδιαγραφών δοκιμών Mocha από αρχεία Gherkin .feature — μειώνοντας τη χειροκίνητη προσπάθεια, βελτιώνοντας τη συνέπεια και επιταχύνοντας τον αυτοματισμό QA. Αυτό το έργο όχι μόνο παράγει κώδικες συμβατούς με το webdriver.io αλλά επίσης ενισχύει όλες τις λειτουργικότητες του webdriver.io.

***Πώς Λειτουργεί;***
- Η διαδικασία ακολουθεί έναν αυτοματισμό δύο βημάτων:
- Βήμα 1: Gherkin σε stepMap (Δημιουργία αρχείων stepMap.json)
  - Δημιουργία αρχείων stepMap.json:
    - Αναλύει αρχεία .feature γραμμένα σε σύνταξη Gherkin.
    - Εξάγει σενάρια και βήματα.
    - Παράγει ένα δομημένο αρχείο .stepMap.json που περιέχει:
      - ενέργεια προς εκτέλεση (π.χ. click, setText, assertVisible)
      - selectorName για λογική αντιστοίχιση
      - selector για το στοιχείο DOM
      - σημείωση για τιμές ή επιβεβαίωση
- Βήμα 2: stepMap σε Κώδικα (Δημιουργία Κώδικα WebdriverIO).
  Χρησιμοποιεί το stepMap.json για να δημιουργήσει:
  - Δημιουργεί μια βασική κλάση page.js με κοινές μεθόδους και ρύθμιση browser.url().
  - Δημιουργεί κλάσεις συμβατές με το WebdriverIO Page Object Model (POM) ανά χαρακτηριστικό μέσα στο test/pageobjects/.
  - Δημιουργεί προδιαγραφές δοκιμών βασισμένες στο Mocha.
- Δομή Καταλόγου
```
project-root/
├── features/               # Input Gherkin feature files
├── stepMaps/               # Generated step maps (JSON)
├── test/
│   ├── pageobjects/        # Generated base Page class, Page Object classes
│   └── specs/              # Generated test specs
├── generateStepMap.js      # StepMap generator script
├── generateTestsFromMap.js # PageObject + test spec generator script
├── package.json
├── README.md
└── wdio.conf.js
```
---
# v8 Boilerplate Projects

## [amiya-pattnaik/webdriverIO-with-cucumberBDD](https://github.com/amiya-pattnaik/webdriverIO-with-cucumberBDD)

- Framework: WDIO-V8 με Cucumber (V8x).
- Features:
    - Μοντέλο Page Objects που χρησιμοποιεί προσέγγιση βασισμένη σε κλάσεις ES6 /ES7 και υποστήριξη TypeScript
    - Παραδείγματα επιλογής πολλαπλών επιλογέων για ερώτημα στοιχείου με περισσότερους από έναν επιλογείς ταυτόχρονα
    - Παραδείγματα εκτέλεσης πολλαπλών προγραμμάτων περιήγησης και εκτέλεσης προγραμμάτων περιήγησης χωρίς περιβάλλον χρησιμοποιώντας - Chrome και Firefox
    - Ενσωμάτωση δοκιμών cloud με BrowserStack, Sauce Labs, LambdaTest
    - Παραδείγματα ανάγνωσης/εγγραφής δεδομένων από MS-Excel για εύκολη διαχείριση δεδομένων δοκιμών από εξωτερικές πηγές δεδομένων με παραδείγματα
    - Υποστήριξη βάσης δεδομένων για οποιοδήποτε RDBMS (Oracle, MySql, TeraData, Vertica κλπ.), εκτέλεση οποιωνδήποτε ερωτημάτων / λήψη συνόλου αποτελεσμάτων κλπ. με παραδείγματα για δοκιμές E2E
    - Πολλαπλές αναφορές (Spec, Xunit/Junit, Allure, JSON) και φιλοξενία αναφορών Allure και Xunit/Junit σε WebServer.
    - Παραδείγματα με εφαρμογή επίδειξης https://search.yahoo.com/ και http://the-internet.herokuapp.com.
    - Συγκεκριμένα αρχεία `.config` για BrowserStack, Sauce Labs, LambdaTest και Appium (για αναπαραγωγή σε κινητή συσκευή). Για εγκατάσταση Appium με ένα κλικ σε τοπικό μηχάνημα για iOS και Android ανατρέξτε στο [appium-setup-made-easy-OSX](https://github.com/amiya-pattnaik/appium-setup-made-easy-OSX).

## [amiya-pattnaik/webdriverIO-with-mochaBDD](https://github.com/amiya-pattnaik/webdriverIO-with-mochaBDD)

- Framework: WDIO-V8 με Mocha (V10x).
- Features:
    -  Μοντέλο Page Objects που χρησιμοποιεί προσέγγιση βασισμένη σε κλάσεις ES6 /ES7 και υποστήριξη TypeScript
    -  Παραδείγματα με εφαρμογή επίδειξης https://search.yahoo.com και http://the-internet.herokuapp.com
    -  Παραδείγματα εκτέλεσης πολλαπλών προγραμμάτων περιήγησης και εκτέλεσης προγραμμάτων περιήγησης χωρίς περιβάλλον χρησιμοποιώντας - Chrome και Firefox
    -  Ενσωμάτωση δοκιμών cloud με BrowserStack, Sauce Labs, LambdaTest
    -  Πολλαπλές αναφορές (Spec, Xunit/Junit, Allure, JSON) και φιλοξενία αναφορών Allure και Xunit/Junit σε WebServer.
    -  Παραδείγματα ανάγνωσης/εγγραφής δεδομένων από MS-Excel για εύκολη διαχείριση δεδομένων δοκιμών από εξωτερικές πηγές δεδομένων με παραδείγματα
    -  Παραδείγματα σύνδεσης DB σε οποιοδήποτε RDBMS (Oracle, MySql, TeraData, Vertica κλπ.), εκτέλεση οποιουδήποτε ερωτήματος / λήψη συνόλου αποτελεσμάτων κλπ. με παραδείγματα για δοκιμές E2E
    -  Συγκεκριμένα αρχεία `.config` για BrowserStack, Sauce Labs, LambdaTest και Appium (για αναπαραγωγή σε κινητή συσκευή). Για εγκατάσταση Appium με ένα κλικ σε τοπικό μηχάνημα για iOS και Android ανατρέξτε στο [appium-setup-made-easy-OSX](https://github.com/amiya-pattnaik/appium-setup-made-easy-OSX).

## [amiya-pattnaik/webdriverIO-with-jasmineBDD](https://github.com/amiya-pattnaik/webdriverIO-with-jasmineBDD)

- Framework: WDIO-V8 με Jasmine (V4x).
- Features:
    -  Μοντέλο Page Objects που χρησιμοποιεί προσέγγιση βασισμένη σε κλάσεις ES6 /ES7 και υποστήριξη TypeScript
    -  Παραδείγματα με εφαρμογή επίδειξης https://search.yahoo.com και http://the-internet.herokuapp.com
    -  Παραδείγματα εκτέλεσης πολλαπλών προγραμμάτων περιήγησης και εκτέλεσης προγραμμάτων περιήγησης χωρίς περιβάλλον χρησιμοποιώντας - Chrome και Firefox
    -  Ενσωμάτωση δοκιμών cloud με BrowserStack, Sauce Labs, LambdaTest
    -  Πολλαπλές αναφορές (Spec, Xunit/Junit, Allure, JSON) και φιλοξενία αναφορών Allure και Xunit/Junit σε WebServer.
    -  Παραδείγματα ανάγνωσης/εγγραφής δεδομένων από MS-Excel για εύκολη διαχείριση δεδομένων δοκιμών από εξωτερικές πηγές δεδομένων με παραδείγματα
    -  Παραδείγματα σύνδεσης DB σε οποιοδήποτε RDBMS (Oracle, MySql, TeraData, Vertica κλπ.), εκτέλεση οποιουδήποτε ερωτήματος / λήψη συνόλου αποτελεσμάτων κλπ. με παραδείγματα για δοκιμές E2E
    -  Συγκεκριμένα αρχεία `.config` για BrowserStack, Sauce Labs, LambdaTest και Appium (για αναπαραγωγή σε κινητή συσκευή). Για εγκατάσταση Appium με ένα κλικ σε τοπικό μηχάνημα για iOS και Android ανατρέξτε στο [appium-setup-made-easy-OSX](https://github.com/amiya-pattnaik/appium-setup-made-easy-OSX).

## [syamphaneendra/webdriverio-web-mobile-boilerplate](https://github.com/syamphaneendra/webdriverio-web-mobile-boilerplate)

Αυτό το πρότυπο έργο έχει δοκιμές WebdriverIO 8 με cucumber και typescript, ακολουθώντας το μοτίβο αντικειμένων σελίδας.

- Frameworks:
    - WebdriverIO v8
    - Cucumber v8

- Features:
    - Typescript v5
    - Page Object Pattern
    - Prettier
    - Υποστήριξη πολλαπλών προγραμμάτων περιήγησης
      - Chrome
      - Firefox
      - Edge
      - Safari
      - Standalone
    - Παράλληλη εκτέλεση σε διαφορετικά προγράμματα περιήγησης
    - Appium
    - Ενσωμάτωση δοκιμών cloud με BrowserStack & Sauce Labs
    - Docker service
    - Share data service
    - Ξεχωριστά αρχεία διαμόρφωσης για κάθε υπηρεσία
    - Διαχείριση δεδομένων δοκιμών & ανάγνωση ανά τύπο χρήστη
    - Αναφορές
      - Dot
      - Spec
      - Multiple cucumber html report με στιγμιότυπα αποτυχίας
    - Gitlab pipelines για αποθετήριο Gitlab
    - Github actions για αποθετήριο Github
    - Docker compose για τη ρύθμιση του docker hub
    - Δοκιμές προσβασιμότητας χρησιμοποιώντας AXE
    - Οπτικές δοκιμές χρησιμοποιώντας Applitools
    - Μηχανισμός καταγραφής


## [klassijs/klassi-js (cucumber-template)](https://github.com/klassijs/klassi-example-test-suite.git)

- Frameworks
    - WebdriverIO (v8)
    - Cucumber (v8)

- Features
    - Περιέχει δείγμα σεναρίου δοκιμής σε cucumber
    - Ενσωματωμένες αναφορές html cucumber με ενσωματωμένα βίντεο για αποτυχίες
    - Ενσωματωμένες υπηρεσίες Lambdatest και CircleCI
    - Ενσωματωμένες οπτικές, δοκιμές προσβασιμότητας και API
    - Ενσωματωμένη λειτουργικότητα email
    - Ενσωματωμένος κάδος s3 για αποθήκευση και ανάκτηση αναφορών δοκιμών

## [serenity-js/serenity-js-mocha-webdriverio-template/](https://github.com/serenity-js/serenity-js-mocha-webdriverio-template/)

Πρότυπο έργο [Serenity/JS](https://serenity-js.org?pk_campaign=wdio8&pk_source=webdriver.io) για να σας βοηθήσει να ξεκινήσετε με τις δοκιμές αποδοχής των διαδικτυακών εφαρμογών σας χρησιμοποιώντας τα πιο πρόσφατα WebdriverIO, Mocha και Serenity/JS.

- Frameworks
    - WebdriverIO (v8)
    - Mocha (v10)
    - Serenity/JS (v3)
    - Serenity BDD reporting

- Features
    - [Screenplay Pattern](https://serenity-js.org/handbook/design/screenplay-pattern/?pk_campaign=wdio8&pk_source=webdriver.io)
    - Αυτόματα στιγμιότυπα οθόνης σε περίπτωση αποτυχίας δοκιμής, ενσωματωμένα στις αναφορές
    - Ρύθμιση Συνεχούς Ενσωμάτωσης (CI) χρησιμοποιώντας [GitHub Actions](https://github.com/serenity-js/serenity-js-mocha-webdriverio-template/blob/main/.github/workflows/main.yml)
    - [Επίδειξη αναφορών Serenity BDD](https://serenity-js.github.io/serenity-js-mocha-webdriverio-template/) που δημοσιεύονται στο GitHub Pages
    - TypeScript
    - ESLint

## [serenity-js/serenity-js-cucumber-webdriverio-template/](https://github.com/serenity-js/serenity-js-cucumber-webdriverio-template/)

Πρότυπο έργο [Serenity/JS](https://serenity-js.org?pk_campaign=wdio8&pk_source=webdriver.io) για να σας βοηθήσει να ξεκινήσετε με τις δοκιμές αποδοχής των διαδικτυακών εφαρμογών σας χρησιμοποιώντας τα πιο πρόσφατα WebdriverIO, Cucumber και Serenity/JS.

- Frameworks
    - WebdriverIO (v8)
    - Cucumber (v9)
    - Serenity/JS (v3)
    - Serenity BDD reporting

- Features
    - [Screenplay Pattern](https://serenity-js.org/handbook/design/screenplay-pattern/?pk_campaign=wdio8&pk_source=webdriver.io)
    - Αυτόματα στιγμιότυπα οθόνης σε περίπτωση αποτυχίας δοκιμής, ενσωματωμένα στις αναφορές
    - Ρύθμιση Συνεχούς Ενσωμάτωσης (CI) χρησιμοποιώντας [GitHub Actions](https://github.com/serenity-js/serenity-js-cucumber-webdriverio-template/blob/main/.github/workflows/main.yml)
    - [Επίδειξη αναφορών Serenity BDD](https://serenity-js.github.io/serenity-js-mocha-webdriverio-template/) που δημοσιεύονται στο GitHub Pages
    - TypeScript
    - ESLint

## [Muralijc/wdio-headspin-boilerplate](https://github.com/Muralijc/Wdio-Headspin-boilerplate/)
Πρότυπο έργο για την εκτέλεση δοκιμών WebdriverIO στο Headspin Cloud (https://www.headspin.io/) χρησιμοποιώντας χαρακτηριστικά Cucumber και το μοτίβο αντικειμένων σελίδας.
- Frameworks
    - WebdriverIO (v8)
    - Cucumber (v8)

- Features
    - Ενσωμάτωση cloud με [Headspin](https://www.headspin.io/)
    - Υποστηρίζει το Μοντέλο Αντικειμένων Σελίδας
    - Περιέχει δείγματα Σεναρίων γραμμένα σε Δηλωτικό στυλ BDD
    - Ενσωματωμένες αναφορές html cucumber

# v7 Boilerplate Projects
---

## [webdriverio/appium-boilerplate](https://github.com/webdriverio/appium-boilerplate/)

Πρότυπο έργο για την εκτέλεση δοκιμών Appium με WebdriverIO για:

- Εγγενείς εφαρμογές iOS/Android
- Υβριδικές εφαρμογές iOS/Android
- Πρόγραμμα περιήγησης Android Chrome και iOS Safari

Αυτό το πρότυπο περιλαμβάνει τα εξής:

- Framework: Mocha
- Features:
    - Ρυθμίσεις για:
        - Εφαρμογή iOS και Android
        - Προγράμματα περιήγησης iOS και Android
    - Βοηθοί για:
        - WebView
        - Χειρονομίες
        - Εγγενείς ειδοποιήσεις
        - Επιλογείς
     - Παραδείγματα δοκιμών για:
        - WebView
        - Login
        - Forms
        - Swipe
        - Browsers

## [serhatbolsu/webdriverio-mocha-uiautomation-boiler](https://github.com/serhatbolsu/webdriverio-mocha-uiautomation-boiler)
Δοκιμές ATDD WEB με Mocha, WebdriverIO v6 με PageObject

- Frameworks
  - WebdriverIO (v7)
  - Mocha
- Features
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
- Features:
    -   TypeScript
    -   [Expect-webdriverio](https://github.com/webdriverio/expect-webdriverio)
    -   [Δοκιμές οπτικής παλινδρόμησης](https://github.com/wswebcreation/wdio-image-comparison-service)
    -   Μοτίβο αντικειμένων σελίδας
    -   [Commit lint](https://github.com/conventional-changelog/commitlint) και [Commitizen](https://github.com/commitizen/cz-cli#making-your-repo-commitizen-friendly)
    -   ESlint
    -   Prettier
    -   Husky
    -   Παράδειγμα Github Actions
    -   Αναφορά Allure (στιγμιότυπα οθόνης σε περίπτωση αποτυχίας)

## [17thSep/WebdriverIO_Master](https://github.com/17thSep/WebdriverIO_Master)

Πρότυπο έργο για την εκτέλεση δοκιμών **WebdriverIO v7** για τα εξής:

[WDIO 7 scripts with TypeScript in Cucumber Framework](https://github.com/17thSep/WebdriverIO_Master/tree/master/TypeScript/Cucumber)
[WDIO 7 scripts with TypeScript in Mocha Framework](https://github.com/17thSep/WebdriverIO_Master/tree/master/TypeScript/Mocha)
[Run WDIO 7 script in Docker](https://github.com/17thSep/WebdriverIO_Master/tree/master/TypeScript/Docker)
[Network logs](https://github.com/17thSep/MonitorNetworkLogs/)

Πρότυπο έργο για:

- Καταγραφή αρχείων καταγραφής δικτύου
- Καταγραφή όλων των κλήσεων GET/POST ή ενός συγκεκριμένου REST API
- Επιβεβαίωση παραμέτρων αιτήματος
- Επιβεβαίωση παραμέτρων απόκρισης
- Αποθήκευση όλων των αποκρίσεων σε ξεχωριστό αρχείο

## [Arjun-Ar91/Wdio7-appium-cucumber](https://github.com/Arjun-Ar91/Wdio7-appium-cucumber.git)

Πρότυπο έργο για την εκτέλεση δοκιμών appium για εγγενείς και κινητές εφαρμογές περιήγησης χρησιμοποιώντας cucumber v7 και wdio v7 με μοτίβο αντικειμένων σελίδας.

- Frameworks
    - WebdriverIO v7
    - Cucumber v7
    - Appium

- Features
    - Εγγενείς εφαρμογές Android και iOS
    - Πρόγραμμα περιήγησης Android Chrome
    - Πρόγραμμα περιήγησης iOS Safari
    - Μοντέλο αντικειμένων σελίδας
    - Περιέχει δείγματα σεναρίων δοκιμών σε cucumber
    - Ενσωματωμένο με πολλαπλές αναφορές html cucumber

## [praveendvd/webdriverIODockerBoilerplate/](https://github.com/praveendvd/webdriverIODockerBoilerplate)

Αυτό είναι ένα πρότυπο έργο που σας βοηθά να δείξει πώς μπορείτε να εκτελέσετε δοκιμές webdriverio από διαδικτυακές εφαρμογές χρησιμοποιώντας τα πιο πρόσφατα WebdriverIO και το πλαίσιο Cucumber. Αυτό το έργο προορίζεται να λειτουργήσει ως βασική εικόνα που μπορείτε να χρησιμοποιήσετε για να κατανοήσετε πώς να εκτελέσετε δοκιμές WebdriverIO σε docker

Αυτό το έργο περιλαμβάνει:

- DockerFile
- cucumber Project

Διαβάστε περισσότερα στο: [Medium Blog](https://praveendavidmathew.medium.com/running-webdriverio-in-wsl2-windows-91d3a0dc7746)

## [praveendvd/WebdriverIO_electronAppAutomation_boilerplate/](https://github.com/praveendvd/WebdriverIO_electronAppAutomation_boilerplate)

Αυτό είναι ένα πρότυπο έργο που σας βοηθά να δείξει πώς μπορείτε να εκτελέσετε δοκιμές electronJS χρησιμοποιώντας το WebdriverIO. Αυτό το έργο προορίζεται να λειτουργήσει ως βασική εικόνα που μπορείτε να χρησιμοποιήσετε για να κατανοήσετε πώς να εκτελέσετε δοκιμές WebdriverIO electronJS.

Αυτό το έργο περιλαμβάνει:

- Δείγμα εφαρμογής electronjs
- Δείγματα σεναρίων δοκιμών cucumber

Διαβάστε περισσότερα στο: [Medium Blog](https://praveendavidmathew.medium.com/first-step-into-automation-of-electronjs-applications-ef89b7423ddd)

## [praveendvd/webdriverIO_winappdriver_boilerplate/](https://github.com/praveendvd/webdriverIO_winappdriver_boilerplate)

Αυτό είναι ένα πρότυπο έργο που σας βοηθά να δείξει πώς μπορείτε να αυτοματοποιήσετε εφαρμογές των Windows χρησιμοποιώντας winappdriver και WebdriverIO. Αυτό το έργο προορίζεται να λειτουργήσει ως βασική εικόνα που μπορείτε να χρησιμοποιήσετε για να κατανοήσετε πώς να εκτελέσετε δοκιμές windappdriver και WebdriverIO.

Διαβάστε περισσότερα στο: [Medium Blog](https://praveendavidmathew.medium.com/winappdriver-first-step-into-windows-app-test-automation-using-webdriverio-and-winappdriver-46320d89570b)

## [praveendvd/appium-chromedriver-multiremote-wdio-boilerplate/](https://github.com/praveendvd/appium-chromedriver-multiremote-wdio-boilerplate)


Αυτό είναι ένα πρότυπο έργο που σας βοηθά να δείξει πώς μπορείτε να εκτελέσετε τη δυνατότητα πολλαπλών απομακρυσμένων συνδέσεων του webdriverio με τα πιο πρόσφατα WebdriverIO και το πλαίσιο Jasmine. Αυτό το έργο προορίζεται να λειτουργήσει ως βασική εικόνα που μπορείτε να χρησιμοποιήσετε για να κατανοήσετε πώς να εκτελέσετε δοκιμές WebdriverIO σε docker

Αυτό το έργο χρησιμοποιεί:
     - chromedriver
     - jasmine
     - appium

## [webdriverio-roku-appium-boilerplate](https://github.com/AntonKostenko/webdriverIO-roku-appium)

Πρότυπο έργο για την εκτέλεση δοκιμών appium σε πραγματικές συσκευές Roku χρησιμοποιώντας mocha με μοτίβο αντικειμένων σελίδας.

- Frameworks
    - WebdriverIO Async v7
    - Appium 2.0
    - Mocha v7
    - Allure Reporting

- Features
    - Μοντέλο αντικειμένων σελίδας
    - Typescript
    - Στιγμιότυπο οθόνης σε περίπτωση αποτυχίας
    - Παραδείγματα δοκιμών χρησιμοποιώντας ένα δείγμα καναλιού Roku

## [krishnapollu/wdio-cucumber-poc](https://github.com/krishnapollu/wdio-cucumber-poc)

Έργο PoC για δοκιμές Multiremote E2E Cucumber καθώς και δοκιμές Mocha με βάση τα δεδομένα

- Framework:
    - Cucumber (v8)
    - WebdriverIO (v8)
    - Mocha (v8)

- Features:
    - Δοκιμές E2E βασισμένες σε Cucumber
    - Δοκιμές με βάση τα δεδομένα σε Mocha
    - Δοκιμές μόνο για Web - σε τοπικές και πλατφόρμες cloud
    - Δοκιμές μόνο για κινητά - τοπικά καθώς και απομακρυσμένοι εξομοιωτές cloud (ή συσκευές)
    - Δοκιμές Web + Mobile - Multiremote - τοπικές και πλατφόρμες cloud
    - Ενσωματωμένες πολλαπλές αναφορές συμπεριλαμβανομένου του Allure
    - Δεδομένα δοκιμών (JSON / XLSX) που διαχειρίζονται καθολικά ώστε να γράφονται τα δεδομένα (που δημιουργούνται κατά τη διάρκεια) σε ένα αρχείο μετά την εκτέλεση δοκιμής
    - Ροή εργασιών Github για την εκτέλεση της δοκιμής και την ανάρτηση της αναφοράς allure

## [Rondleysg/wdio-multiremote-appium-chromedriver-boilerplate](https://github.com/Rondleysg/wdio-multiremote-appium-chromedriver-boilerplate)

Αυτό είναι ένα πρότυπο έργο για να βοηθήσει στην επίδειξη του τρόπου εκτέλεσης του multi-remote webdriverio χρησιμοποιώντας την υπηρεσία appium και chromedriver με το πιο πρόσφατο WebdriverIO.

- Frameworks
  - WebdriverIO (v9)
  - Appium (v2)
  - Mocha

- Features
  - Μοντέλο [Page Object](pageobjects)
  - Typescript
  - Δοκιμές Web + Mobile - Multiremote
  - Εγγενείς εφαρμογές Android και iOS
  - Appium
  - Chromedriver
  - ESLint
  - Παραδείγματα δοκιμών για σύνδεση στο http://the-internet.herokuapp.com και [WebdriverIO native demo app](https://github.com/webdriverio/native-demo-app)