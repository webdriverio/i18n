---
id: webdriverBidi
title: WebDriver Bidi புரோட்டோகால்
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-protocols/src/protocols/webdriverBidi.ts
---

இந்த புரோட்டோகால் கட்டளைகள் தற்போதைய [WebDriver Bidi](https://w3c.github.io/webdriver-bidi/) விவரக்குறிப்பின் அடிப்படையில் உருவாக்கப்பட்டுள்ளன. உங்கள் சோதனைக்கு இந்த புரோட்டோகாலை செயல்படுத்த உங்கள் capabilities இல் `webSocketUrl: true` அமைக்கப்பட்டிருப்பதை உறுதிசெய்யவும்.

:::caution எச்சரிக்கையுடன் பயன்படுத்தவும்!

உலாவி ஆதரவு உத்தரவாதம் அளிக்கப்படவில்லை மற்றும் இடைமுகங்கள் எதிர்காலத்தில் மாறலாம். தரநிலை தற்போது உருவாக்கத்தில் உள்ளது மற்றும் உலாவி வழங்குநர்கள் அவர்களின் சொந்த காலக்கெடுவுக்கு ஏற்ப இந்த திறன்களை சேர்ப்பார்கள்.

:::

கடைசி புதுப்பிப்பு: Sat Apr 26 2025 17:10:07 GMT-0700 (Pacific Daylight Time)

---

## send
WebDriver Bidi மூலம் சாக்கெட் கட்டளைகளை அனுப்பவும்<br /><br />WebDriver Bidi புரோட்டோகால் கட்டளை. மேலும் விவரங்களை [அதிகாரப்பூர்வ புரோட்டோகால் ஆவணங்களில்](https://github.com/w3c/webdriver-bidi) காணலாம்.

##### பயன்பாடு

```js
browser.send(params)
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
      <td><code><var>params</var></code></td>
      <td>CommandData</td>
      <td>socket payload</td>
    </tr>
  </tbody>
</table>


##### திருப்பி அனுப்புகிறது

- **&lt;Object&gt;**
            **<code><var>CommandResponse</var></code>:** WebDriver Bidi பதில்


---

## sendAsync
WebDriver Bidi மூலம் ஒத்திசையற்ற சாக்கெட் கட்டளைகளை அனுப்பவும்<br /><br />WebDriver Bidi புரோட்டோகால் கட்டளை. மேலும் விவரங்களை [அதிகாரப்பூர்வ புரோட்டோகால் ஆவணங்களில்](https://github.com/w3c/webdriver-bidi) காணலாம்.

##### பயன்பாடு

```js
browser.sendAsync(params)
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
      <td><code><var>params</var></code></td>
      <td>CommandData</td>
      <td>socket payload</td>
    </tr>
  </tbody>
</table>


##### திருப்பி அனுப்புகிறது

- **&lt;Number&gt;**
            **<code><var>id</var></code>:** WebDriver Bidi கோரிக்கையின் id


---

## sessionStatus
WebDriver Bidi கட்டளை அளவுருக்களுடன் "session.status" கட்டளை முறையை அனுப்ப.<br /><br />WebDriver Bidi புரோட்டோகால் கட்டளை. மேலும் விவரங்களை [அதிகாரப்பூர்வ புரோட்டோகால் ஆவணங்களில்](https://w3c.github.io/webdriver-bidi/#command-session-status) காணலாம்.

##### பயன்பாடு

```js
browser.sessionStatus(params)
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
      <td><code><var>params</var></code></td>
      <td>`remote.EmptyParams`</td>
      <td><pre>\{\}</pre></td>
    </tr>
  </tbody>
</table>


##### திருப்பி அனுப்புகிறது

- **&lt;Object&gt;**
            **<code><var>local.SessionStatusResult</var></code>:** பின்வரும் இடைமுகத்துடன் கட்டளை திருப்பி அனுப்பும் மதிப்பு:
   ```ts
   {
     ready: boolean;
     message: string;
   }
   ```


---

## sessionNew
WebDriver Bidi கட்டளை அளவுருக்களுடன் "session.new" கட்டளை முறையை அனுப்ப.<br /><br />WebDriver Bidi புரோட்டோகால் கட்டளை. மேலும் விவரங்களை [அதிகாரப்பூர்வ புரோட்டோகால் ஆவணங்களில்](https://w3c.github.io/webdriver-bidi/#command-session-new) காணலாம்.

##### பயன்பாடு

```js
browser.sessionNew(params)
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
      <td><code><var>params</var></code></td>
      <td>`remote.SessionNewParameters`</td>
      <td><pre>\{<br />  capabilities: SessionCapabilitiesRequest;<br />\}</pre></td>
    </tr>
  </tbody>
</table>


##### திருப்பி அனுப்புகிறது

- **&lt;Object&gt;**
            **<code><var>local.SessionNewResult</var></code>:** பின்வரும் இடைமுகத்துடன் கட்டளை திருப்பி அனுப்பும் மதிப்பு:
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
WebDriver Bidi கட்டளை அளவுருக்களுடன் "session.end" கட்டளை முறையை அனுப்ப.<br /><br />WebDriver Bidi புரோட்டோகால் கட்டளை. மேலும் விவரங்களை [அதிகாரப்பூர்வ புரோட்டோகால் ஆவணங்களில்](https://w3c.github.io/webdriver-bidi/#command-session-end) காணலாம்.

##### பயன்பாடு

```js
browser.sessionEnd(params)
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
      <td><code><var>params</var></code></td>
      <td>`remote.EmptyParams`</td>
      <td><pre>\{\}</pre></td>
    </tr>
  </tbody>
</table>



---

## sessionSubscribe
WebDriver Bidi கட்டளை அளவுருக்களுடன் "session.subscribe" கட்டளை முறையை அனுப்ப.<br /><br />WebDriver Bidi புரோட்டோகால் கட்டளை. மேலும் விவரங்களை [அதிகாரப்பூர்வ புரோட்டோகால் ஆவணங்களில்](https://w3c.github.io/webdriver-bidi/#command-session-subscribe) காணலாம்.

##### பயன்பாடு

```js
browser.sessionSubscribe(params)
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
      <td><code><var>params</var></code></td>
      <td>`remote.SessionSubscriptionRequest`</td>
      <td><pre>\{<br />  events: string[];<br />  contexts?: BrowsingContextBrowsingContext[];<br />\}</pre></td>
    </tr>
  </tbody>
</table>



---

## sessionUnsubscribe
WebDriver Bidi கட்டளை அளவுருக்களுடன் "session.unsubscribe" கட்டளை முறையை அனுப்ப.<br /><br />WebDriver Bidi புரோட்டோகால் கட்டளை. மேலும் விவரங்களை [அதிகாரப்பூர்வ புரோட்டோகால் ஆவணங்களில்](https://w3c.github.io/webdriver-bidi/#command-session-unsubscribe) காணலாம்.

##### பயன்பாடு

```js
browser.sessionUnsubscribe(params)
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
      <td><code><var>params</var></code></td>
      <td>`remote.SessionSubscriptionRequest`</td>
      <td><pre>\{<br />  events: string[];<br />  contexts?: BrowsingContextBrowsingContext[];<br />\}</pre></td>
    </tr>
  </tbody>
</table>



---

## browserClose
WebDriver Bidi கட்டளை அளவுருக்களுடன் "browser.close" கட்டளை முறையை அனுப்ப.<br /><br />WebDriver Bidi புரோட்டோகால் கட்டளை. மேலும் விவரங்களை [அதிகாரப்பூர்வ புரோட்டோகால் ஆவணங்களில்](https://w3c.github.io/webdriver-bidi/#command-browser-close) காணலாம்.

##### பயன்பாடு

```js
browser.browserClose(params)
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
      <td><code><var>params</var></code></td>
      <td>`remote.EmptyParams`</td>
      <td><pre>\{\}</pre></td>
    </tr>
  </tbody>
</table>



---

## browserCreateUserContext
WebDriver Bidi கட்டளை அளவுருக்களுடன் "browser.createUserContext" கட்டளை முறையை அனுப்ப.<br /><br />WebDriver Bidi புரோட்டோகால் கட்டளை. மேலும் விவரங்களை [அதிகாரப்பூர்வ புரோட்டோகால் ஆவணங்களில்](https://w3c.github.io/webdriver-bidi/#command-browser-createUserContext) காணலாம்.

##### பயன்பாடு

```js
browser.browserCreateUserContext(params)
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
      <td><code><var>params</var></code></td>
      <td>`remote.EmptyParams`</td>
      <td><pre>\{\}</pre></td>
    </tr>
  </tbody>
</table>


##### திருப்பி அனுப்புகிறது

- **&lt;Object&gt;**
            **<code><var>local.BrowserCreateUserContextResult</var></code>:** பின்வரும் இடைமுகத்துடன் கட்டளை திருப்பி அனுப்பும் மதிப்பு:
   ```ts
   ;
   ```


---

## browserGetUserContexts
WebDriver Bidi கட்டளை அளவுருக்களுடன் "browser.getUserContexts" கட்டளை முறையை அனுப்ப.<br /><br />WebDriver Bidi புரோட்டோகால் கட்டளை. மேலும் விவரங்களை [அதிகாரப்பூர்வ புரோட்டோகால் ஆவணங்களில்](https://w3c.github.io/webdriver-bidi/#command-browser-getUserContexts) காணலாம்.

##### பயன்பாடு

```js
browser.browserGetUserContexts(params)
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
      <td><code><var>params</var></code></td>
      <td>`remote.EmptyParams`</td>
      <td><pre>\{\}</pre></td>
    </tr>
  </tbody>
</table>


##### திருப்பி அனுப்புகிறது

- **&lt;Object&gt;**
            **<code><var>local.BrowserGetUserContextsResult</var></code>:** பின்வரும் இடைமுகத்துடன் கட்டளை திருப்பி அனுப்பும் மதிப்பு:
   ```ts
   {
     userContexts: BrowserUserContextInfo[];
   }
   ```


---

## browserRemoveUserContext
WebDriver Bidi கட்டளை அளவுருக்களுடன் "browser.removeUserContext" கட்டளை முறையை அனுப்ப.<br /><br />WebDriver Bidi புரோட்டோகால் கட்டளை. மேலும் விவரங்களை [அதிகாரப்பூர்வ புரோட்டோகால் ஆவணங்களில்](https://w3c.github.io/webdriver-bidi/#command-browser-removeUserContext) காணலாம்.

##### பயன்பாடு

```js
browser.browserRemoveUserContext(params)
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
      <td><code><var>params</var></code></td>
      <td>`remote.BrowserRemoveUserContextParameters`</td>
      <td><pre>\{<br />  userContext: BrowserUserContext;<br />\}</pre></td>
    </tr>
  </tbody>
</table>



---

## browsingContextActivate
WebDriver Bidi கட்டளை அளவுருக்களுடன் "browsingContext.activate" கட்டளை முறையை அனுப்ப.<br /><br />WebDriver Bidi புரோட்டோகால் கட்டளை. மேலும் விவரங்களை [அதிகாரப்பூர்வ புரோட்டோகால் ஆவணங்களில்](https://w3c.github.io/webdriver-bidi/#command-browsingContext-activate) காணலாம்.

##### பயன்பாடு

```js
browser.browsingContextActivate(params)
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
      <td><code><var>params</var></code></td>
      <td>`remote.BrowsingContextActivateParameters`</td>
      <td><pre>\{<br />  context: BrowsingContextBrowsingContext;<br />\}</pre></td>
    </tr>
  </tbody>
</table>



---

## browsingContextCaptureScreenshot
WebDriver Bidi கட்டளை அளவுருக்களுடன் "browsingContext.captureScreenshot" கட்டளை முறையை அனுப்ப.<br /><br />WebDriver Bidi புரோட்டோகால் கட்டளை. மேலும் விவரங்களை [அதிகாரப்பூர்வ புரோட்டோகால் ஆவணங்களில்](https://w3c.github.io/webdriver-bidi/#command-browsingContext-captureScreenshot) காணலாம்.

##### பயன்பாடு

```js
browser.browsingContextCaptureScreenshot(params)
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
      <td><code><var>params</var></code></td>
      <td>`remote.BrowsingContextCaptureScreenshotParameters`</td>
      <td><pre>\{<br />  context: BrowsingContextBrowsingContext;<br />  /\*\*<br />   \* @default 'viewport'<br />   \*/<br />  origin?: "viewport" &#124; "document";<br />  format?: BrowsingContextImageFormat;<br />  clip?: BrowsingContextClipRectangle;<br />\}</pre></td>
    </tr>
  </tbody>
</table>


##### திருப்பி அனுப்புகிறது

- **&lt;Object&gt;**
            **<code><var>local.BrowsingContextCaptureScreenshotResult</var></code>:** பின்வரும் இடைமுகத்துடன் கட்டளை திருப்பி அனுப்பும் மதிப்பு:
   ```ts
   {
     data: string;
   }
   ```


---

## browsingContextClose
WebDriver Bidi கட்டளை அளவுருக்களுடன் "browsingContext.close" கட்டளை முறையை அனுப்ப.<br /><br />WebDriver Bidi புரோட்டோகால் கட்டளை. மேலும் விவரங்களை [அதிகாரப்பூர்வ புரோட்டோகால் ஆவணங்களில்](https://w3c.github.io/webdriver-bidi/#command-browsingContext-close) காணலாம்.

##### பயன்பாடு

```js
browser.browsingContextClose(params)
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
      <td><code><var>params</var></code></td>
      <td>`remote.BrowsingContextCloseParameters`</td>
      <td><pre>\{<br />  context: BrowsingContextBrowsingContext;<br />  promptUnload?: boolean;<br />\}</pre></td>
    </tr>
  </tbody>
</table>



---

## browsingContextCreate
WebDriver Bidi கட்டளை அளவுருக்களுடன் "browsingContext.create" கட்டளை முறையை அனுப்ப.<br /><br />WebDriver Bidi புரோட்டோகால் கட்டளை. மேலும் விவரங்களை [அதிகாரப்பூர்வ புரோட்டோகால் ஆவணங்களில்](https://w3c.github.io/webdriver-bidi/#command-browsingContext-create) காணலாம்.

##### பயன்பாடு

```js
browser.browsingContextCreate(params)
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
      <td><code><var>params</var></code></td>
      <td>`remote.BrowsingContextCreateParameters`</td>
      <td><pre>\{<br />  type: BrowsingContextCreateType;<br />  referenceContext?: BrowsingContextBrowsingContext;<br />  background?: boolean;<br />  userContext?: BrowserUserContext;<br />\}</pre></td>
    </tr>
  </tbody>
</table>


##### திருப்பி அனுப்புகிறது

- **&lt;Object&gt;**
            **<code><var>local.BrowsingContextCreateResult</var></code>:** பின்வரும் இடைமுகத்துடன் கட்டளை திருப்பி அனுப்பும் மதிப்பு:
   ```ts
   {
     context: BrowsingContextBrowsingContext;
   }
   ```


---

## browsingContextGetTree
WebDriver Bidi கட்டளை அளவுருக்களுடன் "browsingContext.getTree" கட்டளை முறையை அனுப்ப.<br /><br />WebDriver Bidi புரோட்டோகால் கட்டளை. மேலும் விவரங்களை [அதிகாரப்பூர்வ புரோட்டோகால் ஆவணங்களில்](https://w3c.github.io/webdriver-bidi/#command-browsingContext-getTree) காணலாம்.

##### பயன்பாடு

```js
browser.browsingContextGetTree(params)
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
      <td><code><var>params</var></code></td>
      <td>`remote.BrowsingContextGetTreeParameters`</td>
      <td><pre>\{<br />  maxDepth?: JsUint;<br />  root?: BrowsingContextBrowsingContext;<br />\}</pre></td>
    </tr>
  </tbody>
</table>


##### திருப்பி அனுப்புகிறது

- **&lt;Object&gt;**
            **<code><var>local.BrowsingContextGetTreeResult</var></code>:** பின்வரும் இடைமுகத்துடன் கட்டளை திருப்பி அனுப்பும் மதிப்பு:
   ```ts
   {
     contexts: BrowsingContextInfoList;
   }
   ```


---

## browsingContextHandleUserPrompt
WebDriver Bidi கட்டளை அளவுருக்களுடன் "browsingContext.handleUserPrompt" கட்டளை முறையை அனுப்ப.<br /><br />WebDriver Bidi புரோட்டோகால் கட்டளை. மேலும் விவரங்களை [அதிகாரப்பூர்வ புரோட்டோகால் ஆவணங்களில்](https://w3c.github.io/webdriver-bidi/#command-browsingContext-handleUserPrompt) காணலாம்.

##### பயன்பாடு

```js
browser.browsingContextHandleUserPrompt(params)
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
      <td><code><var>params</var></code></td>
      <td>`remote.BrowsingContextHandleUserPromptParameters`</td>
      <td><pre>\{<br />  context: BrowsingContextBrowsingContext;<br />  accept?: boolean;<br />  userText?: string;<br />\}</pre></td>
    </tr>
  </tbody>
</table>



---

## browsingContextLocateNodes
WebDriver Bidi கட்டளை அளவுருக்களுடன் "browsingContext.locateNodes" கட்டளை முறையை அனுப்ப.<br /><br />WebDriver Bidi புரோட்டோகால் கட்டளை. மேலும் விவரங்களை [அதிகாரப்பூர்வ புரோட்டோகால் ஆவணங்களில்](https://w3c.github.io/webdriver-bidi/#command-browsingContext-locateNodes) காணலாம்.

##### பயன்பாடு

```js
browser.browsingContextLocateNodes(params)
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
      <td><code><var>params</var></code></td>
      <td>`remote.BrowsingContextLocateNodesParameters`</td>
      <td><pre>\{<br />  context: BrowsingContextBrowsingContext;<br />  locator: BrowsingContextLocator;<br />  maxNodeCount?: JsUint;<br />  serializationOptions?: ScriptSerializationOptions;<br />  startNodes?: ScriptSharedReference[];<br />\}</pre></td>
    </tr>
  </tbody>
</table>


##### திருப்பி அனுப்புகிறது

- **&lt;Object&gt;**
            **<code><var>local.BrowsingContextLocateNodesResult</var></code>:** பின்வரும் இடைமுகத்துடன் கட்டளை திருப்பி அனுப்பும் மதிப்பு:
   ```ts
   {
     nodes: ScriptNodeRemoteValue[];
   }
   ```


---

## browsingContextNavigate
WebDriver Bidi கட்டளை அளவுருக்களுடன் "browsingContext.navigate" கட்டளை முறையை அனுப்ப.<br /><br />WebDriver Bidi புரோட்டோகால் கட்டளை. மேலும் விவரங்களை [அதிகாரப்பூர்வ புரோட்டோகால் ஆவணங்களில்](https://w3c.github.io/webdriver-bidi/#command-browsingContext-navigate) காணலாம்.

##### பயன்பாடு

```js
browser.browsingContextNavigate(params)
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
      <td><code><var>params</var></code></td>
      <td>`remote.BrowsingContextNavigateParameters`</td>
      <td><pre>\{<br />  context: BrowsingContextBrowsingContext;<br />  url: string;<br />  wait?: BrowsingContextReadinessState;<br />\}</pre></td>
    </tr>
  </tbody>
</table>


##### திருப்பி அனுப்புகிறது

- **&lt;Object&gt;**
            **<code><var>local.BrowsingContextNavigateResult</var></code>:** பின்வரும் இடைமுகத்துடன் கட்டளை திருப்பி அனுப்பும் மதிப்பு:
   ```ts
   {
     navigation: BrowsingContextNavigation | null;
     url: string;
   }
   ```


---

## browsingContextPrint
WebDriver Bidi கட்டளை அளவுருக்களுடன் "browsingContext.print" கட்டளை முறையை அனுப்ப.<br /><br />WebDriver Bidi புரோட்டோகால் கட்டளை. மேலும் விவரங்களை [அதிகாரப்பூர்வ புரோட்டோகால் ஆவணங்களில்](https://w3c.github.io/webdriver-bidi/#command-browsingContext-print) காணலாம்.

##### பயன்பாடு

```js
browser.browsingContextPrint(params)
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
      <td><code><var>params</var></code></td>
      <td>`remote.BrowsingContextPrintParameters`</td>
      <td><pre>\{<br />  context: BrowsingContextBrowsingContext;<br />  background?: boolean;<br />  margin?: BrowsingContextPrintMarginParameters;<br />  /\*\*<br />   \* @default 'portrait'<br />   \*/<br />  orientation?: "portrait" &#124; "landscape";<br />  page?: BrowsingContextPrintPageParameters;<br />  pageRanges?: (JsUint &#124; string)[];<br />  /\*\*<br />   \* @default 1<br />   \*/<br />  scale?: number;<br />  /\*\*<br />   \* @default true<br />   \*/<br />  shrinkToFit?: boolean;<br />\}</pre></td>
    </tr>
  </tbody>
</table>


##### திருப்பி அனுப்புகிறது

- **&lt;Object&gt;**
            **<code><var>local.BrowsingContextPrintResult</var></code>:** பின்வரும் இடைமுகத்துடன் கட்டளை திருப்பி அனுப்பும் மதிப்பு:
   ```ts
   {
     data: string;
   }
   ```


---

## browsingContextReload
WebDriver Bidi கட்டளை அளவுருக்களுடன் "browsingContext.reload" கட்டளை முறையை அனுப்ப.<br /><br />WebDriver Bidi புரோட்டோகால் கட்டளை. மேலும் விவரங்களை [அதிகாரப்பூர்வ புரோட்டோகால் ஆவணங்களில்](https://w3c.github.io/webdriver-bidi/#command-browsingContext-reload) காணலாம்.

##### பயன்பாடு

```js
browser.browsingContextReload(params)
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
      <td><code><var>params</var></code></td>
      <td>`remote.BrowsingContextReloadParameters`</td>
      <td><pre>\{<br />  context: BrowsingContextBrowsingContext;<br />  ignoreCache?: boolean;<br />  wait?: BrowsingContextReadinessState;<br />\}</pre></td>
    </tr>
  </tbody>
</table>



---

## browsingContextSetViewport
WebDriver Bidi கட்டளை அளவுருக்களுடன் "browsingContext.setViewport" கட்டளை முறையை அனுப்ப.<br /><br />WebDriver Bidi புரோட்டோகால் கட்டளை. மேலும் விவரங்களை [அதிகாரப்பூர்வ புரோட்டோகால் ஆவணங்களில்](https://w3c.github.io/webdriver-bidi/#command-browsingContext-setViewport) காணலாம்.

##### பயன்பாடு

```js
browser.browsingContextSetViewport(params)
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
      <td><code><var>params</var></code></td>
      <td>`remote.BrowsingContextSetViewportParameters`</td>
      <td><pre>\{<br />  context: BrowsingContextBrowsingContext;<br />  viewport?: BrowsingContextViewport &#124; null;<br />  devicePixelRatio?: number &#124; null;<br />\}</pre></td>
    </tr>
  </tbody>
</table>



---

## browsingContextTraverseHistory
WebDriver Bidi கட்டளை அளவுருக்களுடன் "browsingContext.traverseHistory" கட்டளை முறையை அனுப்ப.<br /><br />WebDriver Bidi புரோட்டோகால் கட்டளை. மேலும் விவரங்களை [அதிகாரப்பூர்வ புரோட்டோகால் ஆவணங்களில்](https://w3c.github.io/webdriver-bidi/#command-browsingContext-traverseHistory) காணலாம்.

##### பயன்பாடு

```js
browser.browsingContextTraverseHistory(params)
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
      <td><code><var>params</var></code></td>
      <td>`remote.BrowsingContextTraverseHistoryParameters`</td>
      <td><pre>\{<br />  context: BrowsingContextBrowsingContext;<br />  delta: JsInt;<br />\}</pre></td>
    </tr>
  </tbody>
</table>



---

## networkAddIntercept
WebDriver Bidi கட்டளை அளவுருக்களுடன் "network.addIntercept" கட்டளை முறையை அனுப்ப.<br /><br />WebDriver Bidi புரோட்டோகால் கட்டளை. மேலும் விவரங்களை [அதிகாரப்பூர்வ புரோட்டோகால் ஆவணங்களில்](https://w3c.github.io/webdriver-bidi/#command-network-addIntercept) காணலாம்.

##### பயன்பாடு

```js
browser.networkAddIntercept(params)
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
      <td><code><var>params</var></code></td>
      <td>`remote.NetworkAddInterceptParameters`</td>
      <td><pre>\{<br />  phases: NetworkInterceptPhase[];<br />  contexts?: BrowsingContextBrowsingContext[];<br />  urlPatterns?: NetworkUrlPattern[];<br />\}</pre></td>
    </tr>
  </tbody>
</table>


##### திருப்பி அனுப்புகிறது

- **&lt;Object&gt;**
            **<code><var>local.NetworkAddInterceptResult</var></code>:** பின்வரும் இடைமுகத்துடன் கட்டளை திருப்பி அனுப்பும் மதிப்பு:
   ```ts
   {
     intercept: NetworkIntercept;
   }
   ```


---

## networkContinueRequest
WebDriver Bidi கட்டளை அளவுருக்களுடன் "network.continueRequest" கட்டளை முறையை அனுப்ப.<br /><br />WebDriver Bidi புரோட்டோகால் கட்டளை. மேலும் விவரங்களை [அதிகாரப்பூர்வ புரோட்டோகால் ஆவணங்களில்](https://w3c.github.io/webdriver-bidi/#command-network-continueRequest) காணலாம்.

##### பயன்பாடு

```js
browser.networkContinueRequest(params)
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
      <td><code><var>params</var></code></td>
      <td>`remote.NetworkContinueRequestParameters`</td>
      <td><pre>\{<br />  request: NetworkRequest;<br />  body?: NetworkBytesValue;<br />  cookies?: NetworkCookieHeader[];<br />  headers?: NetworkHeader[];<br />  method?: string;<br />  url?: string;<br />\}</pre></td>
    </tr>
  </tbody>
</table>



---

## networkContinueResponse
WebDriver Bidi கட்டளை அளவுருக்களுடன் "network.continueResponse" கட்டளை முறையை அனுப்ப.<br /><br />WebDriver Bidi புரோட்டோகால் கட்டளை. மேலும் விவரங்களை [அதிகாரப்பூர்வ புரோட்டோகால் ஆவணங்களில்](https://w3c.github.io/webdriver-bidi/#command-network-continueResponse) காணலாம்.

##### பயன்பாடு

```js
browser.networkContinueResponse(params)
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
      <td><code><var>params</var></code></td>
      <td>`remote.NetworkContinueResponseParameters`</td>
      <td><pre>\{<br />  request: NetworkRequest;<br />  cookies?: NetworkSetCookieHeader[];<br />  credentials?: NetworkAuthCredentials;<br />  headers?: NetworkHeader[];<br />  reasonPhrase?: string;<br />  statusCode?: JsUint;<br />\}</pre></td>
    </tr>
  </tbody>
</table>



---

## networkContinueWithAuth
WebDriver Bidi கட்டளை அளவுருக்களுடன் "network.continueWithAuth" கட்டளை முறையை அனுப்ப.<br /><br />WebDriver Bidi புரோட்டோகால் கட்டளை. மேலும் விவரங்களை [அதிகாரப்பூர்வ புரோட்டோகால் ஆவணங்களில்](https://w3c.github.io/webdriver-bidi/#command-network-continueWithAuth) காணலாம்.

##### பயன்பாடு

```js
browser.networkContinueWithAuth(params)
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
      <td><code><var>params</var></code></td>
      <td>`remote.NetworkContinueWithAuthParameters`</td>
      <td><pre>\{<br />  request: NetworkRequest;<br />\}</pre></td>
    </tr>
  </tbody>
</table>



---

## networkFailRequest
WebDriver Bidi கட்டளை அளவுருக்களுடன் "network.failRequest" கட்டளை முறையை அனுப்ப.<br /><br />WebDriver Bidi புரோட்டோகால் கட்டளை. மேலும் விவரங்களை [அதிகாரப்பூர்வ புரோட்டோகால் ஆவணங்களில்](https://w3c.github.io/webdriver-bidi/#command-network-failRequest) காணலாம்.

##### பயன்பாடு

```js
browser.networkFailRequest(params)
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
      <td><code><var>params</var></code></td>
      <td>`remote.NetworkFailRequestParameters`</td>
      <td><pre>\{<br />  request: NetworkRequest;<br />\}</pre></td>
    </tr>
  </tbody>
</table>



---

## networkProvideResponse
WebDriver Bidi கட்டளை அளவுருக்களுடன் "network.provideResponse" கட்டளை முறையை அனுப்ப.<br /><br />WebDriver Bidi புரோட்டோகால் கட்டளை. மேலும் விவரங்களை [அதிகாரப்பூர்வ புரோட்டோகால் ஆவணங்களில்](https://w3c.github.io/webdriver-bidi/#command-network-provideResponse) காணலாம்.

##### பயன்பாடு

```js
browser.networkProvideResponse(params)
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
      <td><code><var>params</var></code></td>
      <td>`remote.NetworkProvideResponseParameters`</td>
      <td><pre>\{<br />  request: NetworkRequest;<br />  body?: NetworkBytesValue;<br />  cookies?: NetworkSetCookieHeader[];<br />  headers?: NetworkHeader[];<br />  reasonPhrase?: string;<br />  statusCode?: JsUint;<br />\}</pre></td>
    </tr>
  </tbody>
</table>



---

## networkRemoveIntercept
WebDriver Bidi கட்டளை அளவுருக்களுடன் "network.removeIntercept" கட்டளை முறையை அனுப்ப.<br /><br />WebDriver Bidi புரோட்டோகால் கட்டளை. மேலும் விவரங்களை [அதிகாரப்பூர்வ புரோட்டோகால் ஆவணங்களில்](https://w3c.github.io/webdriver-bidi/#command-network-removeIntercept) காணலாம்.

##### பயன்பாடு

```js
browser.networkRemoveIntercept(params)
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
      <td><code><var>params</var></code></td>
      <td>`remote.NetworkRemoveInterceptParameters`</td>
      <td><pre>\{<br />  intercept: NetworkIntercept;<br />\}</pre></td>
    </tr>
  </tbody>
</table>



---

## scriptAddPreloadScript
WebDriver Bidi கட்டளை அளவுருக்களுடன் "script.addPreloadScript" கட்டளை முறையை அனுப்ப.<br /><br />WebDriver Bidi புரோட்டோகால் கட்டளை. மேலும் விவரங்களை [அதிகாரப்பூர்வ புரோட்டோகால் ஆவணங்களில்](https://w3c.github.io/webdriver-bidi/#command-script-addPreloadScript) காணலாம்.

##### பயன்பாடு

```js
browser.scriptAddPreloadScript(params)
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
      <td><code><var>params</var></code></td>
      <td>`remote.ScriptAddPreloadScriptParameters`</td>
      <td><pre>\{<br />  functionDeclaration: string;<br />  arguments?: ScriptChannelValue[];<br />  contexts?: BrowsingContextBrowsingContext[];<br />  sandbox?: string;<br />\}</pre></td>
    </tr>
  </tbody>
</table>


##### திருப்பி அனுப்புகிறது

- **&lt;Object&gt;**
            **<code><var>local.ScriptAddPreloadScriptResult</var></code>:** பின்வரும் இடைமுகத்துடன் கட்டளை திருப்பி அனுப்பும் மதிப்பு:
   ```ts
   {
     script: ScriptPreloadScript;
   }
   ```


---

## scriptDisown
WebDriver Bidi கட்டளை அளவுருக்களுடன் "script.disown" கட்டளை முறையை அனுப்ப.<br /><br />WebDriver Bidi புரோட்டோகால் கட்டளை. மேலும் விவரங்களை [அதிகாரப்பூர்வ புரோட்டோகால் ஆவணங்களில்](https://w3c.github.io/webdriver-bidi/#command-script-disown) காணலாம்.

##### பயன்பாடு

```js
browser.scriptDisown(params)
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
      <td><code><var>params</var></code></td>
      <td>`remote.ScriptDisownParameters`</td>
      <td><pre>\{<br />  handles: ScriptHandle[];<br />  target: ScriptTarget;<br />\}</pre></td>
    </tr>
  </tbody>
</table>



---

## scriptCallFunction
WebDriver Bidi கட்டளை அளவுருக்களுடன் "script.callFunction" கட்டளை முறையை அனுப்ப.<br /><br />WebDriver Bidi புரோட்டோகால் கட்டளை. மேலும் விவரங்களை [அதிகாரப்பூர்வ புரோட்டோகால் ஆவணங்களில்](https://w3c.github.io/webdriver-bidi/#command-script-callFunction) காணலாம்.

##### பயன்பாடு

```js
browser.scriptCallFunction(params)
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
      <td><code><var>params</var></code></td>
      <td>`remote.ScriptCallFunctionParameters`</td>
      <td><pre>\{<br />  functionDeclaration: string;<br />  awaitPromise: boolean;<br />  target: ScriptTarget;<br />  arguments?: ScriptLocalValue[];<br />  resultOwnership?: ScriptResultOwnership;<br />  serializationOptions?: ScriptSerializationOptions;<br />  this?: ScriptLocalValue;<br />  userActivation?: boolean;<br />\}</pre></td>
    </tr>
  </tbody>
</table>



---

## scriptEvaluate
WebDriver Bidi கட்டளை அளவுருக்களுடன் "script.evaluate" கட்டளை முறையை அனுப்ப.<br /><br />WebDriver Bidi புரோட்டோகால் கட்டளை. மேலும் விவரங்களை [அதிகாரப்பூர்வ புரோட்டோகால் ஆவணங்களில்](https://w3c.github.io/webdriver-bidi/#command-script-evaluate) காணலாம்.

##### பயன்பாடு

```js
browser.scriptEvaluate(params)
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
      <td><code><var>params</var></code></td>
      <td>`remote.ScriptEvaluateParameters`</td>
      <td><pre>\{<br />  expression: string;<br />  target: ScriptTarget;<br />  awaitPromise: boolean;<br />  resultOwnership?: ScriptResultOwnership;<br />  serializationOptions?: ScriptSerializationOptions;<br />  userActivation?: boolean;<br />\}</pre></td>
    </tr>
  </tbody>
</table>


##### திருப்பி அனுப்புகிறது

- **&lt;Object&gt;**
            **<code><var>local.ScriptEvaluateResult</var></code>:** பின்வரும் இடைமுகத்துடன் கட்டளை திருப்பி அனுப்பும் மதிப்பு:
   ```ts
   ;
   ```


---

## scriptGetRealms
WebDriver Bidi கட்டளை அளவுருக்களுடன் "script.getRealms" கட்டளை முறையை அனுப்ப.<br /><br />WebDriver Bidi புரோட்டோகால் கட்டளை. மேலும் விவரங்களை [அதிகாரப்பூர்வ புரோட்டோகால் ஆவணங்களில்](https://w3c.github.io/webdriver-bidi/#command-script-getRealms) காணலாம்.

##### பயன்பாடு

```js
browser.scriptGetRealms(params)
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
      <td><code><var>params</var></code></td>
      <td>`remote.ScriptGetRealmsParameters`</td>
      <td><pre>\{<br />  context?: BrowsingContextBrowsingContext;<br />  type?: ScriptRealmType;<br />\}</pre></td>
    </tr>
  </tbody>
</table>


##### திருப்பி அனுப்புகிறது

- **&lt;Object&gt;**
            **<code><var>local.ScriptGetRealmsResult</var></code>:** பின்வரும் இடைமுகத்துடன் கட்டளை திருப்பி அனுப்பும் மதிப்பு:
   ```ts
   {
     realms: ScriptRealmInfo[];
   }
   ```


---

## scriptRemovePreloadScript
WebDriver Bidi கட்டளை அளவுருக்களுடன் "script.removePreloadScript" கட்டளை முறையை அனுப்ப.<br /><br />WebDriver Bidi புரோட்டோகால் கட்டளை. மேலும் விவரங்களை [அதிகாரப்பூர்வ புரோட்டோகால் ஆவணங்களில்](https://w3c.github.io/webdriver-bidi/#command-script-removePreloadScript) காணலாம்.

##### பயன்பாடு

```js
browser.scriptRemovePreloadScript(params)
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
      <td><code><var>params</var></code></td>
      <td>`remote.ScriptRemovePreloadScriptParameters`</td>
      <td><pre>\{<br />  script: ScriptPreloadScript;<br />\}</pre></td>
    </tr>
  </tbody>
</table>



---

## storageGetCookies
WebDriver Bidi கட்டளை அளவுருக்களுடன் "storage.getCookies" கட்டளை முறையை அனுப்ப.<br /><br />WebDriver Bidi புரோட்டோகால் கட்டளை. மேலும் விவரங்களை [அதிகாரப்பூர்வ புரோட்டோகால் ஆவணங்களில்](https://w3c.github.io/webdriver-bidi/#command-storage-getCookies) காணலாம்.

##### பயன்பாடு

```js
browser.storageGetCookies(params)
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
      <td><code><var>params</var></code></td>
      <td>`remote.StorageGetCookiesParameters`</td>
      <td><pre>\{<br />  filter?: StorageCookieFilter;<br />  partition?: StoragePartitionDescriptor;<br />\}</pre></td>
    </tr>
  </tbody>
</table>


##### திருப்பி அனுப்புகிறது

- **&lt;Object&gt;**
            **<code><var>local.StorageGetCookiesResult</var></code>:** பின்வரும் இடைமுகத்துடன் கட்டளை திருப்பி அனுப்பும் மதிப்பு:
   ```ts
   {
     cookies: NetworkCookie[];
     partitionKey: StoragePartitionKey;
   }
   ```


---

## storageSetCookie
WebDriver Bidi கட்டளை அளவுருக்களுடன் "storage.setCookie" கட்டளை முறையை அனுப்ப.<br /><br />WebDriver Bidi புரோட்டோகால் கட்டளை. மேலும் விவரங்களை [அதிகாரப்பூர்வ புரோட்டோகால் ஆவணங்களில்](https://w3c.github.io/webdriver-bidi/#command-storage-setCookie) காணலாம்.

##### பயன்பாடு

```js
browser.storageSetCookie(params)
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
      <td><code><var>params</var></code></td>
      <td>`remote.StorageSetCookieParameters`</td>
      <td><pre>\{<br />  cookie: StoragePartialCookie;<br />  partition?: StoragePartitionDescriptor;<br />\}</pre></td>
    </tr>
  </tbody>
</table>


##### திருப்பி அனுப்புகிறது

- **&lt;Object&gt;**
            **<code><var>local.StorageSetCookieResult</var></code>:** பின்வரும் இடைமுகத்துடன் கட்டளை திருப்பி அனுப்பும் மதிப்பு:
   ```ts
   {
     partitionKey: StoragePartitionKey;
   }
   ```


---

## storageDeleteCookies
WebDriver Bidi கட்டளை அளவுருக்களுடன் "storage.deleteCookies" கட்டளை முறையை அனுப்ப.<br /><br />WebDriver Bidi புரோட்டோகால் கட்டளை. மேலும் விவரங்களை [அதிகாரப்பூர்வ புரோட்டோகால் ஆவணங்களில்](https://w3c.github.io/webdriver-bidi/#command-storage-deleteCookies) காணலாம்.

##### பயன்பாடு

```js
browser.storageDeleteCookies(params)
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
      <td><code><var>params</var></code></td>
      <td>`remote.StorageDeleteCookiesParameters`</td>
      <td><pre>\{<br />  filter?: StorageCookieFilter;<br />  partition?: StoragePartitionDescriptor;<br />\}</pre></td>
    </tr>
  </tbody>
</table>


##### திருப்பி அனுப்புகிறது

- **&lt;Object&gt;**
            **<code><var>local.StorageDeleteCookiesResult</var></code>:** பின்வரும் இடைமுகத்துடன் கட்டளை திருப்பி அனுப்பும் மதிப்பு:
   ```ts
   {
     partitionKey: StoragePartitionKey;
   }
   ```


---

## inputPerformActions
WebDriver Bidi கட்டளை அளவுருக்களுடன் "input.performActions" கட்டளை முறையை அனுப்ப.<br /><br />WebDriver Bidi புரோட்டோகால் கட்டளை. மேலும் விவரங்களை [அதிகாரப்பூர்வ புரோட்டோகால் ஆவணங்களில்](https://w3c.github.io/webdriver-bidi/#command-input-performActions) காணலாம்.

##### பயன்பாடு

```js
browser.inputPerformActions(params)
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
      <td><code><var>params</var></code></td>
      <td>`remote.InputPerformActionsParameters`</td>
      <td><pre>\{<br />  context: BrowsingContextBrowsingContext;<br />  actions: InputSourceActions[];<br />\}</pre></td>
    </tr>
  </tbody>
</table>



---

## inputReleaseActions
WebDriver Bidi கட்டளை அளவுருக்களுடன் "input.releaseActions" கட்டளை முறையை அனுப்ப.<br /><br />WebDriver Bidi புரோட்டோகால் கட்டளை. மேலும் விவரங்களை [அதிகாரப்பூர்வ புரோட்டோகால் ஆவணங்களில்](https://w3c.github.io/webdriver-bidi/#command-input-releaseActions) காணலாம்.

##### பயன்பாடு

```js
browser.inputReleaseActions(params)
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
      <td><code><var>params</var></code></td>
      <td>`remote.InputReleaseActionsParameters`</td>
      <td><pre>\{<br />  context: BrowsingContextBrowsingContext;<br />\}</pre></td>
    </tr>
  </tbody>
</table>



---

## inputSetFiles
WebDriver Bidi கட்டளை அளவுருக்களுடன் "input.setFiles" கட்டளை முறையை அனுப்ப.<br /><br />WebDriver Bidi புரோட்டோகால் கட்டளை. மேலும் விவரங்களை [அதிகாரப்பூர்வ புரோட்டோகால் ஆவணங்களில்](https://w3c.github.io/webdriver-bidi/#command-input-setFiles) காணலாம்.

##### பயன்பாடு

```js
browser.inputSetFiles(params)
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
      <td><code><var>params</var></code></td>
      <td>`remote.InputSetFilesParameters`</td>
      <td><pre>\{<br />  context: BrowsingContextBrowsingContext;<br />  element: ScriptSharedReference;<br />  files: string[];<br />\}</pre></td>
    </tr>
  </tbody>
</table>