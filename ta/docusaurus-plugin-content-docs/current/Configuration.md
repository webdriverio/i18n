---
id: configuration
title: கட்டமைப்பு
description: "WebDriver, தனித்த WebdriverIO மற்றும் WDIO testrunner ஆகியவற்றுக்கான அனைத்து கட்டமைப்பு விருப்பங்களையும், அனைத்து testrunner hooks உட்பட, இங்கே காணலாம்."
---

[அமைப்பு வகையைப்](/docs/setuptypes) பொறுத்து (எ.கா. raw protocol bindings, தனித்த தொகுப்பாக WebdriverIO அல்லது WDIO testrunner பயன்படுத்துதல்), சூழலைக் கட்டுப்படுத்த வெவ்வேறு விருப்பங்கள் கிடைக்கின்றன.

## WebDriver விருப்பங்கள்

[`webdriver`](https://www.npmjs.com/package/webdriver) protocol தொகுப்பைப் பயன்படுத்தும்போது பின்வரும் விருப்பங்கள் வரையறுக்கப்படுகின்றன:

### protocol

<Option type="String" default="http">

driver server உடன் தொடர்புகொள்ளும்போது பயன்படுத்த வேண்டிய protocol.

</Option>

### hostname

<Option type="String" default="0.0.0.0">

உங்கள் driver server-இன் host.

</Option>

### port

<Option type="Number" default="undefined">

உங்கள் driver server இயங்கும் port.

</Option>

### path

<Option type="String" default="/">

driver server endpoint-க்கான பாதை.

</Option>

### queryParams

<Option type="Object" default="undefined">

driver server-க்கு அனுப்பப்படும் query parameters.

</Option>

### user

<Option type="String" default="undefined">

உங்கள் cloud சேவை பயனர்பெயர் ([Sauce Labs](https://saucelabs.com), [Browserstack](https://www.browserstack.com), [TestingBot](https://testingbot.com) அல்லது [TestMu AI](https://www.testmuai.com/) கணக்குகளுக்கு மட்டுமே செயல்படும்). இது அமைக்கப்பட்டால், WebdriverIO தானாகவே உங்களுக்கான இணைப்பு விருப்பங்களை அமைக்கும். நீங்கள் cloud வழங்குநரைப் பயன்படுத்தவில்லை என்றால், வேறு எந்த WebDriver backend-ஐயும் அங்கீகரிக்க இதைப் பயன்படுத்தலாம்.

</Option>

### key

<Option type="String" default="undefined">

உங்கள் cloud சேவை அணுகல் key அல்லது secret key ([Sauce Labs](https://saucelabs.com), [Browserstack](https://www.browserstack.com), [TestingBot](https://testingbot.com) அல்லது [TestMu AI](https://www.testmuai.com/) கணக்குகளுக்கு மட்டுமே செயல்படும்). இது அமைக்கப்பட்டால், WebdriverIO தானாகவே உங்களுக்கான இணைப்பு விருப்பங்களை அமைக்கும். நீங்கள் cloud வழங்குநரைப் பயன்படுத்தவில்லை என்றால், வேறு எந்த WebDriver backend-ஐயும் அங்கீகரிக்க இதைப் பயன்படுத்தலாம்.

</Option>

### capabilities

<Option type="Object" default="null">

உங்கள் WebDriver session-இல் இயக்க விரும்பும் capabilities-ஐ வரையறுக்கிறது. மேலும் விவரங்களுக்கு [WebDriver Protocol](https://w3c.github.io/webdriver/#capabilities)-ஐப் பார்க்கவும்.

WebDriver அடிப்படையிலான capabilities-உடன், remote browser அல்லது சாதனத்தை ஆழமாகக் கட்டமைக்க அனுமதிக்கும் browser மற்றும் vendor சார்ந்த விருப்பங்களையும் நீங்கள் பயன்படுத்தலாம். இவை அந்தந்த vendor ஆவணங்களில் விவரிக்கப்பட்டுள்ளன, எ.கா.:

- `goog:chromeOptions`: [Google Chrome](https://chromedriver.chromium.org/capabilities#h.p_ID_106)-க்கு
- `moz:firefoxOptions`: [Mozilla Firefox](https://firefox-source-docs.mozilla.org/testing/geckodriver/Capabilities.html)-க்கு
- `ms:edgeOptions`: [Microsoft Edge](https://docs.microsoft.com/en-us/microsoft-edge/webdriver-chromium/capabilities-edge-options#using-the-edgeoptions-class)-க்கு
- `sauce:options`: [Sauce Labs](https://docs.saucelabs.com/dev/test-configuration-options/#desktop-and-mobile-capabilities-sauce-specific--optional)-க்கு
- `bstack:options`: [BrowserStack](https://www.browserstack.com/automate/capabilities?tag=selenium-4#)-க்கு
- `selenoid:options`: [Selenoid](https://github.com/aerokube/selenoid/blob/master/docs/special-capabilities.adoc)-க்கு

கூடுதலாக, Sauce Labs [Automated Test Configurator](https://docs.saucelabs.com/basics/platform-configurator/) ஒரு பயனுள்ள கருவியாகும், இது நீங்கள் விரும்பும் capabilities-ஐ கிளிக் செய்து தேர்ந்தெடுப்பதன் மூலம் இந்த object-ஐ உருவாக்க உதவுகிறது.

</Option>
**எடுத்துக்காட்டு:**

```js
{
    browserName: 'chrome', // விருப்பங்கள்: `chrome`, `edge`, `firefox`, `safari`
    browserVersion: '27.0', // browser பதிப்பு
    platformName: 'Windows 10' // OS தளம்
}
```

நீங்கள் மொபைல் சாதனங்களில் web அல்லது native சோதனைகளை இயக்கினால், `capabilities` WebDriver protocol-இலிருந்து வேறுபடுகிறது. மேலும் விவரங்களுக்கு [Appium Docs](https://appium.io/docs/en/latest/guides/caps/)-ஐப் பார்க்கவும்.

### logLevel

<Option type="String" default="info" values="trace | debug | info | warn | error | silent">

logging விவர அளவின் நிலை.

</Option>

### outputDir

<Option type="String" default="null">

அனைத்து testrunner log கோப்புகளையும் (reporter logs மற்றும் `wdio` logs உட்பட) சேமிக்கும் கோப்பகம். இது அமைக்கப்படவில்லை என்றால், அனைத்து logs-உம் `stdout`-க்கு stream செய்யப்படும். பெரும்பாலான reporters `stdout`-க்கு log செய்யும்படி உருவாக்கப்பட்டுள்ளதால், அறிக்கையை ஒரு கோப்பில் சேமிப்பது அதிக அர்த்தமுள்ள குறிப்பிட்ட reporters-க்கு மட்டுமே (எடுத்துக்காட்டாக `junit` reporter) இந்த விருப்பத்தைப் பயன்படுத்த பரிந்துரைக்கப்படுகிறது.

standalone முறையில் இயக்கும்போது, WebdriverIO உருவாக்கும் ஒரே log `wdio` log மட்டுமே.

</Option>

### connectionRetryTimeout

<Option type="Number" default="120000">

driver அல்லது grid-க்கான எந்த WebDriver கோரிக்கைக்குமான timeout.

</Option>

### connectionRetryCount

<Option type="Number" default="3">

Selenium server-க்கான கோரிக்கை மறுமுயற்சிகளின் அதிகபட்ச எண்ணிக்கை.

</Option>

### bidiResponseTimeout

<Option type="Number" default="180000">

ஒரு WebDriver Bidi கட்டளை browser-இலிருந்து பதிலைப் பெறுவதற்கான timeout (ms-இல்). இயல்புநிலையை விட முடிவடைய நியாயமாக அதிக நேரம் எடுக்கும் கட்டளைகளை (எ.கா. [`execute`](/docs/api/browser/execute)) நீங்கள் இயக்கினால் இதை அதிகரிக்கவும், இல்லையெனில் browser முடிப்பதற்கு முன்பே WebdriverIO காத்திருப்பதை நிறுத்திவிடும்.

</Option>

### agent

<Option type="Object" default={`{
    http: new http.Agent({ keepAlive: true }),
    https: new https.Agent({ keepAlive: true })
}`}>

கோரிக்கைகளை அனுப்ப தனிப்பயன்` http`/`https`/`http2` [agent](https://www.npmjs.com/package/got#agent)-ஐப் பயன்படுத்த அனுமதிக்கிறது.

</Option>

### headers

<Option type="Object" default={`{}`}>

ஒவ்வொரு WebDriver கோரிக்கையிலும் அனுப்ப வேண்டிய தனிப்பயன் `headers`-ஐக் குறிப்பிடவும். உங்கள் Selenium Grid-க்கு Basic Authentication தேவைப்பட்டால், உங்கள் WebDriver கோரிக்கைகளை அங்கீகரிக்க இந்த விருப்பத்தின் மூலம் `Authorization` header-ஐ அனுப்ப பரிந்துரைக்கிறோம், எ.கா.:

```ts wdio.conf.ts
import { Buffer } from 'buffer';
// சூழல் மாறிகளிலிருந்து பயனர்பெயர் மற்றும் கடவுச்சொல்லைப் படிக்கவும்
const username = process.env.SELENIUM_GRID_USERNAME;
const password = process.env.SELENIUM_GRID_PASSWORD;

// பயனர்பெயர் மற்றும் கடவுச்சொல்லை colon பிரிப்பானுடன் இணைக்கவும்
const credentials = `${username}:${password}`;
// Base64 பயன்படுத்தி credentials-ஐ encode செய்யவும்
const encodedCredentials = Buffer.from(credentials).toString('base64');

export const config: WebdriverIO.Config = {
    // ...
    headers: {
        Authorization: `Basic ${encodedCredentials}`
    }
    // ...
}
```

</Option>

### transformRequest

<Option type="(RequestOptions) => RequestOptions" default="none">

ஒரு WebDriver கோரிக்கை அனுப்பப்படுவதற்கு முன் [HTTP request options](https://github.com/sindresorhus/got#options)-ஐ இடைமறிக்கும் function

</Option>

### transformResponse

<Option type="(Response, RequestOptions) => Response" default="none">

ஒரு WebDriver பதில் வந்த பிறகு HTTP response objects-ஐ இடைமறிக்கும் function. இந்த function-க்கு அசல் response object முதல் argument-ஆகவும், அதற்குரிய `RequestOptions` இரண்டாவது argument-ஆகவும் அனுப்பப்படுகின்றன.

</Option>

### strictSSL

<Option type="Boolean" default="true">

SSL சான்றிதழ் செல்லுபடியாக இருக்க வேண்டியதில்லையா என்பது.
இதை `STRICT_SSL` அல்லது `strict_ssl` என்ற சூழல் மாறிகள் மூலம் அமைக்கலாம்.

</Option>

### enableDirectConnect

<Option type="Boolean" default="true">

[Appium direct connection அம்சத்தை](https://appiumpro.com/editions/86-connecting-directly-to-appium-hosts-in-distributed-environments) இயக்க வேண்டுமா என்பது.
இந்த flag இயக்கப்பட்டிருக்கும்போது பதிலில் சரியான keys இல்லையென்றால் இது எதையும் செய்யாது.

</Option>

### cacheDir

<Option type="String" default="process.env.WEBDRIVER_CACHE_DIR || os.tmpdir()">

cache கோப்பகத்தின் root-க்கான பாதை. session-ஐத் தொடங்க முயற்சிக்கும்போது பதிவிறக்கப்படும் அனைத்து drivers-ஐயும் சேமிக்க இந்தக் கோப்பகம் பயன்படுத்தப்படுகிறது.

</Option>

### maskingPatterns

<Option type="String" default="undefined">

மேலும் பாதுகாப்பான logging-க்கு, `maskingPatterns` மூலம் அமைக்கப்படும் regular expressions log-இலிருந்து உணர்திறன் வாய்ந்த தகவல்களை மறைக்க முடியும்.
 - string வடிவம் என்பது flags உடன் அல்லது இல்லாமல் (எ.கா. `/.../i`) உள்ள ஒரு regular expression ஆகும், பல regular expressions-க்கு comma மூலம் பிரிக்கப்படும்.
 - masking patterns பற்றிய மேலும் விவரங்களுக்கு, [WDIO Logger README-இல் உள்ள Masking Patterns பகுதியைப்](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-logger/README.md#masking-patterns) பார்க்கவும்.

</Option>
**எடுத்துக்காட்டு:**

```js
{
    maskingPatterns: '/--key=([^ ]*)/i,/RESULT (.*)/'
}
```

## WebdriverIO

பின்வரும் விருப்பங்களை (மேலே பட்டியலிடப்பட்டவை உட்பட) standalone முறையில் WebdriverIO உடன் பயன்படுத்தலாம்:

### automationProtocol

<Option type="String" default="webdriver">

உங்கள் browser automation-க்குப் பயன்படுத்த விரும்பும் protocol-ஐ வரையறுக்கவும். தற்போது [`webdriver`](https://www.npmjs.com/package/webdriver) மட்டுமே ஆதரிக்கப்படுகிறது, ஏனெனில் இதுவே WebdriverIO பயன்படுத்தும் முக்கிய browser automation தொழில்நுட்பமாகும்.

வேறு automation தொழில்நுட்பத்தைப் பயன்படுத்தி browser-ஐ automate செய்ய விரும்பினால், பின்வரும் interface-ஐப் பின்பற்றும் ஒரு module-க்குத் தீர்க்கப்படும் பாதைக்கு இந்தப் property-ஐ அமைக்கவும்:

```ts
import type { Capabilities } from '@wdio/types';
import type { Client, AttachOptions } from 'webdriver';

export default class YourAutomationLibrary {
    /**
     * ஒரு automation session-ஐத் தொடங்கி, அதற்குரிய automation கட்டளைகளுடன் ஒரு WebdriverIO [monad](https://github.com/webdriverio/webdriverio/blob/940cd30939864bdbdacb2e94ee6e8ada9b1cc74c/packages/wdio-utils/src/monad.ts)-ஐத்
     * திருப்பி அனுப்பவும். reference implementation-ஆக [webdriver](https://www.npmjs.com/package/webdriver) தொகுப்பைப்
     * பார்க்கவும்
     *
     * @param {Capabilities.RemoteConfig} options WebdriverIO விருப்பங்கள்
     * @param {Function} hook function-இலிருந்து வெளியிடப்படுவதற்கு முன் client-ஐ மாற்ற அனுமதிக்கிறது
     * @param {PropertyDescriptorMap} userPrototype பயனர் தனிப்பயன் protocol கட்டளைகளைச் சேர்க்க அனுமதிக்கிறது
     * @param {Function} customCommandWrapper கட்டளை செயல்படுத்தலை மாற்ற அனுமதிக்கிறது
     * @returns WebdriverIO உடன் இணக்கமான client instance
     */
    static newSession(
        options: Capabilities.RemoteConfig,
        modifier?: (...args: any[]) => any,
        userPrototype?: PropertyDescriptorMap,
        customCommandWrapper?: (...args: any[]) => any
    ): Promise<Client>;

    /**
     * ஏற்கனவே உள்ள sessions-உடன் இணைய பயனரை அனுமதிக்கிறது
     * @optional
     */
    static attachToSession(
        options?: AttachOptions,
        modifier?: (...args: any[]) => any, userPrototype?: {},
        commandWrapper?: (...args: any[]) => any
    ): Client;

    /**
     * புதிய session-க்கான instance session id மற்றும் browser capabilities-ஐ
     * அனுப்பப்பட்ட browser object-இல் நேரடியாக மாற்றுகிறது
     *
     * @optional
     * @param   {object} instance  புதிய browser session-இலிருந்து நாம் பெறும் object.
     * @returns {string}           browser-இன் புதிய session id
     */
    static reloadSession(
        instance: Client,
        newCapabilities?: WebdriverIO.Capabilitie
    ): Promise<string>;
}
```

</Option>

### baseUrl

<Option type="String" default="null">

ஒரு base URL-ஐ அமைப்பதன் மூலம் `url` கட்டளை அழைப்புகளைச் சுருக்கவும்.
- உங்கள் `url` parameter `/` உடன் தொடங்கினால், `baseUrl` முன்னால் சேர்க்கப்படும் (`baseUrl`-இல் பாதை இருந்தால் அதைத் தவிர).
- உங்கள் `url` parameter scheme அல்லது `/` இல்லாமல் தொடங்கினால் (`some/path` போல), முழு `baseUrl` நேரடியாக முன்னால் சேர்க்கப்படும்.

</Option>

### waitforTimeout

<Option type="Number" default="5000">

அனைத்து `waitFor*` கட்டளைகளுக்குமான இயல்புநிலை timeout. (விருப்பப் பெயரில் சிறிய எழுத்து `f` இருப்பதைக் கவனிக்கவும்.) இந்த timeout `waitFor*` உடன் தொடங்கும் கட்டளைகளையும் அவற்றின் இயல்புநிலை காத்திருப்பு நேரத்தையும் __மட்டுமே__ பாதிக்கிறது.

ஒரு _சோதனைக்கான_ timeout-ஐ அதிகரிக்க, framework ஆவணங்களைப் பார்க்கவும்.

</Option>

### waitforInterval

<Option type="Number" default="100">

எதிர்பார்க்கப்பட்ட நிலை (எ.கா. தெரிவுநிலை) மாறியுள்ளதா என்பதைச் சரிபார்க்க அனைத்து `waitFor*` கட்டளைகளுக்குமான இயல்புநிலை இடைவெளி.

</Option>

### strictSelectors

<Option type="Boolean" default="true">

கொடுக்கப்பட்ட selector ஒன்றுக்கு மேற்பட்ட elements-க்குத் தீர்க்கப்படும்போது, முதல் பொருத்தத்தை அமைதியாகப் பயன்படுத்துவதற்குப் பதிலாக [`$`](/docs/api/browser/$) கட்டளை `StrictSelectorError`-ஐ throw செய்யும்படி செய்கிறது. `$$` பாதிக்கப்படாது.

இரண்டாவது argument-ஆக `{ strict: false }`-ஐ அனுப்புவதன் மூலம் ஒரு தனி query-க்கு இதிலிருந்து விலகலாம், எ.கா. `$('button', { strict: false })`.

விவரங்களுக்கு [Selectors](/docs/selectors#strict-mode) வழிகாட்டியைப் பார்க்கவும்.

</Option>

### maxSpyCollectedBodySize

<Option type="Number" default="10485760 (10MB)">

[`mock`](/docs/api/browser/mock) கட்டளையைப் பயன்படுத்தும்போது திருப்பி அனுப்பக்கூடிய response body-இன் அதிகபட்ச அளவு (bytes-இல்). spy செய்யப்பட்ட payload-இன் தரவு சேகரிப்பை முடக்க `0`-ஐப் பயன்படுத்தவும்.

</Option>

### region

<Option type="String" default="us" values="us | eu | us-west-1 | eu-central-1 | us-east-4 | asia-south-2 | staging">

Sauce Labs-இல் இயக்கினால், வெவ்வேறு data centers-இல் சோதனைகளை இயக்கத் தேர்வு செய்யலாம்.
சுருக்கமான region குறியீடுகளான `us` (இயல்புநிலை, `us-west-1`-க்கு ஒத்துப்போகும்) அல்லது `eu` (`eu-central-1`-க்கு ஒத்துப்போகும்) பயன்படுத்தவும், அல்லது முழு region பெயர்களை நேரடியாகப் பயன்படுத்தவும்.

__குறிப்பு:__ உங்கள் Sauce Labs கணக்குடன் இணைக்கப்பட்ட `user` மற்றும் `key` விருப்பங்களை வழங்கினால் மட்டுமே இது விளைவை ஏற்படுத்தும்.

</Option>
*(vm மற்றும்/அல்லது em/simulators-க்கு மட்டும், உண்மையான சாதனங்களை மட்டுமே host செய்யும் `us-east-4` மற்றும் `asia-south-2` தவிர)*

## Testrunner விருப்பங்கள்

பின்வரும் விருப்பங்கள் (மேலே பட்டியலிடப்பட்டவை உட்பட) WDIO testrunner உடன் WebdriverIO-ஐ இயக்குவதற்கு மட்டுமே வரையறுக்கப்பட்டுள்ளன:

### specs

<Option type="(String | String[])[]" default="[]">

சோதனை செயல்படுத்தலுக்கான specs-ஐ வரையறுக்கவும். பல கோப்புகளை ஒரே நேரத்தில் பொருத்த ஒரு glob pattern-ஐக் குறிப்பிடலாம், அல்லது ஒரு glob அல்லது பாதைகளின் தொகுப்பை ஒரே worker process-இல் இயக்க ஒரு array-இல் வைக்கலாம். அனைத்து பாதைகளும் config கோப்பு பாதையிலிருந்து சார்புடையதாகக் கருதப்படும்.

</Option>

### exclude

<Option type="String[]" default="[]">

சோதனை செயல்படுத்தலிலிருந்து specs-ஐ விலக்கவும். அனைத்து பாதைகளும் config கோப்பு பாதையிலிருந்து சார்புடையதாகக் கருதப்படும்.

</Option>

### suites

<Option type="Object" default={`{}`}>

பல்வேறு suites-ஐ விவரிக்கும் ஒரு object, அவற்றை `wdio` CLI-இல் `--suite` விருப்பத்துடன் குறிப்பிடலாம்.

</Option>

### capabilities

<Option type="Object|Object[]" default={`[{ 'wdio:maxInstances': 5, browserName: 'firefox' }]`}>

மேலே விவரிக்கப்பட்ட `capabilities` பகுதியைப் போன்றதே, ஆனால் ஒரு [multi-remote](/docs/multiremote) object-ஐ அல்லது இணையான செயல்படுத்தலுக்காக ஒரு array-இல் பல WebDriver sessions-ஐக் குறிப்பிடும் விருப்பத்துடன்.

[மேலே](/docs/configuration#capabilities) வரையறுக்கப்பட்ட அதே vendor மற்றும் browser சார்ந்த capabilities-ஐ நீங்கள் பயன்படுத்தலாம்.

</Option>

### maxInstances

<Option type="Number" default="100">

மொத்தமாக இணையாக இயங்கும் workers-இன் அதிகபட்ச எண்ணிக்கை.

__குறிப்பு:__ Sauce Labs இயந்திரங்கள் போன்ற வெளிப்புற vendors-இல் சோதனைகள் செய்யப்படும்போது இது `100` வரை அதிக எண்ணாக இருக்கலாம். அங்கு, சோதனைகள் ஒரே இயந்திரத்தில் அல்லாமல், பல VMs-இல் சோதிக்கப்படுகின்றன. சோதனைகள் உள்ளூர் development இயந்திரத்தில் இயக்கப்பட வேண்டுமென்றால், `3`, `4`, அல்லது `5` போன்ற நியாயமான எண்ணைப் பயன்படுத்தவும். அடிப்படையில், இது ஒரே நேரத்தில் தொடங்கப்பட்டு உங்கள் சோதனைகளை இயக்கும் browsers-இன் எண்ணிக்கையாகும், எனவே இது உங்கள் இயந்திரத்தில் எவ்வளவு RAM உள்ளது, மற்றும் உங்கள் இயந்திரத்தில் வேறு எத்தனை apps இயங்குகின்றன என்பதைப் பொறுத்தது.

`wdio:maxInstances` capability-ஐப் பயன்படுத்தி உங்கள் capability objects-க்குள்ளும் `maxInstances`-ஐப் பயன்படுத்தலாம். இது அந்தக் குறிப்பிட்ட capability-க்கான இணையான sessions-இன் எண்ணிக்கையைக் கட்டுப்படுத்தும்.

</Option>

### maxInstancesPerCapability

<Option type="Number" default="100">

ஒவ்வொரு capability-க்கும் மொத்தமாக இணையாக இயங்கும் workers-இன் அதிகபட்ச எண்ணிக்கை.

</Option>

### injectGlobals

<Option type="Boolean" default="true">

WebdriverIO-இன் globals-ஐ (எ.கா. `browser`, `$` மற்றும் `$$`) global சூழலில் சேர்க்கிறது.
நீங்கள் `false` என அமைத்தால், `@wdio/globals`-இலிருந்து import செய்ய வேண்டும், எ.கா.:

```ts
import { browser, $, $$, expect } from '@wdio/globals'
```

குறிப்பு: test framework சார்ந்த globals-ஐச் சேர்ப்பதை WebdriverIO கையாளாது.

</Option>

### bail

<Option type="Number" default="0 (don't bail; run all tests)">

குறிப்பிட்ட எண்ணிக்கையிலான சோதனை தோல்விகளுக்குப் பிறகு உங்கள் சோதனை ஓட்டம் நிற்க வேண்டுமென்றால், `bail`-ஐப் பயன்படுத்தவும்.
(இதன் இயல்புநிலை `0`, இது எதுவாக இருந்தாலும் அனைத்து சோதனைகளையும் இயக்கும்.) **குறிப்பு:** இந்தச் சூழலில் ஒரு சோதனை என்பது ஒரு தனி spec கோப்பில் உள்ள அனைத்து சோதனைகள் (Mocha அல்லது Jasmine பயன்படுத்தும்போது) அல்லது ஒரு feature கோப்பில் உள்ள அனைத்து steps (Cucumber பயன்படுத்தும்போது) ஆகும். ஒரு தனி சோதனைக் கோப்பின் சோதனைகளுக்குள் bail நடத்தையைக் கட்டுப்படுத்த விரும்பினால், கிடைக்கும் [framework](frameworks) விருப்பங்களைப் பார்க்கவும்.

</Option>

### specFileRetries

<Option type="Number" default="0">

ஒரு முழு specfile ஒட்டுமொத்தமாகத் தோல்வியடையும்போது அதை மீண்டும் முயற்சிக்கும் எண்ணிக்கை.

</Option>

### specFileRetriesDelay

<Option type="Number" default="0">

spec கோப்பு மறுமுயற்சிகளுக்கு இடையேயான தாமதம் (விநாடிகளில்)

</Option>

### specFileRetriesDeferred

<Option type="Boolean" default="true">

மறுமுயற்சி செய்யப்படும் spec கோப்புகள் உடனடியாக மீண்டும் முயற்சிக்கப்பட வேண்டுமா அல்லது வரிசையின் இறுதிக்கு ஒத்திவைக்கப்பட வேண்டுமா என்பது.

</Option>

### groupLogsByTestSpec

<Option type="Boolean" default="false">

log வெளியீட்டுக் காட்சியைத் தேர்ந்தெடுக்கவும்.

`false` என அமைக்கப்பட்டால், வெவ்வேறு சோதனைக் கோப்புகளின் logs நிகழ்நேரத்தில் அச்சிடப்படும். இணையாக இயக்கும்போது இது வெவ்வேறு கோப்புகளின் log வெளியீடுகள் கலப்பதற்கு வழிவகுக்கலாம் என்பதைக் கவனிக்கவும்.

`true` என அமைக்கப்பட்டால், log வெளியீடுகள் Test Spec வாரியாகக் குழுவாக்கப்பட்டு, Test Spec முடிந்தவுடன் மட்டுமே அச்சிடப்படும்.

இயல்பாக, இது `false` என அமைக்கப்பட்டுள்ளதால் logs நிகழ்நேரத்தில் அச்சிடப்படுகின்றன.

</Option>

### autoAssertOnTestEnd

<Option type="Boolean" default="true">

ஒவ்வொரு சோதனையின் முடிவிலும் WebdriverIO அனைத்து soft assertions-ஐயும் தானாக assert செய்ய வேண்டுமா என்பதைக் கட்டுப்படுத்துகிறது. `true` என அமைக்கப்படும்போது, சேகரிக்கப்பட்ட soft assertions தானாகச் சரிபார்க்கப்பட்டு, ஏதேனும் assertion தோல்வியடைந்தால் சோதனை தோல்வியடையும். `false` என அமைக்கப்படும்போது, soft assertions-ஐச் சரிபார்க்க நீங்கள் assert method-ஐ கைமுறையாக அழைக்க வேண்டும்.

</Option>

### services

<Option type="String[]|Object[]" default="[]">

நீங்கள் கவனிக்க விரும்பாத ஒரு குறிப்பிட்ட வேலையை services எடுத்துக்கொள்கின்றன. அவை கிட்டத்தட்ட எந்த முயற்சியும் இல்லாமல் உங்கள் சோதனை அமைப்பை மேம்படுத்துகின்றன.

</Option>

### framework

<Option type="String" default="mocha" values="mocha | jasmine | cucumber">

WDIO testrunner பயன்படுத்த வேண்டிய test framework-ஐ வரையறுக்கிறது.

</Option>

### mochaOpts, jasmineOpts and cucumberOpts

<Option type="Object" default={`{ timeout: 10000 }`}>

குறிப்பிட்ட framework தொடர்பான விருப்பங்கள். எந்த விருப்பங்கள் கிடைக்கின்றன என்பதற்கு framework adapter ஆவணங்களைப் பார்க்கவும். இதைப் பற்றி மேலும் [Frameworks](frameworks)-இல் படிக்கவும்.

</Option>

### cucumberFeaturesWithLineNumbers

<Option type="String[]" default="[]">

வரி எண்களுடன் கூடிய cucumber features-இன் பட்டியல் ([cucumber framework பயன்படுத்தும்போது](./Frameworks.md#using-cucumber)).

</Option>

### reporters

<Option type="String[]|Object[]" default="[]">

பயன்படுத்த வேண்டிய reporters-இன் பட்டியல். ஒரு reporter ஒரு string ஆகவோ, அல்லது
`['reporterName', { /* reporter options */}]` என்ற array ஆகவோ இருக்கலாம், இதில் முதல் உறுப்பு reporter பெயருடன் கூடிய string மற்றும் இரண்டாவது உறுப்பு reporter விருப்பங்களுடன் கூடிய object ஆகும்.

</Option>
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

<Option type="Number" default="100 (ms)">

reporters தங்கள் logs-ஐ asynchronous-ஆக அறிக்கையிட்டால் (எ.கா. logs மூன்றாம் தரப்பு vendor-க்கு stream செய்யப்பட்டால்), அவை ஒத்திசைக்கப்பட்டுள்ளனவா என்பதை எந்த இடைவெளியில் சரிபார்க்க வேண்டும் என்பதைத் தீர்மானிக்கிறது.

</Option>

### reporterSyncTimeout

<Option type="Number" default="5000 (ms)">

testrunner ஒரு பிழையை throw செய்வதற்கு முன், reporters தங்கள் அனைத்து logs-ஐயும் பதிவேற்றி முடிக்க வேண்டிய அதிகபட்ச நேரத்தைத் தீர்மானிக்கிறது.

</Option>

### execArgv

<Option type="String[]" default="null">

child processes-ஐத் தொடங்கும்போது குறிப்பிட வேண்டிய Node arguments.

</Option>

### cpuProf

<Option type="Boolean" default="false">

worker process-க்கு CPU profiling-ஐ இயக்கவும். worker process வெளியேறும்போது profile தானாக உருவாக்கப்படும்.

</Option>

### heapProf

<Option type="Boolean" default="false">

worker process-க்கு Heap profiling-ஐ இயக்கவும். worker process வெளியேறும்போது snapshot தானாக உருவாக்கப்படும் (sampling heap profiler-ஐப் பயன்படுத்துகிறது).

</Option>

### profileOutputDir

<Option type="String" default="./profiles">

CPU profiles (`.cpuprofile`) மற்றும் Heap profiles (`.heapprofile`) சேமிக்கப்படும் கோப்பகம்.

</Option>

### filesToWatch

<Option type="String[]" default="[]">

`--watch` flag உடன் இயக்கும்போது, கூடுதலாக மற்ற கோப்புகளை (எ.கா. application கோப்புகள்) கண்காணிக்கும்படி testrunner-க்குச் சொல்லும் glob ஆதரவு கொண்ட string patterns-இன் பட்டியல். இயல்பாக testrunner ஏற்கனவே அனைத்து spec கோப்புகளையும் கண்காணிக்கிறது.

</Option>

### updateSnapshots

<Option type="'new' | 'all' | 'none'" default="none if not provided and tests run in CI, new if not provided, otherwise what's been provided">

உங்கள் snapshots-ஐப் புதுப்பிக்க விரும்பினால் true என அமைக்கவும். ஒரு CLI parameter-இன் பகுதியாகப் பயன்படுத்துவது சிறந்தது, எ.கா. `wdio run wdio.conf.js --s`.

</Option>

### resolveSnapshotPath

<Option type="(testPath: string, snapExtension: string) => string" default="stores snapshot files in __snapshots__ directory next to test file">

இயல்புநிலை snapshot பாதையை மேலெழுதுகிறது. எடுத்துக்காட்டாக, சோதனைக் கோப்புகளுக்கு அருகில் snapshots-ஐச் சேமிக்க.

```ts title="wdio.conf.ts"
export const config: WebdriverIO.Config = {
    resolveSnapshotPath: (testPath, snapExtension) => testPath + snapExtension,
}
```

</Option>

### tsConfigPath

<Option type="String" default="null">

TypeScript கோப்புகளை compile செய்ய WDIO `tsx`-ஐப் பயன்படுத்துகிறது. உங்கள் TSConfig தற்போதைய working directory-இலிருந்து தானாகக் கண்டறியப்படும், ஆனால் இங்கே அல்லது TSX_TSCONFIG_PATH சூழல் மாறியை அமைப்பதன் மூலம் தனிப்பயன் பாதையைக் குறிப்பிடலாம்.

`tsx` ஆவணங்களைப் பார்க்கவும்: https://tsx.is/dev-api/node-cli#custom-tsconfig-json-path

</Option>

### displayServerEnabled

<Option type="Boolean" default="true">

`DISPLAY` அல்லது `WAYLAND_DISPLAY` எதுவும் அமைக்கப்படாதபோது Linux-இல் ஓட்டத்திற்காக ஒரு virtual display-ஐத் தொடங்கவும். நீங்கள் headless-ஆக அல்லது cloud சேவை அல்லது remote grid-இல் மட்டும் இயக்கும்போது `false` என அமைக்கவும். display server தொடங்க வேண்டுமா என்பதை மட்டுமே இது கட்டுப்படுத்துகிறது: `WAYLAND_DISPLAY` மட்டும் அமைக்கப்பட்டிருந்தால், testrunner அப்போதும் ஓட்டத்திற்காக `XDG_SESSION_TYPE`, `GDK_BACKEND` மற்றும் `ELECTRON_OZONE_PLATFORM_HINT`-ஐ `wayland` என அமைக்கும். [Headless & Display Servers](/docs/headless-and-display-servers)-ஐப் பார்க்கவும்.

</Option>

### displayServer

<Option type="String" default="auto" values="auto | wayland | xvfb">

எந்த display server-ஐத் தொடங்க வேண்டும் என்பது. `auto` Weston-ஐ முயற்சிக்கும், Weston இல்லாதபோது அல்லது தொடங்கத் தவறும்போது Xvfb-க்கு மாறும். `wayland` மற்றும் `xvfb` அந்த server-ஐ மட்டுமே முயற்சிக்கும்.

</Option>

### displayServerAutoInstall

<Option type="Boolean" default="false">

நிறுவப்பட்ட எந்த display server-உம் தொடங்காதபோது, இல்லாத display server-ஐ system package manager மூலம் நிறுவவும்.

</Option>

### displayServerAutoInstallMode

<Option type="String" default="sudo" values="root | sudo">

உள்ளமைக்கப்பட்ட நிறுவல் எவ்வாறு இயங்குகிறது: `root` root-ஆக இயங்கும்போது மட்டுமே நிறுவும், `sudo` root அல்லாதபோது non-interactive `sudo -n`-ஐப் பயன்படுத்தும், அல்லது `sudo` நிறுவப்படாதபோது அது இல்லாமலேயே நிறுவும்.

</Option>

### displayServerAutoInstallCommand

<Option type="String | String[]">

உள்ளமைக்கப்பட்ட நிறுவலுக்குப் பதிலாக, உள்ளது உள்ளபடியே மற்றும் `sudo` இல்லாமல் இயக்க வேண்டிய ஒரு கட்டளை. இது `displayServerAutoInstall: true` உடன் மட்டுமே இயங்கும். ஒரு string shell-இல் இயங்கும், ஒரு array shell இல்லாமல் இயங்கும். `auto` உடன், இது முதலில் Weston-க்காக இயங்கும், Weston இன்னும் கிடைக்கவில்லை அல்லது தொடங்கத் தவறினால் மற்றும் Xvfb இன்னும் இல்லையென்றால் மட்டுமே மீண்டும் Xvfb-க்காக இயங்கும். மற்ற server-இன் முயற்சியைத் தவிர்க்க, இது நிறுவும் server-க்கு `displayServer`-ஐ அமைக்கவும்.

</Option>

### displayServerWidth

<Option type="Number" default="1920">

virtual display-இன் திரை அகலம் (pixels-இல்).

</Option>

### displayServerHeight

<Option type="Number" default="1080">

virtual display-இன் திரை உயரம் (pixels-இல்).

</Option>

### displayServerDepth

<Option type="Number" default="24">

virtual display-இன் வண்ண ஆழம். Xvfb-க்கு மட்டும்.

</Option>

## Hooks

சோதனை வாழ்க்கைச் சுழற்சியின் குறிப்பிட்ட நேரங்களில் தூண்டப்படும் hooks-ஐ அமைக்க WDIO testrunner உங்களை அனுமதிக்கிறது. இது தனிப்பயன் செயல்களை அனுமதிக்கிறது (எ.கா. ஒரு சோதனை தோல்வியடைந்தால் screenshot எடுத்தல்).

ஒவ்வொரு hook-உம் வாழ்க்கைச் சுழற்சி பற்றிய குறிப்பிட்ட தகவலை (எ.கா. test suite அல்லது சோதனை பற்றிய தகவல்) parameter-ஆகக் கொண்டுள்ளது. அனைத்து hook properties பற்றியும் [எங்கள் எடுத்துக்காட்டு config](https://github.com/webdriverio/webdriverio/blob/master/examples/wdio.conf.js#L183-L326)-இல் மேலும் படிக்கவும்.

**குறிப்பு:** சில hooks (`onPrepare`, `onWorkerStart`, `onWorkerEnd` மற்றும் `onComplete`) வேறொரு process-இல் செயல்படுத்தப்படுகின்றன, எனவே worker process-இல் உள்ள மற்ற hooks-உடன் எந்த global தரவையும் பகிர முடியாது.

### onPrepare

அனைத்து workers-உம் தொடங்கப்படுவதற்கு முன் ஒருமுறை செயல்படுத்தப்படும்.

Parameters:

- `config` (`object`): WebdriverIO கட்டமைப்பு object
- `param` (`object[]`): capabilities விவரங்களின் பட்டியல்

### onWorkerStart

ஒரு worker process உருவாக்கப்படுவதற்கு முன் செயல்படுத்தப்படும், மேலும் அந்த worker-க்கான குறிப்பிட்ட service-ஐ initialize செய்யவும், runtime சூழல்களை async முறையில் மாற்றவும் பயன்படுத்தலாம்.

Parameters:

- `cid` (`string`): capability id (எ.கா 0-0)
- `caps` (`object`): worker-இல் உருவாக்கப்படும் session-க்கான capabilities-ஐக் கொண்டுள்ளது
- `specs` (`string[]`): worker process-இல் இயக்கப்பட வேண்டிய specs
- `args` (`object`): worker initialize செய்யப்பட்டவுடன் முக்கிய கட்டமைப்புடன் இணைக்கப்படும் object
- `execArgv` (`string[]`): worker process-க்கு அனுப்பப்படும் string arguments-இன் பட்டியல்

### onWorkerEnd

ஒரு worker process வெளியேறிய உடனேயே செயல்படுத்தப்படும்.

Parameters:

- `cid` (`string`): capability id (எ.கா 0-0)
- `exitCode` (`number`): 0 - வெற்றி, 1 - தோல்வி. ஒரு signal மூலம் நிறுத்தப்பட்ட worker அதற்குப் பதிலாக `128` + signal எண்ணை அறிக்கையிடும், எ.கா. `SIGSEGV`-க்கு `139`
- `specs` (`string[]`): worker process-இல் இயக்கப்பட வேண்டிய specs
- `retries` (`number`): [_"Add retries on a per-specfile basis"_](./Retry.md#add-retries-on-a-per-specfile-basis)-இல் வரையறுக்கப்பட்டபடி பயன்படுத்தப்பட்ட spec நிலை மறுமுயற்சிகளின் எண்ணிக்கை
- `signal` (`string`): worker-ஐ நிறுத்திய signal, எ.கா. `SIGSEGV`, அல்லது அது தானாக வெளியேறியிருந்தால் `null`

### beforeSession

webdriver session மற்றும் test framework-ஐ initialize செய்வதற்கு சற்று முன் செயல்படுத்தப்படும். capability அல்லது spec-ஐப் பொறுத்து கட்டமைப்புகளை மாற்ற இது உங்களை அனுமதிக்கிறது.

Parameters:

- `config` (`object`): WebdriverIO கட்டமைப்பு object
- `caps` (`object`): worker-இல் உருவாக்கப்படும் session-க்கான capabilities-ஐக் கொண்டுள்ளது
- `specs` (`string[]`): worker process-இல் இயக்கப்பட வேண்டிய specs

### before

சோதனை செயல்படுத்தல் தொடங்குவதற்கு முன் செயல்படுத்தப்படும். இந்தக் கட்டத்தில் `browser` போன்ற அனைத்து global மாறிகளையும் அணுகலாம். தனிப்பயன் கட்டளைகளை வரையறுக்க இது சரியான இடமாகும்.

Parameters:

- `caps` (`object`): worker-இல் உருவாக்கப்படும் session-க்கான capabilities-ஐக் கொண்டுள்ளது
- `specs` (`string[]`): worker process-இல் இயக்கப்பட வேண்டிய specs
- `browser` (`object`): உருவாக்கப்பட்ட browser/device session-இன் instance

### beforeSuite

suite தொடங்குவதற்கு முன் செயல்படுத்தப்படும் hook (Mocha/Jasmine-இல் மட்டும்)

Parameters:

- `suite` (`object`): suite விவரங்கள்

### beforeHook

suite-க்குள் ஒரு hook தொடங்குவதற்கு *முன்* செயல்படுத்தப்படும் hook (எ.கா. Mocha-வில் beforeEach அழைக்கப்படுவதற்கு முன் இயங்கும்)

Parameters:

- `test` (`object`): சோதனை விவரங்கள்
- `context` (`object`): சோதனை context (Cucumber-இல் World object-ஐக் குறிக்கிறது)

### afterHook

suite-க்குள் ஒரு hook முடிந்த *பிறகு* செயல்படுத்தப்படும் hook (எ.கா. Mocha-வில் afterEach அழைக்கப்பட்ட பிறகு இயங்கும்)

Parameters:

- `test` (`object`): சோதனை விவரங்கள்
- `context` (`object`): சோதனை context (Cucumber-இல் World object-ஐக் குறிக்கிறது)
- `result` (`object`): hook முடிவு (`error`, `result`, `duration`, `passed`, `retries` properties-ஐக் கொண்டுள்ளது)

### beforeTest

ஒரு சோதனைக்கு முன் செயல்படுத்தப்பட வேண்டிய function (Mocha/Jasmine-இல் மட்டும்).

Parameters:

- `test` (`object`): சோதனை விவரங்கள்
- `context` (`object`): சோதனை செயல்படுத்தப்பட்ட scope object

### beforeCommand

ஒரு WebdriverIO கட்டளை செயல்படுத்தப்படுவதற்கு முன் இயங்கும்.

Parameters:

- `commandName` (`string`): கட்டளைப் பெயர்
- `args` (`*`): கட்டளை பெறும் arguments

### afterCommand

ஒரு WebdriverIO கட்டளை செயல்படுத்தப்பட்ட பிறகு இயங்கும்.

Parameters:

- `commandName` (`string`): கட்டளைப் பெயர்
- `args` (`*`): கட்டளை பெறும் arguments
- `result` (`*`): கட்டளையின் முடிவு
- `error` (`Error`): ஏதேனும் இருந்தால் error object

### afterTest

ஒரு சோதனை (Mocha/Jasmine-இல்) முடிந்த பிறகு செயல்படுத்தப்பட வேண்டிய function.

Parameters:

- `test` (`object`): சோதனை விவரங்கள்
- `context` (`object`): சோதனை செயல்படுத்தப்பட்ட scope object
- `result.error` (`Error`): சோதனை தோல்வியடைந்தால் error object, இல்லையெனில் `undefined`
- `result.result` (`Any`): test function-இன் return object
- `result.duration` (`Number`): சோதனையின் கால அளவு
- `result.passed` (`Boolean`): சோதனை வெற்றியடைந்தால் true, இல்லையெனில் false
- `result.retries` (`Object`): [Mocha மற்றும் Jasmine](./Retry.md#rerun-single-tests-in-jasmine-or-mocha) மற்றும் [Cucumber](./Retry.md#rerunning-in-cucumber)-க்கு வரையறுக்கப்பட்டபடி தனி சோதனை தொடர்பான மறுமுயற்சிகள் பற்றிய தகவல், எ.கா. `{ attempts: 0, limit: 0 }`, பார்க்கவும்
- `result` (`object`): hook முடிவு (`error`, `result`, `duration`, `passed`, `retries` properties-ஐக் கொண்டுள்ளது)

### afterSuite

suite முடிந்த பிறகு செயல்படுத்தப்படும் hook (Mocha/Jasmine-இல் மட்டும்)

Parameters:

- `suite` (`object`): suite விவரங்கள்

### after

அனைத்து சோதனைகளும் முடிந்த பிறகு செயல்படுத்தப்படும். சோதனையிலிருந்து அனைத்து global மாறிகளையும் நீங்கள் இன்னும் அணுகலாம்.

Parameters:

- `result` (`number`): 0 - சோதனை வெற்றி, 1 - சோதனை தோல்வி
- `caps` (`object`): worker-இல் உருவாக்கப்படும் session-க்கான capabilities-ஐக் கொண்டுள்ளது
- `specs` (`string[]`): worker process-இல் இயக்கப்பட வேண்டிய specs

### afterSession

webdriver session முடிக்கப்பட்ட உடனேயே செயல்படுத்தப்படும்.

Parameters:

- `config` (`object`): WebdriverIO கட்டமைப்பு object
- `caps` (`object`): worker-இல் உருவாக்கப்படும் session-க்கான capabilities-ஐக் கொண்டுள்ளது
- `specs` (`string[]`): worker process-இல் இயக்கப்பட வேண்டிய specs

### onComplete

அனைத்து workers-உம் நிறுத்தப்பட்டு process வெளியேறவிருக்கும்போது செயல்படுத்தப்படும். onComplete hook-இல் throw செய்யப்படும் பிழை சோதனை ஓட்டம் தோல்வியடைய வழிவகுக்கும்.

Parameters:

- `exitCode` (`number`): 0 - வெற்றி, 1 - தோல்வி
- `config` (`object`): WebdriverIO கட்டமைப்பு object
- `caps` (`object`): worker-இல் உருவாக்கப்படும் session-க்கான capabilities-ஐக் கொண்டுள்ளது
- `result` (`object`): சோதனை முடிவுகளைக் கொண்ட results object

### onReload

ஒரு refresh நிகழும்போது செயல்படுத்தப்படும்.

Parameters:

- `oldSessionId` (`string`): பழைய session-இன் session ID
- `newSessionId` (`string`): புதிய session-இன் session ID

### beforeFeature

ஒரு Cucumber Feature-க்கு முன் இயங்கும்.

Parameters:

- `uri` (`string`): feature கோப்புக்கான பாதை
- `feature` ([`GherkinDocument.IFeature`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/json-to-messages/javascript/src/cucumber-generic/JSONSchema.ts#L8-L17)): Cucumber feature object

### afterFeature

ஒரு Cucumber Feature-க்குப் பிறகு இயங்கும்.

Parameters:

- `uri` (`string`): feature கோப்புக்கான பாதை
- `feature` ([`GherkinDocument.IFeature`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/json-to-messages/javascript/src/cucumber-generic/JSONSchema.ts#L8-L17)): Cucumber feature object

### beforeScenario

ஒரு Cucumber Scenario-க்கு முன் இயங்கும்.

Parameters:

- `world` ([`ITestCaseHookParameter`](https://github.com/cucumber/cucumber-js/blob/ac124f7b2be5fa54d904c7feac077a2657b19440/src/support_code_library_builder/types.ts#L10-L15)): pickle மற்றும் test step பற்றிய தகவலைக் கொண்ட world object
- `context` (`object`): Cucumber World object

### afterScenario

ஒரு Cucumber Scenario-க்குப் பிறகு இயங்கும்.

Parameters:

- `world` ([`ITestCaseHookParameter`](https://github.com/cucumber/cucumber-js/blob/ac124f7b2be5fa54d904c7feac077a2657b19440/src/support_code_library_builder/types.ts#L10-L15)): pickle மற்றும் test step பற்றிய தகவலைக் கொண்ட world object
- `result` (`object`): scenario முடிவுகளைக் கொண்ட results object
- `result.passed` (`boolean`): scenario வெற்றியடைந்தால் true
- `result.error` (`string`): scenario தோல்வியடைந்தால் error stack
- `result.duration` (`number`): milliseconds-இல் scenario-வின் கால அளவு
- `context` (`object`): Cucumber World object

### beforeStep

ஒரு Cucumber Step-க்கு முன் இயங்கும்.

Parameters:

- `step` ([`Pickle.IPickleStep`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/messages/jsonschema/Pickle.json#L20-L49)): Cucumber step object
- `scenario` ([`IPickle`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/messages/jsonschema/Pickle.json#L137-L175)): Cucumber scenario object
- `context` (`object`): Cucumber World object

### afterStep

ஒரு Cucumber Step-க்குப் பிறகு இயங்கும்.

Parameters:

- `step` ([`Pickle.IPickleStep`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/messages/jsonschema/Pickle.json#L20-L49)): Cucumber step object
- `scenario` ([`IPickle`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/messages/jsonschema/Pickle.json#L137-L175)): Cucumber scenario object
- `result`: (`object`): step முடிவுகளைக் கொண்ட results object
- `result.passed` (`boolean`): scenario வெற்றியடைந்தால் true
- `result.error` (`string`): scenario தோல்வியடைந்தால் error stack
- `result.duration` (`number`): milliseconds-இல் scenario-வின் கால அளவு
- `context` (`object`): Cucumber World object

### beforeAssertion

ஒரு WebdriverIO assertion நிகழ்வதற்கு முன் செயல்படுத்தப்படும் hook.

Parameters:

- `params`: assertion தகவல்
- `params.matcherName` (`string`): சோதனை அழைத்த matcher-இன் பெயர் (எ.கா. `toHaveTitle`). ஒரு alias-க்கு, இது alias-இன் பெயராகும் (எ.கா. `toBeExisting`, `toExist` அல்ல).
- `params.expectedValue`: matcher-க்கு அனுப்பப்படும் மதிப்பு
- `params.options`: assertion விருப்பங்கள்

### afterAssertion

ஒரு WebdriverIO assertion நிகழ்ந்த பிறகு செயல்படுத்தப்படும் hook.

Parameters:

- `params`: assertion தகவல்
- `params.matcherName` (`string`): சோதனை அழைத்த matcher-இன் பெயர் (எ.கா. `toHaveTitle`). ஒரு alias-க்கு, இது alias-இன் பெயராகும் (எ.கா. `toBeExisting`, `toExist` அல்ல).
- `params.expectedValue`: matcher-க்கு அனுப்பப்படும் மதிப்பு
- `params.options`: assertion விருப்பங்கள்
- `params.result` (`object`): `pass` (`boolean`) மற்றும் `message()` உடன் கூடிய matcher-இன் முடிவு. மதிப்பு எதிர்பார்க்கப்பட்ட மதிப்புடன் பொருந்தும்போது `pass` என்பது `true` ஆகும், `.not` உடனும் இதுவே: `.not` உடன், `pass` என்பது `false` ஆக இருக்கும்போது assertion வெற்றியடையும்.