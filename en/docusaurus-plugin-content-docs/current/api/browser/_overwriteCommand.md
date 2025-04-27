---
id: overwriteCommand
title: overwriteCommand
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/overwriteCommand.ts
---

The browser method `overwriteCommand` helps you to overwrite the browser's and element's native commands like `pause` and `click`.

:::info

You can view more information on this in the [custom command](/docs/customcommands#overwriting-native-commands) section.

:::

##### Usage

```js
browser.overwriteCommand(name, callback, elementScope)
```

##### Parameters

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
      <td>name of the original command</td>
    </tr>
    <tr>
      <td><code><var>callback</var></code></td>
      <td>`Function`</td>
      <td>pass original function</td>
    </tr>
    <tr>
      <td><code><var>elementScope</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`Boolean`</td>
      <td>extend the Element object instead of the Browser object</td>
    </tr>
  </tbody>
</table>

##### Example

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

