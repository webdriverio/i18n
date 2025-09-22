---
id: customcommands
title: Comandi Personalizzati
---

Se vuoi estendere l'istanza `browser` con il tuo set di comandi, il metodo `addCommand` del browser è qui per te. Puoi scrivere il tuo comando in modo asincrono, proprio come nelle tue specifiche.

## Parametri

### Nome del Comando

Un nome che definisce il comando e che sarà collegato allo scope del browser o dell'elemento.

Tipo: `String`

### Funzione Personalizzata

Una funzione che viene eseguita quando il comando viene chiamato. Lo scope `this` è sia [`WebdriverIO.Browser`](/docs/api/browser) che [`WebdriverIO.Element`](/docs/api/element) a seconda che il comando venga collegato allo scope del browser o dell'elemento.

Tipo: `Function`

### Opzioni

Oggetto con opzioni di configurazione che modificano il comportamento del comando personalizzato

#### Target Scope

Flag per decidere se collegare il comando allo scope del browser o dell'elemento. Se impostato a `true` il comando sarà un comando dell'elemento.

Nome Opzione: `attachToElement`
Tipo: `Boolean`<br />
Predefinito: `false`

#### Disabilita implicitWait

Flag per decidere se attendere implicitamente che l'elemento esista prima di chiamare il comando personalizzato.

Nome Opzione: `disableElementImplicitWait`
Tipo: `Boolean`<br />
Predefinito: `false`

## Esempi

Questo esempio mostra come aggiungere un nuovo comando che restituisce l'URL e il titolo correnti come un unico risultato. Lo scope (`this`) è un oggetto [`WebdriverIO.Browser`](/docs/api/browser).

```js
browser.addCommand('getUrlAndTitle', async function (customVar) {
    // `this` si riferisce allo scope `browser`
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
    // `this` è il valore restituito da $(selector)
    await this.waitForDisplayed()
    await this.click()
}, { attachToElement: true })
```

Per impostazione predefinita, i comandi personalizzati dell'elemento attendono che l'elemento esista prima di chiamare il comando personalizzato. Anche se la maggior parte delle volte questo è desiderato, se non lo è, può essere disabilitato con `disableImplicitWait`:

```js
browser.addCommand("waitAndClick", async function () {
    // `this` è il valore restituito da $(selector)
    await this.waitForExists()
    await this.click()
}, { attachToElement: true, disableElementImplicitWait: true })
```


I comandi personalizzati ti danno l'opportunità di raggruppare una sequenza specifica di comandi che usi frequentemente in un'unica chiamata. Puoi definire comandi personalizzati in qualsiasi punto della tua suite di test; assicurati solo che il comando sia definito *prima* del suo primo utilizzo. (L'hook `before` nel tuo `wdio.conf.js` è un buon posto per crearli.)

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

__Nota:__ Se registri un comando personalizzato nello scope `browser`, il comando non sarà accessibile per gli elementi. Allo stesso modo, se registri un comando nello scope dell'elemento, non sarà accessibile nello scope `browser`:

```js
browser.addCommand("myCustomBrowserCommand", () => { return 1 })
const elem = await $('body')
console.log(typeof browser.myCustomBrowserCommand) // outputs "function"
console.log(typeof elem.myCustomBrowserCommand()) // outputs "undefined"

browser.addCommand("myCustomElementCommand", () => { return 1 }, { attachToElement: true })
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
browser.addCommand("user$", (locator) => { return ele }, { attachToElement: true })
await browser.user$('foo').user$('bar').click()
```

Fai attenzione a non sovraccaricare lo scope `browser` con troppi comandi personalizzati.

Consigliamo di definire logiche personalizzate negli [oggetti pagina](pageobjects), in modo che siano vincolati a una pagina specifica.

### Multiremote

`addCommand` funziona in modo simile per multiremote, tranne che il nuovo comando si propaga alle istanze figlio. Devi fare attenzione quando usi l'oggetto `this` poiché il `browser` multiremote e le sue istanze figlie hanno `this` diversi.

Questo esempio mostra come aggiungere un nuovo comando per multiremote.

```js
import { multiremotebrowser } from '@wdio/globals'

multiremotebrowser.addCommand('getUrlAndTitle', async function (this: WebdriverIO.MultiRemoteBrowser, customVar: any) {
    // `this` si riferisce a:
    //      - MultiRemoteBrowser scope per browser
    //      - Browser scope per le istanze
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

## Estendere le Definizioni di Tipo

Con TypeScript, è facile estendere le interfacce WebdriverIO. Aggiungi i tipi ai tuoi comandi personalizzati in questo modo:

1. Crea un file di definizione di tipo (es., `./src/types/wdio.d.ts`)
2. a. Se usi un file di definizione di tipo in stile modulo (usando import/export e `declare global WebdriverIO` nel file di definizione del tipo), assicurati di includere il percorso del file nella proprietà `include` di `tsconfig.json`.

   b. Se usi file di definizione di tipo in stile ambientale (nessun import/export nei file di definizione del tipo e `declare namespace WebdriverIO` per i comandi personalizzati), assicurati che `tsconfig.json` *non* contenga alcuna sezione `include`, poiché ciò farà sì che tutti i file di definizione dei tipi non elencati nella sezione `include` non vengano riconosciuti da TypeScript.

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

Se utilizzi librerie esterne (ad esempio, per effettuare chiamate al database) che supportano le promesse, un buon approccio per integrarle è quello di avvolgere determinati metodi API con un comando personalizzato.

Quando restituisci la promessa, WebdriverIO garantisce che non continui con il comando successivo fino a quando la promessa non viene risolta. Se la promessa viene rifiutata, il comando genererà un errore.

```js
browser.addCommand('makeRequest', async (url) => {
    const response = await fetch(url)
    return await response.json()
})
```

Quindi, basta usarlo nelle tue specifiche di test WDIO:

```js
it('execute external library in a sync way', async () => {
    await browser.url('...')
    const body = await browser.makeRequest('http://...')
    console.log(body) // returns response body
})
```

**Nota:** Il risultato del tuo comando personalizzato è il risultato della promessa che restituisci.

## Sovrascrivere Comandi

Puoi anche sovrascrivere i comandi nativi con `overwriteCommand`.

Non è consigliato farlo, perché potrebbe portare a un comportamento imprevedibile del framework!

L'approccio generale è simile a `addCommand`, l'unica differenza è che il primo argomento nella funzione di comando è la funzione originale che stai per sovrascrivere. Si prega di vedere alcuni esempi di seguito.

### Sovrascrivere i Comandi del Browser

```js
/**
 * Print milliseconds before pause and return its value.
 * 
 * @param pause - name of command to be overwritten
 * @param this of func - the original browser instance on which the function was called
 * @param originalPauseFunction of func - the original pause function
 * @param ms of func - the actual parameters passed
  */
browser.overwriteCommand('pause', async function (this, originalPauseFunction, ms) {
    console.log(`sleeping for ${ms}`)
    await originalPauseFunction(ms)
    return ms
})

// then use it as before
console.log(`was sleeping for ${await browser.pause(1000)}`)
```

### Sovrascrivere i Comandi degli Elementi

Sovrascrivere i comandi a livello di elemento è quasi lo stesso. Basta passare `true` come terzo argomento a `overwriteCommand`:

```js
/**
 * Attempt to scroll to element if it is not clickable.
 * Pass { force: true } to click with JS even if element is not visible or clickable.
 * Show that the original function argument type can be kept with `options?: ClickOptions`
 *
 * @param this of func - the element on which the original function was called
 * @param originalClickFunction of func - the original pause function
 * @param options of func - the actual parameters passed
 */
browser.overwriteCommand(
    'click',
    async function (this, originalClickFunction, options?: ClickOptions & { force?: boolean }) {
        const { force, ...restOptions } = options || {}
        if (!force) {
            try {
                // attempt to click
                await originalClickFunction(options)
                return
            } catch (err) {
                if ((err as Error).message.includes('not clickable at point')) {
                    console.warn('WARN: Element', this.selector, 'is not clickable.', 'Scrolling to it before clicking again.')

                    // scroll to element and click again
                    await this.scrollIntoView()
                    return originalClickFunction(options)
                }
                throw err
            }
        }

        // clicking with js
        console.warn('WARN: Using force click for', this.selector)
        await browser.execute((el) => {
            el.click()
        }, this)
    },
    { attachToElement: true }, // Don't forget to attach it to the element
)

// then use it as before
const elem = await $('body')
await elem.click()

// or pass params
await elem.click({ force: true })
```

## Aggiungere Altri Comandi WebDriver

Se stai utilizzando il protocollo WebDriver ed esegui test su una piattaforma che supporta comandi aggiuntivi non definiti da nessuna delle definizioni di protocollo in [`@wdio/protocols`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-protocols/src/protocols), puoi aggiungerli manualmente tramite l'interfaccia `addCommand`. Il pacchetto `webdriver` offre un wrapper di comando che consente di registrare questi nuovi endpoint nello stesso modo degli altri comandi, fornendo gli stessi controlli dei parametri e gestione degli errori. Per registrare questo nuovo endpoint, importa il wrapper del comando e registra un nuovo comando con esso come segue:

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

Chiamare questo comando con parametri non validi comporta la stessa gestione degli errori dei comandi di protocollo predefiniti, ad es.:

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

Chiamando correttamente il comando, ad es. `browser.myNewCommand('foo', 'bar')`, si effettua correttamente una richiesta WebDriver a es. `http://localhost:4444/session/7bae3c4c55c3bf82f54894ddc83c5f31/foobar/foo` con un payload come `{ foo: 'bar' }`.

:::note
Il parametro url `:sessionId` verrà automaticamente sostituito con l'ID sessione della sessione WebDriver. È possibile applicare altri parametri url ma devono essere definiti all'interno di `variables`.
:::

Vedi esempi di come possono essere definiti i comandi di protocollo nel pacchetto [`@wdio/protocols`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-protocols/src/protocols).