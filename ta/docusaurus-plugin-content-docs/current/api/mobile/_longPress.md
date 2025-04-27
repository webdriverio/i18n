---
id: longPress
title: நீண்ட அழுத்தம்
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/mobile/longPress.ts
---

திரையில் கொடுக்கப்பட்ட கூறுவில் நீண்ட அழுத்த சைகையை செய்கிறது.

இது தேர்ந்தெடுக்கப்பட்ட கூறுவிற்கு WebDriver `action` கட்டளையை வழங்குகிறது. இது `click` கட்டளையை அடிப்படையாகக் கொண்டது.

:::info

இந்த கட்டளை பின்வரும் புதுப்பிக்கப்பட்ட கூறுகளுடன் மட்டுமே செயல்படுகிறது:
 - Appium சர்வர் (பதிப்பு 2.0.0 அல்லது அதற்கு மேல்)
 - `appium-uiautomator2-driver` (Android-க்கு)
 - `appium-xcuitest-driver` (iOS-க்கு)

இணக்க சிக்கல்களைத் தவிர்க்க உங்கள் உள்ளூர் அல்லது கிளவுட் அடிப்படையிலான Appium சூழல் வழக்கமாக புதுப்பிக்கப்படுவதை உறுதிசெய்யவும்.

:::

##### பயன்பாடு

```js
$(selector).longPress({ x, y, duration })
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
      <td><code><var>options</var></code><br /><span className="label labelWarning">விருப்பத்தேர்வு</span></td>
      <td>`LongPressOptions`</td>
      <td>நீண்ட அழுத்த விருப்பங்கள் (விருப்பத்தேர்வு)</td>
    </tr>
    <tr>
      <td><code><var>options.x</var></code><br /><span className="label labelWarning">விருப்பத்தேர்வு</span></td>
      <td>`number`</td>
      <td>எண் (விருப்பத்தேர்வு)</td>
    </tr>
    <tr>
      <td><code><var>options.y</var></code><br /><span className="label labelWarning">விருப்பத்தேர்வு</span></td>
      <td>`number`</td>
      <td>எண் (விருப்பத்தேர்வு)</td>
    </tr>
    <tr>
      <td><code><var>options.duration</var></code><br /><span className="label labelWarning">விருப்பத்தேர்வு</span></td>
      <td>`number`</td>
      <td>ms-ல் அழுத்தத்தின் கால அளவு, இயல்புநிலை 1500 ms <br /><strong>MOBILE-மட்டும்</strong></td>
    </tr>
  </tbody>
</table>

##### எடுத்துக்காட்டுகள்

```js title="longpress.offset.js"
it('should demonstrate a longPress using an offset on the iOS Contacts icon', async () => {
    const contacts = $('~Contacts')
    // opens the Contacts menu on iOS where you can quickly create
    // a new contact, edit your home screen, or remove the app
    // clicks 30 horizontal and 10 vertical pixels away from location of the icon (from center point of element)
    await contacts.longPress({ x: 30, y: 10 })
})

```

```js title="longpress.example.js"
it('should be able to open the contacts menu on iOS by executing a longPress of 5 seconds', async () => {
    const contacts = $('~Contacts')
    // opens the Contacts menu on iOS where you can quickly create
    // a new contact, edit your home screen, or remove the app
    await contacts.longPress({ duration: 5 * 1000 })
})
```