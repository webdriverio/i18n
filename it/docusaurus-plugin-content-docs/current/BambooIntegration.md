---
id: bamboo
title: Bamboo
---

WebdriverIO offre un'integrazione stretta con i sistemi CI come [Bamboo](https://www.atlassian.com/software/bamboo). Con il reporter [JUnit](https://webdriver.io/docs/junit-reporter.html) o [Allure](https://webdriver.io/docs/allure-reporter.html), puoi facilmente eseguire il debug dei tuoi test e tenere traccia dei risultati dei test. L'integrazione è piuttosto semplice.

1. Installa il test reporter JUnit: `$ npm install @wdio/junit-reporter --save-dev`)
1. Aggiorna la tua configurazione per salvare i risultati JUnit dove Bamboo può trovarli, (e specifica il reporter `junit`):

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
Nota: *È sempre una buona prassi mantenere i risultati dei test in una cartella separata piuttosto che nella cartella principale.*

```js
// wdio.conf.js - Per test in esecuzione in parallelo
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

I report saranno simili per tutti i framework e puoi usare qualunque: Mocha, Jasmine o Cucumber.

A questo punto, crediamo che tu abbia scritto i test e che i risultati siano generati nella cartella ```./testresults/```, e che il tuo Bamboo sia attivo e funzionante.

## Integrare i tuoi test in Bamboo

1. Apri il tuo progetto Bamboo
    > Crea un nuovo piano, collega il tuo repository (assicurati che punti sempre alla versione più recente del tuo repository) e crea le tue fasi

    ![Plan Details](/img/bamboo/plancreation.png "Plan Details")

    Io procederò con la fase e il job predefiniti. Nel tuo caso, puoi creare le tue fasi e job

    ![Default Stage](/img/bamboo/defaultstage.png "Default Stage")
2. Apri il tuo job di test e crea attività per eseguire i tuoi test in Bamboo
    >**Attività 1:** Source Code Checkout

    >**Attività 2:** Esegui i tuoi test ```npm i && npm run test```. Puoi usare l'attività *Script* e *Shell Interpreter* per eseguire i comandi sopra (Questo genererà i risultati dei test e li salverà nella cartella ```./testresults/```)

    ![Test Run](/img/bamboo/testrun.png "Test Run")

    >**Attività: 3** Aggiungi l'attività *jUnit Parser* per analizzare i risultati dei test salvati. Specifica qui la directory dei risultati dei test (puoi anche usare i pattern in stile Ant)

    ![jUnit Parser](/img/bamboo/junitparser.png "jUnit Parser")

    Nota: *Assicurati di mantenere l'attività di analisi dei risultati nella sezione *Final*, in modo che venga sempre eseguita anche se l'attività di test fallisce*

    >**Attività: 4** (opzionale) Per assicurarti che i risultati dei tuoi test non siano confusi con vecchi file, puoi creare un'attività per rimuovere la cartella ```./testresults/``` dopo un'analisi riuscita in Bamboo. Puoi aggiungere uno script shell come ```rm -f ./testresults/*.xml``` per rimuovere i risultati o ```rm -r testresults``` per rimuovere la cartella completa

Una volta completata la suddetta *scienza missilistica*, abilita il piano ed eseguilo. Il tuo output finale sarà simile a:

## Test riuscito

![Successful Test](/img/bamboo/successfulltest.png "Successful Test")

## Test fallito

![Failed Test](/img/bamboo/failedtest.png "Failed Test")

## Fallito e corretto

![Failed and Fixed](/img/bamboo/failedandfixed.png "Failed and Fixed")

Evviva!! È tutto. Hai integrato con successo i tuoi test WebdriverIO in Bamboo.