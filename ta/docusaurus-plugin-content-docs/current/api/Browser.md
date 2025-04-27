---
id: browser
title: உலாவி பொருள்
---

__நீட்டிக்கிறது:__ [EventEmitter](https://nodejs.org/api/events.html#class-eventemitter)

உலாவி பொருள் என்பது உலாவி அல்லது மொபைல் சாதனத்தைக் கட்டுப்படுத்தப் பயன்படுத்தும் அமர்வு இன்ஸ்டன்ஸ் ஆகும். WDIO சோதனை இயக்கியைப் பயன்படுத்தினால், உலகளாவிய `browser` அல்லது `driver` பொருள் மூலம் அல்லது [`@wdio/globals`](/docs/api/globals) பயன்படுத்தி WebDriver இன்ஸ்டன்ஸை அணுகலாம். WebdriverIO-ஐ தனித்து இயங்கும் முறையில் பயன்படுத்தினால், உலாவி பொருள் [`remote`](/docs/api/modules#remoteoptions-modifier) முறை மூலம் திரும்பப்படும்.

அமர்வு சோதனை இயக்கியால் துவக்கப்படுகிறது. அமர்வை முடிப்பதும் அதே போல் சோதனை இயக்கி செயல்முறையால் செய்யப்படுகிறது.

## பண்புகள்

ஒரு உலாவி பொருளுக்கு பின்வரும் பண்புகள் உள்ளன:

| பெயர் | வகை | விவரங்கள் |
| ---- | ---- | ------- |
| `capabilities` | `Object` | தொலைநிலை சேவையகத்திலிருந்து ஒதுக்கப்பட்ட திறன்கள்.<br /><b>எடுத்துக்காட்டு:</b><pre>\{<br />  acceptInsecureCerts: false,<br />  browserName: 'chrome',<br />  browserVersion: '105.0.5195.125',<br />  chrome: \{<br />    chromedriverVersion: '105.0.5195.52',<br />    userDataDir: '/var/folders/3_/pzc_f56j15vbd9z3r0j050sh0000gn/T/.com.google.Chrome.76HD3S'<br />  \},<br />  'goog:chromeOptions': \{ debuggerAddress: 'localhost:64679' \},<br />  networkConnectionEnabled: false,<br />  pageLoadStrategy: 'normal',<br />  platformName: 'mac os x',<br />  proxy: \{},<br />  setWindowRect: true,<br />  strictFileInteractability: false,<br />  timeouts: \{ implicit: 0, pageLoad: 300000, script: 30000 \},<br />  unhandledPromptBehavior: 'dismiss and notify',<br />  'webauthn:extension:credBlob': true,<br />  'webauthn:extension:largeBlob': true,<br />  'webauthn:virtualAuthenticators': true<br />\}</pre> |
| `requestedCapabilities` | `Object` | தொலைநிலை சேவையகத்திலிருந்து கோரப்பட்ட திறன்கள்.<br /><b>எடுத்துக்காட்டு:</b><pre>\{ browserName: 'chrome' \}</pre>
| `sessionId` | `String` | தொலைநிலை சேவையகத்திலிருந்து ஒதுக்கப்பட்ட அமர்வு ஐடி. |
| `options` | `Object` | உலாவி பொருள் எவ்வாறு உருவாக்கப்பட்டது என்பதைப் பொறுத்து WebdriverIO [விருப்பங்கள்](/docs/configuration). மேலும் [அமைப்பு வகைகள்](/docs/setuptypes) பார்க்கவும். |
| `commandList` | `String[]` | உலாவி இன்ஸ்டன்ஸில் பதிவுசெய்யப்பட்ட கட்டளைகளின் பட்டியல் |
| `isW3C` | `Boolean` | இது ஒரு W3C அமர்வா என்பதைக் குறிக்கிறது |
| `isChrome` | `Boolean` | இது Chrome இன்ஸ்டன்ஸா என்பதைக் குறிக்கிறது |
| `isFirefox` | `Boolean` | இது Firefox இன்ஸ்டன்ஸா என்பதைக் குறிக்கிறது |
| `isBidi` | `Boolean` | இந்த அமர்வு Bidi ஐப் பயன்படுத்துகிறதா என்பதைக் குறிக்கிறது |
| `isSauce` | `Boolean` | இந்த அமர்வு Sauce Labs இல் இயங்குகிறதா என்பதைக் குறிக்கிறது |
| `isMacApp` | `Boolean` | இந்த அமர்வு நேட்டிவ் Mac ஆப்பிற்காக இயங்குகிறதா என்பதைக் குறிக்கிறது |
| `isWindowsApp` | `Boolean` | இந்த அமர்வு நேட்டிவ் Windows ஆப்பிற்காக இயங்குகிறதா என்பதைக் குறிக்கிறது |
| `isMobile` | `Boolean` | ஒரு மொபைல் அமர்வைக் குறிக்கிறது. [மொபைல் கொடிகள்](#mobile-flags) இன் கீழ் மேலும் பார்க்கவும். |
| `isIOS` | `Boolean` | ஒரு iOS அமர்வைக் குறிக்கிறது. [மொபைல் கொடிகள்](#mobile-flags) இன் கீழ் மேலும் பார்க்கவும். |
| `isAndroid` | `Boolean` | ஒரு Android அமர்வைக் குறிக்கிறது. [மொபைல் கொடிகள்](#mobile-flags) இன் கீழ் மேலும் பார்க்கவும். |
| `isNativeContext` | `Boolean`  | மொபைல் `NATIVE_APP` சூழலில் உள்ளதா என்பதைக் குறிக்கிறது. [மொபைல் கொடிகள்](#mobile-flags) இன் கீழ் மேலும் பார்க்கவும். |
| `mobileContext` | `string`  | ட்ரைவர் **தற்போது** இருக்கும் சூழலை வழங்கும், எடுத்துக்காட்டாக Android க்கு `NATIVE_APP`, `WEBVIEW_<packageName>` அல்லது iOS க்கு `WEBVIEW_<pid>`. இது `driver.getContext()` க்கு ஒரு கூடுதல் WebDriver ஐ சேமிக்கும். [மொபைல் கொடிகள்](#mobile-flags) இன் கீழ் மேலும் பார்க்கவும். |

## முறைகள்

உங்கள் அமர்விற்குப் பயன்படுத்தப்படும் தானியங்கி பின்னணியின் அடிப்படையில், WebdriverIO எந்த [நெறிமுறை கட்டளைகள்](/docs/api/protocols) [உலாவி பொருளுடன்](/docs/api/browser) இணைக்கப்படும் என்பதை அடையாளம் காணுகிறது. உதாரணமாக, Chrome இல் தானியங்கி அமர்வை இயக்கினால், [`elementHover`](/docs/api/chromium#elementhover) போன்ற Chromium குறிப்பிட்ட கட்டளைகளை அணுகலாம், ஆனால் எந்த [Appium கட்டளைகளும்](/docs/api/appium) இருக்காது.

மேலும் WebdriverIO ஒரு தொகுப்பு வசதியான முறைகளை வழங்குகிறது, பக்கத்தில் உள்ள [உலாவி](/docs/api/browser) அல்லது [உறுப்புகளுடன்](/docs/api/element) தொடர்புகொள்ள பயன்படுத்த பரிந்துரைக்கப்படுகிறது.

அதற்கு கூடுதலாக பின்வரும் கட்டளைகள் உள்ளன:

| பெயர் | அளவுருக்கள் | விவரங்கள் |
| ---- | ---------- | ------- |
| `addCommand` | - `commandName` (வகை: `String`)<br />- `fn` (வகை: `Function`)<br />- `attachToElement` (வகை: `boolean`) | கலவைக்கான நோக்கங்களுக்காக உலாவி பொருளிலிருந்து அழைக்கக்கூடிய தனிப்பயன் கட்டளைகளை வரையறுக்க அனுமதிக்கிறது. [தனிப்பயன் கட்டளை](/docs/customcommands) வழிகாட்டியில் மேலும் படிக்கவும். |
| `overwriteCommand` | - `commandName` (வகை: `String`)<br />- `fn` (வகை: `Function`)<br />- `attachToElement` (வகை: `boolean`) | எந்த உலாவி கட்டளையையும் தனிப்பயன் செயல்பாட்டுடன் மேலெழுத அனுமதிக்கிறது. இது கட்டமைப்பு பயனர்களை குழப்பலாம் என்பதால் கவனமாகப் பயன்படுத்தவும். [தனிப்பயன் கட்டளை](/docs/customcommands#overwriting-native-commands) வழிகாட்டியில் மேலும் படிக்கவும். |
| `addLocatorStrategy` | - `strategyName` (வகை: `String`)<br />- `fn` (வகை: `Function`) | தனிப்பயன் தேர்வு உத்தியை வரையறுக்க அனுமதிக்கிறது, [தேர்வுகள்](/docs/selectors#custom-selector-strategies) வழிகாட்டியில் மேலும் படிக்கவும். |

## குறிப்புகள்

### மொபைல் கொடிகள்

உங்கள் அமர்வு மொபைல் சாதனத்தில் இயங்குகிறதா இல்லையா என்பதைப் பொறுத்து உங்கள் சோதனையை மாற்ற வேண்டியிருந்தால், மொபைல் கொடிகளை அணுகலாம்.

எடுத்துக்காட்டாக, இந்த உள்ளமைவு கொடுக்கப்பட்டுள்ளது:

```js
// wdio.conf.js
export const config = {
    // ...
    capabilities: \\{
        platformName: 'iOS',
        app: 'net.company.SafariLauncher',
        udid: '123123123123abc',
        deviceName: 'iPhone',
        // ...
    }
    // ...
}
```

உங்கள் சோதனையில் இந்த கொடிகளை இவ்வாறு அணுகலாம்:

```js
// குறிப்பு: `driver` என்பது `browser` பொருளுக்கு சமமானது ஆனால் அர்த்தப்படி சரியானது
// நீங்கள் எந்த உலகளாவிய மாறியை பயன்படுத்த விரும்புகிறீர்கள் என்பதை தேர்வு செய்யலாம்
console.log(driver.isMobile) // வெளியீடு: true
console.log(driver.isIOS) // வெளியீடு: true
console.log(driver.isAndroid) // வெளியீடு: false
```

இது, உதாரணமாக, உங்கள் [பக்க பொருள்களில்](../pageobjects) சாதன வகையைப் பொறுத்து தேர்விகளை வரையறுக்க விரும்பினால் பயனுள்ளதாக இருக்கும், இப்படி:

```js
// mypageobject.page.js
import Page from './page'

class LoginPage extends Page {
    // ...
    get username() {
        const selectorAndroid = 'new UiSelector().text("Cancel").className("android.widget.Button")'
        const selectorIOS = 'UIATarget.localTarget().frontMostApp().mainWindow().buttons()[0]'
        const selectorType = driver.isAndroid ? 'android' : 'ios'
        const selector = driver.isAndroid ? selectorAndroid : selectorIOS
        return $(`${selectorType}=${selector}`)
    }
    // ...
}
```

குறிப்பிட்ட சாதன வகைகளுக்கு மட்டுமே சில சோதனைகளை இயக்க இந்த கொடிகளை பயன்படுத்தலாம்:

```js
// mytest.e2e.js
describe('my test', () => {
    // ...
    // Android சாதனங்களுடன் மட்டுமே சோதனை இயக்கவும்
    if (driver.isAndroid) {
        it('tests something only for Android', () => {
            // ...
        })
    }
    // ...
})
```

### நிகழ்வுகள்
உலாவி பொருள் ஒரு EventEmitter மற்றும் உங்கள் பயன்பாட்டு வழக்குகளுக்காக சில நிகழ்வுகள் வெளியிடப்படுகின்றன.

இங்கே நிகழ்வுகளின் பட்டியல் உள்ளது. இதுவரை கிடைக்கக்கூடிய நிகழ்வுகளின் முழு பட்டியல் அல்ல என்பதை நினைவில் கொள்ளுங்கள்.
இங்கே மேலும் நிகழ்வுகளின் விளக்கங்களைச் சேர்ப்பதன் மூலம் ஆவணத்தைப் புதுப்பிக்க பங்களிக்க தயங்க வேண்டாம்.

#### `command`

WebdriverIO ஒரு WebDriver Classic கட்டளையை அனுப்பும் போதெல்லாம் இந்த நிகழ்வு வெளியிடப்படுகிறது. இது பின்வரும் தகவல்களைக் கொண்டுள்ளது:

- `command`: கட்டளையின் பெயர், எ.கா. `navigateTo`
- `method`: கட்டளை கோரிக்கையை அனுப்ப பயன்படுத்தப்படும் HTTP முறை, எ.கா. `POST`
- `endpoint`: கட்டளை முடிவுப்புள்ளி, எ.கா. `/session/fc8dbda381a8bea36a225bd5fd0c069b/url`
- `body`: கட்டளை பேலோடு, எ.கா. `{ url: 'https://webdriver.io' }`

#### `result`

WebdriverIO ஒரு WebDriver Classic கட்டளையின் முடிவைப் பெறும் போதெல்லாம் இந்த நிகழ்வு வெளியிடப்படுகிறது. இது பின்வரும் தகவல்களைத் தவிர `command` நிகழ்வைப் போலவே தகவல்களைக் கொண்டுள்ளது:

- `result`: கட்டளை முடிவு

#### `bidiCommand`

WebdriverIO ஒரு WebDriver Bidi கட்டளையை உலாவி டிரைவருக்கு அனுப்பும் போதெல்லாம் இந்த நிகழ்வு வெளியிடப்படுகிறது. இது பற்றிய தகவல்களைக் கொண்டுள்ளது:

- `method`: WebDriver Bidi கட்டளை முறை
- `params`: தொடர்புடைய கட்டளை அளவுரு (பார்க்க [API](/docs/api/webdriverBidi))

#### `bidiResult`

கட்டளை வெற்றிகரமாக செயல்படுத்தப்பட்ட நிலையில், நிகழ்வு பேலோடு இருக்கும்:

- `type`: `success`
- `id`: கட்டளை ஐடி
- `result`: கட்டளை முடிவு (பார்க்க [API](/docs/api/webdriverBidi))

கட்டளை பிழையின் நிலையில், நிகழ்வு பேலோடு இருக்கும்:

- `type`: `error`
- `id`: கட்டளை ஐடி
- `error`: பிழை குறியீடு, எ.கா. `invalid argument`
- `message`: பிழை பற்றிய விவரங்கள்
- `stacktrace`: ஒரு ஸ்டேக் டிரேஸ்

#### `request.start`
இந்த நிகழ்வு WebDriver கோரிக்கை டிரைவருக்கு அனுப்பப்படுவதற்கு முன் எழுப்பப்படுகிறது. இது கோரிக்கை மற்றும் அதன் பேலோடு பற்றிய தகவல்களைக் கொண்டுள்ளது.

```ts
browser.on('request.start', (ev: RequestInit) => {
    // ...
})
```

#### `request.end`
டிரைவருக்கான கோரிக்கை ஒரு பதிலைப் பெற்றவுடன் இந்த நிகழ்வு எழுப்பப்படுகிறது. WebDriver கட்டளை தோல்வியுற்றால் நிகழ்வு பொருள் பதில் உடலை முடிவாகக் கொண்டிருக்கும் அல்லது ஒரு பிழையைக் கொண்டிருக்கும்.

```ts
browser.on('request.end', (ev: { result: unknown, error?: Error }) => {
    // ...
})
```

#### `request.retry`
ஒரு நெட்வொர்க் சிக்கல் போன்ற காரணத்தினால் WebdriverIO கட்டளையை இயக்க மீண்டும் முயற்சிக்கும்போது மறுமுயற்சி நிகழ்வு உங்களுக்குத் தெரிவிக்கும். இது மறுமுயற்சிக்கு காரணமான பிழை பற்றிய தகவல்களையும், ஏற்கனவே செய்யப்பட்ட மறுமுயற்சிகளின் எண்ணிக்கையையும் கொண்டுள்ளது.

```ts
browser.on('request.retry', (ev: { error: Error, retryCount: number }) => {
    // ...
})
```

#### `request.performance`
இது WebDriver நிலை செயல்பாடுகளை அளவிடுவதற்கான ஒரு நிகழ்வாகும். WebdriverIO WebDriver பின்புறத்திற்கு கோரிக்கை அனுப்பும் போதெல்லாம், இந்த நிகழ்வு சில பயனுள்ள தகவல்களுடன் வெளியிடப்படும்:

- `durationMillisecond`: மில்லிவினாடியில் கோரிக்கையின் கால அளவு.
- `error`: கோரிக்கை தோல்வியுற்றால் பிழை பொருள்.
- `request`: கோரிக்கை பொருள். url, முறை, தலைப்புகள் போன்றவற்றைக் காணலாம்.
- `retryCount`: இது '0' ஆக இருந்தால், கோரிக்கை முதல் முயற்சி. WebDriverIO உள்ளே மறுமுயற்சி செய்யும்போது இது அதிகரிக்கும்.
- `success`: கோரிக்கை வெற்றிகரமாக இருந்ததா இல்லையா என்பதைக் குறிக்கும் Boolean. இது 'false' என்றால், 'error' பண்பும் வழங்கப்படும்.

ஒரு எடுத்துக்காட்டு நிகழ்வு:
```js
Object {
  "durationMillisecond": 0.01770925521850586,
  "error": [Error: Timeout],
  "request": Object { ... },
  "retryCount": 0,
  "success": false,
},
```

### தனிப்பயன் கட்டளைகள்

பொதுவாகப் பயன்படுத்தப்படும் வேலைப்பாய்வுகளைச் சுருக்கமாக்க உலாவி அளவில் தனிப்பயன் கட்டளைகளை அமைக்கலாம். மேலும் தகவலுக்கு எங்கள் [தனிப்பயன் கட்டளைகள்](/docs/customcommands#adding-custom-commands) வழிகாட்டியைப் பார்க்கவும்.