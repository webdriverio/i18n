---
id: getContext
title: 获取上下文
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/mobile/getContext.ts
---

获取当前会话的上下文。

此方法增强了默认的Appium `context`/WebdriverIO `getContext`命令，提供了返回详细上下文信息的选项，使处理使用webview的混合应用更加容易。

### 上下文如何工作
有关更多信息，请参阅[混合应用文档](/docs/api/mobile#hybrid-apps)。以下是与`getContext`命令相关的挑战解释：

#### 对于Android：
- Webview可以包含多个页面（如浏览器标签），识别正确的页面需要额外的元数据，如`title`或`url`。
- 默认的Appium方法只提供基本的上下文名称（例如`WEBVIEW_{packageName}`），没有关于webview内部页面的详细信息。

#### 对于iOS：
- 每个webview都由通用的`WEBVIEW_{id}`字符串标识，这不能指示其内容或它所属的应用程序屏幕。

### 为什么使用此方法？
- **默认行为**：
  - 返回当前上下文作为字符串（例如，`NATIVE_APP`或`WEBVIEW_{id}`）。
- **详细上下文**：
  - 当启用`returnDetailedContext`时，获取元数据如：
    - **Android**：`packageName`、`title`、`url`和`webviewPageId`。
    - **iOS**：`bundleId`、`title`和`url`。
- **Android特定选项**：
  - 可以自定义重试间隔和超时时间，以处理webview初始化延迟。

:::info 注意和限制

- 如果未启用`returnDetailedContext`，此方法的行为与默认的Appium `getContext`方法相同。
- 如果你想使用"默认"的Appium `context`方法，可以使用`driver.getAppiumContext()`方法，另请参见[Appium Contexts](/docs/api/appium#getappiumcontext)命令。
- **Android：** Android特定选项（`androidWebviewConnectionRetryTime`和`androidWebviewConnectTimeout`）对iOS没有影响。
- 如果找到多个或没有详细上下文，将记录警告：
  - `We found more than 1 detailed context for the current context '{context}'. We will return the first context.`
  - `We did not get back any detailed context for the current context '{context}'. We will return the current context as a string.`

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
      <td>`getContext`选项（可选）</td>
    </tr>
    <tr>
      <td><code><var>options.returnDetailedContext</var></code><br /><span className="label labelWarning">可选</span></td>
      <td>`boolean`</td>
      <td>默认情况下，我们只基于默认的Appium `context` API返回上下文名称，它只是一个字符串。如果你想获取详细的上下文信息，请将此设置为`true`。默认为`false`（可选）。</td>
    </tr>
    <tr>
      <td><code><var>options.androidWebviewConnectionRetryTime</var></code><br /><span className="label labelWarning">可选</span></td>
      <td>`number`</td>
      <td>每次尝试连接到webview之间的等待时间（毫秒）。默认为`500`毫秒（可选）。<br /><strong>仅限ANDROID</strong></td>
    </tr>
    <tr>
      <td><code><var>options.androidWebviewConnectTimeout</var></code><br /><span className="label labelWarning">可选</span></td>
      <td>`number`</td>
      <td>等待检测到web视图页面的最长时间（毫秒）。默认为`5000`毫秒（可选）。<br /><strong>仅限ANDROID</strong></td>
    </tr>
  </tbody>
</table>

##### 示例

```js title="default.test.js"
it('should return the current context with the default Appium `context` method', async () => {
    // For Android
    await driver.getContext()
    // Returns 'WEBVIEW_com.wdiodemoapp' or 'NATIVE_APP'
    //
    // For iOS, the context will be 'WEBVIEW_{number}'
    await driver.getContext()
    // Returns 'WEBVIEW_94703.19' or 'NATIVE_APP'
})

```

```js title="detailed.test.js"
it('should return the context of the current session with more detailed information', async () => {
    // For Android
    await driver.getContext({ returnDetailedContext: true})
    // Returns or `NATIVE_APP`, or
    // {
    //   id: 'WEBVIEW_com.wdiodemoapp',
    //   title: 'WebdriverIO · Next-gen browser and mobile automation test framework for Node.js | WebdriverIO',
    //   url: 'https://webdriver.io/',
    //   packageName: 'com.wdiodemoapp',
    //   webviewPageId: '5C0425CF67E9B169245F48FF21172912'
    // }
    //
    // For iOS, the context will be 'WEBVIEW_{number}'
    await driver.getContext({ returnDetailedContext: true})
    // Returns or `NATIVE_APP`, or
    // {
    //   id: 'WEBVIEW_64981.1',
    //   title: 'WebdriverIO · Next-gen browser and mobile automation test framework for Node.js | WebdriverIO',
    //   url: 'https://webdriver.io/',
    //   bundleId: 'org.reactjs.native.example.wdiodemoapp'
    // }
})

```

```js title="customize.retry.test.js"
it('should be able to cusomize the retry intervals and timeouts to handle delayed webview initialization', async () => {
    // For Android
    await driver.getContext({
        returnDetailedContext: true,
        // NOTE: The following options are Android-specific
        // For Android we might need to wait a bit longer to connect to the webview, so we can provide some additional options
        androidWebviewConnectionRetryTime: 1*1000,  // Retry every 1 second
        androidWebviewConnectTimeout: 10*1000,      // Timeout after 10 seconds
    })
})
```