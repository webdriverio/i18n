---
id: moveTo
title: நகர்த்து
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/moveTo.ts
---

குறிப்பிட்ட உறுப்பின் ஆஃப்செட்டால் சுட்டியை நகர்த்தவும். எந்த உறுப்பும் குறிப்பிடப்படவில்லை என்றால், நகர்வு தற்போதைய சுட்டி இருப்பிடத்திற்கு தொடர்புடையதாக இருக்கும். ஒரு உறுப்பு வழங்கப்பட்டு ஆனால் ஆஃப்செட் இல்லையென்றால், சுட்டி உறுப்பின் மையத்திற்கு நகர்த்தப்படும். உறுப்பு பார்வையில் இல்லை என்றால், அது பார்வையில் உருட்டப்படும்.

##### பயன்பாடு

```js
$(selector).moveTo({ xOffset, yOffset })
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
      <td><code><var>options</var></code><br /><span className="label labelWarning">விருப்பத்தேர்வு</span></td>
      <td>`MoveToOptions`</td>
      <td>moveTo கட்டளை விருப்பங்கள்</td>
    </tr>
    <tr>
      <td><code><var>options.xOffset</var></code><br /><span className="label labelWarning">விருப்பத்தேர்வு</span></td>
      <td>`Number`</td>
      <td>உறுப்பின் மையத்திற்கு தொடர்புடைய X ஆஃப்செட் நகர்த்தம். குறிப்பிடப்படவில்லை என்றால், சுட்டி உறுப்பின் மையத்திற்கு நகரும்.</td>
    </tr>
    <tr>
      <td><code><var>options.yOffset</var></code><br /><span className="label labelWarning">விருப்பத்தேர்வு</span></td>
      <td>`Number`</td>
      <td>உறுப்பின் மையத்திற்கு தொடர்புடைய Y ஆஃப்செட் நகர்த்தம். குறிப்பிடப்படவில்லை என்றால், சுட்டி உறுப்பின் மையத்திற்கு நகரும்.</td>
    </tr>
  </tbody>
</table>