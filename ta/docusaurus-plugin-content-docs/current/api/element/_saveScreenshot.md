---
id: saveScreenshot
title: saveScreenshot
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/saveScreenshot.ts
---

உங்கள் இயக்க முறைமையில் ஒரு கூறின் திரைப்பிடிப்பை PNG கோப்பாக சேமிக்கவும்.

##### பயன்பாடு

```js
$(selector).saveScreenshot(filename)
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
      <td><code><var>filename</var></code></td>
      <td>`String`</td>
      <td>உருவாக்கப்பட்ட படத்திற்கான பாதை (`.png` பின்னொட்டு தேவை) இயக்க அடைவிற்கு தொடர்புடையது</td>
    </tr>
  </tbody>
</table>

##### எடுத்துக்காட்டு

```js title="saveScreenshot.js"
it('should save a screenshot of the browser view', async () => {
    const elem = await $('#someElem');
    await elem.saveScreenshot('./some/path/elemScreenshot.png');
});
```

##### திருப்பி அனுப்புகிறது

- **&lt;Buffer&gt;**
            **<code><var>return</var></code>:**             திரைப்பிடிப்பு பஃபர்