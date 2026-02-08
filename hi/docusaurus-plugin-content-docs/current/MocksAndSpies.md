---
id: mocksandspies
title: रिक्वेस्ट मॉक्स और स्पाइज़
---

WebdriverIO में बिल्ट-इन समर्थन है नेटवर्क रिस्पॉन्स को संशोधित करने के लिए जो आपको बैकएंड या मॉक सर्वर को सेटअप किए बिना अपने फ्रंटएंड एप्लिकेशन के टेस्टिंग पर ध्यान केंद्रित करने की अनुमति देता है। आप अपने टेस्ट में वेब रिसोर्सेज जैसे REST API अनुरोधों के लिए कस्टम रिस्पॉन्स परिभाषित कर सकते हैं और उन्हें डायनामिक रूप से संशोधित कर सकते हैं।

:::info

ध्यान दें कि `mock` कमांड का उपयोग करने के लिए Chrome DevTools प्रोटोकॉल के समर्थन की आवश्यकता है। यह समर्थन तब दिया जाता है जब आप स्थानीय रूप से Chromium-आधारित ब्राउज़र में टेस्ट चलाते हैं, Selenium Grid v4 या उच्चतर के माध्यम से, या Chrome DevTools प्रोटोकॉल के समर्थन वाले क्लाउड वेंडर के माध्यम से (जैसे SauceLabs, BrowserStack, TestMu AI (पूर्व में LambdaTest))। पूर्ण क्रॉस-ब्राउज़र समर्थन तब उपलब्ध होगा जब आवश्यक प्रिमिटिव्स [Webdriver Bidi](https://wpt.fyi/results/webdriver/tests/bidi/network?label=experimental&label=master&aligned) में आ जाएंगे और संबंधित ब्राउज़र में कार्यान्वित किए जाएंगे।

:::

## मॉक बनाना

किसी भी रिस्पॉन्स को संशोधित करने से पहले आपको पहले एक मॉक परिभाषित करना होगा। यह मॉक रिसोर्स URL द्वारा वर्णित है और इसे [रिक्वेस्ट मेथड](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods) या [हेडर्स](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers) द्वारा फ़िल्टर किया जा सकता है। रिसोर्स [minimatch](https://www.npmjs.com/package/minimatch) द्वारा ग्लोब एक्सप्रेशन का समर्थन करता है:

```js
// mock all resources ending with "/users/list"
const userListMock = await browser.mock('**/users/list')

// or you can specify the mock by filtering resources by headers or
// status code, only mock successful requests to json resources
const strictMock = await browser.mock('**', {
    // mock all json responses
    requestHeaders: { 'Content-Type': 'application/json' },
    // that were successful
    statusCode: 200
})
```

## कस्टम रिस्पॉन्स निर्दिष्ट करना

एक बार जब आप एक मॉक परिभाषित कर लेते हैं, तो आप इसके लिए कस्टम रिस्पॉन्स परिभाषित कर सकते हैं। ये कस्टम रिस्पॉन्स या तो एक ऑब्जेक्ट हो सकते हैं जिससे JSON रिस्पॉन्स होगा, एक लोकल फ़ाइल जिससे एक कस्टम फिक्स्चर के साथ रिस्पॉन्स होगा या एक वेब रिसोर्स जिससे इंटरनेट से एक रिसोर्स के साथ रिस्पॉन्स बदल जाएगा।

### API रिक्वेस्ट मॉकिंग

JSON रिस्पॉन्स की अपेक्षा वाले API रिक्वेस्ट को मॉक करने के लिए, आपको मॉक ऑब्जेक्ट पर `respond` को किसी मनमाने ऑब्जेक्ट के साथ कॉल करने की आवश्यकता है जिसे आप रिटर्न करना चाहते हैं, उदाहरण के लिए:

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
// outputs: "[ 'Injected (non) completed Todo', 'Injected completed Todo' ]"
```

आप कुछ मॉक रिस्पॉन्स पैरामीटर्स को पास करके रिस्पॉन्स हेडर्स के साथ-साथ स्टेटस कोड को भी संशोधित कर सकते हैं, जैसे:

```js
mock.respond({ ... }, {
    // respond with status code 404
    statusCode: 404,
    // merge response headers with following headers
    headers: { 'x-custom-header': 'foobar' }
})
```

अगर आप चाहते हैं कि मॉक बिल्कुल भी बैकएंड को कॉल न करे, तो आप `fetchResponse` फ्लैग के लिए `false` पास कर सकते हैं।

```js
mock.respond({ ... }, {
    // do not call the actual backend
    fetchResponse: false
})
```

यह अनुशंसित है कि आप कस्टम रिस्पॉन्स को फिक्स्चर फाइलों में स्टोर करें ताकि आप अपने टेस्ट में उन्हें इस प्रकार शामिल कर सकें:

```js
// requires Node.js v16.14.0 or higher to support JSON import assertions
import responseFixture from './__fixtures__/apiResponse.json' assert { type: 'json' }
mock.respond(responseFixture)
```

### टेक्स्ट रिसोर्सेज मॉकिंग

अगर आप JavaScript, CSS फ़ाइलें या अन्य टेक्स्ट आधारित रिसोर्सेज जैसे टेक्स्ट रिसोर्सेज को संशोधित करना चाहते हैं, तो आप बस एक फ़ाइल पाथ पास कर सकते हैं और WebdriverIO मूल रिसोर्स को इससे बदल देगा, उदाहरण के लिए:

```js
const scriptMock = await browser.mock('**/script.min.js')
scriptMock.respond('./tests/fixtures/script.js')

// or respond with your custom JS
scriptMock.respond('alert("I am a mocked resource")')
```

### वेब रिसोर्सेज रीडायरेक्ट करना

आप किसी वेब रिसोर्स को किसी अन्य वेब रिसोर्स से भी बदल सकते हैं यदि आपका वांछित रिस्पॉन्स पहले से ही वेब पर होस्ट किया गया है। यह व्यक्तिगत पेज रिसोर्सेज के साथ-साथ वेबपेज के साथ भी काम करता है, उदाहरण के लिए:

```js
const pageMock = await browser.mock('https://google.com/')
await pageMock.respond('https://webdriver.io')
await browser.url('https://google.com')
console.log(await browser.getTitle()) // returns "WebdriverIO · Next-gen browser and mobile automation test framework for Node.js"
```

### डायनामिक रिस्पॉन्स

अगर आपका मॉक रिस्पॉन्स मूल रिसोर्स रिस्पॉन्स पर निर्भर करता है, तो आप एक फंक्शन पास करके रिसोर्स को डायनामिक रूप से संशोधित कर सकते हैं जो मूल रिस्पॉन्स को पैरामीटर के रूप में प्राप्त करता है और रिटर्न वैल्यू के आधार पर मॉक सेट करता है, उदाहरण के लिए:

```js
const mock = await browser.mock('https://todo-backend-express-knex.herokuapp.com/', {
    method: 'get'
})

mock.respond((req) => {
    // replace todo content with their list number
    return req.body.map((item, i) => ({ ...item, title: i }))
})

await browser.url('https://todobackend.com/client/index.html?https://todo-backend-express-knex.herokuapp.com/')

await $('#todo-list li').waitForExist()
console.log(await $$('#todo-list li label').map((el) => el.getText()))
// returns
// [
//   '0',  '1',  '2',  '19', '20',
//   '21', '3',  '4',  '5',  '6',
//   '7',  '8',  '9',  '10', '11',
//   '12', '13', '14', '15', '16',
//   '17', '18', '22'
// ]
```

## मॉक्स को अबॉर्ट करना

कस्टम रिस्पॉन्स देने के बजाय आप निम्न HTTP एरर्स में से किसी एक के साथ रिक्वेस्ट को अबॉर्ट भी कर सकते हैं:

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

यह बहुत उपयोगी है अगर आप अपने पेज से तृतीय पक्ष स्क्रिप्ट को ब्लॉक करना चाहते हैं जो आपके फंक्शनल टेस्ट पर नकारात्मक प्रभाव डालते हैं। आप `abort` या `abortOnce` कॉल करके मॉक को अबॉर्ट कर सकते हैं, उदाहरण के लिए:

```js
const mock = await browser.mock('https://www.google-analytics.com/**')
mock.abort('Failed')
```

## स्पाइज़

हर मॉक स्वचालित रूप से एक स्पाई है जो उस रिसोर्स के लिए ब्राउज़र द्वारा किए गए अनुरोधों की संख्या गिनती है। यदि आप मॉक पर कस्टम रिस्पॉन्स या अबॉर्ट कारण लागू नहीं करते हैं, तो यह डिफ़ॉल्ट रिस्पॉन्स के साथ जारी रहता है जो आप सामान्य रूप से प्राप्त करेंगे। यह आपको यह जांचने की अनुमति देता है कि ब्राउज़र ने कितनी बार रिक्वेस्ट किया, उदाहरण के लिए, किसी विशिष्ट API एंडपॉइंट पर।

```js
const mock = await browser.mock('**/user', { method: 'post' })
console.log(mock.calls.length) // returns 0

// register user
await $('#username').setValue('randomUser')
await $('password').setValue('password123')
await $('password_repeat').setValue('password123')
await $('button[type="submit"]').click()

// check if API request was made
expect(mock.calls.length).toBe(1)

// assert response
expect(mock.calls[0].body).toEqual({ success: true })
```

अगर आपको इंतज़ार करने की आवश्यकता है जब तक कि एक मैचिंग रिक्वेस्ट का जवाब न मिल जाए, तो `mock.waitForResponse(options)` का उपयोग करें। API संदर्भ देखें: [waitForResponse](/docs/api/mock/waitForResponse)।