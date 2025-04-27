---
id: getProperty
title: getProperty
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/getProperty.ts
---

गेट एलिमेंट प्रॉपर्टी कमांड एक एलिमेंट की प्रॉपर्टी प्राप्त करने का परिणाम देगा।

##### उपयोग

```js
$(selector).getProperty(property)
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
      <td><code><var>property</var></code></td>
      <td>`string`</td>
      <td>एलिमेंट प्रॉपर्टी का नाम</td>
    </tr>
  </tbody>
</table>

##### उदाहरण

```js title="getProperty.js"
it('should demonstrate the getProperty command', async () => {
    var elem = await $('body')
    var tag = await elem.getProperty('tagName')
    console.log(tag) // outputs: "BODY"
})
```

##### रिटर्न्स

- **&lt;unknown&gt;**
            **<code><var>return</var></code>:** चयनित एलिमेंट की प्रॉपर्टी का मान