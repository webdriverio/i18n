---
id: pause
title: pause
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/pause.ts
---

Pauses execution for a specific amount of time. It is recommended to not use this command to wait for an
element to show up. In order to avoid flaky test results it is better to use commands like
[`waitForExist`](/docs/api/element/waitForExist) or other waitFor* commands.

##### Usage

```js
browser.pause(milliseconds)
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
      <td><code><var>milliseconds</var></code></td>
      <td>`number`</td>
      <td>time in ms</td>
    </tr>
  </tbody>
</table>

##### Example

```js title="pause.js"
it('should pause the execution', async () => {
    const starttime = new Date().getTime()
    await browser.pause(3000)
    const endtime = new Date().getTime()
    console.log(endtime - starttime) // outputs: 3000
});
```

