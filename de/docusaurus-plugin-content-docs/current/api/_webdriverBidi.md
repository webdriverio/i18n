---
id: webdriverBidi
title: WebDriver Bidi Protokoll
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-protocols/src/protocols/webdriverBidi.ts
---

Diese Protokollbefehle werden basierend auf der aktuellen
[WebDriver Bidi](https://w3c.github.io/webdriver-bidi/) Spezifikation generiert. Um das Protokoll
für Ihren Test zu aktivieren, stellen Sie sicher, dass Sie `webSocketUrl: true` in Ihren Capabilities gesetzt haben.

:::caution Mit Vorsicht verwenden!

Die Browserunterstützung ist nicht garantiert und Schnittstellen können sich in Zukunft ändern. Der Standard
wird derzeit entwickelt und Browserhersteller werden diese Funktionen nach ihrem
eigenen Zeitplan hinzufügen.

:::

Letztes Update: Sat Apr 26 2025 17:10:07 GMT-0700 (Pacific Daylight Time)

---
## send
Send socket commands via WebDriver Bidi<br /><br />WebDriver Bidi Protocol command. More details can be found in the [official protocol docs](https://github.com/w3c/webdriver-bidi).



##### Usage

```js
browser.send(params)
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
      <td><code><var>params</var></code></td>
      <td>CommandData</td>
      <td>socket payload</td>
    </tr>
  </tbody>
</table>


##### Returns

- **&lt;Object&gt;**
            **<code><var>CommandResponse</var></code>:** WebDriver Bidi response


---
## sendAsync
Send asynchronous socket commands via WebDriver Bidi<br /><br />WebDriver Bidi Protocol command. More details can be found in the [official protocol docs](https://github.com/w3c/webdriver-bidi).



##### Usage

```js
browser.sendAsync(params)
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
      <td><code><var>params</var></code></td>
      <td>CommandData</td>
      <td>socket payload</td>
    </tr>
  </tbody>
</table>


##### Returns

- **&lt;Number&gt;**
            **<code><var>id</var></code>:** id of WebDriver Bidi request


---
## sessionStatus
WebDriver Bidi command to send command method "session.status" with parameters.<br /><br />WebDriver Bidi Protocol command. More details can be found in the [official protocol docs](https://w3c.github.io/webdriver-bidi/#command-session-status).



##### Usage

```js
browser.sessionStatus(params)
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
      <td><code><var>params</var></code></td>
      <td>`remote.EmptyParams`</td>
      <td><pre>\{\}</pre></td>
    </tr>
  </tbody>
</table>


##### Returns

- **&lt;Object&gt;**
            **<code><var>local.SessionStatusResult</var></code>:** Command return value with the following interface:
   ```ts
   {
     ready: boolean;
     message: string;
   }
   ```


---
## sessionNew
WebDriver Bidi command to send command method "session.new" with parameters.<br /><br />WebDriver Bidi Protocol command. More details can be found in the [official protocol docs](https://w3c.github.io/webdriver-bidi/#command-session-new).



##### Usage

```js
browser.sessionNew(params)
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
      <td><code><var>params</var></code></td>
      <td>`remote.SessionNewParameters`</td>
      <td><pre>\{<br />  capabilities: SessionCapabilitiesRequest;<br />\}</pre></td>
    </tr>
  </tbody>
</table>


##### Returns

- **&lt;Object&gt;**
            **<code><var>local.SessionNewResult</var></code>:** Command return value with the following interface:
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
WebDriver Bidi command to send command method "session.end" with parameters.<br /><br />WebDriver Bidi Protocol command. More details can be found in the [official protocol docs](https://w3c.github.io/webdriver-bidi/#command-session-end).



##### Usage

```js
browser.sessionEnd(params)
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
      <td><code><var>params</var></code></td>
      <td>`remote.EmptyParams`</td>
      <td><pre>\{\}</pre></td>
    </tr>
  </tbody>
</table>





---
## sessionSubscribe
WebDriver Bidi command to send command method "session.subscribe" with parameters.<br /><br />WebDriver Bidi Protocol command. More details can be found in the [official protocol docs](https://w3c.github.io/webdriver-bidi/#command-session-subscribe).



##### Usage

```js
browser.sessionSubscribe(params)
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
      <td><code><var>params</var></code></td>
      <td>`remote.SessionSubscriptionRequest`</td>
      <td><pre>\{<br />  events: string[];<br />  contexts?: BrowsingContextBrowsingContext[];<br />\}</pre></td>
    </tr>
  </tbody>
</table>





---
## sessionUnsubscribe
WebDriver Bidi command to send command method "session.unsubscribe" with parameters.<br /><br />WebDriver Bidi Protocol command. More details can be found in the [official protocol docs](https://w3c.github.io/webdriver-bidi/#command-session-unsubscribe).



##### Usage

```js
browser.sessionUnsubscribe(params)
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
      <td><code><var>params</var></code></td>
      <td>`remote.SessionSubscriptionRequest`</td>
      <td><pre>\{<br />  events: string[];<br />  contexts?: BrowsingContextBrowsingContext[];<br />\}</pre></td>
    </tr>
  </tbody>
</table>





---
## browserClose
WebDriver Bidi command to send command method "browser.close" with parameters.<br /><br />WebDriver Bidi Protocol command. More details can be found in the [official protocol docs](https://w3c.github.io/webdriver-bidi/#command-browser-close).



##### Usage

```js
browser.browserClose(params)
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
      <td><code><var>params</var></code></td>
      <td>`remote.EmptyParams`</td>
      <td><pre>\{\}</pre></td>
    </tr>
  </tbody>
</table>





---
## browserCreateUserContext
WebDriver Bidi command to send command method "browser.createUserContext" with parameters.<br /><br />WebDriver Bidi Protocol command. More details can be found in the [official protocol docs](https://w3c.github.io/webdriver-bidi/#command-browser-createUserContext).



##### Usage

```js
browser.browserCreateUserContext(params)
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
      <td><code><var>params</var></code></td>
      <td>`remote.EmptyParams`</td>
      <td><pre>\{\}</pre></td>
    </tr>
  </tbody>
</table>


##### Returns

- **&lt;Object&gt;**
            **<code><var>local.BrowserCreateUserContextResult</var></code>:** Command return value with the following interface:
   ```ts
   ;
   ```


---
## browserGetUserContexts
WebDriver Bidi command to send command method "browser.getUserContexts" with parameters.<br /><br />WebDriver Bidi Protocol command. More details can be found in the [official protocol docs](https://w3c.github.io/webdriver-bidi/#command-browser-getUserContexts).



##### Usage

```js
browser.browserGetUserContexts(params)
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
      <td><code><var>params</var></code></td>
      <td>`remote.EmptyParams`</td>
      <td><pre>\{\}</pre></td>
    </tr>
  </tbody>
</table>


##### Returns

- **&lt;Object&gt;**
            **<code><var>local.BrowserGetUserContextsResult</var></code>:** Command return value with the following interface:
   ```ts
   {
     userContexts: BrowserUserContextInfo[];
   }
   ```


---
## browserRemoveUserContext
WebDriver Bidi command to send command method "browser.removeUserContext" with parameters.<br /><br />WebDriver Bidi Protocol command. More details can be found in the [official protocol docs](https://w3c.github.io/webdriver-bidi/#command-browser-removeUserContext).



##### Usage

```js
browser.browserRemoveUserContext(params)
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
      <td><code><var>params</var></code></td>
      <td>`remote.BrowserRemoveUserContextParameters`</td>
      <td><pre>\{<br />  userContext: BrowserUserContext;<br />\}</pre></td>
    </tr>
  </tbody>
</table>





---
## browsingContextActivate
WebDriver Bidi command to send command method "browsingContext.activate" with parameters.<br /><br />WebDriver Bidi Protocol command. More details can be found in the [official protocol docs](https://w3c.github.io/webdriver-bidi/#command-browsingContext-activate).



##### Usage

```js
browser.browsingContextActivate(params)
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
      <td><code><var>params</var></code></td>
      <td>`remote.BrowsingContextActivateParameters`</td>
      <td><pre>\{<br />  context: BrowsingContextBrowsingContext;<br />\}</pre></td>
    </tr>
  </tbody>
</table>





---
## browsingContextCaptureScreenshot
WebDriver Bidi command to send command method "browsingContext.captureScreenshot" with parameters.<br /><br />WebDriver Bidi Protocol command. More details can be found in the [official protocol docs](https://w3c.github.io/webdriver-bidi/#command-browsingContext-captureScreenshot).



##### Usage

```js
browser.browsingContextCaptureScreenshot(params)
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
      <td><code><var>params</var></code></td>
      <td>`remote.BrowsingContextCaptureScreenshotParameters`</td>
      <td><pre>\{<br />  context: BrowsingContextBrowsingContext;<br />  /\*\*<br />   \* @default 'viewport'<br />   \*/<br />  origin?: "viewport" &#124; "document";<br />  format?: BrowsingContextImageFormat;<br />  clip?: BrowsingContextClipRectangle;<br />\}</pre></td>
    </tr>
  </tbody>
</table>


##### Returns

- **&lt;Object&gt;**
            **<code><var>local.BrowsingContextCaptureScreenshotResult</var></code>:** Command return value with the following interface:
   ```ts
   {
     data: string;
   }
   ```


---
## browsingContextClose
WebDriver Bidi command to send command method "browsingContext.close" with parameters.<br /><br />WebDriver Bidi Protocol command. More details can be found in the [official protocol docs](https://w3c.github.io/webdriver-bidi/#command-browsingContext-close).



##### Usage

```js
browser.browsingContextClose(params)
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
      <td><code><var>params</var></code></td>
      <td>`remote.BrowsingContextCloseParameters`</td>
      <td><pre>\{<br />  context: BrowsingContextBrowsingContext;<br />  promptUnload?: boolean;<br />\}</pre></td>
    </tr>
  </tbody>
</table>





---
## browsingContextCreate
WebDriver Bidi command to send command method "browsingContext.create" with parameters.<br /><br />WebDriver Bidi Protocol command. More details can be found in the [official protocol docs](https://w3c.github.io/webdriver-bidi/#command-browsingContext-create).



##### Usage

```js
browser.browsingContextCreate(params)
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
      <td><code><var>params</var></code></td>
      <td>`remote.BrowsingContextCreateParameters`</td>
      <td><pre>\{<br />  type: BrowsingContextCreateType;<br />  referenceContext?: BrowsingContextBrowsingContext;<br />  background?: boolean;<br />  userContext?: BrowserUserContext;<br />\}</pre></td>
    </tr>
  </tbody>
</table>


##### Returns

- **&lt;Object&gt;**
            **<code><var>local.BrowsingContextCreateResult</var></code>:** Command return value with the following interface:
   ```ts
   {
     context: BrowsingContextBrowsingContext;
   }
   ```


---
## browsingContextGetTree
WebDriver Bidi command to send command method "browsingContext.getTree" with parameters.<br /><br />WebDriver Bidi Protocol command. More details can be found in the [official protocol docs](https://w3c.github.io/webdriver-bidi/#command-browsingContext-getTree).



##### Usage

```js
browser.browsingContextGetTree(params)
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
      <td><code><var>params</var></code></td>
      <td>`remote.BrowsingContextGetTreeParameters`</td>
      <td><pre>\{<br />  maxDepth?: JsUint;<br />  root?: BrowsingContextBrowsingContext;<br />\}</pre></td>
    </tr>
  </tbody>
</table>


##### Returns

- **&lt;Object&gt;**
            **<code><var>local.BrowsingContextGetTreeResult</var></code>:** Command return value with the following interface:
   ```ts
   {
     contexts: BrowsingContextInfoList;
   }
   ```


---
## browsingContextHandleUserPrompt
WebDriver Bidi command to send command method "browsingContext.handleUserPrompt" with parameters.<br /><br />WebDriver Bidi Protocol command. More details can be found in the [official protocol docs](https://w3c.github.io/webdriver-bidi/#command-browsingContext-handleUserPrompt).



##### Usage

```js
browser.browsingContextHandleUserPrompt(params)
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
      <td><code><var>params</var></code></td>
      <td>`remote.BrowsingContextHandleUserPromptParameters`</td>
      <td><pre>\{<br />  context: BrowsingContextBrowsingContext;<br />  accept?: boolean;<br />  userText?: string;<br />\}</pre></td>
    </tr>
  </tbody>
</table>





---
## browsingContextLocateNodes
WebDriver Bidi command to send command method "browsingContext.locateNodes" with parameters.<br /><br />WebDriver Bidi Protocol command. More details can be found in the [official protocol docs](https://w3c.github.io/webdriver-bidi/#command-browsingContext-locateNodes).



##### Usage

```js
browser.browsingContextLocateNodes(params)
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
      <td><code><var>params</var></code></td>
      <td>`remote.BrowsingContextLocateNodesParameters`</td>
      <td><pre>\{<br />  context: BrowsingContextBrowsingContext;<br />  locator: BrowsingContextLocator;<br />  maxNodeCount?: JsUint;<br />  serializationOptions?: ScriptSerializationOptions;<br />  startNodes?: ScriptSharedReference[];<br />\}</pre></td>
    </tr>
  </tbody>
</table>


##### Returns

- **&lt;Object&gt;**
            **<code><var>local.BrowsingContextLocateNodesResult</var></code>:** Command return value with the following interface:
   ```ts
   {
     nodes: ScriptNodeRemoteValue[];
   }
   ```


---
## browsingContextNavigate
WebDriver Bidi command to send command method "browsingContext.navigate" with parameters.<br /><br />WebDriver Bidi Protocol command. More details can be found in the [official protocol docs](https://w3c.github.io/webdriver-bidi/#command-browsingContext-navigate).



##### Usage

```js
browser.browsingContextNavigate(params)
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
      <td><code><var>params</var></code></td>
      <td>`remote.BrowsingContextNavigateParameters`</td>
      <td><pre>\{<br />  context: BrowsingContextBrowsingContext;<br />  url: string;<br />  wait?: BrowsingContextReadinessState;<br />\}</pre></td>
    </tr>
  </tbody>
</table>


##### Returns

- **&lt;Object&gt;**
            **<code><var>local.BrowsingContextNavigateResult</var></code>:** Command return value with the following interface:
   ```ts
   {
     navigation: BrowsingContextNavigation | null;
     url: string;
   }
   ```


---
## browsingContextPrint
WebDriver Bidi command to send command method "browsingContext.print" with parameters.<br /><br />WebDriver Bidi Protocol command. More details can be found in the [official protocol docs](https://w3c.github.io/webdriver-bidi/#command-browsingContext-print).



##### Usage

```js
browser.browsingContextPrint(params)
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
      <td><code><var>params</var></code></td>
      <td>`remote.BrowsingContextPrintParameters`</td>
      <td><pre>\{<br />  context: BrowsingContextBrowsingContext;<br />  background?: boolean;<br />  margin?: BrowsingContextPrintMarginParameters;<br />  /\*\*<br />   \* @default 'portrait'<br />   \*/<br />  orientation?: "portrait" &#124; "landscape";<br />  page?: BrowsingContextPrintPageParameters;<br />  pageRanges?: (JsUint &#124; string)[];<br />  /\*\*<br />   \* @default 1<br />   \*/<br />  scale?: number;<br />  /\*\*<br />   \* @default true<br />   \*/<br />  shrinkToFit?: boolean;<br />\}</pre></td>
    </tr>
  </tbody>
</table>


##### Returns

- **&lt;Object&gt;**
            **<code><var>local.BrowsingContextPrintResult</var></code>:** Command return value with the following interface:
   ```ts
   {
     data: string;
   }
   ```


---
## browsingContextReload
WebDriver Bidi command to send command method "browsingContext.reload" with parameters.<br /><br />WebDriver Bidi Protocol command. More details can be found in the [official protocol docs](https://w3c.github.io/webdriver-bidi/#command-browsingContext-reload).



##### Usage

```js
browser.browsingContextReload(params)
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
      <td><code><var>params</var></code></td>
      <td>`remote.BrowsingContextReloadParameters`</td>
      <td><pre>\{<br />  context: BrowsingContextBrowsingContext;<br />  ignoreCache?: boolean;<br />  wait?: BrowsingContextReadinessState;<br />\}</pre></td>
    </tr>
  </tbody>
</table>





---
## browsingContextSetViewport
WebDriver Bidi command to send command method "browsingContext.setViewport" with parameters.<br /><br />WebDriver Bidi Protocol command. More details can be found in the [official protocol docs](https://w3c.github.io/webdriver-bidi/#command-browsingContext-setViewport).



##### Usage

```js
browser.browsingContextSetViewport(params)
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
      <td><code><var>params</var></code></td>
      <td>`remote.BrowsingContextSetViewportParameters`</td>
      <td><pre>\{<br />  context: BrowsingContextBrowsingContext;<br />  viewport?: BrowsingContextViewport &#124; null;<br />  devicePixelRatio?: number &#124; null;<br />\}</pre></td>
    </tr>
  </tbody>
</table>





---
## browsingContextTraverseHistory
WebDriver Bidi command to send command method "browsingContext.traverseHistory" with parameters.<br /><br />WebDriver Bidi Protocol command. More details can be found in the [official protocol docs](https://w3c.github.io/webdriver-bidi/#command-browsingContext-traverseHistory).



##### Usage

```js
browser.browsingContextTraverseHistory(params)
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
      <td><code><var>params</var></code></td>
      <td>`remote.BrowsingContextTraverseHistoryParameters`</td>
      <td><pre>\{<br />  context: BrowsingContextBrowsingContext;<br />  delta: JsInt;<br />\}</pre></td>
    </tr>
  </tbody>
</table>





---
## networkAddIntercept
WebDriver Bidi command to send command method "network.addIntercept" with parameters.<br /><br />WebDriver Bidi Protocol command. More details can be found in the [official protocol docs](https://w3c.github.io/webdriver-bidi/#command-network-addIntercept).



##### Usage

```js
browser.networkAddIntercept(params)
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
      <td><code><var>params</var></code></td>
      <td>`remote.NetworkAddInterceptParameters`</td>
      <td><pre>\{<br />  phases: NetworkInterceptPhase[];<br />  contexts?: BrowsingContextBrowsingContext[];<br />  urlPatterns?: NetworkUrlPattern[];<br />\}</pre></td>
    </tr>
  </tbody>
</table>


##### Returns

- **&lt;Object&gt;**
            **<code><var>local.NetworkAddInterceptResult</var></code>:** Command return value with the following interface:
   ```ts
   {
     intercept: NetworkIntercept;
   }
   ```


---
## networkContinueRequest
WebDriver Bidi command to send command method "network.continueRequest" with parameters.<br /><br />WebDriver Bidi Protocol command. More details can be found in the [official protocol docs](https://w3c.github.io/webdriver-bidi/#command-network-continueRequest).



##### Usage

```js
browser.networkContinueRequest(params)
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
      <td><code><var>params</var></code></td>
      <td>`remote.NetworkContinueRequestParameters`</td>
      <td><pre>\{<br />  request: NetworkRequest;<br />  body?: NetworkBytesValue;<br />  cookies?: NetworkCookieHeader[];<br />  headers?: NetworkHeader[];<br />  method?: string;<br />  url?: string;<br />\}</pre></td>
    </tr>
  </tbody>
</table>





---
## networkContinueResponse
WebDriver Bidi command to send command method "network.continueResponse" with parameters.<br /><br />WebDriver Bidi Protocol command. More details can be found in the [official protocol docs](https://w3c.github.io/webdriver-bidi/#command-network-continueResponse).



##### Usage

```js
browser.networkContinueResponse(params)
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
      <td><code><var>params</var></code></td>
      <td>`remote.NetworkContinueResponseParameters`</td>
      <td><pre>\{<br />  request: NetworkRequest;<br />  cookies?: NetworkSetCookieHeader[];<br />  credentials?: NetworkAuthCredentials;<br />  headers?: NetworkHeader[];<br />  reasonPhrase?: string;<br />  statusCode?: JsUint;<br />\}</pre></td>
    </tr>
  </tbody>
</table>





---
## networkContinueWithAuth
WebDriver Bidi command to send command method "network.continueWithAuth" with parameters.<br /><br />WebDriver Bidi Protocol command. More details can be found in the [official protocol docs](https://w3c.github.io/webdriver-bidi/#command-network-continueWithAuth).



##### Usage

```js
browser.networkContinueWithAuth(params)
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
      <td><code><var>params</var></code></td>
      <td>`remote.NetworkContinueWithAuthParameters`</td>
      <td><pre>\{<br />  request: NetworkRequest;<br />\}</pre></td>
    </tr>
  </tbody>
</table>





---
## networkFailRequest
WebDriver Bidi command to send command method "network.failRequest" with parameters.<br /><br />WebDriver Bidi Protocol command. More details can be found in the [official protocol docs](https://w3c.github.io/webdriver-bidi/#command-network-failRequest).



##### Usage

```js
browser.networkFailRequest(params)
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
      <td><code><var>params</var></code></td>
      <td>`remote.NetworkFailRequestParameters`</td>
      <td><pre>\{<br />  request: NetworkRequest;<br />\}</pre></td>
    </tr>
  </tbody>
</table>





---
## networkProvideResponse
WebDriver Bidi command to send command method "network.provideResponse" with parameters.<br /><br />WebDriver Bidi Protocol command. More details can be found in the [official protocol docs](https://w3c.github.io/webdriver-bidi/#command-network-provideResponse).



##### Usage

```js
browser.networkProvideResponse(params)
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
      <td><code><var>params</var></code></td>
      <td>`remote.NetworkProvideResponseParameters`</td>
      <td><pre>\{<br />  request: NetworkRequest;<br />  body?: NetworkBytesValue;<br />  cookies?: NetworkSetCookieHeader[];<br />  headers?: NetworkHeader[];<br />  reasonPhrase?: string;<br />  statusCode?: JsUint;<br />\}</pre></td>
    </tr>
  </tbody>
</table>





---
## networkRemoveIntercept
WebDriver Bidi command to send command method "network.removeIntercept" with parameters.<br /><br />WebDriver Bidi Protocol command. More details can be found in the [official protocol docs](https://w3c.github.io/webdriver-bidi/#command-network-removeIntercept).



##### Usage

```js
browser.networkRemoveIntercept(params)
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
      <td><code><var>params</var></code></td>
      <td>`remote.NetworkRemoveInterceptParameters`</td>
      <td><pre>\{<br />  intercept: NetworkIntercept;<br />\}</pre></td>
    </tr>
  </tbody>
</table>





---
## scriptAddPreloadScript
WebDriver Bidi command to send command method "script.addPreloadScript" with parameters.<br /><br />WebDriver Bidi Protocol command. More details can be found in the [official protocol docs](https://w3c.github.io/webdriver-bidi/#command-script-addPreloadScript).



##### Usage

```js
browser.scriptAddPreloadScript(params)
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
      <td><code><var>params</var></code></td>
      <td>`remote.ScriptAddPreloadScriptParameters`</td>
      <td><pre>\{<br />  functionDeclaration: string;<br />  arguments?: ScriptChannelValue[];<br />  contexts?: BrowsingContextBrowsingContext[];<br />  sandbox?: string;<br />\}</pre></td>
    </tr>
  </tbody>
</table>


##### Returns

- **&lt;Object&gt;**
            **<code><var>local.ScriptAddPreloadScriptResult</var></code>:** Command return value with the following interface:
   ```ts
   {
     script: ScriptPreloadScript;
   }
   ```


---
## scriptDisown
WebDriver Bidi command to send command method "script.disown" with parameters.<br /><br />WebDriver Bidi Protocol command. More details can be found in the [official protocol docs](https://w3c.github.io/webdriver-bidi/#command-script-disown).



##### Usage

```js
browser.scriptDisown(params)
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
      <td><code><var>params</var></code></td>
      <td>`remote.ScriptDisownParameters`</td>
      <td><pre>\{<br />  handles: ScriptHandle[];<br />  target: ScriptTarget;<br />\}</pre></td>
    </tr>
  </tbody>
</table>





---
## scriptCallFunction
WebDriver Bidi command to send command method "script.callFunction" with parameters.<br /><br />WebDriver Bidi Protocol command. More details can be found in the [official protocol docs](https://w3c.github.io/webdriver-bidi/#command-script-callFunction).



##### Usage

```js
browser.scriptCallFunction(params)
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
      <td><code><var>params</var></code></td>
      <td>`remote.ScriptCallFunctionParameters`</td>
      <td><pre>\{<br />  functionDeclaration: string;<br />  awaitPromise: boolean;<br />  target: ScriptTarget;<br />  arguments?: ScriptLocalValue[];<br />  resultOwnership?: ScriptResultOwnership;<br />  serializationOptions?: ScriptSerializationOptions;<br />  this?: ScriptLocalValue;<br />  userActivation?: boolean;<br />\}</pre></td>
    </tr>
  </tbody>
</table>





---
## scriptEvaluate
WebDriver Bidi command to send command method "script.evaluate" with parameters.<br /><br />WebDriver Bidi Protocol command. More details can be found in the [official protocol docs](https://w3c.github.io/webdriver-bidi/#command-script-evaluate).



##### Usage

```js
browser.scriptEvaluate(params)
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
      <td><code><var>params</var></code></td>
      <td>`remote.ScriptEvaluateParameters`</td>
      <td><pre>\{<br />  expression: string;<br />  target: ScriptTarget;<br />  awaitPromise: boolean;<br />  resultOwnership?: ScriptResultOwnership;<br />  serializationOptions?: ScriptSerializationOptions;<br />  userActivation?: boolean;<br />\}</pre></td>
    </tr>
  </tbody>
</table>


##### Returns

- **&lt;Object&gt;**
            **<code><var>local.ScriptEvaluateResult</var></code>:** Command return value with the following interface:
   ```ts
   ;
   ```


---
## scriptGetRealms
WebDriver Bidi command to send command method "script.getRealms" with parameters.<br /><br />WebDriver Bidi Protocol command. More details can be found in the [official protocol docs](https://w3c.github.io/webdriver-bidi/#command-script-getRealms).



##### Usage

```js
browser.scriptGetRealms(params)
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
      <td><code><var>params</var></code></td>
      <td>`remote.ScriptGetRealmsParameters`</td>
      <td><pre>\{<br />  context?: BrowsingContextBrowsingContext;<br />  type?: ScriptRealmType;<br />\}</pre></td>
    </tr>
  </tbody>
</table>


##### Returns

- **&lt;Object&gt;**
            **<code><var>local.ScriptGetRealmsResult</var></code>:** Command return value with the following interface:
   ```ts
   {
     realms: ScriptRealmInfo[];
   }
   ```


---
## scriptRemovePreloadScript
WebDriver Bidi command to send command method "script.removePreloadScript" with parameters.<br /><br />WebDriver Bidi Protocol command. More details can be found in the [official protocol docs](https://w3c.github.io/webdriver-bidi/#command-script-removePreloadScript).



##### Usage

```js
browser.scriptRemovePreloadScript(params)
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
      <td><code><var>params</var></code></td>
      <td>`remote.ScriptRemovePreloadScriptParameters`</td>
      <td><pre>\{<br />  script: ScriptPreloadScript;<br />\}</pre></td>
    </tr>
  </tbody>
</table>





---
## storageGetCookies
WebDriver Bidi command to send command method "storage.getCookies" with parameters.<br /><br />WebDriver Bidi Protocol command. More details can be found in the [official protocol docs](https://w3c.github.io/webdriver-bidi/#command-storage-getCookies).



##### Usage

```js
browser.storageGetCookies(params)
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
      <td><code><var>params</var></code></td>
      <td>`remote.StorageGetCookiesParameters`</td>
      <td><pre>\{<br />  filter?: StorageCookieFilter;<br />  partition?: StoragePartitionDescriptor;<br />\}</pre></td>
    </tr>
  </tbody>
</table>


##### Returns

- **&lt;Object&gt;**
            **<code><var>local.StorageGetCookiesResult</var></code>:** Command return value with the following interface:
   ```ts
   {
     cookies: NetworkCookie[];
     partitionKey: StoragePartitionKey;
   }
   ```


---
## storageSetCookie
WebDriver Bidi command to send command method "storage.setCookie" with parameters.<br /><br />WebDriver Bidi Protocol command. More details can be found in the [official protocol docs](https://w3c.github.io/webdriver-bidi/#command-storage-setCookie).



##### Usage

```js
browser.storageSetCookie(params)
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
      <td><code><var>params</var></code></td>
      <td>`remote.StorageSetCookieParameters`</td>
      <td><pre>\{<br />  cookie: StoragePartialCookie;<br />  partition?: StoragePartitionDescriptor;<br />\}</pre></td>
    </tr>
  </tbody>
</table>


##### Returns

- **&lt;Object&gt;**
            **<code><var>local.StorageSetCookieResult</var></code>:** Command return value with the following interface:
   ```ts
   {
     partitionKey: StoragePartitionKey;
   }
   ```


---
## storageDeleteCookies
WebDriver Bidi command to send command method "storage.deleteCookies" with parameters.<br /><br />WebDriver Bidi Protocol command. More details can be found in the [official protocol docs](https://w3c.github.io/webdriver-bidi/#command-storage-deleteCookies).



##### Usage

```js
browser.storageDeleteCookies(params)
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
      <td><code><var>params</var></code></td>
      <td>`remote.StorageDeleteCookiesParameters`</td>
      <td><pre>\{<br />  filter?: StorageCookieFilter;<br />  partition?: StoragePartitionDescriptor;<br />\}</pre></td>
    </tr>
  </tbody>
</table>


##### Returns

- **&lt;Object&gt;**
            **<code><var>local.StorageDeleteCookiesResult</var></code>:** Command return value with the following interface:
   ```ts
   {
     partitionKey: StoragePartitionKey;
   }
   ```


---
## inputPerformActions
WebDriver Bidi command to send command method "input.performActions" with parameters.<br /><br />WebDriver Bidi Protocol command. More details can be found in the [official protocol docs](https://w3c.github.io/webdriver-bidi/#command-input-performActions).



##### Usage

```js
browser.inputPerformActions(params)
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
      <td><code><var>params</var></code></td>
      <td>`remote.InputPerformActionsParameters`</td>
      <td><pre>\{<br />  context: BrowsingContextBrowsingContext;<br />  actions: InputSourceActions[];<br />\}</pre></td>
    </tr>
  </tbody>
</table>





---
## inputReleaseActions
WebDriver Bidi command to send command method "input.releaseActions" with parameters.<br /><br />WebDriver Bidi Protocol command. More details can be found in the [official protocol docs](https://w3c.github.io/webdriver-bidi/#command-input-releaseActions).



##### Usage

```js
browser.inputReleaseActions(params)
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
      <td><code><var>params</var></code></td>
      <td>`remote.InputReleaseActionsParameters`</td>
      <td><pre>\{<br />  context: BrowsingContextBrowsingContext;<br />\}</pre></td>
    </tr>
  </tbody>
</table>





---
## inputSetFiles
WebDriver Bidi command to send command method "input.setFiles" with parameters.<br /><br />WebDriver Bidi Protocol command. More details can be found in the [official protocol docs](https://w3c.github.io/webdriver-bidi/#command-input-setFiles).



##### Usage

```js
browser.inputSetFiles(params)
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
      <td><code><var>params</var></code></td>
      <td>`remote.InputSetFilesParameters`</td>
      <td><pre>\{<br />  context: BrowsingContextBrowsingContext;<br />  element: ScriptSharedReference;<br />  files: string[];<br />\}</pre></td>
    </tr>
  </tbody>
</table>




