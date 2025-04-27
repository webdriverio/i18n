---
id: getContexts
title: getContexts
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/mobile/getContexts.ts
---

WebdriverIO `getContexts` முறை என்பது இயல்புநிலை Appium `contexts` (மற்றும் முந்தைய WebdriverIO `getContexts`) கட்டளையின் மேம்படுத்தப்பட்ட பதிப்பாகும். இது மொபைல் ஆப் அமர்வில் கிடைக்கக்கூடிய சூழல்கள் பற்றிய விரிவான மற்றும் செயல்படுத்தக்கூடிய தகவல்களை வழங்குகிறது, இயல்புநிலை Appium முறைகளின் வரம்புகளை நிவர்த்தி செய்கிறது.

### வெப்வியூகள் எவ்வாறு செயல்படுகின்றன மற்றும் இந்த முறை எவ்வாறு உதவுகிறது
மேலும் விவரங்களுக்கு, [ஹைபிரிட் ஆப்ஸ் ஆவணங்களைப்](/docs/api/mobile#hybrid-apps) பார்க்கவும். `getContexts` கட்டளையால் நிவர்த்தி செய்யப்படும் சவால்களின் சுருக்கம் கீழே உள்ளது:

#### ஆண்ட்ராய்டு சவால்கள்
- ஒரு ஒற்றை வெப்வியூ (எ.கா., `WEBVIEW_{packageName}`) பல பக்கங்களைக் கொண்டிருக்கலாம் (உலாவி தாவல்கள் போல).
- இயல்புநிலை Appium முறைகள் இந்த பக்கங்களின் விவரங்களை, அதாவது `title`, `url`, அல்லது காணக்கூடிய நிலை போன்றவற்றை உள்ளடக்காது, இது சரியான பக்கத்தை அடையாளம் காண்பதை கடினமாக்கி, சாத்தியமான நிலையற்ற தன்மைக்கு வழிவகுக்கும்.

#### iOS சவால்கள்
- இயல்புநிலை Appium முறை கூடுதல் மெட்டாடேட்டா இல்லாமல் பொதுவான வெப்வியூ IDகளை (எ.கா., `WEBVIEW_{id}`) மட்டுமே திருப்பித் தருகிறது.
- இது எந்த வெப்வியூ இலக்கு ஆப் திரைக்கு பொருந்துகிறது என்பதை தீர்மானிப்பதை கடினமாக்குகிறது.

மேம்படுத்தப்பட்ட `getContexts` முறை இந்த சிக்கல்களை விரிவான சூழல் பொருள்களை வழங்குவதன் மூலம் தீர்க்கிறது, அதில் அடங்குபவை:
- **ஆண்ட்ராய்டுக்கு:** `title`, `url`, `packageName`, `webviewPageId`, மற்றும் லேஅவுட் விவரங்கள் (`screenX`, `screenY`, `width`, மற்றும் `height`).
- **iOS க்கு:** `bundleId`, `title`, மற்றும் `url`.

இந்த மேம்பாடுகள் ஹைபிரிட் ஆப்களுடனான பிழைத்திருத்தம் மற்றும் தொடர்பை அதிக நம்பகத்தன்மையுடன் செய்ய வைக்கின்றன.

### இந்த முறையை ஏன் பயன்படுத்த வேண்டும்?
இயல்பாக, Appium `contexts` முறை கிடைக்கக்கூடிய சூழல்களைக் குறிக்கும் சரங்களின் வரிசையை மட்டுமே திருப்பித் தருகிறது:
- **ஆண்ட்ராய்டுக்கு:** `['NATIVE_APP', 'WEBVIEW_com.wdiodemoapp', ...]`
- **iOS க்கு:** `['NATIVE_APP', 'WEBVIEW_84392.1', ...]`

எளிய சூழ்நிலைகளுக்கு போதுமானதாக இருந்தாலும், இந்த இயல்புநிலை பதில்கள் ஹைபிரிட் ஆப் சோதனைக்கு முக்கியமான மெட்டாடேட்டாக்களை இல்லாமல் இருக்கின்றன:
- **ஆண்ட்ராய்டுக்கு:** பக்கம் சார்ந்த மெட்டாடேட்டா இல்லாதது சரியான வெப்வியூவுடன் தொடர்புகொள்வதை சவாலாக்குகிறது.
- **iOS க்கு:** பொதுவான வெப்வியூ IDகள் அவை குறிக்கும் உள்ளடக்கம் அல்லது ஆப் திரை பற்றிய எந்த தகவலையும் வழங்குவதில்லை.

மேம்படுத்தப்பட்ட `getContexts` முறை வழங்குவது:
- ஆண்ட்ராய்டு மற்றும் iOS இரண்டிற்கும் விரிவான மெட்டாடேட்டா.
- சிறந்த இலக்கு மற்றும் தொடர்புக்காக திரும்பும் சூழல்களை வடிகட்ட மற்றும் தனிப்பயனாக்க விருப்பங்கள்.

:::info குறிப்புகள் மற்றும் வரம்புகள்

- மேம்படுத்தப்பட்ட `getContexts` முறை ஆண்ட்ராய்டு மற்றும் iOS இரண்டு தளங்களிலும் செயல்படுகிறது. இருப்பினும், திரும்பப்படும் தரவு தளம் மற்றும் சோதிக்கப்படும் ஆப்பைப் பொறுத்து மாறுபடலாம்.
- நீங்கள் `returnDetailedContexts` விருப்பத்தை குறிப்பிடவில்லை என்றால், முறை இயல்புநிலை Appium `contexts` முறையைப் போல செயல்படும், எளிய சூழல் வரிசையைத் திருப்பித் தரும்.
- "இயல்புநிலை" Appium `contexts` முறையைப் பயன்படுத்த, `driver.getAppiumContexts()` ஐப் பயன்படுத்தவும். மேலும் தகவலுக்கு, [Appium Contexts ஆவணங்களைப்](/docs/api/appium#getappiumcontexts) பார்க்கவும்.

#### ஆண்ட்ராய்டு வெப்வியூகள்:
- `androidWebviewData` போன்ற மெட்டாடேட்டா `returnAndroidDescriptionData` `true` என்றால் மட்டுமே கிடைக்கும்.
- Chrome உலாவியில் `getContexts` முறையைப் பயன்படுத்துவது சில நேரங்களில் பொருந்தாத உலாவி/வெப்வியூ/ChromeDriver பதிப்புகள் காரணமாக முழுமையற்ற தரவைத் திருப்பித் தரலாம். இத்தகைய சந்தர்ப்பங்களில், இயல்புநிலை மதிப்புகள் அல்லது தவறான `webviewPageId` (எ.கா., `0`) திருப்பித் தரப்படலாம்.

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
      <td>`getContexts` விருப்பங்கள் (விருப்பத்தேர்வு)</td>
    </tr>
    <tr>
      <td><code><var>options.returnDetailedContexts</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`boolean`</td>
      <td>இயல்பாக, நாங்கள் இயல்புநிலை Appium `contexts` API அடிப்படையில் சூழல் பெயர்களை மட்டுமே திருப்பித் தருகிறோம். நீங்கள் அனைத்து தரவையும் பெற விரும்பினால், இதை `true` என அமைக்கலாம். இயல்புநிலை `false` (விருப்பத்தேர்வு).</td>
    </tr>
    <tr>
      <td><code><var>options.androidWebviewConnectionRetryTime</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`number`</td>
      <td>வெப்வியூவுடன் இணைக்க ஒவ்வொரு முறை முயற்சிக்கும் போதும் காத்திருக்க வேண்டிய நேரம் மில்லி செகண்டுகளில். இயல்புநிலை `500` மில்லி செகண்டுகள் (விருப்பத்தேர்வு). <br /><strong>ஆண்ட்ராய்டு-மட்டும்</strong></td>
    </tr>
    <tr>
      <td><code><var>options.androidWebviewConnectTimeout</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`number`</td>
      <td>வெப் வியூ பக்கம் கண்டறியப்படுவதற்கு காத்திருக்க வேண்டிய அதிகபட்ச நேரம் மில்லி செகண்டுகளில். இயல்புநிலை `5000` மில்லி செகண்டுகள் (விருப்பத்தேர்வு). <br /><strong>ஆண்ட்ராய்டு-மட்டும்</strong></td>
    </tr>
    <tr>
      <td><code><var>options.filterByCurrentAndroidApp</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`boolean`</td>
      <td>இயல்பாக, நாங்கள் அனைத்து வெப்வியூகளையும் திருப்பித் தருகிறோம். நீங்கள் தற்போது திறக்கப்பட்டுள்ள ஆண்ட்ராய்டு ஆப் மூலம் வெப்வியூகளை வடிகட்ட விரும்பினால், இதை `true` என அமைக்கலாம். இயல்புநிலை `false` (விருப்பத்தேர்வு). <br /><strong>குறிப்பு:</strong> இந்த "கட்டுப்பாட்டின்" அடிப்படையில் நீங்கள் எந்த வெப்வியூவையும் கண்டுபிடிக்க முடியாது என்பதை கவனத்தில் கொள்ளவும். <br /><strong>ஆண்ட்ராய்டு-மட்டும்</strong></td>
    </tr>
    <tr>
      <td><code><var>options.isAndroidWebviewVisible</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`boolean`</td>
      <td>இயல்பாக, நாங்கள் இணைக்கப்பட்டு காணக்கூடிய வெப்வியூகளை மட்டுமே திருப்பித் தருகிறோம். நீங்கள் அனைத்து வெப்வியூகளையும் பெற விரும்பினால், இதை `false` என அமைக்கலாம் (விருப்பத்தேர்வு). இயல்புநிலை `true`. <br /><strong>ஆண்ட்ராய்டு-மட்டும்</strong></td>
    </tr>
    <tr>
      <td><code><var>options.returnAndroidDescriptionData</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`boolean`</td>
      <td>இயல்பாக, ஆண்ட்ராய்டு வெப்வியூ (Chrome) விளக்க விளக்க தரவு இல்லை. நீங்கள் அனைத்து தரவையும் பெற விரும்பினால், இதை `true` என அமைக்கலாம். இயல்புநிலை `false` (விருப்பத்தேர்வு). <br />இந்த விருப்பத்தை இயக்குவதன் மூலம் பதிலில் கூடுதல் தரவு கிடைக்கும், மேலும் தகவலுக்கு `description.data.test.js` ஐப் பார்க்கவும். <br /><strong>ஆண்ட்ராய்டு-மட்டும்</strong></td>
    </tr>
  </tbody>
</table>

##### எடுத்துக்காட்டுகள்

```js title="example.test.js"
it('should return all contexts in the current session with the default Appium `contexts`-method.', async () => {
    // For Android
    await driver.getContexts()
    // Returns ['NATIVE_APP', 'WEBVIEW_com.wdiodemoapp', ...]
    //
    // For iOS, the context will be 'WEBVIEW_{number}'
    await driver.getContexts()
    // Returns [ 'NATIVE_APP', 'WEBVIEW_84392.1', ... ]
})

```

```js title="detailed.test.js"
it('should return all contexts in the current session with detailed info.', async () => {
    // For Android
    await driver.getContexts({returnDetailedContexts: true})
    // Returns [
    //   { id: 'NATIVE_APP' },
    //   {
    //       id: 'WEBVIEW_com.wdiodemoapp',
    //       title: 'WebdriverIO · Next-gen browser and mobile automation test framework for Node.js | WebdriverIO',
    //       url: 'https://webdriver.io/',
    //       packageName: 'com.wdiodemoapp',
    //       webviewPageId: '58B0AA2DBBBBBE9008C35AE42385BB0D'
    //   },
    //   {
    //       id: 'WEBVIEW_chrome',
    //       title: 'Android | Get more done with Google on Android-phones and devices',
    //       url: 'https://www.android.com/',
    //       packageName: 'com.android.chrome',
    //       webviewPageId: '0'
    //   }
    // ]
    //
    // For iOS, the context will be 'WEBVIEW_{number}'
    await driver.getContexts({returnDetailedContexts: true})
    // Returns: [
    //   { id: 'NATIVE_APP' },
    //   {
    //       id: 'WEBVIEW_86150.1',
    //       title: 'WebdriverIO · Next-gen browser and mobile automation test framework for Node.js | WebdriverIO',
    //       url: 'https://webdriver.io/',
    //       bundleId: 'org.reactjs.native.example.wdiodemoapp'
    //   },
    //   {
    //       id: 'WEBVIEW_86152.1',
    //       title: 'Apple',
    //       url: 'https://www.apple.com/',
    //       bundleId: 'com.apple.mobilesafari'
    //   }
    // ]
})

```

```js title="description.data.test.js"
it('should return Android description data for the webview', async () => {
    // For Android
    await driver.getContexts({returnDetailedContexts: true, returnAndroidDescriptionData: true})
    // Returns [
    //   { id: 'NATIVE_APP' },
    //   {
    //       androidWebviewData: {
    //          // Indicates whether the web page is currently attached to a web view.
    //          // `true` means the page is attached and likely active, `false` indicates it is not.
    //          attached: true,
    //          // Indicates whether the web page is empty or not. An empty page typically means that
    //          // there is no significant content loaded in it. `true` indicates the page is empty,
    //          // `false` indicates it has content.
    //          empty: false,
    //          // Indicates whether the page has never been attached to a web view. If `true`, the
    //          // page has never been attached, which could indicate a new or unused page. If `false`,
    //          // the page has been attached at some point.
    //          neverAttached: false,
    //          // Indicates whether the web page is visible on the screen. `true` means the page is
    //          // visible to the user, `false` means it is not.
    //          visible: true,
    //          // This data can be super useful to determine where on the screen the webview is located
    //          // and can come in handy when you want to interact with elements on the screen based on
    //          // coordinates based on the top-left corner of the screen
    //          screenX: 0,
    //          screenY: 151,
    //          height: 2589,
    //          width: 1344
    //       },
    //       id: 'WEBVIEW_com.wdiodemoapp',
    //       title: 'WebdriverIO · Next-gen browser and mobile automation test framework for Node.js | WebdriverIO',
    //       url: 'https://webdriver.io/',
    //       packageName: 'com.wdiodemoapp',
    //       webviewPageId: '58B0AA2DBBBBBE9008C35AE42385BB0D'
    //   }
    // ]
})
```