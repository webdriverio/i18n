---
id: setTimeout
title: setTimeout
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/setTimeout.ts
---

Legt die Timeouts fest, die mit der aktuellen Sitzung verbunden sind. Die Timeout-Dauern steuern Verhaltensweisen wie Timeouts bei Skript-Injektion, Dokumentennavigation und Element-Abruf.
Weitere Informationen und Beispiele finden Sie im [Timeout-Leitfaden](https://webdriver.io/docs/timeouts#selenium-timeouts).

:::info

Es wird nicht empfohlen, `implicit` Timeouts zu setzen, da sie das Verhalten von WebdriverIO beeinflussen
und bei bestimmten Befehlen Fehler verursachen können, z.B. bei `waitForExist` mit umgekehrter Flagge.

:::

##### Verwendung

```js
browser.setTimeout({ implicit, pageLoad, script })
```

##### Parameter

<table>
  <thead>
    <tr>
      <th>Name</th><th>Typ</th><th>Details</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>timeouts</var></code></td>
      <td>`Timeouts`</td>
      <td>Objekt, das Sitzungs-Timeout-Werte enthält</td>
    </tr>
    <tr>
      <td><code><var>timeouts.implicit</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`Number`</td>
      <td>Zeit in Millisekunden, um die Element-Lokalisierungsstrategie zu wiederholen, wenn ein Element gesucht wird.</td>
    </tr>
    <tr>
      <td><code><var>timeouts.pageLoad</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`Number`</td>
      <td>Zeit in Millisekunden, die gewartet wird, bis das Dokument fertig geladen ist.</td>
    </tr>
    <tr>
      <td><code><var>timeouts.script</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`Number`</td>
      <td>Skripte, die mit [`execute`](https://webdriver.io/docs/api/browser/execute) oder [`executeAsync`](https://webdriver.io/docs/api/browser/executeAsync) injiziert werden, laufen, bis sie die Skript-Timeout-Dauer erreichen, die ebenfalls in Millisekunden angegeben wird.</td>
    </tr>
  </tbody>
</table>

##### Beispiel

```js title="setTimeout.js"
it('should change timeout duration for session with long code duration', async () => {
    await browser.setTimeout({
        'pageLoad': 10000,
        'script': 60000
    });
    // Execute code which takes a long time
    await browser.executeAsync((done) => {
        console.log('Wake me up before you go!');
        setTimeout(done, 59000);
    });
});
```