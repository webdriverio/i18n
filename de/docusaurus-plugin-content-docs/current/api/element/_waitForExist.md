---
id: waitForExist
title: waitForExist
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/waitForExist.ts
---

Warte die angegebene Anzahl von Millisekunden, bis ein Element im DOM vorhanden ist. Gibt true zurück, wenn der Selektor mindestens ein Element findet, das im DOM existiert, ansonsten wird ein Fehler ausgelöst. Wenn das reverse-Flag auf true gesetzt ist, gibt der Befehl stattdessen true zurück, wenn der Selektor keine Elemente findet.

:::info

Im Gegensatz zu anderen Elementbefehlen wartet WebdriverIO nicht darauf, dass das Element existiert, um diesen Befehl auszuführen.

:::

##### Verwendung

```js
$(selector).waitForExist({ timeout, reverse, timeoutMsg, interval })
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
      <td><code><var>options</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`WaitForOptions`</td>
      <td>waitForEnabled Optionen (optional)</td>
    </tr>
    <tr>
      <td><code><var>options.timeout</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`Number`</td>
      <td>Zeit in ms (Standardwert basierend auf [`waitforTimeout`](/docs/configuration#waitfortimeout) Konfigurationswert)</td>
    </tr>
    <tr>
      <td><code><var>options.reverse</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`Boolean`</td>
      <td>wenn true, wartet es auf das Gegenteil (Standard: false)</td>
    </tr>
    <tr>
      <td><code><var>options.timeoutMsg</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`String`</td>
      <td>wenn vorhanden, überschreibt es die Standard-Fehlermeldung</td>
    </tr>
    <tr>
      <td><code><var>options.interval</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`Number`</td>
      <td>Intervall zwischen Prüfungen (Standard: `waitforInterval`)</td>
    </tr>
  </tbody>
</table>

##### Beispiel

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

##### Gibt zurück

- **&lt;Boolean&gt;**
            **<code><var>return</var></code>:**  true     wenn Element existiert (oder nicht, wenn Flag gesetzt ist)