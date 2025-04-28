---
id: webdriver
title: WebDriver Protokoll
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-protocols/src/protocols/webdriver.ts
---

## newSession
The New Session command creates a new WebDriver session with the endpoint node. If the creation fails, a session not created error is returned.<br /><br />WebDriver Protocol command. More details can be found in the [official protocol docs](https://w3c.github.io/webdriver/#dfn-new-sessions).

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
The Delete Session command closes any top-level browsing contexts associated with the current session, terminates the connection, and finally closes the current session.<br /><br />WebDriver Protocol command. More details can be found in the [official protocol docs](https://w3c.github.io/webdriver/#dfn-delete-session).

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
The Status command returns information about whether a remote end is in a state in which it can create new sessions and can additionally include arbitrary meta information that is specific to the implementation.<br /><br />WebDriver Protocol command. More details can be found in the [official protocol docs](https://w3c.github.io/webdriver/#dfn-status).

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
The Get Timeouts command gets timeout durations associated with the current session.<br /><br />WebDriver Protocol command. More details can be found in the [official protocol docs](https://w3c.github.io/webdriver/#dfn-get-timeouts).

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
The Set Timeouts command sets timeout durations associated with the current session. The timeouts that can be controlled are listed in the table of session timeouts below.<br /><br />WebDriver Protocol command. More details can be found in the [official protocol docs](https://w3c.github.io/webdriver/#dfn-set-timeouts).

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
The Get Current URL command returns the URL of the current top-level browsing context.<br /><br />WebDriver Protocol command. More details can be found in the [official protocol docs](https://w3c.github.io/webdriver/#dfn-get-current-url).

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
The navigateTo (go) command is used to cause the user agent to navigate the current top-level browsing context a new location.<br /><br />WebDriver Protocol command. More details can be found in the [official protocol docs](https://w3c.github.io/webdriver/#dfn-navigate-to).

:::info

This protocol command is embedded in the following convenient method: [url](/docs/api/browser/url). It is recommended to use this command instead.

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
The Back command causes the browser to traverse one step backward in the joint session history of the current top-level browsing context. This is equivalent to pressing the back button in the browser chrome or calling `window.history.back`.<br /><br />WebDriver Protocol command. More details can be found in the [official protocol docs](https://w3c.github.io/webdriver/#dfn-back).

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
The Forward command causes the browser to traverse one step forwards in the joint session history of the current top-level browsing context.<br /><br />WebDriver Protocol command. More details can be found in the [official protocol docs](https://w3c.github.io/webdriver/#dfn-forward).

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
The Refresh command causes the browser to reload the page in current top-level browsing context.<br /><br />WebDriver Protocol command. More details can be found in the [official protocol docs](https://w3c.github.io/webdriver/#dfn-refresh).

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
The Get Title command returns the document title of the current top-level browsing context, equivalent to calling `document.title`.<br /><br />WebDriver Protocol command. More details can be found in the [official protocol docs](https://w3c.github.io/webdriver/#dfn-get-title).

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
The Get Window Handle command returns the window handle for the current top-level browsing context. It can be used as an argument to Switch To Window.<br /><br />WebDriver Protocol command. More details can be found in the [official protocol docs](https://w3c.github.io/webdriver/#dfn-get-window-handle).

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
The Close Window command closes the current top-level browsing context. Once done, if there are no more top-level browsing contexts open, the WebDriver session itself is closed.<br /><br />WebDriver Protocol command. More details can be found in the [official protocol docs](https://w3c.github.io/webdriver/#dfn-close-window).

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
The Switch To Window command is used to select the current top-level browsing context for the current session, i.e. the one that will be used for processing commands.<br /><br />WebDriver Protocol command. More details can be found in the [official protocol docs](https://w3c.github.io/webdriver/#dfn-switch-to-window).

:::info

This protocol command is embedded in the following convenient method: [switchWindow](/docs/api/browser/switchWindow). It is recommended to use this command instead.

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
Create a new top-level browsing context.<br /><br />WebDriver Protocol command. More details can be found in the [official protocol docs](https://w3c.github.io/webdriver/#new-window).

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
The Get Window Handles command returns a list of window handles for every open top-level browsing context. The order in which the window handles are returned is arbitrary.<br /><br />WebDriver Protocol command. More details can be found in the [official protocol docs](https://w3c.github.io/webdriver/#dfn-get-window-handles).

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
The Print Page command renders the document to a paginated PDF document. __Note:__ Chrome currently only supports this in [headless mode](https://webdriver.io/docs/capabilities/#run-browser-headless), see [`crbug753118`](https://bugs.chromium.org/p/chromium/issues/detail?id=753118)).<br /><br />WebDriver Protocol command. More details can be found in the [official protocol docs](https://w3c.github.io/webdriver/#print-page).

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
The Switch To Frame command is used to select the current top-level browsing context or a child browsing context of the current browsing context to use as the current browsing context for subsequent commands.<br /><br />WebDriver Protocol command. More details can be found in the [official protocol docs](https://w3c.github.io/webdriver/#dfn-switch-to-frame).
:::caution

This protocol command is deprecated<br />This command is deprecated and we encourage everyone to use `switchFrame` instead for switching into frames. Read more about this command at https://webdriver.io/docs/api/browser/switchFrame.
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
The Switch to Parent Frame command sets the current browsing context for future commands to the parent of the current browsing context.<br /><br />WebDriver Protocol command. More details can be found in the [official protocol docs](https://w3c.github.io/webdriver/#dfn-switch-to-parent-frame).

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
The Get Window Rect command returns the size and position on the screen of the operating system window corresponding to the current top-level browsing context.<br /><br />WebDriver Protocol command. More details can be found in the [official protocol docs](https://w3c.github.io/webdriver/#dfn-get-window-rect).

:::info

This protocol command is embedded in the following convenient method: [getWindowSize](/docs/api/browser/getWindowSize). It is recommended to use this command instead.

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
The Set Window Rect command alters the size and the position of the operating system window corresponding to the current top-level browsing context.<br /><br />WebDriver Protocol command. More details can be found in the [official protocol docs](https://w3c.github.io/webdriver/#dfn-set-window-rect).

:::info

This protocol command is embedded in the following convenient method: [setWindowSize](/docs/api/browser/setWindowSize). It is recommended to use this command instead.

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
The Maximize Window command invokes the window manager-specific "maximize" operation, if any, on the window containing the current top-level browsing context. This typically increases the window to the maximum available size without going full-screen.<br /><br />WebDriver Protocol command. More details can be found in the [official protocol docs](https://w3c.github.io/webdriver/#dfn-maximize-window).

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
The Minimize Window command invokes the window manager-specific "minimize" operation, if any, on the window containing the current top-level browsing context. This typically hides the window in the system tray.<br /><br />WebDriver Protocol command. More details can be found in the [official protocol docs](https://w3c.github.io/webdriver/#dfn-minimize-window).

##### Usage

```js
browser.minimizeWindow()
```


##### Returns

- **&lt;Object&gt;**
            **<code><var>windowRect</var></code>:** A JSON representation of a "window rect" object of the (new) current top-level browsing context.


---

## fullscreenWindow
The Fullscreen Window command invokes the window manager-specific "full screen" operation, if any, on the window containing the current top-level browsing context. This typically increases the window to the size of the physical display and can hide browser chrome elements such as toolbars.<br /><br />WebDriver Protocol command. More details can be found in the [official protocol docs](https://w3c.github.io/webdriver/#dfn-fullscreen-window).

##### Usage

```js
browser.fullscreenWindow()
```


##### Returns

- **&lt;Object&gt;**
            **<code><var>windowRect</var></code>:** A JSON representation of a "window rect" object of the (new) current top-level browsing context.


---

## findElement
The Find Element command is used to find an element in the current browsing context that can be used for future commands. This command returns JSON representation of the element that can be passed to $ command to transform the reference to an extended WebdriverIO element.<br /><br />WebDriver Protocol command. More details can be found in the [official protocol docs](https://w3c.github.io/webdriver/#dfn-find-element).

:::info

This protocol command is embedded in the following convenient method: [$](/docs/api/browser/$). It is recommended to use this command instead.

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
The Find Element From Shadow Root command is used to find an element within the shadow root of an element that can be used for future commands. This command returns JSON representation of the element that can be passed to $ command to transform the reference to an extended WebdriverIO element.<br /><br />WebDriver Protocol command. More details can be found in the [official protocol docs](https://w3c.github.io/webdriver/#find-element-from-shadow-root).

:::info

This protocol command is embedded in the following convenient method: [shadow$](/docs/api/element/shadow$). It is recommended to use this command instead.

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
The Find Elements command is used to find elements in the current browsing context that can be used for future commands. This command returns array of JSON representation of the elements that can be passed to $ command to transform the reference to an extended WebdriverIO element (See findElement).<br /><br />WebDriver Protocol command. More details can be found in the [official protocol docs](https://w3c.github.io/webdriver/#dfn-find-elements).

:::info

This protocol command is embedded in the following convenient method: [$$](/docs/api/browser/$$). It is recommended to use this command instead.

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
The Find Elements command is used to find elements within the shadow root of an element that can be used for future commands. This command returns array of JSON representation of the elements that can be passed to $ command to transform the reference to an extended WebdriverIO element (See findElement).<br /><br />WebDriver Protocol command. More details can be found in the [official protocol docs](https://w3c.github.io/webdriver/#find-elements-from-shadow-root).

:::info

This protocol command is embedded in the following convenient method: [shadow$$](/docs/api/element/shadow$$). It is recommended to use this command instead.

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
The Find Element From Element command is used to find an element from a web element in the current browsing context that can be used for future commands. This command returns JSON representation of the element that can be passed to $ command to transform the reference to an extended WebdriverIO element (See findElement).<br /><br />WebDriver Protocol command. More details can be found in the [official protocol docs](https://w3c.github.io/webdriver/#dfn-find-element-from-element).

:::info

This protocol command is embedded in the following convenient method: [$](/docs/api/element/$). It is recommended to use this command instead.

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
The Find Elements From Element command is used to find elements from a web element in the current browsing context that can be used for future commands. This command returns array of JSON representation of the elements that can be passed to $ command to transform the reference to an extended WebdriverIO element (See findElement).<br /><br />WebDriver Protocol command. More details can be found in the [official protocol docs](https://w3c.github.io/webdriver/#dfn-find-elements-from-element).

:::info

This protocol command is embedded in the following convenient method: [$$](/docs/api/element/$$). It is recommended to use this command instead.

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
Get the shadow root object of an element. The result object can be used to fetch elements within this shadow root using e.g. findElementFromShadowRoots or findElementsFromShadowRoots.<br /><br />WebDriver Protocol command. More details can be found in the [official protocol docs](https://w3c.github.io/webdriver/#dfn-get-active-element).

:::info

This protocol command is embedded in the following convenient method: [shadow$](/docs/api/element/shadow$). It is recommended to use this command instead.

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
Get Active Element returns the active element of the current browsing context's document element. This command returns JSON representation of the element that can be passed to $ command to transform the reference to an extended WebdriverIO element (See findElement).<br /><br />WebDriver Protocol command. More details can be found in the [official protocol docs](https://w3c.github.io/webdriver/#dfn-get-active-element).

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
Is Element Selected determines if the referenced element is selected or not. This operation only makes sense on input elements of the Checkbox- and Radio Button states, or option elements.<br /><br />WebDriver Protocol command. More details can be found in the [official protocol docs](https://w3c.github.io/webdriver/#dfn-is-element-selected).

:::info

This protocol command is embedded in the following convenient method: [isSelected](/docs/api/element/isSelected). It is recommended to use this command instead.

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
Is Element Displayed determines the visibility of an element which is guided by what is perceptually visible to the human eye. In this context, an element's displayedness does not relate to the `visibility` or `display` style properties.<br /><br />WebDriver Protocol command. More details can be found in the [official protocol docs](https://w3c.github.io/webdriver/#element-displayedness).

:::info

This protocol command is embedded in the following convenient method: [isDisplayed](/docs/api/element/isDisplayed). It is recommended to use this command instead.

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
The Get Element Attribute command will return the attribute of a web element.<br /><br />WebDriver Protocol command. More details can be found in the [official protocol docs](https://w3c.github.io/webdriver/#dfn-get-element-attribute).

:::info

This protocol command is embedded in the following convenient method: [getAttribute](/docs/api/element/getAttribute). It is recommended to use this command instead.

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
The Get Element Property command will return the result of getting a property of an element.<br /><br />WebDriver Protocol command. More details can be found in the [official protocol docs](https://w3c.github.io/webdriver/#dfn-get-element-property).

:::info

This protocol command is embedded in the following convenient method: [getProperty](/docs/api/element/getProperty). It is recommended to use this command instead.

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
The Get Element CSS Value command retrieves the computed value of the given CSS property of the given web element.<br /><br />WebDriver Protocol command. More details can be found in the [official protocol docs](https://w3c.github.io/webdriver/#dfn-get-element-css-value).

:::info

This protocol command is embedded in the following convenient method: [getCSSProperty](/docs/api/element/getCSSProperty). It is recommended to use this command instead.

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
The Get Element Text command intends to return an element's text "as rendered". An element's rendered text is also used for locating a elements by their link text and partial link text.<br /><br />WebDriver Protocol command. More details can be found in the [official protocol docs](https://w3c.github.io/webdriver/#dfn-get-element-text).

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
The Get Element Tag Name command returns the qualified element name of the given web element.<br /><br />WebDriver Protocol command. More details can be found in the [official protocol docs](https://w3c.github.io/webdriver/#dfn-get-element-tag-name).

:::info

This protocol command is embedded in the following convenient method: [getTagName](/docs/api/element/getTagName). It is recommended to use this command instead.

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
The Get Element Rect command returns the dimensions and coordinates of the given web element.<br /><br />WebDriver Protocol command. More details can be found in the [official protocol docs](https://w3c.github.io/webdriver/#dfn-get-element-rect).

:::info

This protocol command is embedded in the following convenient methods: [getSize](/docs/api/element/getSize), [getLocation](/docs/api/element/getLocation). It is recommended to use these commands instead.

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
Is Element Enabled determines if the referenced element is enabled or not. This operation only makes sense on form controls.<br /><br />WebDriver Protocol command. More details can be found in the [official protocol docs](https://w3c.github.io/webdriver/#dfn-is-element-enabled).

:::info

This protocol command is embedded in the following convenient method: [isEnabled](/docs/api/element/isEnabled). It is recommended to use this command instead.

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
The Element Click command scrolls into view the element if it is not already pointer-interactable, and clicks its in-view center point. If the element's center point is obscured by another element, an element click intercepted error is returned. If the element is outside the viewport, an element not interactable error is returned.<br /><br />WebDriver Protocol command. More details can be found in the [official protocol docs](https://w3c.github.io/webdriver/#dfn-element-click).

:::info

This protocol command is embedded in the following convenient method: [click](/docs/api/element/click). It is recommended to use this command instead.

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
The Element Clear command scrolls into view an editable or resettable element and then attempts to clear its selected files or text content.<br /><br />WebDriver Protocol command. More details can be found in the [official protocol docs](https://w3c.github.io/webdriver/#dfn-element-clear).

:::info

This protocol command is embedded in the following convenient method: [clearValue](/docs/api/element/clearValue). It is recommended to use this command instead.

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
The Element Send Keys command scrolls into view the form control element and then sends the provided keys to the element. In case the element is not keyboard-interactable, an element not interactable error is returned.<br /><br />The key input state used for input may be cleared mid-way through "typing" by sending the null key, which is U+E000 (NULL).<br /><br />WebDriver Protocol command. More details can be found in the [official protocol docs](https://w3c.github.io/webdriver/#dfn-element-send-keys).

:::info

This protocol command is embedded in the following convenient methods: [addValue](/docs/api/element/addValue), [setValue](/docs/api/element/setValue). It is recommended to use these commands instead.

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
The Get Page Source command returns a string serialization of the DOM of the current browsing context active document.<br /><br />WebDriver Protocol command. More details can be found in the [official protocol docs](https://w3c.github.io/webdriver/#dfn-get-page-source).

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
The Execute Script command executes a JavaScript function in the context of the current browsing context and returns the return value of the function.<br /><br />WebDriver Protocol command. More details can be found in the [official protocol docs](https://w3c.github.io/webdriver/#dfn-execute-script).

:::info

This protocol command is embedded in the following convenient method: [execute](/docs/api/browser/execute). It is recommended to use this command instead.

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
The Execute Async Script command causes JavaScript to execute as an anonymous function. Unlike the Execute Script command, the result of the function is ignored. Instead an additional argument is provided as the final argument to the function. This is a function that, when called, returns its first argument as the response.<br /><br />WebDriver Protocol command. More details can be found in the [official protocol docs](https://w3c.github.io/webdriver/#dfn-execute-async-script).

:::info

This protocol command is embedded in the following convenient method: [executeAsync](/docs/api/browser/executeAsync). It is recommended to use this command instead.

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
The Get All Cookies command returns all cookies associated with the address of the current browsing context's active document.<br /><br />WebDriver Protocol command. More details can be found in the [official protocol docs](https://w3c.github.io/webdriver/#dfn-get-all-cookies).

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
The Add Cookie command adds a single cookie to the cookie store associated with the active document's address.<br /><br />WebDriver Protocol command. More details can be found in the [official protocol docs](https://w3c.github.io/webdriver/#dfn-adding-a-cookie).

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
The Delete All Cookies command allows deletion of all cookies associated with the active document's address.<br /><br />WebDriver Protocol command. More details can be found in the [official protocol docs](https://w3c.github.io/webdriver/#dfn-delete-all-cookies).

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
The Get Named Cookie command returns the cookie with the requested name from the associated cookies in the cookie store of the current browsing context's active document. If no cookie is found, a no such cookie error is returned.<br /><br />WebDriver Protocol command. More details can be found in the [official protocol docs](https://w3c.github.io/webdriver/#dfn-get-named-cookie).

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
The Delete Cookie command allows you to delete either a single cookie by parameter name, or all the cookies associated with the active document's address if name is undefined.<br /><br />WebDriver Protocol command. More details can be found in the [official protocol docs](https://w3c.github.io/webdriver/#dfn-delete-cookie).

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
The Perform Actions command is used to execute complex user actions. See [spec](https://github.com/jlipps/simple-wd-spec#perform-actions) for more details.<br /><br />WebDriver Protocol command. More details can be found in the [official protocol docs](https://w3c.github.io/webdriver/#dfn-perform-actions).

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
The Release Actions command is used to release all the keys and pointer buttons that are currently depressed. This causes events to be fired as if the state was released by an explicit series of actions. It also clears all the internal state of the virtual devices.<br /><br />WebDriver Protocol command. More details can be found in the [official protocol docs](https://w3c.github.io/webdriver/#dfn-release-actions).

##### Usage

```js
browser.releaseActions()
```



---

## dismissAlert
The Dismiss Alert command dismisses a simple dialog if present, otherwise error. A request to dismiss an alert user prompt, which may not necessarily have a dismiss button, has the same effect as accepting it.<br /><br />WebDriver Protocol command. More details can be found in the [official protocol docs](https://w3c.github.io/webdriver/#dfn-dismiss-alert).

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
The Accept Alert command accepts a simple dialog if present, otherwise error.<br /><br />WebDriver Protocol command. More details can be found in the [official protocol docs](https://w3c.github.io/webdriver/#dfn-accept-alert).

##### Usage

```js
browser.acceptAlert()
```



---

## getAlertText
The Get Alert Text command returns the message of the current user prompt. If there is no current user prompt, it returns an error.<br /><br />WebDriver Protocol command. More details can be found in the [official protocol docs](https://w3c.github.io/webdriver/#dfn-get-alert-text).

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
The Send Alert Text command sets the text field of a window.prompt user prompt to the given value.<br /><br />WebDriver Protocol command. More details can be found in the [official protocol docs](https://w3c.github.io/webdriver/#dfn-send-alert-text).

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
The Take Screenshot command takes a screenshot of the top-level browsing context's viewport.<br /><br />WebDriver Protocol command. More details can be found in the [official protocol docs](https://w3c.github.io/webdriver/#dfn-take-screenshot).

##### Usage

```js
browser.takeScreenshot()
```


##### Returns

- **&lt;string&gt;**
            **<code><var>screenshot</var></code>:** The base64-encoded PNG image data comprising the screenshot of the initial viewport.


---

## takeElementScreenshot
The Take Element Screenshot command takes a screenshot of the visible region encompassed by the bounding rectangle of an element.<br /><br />WebDriver Protocol command. More details can be found in the [official protocol docs](https://w3c.github.io/webdriver/#dfn-take-element-screenshot).

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
Get the computed WAI-ARIA role of an element.<br /><br />WebDriver Protocol command. More details can be found in the [official protocol docs](https://w3c.github.io/webdriver/#get-computed-role).

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
Get the accessible name of the element.<br /><br />WebDriver Protocol command. More details can be found in the [official protocol docs](https://w3c.github.io/webdriver/#get-computed-label).

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
Simulates user modification of a PermissionDescriptor's permission state. __Note:__ this feature has not landed in all browsers yet.<br /><br />WebDriver Protocol command. More details can be found in the [official protocol docs](https://w3c.github.io/permissions/#set-permission-command).

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
Generates a report for testing. Extension for [Reporting API](https://developers.google.com/web/updates/2018/09/reportingapi). __Note:__ this feature has not landed in all browsers yet.<br /><br />WebDriver Protocol command. More details can be found in the [official protocol docs](https://w3c.github.io/reporting/#automation).

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
Creates a mock sensor to emulate sensors like Ambient Light Sensor. __Note:__ this feature has not landed in all browsers yet.<br /><br />WebDriver Protocol command. More details can be found in the [official protocol docs](https://w3c.github.io/sensors/#create-mock-sensor-command).

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
Retrieves information about a given type of mock sensor. __Note:__ this feature has not landed in all browsers yet.<br /><br />WebDriver Protocol command. More details can be found in the [official protocol docs](https://w3c.github.io/sensors/#get-mock-sensor-command).

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
Updates the mock sensor type. __Note:__ this feature has not landed in all browsers yet.<br /><br />WebDriver Protocol command. More details can be found in the [official protocol docs](https://w3c.github.io/sensors/#update-mock-sensor-reading-command).

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
The Delete Session command closes any top-level browsing contexts associated with the current session, terminates the connection, and finally closes the current session. __Note:__ this feature has not landed in all browsers yet.<br /><br />WebDriver Protocol command. More details can be found in the [official protocol docs](https://w3c.github.io/sensors/#delete-mock-sensor-command).

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
Simulates the changing of a time zone for the purposes of testing. __Note:__ this feature has not landed in all browsers yet.<br /><br />WebDriver Protocol command. More details can be found in the [official protocol docs](https://w3c.github.io/sensors/#create-mock-sensor-command).

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
Creates a software [Virtual Authenticator](https://www.w3.org/TR/webauthn-2/#virtual-authenticators).<br /><br />WebDriver Protocol command. More details can be found in the [official protocol docs](https://www.w3.org/TR/webauthn-2/#sctn-automation-add-virtual-authenticator).

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
Removes a previously created Virtual Authenticator.<br /><br />WebDriver Protocol command. More details can be found in the [official protocol docs](https://www.w3.org/TR/webauthn-2/#sctn-automation-remove-virtual-authenticator).

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
Injects a Public Key Credential Source into an existing Virtual Authenticator.<br /><br />WebDriver Protocol command. More details can be found in the [official protocol docs](https://www.w3.org/TR/webauthn-2/#sctn-automation-add-credential).

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
Returns one Credential Parameters object for every Public Key Credential Source stored in a Virtual Authenticator, regardless of whether they were stored using Add Credential or `navigator.credentials.create()`.<br /><br />WebDriver Protocol command. More details can be found in the [official protocol docs](https://www.w3.org/TR/webauthn-2/#sctn-automation-get-credentials).

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
Removes all Public Key Credential Sources stored on a Virtual Authenticator.<br /><br />WebDriver Protocol command. More details can be found in the [official protocol docs](https://www.w3.org/TR/webauthn-2/#sctn-automation-remove-all-credentials).

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
Removes a Public Key Credential Source stored on a Virtual Authenticator.<br /><br />WebDriver Protocol command. More details can be found in the [official protocol docs](https://www.w3.org/TR/webauthn-2/#sctn-automation-remove-credential).

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
The Set User Verified extension command sets the isUserVerified property on the Virtual Authenticator.<br /><br />WebDriver Protocol command. More details can be found in the [official protocol docs](https://www.w3.org/TR/webauthn-2/#sctn-automation-set-user-verified).

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


