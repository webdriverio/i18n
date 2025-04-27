---
id: mock
title: மாக்
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/mock.ts
---

கோரிக்கையின் பதிலை மாக் செய்யவும். நீங்கள் பொருந்தும் ஒரு 
[URLPattern](https://developer.mozilla.org/en-US/docs/Web/API/URLPattern)
மற்றும் அதற்கு தொடர்புடைய தலைப்பு மற்றும் நிலை குறியீட்டின் அடிப்படையில் ஒரு மாக் வரையறுக்கலாம். மாக் முறையை அழைப்பது வெப் வளத்தின் பதிலை மாற்றுவதற்கு நீங்கள் பயன்படுத்தக்கூடிய ஒரு ஸ்டப் பொருளை திருப்பி அளிக்கிறது.

ஸ்டப் பொருளைக் கொண்டு, நீங்கள் ஒன்று தனிப்பயன் பதிலைத் திருப்பி அளிக்கலாம் அல்லது கோரிக்கை தோல்வியடையச் செய்யலாம்.

பதிலை மாற்றுவதற்கு 3 வழிகள் உள்ளன:
- தனிப்பயன் JSON பொருளை திரும்ப அளிக்கவும் (API கோரிக்கைகளை ஸ்டப் செய்ய)
- வெப் வளத்தை உள்ளூர் கோப்புடன் மாற்றவும் (மாற்றியமைக்கப்பட்ட JavaScript கோப்பை வழங்குதல்) அல்லது
- வளத்தை வேறு url க்கு திருப்பி விடவும்

:::info

`mock` கட்டளையைப் பயன்படுத்துவதற்கு WebDriver Bidi க்கான ஆதரவு தேவை என்பதை கவனிக்கவும். Chromium அடிப்படையிலான உலாவியில் அல்லது Firefox இல் உள்ளூரில் சோதனைகளை இயக்கும்போது அல்லது நீங்கள் Selenium Grid v4 அல்லது அதற்கு மேற்பட்டதைப் பயன்படுத்தும்போது அது வழக்கமாக நடக்கும். நீங்கள் கிளவுடில் சோதனைகளை இயக்கினால், உங்கள் கிளவுட் வழங்குநர் WebDriver Bidi ஐ ஆதரிக்கிறதா என்பதை உறுதிப்படுத்திக் கொள்ளுங்கள்.

:::

:::info

`URLPattern` என்பது ஒரு சோதனை தொழில்நுட்பமாகும், மேலும் சில சூழல்களில், எ.கா. Node.js. இல் இன்னும் ஆதரிக்கப்படவில்லை.
அம்சம் பரவலாக ஆதரிக்கப்படும் வரை [பாலிஃபில்](https://www.npmjs.com/package/urlpattern-polyfill) இறக்குமதி செய்ய பரிந்துரைக்கிறோம்.

:::

##### பயன்பாடு

```js
browser.mock(url, { method, requestHeaders, responseHeaders, postData, statusCode })
```

##### அளவுருக்கள்

<table>
  <thead>
    <tr>
      <th>பெயர்</th><th>வகை</th><th>விவரங்கள்</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>url</var></code></td>
      <td>`String`</td>
      <td>மாக் செய்ய வேண்டிய url</td>
    </tr>
    <tr>
      <td><code><var>filterOptions</var></code><br /><span className="label labelWarning">விருப்பத்தேர்வு</span></td>
      <td>`MockFilterOptions`</td>
      <td>கூடுதல் விருப்பங்கள் மூலம் மாக் வளத்தை வடிகட்டவும்</td>
    </tr>
    <tr>
      <td><code><var>filterOptions.method</var></code><br /><span className="label labelWarning">விருப்பத்தேர்வு</span></td>
      <td>`String, Function`</td>
      <td>HTTP முறை மூலம் வளத்தை வடிகட்டவும்</td>
    </tr>
    <tr>
      <td><code><var>filterOptions.requestHeaders</var></code><br /><span className="label labelWarning">விருப்பத்தேர்வு</span></td>
      <td>`Object, Function`</td>
      <td>குறிப்பிட்ட கோரிக்கை தலைப்புகள் மூலம் வளத்தை வடிகட்டவும்</td>
    </tr>
    <tr>
      <td><code><var>filterOptions.responseHeaders</var></code><br /><span className="label labelWarning">விருப்பத்தேர்வு</span></td>
      <td>`Object, Function`</td>
      <td>குறிப்பிட்ட பதில் தலைப்புகள் மூலம் வளத்தை வடிகட்டவும்</td>
    </tr>
    <tr>
      <td><code><var>filterOptions.postData</var></code><br /><span className="label labelWarning">விருப்பத்தேர்வு</span></td>
      <td>`String, Function`</td>
      <td>கோரிக்கை postData மூலம் வளத்தை வடிகட்டவும்</td>
    </tr>
    <tr>
      <td><code><var>filterOptions.statusCode</var></code><br /><span className="label labelWarning">விருப்பத்தேர்வு</span></td>
      <td>`Number, Function`</td>
      <td>பதில் நிலைக்குறியீடு மூலம் வளத்தை வடிகட்டவும்</td>
    </tr>
  </tbody>
</table>

##### உதாரணம்

```js title="mock.js"
it('should mock network resources', async () => {
    // via static string
    const userListMock = await browser.mock('**' + '/users/list')
    // or as regular expression
    const userListMock = await browser.mock(/https:\/\/(domainA|domainB)\.com\/.+/)
    // you can also specifying the mock even more by filtering resources
    // by request or response headers, status code, postData, e.g. mock only responses with specific
    // header set and statusCode
    const strictMock = await browser.mock('**', {
        // mock all json responses
        statusCode: 200,
        requestHeaders: { 'Content-Type': 'application/json' },
        responseHeaders: { 'Cache-Control': 'no-cache' },
        postData: 'foobar'
    })

    // comparator function
    const apiV1Mock = await browser.mock('**' + '/api/v1', {
        statusCode: (statusCode) => statusCode >= 200 && statusCode <= 203,
        requestHeaders: (headers) => headers['Authorization'] && headers['Authorization'].startsWith('Bearer '),
        responseHeaders: (headers) => headers['Impersonation'],
        postData: (data) => typeof data === 'string' && data.includes('foo')
    })
})

it('should modify API responses', async () => {
    // filter by method
    const todoMock = await browser.mock('**' + '/todos', {
        method: 'get'
    })

    // mock an endpoint with a fixed fixture
    todoMock.respond([{
        title: 'Injected Todo',
        order: null,
        completed: false,
        url: "http://todo-backend-express-knex.herokuapp.com/916"
    }])

    // respond with different status code or header
    todoMock.respond([{
        title: 'Injected Todo',
        order: null,
        completed: false,
        url: "http://todo-backend-express-knex.herokuapp.com/916"
    }], {
        statusCode: 404,
        headers: {
            'x-custom-header': 'foobar'
        }
    })
})

it('should modify text assets', async () => {
    const scriptMock = await browser.mock('**' + '/script.min.js')
    scriptMock.respond('./tests/fixtures/script.js')
})

it('should redirect web resources', async () => {
    const headerMock = await browser.mock('**' + '/header.png')
    headerMock.respond('https://media.giphy.com/media/F9hQLAVhWnL56/giphy.gif')

    const pageMock = await browser.mock('https://google.com/')
    pageMock.respond('https://webdriver.io')
    await browser.url('https://google.com')
    console.log(await browser.getTitle()) // returns "WebdriverIO · Next-gen browser and mobile automation test framework for Node.js"
})
```

##### திரும்பப் பெறுவது

- **&lt;Mock&gt;**
            **<code><var>return</var></code>:**                                                பதிலை மாற்றுவதற்கான மாக் பொருள்