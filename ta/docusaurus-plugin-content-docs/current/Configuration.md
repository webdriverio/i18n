---
id: configuration
title: கட்டமைப்பு
---

[அமைப்பு வகை](/docs/setuptypes) அடிப்படையில் (எ.கா. raw protocol bindings, WebdriverIO தனிப்பட்ட பொதி அல்லது WDIO சோதனை இயக்கி பயன்படுத்துதல்) சூழலை கட்டுப்படுத்த வெவ்வேறு விருப்பங்கள் உள்ளன.

## WebDriver விருப்பங்கள்

[`webdriver`](https://www.npmjs.com/package/webdriver) protocol பொதியைப் பயன்படுத்தும்போது பின்வரும் விருப்பங்கள் வரையறுக்கப்படுகின்றன:

### protocol

இயக்கி சர்வரிடம் தொடர்பு கொள்ளும் போது பயன்படுத்த வேண்டிய நெறிமுறை.

வகை: `String`<br />
இயல்புநிலை: `http`

### hostname

உங்கள் இயக்கி சர்வரின் ஹோஸ்ட்.

வகை: `String`<br />
இயல்புநிலை: `0.0.0.0`

### port

உங்கள் இயக்கி சர்வர் இருக்கும் போர்ட்.

வகை: `Number`<br />
இயல்புநிலை: `undefined`

### path

இயக்கி சர்வர் முடிவு புள்ளிக்கான பாதை.

வகை: `String`<br />
இயல்புநிலை: `/`

### queryParams

இயக்கி சர்வருக்கு அனுப்பப்படும் வினவல் அளவுருக்கள்.

வகை: `Object`<br />
இயல்புநிலை: `undefined`

### user

உங்கள் கிளவுட் சேவை பயனர் பெயர் (Sauce Labs, Browserstack, TestingBot அல்லது LambdaTest கணக்குகளுக்கு மட்டுமே செயல்படும்). அமைக்கப்பட்டால், WebdriverIO தானாகவே இணைப்பு விருப்பங்களை அமைக்கும். நீங்கள் கிளவுட் வழங்குநரைப் பயன்படுத்தவில்லை எனில், இது வேறு எந்த WebDriver பின்னணியையும் அங்கீகரிக்கப் பயன்படுத்தலாம்.

வகை: `String`<br />
இயல்புநிலை: `undefined`

### key

உங்கள் கிளவுட் சேவை அணுகல் விசை அல்லது ரகசிய விசை (Sauce Labs, Browserstack, TestingBot அல்லது LambdaTest கணக்குகளுக்கு மட்டுமே செயல்படும்). அமைக்கப்பட்டால், WebdriverIO தானாகவே இணைப்பு விருப்பங்களை அமைக்கும். நீங்கள் கிளவுட் வழங்குநரைப் பயன்படுத்தவில்லை எனில், இது வேறு எந்த WebDriver பின்னணியையும் அங்கீகரிக்கப் பயன்படுத்தலாம்.

வகை: `String`<br />
இயல்புநிலை: `undefined`

### capabilities

உங்கள் WebDriver அமர்வில் இயக்க விரும்பும் திறன்களை வரையறுக்கிறது. மேலும் விவரங்களுக்கு [WebDriver Protocol](https://w3c.github.io/webdriver/#capabilities) ஐப் பார்க்கவும். WebDriver நெறிமுறையை ஆதரிக்காத பழைய இயக்கியை இயக்கினால், அமர்வை வெற்றிகரமாக இயக்க [JSONWireProtocol capabilities](https://github.com/SeleniumHQ/selenium/wiki/DesiredCapabilities) ஐப் பயன்படுத்த வேண்டியிருக்கும்.

WebDriver அடிப்படையிலான திறன்களுக்கு அடுத்ததாக, தொலைநிலை உலாவி அல்லது சாதனத்தின் ஆழமான கட்டமைப்புக்கு அனுமதிக்கும் உலாவி மற்றும் விற்பனையாளர் குறிப்பிட்ட விருப்பங்களைப் பயன்படுத்தலாம். இவை தொடர்புடைய விற்பனையாளர் ஆவணங்களில் ஆவணப்படுத்தப்பட்டுள்ளன, எ.கா.:

- `goog:chromeOptions`: [Google Chrome](https://chromedriver.chromium.org/capabilities#h.p_ID_106)க்கு
- `moz:firefoxOptions`: [Mozilla Firefox](https://firefox-source-docs.mozilla.org/testing/geckodriver/Capabilities.html)க்கு
- `ms:edgeOptions`: [Microsoft Edge](https://docs.microsoft.com/en-us/microsoft-edge/webdriver-chromium/capabilities-edge-options#using-the-edgeoptions-class)க்கு
- `sauce:options`: [Sauce Labs](https://docs.saucelabs.com/dev/test-configuration-options/#desktop-and-mobile-capabilities-sauce-specific--optional)க்கு
- `bstack:options`: [BrowserStack](https://www.browserstack.com/automate/capabilities?tag=selenium-4#)க்கு
- `selenoid:options`: [Selenoid](https://github.com/aerokube/selenoid/blob/master/docs/special-capabilities.adoc)க்கு

கூடுதலாக, ஒரு பயனுள்ள கருவி Sauce Labs [Automated Test Configurator](https://docs.saucelabs.com/basics/platform-configurator/) ஆகும், இது உங்கள் விரும்பிய திறன்களை கிளிக் செய்வதன் மூலம் இந்த பொருளை உருவாக்க உதவுகிறது.

வகை: `Object`<br />
இயல்புநிலை: `null`

**உதாரணம்:**

```js
{
    browserName: 'chrome', // விருப்பங்கள்: `chrome`, `edge`, `firefox`, `safari`
    browserVersion: '27.0', // உலாவி பதிப்பு
    platformName: 'Windows 10' // OS தளம்
}
```

நீங்கள் மொபைல் சாதனங்களில் வலை அல்லது நேட்டிவ் சோதனைகளை இயக்கினால், `capabilities` WebDriver நெறிமுறையிலிருந்து வேறுபடுகிறது. மேலும் விவரங்களுக்கு [Appium Docs](https://appium.io/docs/en/latest/guides/caps/) ஐப் பார்க்கவும்.

### logLevel

பதிவு விரிவாக்கத்தின் அளவு.

வகை: `String`<br />
இயல்புநிலை: `info`<br />
விருப்பங்கள்: `trace` | `debug` | `info` | `warn` | `error` | `silent`

### outputDir

அனைத்து டெஸ்ட்ரன்னர் லாக் கோப்புகளையும் (அறிக்கையாளர் பதிவுகள் மற்றும் `wdio` பதிவுகள் உட்பட) சேமிக்க கோப்பகம். அமைக்கப்படவில்லை என்றால், அனைத்து பதிவுகளும் `stdout`க்கு ஸ்ட்ரீம் செய்யப்படும். பெரும்பாலான அறிக்கையாளர்கள் `stdout`க்கு பதிவு செய்யப்படுவதால், இந்த விருப்பத்தைக் குறிப்பிட்ட அறிக்கையாளர்களுக்கு மட்டுமே பயன்படுத்த பரிந்துரைக்கப்படுகிறது, அங்கு அறிக்கையை ஒரு கோப்பிற்கு தள்ளுவது அதிக அர்த்தமுள்ளதாக இருக்கும் (எடுத்துக்காட்டாக `junit` அறிக்கையாளர்).

தனித்து இயங்கும் முறையில் இயங்கும்போது, WebdriverIO உருவாக்கும் ஒரே பதிவு `wdio` பதிவாக இருக்கும்.

வகை: `String`<br />
இயல்புநிலை: `null`

### connectionRetryTimeout

ஓட்டுநர் அல்லது கட்டத்திற்கான எந்தவொரு WebDriver கோரிக்கைக்கும் நேரம் முடிந்தது.

வகை: `Number`<br />
இயல்புநிலை: `120000`

### connectionRetryCount

செலினியம் சர்வருக்கான கோரிக்கை மறுமுயற்சிகளின் அதிகபட்ச எண்ணிக்கை.

வகை: `Number`<br />
இயல்புநிலை: `3`

### agent

தனிப்பயன் `http`/`https`/`http2` [agent](https://www.npmjs.com/package/got#agent) ஐப் பயன்படுத்தி கோரிக்கைகளை அனுப்ப அனுமதிக்கிறது.

வகை: `Object`<br />
இயல்புநிலை:

```js
{
    http: new http.Agent({ keepAlive: true }),
    https: new https.Agent({ keepAlive: true })
}
```

### headers

ஒவ்வொரு WebDriver கோரிக்கைக்கும் அனுப்ப தனிப்பயன் `headers` ஐக் குறிப்பிடவும். உங்கள் செலீனியம் கிரிட் அடிப்படை அங்கீகாரத்தைத் தேவைப்படுத்தினால், உங்கள் WebDriver கோரிக்கைகளை அங்கீகரிக்க இந்த விருப்பத்தின் மூலம் ஒரு `Authorization` தலைப்பை அனுப்ப பரிந்துரைக்கிறோம், எ.கா.:

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

WebDriver கோரிக்கை செய்யப்படுவதற்கு முன் [HTTP கோரிக்கை விருப்பங்களை](https://github.com/sindresorhus/got#options) இடைமறிக்கும் செயல்பாடு

வகை: `(RequestOptions) => RequestOptions`<br />
இயல்புநிலை: *எதுவும் இல்லை*

### transformResponse

WebDriver பதில் வந்த பிறகு HTTP பதில் பொருள்களை இடைமறிக்கும் செயல்பாடு. செயல்பாட்டில் அசல் பதில் பொருள் முதல் வாதமாகவும், அதற்கு தொடர்புடைய `RequestOptions` இரண்டாவது வாதமாகவும் அனுப்பப்படுகிறது.

வகை: `(Response, RequestOptions) => Response`<br />
இயல்புநிலை: *எதுவும் இல்லை*

### strictSSL

SSL சான்றிதழ் செல்லுபடியாகும் தேவை இல்லை என்பதைக் குறிக்கிறது.
இதை `STRICT_SSL` அல்லது `strict_ssl` என்ற சுற்றுச்சூழல் மாறிகள் மூலம் அமைக்கலாம்.

வகை: `Boolean`<br />
இயல்புநிலை: `true`

### enableDirectConnect

[Appium நேரடி இணைப்பு அம்சத்தை](https://appiumpro.com/editions/86-connecting-directly-to-appium-hosts-in-distributed-environments) இயக்க வேண்டுமா.
கொடி இயக்கப்பட்டிருந்தாலும் பதிலில் சரியான விசைகள் இல்லை என்றால் இது எதுவும் செய்யாது.

வகை: `Boolean`<br />
இயல்புநிலை: `true`

### cacheDir

கேச் கோப்பகத்தின் ரூட்டுக்கான பாதை. இந்தக் கோப்பகம் அமர்வைத் தொடங்க முயற்சிக்கும்போது பதிவிறக்கம் செய்யப்படும் அனைத்து இயக்கிகளையும் சேமிக்கப் பயன்படுகிறது.

வகை: `String`<br />
இயல்புநிலை: `process.env.WEBDRIVER_CACHE_DIR || os.tmpdir()`

### maskingPatterns

பாதுகாப்பான பதிவிற்காக, `maskingPatterns` உடன் அமைக்கப்பட்ட வழக்கமான வெளிப்பாடுகள் பதிவிலிருந்து உணர்திறன் தகவல்களை மறைக்கலாம்.
 - சரம் வடிவம் என்பது கொடிகளுடன் அல்லது இல்லாமல் (எ.கா. `/.../i`) ஒரு வழக்கமான வெளிப்பாடு, மற்றும் பல வழக்கமான வெளிப்பாடுகளுக்கு காற்புள்ளியால் பிரிக்கப்பட்டது.
 - மாஸ்கிங் பேட்டர்ன்கள் பற்றிய கூடுதல் விவரங்களுக்கு, [WDIO Logger README இல் மாஸ்கிங் பேட்டர்ன்கள் பிரிவைப்](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-logger/README.md#masking-patterns) பார்க்கவும்.

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

பின்வரும் விருப்பங்கள் (மேலே பட்டியலிடப்பட்டவைகளும் உட்பட) WebdriverIO ஐ தனித்து இயங்கும் முறையில் பயன்படுத்தலாம்:

### automationProtocol

உங்கள் உலாவி ஆட்டோமேஷனுக்கு நீங்கள் பயன்படுத்த விரும்பும் நெறிமுறையை வரையறுக்கவும். தற்போது [`webdriver`](https://www.npmjs.com/package/webdriver) மட்டுமே ஆதரிக்கப்படுகிறது, ஏனெனில் இது WebdriverIO பயன்படுத்தும் முக்கிய உலாவி ஆட்டோமேஷன் தொழில்நுட்பமாகும்.

நீங்கள் வெவ்வேறு ஆட்டோமேஷன் தொழில்நுட்பத்தைப் பயன்படுத்தி உலாவியை ஆட்டோமேட் செய்ய விரும்பினால், பின்வரும் இடைமுகத்தைக் கடைப்பிடிக்கும் தொகுதியாக தீர்க்கும் பாதைக்கு இந்த பண்பை அமைக்கவும்:

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
- உங்கள் `url` அளவுரு `/` உடன் தொடங்கினால், `baseUrl` முன்னொட்டாக சேர்க்கப்படும் (baseUrl பாதையைத் தவிர, அது இருந்தால்).
- உங்கள் `url` அளவுரு ஒரு திட்டம் அல்லது `/` இல்லாமல் தொடங்கினால் (எ.கா. `some/path`), முழு `baseUrl` நேரடியாக முன்னொட்டாக சேர்க்கப்படும்.

வகை: `String`<br />
இயல்புநிலை: `null`

### waitforTimeout

அனைத்து `waitFor*` கட்டளைகளுக்கும் இயல்புநிலை நேரம் முடிந்தது. (விருப்ப பெயரில் சிறிய `f` ஐக் கவனிக்கவும்.) இந்த நேரம் முடிவு `waitFor*` உடன் தொடங்கும் கட்டளைகளை மட்டுமே பாதிக்கிறது மற்றும் அவற்றின் இயல்புநிலை காத்திருப்பு நேரம்.

_சோதனைக்கான_ நேரம் முடிவை அதிகரிக்க, கட்டமைப்பு ஆவணங்களைப் பார்க்கவும்.

வகை: `Number`<br />
இயல்புநிலை: `5000`

### waitforInterval

எதிர்பார்க்கப்படும் நிலை (எ.கா., காட்சித்தன்மை) மாற்றப்பட்டுள்ளதா என்பதைச் சரிபார்க்க அனைத்து `waitFor*` கட்டளைகளுக்கும் இயல்புநிலை இடைவெளி.

வகை: `Number`<br />
இயல்புநிலை: `100`

### region

Sauce Labs இல் இயங்கினால், வெவ்வேறு தரவு மையங்களுக்கு இடையே சோதனைகளை இயக்கத் தேர்வு செய்யலாம்: US அல்லது EU.
உங்கள் பிராந்தியத்தை EU க்கு மாற்ற, உங்கள் கட்டமைப்பில் `region: 'eu'` சேர்க்கவும்.

__குறிப்பு:__ உங்கள் Sauce Labs கணக்குடன் இணைக்கப்பட்ட `user` மற்றும் `key` விருப்பங்களை வழங்கினால் மட்டுமே இது பயனுள்ளதாக இருக்கும்.

வகை: `String`<br />
இயல்புநிலை: `us`

*(vm மற்றும் அல்லது em/simulators க்கு மட்டும்)*

---

## Testrunner விருப்பங்கள்

பின்வரும் விருப்பங்கள் (மேலே பட்டியலிடப்பட்டவை உட்பட) WDIO சோதனை இயக்கியுடன் WebdriverIO ஐ இயக்குவதற்கு மட்டுமே வரையறுக்கப்பட்டுள்ளன:

### specs

சோதனை செயல்பாட்டிற்கான specs வரையறுக்கவும். ஒரே நேரத்தில் பல கோப்புகளை பொருத்த glob பேட்டர்னைக் குறிப்பிடலாம் அல்லது ஒரு தனி worker செயல்முறையில் இயக்க glob அல்லது பாதைகளின் தொகுப்பை ஒரு அரேயில் மூடலாம். அனைத்து பாதைகளும் கட்டமைப்பு கோப்பு பாதையிலிருந்து தொடர்புடையதாகக் காணப்படுகின்றன.

வகை: `(String | String[])[]`<br />
இயல்புநிலை: `[]`

### exclude

சோதனை செயல்பாட்டிலிருந்து spec களை விலக்கவும். அனைத்து பாதைகளும் கட்டமைப்பு கோப்பு பாதையிலிருந்து தொடர்புடையதாகக் காணப்படுகின்றன.

வகை: `String[]`<br />
இயல்புநிலை: `[]`

### suites

பல்வேறு suites ஐ விவரிக்கும் ஒரு பொருள், அதை நீங்கள் `wdio` CLI இல் `--suite` விருப்பத்துடன் குறிப்பிடலாம்.

வகை: `Object`<br />
இயல்புநிலை: `{}`

### capabilities

மேலே விவரிக்கப்பட்டுள்ள `capabilities` பிரிவைப் போலவே, ஆனால் [`multiremote`](/docs/multiremote) பொருளைக் குறிப்பிடவோ அல்லது இணை செயலாக்கத்திற்கு ஒரு அரேயில் பல WebDriver அமர்வுகளைக் குறிப்பிடவோ விருப்பத்துடன்.

[மேலே](/docs/configuration#capabilities) வரையறுக்கப்பட்டபடி அதே விற்பனையாளர் மற்றும் உலாவி குறிப்பிட்ட திறன்களைப் பயன்படுத்தலாம்.

வகை: `Object`|`Object[]`<br />
இயல்புநிலை: `[{ 'wdio:maxInstances': 5, browserName: 'firefox' }]`

### maxInstances

மொத்த இணை இயங்கும் worker களின் அதிகபட்ச எண்ணிக்கை.

__குறிப்பு:__ சோதனைகள் Sauce Labs போன்ற வெளிப்புற விற்பனையாளர்களின் இயந்திரங்களில் செய்யப்படும்போது இது `100` போன்ற ஒரு எண்ணாக இருக்கலாம். அங்கு, சோதனைகள் ஒரு மெஷினில் சோதிக்கப்படவில்லை, மாறாக பல VM களில். சோதனைகள் உள்ளூர் மேம்பாட்டு கணினியில் இயக்கப்பட வேண்டுமானால், `3`, `4`, அல்லது `5` போன்ற ஒரு நியாயமான எண்ணைப் பயன்படுத்தவும். அடிப்படையில், இது ஒரே நேரத்தில் தொடங்கப்பட்டு உங்கள் சோதனைகளை இயக்கும் உலாவிகளின் எண்ணிக்கையாகும், எனவே இது உங்கள் இயந்திரத்தில் எவ்வளவு RAM உள்ளது மற்றும் உங்கள் இயந்திரத்தில் இயங்கும் மற்ற பயன்பாடுகளைப் பொறுத்தது.

நீங்கள் `wdio:maxInstances` திறனைப் பயன்படுத்தி உங்கள் திறன் பொருள்களுக்குள் `maxInstances` ஐப் பயன்படுத்தலாம். இது அந்த குறிப்பிட்ட திறனுக்கான இணை அமர்வுகளின் அளவை கட்டுப்படுத்தும்.

வகை: `Number`<br />
இயல்புநிலை: `100`

### maxInstancesPerCapability

ஒரு திறனுக்கு ஒரு worker அதிகபட்ச மொத்த இணை இயங்கும் worker களின் எண்ணிக்கை.

வகை: `Number`<br />
இயல்புநிலை: `100`

### injectGlobals

WebdriverIO இன் globals (எ.கா. `browser`, `$` மற்றும் `$$`) ஐ உலகளாவிய சூழலில் செருகுகிறது.
நீங்கள் `false` என அமைத்தால், `@wdio/globals` இலிருந்து இறக்குமதி செய்ய வேண்டும், எ.கா.:

```ts
import { browser, $, $$, expect } from '@wdio/globals'
```

குறிப்பு: WebdriverIO சோதனை கட்டமைப்பு குறிப்பிட்ட உலகளாவியவற்றின் உட்செலுத்தலை கையாளாது.

வகை: `Boolean`<br />
இயல்புநிலை: `true`

### bail

குறிப்பிட்ட எண்ணிக்கையிலான சோதனை தோல்விகளுக்குப் பிறகு உங்கள் சோதனை ஓட்டத்தை நிறுத்த விரும்பினால், `bail` ஐப் பயன்படுத்தவும்.
(இது இயல்பாக `0`, இது என்ன நடந்தாலும் அனைத்து சோதனைகளையும் இயக்குகிறது.) **குறிப்பு:** இந்த சூழலில் ஒரு சோதனை என்பது ஒரு spec கோப்புக்குள் உள்ள அனைத்து சோதனைகளும் (Mocha அல்லது Jasmine ஐப் பயன்படுத்தும் போது) அல்லது ஒரு அம்ச கோப்பில் உள்ள அனைத்து படிகளும் (Cucumber ஐப் பயன்படுத்தும் போது). ஒரு தனி சோதனை கோப்பின் சோதனைகளுக்குள் bail செயல்பாட்டைக் கட்டுப்படுத்த விரும்பினால், கிடைக்கக்கூடிய [framework](frameworks) விருப்பங்களைப் பார்க்கவும்.

வகை: `Number`<br />
இயல்புநிலை: `0` (bail செய்யவேண்டாம்; அனைத்து சோதனைகளையும் இயக்கவும்)

### specFileRetries

முழுமையாக தோல்வியடையும்போது ஒரு specfile ஐ மீண்டும் முயற்சிக்கும் முறைகளின் எண்ணிக்கை.

வகை: `Number`<br />
இயல்புநிலை: `0`

### specFileRetriesDelay

spec கோப்பு மீண்டும் முயற்சி முயற்சிகளுக்கு இடையில் விநாடிகளில் தாமதம்

வகை: `Number`<br />
இயல்புநிலை: `0`

### specFileRetriesDeferred

மறுமுயற்சி செய்யப்பட்ட spec கோப்புகள் உடனடியாக மறுமுயற்சி செய்யப்பட வேண்டுமா அல்லது வரிசையின் முடிவில் ஒத்திவைக்கப்பட வேண்டுமா.

வகை: `Boolean`<br />
இயல்புநிலை: `true`

### groupLogsByTestSpec

பதிவு வெளியீடு காட்சியைத் தேர்ந்தெடுக்கவும்.

`false` என அமைக்கப்பட்டிருந்தால் வெவ்வேறு சோதனை கோப்புகளிலிருந்து பதிவுகள் நிகழ்நேரத்தில் அச்சிடப்படும். இணையாக இயங்கும்போது வெவ்வேறு கோப்புகளிலிருந்து பதிவு வெளியீடுகள் கலக்கக்கூடும் என்பதை நினைவில் கொள்ளவும்.

`true` என அமைக்கப்பட்டிருந்தால், Test Spec படி பதிவு வெளியீடுகள் குழுவாக்கப்பட்டு Test Spec முடிந்ததும் மட்டுமே அச்சிடப்படும்.

இயல்பாக, இது `false` என அமைக்கப்பட்டுள்ளது, எனவே பதிவுகள் நிகழ்நேரத்தில் அச்சிடப்படுகின்றன.

வகை: `Boolean`<br />
இயல்புநிலை: `false`

### services

சேவைகள் நீங்கள் கவனிக்க விரும்பாத ஒரு குறிப்பிட்ட வேலையை எடுத்துக்கொள்கின்றன. அவை உங்கள் சோதனை அமைப்பை எளிதாக மேம்படுத்துகின்றன.

வகை: `String[]|Object[]`<br />
இயல்புநிலை: `[]`

### framework

WDIO சோதனை இயக்கியால் பயன்படுத்தப்பட வேண்டிய சோதனை கட்டமைப்பை வரையறுக்கிறது.

வகை: `String`<br />
இயல்புநிலை: `mocha`<br />
விருப்பங்கள்: `mocha` | `jasmine`

### mochaOpts, jasmineOpts மற்றும் cucumberOpts

குறிப்பிட்ட கட்டமைப்பு தொடர்பான விருப்பங்கள். எந்த விருப்பங்கள் கிடைக்கும் என்பதற்கு கட்டமைப்பு அடாப்டர் ஆவணங்களைப் பார்க்கவும். [Frameworks](frameworks) இல் இதைப் பற்றி மேலும் படிக்கவும்.

வகை: `Object`<br />
இயல்புநிலை: `{ timeout: 10000 }`

### cucumberFeaturesWithLineNumbers

வரி எண்களுடன் cucumber அம்சங்களின் பட்டியல் ([cucumber framework](./Frameworks.md#using-cucumber) பயன்படுத்தும்போது).

வகை: `String[]`
இயல்புநிலை: `[]`

### reporters

பயன்படுத்த அறிக்கையாளர்களின் பட்டியல். ஒரு அறிக்கையாளர் ஒரு சரமாகவோ அல்லது
`['reporterName', { /* reporter options */}]` என்ற அரேயாகவோ இருக்கலாம், இதில் முதல் கூறு அறிக்கையாளர் பெயருடன் ஒரு சரம் மற்றும் இரண்டாவது கூறு அறிக்கையாளர் விருப்பங்களுடன் ஒரு பொருள்.

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

அறிக்கையாளர்கள் தங்கள் பதிவுகளை ஒத்திசைக்கப்பட்டுள்ளனவா என்பதை சரிபார்க்க அறிக்கையாளர் எந்த இடைவெளியில் சரிபார்க்க வேண்டும் என்பதைத் தீர்மானிக்கிறது, அவர்கள் தங்கள் பதிவுகளை ஒத்திசைவற்ற முறையில் தெரிவிக்கும்போது (எ.கா. பதிவுகள் 3rd party விற்பனையாளருக்கு ஸ்ட்ரீம் செய்யப்பட்டால்).

வகை: `Number`<br />
இயல்புநிலை: `100` (ms)

### reporterSyncTimeout

அறிக்கையாளர்கள் சோதனை இயக்கி பிழையை எறியும் வரை அனைத்து பதிவுகளையும் பதிவேற்றுவதை முடிக்க அதிகபட்ச நேரத்தைத் தீர்மானிக்கிறது.

வகை: `Number`<br />
இயல்புநிலை: `5000` (ms)

### execArgv

child processes ஐ துவக்கும் போது குறிப்பிட Node arguments.

வகை: `String[]`<br />
இயல்புநிலை: `null`

### filesToWatch

சோதனை இயக்கி `--watch` கொடியுடன் இயங்கும்போது, மற்ற கோப்புகள், எ.கா. பயன்பாட்டு கோப்புகளை, கூடுதலாக கவனிக்கச் சொல்லும் glob ஆதரிக்கும் சரம் பேட்டர்ன்களின் பட்டியல். இயல்பாக சோதனை இயக்கி ஏற்கனவே அனைத்து spec கோப்புகளைக் கவனிக்கிறது.

வகை: `String[]`<br />
இயல்புநிலை: `[]`

### updateSnapshots

உங்கள் ஸ்னாப்ஷாட்களை புதுப்பிக்க விரும்பினால் true க்கு அமைக்கவும். CLI அளவுருவின் ஒரு பகுதியாக இலட்சியமாகப் பயன்படுத்தப்படுகிறது, எ.கா. `wdio run wdio.conf.js --s`.

வகை: `'new' | 'all' | 'none'`<br />
இயல்புநிலை: வழங்கப்படவில்லை என்றால் `none` மற்றும் சோதனைகள் CI இல் இயங்கினால், வழங்கப்படவில்லை என்றால் `new`, இல்லையெனில் வழங்கப்பட்டது

### resolveSnapshotPath

இயல்புநிலை ஸ்னாப்ஷாட் பாதையை மேலெழுதுகிறது. உதாரணமாக, சோதனை கோப்புகளுக்கு அடுத்ததாக ஸ்னாப்ஷாட்களை சேமிக்க.

```ts title="wdio.conf.ts"
export const config: WebdriverIO.Config = {
    resolveSnapshotPath: (testPath, snapExtension) => testPath + snapExtension,
}
```

வகை: `(testPath: string, snapExtension: string) => string`<br />
இயல்புநிலை: சோதனை கோப்புக்கு அடுத்த `__snapshots__` அடைவில் ஸ்னாப்ஷாட் கோப்புகளை சேமிக்கிறது

### tsConfigPath

WDIO TypeScript கோப்புகளைக் கம்பைல் செய்ய `tsx` ஐப் பயன்படுத்துகிறது. உங்கள் TSConfig தானாகவே தற்போதைய வேலை அடைவிலிருந்து கண்டறியப்படுகிறது, ஆனால் நீங்கள் ஒரு தனிப்பயன் பாதையை இங்கே குறிப்பிடலாம் அல்லது TSX_TSCONFIG_PATH சுற்றுச்சூழல் மாறியை அமைக்கலாம்.

`tsx` ஆவணங்களைப் பார்க்கவும்: https://tsx.is/dev-api/node-cli#custom-tsconfig-json-path

வகை: `String`<br />
இயல்புநிலை: `null`<br />

## Hooks

WDIO சோதனை இயக்கி சோதனை வாழ்க்கைச் சுழற்சியின் குறிப்பிட்ட நேரங்களில் தூண்டப்படும் ஹூக்குகளை அமைக்க அனுமதிக்கிறது. இது தனிப்பயன் செயல்களை அனுமதிக்கிறது (எ.கா. சோதனை தோல்வியடைந்தால் ஸ்கிரீன்ஷாட் எடுக்கவும்).

ஒவ்வொரு ஹூக்கும் வாழ்க்கைச் சுழற்சி பற்றிய குறிப்பிட்ட தகவலைக் கொண்டுள்ளது (எ.கா. சோதனை சூட் அல்லது சோதனை பற்றிய தகவல்). அனைத்து ஹூக் பண்புகளைப் பற்றி [எங்கள் உதாரண கட்டமைப்பில்](https://github.com/webdriverio/webdriverio/blob/master/examples/wdio.conf.js#L183-L326) மேலும் படிக்கவும்.

**குறிப்பு:** சில ஹூக்குகள் (`onPrepare`, `onWorkerStart`, `onWorkerEnd` மற்றும் `onComplete`) வேறு செயல்முறையில் செயல்படுத்தப்படுகின்றன, எனவே worker செயல்முறையில் வாழும் மற்ற ஹூக்குகளுடன் எந்த உலகளாவிய தரவையும் பகிர முடியாது.

### onPrepare

அனைத்து workers தொடங்குவதற்கு முன் ஒரு முறை செயல்படுத்தப்படுகிறது.

அளவுருக்கள்:

- `config` (`object`): WebdriverIO கட்டமைப்பு பொருள்
- `param` (`object[]`): திறன்களின் விவரங்களின் பட்டியல்

### onWorkerStart

ஒரு worker செயல்முறை உருவாக்கப்படுவதற்கு முன் செயல்படுத்தப்படுகிறது மற்றும் அந்த worker க்கான குறிப்பிட்ட சேவையை துவக்கவும் ஒத்திசைவற்ற முறையில் runtime சூழல்களை மாற்றவும் பயன்படுத்தலாம்.

அளவுருக்கள்:

- `cid` (`string`): திறன் ஐடி (எ.கா 0-0)
- `caps` (`object`): worker இல் spawn செய்யப்படும் அமர்வுக்கான திறன்களைக் கொண்டிருக்கிறது
- `specs` (`string[]`): worker செயல்முறையில் இயக்கப்பட வேண்டிய specs
- `args` (`object`): worker துவக்கப்பட்டதும் முக்கிய கட்டமைப்புடன் இணைக்கப்படும் பொருள்
- `execArgv` (`string[]`): worker செயல்முறைக்கு அனுப்பப்பட்ட சரம் வாதங்களின் பட்டியல்

### onWorkerEnd

ஒரு worker செயல்முறை வெளியேறிய பிறகு செயல்படுத்தப்படுகிறது.

அளவுருக்கள்:

- `cid` (`string`): திறன் ஐடி (எ.கா 0-0)
- `exitCode` (`number`): 0 - வெற்றி, 1 - தோல்வி
- `specs` (`string[]`): worker செயல்முறையில் இயக்கப்படும் specs
- `retries` (`number`): [_"Add retries on a per-specfile basis"_](./Retry.md#add-retries-on-a-per-specfile-basis) இல் வரையறுக்கப்பட்டபடி பயன்படுத்தப்படும் spec-level மறுமுயற்சிகளின் எண்ணிக்கை

### beforeSession

webdriver அமர்வு மற்றும் சோதனை கட்டமைப்பை துவக்குவதற்கு சற்று முன் செயல்படுத்தப்படுகிறது. இது திறன் அல்லது spec ஐப் பொறுத்து கட்டமைப்புகளை கையாள உங்களை அனுமதிக்கிறது.

அளவுருக்கள்:

- `config` (`object`): WebdriverIO கட்டமைப்பு பொருள்
- `caps` (`object`): worker இல் spawn செய்யப்படும் அமர்வுக்கான திறன்களைக் கொண்டிருக்கிறது
- `specs` (`string[]`): worker செயல்முறையில் இயக்கப்படும் specs

### before

சோதனை செயல்படுத்தப்படுவதற்கு முன் செயல்படுத்தப்படுகிறது. இந்த புள்ளியில் நீங்கள் `browser` போன்ற அனைத்து உலகளாவிய மாறிகளையும் அணுகலாம். இது தனிப்பயன் கட்டளைகளை வரையறுக்க சரியான இடம்.

அளவுருக்கள்:

- `caps` (`object`): worker இல் spawn செய்யப்படும் அமர்வுக்கான திறன்களைக் கொண்டிருக்கிறது
- `specs` (`string[]`): worker செயல்முறையில் இயக்கப்படும் specs
- `browser` (`object`): உருவாக்கப்பட்ட உலாவி/சாதன அமர்வின் நிகழ்வு

### beforeSuite

suite தொடங்குவதற்கு முன் செயல்படுத்தப்படும் ஹூக் (Mocha/Jasmine இல் மட்டும்)

அளவுருக்கள்:

- `suite` (`object`): suite விவரங்கள்

### beforeHook

suite க்குள் ஒரு ஹூக் தொடங்குவதற்கு *முன்* செயல்படுத்தப்படும் ஹூக் (எ.கா. Mocha இல் beforeEach ஐ அழைப்பதற்கு முன் இயங்குகிறது)

அளவுருக்கள்:

- `test` (`object`): சோதனை விவரங்கள்
- `context` (`object`): சோதனை சூழல் (Cucumber இல் World பொருளைக் குறிக்கிறது)

### afterHook

suite க்குள் ஒரு ஹூக் முடிந்த *பிறகு* செயல்படுத்தப்படும் ஹூக் (எ.கா. Mocha இல் afterEach ஐ அழைத்த பிறகு இயங்குகிறது)

அளவுருக்கள்:

- `test` (`object`): சோதனை விவரங்கள்
- `context` (`object`): சோதனை சூழல் (Cucumber இல் World பொருளைக் குறிக்கிறது)
- `result` (`object`): ஹூக் முடிவு (`error`, `result`, `duration`, `passed`, `retries` பண்புகளைக் கொண்டுள்ளது)

### beforeTest

ஒரு சோதனைக்கு முன் செயல்படுத்தப்படும் செயல்பாடு (Mocha/Jasmine இல் மட்டும்).

அளவுருக்கள்:

- `test` (`object`): சோதனை விவரங்கள்
- `context` (`object`): சோதனை செயல்படுத்தப்பட்ட நோக்கம் பொருள்

### beforeCommand

ஒரு WebdriverIO கட்டளை செயல்படுத்தப்படுவதற்கு முன் இயங்குகிறது.

அளவுருக்கள்:

- `commandName` (`string`): கட்டளை பெயர்
- `args` (`*`): கட்டளை பெறும் வாதங்கள்

### afterCommand

ஒரு WebdriverIO கட்டளை செயல்படுத்தப்பட்ட பிறகு இயங்குகிறது.

அளவுருக்கள்:

- `commandName` (`string`): கட்டளை பெயர்
- `args` (`*`): கட்டளை பெறும் வாதங்கள்
- `result` (`number`): 0 - கட்டளை வெற்றி, 1 - கட்டளை பிழை
- `error` (`Error`): ஏதேனும் இருந்தால் பிழை பொருள்

### afterTest

ஒரு சோதனை (Mocha/Jasmine இல்) முடிந்த பிறகு செயல்படுத்தப்படும் செயல்பாடு.

அளவுருக்கள்:

- `test` (`object`): சோதனை விவரங்கள்
- `context` (`object`): சோதனை செயல்படுத்தப்பட்ட நோக்கம் பொருள்
- `result.error` (`Error`): சோதனை தோல்வியடைந்தால் பிழை பொருள், இல்லையெனில் `undefined`
- `result.result` (`Any`): சோதனை செயல்பாட்டின் திரும்பப் பொருள்
- `result.duration` (`Number`): சோதனையின் கால அளவு
- `result.passed` (`Boolean`): சோதனை தேர்ச்சி பெற்றால் true, இல்லையெனில் false
- `result.retries` (`Object`): [Mocha மற்றும் Jasmine](./Retry.md#rerun-single-tests-in-jasmine-or-mocha) மற்றும் [Cucumber](./Retry.md#rerunning-in-cucumber)க்கு வரையறுக்கப்பட்ட ஒற்றை சோதனை தொடர்பான மறுமுயற்சிகள் பற்றிய தகவல், எ.கா. `{ attempts: 0, limit: 0 }`, பார்க்கவும்
- `result` (`object`): ஹூக் முடிவு (`error`, `result`, `duration`, `passed`, `retries` பண்புகளைக் கொண்டுள்ளது)

### afterSuite

suite முடிந்த பிறகு செயல்படுத்தப்படும் ஹூக் (Mocha/Jasmine இல் மட்டும்)

அளவுருக்கள்:

- `suite` (`object`): suite விவரங்கள்

### after

அனைத்து சோதனைகளும் முடிந்த பிறகு செயல்படுத்தப்படுகிறது. சோதனையிலிருந்து அனைத்து உலகளாவிய மாறிகளையும் நீங்கள் இன்னும் அணுகலாம்.

அளவுருக்கள்:

- `result` (`number`): 0 - சோதனை தேர்ச்சி, 1 - சோதனை தோல்வி
- `caps` (`object`): worker இல் spawn செய்யப்படும் அமர்வுக்கான திறன்களைக் கொண்டிருக்கிறது
- `specs` (`string[]`): worker செயல்முறையில் இயக்கப்படும் specs

### afterSession

webdriver அமர்வை முடித்த பிறகு செயல்படுத்தப்படுகிறது.

அளவுருக்கள்:

- `config` (`object`): WebdriverIO கட்டமைப்பு பொருள்
- `caps` (`object`): worker இல் spawn செய்யப்படும் அமர்வுக்கான திறன்களைக் கொண்டிருக்கிறது
- `specs` (`string[]`): worker செயல்முறையில் இயக்கப்படும் specs

### onComplete

அனைத்து workers ஷட் டவுன் செய்யப்பட்ட பிறகு மற்றும் செயல்முறை வெளியேற இருக்கும்போது செயல்படுத்தப்படுகிறது. onComplete ஹூக்கில் எறியப்பட்ட பிழை சோதனை ஓட்டம் தோல்வியடைவதற்கு காரணமாகும்.

அளவுருக்கள்:

- `exitCode` (`number`): 0 - வெற்றி, 1 - தோல்வி
- `config` (`object`): WebdriverIO கட்டமைப்பு பொருள்
- `caps` (`object`): worker இல் spawn செய்யப்படும் அமர்வுக்கான திறன்களைக் கொண்டிருக்கிறது
- `result` (`object`): சோதனை முடிவுகளைக் கொண்ட முடிவுகள் பொருள்

### onReload

ஒரு refresh நிகழும்போது செயல்படுத்தப்படுகிறது.

அளவுருக்கள்:

- `oldSessionId` (`string`): பழைய அமர்வின் ID
- `newSessionId` (`string`): புதிய அமர்வின் ID

### beforeFeature

Cucumber Feature க்கு முன் இயங்குகிறது.

அளவுருக்கள்:

- `uri` (`string`): அம்ச கோப்புக்கான பாதை
- `feature` ([`GherkinDocument.IFeature`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/json-to-messages/javascript/src/cucumber-generic/JSONSchema.ts#L8-L17)): Cucumber அம்ச பொருள்

### afterFeature

Cucumber Feature க்குப் பிறகு இயங்குகிறது.

அளவுருக்கள்:

- `uri` (`string`): அம்ச கோப்புக்கான பாதை
- `feature` ([`GherkinDocument.IFeature`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/json-to-messages/javascript/src/cucumber-generic/JSONSchema.ts#L8-L17)): Cucumber அம்ச பொருள்

### beforeScenario

Cucumber Scenario க்கு முன் இயங்குகிறது.

அளவுருக்கள்:

- `world` ([`ITestCaseHookParameter`](https://github.com/cucumber/cucumber-js/blob/ac124f7b2be5fa54d904c7feac077a2657b19440/src/support_code_library_builder/types.ts#L10-L15)): pickle மற்றும் சோதனை படி பற்றிய தகவலைக் கொண்ட உலக பொருள்
- `context` (`object`): Cucumber World பொருள்

### afterScenario

Cucumber Scenario க்குப் பிறகு இயங்குகிறது.

அளவுருக்கள்:

- `world` ([`ITestCaseHookParameter`](https://github.com/cucumber/cucumber-js/blob/ac124f7b2be5fa54d904c7feac077a2657b19440/src/support_code_library_builder/types.ts#L10-L15)): pickle மற்றும் சோதனை படி பற்றிய தகவலைக் கொண்ட உலக பொருள்
- `result` (`object`): சிறுகதை முடிவுகளைக் கொண்ட முடிவுகள் பொருள்
- `result.passed` (`boolean`): சிறுகதை தேர்ச்சி பெற்றால் true
- `result.error` (`string`): சிறுகதை தோல்வியடைந்தால் பிழை ஸ்டாக்
- `result.duration` (`number`): சிறுகதையின் கால அளவு மில்லிவினாடிகளில்
- `context` (`object`): Cucumber World பொருள்

### beforeStep

Cucumber Step க்கு முன் இயங்குகிறது.

அளவுருக்கள்:

- `step` ([`Pickle.IPickleStep`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/messages/jsonschema/Pickle.json#L20-L49)): Cucumber படி பொருள்
- `scenario` ([`IPickle`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/messages/jsonschema/Pickle.json#L137-L175)): Cucumber சிறுகதை பொருள்
- `context` (`object`): Cucumber World பொருள்

### afterStep

Cucumber Step க்குப் பிறகு இயங்குகிறது.

அளவுருக்கள்:

- `step` ([`Pickle.IPickleStep`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/messages/jsonschema/Pickle.json#L20-L49)): Cucumber படி பொருள்
- `scenario` ([`IPickle`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/messages/jsonschema/Pickle.json#L137-L175)): Cucumber சிறுகதை பொருள்
- `result`: (`object`): படி முடிவுகளைக் கொண்ட முடிவுகள் பொருள்
- `result.passed` (`boolean`): சிறுகதை தேர்ச்சி பெற்றால் true
- `result.error` (`string`): சிறுகதை தோல்வியடைந்தால் பிழை ஸ்டாக்
- `result.duration` (`number`): சிறுகதையின் கால அளவு மில்லிவினாடிகளில்
- `context` (`object`): Cucumber World பொருள்

### beforeAssertion

WebdriverIO உறுதிப்பாடு நிகழ்வதற்கு முன் செயல்படுத்தப்படும் ஹூக்.

அளவுருக்கள்:

- `params`: உறுதிப்பாடு தகவல்
- `params.matcherName` (`string`): matcher இன் பெயர் (எ.கா. `toHaveTitle`)
- `params.expectedValue`: matcher க்குள் அனுப்பப்படும் மதிப்பு
- `params.options`: உறுதிப்பாடு விருப்பங்கள்

### afterAssertion

WebdriverIO உறுதிப்பாடு நிகழ்ந்த பிறகு செயல்படுத்தப்படும் ஹூக்.

அளவுருக்கள்:

- `params`: உறுதிப்பாடு தகவல்
- `params.matcherName` (`string`): matcher இன் பெயர் (எ.கா. `toHaveTitle`)
- `params.expectedValue`: matcher க்குள் அனுப்பப்படும் மதிப்பு
- `params.options`: உறுதிப்பாடு விருப்பங்கள்
- `params.result`: உறுதிப்பாடு முடிவுகள்