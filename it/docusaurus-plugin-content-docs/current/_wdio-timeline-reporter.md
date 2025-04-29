---
id: wdio-timeline-reporter
title: Timeline Reporter
custom_edit_url: https://github.com/QualityOps/wdio-timeline-reporter/edit/master/README.md
---


> wdio-timeline-reporter è un pacchetto di terze parti, per maggiori informazioni vedere [GitHub](https://github.com/QualityOps/wdio-timeline-reporter) | [npm](https://www.npmjs.com/package/wdio-timeline-reporter)


> Un reporter WebdriverIO completo per una visualizzazione aggregata dei risultati dei test perché "Vedere è credere"

![example.png](https://github.com/QualityOps/wdio-timeline-reporter/blob/master/./images/example.png)

## Perché

Perché spendiamo molto tempo a debuggare test falliti passando dall'output del terminale alla visualizzazione di screenshot di errore, ecc. Questo reporter aggrega tutte le informazioni tipiche di cui avrai bisogno in un unico report. Esegui i test e avrai una bella timeline di eventi che potrai consultare per verificare ulteriormente che tutto sia a posto.

#### Le funzionalità includono:

- Funziona ottimamente con i framework Mocha e Jasmine. Funziona anche con Cucumber ma ogni step verrà riportato come un test
- Un chiaro riepilogo dei risultati dei test.
- Dettaglio di ogni esecuzione di test inclusi tutti gli screenshot catturati durante l'esecuzione.
- Filtraggio dei risultati dei test. Ottimo per concentrarsi sui test falliti
- Traccia dello stack di errori allegata al test.
- Possibilità di aggiungere informazioni aggiuntive al test durante l'esecuzione.
- Nessuna post-elaborazione richiesta. Al completamento del processo di test wdio, verrà generato un file di report HTML statico.
- Servizio Timeline per gestire l'acquisizione di screenshot incluso il ridimensionamento delle immagini.

Un esempio di report HTML può essere trovato [qui](http://htmlpreview.github.io/?https://github.com/QualityOps/wdio-timeline-reporter/blob/master/images/example-timeline-report.html)

Le istruzioni su come installare `WebdriverIO` si trovano [qui](http://webdriver.io/guide/getstarted/install.html).

## Installazione

**PER LA VERSIONE COMPATIBILE CON WEBDRIVERIO V4 VEDI [QUI](https://github.com/QualityOps/wdio-timeline-reporter/tree/v4)**

```shell
npm install --save wdio-timeline-reporter
```

Una dipendenza verrà aggiunta al tuo `package.json`

```json
{
  "dependencies": {
    "wdio-timeline-reporter": "^5.1.0"
  }
}
```

### Utilizzo

Aggiungi `timeline` all'array dei reporter nel tuo file di configurazione wdio.

Importa e aggiungi anche `TimelineService` da wdio-timeline-reporter.

Il servizio è obbligatorio per combinare i report e creare HTML poiché i reporter sono ora inizializzati per istanza di runner in webdriverio 5. [Vedi discussione aperta su webdriverio](https://github.com/webdriverio/webdriverio/issues/3780)

Il TimelineService può anche gestire l'acquisizione di screenshot durante l'esecuzione dei test. Hai la possibilità di ridurre la dimensione e la qualità delle immagini e di incorporare le immagini nel report come base64. Queste opzioni sono configurabili utilizzando le [opzioni del reporter.](#reporter-options)

```js
// wdio.conf.js
const { TimelineService } = require('wdio-timeline-reporter/timeline-service');
exports.config = {
  // ...
  reporters: [['timeline', { outputDir: './desired_location' }]],
  // ...
  services: [[TimelineService]]
};
```

### Opzioni del Reporter

Se desideri sovrascrivere la configurazione predefinita del reporter, aggiungi un oggetto letterale reporterOptions all'array timeline sotto reporters come mostrato di seguito.

![reporter-options.png](https://github.com/QualityOps/wdio-timeline-reporter/blob/master/./images/reporter-options.png)

| indice | descrizione                                                                                                                                                                                                   |
| ----- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1.    | Directory dove verrà creato il file html e gli screenshot. Opzione obbligatoria                                                                                                                               |
| 2.    | Nome del file di report html. Valore predefinito è `timeline-report.html`                                                                                                                                      |
| 3.    | Incorpora immagini come base64 nel file html. Valore predefinito è `false`                                                                                                                                    |
| 4.    | Opzioni oggetto per la manipolazione delle immagini                                                                                                                                                            |
| 5.    | Imposta la qualità JPEG. Rilevante solo se l'opzione `resize` è `true`. Più piccolo è il valore, più piccola sarà la dimensione e la qualità dell'immagine. Valore predefinito è `70`. Il valore massimo consentito è `100` |
| 6.    | Ridimensiona immagine. Valore predefinito è `false`                                                                                                                                                           |
| 7.    | valore per diminuire il numero totale di pixel. Rilevante solo se l'opzione `resize` è true. Predefinito a `1` Valori validi `1 - 5`                                                                           |
| 8.    | frequenza di acquisizione degli screenshot. I valori supportati sono `on:error`, `before:click`, `none`. Predefinito a `none`. `before:click` è un'ottima opzione per creare una timeline di screenshot dell'app in test. |

### Aggiungere informazioni aggiuntive al contesto del test

È possibile aggiungere informazioni aggiuntive a un test utilizzando il metodo statico `addContext`. Questo può essere utile per aggiungere informazioni importanti che potrebbero aiutare nel debug dei test falliti, ad esempio un utente creato durante l'esecuzione del test con un nome utente dinamico

#### Utilizzo base

Il metodo statico `TimelineReporter.addContext` accetta un parametro di stringa o un oggetto letterale con due proprietà `title` e `value` es.

```js
{ title: 'sessionId', value: 'b59bb9ec-ab15-475e-9ce6-de8a14ca0cd3' }
```

il valore potrebbe essere anche un link

##### Esempio Mocha

```js
const TimelineReporter = require('wdio-timeline-reporter').default;

describe('Suite', function() {
  it('Test', function() {
    // parametro oggetto letterale
    TimelineReporter.addContext({
      title: 'Test User',
      value: 'user id created during the test'
    });

    // valore come tag anchor
    TimelineReporter.addContext({
      title: 'Dynamic link',
      value: '<a href="">Some important link related to test</a>'
    });

    // parametro stringa
    TimelineReporter.addContext('This test might be flaky');
  });
});
```

## Ringraziamenti

Vorrei ringraziare gli autori e i manutentori di [wdio-json-reporter](https://github.com/fijijavis/wdio-json-reporter). Esaminare la loro soluzione v5 ha aiutato ad accelerare il mio lavoro