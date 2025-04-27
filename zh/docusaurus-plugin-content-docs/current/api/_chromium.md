---
id: chromium
title: Chromium
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-protocols/src/protocols/chromium.ts
---

## isAlertOpen
判断是否有简单对话框当前打开。<br /><br />非官方且未记录的Chromium命令。关于此命令的更多信息可以在[这里](https://github.com/bayandin/chromedriver/blob/v2.45/alert_commands.cc#L42-L49)找到。

##### 用法

```js
browser.isAlertOpen()
```

##### 示例


```js
console.log(browser.isAlertOpen()); // 输出: false
browser.execute('window.alert()');
console.log(browser.isAlertOpen()); // 输出: true
```


##### 返回

- **&lt;Boolean&gt;**
            **<code><var>isAlertOpen</var></code>:** 根据简单对话框是否存在返回`true`或`false`。


---

## isAutoReporting
是否自动在浏览器日志上报错误。<br /><br />非官方且未记录的Chromium命令。关于此命令的更多信息可以在[这里](https://codereview.chromium.org/101203012)找到。

##### 用法

```js
browser.isAutoReporting()
```


##### 返回

- **&lt;Boolean&gt;**
            **<code><var>isAutoReporting</var></code>:** 根据自动报告是否启用返回`true`或`false`。


---

## setAutoReporting
切换是否为所有后续命令返回带有未知错误的响应，其中包含第一个浏览器错误（例如由于403/404响应而导致的资源加载失败）（一旦启用）。<br /><br />非官方且未记录的Chromium命令。关于此命令的更多信息可以在[这里](https://codereview.chromium.org/101203012)找到。

##### 用法

```js
browser.setAutoReporting(enabled)
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
      <td><code><var>enabled</var></code></td>
      <td>boolean</td>
      <td>如果应启用自动报告则为`true`，使用`false`禁用先前启用的自动报告。</td>
    </tr>
  </tbody>
</table>

##### 示例


```js
// 在会话初始化后，浏览器日志为空时首先启用自动报告
console.log(browser.setAutoReporting(true)); // 输出: null
// 请求不存在的资源时，由于抛出未知错误而中止执行
browser.url('https://webdriver.io/img/404-does-not-exist.png');
```


```js
// 在会话期间执行一些操作，填充浏览器日志
browser.url('https://webdriver.io/img/404-does-not-exist.png');
browser.url('https://webdriver.io/403/no-access');
// 启用自动报告，为第一个浏览器日志（404响应）抛出未知错误
browser.setAutoReporting(true);
```


##### 返回

- **&lt;Object|Null&gt;**
            **<code><var>firstBrowserError</var></code>:** 如果在执行此命令之前已经发生第一个浏览器错误，它将抛出一个未知错误作为响应，这是一个带有'message'键的对象，描述第一个浏览器错误。否则，成功时返回`null`。


---

## isLoading
确定活动窗口句柄的加载状态。<br /><br />非官方且未记录的Chromium命令。关于此命令的更多信息可以在[这里](https://github.com/bayandin/chromedriver/blob/v2.45/session_commands.cc#L783-L802)找到。

##### 用法

```js
browser.isLoading()
```

##### 示例


```js
console.log(browser.isLoading()); // 输出: false
browser.newWindow('https://webdriver.io');
console.log(browser.isLoading()); // 输出: true
```


##### 返回

- **&lt;Boolean&gt;**
            **<code><var>isLoading</var></code>:** 根据活动窗口句柄是否正在加载返回`true`或`false`。


---

## takeHeapSnapshot
拍摄当前执行上下文的堆快照。<br /><br />非官方且未记录的Chromium命令。关于此命令的更多信息可以在[这里](https://github.com/bayandin/chromedriver/blob/v2.45/chrome/web_view.h#L198-L202)找到。

##### 用法

```js
browser.takeHeapSnapshot()
```


##### 返回

- **&lt;Object&gt;**
            **<code><var>heapSnapshot</var></code>:** 堆快照的JSON表示。可以通过将其作为文件加载到Chrome DevTools中进行检查。


---

## getNetworkConnection
获取网络模拟的连接类型。此命令仅适用于远程端回复`networkConnectionEnabled`功能设置为`true`的情况。<br /><br />非官方且未记录的Chromium命令。关于此命令的更多信息可以在[这里](https://github.com/SeleniumHQ/mobile-spec/blob/master/spec-draft.md#device-modes)找到。

##### 用法

```js
browser.getNetworkConnection()
```

##### 示例


```js
const browser = remote({
    capabilities: {
        browserName: 'chrome',
        'goog:chromeOptions': {
            // 网络模拟需要设备模式，只有在移动模拟开启时才启用
            mobileEmulation: { deviceName: 'iPad' },
        },
    }
});
console.log(browser.getNetworkConnection()); // 输出: 6 (同时启用Wi-Fi和数据)
```


##### 返回

- **&lt;Number&gt;**
            **<code><var>connectionType</var></code>:** 表示网络连接类型的位掩码。飞行模式（`1`），仅Wi-Fi（`2`），Wi-Fi和数据（`6`），4G（`8`），3G（`10`），2G（`20`）。默认情况下[启用Wi-Fi和数据](https://github.com/bayandin/chromedriver/blob/v2.45/chrome/chrome_desktop_impl.cc#L36-L37)。


---

## setNetworkConnection
更改网络连接的连接类型。此命令仅适用于远程端回复`networkConnectionEnabled`功能设置为`true`的情况。<br /><br />非官方且未记录的Chromium命令。关于此命令的更多信息可以在[这里](https://github.com/SeleniumHQ/mobile-spec/blob/master/spec-draft.md#device-modes)找到。

##### 用法

```js
browser.setNetworkConnection(parameters)
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
      <td><code><var>parameters</var></code></td>
      <td>object</td>
      <td>包含ConnectionType的对象，在对象中将位掩码设置为`type`键的值。飞行模式（`1`），仅Wi-Fi（`2`），Wi-Fi和数据（`6`），4G（`8`），3G（`10`），2G（`20`）。</td>
    </tr>
  </tbody>
</table>

##### 示例


```js
const browser = remote({
    capabilities: {
        browserName: 'chrome',
        'goog:chromeOptions': {
            // 网络模拟需要设备模式，只有在移动模拟开启时才启用
            mobileEmulation: { deviceName: 'iPad' },
        },
    }
});
console.log(browser.setNetworkConnection({ type: 1 })); // 输出: 1 (飞行模式)
```


##### 返回

- **&lt;Number&gt;**
            **<code><var>connectionType</var></code>:** 表示网络连接类型的位掩码。值应与对象中指定的`type`匹配，但设备可能不支持所请求的网络连接类型。


---

## getNetworkConditions
获取用于模拟的当前网络条件。<br /><br />非官方且未记录的Chromium命令。关于此命令的更多信息可以在[这里](https://github.com/bayandin/chromedriver/blob/v2.45/session_commands.cc#L839-L859)找到。

##### 用法

```js
browser.getNetworkConditions()
```


##### 返回

- **&lt;Object&gt;**
            **<code><var>networkConditions</var></code>:** 包含`offline`、`latency`、`download_throughput`和`upload_throughput`网络条件的对象。必须先设置网络条件才能获取。


---

## setNetworkConditions
通过节流连接设置用于模拟的网络条件。<br /><br />非官方且未记录的Chromium命令。关于此命令的更多信息可以在[这里](https://github.com/bayandin/chromedriver/blob/v2.45/window_commands.cc#L1663-L1722)找到。

##### 用法

```js
browser.setNetworkConditions(network_conditions, network_name)
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
      <td><code><var>network_conditions</var></code></td>
      <td>object</td>
      <td>包含网络条件的对象，这些条件是`latency`、`throughput`（或`download_throughput`/`upload_throughput`）和`offline`（可选）。</td>
    </tr>
    <tr>
      <td><code><var>network_name</var></code><br /><span className="label labelWarning">可选</span></td>
      <td>string</td>
      <td>[网络节流预设](https://github.com/bayandin/chromedriver/blob/v2.45/chrome/network_list.cc#L12-L25)的名称。`GPRS`、`Regular 2G`、`Good 2G`、`Regular 3G`、`Good 3G`、`Regular 4G`、`DSL`、`WiFi`或`No throttling`以禁用。指定预设时，第一个参数中传递的值将不被考虑。</td>
    </tr>
  </tbody>
</table>

##### 示例


```js
// 使用不同的下载（25kb/s）和上传（50kb/s）吞吐量值进行节流，延迟为1000ms
browser.setNetworkConditions({ latency: 1000, download_throughput: 25600, upload_throughput: 51200 });
```


```js
// 通过将'offline'设置为true强制断开网络连接
browser.setNetworkConditions({ latency: 0, throughput: 0, offline: true });
```


```js
// 当指定预设名称（例如'DSL'）时，不会考虑对象中的值（例如'offline'）
browser.setNetworkConditions({ latency: 0, throughput: 0, offline: true }, 'DSL');
```


```js
// 指定网络节流预设的最佳做法是使用空对象
browser.setNetworkConditions({}, 'Good 3G');
```



---

## deleteNetworkConditions
禁用可能已设置的任何网络节流。等同于设置`No throttling`预设。<br /><br />非官方且未记录的Chromium命令。关于此命令的更多信息可以在[这里](https://github.com/bayandin/chromedriver/blob/v2.45/window_commands.cc#L1724-L1745)找到。

##### 用法

```js
browser.deleteNetworkConditions()
```



---

## sendCommand
向DevTools调试器发送命令。<br />有关可用命令及其参数的列表，请参阅[Chrome DevTools Protocol Viewer](https://chromedevtools.github.io/devtools-protocol/)。<br /><br />非官方且未记录的Chromium命令。关于此命令的更多信息可以在[这里](https://github.com/bayandin/chromedriver/blob/v2.45/window_commands.cc#L1290-L1304)找到。

##### 用法

```js
browser.sendCommand(cmd, params)
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
      <td><code><var>cmd</var></code></td>
      <td>string</td>
      <td>命令的名称（例如[`Browser.close`](https://chromedevtools.github.io/devtools-protocol/1-3/Browser#method-close)）。</td>
    </tr>
    <tr>
      <td><code><var>params</var></code></td>
      <td>object</td>
      <td>命令的参数。如果命令没有参数，请指定一个空对象。</td>
    </tr>
  </tbody>
</table>



---

## sendCommandAndGetResult
向DevTools调试器发送命令并等待结果。<br />有关可用命令及其参数的列表，请参阅[Chrome DevTools Protocol Viewer](https://chromedevtools.github.io/devtools-protocol/)。<br /><br />非官方且未记录的Chromium命令。关于此命令的更多信息可以在[这里](https://github.com/bayandin/chromedriver/blob/v2.45/window_commands.cc#L1306-L1320)找到。

##### 用法

```js
browser.sendCommandAndGetResult(cmd, params)
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
      <td><code><var>cmd</var></code></td>
      <td>string</td>
      <td>返回结果的命令的名称（例如[`Network.getAllCookies`](https://chromedevtools.github.io/devtools-protocol/1-3/Network#method-getAllCookies)）。</td>
    </tr>
    <tr>
      <td><code><var>params</var></code></td>
      <td>object</td>
      <td>命令的参数。如果命令没有参数，请指定一个空对象。</td>
    </tr>
  </tbody>
</table>


##### 返回

- **&lt;*&gt;**
            **<code><var>result</var></code>:** 命令的返回值，或者是导致命令失败的错误。


---

## file
将文件上传到运行浏览器的远程机器。<br /><br />非官方且未记录的Chromium命令。关于此命令的更多信息可以在[这里](https://github.com/bayandin/chromedriver/blob/v2.45/session_commands.cc#L1037-L1065)找到。

##### 用法

```js
browser.file(file)
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
      <td><code><var>file</var></code></td>
      <td>string</td>
      <td>Base64编码的zip归档，包含__单个__要上传的文件。如果base64编码的数据不代表zip归档或归档包含多个文件，将抛出未知错误。</td>
    </tr>
  </tbody>
</table>


##### 返回

- **&lt;String&gt;**
            **<code><var>path</var></code>:** 远程机器上已上传文件的绝对路径。


---

## launchChromeApp
通过指定的ID启动Chrome应用。<br /><br />非官方且未记录的Chromium命令。关于此命令的更多信息可以在[这里](https://github.com/bayandin/chromedriver/blob/v2.45/session_commands.cc#L521-L539)找到。

##### 用法

```js
browser.launchChromeApp(id)
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
      <td><code><var>id</var></code></td>
      <td>string</td>
      <td>要启动的应用的扩展ID，如chrome://extensions中定义。</td>
    </tr>
  </tbody>
</table>

##### 示例


```js
import fs from 'fs'
const browser = remote({
    capabilities: {
        browserName: 'chrome',
        'goog:chromeOptions': {
            // 启动浏览器时安装以便启动它
            extensions: [
              // 条目应为base64编码的打包Chrome应用（.crx）
              fs.readFileSync('/absolute/path/app.crx').toString('base64')
            ]
        }
    }
});
browser.launchChromeApp('aohghmighlieiainnegkcijnfilokake')); // Google Docs (https://chrome.google.com/webstore/detail/docs/aohghmighlieiainnegkcijnfilokake)
```



---

## getElementValue
检索给定表单控件元素的值。<br /><br />非官方且未记录的Chromium命令。关于此命令的更多信息可以在[这里](https://github.com/bayandin/chromedriver/blob/v2.45/element_commands.cc#L431-L443)找到。

##### 用法

```js
browser.getElementValue(elementId)
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
      <td>要获取值的元素的id</td>
    </tr>
  </tbody>
</table>


##### 返回

- **&lt;String|Null&gt;**
            **<code><var>value</var></code>:** 元素的当前值。如果指定的元素不是表单控件元素，将返回`null`。


---

## elementHover
为元素启用悬停状态，该状态将在下一次交互时重置。<br /><br />非官方且未记录的Chromium命令。关于此命令的更多信息可以在[这里](https://github.com/bayandin/chromedriver/blob/v2.45/element_commands.cc#L126-L146)找到。

##### 用法

```js
browser.elementHover(elementId)
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
      <td>要悬停的元素的id</td>
    </tr>
  </tbody>
</table>



---

## touchPinch
触发捏合缩放效果。<br /><br />非官方且未记录的Chromium命令。关于此命令的更多信息可以在[这里](https://github.com/bayandin/chromedriver/blob/v2.45/window_commands.cc#L813-L827)找到。

##### 用法

```js
browser.touchPinch(x, y, scale)
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
      <td>捏合的x位置</td>
    </tr>
    <tr>
      <td><code><var>y</var></code></td>
      <td>number</td>
      <td>捏合的y位置</td>
    </tr>
    <tr>
      <td><code><var>scale</var></code></td>
      <td>number</td>
      <td>捏合缩放比例</td>
    </tr>
  </tbody>
</table>



---

## freeze
冻结当前页面。[Page Lifecycle API](https://developers.google.com/web/updates/2018/07/page-lifecycle-api)的扩展。<br /><br />非官方且未记录的Chromium命令。关于此命令的更多信息可以在[这里](https://github.com/bayandin/chromedriver/blob/v2.45/window_commands.cc#L625-L633)找到。

##### 用法

```js
browser.freeze()
```



---

## resume
恢复当前页面。[Page Lifecycle API](https://developers.google.com/web/updates/2018/07/page-lifecycle-api)的扩展。<br /><br />非官方且未记录的Chromium命令。关于此命令的更多信息可以在[这里](https://github.com/bayandin/chromedriver/blob/v2.45/window_commands.cc#L635-L645)找到。

##### 用法

```js
browser.resume()
```



---

## getCastSinks
返回Chrome媒体路由器可用的Cast接收器（Cast设备）列表。<br /><br />非官方且未记录的Chromium命令。关于此命令的更多信息可以在[这里](https://chromium.googlesource.com/chromium/src/+/refs/tags/73.0.3683.121/chrome/test/chromedriver/server/http_handler.cc#748)找到。

##### 用法

```js
browser.getCastSinks()
```


##### 返回

- **&lt;string[]&gt;**
            **<code><var>sinks</var></code>:** 可用接收器列表。


---

## selectCastSink
选择Cast接收器（Cast设备）作为媒体路由器意图（连接或播放）的接收者。<br /><br />非官方且未记录的Chromium命令。关于此命令的更多信息可以在[这里](https://chromium.googlesource.com/chromium/src/+/refs/tags/73.0.3683.121/chrome/test/chromedriver/server/http_handler.cc#737)找到。

##### 用法

```js
browser.selectCastSink(sinkName)
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
      <td><code><var>sinkName</var></code></td>
      <td>string</td>
      <td>目标设备的名称。</td>
    </tr>
  </tbody>
</table>



---

## startCastTabMirroring
在指定设备上为当前浏览器标签启动标签镜像。<br /><br />非官方且未记录的Chromium命令。关于此命令的更多信息可以在[这里](https://chromium.googlesource.com/chromium/src/+/refs/tags/73.0.3683.121/chrome/test/chromedriver/server/http_handler.cc#741)找到。

##### 用法

```js
browser.startCastTabMirroring(sinkName)
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
      <td><code><var>sinkName</var></code></td>
      <td>string</td>
      <td>目标设备的名称。</td>
    </tr>
  </tbody>
</table>



---

## getCastIssueMessage
如果Cast会话中存在任何问题，则返回错误消息。<br /><br />非官方且未记录的Chromium命令。关于此命令的更多信息可以在[这里](https://chromium.googlesource.com/chromium/src/+/refs/tags/73.0.3683.121/chrome/test/chromedriver/server/http_handler.cc#751)找到。

##### 用法

```js
browser.getCastIssueMessage()
```


##### 返回

- **&lt;String&gt;**
            **<code><var>message</var></code>:** 错误消息（如果有）。


---

## stopCasting
如果已连接，停止从媒体路由器到指定设备的投射。<br /><br />非官方且未记录的Chromium命令。关于此命令的更多信息可以在[这里](https://chromium.googlesource.com/chromium/src/+/refs/tags/73.0.3683.121/chrome/test/chromedriver/server/http_handler.cc#744)找到。

##### 用法

```js
browser.stopCasting(sinkName)
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
      <td><code><var>sinkName</var></code></td>
      <td>string</td>
      <td>目标设备的名称。</td>
    </tr>
  </tbody>
</table>



---

## shutdown
关闭ChromeDriver进程，从而终止所有活动会话。<br /><br />非官方且未记录的Chromium命令。关于此命令的更多信息可以在[这里](https://github.com/bayandin/chromedriver/blob/v2.45/session_commands.cc#L489-L498)找到。

##### 用法

```js
browser.shutdown()
```



---

## takeElementScreenshot
Take Element Screenshot命令拍摄元素边界矩形所包围的可见区域的屏幕截图。<br /><br />非官方且未记录的Chromium命令。关于此命令的更多信息可以在[这里](https://w3c.github.io/webdriver/#dfn-take-element-screenshot)找到。

##### 用法

```js
browser.takeElementScreenshot(elementId, scroll)
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
      <td>在之前调用Find Element(s)时返回的元素ID</td>
    </tr>
    <tr>
      <td><code><var>scroll</var></code><br /><span className="label labelWarning">可选</span></td>
      <td>boolean</td>
      <td>将元素滚动到视图中。默认：true</td>
    </tr>
  </tbody>
</table>


##### 返回

- **&lt;String&gt;**
            **<code><var>screenshot</var></code>:** Base64编码的PNG图像数据，包含元素边界矩形的可见区域的屏幕截图，在将其滚动到视图中之后。


---

## getLogTypes
获取可用的日志类型。<br /><br />非官方且未记录的Chromium命令。关于此命令的更多信息可以在[这里](https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#sessionsessionidlogtypes)找到。

##### 用法

```js
browser.getLogTypes()
```


##### 返回

- **&lt;String[]&gt;**
            **<code><var>logTypes</var></code>:** 可用日志类型的列表，例如：browser、driver。


---

## getLogs
获取给定日志类型的日志。每次请求后日志缓冲区会被重置。<br /><br />非官方且未记录的Chromium命令。关于此命令的更多信息可以在[这里](https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#sessionsessionidlog)找到。

##### 用法

```js
browser.getLogs(type)
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