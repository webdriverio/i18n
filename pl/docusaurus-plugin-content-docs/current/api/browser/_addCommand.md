---
id: addCommand
title: addCommand
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/addCommand.ts
---

Metoda przeglądarki `addCommand` pomaga pisać własne zestawy poleceń.

:::info

Więcej informacji na temat dodawania niestandardowych poleceń znajdziesz w przewodniku [niestandardowe polecenia](/docs/customcommands#adding-custom-commands).

:::

##### Użycie

```js
browser.addCommand(name, callback, elementScope)
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
      <td>nazwa niestandardowego polecenia</td>
    </tr>
    <tr>
      <td><code><var>callback</var></code></td>
      <td>`Function`</td>
      <td>funkcja, która zostanie wywołana</td>
    </tr>
    <tr>
      <td><code><var>elementScope</var></code><br /><span className="label labelWarning">opcjonalny</span></td>
      <td>`Boolean`</td>
      <td>rozszerza obiekt Element zamiast obiektu Browser</td>
    </tr>
  </tbody>
</table>

##### Przykład

```js title="execute.js"
await browser.addCommand('getUrlAndTitle', async function (customParam) {
    // `this` odnosi się do zakresu `browser`
    return {
        url: await this.getUrl(),
        title: await this.getTitle(),
        customParam: customParam
    }
})
//użycie
it('should use my add command', async () => {
    await browser.url('https://webdriver.io')
    const result = await browser.getUrlAndTitle('foobar')

    assert.strictEqual(result.url, 'https://webdriver.io')
    assert.strictEqual(result.title, 'WebdriverIO · Next-gen browser and mobile automation test framework for Node.js | WebdriverIO')
    assert.strictEqual(result.customParam, 'foobar')
})
```