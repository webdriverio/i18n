---
id: mocksandspies
title: 请求模拟和监听
---

WebdriverIO 内置了修改网络响应的支持，让您可以专注于测试前端应用程序，而无需设置后端或模拟服务器。您可以在测试中为REST API请求等网络资源定义自定义响应，并动态修改它们。

:::info

请注意，使用`mock`命令需要支持Chrome DevTools协议。如果您在基于Chromium的浏览器中本地运行测试，通过Selenium Grid v4或更高版本，或通过支持Chrome DevTools协议的云厂商（如SauceLabs、BrowserStack、LambdaTest）运行测试，则可以获得该支持。一旦所需的原语在[Webdriver Bidi](https://wpt.fyi/results/webdriver/tests/bidi/network?label=experimental&label=master&aligned)中落地并在相应的浏览器中实现，将提供完整的跨浏览器支持。

:::

## 创建模拟

在修改任何响应之前，您首先需要定义一个模拟。这个模拟通过资源URL来描述，可以通过[请求方法](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods)或[头信息](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers)进行过滤。资源支持通过[minimatch](https://www.npmjs.com/package/minimatch)的全局表达式：

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

## 指定自定义响应

一旦定义了模拟，您就可以为其定义自定义响应。这些自定义响应可以是一个对象（用于响应JSON），一个本地文件（用于响应自定义固定数据）或一个Web资源（用互联网上的资源替换响应）。

### 模拟API请求

为了模拟您期望JSON响应的API请求，您只需要在模拟对象上调用`respond`，并传入您想要返回的任意对象，例如：

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

您还可以通过传入一些模拟响应参数来修改响应头和状态码，如下所示：

```js
mock.respond({ ... }, {
    // respond with status code 404
    statusCode: 404,
    // merge response headers with following headers
    headers: { 'x-custom-header': 'foobar' }
})
```

如果您希望模拟完全不调用后端，可以将`fetchResponse`标志设置为`false`。

```js
mock.respond({ ... }, {
    // do not call the actual backend
    fetchResponse: false
})
```

建议将自定义响应存储在固定文件中，这样您可以在测试中直接引入它们，如下所示：

```js
// requires Node.js v16.14.0 or higher to support JSON import assertions
import responseFixture from './__fixtures__/apiResponse.json' assert { type: 'json' }
mock.respond(responseFixture)
```

### 模拟文本资源

如果您想修改JavaScript、CSS文件或其他基于文本的资源，您可以直接传入文件路径，WebdriverIO将用它替换原始资源，例如：

```js
const scriptMock = await browser.mock('**/script.min.js')
scriptMock.respond('./tests/fixtures/script.js')

// or respond with your custom JS
scriptMock.respond('alert("I am a mocked resource")')
```

### 重定向Web资源

如果您想要的响应已经托管在网络上，您也可以用另一个Web资源替换Web资源。这适用于单个页面资源以及整个网页，例如：

```js
const pageMock = await browser.mock('https://google.com/')
await pageMock.respond('https://webdriver.io')
await browser.url('https://google.com')
console.log(await browser.getTitle()) // returns "WebdriverIO · Next-gen browser and mobile automation test framework for Node.js"
```

### 动态响应

如果您的模拟响应依赖于原始资源响应，您还可以通过传入一个函数来动态修改资源，该函数接收原始响应作为参数，并基于返回值设置模拟，例如：

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

## 中止模拟

除了返回自定义响应外，您还可以使用以下HTTP错误之一中止请求：

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

如果您想阻止对功能测试有负面影响的第三方脚本，这非常有用。您可以通过调用`abort`或`abortOnce`来中止模拟，例如：

```js
const mock = await browser.mock('https://www.google-analytics.com/**')
mock.abort('Failed')
```

## 监听

每个模拟自动成为一个监听器，计算浏览器对该资源的请求次数。如果您不对模拟应用自定义响应或中止原因，它将继续使用您通常收到的默认响应。这允许您检查浏览器向特定API端点发出请求的次数。

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