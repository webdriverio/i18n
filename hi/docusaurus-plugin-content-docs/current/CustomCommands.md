---
id: customcommands
title: कस्टम कमांड्स
---

अगर आप `browser` इंस्टेंस को अपने कमांड्स के सेट के साथ विस्तारित करना चाहते हैं, तो browser मेथड `addCommand` आपके लिए उपलब्ध है। आप अपने कमांड को एसिंक्रोनस तरीके से लिख सकते हैं, ठीक वैसे ही जैसे आप अपनी स्पेक्स में लिखते हैं।

## पैरामीटर्स

### कमांड नाम

एक नाम जो कमांड को परिभाषित करता है और ब्राउज़र या एलिमेंट स्कोप से जुड़ा होगा।

टाइप: `String`

### कस्टम फंक्शन

एक फंक्शन जो तब निष्पादित होता है जब कमांड को कॉल किया जाता है। `this` स्कोप या तो [`WebdriverIO.Browser`](/docs/api/browser) या [`WebdriverIO.Element`](/docs/api/element) है, जिस पर निर्भर करता है कि कमांड ब्राउज़र या एलिमेंट स्कोप से जुड़ा है।

टाइप: `Function`

### विकल्प

कस्टम कमांड व्यवहार को संशोधित करने वाले कॉन्फ़िगरेशन विकल्पों के साथ ऑब्जेक्ट

#### लक्ष्य स्कोप

कमांड को ब्राउज़र या एलिमेंट स्कोप से जोड़ने का निर्णय लेने के लिए फ्लैग। यदि `true` पर सेट किया गया है, तो कमांड एक एलिमेंट कमांड होगा।

विकल्प का नाम: `attachToElement`
टाइप: `Boolean`<br />
डिफ़ॉल्ट: `false`

#### implicitWait अक्षम करें

कस्टम कमांड को कॉल करने से पहले एलिमेंट के अस्तित्व के लिए अंतर्निहित रूप से इंतजार करने का निर्णय लेने के लिए फ्लैग।

विकल्प का नाम: `disableElementImplicitWait`
टाइप: `Boolean`<br />
डिफ़ॉल्ट: `false`

## उदाहरण

यह उदाहरण दिखाता है कि एक नया कमांड कैसे जोड़ें जो वर्तमान URL और शीर्षक को एक परिणाम के रूप में लौटाता है। स्कोप (`this`) एक [`WebdriverIO.Browser`](/docs/api/browser) ऑब्जेक्ट है।

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

इसके अतिरिक्त, आप एलिमेंट इंस्टेंस को अपने कमांड्स के सेट के साथ विस्तारित कर सकते हैं, अंतिम आर्गुमेंट के रूप में `true` पास करके। इस मामले में स्कोप (`this`) एक [`WebdriverIO.Element`](/docs/api/element) ऑब्जेक्ट है।

```js
browser.addCommand("waitAndClick", async function () {
    // `this` is return value of $(selector)
    await this.waitForDisplayed()
    await this.click()
}, { attachToElement: true })
```

डिफॉल्ट रूप से, एलिमेंट कस्टम कमांड्स कस्टम कमांड को कॉल करने से पहले एलिमेंट के अस्तित्व के लिए प्रतीक्षा करते हैं। हालांकि अधिकांश समय यह वांछित होता है, अगर नहीं, तो इसे `disableImplicitWait` के साथ अक्षम किया जा सकता है:

```js
browser.addCommand("waitAndClick", async function () {
    // `this` is return value of $(selector)
    await this.waitForExists()
    await this.click()
}, { attachToElement: true, disableElementImplicitWait: true })
```


कस्टम कमांड्स आपको एक विशिष्ट अनुक्रम के कमांड्स को एक साथ बांधने का अवसर देते हैं जिन्हें आप अक्सर एक कॉल के रूप में उपयोग करते हैं। आप अपने टेस्ट सूट में किसी भी बिंदु पर कस्टम कमांड्स को परिभाषित कर सकते हैं; बस सुनिश्चित करें कि कमांड इसके पहले उपयोग से *पहले* परिभाषित किया गया है। (आपके `wdio.conf.js` में `before` हुक उन्हें बनाने के लिए एक अच्छी जगह है।)

एक बार परिभाषित होने के बाद, आप उन्हें निम्न प्रकार से उपयोग कर सकते हैं:

```js
it('should use my custom command', async () => {
    await browser.url('http://www.github.com')
    const result = await browser.getUrlAndTitle('foobar')

    assert.strictEqual(result.url, 'https://github.com/')
    assert.strictEqual(result.title, 'GitHub · Where software is built')
    assert.strictEqual(result.customVar, 'foobar')
})
```

__नोट:__ अगर आप `browser` स्कोप के लिए कस्टम कमांड रजिस्टर करते हैं, तो कमांड एलिमेंट्स के लिए सुलभ नहीं होगा। इसी तरह, अगर आप एलिमेंट स्कोप के लिए कमांड रजिस्टर करते हैं, तो वह `browser` स्कोप में सुलभ नहीं होगा:

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

__नोट:__ अगर आपको कस्टम कमांड को चेन करने की आवश्यकता है, तो कमांड को `$` से समाप्त होना चाहिए,

```js
browser.addCommand("user$", (locator) => { return ele })
browser.addCommand("user$", (locator) => { return ele }, { attachToElement: true })
await browser.user$('foo').user$('bar').click()
```

`browser` स्कोप को बहुत अधिक कस्टम कमांड्स के साथ ओवरलोड करने से सावधान रहें।

हम [पेज ऑब्जेक्ट्स](pageobjects) में कस्टम लॉजिक को परिभाषित करने की सिफारिश करते हैं, ताकि वे किसी विशिष्ट पेज से जुड़े हों।

### मल्टीरिमोट

`addCommand` मल्टीरिमोट के लिए समान तरीके से काम करता है, सिवाय इसके कि नया कमांड बच्चे इंस्टेंसेज तक प्रचारित होगा। आपको `this` ऑब्जेक्ट का उपयोग करते समय सावधान रहना होगा क्योंकि मल्टीरिमोट `browser` और इसके बच्चे इंस्टेंसेज के पास अलग-अलग `this` हैं।

यह उदाहरण दिखाता है कि मल्टीरिमोट के लिए नया कमांड कैसे जोड़ें।

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

## टाइप डेफिनिशन का विस्तार

TypeScript के साथ, WebdriverIO इंटरफेस का विस्तार करना आसान है। अपने कस्टम कमांड्स के लिए इस प्रकार टाइप जोड़ें:

1. एक टाइप डेफिनिशन फाइल बनाएं (जैसे, `./src/types/wdio.d.ts`)
2. a. अगर मॉड्यूल-स्टाइल टाइप डेफिनिशन फाइल का उपयोग कर रहे हैं (टाइप डेफिनिशन फाइल में import/export और `declare global WebdriverIO` का उपयोग करना), सुनिश्चित करें कि फाइल पथ `tsconfig.json` के `include` प्रॉपर्टी में शामिल है।

   b. अगर एम्बिएंट-स्टाइल टाइप डेफिनिशन फाइल का उपयोग कर रहे हैं (टाइप डेफिनिशन फाइल में कोई import/export नहीं और कस्टम कमांड्स के लिए `declare namespace WebdriverIO`), सुनिश्चित करें कि `tsconfig.json` में कोई `include` सेक्शन *नहीं* है, क्योंकि यह सभी टाइप डेफिनिशन फाइलों को `include` सेक्शन में सूचीबद्ध न होने पर TypeScript द्वारा पहचाना नहीं जाएगा।

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

3. अपने कमांड्स के लिए अपने एक्जीक्यूशन मोड के अनुसार डेफिनिशन जोड़ें।

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

## थर्ड पार्टी लाइब्रेरी को एकीकृत करना

अगर आप बाहरी लाइब्रेरी का उपयोग करते हैं (जैसे, डेटाबेस कॉल करने के लिए) जो प्रॉमिस का समर्थन करती हैं, तो उन्हें एकीकृत करने का एक अच्छा तरीका कुछ API मेथड्स को एक कस्टम कमांड के साथ रैप करना है।

प्रॉमिस को रिटर्न करते समय, WebdriverIO यह सुनिश्चित करता है कि यह अगले कमांड के साथ तब तक आगे नहीं बढ़ता जब तक प्रॉमिस हल नहीं हो जाती। अगर प्रॉमिस अस्वीकार हो जाती है, तो कमांड एक त्रुटि फेंकेगा।

```js
browser.addCommand('makeRequest', async (url) => {
    const response = await fetch(url)
    return await response.json()
})
```

फिर, बस इसे अपनी WDIO टेस्ट स्पेक्स में उपयोग करें:

```js
it('execute external library in a sync way', async () => {
    await browser.url('...')
    const body = await browser.makeRequest('http://...')
    console.log(body) // returns response body
})
```

**नोट:** आपके कस्टम कमांड का परिणाम आपके द्वारा लौटाए गए प्रॉमिस का परिणाम है।

## कमांड्स को ओवरराइटिंग करना

आप `overwriteCommand` के साथ मूल कमांड्स को भी ओवरराइट कर सकते हैं।

ऐसा करने की सिफारिश नहीं की जाती है, क्योंकि इससे फ्रेमवर्क के अप्रत्याशित व्यवहार हो सकते हैं!

समग्र दृष्टिकोण `addCommand` के समान है, केवल अंतर यह है कि कमांड फंक्शन में पहला आर्गुमेंट मूल फंक्शन है जिसे आप ओवरराइट करने वाले हैं। कृपया नीचे कुछ उदाहरण देखें।

### ब्राउज़र कमांड्स को ओवरराइटिंग करना

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

### एलिमेंट कमांड्स को ओवरराइटिंग करना

एलिमेंट स्तर पर कमांड्स को ओवरराइट करना लगभग समान है। बस `overwriteCommand` को तीसरे आर्गुमेंट के रूप में `true` पास करें:

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

## और WebDriver कमांड्स जोड़ें

अगर आप WebDriver प्रोटोकॉल का उपयोग कर रहे हैं और ऐसे प्लेटफॉर्म पर टेस्ट चला रहे हैं जो [`@wdio/protocols`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-protocols/src/protocols) में परिभाषित किसी भी प्रोटोकॉल डेफिनिशन द्वारा परिभाषित नहीं किए गए अतिरिक्त कमांड्स का समर्थन करता है, तो आप उन्हें मैन्युअल रूप से `addCommand` इंटरफेस के माध्यम से जोड़ सकते हैं। `webdriver` पैकेज एक कमांड रैपर प्रदान करता है जो इन नए एंडपॉइंट्स को उसी तरह से पंजीकृत करने की अनुमति देता है जैसे अन्य कमांड्स, समान पैरामीटर चेक और त्रुटि हैंडलिंग प्रदान करता है। इस नए एंडपॉइंट को पंजीकृत करने के लिए कमांड रैपर आयात करें और इसके साथ एक नया कमांड पंजीकृत करें जैसा कि निम्नानुसार है:

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

इस कमांड को अमान्य पैरामीटर्स के साथ कॉल करने से पूर्व-परिभाषित प्रोटोकॉल कमांड्स के रूप में समान त्रुटि हैंडलिंग होती है, जैसे:

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

कमांड को सही तरीके से कॉल करना, जैसे `browser.myNewCommand('foo', 'bar')`, सही तरीके से WebDriver अनुरोध करता है, उदाहरण के लिए `http://localhost:4444/session/7bae3c4c55c3bf82f54894ddc83c5f31/foobar/foo` जिसमें `{ foo: 'bar' }` जैसा पेलोड होता है।

:::note
`:sessionId` url पैरामीटर स्वचालित रूप से WebDriver सत्र के सत्र ID के साथ प्रतिस्थापित किया जाएगा। अन्य url पैरामीटर लागू किए जा सकते हैं लेकिन उन्हें `variables` के भीतर परिभाषित करने की आवश्यकता है।
:::

देखें कि प्रोटोकॉल कमांड्स को [`@wdio/protocols`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-protocols/src/protocols) पैकेज में कैसे परिभाषित किया जा सकता है।