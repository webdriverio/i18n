---
id: customcommands
title: Anpassade Kommandon
---

Om du vill utöka `browser`-instansen med egna kommandon finns metoden `addCommand`. Du kan skriva ditt kommando på ett asynkront sätt, precis som i dina specifikationer.

## Parametrar

### Kommandonamn

Ett namn som definierar kommandot och som kommer att kopplas till webbläsaren eller elementets omfattning.

Typ: `String`

### Anpassad funktion

En funktion som körs när kommandot anropas. `this`-omfattningen är antingen [`WebdriverIO.Browser`](/docs/api/browser) eller [`WebdriverIO.Element`](/docs/api/element) beroende på om kommandot kopplas till webbläsaren eller elementets omfattning.

Typ: `Function`

### Målomfattning

Flagga för att bestämma om kommandot ska kopplas till webbläsaren eller elementets omfattning. Om den är inställd på `true` kommer kommandot att vara ett elementkommando.

Typ: `Boolean`<br />
Standard: `false`

## Exempel

Detta exempel visar hur man lägger till ett nytt kommando som returnerar aktuell URL och titel som ett resultat. Omfattningen (`this`) är ett [`WebdriverIO.Browser`](/docs/api/browser)-objekt.

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

Dessutom kan du utöka elementinstansen med egna kommandon genom att skicka `true` som det sista argumentet. Omfattningen (`this`) i detta fall är ett [`WebdriverIO.Element`](/docs/api/element)-objekt.

```js
browser.addCommand("waitAndClick", async function () {
    // `this` is return value of $(selector)
    await this.waitForDisplayed()
    await this.click()
}, true)
```

Anpassade kommandon ger dig möjlighet att paketera en specifik sekvens av kommandon du använder ofta som ett enda anrop. Du kan definiera anpassade kommandon när som helst i din testsvit; se bara till att kommandot definieras *innan* det används första gången. (`before`-kroken i din `wdio.conf.js` är en bra plats att skapa dem.)

När de är definierade kan du använda dem så här:

```js
it('should use my custom command', async () => {
    await browser.url('http://www.github.com')
    const result = await browser.getUrlAndTitle('foobar')

    assert.strictEqual(result.url, 'https://github.com/')
    assert.strictEqual(result.title, 'GitHub · Where software is built')
    assert.strictEqual(result.customVar, 'foobar')
})
```

__Obs:__ Om du registrerar ett anpassat kommando till `browser`-omfattningen kommer kommandot inte att vara tillgängligt för element. På samma sätt, om du registrerar ett kommando till elementets omfattning, kommer det inte att vara tillgängligt i `browser`-omfattningen:

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

__Obs:__ Om du behöver kedja ett anpassat kommando bör kommandot sluta med `$`,

```js
browser.addCommand("user$", (locator) => { return ele })
browser.addCommand("user$", (locator) => { return ele }, true)
await browser.user$('foo').user$('bar').click()
```

Var försiktig så att du inte överbelastar `browser`-omfattningen med för många anpassade kommandon.

Vi rekommenderar att definiera anpassad logik i [sidobjekt](pageobjects), så att de är bundna till en specifik sida.

### Multiremote

`addCommand` fungerar på ett liknande sätt för multiremote, förutom att det nya kommandot kommer att spridas ner till barninstanserna. Du måste vara uppmärksam när du använder `this`-objektet eftersom multiremote `browser` och dess barninstanser har olika `this`.

Detta exempel visar hur man lägger till ett nytt kommando för multiremote.

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

## Utöka typdefinitioner

Med TypeScript är det enkelt att utöka WebdriverIO-gränssnitten. Lägg till typer till dina anpassade kommandon så här:

1. Skapa en typdefinitionsfil (t.ex. `./src/types/wdio.d.ts`)
2. a. Om du använder en modulstyld typdefinitionsfil (med import/export och `declare global WebdriverIO` i typdefinitionsfilen), se till att inkludera filsökvägen i `tsconfig.json` `include`-egenskapen.

   b. Om du använder ambient-stil typdefinitionsfiler (ingen import/export i typdefinitionsfiler och `declare namespace WebdriverIO` för anpassade kommandon), se till att `tsconfig.json` *inte* innehåller någon `include`-sektion, eftersom detta kommer att göra att alla typdefinitionsfiler som inte finns med i `include`-sektionen inte kommer att kännas igen av typescript.

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

3. Lägg till definitioner för dina kommandon enligt ditt körläge.

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

När du returnerar löftet ser WebdriverIO till att det inte fortsätter med nästa kommando förrän löftet är löst. Om löftet avvisas kommer kommandot att kasta ett fel.

```js
browser.addCommand('makeRequest', async (url) => {
    const response = await fetch(url)
    return await response.json()
})
```

Använd det sedan i dina WDIO-testspecifikationer:

```js
it('execute external library in a sync way', async () => {
    await browser.url('...')
    const body = await browser.makeRequest('http://...')
    console.log(body) // returns response body
})
```

**Obs:** Resultatet av ditt anpassade kommando är resultatet av löftet du returnerar.

## Överskriva kommandon

Du kan också överskriva inbyggda kommandon med `overwriteCommand`.

Det rekommenderas inte att göra detta, eftersom det kan leda till oförutsägbart beteende hos ramverket!

Det övergripande tillvägagångssättet liknar `addCommand`, den enda skillnaden är att det första argumentet i kommandfunktionen är den ursprungliga funktionen som du håller på att överskriva. Se några exempel nedan.

### Överskriva webbläsarkommandon

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

### Överskriva elementkommandon

Att överskriva kommandon på elementnivå är nästan detsamma. Skicka helt enkelt `true` som det tredje argumentet till `overwriteCommand`:

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

## Lägg till fler WebDriver-kommandon

Om du använder WebDriver-protokollet och kör tester på en plattform som stöder ytterligare kommandon som inte definieras av någon av protokolldefinitionerna i [`@wdio/protocols`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-protocols/src/protocols) kan du manuellt lägga till dem via `addCommand`-gränssnittet. Paketet `webdriver` erbjuder en kommandowrapper som gör det möjligt att registrera dessa nya slutpunkter på samma sätt som andra kommandon, med samma parameterkontroller och felhantering. För att registrera denna nya slutpunkt, importera kommandowrappern och registrera ett nytt kommando med det enligt följande:

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
URL-parametern `:sessionId` kommer automatiskt att ersättas med session-id för WebDriver-sessionen. Andra URL-parametrar kan tillämpas men måste definieras inom `variables`.
:::

Se exempel på hur protokollkommandon kan definieras i [`@wdio/protocols`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-protocols/src/protocols)-paketet.