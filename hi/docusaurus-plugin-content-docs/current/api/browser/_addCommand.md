---
id: addCommand
title: addCommand
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/addCommand.ts
---

ब्राउज़र मेथड `addCommand` आपको अपने खुद के कमांड्स लिखने में मदद करता है।

:::info

कस्टम कमांड्स जोड़ने के बारे में अधिक जानकारी आप [कस्टम कमांड](/docs/customcommands#adding-custom-commands) गाइड में पा सकते हैं।

:::

##### उपयोग

```js
browser.addCommand(name, callback, elementScope)
```

##### पैरामीटर्स

<table>
  <thead>
    <tr>
      <th>नाम</th><th>प्रकार</th><th>विवरण</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>name</var></code></td>
      <td>`string`</td>
      <td>कस्टम कमांड का नाम</td>
    </tr>
    <tr>
      <td><code><var>callback</var></code></td>
      <td>`Function`</td>
      <td>कॉल की जाने वाली फंक्शन</td>
    </tr>
    <tr>
      <td><code><var>elementScope</var></code><br /><span className="label labelWarning">वैकल्पिक</span></td>
      <td>`Boolean`</td>
      <td>ब्राउज़र ऑब्जेक्ट के बजाय एलिमेंट ऑब्जेक्ट का विस्तार करें</td>
    </tr>
  </tbody>
</table>

##### उदाहरण

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