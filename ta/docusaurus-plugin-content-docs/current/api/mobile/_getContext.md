---
id: getContext
title: getContext
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/mobile/getContext.ts
---

தற்போதைய அமர்வின் சூழலைப் பெறுக.

இந்த முறை, இயல்புநிலை Appium `context`/WebdriverIO `getContext` கட்டளையை மேம்படுத்துகிறது, விரிவான சூழல் தகவலைத் திரும்பப் பெறும் விருப்பத்தை வழங்குகிறது, இது வெப்வியூகளைப் பயன்படுத்தும் கலப்பு ஆப்ஸுடன் பணியாற்றுவதை எளிதாக்குகிறது.

### சூழல்கள் எவ்வாறு செயல்படுகின்றன
மேலும் தகவலுக்கு [கலப்பு ஆப்ஸ் ஆவணங்களைப்](/docs/api/mobile#hybrid-apps) பார்க்கவும். கீழே `getContext` கட்டளையுடன் தொடர்புடைய சவால்களின் விளக்கம் உள்ளது:

#### Android-க்கு:
- வெப்வியூகள் பல பக்கங்களை (உலாவி தாவல்கள் போல) கொண்டிருக்கலாம், மற்றும் சரியான பக்கத்தை அடையாளம் காண `title` அல்லது `url` போன்ற கூடுதல் மெட்டாடேட்டா தேவைப்படுகிறது.
- இயல்புநிலை Appium முறைகள் அடிப்படை சூழல் பெயர்களை மட்டுமே வழங்குகின்றன (எ.கா., `WEBVIEW_{packageName}`) வெப்வியூவில் உள்ள பக்கங்கள் பற்றிய விரிவான தகவல் இல்லாமல்.

#### iOS-க்கு:
- ஒவ்வொரு வெப்வியூவும் ஒரு பொதுவான `WEBVIEW_{id}` சரத்தால் அடையாளம் காணப்படுகிறது, இது அதன் உள்ளடக்கத்தையோ அல்லது அது சேர்ந்த ஆப் திரையையோ குறிக்காது.

### இந்த முறையை ஏன் பயன்படுத்த வேண்டும்?
- **இயல்புநிலை செயல்பாடு**:
  - தற்போதைய சூழலை ஒரு சரமாக திரும்ப அளிக்கிறது (எ.கா., `NATIVE_APP` அல்லது `WEBVIEW_{id}`).
- **விரிவான சூழல்**:
  - `returnDetailedContext` இயக்கப்படும்போது, பின்வரும் மெட்டாடேட்டாவைப் பெறுகிறது:
    - **Android**: `packageName`, `title`, `url`, மற்றும் `webviewPageId`.
    - **iOS**: `bundleId`, `title`, மற்றும் `url`.
- **Android-குறிப்பிட்ட விருப்பங்கள்**:
  - வெப்வியூ துவக்கத்தில் தாமதங்களைக் கையாள மறுமுயற்சி இடைவெளிகள் மற்றும் காலாவதிகளை தனிப்பயனாக்கலாம்.

:::info குறிப்புகள் மற்றும் வரம்புகள்

- `returnDetailedContext` இயக்கப்படாவிட்டால், இந்த முறை இயல்புநிலை Appium `getContext` முறை போல செயல்படும்.
- நீங்கள் "இயல்புநிலை" Appium `context` முறையைப் பயன்படுத்த விரும்பினால், `driver.getAppiumContext()` முறையைப் பயன்படுத்தலாம், [Appium Contexts](/docs/api/appium#getappiumcontext) கட்டளையையும் பார்க்கவும்.
- **Android:** Android-குறிப்பிட்ட விருப்பங்கள் (`androidWebviewConnectionRetryTime` மற்றும் `androidWebviewConnectTimeout`) iOS-ல் எந்த விளைவையும் ஏற்படுத்தாது.
- பல அல்லது விரிவான சூழல்கள் இல்லை என்றால் எச்சரிக்கைகளை பதிவு செய்கிறது:
  - `தற்போதைய சூழலுக்கு '{context}' 1க்கும் மேற்பட்ட விரிவான சூழல்களைக் கண்டோம். முதல் சூழலை திருப்பி அளிப்போம்.`
  - `தற்போதைய சூழலுக்கு '{context}' எந்த விரிவான சூழலையும் திரும்பப் பெறவில்லை. தற்போதைய சூழலை ஒரு சரமாக திருப்பி அளிப்போம்.`

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
      <td><code><var>options</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`GetContextsOptions`</td>
      <td>`getContext` விருப்பங்கள் (விருப்பத்தேர்வு)</td>
    </tr>
    <tr>
      <td><code><var>options.returnDetailedContext</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`boolean`</td>
      <td>இயல்பாக, நாங்கள் இயல்புநிலை Appium `context` API-ஐ அடிப்படையாகக் கொண்ட சூழல் பெயரை மட்டுமே திரும்பத் தருகிறோம், இது ஒரு சரம் மட்டுமே. நீங்கள் விரிவான சூழல் தகவலைப் பெற விரும்பினால், இதை `true` என அமைக்கவும். இயல்புநிலை `false` (விருப்பத்தேர்வு).</td>
    </tr>
    <tr>
      <td><code><var>options.androidWebviewConnectionRetryTime</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`number`</td>
      <td>வெப்வியூவுடன் இணைவதற்கு ஒவ்வொரு மறுமுயற்சிக்கும் இடையில் காத்திருக்க வேண்டிய மில்லிவினாடிகளில் நேரம். இயல்புநிலை `500` மில்லிவினாடிகள் (விருப்பத்தேர்வு). <br /><strong>ANDROID-மட்டும்</strong></td>
    </tr>
    <tr>
      <td><code><var>options.androidWebviewConnectTimeout</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`number`</td>
      <td>வெப் வியூ பக்கம் கண்டறியப்படுவதற்காக காத்திருக்க வேண்டிய அதிகபட்ச நேரம் மில்லிவினாடிகளில். இயல்புநிலை `5000` மில்லிவினாடிகள் (விருப்பத்தேர்வு). <br /><strong>ANDROID-மட்டும்</strong></td>
    </tr>
  </tbody>
</table>

##### எடுத்துக்காட்டுகள்

```js title="default.test.js"
it('should return the current context with the default Appium `context` method', async () => {
    // For Android
    await driver.getContext()
    // Returns 'WEBVIEW_com.wdiodemoapp' or 'NATIVE_APP'
    //
    // For iOS, the context will be 'WEBVIEW_{number}'
    await driver.getContext()
    // Returns 'WEBVIEW_94703.19' or 'NATIVE_APP'
})

```

```js title="detailed.test.js"
it('should return the context of the current session with more detailed information', async () => {
    // For Android
    await driver.getContext({ returnDetailedContext: true})
    // Returns or `NATIVE_APP`, or
    // {
    //   id: 'WEBVIEW_com.wdiodemoapp',
    //   title: 'WebdriverIO · Next-gen browser and mobile automation test framework for Node.js | WebdriverIO',
    //   url: 'https://webdriver.io/',
    //   packageName: 'com.wdiodemoapp',
    //   webviewPageId: '5C0425CF67E9B169245F48FF21172912'
    // }
    //
    // For iOS, the context will be 'WEBVIEW_{number}'
    await driver.getContext({ returnDetailedContext: true})
    // Returns or `NATIVE_APP`, or
    // {
    //   id: 'WEBVIEW_64981.1',
    //   title: 'WebdriverIO · Next-gen browser and mobile automation test framework for Node.js | WebdriverIO',
    //   url: 'https://webdriver.io/',
    //   bundleId: 'org.reactjs.native.example.wdiodemoapp'
    // }
})

```

```js title="customize.retry.test.js"
it('should be able to cusomize the retry intervals and timeouts to handle delayed webview initialization', async () => {
    // For Android
    await driver.getContext({
        returnDetailedContext: true,
        // NOTE: The following options are Android-specific
        // For Android we might need to wait a bit longer to connect to the webview, so we can provide some additional options
        androidWebviewConnectionRetryTime: 1*1000,  // Retry every 1 second
        androidWebviewConnectTimeout: 10*1000,      // Timeout after 10 seconds
    })
})
```