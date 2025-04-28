---
id: webdriverBidi
title: WebDriver Bidi プロトコル
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-protocols/src/protocols/webdriverBidi.ts
---

これらのプロトコルコマンドは、現在の最新の[WebDriver Bidi](https://w3c.github.io/webdriver-bidi/)仕様に基づいて生成されています。テストでプロトコルを有効にするには、capabilities に `webSocketUrl: true` を設定していることを確認してください。

:::caution 注意して使用してください！

ブラウザサポートは保証されておらず、インターフェースは将来変更される可能性があります。この標準は現在開発中であり、ブラウザベンダーは各自のタイムラインに基づいてこれらの機能を追加します。

:::

最終更新: Sat Apr 26 2025 17:10:07 GMT-0700 (Pacific Daylight Time)

---

## send
WebDriver Bidiを介してソケットコマンドを送信<br /><br />WebDriver Bidiプロトコルコマンド。詳細は[公式プロトコルドキュメント](https://github.com/w3c/webdriver-bidi)で確認できます。

##### 使用法

```js
browser.send(params)
```


##### パラメータ

<table>
  <thead>
    <tr>
      <th>名前</th><th>型</th><th>詳細</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>params</var></code></td>
      <td>CommandData</td>
      <td>ソケットペイロード</td>
    </tr>
  </tbody>
</table>


##### 戻り値

- **&lt;Object&gt;**
            **<code><var>CommandResponse</var></code>:** WebDriver Bidiレスポンス


---

## sendAsync
WebDriver Bidiを介して非同期ソケットコマンドを送信<br /><br />WebDriver Bidiプロトコルコマンド。詳細は[公式プロトコルドキュメント](https://github.com/w3c/webdriver-bidi)で確認できます。

##### 使用法

```js
browser.sendAsync(params)
```


##### パラメータ

<table>
  <thead>
    <tr>
      <th>名前</th><th>型</th><th>詳細</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>params</var></code></td>
      <td>CommandData</td>
      <td>ソケットペイロード</td>
    </tr>
  </tbody>
</table>


##### 戻り値

- **&lt;Number&gt;**
            **<code><var>id</var></code>:** WebDriver Bidiリクエストのid


---

## sessionStatus
パラメータを使用してコマンドメソッド "session.status" を送信するWebDriver Bidiコマンド。<br /><br />WebDriver Bidiプロトコルコマンド。詳細は[公式プロトコルドキュメント](https://w3c.github.io/webdriver-bidi/#command-session-status)で確認できます。

##### 使用法

```js
browser.sessionStatus(params)
```


##### パラメータ

<table>
  <thead>
    <tr>
      <th>名前</th><th>型</th><th>詳細</th>
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


##### 戻り値

- **&lt;Object&gt;**
            **<code><var>local.SessionStatusResult</var></code>:** 以下のインターフェースを持つコマンド戻り値:
   ```ts
   {
     ready: boolean;
     message: string;
   }
   ```


---

## sessionNew
パラメータを使用してコマンドメソッド "session.new" を送信するWebDriver Bidiコマンド。<br /><br />WebDriver Bidiプロトコルコマンド。詳細は[公式プロトコルドキュメント](https://w3c.github.io/webdriver-bidi/#command-session-new)で確認できます。

##### 使用法

```js
browser.sessionNew(params)
```


##### パラメータ

<table>
  <thead>
    <tr>
      <th>名前</th><th>型</th><th>詳細</th>
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


##### 戻り値

- **&lt;Object&gt;**
            **<code><var>local.SessionNewResult</var></code>:** 以下のインターフェースを持つコマンド戻り値:
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
パラメータを使用してコマンドメソッド "session.end" を送信するWebDriver Bidiコマンド。<br /><br />WebDriver Bidiプロトコルコマンド。詳細は[公式プロトコルドキュメント](https://w3c.github.io/webdriver-bidi/#command-session-end)で確認できます。

##### 使用法

```js
browser.sessionEnd(params)
```


##### パラメータ

<table>
  <thead>
    <tr>
      <th>名前</th><th>型</th><th>詳細</th>
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
パラメータを使用してコマンドメソッド "session.subscribe" を送信するWebDriver Bidiコマンド。<br /><br />WebDriver Bidiプロトコルコマンド。詳細は[公式プロトコルドキュメント](https://w3c.github.io/webdriver-bidi/#command-session-subscribe)で確認できます。

##### 使用法

```js
browser.sessionSubscribe(params)
```


##### パラメータ

<table>
  <thead>
    <tr>
      <th>名前</th><th>型</th><th>詳細</th>
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
パラメータを使用してコマンドメソッド "session.unsubscribe" を送信するWebDriver Bidiコマンド。<br /><br />WebDriver Bidiプロトコルコマンド。詳細は[公式プロトコルドキュメント](https://w3c.github.io/webdriver-bidi/#command-session-unsubscribe)で確認できます。

##### 使用法

```js
browser.sessionUnsubscribe(params)
```


##### パラメータ

<table>
  <thead>
    <tr>
      <th>名前</th><th>型</th><th>詳細</th>
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
パラメータを使用してコマンドメソッド "browser.close" を送信するWebDriver Bidiコマンド。<br /><br />WebDriver Bidiプロトコルコマンド。詳細は[公式プロトコルドキュメント](https://w3c.github.io/webdriver-bidi/#command-browser-close)で確認できます。

##### 使用法

```js
browser.browserClose(params)
```


##### パラメータ

<table>
  <thead>
    <tr>
      <th>名前</th><th>型</th><th>詳細</th>
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
パラメータを使用してコマンドメソッド "browser.createUserContext" を送信するWebDriver Bidiコマンド。<br /><br />WebDriver Bidiプロトコルコマンド。詳細は[公式プロトコルドキュメント](https://w3c.github.io/webdriver-bidi/#command-browser-createUserContext)で確認できます。

##### 使用法

```js
browser.browserCreateUserContext(params)
```


##### パラメータ

<table>
  <thead>
    <tr>
      <th>名前</th><th>型</th><th>詳細</th>
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


##### 戻り値

- **&lt;Object&gt;**
            **<code><var>local.BrowserCreateUserContextResult</var></code>:** 以下のインターフェースを持つコマンド戻り値:
   ```ts
   ;
   ```


---

## browserGetUserContexts
パラメータを使用してコマンドメソッド "browser.getUserContexts" を送信するWebDriver Bidiコマンド。<br /><br />WebDriver Bidiプロトコルコマンド。詳細は[公式プロトコルドキュメント](https://w3c.github.io/webdriver-bidi/#command-browser-getUserContexts)で確認できます。

##### 使用法

```js
browser.browserGetUserContexts(params)
```


##### パラメータ

<table>
  <thead>
    <tr>
      <th>名前</th><th>型</th><th>詳細</th>
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


##### 戻り値

- **&lt;Object&gt;**
            **<code><var>local.BrowserGetUserContextsResult</var></code>:** 以下のインターフェースを持つコマンド戻り値:
   ```ts
   {
     userContexts: BrowserUserContextInfo[];
   }
   ```


---

## browserRemoveUserContext
パラメータを使用してコマンドメソッド "browser.removeUserContext" を送信するWebDriver Bidiコマンド。<br /><br />WebDriver Bidiプロトコルコマンド。詳細は[公式プロトコルドキュメント](https://w3c.github.io/webdriver-bidi/#command-browser-removeUserContext)で確認できます。

##### 使用法

```js
browser.browserRemoveUserContext(params)
```


##### パラメータ

<table>
  <thead>
    <tr>
      <th>名前</th><th>型</th><th>詳細</th>
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
パラメータを使用してコマンドメソッド "browsingContext.activate" を送信するWebDriver Bidiコマンド。<br /><br />WebDriver Bidiプロトコルコマンド。詳細は[公式プロトコルドキュメント](https://w3c.github.io/webdriver-bidi/#command-browsingContext-activate)で確認できます。

##### 使用法

```js
browser.browsingContextActivate(params)
```


##### パラメータ

<table>
  <thead>
    <tr>
      <th>名前</th><th>型</th><th>詳細</th>
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
パラメータを使用してコマンドメソッド "browsingContext.captureScreenshot" を送信するWebDriver Bidiコマンド。<br /><br />WebDriver Bidiプロトコルコマンド。詳細は[公式プロトコルドキュメント](https://w3c.github.io/webdriver-bidi/#command-browsingContext-captureScreenshot)で確認できます。

##### 使用法

```js
browser.browsingContextCaptureScreenshot(params)
```


##### パラメータ

<table>
  <thead>
    <tr>
      <th>名前</th><th>型</th><th>詳細</th>
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


##### 戻り値

- **&lt;Object&gt;**
            **<code><var>local.BrowsingContextCaptureScreenshotResult</var></code>:** 以下のインターフェースを持つコマンド戻り値:
   ```ts
   {
     data: string;
   }
   ```


---

## browsingContextClose
パラメータを使用してコマンドメソッド "browsingContext.close" を送信するWebDriver Bidiコマンド。<br /><br />WebDriver Bidiプロトコルコマンド。詳細は[公式プロトコルドキュメント](https://w3c.github.io/webdriver-bidi/#command-browsingContext-close)で確認できます。

##### 使用法

```js
browser.browsingContextClose(params)
```


##### パラメータ

<table>
  <thead>
    <tr>
      <th>名前</th><th>型</th><th>詳細</th>
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
パラメータを使用してコマンドメソッド "browsingContext.create" を送信するWebDriver Bidiコマンド。<br /><br />WebDriver Bidiプロトコルコマンド。詳細は[公式プロトコルドキュメント](https://w3c.github.io/webdriver-bidi/#command-browsingContext-create)で確認できます。

##### 使用法

```js
browser.browsingContextCreate(params)
```


##### パラメータ

<table>
  <thead>
    <tr>
      <th>名前</th><th>型</th><th>詳細</th>
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


##### 戻り値

- **&lt;Object&gt;**
            **<code><var>local.BrowsingContextCreateResult</var></code>:** 以下のインターフェースを持つコマンド戻り値:
   ```ts
   {
     context: BrowsingContextBrowsingContext;
   }
   ```


---

## browsingContextGetTree
パラメータを使用してコマンドメソッド "browsingContext.getTree" を送信するWebDriver Bidiコマンド。<br /><br />WebDriver Bidiプロトコルコマンド。詳細は[公式プロトコルドキュメント](https://w3c.github.io/webdriver-bidi/#command-browsingContext-getTree)で確認できます。

##### 使用法

```js
browser.browsingContextGetTree(params)
```


##### パラメータ

<table>
  <thead>
    <tr>
      <th>名前</th><th>型</th><th>詳細</th>
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


##### 戻り値

- **&lt;Object&gt;**
            **<code><var>local.BrowsingContextGetTreeResult</var></code>:** 以下のインターフェースを持つコマンド戻り値:
   ```ts
   {
     contexts: BrowsingContextInfoList;
   }
   ```


---

## browsingContextHandleUserPrompt
パラメータを使用してコマンドメソッド "browsingContext.handleUserPrompt" を送信するWebDriver Bidiコマンド。<br /><br />WebDriver Bidiプロトコルコマンド。詳細は[公式プロトコルドキュメント](https://w3c.github.io/webdriver-bidi/#command-browsingContext-handleUserPrompt)で確認できます。

##### 使用法

```js
browser.browsingContextHandleUserPrompt(params)
```


##### パラメータ

<table>
  <thead>
    <tr>
      <th>名前</th><th>型</th><th>詳細</th>
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
パラメータを使用してコマンドメソッド "browsingContext.locateNodes" を送信するWebDriver Bidiコマンド。<br /><br />WebDriver Bidiプロトコルコマンド。詳細は[公式プロトコルドキュメント](https://w3c.github.io/webdriver-bidi/#command-browsingContext-locateNodes)で確認できます。

##### 使用法

```js
browser.browsingContextLocateNodes(params)
```


##### パラメータ

<table>
  <thead>
    <tr>
      <th>名前</th><th>型</th><th>詳細</th>
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


##### 戻り値

- **&lt;Object&gt;**
            **<code><var>local.BrowsingContextLocateNodesResult</var></code>:** 以下のインターフェースを持つコマンド戻り値:
   ```ts
   {
     nodes: ScriptNodeRemoteValue[];
   }
   ```


---

## browsingContextNavigate
パラメータを使用してコマンドメソッド "browsingContext.navigate" を送信するWebDriver Bidiコマンド。<br /><br />WebDriver Bidiプロトコルコマンド。詳細は[公式プロトコルドキュメント](https://w3c.github.io/webdriver-bidi/#command-browsingContext-navigate)で確認できます。

##### 使用法

```js
browser.browsingContextNavigate(params)
```


##### パラメータ

<table>
  <thead>
    <tr>
      <th>名前</th><th>型</th><th>詳細</th>
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


##### 戻り値

- **&lt;Object&gt;**
            **<code><var>local.BrowsingContextNavigateResult</var></code>:** 以下のインターフェースを持つコマンド戻り値:
   ```ts
   {
     navigation: BrowsingContextNavigation | null;
     url: string;
   }
   ```


---

## browsingContextPrint
パラメータを使用してコマンドメソッド "browsingContext.print" を送信するWebDriver Bidiコマンド。<br /><br />WebDriver Bidiプロトコルコマンド。詳細は[公式プロトコルドキュメント](https://w3c.github.io/webdriver-bidi/#command-browsingContext-print)で確認できます。

##### 使用法

```js
browser.browsingContextPrint(params)
```


##### パラメータ

<table>
  <thead>
    <tr>
      <th>名前</th><th>型</th><th>詳細</th>
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


##### 戻り値

- **&lt;Object&gt;**
            **<code><var>local.BrowsingContextPrintResult</var></code>:** 以下のインターフェースを持つコマンド戻り値:
   ```ts
   {
     data: string;
   }
   ```


---

## browsingContextReload
パラメータを使用してコマンドメソッド "browsingContext.reload" を送信するWebDriver Bidiコマンド。<br /><br />WebDriver Bidiプロトコルコマンド。詳細は[公式プロトコルドキュメント](https://w3c.github.io/webdriver-bidi/#command-browsingContext-reload)で確認できます。

##### 使用法

```js
browser.browsingContextReload(params)
```


##### パラメータ

<table>
  <thead>
    <tr>
      <th>名前</th><th>型</th><th>詳細</th>
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
パラメータを使用してコマンドメソッド "browsingContext.setViewport" を送信するWebDriver Bidiコマンド。<br /><br />WebDriver Bidiプロトコルコマンド。詳細は[公式プロトコルドキュメント](https://w3c.github.io/webdriver-bidi/#command-browsingContext-setViewport)で確認できます。

##### 使用法

```js
browser.browsingContextSetViewport(params)
```


##### パラメータ

<table>
  <thead>
    <tr>
      <th>名前</th><th>型</th><th>詳細</th>
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
パラメータを使用してコマンドメソッド "browsingContext.traverseHistory" を送信するWebDriver Bidiコマンド。<br /><br />WebDriver Bidiプロトコルコマンド。詳細は[公式プロトコルドキュメント](https://w3c.github.io/webdriver-bidi/#command-browsingContext-traverseHistory)で確認できます。

##### 使用法

```js
browser.browsingContextTraverseHistory(params)
```


##### パラメータ

<table>
  <thead>
    <tr>
      <th>名前</th><th>型</th><th>詳細</th>
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
パラメータを使用してコマンドメソッド "network.addIntercept" を送信するWebDriver Bidiコマンド。<br /><br />WebDriver Bidiプロトコルコマンド。詳細は[公式プロトコルドキュメント](https://w3c.github.io/webdriver-bidi/#command-network-addIntercept)で確認できます。

##### 使用法

```js
browser.networkAddIntercept(params)
```


##### パラメータ

<table>
  <thead>
    <tr>
      <th>名前</th><th>型</th><th>詳細</th>
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


##### 戻り値

- **&lt;Object&gt;**
            **<code><var>local.NetworkAddInterceptResult</var></code>:** 以下のインターフェースを持つコマンド戻り値:
   ```ts
   {
     intercept: NetworkIntercept;
   }
   ```


---

## networkContinueRequest
パラメータを使用してコマンドメソッド "network.continueRequest" を送信するWebDriver Bidiコマンド。<br /><br />WebDriver Bidiプロトコルコマンド。詳細は[公式プロトコルドキュメント](https://w3c.github.io/webdriver-bidi/#command-network-continueRequest)で確認できます。

##### 使用法

```js
browser.networkContinueRequest(params)
```


##### パラメータ

<table>
  <thead>
    <tr>
      <th>名前</th><th>型</th><th>詳細</th>
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
パラメータを使用してコマンドメソッド "network.continueResponse" を送信するWebDriver Bidiコマンド。<br /><br />WebDriver Bidiプロトコルコマンド。詳細は[公式プロトコルドキュメント](https://w3c.github.io/webdriver-bidi/#command-network-continueResponse)で確認できます。

##### 使用法

```js
browser.networkContinueResponse(params)
```


##### パラメータ

<table>
  <thead>
    <tr>
      <th>名前</th><th>型</th><th>詳細</th>
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
パラメータを使用してコマンドメソッド "network.continueWithAuth" を送信するWebDriver Bidiコマンド。<br /><br />WebDriver Bidiプロトコルコマンド。詳細は[公式プロトコルドキュメント](https://w3c.github.io/webdriver-bidi/#command-network-continueWithAuth)で確認できます。

##### 使用法

```js
browser.networkContinueWithAuth(params)
```


##### パラメータ

<table>
  <thead>
    <tr>
      <th>名前</th><th>型</th><th>詳細</th>
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
パラメータを使用してコマンドメソッド "network.failRequest" を送信するWebDriver Bidiコマンド。<br /><br />WebDriver Bidiプロトコルコマンド。詳細は[公式プロトコルドキュメント](https://w3c.github.io/webdriver-bidi/#command-network-failRequest)で確認できます。

##### 使用法

```js
browser.networkFailRequest(params)
```


##### パラメータ

<table>
  <thead>
    <tr>
      <th>名前</th><th>型</th><th>詳細</th>
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
パラメータを使用してコマンドメソッド "network.provideResponse" を送信するWebDriver Bidiコマンド。<br /><br />WebDriver Bidiプロトコルコマンド。詳細は[公式プロトコルドキュメント](https://w3c.github.io/webdriver-bidi/#command-network-provideResponse)で確認できます。

##### 使用法

```js
browser.networkProvideResponse(params)
```


##### パラメータ

<table>
  <thead>
    <tr>
      <th>名前</th><th>型</th><th>詳細</th>
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
パラメータを使用してコマンドメソッド "network.removeIntercept" を送信するWebDriver Bidiコマンド。<br /><br />WebDriver Bidiプロトコルコマンド。詳細は[公式プロトコルドキュメント](https://w3c.github.io/webdriver-bidi/#command-network-removeIntercept)で確認できます。

##### 使用法

```js
browser.networkRemoveIntercept(params)
```


##### パラメータ

<table>
  <thead>
    <tr>
      <th>名前</th><th>型</th><th>詳細</th>
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
パラメータを使用してコマンドメソッド "script.addPreloadScript" を送信するWebDriver Bidiコマンド。<br /><br />WebDriver Bidiプロトコルコマンド。詳細は[公式プロトコルドキュメント](https://w3c.github.io/webdriver-bidi/#command-script-addPreloadScript)で確認できます。

##### 使用法

```js
browser.scriptAddPreloadScript(params)
```


##### パラメータ

<table>
  <thead>
    <tr>
      <th>名前</th><th>型</th><th>詳細</th>
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


##### 戻り値

- **&lt;Object&gt;**
            **<code><var>local.ScriptAddPreloadScriptResult</var></code>:** 以下のインターフェースを持つコマンド戻り値:
   ```ts
   {
     script: ScriptPreloadScript;
   }
   ```


---

## scriptDisown
パラメータを使用してコマンドメソッド "script.disown" を送信するWebDriver Bidiコマンド。<br /><br />WebDriver Bidiプロトコルコマンド。詳細は[公式プロトコルドキュメント](https://w3c.github.io/webdriver-bidi/#command-script-disown)で確認できます。

##### 使用法

```js
browser.scriptDisown(params)
```


##### パラメータ

<table>
  <thead>
    <tr>
      <th>名前</th><th>型</th><th>詳細</th>
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
パラメータを使用してコマンドメソッド "script.callFunction" を送信するWebDriver Bidiコマンド。<br /><br />WebDriver Bidiプロトコルコマンド。詳細は[公式プロトコルドキュメント](https://w3c.github.io/webdriver-bidi/#command-script-callFunction)で確認できます。

##### 使用法

```js
browser.scriptCallFunction(params)
```


##### パラメータ

<table>
  <thead>
    <tr>
      <th>名前</th><th>型</th><th>詳細</th>
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
パラメータを使用してコマンドメソッド "script.evaluate" を送信するWebDriver Bidiコマンド。<br /><br />WebDriver Bidiプロトコルコマンド。詳細は[公式プロトコルドキュメント](https://w3c.github.io/webdriver-bidi/#command-script-evaluate)で確認できます。

##### 使用法

```js
browser.scriptEvaluate(params)
```


##### パラメータ

<table>
  <thead>
    <tr>
      <th>名前</th><th>型</th><th>詳細</th>
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


##### 戻り値

- **&lt;Object&gt;**
            **<code><var>local.ScriptEvaluateResult</var></code>:** 以下のインターフェースを持つコマンド戻り値:
   ```ts
   ;
   ```


---

## scriptGetRealms
パラメータを使用してコマンドメソッド "script.getRealms" を送信するWebDriver Bidiコマンド。<br /><br />WebDriver Bidiプロトコルコマンド。詳細は[公式プロトコルドキュメント](https://w3c.github.io/webdriver-bidi/#command-script-getRealms)で確認できます。

##### 使用法

```js
browser.scriptGetRealms(params)
```


##### パラメータ

<table>
  <thead>
    <tr>
      <th>名前</th><th>型</th><th>詳細</th>
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


##### 戻り値

- **&lt;Object&gt;**
            **<code><var>local.ScriptGetRealmsResult</var></code>:** 以下のインターフェースを持つコマンド戻り値:
   ```ts
   {
     realms: ScriptRealmInfo[];
   }
   ```


---

## scriptRemovePreloadScript
パラメータを使用してコマンドメソッド "script.removePreloadScript" を送信するWebDriver Bidiコマンド。<br /><br />WebDriver Bidiプロトコルコマンド。詳細は[公式プロトコルドキュメント](https://w3c.github.io/webdriver-bidi/#command-script-removePreloadScript)で確認できます。

##### 使用法

```js
browser.scriptRemovePreloadScript(params)
```


##### パラメータ

<table>
  <thead>
    <tr>
      <th>名前</th><th>型</th><th>詳細</th>
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
パラメータを使用してコマンドメソッド "storage.getCookies" を送信するWebDriver Bidiコマンド。<br /><br />WebDriver Bidiプロトコルコマンド。詳細は[公式プロトコルドキュメント](https://w3c.github.io/webdriver-bidi/#command-storage-getCookies)で確認できます。

##### 使用法

```js
browser.storageGetCookies(params)
```


##### パラメータ

<table>
  <thead>
    <tr>
      <th>名前</th><th>型</th><th>詳細</th>
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


##### 戻り値

- **&lt;Object&gt;**
            **<code><var>local.StorageGetCookiesResult</var></code>:** 以下のインターフェースを持つコマンド戻り値:
   ```ts
   {
     cookies: NetworkCookie[];
     partitionKey: StoragePartitionKey;
   }
   ```


---

## storageSetCookie
パラメータを使用してコマンドメソッド "storage.setCookie" を送信するWebDriver Bidiコマンド。<br /><br />WebDriver Bidiプロトコルコマンド。詳細は[公式プロトコルドキュメント](https://w3c.github.io/webdriver-bidi/#command-storage-setCookie)で確認できます。

##### 使用法

```js
browser.storageSetCookie(params)
```


##### パラメータ

<table>
  <thead>
    <tr>
      <th>名前</th><th>型</th><th>詳細</th>
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


##### 戻り値

- **&lt;Object&gt;**
            **<code><var>local.StorageSetCookieResult</var></code>:** 以下のインターフェースを持つコマンド戻り値:
   ```ts
   {
     partitionKey: StoragePartitionKey;
   }
   ```


---

## storageDeleteCookies
パラメータを使用してコマンドメソッド "storage.deleteCookies" を送信するWebDriver Bidiコマンド。<br /><br />WebDriver Bidiプロトコルコマンド。詳細は[公式プロトコルドキュメント](https://w3c.github.io/webdriver-bidi/#command-storage-deleteCookies)で確認できます。

##### 使用法

```js
browser.storageDeleteCookies(params)
```


##### パラメータ

<table>
  <thead>
    <tr>
      <th>名前</th><th>型</th><th>詳細</th>
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


##### 戻り値

- **&lt;Object&gt;**
            **<code><var>local.StorageDeleteCookiesResult</var></code>:** 以下のインターフェースを持つコマンド戻り値:
   ```ts
   {
     partitionKey: StoragePartitionKey;
   }
   ```


---

## inputPerformActions
パラメータを使用してコマンドメソッド "input.performActions" を送信するWebDriver Bidiコマンド。<br /><br />WebDriver Bidiプロトコルコマンド。詳細は[公式プロトコルドキュメント](https://w3c.github.io/webdriver-bidi/#command-input-performActions)で確認できます。

##### 使用法

```js
browser.inputPerformActions(params)
```


##### パラメータ

<table>
  <thead>
    <tr>
      <th>名前</th><th>型</th><th>詳細</th>
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
パラメータを使用してコマンドメソッド "input.releaseActions" を送信するWebDriver Bidiコマンド。<br /><br />WebDriver Bidiプロトコルコマンド。詳細は[公式プロトコルドキュメント](https://w3c.github.io/webdriver-bidi/#command-input-releaseActions)で確認できます。

##### 使用法

```js
browser.inputReleaseActions(params)
```


##### パラメータ

<table>
  <thead>
    <tr>
      <th>名前</th><th>型</th><th>詳細</th>
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
パラメータを使用してコマンドメソッド "input.setFiles" を送信するWebDriver Bidiコマンド。<br /><br />WebDriver Bidiプロトコルコマンド。詳細は[公式プロトコルドキュメント](https://w3c.github.io/webdriver-bidi/#command-input-setFiles)で確認できます。

##### 使用法

```js
browser.inputSetFiles(params)
```


##### パラメータ

<table>
  <thead>
    <tr>
      <th>名前</th><th>型</th><th>詳細</th>
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