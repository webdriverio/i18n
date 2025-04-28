---
id: bamboo
title: Bamboo
---

WebdriverIO offre un'integrazione stretta con sistemi CI come [Bamboo](https://www.atlassian.com/software/bamboo). Con il reporter [JUnit](https://webdriver.io/docs/junit-reporter.html) o [Allure](https://webdriver.io/docs/allure-reporter.html), puoi facilmente eseguire il debug dei tuoi test e tenere traccia dei risultati. L'integrazione è piuttosto semplice.

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
Nota: *È sempre una buona pratica mantenere i risultati dei test in una cartella separata rispetto alla cartella principale.*

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

I report saranno simili per tutti i framework e puoi utilizzare qualsiasi di essi: Mocha, Jasmine o Cucumber.

A questo punto, crediamo che tu abbia scritto i test e che i risultati siano generati nella cartella ```./testresults/```, e che il tuo Bamboo sia attivo e funzionante.

## Integra i tuoi test in Bamboo

1. Apri il tuo progetto Bamboo
    > Crea un nuovo piano, collega il tuo repository (assicurati che punti sempre alla versione più recente del tuo repository) e crea i tuoi stage

    ![Piano Dettagliato](/img/bamboo/plancreation.png "Piano Dettagliato")

    Procederò con lo stage e il job predefiniti. Nel tuo caso, puoi creare i tuoi stage e job

    ![Stage Predefinito](/img/bamboo/defaultstage.png "Stage Predefinito")
2. Apri il tuo job di test e crea attività per eseguire i tuoi test in Bamboo
    >**Attività 1:** Source Code Checkout

    >**Attività 2:** Esegui i tuoi test ```npm i && npm run test```. Puoi utilizzare l'attività *Script* e l'*Interprete Shell* per eseguire i comandi sopra (questo genererà i risultati del test e li salverà nella cartella ```./testresults/```)

    ![Esecuzione Test](/img/bamboo/testrun.png "Esecuzione Test")

    >**Attività: 3** Aggiungi l'attività *jUnit Parser* per analizzare i risultati del test salvati. Specifica qui la directory dei risultati del test (puoi anche utilizzare i pattern in stile Ant)

    ![jUnit Parser](/img/bamboo/junitparser.png "jUnit Parser")

    Nota: *Assicurati di mantenere l'attività di analisi dei risultati nella sezione *Finale*, in modo che venga sempre eseguita anche se l'attività di test fallisce*

    >**Attività: 4** (opzionale) Per assicurarti che i risultati del test non siano confusi con i vecchi file, puoi creare un'attività per rimuovere la cartella ```./testresults/``` dopo un'analisi riuscita in Bamboo. Puoi aggiungere uno script shell come ```rm -f ./testresults/*.xml``` per rimuovere i risultati o ```rm -r testresults``` per rimuovere la cartella completa

Una volta completata la *scienza missilistica* di cui sopra, abilita il piano ed eseguilo. Il tuo output finale sarà simile a:

## Test riuscito

![Test Riuscito](/img/bamboo/successfulltest.png "Test Riuscito")

## Test fallito

![Test Fallito](/img/bamboo/failedtest.png "Test Fallito")

## Fallito e Risolto

![Fallito e Risolto](/img/bamboo/failedandfixed.png "Fallito e Risolto")

Evviva!! È tutto. Hai integrato con successo i tuoi test WebdriverIO in Bamboo.