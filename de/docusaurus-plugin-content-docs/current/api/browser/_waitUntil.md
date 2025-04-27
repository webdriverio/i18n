---
id: waitUntil
title: waitUntil
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/waitUntil.ts
---

Dieser Wartebefehl ist deine universelle Waffe, wenn du auf etwas warten möchtest. Er erwartet eine Bedingung
und wartet, bis diese Bedingung mit einem truthy-Wert erfüllt wird.

Ein häufiges Beispiel ist das Warten, bis ein bestimmtes Element einen bestimmten Text enthält (siehe Beispiel).

##### Verwendung

```js
browser.waitUntil(condition, { timeout, timeoutMsg, interval })
```

##### Parameter

<table>
  <thead>
    <tr>
      <th>Name</th><th>Typ</th><th>Details</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>condition</var></code></td>
      <td>`Function`</td>
      <td>Bedingung, auf die gewartet wird, bis sie einen truthy-Wert zurückgibt</td>
    </tr>
    <tr>
      <td><code><var>options</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`WaitUntilOptions`</td>
      <td>Befehlsoptionen</td>
    </tr>
    <tr>
      <td><code><var>options.timeout</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`Number`</td>
      <td>Zeit in ms (Standardwert basierend auf dem Konfigurationswert [`waitforTimeout`](/docs/configuration#waitfortimeout))</td>
    </tr>
    <tr>
      <td><code><var>options.timeoutMsg</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`String`</td>
      <td>Fehlermeldung, die ausgegeben wird, wenn waitUntil das Zeitlimit überschreitet</td>
    </tr>
    <tr>
      <td><code><var>options.interval</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`Number`</td>
      <td>Intervall zwischen den Bedingungsprüfungen (Standardwert basierend auf dem Konfigurationswert [`waitforInterval`](/docs/configuration#waitforinterval))</td>
    </tr>
  </tbody>
</table>

##### Beispiele

```html reference title="index.html" useHTTPS
https://github.com/webdriverio/example-recipes/blob/0bfb2b8d212b627a2659b10f4449184b657e1d59/waitUntil/index.html#L3-L8
```

```js reference title="waitUntilExample.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/0c9252b0a4f7e18a34cece74e5798c1fe464c120/waitUntil/waitUntilExample.js#L16-L24
```

##### Rückgabewert

- **&lt;Boolean&gt;**
            **<code><var>return</var></code>:** true wenn die Bedingung erfüllt ist