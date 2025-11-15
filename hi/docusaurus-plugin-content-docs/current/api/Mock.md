---
id: mock
title: मॉक ऑब्जेक्ट
---

मॉक ऑब्जेक्ट एक ऐसा ऑब्जेक्ट है जो नेटवर्क मॉक का प्रतिनिधित्व करता है और उन अनुरोधों के बारे में जानकारी रखता है जो दिए गए `url` और `filterOptions` से मेल खाते हैं। इसे [`mock`](/docs/api/browser/mock) कमांड का उपयोग करके प्राप्त किया जा सकता है।

:::info

ध्यान दें कि `mock` कमांड का उपयोग करने के लिए Chrome DevTools प्रोटोकॉल के समर्थन की आवश्यकता होती है।
यह समर्थन तब दिया जाता है जब आप स्थानीय रूप से Chromium आधारित ब्राउज़र में टेस्ट चलाते हैं या
आप Selenium Grid v4 या उससे अधिक का उपयोग करते हैं। यह कमांड तब __नहीं__ उपयोग किया जा सकता जब
क्लाउड में स्वचालित परीक्षण चलाते हैं। [Automation Protocols](/docs/automationProtocols) सेक्शन में अधिक जानकारी प्राप्त करें।

:::

आप WebdriverIO में अनुरोधों और प्रतिक्रियाओं को मॉक करने के बारे में हमारे [Mocks and Spies](/docs/mocksandspies) गाइड में और पढ़ सकते हैं।

## प्रॉपर्टीज

एक मॉक ऑब्जेक्ट में निम्नलिखित प्रॉपर्टीज होती हैं:

| नाम | प्रकार | विवरण |
| ---- | ---- | ------- |
| `url` | `String` | मॉक कमांड में दिया गया url |
| `filterOptions` | `Object` | मॉक कमांड में दिए गए रिसोर्स फिल्टर ऑप्शन्स |
| `browser` | `Object` | मॉक ऑब्जेक्ट प्राप्त करने के लिए उपयोग किया गया [Browser Object](/docs/api/browser)। |
| `calls` | `Object[]` | मैचिंग ब्राउज़र अनुरोधों के बारे में जानकारी, जिसमें `url`, `method`, `headers`, `initialPriority`, `referrerPolic`, `statusCode`, `responseHeaders` और `body` जैसी प्रॉपर्टीज शामिल हैं |

## मेथड्स

मॉक ऑब्जेक्ट विभिन्न कमांड प्रदान करते हैं, जो `mock` सेक्शन में सूचीबद्ध हैं, जो उपयोगकर्ताओं को अनुरोध या प्रतिक्रिया के व्यवहार को संशोधित करने की अनुमति देते हैं।

- [`abort`](/docs/api/mock/abort)
- [`abortOnce`](/docs/api/mock/abortOnce)
- [`clear`](/docs/api/mock/clear)
- [`request`](/docs/api/mock/request)
- [`requestOnce`](/docs/api/mock/requestOnce)
- [`respond`](/docs/api/mock/respond)
- [`respondOnce`](/docs/api/mock/respondOnce)
- [`restore`](/docs/api/mock/restore)
- [`waitForResponse`](/docs/api/mock/waitForResponse)

## इवेंट्स

मॉक ऑब्जेक्ट एक EventEmitter है और आपके उपयोग के मामलों के लिए कुछ इवेंट्स एमिट किए जाते हैं।

यहां इवेंट्स की सूची है।

### `request`

यह इवेंट तब एमिट होता है जब मॉक पैटर्न से मेल खाने वाले नेटवर्क अनुरोध को लॉन्च किया जाता है। इवेंट कॉलबैक में अनुरोध पास किया जाता है।

Request इंटरफेस:
```ts
interface RequestEvent {
    requestId: number
    request: Matches
    responseStatusCode: number
    responseHeaders: Record<string, string>
}
```

### `overwrite`

यह इवेंट तब एमिट होता है जब नेटवर्क प्रतिक्रिया को [`respond`](/docs/api/mock/respond) या [`respondOnce`](/docs/api/mock/respondOnce) के साथ ओवरराइट किया जाता है। इवेंट कॉलबैक में प्रतिक्रिया पास की जाती है।

Response इंटरफेस:
```ts
interface OverwriteEvent {
    requestId: number
    responseCode: number
    responseHeaders: Record<string, string>
    body?: string | Record<string, any>
}
```

### `fail`

यह इवेंट तब एमिट होता है जब नेटवर्क अनुरोध को [`abort`](/docs/api/mock/abort) या [`abortOnce`](/docs/api/mock/abortOnce) के साथ निरस्त किया जाता है। इवेंट कॉलबैक में फेल पास किया जाता है।

Fail इंटरफेस:
```ts
interface FailEvent {
    requestId: number
    errorReason: Protocol.Network.ErrorReason
}
```

### `match`

यह इवेंट तब एमिट होता है जब नया मैच जोड़ा जाता है, `continue` या `overwrite` से पहले। इवेंट कॉलबैक में मैच पास किया जाता है।

Match इंटरफेस:
```ts
interface MatchEvent {
    url: string // अनुरोध URL (फ्रैगमेंट के बिना)।
    urlFragment?: string // हैश से शुरू होने वाले अनुरोधित URL का फ्रैगमेंट, यदि मौजूद हो।
    method: string // HTTP अनुरोध विधि।
    headers: Record<string, string> // HTTP अनुरोध हेडर्स।
    postData?: string // HTTP POST अनुरोध डेटा।
    hasPostData?: boolean // सत्य जब अनुरोध में POST डेटा होता है।
    mixedContentType?: MixedContentType // अनुरोध का मिक्स्ड कंटेंट एक्सपोर्ट प्रकार।
    initialPriority: ResourcePriority // अनुरोध भेजने के समय रिसोर्स अनुरोध की प्राथमिकता।
    referrerPolicy: ReferrerPolicy // अनुरोध की रेफरर नीति, जैसा कि https://www.w3.org/TR/referrer-policy/ में परिभाषित है
    isLinkPreload?: boolean // क्या लिंक प्रीलोड के माध्यम से लोड किया जाता है।
    body: string | Buffer | JsonCompatible // वास्तविक रिसोर्स की बॉडी प्रतिक्रिया।
    responseHeaders: Record<string, string> // HTTP प्रतिक्रिया हेडर्स।
    statusCode: number // HTTP प्रतिक्रिया स्टेटस कोड।
    mockedResponse?: string | Buffer // यदि मॉक, इवेंट को एमिट करता है, तो इसकी प्रतिक्रिया भी संशोधित होती है।
}
```

### `continue`

यह इवेंट तब एमिट होता है जब नेटवर्क प्रतिक्रिया न तो ओवरराइट की गई है और न ही बाधित की गई है, या यदि प्रतिक्रिया पहले से ही किसी अन्य मॉक द्वारा भेजी गई है। इवेंट कॉलबैक में `requestId` पास किया जाता है।

## उदाहरण

लंबित अनुरोधों की संख्या प्राप्त करना:

```js
let pendingRequests = 0
const mock = await browser.mock('**') // सभी अनुरोधों से मेल खाना महत्वपूर्ण है अन्यथा, परिणामी मान बहुत भ्रामक हो सकता है।
mock.on('request', ({request}) => {
    pendingRequests++
    console.log(`matched request to ${request.url}, pending ${pendingRequests} requests`)
})
mock.on('match', ({url}) => {
    pendingRequests--
    console.log(`resolved request to ${url}, pending ${pendingRequests} requests`)
})
```

404 नेटवर्क विफलता पर त्रुटि फेंकना:

```js
browser.addCommand('loadPageWithout404', (url, {selector, predicate}) => new Promise(async (resolve, reject) => {
    const mock = await this.mock('**')

    mock.on('match', ({url, statusCode}) => {
        if (statusCode === 404) {
            reject(new Error(`request to ${url} failed with "Not Found"`))
        }
    })

    await this.url(url).catch(reject)

    // यहां प्रतीक्षा कर रहा है, क्योंकि कुछ अनुरोध अभी भी लंबित हो सकते हैं
    if (selector) {
        await this.$(selector).waitForExist().catch(reject)
    }

    if (predicate) {
        await this.waitUntil(predicate).catch(reject)
    }

    resolve()
}))

await browser.loadPageWithout404(browser, 'some/url', { selector: 'main' })
```

यह निर्धारित करना कि क्या मॉक प्रतिक्रिया मान का उपयोग किया गया था:

```js
const firstMock = await browser.mock('**/foo/**')
const secondMock = await browser.mock('**/foo/bar/**')

firstMock.respondOnce({id: 3, title: 'three'})
secondMock.respond({id: 4, title: 'four'})

firstMock.on('overwrite', () => {
    // '**/foo/**' के लिए पहले अनुरोध के लिए ट्रिगर करता है
}).on('continue', () => {
    // '**/foo/**' के लिए बाकी अनुरोधों के लिए ट्रिगर करता है
})

secondMock.on('continue', () => {
    // '**/foo/bar/**' के लिए पहले अनुरोध के लिए ट्रिगर करता है
}).on('overwrite', () => {
    // '**/foo/bar/**' के लिए बाकी अनुरोधों के लिए ट्रिगर करता है
})
```

इस उदाहरण में, `firstMock` पहले परिभाषित किया गया था और इसमें एक `respondOnce` कॉल है, इसलिए पहले अनुरोध के लिए `secondMock` प्रतिक्रिया मान का उपयोग नहीं किया जाएगा, लेकिन बाकी के लिए उपयोग किया जाएगा।