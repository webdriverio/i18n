---
id: waitUntil
title: waitUntil
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/waitUntil.ts
---

To polecenie oczekiwania jest twoją uniwersalną bronią, jeśli chcesz na coś poczekać. Oczekuje ono warunku
i czeka, aż ten warunek zostanie spełniony z wartością prawdziwą.

:::info

W przeciwieństwie do innych poleceń elementów, WebdriverIO nie będzie czekać na istnienie elementu, aby wykonać
to polecenie.

:::

Typowym przykładem jest oczekiwanie, aż pewien element będzie zawierał określony tekst (patrz przykład).

##### Użycie

```js
$(selector).waitUntil(condition, { timeout, timeoutMsg, interval })
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
      <td><code><var>condition</var></code></td>
      <td>`Function`</td>
      <td>warunek, na który czekamy</td>
    </tr>
    <tr>
      <td><code><var>options</var></code><br /><span className="label labelWarning">opcjonalnie</span></td>
      <td>`WaitUntilOptions`</td>
      <td>opcje polecenia</td>
    </tr>
    <tr>
      <td><code><var>options.timeout</var></code><br /><span className="label labelWarning">opcjonalnie</span></td>
      <td>`Number`</td>
      <td>czas w ms (domyślnie ustawiony na podstawie wartości konfiguracyjnej [`waitforTimeout`](/docs/configuration#waitfortimeout))</td>
    </tr>
    <tr>
      <td><code><var>options.timeoutMsg</var></code><br /><span className="label labelWarning">opcjonalnie</span></td>
      <td>`String`</td>
      <td>komunikat o błędzie, który zostanie wyrzucony, gdy waitUntil przekroczy limit czasu</td>
    </tr>
    <tr>
      <td><code><var>options.interval</var></code><br /><span className="label labelWarning">opcjonalnie</span></td>
      <td>`Number`</td>
      <td>interwał między sprawdzaniem warunku (domyślnie ustawiony na podstawie wartości konfiguracyjnej [`waitforInterval`](/docs/configuration#waitforinterval))</td>
    </tr>
  </tbody>
</table>

##### Przykłady

```html reference title="index.html" useHTTPS
https://github.com/webdriverio/example-recipes/blob/0bfb2b8d212b627a2659b10f4449184b657e1d59/waitUntil/index.html#L3-L8
```

```js reference title="waitUntilExample.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/0bfb2b8d212b627a2659b10f4449184b657e1d59/waitUntil/waitUntilExample.js#L6-L14
```

##### Zwraca

- **&lt;Boolean&gt;**
            **<code><var>return</var></code>:**  true jeśli warunek jest spełniony    