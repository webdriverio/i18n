---
id: wdio-intercept-service
title: 拦截服务
custom_edit_url: https://github.com/webdriverio-community/wdio-intercept-service/edit/main/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-intercept-service 是一个第三方包，更多信息请参见 [GitHub](https://github.com/webdriverio-community/wdio-intercept-service) | [npm](https://www.npmjs.com/package/wdio-intercept-service)

🕸 在 [webdriver.io](http://webdriver.io/) 中捕获和断言 HTTP ajax 调用

[![Tests](https://github.com/webdriverio-community/wdio-intercept-service/actions/workflows/test.yaml/badge.svg)](https://github.com/webdriverio-community/wdio-intercept-service/actions/workflows/test.yaml) [![Join the chat on Discord](https://img.shields.io/discord/1097401827202445382?logo=discord&logoColor=FFFFFF&color=5865F2)](https://discord.webdriver.io/)

这是 [webdriver.io](http://webdriver.io/) 的一个插件。如果您还不了解它，可以去看看，它非常酷。

虽然 selenium 和 webdriver 用于 e2e 和特别是 UI 测试，但您可能希望评估客户端代码发起的 HTTP 请求（例如，当您没有立即的 UI 反馈时，如在指标或跟踪调用中）。使用 wdio-intercept-service，您可以拦截由某些用户操作（例如按钮点击等）发起的 ajax HTTP 调用，并在稍后对请求和相应的响应进行断言。

不过有一点需要注意：您无法拦截在页面加载时发起的 HTTP 调用（如大多数 SPA 中的情况），因为这需要在页面加载后才能完成一些设置工作（由于 selenium 的限制）。**这意味着您只能捕获在测试内部发起的请求。** 如果您对此没有问题，那么这个插件可能适合您，请继续阅读。

## 先决条件

* webdriver.io **v5.x** 或更新版本。

**注意！如果您仍在使用 webdriver.io v4，请使用此插件的 v2.x 分支！**

## 安装

```shell
npm install wdio-intercept-service -D
```

## 使用方法

### 与 WebDriver CLI 一起使用

将 wdio-intercept-service 添加到您的 `wdio.conf.js` 中应该很简单：

```javascript
exports.config = {
  // ...
  services: ['intercept']
  // ...
};
```

这样就设置好了。

### 与 WebDriver Standalone 一起使用

当使用 WebdriverIO Standalone 时，需要手动调用 `before` 和 `beforeTest` / `beforeScenario` 函数。

```javascript
import { remote } from 'webdriverio';
import WebdriverAjax from 'wdio-intercept-service'

const WDIO_OPTIONS = {
  port: 9515,
  path: '/',
  capabilities: {
    browserName: 'chrome'
  },
}

let browser;
const interceptServiceLauncher = WebdriverAjax();

beforeAll(async () => {
  browser = await remote(WDIO_OPTIONS)
  interceptServiceLauncher.before(null, null, browser)
})

beforeEach(async () => {
  interceptServiceLauncher.beforeTest()
})

afterAll(async () => {
  await client.deleteSession()
});

describe('', async () => {
  ... // See example usage
});
```

初始化后，一些相关函数将添加到您的浏览器命令链中（参见 [API](#api)）。

## 快速入门

使用示例：

```javascript
browser.url('http://foo.bar');
browser.setupInterceptor(); // capture ajax calls
browser.expectRequest('GET', '/api/foo', 200); // expect GET request to /api/foo with 200 statusCode
browser.expectRequest('POST', '/api/foo', 400); // expect POST request to /api/foo with 400 statusCode
browser.expectRequest('GET', /\/api\/foo/, 200); // can validate a URL with regex, too
browser.click('#button'); // button that initiates ajax request
browser.pause(1000); // maybe wait a bit until request is finished
browser.assertRequests(); // validate the requests
```

获取请求的详细信息：

```javascript
browser.url('http://foo.bar')
browser.setupInterceptor();
browser.click('#button')
browser.pause(1000);

var request = browser.getRequest(0);
assert.equal(request.method, 'GET');
assert.equal(request.response.headers['content-length'], '42');
```

## 支持的浏览器

它应该可以在所有较新版本的浏览器上工作。如果它不能在您的浏览器上工作，请报告问题。

## API

查阅 TypeScript 声明文件以获取添加到 WebdriverIO 浏览器对象的自定义命令的完整语法。通常，任何接受"options"对象作为参数的方法都可以在不带该参数的情况下调用，以获得默认行为。这些"可选选项"对象后跟 `?: = {}`，每个方法的默认值都有描述。

### 选项描述

此库在发出命令时提供少量配置。多个方法使用的配置选项在此处描述（查看每个方法定义以确定具体支持）。

* `orderBy` (`'START' | 'END'`): 此选项控制拦截器捕获的请求在返回到您的测试时的排序。为了与此库的现有版本向后兼容，默认排序是 `'END'`，对应于请求完成的时间。如果将 `orderBy` 选项设置为 `'START'`，则请求将根据它们开始的时间排序。
* `includePending` (`boolean`): 此选项控制是否返回尚未完成的请求。为了与此库的现有版本向后兼容，默认值为 `false`，只返回已完成的请求。

### browser.setupInterceptor()

在浏览器中捕获 ajax 调用。您始终必须调用设置函数才能在稍后评估请求。

### browser.disableInterceptor()

防止在浏览器中进一步捕获 ajax 调用。所有捕获的请求信息都将被删除。大多数用户不需要禁用拦截器，但如果测试特别长或超过会话存储容量，则禁用拦截器可能会有所帮助。

### `browser.excludeUrls(urlRegexes: (string | RegExp)[])`

排除某些 URL 的请求被记录。它接受一个字符串或正则表达式数组。在写入存储之前，针对每个字符串或正则表达式测试请求的 URL。如果匹配，则不将请求写入存储。与 disableInterceptor 一样，如果会话存储容量出现问题，这可能会有所帮助。

### browser.expectRequest(method: string, url: string, statusCode: number)

对测试期间将要发起的 ajax 请求进行预期。可以（也应该）链式调用。预期的顺序应该映射到发出请求的顺序。

* `method` (`String`): 预期的 http 方法。可以是 `xhr.open()` 接受的任何第一个参数。
* `url` (`String`|`RegExp`): 请求中调用的确切 URL 或用于匹配的 RegExp
* `statusCode` (`Number`): 响应的预期状态码

### browser.getExpectations()

辅助方法。返回您到目前为止所做的所有预期

### browser.resetExpectations()

辅助方法。重置您到目前为止所做的所有预期

### `browser.assertRequests({ orderBy?: 'START' | 'END' }?: = {})`

当所有预期的 ajax 请求完成时调用此方法。它将预期与实际发出的请求进行比较并断言以下内容：

- 发出的请求数量
- 请求的顺序
- 对于每个发出的请求，方法、URL 和状态码应该匹配
- 选项对象默认为 `{ orderBy: 'END' }`，即按请求完成的时间排序，以与 v4.1.10 及更早版本的行为保持一致。当 `orderBy` 选项设置为 `'START'` 时，请求将按照页面发起它们的时间排序。

### `browser.assertExpectedRequestsOnly({ inOrder?: boolean, orderBy?: 'START' | 'END' }?: = {})`

类似于 `browser.assertRequests`，但只验证您在 `expectRequest` 指令中指定的请求，而不必映射出可能发生的所有网络请求。如果 `inOrder` 选项为 `true`（默认值），则预期请求的顺序与使用 `expectRequest` 设置的顺序相同。

### `browser.getRequest(index: number, { includePending?: boolean, orderBy?: 'START' | 'END' }?: = {})`

要对特定请求进行更复杂的断言，您可以获取特定请求的详细信息。您必须提供要访问的请求的基于 0 的索引，按照请求完成的顺序（默认），或发起的顺序（通过传递 `orderBy: 'START'` 选项）。

* `index` (`number`): 您要访问的请求的编号
* `options` (`object`): 配置选项
* `options.includePending` (`boolean`): 是否应返回尚未完成的请求。默认情况下，为 false，以匹配 v4.1.10 及更早版本中库的行为。
* `options.orderBy` (`'START' | 'END'`): 请求应如何排序。默认情况下，为 `'END'`，以匹配 v4.1.10 及更早版本中库的行为。如果为 `'START'`，则请求将按发起时间而不是请求完成时间排序。（由于挂起的请求尚未完成，当按 `'END'` 排序时，所有挂起的请求将位于所有已完成请求之后。）

**返回** `request` 对象：

* `request.url`: 请求的 URL
* `request.method`: 使用的 HTTP 方法
* `request.body`: 请求中使用的有效负载/正文数据
* `request.headers`: 请求 http 头作为 JS 对象
* `request.pending`: 此请求是否完成（即具有 `response` 属性）或正在进行中的布尔标志。
* `request.response`: 一个 JS 对象，仅在请求完成时出现（即 `request.pending === false`），包含有关响应的数据。
* `request.response?.headers`: 响应 http 头作为 JS 对象
* `request.response?.body`: 响应正文（如果可能会解析为 JSON）
* `request.response?.statusCode`: 响应状态码

**关于 `request.body` 的说明：** wdio-intercept-service 将尝试按如下方式解析请求正文：

* 字符串：直接返回字符串（`'value'`）
* JSON：使用 `JSON.parse()` 解析 JSON 对象（`({ key: value })`）
* FormData：将以 `{ key: [value1, value2, ...] }` 格式输出 FormData
* ArrayBuffer：将尝试将缓冲区转换为字符串（实验性）
* 其他任何内容：将对您的数据使用强行 `JSON.stringify()`。祝您好运！

**对于 `fetch` API，我们只支持字符串和 JSON 数据！**

### `browser.getRequests({ includePending?: boolean, orderBy?: 'START' | 'END' }?: = {})`

获取所有捕获的请求作为数组，支持与 `getRequest` 相同的可选选项。

**返回** `request` 对象数组。

### browser.hasPendingRequests()

一个实用方法，用于检查是否有任何 HTTP 请求仍在挂起。可以由测试使用，以确保所有请求在合理的时间内完成，或验证对 `getRequests()` 或 `assertRequests()` 的调用将包含所有所需的 HTTP 请求。

**返回** 布尔值

## TypeScript 支持

此插件提供自己的 TS 类型。只需像[这里](https://webdriver.io/docs/typescript.html#framework-types)提到的那样，将您的 tsconfig 指向类型扩展：

```
"compilerOptions": {
    // ..
    "types": ["node", "webdriverio", "wdio-intercept-service"]
},
```

## 运行测试

在本地运行测试需要最新版本的 Chrome 和 Firefox。您可能需要更新 `chromedriver` 和 `geckodriver` 依赖项，以匹配您系统上安装的版本。

```shell
npm test
```

## 贡献

我很高兴收到任何贡献。只需打开一个问题或直接提交 PR。  
请注意，这个拦截器库是为了与传统浏览器（如 Internet Explorer）一起工作而编写的。因此，`lib/interceptor.js` 中使用的任何代码必须至少能够被 Internet Explorer 的 JavaScript 运行时解析。

## 许可证

MIT