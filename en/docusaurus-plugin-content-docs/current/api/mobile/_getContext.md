---
id: getContext
title: getContext
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/mobile/getContext.ts
---

Retrieve the context of the current session.

This method enhances the default Appium `context`/WebdriverIO `getContext` command by providing an option to
return detailed context information, making it easier to work with hybrid apps that use webviews.

### How Contexts Work
Refer to [Hybrid Apps documentation](/docs/api/mobile#hybrid-apps) for more information. Below is an explanation of the challenges associated with the `getContext` command:

#### For Android:
- Webviews can contain multiple pages (like browser tabs), and identifying the correct page requires additional metadata
  such as `title` or `url`.
- The default Appium methods only provide basic context names (e.g., `WEBVIEW_{packageName}`) without detailed information
  about the pages inside the webview.

#### For iOS:
- Each webview is identified by a generic `WEBVIEW_{id}` string, which doesn’t indicate its contents or the app screen
  it belongs to.

### Why Use This Method?
- **Default Behavior**:
  - Returns the current context as a string (e.g., `NATIVE_APP` or `WEBVIEW_{id}`).
- **Detailed Context**:
  - When `returnDetailedContext` is enabled, retrieves metadata such as:
    - **Android**: `packageName`, `title`, `url`, and `webviewPageId`.
    - **iOS**: `bundleId`, `title`, and `url`.
- **Android-Specific Options**:
  - Retry intervals and timeouts can be customized to handle delays in webview initialization.

:::info Notes and Limitations

- If `returnDetailedContext` is not enabled, the method behaves like the default Appium `getContext` method.
- If you want to use the "default" Appium `context` method, you can use the `driver.getAppiumContext()` method, see
also the [Appium Contexts](/docs/api/appium#getappiumcontext) command.
- **Android:** Android-specific options (`androidWebviewConnectionRetryTime` and `androidWebviewConnectTimeout`) have no effect on iOS.
- Logs warnings if multiple or no detailed contexts are found:
  - `We found more than 1 detailed context for the current context '{context}'. We will return the first context.`
  - `We did not get back any detailed context for the current context '{context}'. We will return the current context as a string.`

:::

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
      <td>`GetContextsOptions`</td>
      <td>The `getContext` options (optional)</td>
    </tr>
    <tr>
      <td><code><var>options.returnDetailedContext</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`boolean`</td>
      <td>By default, we only return the context name based on the default Appium `context` API, which is only a string. If you want to get back detailed context information, set this to `true`. Default is `false` (optional).</td>
    </tr>
    <tr>
      <td><code><var>options.androidWebviewConnectionRetryTime</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`number`</td>
      <td>The time in milliseconds to wait between each retry to connect to the webview. Default is `500` ms (optional). <br /><strong>ANDROID-ONLY</strong></td>
    </tr>
    <tr>
      <td><code><var>options.androidWebviewConnectTimeout</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`number`</td>
      <td>The maximum amount of time in milliseconds to wait for a web view page to be detected. Default is `5000` ms (optional). <br /><strong>ANDROID-ONLY</strong></td>
    </tr>
  </tbody>
</table>

##### Examples

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

