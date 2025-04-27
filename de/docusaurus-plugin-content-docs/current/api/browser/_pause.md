---
id: pause
title: pause
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/pause.ts
---

Pausiert die Ausführung für einen bestimmten Zeitraum. Es wird empfohlen, diesen Befehl nicht zu verwenden, um darauf zu warten, dass ein Element erscheint. Um instabile Testergebnisse zu vermeiden, ist es besser, Befehle wie [`waitForExist`](/docs/api/element/waitForExist) oder andere waitFor* Befehle zu verwenden.

##### Verwendung

```js
browser.pause(milliseconds)
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
      <td><code><var>milliseconds</var></code></td>
      <td>`number`</td>
      <td>Zeit in ms</td>
    </tr>
  </tbody>
</table>

##### Beispiel

```js title="pause.js"
it('should pause the execution', async () => {
    const starttime = new Date().getTime()
    await browser.pause(3000)
    const endtime = new Date().getTime()
    console.log(endtime - starttime) // outputs: 3000
});
```
