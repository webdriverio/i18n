---
id: waitForEnabled
title: waitForEnabled
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/waitForEnabled.ts
---

Vänta på att ett element (valt med css-väljare) under den angivna tiden i 
millisekunder ska vara (in/ak)tiverat. Om flera element hämtas av given 
väljare, returneras true om minst ett element är (in/ak)tiverat.

:::info

Till skillnad från andra elementkommandon kommer WebdriverIO inte att vänta på att elementet 
ska existera för att köra detta kommando.

:::

##### Användning

```js
$(selector).waitForEnabled({ timeout, reverse, timeoutMsg, interval })
```

##### Parametrar

<table>
  <thead>
    <tr>
      <th>Namn</th><th>Typ</th><th>Detaljer</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>options</var></code><br /><span className="label labelWarning">valfri</span></td>
      <td>`WaitForOptions`</td>
      <td>waitForEnabled-alternativ (valfritt)</td>
    </tr>
    <tr>
      <td><code><var>options.timeout</var></code><br /><span className="label labelWarning">valfri</span></td>
      <td>`Number`</td>
      <td>tid i ms (standardvärde baserat på [`waitforTimeout`](/docs/configuration#waitfortimeout) konfigurationsvärde)</td>
    </tr>
    <tr>
      <td><code><var>options.reverse</var></code><br /><span className="label labelWarning">valfri</span></td>
      <td>`Boolean`</td>
      <td>om true väntar den på motsatsen (standard: false)</td>
    </tr>
    <tr>
      <td><code><var>options.timeoutMsg</var></code><br /><span className="label labelWarning">valfri</span></td>
      <td>`String`</td>
      <td>om den finns ersätter den standardfelmeddelandet</td>
    </tr>
    <tr>
      <td><code><var>options.interval</var></code><br /><span className="label labelWarning">valfri</span></td>
      <td>`Number`</td>
      <td>intervall mellan kontroller (standard: `waitforInterval`)</td>
    </tr>
  </tbody>
</table>

##### Exempel

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

##### Returnerar

- **&lt;Boolean&gt;**
            **<code><var>return</var></code>:**  true     om elementet är (in/ak)tiverat