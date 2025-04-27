---
id: switchContext
title: 切换上下文
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/mobile/switchContext.ts
---

使用给定的Webview `name`、`title`或`url`切换到特定上下文。

此方法通过提供更大的灵活性和精确性来增强默认Appium的`context`命令，用于在混合移动应用程序中的原生和webview上下文之间切换。

### 上下文如何工作
有关混合应用和webview的概述，请参考[混合应用文档](/docs/api/mobile#hybrid-apps)。
下面是`switchContext`命令如何解决常见挑战的总结：

#### Android挑战
- Webview通常包含多个页面（类似于浏览器标签）。识别正确的页面需要额外的
  元数据，如`title`或`url`，这些在默认的Appium方法中未提供。
- 默认的Appium方法只返回基本的上下文名称（例如`WEBVIEW_{packageName}`），而没有关于
  webview内容或页面的详细信息。
- 在Android上切换上下文涉及两个步骤，这些都由此方法自动处理：
  1. 使用`WEBVIEW_{packageName}`切换到Webview上下文。
  2. 使用`switchToWindow`方法选择Webview中的适当页面。

#### iOS挑战
- Webview由通用ID（例如`WEBVIEW_{id}`）标识，这些ID不提供有关内容
  或它们对应的应用程序屏幕的信息。
- 确定正确的webview进行交互通常需要反复尝试。

`switchContext`方法通过检索详细的元数据（例如`title`、`url`和可见性）
来简化此过程，确保准确可靠的上下文切换。

### 为什么使用此方法？
- **简化切换**：如果您知道所需webview的`title`或`url`，此方法消除了对
  额外调用`getContexts`或组合多种方法如`switchContext({id})`和`getTitle()`的需求。
- **自动上下文匹配**：基于以下内容找到上下文的最佳匹配：
  - 平台特定标识符（iOS的`bundleId`，Android的`packageName`）。
  - `title`或`url`的精确或部分匹配（支持字符串和正则表达式）。
  - Android特定检查，确保webview已附加且可见。
- **精细控制**：自定义重试间隔和超时（仅限Android）允许您处理webview初始化中的延迟。
- **访问默认Appium方法**：如果需要，您可以通过`driver.switchAppiumContext()`使用默认的Appium `switchContext`命令。

:::info 注意事项和限制

- 如果已知所需webview的`title`或`url`，此方法可以自动定位并切换到匹配的上下文，无需额外的`getContexts`调用。
- Android特定选项如`androidWebviewConnectionRetryTime`和`androidWebviewConnectTimeout`不适用于iOS。
- 记录上下文匹配失败的原因以协助调试。
- 当使用对象作为输入时，`title`或`url`是必需的。

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
      <td><code><var>context</var></code></td>
      <td>`string, SwitchContextOptions`</td>
      <td>要切换到的上下文名称。可以提供带有更多上下文选项的对象。</td>
    </tr>
    <tr>
      <td><code><var>options</var></code></td>
      <td>`SwitchContextOptions`</td>
      <td>switchContext命令选项</td>
    </tr>
    <tr>
      <td><code><var>options.title</var></code><br /><span className="label labelWarning">可选</span></td>
      <td>`string, RegExp`</td>
      <td>要切换到的页面标题。这将是webview页面title标签的内容。您可以使用需要完全匹配的字符串或正则表达式。<br /><strong>重要：</strong>当您使用选项时，`title`或`url`属性是必需的。</td>
    </tr>
    <tr>
      <td><code><var>options.url</var></code><br /><span className="label labelWarning">可选</span></td>
      <td>`string, RegExp`</td>
      <td>要切换到的页面url。这将是webview页面的`url`。您可以使用需要完全匹配的字符串或正则表达式。<br /><strong>重要：</strong>当您使用选项时，`title`或`url`属性是必需的。</td>
    </tr>
    <tr>
      <td><code><var>options.androidWebviewConnectionRetryTime</var></code><br /><span className="label labelWarning">可选</span></td>
      <td>`number`</td>
      <td>每次重试连接到webview之间等待的时间（毫秒）。默认为`500`毫秒（可选）。<br /><strong>仅限ANDROID</strong>，并且仅当提供了`title`或`url`时使用。</td>
    </tr>
    <tr>
      <td><code><var>options.androidWebviewConnectTimeout</var></code><br /><span className="label labelWarning">可选</span></td>
      <td>`number`</td>
      <td>等待检测web视图页面的最大时间（毫秒）。默认为`5000`毫秒（可选）。<br /><strong>仅限ANDROID</strong>，并且仅当提供了`title`或`url`时使用。</td>
    </tr>
  </tbody>
</table>

##### 示例

```js title="example.test.js"
it('should switch to a webview by name and uses the default Appium `context`-method', async () => {
    // For Android, the context will be '`WEBVIEW_{packageName}`'
    await driver.switchContext('WEBVIEW_com.wdiodemoapp')
    // For iOS, the context will be 'WEBVIEW_{number}'
    await driver.switchContext('WEBVIEW_94703.19')
})

```

```js title="exact.title.test.js"
it('should switch to a webview and match a webview based on an EXACT match of the `title` of the webview', async () => {
    await driver.switchContext({
        // In this case the title needs to be an exact match
        title: 'Webview Title',
    })
})

```

```js title="exact.url.test.js"
it('should switch to a webview and match a webview based on an EXACT match of the `title` of the webview', async () => {
    await driver.switchContext({
        // In this case the url needs to be an exact match
        url: 'https://webdriver.io',
    })
})

```

```js title="regex.title.url.test.js"
it('should switch to a webview and match a webview based on regex match of the `title` and `url` of the webview', async () => {
    await driver.switchContext({
        // The title should NOT end with 'foo'
        title: /^(?!.*foo$)/,
        // Matches any string that contains the substring `docs/api/mobile/switchContext`
        url: /.*docs\/api\/mobile\/switchContext/,
    })
})

```

```js title="android.context.waits.test.js"
it('should switch to a webview for Android but wait longer to connect and find a webview based on provided options', async () => {
    await driver.switchContext({
        // In this case the title need to be an exact match
        title: 'Webview Title',
        // For Android we might need to wait a bit longer to connect to the webview, so we can provide some additional options
        androidWebviewConnectionRetryTime: 1*1000,  // Retry every 1 second
        androidWebviewConnectTimeout: 10*1000,      // Timeout after 10 seconds
    })
})
```