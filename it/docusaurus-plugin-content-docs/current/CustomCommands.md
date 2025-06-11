---
id: customcommands
title: Comandi Personalizzati
---

Se vuoi estendere l'istanza del `browser` con il tuo set di comandi, il metodo del browser `addCommand` è qui per te. Puoi scrivere il tuo comando in modo asincrono, proprio come nelle tue specifiche.

## Parametri

### Nome del Comando

Un nome che definisce il comando e sarà collegato allo scope del browser o dell'elemento.

Tipo: `String`

### Funzione Personalizzata

Una funzione che viene eseguita quando il comando viene chiamato. Lo scope `this` è [`WebdriverIO.Browser`](/docs/api/browser) o [`WebdriverIO.Element`](/docs/api/element) a seconda che il comando venga collegato allo scope del browser o dell'elemento.

Tipo: `Function`

### Scope di Destinazione

Flag per decidere se collegare il comando allo scope del browser o dell'elemento. Se impostato su `true` il comando sarà un comando dell'elemento.

Tipo: `Boolean`<br />
Default: `false`

## Esempi

Questo esempio mostra come aggiungere un nuovo comando che restituisce l'URL e il titolo correnti come un unico risultato. Lo scope (`this`) è un oggetto [`WebdriverIO.Browser`](/docs/api/browser).

```js
browser.addCommand('getUrlAndTitle', async function (customVar) {
    // `this` si riferisce allo scope del `browser`
    return {
        url: await this.getUrl(),
        title: await this.getTitle(),
        customVar: customVar
    }
})
```

Inoltre, puoi estendere l'istanza dell'elemento con il tuo set di comandi, passando `true` come argomento finale. Lo scope (`this`) in questo caso è un oggetto [`WebdriverIO.Element`](/docs/api/element).

```js
browser.addCommand("waitAndClick", async function () {
    // `this` è il valore di ritorno di $(selector)
    await this.waitForDisplayed()
    await this.click()
}, true)
```

I comandi personalizzati ti offrono l'opportunità di raggruppare una specifica sequenza di comandi che usi frequentemente in una singola chiamata. Puoi definire comandi personalizzati in qualsiasi punto della tua suite di test; assicurati solo che il comando sia definito *prima* del suo primo utilizzo. (L'hook `before` nel tuo `wdio.conf.js` è un buon posto per crearli.)

Una volta definiti, puoi usarli come segue:

```js
it('should use my custom command', async () => {
    await browser.url('http://www.github.com')
    const result = await browser.getUrlAndTitle('foobar')

    assert.strictEqual(result.url, 'https://github.com/')
    assert.strictEqual(result.title, 'GitHub · Where software is built')
    assert.strictEqual(result.customVar, 'foobar')
})
```

__Nota:__ Se registri un comando personalizzato nello scope del `browser`, il comando non sarà accessibile per gli elementi. Analogamente, se registri un comando nello scope dell'elemento, non sarà accessibile nello scope del `browser`:

```js
browser.addCommand("myCustomBrowserCommand", () => { return 1 })
const elem = await $('body')
console.log(typeof browser.myCustomBrowserCommand) // stampa "function"
console.log(typeof elem.myCustomBrowserCommand()) // stampa "undefined"

browser.addCommand("myCustomElementCommand", () => { return 1 }, true)
const elem2 = await $('body')
console.log(typeof browser.myCustomElementCommand) // stampa "undefined"
console.log(await elem2.myCustomElementCommand('foobar')) // stampa "1"

const elem3 = await $('body')
elem3.addCommand("myCustomElementCommand2", () => { return 2 })
console.log(typeof browser.myCustomElementCommand2) // stampa "undefined"
console.log(await elem3.myCustomElementCommand2('foobar')) // stampa "2"
```

__Nota:__ Se hai bisogno di concatenare un comando personalizzato, il comando dovrebbe terminare con `$`,

```js
browser.addCommand("user$", (locator) => { return ele })
browser.addCommand("user$", (locator) => { return ele }, true)
await browser.user$('foo').user$('bar').click()
```

Fai attenzione a non sovraccaricare lo scope del `browser` con troppi comandi personalizzati.

Consigliamo di definire la logica personalizzata nei [page objects](pageobjects), in modo che siano legati a una pagina specifica.

### Multiremote

`addCommand` funziona in modo simile per multiremote, tranne per il fatto che il nuovo comando si propagherà verso le istanze figlie. Devi fare attenzione quando usi l'oggetto `this` poiché il `browser` multiremote e le sue istanze figlie hanno `this` diversi.

Questo esempio mostra come aggiungere un nuovo comando per multiremote.

```js
import { multiremotebrowser } from '@wdio/globals'

multiremotebrowser.addCommand('getUrlAndTitle', async function (this: WebdriverIO.MultiRemoteBrowser, customVar: any) {
    // `this` si riferisce a:
    //      - Scope MultiRemoteBrowser per browser
    //      - Scope Browser per le istanze
    return {
        url: await this.getUrl(),
        title: await this.getTitle(),
        customVar: customVar
    }
})

multiremotebrowser.getUrlAndTitle()
/*
{
    url: [ 'https://webdriver.io/', 'https://webdriver.io/' ],
    title: [
        'WebdriverIO · Next-gen browser and mobile automation test framework for Node.js | WebdriverIO',
        'WebdriverIO · Next-gen browser and mobile automation test framework for Node.js | WebdriverIO'
    ],
    customVar: undefined
}
*/

multiremotebrowser.getInstance('browserA').getUrlAndTitle()
/*
{
    url: 'https://webdriver.io/',
    title: 'WebdriverIO · Next-gen browser and mobile automation test framework for Node.js | WebdriverIO',
    customVar: undefined
}
*/
```

## Estendi le Definizioni di Tipo

Con TypeScript, è facile estendere le interfacce di WebdriverIO. Aggiungi tipi ai tuoi comandi personalizzati così:

1. Crea un file di definizione di tipo (es. `./src/types/wdio.d.ts`)
2. a. Se usi un file di definizione di tipo in stile modulo (utilizzando import/export e `declare global WebdriverIO` nel file di definizione del tipo), assicurati di includere il percorso del file nella proprietà `include` di `tsconfig.json`.

   b. Se usi file di definizione di tipo in stile ambiente (senza import/export nei file di definizione dei tipi e `declare namespace WebdriverIO` per i comandi personalizzati), assicurati che il `tsconfig.json` *non* contenga alcuna sezione `include`, poiché ciò farà sì che tutti i file di definizione dei tipi non elencati nella sezione `include` non vengano riconosciuti da TypeScript.

<Tabs
  defaultValue="modules"
  values={[
    {label: 'Modules (using import/export)', value: 'modules'},
    {label: 'Ambient Type Definitions (no tsconfig include)', value: 'ambient'},
  ]
}>
<TabItem value="modules">

```json title="tsconfig.json"
{
    "compilerOptions": { ... },
    "include": [
        "./test/**/*.ts",
        "./src/types/**/*.ts"
    ]
}
```

</TabItem>
<TabItem value="ambient">

```json title="tsconfig.json"
{
    "compilerOptions": { ... }
}
```

</TabItem>
</Tabs>

3. Aggiungi definizioni per i tuoi comandi in base alla tua modalità di esecuzione.

<Tabs
  defaultValue="modules"
  values={[
    {label: 'Modules (using import/export)', value: 'modules'},
    {label: 'Ambient Type Definitions', value: 'ambient'},
  ]
}>
<TabItem value="modules">

```typescript
declare global {
    namespace WebdriverIO {
        interface Browser {
            browserCustomCommand: (arg: any) => Promise<void>
        }

        interface MultiRemoteBrowser {
            browserCustomCommand: (arg: any) => Promise<void>
        }

        interface Element {
            elementCustomCommand: (arg: any) => Promise<number>
        }
    }
}
```

</TabItem>
<TabItem value="ambient">

```typescript
declare namespace WebdriverIO {
    interface Browser {
        browserCustomCommand: (arg: any) => Promise<void>
    }

    interface MultiRemoteBrowser {
        browserCustomCommand: (arg: any) => Promise<void>
    }

    interface Element {
        elementCustomCommand: (arg: any) => Promise<number>
    }
}
```

</TabItem>
</Tabs>

## Integrare Librerie di Terze Parti

Se utilizzi librerie esterne (ad esempio per effettuare chiamate al database) che supportano le promesse, un approccio interessante per integrarle è quello di incapsulare determinati metodi API con un comando personalizzato.

Quando restituisci la promessa, WebdriverIO assicura che non continui con il comando successivo finché la promessa non viene risolta. Se la promessa viene respinta, il comando genererà un errore.

```js
browser.addCommand('makeRequest', async (url) => {
    const response = await fetch(url)
    return await response.json()
})
```

Quindi, usalo semplicemente nelle tue specifiche di test WDIO:

```js
it('execute external library in a sync way', async () => {
    await browser.url('...')
    const body = await browser.makeRequest('http://...')
    console.log(body) // returns response body
})
```

**Nota:** Il risultato del tuo comando personalizzato è il risultato della promessa che restituisci.

## Sovrascrivere i Comandi

Puoi anche sovrascrivere i comandi nativi con `overwriteCommand`.

Non è consigliato farlo, perché può portare a comportamenti imprevedibili del framework!

L'approccio generale è simile a `addCommand`, l'unica differenza è che il primo argomento nella funzione di comando è la funzione originale che stai per sovrascrivere. Consulta alcuni esempi qui sotto.

### Sovrascrivere i Comandi del Browser

```js
/**
 * Stampa i millisecondi prima della pausa e restituisce il suo valore.
 * 
 * @param pause - nome del comando da sovrascrivere
 * @param this of func - l'istanza originale del browser su cui è stata chiamata la funzione
 * @param originalPauseFunction of func - la funzione di pausa originale
 * @param ms of func - i parametri effettivi passati
  */
browser.overwriteCommand('pause', async function (this, originalPauseFunction, ms) {
    console.log(`sleeping for ${ms}`)
    await originalPauseFunction(ms)
    return ms
})

// poi usalo come prima
console.log(`was sleeping for ${await browser.pause(1000)}`)
```

### Sovrascrivere i Comandi dell'Elemento

Sovrascrivere i comandi a livello di elemento è quasi lo stesso. Basta passare `true` come terzo argomento a `overwriteCommand`:

```js
/**
 * Tenta di scorrere fino all'elemento se non è cliccabile.
 * Passa { force: true } per cliccare con JS anche se l'elemento non è visibile o cliccabile.
 * Mostra che il tipo di argomento della funzione originale può essere mantenuto con `options?: ClickOptions`
 *
 * @param this of func - l'elemento su cui è stata chiamata la funzione originale
 * @param originalClickFunction of func - la funzione di pausa originale
 * @param options of func - i parametri effettivi passati
 */
browser.overwriteCommand(
    'click',
    async function (this, originalClickFunction, options?: ClickOptions & { force?: boolean }) {
        const { force, ...restOptions } = options || {}
        if (!force) {
            try {
                // tentativo di click
                await originalClickFunction(options)
                return
            } catch (err) {
                if ((err as Error).message.includes('not clickable at point')) {
                    console.warn('WARN: Element', this.selector, 'is not clickable.', 'Scrolling to it before clicking again.')

                    // scorri fino all'elemento e clicca di nuovo
                    await this.scrollIntoView()
                    return originalClickFunction(options)
                }
                throw err
            }
        }

        // cliccando con js
        console.warn('WARN: Using force click for', this.selector)
        await browser.execute((el) => {
            el.click()
        }, this)
    },
    true, // non dimenticare di passare `true` come terzo argomento
)

// poi usalo come prima
const elem = await $('body')
await elem.click()

// o passa parametri
await elem.click({ force: true })
```

## Aggiungere Altri Comandi WebDriver

Se stai utilizzando il protocollo WebDriver ed esegui test su una piattaforma che supporta comandi aggiuntivi non definiti da nessuna delle definizioni di protocollo in [`@wdio/protocols`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-protocols/src/protocols) puoi aggiungerli manualmente tramite l'interfaccia `addCommand`. Il pacchetto `webdriver` offre un wrapper di comando che consente di registrare questi nuovi endpoint nello stesso modo degli altri comandi, fornendo gli stessi controlli dei parametri e la gestione degli errori. Per registrare questo nuovo endpoint, importa il wrapper di comando e registra un nuovo comando con esso come segue:

```js
import { command } from 'webdriver'

browser.addCommand('myNewCommand', command('POST', '/session/:sessionId/foobar/:someId', {
    command: 'myNewCommand',
    description: 'a new WebDriver command',
    ref: 'https://vendor.com/commands/#myNewCommand',
    variables: [{
        name: 'someId',
        description: 'some id to something'
    }],
    parameters: [{
        name: 'foo',
        type: 'string',
        description: 'a valid parameter',
        required: true
    }]
}))
```

Chiamare questo comando con parametri non validi comporta la stessa gestione degli errori dei comandi di protocollo predefiniti, ad esempio:

```js
// chiama il comando senza il parametro url richiesto e il payload
await browser.myNewCommand()

/**
 * risulta nel seguente errore:
 * Error: Wrong parameters applied for myNewCommand
 * Usage: myNewCommand(someId, foo)
 *
 * Property Description:
 *   "someId" (string): some id to something
 *   "foo" (string): a valid parameter
 *
 * For more info see https://my-api.com
 *    at Browser.protocolCommand (...)
 *    ...
 */
```

Chiamando correttamente il comando, ad esempio `browser.myNewCommand('foo', 'bar')`, si effettua correttamente una richiesta WebDriver a ad esempio `http://localhost:4444/session/7bae3c4c55c3bf82f54894ddc83c5f31/foobar/foo` con un payload come `{ foo: 'bar' }`.

:::note
Il parametro url `:sessionId` verrà automaticamente sostituito con l'id della sessione della sessione WebDriver. Altri parametri url possono essere applicati ma devono essere definiti in `variables`.
:::

Vedi esempi di come i comandi di protocollo possono essere definiti nel pacchetto [`@wdio/protocols`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-protocols/src/protocols).