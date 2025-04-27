---
id: overwriteCommand
title: overwriteCommand
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/overwriteCommand.ts
---

Die Browser-Methode `overwriteCommand` hilft Ihnen, die nativen Befehle des Browsers und der Elemente wie `pause` und `click` zu überschreiben.

:::info

Weitere Informationen dazu finden Sie im Abschnitt [Benutzerdefinierte Befehle](/docs/customcommands#overwriting-native-commands).

:::

##### Verwendung

```js
browser.overwriteCommand(name, callback, elementScope)
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
      <td><code><var>name</var></code></td>
      <td>`string`</td>
      <td>Name des ursprünglichen Befehls</td>
    </tr>
    <tr>
      <td><code><var>callback</var></code></td>
      <td>`Function`</td>
      <td>übergibt die ursprüngliche Funktion</td>
    </tr>
    <tr>
      <td><code><var>elementScope</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`Boolean`</td>
      <td>erweitert das Element-Objekt anstelle des Browser-Objekts</td>
    </tr>
  </tbody>
</table>

##### Beispiel

```js title="execute.js"
// print milliseconds before pause and return its value.
await browser.overwriteCommand('pause', function (origPauseFunction, ms) {
    console.log(`Sleeping for ${ms}`)
    origPauseFunction(ms)
    return ms
})

// usage
it('should use my overwrite command', async () => {
    await browser.url('https://webdriver.io')
    await browser.pause(1000) // outputs "Sleeping for 1000"
})
```
