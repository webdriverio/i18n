---
id: mocksandspies
title: रिक्वेस्ट मॉक्स और स्पाइज़
---

WebdriverIO के साथ नेटवर्क प्रतिक्रियाओं को संशोधित करने का बिल्ट-इन समर्थन आता है जो आपको अपने बैकएंड या मॉक सर्वर को सेटअप किए बिना अपने फ्रंटएंड एप्लिकेशन का परीक्षण करने पर ध्यान केंद्रित करने की अनुमति देता है। आप अपने परीक्षण में REST API अनुरोधों जैसे वेब संसाधनों के लिए कस्टम प्रतिक्रियाएँ परिभाषित कर सकते हैं और उन्हें गतिशील रूप से संशोधित कर सकते हैं।

:::info

ध्यान दें कि `mock` कमांड का उपयोग करने के लिए Chrome DevTools प्रोटोकॉल के समर्थन की आवश्यकता है। यह समर्थन तब दिया जाता है जब आप स्थानीय रूप से Chromium-आधारित ब्राउज़र में परीक्षण चलाते हैं, Selenium Grid v4 या उच्चतर के माध्यम से, या Chrome DevTools प्रोटोकॉल के समर्थन वाले क्लाउड वेंडर के माध्यम से (जैसे SauceLabs, BrowserStack, LambdaTest)। पूर्ण क्रॉस-ब्राउज़र समर्थन तब उपलब्ध होगा जब आवश्यक प्रिमिटिव्स [Webdriver Bidi](https://wpt.fyi/results/webdriver/tests/bidi/network?label=experimental&label=master&aligned) में लैंड हो जाएंगे और संबंधित ब्राउज़र में लागू हो जाएंगे।

:::

## मॉक बनाना

किसी भी प्रतिक्रिया को संशोधित करने से पहले आपको पहले एक मॉक को परिभाषित करना होगा। यह मॉक संसाधन url द्वारा वर्णित है और इसे [अनुरोध विधि](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods) या [हेडर्स](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers) द्वारा फ़िल्टर किया जा सकता है। संसाधन [minimatch](https://www.npmjs.com/package/minimatch) द्वारा ग्लोब एक्सप्रेशन का समर्थन करता है:

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

## कस्टम प्रतिक्रियाएँ निर्दिष्ट करना

एक बार जब आप एक मॉक परिभाषित कर लेते हैं, तो आप उसके लिए कस्टम प्रतिक्रियाएँ परिभाषित कर सकते हैं। ये कस्टम प्रतिक्रियाएँ या तो JSON प्रतिक्रिया देने के लिए एक ऑब्जेक्ट हो सकती हैं, एक स्थानीय फाइल हो सकती है जिससे कस्टम फिक्स्चर के साथ प्रतिक्रिया दी जा सकती है या एक वेब संसाधन हो सकता है जिससे प्रतिक्रिया को इंटरनेट से एक संसाधन के साथ बदला जा सकता है।

### API अनुरोधों को मॉक करना

API अनुरोधों को मॉक करने के लिए जहां आप JSON प्रतिक्रिया की अपेक्षा करते हैं, आपको केवल मॉक ऑब्जेक्ट पर `respond` को एक मनमाने ऑब्जेक्ट के साथ कॉल करना होगा जिसे आप वापस करना चाहते हैं, उदाहरण के लिए:

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

आप प्रतिक्रिया हेडर्स के साथ-साथ स्टेटस कोड को भी निम्नानुसार कुछ मॉक प्रतिक्रिया पैरामीटर्स पास करके संशोधित कर सकते हैं:

```js
mock.respond({ ... }, {
    // respond with status code 404
    statusCode: 404,
    // merge response headers with following headers
    headers: { 'x-custom-header': 'foobar' }
})
```

यदि आप चाहते हैं कि मॉक बिल्कुल भी बैकएंड को कॉल न करे, तो आप `fetchResponse` फ्लैग के लिए `false` पास कर सकते हैं।

```js
mock.respond({ ... }, {
    // do not call the actual backend
    fetchResponse: false
})
```

यह अनुशंसित है कि आप कस्टम प्रतिक्रियाओं को फिक्स्चर फाइलों में स्टोर करें ताकि आप अपने परीक्षण में उन्हें निम्नानुसार आसानी से रिक्वायर कर सकें:

```js
// requires Node.js v16.14.0 or higher to support JSON import assertions
import responseFixture from './__fixtures__/apiResponse.json' assert { type: 'json' }
mock.respond(responseFixture)
```

### टेक्स्ट संसाधनों को मॉक करना

यदि आप JavaScript, CSS फाइलें या अन्य टेक्स्ट आधारित संसाधनों जैसे टेक्स्ट संसाधनों को संशोधित करना चाहते हैं, तो आप बस एक फाइल पथ पास कर सकते हैं और WebdriverIO मूल संसाधन को इससे बदल देगा, उदाहरण के लिए:

```js
const scriptMock = await browser.mock('**/script.min.js')
scriptMock.respond('./tests/fixtures/script.js')

// or respond with your custom JS
scriptMock.respond('alert("I am a mocked resource")')
```

### वेब संसाधनों को रीडायरेक्ट करना

आप किसी वेब संसाधन को किसी अन्य वेब संसाधन के साथ भी बदल सकते हैं यदि आपकी वांछित प्रतिक्रिया पहले से ही वेब पर होस्ट की गई है। यह व्यक्तिगत पेज संसाधनों के साथ-साथ वेबपेज के साथ भी काम करता है, उदाहरण के लिए:

```js
const pageMock = await browser.mock('https://google.com/')
await pageMock.respond('https://webdriver.io')
await browser.url('https://google.com')
console.log(await browser.getTitle()) // returns "WebdriverIO · Next-gen browser and mobile automation test framework for Node.js"
```

### डायनामिक प्रतिक्रियाएँ

यदि आपकी मॉक प्रतिक्रिया मूल संसाधन प्रतिक्रिया पर निर्भर करती है, तो आप एक फंक्शन पास करके संसाधन को गतिशील रूप से संशोधित कर सकते हैं जो मूल प्रतिक्रिया को पैरामीटर के रूप में प्राप्त करता है और रिटर्न वैल्यू के आधार पर मॉक सेट करता है, उदाहरण के लिए:

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

## मॉक्स को निरस्त करना

कस्टम प्रतिक्रिया लौटाने के बजाय आप निम्नलिखित HTTP त्रुटियों में से एक के साथ अनुरोध को भी समाप्त कर सकते हैं:

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

यह बहुत उपयोगी है यदि आप अपने पेज से तीसरे पक्ष के स्क्रिप्ट को ब्लॉक करना चाहते हैं जिनका आपके फंक्शनल टेस्ट पर नकारात्मक प्रभाव पड़ता है। आप बस `abort` या `abortOnce` को कॉल करके एक मॉक को निरस्त कर सकते हैं, उदाहरण के लिए:

```js
const mock = await browser.mock('https://www.google-analytics.com/**')
mock.abort('Failed')
```

## स्पाइज़

प्रत्येक मॉक स्वचालित रूप से एक स्पाई है जो ब्राउज़र द्वारा उस संसाधन के लिए किए गए अनुरोधों की संख्या की गणना करता है। यदि आप मॉक पर कोई कस्टम प्रतिक्रिया या समाप्ति कारण लागू नहीं करते हैं, तो यह डिफ़ॉल्ट प्रतिक्रिया के साथ जारी रहता है जिसे आप सामान्य रूप से प्राप्त करेंगे। यह आपको यह जांचने की अनुमति देता है कि ब्राउज़र ने कितनी बार अनुरोध किया, उदाहरण के लिए किसी निश्चित API एंडपॉइंट पर।

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