---
id: customcommands
title: Benutzerdefinierte Befehle
---

Wenn Sie die `browser`-Instanz mit Ihren eigenen Befehlen erweitern möchten, steht Ihnen die Browser-Methode `addCommand` zur Verfügung. Sie können Ihren Befehl asynchron schreiben, genau wie in Ihren Spezifikationen.

## Parameter

### Befehlsname

Ein Name, der den Befehl definiert und an den Browser- oder Element-Bereich angehängt wird.

Typ: `String`

### Benutzerdefinierte Funktion

Eine Funktion, die ausgeführt wird, wenn der Befehl aufgerufen wird. Der `this`-Bereich ist entweder [`WebdriverIO.Browser`](/docs/api/browser) oder [`WebdriverIO.Element`](/docs/api/element), je nachdem, ob der Befehl an den Browser- oder Element-Bereich angehängt wird.

Typ: `Function`

### Zielbereich

Flag, um zu entscheiden, ob der Befehl an den Browser- oder Element-Bereich angehängt werden soll. Wenn auf `true` gesetzt, wird der Befehl ein Element-Befehl sein.

Typ: `Boolean`<br />
Standard: `false`

## Beispiele

Dieses Beispiel zeigt, wie man einen neuen Befehl hinzufügt, der die aktuelle URL und den Titel als ein Ergebnis zurückgibt. Der Bereich (`this`) ist ein [`WebdriverIO.Browser`](/docs/api/browser)-Objekt.

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

__Hinweis:__ Wenn Sie einen benutzerdefinierten Befehl im `browser`-Bereich registrieren, ist der Befehl für Elemente nicht zugänglich. Ebenso, wenn Sie einen Befehl im Element-Bereich registrieren, ist er im `browser`-Bereich nicht zugänglich:

```js
browser.addCommand("myCustomBrowserCommand", () => { return 1 })
const elem = await $('body')
console.log(typeof browser.myCustomBrowserCommand) // gibt "function" aus
console.log(typeof elem.myCustomBrowserCommand()) // gibt "undefined" aus

browser.addCommand("myCustomElementCommand", () => { return 1 }, true)
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
browser.addCommand("user$", (locator) => { return ele }, true)
await browser.user$('foo').user$('bar').click()
```

Seien Sie vorsichtig, den `browser`-Bereich nicht mit zu vielen benutzerdefinierten Befehlen zu überladen.

Wir empfehlen, benutzerdefinierte Logik in [Page Objects](pageobjects) zu definieren, damit sie an eine bestimmte Seite gebunden sind.

### Multiremote

`addCommand` funktioniert ähnlich für Multiremote, außer dass der neue Befehl an die untergeordneten Instanzen weitergegeben wird. Sie müssen bei der Verwendung des `this`-Objekts vorsichtig sein, da der Multiremote-`browser` und seine untergeordneten Instanzen unterschiedliche `this`-Objekte haben.

Dieses Beispiel zeigt, wie man einen neuen Befehl für Multiremote hinzufügt.

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

## Typdefinitionen erweitern

Mit TypeScript ist es einfach, WebdriverIO-Schnittstellen zu erweitern. Fügen Sie Typen zu Ihren benutzerdefinierten Befehlen wie folgt hinzu:

1. Erstellen Sie eine Typdefinitionsdatei (z.B. `./src/types/wdio.d.ts`)
2. a. Wenn Sie eine Typdefinitionsdatei im Modulstil verwenden (mit Import/Export und `declare global WebdriverIO` in der Typdefinitionsdatei), stellen Sie sicher, dass der Dateipfad in der `tsconfig.json` `include`-Eigenschaft enthalten ist.

   b. Wenn Sie Typdefinitionsdateien im Ambient-Stil verwenden (keine Import/Export in Typdefinitionsdateien und `declare namespace WebdriverIO` für benutzerdefinierte Befehle), stellen Sie sicher, dass die `tsconfig.json` *keinen* `include`-Abschnitt enthält, da dies dazu führt, dass alle Typdefinitionsdateien, die nicht im `include`-Abschnitt aufgeführt sind, von TypeScript nicht erkannt werden.

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

**Hinweis:** Das Ergebnis Ihres benutzerdefinierten Befehls ist das Ergebnis des Promise, das Sie zurückgeben.

## Überschreiben von Befehlen

Sie können auch native Befehle mit `overwriteCommand` überschreiben.

Es wird nicht empfohlen, dies zu tun, da es zu unvorhersehbarem Verhalten des Frameworks führen kann!

Der Gesamtansatz ist ähnlich wie bei `addCommand`, der einzige Unterschied besteht darin, dass das erste Argument in der Befehlsfunktion die ursprüngliche Funktion ist, die Sie überschreiben möchten. Bitte sehen Sie sich einige Beispiele unten an.

### Überschreiben von Browser-Befehlen

```js
/**
 * Millisekunden vor der Pause ausgeben und ihren Wert zurückgeben.
 */
// 'pause'            - Name des zu überschreibenden Befehls
// origPauseFunction  - ursprüngliche Pause-Funktion
browser.overwriteCommand('pause', async (origPauseFunction, ms) => {
    console.log(`sleeping for ${ms}`)
    await origPauseFunction(ms)
    return ms
})

// dann wie zuvor verwenden
console.log(`was sleeping for ${await browser.pause(1000)}`)
```

### Überschreiben von Element-Befehlen

Das Überschreiben von Befehlen auf Elementebene ist fast dasselbe. Übergeben Sie einfach `true` als drittes Argument an `overwriteCommand`:

```js
/**
 * Versuchen, zum Element zu scrollen, wenn es nicht anklickbar ist.
 * Übergeben Sie { force: true }, um mit JS zu klicken, auch wenn das Element nicht sichtbar oder anklickbar ist.
 */
// 'click'            - Name des zu überschreibenden Befehls
// origClickFunction  - ursprüngliche Click-Funktion
browser.overwriteCommand('click', async function (origClickFunction, { force = false } = {}) {
    if (!force) {
        try {
            // Versuch zu klicken
            await origClickFunction()
            return null
        } catch (err) {
            if (err.message.includes('not clickable at point')) {
                console.warn('WARN: Element', this.selector, 'is not clickable.',
                    'Scrolling to it before clicking again.')

                // zum Element scrollen und erneut klicken
                await this.scrollIntoView()
                return origClickFunction()
            }
            throw err
        }
    }

    // mit js klicken
    console.warn('WARN: Using force click for', this.selector)
    await browser.execute((el) => {
        el.click()
    }, this)
}, true) // vergessen Sie nicht, `true` als 3. Argument zu übergeben

// dann wie zuvor verwenden
const elem = await $('body')
await elem.click()

// oder Parameter übergeben
await elem.click({ force: true })
```

## Weitere WebDriver-Befehle hinzufügen

Wenn Sie das WebDriver-Protokoll verwenden und Tests auf einer Plattform ausführen, die zusätzliche Befehle unterstützt, die nicht durch eine der Protokolldefinitionen in [`@wdio/protocols`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-protocols/src/protocols) definiert sind, können Sie diese manuell über die `addCommand`-Schnittstelle hinzufügen. Das `webdriver`-Paket bietet einen Befehlswrapper, der es ermöglicht, diese neuen Endpunkte auf die gleiche Weise wie andere Befehle zu registrieren, mit den gleichen Parameterprüfungen und der gleichen Fehlerbehandlung. Um diesen neuen Endpunkt zu registrieren, importieren Sie den Befehlswrapper und registrieren Sie einen neuen Befehl damit wie folgt:

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
    