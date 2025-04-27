---
id: setValue
title: மதிப்பை அமைக்க
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/setValue.ts
---

உள்ளீடு அழிக்கப்பட்ட பிறகு ஒரு கூறுக்கு விசை அழுத்தங்களின் வரிசையை அனுப்புகிறது. கூறை முதலில் அழிக்க வேண்டிய தேவை இல்லை என்றால் [`addValue`](/docs/api/element/addValue) ஐப் பயன்படுத்தவும்.

:::info

நீங்கள் சிறப்பு எழுத்துக்களைப் பயன்படுத்த விரும்பினால், எ.கா. ஒரு உள்ளீட்டிலிருந்து மற்றொரு உள்ளீட்டிற்கு ஒரு மதிப்பை நகலெடுத்து ஒட்ட, [`keys`](/docs/api/browser/keys) கட்டளையைப் பயன்படுத்தவும்.

:::

##### பயன்பாடு

```js
$(selector).setValue(value)
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
      <td><code><var>value</var></code></td>
      <td>`string, number`</td>
      <td>சேர்க்கப்பட வேண்டிய மதிப்பு</td>
    </tr>
  </tbody>
</table>

##### எடுத்துக்காட்டு

```js title="setValue.js"
it('should set value for a certain element', async () => {
    const input = await $('.input');
    await input.setValue('test')
    await input.setValue(123)

    console.log(await input.getValue()); // outputs: '123'
});
```