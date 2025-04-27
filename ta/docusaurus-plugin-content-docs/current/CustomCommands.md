---
id: customcommands
title: தனிப்பயன் கட்டளைகள்
---

`browser` நிகழ்வை உங்கள் சொந்த கட்டளைகளுடன் நீட்டிக்க விரும்பினால், உலாவி முறை `addCommand` உங்களுக்காக இங்கே உள்ளது. உங்கள் விவரக்குறிப்புகளில் இருப்பதைப் போலவே, நீங்கள் உங்கள் கட்டளையை ஒரு ஒத்திசைவற்ற வழியில் எழுதலாம்.

## அளவுருக்கள்

### கட்டளை பெயர்

கட்டளையை வரையறுக்கும் மற்றும் உலாவி அல்லது உறுப்பு நோக்கத்திற்கு இணைக்கப்படும் பெயர்.

வகை: `String`

### தனிப்பயன் செயல்பாடு

கட்டளை அழைக்கப்படும்போது செயல்படுத்தப்படும் செயல்பாடு. `this` நோக்கம் [`WebdriverIO.Browser`](/docs/api/browser) அல்லது [`WebdriverIO.Element`](/docs/api/element) கட்டளை உலாவி அல்லது உறுப்பு நோக்கத்திற்கு இணைக்கப்படுமா என்பதைப் பொறுத்து.

வகை: `Function`

### இலக்கு நோக்கம்

கட்டளையை உலாவி அல்லது உறுப்பு நோக்கத்திற்கு இணைக்கலாமா என்பதை முடிவு செய்வதற்கான கொடி. `true` என அமைக்கப்பட்டால், கட்டளை ஒரு உறுப்பு கட்டளையாக இருக்கும்.

வகை: `Boolean`<br />
இயல்புநிலை: `false`

## எடுத்துக்காட்டுகள்

இந்த எடுத்துக்காட்டு தற்போதைய URL மற்றும் தலைப்பை ஒரே முடிவாக திருப்பும் ஒரு புதிய கட்டளையை எவ்வாறு சேர்ப்பது என்பதைக் காட்டுகிறது. நோக்கம் (`this`) ஒரு [`WebdriverIO.Browser`](/docs/api/browser) பொருள்.

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

கூடுதலாக, இறுதி வாதமாக `true` ஐ அனுப்புவதன் மூலம், உங்கள் சொந்த கட்டளைகளின் தொகுப்புடன் உறுப்பு நிகழ்வை நீட்டிக்கலாம். இந்த சந்தர்ப்பத்தில் நோக்கம் (`this`) ஒரு [`WebdriverIO.Element`](/docs/api/element) பொருள்.

```js
browser.addCommand("waitAndClick", async function () {
    // `this` is return value of $(selector)
    await this.waitForDisplayed()
    await this.click()
}, true)
```

தனிப்பயன் கட்டளைகள் நீங்கள் அடிக்கடி பயன்படுத்தும் ஒரு குறிப்பிட்ட வரிசை கட்டளைகளை ஒற்றை அழைப்பாக மாற்ற உங்களுக்கு வாய்ப்பளிக்கின்றன. உங்கள் சோதனை தொகுப்பில் எந்த புள்ளியிலும் தனிப்பயன் கட்டளைகளை வரையறுக்கலாம்; கட்டளை அதன் முதல் பயன்பாட்டிற்கு *முன்பு* வரையறுக்கப்பட்டுள்ளது என்பதை உறுதிப்படுத்திக் கொள்ளுங்கள். (உங்கள் `wdio.conf.js` இல் `before` கொக்கி அவற்றை உருவாக்க ஒரு நல்ல இடம்.)

ஒருமுறை வரையறுக்கப்பட்டால், அவற்றை பின்வருமாறு பயன்படுத்தலாம்:

```js
it('should use my custom command', async () => {
    await browser.url('http://www.github.com')
    const result = await browser.getUrlAndTitle('foobar')

    assert.strictEqual(result.url, 'https://github.com/')
    assert.strictEqual(result.title, 'GitHub · Where software is built')
    assert.strictEqual(result.customVar, 'foobar')
})
```

__குறிப்பு:__ நீங்கள் ஒரு தனிப்பயன் கட்டளையை `browser` நோக்கத்தில் பதிவு செய்தால், கட்டளை உறுப்புகளுக்கு அணுகக்கூடியதாக இருக்காது. அதேபோல், நீங்கள் உறுப்பு நோக்கத்திற்கு ஒரு கட்டளையைப் பதிவு செய்தால், அது `browser` நோக்கத்தில் அணுகக்கூடியதாக இருக்காது:

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

__குறிப்பு:__ நீங்கள் ஒரு தனிப்பயன் கட்டளையை சங்கிலி வேண்டுமானால், கட்டளை `$` உடன் முடிவடைய வேண்டும்,

```js
browser.addCommand("user$", (locator) => { return ele })
browser.addCommand("user$", (locator) => { return ele }, true)
await browser.user$('foo').user$('bar').click()
```

`browser` நோக்கெல்லையை அதிகமான தனிப்பயன் கட்டளைகளுடன் அதிகப்படுத்தாமல் கவனமாக இருங்கள்.

தனிப்பயன் தர்க்கத்தை [page objects](pageobjects) இல் வரையறுக்க பரிந்துரைக்கிறோம், எனவே அவை ஒரு குறிப்பிட்ட பக்கத்துடன் பிணைக்கப்பட்டுள்ளன.

### Multiremote

மல்டிரிமோட்டுக்கு, `addCommand` ஒரே மாதிரியான வழியில் செயல்படுகிறது, புதிய கட்டளை குழந்தைகள் நிகழ்வுகளுக்கு பரவும் என்பதைத் தவிர. மல்டிரிமோட் `browser` மற்றும் அதன் குழந்தைகள் நிகழ்வுகள் வெவ்வேறு `this` கொண்டிருப்பதால் `this` பொருளைப் பயன்படுத்தும்போது நீங்கள் கவனமாக இருக்க வேண்டும்.

இந்த எடுத்துக்காட்டு மல்டிரிமோட்டுக்கு ஒரு புதிய கட்டளையை எவ்வாறு சேர்ப்பது என்பதைக் காட்டுகிறது.

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

## வகை விளக்கங்களை விரிவுபடுத்துதல்

TypeScript உடன், WebdriverIO இடைமுகங்களை விரிவுபடுத்துவது எளிது. உங்கள் தனிப்பயன் கட்டளைகளுக்கு இந்த வழியில் வகைகளைச் சேர்க்கவும்:

1. ஒரு வகை விளக்க கோப்பை உருவாக்கவும் (எ.கா., `./src/types/wdio.d.ts`)
2. a. மாடியூல்-ஸ்டைல் வகை விளக்கக் கோப்பைப் பயன்படுத்தினால் (வகை விளக்கக் கோப்பில் import/export மற்றும் `declare global WebdriverIO` பயன்படுத்துதல்), கோப்பு பாதையை `tsconfig.json` `include` பண்பில் சேர்க்க உறுதிசெய்க.

   b. சுற்றுச்சூழல்-ஸ்டைல் வகை விளக்கக் கோப்புகளைப் பயன்படுத்தினால் (வகை விளக்கக் கோப்புகளில் import/export இல்லை மற்றும் தனிப்பயன் கட்டளைகளுக்கு `declare namespace WebdriverIO`), `tsconfig.json` எந்த `include` பிரிவையும் கொண்டிருக்க *வேண்டாம் என்பதை உறுதிப்படுத்தவும், ஏனெனில் இது `include` பிரிவில் பட்டியலிடப்படாத அனைத்து வகை விளக்கக் கோப்புகளை typescript அங்கீகரிக்காமல் இருக்கும்.

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

3. உங்கள் செயல்படுத்தல் முறைக்கு ஏற்ப உங்கள் கட்டளைகளுக்கான விளக்கங்களைச் சேர்க்கவும்.

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

## மூன்றாம் தரப்பு நூலகங்களை ஒருங்கிணைக்க

நீங்கள் வெளிப்புற நூலகங்களைப் பயன்படுத்தினால் (எ.கா., தரவுத்தள அழைப்புகளைச் செய்ய) உறுதிமொழிகளை ஆதரிக்கும், அவற்றை ஒருங்கிணைப்பதற்கான ஒரு நல்ல அணுகுமுறை, சில API முறைகளை ஒரு தனிப்பயன் கட்டளையுடன் மூடுவதாகும்.

உறுதிமொழியைத் திருப்பி அனுப்பும்போது, உறுதிமொழி தீர்க்கப்படும் வரை அடுத்த கட்டளையுடன் தொடரக்கூடாது என்பதை WebdriverIO உறுதி செய்கிறது. உறுதிமொழி நிராகரிக்கப்பட்டால், கட்டளை ஒரு பிழையை எறியும்.

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

**குறிப்பு:** உங்கள் தனிப்பயன் கட்டளையின் முடிவு நீங்கள் திருப்பி அனுப்பும் உறுதிமொழியின் முடிவு.

## கட்டளைகளை மேலெழுதுதல்

நீங்கள் `overwriteCommand` உடன் உள்ளார்ந்த கட்டளைகளையும் மேலெழுதலாம்.

இது கட்டமைப்பின் கணிக்கமுடியாத நடத்தைக்கு வழிவகுக்கும் என்பதால், இதைச் செய்ய பரிந்துரைக்கப்படவில்லை!

ஒட்டுமொத்த அணுகுமுறை `addCommand` ஐப் போலவே உள்ளது, ஒரே வேறுபாடு கட்டளை செயல்பாட்டில் உள்ள முதல் வாதம் நீங்கள் மேலெழுத இருக்கும் அசல் செயல்பாடு. சில எடுத்துக்காட்டுகளைக் கீழே காணலாம்.

### உலாவி கட்டளைகளை மேலெழுதுதல்

```js
/**
 * print milliseconds before pause and return its value.
 */
// 'pause'            - name of command to be overwritten
// origPauseFunction  - original pause function
browser.overwriteCommand('pause', async (origPauseFunction, ms) => {
    console.log(`sleeping for ${ms}`)
    await origPauseFunction(ms)
    return ms
})

// then use it as before
console.log(`was sleeping for ${await browser.pause(1000)}`)
```

### உறுப்பு கட்டளைகளை மேலெழுதுதல்

உறுப்பு நிலையில் கட்டளைகளை மேலெழுதுவது கிட்டத்தட்ட ஒரே மாதிரியானது. `overwriteCommand` க்கு மூன்றாவது வாதமாக `true` ஐ அனுப்பவும்:

```js
/**
 * Attempt to scroll to element if it is not clickable.
 * Pass { force: true } to click with JS even if element is not visible or clickable.
 */
// 'click'            - name of command to be overwritten
// origClickFunction  - original click function
browser.overwriteCommand('click', async function (origClickFunction, { force = false } = {}) {
    if (!force) {
        try {
            // attempt to click
            await origClickFunction()
            return null
        } catch (err) {
            if (err.message.includes('not clickable at point')) {
                console.warn('WARN: Element', this.selector, 'is not clickable.',
                    'Scrolling to it before clicking again.')

                // scroll to element and click again
                await this.scrollIntoView()
                return origClickFunction()
            }
            throw err
        }
    }

    // clicking with js
    console.warn('WARN: Using force click for', this.selector)
    await browser.execute((el) => {
        el.click()
    }, this)
}, true) // don't forget to pass `true` as 3rd argument

// then use it as before
const elem = await $('body')
await elem.click()

// or pass params
await elem.click({ force: true })
```

## மேலும் WebDriver கட்டளைகளைச் சேர்க்கவும்

நீங்கள் WebDriver நெறிமுறையைப் பயன்படுத்தி, [`@wdio/protocols`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-protocols/src/protocols) இல் உள்ள எந்த நெறிமுறை விளக்கங்களாலும் வரையறுக்கப்படாத கூடுதல் கட்டளைகளை ஆதரிக்கும் ஒரு தளத்தில் சோதனைகளை இயக்கினால், நீங்கள் கைமுறையாக `addCommand` இடைமுகம் மூலம் அவற்றைச் சேர்க்கலாம். `webdriver` தொகுப்பு ஒரு கட்டளை மூடுபொதியை வழங்குகிறது, இது இந்த புதிய முடிவுப்புள்ளிகளை பிற கட்டளைகள் போலவே, அதே அளவுரு சரிபார்ப்புகள் மற்றும் பிழை கையாளுதலை வழங்குவதன் மூலம் பதிவு செய்ய அனுமதிக்கிறது. இந்த புதிய முடிவுப்புள்ளியைப் பதிவு செய்ய, கட்டளை மூடுபொதியை இறக்குமதி செய்து பின்வருமாறு ஒரு புதிய கட்டளையைப் பதிவு செய்யவும்:

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

இந்த கட்டளையை தவறான அளவுருக்களுடன் அழைப்பது முன்வரையறுக்கப்பட்ட நெறிமுறை கட்டளைகள் போலவே பிழை கையாளுதலுக்கு வழிவகுக்கிறது, எ.கா.:

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

கட்டளையை சரியாக அழைப்பது, எ.கா. `browser.myNewCommand('foo', 'bar')`, சரியாக `http://localhost:4444/session/7bae3c4c55c3bf82f54894ddc83c5f31/foobar/foo` போன்ற WebDriver கோரிக்கையை `{ foo: 'bar' }` போன்ற payload உடன் அனுப்புகிறது.

:::குறிப்பு
`:sessionId` url அளவுரு WebDriver அமர்வின் அமர்வு அடையாளத்துடன் தானாகவே மாற்றப்படும். பிற url அளவுருக்களை பயன்படுத்தலாம், ஆனால் `variables` இல் வரையறுக்கப்பட வேண்டும்.
:::

நெறிமுறை கட்டளைகளை எவ்வாறு வரையறுக்கலாம் என்பதற்கான எடுத்துக்காட்டுகளை [`@wdio/protocols`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-protocols/src/protocols) தொகுப்பில் காணலாம்.