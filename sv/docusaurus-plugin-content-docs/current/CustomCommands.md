---
id: customcommands
title: Anpassade kommandon
description: "Lägg till egna webbläsar- och elementkommandon med addCommand, skriv över befintliga kommandon och utöka TypeScript-typdefinitionerna."
---

Om du vill utöka `browser`-instansen med dina egna kommandon kan du använda webbläsarmetoden `addCommand`. Du kan skriva ditt kommando asynkront, precis som i dina specs.

## Parametrar

### Kommandonamn

<Option type="String">

Ett namn som definierar kommandot och som kopplas till webbläsar- eller elementscopet.

</Option>

### Anpassad funktion

<Option type="Function">

En funktion som körs när kommandot anropas. `this`-scopet är [`WebdriverIO.Browser`](/docs/api/browser), [`WebdriverIO.Element`](/docs/api/element) eller `WebdriverIO.BrowsingContext`, beroende på om kommandot kopplas till webbläsaren, till element eller till webbläsarkontexter.

</Option>

### Alternativ

Objekt med konfigurationsalternativ som ändrar det anpassade kommandots beteende

#### Målscope

<Option type="Boolean" default="false" name="attachToElement">

Flagga som avgör om kommandot ska kopplas till webbläsar- eller elementscopet. Om den sätts till `true` blir kommandot ett elementkommando.

</Option>

<Option type="Boolean" default="false" name="attachToBrowsingContext">

Flagga för att koppla kommandot till varje webbläsarkontext: de flikar, fönster och ramar som `browser.url()`, `browser.newWindow()`, `browser.browsingContexts()` och `context.frame()` returnerar i en WebDriver BiDi-session. Den kan inte kombineras med `attachToElement`. Se [Webbläsarkontexter](#browsing-contexts).

</Option>

#### Inaktivera implicitWait

<Option type="Boolean" default="false" name="disableElementImplicitWait">

Flagga som avgör om man implicit ska vänta på att elementet finns innan det anpassade kommandot anropas.

</Option>

## Exempel

Det här exemplet visar hur du lägger till ett nytt kommando som returnerar aktuell URL och titel som ett resultat. Scopet (`this`) är ett [`WebdriverIO.Browser`](/docs/api/browser)-objekt.

```js
browser.addCommand('getUrlAndTitle', async function (customVar) {
    // `this` refererar till `browser`-scopet
    return {
        url: await this.getUrl(),
        title: await this.getTitle(),
        customVar: customVar
    }
})
```

Dessutom kan du utöka elementinstansen med dina egna kommandon genom att sätta `attachToElement` till `true`. Scopet (`this`) är i det här fallet ett [`WebdriverIO.Element`](/docs/api/element)-objekt.

```js
browser.addCommand("waitAndClick", async function () {
    // `this` är returvärdet från $(selector)
    await this.waitForDisplayed()
    await this.click()
}, { attachToElement: true })
```

Som standard väntar anpassade elementkommandon på att elementet finns innan det anpassade kommandot anropas. Även om detta oftast är önskvärt kan det, om så inte är fallet, inaktiveras med `disableImplicitWait`:

```js
browser.addCommand("waitAndClick", async function () {
    // `this` är returvärdet från $(selector)
    await this.waitForExists()
    await this.click()
}, { attachToElement: true, disableElementImplicitWait: true })
```

Anpassade kommandon ger dig möjlighet att samla en specifik sekvens av kommandon som du använder ofta i ett enda anrop. Du kan definiera anpassade kommandon var som helst i din testsvit; se bara till att kommandot definieras *innan* det används första gången. (`before`-hooken i din `wdio.conf.js` är ett bra ställe att skapa dem på.)

När de har definierats kan du använda dem så här:

```js
it('should use my custom command', async () => {
    await browser.url('http://www.github.com')
    const result = await browser.getUrlAndTitle('foobar')

    assert.strictEqual(result.url, 'https://github.com/')
    assert.strictEqual(result.title, 'GitHub · Where software is built')
    assert.strictEqual(result.customVar, 'foobar')
})
```

__Obs:__ Om du registrerar ett anpassat kommando i `browser`-scopet blir kommandot inte tillgängligt för element. På samma sätt gäller att om du registrerar ett kommando i elementscopet blir det inte tillgängligt i `browser`-scopet:

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

__Obs:__ Om du behöver kedja ett anpassat kommando ska kommandot sluta med `$`,

```js
browser.addCommand("user$", (locator) => { return ele })
browser.addCommand("user$", (locator) => { return ele }, { attachToElement: true })
await browser.user$('foo').user$('bar').click()
```

Var försiktig så att du inte överbelastar `browser`-scopet med för många anpassade kommandon.

Vi rekommenderar att du definierar anpassad logik i [page objects](pageobjects), så att de är knutna till en specifik sida.

### Webbläsarkontexter {#browsing-contexts}

I en WebDriver BiDi-session är en flik, ett fönster och en ram vardera en `WebdriverIO.BrowsingContext`. Sätt `attachToBrowsingContext` till `true` för att lägga till ett kommando till alla dessa. Scopet (`this`) är den kontext som kommandot anropades på, och `this.browser` är den webbläsare som den tillhör:

```js
browser.addCommand('heading', async function () {
    // `this` är fliken, fönstret eller ramen
    return this.$('h1').getText()
}, { attachToBrowsingContext: true })

const page = await browser.url('https://webdriver.io')
console.log(await page.heading())

const frame = await page.frame('iframe')
console.log(await frame.heading())
```

Kommandot är tillgängligt på kontexter som redan finns och på varje kontext som skapas senare, inklusive ramar från en annan origin. Ett kommando som bara är meningsfullt för en flik eller ett fönster kan kontrollera `this.isFrame`.

`addCommand` och `overwriteCommand` på en webbläsarkontext i sig kastar ett fel. Registrera kommandot på webbläsaren.

### Multi-remote

`addCommand` fungerar på liknande sätt för multi-remote, förutom att det nya kommandot sprids ned till barninstanserna. Du måste vara uppmärksam när du använder `this`-objektet eftersom multi-remote-`browser` och dess barninstanser har olika `this`.

Det här exemplet visar hur du lägger till ett nytt kommando för multi-remote.

```js
import { multiRemoteBrowser } from '@wdio/globals'

multiRemoteBrowser.addCommand('getUrlAndTitle', async function (this: WebdriverIO.MultiRemoteBrowser, customVar: any) {
    // `this` refererar till:
    //      - MultiRemoteBrowser-scopet för webbläsaren
    //      - Browser-scopet för instanser
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

Med TypeScript är det enkelt att utöka WebdriverIO-gränssnitt. Lägg till typer för dina anpassade kommandon så här:

1. Skapa en typdefinitionsfil (t.ex. `./src/types/wdio.d.ts`)
2. a. Om du använder en typdefinitionsfil i modulstil (med import/export och `declare global WebdriverIO` i typdefinitionsfilen), se till att inkludera filsökvägen i `include`-egenskapen i `tsconfig.json`.

   b. Om du använder typdefinitionsfiler i ambient-stil (ingen import/export i typdefinitionsfilerna och `declare namespace WebdriverIO` för anpassade kommandon), se till att `tsconfig.json` *inte* innehåller någon `include`-sektion, eftersom det gör att alla typdefinitionsfiler som inte listas i `include`-sektionen inte känns igen av TypeScript.

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

## Integrera tredjepartsbibliotek

Om du använder externa bibliotek (t.ex. för att göra databasanrop) som stöder promises är ett bra sätt att integrera dem att omsluta vissa API-metoder med ett anpassat kommando.

När du returnerar ett promise ser WebdriverIO till att det inte fortsätter med nästa kommando förrän promiset har resolvats. Om promiset blir rejectat kastar kommandot ett fel.

```js
browser.addCommand('makeRequest', async (url) => {
    const response = await fetch(url)
    return await response.json()
})
```

Använd det sedan bara i dina WDIO-testspecs:

```js
it('execute external library in a sync way', async () => {
    await browser.url('...')
    const body = await browser.makeRequest('http://...')
    console.log(body) // returnerar svarets body
})
```

**Obs:** Resultatet av ditt anpassade kommando är resultatet av det promise som du returnerar.

## Skriva över kommandon

Du kan också skriva över inbyggda kommandon med `overwriteCommand`.

Det rekommenderas inte att göra detta, eftersom det kan leda till oförutsägbart beteende i ramverket!

Det övergripande tillvägagångssättet liknar `addCommand`, den enda skillnaden är att det första argumentet i kommandofunktionen är den ursprungliga funktionen som du ska skriva över. Se några exempel nedan.

### Skriva över webbläsarkommandon

```js
/**
 * Skriv ut millisekunder före paus och returnera värdet.
 *
 * @param pause - namnet på kommandot som ska skrivas över
 * @param this of func - den ursprungliga webbläsarinstansen som funktionen anropades på
 * @param originalPauseFunction of func - den ursprungliga pause-funktionen
 * @param ms of func - de faktiska parametrarna som skickades
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

Att skriva över kommandon på elementnivå är nästan likadant. Sätt `attachToElement` till `true`:

```js
/**
 * Försök att scrolla till elementet om det inte är klickbart.
 * Skicka { force: true } för att klicka med JS även om elementet inte är synligt eller klickbart.
 * Visa att den ursprungliga funktionens argumenttyp kan behållas med `options?: ClickOptions`
 *
 * @param this of func - elementet som den ursprungliga funktionen anropades på
 * @param originalClickFunction of func - den ursprungliga pause-funktionen
 * @param options of func - de faktiska parametrarna som skickades
 */
browser.overwriteCommand(
    'click',
    async function (this, originalClickFunction, options?: ClickOptions & { force?: boolean }) {
        const { force, ...restOptions } = options || {}
        if (!force) {
            try {
                // försök att klicka
                await originalClickFunction(options)
                return
            } catch (err) {
                if ((err as Error).message.includes('not clickable at point')) {
                    console.warn('WARN: Element', this.selector, 'is not clickable.', 'Scrolling to it before clicking again.')

                    // scrolla till elementet och klicka igen
                    await this.scrollIntoView()
                    return originalClickFunction(options)
                }
                throw err
            }
        }

        // klicka med js
        console.warn('WARN: Using force click for', this.selector)
        await browser.execute((el) => {
            el.click()
        }, this)
    },
    { attachToElement: true }, // Glöm inte att koppla det till elementet
)

// använd det sedan som tidigare
const elem = await $('body')
await elem.click()

// eller skicka parametrar
await elem.click({ force: true })
```

### Skriva över kommandon för webbläsarkontexter

Sätt `attachToBrowsingContext` till `true` för att skriva över ett inbyggt eller anpassat kommando för varje flik, fönster och ram. Det ursprungliga kommandot är bundet till den kontext som det anropades på:

```js
browser.overwriteCommand('getTitle', async function (this, originalGetTitle) {
    const title = await originalGetTitle()
    return this.isFrame ? `frame: ${title}` : title
}, { attachToBrowsingContext: true })

const page = await browser.url('https://webdriver.io')
const frame = await page.frame('iframe')
console.log(await frame.getTitle()) // "frame: ..."
```

## Lägg till fler WebDriver-kommandon

Om du använder WebDriver-protokollet och kör tester på en plattform som stöder ytterligare kommandon som inte definieras av någon av protokolldefinitionerna i [`@wdio/protocols`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-protocols/src/protocols) kan du lägga till dem manuellt via `addCommand`-gränssnittet. Paketet `webdriver` erbjuder en kommandowrapper som gör det möjligt att registrera dessa nya endpoints på samma sätt som andra kommandon, med samma parameterkontroller och felhantering. För att registrera denna nya endpoint importerar du kommandowrappern och registrerar ett nytt kommando med den enligt följande:

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

Om du anropar detta kommando med ogiltiga parametrar får du samma felhantering som för fördefinierade protokollkommandon, t.ex.:

```js
// anropa kommandot utan obligatorisk url-parameter och payload
await browser.myNewCommand()

/**
 * resulterar i följande fel:
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

Om du anropar kommandot korrekt, t.ex. `browser.myNewCommand('foo', 'bar')`, görs korrekt en WebDriver-förfrågan till t.ex. `http://localhost:4444/session/7bae3c4c55c3bf82f54894ddc83c5f31/foobar/foo` med en payload som `{ foo: 'bar' }`.

:::note
URL-parametern `:sessionId` ersätts automatiskt med sessions-id:t för WebDriver-sessionen. Andra URL-parametrar kan användas men måste definieras i `variables`.
:::

Se exempel på hur protokollkommandon kan definieras i paketet [`@wdio/protocols`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-protocols/src/protocols).