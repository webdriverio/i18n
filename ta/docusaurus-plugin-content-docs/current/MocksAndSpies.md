---
id: mocksandspies
title: மாக்ஸ் மற்றும் ஸ்பைஸ் கோரிக்கைகள்
---

WebdriverIO பயன்பாட்டில் நெட்வொர்க் பதிலளிப்புகளை மாற்றுவதற்கான உள்ளிணைந்த ஆதரவு உள்ளது, இது உங்கள் பின்னணி பயன்பாட்டை அமைக்காமலோ அல்லது மாக் சர்வர் அமைக்காமலோ உங்கள் முன்னணி பயன்பாட்டை சோதிப்பதில் கவனம் செலுத்த உங்களை அனுமதிக்கிறது. உங்கள் சோதனையில் REST API கோரிக்கைகள் போன்ற வலை வளங்களுக்கான தனிப்பயன் பதில்களை வரையறுத்து, அவற்றை டைனமிக்காக மாற்றலாம்.

:::info

`mock` கட்டளையைப் பயன்படுத்துவது Chrome DevTools நெறிமுறைக்கான ஆதரவை அவசியமாக்குகிறது என்பதை கவனிக்கவும். Chromium அடிப்படையிலான உலாவியில் உள்ளூரில் சோதனைகளை இயக்கினால், செலினியம் கிரிட் v4 அல்லது அதற்கு மேற்பட்ட பதிப்பு மூலமாக, அல்லது Chrome DevTools நெறிமுறைக்கான ஆதரவுடன் கூடிய கிளவுட் விற்பனையாளர் மூலமாக (எ.கா. SauceLabs, BrowserStack, LambdaTest) அந்த ஆதரவு வழங்கப்படுகிறது. [Webdriver Bidi](https://wpt.fyi/results/webdriver/tests/bidi/network?label=experimental&label=master&aligned) இல் தேவையான அடிப்படைகள் இடம்பெற்று, அவை அந்தந்த உலாவிகளில் செயல்படுத்தப்படும்போது முழு கிராஸ்-பிரவுசர் ஆதரவு கிடைக்கும்.

:::

## ஒரு மாக் உருவாக்குதல்

எந்தவொரு பதில்களையும் மாற்றுவதற்கு முன்னர் நீங்கள் முதலில் ஒரு மாக்கை வரையறுக்க வேண்டும். இந்த மாக் வள URL மூலம் விவரிக்கப்பட்டுள்ளது மற்றும் [கோரிக்கை முறை](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods) அல்லது [தலைப்புகள்](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers) மூலம் வடிகட்டப்படலாம். இந்த வளம் [minimatch](https://www.npmjs.com/package/minimatch) மூலம் குளோப் வெளிப்பாடுகளை ஆதரிக்கிறது:

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

## தனிப்பயன் பதில்களை குறிப்பிடுதல்

நீங்கள் ஒரு மாக் வரையறுத்த பிறகு, அதற்கான தனிப்பயன் பதில்களை வரையறுக்கலாம். அந்த தனிப்பயன் பதில்கள் ஒரு JSON பதிலளிக்க ஒரு பொருளாகவோ, ஒரு தனிப்பயன் ஃபிக்சர்டன் பதிலளிக்க ஒரு உள்ளூர் கோப்பாகவோ அல்லது இணையத்திலிருந்து ஒரு வளத்துடன் பதிலை மாற்றுவதற்கான ஒரு வலை வளமாகவோ இருக்கலாம்.

### API கோரிக்கைகளை மாக் செய்தல்

JSON பதிலை எதிர்பார்க்கும் API கோரிக்கைகளை மாக் செய்ய, நீங்கள் திருப்பி அனுப்ப விரும்பும் ஒரு தன்னிச்சையான பொருளுடன் மாக் பொருளில் 'respond' ஐ அழைக்க வேண்டும், எ.கா.:

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

பின்வருமாறு சில மாக் பதில் அளவுருக்களை அனுப்புவதன் மூலம் பதில் தலைப்புகளையும் நிலைக் குறியீட்டையும் மாற்றலாம்:

```js
mock.respond({ ... }, {
    // respond with status code 404
    statusCode: 404,
    // merge response headers with following headers
    headers: { 'x-custom-header': 'foobar' }
})
```

பின்னணியை முற்றிலும் அழைக்காமல் இருக்க மாக் வேண்டும் என்றால், `fetchResponse` கொடிக்கு `false` ஐ அனுப்பலாம்.

```js
mock.respond({ ... }, {
    // do not call the actual backend
    fetchResponse: false
})
```

தனிப்பயன் பதில்களை ஃபிக்சர் கோப்புகளில் சேமிப்பது பரிந்துரைக்கப்படுகிறது, இதனால் நீங்கள் அவற்றை உங்கள் சோதனையில் பின்வருமாறு அழைக்கலாம்:

```js
// requires Node.js v16.14.0 or higher to support JSON import assertions
import responseFixture from './__fixtures__/apiResponse.json' assert { type: 'json' }
mock.respond(responseFixture)
```

### உரை வளங்களை மாக் செய்தல்

JavaScript, CSS கோப்புகள் அல்லது பிற உரை அடிப்படையிலான வளங்கள் போன்ற உரை வளங்களை மாற்ற விரும்பினால், நீங்கள் வெறுமனே ஒரு கோப்பு பாதையை அனுப்பலாம், மேலும் WebdriverIO அசல் வளத்தை அதனுடன் மாற்றுகிறது, எ.கா.:

```js
const scriptMock = await browser.mock('**/script.min.js')
scriptMock.respond('./tests/fixtures/script.js')

// or respond with your custom JS
scriptMock.respond('alert("I am a mocked resource")')
```

### வலை வளங்களை மறுவழிப்படுத்தல்

உங்கள் விரும்பிய பதில் ஏற்கனவே இணையத்தில் ஹோஸ்ட் செய்யப்பட்டிருந்தால், ஒரு வலை வளத்தை மற்றொரு வலை வளத்துடன் மாற்றலாம். இது தனிப்பட்ட பக்க வளங்களுடனும் வலைப்பக்கத்துடனும் கூட செயல்படும், எ.கா.:

```js
const pageMock = await browser.mock('https://google.com/')
await pageMock.respond('https://webdriver.io')
await browser.url('https://google.com')
console.log(await browser.getTitle()) // returns "WebdriverIO · Next-gen browser and mobile automation test framework for Node.js"
```

### டைனமிக் பதில்கள்

உங்கள் மாக் பதில் அசல் வள பதிலைப் பொறுத்து இருந்தால், அசல் பதிலை அளவுருவாகப் பெறும் மற்றும் மாக்கை திரும்பும் மதிப்பின் அடிப்படையில் அமைக்கும் ஒரு செயல்பாட்டை அனுப்புவதன் மூலம் வளத்தை டைனமிக்காக மாற்றலாம், எ.கா.:

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

## மாக்களை ரத்து செய்தல்

ஒரு தனிப்பயன் பதிலை திரும்ப அனுப்புவதற்குப் பதிலாக, பின்வரும் HTTP பிழைகளில் ஒன்றுடன் கோரிக்கையை ரத்து செய்யலாம்:

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

இது உங்கள் செயல்பாட்டு சோதனையில் எதிர்மறையான தாக்கத்தை ஏற்படுத்தும் உங்கள் பக்கத்திலிருந்து மூன்றாம் தரப்பு ஸ்கிரிப்ட்களைத் தடுக்க மிகவும் பயனுள்ளதாக இருக்கும். `abort` அல்லது `abortOnce` ஐ அழைப்பதன் மூலம் நீங்கள் ஒரு மாக்கை ரத்து செய்யலாம், எ.கா.:

```js
const mock = await browser.mock('https://www.google-analytics.com/**')
mock.abort('Failed')
```

## ஸ்பைகள்

ஒவ்வொரு மாக்கும் தானாகவே ஒரு ஸ்பை ஆகும், இது உலாவி அந்த வளத்திற்கு செய்த கோரிக்கைகளின் எண்ணிக்கையை எண்ணுகிறது. நீங்கள் மாக்கிற்கு தனிப்பயன் பதிலை அல்லது ரத்து செய்வதற்கான காரணத்தைப் பயன்படுத்தவில்லை என்றால், நீங்கள் பொதுவாகப் பெறும் இயல்புநிலை பதிலுடன் அது தொடரும். இது உலாவி குறிப்பிட்ட API முனைப்புக்கு எத்தனை முறை கோரிக்கையை அனுப்பியது என்பதை சரிபார்க்க உங்களை அனுமதிக்கிறது, எ.கா.:

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

பொருத்தமான கோரிக்கை பதிலளிக்கும் வரை காத்திருக்க வேண்டுமானால், `mock.waitForResponse(options)` ஐப் பயன்படுத்தவும். API குறிப்பைப் பார்க்கவும்: [waitForResponse](/docs/api/mock/waitForResponse).