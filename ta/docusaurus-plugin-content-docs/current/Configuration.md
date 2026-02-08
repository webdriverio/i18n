---
id: configuration
title: கட்டமைப்பு
---

[அமைவு வகை](/docs/setuptypes) அடிப்படையில் (எ.கா. raw protocol bindings, WebdriverIO தனிப்பட்ட தொகுப்பு அல்லது WDIO டெஸ்ட்ரன்னர் பயன்படுத்துதல்) சூழலை கட்டுப்படுத்த பல்வேறு விருப்பங்கள் உள்ளன.

## WebDriver விருப்பங்கள்

[`webdriver`](https://www.npmjs.com/package/webdriver) புரோட்டாகால் தொகுப்பைப் பயன்படுத்தும்போது பின்வரும் விருப்பங்கள் வரையறுக்கப்படுகின்றன:

### protocol

இயக்கி சேவையகத்துடன் தொடர்பு கொள்ள பயன்படுத்தப்படும் புரோட்டாகால்.

வகை: `String`<br />
இயல்புநிலை: `http`

### hostname

உங்கள் இயக்கி சேவையகத்தின் ஹோஸ்ட்.

வகை: `String`<br />
இயல்புநிலை: `0.0.0.0`

### port

உங்கள் இயக்கி சேவையகம் இருக்கும் போர்ட்.

வகை: `Number`<br />
இயல்புநிலை: `undefined`

### path

இயக்கி சேவையகத்தின் முடிவு புள்ளி பாதை.

வகை: `String`<br />
இயல்புநிலை: `/`

### queryParams

இயக்கி சேவையகத்திற்கு அனுப்பப்படும் வினவல் அளவுருக்கள்.

வகை: `Object`<br />
இயல்புநிலை: `undefined`

### user

உங்கள் கிளவுட் சேவை பயனர்பெயர் ([Sauce Labs](https://saucelabs.com), [Browserstack](https://www.browserstack.com), [TestingBot](https://testingbot.com) அல்லது [TestMu AI](https://www.testmuai.com/) கணக்குகளுக்கு மட்டுமே பயன்படும்). அமைக்கப்பட்டால், WebdriverIO தானாகவே இணைப்பு விருப்பங்களை அமைக்கும். கிளவுட் வழங்குநரைப் பயன்படுத்தவில்லை என்றால், இதை வேறு எந்த WebDriver பின்னணியையும் அங்கீகரிக்கப் பயன்படுத்தலாம்.

வகை: `String`<br />
இயல்புநிலை: `undefined`

### key

உங்கள் கிளவுட் சேவை அணுகல் விசை அல்லது ரகசிய விசை ([Sauce Labs](https://saucelabs.com), [Browserstack](https://www.browserstack.com), [TestingBot](https://testingbot.com) அல்லது [TestMu AI](https://www.testmuai.com/) கணக்குகளுக்கு மட்டுமே பயன்படும்). அமைக்கப்பட்டால், WebdriverIO தானாகவே இணைப்பு விருப்பங்களை அமைக்கும். கிளவுட் வழங்குநரைப் பயன்படுத்தவில்லை என்றால், இதை வேறு எந்த WebDriver பின்னணியையும் அங்கீகரிக்கப் பயன்படுத்தலாம்.

வகை: `String`<br />
இயல்புநிலை: `undefined`

### capabilities

உங்கள் WebDriver அமர்வில் இயக்க விரும்பும் திறன்களை வரையறுக்கிறது. மேலும் விவரங்களுக்கு [WebDriver Protocol](https://w3c.github.io/webdriver/#capabilities) ஐப் பார்க்கவும். WebDriver புரோட்டாகாலை ஆதரிக்காத பழைய இயக்கியை இயக்கினால், ஒரு அமர்வை வெற்றிகரமாக இயக்க [JSONWireProtocol capabilities](https://github.com/SeleniumHQ/selenium/wiki/DesiredCapabilities) ஐப் பயன்படுத்த வேண்டியிருக்கும்.

WebDriver அடிப்படையிலான திறன்களுக்கு அடுத்ததாக, தொலை உலாவி அல்லது சாதனத்திற்கு ஆழமான கட்டமைப்பை அனுமதிக்கும் உலாவி மற்றும் விற்பனையாளர் குறிப்பிட்ட விருப்பங்களைப் பயன்படுத்தலாம். இவை தொடர்புடைய விற்பனையாளர் ஆவணங்களில் ஆவணப்படுத்தப்பட்டுள்ளன, எ.கா:

- `goog:chromeOptions`: [Google Chrome](https://chromedriver.chromium.org/capabilities#h.p_ID_106) க்கு
- `moz:firefoxOptions`: [Mozilla Firefox](https://firefox-source-docs.mozilla.org/testing/geckodriver/Capabilities.html) க்கு
- `ms:edgeOptions`: [Microsoft Edge](https://docs.microsoft.com/en-us/microsoft-edge/webdriver-chromium/capabilities-edge-options#using-the-edgeoptions-class) க்கு
- `sauce:options`: [Sauce Labs](https://docs.saucelabs.com/dev/test-configuration-options/#desktop-and-mobile-capabilities-sauce-specific--optional) க்கு
- `bstack:options`: [BrowserStack](https://www.browserstack.com/automate/capabilities?tag=selenium-4#) க்கு
- `selenoid:options`: [Selenoid](https://github.com/aerokube/selenoid/blob/master/docs/special-capabilities.adoc) க்கு

கூடுதலாக, Sauce Labs [Automated Test Configurator](https://docs.saucelabs.com/basics/platform-configurator/) என்பது விரும்பிய திறன்களை கிளிக் செய்வதன் மூலம் இந்த பொருளை உருவாக்க உதவும் பயனுள்ள கருவியாகும்.

வகை: `Object`<br />
இயல்புநிலை: `null`

**உதாரணம்:**

```js
{
    browserName: 'chrome', // options: `chrome`, `edge`, `firefox`, `safari`
    browserVersion: '27.0', // browser version
    platformName: 'Windows 10' // OS platform
}
```

மொபைல் சாதனங்களில் வலை அல்லது நேட்டிவ் சோதனைகளை இயக்கினால், `capabilities` WebDriver புரோட்டாகாலில் இருந்து வேறுபடுகிறது. மேலும் விவரங்களுக்கு [Appium Docs](https://appium.io/docs/en/latest/guides/caps/) ஐப் பார்க்கவும்.

### logLevel

பதிவு செய்வதின் அளவு.

வகை: `String`<br />
இயல்புநிலை: `info`<br />
விருப்பங்கள்: `trace` | `debug` | `info` | `warn` | `error` | `silent`

### outputDir

எல்லா டெஸ்ட்ரன்னர் பதிவு கோப்புகளையும் (அறிக்கையாளர் பதிவுகள் மற்றும் `wdio` பதிவுகள் உட்பட) சேமிக்க அடைவு. அமைக்கப்படவில்லை என்றால், அனைத்து பதிவுகளும் `stdout`க்கு அனுப்பப்படும். பெரும்பாலான அறிக்கையாளர்கள் `stdout`க்கு பதிவு செய்ய உருவாக்கப்பட்டுள்ளதால், அறிக்கையை கோப்புக்கு அனுப்புவது அதிக அர்த்தமுள்ளதாக இருக்கும் குறிப்பிட்ட அறிக்கையாளர்களுக்கு மட்டுமே இந்த விருப்பத்தைப் பயன்படுத்த பரிந்துரைக்கப்படுகிறது (எடுத்துக்காட்டாக `junit` அறிக்கையாளர்).

தனித்து இயங்கும் பயன்முறையில் இயக்கும்போது, WebdriverIO உருவாக்கும் ஒரே பதிவு `wdio` பதிவு மட்டுமே.

வகை: `String`<br />
இயல்புநிலை: `null`

### connectionRetryTimeout

இயக்கி அல்லது கிரிட்டுக்கான எந்த WebDriver கோரிக்கையின் நேரம் முடிதல்.

வகை: `Number`<br />
இயல்புநிலை: `120000`

### connectionRetryCount

செலினியம் சேவையகத்திற்கான கோரிக்கை மறுமுயற்சிகளின் அதிகபட்ச எண்ணிக்கை.

வகை: `Number`<br />
இயல்புநிலை: `3`

### agent

கோரிக்கைகளை செய்ய தனிப்பயன் `http`/`https`/`http2` [agent](https://www.npmjs.com/package/got#agent) ஐப் பயன்படுத்த அனுமதிக்கிறது.

வகை: `Object`<br />
இயல்புநிலை:

```js
{
    http: new http.Agent({ keepAlive: true }),
    https: new https.Agent({ keepAlive: true })
}
```

### headers

ஒவ்வொரு WebDriver கோரிக்கைக்கும் அனுப்ப தனிப்பயன் `headers` ஐக் குறிப்பிடவும். உங்கள் செலினியம் கிரிட் அடிப்படை அங்கீகாரம் தேவைப்பட்டால், உங்கள் WebDriver கோரிக்கைகளை அங்கீகரிக்க இந்த விருப்பத்தின் மூலம் ஒரு `Authorization` தலைப்பை அனுப்ப பரிந்துரைக்கிறோம், எ.கா:

```ts wdio.conf.ts
import { Buffer } from 'buffer';
// Read the username and password from environment variables
const username = process.env.SELENIUM_GRID_USERNAME;
const password = process.env.SELENIUM_GRID_PASSWORD;

// Combine the username and password with a colon separator
const credentials = `${username}:${password}`;
// Encode the credentials using Base64
const encodedCredentials = Buffer.from(credentials).toString('base64');

export const config: WebdriverIO.Config = {
    // ...
    headers: {
        Authorization: `Basic ${encodedCredentials}`
    }
    // ...
}
```

வகை: `Object`<br />
இயல்புநிலை: `{}`

### transformRequest

WebDriver கோரிக்கை செய்யப்படுவதற்கு முன் [HTTP request options](https://github.com/sindresorhus/got#options) ஐ தடுக்கும் செயல்பாடு

வகை: `(RequestOptions) => RequestOptions`<br />
இயல்புநிலை: *ஏதுமில்லை*

### transformResponse

WebDriver பதில் வந்த பிறகு HTTP பதில் பொருள்களை தடுக்கும் செயல்பாடு. முதல் அளவுருவாக அசல் பதில் பொருள் மற்றும் இரண்டாவது அளவுருவாக தொடர்புடைய `RequestOptions` செயல்பாட்டிற்கு அனுப்பப்படுகிறது.

வகை: `(Response, RequestOptions) => Response`<br />
இயல்புநிலை: *ஏதுமில்லை*

### strictSSL

SSL சான்றிதழ் செல்லுபடியாகும் என்பதை தேவைப்படுத்துகிறதா இல்லையா.
இதை `STRICT_SSL` அல்லது `strict_ssl` என்ற சூழல் மாறிகள் மூலமாக அமைக்கலாம்.

வகை: `Boolean`<br />
இயல்புநிலை: `true`

### enableDirectConnect

[Appium நேரடி இணைப்பு அம்சம்](https://appiumpro.com/editions/86-connecting-directly-to-appium-hosts-in-distributed-environments) ஐ இயக்கவா.
கொடி இயக்கப்பட்டிருக்கும்போது பதிலில் சரியான விசைகள் இல்லாவிட்டால் இது எதையும் செய்யாது.

வகை: `Boolean`<br />
இயல்புநிலை: `true`

### cacheDir

கேஷ் அடைவின் ரூட் பாதை. அமர்வைத் தொடங்க முயற்சிக்கும்போது பதிவிறக்கப்படும் அனைத்து இயக்கிகளையும் சேமிக்க இந்த அடைவு பயன்படுத்தப்படுகிறது.

வகை: `String`<br />
இயல்புநிலை: `process.env.WEBDRIVER_CACHE_DIR || os.tmpdir()`

### maskingPatterns

மேலும் பாதுகாப்பான பதிவுக்கு, `maskingPatterns` உடன் அமைக்கப்பட்ட வழக்கமான வெளிப்பாடுகள் பதிவிலிருந்து உணர்திறன் தகவலை மறைக்க முடியும்.
 - சரம் வடிவம் கொடிகளுடன் அல்லது இல்லாமல் ஒரு வழக்கமான வெளிப்பாடாகும் (எ.கா. `/.../i`) மற்றும் பல வழக்கமான வெளிப்பாடுகளுக்கு காற்புள்ளியால் பிரிக்கப்பட்டுள்ளது.
 - மறைக்கும் பேட்டர்ன்கள் பற்றிய மேலும் விவரங்களுக்கு, [WDIO Logger README-ல் உள்ள Masking Patterns பிரிவைப்](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-logger/README.md#masking-patterns) பார்க்கவும்.

வகை: `String`<br />
இயல்புநிலை: `undefined`

**உதாரணம்:**

```js
{
    maskingPatterns: '/--key=([^ ]*)/i,/RESULT (.*)/'
}
```

---

## WebdriverIO

பின்வரும் விருப்பங்களை (மேலே பட்டியலிடப்பட்டவற்றுடன் சேர்த்து) WebdriverIO-வை தனித்து இயக்கப் பயன்படுத்தலாம்:

### automationProtocol

உங்கள் உலாவி தானியங்குமயமாக்கலுக்கு நீங்கள் பயன்படுத்த விரும்பும் புரோட்டாகாலை வரையறுக்கவும். தற்போது [`webdriver`](https://www.npmjs.com/package/webdriver) மட்டுமே ஆதரிக்கப்படுகிறது, ஏனெனில் இது WebdriverIO பயன்படுத்தும் முக்கிய உலாவி தானியங்குமயமாக்கல் தொழில்நுட்பமாகும்.

வேறு ஒரு தானியங்கு தொழில்நுட்பத்தைப் பயன்படுத்தி உலாவியை தானியக்கமாக்க விரும்பினால், இந்த பண்பு பின்வரும் இடைமுகத்தை ஒட்டிய தொகுதியைத் தீர்க்கும் பாதைக்கு அமைக்கப்படுவதை உறுதி செய்யவும்:

```ts
import type { Capabilities } from '@wdio/types';
import type { Client, AttachOptions } from 'webdriver';

export default class YourAutomationLibrary {
    /**
     * Start a automation session and return a WebdriverIO [monad](https://github.com/webdriverio/webdriverio/blob/940cd30939864bdbdacb2e94ee6e8ada9b1cc74c/packages/wdio-utils/src/monad.ts)
     * with respective automation commands. See the [webdriver](https://www.npmjs.com/package/webdriver) package
     * as a reference implementation
     *
     * @param {Capabilities.RemoteConfig} options WebdriverIO options
     * @param {Function} hook that allows to modify the client before it gets released from the function
     * @param {PropertyDescriptorMap} userPrototype allows user to add custom protocol commands
     * @param {Function} customCommandWrapper allows to modify the command execution
     * @returns a WebdriverIO compatible client instance
     */
    static newSession(
        options: Capabilities.RemoteConfig,
        modifier?: (...args: any[]) => any,
        userPrototype?: PropertyDescriptorMap,
        customCommandWrapper?: (...args: any[]) => any
    ): Promise<Client>;

    /**
     * allows user to attach to existing sessions
     * @optional
     */
    static attachToSession(
        options?: AttachOptions,
        modifier?: (...args: any[]) => any, userPrototype?: {},
        commandWrapper?: (...args: any[]) => any
    ): Client;

    /**
     * Changes The instance session id and browser capabilities for the new session
     * directly into the passed in browser object
     *
     * @optional
     * @param   {object} instance  the object we get from a new browser session.
     * @returns {string}           the new session id of the browser
     */
    static reloadSession(
        instance: Client,
        newCapabilities?: WebdriverIO.Capabilitie
    ): Promise<string>;
}
```

வகை: `String`<br />
இயல்புநிலை: `webdriver`

### baseUrl

ஒரு அடிப்படை URL ஐ அமைப்பதன் மூலம் `url` கட்டளை அழைப்புகளைக் குறைக்கவும்.
- உங்கள் `url` அளவுரு `/` உடன் தொடங்கினால், `baseUrl` முன்னொட்டாக சேர்க்கப்படும் (baseUrl பாதை இருந்தால் அதைத் தவிர).
- உங்கள் `url` அளவுரு திட்டம் அல்லது `/` இல்லாமல் தொடங்கினால் (எ.கா. `some/path`), முழு `baseUrl` நேரடியாக முன்னொட்டாக சேர்க்கப்படும்.

வகை: `String`<br />
இயல்புநிலை: `null`

### waitforTimeout

எல்லா `waitFor*` கட்டளைகளுக்கும் இயல்புநிலை காலாவதி. (விருப்ப பெயரில் சிறிய `f` குறிப்பிடப்பட்டுள்ளதைக் கவனிக்கவும்.) இந்த காலாவதி `waitFor*` என தொடங்கும் கட்டளைகளை மட்டுமே பாதிக்கும் மற்றும் அவற்றின் இயல்புநிலை காத்திருப்பு நேரம்.

ஒரு _சோதனை_ க்கான காலாவதியை அதிகரிக்க, கட்டமைப்பு ஆவணங்களைப் பார்க்கவும்.

வகை: `Number`<br />
இயல்புநிலை: `5000`

### waitforInterval

எதிர்பார்க்கப்படும் நிலை (எ.கா., தெரிவு) மாற்றப்பட்டுள்ளதா என்பதைச் சரிபார்க்க எல்லா `waitFor*` கட்டளைகளுக்கும் இயல்புநிலை இடைவெளி.

வகை: `Number`<br />
இயல்புநிலை: `100`

### region

Sauce Labs இல் இயக்கும்போது, தரவு மையங்களுக்கு இடையே சோதனைகளை இயக்க தேர்வு செய்யலாம்: US அல்லது EU.
உங்கள் பிராந்தியத்தை EU க்கு மாற்ற, உங்கள் கட்டமைப்பில் `region: 'eu'` சேர்க்கவும்.

__குறிப்பு:__ உங்கள் Sauce Labs கணக்குடன் இணைக்கப்பட்ட `user` மற்றும் `key` விருப்பங்களை வழங்கினால் மட்டுமே இது பயனுள்ளதாக இருக்கும்.

வகை: `String`<br />
இயல்புநிலை: `us`

*(vm மற்றும் அல்லது em/simulators க்கு மட்டும்)*

---

## Testrunner விருப்பங்கள்

பின்வரும் விருப்பங்கள் (மேலே பட்டியலிடப்பட்டவற்றுடன் சேர்த்து) WDIO டெஸ்ட்ரன்னருடன் WebdriverIO இயக்குவதற்கு மட்டுமே வரையறுக்கப்பட்டுள்ளன:

### specs

சோதனை நிறைவேற்றத்திற்கான சிறப்புத்தன்மைகளை வரையறுக்கவும். ஒரே நேரத்தில் பல கோப்புகளைப் பொருத்த ஒரு glob பேட்டர்னைக் குறிப்பிடலாம் அல்லது ஒரு தனி வேலைநிரல் செயல்முறையில் இயக்க ஒரு glob அல்லது பாதைகளின் தொகுப்பை ஒரு அரேயில் சுற்றலாம். அனைத்து பாதைகளும் கட்டமைப்பு கோப்பு பாதையிலிருந்து தொடர்புடையதாகக் காணப்படுகின்றன.

வகை: `(String | String[])[]`<br />
இயல்புநிலை: `[]`

### exclude

சோதனை நிறைவேற்றத்திலிருந்து சிறப்புத்தன்மைகளை விலக்கவும். அனைத்து பாதைகளும் கட்டமைப்பு கோப்பு பாதையிலிருந்து தொடர்புடையதாகக் காணப்படுகின்றன.

வகை: `String[]`<br />
இயல்புநிலை: `[]`

### suites

`wdio` CLI இல் `--suite` விருப்பத்துடன் குறிப்பிடக்கூடிய பல்வேறு சூட்டுகளை விவரிக்கும் ஒரு பொருள்.

வகை: `Object`<br />
இயல்புநிலை: `{}`

### capabilities

மேலே விவரிக்கப்பட்ட `capabilities` பிரிவுக்கு ஒத்ததாக, [`multiremote`](/docs/multiremote) பொருளை அல்லது இணை நிறைவேற்றத்திற்கு ஒரு அரேயில் பல WebDriver அமர்வுகளைக் குறிப்பிடும் விருப்பத்துடன்.

[மேலே](/docs/configuration#capabilities) வரையறுக்கப்பட்டுள்ள அதே விற்பனையாளர் மற்றும் உலாவி குறிப்பிட்ட திறன்களைப் பயன்படுத்தலாம்.

வகை: `Object`|`Object[]`<br />
இயல்புநிலை: `[{ 'wdio:maxInstances': 5, browserName: 'firefox' }]`

### maxInstances

மொத்த இணையான இயங்கும் பணியாளர்களின் அதிகபட்ச எண்ணிக்கை.

__குறிப்பு:__ சோதனைகள் Sauce Labs போன்ற சில வெளிப்புற விற்பனையாளர்களின் இயந்திரங்களில் செய்யப்படும்போது, இது `100` போன்ற அதிக எண்ணிக்கையாக இருக்கலாம். அங்கு, சோதனைகள் ஒரு தனி இயந்திரத்தில் சோதிக்கப்படவில்லை, மாறாக பல VM களில் சோதிக்கப்படுகின்றன. சோதனைகள் உள்ளூர் மேம்பாட்டு இயந்திரத்தில் இயக்கப்பட வேண்டும் என்றால், `3`, `4`, அல்லது `5` போன்ற அதிக நியாயமான எண்ணைப் பயன்படுத்தவும். அடிப்படையில், இது ஒரே நேரத்தில் தொடங்கப்பட்டு உங்கள் சோதனைகளை இயக்கும் உலாவிகளின் எண்ணிக்கையாகும், எனவே உங்கள் இயந்திரத்தில் எவ்வளவு RAM உள்ளது, மற்றும் உங்கள் இயந்திரத்தில் இயங்கும் மற்ற பயன்பாடுகள் எவ்வளவு உள்ளன என்பதைப் பொறுத்தது.

`wdio:maxInstances` திறனைப் பயன்படுத்தி உங்கள் திறன் பொருள்களுக்குள் `maxInstances` ஐப் பயன்படுத்தலாம். இது அந்த குறிப்பிட்ட திறனுக்கான இணை அமர்வுகளின் அளவை வரம்பிடும்.

வகை: `Number`<br />
இயல்புநிலை: `100`

### maxInstancesPerCapability

ஒரு திறனுக்கு அதிகபட்ச இணையான இயங்கும் பணியாளர்களின் எண்ணிக்கை.

வகை: `Number`<br />
இயல்புநிலை: `100`

### injectGlobals

WebdriverIO-வின் உலகளாவியவற்றை (எ.கா. `browser`, `$` மற்றும் `$$`) உலகளாவிய சூழலில் செருகுகிறது.
நீங்கள் `false` என அமைத்தால், நீங்கள் `@wdio/globals` இலிருந்து இறக்குமதி செய்ய வேண்டும், எ.கா:

```ts
import { browser, $, $$, expect } from '@wdio/globals'
```

குறிப்பு: WebdriverIO சோதனை கட்டமைப்பு குறிப்பிட்ட உலகளாவியவற்றின் செருகலை கையாளவில்லை.

வகை: `Boolean`<br />
இயல்புநிலை: `true`

### bail

ஒரு குறிப்பிட்ட எண்ணிக்கையிலான சோதனை தோல்விகளுக்குப் பிறகு உங்கள் சோதனை ஓட்டத்தை நிறுத்த விரும்பினால், `bail` ஐப் பயன்படுத்தவும்.
(இது இயல்பாக `0`-ஐ, அதாவது எல்லா சோதனைகளையும் இயக்கும்.) **குறிப்பு:** இந்த சூழலில் ஒரு சோதனை என்பது ஒற்றை spec கோப்புக்குள் உள்ள அனைத்து சோதனைகளும் (Mocha அல்லது Jasmine ஐப் பயன்படுத்தும்போது) அல்லது ஒரு அம்ச கோப்பில் உள்ள அனைத்து படிகளும் (Cucumber ஐப் பயன்படுத்தும்போது). ஒற்றை சோதனை கோப்பின் சோதனைகளில் bail நடத்தையை கட்டுப்படுத்த விரும்பினால், கிடைக்கக்கூடிய [framework](frameworks) விருப்பங்களைப் பார்க்கவும்.

வகை: `Number`<br />
இயல்புநிலை: `0` (bail செய்யாதீர்கள்; எல்லா சோதனைகளையும் இயக்கவும்)

### specFileRetries

ஒட்டுமொத்தமாக தோல்வியடையும்போது முழு specfile-ஐ மீண்டும் முயற்சி செய்ய வேண்டிய முறைகளின் எண்ணிக்கை.

வகை: `Number`<br />
இயல்புநிலை: `0`

### specFileRetriesDelay

spec கோப்பு மறுமுயற்சிக்கும் இடையிலான தாமதம் (வினாடிகளில்)

வகை: `Number`<br />
இயல்புநிலை: `0`

### specFileRetriesDeferred

மறுமுயற்சி செய்யப்பட்ட spec கோப்புகள் உடனடியாக மறுமுயற்சி செய்யப்பட வேண்டுமா அல்லது வரிசையின் இறுதிக்கு ஒத்திவைக்கப்பட வேண்டுமா.

வகை: `Boolean`<br />
இயல்புநிலை: `true`

### groupLogsByTestSpec

பதிவு வெளியீட்டு காட்சியைத் தேர்ந்தெடுக்கவும்.

`false` என அமைக்கப்பட்டால், வெவ்வேறு சோதனை கோப்புகளிலிருந்து வரும் பதிவுகள் உண்மையான நேரத்தில் அச்சிடப்படும். இணையாக இயக்கும்போது வெவ்வேறு கோப்புகளிலிருந்து வரும் பதிவு வெளியீடுகள் கலக்கலாம் என்பதை கவனத்தில் கொள்ளவும்.

`true` என அமைக்கப்பட்டால், பதிவு வெளியீடுகள் சோதனை ஸ்பெக் மூலம் குழுப்படுத்தப்பட்டு சோதனை ஸ்பெக் முடிந்தவுடன் மட்டுமே அச்சிடப்படும்.

இயல்பாக, இது `false` என அமைக்கப்பட்டுள்ளது, அதனால் பதிவுகள் உண்மையான நேரத்தில் அச்சிடப்படுகின்றன.

வகை: `Boolean`<br />
இயல்புநிலை: `false`

### autoAssertOnTestEnd

WebdriverIO ஒவ்வொரு சோதனையின் இறுதியிலும் தானாகவே எல்லா மென்மையான உறுதிப்படுத்தல்களையும் சரிபார்க்கிறதா என்பதைக் கட்டுப்படுத்துகிறது. `true` என அமைக்கப்பட்டால், எந்தவொரு உறுதிப்படுத்தல்கள் தோல்வியடைந்தால், சேர்க்கப்பட்ட மென்மையான உறுதிப்படுத்தல்கள் தானாகவே சரிபார்க்கப்பட்டு சோதனை தோல்வியடையும். `false` என அமைக்கப்பட்டால், மென்மையான உறுதிப்படுத்தல்களைச் சரிபார்க்க நீங்கள் கைமுறையாக assert முறையை அழைக்க வேண்டும்.

வகை: `Boolean`<br />
இயல்புநிலை: `true`

### services

சேவைகள் நீங்கள் கவனிக்க விரும்பாத ஒரு குறிப்பிட்ட வேலையை எடுத்துக்கொள்கின்றன. அவை கிட்டத்தட்ட எந்த முயற்சியுமின்றி உங்கள் சோதனை அமைப்பை மேம்படுத்துகின்றன.

வகை: `String[]|Object[]`<br />
இயல்புநிலை: `[]`

### framework

WDIO டெஸ்ட்ரன்னரால் பயன்படுத்தப்பட வேண்டிய சோதனை கட்டமைப்பை வரையறுக்கிறது.

வகை: `String`<br />
இயல்புநிலை: `mocha`<br />
விருப்பங்கள்: `mocha` | `jasmine`

### mochaOpts, jasmineOpts and cucumberOpts

குறிப்பிட்ட கட்டமைப்பு தொடர்பான விருப்பங்கள். எந்த விருப்பங்கள் உள்ளன என்பதற்கு கட்டமைப்பு அடாப்டர் ஆவணத்தைப் பார்க்கவும். இதைப் பற்றி மேலும் படிக்க [Frameworks](frameworks).

வகை: `Object`<br />
இயல்புநிலை: `{ timeout: 10000 }`

### cucumberFeaturesWithLineNumbers

வரி எண்களுடன் கூடிய குக்கம்பர் அம்சங்களின் பட்டியல் ([cucumber framework ஐப் பயன்படுத்தும்போது](./Frameworks.md#using-cucumber)).

வகை: `String[]`
இயல்புநிலை: `[]`

### reporters

பயன்படுத்த வேண்டிய அறிக்கையாளர்களின் பட்டியல். ஒரு அறிக்கையாளர் ஒரு சரமாகவோ அல்லது
`['reporterName', { /* reporter options */}]` இன் அரேயாகவோ இருக்கலாம், இதில் முதல் கூறு அறிக்கையாளர் பெயருடன் ஒரு சரம் மற்றும் இரண்டாவது கூறு அறிக்கையாளர் விருப்பங்கள் கொண்ட ஒரு பொருள்.

வகை: `String[]|Object[]`<br />
இயல்புநிலை: `[]`

உதாரணம்:

```js
reporters: [
    'dot',
    'spec'
    ['junit', {
        outputDir: `${__dirname}/reports`,
        otherOption: 'foobar'
    }]
]
```

### reporterSyncInterval

அறிக்கையாளர்கள் தங்கள் பதிவுகளை ஒத்திசைக்கப்பட்டுள்ளனவா என்பதை அவர்கள் ஒத்திசைவற்ற முறையில் அறிக்கை செய்தால் சரிபார்க்க வேண்டிய இடைவெளியைத் தீர்மானிக்கிறது (எ.கா. பதிவுகள் 3 ஆம் தரப்பு விற்பனையாளருக்கு ஸ்ட்ரீம் செய்யப்பட்டால்).

வகை: `Number`<br />
இயல்புநிலை: `100` (ms)

### reporterSyncTimeout

அறிக்கையாளர்கள் டெஸ்ட்ரன்னரால் பிழை ஏற்படும் வரை அவர்களின் அனைத்து பதிவுகளையும் பதிவேற்ற முடிக்க வேண்டிய அதிகபட்ச நேரத்தைத் தீர்மானிக்கிறது.

வகை: `Number`<br />
இயல்புநிலை: `5000` (ms)

### execArgv

சைல்டு புரோசஸ்களைத் துவக்கும்போது குறிப்பிட வேண்டிய Node arguments.

வகை: `String[]`<br />
இயல்புநிலை: `null`

### filesToWatch

டெஸ்ட்ரன்னர் `--watch` கொடியுடன் இயக்கும்போது, கூடுதலாக மற்ற கோப்புகளையும் கவனிக்க சொல்லும் glob ஆதரிக்கும் சர பேட்டர்ன்களின் பட்டியல், எ.கா. பயன்பாட்டு கோப்புகள். இயல்பாக டெஸ்ட்ரன்னர் ஏற்கனவே எல்லா spec கோப்புகளையும் கவனிக்கிறது.

வகை: `String[]`<br />
இயல்புநிலை: `[]`

### updateSnapshots

உங்கள் ஸ்னாப்ஷாட்களை புதுப்பிக்க விரும்பினால் true என அமைக்கவும். ஒரு CLI அளவுருவின் ஒரு பகுதியாக, எ.கா. `wdio run wdio.conf.js --s`

வகை: `'new' | 'all' | 'none'`<br />
இயல்புநிலை: வழங்கப்படவில்லை மற்றும் சோதனைகள் CI-ல் இயங்கினால் `none`, வழங்கப்படவில்லை என்றால் `new`, இல்லையெனில் வழங்கப்பட்டது

### resolveSnapshotPath

இயல்புநிலை ஸ்னாப்ஷாட் பாதையை மேலெழுதுகிறது. உதாரணமாக, சோதனை கோப்புகளுக்கு அடுத்து ஸ்னாப்ஷாட்களைச் சேமிக்க.

```ts title="wdio.conf.ts"
export const config: WebdriverIO.Config = {
    resolveSnapshotPath: (testPath, snapExtension) => testPath + snapExtension,
}
```

வகை: `(testPath: string, snapExtension: string) => string`<br />
இயல்புநிலை: சோதனை கோப்புக்கு அடுத்து `__snapshots__` அடைவில் ஸ்னாப்ஷாட் கோப்புகளைச் சேமிக்கிறது

### tsConfigPath

WDIO, TypeScript கோப்புகளை தொகுக்க `tsx` ஐப் பயன்படுத்துகிறது. உங்கள் TSConfig தற்போதைய வேலை அடைவிலிருந்து தானாகவே கண்டறியப்படுகிறது, ஆனால் நீங்கள் இங்கு ஒரு தனிப்பயன் பாதையைக் குறிப்பிடலாம் அல்லது TSX_TSCONFIG_PATH சூழல் மாறியை அமைக்கலாம்.

`tsx` ஆவணங்களைப் பார்க்கவும்: https://tsx.is/dev-api/node-cli#custom-tsconfig-json-path

வகை: `String`<br />
இயல்புநிலை: `null`<br />

## Hooks

WDIO டெஸ்ட்ரன்னர் சோதனை வாழ்க்கைச் சுழற்சியின் குறிப்பிட்ட நேரங்களில் தூண்டப்படும் hooks அமைக்க அனுமதிக்கிறது. இது தனிப்பயன் செயல்களை அனுமதிக்கிறது (எ.கா. சோதனை தோல்வியடைந்தால் ஸ்கிரீன்ஷாட் எடுக்கவும்).

ஒவ்வொரு hook க்கும் வாழ்க்கைச் சுழற்சி பற்றிய குறிப்பிட்ட தகவல்கள் அளவுருவாக உள்ளது (எ.கா. சோதனை சூட்டு அல்லது சோதனை பற்றிய தகவல்). அனைத்து hook பண்புகளைப் பற்றிய மேலும் தகவல்களுக்கு [எங்கள் உதாரண கட்டமைப்பில்](https://github.com/webdriverio/webdriverio/blob/master/examples/wdio.conf.js#L183-L326) படிக்கவும்.

**குறிப்பு:** சில hooks (`onPrepare`, `onWorkerStart`, `onWorkerEnd` மற்றும் `onComplete`) ஒரு வேறுபட்ட செயல்முறையில் செயல்படுத்தப்படுகின்றன, எனவே வேலைநிரல் செயல்முறையில் வாழும் மற்ற hooks உடன் எந்த உலகளாவிய தரவையும் பகிர முடியாது.

### onPrepare

அனைத்து தொழிலாளர்களும் துவங்குவதற்கு முன்பு ஒரு முறை செயல்படுத்தப்படுகிறது.

அளவுருக்கள்:

- `config` (`object`): WebdriverIO கட்டமைப்பு பொருள்
- `param` (`object[]`): திறன்கள் விவரங்களின் பட்டியல்

### onWorkerStart

ஒரு பணியாளர் செயல்முறை உருவாக்கப்படுவதற்கு முன் செயல்படுத்தப்படுகிறது மற்றும் அந்த வேலைநிரலுக்கான குறிப்பிட்ட சேவையை துவக்க பயன்படுத்தலாம் மற்றும் ஒத்திசைவற்ற முறையில் ரன்டைம் சூழல்களை மாற்றலாம்.

அளவுருக்கள்:

- `cid` (`string`): திறன் ஐடி (எ.கா 0-0)
- `caps` (`object`): தொழிலாளியில் உருவாக்கப்படும் அமர்வுக்கான திறன்கள் கொண்டது
- `specs` (`string[]`): தொழிலாளி செயல்முறையில் இயக்க வேண்டிய specs
- `args` (`object`): தொழிலாளி துவக்கப்பட்டவுடன் முக்கிய கட்டமைப்புடன் இணைக்கப்படும் பொருள்
- `execArgv` (`string[]`): தொழிலாளி செயல்முறைக்கு அனுப்பப்படும் சர அளவுருக்களின் பட்டியல்

### onWorkerEnd

ஒரு தொழிலாளி செயல்முறை வெளியேறிய பிறகே செயல்படுத்தப்படுகிறது.

அளவுருக்கள்:

- `cid` (`string`): திறன் ஐடி (எ.கா 0-0)
- `exitCode` (`number`): 0 - வெற்றி, 1 - தோல்வி
- `specs` (`string[]`): தொழிலாளி செயல்முறையில் இயக்க வேண்டிய specs
- `retries` (`number`): [_"Add retries on a per-specfile basis"_](./Retry.md#add-retries-on-a-per-specfile-basis) இல் வரையறுக்கப்பட்டுள்ளபடி பயன்படுத்தப்படும் spec நிலை மறுமுயற்சிகளின் எண்ணிக்கை

### beforeSession

WebDriver அமர்வு மற்றும் சோதனை கட்டமைப்பை துவக்குவதற்கு முன்பாகவே செயல்படுத்தப்படுகிறது. இது திறன் அல்லது ஸ்பெக்கைப் பொறுத்து கட்டமைப்புகளை கையாள அனுமதிக்கிறது.

அளவுருக்கள்:

- `config` (`object`): WebdriverIO கட்டமைப்பு பொருள்
- `caps` (`object`): தொழிலாளியில் உருவாக்கப்படும் அமர்வுக்கான திறன்கள் கொண்டது
- `specs` (`string[]`): தொழிலாளி செயல்முறையில் இயக்க வேண்டிய specs

### before

சோதனை நிறைவேற்றம் தொடங்குவதற்கு முன் செயல்படுத்தப்படுகிறது. இந்த புள்ளியில் நீங்கள் `browser` போன்ற அனைத்து உலகளாவிய மாறிகளையும் அணுகலாம். இது தனிப்பயன் கட்டளைகளை வரையறுக்க சரியான இடம்.

அளவுருக்கள்:

- `caps` (`object`): தொழிலாளியில் உருவாக்கப்படும் அமர்வுக்கான திறன்கள் கொண்டது
- `specs` (`string[]`): தொழிலாளி செயல்முறையில் இயக்க வேண்டிய specs
- `browser` (`object`): உருவாக்கப்பட்ட உலாவி/சாதன அமர்வு உருப்படி

### beforeSuite

சூட் தொடங்குவதற்கு முன் செயல்படுத்தப்படும் ஹூக் (Mocha/Jasmine இல் மட்டும்)

அளவுருக்கள்:

- `suite` (`object`): சூட் விவரங்கள்

### beforeHook

சூட்டுக்குள் ஒரு ஹூக் தொடங்குவதற்கு *முன்* செயல்படுத்தப்படும் ஹூக் (எ.கா. Mocha-வில் beforeEach அழைப்பதற்கு முன் இயங்குகிறது)

அளவுருக்கள்:

- `test` (`object`): சோதனை விவரங்கள்
- `context` (`object`): சோதனை சூழல் (Cucumber இல் World பொருளை குறிக்கிறது)

### afterHook

சூட்டுக்குள் ஒரு ஹூக் முடிவடைந்த *பின்* செயல்படுத்தப்படும் ஹூக் (எ.கா. Mocha-வில் afterEach அழைப்பதற்குப் பிறகு இயங்குகிறது)

அளவுருக்கள்:

- `test` (`object`): சோதனை விவரங்கள்
- `context` (`object`): சோதனை சூழல் (Cucumber இல் World பொருளை குறிக்கிறது)
- `result` (`object`): ஹூக் முடிவு (`error`, `result`, `duration`, `passed`, `retries` பண்புகளைக் கொண்டது)

### beforeTest

ஒரு சோதனைக்கு முன் செயல்படுத்த வேண்டிய செயல்பாடு (Mocha/Jasmine இல் மட்டும்).

அளவுருக்கள்:

- `test` (`object`): சோதனை விவரங்கள்
- `context` (`object`): சோதனை செயல்படுத்தப்பட்ட வரம்பு பொருள்

### beforeCommand

ஒரு WebdriverIO கட்டளை செயல்படுத்தப்படுவதற்கு முன் இயங்குகிறது.

அளவுருக்கள்:

- `commandName` (`string`): கட்டளை பெயர்
- `args` (`*`): கட்டளை பெறும் அளவுருக்கள்

### afterCommand

ஒரு WebdriverIO கட்டளை செயல்படுத்தப்பட்ட பிறகு இயங்குகிறது.

அளவுருக்கள்:

- `commandName` (`string`): கட்டளை பெயர்
- `args` (`*`): கட்டளை பெறும் அளவுருக்கள்
- `result` (`*`): கட்டளையின் முடிவு
- `error` (`Error`): ஏதேனும் பிழை பொருள்

### afterTest

ஒரு சோதனை (Mocha/Jasmine-ல்) முடிந்த பிறகு செயல்படுத்த வேண்டிய செயல்பாடு.

அளவுருக்கள்:

- `test` (`object`): சோதனை விவரங்கள்
- `context` (`object`): சோதனை செயல்படுத்தப்பட்ட வரம்பு பொருள்
- `result.error` (`Error`): சோதனை தோல்வியடைந்தால் பிழை பொருள், இல்லையெனில் `undefined`
- `result.result` (`Any`): சோதனை செயல்பாட்டின் return பொருள்
- `result.duration` (`Number`): சோதனையின் கால அளவு
- `result.passed` (`Boolean`): சோதனை வெற்றி பெற்றால் true, இல்லையெனில் false
- `result.retries` (`Object`): [Mocha மற்றும் Jasmine](./Retry.md#rerun-single-tests-in-jasmine-or-mocha) க்கு வரையறுக்கப்பட்டுள்ளபடி ஒற்றை சோதனை தொடர்பான மறுமுயற்சிகள் மற்றும் [Cucumber](./Retry.md#rerunning-in-cucumber) பற்றிய தகவல்கள், எ.கா. `{ attempts: 0, limit: 0 }`, பார்க்கவும்
- `result` (`object`): ஹூக் முடிவு (`error`, `result`, `duration`, `passed`, `retries` பண்புகளைக் கொண்டது)

### afterSuite

சூட் முடிந்த பிறகு செயல்படுத்தப்படும் ஹூக் (Mocha/Jasmine இல் மட்டும்)

அளவுருக்கள்:

- `suite` (`object`): சூட் விவரங்கள்

### after

அனைத்து சோதனைகளும் முடிந்த பிறகு செயல்படுத்தப்படுகிறது. உங்களிடம் இன்னும் சோதனையிலிருந்து அனைத்து உலகளாவிய மாறிகளுக்கும் அணுகல் உள்ளது.

அளவுருக்கள்:

- `result` (`number`): 0 - சோதனை வெற்றி, 1 - சோதனை தோல்வி
- `caps` (`object`): தொழிலாளியில் உருவாக்கப்படும் அமர்வுக்கான திறன்கள் கொண்டது
- `specs` (`string[]`): தொழிலாளி செயல்முறையில் இயக்க வேண்டிய specs

### afterSession

WebDriver அமர்வை முடித்த பிறகு செயல்படுத்தப்படுகிறது.

அளவுருக்கள்:

- `config` (`object`): WebdriverIO கட்டமைப்பு பொருள்
- `caps` (`object`): தொழிலாளியில் உருவாக்கப்படும் அமர்வுக்கான திறன்கள் கொண்டது
- `specs` (`string[]`): தொழிலாளி செயல்முறையில் இயக்க வேண்டிய specs

### onComplete

அனைத்து தொழிலாளர்களும் நிறுத்தப்பட்டு செயல்முறை வெளியேற உள்ளது. onComplete ஹூக்கில் ஒரு பிழை எறியப்பட்டால் சோதனை ஓட்டம் தோல்வியடையும்.

அளவுருக்கள்:

- `exitCode` (`number`): 0 - வெற்றி, 1 - தோல்வி
- `config` (`object`): WebdriverIO கட்டமைப்பு பொருள்
- `caps` (`object`): தொழிலாளியில் உருவாக்கப்படும் அமர்வுக்கான திறன்கள் கொண்டது
- `result` (`object`): சோதனை முடிவுகளைக் கொண்ட முடிவுகள் பொருள்

### onReload

புதுப்பிப்பு நடக்கும்போது செயல்படுத்தப்படுகிறது.

அளவுருக்கள்:

- `oldSessionId` (`string`): பழைய அமர்வின் அமர்வு ஐடி
- `newSessionId` (`string`): புதிய அமர்வின் அமர்வு ஐடி

### beforeFeature

ஒரு Cucumber அம்சத்திற்கு முன் இயங்குகிறது.

அளவுருக்கள்:

- `uri` (`string`): அம்ச கோப்பிற்கான பாதை
- `feature` ([`GherkinDocument.IFeature`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/json-to-messages/javascript/src/cucumber-generic/JSONSchema.ts#L8-L17)): Cucumber அம்ச பொருள்

### afterFeature

ஒரு Cucumber அம்சத்திற்குப் பிறகு இயங்குகிறது.

அளவுருக்கள்:

- `uri` (`string`): அம்ச கோப்பிற்கான பாதை
- `feature` ([`GherkinDocument.IFeature`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/json-to-messages/javascript/src/cucumber-generic/JSONSchema.ts#L8-L17)): Cucumber அம்ச பொருள்

### beforeScenario

ஒரு Cucumber காட்சிக்கு முன் இயங்குகிறது.

அளவுருக்கள்:

- `world` ([`ITestCaseHookParameter`](https://github.com/cucumber/cucumber-js/blob/ac124f7b2be5fa54d904c7feac077a2657b19440/src/support_code_library_builder/types.ts#L10-L15)): pickle மற்றும் சோதனை படி பற்றிய தகவல்களைக் கொண்ட உலக பொருள்
- `context` (`object`): Cucumber உலக பொருள்

### afterScenario

ஒரு Cucumber காட்சிக்குப் பிறகு இயங்குகிறது.

அளவுருக்கள்:

- `world` ([`ITestCaseHookParameter`](https://github.com/cucumber/cucumber-js/blob/ac124f7b2be5fa54d904c7feac077a2657b19440/src/support_code_library_builder/types.ts#L10-L15)): pickle மற்றும் சோதனை படி பற்றிய தகவல்களைக் கொண்ட உலக பொருள்
- `result` (`object`): காட்சி முடிவுகளைக் கொண்ட முடிவுகள் பொருள்
- `result.passed` (`boolean`): காட்சி வெற்றி பெற்றால் true
- `result.error` (`string`): காட்சி தோல்வியடைந்தால் பிழை ஸ்டேக்
- `result.duration` (`number`): மில்லி செகண்டுகளில் காட்சியின் கால அளவு
- `context` (`object`): Cucumber உலக பொருள்

### beforeStep

ஒரு Cucumber படிக்கு முன் இயங்குகிறது.

அளவுருக்கள்:

- `step` ([`Pickle.IPickleStep`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/messages/jsonschema/Pickle.json#L20-L49)): Cucumber படி பொருள்
- `scenario` ([`IPickle`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/messages/jsonschema/Pickle.json#L137-L175)): Cucumber காட்சி பொருள்
- `context` (`object`): Cucumber உலக பொருள்

### afterStep

ஒரு Cucumber படிக்குப் பிறகு இயங்குகிறது.

அளவுருக்கள்:

- `step` ([`Pickle.IPickleStep`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/messages/jsonschema/Pickle.json#L20-L49)): Cucumber படி பொருள்
- `scenario` ([`IPickle`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/messages/jsonschema/Pickle.json#L137-L175)): Cucumber காட்சி பொருள்
- `result`: (`object`): படி முடிவுகளைக் கொண்ட முடிவுகள் பொருள்
- `result.passed` (`boolean`): காட்சி வெற்றி பெற்றால் true
- `result.error` (`string`): காட்சி தோல்வியடைந்தால் பிழை ஸ்டேக்
- `result.duration` (`number`): மில்லி செகண்டுகளில் காட்சியின் கால அளவு
- `context` (`object`): Cucumber உலக பொருள்

### beforeAssertion

WebdriverIO உறுதிப்படுத்தல் நடப்பதற்கு முன் செயல்படுத்தப்படும் ஹூக்.

அளவுருக்கள்:

- `params`: உறுதிப்படுத்தல் தகவல்
- `params.matcherName` (`string`): matcher இன் பெயர் (எ.கா. `toHaveTitle`)
- `params.expectedValue`: matcher இல் அனுப்பப்படும் மதிப்பு
- `params.options`: உறுதிப்படுத்தல் விருப்பங்கள்

### afterAssertion

WebdriverIO உறுதிப்படுத்தல் நடந்த பிறகு செயல்படுத்தப்படும் ஹூக்.

அளவுருக்கள்:

- `params`: உறுதிப்படுத்தல் தகவல்
- `params.matcherName` (`string`): matcher இன் பெயர் (எ.கா. `toHaveTitle`)
- `params.expectedValue`: matcher இல் அனுப்பப்படும் மதிப்பு
- `params.options`: உறுதிப்படுத்தல் விருப்பங்கள்
- `params.result`: உறுதிப்படுத்தல் முடிவுகள்