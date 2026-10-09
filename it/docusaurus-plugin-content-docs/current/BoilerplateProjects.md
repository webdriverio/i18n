---
id: boilerplates
title: Progetti Boilerplate
description: "Esplora i progetti boilerplate della community per WebdriverIO con configurazioni Mocha, Jasmine, Cucumber, Electron e mobile per avviare la tua suite di test."
---

Nel corso del tempo, la nostra community ha sviluppato diversi progetti che puoi utilizzare come ispirazione per configurare la tua suite di test.

# Progetti Boilerplate v9

## [webdriverio/cucumber-boilerplate](https://github.com/webdriverio/cucumber-boilerplate)

Il nostro boilerplate per le suite di test Cucumber. Abbiamo creato oltre 150 definizioni di step predefinite per te, così puoi iniziare subito a scrivere file feature nel tuo progetto.

- Framework:
    - Cucumber
    - WebdriverIO
- Funzionalità:
    - Oltre 150 step predefiniti che coprono quasi tutto ciò di cui hai bisogno
    - Integra la funzionalità multi-remote di WebdriverIO
    - App demo propria

## [webdriverio/jasmine-boilerplate](https://github.com/webdriverio/jasmine-boilerplate)
Progetto boilerplate per eseguire test WebdriverIO con Jasmine utilizzando le funzionalità di Babel e il pattern page objects.

- Framework
    - WebdriverIO
    - Jasmine
- Funzionalità
    - Page Object Pattern
    - Integrazione con Sauce Labs

## [webdriverio/electron-boilerplate](https://github.com/webdriverio/electron-boilerplate)
Progetto boilerplate per eseguire test WebdriverIO su un'applicazione Electron minimale.

- Framework
    - WebdriverIO
    - Mocha
- Funzionalità
    - Mocking delle API di Electron

## [syamphaneendra/webdriverio9-boilerplate](https://github.com/syamphaneendra/webdriverio9-boilerplate)

Questo progetto boilerplate contiene test mobile WebdriverIO 9 con Cucumber, TypeScript e Appium per le piattaforme Android e iOS, seguendo il pattern Page Object Model. Include logging completo, reportistica, gesti mobile, navigazione da app a web e integrazione CI/CD.

- Framework:
    - WebdriverIO v9
    - Cucumber v9
    - Appium v2.5
    - TypeScript v5

- Funzionalità:
    - Supporto multipiattaforma
      - Android (UiAutomator2)
      - iOS (XCUITest)
    - Gesti mobile
      - Scroll
      - Swipe
      - Pressione prolungata
      - Nascondere la tastiera
    - Navigazione da app a web
      - Cambio di contesto
      - Supporto WebView
      - Automazione del browser (Chrome/Safari)
    - Stato dell'app pulito
      - Reset automatico dell'app tra gli scenari
      - Comportamento di reset configurabile (noReset, fullReset)
    - Configurazione dei dispositivi
      - Gestione centralizzata dei dispositivi
      - Facile cambio di piattaforma
    - Esempio di struttura delle directory per JavaScript / TypeScript. Quella sotto è per la versione JS, la versione TS ha la stessa struttura.

## [amiya-pattnaik/wdio-testgen-from-gherkin-js](https://github.com/amiya-pattnaik/wdio-testgen-from-gherkin-js)
## [amiya-pattnaik/wdio-testgen-from-gherkin-ts](https://github.com/amiya-pattnaik/wdio-testgen-from-gherkin-ts)
Genera automaticamente classi Page Object di WebdriverIO e spec di test Mocha a partire da file .feature Gherkin, riducendo il lavoro manuale, migliorando la coerenza e velocizzando l'automazione QA. Questo progetto non solo produce codice compatibile con webdriver.io, ma ne potenzia anche tutte le funzionalità. Abbiamo creato due varianti, una per gli utenti JavaScript e l'altra per gli utenti TypeScript. Entrambi i progetti funzionano allo stesso modo.

***Come funziona?***
- Il processo segue un'automazione in due fasi:
- Fase 1: da Gherkin a stepMap (Generazione dei file stepMap.json)
  - Generazione dei file stepMap.json:
    - Analizza i file .feature scritti in sintassi Gherkin.
    - Estrae scenari e step.
    - Produce un file .stepMap.json strutturato contenente:
      - action da eseguire (es. click, setText, assertVisible)
      - selectorName per la mappatura logica
      - selector per l'elemento DOM
      - note per valori o asserzioni
- Fase 2: da stepMap a codice (Generazione del codice WebdriverIO).
  Utilizza stepMap.json per generare:
  - Una classe base page.js con metodi condivisi e configurazione di browser.url().
  - Classi Page Object Model (POM) compatibili con WebdriverIO per ogni feature all'interno di test/pageobjects/.
  - Spec di test basate su Mocha.
- Esempio di struttura delle directory per JavaScript / TypeScript. Quella sotto è per la versione JS, la versione TS ha la stessa struttura.
```
project-root/
├── features/                   # File .feature Gherkin (input utente / file sorgente)
├── stepMaps/                   # File .stepMap.json generati automaticamente
├── test/
│   ├── pageobjects/            # Classi Page Object Model dei test WebdriverIO generate automaticamente
│   └── specs/                  # Spec di test Mocha generate automaticamente
├── src/
│   ├── cli.js                  # Logica principale della CLI
│   ├── generateStepsMap.js     # Generatore da feature a stepMap
│   ├── generateTestsFromMap.js # Generatore da stepMap a page/spec
│   ├── utils.js                # Metodi di supporto
│   └── config.js               # Percorsi, selettori di fallback, alias
│   └── __tests__/              # Test unitari (Vitest)
├── testgen.js                  # Punto di ingresso della CLI
│── wdio.config.js              # Configurazione di WebdriverIO
├── package.json                # Script e dipendenze
├── selector-aliases.json       # Override opzionali definiti dall'utente che sostituiscono il selettore primario
```
---
# Progetti Boilerplate v8

## [amiya-pattnaik/webdriverIO-with-cucumberBDD](https://github.com/amiya-pattnaik/webdriverIO-with-cucumberBDD)

- Framework: WDIO-V8 con Cucumber (V8x).
- Funzionalità:
    - Page Objects Model con approccio basato su classi in stile ES6 / ES7 e supporto TypeScript
    - Esempi dell'opzione multi selettore per interrogare un elemento con più selettori contemporaneamente
    - Esempi di esecuzione multi browser e con browser headless utilizzando Chrome e Firefox
    - Integrazione per il cloud testing con BrowserStack, Sauce Labs, TestMu AI (precedentemente LambdaTest)
    - Esempi di lettura/scrittura di dati da MS-Excel per una facile gestione dei dati di test da fonti esterne
    - Supporto database per qualsiasi RDBMS (Oracle, MySql, TeraData, Vertica ecc.), esecuzione di query / recupero di result set ecc. con esempi per test E2E
    - Reportistica multipla (Spec, Xunit/Junit, Allure, JSON) e hosting dei report Allure e Xunit/Junit su WebServer.
    - Esempi con le app demo https://search.yahoo.com/  e http://the-internet.herokuapp.com.
    - File `.config` specifici per BrowserStack, Sauce Labs, TestMu AI (precedentemente LambdaTest) e Appium (per l'esecuzione su dispositivi mobili). Per una configurazione di Appium con un clic sulla macchina locale per iOS e Android, consulta [appium-setup-made-easy-OSX](https://github.com/amiya-pattnaik/appium-setup-made-easy-OSX).

## [amiya-pattnaik/webdriverIO-with-mochaBDD](https://github.com/amiya-pattnaik/webdriverIO-with-mochaBDD)

- Framework: WDIO-V8 con Mocha (V10x).
- Funzionalità:
    -  Page Objects Model con approccio basato su classi in stile ES6 / ES7 e supporto TypeScript
    -  Esempi con le app demo https://search.yahoo.com  e http://the-internet.herokuapp.com
    -  Esempi di esecuzione multi browser e con browser headless utilizzando Chrome e Firefox
    -  Integrazione per il cloud testing con BrowserStack, Sauce Labs, TestMu AI (precedentemente LambdaTest)
    -  Reportistica multipla (Spec, Xunit/Junit, Allure, JSON) e hosting dei report Allure e Xunit/Junit su WebServer.
    -  Esempi di lettura/scrittura di dati da MS-Excel per una facile gestione dei dati di test da fonti esterne
    -  Esempi di connessione DB a qualsiasi RDBMS (Oracle, MySql, TeraData, Vertica ecc.), esecuzione di query / recupero di result set ecc. con esempi per test E2E
    -  File `.config` specifici per BrowserStack, Sauce Labs, TestMu AI (precedentemente LambdaTest) e Appium (per l'esecuzione su dispositivi mobili). Per una configurazione di Appium con un clic sulla macchina locale per iOS e Android, consulta [appium-setup-made-easy-OSX](https://github.com/amiya-pattnaik/appium-setup-made-easy-OSX).

## [amiya-pattnaik/webdriverIO-with-jasmineBDD](https://github.com/amiya-pattnaik/webdriverIO-with-jasmineBDD)

- Framework: WDIO-V8 con Jasmine (V4x).
- Funzionalità:
    -  Page Objects Model con approccio basato su classi in stile ES6 / ES7 e supporto TypeScript
    -  Esempi con le app demo https://search.yahoo.com  e http://the-internet.herokuapp.com
    -  Esempi di esecuzione multi browser e con browser headless utilizzando Chrome e Firefox
    -  Integrazione per il cloud testing con BrowserStack, Sauce Labs, TestMu AI (precedentemente LambdaTest)
    -  Reportistica multipla (Spec, Xunit/Junit, Allure, JSON) e hosting dei report Allure e Xunit/Junit su WebServer.
    -  Esempi di lettura/scrittura di dati da MS-Excel per una facile gestione dei dati di test da fonti esterne
    -  Esempi di connessione DB a qualsiasi RDBMS (Oracle, MySql, TeraData, Vertica ecc.), esecuzione di query / recupero di result set ecc. con esempi per test E2E
    -  File `.config` specifici per BrowserStack, Sauce Labs, TestMu AI (precedentemente LambdaTest) e Appium (per l'esecuzione su dispositivi mobili). Per una configurazione di Appium con un clic sulla macchina locale per iOS e Android, consulta [appium-setup-made-easy-OSX](https://github.com/amiya-pattnaik/appium-setup-made-easy-OSX).

## [syamphaneendra/webdriverio-web-mobile-boilerplate](https://github.com/syamphaneendra/webdriverio-web-mobile-boilerplate)

Questo progetto boilerplate contiene test WebdriverIO 8 con cucumber e typescript, seguendo il pattern page objects.

- Framework:
    - WebdriverIO v8
    - Cucumber v8

- Funzionalità:
    - Typescript v5
    - Page Object Pattern
    - Prettier
    - Supporto multi browser
      - Chrome
      - Firefox
      - Edge
      - Safari
      - Standalone
    - Esecuzione parallela cross-browser
    - Appium
    - Integrazione per il cloud testing con BrowserStack e Sauce Labs
    - Servizio Docker
    - Servizio di condivisione dati
    - File di configurazione separati per ogni servizio
    - Gestione dei dati di test e lettura per tipo di utente
    - Reportistica
      - Dot
      - Spec
      - Report html cucumber multipli con screenshot dei fallimenti
    - Pipeline Gitlab per repository Gitlab
    - Github actions per repository Github
    - Docker compose per la configurazione del docker hub
    - Test di accessibilità con AXE
    - Test visivi con Applitools
    - Meccanismo di log


## [klassijs/klassi-js (cucumber-template)](https://github.com/klassijs/klassi-example-test-suite.git)

- Framework
    - WebdriverIO (v8)
    - Cucumber (v8)

- Funzionalità
    - Contiene scenari di test di esempio in cucumber
    - Report html cucumber integrati con video incorporati in caso di fallimento
    - Servizi Lambdatest e CircleCI integrati
    - Test visivi, di accessibilità e API integrati
    - Funzionalità email integrata
    - Bucket s3 integrato per l'archiviazione e il recupero dei report di test

## [serenity-js/serenity-js-mocha-webdriverio-template/](https://github.com/serenity-js/serenity-js-mocha-webdriverio-template/)

Progetto template [Serenity/JS](https://serenity-js.org?pk_campaign=wdio8&pk_source=webdriver.io) per aiutarti a iniziare con i test di accettazione delle tue applicazioni web utilizzando le ultime versioni di WebdriverIO, Mocha e Serenity/JS.

- Framework
    - WebdriverIO (v8)
    - Mocha (v10)
    - Serenity/JS (v3)
    - Reportistica Serenity BDD

- Funzionalità
    - [Screenplay Pattern](https://serenity-js.org/handbook/design/screenplay-pattern/?pk_campaign=wdio8&pk_source=webdriver.io)
    - Screenshot automatici in caso di fallimento dei test, incorporati nei report
    - Configurazione di Continuous Integration (CI) tramite [GitHub Actions](https://github.com/serenity-js/serenity-js-mocha-webdriverio-template/blob/main/.github/workflows/main.yml)
    - [Report Serenity BDD demo](https://serenity-js.github.io/serenity-js-mocha-webdriverio-template/) pubblicati su GitHub Pages
    - TypeScript
    - ESLint

## [serenity-js/serenity-js-cucumber-webdriverio-template/](https://github.com/serenity-js/serenity-js-cucumber-webdriverio-template/)

Progetto template [Serenity/JS](https://serenity-js.org?pk_campaign=wdio8&pk_source=webdriver.io) per aiutarti a iniziare con i test di accettazione delle tue applicazioni web utilizzando le ultime versioni di WebdriverIO, Cucumber e Serenity/JS.

- Framework
    - WebdriverIO (v8)
    - Cucumber (v9)
    - Serenity/JS (v3)
    - Reportistica Serenity BDD

- Funzionalità
    - [Screenplay Pattern](https://serenity-js.org/handbook/design/screenplay-pattern/?pk_campaign=wdio8&pk_source=webdriver.io)
    - Screenshot automatici in caso di fallimento dei test, incorporati nei report
    - Configurazione di Continuous Integration (CI) tramite [GitHub Actions](https://github.com/serenity-js/serenity-js-cucumber-webdriverio-template/blob/main/.github/workflows/main.yml)
    - [Report Serenity BDD demo](https://serenity-js.github.io/serenity-js-mocha-webdriverio-template/) pubblicati su GitHub Pages
    - TypeScript
    - ESLint

## [Muralijc/wdio-headspin-boilerplate](https://github.com/Muralijc/Wdio-Headspin-boilerplate/)
Progetto boilerplate per eseguire test WebdriverIO nel Cloud Headspin (https://www.headspin.io/) utilizzando le funzionalità di Cucumber e il pattern page objects.
- Framework
    - WebdriverIO (v8)
    - Cucumber (v8)

- Funzionalità
    - Integrazione cloud con [Headspin](https://www.headspin.io/)
    - Supporta il Page Object Model
    - Contiene scenari di esempio scritti in stile BDD dichiarativo
    - Report html cucumber integrati

# Progetti Boilerplate v7
---

## [webdriverio/appium-boilerplate](https://github.com/webdriverio/appium-boilerplate/)

Progetto boilerplate per eseguire test Appium con WebdriverIO per:

- App native iOS/Android
- App ibride iOS/Android
- Browser Chrome su Android e Safari su iOS

Questo boilerplate include quanto segue:

- Framework: Mocha
- Funzionalità:
    - Configurazioni per:
        - App iOS e Android
        - Browser iOS e Android
    - Helper per:
        - WebView
        - Gesti
        - Avvisi nativi
        - Picker
     - Esempi di test per:
        - WebView
        - Login
        - Form
        - Swipe
        - Browser

## [serhatbolsu/webdriverio-mocha-uiautomation-boiler](https://github.com/serhatbolsu/webdriverio-mocha-uiautomation-boiler)
Test WEB ATDD con Mocha, WebdriverIO v6 con PageObject

- Framework
  - WebdriverIO (v7)
  - Mocha
- Funzionalità
  - Modello [Page Object](pageobjects)
  - Integrazione con Sauce Labs tramite [Sauce Service](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-sauce-service/README.md)
  - Report Allure
  - Cattura automatica di screenshot per i test falliti
  - Esempio CircleCI
  - ESLint

## [WarleyGabriel/demo-webdriverio-mocha](https://github.com/WarleyGabriel/demo-webdriverio-mocha)

Progetto boilerplate per eseguire test E2E con Mocha.

- Framework:
    - WebdriverIO (v7)
    - Mocha
- Funzionalità:
    -   TypeScript
    -   [Expect-webdriverio](https://github.com/webdriverio/expect-webdriverio)
    -   [Test di regressione visiva](https://github.com/wswebcreation/wdio-image-comparison-service)
    -   Page Object Pattern
    -   [Commit lint](https://github.com/conventional-changelog/commitlint) e [Commitizen](https://github.com/commitizen/cz-cli#making-your-repo-commitizen-friendly)
    -   ESlint
    -   Prettier
    -   Husky
    -   Esempio di Github Actions
    -   Report Allure (screenshot in caso di fallimento)

## [17thSep/WebdriverIO_Master](https://github.com/17thSep/WebdriverIO_Master)

Progetto boilerplate per eseguire test **WebdriverIO v7** per quanto segue:

[Script WDIO 7 con TypeScript nel framework Cucumber](https://github.com/17thSep/WebdriverIO_Master/tree/master/TypeScript/Cucumber)
[Script WDIO 7 con TypeScript nel framework Mocha](https://github.com/17thSep/WebdriverIO_Master/tree/master/TypeScript/Mocha)
[Eseguire script WDIO 7 in Docker](https://github.com/17thSep/WebdriverIO_Master/tree/master/TypeScript/Docker)
[Log di rete](https://github.com/17thSep/MonitorNetworkLogs/)

Progetto boilerplate per:

- Catturare i log di rete
- Catturare tutte le chiamate GET/POST o una specifica REST API
- Verificare i parametri della richiesta
- Verificare i parametri della risposta
- Salvare tutte le risposte in un file separato

## [Arjun-Ar91/Wdio7-appium-cucumber](https://github.com/Arjun-Ar91/Wdio7-appium-cucumber.git)

Progetto boilerplate per eseguire test appium per browser nativi e mobili utilizzando cucumber v7 e wdio v7 con il pattern page object.

- Framework
    - WebdriverIO v7
    - Cucumber v7
    - Appium

- Funzionalità
    - App native Android e iOS
    - Browser Chrome su Android
    - Browser Safari su iOS
    - Page Object Model
    - Contiene scenari di test di esempio in cucumber
    - Integrato con report html cucumber multipli

## [praveendvd/webdriverIODockerBoilerplate/](https://github.com/praveendvd/webdriverIODockerBoilerplate)

Questo è un progetto template per mostrarti come eseguire test webdriverio su applicazioni Web utilizzando le ultime versioni di WebdriverIO e del framework Cucumber. Questo progetto intende fungere da immagine di base che puoi utilizzare per capire come eseguire test WebdriverIO in docker

Questo progetto include:

- DockerFile
- Progetto cucumber

Leggi di più su: [Medium Blog](https://praveendavidmathew.medium.com/running-webdriverio-in-wsl2-windows-91d3a0dc7746)

## [praveendvd/WebdriverIO_electronAppAutomation_boilerplate/](https://github.com/praveendvd/WebdriverIO_electronAppAutomation_boilerplate)

Questo è un progetto template per mostrarti come eseguire test electronJS utilizzando WebdriverIO. Questo progetto intende fungere da immagine di base che puoi utilizzare per capire come eseguire test electronJS con WebdriverIO.

Questo progetto include:

- App electronjs di esempio
- Script di test cucumber di esempio

Leggi di più su: [Medium Blog](https://praveendavidmathew.medium.com/first-step-into-automation-of-electronjs-applications-ef89b7423ddd)

## [praveendvd/webdriverIO_winappdriver_boilerplate/](https://github.com/praveendvd/webdriverIO_winappdriver_boilerplate)

Questo è un progetto template per mostrarti come automatizzare applicazioni windows utilizzando winappdriver e WebdriverIO. Questo progetto intende fungere da immagine di base che puoi utilizzare per capire come eseguire test con winappdriver e WebdriverIO.

Leggi di più su: [Medium Blog](https://praveendavidmathew.medium.com/winappdriver-first-step-into-windows-app-test-automation-using-webdriverio-and-winappdriver-46320d89570b)

## [praveendvd/appium-chromedriver-multiremote-wdio-boilerplate/](https://github.com/praveendvd/appium-chromedriver-multiremote-wdio-boilerplate)


Questo è un progetto template per mostrarti come utilizzare la funzionalità multi-remote di webdriverio con le ultime versioni di WebdriverIO e del framework Jasmine. Questo progetto intende fungere da immagine di base che puoi utilizzare per capire come eseguire test WebdriverIO in docker

Questo progetto utilizza:
     - chromedriver
     - jasmine
     - appium

## [webdriverio-roku-appium-boilerplate](https://github.com/AntonKostenko/webdriverIO-roku-appium)

Progetto template per eseguire test appium su dispositivi Roku reali utilizzando mocha con il pattern page object.

- Framework
    - WebdriverIO Async v7
    - Appium 3.0
    - Mocha v7
    - Reportistica Allure

- Funzionalità
    - Page Object Model
    - Typescript
    - Screenshot in caso di fallimento
    - Test di esempio che utilizzano un canale Roku di esempio

## [krishnapollu/wdio-cucumber-poc](https://github.com/krishnapollu/wdio-cucumber-poc)

Progetto PoC per test Cucumber E2E multi-remote e test Mocha data driven

- Framework:
    - Cucumber (v8)
    - WebdriverIO (v8)
    - Mocha (v8)

- Funzionalità:
    - Test E2E basati su Cucumber
    - Test data driven basati su Mocha
    - Test solo web - in locale e su piattaforme cloud
    - Test solo mobile - emulatori (o dispositivi) locali e cloud remoti
    - Test Web + Mobile - multi-remote - in locale e su piattaforme cloud
    - Report multipli integrati, incluso Allure
    - Dati di test (JSON / XLSX) gestiti globalmente in modo da scrivere i dati (creati al volo) su un file dopo l'esecuzione dei test
    - Workflow Github per eseguire i test e caricare il report allure

## [Rondleysg/wdio-multiremote-appium-chromedriver-boilerplate](https://github.com/Rondleysg/wdio-multiremote-appium-chromedriver-boilerplate)

Questo è un progetto boilerplate per mostrare come eseguire webdriverio multi-remote utilizzando appium e il servizio chromedriver con l'ultima versione di WebdriverIO.

- Framework
  - WebdriverIO (v9)
  - Appium (v2)
  - Mocha

- Funzionalità
  - Modello [Page Object](pageobjects)
  - Typescript
  - Test Web + Mobile - multi-remote
  - App native Android e iOS
  - Appium
  - Chromedriver
  - ESLint
  - Esempi di test per il Login su http://the-internet.herokuapp.com e sulla [app demo nativa di WebdriverIO](https://github.com/webdriverio/native-demo-app)