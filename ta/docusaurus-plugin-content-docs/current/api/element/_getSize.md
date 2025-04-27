---
id: getSize
title: அளவு பெறுதல்
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/getSize.ts
---

ஒரு DOM-உறுப்பின் அகலம் மற்றும் உயரத்தைப் பெறவும்.

##### பயன்பாடு

```js
$(selector).getSize(prop)
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
      <td><code><var>prop</var></code><br /><span className="label labelWarning">விருப்பத்தேர்வு</span></td>
      <td>`String`</td>
      <td>பெற வேண்டிய அளவு [விருப்பத்தேர்வு] ("width" அல்லது "height")</td>
    </tr>
  </tbody>
</table>

##### உதாரணம்

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

##### திரும்பப் பெறுவது

- **&lt;Object|Number&gt;**
            **<code><var>return</var></code>:**     கோரப்பட்ட உறுப்பின் அளவு (`{ width: <Number>, height: <Number> }`) அல்லது prop அளவுரு கொடுக்கப்பட்டிருந்தால் உண்மையான அகலம்/உயரம் எண்ணாக வழங்கப்படும்