---
id: customcommands
title: Anpassade Kommandon
---

Om du vill utöka `browser`-instansen med dina egna uppsättningar av kommandon, så finns browser-metoden `addCommand` tillgänglig för dig. Du kan skriva ditt kommando på ett asynkront sätt, precis som i dina specifikationer.

## Parametrar

### Kommandonamn

Ett namn som definierar kommandot och kommer att knytas till webbläsarens eller elementets omfattning.

Typ: `String`

### Anpassad funktion

En funktion som körs när kommandot anropas. `this`-omfattningen är antingen [`WebdriverIO.Browser`](/docs/api/browser) eller [`WebdriverIO.Element`](/docs/api/element) beroende på om kommandot kopplas till webbläsarens eller elementets omfattning.

Typ: `Function`

### Alternativ

Objekt med konfigurationsalternativ som ändrar beteendet för det anpassade kommandot.

#### Målomfattning

Flagga för att avgöra om kommandot ska knytas till webbläsarens eller elementets omfattning. Om inställd på `true` kommer kommandot att vara ett elementkommando.

Alternativnamn: `attachToElement`
Typ: `Boolean`<br />
Standard: `false`

#### Inaktivera implicitWait

Flagga för att bestämma om man implicit ska vänta på att elementet existerar innan man anropar det anpassade kommandot.

Alternativnamn: `disableElementImplicitWait`
Typ: `Boolean`<br />
Standard: `false`

## Exempel

Detta exempel visar hur man lägger till ett nytt kommando som returnerar aktuell URL och titel som ett resultat. Omfattningen (`this`) är ett [`WebdriverIO.Browser`](/docs/api/browser)-objekt.

```js
browser.addCommand('getUrlAndTitle', async function (customVar) {
    // `this` refererar till `browser`-omfattningen
    return {
        url: await this.getUrl(),
        title: await this.getTitle(),
        customVar: customVar
    }
})
```

Dessutom kan du utöka elementinstansen med din egen uppsättning av kommandon genom att skicka `true` som det sista argumentet. Omfattningen (`this`) i detta fall är ett [`WebdriverIO.Element`](/docs/api/element)-objekt.

```js
browser.addCommand("waitAndClick", async function () {
    // `this` är returvärdet från $(selector)
    await this.waitForDisplayed()
    await this.click()
}, { attachToElement: true })
```

Som standard väntar anpassade elementkommandon på att elementet ska existera innan de anropar det anpassade kommandot. Även om detta ofta är önskvärt kan det inaktiveras med `disableImplicitWait`:

```js
browser.addCommand("waitAndClick", async function () {
    // `this` är returvärdet från $(selector)
    await this.waitForExists()
    await this.click()
}, { attachToElement: true, disableElementImplicitWait: true })
```


Anpassade kommandon ger dig möjligheten att samla en specifik sekvens av kommandon som du använder ofta i ett enda anrop. Du kan definiera anpassade kommandon när som helst i din testsvit; se bara till att kommandot är definierat *innan* det används första gången. (`before`-hooken i din `wdio.conf.js` är ett bra ställe att skapa dem.)

När de väl är definierade kan du använda dem så här:

```js
it('should use my custom command', async () => {
    await browser.url('http://www.github.com')
    const result = await browser.getUrlAndTitle('foobar')

    assert.strictEqual(result.url, 'https://github.com/')
    assert.strictEqual(result.title, 'GitHub · Where software is built')
    assert.strictEqual(result.customVar, 'foobar')
})
```

__Observera:__ Om du registrerar ett anpassat kommando till `browser`-omfattningen, kommer kommandot inte att vara tillgängligt för element. På samma sätt, om du registrerar ett kommando till elementomfattningen, kommer det inte att vara tillgängligt i `browser`-omfattningen:

```js
browser.addCommand("myCustomBrowserCommand", () => { return 1 })
const elem = await $('body')
console.log(typeof browser.myCustomBrowserCommand) // skriver ut "function"
console.log(typeof elem.myCustomBrowserCommand()) // skriver ut "undefined"

browser.addCommand("myCustomElementCommand", () => { return 1 }, { attachToElement: true })
const elem2 = await $('body')
console.log(typeof browser.myCustomElementCommand) // skriver ut "undefined"
console.log(await elem2.myCustomElementCommand('foobar')) // skriver ut "1"

const elem3 = await $('body')
elem3.addCommand("myCustomElementCommand2", () => { return 2 })
console.log(typeof browser.myCustomElementCommand2) // skriver ut "undefined"
console.log(await elem3.myCustomElementCommand2('foobar')) // skriver ut "2"
```

__Observera:__ Om du behöver kedja ett anpassat kommando, bör kommandot sluta med `$`,

```js
browser.addCommand("user$", (locator) => { return ele })
browser.addCommand("user$", (locator) => { return ele }, { attachToElement: true })
await browser.user$('foo').user$('bar').click()
```

Var försiktig så att du inte överbelastar `browser`-omfattningen med för många anpassade kommandon.

Vi rekommenderar att definiera anpassad logik i [sidobjekt](pageobjects), så att de är bundna till en specifik sida.

### Multiremote

`addCommand` fungerar på ett liknande sätt för multiremote, förutom att det nya kommandot kommer att sprida sig till barninstanserna. Du måste vara uppmärksam när du använder `this`-objektet eftersom multiremote `browser` och dess barninstanser har olika `this`.

Detta exempel visar hur man lägger till ett nytt kommando för multiremote.

```js
import { multiRemoteBrowser } from '@wdio/globals'

multiRemoteBrowser.addCommand('getUrlAndTitle', async function (this: WebdriverIO.MultiRemoteBrowser, customVar: any) {
    // `this` refererar till:
    //      - MultiRemoteBrowser-omfattning för webbläsaren
    //      - Browser-omfattning för instanser
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

## Utöka typdefinitioner

Med TypeScript är det enkelt att utöka WebdriverIO-gränssnitt. Lägg till typer till dina anpassade kommandon så här:

1. Skapa en typdefinitionsfil (t.ex. `./src/types/wdio.d.ts`)
2. a. Om du använder en modulstil typdefinitionsfil (med import/export och `declare global WebdriverIO` i typdefinitionsfilen), se till att inkludera filsökvägen i `tsconfig.json` `include`-egenskapen.

   b. Om du använder ambient-stil typdefinitionsfiler (inga import/export i typdefinitionsfiler och `declare namespace WebdriverIO` för anpassade kommandon), se till att `tsconfig.json` *inte* innehåller någon `include`-sektion, eftersom detta kommer att göra att alla typdefinitionsfiler som inte finns listade i `include`-sektionen inte erkänns av TypeScript.

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

3. Lägg till definitioner för dina kommandon enligt ditt exekveringsläge.

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

## Integrera tredjepartsbibliotek

Om du använder externa bibliotek (t.ex. för databasanrop) som stöder promises, är ett bra sätt att integrera dem att omsluta vissa API-metoder med ett anpassat kommando.

När du returnerar löftet säkerställer WebdriverIO att det inte fortsätter med nästa kommando förrän löftet är uppfyllt. Om löftet avvisas kommer kommandot att kasta ett fel.

```js
browser.addCommand('makeRequest', async (url) => {
    const response = await fetch(url)
    return await response.json()
})
```

Använd sedan detta i dina WDIO-testspecifikationer:

```js
it('execute external library in a sync way', async () => {
    await browser.url('...')
    const body = await browser.makeRequest('http://...')
    console.log(body) // returnerar svarkroppen
})
```

**Observera:** Resultatet av ditt anpassade kommando är resultatet av löftet du returnerar.

## Skriva över kommandon

Du kan också skriva över inbyggda kommandon med `overwriteCommand`.

Det rekommenderas inte att göra detta, eftersom det kan leda till oförutsägbart beteende hos ramverket!

Det övergripande tillvägagångssättet liknar `addCommand`, den enda skillnaden är att det första argumentet i kommandfunktionen är den ursprungliga funktionen som du är på väg att skriva över. Se några exempel nedan.

### Skriva över webbläsarkommandon

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

// använd det sedan som tidigare
console.log(`was sleeping for ${await browser.pause(1000)}`)
```

### Skriva över elementkommandon

Att skriva över kommandon på elementnivå är nästan likadant. Skicka helt enkelt `true` som det tredje argumentet till `overwriteCommand`:

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

// använd det sedan som tidigare
const elem = await $('body')
await elem.click()

// eller skicka parametrar
await elem.click({ force: true })
```

## Lägg till fler WebDriver-kommandon

Om du använder WebDriver-protokollet och kör tester på en plattform som stöder ytterligare kommandon som inte definieras av någon av protokolldefinitionerna i [`@wdio/protocols`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-protocols/src/protocols) kan du manuellt lägga till dem via `addCommand`-gränssnittet. Paketet `webdriver` erbjuder en kommandoomslutning som gör det möjligt att registrera dessa nya slutpunkter på samma sätt som andra kommandon, vilket ger samma parameterkontroller och felhantering. För att registrera denna nya slutpunkt, importera kommandoomslutningen och registrera ett nytt kommando med det enligt följande:

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

Att anropa detta kommando med ogiltiga parametrar resulterar i samma felhantering som fördefinierade protokollkommandon, t.ex.:

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

Att anropa kommandot korrekt, t.ex. `browser.myNewCommand('foo', 'bar')`, gör korrekt en WebDriver-förfrågan till t.ex. `http://localhost:4444/session/7bae3c4c55c3bf82f54894ddc83c5f31/foobar/foo` med en nyttolast som `{ foo: 'bar' }`.

:::note
URL-parametern `:sessionId` ersätts automatiskt med sessions-id:t för WebDriver-sessionen. Andra URL-parametrar kan tillämpas men behöver definieras inom `variables`.
:::

Se exempel på hur protokollkommandon kan definieras i [`@wdio/protocols`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-protocols/src/protocols)-paketet.