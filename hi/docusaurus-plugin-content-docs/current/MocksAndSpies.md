---
id: mocksandspies
title: रिक्वेस्ट मॉक्स और स्पाइज़
description: "browser.mock के साथ अपने टेस्ट में नेटवर्क रिक्वेस्ट और रिस्पॉन्स को मॉक करें, रिक्वेस्ट को एबॉर्ट करें और स्पाइज़ के साथ कॉल्स का निरीक्षण करें।"
---

WebdriverIO नेटवर्क रिस्पॉन्स को संशोधित करने के लिए बिल्ट-इन सपोर्ट के साथ आता है, जो आपको अपना बैकएंड या मॉक सर्वर सेटअप किए बिना अपने फ्रंटएंड एप्लिकेशन की टेस्टिंग पर ध्यान केंद्रित करने की अनुमति देता है। आप अपने टेस्ट में REST API रिक्वेस्ट जैसे वेब रिसोर्सेज के लिए कस्टम रिस्पॉन्स परिभाषित कर सकते हैं और उन्हें डायनामिक रूप से संशोधित कर सकते हैं।

:::info

ध्यान दें कि `mock` कमांड का उपयोग करने के लिए WebDriver Bidi का सपोर्ट आवश्यक है। आमतौर पर ऐसा तब होता है जब आप Chromium आधारित ब्राउज़र या Firefox में लोकल रूप से टेस्ट चलाते हैं, और साथ ही जब आप Selenium Grid v4 या उससे उच्च वर्ज़न का उपयोग करते हैं। यदि आप क्लाउड में टेस्ट चलाते हैं, तो सुनिश्चित करें कि आपका क्लाउड प्रोवाइडर WebDriver Bidi को सपोर्ट करता है।

:::

## मॉक बनाना

किसी भी रिस्पॉन्स को संशोधित करने से पहले आपको पहले एक मॉक परिभाषित करना होगा। यह मॉक रिसोर्स url द्वारा वर्णित होता है और इसे [request method](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods) या [headers](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers) द्वारा फ़िल्टर किया जा सकता है। रिसोर्स का मिलान एक [`URLPattern`](https://developer.mozilla.org/en-US/docs/Web/API/URLPattern) का उपयोग करके किया जाता है, जहाँ `*` वर्णों के किसी भी क्रम से मेल खाता है। बिना प्रोटोकॉल वाले url का मिलान केवल रिक्वेस्ट के पाथ से किया जाता है, इसलिए `*/users/list` किसी भी ओरिजिन पर उस पाथ से मेल खाता है:

```js
// "/users/list" पर समाप्त होने वाले सभी रिसोर्सेज को मॉक करें
const userListMock = await browser.mock('*/users/list')

// या आप हेडर्स या स्टेटस कोड द्वारा रिसोर्सेज को फ़िल्टर करके मॉक निर्दिष्ट कर सकते हैं,
// केवल json रिसोर्सेज के सफल रिक्वेस्ट को मॉक करें
const strictMock = await browser.mock('*', {
    // सभी json रिस्पॉन्स को मॉक करें
    requestHeaders: { 'Content-Type': 'application/json' },
    // जो सफल रहे थे
    statusCode: 200
})

// स्ट्रिंग के बजाय आप एक `URLPattern` भी पास कर सकते हैं; पॉलीफ़िल
// उन रनटाइम्स में भी काम करता है जिनमें नेटिव URLPattern सपोर्ट नहीं है
import { URLPattern } from 'urlpattern-polyfill'
const patternMock = await browser.mock(new URLPattern({ pathname: '/users/list' }))
```

:::warning

URL वाइल्डकार्ड के लिए एक ही `*` का उपयोग करें; यह `/` से भी मेल खाता है। निश्चित टेक्स्ट से पहले लगातार वाइल्डकार्ड, जैसे `**/api/**` या `**/data.json`, असंबंधित URLs पर अत्यधिक regex बैकट्रैकिंग का कारण बन सकते हैं और टेस्ट को फ्रीज़ कर सकते हैं। देखें [issue #13548](https://github.com/webdriverio/webdriverio/issues/13548)। कंपोनेंट टेस्ट में, रनर ट्रैफ़िक को इंटरसेप्ट से बाहर रखने के लिए एक निश्चित प्रोटोकॉल और होस्टनेम का भी उपयोग करें; देखें [component testing request mocks](/docs/component-testing/mocking#requests)।

:::

## कस्टम रिस्पॉन्स निर्दिष्ट करना

एक बार जब आप मॉक परिभाषित कर लेते हैं, तो आप उसके लिए कस्टम रिस्पॉन्स परिभाषित कर सकते हैं। ये कस्टम रिस्पॉन्स JSON के साथ रिस्पॉन्ड करने के लिए एक ऑब्जेक्ट, कस्टम फ़िक्स्चर के साथ रिस्पॉन्ड करने के लिए एक लोकल फ़ाइल, या इंटरनेट से किसी रिसोर्स के साथ रिस्पॉन्स को बदलने के लिए एक वेब रिसोर्स हो सकते हैं।

### API रिक्वेस्ट को मॉक करना

उन API रिक्वेस्ट को मॉक करने के लिए जहाँ आप JSON रिस्पॉन्स की अपेक्षा करते हैं, आपको बस मॉक ऑब्जेक्ट पर उस मनचाहे ऑब्जेक्ट के साथ `respond` कॉल करना है जिसे आप लौटाना चाहते हैं, उदाहरण के लिए:

```js
const mock = await browser.mock('https://todo-backend-express-knex.herokuapp.com/')

mock.respond([{
    title: 'Injected (non) completed Todo',
    order: null,
    completed: false
}, {
    title: 'Injected completed Todo',
    order: null,
    completed: true
}], {
    headers: {
        'Access-Control-Allow-Origin': '*'
    },
    fetchResponse: false
})

await browser.url('https://todobackend.com/client/index.html?https://todo-backend-express-knex.herokuapp.com/')

await $('#todo-list li').waitForExist()
console.log(await $$('#todo-list li').map(el => el.getText()))
// आउटपुट: "[ 'Injected (non) completed Todo', 'Injected completed Todo' ]"
```

आप निम्नानुसार कुछ मॉक रिस्पॉन्स पैरामीटर्स पास करके रिस्पॉन्स हेडर्स और स्टेटस कोड को भी संशोधित कर सकते हैं:

```js
mock.respond({ ... }, {
    // स्टेटस कोड 404 के साथ रिस्पॉन्ड करें
    statusCode: 404,
    // रिस्पॉन्स हेडर्स को निम्नलिखित हेडर्स के साथ मर्ज करें
    headers: { 'x-custom-header': 'foobar' }
})
```

यदि आप चाहते हैं कि मॉक बैकएंड को बिल्कुल भी कॉल न करे, तो आप `fetchResponse` फ़्लैग के लिए `false` पास कर सकते हैं।

```js
mock.respond({ ... }, {
    // वास्तविक बैकएंड को कॉल न करें
    fetchResponse: false
})
```

`fetchResponse: false` कभी भी बैकएंड को कॉल नहीं करता। `statusCode` या `responseHeaders` फ़िल्टर के साथ बनाए गए मॉक को यह तय करने के लिए उस रिस्पॉन्स की आवश्यकता होती है कि वह मेल खाता है या नहीं, इसलिए यदि आप इन्हें एक साथ उपयोग करते हैं तो `respond()` और `respondOnce()` एरर थ्रो करते हैं। रिस्पॉन्स फ़िल्टर हटा दें, या `fetchResponse` को अनसेट छोड़ दें ताकि मॉक बैकएंड रिस्पॉन्स को पढ़ सके और फिर उसे बदल सके।

कस्टम रिस्पॉन्स को फ़िक्स्चर फ़ाइलों में संग्रहीत करने की सलाह दी जाती है ताकि आप उन्हें अपने टेस्ट में निम्नानुसार आसानी से require कर सकें:

```js
// JSON import assertions को सपोर्ट करने के लिए Node.js v16.14.0 या उससे उच्च वर्ज़न आवश्यक है
import responseFixture from './__fixtures__/apiResponse.json' assert { type: 'json' }
mock.respond(responseFixture)
```

### टेक्स्ट रिसोर्सेज को मॉक करना

यदि आप JavaScript, CSS फ़ाइलों या अन्य टेक्स्ट आधारित रिसोर्सेज जैसे टेक्स्ट रिसोर्सेज को संशोधित करना चाहते हैं, तो आप बस एक फ़ाइल पाथ पास कर सकते हैं और WebdriverIO मूल रिसोर्स को उससे बदल देगा, उदाहरण के लिए:

```js
const scriptMock = await browser.mock('*/script.min.js')
scriptMock.respond('./tests/fixtures/script.js')

// या अपने कस्टम JS के साथ रिस्पॉन्ड करें
scriptMock.respond('alert("I am a mocked resource")')
```

### वेब रिसोर्सेज को रीडायरेक्ट करना

यदि आपका वांछित रिस्पॉन्स पहले से ही वेब पर होस्ट किया गया है, तो आप किसी वेब रिसोर्स को दूसरे वेब रिसोर्स से भी बदल सकते हैं। यह व्यक्तिगत पेज रिसोर्सेज के साथ-साथ स्वयं एक वेबपेज के साथ भी काम करता है, उदाहरण के लिए:

```js
const pageMock = await browser.mock('https://google.com/')
await pageMock.respond('https://webdriver.io')
await browser.url('https://google.com')
console.log(await browser.getTitle()) // "WebdriverIO · Next-gen browser and mobile automation test framework for Node.js" लौटाता है
```

### डायनामिक रिस्पॉन्स

यदि आपका मॉक रिस्पॉन्स मूल रिसोर्स रिस्पॉन्स पर निर्भर करता है, तो आप एक फ़ंक्शन पास करके रिसोर्स को डायनामिक रूप से भी संशोधित कर सकते हैं जो मूल रिस्पॉन्स को पैरामीटर के रूप में प्राप्त करता है और रिटर्न वैल्यू के आधार पर मॉक सेट करता है, उदाहरण के लिए:

```js
const mock = await browser.mock('https://todo-backend-express-knex.herokuapp.com/', {
    method: 'get'
})

mock.respond((req) => {
    // todo कंटेंट को उनकी सूची संख्या से बदलें
    return req.body.map((item, i) => ({ ...item, title: i }))
})

await browser.url('https://todobackend.com/client/index.html?https://todo-backend-express-knex.herokuapp.com/')

await $('#todo-list li').waitForExist()
console.log(await $$('#todo-list li label').map((el) => el.getText()))
// लौटाता है
// [
//   '0',  '1',  '2',  '19', '20',
//   '21', '3',  '4',  '5',  '6',
//   '7',  '8',  '9',  '10', '11',
//   '12', '13', '14', '15', '16',
//   '17', '18', '22'
// ]
```

## मॉक्स को एबॉर्ट करना

कस्टम रिस्पॉन्स लौटाने के बजाय आप निम्नलिखित HTTP एरर्स में से किसी एक के साथ रिक्वेस्ट को एबॉर्ट भी कर सकते हैं:

- Failed
- Aborted
- TimedOut
- AccessDenied
- ConnectionClosed
- ConnectionReset
- ConnectionRefused
- ConnectionAborted
- ConnectionFailed
- NameNotResolved
- InternetDisconnected
- AddressUnreachable
- BlockedByClient
- BlockedByResponse

यह बहुत उपयोगी है यदि आप अपने पेज से उन थर्ड पार्टी स्क्रिप्ट्स को ब्लॉक करना चाहते हैं जिनका आपके फ़ंक्शनल टेस्ट पर नकारात्मक प्रभाव पड़ता है। आप बस `abort` या `abortOnce` कॉल करके किसी मॉक को एबॉर्ट कर सकते हैं, उदाहरण के लिए:

```js
const mock = await browser.mock('https://www.google-analytics.com/*')
mock.abort('Failed')
```

## स्पाइज़

हर मॉक स्वचालित रूप से एक स्पाई होता है जो ब्राउज़र द्वारा उस रिसोर्स को किए गए रिक्वेस्ट की संख्या गिनता है। यदि आप मॉक पर कोई कस्टम रिस्पॉन्स या एबॉर्ट कारण लागू नहीं करते हैं, तो यह उस डिफ़ॉल्ट रिस्पॉन्स के साथ जारी रहता है जो आपको सामान्य रूप से प्राप्त होता। यह आपको यह जाँचने की अनुमति देता है कि ब्राउज़र ने कितनी बार रिक्वेस्ट किया, उदाहरण के लिए किसी निश्चित API एंडपॉइंट पर।

```js
const mock = await browser.mock('*/user', { method: 'post' })
console.log(mock.calls.length) // 0 लौटाता है

// यूज़र रजिस्टर करें
await $('#username').setValue('randomUser')
await $('password').setValue('password123')
await $('password_repeat').setValue('password123')
await $('button[type="submit"]').click()

// जाँचें कि API रिक्वेस्ट किया गया था या नहीं
expect(mock.calls.length).toBe(1)

// रिस्पॉन्स को assert करें
expect(mock.calls[0].body).toEqual({ success: true })
```

यदि आपको तब तक प्रतीक्षा करने की आवश्यकता है जब तक कि किसी मेल खाने वाले रिक्वेस्ट का रिस्पॉन्स न आ जाए, तो `mock.waitForResponse(options)` का उपयोग करें। API रेफ़रेंस देखें: [waitForResponse](/docs/api/mock/waitForResponse)।

## मल्टी-रिमोट

[multi-remote](/docs/multiremote) ब्राउज़र पर, `mock()` एक `Mock` के बजाय एक `MultiRemoteMock` लौटाता है। `respond()` और `restore()` जैसे मेथड्स हर इंस्टेंस पर चलते हैं। `waitForResponse()` तब तक प्रतीक्षा करता है जब तक हर इंस्टेंस के पास एक मेल खाने वाला रिस्पॉन्स न हो। कैप्चर किए गए रिक्वेस्ट उस ब्राउज़र के मॉक पर ही रहते हैं:

```ts
const mock = await browser.mock('*/user', { method: 'post' })
mock.respond({ success: true })

// हर ब्राउज़र में एक यूज़र रजिस्टर करें ताकि हर सेशन रिक्वेस्ट भेजे
await browser.$('#username').setValue('randomUser')
await browser.$('#password').setValue('password123')
await browser.$('#password_repeat').setValue('password123')
await browser.$('button[type="submit"]').click()

await mock.waitForResponse()

expect(mock.getInstance('myChromeBrowser').calls).toHaveLength(1)
expect(mock.getInstance('myFirefoxBrowser').calls).toHaveLength(1)
```

`mock.instances` उन नामों को उसी क्रम में सूचीबद्ध करता है जिसमें मॉक्स बनाए गए थे। जब नाम उस सूची में नहीं होता है तो `getInstance` एरर `Multi-remote object has no instance named "<name>"` थ्रो करता है। `browser.select('myFirefoxBrowser', 'myChromeBrowser')` से बनाया गया मॉक Firefox को पहले सूचीबद्ध करता है, जो `browser.instances` से भिन्न हो सकता है।

केवल एक ब्राउज़र को स्टब करने के लिए, उस इंस्टेंस पर `mock()` कॉल करें:

```ts
const chromeOnly = await browser.getInstance('myChromeBrowser').mock('*/user')
```