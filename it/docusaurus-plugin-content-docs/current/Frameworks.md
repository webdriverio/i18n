---
id: frameworks
title: Framework
---

WebdriverIO Runner ha supporto integrato per [Mocha](http://mochajs.org/), [Jasmine](http://jasmine.github.io/) e [Cucumber.js](https://cucumber.io/). Puoi anche integrarlo con framework open source di terze parti, come [Serenity/JS](#using-serenityjs).

:::tip Integrare WebdriverIO con i framework di test
Per integrare WebdriverIO con un framework di test, hai bisogno di un pacchetto adattatore disponibile su NPM.
Nota che il pacchetto adattatore deve essere installato nella stessa posizione in cui è installato WebdriverIO.
Quindi, se hai installato WebdriverIO globalmente, assicurati di installare anche il pacchetto adattatore globalmente.
:::

Integrare WebdriverIO con un framework di test ti consente di accedere all'istanza WebDriver utilizzando la variabile globale `browser`
nei tuoi file di spec o definizioni di step.
Nota che WebdriverIO si occuperà anche di istanziare e terminare la sessione Selenium, quindi non devi farlo
tu stesso.

## Usare Mocha

Innanzitutto, installa il pacchetto adattatore da NPM:

```bash npm2yarn
npm install @wdio/mocha-framework --save-dev
```

Per impostazione predefinita, WebdriverIO fornisce una [libreria di asserzioni](assertion) integrata che puoi utilizzare subito:

```js
describe('my awesome website', () => {
    it('should do some assertions', async () => {
        await browser.url('https://webdriver.io')
        await expect(browser).toHaveTitle('WebdriverIO · Next-gen browser and mobile automation test framework for Node.js | WebdriverIO')
    })
})
```

WebdriverIO supporta le interfacce `BDD` (predefinita), `TDD` e `QUnit` di Mocha [interfaces](https://mochajs.org/#interfaces).

Se desideri scrivere le tue specifiche in stile TDD, imposta la proprietà `ui` nella configurazione `mochaOpts` su `tdd`. Ora i tuoi file di test dovrebbero essere scritti come segue:

```js
suite('my awesome website', () => {
    test('should do some assertions', async () => {
        await browser.url('https://webdriver.io')
        await expect(browser).toHaveTitle('WebdriverIO · Next-gen browser and mobile automation test framework for Node.js | WebdriverIO')
    })
})
```

Se desideri definire altre impostazioni specifiche di Mocha, puoi farlo con la chiave `mochaOpts` nel tuo file di configurazione. Un elenco di tutte le opzioni può essere trovato sul [sito web del progetto Mocha](https://mochajs.org/api/mocha).

__Nota:__ WebdriverIO non supporta l'uso obsoleto dei callback `done` in Mocha:

```js
it('should test something', (done) => {
    done() // lancia "done is not a function"
})
```

### Opzioni Mocha

Le seguenti opzioni possono essere applicate nel tuo `wdio.conf.js` per configurare l'ambiente Mocha. __Nota:__ non tutte le opzioni sono supportate, ad esempio l'applicazione dell'opzione `parallel` causerà un errore poiché il test runner WDIO ha un proprio modo per eseguire i test in parallelo. Puoi passare queste opzioni del framework come argomenti, ad esempio:

```sh
wdio run wdio.conf.ts --mochaOpts.grep "my test" --mochaOpts.bail --no-mochaOpts.checkLeaks
```

Questo passerà le seguenti opzioni Mocha:

```ts
{
    grep: ['my-test'],
    bail: true
    checkLeacks: false
}
```

Sono supportate le seguenti opzioni Mocha:

#### require
L'opzione `require` è utile quando si desidera aggiungere o estendere alcune funzionalità di base (opzione del framework WebdriverIO).

Tipo: `string|string[]`<br />
Predefinito: `[]`

#### compilers
Usa il/i modulo/i dato/i per compilare i file. I compilatori verranno inclusi prima dei requisiti (opzione del framework WebdriverIO).

Tipo: `string[]`<br />
Predefinito: `[]`

#### allowUncaught
Propaga errori non catturati.

Tipo: `boolean`<br />
Predefinito: `false`

#### bail
Termina dopo il primo fallimento del test.

Tipo: `boolean`<br />
Predefinito: `false`

#### checkLeaks
Controlla eventuali perdite di variabili globali.

Tipo: `boolean`<br />
Predefinito: `false`

#### delay
Ritarda l'esecuzione della suite principale.

Tipo: `boolean`<br />
Predefinito: `false`

#### fgrep
Filtro test con la stringa data.

Tipo: `string`<br />
Predefinito: `null`

#### forbidOnly
I test contrassegnati solo con `only` falliscono la suite.

Tipo: `boolean`<br />
Predefinito: `false`

#### forbidPending
I test in sospeso falliscono la suite.

Tipo: `boolean`<br />
Predefinito: `false`

#### fullTrace
Traccia completa dello stack in caso di fallimento.

Tipo: `boolean`<br />
Predefinito: `false`

#### global
Variabili previste nell'ambito globale.

Tipo: `string[]`<br />
Predefinito: `[]`

#### grep
Filtro test con l'espressione regolare data.

Tipo: `RegExp|string`<br />
Predefinito: `null`

#### invert
Inverte le corrispondenze del filtro del test.

Tipo: `boolean`<br />
Predefinito: `false`

#### retries
Numero di volte per riprovare i test falliti.

Tipo: `number`<br />
Predefinito: `0`

#### timeout
Valore di soglia del timeout (in ms).

Tipo: `number`<br />
Predefinito: `30000`

## Usare Jasmine

Innanzitutto, installa il pacchetto adattatore da NPM:

```bash npm2yarn
npm install @wdio/jasmine-framework --save-dev
```

Puoi quindi configurare il tuo ambiente Jasmine impostando una proprietà `jasmineOpts` nella tua configurazione. Un elenco di tutte le opzioni può essere trovato sul [sito web del progetto Jasmine](https://jasmine.github.io/api/3.5/Configuration.html).

### Opzioni Jasmine

Le seguenti opzioni possono essere applicate nel tuo `wdio.conf.js` per configurare il tuo ambiente Jasmine utilizzando la proprietà `jasmineOpts`. Per ulteriori informazioni su queste opzioni di configurazione, consulta la [documentazione di Jasmine](https://jasmine.github.io/api/edge/Configuration). Puoi passare queste opzioni del framework come argomenti, ad esempio:

```sh
wdio run wdio.conf.ts --jasmineOpts.grep "my test" --jasmineOpts.failSpecWithNoExpectations --no-jasmineOpts.random
```

Questo passerà le seguenti opzioni Mocha:

```ts
{
    grep: ['my-test'],
    bail: true
    checkLeacks: false
}
```

Sono supportate le seguenti opzioni Jasmine:

#### defaultTimeoutInterval
Intervallo di timeout predefinito per le operazioni Jasmine.

Tipo: `number`<br />
Predefinito: `60000`

#### helpers
Array di percorsi di file (e glob) relativi a spec_dir da includere prima delle specifiche jasmine.

Tipo: `string[]`<br />
Predefinito: `[]`

#### requires
L'opzione `requires` è utile quando si desidera aggiungere o estendere alcune funzionalità di base.

Tipo: `string[]`<br />
Predefinito: `[]`

#### random
Se randomizzare l'ordine di esecuzione delle spec.

Tipo: `boolean`<br />
Predefinito: `true`

#### seed
Seme da utilizzare come base per la randomizzazione. Null fa sì che il seme venga determinato casualmente all'inizio dell'esecuzione.

Tipo: `Function`<br />
Predefinito: `null`

#### failSpecWithNoExpectations
Se far fallire la spec se non ha eseguito aspettative. Per impostazione predefinita, una spec che non ha eseguito aspettative viene segnalata come superata. Impostando questo su true, tale spec verrà segnalata come fallita.

Tipo: `boolean`<br />
Predefinito: `false`

#### oneFailurePerSpec
Se far sì che le spec abbiano un solo fallimento di aspettativa.

Tipo: `boolean`<br />
Predefinito: `false`

#### specFilter
Funzione da utilizzare per filtrare le spec.

Tipo: `Function`<br />
Predefinito: `(spec) => true`

#### grep
Esegui solo i test che corrispondono a questa stringa o regexp. (Applicabile solo se non è impostata una funzione `specFilter` personalizzata)

Tipo: `string|Regexp`<br />
Predefinito: `null`

#### invertGrep
Se vero, inverte i test corrispondenti ed esegue solo i test che non corrispondono all'espressione utilizzata in `grep`. (Applicabile solo se non è impostata una funzione `specFilter` personalizzata)

Tipo: `boolean`<br />
Predefinito: `false`

## Usare Cucumber

Innanzitutto, installa il pacchetto adattatore da NPM:

```bash npm2yarn
npm install @wdio/cucumber-framework --save-dev
```

Se vuoi usare Cucumber, imposta la proprietà `framework` su `cucumber` aggiungendo `framework: 'cucumber'` al [file di configurazione](configurationfile).

Le opzioni per Cucumber possono essere fornite nel file di configurazione con `cucumberOpts`. Consulta l'elenco completo delle opzioni [qui](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-cucumber-framework#cucumberopts-options).

Per iniziare rapidamente con Cucumber, dai un'occhiata al nostro progetto [`cucumber-boilerplate`](https://github.com/webdriverio/cucumber-boilerplate) che include tutte le definizioni di step di cui hai bisogno per iniziare, e potrai scrivere file di funzionalità fin da subito.

### Opzioni Cucumber

Le seguenti opzioni possono essere applicate nel tuo `wdio.conf.js` per configurare il tuo ambiente Cucumber utilizzando la proprietà `cucumberOpts`:

:::tip Regolazione delle opzioni tramite la riga di comando
Le `cucumberOpts`, come i `tags` personalizzati per filtrare i test, possono essere specificate tramite la riga di comando. Questo si ottiene utilizzando il formato `cucumberOpts.{optionName}="value"`.

Ad esempio, se vuoi eseguire solo i test che sono taggati con `@smoke`, puoi usare il seguente comando:

```sh
# Quando vuoi eseguire solo i test che hanno il tag "@smoke"
npx wdio run ./wdio.conf.js --cucumberOpts.tags="@smoke"
npx wdio run ./wdio.conf.js --cucumberOpts.name="some scenario name" --cucumberOpts.failFast
```

Questo comando imposta l'opzione `tags` in `cucumberOpts` su `@smoke`, assicurando che vengano eseguiti solo i test con questo tag.

:::

#### backtrace
Mostra la traccia completa per gli errori.

Tipo: `Boolean`<br />
Predefinito: `true`

#### requireModule
Richiedi moduli prima di richiedere eventuali file di supporto.

Tipo: `string[]`<br />
Predefinito: `[]`<br />
Esempio:

```js
cucumberOpts: {
    requireModule: ['@babel/register']
    // oppure
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
Interrompi l'esecuzione al primo fallimento.

Tipo: `boolean`<br />
Predefinito: `false`

#### name
Esegui solo gli scenari con nome che corrisponde all'espressione (ripetibile).

Tipo: `RegExp[]`<br />
Predefinito: `[]`

#### require
Richiedi file contenenti le tue definizioni di step prima di eseguire le funzionalità. Puoi anche specificare un glob per le tue definizioni di step.

Tipo: `string[]`<br />
Predefinito: `[]`
Esempio:

```js
cucumberOpts: {
    require: [path.join(__dirname, 'step-definitions', 'my-steps.js')]
}
```

#### import
Percorsi verso il tuo codice di supporto, per ESM.

Tipo: `String[]`<br />
Predefinito: `[]`
Esempio:

```js
cucumberOpts: {
    import: [path.join(__dirname, 'step-definitions', 'my-steps.js')]
}
```

#### strict
Fallisci se ci sono step non definiti o in sospeso.

Tipo: `boolean`<br />
Predefinito: `false`

#### tags
Esegui solo le funzionalità o gli scenari con tag che corrispondono all'espressione.
Si prega di consultare la [documentazione di Cucumber](https://docs.cucumber.io/cucumber/api/#tag-expressions) per maggiori dettagli.

Tipo: `String`<br />
Predefinito: ``

#### timeout
Timeout in millisecondi per le definizioni di step.

Tipo: `Number`<br />
Predefinito: `30000`

#### retry
Specifica il numero di volte per riprovare i casi di test falliti.

Tipo: `Number`<br />
Predefinito: `0`

#### retryTagFilter
Riprova solo le funzionalità o gli scenari con tag che corrispondono all'espressione (ripetibile). Questa opzione richiede che sia specificato '--retry'.

Tipo: `RegExp`

#### language
Lingua predefinita per i tuoi file di funzionalità

Tipo: `String`<br />
Predefinito: `en`

#### order
Esegui i test in ordine definito / casuale

Tipo: `String`<br />
Predefinito: `defined`

#### format
Nome e percorso del file di output del formattatore da utilizzare.
WebdriverIO supporta principalmente solo i [Formattatori](https://github.com/cucumber/cucumber-js/blob/main/docs/formatters.md) che scrivono output su un file.

Tipo: `string[]`<br />

#### formatOptions
Opzioni da fornire ai formattatori

Tipo: `object`<br />

#### tagsInTitle
Aggiungi tag cucumber al nome della funzionalità o dello scenario

Tipo: `Boolean`<br />
Predefinito: `false`

***Si noti che questa è un'opzione specifica di @wdio/cucumber-framework e non riconosciuta da cucumber-js stesso***<br/>

#### ignoreUndefinedDefinitions
Tratta le definizioni non definite come avvisi.

Tipo: `Boolean`<br />
Predefinito: `false`

***Si noti che questa è un'opzione specifica di @wdio/cucumber-framework e non riconosciuta da cucumber-js stesso***<br/>

#### failAmbiguousDefinitions
Tratta le definizioni ambigue come errori.

Tipo: `Boolean`<br />
Predefinito: `false`

***Si noti che questa è un'opzione specifica di @wdio/cucumber-framework e non riconosciuta da cucumber-js stesso***<br/>

#### tagExpression
Esegui solo le funzionalità o gli scenari con tag che corrispondono all'espressione.
Si prega di consultare la [documentazione di Cucumber](https://docs.cucumber.io/cucumber/api/#tag-expressions) per maggiori dettagli.

Tipo: `String`<br />
Predefinito: ``

***Si noti che questa opzione sarà deprecata in futuro. Utilizzare invece la proprietà di configurazione [`tags`](#tags)***

#### profile
Specifica il profilo da utilizzare.

Tipo: `string[]`<br />
Predefinito: `[]`

***Si prega di notare che solo valori specifici (worldParameters, name, retryTagFilter) sono supportati all'interno dei profili, poiché `cucumberOpts` ha la precedenza. Inoltre, quando si utilizza un profilo, assicurarsi che i valori menzionati non siano dichiarati all'interno di `cucumberOpts`.***

### Saltare i test in cucumber

Tieni presente che se vuoi saltare un test utilizzando le normali capacità di filtraggio dei test di cucumber disponibili in `cucumberOpts`, lo farai per tutti i browser e dispositivi configurati nelle capabilities. Per poter saltare scenari solo per combinazioni di capabilities specifiche senza che sia necessario avviare una sessione, webdriverio fornisce la seguente sintassi di tag specifica per cucumber:

`@skip([condition])`

dove condition è una combinazione opzionale di proprietà di capabilities con i loro valori che quando **tutti** corrispondono con causa lo scenario o la funzionalità taggata da saltare. Naturalmente puoi aggiungere diversi tag a scenari e funzionalità per saltare test in diverse condizioni.

Puoi anche usare l'annotazione '@skip' per saltare i test senza modificare `tagExpression'. In questo caso i test saltati verranno visualizzati nel report di test.

Ecco alcuni esempi di questa sintassi:
- `@skip` o `@skip()`: salterà sempre l'elemento taggato
- `@skip(browserName="chrome")`: il test non sarà eseguito sui browser chrome.
- `@skip(browserName="firefox";platformName="linux")`: salterà il test nelle esecuzioni su firefox su linux.
- `@skip(browserName=["chrome","firefox"])`: gli elementi taggati saranno saltati sia per i browser chrome che firefox.
- `@skip(browserName=/i.*explorer/)`: le capabilities con browser che corrispondono al regexp saranno saltate (come `iexplorer`, `internet explorer`, `internet-explorer`, ...).

### Importare Helper per la Definizione degli Step

Per utilizzare helper per la definizione degli step come `Given`, `When` o `Then` o hooks, devi importarli da `@cucumber/cucumber`, ad esempio così:

```js
import { Given, When, Then } from '@cucumber/cucumber'
```

Ora, se usi già Cucumber per altri tipi di test non correlati a WebdriverIO per i quali usi una versione specifica, devi importare questi helper nei tuoi test e2e dal pacchetto WebdriverIO Cucumber, ad esempio:

```js
import { Given, When, Then, world, context } from '@wdio/cucumber-framework'
```

Questo garantisce che tu usi gli helper giusti all'interno del framework WebdriverIO e ti consente di utilizzare una versione indipendente di Cucumber per altri tipi di test.

### Pubblicazione del Report

Cucumber fornisce una funzionalità per pubblicare i report dei test su `https://reports.cucumber.io/`, che può essere controllata impostando il flag `publish` in `cucumberOpts` o configurando la variabile di ambiente `CUCUMBER_PUBLISH_TOKEN`. Tuttavia, quando utilizzi `WebdriverIO` per l'esecuzione dei test, c'è una limitazione con questo approccio. Aggiorna i report separatamente per ogni file di funzionalità, rendendo difficile visualizzare un report consolidato.

Per superare questa limitazione, abbiamo introdotto un metodo basato su promesse chiamato `publishCucumberReport` all'interno di `@wdio/cucumber-framework`. Questo metodo dovrebbe essere chiamato nell'hook `onComplete`, che è il posto ottimale per invocarlo. `publishCucumberReport` richiede l'input della directory del report dove sono archiviati i report dei messaggi cucumber.

Puoi generare report `cucumber message` configurando l'opzione `format` nelle tue `cucumberOpts`. È altamente consigliato fornire un nome di file dinamico all'interno dell'opzione di formato `cucumber message` per evitare la sovrascrittura dei report e garantire che ogni esecuzione di test sia accuratamente registrata.

Prima di utilizzare questa funzione, assicurati di impostare le seguenti variabili di ambiente:
- CUCUMBER_PUBLISH_REPORT_URL: L'URL dove vuoi pubblicare il report Cucumber. Se non fornito, verrà utilizzato l'URL predefinito 'https://messages.cucumber.io/api/reports'.
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

Si noti che `./reports/` è la directory in cui verranno archiviati i report `cucumber message`.

## Usare Serenity/JS

[Serenity/JS](https://serenity-js.org?pk_campaign=wdio8&pk_source=webdriver.io) è un framework open source progettato per rendere i test di accettazione e regressione di sistemi software complessi più veloci, più collaborativi e più facili da scalare.

Per le suite di test WebdriverIO, Serenity/JS offre:
- [Reporting Avanzato](https://serenity-js.org/handbook/reporting/?pk_campaign=wdio8&pk_source=webdriver.io) - Puoi usare Serenity/JS
  come sostituto diretto di qualsiasi framework WebdriverIO integrato per produrre report di esecuzione dei test approfonditi e documentazione viva del tuo progetto.
- [API del Pattern Screenplay](https://serenity-js.org/handbook/design/screenplay-pattern/?pk_campaign=wdio8&pk_source=webdriver.io) - Per rendere il tuo codice di test portabile e riutilizzabile tra progetti e team,
  Serenity/JS ti offre un [livello di astrazione](https://serenity-js.org/api/webdriverio?pk_campaign=wdio8&pk_source=webdriver.io) opzionale sopra le API native di WebdriverIO.
- [Librerie di Integrazione](https://serenity-js.org/api/core/?pk_campaign=wdio8&pk_source=webdriver.io) - Per le suite di test che seguono il Pattern Screenplay,
  Serenity/JS fornisce anche librerie di integrazione opzionali per aiutarti a scrivere [test API](https://serenity-js.org/api/rest/?pk_campaign=wdio8&pk_source=webdriver.io),
  [gestire server locali](https://serenity-js.org/api/local-server/?pk_campaign=wdio8&pk_source=webdriver.io), [eseguire asserzioni](https://serenity-js.org/api/assertions/?pk_campaign=wdio8&pk_source=webdriver.io), e altro ancora!

![Esempio di Report Serenity BDD](/img/serenity-bdd-reporter.png)

### Installare Serenity/JS

Per aggiungere Serenity/JS a un [progetto WebdriverIO esistente](https://webdriver.io/docs/gettingstarted), installa i seguenti moduli Serenity/JS da NPM:

```sh npm2yarn
npm install @serenity-js/{core,web,webdriverio,assertions,console-reporter,serenity-bdd} --save-dev
```

Scopri di più sui moduli Serenity/JS:
- [`@serenity-js/core`](https://serenity-js.org/api/core/?pk_campaign=wdio8&pk_source=webdriver.io)
- [`@serenity-js/web`](https://serenity-js.org/api/web/?pk_campaign=wdio8&pk_source=webdriver.io)
- [`@serenity-js/webdriverio`](https://serenity-js.org/api/webdriverio/?pk_campaign=wdio8&pk_source=webdriver.io)
- [`@serenity-js/assertions`](https://serenity-js.org/api/assertions/?pk_campaign=wdio8&pk_source=webdriver.io)
- [`@serenity-js/console-reporter`](https://serenity-js.org/api/console-reporter/?pk_campaign=wdio8&pk_source=webdriver.io)
- [`@serenity-js/serenity-bdd`](https://serenity-js.org/api/serenity-bdd/?pk_campaign=wdio8&pk_source=webdriver.io)

### Configurare Serenity/JS

Per abilitare l'integrazione con Serenity/JS, configura WebdriverIO come segue:

<Tabs>
<TabItem value="wdio-conf-typescript" label="TypeScript" default>

```typescript title="wdio.conf.ts"
import { WebdriverIOConfig } from '@serenity-js/webdriverio';

export const config: WebdriverIOConfig = {

    // Indica a WebdriverIO di utilizzare il framework Serenity/JS
    framework: '@serenity-js/webdriverio',

    // Configurazione Serenity/JS
    serenity: {
        // Configura Serenity/JS per utilizzare l'adattatore appropriato per il tuo test runner
        runner: 'cucumber',
        // runner: 'mocha',
        // runner: 'jasmine',

        // Registra i servizi di reporting Serenity/JS, noti come "stage crew"
        crew: [
            // Opzionale, stampa i risultati dell'esecuzione dei test sullo standard output
            '@serenity-js/console-reporter',

            // Opzionale, produce report Serenity BDD e documentazione viva (HTML)
            '@serenity-js/serenity-bdd',
            [ '@serenity-js/core:ArtifactArchiver', { outputDirectory: 'target/site/serenity' } ],

            // Opzionale, acquisisce automaticamente screenshot in caso di fallimento dell'interazione
            [ '@serenity-js/web:Photographer', { strategy: 'TakePhotosOfFailures' } ],
        ]
    },

    // Configura il tuo runner Cucumber
    cucumberOpts: {
        // vedi le opzioni di configurazione Cucumber sotto
    },


    // ... o il runner Jasmine
    jasmineOpts: {
        // vedi le opzioni di configurazione Jasmine sotto
    },

    // ... o il runner Mocha
    mochaOpts: {
        // vedi le opzioni di configurazione Mocha sotto
    },

    runner: 'local',

    // Qualsiasi altra configurazione WebdriverIO
};
```

</TabItem>
<TabItem value="wdio-conf-javascript" label="JavaScript">

```typescript title="wdio.conf.js"
export const config = {

    // Indica a WebdriverIO di utilizzare il framework Serenity/JS
    framework: '@serenity-js/webdriverio',

    // Configurazione Serenity/JS
    serenity: {
        // Configura Serenity/JS per utilizzare l'adattatore appropriato per il tuo test runner
        runner: 'cucumber',
        // runner: 'mocha',
        // runner: 'jasmine',

        // Registra i servizi di reporting Serenity/JS, noti come "stage crew"
        crew: [
            '@serenity-js/console-reporter',
            '@serenity-js/serenity-bdd',
            [ '@serenity-js/core:ArtifactArchiver', { outputDirectory: 'target/site/serenity' } ],
            [ '@serenity-js/web:Photographer', { strategy: 'TakePhotosOfFailures' } ],
        ]
    },

    // Configura il tuo runner Cucumber
    cucumberOpts: {
        // vedi le opzioni di configurazione Cucumber sotto
    },


    // ... o il runner Jasmine
    jasmineOpts: {
        // vedi le opzioni di configurazione Jasmine sotto
    },

    // ... o il runner Mocha
    mochaOpts: {
        // vedi le opzioni di configurazione Mocha sotto
    },

    runner: 'local',

    // Qualsiasi altra configurazione WebdriverIO
};
```

</TabItem>
</Tabs>

Scopri di più su:
- [Opzioni di configurazione Cucumber di Serenity/JS](https://serenity-js.org/api/cucumber-adapter/interface/CucumberConfig/?pk_campaign=wdio8&pk_source=webdriver.io)
- [Opzioni di configurazione Jasmine di Serenity/JS](https://serenity-js.org/api/jasmine-adapter/interface/JasmineConfig/?pk_campaign=wdio8&pk_source=webdriver.io)
- [Opzioni di configurazione Mocha di Serenity/JS](https://serenity-js.org/api/mocha-adapter/interface/MochaConfig/?pk_campaign=wdio8&pk_source=webdriver.io)
- [File di configurazione WebdriverIO](configurationfile)

### Produrre report Serenity BDD e documentazione viva

I [report Serenity BDD e la documentazione viva](https://serenity-bdd.github.io/docs/reporting/the_serenity_reports) sono generati da [Serenity BDD CLI](https://github.com/serenity-bdd/serenity-core/tree/main/serenity-cli),
un programma Java scaricato e gestito dal modulo [`@serenity-js/serenity-bdd`](https://serenity-js.org/api/serenity-bdd/?pk_campaign=wdio8&pk_source=webdriver.io).

Per produrre report Serenity BDD, la tua suite di test deve:
- scaricare Serenity BDD CLI, chiamando `serenity-bdd update` che memorizza nella cache il CLI `jar` localmente
- produrre report Serenity BDD `.json` intermedi, registrando [`SerenityBDDReporter`](https://serenity-js.org/api/serenity-bdd/class/SerenityBDDReporter/?pk_campaign=wdio8&pk_source=webdriver.io) come da [istruzioni di configurazione](#configurare-serenityjs)
- invocare Serenity BDD CLI quando vuoi produrre il report, chiamando `serenity-bdd run`

Il pattern utilizzato da tutti i [Modelli di Progetto Serenity/JS](https://serenity-js.org/handbook/project-templates/?pk_campaign=wdio8&pk_source=webdriver.io#webdriverio) si basa
sull'utilizzo di:
- uno script NPM [`postinstall`](https://docs.npmjs.com/cli/v9/using-npm/scripts#life-cycle-operation-order) per scaricare Serenity BDD CLI
- [`npm-failsafe`](https://www.npmjs.com/package/npm-failsafe) per eseguire il processo di reporting anche se la suite di test stessa è fallita (che è precisamente quando hai più bisogno di report di test...).
- [`rimraf`](https://www.npmjs.com/package/rimraf) come metodo conveniente per rimuovere eventuali report di test residui dall'esecuzione precedente

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
- [esempi Serenity/JS su GitHub](https://github.com/serenity-js/serenity-js/tree/main/examples).

### Utilizzare le API del Pattern Screenplay di Serenity/JS

Il [Pattern Screenplay](https://serenity-js.org/handbook/design/screenplay-pattern/?pk_campaign=wdio8&pk_source=webdriver.io) è un approccio innovativo e centrato sull'utente alla scrittura di test di accettazione automatizzati di alta qualità. Ti guida verso un uso efficace dei livelli di astrazione,
aiuta i tuoi scenari di test a catturare il gergo aziendale del tuo dominio e incoraggia buone abitudini di test e ingegneria del software nel tuo team.

Per impostazione predefinita, quando registri `@serenity-js/webdriverio` come tuo `framework` WebdriverIO,
Serenity/JS configura un [cast](https://serenity-js.org/api/core/class/Cast/?pk_campaign=wdio8&pk_source=webdriver.io) predefinito di [attori](https://serenity-js.org/api/core/class/Actor/?pk_campaign=wdio8&pk_source=webdriver.io),
dove ogni attore può:
- [`BrowseTheWebWithWebdriverIO`](https://serenity-js.org/api/webdriverio/class/BrowseTheWebWithWebdriverIO/?pk_campaign=wdio8&pk_source=webdriver.io)
- [`TakeNotes.usingAnEmptyNotepad()`](https://serenity-js.org/api/core/class/TakeNotes/?pk_campaign=wdio8&pk_source=webdriver.io)

Questo dovrebbe essere sufficiente per aiutarti a iniziare a introdurre scenari di test che seguono il Pattern Screenplay anche in una suite di test esistente, ad esempio:

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

Per saperne di più sul Pattern Screenplay, consulta:
- [Il Pattern Screenplay](https://serenity-js.org/handbook/design/screenplay-pattern/?pk_campaign=wdio8&pk_source=webdriver.io)
- [Test web con Serenity/JS](https://serenity-js.org/handbook/web-testing/?pk_campaign=wdio8&pk_source=webdriver.io)
- ["BDD in Action, Second Edition"](https://www.manning.com/books/bdd-in-action-second-edition)