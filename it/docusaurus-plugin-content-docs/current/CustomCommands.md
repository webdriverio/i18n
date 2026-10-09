---
id: customcommands
title: Comandi personalizzati
description: "Aggiungi i tuoi comandi per browser ed elementi con addCommand, sovrascrivi i comandi esistenti ed estendi le definizioni di tipo TypeScript."
---

Se vuoi estendere l'istanza `browser` con il tuo set di comandi, il metodo del browser `addCommand` è qui per te. Puoi scrivere il tuo comando in modo asincrono, proprio come nelle tue specifiche.

## Parametri

### Nome del comando

<Option type="String">

Un nome che definisce il comando e che verrà associato allo scope del browser o dell'elemento.

</Option>

### Funzione personalizzata

<Option type="Function">

Una funzione che viene eseguita quando il comando viene chiamato. Lo scope `this` è [`WebdriverIO.Browser`](/docs/api/browser), [`WebdriverIO.Element`](/docs/api/element) o `WebdriverIO.BrowsingContext`, a seconda che il comando venga associato al browser, agli elementi o ai browsing context.

</Option>

### Opzioni

Oggetto con opzioni di configurazione che modificano il comportamento del comando personalizzato

#### Scope di destinazione

<Option type="Boolean" default="false" name="attachToElement">

Flag per decidere se associare il comando allo scope del browser o dell'elemento. Se impostato su `true` il comando sarà un comando dell'elemento.

</Option>

<Option type="Boolean" default="false" name="attachToBrowsingContext">

Flag per associare il comando a ogni browsing context: le schede, le finestre e i frame restituiti da `browser.url()`, `browser.newWindow()`, `browser.browsingContexts()` e `context.frame()` in una sessione WebDriver BiDi. Non può essere combinato con `attachToElement`. Vedi [Browsing context](#browsing-contexts).

</Option>

#### Disabilitare implicitWait

<Option type="Boolean" default="false" name="disableElementImplicitWait">

Flag per decidere se attendere implicitamente che l'elemento esista prima di chiamare il comando personalizzato.

</Option>

## Esempi

Questo esempio mostra come aggiungere un nuovo comando che restituisce l'URL corrente e il titolo come un unico risultato. Lo scope (`this`) è un oggetto [`WebdriverIO.Browser`](/docs/api/browser).

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

Inoltre, puoi estendere l'istanza dell'elemento con il tuo set di comandi impostando `attachToElement` su `true`. Lo scope (`this`) in questo caso è un oggetto [`WebdriverIO.Element`](/docs/api/element).

```js
browser.addCommand("waitAndClick", async function () {
    // `this` è il valore restituito da $(selector)
    await this.waitForDisplayed()
    await this.click()
}, { attachToElement: true })
```

Per impostazione predefinita, i comandi personalizzati degli elementi attendono che l'elemento esista prima di chiamare il comando personalizzato. Anche se nella maggior parte dei casi questo è il comportamento desiderato, se così non fosse, può essere disabilitato con `disableImplicitWait`:

```js
browser.addCommand("waitAndClick", async function () {
    // `this` è il valore restituito da $(selector)
    await this.waitForExists()
    await this.click()
}, { attachToElement: true, disableElementImplicitWait: true })
```

I comandi personalizzati ti danno l'opportunità di raggruppare una specifica sequenza di comandi che usi frequentemente in un'unica chiamata. Puoi definire comandi personalizzati in qualsiasi punto della tua suite di test; assicurati solo che il comando sia definito *prima* del suo primo utilizzo. (L'hook `before` nel tuo `wdio.conf.js` è un buon posto per crearli.)

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
console.log(typeof browser.myCustomBrowserCommand) // restituisce "function"
console.log(typeof elem.myCustomBrowserCommand()) // restituisce "undefined"

browser.addCommand("myCustomElementCommand", () => { return 1 }, { attachToElement: true })
const elem2 = await $('body')
console.log(typeof browser.myCustomElementCommand) // restituisce "undefined"
console.log(await elem2.myCustomElementCommand('foobar')) // restituisce "1"

const elem3 = await $('body')
elem3.addCommand("myCustomElementCommand2", () => { return 2 })
console.log(typeof browser.myCustomElementCommand2) // restituisce "undefined"
console.log(await elem3.myCustomElementCommand2('foobar')) // restituisce "2"
```

__Nota:__ Se hai bisogno di concatenare un comando personalizzato, il comando dovrebbe terminare con `$`,

```js
browser.addCommand("user$", (locator) => { return ele })
browser.addCommand("user$", (locator) => { return ele }, { attachToElement: true })
await browser.user$('foo').user$('bar').click()
```

Fai attenzione a non sovraccaricare lo scope `browser` con troppi comandi personalizzati.

Consigliamo di definire la logica personalizzata nei [page object](pageobjects), in modo che sia legata a una pagina specifica.

### Browsing contexts

In una sessione WebDriver BiDi, una scheda, una finestra e un frame sono ciascuno un `WebdriverIO.BrowsingContext`. Imposta `attachToBrowsingContext` su `true` per aggiungere un comando a tutti questi. Lo scope (`this`) è il context su cui è stato chiamato il comando, e `this.browser` è il browser a cui appartiene:

```js
browser.addCommand('heading', async function () {
    // `this` è la scheda, la finestra o il frame
    return this.$('h1').getText()
}, { attachToBrowsingContext: true })

const page = await browser.url('https://webdriver.io')
console.log(await page.heading())

const frame = await page.frame('iframe')
console.log(await frame.heading())
```

Il comando è disponibile sui context già esistenti e su ogni context creato successivamente, inclusi i frame di un'altra origine. Un comando che ha senso solo per una scheda o una finestra può verificare `this.isFrame`.

`addCommand` e `overwriteCommand` chiamati su un browsing context stesso generano un errore. Registra il comando sul browser.

### Multi-remote

`addCommand` funziona in modo simile per il multi-remote, con la differenza che il nuovo comando verrà propagato alle istanze figlie. Devi prestare attenzione quando usi l'oggetto `this`, poiché il `browser` multi-remote e le sue istanze figlie hanno un `this` diverso.

Questo esempio mostra come aggiungere un nuovo comando per il multi-remote.

```js
import { multiRemoteBrowser } from '@wdio/globals'

multiRemoteBrowser.addCommand('getUrlAndTitle', async function (this: WebdriverIO.MultiRemoteBrowser, customVar: any) {
    // `this` si riferisce a:
    //      - lo scope MultiRemoteBrowser per il browser
    //      - lo scope Browser per le istanze
    return {
        url: await this.getUrl(),
        title: await this.getTitle(),
        customVar: customVar
    }
})

multiRemoteBrowser.getUrlAndTitle()
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

multiRemoteBrowser.getInstance('browserA').getUrlAndTitle()
/*
{
    url: 'https://webdriver.io/',
    title: 'WebdriverIO · Next-gen browser and mobile automation test framework for Node.js | WebdriverIO',
    customVar: undefined
}
*/
```

## Estendere le definizioni di tipo

Con TypeScript, è facile estendere le interfacce di WebdriverIO. Aggiungi i tipi ai tuoi comandi personalizzati in questo modo:

1. Crea un file di definizione dei tipi (ad es. `./src/types/wdio.d.ts`)
2. a. Se usi un file di definizione dei tipi in stile modulo (che usa import/export e `declare global WebdriverIO` nel file di definizione dei tipi), assicurati di includere il percorso del file nella proprietà `include` di `tsconfig.json`.

   b. Se usi file di definizione dei tipi in stile ambient (nessun import/export nei file di definizione dei tipi e `declare namespace WebdriverIO` per i comandi personalizzati), assicurati che `tsconfig.json` *non* contenga alcuna sezione `include`, poiché ciò farebbe sì che tutti i file di definizione dei tipi non elencati nella sezione `include` non vengano riconosciuti da TypeScript.

<Tabs
  defaultValue="modules"
  values={[
    {label: 'Moduli (usando import/export)', value: 'modules'},
    {label: 'Definizioni di tipo ambient (senza include in tsconfig)', value: 'ambient'},
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

3. Aggiungi le definizioni per i tuoi comandi in base alla tua modalità di esecuzione.

<Tabs
  defaultValue="modules"
  values={[
    {label: 'Moduli (usando import/export)', value: 'modules'},
    {label: 'Definizioni di tipo ambient', value: 'ambient'},
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

        interface BrowsingContext {
            contextCustomCommand: (arg: any) => Promise<string>
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

    interface BrowsingContext {
        contextCustomCommand: (arg: any) => Promise<string>
    }
}
```

</TabItem>
</Tabs>

## Integrare librerie di terze parti

Se usi librerie esterne (ad es. per effettuare chiamate al database) che supportano le promise, un buon approccio per integrarle è racchiudere determinati metodi API in un comando personalizzato.

Quando restituisci la promise, WebdriverIO si assicura di non proseguire con il comando successivo finché la promise non viene risolta. Se la promise viene rifiutata, il comando genererà un errore.

```js
browser.addCommand('makeRequest', async (url) => {
    const response = await fetch(url)
    return await response.json()
})
```

Poi, usalo semplicemente nelle tue specifiche di test WDIO:

```js
it('execute external library in a sync way', async () => {
    await browser.url('...')
    const body = await browser.makeRequest('http://...')
    console.log(body) // restituisce il corpo della risposta
})
```

**Nota:** Il risultato del tuo comando personalizzato è il risultato della promise che restituisci.

## Sovrascrivere i comandi

Puoi anche sovrascrivere i comandi nativi con `overwriteCommand`.

Non è consigliato farlo, perché potrebbe portare a un comportamento imprevedibile del framework!

L'approccio generale è simile a `addCommand`, l'unica differenza è che il primo argomento nella funzione del comando è la funzione originale che stai per sovrascrivere. Consulta alcuni esempi qui sotto.

### Sovrascrivere i comandi del browser

```js
/**
 * Stampa i millisecondi prima della pausa e restituisce il loro valore.
 *
 * @param pause - nome del comando da sovrascrivere
 * @param this of func - l'istanza originale del browser su cui è stata chiamata la funzione
 * @param originalPauseFunction of func - la funzione pause originale
 * @param ms of func - i parametri effettivamente passati
  */
browser.overwriteCommand('pause', async function (this, originalPauseFunction, ms) {
    console.log(`sleeping for ${ms}`)
    await originalPauseFunction(ms)
    return ms
})

// poi usalo come prima
console.log(`was sleeping for ${await browser.pause(1000)}`)
```

### Sovrascrivere i comandi degli elementi

Sovrascrivere i comandi a livello di elemento è quasi la stessa cosa. Imposta `attachToElement` su `true`:

```js
/**
 * Tenta di scorrere fino all'elemento se non è cliccabile.
 * Passa { force: true } per cliccare con JS anche se l'elemento non è visibile o cliccabile.
 * Mostra che il tipo dell'argomento della funzione originale può essere mantenuto con `options?: ClickOptions`
 *
 * @param this of func - l'elemento su cui è stata chiamata la funzione originale
 * @param originalClickFunction of func - la funzione pause originale
 * @param options of func - i parametri effettivamente passati
 */
browser.overwriteCommand(
    'click',
    async function (this, originalClickFunction, options?: ClickOptions & { force?: boolean }) {
        const { force, ...restOptions } = options || {}
        if (!force) {
            try {
                // tenta di cliccare
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

        // clic con js
        console.warn('WARN: Using force click for', this.selector)
        await browser.execute((el) => {
            el.click()
        }, this)
    },
    { attachToElement: true }, // Non dimenticare di associarlo all'elemento
)

// poi usalo come prima
const elem = await $('body')
await elem.click()

// oppure passa dei parametri
await elem.click({ force: true })
```

### Sovrascrivere i comandi dei browsing context

Imposta `attachToBrowsingContext` su `true` per sovrascrivere un comando integrato o personalizzato di ogni scheda, finestra e frame. Il comando originale è legato al context su cui è stato chiamato:

```js
browser.overwriteCommand('getTitle', async function (this, originalGetTitle) {
    const title = await originalGetTitle()
    return this.isFrame ? `frame: ${title}` : title
}, { attachToBrowsingContext: true })

const page = await browser.url('https://webdriver.io')
const frame = await page.frame('iframe')
console.log(await frame.getTitle()) // "frame: ..."
```

## Aggiungere altri comandi WebDriver

Se stai usando il protocollo WebDriver ed esegui test su una piattaforma che supporta comandi aggiuntivi non definiti da nessuna delle definizioni di protocollo in [`@wdio/protocols`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-protocols/src/protocols) puoi aggiungerli manualmente tramite l'interfaccia `addCommand`. Il pacchetto `webdriver` offre un wrapper di comandi che permette di registrare questi nuovi endpoint allo stesso modo degli altri comandi, fornendo gli stessi controlli dei parametri e la stessa gestione degli errori. Per registrare questo nuovo endpoint importa il wrapper di comandi e registra un nuovo comando con esso come segue:

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
// chiama il comando senza il parametro url obbligatorio e il payload
await browser.myNewCommand()

/**
 * genera il seguente errore:
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

Chiamare il comando correttamente, ad es. `browser.myNewCommand('foo', 'bar')`, effettua correttamente una richiesta WebDriver, ad es. a `http://localhost:4444/session/7bae3c4c55c3bf82f54894ddc83c5f31/foobar/foo` con un payload come `{ foo: 'bar' }`.

:::note
Il parametro url `:sessionId` verrà sostituito automaticamente con l'id della sessione WebDriver. Altri parametri url possono essere applicati, ma devono essere definiti all'interno di `variables`.
:::

Consulta esempi di come i comandi di protocollo possono essere definiti nel pacchetto [`@wdio/protocols`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-protocols/src/protocols).