---
id: customcommands
title: Benutzerdefinierte Befehle
description: "Fügen Sie mit addCommand eigene Browser- und Element-Befehle hinzu, überschreiben Sie bestehende Befehle und erweitern Sie die TypeScript-Typdefinitionen."
---

Wenn Sie die `browser`-Instanz um eigene Befehle erweitern möchten, steht Ihnen dafür die Browser-Methode `addCommand` zur Verfügung. Sie können Ihren Befehl asynchron schreiben, genau wie in Ihren Specs.

## Parameter

### Befehlsname

<Option type="String">

Ein Name, der den Befehl definiert und an den Browser- oder Element-Scope angehängt wird.

</Option>

### Benutzerdefinierte Funktion

<Option type="Function">

Eine Funktion, die ausgeführt wird, wenn der Befehl aufgerufen wird. Der `this`-Scope ist [`WebdriverIO.Browser`](/docs/api/browser), [`WebdriverIO.Element`](/docs/api/element) oder `WebdriverIO.BrowsingContext`, je nachdem, ob der Befehl an den Browser, an Elemente oder an Browsing Contexts angehängt wird.

</Option>

### Optionen

Objekt mit Konfigurationsoptionen, die das Verhalten des benutzerdefinierten Befehls verändern

#### Ziel-Scope

<Option type="Boolean" default="false" name="attachToElement">

Flag, das festlegt, ob der Befehl an den Browser- oder Element-Scope angehängt wird. Wenn es auf `true` gesetzt ist, wird der Befehl ein Element-Befehl.

</Option>

<Option type="Boolean" default="false" name="attachToBrowsingContext">

Flag, um den Befehl an jeden Browsing Context anzuhängen: die Tabs, Fenster und Frames, die `browser.url()`, `browser.newWindow()`, `browser.browsingContexts()` und `context.frame()` in einer WebDriver-BiDi-Session zurückgeben. Es kann nicht mit `attachToElement` kombiniert werden. Siehe [Browsing Contexts](#browsing-contexts).

</Option>

#### implicitWait deaktivieren

<Option type="Boolean" default="false" name="disableElementImplicitWait">

Flag, das festlegt, ob implizit darauf gewartet wird, dass das Element existiert, bevor der benutzerdefinierte Befehl aufgerufen wird.

</Option>

## Beispiele

Dieses Beispiel zeigt, wie man einen neuen Befehl hinzufügt, der die aktuelle URL und den Titel als ein Ergebnis zurückgibt. Der Scope (`this`) ist ein [`WebdriverIO.Browser`](/docs/api/browser)-Objekt.

```js
browser.addCommand('getUrlAndTitle', async function (customVar) {
    // `this` bezieht sich auf den `browser`-Scope
    return {
        url: await this.getUrl(),
        title: await this.getTitle(),
        customVar: customVar
    }
})
```

Zusätzlich können Sie die Element-Instanz um eigene Befehle erweitern, indem Sie `attachToElement` auf `true` setzen. Der Scope (`this`) ist in diesem Fall ein [`WebdriverIO.Element`](/docs/api/element)-Objekt.

```js
browser.addCommand("waitAndClick", async function () {
    // `this` ist der Rückgabewert von $(selector)
    await this.waitForDisplayed()
    await this.click()
}, { attachToElement: true })
```

Standardmäßig warten benutzerdefinierte Element-Befehle darauf, dass das Element existiert, bevor der benutzerdefinierte Befehl aufgerufen wird. Auch wenn dies meistens erwünscht ist, kann es bei Bedarf mit `disableImplicitWait` deaktiviert werden:

```js
browser.addCommand("waitAndClick", async function () {
    // `this` ist der Rückgabewert von $(selector)
    await this.waitForExists()
    await this.click()
}, { attachToElement: true, disableElementImplicitWait: true })
```

Benutzerdefinierte Befehle bieten Ihnen die Möglichkeit, eine bestimmte Abfolge häufig verwendeter Befehle in einem einzigen Aufruf zu bündeln. Sie können benutzerdefinierte Befehle an jeder Stelle Ihrer Testsuite definieren; stellen Sie nur sicher, dass der Befehl *vor* seiner ersten Verwendung definiert ist. (Der `before`-Hook in Ihrer `wdio.conf.js` ist ein guter Ort, um sie zu erstellen.)

Sobald sie definiert sind, können Sie sie wie folgt verwenden:

```js
it('should use my custom command', async () => {
    await browser.url('http://www.github.com')
    const result = await browser.getUrlAndTitle('foobar')

    assert.strictEqual(result.url, 'https://github.com/')
    assert.strictEqual(result.title, 'GitHub · Where software is built')
    assert.strictEqual(result.customVar, 'foobar')
})
```

__Hinweis:__ Wenn Sie einen benutzerdefinierten Befehl im `browser`-Scope registrieren, ist der Befehl für Elemente nicht zugänglich. Ebenso gilt: Wenn Sie einen Befehl im Element-Scope registrieren, ist er im `browser`-Scope nicht zugänglich:

```js
browser.addCommand("myCustomBrowserCommand", () => { return 1 })
const elem = await $('body')
console.log(typeof browser.myCustomBrowserCommand) // gibt "function" aus
console.log(typeof elem.myCustomBrowserCommand()) // gibt "undefined" aus

browser.addCommand("myCustomElementCommand", () => { return 1 }, { attachToElement: true })
const elem2 = await $('body')
console.log(typeof browser.myCustomElementCommand) // gibt "undefined" aus
console.log(await elem2.myCustomElementCommand('foobar')) // gibt "1" aus

const elem3 = await $('body')
elem3.addCommand("myCustomElementCommand2", () => { return 2 })
console.log(typeof browser.myCustomElementCommand2) // gibt "undefined" aus
console.log(await elem3.myCustomElementCommand2('foobar')) // gibt "2" aus
```

__Hinweis:__ Wenn Sie einen benutzerdefinierten Befehl verketten müssen, sollte der Befehl mit `$` enden,

```js
browser.addCommand("user$", (locator) => { return ele })
browser.addCommand("user$", (locator) => { return ele }, { attachToElement: true })
await browser.user$('foo').user$('bar').click()
```

Achten Sie darauf, den `browser`-Scope nicht mit zu vielen benutzerdefinierten Befehlen zu überladen.

Wir empfehlen, benutzerdefinierte Logik in [Page Objects](pageobjects) zu definieren, damit sie an eine bestimmte Seite gebunden ist.

### Browsing Contexts

In einer WebDriver-BiDi-Session sind ein Tab, ein Fenster und ein Frame jeweils ein `WebdriverIO.BrowsingContext`. Setzen Sie `attachToBrowsingContext` auf `true`, um allen von ihnen einen Befehl hinzuzufügen. Der Scope (`this`) ist der Context, auf dem der Befehl aufgerufen wurde, und `this.browser` ist der Browser, zu dem er gehört:

```js
browser.addCommand('heading', async function () {
    // `this` ist der Tab, das Fenster oder der Frame
    return this.$('h1').getText()
}, { attachToBrowsingContext: true })

const page = await browser.url('https://webdriver.io')
console.log(await page.heading())

const frame = await page.frame('iframe')
console.log(await frame.heading())
```

Der Befehl ist auf bereits existierenden Contexts sowie auf jedem später erstellten Context verfügbar, einschließlich Frames von einem anderen Origin. Ein Befehl, der nur für einen Tab oder ein Fenster sinnvoll ist, kann `this.isFrame` prüfen.

`addCommand` und `overwriteCommand` auf einem Browsing Context selbst werfen einen Fehler. Registrieren Sie den Befehl auf dem Browser.

### Multi-remote

`addCommand` funktioniert bei Multi-remote auf ähnliche Weise, mit dem Unterschied, dass der neue Befehl an die untergeordneten Instanzen weitergegeben wird. Sie müssen bei der Verwendung des `this`-Objekts aufmerksam sein, da der Multi-remote-`browser` und seine untergeordneten Instanzen unterschiedliche `this` haben.

Dieses Beispiel zeigt, wie man einen neuen Befehl für Multi-remote hinzufügt.

```js
import { multiRemoteBrowser } from '@wdio/globals'

multiRemoteBrowser.addCommand('getUrlAndTitle', async function (this: WebdriverIO.MultiRemoteBrowser, customVar: any) {
    // `this` bezieht sich auf:
    //      - MultiRemoteBrowser-Scope für den Browser
    //      - Browser-Scope für Instanzen
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

## Typdefinitionen erweitern

Mit TypeScript ist es einfach, WebdriverIO-Interfaces zu erweitern. Fügen Sie Ihren benutzerdefinierten Befehlen wie folgt Typen hinzu:

1. Erstellen Sie eine Typdefinitionsdatei (z. B. `./src/types/wdio.d.ts`)
2. a. Wenn Sie eine Typdefinitionsdatei im Modulstil verwenden (mit import/export und `declare global WebdriverIO` in der Typdefinitionsdatei), stellen Sie sicher, dass der Dateipfad in der `include`-Eigenschaft der `tsconfig.json` enthalten ist.

   b. Wenn Sie Typdefinitionsdateien im Ambient-Stil verwenden (kein import/export in den Typdefinitionsdateien und `declare namespace WebdriverIO` für benutzerdefinierte Befehle), stellen Sie sicher, dass die `tsconfig.json` *keinen* `include`-Abschnitt enthält, da sonst alle Typdefinitionsdateien, die nicht im `include`-Abschnitt aufgeführt sind, von TypeScript nicht erkannt werden.

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

## Bibliotheken von Drittanbietern integrieren

Wenn Sie externe Bibliotheken verwenden (z. B. für Datenbankaufrufe), die Promises unterstützen, ist es ein guter Ansatz, bestimmte API-Methoden mit einem benutzerdefinierten Befehl zu umschließen.

Wenn das Promise zurückgegeben wird, stellt WebdriverIO sicher, dass es nicht mit dem nächsten Befehl fortfährt, bis das Promise aufgelöst ist. Wenn das Promise abgelehnt wird, wirft der Befehl einen Fehler.

```js
browser.addCommand('makeRequest', async (url) => {
    const response = await fetch(url)
    return await response.json()
})
```

Verwenden Sie ihn dann einfach in Ihren WDIO-Test-Specs:

```js
it('execute external library in a sync way', async () => {
    await browser.url('...')
    const body = await browser.makeRequest('http://...')
    console.log(body) // gibt den Response-Body zurück
})
```

**Hinweis:** Das Ergebnis Ihres benutzerdefinierten Befehls ist das Ergebnis des Promises, das Sie zurückgeben.

## Befehle überschreiben

Sie können native Befehle auch mit `overwriteCommand` überschreiben.

Es wird nicht empfohlen, dies zu tun, da es zu unvorhersehbarem Verhalten des Frameworks führen kann!

Der grundsätzliche Ansatz ähnelt `addCommand`. Der einzige Unterschied besteht darin, dass das erste Argument der Befehlsfunktion die ursprüngliche Funktion ist, die Sie überschreiben möchten. Bitte sehen Sie sich einige Beispiele unten an.

### Browser-Befehle überschreiben

```js
/**
 * Millisekunden vor der Pause ausgeben und deren Wert zurückgeben.
 *
 * @param pause - Name des zu überschreibenden Befehls
 * @param this of func - die ursprüngliche Browser-Instanz, auf der die Funktion aufgerufen wurde
 * @param originalPauseFunction of func - die ursprüngliche pause-Funktion
 * @param ms of func - die tatsächlich übergebenen Parameter
  */
browser.overwriteCommand('pause', async function (this, originalPauseFunction, ms) {
    console.log(`sleeping for ${ms}`)
    await originalPauseFunction(ms)
    return ms
})

// dann wie zuvor verwenden
console.log(`was sleeping for ${await browser.pause(1000)}`)
```

### Element-Befehle überschreiben

Das Überschreiben von Befehlen auf Element-Ebene funktioniert fast genauso. Setzen Sie `attachToElement` auf `true`:

```js
/**
 * Versuchen, zum Element zu scrollen, wenn es nicht klickbar ist.
 * { force: true } übergeben, um per JS zu klicken, auch wenn das Element nicht sichtbar oder klickbar ist.
 * Zeigen, dass der ursprüngliche Argumenttyp der Funktion mit `options?: ClickOptions` beibehalten werden kann
 *
 * @param this of func - das Element, auf dem die ursprüngliche Funktion aufgerufen wurde
 * @param originalClickFunction of func - die ursprüngliche pause-Funktion
 * @param options of func - die tatsächlich übergebenen Parameter
 */
browser.overwriteCommand(
    'click',
    async function (this, originalClickFunction, options?: ClickOptions & { force?: boolean }) {
        const { force, ...restOptions } = options || {}
        if (!force) {
            try {
                // Klick versuchen
                await originalClickFunction(options)
                return
            } catch (err) {
                if ((err as Error).message.includes('not clickable at point')) {
                    console.warn('WARN: Element', this.selector, 'is not clickable.', 'Scrolling to it before clicking again.')

                    // zum Element scrollen und erneut klicken
                    await this.scrollIntoView()
                    return originalClickFunction(options)
                }
                throw err
            }
        }

        // Klicken mit JS
        console.warn('WARN: Using force click for', this.selector)
        await browser.execute((el) => {
            el.click()
        }, this)
    },
    { attachToElement: true }, // Nicht vergessen, es an das Element anzuhängen
)

// dann wie zuvor verwenden
const elem = await $('body')
await elem.click()

// oder Parameter übergeben
await elem.click({ force: true })
```

### Browsing-Context-Befehle überschreiben

Setzen Sie `attachToBrowsingContext` auf `true`, um einen eingebauten oder benutzerdefinierten Befehl jedes Tabs, Fensters und Frames zu überschreiben. Der ursprüngliche Befehl ist an den Context gebunden, auf dem er aufgerufen wurde:

```js
browser.overwriteCommand('getTitle', async function (this, originalGetTitle) {
    const title = await originalGetTitle()
    return this.isFrame ? `frame: ${title}` : title
}, { attachToBrowsingContext: true })

const page = await browser.url('https://webdriver.io')
const frame = await page.frame('iframe')
console.log(await frame.getTitle()) // "frame: ..."
```

## Weitere WebDriver-Befehle hinzufügen

Wenn Sie das WebDriver-Protokoll verwenden und Tests auf einer Plattform ausführen, die zusätzliche Befehle unterstützt, die in keiner der Protokolldefinitionen in [`@wdio/protocols`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-protocols/src/protocols) definiert sind, können Sie diese manuell über die `addCommand`-Schnittstelle hinzufügen. Das `webdriver`-Paket bietet einen Befehls-Wrapper, mit dem diese neuen Endpunkte auf die gleiche Weise wie andere Befehle registriert werden können, mit denselben Parameterprüfungen und derselben Fehlerbehandlung. Um diesen neuen Endpunkt zu registrieren, importieren Sie den Befehls-Wrapper und registrieren Sie damit wie folgt einen neuen Befehl:

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

Der Aufruf dieses Befehls mit ungültigen Parametern führt zur gleichen Fehlerbehandlung wie bei vordefinierten Protokollbefehlen, z. B.:

```js
// Befehl ohne erforderlichen URL-Parameter und Payload aufrufen
await browser.myNewCommand()

/**
 * führt zu folgendem Fehler:
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

Ein korrekter Aufruf des Befehls, z. B. `browser.myNewCommand('foo', 'bar')`, führt korrekt einen WebDriver-Request an z. B. `http://localhost:4444/session/7bae3c4c55c3bf82f54894ddc83c5f31/foobar/foo` mit einer Payload wie `{ foo: 'bar' }` aus.

:::note
Der URL-Parameter `:sessionId` wird automatisch durch die Session-ID der WebDriver-Session ersetzt. Weitere URL-Parameter können verwendet werden, müssen aber innerhalb von `variables` definiert werden.
:::

Beispiele dafür, wie Protokollbefehle definiert werden können, finden Sie im Paket [`@wdio/protocols`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-protocols/src/protocols).