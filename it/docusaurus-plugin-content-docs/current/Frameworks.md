---
id: frameworks
title: Framework
---

WebdriverIO Runner ha un supporto incorporato per [Mocha](http://mochajs.org/), [Jasmine](http://jasmine.github.io/), e [Cucumber.js](https://cucumber.io/). Puoi anche integrarlo con framework open-source di terze parti, come [Serenity/JS](#using-serenityjs).

:::tip Integrare WebdriverIO con i framework di test
Per integrare WebdriverIO con un framework di test, è necessario un pacchetto adattatore disponibile su NPM.
Nota che il pacchetto adattatore deve essere installato nella stessa posizione dove è installato WebdriverIO.
Quindi, se hai installato WebdriverIO globalmente, assicurati di installare anche il pacchetto adattatore globalmente.
:::

L'integrazione di WebdriverIO con un framework di test ti permette di accedere all'istanza WebDriver utilizzando la variabile globale `browser`
nei tuoi file spec o nelle definizioni degli step.
Nota che WebdriverIO si occuperà anche di istanziare e terminare la sessione Selenium, quindi non dovrai farlo
tu stesso.

## Utilizzo di Mocha

Prima, installa il pacchetto adattatore da NPM:

```bash npm2yarn
npm install @wdio/mocha-framework --save-dev
```

Di default WebdriverIO fornisce una [libreria di asserzioni](assertion) integrata con cui puoi iniziare subito:

```js
describe('my awesome website', () => {
    it('should do some assertions', async () => {
        await browser.url('https://webdriver.io')
        await expect(browser).toHaveTitle('WebdriverIO · Next-gen browser and mobile automation test framework for Node.js | WebdriverIO')
    })
})
```

WebdriverIO supporta le interfacce `BDD` (predefinita), `TDD` e `QUnit` di Mocha [interfaces](https://mochajs.org/#interfaces).

Se desideri scrivere le tue specifiche in stile TDD, imposta la proprietà `ui` nelle tue configurazioni `mochaOpts` su `tdd`. Ora i tuoi file di test dovrebbero essere scritti così:

```js
suite('my awesome website', () => {
    test('should do some assertions', async () => {
        await browser.url('https://webdriver.io')
        await expect(browser).toHaveTitle('WebdriverIO · Next-gen browser and mobile automation test framework for Node.js | WebdriverIO')
    })
})
```

Se vuoi definire altre impostazioni specifiche di Mocha, puoi farlo con la chiave `mochaOpts` nel tuo file di configurazione. Un elenco di tutte le opzioni può essere trovato sul [sito del progetto Mocha](https://mochajs.org/api/mocha).

__Nota:__ WebdriverIO non supporta l'uso deprecato dei callback `done` in Mocha:

```js
it('should test something', (done) => {
    done() // lancia "done is not a function"
})
```

### Opzioni di Mocha

Le seguenti opzioni possono essere applicate nel tuo `wdio.conf.js` per configurare il tuo ambiente Mocha. __Nota:__ non tutte le opzioni sono supportate, ad esempio l'applicazione dell'opzione `parallel` causerà un errore poiché il testrunner WDIO ha il suo modo di eseguire i test in parallelo. Puoi passare queste opzioni del framework come argomenti, ad esempio:

```sh
wdio run wdio.conf.ts --mochaOpts.grep "my test" --mochaOpts.bail --no-mochaOpts.checkLeaks
```

Questo passerà le seguenti opzioni di Mocha:

```ts
{
    grep: ['my-test'],
    bail: true
    checkLeacks: false
}
```

Le seguenti opzioni di Mocha sono supportate:

#### require
L'opzione `require` è utile quando vuoi aggiungere o estendere alcune funzionalità di base (opzione del framework WebdriverIO).

Type: `string|string[]`<br />
Default: `[]`

#### compilers
Utilizzare i moduli dati per compilare i file. I compilatori verranno inclusi prima delle richieste (opzione del framework WebdriverIO).

Type: `string[]`<br />
Default: `[]`

#### allowUncaught
Propaga errori non catturati.

Type: `boolean`<br />
Default: `false`

#### bail
Interrompe dopo il primo test fallito.

Type: `boolean`<br />
Default: `false`

#### checkLeaks
Controlla se ci sono fughe di variabili globali.

Type: `boolean`<br />
Default: `false`

#### delay
Ritarda l'esecuzione della suite principale.

Type: `boolean`<br />
Default: `false`

#### fgrep
Filtro di test con la stringa data.

Type: `string`<br />
Default: `null`

#### forbidOnly
I test marcati come `only` fanno fallire la suite.

Type: `boolean`<br />
Default: `false`

#### forbidPending
I test in attesa fanno fallire la suite.

Type: `boolean`<br />
Default: `false`

#### fullTrace
Traccia completa dello stack in caso di fallimento.

Type: `boolean`<br />
Default: `false`

#### global
Variabili attese nell'ambito globale.

Type: `string[]`<br />
Default: `[]`

#### grep
Filtro di test con espressione regolare data.

Type: `RegExp|string`<br />
Default: `null`

#### invert
Inverte i risultati del filtro dei test.

Type: `boolean`<br />
Default: `false`

#### retries
Numero di volte per riprovare i test falliti.

Type: `number`<br />
Default: `0`

#### timeout
Valore di soglia del timeout (in ms).

Type: `number`<br />
Default: `30000`

## Utilizzo di Jasmine

Prima, installa il pacchetto adattatore da NPM:

```bash npm2yarn
npm install @wdio/jasmine-framework --save-dev
```

Puoi quindi configurare il tuo ambiente Jasmine impostando una proprietà `jasmineOpts` nella tua configurazione. Un elenco di tutte le opzioni può essere trovato sul [sito del progetto Jasmine](https://jasmine.github.io/api/3.5/Configuration.html).

### Opzioni di Jasmine

Le seguenti opzioni possono essere applicate nel tuo `wdio.conf.js` per configurare il tuo ambiente Jasmine utilizzando la proprietà `jasmineOpts`. Per ulteriori informazioni su queste opzioni di configurazione, consulta la [documentazione di Jasmine](https://jasmine.github.io/api/edge/Configuration). Puoi passare queste opzioni del framework come argomenti, ad esempio:

```sh
wdio run wdio.conf.ts --jasmineOpts.grep "my test" --jasmineOpts.failSpecWithNoExpectations --no-jasmineOpts.random
```

Questo passerà le seguenti opzioni di Mocha:

```ts
{
    grep: ['my-test'],
    bail: true
    checkLeacks: false
}
```

Le seguenti opzioni di Jasmine sono supportate:

#### defaultTimeoutInterval
Intervallo di timeout predefinito per le operazioni Jasmine.

Type: `number`<br />
Default: `60000`

#### helpers
Array di percorsi di file (e glob) relativi a spec_dir da includere prima delle specifiche Jasmine.

Type: `string[]`<br />
Default: `[]`

#### requires
L'opzione `requires` è utile quando si desidera aggiungere o estendere alcune funzionalità di base.

Type: `string[]`<br />
Default: `[]`

#### random
Se randomizzare l'ordine di esecuzione delle specifiche.

Type: `boolean`<br />
Default: `true`

#### seed
Seme da utilizzare come base per la randomizzazione. Null fa sì che il seme venga determinato casualmente all'inizio dell'esecuzione.

Type: `Function`<br />
Default: `null`

#### failSpecWithNoExpectations
Se far fallire la specifica se non ha eseguito aspettative. Per impostazione predefinita, una specifica che non ha eseguito aspettative viene segnalata come superata. Impostando questo su true si segnalerà tale specifica come un fallimento.

Type: `boolean`<br />
Default: `false`

#### oneFailurePerSpec
Se far sì che le specifiche abbiano solo un fallimento di aspettativa.

Type: `boolean`<br />
Default: `false`

#### specFilter
Funzione da utilizzare per filtrare le specifiche.

Type: `Function`<br />
Default: `(spec) => true`

#### grep
Esegui solo i test che corrispondono a questa stringa o espressione regolare. (Applicabile solo se non è impostata una funzione personalizzata `specFilter`)

Type: `string|Regexp`<br />
Default: `null`

#### invertGrep
Se è vero, inverte i test corrispondenti ed esegue solo i test che non corrispondono all'espressione utilizzata in `grep`. (Applicabile solo se non è impostata una funzione personalizzata `specFilter`)

Type: `boolean`<br />
Default: `false`

## Utilizzo di Cucumber

Prima, installa il pacchetto adattatore da NPM:

```bash npm2yarn
npm install @wdio/cucumber-framework --save-dev
```

Se vuoi usare Cucumber, imposta la proprietà `framework` su `cucumber` aggiungendo `framework: 'cucumber'` al [file di configurazione](configurationfile).

Le opzioni per Cucumber possono essere fornite nel file di configurazione con `cucumberOpts`. Consulta l'elenco completo delle opzioni [qui](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-cucumber-framework#cucumberopts-options).

Per iniziare rapidamente con Cucumber, dai un'occhiata al nostro progetto [`cucumber-boilerplate`](https://github.com/webdriverio/cucumber-boilerplate) che include tutte le definizioni degli step necessarie per iniziare, e potrai iniziare a scrivere subito i file feature.

### Opzioni di Cucumber

Le seguenti opzioni possono essere applicate nel tuo `wdio.conf.js` per configurare il tuo ambiente Cucumber utilizzando la proprietà `cucumberOpts`:

:::tip Regolazione delle opzioni tramite la riga di comando
Le `cucumberOpts`, come i `tags` personalizzati per filtrare i test, possono essere specificate tramite la riga di comando. Questo viene realizzato utilizzando il formato `cucumberOpts.{optionName}="value"`.

Ad esempio, se vuoi eseguire solo i test contrassegnati con `@smoke`, puoi utilizzare il seguente comando:

```sh
# Quando vuoi eseguire solo i test con il tag "@smoke"
npx wdio run ./wdio.conf.js --cucumberOpts.tags="@smoke"
npx wdio run ./wdio.conf.js --cucumberOpts.name="some scenario name" --cucumberOpts.failFast
```

Questo comando imposta l'opzione `tags` in `cucumberOpts` su `@smoke`, assicurando che vengano eseguiti solo i test con questo tag.

:::

#### backtrace
Mostra la traccia completa per gli errori.

Type: `Boolean`<br />
Default: `true`

#### requireModule
Richiede i moduli prima di richiedere qualsiasi file di supporto.

Type: `string[]`<br />
Default: `[]`<br />
Esempio:

```js
cucumberOpts: {
    requireModule: ['@babel/register']
    // o
    requireModule: [
        [
            '@babel/register',
            {
                rootMode: 'upward',
                ignore: ['node_modules']
            }
        ]
    ]
 }
 ```

#### failFast
Interrompe l'esecuzione al primo fallimento.

Type: `boolean`<br />
Default: `false`

#### name
Esegue solo gli scenari con un nome che corrisponde all'espressione (ripetibile).

Type: `RegExp[]`<br />
Default: `[]`

#### require
Richiede i file contenenti le definizioni dei tuoi step prima di eseguire le funzionalità. Puoi anche specificare un glob per le tue definizioni di step.

Type: `string[]`<br />
Default: `[]`
Esempio:

```js
cucumberOpts: {
    require: [path.join(__dirname, 'step-definitions', 'my-steps.js')]
}
```

#### import
Percorsi dove si trova il tuo codice di supporto, per ESM.

Type: `String[]`<br />
Default: `[]`
Esempio:

```js
cucumberOpts: {
    import: [path.join(__dirname, 'step-definitions', 'my-steps.js')]
}
```

#### strict
Fallisce se ci sono step non definiti o in attesa.

Type: `boolean`<br />
Default: `false`

#### tags
Esegue solo le funzionalità o gli scenari con tag che corrispondono all'espressione.
Si prega di consultare la [documentazione di Cucumber](https://docs.cucumber.io/cucumber/api/#tag-expressions) per maggiori dettagli.

Type: `String`<br />
Default: ``

#### timeout
Timeout in millisecondi per le definizioni degli step.

Type: `Number`<br />
Default: `30000`

#### retry
Specifica il numero di volte per riprovare i casi di test falliti.

Type: `Number`<br />
Default: `0`

#### retryTagFilter
Riprova solo le funzionalità o gli scenari con tag che corrispondono all'espressione (ripetibile). Questa opzione richiede che sia specificato '--retry'.

Type: `RegExp`

#### language
Lingua predefinita per i tuoi file feature

Type: `String`<br />
Default: `en`

#### order
Esegui i test in ordine definito / casuale

Type: `String`<br />
Default: `defined`

#### format
Nome e percorso del file di output del formattatore da utilizzare.
WebdriverIO supporta principalmente solo i [Formattatori](https://github.com/cucumber/cucumber-js/blob/main/docs/formatters.md) che scrivono output su un file.

Type: `string[]`<br />

#### formatOptions
Opzioni da fornire ai formattatori

Type: `object`<br />

#### tagsInTitle
Aggiungi i tag di cucumber al nome della funzionalità o dello scenario

Type: `Boolean`<br />
Default: `false`

***Si prega di notare che questa è un'opzione specifica di @wdio/cucumber-framework e non è riconosciuta da cucumber-js stesso***<br/>

#### ignoreUndefinedDefinitions
Tratta le definizioni non definite come avvisi.

Type: `Boolean`<br />
Default: `false`

***Si prega di notare che questa è un'opzione specifica di @wdio/cucumber-framework e non è riconosciuta da cucumber-js stesso***<br/>

#### failAmbiguousDefinitions
Tratta le definizioni ambigue come errori.

Type: `Boolean`<br />
Default: `false`

***Si prega di notare che questa è un'opzione specifica di @wdio/cucumber-framework e non è riconosciuta da cucumber-js stesso***<br/>

#### tagExpression
Esegue solo le funzionalità o gli scenari con tag che corrispondono all'espressione.
Si prega di consultare la [documentazione di Cucumber](https://docs.cucumber.io/cucumber/api/#tag-expressions) per maggiori dettagli.

Type: `String`<br />
Default: ``

***Si prega di notare che questa opzione sarà deprecata in futuro. Utilizza invece la proprietà di configurazione [`tags`](#tags)***

#### profile
Specifica il profilo da utilizzare.

Type: `string[]`<br />
Default: `[]`

***Prendi nota gentilmente che solo valori specifici (worldParameters, name, retryTagFilter) sono supportati all'interno dei profili, poiché `cucumberOpts` ha la precedenza. Inoltre, quando si utilizza un profilo, assicurarsi che i valori menzionati non siano dichiarati all'interno di `cucumberOpts`.***

### Saltare i test in cucumber

Nota che se vuoi saltare un test utilizzando le normali capacità di filtraggio dei test di cucumber disponibili in `cucumberOpts`, lo farai per tutti i browser e i dispositivi configurati nelle capacità. Per poter saltare gli scenari solo per specifiche combinazioni di capacità senza dover avviare una sessione se non necessario, webdriverio fornisce la seguente sintassi specifica dei tag per cucumber:

`@skip([condition])`

dove condition è una combinazione opzionale di proprietà di capacità con i loro valori che, quando **tutti** corrispondono, causeranno lo scenario o la funzionalità etichettata per essere saltati. Naturalmente puoi aggiungere diversi tag a scenari e funzionalità per saltare i test in diverse condizioni.

Puoi anche utilizzare l'annotazione '@skip' per saltare i test senza modificare `tagExpression'. In questo caso i test saltati verranno visualizzati nel rapporto di test.

Ecco alcuni esempi di questa sintassi:
- `@skip` o `@skip()`: salterà sempre l'elemento etichettato
- `@skip(browserName="chrome")`: il test non verrà eseguito sui browser chrome.
- `@skip(browserName="firefox";platformName="linux")`: salterà il test nelle esecuzioni di firefox su linux.
- `@skip(browserName=["chrome","firefox"])`: gli elementi etichettati verranno saltati sia per i browser chrome che firefox.
- `@skip(browserName=/i.*explorer/)`: le capacità con browser che corrispondono all'espressione regolare verranno saltate (come `iexplorer`, `internet explorer`, `internet-explorer`, ...).

### Importare l'Helper per la Definizione degli Step

Per utilizzare helper per la definizione degli step come `Given`, `When` o `Then` o hook, devi importarli da `@cucumber/cucumber`, ad esempio così:

```js
import { Given, When, Then } from '@cucumber/cucumber'
```

Ora, se utilizzi già Cucumber per altri tipi di test non correlati a WebdriverIO per i quali utilizzi una versione specifica, devi importare questi helper nei tuoi test e2e dal pacchetto Cucumber di WebdriverIO, ad esempio:

```js
import { Given, When, Then, world, context } from '@wdio/cucumber-framework'
```

Questo garantisce che tu utilizzi gli helper giusti all'interno del framework WebdriverIO e ti permette di utilizzare una versione indipendente di Cucumber per altri tipi di test.

### Pubblicazione del Report

Cucumber fornisce una funzionalità per pubblicare i report dei tuoi test su `https://reports.cucumber.io/`, che può essere controllata sia impostando il flag `publish` in `cucumberOpts` sia configurando la variabile di ambiente `CUCUMBER_PUBLISH_TOKEN`. Tuttavia, quando utilizzi `WebdriverIO` per l'esecuzione dei test, c'è una limitazione con questo approccio. Aggiorna i report separatamente per ogni file feature, rendendo difficile visualizzare un report consolidato.

Per superare questa limitazione, abbiamo introdotto un metodo basato su promesse chiamato `publishCucumberReport` all'interno di `@wdio/cucumber-framework`. Questo metodo dovrebbe essere chiamato nell'hook `onComplete`, che è il posto ottimale per invocarlo. `publishCucumberReport` richiede l'input della directory dei report dove sono memorizzati i report dei messaggi di cucumber.

Puoi generare report `cucumber message` configurando l'opzione `format` nel tuo `cucumberOpts`. È altamente consigliato fornire un nome di file dinamico all'interno dell'opzione di formato `cucumber message` per evitare la sovrascrittura dei report e garantire che ogni esecuzione di test sia registrata accuratamente.

Prima di utilizzare questa funzione, assicurati di impostare le seguenti variabili di ambiente:
- CUCUMBER_PUBLISH_REPORT_URL: L'URL dove desideri pubblicare il report Cucumber. Se non fornito, verrà utilizzato l'URL predefinito 'https://messages.cucumber.io/api/reports'.
- CUCUMBER_PUBLISH_REPORT_TOKEN: Il token di autorizzazione richiesto per pubblicare il report. Se questo token non è impostato, la funzione uscirà senza pubblicare il report.

Ecco un esempio delle configurazioni necessarie e dei campioni di codice per l'implementazione:

```javascript
import { v4 as uuidv4 } from 'uuid'
import { publishCucumberReport } from '@wdio/cucumber-framework';

export const config = {
    // ... Altre Opzioni di Configurazione
    cucumberOpts: {
        // ... Configurazione delle Opzioni Cucumber
        format: [
            ['message', `./reports/${uuidv4()}.ndjson`],
            ['json', './reports/test-report.json']
        ]
    },
    async onComplete() {
        await publishCucumberReport('./reports');
    }
}
```

Si prega di notare che `./reports/` è la directory dove verranno memorizzati i report `cucumber message`.

## Utilizzo di Serenity/JS

[Serenity/JS](https://serenity-js.org?pk_campaign=wdio8&pk_source=webdriver.io) è un framework open-source progettato per rendere i test di accettazione e regressione di sistemi software complessi più veloci, più collaborativi e più facili da scalare.

Per le suite di test WebdriverIO, Serenity/JS offre:
- [Reporting avanzato](https://serenity-js.org/handbook/reporting/?pk_campaign=wdio8&pk_source=webdriver.io) - Puoi utilizzare Serenity/JS
  come sostituto diretto di qualsiasi framework WebdriverIO integrato per produrre report di esecuzione dei test approfonditi e documentazione vivente del tuo progetto.
- [API del Pattern Screenplay](https://serenity-js.org/handbook/design/screenplay-pattern/?pk_campaign=wdio8&pk_source=webdriver.io) - Per rendere il tuo codice di test portatile e riutilizzabile tra progetti e team,
  Serenity/JS ti offre un [livello di astrazione](https://serenity-js.org/api/webdriverio?pk_campaign=wdio8&pk_source=webdriver.io) opzionale sopra le API native di WebdriverIO.
- [Librerie di Integrazione](https://serenity-js.org/api/core/?pk_campaign=wdio8&pk_source=webdriver.io) - Per suite di test che seguono il Pattern Screenplay,
  Serenity/JS fornisce anche librerie di integrazione opzionali per aiutarti a scrivere [test API](https://serenity-js.org/api/rest/?pk_campaign=wdio8&pk_source=webdriver.io),
  [gestire server locali](https://serenity-js.org/api/local-server/?pk_campaign=wdio8&pk_source=webdriver.io), [eseguire asserzioni](https://serenity-js.org/api/assertions/?pk_campaign=wdio8&pk_source=webdriver.io), e altro ancora!

![Serenity BDD Report Example](/img/serenity-bdd-reporter.png)

### Installazione di Serenity/JS

Per aggiungere Serenity/JS a un [progetto WebdriverIO esistente](https://webdriver.io/docs/gettingstarted), installa i seguenti moduli Serenity/JS da NPM:

```sh npm2yarn
npm install @serenity-js/{core,web,webdriverio,assertions,console-reporter,serenity-bdd} --save-dev
```

Ulteriori informazioni sui moduli Serenity/JS:
- [`@serenity-js/core`](https://serenity-js.org/api/core/?pk_campaign=wdio8&pk_source=webdriver.io)
- [`@serenity-js/web`](https://serenity-js.org/api/web/?pk_campaign=wdio8&pk_source=webdriver.io)
- [`@serenity-js/webdriverio`](https://serenity-js.org/api/webdriverio/?pk_campaign=wdio8&pk_source=webdriver.io)
- [`@serenity-js/assertions`](https://serenity-js.org/api/assertions/?pk_campaign=wdio8&pk_source=webdriver.io)
- [`@serenity-js/console-reporter`](https://serenity-js.org/api/console-reporter/?pk_campaign=wdio8&pk_source=webdriver.io)
- [`@serenity-js/serenity-bdd`](https://serenity-js.org/api/serenity-bdd/?pk_campaign=wdio8&pk_source=webdriver.io)

### Configurazione di Serenity/JS

Per abilitare l'integrazione con Serenity/JS, configura WebdriverIO come segue:

<Tabs>
<TabItem value="wdio-conf-typescript" label="TypeScript" default>

```typescript title="wdio.conf.ts"
import { WebdriverIOConfig } from '@serenity-js/webdriverio';

export const config: WebdriverIOConfig = {

    // Dica a WebdriverIO di utilizzare il framework Serenity/JS
    framework: '@serenity-js/webdriverio',

    // Configurazione di Serenity/JS
    serenity: {
        // Configura Serenity/JS per utilizzare l'adattatore appropriato per il tuo test runner
        runner: 'cucumber',
        // runner: 'mocha',
        // runner: 'jasmine',

        // Registra i servizi di reporting Serenity/JS, noti anche come "stage crew"
        crew: [
            // Opzionale, stampa i risultati dell'esecuzione dei test su output standard
            '@serenity-js/console-reporter',

            // Opzionale, produce report Serenity BDD e documentazione vivente (HTML)
            '@serenity-js/serenity-bdd',
            [ '@serenity-js/core:ArtifactArchiver', { outputDirectory: 'target/site/serenity' } ],

            // Opzionale, cattura automaticamente screenshot in caso di fallimento dell'interazione
            [ '@serenity-js/web:Photographer', { strategy: 'TakePhotosOfFailures' } ],
        ]
    },

    // Configura il tuo runner Cucumber
    cucumberOpts: {
        // vedi le opzioni di configurazione di Cucumber di seguito
    },


    // ... o il runner Jasmine
    jasmineOpts: {
        // vedi le opzioni di configurazione di Jasmine di seguito
    },

    // ... o il runner Mocha
    mochaOpts: {
        // vedi le opzioni di configurazione di Mocha di seguito
    },

    runner: 'local',

    // Qualsiasi altra configurazione WebdriverIO
};
```

</TabItem>
<TabItem value="wdio-conf-javascript" label="JavaScript">

```typescript title="wdio.conf.js"
export const config = {

    // Dica a WebdriverIO di utilizzare il framework Serenity/JS
    framework: '@serenity-js/webdriverio',

    // Configurazione di Serenity/JS
    serenity: {
        // Configura Serenity/JS per utilizzare l'adattatore appropriato per il tuo test runner
        runner: 'cucumber',
        // runner: 'mocha',
        // runner: 'jasmine',

        // Registra i servizi di reporting Serenity/JS, noti anche come "stage crew"
        crew: [
            '@serenity-js/console-reporter',
            '@serenity-js/serenity-bdd',
            [ '@serenity-js/core:ArtifactArchiver', { outputDirectory: 'target/site/serenity' } ],
            [ '@serenity-js/web:Photographer', { strategy: 'TakePhotosOfFailures' } ],
        ]
    },

    // Configura il tuo runner Cucumber
    cucumberOpts: {
        // vedi le opzioni di configurazione di Cucumber di seguito
    },


    // ... o il runner Jasmine
    jasmineOpts: {
        // vedi le opzioni di configurazione di Jasmine di seguito
    },

    // ... o il runner Mocha
    mochaOpts: {
        // vedi le opzioni di configurazione di Mocha di seguito
    },

    runner: 'local',

    // Qualsiasi altra configurazione WebdriverIO
};
```

</TabItem>
</Tabs>

Ulteriori informazioni su:
- [Opzioni di configurazione di Serenity/JS Cucumber](https://serenity-js.org/api/cucumber-adapter/interface/CucumberConfig/?pk_campaign=wdio8&pk_source=webdriver.io)
- [Opzioni di configurazione di Serenity/JS Jasmine](https://serenity-js.org/api/jasmine-adapter/interface/JasmineConfig/?pk_campaign=wdio8&pk_source=webdriver.io)
- [Opzioni di configurazione di Serenity/JS Mocha](https://serenity-js.org/api/mocha-adapter/interface/MochaConfig/?pk_campaign=wdio8&pk_source=webdriver.io)
- [File di configurazione WebdriverIO](configurationfile)

### Produzione di report Serenity BDD e documentazione vivente

[I report Serenity BDD e la documentazione vivente](https://serenity-bdd.github.io/docs/reporting/the_serenity_reports) sono generati da [Serenity BDD CLI](https://github.com/serenity-bdd/serenity-core/tree/main/serenity-cli),
un programma Java scaricato e gestito dal modulo [`@serenity-js/serenity-bdd`](https://serenity-js.org/api/serenity-bdd/?pk_campaign=wdio8&pk_source=webdriver.io).

Per produrre report Serenity BDD, la tua suite di test deve:
- scaricare il Serenity BDD CLI, chiamando `serenity-bdd update` che memorizza localmente il CLI `jar`
- produrre report intermedi Serenity BDD `.json`, registrando [`SerenityBDDReporter`](https://serenity-js.org/api/serenity-bdd/class/SerenityBDDReporter/?pk_campaign=wdio8&pk_source=webdriver.io) come da [istruzioni di configurazione](#configurazione-di-serenityjs)
- invocare il Serenity BDD CLI quando desideri produrre il report, chiamando `serenity-bdd run`

Il pattern utilizzato da tutti i [Modelli di Progetto Serenity/JS](https://serenity-js.org/handbook/project-templates/?pk_campaign=wdio8&pk_source=webdriver.io#webdriverio) si basa su:
- uno script NPM [`postinstall`](https://docs.npmjs.com/cli/v9/using-npm/scripts#life-cycle-operation-order) per scaricare il Serenity BDD CLI
- [`npm-failsafe`](https://www.npmjs.com/package/npm-failsafe) per eseguire il processo di reporting anche se la suite di test stessa è fallita (che è precisamente quando hai più bisogno di report di test...).
- [`rimraf`](https://www.npmjs.com/package/rimraf) come metodo comodo per rimuovere eventuali report di test rimasti dall'esecuzione precedente

```json title="package.json"
{
  "scripts": {
    "postinstall": "serenity-bdd update",
    "clean": "rimraf target",
    "test": "failsafe clean test:execute test:report",
    "test:execute": "wdio wdio.conf.ts",
    "test:report": "serenity-bdd run"
  }
}
```

Per saperne di più sul `SerenityBDDReporter`, consulta:
- istruzioni di installazione nella [documentazione di `@serenity-js/serenity-bdd`](https://serenity-js.org/api/serenity-bdd/?pk_campaign=wdio8&pk_source=webdriver.io),
- esempi di configurazione nei [documenti API di `SerenityBDDReporter`](https://serenity-js.org/api/serenity-bdd/class/SerenityBDDReporter/?pk_campaign=wdio8&pk_source=webdriver.io),
- [esempi di Serenity/JS su GitHub](https://github.com/serenity-js/serenity-js/tree/main/examples).

### Utilizzo delle API del Pattern Screenplay di Serenity/JS

Il [Pattern Screenplay](https://serenity-js.org/handbook/design/screenplay-pattern/?pk_campaign=wdio8&pk_source=webdriver.io) è un approccio innovativo, centrato sull'utente per scrivere test di accettazione automatizzati di alta qualità. Ti guida verso un uso efficace di livelli di astrazione, aiuta i tuoi scenari di test a catturare il gergo aziendale del tuo dominio e incoraggia buone abitudini di test e ingegneria del software nel tuo team.

Per impostazione predefinita, quando registri `@serenity-js/webdriverio` come tuo `framework` WebdriverIO,
Serenity/JS configura un [cast](https://serenity-js.org/api/core/class/Cast/?pk_campaign=wdio8&pk_source=webdriver.io) predefinito di [attori](https://serenity-js.org/api/core/class/Actor/?pk_campaign=wdio8&pk_source=webdriver.io),
dove ogni attore può:
- [`BrowseTheWebWithWebdriverIO`](https://serenity-js.org/api/webdriverio/class/BrowseTheWebWithWebdriverIO/?pk_campaign=wdio8&pk_source=webdriver.io)
- [`TakeNotes.usingAnEmptyNotepad()`](https://serenity-js.org/api/core/class/TakeNotes/?pk_campaign=wdio8&pk_source=webdriver.io)

Questo dovrebbe essere sufficiente per aiutarti a iniziare con l'introduzione di scenari di test che seguono il Pattern Screenplay anche in una suite di test esistente, ad esempio:

```typescript title="specs/example.spec.ts"
import { actorCalled } from '@serenity-js/core'
import { Navigate, Page } from '@serenity-js/web'
import { Ensure, equals } from '@serenity-js/assertions'

describe('My awesome website', () => {
    it('can have test scenarios that follow the Screenplay Pattern', async () => {
        await actorCalled('Alice').attemptsTo(
            Navigate.to(`https://webdriver.io`),
            Ensure.that(
                Page.current().title(),
                equals(`WebdriverIO · Next-gen browser and mobile automation test framework for Node.js | WebdriverIO`)
            ),
        )
    })

    it('can have non-Screenplay scenarios too', async () => {
        await browser.url('https://webdriver.io')
        await expect(browser)
            .toHaveTitle('WebdriverIO · Next-gen browser and mobile automation test framework for Node.js | WebdriverIO')
    })
})
```

Per saperne di più sul Pattern Screenplay, controlla:
- [Il Pattern Screenplay](https://serenity-js.org/handbook/design/screenplay-pattern/?pk_campaign=wdio8&pk_source=webdriver.io)
- [Test web con Serenity/JS](https://serenity-js.org/handbook/web-testing/?pk_campaign=wdio8&pk_source=webdriver.io)
- ["BDD in Action, Second Edition"](https://www.manning.com/books/bdd-in-action-second-edition)