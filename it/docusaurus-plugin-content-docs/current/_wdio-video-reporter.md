---
id: wdio-video-reporter
title: Reporter Video
custom_edit_url: https://github.com/presidenten/wdio-video-reporter/edit/main/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-video-reporter è un pacchetto di terze parti, per maggiori informazioni consulta [GitHub](https://github.com/presidenten/wdio-video-reporter) | [npm](https://www.npmjs.com/package/wdio-video-reporter)

![Logo](https://raw.githubusercontent.com/presidenten/wdio-video-reporter-example-report/master/wdio-video-reporter.png)

Questo è un reporter per [Webdriver IO v6 e superiori](https://webdriver.io/) che genera video delle esecuzioni dei test wdio. Se usi allure, i casi di test vengono automaticamente decorati con i video. (Per Webdriver IO v5, usa wdio-video-reporter versione ^2.0.0.)

I video finiscono in `wdio.config.outputDir`

Guarda un esempio di report Allure con video inclusi sui test falliti qui:
https://presidenten.github.io/wdio-video-reporter-example-report/

![example-allure-report](https://media.giphy.com/media/7Fgle7bHGrxR3zY6Gw/giphy.gif)

Pro:
- Bei video nei tuoi report allure
- Video a velocità normale, anche se i test sono veloci
- Funziona con Selenium grid
- Funziona con tutti i webdriver che supportano `saveScreenshot`
- Verificato sui seguenti browser Desktop usando Selenium 3.141.59:
  - Chrome
  - Firefox
  - Safari
  - Internet Explorer 11
  - Microsoft Edge
- Verificato sui seguenti dispositivi iOS e Android con [Appium](http://appium.io/docs/en/about-appium/getting-started/) 1.13.0-beta3:
  - Iphone 8
  - Ipad Gen 6
  - Samsung galaxy S9
  - Samsung galaxy tab A10

Contro:
- Funziona acquisendo screenshot dopo le "azioni", il che rende i test un po' più lenti. Questo è mitigato scegliendo attentamente quali messaggi [jsonWireProtocol](https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol) dovrebbero generare uno screenshot
- I driver Selenium non includono alert-box e popup negli screenshot, quindi non sono visibili nei video


Avvio rapido
===========

Controlla il template semplice su [wdio-template](https://github.com/presidenten/wdio-template) per iniziare rapidamente.

Clona uno dei repository e installa le dipendenze con `yarn` o `npm install`. Quindi esegui `yarn e2e` o `npm run e2e` nella directory demo e infine `yarn report` o `npm run report` per vedere il report allure.


Installazione
============

Installa il reporter
--------------------

`yarn add wdio-video-reporter`
o
`npm install wdio-video-reporter`


Aggiungi il reporter alla configurazione
--------------------------

All'inizio del file `wdio.conf.js`, richiedi la libreria:
```
const video = require('wdio-video-reporter');
```

Quindi aggiungi il video reporter alla configurazione nella proprietà reporters:

```
 reporters: [
    [video, {
      saveAllVideos: false,       // Se true, salva anche i video per i casi di test riusciti
      videoSlowdownMultiplier: 3, // Più alto per ottenere video più lenti, più basso per video più veloci [Valore 1-100]
    }],
  ],
```


Utilizzo con Allure
-----------------

L'aggiunta del reporter Allure aggiorna automaticamente i report con i video senza bisogno di configurare nulla :-)

```
 reporters: [
    [video, {
      saveAllVideos: false,       // Se true, salva anche i video per i casi di test riusciti
      videoSlowdownMultiplier: 3, // Più alto per ottenere video più lenti, più basso per video più veloci [Valore 1-100]
    }],
    ['allure', {
      outputDir: './_results_/allure-raw',
      disableWebdriverStepsReporting: true,
      disableWebdriverScreenshotsReporting: true,
    }],
  ],
```


Configurazione
=============

Parametri di configurazione normali
-------------------------------

La maggior parte degli utenti potrebbe voler impostare questi

- `saveAllVideos` Imposta a true per salvare i video dei test passati. `Default: false`
- `videoSlowdownMultiplier` Intero tra [1-100]. Aumentalo se i video sono riprodotti troppo velocemente. `Default: 3`
- `videoRenderTimeout` Secondi massimi di attesa per il rendering di un video. `Default: 5`
- `outputDir` Se non è impostato, usa wdio.config.outputDir. `Default: undefined`
- `maxTestNameCharacters` Lunghezza massima del nome del test. `Default: 250`

Parametri di configurazione avanzati
---------------------------------

Gli utenti avanzati che vogliono modificare quando il motore effettua uno screenshot possono modificare questi. Questi array possono essere popolati con l'ultima parola di un messaggio [jsonWireProtocol](https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol), ad es. /session/:sessionId/`buttondown`.

- `addExcludedActions` Aggiungi azioni dove gli screenshot sono inutili. `Default: []`
- `addJsonWireActions` Aggiungi azioni dove mancano gli screenshot. `Default: []`
- `recordAllActions` Salta il filtraggio e scatta screenshot di tutto. (Non raccomandato) `Default: false`

Per vedere i messaggi elaborati, imposta `wdio.config.logLevel: 'debug'` e controlla `outputDir/wdio-X-Y-Video-reporter.log`. Questo lascerà intatta anche la directory di output degli screenshot per la revisione.

Per evitare completamente log aggiuntivi e ottenere solo i file video, imposta `wdio.config.logLevel: 'silent'`.

Supporto Cucumber
----------------

Se stai utilizzando il reporter Allure, devi assicurarti di fare quanto segue:

- Utilizza `chai` invece di utilizzare le asserzioni integrate di node, altrimenti i test falliti vengono segnalati come interrotti nelle definizioni dei passaggi
- Aggiungi `useCucumberStepReporter: true` all'opzione Allure nel file `wdio.conf.js`, una configurazione tipica sarebbe:
```
  reporters: [
    [video, {
      saveAllVideos: false,       // Se true, salva anche i video per i casi di test riusciti
      videoSlowdownMultiplier: 3, // Più alto per ottenere video più lenti, più basso per video più veloci [Valore 1-100]
    }],
    ['allure', {
      outputDir: './_results_/allure-raw',
      disableWebdriverStepsReporting: true,
      disableWebdriverScreenshotsReporting: true,
      useCucumberStepReporter: true
    }],
  ],
```
Per un esempio completo, controlla il branch cucumber su [wdio-template](https://github.com/presidenten/wdio-template/tree/cucumber)


Setup Appium
------------

A partire dalla versione `wdio-video-reporter` v1.2.4 è disponibile un supporto per aiutare Allure a differenziare tra browser safari e chrome su desktop e dispositivi.
Il reporter utilizza la proprietà personalizzata `deviceType` per identificare i diversi dispositivi.
I valori consigliati sono `phone` e `tablet`.
Si consiglia di includere anche `browserVersion` per _tutti_ i browser per evitare un bug nel webdriver Chrome quando si utilizzano dispositivi nella stessa griglia Selenium dei browser Chrome desktop.

I file video generati avranno anche `deviceType` aggiunto al nome del browser.

Esempio di configurazione appium:
```
  "capabilities": [
    {
      ...
      "deviceType": "phone",
      "browserVersion": "73.0-phone-1",
      ...
    }
  ],
```

E `wdio-config.json`:
```
  "capabilities": [
    {
      ...
      "appium:deviceType": "phone",
      "browserVersion": "73.0-phone-1",
      ...
    },
  ],
```


Contribuire
============

Fai un fork, apporta modifiche, scrivi alcuni test, lintizza, esegui i test, build e verifica nella demo che le modifiche funzionino come dovrebbero, quindi fai una PR.

La cartella demo funziona con la versione compilata della libreria, quindi assicurati di compilare se hai aggiunto nuove funzionalità e vuoi provarle.


Ringraziamenti
======

Grazie a [Johnson E](https://github.com/jonn-set) per aver sistemato il supporto Cucumber che molti utenti hanno richiesto.