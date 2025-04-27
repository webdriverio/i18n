---
id: switchContext
title: switchContext
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/mobile/switchContext.ts
---

குறிப்பிட்ட வெப்வியூ `பெயர்`, `தலைப்பு`, அல்லது `url` ஐப் பயன்படுத்தி குறிப்பிட்ட சூழலுக்கு மாறுங்கள்.

இந்த முறை இயல்புநிலை Appium `context` கட்டளையை மேம்படுத்துகிறது, ஹைப்ரிட் மொபைல் பயன்பாடுகளில் நேட்டிவ் மற்றும் வெப்வியூ சூழல்களுக்கு இடையே மாறுவதற்கு அதிக நெகிழ்வுத்தன்மை மற்றும் துல்லியத்தை வழங்குகிறது.

### சூழல்கள் எவ்வாறு செயல்படுகின்றன
ஹைபிரிட் ஆப்ஸ் மற்றும் வெப்வியூக்களைப் பற்றிய கண்ணோட்டத்திற்கு, [ஹைபிரிட் ஆப்ஸ் ஆவணங்களைப்](/docs/api/mobile#hybrid-apps) பார்க்கவும்.
`switchContext` கட்டளை பொதுவான சவால்களை எவ்வாறு எதிர்கொள்கிறது என்பதைப் பற்றிய சுருக்கம் கீழே உள்ளது:

#### Android சவால்கள்
- வெப்வியூக்கள் பெரும்பாலும் பல பக்கங்களைக் கொண்டிருக்கும் (உலாவி தாவல்கள் போன்றவை). சரியான பக்கத்தை அடையாளம் காண `தலைப்பு` அல்லது `url` போன்ற கூடுதல்
  மெட்டாடேட்டா தேவைப்படுகிறது, இது இயல்புநிலை Appium முறைகளால் வழங்கப்படவில்லை.
- இயல்புநிலை Appium முறைகள் வெப்வியூவின் உள்ளடக்கம் அல்லது பக்கங்கள் பற்றிய விவரங்கள் இல்லாமல் அடிப்படை சூழல் பெயர்களை மட்டுமே (எ.கா., `WEBVIEW_{packageName}`) வழங்குகின்றன.
- Android இல் சூழல்களை மாற்றுவது இரண்டு படிகளை உள்ளடக்கியது, இது இந்த முறையால் தானாகவே கையாளப்படுகிறது:
  1. `WEBVIEW_{packageName}` ஐப் பயன்படுத்தி வெப்வியூ சூழலுக்கு மாறவும்.
  2. `switchToWindow` முறையைப் பயன்படுத்தி வெப்வியூவில் உள்ள பொருத்தமான பக்கத்தைத் தேர்ந்தெடுக்கவும்.

#### iOS சவால்கள்
- வெப்வியூக்கள் பொதுவான ஐடிக்களால் (எ.கா., `WEBVIEW_{id}`) அடையாளம் காணப்படுகின்றன, இவை உள்ளடக்கம் பற்றிய தகவல்களை வழங்குவதில்லை
  அல்லது அவை எந்த ஆப் திரைக்கு தொடர்புடையவை என்பதையும் வழங்குவதில்லை.
- தொடர்புகொள்வதற்கான சரியான வெப்வியூவை தீர்மானிப்பது பெரும்பாலும் சோதனை மற்றும் பிழை முறையைக் கொண்டிருக்கிறது.

`switchContext` முறை விரிவான மெட்டாடேட்டாவை (எ.கா., `தலைப்பு`, `url`, மற்றும் தெரிவுநிலை) பெறுவதன் மூலம் இந்த செயல்முறையை எளிதாக்குகிறது
துல்லியமான மற்றும் நம்பகமான சூழல் மாற்றுதலை உறுதிப்படுத்த.

### இந்த முறையை ஏன் பயன்படுத்த வேண்டும்?
- **எளிமையாக்கப்பட்ட மாற்றுதல்**: விரும்பிய வெப்வியூவின் `தலைப்பு` அல்லது `url` தெரிந்திருந்தால், இந்த முறை
  கூடுதல் `getContexts` அழைப்புகள் அல்லது `switchContext({id})` மற்றும் `getTitle()` போன்ற பல முறைகளை இணைக்கும் தேவையை நீக்குகிறது.
- **தானியங்கி சூழல் பொருத்துதல்**: இதன் அடிப்படையில் சூழலுக்கான சிறந்த பொருத்தத்தைக் கண்டறிகிறது:
  - தளம்-குறிப்பிட்ட அடையாளங்காட்டிகள் (iOS க்கு `bundleId`, Android க்கு `packageName`).
  - `தலைப்பு` அல்லது `url` க்கான துல்லியமான அல்லது பகுதி பொருத்தங்கள் (சரங்கள் மற்றும் வழக்கமான வெளிப்பாடுகள் இரண்டையும் ஆதரிக்கிறது).
  - வெப்வியூக்கள் இணைக்கப்பட்டுள்ளனவா மற்றும் தெரியக்கூடியவையா என்பதை உறுதிப்படுத்த Android-குறிப்பிட்ட சோதனைகள்.
- **சிறப்பான கட்டுப்பாடு**: தனிப்பயன் மறுமுயற்சி இடைவெளிகள் மற்றும் நேரம் முடிவுகள் (Android-மட்டும்) வெப்வியூ துவக்கத்தில் தாமதங்களைக் கையாள அனுமதிக்கின்றன.
- **இயல்புநிலை Appium முறை அணுகல்**: தேவைப்பட்டால், `driver.switchAppiumContext()` மூலம் இயல்புநிலை Appium `switchContext` கட்டளையைப் பயன்படுத்தலாம்.

:::info குறிப்புகள் மற்றும் வரம்புகள்

- விரும்பிய வெப்வியூவின் `தலைப்பு` அல்லது `url` தெரிந்திருந்தால், இந்த முறை கூடுதல் `getContexts` அழைப்புகள் இல்லாமல் பொருந்தும் சூழலைத் தானாகவே கண்டறிந்து அதற்கு மாற முடியும்.
- `androidWebviewConnectionRetryTime` மற்றும் `androidWebviewConnectTimeout` போன்ற Android-குறிப்பிட்ட விருப்பங்கள் iOS க்கு பொருந்தாது.
- பிழைத்திருத்தத்திற்கு உதவ சூழல்-பொருத்த தோல்விகளுக்கான காரணங்களை பதிவு செய்கிறது.
- உள்ளீடாக ஒரு பொருளைப் பயன்படுத்தும்போது, `தலைப்பு` அல்லது `url` தேவைப்படுகிறது.

:::

##### அளவுருக்கள்

<table>
  <thead>
    <tr>
      <th>பெயர்</th><th>வகை</th><th>விவரங்கள்</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>context</var></code></td>
      <td>`string, SwitchContextOptions`</td>
      <td>மாற வேண்டிய சூழலின் பெயர். மேலும் சூழல் விருப்பங்களுடன் ஒரு பொருள் வழங்கப்படலாம்.</td>
    </tr>
    <tr>
      <td><code><var>options</var></code></td>
      <td>`SwitchContextOptions`</td>
      <td>switchContext கட்டளை விருப்பங்கள்</td>
    </tr>
    <tr>
      <td><code><var>options.title</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`string, RegExp`</td>
      <td>மாற வேண்டிய பக்கத்தின் தலைப்பு. இது வெப்வியூ பக்கத்தின் தலைப்பு-டேக் உள்ளடக்கமாக இருக்கும். முழுமையாகப் பொருந்த வேண்டிய ஒரு சரத்தை நீங்கள் பயன்படுத்தலாம் அல்லது வழக்கமான வெளிப்பாட்டைப் பயன்படுத்தலாம்.<br /><strong>முக்கியம்:</strong> நீங்கள் விருப்பங்களைப் பயன்படுத்தும்போது, `title` அல்லது `url` பண்பு தேவை.</td>
    </tr>
    <tr>
      <td><code><var>options.url</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`string, RegExp`</td>
      <td>மாற வேண்டிய பக்கத்தின் url. இது வெப்வியூ பக்கத்தின் `url` ஆக இருக்கும். முழுமையாகப் பொருந்த வேண்டிய ஒரு சரத்தை நீங்கள் பயன்படுத்தலாம் அல்லது வழக்கமான வெளிப்பாட்டைப் பயன்படுத்தலாம்.<br /><strong>முக்கியம்:</strong> நீங்கள் விருப்பங்களைப் பயன்படுத்தும்போது, `title` அல்லது `url` பண்பு தேவை.</td>
    </tr>
    <tr>
      <td><code><var>options.androidWebviewConnectionRetryTime</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`number`</td>
      <td>வெப்வியூவுடன் இணைக்க ஒவ்வொரு மறுமுயற்சிக்கும் இடையே காத்திருக்க வேண்டிய நேரம் மில்லி வினாடிகளில். இயல்புநிலை `500` மில்லி வினாடிகள் (விருப்பமானது). <br /><strong>ANDROID-மட்டும்</strong> மற்றும் `title` அல்லது `url` வழங்கப்படும்போது மட்டுமே பயன்படுத்தப்படும்.</td>
    </tr>
    <tr>
      <td><code><var>options.androidWebviewConnectTimeout</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`number`</td>
      <td>வெப் வியூ பக்கம் கண்டறியப்படுவதற்கு காத்திருக்க வேண்டிய அதிகபட்ச நேரம் மில்லி வினாடிகளில். இயல்புநிலை `5000` மில்லி வினாடிகள் (விருப்பமானது). <br /><strong>ANDROID-மட்டும்</strong> மற்றும் `title` அல்லது `url` வழங்கப்படும்போது மட்டுமே பயன்படுத்தப்படும்.</td>
    </tr>
  </tbody>
</table>

##### உதாரணங்கள்

```js title="example.test.js"
it('should switch to a webview by name and uses the default Appium `context`-method', async () => {
    // For Android, the context will be '`WEBVIEW_{packageName}`'
    await driver.switchContext('WEBVIEW_com.wdiodemoapp')
    // For iOS, the context will be 'WEBVIEW_{number}'
    await driver.switchContext('WEBVIEW_94703.19')
})

```

```js title="exact.title.test.js"
it('should switch to a webview and match a webview based on an EXACT match of the `title` of the webview', async () => {
    await driver.switchContext({
        // In this case the title needs to be an exact match
        title: 'Webview Title',
    })
})

```

```js title="exact.url.test.js"
it('should switch to a webview and match a webview based on an EXACT match of the `title` of the webview', async () => {
    await driver.switchContext({
        // In this case the url needs to be an exact match
        url: 'https://webdriver.io',
    })
})

```

```js title="regex.title.url.test.js"
it('should switch to a webview and match a webview based on regex match of the `title` and `url` of the webview', async () => {
    await driver.switchContext({
        // The title should NOT end with 'foo'
        title: /^(?!.*foo$)/,
        // Matches any string that contains the substring `docs/api/mobile/switchContext`
        url: /.*docs\/api\/mobile\/switchContext/,
    })
})

```

```js title="android.context.waits.test.js"
it('should switch to a webview for Android but wait longer to connect and find a webview based on provided options', async () => {
    await driver.switchContext({
        // In this case the title need to be an exact match
        title: 'Webview Title',
        // For Android we might need to wait a bit longer to connect to the webview, so we can provide some additional options
        androidWebviewConnectionRetryTime: 1*1000,  // Retry every 1 second
        androidWebviewConnectTimeout: 10*1000,      // Timeout after 10 seconds
    })
})
```