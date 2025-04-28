---
id: chromium
title: Chromium
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-protocols/src/protocols/chromium.ts
---

## isAlertOpen
Whether a simple dialog is currently open.<br /><br />Non official and undocumented Chromium command. More about this command can be found [here](https://github.com/bayandin/chromedriver/blob/v2.45/alert_commands.cc#L42-L49).

##### Usage

```js
browser.isAlertOpen()
```

##### Example


```js
console.log(browser.isAlertOpen()); // outputs: false
browser.execute('window.alert()');
console.log(browser.isAlertOpen()); // outputs: true
```


##### Returns

- **&lt;Boolean&gt;**
            **<code><var>isAlertOpen</var></code>:** `true` or `false` based on whether simple dialog is present or not.


---

## isAutoReporting
Whether it should automatically raises errors on browser logs.<br /><br />Non official and undocumented Chromium command. More about this command can be found [here](https://codereview.chromium.org/101203012).

##### Usage

```js
browser.isAutoReporting()
```


##### Returns

- **&lt;Boolean&gt;**
            **<code><var>isAutoReporting</var></code>:** `true` or `false` based on whether auto reporting is enabled.


---

## setAutoReporting
Toggle whether to return response with unknown error with first browser error (e.g. failed to load resource due to 403/404 response) for all subsequent commands (once enabled).<br /><br />Non official and undocumented Chromium command. More about this command can be found [here](https://codereview.chromium.org/101203012).

##### Usage

```js
browser.setAutoReporting(enabled)
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
      <td><code><var>enabled</var></code></td>
      <td>boolean</td>
      <td>`true` if auto reporting should be enabled, use `false` to disable previously enabled auto reporting.</td>
    </tr>
  </tbody>
</table>

##### Examples


```js
// Enable auto reporting first thing after session was initiated with empty browser logs
console.log(browser.setAutoReporting(true)); // outputs: null
// Upon requesting an non-existing resource it will abort execution due to thrown unknown error
browser.url('https://webdriver.io/img/404-does-not-exist.png');
```


```js
// During the session do some operations which populate the browser logs
browser.url('https://webdriver.io/img/404-does-not-exist.png');
browser.url('https://webdriver.io/403/no-access');
// Enable auto reporting which throws an unknown error for first browser log (404 response)
browser.setAutoReporting(true);
```


##### Returns

- **&lt;Object|Null&gt;**
            **<code><var>firstBrowserError</var></code>:** In case first browser error already occured prior to executing this command it will throw unknown error as response, which is an object with 'message' key describing first browser error. Otherwise it returns `null` on success.


---

## isLoading
Determines load status for active window handle.<br /><br />Non official and undocumented Chromium command. More about this command can be found [here](https://github.com/bayandin/chromedriver/blob/v2.45/session_commands.cc#L783-L802).

##### Usage

```js
browser.isLoading()
```

##### Example


```js
console.log(browser.isLoading()); // outputs: false
browser.newWindow('https://webdriver.io');
console.log(browser.isLoading()); // outputs: true
```


##### Returns

- **&lt;Boolean&gt;**
            **<code><var>isLoading</var></code>:** `true` or `false` based on whether active window handle is loading or not.


---

## takeHeapSnapshot
Takes a heap snapshot of the current execution context.<br /><br />Non official and undocumented Chromium command. More about this command can be found [here](https://github.com/bayandin/chromedriver/blob/v2.45/chrome/web_view.h#L198-L202).

##### Usage

```js
browser.takeHeapSnapshot()
```


##### Returns

- **&lt;Object&gt;**
            **<code><var>heapSnapshot</var></code>:** A JSON representation of the heap snapshot. Which can be inspected by loading as file into Chrome DevTools.


---

## getNetworkConnection
Get the connection type for network emulation. This command is only applicable when remote end replies with `networkConnectionEnabled` capability set to `true`.<br /><br />Non official and undocumented Chromium command. More about this command can be found [here](https://github.com/SeleniumHQ/mobile-spec/blob/master/spec-draft.md#device-modes).

##### Usage

```js
browser.getNetworkConnection()
```

##### Example


```js
const browser = remote({
    capabilities: {
        browserName: 'chrome',
        'goog:chromeOptions': {
            // Network emulation requires device mode, which is only enabled when mobile emulation is on
            mobileEmulation: { deviceName: 'iPad' },
        },
    }
});
console.log(browser.getNetworkConnection()); // outputs: 6 (Both Wi-Fi and data)
```


##### Returns

- **&lt;Number&gt;**
            **<code><var>connectionType</var></code>:** A bitmask to represent the network connection type. Airplane Mode (`1`), Wi-Fi only (`2`), Wi-Fi and data (`6`), 4G (`8`), 3G (`10`), 2G (`20`). By default [Wi-Fi and data are enabled](https://github.com/bayandin/chromedriver/blob/v2.45/chrome/chrome_desktop_impl.cc#L36-L37).


---

## setNetworkConnection
Change connection type for network connection. This command is only applicable when remote end replies with `networkConnectionEnabled` capability set to `true`.<br /><br />Non official and undocumented Chromium command. More about this command can be found [here](https://github.com/SeleniumHQ/mobile-spec/blob/master/spec-draft.md#device-modes).

##### Usage

```js
browser.setNetworkConnection(parameters)
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
      <td><code><var>parameters</var></code></td>
      <td>object</td>
      <td>Object containing ConnectionType, set bitmask as value for `type` key in object. Airplane Mode (`1`), Wi-Fi only (`2`), Wi-Fi and data (`6`), 4G (`8`), 3G (`10`), 2G (`20`).</td>
    </tr>
  </tbody>
</table>

##### Example


```js
const browser = remote({
    capabilities: {
        browserName: 'chrome',
        'goog:chromeOptions': {
            // Network emulation requires device mode, which is only enabled when mobile emulation is on
            mobileEmulation: { deviceName: 'iPad' },
        },
    }
});
console.log(browser.setNetworkConnection({ type: 1 })); // outputs: 1 (Airplane Mode)
```


##### Returns

- **&lt;Number&gt;**
            **<code><var>connectionType</var></code>:** A bitmask to represent the network connection type. Value should match specified `type` in object, however device might not be capable of the network connection type requested.


---

## getNetworkConditions
Get current network conditions used for emulation.<br /><br />Non official and undocumented Chromium command. More about this command can be found [here](https://github.com/bayandin/chromedriver/blob/v2.45/session_commands.cc#L839-L859).

##### Usage

```js
browser.getNetworkConditions()
```


##### Returns

- **&lt;Object&gt;**
            **<code><var>networkConditions</var></code>:** Object containing network conditions for `offline`, `latency`, `download_throughput` and `upload_throughput`. Network conditions must be set before it can be retrieved.


---

## setNetworkConditions
Set network conditions used for emulation by throttling connection.<br /><br />Non official and undocumented Chromium command. More about this command can be found [here](https://github.com/bayandin/chromedriver/blob/v2.45/window_commands.cc#L1663-L1722).

##### Usage

```js
browser.setNetworkConditions(network_conditions, network_name)
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
      <td><code><var>network_conditions</var></code></td>
      <td>object</td>
      <td>Object containing network conditions which are `latency`, `throughput` (or `download_throughput`/`upload_throughput`) and `offline` (optional).</td>
    </tr>
    <tr>
      <td><code><var>network_name</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>string</td>
      <td>Name of [network throttling preset](https://github.com/bayandin/chromedriver/blob/v2.45/chrome/network_list.cc#L12-L25). `GPRS`, `Regular 2G`, `Good 2G`, `Regular 3G`, `Good 3G`, `Regular 4G`, `DSL`, `WiFi` or `No throttling` to disable. When preset is specified values passed in first argument are not respected.</td>
    </tr>
  </tbody>
</table>

##### Examples


```js
// Use different download (25kb/s) and upload (50kb/s) throughput values for throttling with a latency of 1000ms
browser.setNetworkConditions({ latency: 1000, download_throughput: 25600, upload_throughput: 51200 });
```


```js
// Force disconnected from network by setting 'offline' to true
browser.setNetworkConditions({ latency: 0, throughput: 0, offline: true });
```


```js
// When preset name (e.g. 'DSL') is specified it does not respect values in object (e.g. 'offline')
browser.setNetworkConditions({ latency: 0, throughput: 0, offline: true }, 'DSL');
```


```js
// Best practice for specifying network throttling preset is to use an empty object
browser.setNetworkConditions({}, 'Good 3G');
```



---

## deleteNetworkConditions
Disable any network throttling which might have been set. Equivalent of setting the `No throttling` preset.<br /><br />Non official and undocumented Chromium command. More about this command can be found [here](https://github.com/bayandin/chromedriver/blob/v2.45/window_commands.cc#L1724-L1745).

##### Usage

```js
browser.deleteNetworkConditions()
```



---

## sendCommand
Send a command to the DevTools debugger.<br />For a list of available commands and their parameters refer to the [Chrome DevTools Protocol Viewer](https://chromedevtools.github.io/devtools-protocol/).<br /><br />Non official and undocumented Chromium command. More about this command can be found [here](https://github.com/bayandin/chromedriver/blob/v2.45/window_commands.cc#L1290-L1304).

##### Usage

```js
browser.sendCommand(cmd, params)
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
      <td><code><var>cmd</var></code></td>
      <td>string</td>
      <td>Name of the command (e.g. [`Browser.close`](https://chromedevtools.github.io/devtools-protocol/1-3/Browser#method-close)).</td>
    </tr>
    <tr>
      <td><code><var>params</var></code></td>
      <td>object</td>
      <td>Parameters to the command. In case no parameters for command, specify an empty object.</td>
    </tr>
  </tbody>
</table>



---

## sendCommandAndGetResult
Send a command to the DevTools debugger and wait for the result.<br />For a list of available commands and their parameters refer to the [Chrome DevTools Protocol Viewer](https://chromedevtools.github.io/devtools-protocol/).<br /><br />Non official and undocumented Chromium command. More about this command can be found [here](https://github.com/bayandin/chromedriver/blob/v2.45/window_commands.cc#L1306-L1320).

##### Usage

```js
browser.sendCommandAndGetResult(cmd, params)
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
      <td><code><var>cmd</var></code></td>
      <td>string</td>
      <td>Name of the command which returns a result (e.g. [`Network.getAllCookies`](https://chromedevtools.github.io/devtools-protocol/1-3/Network#method-getAllCookies)).</td>
    </tr>
    <tr>
      <td><code><var>params</var></code></td>
      <td>object</td>
      <td>Parameters to the command. In case no parameters for command, specify an empty object.</td>
    </tr>
  </tbody>
</table>


##### Returns

- **&lt;*&gt;**
            **<code><var>result</var></code>:** Either the return value of your command, or the error which was the reason for your command's failure.


---

## file
Upload a file to remote machine on which the browser is running.<br /><br />Non official and undocumented Chromium command. More about this command can be found [here](https://github.com/bayandin/chromedriver/blob/v2.45/session_commands.cc#L1037-L1065).

##### Usage

```js
browser.file(file)
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
      <td><code><var>file</var></code></td>
      <td>string</td>
      <td>Base64-encoded zip archive containing __single__ file which to upload. In case base64-encoded data does not represent a zip archive or archive contains more than one file it will throw an unknown error.</td>
    </tr>
  </tbody>
</table>


##### Returns

- **&lt;String&gt;**
            **<code><var>path</var></code>:** Absolute path of uploaded file on remote machine.


---

## launchChromeApp
Launches a Chrome app by specified id.<br /><br />Non official and undocumented Chromium command. More about this command can be found [here](https://github.com/bayandin/chromedriver/blob/v2.45/session_commands.cc#L521-L539).

##### Usage

```js
browser.launchChromeApp(id)
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
      <td>string</td>
      <td>Extension id of app to be launched, as defined in chrome://extensions.</td>
    </tr>
  </tbody>
</table>

##### Example


```js
import fs from 'fs'
const browser = remote({
    capabilities: {
        browserName: 'chrome',
        'goog:chromeOptions': {
            // Install upon starting browser in order to launch it
            extensions: [
              // Entry should be a base64-encoded packed Chrome app (.crx)
              fs.readFileSync('/absolute/path/app.crx').toString('base64')
            ]
        }
    }
});
browser.launchChromeApp('aohghmighlieiainnegkcijnfilokake')); // Google Docs (https://chrome.google.com/webstore/detail/docs/aohghmighlieiainnegkcijnfilokake)
```



---

## getElementValue
Retrieves the value of a given form control element.<br /><br />Non official and undocumented Chromium command. More about this command can be found [here](https://github.com/bayandin/chromedriver/blob/v2.45/element_commands.cc#L431-L443).

##### Usage

```js
browser.getElementValue(elementId)
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
      <td>id of element to get value from</td>
    </tr>
  </tbody>
</table>


##### Returns

- **&lt;String|Null&gt;**
            **<code><var>value</var></code>:** Current value of the element. In case specified element is not a form control element, it will return `null`.


---

## elementHover
Enable hover state for an element, which is reset upon next interaction.<br /><br />Non official and undocumented Chromium command. More about this command can be found [here](https://github.com/bayandin/chromedriver/blob/v2.45/element_commands.cc#L126-L146).

##### Usage

```js
browser.elementHover(elementId)
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
      <td>id of element to hover over to</td>
    </tr>
  </tbody>
</table>



---

## touchPinch
Trigger a pinch zoom effect.<br /><br />Non official and undocumented Chromium command. More about this command can be found [here](https://github.com/bayandin/chromedriver/blob/v2.45/window_commands.cc#L813-L827).

##### Usage

```js
browser.touchPinch(x, y, scale)
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
      <td>number</td>
      <td>x position to pinch on</td>
    </tr>
    <tr>
      <td><code><var>y</var></code></td>
      <td>number</td>
      <td>y position to pinch on</td>
    </tr>
    <tr>
      <td><code><var>scale</var></code></td>
      <td>number</td>
      <td>pinch zoom scale</td>
    </tr>
  </tbody>
</table>



---

## freeze
Freeze the current page. Extension for [Page Lifecycle API](https://developers.google.com/web/updates/2018/07/page-lifecycle-api).<br /><br />Non official and undocumented Chromium command. More about this command can be found [here](https://github.com/bayandin/chromedriver/blob/v2.45/window_commands.cc#L625-L633).

##### Usage

```js
browser.freeze()
```



---

## resume
Resume the current page. Extension for [Page Lifecycle API](https://developers.google.com/web/updates/2018/07/page-lifecycle-api).<br /><br />Non official and undocumented Chromium command. More about this command can be found [here](https://github.com/bayandin/chromedriver/blob/v2.45/window_commands.cc#L635-L645).

##### Usage

```js
browser.resume()
```



---

## getCastSinks
Returns the list of cast sinks (Cast devices) available to the Chrome media router.<br /><br />Non official and undocumented Chromium command. More about this command can be found [here](https://chromium.googlesource.com/chromium/src/+/refs/tags/73.0.3683.121/chrome/test/chromedriver/server/http_handler.cc#748).

##### Usage

```js
browser.getCastSinks()
```


##### Returns

- **&lt;string[]&gt;**
            **<code><var>sinks</var></code>:** List of available sinks.


---

## selectCastSink
Selects a cast sink (Cast device) as the recipient of media router intents (connect or play).<br /><br />Non official and undocumented Chromium command. More about this command can be found [here](https://chromium.googlesource.com/chromium/src/+/refs/tags/73.0.3683.121/chrome/test/chromedriver/server/http_handler.cc#737).

##### Usage

```js
browser.selectCastSink(sinkName)
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
      <td><code><var>sinkName</var></code></td>
      <td>string</td>
      <td>The name of the target device.</td>
    </tr>
  </tbody>
</table>



---

## startCastTabMirroring
Initiates tab mirroring for the current browser tab on the specified device.<br /><br />Non official and undocumented Chromium command. More about this command can be found [here](https://chromium.googlesource.com/chromium/src/+/refs/tags/73.0.3683.121/chrome/test/chromedriver/server/http_handler.cc#741).

##### Usage

```js
browser.startCastTabMirroring(sinkName)
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
      <td><code><var>sinkName</var></code></td>
      <td>string</td>
      <td>The name of the target device.</td>
    </tr>
  </tbody>
</table>



---

## getCastIssueMessage
Returns error message if there is any issue in a Cast session.<br /><br />Non official and undocumented Chromium command. More about this command can be found [here](https://chromium.googlesource.com/chromium/src/+/refs/tags/73.0.3683.121/chrome/test/chromedriver/server/http_handler.cc#751).

##### Usage

```js
browser.getCastIssueMessage()
```


##### Returns

- **&lt;String&gt;**
            **<code><var>message</var></code>:** Error message, if any.


---

## stopCasting
Stops casting from media router to the specified device, if connected.<br /><br />Non official and undocumented Chromium command. More about this command can be found [here](https://chromium.googlesource.com/chromium/src/+/refs/tags/73.0.3683.121/chrome/test/chromedriver/server/http_handler.cc#744).

##### Usage

```js
browser.stopCasting(sinkName)
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
      <td><code><var>sinkName</var></code></td>
      <td>string</td>
      <td>The name of the target device.</td>
    </tr>
  </tbody>
</table>



---

## shutdown
Shutdown ChromeDriver process and consequently terminating all active sessions.<br /><br />Non official and undocumented Chromium command. More about this command can be found [here](https://github.com/bayandin/chromedriver/blob/v2.45/session_commands.cc#L489-L498).

##### Usage

```js
browser.shutdown()
```



---

## takeElementScreenshot
The Take Element Screenshot command takes a screenshot of the visible region encompassed by the bounding rectangle of an element.<br /><br />Non official and undocumented Chromium command. More about this command can be found [here](https://w3c.github.io/webdriver/#dfn-take-element-screenshot).

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

- **&lt;String&gt;**
            **<code><var>screenshot</var></code>:** The base64-encoded PNG image data comprising the screenshot of the visible region of an element's bounding rectangle after it has been scrolled into view.


---

## getLogTypes
Get available log types.<br /><br />Non official and undocumented Chromium command. More about this command can be found [here](https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#sessionsessionidlogtypes).

##### Usage

```js
browser.getLogTypes()
```


##### Returns

- **&lt;String[]&gt;**
            **<code><var>logTypes</var></code>:** The list of available log types, example: browser, driver.


---

## getLogs
Get the log for a given log type. Log buffer is reset after each request.<br /><br />Non official and undocumented Chromium command. More about this command can be found [here](https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#sessionsessionidlog).

##### Usage

```js
browser.getLogs(type)
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
      <td>the log type</td>
    </tr>
  </tbody>
</table>


##### Returns

- **&lt;Object[]&gt;**
            **<code><var>logs</var></code>:** The list of log entries.