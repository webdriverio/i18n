---
id: v10-migration
title: Da v9 a v10
description: Aggiorna un progetto WebdriverIO v9 alla v10, con tutte le modifiche incompatibili e una skill per agenti di programmazione che applica questa guida.
---

Questa guida raccoglie le modifiche incompatibili di WebdriverIO `v10` e indica cosa devi fare per ciascuna.

A differenza delle versioni major precedenti, la maggior parte di queste modifiche non può essere applicata dal [codemod](https://github.com/webdriverio/codemod) di WebdriverIO, perché dipende da cosa significano davvero i tuoi test. Le [firme dei comandi legacy](#legacy-command-signatures) qui sotto sono sostituzioni meccaniche. Ogni altra sezione descrive come trovare i punti interessati nella tua suite.

## Migrare con un agente di programmazione

Fornisci al tuo agente la skill di migrazione v10 e chiedigli di migrare la suite a WebdriverIO v10 seguendo questa pagina. La skill è la procedura: cosa cercare, quale codemod eseguire e quando fermarsi. Questa pagina è la fonte di riferimento per ogni modifica incompatibile.

Installala dal progetto che stai aggiornando. La [CLI skills](https://skills.sh) legge [`.agents/skills/wdio-v10-migration/SKILL.md`](https://github.com/webdriverio/webdriverio/blob/main/.agents/skills/wdio-v10-migration/SKILL.md) da questo repository e la scrive nella directory delle skill degli agenti che scegli:

```sh
npx skills add webdriverio/webdriverio --skill wdio-v10-migration
```

`--skill wdio-v10-migration` installa questa skill. Le skill per lavorare sul repository di WebdriverIO sono contrassegnate come interne e non vengono proposte. La CLI chiede per quali agenti installare e scrive la skill nella directory di progetto di ciascun agente. Puoi anche allegare quel file alla chat.

I selettori strict e le liste `specs` / `exclude` senza prefisso nelle capability emergono solo quando la suite viene eseguita. La skill non può deciderli basandosi solo sul codice sorgente.

## Node.js

WebdriverIO v10 richiede Node.js 22.23.4, 24.22.1 o 26.12.1, oppure una release successiva di queste linee. Sono le prime release con lo [store CA aggiornato](https://nodejs.org/en/blog/vulnerability/october-2026-security-releases) per la compromissione della CA intermedia eMudhra. Node.js 18 e 20 non sono più supportati, e Node.js 23 e 25 non sono supportati. La CI copre Node.js 22, 24 e 26.

## Test dei componenti

Il browser runner funziona ancora in Chrome 90, Edge 90, Firefox 90 e Safari 14.1 o versioni successive. Vedi [Supporto dei browser](/docs/component-testing#browser-support).

Il codice passato a `browser.execute` resta a ES2021, così può essere eseguito nei browser più vecchi sotto test. Questo requisito minimo non è cambiato.

## Mocha

`@wdio/mocha-framework` e `@wdio/browser-runner` dipendono da [Mocha 12](https://mochajs.org/blog/mocha-12-stable/). Mocha 12 richiede Node.js `^20.19.0 || >=22.12.0`, coperto dal requisito minimo v10 di Node.js 22.23.4.

```diff
- mochaOpts: { compilers: ['ts:ts-node/register'] }
+ mochaOpts: { require: ['ts-node/register'] }
```

`mochaOpts.compilers` non esiste più. Mocha ha rimosso il flag `--compilers`, deprecato da tempo, quindi le mappature dei compilatori rimaste vengono ignorate. Carica i transpiler o altri file di setup con `mochaOpts.require`.

WebdriverIO segue il timeout di Mocha: `this.timeout()` in un test o in un hook, e `mochaOpts.timeout: 0`, che disattiva il timeout. In v9 WebdriverIO ignorava `this.timeout()` in un test e, dalla 9.22, `mochaOpts.timeout: 0` faceva fallire ogni test ("Timeout after -3ms"). L'argomento `retry` di WebdriverIO non riesegue un test dopo un timeout. Vedi [I timeout di Mocha e gli hook di WebdriverIO](./Timeouts.md#mocha-timeouts-and-the-webdriverio-hooks), anche per `mochaOpts.parallelMode`. Novità della v10: [test paralleli in un file spec](./ParallelTests.md) con `mochaOpts.parallelMode` o `cucumberOpts.parallelMode`.

`failHookAffectedTests` ha come valore predefinito `true`. Un hook `before` o `beforeEach` che fallisce fa fallire i test che quell'hook ha saltato. Imposta `mochaOpts.failHookAffectedTests` a `false` per segnalare solo l'hook.

Il titolo di un hook contiene la descrizione o il nome della funzione dell'hook, come in Mocha: `"before each" hook: login for "my test"` per `beforeEach('login', fn)` o `beforeEach(function login () {})`, oppure nessun nome per un hook anonimo: `"before each" hook for "my test"`. In v9 conteneva `wrappedHook`, il nome del wrapper di WebdriverIO. Vedi questo titolo nell'errore di un test che un hook fallito ha saltato, e nei nomi degli hook a livello radice, per esempio in Allure.

Usa `expect-webdriverio` 8, vedi [expect-webdriverio 8](#expect-webdriverio-8). Mocha può caricare quel pacchetto due volte nello stesso processo; il pacchetto condivide lo stato delle asserzioni tra queste copie ([expect-webdriverio#2221](https://github.com/webdriverio/expect-webdriverio/pull/2221)).

Modifiche di Mocha 12 che possono emergere tramite `mochaOpts`:

- `grep` accetta i flag RegExp moderni.
- `ui` è ancora `bdd`, `tdd`, `qunit` o `exports`. Le interfacce personalizzate dovrebbero mantenere il suffisso `*-bdd`, `*-tdd` o `*-qunit`.
- `parallel` non è ancora supportato. WDIO gestisce il parallelismo delle spec; il pool di worker di Mocha genera un errore se lo abiliti.

Mocha 12 è ESM-first (`"type": "module"`). Il `require('mocha')` programmatico funziona ancora su Node 22 tramite `require(esm)`. La CLI Mocha di WDIO (`wdio run … --mochaOpts.*`) è invariata; la CLI di Mocha ora usa `util.parseArgs` invece di yargs.

## Cucumber

`@wdio/cucumber-framework` dipende da [`@cucumber/cucumber` 13](https://github.com/cucumber/cucumber-js/blob/main/UPGRADING.md#1300).

Cucumber 13 richiede Node.js 22, 24 o 26 o versioni successive. Non funziona su Node.js 20, 23 o 25. Il pacchetto del framework dichiara l'intervallo della v10, che esclude anche Node.js 23 e 25.

```diff
- cucumberOpts: { tagExpression: '@smoke' }
+ cucumberOpts: { tags: '@smoke' }
```

`tagExpression` non ha un alias. Impostarlo genera un errore, così un filtro rimasto non può eseguire silenziosamente tutti gli scenari.

Cucumber 13 non esporta più `Cli`. Le esecuzioni programmatiche passano per `runCucumber` da `@cucumber/cucumber/api`, che è ciò che l'adapter usa già.

Le altre modifiche incompatibili di Cucumber 13 (percorsi ambigui dei formatter, worker paralleli, `BeforeAll` / `AfterAll`) sono descritte nella [guida all'aggiornamento di Cucumber](https://github.com/cucumber/cucumber-js/blob/main/UPGRADING.md#1300).

### Uid della feature

L'uid di una feature Cucumber è il percorso del file della feature a partire da `rootDir`, non il nome del file: `features/admin/login.feature:1:1` invece di `login.feature:1:1`. Due file di feature con lo stesso nome in cartelle diverse non condividono più un uid. Il `parent` e il `fullTitle` di uno scenario usano questo uid. `%`, `:` e `#` nel percorso sono codificati come `%25`, `%3A` e `%23`, quindi `uid.split(':')[1]` è ancora la riga e un `#` introduce solo un numero di parte. Nelle spec raggruppate con ordine casuale, una feature che ricomincia ha come uid della suite `<uid>#2`.

Con `scenarioLevelReporter: true`, l'`historyId` di Allure deriva da `fullTitle`, quindi con questa modifica la cronologia Allure di ogni scenario ricomincia. Ricomincia anche quando cambia `rootDir` o il percorso del file della feature. Per mantenere un'unica cronologia per file di configurazione in cartelle diverse, imposta lo stesso `rootDir` in ciascuno di essi.

## Jasmine

`@wdio/jasmine-framework` dipende da [Jasmine 6](https://jasmine.github.io/upgrade-guides/6.0). Jasmine 6 è testato su Node.js 20, 22 e 24. Il requisito minimo v10 di Node.js 22.23.4 rientra già in questo intervallo.

`jasmineNodeOpts` è stato rimosso. Configura Jasmine con `jasmineOpts`. Impostare `jasmineNodeOpts` genera un errore:

```text
The option "jasmineNodeOpts" was removed in WebdriverIO v10. Use "jasmineOpts" instead.
```

```diff
- jasmineNodeOpts: { defaultTimeoutInterval: 60000 }
+ jasmineOpts: { defaultTimeoutInterval: 60000 }
```

`jasmineOpts.failFast` non viene più letto. Usa `jasmineOpts.stopOnSpecFailure`. Un `failFast` rimasto non interrompe la suite. Il `failFast` di Cucumber è un'opzione diversa e funziona ancora.

```diff
- jasmineOpts: { failFast: true }
+ jasmineOpts: { stopOnSpecFailure: true }
```

`jasmineOpts.stopSpecOnExpectationFailure` è stato rimosso. Usa `jasmineOpts.oneFailurePerSpec`. Impostare la vecchia chiave genera un errore:

```text
The option "jasmineOpts.stopSpecOnExpectationFailure" was removed in WebdriverIO v10. Use "jasmineOpts.oneFailurePerSpec" instead.
```

```diff
- jasmineOpts: { stopSpecOnExpectationFailure: true }
+ jasmineOpts: { oneFailurePerSpec: true }
```

I matcher sincroni di Jasmine sono di nuovo sincroni. In v9 l'`expect` globale era l'`expectAsync` di Jasmine, quindi `expect(1).toBe(1)` restituiva una promise. In v10 i matcher integrati di Jasmine e quelli che aggiungi con `jasmine.addMatchers` restituiscono `undefined`. I matcher di WebdriverIO, i matcher asincroni di Jasmine e quelli di `jasmine.addAsyncMatchers` restituiscono ancora una promise, quindi continua a usare `await` su di essi. Non devi cambiare `await expect($('#logo')).toBeDisplayed()` in `expectAsync()`: l'`expect` globale inoltra per te i matcher di WebdriverIO a `expectAsync`. `await expect(1).toBe(1)` continua a funzionare.

Un'asserzione sincrona fallita senza `await` ora fa fallire la spec. In v9 era una promise rifiutata: se nessuno ne faceva l'`await`, la spec poteva passare, con solo un rifiuto non gestito nel log. Dopo l'aggiornamento, esamina le spec che iniziano a fallire. Avevano un fallimento nascosto in v9, e la correzione va fatta nel test o nell'applicazione, non nella chiamata `expect`:

```js
it('saves the form', async () => {
    const onSave = jasmine.createSpy('onSave')
    await submitForm(onSave)
    // v9: passava anche quando `onSave` non veniva chiamato
    // v10: fallisce quando `onSave` non viene chiamato
    expect(onSave).toHaveBeenCalled()
})
```

Il risultato di un matcher sincrono ora è `undefined`, quindi `.then()` o `.catch()` su di esso genera un `TypeError`:

```diff
- expect(total).toBe(3).then(() => log('ok'))
+ expect(total).toBe(3)
+ log('ok')
```

Altri effetti di questa modifica:

- `oneFailurePerSpec` ora interrompe la spec alla prima asserzione fallita: subito per un matcher sincrono, e quando la promise si risolve per un matcher asincrono su cui si fa `await`.
- I matcher degli spy di Jasmine funzionano senza `await`. In v9 `toHaveBeenCalled`, `toHaveSpyInteractions` e `toHaveNoOtherSpyInteractions` fallivano con "Does not take arguments", e uno spy non chiamato passava senza `await`.
- `jasmine.addMatchers` non viene più sostituito, quindi Jasmine non mostra più l'avviso "Monkey patching detected".

`toHaveSize` ha due significati. Su un valore WebdriverIO è il matcher di WebdriverIO e verifica la dimensione dell'elemento: un elemento, un array di elementi (incluso il risultato di `$$().filter()`), un `Element[]`, un elemento multi-remote, un browser, un browsing context, un mock, il wrapper `some()`, o una promise come un `$()` concatenabile. Su qualsiasi altro valore è il matcher di Jasmine e verifica la lunghezza. In v9 veniva sempre eseguito il matcher di Jasmine.

```js
expect([1, 2]).toHaveSize(2)                                   // Jasmine, sincrono
await expect($('#logo')).toHaveSize({ width: 32, height: 32 }) // WebdriverIO, asincrono
```

I tipi seguono le stesse regole. `@wdio/jasmine-framework` ora tipizza l'`expect` globale con i matcher di Jasmine, più i matcher di WebdriverIO e i matcher asincroni di Jasmine, che restituiscono una promise. Rimuovi `expect-webdriverio/jasmine-wdio-expect-async` da `types` nel tuo `tsconfig.json`, perché tipizza ogni matcher come asincrono. Aggiungi `jasmine` se non è presente:

```diff title="tsconfig.json"
 {
     "compilerOptions": {
-        "types": ["node", "@wdio/globals/types", "expect-webdriverio/jasmine-wdio-expect-async", "@wdio/jasmine-framework"]
+        "types": ["node", "jasmine", "@wdio/globals/types", "@wdio/jasmine-framework"]
     }
 }
```

`expect.oneOf()` ed `expect.multiRemote()` ora funzionano anche nelle spec Jasmine. Prima non erano presenti sull'`expect` di Jasmine a runtime.

## expect-webdriverio 8

`@wdio/globals`, `@wdio/runner` e `@wdio/browser-runner` richiedono `expect-webdriverio` 8 come peer dependency. In v9 era `expect-webdriverio` 5, 6 o 7. Se il tuo `package.json` elenca `expect-webdriverio`, aggiornalo alla versione 8 nella stessa modifica dei pacchetti `@wdio/*`.

`expect-webdriverio` 8 ha le sue modifiche incompatibili. La sua [guida alla migrazione da v7 a v8](https://github.com/webdriverio/expect-webdriverio/blob/main/docs/Migrations.md#migration-guide-v7-to-v8) elenca ogni modifica e la relativa sostituzione. Se parti da `expect-webdriverio` 5 o 6, leggi anche la sua [guida alla migrazione da v5 a v6](https://github.com/webdriverio/expect-webdriverio/blob/main/docs/Migrations.md#migration-guide-v5-to-v6): la versione 8 rimuove le API deprecate tra la 5.6.9 e la 6.0.0. La versione 7 non ha una guida alla migrazione. Aggiunge il supporto multi-remote, e `toMatchSnapshot()` e `toMatchInlineSnapshot()` su `$$()` ora memorizzano l'`outerHTML` di ogni elemento: aggiorna quegli snapshot. Queste sono le modifiche che più probabilmente interessano una suite di test:

- `toHaveText` su `$$()` confronta gli elementi indice per indice. Un array atteso in un ordine diverso da quello della pagina fallisce. Usa l'ordine della pagina, `expect.oneOf()` o `expect.arrayContaining()`.
- Un array di valori attesi su un singolo elemento fa fallire `toHaveText`, `toHaveHTML`, `toHaveComputedLabel`, `toHaveComputedRole` e `toHaveElementClass`. Usa `expect.oneOf()`. Per `toHaveElementClass`, un array significava "ha una qualsiasi di queste classi": usa `expect.oneOf()`, oppure un'asserzione per ogni classe quando l'elemento deve averle tutte.
- Un matcher di lista (`expect.arrayContaining()`, `expect.arrayOf()`) su un singolo elemento, o con `some()`, genera un errore. Su `$$()` confronta i valori di tutti gli elementi in una volta.
- Un attributo o una proprietà mancante non corrisponde mai, nemmeno a un matcher che accetta l'assenza di valore, come `expect.not.stringContaining()`.
- `URL`, `Set`, `Map` e i valori binari vengono confrontati in base al contenuto. Un'asserzione che passava per errore ora può fallire.
- I tipi helper non sono più globali. Un file che usa `Test`, `TestResult`, `Scenario` o `WdioCustomMatchers` senza un import fallisce con `Cannot find name`: usa `Frameworks.Test`, `Frameworks.TestResult` e `Frameworks.Scenario` da `@wdio/types`, ed `ExpectWebdriverIO.Matchers`.
- `setFeatureFlags()` e l'opzione `featureFlags` sono stati rimossi.
- Queste API deprecate sono state rimosse: `setOptions` (usa `setDefaultOptions`), `getConfig` (usa `getDefaultOptions`), `matchers` (usa `wdioCustomMatchers`), `toHaveAttr` (usa `toHaveAttribute`), `toHaveClass` (usa `toHaveElementClass`), `toBeRequestedWithResponse()` (usa `toBeRequestedWith({ response })`) ed `expect-webdriverio/types` (usa `expect-webdriverio/expect-global`).
- Gli hook `beforeAssertion` e `afterAssertion` ricevono il nome dell'alias chiamato dal test, per `toBeExisting`, `toBePresent`, `toHaveLink`, `toHaveValue` e `toBeRequested`. In v9 ricevevano il nome del matcher dietro l'alias, per esempio `toExist` per `toBeExisting`.
- Su un browser multi-remote, passa a `expect` il risultato di `$$()`. Un array semplice come `[...elements]` o `Array.from(elements)` non viene riconosciuto come elementi, e l'asserzione fallisce.

Su un browser multi-remote, un'asserzione verifica ogni istanza, ed `expect.multiRemote()` fornisce un valore atteso per istanza. Vedi [Asserzioni multiremote](/docs/multiremote#assertions).

## Pacchetti dei driver

WebdriverIO v10 avvia Firefox, Edge e Safari con `geckodriver` 8, `edgedriver` 8 e `safaridriver` 3. In v9 usava `geckodriver` ed `edgedriver` 6 o 7, e `safaridriver` 1 o 2. WebdriverIO li installa, quindi non devi elencarli tu. Se il tuo `package.json` ne elenca uno, aggiornalo nella stessa modifica dei pacchetti `@wdio/*`.

`geckodriver` ed `edgedriver` hanno `@wdio/logger` come peer dependency, quindi registrano i log tramite il logger della tua installazione di WebdriverIO. In v9 `geckodriver` ed `edgedriver` includevano una propria copia di `@wdio/logger`, e quella seconda copia svuotava il file di log in `outputDir`. Esegui `npm ls @wdio/logger`: ogni copia dovrebbe essere alla versione 10. Un plugin o un servizio che dipende ancora dalla versione 9 ha lo stesso effetto.

Le [note di aggiornamento dei driver](https://github.com/webdriverio/driver#upgrading-to-geckodriver-8-edgedriver-8-and-safaridriver-3) elencano ogni modifica. Queste modifiche possono interessare un progetto WebdriverIO:

- I download dei driver usano `HTTPS_PROXY` e `HTTP_PROXY`. In v9 i download di `geckodriver` ed `edgedriver` li ignoravano. Se nel tuo ambiente è impostato un proxy ma la CDN dei driver deve essere raggiunta direttamente, aggiungi il suo host a `NO_PROXY`.
- `geckodriver` non legge più `GECKODRIVER_FILEPATH`. Usa `GECKODRIVER_PATH`.
- `wdio:edgedriverOptions` e `wdio:safaridriverOptions` accettano `spawnOpts`, come fa `wdio:chromedriverOptions`.

## Download dei browser

In v9 WebdriverIO estraeva da sé i file zip di Chrome, Chromium e Chromedriver. In v10 usa il comando di sistema `unzip` su Linux e macOS (`tar.exe` o PowerShell su Windows). Le immagini Docker slim, come `node:24-slim`, non lo includono: installalo, vedi [Docker](/docs/docker#images-where-webdriverio-downloads-the-browser).

In v9 i download di Chrome, Chromium, Firefox e Chromedriver usavano `HTTPS_PROXY` e `HTTP_PROXY`. In v10 li usano solo quando `proxy-agent` è installato nel tuo progetto, o quando Node.js viene eseguito con `NODE_USE_ENV_PROXY=1`. WebdriverIO registra un avviso quando una variabile proxy è impostata ma il download la ignorerebbe. Vedi [Proxy per i download di browser e driver](/docs/proxy#proxy-for-browser-and-driver-downloads).

## Globale multi-remote

La globale in minuscolo `multiremotebrowser` è stata rimossa, da `@wdio/globals` e anche dalle globali di `eslint-plugin-wdio`. Usa `multiRemoteBrowser`.

```diff
- import { multiremotebrowser } from '@wdio/globals'
+ import { multiRemoteBrowser } from '@wdio/globals'
```

## Capability

`specs` ed `exclude` nelle capability non vengono più letti. Usa `wdio:specs` e `wdio:exclude`.

```diff
  capabilities: [{
      browserName: 'chrome',
-     specs: ['./test/specs/chrome/**/*.js'],
-     exclude: ['./test/specs/chrome/skip.js']
+     'wdio:specs': ['./test/specs/chrome/**/*.js'],
+     'wdio:exclude': ['./test/specs/chrome/skip.js']
  }]
```

Le chiavi di configurazione di primo livello restano `specs` ed `exclude`. Una lista senza prefisso rimasta su una capability non seleziona file per quella capability. La capability usa allora `specs` ed `exclude` di primo livello.

Gli alias `tunnelIdentifier` e `parentTunnel` sono stati rimossi dai tipi delle opzioni di Sauce Labs. Usa `tunnelName` e `tunnelOwner`.

## TypeScript

I tipi `Element`, `MultiRemoteBrowser` e `MultiRemoteElement` esportati da `webdriverio` sono stati rimossi. Usa il namespace globale `WebdriverIO`.

```diff
- import type { Element } from 'webdriverio'
- const elem: Element = await $('#foo')
+ const elem: WebdriverIO.Element = await $('#foo')
```

`ChainablePromiseElement` ora dichiara `then`, e `ChainablePromiseArray` dichiara `then`, `catch` e `finally`. I tipi concatenabili descrivono il valore prima dell'`await`. Non corrispondono più al valore dopo l'`await`:

```ts
let elem: ChainablePromiseElement
elem = await $('h1')
// TS2741: Property 'then' is missing in type 'Element' but required in type 'ChainablePromiseElement'.

let elems: ChainablePromiseArray
elems = await $$('li')
// TS2322: Type 'ElementArray' is not assignable to type 'ChainablePromiseArray'.
```

Tipizza il valore dopo l'`await` come `WebdriverIO.Element` o `WebdriverIO.ElementArray`:

```diff
- let elem: ChainablePromiseElement = await $('h1')
- let elems: ChainablePromiseArray = await $$('li')
+ let elem: WebdriverIO.Element = await $('h1')
+ let elems: WebdriverIO.ElementArray = await $$('li')
```

Entrambi i tipi concatenabili ora soddisfano `T extends PromiseLike<unknown>`. Un tipo condizionale che verifica `PromiseLike` prende per `$()` e `$$()` un ramo diverso rispetto a v9. Per esempio, `Awaited<ChainablePromiseElement>` ora è `WebdriverIO.Element`, e `Awaited<ChainablePromiseArray>` è `WebdriverIO.ElementArray`.

Le proprietà di un `$$()` senza `await` hanno cambiato tipo. Sono disponibili subito, prima che la query si risolva, quindi leggile senza `await` né `.then()`:

| Proprietà | v9 | v10 |
|---|---|---|
| `selector` | `Promise<Selector>` | `Selector \| undefined` |
| `parent` | `Promise<...>` | il genitore, non una promise (vedi sotto) |
| `foundWith` | nessuna | il comando che ha trovato la lista, es. `$$` o `custom$$` |
| `props` | nessuna | gli argomenti aggiuntivi di quel comando |

```diff
- const selector = await $$('li').selector
+ const selector = $$('li').selector
```

In una query concatenata come `$('form').$$('input')`, `parent` è il concatenabile `$('form')` finché la lista non si risolve, e l'elemento risolto dopo. Fai l'`await` della lista prima di usare `parent` come elemento.

A runtime, `filter()`, `filterSeries()` e `slice()` su una lista `$$()` restituiscono una lista di elementi, non un array semplice. Il risultato mantiene `selector`, `foundWith`, `parent` e `props` della lista di origine. In v9 `filter()` restituiva un array semplice senza queste proprietà. I tipi non lo riflettono ancora: `filter()` e `filterSeries()` sono dichiarati come restituenti `Promise<WebdriverIO.Element[]>`, e `slice()` restituisce `WebdriverIO.Element[]`, quindi TypeScript segnala un errore quando leggi queste proprietà sul risultato.

WebdriverIO non riesegue la query per la lista derivata in sé: un indice oltre la sua fine non attende altre corrispondenze, e non restituisce mai un elemento escluso dal filtro. I suoi membri sono ancora gli elementi della query di origine, con i loro `selector` e `index` originali. Se un membro diventa stale, WebdriverIO lo recupera di nuovo dalla query di origine a quell'indice, che può essere un altro elemento se la pagina è cambiata. Il codice che riesegue la query di una lista a partire dalle sue proprietà, per esempio `parent[foundWith](selector, ...props)`, ottiene la lista completa, non quella filtrata.

I pacchetti pubblicati impostano `typeScriptVersion` a 6.0.3, in linea con la versione di TypeScript con cui viene compilato questo repository.

`browser.mock()` accetta l'`URLPattern` di `urlpattern-polyfill` e l'`URLPattern` nativo (globale in Node.js 24 e tipizzato dalla libreria `dom` di TypeScript 6).

TypeScript 6 depreca `"moduleResolution": "node"` e `"baseUrl"`, e rende `strict` il valore predefinito. `create-wdio` ora genera `"moduleResolution": "bundler"` per i progetti ESM e `"NodeNext"` per i progetti CommonJS. Se aggiorni TypeScript in un progetto esistente, modifica queste opzioni nel tuo `tsconfig.json`.

Per un progetto ESM:

```diff title="tsconfig.json"
 {
     "compilerOptions": {
-        "moduleResolution": "node",
+        "moduleResolution": "bundler",
         "module": "ESNext"
     }
 }
```

Per un progetto CommonJS, usa `NodeNext` per entrambe le opzioni, come fa `create-wdio`:

```diff title="tsconfig.json"
 {
     "compilerOptions": {
-        "moduleResolution": "node",
-        "module": "CommonJS"
+        "moduleResolution": "NodeNext",
+        "module": "NodeNext"
     }
 }
```

TypeScript 6 cambia anche il valore predefinito di `types` in `[]`, quindi non carica più tutti i pacchetti `@types/*` installati. Se il tuo `tsconfig.json` non ha una lista `types`, globali come `describe` e `it` di Mocha falliscono con `Cannot find name`. Elenca i pacchetti di tipi usati dai tuoi test, come fa `create-wdio`. Per esempio, con Mocha:

```diff title="tsconfig.json"
 {
     "compilerOptions": {
+        "types": ["node", "@wdio/globals/types", "@wdio/mocha-framework"]
     }
 }
```

`npm create wdio@latest` scrive `compilerOptions.target` e `compilerOptions.lib` come `es2024`. Il controllo dei tipi di quel file richiede TypeScript 5.7 o versioni successive. `tsx`, che esegue la configurazione e i test, non esegue il controllo dei tipi, quindi un compilatore più vecchio conta solo quando esegui `tsc` tu stesso.

Un `tsconfig.json` esistente non viene riscritto. Una configurazione generata che estende un'altra configurazione mantiene `target` e `lib` della configurazione genitore.

Nell'hook `afterAssertion`, il tipo di `params.result` ora è `{ pass, message }`, come lo forniscono i matcher. In v9 il tipo era `{ result, message }`, ma `params.result.result` era sempre `undefined` a runtime. Leggi `params.result.pass`:

```diff
  afterAssertion (params) {
-     console.log(params.matcherName, params.result.result)
+     console.log(params.matcherName, params.result.pass)
  }
```

`pass` è `true` quando il valore corrisponde al valore atteso, anche con `.not`. Quindi con `.not` l'asserzione passa quando `pass` è `false`. L'hook non indica se il test ha usato `.not`.

## Hook dei comandi

Un comando di elemento esegue gli hook `beforeCommand` e `afterCommand` una sola volta, con gli argomenti del comando. In v9 li eseguiva 2 o 3 volte, e la prima chiamata riceveva `[]` come `args`. Un comando eseguito all'interno di un altro (per esempio `getElementText` in `getText`) ha ancora la propria coppia. Gli hook non vengono eseguiti per la funzione di evento `emit`. Un hook che conta i comandi o ne misura il tempo vede ogni comando una sola volta.

Per un comando di elemento, `beforeCommand` viene eseguito prima che WebdriverIO attenda l'elemento, quindi in quel momento l'elemento può ancora mancare. `afterCommand` viene eseguito dopo l'attesa e gli eventuali tentativi, con il risultato o l'errore dell'ultimo tentativo. Un hook che ha bisogno dell'elemento trovato usa `afterCommand`.

Un comando modificato con `overwriteCommand()`, e una query concatenata su una promise (`$('a').$('b')`), possono ancora eseguire gli hook più di una volta.

## Reporter

L'evento `result` del browser viene inoltrato ai reporter come `client:afterCommand`. Quel payload e il tipo `AfterCommandArgs` non hanno più una proprietà `name`. Leggi invece `command`. I comandi personalizzati inviavano già `command`.

```diff
  onAfterCommand(args) {
-     console.log(args.name)
+     console.log(args.command)
  }
```

### Allure

`addEnvironment(name, value)` su `@wdio/allure-reporter` è stato rimosso. Non aveva alcun effetto. Imposta le righe dell'ambiente con [`reportedEnvironmentVars`](/docs/allure-reporter) nelle opzioni del reporter Allure.

### Reporter Cucumber JSON

`wdio-cucumberjs-json-reporter` è stato spostato nel repository di WebdriverIO come [`@wdio/cucumberjs-json-reporter`](/docs/cucumberjs-json-reporter). Il pacchetto della community è solo per la v9: installa `@wdio/reporter` 9 e `@wdio/logger` 9.

```sh
npm uninstall wdio-cucumberjs-json-reporter
npm install @wdio/cucumberjs-json-reporter --save-dev
```

`reporters: ['cucumberjs-json']` resta invariato: WebdriverIO carica `@wdio/cucumberjs-json-reporter` per quel nome. Sostituisci gli import nei tuoi file degli step:

```diff
- import cucumberJson from 'wdio-cucumberjs-json-reporter'
+ import cucumberJson from '@wdio/cucumberjs-json-reporter'
```

Le opzioni sono le stesse. I file JSON seguono più fedelmente il formato Cucumber JSON. Controlla gli strumenti e gli script che li leggono:

- L'`id` dello scenario è `<feature id>;<scenario id>`, e `<feature id>;<rule id>;<scenario id>` per uno scenario in una `Rule:`, come nel formato Cucumber JSON. Prima le parti non avevano separatore.
- L'`id` della feature mantiene caratteri come `:` e `/` (solo gli spazi diventano `-`), come nel formato Cucumber JSON. I nomi dei file JSON non cambiano, ma una parte di feature di più di 200 byte (per esempio molti caratteri non ASCII) viene troncata e termina con un hash (Linux consente 255 byte in un nome di file), e un nome di dispositivo Windows come `con` inizia con `_`.
- La `keyword` della feature e dello scenario sono le parole chiave del file, per esempio `Scenario Outline` o `Fonctionnalité`, come nel formato Cucumber JSON. Prima erano sempre `Feature` e `Scenario`.
- Scenari e step hanno una `line`.
- I tag sono `{ name, line }`, come nel formato Cucumber JSON; i tag di uno scenario ricevono la riga del file della feature. Prima erano oggetti interni di Cucumber con `location`, `id` o `astNodeId` (casuale a ogni esecuzione), e i tag di uno scenario non avevano riga.
- Gli hook sono step con `hidden: true` e senza `name`. Prima un hook aveva un `name` vuoto.
- Un argomento doc string è `{ content, line }`. Prima era il testo della doc string.
- Un hook che Cucumber salta (dopo un hook fallito, o un hook che restituisce `'skipped'`) ha lo stato `skipped`, e un hook che restituisce `'pending'` ha `pending`, come nel formato Cucumber JSON. Prima erano `passed`.
- Lo stato di uno step ambiguo è `ambiguous`, come nel formato Cucumber JSON, e il suo `error_message` elenca le definizioni di step corrispondenti. Prima era `skipped` senza motivo, oppure `failed` con `cucumberOpts.failAmbiguousDefinitions`.
- Lo stato di uno step non definito è `undefined`. Prima era `failed`, oppure `pending` con `cucumberOpts.ignoreUndefinedDefinitions`.
- Uno scenario che Cucumber riesegue (`cucumberOpts.retry`) ha solo gli step del suo ultimo tentativo. Prima aveva gli step di tutti i tentativi.
- Con `cucumberOpts.tagsInTitle`, i nomi di feature e scenari, gli id e i nomi dei file non contengono tag.
- Quando un worker esegue più file di feature (spec raggruppate), il reporter scrive un file per ogni feature. Prima tutti gli scenari finivano nel file della prima feature.
- In una sessione multi-remote, i metadati provengono dalla prima istanza.

Questi elementi prima mancavano o erano errati: gli step `*`, la parola chiave degli step `But`, gli allegati dall'hook `before` di WebdriverIO, un oggetto allegato come `text/plain` (è testo JSON, non `[object Object]`), e una stringa JSON allegata come `application/json` (resta così com'è, non viene codificata una seconda volta). Le parole chiave degli step seguono l'intestazione `# language:` del file della feature, poi `cucumberOpts.language` (l'opzione `language` del reporter solo quando `cucumberOpts.language` non è impostato). Con `cucumberOpts.scenarioLevelReporter: true`, il reporter non scrive alcun file e registra un avviso: il formato richiede gli step.

### Reporter video

`wdio-video-reporter` è stato spostato nel repository di WebdriverIO come [`@wdio/video-reporter`](/docs/video-reporter). Il pacchetto della community è solo per la v9: installa `@wdio/reporter` 9 e `@wdio/logger` 9.

```sh
npm uninstall wdio-video-reporter
npm install @wdio/video-reporter --save-dev
```

Il pacchetto della community installava ffmpeg da sé. `@wdio/video-reporter` non lo fa: [installa ffmpeg](/docs/video-reporter#install-ffmpeg) su ogni macchina che esegue i test, anche in CI e nelle immagini Docker, oppure imposta l'opzione `ffmpegPath` o la variabile d'ambiente `FFMPEG_PATH`. Senza ffmpeg, il reporter registra un avviso e non crea alcun video.

```sh
brew install ffmpeg                                         # macOS
sudo apt-get update && sudo apt-get install -y ffmpeg       # Ubuntu, Debian
winget install --id Gyan.FFmpeg -e                          # Windows
```

`reporters: ['video']` resta invariato: WebdriverIO carica `@wdio/video-reporter` per quel nome. Sostituisci gli import da `wdio-video-reporter` con `@wdio/video-reporter`. Le opzioni sono le stesse, con queste modifiche:

- `snapshotCommands` usa l'ultima parte degli endpoint W3C WebDriver. Il vecchio valore predefinito elencava anche nomi del JSON Wire Protocol come `buttonup`, `moveto`, `keys` o `accept_alert`. Questi nomi non corrispondono mai a un comando v10. Usa i nomi della [lista predefinita](/docs/video-reporter#snapshotcommands), per esempio `actions`, `value` o `accept`.
- In una sessione WebDriver BiDi, il reporter cattura un fotogramma anche dopo `url`, `back`, `forward`, `refresh` e `actions`.
- In una sessione WebDriver BiDi, il reporter cattura i fotogrammi con WebDriver BiDi, e il comando successivo attende il fotogramma del comando precedente (circa 50-70 ms in Chrome), così ogni fotogramma mostra la pagina del proprio comando. Prima, in Chrome, uno screenshot all'inizio di una navigazione WebDriver BiDi poteva far attendere il test 10 secondi.
- In una sessione multi-remote, solo i comandi della prima istanza catturano un fotogramma. Prima i comandi di ogni istanza catturavano un fotogramma della prima istanza.
- Un comando `GET` legge solo la pagina, quindi non produce alcun fotogramma, tranne con `recordAllActions`. Prima `getUrl`, `getSize` o `getValue` producevano un fotogramma, perché l'ultima parte del loro endpoint (`url`, `rect`, `value`) è in `snapshotCommands`.
- La data nei nomi dei file video è `YYYY-MM-DD--HH-MM-SS-mmm` su ogni macchina. Prima usava la locale della macchina.
- `videoFormat` accetta `webm` (il predefinito) e `mp4`. Prima `videoFormat: 'default'` creava video mp4; ora registra un avviso e crea video webm. Usa `videoFormat: 'mp4'`.
- Con il reporter Allure, un test senza video non riceve più un allegato video vuoto.

### Reporter HTML

`wdio-html-nice-reporter` è stato spostato nel repository di WebdriverIO come [`@wdio/html-reporter`](/docs/html-reporter). Il vecchio pacchetto è solo per la v9.

```sh
npm uninstall wdio-html-nice-reporter
npm install @wdio/html-reporter --save-dev
```

Il nome del reporter è `html`. Cambia il nome in `reporters` e negli import:

```diff
- import { ReportAggregator } from 'wdio-html-nice-reporter'
+ import { ReportAggregator } from '@wdio/html-reporter'

  reporters: [
-     ['html-nice', { outputDir: './reports/html-reports/' }]
+     ['html', { outputDir: './reports/html-reports/' }]
  ]
```

Le opzioni sono le stesse. Modifica anche questi elementi:

- `ReportEvents` proviene da `@wdio/html-reporter`. I test che usano ancora `@rpii/wdio-report-events` funzionano, perché entrambi inviano gli stessi eventi.
- Lo script da riga di comando è `node_modules/@wdio/html-reporter/build/makeReport.js`. Prima era `node_modules/wdio-html-nice-reporter/lib/makeReport.js`.
- Con Cucumber, il report conta gli scenari, non gli step, e conta solo l'ultimo tentativo di uno scenario rieseguito.

## `$` è strict

`$` ora rappresenta __esattamente un__ elemento. Se il selettore si risolve in più di un elemento, il comando genera uno `StrictSelectorError` invece di usare silenziosamente la prima corrispondenza:

```js
// v9 — clicca il primo pulsante, anche se ce ne sono 12
await $('button').click()

// v10
await $('button').click()
// StrictSelectorError: strict mode violation: `$("button")` resolved to 12 elements, expected 1.
// Use `$$("button")` to work with all matches, `$$("button")[0]` if you explicitly want the first one,
// or narrow down the selector so it matches a single element.
```

Questo corrisponde ai [locator di Playwright](https://playwright.dev/docs/locators#strictness). Cypress è diverso: le sue query possono risolversi in più elementi, e sono i comandi di azione come [`.click()`](https://docs.cypress.io/api/commands/click#Click-all-elements-with-id-starting-with-btn) a rifiutare per impostazione predefinita un soggetto con più elementi. Un selettore che si risolve silenziosamente in più elementi è quasi sempre un bug latente: oggi passa e interagisce con l'elemento sbagliato non appena qualcuno aggiunge un secondo pulsante alla pagina.

La regola si applica a ogni passaggio di una catena (`$('form').$('input')`) e a ogni tipo di selettore accettato da `$`: selettori stringa (inclusi quelli che attraversano lo shadow DOM), funzioni JS, selettori mobile e riferimenti a strategie personalizzate.

### Cosa non è cambiato

- `$$` restituisce ancora zero o più elementi.
- I comandi helper dedicati `custom$`, `shadow$` e `react$` non sono strict: restituiscono ancora la loro prima corrispondenza, così come le loro controparti `$$`.
- Un selettore che non corrisponde a nulla restituisce ancora un elemento risolto in modo lazy, quindi `waitForExist` e l'[auto-waiting](/docs/autowait) si comportano come prima.
- Passare un riferimento a un elemento, es. `$(await browser.getActiveElement())`, si riferisce sempre a un singolo nodo e non viene mai verificato.

### Come verificare la tua suite

Non esiste un codemod per questo: solo tu puoi stabilire se una seconda corrispondenza è un bug o è intenzionale. Due approcci pratici:

1. __Esegui la tua suite.__ Ogni violazione genera un errore con il selettore e il numero di corrispondenze, che di solito basta per correggerla sul posto.
2. __Controlla in anticipo i selettori generici.__ Per ogni `$(...)` generico nei tuoi page object, stampa quanti elementi corrisponde davvero:

   ```js
   console.log(await $$('button').length) // 12 → `$('button')` è troppo generico
   ```

Poi restringi il selettore, idealmente verso una query orientata all'utente come `$('button=Submit')` o `$('aria/Submit')`, vedi [Selettori](/docs/selectors), oppure dichiara esplicitamente che vuoi la prima corrispondenza:

```js
await $('button[type="submit"]').click()
// ...oppure, se intendi davvero il primo
await $$('button')[0].click()
```

### Disattivare il comportamento

Per una singola query:

```js
await $('button', { strict: false }).click()
```

Per un intero progetto, ripristinando il comportamento della v9:

```js title="wdio.conf.js"
export const config = {
    // ...
    strictSelectors: false
}
```

Un elemento ricorda come è stato interrogato, quindi recuperarlo di nuovo, dopo un riferimento a elemento stale o tramite `waitForExist`, mantiene la modalità strict della chiamata originale.

:::info

Internamente un `$` strict invia una richiesta `findElements` invece di `findElement`, poiché contare le corrispondenze è l'unico modo per far rispettare la regola. In entrambi i casi si tratta di un solo round trip, ma è visibile ai servizi personalizzati e ai mock WebDriver che si basano sul comando `findElement`.

:::

## Liste di elementi prima dell'`await`

Dalla v10, `$$()` restituisce un [`ElementArray`](/docs/api/browser/$$): un vero array su cui puoi fare `await`. In v9 un `$$()` senza `await` era una promise.

| `$$('li')` prima dell'`await` | v9 | v10 |
| --- | --- | --- |
| `instanceof Promise` | `true` | `false` |
| `Array.isArray()` | `false` | `true` |
| `then`, `catch`, `finally` | funzioni | funzioni, finché la lista non è caricata |

Finché la lista non è caricata, `length` è una promise, e `[...list]`, `Array.from(list)` e `for...of` generano `Cannot synchronously iterate over an element list that has not resolved yet`.

Lo stesso vale per `custom$$`, `shadow$$` e `react$$`, e per `$$()` su un browser multi-remote. Un `$()` senza `await` è ancora una promise.

`await` restituisce la stessa lista, caricata e senza `then`. A quel punto `length` è un numero, e `for...of`, `[...list]` e `Array.from()` funzionano. Prima dell'`await` puoi usare `for await`, un indice (`$$('li')[0]`), `at()`, `slice()` e i metodi di iterazione asincroni (`map`, `filter`, `forEach`, ...). Questi metodi restituiscono una promise: fai l'`await` del risultato di `filter()` prima di leggere un indice.

Un indice oltre la fine di una lista `$$(selector)` non è `undefined`, nemmeno dopo l'`await`. È un elemento che attende che la lista raggiunga quell'indice, come fa `$$('li')[5]` prima dell'`await`: `isExisting()` restituisce `false` e un comando come `getText()` genera `Index out of bounds`, entrambi dopo `waitforTimeout`. In v9 `(await $$('li'))[5]` era `undefined`. Quindi `if (list[5])` è sempre vero, e `list.at(5)` non è mai `undefined`. Confronta l'indice con `length`, che non attende:

```diff
  const list = await $$('li')
- if (list[5]) {
+ if (list.length > 5) {
```

Dopo l'`await`, un indice negativo, e una lista da `slice()` o `filter()`, restituiscono `undefined` oltre la fine. Prima dell'`await`, `list[i]` con un indice intero pari o superiore a 0, e `at()`, restituiscono una promise, che è sempre truthy.

Il codice che fa l'`await` di un valore solo quando è una `Promise`, o che legge `length` senza `await`, non genera errori. Legge una promise come lunghezza: `list.length > 0` e un ciclo come `for (let i = 0; i < list.length; i++)` vedono `false`, ma `if (list.length)` e `list.length !== 0` vedono `true`. Fai sempre l'`await` del valore. `await` su un valore già caricato restituisce quel valore:

```diff
- if (value instanceof Promise) {
-     value = await value
- }
+ value = await value
```

```diff
- if ($$('button').length > 0) {
+ if (await $$('button').length > 0) {
```

## Firme dei comandi legacy

La v9 accettava ancora le vecchie forme posizionali ed emetteva un avviso. La v10 accetta solo l'oggetto delle opzioni.

Il [codemod](https://github.com/webdriverio/codemod) v10 riscrive `addCommand` e `overwriteCommand` quando il terzo argomento è un booleano, `getHTML(true)` e `getHTML(false)`, e `getCookies` quando il filtro è una stringa o un array di un solo elemento. Una chiamata `getCookies` con più di un nome resta invariata, perché un filtro corrisponde a un solo nome.

Installa prima il codemod. WebdriverIO non dipende da esso.

```sh
npm install jscodeshift @wdio/codemod
npx jscodeshift -t ./node_modules/@wdio/codemod/v10 ./e2e/
```

Usa `--parser=tsx` per i file TypeScript.

### `addCommand` e `overwriteCommand`

```diff
- browser.addCommand('myFn', fn, true)
+ browser.addCommand('myFn', fn, { attachToElement: true })

- browser.overwriteCommand('click', fn, true)
+ browser.overwriteCommand('click', fn, { attachToElement: true })
```

Un terzo argomento booleano è un errore TypeScript. A runtime genera:

```
Passing a boolean as the third argument to `addCommand` was removed in WebdriverIO v10. Use `addCommand(name, fn, { attachToElement: true })`.
```

`proto` e `instances` vanno nello stesso oggetto delle opzioni. Ometti il terzo argomento per associare un comando al browser.

### `getCookies`

I filtri stringa e array di stringhe vengono rifiutati. Passa un [oggetto filtro per i cookie](https://w3c.github.io/webdriver-bidi/#type-storage-CookieFilter). Una chiamata filtra un nome; chiamala di nuovo per un altro nome.

```diff
- await browser.getCookies('session')
- await browser.getCookies(['session', 'auth'])
+ await browser.getCookies({ name: 'session' })
+ await browser.getCookies({ name: 'auth' })
```

`getCookies()` senza argomenti restituisce ancora tutti i cookie visibili alla pagina.

### `getHTML`

```diff
- await $('h1').getHTML(false)
+ await $('h1').getHTML({ includeSelectorTag: false })
```

`getHTML()` senza argomenti include ancora il tag dell'elemento stesso.

### `newWindow`

`windowName` e `windowFeatures` non esistono più. Si applicavano solo a WebDriver Classic. Il comando accetta ancora `type`:

```diff
- await browser.newWindow('https://webdriver.io', {
-     windowName: 'WebdriverIO window',
-     windowFeatures: 'width=420,height=230,resizable,scrollbars=yes,status=1',
- })
+ await browser.newWindow('https://webdriver.io', { type: 'window' })
```

Usa `type: 'tab'` per aprire una scheda.

In una sessione WebDriver BiDi, `newWindow()` restituisce il nuovo [browsing context](/docs/api/browsingContext) e non vi si sposta. In v9 si spostava. Quindi `browser.closeWindow()` dopo `newWindow()` ora chiude la prima scheda, non quella nuova. Esegui i comandi per la nuova scheda sul context restituito da `newWindow()`, e chiudila con `closeWindow()` su quel context:

```diff
- await browser.newWindow('https://webdriver.io', { type: 'tab' })
- console.log(await browser.getTitle())
- await browser.closeWindow()
+ const tab = await browser.newWindow('https://webdriver.io', { type: 'tab' })
+ console.log(await tab.getTitle())
+ await tab.closeWindow()
```

In TypeScript il tipo del risultato è `WebdriverIO.BrowsingContext | { handle, type }`, perché una sessione WebDriver Classic restituisce l'handle della finestra. In una sessione BiDi, restringilo: `await browser.newWindow(url, { type: 'tab' }) as WebdriverIO.BrowsingContext`.

Il browser resta sulla prima scheda. Rimuovi una chiamata `switchWindow()` che vi tornava: `switchWindow` genera un errore in una sessione BiDi. Vedi [`switchToFrame`](#switchtoframe) per il modello dei browsing context.

### `startActivity`

È accettato solo l'oggetto delle opzioni. `appWaitPackage`, `appWaitActivity` e `optionalIntentArguments` non esistono più. Si applicavano solo all'endpoint HTTP di Appium rimosso. `mobile: startActivity` non li accetta, e passarli genera un errore.

```diff
- await browser.startActivity('com.example.app', '.MainActivity')
- await browser.startActivity({
-     appPackage: 'com.example.app',
-     appActivity: '.MainActivity',
-     appWaitPackage: 'com.example.app',
-     appWaitActivity: '.MainActivity',
-     optionalIntentArguments: '--ez extra true',
- })
+ await browser.startActivity({
+     appPackage: 'com.example.app',
+     appActivity: '.MainActivity',
+ })
```

## Comandi rimossi

`browser.throttle` e i comandi deprecati `touchAction` sono stati rimossi.

| v9 | v10 |
| --- | --- |
| `browser.throttle('Regular3G')` | [`browser.throttleNetwork('Regular3G')`](/docs/api/browser/throttleNetwork) |
| `browser.touchAction(...)` / `element.touchAction(...)` | L'[API Actions](/docs/api/browser/action) con un puntatore touch, oppure i comandi mobile [`tap`](/docs/api/mobile/tap) e [`swipe`](/docs/api/mobile/swipe) |

Un gesto touch con l'API Actions:

```js
await browser.action('pointer', { parameters: { pointerType: 'touch' } })
    .move({ x: 100, y: 500 })
    .down()
    .move({ x: 100, y: 100, duration: 300 })
    .up()
    .perform()
```

## `uploadFile`

`browser.uploadFile()` è stato rimosso. Comprimeva un file locale e lo inviava all'endpoint `file` di Selenium, che non fa parte di WebDriver né di WebDriver BiDi. Imposta un input di tipo file con [`element.setFiles()`](/docs/api/element/setFiles).

```diff
- const remotePath = await browser.uploadFile('/path/to/file.png')
- await $('#file-upload').setValue(remotePath)
+ await $('#file-upload').setFiles('/path/to/file.png')
+ await $('#file-upload').setFiles(['/path/to/a.png', '/path/to/b.png'])
```

`setFiles` richiede una sessione BiDi. I percorsi vengono aperti dal browser. Un percorso relativo viene risolto rispetto a `process.cwd()`. Lo staging dei file su Selenium Grid non fa parte della v10. Una suite che dipendeva da `uploadFile` per inviare byte a un nodo deve mettere il file dove il browser può leggerlo, e poi chiamare `setFiles`.

In una sessione classica locale, `element.setValue('/local/path')` digita ancora un percorso che il browser locale può già vedere. L'endpoint Selenium grezzo resta `browser.file()` per gli utenti di Grid che lo chiamano direttamente.

## `executeAsync`

`browser.executeAsync` ed `element.executeAsync` sono stati rimossi. Passa una funzione `async` a [`execute`](/docs/api/browser/execute). Il valore restituito dalla funzione, inclusa una promise restituita, è il risultato del comando. Il timeout `script` si applica ancora, anche in una sessione WebDriver BiDi: uno script che dura di più fallisce con un errore `script timeout`. Per un timeout `script` più lungo di [`bidiResponseTimeout`](/docs/configuration#bidiresponsetimeout) (180 secondi per impostazione predefinita), aumenta entrambi.

```ts
const result = await browser.execute(async (a, b) => {
    await new Promise((resolve) => setTimeout(resolve, 1000))
    return a + b
}, 1, 2)
```

Elimina la callback `done` di WebDriver. Uno script stringa che si aspettava quella callback come ultimo argomento deve invece restituire una promise. A runtime, `executeAsync` non è una funzione.

## `switchToFrame`

`browser.switchToFrame` non è più un comando pubblico.

In una sessione WebDriver BiDi, `switchFrame` e `switchWindow` generano un errore. Una scheda, una finestra e un frame sono un `WebdriverIO.BrowsingContext` che tieni in mano. `browser.url()` naviga il context di primo livello iniziale della sessione e lo restituisce. `browser.newWindow()` restituisce il nuovo context e non vi si sposta. `context.frame()` restituisce un frame figlio. `context.parent` è il frame da cui lo hai aperto.

```ts
const page = await browser.url('https://example.com')
const other = await browser.newWindow('https://webdriver.io', { type: 'tab' })
console.log(await page.getTitle())
const frame = await page.frame('iframe')
console.log(await frame.$('h1').getText())
const pages = await browser.browsingContexts()
```

`context.url` è la stringa dell'URL del documento. Naviga un context che tieni in mano con `context.navigate(url)`. I metadati di caricamento di `browser.url()` sono in `context.request`.

In una sessione Classic, continua a chiamare `switchFrame` con un elemento, o `null` per il frame di primo livello. Lì una stringa o una funzione vengono rifiutate.

```diff
- await browser.switchToFrame(await $('iframe'))
- await browser.switchToFrame(null)
+ await browser.switchFrame($('iframe'))
+ await browser.switchFrame(null)
```

## `setTimeout`

La chiave del JSON Wire Protocol `page load` viene rifiutata. Usa `pageLoad`.

```diff
- await browser.setTimeout({ 'page load': 10000 })
+ await browser.setTimeout({ pageLoad: 10000 })
```

`implicit` e `script` sono invariati.

## Accesso alle istanze multi-remote

Un browser multi-remote non memorizza più ogni sessione come una propria proprietà. Lo stesso vale per un elemento multi-remote. `getInstance` e `select` sono il modo per riferirsi a una sessione.

```diff
- await browser.myChromeBrowser.url('https://webdriver.io')
- await (await browser.$('button')).myChromeBrowser.click()
+ await browser.getInstance('myChromeBrowser').url('https://webdriver.io')
+ await (await browser.$('button')).getInstance('myChromeBrowser').click()
```

Un'augmentation TypeScript che aggiunge `myChromeBrowser: WebdriverIO.Browser` a `WebdriverIO.MultiRemoteBrowser` non corrisponde più a una proprietà a runtime. Elimina quell'augmentation e chiama `getInstance`.

Con il testrunner e `injectGlobals` attivo, il nome dell'istanza è ancora una globale (`myChromeBrowser.url(...)`). Quella globale è la singola sessione. Non è `browser.myChromeBrowser`.

I risultati dei comandi restano nell'ordine delle capability: la prima voce appartiene alla prima chiave dell'oggetto delle capability.

`browser.$$()` su un browser multi-remote restituisce un `WebdriverIO.MultiRemoteElementArray`, non un semplice `MultiRemoteElement[]`. È comunque un array, quindi una lettura per indice come `elements[0]` continua a funzionare.

I suoi metodi `map`, `filter`, `forEach`, `find`, `findIndex`, `some`, `every` e `reduce` sono asincroni, come su un `WebdriverIO.ElementArray`, e restituiscono una promise, anche dopo l'`await`. Lo stesso vale per le liste restituite da `custom$$()`, `react$$()` e `shadow$$()`. In v9 erano i metodi sincroni di un array semplice:

```diff
  const items = await browser.$$('li')
- const ids = items.map((item) => item.selector)
+ const ids = await items.map((item) => item.selector)
```

`custom$()`, `react$()` e, su un elemento, `shadow$()`, `nextElement()`, `previousElement()` e `parentElement()` restituiscono un unico `WebdriverIO.MultiRemoteElement`, come fa `$()`. In v9 restituivano un elemento per istanza in un array semplice. Leggi l'elemento di un browser con `getInstance`:

```diff
- const [chromeHost, firefoxHost] = await browser.custom$('byTestId', 'host')
- await chromeHost.click()
+ const host = await browser.custom$('byTestId', 'host')
+ await host.getInstance('myChromeBrowser').click()
```

`custom$$()`, `react$$()` e, su un elemento, `shadow$$()` restituiscono un unico `WebdriverIO.MultiRemoteElementArray`, come fa `$$()`. In v9 restituivano una lista per istanza in un array semplice. Ogni voce si riferisce a tutte le istanze. Un'istanza che trova meno elementi non ha alcun elemento a quell'indice:

```diff
- const [chromeItems, firefoxItems] = await browser.custom$$('byTestId', 'item')
- await chromeItems[0].click()
+ const items = await browser.custom$$('byTestId', 'item')
+ await items[0].getInstance('myChromeBrowser').click()
```

`WebdriverIO.MultiRemoteElement['selector']` ha il tipo `Selector`, come `WebdriverIO.Element['selector']`. In v9 aveva il tipo `string`, ma il valore poteva essere anche una funzione o un riferimento a una strategia personalizzata. Il codice TypeScript che lo usa come stringa, per esempio `element.selector.includes('…')`, deve prima verificarne il tipo.

`WDIO_ENABLE_MULTI_REMOTE_SELECT` e `WDIO_ENABLE_MULTI_REMOTE_ELEMENT_ARRAY` sono stati rimossi. `select()` è sempre disponibile, e `$$()` restituisce sempre l'array di elementi descritto sopra. Elimina entrambe le variabili.

## Risposte mock binarie

`mock.respond()` e `mock.respondOnce()` accettano payload `Uint8Array` e `ArrayBuffer`, incluso un `Buffer` tramite polyfill nei test dei componenti senza un `Buffer` globale.

`mock.getBinaryResponse()` ora è tipizzato come `Uint8Array | null`. Restituisce ancora un `Buffer` in Node.js, ma restituisce un `Uint8Array` nel browser. Per usare i metodi specifici di Buffer in Node.js, converti prima un risultato non nullo:

```diff
- const base64 = mock.getBinaryResponse(requestId)?.toString('base64')
+ const bytes = mock.getBinaryResponse(requestId)
+ const base64 = bytes === null ? undefined : Buffer.from(bytes).toString('base64')
```

## Mock di rete multi-remote

`browser.mock()` su un browser multi-remote restituisce un `WebdriverIO.MultiRemoteMock`, non un array di mock. `respond`, `restore` e gli altri metodi del mock vengono eseguiti su ogni istanza. Leggi le richieste catturate dal mock per un singolo browser. Usa il tipo `WebdriverIO.MultiRemoteMock` dal namespace globale `WebdriverIO`.

```diff
- const [chromeMock, firefoxMock] = await browser.mock('*/api')
- expect(chromeMock.calls).toHaveLength(1)
+ const mock = await browser.mock('*/api')
+ mock.respond({ ok: true })
+ expect(mock.getInstance('myChromeBrowser').calls).toHaveLength(1)
+ expect(mock.instances).toEqual(['myChromeBrowser', 'myFirefoxBrowser'])
```

`getInstance` genera `Multi-remote object has no instance named "<name>"` quando il nome non è tra le `instances`. Un mock da `browser.select('myFirefoxBrowser', 'myChromeBrowser')` elenca quelle istanze in quell'ordine, che può differire da `browser.instances`. Non dare per scontato che `mocks[0]` sia un browser specifico.

## Risposte mock che saltano il backend

`mock.respond(..., { fetchResponse: false })` non chiama il backend. In v9 un mock che filtrava anche su `statusCode` o `responseHeaders` ignorava quel filtro e rispondeva comunque a ogni richiesta corrispondente. In v10 `respond()` e `respondOnce()` generano un errore, perché quei filtri possono essere valutati solo dalla risposta del backend.

```diff
- const mock = await browser.mock('**/users', { statusCode: 200 })
- mock.respond({ name: 'Ada' }, { fetchResponse: false })
+ const mock = await browser.mock('**/users')
+ mock.respond({ name: 'Ada' }, { fetchResponse: false })
```

Per mantenere il filtro, ometti `fetchResponse`, così il mock recupera la risposta, verifica lo stato o gli header, e poi sostituisce il body.

## Riferimenti agli elementi

Gli id degli elementi usano la chiave W3C WebDriver `element-6066-11e4-a52e-4f735466cecf` e la proprietà `elementId`. Il campo `ELEMENT` del JSON Wire Protocol non fa più parte del contratto degli elementi.

`WebdriverIO.Element` non dichiara più `ELEMENT`. Leggi `element.elementId`, che le istanze di elemento espongono già.

`browser.execute`, e gli script integrati che inviano un elemento nella pagina (`getHTML`, `isClickable`, `isDisplayed`, `scrollIntoView` e gli altri), passano solo il riferimento W3C:

```diff
- await browser.execute((el) => el.ELEMENT, elem)
+ await browser.execute(
+     (el) => el['element-6066-11e4-a52e-4f735466cecf'],
+     elem
+ )
```

Un body di find-element che contiene solo `{ ELEMENT: '...' }` non è un elemento. Includi la chiave W3C. Se sono presenti entrambe le chiavi, WebdriverIO usa l'id W3C.

Jasmine stampa il risultato di un `$()` concatenato tramite `toJSON`. Quel valore è lo stesso riferimento W3C, `{ 'element-6066-11e4-a52e-4f735466cecf': elementId }`.

Con WebDriver BiDi, uno script che restituisce una `NodeList` (per esempio da `querySelectorAll`) o una `HTMLCollection` (per esempio `element.children`) ora fornisce una lista di riferimenti a elementi, come fa WebDriver Classic. In v9 forniva valori BiDi grezzi, quindi `browser.execute` restituiva oggetti che non sono elementi, e una strategia `custom$` o `custom$$` che restituiva `querySelectorAll(...)` non trovava alcun elemento. Un workaround come `Array.from(document.querySelectorAll(...))` funziona ancora, e puoi rimuoverlo:

```diff
  browser.addLocatorStrategy('byCss', (selector) =>
-     Array.from(document.querySelectorAll(selector))
+     document.querySelectorAll(selector)
  )
```

## Selettori React

`react$` e `react$$` ora funzionano con React dalla 16 alla 19, per un'app che si avvia con `createRoot` o con `ReactDOM.render`. Prima `browser.react$` e `browser.react$$` fallivano con React 18 e successivi (`Could not find the root element of your application`), e in ogni versione un risultato poteva provenire dal render precedente all'ultimo aggiornamento, quindi un componente aggiunto da un cambiamento di stato non veniva trovato.

Su una pagina in cui React non ha ancora renderizzato una root, i comandi ora la attendono fino a 5 secondi prima di fallire. Prima fallivano subito, quindi un'app che si avviava in ritardo non veniva trovata.

I comandi non usano più la libreria [resq](https://github.com/baruchvlz/resq), e WebdriverIO non la installa più. Le regole dei selettori non cambiano (vedi [Selettori React](/docs/selectors#react-selectors)), con queste eccezioni:

- `react$` con sia `props` sia `state` trova un componente che corrisponde a entrambi. Prima ignorava `props` quando era fornito anche `state`.
- `react$$` restituisce ogni nodo DOM una sola volta. Prima un higher-order component e il suo figlio restituivano lo stesso elemento due volte in alcuni browser.
- Un fragment che contiene un fragment restituisce un'unica lista piatta di nodi. Prima `react$` poteva restituire una lista.
- Un filtro con un valore `null` funziona. Prima falliva con `Cannot convert undefined or null to object`.
- Senza uno scope di elemento, i comandi cercano in tutte le root React della pagina, nell'ordine del documento, anche le root all'interno di altre root e le root negli shadow root aperti. `react$` restituisce la prima corrispondenza. Prima cercavano solo nella prima root, anche in una che React non aveva ancora renderizzato o aveva smontato, e non cercavano negli shadow root. Su una pagina con più di una root, `react$$` ora può restituire più elementi: per cercare in una sola root, chiama il comando sul suo contenitore, per esempio `$('#root').react$$('MyComponent')`.
- Sul contenitore di una root all'interno di un'altra root, i comandi cercano nella root interna. Prima cercavano nella root esterna.
- Sul browsing context di un frame, e su un elemento di un frame, i comandi funzionano. Prima il comando del context falliva con `this.executeScript is not a function`, e il comando dell'elemento falliva con `Could not find instance of React in given element`.

Lo script interno `webdriverio/scripts/resq` è stato rimosso.

## Test dei componenti

`@wdio/browser-runner` riesporta `fn`, `spyOn` e i tipi dei mock da `@vitest/spy` 5 (prima 3). Un mock che il tuo codice chiama con `new` richiede un'implementazione `function` o `class`. Una arrow function genera `is not a constructor`, e `mockReturnValue` genera un errore quando il mock viene chiamato con `new`.

```diff
- const Client = fn(() => ({ close: fn() }))
+ const Client = fn(function () { return { close: fn() } })
```

Per le altre modifiche agli spy, vedi la [guida alla migrazione di Vitest](https://vitest.dev/guide/migration).

## Puppeteer

`webdriverio` accetta `puppeteer-core` `>=24 <26`, incluso Puppeteer 25. `getPuppeteer()` e `@wdio/lighthouse-service` sono testati su quella linea.

## ESLint

`eslint-plugin-wdio` richiede ESLint 10. ESLint 9 ha raggiunto la [fine del ciclo di vita](https://eslint.org/version-support/) il 2026-08-06 e non è più supportato. Con TypeScript, usa `typescript-eslint` 8.56.0 o successivo.

```sh
npm install --save-dev eslint@10 eslint-plugin-wdio
```

`eslint-plugin-wdio` esporta solo la flat config `flat/recommended`. Il nome eslintrc `plugin:wdio/recommended` è stato rimosso.

```js
import { configs as wdioConfig } from 'eslint-plugin-wdio'

export default [
    wdioConfig['flat/recommended'],
]
```

La configurazione consigliata passa alla regola type-aware `wdio/no-floating-promise`, al posto di `wdio/await-expect`, quando il pacchetto `typescript-eslint` è installato. Installare solo `@typescript-eslint/eslint-plugin` non basta.

```sh
npm install --save-dev typescript typescript-eslint
```

In questa modalità, la configurazione analizza ogni file a cui corrisponde con il project service di TypeScript. Limitala ai file TypeScript, e assicurati che facciano parte di un `tsconfig.json`:

```js
import { configs as wdioConfig } from 'eslint-plugin-wdio'

export default [
    { files: ['**/*.{ts,mts,cts,tsx}'], ...wdioConfig['flat/recommended'] },
]
```

Un file JavaScript corrispondente che non fa parte del progetto TypeScript, come `wdio.conf.js`, fallisce con "was not found by the project service". Per eseguire il lint anche dei file JavaScript, imposta `"allowJs": true`, aggiungili a `include` in `tsconfig.json`, e amplia il pattern a `**/*.{js,mjs,cjs,ts,mts,cts,tsx}`.

## Framework personalizzati

`setupExpect` su un adapter di framework personalizzato non accetta più una `Map` di matcher, e il runner non aggiunge più un metodo `entries` all'oggetto dei matcher. Itera con `Object.entries(wdioMatchers)`.

## Profilo Firefox

`@wdio/firefox-profile-service` non tratta più `legacy` come opzione del servizio. Quel flag si applicava solo a Firefox 55 e versioni precedenti. Eliminalo. Un `legacy: true` rimasto viene scritto nel profilo come una preferenza chiamata `legacy`.

## Protocollo WebDriver

Ogni sessione è una sessione [W3C WebDriver](https://w3c.github.io/webdriver/). WebdriverIO non parla il JSON Wire Protocol né il Mobile JSON Wire Protocol. La v9 ha rimosso quei comandi. La v10 elimina anche l'envelope di risposta usato da quei protocolli, quindi un server che lo restituisce ancora non può avviare una sessione.

`browser.isW3C` è stato rimosso, incluso il valore inoltrato in precedenza nel messaggio `sessionStarted` del worker. Passare `isW3C` ad `attach` viene ignorato. Il set di comandi BiDi resta sul client. Una connessione BiDi attiva dipende ancora da `webSocketUrl`.

### `browser.back()` e `browser.forward()` su BiDi

Le chiamate restano `await browser.back()` e `await browser.forward()`. Nessuno dei due comandi accetta argomenti o restituisce un valore.

In una sessione BiDi questi comandi chiamano `browsingContext.traverseHistory` con `delta` `-1` o `1` sul browsing context di primo livello, quindi attendono lo stato di readiness del documento corrispondente a `pageLoadStrategy`. `none` ritorna quando il comando di attraversamento viene accettato. `eager` attende `browsingContext.domContentLoaded`. `normal`, il predefinito, attende `browsingContext.load`. Un ripristino dalla back-forward cache non emette quegli eventi; il comando ritorna quando il `readyState` del documento confermato corrisponde già alla strategia. L'attesa usa il timeout di caricamento pagina della sessione (`timeouts.pageLoad`, 300000 ms se non impostato). Le sessioni Classic inviano ancora a `POST /session/:sessionId/back` e `POST /session/:sessionId/forward`.

Una voce della cronologia mancante viene ancora rifiutata. Su BiDi il messaggio proviene da `browsingContext.traverseHistory` e contiene `no such history entry`, invece del testo dell'errore WebDriver classico. Un attraversamento che non raggiunge mai lo stato di readiness atteso viene rifiutato con `History traversal timed out after <ms>ms waiting for browsingContext.domContentLoaded` o `browsingContext.load`.

### Risposta di nuova sessione

Create Session deve restituire il body W3C. WebdriverIO legge `value.sessionId` e `value.capabilities`:

```json
{
  "value": {
    "sessionId": "8e8a5c2e",
    "capabilities": {
      "browserName": "chrome",
      "browserVersion": "131.0.6778.85"
    }
  }
}
```

Un body del JSON Wire Protocol viene rifiutato. Quel body mette `sessionId` e `status` accanto a `value`, e mette le capability direttamente in `value`:

```json
{
  "sessionId": "8e8a5c2e",
  "status": 0,
  "value": {
    "browserName": "chrome",
    "version": "131.0"
  }
}
```

La creazione della sessione genera allora `WebDriver new session response is missing a session id or capabilities. WebdriverIO requires a W3C WebDriver server.` Lo stesso errore viene generato quando manca `value.capabilities`, anche se `value.sessionId` è presente.

Un oggetto di capability piatto nella tua configurazione è ancora valido. WebdriverIO racchiude `{ browserName: 'chrome' }` in `alwaysMatch` prima di inviare la richiesta. Le chiavi con prefisso del vendor mescolate a chiavi al di fuori del set di capability W3C vengono ancora rifiutate. Metti le impostazioni del vendor in `sauce:options`, `bstack:options`, `appium:options` o un'altra chiave con prefisso.

### Risposte dei comandi

Il risultato di un comando è `{ "value": … }`. HTTP 200 senza `error` in `value` indica successo. Un elemento mancante è HTTP 404 con `value.error` impostato a `"no such element"`, il che consente ancora la ricerca lazy di un elemento. Uno `status` numerico nel body viene ignorato, inclusi `status: 0` e il vecchio codice `status: 7` ("no such element"). Invia invece l'oggetto di errore W3C.

Il tipo di errore esportato `JSONWPCommandError` ora è `SessionRequestError`.

### Server

I driver su cui gira WebdriverIO parlano già W3C sulla connessione client:

- ChromeDriver usa W3C per impostazione predefinita da Chrome 75. Edge basato su Chromium si comporta allo stesso modo. L'attuale ChromeDriver accetta ancora `goog:chromeOptions.w3c: false`, che riporta quella singola sessione al protocollo legacy. WebdriverIO non supporta questa opzione.
- geckodriver e safaridriver di Apple sono solo W3C. Una risposta di Safari che omette `platformName` o `browserVersion` è comunque W3C.
- Selenium 4 e Grid 4 parlano W3C. Grid ha smesso di tradurre il JSON Wire Protocol nella 4.9.
- Appium 2 ha abbandonato il JSON Wire Protocol e il Mobile JSON Wire Protocol. Appium 3 ha abbandonato anche le forme residue dei parametri. La v10 richiede Appium 3, trattato più avanti. Una sessione mobile che omette `setWindowRect` è comunque W3C; quella capability indica che il dispositivo non può ridimensionare una finestra.

Questi server parlano ancora il JSON Wire Protocol e non sono supportati: Selenium 3, PhantomJS, EdgeHTML (`--jwp`) e WinAppDriver collegato direttamente. Il driver Windows di Appium resta supportato come client W3C. Traduce i comandi per WinAppDriver, incluso Get Element Property verso l'endpoint degli attributi. Punta WebdriverIO su Appium, non sulla porta di WinAppDriver.

[`@wdio/jsonwp-service`](https://www.npmjs.com/package/@wdio/jsonwp-service) non fa funzionare quei server con la v10. L'avvio della sessione richiede comunque il body W3C descritto sopra, e i risultati dei comandi ignorano comunque uno `status` numerico. Resta su WebdriverIO 9 se quel server è ancora necessario.

`webdriver.remote.sessionid` non identifica più una sessione Selenium standalone. Selenium Grid 4 viene ancora rilevato da `se:cdp`.

La chiave di timeout `page load` è trattata in [`setTimeout`](#settimeout). Gli id degli elementi sono trattati in [Riferimenti agli elementi](#element-references). Su desktop, `[name="..."]` è un selettore CSS. La strategia di localizzazione `name` resta per le sessioni mobile.

## Appium

WebdriverIO 10 richiede **Appium 3** e gli attuali driver ufficiali (UiAutomator2, XCUITest, Espresso, Windows, Mac2 e così via). Appium 1.x e 2.x non sono supportati. Resta su WebdriverIO 9 se non puoi aggiornare il server.

```sh
npm i -D appium@^3
appium driver update installed
```

`@wdio/appium-service` dichiara una peer dependency opzionale `appium` `>=3` e si rifiuta di avviare un server più vecchio. `create-wdio` installa `appium@^3` quando Appium manca o è più vecchio della 3.

I vendor cloud che espongono ancora Appium 2 necessitano di un'immagine Appium 3, altrimenti devi restare su WebdriverIO 9.

### I comandi mobile non ripiegano più su HTTP

In v9 molti helper mobile provavano `browser.execute('mobile: …')` e, in caso di errore di metodo sconosciuto, ripiegavano su un endpoint HTTP di Appium rimosso. In v10 quel fallback non esiste più: lo stesso errore ti dice di aggiornare ad Appium 3. Preferisci i comandi mobile di WebdriverIO (`browser.lock()`, `browser.shake()`, …) oppure `browser.execute('mobile: …')` direttamente.

### Comandi di protocollo rimossi

Appium 3 [ha rimosso molti endpoint deprecati del base driver](https://appium.io/docs/en/latest/guides/migrating-2-to-3/). WebdriverIO non espone più metodi client per la maggior parte di quelle route (per esempio `appiumLock`, `touchPerform` e la mappa del Mobile JSON Wire Protocol). Usa invece le W3C Actions, il comando mobile corrispondente o un metodo execute `mobile:` del driver.

### Scope di `--allow-insecure` in Appium

Appium 3 richiede un prefisso di scope del driver o `*` sulle funzionalità `--allow-insecure`, per esempio `uiautomator2:adb_shell` o `*:adb_shell`.

### Le capability Appium senza prefisso non selezionano più una sessione Appium

`automationName`, `deviceName` e `appiumVersion` senza il prefisso `appium:` non indicano più a WebdriverIO di saltare il driver del browser e collegare il servizio Appium. Usa la capability con prefisso, oppure annidala sotto `appium:options`:

```diff
- capabilities: { platformName: 'Android', automationName: 'UiAutomator2', deviceName: 'emulator' }
+ capabilities: {
+     platformName: 'Android',
+     'appium:automationName': 'UiAutomator2',
+     'appium:deviceName': 'emulator'
+ }
```

`wdio repl` ora emette quelle chiavi con prefisso, inclusi `appium:app`, `appium:platformVersion` e `appium:udid`.

### `getValue` su mobile legge la proprietà dell'elemento

`element.getValue()` chiama Get Element Property in ogni sessione, incluso Appium 3. In una sessione mobile prima chiamava Get Element Attribute.

### Firma di `stopRecordingScreen` allineata a `startRecordingScreen`

`driver.stopRecordingScreen` ora accetta solo un singolo argomento `options`, invece dei 4 argomenti precedenti, allineandosi a `driver.startRecordingScreen`. Sposta i singoli argomenti all'interno di un oggetto:

```diff
- driver.stopRecordingScreen('webdriver.io', undefined, undefined, 'POST')
+ driver.stopRecordingScreen({ remotePath: 'webdriver.io', method: 'POST' })
```

## Nomenclatura multi-remote

Le API scritte `multiremote` o `Multiremote` ora sono in camelCase / PascalCase come `multiRemote` / `MultiRemote`. I vecchi nomi non hanno alias.

| v9 | v10 |
|----|-----|
| `multiremote()` (`webdriverio`) | `multiRemote()` |
| `WebdriverIO.MultiremoteConfig` | `WebdriverIO.MultiRemoteConfig` |
| `isMultiremote` sul browser e sui risultati di `$` e `$$` | `isMultiRemote` |
| `Capabilities.RequestedMultiremoteCapabilities` | `Capabilities.RequestedMultiRemoteCapabilities` |
| `Capabilities.WithRequestedMultiremoteCapabilities` | `Capabilities.WithRequestedMultiRemoteCapabilities` |
| `runner.isMultiremote` (reporter) | `runner.isMultiRemote` |
| `Launcher#isMultiremote`, `Launcher#isParallelMultiremote` (`@wdio/cli`) | `isMultiRemote`, `isParallelMultiRemote` |
| `isMultiremote` in `Workers.WorkerMessage`, `WorkerInstance` (`@wdio/local-runner`) e `SpecReporter#getTestLink()` | `isMultiRemote` |
| `browser.multiremoteFetch()` (`@wdio/webdriver-mock-service`) | `browser.multiRemoteFetch()` |

Cerca `multiremote` e `Multiremote` (distinguendo maiuscole e minuscole) e sostituisci ogni corrispondenza. Anche i report Allure etichettano i test multi-remote con `isMultiRemote` invece di `isMultiremote`.

## Display virtuali su Linux

`@wdio/xvfb` è sostituito da `@wdio/display-server`. Invece di racchiudere ogni worker in `xvfb-run`, il testrunner avvia un unico display server per l'intera esecuzione, prima dell'hook `onPrepare` di qualsiasi servizio. Preferisce Weston in modalità headless e ripiega su Xvfb. Vedi [Headless e display server](/docs/headless-and-display-servers) per i dettagli.

Le opzioni sono state rinominate. I vecchi nomi funzionano ancora in v10 ma registrano un avviso di deprecazione, e verranno rimossi nella v11. Se imposti entrambi i nomi, prevale quello nuovo:

```diff
- autoXvfb: false,
+ displayServerEnabled: false,
- xvfbAutoInstall: true,
+ displayServerAutoInstall: true,
- xvfbAutoInstallMode: 'sudo',
+ displayServerAutoInstallMode: 'sudo',
- xvfbAutoInstallCommand: 'my-install-command',
+ displayServerAutoInstallCommand: 'my-install-command',
```

`xvfbMaxRetries` e `xvfbRetryDelay` non hanno effetto, e verranno anch'essi rimossi nella v11. L'avvio non viene più ritentato: se Weston non si avvia, il testrunner prova Xvfb, e se nessuno dei due si avvia, l'esecuzione prosegue senza display.

Una configurazione che imposta una delle quattro opzioni rinominate senza il suo sostituto, e non imposta `displayServer`, continua a usare Xvfb come faceva la v9. A meno che non disattivi il display server, registra anche `Preferring Xvfb, as v9 did, because the config sets v9 display keys`. Una volta rinominate le opzioni, aggiungi `displayServer: 'xvfb'` per mantenere Xvfb, oppure omettilo per preferire Weston. In modalità auto, un comando di installazione personalizzato viene eseguito prima per Weston, e di nuovo per Xvfb solo se Weston non è ancora disponibile o non si avvia e Xvfb manca ancora, quindi imposta `displayServer` sul server che il comando installa per saltare il tentativo con l'altro server.

L'installazione automatica non supporta più `yum`, che la v9 usava sugli host senza `dnf`. La v10 rileva solo `apt-get`, `dnf`, `zypper`, `pacman`, `apk` e `xbps-install`, quindi installa Xvfb manualmente su un host che ha solo `yum`.

Un array `xvfbAutoInstallCommand` veniva eseguito tramite una shell in v9, quindi elementi come `&&` o `VAR=value` funzionavano. Ora gli array vengono eseguiti senza shell con entrambi i nomi dell'opzione, quindi usa una stringa per la sintassi della shell.

Altre modifiche che potresti notare:

- Tutti i worker condividono un unico display. In v9 ogni worker aveva un proprio display. Le pagine di Chrome ed Edge ora possono non avere il focus, vedi [Focus della finestra](/docs/headless-and-display-servers#window-focus).
- Il numero di display di Xvfb non è fisso. Leggilo da `DISPLAY` invece di presumere `:99`.
- Un host con solo `WAYLAND_DISPLAY` impostato ora viene considerato dotato di display. La v9 lì eseguiva i worker sotto Xvfb, poiché `DISPLAY` non era impostato. La v10 non avvia nulla, apre le finestre del browser sul tuo compositor e imposta `XDG_SESSION_TYPE`, `GDK_BACKEND` ed `ELECTRON_OZONE_PLATFORM_HINT` a `wayland` per l'esecuzione. Per eseguirli sotto Xvfb come prima, rimuovi `WAYLAND_DISPLAY` e imposta `displayServer: 'xvfb'`.
- Lo schermo predefinito è 1920x1080. La v9 usava il valore predefinito di `xvfb-run`, che è 1280x1024 su Debian e Ubuntu e 640x480 su Fedora, RHEL e Arch. Per mantenere la dimensione usata dalle tue baseline, imposta `displayServerWidth` e `displayServerHeight` su di essa.
- I browser scelgono Wayland o X11 in base al `XDG_SESSION_TYPE` impostato dal display server. Sotto Weston, WebdriverIO aggiunge anche `--ozone-platform=wayland` a Chrome ed Edge che avvia, poiché Chrome ed Edge prima della 140 (Chrome for Testing prima della 135) ignorano `XDG_SESSION_TYPE`. Weston non fornisce `DISPLAY`, quindi se i tuoi test o strumenti hanno bisogno di X11, imposta `displayServer: 'xvfb'`.
- Se usavi direttamente `XvfbManager` o l'istanza `xvfb` di `@wdio/xvfb`, usa invece `DisplayServerManager` di `@wdio/display-server`. Dove eseguivi `xvfb.init()` e racchiudevi i comandi in `xvfb-run`, o avviavi processi tramite `ProcessFactory`, avvia un display e passa il suo ambiente ai processi che ne hanno bisogno. L'esempio usa Xvfb a 1280x1024, come faceva la v9 su Debian e Ubuntu. Su un host in cui è impostato solo `WAYLAND_DISPLAY`, rimuovilo prima, altrimenti `startDaemon()` non avvia nulla:

  ```js
  import { spawn } from 'node:child_process'
  import { once } from 'node:events'
  import { DisplayServerManager } from '@wdio/display-server'

  const manager = new DisplayServerManager({ displayServer: 'xvfb' })
  const daemon = await manager.startDaemon({ width: 1280, height: 1024 })
  // startDaemon() restituisce null anche quando un display esiste già
  if (!daemon && manager.shouldRun()) {
      throw new Error('Xvfb could not be started')
  }
  try {
      const child = spawn('your-command', { shell: true, stdio: 'inherit', env: { ...process.env, ...daemon?.env } })
      const [code] = await once(child, 'exit')
      process.exitCode = code ?? 1
  } finally {
      await daemon?.stop()
  }
  ```

## Emulazione

`browser.emulate()` pilota il modulo di emulazione di WebDriver BiDi per il browsing context di primo livello corrente. La v9 iniettava uno script di preload che modificava `navigator.geolocation.getCurrentPosition`, `navigator.userAgent`, `window.matchMedia` e `navigator.onLine`. Quegli script non esistono più. `browser.emulate('clock', …)` installa ancora timer fittizi nella pagina corrente e nelle pagine aperte successivamente.

Per gli scope BiDi non è più necessario ricaricare la pagina.

```diff
  await browser.emulate('onLine', false)
- // cambiava solo `navigator.onLine`; il traffico continuava a fluire
+ // il browsing context è offline, inclusi fetch, WebSocket e WebTransport
```

- `onLine: false` chiama `emulation.setNetworkConditions` con `{ type: 'offline' }`. `true` e il ripristino dello scope lo annullano. Throughput e latenza restano su `browser.throttleNetwork()`.
- `colorScheme` imposta la media feature `prefers-color-scheme`, quindi il CSS `@media (prefers-color-scheme)` segue `matchMedia`.
- `userAgent` è l'override dello user agent del browser, non una proprietà `navigator.userAgent` modificata.
- `geolocation` usa lo stack di geolocalizzazione del browser. Una pagina può comunque richiedere `browser.setPermissions({ name: 'geolocation' }, 'granted')`. `{ error: 'positionUnavailable' }` segnala quell'errore invece delle coordinate.
- `colorScheme` e `media` condividono un'unica mappa di media feature. La chiamata successiva sostituisce l'intera mappa, e il ripristino di uno dei due scope la annulla.
- `device` imposta user agent, viewport, touch, layout del testo mobile e viewport meta dal descrittore del dispositivo. Non modifica `screen` né `orientation`.

I nuovi scope sono `media`, `locale`, `timezone`, `touch`, `orientation`, `screen`, `viewportMeta`, `textLayout`, `scripting`, `scrollbar` e `forcedColors`. Un browser che non implementa un comando rifiuta la chiamata con il proprio errore (`unknown command` o `unsupported operation`). WebdriverIO non ripiega su uno script di preload né su CDP. Se `device` viene rifiutato a metà, vengono ripristinati user agent, viewport, touch, layout del testo e viewport meta precedenti.

`wdio session emulate` accetta gli stessi scope. Non ti chiede più di ricaricare per un override che si applica immediatamente. I preset di `emulate network` ed `emulate cpu` sono invariati e restano solo per Chromium. Vedi [Emulazione](/docs/emulation).

## Prossimi passi

- Copia la [skill di migrazione](#migrate-with-a-coding-agent) nel progetto e chiedi a un agente di applicarla.
- [WebdriverIO per agenti di programmazione](/docs/ai-agents) per scrivere nuovi test v10.
- [Headless e display server](/docs/headless-and-display-servers) quando la suite viene eseguita su Linux.