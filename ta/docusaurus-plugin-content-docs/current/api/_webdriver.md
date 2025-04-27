---
id: webdriver
title: WebDriver Protocol
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-protocols/src/protocols/webdriver.ts
---

## newSession
புதிய அமர்வு கட்டளை முனைய முனைவுடன் ஒரு புதிய WebDriver அமர்வை உருவாக்குகிறது. உருவாக்கம் தோல்வியுற்றால், ஒரு அமர்வு உருவாக்கப்படவில்லை என்ற பிழை திருப்பப்படும்.<br /><br />WebDriver Protocol கட்டளை. கூடுதல் விவரங்கள் [அதிகாரப்பூர்வ நெறிமுறை ஆவணங்களில்](https://w3c.github.io/webdriver/#dfn-new-sessions) காணலாம்.

##### Usage

```js
browser.newSession(capabilities)
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
      <td><code><var>capabilities</var></code></td>
      <td>object</td>
      <td>a JSON object, the set of capabilities that was ultimately merged and matched in the capability processing algorithm</td>
    </tr>
  </tbody>
</table>


##### Returns

- **&lt;Object&gt;**
            **<code><var>session</var></code>:** Object containing sessionId and capabilities of created WebDriver session.


---

## deleteSession
Delete Session கட்டளை தற்போதைய அமர்வுடன் தொடர்புடைய எந்த மேல்-நிலை உலாவுதல் சூழல்களையும் மூடுகிறது, இணைப்பை முடிக்கிறது, இறுதியாக தற்போதைய அமர்வை மூடுகிறது.<br /><br />WebDriver Protocol கட்டளை. கூடுதல் விவரங்கள் [அதிகாரப்பூர்வ நெறிமுறை ஆவணங்களில்](https://w3c.github.io/webdriver/#dfn-delete-session) காணலாம்.

##### Usage

```js
browser.deleteSession(deleteSessionOpts)
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
      <td><code><var>deleteSessionOpts</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>object</td>
      <td>Object containing options for the deleteSession command, e.g. `{ shutdownDriver: boolean }`</td>
    </tr>
  </tbody>
</table>



---

## status
நிலை கட்டளை தொலைநிலை முனைப்பகம் புதிய அமர்வுகளை உருவாக்கக்கூடிய நிலையில் உள்ளதா என்பது பற்றிய தகவலைத் திருப்பித் தருகிறது மற்றும் செயல்படுத்தலுக்கு குறிப்பிட்ட தன்னிச்சையான மெட்டா தகவலையும் சேர்க்கலாம்.<br /><br />WebDriver Protocol கட்டளை. கூடுதல் விவரங்கள் [அதிகாரப்பூர்வ நெறிமுறை ஆவணங்களில்](https://w3c.github.io/webdriver/#dfn-status) காணலாம்.

##### Usage

```js
browser.status()
```

##### Example

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L5-L16
```

##### Returns

- **&lt;Object&gt;**
            **<code><var>status</var></code>:** Object containing status of the driver status.


---

## getTimeouts
Get Timeouts கட்டளை தற்போதைய அமர்வுடன் தொடர்புடைய நேர முடிவு காலங்களைப் பெறுகிறது.<br /><br />WebDriver Protocol கட்டளை. கூடுதல் விவரங்கள் [அதிகாரப்பூர்வ நெறிமுறை ஆவணங்களில்](https://w3c.github.io/webdriver/#dfn-get-timeouts) காணலாம்.

##### Usage

```js
browser.getTimeouts()
```

##### Example

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L20-L24
```

##### Returns

- **&lt;Object&gt;**
            **<code><var>timeouts</var></code>:** Object containing timeout durations for `script`, `pageLoad` and `implicit` timeouts.


---

## setTimeouts
Set Timeouts கட்டளை தற்போதைய அமர்வுடன் தொடர்புடைய நேர முடிவு காலங்களை அமைக்கிறது. கட்டுப்படுத்தக்கூடிய நேர முடிவுகள் அமர்வு நேர முடிவுகள் அட்டவணையில் பட்டியலிடப்பட்டுள்ளன.<br /><br />WebDriver Protocol கட்டளை. கூடுதல் விவரங்கள் [அதிகாரப்பூர்வ நெறிமுறை ஆவணங்களில்](https://w3c.github.io/webdriver/#dfn-set-timeouts) காணலாம்.

##### Usage

```js
browser.setTimeouts(implicit, pageLoad, script)
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
      <td><code><var>implicit</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>number</td>
      <td>integer in ms for session implicit wait timeout</td>
    </tr>
    <tr>
      <td><code><var>pageLoad</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>number</td>
      <td>integer in ms for session page load timeout</td>
    </tr>
    <tr>
      <td><code><var>script</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>number</td>
      <td>integer in ms for session script timeout</td>
    </tr>
  </tbody>
</table>

##### Example

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L28-L33
```




---

## getUrl
Get Current URL கட்டளை தற்போதைய உயர்நிலை உலாவுதல் சூழலின் URL ஐத் திருப்பித் தருகிறது.<br /><br />WebDriver Protocol கட்டளை. கூடுதல் விவரங்கள் [அதிகாரப்பூர்வ நெறிமுறை ஆவணங்களில்](https://w3c.github.io/webdriver/#dfn-get-current-url) காணலாம்.

##### Usage

```js
browser.getUrl()
```

##### Example

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L39-L43
```

##### Returns

- **&lt;string&gt;**
            **<code><var>url</var></code>:** current top-level browsing context's active document's document URL


---

## navigateTo
navigateTo (go) கட்டளை பயனர் முகவரைத் தற்போதைய உயர்நிலை உலாவுதல் சூழலைப் புதிய இடத்திற்கு செலுத்தப் பயன்படுகிறது.<br /><br />WebDriver Protocol கட்டளை. கூடுதல் விவரங்கள் [அதிகாரப்பூர்வ நெறிமுறை ஆவணங்களில்](https://w3c.github.io/webdriver/#dfn-navigate-to) காணலாம்.

:::info

இந்த நெறிமுறை கட்டளை பின்வரும் வசதியான முறையில் உள்ளிணைக்கப்பட்டுள்ளது: [url](/docs/api/browser/url). இதற்கு பதிலாக இந்த கட்டளையைப் பயன்படுத்த பரிந்துரைக்கப்படுகிறது.

:::


##### Usage

```js
browser.navigateTo(url)
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
      <td>string</td>
      <td>string representing an absolute URL (beginning with http(s)), possibly including a fragment (#...), could also be a local scheme (about: etc)</td>
    </tr>
  </tbody>
</table>

##### Example

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L47-L51
```




---

## back
Back கட்டளை உலாவியானது தற்போதைய உயர்நிலை உலாவுதல் சூழல் இணைந்த அமர்வு வரலாற்றில் ஒரு படி பின்னோக்கி செல்ல காரணமாகிறது. இது உலாவி chrome இல் உள்ள பின் பொத்தானை அழுத்துவது அல்லது `window.history.back` ஐ அழைப்பதற்கு சமமாகும்.<br /><br />WebDriver Protocol கட்டளை. கூடுதல் விவரங்கள் [அதிகாரப்பூர்வ நெறிமுறை ஆவணங்களில்](https://w3c.github.io/webdriver/#dfn-back) காணலாம்.

##### Usage

```js
browser.back()
```

##### Example

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L55-L59
```




---

## forward
Forward கட்டளை உலாவியானது தற்போதைய உயர்நிலை உலாவுதல் சூழல் இணைந்த அமர்வு வரலாற்றில் ஒரு படி முன்னோக்கி செல்ல காரணமாகிறது.<br /><br />WebDriver Protocol கட்டளை. கூடுதல் விவரங்கள் [அதிகாரப்பூர்வ நெறிமுறை ஆவணங்களில்](https://w3c.github.io/webdriver/#dfn-forward) காணலாம்.

##### Usage

```js
browser.forward()
```

##### Example

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L63-L69
```




---

## refresh
Refresh கட்டளை உலாவியானது தற்போதைய உயர்நிலை உலாவுதல் சூழலில் பக்கத்தை மீண்டும் ஏற்ற வைக்கிறது.<br /><br />WebDriver Protocol கட்டளை. கூடுதல் விவரங்கள் [அதிகாரப்பூர்வ நெறிமுறை ஆவணங்களில்](https://w3c.github.io/webdriver/#dfn-refresh) காணலாம்.

##### Usage

```js
browser.refresh()
```

##### Example

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L73-L78
```




---

## getTitle
Get Title கட்டளை தற்போதைய உயர்நிலை உலாவுதல் சூழலின் ஆவண தலைப்பை திருப்பித் தருகிறது, `document.title` ஐ அழைப்பதற்கு சமமாகும்.<br /><br />WebDriver Protocol கட்டளை. கூடுதல் விவரங்கள் [அதிகாரப்பூர்வ நெறிமுறை ஆவணங்களில்](https://w3c.github.io/webdriver/#dfn-get-title) காணலாம்.

##### Usage

```js
browser.getTitle()
```

##### Example

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L82-L86
```

##### Returns

- **&lt;string&gt;**
            **<code><var>title</var></code>:** Returns a string which is the same as `document.title` of the current top-level browsing context.


---

## getWindowHandle
Get Window Handle கட்டளை தற்போதைய உயர்நிலை உலாவுதல் சூழலுக்கான சாளர கைப்பிடியைத் திருப்பித் தருகிறது. இது Switch To Window க்கு வாதமாகப் பயன்படுத்தப்படலாம்.<br /><br />WebDriver Protocol கட்டளை. கூடுதல் விவரங்கள் [அதிகாரப்பூர்வ நெறிமுறை ஆவணங்களில்](https://w3c.github.io/webdriver/#dfn-get-window-handle) காணலாம்.

##### Usage

```js
browser.getWindowHandle()
```

##### Example

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L90-L93
```

##### Returns

- **&lt;string&gt;**
            **<code><var>handle</var></code>:** Returns a string which is the window handle for the current top-level browsing context.


---

## closeWindow
Close Window கட்டளை தற்போதைய உயர்நிலை உலாவுதல் சூழலை மூடுகிறது. முடிந்ததும், மேலும் உயர்நிலை உலாவுதல் சூழல்கள் இல்லாவிட்டால், WebDriver அமர்வு தானாகவே மூடப்படுகிறது.<br /><br />WebDriver Protocol கட்டளை. கூடுதல் விவரங்கள் [அதிகாரப்பூர்வ நெறிமுறை ஆவணங்களில்](https://w3c.github.io/webdriver/#dfn-close-window) காணலாம்.

##### Usage

```js
browser.closeWindow()
```

##### Example

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L97-L117
```




---

## switchToWindow
Switch To Window கட்டளை தற்போதைய அமர்வுக்கான தற்போதைய உயர்நிலை உலாவுதல் சூழலைத் தேர்ந்தெடுக்கப் பயன்படுகிறது, அதாவது கட்டளைகளைச் செயலாக்குவதற்குப் பயன்படுத்தப்படும்.<br /><br />WebDriver Protocol கட்டளை. கூடுதல் விவரங்கள் [அதிகாரப்பூர்வ நெறிமுறை ஆவணங்களில்](https://w3c.github.io/webdriver/#dfn-switch-to-window) காணலாம்.

:::info

இந்த நெறிமுறை கட்டளை பின்வரும் வசதியான முறையில் உள்ளிணைக்கப்பட்டுள்ளது: [switchWindow](/docs/api/browser/switchWindow). இதற்கு பதிலாக இந்த கட்டளையைப் பயன்படுத்த பரிந்துரைக்கப்படுகிறது.

:::


##### Usage

```js
browser.switchToWindow(handle)
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
      <td><code><var>handle</var></code></td>
      <td>string</td>
      <td>a string representing a window handle, should be one of the strings that was returned in a call to getWindowHandles</td>
    </tr>
  </tbody>
</table>

##### Example

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L121-L130
```




---

## createWindow
ஒரு புதிய உயர்நிலை உலாவல் சூழலை உருவாக்கவும்.<br /><br />WebDriver Protocol கட்டளை. கூடுதல் விவரங்கள் [அதிகாரப்பூர்வ நெறிமுறை ஆவணங்களில்](https://w3c.github.io/webdriver/#new-window) காணலாம்.

##### Usage

```js
browser.createWindow(type)
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
      <td><code><var>type</var></code></td>
      <td>string</td>
      <td>Set to 'tab' if the newly created window shares an OS-level window with the current browsing context, or 'window' otherwise.</td>
    </tr>
  </tbody>
</table>

##### Example

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L134-L136
```

##### Returns

- **&lt;Object&gt;**
            **<code><var>window</var></code>:** New window object containing 'handle' with the value of the handle and 'type' with the value of the created window type


---

## getWindowHandles
Get Window Handles கட்டளை ஒவ்வொரு திறந்த மேல்-நிலை உலாவல் சூழலுக்கும் சாளர கைப்பிடிகளின் பட்டியலைத் திரும்பத் தருகிறது. சாளர கைப்பிடிகள் திரும்பத் தரப்படும் வரிசை விருப்பமானது.<br /><br />WebDriver Protocol கட்டளை. கூடுதல் விவரங்கள் [அதிகாரப்பூர்வ நெறிமுறை ஆவணங்களில்](https://w3c.github.io/webdriver/#dfn-get-window-handles) காணலாம்.

##### Usage

```js
browser.getWindowHandles()
```

##### Example

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L140-L143
```

##### Returns

- **&lt;String[]&gt;**
            **<code><var>handles</var></code>:** An array which is a list of window handles.


---

## printPage
Print Page கட்டளை ஆவணத்தை ஒரு பக்கமாக்கப்பட்ட PDF ஆவணமாக பண்டரிங் செய்கிறது. __குறிப்பு:__ Chrome தற்போது இதை [தலையில்லாத பயன்முறையில்](https://webdriver.io/docs/capabilities/#run-browser-headless) மட்டுமே ஆதரிக்கிறது, [`crbug753118`](https://bugs.chromium.org/p/chromium/issues/detail?id=753118)) ஐப் பார்க்கவும்).<br /><br />WebDriver Protocol கட்டளை. கூடுதல் விவரங்கள் [அதிகாரப்பூர்வ நெறிமுறை ஆவணங்களில்](https://w3c.github.io/webdriver/#print-page) காணலாம்.

##### Usage

```js
browser.printPage(orientation, scale, background, width, height, top, bottom, left, right, shrinkToFit, pageRanges)
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
      <td><code><var>orientation</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>string</td>
      <td>page orientation. Default: `portrait`</td>
    </tr>
    <tr>
      <td><code><var>scale</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>number</td>
      <td>page scale. Default: `1`</td>
    </tr>
    <tr>
      <td><code><var>background</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>boolean</td>
      <td>page background. Default: `false`</td>
    </tr>
    <tr>
      <td><code><var>width</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>number</td>
      <td>page width in cm. Default: `21.59` from page</td>
    </tr>
    <tr>
      <td><code><var>height</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>number</td>
      <td>page height in cm. Default: `27.94` from page</td>
    </tr>
    <tr>
      <td><code><var>top</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>number</td>
      <td>page margin in cm from top margin. Default: `1`</td>
    </tr>
    <tr>
      <td><code><var>bottom</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>number</td>
      <td>page margin in cm from bottom margin. Default: `1`</td>
    </tr>
    <tr>
      <td><code><var>left</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>number</td>
      <td>page margin in cm from left margin. Default: `1`</td>
    </tr>
    <tr>
      <td><code><var>right</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>number</td>
      <td>page margin in cm from right margin. Default: `1`</td>
    </tr>
    <tr>
      <td><code><var>shrinkToFit</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>boolean</td>
      <td>shrink pdf to fit in page. Default: `true`</td>
    </tr>
    <tr>
      <td><code><var>pageRanges</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>object[]</td>
      <td>page ranges. Default `[]`</td>
    </tr>
  </tbody>
</table>

##### Example

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L150-L151
```

##### Returns

- **&lt;string&gt;**
            **<code><var>pdf</var></code>:** The base64-encoded PDF representation of the paginated document.


---

## switchToFrame
Switch To Frame கட்டளை தற்போதைய உயர்நிலை உலாவல் சூழலைத் தேர்ந்தெடுக்கவோ அல்லது தற்போதைய உலாவல் சூழலின் ஒரு குழந்தை உலாவல் சூழலைத் தேர்ந்தெடுக்கவோ பயன்படுகிறது, அடுத்தடுத்த கட்டளைகளுக்கான தற்போதைய உலாவல் சூழலாகப் பயன்படுத்தப்படுகிறது.<br /><br />WebDriver Protocol கட்டளை. கூடுதல் விவரங்கள் [அதிகாரப்பூர்வ நெறிமுறை ஆவணங்களில்](https://w3c.github.io/webdriver/#dfn-switch-to-frame) காணலாம்.
:::caution

இந்த நெறிமுறை கட்டளை காலாவதியானது<br />இந்த கட்டளை காலாவதியானது, மேலும் ஃபிரேம்களுக்குச் செல்வதற்கு அதற்குப் பதிலாக `switchFrame` பயன்படுத்த அனைவரையும் ஊக்குவிக்கிறோம். இந்த கட்டளை பற்றி மேலும் படிக்க https://webdriver.io/docs/api/browser/switchFrame ஐப் பார்க்கவும்.
:::

##### Usage

```js
browser.switchToFrame(id)
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
      <td><code><var>id</var></code></td>
      <td>number, object, null</td>
      <td>one of three possible types: null: this represents the top-level browsing context (i.e., not an iframe), a Number, representing the index of the window object corresponding to a frame, an Element object received using `findElement`.</td>
    </tr>
  </tbody>
</table>

##### Example

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L155-L168
```




---

## switchToParentFrame
Switch to Parent Frame கட்டளை தற்போதைய உலாவல் சூழலின் பெற்றோருக்கு எதிர்கால கட்டளைகளுக்கான தற்போதைய உலாவல் சூழலை அமைக்கிறது.<br /><br />WebDriver Protocol கட்டளை. கூடுதல் விவரங்கள் [அதிகாரப்பூர்வ நெறிமுறை ஆவணங்களில்](https://w3c.github.io/webdriver/#dfn-switch-to-parent-frame) காணலாம்.

##### Usage

```js
browser.switchToParentFrame()
```

##### Example

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L172-L189
```




---

## getWindowRect
Get Window Rect கட்டளை தற்போதைய உயர்நிலை உலாவுதல் சூழலுக்கு இணையான இயக்க முறைமை சாளரத்தின் அளவு மற்றும் திரையில் நிலையைத் திரும்பத் தருகிறது.<br /><br />WebDriver Protocol கட்டளை. கூடுதல் விவரங்கள் [அதிகாரப்பூர்வ நெறிமுறை ஆவணங்களில்](https://w3c.github.io/webdriver/#dfn-get-window-rect) காணலாம்.

:::info

இந்த நெறிமுறை கட்டளை பின்வரும் வசதியான முறையில் உள்ளிணைக்கப்பட்டுள்ளது: [getWindowSize](/docs/api/browser/getWindowSize). இதற்கு பதிலாக இந்த கட்டளையைப் பயன்படுத்த பரிந்துரைக்கப்படுகிறது.

:::


##### Usage

```js
browser.getWindowRect()
```

##### Example

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L193-L196
```

##### Returns

- **&lt;Object&gt;**
            **<code><var>windowRect</var></code>:** A JSON representation of a "window rect" object. This has 4 properties: `x`, `y`, `width` and `height`.


---

## setWindowRect
Set Window Rect கட்டளை தற்போதைய உயர்நிலை உலாவுதல் சூழலுக்கு இணையான இயக்க முறைமை சாளரத்தின் அளவு மற்றும் நிலையை மாற்றுகிறது.<br /><br />WebDriver Protocol கட்டளை. கூடுதல் விவரங்கள் [அதிகாரப்பூர்வ நெறிமுறை ஆவணங்களில்](https://w3c.github.io/webdriver/#dfn-set-window-rect) காணலாம்.

:::info

இந்த நெறிமுறை கட்டளை பின்வரும் வசதியான முறையில் உள்ளிணைக்கப்பட்டுள்ளது: [setWindowSize](/docs/api/browser/setWindowSize). இதற்கு பதிலாக இந்த கட்டளையைப் பயன்படுத்த பரிந்துரைக்கப்படுகிறது.

:::


##### Usage

```js
browser.setWindowRect(x, y, width, height)
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
      <td><code><var>x</var></code></td>
      <td>number, null</td>
      <td>the screenX attribute of the window object</td>
    </tr>
    <tr>
      <td><code><var>y</var></code></td>
      <td>number, null</td>
      <td>the screenY attribute of the window object</td>
    </tr>
    <tr>
      <td><code><var>width</var></code></td>
      <td>number, null</td>
      <td>the width of the outer dimensions of the top-level browsing context, including browser chrome etc...</td>
    </tr>
    <tr>
      <td><code><var>height</var></code></td>
      <td>number, null</td>
      <td>the height of the outer dimensions of the top-level browsing context, including browser chrome etc...</td>
    </tr>
  </tbody>
</table>

##### Example

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L200-L204
```

##### Returns

- **&lt;Object&gt;**
            **<code><var>windowRect</var></code>:** A JSON representation of a "window rect" object based on the new window state.


---

## maximizeWindow
Maximize Window கட்டளை தற்போதைய உயர்நிலை உலாவுதல் சூழலைக் கொண்ட சாளரத்தில் சாளர மேலாளர்-குறிப்பிட்ட "பெரிதாக்கு" செயல்பாட்டை, ஏதேனும் இருந்தால், அழைக்கிறது. இது பொதுவாக முழு திரையாகாமல் சாளரத்தை அதிகபட்ச அளவிற்கு அதிகரிக்கிறது.<br /><br />WebDriver Protocol கட்டளை. கூடுதல் விவரங்கள் [அதிகாரப்பூர்வ நெறிமுறை ஆவணங்களில்](https://w3c.github.io/webdriver/#dfn-maximize-window) காணலாம்.

##### Usage

```js
browser.maximizeWindow()
```

##### Example

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L208-L212
```

##### Returns

- **&lt;Object&gt;**
            **<code><var>windowRect</var></code>:** A JSON representation of a "window rect" object based on the new window state.


---

## minimizeWindow
Minimize Window கட்டளை தற்போதைய உயர்நிலை உலாவுதல் சூழலைக் கொண்ட சாளரத்தில் சாளர மேலாளர்-குறிப்பிட்ட "குறைக்க" செயல்பாட்டை, ஏதேனும் இருந்தால், அழைக்கிறது. இது பொதுவாக கணினி தட்டில் சாளரத்தை மறைக்கிறது.<br /><br />WebDriver Protocol கட்டளை. கூடுதல் விவரங்கள் [அதிகாரப்பூர்வ நெறிமுறை ஆவணங்களில்](https://w3c.github.io/webdriver/#dfn-minimize-window) காணலாம்.

##### Usage

```js
browser.minimizeWindow()
```


##### Returns

- **&lt;Object&gt;**
            **<code><var>windowRect</var></code>:** A JSON representation of a "window rect" object of the (new) current top-level browsing context.


---

## fullscreenWindow
Fullscreen Window கட்டளை தற்போதைய உயர்நிலை உலாவுதல் சூழலைக் கொண்ட சாளரத்தில் சாளர மேலாளர்-குறிப்பிட்ட "முழு திரை" செயல்பாட்டை, ஏதேனும் இருந்தால், அழைக்கிறது. இது பொதுவாக சாளரத்தை உடல் காட்சியின் அளவிற்கு அதிகரிக்கிறது மற்றும் கருவிப்பட்டைகள் போன்ற உலாவி chrome கூறுகளை மறைக்கலாம்.<br /><br />WebDriver Protocol கட்டளை. கூடுதல் விவரங்கள் [அதிகாரப்பூர்வ நெறிமுறை ஆவணங்களில்](https://w3c.github.io/webdriver/#dfn-fullscreen-window) காணலாம்.

##### Usage

```js
browser.fullscreenWindow()
```


##### Returns

- **&lt;Object&gt;**
            **<code><var>windowRect</var></code>:** A JSON representation of a "window rect" object of the (new) current top-level browsing context.


---

## findElement
Find Element கட்டளை எதிர்கால கட்டளைகளுக்குப் பயன்படுத்தக்கூடிய தற்போதைய உலாவுதல் சூழலில் ஒரு கூறைக் கண்டுபிடிக்கப் பயன்படுகிறது. இந்த கட்டளை JSON வடிவில் கூறுகளை வழங்குகிறது, இதை $ கட்டளைக்கு அனுப்பி பிரதிநிதித்துவத்தை விரிவான WebdriverIO உறுப்பாக மாற்றலாம்.<br /><br />WebDriver Protocol கட்டளை. கூடுதல் விவரங்கள் [அதிகாரப்பூர்வ நெறிமுறை ஆவணங்களில்](https://w3c.github.io/webdriver/#dfn-find-element) காணலாம்.

:::info

இந்த நெறிமுறை கட்டளை பின்வரும் வசதியான முறையில் உள்ளிணைக்கப்பட்டுள்ளது: [$](/docs/api/browser/$). இதற்கு பதிலாக இந்த கட்டளையைப் பயன்படுத்த பரிந்துரைக்கப்படுகிறது.

:::


##### Usage

```js
browser.findElement(using, value)
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
      <td><code><var>using</var></code></td>
      <td>string</td>
      <td>a valid element location strategy</td>
    </tr>
    <tr>
      <td><code><var>value</var></code></td>
      <td>string</td>
      <td>the actual selector that will be used to find an element</td>
    </tr>
  </tbody>
</table>

##### Example

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L226-L232
```

##### Returns

- **&lt;object&gt;**
            **<code><var>element</var></code>:** A JSON representation of an element object, e.g. `{ 'element-6066-11e4-a52e-4f735466cecf': 'ELEMENT_1' }`.


---

## findElementFromShadowRoot
Find Element From Shadow Root கட்டளை எதிர்கால கட்டளைகளுக்குப் பயன்படுத்தக்கூடிய ஒரு உறுப்பின் நிழல் மூலத்திற்குள் ஒரு உறுப்பைக் கண்டுபிடிக்கப் பயன்படுகிறது. இந்த கட்டளை JSON வடிவில் கூறுகளை வழங்குகிறது, இதை $ கட்டளைக்கு அனுப்பி பிரதிநிதித்துவத்தை விரிவான WebdriverIO உறுப்பாக மாற்றலாம்.<br /><br />WebDriver Protocol கட்டளை. கூடுதல் விவரங்கள் [அதிகாரப்பூர்வ நெறிமுறை ஆவணங்களில்](https://w3c.github.io/webdriver/#find-element-from-shadow-root) காணலாம்.

:::info

இந்த நெறிமுறை கட்டளை பின்வரும் வசதியான முறையில் உள்ளிணைக்கப்பட்டுள்ளது: [shadow$](/docs/api/element/shadow$). இதற்கு பதிலாக இந்த கட்டளையைப் பயன்படுத்த பரிந்துரைக்கப்படுகிறது.

:::


##### Usage

```js
browser.findElementFromShadowRoot(shadowId, using, value)
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
      <td><code><var>shadowId</var></code></td>
      <td>String</td>
      <td>element id of a shadow root element</td>
    </tr>
    <tr>
      <td><code><var>using</var></code></td>
      <td>string</td>
      <td>a valid element location strategy</td>
    </tr>
    <tr>
      <td><code><var>value</var></code></td>
      <td>string</td>
      <td>the actual selector that will be used to find an element</td>
    </tr>
  </tbody>
</table>

##### Example

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L236-L248
```

##### Returns

- **&lt;object&gt;**
            **<code><var>element</var></code>:** A JSON representation of an element shadow object, e.g. `{ 'element-6066-11e4-a52e-4f735466cecf': 'ELEMENT_1' }`.


---

## findElements
Find Elements கட்டளை எதிர்கால கட்டளைகளுக்குப் பயன்படுத்தக்கூடிய தற்போதைய உலாவுதல் சூழலில் உறுப்புகளைக் கண்டுபிடிக்கப் பயன்படுகிறது. இந்த கட்டளை JSON வடிவில் கூறுகளின் வரிசையில் வழங்குகிறது, இதை $ கட்டளைக்கு அனுப்பி பிரதிநிதித்துவத்தை விரிவான WebdriverIO உறுப்பாக மாற்றலாம் (findElement ஐப் பார்க்கவும்).<br /><br />WebDriver Protocol கட்டளை. கூடுதல் விவரங்கள் [அதிகாரப்பூர்வ நெறிமுறை ஆவணங்களில்](https://w3c.github.io/webdriver/#dfn-find-elements) காணலாம்.

:::info

இந்த நெறிமுறை கட்டளை பின்வரும் வசதியான முறையில் உள்ளிணைக்கப்பட்டுள்ளது: [$$](/docs/api/browser/$$). இதற்கு பதிலாக இந்த கட்டளையைப் பயன்படுத்த பரிந்துரைக்கப்படுகிறது.

:::


##### Usage

```js
browser.findElements(using, value)
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
      <td><code><var>using</var></code></td>
      <td>string</td>
      <td>a valid element location strategy</td>
    </tr>
    <tr>
      <td><code><var>value</var></code></td>
      <td>string</td>
      <td>the actual selector that will be used to find an element</td>
    </tr>
  </tbody>
</table>

##### Example

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L252-L254
```

##### Returns

- **&lt;object[]&gt;**
            **<code><var>elements</var></code>:** A (possibly empty) JSON list of representations of an element object, e.g. `[{ 'element-6066-11e4-a52e-4f735466cecf': 'ELEMENT_1' }]`.


---

## findElementsFromShadowRoot
Find Elements கட்டளை எதிர்கால கட்டளைகளுக்குப் பயன்படுத்தக்கூடிய ஒரு உறுப்பின் நிழல் மூலத்திற்குள் உறுப்புகளைக் கண்டுபிடிக்கப் பயன்படுகிறது. இந்த கட்டளை JSON வடிவில் கூறுகளின் வரிசையில் வழங்குகிறது, இதை $ கட்டளைக்கு அனுப்பி பிரதிநிதித்துவத்தை விரிவான WebdriverIO உறுப்பாக மாற்றலாம் (findElement ஐப் பார்க்கவும்).<br /><br />WebDriver Protocol கட்டளை. கூடுதல் விவரங்கள் [அதிகாரப்பூர்வ நெறிமுறை ஆவணங்களில்](https://w3c.github.io/webdriver/#find-elements-from-shadow-root) காணலாம்.

:::info

இந்த நெறிமுறை கட்டளை பின்வரும் வசதியான முறையில் உள்ளிணைக்கப்பட்டுள்ளது: [shadow$$](/docs/api/element/shadow$$). இதற்கு பதிலாக இந்த கட்டளையைப் பயன்படுத்த பரிந்துரைக்கப்படுகிறது.

:::


##### Usage

```js
browser.findElementsFromShadowRoot(shadowId, using, value)
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
      <td><code><var>shadowId</var></code></td>
      <td>String</td>
      <td>element id of a shadow root element</td>
    </tr>
    <tr>
      <td><code><var>using</var></code></td>
      <td>string</td>
      <td>a valid element location strategy</td>
    </tr>
    <tr>
      <td><code><var>value</var></code></td>
      <td>string</td>
      <td>the actual selector that will be used to find an element</td>
    </tr>
  </tbody>
</table>

##### Example

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L258-L268
```

##### Returns

- **&lt;object[]&gt;**
            **<code><var>elements</var></code>:** A (possibly empty) JSON list of representations of an element object, e.g. `{ 'element-6066-11e4-a52e-4f735466cecf': 'ELEMENT_1' }`.


---

## findElementFromElement
Find Element From Element கட்டளை எதிர்கால கட்டளைகளுக்குப் பயன்படுத்தக்கூடிய தற்போதைய உலாவல் சூழலில் உள்ள வலை உறுப்பில் இருந்து ஒரு உறுப்பைக் கண்டுபிடிக்கப் பயன்படுகிறது. இந்த கட்டளை JSON வடிவில் கூறுகளின் வழங்குகிறது, இதை $ கட்டளைக்கு அனுப்பி பிரதிநிதித்துவத்தை விரிவான WebdriverIO உறுப்பாக மாற்றலாம் (findElement ஐப் பார்க்கவும்).<br /><br />WebDriver Protocol கட்டளை. கூடுதல் விவரங்கள் [அதிகாரப்பூர்வ நெறிமுறை ஆவணங்களில்](https://w3c.github.io/webdriver/#dfn-find-element-from-element) காணலாம்.

:::info

இந்த நெறிமுறை கட்டளை பின்வரும் வசதியான முறையில் உள்ளிணைக்கப்பட்டுள்ளது: [$](/docs/api/element/$). இதற்கு பதிலாக இந்த கட்டளையைப் பயன்படுத்த பரிந்துரைக்கப்படுகிறது.

:::


##### Usage

```js
browser.findElementFromElement(elementId, using, value)
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
      <td><code><var>elementId</var></code></td>
      <td>String</td>
      <td>the id of an element returned in a previous call to Find Element(s)</td>
    </tr>
    <tr>
      <td><code><var>using</var></code></td>
      <td>string</td>
      <td>a valid element location strategy</td>
    </tr>
    <tr>
      <td><code><var>value</var></code></td>
      <td>string</td>
      <td>the actual selector that will be used to find an element</td>
    </tr>
  </tbody>
</table>

##### Example

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L272-L279
```

##### Returns

- **&lt;object&gt;**
            **<code><var>element</var></code>:** A JSON representation of an element object, e.g. `{ 'element-6066-11e4-a52e-4f735466cecf': 'ELEMENT_1' }`.


---

## findElementsFromElement
Find Elements From Element கட்டளை எதிர்கால கட்டளைகளுக்குப் பயன்படுத்தக்கூடிய தற்போதைய உலாவல் சூழலில் உள்ள வலை உறுப்பில் இருந்து உறுப்புகளைக் கண்டுபிடிக்கப் பயன்படுகிறது. இந்த கட்டளை JSON வடிவில் கூறுகளின் வரிசையில் வழங்குகிறது, இதை $ கட்டளைக்கு அனுப்பி பிரதிநிதித்துவத்தை விரிவான WebdriverIO உறுப்பாக மாற்றலாம் (findElement ஐப் பார்க்கவும்).<br /><br />WebDriver Protocol கட்டளை. கூடுதல் விவரங்கள் [அதிகாரப்பூர்வ நெறிமுறை ஆவணங்களில்](https://w3c.github.io/webdriver/#dfn-find-elements-from-element) காணலாம்.

:::info

இந்த நெறிமுறை கட்டளை பின்வரும் வசதியான முறையில் உள்ளிணைக்கப்பட்டுள்ளது: [$$](/docs/api/element/$$). இதற்கு பதிலாக இந்த கட்டளையைப் பயன்படுத்த பரிந்துரைக்கப்படுகிறது.

:::


##### Usage

```js
browser.findElementsFromElement(elementId, using, value)
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
      <td><code><var>elementId</var></code></td>
      <td>String</td>
      <td>the id of an element returned in a previous call to Find Element(s)</td>
    </tr>
    <tr>
      <td><code><var>using</var></code></td>
      <td>string</td>
      <td>a valid element location strategy</td>
    </tr>
    <tr>
      <td><code><var>value</var></code></td>
      <td>string</td>
      <td>the actual selector that will be used to find an element</td>
    </tr>
  </tbody>
</table>

##### Example

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L283-L290
```

##### Returns

- **&lt;object[]&gt;**
            **<code><var>elements</var></code>:** A (possibly empty) JSON list of representations of an element object, e.g. `[{ 'element-6066-11e4-a52e-4f735466cecf': 'ELEMENT_1' }]`.


---

## getElementShadowRoot
ஒரு உறுப்பின் நிழல் மூல பொருளைப் பெறவும். முடிவு பொருளை findElementFromShadowRoots அல்லது findElementsFromShadowRoots போன்றவற்றைப் பயன்படுத்தி இந்த நிழல் மூலத்திற்குள் உறுப்புகளை எடுக்கப் பயன்படுத்தலாம்.<br /><br />WebDriver Protocol கட்டளை. கூடுதல் விவரங்கள் [அதிகாரப்பூர்வ நெறிமுறை ஆவணங்களில்](https://w3c.github.io/webdriver/#dfn-get-active-element) காணலாம்.

:::info

இந்த நெறிமுறை கட்டளை பின்வரும் வசதியான முறையில் உள்ளிணைக்கப்பட்டுள்ளது: [shadow$](/docs/api/element/shadow$). இதற்கு பதிலாக இந்த கட்டளையைப் பயன்படுத்த பரிந்துரைக்கப்படுகிறது.

:::


##### Usage

```js
browser.getElementShadowRoot(elementId)
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
      <td><code><var>elementId</var></code></td>
      <td>String</td>
      <td>the id of an element returned in a previous call to Find Element(s)</td>
    </tr>
  </tbody>
</table>

##### Example

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L294-L305
```

##### Returns

- **&lt;string&gt;**
            **<code><var>shadowRoot</var></code>:** A JSON representation of an element shadow root, e.g. `{ 'shadow-6066-11e4-a52e-4f735466cecf': 'ELEMENT_1' }`.


---

## getActiveElement
Get Active Element தற்போதைய உலாவல் சூழலின் ஆவண உறுப்பின் செயலில் உள்ள உறுப்பைத் திரும்பத் தருகிறது. இந்த கட்டளை JSON வடிவில் கூறுகளின் வழங்குகிறது, இதை $ கட்டளைக்கு அனுப்பி பிரதிநிதித்துவத்தை விரிவான WebdriverIO உறுப்பாக மாற்றலாம் (findElement ஐப் பார்க்கவும்).<br /><br />WebDriver Protocol கட்டளை. கூடுதல் விவரங்கள் [அதிகாரப்பூர்வ நெறிமுறை ஆவணங்களில்](https://w3c.github.io/webdriver/#dfn-get-active-element) காணலாம்.

##### Usage

```js
browser.getActiveElement()
```

##### Example

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L309-L316
```

##### Returns

- **&lt;string&gt;**
            **<code><var>element</var></code>:** A JSON representation of an element object, e.g. `{ 'element-6066-11e4-a52e-4f735466cecf': 'ELEMENT_1' }`.


---

## isElementSelected
Is Element Selected குறிக்கப்பட்ட உறுப்பு தேர்ந்தெடுக்கப்பட்டுள்ளதா இல்லையா என்பதைத் தீர்மானிக்கிறது. இந்த செயல்பாடு சரிபார்ப்புப் பெட்டி மற்றும் ரேடியோ பொத்தான் நிலைகளின் உள்ளீட்டு உறுப்புகள் அல்லது விருப்ப உறுப்புகளில் மட்டுமே பொருள்படும்.<br /><br />WebDriver Protocol கட்டளை. கூடுதல் விவரங்கள் [அதிகாரப்பூர்வ நெறிமுறை ஆவணங்களில்](https://w3c.github.io/webdriver/#dfn-is-element-selected) காணலாம்.

:::info

இந்த நெறிமுறை கட்டளை பின்வரும் வசதியான முறையில் உள்ளிணைக்கப்பட்டுள்ளது: [isSelected](/docs/api/element/isSelected). இதற்கு பதிலாக இந்த கட்டளையைப் பயன்படுத்த பரிந்துரைக்கப்படுகிறது.

:::


##### Usage

```js
browser.isElementSelected(elementId)
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
      <td><code><var>elementId</var></code></td>
      <td>String</td>
      <td>the id of an element returned in a previous call to Find Element(s)</td>
    </tr>
  </tbody>
</table>

##### Example

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L322-L325
```

##### Returns

- **&lt;Boolean&gt;**
            **<code><var>isSelected</var></code>:** `true` or `false` based on the selected state.


---

## isElementDisplayed
Is Element Displayed மனித கண்ணால் உணரக்கூடிய காட்சியின் அடிப்படையில் ஒரு உறுப்பின் தெரிவுநிலையைத் தீர்மானிக்கிறது. இந்த சூழலில், ஒரு உறுப்பின் காட்சிப்படுத்தல் `visibility` அல்லது `display` பாணி பண்புகளுடன் தொடர்புடையதல்ல.<br /><br />WebDriver Protocol கட்டளை. கூடுதல் விவரங்கள் [அதிகாரப்பூர்வ நெறிமுறை ஆவணங்களில்](https://w3c.github.io/webdriver/#element-displayedness) காணலாம்.

:::info

இந்த நெறிமுறை கட்டளை பின்வரும் வசதியான முறையில் உள்ளிணைக்கப்பட்டுள்ளது: [isDisplayed](/docs/api/element/isDisplayed). இதற்கு பதிலாக இந்த கட்டளையைப் பயன்படுத்த பரிந்துரைக்கப்படுகிறது.

:::


##### Usage

```js
browser.isElementDisplayed(elementId)
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
      <td><code><var>elementId</var></code></td>
      <td>String</td>
      <td>the id of an element returned in a previous call to Find Element(s)</td>
    </tr>
  </tbody>
</table>

##### Example

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L331-L333
```

##### Returns

- **&lt;Boolean&gt;**
            **<code><var>isDisplayed</var></code>:** `true` or `false` based on the visible state.


---

## getElementAttribute
Get Element Attribute கட்டளை ஒரு வலை உறுப்பின் பண்புகரணியை வழங்கும்.<br /><br />WebDriver Protocol கட்டளை. கூடுதல் விவரங்கள் [அதிகாரப்பூர்வ நெறிமுறை ஆவணங்களில்](https://w3c.github.io/webdriver/#dfn-get-element-attribute) காணலாம்.

:::info

இந்த நெறிமுறை கட்டளை பின்வரும் வசதியான முறையில் உள்ளிணைக்கப்பட்டுள்ளது: [getAttribute](/docs/api/element/getAttribute). இதற்கு பதிலாக இந்த கட்டளையைப் பயன்படுத்த பரிந்துரைக்கப்படுகிறது.

:::


##### Usage

```js
browser.getElementAttribute(elementId, name)
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
      <td><code><var>elementId</var></code></td>
      <td>String</td>
      <td>the id of an element returned in a previous call to Find Element(s)</td>
    </tr>
    <tr>
      <td><code><var>name</var></code></td>
      <td>String</td>
      <td>name of the attribute value to retrieve</td>
    </tr>
  </tbody>
</table>

##### Example

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L339-L341
```

##### Returns

- **&lt;string&gt;**
            **<code><var>attribute</var></code>:** The named attribute of the element.


---

## getElementProperty
Get Element Property கட்டளை ஒரு உறுப்பின் பண்பைப் பெறுவதன் முடிவைத் திரும்பத் தரும்.<br /><br />WebDriver Protocol கட்டளை. கூடுதல் விவரங்கள் [அதிகாரப்பூர்வ நெறிமுறை ஆவணங்களில்](https://w3c.github.io/webdriver/#dfn-get-element-property) காணலாம்.

:::info

இந்த நெறிமுறை கட்டளை பின்வரும் வசதியான முறையில் உள்ளிணைக்கப்பட்டுள்ளது: [getProperty](/docs/api/element/getProperty). இதற்கு பதிலாக இந்த கட்டளையைப் பயன்படுத்த பரிந்துரைக்கப்படுகிறது.

:::


##### Usage

```js
browser.getElementProperty(elementId, name)
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
      <td><code><var>elementId</var></code></td>
      <td>String</td>
      <td>the id of an element returned in a previous call to Find Element(s)</td>
    </tr>
    <tr>
      <td><code><var>name</var></code></td>
      <td>String</td>
      <td>name of the attribute property to retrieve</td>
    </tr>
  </tbody>
</table>

##### Example

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L347-L349
```

##### Returns

- **&lt;string&gt;**
            **<code><var>property</var></code>:** The named property of the element, accessed by calling GetOwnProperty on the element object.


---

## getElementCSSValue
Get Element CSS Value கட்டளை கொடுக்கப்பட்ட வலை கூறுப்பின் கொடுக்கப்பட்ட CSS பண்பின் கணக்கிடப்பட்ட மதிப்பைப் பெறுகிறது.<br /><br />WebDriver Protocol கட்டளை. கூடுதல் விவரங்கள் [அதிகாரப்பூர்வ நெறிமுறை ஆவணங்களில்](https://w3c.github.io/webdriver/#dfn-get-element-css-value) காணலாம்.

:::info

இந்த நெறிமுறை கட்டளை பின்வரும் வசதியான முறையில் உள்ளிணைக்கப்பட்டுள்ளது: [getCSSProperty](/docs/api/element/getCSSProperty). இதற்கு பதிலாக இந்த கட்டளையைப் பயன்படுத்த பரிந்துரைக்கப்படுகிறது.

:::


##### Usage

```js
browser.getElementCSSValue(elementId, propertyName)
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
      <td><code><var>elementId</var></code></td>
      <td>String</td>
      <td>the id of an element returned in a previous call to Find Element(s)</td>
    </tr>
    <tr>
      <td><code><var>propertyName</var></code></td>
      <td>String</td>
      <td>name of the CSS property to retrieve</td>
    </tr>
  </tbody>
</table>

##### Example

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L355-L357
```

##### Returns

- **&lt;string&gt;**
            **<code><var>cssValue</var></code>:** The computed value of the parameter corresponding to property name from the element's style declarations (unless the document type is xml, in which case the return value is simply the empty string).


---

## getElementText
Get Element Text கட்டளை ஒரு கூறுப்பின் உரையை "காட்சியாக்கியபடி" திரும்பத் தர நோக்கம் கொண்டுள்ளது. ஒரு உறுப்பின் காட்சியாக்கப்பட்ட உரை, அவற்றின் இணைப்பு உரை மற்றும் பகுதி இணைப்பு உரை மூலம் உறுப்புகளைக் கண்டறிவதற்கும் பயன்படுத்தப்படுகிறது.<br /><br />WebDriver Protocol கட்டளை. கூடுதல் விவரங்கள் [அதிகாரப்பூர்வ நெறிமுறை ஆவணங்களில்](https://w3c.github.io/webdriver/#dfn-get-element-text) காணலாம்.

##### Usage

```js
browser.getElementText(elementId)
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
      <td><code><var>elementId</var></code></td>
      <td>String</td>
      <td>the id of an element returned in a previous call to Find Element(s)</td>
    </tr>
  </tbody>
</table>

##### Example

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L363-L365
```

##### Returns

- **&lt;string&gt;**
            **<code><var>text</var></code>:** The visible text of the element (including child elements), following the algorithm defined in the Selenium Atoms for [`bot.dom.getVisibleText`](https://github.com/SeleniumHQ/selenium/blob/e09e28f016c9f53196cf68d6f71991c5af4a35d4/javascript/atoms/dom.js#L981).


---

## getElementTagName
Get Element Tag Name கட்டளை கொடுக்கப்பட்ட வலை உறுப்பின் தகுதிபெற்ற உறுப்பு பெயரைத் திரும்பத் தருகிறது.<br /><br />WebDriver Protocol கட்டளை. கூடுதல் விவரங்கள் [அதிகாரப்பூர்வ நெறிமுறை ஆவணங்களில்](https://w3c.github.io/webdriver/#dfn-get-element-tag-name) காணலாம்.

:::info

இந்த நெறிமுறை கட்டளை பின்வரும் வசதியான முறையில் உள்ளிணைக்கப்பட்டுள்ளது: [getTagName](/docs/api/element/getTagName). இதற்கு பதிலாக இந்த கட்டளையைப் பயன்படுத்த பரிந்துரைக்கப்படுகிறது.

:::


##### Usage

```js
browser.getElementTagName(elementId)
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
      <td><code><var>elementId</var></code></td>
      <td>String</td>
      <td>the id of an element returned in a previous call to Find Element(s)</td>
    </tr>
  </tbody>
</table>

##### Example

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L371-L373
```

##### Returns

- **&lt;string&gt;**
            **<code><var>text</var></code>:** The tagName attribute of the element.


---

## getElementRect
Get Element Rect கட்டளை கொடுக்கப்பட்ட வலை உறுப்பின் பரிமாணங்கள் மற்றும் ஒருங்கிணைப்புகளைத் திரும்பத் தருகிறது.<br /><br />WebDriver Protocol கட்டளை. கூடுதல் விவரங்கள் [அதிகாரப்பூர்வ நெறிமுறை ஆவணங்களில்](https://w3c.github.io/webdriver/#dfn-get-element-rect) காணலாம்.

:::info

இந்த நெறிமுறை கட்டளை பின்வரும் வசதியான முறைகளில் உள்ளிணைக்கப்பட்டுள்ளது: [getSize](/docs/api/element/getSize), [getLocation](/docs/api/element/getLocation). இந்த கட்டளைகளைப் பயன்படுத்த பரிந்துரைக்கப்படுகிறது.

:::


##### Usage

```js
browser.getElementRect(elementId)
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
      <td><code><var>elementId</var></code></td>
      <td>String</td>
      <td>the id of an element returned in a previous call to Find Element(s)</td>
    </tr>
  </tbody>
</table>

##### Example

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L379-L381
```

##### Returns

- **&lt;Object&gt;**
            **<code><var>elementRect</var></code>:** A JSON object representing the position and bounding rect of the element.


---

## isElementEnabled
Is Element Enabled குறிப்பிடப்பட்ட உறுப்பு செயல்படுத்தப்பட்டுள்ளதா அல்லது இல்லையா என்பதைத் தீர்மானிக்கிறது. இந்த செயல்பாடு படிவக் கட்டுப்பாடுகளில் மட்டுமே பொருள்படும்.<br /><br />WebDriver Protocol கட்டளை. கூடுதல் விவரங்கள் [அதிகாரப்பூர்வ நெறிமுறை ஆவணங்களில்](https://w3c.github.io/webdriver/#dfn-is-element-enabled) காணலாம்.

:::info

இந்த நெறிமுறை கட்டளை பின்வரும் வசதியான முறையில் உள்ளிணைக்கப்பட்டுள்ளது: [isEnabled](/docs/api/element/isEnabled). இதற்கு பதிலாக இந்த கட்டளையைப் பயன்படுத்த பரிந்துரைக்கப்படுகிறது.

:::


##### Usage

```js
browser.isElementEnabled(elementId)
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
      <td><code><var>elementId</var></code></td>
      <td>String</td>
      <td>the id of an element returned in a previous call to Find Element(s)</td>
    </tr>
  </tbody>
</table>

##### Example

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L387-L390
```

##### Returns

- **&lt;Boolean&gt;**
            **<code><var>isEnabled</var></code>:** If the element is in an xml document, or is a disabled form control: `false`, otherwise, `true`.


---

## elementClick
Element Click கட்டளை உறுப்பு ஏற்கனவே சுட்டிக்காட்டி தொடரக்கூடியதாக இல்லாவிட்டால், உறுப்பைப் பார்வையில் உருட்டி, அதன் இன்-வியூ மைய புள்ளியைக் கிளிக் செய்கிறது. உறுப்பின் மைய புள்ளி மற்றொரு உறுப்பால் மறைக்கப்பட்டிருந்தால், ஒரு உறுப்பு கிளிக் இடைமறிக்கப்பட்ட பிழை திரும்பத் தரப்படும். உறுப்பு பார்வைப்புலத்திற்கு வெளியே இருந்தால், உறுப்பு தொடரமுடியாத பிழை திரும்பத் தரப்படும்.<br /><br />WebDriver Protocol கட்டளை. கூடுதல் விவரங்கள் [அதிகாரப்பூர்வ நெறிமுறை ஆவணங்களில்](https://w3c.github.io/webdriver/#dfn-element-click) காணலாம்.

:::info

இந்த நெறிமுறை கட்டளை பின்வரும் வசதியான முறையில் உள்ளிணைக்கப்பட்டுள்ளது: [click](/docs/api/element/click). இதற்கு பதிலாக இந்த கட்டளையைப் பயன்படுத்த பரிந்துரைக்கப்படுகிறது.

:::


##### Usage

```js
browser.elementClick(elementId)
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
      <td><code><var>elementId</var></code></td>
      <td>String</td>
      <td>the id of an element returned in a previous call to Find Element(s)</td>
    </tr>
  </tbody>
</table>

##### Example

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L396-L398
```




---

## elementClear
Element Clear கட்டளை ஒரு தொகுக்கக்கூடிய அல்லது மீட்டமைக்கக்கூடிய உறுப்பைப் பார்வையில் உருட்டுகிறது, பின்னர் அதன் தேர்ந்தெடுக்கப்பட்ட கோப்புகள் அல்லது உரை உள்ளடக்கத்தை அழிக்க முயற்சிக்கிறது.<br /><br />WebDriver Protocol கட்டளை. கூடுதல் விவரங்கள் [அதிகாரப்பூர்வ நெறிமுறை ஆவணங்களில்](https://w3c.github.io/webdriver/#dfn-element-clear) காணலாம்.

:::info

இந்த நெறிமுறை கட்டளை பின்வரும் வசதியான முறையில் உள்ளிணைக்கப்பட்டுள்ளது: [clearValue](/docs/api/element/clearValue). இதற்கு பதிலாக இந்த கட்டளையைப் பயன்படுத்த பரிந்துரைக்கப்படுகிறது.

:::


##### Usage

```js
browser.elementClear(elementId)
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
      <td><code><var>elementId</var></code></td>
      <td>String</td>
      <td>the id of an element returned in a previous call to Find Element(s)</td>
    </tr>
  </tbody>
</table>

##### Example

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L404-L407
```




---

## elementSendKeys
Element Send Keys கட்டளை படிவக் கட்டுப்பாட்டு உறுப்பைப் பார்வையில் உருட்டுகிறது, பின்னர் வழங்கப்பட்ட விசைகளை உறுப்புக்கு அனுப்புகிறது. உறுப்பானது விசைப்பலகை இடைமறிக்கக்கூடியதாக இல்லாவிட்டால், ஒரு உறுப்பு இடைமறிக்க முடியாத பிழை திரும்பத் தரப்படும்.<br /><br />உள்ளீட்டிற்குப் பயன்படுத்தப்படும் விசை உள்ளீட்டு நிலை "தட்டச்சு செய்வதன்" நடுவில் U+E000 (NULL) என்ற பூஜ்ஜிய விசையை அனுப்புவதன் மூலம் அழிக்கப்படலாம்.<br /><br />WebDriver Protocol கட்டளை. கூடுதல் விவரங்கள் [அதிகாரப்பூர்வ நெறிமுறை ஆவணங்களில்](https://w3c.github.io/webdriver/#dfn-element-send-keys) காணலாம்.

:::info

இந்த நெறிமுறை கட்டளை பின்வரும் வசதியான முறைகளில் உள்ளிணைக்கப்பட்டுள்ளது: [addValue](/docs/api/element/addValue), [setValue](/docs/api/element/setValue). இந்த கட்டளைகளைப் பயன்படுத்த பரிந்துரைக்கப்படுகிறது.

:::


##### Usage

```js
browser.elementSendKeys(elementId, text)
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
      <td><code><var>elementId</var></code></td>
      <td>String</td>
      <td>the id of an element returned in a previous call to Find Element(s)</td>
    </tr>
    <tr>
      <td><code><var>text</var></code></td>
      <td>string</td>
      <td>string to send as keystrokes to the element</td>
    </tr>
  </tbody>
</table>

##### Example

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L413-L416
```




---

## getPageSource
Get Page Source கட்டளை தற்போதைய உலாவல் சூழல் செயலில் உள்ள ஆவணத்தின் DOM இன் சரம் தொடரியக்கத்தைத் திரும்பத் தருகிறது.<br /><br />WebDriver Protocol கட்டளை. கூடுதல் விவரங்கள் [அதிகாரப்பூர்வ நெறிமுறை ஆவணங்களில்](https://w3c.github.io/webdriver/#dfn-get-page-source) காணலாம்.

##### Usage

```js
browser.getPageSource()
```

##### Example

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L420-L421
```

##### Returns

- **&lt;string&gt;**
            **<code><var>pageSource</var></code>:** the DOM of the current browsing context active document


---

## executeScript
Execute Script கட்டளை தற்போதைய உலாவல் சூழலின் சூழலில் ஒரு JavaScript செயல்பாட்டை இயக்குகிறது மற்றும் செயல்பாட்டின் திரும்ப மதிப்பைத் திருப்பித் தருகிறது.<br /><br />WebDriver Protocol கட்டளை. கூடுதல் விவரங்கள் [அதிகாரப்பூர்வ நெறிமுறை ஆவணங்களில்](https://w3c.github.io/webdriver/#dfn-execute-script) காணலாம்.

:::info

இந்த நெறிமுறை கட்டளை பின்வரும் வசதியான முறையில் உள்ளிணைக்கப்பட்டுள்ளது: [execute](/docs/api/browser/execute). இதற்கு பதிலாக இந்த கட்டளையைப் பயன்படுத்த பரிந்துரைக்கப்படுகிறது.

:::


##### Usage

```js
browser.executeScript(script, args)
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
      <td><code><var>script</var></code></td>
      <td>string</td>
      <td>a string, the Javascript function body you want executed</td>
    </tr>
    <tr>
      <td><code><var>args</var></code></td>
      <td>string, object, number, boolean, null, undefined[]</td>
      <td>an array of JSON values which will be deserialized and passed as arguments to your function</td>
    </tr>
  </tbody>
</table>

##### Example

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L425-L426
```

##### Returns

- **&lt;*&gt;**
            **<code><var>result</var></code>:** Either the return value of your script, the fulfillment of the Promise returned by your script, or the error which was the reason for your script's returned Promise's rejection.


---

## executeAsyncScript
Execute Async Script கட்டளை JavaScript ஐ ஒரு அநாமதேய செயல்பாடாக இயக்க வைக்கிறது. Execute Script கட்டளையைப் போலல்லாமல், செயல்பாட்டின் முடிவு புறக்கணிக்கப்படுகிறது. இதற்கு பதிலாக கூடுதல் வாதம் செயல்பாட்டிற்கு இறுதி வாதமாக வழங்கப்படுகிறது. இது அழைக்கப்படும்போது, அதன் முதல் வாதத்தை பதிலாக திருப்பி அளிக்கும் ஒரு செயல்பாடாகும்.<br /><br />WebDriver Protocol கட்டளை. கூடுதல் விவரங்கள் [அதிகாரப்பூர்வ நெறிமுறை ஆவணங்களில்](https://w3c.github.io/webdriver/#dfn-execute-async-script) காணலாம்.

:::info

இந்த நெறிமுறை கட்டளை பின்வரும் வசதியான முறையில் உள்ளிணைக்கப்பட்டுள்ளது: [executeAsync](/docs/api/browser/executeAsync). இதற்கு பதிலாக இந்த கட்டளையைப் பயன்படுத்த பரிந்துரைக்கப்படுகிறது.

:::


##### Usage

```js
browser.executeAsyncScript(script, args)
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
      <td><code><var>script</var></code></td>
      <td>string</td>
      <td>a string, the Javascript function body you want executed</td>
    </tr>
    <tr>
      <td><code><var>args</var></code></td>
      <td>string, object, number, boolean, null, undefined[]</td>
      <td>an array of JSON values which will be deserialized and passed as arguments to your function</td>
    </tr>
  </tbody>
</table>

##### Example

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L430-L434
```

##### Returns

- **&lt;*&gt;**
            **<code><var>result</var></code>:** Either the return value of your script, the fulfillment of the Promise returned by your script, or the error which was the reason for your script's returned Promise's rejection.


---

## getAllCookies
Get All Cookies கட்டளை தற்போதைய உலாவல் சூழலின் செயலில் உள்ள ஆவணத்தின் முகவரியுடன் தொடர்புடைய அனைத்து குக்கீகளையும் திரும்பத் தருகிறது.<br /><br />WebDriver Protocol கட்டளை. கூடுதல் விவரங்கள் [அதிகாரப்பூர்வ நெறிமுறை ஆவணங்களில்](https://w3c.github.io/webdriver/#dfn-get-all-cookies) காணலாம்.

##### Usage

```js
browser.getAllCookies()
```

##### Example

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L438-L455
```

##### Returns

- **&lt;Object[]&gt;**
            **<code><var>cookies</var></code>:** A list of serialized cookies. Each serialized cookie has a number of optional fields which may or may not be returned in addition to `name` and `value`.


---

## addCookie
Add Cookie கட்டளை செயலில் உள்ள ஆவணத்தின் முகவரியுடன் தொடர்புடைய குக்கீ சேமிப்பகத்தில் ஒரு குக்கீயைச் சேர்க்கிறது.<br /><br />WebDriver Protocol கட்டளை. கூடுதல் விவரங்கள் [அதிகாரப்பூர்வ நெறிமுறை ஆவணங்களில்](https://w3c.github.io/webdriver/#dfn-adding-a-cookie) காணலாம்.

##### Usage

```js
browser.addCookie(cookie)
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
      <td><code><var>cookie</var></code></td>
      <td>object</td>
      <td>A JSON object representing a cookie. It must have at least the name and value fields and could have more, including expiry-time and so on</td>
    </tr>
  </tbody>
</table>

##### Example

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L459-L477
```




---

## deleteAllCookies
Delete All Cookies கட்டளை செயலில் உள்ள ஆவணத்தின் முகவரியுடன் தொடர்புடைய அனைத்து குக்கீகளையும் நீக்க அனுமதிக்கிறது.<br /><br />WebDriver Protocol கட்டளை. கூடுதல் விவரங்கள் [அதிகாரப்பூர்வ நெறிமுறை ஆவணங்களில்](https://w3c.github.io/webdriver/#dfn-delete-all-cookies) காணலாம்.

##### Usage

```js
browser.deleteAllCookies()
```

##### Example

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L481-L485
```




---

## getNamedCookie
Get Named Cookie கட்டளை தற்போதைய உலாவல் சூழலின் செயலில் உள்ள ஆவணத்தின் குக்கீ ஸ்டோரில் உள்ள தொடர்புடைய குக்கீகளில் இருந்து கோரப்பட்ட பெயருடன் குக்கீயைத் திரும்பத் தருகிறது. குக்கீ எதுவும் இல்லையென்றால், அத்தகைய குக்கீ பிழை இல்லை என்று திரும்பத் தரப்படும்.<br /><br />WebDriver Protocol கட்டளை. கூடுதல் விவரங்கள் [அதிகாரப்பூர்வ நெறிமுறை ஆவணங்களில்](https://w3c.github.io/webdriver/#dfn-get-named-cookie) காணலாம்.

##### Usage

```js
browser.getNamedCookie(name)
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
      <td><code><var>name</var></code></td>
      <td>String</td>
      <td>name of the cookie to retrieve</td>
    </tr>
  </tbody>
</table>

##### Example

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L489-L503
```

##### Returns

- **&lt;Object&gt;**
            **<code><var>cookie</var></code>:** A serialized cookie, with name and value fields. There are a number of optional fields like `path`, `domain`, and `expiry-time` which may also be present.


---

## deleteCookie
Delete Cookie கட்டளை அளவுரு பெயரின் மூலம் ஒரு குக்கீயை நீக்கவோ அல்லது பெயர் வரையறுக்கப்படவில்லை என்றால் செயலில் உள்ள ஆவணத்தின் முகவரியுடன் தொடர்புடைய அனைத்து குக்கீகளையும் நீக்கவும் அனுமதிக்கிறது.<br /><br />WebDriver Protocol கட்டளை. கூடுதல் விவரங்கள் [அதிகாரப்பூர்வ நெறிமுறை ஆவணங்களில்](https://w3c.github.io/webdriver/#dfn-delete-cookie) காணலாம்.

##### Usage

```js
browser.deleteCookie(name)
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
      <td><code><var>name</var></code></td>
      <td>String</td>
      <td>name of the cookie to delete</td>
    </tr>
  </tbody>
</table>

##### Example

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L507-L512
```




---

## performActions
Perform Actions கட்டளை சிக்கலான பயனர் செயல்களை செயல்படுத்தப் பயன்படுகிறது. மேலும் விவரங்களுக்கு [spec](https://github.com/jlipps/simple-wd-spec#perform-actions) ஐப் பார்க்கவும்.<br /><br />WebDriver Protocol கட்டளை. கூடுதல் விவரங்கள் [அதிகாரப்பூர்வ நெறிமுறை ஆவணங்களில்](https://w3c.github.io/webdriver/#dfn-perform-actions) காணலாம்.

##### Usage

```js
browser.performActions(actions)
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
      <td><code><var>actions</var></code></td>
      <td>object[]</td>
      <td>a list of objects, each of which represents an input source and its associated actions</td>
    </tr>
  </tbody>
</table>



---

## releaseActions
Release Actions கட்டளை தற்போது அழுத்தப்பட்டுள்ள எல்லா விசைகளையும் சுட்டி பொத்தான்களையும் விடுவிக்கப் பயன்படுகிறது. இது செயல்களின் வெளிப்படையான வரிசையால் நிலை விடுவிக்கப்பட்டால் நிகழ்வுகள் தீயிடப்படுவதற்கு காரணமாகிறது. மேலும் இது மெய்நிகர் சாதனங்களின் அனைத்து உள் நிலையையும் அழிக்கிறது.<br /><br />WebDriver Protocol கட்டளை. கூடுதல் விவரங்கள் [அதிகாரப்பூர்வ நெறிமுறை ஆவணங்களில்](https://w3c.github.io/webdriver/#dfn-release-actions) காணலாம்.

##### Usage

```js
browser.releaseActions()
```



---

## dismissAlert
Dismiss Alert கட்டளை இருந்தால் ஒரு எளிய உரையாடலை நிராகரிக்கிறது, இல்லையெனில் பிழை. நிராகரிப்பு பொத்தான் இல்லாத ஒரு எச்சரிக்கை பயனர் ஊக்குவிப்பை நிராகரிக்க ஒரு கோரிக்கை, அதை ஏற்றுக்கொள்வதைப் போலவே விளைவைக் கொண்டுள்ளது.<br /><br />WebDriver Protocol கட்டளை. கூடுதல் விவரங்கள் [அதிகாரப்பூர்வ நெறிமுறை ஆவணங்களில்](https://w3c.github.io/webdriver/#dfn-dismiss-alert) காணலாம்.

##### Usage

```js
browser.dismissAlert()
```

##### Example

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L516-L517
```




---

## acceptAlert
Accept Alert கட்டளை இருந்தால் ஒரு எளிய உரையாடலை ஏற்றுக்கொள்கிறது, இல்லையெனில் பிழை.<br /><br />WebDriver Protocol கட்டளை. கூடுதல் விவரங்கள் [அதிகாரப்பூர்வ நெறிமுறை ஆவணங்களில்](https://w3c.github.io/webdriver/#dfn-accept-alert) காணலாம்.

##### Usage

```js
browser.acceptAlert()
```



---

## getAlertText
Get Alert Text கட்டளை தற்போதைய பயனர் ஊக்குவிப்பின் செய்தியைத் திரும்பத் தருகிறது. தற்போதைய பயனர் தூண்டுதல் இல்லை என்றால், அது ஒரு பிழையைத் திருப்பி அளிக்கிறது.<br /><br />WebDriver Protocol கட்டளை. கூடுதல் விவரங்கள் [அதிகாரப்பூர்வ நெறிமுறை ஆவணங்களில்](https://w3c.github.io/webdriver/#dfn-get-alert-text) காணலாம்.

##### Usage

```js
browser.getAlertText()
```

##### Example

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L521-L522
```

##### Returns

- **&lt;string&gt;**
            **<code><var>alertText</var></code>:** The message of the user prompt.


---

## sendAlertText
Send Alert Text கட்டளை window.prompt பயனர் ஊக்குவிப்பின் உரை புலத்தை கொடுக்கப்பட்ட மதிப்புக்கு அமைக்கிறது.<br /><br />WebDriver Protocol கட்டளை. கூடுதல் விவரங்கள் [அதிகாரப்பூர்வ நெறிமுறை ஆவணங்களில்](https://w3c.github.io/webdriver/#dfn-send-alert-text) காணலாம்.

##### Usage

```js
browser.sendAlertText(text)
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
      <td><code><var>text</var></code></td>
      <td>string</td>
      <td>string to set the prompt to</td>
    </tr>
  </tbody>
</table>



---

## takeScreenshot
Take Screenshot கட்டளை உயர்நிலை உலாவல் சூழலின் பார்வைப்புலத்தின் ஒரு ஸ்கிரீன்ஷாட்டை எடுக்கிறது.<br /><br />WebDriver Protocol கட்டளை. கூடுதல் விவரங்கள் [அதிகாரப்பூர்வ நெறிமுறை ஆவணங்களில்](https://w3c.github.io/webdriver/#dfn-take-screenshot) காணலாம்.

##### Usage

```js
browser.takeScreenshot()
```


##### Returns

- **&lt;string&gt;**
            **<code><var>screenshot</var></code>:** The base64-encoded PNG image data comprising the screenshot of the initial viewport.


---

## takeElementScreenshot
Take Element Screenshot கட்டளை ஒரு உறுப்பின் எல்லைப்பெட்டியால் உள்ளடக்கப்பட்ட தெரியக்கூடிய பகுதியின் ஸ்கிரீன்ஷாட்டை எடுக்கிறது.<br /><br />WebDriver Protocol கட்டளை. கூடுதல் விவரங்கள் [அதிகாரப்பூர்வ நெறிமுறை ஆவணங்களில்](https://w3c.github.io/webdriver/#dfn-take-element-screenshot) காணலாம்.

##### Usage

```js
browser.takeElementScreenshot(elementId, scroll)
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
      <td><code><var>elementId</var></code></td>
      <td>String</td>
      <td>the id of an element returned in a previous call to Find Element(s)</td>
    </tr>
    <tr>
      <td><code><var>scroll</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>boolean</td>
      <td>scroll into view the element. Default: true</td>
    </tr>
  </tbody>
</table>


##### Returns

- **&lt;string&gt;**
            **<code><var>screenshot</var></code>:** The base64-encoded PNG image data comprising the screenshot of the visible region of an element's bounding rectangle after it has been scrolled into view.


---

## getElementComputedRole
ஒரு உறுப்பின் கணக்கிடப்பட்ட WAI-ARIA பங்கைப் பெறவும்.<br /><br />WebDriver Protocol கட்டளை. கூடுதல் விவரங்கள் [அதிகாரப்பூர்வ நெறிமுறை ஆவணங்களில்](https://w3c.github.io/webdriver/#get-computed-role) காணலாம்.

##### Usage

```js
browser.getElementComputedRole(elementId)
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
      <td><code><var>elementId</var></code></td>
      <td>String</td>
      <td>the id of an element returned in a previous call to Find Element(s)</td>
    </tr>
  </tbody>
</table>


##### Returns

- **&lt;string&gt;**
            **<code><var>role</var></code>:** The result of computing the WAI-ARIA role of element.


---

## getElementComputedLabel
உறுப்பின் அணுகக்கூடிய பெயரைப் பெறவும்.<br /><br />WebDriver Protocol கட்டளை. கூடுதல் விவரங்கள் [அதிகாரப்பூர்வ நெறிமுறை ஆவணங்களில்](https://w3c.github.io/webdriver/#get-computed-label) காணலாம்.

##### Usage

```js
browser.getElementComputedLabel(elementId)
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
      <td><code><var>elementId</var></code></td>
      <td>String</td>
      <td>the id of an element returned in a previous call to Find Element(s)</td>
    </tr>
  </tbody>
</table>


##### Returns

- **&lt;string&gt;**
            **<code><var>label</var></code>:** The result of a Accessible Name and Description Computation for the Accessible Name of the element.


---

## setPermissions
PermissionDescriptor இன் அனுமதி நிலையை பயனர் மாற்றியமைப்பை உருவகப்படுத்துகிறது. __குறிப்பு:__ இந்த அம்சம் இன்னும் எல்லா உலாவிகளிலும் தரையிறங்கவில்லை.<br /><br />WebDriver Protocol கட்டளை. கூடுதல் விவரங்கள் [அதிகாரப்பூர்வ நெறிமுறை ஆவணங்களில்](https://w3c.github.io/permissions/#set-permission-command) காணலாம்.

##### Usage

```js
browser.setPermissions(descriptor, state, oneRealm)
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
      <td><code><var>descriptor</var></code></td>
      <td>object</td>
      <td>Each powerful feature has one or more aspects that websites can request permission to access. To describe these aspects, each feature defines a subtype of PermissionDescriptor to be its permission descriptor type. __Note:__ this feature has not landed in all browsers yet.</td>
    </tr>
    <tr>
      <td><code><var>state</var></code></td>
      <td>string</td>
      <td>Determines whether permission is granted, denied or prompted.</td>
    </tr>
    <tr>
      <td><code><var>oneRealm</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>boolean</td>
      <td>Whether or not to apply permissions to all execution contexts.</td>
    </tr>
  </tbody>
</table>

##### Examples


```js
// set midi permissions
browser.setPermissions(
  { name: 'midi', sysex: true },
  'granted' // can be also "denied" or "prompt"
);
```


```js
// set clipboard permissions
browser.setPermissions({ name: 'clipboard-read' }, 'granted');
// now you can read the clipboard via, e.g.
const clipboardText = await browser.execute(() => navigator.clipboard.readText());
```



---

## generateTestReport
சோதனைக்கான அறிக்கையை உருவாக்குகிறது. [அறிக்கையிடல் API](https://developers.google.com/web/updates/2018/09/reportingapi) நீட்டிப்பு. __குறிப்பு:__ இந்த அம்சம் இன்னும் எல்லா உலாவிகளிலும் தரையிறங்கவில்லை.<br /><br />WebDriver Protocol கட்டளை. கூடுதல் விவரங்கள் [அதிகாரப்பூர்வ நெறிமுறை ஆவணங்களில்](https://w3c.github.io/reporting/#automation) காணலாம்.

##### Usage

```js
browser.generateTestReport(message, group)
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
      <td><code><var>message</var></code></td>
      <td>string</td>
      <td>Message to be displayed in the report.</td>
    </tr>
    <tr>
      <td><code><var>group</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>string</td>
      <td>Specifies the endpoint group to deliver the report to.</td>
    </tr>
  </tbody>
</table>



---

## createMockSensor
Ambient Light Sensor போன்ற உணர்விகளை உருவகப்படுத்த போலி உணர்வியை உருவாக்குகிறது. __குறிப்பு:__ இந்த அம்சம் இன்னும் எல்லா உலாவிகளிலும் தரையிறங்கவில்லை.<br /><br />WebDriver Protocol கட்டளை. கூடுதல் விவரங்கள் [அதிகாரப்பூர்வ நெறிமுறை ஆவணங்களில்](https://w3c.github.io/sensors/#create-mock-sensor-command) காணலாம்.

##### Usage

```js
browser.createMockSensor(mockSensorType, maxSamplingFrequency, minSamplingFrequency)
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
      <td><code><var>mockSensorType</var></code></td>
      <td>string</td>
      <td>Type of sensor API to mock, e.g. 'ambient-light'</td>
    </tr>
    <tr>
      <td><code><var>maxSamplingFrequency</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>number</td>
      <td>A double representing frequency in Hz that is used to set maximum supported sampling frequency for the associated mock sensor.</td>
    </tr>
    <tr>
      <td><code><var>minSamplingFrequency</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>number</td>
      <td>A double representing frequency in Hz that is used to set minimum supported sampling frequency for the associated mock sensor.</td>
    </tr>
  </tbody>
</table>



---

## getMockSensor
குறிப்பிட்ட வகையான போலி உணர்வி பற்றிய தகவலைப் பெறுகிறது. __குறிப்பு:__ இந்த அம்சம் இன்னும் எல்லா உலாவிகளிலும் தரையிறங்கவில்லை.<br /><br />WebDriver Protocol கட்டளை. கூடுதல் விவரங்கள் [அதிகாரப்பூர்வ நெறிமுறை ஆவணங்களில்](https://w3c.github.io/sensors/#get-mock-sensor-command) காணலாம்.

##### Usage

```js
browser.getMockSensor(type)
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
      <td><code><var>type</var></code></td>
      <td>String</td>
      <td>Mock sensor type to retrieve information from.</td>
    </tr>
  </tbody>
</table>


##### Returns

- **&lt;object&gt;**
            **<code><var>sensorReading</var></code>:** Values of the mock sensor reading.


---

## updateMockSensor
போலி உணர்வி வகையைப் புதுப்பிக்கிறது. __குறிப்பு:__ இந்த அம்சம் இன்னும் எல்லா உலாவிகளிலும் தரையிறங்கவில்லை.<br /><br />WebDriver Protocol கட்டளை. கூடுதல் விவரங்கள் [அதிகாரப்பூர்வ நெறிமுறை ஆவணங்களில்](https://w3c.github.io/sensors/#update-mock-sensor-reading-command) காணலாம்.

##### Usage

```js
browser.updateMockSensor(type, mockSensorType, maxSamplingFrequency, minSamplingFrequency)
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
      <td><code><var>type</var></code></td>
      <td>String</td>
      <td>Mock sensor type to update information for.</td>
    </tr>
    <tr>
      <td><code><var>mockSensorType</var></code></td>
      <td>string</td>
      <td>Type of sensor API to mock, e.g. 'ambient-light'</td>
    </tr>
    <tr>
      <td><code><var>maxSamplingFrequency</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>number</td>
      <td>A double representing frequency in Hz that is used to set maximum supported sampling frequency for the associated mock sensor.</td>
    </tr>
    <tr>
      <td><code><var>minSamplingFrequency</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>number</td>
      <td>A double representing frequency in Hz that is used to set minimum supported sampling frequency for the associated mock sensor.</td>
    </tr>
  </tbody>
</table>



---

## deleteMockSensor
Delete Session கட்டளை தற்போதைய அமர்வுடன் தொடர்புடைய எந்த உயர்-நிலை உலாவுதல் சூழல்களையும் மூடுகிறது, இணைப்பை முடிக்கிறது, இறுதியாக தற்போதைய அமர்வை மூடுகிறது. __குறிப்பு:__ இந்த அம்சம் இன்னும் எல்லா உலாவிகளிலும் தரையிறங்கவில்லை.<br /><br />WebDriver Protocol கட்டளை. கூடுதல் விவரங்கள் [அதிகாரப்பூர்வ நெறிமுறை ஆவணங்களில்](https://w3c.github.io/sensors/#delete-mock-sensor-command) காணலாம்.

##### Usage

```js
browser.deleteMockSensor(type)
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
      <td><code><var>type</var></code></td>
      <td>String</td>
      <td>Mock sensor type to delete.</td>
    </tr>
  </tbody>
</table>



---

## setTimeZone
சோதனை நோக்கங்களுக்காக நேர மண்டலத்தின் மாற்றத்தை உருவகப்படுத்துகிறது. __குறிப்பு:__ இந்த அம்சம் இன்னும் எல்லா உலாவிகளிலும் தரையிறங்கவில்லை.<br /><br />WebDriver Protocol கட்டளை. கூடுதல் விவரங்கள் [அதிகாரப்பூர்வ நெறிமுறை ஆவணங்களில்](https://w3c.github.io/sensors/#create-mock-sensor-command) காணலாம்.

##### Usage

```js
browser.setTimeZone(time_zone)
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
      <td><code><var>time_zone</var></code></td>
      <td>string</td>
      <td>Name of the timezone, e.g. Asia/Tokyo</td>
    </tr>
  </tbody>
</table>



---

## addVirtualAuthenticator
மென்பொருள் [Virtual Authenticator](https://www.w3.org/TR/webauthn-2/#virtual-authenticators) ஐ உருவாக்குகிறது.<br /><br />WebDriver Protocol கட்டளை. கூடுதல் விவரங்கள் [அதிகாரப்பூர்வ நெறிமுறை ஆவணங்களில்](https://www.w3.org/TR/webauthn-2/#sctn-automation-add-virtual-authenticator) காணலாம்.

##### Usage

```js
browser.addVirtualAuthenticator(protocol, transport, hasResidentKey, hasUserVerification, isUserConsenting, isUserVerified, extensions, uvm)
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
      <td><code><var>protocol</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>string</td>
      <td>Valid values: 'ctap1/u2f', 'ctap2', 'ctap2_1'.</td>
    </tr>
    <tr>
      <td><code><var>transport</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>string</td>
      <td>Valid values: 'usb', 'nfc', 'ble' or 'internal'.</td>
    </tr>
    <tr>
      <td><code><var>hasResidentKey</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>boolean</td>
      <td>Valid values: true, false.</td>
    </tr>
    <tr>
      <td><code><var>hasUserVerification</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>boolean</td>
      <td>Valid values: true, false.</td>
    </tr>
    <tr>
      <td><code><var>isUserConsenting</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>boolean</td>
      <td>Valid values: true, false.</td>
    </tr>
    <tr>
      <td><code><var>isUserVerified</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>boolean</td>
      <td>Valid values: An array containing extension identifiers.</td>
    </tr>
    <tr>
      <td><code><var>extensions</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>string[]</td>
      <td>Valid values: Up to 3 User Verification Method entries.</td>
    </tr>
    <tr>
      <td><code><var>uvm</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>object[]</td>
      <td></td>
    </tr>
  </tbody>
</table>


##### Returns

- **&lt;string&gt;**
            **<code><var>authenticatorId</var></code>:** Returns the string ID of the authenticator.


---

## removeVirtualAuthenticator
முன்னர் உருவாக்கப்பட்ட Virtual Authenticator ஐ அகற்றுகிறது.<br /><br />WebDriver Protocol கட்டளை. கூடுதல் விவரங்கள் [அதிகாரப்பூர்வ நெறிமுறை ஆவணங்களில்](https://www.w3.org/TR/webauthn-2/#sctn-automation-remove-virtual-authenticator) காணலாம்.

##### Usage

```js
browser.removeVirtualAuthenticator(authenticatorId)
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
      <td><code><var>authenticatorId</var></code></td>
      <td>String</td>
      <td>id of authenticator</td>
    </tr>
  </tbody>
</table>



---

## addCredential
ஏற்கனவே உள்ள மெய்நிகர் அங்கீகரிப்பாளரில் பொது விசை அறிச்சான்று மூலத்தைச் செலுத்துகிறது.<br /><br />WebDriver Protocol கட்டளை. கூடுதல் விவரங்கள் [அதிகாரப்பூர்வ நெறிமுறை ஆவணங்களில்](https://www.w3.org/TR/webauthn-2/#sctn-automation-add-credential) காணலாம்.

##### Usage

```js
browser.addCredential(authenticatorId, credentialId, isResidentCredential, rpId, privateKey, userHandle, signCount, largeBlob)
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
      <td><code><var>authenticatorId</var></code></td>
      <td>String</td>
      <td>ID of authenticator</td>
    </tr>
    <tr>
      <td><code><var>credentialId</var></code></td>
      <td>string</td>
      <td>The Credential ID encoded using Base64url Encoding.</td>
    </tr>
    <tr>
      <td><code><var>isResidentCredential</var></code></td>
      <td>boolean</td>
      <td>If set to true, a client-side discoverable credential is created. If set to false, a server-side credential is created instead.</td>
    </tr>
    <tr>
      <td><code><var>rpId</var></code></td>
      <td>string</td>
      <td>The Relying Party ID the credential is scoped to.</td>
    </tr>
    <tr>
      <td><code><var>privateKey</var></code></td>
      <td>string</td>
      <td>An asymmetric key package containing a single private key per [RFC5958], encoded using Base64url Encoding.</td>
    </tr>
    <tr>
      <td><code><var>userHandle</var></code></td>
      <td>string</td>
      <td>The userHandle associated to the credential encoded using Base64url Encoding. This property may not be defined.</td>
    </tr>
    <tr>
      <td><code><var>signCount</var></code></td>
      <td>number</td>
      <td>The initial value for a signature counter associated to the public key credential source.</td>
    </tr>
    <tr>
      <td><code><var>largeBlob</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>string</td>
      <td>The large, per-credential blob associated to the public key credential source, encoded using Base64url Encoding. This property may not be defined.</td>
    </tr>
  </tbody>
</table>



---

## getCredentials
அவை Add Credential அல்லது `navigator.credentials.create()` ஐப் பயன்படுத்தி சேமிக்கப்பட்டாலும், மெய்நிகர் அங்கீகரிப்பாளரில் சேமிக்கப்பட்ட ஒவ்வொரு பொது விசை அறிச்சான்று மூலத்திற்கும் ஒரு அறிச்சான்று அளவுருக்கள் பொருளைத் திரும்பத் தருகிறது.<br /><br />WebDriver Protocol கட்டளை. கூடுதல் விவரங்கள் [அதிகாரப்பூர்வ நெறிமுறை ஆவணங்களில்](https://www.w3.org/TR/webauthn-2/#sctn-automation-get-credentials) காணலாம்.

##### Usage

```js
browser.getCredentials(authenticatorId)
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
      <td><code><var>authenticatorId</var></code></td>
      <td>String</td>
      <td>id of authenticator</td>
    </tr>
  </tbody>
</table>


##### Returns

- **&lt;object[]&gt;**
            **<code><var>credentials</var></code>:** Returns an array of credentials.


---

## removeAllCredentials
மெய்நிகர் அங்கீகரிப்பாளரில் சேமிக்கப்பட்ட அனைத்து பொது விசை அறிச்சான்று மூலங்களையும் அகற்றுகிறது.<br /><br />WebDriver Protocol கட்டளை. கூடுதல் விவரங்கள் [அதிகாரப்பூர்வ நெறிமுறை ஆவணங்களில்](https://www.w3.org/TR/webauthn-2/#sctn-automation-remove-all-credentials) காணலாம்.

##### Usage

```js
browser.removeAllCredentials(authenticatorId)
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
      <td><code><var>authenticatorId</var></code></td>
      <td>String</td>
      <td>id of authenticator</td>
    </tr>
  </tbody>
</table>



---

## removeCredential
மெய்நிகர் அங்கீகரிப்பாளரில் சேமிக்கப்பட்ட பொது விசை அறிச்சான்று மூலத்தை அகற்றுகிறது.<br /><br />WebDriver Protocol கட்டளை. கூடுதல் விவரங்கள் [அதிகாரப்பூர்வ நெறிமுறை ஆவணங்களில்](https://www.w3.org/TR/webauthn-2/#sctn-automation-remove-credential) காணலாம்.

##### Usage

```js
browser.removeCredential(authenticatorId, credentialId)
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
      <td><code><var>authenticatorId</var></code></td>
      <td>String</td>
      <td>id of authenticator</td>
    </tr>
    <tr>
      <td><code><var>credentialId</var></code></td>
      <td>String</td>
      <td>id of credential</td>
    </tr>
  </tbody>
</table>



---

## setUserVerified
Set User Verified நீட்டிப்பு கட்டளை மெய்நிகர் அங்கீகரிப்பாளரில் isUserVerified பண்பை அமைக்கிறது.<br /><br />WebDriver Protocol கட்டளை. கூடுதல் விவரங்கள் [அதிகாரப்பூர்வ நெறிமுறை ஆவணங்களில்](https://www.w3.org/TR/webauthn-2/#sctn-automation-set-user-verified) காணலாம்.

##### Usage

```js
browser.setUserVerified(authenticatorId)
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
      <td><code><var>authenticatorId</var></code></td>
      <td>String</td>
      <td>id of authenticator</td>
    </tr>
  </tbody>
</table>


