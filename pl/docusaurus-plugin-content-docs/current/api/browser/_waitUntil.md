---
id: waitUntil
title: waitUntil
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/waitUntil.ts
---

Ta komenda wait jest Twoją uniwersalną bronią, jeśli chcesz na coś poczekać. Oczekuje ona warunku
i czeka, aż warunek ten zostanie spełniony, zwracając wartość prawdziwą.

Typowym przykładem jest oczekiwanie, aż określony element będzie zawierał określony tekst (patrz przykład).

##### Użycie

```js
browser.waitUntil(condition, { timeout, timeoutMsg, interval })
```

##### Parametry

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
      <td>warunek, na który trzeba czekać, aż zwróci wartość prawdziwą</td>
    </tr>
    <tr>
      <td><code><var>options</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`WaitUntilOptions`</td>
      <td>opcje komendy</td>
    </tr>
    <tr>
      <td><code><var>options.timeout</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`Number`</td>
      <td>czas w ms (domyślnie ustawiony na podstawie wartości konfiguracyjnej [`waitforTimeout`](/docs/configuration#waitfortimeout))</td>
    </tr>
    <tr>
      <td><code><var>options.timeoutMsg</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`String`</td>
      <td>komunikat o błędzie wyświetlany, gdy waitUntil przekroczy limit czasu</td>
    </tr>
    <tr>
      <td><code><var>options.interval</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`Number`</td>
      <td>interwał między sprawdzeniami warunku (domyślnie ustawiony na podstawie wartości konfiguracyjnej [`waitforInterval`](/docs/configuration#waitforinterval))</td>
    </tr>
  </tbody>
</table>

##### Przykłady

```html reference title="index.html" useHTTPS
https://github.com/webdriverio/example-recipes/blob/0bfb2b8d212b627a2659b10f4449184b657e1d59/waitUntil/index.html#L3-L8
```

```js reference title="waitUntilExample.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/0c9252b0a4f7e18a34cece74e5798c1fe464c120/waitUntil/waitUntilExample.js#L16-L24
```

##### Zwraca

- **&lt;Boolean&gt;**
            **<code><var>return</var></code>:**  true jeśli warunek jest spełniony