---
id: waitForDisplayed
title: waitForDisplayed
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/waitForDisplayed.ts
---

Czekaj na element przez określoną liczbę milisekund, aż będzie wyświetlony lub nie będzie wyświetlony.

:::info

W przeciwieństwie do innych poleceń elementów, WebdriverIO nie będzie czekać na istnienie elementu, aby wykonać
to polecenie.

:::

##### Użycie

```js
$(selector).waitForDisplayed({ timeout, reverse, timeoutMsg, interval, withinViewport })
```

##### Parametry

<table>
  <thead>
    <tr>
      <th>Nazwa</th><th>Typ</th><th>Szczegóły</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>options</var></code><br /><span className="label labelWarning">opcjonalnie</span></td>
      <td>`WaitForOptions`</td>
      <td>opcje waitForDisplayed (opcjonalnie)</td>
    </tr>
    <tr>
      <td><code><var>options.timeout</var></code><br /><span className="label labelWarning">opcjonalnie</span></td>
      <td>`Number`</td>
      <td>czas w ms (domyślnie ustawiony na podstawie wartości konfiguracyjnej [`waitforTimeout`](/docs/configuration#waitfortimeout))</td>
    </tr>
    <tr>
      <td><code><var>options.reverse</var></code><br /><span className="label labelWarning">opcjonalnie</span></td>
      <td>`Boolean`</td>
      <td>jeśli true, czeka na przeciwieństwo (domyślnie: false)</td>
    </tr>
    <tr>
      <td><code><var>options.timeoutMsg</var></code><br /><span className="label labelWarning">opcjonalnie</span></td>
      <td>`String`</td>
      <td>jeśli istnieje, zastępuje domyślny komunikat o błędzie</td>
    </tr>
    <tr>
      <td><code><var>options.interval</var></code><br /><span className="label labelWarning">opcjonalnie</span></td>
      <td>`Number`</td>
      <td>interwał między sprawdzeniami (domyślnie: `waitforInterval`)</td>
    </tr>
    <tr>
      <td><code><var>options.withinViewport</var></code><br /><span className="label labelWarning">opcjonalnie</span></td>
      <td>`Boolean`</td>
      <td>ustaw na `true`, aby czekać, aż element będzie wyświetlany w obszarze widocznym (domyślnie: `false`)</td>
    </tr>
  </tbody>
</table>

##### Przykłady

```html reference title="index.html" useHTTPS
https://github.com/webdriverio/example-recipes/blob/0bfb2b8d212b627a2659b10f4449184b657e1d59/waitForDisplayed/index.html#L3-L8
```

```js reference title="waitForDisplayedExample.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/9ac16b4d4cf4bc8ec87f6369439a2d0bcaae4483/waitForDisplayed/waitForDisplayedExample.js#L6-L14
```

##### Zwraca

- **&lt;Boolean&gt;**
            **<code><var>return</var></code>:**  true    jeśli element jest wyświetlony (lub nie jest, jeśli flaga jest ustawiona)