---
id: expect-webdriverio
title: अपेक्षा (Expect)
custom_edit_url: https://github.com/webdriverio/expect-webdriverio/edit/main/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';


जब आप परीक्षण लिख रहे होते हैं, तो अक्सर आपको यह जांचने की आवश्यकता होती है कि मान कुछ निश्चित शर्तों को पूरा करते हैं। `expect` आपको कई "मैचर्स" तक पहुंच प्रदान करता है जो आपको `browser`, `element` या `mock` ऑब्जेक्ट पर विभिन्न चीजों को सत्यापित करने की अनुमति देते हैं।

## डिफ़ॉल्ट विकल्प

नीचे दिए गए ये डिफ़ॉल्ट विकल्प कॉन्फ़िग में सेट किए गए [`waitforTimeout`](https://webdriver.io/docs/options#waitfortimeout) और [`waitforInterval`](https://webdriver.io/docs/options#waitforinterval) विकल्पों से जुड़े हैं।

केवल नीचे दिए गए विकल्पों को सेट करें अगर आप अपने दावों के लिए विशिष्ट टाइमआउट का इंतजार करना चाहते हैं।

```js
{
    wait: 2000, // ms to wait for expectation to succeed
    interval: 100, // interval between attempts
}
```

अगर आप अलग-अलग टाइमआउट और इंटरवल चुनना चाहते हैं, तो इन विकल्पों को इस प्रकार सेट करें:

```js
// wdio.conf.js
import { setOptions } from 'expect-webdriverio'

export const config = {
    // ...
    before () {
        setOptions({ wait: 5000 })
    },
    // ...
}
```

### मैचर विकल्प

प्रत्येक मैचर कई विकल्प ले सकता है जो आपको दावे को संशोधित करने की अनुमति देता है:

##### कमांड विकल्प

| नाम | प्रकार | विवरण |
| ---- | ---- | ------- |
| <code><var>wait</var></code> | number | अपेक्षा के सफल होने के लिए प्रतीक्षा करने का समय ms में। डिफ़ॉल्ट: `3000` |
| <code><var>interval</var></code> | number | प्रयासों के बीच का अंतराल। डिफ़ॉल्ट: `100` |
| <code><var>beforeAssertion</var></code> | function | वह फ़ंक्शन जिसे दावा करने से पहले कॉल किया जाएगा |
| <code><var>afterAssertion</var></code> | function | वह फ़ंक्शन जिसे दावा करने के बाद कॉल किया जाएगा, जिसमें दावा परिणाम शामिल हैं |
| <code><var>message</var></code> | string | दावा त्रुटि से पहले जोड़ने के लिए उपयोगकर्ता संदेश |

##### स्ट्रिंग विकल्प

यह विकल्प कमांड विकल्पों के अतिरिक्त लागू किया जा सकता है जब स्ट्रिंग्स का दावा किया जा रहा हो।

| नाम | प्रकार | विवरण |
| ---- | ---- | ------- |
| <code><var>ignoreCase</var></code> | boolean | वास्तविक और अपेक्षित दोनों मानों पर `toLowerCase` लागू करें |
| <code><var>trim</var></code> | boolean | वास्तविक मान पर `trim` लागू करें |
| <code><var>replace</var></code> | Replacer \| Replacer[] | वास्तविक मान के उन हिस्सों को बदलें जो स्ट्रिंग/RegExp से मेल खाते हैं। प्रतिस्थापक एक स्ट्रिंग या फ़ंक्शन हो सकता है।
| <code><var>containing</var></code> | boolean | वास्तविक मान में अपेक्षित मान शामिल होने की अपेक्षा करें, अन्यथा सख्त बराबर। |
| <code><var>asString</var></code> | boolean | प्रॉपर्टी मान को स्ट्रिंग में कन्वर्ट करने के लिए मददगार हो सकता है |
| <code><var>atStart</var></code> | boolean | वास्तविक मान के अपेक्षित मान से शुरू होने की अपेक्षा करें |
| <code><var>atEnd</var></code> | boolean | वास्तविक मान के अपेक्षित मान के साथ समाप्त होने की अपेक्षा करें |
| <code><var>atIndex</var></code> | number | वास्तविक मान में दिए गए इंडेक्स पर अपेक्षित मान होने की अपेक्षा करें |

##### नंबर विकल्प

यह विकल्प कमांड विकल्पों के अतिरिक्त लागू किया जा सकता है जब नंबरों का दावा किया जा रहा हो।

| नाम | प्रकार | विवरण |
| ---- | ---- | ------- |
| <code><var>eq</var></code> | number | बराबर |
| <code><var>lte</var></code> | number | कम से बराबर |
| <code><var>gte</var></code> | number | अधिक से बराबर |

### HTML एंटिटीज़ का हैंडलिंग

एक HTML एंटिटी टेक्स्ट का एक टुकड़ा ("स्ट्रिंग") है जो एंपरसैंड (`&`) से शुरू होता है और सेमीकोलन (`;`) पर समाप्त होता है। एंटिटीज़ का उपयोग अक्सर आरक्षित वर्णों (जिन्हें अन्यथा HTML कोड के रूप में व्याख्या किया जाएगा) और अदृश्य वर्णों (जैसे नॉन-ब्रेकिंग स्पेस, जैसे `&nbsp;`) को प्रदर्शित करने के लिए किया जाता है।

ऐसे एलिमेंट को खोजने या उसके साथ इंटरैक्ट करने के लिए एंटिटी के यूनिकोड समतुल्य का उपयोग करें। उदाहरण के लिए:

```html
<div data="Some&nbsp;Value">Some&nbsp;Text</div>
```

```js
const myElem = await $('div[data="Some\u00a0Value"]')
await expect(myElem).toHaveAttribute('data', 'div[Some\u00a0Value')
await expect(myElem).toHaveText('Some\u00a0Text')
```

आप सभी यूनिकोड संदर्भ [HTML स्पेक](https://html.spec.whatwg.org/multipage/named-characters.html#named-character-references) में पा सकते हैं।

**नोट:** यूनिकोड केस-इनसेंसिटिव है इसलिए `\u00a0` और `\u00A0` दोनों काम करते हैं। ब्राउज़र इंस्पेक्ट में एलिमेंट खोजने के लिए, यूनिकोड से `u` हटा दें जैसे: `div[data="Some\00a0Value"]`

## ब्राउज़र मैचर्स

### toHaveUrl

जांचता है कि ब्राउज़र एक विशिष्ट पेज पर है।

##### उपयोग

```js
await browser.url('https://webdriver.io/')
await expect(browser).toHaveUrl('https://webdriver.io')
```

##### उपयोग

```js
await browser.url('https://webdriver.io/')
await expect(browser).toHaveUrl(expect.stringContaining('webdriver'))
```

### toHaveTitle

जांचता है कि वेबसाइट का एक विशिष्ट शीर्षक है।

##### उपयोग

```js
await browser.url('https://webdriver.io/')
await expect(browser).toHaveTitle('WebdriverIO · Next-gen browser and mobile automation test framework for Node.js')
await expect(browser).toHaveTitle(expect.stringContaining('WebdriverIO'))
```

### toHaveClipboardText

जांचता है कि ब्राउज़र के क्लिपबोर्ड में एक विशिष्ट टेक्स्ट संग्रहीत है।

##### उपयोग

```js
import { Key } from 'webdriverio'

await browser.keys([Key.Ctrl, 'a'])
await browser.keys([Key.Ctrl, 'c'])
await expect(browser).toHaveClipboardText('some clipboard text')
await expect(browser).toHaveClipboardText(expect.stringContaining('clipboard text'))
```

## एलिमेंट मैचर्स

### toBeDisplayed

दिए गए एलिमेंट पर [`isDisplayed`](https://webdriver.io/docs/api/element/isDisplayed/) कॉल करता है।

##### उपयोग

```js
const elem = await $('#someElem')
await expect(elem).toBeDisplayed()
```

### toExist

दिए गए एलिमेंट पर [`isExisting`](https://webdriver.io/docs/api/element/isExisting) कॉल करता है।

##### उपयोग

```js
const elem = await $('#someElem')
await expect(elem).toExist()
```

### toBePresent

`toExist` के समान।

##### उपयोग

```js
const elem = await $('#someElem')
await expect(elem).toBePresent()
```

### toBeExisting

`toExist` के समान।

##### उपयोग

```js
const elem = await $('#someElem')
await expect(elem).toBeExisting()
```

### toBeFocused

जांचता है कि एलिमेंट पर फोकस है। यह दावा केवल वेब संदर्भ में काम करता है।

##### उपयोग

```js
const elem = await $('#someElem')
await expect(elem).toBeFocused()
```

### toHaveAttribute

जांचता है कि एलिमेंट का एक निश्चित विशेषता विशिष्ट मान के साथ है।

##### उपयोग

```js
const myInput = await $('input')
await expect(myInput).toHaveAttribute('class', 'form-control')
await expect(myInput).toHaveAttribute('class', expect.stringContaining('control'))
```

### toHaveAttr

`toHaveAttribute` के समान।

##### उपयोग

```js
const myInput = await $('input')
await expect(myInput).toHaveAttr('class', 'form-control')
await expect(myInput).toHaveAttr('class', expect.stringContaining('control'))
```

### toHaveElementClass

जांचता है कि एलिमेंट का एक क्लास नाम है। इसे एक ऐरे के साथ भी कॉल किया जा सकता है जब एलिमेंट के कई क्लास नाम हो सकते हैं।

##### उपयोग

```js
const myInput = await $('input')
await expect(myInput).toHaveElementClass('form-control', { message: 'Not a form control!' })
await expect(myInput).toHaveElementClass(['form-control' , 'w-full'], { message: 'not full width' })
await expect(myInput).toHaveElementClass(expect.stringContaining('form'), { message: 'Not a form control!' })
```

### toHaveElementProperty

जांचता है कि एलिमेंट की एक निश्चित प्रॉपर्टी है।

##### उपयोग

```js
const elem = await $('#elem')
await expect(elem).toHaveElementProperty('height', 23)
await expect(elem).not.toHaveElementProperty('height', 0)
```

### toHaveValue

जांचता है कि एक इनपुट एलिमेंट का एक निश्चित मान है।

##### उपयोग

```js
const myInput = await $('input')
await expect(myInput).toHaveValue('admin-user', { ignoreCase: true })
await expect(myInput).toHaveValue(expect.stringContaining('user'), { ignoreCase: true })
```

### toBeClickable

जांचता है कि एलिमेंट पर क्लिक किया जा सकता है, एलिमेंट पर [`isClickable`](https://webdriver.io/docs/api/element/isClickable) कॉल करके।

##### उपयोग

```js
const elem = await $('#elem')
await expect(elem).toBeClickable()
```

### toBeDisabled

जांचता है कि एलिमेंट अक्षम है, एलिमेंट पर [`isEnabled`](https://webdriver.io/docs/api/element/isEnabled) कॉल करके।

##### उपयोग

```js
const elem = await $('#elem')
await expect(elem).toBeDisabled()
// same as
await expect(elem).not.toBeEnabled()
```

### toBeEnabled

जांचता है कि एलिमेंट सक्षम है, एलिमेंट पर [`isEnabled`](https://webdriver.io/docs/api/element/isEnabled) कॉल करके।

##### उपयोग

```js
const elem = await $('#elem')
await expect(elem).toBeEnabled()
// same as
await expect(elem).not.toBeDisabled()
```

### toBeSelected

जांचता है कि एलिमेंट सक्षम है, एलिमेंट पर [`isSelected`](https://webdriver.io/docs/api/element/isSelected) कॉल करके।

##### उपयोग

```js
const elem = await $('#elem')
await expect(elem).toBeSelected()
```

### toBeChecked

`toBeSelected` के समान।

##### उपयोग

```js
const elem = await $('#elem')
await expect(elem).toBeChecked()
```

### toHaveComputedLabel

जांचता है कि एलिमेंट का एक विशिष्ट कंप्यूट किया गया WAI-ARIA लेबल है। इसे एक ऐरे के साथ भी कॉल किया जा सकता है, उस स्थिति में जब एलिमेंट के अलग-अलग लेबल हो सकते हैं।

##### उपयोग

```js
await browser.url('https://webdriver.io/')
const elem = await $('a[href="https://github.com/webdriverio/webdriverio"]')
await expect(elem).toHaveComputedLabel('GitHub repository')
await expect(elem).toHaveComputedLabel(expect.stringContaining('repository'))
```

##### उपयोग

```js
await browser.url('https://webdriver.io/')
const elem = await $('a[href="https://github.com/webdriverio/webdriverio"]')
await expect(elem).toHaveComputedLabel(['GitHub repository', 'Private repository'])
await expect(elem).toHaveComputedLabel([expect.stringContaining('GitHub'), expect.stringContaining('Private')])
```

### toHaveComputedRole

जांचता है कि एलिमेंट का एक विशिष्ट कंप्यूट किया गया WAI-ARIA रोल है। इसे एक ऐरे के साथ भी कॉल किया जा सकता है, उस स्थिति में जब एलिमेंट के अलग-अलग लेबल हो सकते हैं।

##### उपयोग

```js
await browser.url('https://webdriver.io/')
const elem = await $('[aria-label="Skip to main content"]')
await expect(elem).toHaveComputedRole('region')
await expect(elem).toHaveComputedRole(expect.stringContaining('ion'))
```

##### उपयोग

```js
await browser.url('https://webdriver.io/')
const elem = await $('[aria-label="Skip to main content"]')
await expect(elem).toHaveComputedRole(['region', 'section'])
await expect(elem).toHaveComputedRole([expect.stringContaining('reg'), expect.stringContaining('sec')])
```

### toHaveHref

जांचता है कि लिंक एलिमेंट का एक विशिष्ट लिंक लक्ष्य है।

##### उपयोग

```js
const link = await $('a')
await expect(link).toHaveHref('https://webdriver.io')
await expect(link).toHaveHref(expect.stringContaining('webdriver.io'))
```

### toHaveLink

`toHaveHref` के समान।

##### उपयोग

```js
const link = await $('a')
await expect(link).toHaveLink('https://webdriver.io')
await expect(link).toHaveLink(expect.stringContaining('webdriver.io'))
```

### toHaveId

जांचता है कि एलिमेंट का एक विशिष्ट `id` विशेषता है।

##### उपयोग

```js
const elem = await $('#elem')
await expect(elem).toHaveId('elem')
```

### toHaveText

जांचता है कि एलिमेंट का एक विशिष्ट टेक्स्ट है। इसे एक ऐरे के साथ भी कॉल किया जा सकता है उस स्थिति में जब एलिमेंट के अलग-अलग टेक्स्ट हो सकते हैं।

##### उपयोग

```js
await browser.url('https://webdriver.io/')
const elem = await $('.container')
await expect(elem).toHaveText('Next-gen browser and mobile automation test framework for Node.js')
await expect(elem).toHaveText(expect.stringContaining('test framework for Node.js'))
await expect(elem).toHaveText(['Next-gen browser and mobile automation test framework for Node.js', 'Get Started'])
await expect(elem).toHaveText([expect.stringContaining('test framework for Node.js'), expect.stringContaining('Started')])
```

यदि नीचे दिए गए div में एलिमेंट्स की सूची है:

```
<ul>
  <li>Coffee</li>
  <li>Tea</li>
  <li>Milk</li>
</ul>
```

आप एक ऐरे का उपयोग करके उन्हें सत्यापित कर सकते हैं:

```js
const elem = await $$('ul > li')
await expect(elem).toHaveText(['Coffee', 'Tea', 'Milk'])
```

### toHaveHTML

जांचता है कि एलिमेंट का एक विशिष्ट टेक्स्ट है। इसे एक ऐरे के साथ भी कॉल किया जा सकता है उस स्थिति में जब एलिमेंट के अलग-अलग टेक्स्ट हो सकते हैं।

##### उपयोग

```js
await browser.url('https://webdriver.io/')
const elem = await $('.hero__subtitle')
await expect(elem).toHaveHTML('<p class="hero__subtitle">Next-gen browser and mobile automation test framework for Node.js</p>')
await expect(elem).toHaveHTML(expect.stringContaining('Next-gen browser and mobile automation test framework for Node.js'))
await expect(elem).toHaveHTML('Next-gen browser and mobile automation test framework for Node.js', { includeSelectorTag: false })
```

##### उपयोग

```js
await browser.url('https://webdriver.io/')
const elem = await $('.hero__subtitle')
await expect(elem).toHaveHTML(['Next-gen browser and mobile automation test framework for Node.js', 'Get Started'], { includeSelectorTag: false })
await expect(elem).toHaveHTML([expect.stringContaining('automation test framework for Node.js'), expect.stringContaining('Started')], { includeSelectorTag: false })
```

### toBeDisplayedInViewport

जांचता है कि एलिमेंट व्यूपोर्ट के भीतर है, एलिमेंट पर [`isDisplayedInViewport`](https://webdriver.io/docs/api/element/isDisplayedInViewport) कॉल करके।

##### उपयोग

```js
const elem = await $('#elem')
await expect(elem).toBeDisplayedInViewport()
```

### toHaveChildren

`element.$('./*')` कमांड को कॉल करके फेच किए गए एलिमेंट के बच्चों की संख्या की जांच करता है।

##### उपयोग

```js
const list = await $('ul')
await expect(list).toHaveChildren() // the list has at least one item
// same as
await expect(list).toHaveChildren({ gte: 1 })

await expect(list).toHaveChildren(3) // the list has 3 items
// same as 
await expect(list).toHaveChildren({ eq: 3 })
```

### toHaveWidth

जांचता है कि एलिमेंट की एक विशिष्ट चौड़ाई है।

##### उपयोग

```js
await browser.url('http://github.com')
const logo = await $('.octicon-mark-github')
await expect(logo).toHaveWidth(32)
```

### toHaveHeight

जांचता है कि एलिमेंट की एक विशिष्ट ऊंचाई है।

##### उपयोग

```js
await browser.url('http://github.com')
const logo = await $('.octicon-mark-github')
await expect(logo).toHaveHeight(32)
```

### toHaveSize

जांचता है कि एलिमेंट का एक विशिष्ट आकार है।

##### उपयोग

```js
await browser.url('http://github.com')
const logo = await $('.octicon-mark-github')
await expect(logo).toHaveSize({ width: 32, height: 32 })
```

### toBeElementsArrayOfSize

[`$$`](https://webdriver.io/docs/api/element/$) कमांड का उपयोग करके फेच किए गए एलिमेंट्स की संख्या की जांच करता है।

**नोट:** यह मैचर दावा पास होने पर पारित किए गए ऐरे को नवीनतम एलिमेंट्स के साथ अपडेट करेगा। हालांकि, अगर आपने वेरिएबल को फिर से असाइन किया है, तो आपको एलिमेंट्स को फिर से फेच करना होगा।

##### उपयोग

```js
const listItems = await $$('ul>li')
await expect(listItems).toBeElementsArrayOfSize(5) // 5 items in the list

await expect(listItems).toBeElementsArrayOfSize({ lte: 10 })
// same as
assert.ok(listItems.length <= 10)
```

## नेटवर्क मैचर्स

### toBeRequested

जांचता है कि मॉक को कॉल किया गया था

##### उपयोग

```js
const mock = browser.mock('**/api/todo*')
await expect(mock).toBeRequested()
```

### toBeRequestedTimes

जांचता है कि मॉक को अपेक्षित बार कॉल किया गया था

##### उपयोग

```js
const mock = browser.mock('**/api/todo*')
await expect(mock).toBeRequestedTimes(2) // await expect(mock).toBeRequestedTimes({ eq: 2 })

await expect(mock).toBeRequestedTimes({ gte: 5, lte: 10 }) // request called at least 5 times but less than 11
```

### toBeRequestedWith

जांचता है कि मॉक को अपेक्षित विकल्पों के अनुसार कॉल किया गया था।

अधिकांश विकल्प एक्सपेक्ट/जैस्मिन आंशिक मैचर्स का समर्थन करते हैं जैसे [expect.objectContaining](https://jestjs.io/docs/en/expect#expectobjectcontainingobject)

##### उपयोग

```js
const mock = browser.mock('**/api/todo*', { method: 'POST' })

await expect(mock).toBeRequestedWith({
    url: 'http://localhost:8080/api/todo',          // [optional] string | function | custom matcher
    method: 'POST',                                 // [optional] string | array
    statusCode: 200,                                // [optional] number | array
    requestHeaders: { Authorization: 'foo' },       // [optional] object | function | custom matcher
    responseHeaders: { Authorization: 'bar' },      // [optional] object | function | custom matcher
    postData: { title: 'foo', description: 'bar' }, // [optional] object | function | custom matcher
    response: { success: true },                    // [optional] object | function | custom matcher
})

await expect(mock).toBeRequestedWith({
    url: expect.stringMatching(/.*\/api\/.*/i),
    method: ['POST', 'PUT'], // either POST or PUT
    statusCode: [401, 403],  // either 401 or 403
    requestHeaders: headers => headers.Authorization.startsWith('Bearer '),
    postData: expect.objectContaining({ released: true, title: expect.stringContaining('foobar') }),
    response: r => Array.isArray(r) && r.data.items.length === 20
})
```

## स्नैपशॉट मैचर

WebdriverIO बेसिक स्नैपशॉट टेस्ट के साथ-साथ DOM स्नैपशॉट टेस्टिंग का समर्थन करता है।

### toMatchSnapshot

जांचता है कि कोई भी मनमाना ऑब्जेक्ट एक निश्चित मान से मेल खाता है। अगर आप एक [`WebdriverIO.Element`](https://webdriver.io/docs/api/element) पास करते हैं तो यह स्वचालित रूप से [`outerHTML`](https://developer.mozilla.org/en-US/docs/Web/API/Element/outerHTML) स्थिति का स्नैपशॉट लेगा।

##### उपयोग

```js
// snapshot arbitrary objects (no "await" needed here)
expect({ foo: 'bar' }).toMatchSnapshot()
// snapshot `outerHTML` of WebdriverIO.Element (DOM snapshot, requires "await")
await expect($('elem')).toMatchSnapshot()
// snapshot result of element command
await expect($('elem').getCSSProperty('background-color')).toMatchSnapshot()
```

### toMatchInlineSnapshot

इसी तरह, आप टेस्ट फाइल के भीतर स्नैपशॉट को इनलाइन स्टोर करने के लिए `toMatchInlineSnapshot()` का उपयोग कर सकते हैं। उदाहरण के लिए:

```js
await expect($('img')).toMatchInlineSnapshot()
```

स्नैपशॉट फाइल बनाने के बजाय, WebdriverIO स्नैपशॉट को स्ट्रिंग के रूप में अपडेट करने के लिए सीधे टेस्ट फाइल को संशोधित करेगा:

```js
await expect($('img')).toMatchInlineSnapshot(`"<img src="/public/apple-touch-icon-precomposed.png">"`)
```

## विजुअल स्नैपशॉट मैचर्स

<!--
    These matchers aren't implemented in the `expect-webdriverio` project and can be found
    here: https://github.com/webdriverio-community/visual-testing/blob/e10f7005c1533f5b06811888a9cbb9020e6e765e/packages/service/src/matcher.ts
-->

निम्नलिखित मैचर्स `@wdio/visual-service` प्लगइन के हिस्से के रूप में लागू किए गए हैं और केवल तभी उपलब्ध होते हैं जब सेवा स्थापित की जाती है। सुनिश्चित करें कि आप [सेट-अप निर्देशों](https://webdriver.io/docs/visual-testing) का ठीक से पालन करें।

### toMatchElementSnapshot

जांचता है कि क्या दिया गया एलिमेंट बेसलाइन के स्नैपशॉट से मेल खाता है।

##### उपयोग

```js
await expect($('.hero__title-logo')).toMatchElementSnapshot('wdioLogo', 0, {
    // options
})
```

अपेक्षित परिणाम डिफ़ॉल्ट रूप से `0` है, इसलिए आप वही दावा इस प्रकार लिख सकते हैं:

```js
await expect($('.hero__title-logo')).toMatchElementSnapshot('wdioLogo', {
    // options
})
```

या बिल्कुल भी कोई विकल्प पास न करें:

```js
await expect($('.hero__title-logo')).toMatchElementSnapshot()
```

### toMatchScreenSnapshot

जांचता है कि क्या वर्तमान स्क्रीन बेसलाइन के स्नैपशॉट से मेल खाती है।

##### उपयोग

```js
await expect(browser).toMatchScreenSnapshot('partialPage', 0, {
    // options
})
```

अपेक्षित परिणाम डिफ़ॉल्ट रूप से `0` है, इसलिए आप वही दावा इस प्रकार लिख सकते हैं:

```js
await expect(browser).toMatchScreenSnapshot('partialPage', {
    // options
})
```

या बिल्कुल भी कोई विकल्प पास न करें:

```js
await expect(browser).toMatchScreenSnapshot('partialPage')
```

### toMatchFullPageSnapshot

जांचता है कि क्या पूरे पेज का स्क्रीनशॉट बेसलाइन के स्नैपशॉट से मेल खाता है।

##### उपयोग

```js
await expect(browser).toMatchFullPageSnapshot('fullPage', 0, {
    // options
})
```

अपेक्षित परिणाम डिफ़ॉल्ट रूप से `0` है, इसलिए आप वही दावा इस प्रकार लिख सकते हैं:

```js
await expect(browser).toMatchFullPageSnapshot('fullPage', {
    // options
})
```

या बिल्कुल भी कोई विकल्प पास न करें:

```js
await expect(browser).toMatchFullPageSnapshot('fullPage')
```

### toMatchTabbablePageSnapshot

जांचता है कि क्या टैब मार्क्स सहित पूरे पेज का स्क्रीनशॉट बेसलाइन के स्नैपशॉट से मेल खाता है।

##### उपयोग

```js
await expect(browser).toMatchTabbablePageSnapshot('tabbable', 0, {
    // options
})
```

अपेक्षित परिणाम डिफ़ॉल्ट रूप से `0` है, इसलिए आप वही दावा इस प्रकार लिख सकते हैं:

```js
await expect(browser).toMatchTabbablePageSnapshot('tabbable', {
    // options
})
```

या बिल्कुल भी कोई विकल्प पास न करें:

```js
await expect(browser).toMatchTabbablePageSnapshot('tabbable')
```

## रेगुलर एक्सप्रेशन का उपयोग

आप सभी मैचर्स के लिए सीधे रेगुलर एक्सप्रेशन का भी उपयोग कर सकते हैं जो टेक्स्ट तुलना करते हैं।

##### उपयोग

```js
await browser.url('https://webdriver.io/')
const elem = await $('.container')
await expect(elem).toHaveText(/node\.js/i)
await expect(elem).toHaveText([/node\.js/i, 'Get Started'])
await expect(browser).toHaveTitle(/webdriverio/i)
await expect(browser).toHaveUrl(/webdriver\.io/)
await expect(elem).toHaveElementClass(/Container/i)
```

## डिफ़ॉल्ट मैचर्स

`expect-webdriverio` मैचर्स के अलावा आप बिल्ट-इन Jest के [expect](https://jestjs.io/docs/en/expect) दावों या Jasmine के लिए [expect/expectAsync](https://jasmine.github.io/api/3.5/global.html#expect) का उपयोग कर सकते हैं।

## असिमेट्रिक मैचर्स

WebdriverIO जहां भी आप टेक्स्ट मानों की तुलना करते हैं, असिमेट्रिक मैचर्स के उपयोग का समर्थन करता है, उदाहरण के लिए:

```ts
await expect(browser).toHaveTitle(expect.stringContaining('some title'))
```

या

```ts
await expect(browser).toHaveTitle(expect.not.stringContaining('some title'))
```

## टाइपस्क्रिप्ट

यदि आप [WDIO टेस्टरनर](https://webdriver.io/docs/clioptions) का उपयोग कर रहे हैं तो सब कुछ स्वचालित रूप से सेटअप किया जाएगा। बस दस्तावेज़ों से [सेटअप गाइड](https://webdriver.io/docs/typescript#framework-setup) का पालन करें। हालांकि, अगर आप WebdriverIO को एक अलग टेस्टरनर के साथ या एक सरल Node.js स्क्रिप्ट में चलाते हैं, तो आपको `tsconfig.json` में `types` में `expect-webdriverio` जोड़ने की आवश्यकता होगी।

- `"expect-webdriverio"` Jasmine/Jest उपयोगकर्ताओं को छोड़कर सभी के लिए।
- `"expect-webdriverio/jasmine"` Jasmine
- `"expect-webdriverio/jest"` Jest

## जावास्क्रिप्ट (VSCode)

वैनिला js में ऑटोकम्पलीशन को काम करने के लिए प्रोजेक्ट रूट में `jsconfig.json` बनाना और टाइप परिभाषाओं का उल्लेख करना आवश्यक है।

```json
{
  "include": [
    "**/*.js",
    "**/*.json",
    "node_modules/expect-webdriverio"
  ]
}
```

## अपने खुद के मैचर्स जोड़ना

जिस तरह `expect-webdriverio` Jasmine/Jest मैचर्स का विस्तार करता है, उसी तरह कस्टम मैचर्स जोड़ना संभव है।

- Jasmine के लिए [custom matchers](https://jasmine.github.io/2.5/custom_matcher.html) डॉक देखें
- बाकी सभी के लिए Jest के [expect.extend](https://jestjs.io/docs/en/expect#expectextendmatchers) देखें

कस्टम मैचर्स को wdio `before` हुक में जोड़ा जाना चाहिए

```js
// wdio.conf.js
{
    async before () {
        const { addCustomMatchers } = await import('./myMatchers')
        addCustomMatchers()
    }
}
```

```js
// myMatchers.js - Jest example
export function addCustomMatchers () {
    if (global.expect.expect !== undefined) { // Temporary workaround. See https://github.com/webdriverio/expect-webdriverio/issues/835
        global.expect = global.expect.expect;
    }

    expect.extend({
        myMatcher (actual, expected) {
            return { pass: actual === expected, message: () => 'some message' }
        }
    })
}
```