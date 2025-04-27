---
id: pinch
title: பிஞ்ச்
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/mobile/pinch.ts
---

திரையில் உள்ள குறிப்பிட்ட மூலப்பொருளில் பிஞ்ச் ஜெஸ்ச்சரை நிகழ்த்துகிறது.

:::info

பிஞ்சிங் என்பது நேட்டிவ் மொபைல் ஜெஸ்ச்சர்களின் அடிப்படையில் செய்யப்படுகிறது. இது பின்வரும் டிரைவர்களுக்கு மட்டுமே ஆதரிக்கப்படுகிறது:
- ஆண்ட்ராய்டுக்கான [appium-uiautomator2-driver](https://github.com/appium/appium-uiautomator2-driver/blob/master/docs/android-mobile-gestures.md#mobile-pinchclosegesture)
- iOS க்கான [appium-xcuitest-driver](https://appium.github.io/appium-xcuitest-driver/latest/reference/execute-methods/#mobile-pinch)

இந்த கட்டளை பின்வரும் புதுப்பித்த கூறுகளுடன் மட்டுமே வேலை செய்கிறது:
 - Appium சர்வர் (பதிப்பு 2.0.0 அல்லது அதற்கு மேல்)
 - `appium-uiautomator2-driver` (ஆண்ட்ராய்டுக்கு)
 - `appium-xcuitest-driver` (iOS க்கு)

இணக்க பிரச்சினைகளைத் தவிர்க்க உங்கள் உள்ளூர் அல்லது கிளவுட் அடிப்படையிலான Appium சூழல் தொடர்ந்து புதுப்பிக்கப்படுவதை உறுதிசெய்யவும்.

:::

##### பயன்பாடு

```js
$(selector).pinch({ duration, scale })
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
      <td>`PinchOptions`</td>
      <td>பிஞ்ச் விருப்பங்கள் (விருப்பத்தேர்வு)</td>
    </tr>
    <tr>
      <td><code><var>options.duration</var></code><br /><span className="label labelWarning">விருப்பத்தேர்வு</span></td>
      <td>`number`</td>
      <td>பிஞ்ச் எவ்வளவு வேகமாக செயல்படுத்தப்பட வேண்டும் என்பதை மில்லிசெகண்டில் குறிக்கும் கால அளவு, குறைந்தபட்சம் 500 மில்லிசெகண்டும் அதிகபட்சம் 10000 மில்லிசெகண்டும். இயல்புநிலை 1500 மில்லிசெகண்ட் (1.5 வினாடிகள்) (விருப்பத்தேர்வு)</td>
    </tr>
    <tr>
      <td><code><var>options.scale</var></code><br /><span className="label labelWarning">விருப்பத்தேர்வு</span></td>
      <td>`number`</td>
      <td>திரைக்கு ஏற்ப பிஞ்ச் எவ்வளவு பெரியதாக இருக்க வேண்டும் என்பதன் அளவு. செல்லுபடியாகும் மதிப்புகள் 0..1 வரம்பில் மிதப்பு எண்களாக இருக்க வேண்டும், அங்கு 1.0 என்பது 100% (விருப்பத்தேர்வு)</td>
    </tr>
  </tbody>
</table>

##### உதாரணம்

```js title="pinch.js"
it('should demonstrate a pinch on Google maps', async () => {
    const mapsElement = $('//*[@resource-id="com.google.android.apps.maps:id/map_frame"]')
    // Pinch with the default duration scale
    await mapsElement.pinch()
    // Pinch with a custom duration and scale
    await mapsElement.pinch({ duration: 4000, scale: 0.9 })
})
```