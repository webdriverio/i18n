---
id: mock
title: mock
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/mock.ts
---

Mock the response of a request. You can define a mock based on a matching
[URLPattern](https://developer.mozilla.org/en-US/docs/Web/API/URLPattern)
and corresponding header and status code. Calling the mock method
returns a stub object that you can use to modify the response of the
web resource.

With the stub object you can then either return a custom response or
have the request fail.

There are 3 ways to modify the response:
- return a custom JSON object (for stubbing API request)
- replace web resource with a local file (serve a modified JavaScript file) or
- redirect resource to a different url

:::info

Note that using the `mock` command requires support for WebDriver Bidi. That is
usually the case when running tests locally in a Chromium based browser or on
Firefox as well as if you use a Selenium Grid v4 or higher. If you run tests
in the cloud, make sure that your cloud provider supports WebDriver Bidi.

:::

:::info

The `URLPattern` is an experimental technology and not yet supported in some environments, e.g. Node.js.
We recommend to import [a polyfill](https://www.npmjs.com/package/urlpattern-polyfill)
until the feature is more widely supported.

:::

##### Usage

```js
browser.mock(url, { method, requestHeaders, responseHeaders, postData, statusCode })
```

##### Parameters

<table>
  <thead>
    <tr>
      <th>Name</th><th>Type</th><th>Details</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>url</var></code></td>
      <td>`String`</td>
      <td>url to mock</td>
    </tr>
    <tr>
      <td><code><var>filterOptions</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`MockFilterOptions`</td>
      <td>filter mock resource by additional options</td>
    </tr>
    <tr>
      <td><code><var>filterOptions.method</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`String, Function`</td>
      <td>filter resource by HTTP method</td>
    </tr>
    <tr>
      <td><code><var>filterOptions.requestHeaders</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`Object, Function`</td>
      <td>filter resource by specific request headers</td>
    </tr>
    <tr>
      <td><code><var>filterOptions.responseHeaders</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`Object, Function`</td>
      <td>filter resource by specific response headers</td>
    </tr>
    <tr>
      <td><code><var>filterOptions.postData</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`String, Function`</td>
      <td>filter resource by request postData</td>
    </tr>
    <tr>
      <td><code><var>filterOptions.statusCode</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`Number, Function`</td>
      <td>filter resource by response statusCode</td>
    </tr>
  </tbody>
</table>

##### Example

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

##### Returns

- **&lt;Mock&gt;**
            **<code><var>return</var></code>:**                                                a mock object to modify the response    

