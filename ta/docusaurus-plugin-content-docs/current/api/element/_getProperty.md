---
id: getProperty
title: getProperty பெறு
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/getProperty.ts
---

The Get Element Property command will return the result of getting a property of an
element.

##### Usage

```js
$(selector).getProperty(property)
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
      <td><code><var>property</var></code></td>
      <td>`string`</td>
      <td>name of the element property</td>
    </tr>
  </tbody>
</table>

##### Example

```js title="getProperty.js"
it('should demonstrate the getProperty command', async () => {
    var elem = await $('body')
    var tag = await elem.getProperty('tagName')
    console.log(tag) // outputs: "BODY"
})
```

##### Returns

- **&lt;unknown&gt;**
            **<code><var>return</var></code>:**  the value of the property of the selected element