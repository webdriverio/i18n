---
id: waitForExist
title: انتظار الوجود
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/waitForExist.ts
---

Wait for an element for the provided amount of
milliseconds to be present within the DOM. Returns true if the selector
matches at least one element that exists in the DOM, otherwise throws an
error. If the reverse flag is true, the command will instead return true
if the selector does not match any elements.

:::info

As opposed to other element commands WebdriverIO will not wait for the
element to exist to execute this command.

:::

##### Usage

```js
$(selector).waitForExist({ timeout, reverse, timeoutMsg, interval })
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
      <td><code><var>options</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`WaitForOptions`</td>
      <td>waitForEnabled options (optional)</td>
    </tr>
    <tr>
      <td><code><var>options.timeout</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`Number`</td>
      <td>time in ms (default set based on [`waitforTimeout`](/docs/configuration#waitfortimeout) config value)</td>
    </tr>
    <tr>
      <td><code><var>options.reverse</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`Boolean`</td>
      <td>if true it waits for the opposite (default: false)</td>
    </tr>
    <tr>
      <td><code><var>options.timeoutMsg</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`String`</td>
      <td>if exists it overrides the default error message</td>
    </tr>
    <tr>
      <td><code><var>options.interval</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`Number`</td>
      <td>interval between checks (default: `waitforInterval`)</td>
    </tr>
  </tbody>
</table>

##### Example

```js title="waitForExistSyncExample.js"
it('should display a notification message after successful form submit', async () => {
    const form = await $('form');
    const notification = await $('.notification');
    await form.$(".send").click();
    await notification.waitForExist({ timeout: 5000 });
    expect(await notification.getText()).to.be.equal('Data transmitted successfully!')
});
it('should remove a message after successful form submit', async () => {
    const form = await $('form');
    const message = await $('.message');
    await form.$(".send").click();
    await message.waitForExist({ reverse: true });
});
```

##### Returns

- **&lt;Boolean&gt;**
            **<code><var>return</var></code>:**  true     if element exists (or doesn't if flag is set)    