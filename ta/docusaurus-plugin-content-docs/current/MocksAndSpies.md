---
id: mocksandspies
title: கோரிக்கை போலிகள் மற்றும் உளவாளிகள்
---

WebdriverIO உங்கள் பின்னணி அமைப்பை அல்லது ஒரு போலி சேவையகத்தை அமைக்காமலேயே உங்கள் முன்னணி பயன்பாட்டை சோதிப்பதில் கவனம் செலுத்த அனுமதிக்கும் பிணைய பதில்களை மாற்றுவதற்கான உள்ளமைந்த ஆதரவுடன் வருகிறது. உங்கள் சோதனையில் REST API கோரிக்கைகள் போன்ற வலை வளங்களுக்கு தனிப்பயன் பதில்களை வரையறுத்து, அவற்றை தன்னிச்சையாக மாற்றலாம்.

:::info

`mock` கட்டளையைப் பயன்படுத்துவதற்கு Chrome DevTools நெறிமுறைக்கான ஆதரவு தேவை என்பதை கவனிக்கவும். இந்த ஆதரவு Chromium-அடிப்படையிலான உலாவியில் உள்ளூரில் சோதனைகளை இயக்கினாலோ, Selenium Grid v4 அல்லது அதற்கு மேற்பட்ட பதிப்பு மூலமாகவோ, அல்லது Chrome DevTools நெறிமுறைக்கான ஆதரவுடன் கூடிய கிளவுட் வழங்குநர் (எ.கா. SauceLabs, BrowserStack, LambdaTest) மூலமாகவோ கிடைக்கும். முழு குறுக்கு-உலாவி ஆதரவு தேவையான அடிப்படை அம்சங்கள் [Webdriver Bidi](https://wpt.fyi/results/webdriver/tests/bidi/network?label=experimental&label=master&aligned) இல் அறிமுகப்படுத்தப்பட்டு, அந்தந்த உலாவிகளில் செயல்படுத்தப்படும் போது கிடைக்கும்.

:::

## போலி உருவாக்குதல்

எந்த பதில்களையும் மாற்றுவதற்கு முன், முதலில் ஒரு போலியை வரையறுக்க வேண்டும். இந்த போலி ஆதார URL மூலம் விவரிக்கப்பட்டு, [கோரிக்கை முறை](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods) அல்லது [தலைப்புகள்](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers) மூலம் வடிகட்டப்படலாம். ஆதாரம் [minimatch](https://www.npmjs.com/package/minimatch) மூலம் glob வெளிப்பாடுகளை ஆதரிக்கிறது:

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

ஒரு போலியை வரையறுத்தபின், அதற்கான தனிப்பயன் பதில்களை வரையறுக்கலாம். இந்த தனிப்பயன் பதில்கள் JSON பதிலளிக்க ஒரு பொருளாகவோ, தனிப்பயன் ஃபிக்ஸ்சருடன் பதிலளிக்க ஒரு உள்ளூர் கோப்பாகவோ, அல்லது இணையத்திலிருந்து ஒரு வளத்துடன் பதிலை மாற்ற ஒரு வலை வளமாகவோ இருக்கலாம்.

### API கோரிக்கைகளை போலியாக்குதல்

JSON பதிலை எதிர்பார்க்கும் API கோரிக்கைகளை போலியாக்க, நீங்கள் திருப்பி அனுப்ப விரும்பும் தன்னிச்சையான பொருளுடன் மாக் பொருளில் 'respond' ஐ அழைக்க வேண்டியதுதான், எ.கா.:

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

பின்வருமாறு சில போலி பதில் அளவுருக்களை அனுப்புவதன் மூலம் பதில் தலைப்புகள் மற்றும் நிலைக் குறியீட்டையும் மாற்றலாம்:

```js
mock.respond({ ... }, {
    // respond with status code 404
    statusCode: 404,
    // merge response headers with following headers
    headers: { 'x-custom-header': 'foobar' }
})
```

போலி முற்றிலும் பின்னணி சேவையை அழைக்க வேண்டாம் என்றால், `fetchResponse` கொடிக்கு `false` அனுப்பலாம்.

```js
mock.respond({ ... }, {
    // do not call the actual backend
    fetchResponse: false
})
```

தனிப்பயன் பதில்களை ஃபிக்ஸ்சர் கோப்புகளில் சேமிப்பது பரிந்துரைக்கப்படுகிறது, இதனால் நீங்கள் அவற்றை உங்கள் சோதனையில் பின்வருமாறு இறக்குமதி செய்யலாம்:

```js
// requires Node.js v16.14.0 or higher to support JSON import assertions
import responseFixture from './__fixtures__/apiResponse.json' assert { type: 'json' }
mock.respond(responseFixture)
```

### உரை வளங்களை போலியாக்குதல்

JavaScript, CSS கோப்புகள் அல்லது பிற உரை அடிப்படையிலான வளங்கள் போன்ற உரை வளங்களை மாற்ற விரும்பினால், நீங்கள் ஒரு கோப்பு பாதையை அனுப்பலாம், WebdriverIO அசல் வளத்தை அதனுடன் மாற்றும், எ.கா.:

```js
const scriptMock = await browser.mock('**/script.min.js')
scriptMock.respond('./tests/fixtures/script.js')

// or respond with your custom JS
scriptMock.respond('alert("I am a mocked resource")')
```

### வலை வளங்களை திருப்பி விடுதல்

உங்கள் விரும்பிய பதில் ஏற்கனவே இணையத்தில் இருந்தால், ஒரு வலை வளத்தை மற்றொரு வலை வளத்துடன் மாற்றலாம். இது தனிப்பட்ட பக்க வளங்களுடனும் ஒரு வலைப்பக்கத்துடனும் செயல்படும், எ.கா.:

```js
const pageMock = await browser.mock('https://google.com/')
await pageMock.respond('https://webdriver.io')
await browser.url('https://google.com')
console.log(await browser.getTitle()) // returns "WebdriverIO · Next-gen browser and mobile automation test framework for Node.js"
```

### தன்னியக்க பதில்கள்

உங்கள் போலி பதில் அசல் வள பதிலைப் பொறுத்து இருந்தால், அசல் பதிலை அளவுருவாகப் பெறும் ஒரு செயல்பாட்டை அனுப்புவதன் மூலம் வளத்தை தன்னியக்கமாக மாற்றலாம், திருப்பி அனுப்பும் மதிப்பின் அடிப்படையில் போலியை அமைக்கிறது, எ.கா.:

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

## போலிகளை நிறுத்துதல்

தனிப்பயன் பதிலைத் திருப்பி அனுப்புவதற்குப் பதிலாக, பின்வரும் HTTP பிழைகளில் ஒன்றுடன் கோரிக்கையை நிறுத்தலாம்:

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

உங்கள் செயல்பாட்டு சோதனையில் எதிர்மறையான தாக்கத்தை ஏற்படுத்தும் 3வது தரப்பு ஸ்கிரிப்ட்களைத் தடுக்க இது மிகவும் பயனுள்ளதாக இருக்கும். `abort` அல்லது `abortOnce` ஐ அழைப்பதன் மூலம் ஒரு போலியை நிறுத்தலாம், எ.கா.:

```js
const mock = await browser.mock('https://www.google-analytics.com/**')
mock.abort('Failed')
```

## உளவாளிகள்

ஒவ்வொரு போலியும் தானாகவே ஒரு உளவாளியாகும், இது உலாவி அந்த வளத்திற்கு செய்த கோரிக்கைகளின் எண்ணிக்கையை கணக்கிடுகிறது. போலிக்கு தனிப்பயன் பதில் அல்லது நிறுத்த காரணத்தைப் பயன்படுத்தவில்லை என்றால், இயல்பாக நீங்கள் பெறும் இயல்புநிலை பதிலுடன் தொடரும். இது உலாவி எத்தனை முறை கோரிக்கையைச் செய்தது என்பதைச் சரிபார்க்க உதவுகிறது, எ.கா. ஒரு குறிப்பிட்ட API முனைப்பிற்கு.

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