---
id: setValue
title: setValue
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/setValue.ts
---

Send a sequence of key strokes to an element after the input has been cleared before. If the element doesn't need
to be cleared first then use [`addValue`](/docs/api/element/addValue).

:::info

If you like to use special characters, e.g. to copy and paste a value from one input to another, use the
[`keys`](/docs/api/browser/keys) command.

:::

##### Usage

```js
$(selector).setValue(value)
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

```js title="setValue.js"
it('should set value for a certain element', async () => {
    const input = await $('.input');
    await input.setValue('test')
    await input.setValue(123)

    console.log(await input.getValue()); // outputs: '123'
});
```

