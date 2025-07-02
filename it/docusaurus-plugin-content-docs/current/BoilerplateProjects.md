---
id: boilerplates
title: Progetti Boilerplate
---

Nel corso del tempo, la nostra comunità ha sviluppato diversi progetti che puoi utilizzare come ispirazione per configurare la tua suite di test.

# Progetti Boilerplate v9

## [webdriverio/cucumber-boilerplate](https://github.com/webdriverio/cucumber-boilerplate)

Il nostro boilerplate per suite di test Cucumber. Abbiamo creato oltre 150 definizioni di step predefiniti per te, così puoi iniziare a scrivere file di feature nel tuo progetto immediatamente.

- Framework:
    - Cucumber
    - WebdriverIO
- Caratteristiche:
    - Oltre 150 step predefiniti che coprono quasi tutto ciò di cui hai bisogno
    - Integra la funzionalità Multiremote di WebdriverIO
    - App demo propria

## [webdriverio/jasmine-boilerplate](https://github.com/webdriverio/jasmine-boilerplate)
Progetto boilerplate per eseguire test WebdriverIO con Jasmine utilizzando le funzionalità Babel e il pattern page objects.

- Framework
    - WebdriverIO
    - Jasmine
- Caratteristiche
    - Pattern Page Object
    - Integrazione con Sauce Labs

## [webdriverio/electron-boilerplate](https://github.com/webdriverio/electron-boilerplate)
Progetto boilerplate per eseguire test WebdriverIO su un'applicazione Electron minimale.

- Framework
    - WebdriverIO
    - Mocha
- Caratteristiche
    - Electron API mocking

## [amiya-pattnaik/wdio-testgen-from-gherkin-js](https://github.com/amiya-pattnaik/wdio-testgen-from-gherkin-js)
## [amiya-pattnaik/wdio-testgen-from-gherkin-ts](https://github.com/amiya-pattnaik/wdio-testgen-from-gherkin-ts)
Genera automaticamente classi Page Object di WebdriverIO e specifiche di test Mocha dai file .feature Gherkin — riducendo lo sforzo manuale, migliorando la coerenza e accelerando l'automazione QA. Questo progetto non solo produce codice compatibile con webdriver.io ma migliora anche tutte le funzionalità di webdriver.io. Abbiamo creato due versioni, una per gli utenti JavaScript e l'altra per gli utenti TypeScript. Ma entrambi i progetti funzionano allo stesso modo.

***Come funziona?***
- Il processo segue un'automazione in due fasi:
- Passo 1: Da Gherkin a stepMap (Genera file stepMap.json)
  - Genera file stepMap.json:
    - Analizza i file .feature scritti in sintassi Gherkin.
    - Estrae scenari e step.
    - Produce un file .stepMap.json strutturato contenente:
      - azione da eseguire (es. click, setText, assertVisible)
      - selectorName per mappatura logica
      - selector per l'elemento DOM
      - note per valori o asserzioni
- Passo 2: Da stepMap a Codice (Genera Codice WebdriverIO).
  Utilizza stepMap.json per generare:
  - Genera una classe base page.js con metodi condivisi e configurazione browser.url().
  - Genera classi Page Object Model (POM) compatibili con WebdriverIO per feature all'interno di test/pageobjects/.
  - Genera specifiche di test basate su Mocha.
- Esempio di Struttura di Directory per JavaScript / TypeScript. Di seguito è per la versione JS, la versione TS ha la stessa struttura.
```
project-root/
├── features/                   # File .feature Gherkin (input utente / file sorgente)
├── stepMaps/                   # File .stepMap.json auto-generati
├── test/                 
│   ├── pageobjects/            # Classi Page Object Model auto-generate per test WebdriverIO
│   └── specs/                  # Specifiche di test Mocha auto-generate
├── src/
│   ├── cli.js                  # Logica CLI principale
│   ├── generateStepsMap.js     # Generatore feature-to-stepMap
│   ├── generateTestsFromMap.js # Generatore stepMap-to-page/spec
│   ├── utils.js                # Metodi helper
│   └── config.js               # Percorsi, selettori di fallback, alias
│   └── __tests__/              # Test unitari (Vitest)
├── testgen.js                  # Punto di ingresso CLI
│── wdio.config.js              # Configurazione WebdriverIO
├── package.json                # Script e dipendenze
├── selector-aliases.json       # Override dei selettori primari definiti dall'utente opzionale
```
---
# Progetti Boilerplate v8

## [amiya-pattnaik/webdriverIO-with-cucumberBDD](https://github.com/amiya-pattnaik/webdriverIO-with-cucumberBDD)

- Framework: WDIO-V8 con Cucumber (V8x).
- Caratteristiche:
    - Page Objects Model utilizza l'approccio basato su classi in stile ES6/ES7 e supporto TypeScript
    - Esempi di opzione multi-selettore per interrogare elementi con più di un selettore alla volta
    - Esempi di esecuzione multi-browser e browser headless utilizzando Chrome e Firefox
    - Integrazione con test cloud BrowserStack, Sauce Labs, LambdaTest
    - Esempi di lettura/scrittura dati da MS-Excel per una facile gestione dei dati di test da fonti esterne con esempi
    - Supporto database per qualsiasi RDBMS (Oracle, MySql, TeraData, Vertica ecc.), esecuzione di qualsiasi query / recupero dei risultati ecc. con esempi per test E2E
    - Reportistica multipla (Spec, Xunit/Junit, Allure, JSON) e hosting dei report Allure e Xunit/Junit su WebServer.
    - Esempi con app demo https://search.yahoo.com/ e http://the-internet.herokuapp.com.
    - File `.config` specifici per BrowserStack, Sauce Labs, LambdaTest e Appium (per la riproduzione su dispositivi mobili). Per una configurazione Appium con un clic su macchina locale per iOS e Android, fare riferimento a [appium-setup-made-easy-OSX](https://github.com/amiya-pattnaik/appium-setup-made-easy-OSX).

## [amiya-pattnaik/webdriverIO-with-mochaBDD](https://github.com/amiya-pattnaik/webdriverIO-with-mochaBDD)

- Framework: WDIO-V8 con Mocha (V10x).
- Caratteristiche:
    -  Page Objects Model utilizza l'approccio basato su classi in stile ES6/ES7 e supporto TypeScript
    -  Esempi con app demo https://search.yahoo.com e http://the-internet.herokuapp.com
    -  Esempi di esecuzione multi-browser e browser headless utilizzando Chrome e Firefox
    -  Integrazione con test cloud BrowserStack, Sauce Labs, LambdaTest
    -  Reportistica multipla (Spec, Xunit/Junit, Allure, JSON) e hosting dei report Allure e Xunit/Junit su WebServer.
    -  Esempi di lettura/scrittura dati da MS-Excel per una facile gestione dei dati di test da fonti esterne con esempi
    -  Esempi di connessione DB a qualsiasi RDBMS (Oracle, MySql, TeraData, Vertica ecc.), qualsiasi esecuzione di query / recupero set di risultati ecc. con esempi per test E2E
    -  File `.config` specifici per BrowserStack, Sauce Labs, LambdaTest e Appium (per la riproduzione su dispositivi mobili). Per una configurazione Appium con un clic su macchina locale per iOS e Android, fare riferimento a [appium-setup-made-easy-OSX](https://github.com/amiya-pattnaik/appium-setup-made-easy-OSX).

## [amiya-pattnaik/webdriverIO-with-jasmineBDD](https://github.com/amiya-pattnaik/webdriverIO-with-jasmineBDD)

- Framework: WDIO-V8 con Jasmine (V4x).
- Caratteristiche:
    -  Page Objects Model utilizza l'approccio basato su classi in stile ES6/ES7 e supporto TypeScript
    -  Esempi con app demo https://search.yahoo.com e http://the-internet.herokuapp.com
    -  Esempi di esecuzione multi-browser e browser headless utilizzando Chrome e Firefox
    -  Integrazione con test cloud BrowserStack, Sauce Labs, LambdaTest
    -  Reportistica multipla (Spec, Xunit/Junit, Allure, JSON) e hosting dei report Allure e Xunit/Junit su WebServer.
    -  Esempi di lettura/scrittura dati da MS-Excel per una facile gestione dei dati di test da fonti esterne con esempi
    -  Esempi di connessione DB a qualsiasi RDBMS (Oracle, MySql, TeraData, Vertica ecc.), qualsiasi esecuzione di query / recupero set di risultati ecc. con esempi per test E2E
    -  File `.config` specifici per BrowserStack, Sauce Labs, LambdaTest e Appium (per la riproduzione su dispositivi mobili). Per una configurazione Appium con un clic su macchina locale per iOS e Android, fare riferimento a [appium-setup-made-easy-OSX](https://github.com/amiya-pattnaik/appium-setup-made-easy-OSX).

## [syamphaneendra/webdriverio-web-mobile-boilerplate](https://github.com/syamphaneendra/webdriverio-web-mobile-boilerplate)

Questo progetto boilerplate contiene test WebdriverIO 8 con cucumber e typescript, seguendo il pattern page objects.

- Framework:
    - WebdriverIO v8
    - Cucumber v8

- Caratteristiche:
    - Typescript v5
    - Pattern Page Object
    - Prettier
    - Supporto multi-browser
      - Chrome
      - Firefox
      - Edge
      - Safari
      - Standalone
    - Esecuzione parallela cross-browser
    - Appium
    - Integrazione con test cloud BrowserStack & Sauce Labs
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
    - Docker compose per configurare l'hub docker
    - Test di accessibilità utilizzando AXE
    - Test visivi utilizzando Applitools
    - Meccanismo di log


## [klassijs/klassi-js (cucumber-template)](https://github.com/klassijs/klassi-example-test-suite.git)

- Framework
    - WebdriverIO (v8)
    - Cucumber (v8)

- Caratteristiche
    - Contiene scenari di test di esempio in cucumber
    - Report html cucumber integrati con video incorporati sui fallimenti
    - Servizi Lambdatest e CircleCI integrati
    - Test Visual, di Accessibilità e API integrati
    - Funzionalità Email integrate
    - Bucket s3 integrato per lo storage e il recupero dei report di test

## [serenity-js/serenity-js-mocha-webdriverio-template/](https://github.com/serenity-js/serenity-js-mocha-webdriverio-template/)

Progetto template [Serenity/JS](https://serenity-js.org?pk_campaign=wdio8&pk_source=webdriver.io) per aiutarti a iniziare con i test di accettazione delle tue applicazioni web utilizzando gli ultimi WebdriverIO, Mocha e Serenity/JS.

- Framework
    - WebdriverIO (v8)
    - Mocha (v10)
    - Serenity/JS (v3)
    - Report Serenity BDD

- Caratteristiche
    - [Screenplay Pattern](https://serenity-js.org/handbook/design/screenplay-pattern/?pk_campaign=wdio8&pk_source=webdriver.io)
    - Screenshot automatici in caso di fallimento del test, incorporati nei report
    - Configurazione Continuous Integration (CI) utilizzando [GitHub Actions](https://github.com/serenity-js/serenity-js-mocha-webdriverio-template/blob/main/.github/workflows/main.yml)
    - [Report Serenity BDD demo](https://serenity-js.github.io/serenity-js-mocha-webdriverio-template/) pubblicati su GitHub Pages
    - TypeScript
    - ESLint

## [serenity-js/serenity-js-cucumber-webdriverio-template/](https://github.com/serenity-js/serenity-js-cucumber-webdriverio-template/)

Progetto template [Serenity/JS](https://serenity-js.org?pk_campaign=wdio8&pk_source=webdriver.io) per aiutarti a iniziare con i test di accettazione delle tue applicazioni web utilizzando gli ultimi WebdriverIO, Cucumber e Serenity/JS.

- Framework
    - WebdriverIO (v8)
    - Cucumber (v9)
    - Serenity/JS (v3)
    - Report Serenity BDD

- Caratteristiche
    - [Screenplay Pattern](https://serenity-js.org/handbook/design/screenplay-pattern/?pk_campaign=wdio8&pk_source=webdriver.io)
    - Screenshot automatici in caso di fallimento del test, incorporati nei report
    - Configurazione Continuous Integration (CI) utilizzando [GitHub Actions](https://github.com/serenity-js/serenity-js-cucumber-webdriverio-template/blob/main/.github/workflows/main.yml)
    - [Report Serenity BDD demo](https://serenity-js.github.io/serenity-js-mocha-webdriverio-template/) pubblicati su GitHub Pages
    - TypeScript
    - ESLint

## [Muralijc/wdio-headspin-boilerplate](https://github.com/Muralijc/Wdio-Headspin-boilerplate/)
Progetto boilerplate per eseguire test WebdriverIO nel Cloud Headspin (https://www.headspin.io/) utilizzando le funzionalità Cucumber e il pattern page objects.
- Framework
    - WebdriverIO (v8)
    - Cucumber (v8)

- Caratteristiche
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
- Browser Android Chrome e iOS Safari

Questo boilerplate include:

- Framework: Mocha
- Caratteristiche:
    - Configurazioni per:
        - App iOS e Android
        - Browser iOS e Android
    - Helper per:
        - WebView
        - Gestures
        - Alert nativi
        - Pickers
     - Esempi di test per:
        - WebView
        - Login
        - Moduli
        - Swipe
        - Browser

## [serhatbolsu/webdriverio-mocha-uiautomation-boiler](https://github.com/serhatbolsu/webdriverio-mocha-uiautomation-boiler)
Test WEB ATDD con Mocha, WebdriverIO v6 con PageObject

- Framework
  - WebdriverIO (v7)
  - Mocha
- Caratteristiche
  - Modello [Page Object](pageobjects)
  - Integrazione Sauce Labs con [Sauce Service](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-sauce-service/README.md)
  - Report Allure
  - Cattura automatica di screenshot per i test falliti
  - Esempio CircleCI
  - ESLint

## [WarleyGabriel/demo-webdriverio-mocha](https://github.com/WarleyGabriel/demo-webdriverio-mocha)

Progetto boilerplate per eseguire test E2E con Mocha.

- Framework:
    - WebdriverIO (v7)
    - Mocha
- Caratteristiche:
    -   TypeScript
    -   [Expect-webdriverio](https://github.com/webdriverio/expect-webdriverio)
    -   [Test di regressione visiva](https://github.com/wswebcreation/wdio-image-comparison-service)
    -   Pattern Page Object
    -   [Commit lint](https://github.com/conventional-changelog/commitlint) e [Commitizen](https://github.com/commitizen/cz-cli#making-your-repo-commitizen-friendly)
    -   ESlint
    -   Prettier
    -   Husky
    -   Esempio di Github Actions
    -   Report Allure (screenshot in caso di fallimento)

## [17thSep/WebdriverIO_Master](https://github.com/17thSep/WebdriverIO_Master)

Progetto boilerplate per eseguire test **WebdriverIO v7** per:

[Script WDIO 7 con TypeScript in Cucumber Framework](https://github.com/17thSep/WebdriverIO_Master/tree/master/TypeScript/Cucumber)
[Script WDIO 7 con TypeScript in Mocha Framework](https://github.com/17thSep/WebdriverIO_Master/tree/master/TypeScript/Mocha)
[Esegui script WDIO 7 in Docker](https://github.com/17thSep/WebdriverIO_Master/tree/master/TypeScript/Docker)
[Log di rete](https://github.com/17thSep/MonitorNetworkLogs/)

Progetto boilerplate per:

- Catturare log di rete
- Catturare tutte le chiamate GET/POST o una specifica API REST
- Asserire parametri di richiesta
- Asserire parametri di risposta
- Memorizzare tutte le risposte in un file separato

## [Arjun-Ar91/Wdio7-appium-cucumber](https://github.com/Arjun-Ar91/Wdio7-appium-cucumber.git)

Progetto boilerplate per eseguire test appium per app native e browser mobile utilizzando cucumber v7 e wdio v7 con pattern page object.

- Framework
    - WebdriverIO v7
    - Cucumber v7
    - Appium

- Caratteristiche
    - App native Android e iOS
    - Browser Android Chrome
    - Browser iOS Safari
    - Page Object Model
    - Contiene scenari di test di esempio in cucumber
    - Integrato con report html cucumber multipli

## [praveendvd/webdriverIODockerBoilerplate/](https://github.com/praveendvd/webdriverIODockerBoilerplate)

Questo è un progetto template per aiutarti a mostrare come puoi eseguire test webdriverio da applicazioni Web utilizzando gli ultimi WebdriverIO e il framework Cucumber. Questo progetto intende fungere da immagine di base che puoi utilizzare per capire come eseguire test WebdriverIO in docker

Questo progetto include:

- DockerFile
- Progetto cucumber

Leggi di più su: [Medium Blog](https://praveendavidmathew.medium.com/running-webdriverio-in-wsl2-windows-91d3a0dc7746)

## [praveendvd/WebdriverIO_electronAppAutomation_boilerplate/](https://github.com/praveendvd/WebdriverIO_electronAppAutomation_boilerplate)

Questo è un progetto template per aiutarti a mostrare come puoi eseguire test electronJS utilizzando WebdriverIO. Questo progetto intende fungere da immagine di base che puoi utilizzare per capire come eseguire test electronJS WebdriverIO.

Questo progetto include:

- App electronjs di esempio
- Script di test cucumber di esempio

Leggi di più su: [Medium Blog](https://praveendavidmathew.medium.com/first-step-into-automation-of-electronjs-applications-ef89b7423ddd)

## [praveendvd/webdriverIO_winappdriver_boilerplate/](https://github.com/praveendvd/webdriverIO_winappdriver_boilerplate)

Questo è un progetto template per aiutarti a mostrare come puoi automatizzare un'applicazione Windows utilizzando winappdriver e WebdriverIO. Questo progetto intende fungere da immagine di base che puoi utilizzare per capire come eseguire test winappdriver e WebdriverIO.

Leggi di più su: [Medium Blog](https://praveendavidmathew.medium.com/winappdriver-first-step-into-windows-app-test-automation-using-webdriverio-and-winappdriver-46320d89570b)

## [praveendvd/appium-chromedriver-multiremote-wdio-boilerplate/](https://github.com/praveendvd/appium-chromedriver-multiremote-wdio-boilerplate)


Questo è un progetto template per aiutarti a mostrare come puoi eseguire la capacità multiremote di webdriverio con gli ultimi WebdriverIO e il framework Jasmine. Questo progetto intende fungere da immagine di base che puoi utilizzare per capire come eseguire test WebdriverIO in docker

Questo progetto utilizza:
     - chromedriver
     - jasmine
     - appium

## [webdriverio-roku-appium-boilerplate](https://github.com/AntonKostenko/webdriverIO-roku-appium)

Progetto template per eseguire test appium su dispositivi Roku reali utilizzando mocha con pattern page object.

- Framework
    - WebdriverIO Async v7
    - Appium 2.0
    - Mocha v7
    - Report Allure

- Caratteristiche
    - Page Object Model
    - Typescript
    - Screenshot in caso di fallimento
    - Test di esempio utilizzando un canale Roku di esempio

## [krishnapollu/wdio-cucumber-poc](https://github.com/krishnapollu/wdio-cucumber-poc)

Progetto PoC per test Cucumber Multiremote E2E e test Mocha basati su dati

- Framework:
    - Cucumber (v8)
    - WebdriverIO (v8)
    - Mocha (v8)

- Caratteristiche:
    - Test E2E basati su Cucumber
    - Test basati su dati Mocha
    - Test solo Web - in locale e piattaforme cloud
    - Test solo Mobile - emulatori locali e remoti cloud (o dispositivi)
    - Test Web + Mobile - Multiremote - locale e piattaforme cloud
    - Report multipli integrati incluso Allure
    - Dati di test (JSON / XLSX) gestiti globalmente in modo da scrivere i dati (creati al volo) in un file dopo l'esecuzione del test
    - Flusso di lavoro Github per eseguire il test e caricare il report allure

## [Rondleysg/wdio-multiremote-appium-chromedriver-boilerplate](https://github.com/Rondleysg/wdio-multiremote-appium-chromedriver-boilerplate)

Questo è un progetto boilerplate per aiutare a mostrare come eseguire webdriverio multi-remote utilizzando il servizio appium e chromedriver con il più recente WebdriverIO.

- Framework
  - WebdriverIO (v9)
  - Appium (v2)
  - Mocha

- Caratteristiche
  - Modello [Page Object](pageobjects)
  - Typescript
  - Test Web + Mobile - Multiremote
  - App native Android e iOS
  - Appium
  - Chromedriver
  - ESLint
  - Esempi di test per il login in http://the-internet.herokuapp.com e [app demo nativa WebdriverIO](https://github.com/webdriverio/native-demo-app)
