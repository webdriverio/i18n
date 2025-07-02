---
id: boilerplates
title: Έργα Πρότυπα
---

Με την πάροδο του χρόνου, η κοινότητά μας έχει αναπτύξει αρκετά έργα που μπορείτε να χρησιμοποιήσετε ως έμπνευση για να δημιουργήσετε τη δική σας σουίτα δοκιμών.

# v9 Boilerplate Projects

## [webdriverio/cucumber-boilerplate](https://github.com/webdriverio/cucumber-boilerplate)

Το δικό μας πρότυπο για σουίτες δοκιμών Cucumber. Δημιουργήσαμε πάνω από 150 προκαθορισμένους ορισμούς βημάτων για εσάς, ώστε να μπορείτε να αρχίσετε να γράφετε αρχεία χαρακτηριστικών στο έργο σας αμέσως.

- Framework:
    - Cucumber
    - WebdriverIO
- Features:
    - Πάνω από 150 προκαθορισμένα βήματα που καλύπτουν σχεδόν όλα όσα χρειάζεστε
    - Ενσωματώνει τη λειτουργικότητα Multiremote του WebdriverIO
    - Δική του δοκιμαστική εφαρμογή

## [webdriverio/jasmine-boilerplate](https://github.com/webdriverio/jasmine-boilerplate)
Έργο πρότυπο για την εκτέλεση δοκιμών WebdriverIO με Jasmine χρησιμοποιώντας λειτουργίες Babel και το μοτίβο αντικειμένων σελίδας.

- Frameworks
    - WebdriverIO
    - Jasmine
- Features
    - Page Object Pattern
    - Sauce Labs integration

## [webdriverio/electron-boilerplate](https://github.com/webdriverio/electron-boilerplate)
Έργο πρότυπο για την εκτέλεση δοκιμών WebdriverIO σε μια ελάχιστη εφαρμογή Electron.

- Frameworks
    - WebdriverIO
    - Mocha
- Features
    - Electron API mocking

## [amiya-pattnaik/wdio-testgen-from-gherkin-js](https://github.com/amiya-pattnaik/wdio-testgen-from-gherkin-js)
## [amiya-pattnaik/wdio-testgen-from-gherkin-ts](https://github.com/amiya-pattnaik/wdio-testgen-from-gherkin-ts)
Αυτόματη δημιουργία κλάσεων Page Object του WebdriverIO και προδιαγραφών δοκιμών Mocha από αρχεία Gherkin .feature — μειώνοντας τη χειροκίνητη προσπάθεια, βελτιώνοντας τη συνέπεια και επιταχύνοντας τον αυτοματισμό QA. Αυτό το έργο όχι μόνο παράγει κώδικες συμβατούς με το webdriver.io αλλά ενισχύει επίσης όλες τις λειτουργίες του webdriver.io. Έχουμε δημιουργήσει δύο εκδόσεις, μία για χρήστες JavaScript και μία για χρήστες TypeScript. Αλλά και τα δύο έργα λειτουργούν με τον ίδιο τρόπο.

***How It Works?***
- The process follows a two-step automation:
- Step 1: Gherkin to stepMap (Generate stepMap.json Files)
  - Generate stepMap.json Files:
    - Parses .feature files written in Gherkin syntax.
    - Extracts scenarios and steps.
    - Produces a structured .stepMap.json file containing:
      - action to perform (e.g., click, setText, assertVisible)
      - selectorName for logical mapping
      - selector for the DOM element
      - note for values or assertion
- Step 2: stepMap to Code (Generate WebdriverIO Code).
  Uses stepMap.json to generate:
  - Generate a base page.js class with shared methods and browser.url() setup.
  - Generate WebdriverIO-compatible Page Object Model (POM) classes per feature inside test/pageobjects/.
  - Generate Mocha-based test specs.
- Example of Directory Structure for JavaScript / TypeScript. Below is for JS version, TS version has smae structure as well.
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
# v8 Boilerplate Projects

## [amiya-pattnaik/webdriverIO-with-cucumberBDD](https://github.com/amiya-pattnaik/webdriverIO-with-cucumberBDD)

- Framework: WDIO-V8 with Cucumber (V8x).
- Features:
    - Page Objects Model uses with ES6 /ES7 style class base approach and TypeScript support
    - Examples of multi selector option to query element with more than one selector at a time
    - Examples of multi browser and headless browser execution using - Chrome and Firefox
    - Cloud testing Integration with BrowserStack, Sauce Labs, LambdaTest
    - Examples of read/write data from MS-Excel for easy test data management from external data sources with examples
    - Database support to any RDBMS (Oracle, MySql, TeraData, Vertica etc.), executing any queries / fetching result set etc. with examples for E2E testing
    - Multiple reporting (Spec, Xunit/Junit, Allure, JSON) and Hosting Allure and Xunit/Junit reporting on WebServer.
    - Examples with demo app https://search.yahoo.com/  and http://the-internet.herokuapp.com.
    - BrowserStack, Sauce Labs, LambdaTest and Appium specific `.config` file (for playback on mobile device). For one click Appium setup on local machine for iOS and Android refer to [appium-setup-made-easy-OSX](https://github.com/amiya-pattnaik/appium-setup-made-easy-OSX).

## [amiya-pattnaik/webdriverIO-with-mochaBDD](https://github.com/amiya-pattnaik/webdriverIO-with-mochaBDD)

- Framework: WDIO-V8 with Mocha (V10x).
- Features:
    -  Page Objects Model uses with ES6 /ES7 style class base approach and TypeScript support
    -  Examples with demo app https://search.yahoo.com  and http://the-internet.herokuapp.com
    -  Examples of multi browser and headless browser execution using - Chrome and Firefox
    -  Cloud testing Integration with BrowserStack, Sauce Labs, LambdaTest
    -  Multiple reporting (Spec, Xunit/Junit, Allure, JSON) and Hosting Allure and Xunit/Junit reporting on WebServer.
    -  Examples of read/write data from MS-Excel for easy test data management from external data sources with examples
    -  Examples of DB connect to any RDBMS (Oracle, MySql, TeraData, Vertica etc.), any query execution / fetching result set etc. with examples for E2E testing
    -  BrowserStack, Sauce Labs, LambdaTest and Appium specific `.config` file (for playback on mobile device). For one click Appium setup on local machine for iOS and Android refer to [appium-setup-made-easy-OSX](https://github.com/amiya-pattnaik/appium-setup-made-easy-OSX).

## [amiya-pattnaik/webdriverIO-with-jasmineBDD](https://github.com/amiya-pattnaik/webdriverIO-with-jasmineBDD)

- Framework: WDIO-V8 with Jasmine (V4x).
- Features:
    -  Page Objects Model uses with ES6 /ES7 style class base approach and TypeScript support
    -  Examples with demo app https://search.yahoo.com  and http://the-internet.herokuapp.com
    -  Examples of multi browser and headless browser execution using - Chrome and Firefox
    -  Cloud testing Integration with BrowserStack, Sauce Labs, LambdaTest
    -  Multiple reporting (Spec, Xunit/Junit, Allure, JSON) and Hosting Allure and Xunit/Junit reporting on WebServer.
    -  Examples of read/write data from MS-Excel for easy test data management from external data sources with examples
    -  Examples of DB connect to any RDBMS (Oracle, MySql, TeraData, Vertica etc.), any query execution / fetching result set etc. with examples for E2E testing
    -  BrowserStack, Sauce Labs, LambdaTest and Appium specific `.config` file ( for playback on mobile device). For one click Appium setup on local machine for iOS and Android refer to [appium-setup-made-easy-OSX](https://github.com/amiya-pattnaik/appium-setup-made-easy-OSX).

## [syamphaneendra/webdriverio-web-mobile-boilerplate](https://github.com/syamphaneendra/webdriverio-web-mobile-boilerplate)

Αυτό το πρότυπο έργο έχει δοκιμές WebdriverIO 8 με cucumber και typescript, ακολουθώντας το μοτίβο αντικειμένων σελίδας.

- Frameworks:
    - WebdriverIO v8
    - Cucumber v8

- Features:
    - Typescript v5
    - Page Object Pattern
    - Prettier
    - Multi browser support
      - Chrome
      - Firefox
      - Edge
      - Safari
      - Standalone
    - Crossbrowser parallel execution
    - Appium
    - Cloud testing Integration with BrowserStack & Sauce Labs
    - Docker service
    - Share data service
    - Separate config files for each service
    - Testdata management & read by user type
    - Reporting
      - Dot
      - Spec
      - Multiple cucumber html report with failure screenshots
    - Gitlab pipelines for Gitlab repository
    - Github actions for Github repository
    - Docker compose for setting up the docker hub
    - Accessibility testing using AXE
    - Visual testing using Applitools
    - Log mechansim


## [klassijs/klassi-js (cucumber-template)](https://github.com/klassijs/klassi-example-test-suite.git)

- Frameworks
    - WebdriverIO (v8)
    - Cucumber (v8)

- Features
    - Contain sample test scenario in cucumber
    - Integrated cucumber html reports with Embedded videos on failures
    - Integrated Lambdatest and CircleCI services
    - Integrated Visual, Accessibility and API testing
    - Integrated Email functionality
    - Integrated s3 bucket for test reports storage and retrieval

## [serenity-js/serenity-js-mocha-webdriverio-template/](https://github.com/serenity-js/serenity-js-mocha-webdriverio-template/)

[Serenity/JS](https://serenity-js.org?pk_campaign=wdio8&pk_source=webdriver.io) πρότυπο έργο για να σας βοηθήσει να ξεκινήσετε με δοκιμές αποδοχής των διαδικτυακών εφαρμογών σας χρησιμοποιώντας τα πιο πρόσφατα WebdriverIO, Mocha και Serenity/JS.

- Frameworks
    - WebdriverIO (v8)
    - Mocha (v10)
    - Serenity/JS (v3)
    - Serenity BDD reporting

- Features
    - [Screenplay Pattern](https://serenity-js.org/handbook/design/screenplay-pattern/?pk_campaign=wdio8&pk_source=webdriver.io)
    - Automatic screenshots on test failure, embedded in reports
    - Continuous Integration (CI) setup using [GitHub Actions](https://github.com/serenity-js/serenity-js-mocha-webdriverio-template/blob/main/.github/workflows/main.yml)
    - [Demo Serenity BDD reports](https://serenity-js.github.io/serenity-js-mocha-webdriverio-template/) published to GitHub Pages
    - TypeScript
    - ESLint

## [serenity-js/serenity-js-cucumber-webdriverio-template/](https://github.com/serenity-js/serenity-js-cucumber-webdriverio-template/)

[Serenity/JS](https://serenity-js.org?pk_campaign=wdio8&pk_source=webdriver.io) πρότυπο έργο για να σας βοηθήσει να ξεκινήσετε με δοκιμές αποδοχής των διαδικτυακών εφαρμογών σας χρησιμοποιώντας τα πιο πρόσφατα WebdriverIO, Cucumber και Serenity/JS.

- Frameworks
    - WebdriverIO (v8)
    - Cucumber (v9)
    - Serenity/JS (v3)
    - Serenity BDD reporting

- Features
    - [Screenplay Pattern](https://serenity-js.org/handbook/design/screenplay-pattern/?pk_campaign=wdio8&pk_source=webdriver.io)
    - Automatic screenshots on test failure, embedded in reports
    - Continuous Integration (CI) setup using [GitHub Actions](https://github.com/serenity-js/serenity-js-cucumber-webdriverio-template/blob/main/.github/workflows/main.yml)
    - [Demo Serenity BDD reports](https://serenity-js.github.io/serenity-js-mocha-webdriverio-template/) published to GitHub Pages
    - TypeScript
    - ESLint

## [Muralijc/wdio-headspin-boilerplate](https://github.com/Muralijc/Wdio-Headspin-boilerplate/)
Πρότυπο έργο για την εκτέλεση δοκιμών WebdriverIO στο Headspin Cloud (https://www.headspin.io/) χρησιμοποιώντας λειτουργίες Cucumber και το μοτίβο αντικειμένων σελίδας.
- Frameworks
    - WebdriverIO (v8)
    - Cucumber (v8)

- Features
    - Cloud integration with [Headspin](https://www.headspin.io/)
    - Supports Page Object Model
    - Contains sample Scenarios written in Declarative style of BDD
    - Integrated cucumber html reports

# v7 Boilerplate Projects
---

## [webdriverio/appium-boilerplate](https://github.com/webdriverio/appium-boilerplate/)

Πρότυπο έργο για την εκτέλεση δοκιμών Appium με WebdriverIO για:

- iOS/Android Native Apps
- iOS/Android Hybrid Apps
- Android Chrome and iOS Safari browser

Αυτό το πρότυπο περιλαμβάνει τα ακόλουθα:

- Framework: Mocha
- Features:
    - Configs for:
        - iOS and Android app
        - iOS and Android browsers
    - Helpers for:
        - WebView
        - Gestures
        - Native alerts
        - Pickers
     - Tests examples for:
        - WebView
        - Login
        - Forms
        - Swipe
        - Browsers

## [serhatbolsu/webdriverio-mocha-uiautomation-boiler](https://github.com/serhatbolsu/webdriverio-mocha-uiautomation-boiler)
ATDD WEB tests with Mocha, WebdriverIO v6 with PageObject

- Frameworks
  - WebdriverIO (v7)
  - Mocha
- Features
  - [Page Object](pageobjects) Model
  - Sauce Labs integration with [Sauce Service](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-sauce-service/README.md)
  - Allure Report
  - Automatic screenshots capture for failing tests
  - CircleCI example
  - ESLint

## [WarleyGabriel/demo-webdriverio-mocha](https://github.com/WarleyGabriel/demo-webdriverio-mocha)

Πρότυπο έργο για την εκτέλεση δοκιμών E2E με Mocha.

- Frameworks:
    - WebdriverIO (v7)
    - Mocha
- Features:
    -   TypeScript
    -   [Expect-webdriverio](https://github.com/webdriverio/expect-webdriverio)
    -   [Visual regression tests](https://github.com/wswebcreation/wdio-image-comparison-service)
    -   Page Object Pattern
    -   [Commit lint](https://github.com/conventional-changelog/commitlint) and [Commitizen](https://github.com/commitizen/cz-cli#making-your-repo-commitizen-friendly)
    -   ESlint
    -   Prettier
    -   Husky
    -   Github Actions example
    -   Allure report (screenshots on failure)

## [17thSep/WebdriverIO_Master](https://github.com/17thSep/WebdriverIO_Master)

Πρότυπο έργο για την εκτέλεση δοκιμών **WebdriverIO v7** για τα ακόλουθα:

[WDIO 7 scripts with TypeScript in Cucumber Framework](https://github.com/17thSep/WebdriverIO_Master/tree/master/TypeScript/Cucumber)
[WDIO 7 scripts with TypeScript in Mocha Framework](https://github.com/17thSep/WebdriverIO_Master/tree/master/TypeScript/Mocha)
[Run WDIO 7 script in Docker](https://github.com/17thSep/WebdriverIO_Master/tree/master/TypeScript/Docker)
[Network logs](https://github.com/17thSep/MonitorNetworkLogs/)

Πρότυπο έργο για:

- Capture Network Logs
- Capture all GET/POST calls or a specific REST API
- Assert Request parameters
- Assert Response parameters
- Store all the response in a separate file

## [Arjun-Ar91/Wdio7-appium-cucumber](https://github.com/Arjun-Ar91/Wdio7-appium-cucumber.git)

Πρότυπο έργο για την εκτέλεση δοκιμών appium για εγγενείς εφαρμογές και φυλλομετρητές κινητών χρησιμοποιώντας cucumber v7 και wdio v7 με το μοτίβο αντικειμένων σελίδας.

- Frameworks
    - WebdriverIO v7
    - Cucumber v7
    - Appium

- Features
    - Native Android and iOS apps
    - Android Chrome browser
    - iOS Safari browser
    - Page Object Model
    - Contains sample test scenarios in cucumber
    - Integrated with multiple cucumber html reports

## [praveendvd/webdriverIODockerBoilerplate/](https://github.com/praveendvd/webdriverIODockerBoilerplate)

Αυτό είναι ένα πρότυπο έργο που θα σας βοηθήσει να δείξει πώς μπορείτε να εκτελέσετε δοκιμές webdriverio από διαδικτυακές εφαρμογές χρησιμοποιώντας τα πιο πρόσφατα WebdriverIO και Cucumber framework. Αυτό το έργο προορίζεται να λειτουργήσει ως βασική εικόνα που μπορείτε να χρησιμοποιήσετε για να κατανοήσετε πώς να εκτελέσετε δοκιμές WebdriverIO στο docker

Αυτό το έργο περιλαμβάνει:

- DockerFile
- cucumber Project

Διαβάστε περισσότερα στο: [Medium Blog](https://praveendavidmathew.medium.com/running-webdriverio-in-wsl2-windows-91d3a0dc7746)

## [praveendvd/WebdriverIO_electronAppAutomation_boilerplate/](https://github.com/praveendvd/WebdriverIO_electronAppAutomation_boilerplate)

Αυτό είναι ένα πρότυπο έργο που θα σας βοηθήσει να δείξει πώς μπορείτε να εκτελέσετε δοκιμές electronJS χρησιμοποιώντας το WebdriverIO. Αυτό το έργο προορίζεται να λειτουργήσει ως βασική εικόνα που μπορείτε να χρησιμοποιήσετε για να κατανοήσετε πώς να εκτελέσετε δοκιμές WebdriverIO electronJS.

Αυτό το έργο περιλαμβάνει:

- Sample electronjs app
- Sample cucumber test scripts

Διαβάστε περισσότερα στο: [Medium Blog](https://praveendavidmathew.medium.com/first-step-into-automation-of-electronjs-applications-ef89b7423ddd)

## [praveendvd/webdriverIO_winappdriver_boilerplate/](https://github.com/praveendvd/webdriverIO_winappdriver_boilerplate)

Αυτό είναι ένα πρότυπο έργο που θα σας βοηθήσει να δείξει πώς μπορείτε να αυτοματοποιήσετε εφαρμογές των Windows χρησιμοποιώντας winappdriver και WebdriverIO. Αυτό το έργο προορίζεται να λειτουργήσει ως βασική εικόνα που μπορείτε να χρησιμοποιήσετε για να κατανοήσετε πώς να εκτελέσετε δοκιμές windappdriver και WebdriverIO.

Διαβάστε περισσότερα στο: [Medium Blog](https://praveendavidmathew.medium.com/winappdriver-first-step-into-windows-app-test-automation-using-webdriverio-and-winappdriver-46320d89570b)

## [praveendvd/appium-chromedriver-multiremote-wdio-boilerplate/](https://github.com/praveendvd/appium-chromedriver-multiremote-wdio-boilerplate)


Αυτό είναι ένα πρότυπο έργο που θα σας βοηθήσει να δείξει πώς μπορείτε να εκτελέσετε τη δυνατότητα multiremote του webdriverio με τα πιο πρόσφατα WebdriverIO και Jasmine framework. Αυτό το έργο προορίζεται να λειτουργήσει ως βασική εικόνα που μπορείτε να χρησιμοποιήσετε για να κατανοήσετε πώς να εκτελέσετε δοκιμές WebdriverIO στο docker

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
    - Page Object Model
    - Typescript
    - Screenshot on failure
    - Example tests using a sample Roku channel

## [krishnapollu/wdio-cucumber-poc](https://github.com/krishnapollu/wdio-cucumber-poc)

Έργο PoC για δοκιμές E2E Multiremote Cucumber καθώς και για δοκιμές Mocha με βάση τα δεδομένα

- Framework:
    - Cucumber (v8)
    - WebdriverIO (v8)
    - Mocha (v8)

- Features:
    - Cucumber based E2E Tests
    - Mocha based Data Driven Tests
    - Web only Tests - in Local as well as cloud platforms
    - Mobile Only tests - local as well as remote cloud emulators (or devices)
    - Web + Mobile Tests - Multiremote - local as well as cloud platforms
    - Multiple Reports integrated including Allure
    - Test Data ( JSON / XLSX ) handled globally so as to write the data (created on the fly) to a file post test execution
    - Github workflow to run the test and upload the allure report

## [Rondleysg/wdio-multiremote-appium-chromedriver-boilerplate](https://github.com/Rondleysg/wdio-multiremote-appium-chromedriver-boilerplate)

Αυτό είναι ένα πρότυπο έργο που θα σας βοηθήσει να δείξει πώς να εκτελέσετε webdriverio multi-remote χρησιμοποιώντας appium και υπηρεσία chromedriver με το πιο πρόσφατο WebdriverIO.

- Frameworks
  - WebdriverIO (v9)
  - Appium (v2)
  - Mocha

- Features
  - [Page Object](pageobjects) Model
  - Typescript
  - Web + Mobile Tests - Multiremote
  - Native Android and iOS apps
  - Appium
  - Chromedriver
  - ESLint
  - Tests examples for Login in http://the-internet.herokuapp.com and [WebdriverIO native demo app](https://github.com/webdriverio/native-demo-app)