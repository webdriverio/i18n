---
id: waitForDisplayed
title: waitForDisplayed
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/waitForDisplayed.ts
---

Warte auf ein Element für die angegebene Zeit in Millisekunden, bis es angezeigt wird oder nicht angezeigt wird.

:::info

Im Gegensatz zu anderen Element-Befehlen wartet WebdriverIO nicht darauf, dass das Element existiert, um diesen Befehl auszuführen.

:::

##### Usage

```js
$(selector).waitForDisplayed({ timeout, reverse, timeoutMsg, interval, withinViewport })
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
      <td>waitForDisplayed options (optional)</td>
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
    <tr>
      <td><code><var>options.withinViewport</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`Boolean`</td>
      <td>set to `true` to wait until element is displayed within viewport (default: `false`)</td>
    </tr>
  </tbody>
</table>

##### Examples

```html reference title="index.html" useHTTPS
https://github.com/webdriverio/example-recipes/blob/0bfb2b8d212b627a2659b10f4449184b657e1d59/waitForDisplayed/index.html#L3-L8
```

```js reference title="waitForDisplayedExample.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/9ac16b4d4cf4bc8ec87f6369439a2d0bcaae4483/waitForDisplayed/waitForDisplayedExample.js#L6-L14
```

##### Returns

- **&lt;Boolean&gt;**
            **<code><var>return</var></code>:**  true    if element is displayed (or doesn't if flag is set)
