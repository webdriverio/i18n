---
id: mock
title: मॉक ऑब्जेक्ट
---

मॉक ऑब्जेक्ट एक ऐसा ऑब्जेक्ट है जो नेटवर्क मॉक का प्रतिनिधित्व करता है और दिए गए `url` और `filterOptions` से मेल खाने वाले अनुरोधों के बारे में जानकारी रखता है। इसे [`mock`](/docs/api/browser/mock) कमांड का उपयोग करके प्राप्त किया जा सकता है।

:::info

ध्यान दें कि `mock` कमांड का उपयोग करने के लिए Chrome DevTools प्रोटोकॉल के समर्थन की आवश्यकता होती है।
यह समर्थन तब मिलता है जब आप स्थानीय रूप से Chromium आधारित ब्राउज़र में परीक्षण चलाते हैं या
Selenium Grid v4 या उससे उच्च संस्करण का उपयोग करते हैं। यह कमांड क्लाउड में स्वचालित परीक्षण
चलाते समय उपयोग __नहीं__ की जा सकती है। अधिक जानकारी के लिए [ऑटोमेशन प्रोटोकॉल्स](/docs/automationProtocols) अनुभाग देखें।

:::

आप WebdriverIO में अनुरोधों और प्रतिक्रियाओं को मॉक करने के बारे में हमारे [मॉक्स और स्पाईज़](/docs/mocksandspies) गाइड में अधिक पढ़ सकते हैं।

## प्रॉपर्टीज

एक मॉक ऑब्जेक्ट में निम्नलिखित प्रॉपर्टीज होती हैं:

| नाम | प्रकार | विवरण |
| ---- | ---- | ------- |
| `url` | `String` | मॉक कमांड में पास किया गया url |
| `filterOptions` | `Object` | मॉक कमांड में पास किए गए रिसोर्स फिल्टर विकल्प |
| `browser` | `Object` | मॉक ऑब्जेक्ट प्राप्त करने के लिए उपयोग किया गया [ब्राउज़र ऑब्जेक्ट](/docs/api/browser)। |
| `calls` | `Object[]` | मैचिंग ब्राउज़र अनुरोधों के बारे में जानकारी, जिसमें `url`, `method`, `headers`, `initialPriority`, `referrerPolic`, `statusCode`, `responseHeaders` और `body` जैसी प्रॉपर्टीज शामिल हैं |

## मेथड्स

मॉक ऑब्जेक्ट विभिन्न कमांड्स प्रदान करते हैं, जो `mock` सेक्शन में सूचीबद्ध हैं, जो उपयोगकर्ताओं को अनुरोध या प्रतिक्रिया के व्यवहार को संशोधित करने की अनुमति देते हैं।

- [`abort`](/docs/api/mock/abort)
- [`abortOnce`](/docs/api/mock/abortOnce)
- [`clear`](/docs/api/mock/clear)
- [`request`](/docs/api/mock/request)
- [`requestOnce`](/docs/api/mock/requestOnce)
- [`respond`](/docs/api/mock/respond)
- [`respondOnce`](/docs/api/mock/respondOnce)
- [`restore`](/docs/api/mock/restore)

## इवेंट्स

मॉक ऑब्जेक्ट एक EventEmitter है और आपके उपयोग के लिए कुछ इवेंट्स भेजे जाते हैं।

यहां इवेंट्स की सूची है।

### `request`

यह इवेंट तब भेजा जाता है जब मॉक पैटर्न से मेल खाने वाला नेटवर्क अनुरोध शुरू किया जाता है। अनुरोध इवेंट कॉलबैक में पास किया जाता है।

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

यह इवेंट तब भेजा जाता है जब नेटवर्क प्रतिक्रिया को [`respond`](/docs/api/mock/respond) या [`respondOnce`](/docs/api/mock/respondOnce) के साथ ओवरराइट किया जाता है। प्रतिक्रिया इवेंट कॉलबैक में पास की जाती है।

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

यह इवेंट तब भेजा जाता है जब नेटवर्क अनुरोध को [`abort`](/docs/api/mock/abort) या [`abortOnce`](/docs/api/mock/abortOnce) के साथ रद्द किया जाता है। फेल इवेंट कॉलबैक में पास किया जाता है।

Fail इंटरफेस:
```ts
interface FailEvent {
    requestId: number
    errorReason: Protocol.Network.ErrorReason
}
```

### `match`

यह इवेंट तब भेजा जाता है जब `continue` या `overwrite` से पहले नया मैच जोड़ा जाता है। मैच इवेंट कॉलबैक में पास किया जाता है।

Match इंटरफेस:
```ts
interface MatchEvent {
    url: string // अनुरोध URL (फ्रैगमेंट के बिना)।
    urlFragment?: string // हैश से शुरू होने वाला अनुरोधित URL का फ्रैगमेंट, यदि मौजूद हो।
    method: string // HTTP अनुरोध विधि।
    headers: Record<string, string> // HTTP अनुरोध हेडर्स।
    postData?: string // HTTP POST अनुरोध डेटा।
    hasPostData?: boolean // सत्य जब अनुरोध में POST डेटा हो।
    mixedContentType?: MixedContentType // अनुरोध का मिश्रित सामग्री निर्यात प्रकार।
    initialPriority: ResourcePriority // अनुरोध भेजे जाने के समय संसाधन अनुरोध की प्राथमिकता।
    referrerPolicy: ReferrerPolicy // अनुरोध की रेफरर नीति, जैसा कि https://www.w3.org/TR/referrer-policy/ में परिभाषित किया गया है
    isLinkPreload?: boolean // क्या लिंक प्रीलोड के माध्यम से लोड किया गया है।
    body: string | Buffer | JsonCompatible // वास्तविक संसाधन की बॉडी प्रतिक्रिया।
    responseHeaders: Record<string, string> // HTTP प्रतिक्रिया हेडर्स।
    statusCode: number // HTTP प्रतिक्रिया स्टेटस कोड।
    mockedResponse?: string | Buffer // यदि मॉक, इवेंट को भेजता है, और इसके साथ ही अपनी प्रतिक्रिया को संशोधित भी करता है।
}
```

### `continue`

यह इवेंट तब भेजा जाता है जब नेटवर्क प्रतिक्रिया को न तो ओवरराइट किया गया है और न ही बाधित किया गया है, या यदि प्रतिक्रिया पहले से ही किसी अन्य मॉक द्वारा भेजी गई है। इवेंट कॉलबैक में `requestId` पास किया जाता है।

## उदाहरण

लंबित अनुरोधों की संख्या प्राप्त करना:

```js
let pendingRequests = 0
const mock = await browser.mock('**') // सभी अनुरोधों को मैच करना महत्वपूर्ण है अन्यथा, परिणामी मूल्य बहुत भ्रामक हो सकता है।
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

    // यहां प्रतीक्षा कर रहे हैं, क्योंकि कुछ अनुरोध अभी भी लंबित हो सकते हैं
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

यह निर्धारित करना कि क्या मॉक रिस्पॉन्ड वैल्यू का उपयोग किया गया था:

```js
const firstMock = await browser.mock('**/foo/**')
const secondMock = await browser.mock('**/foo/bar/**')

firstMock.respondOnce({id: 3, title: 'three'})
secondMock.respond({id: 4, title: 'four'})

firstMock.on('overwrite', () => {
    // '**/foo/**' के लिए पहले अनुरोध के लिए ट्रिगर होता है
}).on('continue', () => {
    // '**/foo/**' के लिए बाकी अनुरोधों के लिए ट्रिगर होता है
})

secondMock.on('continue', () => {
    // '**/foo/bar/**' के लिए पहले अनुरोध के लिए ट्रिगर होता है
}).on('overwrite', () => {
    // '**/foo/bar/**' के लिए बाकी अनुरोधों के लिए ट्रिगर होता है
})
```

इस उदाहरण में, `firstMock` पहले परिभाषित किया गया था और इसमें एक `respondOnce` कॉल है, इसलिए पहले अनुरोध के लिए `secondMock` प्रतिक्रिया मान का उपयोग नहीं किया जाएगा, लेकिन बाकी अनुरोधों के लिए इसका उपयोग किया जाएगा।