---
id: waitUntil
title: waitUntil
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/waitUntil.ts
---

Dieser Warte-Befehl ist deine universelle Waffe, wenn du auf etwas warten möchtest. Er erwartet eine Bedingung
und wartet, bis diese Bedingung mit einem Wahrheitswert erfüllt ist.

:::info

Im Gegensatz zu anderen Element-Befehlen wartet WebdriverIO nicht darauf, dass das Element existiert, um
diesen Befehl auszuführen.

:::

Ein häufiges Beispiel ist, zu warten, bis ein bestimmtes Element einen bestimmten Text enthält (siehe Beispiel).

##### Verwendung

```js
$(selector).waitUntil(condition, { timeout, timeoutMsg, interval })
```

##### Parameter

<table>
  <thead>
    <tr>
      <th>Name</th><th>Type</th><th>Details</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>condition</var></code></td>
      <td>`Function`</td>
      <td>Bedingung, auf die gewartet wird</td>
    </tr>
    <tr>
      <td><code><var>options</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`WaitUntilOptions`</td>
      <td>Befehlsoptionen</td>
    </tr>
    <tr>
      <td><code><var>options.timeout</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`Number`</td>
      <td>Zeit in ms (Standardwert basierend auf [`waitforTimeout`](/docs/configuration#waitfortimeout) Konfigurationswert)</td>
    </tr>
    <tr>
      <td><code><var>options.timeoutMsg</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`String`</td>
      <td>Fehlermeldung, die ausgegeben wird, wenn waitUntil ein Timeout erreicht</td>
    </tr>
    <tr>
      <td><code><var>options.interval</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`Number`</td>
      <td>Intervall zwischen den Bedingungsprüfungen (Standardwert basierend auf [`waitforInterval`](/docs/configuration#waitforinterval) Konfigurationswert)</td>
    </tr>
  </tbody>
</table>

##### Beispiele

```html reference title="index.html" useHTTPS
https://github.com/webdriverio/example-recipes/blob/0bfb2b8d212b627a2659b10f4449184b657e1d59/waitUntil/index.html#L3-L8
```

```js reference title="waitUntilExample.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/0bfb2b8d212b627a2659b10f4449184b657e1d59/waitUntil/waitUntilExample.js#L6-L14
```

##### Rückgabewert

- **&lt;Boolean&gt;**
            **<code><var>return</var></code>:**  true wenn die Bedingung erfüllt ist