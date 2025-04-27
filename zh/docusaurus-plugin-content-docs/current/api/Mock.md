---
id: mock
title: 模拟对象
---

模拟对象是表示网络模拟的对象，包含有关匹配给定`url`和`filterOptions`的请求的信息。可以使用[`mock`](/docs/api/browser/mock)命令获取它。

:::info

请注意，使用`mock`命令需要支持Chrome DevTools协议。
如果您在基于Chromium的浏览器中本地运行测试，或者
使用Selenium Grid v4或更高版本，则可以获得该支持。此命令**不能**在云中运行
自动化测试时使用。在[自动化协议](/docs/automationProtocols)部分了解更多信息。

:::

您可以在我们的[模拟和监视](/docs/mocksandspies)指南中阅读更多关于在WebdriverIO中模拟请求和响应的信息。

## 属性

模拟对象包含以下属性：

| 名称 | 类型 | 详情 |
| ---- | ---- | ------- |
| `url` | `String` | 传递给mock命令的url |
| `filterOptions` | `Object` | 传递给mock命令的资源过滤选项 |
| `browser` | `Object` | 用于获取模拟对象的[浏览器对象](/docs/api/browser)。 |
| `calls` | `Object[]` | 关于匹配的浏览器请求的信息，包含诸如`url`、`method`、`headers`、`initialPriority`、`referrerPolic`、`statusCode`、`responseHeaders`和`body`等属性 |

## 方法

模拟对象提供了各种命令，列在`mock`部分，允许用户修改请求或响应的行为。

- [`abort`](/docs/api/mock/abort)
- [`abortOnce`](/docs/api/mock/abortOnce)
- [`clear`](/docs/api/mock/clear)
- [`request`](/docs/api/mock/request)
- [`requestOnce`](/docs/api/mock/requestOnce)
- [`respond`](/docs/api/mock/respond)
- [`respondOnce`](/docs/api/mock/respondOnce)
- [`restore`](/docs/api/mock/restore)

## 事件

模拟对象是一个EventEmitter，并且会发出几个事件供您使用。

以下是事件列表。

### `request`

当发起匹配模拟模式的网络请求时，会发出此事件。请求会在事件回调中传入。

请求接口：
```ts
interface RequestEvent {
    requestId: number
    request: Matches
    responseStatusCode: number
    responseHeaders: Record<string, string>
}
```

### `overwrite`

当网络响应被[`respond`](/docs/api/mock/respond)或[`respondOnce`](/docs/api/mock/respondOnce)覆盖时，会发出此事件。响应会在事件回调中传入。

响应接口：
```ts
interface OverwriteEvent {
    requestId: number
    responseCode: number
    responseHeaders: Record<string, string>
    body?: string | Record<string, any>
}
```

### `fail`

当网络请求被[`abort`](/docs/api/mock/abort)或[`abortOnce`](/docs/api/mock/abortOnce)中止时，会发出此事件。失败信息会在事件回调中传入。

失败接口：
```ts
interface FailEvent {
    requestId: number
    errorReason: Protocol.Network.ErrorReason
}
```

### `match`

当添加新匹配时，在`continue`或`overwrite`之前会发出此事件。匹配信息会在事件回调中传入。

匹配接口：
```ts
interface MatchEvent {
    url: string // 请求URL（不含片段）。
    urlFragment?: string // 请求URL的片段，从哈希开始（如果存在）。
    method: string // HTTP请求方法。
    headers: Record<string, string> // HTTP请求头。
    postData?: string // HTTP POST请求数据。
    hasPostData?: boolean // 当请求有POST数据时为true。
    mixedContentType?: MixedContentType // 请求的混合内容导出类型。
    initialPriority: ResourcePriority // 发送请求时资源请求的优先级。
    referrerPolicy: ReferrerPolicy // 请求的引用策略，如https://www.w3.org/TR/referrer-policy/中定义的。
    isLinkPreload?: boolean // 是否通过链接预加载。
    body: string | Buffer | JsonCompatible // 实际资源的响应体。
    responseHeaders: Record<string, string> // HTTP响应头。
    statusCode: number // HTTP响应状态码。
    mockedResponse?: string | Buffer // 如果mock发出事件，也修改了它的响应。
}
```

### `continue`

当网络响应既未被覆盖也未被中断，或者响应已被另一个模拟发送时，会发出此事件。`requestId`会在事件回调中传入。

## 示例

获取待处理请求的数量：

```js
let pendingRequests = 0
const mock = await browser.mock('**') // 匹配所有请求很重要，否则，结果值可能会很混乱。
mock.on('request', ({request}) => {
    pendingRequests++
    console.log(`matched request to ${request.url}, pending ${pendingRequests} requests`)
})
mock.on('match', ({url}) => {
    pendingRequests--
    console.log(`resolved request to ${url}, pending ${pendingRequests} requests`)
})
```

在404网络失败时抛出错误：

```js
browser.addCommand('loadPageWithout404', (url, {selector, predicate}) => new Promise(async (resolve, reject) => {
    const mock = await this.mock('**')

    mock.on('match', ({url, statusCode}) => {
        if (statusCode === 404) {
            reject(new Error(`request to ${url} failed with "Not Found"`))
        }
    })

    await this.url(url).catch(reject)

    // 在这里等待，因为一些请求可能仍在等待中
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

确定是否使用了模拟响应值：

```js
const firstMock = await browser.mock('**/foo/**')
const secondMock = await browser.mock('**/foo/bar/**')

firstMock.respondOnce({id: 3, title: 'three'})
secondMock.respond({id: 4, title: 'four'})

firstMock.on('overwrite', () => {
    // 对第一个 '**/foo/**' 请求触发
}).on('continue', () => {
    // 对其余 '**/foo/**' 请求触发
})

secondMock.on('continue', () => {
    // 对第一个 '**/foo/bar/**' 请求触发
}).on('overwrite', () => {
    // 对其余 '**/foo/bar/**' 请求触发
})
```

在这个例子中，`firstMock`先定义并有一个`respondOnce`调用，所以对于第一个请求不会使用`secondMock`的响应值，但会用于其余请求。