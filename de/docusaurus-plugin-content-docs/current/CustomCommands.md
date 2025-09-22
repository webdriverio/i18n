---
id: customcommands
title: Benutzerdefinierte Befehle
---

Wenn Sie die `browser`-Instanz mit eigenen Befehlen erweitern möchten, steht Ihnen die Browser-Methode `addCommand` zur Verfügung. Sie können Ihren Befehl auf asynchrone Weise schreiben, genau wie in Ihren Spezifikationen.

## Parameter

### Befehlsname

Ein Name, der den Befehl definiert und an den Browser- oder Element-Bereich angehängt wird.

Typ: `String`

### Benutzerdefinierte Funktion

Eine Funktion, die ausgeführt wird, wenn der Befehl aufgerufen wird. Der `this`-Bereich ist entweder [`WebdriverIO.Browser`](/docs/api/browser) oder [`WebdriverIO.Element`](/docs/api/element), je nachdem, ob der Befehl an den Browser- oder Element-Bereich angehängt wird.

Typ: `Function`

### Optionen

Objekt mit Konfigurationsoptionen zur Änderung des Verhaltens des benutzerdefinierten Befehls

#### Zielbereich

Flag, um zu entscheiden, ob der Befehl an den Browser- oder Element-Bereich angehängt werden soll. Wenn auf `true` gesetzt, wird der Befehl ein Element-Befehl sein.

Optionsname: `attachToElement`
Typ: `Boolean`<br />
Standard: `false`

#### Deaktiviere implicitWait

Flag, um zu entscheiden, ob implizit auf die Existenz des Elements gewartet werden soll, bevor der benutzerdefinierte Befehl aufgerufen wird.

Optionsname: `disableElementImplicitWait`
Typ: `Boolean`<br />
Standard: `false`

## Beispiele

Dieses Beispiel zeigt, wie ein neuer Befehl hinzugefügt wird, der die aktuelle URL und den Titel als ein Ergebnis zurückgibt. Der Bereich (`this`) ist ein [`WebdriverIO.Browser`](/docs/api/browser)-Objekt.

```js
browser.addCommand('getUrlAndTitle', async function (customVar) {
    // `this` bezieht sich auf den `browser`-Bereich
    return {
        url: await this.getUrl(),
        title: await this.getTitle(),
        customVar: customVar
    }
})
```

Zusätzlich können Sie die Element-Instanz mit Ihren eigenen Befehlen erweitern, indem Sie `true` als letztes Argument übergeben. Der Bereich (`this`) ist in diesem Fall ein [`WebdriverIO.Element`](/docs/api/element)-Objekt.

```js
browser.addCommand("waitAndClick", async function () {
    // `this` ist der Rückgabewert von $(selector)
    await this.waitForDisplayed()
    await this.click()
}, { attachToElement: true })
```

Standardmäßig warten Element-Befehle darauf, dass das Element existiert, bevor der benutzerdefinierte Befehl aufgerufen wird. Obwohl dies meistens gewünscht ist, kann es mit `disableImplicitWait` deaktiviert werden:

```js
browser.addCommand("waitAndClick", async function () {
    // `this` ist der Rückgabewert von $(selector)
    await this.waitForExists()
    await this.click()
}, { attachToElement: true, disableElementImplicitWait: true })
```


Benutzerdefinierte Befehle geben Ihnen die Möglichkeit, eine bestimmte Sequenz von Befehlen, die Sie häufig verwenden, als einzelnen Aufruf zu bündeln. Sie können benutzerdefinierte Befehle an jeder Stelle in Ihrer Testsuite definieren; stellen Sie nur sicher, dass der Befehl *vor* seiner ersten Verwendung definiert wird. (Der `before`-Hook in Ihrer `wdio.conf.js` ist ein guter Ort, um sie zu erstellen.)

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

__Hinweis:__ Wenn Sie einen benutzerdefinierten Befehl im `browser`-Bereich registrieren, ist der Befehl für Elemente nicht zugänglich. Ebenso ist ein im Element-Bereich registrierter Befehl nicht im `browser`-Bereich zugänglich:

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

Achten Sie darauf, den `browser`-Bereich nicht mit zu vielen benutzerdefinierten Befehlen zu überladen.

Wir empfehlen, benutzerdefinierte Logik in [Page Objects](pageobjects) zu definieren, damit sie an eine bestimmte Seite gebunden sind.

### Multiremote

`addCommand` funktioniert ähnlich für Multiremote, außer dass der neue Befehl an die Kinder-Instanzen weitergegeben wird. Sie müssen vorsichtig sein bei der Verwendung des `this`-Objekts, da der Multiremote-`browser` und seine Kinder-Instanzen unterschiedliche `this` haben.

Dieses Beispiel zeigt, wie ein neuer Befehl für Multiremote hinzugefügt wird.

```js
import { multiremotebrowser } from '@wdio/globals'

multiremotebrowser.addCommand('getUrlAndTitle', async function (this: WebdriverIO.MultiRemoteBrowser, customVar: any) {
    // `this` bezieht sich auf:
    //      - MultiRemoteBrowser-Bereich für Browser
    //      - Browser-Bereich für Instanzen
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

## Typ-Definitionen erweitern

Mit TypeScript ist es einfach, WebdriverIO-Schnittstellen zu erweitern. Fügen Sie Typen zu Ihren benutzerdefinierten Befehlen wie folgt hinzu:

1. Erstellen Sie eine Typ-Definitionsdatei (z.B. `./src/types/wdio.d.ts`)
2. a. Bei Verwendung einer Modul-Stil Typdefinitionsdatei (mit Import/Export und `declare global WebdriverIO` in der Typdefinitionsdatei), stellen Sie sicher, dass der Dateipfad in der `include`-Eigenschaft der `tsconfig.json` enthalten ist.

   b. Bei Verwendung von Ambient-Stil Typdefinitionsdateien (keine Import/Export in den Typdefinitionsdateien und `declare namespace WebdriverIO` für benutzerdefinierte Befehle), stellen Sie sicher, dass die `tsconfig.json` *keine* `include`-Sektion enthält, da dies dazu führt, dass alle nicht in der `include`-Sektion aufgeführten Typdefinitionsdateien von TypeScript nicht erkannt werden.

<Tabs
  defaultValue="modules"
  values={[
    {label: 'Module (mit Import/Export)', value: 'modules'},
    {label: 'Ambient-Typdefinitionen (kein tsconfig include)', value: 'ambient'},
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
    {label: 'Module (mit Import/Export)', value: 'modules'},
    {label: 'Ambient-Typdefinitionen', value: 'ambient'},
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

Wenn Sie externe Bibliotheken verwenden (z.B. für Datenbankaufrufe), die Promises unterstützen, ist ein guter Ansatz zur Integration, bestimmte API-Methoden mit einem benutzerdefinierten Befehl zu umhüllen.

Wenn Sie das Promise zurückgeben, stellt WebdriverIO sicher, dass es nicht mit dem nächsten Befehl fortfährt, bis das Promise aufgelöst ist. Wenn das Promise abgelehnt wird, wirft der Befehl einen Fehler.

```js
browser.addCommand('makeRequest', async (url) => {
    const response = await fetch(url)
    return await response.json()
})
```

Dann verwenden Sie es einfach in Ihren WDIO-Testspezifikationen:

```js
it('execute external library in a sync way', async () => {
    await browser.url('...')
    const body = await browser.makeRequest('http://...')
    console.log(body) // gibt den Antworttext zurück
})
```

**Hinweis:** Das Ergebnis Ihres benutzerdefinierten Befehls ist das Ergebnis des zurückgegebenen Promises.

## Überschreiben von Befehlen

Sie können auch native Befehle mit `overwriteCommand` überschreiben.

Es wird nicht empfohlen, dies zu tun, da es zu unvorhersehbarem Verhalten des Frameworks führen kann!

Der allgemeine Ansatz ist ähnlich wie bei `addCommand`, der einzige Unterschied besteht darin, dass das erste Argument in der Befehlsfunktion die ursprüngliche Funktion ist, die Sie überschreiben möchten. Bitte sehen Sie einige Beispiele unten.

### Überschreiben von Browser-Befehlen

```js
/**
 * Gibt Millisekunden vor der Pause aus und gibt den Wert zurück.
 * 
 * @param pause - Name des zu überschreibenden Befehls
 * @param this von func - die ursprüngliche Browser-Instanz, auf der die Funktion aufgerufen wurde
 * @param originalPauseFunction von func - die ursprüngliche Pause-Funktion
 * @param ms von func - die tatsächlich übergebenen Parameter
  */
browser.overwriteCommand('pause', async function (this, originalPauseFunction, ms) {
    console.log(`sleeping for ${ms}`)
    await originalPauseFunction(ms)
    return ms
})

// dann wie zuvor verwenden
console.log(`was sleeping for ${await browser.pause(1000)}`)
```

### Überschreiben von Element-Befehlen

Das Überschreiben von Befehlen auf Elementebene ist fast identisch. Übergeben Sie einfach `true` als drittes Argument an `overwriteCommand`:

```js
/**
 * Versucht zum Element zu scrollen, wenn es nicht anklickbar ist.
 * Übergeben Sie { force: true }, um mit JS zu klicken, auch wenn das Element nicht sichtbar oder anklickbar ist.
 * Zeigt, dass der ursprüngliche Funktionsargumenttyp mit `options?: ClickOptions` beibehalten werden kann.
 *
 * @param this von func - das Element, auf dem die ursprüngliche Funktion aufgerufen wurde
 * @param originalClickFunction von func - die ursprüngliche Pause-Funktion
 * @param options von func - die tatsächlich übergebenen Parameter
 */
browser.overwriteCommand(
    'click',
    async function (this, originalClickFunction, options?: ClickOptions & { force?: boolean }) {
        const { force, ...restOptions } = options || {}
        if (!force) {
            try {
                // Versuch zu klicken
                await originalClickFunction(options)
                return
            } catch (err) {
                if ((err as Error).message.includes('not clickable at point')) {
                    console.warn('WARN: Element', this.selector, 'is not clickable.', 'Scrolling to it before clicking again.')

                    // Zum Element scrollen und erneut klicken
                    await this.scrollIntoView()
                    return originalClickFunction(options)
                }
                throw err
            }
        }

        // Mit JS klicken
        console.warn('WARN: Using force click for', this.selector)
        await browser.execute((el) => {
            el.click()
        }, this)
    },
    { attachToElement: true }, // Vergessen Sie nicht, es an das Element anzuhängen
)

// dann wie zuvor verwenden
const elem = await $('body')
await elem.click()

// oder Parameter übergeben
await elem.click({ force: true })
```

## Weitere WebDriver-Befehle hinzufügen

Wenn Sie das WebDriver-Protokoll verwenden und Tests auf einer Plattform ausführen, die zusätzliche Befehle unterstützt, die nicht in einer der Protokolldefinitionen in [`@wdio/protocols`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-protocols/src/protocols) definiert sind, können Sie diese manuell über die `addCommand`-Schnittstelle hinzufügen. Das `webdriver`-Paket bietet einen Befehlswrapper, der es ermöglicht, diese neuen Endpunkte auf die gleiche Weise wie andere Befehle zu registrieren, mit den gleichen Parameterprüfungen und der gleichen Fehlerbehandlung. Um diesen neuen Endpunkt zu registrieren, importieren Sie den Befehlswrapper und registrieren Sie einen neuen Befehl wie folgt:

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

Der Aufruf dieses Befehls mit ungültigen Parametern führt zur gleichen Fehlerbehandlung wie bei vordefinierten Protokollbefehlen, z.B.:

```js
// Befehl ohne erforderlichen URL-Parameter und Payload aufrufen
await browser.myNewCommand()

/**
 * führt zum folgenden Fehler:
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

Wenn der Befehl korrekt aufgerufen wird, z.B. `browser.myNewCommand('foo', 'bar')`, erfolgt eine WebDriver-Anfrage an z.B. `http://localhost:4444/session/7bae3c4c55c3bf82f54894ddc83c5f31/foobar/foo` mit einer Nutzlast wie `{ foo: 'bar' }`.

:::note
Der URL-Parameter `:sessionId` wird automatisch durch die Session-ID der WebDriver-Sitzung ersetzt. Andere URL-Parameter können angewendet werden, müssen aber innerhalb von `variables` definiert sein.
:::

Beispiele für die Definition von Protokollbefehlen finden Sie im [`@wdio/protocols`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-protocols/src/protocols)-Paket.