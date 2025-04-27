---
id: webdriverBidi
title: WebDriver Bidi 协议
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-protocols/src/protocols/webdriverBidi.ts
---

这些协议命令是基于当前活跃的[WebDriver Bidi](https://w3c.github.io/webdriver-bidi/)规范生成的。要为您的测试启用此协议，请确保在您的capabilities中设置`webSocketUrl: true`。

:::caution 谨慎使用！

浏览器支持不能保证，接口可能会在未来发生变化。该标准目前正在开发中，浏览器厂商将根据自己的时间表添加这些功能。

:::

最后更新时间：2025年4月26日星期六 17:10:07 GMT-0700（太平洋夏令时间）

---

## send
通过WebDriver Bidi发送套接字命令<br /><br />WebDriver Bidi协议命令。更多详情可以在[官方协议文档](https://github.com/w3c/webdriver-bidi)中找到。

##### 用法

```js
browser.send(params)
```


##### 参数

<table>
  <thead>
    <tr>
      <th>名称</th><th>类型</th><th>详情</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>params</var></code></td>
      <td>CommandData</td>
      <td>套接字载荷</td>
    </tr>
  </tbody>
</table>


##### 返回

- **&lt;Object&gt;**
            **<code><var>CommandResponse</var></code>:** WebDriver Bidi响应


---

## sendAsync
通过WebDriver Bidi发送异步套接字命令<br /><br />WebDriver Bidi协议命令。更多详情可以在[官方协议文档](https://github.com/w3c/webdriver-bidi)中找到。

##### 用法

```js
browser.sendAsync(params)
```


##### 参数

<table>
  <thead>
    <tr>
      <th>名称</th><th>类型</th><th>详情</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>params</var></code></td>
      <td>CommandData</td>
      <td>套接字载荷</td>
    </tr>
  </tbody>
</table>


##### 返回

- **&lt;Number&gt;**
            **<code><var>id</var></code>:** WebDriver Bidi请求的id


---

## sessionStatus
WebDriver Bidi命令，用于发送命令方法"session.status"及其参数。<br /><br />WebDriver Bidi协议命令。更多详情可以在[官方协议文档](https://w3c.github.io/webdriver-bidi/#command-session-status)中找到。

##### 用法

```js
browser.sessionStatus(params)
```


##### 参数

<table>
  <thead>
    <tr>
      <th>名称</th><th>类型</th><th>详情</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>params</var></code></td>
      <td>`remote.EmptyParams`</td>
      <td><pre>\{\}</pre></td>
    </tr>
  </tbody>
</table>


##### 返回

- **&lt;Object&gt;**
            **<code><var>local.SessionStatusResult</var></code>:** 命令返回值，具有以下接口：
   ```ts
   {
     ready: boolean;
     message: string;
   }
   ```


---

## sessionNew
WebDriver Bidi命令，用于发送命令方法"session.new"及其参数。<br /><br />WebDriver Bidi协议命令。更多详情可以在[官方协议文档](https://w3c.github.io/webdriver-bidi/#command-session-new)中找到。

##### 用法

```js
browser.sessionNew(params)
```


##### 参数

<table>
  <thead>
    <tr>
      <th>名称</th><th>类型</th><th>详情</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>params</var></code></td>
      <td>`remote.SessionNewParameters`</td>
      <td><pre>\{<br />  capabilities: SessionCapabilitiesRequest;<br />\}</pre></td>
    </tr>
  </tbody>
</table>


##### 返回

- **&lt;Object&gt;**
            **<code><var>local.SessionNewResult</var></code>:** 命令返回值，具有以下接口：
   ```ts
   {
     sessionId: string;
     capabilities: {
       acceptInsecureCerts: boolean;
       browserName: string;
       browserVersion: string;
       platformName: string;
       setWindowRect: boolean;
       userAgent: string;
       proxy?: SessionProxyConfiguration;
       webSocketUrl?: string;
     };
   }
   ```


---

## sessionEnd
WebDriver Bidi命令，用于发送命令方法"session.end"及其参数。<br /><br />WebDriver Bidi协议命令。更多详情可以在[官方协议文档](https://w3c.github.io/webdriver-bidi/#command-session-end)中找到。

##### 用法

```js
browser.sessionEnd(params)
```


##### 参数

<table>
  <thead>
    <tr>
      <th>名称</th><th>类型</th><th>详情</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>params</var></code></td>
      <td>`remote.EmptyParams`</td>
      <td><pre>\{\}</pre></td>
    </tr>
  </tbody>
</table>



---

## sessionSubscribe
WebDriver Bidi命令，用于发送命令方法"session.subscribe"及其参数。<br /><br />WebDriver Bidi协议命令。更多详情可以在[官方协议文档](https://w3c.github.io/webdriver-bidi/#command-session-subscribe)中找到。

##### 用法

```js
browser.sessionSubscribe(params)
```


##### 参数

<table>
  <thead>
    <tr>
      <th>名称</th><th>类型</th><th>详情</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>params</var></code></td>
      <td>`remote.SessionSubscriptionRequest`</td>
      <td><pre>\{<br />  events: string[];<br />  contexts?: BrowsingContextBrowsingContext[];<br />\}</pre></td>
    </tr>
  </tbody>
</table>



---

## sessionUnsubscribe
WebDriver Bidi命令，用于发送命令方法"session.unsubscribe"及其参数。<br /><br />WebDriver Bidi协议命令。更多详情可以在[官方协议文档](https://w3c.github.io/webdriver-bidi/#command-session-unsubscribe)中找到。

##### 用法

```js
browser.sessionUnsubscribe(params)
```


##### 参数

<table>
  <thead>
    <tr>
      <th>名称</th><th>类型</th><th>详情</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>params</var></code></td>
      <td>`remote.SessionSubscriptionRequest`</td>
      <td><pre>\{<br />  events: string[];<br />  contexts?: BrowsingContextBrowsingContext[];<br />\}</pre></td>
    </tr>
  </tbody>
</table>



---

## browserClose
WebDriver Bidi命令，用于发送命令方法"browser.close"及其参数。<br /><br />WebDriver Bidi协议命令。更多详情可以在[官方协议文档](https://w3c.github.io/webdriver-bidi/#command-browser-close)中找到。

##### 用法

```js
browser.browserClose(params)
```


##### 参数

<table>
  <thead>
    <tr>
      <th>名称</th><th>类型</th><th>详情</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>params</var></code></td>
      <td>`remote.EmptyParams`</td>
      <td><pre>\{\}</pre></td>
    </tr>
  </tbody>
</table>



---

## browserCreateUserContext
WebDriver Bidi命令，用于发送命令方法"browser.createUserContext"及其参数。<br /><br />WebDriver Bidi协议命令。更多详情可以在[官方协议文档](https://w3c.github.io/webdriver-bidi/#command-browser-createUserContext)中找到。

##### 用法

```js
browser.browserCreateUserContext(params)
```


##### 参数

<table>
  <thead>
    <tr>
      <th>名称</th><th>类型</th><th>详情</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>params</var></code></td>
      <td>`remote.EmptyParams`</td>
      <td><pre>\{\}</pre></td>
    </tr>
  </tbody>
</table>


##### 返回

- **&lt;Object&gt;**
            **<code><var>local.BrowserCreateUserContextResult</var></code>:** 命令返回值，具有以下接口：
   ```ts
   ;
   ```


---

## browserGetUserContexts
WebDriver Bidi命令，用于发送命令方法"browser.getUserContexts"及其参数。<br /><br />WebDriver Bidi协议命令。更多详情可以在[官方协议文档](https://w3c.github.io/webdriver-bidi/#command-browser-getUserContexts)中找到。

##### 用法

```js
browser.browserGetUserContexts(params)
```


##### 参数

<table>
  <thead>
    <tr>
      <th>名称</th><th>类型</th><th>详情</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>params</var></code></td>
      <td>`remote.EmptyParams`</td>
      <td><pre>\{\}</pre></td>
    </tr>
  </tbody>
</table>


##### 返回

- **&lt;Object&gt;**
            **<code><var>local.BrowserGetUserContextsResult</var></code>:** 命令返回值，具有以下接口：
   ```ts
   {
     userContexts: BrowserUserContextInfo[];
   }
   ```


---

## browserRemoveUserContext
WebDriver Bidi命令，用于发送命令方法"browser.removeUserContext"及其参数。<br /><br />WebDriver Bidi协议命令。更多详情可以在[官方协议文档](https://w3c.github.io/webdriver-bidi/#command-browser-removeUserContext)中找到。

##### 用法

```js
browser.browserRemoveUserContext(params)
```


##### 参数

<table>
  <thead>
    <tr>
      <th>名称</th><th>类型</th><th>详情</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>params</var></code></td>
      <td>`remote.BrowserRemoveUserContextParameters`</td>
      <td><pre>\{<br />  userContext: BrowserUserContext;<br />\}</pre></td>
    </tr>
  </tbody>
</table>



---

## browsingContextActivate
WebDriver Bidi命令，用于发送命令方法"browsingContext.activate"及其参数。<br /><br />WebDriver Bidi协议命令。更多详情可以在[官方协议文档](https://w3c.github.io/webdriver-bidi/#command-browsingContext-activate)中找到。

##### 用法

```js
browser.browsingContextActivate(params)
```


##### 参数

<table>
  <thead>
    <tr>
      <th>名称</th><th>类型</th><th>详情</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>params</var></code></td>
      <td>`remote.BrowsingContextActivateParameters`</td>
      <td><pre>\{<br />  context: BrowsingContextBrowsingContext;<br />\}</pre></td>
    </tr>
  </tbody>
</table>



---

## browsingContextCaptureScreenshot
WebDriver Bidi命令，用于发送命令方法"browsingContext.captureScreenshot"及其参数。<br /><br />WebDriver Bidi协议命令。更多详情可以在[官方协议文档](https://w3c.github.io/webdriver-bidi/#command-browsingContext-captureScreenshot)中找到。

##### 用法

```js
browser.browsingContextCaptureScreenshot(params)
```


##### 参数

<table>
  <thead>
    <tr>
      <th>名称</th><th>类型</th><th>详情</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>params</var></code></td>
      <td>`remote.BrowsingContextCaptureScreenshotParameters`</td>
      <td><pre>\{<br />  context: BrowsingContextBrowsingContext;<br />  /\*\*<br />   \* @default 'viewport'<br />   \*/<br />  origin?: "viewport" &#124; "document";<br />  format?: BrowsingContextImageFormat;<br />  clip?: BrowsingContextClipRectangle;<br />\}</pre></td>
    </tr>
  </tbody>
</table>


##### 返回

- **&lt;Object&gt;**
            **<code><var>local.BrowsingContextCaptureScreenshotResult</var></code>:** 命令返回值，具有以下接口：
   ```ts
   {
     data: string;
   }
   ```


---

## browsingContextClose
WebDriver Bidi命令，用于发送命令方法"browsingContext.close"及其参数。<br /><br />WebDriver Bidi协议命令。更多详情可以在[官方协议文档](https://w3c.github.io/webdriver-bidi/#command-browsingContext-close)中找到。

##### 用法

```js
browser.browsingContextClose(params)
```


##### 参数

<table>
  <thead>
    <tr>
      <th>名称</th><th>类型</th><th>详情</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>params</var></code></td>
      <td>`remote.BrowsingContextCloseParameters`</td>
      <td><pre>\{<br />  context: BrowsingContextBrowsingContext;<br />  promptUnload?: boolean;<br />\}</pre></td>
    </tr>
  </tbody>
</table>



---

## browsingContextCreate
WebDriver Bidi命令，用于发送命令方法"browsingContext.create"及其参数。<br /><br />WebDriver Bidi协议命令。更多详情可以在[官方协议文档](https://w3c.github.io/webdriver-bidi/#command-browsingContext-create)中找到。

##### 用法

```js
browser.browsingContextCreate(params)
```


##### 参数

<table>
  <thead>
    <tr>
      <th>名称</th><th>类型</th><th>详情</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>params</var></code></td>
      <td>`remote.BrowsingContextCreateParameters`</td>
      <td><pre>\{<br />  type: BrowsingContextCreateType;<br />  referenceContext?: BrowsingContextBrowsingContext;<br />  background?: boolean;<br />  userContext?: BrowserUserContext;<br />\}</pre></td>
    </tr>
  </tbody>
</table>


##### 返回

- **&lt;Object&gt;**
            **<code><var>local.BrowsingContextCreateResult</var></code>:** 命令返回值，具有以下接口：
   ```ts
   {
     context: BrowsingContextBrowsingContext;
   }
   ```


---

## browsingContextGetTree
WebDriver Bidi命令，用于发送命令方法"browsingContext.getTree"及其参数。<br /><br />WebDriver Bidi协议命令。更多详情可以在[官方协议文档](https://w3c.github.io/webdriver-bidi/#command-browsingContext-getTree)中找到。

##### 用法

```js
browser.browsingContextGetTree(params)
```


##### 参数

<table>
  <thead>
    <tr>
      <th>名称</th><th>类型</th><th>详情</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>params</var></code></td>
      <td>`remote.BrowsingContextGetTreeParameters`</td>
      <td><pre>\{<br />  maxDepth?: JsUint;<br />  root?: BrowsingContextBrowsingContext;<br />\}</pre></td>
    </tr>
  </tbody>
</table>


##### 返回

- **&lt;Object&gt;**
            **<code><var>local.BrowsingContextGetTreeResult</var></code>:** 命令返回值，具有以下接口：
   ```ts
   {
     contexts: BrowsingContextInfoList;
   }
   ```


---

## browsingContextHandleUserPrompt
WebDriver Bidi命令，用于发送命令方法"browsingContext.handleUserPrompt"及其参数。<br /><br />WebDriver Bidi协议命令。更多详情可以在[官方协议文档](https://w3c.github.io/webdriver-bidi/#command-browsingContext-handleUserPrompt)中找到。

##### 用法

```js
browser.browsingContextHandleUserPrompt(params)
```


##### 参数

<table>
  <thead>
    <tr>
      <th>名称</th><th>类型</th><th>详情</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>params</var></code></td>
      <td>`remote.BrowsingContextHandleUserPromptParameters`</td>
      <td><pre>\{<br />  context: BrowsingContextBrowsingContext;<br />  accept?: boolean;<br />  userText?: string;<br />\}</pre></td>
    </tr>
  </tbody>
</table>



---

## browsingContextLocateNodes
WebDriver Bidi命令，用于发送命令方法"browsingContext.locateNodes"及其参数。<br /><br />WebDriver Bidi协议命令。更多详情可以在[官方协议文档](https://w3c.github.io/webdriver-bidi/#command-browsingContext-locateNodes)中找到。

##### 用法

```js
browser.browsingContextLocateNodes(params)
```


##### 参数

<table>
  <thead>
    <tr>
      <th>名称</th><th>类型</th><th>详情</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>params</var></code></td>
      <td>`remote.BrowsingContextLocateNodesParameters`</td>
      <td><pre>\{<br />  context: BrowsingContextBrowsingContext;<br />  locator: BrowsingContextLocator;<br />  maxNodeCount?: JsUint;<br />  serializationOptions?: ScriptSerializationOptions;<br />  startNodes?: ScriptSharedReference[];<br />\}</pre></td>
    </tr>
  </tbody>
</table>


##### 返回

- **&lt;Object&gt;**
            **<code><var>local.BrowsingContextLocateNodesResult</var></code>:** 命令返回值，具有以下接口：
   ```ts
   {
     nodes: ScriptNodeRemoteValue[];
   }
   ```


---

## browsingContextNavigate
WebDriver Bidi命令，用于发送命令方法"browsingContext.navigate"及其参数。<br /><br />WebDriver Bidi协议命令。更多详情可以在[官方协议文档](https://w3c.github.io/webdriver-bidi/#command-browsingContext-navigate)中找到。

##### 用法

```js
browser.browsingContextNavigate(params)
```


##### 参数

<table>
  <thead>
    <tr>
      <th>名称</th><th>类型</th><th>详情</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>params</var></code></td>
      <td>`remote.BrowsingContextNavigateParameters`</td>
      <td><pre>\{<br />  context: BrowsingContextBrowsingContext;<br />  url: string;<br />  wait?: BrowsingContextReadinessState;<br />\}</pre></td>
    </tr>
  </tbody>
</table>


##### 返回

- **&lt;Object&gt;**
            **<code><var>local.BrowsingContextNavigateResult</var></code>:** 命令返回值，具有以下接口：
   ```ts
   {
     navigation: BrowsingContextNavigation | null;
     url: string;
   }
   ```


---

## browsingContextPrint
WebDriver Bidi命令，用于发送命令方法"browsingContext.print"及其参数。<br /><br />WebDriver Bidi协议命令。更多详情可以在[官方协议文档](https://w3c.github.io/webdriver-bidi/#command-browsingContext-print)中找到。

##### 用法

```js
browser.browsingContextPrint(params)
```


##### 参数

<table>
  <thead>
    <tr>
      <th>名称</th><th>类型</th><th>详情</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>params</var></code></td>
      <td>`remote.BrowsingContextPrintParameters`</td>
      <td><pre>\{<br />  context: BrowsingContextBrowsingContext;<br />  background?: boolean;<br />  margin?: BrowsingContextPrintMarginParameters;<br />  /\*\*<br />   \* @default 'portrait'<br />   \*/<br />  orientation?: "portrait" &#124; "landscape";<br />  page?: BrowsingContextPrintPageParameters;<br />  pageRanges?: (JsUint &#124; string)[];<br />  /\*\*<br />   \* @default 1<br />   \*/<br />  scale?: number;<br />  /\*\*<br />   \* @default true<br />   \*/<br />  shrinkToFit?: boolean;<br />\}</pre></td>
    </tr>
  </tbody>
</table>


##### 返回

- **&lt;Object&gt;**
            **<code><var>local.BrowsingContextPrintResult</var></code>:** 命令返回值，具有以下接口：
   ```ts
   {
     data: string;
   }
   ```


---

## browsingContextReload
WebDriver Bidi命令，用于发送命令方法"browsingContext.reload"及其参数。<br /><br />WebDriver Bidi协议命令。更多详情可以在[官方协议文档](https://w3c.github.io/webdriver-bidi/#command-browsingContext-reload)中找到。

##### 用法

```js
browser.browsingContextReload(params)
```


##### 参数

<table>
  <thead>
    <tr>
      <th>名称</th><th>类型</th><th>详情</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>params</var></code></td>
      <td>`remote.BrowsingContextReloadParameters`</td>
      <td><pre>\{<br />  context: BrowsingContextBrowsingContext;<br />  ignoreCache?: boolean;<br />  wait?: BrowsingContextReadinessState;<br />\}</pre></td>
    </tr>
  </tbody>
</table>



---

## browsingContextSetViewport
WebDriver Bidi命令，用于发送命令方法"browsingContext.setViewport"及其参数。<br /><br />WebDriver Bidi协议命令。更多详情可以在[官方协议文档](https://w3c.github.io/webdriver-bidi/#command-browsingContext-setViewport)中找到。

##### 用法

```js
browser.browsingContextSetViewport(params)
```


##### 参数

<table>
  <thead>
    <tr>
      <th>名称</th><th>类型</th><th>详情</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>params</var></code></td>
      <td>`remote.BrowsingContextSetViewportParameters`</td>
      <td><pre>\{<br />  context: BrowsingContextBrowsingContext;<br />  viewport?: BrowsingContextViewport &#124; null;<br />  devicePixelRatio?: number &#124; null;<br />\}</pre></td>
    </tr>
  </tbody>
</table>



---

## browsingContextTraverseHistory
WebDriver Bidi命令，用于发送命令方法"browsingContext.traverseHistory"及其参数。<br /><br />WebDriver Bidi协议命令。更多详情可以在[官方协议文档](https://w3c.github.io/webdriver-bidi/#command-browsingContext-traverseHistory)中找到。

##### 用法

```js
browser.browsingContextTraverseHistory(params)
```


##### 参数

<table>
  <thead>
    <tr>
      <th>名称</th><th>类型</th><th>详情</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>params</var></code></td>
      <td>`remote.BrowsingContextTraverseHistoryParameters`</td>
      <td><pre>\{<br />  context: BrowsingContextBrowsingContext;<br />  delta: JsInt;<br />\}</pre></td>
    </tr>
  </tbody>
</table>



---

## networkAddIntercept
WebDriver Bidi命令，用于发送命令方法"network.addIntercept"及其参数。<br /><br />WebDriver Bidi协议命令。更多详情可以在[官方协议文档](https://w3c.github.io/webdriver-bidi/#command-network-addIntercept)中找到。

##### 用法

```js
browser.networkAddIntercept(params)
```


##### 参数

<table>
  <thead>
    <tr>
      <th>名称</th><th>类型</th><th>详情</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>params</var></code></td>
      <td>`remote.NetworkAddInterceptParameters`</td>
      <td><pre>\{<br />  phases: NetworkInterceptPhase[];<br />  contexts?: BrowsingContextBrowsingContext[];<br />  urlPatterns?: NetworkUrlPattern[];<br />\}</pre></td>
    </tr>
  </tbody>
</table>


##### 返回

- **&lt;Object&gt;**
            **<code><var>local.NetworkAddInterceptResult</var></code>:** 命令返回值，具有以下接口：
   ```ts
   {
     intercept: NetworkIntercept;
   }
   ```


---

## networkContinueRequest
WebDriver Bidi命令，用于发送命令方法"network.continueRequest"及其参数。<br /><br />WebDriver Bidi协议命令。更多详情可以在[官方协议文档](https://w3c.github.io/webdriver-bidi/#command-network-continueRequest)中找到。

##### 用法

```js
browser.networkContinueRequest(params)
```


##### 参数

<table>
  <thead>
    <tr>
      <th>名称</th><th>类型</th><th>详情</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>params</var></code></td>
      <td>`remote.NetworkContinueRequestParameters`</td>
      <td><pre>\{<br />  request: NetworkRequest;<br />  body?: NetworkBytesValue;<br />  cookies?: NetworkCookieHeader[];<br />  headers?: NetworkHeader[];<br />  method?: string;<br />  url?: string;<br />\}</pre></td>
    </tr>
  </tbody>
</table>



---

## networkContinueResponse
WebDriver Bidi命令，用于发送命令方法"network.continueResponse"及其参数。<br /><br />WebDriver Bidi协议命令。更多详情可以在[官方协议文档](https://w3c.github.io/webdriver-bidi/#command-network-continueResponse)中找到。

##### 用法

```js
browser.networkContinueResponse(params)
```


##### 参数

<table>
  <thead>
    <tr>
      <th>名称</th><th>类型</th><th>详情</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>params</var></code></td>
      <td>`remote.NetworkContinueResponseParameters`</td>
      <td><pre>\{<br />  request: NetworkRequest;<br />  cookies?: NetworkSetCookieHeader[];<br />  credentials?: NetworkAuthCredentials;<br />  headers?: NetworkHeader[];<br />  reasonPhrase?: string;<br />  statusCode?: JsUint;<br />\}</pre></td>
    </tr>
  </tbody>
</table>



---

## networkContinueWithAuth
WebDriver Bidi命令，用于发送命令方法"network.continueWithAuth"及其参数。<br /><br />WebDriver Bidi协议命令。更多详情可以在[官方协议文档](https://w3c.github.io/webdriver-bidi/#command-network-continueWithAuth)中找到。

##### 用法

```js
browser.networkContinueWithAuth(params)
```


##### 参数

<table>
  <thead>
    <tr>
      <th>名称</th><th>类型</th><th>详情</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>params</var></code></td>
      <td>`remote.NetworkContinueWithAuthParameters`</td>
      <td><pre>\{<br />  request: NetworkRequest;<br />\}</pre></td>
    </tr>
  </tbody>
</table>



---

## networkFailRequest
WebDriver Bidi命令，用于发送命令方法"network.failRequest"及其参数。<br /><br />WebDriver Bidi协议命令。更多详情可以在[官方协议文档](https://w3c.github.io/webdriver-bidi/#command-network-failRequest)中找到。

##### 用法

```js
browser.networkFailRequest(params)
```


##### 参数

<table>
  <thead>
    <tr>
      <th>名称</th><th>类型</th><th>详情</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>params</var></code></td>
      <td>`remote.NetworkFailRequestParameters`</td>
      <td><pre>\{<br />  request: NetworkRequest;<br />\}</pre></td>
    </tr>
  </tbody>
</table>



---

## networkProvideResponse
WebDriver Bidi命令，用于发送命令方法"network.provideResponse"及其参数。<br /><br />WebDriver Bidi协议命令。更多详情可以在[官方协议文档](https://w3c.github.io/webdriver-bidi/#command-network-provideResponse)中找到。

##### 用法

```js
browser.networkProvideResponse(params)
```


##### 参数

<table>
  <thead>
    <tr>
      <th>名称</th><th>类型</th><th>详情</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>params</var></code></td>
      <td>`remote.NetworkProvideResponseParameters`</td>
      <td><pre>\{<br />  request: NetworkRequest;<br />  body?: NetworkBytesValue;<br />  cookies?: NetworkSetCookieHeader[];<br />  headers?: NetworkHeader[];<br />  reasonPhrase?: string;<br />  statusCode?: JsUint;<br />\}</pre></td>
    </tr>
  </tbody>
</table>



---

## networkRemoveIntercept
WebDriver Bidi命令，用于发送命令方法"network.removeIntercept"及其参数。<br /><br />WebDriver Bidi协议命令。更多详情可以在[官方协议文档](https://w3c.github.io/webdriver-bidi/#command-network-removeIntercept)中找到。

##### 用法

```js
browser.networkRemoveIntercept(params)
```


##### 参数

<table>
  <thead>
    <tr>
      <th>名称</th><th>类型</th><th>详情</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>params</var></code></td>
      <td>`remote.NetworkRemoveInterceptParameters`</td>
      <td><pre>\{<br />  intercept: NetworkIntercept;<br />\}</pre></td>
    </tr>
  </tbody>
</table>



---

## scriptAddPreloadScript
WebDriver Bidi命令，用于发送命令方法"script.addPreloadScript"及其参数。<br /><br />WebDriver Bidi协议命令。更多详情可以在[官方协议文档](https://w3c.github.io/webdriver-bidi/#command-script-addPreloadScript)中找到。

##### 用法

```js
browser.scriptAddPreloadScript(params)
```


##### 参数

<table>
  <thead>
    <tr>
      <th>名称</th><th>类型</th><th>详情</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>params</var></code></td>
      <td>`remote.ScriptAddPreloadScriptParameters`</td>
      <td><pre>\{<br />  functionDeclaration: string;<br />  arguments?: ScriptChannelValue[];<br />  contexts?: BrowsingContextBrowsingContext[];<br />  sandbox?: string;<br />\}</pre></td>
    </tr>
  </tbody>
</table>


##### 返回

- **&lt;Object&gt;**
            **<code><var>local.ScriptAddPreloadScriptResult</var></code>:** 命令返回值，具有以下接口：
   ```ts
   {
     script: ScriptPreloadScript;
   }
   ```


---

## scriptDisown
WebDriver Bidi命令，用于发送命令方法"script.disown"及其参数。<br /><br />WebDriver Bidi协议命令。更多详情可以在[官方协议文档](https://w3c.github.io/webdriver-bidi/#command-script-disown)中找到。

##### 用法

```js
browser.scriptDisown(params)
```


##### 参数

<table>
  <thead>
    <tr>
      <th>名称</th><th>类型</th><th>详情</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>params</var></code></td>
      <td>`remote.ScriptDisownParameters`</td>
      <td><pre>\{<br />  handles: ScriptHandle[];<br />  target: ScriptTarget;<br />\}</pre></td>
    </tr>
  </tbody>
</table>



---

## scriptCallFunction
WebDriver Bidi命令，用于发送命令方法"script.callFunction"及其参数。<br /><br />WebDriver Bidi协议命令。更多详情可以在[官方协议文档](https://w3c.github.io/webdriver-bidi/#command-script-callFunction)中找到。

##### 用法

```js
browser.scriptCallFunction(params)
```


##### 参数

<table>
  <thead>
    <tr>
      <th>名称</th><th>类型</th><th>详情</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>params</var></code></td>
      <td>`remote.ScriptCallFunctionParameters`</td>
      <td><pre>\{<br />  functionDeclaration: string;<br />  awaitPromise: boolean;<br />  target: ScriptTarget;<br />  arguments?: ScriptLocalValue[];<br />  resultOwnership?: ScriptResultOwnership;<br />  serializationOptions?: ScriptSerializationOptions;<br />  this?: ScriptLocalValue;<br />  userActivation?: boolean;<br />\}</pre></td>
    </tr>
  </tbody>
</table>



---

## scriptEvaluate
WebDriver Bidi命令，用于发送命令方法"script.evaluate"及其参数。<br /><br />WebDriver Bidi协议命令。更多详情可以在[官方协议文档](https://w3c.github.io/webdriver-bidi/#command-script-evaluate)中找到。

##### 用法

```js
browser.scriptEvaluate(params)
```


##### 参数

<table>
  <thead>
    <tr>
      <th>名称</th><th>类型</th><th>详情</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>params</var></code></td>
      <td>`remote.ScriptEvaluateParameters`</td>
      <td><pre>\{<br />  expression: string;<br />  target: ScriptTarget;<br />  awaitPromise: boolean;<br />  resultOwnership?: ScriptResultOwnership;<br />  serializationOptions?: ScriptSerializationOptions;<br />  userActivation?: boolean;<br />\}</pre></td>
    </tr>
  </tbody>
</table>


##### 返回

- **&lt;Object&gt;**
            **<code><var>local.ScriptEvaluateResult</var></code>:** 命令返回值，具有以下接口：
   ```ts
   ;
   ```


---

## scriptGetRealms
WebDriver Bidi命令，用于发送命令方法"script.getRealms"及其参数。<br /><br />WebDriver Bidi协议命令。更多详情可以在[官方协议文档](https://w3c.github.io/webdriver-bidi/#command-script-getRealms)中找到。

##### 用法

```js
browser.scriptGetRealms(params)
```


##### 参数

<table>
  <thead>
    <tr>
      <th>名称</th><th>类型</th><th>详情</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>params</var></code></td>
      <td>`remote.ScriptGetRealmsParameters`</td>
      <td><pre>\{<br />  context?: BrowsingContextBrowsingContext;<br />  type?: ScriptRealmType;<br />\}</pre></td>
    </tr>
  </tbody>
</table>


##### 返回

- **&lt;Object&gt;**
            **<code><var>local.ScriptGetRealmsResult</var></code>:** 命令返回值，具有以下接口：
   ```ts
   {
     realms: ScriptRealmInfo[];
   }
   ```


---

## scriptRemovePreloadScript
WebDriver Bidi命令，用于发送命令方法"script.removePreloadScript"及其参数。<br /><br />WebDriver Bidi协议命令。更多详情可以在[官方协议文档](https://w3c.github.io/webdriver-bidi/#command-script-removePreloadScript)中找到。

##### 用法

```js
browser.scriptRemovePreloadScript(params)
```


##### 参数

<table>
  <thead>
    <tr>
      <th>名称</th><th>类型</th><th>详情</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>params</var></code></td>
      <td>`remote.ScriptRemovePreloadScriptParameters`</td>
      <td><pre>\{<br />  script: ScriptPreloadScript;<br />\}</pre></td>
    </tr>
  </tbody>
</table>



---

## storageGetCookies
WebDriver Bidi命令，用于发送命令方法"storage.getCookies"及其参数。<br /><br />WebDriver Bidi协议命令。更多详情可以在[官方协议文档](https://w3c.github.io/webdriver-bidi/#command-storage-getCookies)中找到。

##### 用法

```js
browser.storageGetCookies(params)
```


##### 参数

<table>
  <thead>
    <tr>
      <th>名称</th><th>类型</th><th>详情</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>params</var></code></td>
      <td>`remote.StorageGetCookiesParameters`</td>
      <td><pre>\{<br />  filter?: StorageCookieFilter;<br />  partition?: StoragePartitionDescriptor;<br />\}</pre></td>
    </tr>
  </tbody>
</table>


##### 返回

- **&lt;Object&gt;**
            **<code><var>local.StorageGetCookiesResult</var></code>:** 命令返回值，具有以下接口：
   ```ts
   {
     cookies: NetworkCookie[];
     partitionKey: StoragePartitionKey;
   }
   ```


---

## storageSetCookie
WebDriver Bidi命令，用于发送命令方法"storage.setCookie"及其参数。<br /><br />WebDriver Bidi协议命令。更多详情可以在[官方协议文档](https://w3c.github.io/webdriver-bidi/#command-storage-setCookie)中找到。

##### 用法

```js
browser.storageSetCookie(params)
```


##### 参数

<table>
  <thead>
    <tr>
      <th>名称</th><th>类型</th><th>详情</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>params</var></code></td>
      <td>`remote.StorageSetCookieParameters`</td>
      <td><pre>\{<br />  cookie: StoragePartialCookie;<br />  partition?: StoragePartitionDescriptor;<br />\}</pre></td>
    </tr>
  </tbody>
</table>


##### 返回

- **&lt;Object&gt;**
            **<code><var>local.StorageSetCookieResult</var></code>:** 命令返回值，具有以下接口：
   ```ts
   {
     partitionKey: StoragePartitionKey;
   }
   ```


---

## storageDeleteCookies
WebDriver Bidi命令，用于发送命令方法"storage.deleteCookies"及其参数。<br /><br />WebDriver Bidi协议命令。更多详情可以在[官方协议文档](https://w3c.github.io/webdriver-bidi/#command-storage-deleteCookies)中找到。

##### 用法

```js
browser.storageDeleteCookies(params)
```


##### 参数

<table>
  <thead>
    <tr>
      <th>名称</th><th>类型</th><th>详情</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>params</var></code></td>
      <td>`remote.StorageDeleteCookiesParameters`</td>
      <td><pre>\{<br />  filter?: StorageCookieFilter;<br />  partition?: StoragePartitionDescriptor;<br />\}</pre></td>
    </tr>
  </tbody>
</table>


##### 返回

- **&lt;Object&gt;**
            **<code><var>local.StorageDeleteCookiesResult</var></code>:** 命令返回值，具有以下接口：
   ```ts
   {
     partitionKey: StoragePartitionKey;
   }
   ```


---

## inputPerformActions
WebDriver Bidi命令，用于发送命令方法"input.performActions"及其参数。<br /><br />WebDriver Bidi协议命令。更多详情可以在[官方协议文档](https://w3c.github.io/webdriver-bidi/#command-input-performActions)中找到。

##### 用法

```js
browser.inputPerformActions(params)
```


##### 参数

<table>
  <thead>
    <tr>
      <th>名称</th><th>类型</th><th>详情</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>params</var></code></td>
      <td>`remote.InputPerformActionsParameters`</td>
      <td><pre>\{<br />  context: BrowsingContextBrowsingContext;<br />  actions: InputSourceActions[];<br />\}</pre></td>
    </tr>
  </tbody>
</table>



---

## inputReleaseActions
WebDriver Bidi命令，用于发送命令方法"input.releaseActions"及其参数。<br /><br />WebDriver Bidi协议命令。更多详情可以在[官方协议文档](https://w3c.github.io/webdriver-bidi/#command-input-releaseActions)中找到。

##### 用法

```js
browser.inputReleaseActions(params)
```


##### 参数

<table>
  <thead>
    <tr>
      <th>名称</th><th>类型</th><th>详情</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>params</var></code></td>
      <td>`remote.InputReleaseActionsParameters`</td>
      <td><pre>\{<br />  context: BrowsingContextBrowsingContext;<br />\}</pre></td>
    </tr>
  </tbody>
</table>



---

## inputSetFiles
WebDriver Bidi命令，用于发送命令方法"input.setFiles"及其参数。<br /><br />WebDriver Bidi协议命令。更多详情可以在[官方协议文档](https://w3c.github.io/webdriver-bidi/#command-input-setFiles)中找到。

##### 用法

```js
browser.inputSetFiles(params)
```


##### 参数

<table>
  <thead>
    <tr>
      <th>名称</th><th>类型</th><th>详情</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>params</var></code></td>
      <td>`remote.InputSetFilesParameters`</td>
      <td><pre>\{<br />  context: BrowsingContextBrowsingContext;<br />  element: ScriptSharedReference;<br />  files: string[];<br />\}</pre></td>
    </tr>
  </tbody>
</table>


