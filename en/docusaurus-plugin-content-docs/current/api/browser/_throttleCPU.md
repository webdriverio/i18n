---
id: throttleCPU
title: throttleCPU
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/throttleCPU.ts
---

Throttles the CPU to emulate a slower processor.

:::info

Note that using the `throttleCPU` command requires support for Chrome DevTools protocol and e.g.
can not be used when running automated tests in the cloud. Chrome DevTools protocol is not installed by default,
use `npm install puppeteer-core` to install it.
Find out more in the [Automation Protocols](/docs/automationProtocols) section.

:::

##### Usage

```js
browser.throttleCPU(factor)
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
      <td><code><var>factor</var></code></td>
      <td>`number`</td>
      <td>slowdown factor (1 is no throttle, 2 is 2x slowdown, etc)</td>
    </tr>
  </tbody>
</table>

##### Example

```js title="throttleCPU.js"
it('should throttle the CPU', async () => {
    await browser.throttleCPU(2) // 2x slowdown
});
```

