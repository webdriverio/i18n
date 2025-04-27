---
id: zoom
title: ஜூம்
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/mobile/zoom.ts
---

திரையில் உள்ள குறிப்பிட்ட கூறில் ஜூம் சைகையை செய்கிறது.

:::info

ஜூம் செய்தல் நேட்டிவ் மொபைல் சைகைகளின் அடிப்படையில் செய்யப்படுகிறது. இது பின்வரும் டிரைவர்களுக்கு மட்டுமே ஆதரிக்கப்படுகிறது:
- [appium-uiautomator2-driver](https://github.com/appium/appium-uiautomator2-driver/blob/master/docs/android-mobile-gestures.md#mobile-pinchopengesture) ஆண்ட்ராய்டுக்கு
- [appium-xcuitest-driver](https://appium.github.io/appium-xcuitest-driver/latest/reference/execute-methods/#mobile-pinch) iOS-க்கு

இந்த கட்டளை பின்வரும் புதுப்பிக்கப்பட்ட கூறுகளுடன் மட்டுமே செயல்படும்:
 - Appium சர்வர் (பதிப்பு 2.0.0 அல்லது அதற்கு மேற்பட்டது)
 - `appium-uiautomator2-driver` (ஆண்ட்ராய்டுக்கு)
 - `appium-xcuitest-driver` (iOS-க்கு)

இணக்கத்தன்மை சிக்கல்களைத் தவிர்க்க உங்கள் உள்ளூர் அல்லது கிளவுட் அடிப்படையிலான Appium சூழல் தொடர்ந்து புதுப்பிக்கப்படுவதை உறுதி செய்யவும்.

:::

##### பயன்பாடு

```js
$(selector).zoom({ duration, scale })
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
      <td>`PinchAndZoomOptions`</td>
      <td>ஜூம் விருப்பங்கள் (விருப்பத்தேர்வு)</td>
    </tr>
    <tr>
      <td><code><var>options.duration</var></code><br /><span className="label labelWarning">விருப்பத்தேர்வு</span></td>
      <td>`number`</td>
      <td>ஜூம் எவ்வளவு வேகமாக செயல்படுத்தப்பட வேண்டும் என்பதற்கான மில்லி வினாடிகளில் கால அளவு, குறைந்தபட்சம் 500 மில்லி வினாடிகள் மற்றும் அதிகபட்சம் 10000 மில்லி வினாடிகள். இயல்புநிலை 1500 மில்லி வினாடிகள் (1.5 வினாடிகள்) (விருப்பத்தேர்வு)</td>
    </tr>
    <tr>
      <td><code><var>options.scale</var></code><br /><span className="label labelWarning">விருப்பத்தேர்வு</span></td>
      <td>`number`</td>
      <td>திரைக்கு ஏற்ப ஜூம் எவ்வளவு பெரியதாக இருக்க வேண்டும் என்பதற்கான அளவு. சரியான மதிப்புகள் 0..1 வரம்பில் உள்ள மிதப்பு எண்களாக இருக்க வேண்டும், அங்கு 1.0 என்பது 100% (விருப்பத்தேர்வு)</td>
    </tr>
  </tbody>
</table>

##### உதாரணம்

```js title="zoom.js"
it('should demonstrate a zoom on Google maps', async () => {
    const mapsElement = $('//*[@resource-id="com.google.android.apps.maps:id/map_frame"]')
    // Zoom with the default duration scale
    await mapsElement.zoom()
    // Zoom with a custom duration and scale
    await mapsElement.zoom({ duration: 4000, scale: 0.9 })
})
```