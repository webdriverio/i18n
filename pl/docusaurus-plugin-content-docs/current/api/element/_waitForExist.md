---
id: waitForExist
title: waitForExist
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/waitForExist.ts
---

Czeka przez podaną ilość milisekund, aż element będzie obecny w DOM. Zwraca true, jeśli selektor pasuje do co najmniej jednego elementu, który istnieje w DOM, w przeciwnym razie zgłasza błąd. Jeśli flaga reverse ma wartość true, polecenie zamiast tego zwróci true, jeśli selektor nie pasuje do żadnego elementu.

:::info

W przeciwieństwie do innych poleceń elementów, WebdriverIO nie będzie czekać na istnienie elementu, aby wykonać to polecenie.

:::

##### Użycie

```js
$(selector).waitForExist({ timeout, reverse, timeoutMsg, interval })
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

```js title="waitForExistSyncExample.js"
it('should display a notification message after successful form submit', async () => {
    const form = await $('form');
    const notification = await $('.notification');
    await form.$(".send").click();
    await notification.waitForExist({ timeout: 5000 });
    expect(await notification.getText()).to.be.equal('Data transmitted successfully!')
});
it('should remove a message after successful form submit', async () => {
    const form = await $('form');
    const message = await $('.message');
    await form.$(".send").click();
    await message.waitForExist({ reverse: true });
});
```

##### Zwraca

- **&lt;Boolean&gt;**
            **<code><var>return</var></code>:** true, jeśli element istnieje (lub nie, jeśli flaga jest ustawiona)