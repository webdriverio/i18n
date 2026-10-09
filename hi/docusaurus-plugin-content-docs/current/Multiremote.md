---
id: multiremote
title: मल्टी-रिमोट
description: "मल्टी-रिमोट की मदद से एक ही टेस्ट से कई ब्राउज़र या डिवाइस सेशन नियंत्रित करें, स्टैंडअलोन मोड में या WDIO टेस्टरनर के साथ।"
---

WebdriverIO आपको एक ही टेस्ट में कई स्वचालित सेशन चलाने की सुविधा देता है। यह तब काम आता है जब आप ऐसी सुविधाओं का परीक्षण कर रहे हों जिनके लिए कई उपयोगकर्ताओं की आवश्यकता होती है (उदाहरण के लिए, चैट या WebRTC एप्लिकेशन)।

कई रिमोट इंस्टेंस बनाने के बजाय, जहाँ आपको हर इंस्टेंस पर [`newSession`](/docs/api/webdriver#newsession) या [`url`](/docs/api/browser/url) जैसे सामान्य कमांड चलाने पड़ते हैं, आप बस एक **मल्टी-रिमोट** इंस्टेंस बना सकते हैं और सभी ब्राउज़रों को एक साथ नियंत्रित कर सकते हैं।

ऐसा करने के लिए, बस `multiRemote()` फ़ंक्शन का उपयोग करें, और एक ऑब्जेक्ट पास करें जिसमें नाम कुंजियाँ (keys) हों और `capabilities` उनके मान (values) हों। प्रत्येक capability को एक नाम देकर, आप किसी एक इंस्टेंस पर कमांड चलाते समय उस इंस्टेंस को आसानी से चुन और एक्सेस कर सकते हैं।

:::info

MultiRemote का उद्देश्य आपके सभी टेस्ट को समानांतर (parallel) में चलाना _नहीं_ है।
इसका उद्देश्य विशेष इंटीग्रेशन टेस्ट (जैसे चैट एप्लिकेशन) के लिए कई ब्राउज़रों और/या मोबाइल डिवाइसों के बीच समन्वय करने में मदद करना है।

:::

अधिकांश मल्टी-रिमोट कमांड परिणामों की एक array लौटाते हैं। पहला परिणाम capability ऑब्जेक्ट में सबसे पहले परिभाषित capability को दर्शाता है, दूसरा परिणाम दूसरी capability को, और इसी तरह आगे। `mock()` एक array के बजाय `MultiRemoteMock` लौटाता है। देखें [mock() क्या लौटाता है](#what-mock-returns)।

## स्टैंडअलोन मोड का उपयोग

यहाँ __स्टैंडअलोन मोड__ में मल्टी-रिमोट इंस्टेंस बनाने का एक उदाहरण है:

```js
import { multiRemote } from 'webdriverio'

(async () => {
    const browser = await multiRemote({
        myChromeBrowser: {
            capabilities: {
                browserName: 'chrome'
            }
        },
        myFirefoxBrowser: {
            capabilities: {
                browserName: 'firefox'
            }
        }
    })

    // दोनों ब्राउज़रों में एक साथ url खोलें
    await browser.url('http://json.org')

    // कमांड एक साथ चलाएँ
    const title = await browser.getTitle()
    expect(title).toEqual(['JSON', 'JSON'])

    // एक साथ किसी एलिमेंट पर क्लिक करें
    const elem = await browser.$('#someElem')
    await elem.click()

    // केवल एक ब्राउज़र (Firefox) से क्लिक करें
    await elem.getInstance('myFirefoxBrowser').click()
})()
```

## WDIO टेस्टरनर का उपयोग

WDIO टेस्टरनर में मल्टी-रिमोट का उपयोग करने के लिए, बस अपनी `wdio.conf.js` में `capabilities` ऑब्जेक्ट को ऐसे ऑब्जेक्ट के रूप में परिभाषित करें जिसमें ब्राउज़र के नाम कुंजियाँ हों (capabilities की सूची के बजाय):

```js
export const config = {
    // ...
    capabilities: {
        myChromeBrowser: {
            capabilities: {
                browserName: 'chrome'
            }
        },
        myFirefoxBrowser: {
            capabilities: {
                browserName: 'firefox'
            }
        }
    }
    // ...
}
```

यह Chrome और Firefox के साथ दो WebDriver सेशन बनाएगा। केवल Chrome और Firefox के बजाय आप [Appium](http://appium.io) का उपयोग करके दो मोबाइल डिवाइस, या एक मोबाइल डिवाइस और एक ब्राउज़र भी शुरू कर सकते हैं।

आप ब्राउज़र capabilities ऑब्जेक्ट को एक array में रखकर मल्टी-रिमोट को समानांतर में भी चला सकते हैं। कृपया सुनिश्चित करें कि प्रत्येक ब्राउज़र में `capabilities` फ़ील्ड शामिल हो, क्योंकि इसी से हम प्रत्येक मोड को अलग पहचानते हैं।

```js
export const config = {
    // ...
    capabilities: [{
        myChromeBrowser0: {
            capabilities: {
                browserName: 'chrome'
            }
        },
        myFirefoxBrowser0: {
            capabilities: {
                browserName: 'firefox'
            }
        }
    }, {
        myChromeBrowser1: {
            capabilities: {
                browserName: 'chrome'
            }
        },
        myFirefoxBrowser1: {
            capabilities: {
                browserName: 'firefox'
            }
        }
    }]
    // ...
}
```

आप स्थानीय Webdriver/Appium, या Selenium Standalone इंस्टेंस के साथ-साथ किसी एक [क्लाउड सर्विस बैकएंड](https://webdriver.io/docs/cloudservices.html) को भी शुरू कर सकते हैं। यदि आपने ब्राउज़र capabilities में `bstack:options` ([Browserstack](https://webdriver.io/docs/browserstack-service.html)), `sauce:options` ([SauceLabs](https://webdriver.io/docs/sauce-service.html)), या `tb:options` ([TestingBot](https://webdriver.io/docs/testingbot-service.html)) में से कोई भी निर्दिष्ट किया है, तो WebdriverIO स्वचालित रूप से क्लाउड बैकएंड capabilities का पता लगा लेता है।

```js
export const config = {
    // ...
    user: process.env.BROWSERSTACK_USERNAME,
    key: process.env.BROWSERSTACK_ACCESS_KEY,
    capabilities: {
        myChromeBrowser: {
            capabilities: {
                browserName: 'chrome'
            }
        },
        myBrowserStackFirefoxBrowser: {
            capabilities: {
                browserName: 'firefox',
                'bstack:options': {
                    // ...
                }
            }
        }
    },
    services: [
        ['browserstack', 'selenium-standalone']
    ],
    // ...
}
```

यहाँ किसी भी प्रकार का OS/ब्राउज़र संयोजन संभव है (मोबाइल और डेस्कटॉप ब्राउज़र सहित)। आपके टेस्ट `browser` वेरिएबल के माध्यम से जो भी कमांड चलाते हैं, वे प्रत्येक इंस्टेंस के साथ समानांतर में निष्पादित होते हैं। यह आपके इंटीग्रेशन टेस्ट को सुव्यवस्थित करने और उनके निष्पादन को तेज़ करने में मदद करता है।

उदाहरण के लिए, यदि आप कोई URL खोलते हैं:

```js
browser.url('https://socketio-chat-h9jt.herokuapp.com/')
```

प्रत्येक कमांड का परिणाम एक ऑब्जेक्ट होगा जिसमें ब्राउज़र के नाम कुंजी के रूप में और कमांड का परिणाम मान के रूप में होगा, इस तरह:

```js
// wdio टेस्टरनर उदाहरण
await browser.url('https://www.whatismybrowser.com')

const elem = await $('.string-major')
const result = await elem.getText()

console.log(result[0]) // लौटाता है: 'Chrome 40 on Mac OS X (Yosemite)'
console.log(result[1]) // लौटाता है: 'Firefox 35 on Mac OS X (Yosemite)'
```

ध्यान दें कि प्रत्येक कमांड एक-एक करके निष्पादित होता है। इसका मतलब है कि कमांड तब पूरा होता है जब सभी ब्राउज़र उसे निष्पादित कर चुके होते हैं। यह उपयोगी है क्योंकि इससे ब्राउज़र की क्रियाएँ सिंक में रहती हैं, जिससे यह समझना आसान हो जाता है कि वर्तमान में क्या हो रहा है।

कभी-कभी किसी चीज़ का परीक्षण करने के लिए प्रत्येक ब्राउज़र में अलग-अलग काम करना आवश्यक होता है। उदाहरण के लिए, यदि हम किसी चैट एप्लिकेशन का परीक्षण करना चाहते हैं, तो एक ब्राउज़र होना चाहिए जो टेक्स्ट संदेश भेजे जबकि दूसरा ब्राउज़र उसे प्राप्त करने की प्रतीक्षा करे, और फिर उस पर एक assertion चलाया जाए।

WDIO टेस्टरनर का उपयोग करते समय, यह ब्राउज़र के नामों को उनके इंस्टेंस के साथ ग्लोबल स्कोप में रजिस्टर करता है:

```js
const myChromeBrowser = browser.getInstance('myChromeBrowser')
await myChromeBrowser.$('#message').setValue('Hi, I am Chrome')
await myChromeBrowser.$('#send').click()

// संदेशों के आने तक प्रतीक्षा करें
await $('.messages').waitForExist()
// जाँचें कि क्या कोई संदेश Chrome वाला संदेश रखता है
assert.true(
    (
        await $$('.messages').map((m) => m.getText())
    ).includes('Hi, I am Chrome')
)
```

इस उदाहरण में, `myChromeBrowser` इंस्टेंस द्वारा `#send` बटन पर क्लिक करते ही `myFirefoxBrowser` इंस्टेंस संदेश की प्रतीक्षा करना शुरू कर देगा।

MultiRemote कई ब्राउज़रों को नियंत्रित करना आसान और सुविधाजनक बनाता है, चाहे आप चाहते हों कि वे समानांतर में एक ही काम करें, या मिलकर अलग-अलग काम करें।

### `$` क्या लौटाता है

मल्टी-रिमोट ब्राउज़र पर, `$`, `custom$` और `react$` एक `MultiRemoteElement` लौटाते हैं। मल्टी-रिमोट एलिमेंट पर, `shadow$`, `nextElement`, `previousElement` और `parentElement` भी एक ही लौटाते हैं। इसके कमांड हर इंस्टेंस पर चलते हैं, और `getInstance` किसी एक ब्राउज़र का एलिमेंट देता है।

```js
const host = await $('my-component')
const button = await host.shadow$('button')

await button.click()                                  // हर ब्राउज़र में क्लिक करता है
await button.getInstance('myChromeBrowser').click()  // केवल Chrome में क्लिक करता है
```

### `$$` क्या लौटाता है

मल्टी-रिमोट ब्राउज़र पर, `$$` एक `MultiRemoteElementArray` लौटाता है। प्रत्येक प्रविष्टि एक `MultiRemoteElement` है जो एक साथ हर इंस्टेंस को संबोधित करती है, और array स्वयं वही जानकारी रखती है जो एक सामान्य `ElementArray` रखती है। `custom$$`, `react$$` और, मल्टी-रिमोट एलिमेंट पर, `shadow$$` भी इसी प्रकार की सूची लौटाते हैं।

```js
const messages = await $$('.messages')

messages.length      // किसी एक इंस्टेंस द्वारा पाए गए एलिमेंट्स की सबसे बड़ी संख्या
messages[0]          // एक MultiRemoteElement, जो सभी इंस्टेंस को संबोधित करता है
messages.selector    // '.messages'
messages.foundWith   // '$$'
messages.parent      // वह मल्टी-रिमोट ब्राउज़र या एलिमेंट जिससे इसे प्राप्त किया गया था
messages.isMultiRemote // true, ताकि इसे सामान्य ElementArray से अलग पहचाना जा सके

// async array हेल्पर्स उपलब्ध हैं, जैसे एकल ब्राउज़र पर
await messages.map((m) => m.getText())
await messages.filter(async (m) => await m.isDisplayed())
```

जब इंस्टेंस अलग-अलग संख्या में एलिमेंट्स पाते हैं, तो किसी प्रविष्टि में उस इंस्टेंस के लिए कोई एलिमेंट नहीं होता जिसने कम एलिमेंट्स पाए। उस इंस्टेंस के लिए, `getInstance()` त्रुटि (throw) देता है, और प्रविष्टि पर कोई कमांड विफल हो जाता है। उन इंस्टेंस के साथ `select()` का उपयोग करें जिनके पास एलिमेंट है। पूरी सूची पर एक `expect` matcher प्रत्येक इंस्टेंस को उसके अपने एलिमेंट्स के साथ जाँचता है:

```js
// myChromeBrowser 3 संदेश पाता है, myFirefoxBrowser 2 संदेश पाता है
const messages = await $$('.messages')

messages.length                                       // 3
await messages[2].select('myChromeBrowser').click()  // केवल Chrome के पास तीसरा संदेश है
await expect(messages).toBeElementsArrayOfSize(expect.multiRemote({
    myChromeBrowser: 3,
    myFirefoxBrowser: 2
}))
```

:::info

v10 से पहले यह एक सामान्य array लौटाता था, जब तक कि `WDIO_ENABLE_MULTI_REMOTE_ELEMENT_ARRAY=true` सेट न किया गया हो। अब यह array डिफ़ॉल्ट है और environment variable हटा दिया गया है। इंडेक्स एक्सेस अपरिवर्तित है, इसलिए जो कोड केवल `elements[0]` पढ़ता था, वह काम करता रहेगा।

:::

### mock() क्या लौटाता है {#what-mock-returns}

मल्टी-रिमोट ब्राउज़र पर, `mock()` एक `MultiRemoteMock` लौटाता है। यह एक array नहीं है। `respond()`, `restore()`, और अन्य mock मेथड हर इंस्टेंस पर चलते हैं। कैप्चर किए गए अनुरोध एक ब्राउज़र के mock पर ही रहते हैं, इसलिए उन्हें `getInstance` से पढ़ें:

```ts
const mock = await browser.mock('*/users/list')

mock.instances // ['myChromeBrowser', 'myFirefoxBrowser']
mock.respond([{ id: 1 }])

const chromeCalls = mock.getInstance('myChromeBrowser').calls
const firefoxCalls = mock.getInstance('myFirefoxBrowser').calls
```

`examples/bidi/multiremote-mock.js` इसे दो headless Chrome सेशन पर चलाता है।

`instances` उसी क्रम का पालन करता है जिसमें mocks बनाए गए थे। `select()` के बाद, वह क्रम `browser.instances` से भिन्न हो सकता है:

```ts
const selected = await browser.select('myFirefoxBrowser', 'myChromeBrowser').mock('*/users/list')

selected.instances // ['myFirefoxBrowser', 'myChromeBrowser']
selected.getInstance('myChromeBrowser') // Chrome mock, क्रम चाहे जो भी हो
```

जब `name`, `instances` में नहीं होता, तो `getInstance` त्रुटि `Multi-remote object has no instance named "<name>"` देता है।

केवल एक ब्राउज़र को mock करने के लिए, उस इंस्टेंस पर `mock()` कॉल करें:

```ts
const chromeOnly = await browser.getInstance('myChromeBrowser').mock('*/users/list')
```

## browser ऑब्जेक्ट के माध्यम से स्ट्रिंग्स का उपयोग करके ब्राउज़र इंस्टेंस एक्सेस करना
ब्राउज़र इंस्टेंस को उनके ग्लोबल वेरिएबल्स (जैसे `myChromeBrowser`, `myFirefoxBrowser`) के माध्यम से एक्सेस करने के अलावा, आप उन्हें `browser` ऑब्जेक्ट के माध्यम से भी एक्सेस कर सकते हैं, जैसे `browser["myChromeBrowser"]` या `browser["myFirefoxBrowser"]`। आप `browser.instances` के माध्यम से अपने सभी इंस्टेंस की सूची प्राप्त कर सकते हैं। यह विशेष रूप से तब उपयोगी है जब पुन: उपयोग योग्य टेस्ट स्टेप्स लिखे जा रहे हों जो किसी भी ब्राउज़र में किए जा सकते हैं, जैसे:

wdio.conf.js:
```js
    capabilities: {
        userA: {
            capabilities: {
                browserName: 'chrome'
            }
        },
        userB: {
            capabilities: {
                browserName: 'chrome'
            }
        }
    }
```

Cucumber फ़ाइल:
    ```feature
    When User A types a message into the chat
    ```

स्टेप डेफ़िनिशन फ़ाइल:
```js
When(/^User (.) types a message into the chat/, async (userId) => {
    await browser.getInstance(`user${userId}`).$('#message').setValue('Hi, I am Chrome')
    await browser.getInstance(`user${userId}`).$('#send').click()
})
```

## Assertions

`expect` matchers मल्टी-रिमोट ब्राउज़र, एलिमेंट्स और mocks का समर्थन करते हैं। डिफ़ॉल्ट रूप से, हर इंस्टेंस को अपेक्षित मान से मेल खाना चाहिए:

```js
import { multiRemoteBrowser, expect } from '@wdio/globals'

await expect(multiRemoteBrowser).toHaveTitle('My App')
await expect(multiRemoteBrowser.$('h1')).toHaveText('Welcome')
```

प्रत्येक इंस्टेंस के लिए अलग मान की अपेक्षा करने के लिए, प्रत्येक इंस्टेंस नाम के लिए एक मान के साथ `expect.multiRemote()` का उपयोग करें:

```js
import { multiRemoteBrowser, expect } from '@wdio/globals'

await expect(multiRemoteBrowser).toHaveTitle(expect.multiRemote({
    myChromeBrowser: 'My App',
    myFirefoxBrowser: expect.stringContaining('App')
}))
```

सभी समर्थित matchers और आवश्यक कॉन्फ़िगरेशन के लिए, [expect-webdriverio मल्टी-रिमोट गाइड](https://github.com/webdriverio/expect-webdriverio/blob/main/docs/MultiRemote.md) देखें।

## किसी एक इंस्टेंस को एक्सेस करना

इंस्टेंस नाम मल्टी-रिमोट ब्राउज़र या मल्टी-रिमोट एलिमेंट की प्रॉपर्टी नहीं हैं। `browser.myChromeBrowser` और `elem.myChromeDriver` सेट नहीं होते। `getInstance` से सेशन माँगें, या `select` से मल्टी-रिमोट ऑब्जेक्ट को सीमित करें:

```ts
const myChromeBrowser = browser.getInstance('myChromeBrowser')
await myChromeBrowser?.$$('button')

const myChromeElement = (await browser.$('button')).getInstance('myChromeBrowser')
await myChromeElement.click()

await browser.select('myChromeBrowser').url('https://webdriver.io')
```

जब `injectGlobals` चालू छोड़ा जाता है, तो टेस्टरनर अभी भी प्रत्येक इंस्टेंस नाम को उसके अपने ग्लोबल के रूप में असाइन करता है, ताकि कोई टेस्ट `browser` से होकर गए बिना `myChromeBrowser.$('button')` कॉल कर सके। वह ग्लोबल `getInstance` से मिलने वाला एकल सेशन है, मल्टी-रिमोट ऑब्जेक्ट पर कोई फ़ील्ड नहीं।