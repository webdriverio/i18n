---
id: waitForDisplayed
title: waitForDisplayed
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/waitForDisplayed.ts
---

Vänta på att ett element visas eller inte visas under den angivna tiden i millisekunder.

:::info

Till skillnad från andra elementkommandon kommer WebdriverIO inte att vänta på att elementet ska existera för att utföra 
detta kommando.

:::

##### Användning

```js
$(selector).waitForDisplayed({ timeout, reverse, timeoutMsg, interval, withinViewport })
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
      <td>waitForDisplayed-alternativ (valfritt)</td>
    </tr>
    <tr>
      <td><code><var>options.timeout</var></code><br /><span className="label labelWarning">valfri</span></td>
      <td>`Number`</td>
      <td>tid i ms (standard baserad på [`waitforTimeout`](/docs/configuration#waitfortimeout) konfigurationsvärde)</td>
    </tr>
    <tr>
      <td><code><var>options.reverse</var></code><br /><span className="label labelWarning">valfri</span></td>
      <td>`Boolean`</td>
      <td>om true väntar den på motsatsen (standard: false)</td>
    </tr>
    <tr>
      <td><code><var>options.timeoutMsg</var></code><br /><span className="label labelWarning">valfri</span></td>
      <td>`String`</td>
      <td>om den finns åsidosätter den standardfelmeddelandet</td>
    </tr>
    <tr>
      <td><code><var>options.interval</var></code><br /><span className="label labelWarning">valfri</span></td>
      <td>`Number`</td>
      <td>intervall mellan kontroller (standard: `waitforInterval`)</td>
    </tr>
    <tr>
      <td><code><var>options.withinViewport</var></code><br /><span className="label labelWarning">valfri</span></td>
      <td>`Boolean`</td>
      <td>sätt till `true` för att vänta tills elementet visas inom viewport (standard: `false`)</td>
    </tr>
  </tbody>
</table>

##### Exempel

```html reference title="index.html" useHTTPS
https://github.com/webdriverio/example-recipes/blob/0bfb2b8d212b627a2659b10f4449184b657e1d59/waitForDisplayed/index.html#L3-L8
```

```js reference title="waitForDisplayedExample.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/9ac16b4d4cf4bc8ec87f6369439a2d0bcaae4483/waitForDisplayed/waitForDisplayedExample.js#L6-L14
```

##### Returnerar

- **&lt;Boolean&gt;**
            **<code><var>return</var></code>:**  true    om elementet visas (eller inte om flaggan är satt)