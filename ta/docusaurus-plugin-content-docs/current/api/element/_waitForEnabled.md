---
id: waitForEnabled
title: காத்திருப்பதற்கு இயக்கப்பட்டது
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/waitForEnabled.ts
---

Wait for an element (selected by css selector) for the provided amount of
milliseconds to be (dis/en)abled. If multiple elements get queried by given
selector, it returns true if at least one element is (dis/en)abled.

:::info

As opposed to other element commands WebdriverIO will not wait for the element
to exist to execute this command.

:::

##### Usage

```js
$(selector).waitForEnabled({ timeout, reverse, timeoutMsg, interval })
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
      <td>waitForEnabled விருப்பங்கள் (விருப்பமானது)</td>
    </tr>
    <tr>
      <td><code><var>options.timeout</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`Number`</td>
      <td>மில்லி வினாடிகளில் நேரம் (இயல்புநிலை [`waitforTimeout`](/docs/configuration#waitfortimeout) கட்டமைப்பு மதிப்பின் அடிப்படையில் அமைக்கப்பட்டுள்ளது)</td>
    </tr>
    <tr>
      <td><code><var>options.reverse</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`Boolean`</td>
      <td>இது உண்மையாக இருந்தால் எதிர்மறைக்கு காத்திருக்கிறது (இயல்புநிலை: பொய்)</td>
    </tr>
    <tr>
      <td><code><var>options.timeoutMsg</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`String`</td>
      <td>இருந்தால் இது இயல்புநிலை பிழை செய்தியை மேலெழுதுகிறது</td>
    </tr>
    <tr>
      <td><code><var>options.interval</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`Number`</td>
      <td>சோதனைகளுக்கு இடையேயான இடைவெளி (இயல்புநிலை: `waitforInterval`)</td>
    </tr>
  </tbody>
</table>

##### Examples

```html title="index.html"
<input type="text" id="username" value="foobar" disabled="disabled"></input>
<script type="text/javascript">
    setTimeout(() => {
        document.getElementById('username').disabled = false
    }, 2000);
</script>
```

```js title="waitForEnabledExample.js"
it('should detect when element is enabled', async () => {
    await $('#username').waitForEnabled({ timeout: 3000 });
});

it('should detect when element is disabled', async () => {
    elem = await $('#username');
    await elem.waitForEnabled({ reverse: true })
});
```

##### Returns

- **&lt;Boolean&gt;**
            **<code><var>return</var></code>:**  true     if element is (dis/en)abled