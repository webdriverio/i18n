---
id: addCommand
title: addCommand
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/addCommand.ts
---

உலாவி முறை `addCommand` உங்கள் சொந்த கட்டளைகளை எழுத உதவுகிறது.

:::info

கஸ்டம் கட்டளைகளைச் சேர்ப்பது குறித்த மேலும் தகவல்களை [கஸ்டம் கட்டளை](/docs/customcommands#adding-custom-commands) வழிகாட்டியில் காணலாம்.

:::

##### பயன்பாடு

```js
browser.addCommand(name, callback, elementScope)
```

##### அளவுருக்கள்

<table>
  <thead>
    <tr>
      <th>பெயர்</th><th>வகை</th><th>விவரங்கள்</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>name</var></code></td>
      <td>`string`</td>
      <td>கஸ்டம் கட்டளையின் பெயர்</td>
    </tr>
    <tr>
      <td><code><var>callback</var></code></td>
      <td>`Function`</td>
      <td>அழைக்கப்பட வேண்டிய செயல்பாடு</td>
    </tr>
    <tr>
      <td><code><var>elementScope</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`Boolean`</td>
      <td>உலாவி பொருளுக்குப் பதிலாக Element பொருளை விரிவுபடுத்தவும்</td>
    </tr>
  </tbody>
</table>

##### உதாரணம்

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