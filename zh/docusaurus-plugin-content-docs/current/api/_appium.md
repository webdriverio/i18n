---
id: appium
title: Appium
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-protocols/src/protocols/appium.ts
---

## getAppiumContext
Appium 命令。更多详情可以在[官方协议文档](https://github.com/SeleniumHQ/mobile-spec/blob/master/spec-draft.md#webviews-and-other-contexts)中找到。

##### 用法

```js
driver.getAppiumContext()
```


##### 返回

- **&lt;Context&gt;**
            **<code><var>context</var></code>:** 一个表示当前上下文的字符串或表示"无上下文"的 null


---

## switchAppiumContext
Appium 命令。更多详情可以在[官方协议文档](https://github.com/SeleniumHQ/mobile-spec/blob/master/spec-draft.md#webviews-and-other-contexts)中找到。

##### 用法

```js
driver.switchAppiumContext(name)
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
      <td><code><var>name</var></code></td>
      <td>string</td>
      <td>表示可用上下文的字符串</td>
    </tr>
  </tbody>
</table>



---

## getAppiumContexts
Appium 命令。更多详情可以在[官方协议文档](https://github.com/SeleniumHQ/mobile-spec/blob/master/spec-draft.md#webviews-and-other-contexts)中找到。

##### 用法

```js
driver.getAppiumContexts()
```


##### 返回

- **&lt;Context[]&gt;**
            **<code><var>contexts</var></code>:** 表示可用上下文的字符串数组，例如 'WEBVIEW' 或 'NATIVE'


---

## shake
在设备上执行摇晃操作。<br /><br />Appium 命令。更多详情可以在[官方协议文档](https://appium.github.io/appium.io/docs/en/commands/device/interactions/shake/)中找到。

##### 用法

```js
driver.shake()
```




##### 支持

![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)

---

## lock
锁定设备。<br /><br />Appium 命令。更多详情可以在[官方协议文档](https://appium.github.io/appium.io/docs/en/commands/device/interactions/lock/)中找到。

##### 用法

```js
driver.lock(seconds)
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
      <td><code><var>seconds</var></code><br /><span className="label labelWarning">可选</span></td>
      <td>number</td>
      <td>锁定屏幕的时间长度（仅限 iOS）</td>
    </tr>
  </tbody>
</table>


##### 支持

![Support for UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for Windows (10+)](/img/icons/windows.svg)

---

## unlock
解锁设备。<br /><br />Appium 命令。更多详情可以在[官方协议文档](https://appium.github.io/appium.io/docs/en/commands/device/interactions/unlock/)中找到。

##### 用法

```js
driver.unlock()
```




##### 支持

![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for Windows (10+)](/img/icons/windows.svg)

---

## isLocked
检查设备是否被锁定。<br /><br />Appium 命令。更多详情可以在[官方协议文档](https://appium.github.io/appium.io/docs/en/commands/device/interactions/is-locked/)中找到。

##### 用法

```js
driver.isLocked()
```


##### 返回

- **&lt;boolean&gt;**
            **<code><var>isLocked</var></code>:** 如果设备已锁定则为 true，否则为 false

##### 支持

![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for Windows (10+)](/img/icons/windows.svg)

---

## startRecordingScreen
开始录制屏幕。<br /><br />Appium 命令。更多详情可以在[官方协议文档](https://appium.github.io/appium.io/docs/en/commands/device/recording-screen/start-recording-screen/)中找到。

##### 用法

```js
driver.startRecordingScreen(options)
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
      <td><code><var>options</var></code><br /><span className="label labelWarning">可选</span></td>
      <td>object</td>
      <td>命令参数，可以包含以下键：remotePath, username, password, method, forceRestart, timeLimit, videoType, videoQuality, videoFps, bitRate, videoSize, bugReport（详见 Appium 文档）</td>
    </tr>
  </tbody>
</table>


##### 支持

![Support for XCUITest (9.3+)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for Windows (10+)](/img/icons/windows.svg)

---

## stopRecordingScreen
停止录制屏幕<br /><br />Appium 命令。更多详情可以在[官方协议文档](https://appium.github.io/appium.io/docs/en/commands/device/recording-screen/stop-recording-screen/)中找到。

##### 用法

```js
driver.stopRecordingScreen(remotePath, username, password, method)
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
      <td><code><var>remotePath</var></code><br /><span className="label labelWarning">可选</span></td>
      <td>string</td>
      <td>应上传结果视频的远程位置路径。支持以下协议：http/https、ftp。此选项仅在有屏幕录制过程正在进行且 forceRestart 参数未设置为 true 时有效。空值或空字符串（默认设置）表示结果文件的内容应编码为 Base64。</td>
    </tr>
    <tr>
      <td><code><var>username</var></code><br /><span className="label labelWarning">可选</span></td>
      <td>string</td>
      <td>远程认证的用户名。</td>
    </tr>
    <tr>
      <td><code><var>password</var></code><br /><span className="label labelWarning">可选</span></td>
      <td>string</td>
      <td>远程认证的密码。</td>
    </tr>
    <tr>
      <td><code><var>method</var></code><br /><span className="label labelWarning">可选</span></td>
      <td>string</td>
      <td>http 多部分上传方法名称。默认使用 'PUT'。</td>
    </tr>
  </tbody>
</table>


##### 返回

- **&lt;string&gt;**
            **<code><var>response</var></code>:** Base64 编码的字符串。如果设置了 remote_path，则响应为空字符串

##### 支持

![Support for XCUITest (9.3+)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for Windows (10+)](/img/icons/windows.svg)

---

## getPerformanceDataTypes
返回系统状态支持读取的信息类型，如 CPU、内存、网络流量和电池。<br /><br />Appium 命令。更多详情可以在[官方协议文档](https://appium.github.io/appium.io/docs/en/commands/device/performance-data/performance-data-types/)中找到。

##### 用法

```js
driver.getPerformanceDataTypes()
```


##### 返回

- **&lt;string[]&gt;**
            **<code><var>performanceTypes</var></code>:** 可用的性能数据类型 (cpuinfo|batteryinfo|networkinfo|memoryinfo)

##### 支持

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## getPerformanceData
返回系统状态支持读取的信息，如 CPU、内存、网络流量和电池。<br /><br />Appium 命令。更多详情可以在[官方协议文档](https://appium.github.io/appium.io/docs/en/commands/device/performance-data/get-performance-data/)中找到。

##### 用法

```js
driver.getPerformanceData(packageName, dataType, dataReadTimeout)
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
      <td><code><var>packageName</var></code></td>
      <td>string</td>
      <td>应用程序的包名</td>
    </tr>
    <tr>
      <td><code><var>dataType</var></code></td>
      <td>string</td>
      <td>想要读取的系统状态类型。应该是支持的性能数据类型之一</td>
    </tr>
    <tr>
      <td><code><var>dataReadTimeout</var></code><br /><span className="label labelWarning">可选</span></td>
      <td>number</td>
      <td>读取尝试次数</td>
    </tr>
  </tbody>
</table>


##### 返回

- **&lt;string[]&gt;**
            **<code><var>performanceData</var></code>:** 系统状态支持读取的信息类型，如 CPU、内存、网络流量和电池

##### 支持

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## pressKeyCode
在设备上按特定键。<br /><br />Appium 命令。更多详情可以在[官方协议文档](https://appium.github.io/appium.io/docs/en/commands/device/keys/press-keycode/)中找到。

##### 用法

```js
driver.pressKeyCode(keycode, metastate, flags)
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
      <td><code><var>keycode</var></code></td>
      <td>number</td>
      <td>要按的键码</td>
    </tr>
    <tr>
      <td><code><var>metastate</var></code><br /><span className="label labelWarning">可选</span></td>
      <td>number</td>
      <td>与键码一起按下的元状态</td>
    </tr>
    <tr>
      <td><code><var>flags</var></code><br /><span className="label labelWarning">可选</span></td>
      <td>number</td>
      <td>键按下的标志</td>
    </tr>
  </tbody>
</table>


##### 支持

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## longPressKeyCode
在设备上按住特定键码。<br /><br />Appium 命令。更多详情可以在[官方协议文档](https://appium.github.io/appium.io/docs/en/commands/device/keys/long-press-keycode/)中找到。

##### 用法

```js
driver.longPressKeyCode(keycode, metastate, flags)
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
      <td><code><var>keycode</var></code></td>
      <td>number</td>
      <td>在设备上按的键码</td>
    </tr>
    <tr>
      <td><code><var>metastate</var></code><br /><span className="label labelWarning">可选</span></td>
      <td>number</td>
      <td>键按下的元状态</td>
    </tr>
    <tr>
      <td><code><var>flags</var></code><br /><span className="label labelWarning">可选</span></td>
      <td>number</td>
      <td>键按下的标志</td>
    </tr>
  </tbody>
</table>


##### 支持

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## sendKeyEvent
向设备发送键码。<br /><br />Appium 命令。更多详情可以在[官方协议文档](https://github.com/appium/appium-base-driver/blob/master/docs/mjsonwp/protocol-methods.md#appium-extension-endpoints)中找到。

##### 用法

```js
driver.sendKeyEvent(keycode, metastate)
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
      <td><code><var>keycode</var></code></td>
      <td>string</td>
      <td>要按的键码</td>
    </tr>
    <tr>
      <td><code><var>metastate</var></code><br /><span className="label labelWarning">可选</span></td>
      <td>string</td>
      <td>与键码一起按下的元状态</td>
    </tr>
  </tbody>
</table>


##### 支持

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## rotateDevice
在三维空间中旋转设备。<br /><br />Appium 命令。更多详情可以在[官方协议文档](https://github.com/SeleniumHQ/mobile-spec/blob/master/spec-draft.md#device-rotation)中找到。

##### 用法

```js
driver.rotateDevice(x, y, z)
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
      <td><code><var>x</var></code></td>
      <td>number</td>
      <td>用于旋转手势中心的 x 偏移量</td>
    </tr>
    <tr>
      <td><code><var>y</var></code></td>
      <td>number</td>
      <td>用于旋转手势中心的 y 偏移量</td>
    </tr>
    <tr>
      <td><code><var>z</var></code></td>
      <td>number</td>
      <td>用于旋转手势中心的 z 偏移量</td>
    </tr>
  </tbody>
</table>


##### 支持

![Support for UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## getCurrentActivity
获取当前 Android 活动的名称。<br /><br />Appium 命令。更多详情可以在[官方协议文档](https://appium.github.io/appium.io/docs/en/commands/device/activity/current-activity/)中找到。

##### 用法

```js
driver.getCurrentActivity()
```


##### 返回

- **&lt;string&gt;**
            **<code><var>activity</var></code>:** 当前活动的名称

##### 支持

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## getCurrentPackage
获取当前 Android 包的名称。<br /><br />Appium 命令。更多详情可以在[官方协议文档](https://appium.github.io/appium.io/docs/en/commands/device/activity/current-package/)中找到。

##### 用法

```js
driver.getCurrentPackage()
```


##### 返回

- **&lt;string&gt;**
            **<code><var>package</var></code>:** 当前包的名称

##### 支持

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## installApp
在设备上安装给定的应用。<br /><br />Appium 命令。更多详情可以在[官方协议文档](https://appium.github.io/appium.io/docs/en/commands/device/app/install-app/)中找到。

##### 用法

```js
driver.installApp(appPath)
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
      <td><code><var>appPath</var></code></td>
      <td>string</td>
      <td>应用程序 .apk 文件的路径</td>
    </tr>
  </tbody>
</table>


##### 支持

![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## activateApp
在设备上激活给定的应用<br /><br />Appium 命令。更多详情可以在[官方协议文档](https://appium.github.io/appium.io/docs/en/commands/device/app/activate-app/)中找到。

##### 用法

```js
driver.activateApp(appId)
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
      <td><code><var>appId</var></code></td>
      <td>string</td>
      <td>应用 ID（Android 的包 ID，iOS 的捆绑 ID）</td>
    </tr>
  </tbody>
</table>


##### 支持

![Support for XCUITest (9.3+)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## removeApp
从设备中移除应用。<br /><br />Appium 命令。更多详情可以在[官方协议文档](https://appium.github.io/appium.io/docs/en/commands/device/app/remove-app/)中找到。

##### 用法

```js
driver.removeApp(appId)
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
      <td><code><var>appId</var></code></td>
      <td>string</td>
      <td>应用 ID（Android 的包 ID，iOS 的捆绑 ID）</td>
    </tr>
  </tbody>
</table>


##### 支持

![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## terminateApp
终止设备上的给定应用<br /><br />Appium 命令。更多详情可以在[官方协议文档](https://appium.github.io/appium.io/docs/en/commands/device/app/terminate-app/)中找到。

##### 用法

```js
driver.terminateApp(appId, options)
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
      <td><code><var>appId</var></code></td>
      <td>string</td>
      <td>应用 ID（Android 的包 ID，iOS 的捆绑 ID）</td>
    </tr>
    <tr>
      <td><code><var>options</var></code><br /><span className="label labelWarning">可选</span></td>
      <td>object</td>
      <td>命令选项。例如 "timeout"：（仅 Android）重试终止应用的超时时间（详见 Appium 文档）</td>
    </tr>
  </tbody>
</table>


##### 支持

![Support for XCUITest (9.3+)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## isAppInstalled
检查设备上是否安装了指定的应用。<br /><br />Appium 命令。更多详情可以在[官方协议文档](https://appium.github.io/appium.io/docs/en/commands/device/app/is-app-installed/)中找到。

##### 用法

```js
driver.isAppInstalled(appId)
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
      <td><code><var>appId</var></code></td>
      <td>string</td>
      <td>应用 ID（Android 的包 ID，iOS 的捆绑 ID）</td>
    </tr>
  </tbody>
</table>


##### 返回

- **&lt;boolean&gt;**
            **<code><var>isAppInstalled</var></code>:** 如果已安装则返回 true，否则返回 false

##### 支持

![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## queryAppState
获取设备上给定应用的状态<br /><br />Appium 命令。更多详情可以在[官方协议文档](https://appium.github.io/appium.io/docs/en/commands/device/app/app-state/)中找到。

##### 用法

```js
driver.queryAppState(appId)
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
      <td><code><var>appId</var></code></td>
      <td>string</td>
      <td>应用 ID（Android 的包 ID，iOS 的捆绑 ID）</td>
    </tr>
  </tbody>
</table>


##### 返回

- **&lt;number&gt;**
            **<code><var>appStatus</var></code>:** 0 表示未安装。1 表示未运行。2 表示在后台运行或已挂起。3 表示在后台运行。4 表示在前台运行

##### 支持

![Support for XCUITest (9.3+)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## hideKeyboard
隐藏软键盘。<br /><br />Appium 命令。更多详情可以在[官方协议文档](https://appium.github.io/appium.io/docs/en/commands/device/keys/hide-keyboard/)中找到。

##### 用法

```js
driver.hideKeyboard(strategy, key, keyCode, keyName)
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
      <td><code><var>strategy</var></code><br /><span className="label labelWarning">可选</span></td>
      <td>string</td>
      <td>隐藏键盘策略（仅 UIAutomation），可用策略 - 'press', 'pressKey', 'swipeDown', 'tapOut', 'tapOutside', 'default'</td>
    </tr>
    <tr>
      <td><code><var>key</var></code><br /><span className="label labelWarning">可选</span></td>
      <td>string</td>
      <td>如果策略是 'pressKey' 则为键值</td>
    </tr>
    <tr>
      <td><code><var>keyCode</var></code><br /><span className="label labelWarning">可选</span></td>
      <td>string</td>
      <td>如果策略是 'pressKey' 则为键码</td>
    </tr>
    <tr>
      <td><code><var>keyName</var></code><br /><span className="label labelWarning">可选</span></td>
      <td>string</td>
      <td>如果策略是 'pressKey' 则为键名</td>
    </tr>
  </tbody>
</table>


##### 支持

![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for Windows (10+)](/img/icons/windows.svg)

---

## isKeyboardShown
软键盘是否显示。<br /><br />Appium 命令。更多详情可以在[官方协议文档](https://appium.github.io/appium.io/docs/en/commands/device/keys/is-keyboard-shown/)中找到。

##### 用法

```js
driver.isKeyboardShown()
```


##### 返回

- **&lt;boolean&gt;**
            **<code><var>isKeyboardShown</var></code>:** 如果键盘显示则为 true

##### 支持

![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for Windows (10+)](/img/icons/windows.svg)

---

## pushFile
将文件放置到设备上的特定位置。<br /><br />Appium 命令。更多详情可以在[官方协议文档](https://appium.github.io/appium.io/docs/en/commands/device/files/push-file/)中找到。

##### 用法

```js
driver.pushFile(path, data)
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
      <td><code><var>path</var></code></td>
      <td>string</td>
      <td>安装数据的路径</td>
    </tr>
    <tr>
      <td><code><var>data</var></code></td>
      <td>string</td>
      <td>base64 格式的文件内容</td>
    </tr>
  </tbody>
</table>


##### 支持

![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for Windows (10+)](/img/icons/windows.svg)

---

## pullFile
从设备的文件系统中检索文件。<br /><br />Appium 命令。更多详情可以在[官方协议文档](https://appium.github.io/appium.io/docs/en/commands/device/files/pull-file/)中找到。

##### 用法

```js
driver.pullFile(path)
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
      <td><code><var>path</var></code></td>
      <td>string</td>
      <td>设备上拉取文件的路径</td>
    </tr>
  </tbody>
</table>


##### 返回

- **&lt;string&gt;**
            **<code><var>response</var></code>:** base64 格式的文件内容

##### 支持

![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for Windows (10+)](/img/icons/windows.svg)

---

## pullFolder
从设备的文件系统中检索文件夹。<br /><br />Appium 命令。更多详情可以在[官方协议文档](https://appium.github.io/appium.io/docs/en/commands/device/files/pull-folder/)中找到。

##### 用法

```js
driver.pullFolder(path)
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
      <td><code><var>path</var></code></td>
      <td>string</td>
      <td>设备上整个文件夹的路径</td>
    </tr>
  </tbody>
</table>


##### 支持

![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for Windows (10+)](/img/icons/windows.svg)

---

## toggleAirplaneMode
切换设备上的飞行模式。<br /><br />Appium 命令。更多详情可以在[官方协议文档](https://appium.github.io/appium.io/docs/en/commands/device/network/toggle-airplane-mode/)中找到。

##### 用法

```js
driver.toggleAirplaneMode()
```




##### 支持

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## toggleData
切换数据服务的状态。<br /><br />Appium 命令。更多详情可以在[官方协议文档](https://appium.github.io/appium.io/docs/en/commands/device/network/toggle-data/)中找到。

##### 用法

```js
driver.toggleData()
```




##### 支持

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## toggleWiFi
切换 WiFi 服务的状态。<br /><br />Appium 命令。更多详情可以在[官方协议文档](https://appium.github.io/appium.io/docs/en/commands/device/network/toggle-wifi/)中找到。

##### 用法

```js
driver.toggleWiFi()
```




##### 支持

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## toggleLocationServices
切换位置服务的状态。<br /><br />Appium 命令。更多详情可以在[官方协议文档](https://appium.github.io/appium.io/docs/en/commands/device/network/toggle-location-services/)中找到。

##### 用法

```js
driver.toggleLocationServices()
```




##### 支持

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## toggleNetworkSpeed
设置网络速度（仅模拟器）<br /><br />Appium 命令。更多详情可以在[官方协议文档](https://appium.github.io/appium.io/docs/en/commands/device/network/network-speed/)中找到。

##### 用法

```js
driver.toggleNetworkSpeed(netspeed)
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
      <td><code><var>netspeed</var></code></td>
      <td>string</td>
      <td>网络类型 - 'full','gsm', 'edge', 'hscsd', 'gprs', 'umts', 'hsdpa', 'lte', 'evdo'</td>
    </tr>
  </tbody>
</table>


##### 支持

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## openNotifications
打开 Android 通知（仅模拟器）。<br /><br />Appium 命令。更多详情可以在[官方协议文档](https://appium.github.io/appium.io/docs/en/commands/device/system/open-notifications/)中找到。

##### 用法

```js
driver.openNotifications()
```




##### 支持

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## startActivity
通过提供包名和活动名来启动 Android 活动。<br /><br />Appium 命令。更多详情可以在[官方协议文档](https://appium.github.io/appium.io/docs/en/commands/device/activity/start-activity/)中找到。

##### 用法

```js
driver.startActivity(appPackage, appActivity, appWaitPackage, appWaitActivity, intentAction, intentCategory, intentFlags, optionalIntentArguments, dontStopAppOnReset)
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
      <td><code><var>appPackage</var></code></td>
      <td>string</td>
      <td>应用名称</td>
    </tr>
    <tr>
      <td><code><var>appActivity</var></code></td>
      <td>string</td>
      <td>活动名称</td>
    </tr>
    <tr>
      <td><code><var>appWaitPackage</var></code><br /><span className="label labelWarning">可选</span></td>
      <td>string</td>
      <td>等待的应用名称</td>
    </tr>
    <tr>
      <td><code><var>appWaitActivity</var></code><br /><span className="label labelWarning">可选</span></td>
      <td>string</td>
      <td>等待的活动名称</td>
    </tr>
    <tr>
      <td><code><var>intentAction=android.intent.action.MAIN</var></code><br /><span className="label labelWarning">可选</span></td>
      <td>string</td>
      <td>用于启动活动的意图操作</td>
    </tr>
    <tr>
      <td><code><var>intentCategory=android.intent.category.LAUNCHER</var></code><br /><span className="label labelWarning">可选</span></td>
      <td>string</td>
      <td>用于启动活动的意图类别</td>
    </tr>
    <tr>
      <td><code><var>intentFlags=0x10200000</var></code><br /><span className="label labelWarning">可选</span></td>
      <td>string</td>
      <td>用于启动活动的标志</td>
    </tr>
    <tr>
      <td><code><var>optionalIntentArguments</var></code><br /><span className="label labelWarning">可选</span></td>
      <td>string</td>
      <td>用于启动活动的额外意图参数</td>
    </tr>
    <tr>
      <td><code><var>dontStopAppOnReset</var></code><br /><span className="label labelWarning">可选</span></td>
      <td>string</td>
      <td>在使用 adb 启动应用之前，不停止被测应用的进程</td>
    </tr>
  </tbody>
</table>


##### 支持

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## getSystemBars
检索状态栏和导航栏的可见性和边界信息。<br /><br />Appium 命令。更多详情可以在[官方协议文档](https://appium.github.io/appium.io/docs/en/commands/device/system/system-bars/)中找到。

##### 用法

```js
driver.getSystemBars()
```


##### 返回

- **&lt;object[]&gt;**
            **<code><var>systemBars</var></code>:** 关于状态栏和导航栏可见性和边界的信息

##### 支持

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## getDeviceTime
获取设备上的时间。<br /><br />Appium 命令。更多详情可以在[官方协议文档](https://appium.github.io/appium.io/docs/en/commands/device/system/system-time/)中找到。

##### 用法

```js
driver.getDeviceTime()
```


##### 返回

- **&lt;string&gt;**
            **<code><var>time</var></code>:** 设备上的时间

##### 支持

![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## getDisplayDensity
获取设备的显示密度。<br /><br />Appium 命令。更多详情可以在[官方协议文档](https://github.com/appium/appium-base-driver/blob/master/docs/mjsonwp/protocol-methods.md#appium-extension-endpoints)中找到。

##### 用法

```js
driver.getDisplayDensity()
```


##### 返回

- **&lt;*&gt;**


##### 支持

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## touchId
模拟 [touch id](https://support.apple.com/en-ca/ht201371) 事件（仅限 iOS 模拟器）。要启用此功能，必须将 `allowTouchIdEnroll` 所需能力设置为 true，并且模拟器必须[已注册](https://support.apple.com/en-ca/ht201371)。当您将 allowTouchIdEnroll 设置为 true 时，它会默认将模拟器设置为已注册。注册状态可以[切换](https://appium.github.io/appium.io/docs/en/commands/device/simulator/toggle-touch-id-enrollment/index.html)。此调用仅在 Appium 进程或其父应用程序（例如 Terminal.app 或 Appium.app）在系统偏好设置 > 安全与隐私 > 隐私 > 辅助功能列表中有权访问 Mac OS 辅助功能时才能工作。<br /><br />Appium 命令。更多详情可以在[官方协议文档](https://appium.github.io/appium.io/docs/en/commands/device/simulator/touch-id/)中找到。

##### 用法

```js
driver.touchId(match)
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
      <td><code><var>match</var></code></td>
      <td>boolean</td>
      <td>我们是模拟成功的触摸 (true) 还是失败的触摸 (false)</td>
    </tr>
  </tbody>
</table>


##### 支持

![Support for XCUITest (9.3+)](/img/icons/ios.svg)

---

## toggleEnrollTouchId
切换模拟器是否[已注册](https://support.apple.com/en-ca/ht201371)以接受 touchId（仅限 iOS 模拟器）。要启用此功能，必须将 `allowTouchIdEnroll` 所需能力设置为 true。当 `allowTouchIdEnroll` 设置为 true 时，模拟器将默认注册，而"切换 Touch ID 注册"会更改注册状态。此调用仅在 Appium 进程或其父应用程序（例如 Terminal.app 或 Appium.app）在系统偏好设置 > 安全与隐私 > 隐私 > 辅助功能列表中有权访问 Mac OS 辅助功能时才能工作。<br /><br />Appium 命令。更多详情可以在[官方协议文档](https://appium.github.io/appium.io/docs/en/commands/device/simulator/toggle-touch-id-enrollment/)中找到。

##### 用法

```js
driver.toggleEnrollTouchId(enabled)
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
      <td><code><var>enabled=true</var></code><br /><span className="label labelWarning">可选</span></td>
      <td>boolean</td>
      <td>如果应启用 TouchID 注册则为 true</td>
    </tr>
  </tbody>
</table>


##### 支持

![Support for XCUITest (9.3+)](/img/icons/ios.svg)

---

## launchApp
在设备上启动应用。<br /><br />Appium 命令。更多详情可以在[官方协议文档](https://appium.github.io/appium.io/docs/en/commands/device/app/launch-app/)中找到。
:::caution

此协议命令已弃用<br />对于 iOS，使用 `driver.execute('mobile: launchApp', { ... })`，对于 Android，使用 `driver.execute('mobile: activateApp', { ... })`。
:::

##### 用法

```js
driver.launchApp()
```




##### 支持

![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## closeApp
关闭设备上的应用。<br /><br />Appium 命令。更多详情可以在[官方协议文档](https://appium.github.io/appium.io/docs/en/commands/device/app/close-app/)中找到。
:::caution

此协议命令已弃用<br />请改用 `driver.execute('mobile: terminateApp', { ... })`
:::

##### 用法

```js
driver.closeApp()
```




##### 支持

![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## background
将此会话当前运行的应用发送到后台。<br /><br />Appium 命令。更多详情可以在[官方协议文档](https://appium.github.io/appium.io/docs/en/commands/device/app/background-app/)中找到。
:::caution

此协议命令已弃用<br />请改用 `driver.execute('mobile: backgroundApp', { ... })`
:::

##### 用法

```js
driver.background(seconds)
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
      <td><code><var>seconds=null</var></code></td>
      <td>number, null</td>
      <td>恢复应用的超时时间，如果为 'null' 则不会恢复应用</td>
    </tr>
  </tbody>
</table>


##### 支持

![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## endCoverage
获取测试覆盖率数据。<br /><br />Appium 命令。更多详情可以在[官方协议文档](https://appium.github.io/appium.io/docs/en/commands/device/app/end-test-coverage/)中找到。

##### 用法

```js
driver.endCoverage(intent, path)
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
      <td><code><var>intent</var></code></td>
      <td>string</td>
      <td>要广播的意图</td>
    </tr>
    <tr>
      <td><code><var>path</var></code></td>
      <td>string</td>
      <td>.ec 文件的路径</td>
    </tr>
  </tbody>
</table>


##### 支持

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## getStrings
获取应用字符串。<br /><br />Appium 命令。更多详情可以在[官方协议文档](https://appium.github.io/appium.io/docs/en/commands/device/app/get-app-strings/)中找到。

##### 用法

```js
driver.getStrings(language, stringFile)
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
      <td><code><var>language</var></code><br /><span className="label labelWarning">可选</span></td>
      <td>string</td>
      <td>语言代码</td>
    </tr>
    <tr>
      <td><code><var>stringFile</var></code><br /><span className="label labelWarning">可选</span></td>
      <td>string</td>
      <td>字符串文件的路径</td>
    </tr>
  </tbody>
</table>


##### 返回

- **&lt;object&gt;**
            **<code><var>appStrings</var></code>:** 应用中为指定语言和字符串文件名定义的所有字符串

##### 支持

![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## setValueImmediate
Appium 命令。更多详情可以在[官方协议文档](https://github.com/appium/appium-base-driver/blob/master/docs/mjsonwp/protocol-methods.md#appium-extension-endpoints)中找到。

##### 用法

```js
driver.setValueImmediate(elementId, text)
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
      <td><code><var>elementId</var></code></td>
      <td>String</td>
      <td>在先前调用查找元素时返回的元素 id</td>
    </tr>
    <tr>
      <td><code><var>text</var></code></td>
      <td>string</td>
      <td>设置到元素的文本</td>
    </tr>
  </tbody>
</table>


##### 支持

![Support for XCUITest (9.3+)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## replaceValue
直接替换元素的值。<br /><br />Appium 命令。更多详情可以在[官方协议文档](https://github.com/appium/appium-base-driver/blob/master/docs/mjsonwp/protocol-methods.md#appium-extension-endpoints)中找到。

##### 用法

```js
driver.replaceValue(elementId, value)
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
      <td><code><var>elementId</var></code></td>
      <td>String</td>
      <td>在先前调用查找元素时返回的元素 id</td>
    </tr>
    <tr>
      <td><code><var>value</var></code></td>
      <td>string</td>
      <td>在元素上替换的值</td>
    </tr>
  </tbody>
</table>


##### 支持

![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## getSettings
检索设备上的当前设置。<br /><br />Appium 命令。更多详情可以在[官方协议文档](https://appium.github.io/appium.io/docs/en/commands/session/settings/get-settings/)中找到。

##### 用法

```js
driver.getSettings()
```


##### 返回

- **&lt;object&gt;**
            **<code><var>settings</var></code>:** 所有当前指定设置的 JSON 哈希，请参阅设置 API

##### 支持

![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for Windows (10+)](/img/icons/windows.svg)

---

## updateSettings
更新设备上的当前设置。<br /><br />Appium 命令。更多详情可以在[官方协议文档](https://appium.github.io/appium.io/docs/en/commands/session/settings/update-settings/)中找到。

##### 用法

```js
driver.updateSettings(settings)
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
      <td><code><var>settings</var></code></td>
      <td>object</td>
      <td>带有要更新的设置的键/值对象</td>
    </tr>
  </tbody>
</table>


##### 支持

![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for Windows (10+)](/img/icons/windows.svg)

---

## receiveAsyncResponse
用于异步执行 JavaScript 的回调 url。<br /><br />Appium 命令。更多详情可以在[官方协议文档](https://github.com/appium/appium-base-driver/blob/master/docs/mjsonwp/protocol-methods.md#appium-extension-endpoints)中找到。

##### 用法

```js
driver.receiveAsyncResponse(response)
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
      <td><code><var>response</var></code></td>
      <td>object</td>
      <td>在设备上接收的响应</td>
    </tr>
  </tbody>
</table>


##### 支持

![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)

---

## gsmCall
拨打 GSM 电话（仅限模拟器）。<br /><br />Appium 命令。更多详情可以在[官方协议文档](https://appium.github.io/appium.io/docs/en/commands/device/network/gsm-call/)中找到。

##### 用法

```js
driver.gsmCall(phoneNumber, action)
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
      <td><code><var>phoneNumber</var></code></td>
      <td>string</td>
      <td>要拨打的电话号码</td>
    </tr>
    <tr>
      <td><code><var>action</var></code></td>
      <td>string</td>
      <td>操作 - 'call', 'accept', 'cancel', 'hold'</td>
    </tr>
  </tbody>
</table>


##### 支持

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## gsmSignal
设置 GSM 信号强度（仅限模拟器）。<br /><br />Appium 命令。更多详情可以在[官方协议文档](https://appium.github.io/appium.io/docs/en/commands/device/network/gsm-signal/)中找到。

##### 用法

```js
driver.gsmSignal(signalStrength, signalStrengh)
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
      <td><code><var>signalStrength</var></code></td>
      <td>string</td>
      <td>范围 [0, 4] 内的信号强度</td>
    </tr>
    <tr>
      <td><code><var>signalStrengh</var></code><br /><span className="label labelWarning">可选</span></td>
      <td>string</td>
      <td>范围 [0, 4] 内的信号强度。如果您使用 Appium v1.11.0 或更低版本，请同样使用相同的值设置此参数（参见 https://github.com/appium/appium/issues/12234）。</td>
    </tr>
  </tbody>
</table>


##### 支持

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## powerCapacity
设置电池百分比（仅限模拟器）。<br /><br />Appium 命令。更多详情可以在[官方协议文档](https://appium.github.io/appium.io/docs/en/commands/device/emulator/power_capacity/)中找到。

##### 用法

```js
driver.powerCapacity(percent)
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
      <td><code><var>percent</var></code></td>
      <td>number</td>
      <td>范围 [0, 100] 内的百分比值</td>
    </tr>
  </tbody>
</table>


##### 支持

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## powerAC
设置电池充电器的状态为连接或未连接（仅限模拟器）。<br /><br />Appium 命令。更多详情可以在[官方协议文档](https://appium.github.io/appium.io/docs/en/commands/device/emulator/power_ac/)中找到。

##### 用法

```js
driver.powerAC(state)
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
      <td><code><var>state</var></code></td>
      <td>string</td>
      <td>设置状态。on 或 off</td>
    </tr>
  </tbody>
</table>


##### 支持

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## gsmVoice
设置 GSM 语音状态（仅限模拟器）。<br /><br />Appium 命令。更多详情可以在[官方协议文档](https://appium.github.io/appium.io/docs/en/commands/device/network/gsm-voice/)中找到。

##### 用法

```js
driver.gsmVoice(state)
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
      <td><code><var>state</var></code></td>
      <td>string</td>
      <td>GSM 语音的状态 - 'unregistered', 'home', 'roaming', 'searching', 'denied', 'off', 'on'</td>
    </tr>
  </tbody>
</table>


##### 支持

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## sendSms
模拟短信消息（仅限模拟器）。<br /><br />Appium 命令。更多详情可以在[官方协议文档](https://appium.github.io/appium.io/docs/en/commands/device/network/send-sms/)中找到。

##### 用法

```js
driver.sendSms(phoneNumber, message)
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
      <td><code><var>phoneNumber</var></code></td>
      <td>string</td>
      <td>要发送短信的电话号码</td>
    </tr>
    <tr>
      <td><code><var>message</var></code></td>
      <td>string</td>
      <td>短信内容</td>
    </tr>
  </tbody>
</table>


##### 支持

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## fingerPrint
在支持的模拟器上通过使用指纹扫描验证用户。<br /><br />Appium 命令。更多详情可以在[官方协议文档](https://appium.github.io/appium.io/docs/en/commands/device/authentication/finger-print/)中找到。

##### 用法

```js
driver.fingerPrint(fingerprintId)
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
      <td><code><var>fingerprintId</var></code></td>
      <td>number</td>
      <td>存储在 Android 密钥库系统中的指纹（1 到 10）</td>
    </tr>
  </tbody>
</table>


##### 支持

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## setClipboard
设置系统剪贴板的内容<br /><br />Appium 命令。更多详情可以在[官方协议文档](https://appium.github.io/appium.io/docs/en/commands/device/clipboard/set-clipboard/)中找到。

##### 用法

```js
driver.setClipboard(content, contentType, label)
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
      <td><code><var>content</var></code></td>
      <td>string</td>
      <td>实际的 base64 编码剪贴板内容</td>
    </tr>
    <tr>
      <td><code><var>contentType</var></code><br /><span className="label labelWarning">可选</span></td>
      <td>string</td>
      <td>要获取的内容类型。Plaintext, Image, URL。Android 仅支持纯文本</td>
    </tr>
    <tr>
      <td><code><var>label</var></code><br /><span className="label labelWarning">可选</span></td>
      <td>string</td>
      <td>Android 的剪贴板数据标签</td>
    </tr>
  </tbody>
</table>


##### 返回

- **&lt;string&gt;**
            **<code><var>response</var></code>:** Appium 服务器的响应

##### 支持

![Support for XCUITest (9.3+)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## getClipboard
获取系统剪贴板的内容<br /><br />Appium 命令。更多详情可以在[官方协议文档](https://appium.github.io/appium.io/docs/en/commands/device/clipboard/get-clipboard/)中找到。

##### 用法

```js
driver.getClipboard(contentType)
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
      <td><code><var>contentType</var></code><br /><span className="label labelWarning">可选</span></td>
      <td>string</td>
      <td>要获取的内容类型。Plaintext, Image, URL。Android 仅支持纯文本</td>
    </tr>
  </tbody>
</table>


##### 返回

- **&lt;string&gt;**
            **<code><var>response</var></code>:** 剪贴板内容作为 base64 编码字符串，如果剪贴板为空则为空字符串

##### 支持

![Support for XCUITest (9.3+)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## touchPerform
此功能仅在原生上下文中可用。"触摸执行"与其他单一触摸交互类似，不同之处在于它允许您将多个触摸动作链接为一个命令。这很有用，因为 Appium 命令是通过网络发送的，命令之间存在延迟。这种延迟可能会使某些触摸交互变得不可能，因为某些交互需要在一个序列中执行。例如，垂直滑动需要按下、移动到不同的 y 坐标，然后释放。要使其工作，交互之间不能有延迟。<br /><br />Appium 命令。更多详情可以在[官方协议文档](https://appium.github.io/appium.io/docs/en/commands/interactions/touch/touch-perform/)中找到。

##### 用法

```js
driver.touchPerform(actions)
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
      <td><code><var>actions</var></code></td>
      <td>object[]</td>
      <td>要执行的动作类型（例如 moveTo, release, press, tap, wait）</td>
    </tr>
  </tbody>
</table>

##### 示例


```js
// 按百分比进行水平滑动
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


##### 支持

![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for Windows (10+)](/img/icons/windows.svg)

---

## multiTouchPerform
此功能仅在原生上下文中可用。执行多点触控操作序列。<br /><br />Appium 命令。更多详情可以在[官方协议文档](https://appium.github.io/appium.io/docs/en/commands/interactions/touch/multi-touch-perform/)中找到。

##### 用法

```js
driver.multiTouchPerform(actions)
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
      <td><code><var>actions</var></code></td>
      <td>object[]</td>
      <td>要执行的动作类型（例如 moveTo, release, press, tap, wait）</td>
    </tr>
  </tbody>
</table>


##### 支持

![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for Windows (10+)](/img/icons/windows.svg)

---

## executeDriverScript
此命令使您能够将 WebdriverIO 脚本指定为字符串并将其传输到 Appium 服务器以在服务器本身上本地执行。这种方法有助于最小化与每个命令相关的潜在延迟。***要在 Appium 2.0 中使用此命令，您必须安装 [`execute-driver-plugin`](https://github.com/appium/appium/tree/master/packages/execute-driver-plugin) 插件。***<br /><br />Appium 命令。更多详情可以在[官方协议文档](https://github.com/appium/appium/blob/master/docs/en/commands/session/execute-driver.md)中找到。

##### 用法

```js
driver.executeDriverScript(script, type, timeout)
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
      <td><code><var>script</var></code></td>
      <td>string</td>
      <td>要执行的脚本。它可以访问一个 'driver' 对象，该对象表示连接到当前服务器的 WebdriverIO 会话。</td>
    </tr>
    <tr>
      <td><code><var>type</var></code><br /><span className="label labelWarning">可选</span></td>
      <td>string</td>
      <td>脚本中使用的语言/框架。目前，仅支持 'webdriverio'，这是默认值。</td>
    </tr>
    <tr>
      <td><code><var>timeout</var></code><br /><span className="label labelWarning">可选</span></td>
      <td>number</td>
      <td>脚本在被 Appium 服务器终止之前允许运行的毫秒数。默认为相当于 1 小时。</td>
    </tr>
  </tbody>
</table>


##### 返回

- **&lt;object&gt;**
            **<code><var>result</var></code>:** 一个包含两个字段的对象：'result'，它是脚本本身的返回值，和 'logs'，它包含 3 个内部字段，'log'、'warn' 和 'error'，它们分别包含在脚本执行期间由 console.log、console.warn 和 console.error 记录的字符串数组。


---

## getEvents
获取存储在 appium 服务器中的事件。<br /><br />Appium 命令。更多详情可以在[官方协议文档](https://github.com/appium/appium/blob/master/docs/en/commands/session/events/get-events.md)中找到。

##### 用法

```js
driver.getEvents(type)
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
      <td><code><var>type</var></code></td>
      <td>string[]</td>
      <td>如果提供了类型，获取使用该类型过滤的事件。</td>
    </tr>
  </tbody>
</table>


##### 返回

- **&lt;object&gt;**
            **<code><var>result</var></code>:** 事件的 JSON 哈希，例如 `{'commands' => [{'cmd' => 123455, ....}], 'startTime' => 1572954894127, }`。

##### 支持

![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for XCUITest (9.3+)](/img/icons/ios.svg)

---

## logEvent
存储自定义事件。<br /><br />Appium 命令。更多详情可以在[官方协议文档](https://github.com/appium/appium/blob/master/docs/en/commands/session/events/log-event.md)中找到。

##### 用法

```js
driver.logEvent(vendor, event)
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
      <td><code><var>vendor</var></code></td>
      <td>string</td>
      <td>供应商的名称。它将是 `vendor:event` 中的 `vendor`。</td>
    </tr>
    <tr>
      <td><code><var>event</var></code></td>
      <td>string</td>
      <td>事件的名称。它将是 `vendor:event` 中的 `event`。</td>
    </tr>
  </tbody>
</table>


##### 支持

![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for XCUITest (9.3+)](/img/icons/ios.svg)

---

## compareImages
此功能利用 OpenCV 框架的能力进行图像比较。请注意，要使此功能工作，必须在运行 Appium 服务器的机器上安装 OpenCV 框架和 opencv4nodejs 模块。***此外，要在 Appium 2.0 中使用此功能，您需要安装 [`images-plugin`](https://github.com/appium/appium/tree/master/packages/images-plugin) 插件。***<br /><br />Appium 命令。更多详情可以在[官方协议文档](https://appium.github.io/appium.io/docs/en/writing-running-appium/image-comparison/)中找到。

##### 用法

```js
driver.compareImages(mode, firstImage, secondImage, options)
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
      <td><code><var>mode=matchFeatures</var></code></td>
      <td>string</td>
      <td>可能的比较模式之一：'matchFeatures', 'getSimilarity', 'matchTemplate'。默认为 'matchFeatures'。</td>
    </tr>
    <tr>
      <td><code><var>firstImage</var></code></td>
      <td>string</td>
      <td>图像数据。支持 OpenCV 库本身接受的所有图像格式。</td>
    </tr>
    <tr>
      <td><code><var>secondImage</var></code></td>
      <td>string</td>
      <td>图像数据。支持 OpenCV 库本身接受的所有图像格式。</td>
    </tr>
    <tr>
      <td><code><var>options=[object Object]</var></code></td>
      <td>object</td>
      <td>此字典的内容取决于实际的 `mode` 值。有关更多详情，请参阅 `appium-support` 模块的文档。</td>
    </tr>
  </tbody>
</table>


##### 返回

- **&lt;object&gt;**
            **<code><var>result</var></code>:** 结果字典的内容取决于实际的 `mode` 和 `options` 值。有关更多详情，请参阅 `appium-support` 模块的文档。


---

## implicitWait
设置驱动程序在搜索元素时应等待的时间量。在搜索单个元素时，驱动程序应轮询页面，直到找到元素或超时到期，以先发生者为准。在搜索多个元素时，驱动程序应轮询页面，直到至少找到一个元素或超时到期，此时它应返回一个空列表。如果从未发送此命令，则驱动程序应默认为 0ms 的隐式等待。<br /><br />Appium 命令。更多详情可以在[官方协议文档](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints)中找到。

##### 用法

```js
driver.implicitWait(ms)
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
      <td><code><var>ms</var></code></td>
      <td>number</td>
      <td>等待元素的时间量（以毫秒为单位）。</td>
    </tr>
  </tbody>
</table>


##### 支持

![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for XCUITest (9.3+)](/img/icons/ios.svg)

---

## getLocationInView
确定元素在滚动到视图后在屏幕上的位置。<br /><br />__注意：__ 这被视为内部命令，仅应用于确定元素的位置以正确生成原生事件。<br /><br />Appium 命令。更多详情可以在[官方协议文档](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints)中找到。

##### 用法

```js
driver.getLocationInView(elementId)
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
      <td><code><var>elementId</var></code></td>
      <td>String</td>
      <td>路由命令的元素 ID</td>
    </tr>
  </tbody>
</table>


##### 返回

- **&lt;Object&gt;**
            **<code><var>location</var></code>:** 页面上元素的 X 和 Y 坐标。

##### 支持

![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for XCUITest (9.3+)](/img/icons/ios.svg)

---

## sendKeys
向活动元素发送一系列按键<br /><br />Appium 命令。更多详情可以在[官方协议文档](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints)中找到。

##### 用法

```js
driver.sendKeys(value)
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
      <td><code><var>value</var></code></td>
      <td>string[]</td>
      <td>要输入的按键序列。必须提供一个数组。</td>
    </tr>
  </tbody>
</table>


##### 支持

![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for XCUITest (9.3+)](/img/icons/ios.svg)

---

## availableIMEEngines
列出机器上所有可用的引擎。要使用引擎，它必须出现在此列表中。<br /><br />Appium 命令。更多详情可以在[官方协议文档](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints)中找到。

##### 用法

```js
driver.availableIMEEngines()
```


##### 返回

- **&lt;String[]&gt;**
            **<code><var>engines</var></code>:** 可用引擎列表

##### 支持

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## getActiveIMEEngine
获取活动 IME 引擎的名称。名称字符串是平台特定的。<br /><br />Appium 命令。更多详情可以在[官方协议文档](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints)中找到。

##### 用法

```js
driver.getActiveIMEEngine()
```


##### 返回

- **&lt;String&gt;**
            **<code><var>engine</var></code>:** 活动 IME 引擎的名称

##### 支持

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## isIMEActivated
指示 IME 输入当前是否处于活动状态<br /><br />Appium 命令。更多详情可以在[官方协议文档](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints)中找到。

##### 用法

```js
driver.isIMEActivated()
```


##### 返回

- **&lt;Boolean&gt;**
            **<code><var>isActive</var></code>:** 如果 IME 输入可用且当前活动则为 true，否则为 false

##### 支持

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## deactivateIMEEngine
停用当前活动的 IME 引擎。<br /><br />Appium 命令。更多详情可以在[官方协议文档](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints)中找到。

##### 用法

```js
driver.deactivateIMEEngine()
```




##### 支持

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## activateIMEEngine
激活可用的引擎<br /><br />Appium 命令。更多详情可以在[官方协议文档](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints)中找到。

##### 用法

```js
driver.activateIMEEngine(engine)
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
      <td><code><var>engine</var></code></td>
      <td>string</td>
      <td>要激活的引擎名称</td>
    </tr>
  </tbody>
</table>


##### 支持

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## asyncScriptTimeout
设置由 `/session/:sessionId/execute_async` 执行的异步脚本在中止并向客户端返回 `Timeout` 错误之前允许运行的时间量（以毫秒为单位）。<br /><br />Appium 命令。更多详情可以在[官方协议文档](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints)中找到。

##### 用法

```js
driver.asyncScriptTimeout(ms)
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
      <td><code><var>ms</var></code></td>
      <td>number</td>
      <td>限时命令允许运行的时间量（以毫秒为单位）</td>
    </tr>
  </tbody>
</table>


##### 支持

![Support for XCUITest (9.3+)](/img/icons/ios.svg)

---

## submit
提交表单元素。<br /><br />Appium 命令。更多详情可以在[官方协议文档](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints)中找到。

##### 用法

```js
driver.submit(elementId)
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
      <td><code><var>elementId</var></code></td>
      <td>String</td>
      <td>要提交的表单元素的 ID</td>
    </tr>
  </tbody>
</table>


##### 支持

![Support for XCUITest (9.3+)](/img/icons/ios.svg)

---

## getElementSize
确定元素的大小（以像素为单位）。大小将作为带有 `width` 和 `height` 属性的 JSON 对象返回。<br /><br />Appium 命令。更多详情可以在[官方协议文档](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints)中找到。

##### 用法

```js
driver.getElementSize(elementId)
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
      <td><code><var>elementId</var></code></td>
      <td>String</td>
      <td>路由命令的元素 ID</td>
    </tr>
  </tbody>
</table>


##### 返回

- **&lt;Object&gt;**
            **<code><var>size</var></code>:** 元素的宽度和高度（以像素为单位）。

##### 支持

![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for XCUITest (9.3+)](/img/icons/ios.svg)

---

## getElementLocation
确定页面上元素的位置。点 `(0, 0)` 指页面的左上角。元素的坐标作为带有 `x` 和 `y` 属性的 JSON 对象返回。<br /><br />Appium 命令。更多详情可以在[官方协议文档](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints)中找到。

##### 用法

```js
driver.getElementLocation(elementId)
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
      <td><code><var>elementId</var></code></td>
      <td>String</td>
      <td>路由命令的元素 ID</td>
    </tr>
  </tbody>
</table>


##### 返回

- **&lt;Object&gt;**
            **<code><var>location</var></code>:** 页面上元素的 X 和 Y 坐标。

##### 支持

![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for XCUITest (9.3+)](/img/icons/ios.svg)

---

## touchClick
在支持触摸的设备上单击。<br /><br />Appium 命令。更多详情可以在[官方协议文档](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints)中找到。

##### 用法

```js
driver.touchClick(element)
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
      <td><code><var>element</var></code></td>
      <td>string</td>
      <td>要单击的元素的 ID。</td>
    </tr>
  </tbody>
</table>


##### 支持

![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for XCUITest (9.3+)](/img/icons/ios.svg)

---

## touchDown
手指按下屏幕。<br /><br />Appium 命令。更多详情可以在[官方协议文档](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints)中找到。

##### 用法

```js
driver.touchDown(x, y)
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
      <td><code><var>x</var></code></td>
      <td>number</td>
      <td>屏幕上的 x 坐标</td>
    </tr>
    <tr>
      <td><code><var>y</var></code></td>
      <td>number</td>
      <td>屏幕上的 y 坐标</td>
    </tr>
  </tbody>
</table>


##### 支持

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## touchUp
手指离开屏幕。<br /><br />Appium 命令。更多详情可以在[官方协议文档](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints)中找到。

##### 用法

```js
driver.touchUp(x, y)
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
      <td><code><var>x</var></code></td>
      <td>number</td>
      <td>屏幕上的 x 坐标</td>
    </tr>
    <tr>
      <td><code><var>y</var></code></td>
      <td>number</td>
      <td>屏幕上的 y 坐标</td>
    </tr>
  </tbody>
</table>


##### 支持

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## touchMove
手指在屏幕上移动。<br /><br />Appium 命令。更多详情可以在[官方协议文档](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints)中找到。

##### 用法

```js
driver.touchMove(x, y)
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
      <td><code><var>x</var></code></td>
      <td>number</td>
      <td>屏幕上的 x 坐标</td>
    </tr>
    <tr>
      <td><code><var>y</var></code></td>
      <td>number</td>
      <td>屏幕上的 y 坐标</td>
    </tr>
  </tbody>
</table>


##### 支持

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## touchLongClick
使用手指动作事件在触摸屏上长按。<br /><br />Appium 命令。更多详情可以在[官方协议文档](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints)中找到。

##### 用法

```js
driver.touchLongClick(element)
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
      <td><code><var>element</var></code></td>
      <td>string</td>
      <td>要长按的元素的 ID</td>
    </tr>
  </tbody>
</table>


##### 支持

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## touchFlick
使用手指动作事件在触摸屏上滑动。此滑动命令从特定屏幕位置开始。<br /><br />Appium 命令。更多详情可以在[官方协议文档](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints)中找到。

##### 用法

```js
driver.touchFlick(xoffset, yoffset, element, speed, xspeed, yspeed)
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
      <td><code><var>xoffset</var></code><br /><span className="label labelWarning">可选</span></td>
      <td>number</td>
      <td>滑动的 x 偏移像素</td>
    </tr>
    <tr>
      <td><code><var>yoffset</var></code><br /><span className="label labelWarning">可选</span></td>
      <td>number</td>
      <td>滑动的 y 偏移像素</td>
    </tr>
    <tr>
      <td><code><var>element</var></code><br /><span className="label labelWarning">可选</span></td>
      <td>string</td>
      <td>滑动开始位置的元素 ID</td>
    </tr>
    <tr>
      <td><code><var>speed</var></code><br /><span className="label labelWarning">可选</span></td>
      <td>number</td>
      <td>速度（像素/秒）</td>
    </tr>
    <tr>
      <td><code><var>xspeed</var></code><br /><span className="label labelWarning">可选</span></td>
      <td>number</td>
      <td>x 速度（像素/秒）</td>
    </tr>
    <tr>
      <td><code><var>yspeed</var></code><br /><span className="label labelWarning">可选</span></td>
      <td>number</td>
      <td>y 速度（像素/秒）</td>
    </tr>
  </tbody>
</table>


##### 支持

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## getOrientation
获取当前设备方向。<br /><br />Appium 命令。更多详情可以在[官方协议文档](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints)中找到。

##### 用法

```js
driver.getOrientation()
```


##### 返回

- **&lt;String&gt;**
            **<code><var>orientation</var></code>:** 当前方向对应于 ScreenOrientation 中定义的值：`LANDSCAPE|PORTRAIT`。

##### 支持

![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for XCUITest (9.3+)](/img/icons/ios.svg)

---

## setOrientation
设置设备方向<br /><br />Appium 命令。更多详情可以在[官方协议文档](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints)中找到。

##### 用法

```js
driver.setOrientation(orientation)
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
      <td><code><var>orientation</var></code></td>
      <td>string</td>
      <td>ScreenOrientation 中定义的新浏览器方向：`LANDSCAPE|PORTRAIT`</td>
    </tr>
  </tbody>
</table>


##### 支持

![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for XCUITest (9.3+)](/img/icons/ios.svg)

---

## getLogs
获取给定日志类型的日志。每次请求后重置日志缓冲区。<br /><br />Appium 命令。更多详情可以在[官方协议文档](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints)中找到。

##### 用法

```js
driver.getLogs(type)
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
      <td><code><var>type</var></code></td>
      <td>string</td>
      <td>日志类型</td>
    </tr>
  </tbody>
</table>


##### 返回

- **&lt;Object[]&gt;**
            **<code><var>logs</var></code>:** 日志条目列表。

##### 支持

![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for XCUITest (9.3+)](/img/icons/ios.svg)

---

## getLogTypes
获取可用的日志类型。<br /><br />Appium 命令。更多详情可以在[官方协议文档](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints)中找到。

##### 用法

```js
driver.getLogTypes()
```


##### 返回

- **&lt;String[]&gt;**
            **<code><var>logTypes</var></code>:** 可用日志类型的列表。

##### 支持

![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for XCUITest (9.3+)](/img/icons/ios.svg)
