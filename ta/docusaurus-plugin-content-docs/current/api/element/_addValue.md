---
id: addValue
title: மதிப்பினைச் சேர்த்தல்
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/addValue.ts
---

கொடுக்கப்பட்ட தேர்வியால் கண்டறியப்பட்ட உள்ளீடு அல்லது உரைப்பகுதி உறுப்புக்கு ஒரு மதிப்பைச் சேர்க்கவும்.

:::info

நீங்கள் சிறப்பு எழுத்துக்களைப் பயன்படுத்த விரும்பினால், எ.கா. ஒரு மதிப்பை ஒரு உள்ளீட்டிலிருந்து மற்றொன்றுக்கு நகலெடுத்து ஒட்டுவதற்கு,
[`keys`](/docs/api/browser/keys) கட்டளையைப் பயன்படுத்தவும்.

:::

##### பயன்பாடு

```js
$(selector).addValue(value)
```

##### அளபுருக்கள்

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
      <td>சேர்க்க வேண்டிய மதிப்பு</td>
    </tr>
  </tbody>
</table>

##### எடுத்துக்காட்டு

```js title="addValue.js"
it('should demonstrate the addValue command', async () => {
    let input = await $('.input')
    await input.addValue('test')
    await input.addValue(123)

    value = await input.getValue()
    assert(value === 'test123') // true
})
```