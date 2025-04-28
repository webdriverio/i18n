---
id: waitForEnabled
title: waitForEnabled
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/waitForEnabled.ts
---

Czekaj na element (wybrany za pomocą selektora css) przez określoną ilość 
milisekund, aby był (wyłączony/włączony). Jeśli wiele elementów jest odpytywanych przez dany
selektor, zwraca true, jeśli co najmniej jeden element jest (wyłączony/włączony).

:::info

W przeciwieństwie do innych poleceń elementów, WebdriverIO nie będzie czekać na istnienie 
elementu, aby wykonać to polecenie.

:::

##### Użycie

```js
$(selector).waitForEnabled({ timeout, reverse, timeoutMsg, interval })
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
      <td>opcje waitForEnabled (opcjonalne)</td>
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
  </tbody>
</table>

##### Przykłady

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

##### Zwraca

- **&lt;Boolean&gt;**
            **<code><var>return</var></code>:**  true     jeśli element jest (wyłączony/włączony)