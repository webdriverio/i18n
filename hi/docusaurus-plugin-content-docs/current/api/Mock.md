---
id: mock
title: मॉक ऑब्जेक्ट
---

मॉक ऑब्जेक्ट एक ऐसा ऑब्जेक्ट है जो एक नेटवर्क मॉक का प्रतिनिधित्व करता है और इसमें उन रिक्वेस्ट के बारे में जानकारी होती है जो दिए गए `url` और `filterOptions` से मेल खाती थीं। इसे [`mock`](/docs/api/browser/mock) कमांड का उपयोग करके प्राप्त किया जा सकता है।

:::info

ध्यान दें कि `mock` कमांड का उपयोग करने के लिए Chrome DevTools प्रोटोकॉल का समर्थन आवश्यक है।
यह समर्थन तब उपलब्ध होता है जब आप Chromium आधारित ब्राउज़र में लोकली टेस्ट चलाते हैं या
यदि आप Selenium Grid v4 या उससे ऊपर का उपयोग करते हैं। क्लाउड में ऑटोमेटेड टेस्ट चलाते समय इस कमांड का उपयोग __नहीं__
किया जा सकता। [ऑटोमेशन प्रोटोकॉल](/docs/automationProtocols) सेक्शन में और जानें।

:::

आप WebdriverIO में रिक्वेस्ट और रिस्पॉन्स को मॉक करने के बारे में हमारी [मॉक्स और स्पाइज़](/docs/mocksandspies) गाइड में और पढ़ सकते हैं।

## मल्टी-रिमोट

[मल्टी-रिमोट](/docs/multiremote) ब्राउज़र पर, [`browser.mock()`](/docs/api/browser/mock) इस ऑब्जेक्ट के बजाय एक `MultiRemoteMock` लौटाता है। `instances` ब्राउज़र के नामों की सूची देता है, और `getInstance(name)` उस ब्राउज़र के लिए `Mock` लौटाता है। `respond()`, `restore()`, और नीचे दिए गए अन्य मेथड हर इंस्टेंस पर चलते हैं। `calls` प्रत्येक इंस्टेंस के मॉक पर ही रहता है: `mock.getInstance('myChromeBrowser').calls`।

जब `name`, `instances` में से एक नहीं होता है, तो `getInstance` यह एरर थ्रो करता है: `Multi-remote object has no instance named "<name>"`।

## प्रॉपर्टीज़

एक मॉक ऑब्जेक्ट में निम्नलिखित प्रॉपर्टीज़ होती हैं:

| नाम | टाइप | विवरण |
| ---- | ---- | ------- |
| `url` | `String` | मॉक कमांड में पास किया गया url |
| `filterOptions` | `Object` | मॉक कमांड में पास किए गए रिसोर्स फ़िल्टर विकल्प |
| `browser` | `Object` | मॉक ऑब्जेक्ट प्राप्त करने के लिए उपयोग किया गया [ब्राउज़र ऑब्जेक्ट](/docs/api/browser)। |
| `calls` | `Object[]` | मेल खाने वाली ब्राउज़र रिक्वेस्ट के बारे में जानकारी, जिसमें `url`, `method`, `headers`, `initialPriority`, `referrerPolic`, `statusCode`, `responseHeaders` और `body` जैसी प्रॉपर्टीज़ होती हैं |

## मेथड्स

मॉक ऑब्जेक्ट विभिन्न कमांड प्रदान करते हैं, जो `mock` सेक्शन में सूचीबद्ध हैं, जो उपयोगकर्ताओं को रिक्वेस्ट या रिस्पॉन्स के व्यवहार को बदलने की अनुमति देते हैं।

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

यहाँ इवेंट्स की सूची दी गई है।

### `request`

यह इवेंट तब एमिट होता है जब कोई ऐसी नेटवर्क रिक्वेस्ट शुरू की जाती है जो मॉक पैटर्न से मेल खाती है। रिक्वेस्ट को इवेंट कॉलबैक में पास किया जाता है।

रिक्वेस्ट इंटरफ़ेस:
```ts
interface RequestEvent {
    requestId: number
    request: Matches
    responseStatusCode: number
    responseHeaders: Record<string, string>
}
```

### `overwrite`

यह इवेंट तब एमिट होता है जब नेटवर्क रिस्पॉन्स को [`respond`](/docs/api/mock/respond) या [`respondOnce`](/docs/api/mock/respondOnce) से ओवरराइट किया जाता है। रिस्पॉन्स को इवेंट कॉलबैक में पास किया जाता है।

रिस्पॉन्स इंटरफ़ेस:
```ts
interface OverwriteEvent {
    requestId: number
    responseCode: number
    responseHeaders: Record<string, string>
    body?: string | Record<string, any>
}
```

### `fail`

यह इवेंट तब एमिट होता है जब नेटवर्क रिक्वेस्ट को [`abort`](/docs/api/mock/abort) या [`abortOnce`](/docs/api/mock/abortOnce) से रद्द किया जाता है। Fail को इवेंट कॉलबैक में पास किया जाता है।

Fail इंटरफ़ेस:
```ts
interface FailEvent {
    requestId: number
    errorReason: Protocol.Network.ErrorReason
}
```

### `match`

यह इवेंट तब एमिट होता है जब `continue` या `overwrite` से पहले कोई नया मैच जोड़ा जाता है। मैच को इवेंट कॉलबैक में पास किया जाता है।

मैच इंटरफ़ेस:
```ts
interface MatchEvent {
    url: string // रिक्वेस्ट URL (फ़्रैगमेंट के बिना)।
    urlFragment?: string // हैश से शुरू होने वाला अनुरोधित URL का फ़्रैगमेंट, यदि मौजूद हो।
    method: string // HTTP रिक्वेस्ट मेथड।
    headers: Record<string, string> // HTTP रिक्वेस्ट हेडर्स।
    postData?: string // HTTP POST रिक्वेस्ट डेटा।
    hasPostData?: boolean // True जब रिक्वेस्ट में POST डेटा हो।
    mixedContentType?: MixedContentType // रिक्वेस्ट का मिक्स्ड कंटेंट एक्सपोर्ट टाइप।
    initialPriority: ResourcePriority // रिक्वेस्ट भेजे जाने के समय रिसोर्स रिक्वेस्ट की प्राथमिकता।
    referrerPolicy: ReferrerPolicy // रिक्वेस्ट की रेफ़रर पॉलिसी, जैसा कि https://www.w3.org/TR/referrer-policy/ में परिभाषित है
    isLinkPreload?: boolean // क्या यह लिंक प्रीलोड के माध्यम से लोड किया गया है।
    body: string | Buffer | JsonCompatible // वास्तविक रिसोर्स का बॉडी रिस्पॉन्स।
    responseHeaders: Record<string, string> // HTTP रिस्पॉन्स हेडर्स।
    statusCode: number // HTTP रिस्पॉन्स स्टेटस कोड।
    mockedResponse?: string | Buffer // यदि इवेंट एमिट करने वाले मॉक ने इसके रिस्पॉन्स को भी संशोधित किया हो।
}
```

### `continue`

यह इवेंट तब एमिट होता है जब नेटवर्क रिस्पॉन्स को न तो ओवरराइट किया गया हो और न ही बाधित किया गया हो, या यदि रिस्पॉन्स पहले ही किसी अन्य मॉक द्वारा भेजा जा चुका हो। `requestId` को इवेंट कॉलबैक में पास किया जाता है।

## उदाहरण

लंबित रिक्वेस्ट की संख्या प्राप्त करना:

```js
let pendingRequests = 0
const mock = await browser.mock('**') // सभी रिक्वेस्ट को मैच करना महत्वपूर्ण है, अन्यथा परिणामी मान बहुत भ्रामक हो सकता है।
mock.on('request', ({request}) => {
    pendingRequests++
    console.log(`matched request to ${request.url}, pending ${pendingRequests} requests`)
})
mock.on('match', ({url}) => {
    pendingRequests--
    console.log(`resolved request to ${url}, pending ${pendingRequests} requests`)
})
```

404 नेटवर्क विफलता पर एरर थ्रो करना:

```js
browser.addCommand('loadPageWithout404', (url, {selector, predicate}) => new Promise(async (resolve, reject) => {
    const mock = await this.mock('**')

    mock.on('match', ({url, statusCode}) => {
        if (statusCode === 404) {
            reject(new Error(`request to ${url} failed with "Not Found"`))
        }
    })

    await this.url(url).catch(reject)

    // यहाँ प्रतीक्षा कर रहे हैं, क्योंकि कुछ रिक्वेस्ट अभी भी लंबित हो सकती हैं
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

यह निर्धारित करना कि मॉक respond मान का उपयोग किया गया था या नहीं:

```js
const firstMock = await browser.mock('**/foo/**')
const secondMock = await browser.mock('**/foo/bar/**')

firstMock.respondOnce({id: 3, title: 'three'})
secondMock.respond({id: 4, title: 'four'})

firstMock.on('overwrite', () => {
    // '**/foo/**' की पहली रिक्वेस्ट के लिए ट्रिगर होता है
}).on('continue', () => {
    // '**/foo/**' की बाकी रिक्वेस्ट के लिए ट्रिगर होता है
})

secondMock.on('continue', () => {
    // '**/foo/bar/**' की पहली रिक्वेस्ट के लिए ट्रिगर होता है
}).on('overwrite', () => {
    // '**/foo/bar/**' की बाकी रिक्वेस्ट के लिए ट्रिगर होता है
})
```

इस उदाहरण में, `firstMock` को पहले परिभाषित किया गया था और इसमें एक `respondOnce` कॉल है, इसलिए `secondMock` के रिस्पॉन्स मान का उपयोग पहली रिक्वेस्ट के लिए नहीं किया जाएगा, लेकिन बाकी सभी रिक्वेस्ट के लिए किया जाएगा।