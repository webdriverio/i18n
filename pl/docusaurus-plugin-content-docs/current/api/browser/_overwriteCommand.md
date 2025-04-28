---
id: overwriteCommand
title: overwriteCommand
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/overwriteCommand.ts
---

Metoda przeglądarki `overwriteCommand` pomaga nadpisać natywne polecenia przeglądarki i elementu, takie jak `pause` i `click`.

:::info

Więcej informacji na ten temat znajdziesz w sekcji [własne polecenia](/docs/customcommands#overwriting-native-commands).

:::

##### Użycie

```js
browser.overwriteCommand(name, callback, elementScope)
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
      <td><code><var>name</var></code></td>
      <td>`string`</td>
      <td>nazwa oryginalnego polecenia</td>
    </tr>
    <tr>
      <td><code><var>callback</var></code></td>
      <td>`Function`</td>
      <td>przekazuje oryginalną funkcję</td>
    </tr>
    <tr>
      <td><code><var>elementScope</var></code><br /><span className="label labelWarning">opcjonalnie</span></td>
      <td>`Boolean`</td>
      <td>rozszerza obiekt Element zamiast obiektu Browser</td>
    </tr>
  </tbody>
</table>

##### Przykład

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