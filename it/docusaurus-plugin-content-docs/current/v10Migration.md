---
id: v10-migration
title: Da v9 a v10
description: Aggiorna un progetto WebdriverIO v9 alla v10, con tutte le modifiche incompatibili e una skill per coding agent che applica questa guida.
---

Questa guida raccoglie le modifiche incompatibili di WebdriverIO `v10` e spiega cosa devi fare per ciascuna.

A differenza delle major precedenti, la maggior parte di queste modifiche non può essere applicata dal [codemod](https://github.com/webdriverio/codemod) di WebdriverIO, perché dipende da cosa significano davvero i tuoi test. Le [firme dei comandi legacy](#legacy-command-signatures) qui sotto sono sostituzioni meccaniche. Ogni altra sezione descrive come trovare i punti interessati nella tua suite.

## Migrare con un coding agent

Fornisci al tuo agent la skill di migrazione v10 e chiedigli di migrare la suite a WebdriverIO v10 seguendo questa pagina. La skill è la procedura: cosa cercare, quale codemod eseguire e quando fermarsi. Questa pagina è la fonte di riferimento per ogni modifica incompatibile.

Installala dal progetto che stai aggiornando. La [CLI skills](https://skills.sh) legge [`.agents/skills/wdio-v10-migration/SKILL.md`](https://github.com/webdriverio/webdriverio/blob/main/.agents/skills/wdio-v10-migration/SKILL.md) da questo repository e la scrive nella directory delle skill degli agent che scegli:

```sh
npx skills add webdriverio/webdriverio --skill wdio-v10-migration
```

`--skill wdio-v10-migration` installa questa skill. Le skill per lavorare sul repository di WebdriverIO sono contrassegnate come interne e non vengono proposte. La CLI chiede per quali agent installarla e scrive la skill nella directory di progetto di ciascun agent. Puoi anche allegare quel file alla chat.

I selettori strict e le liste `specs` / `exclude` senza prefisso nelle capability emergono solo quando la suite viene eseguita. La skill non può deciderli basandosi solo sul codice sorgente.

## Node.js

WebdriverIO v10 richiede Node.js 22.19.0 o successivo. Node.js 18 e 20 non sono più supportati. La CI copre Node.js 22, 24 e 26.

## Test dei componenti

Il browser runner funziona ancora in Chrome 90, Edge 90, Firefox 90 e Safari 14.1 o versioni successive. Vedi [Supporto dei browser](/docs/component-testing#browser-support).

Il codice passato a `browser.execute` resta a ES2021, così può essere eseguito nei browser più vecchi sotto test. Questo livello minimo non è cambiato.

## Mocha

`@wdio/mocha-framework` e `@wdio/browser-runner` dipendono da [Mocha 12](https://mochajs.org/blog/mocha-12-stable/). Mocha 12 richiede Node.js `^20.19.0 || >=22.12.0`, coperto dal minimo di 22.19.0 della v10.

```diff
- mochaOpts: { compilers: ['ts:ts-node/register'] }
+ mochaOpts: { require: ['ts-node/register'] }
```

`mochaOpts.compilers` non esiste più. Mocha ha rimosso il flag `--compilers`, deprecato da tempo, quindi le mappature dei compilatori rimaste vengono ignorate. Carica i transpiler o altri file di setup con `mochaOpts.require`.

`failHookAffectedTests` ha come valore predefinito `true`. Un hook `before` o `beforeEach` che fallisce fa fallire i test che quell'hook ha saltato. Imposta `mochaOpts.failHookAffectedTests` a `false` per segnalare solo l'hook.

Usa `expect-webdriverio` 8, vedi [expect-webdriverio 8](#expect-webdriverio-8). Mocha può caricare quel pacchetto due volte nello stesso processo; il pacchetto condivide lo stato delle asserzioni tra queste copie ([expect-webdriverio#2221](https://github.com/webdriverio/expect-webdriverio/pull/2221)).

Modifiche di Mocha 12 che possono emergere tramite `mochaOpts`:

- `grep` accetta i flag RegExp moderni.
- `ui` è ancora `bdd`, `tdd`, `qunit` o `exports`. Le interfacce personalizzate dovrebbero mantenere il suffisso `*-bdd`, `*-tdd` o `*-qunit`.
- `parallel` non è ancora supportato. WDIO gestisce il parallelismo delle spec; il worker pool di Mocha genera un errore se lo abiliti.

Mocha 12 è ESM-first (`"type": "module"`). Il `require('mocha')` programmatico funziona ancora su Node 22 tramite `require(esm)`. La CLI Mocha di WDIO (`wdio run … --mochaOpts.*`) è invariata; la CLI di Mocha ora usa `util.parseArgs` invece di yargs.

## Cucumber

`@wdio/cucumber-framework` dipende da [`@cucumber/cucumber` 13](https://github.com/cucumber/cucumber-js/blob/main/UPGRADING.md#1300).

Cucumber 13 richiede Node.js 22, 24 o 26 o successivo. Non funziona su Node.js 20, 23 o 25. Il pacchetto del framework dichiara lo stesso intervallo, a partire dal minimo di 22.19.0 della v10.

```diff
- cucumberOpts: { tagExpression: '@smoke' }
+ cucumberOpts: { tags: '@smoke' }
```

`tagExpression` non ha un alias. Impostarlo genera un errore, così un filtro rimasto non può eseguire silenziosamente ogni scenario.

Cucumber 13 non esporta più `Cli`. Le esecuzioni programmatiche passano per `runCucumber` da `@cucumber/cucumber/api`, che è ciò che l'adapter usa già.

Le altre modifiche incompatibili di Cucumber 13 (percorsi ambigui dei formatter, worker paralleli, `BeforeAll` / `AfterAll`) sono descritte nella [guida all'aggiornamento di Cucumber](https://github.com/cucumber/cucumber-js/blob/main/UPGRADING.md#1300).

## Jasmine

`@wdio/jasmine-framework` dipende da [Jasmine 6](https://jasmine.github.io/upgrade-guides/6.0). Jasmine 6 è testato su Node.js 20, 22 e 24. Il minimo di 22.19.0 della v10 copre già questo intervallo.

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

I matcher sincroni di Jasmine sono di nuovo sincroni. Nella v9, l'`expect` globale era `expectAsync` di Jasmine, quindi `expect(1).toBe(1)` restituiva una promise. Nella v10, i matcher integrati di Jasmine e quelli che aggiungi con `jasmine.addMatchers` restituiscono `undefined`. I matcher di WebdriverIO, i matcher asincroni di Jasmine e quelli di `jasmine.addAsyncMatchers` restituiscono ancora una promise, quindi continua a usare `await` con essi. Non devi cambiare `await expect($('#logo')).toBeDisplayed()` in `expectAsync()`: l'`expect` globale inoltra per te i matcher di WebdriverIO a `expectAsync`. `await expect(1).toBe(1)` continua a funzionare.

Un'asserzione sincrona fallita senza `await` ora fa fallire la spec. Nella v9 era una promise rifiutata: se nessuno la attendeva, la spec poteva passare, con solo un unhandled rejection nel log. Dopo l'aggiornamento, esamina le spec che iniziano a fallire. Avevano un fallimento nascosto nella v9, e la correzione va fatta nel test o nell'applicazione, non nella chiamata `expect`:

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

- `oneFailurePerSpec` ora interrompe la spec alla prima asserzione fallita: immediatamente per un matcher sincrono, e quando la promise si risolve per un matcher asincrono atteso con `await`.
- I matcher delle spy di Jasmine funzionano senza `await`. Nella v9, `toHaveBeenCalled`, `toHaveSpyInteractions` e `toHaveNoOtherSpyInteractions` fallivano con "Does not take arguments", e una spy non chiamata passava senza `await`.
- `jasmine.addMatchers` non viene più sostituito, quindi Jasmine non mostra più il suo avviso "Monkey patching detected".

`toHaveSize` ha due significati. Su un valore WebdriverIO è il matcher di WebdriverIO e controlla la dimensione dell'elemento: un elemento, un array di elementi (incluso il risultato di `$$().filter()`), un `Element[]`, un elemento multi-remote, un browser, un browsing context, un mock, il wrapper `some()` o una promise come un `$()` concatenabile. Su qualsiasi altro valore è il matcher di Jasmine e controlla la lunghezza. Nella v9 veniva sempre eseguito il matcher di Jasmine.

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

`@wdio/globals`, `@wdio/runner` e `@wdio/browser-runner` richiedono `expect-webdriverio` 8 come peer dependency. Nella v9 era `expect-webdriverio` 7. Se il tuo `package.json` elenca `expect-webdriverio`, aggiornalo alla versione 8 nella stessa modifica dei pacchetti `@wdio/*`.

`expect-webdriverio` 8 ha le sue modifiche incompatibili. La sua [guida alla migrazione da v7 a v8](https://github.com/webdriverio/expect-webdriverio/blob/main/docs/Migrations.md#migration-guide-v7-to-v8) elenca ogni modifica e la relativa sostituzione. Queste sono le modifiche che più probabilmente interessano una suite di test:

- `toHaveText` su `$$()` confronta gli elementi indice per indice. Un array atteso in un ordine diverso da quello della pagina fallisce. Usa l'ordine della pagina, `expect.oneOf()` o `expect.arrayContaining()`.
- Un array di valori attesi su un singolo elemento fa fallire `toHaveText`, `toHaveHTML`, `toHaveComputedLabel` e `toHaveComputedRole`. Usa `expect.oneOf()`.
- `setFeatureFlags()` e l'opzione `featureFlags` sono stati rimossi.
- Queste API deprecate sono state rimosse: `setOptions` (usa `setDefaultOptions`), `getConfig` (usa `getDefaultOptions`), `matchers` (usa `wdioCustomMatchers`), `toHaveAttr` (usa `toHaveAttribute`), `toHaveClass` (usa `toHaveElementClass`), `toBeRequestedWithResponse()` (usa `toBeRequestedWith({ response })`) ed `expect-webdriverio/types` (usa `expect-webdriverio/expect-global`).
- Gli hook `beforeAssertion` e `afterAssertion` ricevono il nome dell'alias chiamato dal test, per `toBeExisting`, `toBePresent`, `toHaveLink`, `toHaveValue` e `toBeRequested`. Nella v9 ricevevano il nome del matcher dietro l'alias, per esempio `toExist` per `toBeExisting`.
- Su un browser multi-remote, passa a `expect` il risultato di `$$()`. Un array semplice come `[...elements]` o `Array.from(elements)` non viene riconosciuto come elementi e l'asserzione fallisce.

Su un browser multi-remote, una sola asserzione controlla ogni istanza, ed `expect.multiRemote()` fornisce un valore atteso per istanza. Vedi [Asserzioni multiremote](/docs/multiremote#assertions).

## Global multi-remote

Il global in minuscolo `multiremotebrowser` è stato rimosso, da `@wdio/globals` e anche dai global di `eslint-plugin-wdio`. Usa `multiRemoteBrowser`.

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

Le chiavi di primo livello della configurazione restano `specs` ed `exclude`. Una lista senza prefisso rimasta su una capability non seleziona file per quella capability. La capability usa allora `specs` ed `exclude` di primo livello.

Gli alias `tunnelIdentifier` e `parentTunnel` sono stati rimossi dai tipi delle opzioni di Sauce Labs. Usa `tunnelName` e `tunnelOwner`.

## TypeScript

I tipi `Element`, `MultiRemoteBrowser` e `MultiRemoteElement` esportati da `webdriverio` sono stati rimossi. Usa il namespace globale `WebdriverIO`.

```diff
- import type { Element } from 'webdriverio'
- const elem: Element = await $('#foo')
+ const elem: WebdriverIO.Element = await $('#foo')
```

`ChainablePromiseElement` ora dichiara `then`, e `ChainablePromiseArray` dichiara `then`, `catch` e `finally`. I tipi concatenabili descrivono il valore prima di `await`. Non corrispondono più al valore atteso:

```ts
let elem: ChainablePromiseElement
elem = await $('h1')
// TS2741: Property 'then' is missing in type 'Element' but required in type 'ChainablePromiseElement'.

let elems: ChainablePromiseArray
elems = await $$('li')
// TS2322: Type 'ElementArray' is not assignable to type 'ChainablePromiseArray'.
```

Tipizza il valore atteso come `WebdriverIO.Element` o `WebdriverIO.ElementArray`:

```diff
- let elem: ChainablePromiseElement = await $('h1')
- let elems: ChainablePromiseArray = await $$('li')
+ let elem: WebdriverIO.Element = await $('h1')
+ let elems: WebdriverIO.ElementArray = await $$('li')
```

Entrambi i tipi concatenabili ora soddisfano `T extends PromiseLike<unknown>`. Un tipo condizionale che verifica `PromiseLike` prende per `$()` e `$$()` un ramo diverso rispetto alla v9. Per esempio, `Awaited<ChainablePromiseElement>` ora è `WebdriverIO.Element`, e `Awaited<ChainablePromiseArray>` è `WebdriverIO.ElementArray`.

Le proprietà di un `$$()` non atteso hanno cambiato tipo. Sono disponibili subito, prima che la query si risolva, quindi leggile senza `await` o `.then()`:

| Proprietà | v9 | v10 |
|---|---|---|
| `selector` | `Promise<Selector>` | `Selector \| undefined` |
| `parent` | `Promise<...>` | il genitore, non una promise (vedi sotto) |
| `foundWith` | nessuna | il comando che ha trovato la lista, ad es. `$$` o `custom$$` |
| `props` | nessuna | gli argomenti aggiuntivi di quel comando |

```diff
- const selector = await $$('li').selector
+ const selector = $$('li').selector
```

In una query concatenata come `$('form').$$('input')`, `parent` è il `$('form')` concatenabile finché la lista non si risolve, e l'elemento risolto dopo. Attendi la lista prima di usare `parent` come elemento.

A runtime, `filter()`, `filterSeries()` e `slice()` su una lista `$$()` restituiscono una lista di elementi, non un array semplice. Il risultato mantiene `selector`, `foundWith`, `parent` e `props` della lista di origine. Nella v9, `filter()` restituiva un array semplice senza queste proprietà. I tipi non lo riflettono ancora: `filter()` e `filterSeries()` sono dichiarati come restituenti `Promise<WebdriverIO.Element[]>`, e `slice()` restituisce `WebdriverIO.Element[]`, quindi TypeScript segnala un errore quando leggi queste proprietà sul risultato.

WebdriverIO non riesegue la query per la lista derivata stessa: un indice oltre la sua fine non attende ulteriori corrispondenze, e non restituisce mai un elemento escluso dal filtro. I suoi membri restano gli elementi della query di origine, con il loro `selector` e `index` originali. Se un membro diventa stale, WebdriverIO lo recupera di nuovo dalla query di origine a quell'indice, che può essere un altro elemento se la pagina è cambiata. Il codice che riesegue la query di una lista partendo dalle sue proprietà, per esempio `parent[foundWith](selector, ...props)`, ottiene la lista completa, non quella filtrata.

I pacchetti pubblicati impostano `typeScriptVersion` a 6.0.3, in linea con la versione di TypeScript con cui viene compilato questo repository.

`browser.mock()` accetta l'`URLPattern` di `urlpattern-polyfill` e l'`URLPattern` nativo (globale in Node.js 24, e tipizzato dalla libreria `dom` di TypeScript 6).

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

TypeScript 6 cambia anche il valore predefinito di `types` in `[]`, quindi non carica più tutti i pacchetti `@types/*` installati. Se il tuo `tsconfig.json` non ha una lista `types`, i global come `describe` e `it` di Mocha falliscono con `Cannot find name`. Elenca i pacchetti di tipi usati dai tuoi test, come fa `create-wdio`. Per esempio, con Mocha:

```diff title="tsconfig.json"
 {
     "compilerOptions": {
+        "types": ["node", "@wdio/globals/types", "@wdio/mocha-framework"]
     }
 }
```

`npm create wdio@latest` scrive `compilerOptions.target` e `compilerOptions.lib` come `es2024`. Il type-checking di quel file richiede TypeScript 5.7 o successivo. `tsx`, che esegue la configurazione e i test, non esegue il type-checking, quindi un compilatore più vecchio conta solo quando esegui `tsc` tu stesso.

Un `tsconfig.json` esistente non viene riscritto. Una configurazione generata che estende un'altra configurazione mantiene `target` e `lib` di quella genitore.

Nell'hook `afterAssertion`, il tipo di `params.result` ora è `{ pass, message }`, così come lo forniscono i matcher. Nella v9 il tipo era `{ result, message }`, ma `params.result.result` era sempre `undefined` a runtime. Leggi `params.result.pass`:

```diff
  afterAssertion (params) {
-     console.log(params.matcherName, params.result.result)
+     console.log(params.matcherName, params.result.pass)
  }
```

`pass` è `true` quando il valore corrisponde al valore atteso, anche con `.not`. Quindi con `.not` l'asserzione passa quando `pass` è `false`. L'hook non indica se il test ha usato `.not`.

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

Questo corrisponde ai [locator di Playwright](https://playwright.dev/docs/locators#strictness). Cypress si comporta diversamente: le sue query possono risolversi in più elementi, e sono i comandi di azione come [`.click()`](https://docs.cypress.io/api/commands/click#Click-all-elements-with-id-starting-with-btn) a rifiutare per impostazione predefinita un soggetto con più elementi. Un selettore che si risolve silenziosamente in più elementi è quasi sempre un bug latente: oggi passa e interagisce con l'elemento sbagliato non appena qualcuno aggiunge un secondo pulsante alla pagina.

La regola si applica a ogni passo di una catena (`$('form').$('input')`) e a ogni tipo di selettore accettato da `$`: selettori stringa (inclusi quelli che attraversano lo shadow DOM), funzioni JS, selettori mobile e riferimenti a strategie personalizzate.

### Cosa non è cambiato

- `$$` restituisce ancora zero o più elementi. Dalla v10 quella lista è un [`ElementArray`](/docs/api/browser/$$): un vero array su cui puoi usare `await`, con `for await` e `map` / `filter` asincroni disponibili prima che si risolva. `await $$('button').length` è il conteggio. `$$('button').length > 0` non lo è, perché `length` è una promise finché la lista non si risolve. `for (const el of $$('button'))` genera un errore finché non hai atteso la lista; usa `for await`, oppure `for...of` dopo `await`.
- I comandi helper dedicati `custom$`, `shadow$` e `react$` non sono strict: restituiscono ancora la loro prima corrispondenza, così come le loro controparti `$$`.
- Un selettore che non trova nulla restituisce ancora un elemento risolto in modo lazy, quindi `waitForExist` e l'[auto-waiting](/docs/autowait) si comportano come prima.
- Passare un riferimento a un elemento, ad es. `$(await browser.getActiveElement())`, si riferisce sempre a un singolo nodo e non viene mai controllato.

### Come verificare la tua suite

Non esiste un codemod per questo: solo tu puoi dire se una seconda corrispondenza è un bug o è intenzionale. Due approcci pratici:

1. __Esegui la tua suite.__ Ogni violazione genera un errore con il selettore e il numero di corrispondenze, che di solito basta per correggerla sul momento.
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

### Disattivazione

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

Un elemento ricorda come è stato interrogato, quindi recuperarlo di nuovo, dopo uno stale element reference o tramite `waitForExist`, mantiene la modalità strict della chiamata originale.

:::info

Internamente un `$` strict invia una richiesta `findElements` invece di `findElement`, poiché contare le corrispondenze è l'unico modo per applicare la regola. In entrambi i casi si tratta di un singolo round trip, ma è visibile ai servizi personalizzati e ai mock WebDriver che si basano sul comando `findElement`.

:::

## Firme dei comandi legacy

La v9 accettava ancora le vecchie forme posizionali ed emetteva un avviso. La v10 accetta solo l'oggetto delle opzioni.

Il [codemod](https://github.com/webdriverio/codemod) della v10 riscrive `addCommand` e `overwriteCommand` quando il terzo argomento è un booleano, `getHTML(true)` e `getHTML(false)`, e `getCookies` quando il filtro è una stringa o un array di un solo elemento. Una chiamata `getCookies` con più di un nome viene lasciata invariata, perché un filtro corrisponde a un solo nome.

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

I filtri stringa e array di stringhe vengono rifiutati. Passa un [oggetto filtro per i cookie](https://w3c.github.io/webdriver-bidi/#type-storage-CookieFilter). Una chiamata filtra un solo nome; chiamalo di nuovo per un altro nome.

```diff
- await browser.getCookies('session')
- await browser.getCookies(['session', 'auth'])
+ await browser.getCookies({ name: 'session' })
+ await browser.getCookies({ name: 'auth' })
```

`getCookies()` senza argomenti restituisce ancora ogni cookie visibile alla pagina.

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

`setFiles` richiede una sessione BiDi. I percorsi vengono aperti dal browser. Un percorso relativo viene risolto rispetto a `process.cwd()`. Lo staging dei file di Selenium Grid non fa parte della v10. Una suite che dipendeva da `uploadFile` per inviare byte a un nodo deve mettere il file dove il browser può leggerlo, e poi chiamare `setFiles`.

In una sessione classic locale, `element.setValue('/local/path')` digita ancora un percorso che il browser locale può già vedere. L'endpoint Selenium grezzo resta `browser.file()` per gli utenti Grid che lo chiamano direttamente.

## `executeAsync`

`browser.executeAsync` ed `element.executeAsync` sono stati rimossi. Passa una funzione `async` a [`execute`](/docs/api/browser/execute). Il valore restituito dalla funzione, inclusa una promise restituita, è il risultato del comando. Il timeout `script` si applica ancora.

```ts
const result = await browser.execute(async (a, b) => {
    await new Promise((resolve) => setTimeout(resolve, 1000))
    return a + b
}, 1, 2)
```

Elimina la callback `done` di WebDriver. Uno script stringa che si aspettava quella callback come ultimo argomento deve invece restituire una promise. A runtime, `executeAsync` non è una funzione.

## `switchToFrame`

`browser.switchToFrame` non è più un comando pubblico.

In una sessione WebDriver BiDi, `switchFrame` e `switchWindow` generano un errore. Una scheda, una finestra e un frame sono un `WebdriverIO.BrowsingContext` che tieni in mano. `browser.url()` naviga il contesto di primo livello iniziale della sessione e lo restituisce. `browser.newWindow()` restituisce il nuovo contesto e non vi passa. `context.frame()` restituisce un frame figlio. `context.parent` è il frame da cui lo hai aperto.

```ts
const page = await browser.url('https://example.com')
const other = await browser.newWindow('https://webdriver.io', { type: 'tab' })
console.log(await page.getTitle())
const frame = await page.frame('iframe')
console.log(await frame.$('h1').getText())
const pages = await browser.browsingContexts()
```

`context.url` è la stringa dell'URL del documento. Naviga un contesto che tieni in mano con `context.navigate(url)`. I metadati di caricamento di `browser.url()` sono `context.request`.

In una sessione Classic, continua a chiamare `switchFrame` con un elemento, o con `null` per il frame di primo livello. Lì una stringa o una funzione vengono rifiutate.

```diff
- await browser.switchToFrame(await $('iframe'))
- await browser.switchToFrame(null)
+ await browser.switchFrame($('iframe'))
+ await browser.switchFrame(null)
```

## `setTimeout`

La chiave `page load` del JSON Wire Protocol viene rifiutata. Usa `pageLoad`.

```diff
- await browser.setTimeout({ 'page load': 10000 })
+ await browser.setTimeout({ pageLoad: 10000 })
```

`implicit` e `script` sono invariati.

## Accesso alle istanze multi-remote

Un browser multi-remote non memorizza più ogni sessione come propria proprietà. Lo stesso vale per un elemento multi-remote. `getInstance` e `select` sono il modo per indirizzare una sessione.

```diff
- await browser.myChromeBrowser.url('https://webdriver.io')
- await (await browser.$('button')).myChromeBrowser.click()
+ await browser.getInstance('myChromeBrowser').url('https://webdriver.io')
+ await (await browser.$('button')).getInstance('myChromeBrowser').click()
```

Un'augmentation TypeScript che aggiunge `myChromeBrowser: WebdriverIO.Browser` a `WebdriverIO.MultiRemoteBrowser` non corrisponde più a una proprietà a runtime. Elimina quell'augmentation e chiama `getInstance`.

Con il testrunner e `injectGlobals` attivo, il nome dell'istanza è ancora un global (`myChromeBrowser.url(...)`). Quel global è la singola sessione. Non è `browser.myChromeBrowser`.

I risultati dei comandi restano nell'ordine delle capability: la prima voce appartiene alla prima chiave dell'oggetto capabilities.

`browser.$$()` su un browser multi-remote restituisce un `WebdriverIO.MultiRemoteElementArray`, non un semplice `MultiRemoteElement[]`. È ancora un array, quindi una lettura per indice come `elements[0]` continua a funzionare.

I suoi metodi `map`, `filter`, `forEach`, `find`, `findIndex`, `some`, `every` e `reduce` sono asincroni, come su un `WebdriverIO.ElementArray`, e restituiscono una promise, anche dopo `await`. Lo stesso vale per le liste restituite da `custom$$()`, `react$$()` e `shadow$$()`. Nella v9 questi erano i metodi sincroni di un array semplice:

```diff
  const items = await browser.$$('li')
- const ids = items.map((item) => item.selector)
+ const ids = await items.map((item) => item.selector)
```

`custom$()`, `react$()` e, su un elemento, `shadow$()`, `nextElement()`, `previousElement()` e `parentElement()` restituiscono un unico `WebdriverIO.MultiRemoteElement`, come fa `$()`. Nella v9 restituivano un elemento per istanza in un array semplice. Leggi l'elemento di un browser con `getInstance`:

```diff
- const [chromeHost, firefoxHost] = await browser.custom$('byTestId', 'host')
- await chromeHost.click()
+ const host = await browser.custom$('byTestId', 'host')
+ await host.getInstance('myChromeBrowser').click()
```

`custom$$()`, `react$$()` e, su un elemento, `shadow$$()` restituiscono un unico `WebdriverIO.MultiRemoteElementArray`, come fa `$$()`. Nella v9 restituivano una lista per istanza in un array semplice. Ogni voce indirizza tutte le istanze. Un'istanza che trova meno elementi non ha alcun elemento a quell'indice:

```diff
- const [chromeItems, firefoxItems] = await browser.custom$$('byTestId', 'item')
- await chromeItems[0].click()
+ const items = await browser.custom$$('byTestId', 'item')
+ await items[0].getInstance('myChromeBrowser').click()
```

`WebdriverIO.MultiRemoteElement['selector']` ha il tipo `Selector`, come `WebdriverIO.Element['selector']`. Nella v9 aveva il tipo `string`, ma il valore poteva anche essere una funzione o un riferimento a una strategia personalizzata. Il codice TypeScript che lo usa come stringa, per esempio `element.selector.includes('…')`, deve prima verificarne il tipo.

`WDIO_ENABLE_MULTI_REMOTE_SELECT` e `WDIO_ENABLE_MULTI_REMOTE_ELEMENT_ARRAY` sono stati rimossi. `select()` è sempre disponibile, e `$$()` restituisce sempre l'array di elementi descritto sopra. Elimina entrambe le variabili.

## Risposte mock binarie

`mock.respond()` e `mock.respondOnce()` accettano payload `Uint8Array` e `ArrayBuffer`, incluso un `Buffer` tramite polyfill nei test dei componenti senza un `Buffer` globale.

`mock.getBinaryResponse()` è ora tipizzato come `Uint8Array | null`. Restituisce ancora un `Buffer` in Node.js, ma restituisce un `Uint8Array` nel browser. Per usare metodi specifici di Buffer in Node.js, converti prima un risultato non nullo:

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

`getInstance` genera `Multi-remote object has no instance named "<name>"` quando il nome non è tra le `instances`. Un mock da `browser.select('myFirefoxBrowser', 'myChromeBrowser')` elenca quelle istanze in quell'ordine, che può differire da `browser.instances`. Non dare per scontato che `mocks[0]` sia un determinato browser.

## Risposte mock che saltano il backend

`mock.respond(..., { fetchResponse: false })` non chiama il backend. Nella v9, un mock che filtrava anche su `statusCode` o `responseHeaders` ignorava quel filtro e rispondeva comunque a ogni richiesta corrispondente. Nella v10, `respond()` e `respondOnce()` generano un errore, perché quei filtri possono essere valutati solo a partire dalla risposta del backend.

```diff
- const mock = await browser.mock('**/users', { statusCode: 200 })
- mock.respond({ name: 'Ada' }, { fetchResponse: false })
+ const mock = await browser.mock('**/users')
+ mock.respond({ name: 'Ada' }, { fetchResponse: false })
```

Per mantenere il filtro, ometti `fetchResponse` in modo che il mock recuperi la risposta, controlli lo stato o gli header, e poi sostituisca il body.

## Riferimenti agli elementi

Gli id degli elementi usano la chiave W3C WebDriver `element-6066-11e4-a52e-4f735466cecf` e la proprietà `elementId`. Il campo `ELEMENT` del JSON Wire Protocol non fa più parte del contratto degli elementi.

`WebdriverIO.Element` non dichiara più `ELEMENT`. Leggi `element.elementId`, che le istanze degli elementi espongono già.

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

Con WebDriver BiDi, uno script che restituisce una `NodeList` (per esempio da `querySelectorAll`) o una `HTMLCollection` (per esempio `element.children`) ora fornisce una lista di riferimenti a elementi, come fa WebDriver Classic. Nella v9 forniva valori BiDi grezzi, quindi `browser.execute` restituiva oggetti che non erano elementi, e una strategia `custom$` o `custom$$` che restituiva `querySelectorAll(...)` non trovava alcun elemento. Un workaround come `Array.from(document.querySelectorAll(...))` funziona ancora, e puoi rimuoverlo:

```diff
  browser.addLocatorStrategy('byCss', (selector) =>
-     Array.from(document.querySelectorAll(selector))
+     document.querySelectorAll(selector)
  )
```

## Selettori React

`react$` e `react$$` ora funzionano con React da 16 a 19, per un'app che parte con `createRoot` o con `ReactDOM.render`. Prima, `browser.react$` e `browser.react$$` fallivano con React 18 e successivi (`Could not find the root element of your application`), e in ogni versione un risultato poteva provenire dal render precedente all'ultimo aggiornamento, quindi un componente aggiunto da un cambio di stato non veniva trovato.

In una pagina in cui React non ha ancora renderizzato una root, i comandi ora la attendono fino a 5 secondi prima di fallire. Prima fallivano subito, quindi un'app avviata in ritardo non veniva trovata.

I comandi non usano più la libreria [resq](https://github.com/baruchvlz/resq), e WebdriverIO non la installa più. Le regole dei selettori non cambiano (vedi [Selettori React](/docs/selectors#react-selectors)), con queste eccezioni:

- `react$` con sia `props` sia `state` trova un componente che corrisponde a entrambi. Prima ignorava `props` quando era fornito anche `state`.
- `react$$` fornisce ogni nodo DOM una sola volta. Prima, un higher-order component e il suo figlio fornivano lo stesso elemento due volte in alcuni browser.
- Un fragment che contiene un fragment fornisce un'unica lista piatta di nodi. Prima, `react$` poteva restituire una lista.
- Un filtro con un valore `null` funziona. Prima falliva con `Cannot convert undefined or null to object`.
- Senza uno scope di elemento, i comandi cercano in tutte le root React della pagina, nell'ordine del documento, anche nelle root dentro altre root e nelle root all'interno di shadow root aperte. `react$` fornisce la prima corrispondenza. Prima cercavano solo nella prima root, anche se React non l'aveva ancora renderizzata o l'aveva smontata, e non cercavano nelle shadow root. In una pagina con più di una root, `react$$` può ora fornire più elementi: per cercare in una sola root, chiama il comando sul suo contenitore, per esempio `$('#root').react$$('MyComponent')`.
- Sul contenitore di una root dentro un'altra root, i comandi cercano nella root interna. Prima cercavano nella root esterna.
- Sul browsing context di un frame, e su un elemento di un frame, i comandi funzionano. Prima, il comando del contesto falliva con `this.executeScript is not a function`, e il comando dell'elemento falliva con `Could not find instance of React in given element`.

Lo script interno `webdriverio/scripts/resq` è stato rimosso.

## Test dei componenti

`@wdio/browser-runner` riesporta `fn`, `spyOn` e i tipi dei mock da `@vitest/spy` 5 (in precedenza 3). Un mock che il tuo codice chiama con `new` richiede un'implementazione `function` o `class`. Una arrow function genera `is not a constructor`, e `mockReturnValue` genera un errore quando il mock viene chiamato con `new`.

```diff
- const Client = fn(() => ({ close: fn() }))
+ const Client = fn(function () { return { close: fn() } })
```

Per altre modifiche alle spy, vedi la [guida alla migrazione di Vitest](https://vitest.dev/guide/migration).

## Puppeteer

`webdriverio` accetta `puppeteer-core` `>=24 <26`, incluso Puppeteer 25. `getPuppeteer()` e `@wdio/lighthouse-service` sono testati su questa linea.

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

La configurazione consigliata passa alla regola type-aware `wdio/no-floating-promise`, al posto di `wdio/await-expect`, quando è installato il pacchetto `typescript-eslint`. Installare solo `@typescript-eslint/eslint-plugin` non basta.

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

Un file JavaScript corrispondente che non fa parte del progetto TypeScript, come `wdio.conf.js`, fallisce con "was not found by the project service". Per eseguire il lint anche sui file JavaScript, imposta `"allowJs": true`, aggiungili a `include` in `tsconfig.json` e amplia il pattern a `**/*.{js,mjs,cjs,ts,mts,cts,tsx}`.

## Framework personalizzati

`setupExpect` su un adapter di framework personalizzato non accetta più una `Map` di matcher, e il runner non aggiunge più un metodo `entries` all'oggetto dei matcher. Itera con `Object.entries(wdioMatchers)`.

## Profilo Firefox

`@wdio/firefox-profile-service` non tratta più `legacy` come un'opzione del servizio. Quel flag si applicava solo a Firefox 55 e precedenti. Eliminalo. Un `legacy: true` rimasto viene scritto nel profilo come preferenza chiamata `legacy`.

## Protocollo WebDriver

Ogni sessione è una sessione [W3C WebDriver](https://w3c.github.io/webdriver/). WebdriverIO non parla il JSON Wire Protocol né il Mobile JSON Wire Protocol. La v9 ha rimosso quei comandi. La v10 elimina anche l'envelope di risposta usato da quei protocolli, quindi un server che lo restituisce ancora non può avviare una sessione.

`browser.isW3C` è stato rimosso, incluso il valore precedentemente inoltrato nel messaggio `sessionStarted` del worker. Passare `isW3C` ad `attach` viene ignorato. Il set di comandi BiDi resta sul client. Una connessione BiDi attiva dipende ancora da `webSocketUrl`.

### `browser.back()` e `browser.forward()` su BiDi

Le chiamate restano `await browser.back()` e `await browser.forward()`. Nessuno dei due comandi accetta argomenti o restituisce un valore.

In una sessione BiDi questi comandi chiamano `browsingContext.traverseHistory` con `delta` `-1` o `1` sul browsing context di primo livello, poi attendono lo stato di prontezza del documento a cui corrisponde `pageLoadStrategy`. `none` ritorna quando il comando di attraversamento viene accettato. `eager` attende `browsingContext.domContentLoaded`. `normal`, il valore predefinito, attende `browsingContext.load`. Un ripristino dalla back-forward cache non emette quegli eventi; il comando ritorna quando il `readyState` del documento confermato corrisponde già alla strategia. L'attesa usa il timeout di caricamento pagina della sessione (`timeouts.pageLoad`, 300000 ms se non impostato). Le sessioni Classic inviano ancora a `POST /session/:sessionId/back` e `POST /session/:sessionId/forward`.

Una voce di cronologia mancante genera ancora un rifiuto. Su BiDi il messaggio proviene da `browsingContext.traverseHistory` e contiene `no such history entry`, invece del testo di errore del WebDriver classico. Un attraversamento che non raggiunge mai lo stato di prontezza atteso viene rifiutato con `History traversal timed out after <ms>ms waiting for browsingContext.domContentLoaded` o `browsingContext.load`.

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

La creazione della sessione genera allora `WebDriver new session response is missing a session id or capabilities. WebdriverIO requires a W3C WebDriver server.` Lo stesso errore viene sollevato quando manca `value.capabilities`, anche se `value.sessionId` è presente.

Un oggetto capability piatto nella tua configurazione è ancora valido. WebdriverIO racchiude `{ browserName: 'chrome' }` in `alwaysMatch` prima di inviare la richiesta. Le chiavi con prefisso del vendor mescolate a chiavi esterne al set di capability W3C vengono ancora rifiutate. Metti le impostazioni del vendor in `sauce:options`, `bstack:options`, `appium:options` o un'altra chiave con prefisso.

### Risposte ai comandi

Il risultato di un comando è `{ "value": … }`. HTTP 200 senza `error` in `value` indica successo. Un elemento mancante è HTTP 404 con `value.error` impostato a `"no such element"`, il che consente ancora la ricerca lazy di un elemento. Uno `status` numerico nel body viene ignorato, inclusi `status: 0` e il vecchio codice `status: 7` ("no such element"). Invia invece l'oggetto errore W3C.

Il tipo di errore esportato `JSONWPCommandError` ora è `SessionRequestError`.

### Server

I driver con cui WebdriverIO funziona parlano già W3C sulla connessione client:

- ChromeDriver è W3C per impostazione predefinita da Chrome 75. Edge basato su Chromium si comporta allo stesso modo. L'attuale ChromeDriver accetta ancora `goog:chromeOptions.w3c: false`, che riporta quella singola sessione al protocollo legacy. WebdriverIO non supporta quell'opzione.
- geckodriver e safaridriver di Apple sono solo W3C. Una risposta di Safari che omette `platformName` o `browserVersion` è comunque W3C.
- Selenium 4 e Grid 4 parlano W3C. Grid ha smesso di tradurre il JSON Wire Protocol nella 4.9.
- Appium 2 ha abbandonato il JSON Wire Protocol e il Mobile JSON Wire Protocol. Appium 3 ha abbandonato anche le forme di parametri residue. La v10 richiede Appium 3, trattato più avanti. Una sessione mobile che omette `setWindowRect` è comunque W3C; quella capability indica che il dispositivo non può ridimensionare una finestra.

Questi server parlano ancora il JSON Wire Protocol e non sono supportati: Selenium 3, PhantomJS, EdgeHTML (`--jwp`) e WinAppDriver connesso direttamente. Il driver Windows di Appium resta supportato come client W3C. Traduce i comandi per WinAppDriver, incluso Get Element Property verso l'endpoint degli attributi. Punta WebdriverIO verso Appium, non verso la porta di WinAppDriver.

[`@wdio/jsonwp-service`](https://www.npmjs.com/package/@wdio/jsonwp-service) non fa funzionare quei server con la v10. L'avvio della sessione richiede ancora il body W3C descritto sopra, e i risultati dei comandi ignorano ancora uno `status` numerico. Resta su WebdriverIO 9 se quel server è ancora necessario.

`webdriver.remote.sessionid` non contrassegna più una sessione Selenium standalone. Selenium Grid 4 viene ancora rilevato da `se:cdp`.

La chiave di timeout `page load` è trattata in [`setTimeout`](#settimeout). Gli id degli elementi sono trattati in [Riferimenti agli elementi](#element-references). Su desktop, `[name="..."]` è un selettore CSS. La strategia di localizzazione `name` resta per le sessioni mobile.

## Appium

WebdriverIO 10 richiede **Appium 3** e gli attuali driver ufficiali (UiAutomator2, XCUITest, Espresso, Windows, Mac2 e così via). Appium 1.x e 2.x non sono supportati. Resta su WebdriverIO 9 se non puoi aggiornare il server.

```sh
npm i -D appium@^3
appium driver update installed
```

`@wdio/appium-service` dichiara un peer `appium` opzionale `>=3` e si rifiuta di avviare un server più vecchio. `create-wdio` installa `appium@^3` quando Appium manca o è più vecchio della 3.

I vendor cloud che espongono ancora Appium 2 necessitano di un'immagine Appium 3, altrimenti devi restare su WebdriverIO 9.

### I comandi mobile non ripiegano più su HTTP

Nella v9, molti helper mobile provavano `browser.execute('mobile: …')` e, in caso di errore di metodo sconosciuto, ripiegavano su un endpoint HTTP di Appium rimosso. Nella v10 quel fallback non esiste più: lo stesso errore ti dice di aggiornare ad Appium 3. Preferisci i comandi mobile di WebdriverIO (`browser.lock()`, `browser.shake()`, …) o direttamente `browser.execute('mobile: …')`.

### Comandi di protocollo rimossi

Appium 3 [ha rimosso molti endpoint deprecati del base driver](https://appium.io/docs/en/latest/guides/migrating-2-to-3/). WebdriverIO non espone più metodi client per la maggior parte di quelle route (per esempio `appiumLock`, `touchPerform` e la mappa del Mobile JSON Wire Protocol). Usa invece le W3C Actions, il comando mobile corrispondente o un metodo execute `mobile:` del driver.

### Scope di `--allow-insecure` in Appium

Appium 3 richiede un prefisso di scope del driver o `*` sulle feature di `--allow-insecure`, per esempio `uiautomator2:adb_shell` o `*:adb_shell`.

### Le capability Appium senza prefisso non selezionano più una sessione Appium

`automationName`, `deviceName` e `appiumVersion` senza prefisso `appium:` non indicano più a WebdriverIO di saltare il driver del browser e associare il servizio Appium. Usa la capability con prefisso, oppure annidala sotto `appium:options`:

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

`element.getValue()` chiama Get Element Property in ogni sessione, incluso Appium 3. In una sessione mobile chiamava in precedenza Get Element Attribute.

### Firma di `stopRecordingScreen` allineata a `startRecordingScreen`

`driver.stopRecordingScreen` ora accetta solo un singolo argomento `options`, invece dei 4 argomenti precedenti, allineandosi a `driver.startRecordingScreen`. Sposta i singoli argomenti all'interno di un oggetto:

```diff
- driver.stopRecordingScreen('webdriver.io', undefined, undefined, 'POST')
+ driver.stopRecordingScreen({ remotePath: 'webdriver.io', method: 'POST' })
```

## Nomenclatura multi-remote

Le API scritte `multiremote` o `Multiremote` ora usano camelCase / PascalCase come `multiRemote` / `MultiRemote`. I vecchi nomi non hanno alias.

| v9 | v10 |
|----|-----|
| `multiremote()` (`webdriverio`) | `multiRemote()` |
| `WebdriverIO.MultiremoteConfig` | `WebdriverIO.MultiRemoteConfig` |
| `isMultiremote` sul browser, sui risultati di `$` e `$$` | `isMultiRemote` |
| `Capabilities.RequestedMultiremoteCapabilities` | `Capabilities.RequestedMultiRemoteCapabilities` |
| `Capabilities.WithRequestedMultiremoteCapabilities` | `Capabilities.WithRequestedMultiRemoteCapabilities` |
| `runner.isMultiremote` (reporter) | `runner.isMultiRemote` |
| `Launcher#isMultiremote`, `Launcher#isParallelMultiremote` (`@wdio/cli`) | `isMultiRemote`, `isParallelMultiRemote` |
| `isMultiremote` in `Workers.WorkerMessage`, `WorkerInstance` (`@wdio/local-runner`) e `SpecReporter#getTestLink()` | `isMultiRemote` |
| `browser.multiremoteFetch()` (`@wdio/webdriver-mock-service`) | `browser.multiRemoteFetch()` |

Cerca `multiremote` e `Multiremote` (rispettando maiuscole e minuscole) e sostituisci ogni corrispondenza. Anche i report Allure etichettano i test multi-remote con `isMultiRemote` invece di `isMultiremote`.

## Display virtuali su Linux

`@wdio/xvfb` è sostituito da `@wdio/display-server`. Invece di racchiudere ogni worker in `xvfb-run`, il testrunner avvia un unico display server per l'intera esecuzione, prima dell'hook `onPrepare` di qualsiasi servizio. Preferisce Weston in modalità headless e ripiega su Xvfb. Vedi [Headless e display server](/docs/headless-and-display-servers) per i dettagli.

Le opzioni sono state rinominate. I vecchi nomi funzionano ancora nella v10 ma registrano un avviso di deprecazione, e saranno rimossi nella v11. Se imposti entrambi i nomi, prevale quello nuovo:

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

`xvfbMaxRetries` e `xvfbRetryDelay` non hanno alcun effetto, e saranno anch'essi rimossi nella v11. L'avvio non viene più ritentato: se Weston non si avvia, il testrunner prova Xvfb, e se nessuno dei due si avvia, l'esecuzione continua senza display.

Una configurazione che imposta una delle quattro opzioni rinominate senza la sua sostituta, e non imposta `displayServer`, continua a usare Xvfb come faceva la v9. A meno che non disattivi il display server, registra anche `Preferring Xvfb, as v9 did, because the config sets v9 display keys`. Una volta rinominate le opzioni, aggiungi `displayServer: 'xvfb'` per mantenere Xvfb, oppure omettilo per preferire Weston. In modalità automatica un comando di installazione personalizzato viene eseguito prima per Weston, e di nuovo per Xvfb solo se Weston non è ancora disponibile o non si avvia e Xvfb manca ancora, quindi imposta `displayServer` sul server che installa per saltare il tentativo dell'altro server.

L'installazione automatica non supporta più `yum`, che la v9 usava sugli host senza `dnf`. La v10 rileva solo `apt-get`, `dnf`, `zypper`, `pacman`, `apk` e `xbps-install`, quindi installa Xvfb tu stesso su un host con solo `yum`.

Un array `xvfbAutoInstallCommand` veniva eseguito tramite una shell nella v9, quindi elementi come `&&` o `VAR=value` funzionavano. Gli array ora vengono eseguiti senza shell con entrambi i nomi dell'opzione, quindi usa una stringa per la sintassi della shell.

Altre modifiche che potresti notare:

- Tutti i worker condividono un unico display. Nella v9 ogni worker aveva il proprio display. Le pagine di Chrome ed Edge ora possono non avere il focus, vedi [Focus della finestra](/docs/headless-and-display-servers#window-focus).
- Il numero di display di Xvfb non è fisso. Leggilo da `DISPLAY` invece di presumere `:99`.
- Un host con solo `WAYLAND_DISPLAY` impostato ora viene considerato dotato di un display. La v9 lì eseguiva i worker sotto Xvfb, poiché `DISPLAY` non era impostato. La v10 non avvia nulla, apre le finestre del browser sul tuo compositor e imposta `XDG_SESSION_TYPE`, `GDK_BACKEND` ed `ELECTRON_OZONE_PLATFORM_HINT` a `wayland` per l'esecuzione. Per eseguirli sotto Xvfb come prima, rimuovi `WAYLAND_DISPLAY` e imposta `displayServer: 'xvfb'`.
- Lo schermo predefinito è 1920x1080. La v9 usava il valore predefinito di `xvfb-run`, che è 1280x1024 su Debian e Ubuntu e 640x480 su Fedora, RHEL e Arch. Per mantenere la dimensione usata dalle tue baseline, imposta `displayServerWidth` e `displayServerHeight` su di essa.
- I browser scelgono Wayland o X11 in base al `XDG_SESSION_TYPE` impostato dal display server. Sotto Weston, WebdriverIO aggiunge anche `--ozone-platform=wayland` a Chrome ed Edge che avvia, poiché Chrome ed Edge prima della 140 (Chrome for Testing prima della 135) ignorano `XDG_SESSION_TYPE`. Weston non fornisce `DISPLAY`, quindi se i tuoi test o strumenti necessitano di X11, imposta `displayServer: 'xvfb'`.
- Se usavi direttamente `XvfbManager` o l'istanza `xvfb` di `@wdio/xvfb`, usa invece `DisplayServerManager` di `@wdio/display-server`. Dove eseguivi `xvfb.init()` e racchiudevi i comandi in `xvfb-run`, o avviavi processi tramite `ProcessFactory`, avvia un display e passa il suo ambiente ai processi che ne hanno bisogno. L'esempio usa Xvfb a 1280x1024, come faceva la v9 su Debian e Ubuntu. Su un host in cui è impostato solo `WAYLAND_DISPLAY`, rimuovilo prima, altrimenti `startDaemon()` non avvia nulla:

  ```js
  import { spawn } from 'node:child_process'
  import { once } from 'node:events'
  import { DisplayServerManager } from '@wdio/display-server'

  const manager = new DisplayServerManager({ displayServer: 'xvfb' })
  const daemon = await manager.startDaemon({ width: 1280, height: 1024 })
  // startDaemon() restituisce null anche quando esiste già un display
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

Per gli scope BiDi non è più necessario un ricaricamento.

```diff
  await browser.emulate('onLine', false)
- // cambiava solo `navigator.onLine`; il traffico continuava a passare
+ // il browsing context è offline, inclusi fetch, WebSocket e WebTransport
```

- `onLine: false` chiama `emulation.setNetworkConditions` con `{ type: 'offline' }`. `true` e il ripristino dello scope lo annullano. Throughput e latenza restano su `browser.throttleNetwork()`.
- `colorScheme` imposta la media feature `prefers-color-scheme`, quindi il CSS `@media (prefers-color-scheme)` segue `matchMedia`.
- `userAgent` è l'override dello user agent del browser, non una proprietà `navigator.userAgent` modificata.
- `geolocation` usa lo stack di geolocalizzazione del browser. Una pagina può comunque richiedere `browser.setPermissions({ name: 'geolocation' }, 'granted')`. `{ error: 'positionUnavailable' }` segnala quell'errore invece delle coordinate.
- `colorScheme` e `media` condividono un'unica mappa delle media feature. La chiamata successiva sostituisce l'intera mappa, e il ripristino di uno dei due scope la azzera.
- `device` imposta user agent, viewport, touch, layout del testo mobile e viewport meta dal descrittore del dispositivo. Non modifica `screen` né `orientation`.

I nuovi scope sono `media`, `locale`, `timezone`, `touch`, `orientation`, `screen`, `viewportMeta`, `textLayout`, `scripting`, `scrollbar` e `forcedColors`. Un browser che non implementa un comando rifiuta la chiamata con il proprio errore (`unknown command` o `unsupported operation`). WebdriverIO non ripiega su uno script di preload né su CDP. Se `device` viene rifiutato a metà, vengono ripristinati lo user agent, il viewport, il touch, il layout del testo e il viewport meta precedenti.

`wdio session emulate` accetta gli stessi scope. Non ti chiede più di ricaricare per un override che si applica immediatamente. I preset di `emulate network` ed `emulate cpu` sono invariati e restano solo per Chromium. Vedi [Emulazione](/docs/emulation).

## Prossimi passi

- Copia la [skill di migrazione](#migrate-with-a-coding-agent) nel progetto e chiedi a un agent di applicarla.
- [WebdriverIO per i coding agent](/docs/ai-agents) per scrivere nuovi test v10.
- [Headless e display server](/docs/headless-and-display-servers) quando la suite viene eseguita su Linux.