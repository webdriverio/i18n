---
id: waitForExist
title: waitForExist
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/waitForExist.ts
---

Vänta på att ett element finns i DOM under den angivna tiden i millisekunder. Returnerar true om selektorn matchar minst ett element som finns i DOM, annars kastas ett fel. Om reverse-flaggan är true, kommer kommandot istället att returnera true om selektorn inte matchar några element.

:::info

Till skillnad från andra elementkommandon kommer WebdriverIO inte att vänta på att elementet ska existera för att köra detta kommando.

:::

##### Användning

```js
$(selector).waitForExist({ timeout, reverse, timeoutMsg, interval })
```

##### Parametrar

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

##### Exempel

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

##### Returnerar

- **&lt;Boolean&gt;**
            **<code><var>return</var></code>:**  true     if element exists (or doesn't if flag is set)    