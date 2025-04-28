---
id: setuptypes
title: Tipi di Setup
---

WebdriverIO può essere utilizzato per vari scopi. Implementa l'API del protocollo WebDriver e può eseguire un browser in modo automatizzato. Il framework è progettato per funzionare in qualsiasi ambiente arbitrario e per qualsiasi tipo di attività. È indipendente da framework di terze parti e richiede solo Node.js per funzionare.

## Binding del Protocollo

Per interazioni di base con WebDriver e altri protocolli di automazione, WebdriverIO utilizza i propri binding di protocollo basati sul pacchetto NPM [`webdriver`](https://www.npmjs.com/package/webdriver):

<Tabs
  defaultValue="webdriver"
  values={[
    {label: 'WebDriver', value: 'webdriver'},
    {label: 'Chrome DevTools', value: 'devtools'},
  ]
}>
<TabItem value="webdriver">

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/setup/webdriver.js#L5-L20
```

</TabItem>
<TabItem value="devtools">

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/setup/devtools.js#L2-L17
```

</TabItem>
</Tabs>

Tutti i [comandi del protocollo](api/webdriver) restituiscono la risposta grezza dal driver di automazione. Il pacchetto è molto leggero e __non__ esiste alcuna logica intelligente come gli auto-wait per semplificare l'interazione con l'utilizzo del protocollo.

I comandi del protocollo applicati all'istanza dipendono dalla risposta iniziale della sessione del driver. Ad esempio, se la risposta indica che è stata avviata una sessione mobile, il pacchetto applica tutti i comandi del protocollo Appium e Mobile JSON Wire al prototipo dell'istanza.

Puoi eseguire lo stesso set di comandi (eccetto quelli mobili) utilizzando il protocollo Chrome DevTools quando importi il pacchetto NPM [`devtools`](https://www.npmjs.com/package/devtools). Ha la stessa interfaccia del pacchetto `webdriver` ma esegue la sua automazione basata su [Puppeteer](https://pptr.dev/).

Per ulteriori informazioni sulle interfacce di questi pacchetti, vedere [API dei Moduli](/docs/api/modules).

## Modalità Standalone

Per semplificare l'interazione con il protocollo WebDriver, il pacchetto `webdriverio` implementa una varietà di comandi sopra il protocollo (ad esempio il comando [`dragAndDrop`](api/element/dragAndDrop)) e concetti fondamentali come [selettori intelligenti](selectors) o [auto-waits](autowait). L'esempio precedente può essere semplificato in questo modo:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/setup/standalone.js#L2-L19
```

Utilizzando WebdriverIO in modalità standalone hai ancora accesso a tutti i comandi del protocollo, ma fornisce un super set di comandi aggiuntivi che offrono un'interazione di livello superiore con il browser. Ti permette di integrare questo strumento di automazione nel tuo progetto (di test) per creare una nuova libreria di automazione. Esempi popolari includono [Oxygen](https://github.com/oxygenhq/oxygen) o [CodeceptJS](http://codecept.io). Puoi anche scrivere semplici script Node per estrarre contenuti dal web (o qualsiasi altra cosa che richieda un browser in esecuzione).

Se non sono impostate opzioni specifiche, WebdriverIO tenterà sempre di scaricare e configurare il driver del browser che corrisponde alla proprietà `browserName` nelle tue capabilities. Nel caso di Chrome e Firefox potrebbe anche installarli a seconda che riesca a trovare il browser corrispondente sulla macchina.

Per ulteriori informazioni sulle interfacce del pacchetto `webdriverio`, vedere [API dei Moduli](/docs/api/modules).

## Il Testrunner WDIO

Lo scopo principale di WebdriverIO, tuttavia, è il testing end-to-end su larga scala. Abbiamo quindi implementato un test runner che ti aiuta a costruire una suite di test affidabile, facile da leggere e mantenere.

Il test runner si occupa di molti problemi comuni quando si lavora con semplici librerie di automazione. Da un lato, organizza le tue esecuzioni di test e divide le specifiche dei test in modo che i tuoi test possano essere eseguiti con la massima concorrenza. Gestisce anche la gestione delle sessioni e fornisce molte funzionalità per aiutarti a debuggare problemi e trovare errori nei tuoi test.

Ecco lo stesso esempio di prima, scritto come specifica di test ed eseguito da WDIO:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/setup/testrunner.js
```

Il test runner è un'astrazione di framework di test popolari come Mocha, Jasmine o Cucumber. Per eseguire i tuoi test utilizzando il test runner WDIO, consulta la sezione [Per iniziare](gettingstarted) per ulteriori informazioni.

Per ulteriori informazioni sull'interfaccia del pacchetto testrunner `@wdio/cli`, vedere [API dei Moduli](/docs/api/modules).