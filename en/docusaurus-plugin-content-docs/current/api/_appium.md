---
id: appium
title: Appium
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-protocols/src/protocols/appium.ts
---

## getAppiumContext
Appium command. More details can be found in the [official protocol docs](https://github.com/SeleniumHQ/mobile-spec/blob/master/spec-draft.md#webviews-and-other-contexts).

##### Usage

```js
driver.getAppiumContext()
```


##### Returns

- **&lt;Context&gt;**
            **<code><var>context</var></code>:** a string representing the current context or null representing 'no context'


---

## switchAppiumContext
Appium command. More details can be found in the [official protocol docs](https://github.com/SeleniumHQ/mobile-spec/blob/master/spec-draft.md#webviews-and-other-contexts).

##### Usage

```js
driver.switchAppiumContext(name)
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
      <td>string</td>
      <td>a string representing an available context</td>
    </tr>
  </tbody>
</table>



---

## getAppiumContexts
Appium command. More details can be found in the [official protocol docs](https://github.com/SeleniumHQ/mobile-spec/blob/master/spec-draft.md#webviews-and-other-contexts).

##### Usage

```js
driver.getAppiumContexts()
```


##### Returns

- **&lt;Context[]&gt;**
            **<code><var>contexts</var></code>:** an array of strings representing available contexts, e.g. 'WEBVIEW', or 'NATIVE'


---

## shake
Perform a shake action on the device.<br /><br />Appium command. More details can be found in the [official protocol docs](https://appium.github.io/appium.io/docs/en/commands/device/interactions/shake/).

##### Usage

```js
driver.shake()
```




##### Support

![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)

---

## lock
Lock the device.<br /><br />Appium command. More details can be found in the [official protocol docs](https://appium.github.io/appium.io/docs/en/commands/device/interactions/lock/).

##### Usage

```js
driver.lock(seconds)
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
      <td><code><var>seconds</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>number</td>
      <td>how long to lock the screen (iOS only)</td>
    </tr>
  </tbody>
</table>


##### Support

![Support for UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for Windows (10+)](/img/icons/windows.svg)

---

## unlock
Unlock the device.<br /><br />Appium command. More details can be found in the [official protocol docs](https://appium.github.io/appium.io/docs/en/commands/device/interactions/unlock/).

##### Usage

```js
driver.unlock()
```




##### Support

![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for Windows (10+)](/img/icons/windows.svg)

---

## isLocked
Check whether the device is locked or not.<br /><br />Appium command. More details can be found in the [official protocol docs](https://appium.github.io/appium.io/docs/en/commands/device/interactions/is-locked/).

##### Usage

```js
driver.isLocked()
```


##### Returns

- **&lt;boolean&gt;**
            **<code><var>isLocked</var></code>:** True if the device is locked, false if not

##### Support

![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for Windows (10+)](/img/icons/windows.svg)

---

## startRecordingScreen
Start recording the screen.<br /><br />Appium command. More details can be found in the [official protocol docs](https://appium.github.io/appium.io/docs/en/commands/device/recording-screen/start-recording-screen/).

##### Usage

```js
driver.startRecordingScreen(options)
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
      <td><code><var>options</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>object</td>
      <td>command parameters that can contain keys like: remotePath, username, password, method, forceRestart, timeLimit, videoType, videoQuality, videoFps, bitRate, videoSize, bugReport (see more description in Appium docs)</td>
    </tr>
  </tbody>
</table>


##### Support

![Support for XCUITest (9.3+)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for Windows (10+)](/img/icons/windows.svg)

---

## stopRecordingScreen
Stop recording screen<br /><br />Appium command. More details can be found in the [official protocol docs](https://appium.github.io/appium.io/docs/en/commands/device/recording-screen/stop-recording-screen/).

##### Usage

```js
driver.stopRecordingScreen(remotePath, username, password, method)
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
      <td><code><var>remotePath</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>string</td>
      <td>The path to the remote location, where the resulting video should be uploaded. The following protocols are supported http/https, ftp. This option only has an effect if there is screen recording process in progreess and forceRestart parameter is not set to true. Null or empty string value (the default setting) means the content of resulting file should be encoded as Base64.</td>
    </tr>
    <tr>
      <td><code><var>username</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>string</td>
      <td>The name of the user for the remote authentication.</td>
    </tr>
    <tr>
      <td><code><var>password</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>string</td>
      <td>The password for the remote authentication.</td>
    </tr>
    <tr>
      <td><code><var>method</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>string</td>
      <td>The http multipart upload method name. The 'PUT' one is used by default.</td>
    </tr>
  </tbody>
</table>


##### Returns

- **&lt;string&gt;**
            **<code><var>response</var></code>:** Base64 encoded string. If remote_path is set, the response is empty string

##### Support

![Support for XCUITest (9.3+)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for Windows (10+)](/img/icons/windows.svg)

---

## getPerformanceDataTypes
Returns the information types of the system state which is supported to read as like cpu, memory, network traffic, and battery.<br /><br />Appium command. More details can be found in the [official protocol docs](https://appium.github.io/appium.io/docs/en/commands/device/performance-data/performance-data-types/).

##### Usage

```js
driver.getPerformanceDataTypes()
```


##### Returns

- **&lt;string[]&gt;**
            **<code><var>performanceTypes</var></code>:** The available performance data types (cpuinfo|batteryinfo|networkinfo|memoryinfo)

##### Support

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## getPerformanceData
Returns the information of the system state which is supported to read as like cpu, memory, network traffic, and battery.<br /><br />Appium command. More details can be found in the [official protocol docs](https://appium.github.io/appium.io/docs/en/commands/device/performance-data/get-performance-data/).

##### Usage

```js
driver.getPerformanceData(packageName, dataType, dataReadTimeout)
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
      <td><code><var>packageName</var></code></td>
      <td>string</td>
      <td>the package name of the application</td>
    </tr>
    <tr>
      <td><code><var>dataType</var></code></td>
      <td>string</td>
      <td>the type of system state which wants to read. It should be one of the supported performance data types</td>
    </tr>
    <tr>
      <td><code><var>dataReadTimeout</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>number</td>
      <td>the number of attempts to read</td>
    </tr>
  </tbody>
</table>


##### Returns

- **&lt;string[]&gt;**
            **<code><var>performanceData</var></code>:** The information type of the system state which is supported to read as like cpu, memory, network traffic, and battery

##### Support

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## pressKeyCode
Press a particular key on the device.<br /><br />Appium command. More details can be found in the [official protocol docs](https://appium.github.io/appium.io/docs/en/commands/device/keys/press-keycode/).

##### Usage

```js
driver.pressKeyCode(keycode, metastate, flags)
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
      <td><code><var>keycode</var></code></td>
      <td>number</td>
      <td>keycode to press</td>
    </tr>
    <tr>
      <td><code><var>metastate</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>number</td>
      <td>meta state to press the keycode with</td>
    </tr>
    <tr>
      <td><code><var>flags</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>number</td>
      <td>flags for the keypress</td>
    </tr>
  </tbody>
</table>


##### Support

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## longPressKeyCode
Press and hold a particular key code on the device.<br /><br />Appium command. More details can be found in the [official protocol docs](https://appium.github.io/appium.io/docs/en/commands/device/keys/long-press-keycode/).

##### Usage

```js
driver.longPressKeyCode(keycode, metastate, flags)
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
      <td><code><var>keycode</var></code></td>
      <td>number</td>
      <td>keycode to press on the device</td>
    </tr>
    <tr>
      <td><code><var>metastate</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>number</td>
      <td>metastate for the keypress</td>
    </tr>
    <tr>
      <td><code><var>flags</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>number</td>
      <td>flags for the keypress</td>
    </tr>
  </tbody>
</table>


##### Support

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## sendKeyEvent
Send a key code to the device.<br /><br />Appium command. More details can be found in the [official protocol docs](https://github.com/appium/appium-base-driver/blob/master/docs/mjsonwp/protocol-methods.md#appium-extension-endpoints).

##### Usage

```js
driver.sendKeyEvent(keycode, metastate)
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
      <td><code><var>keycode</var></code></td>
      <td>string</td>
      <td>keycode to press</td>
    </tr>
    <tr>
      <td><code><var>metastate</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>string</td>
      <td>meta state to press the keycode with</td>
    </tr>
  </tbody>
</table>


##### Support

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## rotateDevice
Rotate the device in three dimensions.<br /><br />Appium command. More details can be found in the [official protocol docs](https://github.com/SeleniumHQ/mobile-spec/blob/master/spec-draft.md#device-rotation).

##### Usage

```js
driver.rotateDevice(x, y, z)
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
      <td>x offset to use for the center of the rotate gesture</td>
    </tr>
    <tr>
      <td><code><var>y</var></code></td>
      <td>number</td>
      <td>y offset to use for the center of the rotate gesture</td>
    </tr>
    <tr>
      <td><code><var>z</var></code></td>
      <td>number</td>
      <td>z offset to use for the center of the rotate gesture</td>
    </tr>
  </tbody>
</table>


##### Support

![Support for UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## getCurrentActivity
Get the name of the current Android activity.<br /><br />Appium command. More details can be found in the [official protocol docs](https://appium.github.io/appium.io/docs/en/commands/device/activity/current-activity/).

##### Usage

```js
driver.getCurrentActivity()
```


##### Returns

- **&lt;string&gt;**
            **<code><var>activity</var></code>:** Name of the current activity

##### Support

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## getCurrentPackage
Get the name of the current Android package.<br /><br />Appium command. More details can be found in the [official protocol docs](https://appium.github.io/appium.io/docs/en/commands/device/activity/current-package/).

##### Usage

```js
driver.getCurrentPackage()
```


##### Returns

- **&lt;string&gt;**
            **<code><var>package</var></code>:** Name of the current package

##### Support

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## installApp
Install the given app onto the device.<br /><br />Appium command. More details can be found in the [official protocol docs](https://appium.github.io/appium.io/docs/en/commands/device/app/install-app/).

##### Usage

```js
driver.installApp(appPath)
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
      <td><code><var>appPath</var></code></td>
      <td>string</td>
      <td>path to application .apk file</td>
    </tr>
  </tbody>
</table>


##### Support

![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## activateApp
Activate the given app onto the device<br /><br />Appium command. More details can be found in the [official protocol docs](https://appium.github.io/appium.io/docs/en/commands/device/app/activate-app/).

##### Usage

```js
driver.activateApp(appId)
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
      <td><code><var>appId</var></code></td>
      <td>string</td>
      <td>App ID (package ID for Android, bundle ID for iOS)</td>
    </tr>
  </tbody>
</table>


##### Support

![Support for XCUITest (9.3+)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## removeApp
Remove an app from the device.<br /><br />Appium command. More details can be found in the [official protocol docs](https://appium.github.io/appium.io/docs/en/commands/device/app/remove-app/).

##### Usage

```js
driver.removeApp(appId)
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
      <td><code><var>appId</var></code></td>
      <td>string</td>
      <td>App ID (package ID for Android, bundle ID for iOS)</td>
    </tr>
  </tbody>
</table>


##### Support

![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## terminateApp
Terminate the given app on the device<br /><br />Appium command. More details can be found in the [official protocol docs](https://appium.github.io/appium.io/docs/en/commands/device/app/terminate-app/).

##### Usage

```js
driver.terminateApp(appId, options)
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
      <td><code><var>appId</var></code></td>
      <td>string</td>
      <td>App ID (package ID for Android, bundle ID for iOS)</td>
    </tr>
    <tr>
      <td><code><var>options</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>object</td>
      <td>Command options. E.g. "timeout": (Only Android) Timeout to retry terminate the app (see more in Appium docs)</td>
    </tr>
  </tbody>
</table>


##### Support

![Support for XCUITest (9.3+)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## isAppInstalled
Check whether the specified app is installed on the device.<br /><br />Appium command. More details can be found in the [official protocol docs](https://appium.github.io/appium.io/docs/en/commands/device/app/is-app-installed/).

##### Usage

```js
driver.isAppInstalled(appId)
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
      <td><code><var>appId</var></code></td>
      <td>string</td>
      <td>App ID (package ID for Android, bundle ID for iOS)</td>
    </tr>
  </tbody>
</table>


##### Returns

- **&lt;boolean&gt;**
            **<code><var>isAppInstalled</var></code>:** Return true if installed, false if not

##### Support

![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## queryAppState
Get the given app status on the device<br /><br />Appium command. More details can be found in the [official protocol docs](https://appium.github.io/appium.io/docs/en/commands/device/app/app-state/).

##### Usage

```js
driver.queryAppState(appId)
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
      <td><code><var>appId</var></code></td>
      <td>string</td>
      <td>App ID (package ID for Android, bundle ID for iOS)</td>
    </tr>
  </tbody>
</table>


##### Returns

- **&lt;number&gt;**
            **<code><var>appStatus</var></code>:** 0 is not installed. 1 is not running. 2 is running in background or suspended. 3 is running in background. 4 is running in foreground

##### Support

![Support for XCUITest (9.3+)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## hideKeyboard
Hide soft keyboard.<br /><br />Appium command. More details can be found in the [official protocol docs](https://appium.github.io/appium.io/docs/en/commands/device/keys/hide-keyboard/).

##### Usage

```js
driver.hideKeyboard(strategy, key, keyCode, keyName)
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
      <td><code><var>strategy</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>string</td>
      <td>hide keyboard strategy (UIAutomation only), available strategies - 'press', 'pressKey', 'swipeDown', 'tapOut', 'tapOutside', 'default'</td>
    </tr>
    <tr>
      <td><code><var>key</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>string</td>
      <td>key value if strategy is 'pressKey'</td>
    </tr>
    <tr>
      <td><code><var>keyCode</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>string</td>
      <td>key code if strategy is 'pressKey'</td>
    </tr>
    <tr>
      <td><code><var>keyName</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>string</td>
      <td>key name if strategy is 'pressKey'</td>
    </tr>
  </tbody>
</table>


##### Support

![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for Windows (10+)](/img/icons/windows.svg)

---

## isKeyboardShown
Whether or not the soft keyboard is shown.<br /><br />Appium command. More details can be found in the [official protocol docs](https://appium.github.io/appium.io/docs/en/commands/device/keys/is-keyboard-shown/).

##### Usage

```js
driver.isKeyboardShown()
```


##### Returns

- **&lt;boolean&gt;**
            **<code><var>isKeyboardShown</var></code>:** True if the keyboard is shown

##### Support

![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for Windows (10+)](/img/icons/windows.svg)

---

## pushFile
Place a file onto the device in a particular place.<br /><br />Appium command. More details can be found in the [official protocol docs](https://appium.github.io/appium.io/docs/en/commands/device/files/push-file/).

##### Usage

```js
driver.pushFile(path, data)
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
      <td><code><var>path</var></code></td>
      <td>string</td>
      <td>path to install the data to</td>
    </tr>
    <tr>
      <td><code><var>data</var></code></td>
      <td>string</td>
      <td>contents of file in base64</td>
    </tr>
  </tbody>
</table>


##### Support

![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for Windows (10+)](/img/icons/windows.svg)

---

## pullFile
Retrieve a file from the device's file system.<br /><br />Appium command. More details can be found in the [official protocol docs](https://appium.github.io/appium.io/docs/en/commands/device/files/pull-file/).

##### Usage

```js
driver.pullFile(path)
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
      <td><code><var>path</var></code></td>
      <td>string</td>
      <td>path on the device to pull file from</td>
    </tr>
  </tbody>
</table>


##### Returns

- **&lt;string&gt;**
            **<code><var>response</var></code>:** Contents of file in base64

##### Support

![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for Windows (10+)](/img/icons/windows.svg)

---

## pullFolder
Retrieve a folder from the device's file system.<br /><br />Appium command. More details can be found in the [official protocol docs](https://appium.github.io/appium.io/docs/en/commands/device/files/pull-folder/).

##### Usage

```js
driver.pullFolder(path)
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
      <td><code><var>path</var></code></td>
      <td>string</td>
      <td>path to an entire folder on the device</td>
    </tr>
  </tbody>
</table>


##### Support

![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for Windows (10+)](/img/icons/windows.svg)

---

## toggleAirplaneMode
Toggle airplane mode on device.<br /><br />Appium command. More details can be found in the [official protocol docs](https://appium.github.io/appium.io/docs/en/commands/device/network/toggle-airplane-mode/).

##### Usage

```js
driver.toggleAirplaneMode()
```




##### Support

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## toggleData
Switch the state of data service.<br /><br />Appium command. More details can be found in the [official protocol docs](https://appium.github.io/appium.io/docs/en/commands/device/network/toggle-data/).

##### Usage

```js
driver.toggleData()
```




##### Support

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## toggleWiFi
Switch the state of the wifi service.<br /><br />Appium command. More details can be found in the [official protocol docs](https://appium.github.io/appium.io/docs/en/commands/device/network/toggle-wifi/).

##### Usage

```js
driver.toggleWiFi()
```




##### Support

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## toggleLocationServices
Switch the state of the location service.<br /><br />Appium command. More details can be found in the [official protocol docs](https://appium.github.io/appium.io/docs/en/commands/device/network/toggle-location-services/).

##### Usage

```js
driver.toggleLocationServices()
```




##### Support

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## toggleNetworkSpeed
Set network speed (Emulator only)<br /><br />Appium command. More details can be found in the [official protocol docs](https://appium.github.io/appium.io/docs/en/commands/device/network/network-speed/).

##### Usage

```js
driver.toggleNetworkSpeed(netspeed)
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
      <td><code><var>netspeed</var></code></td>
      <td>string</td>
      <td>Network type - 'full','gsm', 'edge', 'hscsd', 'gprs', 'umts', 'hsdpa', 'lte', 'evdo'</td>
    </tr>
  </tbody>
</table>


##### Support

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## openNotifications
Open Android notifications (Emulator only).<br /><br />Appium command. More details can be found in the [official protocol docs](https://appium.github.io/appium.io/docs/en/commands/device/system/open-notifications/).

##### Usage

```js
driver.openNotifications()
```




##### Support

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## startActivity
Start an Android activity by providing package name and activity name.<br /><br />Appium command. More details can be found in the [official protocol docs](https://appium.github.io/appium.io/docs/en/commands/device/activity/start-activity/).

##### Usage

```js
driver.startActivity(appPackage, appActivity, appWaitPackage, appWaitActivity, intentAction, intentCategory, intentFlags, optionalIntentArguments, dontStopAppOnReset)
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
      <td><code><var>appPackage</var></code></td>
      <td>string</td>
      <td>name of app</td>
    </tr>
    <tr>
      <td><code><var>appActivity</var></code></td>
      <td>string</td>
      <td>name of activity</td>
    </tr>
    <tr>
      <td><code><var>appWaitPackage</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>string</td>
      <td>name of app to wait for</td>
    </tr>
    <tr>
      <td><code><var>appWaitActivity</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>string</td>
      <td>name of activity to wait for</td>
    </tr>
    <tr>
      <td><code><var>intentAction=android.intent.action.MAIN</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>string</td>
      <td>intent action which will be used to start activity</td>
    </tr>
    <tr>
      <td><code><var>intentCategory=android.intent.category.LAUNCHER</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>string</td>
      <td>intent category which will be used to start activity</td>
    </tr>
    <tr>
      <td><code><var>intentFlags=0x10200000</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>string</td>
      <td>flags that will be used to start activity</td>
    </tr>
    <tr>
      <td><code><var>optionalIntentArguments</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>string</td>
      <td>additional intent arguments that will be used to start activity</td>
    </tr>
    <tr>
      <td><code><var>dontStopAppOnReset</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>string</td>
      <td>doesn’t stop the process of the app under test, before starting the app using adb</td>
    </tr>
  </tbody>
</table>


##### Support

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## getSystemBars
Retrieve visibility and bounds information of the status and navigation bars.<br /><br />Appium command. More details can be found in the [official protocol docs](https://appium.github.io/appium.io/docs/en/commands/device/system/system-bars/).

##### Usage

```js
driver.getSystemBars()
```


##### Returns

- **&lt;object[]&gt;**
            **<code><var>systemBars</var></code>:** Information about visibility and bounds of status and navigation bar

##### Support

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## getDeviceTime
Get the time on the device.<br /><br />Appium command. More details can be found in the [official protocol docs](https://appium.github.io/appium.io/docs/en/commands/device/system/system-time/).

##### Usage

```js
driver.getDeviceTime()
```


##### Returns

- **&lt;string&gt;**
            **<code><var>time</var></code>:** Time on the device

##### Support

![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## getDisplayDensity
Get display density from device.<br /><br />Appium command. More details can be found in the [official protocol docs](https://github.com/appium/appium-base-driver/blob/master/docs/mjsonwp/protocol-methods.md#appium-extension-endpoints).

##### Usage

```js
driver.getDisplayDensity()
```


##### Returns

- **&lt;*&gt;**


##### Support

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## touchId
Simulate a [touch id](https://support.apple.com/en-ca/ht201371) event (iOS Simulator only). To enable this feature, the `allowTouchIdEnroll` desired capability must be set to true and the Simulator must be [enrolled](https://support.apple.com/en-ca/ht201371). When you set allowTouchIdEnroll to true, it will set the Simulator to be enrolled by default. The enrollment state can be [toggled](https://appium.github.io/appium.io/docs/en/commands/device/simulator/toggle-touch-id-enrollment/index.html). This call will only work if Appium process or its parent application (e.g. Terminal.app or Appium.app) has access to Mac OS accessibility in System Preferences > Security & Privacy > Privacy > Accessibility list.<br /><br />Appium command. More details can be found in the [official protocol docs](https://appium.github.io/appium.io/docs/en/commands/device/simulator/touch-id/).

##### Usage

```js
driver.touchId(match)
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
      <td><code><var>match</var></code></td>
      <td>boolean</td>
      <td>are we simulating a successful touch (true) or a failed touch (false)</td>
    </tr>
  </tbody>
</table>


##### Support

![Support for XCUITest (9.3+)](/img/icons/ios.svg)

---

## toggleEnrollTouchId
Toggle the simulator being [enrolled](https://support.apple.com/en-ca/ht201371) to accept touchId (iOS Simulator only). To enable this feature, the `allowTouchIdEnroll` desired capability must be set to true. When `allowTouchIdEnroll` is set to true the Simulator will be enrolled by default, and the 'Toggle Touch ID Enrollment' changes the enrollment state. This call will only work if the Appium process or its parent application (e.g., Terminal.app or Appium.app) has access to Mac OS accessibility in System Preferences > Security & Privacy > Privacy > Accessibility list.<br /><br />Appium command. More details can be found in the [official protocol docs](https://appium.github.io/appium.io/docs/en/commands/device/simulator/toggle-touch-id-enrollment/).

##### Usage

```js
driver.toggleEnrollTouchId(enabled)
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
      <td><code><var>enabled=true</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>boolean</td>
      <td>equals to true if TouchID enrollment should be enabled</td>
    </tr>
  </tbody>
</table>


##### Support

![Support for XCUITest (9.3+)](/img/icons/ios.svg)

---

## launchApp
Launch an app on device.<br /><br />Appium command. More details can be found in the [official protocol docs](https://appium.github.io/appium.io/docs/en/commands/device/app/launch-app/).
:::caution

This protocol command is deprecated<br />For iOS, utilize `driver.execute('mobile: launchApp', { ... })`, and for Android, make use of `driver.execute('mobile: activateApp', { ... })`.
:::

##### Usage

```js
driver.launchApp()
```




##### Support

![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## closeApp
Close an app on device.<br /><br />Appium command. More details can be found in the [official protocol docs](https://appium.github.io/appium.io/docs/en/commands/device/app/close-app/).
:::caution

This protocol command is deprecated<br />Use `driver.execute('mobile: terminateApp', { ... })` instead
:::

##### Usage

```js
driver.closeApp()
```




##### Support

![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## background
Send the currently running app for this session to the background.<br /><br />Appium command. More details can be found in the [official protocol docs](https://appium.github.io/appium.io/docs/en/commands/device/app/background-app/).
:::caution

This protocol command is deprecated<br />Use `driver.execute('mobile: backgroundApp', { ... })` instead
:::

##### Usage

```js
driver.background(seconds)
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
      <td><code><var>seconds=null</var></code></td>
      <td>number, null</td>
      <td>timeout to restore app, if 'null' app won't be restored</td>
    </tr>
  </tbody>
</table>


##### Support

![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## endCoverage
Get test coverage data.<br /><br />Appium command. More details can be found in the [official protocol docs](https://appium.github.io/appium.io/docs/en/commands/device/app/end-test-coverage/).

##### Usage

```js
driver.endCoverage(intent, path)
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
      <td><code><var>intent</var></code></td>
      <td>string</td>
      <td>intent to broadcast</td>
    </tr>
    <tr>
      <td><code><var>path</var></code></td>
      <td>string</td>
      <td>path to .ec file</td>
    </tr>
  </tbody>
</table>


##### Support

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## getStrings
Get app strings.<br /><br />Appium command. More details can be found in the [official protocol docs](https://appium.github.io/appium.io/docs/en/commands/device/app/get-app-strings/).

##### Usage

```js
driver.getStrings(language, stringFile)
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
      <td><code><var>language</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>string</td>
      <td>language code</td>
    </tr>
    <tr>
      <td><code><var>stringFile</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>string</td>
      <td>path to the string file</td>
    </tr>
  </tbody>
</table>


##### Returns

- **&lt;object&gt;**
            **<code><var>appStrings</var></code>:** all defined Strings from an app for the specified language and strings filename

##### Support

![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## setValueImmediate
Appium command. More details can be found in the [official protocol docs](https://github.com/appium/appium-base-driver/blob/master/docs/mjsonwp/protocol-methods.md#appium-extension-endpoints).

##### Usage

```js
driver.setValueImmediate(elementId, text)
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
      <td>text to set to an element</td>
    </tr>
  </tbody>
</table>


##### Support

![Support for XCUITest (9.3+)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## replaceValue
Replace the value to element directly.<br /><br />Appium command. More details can be found in the [official protocol docs](https://github.com/appium/appium-base-driver/blob/master/docs/mjsonwp/protocol-methods.md#appium-extension-endpoints).

##### Usage

```js
driver.replaceValue(elementId, value)
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
      <td><code><var>value</var></code></td>
      <td>string</td>
      <td>value to replace on element</td>
    </tr>
  </tbody>
</table>


##### Support

![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## getSettings
Retrieve the current settings on the device.<br /><br />Appium command. More details can be found in the [official protocol docs](https://appium.github.io/appium.io/docs/en/commands/session/settings/get-settings/).

##### Usage

```js
driver.getSettings()
```


##### Returns

- **&lt;object&gt;**
            **<code><var>settings</var></code>:** JSON hash of all the currently specified settings, see Settings API

##### Support

![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for Windows (10+)](/img/icons/windows.svg)

---

## updateSettings
Update the current setting on the device.<br /><br />Appium command. More details can be found in the [official protocol docs](https://appium.github.io/appium.io/docs/en/commands/session/settings/update-settings/).

##### Usage

```js
driver.updateSettings(settings)
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
      <td><code><var>settings</var></code></td>
      <td>object</td>
      <td>key/value object with settings to update</td>
    </tr>
  </tbody>
</table>


##### Support

![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for Windows (10+)](/img/icons/windows.svg)

---

## receiveAsyncResponse
Callback url for asynchronous execution of JavaScript.<br /><br />Appium command. More details can be found in the [official protocol docs](https://github.com/appium/appium-base-driver/blob/master/docs/mjsonwp/protocol-methods.md#appium-extension-endpoints).

##### Usage

```js
driver.receiveAsyncResponse(response)
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
      <td><code><var>response</var></code></td>
      <td>object</td>
      <td>response to receive on device</td>
    </tr>
  </tbody>
</table>


##### Support

![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)

---

## gsmCall
Make GSM call (Emulator only).<br /><br />Appium command. More details can be found in the [official protocol docs](https://appium.github.io/appium.io/docs/en/commands/device/network/gsm-call/).

##### Usage

```js
driver.gsmCall(phoneNumber, action)
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
      <td><code><var>phoneNumber</var></code></td>
      <td>string</td>
      <td>the phone number to call to</td>
    </tr>
    <tr>
      <td><code><var>action</var></code></td>
      <td>string</td>
      <td>The action - 'call', 'accept', 'cancel', 'hold'</td>
    </tr>
  </tbody>
</table>


##### Support

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## gsmSignal
Set GSM signal strength (Emulator only).<br /><br />Appium command. More details can be found in the [official protocol docs](https://appium.github.io/appium.io/docs/en/commands/device/network/gsm-signal/).

##### Usage

```js
driver.gsmSignal(signalStrength, signalStrengh)
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
      <td><code><var>signalStrength</var></code></td>
      <td>string</td>
      <td>signal strength in the range [0, 4]</td>
    </tr>
    <tr>
      <td><code><var>signalStrengh</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>string</td>
      <td>signal strength in the range [0, 4]. Please also set this parameter with the same value if you use Appium v1.11.0 or lower (see https://github.com/appium/appium/issues/12234).</td>
    </tr>
  </tbody>
</table>


##### Support

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## powerCapacity
Set the battery percentage (Emulator only).<br /><br />Appium command. More details can be found in the [official protocol docs](https://appium.github.io/appium.io/docs/en/commands/device/emulator/power_capacity/).

##### Usage

```js
driver.powerCapacity(percent)
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
      <td><code><var>percent</var></code></td>
      <td>number</td>
      <td>percentage value in range [0, 100]</td>
    </tr>
  </tbody>
</table>


##### Support

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## powerAC
Set the state of the battery charger to connected or not (Emulator only).<br /><br />Appium command. More details can be found in the [official protocol docs](https://appium.github.io/appium.io/docs/en/commands/device/emulator/power_ac/).

##### Usage

```js
driver.powerAC(state)
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
      <td><code><var>state</var></code></td>
      <td>string</td>
      <td>set the state. on or off</td>
    </tr>
  </tbody>
</table>


##### Support

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## gsmVoice
Set GSM voice state (Emulator only).<br /><br />Appium command. More details can be found in the [official protocol docs](https://appium.github.io/appium.io/docs/en/commands/device/network/gsm-voice/).

##### Usage

```js
driver.gsmVoice(state)
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
      <td><code><var>state</var></code></td>
      <td>string</td>
      <td>state of GSM voice - 'unregistered', 'home', 'roaming', 'searching', 'denied', 'off', 'on'</td>
    </tr>
  </tbody>
</table>


##### Support

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## sendSms
Simulate an SMS message (Emulator only).<br /><br />Appium command. More details can be found in the [official protocol docs](https://appium.github.io/appium.io/docs/en/commands/device/network/send-sms/).

##### Usage

```js
driver.sendSms(phoneNumber, message)
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
      <td><code><var>phoneNumber</var></code></td>
      <td>string</td>
      <td>the phone number to send the SMS too</td>
    </tr>
    <tr>
      <td><code><var>message</var></code></td>
      <td>string</td>
      <td>the SMS message</td>
    </tr>
  </tbody>
</table>


##### Support

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## fingerPrint
Authenticate users by using their finger print scans on supported emulators.<br /><br />Appium command. More details can be found in the [official protocol docs](https://appium.github.io/appium.io/docs/en/commands/device/authentication/finger-print/).

##### Usage

```js
driver.fingerPrint(fingerprintId)
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
      <td><code><var>fingerprintId</var></code></td>
      <td>number</td>
      <td>finger prints stored in Android Keystore system (from 1 to 10)</td>
    </tr>
  </tbody>
</table>


##### Support

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## setClipboard
Set the content of the system clipboard<br /><br />Appium command. More details can be found in the [official protocol docs](https://appium.github.io/appium.io/docs/en/commands/device/clipboard/set-clipboard/).

##### Usage

```js
driver.setClipboard(content, contentType, label)
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
      <td><code><var>content</var></code></td>
      <td>string</td>
      <td>The actual base64 encoded clipboard content</td>
    </tr>
    <tr>
      <td><code><var>contentType</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>string</td>
      <td>The type of the content to get. Plaintext, Image, URL. Android supports only plaintext</td>
    </tr>
    <tr>
      <td><code><var>label</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>string</td>
      <td>Clipboard data label for Android</td>
    </tr>
  </tbody>
</table>


##### Returns

- **&lt;string&gt;**
            **<code><var>response</var></code>:** Response from Appium server

##### Support

![Support for XCUITest (9.3+)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## getClipboard
Get the content of the system clipboard<br /><br />Appium command. More details can be found in the [official protocol docs](https://appium.github.io/appium.io/docs/en/commands/device/clipboard/get-clipboard/).

##### Usage

```js
driver.getClipboard(contentType)
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
      <td><code><var>contentType</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>string</td>
      <td>The type of the content to get. Plaintext, Image, URL. Android supports only plaintext</td>
    </tr>
  </tbody>
</table>


##### Returns

- **&lt;string&gt;**
            **<code><var>response</var></code>:** Clipboard content as base64-encoded string or an empty string if the clipboard is empty

##### Support

![Support for XCUITest (9.3+)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## touchPerform
This functionality is only available from within a native context. 'Touch Perform' works similarly to the other singular touch interactions, except that this allows you to chain together more than one touch action as one command. This is useful because Appium commands are sent over the network and there's latency between commands. This latency can make certain touch interactions impossible because some interactions need to be performed in one sequence. Vertical, for example, requires pressing down, moving to a different y coordinate, and then releasing. For it to work, there can't be a delay between the interactions.<br /><br />Appium command. More details can be found in the [official protocol docs](https://appium.github.io/appium.io/docs/en/commands/interactions/touch/touch-perform/).

##### Usage

```js
driver.touchPerform(actions)
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
      <td>The type of action to perform (e.g. moveTo, release, press, tap, wait)</td>
    </tr>
  </tbody>
</table>

##### Example


```js
// do a horizontal swipe by percentage
const startPercentage = 10;
const endPercentage = 90;
const anchorPercentage = 50;

const { width, height } = driver.getWindowSize();
const anchor = height * anchorPercentage / 100;
const startPoint = width * startPercentage / 100;
const endPoint = width * endPercentage / 100;
driver.touchPerform([
  {
    action: 'press',
    options: {
      x: startPoint,
      y: anchor,
    },
  },
  {
    action: 'wait',
    options: {
      ms: 100,
    },
  },
  {
    action: 'moveTo',
    options: {
      x: endPoint,
      y: anchor,
    },
  },
  {
    action: 'release',
    options: {},
  },
]);
```


##### Support

![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for Windows (10+)](/img/icons/windows.svg)

---

## multiTouchPerform
This functionality is only available from within a native context. Perform a multi touch action sequence.<br /><br />Appium command. More details can be found in the [official protocol docs](https://appium.github.io/appium.io/docs/en/commands/interactions/touch/multi-touch-perform/).

##### Usage

```js
driver.multiTouchPerform(actions)
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
      <td>The type of action to perform (e.g. moveTo, release, press, tap, wait)</td>
    </tr>
  </tbody>
</table>


##### Support

![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for Windows (10+)](/img/icons/windows.svg)

---

## executeDriverScript
This command enables you to specify a WebdriverIO script as a string and transmit it to the Appium server for local execution on the server itself. This approach helps minimize potential latency associated with each command. ***To utilize this command with Appium 2.0, you must have the [`execute-driver-plugin`](https://github.com/appium/appium/tree/master/packages/execute-driver-plugin) plugin installed.***<br /><br />Appium command. More details can be found in the [official protocol docs](https://github.com/appium/appium/blob/master/docs/en/commands/session/execute-driver.md).

##### Usage

```js
driver.executeDriverScript(script, type, timeout)
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
      <td>The script to execute. It has access to a 'driver' object which represents a WebdriverIO session attached to the current server.</td>
    </tr>
    <tr>
      <td><code><var>type</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>string</td>
      <td>The language/framework used in the script. Currently, only 'webdriverio' is supported and is the default.</td>
    </tr>
    <tr>
      <td><code><var>timeout</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>number</td>
      <td>The number of milliseconds the script should be allowed to run before being killed by the Appium server. Defaults to the equivalent of 1 hour.</td>
    </tr>
  </tbody>
</table>


##### Returns

- **&lt;object&gt;**
            **<code><var>result</var></code>:** An object containing two fields: 'result', which is the return value of the script itself, and 'logs', which contains 3 inner fields, 'log', 'warn', and 'error', which hold an array of strings logged by console.log, console.warn, and console.error in the script's execution.


---

## getEvents
Get events stored in appium server.<br /><br />Appium command. More details can be found in the [official protocol docs](https://github.com/appium/appium/blob/master/docs/en/commands/session/events/get-events.md).

##### Usage

```js
driver.getEvents(type)
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
      <td>string[]</td>
      <td>Get events which are filtered with the type if the type is provided.</td>
    </tr>
  </tbody>
</table>


##### Returns

- **&lt;object&gt;**
            **<code><var>result</var></code>:** A JSON hash of events like `{'commands' => [{'cmd' => 123455, ....}], 'startTime' => 1572954894127, }`.

##### Support

![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for XCUITest (9.3+)](/img/icons/ios.svg)

---

## logEvent
Store a custom event.<br /><br />Appium command. More details can be found in the [official protocol docs](https://github.com/appium/appium/blob/master/docs/en/commands/session/events/log-event.md).

##### Usage

```js
driver.logEvent(vendor, event)
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
      <td><code><var>vendor</var></code></td>
      <td>string</td>
      <td>The name of vendor. It will be `vendor` in `vendor:event`.</td>
    </tr>
    <tr>
      <td><code><var>event</var></code></td>
      <td>string</td>
      <td>The name of event. It will be `event` in `vendor:event`.</td>
    </tr>
  </tbody>
</table>


##### Support

![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for XCUITest (9.3+)](/img/icons/ios.svg)

---

## compareImages
This feature conducts image comparisons utilizing the capabilities of the OpenCV framework. Please note that for this functionality to work, both the OpenCV framework and the opencv4nodejs module must be installed on the machine where the Appium server is operational. ***Furthermore, you'll need to have the [`images-plugin`](https://github.com/appium/appium/tree/master/packages/images-plugin) plugin installed to use this feature with Appium 2.0.***<br /><br />Appium command. More details can be found in the [official protocol docs](https://appium.github.io/appium.io/docs/en/writing-running-appium/image-comparison/).

##### Usage

```js
driver.compareImages(mode, firstImage, secondImage, options)
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
      <td><code><var>mode=matchFeatures</var></code></td>
      <td>string</td>
      <td>One of possible comparison modes: 'matchFeatures', 'getSimilarity', 'matchTemplate'. 'matchFeatures' is by default.</td>
    </tr>
    <tr>
      <td><code><var>firstImage</var></code></td>
      <td>string</td>
      <td>An image data. All image formats, that OpenCV library itself accepts, are supported.</td>
    </tr>
    <tr>
      <td><code><var>secondImage</var></code></td>
      <td>string</td>
      <td>An image data. All image formats, that OpenCV library itself accepts, are supported.</td>
    </tr>
    <tr>
      <td><code><var>options=[object Object]</var></code></td>
      <td>object</td>
      <td>The content of this dictionary depends on the actual `mode` value. See the documentation on `appium-support` module for more details. </td>
    </tr>
  </tbody>
</table>


##### Returns

- **&lt;object&gt;**
            **<code><var>result</var></code>:** The content of the resulting dictionary depends on the actual `mode` and `options` values. See the documentation on `appium-support` module for more details.


---

## implicitWait
Set the amount of time the driver should wait when searching for elements. When searching for a single element, the driver should poll the page until an element is found or the timeout expires, whichever occurs first. When searching for multiple elements, the driver should poll the page until at least one element is found or the timeout expires, at which point it should return an empty list. If this command is never sent, the driver should default to an implicit wait of 0ms.<br /><br />Appium command. More details can be found in the [official protocol docs](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints).

##### Usage

```js
driver.implicitWait(ms)
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
      <td><code><var>ms</var></code></td>
      <td>number</td>
      <td>The amount of time, in milliseconds, to wait on an element.</td>
    </tr>
  </tbody>
</table>


##### Support

![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for XCUITest (9.3+)](/img/icons/ios.svg)

---

## getLocationInView
Determine an element's location on the screen once it has been scrolled into view.<br /><br />__Note:__ This is considered an internal command and should only be used to determine an element's location for correctly generating native events.<br /><br />Appium command. More details can be found in the [official protocol docs](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints).

##### Usage

```js
driver.getLocationInView(elementId)
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
      <td>ID of the element to route the command to</td>
    </tr>
  </tbody>
</table>


##### Returns

- **&lt;Object&gt;**
            **<code><var>location</var></code>:** The X and Y coordinates for the element on the page.

##### Support

![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for XCUITest (9.3+)](/img/icons/ios.svg)

---

## sendKeys
Send a sequence of key strokes to the active element<br /><br />Appium command. More details can be found in the [official protocol docs](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints).

##### Usage

```js
driver.sendKeys(value)
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
      <td><code><var>value</var></code></td>
      <td>string[]</td>
      <td>The sequence of keys to type. An array must be provided.</td>
    </tr>
  </tbody>
</table>


##### Support

![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for XCUITest (9.3+)](/img/icons/ios.svg)

---

## availableIMEEngines
List all available engines on the machine. To use an engine, it has to be present in this list.<br /><br />Appium command. More details can be found in the [official protocol docs](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints).

##### Usage

```js
driver.availableIMEEngines()
```


##### Returns

- **&lt;String[]&gt;**
            **<code><var>engines</var></code>:** A list of available engines

##### Support

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## getActiveIMEEngine
Get the name of the active IME engine. The name string is platform specific.<br /><br />Appium command. More details can be found in the [official protocol docs](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints).

##### Usage

```js
driver.getActiveIMEEngine()
```


##### Returns

- **&lt;String&gt;**
            **<code><var>engine</var></code>:** The name of the active IME engine

##### Support

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## isIMEActivated
Indicates whether IME input is active at the moment<br /><br />Appium command. More details can be found in the [official protocol docs](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints).

##### Usage

```js
driver.isIMEActivated()
```


##### Returns

- **&lt;Boolean&gt;**
            **<code><var>isActive</var></code>:** true if IME input is available and currently active, false otherwise

##### Support

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## deactivateIMEEngine
De-activates the currently-active IME engine.<br /><br />Appium command. More details can be found in the [official protocol docs](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints).

##### Usage

```js
driver.deactivateIMEEngine()
```




##### Support

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## activateIMEEngine
Make an engines that is available<br /><br />Appium command. More details can be found in the [official protocol docs](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints).

##### Usage

```js
driver.activateIMEEngine(engine)
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
      <td><code><var>engine</var></code></td>
      <td>string</td>
      <td>name of the engine to activate</td>
    </tr>
  </tbody>
</table>


##### Support

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## asyncScriptTimeout
Set the amount of time, in milliseconds, that asynchronous scripts executed by `/session/:sessionId/execute_async` are permitted to run before they are aborted and a `Timeout` error is returned to the client.<br /><br />Appium command. More details can be found in the [official protocol docs](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints).

##### Usage

```js
driver.asyncScriptTimeout(ms)
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
      <td><code><var>ms</var></code></td>
      <td>number</td>
      <td>The amount of time, in milliseconds, that time-limited commands are permitted to run</td>
    </tr>
  </tbody>
</table>


##### Support

![Support for XCUITest (9.3+)](/img/icons/ios.svg)

---

## submit
Submit a form element.<br /><br />Appium command. More details can be found in the [official protocol docs](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints).

##### Usage

```js
driver.submit(elementId)
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
      <td>ID of the form element to be submitted</td>
    </tr>
  </tbody>
</table>


##### Support

![Support for XCUITest (9.3+)](/img/icons/ios.svg)

---

## getElementSize
Determine an element's size in pixels. The size will be returned as a JSON object with `width` and `height` properties.<br /><br />Appium command. More details can be found in the [official protocol docs](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints).

##### Usage

```js
driver.getElementSize(elementId)
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
      <td>ID of the element to route the command to</td>
    </tr>
  </tbody>
</table>


##### Returns

- **&lt;Object&gt;**
            **<code><var>size</var></code>:** The width and height of the element, in pixels.

##### Support

![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for XCUITest (9.3+)](/img/icons/ios.svg)

---

## getElementLocation
Determine an element's location on the page. The point `(0, 0)` refers to the upper-left corner of the page. The element's coordinates are returned as a JSON object with `x` and `y` properties.<br /><br />Appium command. More details can be found in the [official protocol docs](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints).

##### Usage

```js
driver.getElementLocation(elementId)
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
      <td>ID of the element to route the command to</td>
    </tr>
  </tbody>
</table>


##### Returns

- **&lt;Object&gt;**
            **<code><var>location</var></code>:** The X and Y coordinates for the element on the page.

##### Support

![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for XCUITest (9.3+)](/img/icons/ios.svg)

---

## touchClick
Single tap on the touch enabled device.<br /><br />Appium command. More details can be found in the [official protocol docs](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints).

##### Usage

```js
driver.touchClick(element)
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
      <td><code><var>element</var></code></td>
      <td>string</td>
      <td>ID of the element to single tap on.</td>
    </tr>
  </tbody>
</table>


##### Support

![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for XCUITest (9.3+)](/img/icons/ios.svg)

---

## touchDown
Finger down on the screen.<br /><br />Appium command. More details can be found in the [official protocol docs](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints).

##### Usage

```js
driver.touchDown(x, y)
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
      <td>x coordinate on the screen</td>
    </tr>
    <tr>
      <td><code><var>y</var></code></td>
      <td>number</td>
      <td>y coordinate on the screen</td>
    </tr>
  </tbody>
</table>


##### Support

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## touchUp
Finger up on the screen.<br /><br />Appium command. More details can be found in the [official protocol docs](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints).

##### Usage

```js
driver.touchUp(x, y)
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
      <td>x coordinate on the screen</td>
    </tr>
    <tr>
      <td><code><var>y</var></code></td>
      <td>number</td>
      <td>y coordinate on the screen</td>
    </tr>
  </tbody>
</table>


##### Support

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## touchMove
Finger move on the screen.<br /><br />Appium command. More details can be found in the [official protocol docs](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints).

##### Usage

```js
driver.touchMove(x, y)
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
      <td>x coordinate on the screen</td>
    </tr>
    <tr>
      <td><code><var>y</var></code></td>
      <td>number</td>
      <td>y coordinate on the screen</td>
    </tr>
  </tbody>
</table>


##### Support

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## touchLongClick
Long press on the touch screen using finger motion events.<br /><br />Appium command. More details can be found in the [official protocol docs](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints).

##### Usage

```js
driver.touchLongClick(element)
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
      <td><code><var>element</var></code></td>
      <td>string</td>
      <td>ID of the element to long press on</td>
    </tr>
  </tbody>
</table>


##### Support

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## touchFlick
Flick on the touch screen using finger motion events. This flick command starts at a particular screen location.<br /><br />Appium command. More details can be found in the [official protocol docs](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints).

##### Usage

```js
driver.touchFlick(xoffset, yoffset, element, speed, xspeed, yspeed)
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
      <td><code><var>xoffset</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>number</td>
      <td>the x offset in pixels to flick by</td>
    </tr>
    <tr>
      <td><code><var>yoffset</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>number</td>
      <td>the y offset in pixels to flick by</td>
    </tr>
    <tr>
      <td><code><var>element</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>string</td>
      <td>ID of the element where the flick starts</td>
    </tr>
    <tr>
      <td><code><var>speed</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>number</td>
      <td>the speed in pixels per seconds</td>
    </tr>
    <tr>
      <td><code><var>xspeed</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>number</td>
      <td>the x speed in pixels per second</td>
    </tr>
    <tr>
      <td><code><var>yspeed</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>number</td>
      <td>the y speed in pixels per second</td>
    </tr>
  </tbody>
</table>


##### Support

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## getOrientation
Get the current device orientation.<br /><br />Appium command. More details can be found in the [official protocol docs](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints).

##### Usage

```js
driver.getOrientation()
```


##### Returns

- **&lt;String&gt;**
            **<code><var>orientation</var></code>:** The current orientation corresponding to a value defined in ScreenOrientation: `LANDSCAPE|PORTRAIT`.

##### Support

![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for XCUITest (9.3+)](/img/icons/ios.svg)

---

## setOrientation
Set the device orientation<br /><br />Appium command. More details can be found in the [official protocol docs](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints).

##### Usage

```js
driver.setOrientation(orientation)
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
      <td><code><var>orientation</var></code></td>
      <td>string</td>
      <td>the new browser orientation as defined in ScreenOrientation: `LANDSCAPE|PORTRAIT`</td>
    </tr>
  </tbody>
</table>


##### Support

![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for XCUITest (9.3+)](/img/icons/ios.svg)

---

## getLogs
Get the log for a given log type. Log buffer is reset after each request.<br /><br />Appium command. More details can be found in the [official protocol docs](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints).

##### Usage

```js
driver.getLogs(type)
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

##### Support

![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for XCUITest (9.3+)](/img/icons/ios.svg)

---

## getLogTypes
Get available log types.<br /><br />Appium command. More details can be found in the [official protocol docs](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints).

##### Usage

```js
driver.getLogTypes()
```


##### Returns

- **&lt;String[]&gt;**
            **<code><var>logTypes</var></code>:** The list of available log types.

##### Support

![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for XCUITest (9.3+)](/img/icons/ios.svg)
