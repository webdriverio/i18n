---
id: customcommands
title: कस्टम कमांड्स
---

अगर आप `browser` इंस्टेंस को अपने खुद के कमांड्स के सेट के साथ बढ़ाना चाहते हैं, तो ब्राउज़र मेथड `addCommand` आपके लिए है। आप अपना कमांड एसिंक्रोनस तरीके से लिख सकते हैं, जैसा कि आप अपने स्पेक्स में करते हैं।

## पैरामीटर्स

### कमांड नाम

एक नाम जो कमांड को परिभाषित करता है और ब्राउज़र या एलिमेंट स्कोप से जुड़ा होगा।

प्रकार: `String`

### कस्टम फंक्शन

एक फंक्शन जो कमांड को कॉल करने पर निष्पादित होता है। `this` स्कोप या तो [`WebdriverIO.Browser`](/docs/api/browser) या [`WebdriverIO.Element`](/docs/api/element) है, इस बात पर निर्भर करता है कि कमांड ब्राउज़र स्कोप से जुड़ा है या एलिमेंट स्कोप से।

प्रकार: `Function`

### विकल्प

कस्टम कमांड व्यवहार को संशोधित करने वाले कॉन्फिगरेशन विकल्पों के साथ ऑब्जेक्ट

#### टारगेट स्कोप

यह निर्णय लेने के लिए फ्लैग कि कमांड को ब्राउज़र स्कोप से जोड़ना है या एलिमेंट स्कोप से। अगर `true` पर सेट है तो कमांड एक एलिमेंट कमांड होगा।

ऑप्शन नाम: `attachToElement`
प्रकार: `Boolean`<br />
डिफॉल्ट: `false`

#### implicitWait को अक्षम करें

यह निर्णय लेने के लिए फ्लैग कि कस्टम कमांड को कॉल करने से पहले एलिमेंट के मौजूद होने के लिए इंप्लिसिटली वेट करना है या नहीं।

ऑप्शन नाम: `disableElementImplicitWait`
प्रकार: `Boolean`<br />
डिफॉल्ट: `false`

## उदाहरण

यह उदाहरण दिखाता है कि एक नया कमांड कैसे जोड़ें जो वर्तमान URL और शीर्षक को एक परिणाम के रूप में वापस करता है। स्कोप (`this`) एक [`WebdriverIO.Browser`](/docs/api/browser) ऑब्जेक्ट है।

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

इसके अतिरिक्त, आप एलिमेंट इंस्टेंस को अपने कमांड्स के सेट के साथ बढ़ा सकते हैं, अंतिम आर्गुमेंट के रूप में `true` पास करके। इस मामले में स्कोप (`this`) एक [`WebdriverIO.Element`](/docs/api/element) ऑब्जेक्ट है।

```js
browser.addCommand("waitAndClick", async function () {
    // `this` is return value of $(selector)
    await this.waitForDisplayed()
    await this.click()
}, { attachToElement: true })
```

डिफॉल्ट रूप से, एलिमेंट कस्टम कमांड्स कस्टम कमांड को कॉल करने से पहले एलिमेंट के मौजूद होने का इंतजार करते हैं। हालांकि अधिकांश समय यह वांछित होता है, अगर नहीं, तो इसे `disableImplicitWait` के साथ अक्षम किया जा सकता है:

```js
browser.addCommand("waitAndClick", async function () {
    // `this` is return value of $(selector)
    await this.waitForExists()
    await this.click()
}, { attachToElement: true, disableElementImplicitWait: true })
```


कस्टम कमांड्स आपको विशिष्ट अनुक्रम के कमांड्स को, जिन्हें आप अक्सर उपयोग करते हैं, एक ही कॉल के रूप में बंडल करने का अवसर देते हैं। आप अपनी टेस्ट सुइट में किसी भी बिंदु पर कस्टम कमांड्स को परिभाषित कर सकते हैं; बस यह सुनिश्चित करें कि कमांड को उसके पहले उपयोग से *पहले* परिभाषित किया गया है। (आपके `wdio.conf.js` में `before` हुक उन्हें बनाने के लिए एक अच्छी जगह है।)

एक बार परिभाषित होने के बाद, आप उन्हें इस प्रकार उपयोग कर सकते हैं:

```js
it('should use my custom command', async () => {
    await browser.url('http://www.github.com')
    const result = await browser.getUrlAndTitle('foobar')

    assert.strictEqual(result.url, 'https://github.com/')
    assert.strictEqual(result.title, 'GitHub · Where software is built')
    assert.strictEqual(result.customVar, 'foobar')
})
```

__नोट:__ अगर आप `browser` स्कोप के लिए एक कस्टम कमांड रजिस्टर करते हैं, तो कमांड एलिमेंट्स के लिए उपलब्ध नहीं होगा। इसी तरह, अगर आप एलिमेंट स्कोप के लिए एक कमांड रजिस्टर करते हैं, तो यह `browser` स्कोप में उपलब्ध नहीं होगा:

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

__नोट:__ अगर आपको एक कस्टम कमांड को चेन करने की आवश्यकता है, तो कमांड `$` के साथ समाप्त होना चाहिए,

```js
browser.addCommand("user$", (locator) => { return ele })
browser.addCommand("user$", (locator) => { return ele }, { attachToElement: true })
await browser.user$('foo').user$('bar').click()
```

`browser` स्कोप को बहुत अधिक कस्टम कमांड्स से ओवरलोड न करें।

हम कस्टम लॉजिक को [page objects](pageobjects) में परिभाषित करने की सिफारिश करते हैं, ताकि वे एक विशिष्ट पेज से जुड़े हों।

### मल्टीरिमोट

`addCommand` मल्टीरिमोट के लिए इसी तरह काम करता है, सिवाय इसके कि नया कमांड चिल्ड्रन इंस्टेंसेज में प्रचारित होगा। आपको `this` ऑब्जेक्ट का उपयोग करते समय सावधान रहना होगा क्योंकि मल्टीरिमोट `browser` और उसके चिल्ड्रन इंस्टेंसेज के अलग-अलग `this` होते हैं।

यह उदाहरण दिखाता है कि मल्टीरिमोट के लिए एक नया कमांड कैसे जोड़ें।

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

## टाइप डेफिनिशन का विस्तार

TypeScript के साथ, WebdriverIO इंटरफेसेस का विस्तार करना आसान है। अपने कस्टम कमांड्स में इस प्रकार टाइप्स जोड़ें:

1. एक टाइप डेफिनिशन फाइल बनाएं (उदाहरण के लिए, `./src/types/wdio.d.ts`)
2. a. अगर मॉड्यूल-स्टाइल टाइप डेफिनिशन फाइल का उपयोग कर रहे हैं (टाइप डेफिनिशन फाइल में import/export और `declare global WebdriverIO` का उपयोग करके), फाइल पाथ को `tsconfig.json` `include` प्रॉपर्टी में शामिल करना सुनिश्चित करें।

   b. अगर एम्बिएंट-स्टाइल टाइप डेफिनिशन फाइल्स का उपयोग कर रहे हैं (टाइप डेफिनिशन फाइल्स में कोई import/export नहीं और कस्टम कमांड्स के लिए `declare namespace WebdriverIO`), सुनिश्चित करें कि `tsconfig.json` में कोई `include` सेक्शन नहीं है, क्योंकि इससे `include` सेक्शन में सूचीबद्ध नहीं की गई सभी टाइप डेफिनिशन फाइल्स को TypeScript द्वारा पहचाना नहीं जाएगा।

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

3. अपने एग्जीक्यूशन मोड के अनुसार अपने कमांड्स के लिए डेफिनिशंस जोड़ें।

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

## थर्ड पार्टी लाइब्रेरीज को इंटीग्रेट करें

अगर आप बाहरी लाइब्रेरीज का उपयोग करते हैं (उदाहरण के लिए, डेटाबेस कॉल्स के लिए) जो प्रॉमिसेज का समर्थन करते हैं, तो उन्हें इंटीग्रेट करने का एक अच्छा तरीका कुछ API मेथड्स को एक कस्टम कमांड के साथ रैप करना है।

प्रॉमिस को वापस करते समय, WebdriverIO सुनिश्चित करता है कि यह अगले कमांड के साथ जारी नहीं रखता है जब तक कि प्रॉमिस हल नहीं हो जाता। अगर प्रॉमिस रिजेक्ट हो जाता है, तो कमांड एक एरर थ्रो करेगा।

```js
browser.addCommand('makeRequest', async (url) => {
    const response = await fetch(url)
    return await response.json()
})
```

फिर, इसे अपने WDIO टेस्ट स्पेक्स में उपयोग करें:

```js
it('execute external library in a sync way', async () => {
    await browser.url('...')
    const body = await browser.makeRequest('http://...')
    console.log(body) // returns response body
})
```

**नोट:** आपके कस्टम कमांड का परिणाम उस प्रॉमिस का परिणाम है जिसे आप वापस करते हैं।

## कमांड्स को ओवरराइट करना

आप `overwriteCommand` के साथ नेटिव कमांड्स को भी ओवरराइट कर सकते हैं।

ऐसा करने की सिफारिश नहीं की जाती है, क्योंकि इससे फ्रेमवर्क के अप्रत्याशित व्यवहार हो सकता है!

समग्र दृष्टिकोण `addCommand` के समान है, एकमात्र अंतर यह है कि कमांड फंक्शन में पहला आर्गुमेंट वह मूल फंक्शन है जिसे आप ओवरराइट करने वाले हैं। कृपया नीचे कुछ उदाहरण देखें।

### ब्राउज़र कमांड्स को ओवरराइट करना

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

### एलिमेंट कमांड्स को ओवरराइट करना

एलिमेंट लेवल पर कमांड्स को ओवरराइट करना लगभग वही है। बस `overwriteCommand` के लिए तीसरे आर्गुमेंट के रूप में `true` पास करें:

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

## अधिक WebDriver कमांड्स जोड़ें

अगर आप WebDriver प्रोटोकॉल का उपयोग कर रहे हैं और ऐसे प्लेटफॉर्म पर टेस्ट चला रहे हैं जो [`@wdio/protocols`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-protocols/src/protocols) में परिभाषित किसी भी प्रोटोकॉल डेफिनिशन द्वारा परिभाषित न किए गए अतिरिक्त कमांड्स का समर्थन करता है, तो आप उन्हें `addCommand` इंटरफेस के माध्यम से मैन्युअली जोड़ सकते हैं। `webdriver` पैकेज एक कमांड रैपर प्रदान करता है जो इन नए एंडपॉइंट्स को अन्य कमांड्स के समान तरीके से रजिस्टर करने की अनुमति देता है, समान पैरामीटर चेक और एरर हैंडलिंग प्रदान करता है। इस नए एंडपॉइंट को रजिस्टर करने के लिए कमांड रैपर इम्पोर्ट करें और इसके साथ एक नया कमांड रजिस्टर करें:

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

इस कमांड को अमान्य पैरामीटर्स के साथ कॉल करने से वही एरर हैंडलिंग होती है जो पूर्व-परिभाषित प्रोटोकॉल कमांड्स के लिए होती है, उदाहरण के लिए:

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

कमांड को सही तरीके से कॉल करना, उदाहरण के लिए `browser.myNewCommand('foo', 'bar')`, सही तरीके से WebDriver अनुरोध करता है, उदाहरण के लिए `http://localhost:4444/session/7bae3c4c55c3bf82f54894ddc83c5f31/foobar/foo` को पेलोड के साथ `{ foo: 'bar' }`।

:::note
`:sessionId` url पैरामीटर स्वचालित रूप से WebDriver सत्र के सत्र आईडी के साथ प्रतिस्थापित किया जाएगा। अन्य url पैरामीटर भी लागू किए जा सकते हैं, लेकिन उन्हें `variables` के भीतर परिभाषित करने की आवश्यकता होती है।
:::

[`@wdio/protocols`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-protocols/src/protocols) पैकेज में प्रोटोकॉल कमांड्स को कैसे परिभाषित किया जा सकता है, इसके उदाहरण देखें।