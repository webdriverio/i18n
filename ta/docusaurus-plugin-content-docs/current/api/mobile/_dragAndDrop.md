---
id: dragAndDrop
title: இழுத்து விடுதல்
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/mobile/dragAndDrop.ts
---

ஒரு பொருளை இலக்கு கூறுக்கு அல்லது நிலைக்கு இழுத்துச் செல்லுங்கள்.

:::info

இந்த கட்டளையின் செயல்பாடு உங்கள் பயன்பாட்டில் இழுத்து மற்றும் விடுதல் எவ்வாறு
செயல்படுத்தப்படுகிறது என்பதைப் பொறுத்தது. நீங்கள் சிக்கல்களை சந்தித்தால், உங்கள் எடுத்துக்காட்டை 
[#4134](https://github.com/webdriverio/webdriverio/issues/4134) இல் பதிவிடவும்.

மேலும் நீங்கள் இழுக்கும் கூறு மற்றும் நீங்கள் விடும் இலக்கு இரண்டும் திரையில் தெரியும்படி உள்ளதா என்பதை உறுதிப்படுத்திக் கொள்ளுங்கள்.

இந்த கட்டளை பின்வரும் புதுப்பிக்கப்பட்ட கூறுகளுடன் மட்டுமே செயல்படும்:
 - Appium சேவையகம் (பதிப்பு 2.0.0 அல்லது அதற்கு மேல்)
 - `appium-uiautomator2-driver` (Android க்கு)
 - `appium-xcuitest-driver` (iOS க்கு)

இணக்கப்பாட்டு சிக்கல்களைத் தவிர்க்க உங்கள் உள்ளூர் அல்லது கிளவுட் அடிப்படையிலான Appium சூழல் தொடர்ந்து புதுப்பிக்கப்பட்டுள்ளதா என்பதை உறுதிப்படுத்திக் கொள்ளுங்கள்.

:::

##### பயன்பாடு

```js
$(selector).dragAndDrop(target, { duration })
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
      <td><code><var>target</var></code></td>
      <td>`Element, DragAndDropCoordinate`</td>
      <td>இலக்கு கூறு அல்லது x மற்றும் y பண்புகளைக் கொண்ட பொருள்</td>
    </tr>
    <tr>
      <td><code><var>options</var></code><br /><span className="label labelWarning">விருப்பத்தேர்வு</span></td>
      <td>`DragAndDropOptions`</td>
      <td>dragAndDrop கட்டளை விருப்பங்கள்</td>
    </tr>
    <tr>
      <td><code><var>options.duration</var></code><br /><span className="label labelWarning">விருப்பத்தேர்வு</span></td>
      <td>`Number`</td>
      <td>இழுத்தல் எவ்வளவு நேரம் நடைபெற வேண்டும்</td>
    </tr>
  </tbody>
</table>

##### எடுத்துக்காட்டு

```js title="example.test.js"
it('should demonstrate the dragAndDrop command', async () => {
    const elem = $('#someElem')
    const target = $('#someTarget')

    // drag and drop to other element
    await elem.dragAndDrop(target)

    // drag and drop relative from current position
    await elem.dragAndDrop({ x: 100, y: 200 })
})
```