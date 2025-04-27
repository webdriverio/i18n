---
id: throttleNetwork
title: throttleNetwork
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/throttleNetwork.ts
---

Throttle the network capabilities of the browser. This can help to
emulate certain scenarios where a user loses their internet connection
and your app needs to address that.

There are many presets available with default configurations for ease of use.
They are `offline`, `GPRS`, `Regular2G`, `Good2G`, `Regular3G`, `Good3G`,
`Regular4G`, `DSL`, `WiFi`, `online`.

You can see the values for these presets [in the source code](https://github.com/webdriverio/webdriverio/blob/6824e4eb118a8d20685f12f4bc42f13fd56f8a25/packages/webdriverio/src/commands/browser/throttleNetwork.js#L29).

:::info

Note that using the `throttleNetwork` command requires support for Chrome DevTools protocol and e.g.
can not be used when running automated tests in the cloud. Chrome DevTools protocol is not installed by default,
use `npm install puppeteer-core` to install it.
Find out more in the [Automation Protocols](/docs/automationProtocols) section.

:::

##### Usage

```js
browser.throttleNetwork({ offline, latency, downloadThroughput, uploadThroughput })
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
      <td><code><var>params</var></code></td>
      <td>`ThrottleOptions`</td>
      <td>parameters for throttling</td>
    </tr>
    <tr>
      <td><code><var>params.offline</var></code></td>
      <td>`boolean`</td>
      <td>True to emulate internet disconnection.</td>
    </tr>
    <tr>
      <td><code><var>params.latency</var></code></td>
      <td>`number`</td>
      <td>Minimum latency from request sent to response headers received (ms).</td>
    </tr>
    <tr>
      <td><code><var>params.downloadThroughput</var></code></td>
      <td>`number`</td>
      <td>Maximal aggregated download throughput (bytes/sec). -1 disables download throttling.</td>
    </tr>
    <tr>
      <td><code><var>params.uploadThroughput</var></code></td>
      <td>`number`</td>
      <td>Maximal aggregated upload throughput (bytes/sec). -1 disables upload throttling.</td>
    </tr>
  </tbody>
</table>

##### Example

```js title="throttleNetwork.js"
it('should throttle the network', async () => {
    // via static string preset
    await browser.throttleNetwork('Regular3G')

    // via custom values
    await browser.throttleNetwork({
        offline: false,
        downloadThroughput: 200 * 1024 / 8,
        uploadThroughput: 200 * 1024 / 8,
        latency: 20
    })
});
```

