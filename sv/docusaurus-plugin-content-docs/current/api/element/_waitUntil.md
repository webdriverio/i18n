---
id: waitUntil
title: waitUntil
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/waitUntil.ts
---

Detta väntkommando är ditt universella vapen om du vill vänta på något. Det förväntar sig ett villkor
och väntar tills villkoret uppfylls med ett sanningsvärde.

:::info

Till skillnad från andra elementkommandon kommer WebdriverIO inte att vänta på att elementet ska existera för att köra
detta kommando.

:::

Ett vanligt exempel är att vänta tills ett visst element innehåller en viss text (se exempel).

##### Användning

```js
$(selector).waitUntil(condition, { timeout, timeoutMsg, interval })
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
      <td><code><var>condition</var></code></td>
      <td>`Function`</td>
      <td>villkor att vänta på</td>
    </tr>
    <tr>
      <td><code><var>options</var></code><br /><span className="label labelWarning">valfri</span></td>
      <td>`WaitUntilOptions`</td>
      <td>kommandoalternativ</td>
    </tr>
    <tr>
      <td><code><var>options.timeout</var></code><br /><span className="label labelWarning">valfri</span></td>
      <td>`Number`</td>
      <td>tid i ms (standard baserad på [`waitforTimeout`](/docs/configuration#waitfortimeout) konfigurationsvärde)</td>
    </tr>
    <tr>
      <td><code><var>options.timeoutMsg</var></code><br /><span className="label labelWarning">valfri</span></td>
      <td>`String`</td>
      <td>felmeddelande att kasta när waitUntil får timeout</td>
    </tr>
    <tr>
      <td><code><var>options.interval</var></code><br /><span className="label labelWarning">valfri</span></td>
      <td>`Number`</td>
      <td>intervall mellan villkorskontroller (standard baserad på [`waitforInterval`](/docs/configuration#waitforinterval) konfigurationsvärde)</td>
    </tr>
  </tbody>
</table>

##### Exempel

```html reference title="index.html" useHTTPS
https://github.com/webdriverio/example-recipes/blob/0bfb2b8d212b627a2659b10f4449184b657e1d59/waitUntil/index.html#L3-L8
```

```js reference title="waitUntilExample.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/0bfb2b8d212b627a2659b10f4449184b657e1d59/waitUntil/waitUntilExample.js#L6-L14
```

##### Returnerar

- **&lt;Boolean&gt;**
            **<code><var>return</var></code>:** true om villkoret är uppfyllt