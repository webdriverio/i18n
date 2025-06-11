---
id: customcommands
title: தனிப்பயன் கட்டளைகள்
---

நீங்கள் `browser` நிகழ்வை உங்கள் சொந்த கட்டளைகளின் தொகுப்புடன் விரிவுபடுத்த விரும்பினால், உலாவி முறை `addCommand` உங்களுக்காக இங்கே உள்ளது. உங்கள் விவரக்குறிப்புகளில் உள்ளது போலவே, நீங்கள் உங்கள் கட்டளையை ஒரு ஒத்திசைவற்ற முறையில் எழுதலாம்.

## அளவுருக்கள்

### கட்டளை பெயர்

கட்டளையை வரையறுக்கும் மற்றும் உலாவி அல்லது உறுப்பு நோக்கத்துடன் இணைக்கப்படும் பெயர்.

வகை: `String`

### தனிப்பயன் செயல்பாடு

கட்டளை அழைக்கப்படும்போது செயல்படுத்தப்படும் செயல்பாடு. `this` நோக்கம் [`WebdriverIO.Browser`](/docs/api/browser) அல்லது [`WebdriverIO.Element`](/docs/api/element) ஆகும், கட்டளை உலாவி அல்லது உறுப்பு நோக்கத்துடன் இணைக்கப்பட்டுள்ளதா என்பதைப் பொறுத்து.

வகை: `Function`

### இலக்கு நோக்கு

கட்டளையை உலாவி அல்லது உறுப்பு நோக்கத்துடன் இணைக்க வேண்டுமா என்பதை முடிவு செய்ய கொடி. `true` என அமைக்கப்பட்டால், கட்டளை ஒரு உறுப்பு கட்டளையாக இருக்கும்.

வகை: `Boolean`<br />
இயல்புநிலை: `false`

## உதாரணங்கள்

இந்த உதாரணம் தற்போதைய URL மற்றும் தலைப்பை ஒரு முடிவாக திருப்பும் ஒரு புதிய கட்டளையை எவ்வாறு சேர்ப்பது என்பதைக் காட்டுகிறது. நோக்கு (`this`) ஒரு [`WebdriverIO.Browser`](/docs/api/browser) பொருளாகும்.

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

கூடுதலாக, இறுதி வாதமாக `true`-ஐ அனுப்புவதன் மூலம், உங்கள் சொந்த கட்டளைகளின் தொகுப்புடன் உறுப்பு நிகழ்வை நீங்கள் விரிவுபடுத்தலாம். இந்த சந்தர்ப்பத்தில் நோக்கம் (`this`) என்பது [`WebdriverIO.Element`](/docs/api/element) பொருளாகும்.

```js
browser.addCommand("waitAndClick", async function () {
    // `this` is return value of $(selector)
    await this.waitForDisplayed()
    await this.click()
}, true)
```

தனிப்பயன் கட்டளைகள் உங்களுக்கு அடிக்கடி பயன்படுத்தும் ஒரு குறிப்பிட்ட கட்டளைகளின் வரிசையை ஒற்றை அழைப்பாக கட்டுவதற்கான வாய்ப்பை அளிக்கிறது. உங்கள் சோதனை தொகுப்பில் எந்த புள்ளியிலும் நீங்கள் தனிப்பயன் கட்டளைகளை வரையறுக்கலாம்; கட்டளை அதன் முதல் பயன்பாட்டிற்கு *முன்பு* வரையறுக்கப்பட்டுள்ளது என்பதை உறுதிப்படுத்திக் கொள்ளுங்கள். (உங்கள் `wdio.conf.js` இல் உள்ள `before` ஹூக் அவற்றை உருவாக்க ஒரு நல்ல இடம்.)

வரையறுக்கப்பட்டபின், நீங்கள் அவற்றைப் பின்வருமாறு பயன்படுத்தலாம்:

```js
it('should use my custom command', async () => {
    await browser.url('http://www.github.com')
    const result = await browser.getUrlAndTitle('foobar')

    assert.strictEqual(result.url, 'https://github.com/')
    assert.strictEqual(result.title, 'GitHub · Where software is built')
    assert.strictEqual(result.customVar, 'foobar')
})
```

__குறிப்பு:__ `browser` நோக்கத்திற்கு ஒரு தனிப்பயன் கட்டளையைப் பதிவு செய்தால், கட்டளை உறுப்புகளுக்கு அணுகக்கூடியதாக இருக்காது. அதேபோல், உறுப்பு நோக்கத்திற்கு ஒரு கட்டளையைப் பதிவு செய்தால், அது `browser` நோக்கத்தில் அணுகக்கூடியதாக இருக்காது:

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

__குறிப்பு:__ நீங்கள் ஒரு தனிப்பயன் கட்டளையை தொடர வேண்டுமென்றால், கட்டளை `$` உடன் முடிய வேண்டும்,

```js
browser.addCommand("user$", (locator) => { return ele })
browser.addCommand("user$", (locator) => { return ele }, true)
await browser.user$('foo').user$('bar').click()
```

`browser` நோக்கத்தை மிக அதிகமான தனிப்பயன் கட்டளைகளுடன் அதிகப்படுத்துவதைத் தவிர்க்க கவனமாக இருங்கள்.

[பக்க பொருள்களில்](pageobjects) தனிப்பயன் தர்க்கத்தை வரையறுக்க பரிந்துரைக்கிறோம், அதனால் அவை ஒரு குறிப்பிட்ட பக்கத்துடன் பிணைக்கப்பட்டிருக்கும்.

### மல்டிரிமோட்

`addCommand` பலரிமோட்டிற்கு ஒரே மாதிரியான முறையில் செயல்படுகிறது, புதிய கட்டளை குழந்தை நிகழ்வுகளுக்கு பரவும் என்பதைத் தவிர. பலரிமோட் `browser` மற்றும் அதன் குழந்தை நிகழ்வுகள் வெவ்வேறு `this` கொண்டிருப்பதால் நீங்கள் `this` பொருளைப் பயன்படுத்தும்போது கவனமாக இருக்க வேண்டும்.

இந்த உதாரணம் மல்டிரிமோட்டிற்கான புதிய கட்டளையை எவ்வாறு சேர்ப்பது என்பதைக் காட்டுகிறது.

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

## வகை வரையறைகளை விரிவுபடுத்து

TypeScript உடன், WebdriverIO இடைமுகங்களை விரிவுபடுத்துவது எளிது. உங்கள் தனிப்பயன் கட்டளைகளுக்கு வகைகளை இவ்வாறு சேர்க்கவும்:

1. ஒரு வகை வரையறை கோப்பை உருவாக்கவும் (எ.கா., `./src/types/wdio.d.ts`)
2. a. தொகுதி-பாணி வகை வரையறை கோப்பைப் பயன்படுத்தினால் (வகை வரையறை கோப்பில் இறக்குமதி/ஏற்றுமதி மற்றும் `declare global WebdriverIO` பயன்படுத்துகிறது), கோப்பு பாதையை `tsconfig.json` `include` பண்பில் சேர்க்க உறுதிசெய்க.

   b. சுற்றுச்சூழல்-பாணி வகை வரையறை கோப்புகளைப் பயன்படுத்தினால் (வகை வரையறை கோப்புகளில் இறக்குமதி/ஏற்றுமதி இல்லை மற்றும் தனிப்பயன் கட்டளைகளுக்கு `declare namespace WebdriverIO`), `tsconfig.json` எந்த `include` பிரிவையும் கொண்டிருக்கக்*கூடாது* என்பதை உறுதிசெய்க, ஏனெனில் இது `include` பிரிவில் பட்டியலிடப்படாத அனைத்து வகை வரையறை கோப்புகளும் டைப்ஸ்கிரிப்ட் மூலம் அங்கீகரிக்கப்படாமல் போகக் காரணமாகும்.

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

3. உங்கள் செயல்படுத்தல் முறைக்கு ஏற்ப உங்கள் கட்டளைகளுக்கான வரையறைகளைச் சேர்க்கவும்.

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

## 3வது தரப்பு நூலகங்களை ஒருங்கிணைக்க

நீங்கள் வாக்குறுதிகளை ஆதரிக்கும் வெளிப்புற நூலகங்களைப் பயன்படுத்தினால் (எ.கா., தரவுத்தள அழைப்புகளைச் செய்ய), அவற்றை ஒருங்கிணைப்பதற்கான ஒரு நல்ல அணுகுமுறை சில API முறைகளை ஒரு தனிப்பயன் கட்டளையுடன் சுற்றுவதாகும்.

வாக்குறுதியைத் திருப்பும்போது, வாக்குறுதி தீர்க்கப்படும் வரை அடுத்த கட்டளையுடன் தொடராது என்பதை WebdriverIO உறுதி செய்கிறது. வாக்குறுதி நிராகரிக்கப்பட்டால், கட்டளை ஒரு பிழையை எழுப்பும்.

```js
browser.addCommand('makeRequest', async (url) => {
    const response = await fetch(url)
    return await response.json()
})
```

பின்னர், அதை உங்கள் WDIO சோதனை விவரக்குறிப்புகளில் பயன்படுத்தவும்:

```js
it('execute external library in a sync way', async () => {
    await browser.url('...')
    const body = await browser.makeRequest('http://...')
    console.log(body) // returns response body
})
```

**குறிப்பு:** உங்கள் தனிப்பயன் கட்டளையின் முடிவு நீங்கள் திருப்பிய வாக்குறுதியின் முடிவாகும்.

## கட்டளைகளை மேலெழுதுதல்

`overwriteCommand` உடன் நீங்கள் இயல்பான கட்டளைகளையும் மேலெழுதலாம்.

இது கட்டமைப்பின் கணிக்க முடியாத நடத்தைக்கு வழிவகுக்கக்கூடும் என்பதால் இதைச் செய்ய பரிந்துரைக்கப்படவில்லை!

ஒட்டுமொத்த அணுகுமுறை `addCommand`க்கு ஒத்ததாக உள்ளது, ஒரே வேறுபாடு என்னவென்றால், கட்டளை செயல்பாட்டில் உள்ள முதல் வாதம் நீங்கள் மேலெழுதப் போகும் அசல் செயல்பாடாகும். கீழே சில உதாரணங்களைக் காணவும்.

### உலாவி கட்டளைகளை மேலெழுதுதல்

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

### உறுப்பு கட்டளைகளை மேலெழுதுதல்

உறுப்பு நிலையில் மேலெழுதும் கட்டளைகள் கிட்டத்தட்ட ஒரே மாதிரியானவை. `overwriteCommand`க்கு மூன்றாவது வாதமாக `true`-ஐ அனுப்பவும்:

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

## மேலும் WebDriver கட்டளைகளைச் சேர்க்கவும்

நீங்கள் WebDriver நெறிமுறையைப் பயன்படுத்தி, [`@wdio/protocols`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-protocols/src/protocols) இல் எந்த நெறிமுறை வரையறைகளாலும் வரையறுக்கப்படாத கூடுதல் கட்டளைகளை ஆதரிக்கும் தளத்தில் சோதனைகளை இயக்கினால், நீங்கள் கைமுறையாக அவற்றை `addCommand` இடைமுகம் மூலம் சேர்க்கலாம். `webdriver` தொகுப்பு ஒரு கட்டளை மடக்கை வழங்குகிறது, இது இந்த புதிய முடிவுப்புள்ளிகளை மற்ற கட்டளைகள் போலவே பதிவு செய்ய அனுமதிக்கிறது, அதே அளவுரு சரிபார்ப்புகள் மற்றும் பிழை கையாளுதலை வழங்குகிறது. இந்த புதிய முடிவுப்புள்ளியைப் பதிவு செய்ய கட்டளை மடக்கை இறக்குமதி செய்து, பின்வருமாறு ஒரு புதிய கட்டளையைப் பதிவு செய்யவும்:

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

தவறான அளவுருக்களுடன் இந்த கட்டளையை அழைப்பது முன்வரையறுக்கப்பட்ட நெறிமுறை கட்டளைகள் போலவே பிழை கையாளுதலில் முடிகிறது, எ.கா.:

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

கட்டளையை சரியாக அழைப்பது, எ.கா. `browser.myNewCommand('foo', 'bar')`, சரியாக WebDriver கோரிக்கையை எ.கா. `http://localhost:4444/session/7bae3c4c55c3bf82f54894ddc83c5f31/foobar/foo`க்கு `{ foo: 'bar' }` போன்ற பேலோடுடன் செய்கிறது.

:::note
`:sessionId` url அளவுரு தானாகவே WebDriver அமர்வின் அமர்வு ஐடியுடன் மாற்றப்படும். பிற url அளவுருக்களும் பயன்படுத்தப்படலாம், ஆனால் `variables` இல் வரையறுக்கப்பட வேண்டும்.
:::

நெறிமுறை கட்டளைகளை எவ்வாறு வரையறுக்கலாம் என்பதற்கான உதாரணங்களை [`@wdio/protocols`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-protocols/src/protocols) தொகுப்பில் காணலாம்.