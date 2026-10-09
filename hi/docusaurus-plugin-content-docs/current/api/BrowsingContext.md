---
id: browsingContext
title: BrowsingContext ऑब्जेक्ट
description: किसी टैब, विंडो या फ़्रेम को एक ऑब्जेक्ट के रूप में रखें और सेशन को उस पर स्विच किए बिना सीधे उसमें कमांड चलाएँ।
---

ब्राउज़िंग कॉन्टेक्स्ट एक टैब, विंडो या फ़्रेम है जिसे आप एक ऑब्जेक्ट के रूप में रखते हैं। इस पर कॉल की गई कमांड उसी टैब या फ़्रेम में चलती हैं, जबकि सेशन और बाकी सभी कॉन्टेक्स्ट जहाँ हैं वहीं रहते हैं। v10 से WebdriverIO किसी WebDriver BiDi सेशन में टैब, विंडो और फ़्रेम के साथ इसी तरह काम करता है, और वहाँ यह `switchWindow()` और `switchFrame()` की जगह लेता है।

```ts title="test/specs/tabs.e2e.ts"
import { browser, expect } from '@wdio/globals'

describe('browsing contexts', () => {
    it('works with two tabs and a frame at the same time', async () => {
        const page = await browser.url('https://the-internet.herokuapp.com/nested_frames')
        const docs = await browser.newWindow('https://webdriver.io/docs/api', { type: 'tab' })

        const top = await page.frame({ selector: 'frame[name="frame-top"]' })
        const middle = await top.frame({ selector: 'frame[name="frame-middle"]' })

        await expect(middle.$('#content')).toHaveText('MIDDLE')
        await expect(docs.$('h1')).toBeDisplayed()
        console.log(await page.getTitle(), await docs.getTitle())
    })
})
```

## ब्राउज़िंग कॉन्टेक्स्ट प्राप्त करें

| कॉल | रिटर्न करता है |
| --- | --- |
| [`browser.url(url)`](/docs/api/browser/url) | सेशन का पहला टॉप-लेवल कॉन्टेक्स्ट, उसे नेविगेट करने के बाद। `browser.url()` हमेशा इसी को नेविगेट करता है। |
| [`browser.newWindow(url, { type })`](/docs/api/browser/newWindow) | एक नया टैब (`type: 'tab'`) या विंडो, उसका पेज लोड हो जाने के बाद। सेशन उस पर स्विच नहीं होता। |
| [`browser.browsingContexts()`](/docs/api/browser/browsingContexts) | हर खुला टॉप-लेवल कॉन्टेक्स्ट (टैब और विंडो, फ़्रेम नहीं), जैसे कि वह टैब जिसे पेज ने खुद खोला हो। |
| [`context.frame(query)`](/docs/api/browsingContext/frame) | किसी कॉन्टेक्स्ट का एक फ़्रेम, क्रॉस-ओरिजिन और नेस्टेड फ़्रेम भी। |

ऑब्जेक्ट को अपने पास रखें और उस पर कमांड कॉल करें। स्विच करने के लिए कोई "वर्तमान" टैब या फ़्रेम नहीं होता, इसलिए कॉन्टेक्स्ट को समानांतर (parallel) में भी इस्तेमाल किया जा सकता है:

```ts
const [titleA, titleB] = await Promise.all([pageA.getTitle(), pageB.getTitle()])
```

## WebDriver BiDi और Classic सेशन

ब्राउज़िंग कॉन्टेक्स्ट के लिए WebDriver BiDi सेशन ज़रूरी है, जो v10 से Chrome, Edge और Firefox के लिए डिफ़ॉल्ट है। WebDriver Classic सेशन में, जैसे Appium या Safari के साथ, केवल सेशन का वर्तमान कॉन्टेक्स्ट होता है। वहाँ:

- `browser.url()` ब्राउज़र का एक विकल्प (stand-in) रिटर्न करता है। `$`, `execute` या `getTitle` जैसी कमांड ब्राउज़र पर चलती हैं, `url`, `isFrame` और `parent` वर्तमान पेज का वर्णन करते हैं, और `contextId` `undefined` होता है।
- `frame()`, `navigate()` और `activate()` रिजेक्ट हो जाते हैं और उनके बजाय इस्तेमाल की जाने वाली Classic कमांड बताते हैं: [`browser.switchFrame()`](/docs/api/browser/switchFrame), [`browser.url()`](/docs/api/browser/url) या [`browser.switchWindow()`](/docs/api/browser/switchWindow)।

जब एक ही कोड दोनों प्रकार के सेशन में चलता हो, तो `browser.isBidi` जाँचें।

## प्रॉपर्टीज़

| नाम | टाइप | विवरण |
| ---- | ---- | ------- |
| `contextId` | `String` | WebDriver BiDi ब्राउज़िंग कॉन्टेक्स्ट id। Classic सेशन में `undefined`। |
| `url` | `String` | वह URL जिस पर कॉन्टेक्स्ट को आख़िरी बार `browser.url()`, `navigate()` या `newWindow()` से नेविगेट किया गया था। पेज द्वारा खुद किए गए नेविगेशन (लिंक, `location`, `history.pushState`) केवल [`getUrl()`](/docs/api/browsingContext/getUrl) के बाद दिखाई देते हैं। |
| `isFrame` | `Boolean` | फ़्रेम के लिए `true`, टैब या विंडो के लिए `false`। |
| `parent` | `BrowsingContext \| undefined` | फ़्रेम के लिए, वह कॉन्टेक्स्ट जिस पर `frame()` कॉल किया गया था (या अधिक गहराई में नेस्टेड फ़्रेम के लिए, बीच का फ़्रेम)। टैब या विंडो के लिए `undefined`। |
| `browser` | `Browser` | सेशन का [ब्राउज़र ऑब्जेक्ट](/docs/api/browser)। |
| `request` | `Request \| undefined` | `browser.url()` या `navigate()` के माध्यम से हुए आख़िरी नेविगेशन की लोड जानकारी: URL, हेडर, रिस्पॉन्स, रीडायरेक्ट और पेज द्वारा किए गए रिक्वेस्ट। |
| `sessionId` | `String` | सेशन id, `browser.sessionId` के समान। |
| `capabilities` | `Object` | सेशन capabilities, `browser.capabilities` के समान। |
| `options` | `Object` | WebdriverIO options, `browser.options` के समान। |
| `isBidi` | `Boolean` | क्या सेशन WebDriver BiDi का उपयोग करता है। |
| `isMobile` | `Boolean` | क्या सेशन किसी मोबाइल डिवाइस को ऑटोमेट करता है। |

## मेथड्स

### ब्राउज़िंग कॉन्टेक्स्ट की कमांड

ये कमांड उसी कॉन्टेक्स्ट पर काम करती हैं जिस पर इन्हें कॉल किया जाता है। हर एक का अपना रेफ़रेंस पेज है।

| कमांड | विवरण |
| --- | --- |
| [`frame`](/docs/api/browsingContext/frame) | इस कॉन्टेक्स्ट के किसी फ़्रेम को उसके अपने ब्राउज़िंग कॉन्टेक्स्ट के रूप में प्राप्त करें। |
| [`navigate`](/docs/api/browsingContext/navigate) | इस कॉन्टेक्स्ट को नेविगेट करें, `browser.url()` के समान विकल्पों के साथ। |
| [`refresh`](/docs/api/browsingContext/refresh) | इस कॉन्टेक्स्ट को रीलोड करें। फ़्रेम केवल अपना डॉक्यूमेंट रीलोड करता है। |
| [`back`](/docs/api/browsingContext/back) / [`forward`](/docs/api/browsingContext/forward) | इस टैब या विंडो की हिस्ट्री में आगे-पीछे जाएँ। |
| [`activate`](/docs/api/browsingContext/activate) | इस टैब या विंडो को सामने लाएँ। |
| [`closeWindow`](/docs/api/browsingContext/closeWindow) | इस टैब या विंडो को बंद करें। |
| [`getTitle`](/docs/api/browsingContext/getTitle) / [`getUrl`](/docs/api/browsingContext/getUrl) | इस कॉन्टेक्स्ट में दिखाए गए डॉक्यूमेंट का टाइटल या URL पढ़ें। |
| [`acceptAlert`](/docs/api/browsingContext/acceptAlert) / [`dismissAlert`](/docs/api/browsingContext/dismissAlert) / [`getAlertText`](/docs/api/browsingContext/getAlertText) | इस कॉन्टेक्स्ट में खुले यूज़र प्रॉम्प्ट का उत्तर दें या उसे पढ़ें। |

### कॉन्टेक्स्ट में चलने वाली ब्राउज़र कमांड

ये उसी नाम की [ब्राउज़र कमांड](/docs/api/browser) हैं, जो सेशन के पहले कॉन्टेक्स्ट के बजाय इस कॉन्टेक्स्ट पर लागू होती हैं। ये समान आर्ग्युमेंट लेती हैं।

| कमांड | ब्राउज़िंग कॉन्टेक्स्ट में |
| --- | --- |
| [`$`](/docs/api/browser/$), [`$$`](/docs/api/browser/$$), [`custom$`](/docs/api/browser/custom$), [`custom$$`](/docs/api/browser/custom$$), [`react$`](/docs/api/browser/react$), [`react$$`](/docs/api/browser/react$$) | इस कॉन्टेक्स्ट के डॉक्यूमेंट में एलिमेंट खोजें। |
| [`execute`](/docs/api/browser/execute) | इस कॉन्टेक्स्ट के डॉक्यूमेंट में स्क्रिप्ट चलाएँ। |
| [`action`](/docs/api/browser/action), [`actions`](/docs/api/browser/actions), [`keys`](/docs/api/browser/keys), [`scroll`](/docs/api/browser/scroll) | इस कॉन्टेक्स्ट को इनपुट भेजें, तब भी जब यह बैकग्राउंड टैब हो। |
| [`saveScreenshot`](/docs/api/browser/saveScreenshot), [`savePDF`](/docs/api/browser/savePDF) | इस कॉन्टेक्स्ट को कैप्चर करें। |
| [`getCookies`](/docs/api/browser/getCookies), [`setCookies`](/docs/api/browser/setCookies), [`deleteCookies`](/docs/api/browser/deleteCookies) | इस कॉन्टेक्स्ट के स्टोरेज पार्टीशन की कुकीज़ पढ़ें और बदलें। |
| [`setViewport`](/docs/api/browser/setViewport) | इस टैब या विंडो के व्यूपोर्ट का आकार बदलें। |
| [`addInitScript`](/docs/api/browser/addInitScript) | पेज स्क्रिप्ट से पहले एक स्क्रिप्ट चलाएँ, केवल इसी टैब या विंडो में। |
| [`mock`](/docs/api/browser/mock), [`mockClearAll`](/docs/api/browser/mockClearAll), [`mockRestoreAll`](/docs/api/browser/mockRestoreAll) | केवल इसी टैब या विंडो के रिक्वेस्ट को मॉक करें। टैब बंद होने पर उसका मॉक समाप्त हो जाता है। |
| [`emulate`](/docs/api/browser/emulate) | किसी डिवाइस प्रॉपर्टी, जैसे जियोलोकेशन या क्लॉक, को केवल इसी टैब या विंडो में एमुलेट करें। |
| [`restore`](/docs/api/browser/restore) | एमुलेशन को रिस्टोर करें, `browser.restore()` के समान। |
| [`waitUntil`](/docs/api/browser/waitUntil), [`pause`](/docs/api/browser/pause) | ब्राउज़र पर जैसा ही। |

```ts title="test/specs/mock.e2e.ts"
import { browser, expect } from '@wdio/globals'

it('mocks the requests of one tab only', async () => {
    const page = await browser.url('https://webdriver.io')
    const tab = await browser.newWindow('https://webdriver.io', { type: 'tab' })

    const mock = await tab.mock('**/api/users')
    mock.respond([{ name: 'Mocked user' }])

    // `tab` के रिक्वेस्ट को मॉक किया गया रिस्पॉन्स मिलता है, `page` के रिक्वेस्ट सर्वर तक पहुँचते हैं
})
```

### केवल टॉप-लेवल

फ़्रेम अपने टैब की हिस्ट्री, व्यूपोर्ट, नेटवर्क और एमुलेशन साझा करता है, इसलिए ये कमांड किसी फ़्रेम पर `` `<command>` is only available on a top-level browsing context `` के साथ रिजेक्ट हो जाती हैं। इन्हें टैब पर कॉल करें: `frame.parent` जब तक `parent` `undefined` न हो जाए, या वह कॉन्टेक्स्ट जिस पर आपने `frame()` कॉल किया था।

`back`, `forward`, `activate`, `closeWindow`, `setViewport`, `addInitScript`, `mock`, `mockClearAll`, `mockRestoreAll`, `emulate`, `restore`

### ब्राउज़िंग कॉन्टेक्स्ट पर उपलब्ध नहीं

सेशन कमांड, जैसे `deleteSession`, `newWindow` या `browsingContexts`, केवल [ब्राउज़र ऑब्जेक्ट](/docs/api/browser) पर उपलब्ध हैं। कस्टम कमांड भी: [`addCommand`](/docs/customcommands) और `overwriteCommand` किसी कॉन्टेक्स्ट पर रिजेक्ट हो जाते हैं, इन्हें `browser` पर रजिस्टर करें।

### इवेंट्स

`on`, `once`, `off`, `emit`, `removeListener` और `removeAllListeners` लिसनर को ब्राउज़र पर रजिस्टर करते हैं, इसलिए इवेंट पूरे सेशन के होते हैं। उदाहरण के लिए, किसी भी टैब या फ़्रेम में प्रॉम्प्ट के लिए [`dialog`](/docs/api/dialog) इवेंट फ़ायर होता है।

## ब्राउज़िंग कॉन्टेक्स्ट के एलिमेंट

किसी कॉन्टेक्स्ट के माध्यम से प्राप्त किया गया एलिमेंट उसी कॉन्टेक्स्ट का होता है। `click`, `setValue` या `getText` जैसी एलिमेंट कमांड उस कॉन्टेक्स्ट के डॉक्यूमेंट में चलती हैं, तब भी जब वह बैकग्राउंड टैब या फ़्रेम हो। ये ड्राइवरों की तरह WebDriver स्पेक का पालन करती हैं, इसलिए ये सामने वाले पेज के एलिमेंट के समान परिणाम और समान एरर (जैसे `element click intercepted`) रिटर्न करती हैं। `getComputedRole` और `getComputedLabel` सेशन के पहले कॉन्टेक्स्ट के अलावा किसी अन्य कॉन्टेक्स्ट के एलिमेंट के लिए रिजेक्ट हो जाते हैं।

```ts
const page = await browser.url('https://the-internet.herokuapp.com/nested_frames')
const bottom = await page.frame({ selector: 'frame[name="frame-bottom"]' })
const body = await bottom.$('body')
console.log(await body.getText()) // आउटपुट: "BOTTOM"
```

## समस्या निवारण

| एरर | कारण और समाधान |
| --- | --- |
| `` `switchFrame` was removed for WebDriver BiDi sessions in WebdriverIO v10. `` | `browser.url()` या `browser.newWindow()` द्वारा रिटर्न किए गए कॉन्टेक्स्ट पर [`frame()`](/docs/api/browsingContext/frame) कॉल करें। |
| `` `switchWindow` was removed for WebDriver BiDi sessions in WebdriverIO v10. `` | `browser.url()` या `browser.newWindow()` द्वारा रिटर्न किए गए कॉन्टेक्स्ट को अपने पास रखें, या `browser.browsingContexts()` से कोई कॉन्टेक्स्ट खोजें। |
| `` `frame()` needs a WebDriver BiDi session, but this session uses WebDriver Classic `` | सेशन एक Classic सेशन है (जैसे Appium या Safari)। संदेश में बताई गई Classic कमांड का उपयोग करें। |
| `` `<command>` is only available on a top-level browsing context `` | कमांड किसी फ़्रेम पर कॉल की गई थी। इसे फ़्रेम के टैब पर कॉल करें, देखें [केवल टॉप-लेवल](#top-level-only)। |
| `` `addCommand` is only available on the browser, not on a browsing context `` | कस्टम कमांड को `browser` पर रजिस्टर करें। |
| `no such frame: the frame "…" was discarded because the page it belongs to navigated away` | जिस पेज में फ़्रेम था, वह नेविगेट हो गया। नए पेज पर `frame()` से फ़्रेम को फिर से प्राप्त करें। |

## संबंधित

- [ब्राउज़र ऑब्जेक्ट](/docs/api/browser)
- [v10 पर माइग्रेट करें: `switchToFrame`](/docs/v10-migration#switchtoframe)
- [डायलॉग](/docs/api/dialog)