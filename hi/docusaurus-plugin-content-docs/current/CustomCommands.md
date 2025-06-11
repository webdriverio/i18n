---
id: customcommands
title: कस्टम कमांड्स
---

यदि आप `browser` इंस्टेंस को अपने कमांड्स के सेट के साथ विस्तारित करना चाहते हैं, तो ब्राउज़र मेथड `addCommand` आपके लिए यहां है। आप अपने कमांड को एसिंक्रोनस तरीके से लिख सकते हैं, ठीक वैसे ही जैसे आप अपने स्पेक्स में करते हैं।

## पैरामीटर्स

### कमांड नाम

एक नाम जो कमांड को परिभाषित करता है और ब्राउज़र या एलिमेंट स्कोप से जुड़ा होगा।

प्रकार: `String`

### कस्टम फंक्शन

एक फंक्शन जो कमांड को कॉल करने पर निष्पादित होता है। `this` स्कोप या तो [`WebdriverIO.Browser`](/docs/api/browser) या [`WebdriverIO.Element`](/docs/api/element) है, जो इस बात पर निर्भर करता है कि कमांड ब्राउज़र स्कोप से जुड़ा है या एलिमेंट स्कोप से।

प्रकार: `Function`

### टारगेट स्कोप

यह फ्लैग यह तय करता है कि कमांड को ब्राउज़र स्कोप से जोड़ना है या एलिमेंट स्कोप से। यदि `true` पर सेट किया गया है, तो कमांड एक एलिमेंट कमांड होगा।

प्रकार: `Boolean`<br />
डिफ़ॉल्ट: `false`

## उदाहरण

यह उदाहरण दिखाता है कि कैसे एक नया कमांड जोड़ें जो वर्तमान URL और शीर्षक को एक ही परिणाम के रूप में वापस करता है। स्कोप (`this`) एक [`WebdriverIO.Browser`](/docs/api/browser) ऑब्जेक्ट है।

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

इसके अतिरिक्त, आप एलिमेंट इंस्टेंस को अपने कमांड्स के सेट के साथ विस्तारित कर सकते हैं, अंतिम आर्गुमेंट के रूप में `true` पास करके। इस स्थिति में स्कोप (`this`) एक [`WebdriverIO.Element`](/docs/api/element) ऑब्जेक्ट है।

```js
browser.addCommand("waitAndClick", async function () {
    // `this` is return value of $(selector)
    await this.waitForDisplayed()
    await this.click()
}, true)
```

कस्टम कमांड्स आपको एक विशिष्ट अनुक्रम के कमांड्स को बंडल करने का अवसर देते हैं जिन्हें आप अक्सर एक ही कॉल के रूप में उपयोग करते हैं। आप अपने टेस्ट सूट में किसी भी बिंदु पर कस्टम कमांड्स को परिभाषित कर सकते हैं; बस यह सुनिश्चित करें कि कमांड को उसके पहले उपयोग से *पहले* परिभाषित किया गया है। (आपके `wdio.conf.js` में `before` हुक उन्हें बनाने के लिए एक अच्छी जगह है।)

एक बार परिभाषित होने के बाद, आप उन्हें निम्नानुसार उपयोग कर सकते हैं:

```js
it('should use my custom command', async () => {
    await browser.url('http://www.github.com')
    const result = await browser.getUrlAndTitle('foobar')

    assert.strictEqual(result.url, 'https://github.com/')
    assert.strictEqual(result.title, 'GitHub · Where software is built')
    assert.strictEqual(result.customVar, 'foobar')
})
```

__नोट:__ यदि आप `browser` स्कोप के लिए एक कस्टम कमांड रजिस्टर करते हैं, तो कमांड एलिमेंट्स के लिए एक्सेसिबल नहीं होगा। इसी तरह, यदि आप एलिमेंट स्कोप के लिए एक कमांड रजिस्टर करते हैं, तो यह `browser` स्कोप में एक्सेसिबल नहीं होगा:

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

__नोट:__ यदि आपको एक कस्टम कमांड को चेन करने की आवश्यकता है, तो कमांड को `$` के साथ समाप्त होना चाहिए,

```js
browser.addCommand("user$", (locator) => { return ele })
browser.addCommand("user$", (locator) => { return ele }, true)
await browser.user$('foo').user$('bar').click()
```

`browser` स्कोप को बहुत अधिक कस्टम कमांड्स के साथ ओवरलोड न करने के लिए सावधान रहें।

हम [पेज ऑब्जेक्ट्स](pageobjects) में कस्टम लॉजिक को परिभाषित करने की सलाह देते हैं, ताकि वे एक विशिष्ट पेज से बंधे हों।

### मल्टीरिमोट

`addCommand` मल्टीरिमोट के लिए इसी तरह से काम करता है, सिवाय इसके कि नया कमांड चाइल्ड इंस्टेंस तक प्रसारित होगा। आपको `this` ऑब्जेक्ट का उपयोग करते समय सावधान रहना होगा क्योंकि मल्टीरिमोट `browser` और उसके चाइल्ड इंस्टेंस के अलग-अलग `this` होते हैं।

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

टाइपस्क्रिप्ट के साथ, WebdriverIO इंटरफेस का विस्तार करना आसान है। अपने कस्टम कमांड्स के लिए टाइप्स इस प्रकार जोड़ें:

1. एक टाइप डेफिनिशन फाइल बनाएं (उदाहरण के लिए, `./src/types/wdio.d.ts`)
2. a. यदि मॉड्यूल-स्टाइल टाइप डेफिनिशन फाइल का उपयोग कर रहे हैं (टाइप डेफिनिशन फाइल में import/export और `declare global WebdriverIO` का उपयोग कर रहे हैं), तो सुनिश्चित करें कि फाइल पाथ को `tsconfig.json` `include` प्रॉपर्टी में शामिल किया गया है।

   b. यदि एम्बिएंट-स्टाइल टाइप डेफिनिशन फाइल्स का उपयोग कर रहे हैं (टाइप डेफिनिशन फाइल्स में कोई import/export नहीं और कस्टम कमांड्स के लिए `declare namespace WebdriverIO`), तो सुनिश्चित करें कि `tsconfig.json` में कोई `include` सेक्शन *नहीं* है, क्योंकि इससे `include` सेक्शन में सूचीबद्ध नहीं की गई सभी टाइप डेफिनिशन फाइल्स को टाइपस्क्रिप्ट द्वारा पहचाना नहीं जाएगा।

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

3. अपने एक्जीक्यूशन मोड के अनुसार अपने कमांड्स के लिए डेफिनिशन जोड़ें।

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

## तृतीय पक्ष लाइब्रेरी को एकीकृत करना

यदि आप बाहरी लाइब्रेरी का उपयोग करते हैं (जैसे, डेटाबेस कॉल करने के लिए) जो प्रॉमिस का समर्थन करती हैं, तो उन्हें एकीकृत करने के लिए एक अच्छा दृष्टिकोण कुछ API मेथड्स को एक कस्टम कमांड के साथ रैप करना है।

प्रॉमिस को रिटर्न करते समय, WebdriverIO यह सुनिश्चित करता है कि यह अगले कमांड के साथ तब तक नहीं बढ़ता है जब तक कि प्रॉमिस हल नहीं हो जाता। यदि प्रॉमिस अस्वीकार हो जाता है, तो कमांड एक त्रुटि फेंकेगा।

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

ऐसा करने की सिफारिश नहीं की जाती है, क्योंकि इससे फ्रेमवर्क का अप्रत्याशित व्यवहार हो सकता है!

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

एलिमेंट स्तर पर कमांड्स को ओवरराइट करना लगभग समान है। बस `overwriteCommand` के तीसरे आर्गुमेंट के रूप में `true` पास करें:

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

## अधिक WebDriver कमांड्स जोड़ें

यदि आप WebDriver प्रोटोकॉल का उपयोग कर रहे हैं और ऐसे प्लेटफॉर्म पर टेस्ट चला रहे हैं जो अतिरिक्त कमांड्स का समर्थन करता है जो [`@wdio/protocols`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-protocols/src/protocols) में किसी भी प्रोटोकॉल परिभाषा द्वारा परिभाषित नहीं किए गए हैं, तो आप मैन्युअल रूप से उन्हें `addCommand` इंटरफेस के माध्यम से जोड़ सकते हैं। `webdriver` पैकेज एक कमांड रैपर प्रदान करता है जो इन नए एंडपॉइंट्स को उसी तरह से पंजीकृत करने की अनुमति देता है जैसे अन्य कमांड्स, जो समान पैरामीटर चेक और त्रुटि हैंडलिंग प्रदान करता है। इस नए एंडपॉइंट को पंजीकृत करने के लिए कमांड रैपर को इम्पोर्ट करें और उसके साथ निम्नानुसार एक नया कमांड पंजीकृत करें:

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

अमान्य पैरामीटर्स के साथ इस कमांड को कॉल करने से पूर्वनिर्धारित प्रोटोकॉल कमांड्स के समान त्रुटि हैंडलिंग होती है, उदाहरण के लिए:

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

कमांड को सही ढंग से कॉल करने पर, जैसे `browser.myNewCommand('foo', 'bar')`, सही ढंग से एक WebDriver अनुरोध उदाहरण के लिए `http://localhost:4444/session/7bae3c4c55c3bf82f54894ddc83c5f31/foobar/foo` पर पेलोड जैसे `{ foo: 'bar' }` के साथ करता है।

:::note
`:sessionId` url पैरामीटर स्वचालित रूप से WebDriver सत्र के सत्र आईडी से प्रतिस्थापित किया जाएगा। अन्य url पैरामीटर लागू किए जा सकते हैं लेकिन उन्हें `variables` के भीतर परिभाषित करने की आवश्यकता है।
:::

[`@wdio/protocols`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-protocols/src/protocols) पैकेज में प्रोटोकॉल कमांड्स को कैसे परिभाषित किया जा सकता है, इसके उदाहरण देखें।