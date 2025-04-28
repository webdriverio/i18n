---
id: waitForClickable
title: waitForClickable
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/waitForClickable.ts
---

Vänta på att ett element ska bli klickbart eller inte klickbart under den angivna tiden i millisekunder.

:::info

Till skillnad från andra elementkommandon kommer WebdriverIO inte att vänta på att elementet ska existera för att utföra
detta kommando.

:::

##### Användning

```js
$(selector).waitForClickable({ timeout, reverse, timeoutMsg, interval })
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
      <td>tid i ms (standard baserad på konfigurationsvärdet [`waitforTimeout`](/docs/configuration#waitfortimeout))</td>
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

```js title="waitForClickable.js"
it('should detect when element is clickable', async () => {
    const elem = await $('#elem')
    await elem.waitForClickable({ timeout: 3000 });
});
it('should detect when element is no longer clickable', async () => {
    const elem = await $('#elem')
    await elem.waitForClickable({ reverse: true });
});
```

##### Returnerar

- **&lt;Boolean&gt;**
            **<code><var>return</var></code>:**  `true` om elementet är klickbart (eller inte om flaggan är inställd)