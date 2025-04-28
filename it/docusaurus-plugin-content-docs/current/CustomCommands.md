---
id: customcommands
title: Comandi Personalizzati
---

Se desideri estendere l'istanza `browser` con il tuo set di comandi, il metodo del browser `addCommand` è qui per te. Puoi scrivere il tuo comando in modo asincrono, proprio come nelle tue specifiche.

## Parametri

### Nome del Comando

Un nome che definisce il comando e che verrà collegato all'ambito del browser o dell'elemento.

Tipo: `String`

### Funzione Personalizzata

Una funzione che viene eseguita quando il comando viene chiamato. L'ambito `this` è o [`WebdriverIO.Browser`](/docs/api/browser) o [`WebdriverIO.Element`](/docs/api/element) a seconda che il comando sia collegato all'ambito del browser o dell'elemento.

Tipo: `Function`

### Ambito Target

Flag per decidere se allegare il comando all'ambito del browser o dell'elemento. Se impostato su `true` il comando sarà un comando dell'elemento.

Tipo: `Boolean`<br />
Default: `false`

## Esempi

Questo esempio mostra come aggiungere un nuovo comando che restituisce l'URL corrente e il titolo come un unico risultato. L'ambito (`this`) è un oggetto [`WebdriverIO.Browser`](/docs/api/browser).

```js
browser.addCommand('getUrlAndTitle', async function (customVar) {
    // `this` refers to the `browser` scope
    return {
        url: await this.getUrl(),
        title: await this.getTitle(),
        customVar: customVar
    }
})
```

Inoltre, puoi estendere l'istanza dell'elemento con il tuo set di comandi, passando `true` come argomento finale. L'ambito (`this`) in questo caso è un oggetto [`WebdriverIO.Element`](/docs/api/element).

```js
browser.addCommand("waitAndClick", async function () {
    // `this` is return value of $(selector)
    await this.waitForDisplayed()
    await this.click()
}, true)
```

I comandi personalizzati ti offrono l'opportunità di raggruppare una sequenza specifica di comandi che utilizzi frequentemente in una singola chiamata. Puoi definire comandi personalizzati in qualsiasi punto della tua suite di test; assicurati solo che il comando sia definito *prima* del suo primo utilizzo. (L'hook `before` nel tuo `wdio.conf.js` è un buon posto per crearli.)

Una volta definiti, puoi utilizzarli come segue:

```js
it('should use my custom command', async () => {
    await browser.url('http://www.github.com')
    const result = await browser.getUrlAndTitle('foobar')

    assert.strictEqual(result.url, 'https://github.com/')
    assert.strictEqual(result.title, 'GitHub · Where software is built')
    assert.strictEqual(result.customVar, 'foobar')
})
```

__Nota:__ Se registri un comando personalizzato nell'ambito `browser`, il comando non sarà accessibile per gli elementi. Allo stesso modo, se registri un comando nell'ambito dell'elemento, non sarà accessibile nell'ambito `browser`:

```js
browser.addCommand("myCustomBrowserCommand", () => { return 1 })
const elem = await $('body')
console.log(typeof browser.myCustomBrowserCommand) // outputs "function"
console.log(typeof elem.myCustomBrowserCommand()) // outputs "undefined"

browser.addCommand("myCustomElementCommand", () => { return 1 }, true)
const elem2 = await $('body')
console.log(typeof browser.myCustomElementCommand) // outputs "undefined"
console.log(await elem2.myCustomElementCommand('foobar')) // outputs "1"

const elem3 = await $('body')
elem3.addCommand("myCustomElementCommand2", () => { return 2 })
console.log(typeof browser.myCustomElementCommand2) // outputs "undefined"
console.log(await elem3.myCustomElementCommand2('foobar')) // outputs "2"
```

__Nota:__ Se hai bisogno di concatenare un comando personalizzato, il comando deve terminare con `$`,

```js
browser.addCommand("user$", (locator) => { return ele })
browser.addCommand("user$", (locator) => { return ele }, true)
await browser.user$('foo').user$('bar').click()
```

Fai attenzione a non sovraccaricare l'ambito `browser` con troppi comandi personalizzati.

Consigliamo di definire la logica personalizzata negli [oggetti pagina](pageobjects), in modo che siano legati a una pagina specifica.

### Multiremote

`addCommand` funziona in modo simile per multiremote, tranne per il fatto che il nuovo comando si propagherà alle istanze figlie. Devi fare attenzione quando usi l'oggetto `this` poiché il `browser` multiremote e le sue istanze figlie hanno un `this` diverso.

Questo esempio mostra come aggiungere un nuovo comando per multiremote.

```js
import { multiremotebrowser } from '@wdio/globals'

multiremotebrowser.addCommand('getUrlAndTitle', async function (this: WebdriverIO.MultiRemoteBrowser, customVar: any) {
    // `this` refers to:
    //      - MultiRemoteBrowser scope for browser
    //      - Browser scope for instances
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

## Estendere le Definizioni dei Tipi

Con TypeScript, è facile estendere le interfacce di WebdriverIO. Aggiungi tipi ai tuoi comandi personalizzati in questo modo:

1. Crea un file di definizione del tipo (ad es., `./src/types/wdio.d.ts`)
2. a. Se utilizzi un file di definizione del tipo in stile modulo (usando import/export e `declare global WebdriverIO` nel file di definizione del tipo), assicurati di includere il percorso del file nella proprietà `include` di `tsconfig.json`.

   b. Se utilizzi file di definizione del tipo in stile ambiente (senza import/export nei file di definizione del tipo e `declare namespace WebdriverIO` per i comandi personalizzati), assicurati che `tsconfig.json` *non* contenga alcuna sezione `include`, poiché ciò farà sì che tutti i file di definizione del tipo non elencati nella sezione `include` non vengano riconosciuti da typescript.

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

Se utilizzi librerie esterne (ad es., per effettuare chiamate al database) che supportano le promesse, un approccio interessante per integrarle è quello di avvolgere determinati metodi API con un comando personalizzato.

Quando restituisci la promessa, WebdriverIO garantisce che non continui con il comando successivo fino a quando la promessa non viene risolta. Se la promessa viene rifiutata, il comando genererà un errore.

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

Non è consigliabile farlo, perché potrebbe portare a un comportamento imprevedibile del framework!

L'approccio generale è simile a `addCommand`, l'unica differenza è che il primo argomento nella funzione del comando è la funzione originale che stai per sovrascrivere. Guarda alcuni esempi di seguito.

### Sovrascrivere i Comandi del Browser

```js
/**
 * print milliseconds before pause and return its value.
 */
// 'pause'            - name of command to be overwritten
// origPauseFunction  - original pause function
browser.overwriteCommand('pause', async (origPauseFunction, ms) => {
    console.log(`sleeping for ${ms}`)
    await origPauseFunction(ms)
    return ms
})

// then use it as before
console.log(`was sleeping for ${await browser.pause(1000)}`)
```

### Sovrascrivere i Comandi dell'Elemento

Sovrascrivere i comandi a livello di elemento è quasi lo stesso. Passa semplicemente `true` come terzo argomento a `overwriteCommand`:

```js
/**
 * Attempt to scroll to element if it is not clickable.
 * Pass { force: true } to click with JS even if element is not visible or clickable.
 */
// 'click'            - name of command to be overwritten
// origClickFunction  - original click function
browser.overwriteCommand('click', async function (origClickFunction, { force = false } = {}) {
    if (!force) {
        try {
            // attempt to click
            await origClickFunction()
            return null
        } catch (err) {
            if (err.message.includes('not clickable at point')) {
                console.warn('WARN: Element', this.selector, 'is not clickable.',
                    'Scrolling to it before clicking again.')

                // scroll to element and click again
                await this.scrollIntoView()
                return origClickFunction()
            }
            throw err
        }
    }

    // clicking with js
    console.warn('WARN: Using force click for', this.selector)
    await browser.execute((el) => {
        el.click()
    }, this)
}, true) // don't forget to pass `true` as 3rd argument

// then use it as before
const elem = await $('body')
await elem.click()

// or pass params
await elem.click({ force: true })
```

## Aggiungere Altri Comandi WebDriver

Se stai utilizzando il protocollo WebDriver e esegui test su una piattaforma che supporta comandi aggiuntivi non definiti da nessuna delle definizioni di protocollo in [`@wdio/protocols`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-protocols/src/protocols) puoi aggiungerli manualmente tramite l'interfaccia `addCommand`. Il pacchetto `webdriver` offre un wrapper di comando che permette di registrare questi nuovi endpoint nello stesso modo degli altri comandi, fornendo gli stessi controlli di parametri e gestione degli errori. Per registrare questo nuovo endpoint importa il wrapper di comando e registra un nuovo comando con esso come segue:

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
// call command without required url parameter and payload
await browser.myNewCommand()

/**
 * results in the following error:
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

Chiamando correttamente il comando, ad esempio `browser.myNewCommand('foo', 'bar')`, si effettua correttamente una richiesta WebDriver ad es. `http://localhost:4444/session/7bae3c4c55c3bf82f54894ddc83c5f31/foobar/foo` con un payload come `{ foo: 'bar' }`.

:::note
Il parametro url `:sessionId` verrà automaticamente sostituito con l'id di sessione della sessione WebDriver. Altri parametri url possono essere applicati ma devono essere definiti all'interno di `variables`.
:::

Vedi esempi di come i comandi di protocollo possono essere definiti nel pacchetto [`@wdio/protocols`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-protocols/src/protocols).