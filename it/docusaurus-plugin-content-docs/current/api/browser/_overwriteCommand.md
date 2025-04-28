---
id: overwriteCommand
title: overwriteCommand
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/overwriteCommand.ts
---

Il metodo del browser `overwriteCommand` ti aiuta a sovrascrivere i comandi nativi del browser e dell'elemento come `pause` e `click`.

:::info

Puoi visualizzare maggiori informazioni su questo nella sezione [comandi personalizzati](/docs/customcommands#overwriting-native-commands).

:::

##### Utilizzo

```js
browser.overwriteCommand(name, callback, elementScope)
```

##### Parametri

<table>
  <thead>
    <tr>
      <th>Nome</th><th>Tipo</th><th>Dettagli</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>name</var></code></td>
      <td>`string`</td>
      <td>nome del comando originale</td>
    </tr>
    <tr>
      <td><code><var>callback</var></code></td>
      <td>`Function`</td>
      <td>passa la funzione originale</td>
    </tr>
    <tr>
      <td><code><var>elementScope</var></code><br /><span className="label labelWarning">opzionale</span></td>
      <td>`Boolean`</td>
      <td>estende l'oggetto Element invece dell'oggetto Browser</td>
    </tr>
  </tbody>
</table>

##### Esempio

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