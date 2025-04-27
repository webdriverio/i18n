---
id: getContexts
title: getContexts（获取上下文）
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/mobile/getContexts.ts
---

WebdriverIO的`getContexts`方法是对默认Appium `contexts`（以及之前的WebdriverIO `getContexts`）命令的改进版本。它提供了移动应用会话中可用上下文的详细和可操作信息，解决了默认Appium方法的局限性。

### Webview工作原理及此方法的帮助
有关更多详细信息，请参阅[混合应用文档](/docs/api/mobile#hybrid-apps)。以下是`getContexts`命令解决的挑战摘要：

#### Android挑战
- 单个webview（例如`WEBVIEW_{packageName}`）可能包含多个页面（类似于浏览器标签）。
- 默认的Appium方法不包括这些页面的详细信息，如`title`、`url`或可见性，
  这使得识别正确的页面变得困难，并可能导致潜在的不稳定性。

#### iOS挑战
- 默认的Appium方法只返回通用的webview ID（例如`WEBVIEW_{id}`），没有任何额外的元数据。
- 这使得确定哪个webview对应目标应用屏幕变得困难。

增强的`getContexts`方法通过返回详细的上下文对象解决了这些问题，包括：
- **对于Android：** `title`、`url`、`packageName`、`webviewPageId`和布局详情（`screenX`、`screenY`、`width`和`height`）。
- **对于iOS：** `bundleId`、`title`和`url`。

这些增强功能使调试和与混合应用交互更加可靠。

### 为什么使用此方法？
默认情况下，Appium的`contexts`方法仅返回表示可用上下文的字符串数组：
- **对于Android：** `['NATIVE_APP', 'WEBVIEW_com.wdiodemoapp', ...]`
- **对于iOS：** `['NATIVE_APP', 'WEBVIEW_84392.1', ...]`

虽然对于简单场景足够，但这些默认响应缺乏混合应用测试所需的关键元数据：
- **对于Android：** 缺少页面特定的元数据使得与正确的webview交互变得具有挑战性。
- **对于iOS：** 通用webview ID不提供它们代表的内容或应用屏幕的洞察。

增强的`getContexts`方法提供：
- 针对Android和iOS的详细元数据。
- 用于过滤和自定义返回的上下文的选项，以便更好地定位和交互。

:::info 注意和限制

- 增强的`getContexts`方法在Android和iOS平台上都能工作。但是，返回的数据可能因平台和测试的应用而异。
- 如果未指定`returnDetailedContexts`选项，该方法的行为类似于默认的Appium `contexts`方法，返回简单的上下文数组。
- 要使用"默认"的Appium `contexts`方法，请使用`driver.getAppiumContexts()`。有关更多信息，请参阅[Appium Contexts文档](/docs/api/appium#getappiumcontexts)。

#### Android Webviews：
- 元数据如`androidWebviewData`仅在`returnAndroidDescriptionData`为`true`时可用。
- 在Chrome浏览器上使用`getContexts`方法可能会因浏览器/Webview/ChromeDriver版本不匹配而偶尔返回不完整的数据。在这种情况下，可能会返回默认值或不正确的`webviewPageId`（例如`0`）。

:::

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
      <td>`GetContextsOptions`</td>
      <td>`getContexts`选项（可选）</td>
    </tr>
    <tr>
      <td><code><var>options.returnDetailedContexts</var></code><br /><span className="label labelWarning">可选</span></td>
      <td>`boolean`</td>
      <td>默认情况下，我们只返回基于默认Appium `contexts` API的上下文名称。如果你想获取所有数据，可以将此设置为`true`。默认为`false`（可选）。</td>
    </tr>
    <tr>
      <td><code><var>options.androidWebviewConnectionRetryTime</var></code><br /><span className="label labelWarning">可选</span></td>
      <td>`number`</td>
      <td>每次尝试连接到webview之间等待的时间（毫秒）。默认为`500`毫秒（可选）。<br /><strong>仅限ANDROID</strong></td>
    </tr>
    <tr>
      <td><code><var>options.androidWebviewConnectTimeout</var></code><br /><span className="label labelWarning">可选</span></td>
      <td>`number`</td>
      <td>等待检测web视图页面的最长时间（毫秒）。默认为`5000`毫秒（可选）。<br /><strong>仅限ANDROID</strong></td>
    </tr>
    <tr>
      <td><code><var>options.filterByCurrentAndroidApp</var></code><br /><span className="label labelWarning">可选</span></td>
      <td>`boolean`</td>
      <td>默认情况下，我们返回所有webview。如果你想按当前打开的Android应用过滤webview，可以将此设置为`true`。默认为`false`（可选）。<br /><strong>注意：</strong>请注意，基于此"限制"，你也可能找不到任何Webview。<br /><strong>仅限ANDROID</strong></td>
    </tr>
    <tr>
      <td><code><var>options.isAndroidWebviewVisible</var></code><br /><span className="label labelWarning">可选</span></td>
      <td>`boolean`</td>
      <td>默认情况下，我们只返回已附加和可见的webview。如果你想获取所有webview，可以将此设置为`false`（可选）。默认为`true`。<br /><strong>仅限ANDROID</strong></td>
    </tr>
    <tr>
      <td><code><var>options.returnAndroidDescriptionData</var></code><br /><span className="label labelWarning">可选</span></td>
      <td>`boolean`</td>
      <td>默认情况下，不返回Android Webview（Chrome）描述数据。如果你想获取所有数据，可以将此设置为`true`。默认为`false`（可选）。<br />启用此选项后，你将在响应中获得额外数据，有关更多信息，请参阅`description.data.test.js`。<br /><strong>仅限ANDROID</strong></td>
    </tr>
  </tbody>
</table>

##### 示例

```js title="example.test.js"
it('should return all contexts in the current session with the default Appium `contexts`-method.', async () => {
    // For Android
    await driver.getContexts()
    // Returns ['NATIVE_APP', 'WEBVIEW_com.wdiodemoapp', ...]
    //
    // For iOS, the context will be 'WEBVIEW_{number}'
    await driver.getContexts()
    // Returns [ 'NATIVE_APP', 'WEBVIEW_84392.1', ... ]
})

```

```js title="detailed.test.js"
it('should return all contexts in the current session with detailed info.', async () => {
    // For Android
    await driver.getContexts({returnDetailedContexts: true})
    // Returns [
    //   { id: 'NATIVE_APP' },
    //   {
    //       id: 'WEBVIEW_com.wdiodemoapp',
    //       title: 'WebdriverIO · Next-gen browser and mobile automation test framework for Node.js | WebdriverIO',
    //       url: 'https://webdriver.io/',
    //       packageName: 'com.wdiodemoapp',
    //       webviewPageId: '58B0AA2DBBBBBE9008C35AE42385BB0D'
    //   },
    //   {
    //       id: 'WEBVIEW_chrome',
    //       title: 'Android | Get more done with Google on Android-phones and devices',
    //       url: 'https://www.android.com/',
    //       packageName: 'com.android.chrome',
    //       webviewPageId: '0'
    //   }
    // ]
    //
    // For iOS, the context will be 'WEBVIEW_{number}'
    await driver.getContexts({returnDetailedContexts: true})
    // Returns: [
    //   { id: 'NATIVE_APP' },
    //   {
    //       id: 'WEBVIEW_86150.1',
    //       title: 'WebdriverIO · Next-gen browser and mobile automation test framework for Node.js | WebdriverIO',
    //       url: 'https://webdriver.io/',
    //       bundleId: 'org.reactjs.native.example.wdiodemoapp'
    //   },
    //   {
    //       id: 'WEBVIEW_86152.1',
    //       title: 'Apple',
    //       url: 'https://www.apple.com/',
    //       bundleId: 'com.apple.mobilesafari'
    //   }
    // ]
})

```

```js title="description.data.test.js"
it('should return Android description data for the webview', async () => {
    // For Android
    await driver.getContexts({returnDetailedContexts: true, returnAndroidDescriptionData: true})
    // Returns [
    //   { id: 'NATIVE_APP' },
    //   {
    //       androidWebviewData: {
    //          // Indicates whether the web page is currently attached to a web view.
    //          // `true` means the page is attached and likely active, `false` indicates it is not.
    //          attached: true,
    //          // Indicates whether the web page is empty or not. An empty page typically means that
    //          // there is no significant content loaded in it. `true` indicates the page is empty,
    //          // `false` indicates it has content.
    //          empty: false,
    //          // Indicates whether the page has never been attached to a web view. If `true`, the
    //          // page has never been attached, which could indicate a new or unused page. If `false`,
    //          // the page has been attached at some point.
    //          neverAttached: false,
    //          // Indicates whether the web page is visible on the screen. `true` means the page is
    //          // visible to the user, `false` means it is not.
    //          visible: true,
    //          // This data can be super useful to determine where on the screen the webview is located
    //          // and can come in handy when you want to interact with elements on the screen based on
    //          // coordinates based on the top-left corner of the screen
    //          screenX: 0,
    //          screenY: 151,
    //          height: 2589,
    //          width: 1344
    //       },
    //       id: 'WEBVIEW_com.wdiodemoapp',
    //       title: 'WebdriverIO · Next-gen browser and mobile automation test framework for Node.js | WebdriverIO',
    //       url: 'https://webdriver.io/',
    //       packageName: 'com.wdiodemoapp',
    //       webviewPageId: '58B0AA2DBBBBBE9008C35AE42385BB0D'
    //   }
    // ]
})
```