---
id: setuptypes
title: Tipi di configurazione
description: "Confronta i modi di utilizzare WebdriverIO, dai binding del protocollo grezzi alla modalità standalone e al testrunner WDIO, e scegli quello giusto."
---

WebdriverIO può essere utilizzato per vari scopi. Implementa l'API del protocollo WebDriver e può eseguire un browser in modo automatizzato. Il framework è progettato per funzionare in qualsiasi ambiente e per qualsiasi tipo di attività. È indipendente da qualsiasi framework di terze parti e richiede solo Node.js per essere eseguito.

## Binding del protocollo

Per le interazioni di base con il protocollo WebDriver, WebdriverIO utilizza i propri binding del protocollo basati sul pacchetto NPM [`webdriver`](https://www.npmjs.com/package/webdriver):

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/setup/webdriver.js#L5-L20
```

Tutti i [comandi del protocollo](api/webdriver) restituiscono la risposta grezza del driver di automazione. Il pacchetto è molto leggero e __non__ c'è alcuna logica intelligente, come le attese automatiche, per semplificare l'interazione con l'utilizzo del protocollo.

I comandi del protocollo applicati all'istanza dipendono dalla risposta iniziale della sessione del driver. Ad esempio, se la risposta indica che è stata avviata una sessione mobile, il pacchetto applica i comandi Appium al prototipo dell'istanza.

Per maggiori informazioni sull'interfaccia del pacchetto `webdriver`, consulta [Modules API](/docs/api/modules).

[WebdriverIO DevTools](/docs/devtools) non è un protocollo di automazione. È l'interfaccia di debug per osservare un'esecuzione dal vivo e riprodurre le tracce in seguito.

## Modalità standalone

Per semplificare l'interazione con il protocollo WebDriver, il pacchetto `webdriverio` implementa una varietà di comandi basati sul protocollo (ad es. il comando [`dragAndDrop`](api/element/dragAndDrop)) e concetti fondamentali come i [selettori intelligenti](selectors) o le [attese automatiche](autowait). L'esempio precedente può essere semplificato in questo modo:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/setup/standalone.js#L2-L19
```

L'utilizzo di WebdriverIO in modalità standalone ti dà comunque accesso a tutti i comandi del protocollo, ma fornisce un superset di comandi aggiuntivi che offrono un'interazione di livello più alto con il browser. Ti consente di integrare questo strumento di automazione nel tuo progetto (di test) per creare una nuova libreria di automazione. Esempi popolari includono [Oxygen](https://github.com/oxygenhq/oxygen) o [CodeceptJS](http://codecept.io). Puoi anche scrivere semplici script Node per estrarre contenuti dal web (o qualsiasi altra cosa che richieda un browser in esecuzione).

Se non sono impostate opzioni specifiche, WebdriverIO tenterà sempre di scaricare e configurare il driver del browser corrispondente alla proprietà `browserName` nelle tue capabilities. Nel caso di Chrome e Firefox, potrebbe anche installarli a seconda che riesca o meno a trovare il browser corrispondente sulla macchina.

Per maggiori informazioni sulle interfacce del pacchetto `webdriverio`, consulta [Modules API](/docs/api/modules).

## Il Testrunner WDIO

Lo scopo principale di WebdriverIO, tuttavia, è il testing end-to-end su larga scala. Abbiamo quindi implementato un test runner che ti aiuta a creare una suite di test affidabile, facile da leggere e da mantenere.

Il test runner si occupa di molti problemi comuni quando si lavora con semplici librerie di automazione. Innanzitutto, organizza le esecuzioni dei test e suddivide le specifiche di test in modo che i tuoi test possano essere eseguiti con la massima concorrenza. Gestisce inoltre la gestione delle sessioni e fornisce numerose funzionalità per aiutarti a eseguire il debug dei problemi e trovare errori nei tuoi test.

Ecco lo stesso esempio di prima, scritto come specifica di test ed eseguito da WDIO:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/setup/testrunner.js
```

Il test runner è un'astrazione di framework di test popolari come Mocha, Jasmine o Cucumber. Per eseguire i tuoi test utilizzando il test runner WDIO, consulta la sezione [Per iniziare](gettingstarted) per maggiori informazioni.

Per maggiori informazioni sull'interfaccia del pacchetto testrunner `@wdio/cli`, consulta [Modules API](/docs/api/modules).