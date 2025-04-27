---
id: getSize
title: गेटसाइज़
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/getSize.ts
---

एक DOM-तत्व के लिए चौड़ाई और ऊंचाई प्राप्त करें।

##### उपयोग

```js
$(selector).getSize(prop)
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
      <td><code><var>prop</var></code><br /><span className="label labelWarning">वैकल्पिक</span></td>
      <td>`String`</td>
      <td>प्राप्त करने के लिए आकार [वैकल्पिक] ("width" या "height")</td>
    </tr>
  </tbody>
</table>

##### उदाहरण

```js title="getSize.js"
it('should demonstrate the getSize command', async () => {
    await browser.url('http://github.com')
    const logo = await $('.octicon-mark-github')

    const size = await logo.getSize()
    console.log(size) // outputs: { width: 32, height: 32 }

    const width = await logo.getSize('width')
    console.log(width) // outputs: 32

    const height = await logo.getSize('height')
    console.log(height) // outputs: 32
})
```

##### रिटर्न्स

- **&lt;Object|Number&gt;**
            **<code><var>return</var></code>:**     अनुरोधित तत्व का आकार (`{ width: <Number>, height: <Number> }`) या वास्तविक चौड़ाई/ऊंचाई संख्या के रूप में यदि प्रॉप पैरामीटर दिया गया है