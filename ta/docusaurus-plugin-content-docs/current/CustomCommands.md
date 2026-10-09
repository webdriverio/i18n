---
id: customcommands
title: தனிப்பயன் கட்டளைகள்
description: "addCommand மூலம் உங்கள் சொந்த browser மற்றும் element கட்டளைகளைச் சேர்க்கவும், ஏற்கனவே உள்ள கட்டளைகளை மேலெழுதவும், TypeScript வகை வரையறைகளை நீட்டிக்கவும்."
---

`browser` instance-ஐ உங்கள் சொந்த கட்டளைகளுடன் நீட்டிக்க விரும்பினால், `addCommand` என்ற browser method அதற்கு உதவும். உங்கள் specs-இல் எழுதுவது போலவே, உங்கள் கட்டளையையும் asynchronous முறையில் எழுதலாம்.

## அளவுருக்கள்

### கட்டளையின் பெயர்

<Option type="String">

கட்டளையை வரையறுக்கும் பெயர். இது browser அல்லது element scope-உடன் இணைக்கப்படும்.

</Option>

### தனிப்பயன் செயல்பாடு

<Option type="Function">

கட்டளை அழைக்கப்படும்போது இயக்கப்படும் செயல்பாடு. கட்டளை browser-உடனா, elements-உடனா அல்லது browsing contexts-உடனா இணைக்கப்படுகிறது என்பதைப் பொறுத்து, `this` scope ஆனது [`WebdriverIO.Browser`](/docs/api/browser), [`WebdriverIO.Element`](/docs/api/element) அல்லது `WebdriverIO.BrowsingContext` ஆக இருக்கும்.

</Option>

### விருப்பங்கள்

தனிப்பயன் கட்டளையின் நடத்தையை மாற்றும் உள்ளமைவு விருப்பங்களைக் கொண்ட object

#### இலக்கு Scope

<Option type="Boolean" default="false" name="attachToElement">

கட்டளையை browser scope-உடனா அல்லது element scope-உடனா இணைப்பது என்பதைத் தீர்மானிக்கும் flag. `true` என அமைக்கப்பட்டால், அந்தக் கட்டளை ஒரு element கட்டளையாக இருக்கும்.

</Option>

<Option type="Boolean" default="false" name="attachToBrowsingContext">

ஒரு WebDriver BiDi session-இல் `browser.url()`, `browser.newWindow()`, `browser.browsingContexts()` மற்றும் `context.frame()` திருப்பி அனுப்பும் tabs, windows மற்றும் frames ஆகிய ஒவ்வொரு browsing context-உடனும் கட்டளையை இணைப்பதற்கான flag. இதை `attachToElement` உடன் சேர்த்துப் பயன்படுத்த முடியாது. [உலாவல் சூழல்கள்](#browsing-contexts) பகுதியைப் பார்க்கவும்.

</Option>

#### implicitWait-ஐ முடக்குதல்

<Option type="Boolean" default="false" name="disableElementImplicitWait">

தனிப்பயன் கட்டளையை அழைப்பதற்கு முன், element இருப்பதற்காக மறைமுகமாகக் காத்திருக்க வேண்டுமா என்பதைத் தீர்மானிக்கும் flag.

</Option>

## எடுத்துக்காட்டுகள்

தற்போதைய URL மற்றும் title-ஐ ஒரே முடிவாகத் திருப்பி அனுப்பும் புதிய கட்டளையை எவ்வாறு சேர்ப்பது என்பதை இந்த எடுத்துக்காட்டு காட்டுகிறது. இதில் scope (`this`) ஒரு [`WebdriverIO.Browser`](/docs/api/browser) object ஆகும்.

```js
browser.addCommand('getUrlAndTitle', async function (customVar) {
    // `this` என்பது `browser` scope-ஐக் குறிக்கிறது
    return {
        url: await this.getUrl(),
        title: await this.getTitle(),
        customVar: customVar
    }
})
```

மேலும், `attachToElement`-ஐ `true` என அமைப்பதன் மூலம் element instance-ஐயும் உங்கள் சொந்த கட்டளைகளுடன் நீட்டிக்கலாம். இந்நிலையில் scope (`this`) ஒரு [`WebdriverIO.Element`](/docs/api/element) object ஆகும்.

```js
browser.addCommand("waitAndClick", async function () {
    // `this` என்பது $(selector)-இன் return value ஆகும்
    await this.waitForDisplayed()
    await this.click()
}, { attachToElement: true })
```

இயல்பாக, element தனிப்பயன் கட்டளைகள், தனிப்பயன் கட்டளையை அழைப்பதற்கு முன் element இருப்பதற்காகக் காத்திருக்கும். பெரும்பாலான நேரங்களில் இது விரும்பத்தக்கதுதான் என்றாலும், தேவையில்லையெனில் `disableImplicitWait` மூலம் இதை முடக்கலாம்:

```js
browser.addCommand("waitAndClick", async function () {
    // `this` என்பது $(selector)-இன் return value ஆகும்
    await this.waitForExists()
    await this.click()
}, { attachToElement: true, disableElementImplicitWait: true })
```

நீங்கள் அடிக்கடி பயன்படுத்தும் ஒரு குறிப்பிட்ட கட்டளைத் தொடரை ஒரே அழைப்பாகத் தொகுக்க தனிப்பயன் கட்டளைகள் வாய்ப்பளிக்கின்றன. உங்கள் test suite-இல் எந்த இடத்திலும் தனிப்பயன் கட்டளைகளை வரையறுக்கலாம்; கட்டளை அதன் முதல் பயன்பாட்டுக்கு *முன்பே* வரையறுக்கப்பட்டுள்ளதா என்பதை மட்டும் உறுதிசெய்யுங்கள். (உங்கள் `wdio.conf.js`-இல் உள்ள `before` hook அவற்றை உருவாக்க ஒரு நல்ல இடமாகும்.)

வரையறுக்கப்பட்டதும், அவற்றை இவ்வாறு பயன்படுத்தலாம்:

```js
it('should use my custom command', async () => {
    await browser.url('http://www.github.com')
    const result = await browser.getUrlAndTitle('foobar')

    assert.strictEqual(result.url, 'https://github.com/')
    assert.strictEqual(result.title, 'GitHub · Where software is built')
    assert.strictEqual(result.customVar, 'foobar')
})
```

__குறிப்பு:__ ஒரு தனிப்பயன் கட்டளையை `browser` scope-இல் பதிவுசெய்தால், அந்தக் கட்டளை elements-க்குக் கிடைக்காது. அதேபோல், ஒரு கட்டளையை element scope-இல் பதிவுசெய்தால், அது `browser` scope-இல் கிடைக்காது:

```js
browser.addCommand("myCustomBrowserCommand", () => { return 1 })
const elem = await $('body')
console.log(typeof browser.myCustomBrowserCommand) // "function" என வெளியிடும்
console.log(typeof elem.myCustomBrowserCommand()) // "undefined" என வெளியிடும்

browser.addCommand("myCustomElementCommand", () => { return 1 }, { attachToElement: true })
const elem2 = await $('body')
console.log(typeof browser.myCustomElementCommand) // "undefined" என வெளியிடும்
console.log(await elem2.myCustomElementCommand('foobar')) // "1" என வெளியிடும்

const elem3 = await $('body')
elem3.addCommand("myCustomElementCommand2", () => { return 2 })
console.log(typeof browser.myCustomElementCommand2) // "undefined" என வெளியிடும்
console.log(await elem3.myCustomElementCommand2('foobar')) // "2" என வெளியிடும்
```

__குறிப்பு:__ ஒரு தனிப்பயன் கட்டளையை chain செய்ய வேண்டுமெனில், அந்தக் கட்டளை `$` உடன் முடிய வேண்டும்,

```js
browser.addCommand("user$", (locator) => { return ele })
browser.addCommand("user$", (locator) => { return ele }, { attachToElement: true })
await browser.user$('foo').user$('bar').click()
```

`browser` scope-ஐ அதிகப்படியான தனிப்பயன் கட்டளைகளால் நிரப்பாமல் கவனமாக இருங்கள்.

தனிப்பயன் தர்க்கத்தை [page objects](pageobjects)-இல் வரையறுக்குமாறு பரிந்துரைக்கிறோம், அப்போது அவை ஒரு குறிப்பிட்ட பக்கத்துடன் இணைக்கப்பட்டிருக்கும்.

### உலாவல் சூழல்கள் {#browsing-contexts}

ஒரு WebDriver BiDi session-இல், tab, window மற்றும் frame ஒவ்வொன்றும் ஒரு `WebdriverIO.BrowsingContext` ஆகும். அவை அனைத்திலும் ஒரு கட்டளையைச் சேர்க்க `attachToBrowsingContext`-ஐ `true` என அமைக்கவும். Scope (`this`) என்பது கட்டளை அழைக்கப்பட்ட context ஆகும், மேலும் `this.browser` என்பது அது சார்ந்த browser ஆகும்:

```js
browser.addCommand('heading', async function () {
    // `this` என்பது tab, window அல்லது frame ஆகும்
    return this.$('h1').getText()
}, { attachToBrowsingContext: true })

const page = await browser.url('https://webdriver.io')
console.log(await page.heading())

const frame = await page.frame('iframe')
console.log(await frame.heading())
```

இந்தக் கட்டளை ஏற்கனவே உள்ள contexts-இலும், பின்னர் உருவாக்கப்படும் ஒவ்வொரு context-இலும், வேறு origin-இலிருந்து வரும் frames உட்பட, கிடைக்கும். tab அல்லது window-க்கு மட்டுமே பொருந்தும் ஒரு கட்டளை `this.isFrame`-ஐச் சரிபார்க்கலாம்.

ஒரு browsing context-இலேயே `addCommand` மற்றும் `overwriteCommand`-ஐ அழைத்தால் பிழை ஏற்படும். கட்டளையை browser-இல் பதிவுசெய்யவும்.

### Multi-remote

Multi-remote-க்கும் `addCommand` இதே போன்று செயல்படுகிறது, ஆனால் புதிய கட்டளை child instances-க்கும் பரவும். Multi-remote `browser` மற்றும் அதன் child instances வெவ்வேறு `this`-ஐக் கொண்டிருப்பதால், `this` object-ஐப் பயன்படுத்தும்போது கவனமாக இருக்க வேண்டும்.

Multi-remote-க்கு புதிய கட்டளையை எவ்வாறு சேர்ப்பது என்பதை இந்த எடுத்துக்காட்டு காட்டுகிறது.

```js
import { multiRemoteBrowser } from '@wdio/globals'

multiRemoteBrowser.addCommand('getUrlAndTitle', async function (this: WebdriverIO.MultiRemoteBrowser, customVar: any) {
    // `this` குறிப்பது:
    //      - browser-க்கு MultiRemoteBrowser scope
    //      - instances-க்கு Browser scope
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

## வகை வரையறைகளை நீட்டித்தல்

TypeScript மூலம் WebdriverIO interfaces-ஐ எளிதாக நீட்டிக்கலாம். உங்கள் தனிப்பயன் கட்டளைகளுக்கு இவ்வாறு வகைகளைச் சேர்க்கவும்:

1. ஒரு வகை வரையறை கோப்பை உருவாக்கவும் (எ.கா., `./src/types/wdio.d.ts`)
2. a. Module-style வகை வரையறை கோப்பைப் பயன்படுத்தினால் (வகை வரையறை கோப்பில் import/export மற்றும் `declare global WebdriverIO` பயன்படுத்துதல்), `tsconfig.json`-இன் `include` property-இல் கோப்பின் பாதையைச் சேர்த்துள்ளதை உறுதிசெய்யவும்.

   b. Ambient-style வகை வரையறை கோப்புகளைப் பயன்படுத்தினால் (வகை வரையறை கோப்புகளில் import/export இல்லாமல், தனிப்பயன் கட்டளைகளுக்கு `declare namespace WebdriverIO` பயன்படுத்துதல்), `tsconfig.json`-இல் எந்த `include` பகுதியும் *இல்லை* என்பதை உறுதிசெய்யவும், ஏனெனில் அவ்வாறு இருந்தால் `include` பகுதியில் பட்டியலிடப்படாத அனைத்து வகை வரையறை கோப்புகளையும் TypeScript அங்கீகரிக்காது.

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

3. உங்கள் execution mode-க்கு ஏற்ப உங்கள் கட்டளைகளுக்கான வரையறைகளைச் சேர்க்கவும்.

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

## மூன்றாம் தரப்பு நூலகங்களை ஒருங்கிணைத்தல்

Promises-ஐ ஆதரிக்கும் வெளிப்புற நூலகங்களை (எ.கா., database அழைப்புகளைச் செய்ய) நீங்கள் பயன்படுத்தினால், அவற்றை ஒருங்கிணைப்பதற்கான ஒரு நல்ல அணுகுமுறை, குறிப்பிட்ட API methods-ஐ ஒரு தனிப்பயன் கட்டளையில் wrap செய்வதாகும்.

Promise-ஐத் திருப்பி அனுப்பும்போது, அந்த promise resolve ஆகும் வரை WebdriverIO அடுத்த கட்டளைக்குச் செல்லாது என்பதை உறுதிசெய்கிறது. Promise reject செய்யப்பட்டால், கட்டளை ஒரு பிழையை எழுப்பும்.

```js
browser.addCommand('makeRequest', async (url) => {
    const response = await fetch(url)
    return await response.json()
})
```

பின்னர், அதை உங்கள் WDIO test specs-இல் பயன்படுத்தவும்:

```js
it('execute external library in a sync way', async () => {
    await browser.url('...')
    const body = await browser.makeRequest('http://...')
    console.log(body) // response body-ஐத் திருப்பி அனுப்பும்
})
```

**குறிப்பு:** உங்கள் தனிப்பயன் கட்டளையின் முடிவு, நீங்கள் திருப்பி அனுப்பும் promise-இன் முடிவாகும்.

## கட்டளைகளை மேலெழுதுதல்

`overwriteCommand` மூலம் native கட்டளைகளையும் மேலெழுதலாம்.

இவ்வாறு செய்வது பரிந்துரைக்கப்படவில்லை, ஏனெனில் இது framework-இன் கணிக்க முடியாத நடத்தைக்கு வழிவகுக்கலாம்!

ஒட்டுமொத்த அணுகுமுறை `addCommand`-ஐப் போன்றதே, ஒரே வித்தியாசம் என்னவென்றால், கட்டளை செயல்பாட்டின் முதல் argument நீங்கள் மேலெழுதப் போகும் அசல் செயல்பாடாகும். கீழே உள்ள சில எடுத்துக்காட்டுகளைப் பார்க்கவும்.

### Browser கட்டளைகளை மேலெழுதுதல்

```js
/**
 * pause-க்கு முன் milliseconds-ஐ அச்சிட்டு, அதன் மதிப்பைத் திருப்பி அனுப்பும்.
 *
 * @param pause - மேலெழுதப்பட வேண்டிய கட்டளையின் பெயர்
 * @param this of func - செயல்பாடு அழைக்கப்பட்ட அசல் browser instance
 * @param originalPauseFunction of func - அசல் pause செயல்பாடு
 * @param ms of func - அனுப்பப்பட்ட உண்மையான அளவுருக்கள்
  */
browser.overwriteCommand('pause', async function (this, originalPauseFunction, ms) {
    console.log(`sleeping for ${ms}`)
    await originalPauseFunction(ms)
    return ms
})

// பின்னர் முன்பு போலவே பயன்படுத்தவும்
console.log(`was sleeping for ${await browser.pause(1000)}`)
```

### Element கட்டளைகளை மேலெழுதுதல்

Element மட்டத்தில் கட்டளைகளை மேலெழுதுவதும் கிட்டத்தட்ட இதே போன்றதுதான். `attachToElement`-ஐ `true` என அமைக்கவும்:

```js
/**
 * Element கிளிக் செய்யக்கூடியதாக இல்லையெனில், அதற்கு scroll செய்ய முயற்சிக்கும்.
 * Element தெரியவில்லை அல்லது கிளிக் செய்யக்கூடியதாக இல்லையென்றாலும் JS மூலம் கிளிக் செய்ய { force: true } அனுப்பவும்.
 * `options?: ClickOptions` மூலம் அசல் செயல்பாட்டின் argument வகையைத் தக்கவைக்கலாம் என்பதைக் காட்டுகிறது
 *
 * @param this of func - அசல் செயல்பாடு அழைக்கப்பட்ட element
 * @param originalClickFunction of func - அசல் pause செயல்பாடு
 * @param options of func - அனுப்பப்பட்ட உண்மையான அளவுருக்கள்
 */
browser.overwriteCommand(
    'click',
    async function (this, originalClickFunction, options?: ClickOptions & { force?: boolean }) {
        const { force, ...restOptions } = options || {}
        if (!force) {
            try {
                // கிளிக் செய்ய முயற்சிக்கவும்
                await originalClickFunction(options)
                return
            } catch (err) {
                if ((err as Error).message.includes('not clickable at point')) {
                    console.warn('WARN: Element', this.selector, 'is not clickable.', 'Scrolling to it before clicking again.')

                    // element-க்கு scroll செய்து மீண்டும் கிளிக் செய்யவும்
                    await this.scrollIntoView()
                    return originalClickFunction(options)
                }
                throw err
            }
        }

        // js மூலம் கிளிக் செய்தல்
        console.warn('WARN: Using force click for', this.selector)
        await browser.execute((el) => {
            el.click()
        }, this)
    },
    { attachToElement: true }, // இதை element-உடன் இணைக்க மறக்காதீர்கள்
)

// பின்னர் முன்பு போலவே பயன்படுத்தவும்
const elem = await $('body')
await elem.click()

// அல்லது params-ஐ அனுப்பவும்
await elem.click({ force: true })
```

### Browsing Context கட்டளைகளை மேலெழுதுதல்

ஒவ்வொரு tab, window மற்றும் frame-இன் உள்ளமைந்த அல்லது தனிப்பயன் கட்டளையை மேலெழுத `attachToBrowsingContext`-ஐ `true` என அமைக்கவும். அசல் கட்டளை, அது அழைக்கப்பட்ட context-உடன் பிணைக்கப்பட்டிருக்கும்:

```js
browser.overwriteCommand('getTitle', async function (this, originalGetTitle) {
    const title = await originalGetTitle()
    return this.isFrame ? `frame: ${title}` : title
}, { attachToBrowsingContext: true })

const page = await browser.url('https://webdriver.io')
const frame = await page.frame('iframe')
console.log(await frame.getTitle()) // "frame: ..."
```

## மேலும் WebDriver கட்டளைகளைச் சேர்த்தல்

நீங்கள் WebDriver protocol-ஐப் பயன்படுத்தி, [`@wdio/protocols`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-protocols/src/protocols)-இல் உள்ள எந்த protocol வரையறைகளிலும் வரையறுக்கப்படாத கூடுதல் கட்டளைகளை ஆதரிக்கும் ஒரு platform-இல் tests-ஐ இயக்கினால், அவற்றை `addCommand` interface மூலம் கைமுறையாகச் சேர்க்கலாம். `webdriver` package ஒரு command wrapper-ஐ வழங்குகிறது, இது இந்தப் புதிய endpoints-ஐ மற்ற கட்டளைகளைப் போலவே பதிவுசெய்ய அனுமதிக்கிறது, மேலும் அதே அளவுரு சரிபார்ப்புகளையும் பிழை கையாளுதலையும் வழங்குகிறது. இந்தப் புதிய endpoint-ஐப் பதிவுசெய்ய, command wrapper-ஐ import செய்து, அதன் மூலம் ஒரு புதிய கட்டளையை பின்வருமாறு பதிவுசெய்யவும்:

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

தவறான அளவுருக்களுடன் இந்தக் கட்டளையை அழைத்தால், முன்வரையறுக்கப்பட்ட protocol கட்டளைகளைப் போலவே பிழை கையாளப்படும், எ.கா.:

```js
// தேவையான url அளவுரு மற்றும் payload இல்லாமல் கட்டளையை அழைத்தல்
await browser.myNewCommand()

/**
 * பின்வரும் பிழை ஏற்படும்:
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

கட்டளையைச் சரியாக அழைத்தால், எ.கா. `browser.myNewCommand('foo', 'bar')`, அது `{ foo: 'bar' }` போன்ற payload உடன், எ.கா. `http://localhost:4444/session/7bae3c4c55c3bf82f54894ddc83c5f31/foobar/foo` என்ற முகவரிக்கு ஒரு WebDriver கோரிக்கையைச் சரியாக அனுப்பும்.

:::note
`:sessionId` url அளவுரு, WebDriver session-இன் session id-ஆல் தானாகவே மாற்றப்படும். மற்ற url அளவுருக்களையும் பயன்படுத்தலாம், ஆனால் அவை `variables`-க்குள் வரையறுக்கப்பட வேண்டும்.
:::

Protocol கட்டளைகளை எவ்வாறு வரையறுக்கலாம் என்பதற்கான எடுத்துக்காட்டுகளை [`@wdio/protocols`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-protocols/src/protocols) package-இல் பார்க்கவும்.