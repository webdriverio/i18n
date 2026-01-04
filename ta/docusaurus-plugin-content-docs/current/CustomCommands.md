---
id: customcommands
title: தனிப்பயன் கட்டளைகள்
---

நீங்கள் உங்களது சொந்த கட்டளைகளுடன் `browser` நிகழ்வை விரிவுபடுத்த விரும்பினால், உலாவி முறை `addCommand` உங்களுக்காக இங்கே உள்ளது. உங்கள் ஸ்பெக்களில் உள்ளதைப் போலவே, நீங்கள் உங்கள் கட்டளையை ஒரு ஒத்திசைவற்ற (asynchronous) வழியில் எழுதலாம்.

## அளவுருக்கள்

### கட்டளை பெயர்

கட்டளையை வரையறுக்கும் மற்றும் உலாவி அல்லது கூறு நோக்கத்துடன் இணைக்கப்படும் ஒரு பெயர்.

வகை: `String`

### தனிப்பயன் செயல்பாடு

கட்டளை அழைக்கப்படும்போது செயல்படுத்தப்படும் ஒரு செயல்பாடு. `this` நோக்கம் [`WebdriverIO.Browser`](/docs/api/browser) அல்லது [`WebdriverIO.Element`](/docs/api/element) ஆகும், கட்டளை உலாவி அல்லது கூறு நோக்கத்துடன் இணைக்கப்பட்டுள்ளதா என்பதைப் பொறுத்து.

வகை: `Function`

### விருப்பங்கள்

தனிப்பயன் கட்டளை நடத்தையை மாற்றியமைக்கும் உள்ளமைவு விருப்பங்களுடன் கூடிய பொருள்

#### இலக்கு நோக்கம்

கட்டளையை உலாவி அல்லது கூறு நோக்கத்துடன் இணைக்க வேண்டுமா என்பதைத் தீர்மானிக்கும் கொடி. `true` என அமைக்கப்பட்டால் கட்டளை ஒரு கூறு கட்டளையாக இருக்கும்.

விருப்ப பெயர்: `attachToElement`
வகை: `Boolean`<br />
இயல்புநிலை: `false`

#### implicitWait ஐ முடக்கு

தனிப்பயன் கட்டளையை அழைப்பதற்கு முன் கூறு இருப்பதற்காக மறைமுகமாக காத்திருக்க வேண்டுமா என்பதைத் தீர்மானிக்கும் கொடி.

விருப்ப பெயர்: `disableElementImplicitWait`
வகை: `Boolean`<br />
இயல்புநிலை: `false`

## உதாரணங்கள்

இந்த உதாரணம் தற்போதைய URL மற்றும் தலைப்பை ஒரே முடிவாக திருப்பும் ஒரு புதிய கட்டளையை எவ்வாறு சேர்ப்பது என்பதைக் காட்டுகிறது. நோக்கம் (`this`) ஒரு [`WebdriverIO.Browser`](/docs/api/browser) பொருளாகும்.

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

கூடுதலாக, இறுதி அளவுருவாக `true` ஐ அனுப்புவதன் மூலம், உங்கள் சொந்த கட்டளைகளுடன் கூறு நிகழ்வை நீங்கள் விரிவுபடுத்தலாம். இந்த சந்தர்ப்பத்தில் நோக்கம் (`this`) ஒரு [`WebdriverIO.Element`](/docs/api/element) பொருளாகும்.

```js
browser.addCommand("waitAndClick", async function () {
    // `this` is return value of $(selector)
    await this.waitForDisplayed()
    await this.click()
}, { attachToElement: true })
```

இயல்பாக, கூறு தனிப்பயன் கட்டளைகள் தனிப்பயன் கட்டளையை அழைப்பதற்கு முன் கூறு இருப்பதற்காக காத்திருக்கும். பெரும்பாலான நேரங்களில் இது விரும்பப்படுகிறது, ஆனால் தேவையில்லை என்றால், `disableImplicitWait` மூலம் முடக்கலாம்:

```js
browser.addCommand("waitAndClick", async function () {
    // `this` is return value of $(selector)
    await this.waitForExists()
    await this.click()
}, { attachToElement: true, disableElementImplicitWait: true })
```


தனிப்பயன் கட்டளைகள் உங்களுக்கு அடிக்கடி பயன்படுத்தும் ஒரு குறிப்பிட்ட கட்டளை வரிசையை ஒற்றை அழைப்பாக கட்டமைக்க வாய்ப்பளிக்கிறது. உங்கள் சோதனை தொகுப்பில் எந்த நேரத்திலும் நீங்கள் தனிப்பயன் கட்டளைகளை வரையறுக்கலாம்; கட்டளை முதல் முறை பயன்படுத்தப்படுவதற்கு *முன்* வரையறுக்கப்பட்டுள்ளது என்பதை உறுதிப்படுத்தவும். (உங்கள் `wdio.conf.js` இல் `before` ஹுக் அவற்றை உருவாக்க ஒரு நல்ல இடம்.)

வரையறுக்கப்பட்ட பின்னர், நீங்கள் அவற்றைப் பின்வருமாறு பயன்படுத்தலாம்:

```js
it('should use my custom command', async () => {
    await browser.url('http://www.github.com')
    const result = await browser.getUrlAndTitle('foobar')

    assert.strictEqual(result.url, 'https://github.com/')
    assert.strictEqual(result.title, 'GitHub · Where software is built')
    assert.strictEqual(result.customVar, 'foobar')
})
```

__குறிப்பு:__ நீங்கள் `browser` நோக்கத்திற்கு ஒரு தனிப்பயன் கட்டளையைப் பதிவு செய்தால், கட்டளை கூறுகளுக்கு அணுகக்கூடியதாக இருக்காது. அதேபோல், நீங்கள் கூறு நோக்கத்திற்கு ஒரு கட்டளையைப் பதிவு செய்தால், அது `browser` நோக்கத்தில் அணுகக்கூடியதாக இருக்காது:

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

__குறிப்பு:__ நீங்கள் ஒரு தனிப்பயன் கட்டளையை சங்கிலியாக்க வேண்டியிருந்தால், கட்டளை `$` உடன் முடிய வேண்டும்,

```js
browser.addCommand("user$", (locator) => { return ele })
browser.addCommand("user$", (locator) => { return ele }, { attachToElement: true })
await browser.user$('foo').user$('bar').click()
```

மிக அதிகமான தனிப்பயன் கட்டளைகளால் `browser` நோக்கத்தை அதிகப்படுத்துவதைத் தவிர்க்க கவனமாக இருங்கள்.

தனிப்பயன் தர்க்கத்தை [பக்க பொருள்களில்](pageobjects) வரையறுப்பதை நாங்கள் பரிந்துரைக்கிறோம், இதனால் அவை ஒரு குறிப்பிட்ட பக்கத்துடன் பிணைக்கப்பட்டுள்ளன.

### மல்டிரிமோட்

`addCommand` மல்டிரிமோட்டிற்கும் ஒரே மாதிரியான வழியில் வேலை செய்கிறது, புதிய கட்டளை குழந்தை நிகழ்வுகளுக்கு பரவும் தவிர. மல்டிரிமோட் `browser` மற்றும் அதன் குழந்தை நிகழ்வுகள் வேறுபட்ட `this` கொண்டிருப்பதால் நீங்கள் `this` பொருளைப் பயன்படுத்தும்போது கவனமாக இருக்க வேண்டும்.

இந்த உதாரணம் மல்டிரிமோட்டிற்கான ஒரு புதிய கட்டளையை எவ்வாறு சேர்ப்பது என்பதைக் காட்டுகிறது.

```js
import { multiRemoteBrowser } from '@wdio/globals'

multiRemoteBrowser.addCommand('getUrlAndTitle', async function (this: WebdriverIO.MultiRemoteBrowser, customVar: any) {
    // `this` refers to:
    //      - MultiRemoteBrowser scope for browser
    //      - Browser scope for instances
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

## வகை வரைவிலக்கணங்களை விரிவாக்குதல்

TypeScript உடன், WebdriverIO இடைமுகங்களை விரிவுபடுத்துவது எளிது. உங்கள் தனிப்பயன் கட்டளைகளுக்கு வகைகளைப் பின்வருமாறு சேர்க்கவும்:

1. ஒரு வகை வரைவிலக்கண கோப்பை உருவாக்கவும் (எ.கா., `./src/types/wdio.d.ts`)
2. அ. தொகுதி-பாணி வகை வரைவிலக்கண கோப்பைப் பயன்படுத்தினால் (வகை வரைவிலக்கண கோப்பில் import/export மற்றும் `declare global WebdriverIO` ஐப் பயன்படுத்தி), கோப்பு பாதையை `tsconfig.json` `include` பண்புகளில் சேர்க்க உறுதிப்படுத்தவும்.

   ஆ. சுற்றுச்சூழல்-பாணி வகை வரைவிலக்கண கோப்புகளைப் பயன்படுத்தினால் (வகை வரைவிலக்கண கோப்புகளில் import/export இல்லை மற்றும் தனிப்பயன் கட்டளைகளுக்கான `declare namespace WebdriverIO`), `tsconfig.json` எந்த `include` பிரிவையும் கொண்டிருக்க*வில்லை* என்பதை உறுதிப்படுத்தவும், ஏனெனில் இது `include` பிரிவில் பட்டியலிடப்படாத அனைத்து வகை வரைவிலக்கண கோப்புகளையும் TypeScript அங்கீகரிக்காமல் போக வழிவகுக்கும்.

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

3. உங்கள் செயல்படுத்தல் முறைக்கு ஏற்ப உங்கள் கட்டளைகளுக்கான வரைவிலக்கணங்களைச் சேர்க்கவும்.

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

## மூன்றாம் தரப்பு நூலகங்களை ஒருங்கிணைத்தல்

நீங்கள் வாக்குறுதிகளை ஆதரிக்கும் வெளிப்புற நூலகங்களைப் பயன்படுத்தினால் (எ.கா., தரவுத்தள அழைப்புகளைச் செய்ய), அவற்றை ஒருங்கிணைப்பதற்கான ஒரு சிறந்த அணுகுமுறை சில API முறைகளை ஒரு தனிப்பயன் கட்டளையுடன் மூடுவதாகும்.

வாக்குறுதியைத் திருப்பும்போது, வாக்குறுதி தீர்க்கப்படும் வரை அடுத்த கட்டளையுடன் தொடராமல் WebdriverIO உறுதிசெய்கிறது. வாக்குறுதி நிராகரிக்கப்பட்டால், கட்டளை ஒரு பிழையை எழுப்பும்.

```js
browser.addCommand('makeRequest', async (url) => {
    const response = await fetch(url)
    return await response.json()
})
```

பின்னர், அதை உங்கள் WDIO சோதனை ஸ்பெக்களில் பயன்படுத்தவும்:

```js
it('execute external library in a sync way', async () => {
    await browser.url('...')
    const body = await browser.makeRequest('http://...')
    console.log(body) // returns response body
})
```

**குறிப்பு:** உங்கள் தனிப்பயன் கட்டளையின் முடிவு நீங்கள் திரும்பும் வாக்குறுதியின் முடிவாகும்.

## கட்டளைகளை மேலெழுதுதல்

நீங்கள் `overwriteCommand` மூலம் உள்ளமைந்த கட்டளைகளையும் மேலெழுதலாம்.

இது கட்டமைப்பின் முன்கணிக்க முடியாத நடத்தைக்கு வழிவகுக்கும் என்பதால் இதைச் செய்ய பரிந்துரைக்கப்படவில்லை!

ஒட்டுமொத்த அணுகுமுறை `addCommand` ஐப் போன்றதாகும், ஒரே வித்தியாசம் என்னவென்றால், கட்டளை செயல்பாட்டில் முதல் அளவுரு நீங்கள் மேலெழுத உள்ள அசல் செயல்பாடாகும். கீழே சில உதாரணங்களைப் பார்க்கவும்.

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

### கூறு கட்டளைகளை மேலெழுதுதல்

கூறு நிலையில் கட்டளைகளை மேலெழுதுவது கிட்டத்தட்ட ஒரே மாதிரியானது. `overwriteCommand`க்கு மூன்றாவது அளவுருவாக `true` ஐ அனுப்பவும்:

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

## மேலும் WebDriver கட்டளைகளைச் சேர்க்கவும்

நீங்கள் WebDriver நெறிமுறையைப் பயன்படுத்துகிறீர்கள் மற்றும் [`@wdio/protocols`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-protocols/src/protocols) இல் எந்த நெறிமுறை வரைவிலக்கணங்களாலும் வரையறுக்கப்படாத கூடுதல் கட்டளைகளை ஆதரிக்கும் தளத்தில் சோதனைகளை இயக்குகிறீர்கள் என்றால், நீங்கள் `addCommand` இடைமுகத்தின் மூலம் அவற்றை கைமுறையாகச் சேர்க்கலாம். `webdriver` தொகுப்பு ஒரு கட்டளை ரேப்பரை வழங்குகிறது, இது இந்த புதிய முனைப்புகளை மற்ற கட்டளைகள் போலவே பதிவு செய்ய அனுமதிக்கிறது, அதே அளவுரு சரிபார்ப்புகள் மற்றும் பிழை கையாளுதலை வழங்குகிறது. இந்த புதிய முனைப்பைப் பதிவு செய்ய கட்டளை ரேப்பரை இறக்குமதி செய்து பின்வருமாறு ஒரு புதிய கட்டளையைப் பதிவு செய்யவும்:

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

இந்த கட்டளையை தவறான அளவுருக்களுடன் அழைப்பது முன்வரையறுக்கப்பட்ட நெறிமுறை கட்டளைகளைப் போலவே அதே பிழை கையாளுதலை ஏற்படுத்தும், எ.கா.:

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

கட்டளையை சரியாக அழைக்கும் போது, எ.கா. `browser.myNewCommand('foo', 'bar')`, சரியாக `http://localhost:4444/session/7bae3c4c55c3bf82f54894ddc83c5f31/foobar/foo` என்ற முகவரிக்கு ஒரு WebDriver கோரிக்கையை `{ foo: 'bar' }` போன்ற பேலோடுடன் அனுப்புகிறது.

:::note
`:sessionId` url அளவுரு WebDriver அமர்வின் அமர்வு id உடன் தானாகவே மாற்றப்படும். மற்ற url அளவுருக்களும் பயன்படுத்தப்படலாம் ஆனால் `variables` இல் வரையறுக்கப்பட வேண்டும்.
:::

நெறிமுறை கட்டளைகளை எவ்வாறு வரையறுக்கலாம் என்பதற்கான உதாரணங்களை [`@wdio/protocols`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-protocols/src/protocols) தொகுப்பில் காணலாம்.