---
id: overwriteCommand
title: overwriteCommand
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/overwriteCommand.ts
---

Webbläsarmetoden `overwriteCommand` hjälper dig att skriva över webbläsarens och elementets inbyggda kommandon som `pause` och `click`.

:::info

Du kan se mer information om detta i avsnittet [anpassade kommandon](/docs/customcommands#overwriting-native-commands).

:::

##### Användning

```js
browser.overwriteCommand(name, callback, elementScope)
```

##### Parametrar

<table>
  <thead>
    <tr>
      <th>Namn</th><th>Typ</th><th>Detaljer</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>name</var></code></td>
      <td>`string`</td>
      <td>namn på det ursprungliga kommandot</td>
    </tr>
    <tr>
      <td><code><var>callback</var></code></td>
      <td>`Function`</td>
      <td>skicka originelfunktion</td>
    </tr>
    <tr>
      <td><code><var>elementScope</var></code><br /><span className="label labelWarning">valfritt</span></td>
      <td>`Boolean`</td>
      <td>utöka Element-objektet istället för Browser-objektet</td>
    </tr>
  </tbody>
</table>

##### Exempel

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