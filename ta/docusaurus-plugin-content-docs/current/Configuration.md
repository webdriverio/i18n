---
id: configuration
title: கட்டமைப்பு
---

[அமைப்பு வகை](/docs/setuptypes) (எ.கா. மூல நெறிமுறை பிணைப்புகளைப் பயன்படுத்துதல், தனித்த பேக்கேஜாக WebdriverIO அல்லது WDIO டெஸ்ட்ரன்னர்) அடிப்படையில் சூழலைக் கட்டுப்படுத்த பல்வேறு விருப்பங்கள் உள்ளன.

## WebDriver விருப்பங்கள்

[`webdriver`](https://www.npmjs.com/package/webdriver) நெறிமுறை பேக்கேஜைப் பயன்படுத்தும்போது பின்வரும் விருப்பங்கள் வரையறுக்கப்படுகின்றன:

### protocol

டிரைவர் சர்வருடன் தொடர்பு கொள்ளும் போது பயன்படுத்த வேண்டிய நெறிமுறை.

வகை: `String`<br />
இயல்புநிலை: `http`

### hostname

உங்கள் டிரைவர் சர்வரின் ஹோஸ்ட்.

வகை: `String`<br />
இயல்புநிலை: `0.0.0.0`

### port

உங்கள் டிரைவர் சர்வர் இருக்கும் போர்ட்.

வகை: `Number`<br />
இயல்புநிலை: `undefined`

### path

டிரைவர் சர்வர் முடிவு புள்ளிக்கான பாதை.

வகை: `String`<br />
இயல்புநிலை: `/`

### queryParams

டிரைவர் சர்வருக்கு பரவும் வினவல் அளவுருக்கள்.

வகை: `Object`<br />
இயல்புநிலை: `undefined`

### user

உங்கள் கிளவுட் சேவை பயனர்பெயர் ([Sauce Labs](https://saucelabs.com), [Browserstack](https://www.browserstack.com), [TestingBot](https://testingbot.com) அல்லது [LambdaTest](https://www.lambdatest.com) கணக்குகளுக்கு மட்டுமே செயல்படும்). அமைக்கப்பட்டால், WebdriverIO தானாகவே உங்களுக்கான இணைப்பு விருப்பங்களை அமைக்கும். நீங்கள் கிளவுட் வழங்குநரைப் பயன்படுத்தவில்லை எனில், இது வேறு எந்த WebDriver பின்புறத்தையும் அங்கீகரிக்கப் பயன்படுத்தலாம்.

வகை: `String`<br />
இயல்புநிலை: `undefined`

### key

உங்கள் கிளவுட் சேவை அணுகல் விசை அல்லது ரகசிய விசை ([Sauce Labs](https://saucelabs.com), [Browserstack](https://www.browserstack.com), [TestingBot](https://testingbot.com) அல்லது [LambdaTest](https://www.lambdatest.com) கணக்குகளுக்கு மட்டுமே செயல்படும்). அமைக்கப்பட்டால், WebdriverIO தானாகவே உங்களுக்கான இணைப்பு விருப்பங்களை அமைக்கும். நீங்கள் கிளவுட் வழங்குநரைப் பயன்படுத்தவில்லை எனில், இது வேறு எந்த WebDriver பின்புறத்தையும் அங்கீகரிக்கப் பயன்படுத்தலாம்.

வகை: `String`<br />
இயல்புநிலை: `undefined`

### capabilities

உங்கள் WebDriver அமர்வில் இயக்க விரும்பும் திறன்களை வரையறுக்கிறது. மேலும் விவரங்களுக்கு [WebDriver நெறிமுறை](https://w3c.github.io/webdriver/#capabilities) ஐப் பார்க்கவும். WebDriver நெறிமுறையை ஆதரிக்காத பழைய டிரைவரை இயக்கினால், அமர்வை வெற்றிகரமாக இயக்க [JSONWireProtocol திறன்களை](https://github.com/SeleniumHQ/selenium/wiki/DesiredCapabilities) பயன்படுத்த வேண்டும்.

WebDriver அடிப்படையிலான திறன்களுக்கு அடுத்ததாக, தொலைநிலை உலாவி அல்லது சாதனத்தின் ஆழமான கட்டமைப்பை அனுமதிக்கும் உலாவி மற்றும் விற்பனையாளர் குறிப்பிட்ட விருப்பங்களைப் பயன்படுத்தலாம். இவை தொடர்புடைய விற்பனையாளர் ஆவணங்களில் ஆவணப்படுத்தப்பட்டுள்ளன, எ.கா.:

- `goog:chromeOptions`: [Google Chrome](https://chromedriver.chromium.org/capabilities#h.p_ID_106) க்காக
- `moz:firefoxOptions`: [Mozilla Firefox](https://firefox-source-docs.mozilla.org/testing/geckodriver/Capabilities.html) க்காக
- `ms:edgeOptions`: [Microsoft Edge](https://docs.microsoft.com/en-us/microsoft-edge/webdriver-chromium/capabilities-edge-options#using-the-edgeoptions-class) க்காக
- `sauce:options`: [Sauce Labs](https://docs.saucelabs.com/dev/test-configuration-options/#desktop-and-mobile-capabilities-sauce-specific--optional) க்காக
- `bstack:options`: [BrowserStack](https://www.browserstack.com/automate/capabilities?tag=selenium-4#) க்காக
- `selenoid:options`: [Selenoid](https://github.com/aerokube/selenoid/blob/master/docs/special-capabilities.adoc) க்காக

கூடுதலாக, Sauce Labs [தானியங்கி சோதனை கான்ஃபிகுரேட்டர்](https://docs.saucelabs.com/basics/platform-configurator/) என்ற பயனுள்ள கருவி உள்ளது, இது உங்கள் விரும்பிய திறன்களை கிளிக் செய்வதன் மூலம் இந்த ஆப்ஜெக்டை உருவாக்க உதவுகிறது.

வகை: `Object`<br />
இயல்புநிலை: `null`

**எடுத்துக்காட்டு:**

```js
{
    browserName: 'chrome', // விருப்பங்கள்: `chrome`, `edge`, `firefox`, `safari`
    browserVersion: '27.0', // உலாவி பதிப்பு
    platformName: 'Windows 10' // OS தளம்
}
```

நீங்கள் மொபைல் சாதனங்களில் வலை அல்லது நேட்டிவ் சோதனைகளை இயக்கினால், `capabilities` WebDriver நெறிமுறையிலிருந்து வேறுபடும். மேலும் விவரங்களுக்கு [Appium டாக்ஸ்](https://appium.io/docs/en/latest/guides/caps/) ஐப் பார்க்கவும்.

### logLevel

பதிவு செய்யும் வெர்போஸிட்டி அளவு.

வகை: `String`<br />
இயல்புநிலை: `info`<br />
விருப்பங்கள்: `trace` | `debug` | `info` | `warn` | `error` | `silent`

### outputDir

அனைத்து டெஸ்ட்ரன்னர் பதிவு கோப்புகளையும் (அறிக்கை பதிவுகள் மற்றும் `wdio` பதிவுகள் உட்பட) சேமிக்க கோப்பகம். அமைக்கப்படவில்லை என்றால், அனைத்து பதிவுகளும் `stdout`க்கு ஸ்ட்ரீம் செய்யப்படும். பெரும்பாலான அறிக்கையாளர்கள் `stdout`க்கு பதிவு செய்யப்படுவதால், கோப்பிற்குள் அறிக்கையை புஷ் செய்வது அர்த்தமுள்ளதாக இருக்கும் குறிப்பிட்ட அறிக்கையாளர்களுக்கு மட்டுமே இந்த விருப்பத்தைப் பயன்படுத்த பரிந்துரைக்கப்படுகிறது (எடுத்துக்காட்டாக `junit` அறிக்கையாளர்).

தனித்து இயங்கும் முறையில் இயங்கும்போது, WebdriverIO உருவாக்கும் ஒரே பதிவு `wdio` பதிவாக இருக்கும்.

வகை: `String`<br />
இயல்புநிலை: `null`

### connectionRetryTimeout

டிரைவர் அல்லது கிரிட்டிற்கான எந்த WebDriver கோரிக்கைக்கும் நேரம் முடிந்தது.

வகை: `Number`<br />
இயல்புநிலை: `120000`

### connectionRetryCount

செலீனியம் சர்வருக்கான கோரிக்கை மறுமுயற்சிகளின் அதிகபட்ச எண்ணிக்கை.

வகை: `Number`<br />
இயல்புநிலை: `3`

### agent

கோரிக்கைகளைச் செய்ய தனிப்பயன்` http`/`https`/`http2` [ஏஜென்ட்](https://www.npmjs.com/package/got#agent) ஐப் பயன்படுத்த அனுமதிக்கிறது.

வகை: `Object`<br />
இயல்புநிலை:

```js
{
    http: new http.Agent({ keepAlive: true }),
    https: new https.Agent({ keepAlive: true })
}
```

### headers

ஒவ்வொரு WebDriver கோரிக்கைக்கும் அனுப்ப தனிப்பயன் `headers` ஐக் குறிப்பிடவும். உங்கள் செலீனியம் கிரிட் அடிப்படை அங்கீகாரத்தைத் தேவைப்படுத்தினால், உங்கள் WebDriver கோரிக்கைகளை அங்கீகரிக்க இந்த விருப்பத்தின் மூலம் `Authorization` தலைப்பை அனுப்ப பரிந்துரைக்கிறோம், எ.கா.:

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
இயல்புநிலை: *எதுவுமில்லை*

### transformResponse

WebDriver பதில் வந்த பிறகு HTTP பதில் பொருள்களை இடைமறிக்கும் செயல்பாடு. செயல்பாட்டிற்கு அசல் பதில் பொருள் முதல் மற்றும் தொடர்புடைய `RequestOptions` இரண்டாவது அளவுருவாக அனுப்பப்படுகிறது.

வகை: `(Response, RequestOptions) => Response`<br />
இயல்புநிலை: *எதுவுமில்லை*

### strictSSL

SSL சான்றிதழ் செல்லுபடியாகத் தேவைப்படுகிறதா இல்லையா.
இது `STRICT_SSL` அல்லது `strict_ssl` என்ற சூழல் மாறிகள் மூலம் அமைக்கப்படலாம்.

வகை: `Boolean`<br />
இயல்புநிலை: `true`

### enableDirectConnect

[Appium நேரடி இணைப்பு அம்சத்தை](https://appiumpro.com/editions/86-connecting-directly-to-appium-hosts-in-distributed-environments) இயக்க வேண்டுமா.
கொடி இயக்கப்பட்டிருந்தாலும் பதிலில் சரியான விசைகள் இல்லை என்றால் இது எதுவும் செய்யாது.

வகை: `Boolean`<br />
இயல்புநிலை: `true`

### cacheDir

கேச் டைரக்டரியின் ரூட்டிற்கான பாதை. அமர்வைத் தொடங்க முயற்சிக்கும்போது பதிவிறக்கம் செய்யப்படும் அனைத்து டிரைவர்களையும் சேமிக்க இந்த டைரக்டரி பயன்படுத்தப்படுகிறது.

வகை: `String`<br />
இயல்புநிலை: `process.env.WEBDRIVER_CACHE_DIR || os.tmpdir()`

### maskingPatterns

மேலும் பாதுகாப்பான பதிவுக்காக, `maskingPatterns` உடன் அமைக்கப்பட்ட வழக்கமான வெளிப்பாடுகள் பதிவில் இருந்து உணர்திறன் தகவலை மறைக்கலாம்.
 - சரத்தின் வடிவம் ஃப்ளாக்களுடன் அல்லது இல்லாமல் (எ.கா. `/.../i`) ஒரு வழக்கமான வெளிப்பாடு மற்றும் பல வழக்கமான வெளிப்பாடுகளுக்கு காற்புள்ளியால் பிரிக்கப்பட்டது.
 - மாஸ்கிங் பேட்டர்ன்கள் குறித்த கூடுதல் விவரங்களுக்கு, [WDIO லாகர் README இல் மாஸ்கிங் பேட்டர்ன்கள் பிரிவைப்](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-logger/README.md#masking-patterns) பார்க்கவும்.

வகை: `String`<br />
இயல்புநிலை: `undefined`

**எடுத்துக்காட்டு:**

```js
{
    maskingPatterns: '/--key=([^ ]*)/i,/RESULT (.*)/'
}
```

---

## WebdriverIO

பின்வரும் விருப்பங்களை (மேலே பட்டியலிடப்பட்டவற்றுடன் சேர்த்து) WebdriverIO-வுடன் தனித்து பயன்படுத்தலாம்:

### automationProtocol

உங்கள் உலாவி ஆட்டோமேஷனுக்காக நீங்கள் பயன்படுத்த விரும்பும் நெறிமுறையை வரையறுக்கவும். தற்போது [`webdriver`](https://www.npmjs.com/package/webdriver) மட்டுமே ஆதரிக்கப்படுகிறது, ஏனெனில் இது WebdriverIO பயன்படுத்தும் முக்கிய உலாவி ஆட்டோமேஷன் தொழில்நுட்பமாகும்.

நீங்கள் வேறு ஆட்டோமேஷன் தொழில்நுட்பத்தைப் பயன்படுத்தி உலாவியை தானியங்குபடுத்த விரும்பினால், இந்த பண்பை பின்வரும் இடைமுகத்தை கடைப்பிடிக்கும் மாடியூலுக்கு தீர்க்கும் பாதையாக அமைக்கவும்:

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

அடிப்படை URL ஐ அமைப்பதன் மூலம் `url` கட்டளை அழைப்புகளை குறுக்கவும்.
- உங்கள் `url` அளவுரு `/` உடன் தொடங்கினால், `baseUrl` முன்னொட்டாக சேர்க்கப்படும் (அது ஒரு பாதையைக் கொண்டிருந்தால் `baseUrl` பாதையைத் தவிர).
- உங்கள் `url` அளவுரு ஒரு திட்டம் அல்லது `/` இல்லாமல் தொடங்கினால் (எ.கா. `some/path`), முழு `baseUrl` நேரடியாக முன்னொட்டாக சேர்க்கப்படும்.

வகை: `String`<br />
இயல்புநிலை: `null`

### waitforTimeout

அனைத்து `waitFor*` கட்டளைகளுக்கும் இயல்புநிலை டைம்அவுட். (விருப்ப பெயரில் சிறிய `f` ஐக் கவனிக்கவும்.) இந்த டைம்அவுட் `waitFor*` உடன் தொடங்கும் கட்டளைகளை மட்டுமே பாதிக்கும் மற்றும் அவற்றின் இயல்புநிலை காத்திருப்பு நேரம்.

ஒரு _சோதனைக்கான_ டைம்அவுட்டை அதிகரிக்க, தயவுசெய்து ஃப்ரேம்வொர்க் டாக்ஸைப் பார்க்கவும்.

வகை: `Number`<br />
இயல்புநிலை: `5000`

### waitforInterval

எதிர்பார்க்கப்படும் நிலை (எ.கா., தெரிவுநிலை) மாற்றப்பட்டுள்ளதா என்பதைச் சரிபார்க்க அனைத்து `waitFor*` கட்டளைகளுக்கும் இயல்புநிலை இடைவெளி.

வகை: `Number`<br />
இயல்புநிலை: `100`

### region

Sauce Labs இல் இயங்கினால், வெவ்வேறு தரவு மையங்களுக்கு இடையே சோதனைகளை இயக்க தேர்வு செய்யலாம்: US அல்லது EU.
உங்கள் பிராந்தியத்தை EU க்கு மாற்ற, உங்கள் கான்ஃபிகில் `region: 'eu'` சேர்க்கவும்.

__குறிப்பு:__ நீங்கள் உங்கள் Sauce Labs கணக்குடன் இணைக்கப்பட்ட `user` மற்றும் `key` விருப்பங்களை வழங்கினால் மட்டுமே இது ஒரு விளைவைக் கொண்டிருக்கும்.

வகை: `String`<br />
இயல்புநிலை: `us`

*(VM மற்றும் அல்லது EM/சிமுலேட்டர்களுக்கு மட்டும்)*

---

## Testrunner விருப்பங்கள்

பின்வரும் விருப்பங்கள் (மேலே பட்டியலிடப்பட்டவற்றுடன் சேர்த்து) WDIO டெஸ்ட்ரன்னருடன் WebdriverIO ஐ இயக்குவதற்கு மட்டுமே வரையறுக்கப்பட்டுள்ளன:

### specs

சோதனை செயல்பாட்டிற்கான ஸ்பெக்ஸை வரையறுக்கவும். ஒரே நேரத்தில் பல கோப்புகளை பொருத்துவதற்கான குளோப் பேட்டர்னை குறிப்பிடலாம் அல்லது ஒரு குளோப் அல்லது பாதைகளின் தொகுப்பை ஒரு ஒற்றை வொர்க்கர் செயல்முறையில் இயக்க அவற்றை ஆர்ரேயாக மாற்றலாம். அனைத்து பாதைகளும் கான்ஃபிக் கோப்பு பாதையிலிருந்து தொடர்புடையதாகக் காணப்படுகின்றன.

வகை: `(String | String[])[]`<br />
இயல்புநிலை: `[]`

### exclude

சோதனை செயல்பாட்டிலிருந்து ஸ்பெக்ஸை விலக்கவும். அனைத்து பாதைகளும் கான்ஃபிக் கோப்பு பாதையிலிருந்து தொடர்புடையதாகக் காணப்படுகின்றன.

வகை: `String[]`<br />
இயல்புநிலை: `[]`

### suites

பல்வேறு ஸ்விட்களை விவரிக்கும் ஒரு பொருள், அதை `wdio` CLI இல் `--suite` விருப்பத்துடன் குறிப்பிடலாம்.

வகை: `Object`<br />
இயல்புநிலை: `{}`

### capabilities

மேலே விவரிக்கப்பட்டுள்ள `capabilities` பிரிவைப் போலவே, [`multiremote`](/docs/multiremote) பொருளைக் குறிப்பிடுவதற்கான விருப்பத்துடன், அல்லது இணைந்த செயலாக்கத்திற்கான ஆர்ரேயில் பல WebDriver அமர்வுகள்.

[மேலே](/docs/configuration#capabilities) வரையறுக்கப்பட்டுள்ள அதே விற்பனையாளர் மற்றும் உலாவி குறிப்பிட்ட திறன்களை நீங்கள் பயன்படுத்தலாம்.

வகை: `Object`|`Object[]`<br />
இயல்புநிலை: `[{ 'wdio:maxInstances': 5, browserName: 'firefox' }]`

### maxInstances

மொத்த இணைந்த இயங்கும் தொழிலாளர்களின் அதிகபட்ச எண்ணிக்கை.

__குறிப்பு:__ சோதனைகள் Sauce Labs போன்ற சில வெளிப்புற விற்பனையாளர்களின் இயந்திரங்களில் செய்யப்படும்போது, இது `100` போன்ற அதிக எண்ணிக்கையாக இருக்கலாம். அங்கு, சோதனைகள் ஒரு ஒற்றை இயந்திரத்தில் சோதிக்கப்படுவதில்லை, மாறாக பல VM களில் சோதிக்கப்படுகின்றன. சோதனைகள் உள்ளூர் மேம்பாட்டு இயந்திரத்தில் இயக்கப்பட வேண்டுமெனில், `3`, `4`, அல்லது `5` போன்ற நியாயமான எண்ணைப் பயன்படுத்தவும். அடிப்படையில், இது ஒரே நேரத்தில் தொடங்கப்படும் மற்றும் உங்கள் சோதனைகளை இயக்கும் உலாவிகளின் எண்ணிக்கையாகும், எனவே உங்கள் இயந்திரத்தில் எவ்வளவு RAM உள்ளது மற்றும் உங்கள் இயந்திரத்தில் இயங்கும் மற்ற பயன்பாடுகளைப் பொறுத்தது.

`wdio:maxInstances` திறனைப் பயன்படுத்தி உங்கள் திறன் பொருள்களில் `maxInstances` ஐயும் பயன்படுத்தலாம். இது அந்த குறிப்பிட்ட திறனுக்கான இணைந்த அமர்வுகளின் எண்ணிக்கையை வரம்பிடும்.

வகை: `Number`<br />
இயல்புநிலை: `100`

### maxInstancesPerCapability

ஒரு திறனுக்கான மொத்த இணைந்த இயங்கும் தொழிலாளர்களின் அதிகபட்ச எண்ணிக்கை.

வகை: `Number`<br />
இயல்புநிலை: `100`

### injectGlobals

WebdriverIO இன் குளோபல்களை (எ.கா. `browser`, `$` மற்றும் `$$`) குளோபல் சூழலில் செருகுகிறது.
நீங்கள் `false` என அமைத்தால், `@wdio/globals` இலிருந்து இறக்குமதி செய்ய வேண்டும், எ.கா.:

```ts
import { browser, $, $$, expect } from '@wdio/globals'
```

குறிப்பு: WebdriverIO சோதனை ஃப்ரேம்வொர்க் குறிப்பிட்ட குளோபல்களின் உள்ளீட்டை கையாளவில்லை.

வகை: `Boolean`<br />
இயல்புநிலை: `true`

### bail

குறிப்பிட்ட எண்ணிக்கையிலான சோதனை தோல்விகளுக்குப் பிறகு உங்கள் சோதனை ஓட்டம் நிறுத்தப்பட வேண்டுமென்றால், `bail` ஐப் பயன்படுத்தவும்.
(இது இயல்பாக `0` ஆக உள்ளது, இது என்ன நடந்தாலும் அனைத்து சோதனைகளையும் இயக்குகிறது.) **குறிப்பு:** இந்த சூழலில் ஒரு சோதனை என்பது ஒரு ஸ்பெக் கோப்பிற்குள் உள்ள அனைத்து சோதனைகளும் (Mocha அல்லது Jasmine ஐப் பயன்படுத்தும்போது) அல்லது ஒரு அம்ச கோப்பிற்குள் உள்ள அனைத்து படிகளும் (Cucumber ஐப் பயன்படுத்தும்போது). ஒற்றை சோதனை கோப்பின் சோதனைகளுக்குள் பெயில் செயல்பாட்டைக் கட்டுப்படுத்த விரும்பினால், கிடைக்கும் [ஃப்ரேம்வொர்க்](frameworks) விருப்பங்களைப் பார்க்கவும்.

வகை: `Number`<br />
இயல்புநிலை: `0` (பெயில் வேண்டாம்; அனைத்து சோதனைகளையும் இயக்கவும்)

### specFileRetries

முழுமையாக தோல்வியடையும்போது ஒரு ஸ்பெக்ஃபைலை மீண்டும் முயற்சிக்க வேண்டிய முறைகளின் எண்ணிக்கை.

வகை: `Number`<br />
இயல்புநிலை: `0`

### specFileRetriesDelay

ஸ்பெக் கோப்பு மீண்டும் முயற்சிகளுக்கு இடையில் விநாடிகளில் தாமதம்

வகை: `Number`<br />
இயல்புநிலை: `0`

### specFileRetriesDeferred

மீண்டும் முயற்சிக்கப்பட்ட ஸ்பெக் கோப்புகள் உடனடியாக மீண்டும் முயற்சிக்கப்பட வேண்டுமா அல்லது வரிசையின் முடிவிற்கு ஒத்திவைக்கப்பட வேண்டுமா.

வகை: `Boolean`<br />
இயல்புநிலை: `true`

### groupLogsByTestSpec

பதிவு வெளியீடு காட்சியைத் தேர்ந்தெடுக்கவும்.

`false` என அமைக்கப்பட்டால், வெவ்வேறு சோதனை கோப்புகளிலிருந்து பதிவுகள் ரியல்-டைமில் அச்சிடப்படும். இணையாக இயங்கும்போது வெவ்வேறு கோப்புகளிலிருந்து பதிவு வெளியீடுகளை கலப்பதற்கு இது காரணமாக இருக்கலாம் என்பதை நினைவில் கொள்ளவும்.

`true` என அமைக்கப்பட்டால், பதிவு வெளியீடுகள் சோதனை ஸ்பெக் மூலம் குழுவாக்கப்பட்டு, சோதனை ஸ்பெக் முடிந்தவுடன் மட்டுமே அச்சிடப்படும்.

இயல்பாக, இது `false` என அமைக்கப்பட்டுள்ளது, எனவே பதிவுகள் ரியல்-டைமில் அச்சிடப்படுகின்றன.

வகை: `Boolean`<br />
இயல்புநிலை: `false`

### autoAssertOnTestEnd

ஒவ்வொரு சோதனையின் முடிவிலும் WebdriverIO தானாகவே அனைத்து மென்மையான உறுதிப்படுத்தல்களையும் உறுதிப்படுத்துகிறதா என்பதைக் கட்டுப்படுத்துகிறது. `true` என அமைக்கப்பட்டால், சேகரிக்கப்பட்ட எந்த மென்மையான உறுதிப்படுத்தல்களும் தானாகவே சரிபார்க்கப்பட்டு, ஏதேனும் உறுதிப்படுத்தல்கள் தோல்வியடைந்தால் சோதனை தோல்வியடையும். `false` என அமைக்கப்பட்டால், மென்மையான உறுதிப்படுத்தல்களைச் சரிபார்க்க நீங்கள் அசர்ட் முறையை கைமுறையாக அழைக்க வேண்டும்.

வகை: `Boolean`<br />
இயல்புநிலை: `true`

### services

நீங்கள் கவனிக்க விரும்பாத ஒரு குறிப்பிட்ட வேலையை சேவைகள் மேற்கொள்கின்றன. அவை உங்கள் சோதனை அமைப்பை கிட்டத்தட்ட எந்த முயற்சியும் இல்லாமல் மேம்படுத்துகின்றன.

வகை: `String[]|Object[]`<br />
இயல்புநிலை: `[]`

### framework

WDIO டெஸ்ட்ரன்னரால் பயன்படுத்தப்பட வேண்டிய சோதனை ஃப்ரேம்வொர்க்கை வரையறுக்கிறது.

வகை: `String`<br />
இயல்புநிலை: `mocha`<br />
விருப்பங்கள்: `mocha` | `jasmine`

### mochaOpts, jasmineOpts மற்றும் cucumberOpts

குறிப்பிட்ட ஃப்ரேம்வொர்க் தொடர்பான விருப்பங்கள். எந்த விருப்பங்கள் கிடைக்கும் என்பதை ஃப்ரேம்வொர்க் அடாப்டர் ஆவணங்களைப் பார்க்கவும். [ஃப்ரேம்வொர்க்குகள்](frameworks) இல் இதைப் பற்றி மேலும் படிக்கவும்.

வகை: `Object`<br />
இயல்புநிலை: `{ timeout: 10000 }`

### cucumberFeaturesWithLineNumbers

வரி எண்களுடன் கியூகம்பர் அம்சங்களின் பட்டியல் ([கியூகம்பர் ஃப்ரேம்வொர்க்கைப் பயன்படுத்தும்போது](./Frameworks.md#using-cucumber)).

வகை: `String[]`
இயல்புநிலை: `[]`

### reporters

பயன்படுத்த வேண்டிய அறிக்கையாளர்களின் பட்டியல். ஒரு அறிக்கையாளர் ஒரு சரமாகவோ அல்லது
`['reporterName', { /* reporter options */}]` என்ற ஆர்ரேயாகவோ இருக்கலாம், இதில் முதல் கூறு அறிக்கையாளர் பெயருடன் ஒரு சரமாகவும், இரண்டாவது கூறு அறிக்கையாளர் விருப்பங்களுடன் ஒரு பொருளாகவும் இருக்கும்.

வகை: `String[]|Object[]`<br />
இயல்புநிலை: `[]`

எடுத்துக்காட்டு:

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

அறிக்கையாளர்கள் தங்கள் பதிவுகளை ஒத்திசைக்கப்பட்டுள்ளனவா என்பதை எந்த இடைவெளியில் சரிபார்க்க வேண்டும் என்பதைத் தீர்மானிக்கிறது, அவர்கள் தங்கள் பதிவுகளை ஒத்திசைக்கப்படாமல் அறிக்கை செய்தால் (எ.கா. பதிவுகள் ஒரு 3வது தரப்பு விற்பனையாளருக்கு ஸ்ட்ரீம் செய்யப்பட்டால்).

வகை: `Number`<br />
இயல்புநிலை: `100` (ms)

### reporterSyncTimeout

டெஸ்ட்ரன்னரால் பிழை ஏற்படும் வரை அறிக்கையாளர்கள் தங்கள் அனைத்து பதிவுகளையும் பதிவேற்றுவதை முடிக்க வேண்டிய அதிகபட்ச நேரத்தைத் தீர்மானிக்கிறது.

வகை: `Number`<br />
இயல்புநிலை: `5000` (ms)

### execArgv

குழந்தை செயல்முறைகளைத் தொடங்கும் போது குறிப்பிட வேண்டிய நோட் வாதங்கள்.

வகை: `String[]`<br />
இயல்புநிலை: `null`

### filesToWatch

டெஸ்ட்ரன்னரை `--watch` கொடியுடன் இயக்கும்போது பிற கோப்புகளையும் கூடுதலாகக் கவனிக்க டெஸ்ட்ரன்னருக்குச் சொல்லும் குளோப் ஆதரவுள்ள சரம் பேட்டர்ன்களின் பட்டியல், எ.கா. பயன்பாட்டு கோப்புகள். இயல்பாக டெஸ்ட்ரன்னர் ஏற்கனவே அனைத்து ஸ்பெக் கோப்புகளையும் கவனிக்கிறது.

வகை: `String[]`<br />
இயல்புநிலை: `[]`

### updateSnapshots

உங்கள் ஸ்னாப்ஷாட்களை புதுப்பிக்க விரும்பினால் இதை true என அமைக்கவும். கிளி அளவுருவின் ஒரு பகுதியாக பயன்படுத்தப்படுகிறது, எ.கா. `wdio run wdio.conf.js --s`.

வகை: `'new' | 'all' | 'none'`<br />
இயல்புநிலை: வழங்கப்படவில்லை மற்றும் சோதனைகள் CI இல் இயங்கினால் `none`, வழங்கப்படவில்லை என்றால் `new`, இல்லையெனில் வழங்கப்பட்டது

### resolveSnapshotPath

இயல்புநிலை ஸ்னாப்ஷாட் பாதையை மேலெழுதுகிறது. எடுத்துக்காட்டாக, சோதனை கோப்புகளுக்கு அடுத்ததாக ஸ்னாப்ஷாட்களை சேமிக்க.

```ts title="wdio.conf.ts"
export const config: WebdriverIO.Config = {
    resolveSnapshotPath: (testPath, snapExtension) => testPath + snapExtension,
}
```

வகை: `(testPath: string, snapExtension: string) => string`<br />
இயல்புநிலை: சோதனை கோப்புக்கு அடுத்ததாக `__snapshots__` கோப்பகத்தில் ஸ்னாப்ஷாட் கோப்புகளை சேமிக்கிறது

### tsConfigPath

TypeScript கோப்புகளைத் தொகுக்க WDIO `tsx` ஐப் பயன்படுத்துகிறது. உங்கள் TSConfig தற்போதைய இயங்கும் கோப்பகத்திலிருந்து தானாகவே கண்டறியப்படுகிறது, ஆனால் நீங்கள் ஒரு தனிப்பயன் பாதையை இங்கே குறிப்பிடலாம் அல்லது TSX_TSCONFIG_PATH சூழல் மாறியை அமைக்கலாம்.

`tsx` டாக்ஸைப் பார்க்கவும்: https://tsx.is/dev-api/node-cli#custom-tsconfig-json-path

வகை: `String`<br />
இயல்புநிலை: `null`<br />

## ஹுக்குகள்

WDIO டெஸ்ட்ரன்னர் சோதனை வாழ்க்கை சுழற்சியின் குறிப்பிட்ட நேரங்களில் தூண்டப்படும் ஹுக்குகளை அமைக்க அனுமதிக்கிறது. இது தனிப்பயன் செயல்களை அனுமதிக்கிறது (எ.கா. சோதனை தோல்வியடைந்தால் ஸ்கிரீன்ஷாட் எடுக்கவும்).

ஒவ்வொரு ஹுக்கும் அளவுருவாக வாழ்க்கை சுழற்சி பற்றிய குறிப்பிட்ட தகவலைக் கொண்டுள்ளது (எ.கா. சோதனை ஸ்விட் அல்லது சோதனை பற்றிய தகவல்). அனைத்து ஹுக் பண்புகளைப் பற்றி [எங்கள் எடுத்துக்காட்டு கான்ஃபிகில்](https://github.com/webdriverio/webdriverio/blob/master/examples/wdio.conf.js#L183-L326) மேலும் படிக்கவும்.

**குறிப்பு:** சில ஹுக்குகள் (`onPrepare`, `onWorkerStart`, `onWorkerEnd` மற்றும் `onComplete`) வேறு செயல்முறையில் செயல்படுத்தப்படுகின்றன, எனவே வொர்க்கர் செயல்முறையில் வாழும் மற்ற ஹுக்குகளுடன் எந்த உலகளாவிய தரவையும் பகிர முடியாது.

### onPrepare

அனைத்து தொழிலாளர்களும் துவக்கப்படுவதற்கு முன் ஒரு முறை செயல்படுத்தப்படுகிறது.

அளவுருக்கள்:

- `config` (`object`): WebdriverIO கான்ஃபிகுரேஷன் பொருள்
- `param` (`object[]`): திறன்கள் விவரங்களின் பட்டியல்

### onWorkerStart

ஒரு தொழிலாளர் செயல்முறை உருவாக்கப்படுவதற்கு முன் செயல்படுத்தப்படுகிறது மற்றும் அந்த தொழிலாளருக்கான குறிப்பிட்ட சேவையை துவக்குவதற்கும் ஒத்திசைவற்ற முறையில் ரன்டைம் சூழல்களை மாற்றுவதற்கும் பயன்படுத்தலாம்.

அளவுருக்கள்:

- `cid` (`string`): திறன் id (எ.கா 0-0)
- `caps` (`object`): தொழிலாளரில் உருவாக்கப்படும் அமர்விற்கான திறன்களைக் கொண்டிருக்கும்
- `specs` (`string[]`): தொழிலாளர் செயல்முறையில் இயக்கப்படும் ஸ்பெக்கள்
- `args` (`object`): தொழிலாளர் துவக்கப்பட்ட பிறகு முக்கிய கான்ஃபிகுரேஷனுடன் இணைக்கப்படும் பொருள்
- `execArgv` (`string[]`): தொழிலாளர் செயல்முறைக்கு அனுப்பப்பட்ட சரம் வாதங்களின் பட்டியல்

### onWorkerEnd

ஒரு தொழிலாளர் செயல்முறை வெளியேறிய பிறகு செயல்படுத்தப்படுகிறது.

அளவுருக்கள்:

- `cid` (`string`): திறன் id (எ.கா 0-0)
- `exitCode` (`number`): 0 - வெற்றி, 1 - தோல்வி
- `specs` (`string[]`): தொழிலாளர் செயல்முறையில் இயக்கப்படும் ஸ்பெக்கள்
- `retries` (`number`): [_"ஒரு ஸ்பெக்ஃபைல் அடிப்படையில் மறுமுயற்சிகளைச் சேர்க்கவும்"_](./Retry.md#add-retries-on-a-per-specfile-basis) இல் வரையறுக்கப்பட்டுள்ளபடி பயன்படுத்தப்படும் ஸ்பெக் நிலை மறுமுயற்சிகளின் எண்ணிக்கை

### beforeSession

webdriver அமர்வு மற்றும் சோதனை ஃப்ரேம்வொர்க்கை துவக்குவதற்கு சற்று முன்பு செயல்படுத்தப்படுகிறது. திறன் அல்லது ஸ்பெக்கைப் பொறுத்து கான்ஃபிகுரேஷன்களை கையாள இது அனுமதிக்கிறது.

அளவுருக்கள்:

- `config` (`object`): WebdriverIO கான்ஃபிகுரேஷன் பொருள்
- `caps` (`object`): தொழிலாளரில் உருவாக்கப்படும் அமர்விற்கான திறன்களைக் கொண்டிருக்கும்
- `specs` (`string[]`): தொழிலாளர் செயல்முறையில் இயக்கப்படும் ஸ்பெக்கள்

### before

சோதனை செயல்பாடு தொடங்குவதற்கு முன் செயல்படுத்தப்படுகிறது. இந்த புள்ளியில் நீங்கள் `browser` போன்ற அனைத்து உலகளாவிய மாறிகளையும் அணுகலாம். இது தனிப்பயன் கட்டளைகளை வரையறுக்க சரியான இடம்.

அளவுருக்கள்:

- `caps` (`object`): தொழிலாளரில் உருவாக்கப்படும் அமர்விற்கான திறன்களைக் கொண்டிருக்கும்
- `specs` (`string[]`): தொழிலாளர் செயல்முறையில் இயக்கப்படும் ஸ்பெக்கள்
- `browser` (`object`): உருவாக்கப்பட்ட உலாவி/சாதன அமர்வின் நிகழ்வு

### beforeSuite

ஸ்விட் தொடங்குவதற்கு முன் செயல்படுத்தப்படும் ஹுக் (Mocha/Jasmine இல் மட்டும்)

அளவுருக்கள்:

- `suite` (`object`): ஸ்விட் விவரங்கள்

### beforeHook

ஸ்விட்டிற்குள் ஹுக் தொடங்குவதற்கு *முன்* செயல்படுத்தப்படும் ஹுக் (எ.கா. Mocha இல் beforeEach ஐ அழைப்பதற்கு முன் இயங்குகிறது)

அளவுருக்கள்:

- `test` (`object`): சோதனை விவரங்கள்
- `context` (`object`): சோதனை சூழல் (Cucumber இல் World ஆப்ஜெக்டை குறிக்கிறது)

### afterHook

ஸ்விட்டிற்குள் ஹுக் முடிந்த *பிறகு* செயல்படுத்தப்படும் ஹுக் (எ.கா. Mocha இல் afterEach ஐ அழைத்த பிறகு இயங்குகிறது)

அளவுருக்கள்:

- `test` (`object`): சோதனை விவரங்கள்
- `context` (`object`): சோதனை சூழல் (Cucumber இல் World ஆப்ஜெக்டை குறிக்கிறது)
- `result` (`object`): ஹுக் முடிவு (`error`, `result`, `duration`, `passed`, `retries` பண்புகளைக் கொண்டுள்ளது)

### beforeTest

சோதனைக்கு முன் செயல்படுத்தப்பட வேண்டிய செயல்பாடு (Mocha/Jasmine இல் மட்டும்).

அளவுருக்கள்:

- `test` (`object`): சோதனை விவரங்கள்
- `context` (`object`): சோதனை செயல்படுத்தப்பட்ட ஸ்கோப் பொருள்

### beforeCommand

WebdriverIO கட்டளை செயல்படுத்தப்படுவதற்கு முன் இயங்குகிறது.

அளவுருக்கள்:

- `commandName` (`string`): கட்டளை பெயர்
- `args` (`*`): கட்டளை பெறும் வாதங்கள்

### afterCommand

WebdriverIO கட்டளை செயல்படுத்தப்பட்ட பிறகு இயங்குகிறது.

அளவுருக்கள்:

- `commandName` (`string`): கட்டளை பெயர்
- `args` (`*`): கட்டளை பெறும் வாதங்கள்
- `result` (`number`): 0 - கட்டளை வெற்றி, 1 - கட்டளை பிழை
- `error` (`Error`): ஏதேனும் இருந்தால் பிழை பொருள்

### afterTest

சோதனை (Mocha/Jasmine இல்) முடிந்த பிறகு செயல்படுத்தப்பட வேண்டிய செயல்பாடு.

அளவுருக்கள்:

- `test` (`object`): சோதனை விவரங்கள்
- `context` (`object`): சோதனை செயல்படுத்தப்பட்ட ஸ்கோப் பொருள்
- `result.error` (`Error`): சோதனை தோல்வியடைந்தால் பிழை பொருள், இல்லையெனில் `undefined`
- `result.result` (`Any`): சோதனை செயல்பாட்டின் ரிட்டர்ன் பொருள்
- `result.duration` (`Number`): சோதனையின் கால அளவு
- `result.passed` (`Boolean`): சோதனை தேர்ச்சியடைந்தால் true, இல்லையெனில் false
- `result.retries` (`Object`): [Mocha மற்றும் Jasmine](./Retry.md#rerun-single-tests-in-jasmine-or-mocha) மற்றும் [Cucumber](./Retry.md#rerunning-in-cucumber) க்கு வரையறுக்கப்பட்டுள்ளபடி ஒற்றை சோதனை தொடர்பான மறுமுயற்சிகள் பற்றிய தகவல், எ.கா. `{ attempts: 0, limit: 0 }`
- `result` (`object`): ஹுக் முடிவு (`error`, `result`, `duration`, `passed`, `retries` பண்புகளைக் கொண்டுள்ளது)

### afterSuite

ஸ்விட் முடிந்த பிறகு செயல்படுத்தப்படும் ஹுக் (Mocha/Jasmine இல் மட்டும்)

அளவுருக்கள்:

- `suite` (`object`): ஸ்விட் விவரங்கள்

### after

அனைத்து சோதனைகளும் முடிந்த பிறகு செயல்படுத்தப்படுகிறது. சோதனையிலிருந்து அனைத்து உலகளாவிய மாறிகளையும் அணுக உங்களுக்கு இன்னும் அணுகல் உள்ளது.

அளவுருக்கள்:

- `result` (`number`): 0 - சோதனை தேர்ச்சி, 1 - சோதனை தோல்வி
- `caps` (`object`): தொழிலாளரில் உருவாக்கப்படும் அமர்விற்கான திறன்களைக் கொண்டிருக்கும்
- `specs` (`string[]`): தொழிலாளர் செயல்முறையில் இயக்கப்படும் ஸ்பெக்கள்

### afterSession

webdriver அமர்வை முடித்த பிறகு செயல்படுத்தப்படுகிறது.

அளவுருக்கள்:

- `config` (`object`): WebdriverIO கான்ஃபிகுரேஷன் பொருள்
- `caps` (`object`): தொழிலாளரில் உருவாக்கப்படும் அமர்விற்கான திறன்களைக் கொண்டிருக்கும்
- `specs` (`string[]`): தொழிலாளர் செயல்முறையில் இயக்கப்படும் ஸ்பெக்கள்

### onComplete

அனைத்து தொழிலாளர்களும் ஷட் டவுன் செய்யப்பட்டு செயல்முறை வெளியேற இருக்கும் பிறகு செயல்படுத்தப்படுகிறது. onComplete ஹுக்கில் எறியப்படும் பிழை சோதனை ஓட்டம் தோல்வியடைவதற்கு காரணமாகும்.

அளவுருக்கள்:

- `exitCode` (`number`): 0 - வெற்றி, 1 - தோல்வி
- `config` (`object`): WebdriverIO கான்ஃபிகுரேஷன் பொருள்
- `caps` (`object`): தொழிலாளரில் உருவாக்கப்படும் அமர்விற்கான திறன்களைக் கொண்டிருக்கும்
- `result` (`object`): சோதனை முடிவுகளைக் கொண்ட முடிவுகள் பொருள்

### onReload

புதுப்பித்தல் நடக்கும்போது செயல்படுத்தப்படுகிறது.

அளவுருக்கள்:

- `oldSessionId` (`string`): பழைய அமர்வின் அமர்வு ID
- `newSessionId` (`string`): புதிய அமர்வின் அமர்வு ID

### beforeFeature

கியூகம்பர் அம்சத்திற்கு முன் இயங்குகிறது.

அளவுருக்கள்:

- `uri` (`string`): அம்ச கோப்பிற்கான பாதை
- `feature` ([`GherkinDocument.IFeature`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/json-to-messages/javascript/src/cucumber-generic/JSONSchema.ts#L8-L17)): கியூகம்பர் அம்ச பொருள்

### afterFeature

கியூகம்பர் அம்சத்திற்குப் பிறகு இயங்குகிறது.

அளவுருக்கள்:

- `uri` (`string`): அம்ச கோப்பிற்கான பாதை
- `feature` ([`GherkinDocument.IFeature`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/json-to-messages/javascript/src/cucumber-generic/JSONSchema.ts#L8-L17)): கியூகம்பர் அம்ச பொருள்

### beforeScenario

கியூகம்பர் சிக்கலுக்கு முன் இயங்குகிறது.

அளவுருக்கள்:

- `world` ([`ITestCaseHookParameter`](https://github.com/cucumber/cucumber-js/blob/ac124f7b2be5fa54d904c7feac077a2657b19440/src/support_code_library_builder/types.ts#L10-L15)): பிக்கிள் மற்றும் சோதனை படி பற்றிய தகவலைக் கொண்ட உலக பொருள்
- `context` (`object`): கியூகம்பர் உலக பொருள்

### afterScenario

கியூகம்பர் சிக்கலுக்குப் பிறகு இயங்குகிறது.

அளவுருக்கள்:

- `world` ([`ITestCaseHookParameter`](https://github.com/cucumber/cucumber-js/blob/ac124f7b2be5fa54d904c7feac077a2657b19440/src/support_code_library_builder/types.ts#L10-L15)): பிக்கிள் மற்றும் சோதனை படி பற்றிய தகவலைக் கொண்ட உலக பொருள்
- `result` (`object`): சிக்கல் முடிவுகளைக் கொண்ட முடிவுகள் பொருள்
- `result.passed` (`boolean`): சிக்கல் தேர்ச்சியடைந்தால் true
- `result.error` (`string`): சிக்கல் தோல்வியடைந்தால் பிழை ஸ்டேக்
- `result.duration` (`number`): மில்லி விநாடிகளில் சிக்கலின் கால அளவு
- `context` (`object`): கியூகம்பர் உலக பொருள்

### beforeStep

கியூகம்பர் படிக்கு முன் இயங்குகிறது.

அளவுருக்கள்:

- `step` ([`Pickle.IPickleStep`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/messages/jsonschema/Pickle.json#L20-L49)): கியூகம்பர் படி பொருள்
- `scenario` ([`IPickle`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/messages/jsonschema/Pickle.json#L137-L175)): கியூகம்பர் சிக்கல் பொருள்
- `context` (`object`): கியூகம்பர் உலக பொருள்

### afterStep

கியூகம்பர் படிக்குப் பிறகு இயங்குகிறது.

அளவுருக்கள்:

- `step` ([`Pickle.IPickleStep`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/messages/jsonschema/Pickle.json#L20-L49)): கியூகம்பர் படி பொருள்
- `scenario` ([`IPickle`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/messages/jsonschema/Pickle.json#L137-L175)): கியூகம்பர் சிக்கல் பொருள்
- `result`: (`object`): படி முடிவுகளைக் கொண்ட முடிவுகள் பொருள்
- `result.passed` (`boolean`): சிக்கல் தேர்ச்சியடைந்தால் true
- `result.error` (`string`): சிக்கல் தோல்வியடைந்தால் பிழை ஸ்டேக்
- `result.duration` (`number`): மில்லி விநாடிகளில் சிக்கலின் கால அளவு
- `context` (`object`): கியூகம்பர் உலக பொருள்

### beforeAssertion

WebdriverIO உறுதிப்படுத்தல் நடப்பதற்கு முன் செயல்படுத்தப்படும் ஹுக்.

அளவுருக்கள்:

- `params`: உறுதிப்படுத்தல் தகவல்
- `params.matcherName` (`string`): பொருத்தியின் பெயர் (எ.கா. `toHaveTitle`)
- `params.expectedValue`: மேட்சருக்குள் அனுப்பப்படும் மதிப்பு
- `params.options`: உறுதிப்படுத்தல் விருப்பங்கள்

### afterAssertion

WebdriverIO உறுதிப்படுத்தல் நடந்த பிறகு செயல்படுத்தப்படும் ஹுக்.

அளவுருக்கள்:

- `params`: உறுதிப்படுத்தல் தகவல்
- `params.matcherName` (`string`): பொருத்தியின் பெயர் (எ.கா. `toHaveTitle`)
- `params.expectedValue`: மேட்சருக்குள் அனுப்பப்படும் மதிப்பு
- `params.options`: உறுதிப்படுத்தல் விருப்பங்கள்
- `params.result`: உறுதிப்படுத்தல் முடிவுகள்
