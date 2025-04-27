---
id: accept
title: ஏற்றுக்கொள்
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/dialog/accept.ts
---

உரையாடல் ஏற்றுக்கொள்ளப்பட்டபின் திரும்புகிறது.

##### பயன்பாடு

```js
await dialog.accept(promptText)
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
      <td><code><var>promptText</var></code><br /><span className="label labelWarning">விருப்பத்தேர்வு</span></td>
      <td>`string`</td>
      <td>ப்ராம்ப்டில் உள்ளிட உரை. உரையாடலின் வகை ப்ராம்ப்ட் அல்ல எனில் எந்த விளைவையும் ஏற்படுத்தாது.</td>
    </tr>
  </tbody>
</table>

##### எடுத்துக்காட்டு

```js title="dialogAccept.js"
await dialog.accept();
await dialog.accept(promptText);
```