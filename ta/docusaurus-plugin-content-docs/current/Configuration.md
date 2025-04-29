---
id: configuration
title: கட்டமைப்பு
---

[அமைப்பு வகை](/docs/setuptypes) அடிப்படையில் (எ.கா. raw protocol bindings, தனித்த தொகுப்பாக WebdriverIO அல்லது WDIO டெஸ்ட்ரன்னர் பயன்படுத்துதல்) சூழலை கட்டுப்படுத்த பல்வேறு விருப்பங்கள் உள்ளன.

## WebDriver விருப்பங்கள்

[`webdriver`](https://www.npmjs.com/package/webdriver) protocol தொகுப்பைப் பயன்படுத்தும்போது பின்வரும் விருப்பங்கள் வரையறுக்கப்படுகின்றன:

### protocol

டிரைவர் சேவையகத்துடன் தொடர்பு கொள்ள பயன்படுத்தப்படும் நெறிமுறை.

வகை: `String`<br />
இயல்புநிலை: `http`

### hostname

உங்கள் டிரைவர் சேவையகத்தின் ஹோஸ்ட்.

வகை: `String`<br />
இயல்புநிலை: `0.0.0.0`

### port

உங்கள் டிரைவர் சேவையகம் இருக்கும் போர்ட்.

வகை: `Number`<br />
இயல்புநிலை: `undefined`

### path

டிரைவர் சேவையக எண்ட்பாயிண்ட் பாதை.

வகை: `String`<br />
இயல்புநிலை: `/`

### queryParams

டிரைவர் சேவையகத்திற்கு அனுப்பப்படும் வினவல் அளவுருக்கள்.

வகை: `Object`<br />
இயல்புநிலை: `undefined`

### user

உங்கள் கிளவுட் சேவை பயனர்பெயர் ([Sauce Labs](https://saucelabs.com), [Browserstack](https://www.browserstack.com), [TestingBot](https://testingbot.com) அல்லது [LambdaTest](https://www.lambdatest.com) கணக்குகளுக்கு மட்டுமே செயல்படும்). அமைக்கப்பட்டால், WebdriverIO தானாகவே இணைப்பு விருப்பங்களை அமைக்கும். நீங்கள் கிளவுட் வழங்குநரைப் பயன்படுத்தவில்லை எனில், வேறு எந்த WebDriver பின்புலத்தையும் அங்கீகரிக்க இதைப் பயன்படுத்தலாம்.

வகை: `String`<br />
இயல்புநிலை: `undefined`

### key

உங்கள் கிளவுட் சேவை அணுகல் விசை அல்லது ரகசிய விசை ([Sauce Labs](https://saucelabs.com), [Browserstack](https://www.browserstack.com), [TestingBot](https://testingbot.com) அல்லது [LambdaTest](https://www.lambdatest.com) கணக்குகளுக்கு மட்டுமே செயல்படும்). அமைக்கப்பட்டால், WebdriverIO தானாகவே இணைப்பு விருப்பங்களை அமைக்கும். நீங்கள் கிளவுட் வழங்குநரைப் பயன்படுத்தவில்லை எனில், வேறு எந்த WebDriver பின்புலத்தையும் அங்கீகரிக்க இதைப் பயன்படுத்தலாம்.

வகை: `String`<br />
இயல்புநிலை: `undefined`

### capabilities

உங்கள் WebDriver அமர்வில் இயக்க விரும்பும் திறன்களை வரையறுக்கிறது. மேலும் விவரங்களுக்கு [WebDriver Protocol](https://w3c.github.io/webdriver/#capabilities) ஐப் பார்க்கவும். WebDriver நெறிமுறையை ஆதரிக்காத பழைய டிரைவரை இயக்கினால், அமர்வை வெற்றிகரமாக இயக்க [JSONWireProtocol capabilities](https://github.com/SeleniumHQ/selenium/wiki/DesiredCapabilities) பயன்படுத்த வேண்டியிருக்கும்.

WebDriver அடிப்படையிலான திறன்களுக்கு அடுத்ததாக, தொலைநிலை உலாவி அல்லது சாதனத்தில் ஆழமான கட்டமைப்பை அனுமதிக்கும் உலாவி மற்றும் விற்பனையாளர் குறிப்பிட்ட விருப்பங்களை நீங்கள் பயன்படுத்தலாம். இவை சம்பந்தப்பட்ட விற்பனையாளர் ஆவணங்களில் ஆவணப்படுத்தப்பட்டுள்ளன, எ.கா.:

- `goog:chromeOptions`: [Google Chrome](https://chromedriver.chromium.org/capabilities#h.p_ID_106) க்காக
- `moz:firefoxOptions`: [Mozilla Firefox](https://firefox-source-docs.mozilla.org/testing/geckodriver/Capabilities.html) க்காக
- `ms:edgeOptions`: [Microsoft Edge](https://docs.microsoft.com/en-us/microsoft-edge/webdriver-chromium/capabilities-edge-options#using-the-edgeoptions-class) க்காக
- `sauce:options`: [Sauce Labs](https://docs.saucelabs.com/dev/test-configuration-options/#desktop-and-mobile-capabilities-sauce-specific--optional) க்காக
- `bstack:options`: [BrowserStack](https://www.browserstack.com/automate/capabilities?tag=selenium-4#) க்காக
- `selenoid:options`: [Selenoid](https://github.com/aerokube/selenoid/blob/master/docs/special-capabilities.adoc) க்காக

கூடுதலாக, Sauce Labs [Automated Test Configurator](https://docs.saucelabs.com/basics/platform-configurator/) என்ற பயனுள்ள கருவி, உங்கள் விரும்பிய திறன்களை கிளிக் செய்து இந்த பொருளை உருவாக்க உதவுகிறது.

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

நீங்கள் மொபைல் சாதனங்களில் வெப் அல்லது நேட்டிவ் சோதனைகளை இயக்கினால், `capabilities` WebDriver நெறிமுறையிலிருந்து வேறுபடுகிறது. மேலும் விவரங்களுக்கு [Appium Docs](https://appium.github.io/appium.io/docs/en/writing-running-appium/caps/) ஐப் பார்க்கவும்.

### logLevel

பதிவு வெளியீட்டின் அளவு.

வகை: `String`<br />
இயல்புநிலை: `info`<br />
விருப்பங்கள்: `trace` | `debug` | `info` | `warn` | `error` | `silent`

### outputDir

அனைத்து டெஸ்ட்ரன்னர் பதிவு கோப்புகளையும் (அறிக்கை பதிவுகள் மற்றும் `wdio` பதிவுகள் உட்பட) சேமிக்க கோப்பகம். அமைக்கப்படவில்லை என்றால், அனைத்து பதிவுகளும் `stdout`க்கு அனுப்பப்படும். பெரும்பாலான அறிக்கையாளர்கள் `stdout`க்கு அறிக்கையிட உருவாக்கப்பட்டுள்ளதால், குறிப்பிட்ட அறிக்கையாளர்களுக்கு மட்டுமே இந்த விருப்பத்தைப் பயன்படுத்துவது சிறந்தது, அதாவது அறிக்கையை ஒரு கோப்புக்குள் அனுப்புவது (உதாரணமாக `junit` அறிக்கையாளர்).

தனித்த நிலையில் இயங்கும்போது, WebdriverIO உருவாக்கிய ஒரே பதிவு `wdio` பதிவு மட்டுமே.

வகை: `String`<br />
இயல்புநிலை: `null`

### connectionRetryTimeout

டிரைவர் அல்லது கிரிட்டுக்கு எந்த WebDriver கோரிக்கையின் காலவரம்பு.

வகை: `Number`<br />
இயல்புநிலை: `120000`

### connectionRetryCount

செலீனியம் சேவையகத்திற்கான கோரிக்கை மறுமுயற்சிகளின் அதிகபட்ச எண்ணிக்கை.

வகை: `Number`<br />
இயல்புநிலை: `3`

### agent

கோரிக்கைகளை செய்ய வழக்கமான` http`/`https`/`http2` [agent](https://www.npmjs.com/package/got#agent) ஐப் பயன்படுத்த அனுமதிக்கிறது.

வகை: `Object`<br />
இயல்புநிலை:

```js
{
    http: new http.Agent({ keepAlive: true }),
    https: new https.Agent({ keepAlive: true })
}
```

### headers

ஒவ்வொரு WebDriver கோரிக்கைக்கும் அனுப்ப விரும்பிய தனிப்பயன் `headers` ஐக் குறிப்பிடவும். உங்கள் செலீனியம் கிரிட் அடிப்படை அங்கீகாரத்தை (Basic Authentication) தேவைப்படுத்தினால், உங்கள் WebDriver கோரிக்கைகளை அங்கீகரிக்க இந்த விருப்பத்தின் மூலம் `Authorization` header ஐ அனுப்ப பரிந்துரைக்கிறோம், எ.கா.:

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

WebDriver கோரிக்கை செய்யப்படுவதற்கு முன் [HTTP request options](https://github.com/sindresorhus/got#options) ஐ இடைமறிக்கும் செயல்பாடு

வகை: `(RequestOptions) => RequestOptions`<br />
இயல்புநிலை: *இல்லை*

### transformResponse

WebDriver பதில் வந்த பிறகு HTTP பதில் பொருள்களை இடைமறிக்கும் செயல்பாடு. முதல் அளவுருவாக அசல் பதில் பொருள் மற்றும் இரண்டாவதாக தொடர்புடைய `RequestOptions` செயல்பாட்டிற்கு அனுப்பப்படுகிறது.

வகை: `(Response, RequestOptions) => Response`<br />
இயல்புநிலை: *இல்லை*

### strictSSL

SSL சான்றிதழ் செல்லுபடியாகத் தேவையில்லை என்பதை குறிக்கிறது.
இதை `STRICT_SSL` அல்லது `strict_ssl` என்ற சூழல் மாறிகள் மூலம் அமைக்கலாம்.

வகை: `Boolean`<br />
இயல்புநிலை: `true`

### enableDirectConnect

[Appium நேரடி இணைப்பு அம்சத்தை](https://appiumpro.com/editions/86-connecting-directly-to-appium-hosts-in-distributed-environments) இயக்க வேண்டுமா.
கொடி இயக்கப்பட்டிருந்தாலும், பதிலில் முறையான விசைகள் இல்லாவிட்டால் எதுவும் செய்யாது.

வகை: `Boolean`<br />
இயல்புநிலை: `true`

### cacheDir

கேச் கோப்பகத்தின் ரூட் பாதை. அமர்வைத் தொடங்க முயற்சிக்கும்போது பதிவிறக்கம் செய்யப்படும் அனைத்து டிரைவர்களையும் சேமிக்க இந்த கோப்பகம் பயன்படுத்தப்படுகிறது.

வகை: `String`<br />
இயல்புநிலை: `process.env.WEBDRIVER_CACHE_DIR || os.tmpdir()`

---

## WebdriverIO

பின்வரும் விருப்பங்களை (மேலே பட்டியலிடப்பட்டவையும் சேர்த்து) தனித்து இயங்கும் WebdriverIO உடன் பயன்படுத்தலாம்:

### automationProtocol

உங்கள் உலாவி ஆட்டோமேஷனுக்காக நீங்கள் பயன்படுத்த விரும்பும் நெறிமுறையை வரையறுக்கவும். தற்போது [`webdriver`](https://www.npmjs.com/package/webdriver) மட்டுமே ஆதரிக்கப்படுகிறது, ஏனெனில் இது WebdriverIO பயன்படுத்தும் முக்கிய உலாவி ஆட்டோமேஷன் தொழில்நுட்பமாகும்.

வேறு ஆட்டோமேஷன் தொழில்நுட்பத்தைப் பயன்படுத்தி உலாவியை ஆட்டோமேட் செய்ய விரும்பினால், பின்வரும் இடைமுகத்தைக் கடைப்பிடிக்கும் தொகுதியாக தீர்மானிக்கப்படும் பாதைக்கு இந்த பண்பை அமைக்கவும்:

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

அடிப்படை URL ஐ அமைப்பதன் மூலம் `url` கட்டளை அழைப்புகளைக் குறைக்கவும்.
- உங்கள் `url` அளவுரு `/` உடன் தொடங்கினால், `baseUrl` முன்னொட்டாக சேர்க்கப்படும் (`baseUrl` பாதை இருந்தால் அதைத் தவிர).
- உங்கள் `url` அளவுரு திட்டம் அல்லது `/` இல்லாமல் தொடங்கினால் (எ.கா. `some/path`), முழு `baseUrl` நேரடியாக முன்னொட்டாக சேர்க்கப்படும்.

வகை: `String`<br />
இயல்புநிலை: `null`

### waitforTimeout

அனைத்து `waitFor*` கட்டளைகளுக்கான இயல்புநிலை நேரம் முடிவு. (விருப்ப பெயரில் lowercase `f` ஐக் கவனிக்கவும்.) இந்த நேரம் முடிவு `waitFor*` உடன் தொடங்கும் கட்டளைகளை மட்டுமே பாதிக்கும் மற்றும் அவற்றின் இயல்புநிலை காத்திருப்பு நேரம்.

ஒரு _சோதனைக்கான_ நேரம் முடிவை அதிகரிக்க, கட்டமைப்பு ஆவணங்களைப் பார்க்கவும்.

வகை: `Number`<br />
இயல்புநிலை: `5000`

### waitforInterval

எதிர்பார்க்கப்படும் நிலை (எ.கா., காட்சித்தன்மை) மாற்றப்பட்டுள்ளதா என்பதைச் சரிபார்க்க அனைத்து `waitFor*` கட்டளைகளுக்கும் இயல்புநிலை இடைவெளி.

வகை: `Number`<br />
இயல்புநிலை: `100`

### region

Sauce Labs இல் இயங்கும்போது, வெவ்வேறு தரவு மையங்களுக்கு இடையே சோதனைகளை இயக்கத் தேர்வு செய்யலாம்: US அல்லது EU.
உங்கள் பிராந்தியத்தை EU க்கு மாற்ற, உங்கள் கட்டமைப்பில் `region: 'eu'` சேர்க்கவும்.

__குறிப்பு:__ உங்கள் Sauce Labs கணக்குடன் இணைக்கப்பட்ட `user` மற்றும் `key` விருப்பங்களை வழங்கினால் மட்டுமே இது செயல்படும்.

வகை: `String`<br />
இயல்புநிலை: `us`

*(vm மற்றும் em/simulators க்கு மட்டுமே)*

---

## Testrunner விருப்பங்கள்

WDIO டெஸ்ட்ரன்னருடன் WebdriverIO ஐ இயக்குவதற்கு பின்வரும் விருப்பங்கள் (மேலே பட்டியலிடப்பட்டவையும் சேர்த்து) வரையறுக்கப்பட்டுள்ளன:

### specs

சோதனை இயக்கத்திற்கான specs ஐ வரையறுக்கவும். ஒரே நேரத்தில் பல கோப்புகளைப் பொருத்த glob pattern ஐக் குறிப்பிடலாம் அல்லது ஒற்றை worker செயல்முறையில் இயக்க glob அல்லது பாதைகளின் தொகுப்பை array இல் wrap செய்யலாம். அனைத்து பாதைகளும் config கோப்பு பாதையிலிருந்து தொடர்புடையதாகக் காணப்படுகின்றன.

வகை: `(String | String[])[]`<br />
இயல்புநிலை: `[]`

### exclude

சோதனை இயக்கத்திலிருந்து specs ஐ விலக்கவும். அனைத்து பாதைகளும் config கோப்பு பாதையிலிருந்து தொடர்புடையதாகக் காணப்படுகின்றன.

வகை: `String[]`<br />
இயல்புநிலை: `[]`

### suites

பல்வேறு suites ஐ விவரிக்கும் ஒரு பொருள், இதை `wdio` CLI இல் `--suite` விருப்பத்துடன் குறிப்பிடலாம்.

வகை: `Object`<br />
இயல்புநிலை: `{}`

### capabilities

மேலே விவரிக்கப்பட்டுள்ள `capabilities` பிரிவு போலவே, ஆனால் [`multiremote`](/docs/multiremote) பொருளைக் குறிப்பிடும் விருப்பம் அல்லது இணை இயக்கத்திற்கு அரேயில் பல WebDriver அமர்வுகள்.

மேலே [வரையறுக்கப்பட்டுள்ள](/docs/configuration#capabilities) அதே விற்பனையாளர் மற்றும் உலாவி குறிப்பிட்ட திறன்களைப் பயன்படுத்தலாம்.

வகை: `Object`|`Object[]`<br />
இயல்புநிலை: `[{ 'wdio:maxInstances': 5, browserName: 'firefox' }]`

### maxInstances

மொத்த இணை worker களின் அதிகபட்ச எண்ணிக்கை.

__குறிப்பு:__ சோதனைகள் Sauce Labs போன்ற வெளிப்புற விற்பனையாளர்களின் எந்திரங்களில் செய்யப்படும்போது இது `100` போன்ற உயர்ந்த எண்ணாக இருக்கலாம். அங்கு, சோதனைகள் ஒரு எந்திரத்தில் அல்ல, பல VMs இல் சோதிக்கப்படுகின்றன. சோதனைகள் உள்ளூர் மேம்பாட்டு எந்திரத்தில் இயக்கப்பட வேண்டுமெனில், `3`, `4`, அல்லது `5` போன்ற நியாயமான எண்ணைப் பயன்படுத்தவும். அடிப்படையில், இது ஒரே நேரத்தில் தொடங்கப்பட்டு உங்கள் சோதனைகளை இயக்கும் உலாவிகளின் எண்ணிக்கை, எனவே உங்கள் எந்திரத்தில் எவ்வளவு RAM உள்ளது மற்றும் வேறு எத்தனை பயன்பாடுகள் இயங்குகின்றன என்பதைப் பொறுத்தது.

உங்கள் திறன் பொருள்களில் `wdio:maxInstances` திறனைப் பயன்படுத்தி `maxInstances` ஐயும் பயன்படுத்தலாம். இது அந்த குறிப்பிட்ட திறனுக்கான இணை அமர்வுகளின் அளவை வரம்பிடும்.

வகை: `Number`<br />
இயல்புநிலை: `100`

### maxInstancesPerCapability

ஒரு திறனுக்கான மொத்த இணை worker களின் அதிகபட்ச எண்ணிக்கை.

வகை: `Number`<br />
இயல்புநிலை: `100`

### injectGlobals

WebdriverIO இன் globals (எ.கா. `browser`, `$` மற்றும் `$$`) ஐ உலகளாவிய சூழலில் செருகுகிறது.
`false` என அமைத்தால், `@wdio/globals` இலிருந்து import செய்ய வேண்டும், எ.கா.:

```ts
import { browser, $, $$, expect } from '@wdio/globals'
```

குறிப்பு: WebdriverIO சோதனை கட்டமைப்பு குறிப்பிட்ட globals இன் செருகலை கையாளவில்லை.

வகை: `Boolean`<br />
இயல்புநிலை: `true`

### bail

குறிப்பிட்ட எண்ணிக்கையிலான சோதனை தோல்விகளுக்குப் பிறகு உங்கள் சோதனை ஓட்டத்தை நிறுத்த விரும்பினால், `bail` ஐப் பயன்படுத்தவும்.
(இது இயல்பாக `0` ஆகும், இது எவ்வாறாயினும் அனைத்து சோதனைகளையும் இயக்குகிறது.) **குறிப்பு:** இந்த சூழலில் ஒரு சோதனை என்பது ஒற்றை spec கோப்பில் உள்ள அனைத்து சோதனைகளும் (Mocha அல்லது Jasmine பயன்படுத்தும்போது) அல்லது அம்ச கோப்பில் உள்ள அனைத்து படிகளும் (Cucumber பயன்படுத்தும்போது). ஒற்றை சோதனை கோப்பின் சோதனைகளில் bail செயல்பாட்டைக் கட்டுப்படுத்த விரும்பினால், கிடைக்கக்கூடிய [கட்டமைப்பு](frameworks) விருப்பங்களைப் பார்க்கவும்.

வகை: `Number`<br />
இயல்புநிலை: `0` (bail இல்லை; அனைத்து சோதனைகளையும் இயக்கு)

### specFileRetries

முழுமையாக தோல்வியடையும்போது ஒரு முழு specfile ஐ மீண்டும் முயற்சிக்கும் முறைகளின் எண்ணிக்கை.

வகை: `Number`<br />
இயல்புநிலை: `0`

### specFileRetriesDelay

Spec file மறுமுயற்சி முயற்சிகளுக்கு இடையேயான தாமதம் (வினாடிகளில்)

வகை: `Number`<br />
இயல்புநிலை: `0`

### specFileRetriesDeferred

மறுமுயற்சி செய்யப்பட்ட spec கோப்புகள் உடனடியாக மறுமுயற்சி செய்யப்பட வேண்டுமா அல்லது வரிசையின் இறுதிக்கு ஒத்திவைக்கப்பட வேண்டுமா.

வகை: `Boolean`<br />
இயல்புநிலை: `true`

### groupLogsByTestSpec

பதிவு வெளியீடு காட்சியைத் தேர்வு செய்யவும்.

`false` என அமைக்கப்பட்டால், வெவ்வேறு சோதனை கோப்புகளின் பதிவுகள் நிகழ்நேரத்தில் அச்சிடப்படும். இணையாக இயங்கும் போது வெவ்வேறு கோப்புகளின் பதிவு வெளியீடுகள் கலக்கலாம் என்பதை கவனிக்கவும்.

`true` என அமைக்கப்பட்டால், பதிவு வெளியீடுகள் சோதனை Spec படி குழுப்படுத்தப்பட்டு சோதனை Spec முடிந்த பிறகே அச்சிடப்படும்.

இயல்பாக, இது `false` என அமைக்கப்பட்டுள்ளது, எனவே பதிவுகள் நிகழ்நேரத்தில் அச்சிடப்படுகின்றன.

வகை: `Boolean`<br />
இயல்புநிலை: `false`

### services

நீங்கள் கவனிக்க விரும்பாத ஒரு குறிப்பிட்ட வேலையை சேவைகள் ஏற்றுக்கொள்கின்றன. அவை உங்கள் சோதனை அமைப்பை கிட்டத்தட்ட எந்த முயற்சியும் இல்லாமல் மேம்படுத்துகின்றன.

வகை: `String[]|Object[]`<br />
இயல்புநிலை: `[]`

### framework

WDIO டெஸ்ட்ரன்னரால் பயன்படுத்தப்படும் சோதனை கட்டமைப்பை வரையறுக்கிறது.

வகை: `String`<br />
இயல்புநிலை: `mocha`<br />
விருப்பங்கள்: `mocha` | `jasmine`

### mochaOpts, jasmineOpts மற்றும் cucumberOpts

குறிப்பிட்ட கட்டமைப்பு தொடர்பான விருப்பங்கள். எந்த விருப்பங்கள் கிடைக்கும் என்பதைத் தெரிந்துகொள்ள கட்டமைப்பு adapter ஆவணங்களைப் பார்க்கவும். இதைப் பற்றி மேலும் [கட்டமைப்புகள்](frameworks) இல் படிக்கவும்.

வகை: `Object`<br />
இயல்புநிலை: `{ timeout: 10000 }`

### cucumberFeaturesWithLineNumbers

வரி எண்களுடன் கூடிய cucumber அம்சங்களின் பட்டியல் ([cucumber framework பயன்படுத்தும்போது](./Frameworks.md#using-cucumber)).

வகை: `String[]`
இயல்புநிலை: `[]`

### reporters

பயன்படுத்த அறிக்கையாளர்களின் பட்டியல். ஒரு அறிக்கையாளர் ஒரு சரம் அல்லது
`['reporterName', { /* reporter options */}]` வடிவில் array ஆக இருக்கலாம், இதில் முதல் உறுப்பு அறிக்கையாளர் பெயருடன் கூடிய சரம் மற்றும் இரண்டாவது உறுப்பு அறிக்கையாளர் விருப்பங்களுடன் ஒரு பொருள்.

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

அறிக்கையாளர்கள் தங்கள் பதிவுகளை ஒத்திசைக்கப்பட்டுள்ளதா என்பதை அறிக்கையாளர்கள் சரிபார்க்க வேண்டிய இடைவெளியை தீர்மானிக்கிறது (எ.கா. பதிவுகள் 3வது தரப்பு விற்பனையாளருக்கு ஸ்ட்ரீம் செய்யப்பட்டால்).

வகை: `Number`<br />
இயல்புநிலை: `100` (ms)

### reporterSyncTimeout

அறிக்கையாளர்கள் தங்கள் அனைத்து பதிவுகளையும் பதிவேற்றுவதை முடிக்கும் வரை டெஸ்ட்ரன்னரால் பிழை ஏற்படும் வரை அதிகபட்ச நேரத்தை தீர்மானிக்கிறது.

வகை: `Number`<br />
இயல்புநிலை: `5000` (ms)

### execArgv

child processes தொடங்கும்போது குறிப்பிட வேண்டிய Node arguments.

வகை: `String[]`<br />
இயல்புநிலை: `null`

### filesToWatch

டெஸ்ட்ரன்னர் `--watch` கொடியுடன் இயக்கும்போது கூடுதலாக கவனிக்க வேண்டிய கோப்புகளின் glob ஆதரிக்கும் சரம் வடிவங்களின் பட்டியல், எ.கா. பயன்பாட்டு கோப்புகள். இயல்பாக டெஸ்ட்ரன்னர் ஏற்கனவே அனைத்து spec கோப்புகளையும் கவனிக்கிறது.

வகை: `String[]`<br />
இயல்புநிலை: `[]`

### updateSnapshots

உங்கள் snapshots ஐ புதுப்பிக்க விரும்பினால் true என அமைக்கவும். இதை CLI அளவுருவாக பயன்படுத்துவது சிறந்தது, எ.கா. `wdio run wdio.conf.js --s`.

வகை: `'new' | 'all' | 'none'`<br />
இயல்புநிலை: `none` (வழங்கப்படவில்லை என்றால் மற்றும் சோதனைகள் CI இல் இயங்கினால்), `new` (வழங்கப்படவில்லை என்றால்), அல்லது வழங்கப்பட்ட மதிப்பு.

### resolveSnapshotPath

இயல்புநிலை snapshot பாதையை மேலெழுதுகிறது. உதாரணமாக, சோதனை கோப்புகளுக்கு அருகில் snapshots சேமிக்க.

```ts title="wdio.conf.ts"
export const config: WebdriverIO.Config = {
    resolveSnapshotPath: (testPath, snapExtension) => testPath + snapExtension,
}
```

வகை: `(testPath: string, snapExtension: string) => string`<br />
இயல்புநிலை: சோதனை கோப்புக்கு அருகில் `__snapshots__` கோப்பகத்தில் snapshot கோப்புகளை சேமிக்கிறது

### tsConfigPath

WDIO TypeScript கோப்புகளை compile செய்ய `tsx` ஐப் பயன்படுத்துகிறது. உங்கள் TSConfig தற்போதைய பணி கோப்பகத்திலிருந்து தானாகவே கண்டறியப்படுகிறது, ஆனால் இங்கே தனிப்பயன் பாதையைக் குறிப்பிடலாம் அல்லது TSX_TSCONFIG_PATH சூழல் மாறியை அமைக்கலாம்.

`tsx` ஆவணங்களைப் பார்க்கவும்: https://tsx.is/dev-api/node-cli#custom-tsconfig-json-path

வகை: `String`<br />
இயல்புநிலை: `null`<br />

## Hooks

WDIO டெஸ்ட்ரன்னர் சோதனை வாழ்க்கைச் சுழற்சியின் குறிப்பிட்ட நேரங்களில் நிகழ்ச்சிகளைத் தூண்ட hooks அமைக்க அனுமதிக்கிறது. இது தனிப்பயன் செயல்களை அனுமதிக்கிறது (எ.கா. சோதனை தோல்வியுற்றால் ஸ்கிரீன்ஷாட் எடுக்கவும்).

ஒவ்வொரு hook க்கும் அளவுருவாக வாழ்க்கைச் சுழற்சி பற்றிய குறிப்பிட்ட தகவல்கள் (எ.கா. சோதனை suite அல்லது சோதனை பற்றிய தகவல்) உள்ளது. அனைத்து hook பண்புகளைப் பற்றி [எங்கள் எடுத்துக்காட்டு கட்டமைப்பில்](https://github.com/webdriverio/webdriverio/blob/master/examples/wdio.conf.js#L183-L326) மேலும் படிக்கவும்.

**குறிப்பு:** சில hooks (`onPrepare`, `onWorkerStart`, `onWorkerEnd` மற்றும் `onComplete`) வேறு செயல்முறையில் செயல்படுத்தப்படுகிறது, எனவே worker செயல்முறையில் வாழும் மற்ற hooks உடன் எந்த உலகளாவிய தரவையும் பகிர முடியாது.

### onPrepare

அனைத்து worker களும் தொடங்குவதற்கு முன்பு ஒரு முறை செயல்படுத்தப்படுகிறது.

அளவுருக்கள்:

- `config` (`object`): WebdriverIO கட்டமைப்பு பொருள்
- `param` (`object[]`): திறன்கள் விவரங்களின் பட்டியல்

### onWorkerStart

worker செயல்முறை தொடங்கப்படுவதற்கு முன் செயல்படுத்தப்படுகிறது, மேலும் அந்த worker க்கான குறிப்பிட்ட சேவையை துவக்கவும் runtime சூழல்களை async முறையில் மாற்றியமைக்கவும் பயன்படுத்தலாம்.

அளவுருக்கள்:

- `cid` (`string`): திறன் id (எ.கா 0-0)
- `caps` (`object`): worker இல் தொடங்கப்படும் அமர்வுக்கான திறன்களைக் கொண்டுள்ளது
- `specs` (`string[]`): worker செயல்முறையில் இயக்கப்படும் spec கள்
- `args` (`object`): worker துவக்கப்பட்டவுடன் முக்கிய கட்டமைப்புடன் இணைக்கப்படும் பொருள்
- `execArgv` (`string[]`): worker செயல்முறைக்கு அனுப்பப்பட்ட சர arguments பட்டியல்

### onWorkerEnd

worker செயல்முறை வெளியேறிய பிறகு செயல்படுத்தப்படுகிறது.

அளவுருக்கள்:

- `cid` (`string`): திறன் id (எ.கா 0-0)
- `exitCode` (`number`): 0 - வெற்றி, 1 - தோல்வி
- `specs` (`string[]`): worker செயல்முறையில் இயக்கப்படும் spec கள்
- `retries` (`number`): [_"Add retries on a per-specfile basis"_](./Retry.md#add-retries-on-a-per-specfile-basis) இல் வரையறுக்கப்பட்டபடி பயன்படுத்தப்பட்ட spec-level மறுமுயற்சிகளின் எண்ணிக்கை

### beforeSession

webdriver அமர்வு மற்றும் சோதனை கட்டமைப்பை துவக்குவதற்கு முன்பாக செயல்படுத்தப்படுகிறது. இது திறன் அல்லது spec ஐப் பொறுத்து கட்டமைப்புகளை கையாள அனுமதிக்கிறது.

அளவுருக்கள்:

- `config` (`object`): WebdriverIO கட்டமைப்பு பொருள்
- `caps` (`object`): worker இல் தொடங்கப்படும் அமர்வுக்கான திறன்களைக் கொண்டுள்ளது
- `specs` (`string[]`): worker செயல்முறையில் இயக்கப்படும் spec கள்

### before

சோதனை இயக்கம் தொடங்குவதற்கு முன் செயல்படுத்தப்படுகிறது. இந்த புள்ளியில் `browser` போன்ற அனைத்து உலகளாவிய மாறிகளையும் அணுகலாம். தனிப்பயன் கட்டளைகளை வரையறுக்க இது சிறந்த இடம்.

அளவுருக்கள்:

- `caps` (`object`): worker இல் தொடங்கப்படும் அமர்வுக்கான திறன்களைக் கொண்டுள்ளது
- `specs` (`string[]`): worker செயல்முறையில் இயக்கப்படும் spec கள்
- `browser` (`object`): உருவாக்கப்பட்ட உலாவி/சாதன அமர்வின் instance

### beforeSuite

suite தொடங்குவதற்கு முன் செயல்படுத்தப்படும் hook (Mocha/Jasmine இல் மட்டுமே)

அளவுருக்கள்:

- `suite` (`object`): suite விவரங்கள்

### beforeHook

suite க்குள் ஒரு hook தொடங்குவதற்கு *முன்பு* செயல்படுத்தப்படும் hook (எ.கா. Mocha இல் beforeEach அழைப்பதற்கு முன் இயங்குகிறது)

அளவுருக்கள்:

- `test` (`object`): சோதனை விவரங்கள்
- `context` (`object`): சோதனை சூழல் (Cucumber இல் World பொருளைக் குறிக்கிறது)

### afterHook

suite க்குள் ஒரு hook முடிந்த *பிறகு* செயல்படுத்தப்படும் hook (எ.கா. Mocha இல் afterEach அழைப்பதற்கு பின் இயங்குகிறது)

அளவுருக்கள்:

- `test` (`object`): சோதனை விவரங்கள்
- `context` (`object`): சோதனை சூழல் (Cucumber இல் World பொருளைக் குறிக்கிறது)
- `result` (`object`): hook முடிவு (`error`, `result`, `duration`, `passed`, `retries` பண்புகளைக் கொண்டுள்ளது)

### beforeTest

சோதனைக்கு முன் செயல்படுத்தப்படும் function (Mocha/Jasmine இல் மட்டுமே).

அளவுருக்கள்:

- `test` (`object`): சோதனை விவரங்கள்
- `context` (`object`): சோதனை செயல்படுத்தப்பட்ட scope object

### beforeCommand

WebdriverIO கட்டளை செயல்படுத்தப்படுவதற்கு முன் இயங்குகிறது.

அளவுருக்கள்:

- `commandName` (`string`): கட்டளை பெயர்
- `args` (`*`): கட்டளை பெறும் arguments

### afterCommand

WebdriverIO கட்டளை செயல்படுத்தப்பட்ட பிறகு இயங்குகிறது.

அளவுருக்கள்:

- `commandName` (`string`): கட்டளை பெயர்
- `args` (`*`): கட்டளை பெறும் arguments
- `result` (`number`): 0 - கட்டளை வெற்றி, 1 - கட்டளை பிழை
- `error` (`Error`): ஏதேனும் பிழை இருந்தால் பிழை பொருள்

### afterTest

சோதனை முடிந்த பிறகு செயல்படுத்தப்படும் function (Mocha/Jasmine இல்).

அளவுருக்கள்:

- `test` (`object`): சோதனை விவரங்கள்
- `context` (`object`): சோதனை செயல்படுத்தப்பட்ட scope object
- `result.error` (`Error`): சோதனை தோல்வியுற்றால் பிழை பொருள், இல்லையெனில் `undefined`
- `result.result` (`Any`): சோதனை functionன் திரும்பும் பொருள்
- `result.duration` (`Number`): சோதனையின் கால அளவு
- `result.passed` (`Boolean`): சோதனை தேர்ச்சியடைந்தால் true, இல்லையெனில் false
- `result.retries` (`Object`): [Mocha மற்றும் Jasmine](./Retry.md#rerun-single-tests-in-jasmine-or-mocha) இலும் [Cucumber](./Retry.md#rerunning-in-cucumber) இலும் வரையறுக்கப்பட்டபடி, ஒற்றை சோதனை தொடர்பான மறுமுயற்சிகள் பற்றிய தகவல், எ.கா. `{ attempts: 0, limit: 0 }`, பார்க்கவும்
- `result` (`object`): hook முடிவு (`error`, `result`, `duration`, `passed`, `retries` பண்புகளைக் கொண்டுள்ளது)

### afterSuite

suite முடிந்த பிறகு செயல்படுத்தப்படும் hook (Mocha/Jasmine இல் மட்டுமே)

அளவுருக்கள்:

- `suite` (`object`): suite விவரங்கள்

### after

அனைத்து சோதனைகளும் முடிந்த பிறகு செயல்படுத்தப்படுகிறது. சோதனையிலிருந்து அனைத்து உலகளாவிய மாறிகளையும் இன்னும் அணுகலாம்.

அளவுருக்கள்:

- `result` (`number`): 0 - சோதனை தேர்ச்சி, 1 - சோதனை தோல்வி
- `caps` (`object`): worker இல் தொடங்கப்படும் அமர்வுக்கான திறன்களைக் கொண்டுள்ளது
- `specs` (`string[]`): worker செயல்முறையில் இயக்கப்படும் spec கள்

### afterSession

webdriver அமர்வை முடித்த பிறகு செயல்படுத்தப்படுகிறது.

அளவுருக்கள்:

- `config` (`object`): WebdriverIO கட்டமைப்பு பொருள்
- `caps` (`object`): worker இல் தொடங்கப்படும் அமர்வுக்கான திறன்களைக் கொண்டுள்ளது
- `specs` (`string[]`): worker செயல்முறையில் இயக்கப்படும் spec கள்

### onComplete

அனைத்து worker களும் முடிக்கப்பட்டு செயல்முறை வெளியேறுவதற்கு முன் செயல்படுத்தப்படுகிறது. onComplete hook இல் ஏற்படும் பிழை சோதனை ஓட்டம் தோல்வியடைவதற்கு காரணமாகும்.

அளவுருக்கள்:

- `exitCode` (`number`): 0 - வெற்றி, 1 - தோல்வி
- `config` (`object`): WebdriverIO கட்டமைப்பு பொருள்
- `caps` (`object`): worker இல் தொடங்கப்படும் அமர்வுக்கான திறன்களைக் கொண்டுள்ளது
- `result` (`object`): சோதனை முடிவுகளைக் கொண்ட முடிவுகள் பொருள்

### onReload

புதுப்பித்தல் நிகழும்போது செயல்படுத்தப்படுகிறது.

அளவுருக்கள்:

- `oldSessionId` (`string`): பழைய அமர்வின் session ID
- `newSessionId` (`string`): புதிய அமர்வின் session ID

### beforeFeature

Cucumber Feature முன் இயங்குகிறது.

அளவுருக்கள்:

- `uri` (`string`): feature கோப்பிற்கான பாதை
- `feature` ([`GherkinDocument.IFeature`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/json-to-messages/javascript/src/cucumber-generic/JSONSchema.ts#L8-L17)): Cucumber feature பொருள்

### afterFeature

Cucumber Feature பிறகு இயங்குகிறது.

அளவுருக்கள்:

- `uri` (`string`): feature கோப்பிற்கான பாதை
- `feature` ([`GherkinDocument.IFeature`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/json-to-messages/javascript/src/cucumber-generic/JSONSchema.ts#L8-L17)): Cucumber feature பொருள்

### beforeScenario

Cucumber Scenario முன் இயங்குகிறது.

அளவுருக்கள்:

- `world` ([`ITestCaseHookParameter`](https://github.com/cucumber/cucumber-js/blob/ac124f7b2be5fa54d904c7feac077a2657b19440/src/support_code_library_builder/types.ts#L10-L15)): pickle மற்றும் test step பற்றிய தகவல்களைக் கொண்ட உலக பொருள்
- `context` (`object`): Cucumber World பொருள்

### afterScenario

Cucumber Scenario பிறகு இயங்குகிறது.

அளவுருக்கள்:

- `world` ([`ITestCaseHookParameter`](https://github.com/cucumber/cucumber-js/blob/ac124f7b2be5fa54d904c7feac077a2657b19440/src/support_code_library_builder/types.ts#L10-L15)): pickle மற்றும் test step பற்றிய தகவல்களைக் கொண்ட உலக பொருள்
- `result` (`object`): scenario முடிவுகளைக் கொண்ட முடிவுகள் பொருள்
- `result.passed` (`boolean`): scenario தேர்ச்சியடைந்தால் true
- `result.error` (`string`): scenario தோல்வியுற்றால் பிழை stack
- `result.duration` (`number`): scenario கால அளவு (மில்லிவினாடிகளில்)
- `context` (`object`): Cucumber World பொருள்

### beforeStep

Cucumber Step முன் இயங்குகிறது.

அளவுருக்கள்:

- `step` ([`Pickle.IPickleStep`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/messages/jsonschema/Pickle.json#L20-L49)): Cucumber step பொருள்
- `scenario` ([`IPickle`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/messages/jsonschema/Pickle.json#L137-L175)): Cucumber scenario பொருள்
- `context` (`object`): Cucumber World பொருள்

### afterStep

Cucumber Step பிறகு இயங்குகிறது.

அளவுருக்கள்:

- `step` ([`Pickle.IPickleStep`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/messages/jsonschema/Pickle.json#L20-L49)): Cucumber step பொருள்
- `scenario` ([`IPickle`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/messages/jsonschema/Pickle.json#L137-L175)): Cucumber scenario பொருள்
- `result`: (`object`): step முடிவுகளைக் கொண்ட முடிவுகள் பொருள்
- `result.passed` (`boolean`): scenario தேர்ச்சியடைந்தால் true
- `result.error` (`string`): scenario தோல்வியுற்றால் பிழை stack
- `result.duration` (`number`): scenario கால அளவு (மில்லிவினாடிகளில்)
- `context` (`object`): Cucumber World பொருள்

### beforeAssertion

WebdriverIO assertion நிகழ்வதற்கு முன் செயல்படுத்தப்படும் hook.

அளவுருக்கள்:

- `params`: assertion தகவல்
- `params.matcherName` (`string`): matcher பெயர் (எ.கா. `toHaveTitle`)
- `params.expectedValue`: matcher க்குள் அனுப்பப்படும் மதிப்பு
- `params.options`: assertion விருப்பங்கள்

### afterAssertion

WebdriverIO assertion நிகழ்ந்த பிறகு செயல்படுத்தப்படும் hook.

அளவுருக்கள்:

- `params`: assertion தகவல்
- `params.matcherName` (`string`): matcher பெயர் (எ.கா. `toHaveTitle`)
- `params.expectedValue`: matcher க்குள் அனுப்பப்படும் மதிப்பு
- `params.options`: assertion விருப்பங்கள்
- `params.result`: assertion முடிவுகள்