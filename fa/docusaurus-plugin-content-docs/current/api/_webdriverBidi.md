---
id: webdriverBidi
title: پروتکل WebDriver Bidi
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-protocols/src/protocols/webdriverBidi.ts
---

این دستورات پروتکل بر اساس مشخصات فعلی [WebDriver Bidi](https://w3c.github.io/webdriver-bidi/) تولید شده‌اند. برای فعال کردن پروتکل برای تست خود، اطمینان حاصل کنید که `webSocketUrl: true` در قابلیت‌های خود تنظیم شده باشد.

:::caution با احتیاط استفاده کنید!

پشتیبانی مرورگر تضمین نمی‌شود و رابط‌ها ممکن است در آینده تغییر کنند. استاندارد در حال حاضر در حال توسعه است و فروشندگان مرورگر این قابلیت‌ها را بر اساس زمانبندی خود اضافه خواهند کرد.

:::

آخرین بروزرسانی: Sat Apr 26 2025 17:10:07 GMT-0700 (Pacific Daylight Time)

---

## send
ارسال دستورات سوکت از طریق WebDriver Bidi<br /><br />دستور پروتکل WebDriver Bidi. جزئیات بیشتر را می‌توانید در [مستندات رسمی پروتکل](https://github.com/w3c/webdriver-bidi) پیدا کنید.

##### استفاده

```js
browser.send(params)
```


##### پارامترها

<table>
  <thead>
    <tr>
      <th>نام</th><th>نوع</th><th>جزئیات</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>params</var></code></td>
      <td>CommandData</td>
      <td>محتوای سوکت</td>
    </tr>
  </tbody>
</table>


##### مقادیر بازگشتی

- **&lt;Object&gt;**
            **<code><var>CommandResponse</var></code>:** پاسخ WebDriver Bidi


---

## sendAsync
ارسال دستورات سوکت ناهمگام از طریق WebDriver Bidi<br /><br />دستور پروتکل WebDriver Bidi. جزئیات بیشتر را می‌توانید در [مستندات رسمی پروتکل](https://github.com/w3c/webdriver-bidi) پیدا کنید.

##### استفاده

```js
browser.sendAsync(params)
```


##### پارامترها

<table>
  <thead>
    <tr>
      <th>نام</th><th>نوع</th><th>جزئیات</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>params</var></code></td>
      <td>CommandData</td>
      <td>محتوای سوکت</td>
    </tr>
  </tbody>
</table>


##### مقادیر بازگشتی

- **&lt;Number&gt;**
            **<code><var>id</var></code>:** شناسه درخواست WebDriver Bidi


---

## sessionStatus
دستور WebDriver Bidi برای ارسال متد دستور "session.status" با پارامترها.<br /><br />دستور پروتکل WebDriver Bidi. جزئیات بیشتر را می‌توانید در [مستندات رسمی پروتکل](https://w3c.github.io/webdriver-bidi/#command-session-status) پیدا کنید.

##### استفاده

```js
browser.sessionStatus(params)
```


##### پارامترها

<table>
  <thead>
    <tr>
      <th>نام</th><th>نوع</th><th>جزئیات</th>
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


##### مقادیر بازگشتی

- **&lt;Object&gt;**
            **<code><var>local.SessionStatusResult</var></code>:** مقدار بازگشتی دستور با رابط زیر:
   ```ts
   {
     ready: boolean;
     message: string;
   }
   ```


---

## sessionNew
دستور WebDriver Bidi برای ارسال متد دستور "session.new" با پارامترها.<br /><br />دستور پروتکل WebDriver Bidi. جزئیات بیشتر را می‌توانید در [مستندات رسمی پروتکل](https://w3c.github.io/webdriver-bidi/#command-session-new) پیدا کنید.

##### استفاده

```js
browser.sessionNew(params)
```


##### پارامترها

<table>
  <thead>
    <tr>
      <th>نام</th><th>نوع</th><th>جزئیات</th>
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


##### مقادیر بازگشتی

- **&lt;Object&gt;**
            **<code><var>local.SessionNewResult</var></code>:** مقدار بازگشتی دستور با رابط زیر:
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
دستور WebDriver Bidi برای ارسال متد دستور "session.end" با پارامترها.<br /><br />دستور پروتکل WebDriver Bidi. جزئیات بیشتر را می‌توانید در [مستندات رسمی پروتکل](https://w3c.github.io/webdriver-bidi/#command-session-end) پیدا کنید.

##### استفاده

```js
browser.sessionEnd(params)
```


##### پارامترها

<table>
  <thead>
    <tr>
      <th>نام</th><th>نوع</th><th>جزئیات</th>
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
دستور WebDriver Bidi برای ارسال متد دستور "session.subscribe" با پارامترها.<br /><br />دستور پروتکل WebDriver Bidi. جزئیات بیشتر را می‌توانید در [مستندات رسمی پروتکل](https://w3c.github.io/webdriver-bidi/#command-session-subscribe) پیدا کنید.

##### استفاده

```js
browser.sessionSubscribe(params)
```


##### پارامترها

<table>
  <thead>
    <tr>
      <th>نام</th><th>نوع</th><th>جزئیات</th>
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
دستور WebDriver Bidi برای ارسال متد دستور "session.unsubscribe" با پارامترها.<br /><br />دستور پروتکل WebDriver Bidi. جزئیات بیشتر را می‌توانید در [مستندات رسمی پروتکل](https://w3c.github.io/webdriver-bidi/#command-session-unsubscribe) پیدا کنید.

##### استفاده

```js
browser.sessionUnsubscribe(params)
```


##### پارامترها

<table>
  <thead>
    <tr>
      <th>نام</th><th>نوع</th><th>جزئیات</th>
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
دستور WebDriver Bidi برای ارسال متد دستور "browser.close" با پارامترها.<br /><br />دستور پروتکل WebDriver Bidi. جزئیات بیشتر را می‌توانید در [مستندات رسمی پروتکل](https://w3c.github.io/webdriver-bidi/#command-browser-close) پیدا کنید.

##### استفاده

```js
browser.browserClose(params)
```


##### پارامترها

<table>
  <thead>
    <tr>
      <th>نام</th><th>نوع</th><th>جزئیات</th>
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
دستور WebDriver Bidi برای ارسال متد دستور "browser.createUserContext" با پارامترها.<br /><br />دستور پروتکل WebDriver Bidi. جزئیات بیشتر را می‌توانید در [مستندات رسمی پروتکل](https://w3c.github.io/webdriver-bidi/#command-browser-createUserContext) پیدا کنید.

##### استفاده

```js
browser.browserCreateUserContext(params)
```


##### پارامترها

<table>
  <thead>
    <tr>
      <th>نام</th><th>نوع</th><th>جزئیات</th>
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


##### مقادیر بازگشتی

- **&lt;Object&gt;**
            **<code><var>local.BrowserCreateUserContextResult</var></code>:** مقدار بازگشتی دستور با رابط زیر:
   ```ts
   ;
   ```


---

## browserGetUserContexts
دستور WebDriver Bidi برای ارسال متد دستور "browser.getUserContexts" با پارامترها.<br /><br />دستور پروتکل WebDriver Bidi. جزئیات بیشتر را می‌توانید در [مستندات رسمی پروتکل](https://w3c.github.io/webdriver-bidi/#command-browser-getUserContexts) پیدا کنید.

##### استفاده

```js
browser.browserGetUserContexts(params)
```


##### پارامترها

<table>
  <thead>
    <tr>
      <th>نام</th><th>نوع</th><th>جزئیات</th>
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


##### مقادیر بازگشتی

- **&lt;Object&gt;**
            **<code><var>local.BrowserGetUserContextsResult</var></code>:** مقدار بازگشتی دستور با رابط زیر:
   ```ts
   {
     userContexts: BrowserUserContextInfo[];
   }
   ```


---

## browserRemoveUserContext
دستور WebDriver Bidi برای ارسال متد دستور "browser.removeUserContext" با پارامترها.<br /><br />دستور پروتکل WebDriver Bidi. جزئیات بیشتر را می‌توانید در [مستندات رسمی پروتکل](https://w3c.github.io/webdriver-bidi/#command-browser-removeUserContext) پیدا کنید.

##### استفاده

```js
browser.browserRemoveUserContext(params)
```


##### پارامترها

<table>
  <thead>
    <tr>
      <th>نام</th><th>نوع</th><th>جزئیات</th>
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
دستور WebDriver Bidi برای ارسال متد دستور "browsingContext.activate" با پارامترها.<br /><br />دستور پروتکل WebDriver Bidi. جزئیات بیشتر را می‌توانید در [مستندات رسمی پروتکل](https://w3c.github.io/webdriver-bidi/#command-browsingContext-activate) پیدا کنید.

##### استفاده

```js
browser.browsingContextActivate(params)
```


##### پارامترها

<table>
  <thead>
    <tr>
      <th>نام</th><th>نوع</th><th>جزئیات</th>
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
دستور WebDriver Bidi برای ارسال متد دستور "browsingContext.captureScreenshot" با پارامترها.<br /><br />دستور پروتکل WebDriver Bidi. جزئیات بیشتر را می‌توانید در [مستندات رسمی پروتکل](https://w3c.github.io/webdriver-bidi/#command-browsingContext-captureScreenshot) پیدا کنید.

##### استفاده

```js
browser.browsingContextCaptureScreenshot(params)
```


##### پارامترها

<table>
  <thead>
    <tr>
      <th>نام</th><th>نوع</th><th>جزئیات</th>
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


##### مقادیر بازگشتی

- **&lt;Object&gt;**
            **<code><var>local.BrowsingContextCaptureScreenshotResult</var></code>:** مقدار بازگشتی دستور با رابط زیر:
   ```ts
   {
     data: string;
   }
   ```


---

## browsingContextClose
دستور WebDriver Bidi برای ارسال متد دستور "browsingContext.close" با پارامترها.<br /><br />دستور پروتکل WebDriver Bidi. جزئیات بیشتر را می‌توانید در [مستندات رسمی پروتکل](https://w3c.github.io/webdriver-bidi/#command-browsingContext-close) پیدا کنید.

##### استفاده

```js
browser.browsingContextClose(params)
```


##### پارامترها

<table>
  <thead>
    <tr>
      <th>نام</th><th>نوع</th><th>جزئیات</th>
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
دستور WebDriver Bidi برای ارسال متد دستور "browsingContext.create" با پارامترها.<br /><br />دستور پروتکل WebDriver Bidi. جزئیات بیشتر را می‌توانید در [مستندات رسمی پروتکل](https://w3c.github.io/webdriver-bidi/#command-browsingContext-create) پیدا کنید.

##### استفاده

```js
browser.browsingContextCreate(params)
```


##### پارامترها

<table>
  <thead>
    <tr>
      <th>نام</th><th>نوع</th><th>جزئیات</th>
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


##### مقادیر بازگشتی

- **&lt;Object&gt;**
            **<code><var>local.BrowsingContextCreateResult</var></code>:** مقدار بازگشتی دستور با رابط زیر:
   ```ts
   {
     context: BrowsingContextBrowsingContext;
   }
   ```


---

## browsingContextGetTree
دستور WebDriver Bidi برای ارسال متد دستور "browsingContext.getTree" با پارامترها.<br /><br />دستور پروتکل WebDriver Bidi. جزئیات بیشتر را می‌توانید در [مستندات رسمی پروتکل](https://w3c.github.io/webdriver-bidi/#command-browsingContext-getTree) پیدا کنید.

##### استفاده

```js
browser.browsingContextGetTree(params)
```


##### پارامترها

<table>
  <thead>
    <tr>
      <th>نام</th><th>نوع</th><th>جزئیات</th>
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


##### مقادیر بازگشتی

- **&lt;Object&gt;**
            **<code><var>local.BrowsingContextGetTreeResult</var></code>:** مقدار بازگشتی دستور با رابط زیر:
   ```ts
   {
     contexts: BrowsingContextInfoList;
   }
   ```


---

## browsingContextHandleUserPrompt
دستور WebDriver Bidi برای ارسال متد دستور "browsingContext.handleUserPrompt" با پارامترها.<br /><br />دستور پروتکل WebDriver Bidi. جزئیات بیشتر را می‌توانید در [مستندات رسمی پروتکل](https://w3c.github.io/webdriver-bidi/#command-browsingContext-handleUserPrompt) پیدا کنید.

##### استفاده

```js
browser.browsingContextHandleUserPrompt(params)
```


##### پارامترها

<table>
  <thead>
    <tr>
      <th>نام</th><th>نوع</th><th>جزئیات</th>
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
دستور WebDriver Bidi برای ارسال متد دستور "browsingContext.locateNodes" با پارامترها.<br /><br />دستور پروتکل WebDriver Bidi. جزئیات بیشتر را می‌توانید در [مستندات رسمی پروتکل](https://w3c.github.io/webdriver-bidi/#command-browsingContext-locateNodes) پیدا کنید.

##### استفاده

```js
browser.browsingContextLocateNodes(params)
```


##### پارامترها

<table>
  <thead>
    <tr>
      <th>نام</th><th>نوع</th><th>جزئیات</th>
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


##### مقادیر بازگشتی

- **&lt;Object&gt;**
            **<code><var>local.BrowsingContextLocateNodesResult</var></code>:** مقدار بازگشتی دستور با رابط زیر:
   ```ts
   {
     nodes: ScriptNodeRemoteValue[];
   }
   ```


---

## browsingContextNavigate
دستور WebDriver Bidi برای ارسال متد دستور "browsingContext.navigate" با پارامترها.<br /><br />دستور پروتکل WebDriver Bidi. جزئیات بیشتر را می‌توانید در [مستندات رسمی پروتکل](https://w3c.github.io/webdriver-bidi/#command-browsingContext-navigate) پیدا کنید.

##### استفاده

```js
browser.browsingContextNavigate(params)
```


##### پارامترها

<table>
  <thead>
    <tr>
      <th>نام</th><th>نوع</th><th>جزئیات</th>
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


##### مقادیر بازگشتی

- **&lt;Object&gt;**
            **<code><var>local.BrowsingContextNavigateResult</var></code>:** مقدار بازگشتی دستور با رابط زیر:
   ```ts
   {
     navigation: BrowsingContextNavigation | null;
     url: string;
   }
   ```


---

## browsingContextPrint
دستور WebDriver Bidi برای ارسال متد دستور "browsingContext.print" با پارامترها.<br /><br />دستور پروتکل WebDriver Bidi. جزئیات بیشتر را می‌توانید در [مستندات رسمی پروتکل](https://w3c.github.io/webdriver-bidi/#command-browsingContext-print) پیدا کنید.

##### استفاده

```js
browser.browsingContextPrint(params)
```


##### پارامترها

<table>
  <thead>
    <tr>
      <th>نام</th><th>نوع</th><th>جزئیات</th>
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


##### مقادیر بازگشتی

- **&lt;Object&gt;**
            **<code><var>local.BrowsingContextPrintResult</var></code>:** مقدار بازگشتی دستور با رابط زیر:
   ```ts
   {
     data: string;
   }
   ```


---

## browsingContextReload
دستور WebDriver Bidi برای ارسال متد دستور "browsingContext.reload" با پارامترها.<br /><br />دستور پروتکل WebDriver Bidi. جزئیات بیشتر را می‌توانید در [مستندات رسمی پروتکل](https://w3c.github.io/webdriver-bidi/#command-browsingContext-reload) پیدا کنید.

##### استفاده

```js
browser.browsingContextReload(params)
```


##### پارامترها

<table>
  <thead>
    <tr>
      <th>نام</th><th>نوع</th><th>جزئیات</th>
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
دستور WebDriver Bidi برای ارسال متد دستور "browsingContext.setViewport" با پارامترها.<br /><br />دستور پروتکل WebDriver Bidi. جزئیات بیشتر را می‌توانید در [مستندات رسمی پروتکل](https://w3c.github.io/webdriver-bidi/#command-browsingContext-setViewport) پیدا کنید.

##### استفاده

```js
browser.browsingContextSetViewport(params)
```


##### پارامترها

<table>
  <thead>
    <tr>
      <th>نام</th><th>نوع</th><th>جزئیات</th>
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
دستور WebDriver Bidi برای ارسال متد دستور "browsingContext.traverseHistory" با پارامترها.<br /><br />دستور پروتکل WebDriver Bidi. جزئیات بیشتر را می‌توانید در [مستندات رسمی پروتکل](https://w3c.github.io/webdriver-bidi/#command-browsingContext-traverseHistory) پیدا کنید.

##### استفاده

```js
browser.browsingContextTraverseHistory(params)
```


##### پارامترها

<table>
  <thead>
    <tr>
      <th>نام</th><th>نوع</th><th>جزئیات</th>
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
دستور WebDriver Bidi برای ارسال متد دستور "network.addIntercept" با پارامترها.<br /><br />دستور پروتکل WebDriver Bidi. جزئیات بیشتر را می‌توانید در [مستندات رسمی پروتکل](https://w3c.github.io/webdriver-bidi/#command-network-addIntercept) پیدا کنید.

##### استفاده

```js
browser.networkAddIntercept(params)
```


##### پارامترها

<table>
  <thead>
    <tr>
      <th>نام</th><th>نوع</th><th>جزئیات</th>
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


##### مقادیر بازگشتی

- **&lt;Object&gt;**
            **<code><var>local.NetworkAddInterceptResult</var></code>:** مقدار بازگشتی دستور با رابط زیر:
   ```ts
   {
     intercept: NetworkIntercept;
   }
   ```


---

## networkContinueRequest
دستور WebDriver Bidi برای ارسال متد دستور "network.continueRequest" با پارامترها.<br /><br />دستور پروتکل WebDriver Bidi. جزئیات بیشتر را می‌توانید در [مستندات رسمی پروتکل](https://w3c.github.io/webdriver-bidi/#command-network-continueRequest) پیدا کنید.

##### استفاده

```js
browser.networkContinueRequest(params)
```


##### پارامترها

<table>
  <thead>
    <tr>
      <th>نام</th><th>نوع</th><th>جزئیات</th>
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
دستور WebDriver Bidi برای ارسال متد دستور "network.continueResponse" با پارامترها.<br /><br />دستور پروتکل WebDriver Bidi. جزئیات بیشتر را می‌توانید در [مستندات رسمی پروتکل](https://w3c.github.io/webdriver-bidi/#command-network-continueResponse) پیدا کنید.

##### استفاده

```js
browser.networkContinueResponse(params)
```


##### پارامترها

<table>
  <thead>
    <tr>
      <th>نام</th><th>نوع</th><th>جزئیات</th>
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
دستور WebDriver Bidi برای ارسال متد دستور "network.continueWithAuth" با پارامترها.<br /><br />دستور پروتکل WebDriver Bidi. جزئیات بیشتر را می‌توانید در [مستندات رسمی پروتکل](https://w3c.github.io/webdriver-bidi/#command-network-continueWithAuth) پیدا کنید.

##### استفاده

```js
browser.networkContinueWithAuth(params)
```


##### پارامترها

<table>
  <thead>
    <tr>
      <th>نام</th><th>نوع</th><th>جزئیات</th>
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
دستور WebDriver Bidi برای ارسال متد دستور "network.failRequest" با پارامترها.<br /><br />دستور پروتکل WebDriver Bidi. جزئیات بیشتر را می‌توانید در [مستندات رسمی پروتکل](https://w3c.github.io/webdriver-bidi/#command-network-failRequest) پیدا کنید.

##### استفاده

```js
browser.networkFailRequest(params)
```


##### پارامترها

<table>
  <thead>
    <tr>
      <th>نام</th><th>نوع</th><th>جزئیات</th>
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
دستور WebDriver Bidi برای ارسال متد دستور "network.provideResponse" با پارامترها.<br /><br />دستور پروتکل WebDriver Bidi. جزئیات بیشتر را می‌توانید در [مستندات رسمی پروتکل](https://w3c.github.io/webdriver-bidi/#command-network-provideResponse) پیدا کنید.

##### استفاده

```js
browser.networkProvideResponse(params)
```


##### پارامترها

<table>
  <thead>
    <tr>
      <th>نام</th><th>نوع</th><th>جزئیات</th>
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
دستور WebDriver Bidi برای ارسال متد دستور "network.removeIntercept" با پارامترها.<br /><br />دستور پروتکل WebDriver Bidi. جزئیات بیشتر را می‌توانید در [مستندات رسمی پروتکل](https://w3c.github.io/webdriver-bidi/#command-network-removeIntercept) پیدا کنید.

##### استفاده

```js
browser.networkRemoveIntercept(params)
```


##### پارامترها

<table>
  <thead>
    <tr>
      <th>نام</th><th>نوع</th><th>جزئیات</th>
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
دستور WebDriver Bidi برای ارسال متد دستور "script.addPreloadScript" با پارامترها.<br /><br />دستور پروتکل WebDriver Bidi. جزئیات بیشتر را می‌توانید در [مستندات رسمی پروتکل](https://w3c.github.io/webdriver-bidi/#command-script-addPreloadScript) پیدا کنید.

##### استفاده

```js
browser.scriptAddPreloadScript(params)
```


##### پارامترها

<table>
  <thead>
    <tr>
      <th>نام</th><th>نوع</th><th>جزئیات</th>
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


##### مقادیر بازگشتی

- **&lt;Object&gt;**
            **<code><var>local.ScriptAddPreloadScriptResult</var></code>:** مقدار بازگشتی دستور با رابط زیر:
   ```ts
   {
     script: ScriptPreloadScript;
   }
   ```


---

## scriptDisown
دستور WebDriver Bidi برای ارسال متد دستور "script.disown" با پارامترها.<br /><br />دستور پروتکل WebDriver Bidi. جزئیات بیشتر را می‌توانید در [مستندات رسمی پروتکل](https://w3c.github.io/webdriver-bidi/#command-script-disown) پیدا کنید.

##### استفاده

```js
browser.scriptDisown(params)
```


##### پارامترها

<table>
  <thead>
    <tr>
      <th>نام</th><th>نوع</th><th>جزئیات</th>
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
دستور WebDriver Bidi برای ارسال متد دستور "script.callFunction" با پارامترها.<br /><br />دستور پروتکل WebDriver Bidi. جزئیات بیشتر را می‌توانید در [مستندات رسمی پروتکل](https://w3c.github.io/webdriver-bidi/#command-script-callFunction) پیدا کنید.

##### استفاده

```js
browser.scriptCallFunction(params)
```


##### پارامترها

<table>
  <thead>
    <tr>
      <th>نام</th><th>نوع</th><th>جزئیات</th>
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
دستور WebDriver Bidi برای ارسال متد دستور "script.evaluate" با پارامترها.<br /><br />دستور پروتکل WebDriver Bidi. جزئیات بیشتر را می‌توانید در [مستندات رسمی پروتکل](https://w3c.github.io/webdriver-bidi/#command-script-evaluate) پیدا کنید.

##### استفاده

```js
browser.scriptEvaluate(params)
```


##### پارامترها

<table>
  <thead>
    <tr>
      <th>نام</th><th>نوع</th><th>جزئیات</th>
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


##### مقادیر بازگشتی

- **&lt;Object&gt;**
            **<code><var>local.ScriptEvaluateResult</var></code>:** مقدار بازگشتی دستور با رابط زیر:
   ```ts
   ;
   ```


---

## scriptGetRealms
دستور WebDriver Bidi برای ارسال متد دستور "script.getRealms" با پارامترها.<br /><br />دستور پروتکل WebDriver Bidi. جزئیات بیشتر را می‌توانید در [مستندات رسمی پروتکل](https://w3c.github.io/webdriver-bidi/#command-script-getRealms) پیدا کنید.

##### استفاده

```js
browser.scriptGetRealms(params)
```


##### پارامترها

<table>
  <thead>
    <tr>
      <th>نام</th><th>نوع</th><th>جزئیات</th>
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


##### مقادیر بازگشتی

- **&lt;Object&gt;**
            **<code><var>local.ScriptGetRealmsResult</var></code>:** مقدار بازگشتی دستور با رابط زیر:
   ```ts
   {
     realms: ScriptRealmInfo[];
   }
   ```


---

## scriptRemovePreloadScript
دستور WebDriver Bidi برای ارسال متد دستور "script.removePreloadScript" با پارامترها.<br /><br />دستور پروتکل WebDriver Bidi. جزئیات بیشتر را می‌توانید در [مستندات رسمی پروتکل](https://w3c.github.io/webdriver-bidi/#command-script-removePreloadScript) پیدا کنید.

##### استفاده

```js
browser.scriptRemovePreloadScript(params)
```


##### پارامترها

<table>
  <thead>
    <tr>
      <th>نام</th><th>نوع</th><th>جزئیات</th>
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
دستور WebDriver Bidi برای ارسال متد دستور "storage.getCookies" با پارامترها.<br /><br />دستور پروتکل WebDriver Bidi. جزئیات بیشتر را می‌توانید در [مستندات رسمی پروتکل](https://w3c.github.io/webdriver-bidi/#command-storage-getCookies) پیدا کنید.

##### استفاده

```js
browser.storageGetCookies(params)
```


##### پارامترها

<table>
  <thead>
    <tr>
      <th>نام</th><th>نوع</th><th>جزئیات</th>
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


##### مقادیر بازگشتی

- **&lt;Object&gt;**
            **<code><var>local.StorageGetCookiesResult</var></code>:** مقدار بازگشتی دستور با رابط زیر:
   ```ts
   {
     cookies: NetworkCookie[];
     partitionKey: StoragePartitionKey;
   }
   ```


---

## storageSetCookie
دستور WebDriver Bidi برای ارسال متد دستور "storage.setCookie" با پارامترها.<br /><br />دستور پروتکل WebDriver Bidi. جزئیات بیشتر را می‌توانید در [مستندات رسمی پروتکل](https://w3c.github.io/webdriver-bidi/#command-storage-setCookie) پیدا کنید.

##### استفاده

```js
browser.storageSetCookie(params)
```


##### پارامترها

<table>
  <thead>
    <tr>
      <th>نام</th><th>نوع</th><th>جزئیات</th>
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


##### مقادیر بازگشتی

- **&lt;Object&gt;**
            **<code><var>local.StorageSetCookieResult</var></code>:** مقدار بازگشتی دستور با رابط زیر:
   ```ts
   {
     partitionKey: StoragePartitionKey;
   }
   ```


---

## storageDeleteCookies
دستور WebDriver Bidi برای ارسال متد دستور "storage.deleteCookies" با پارامترها.<br /><br />دستور پروتکل WebDriver Bidi. جزئیات بیشتر را می‌توانید در [مستندات رسمی پروتکل](https://w3c.github.io/webdriver-bidi/#command-storage-deleteCookies) پیدا کنید.

##### استفاده

```js
browser.storageDeleteCookies(params)
```


##### پارامترها

<table>
  <thead>
    <tr>
      <th>نام</th><th>نوع</th><th>جزئیات</th>
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


##### مقادیر بازگشتی

- **&lt;Object&gt;**
            **<code><var>local.StorageDeleteCookiesResult</var></code>:** مقدار بازگشتی دستور با رابط زیر:
   ```ts
   {
     partitionKey: StoragePartitionKey;
   }
   ```


---

## inputPerformActions
دستور WebDriver Bidi برای ارسال متد دستور "input.performActions" با پارامترها.<br /><br />دستور پروتکل WebDriver Bidi. جزئیات بیشتر را می‌توانید در [مستندات رسمی پروتکل](https://w3c.github.io/webdriver-bidi/#command-input-performActions) پیدا کنید.

##### استفاده

```js
browser.inputPerformActions(params)
```


##### پارامترها

<table>
  <thead>
    <tr>
      <th>نام</th><th>نوع</th><th>جزئیات</th>
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
دستور WebDriver Bidi برای ارسال متد دستور "input.releaseActions" با پارامترها.<br /><br />دستور پروتکل WebDriver Bidi. جزئیات بیشتر را می‌توانید در [مستندات رسمی پروتکل](https://w3c.github.io/webdriver-bidi/#command-input-releaseActions) پیدا کنید.

##### استفاده

```js
browser.inputReleaseActions(params)
```


##### پارامترها

<table>
  <thead>
    <tr>
      <th>نام</th><th>نوع</th><th>جزئیات</th>
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
دستور WebDriver Bidi برای ارسال متد دستور "input.setFiles" با پارامترها.<br /><br />دستور پروتکل WebDriver Bidi. جزئیات بیشتر را می‌توانید در [مستندات رسمی پروتکل](https://w3c.github.io/webdriver-bidi/#command-input-setFiles) پیدا کنید.

##### استفاده

```js
browser.inputSetFiles(params)
```


##### پارامترها

<table>
  <thead>
    <tr>
      <th>نام</th><th>نوع</th><th>جزئیات</th>
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