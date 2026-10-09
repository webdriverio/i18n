---
id: bamboo
title: Bamboo
description: "Esegui i test WebdriverIO in Atlassian Bamboo e pubblica i risultati JUnit per monitorare i test superati, falliti e corretti in ogni build."
---

WebdriverIO offre una stretta integrazione con sistemi CI come [Bamboo](https://www.atlassian.com/software/bamboo). Con il reporter [JUnit](https://webdriver.io/docs/junit-reporter.html) o [Allure](https://webdriver.io/docs/allure-reporter.html), puoi facilmente eseguire il debug dei tuoi test e tenere traccia dei risultati. L'integrazione è piuttosto semplice.

1. Installa il reporter di test JUnit: `$ npm install @wdio/junit-reporter --save-dev`)
1. Aggiorna la tua configurazione per salvare i risultati JUnit dove Bamboo può trovarli (e specifica il reporter `junit`):

```js
// wdio.conf.js
module.exports = {
    // ...
    reporters: [
        'dot',
        ['junit', {
            outputDir: './testresults/'
        }]
    ],
    // ...
}
```
Nota: *È sempre una buona pratica conservare i risultati dei test in una cartella separata anziché nella cartella principale.*

```js
// wdio.conf.js - For tests running in parallel
module.exports = {
    // ...
    reporters: [
        'dot',
        ['junit', {
            outputDir: './testresults/',
            outputFileFormat: function (options) {
                return `results-${options.cid}.xml`;
            }
        }]
    ],
    // ...
}
```

I report saranno simili per tutti i framework e puoi usarne uno qualsiasi: Mocha, Jasmine o Cucumber.

A questo punto, presumiamo che tu abbia scritto i test, che i risultati vengano generati nella cartella ```./testresults/``` e che il tuo Bamboo sia attivo e funzionante.

## Integrare i tuoi test in Bamboo

1. Apri il tuo progetto Bamboo
    > Crea un nuovo piano, collega il tuo repository (assicurati che punti sempre alla versione più recente del repository) e crea i tuoi stage

    ![Plan Details](/img/bamboo/plancreation.png "Plan Details")

    Io utilizzerò lo stage e il job predefiniti. Nel tuo caso, puoi creare i tuoi stage e job

    ![Default Stage](/img/bamboo/defaultstage.png "Default Stage")
2. Apri il tuo job di test e crea dei task per eseguire i test in Bamboo
    >**Task 1:** Checkout del codice sorgente

    >**Task 2:** Esegui i tuoi test ```npm i && npm run test```. Puoi usare il task *Script* e lo *Shell Interpreter* per eseguire i comandi sopra indicati (questo genererà i risultati dei test e li salverà nella cartella ```./testresults/```)

    ![Test Run](/img/bamboo/testrun.png "Test Run")

    >**Task: 3** Aggiungi il task *jUnit Parser* per analizzare i risultati dei test salvati. Specifica qui la directory dei risultati dei test (puoi usare anche i pattern in stile Ant)

    ![jUnit Parser](/img/bamboo/junitparser.png "jUnit Parser")

    Nota: *Assicurati di mantenere il task di analisi dei risultati nella sezione *Final*, in modo che venga sempre eseguito anche se il task di test fallisce*

    >**Task: 4** (opzionale) Per assicurarti che i risultati dei test non vengano mescolati con file vecchi, puoi creare un task per rimuovere la cartella ```./testresults/``` dopo un'analisi riuscita in Bamboo. Puoi aggiungere uno script shell come ```rm -f ./testresults/*.xml``` per rimuovere i risultati oppure ```rm -r testresults``` per rimuovere l'intera cartella

Una volta completata questa *scienza missilistica*, abilita il piano ed eseguilo. Il risultato finale sarà simile a questo:

## Test riuscito

![Successful Test](/img/bamboo/successfulltest.png "Successful Test")

## Test fallito

![Failed Test](/img/bamboo/failedtest.png "Failed Test")

## Fallito e corretto

![Failed and Fixed](/img/bamboo/failedandfixed.png "Failed and Fixed")

Evviva!! È tutto. Hai integrato con successo i tuoi test WebdriverIO in Bamboo.