---
id: configuration
title: கட்டமைப்பு
---

[அமைப்பு வகை](/docs/setuptypes) அடிப்படையில் (எ.கா. மூல நெறிமுறை பிணைப்புகளைப் பயன்படுத்துதல், தனிநிலை தொகுப்பாக WebdriverIO அல்லது WDIO டெஸ்ட்ரன்னர்) சூழலைக் கட்டுப்படுத்த பல்வேறு விருப்பங்கள் உள்ளன.

## WebDriver விருப்பங்கள்

[`webdriver`](https://www.npmjs.com/package/webdriver) நெறிமுறை தொகுப்பைப் பயன்படுத்தும்போது பின்வரும் விருப்பங்கள் வரையறுக்கப்படுகின்றன:

### protocol

டிரைவர் சேவையகத்துடன் தொடர்பு கொள்வதற்கான நெறிமுறை.

வகை: `String`<br />
இயல்புநிலை: `http`

### hostname

உங்கள் டிரைவர் சேவையகத்தின் ஹோஸ்ட்.

வகை: `String`<br />
இயல்புநிலை: `0.0.0.0`

### port

உங்கள் டிரைவர் சேவையகம் இயங்கும் போர்ட்.

வகை: `Number`<br />
இயல்புநிலை: `undefined`

### path

டிரைவர் சேவையக முடிவு புள்ளிக்கான பாதை.

வகை: `String`<br />
இயல்புநிலை: `/`

### queryParams

டிரைவர் சேவையகத்திற்கு அனுப்பப்படும் வினவல் அளவுருக்கள்.

வகை: `Object`<br />
இயல்புநிலை: `undefined`

### user

உங்கள் கிளவுட் சேவை பயனர்பெயர் ([Sauce Labs](https://saucelabs.com), [Browserstack](https://www.browserstack.com), [TestingBot](https://testingbot.com) அல்லது [LambdaTest](https://www.lambdatest.com) கணக்குகளுக்கு மட்டுமே செயல்படும்). அமைத்திருந்தால், WebdriverIO தானாகவே இணைப்பு விருப்பங்களை உங்களுக்காக அமைக்கும். நீங்கள் கிளவுட் வழங்குநரைப் பயன்படுத்தவில்லை என்றால், இது வேறு எந்த WebDriver பின்னணியையும் அங்கீகரிக்கப் பயன்படுத்தப்படலாம்.

வகை: `String`<br />
இயல்புநிலை: `undefined`

### key

உங்கள் கிளவுட் சேவை அணுகல் விசை அல்லது ரகசிய விசை ([Sauce Labs](https://saucelabs.com), [Browserstack](https://www.browserstack.com), [TestingBot](https://testingbot.com) அல்லது [LambdaTest](https://www.lambdatest.com) கணக்குகளுக்கு மட்டுமே செயல்படும்). அமைத்திருந்தால், WebdriverIO தானாகவே இணைப்பு விருப்பங்களை உங்களுக்காக அமைக்கும். நீங்கள் கிளவுட் வழங்குநரைப் பயன்படுத்தவில்லை என்றால், இது வேறு எந்த WebDriver பின்னணியையும் அங்கீகரிக்கப் பயன்படுத்தப்படலாம்.

வகை: `String`<br />
இயல்புநிலை: `undefined`

### capabilities

உங்கள் WebDriver அமர்வில் இயக்க விரும்பும் திறன்களை வரையறுக்கிறது. மேலும் விவரங்களுக்கு [WebDriver நெறிமுறை](https://w3c.github.io/webdriver/#capabilities) ஐப் பார்க்கவும். WebDriver நெறிமுறையை ஆதரிக்காத பழைய டிரைவரை இயக்கினால், அமர்வை வெற்றிகரமாக இயக்க [JSONWireProtocol திறன்கள்](https://github.com/SeleniumHQ/selenium/wiki/DesiredCapabilities) பயன்படுத்த வேண்டும்.

WebDriver அடிப்படையிலான திறன்களுக்கு அடுத்து, தொலைநிலை உலாவி அல்லது சாதனத்தில் ஆழமான கட்டமைப்பை அனுமதிக்கும் உலாவி மற்றும் வழங்குநர் குறிப்பிட்ட விருப்பங்களைப் பயன்படுத்தலாம். இவை சம்பந்தப்பட்ட வழங்குநர் ஆவணங்களில் ஆவணப்படுத்தப்பட்டுள்ளன, எ.கா.:

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

நீங்கள் மொபைல் சாதனங்களில் வலை அல்லது நேடிவ் சோதனைகளை இயக்கினால், `capabilities` WebDriver நெறிமுறையிலிருந்து மாறுபடும். மேலும் விவரங்களுக்கு [Appium Docs](https://appium.io/docs/en/latest/guides/caps/) ஐப் பார்க்கவும்.

### logLevel

பதிவுசெய்தல் சொல்லளவின் அளவு.

வகை: `String`<br />
இயல்புநிலை: `info`<br />
விருப்பங்கள்: `trace` | `debug` | `info` | `warn` | `error` | `silent`

### outputDir

அனைத்து டெஸ்ட்ரன்னர் பதிவு கோப்புகளையும் (அறிக்கையாளர் பதிவுகள் மற்றும் `wdio` பதிவுகள் உட்பட) சேமிக்க கோப்பகம். அமைக்கப்படவில்லை என்றால், அனைத்து பதிவுகளும் `stdout` க்கு ஸ்ட்ரீம் செய்யப்படுகின்றன. பெரும்பாலான அறிக்கையாளர்கள் `stdout` க்கு பதிவு செய்யப்படுவதால், இந்த விருப்பத்தை அறிக்கையை கோப்பில் தள்ள அதிக அர்த்தம் உள்ள குறிப்பிட்ட அறிக்கையாளர்களுக்கு மட்டுமே பயன்படுத்த பரிந்துரைக்கப்படுகிறது (எடுத்துக்காட்டாக, `junit` அறிக்கையாளர் போன்றவை).

தனிநிலை பயன்முறையில் இயங்கும் போது, WebdriverIO உருவாக்கும் ஒரே பதிவு `wdio` பதிவு மட்டுமே.

வகை: `String`<br />
இயல்புநிலை: `null`

### connectionRetryTimeout

டிரைவர் அல்லது கிரிட் ஒரு WebDriver கோரிக்கைக்கான நேரம் முடிந்தது.

வகை: `Number`<br />
இயல்புநிலை: `120000`

### connectionRetryCount

செலினியம் சேவையகத்திற்கான கோரிக்கை மறுமுயற்சிகளின் அதிகபட்ச எண்ணிக்கை.

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

ஒவ்வொரு WebDriver கோரிக்கைக்கும் அனுப்ப தனிப்பயன் `headers` ஐக் குறிப்பிடவும். உங்கள் செலினியம் கிரிட் அடிப்படை அங்கீகரிப்பைத் தேவைப்படுத்தினால், உங்கள் WebDriver கோரிக்கைகளை அங்கீகரிக்க இந்த விருப்பத்தின் மூலம் ஒரு `Authorization` தலைப்பை அனுப்ப பரிந்துரைக்கிறோம், எ.கா.:

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

WebDriver கோரிக்கை விடுக்கப்படுவதற்கு முன் [HTTP கோரிக்கை விருப்பங்களை](https://github.com/sindresorhus/got#options) மறிக்கும் செயல்பாடு

வகை: `(RequestOptions) => RequestOptions`<br />
இயல்புநிலை: *ஏதுமில்லை*

### transformResponse

WebDriver பதில் வந்த பிறகு HTTP பதில் பொருள்களை மறிக்கும் செயல்பாடு. முதல் அளவுருவாக அசல் பதில் பொருள் மற்றும் இரண்டாவது அளவுருவாக தொடர்புடைய `RequestOptions` வழங்கப்படுகிறது.

வகை: `(Response, RequestOptions) => Response`<br />
இயல்புநிலை: *ஏதுமில்லை*

### strictSSL

SSL சான்றிதழ் செல்லுபடியாக வேண்டுமா இல்லையா.
இது `STRICT_SSL` அல்லது `strict_ssl` என சுற்றுச்சூழல் மாறிகள் மூலம் அமைக்கப்படலாம்.

வகை: `Boolean`<br />
இயல்புநிலை: `true`

### enableDirectConnect

[Appium நேரடி இணைப்பு அம்சத்தை](https://appiumpro.com/editions/86-connecting-directly-to-appium-hosts-in-distributed-environments) இயக்குவதா.
கொடி இயக்கப்பட்டிருந்தாலும் பதிலில் சரியான விசைகள் இல்லாவிட்டால் அது எதையும் செய்யாது.

வகை: `Boolean`<br />
இயல்புநிலை: `true`

### cacheDir

கேச் கோப்பகத்தின் ரூட் பாதை. அமர்வைத் தொடங்க முயற்சிக்கும் போது பதிவிறக்கம் செய்யப்படும் அனைத்து டிரைவர்களையும் சேமிக்க இந்த கோப்பகம் பயன்படுத்தப்படுகிறது.

வகை: `String`<br />
இயல்புநிலை: `process.env.WEBDRIVER_CACHE_DIR || os.tmpdir()`

### maskingPatterns

அதிக பாதுகாப்பான பதிவுகளுக்கு, `maskingPatterns` உடன் அமைக்கப்பட்ட வழக்கமான வெளிப்பாடுகள் பதிவிலிருந்து உணர்திறன் தகவல்களை மறைக்கலாம்.
 - சரம் வடிவம் என்பது கொடிகளுடன் அல்லது கொடிகள் இல்லாமல் ஒரு வழக்கமான வெளிப்பாடு (எ.கா. `/.../i`) மற்றும் பல வழக்கமான வெளிப்பாடுகளுக்கு காற்புள்ளிகளால் பிரிக்கப்பட்டது.
 - மறைத்தல் பேட்டர்ன்கள் பற்றிய கூடுதல் விவரங்களுக்கு, [WDIO Logger README இல் மறைத்தல் பேட்டர்ன்கள் பகுதியைப் பார்க்கவும்](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-logger/README.md#masking-patterns).

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

பின்வரும் விருப்பங்கள் (மேலே பட்டியலிடப்பட்டவைகளுடன்) WebdriverIO ஐ தனிநிலையில் பயன்படுத்தலாம்:

### automationProtocol

உங்கள் உலாவி தானியக்கத்திற்கு நீங்கள் பயன்படுத்த விரும்பும் நெறிமுறையை வரையறுக்கவும். தற்போது [`webdriver`](https://www.npmjs.com/package/webdriver) மட்டுமே ஆதரிக்கப்படுகிறது, ஏனெனில் இது WebdriverIO பயன்படுத்தும் முக்கிய உலாவி தானியக்க தொழில்நுட்பமாகும்.

வேறுபட்ட தானியக்க தொழில்நுட்பத்தைப் பயன்படுத்தி உலாவியைத் தானியக்கப்படுத்த விரும்பினால், பின்வரும் இடைமுகத்திற்கு ஏற்ப ஒரு தொகுதியாக தீர்க்கும் பாதைக்கு இந்த பண்பை அமைக்கவும்:

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

அடிப்படை URL ஐ அமைப்பதன் மூலம் `url` கட்டளை அழைப்புகளை குறுக்கலாம்.
- உங்கள் `url` அளவுரு `/` உடன் தொடங்கினால், `baseUrl` முன்னொட்டாக இருக்கும் (தவிர `baseUrl` பாதை, அதற்கு ஒன்று இருந்தால்).
- உங்கள் `url` அளவுரு ஒரு திட்டம் அல்லது `/` இல்லாமல் தொடங்கினால் (எ.கா. `some/path`), முழு `baseUrl` நேரடியாக முன்னொட்டாக இருக்கும்.

வகை: `String`<br />
இயல்புநிலை: `null`

### waitforTimeout

அனைத்து `waitFor*` கட்டளைகளுக்கும் இயல்புநிலை நேரம் முடிந்தது. (விருப்ப பெயரில் சிறிய `f` இருப்பதைக் கவனிக்கவும்.) இந்த நேரம் முடிந்தது `waitFor*` உடன் தொடங்கும் கட்டளைகளை மட்டுமே பாதிக்கும் மற்றும் அவற்றின் இயல்புநிலை காத்திருப்பு நேரம்.

ஒரு _சோதனைக்கான_ நேரத்தை அதிகரிக்க, கட்டமைப்பு ஆவணங்களைப் பார்க்கவும்.

வகை: `Number`<br />
இயல்புநிலை: `5000`

### waitforInterval

எதிர்பார்க்கப்படும் நிலை (எ.கா. தெரிவு) மாற்றப்பட்டுள்ளதா என்பதைச் சரிபார்க்க அனைத்து `waitFor*` கட்டளைகளுக்கும் இயல்புநிலை இடைவெளி.

வகை: `Number`<br />
இயல்புநிலை: `100`

### region

Sauce Labs இல் இயங்கினால், பல்வேறு தரவு மையங்களுக்கு இடையே சோதனைகளை இயக்க தேர்வு செய்யலாம்: US அல்லது EU.
உங்கள் பகுதியை EU க்கு மாற்ற, உங்கள் கட்டமைப்பில் `region: 'eu'` சேர்க்கவும்.

__குறிப்பு:__ நீங்கள் Sauce Labs கணக்குடன் இணைக்கப்பட்ட `user` மற்றும் `key` விருப்பங்களை வழங்கினால் மட்டுமே இது பயன்படும்.

வகை: `String`<br />
இயல்புநிலை: `us`

*(vm மற்றும் அல்லது em/simulators க்கு மட்டும்)*

---

## டெஸ்ட்ரன்னர் விருப்பங்கள்

பின்வரும் விருப்பங்கள் (மேலே பட்டியலிடப்பட்டவைகள் உட்பட) WDIO டெஸ்ட்ரன்னருடன் WebdriverIO ஐ இயக்குவதற்கு மட்டுமே வரையறுக்கப்பட்டுள்ளன:

### specs

சோதனை செயல்பாட்டிற்கான ஸ்பெக்குகளை வரையறுக்கவும். ஒரே நேரத்தில் பல கோப்புகளை பொருத்த ஒரு கிளாப் பேட்டர்னை குறிப்பிடலாம் அல்லது ஒரு தனி தொழிலாளர் செயல்முறையில் அவற்றை இயக்க ஒரு கிளாப் அல்லது பாதைகளின் தொகுப்பை வரிசைப்படுத்தலாம். அனைத்து பாதைகளும் கட்டமைப்பு கோப்பு பாதையிலிருந்து ஒப்பீட்டளவில் பார்க்கப்படுகின்றன.

வகை: `(String | String[])[]`<br />
இயல்புநிலை: `[]`

### exclude

சோதனை செயல்பாட்டிலிருந்து ஸ்பெக்குகளை விலக்கவும். அனைத்து பாதைகளும் கட்டமைப்பு கோப்பு பாதையிலிருந்து ஒப்பீட்டளவில் பார்க்கப்படுகின்றன.

வகை: `String[]`<br />
இயல்புநிலை: `[]`

### suites

பல்வேறு தொகுப்புகளை விவரிக்கும் ஒரு பொருள், அதை நீங்கள் `wdio` CLI இல் `--suite` விருப்பத்துடன் குறிப்பிடலாம்.

வகை: `Object`<br />
இயல்புநிலை: `{}`

### capabilities

மேலே விவரிக்கப்பட்ட `capabilities` பிரிவு போன்றது, இணைமான செயல்பாட்டிற்காக ஒரு [`multiremote`](/docs/multiremote) பொருளை அல்லது பல WebDriver அமர்வுகளை ஒரு வரிசையில் குறிப்பிடும் விருப்பத்துடன்.

[மேலே](/docs/configuration#capabilities) வரையறுக்கப்பட்டுள்ளபடி அதே வழங்குநர் மற்றும் உலாவி குறிப்பிட்ட திறன்களை பயன்படுத்தலாம்.

வகை: `Object`|`Object[]`<br />
இயல்புநிலை: `[{ 'wdio:maxInstances': 5, browserName: 'firefox' }]`

### maxInstances

மொத்த இணை இயங்கும் தொழிலாளர்களின் அதிகபட்ச எண்ணிக்கை.

__குறிப்பு:__ இது Sauce Labs போன்ற சில வெளிப்புற வழங்குநர்களின் இயந்திரங்களில் சோதனைகள் செய்யப்படும் போது `100` அளவிற்கு ஒரு எண்ணாக இருக்கலாம். அங்கே, சோதனைகள் ஒரு இயந்திரத்தில் மட்டுமல்ல, பல VM களில் சோதிக்கப்படுகின்றன. சோதனைகள் ஒரு உள்ளூர் மேம்பாட்டு இயந்திரத்தில் இயக்கப்பட வேண்டும் என்றால், `3`, `4`, அல்லது `5` போன்ற நியாயமான எண்ணைப் பயன்படுத்தவும். அடிப்படையில், இது ஒரே நேரத்தில் தொடங்கப்பட்டு உங்கள் சோதனைகளை இயக்கும் உலாவிகளின் எண்ணிக்கையாகும், எனவே இது உங்கள் இயந்திரத்தில் எவ்வளவு ரேம் உள்ளது மற்றும் உங்கள் இயந்திரத்தில் இயங்கும் மற்ற பயன்பாடுகளைப் பொறுத்தது.

`wdio:maxInstances` திறனைப் பயன்படுத்தி உங்கள் திறன் பொருள்களில் `maxInstances` ஐப் பயன்படுத்தலாம். இது அந்த குறிப்பிட்ட திறனுக்கு இணையான அமர்வுகளின் எண்ணிக்கையை வரம்பிடும்.

வகை: `Number`<br />
இயல்புநிலை: `100`

### maxInstancesPerCapability

ஒரு திறனுக்கு மொத்த இணை இயங்கும் தொழிலாளர்களின் அதிகபட்ச எண்ணிக்கை.

வகை: `Number`<br />
இயல்புநிலை: `100`

### injectGlobals

WebdriverIO இன் குளோபல்களை (எ.கா. `browser`, `$` மற்றும் `$$`) குளோபல் சூழலில் செருகுகிறது.
நீங்கள் `false` என அமைத்தால், நீங்கள் `@wdio/globals` இலிருந்து இறக்குமதி செய்ய வேண்டும், எ.கா.:

```ts
import { browser, $, $$, expect } from '@wdio/globals'
```

குறிப்பு: WebdriverIO சோதனை கட்டமைப்பு குறிப்பிட்ட குளோபல்களின் செருகலை கையாளவில்லை.

வகை: `Boolean`<br />
இயல்புநிலை: `true`

### bail

குறிப்பிட்ட எண்ணிக்கையிலான சோதனை தோல்விகளுக்குப் பிறகு உங்கள் சோதனை ஓட்டம் நிற்க வேண்டுமென்றால், `bail` ஐப் பயன்படுத்தவும்.
(இது இயல்புநிலையாக `0` ஆக உள்ளது, இது எப்படி இருந்தாலும் அனைத்து சோதனைகளையும் இயக்குகிறது.) **குறிப்பு:** இந்த சூழலில் ஒரு சோதனை என்பது ஒரு ஸ்பெக் கோப்புக்குள் உள்ள அனைத்து சோதனைகளும் (Mocha அல்லது Jasmine ஐப் பயன்படுத்தும் போது) அல்லது ஒரு அம்ச கோப்பில் உள்ள அனைத்து படிகளும் (Cucumber ஐப் பயன்படுத்தும் போது). ஒற்றை சோதனை கோப்பின் சோதனைகளுக்குள் bail நடத்தையைக் கட்டுப்படுத்த விரும்பினால், கிடைக்கக்கூடிய [framework](frameworks) விருப்பங்களைப் பார்க்கவும்.

வகை: `Number`<br />
இயல்புநிலை: `0` (bail செய்யாதே; அனைத்து சோதனைகளையும் இயக்கவும்)

### specFileRetries

முழுமையாக தோல்வியுறும்போது ஒரு முழு specfile ஐ மறுமுயற்சி செய்ய வேண்டிய முறைகள்.

வகை: `Number`<br />
இயல்புநிலை: `0`

### specFileRetriesDelay

ஸ்பெக் கோப்பு மறுமுயற்சி முயற்சிகளுக்கு இடையிலான தாமதம் (வினாடிகளில்)

வகை: `Number`<br />
இயல்புநிலை: `0`

### specFileRetriesDeferred

மறுமுயற்சி ஸ்பெக் கோப்புகள் உடனடியாக மறுமுயற்சி செய்யப்பட வேண்டுமா அல்லது வரிசையின் முடிவில் ஒத்திவைக்கப்பட வேண்டுமா.

வகை: `Boolean`<br />
இயல்புநிலை: `true`

### groupLogsByTestSpec

பதிவு வெளியீடு காட்சியைத் தேர்ந்தெடுக்கவும்.

`false` என அமைக்கப்பட்டால், வெவ்வேறு சோதனை கோப்புகளிலிருந்து பதிவுகள் நிகழ்நேரத்தில் அச்சிடப்படும். இணையாக இயக்கும் போது வெவ்வேறு கோப்புகளில் இருந்து வரும் பதிவு வெளியீடுகள் கலக்கலாம் என்பதை கவனிக்கவும்.

`true` என அமைக்கப்பட்டால், பதிவு வெளியீடுகள் டெஸ்ட் ஸ்பெக் மூலம் குழுவாக்கப்பட்டு டெஸ்ட் ஸ்பெக் முடிந்ததும் மட்டுமே அச்சிடப்படும்.

இயல்புநிலையாக, இது `false` என அமைக்கப்பட்டுள்ளது, எனவே பதிவுகள் நிகழ்நேரத்தில் அச்சிடப்படுகின்றன.

வகை: `Boolean`<br />
இயல்புநிலை: `false`

### autoAssertOnTestEnd

WebdriverIO ஒவ்வொரு சோதனையின் முடிவில் தானாகவே அனைத்து மென் உறுதிப்படுத்தல்களையும் சரிபார்க்கிறதா என்பதைக் கட்டுப்படுத்துகிறது. `true` என அமைக்கப்பட்டால், திரட்டப்பட்ட எந்த மென் உறுதிப்படுத்தல்களும் தானாகவே சரிபார்க்கப்படும் மற்றும் ஏதேனும் உறுதிப்படுத்தல்கள் தோல்வியடைந்தால் சோதனை தோல்வியடையும். `false` என அமைக்கப்பட்டால், மென் உறுதிப்படுத்தல்களை சரிபார்க்க நீங்கள் கைமுறையாக assert முறையை அழைக்க வேண்டும்.

வகை: `Boolean`<br />
இயல்புநிலை: `true`

### services

சேவைகள் நீங்கள் கவனிக்க விரும்பாத ஒரு குறிப்பிட்ட வேலையைக் கையாளுகின்றன. அவை கிட்டத்தட்ட எவ்வித முயற்சியுமின்றி உங்கள் சோதனை அமைவை மேம்படுத்துகின்றன.

வகை: `String[]|Object[]`<br />
இயல்புநிலை: `[]`

### framework

WDIO டெஸ்ட்ரன்னரால் பயன்படுத்தப்பட வேண்டிய சோதனை கட்டமைப்பை வரையறுக்கிறது.

வகை: `String`<br />
இயல்புநிலை: `mocha`<br />
விருப்பங்கள்: `mocha` | `jasmine`

### mochaOpts, jasmineOpts and cucumberOpts

குறிப்பிட்ட கட்டமைப்பு தொடர்பான விருப்பங்கள். எந்த விருப்பங்கள் கிடைக்கும் என்பதற்கு கட்டமைப்பு அடாப்டர் ஆவணங்களைப் பார்க்கவும். இதைப் பற்றி மேலும் படிக்க [Frameworks](frameworks) ஐப் பார்க்கவும்.

வகை: `Object`<br />
இயல்புநிலை: `{ timeout: 10000 }`

### cucumberFeaturesWithLineNumbers

வரி எண்களுடன் கூடிய குக்கும்பர் அம்சங்களின் பட்டியல் ([cucumber கட்டமைப்பைப் பயன்படுத்தும் போது](./Frameworks.md#using-cucumber)).

வகை: `String[]`
இயல்புநிலை: `[]`

### reporters

பயன்படுத்த வேண்டிய அறிக்கையாளர்களின் பட்டியல். ஒரு அறிக்கையாளர் ஒரு சரமாகவோ அல்லது
`['reporterName', { /* reporter options */}]` வரிசையாகவோ இருக்கலாம், இதில் முதல் உறுப்பு அறிக்கையாளர் பெயருடன் ஒரு சரம் மற்றும் இரண்டாவது உறுப்பு அறிக்கையாளர் விருப்பங்களுடன் ஒரு பொருள்.

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

அறிக்கையாளர்கள் அவர்களின் பதிவுகளை ஒத்திசைக்கப்பட்டிருக்கிறார்களா என்பதை அவர்கள் தங்கள் பதிவுகளை ஒத்திசையற்ற முறையில் (எ.கா. பதிவுகள் மூன்றாம் தரப்பு விற்பனையாளருக்கு ஸ்ட்ரீம் செய்யப்படும் போது) அறிக்கை செய்யும்போது, அறிக்கையாளர் எந்த இடைவெளியில் சரிபார்க்க வேண்டும் என்பதைத் தீர்மானிக்கிறது.

வகை: `Number`<br />
இயல்புநிலை: `100` (ms)

### reporterSyncTimeout

டெஸ்ட்ரன்னரால் பிழை ஏற்படும் வரை அறிக்கையாளர்கள் அவர்களின் அனைத்து பதிவுகளையும் பதிவேற்ற முடிக்க அதிகபட்ச நேரத்தைத் தீர்மானிக்கிறது.

வகை: `Number`<br />
இயல்புநிலை: `5000` (ms)

### execArgv

child processes தொடங்கும்போது குறிப்பிட Node arguments.

வகை: `String[]`<br />
இயல்புநிலை: `null`

### filesToWatch

டெஸ்ட்ரன்னருக்கு `--watch` கொடியுடன் இயக்கும்போது, பிற கோப்புகளை கூடுதலாக கண்காணிக்க கூறும் கிளாப் ஆதரிக்கும் சரம் பேட்டர்ன்களின் பட்டியல், எ.கா. பயன்பாட்டு கோப்புகள். இயல்பாக டெஸ்ட்ரன்னர் ஏற்கனவே அனைத்து ஸ்பெக் கோப்புகளையும் கண்காணிக்கிறது.

வகை: `String[]`<br />
இயல்புநிலை: `[]`

### updateSnapshots

உங்கள் ஸ்னாப்ஷாட்களை புதுப்பிக்க விரும்பினால் true என அமைக்கவும். ஒரு CLI அளவுருவின் ஒரு பகுதியாக பயன்படுத்த பரிந்துரைக்கப்படுகிறது, எ.கா. `wdio run wdio.conf.js --s`.

வகை: `'new' | 'all' | 'none'`<br />
இயல்புநிலை: வழங்கப்படவில்லை மற்றும் சோதனைகள் CI இல் இயங்கினால் `none`, வழங்கப்படவில்லை என்றால் `new`, அல்லது வழங்கப்பட்ட ஒன்று

### resolveSnapshotPath

இயல்புநிலை ஸ்னாப்ஷாட் பாதையை மேலெழுதுகிறது. எடுத்துக்காட்டாக, சோதனைக் கோப்புகளுக்கு அடுத்ததாக ஸ்னாப்ஷாட்களை சேமிக்க.

```ts title="wdio.conf.ts"
export const config: WebdriverIO.Config = {
    resolveSnapshotPath: (testPath, snapExtension) => testPath + snapExtension,
}
```

வகை: `(testPath: string, snapExtension: string) => string`<br />
இயல்புநிலை: சோதனைக் கோப்புக்கு அடுத்ததாக `__snapshots__` கோப்பகத்தில் ஸ்னாப்ஷாட் கோப்புகளை சேமிக்கிறது

### tsConfigPath

WDIO TypeScript கோப்புகளை தொகுக்க `tsx` ஐப் பயன்படுத்துகிறது. உங்கள் TSConfig தற்போதைய பணி இயக்க கோப்பகத்திலிருந்து தானாகவே கண்டறியப்படுகிறது, ஆனால் நீங்கள் ஒரு தனிப்பயன் பாதையை இங்கே குறிப்பிடலாம் அல்லது TSX_TSCONFIG_PATH சுற்றுச்சூழல் மாறியை அமைக்கலாம்.

`tsx` ஆவணங்களைப் பார்க்கவும்: https://tsx.is/dev-api/node-cli#custom-tsconfig-json-path

வகை: `String`<br />
இயல்புநிலை: `null`<br />

## ஹுக்குகள்

WDIO டெஸ்ட்ரன்னர் சோதனை வாழ்க்கை சுழற்சியின் குறிப்பிட்ட நேரங்களில் ஹுக்குகள் தூண்டப்பட அமைக்க அனுமதிக்கிறது. இது தனிப்பயன் செயல்களை (எ.கா. சோதனை தோல்வியுறும்போது திரைப்பிடிப்பு எடுக்கவும்) அனுமதிக்கிறது.

ஒவ்வொரு ஹுக்கிற்கும் வாழ்க்கை சுழற்சி பற்றிய குறிப்பிட்ட தகவல் அளவுருக்களாக உள்ளது (எ.கா. சோதனை தொகுப்பு அல்லது சோதனை பற்றிய தகவல்). அனைத்து ஹுக் பண்புகள் பற்றி [எங்கள் உதாரண கட்டமைப்பில்](https://github.com/webdriverio/webdriverio/blob/master/examples/wdio.conf.js#L183-L326) மேலும் படிக்கவும்.

**குறிப்பு:** சில ஹுக்குகள் (`onPrepare`, `onWorkerStart`, `onWorkerEnd` மற்றும் `onComplete`) வேறுபட்ட செயல்முறைகளில் செயல்படுத்தப்படுகின்றன, எனவே தொழிலாளர் செயல்முறையில் வசிக்கும் மற்ற ஹுக்குகளுடன் எந்தவொரு உலகளாவிய தரவையும் பகிர்ந்து கொள்ள முடியாது.

### onPrepare

அனைத்து தொழிலாளர்களும் தொடங்குவதற்கு முன் ஒரு முறை செயல்படுத்தப்படுகிறது.

அளவுருக்கள்:

- `config` (`object`): WebdriverIO கட்டமைப்பு பொருள்
- `param` (`object[]`): திறன்களின் விவரங்களின் பட்டியல்

### onWorkerStart

ஒரு தொழிலாளர் செயல்முறை தொடங்கப்படுவதற்கு முன் செயல்படுத்தப்படுகிறது மற்றும் அந்த தொழிலாளருக்கான குறிப்பிட்ட சேவையை துவக்கவும் ஒத்திசைவற்ற முறையில் இயக்க நேர சூழல்களை மாற்றவும் பயன்படுத்தப்படலாம்.

அளவுருக்கள்:

- `cid` (`string`): திறன் id (எ.கா 0-0)
- `caps` (`object`): தொழிலாளர் செயல்முறையில் தொடங்கப்படும் அமர்வுக்கான திறன்களைக் கொண்டிருக்கிறது
- `specs` (`string[]`): தொழிலாளர் செயல்முறையில் இயக்கப்படும் ஸ்பெக்ஸ்
- `args` (`object`): தொழிலாளர் துவக்கப்பட்டதும் முக்கிய கட்டமைப்புடன் இணைக்கப்படும் பொருள்
- `execArgv` (`string[]`): தொழிலாளர் செயல்முறைக்கு அனுப்பப்படும் சரம் மதிப்புருக்களின் பட்டியல்

### onWorkerEnd

ஒரு தொழிலாளர் செயல்முறை வெளியேறிய உடனேயே செயல்படுத்தப்படுகிறது.

அளவுருக்கள்:

- `cid` (`string`): திறன் id (எ.கா 0-0)
- `exitCode` (`number`): 0 - வெற்றி, 1 - தோல்வி
- `specs` (`string[]`): தொழிலாளர் செயல்முறையில் இயக்கப்படும் ஸ்பெக்ஸ்
- `retries` (`number`): [_"Add retries on a per-specfile basis"_](./Retry.md#add-retries-on-a-per-specfile-basis) இல் வரையறுக்கப்பட்டபடி பயன்படுத்தப்படும் ஸ்பெக் நிலை மறுமுயற்சிகளின் எண்ணிக்கை

### beforeSession

webdriver அமர்வு மற்றும் சோதனை கட்டமைப்பை துவக்குவதற்கு சற்று முன்பு செயல்படுத்தப்படுகிறது. திறன் அல்லது ஸ்பெக்கைப் பொறுத்து கட்டமைப்புகளை கையாள இது உங்களை அனுமதிக்கிறது.

அளவுருக்கள்:

- `config` (`object`): WebdriverIO கட்டமைப்பு பொருள்
- `caps` (`object`): தொழிலாளர் செயல்முறையில் தொடங்கப்படும் அமர்வுக்கான திறன்களைக் கொண்டிருக்கிறது
- `specs` (`string[]`): தொழிலாளர் செயல்முறையில் இயக்கப்படும் ஸ்பெக்ஸ்

### before

சோதனை செயல்பாடு தொடங்குவதற்கு முன்பு செயல்படுத்தப்படுகிறது. இந்த நேரத்தில் நீங்கள் `browser` போன்ற அனைத்து உலகளாவிய மாறிகளையும் அணுகலாம். இது தனிப்பயன் கட்டளைகளை வரையறுக்க சரியான இடமாகும்.

அளவுருக்கள்:

- `caps` (`object`): தொழிலாளர் செயல்முறையில் தொடங்கப்படும் அமர்வுக்கான திறன்களைக் கொண்டிருக்கிறது
- `specs` (`string[]`): தொழிலாளர் செயல்முறையில் இயக்கப்படும் ஸ்பெக்ஸ்
- `browser` (`object`): உருவாக்கப்பட்ட உலாவி/சாதன அமர்வின் நிகழ்வு

### beforeSuite

தொகுப்பு தொடங்குவதற்கு முன் செயல்படுத்தப்படும் ஹுக் (Mocha/Jasmine இல் மட்டுமே)

அளவுருக்கள்:

- `suite` (`object`): தொகுப்பு விவரங்கள்

### beforeHook

தொகுப்பிற்குள் ஒரு ஹுக் தொடங்குவதற்கு *முன்பு* செயல்படுத்தப்படும் ஹுக் (எ.கா. Mocha இல் beforeEach ஐ அழைப்பதற்கு முன் இயங்குகிறது)

அளவுருக்கள்:

- `test` (`object`): சோதனை விவரங்கள்
- `context` (`object`): சோதனை சூழல் (Cucumber இல் World பொருளைக் குறிக்கிறது)

### afterHook

தொகுப்பிற்குள் ஒரு ஹுக் முடிந்த *பின்* செயல்படுத்தப்படும் ஹுக் (எ.கா. Mocha இல் afterEach ஐ அழைத்த பிறகு இயங்குகிறது)

அளவுருக்கள்:

- `test` (`object`): சோதனை விவரங்கள்
- `context` (`object`): சோதனை சூழல் (Cucumber இல் World பொருளைக் குறிக்கிறது)
- `result` (`object`): ஹுக் முடிவு (`error`, `result`, `duration`, `passed`, `retries` பண்புகளைக் கொண்டுள்ளது)

### beforeTest

ஒரு சோதனைக்கு முன் செயல்படுத்தப்படும் செயல்பாடு (Mocha/Jasmine இல் மட்டுமே).

அளவுருக்கள்:

- `test` (`object`): சோதனை விவரங்கள்
- `context` (`object`): சோதனை செயல்படுத்தப்பட்ட நோக்கம் பொருள்

### beforeCommand

ஒரு WebdriverIO கட்டளை செயல்படுத்தப்படுவதற்கு முன் இயங்குகிறது.

அளவுருக்கள்:

- `commandName` (`string`): கட்டளை பெயர்
- `args` (`*`): கட்டளை பெறும் மதிப்புருக்கள்

### afterCommand

ஒரு WebdriverIO கட்டளை செயல்படுத்தப்பட்ட பிறகு இயங்குகிறது.

அளவுருக்கள்:

- `commandName` (`string`): கட்டளை பெயர்
- `args` (`*`): கட்டளை பெறும் மதிப்புருக்கள்
- `result` (`*`): கட்டளையின் முடிவு
- `error` (`Error`): பிழை பொருள் ஏதேனும் இருந்தால்

### afterTest

ஒரு சோதனை (Mocha/Jasmine இல்) முடிந்த பிறகு செயல்படுத்தப்படும் செயல்பாடு.

அளவுருக்கள்:

- `test` (`object`): சோதனை விவரங்கள்
- `context` (`object`): சோதனை செயல்படுத்தப்பட்ட நோக்கம் பொருள்
- `result.error` (`Error`): சோதனை தோல்வியடைந்தால் பிழை பொருள், இல்லையெனில் `undefined`
- `result.result` (`Any`): சோதனை செயல்பாட்டின் திருப்ப பொருள்
- `result.duration` (`Number`): சோதனை காலம்
- `result.passed` (`Boolean`): சோதனை தேர்ச்சி பெற்றால் உண்மை, இல்லையெனில் பொய்
- `result.retries` (`Object`): [Mocha மற்றும் Jasmine](./Retry.md#rerun-single-tests-in-jasmine-or-mocha) இல் வரையறுக்கப்பட்டுள்ளதைப் போல் ஒற்றை சோதனை தொடர்பான மறுமுயற்சிகள் மற்றும் [Cucumber](./Retry.md#rerunning-in-cucumber) பற்றிய தகவல், எ.கா. `{ attempts: 0, limit: 0 }`, பார்க்கவும்
- `result` (`object`): ஹுக் முடிவு (`error`, `result`, `duration`, `passed`, `retries` பண்புகளைக் கொண்டுள்ளது)

### afterSuite

தொகுப்பு முடிந்த பிறகு செயல்படுத்தப்படும் ஹுக் (Mocha/Jasmine இல் மட்டுமே)

அளவுருக்கள்:

- `suite` (`object`): தொகுப்பு விவரங்கள்

### after

அனைத்து சோதனைகளும் முடிந்த பிறகு செயல்படுத்தப்படுகிறது. சோதனையிலிருந்து அனைத்து உலகளாவிய மாறிகளையும் நீங்கள் இன்னும் அணுகலாம்.

அளவுருக்கள்:

- `result` (`number`): 0 - சோதனை தேர்ச்சி, 1 - சோதனை தோல்வி
- `caps` (`object`): தொழிலாளர் செயல்முறையில் தொடங்கப்படும் அமர்வுக்கான திறன்களைக் கொண்டிருக்கிறது
- `specs` (`string[]`): தொழிலாளர் செயல்முறையில் இயக்கப்படும் ஸ்பெக்ஸ்

### afterSession

webdriver அமர்வை முடித்த உடனேயே செயல்படுத்தப்படுகிறது.

அளவுருக்கள்:

- `config` (`object`): WebdriverIO கட்டமைப்பு பொருள்
- `caps` (`object`): தொழிலாளர் செயல்முறையில் தொடங்கப்படும் அமர்வுக்கான திறன்களைக் கொண்டிருக்கிறது
- `specs` (`string[]`): தொழிலாளர் செயல்முறையில் இயக்கப்படும் ஸ்பெக்ஸ்

### onComplete

அனைத்து தொழிலாளர்களும் மூடப்பட்டு செயல்முறை வெளியேறும் நிலையில் செயல்படுத்தப்படுகிறது. onComplete ஹுக்கில் ஏற்படும் பிழை சோதனை ஓட்டம் தோல்வியடைவதற்கு காரணமாகும்.

அளவுருக்கள்:

- `exitCode` (`number`): 0 - வெற்றி, 1 - தோல்வி
- `config` (`object`): WebdriverIO கட்டமைப்பு பொருள்
- `caps` (`object`): தொழிலாளர் செயல்முறையில் தொடங்கப்படும் அமர்வுக்கான திறன்களைக் கொண்டிருக்கிறது
- `result` (`object`): சோதனை முடிவுகளைக் கொண்ட முடிவுகள் பொருள்

### onReload

ஒரு புதுப்பித்தல் நிகழும் போது செயல்படுத்தப்படுகிறது.

அளவுருக்கள்:

- `oldSessionId` (`string`): பழைய அமர்வின் ID
- `newSessionId` (`string`): புதிய அமர்வின் ID

### beforeFeature

Cucumber அம்சத்திற்கு முன் இயங்குகிறது.

அளவுருக்கள்:

- `uri` (`string`): அம்ச கோப்பிற்கான பாதை
- `feature` ([`GherkinDocument.IFeature`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/json-to-messages/javascript/src/cucumber-generic/JSONSchema.ts#L8-L17)): Cucumber அம்ச பொருள்

### afterFeature

Cucumber அம்சத்திற்குப் பிறகு இயங்குகிறது.

அளவுருக்கள்:

- `uri` (`string`): அம்ச கோப்பிற்கான பாதை
- `feature` ([`GherkinDocument.IFeature`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/json-to-messages/javascript/src/cucumber-generic/JSONSchema.ts#L8-L17)): Cucumber அம்ச பொருள்

### beforeScenario

Cucumber சூழ்நிலைக்கு முன் இயங்குகிறது.

அளவுருக்கள்:

- `world` ([`ITestCaseHookParameter`](https://github.com/cucumber/cucumber-js/blob/ac124f7b2be5fa54d904c7feac077a2657b19440/src/support_code_library_builder/types.ts#L10-L15)): ஊறுகாய் மற்றும் சோதனை படி பற்றிய தகவலைக் கொண்ட உலக பொருள்
- `context` (`object`): Cucumber உலக பொருள்

### afterScenario

Cucumber சூழ்நிலைக்குப் பிறகு இயங்குகிறது.

அளவுருக்கள்:

- `world` ([`ITestCaseHookParameter`](https://github.com/cucumber/cucumber-js/blob/ac124f7b2be5fa54d904c7feac077a2657b19440/src/support_code_library_builder/types.ts#L10-L15)): ஊறுகாய் மற்றும் சோதனை படி பற்றிய தகவலைக் கொண்ட உலக பொருள்
- `result` (`object`): சூழ்நிலை முடிவுகளைக் கொண்ட முடிவுகள் பொருள்
- `result.passed` (`boolean`): சூழ்நிலை தேர்ச்சியடைந்தால் உண்மை
- `result.error` (`string`): சூழ்நிலை தோல்வியுற்றால் பிழை ஸ்டேக்
- `result.duration` (`number`): மில்லிவினாடிகளில் சூழ்நிலையின் கால அளவு
- `context` (`object`): Cucumber உலக பொருள்

### beforeStep

Cucumber படிக்கு முன் இயங்குகிறது.

அளவுருக்கள்:

- `step` ([`Pickle.IPickleStep`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/messages/jsonschema/Pickle.json#L20-L49)): Cucumber படி பொருள்
- `scenario` ([`IPickle`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/messages/jsonschema/Pickle.json#L137-L175)): Cucumber சூழ்நிலை பொருள்
- `context` (`object`): Cucumber உலக பொருள்

### afterStep

Cucumber படிக்குப் பிறகு இயங்குகிறது.

அளவுருக்கள்:

- `step` ([`Pickle.IPickleStep`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/messages/jsonschema/Pickle.json#L20-L49)): Cucumber படி பொருள்
- `scenario` ([`IPickle`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/messages/jsonschema/Pickle.json#L137-L175)): Cucumber சூழ்நிலை பொருள்
- `result`: (`object`): படி முடிவுகளைக் கொண்ட முடிவுகள் பொருள்
- `result.passed` (`boolean`): சூழ்நிலை தேர்ச்சியடைந்தால் உண்மை
- `result.error` (`string`): சூழ்நிலை தோல்வியுற்றால் பிழை ஸ்டேக்
- `result.duration` (`number`): மில்லிவினாடிகளில் சூழ்நிலையின் கால அளவு
- `context` (`object`): Cucumber உலக பொருள்

### beforeAssertion

WebdriverIO உறுதிப்படுத்தல் நடக்கும் முன் செயல்படுத்தப்படும் ஹுக்.

அளவுருக்கள்:

- `params`: உறுதிப்படுத்தல் தகவல்
- `params.matcherName` (`string`): பொருத்திக்காட்டியின் பெயர் (எ.கா. `toHaveTitle`)
- `params.expectedValue`: பொருத்திக்காட்டிக்குள் அனுப்பப்படும் மதிப்பு
- `params.options`: உறுதிப்படுத்தல் விருப்பங்கள்

### afterAssertion

WebdriverIO உறுதிப்படுத்தல் நடந்த பிறகு செயல்படுத்தப்படும் ஹுக்.

அளவுருக்கள்:

- `params`: உறுதிப்படுத்தல் தகவல்
- `params.matcherName` (`string`): பொருத்திக்காட்டியின் பெயர் (எ.கா. `toHaveTitle`)
- `params.expectedValue`: பொருத்திக்காட்டிக்குள் அனுப்பப்படும் மதிப்பு
- `params.options`: உறுதிப்படுத்தல் விருப்பங்கள்
- `params.result`: உறுதிப்படுத்தல் முடிவுகள்
