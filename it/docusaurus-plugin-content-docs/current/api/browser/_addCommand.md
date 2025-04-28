---
id: addCommand
title: addCommand
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/addCommand.ts
---

Il metodo browser `addCommand` ti aiuta a scrivere il tuo personale set di comandi.

:::info

Puoi trovare maggiori informazioni sull'aggiunta di comandi personalizzati nella guida [comandi personalizzati](/docs/customcommands#adding-custom-commands).

:::

##### Utilizzo

```js
browser.addCommand(name, callback, elementScope)
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
      <td>nome del comando personalizzato</td>
    </tr>
    <tr>
      <td><code><var>callback</var></code></td>
      <td>`Function`</td>
      <td>funzione da chiamare</td>
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
await browser.addCommand('getUrlAndTitle', async function (customParam) {
    // `this` refers to the `browser` scope
    return {
        url: await this.getUrl(),
        title: await this.getTitle(),
        customParam: customParam
    }
})
//usage
it('should use my add command', async () => {
    await browser.url('https://webdriver.io')
    const result = await browser.getUrlAndTitle('foobar')

    assert.strictEqual(result.url, 'https://webdriver.io')
    assert.strictEqual(result.title, 'WebdriverIO · Next-gen browser and mobile automation test framework for Node.js | WebdriverIO')
    assert.strictEqual(result.customParam, 'foobar')
})
```