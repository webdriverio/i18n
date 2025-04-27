---
id: clearValue
title: உள்ளீட்டை அழி
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/clearValue.ts
---

ஒரு உள்ளீடு அல்லது உரைப்பகுதி உறுப்பின் மதிப்பை அழிக்கவும். இந்த கட்டளையைப் பயன்படுத்துவதற்கு முன் நீங்கள் உறுப்புடன் தொடர்புகொள்ள முடியும் என்பதை உறுதிப்படுத்திக் கொள்ளுங்கள். முடக்கப்பட்ட அல்லது படிக்க மட்டும் முறையில் உள்ள உள்ளீட்டு உறுப்பை நீங்கள் அழிக்க முடியாது.

##### பயன்பாடு

```js
$(selector).clearValue()
```

##### உதாரணம்

```js title="clearValue.js"
it('should demonstrate the clearValue command', async () => {
    const elem = await $('.input')
    await elem.setValue('test123')

    const value = await elem.getValue()
    console.log(value) // returns 'test123'

    await elem.clearValue()
    value = await elem.getValue()
    assert(value === ''); // true
})
```