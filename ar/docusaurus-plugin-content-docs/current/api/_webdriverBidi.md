---
id: webdriverBidi
title: بروتوكول WebDriver Bidi
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-protocols/src/protocols/webdriverBidi.ts
---

يتم إنشاء أوامر البروتوكول هذه بناءً على المواصفات الحالية 
[WebDriver Bidi](https://w3c.github.io/webdriver-bidi/). لتمكين البروتوكول
لاختبارك تأكد من ضبط `webSocketUrl: true` في إعداداتك.

:::caution استخدم بحذر!

دعم المتصفح غير مضمون ويمكن أن تتغير الواجهات في المستقبل. المعيار
حاليًا قيد التطوير وستضيف شركات المتصفحات هذه الإمكانيات بناءً على
جداولها الزمنية الخاصة.

:::

آخر تحديث: السبت 26 أبريل 2025 17:10:07 GMT-0700 (توقيت المحيط الهادئ النهاري)

---

## send
إرسال أوامر الجلسة عبر WebDriver Bidi<br /><br />أمر بروتوكول WebDriver Bidi. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://github.com/w3c/webdriver-bidi).

##### الاستخدام

```js
browser.send(params)
```


##### المعلمات

<table>
  <thead>
    <tr>
      <th>الاسم</th><th>النوع</th><th>التفاصيل</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>params</var></code></td>
      <td>CommandData</td>
      <td>حمولة الجلسة</td>
    </tr>
  </tbody>
</table>


##### العائد

- **&lt;Object&gt;**
            **<code><var>CommandResponse</var></code>:** استجابة WebDriver Bidi


---

## sendAsync
إرسال أوامر جلسة غير متزامنة عبر WebDriver Bidi<br /><br />أمر بروتوكول WebDriver Bidi. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://github.com/w3c/webdriver-bidi).

##### الاستخدام

```js
browser.sendAsync(params)
```


##### المعلمات

<table>
  <thead>
    <tr>
      <th>الاسم</th><th>النوع</th><th>التفاصيل</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>params</var></code></td>
      <td>CommandData</td>
      <td>حمولة الجلسة</td>
    </tr>
  </tbody>
</table>


##### العائد

- **&lt;Number&gt;**
            **<code><var>id</var></code>:** معرف طلب WebDriver Bidi


---

## sessionStatus
أمر WebDriver Bidi لإرسال طريقة الأمر "session.status" مع المعلمات.<br /><br />أمر بروتوكول WebDriver Bidi. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://w3c.github.io/webdriver-bidi/#command-session-status).

##### الاستخدام

```js
browser.sessionStatus(params)
```


##### المعلمات

<table>
  <thead>
    <tr>
      <th>الاسم</th><th>النوع</th><th>التفاصيل</th>
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


##### العائد

- **&lt;Object&gt;**
            **<code><var>local.SessionStatusResult</var></code>:** قيمة عودة الأمر مع الواجهة التالية:
   ```ts
   {
     ready: boolean;
     message: string;
   }
   ```


---

## sessionNew
أمر WebDriver Bidi لإرسال طريقة الأمر "session.new" مع المعلمات.<br /><br />أمر بروتوكول WebDriver Bidi. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://w3c.github.io/webdriver-bidi/#command-session-new).

##### الاستخدام

```js
browser.sessionNew(params)
```


##### المعلمات

<table>
  <thead>
    <tr>
      <th>الاسم</th><th>النوع</th><th>التفاصيل</th>
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


##### العائد

- **&lt;Object&gt;**
            **<code><var>local.SessionNewResult</var></code>:** قيمة عودة الأمر مع الواجهة التالية:
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
أمر WebDriver Bidi لإرسال طريقة الأمر "session.end" مع المعلمات.<br /><br />أمر بروتوكول WebDriver Bidi. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://w3c.github.io/webdriver-bidi/#command-session-end).

##### الاستخدام

```js
browser.sessionEnd(params)
```


##### المعلمات

<table>
  <thead>
    <tr>
      <th>الاسم</th><th>النوع</th><th>التفاصيل</th>
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
أمر WebDriver Bidi لإرسال طريقة الأمر "session.subscribe" مع المعلمات.<br /><br />أمر بروتوكول WebDriver Bidi. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://w3c.github.io/webdriver-bidi/#command-session-subscribe).

##### الاستخدام

```js
browser.sessionSubscribe(params)
```


##### المعلمات

<table>
  <thead>
    <tr>
      <th>الاسم</th><th>النوع</th><th>التفاصيل</th>
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
أمر WebDriver Bidi لإرسال طريقة الأمر "session.unsubscribe" مع المعلمات.<br /><br />أمر بروتوكول WebDriver Bidi. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://w3c.github.io/webdriver-bidi/#command-session-unsubscribe).

##### الاستخدام

```js
browser.sessionUnsubscribe(params)
```


##### المعلمات

<table>
  <thead>
    <tr>
      <th>الاسم</th><th>النوع</th><th>التفاصيل</th>
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
أمر WebDriver Bidi لإرسال طريقة الأمر "browser.close" مع المعلمات.<br /><br />أمر بروتوكول WebDriver Bidi. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://w3c.github.io/webdriver-bidi/#command-browser-close).

##### الاستخدام

```js
browser.browserClose(params)
```


##### المعلمات

<table>
  <thead>
    <tr>
      <th>الاسم</th><th>النوع</th><th>التفاصيل</th>
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
أمر WebDriver Bidi لإرسال طريقة الأمر "browser.createUserContext" مع المعلمات.<br /><br />أمر بروتوكول WebDriver Bidi. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://w3c.github.io/webdriver-bidi/#command-browser-createUserContext).

##### الاستخدام

```js
browser.browserCreateUserContext(params)
```


##### المعلمات

<table>
  <thead>
    <tr>
      <th>الاسم</th><th>النوع</th><th>التفاصيل</th>
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


##### العائد

- **&lt;Object&gt;**
            **<code><var>local.BrowserCreateUserContextResult</var></code>:** قيمة عودة الأمر مع الواجهة التالية:
   ```ts
   ;
   ```


---

## browserGetUserContexts
أمر WebDriver Bidi لإرسال طريقة الأمر "browser.getUserContexts" مع المعلمات.<br /><br />أمر بروتوكول WebDriver Bidi. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://w3c.github.io/webdriver-bidi/#command-browser-getUserContexts).

##### الاستخدام

```js
browser.browserGetUserContexts(params)
```


##### المعلمات

<table>
  <thead>
    <tr>
      <th>الاسم</th><th>النوع</th><th>التفاصيل</th>
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


##### العائد

- **&lt;Object&gt;**
            **<code><var>local.BrowserGetUserContextsResult</var></code>:** قيمة عودة الأمر مع الواجهة التالية:
   ```ts
   {
     userContexts: BrowserUserContextInfo[];
   }
   ```


---

## browserRemoveUserContext
أمر WebDriver Bidi لإرسال طريقة الأمر "browser.removeUserContext" مع المعلمات.<br /><br />أمر بروتوكول WebDriver Bidi. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://w3c.github.io/webdriver-bidi/#command-browser-removeUserContext).

##### الاستخدام

```js
browser.browserRemoveUserContext(params)
```


##### المعلمات

<table>
  <thead>
    <tr>
      <th>الاسم</th><th>النوع</th><th>التفاصيل</th>
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
أمر WebDriver Bidi لإرسال طريقة الأمر "browsingContext.activate" مع المعلمات.<br /><br />أمر بروتوكول WebDriver Bidi. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://w3c.github.io/webdriver-bidi/#command-browsingContext-activate).

##### الاستخدام

```js
browser.browsingContextActivate(params)
```


##### المعلمات

<table>
  <thead>
    <tr>
      <th>الاسم</th><th>النوع</th><th>التفاصيل</th>
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
أمر WebDriver Bidi لإرسال طريقة الأمر "browsingContext.captureScreenshot" مع المعلمات.<br /><br />أمر بروتوكول WebDriver Bidi. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://w3c.github.io/webdriver-bidi/#command-browsingContext-captureScreenshot).

##### الاستخدام

```js
browser.browsingContextCaptureScreenshot(params)
```


##### المعلمات

<table>
  <thead>
    <tr>
      <th>الاسم</th><th>النوع</th><th>التفاصيل</th>
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


##### العائد

- **&lt;Object&gt;**
            **<code><var>local.BrowsingContextCaptureScreenshotResult</var></code>:** قيمة عودة الأمر مع الواجهة التالية:
   ```ts
   {
     data: string;
   }
   ```


---

## browsingContextClose
أمر WebDriver Bidi لإرسال طريقة الأمر "browsingContext.close" مع المعلمات.<br /><br />أمر بروتوكول WebDriver Bidi. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://w3c.github.io/webdriver-bidi/#command-browsingContext-close).

##### الاستخدام

```js
browser.browsingContextClose(params)
```


##### المعلمات

<table>
  <thead>
    <tr>
      <th>الاسم</th><th>النوع</th><th>التفاصيل</th>
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
أمر WebDriver Bidi لإرسال طريقة الأمر "browsingContext.create" مع المعلمات.<br /><br />أمر بروتوكول WebDriver Bidi. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://w3c.github.io/webdriver-bidi/#command-browsingContext-create).

##### الاستخدام

```js
browser.browsingContextCreate(params)
```


##### المعلمات

<table>
  <thead>
    <tr>
      <th>الاسم</th><th>النوع</th><th>التفاصيل</th>
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


##### العائد

- **&lt;Object&gt;**
            **<code><var>local.BrowsingContextCreateResult</var></code>:** قيمة عودة الأمر مع الواجهة التالية:
   ```ts
   {
     context: BrowsingContextBrowsingContext;
   }
   ```


---

## browsingContextGetTree
أمر WebDriver Bidi لإرسال طريقة الأمر "browsingContext.getTree" مع المعلمات.<br /><br />أمر بروتوكول WebDriver Bidi. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://w3c.github.io/webdriver-bidi/#command-browsingContext-getTree).

##### الاستخدام

```js
browser.browsingContextGetTree(params)
```


##### المعلمات

<table>
  <thead>
    <tr>
      <th>الاسم</th><th>النوع</th><th>التفاصيل</th>
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


##### العائد

- **&lt;Object&gt;**
            **<code><var>local.BrowsingContextGetTreeResult</var></code>:** قيمة عودة الأمر مع الواجهة التالية:
   ```ts
   {
     contexts: BrowsingContextInfoList;
   }
   ```


---

## browsingContextHandleUserPrompt
أمر WebDriver Bidi لإرسال طريقة الأمر "browsingContext.handleUserPrompt" مع المعلمات.<br /><br />أمر بروتوكول WebDriver Bidi. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://w3c.github.io/webdriver-bidi/#command-browsingContext-handleUserPrompt).

##### الاستخدام

```js
browser.browsingContextHandleUserPrompt(params)
```


##### المعلمات

<table>
  <thead>
    <tr>
      <th>الاسم</th><th>النوع</th><th>التفاصيل</th>
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
أمر WebDriver Bidi لإرسال طريقة الأمر "browsingContext.locateNodes" مع المعلمات.<br /><br />أمر بروتوكول WebDriver Bidi. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://w3c.github.io/webdriver-bidi/#command-browsingContext-locateNodes).

##### الاستخدام

```js
browser.browsingContextLocateNodes(params)
```


##### المعلمات

<table>
  <thead>
    <tr>
      <th>الاسم</th><th>النوع</th><th>التفاصيل</th>
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


##### العائد

- **&lt;Object&gt;**
            **<code><var>local.BrowsingContextLocateNodesResult</var></code>:** قيمة عودة الأمر مع الواجهة التالية:
   ```ts
   {
     nodes: ScriptNodeRemoteValue[];
   }
   ```


---

## browsingContextNavigate
أمر WebDriver Bidi لإرسال طريقة الأمر "browsingContext.navigate" مع المعلمات.<br /><br />أمر بروتوكول WebDriver Bidi. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://w3c.github.io/webdriver-bidi/#command-browsingContext-navigate).

##### الاستخدام

```js
browser.browsingContextNavigate(params)
```


##### المعلمات

<table>
  <thead>
    <tr>
      <th>الاسم</th><th>النوع</th><th>التفاصيل</th>
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


##### العائد

- **&lt;Object&gt;**
            **<code><var>local.BrowsingContextNavigateResult</var></code>:** قيمة عودة الأمر مع الواجهة التالية:
   ```ts
   {
     navigation: BrowsingContextNavigation | null;
     url: string;
   }
   ```


---

## browsingContextPrint
أمر WebDriver Bidi لإرسال طريقة الأمر "browsingContext.print" مع المعلمات.<br /><br />أمر بروتوكول WebDriver Bidi. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://w3c.github.io/webdriver-bidi/#command-browsingContext-print).

##### الاستخدام

```js
browser.browsingContextPrint(params)
```


##### المعلمات

<table>
  <thead>
    <tr>
      <th>الاسم</th><th>النوع</th><th>التفاصيل</th>
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


##### العائد

- **&lt;Object&gt;**
            **<code><var>local.BrowsingContextPrintResult</var></code>:** قيمة عودة الأمر مع الواجهة التالية:
   ```ts
   {
     data: string;
   }
   ```


---

## browsingContextReload
أمر WebDriver Bidi لإرسال طريقة الأمر "browsingContext.reload" مع المعلمات.<br /><br />أمر بروتوكول WebDriver Bidi. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://w3c.github.io/webdriver-bidi/#command-browsingContext-reload).

##### الاستخدام

```js
browser.browsingContextReload(params)
```


##### المعلمات

<table>
  <thead>
    <tr>
      <th>الاسم</th><th>النوع</th><th>التفاصيل</th>
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
أمر WebDriver Bidi لإرسال طريقة الأمر "browsingContext.setViewport" مع المعلمات.<br /><br />أمر بروتوكول WebDriver Bidi. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://w3c.github.io/webdriver-bidi/#command-browsingContext-setViewport).

##### الاستخدام

```js
browser.browsingContextSetViewport(params)
```


##### المعلمات

<table>
  <thead>
    <tr>
      <th>الاسم</th><th>النوع</th><th>التفاصيل</th>
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
أمر WebDriver Bidi لإرسال طريقة الأمر "browsingContext.traverseHistory" مع المعلمات.<br /><br />أمر بروتوكول WebDriver Bidi. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://w3c.github.io/webdriver-bidi/#command-browsingContext-traverseHistory).

##### الاستخدام

```js
browser.browsingContextTraverseHistory(params)
```


##### المعلمات

<table>
  <thead>
    <tr>
      <th>الاسم</th><th>النوع</th><th>التفاصيل</th>
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
أمر WebDriver Bidi لإرسال طريقة الأمر "network.addIntercept" مع المعلمات.<br /><br />أمر بروتوكول WebDriver Bidi. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://w3c.github.io/webdriver-bidi/#command-network-addIntercept).

##### الاستخدام

```js
browser.networkAddIntercept(params)
```


##### المعلمات

<table>
  <thead>
    <tr>
      <th>الاسم</th><th>النوع</th><th>التفاصيل</th>
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


##### العائد

- **&lt;Object&gt;**
            **<code><var>local.NetworkAddInterceptResult</var></code>:** قيمة عودة الأمر مع الواجهة التالية:
   ```ts
   {
     intercept: NetworkIntercept;
   }
   ```


---

## networkContinueRequest
أمر WebDriver Bidi لإرسال طريقة الأمر "network.continueRequest" مع المعلمات.<br /><br />أمر بروتوكول WebDriver Bidi. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://w3c.github.io/webdriver-bidi/#command-network-continueRequest).

##### الاستخدام

```js
browser.networkContinueRequest(params)
```


##### المعلمات

<table>
  <thead>
    <tr>
      <th>الاسم</th><th>النوع</th><th>التفاصيل</th>
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
أمر WebDriver Bidi لإرسال طريقة الأمر "network.continueResponse" مع المعلمات.<br /><br />أمر بروتوكول WebDriver Bidi. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://w3c.github.io/webdriver-bidi/#command-network-continueResponse).

##### الاستخدام

```js
browser.networkContinueResponse(params)
```


##### المعلمات

<table>
  <thead>
    <tr>
      <th>الاسم</th><th>النوع</th><th>التفاصيل</th>
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
أمر WebDriver Bidi لإرسال طريقة الأمر "network.continueWithAuth" مع المعلمات.<br /><br />أمر بروتوكول WebDriver Bidi. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://w3c.github.io/webdriver-bidi/#command-network-continueWithAuth).

##### الاستخدام

```js
browser.networkContinueWithAuth(params)
```


##### المعلمات

<table>
  <thead>
    <tr>
      <th>الاسم</th><th>النوع</th><th>التفاصيل</th>
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
أمر WebDriver Bidi لإرسال طريقة الأمر "network.failRequest" مع المعلمات.<br /><br />أمر بروتوكول WebDriver Bidi. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://w3c.github.io/webdriver-bidi/#command-network-failRequest).

##### الاستخدام

```js
browser.networkFailRequest(params)
```


##### المعلمات

<table>
  <thead>
    <tr>
      <th>الاسم</th><th>النوع</th><th>التفاصيل</th>
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
أمر WebDriver Bidi لإرسال طريقة الأمر "network.provideResponse" مع المعلمات.<br /><br />أمر بروتوكول WebDriver Bidi. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://w3c.github.io/webdriver-bidi/#command-network-provideResponse).

##### الاستخدام

```js
browser.networkProvideResponse(params)
```


##### المعلمات

<table>
  <thead>
    <tr>
      <th>الاسم</th><th>النوع</th><th>التفاصيل</th>
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
أمر WebDriver Bidi لإرسال طريقة الأمر "network.removeIntercept" مع المعلمات.<br /><br />أمر بروتوكول WebDriver Bidi. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://w3c.github.io/webdriver-bidi/#command-network-removeIntercept).

##### الاستخدام

```js
browser.networkRemoveIntercept(params)
```


##### المعلمات

<table>
  <thead>
    <tr>
      <th>الاسم</th><th>النوع</th><th>التفاصيل</th>
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
أمر WebDriver Bidi لإرسال طريقة الأمر "script.addPreloadScript" مع المعلمات.<br /><br />أمر بروتوكول WebDriver Bidi. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://w3c.github.io/webdriver-bidi/#command-script-addPreloadScript).

##### الاستخدام

```js
browser.scriptAddPreloadScript(params)
```


##### المعلمات

<table>
  <thead>
    <tr>
      <th>الاسم</th><th>النوع</th><th>التفاصيل</th>
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


##### العائد

- **&lt;Object&gt;**
            **<code><var>local.ScriptAddPreloadScriptResult</var></code>:** قيمة عودة الأمر مع الواجهة التالية:
   ```ts
   {
     script: ScriptPreloadScript;
   }
   ```


---

## scriptDisown
أمر WebDriver Bidi لإرسال طريقة الأمر "script.disown" مع المعلمات.<br /><br />أمر بروتوكول WebDriver Bidi. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://w3c.github.io/webdriver-bidi/#command-script-disown).

##### الاستخدام

```js
browser.scriptDisown(params)
```


##### المعلمات

<table>
  <thead>
    <tr>
      <th>الاسم</th><th>النوع</th><th>التفاصيل</th>
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
أمر WebDriver Bidi لإرسال طريقة الأمر "script.callFunction" مع المعلمات.<br /><br />أمر بروتوكول WebDriver Bidi. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://w3c.github.io/webdriver-bidi/#command-script-callFunction).

##### الاستخدام

```js
browser.scriptCallFunction(params)
```


##### المعلمات

<table>
  <thead>
    <tr>
      <th>الاسم</th><th>النوع</th><th>التفاصيل</th>
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
أمر WebDriver Bidi لإرسال طريقة الأمر "script.evaluate" مع المعلمات.<br /><br />أمر بروتوكول WebDriver Bidi. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://w3c.github.io/webdriver-bidi/#command-script-evaluate).

##### الاستخدام

```js
browser.scriptEvaluate(params)
```


##### المعلمات

<table>
  <thead>
    <tr>
      <th>الاسم</th><th>النوع</th><th>التفاصيل</th>
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


##### العائد

- **&lt;Object&gt;**
            **<code><var>local.ScriptEvaluateResult</var></code>:** قيمة عودة الأمر مع الواجهة التالية:
   ```ts
   ;
   ```


---

## scriptGetRealms
أمر WebDriver Bidi لإرسال طريقة الأمر "script.getRealms" مع المعلمات.<br /><br />أمر بروتوكول WebDriver Bidi. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://w3c.github.io/webdriver-bidi/#command-script-getRealms).

##### الاستخدام

```js
browser.scriptGetRealms(params)
```


##### المعلمات

<table>
  <thead>
    <tr>
      <th>الاسم</th><th>النوع</th><th>التفاصيل</th>
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


##### العائد

- **&lt;Object&gt;**
            **<code><var>local.ScriptGetRealmsResult</var></code>:** قيمة عودة الأمر مع الواجهة التالية:
   ```ts
   {
     realms: ScriptRealmInfo[];
   }
   ```


---

## scriptRemovePreloadScript
أمر WebDriver Bidi لإرسال طريقة الأمر "script.removePreloadScript" مع المعلمات.<br /><br />أمر بروتوكول WebDriver Bidi. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://w3c.github.io/webdriver-bidi/#command-script-removePreloadScript).

##### الاستخدام

```js
browser.scriptRemovePreloadScript(params)
```


##### المعلمات

<table>
  <thead>
    <tr>
      <th>الاسم</th><th>النوع</th><th>التفاصيل</th>
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
أمر WebDriver Bidi لإرسال طريقة الأمر "storage.getCookies" مع المعلمات.<br /><br />أمر بروتوكول WebDriver Bidi. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://w3c.github.io/webdriver-bidi/#command-storage-getCookies).

##### الاستخدام

```js
browser.storageGetCookies(params)
```


##### المعلمات

<table>
  <thead>
    <tr>
      <th>الاسم</th><th>النوع</th><th>التفاصيل</th>
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


##### العائد

- **&lt;Object&gt;**
            **<code><var>local.StorageGetCookiesResult</var></code>:** قيمة عودة الأمر مع الواجهة التالية:
   ```ts
   {
     cookies: NetworkCookie[];
     partitionKey: StoragePartitionKey;
   }
   ```


---

## storageSetCookie
أمر WebDriver Bidi لإرسال طريقة الأمر "storage.setCookie" مع المعلمات.<br /><br />أمر بروتوكول WebDriver Bidi. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://w3c.github.io/webdriver-bidi/#command-storage-setCookie).

##### الاستخدام

```js
browser.storageSetCookie(params)
```


##### المعلمات

<table>
  <thead>
    <tr>
      <th>الاسم</th><th>النوع</th><th>التفاصيل</th>
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


##### العائد

- **&lt;Object&gt;**
            **<code><var>local.StorageSetCookieResult</var></code>:** قيمة عودة الأمر مع الواجهة التالية:
   ```ts
   {
     partitionKey: StoragePartitionKey;
   }
   ```


---

## storageDeleteCookies
أمر WebDriver Bidi لإرسال طريقة الأمر "storage.deleteCookies" مع المعلمات.<br /><br />أمر بروتوكول WebDriver Bidi. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://w3c.github.io/webdriver-bidi/#command-storage-deleteCookies).

##### الاستخدام

```js
browser.storageDeleteCookies(params)
```


##### المعلمات

<table>
  <thead>
    <tr>
      <th>الاسم</th><th>النوع</th><th>التفاصيل</th>
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


##### العائد

- **&lt;Object&gt;**
            **<code><var>local.StorageDeleteCookiesResult</var></code>:** قيمة عودة الأمر مع الواجهة التالية:
   ```ts
   {
     partitionKey: StoragePartitionKey;
   }
   ```


---

## inputPerformActions
أمر WebDriver Bidi لإرسال طريقة الأمر "input.performActions" مع المعلمات.<br /><br />أمر بروتوكول WebDriver Bidi. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://w3c.github.io/webdriver-bidi/#command-input-performActions).

##### الاستخدام

```js
browser.inputPerformActions(params)
```


##### المعلمات

<table>
  <thead>
    <tr>
      <th>الاسم</th><th>النوع</th><th>التفاصيل</th>
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
أمر WebDriver Bidi لإرسال طريقة الأمر "input.releaseActions" مع المعلمات.<br /><br />أمر بروتوكول WebDriver Bidi. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://w3c.github.io/webdriver-bidi/#command-input-releaseActions).

##### الاستخدام

```js
browser.inputReleaseActions(params)
```


##### المعلمات

<table>
  <thead>
    <tr>
      <th>الاسم</th><th>النوع</th><th>التفاصيل</th>
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
أمر WebDriver Bidi لإرسال طريقة الأمر "input.setFiles" مع المعلمات.<br /><br />أمر بروتوكول WebDriver Bidi. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://w3c.github.io/webdriver-bidi/#command-input-setFiles).

##### الاستخدام

```js
browser.inputSetFiles(params)
```


##### المعلمات

<table>
  <thead>
    <tr>
      <th>الاسم</th><th>النوع</th><th>التفاصيل</th>
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


