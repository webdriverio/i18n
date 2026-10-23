---
id: customcommands
title: कस्टम कमांड्स
description: "addCommand के साथ अपने स्वयं के ब्राउज़र और एलिमेंट कमांड्स जोड़ें, मौजूदा कमांड्स को ओवरराइट करें और TypeScript टाइप डेफ़िनिशन्स का विस्तार करें।"
---

यदि आप `browser` इंस्टेंस को अपने स्वयं के कमांड्स के सेट के साथ विस्तारित करना चाहते हैं, तो ब्राउज़र मेथड `addCommand` आपके लिए है। आप अपना कमांड एसिंक्रोनस तरीके से लिख सकते हैं, ठीक वैसे ही जैसे आप अपने स्पेक्स में लिखते हैं।

## पैरामीटर्स

### कमांड का नाम

<Option type="String">

एक नाम जो कमांड को परिभाषित करता है और ब्राउज़र या एलिमेंट स्कोप से जोड़ा जाएगा।

</Option>

### कस्टम फ़ंक्शन

<Option type="Function">

एक फ़ंक्शन जो कमांड को कॉल किए जाने पर निष्पादित होता है। `this` स्कोप [`WebdriverIO.Browser`](/docs/api/browser), [`WebdriverIO.Element`](/docs/api/element) या `WebdriverIO.BrowsingContext` होता है, यह इस पर निर्भर करता है कि कमांड ब्राउज़र से, एलिमेंट्स से या ब्राउज़िंग कॉन्टेक्स्ट्स से जोड़ा गया है।

</Option>

### विकल्प

कॉन्फ़िगरेशन विकल्पों वाला ऑब्जेक्ट जो कस्टम कमांड के व्यवहार को संशोधित करता है

#### लक्ष्य स्कोप

<Option type="Boolean" default="false" name="attachToElement">

यह तय करने के लिए फ़्लैग कि कमांड को ब्राउज़र स्कोप से जोड़ा जाए या एलिमेंट स्कोप से। यदि `true` पर सेट किया गया है तो कमांड एक एलिमेंट कमांड होगा।

</Option>

<Option type="Boolean" default="false" name="attachToBrowsingContext">

कमांड को हर ब्राउज़िंग कॉन्टेक्स्ट से जोड़ने के लिए फ़्लैग: वे टैब, विंडो और फ़्रेम जो WebDriver BiDi सेशन में `browser.url()`, `browser.newWindow()`, `browser.browsingContexts()` और `context.frame()` लौटाते हैं। इसे `attachToElement` के साथ संयोजित नहीं किया जा सकता। [ब्राउज़िंग कॉन्टेक्स्ट्स](#browsing-contexts) देखें।

</Option>

#### implicitWait अक्षम करें

<Option type="Boolean" default="false" name="disableElementImplicitWait">

यह तय करने के लिए फ़्लैग कि कस्टम कमांड को कॉल करने से पहले एलिमेंट के मौजूद होने की अप्रत्यक्ष रूप से (implicitly) प्रतीक्षा की जाए या नहीं।

</Option>

## उदाहरण

यह उदाहरण दिखाता है कि एक नया कमांड कैसे जोड़ा जाए जो वर्तमान URL और टाइटल को एक परिणाम के रूप में लौटाता है। स्कोप (`this`) एक [`WebdriverIO.Browser`](/docs/api/browser) ऑब्जेक्ट है।

```js
browser.addCommand('getUrlAndTitle', async function (customVar) {
    // `this` `browser` स्कोप को संदर्भित करता है
    return {
        url: await this.getUrl(),
        title: await this.getTitle(),
        customVar: customVar
    }
})
```

इसके अतिरिक्त, आप `attachToElement` को `true` पर सेट करके एलिमेंट इंस्टेंस को अपने स्वयं के कमांड्स के सेट के साथ विस्तारित कर सकते हैं। इस स्थिति में स्कोप (`this`) एक [`WebdriverIO.Element`](/docs/api/element) ऑब्जेक्ट है।

```js
browser.addCommand("waitAndClick", async function () {
    // `this` $(selector) का रिटर्न वैल्यू है
    await this.waitForDisplayed()
    await this.click()
}, { attachToElement: true })
```

डिफ़ॉल्ट रूप से, एलिमेंट कस्टम कमांड्स कस्टम कमांड को कॉल करने से पहले एलिमेंट के मौजूद होने की प्रतीक्षा करते हैं। भले ही अधिकांश समय यह वांछित हो, यदि नहीं, तो इसे `disableImplicitWait` के साथ अक्षम किया जा सकता है:

```js
browser.addCommand("waitAndClick", async function () {
    // `this` $(selector) का रिटर्न वैल्यू है
    await this.waitForExists()
    await this.click()
}, { attachToElement: true, disableElementImplicitWait: true })
```

कस्टम कमांड्स आपको उन कमांड्स के एक विशिष्ट क्रम को एक ही कॉल के रूप में बंडल करने का अवसर देते हैं जिनका आप अक्सर उपयोग करते हैं। आप अपने टेस्ट सूट में किसी भी बिंदु पर कस्टम कमांड्स परिभाषित कर सकते हैं; बस यह सुनिश्चित करें कि कमांड उसके पहले उपयोग से *पहले* परिभाषित हो। (आपकी `wdio.conf.js` में `before` हुक उन्हें बनाने के लिए एक अच्छी जगह है।)

एक बार परिभाषित हो जाने के बाद, आप उनका उपयोग इस प्रकार कर सकते हैं:

```js
it('should use my custom command', async () => {
    await browser.url('http://www.github.com')
    const result = await browser.getUrlAndTitle('foobar')

    assert.strictEqual(result.url, 'https://github.com/')
    assert.strictEqual(result.title, 'GitHub · Where software is built')
    assert.strictEqual(result.customVar, 'foobar')
})
```

__नोट:__ यदि आप `browser` स्कोप में एक कस्टम कमांड रजिस्टर करते हैं, तो कमांड एलिमेंट्स के लिए सुलभ नहीं होगा। इसी तरह, यदि आप एलिमेंट स्कोप में एक कमांड रजिस्टर करते हैं, तो यह `browser` स्कोप में सुलभ नहीं होगा:

```js
browser.addCommand("myCustomBrowserCommand", () => { return 1 })
const elem = await $('body')
console.log(typeof browser.myCustomBrowserCommand) // "function" आउटपुट करता है
console.log(typeof elem.myCustomBrowserCommand()) // "undefined" आउटपुट करता है

browser.addCommand("myCustomElementCommand", () => { return 1 }, { attachToElement: true })
const elem2 = await $('body')
console.log(typeof browser.myCustomElementCommand) // "undefined" आउटपुट करता है
console.log(await elem2.myCustomElementCommand('foobar')) // "1" आउटपुट करता है

const elem3 = await $('body')
elem3.addCommand("myCustomElementCommand2", () => { return 2 })
console.log(typeof browser.myCustomElementCommand2) // "undefined" आउटपुट करता है
console.log(await elem3.myCustomElementCommand2('foobar')) // "2" आउटपुट करता है
```

__नोट:__ यदि आपको किसी कस्टम कमांड को चेन करने की आवश्यकता है, तो कमांड `$` के साथ समाप्त होना चाहिए,

```js
browser.addCommand("user$", (locator) => { return ele })
browser.addCommand("user$", (locator) => { return ele }, { attachToElement: true })
await browser.user$('foo').user$('bar').click()
```

सावधान रहें कि `browser` स्कोप को बहुत अधिक कस्टम कमांड्स से ओवरलोड न करें।

हम [पेज ऑब्जेक्ट्स](pageobjects) में कस्टम लॉजिक परिभाषित करने की सलाह देते हैं, ताकि वे एक विशिष्ट पेज से बंधे रहें।

### ब्राउज़िंग कॉन्टेक्स्ट्स

WebDriver BiDi सेशन में, एक टैब, एक विंडो और एक फ़्रेम प्रत्येक एक `WebdriverIO.BrowsingContext` है। इन सभी में एक कमांड जोड़ने के लिए `attachToBrowsingContext` को `true` पर सेट करें। स्कोप (`this`) वह कॉन्टेक्स्ट है जिस पर कमांड को कॉल किया गया था, और `this.browser` वह ब्राउज़र है जिससे वह संबंधित है:

```js
browser.addCommand('heading', async function () {
    // `this` टैब, विंडो या फ़्रेम है
    return this.$('h1').getText()
}, { attachToBrowsingContext: true })

const page = await browser.url('https://webdriver.io')
console.log(await page.heading())

const frame = await page.frame('iframe')
console.log(await frame.heading())
```

कमांड उन कॉन्टेक्स्ट्स पर उपलब्ध है जो पहले से मौजूद हैं और बाद में बनाए गए हर कॉन्टेक्स्ट पर भी, जिसमें किसी अन्य ओरिजिन के फ़्रेम भी शामिल हैं। जो कमांड केवल टैब या विंडो के लिए उपयुक्त है, वह `this.isFrame` की जाँच कर सकता है।

किसी ब्राउज़िंग कॉन्टेक्स्ट पर सीधे `addCommand` और `overwriteCommand` कॉल करने पर एरर थ्रो होती है। कमांड को ब्राउज़र पर रजिस्टर करें।

### मल्टी-रिमोट

`addCommand` मल्टी-रिमोट के लिए भी इसी तरह काम करता है, सिवाय इसके कि नया कमांड चाइल्ड इंस्टेंसेस तक प्रसारित होगा। `this` ऑब्जेक्ट का उपयोग करते समय आपको सावधान रहना होगा क्योंकि मल्टी-रिमोट `browser` और उसके चाइल्ड इंस्टेंसेस के `this` अलग-अलग होते हैं।

यह उदाहरण दिखाता है कि मल्टी-रिमोट के लिए एक नया कमांड कैसे जोड़ा जाए।

```js
import { multiRemoteBrowser } from '@wdio/globals'

multiRemoteBrowser.addCommand('getUrlAndTitle', async function (this: WebdriverIO.MultiRemoteBrowser, customVar: any) {
    // `this` संदर्भित करता है:
    //      - ब्राउज़र के लिए MultiRemoteBrowser स्कोप को
    //      - इंस्टेंसेस के लिए Browser स्कोप को
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

## टाइप डेफ़िनिशन्स का विस्तार करें

TypeScript के साथ, WebdriverIO इंटरफ़ेस का विस्तार करना आसान है। अपने कस्टम कमांड्स में इस तरह टाइप्स जोड़ें:

1. एक टाइप डेफ़िनिशन फ़ाइल बनाएँ (उदाहरण के लिए, `./src/types/wdio.d.ts`)
2. a. यदि मॉड्यूल-स्टाइल टाइप डेफ़िनिशन फ़ाइल का उपयोग कर रहे हैं (टाइप डेफ़िनिशन फ़ाइल में import/export और `declare global WebdriverIO` का उपयोग करते हुए), तो सुनिश्चित करें कि फ़ाइल पाथ को `tsconfig.json` की `include` प्रॉपर्टी में शामिल किया गया है।

   b. यदि एम्बिएंट-स्टाइल टाइप डेफ़िनिशन फ़ाइलों का उपयोग कर रहे हैं (टाइप डेफ़िनिशन फ़ाइलों में कोई import/export नहीं और कस्टम कमांड्स के लिए `declare namespace WebdriverIO`), तो सुनिश्चित करें कि `tsconfig.json` में कोई `include` सेक्शन *नहीं* है, क्योंकि इससे वे सभी टाइप डेफ़िनिशन फ़ाइलें जो `include` सेक्शन में सूचीबद्ध नहीं हैं, TypeScript द्वारा पहचानी नहीं जाएँगी।

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

3. अपने एक्ज़िक्यूशन मोड के अनुसार अपने कमांड्स के लिए डेफ़िनिशन्स जोड़ें।

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

## थर्ड पार्टी लाइब्रेरीज़ को एकीकृत करें

यदि आप बाहरी लाइब्रेरीज़ का उपयोग करते हैं (उदाहरण के लिए, डेटाबेस कॉल करने के लिए) जो प्रॉमिसेस को सपोर्ट करती हैं, तो उन्हें एकीकृत करने का एक अच्छा तरीका कुछ API मेथड्स को एक कस्टम कमांड में रैप करना है।

प्रॉमिस लौटाते समय, WebdriverIO यह सुनिश्चित करता है कि प्रॉमिस के रिज़ॉल्व होने तक वह अगले कमांड पर आगे न बढ़े। यदि प्रॉमिस रिजेक्ट हो जाता है, तो कमांड एक एरर थ्रो करेगा।

```js
browser.addCommand('makeRequest', async (url) => {
    const response = await fetch(url)
    return await response.json()
})
```

फिर, बस इसे अपने WDIO टेस्ट स्पेक्स में उपयोग करें:

```js
it('execute external library in a sync way', async () => {
    await browser.url('...')
    const body = await browser.makeRequest('http://...')
    console.log(body) // रिस्पॉन्स बॉडी लौटाता है
})
```

**नोट:** आपके कस्टम कमांड का परिणाम उस प्रॉमिस का परिणाम है जो आप लौटाते हैं।

## कमांड्स को ओवरराइट करना

आप `overwriteCommand` के साथ नेटिव कमांड्स को भी ओवरराइट कर सकते हैं।

ऐसा करने की अनुशंसा नहीं की जाती है, क्योंकि इससे फ़्रेमवर्क का अप्रत्याशित व्यवहार हो सकता है!

समग्र दृष्टिकोण `addCommand` के समान है, अंतर केवल इतना है कि कमांड फ़ंक्शन में पहला आर्गुमेंट वह मूल फ़ंक्शन है जिसे आप ओवरराइट करने जा रहे हैं। कृपया नीचे कुछ उदाहरण देखें।

### ब्राउज़र कमांड्स को ओवरराइट करना

```js
/**
 * पॉज़ से पहले मिलीसेकंड प्रिंट करें और उसका मान लौटाएँ।
 *
 * @param pause - ओवरराइट किए जाने वाले कमांड का नाम
 * @param this of func - मूल ब्राउज़र इंस्टेंस जिस पर फ़ंक्शन को कॉल किया गया था
 * @param originalPauseFunction of func - मूल pause फ़ंक्शन
 * @param ms of func - पास किए गए वास्तविक पैरामीटर्स
  */
browser.overwriteCommand('pause', async function (this, originalPauseFunction, ms) {
    console.log(`sleeping for ${ms}`)
    await originalPauseFunction(ms)
    return ms
})

// फिर इसे पहले की तरह उपयोग करें
console.log(`was sleeping for ${await browser.pause(1000)}`)
```

### एलिमेंट कमांड्स को ओवरराइट करना

एलिमेंट स्तर पर कमांड्स को ओवरराइट करना लगभग समान है। `attachToElement` को `true` पर सेट करें:

```js
/**
 * यदि एलिमेंट क्लिक करने योग्य नहीं है तो उस तक स्क्रॉल करने का प्रयास करें।
 * एलिमेंट दिखाई न देने या क्लिक करने योग्य न होने पर भी JS से क्लिक करने के लिए { force: true } पास करें।
 * दिखाएँ कि मूल फ़ंक्शन आर्गुमेंट टाइप को `options?: ClickOptions` के साथ रखा जा सकता है
 *
 * @param this of func - वह एलिमेंट जिस पर मूल फ़ंक्शन को कॉल किया गया था
 * @param originalClickFunction of func - मूल pause फ़ंक्शन
 * @param options of func - पास किए गए वास्तविक पैरामीटर्स
 */
browser.overwriteCommand(
    'click',
    async function (this, originalClickFunction, options?: ClickOptions & { force?: boolean }) {
        const { force, ...restOptions } = options || {}
        if (!force) {
            try {
                // क्लिक करने का प्रयास
                await originalClickFunction(options)
                return
            } catch (err) {
                if ((err as Error).message.includes('not clickable at point')) {
                    console.warn('WARN: Element', this.selector, 'is not clickable.', 'Scrolling to it before clicking again.')

                    // एलिमेंट तक स्क्रॉल करें और फिर से क्लिक करें
                    await this.scrollIntoView()
                    return originalClickFunction(options)
                }
                throw err
            }
        }

        // js से क्लिक करना
        console.warn('WARN: Using force click for', this.selector)
        await browser.execute((el) => {
            el.click()
        }, this)
    },
    { attachToElement: true }, // इसे एलिमेंट से जोड़ना न भूलें
)

// फिर इसे पहले की तरह उपयोग करें
const elem = await $('body')
await elem.click()

// या पैरामीटर्स पास करें
await elem.click({ force: true })
```

### ब्राउज़िंग कॉन्टेक्स्ट कमांड्स को ओवरराइट करना

हर टैब, विंडो और फ़्रेम के किसी बिल्ट-इन या कस्टम कमांड को ओवरराइट करने के लिए `attachToBrowsingContext` को `true` पर सेट करें। मूल कमांड उस कॉन्टेक्स्ट से बंधा होता है जिस पर उसे कॉल किया गया था:

```js
browser.overwriteCommand('getTitle', async function (this, originalGetTitle) {
    const title = await originalGetTitle()
    return this.isFrame ? `frame: ${title}` : title
}, { attachToBrowsingContext: true })

const page = await browser.url('https://webdriver.io')
const frame = await page.frame('iframe')
console.log(await frame.getTitle()) // "frame: ..."
```

## और अधिक WebDriver कमांड्स जोड़ें

यदि आप WebDriver प्रोटोकॉल का उपयोग कर रहे हैं और ऐसे प्लेटफ़ॉर्म पर टेस्ट चलाते हैं जो ऐसे अतिरिक्त कमांड्स को सपोर्ट करता है जो [`@wdio/protocols`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-protocols/src/protocols) में किसी भी प्रोटोकॉल डेफ़िनिशन द्वारा परिभाषित नहीं हैं, तो आप उन्हें `addCommand` इंटरफ़ेस के माध्यम से मैन्युअल रूप से जोड़ सकते हैं। `webdriver` पैकेज एक कमांड रैपर प्रदान करता है जो इन नए एंडपॉइंट्स को अन्य कमांड्स की तरह ही रजिस्टर करने की अनुमति देता है, और समान पैरामीटर जाँच और एरर हैंडलिंग प्रदान करता है। इस नए एंडपॉइंट को रजिस्टर करने के लिए कमांड रैपर इम्पोर्ट करें और इसके साथ एक नया कमांड इस प्रकार रजिस्टर करें:

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

अमान्य पैरामीटर्स के साथ इस कमांड को कॉल करने पर पूर्वनिर्धारित प्रोटोकॉल कमांड्स के समान एरर हैंडलिंग होती है, उदाहरण के लिए:

```js
// आवश्यक url पैरामीटर और पेलोड के बिना कमांड कॉल करें
await browser.myNewCommand()

/**
 * परिणामस्वरूप निम्नलिखित एरर आती है:
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

कमांड को सही तरीके से कॉल करने पर, जैसे `browser.myNewCommand('foo', 'bar')`, यह सही ढंग से `{ foo: 'bar' }` जैसे पेलोड के साथ उदाहरण के लिए `http://localhost:4444/session/7bae3c4c55c3bf82f54894ddc83c5f31/foobar/foo` पर एक WebDriver रिक्वेस्ट भेजता है।

:::note
`:sessionId` url पैरामीटर स्वचालित रूप से WebDriver सेशन की सेशन id से प्रतिस्थापित हो जाएगा। अन्य url पैरामीटर्स लागू किए जा सकते हैं लेकिन उन्हें `variables` के भीतर परिभाषित करना आवश्यक है।
:::

प्रोटोकॉल कमांड्स को कैसे परिभाषित किया जा सकता है, इसके उदाहरण [`@wdio/protocols`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-protocols/src/protocols) पैकेज में देखें।