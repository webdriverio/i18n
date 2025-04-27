---
id: setTimeout
title: setTimeout
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/setTimeout.ts
---

Sets the timeouts associated with the current session, timeout durations control such
behaviour as timeouts on script injection, document navigation, and element retrieval.
For more information and examples, see [timeouts guide](https://webdriver.io/docs/timeouts#selenium-timeouts).

:::info

It is not recommended to set `implicit` timeouts as they impact WebdriverIO's behavior
and can cause errors in certain commands, e.g. `waitForExist` with reverse flag.

:::

##### Usage

```js
browser.setTimeout({ implicit, pageLoad, script })
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
      <td><code><var>timeouts</var></code></td>
      <td>`Timeouts`</td>
      <td>Object containing session timeout values</td>
    </tr>
    <tr>
      <td><code><var>timeouts.implicit</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`Number`</td>
      <td>Time in milliseconds to retry the element location strategy when finding an element.</td>
    </tr>
    <tr>
      <td><code><var>timeouts.pageLoad</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`Number`</td>
      <td>Time in milliseconds to wait for the document to finish loading.</td>
    </tr>
    <tr>
      <td><code><var>timeouts.script</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`Number`</td>
      <td>Scripts injected with [`execute`](https://webdriver.io/docs/api/browser/execute) or [`executeAsync`](https://webdriver.io/docs/api/browser/executeAsync) will run until they hit the script timeout duration, which is also given in milliseconds.</td>
    </tr>
  </tbody>
</table>

##### Example

```js title="setTimeout.js"
it('should change timeout duration for session with long code duration', async () => {
    await browser.setTimeout({
        'pageLoad': 10000,
        'script': 60000
    });
    // Execute code which takes a long time
    await browser.executeAsync((done) => {
        console.log('Wake me up before you go!');
        setTimeout(done, 59000);
    });
});
```

