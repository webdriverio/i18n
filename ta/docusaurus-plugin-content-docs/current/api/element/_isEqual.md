---
id: isEqual
title: isEqual
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/isEqual.ts
---

தேர்ந்தெடுக்கப்பட்ட உறுப்பு வழங்கப்பட்ட ஒன்றுடன் பொருந்தினால் உண்மையைத் திருப்பி அனுப்பும்.

##### பயன்பாடு

```js
$(selector).isEqual(el)
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
      <td><code><var>el</var></code></td>
      <td>`Element`</td>
      <td>ஒப்பிட வேண்டிய உறுப்பு</td>
    </tr>
  </tbody>
</table>

##### எடுத்துக்காட்டு

```js title="isEqual.js"
it('should detect if an element is clickable', async () => {
    const el = await $('#el')
    const sameEl = await $('#el')
    const anotherEl = await $('#anotherEl')

    el.isEqual(sameEl) // outputs: true

    el.isEqual(anotherEl) // outputs: false
});
```

##### திருப்பி அனுப்புகிறது

- **&lt;Boolean&gt;**
            **<code><var>return</var></code>:**    உறுப்புகள் சமமாக இருந்தால் உண்மை