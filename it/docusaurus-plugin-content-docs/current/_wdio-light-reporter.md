---
id: wdio-light-reporter
title: Reporter Light Reporter
custom_edit_url: https://github.com/sarfrajadstreaks/wdio-light-reporter/edit/main/README.md
---


> wdio-light-reporter è un pacchetto di terze parti, per maggiori informazioni si prega di consultare [GitHub](https://github.com/sarfrajadstreaks/wdio-light-reporter) | [npm](https://www.npmjs.com/package/wdio-light-reporter)

## Ispirato da HTML e Mochawesome reporter

!Filosofia:

> Questo reporter non supporta la rigenerazione dei report Cucumber ed è sviluppato tenendo a mente i framework bdd e mocha.
> Qui, la sezione `describe()` è considerata come scenario di test e `it()` come caso di test all'interno degli scenari di test.

## CARATTERISTICHE

1. Configurazione facile
2. UI migliorata
3. Screenshot incorporati nel report HTML
4. addLabel() per includere passaggi di contesto o nomi

## RILASCI
V 0.1.9 - Rilascio iniziale
V 0.2.6 - (ultima)
  1. Include esecuzioni su più ambienti e separa in base all'ambiente.
  2. Correzione di bug
  3. Prestazioni migliorate.

## ESEMPI

![Example](https://github.com/sarfrajadstreaks/wdio-light-reporter/blob/main/./ReadME/example_1.png)
![Example](https://github.com/sarfrajadstreaks/wdio-light-reporter/blob/main/./ReadME/example_2.png)
![Example](https://github.com/sarfrajadstreaks/wdio-light-reporter/blob/main/./ReadME/example_3.png)

## Installazione

NPM

```sh
npm install wdio-light-reporter --save-dev
```

## Configurazione

```
reporters: ['dot', ['light',{
      outputDir: './Results',
      outputFile:`demo${new Date()}`,    // html report file will be name this 
      addScreenshots: false,   // to add screenshots in report make it as true. Default is false
  }]
],
```

## Screenshot

Il Reporter non ha la capacità di configurarsi automaticamente per acquisire screenshot, ma se configurato manualmente, ascolta l'evento e allega gli screenshot nel report HTML.
**Per includere screenshot nel report, aggiungi il codice seguente nell'hook afterTest() nel file wdio conf.**

```
afterTest: async function (test,context,{ error, result, duration, passed, retries }) {
    if (!passed) {await browser.takeScreenshot()}
},
```

## File di risultato

Ogni esecuzione rigenera il report json per ogni file spec, per generare un report json e HTML combinato, aggiungi il codice seguente nell'hook **onComplete()** nel file wdio conf

```
 onComplete: function (exitCode, config, capabilities, results) {
    const mergeResults = require("wdio-light-reporter/src/mergeResults"); //you can add this on top of the file
    mergeResults("./Results");
 },
```

> Se esegui il tuo test senza alcuna opzione --suite, allora considera default come suite
> Il reporter non funziona se fornisci più parametri come suite durante l'esecuzione.
> wdio run `wdio.conf.js --suite firstSuite` - **(FUNZIONA BENE)** :)  
>  wdio run `wdio.conf.js --suite firstSuite --suite secondSuite` **(NON FUNZIONA)** :(

## Aggiungere contesto

> Puoi usare `useLabel()` per aggiungere contesto a qualsiasi step o per includerlo come step.

```
const { addLabel } = require("wdio-light-reporter").default;
describe("Show how to use addLabel ", () => {
  it("report will added this a steps/context in report", async () => {
      addLabel("Log Example 1 as step 1")
      console.log("Log Example 1 )
      addLabel("Log Example 2 as step 2")
      console.log("Log Example 2 )
  })
})


```
## Aggiornamenti
```
 reporters: ['dot', ['light',{
      outputDir: './Results',
      outputFile:"demo",    // html report file will be name this 
      addScreenshots: false,   // to add screenshots in report make it as true. Default is false
      //autoClean:false       // removed autoClean and include the same functionality as default in mergeResult function
  }]
],
```
## Licenza

MIT
**Gratis, Sì, Certo!**