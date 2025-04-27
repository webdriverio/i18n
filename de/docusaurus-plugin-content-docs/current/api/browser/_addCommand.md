I'll translate the provided Markdown content from English to German according to your requirements.

---
id: addCommand
title: addCommand
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/addCommand.ts
---

Die Browser-Methode `addCommand` hilft Ihnen, Ihre eigenen Befehlssätze zu erstellen.

:::info

Weitere Informationen zum Hinzufügen benutzerdefinierter Befehle finden Sie im Leitfaden für [benutzerdefinierte Befehle](/docs/customcommands#adding-custom-commands).

:::

##### Verwendung

```js
browser.addCommand(name, callback, elementScope)
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
      <td>Name des benutzerdefinierten Befehls</td>
    </tr>
    <tr>
      <td><code><var>callback</var></code></td>
      <td>`Function`</td>
      <td>Funktion, die aufgerufen werden soll</td>
    </tr>
    <tr>
      <td><code><var>elementScope</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`Boolean`</td>
      <td>Erweitert das Element-Objekt anstelle des Browser-Objekts</td>
    </tr>
  </tbody>
</table>

##### Beispiel

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