---
id: frameworks
title: Framework
description: "Configura Mocha, Jasmine o Cucumber.js come framework di test per il testrunner WDIO, oppure integra framework di terze parti come Serenity/JS."
---

WebdriverIO Runner ha il supporto integrato per [Mocha](http://mochajs.org/), [Jasmine](http://jasmine.github.io/) e [Cucumber.js](https://cucumber.io/). Puoi anche integrarlo con framework open-source di terze parti, come [Serenity/JS](#using-serenityjs).

:::tip Integrare WebdriverIO con i framework di test
Per integrare WebdriverIO con un framework di test, hai bisogno di un pacchetto adattatore disponibile su NPM.
Nota che il pacchetto adattatore deve essere installato nella stessa posizione in cui è installato WebdriverIO.
Quindi, se hai installato WebdriverIO globalmente, assicurati di installare anche il pacchetto adattatore globalmente.
:::

L'integrazione di WebdriverIO con un framework di test ti permette di accedere all'istanza WebDriver utilizzando la variabile globale `browser`
nei tuoi file spec o nelle definizioni degli step.
Nota che WebdriverIO si occuperà anche di istanziare e terminare la sessione Selenium, quindi non devi farlo
tu stesso.

## Utilizzo di Mocha

Per prima cosa, installa il pacchetto adattatore da NPM:

```bash npm2yarn
npm install @wdio/mocha-framework --save-dev
```

Per impostazione predefinita WebdriverIO fornisce una [libreria di asserzioni](assertion) integrata che puoi utilizzare subito:

```js
describe('my awesome website', () => {
    it('should do some assertions', async () => {
        await browser.url('https://webdriver.io')
        await expect(browser).toHaveTitle('WebdriverIO · Next-gen browser and mobile automation test framework for Node.js | WebdriverIO')
    })
})
```

WebdriverIO v10 include [Mocha 12](https://mochajs.org/) e supporta le [interfacce](https://mochajs.org/#interfaces) `BDD` (predefinita), `TDD` e `QUnit` di Mocha.

Se preferisci scrivere le tue spec in stile TDD, imposta la proprietà `ui` nella configurazione `mochaOpts` su `tdd`. Ora i tuoi file di test dovrebbero essere scritti così:

```js
suite('my awesome website', () => {
    test('should do some assertions', async () => {
        await browser.url('https://webdriver.io')
        await expect(browser).toHaveTitle('WebdriverIO · Next-gen browser and mobile automation test framework for Node.js | WebdriverIO')
    })
})
```

Se vuoi definire altre impostazioni specifiche di Mocha, puoi farlo con la chiave `mochaOpts` nel tuo file di configurazione. Un elenco di tutte le opzioni è disponibile sul [sito web del progetto Mocha](https://mochajs.org/api/mocha).

__Nota:__ WebdriverIO non supporta l'utilizzo deprecato delle callback `done` in Mocha:

```js
it('should test something', (done) => {
    done() // throws "done is not a function"
})
```

### Opzioni di Mocha

Le seguenti opzioni possono essere applicate nel tuo `wdio.conf.js` per configurare l'ambiente Mocha. __Nota:__ non tutte le opzioni di Mocha sono supportate. `parallel` appartiene ancora al pool di worker di Mocha e qui genererà un errore: il testrunner WDIO parallelizza già le spec tra capabilities e worker. Inoltre, la CLI di Mocha 12 è passata da yargs a `util.parseArgs` di Node; ciò riguarda solo un'invocazione diretta di `mocha`, non le `mochaOpts` passate tramite `wdio`. Puoi passare queste opzioni del framework come argomenti, ad esempio:

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

Sono supportate le seguenti opzioni di Mocha:

#### require

<Option type="string|string[]" default="[]">

L'opzione `require` è utile quando vuoi aggiungere o estendere alcune funzionalità di base (opzione del framework WebdriverIO).

</Option>

#### allowUncaught

<Option type="boolean" default="false">

Propaga gli errori non gestiti.

</Option>

#### bail

<Option type="boolean" default="false">

Interrompe dopo il primo test fallito.

</Option>

#### checkLeaks

<Option type="boolean" default="false">

Verifica la presenza di variabili globali non dichiarate (leak).

</Option>

#### delay

<Option type="boolean" default="false">

Ritarda l'esecuzione della suite radice.

</Option>

#### failHookAffectedTests

<Option type="boolean" default="true">

Segnala come fallimento ogni test saltato a causa di un hook `before` o `beforeEach` fallito. WebdriverIO abilita questa opzione affinché un hook di setup non funzionante sia visibile su ogni spec che ha saltato. Impostala su `false` per segnalare solo l'hook.

</Option>

#### fgrep

<Option type="string" default="null">

Filtra i test in base alla stringa specificata.

</Option>

#### forbidOnly

<Option type="boolean" default="false">

I test contrassegnati con `only` fanno fallire la suite.

</Option>

#### forbidPending

<Option type="boolean" default="false">

I test in sospeso fanno fallire la suite.

</Option>

#### fullTrace

<Option type="boolean" default="false">

Stacktrace completo in caso di fallimento.

</Option>

#### global

<Option type="string[]" default="[]">

Variabili attese nello scope globale.

</Option>

#### grep

<Option type="RegExp|string" default="null">

Filtra i test in base all'espressione regolare specificata. Mocha 12 accetta i flag RegExp moderni in questo filtro (ad esempio `s` o `d`).

</Option>

#### invert

<Option type="boolean" default="false">

Inverte le corrispondenze del filtro dei test.

</Option>

#### retries

<Option type="number" default="0">

Numero di tentativi per ripetere i test falliti.

</Option>

#### timeout

<Option type="number" default="30000">

Valore della soglia di timeout (in ms).

</Option>

## Utilizzo di Jasmine

Per prima cosa, installa il pacchetto adattatore da NPM:

```bash npm2yarn
npm install @wdio/jasmine-framework --save-dev
```

Puoi quindi configurare l'ambiente Jasmine impostando una proprietà `jasmineOpts` nella tua configurazione. Un elenco di tutte le opzioni è disponibile sul [sito web del progetto Jasmine](https://jasmine.github.io/api/edge/Configuration.html).

### Opzioni di Jasmine

Le seguenti opzioni possono essere applicate nel tuo `wdio.conf.js` per configurare l'ambiente Jasmine utilizzando la proprietà `jasmineOpts`. Per maggiori informazioni su queste opzioni di configurazione, consulta la [documentazione di Jasmine](https://jasmine.github.io/api/edge/Configuration). Puoi passare queste opzioni del framework come argomenti, ad esempio:

```sh
wdio run wdio.conf.ts --jasmineOpts.grep "my test" --jasmineOpts.failSpecWithNoExpectations --no-jasmineOpts.random
```

Questo passerà le seguenti opzioni di Jasmine:

```ts
{
    grep: 'my test',
    failSpecWithNoExpectations: true,
    random: false
}
```

Sono supportate le seguenti opzioni di Jasmine:

#### defaultTimeoutInterval

<Option type="number" default="60000">

Intervallo di timeout predefinito per le operazioni di Jasmine.

</Option>

#### helpers

<Option type="string[]" default="[]">

Array di percorsi di file (e glob) relativi a spec_dir da includere prima delle spec di Jasmine.

</Option>

#### requires

<Option type="string[]" default="[]">

L'opzione `requires` è utile quando vuoi aggiungere o estendere alcune funzionalità di base.

</Option>

#### random

<Option type="boolean" default="false">

Se rendere casuale l'ordine di esecuzione delle spec. Il valore predefinito di Jasmine è `true`, ma WebdriverIO esegue le spec in ordine a meno che tu non imposti questa opzione.

</Option>

#### seed

<Option type="Function" default="null">

Seed da utilizzare come base per la randomizzazione. Null fa sì che il seed venga determinato casualmente all'inizio dell'esecuzione.

</Option>

#### failSpecWithNoExpectations

<Option type="boolean" default="false">

Se far fallire la spec quando non ha eseguito alcuna expectation. Per impostazione predefinita, una spec che non ha eseguito expectation viene segnalata come superata. Impostando questa opzione su true, tale spec verrà segnalata come fallita.

</Option>

#### oneFailurePerSpec

<Option type="boolean" default="false">

Interrompe una spec alla sua prima expectation fallita. Un matcher sincrono fallito interrompe immediatamente la spec, mentre un matcher asincrono atteso con await la interrompe quando la sua promise si risolve. Le altre spec continuano a essere eseguite.

</Option>

#### specFilter

<Option type="Function" default="(spec) => true">

Funzione da utilizzare per filtrare le spec.

</Option>

#### grep

<Option type="string|Regexp" default="null">

Esegue solo i test corrispondenti a questa stringa o regexp. (Applicabile solo se non è impostata una funzione `specFilter` personalizzata)

</Option>

#### invertGrep

<Option type="boolean" default="false">

Se true, inverte i test corrispondenti ed esegue solo i test che non corrispondono all'espressione utilizzata in `grep`. (Applicabile solo se non è impostata una funzione `specFilter` personalizzata)

</Option>

#### stopOnSpecFailure

<Option type="boolean" default="false">

Interrompe il file spec alla sua prima spec fallita (`it`): le altre spec del file non vengono eseguite, anche in altri blocchi `describe`. Gli altri file spec vengono eseguiti nei propri worker e continuano.

</Option>

#### cleanStack

<Option type="boolean" default="true">

Rimuove le righe dei pacchetti `node_modules` dagli stack trace dei fallimenti.

</Option>

#### expectationResultHandler

<Option type="Function" default="null">

Viene chiamata con `(passed, assertion)` per ogni expectation, ad esempio per acquisire uno screenshot quando un'expectation fallisce. Se la funzione genera un errore per un'expectation superata, l'expectation fallisce con quell'errore.

</Option>

### Asserzioni

Con Jasmine, l'`expect` globale combina i matcher di Jasmine e i [matcher di WebdriverIO](/docs/api/expect-webdriverio):

- I matcher di Jasmine (`toBe`, `toEqual`, `toHaveBeenCalled`, …) e i matcher che aggiungi con `jasmine.addMatchers` sono sincroni. Restituiscono `undefined`, quindi non è necessario `await`.
- I matcher di WebdriverIO, i matcher asincroni di Jasmine (`toBeResolved`, `toBeRejectedWith`, …) e i matcher che aggiungi con `jasmine.addAsyncMatchers` restituiscono una promise. Usa sempre `await` con essi.

Usa `expect()` per entrambi i tipi: invia automaticamente ogni matcher a `expect` o `expectAsync` di Jasmine. Funziona anche `await expectAsync($('#logo')).toBeDisplayed()`. Per TypeScript, `@wdio/jasmine-framework` in `types` fornisce i matcher di WebdriverIO anche a `expectAsync()`.

```js
it('checks the page', async () => {
    expect([1, 2]).toHaveSize(2)                                   // Jasmine, sync
    await expect($('#logo')).toHaveSize({ width: 32, height: 32 }) // WebdriverIO, async
    await expect(loadData()).toBeResolved()                        // Jasmine async matcher
})
```

`toHaveSize` esiste in entrambe le librerie. Il matcher di WebdriverIO viene eseguito sui valori di WebdriverIO: un elemento, un array di elementi o `Element[]` (ad esempio il risultato di `$$().filter()`), un elemento multi-remote, un browser, un browsing context, un mock, il wrapper `some()` o una promise come un `$()` concatenabile. Il matcher di Jasmine viene eseguito su tutti gli altri valori.

I matcher asimmetrici di entrambe le librerie funzionano, sia nei matcher di Jasmine che in quelli di WebdriverIO: `jasmine.any()`, `jasmine.objectContaining()`, `jasmine.stringMatching()`, … e `expect.any()`, `expect.stringContaining()`, `expect.oneOf()`, `expect.multiRemote()`, `expect.not.stringContaining()`, …. Per usare `some()`, importalo:

```js
import { some } from 'expect-webdriverio/api'

await expect(some($$('li'))).toHaveAttribute('data-state', 'on')
```

Le parti Jest di `expect` non sono disponibili con Jasmine: i matcher esclusivi di Jest come `toStrictEqual` o `toHaveLength`, e `expect.soft()`. Per aggiungere un matcher personalizzato, usa `expect.extend()` in un file spec o nell'hook `before` (vedi [Matcher personalizzati](/docs/custommatchers)), oppure `jasmine.addMatchers` per un matcher sincrono e `jasmine.addAsyncMatchers` per un matcher asincrono.

Per TypeScript, aggiungi `jasmine` a `types`, vedi [Configurazione di TypeScript](/docs/typescript).

## Utilizzo di Cucumber

Per prima cosa, installa il pacchetto adattatore da NPM:

```bash npm2yarn
npm install @wdio/cucumber-framework --save-dev
```

Se vuoi usare Cucumber, imposta la proprietà `framework` su `cucumber` aggiungendo `framework: 'cucumber'` al [file di configurazione](configurationfile).

Le opzioni per Cucumber possono essere fornite nel file di configurazione con `cucumberOpts`. Consulta l'elenco completo delle opzioni [qui](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-cucumber-framework#cucumberopts-options). L'adattatore utilizza Cucumber 13. `tagExpression` è stato rimosso; filtra con `tags`. Consulta la [guida alla migrazione v10](v10-migration#cucumber).

Per iniziare rapidamente con Cucumber, dai un'occhiata al nostro progetto [`cucumber-boilerplate`](https://github.com/webdriverio/cucumber-boilerplate) che include tutte le definizioni degli step necessarie per iniziare, così potrai scrivere subito i file feature.

### Opzioni di Cucumber

Le seguenti opzioni possono essere applicate nel tuo `wdio.conf.js` per configurare l'ambiente Cucumber utilizzando la proprietà `cucumberOpts`:

:::tip Regolare le opzioni tramite la riga di comando
Le `cucumberOpts`, come i `tags` personalizzati per filtrare i test, possono essere specificate tramite la riga di comando. Questo si ottiene utilizzando il formato `cucumberOpts.{optionName}="value"`.

Ad esempio, se vuoi eseguire solo i test contrassegnati con il tag `@smoke`, puoi usare il seguente comando:

```sh
# When you only want to run tests that hold the tag "@smoke"
npx wdio run ./wdio.conf.js --cucumberOpts.tags="@smoke"
npx wdio run ./wdio.conf.js --cucumberOpts.name="some scenario name" --cucumberOpts.failFast
```

Questo comando imposta l'opzione `tags` in `cucumberOpts` su `@smoke`, garantendo che vengano eseguiti solo i test con questo tag.

:::

#### backtrace

<Option type="Boolean" default="true">

Mostra il backtrace completo per gli errori.

</Option>

#### requireModule

<Option type="string[]" default="[]">

Richiede i moduli prima di richiedere qualsiasi file di supporto.

</Option>
Esempio:

```js
cucumberOpts: {
    requireModule: ['@babel/register']
    // or
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

<Option type="boolean" default="false">

Interrompe l'esecuzione al primo fallimento.

</Option>

#### name

<Option type="RegExp[]" default="[]">

Esegue solo gli scenari il cui nome corrisponde all'espressione (ripetibile).

</Option>

#### require

<Option type="string[]" default="[]">

Richiede i file contenenti le definizioni degli step prima di eseguire le feature. Puoi anche specificare un glob per le definizioni degli step.

</Option>
Esempio:

```js
cucumberOpts: {
    require: [path.join(__dirname, 'step-definitions', 'my-steps.js')]
}
```

#### import

<Option type="String[]" default="[]">

Percorsi in cui si trova il codice di supporto, per ESM.

</Option>
Esempio:

```js
cucumberOpts: {
    import: [path.join(__dirname, 'step-definitions', 'my-steps.js')]
}
```

#### strict

<Option type="boolean" default="false">

Fallisce se sono presenti step non definiti o in sospeso.

</Option>

#### tags

<Option type="String" default="">

Esegue solo le feature o gli scenari con tag corrispondenti all'espressione.
Consulta la [documentazione di Cucumber](https://docs.cucumber.io/cucumber/api/#tag-expressions) per maggiori dettagli.

</Option>

#### timeout

<Option type="Number" default="30000">

Timeout in millisecondi per le definizioni degli step.

</Option>

#### retry

<Option type="Number" default="0">

Specifica il numero di tentativi per ripetere i casi di test falliti.

</Option>

#### retryTagFilter

<Option type="RegExp">

Ripete solo le feature o gli scenari con tag corrispondenti all'espressione (ripetibile). Questa opzione richiede che sia specificato '--retry'.

</Option>

#### language

<Option type="String" default="en">

Lingua predefinita per i tuoi file feature

</Option>

#### order

<Option type="String" default="defined">

Esegue i test in ordine definito / casuale

</Option>

#### format

<Option type="string[]">

Nome e percorso del file di output del formatter da utilizzare.
WebdriverIO supporta principalmente solo i [Formatter](https://github.com/cucumber/cucumber-js/blob/main/docs/formatters.md) che scrivono l'output su un file.

</Option>

#### formatOptions

<Option type="object">

Opzioni da fornire ai formatter

</Option>

#### tagsInTitle

<Option type="Boolean" default="false">

Aggiunge i tag di cucumber al nome della feature o dello scenario

</Option>
***Nota che questa è un'opzione specifica di @wdio/cucumber-framework e non è riconosciuta da cucumber-js stesso***<br/>

#### ignoreUndefinedDefinitions

<Option type="Boolean" default="false">

Tratta le definizioni non definite come avvisi.

</Option>
***Nota che questa è un'opzione specifica di @wdio/cucumber-framework e non è riconosciuta da cucumber-js stesso***<br/>

#### failAmbiguousDefinitions

<Option type="Boolean" default="false">

Tratta le definizioni ambigue come errori.

</Option>
***Nota che questa è un'opzione specifica di @wdio/cucumber-framework e non è riconosciuta da cucumber-js stesso***<br/>

#### profile

<Option type="string[]" default="[]">

Specifica il profilo da utilizzare.

</Option>
***Tieni presente che all'interno dei profili sono supportati solo valori specifici (worldParameters, name, retryTagFilter), poiché `cucumberOpts` ha la precedenza. Inoltre, quando utilizzi un profilo, assicurati che i valori menzionati non siano dichiarati all'interno di `cucumberOpts`.***

### Saltare i test in cucumber

Nota che se vuoi saltare un test utilizzando le normali funzionalità di filtraggio dei test di cucumber disponibili in `cucumberOpts`, lo farai per tutti i browser e dispositivi configurati nelle capabilities. Per poter saltare gli scenari solo per specifiche combinazioni di capabilities senza avviare una sessione se non necessario, webdriverio fornisce la seguente sintassi di tag specifica per cucumber:

`@skip([condition])`

dove condition è una combinazione opzionale di proprietà delle capabilities con i relativi valori che, quando corrispondono **tutte**, causano il salto dello scenario o della feature contrassegnati. Naturalmente puoi aggiungere più tag a scenari e feature per saltare un test in diverse condizioni.

Puoi anche usare l'annotazione '@skip' per saltare i test senza modificare `tags`. In questo caso i test saltati verranno visualizzati nel report dei test.

Ecco alcuni esempi di questa sintassi:
- `@skip` o `@skip()`: salterà sempre l'elemento contrassegnato
- `@skip(browserName="chrome")`: il test non verrà eseguito sui browser chrome.
- `@skip(browserName="firefox";platformName="linux")`: salterà il test nelle esecuzioni di firefox su linux.
- `@skip(browserName=["chrome","firefox"])`: gli elementi contrassegnati verranno saltati sia per i browser chrome che firefox.
- `@skip(browserName=/i.*explorer/)`: le capabilities con browser corrispondenti alla regexp verranno saltate (come `iexplorer`, `internet explorer`, `internet-explorer`, ...).

### Importare gli helper per le definizioni degli step

Per utilizzare gli helper per le definizioni degli step come `Given`, `When` o `Then` o gli hook, devi importarli da `@cucumber/cucumber`, ad esempio così:

```js
import { Given, When, Then } from '@cucumber/cucumber'
```

Ora, se usi già Cucumber per altri tipi di test non correlati a WebdriverIO per i quali utilizzi una versione specifica, devi importare questi helper nei tuoi test e2e dal pacchetto Cucumber di WebdriverIO, ad esempio:

```js
import { Given, When, Then, world, context } from '@wdio/cucumber-framework'
```

Questo garantisce che tu utilizzi gli helper corretti all'interno del framework WebdriverIO e ti permette di usare una versione indipendente di Cucumber per altri tipi di test.

### Pubblicazione dei report

Cucumber offre una funzionalità per pubblicare i report delle esecuzioni dei test su `https://reports.cucumber.io/`, che può essere controllata impostando il flag `publish` in `cucumberOpts` oppure configurando la variabile d'ambiente `CUCUMBER_PUBLISH_TOKEN`. Tuttavia, quando usi `WebdriverIO` per l'esecuzione dei test, questo approccio presenta una limitazione: aggiorna i report separatamente per ogni file feature, rendendo difficile visualizzare un report consolidato.

Per superare questa limitazione, abbiamo introdotto un metodo basato su promise chiamato `publishCucumberReport` all'interno di `@wdio/cucumber-framework`. Questo metodo dovrebbe essere chiamato nell'hook `onComplete`, che è il punto ottimale in cui invocarlo. `publishCucumberReport` richiede come input la directory dei report in cui sono memorizzati i report cucumber message.

Puoi generare report `cucumber message` configurando l'opzione `format` nelle tue `cucumberOpts`. È fortemente consigliato fornire un nome di file dinamico all'interno dell'opzione di formato `cucumber message` per evitare di sovrascrivere i report e garantire che ogni esecuzione dei test venga registrata accuratamente.

Prima di utilizzare questa funzione, assicurati di impostare le seguenti variabili d'ambiente:
- CUCUMBER_PUBLISH_REPORT_URL: l'URL in cui vuoi pubblicare il report di Cucumber. Se non specificato, verrà utilizzato l'URL predefinito 'https://messages.cucumber.io/api/reports'.
- CUCUMBER_PUBLISH_REPORT_TOKEN: il token di autorizzazione necessario per pubblicare il report. Se questo token non è impostato, la funzione terminerà senza pubblicare il report.

Ecco un esempio delle configurazioni necessarie e degli esempi di codice per l'implementazione:

```javascript
import { v4 as uuidv4 } from 'uuid'
import { publishCucumberReport } from '@wdio/cucumber-framework';

export const config = {
    // ... Other Configuration Options
    cucumberOpts: {
        // ... Cucumber Options Configuration
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

Nota che `./reports/` è la directory in cui verranno memorizzati i report `cucumber message`.

## Utilizzo di Serenity/JS

[Serenity/JS](https://serenity-js.org?pk_campaign=wdio8&pk_source=webdriver.io) è un framework open-source progettato per rendere i test di accettazione e di regressione di sistemi software complessi più veloci, più collaborativi e più facili da scalare.

Per le suite di test WebdriverIO, Serenity/JS offre:
- [Reporting avanzato](https://serenity-js.org/handbook/reporting/?pk_campaign=wdio8&pk_source=webdriver.io) - Puoi usare Serenity/JS
  come sostituto diretto di qualsiasi framework WebdriverIO integrato per produrre report dettagliati sull'esecuzione dei test e documentazione vivente del tuo progetto.
- [API dello Screenplay Pattern](https://serenity-js.org/handbook/design/screenplay-pattern/?pk_campaign=wdio8&pk_source=webdriver.io) - Per rendere il codice dei test portabile e riutilizzabile tra progetti e team,
  Serenity/JS ti offre un [livello di astrazione](https://serenity-js.org/api/webdriverio?pk_campaign=wdio8&pk_source=webdriver.io) opzionale sopra le API native di WebdriverIO.
- [Librerie di integrazione](https://serenity-js.org/api/core/?pk_campaign=wdio8&pk_source=webdriver.io) - Per le suite di test che seguono lo Screenplay Pattern,
  Serenity/JS fornisce anche librerie di integrazione opzionali per aiutarti a scrivere [test delle API](https://serenity-js.org/api/rest/?pk_campaign=wdio8&pk_source=webdriver.io),
  [gestire server locali](https://serenity-js.org/api/local-server/?pk_campaign=wdio8&pk_source=webdriver.io), [eseguire asserzioni](https://serenity-js.org/api/assertions/?pk_campaign=wdio8&pk_source=webdriver.io) e altro ancora!

![Serenity BDD Report Example](/img/serenity-bdd-reporter.png)

### Installazione di Serenity/JS

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

### Configurazione di Serenity/JS

Per abilitare l'integrazione con Serenity/JS, configura WebdriverIO come segue:

<Tabs>
<TabItem value="wdio-conf-typescript" label="TypeScript" default>

```typescript title="wdio.conf.ts"
import { WebdriverIOConfig } from '@serenity-js/webdriverio';

export const config: WebdriverIOConfig = {

    // Indica a WebdriverIO di usare il framework Serenity/JS
    framework: '@serenity-js/webdriverio',

    // Configurazione di Serenity/JS
    serenity: {
        // Configura Serenity/JS per usare l'adattatore appropriato per il tuo test runner
        runner: 'cucumber',
        // runner: 'mocha',
        // runner: 'jasmine',

        // Registra i servizi di reporting di Serenity/JS, alias la "stage crew"
        crew: [
            // Opzionale, stampa i risultati dell'esecuzione dei test sullo standard output
            '@serenity-js/console-reporter',

            // Opzionale, produce report Serenity BDD e documentazione vivente (HTML)
            '@serenity-js/serenity-bdd',
            [ '@serenity-js/core:ArtifactArchiver', { outputDirectory: 'target/site/serenity' } ],

            // Opzionale, acquisisce automaticamente screenshot in caso di interazione fallita
            [ '@serenity-js/web:Photographer', { strategy: 'TakePhotosOfFailures' } ],
        ]
    },

    // Configura il runner Cucumber
    cucumberOpts: {
        // vedi le opzioni di configurazione di Cucumber sotto
    },

    // ... oppure il runner Jasmine
    jasmineOpts: {
        // vedi le opzioni di configurazione di Jasmine sotto
    },

    // ... oppure il runner Mocha
    mochaOpts: {
        // vedi le opzioni di configurazione di Mocha sotto
    },

    runner: 'local',

    // Qualsiasi altra configurazione di WebdriverIO
};
```

</TabItem>
<TabItem value="wdio-conf-javascript" label="JavaScript">

```typescript title="wdio.conf.js"
export const config = {

    // Indica a WebdriverIO di usare il framework Serenity/JS
    framework: '@serenity-js/webdriverio',

    // Configurazione di Serenity/JS
    serenity: {
        // Configura Serenity/JS per usare l'adattatore appropriato per il tuo test runner
        runner: 'cucumber',
        // runner: 'mocha',
        // runner: 'jasmine',

        // Registra i servizi di reporting di Serenity/JS, alias la "stage crew"
        crew: [
            '@serenity-js/console-reporter',
            '@serenity-js/serenity-bdd',
            [ '@serenity-js/core:ArtifactArchiver', { outputDirectory: 'target/site/serenity' } ],
            [ '@serenity-js/web:Photographer', { strategy: 'TakePhotosOfFailures' } ],
        ]
    },

    // Configura il runner Cucumber
    cucumberOpts: {
        // vedi le opzioni di configurazione di Cucumber sotto
    },

    // ... oppure il runner Jasmine
    jasmineOpts: {
        // vedi le opzioni di configurazione di Jasmine sotto
    },

    // ... oppure il runner Mocha
    mochaOpts: {
        // vedi le opzioni di configurazione di Mocha sotto
    },

    runner: 'local',

    // Qualsiasi altra configurazione di WebdriverIO
};
```

</TabItem>
</Tabs>

Scopri di più su:
- [Opzioni di configurazione di Serenity/JS per Cucumber](https://serenity-js.org/api/cucumber-adapter/interface/CucumberConfig/?pk_campaign=wdio8&pk_source=webdriver.io)
- [Opzioni di configurazione di Serenity/JS per Jasmine](https://serenity-js.org/api/jasmine-adapter/interface/JasmineConfig/?pk_campaign=wdio8&pk_source=webdriver.io)
- [Opzioni di configurazione di Serenity/JS per Mocha](https://serenity-js.org/api/mocha-adapter/interface/MochaConfig/?pk_campaign=wdio8&pk_source=webdriver.io)
- [File di configurazione di WebdriverIO](configurationfile)

### Produrre report Serenity BDD e documentazione vivente

I [report Serenity BDD e la documentazione vivente](https://serenity-bdd.github.io/docs/reporting/the_serenity_reports) vengono generati da [Serenity BDD CLI](https://github.com/serenity-bdd/serenity-core/tree/main/serenity-cli),
un programma Java scaricato e gestito dal modulo [`@serenity-js/serenity-bdd`](https://serenity-js.org/api/serenity-bdd/?pk_campaign=wdio8&pk_source=webdriver.io).

Per produrre report Serenity BDD, la tua suite di test deve:
- scaricare la Serenity BDD CLI, chiamando `serenity-bdd update` che memorizza nella cache locale il `jar` della CLI
- produrre report Serenity BDD `.json` intermedi, registrando [`SerenityBDDReporter`](https://serenity-js.org/api/serenity-bdd/class/SerenityBDDReporter/?pk_campaign=wdio8&pk_source=webdriver.io) secondo le [istruzioni di configurazione](#configuring-serenityjs)
- invocare la Serenity BDD CLI quando vuoi produrre il report, chiamando `serenity-bdd run`

Lo schema utilizzato da tutti i [Template di progetto Serenity/JS](https://serenity-js.org/handbook/project-templates/?pk_campaign=wdio8&pk_source=webdriver.io#webdriverio) si basa
sull'utilizzo di:
- uno script NPM [`postinstall`](https://docs.npmjs.com/cli/v9/using-npm/scripts#life-cycle-operation-order) per scaricare la Serenity BDD CLI
- [`npm-failsafe`](https://www.npmjs.com/package/npm-failsafe) per eseguire il processo di reporting anche se la suite di test stessa è fallita (che è proprio quando hai più bisogno dei report dei test...).
- [`rimraf`](https://www.npmjs.com/package/rimraf) come metodo pratico per rimuovere eventuali report dei test rimasti dall'esecuzione precedente

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

Per saperne di più su `SerenityBDDReporter`, consulta:
- le istruzioni di installazione nella [documentazione di `@serenity-js/serenity-bdd`](https://serenity-js.org/api/serenity-bdd/?pk_campaign=wdio8&pk_source=webdriver.io),
- gli esempi di configurazione nella [documentazione API di `SerenityBDDReporter`](https://serenity-js.org/api/serenity-bdd/class/SerenityBDDReporter/?pk_campaign=wdio8&pk_source=webdriver.io),
- gli [esempi di Serenity/JS su GitHub](https://github.com/serenity-js/serenity-js/tree/main/examples).

### Utilizzo delle API dello Screenplay Pattern di Serenity/JS

Lo [Screenplay Pattern](https://serenity-js.org/handbook/design/screenplay-pattern/?pk_campaign=wdio8&pk_source=webdriver.io) è un approccio innovativo e incentrato sull'utente per scrivere test di accettazione automatizzati di alta qualità. Ti guida verso un uso efficace dei livelli di astrazione,
aiuta i tuoi scenari di test a catturare il linguaggio di business del tuo dominio e incoraggia buone abitudini di testing e di ingegneria del software nel tuo team.

Per impostazione predefinita, quando registri `@serenity-js/webdriverio` come `framework` di WebdriverIO,
Serenity/JS configura un [cast](https://serenity-js.org/api/core/class/Cast/?pk_campaign=wdio8&pk_source=webdriver.io) predefinito di [attori](https://serenity-js.org/api/core/class/Actor/?pk_campaign=wdio8&pk_source=webdriver.io),
in cui ogni attore può:
- [`BrowseTheWebWithWebdriverIO`](https://serenity-js.org/api/webdriverio/class/BrowseTheWebWithWebdriverIO/?pk_campaign=wdio8&pk_source=webdriver.io)
- [`TakeNotes.usingAnEmptyNotepad()`](https://serenity-js.org/api/core/class/TakeNotes/?pk_campaign=wdio8&pk_source=webdriver.io)

Questo dovrebbe essere sufficiente per aiutarti a iniziare a introdurre scenari di test che seguono lo Screenplay Pattern anche in una suite di test esistente, ad esempio:

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

Per saperne di più sullo Screenplay Pattern, consulta:
- [Lo Screenplay Pattern](https://serenity-js.org/handbook/design/screenplay-pattern/?pk_campaign=wdio8&pk_source=webdriver.io)
- [Test web con Serenity/JS](https://serenity-js.org/handbook/web-testing/?pk_campaign=wdio8&pk_source=webdriver.io)
- ["BDD in Action, Second Edition"](https://www.manning.com/books/bdd-in-action-second-edition)