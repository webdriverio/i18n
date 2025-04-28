---
id: waitForClickable
title: waitForClickable
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/waitForClickable.ts
---

Czekaj, aż element będzie klikalny lub nieklikalny przez określoną ilość milisekund.

:::info

W przeciwieństwie do innych poleceń elementu, WebdriverIO nie będzie czekać na istnienie elementu, aby wykonać
to polecenie.

:::

##### Użycie

```js
$(selector).waitForClickable({ timeout, reverse, timeoutMsg, interval })
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
      <td><code><var>options</var></code><br /><span className="label labelWarning">opcjonalny</span></td>
      <td>`WaitForOptions`</td>
      <td>opcje waitForEnabled (opcjonalne)</td>
    </tr>
    <tr>
      <td><code><var>options.timeout</var></code><br /><span className="label labelWarning">opcjonalny</span></td>
      <td>`Number`</td>
      <td>czas w ms (domyślnie ustawiony na podstawie wartości konfiguracyjnej [`waitforTimeout`](/docs/configuration#waitfortimeout))</td>
    </tr>
    <tr>
      <td><code><var>options.reverse</var></code><br /><span className="label labelWarning">opcjonalny</span></td>
      <td>`Boolean`</td>
      <td>jeśli true, czeka na przeciwieństwo (domyślnie: false)</td>
    </tr>
    <tr>
      <td><code><var>options.timeoutMsg</var></code><br /><span className="label labelWarning">opcjonalny</span></td>
      <td>`String`</td>
      <td>jeśli istnieje, zastępuje domyślny komunikat o błędzie</td>
    </tr>
    <tr>
      <td><code><var>options.interval</var></code><br /><span className="label labelWarning">opcjonalny</span></td>
      <td>`Number`</td>
      <td>interwał między sprawdzeniami (domyślnie: `waitforInterval`)</td>
    </tr>
  </tbody>
</table>

##### Przykład

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

##### Zwraca

- **&lt;Boolean&gt;**
            **<code><var>return</var></code>:**  `true` jeśli element jest klikalny (lub nie, jeśli flaga jest ustawiona)