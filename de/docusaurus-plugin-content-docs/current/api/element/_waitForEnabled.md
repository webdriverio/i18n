Here is the Markdown content translated from English to German, keeping all the specified requirements intact:

---
id: waitForEnabled
title: waitForEnabled
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/waitForEnabled.ts
---

Warte auf ein Element (ausgewählt über CSS-Selektor) für die angegebene Menge an
Millisekunden, bis es (de/ak)tiviert ist. Wenn mehrere Elemente durch den angegebenen
Selektor abgefragt werden, gibt es true zurück, wenn mindestens ein Element (de/ak)tiviert ist.

:::info

Im Gegensatz zu anderen Element-Befehlen wartet WebdriverIO nicht darauf, dass das Element
existiert, um diesen Befehl auszuführen.

:::

##### Verwendung

```js
$(selector).waitForEnabled({ timeout, reverse, timeoutMsg, interval })
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
      <td>wenn vorhanden, überschreibt es die Standardfehlermeldung</td>
    </tr>
    <tr>
      <td><code><var>options.interval</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`Number`</td>
      <td>Intervall zwischen Prüfungen (Standard: `waitforInterval`)</td>
    </tr>
  </tbody>
</table>

##### Beispiele

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

##### Rückgabewert

- **&lt;Boolean&gt;**
            **<code><var>return</var></code>:**  true     wenn Element (de/ak)tiviert ist