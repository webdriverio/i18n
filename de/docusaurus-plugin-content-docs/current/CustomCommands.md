---
id: customcommands
title: Benutzerdefinierte Befehle
---

Wenn Sie die `browser`-Instanz mit Ihren eigenen Befehlen erweitern möchten, steht Ihnen die Browser-Methode `addCommand` zur Verfügung. Sie können Ihren Befehl asynchron schreiben, genau wie in Ihren Spezifikationen.

## Parameter

### Befehlsname

Ein Name, der den Befehl definiert und der an den Browser- oder Element-Scope angehängt wird.

Typ: `String`

### Benutzerdefinierte Funktion

Eine Funktion, die ausgeführt wird, wenn der Befehl aufgerufen wird. Der `this`-Scope ist entweder [`WebdriverIO.Browser`](/docs/api/browser) oder [`WebdriverIO.Element`](/docs/api/element), abhängig davon, ob der Befehl an den Browser- oder Element-Scope angehängt wird.

Typ: `Function`

### Ziel-Scope

Flag, um zu entscheiden, ob der Befehl an den Browser- oder Element-Scope angehängt werden soll. Wenn auf `true` gesetzt, wird der Befehl ein Element-Befehl sein.

Typ: `Boolean`<br />
Standard: `false`

## Beispiele

Dieses Beispiel zeigt, wie man einen neuen Befehl hinzufügt, der die aktuelle URL und den Titel als ein Ergebnis zurückgibt. Der Scope (`this`) ist ein [`WebdriverIO.Browser`](/docs/api/browser)-Objekt.

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

Zusätzlich können Sie die Element-Instanz mit Ihren eigenen Befehlen erweitern, indem Sie `true` als letztes Argument übergeben. Der Scope (`this`) ist in diesem Fall ein [`WebdriverIO.Element`](/docs/api/element)-Objekt.

```js
browser.addCommand("waitAndClick", async function () {
    // `this` is return value of $(selector)
    await this.waitForDisplayed()
    await this.click()
}, true)
```

Benutzerdefinierte Befehle geben Ihnen die Möglichkeit, eine bestimmte Sequenz von Befehlen, die Sie häufig verwenden, als einen einzigen Aufruf zu bündeln. Sie können benutzerdefinierte Befehle an jedem Punkt in Ihrer Testsuite definieren; stellen Sie nur sicher, dass der Befehl *vor* seiner ersten Verwendung definiert wird. (Der `before`-Hook in Ihrer `wdio.conf.js` ist ein guter Ort, um sie zu erstellen.)

Nach der Definition können Sie sie wie folgt verwenden:

```js
it('should use my custom command', async () => {
    await browser.url('http://www.github.com')
    const result = await browser.getUrlAndTitle('foobar')

    assert.strictEqual(result.url, 'https://github.com/')
    assert.strictEqual(result.title, 'GitHub · Where software is built')
    assert.strictEqual(result.customVar, 'foobar')
})
```

__Hinweis:__ Wenn Sie einen benutzerdefinierten Befehl im `browser`-Scope registrieren, ist der Befehl nicht für Elemente zugänglich. Ebenso, wenn Sie einen Befehl im Element-Scope registrieren, ist er nicht im `browser`-Scope zugänglich:

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

__Hinweis:__ Wenn Sie einen benutzerdefinierten Befehl verketten müssen, sollte der Befehl mit `$` enden,

```js
browser.addCommand("user$", (locator) => { return ele })
browser.addCommand("user$", (locator) => { return ele }, true)
await browser.user$('foo').user$('bar').click()
```

Seien Sie vorsichtig, den `browser`-Scope nicht mit zu vielen benutzerdefinierten Befehlen zu überladen.

Wir empfehlen, benutzerdefinierte Logik in [Page Objects](pageobjects) zu definieren, damit sie an eine bestimmte Seite gebunden sind.

### Multiremote

`addCommand` funktioniert ähnlich für Multiremote, außer dass der neue Befehl an die Kindinstanzen weitergegeben wird. Sie müssen bei der Verwendung des `this`-Objekts vorsichtig sein, da der Multiremote-`browser` und seine Kindinstanzen unterschiedliche `this` haben.

Dieses Beispiel zeigt, wie man einen neuen Befehl für Multiremote hinzufügt.

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

## Typdefinitionen erweitern

Mit TypeScript ist es einfach, WebdriverIO-Schnittstellen zu erweitern. Fügen Sie Ihren benutzerdefinierten Befehlen wie folgt Typen hinzu:

1. Erstellen Sie eine Typdefinitionsdatei (z.B. `./src/types/wdio.d.ts`)
2. a. Wenn Sie eine Typdefinitionsdatei im Modulstil verwenden (mit Import/Export und `declare global WebdriverIO` in der Typdefinitionsdatei), stellen Sie sicher, dass der Dateipfad in der `tsconfig.json` `include`-Eigenschaft enthalten ist.

   b. Wenn Sie Ambient-Typdefinitionsdateien verwenden (kein Import/Export in Typdefinitionsdateien und `declare namespace WebdriverIO` für benutzerdefinierte Befehle), stellen Sie sicher, dass die `tsconfig.json` KEINEN `include`-Abschnitt enthält, da dies dazu führt, dass alle Typdefinitionsdateien, die nicht im `include`-Abschnitt aufgeführt sind, von TypeScript nicht erkannt werden.

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

3. Fügen Sie Definitionen für Ihre Befehle entsprechend Ihrem Ausführungsmodus hinzu.

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

## Integration von Drittanbieter-Bibliotheken

Wenn Sie externe Bibliotheken verwenden (z.B. für Datenbankaufrufe), die Promises unterstützen, ist es ein guter Ansatz, bestimmte API-Methoden mit einem benutzerdefinierten Befehl zu umschließen.

Wenn Sie das Promise zurückgeben, stellt WebdriverIO sicher, dass es nicht mit dem nächsten Befehl fortfährt, bis das Promise aufgelöst ist. Wenn das Promise abgelehnt wird, wirft der Befehl einen Fehler.

```js
browser.addCommand('makeRequest', async (url) => {
    const response = await fetch(url)
    return await response.json()
})
```

Dann verwenden Sie es einfach in Ihren WDIO-Test-Spezifikationen:

```js
it('execute external library in a sync way', async () => {
    await browser.url('...')
    const body = await browser.makeRequest('http://...')
    console.log(body) // returns response body
})
```

**Hinweis:** Das Ergebnis Ihres benutzerdefinierten Befehls ist das Ergebnis des Promise, das Sie zurückgeben.

## Überschreiben von Befehlen

Sie können auch native Befehle mit `overwriteCommand` überschreiben.

Es wird nicht empfohlen, dies zu tun, da es zu unvorhersehbarem Verhalten des Frameworks führen kann!

Der allgemeine Ansatz ist ähnlich wie bei `addCommand`, der einzige Unterschied besteht darin, dass das erste Argument in der Befehlsfunktion die Originalfunktion ist, die Sie überschreiben möchten. Bitte sehen Sie sich einige Beispiele unten an.

### Überschreiben von Browser-Befehlen

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

### Überschreiben von Element-Befehlen

Das Überschreiben von Befehlen auf Elementebene ist fast dasselbe. Übergeben Sie einfach `true` als drittes Argument an `overwriteCommand`:

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
    true, // don't forget to pass `true` as 3rd argument
)

// then use it as before
const elem = await $('body')
await elem.click()

// or pass params
await elem.click({ force: true })
```

## Weitere WebDriver-Befehle hinzufügen

Wenn Sie das WebDriver-Protokoll verwenden und Tests auf einer Plattform ausführen, die zusätzliche Befehle unterstützt, die nicht in einer der Protokolldefinitionen in [`@wdio/protocols`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-protocols/src/protocols) definiert sind, können Sie diese manuell über die `addCommand`-Schnittstelle hinzufügen. Das `webdriver`-Paket bietet einen Befehlswrapper, der es erlaubt, diese neuen Endpunkte auf die gleiche Weise wie andere Befehle zu registrieren, mit den gleichen Parameterprüfungen und der gleichen Fehlerbehandlung. Um diesen neuen Endpunkt zu registrieren, importieren Sie den Befehlswrapper und registrieren Sie einen neuen Befehl wie folgt:

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

Der Aufruf dieses Befehls mit ungültigen Parametern führt zur gleichen Fehlerbehandlung wie vordefinierte Protokollbefehle, z.B.:

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

Wenn der Befehl korrekt aufgerufen wird, z.B. `browser.myNewCommand('foo', 'bar')`, wird korrekt eine WebDriver-Anfrage an z.B. `http://localhost:4444/session/7bae3c4c55c3bf82f54894ddc83c5f31/foobar/foo` mit einer Nutzlast wie `{ foo: 'bar' }` gestellt.

:::note
Der URL-Parameter `:sessionId` wird automatisch durch die Sitzungs-ID der WebDriver-Sitzung ersetzt. Andere URL-Parameter können angewendet werden, müssen aber innerhalb von `variables` definiert werden.
:::

Beispiele für die Definition von Protokollbefehlen finden Sie im Paket [`@wdio/protocols`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-protocols/src/protocols).