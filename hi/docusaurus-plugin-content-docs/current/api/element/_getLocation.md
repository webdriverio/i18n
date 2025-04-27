---
id: getLocation
title: स्थान प्राप्त करें
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/getLocation.ts
---

पृष्ठ पर एक तत्व का स्थान निर्धारित करें। बिंदु (0, 0) पृष्ठ के ऊपरी-बायें कोने को संदर्भित करता है।

##### उपयोग

```js
$(selector).getLocation(prop)
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
      <td><code><var>prop</var></code></td>
      <td>`string`</td>
      <td>आसान परिणाम के लिए "x" या "y" हो सकता है जिससे सीधे मूल्य प्राप्त हो</td>
    </tr>
  </tbody>
</table>

##### उदाहरण

```js title="getLocation.js"
it('should demonstrate the getLocation function', async () => {
    await browser.url('http://github.com');
    const logo = await $('.octicon-mark-github')
    const location = await logo.getLocation();
    console.log(location); // outputs: { x: 150, y: 20 }

    const xLocation = await logo.getLocation('x')
    console.log(xLocation); // outputs: 150

    const yLocation = await logo.getLocation('y')
    console.log(yLocation); // outputs: 20
});
```

##### रिटर्न्स

- **&lt;Object|Number&gt;**
            **<code><var>return</var></code>:**   पृष्ठ पर तत्व के लिए X और Y निर्देशांक `{x:number, y:number}`