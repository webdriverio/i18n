---
id: sumologic-reporter
title: Reporter Sumologic
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-sumologic-reporter/README.md
---


> Un reporter WebdriverIO che invia i risultati dei test a [Sumologic](https://www.sumologic.com/) per analisi dei dati

![Sumologic Dashboard](/img/sumologic.png "Sumologic Dashboard")

## Installazione

Il modo più semplice è mantenere `@wdio/sumologic-reporter` come devDependency nel tuo `package.json`, tramite:

```sh
npm install @wdio/sumologic-reporter --save-dev
```

Le istruzioni su come installare `WebdriverIO` possono essere trovate [qui](https://webdriver.io/docs/gettingstarted).

## Configurazione

Prima dobbiamo creare un nuovo collector che raccolga tutti i log dei tuoi test. Per farlo, clicca su __Manage__ nella barra di navigazione e vai su __Collection__. Lì devi aggiungere un nuovo "Hosted Collector". Applica un nome adatto, ad esempio "test integration logs", una descrizione e una categoria, ad esempio "wdio". Clicca su Salva per creare il collector.

![Add Collector](https://webdriver.io/images/sumo-collector.png "Add Collector")

Il passo successivo è quello di aggiungere una source. Ha senso avere una source separata per ciascuno dei tuoi ambienti (ad esempio build di branch, integrazione). Clicca sul link "Add Source" accanto al tuo collector e aggiungi una __HTTP Source__. Applica nuovamente un nome e una descrizione adeguati e imposta una "Source Category" che rifletta l'ambiente. Lascia le altre opzioni in stato predefinito e clicca su salva.

![Add Source](https://webdriver.io/images/sumo-source.png "Add Source")

Apparirà un modale con l'endpoint della source. Copia quell'url e incollalo nel tuo wdio.conf.js in modo che il reporter sappia dove inviare i dati.

Il seguente codice mostra la configurazione predefinita del test runner wdio. Basta aggiungere `'sumologic'` come reporter all'array e aggiungere l'endpoint della tua source:

```js
// wdio.conf.js
module.exports = {
  // ...
  reporters: [
    'spec',
    ['sumologic', {
        // define sync interval how often logs get pushed to Sumologic
        syncInterval: 100,
        // endpoint of collector source
        sourceAddress: process.env.SUMO_SOURCE_ADDRESS
    }]
  ],
  // ...
};
```

Dopo aver eseguito i primi test con il reporter, dovresti essere in grado di controllare i log dei test con la seguente query:

```
_source=wdio
| parse "\"type\":\"*:*\"" as type,status
| json auto
```

Fornirò presto alcuni utili modelli di dashboard per Sumologic.

----

Per maggiori informazioni su WebdriverIO vedere la [homepage](https://webdriver.io).