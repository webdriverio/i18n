---
id: configuration
title: கட்டமைப்பு
---

[அமைப்பு வகை](/docs/setuptypes) அடிப்படையில் (எ.கா. raw protocol bindings, தனிப்பட்ட தொகுப்பாக WebdriverIO அல்லது WDIO testrunner பயன்படுத்துதல்) சூழலைக் கட்டுப்படுத்த வெவ்வேறு விருப்பங்கள் உள்ளன.

## WebDriver விருப்பங்கள்

[`webdriver`](https://www.npmjs.com/package/webdriver) protocol package பயன்படுத்தும்போது பின்வரும் விருப்பங்கள் வரையறுக்கப்பட்டுள்ளன:

### protocol

இயக்கி சேவையகத்துடன் தொடர்பு கொள்ளும் போது பயன்படுத்த வேண்டிய நெறிமுறை.

வகை: `String`<br />
இயல்புநிலை: `http`

### hostname

உங்கள் இயக்கி சேவையகத்தின் ஹோஸ்ட்.

வகை: `String`<br />
இயல்புநிலை: `0.0.0.0`

### port

உங்கள் இயக்கி சேவையகம் உள்ள துறைமுகம்.

வகை: `Number`<br />
இயல்புநிலை: `undefined`

### path

இயக்கி சேவையக முடிவு புள்ளி பாதை.

வகை: `String`<br />
இயல்புநிலை: `/`

### queryParams

இயக்கி சேவையகத்திற்கு பரப்பப்படும் வினவல் அளவுருக்கள்.

வகை: `Object`<br />
இயல்புநிலை: `undefined`

### user

உங்கள் கிளவுட் சேவை பயனர்பெயர் ([Sauce Labs](https://saucelabs.com), [Browserstack](https://www.browserstack.com), [TestingBot](https://testingbot.com) அல்லது [LambdaTest](https://www.lambdatest.com) கணக்குகளுக்கு மட்டுமே செயல்படும்). அமைக்கப்பட்டிருந்தால், WebdriverIO தானாகவே இணைப்பு விருப்பங்களை அமைக்கும். நீங்கள் கிளவுட் வழங்குநரைப் பயன்படுத்தவில்லை எனில், இது வேறு எந்த WebDriver பின்னணியையும் அங்கீகரிக்கப் பயன்படுத்தலாம்.

வகை: `String`<br />
இயல்புநிலை: `undefined`

### key

உங்கள் கிளவுட் சேவை அணுகல் விசை அல்லது ரகசிய விசை ([Sauce Labs](https://saucelabs.com), [Browserstack](https://www.browserstack.com), [TestingBot](https://testingbot.com) அல்லது [LambdaTest](https://www.lambdatest.com) கணக்குகளுக்கு மட்டுமே செயல்படும்). அமைக்கப்பட்டிருந்தால், WebdriverIO தானாகவே இணைப்பு விருப்பங்களை அமைக்கும். நீங்கள் கிளவுட் வழங்குநரைப் பயன்படுத்தவில்லை எனில், இது வேறு எந்த WebDriver பின்னணியையும் அங்கீகரிக்கப் பயன்படுத்தலாம்.

வகை: `String`<br />
இயல்புநிலை: `undefined`

### capabilities

உங்கள் WebDriver அமர்வில் இயக்க விரும்பும் திறன்களை வரையறுக்கிறது. மேலும் விவரங்களுக்கு [WebDriver Protocol](https://w3c.github.io/webdriver/#capabilities) ஐப் பார்க்கவும். WebDriver நெறிமுறையை ஆதரிக்காத பழைய இயக்கியை இயக்கினால், அமர்வை வெற்றிகரமாக இயக்க [JSONWireProtocol capabilities](https://github.com/SeleniumHQ/selenium/wiki/DesiredCapabilities) ஐப் பயன்படுத்த வேண்டும்.

WebDriver அடிப்படையிலான திறன்களுக்கு அடுத்து, தொலைநிலை உலாவி அல்லது சாதனத்தின் ஆழமான கட்டமைப்பை அனுமதிக்கும் உலாவி மற்றும் விற்பனையாளர் குறிப்பிட்ட விருப்பங்களை நீங்கள் பயன்படுத்தலாம். இவை தொடர்புடைய விற்பனையாளர் ஆவணங்களில் ஆவணப்படுத்தப்பட்டுள்ளன, எ.கா.:

- `goog:chromeOptions`: [Google Chrome](https://chromedriver.chromium.org/capabilities#h.p_ID_106) க்கு
- `moz:firefoxOptions`: [Mozilla Firefox](https://firefox-source-docs.mozilla.org/testing/geckodriver/Capabilities.html) க்கு
- `ms:edgeOptions`: [Microsoft Edge](https://docs.microsoft.com/en-us/microsoft-edge/webdriver-chromium/capabilities-edge-options#using-the-edgeoptions-class) க்கு
- `sauce:options`: [Sauce Labs](https://docs.saucelabs.com/dev/test-configuration-options/#desktop-and-mobile-capabilities-sauce-specific--optional) க்கு
- `bstack:options`: [BrowserStack](https://www.browserstack.com/automate/capabilities?tag=selenium-4#) க்கு
- `selenoid:options`: [Selenoid](https://github.com/aerokube/selenoid/blob/master/docs/special-capabilities.adoc) க்கு

கூடுதலாக, Sauce Labs [Automated Test Configurator](https://docs.saucelabs.com/basics/platform-configurator/) என்பது உங்கள் விரும்பிய திறன்களை கிளிக் செய்வதன் மூலம் இந்த பொருளை உருவாக்க உதவும் பயனுள்ள கருவியாகும்.

வகை: `Object`<br />
இயல்புநிலை: `null`

**எடுத்துக்காட்டு:**

```js
{
    browserName: 'chrome', // options: `chrome`, `edge`, `firefox`, `safari`
    browserVersion: '27.0', // browser version
    platformName: 'Windows 10' // OS platform
}
```

நீங்கள் மொபைல் சாதனங்களில் வலை அல்லது நேடிவ் சோதனைகளை இயக்கினால், `capabilities` WebDriver நெறிமுறையிலிருந்து வேறுபடுகிறது. மேலும் விவரங்களுக்கு [Appium Docs](https://appium.github.io/appium.io/docs/en/writing-running-appium/caps/) ஐப் பார்க்கவும்.

### logLevel

பதிவுசெய்தல் வெளிப்படைத்தன்மை நிலை.

வகை: `String`<br />
இயல்புநிலை: `info`<br />
விருப்பங்கள்: `trace` | `debug` | `info` | `warn` | `error` | `silent`

### outputDir

அனைத்து testrunner பதிவு கோப்புகளையும் (அறிக்கையாளர் பதிவுகள் மற்றும் `wdio` பதிவுகள் உள்ளிட்டவை) சேமிக்க கோப்பகம். அமைக்கப்படவில்லை என்றால், அனைத்து பதிவுகளும் `stdout`க்கு ஸ்ட்ரீம் செய்யப்படுகின்றன. பெரும்பாலான அறிக்கையாளர்கள் `stdout`க்கு பதிவு செய்யும் வகையில் உருவாக்கப்பட்டுள்ளதால், அறிக்கையை ஒரு கோப்பிற்கு தள்ள அதிக அர்த்தமுள்ள குறிப்பிட்ட அறிக்கையாளர்களுக்கு மட்டுமே இந்த விருப்பத்தைப் பயன்படுத்த பரிந்துரைக்கப்படுகிறது (எடுத்துக்காட்டாக, `junit` அறிக்கையாளர்).

தனித்து நிற்கும் முறையில் இயங்கும்போது, WebdriverIO உருவாக்கிய ஒரே பதிவு `wdio` பதிவாக இருக்கும்.

வகை: `String`<br />
இயல்புநிலை: `null`

### connectionRetryTimeout

இயக்கி அல்லது கட்டத்திற்கான எந்த WebDriver கோரிக்கைக்கும் நேரம் முடிவு.

வகை: `Number`<br />
இயல்புநிலை: `120000`

### connectionRetryCount

Selenium சேவையகத்திற்கான கோரிக்கை மறுமுயற்சிகளின் அதிகபட்ச எண்ணிக்கை.

வகை: `Number`<br />
இயல்புநிலை: `3`

### agent

கோரிக்கைகளைச் செய்ய தனிப்பயன் `http`/`https`/`http2` [agent](https://www.npmjs.com/package/got#agent) ஐப் பயன்படுத்த உங்களை அனுமதிக்கிறது.

வகை: `Object`<br />
இயல்புநிலை:

```js
{
    http: new http.Agent({ keepAlive: true }),
    https: new https.Agent({ keepAlive: true })
}
```

### headers

ஒவ்வொரு WebDriver கோரிக்கையிலும் அனுப்ப தனிப்பயன் `headers` ஐக் குறிப்பிடவும். உங்கள் Selenium Grid அடிப்படை அங்கீகாரத்தை தேவைப்படுத்தினால், உங்கள் WebDriver கோரிக்கைகளை அங்கீகரிக்க இந்த விருப்பத்தின் மூலம் ஒரு `Authorization` header ஐ அனுப்ப பரிந்துரைக்கிறோம், எ.கா.:

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

WebDriver கோரிக்கை செய்யப்படுவதற்கு முன் [HTTP request options](https://github.com/sindresorhus/got#options) ஐ கட்டுப்படுத்தும் செயல்பாடு

வகை: `(RequestOptions) => RequestOptions`<br />
இயல்புநிலை: *எதுவுமில்லை*

### transformResponse

WebDriver பதில் வந்த பிறகு HTTP பதில் பொருள்களை கட்டுப்படுத்தும் செயல்பாடு. இந்த செயல்பாட்டிற்கு முதல் அளவுருவாக அசல் பதில் பொருளும், இரண்டாவது அளவுருவாக அதற்கு இணையான `RequestOptions` ஐயும் அனுப்பப்படுகிறது.

வகை: `(Response, RequestOptions) => Response`<br />
இயல்புநிலை: *எதுவுமில்லை*

### strictSSL

SSL சான்றிதழ் செல்லுபடியாகத் தேவையில்லை என்பதா.
இதை `STRICT_SSL` அல்லது `strict_ssl` என்ற சுற்றுச்சூழல் மாறிகள் மூலம் அமைக்கலாம்.

வகை: `Boolean`<br />
இயல்புநிலை: `true`

### enableDirectConnect

[Appium நேரடி இணைப்பு அம்சத்தை](https://appiumpro.com/editions/86-connecting-directly-to-appium-hosts-in-distributed-environments) இயக்குவதா.
கொடி இயக்கப்பட்டிருந்தாலும் பதிலில் சரியான விசைகள் இல்லாவிட்டால் இது எதுவும் செய்யாது.

வகை: `Boolean`<br />
இயல்புநிலை: `true`

### cacheDir

கேச் டைரக்டரியின் ரூட்டுக்கான பாதை. இந்த டைரக்டரி ஒரு அமர்வைத் தொடங்க முயற்சிக்கும்போது பதிவிறக்கம் செய்யப்படும் அனைத்து டிரைவர்களையும் சேமிக்கப் பயன்படுகிறது.

வகை: `String`<br />
இயல்புநிலை: `process.env.WEBDRIVER_CACHE_DIR || os.tmpdir()`

---

## WebdriverIO

பின்வரும் விருப்பங்களை (மேலே பட்டியலிடப்பட்டவையும் சேர்த்து) WebdriverIO-ஐ தனித்து பயன்படுத்தலாம்:

### automationProtocol

உங்கள் உலாவி தானியக்கத்திற்கு நீங்கள் பயன்படுத்த விரும்பும் நெறிமுறையை வரையறுக்கவும். தற்போது [`webdriver`](https://www.npmjs.com/package/webdriver) மட்டுமே ஆதரிக்கப்படுகிறது, ஏனெனில் இது WebdriverIO பயன்படுத்தும் முக்கிய உலாவி தானியக்க தொழில்நுட்பமாகும்.

நீங்கள் வேறு தானியக்க தொழில்நுட்பத்தைப் பயன்படுத்தி உலாவியை தானியக்கப்படுத்த விரும்பினால், இந்த பண்பை பின்வரும் இடைமுகத்தைக் கடைப்பிடிக்கும் ஒரு மதிப்புக்கு அமைக்கவும்:

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
- உங்கள் `url` அளவுரு `/` உடன் தொடங்கினால், `baseUrl` முன்னொட்டப்படும் (baseUrl பாதை இருந்தால் அதைத் தவிர).
- உங்கள் `url` அளவுரு ஒரு திட்டம் அல்லது `/` இல்லாமல் தொடங்கினால் (எ.கா. `some/path`), முழு `baseUrl` நேரடியாக முன்னொட்டப்படும்.

வகை: `String`<br />
இயல்புநிலை: `null`

### waitforTimeout

அனைத்து `waitFor*` கட்டளைகளுக்கும் இயல்புநிலை நேரம் முடிவு. (விருப்ப பெயரில் சிறிய `f` உள்ளதைக் கவனிக்கவும்.) இந்த நேரம் முடிவு `waitFor*` உடன் தொடங்கும் கட்டளைகளை __மட்டுமே__ பாதிக்கும் மற்றும் அவற்றின் இயல்புநிலை காத்திருப்பு நேரத்தை பாதிக்கும்.

ஒரு _சோதனைக்கான_ நேரம் முடிவை அதிகரிக்க, கட்டமைப்பு ஆவணங்களைப் பார்க்கவும்.

வகை: `Number`<br />
இயல்புநிலை: `5000`

### waitforInterval

எதிர்பார்க்கப்படும் நிலை (எ.கா., தெரிவுநிலை) மாற்றப்பட்டுள்ளதா என்பதைச் சரிபார்க்க அனைத்து `waitFor*` கட்டளைகளுக்கும் இயல்புநிலை இடைவெளி.

வகை: `Number`<br />
இயல்புநிலை: `100`

### region

Sauce Labs இல் இயங்கினால், வெவ்வேறு தரவு மையங்களுக்கு இடையே சோதனைகளை இயக்க நீங்கள் தேர்வு செய்யலாம்: US அல்லது EU.
உங்கள் பிராந்தியத்தை EU க்கு மாற்ற, உங்கள் கட்டமைப்பில் `region: 'eu'` சேர்க்கவும்.

__குறிப்பு:__ உங்கள் Sauce Labs கணக்குடன் இணைக்கப்பட்டுள்ள `user` மற்றும் `key` விருப்பங்களை நீங்கள் வழங்கினால் மட்டுமே இது பயனைப் பெறும்.

வகை: `String`<br />
இயல்புநிலை: `us`

*(vm மற்றும் அல்லது em/simulators க்கு மட்டுமே)*

---

## Testrunner விருப்பங்கள்

WDIO testrunner உடன் WebdriverIO ஐ இயக்குவதற்கு மட்டுமே பின்வரும் விருப்பங்கள் (மேலே பட்டியலிடப்பட்டவையும் சேர்த்து) வரையறுக்கப்பட்டுள்ளன:

### specs

சோதனை இயக்கத்திற்கான specs ஐ வரையறுக்கவும். நீங்கள் ஒரே நேரத்தில் பல கோப்புகளை பொருத்த ஒரு glob pattern ஐக் குறிப்பிடலாம் அல்லது ஒரு glob அல்லது பாதைகளை ஒரு தனி worker செயல்முறையில் இயக்க ஒரு அரைத்தடைக்குள் வைக்கலாம். அனைத்து பாதைகளும் கட்டமைப்பு கோப்பு பாதையிலிருந்து ஒப்பீட்டளவில் பார்க்கப்படுகின்றன.

வகை: `(String | String[])[]`<br />
இயல்புநிலை: `[]`

### exclude

சோதனை இயக்கத்திலிருந்து specs ஐ விலக்கவும். அனைத்து பாதைகளும் கட்டமைப்பு கோப்பு பாதையிலிருந்து ஒப்பீட்டளவில் பார்க்கப்படுகின்றன.

வகை: `String[]`<br />
இயல்புநிலை: `[]`

### suites

பல்வேறு suites ஐ விவரிக்கும் ஒரு பொருள், இதை நீங்கள் `wdio` CLI இல் `--suite` விருப்பத்துடன் குறிப்பிடலாம்.

வகை: `Object`<br />
இயல்புநிலை: `{}`

### capabilities

மேலே விவரிக்கப்பட்ட `capabilities` பிரிவுக்கு ஒத்ததுதான், ஆனால் [`multiremote`](/docs/multiremote) பொருளைக் குறிப்பிடும் விருப்பம் அல்லது இணை செயலாக்கத்திற்கான பல WebDriver அமர்வுகளை ஒரு வரிசையில் குறிப்பிடும் விருப்பம் உள்ளது.

[மேலே](/docs/configuration#capabilities) வரையறுக்கப்பட்டதைப் போலவே அதே விற்பனையாளர் மற்றும் உலாவி குறிப்பிட்ட திறன்களை நீங்கள் பயன்படுத்தலாம்.

வகை: `Object`|`Object[]`<br />
இயல்புநிலை: `[{ 'wdio:maxInstances': 5, browserName: 'firefox' }]`

### maxInstances

மொத்த இணை இயங்கும் workers இன் அதிகபட்ச எண்ணிக்கை.

__குறிப்பு:__ சோதனைகள் Sauce Labs போன்ற வெளிப்புற விற்பனையாளர்களின் இயந்திரங்களில் செய்யப்படும்போது, இது `100` போன்ற அதிக எண்ணிக்கையாக இருக்கலாம். அங்கே, சோதனைகள் ஒரு இயந்திரத்தில் மட்டுமல்ல, பல VMs களில் சோதிக்கப்படுகின்றன. சோதனைகள் உள்ளூர் மேம்பாட்டு இயந்திரத்தில் இயக்கப்பட வேண்டுமானால், `3`, `4`, அல்லது `5` போன்ற நியாயமான எண்ணை பயன்படுத்தவும். அடிப்படையில், இது ஒரே நேரத்தில் தொடங்கி உங்கள் சோதனைகளை இயக்கும் உலாவிகளின் எண்ணிக்கையாகும், எனவே இது உங்கள் இயந்திரத்தில் எவ்வளவு RAM உள்ளது மற்றும் உங்கள் இயந்திரத்தில் இயங்கும் மற்ற பயன்பாடுகளைப் பொறுத்தது.

`wdio:maxInstances` திறனைப் பயன்படுத்தி உங்கள் திறன் பொருள்களுக்குள் `maxInstances` ஐப் பயன்படுத்தலாம். இது அந்த குறிப்பிட்ட திறனுக்கான இணை அமர்வுகளின் எண்ணிக்கையை வரம்பிடும்.

வகை: `Number`<br />
இயல்புநிலை: `100`

### maxInstancesPerCapability

ஒரு திறனுக்கான மொத்த இணை இயங்கும் workers இன் அதிகபட்ச எண்ணிக்கை.

வகை: `Number`<br />
இயல்புநிலை: `100`

### injectGlobals

WebdriverIO இன் globals (எ.கா. `browser`, `$` மற்றும் `$$`) ஐ global சூழலில் செருகுகிறது.
நீங்கள் `false` என அமைத்தால், `@wdio/globals` இலிருந்து import செய்ய வேண்டும், எ.கா.:

```ts
import { browser, $, $$, expect } from '@wdio/globals'
```

குறிப்பு: WebdriverIO சோதனை கட்டமைப்பு குறிப்பிட்ட globals இன் உட்செலுத்தலை கையாளவில்லை.

வகை: `Boolean`<br />
இயல்புநிலை: `true`

### bail

குறிப்பிட்ட எண்ணிக்கையிலான சோதனை தோல்விகளுக்குப் பிறகு உங்கள் சோதனை ஓட்டத்தை நிறுத்த விரும்பினால், `bail` ஐப் பயன்படுத்தவும்.
(இது இயல்பாக `0` ஆக உள்ளது, இது எல்லா சோதனைகளையும் இயக்கும்.) **குறிப்பு:** இந்த சூழலில் ஒரு சோதனை என்பது ஒற்றை spec கோப்பில் உள்ள அனைத்து சோதனைகளும் (Mocha அல்லது Jasmine பயன்படுத்தும்போது) அல்லது ஒரு feature கோப்பில் உள்ள அனைத்து படிகளும் (Cucumber பயன்படுத்தும்போது). ஒரு தனி சோதனை கோப்பின் சோதனைகளுக்குள் bail நடத்தையைக் கட்டுப்படுத்த விரும்பினால், கிடைக்கக்கூடிய [கட்டமைப்பு](frameworks) விருப்பங்களைப் பார்க்கவும்.

வகை: `Number`<br />
இயல்புநிலை: `0` (bail செய்யாதே; அனைத்து சோதனைகளையும் இயக்கவும்)

### specFileRetries

முழுமையாக தோல்வியுறும் முழு specfile ஐ மறுமுயற்சி செய்யும் முறைகளின் எண்ணிக்கை.

வகை: `Number`<br />
இயல்புநிலை: `0`

### specFileRetriesDelay

Spec கோப்பு மறுமுயற்சி முயற்சிகளுக்கு இடையிலான தாமதம் (வினாடிகளில்)

வகை: `Number`<br />
இயல்புநிலை: `0`

### specFileRetriesDeferred

மறுமுயற்சி செய்யப்பட்ட spec கோப்புகள் உடனடியாக மறுமுயற்சி செய்யப்பட வேண்டுமா அல்லது வரிசையின் முடிவில் ஒத்திவைக்கப்பட வேண்டுமா.

வகை: `Boolean`<br />
இயல்புநிலை: `true`

### groupLogsByTestSpec

Log வெளியீடு பார்வையைத் தேர்வுசெய்க.

`false` என அமைக்கப்பட்டிருந்தால், வெவ்வேறு சோதனை கோப்புகளிலிருந்து வரும் பதிவுகள் நிகழ்நேரத்தில் அச்சிடப்படும். இணையாக இயங்கும்போது வெவ்வேறு கோப்புகளிலிருந்து log வெளியீடுகள் கலப்பதற்கு இது வழிவகுக்கும் என்பதை நினைவில் கொள்ளவும்.

`true` என அமைக்கப்பட்டிருந்தால், log வெளியீடுகள் Test Spec படி குழுவாக்கப்பட்டு, Test Spec முடிந்த பிறகே அச்சிடப்படும்.

இயல்பாக, இது `false` என அமைக்கப்பட்டுள்ளது, எனவே பதிவுகள் நிகழ்நேரத்தில் அச்சிடப்படுகின்றன.

வகை: `Boolean`<br />
இயல்புநிலை: `false`

### services

நீங்கள் கவனிக்க விரும்பாத ஒரு குறிப்பிட்ட வேலையை சேவைகள் ஏற்றுக்கொள்கின்றன. அவை கிட்டத்தட்ட எந்த முயற்சியும் இல்லாமல் உங்கள் சோதனை அமைப்பை மேம்படுத்துகின்றன.

வகை: `String[]|Object[]`<br />
இயல்புநிலை: `[]`

### framework

WDIO testrunner ஆல் பயன்படுத்தப்பட வேண்டிய சோதனை கட்டமைப்பை வரையறுக்கிறது.

வகை: `String`<br />
இயல்புநிலை: `mocha`<br />
விருப்பங்கள்: `mocha` | `jasmine`

### mochaOpts, jasmineOpts மற்றும் cucumberOpts

குறிப்பிட்ட கட்டமைப்பு தொடர்பான விருப்பங்கள். எந்த விருப்பங்கள் கிடைக்கும் என்பதைப் பற்றி கட்டமைப்பு அடாப்டர் ஆவணங்களைப் பார்க்கவும். [Frameworks](frameworks) இல் இதைப் பற்றி மேலும் படிக்கவும்.

வகை: `Object`<br />
இயல்புநிலை: `{ timeout: 10000 }`

### cucumberFeaturesWithLineNumbers

வரி எண்களுடன் கூடிய cucumber அம்சங்களின் பட்டியல் ([cucumber கட்டமைப்பைப் பயன்படுத்தும்போது](./Frameworks.md#using-cucumber)).

வகை: `String[]`
இயல்புநிலை: `[]`

### reporters

பயன்படுத்த வேண்டிய அறிக்கையாளர்களின் பட்டியல். ஒரு அறிக்கையாளர் ஒரு string ஆகவோ, அல்லது `['reporterName', { /* reporter options */}]` என்ற array ஆகவோ இருக்கலாம், இதில் முதல் element அறிக்கையாளரின் பெயரைக் கொண்ட string மற்றும் இரண்டாவது element அறிக்கையாளரின் விருப்பங்களைக் கொண்ட object.

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

அறிக்கையாளர்கள் தங்கள் பதிவுகளை ஒத்திசைக்கப்பட்டுள்ளதா என்பதை சரிபார்க்க வேண்டிய இடைவெளியை நிர்ணயிக்கிறது, அவர்கள் தங்கள் பதிவுகளை ஒத்திசைவற்ற முறையில் தெரிவிக்கும் போது (எ.கா. பதிவுகள் ஒரு 3வது தரப்பு விற்பனையாளருக்கு ஸ்ட்ரீம் செய்யப்பட்டால்).

வகை: `Number`<br />
இயல்புநிலை: `100` (ms)

### reporterSyncTimeout

அறிக்கையாளர்கள் தங்கள் அனைத்து பதிவுகளையும் பதிவேற்றுவதை முடிக்க வேண்டிய அதிகபட்ச நேரத்தை நிர்ணயிக்கிறது, அதன்பிறகு testrunner ஆல் ஒரு பிழை ஏற்படுகிறது.

வகை: `Number`<br />
இயல்புநிலை: `5000` (ms)

### execArgv

உள் செயல்முறைகளைத் தொடங்கும்போது குறிப்பிட வேண்டிய Node arguments.

வகை: `String[]`<br />
இயல்புநிலை: `null`

### filesToWatch

testrunner ஐ `--watch` flag உடன் இயக்கும்போது, கூடுதலாக பிற கோப்புகளை, எ.கா. பயன்பாட்டு கோப்புகளை கவனிக்க testrunner க்கு சொல்லும் glob ஆதரிக்கும் string patterns பட்டியல். இயல்பாக testrunner ஏற்கனவே அனைத்து spec கோப்புகளையும் கவனிக்கிறது.

வகை: `String[]`<br />
இயல்புநிலை: `[]`

### updateSnapshots

உங்கள் ஸ்னாப்ஷாட்களை புதுப்பிக்க விரும்பினால் true என அமைக்கவும். இதை CLI அளவுருவாகப் பயன்படுத்துவதே சிறந்தது, எ.கா. `wdio run wdio.conf.js --s`.

வகை: `'new' | 'all' | 'none'`<br />
இயல்புநிலை: வழங்கப்படவில்லை மற்றும் சோதனைகள் CI இல் இயங்கினால் `none`, வழங்கப்படவில்லை என்றால் `new`, இல்லையெனில் வழங்கப்பட்டது

### resolveSnapshotPath

இயல்புநிலை ஸ்னாப்ஷாட் பாதையை மாற்றியமைக்கிறது. எடுத்துக்காட்டாக, ஸ்னாப்ஷாட்களை சோதனை கோப்புகளுக்கு அடுத்து சேமிக்க.

```ts title="wdio.conf.ts"
export const config: WebdriverIO.Config = {
    resolveSnapshotPath: (testPath, snapExtension) => testPath + snapExtension,
}
```

வகை: `(testPath: string, snapExtension: string) => string`<br />
இயல்புநிலை: ஸ்னாப்ஷாட் கோப்புகளை சோதனை கோப்புக்கு அடுத்துள்ள `__snapshots__` கோப்பகத்தில் சேமிக்கிறது

### tsConfigPath

WDIO TypeScript கோப்புகளை தொகுக்க `tsx` ஐப் பயன்படுத்துகிறது. உங்கள் TSConfig தற்போதைய பணி செய்யும் கோப்பகத்திலிருந்து தானாகவே கண்டறியப்படுகிறது, ஆனால் நீங்கள் இங்கே ஒரு தனிப்பயன் பாதையைக் குறிப்பிடலாம் அல்லது TSX_TSCONFIG_PATH சுற்றுச்சூழல் மாறியை அமைக்கலாம்.

`tsx` ஆவணங்களைப் பார்க்கவும்: https://tsx.is/dev-api/node-cli#custom-tsconfig-json-path

வகை: `String`<br />
இயல்புநிலை: `null`<br />

## Hooks

WDIO testrunner சோதனை வாழ்க்கைச் சக்கரத்தின் குறிப்பிட்ட நேரங்களில் தூண்டப்படும் hooks ஐ அமைக்க அனுமதிக்கிறது. இது தனிப்பயன் செயல்களை அனுமதிக்கிறது (எ.கா. ஒரு சோதனை தோல்வியுற்றால் திரைப்பிடிப்பை எடுக்கவும்).

ஒவ்வொரு hook க்கும் அளவுருவாக வாழ்க்கைச் சக்கரத்தைப் பற்றிய குறிப்பிட்ட தகவல்கள் உள்ளன (எ.கா. சோதனை suite அல்லது சோதனைப் பற்றிய தகவல்). [எங்கள் உதாரண கட்டமைப்பில்](https://github.com/webdriverio/webdriverio/blob/master/examples/wdio.conf.js#L183-L326) அனைத்து hook பண்புகளைப் பற்றி மேலும் படிக்கவும்.

**குறிப்பு:** சில hooks (`onPrepare`, `onWorkerStart`, `onWorkerEnd` மற்றும் `onComplete`) வேறு செயல்முறையில் செயல்படுத்தப்படுகின்றன, எனவே worker செயல்முறையில் உள்ள மற்ற hooks உடன் எந்த global தரவையும் பகிர முடியாது.

### onPrepare

அனைத்து workers தொடங்குவதற்கு முன் ஒரு முறை செயல்படுத்தப்படுகிறது.

அளவுருக்கள்:

- `config` (`object`): WebdriverIO கட்டமைப்பு பொருள்
- `param` (`object[]`): திறன்கள் விவரங்களின் பட்டியல்

### onWorkerStart

ஒரு worker செயல்முறை உருவாக்கப்படுவதற்கு முன்பு செயல்படுத்தப்படுகிறது மற்றும் அந்த worker க்கான குறிப்பிட்ட சேவையை துவக்குவதற்கும், runtime சூழல்களை ஒத்திசைவற்ற முறையில் மாற்றுவதற்கும் பயன்படுத்தலாம்.

அளவுருக்கள்:

- `cid` (`string`): திறன் id (எ.கா 0-0)
- `caps` (`object`): worker இல் spawn செய்யப்படும் அமர்வுக்கான திறன்களைக் கொண்டுள்ளது
- `specs` (`string[]`): worker செயல்முறையில் இயக்கப்படும் specs
- `args` (`object`): worker துவக்கப்பட்டவுடன் முக்கிய கட்டமைப்புடன் இணைக்கப்படும் பொருள்
- `execArgv` (`string[]`): worker செயல்முறைக்கு அனுப்பப்பட்ட string arguments பட்டியல்

### onWorkerEnd

ஒரு worker செயல்முறை முடிந்த பிறகு செயல்படுத்தப்படுகிறது.

அளவுருக்கள்:

- `cid` (`string`): திறன் id (எ.கா 0-0)
- `exitCode` (`number`): 0 - வெற்றி, 1 - தோல்வி
- `specs` (`string[]`): worker செயல்முறையில் இயக்கப்படும் specs
- `retries` (`number`): [_"Add retries on a per-specfile basis"_](./Retry.md#add-retries-on-a-per-specfile-basis) இல் வரையறுக்கப்பட்டபடி பயன்படுத்தப்படும் spec நிலை மறுமுயற்சிகளின் எண்ணிக்கை

### beforeSession

webdriver அமர்வு மற்றும் சோதனை கட்டமைப்பை துவக்குவதற்கு சற்று முன்பு செயல்படுத்தப்படுகிறது. திறன் அல்லது spec ஐ பொறுத்து கட்டமைப்புகளை கையாள இது உங்களை அனுமதிக்கிறது.

அளவுருக்கள்:

- `config` (`object`): WebdriverIO கட்டமைப்பு பொருள்
- `caps` (`object`): worker இல் spawn செய்யப்படும் அமர்வுக்கான திறன்களைக் கொண்டுள்ளது
- `specs` (`string[]`): worker செயல்முறையில் இயக்கப்படும் specs

### before

சோதனை செயல்பாடு தொடங்குவதற்கு முன் செயல்படுத்தப்படுகிறது. இந்த புள்ளியில் நீங்கள் `browser` போன்ற அனைத்து உலகளாவிய மாறிகளையும் அணுகலாம். இது தனிப்பயன் கட்டளைகளை வரையறுக்க சரியான இடம்.

அளவுருக்கள்:

- `caps` (`object`): worker இல் spawn செய்யப்படும் அமர்வுக்கான திறன்களைக் கொண்டுள்ளது
- `specs` (`string[]`): worker செயல்முறையில் இயக்கப்படும் specs
- `browser` (`object`): உருவாக்கப்பட்ட உலாவி/சாதன அமர்வின் உதாரணம்

### beforeSuite

suite தொடங்குவதற்கு முன் செயல்படுத்தப்படும் hook (Mocha/Jasmine இல் மட்டுமே)

அளவுருக்கள்:

- `suite` (`object`): suite விவரங்கள்

### beforeHook

suite க்குள் ஒரு hook தொடங்குவதற்கு *முன்* செயல்படுத்தப்படும் hook (எ.கா. Mocha இல் beforeEach ஐ அழைப்பதற்கு முன் இயங்குகிறது)

அளவுருக்கள்:

- `test` (`object`): சோதனை விவரங்கள்
- `context` (`object`): சோதனை சூழல் (Cucumber இல் World பொருளைக் குறிக்கிறது)

### afterHook

suite க்குள் ஒரு hook முடிந்த *பிறகு* செயல்படுத்தப்படும் hook (எ.கா. Mocha இல் afterEach ஐ அழைத்த பிறகு இயங்குகிறது)

அளவுருக்கள்:

- `test` (`object`): சோதனை விவரங்கள்
- `context` (`object`): சோதனை சூழல் (Cucumber இல் World பொருளைக் குறிக்கிறது)
- `result` (`object`): hook முடிவு (`error`, `result`, `duration`, `passed`, `retries` பண்புகளைக் கொண்டுள்ளது)

### beforeTest

ஒரு சோதனைக்கு முன் செயல்படுத்தப்பட வேண்டிய செயல்பாடு (Mocha/Jasmine இல் மட்டுமே).

அளவுருக்கள்:

- `test` (`object`): சோதனை விவரங்கள்
- `context` (`object`): சோதனை செயல்படுத்தப்பட்ட நோக்க பொருள்

### beforeCommand

ஒரு WebdriverIO கட்டளை செயல்படுத்தப்படுவதற்கு முன் இயங்குகிறது.

அளவுருக்கள்:

- `commandName` (`string`): கட்டளை பெயர்
- `args` (`*`): கட்டளை பெறும் arguments

### afterCommand

ஒரு WebdriverIO கட்டளை செயல்படுத்தப்பட்ட பிறகு இயங்குகிறது.

அளவுருக்கள்:

- `commandName` (`string`): கட்டளை பெயர்
- `args` (`*`): கட்டளை பெறும் arguments
- `result` (`number`): 0 - கட்டளை வெற்றி, 1 - கட்டளை பிழை
- `error` (`Error`): பிழை பொருள் (ஏதேனும் இருந்தால்)

### afterTest

ஒரு சோதனை (Mocha/Jasmine இல்) முடிந்த பிறகு செயல்படுத்தப்பட வேண்டிய செயல்பாடு.

அளவுருக்கள்:

- `test` (`object`): சோதனை விவரங்கள்
- `context` (`object`): சோதனை செயல்படுத்தப்பட்ட நோக்க பொருள்
- `result.error` (`Error`): சோதனை தோல்வியுற்றால் பிழை பொருள், இல்லையெனில் `undefined`
- `result.result` (`Any`): சோதனை செயல்பாட்டின் திரும்ப பொருள்
- `result.duration` (`Number`): சோதனையின் கால அளவு
- `result.passed` (`Boolean`): சோதனை தேர்ச்சி பெற்றிருந்தால் true, இல்லையெனில் false
- `result.retries` (`Object`): [Mocha மற்றும் Jasmine](./Retry.md#rerun-single-tests-in-jasmine-or-mocha) மற்றும் [Cucumber](./Retry.md#rerunning-in-cucumber) க்கு வரையறுக்கப்பட்டபடி தனி சோதனை தொடர்பான மறுமுயற்சிகளைப் பற்றிய தகவல்கள், எ.கா. `{ attempts: 0, limit: 0 }`, பார்க்கவும்
- `result` (`object`): hook முடிவு (`error`, `result`, `duration`, `passed`, `retries` பண்புகளைக் கொண்டுள்ளது)

### afterSuite

சோதனை suite முடிந்த பிறகு செயல்படுத்தப்படும் hook (Mocha/Jasmine இல் மட்டுமே)

அளவுருக்கள்:

- `suite` (`object`): suite விவரங்கள்

### after

அனைத்து சோதனைகளும் முடிந்த பிறகு செயல்படுத்தப்படுகிறது. சோதனையிலிருந்து அனைத்து உலகளாவிய மாறிகளையும் நீங்கள் இன்னும் அணுகலாம்.

அளவுருக்கள்:

- `result` (`number`): 0 - சோதனை தேர்ச்சி, 1 - சோதனை தோல்வி
- `caps` (`object`): worker இல் spawn செய்யப்படும் அமர்வுக்கான திறன்களைக் கொண்டுள்ளது
- `specs` (`string[]`): worker செயல்முறையில் இயக்கப்படும் specs

### afterSession

webdriver அமர்வை நிறுத்திய பிறகு செயல்படுத்தப்படுகிறது.

அளவுருக்கள்:

- `config` (`object`): WebdriverIO கட்டமைப்பு பொருள்
- `caps` (`object`): worker இல் spawn செய்யப்படும் அமர்வுக்கான திறன்களைக் கொண்டுள்ளது
- `specs` (`string[]`): worker செயல்முறையில் இயக்கப்படும் specs

### onComplete

அனைத்து workers மூடப்பட்ட பிறகு செயல்முறை வெளியேறும் நிலையில் செயல்படுத்தப்படுகிறது. onComplete hook இல் ஏற்படும் பிழை சோதனை ஓட்டம் தோல்வியடைய காரணமாகிறது.

அளவுருக்கள்:

- `exitCode` (`number`): 0 - வெற்றி, 1 - தோல்வி
- `config` (`object`): WebdriverIO கட்டமைப்பு பொருள்
- `caps` (`object`): worker இல் spawn செய்யப்படும் அமர்வுக்கான திறன்களைக் கொண்டுள்ளது
- `result` (`object`): சோதனை முடிவுகளைக் கொண்ட முடிவுகள் பொருள்

### onReload

பக்கம் ரீலோட் ஆகும்போது செயல்படுத்தப்படுகிறது.

அளவுருக்கள்:

- `oldSessionId` (`string`): பழைய அமர்வின் அமர்வு ID
- `newSessionId` (`string`): புதிய அமர்வின் அமர்வு ID

### beforeFeature

Cucumber அம்சத்திற்கு முன் இயங்குகிறது.

அளவுருக்கள்:

- `uri` (`string`): feature கோப்பிற்கான பாதை
- `feature` ([`GherkinDocument.IFeature`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/json-to-messages/javascript/src/cucumber-generic/JSONSchema.ts#L8-L17)): Cucumber feature பொருள்

### afterFeature

Cucumber அம்சத்திற்குப் பிறகு இயங்குகிறது.

அளவுருக்கள்:

- `uri` (`string`): feature கோப்பிற்கான பாதை
- `feature` ([`GherkinDocument.IFeature`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/json-to-messages/javascript/src/cucumber-generic/JSONSchema.ts#L8-L17)): Cucumber feature பொருள்

### beforeScenario

Cucumber சூழலுக்கு முன் இயங்குகிறது.

அளவுருக்கள்:

- `world` ([`ITestCaseHookParameter`](https://github.com/cucumber/cucumber-js/blob/ac124f7b2be5fa54d904c7feac077a2657b19440/src/support_code_library_builder/types.ts#L10-L15)): pickle மற்றும் சோதனை படி பற்றிய தகவல்களைக் கொண்ட உலக பொருள்
- `context` (`object`): Cucumber World பொருள்

### afterScenario

Cucumber சூழலுக்குப் பிறகு இயங்குகிறது.

அளவுருக்கள்:

- `world` ([`ITestCaseHookParameter`](https://github.com/cucumber/cucumber-js/blob/ac124f7b2be5fa54d904c7feac077a2657b19440/src/support_code_library_builder/types.ts#L10-L15)): pickle மற்றும் சோதனை படி பற்றிய தகவல்களைக் கொண்ட உலக பொருள்
- `result` (`object`): சூழல் முடிவுகளைக் கொண்ட முடிவுகள் பொருள்
- `result.passed` (`boolean`): சூழல் தேர்ச்சி பெற்றிருந்தால் true
- `result.error` (`string`): சூழல் தோல்வியுற்றால் பிழை stack
- `result.duration` (`number`): மில்லி வினாடிகளில் சூழலின் கால அளவு
- `context` (`object`): Cucumber World பொருள்

### beforeStep

Cucumber படிக்கு முன் இயங்குகிறது.

அளவுருக்கள்:

- `step` ([`Pickle.IPickleStep`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/messages/jsonschema/Pickle.json#L20-L49)): Cucumber step பொருள்
- `scenario` ([`IPickle`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/messages/jsonschema/Pickle.json#L137-L175)): Cucumber scenario பொருள்
- `context` (`object`): Cucumber World பொருள்

### afterStep

Cucumber படிக்குப் பிறகு இயங்குகிறது.

அளவுருக்கள்:

- `step` ([`Pickle.IPickleStep`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/messages/jsonschema/Pickle.json#L20-L49)): Cucumber step பொருள்
- `scenario` ([`IPickle`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/messages/jsonschema/Pickle.json#L137-L175)): Cucumber scenario பொருள்
- `result`: (`object`): படி முடிவுகளைக் கொண்ட முடிவுகள் பொருள்
- `result.passed` (`boolean`): சூழல் தேர்ச்சி பெற்றிருந்தால் true
- `result.error` (`string`): சூழல் தோல்வியுற்றால் பிழை stack
- `result.duration` (`number`): மில்லி வினாடிகளில் சூழலின் கால அளவு
- `context` (`object`): Cucumber World பொருள்

### beforeAssertion

WebdriverIO உறுதிப்படுத்தல் நடக்கும் முன் இயக்கப்படும் hook.

அளவுருக்கள்:

- `params`: உறுதிப்படுத்தல் தகவல்
- `params.matcherName` (`string`): matcher இன் பெயர் (எ.கா. `toHaveTitle`)
- `params.expectedValue`: matcher க்கு அனுப்பப்படும் மதிப்பு
- `params.options`: உறுதிப்படுத்தல் விருப்பங்கள்

### afterAssertion

WebdriverIO உறுதிப்படுத்தல் நடந்த பிறகு இயக்கப்படும் hook.

அளவுருக்கள்:

- `params`: உறுதிப்படுத்தல் தகவல்
- `params.matcherName` (`string`): matcher இன் பெயர் (எ.கா. `toHaveTitle`)
- `params.expectedValue`: matcher க்கு அனுப்பப்படும் மதிப்பு
- `params.options`: உறுதிப்படுத்தல் விருப்பங்கள்
- `params.result`: உறுதிப்படுத்தல் முடிவுகள்