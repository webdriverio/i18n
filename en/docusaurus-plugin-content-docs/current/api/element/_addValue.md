---
id: addValue
title: addValue
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/addValue.ts
---

Add a value to an input or textarea element found by given selector.

:::info

If you like to use special characters, e.g. to copy and paste a value from one input to another, use the
[`keys`](/docs/api/browser/keys) command.

:::

##### Usage

```js
$(selector).addValue(value)
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
      <td><code><var>value</var></code></td>
      <td>`string, number`</td>
      <td>value to be added</td>
    </tr>
  </tbody>
</table>

##### Example

```js title="addValue.js"
it('should demonstrate the addValue command', async () => {
    let input = await $('.input')
    await input.addValue('test')
    await input.addValue(123)

    value = await input.getValue()
    assert(value === 'test123') // true
})
```

