---
id: customcommands
title: தனிப்பயன் கட்டளைகள்
---

நீங்கள் `browser` இன்ஸ்டன்ஸை உங்கள் சொந்த கட்டளைகளின் தொகுப்புடன் விரிவுபடுத்த விரும்பினால், பிரௌசரின் `addCommand` முறை உங்களுக்காக இங்கே உள்ளது. உங்கள் ஸ்பெக்ஸில் உள்ளது போலவே, நீங்கள் உங்கள் கட்டளையை ஒரு ஒத்திசைவற்ற முறையில் எழுதலாம்.

## அளவுருக்கள்

### கட்டளை பெயர்

கட்டளையை வரையறுக்கும் மற்றும் பிரௌசர் அல்லது எலிமென்ட் வரம்பில் இணைக்கப்படும் பெயர்.

வகை: `String`

### தனிப்பயன் செயல்பாடு

கட்டளை அழைக்கப்படும்போது செயல்படுத்தப்படும் ஒரு செயல்பாடு. `this` வரம்பு கட்டளை பிரௌசர் அல்லது எலிமென்ட் வரம்பில் இணைக்கப்பட்டுள்ளதா என்பதைப் பொறுத்து [`WebdriverIO.Browser`](/docs/api/browser) அல்லது [`WebdriverIO.Element`](/docs/api/element) ஆகும்.

வகை: `Function`

### விருப்பங்கள்

தனிப்பயன் கட்டளை நடத்தையை மாற்றும் கட்டமைப்பு விருப்பங்களுடன் ஆப்ஜெக்ட்

#### இலக்கு வரம்பு

கட்டளையை பிரௌசர் அல்லது எலிமென்ட் வரம்பில் இணைக்க வேண்டுமா என்பதைத் தீர்மானிக்க கொடி. `true` என அமைக்கப்பட்டால், கட்டளை ஒரு எலிமென்ட் கட்டளையாக இருக்கும்.

விருப்ப பெயர்: `attachToElement`
வகை: `Boolean`<br />
இயல்புநிலை: `false`

#### implicitWait ஐ முடக்கு

தனிப்பயன் கட்டளையை அழைப்பதற்கு முன் எலிமென்ட் இருக்குமா என மறைமுகமாக காத்திருக்கலாமா என்பதைத் தீர்மானிக்க கொடி.

விருப்ப பெயர்: `disableElementImplicitWait`
வகை: `Boolean`<br />
இயல்புநிலை: `false`

## எடுத்துக்காட்டுகள்

இந்த எடுத்துக்காட்டு தற்போதைய URL மற்றும் தலைப்பை ஒரே முடிவாக திரும்ப அனுப்பும் ஒரு புதிய கட்டளையை எவ்வாறு சேர்ப்பது என்பதைக் காட்டுகிறது. வரம்பு (`this`) என்பது [`WebdriverIO.Browser`](/docs/api/browser) ஆப்ஜெக்ட் ஆகும்.

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

கூடுதலாக, இறுதி ஆர்குமென்டாக `true` ஐ அனுப்புவதன் மூலம், நீங்கள் எலிமென்ட் இன்ஸ்டன்ஸை உங்கள் சொந்த கட்டளைகளின் தொகுப்புடன் விரிவுபடுத்தலாம். இந்த நிலையில் வரம்பு (`this`) என்பது [`WebdriverIO.Element`](/docs/api/element) ஆப்ஜெக்ட் ஆகும்.

```js
browser.addCommand("waitAndClick", async function () {
    // `this` is return value of $(selector)
    await this.waitForDisplayed()
    await this.click()
}, { attachToElement: true })
```

இயல்பாக, எலிமென்ட் தனிப்பயன் கட்டளைகள் தனிப்பயன் கட்டளையை அழைப்பதற்கு முன் எலிமென்ட் இருக்குமா என காத்திருக்கும். பெரும்பாலும் இது விரும்பப்படுகிறது, அவ்வாறு இல்லையெனில், இதை `disableImplicitWait` மூலம் முடக்கலாம்:

```js
browser.addCommand("waitAndClick", async function () {
    // `this` is return value of $(selector)
    await this.waitForExists()
    await this.click()
}, { attachToElement: true, disableElementImplicitWait: true })
```


தனிப்பயன் கட்டளைகள் நீங்கள் அடிக்கடி பயன்படுத்தும் ஒரு குறிப்பிட்ட கட்டளைகளின் வரிசையை ஒற்றை அழைப்பாக பொதியுமாறு வாய்ப்பளிக்கிறது. உங்கள் சோதனை ஸ்வீட்டில் எந்த புள்ளியிலும் தனிப்பயன் கட்டளைகளை வரையறுக்கலாம்; கட்டளை அதன் முதல் பயன்பாட்டிற்கு *முன்* வரையறுக்கப்பட்டுள்ளது என்பதை உறுதிப்படுத்தவும். (உங்கள் `wdio.conf.js` இல் `before` ஹுக் அவற்றை உருவாக்க ஒரு நல்ல இடம்.)

ஒருமுறை வரையறுக்கப்பட்டபின், நீங்கள் அவற்றை பின்வருமாறு பயன்படுத்தலாம்:

```js
it('should use my custom command', async () => {
    await browser.url('http://www.github.com')
    const result = await browser.getUrlAndTitle('foobar')

    assert.strictEqual(result.url, 'https://github.com/')
    assert.strictEqual(result.title, 'GitHub · Where software is built')
    assert.strictEqual(result.customVar, 'foobar')
})
```

__குறிப்பு:__ நீங்கள் `browser` வரம்பில் ஒரு தனிப்பயன் கட்டளையைப் பதிவு செய்தால், அந்த கட்டளை எலிமென்ட்களுக்கு அணுகக்கூடியதாக இருக்காது. அதேபோல், நீங்கள் எலிமென்ட் வரம்பில் ஒரு கட்டளையைப் பதிவு செய்தால், அது `browser` வரம்பில் அணுகக்கூடியதாக இருக்காது:

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

__குறிப்பு:__ நீங்கள் ஒரு தனிப்பயன் கட்டளையை சங்கிலியாக்க வேண்டுமெனில், கட்டளை `$` உடன் முடிய வேண்டும்,

```js
browser.addCommand("user$", (locator) => { return ele })
browser.addCommand("user$", (locator) => { return ele }, { attachToElement: true })
await browser.user$('foo').user$('bar').click()
```

`browser` வரம்பை அதிகமான தனிப்பயன் கட்டளைகளுடன் அதிகப்படுத்துவதில் கவனமாக இருக்கவும்.

தனிப்பயன் தர்க்கத்தை [page objects](pageobjects) இல் வரையறுக்க பரிந்துரைக்கிறோம், எனவே அவை ஒரு குறிப்பிட்ட பக்கத்துடன் பிணைக்கப்படும்.

### மல்டிரிமோட்

`addCommand` மல்டிரிமோட்டுக்கும் ஒரே மாதிரியாக வேலை செய்கிறது, ஆனால் புதிய கட்டளை குழந்தை இன்ஸ்டன்ஸ்களுக்கு பரவும். மல்டிரிமோட் `browser` மற்றும் அதன் குழந்தை இன்ஸ்டன்ஸ்கள் வெவ்வேறு `this` கொண்டுள்ளதால் நீங்கள் `this` ஆப்ஜெக்டைப் பயன்படுத்தும்போது கவனமாக இருக்க வேண்டும்.

இந்த எடுத்துக்காட்டு மல்டிரிமோட்டுக்கு புதிய கட்டளையை எவ்வாறு சேர்ப்பது என்பதைக் காட்டுகிறது.

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

## வகை வரையறைகளை விரிவுபடுத்தவும்

TypeScript உடன், WebdriverIO இடைமுகங்களை விரிவுபடுத்துவது எளிது. உங்கள் தனிப்பயன் கட்டளைகளுக்கு இவ்வாறு வகைகளைச் சேர்க்கவும்:

1. ஒரு வகை வரையறை கோப்பை உருவாக்கவும் (எ.கா., `./src/types/wdio.d.ts`)
2. a. ஒரு தொகுதி-ஸ்டைல் வகை வரையறை கோப்பைப் பயன்படுத்தினால் (import/export மற்றும் வகை வரையறை கோப்பில் `declare global WebdriverIO`), கோப்பு பாதையை `tsconfig.json` `include` பண்பில் சேர்க்கவும்.

   b. ambient-ஸ்டைல் வகை வரையறை கோப்புகளைப் பயன்படுத்தினால் (வகை வரையறை கோப்புகளில் import/export இல்லை மற்றும் தனிப்பயன் கட்டளைகளுக்கு `declare namespace WebdriverIO`), `tsconfig.json` எந்த `include` பிரிவும் கொண்டிருக்க *கூடாது* என்பதை உறுதிப்படுத்தவும், ஏனெனில் இது `include` பிரிவில் பட்டியலிடப்படாத அனைத்து வகை வரையறை கோப்புகளும் TypeScript ஆல் அங்கீகரிக்கப்படாது.

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

3. உங்கள் இயக்க முறைக்கு ஏற்ப உங்கள் கட்டளைகளுக்கான வரையறைகளைச் சேர்க்கவும்.

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

## 3வது தரப்பு நூலகங்களை ஒருங்கிணைக்கவும்

நீங்கள் வெளிப்புற நூலகங்களைப் (எ.கா., டேட்டாபேஸ் அழைப்புகளைச் செய்ய) பயன்படுத்தினால், அவை உறுதிமொழிகளை ஆதரித்தால், சில API முறைகளை தனிப்பயன் கட்டளையுடன் சுற்றுவது ஒரு நல்ல அணுகுமுறையாகும்.

உறுதிமொழியைத் திருப்பி அனுப்பும்போது, அந்த உறுதிமொழி தீர்க்கப்படும் வரை அது அடுத்த கட்டளைக்குச் செல்லாது என்பதை WebdriverIO உறுதி செய்கிறது. உறுதிமொழி நிராகரிக்கப்பட்டால், கட்டளை பிழையை எழுப்பும்.

```js
browser.addCommand('makeRequest', async (url) => {
    const response = await fetch(url)
    return await response.json()
})
```

பின்னர், அதை உங்கள் WDIO சோதனை ஸ்பெக்ஸில் பயன்படுத்தவும்:

```js
it('execute external library in a sync way', async () => {
    await browser.url('...')
    const body = await browser.makeRequest('http://...')
    console.log(body) // returns response body
})
```

**குறிப்பு:** உங்கள் தனிப்பயன் கட்டளையின் முடிவு நீங்கள் திருப்பி அனுப்பும் உறுதிமொழியின் முடிவு ஆகும்.

## கட்டளைகளை மேலெழுதுதல்

நீங்கள் `overwriteCommand` மூலம் இயல்பான கட்டளைகளையும் மேலெழுதலாம்.

இவ்வாறு செய்ய பரிந்துரைக்கப்படவில்லை, ஏனெனில் இது கட்டமைப்பின் கணிக்க முடியாத நடத்தைக்கு வழிவகுக்கலாம்!

ஒட்டுமொத்த அணுகுமுறை `addCommand` போன்றது, ஒரே வேறுபாடு என்னவென்றால், கட்டளை செயல்பாட்டில் உள்ள முதல் ஆர்குமென்ட் நீங்கள் மேலெழுத இருக்கும் அசல் செயல்பாடாகும். கீழே சில எடுத்துக்காட்டுகளைப் பார்க்கவும்.

### பிரௌசர் கட்டளைகளை மேலெழுதுதல்

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

### எலிமென்ட் கட்டளைகளை மேலெழுதுதல்

எலிமென்ட் நிலையில் கட்டளைகளை மேலெழுதுவது கிட்டத்தட்ட ஒரே மாதிரியானது. வெறுமனே மூன்றாவது ஆர்குமென்டாக `overwriteCommand`க்கு `true` ஐ அனுப்பவும்:

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

நீங்கள் WebDriver நெறிமுறையைப் பயன்படுத்தி, [`@wdio/protocols`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-protocols/src/protocols) இல் எந்த நெறிமுறை வரையறைகளாலும் வரையறுக்கப்படாத கூடுதல் கட்டளைகளை ஆதரிக்கும் தளத்தில் சோதனைகளை இயக்கினால், நீங்கள் கைமுறையாக `addCommand` இடைமுகம் மூலம் அவற்றைச் சேர்க்கலாம். `webdriver` பேக்கேஜ் ஒரு கட்டளை ரேப்பரை வழங்குகிறது, இது இந்த புதிய முடிவுப்புள்ளிகளை மற்ற கட்டளைகளைப் போலவே பதிவு செய்ய அனுமதிக்கிறது, அதே அளவுரு சரிபார்ப்புகள் மற்றும் பிழை கையாளுதலை வழங்குகிறது. இந்த புதிய முடிவுப்புள்ளியைப் பதிவுசெய்ய, கட்டளை ரேப்பரை இம்போர்ட் செய்து பின்வருமாறு ஒரு புதிய கட்டளையைப் பதிவு செய்யவும்:

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

இந்த கட்டளையை தவறான அளவுருக்களுடன் அழைப்பது முன் வரையறுக்கப்பட்ட நெறிமுறை கட்டளைகள் போன்ற அதே பிழை கையாளுதலில் முடிகிறது, எ.கா:

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

கட்டளையை சரியாக அழைக்கும்போது, எ.கா. `browser.myNewCommand('foo', 'bar')`, சரியாக உ.ம்.`http://localhost:4444/session/7bae3c4c55c3bf82f54894ddc83c5f31/foobar/foo` க்கு `{ foo: 'bar' }` போன்ற பேலோடுடன் ஒரு WebDriver கோரிக்கையை அனுப்புகிறது.

:::note
`:sessionId` url அளவுரு தானாகவே WebDriver அமர்வின் அமர்வு ஐடியுடன் மாற்றப்படும். மற்ற url அளவுருக்களை பயன்படுத்தலாம் ஆனால் `variables` இல் வரையறுக்கப்பட வேண்டும்.
:::

நெறிமுறை கட்டளைகளை எவ்வாறு வரையறுக்கலாம் என்பதற்கான எடுத்துக்காட்டுகளை [`@wdio/protocols`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-protocols/src/protocols) பேக்கேஜில் காணலாம்.
