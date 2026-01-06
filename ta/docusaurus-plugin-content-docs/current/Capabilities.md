---
id: capabilities
title: திறன்கள்
---

ஒரு திறன் என்பது தொலை இடைமுகத்திற்கான வரையறை ஆகும். இது WebdriverIO-க்கு நீங்கள் எந்த உலாவி அல்லது மொபைல் சூழலில் உங்கள் சோதனைகளை இயக்க விரும்புகிறீர்கள் என்பதைப் புரிந்துகொள்ள உதவுகிறது. உள்ளூரில் சோதனைகளை உருவாக்கும் போது திறன்கள் அதிக முக்கியத்துவம் வாய்ந்ததாக இல்லை, ஏனெனில் நீங்கள் பெரும்பாலும் ஒரு தொலை இடைமுகத்தில் இயக்குகிறீர்கள், ஆனால் CI/CD-இல் பெரிய தொகுப்பு ஒருங்கிணைப்பு சோதனைகளை இயக்கும் போது இது முக்கியமானதாக மாறுகிறது.

:::info

திறன் பொருளின் வடிவம் [WebDriver விவரக்குறிப்பால்](https://w3c.github.io/webdriver/#capabilities) நன்கு வரையறுக்கப்பட்டுள்ளது. பயனர் வரையறுக்கப்பட்ட திறன்கள் அந்த விவரக்குறிப்புடன் ஒத்துப்போகவில்லை என்றால் WebdriverIO டெஸ்ட்ரன்னர் முன்கூட்டியே தோல்வியடையும்.

:::

## தனிப்பயன் திறன்கள்

நிலையான வரையறுக்கப்பட்ட திறன்களின் எண்ணிக்கை மிகவும் குறைவாக இருக்கும் போது, ஒவ்வொருவரும் தானியங்கி இயக்கி அல்லது தொலை இடைமுகத்திற்கு குறிப்பிட்ட தனிப்பயன் திறன்களை வழங்கலாம் மற்றும் ஏற்கலாம்:

### உலாவி குறிப்பிட்ட திறன் நீட்டிப்புகள்

- `goog:chromeOptions`: [Chromedriver](https://chromedriver.chromium.org/capabilities) நீட்டிப்புகள், Chrome-இல் சோதனை செய்வதற்கு மட்டுமே பொருந்தும்
- `moz:firefoxOptions`: [Geckodriver](https://firefox-source-docs.mozilla.org/testing/geckodriver/Capabilities.html) நீட்டிப்புகள், Firefox-இல் சோதனை செய்வதற்கு மட்டுமே பொருந்தும்
- `ms:edgeOptions`: [EdgeOptions](https://learn.microsoft.com/en-us/microsoft-edge/webdriver-chromium/capabilities-edge-options) Chromium Edge-ஐ சோதிப்பதற்கு EdgeDriver பயன்படுத்தும் போது சூழலைக் குறிப்பிட

### கிளவுட் விற்பனையாளர் திறன் நீட்டிப்புகள்

- `sauce:options`: [Sauce Labs](https://docs.saucelabs.com/dev/test-configuration-options/#w3c-webdriver-browser-capabilities--optional)
- `bstack:options`: [BrowserStack](https://www.browserstack.com/docs/automate/selenium/organize-tests)
- `tb:options`: [TestingBot](https://testingbot.com/support/other/test-options)
- `LT:Options`: [LambdaTest](https://www.lambdatest.com/support/docs/webdriverio-with-selenium-running-webdriverio-automation-scripts-on-lambdatest-selenium-grid/)
- மற்றும் பல...

### தானியங்கி என்ஜின் திறன் நீட்டிப்புகள்

- `appium:xxx`: [Appium](https://appium.io/docs/en/latest/guides/caps/)
- `selenoid:xxx`: [Selenoid](https://github.com/aerokube/selenoid/blob/master/docs/special-capabilities.adoc)
- மற்றும் பல...

### உலாவி இயக்கி விருப்பங்களை நிர்வகிக்க WebdriverIO திறன்கள்

WebdriverIO உங்களுக்காக உலாவி இயக்கியை நிறுவி இயக்குவதை நிர்வகிக்கிறது. WebdriverIO இயக்கிக்கு அளவுருக்களை அனுப்ப அனுமதிக்கும் தனிப்பயன் திறனைப் பயன்படுத்துகிறது.

#### `wdio:chromedriverOptions`

Chromedriver தொடங்கும்போது அதற்கு அனுப்பப்படும் குறிப்பிட்ட விருப்பங்கள்.

#### `wdio:geckodriverOptions`

Geckodriver தொடங்கும்போது அதற்கு அனுப்பப்படும் குறிப்பிட்ட விருப்பங்கள்.

#### `wdio:edgedriverOptions`

Edgedriver தொடங்கும்போது அதற்கு அனுப்பப்படும் குறிப்பிட்ட விருப்பங்கள்.

#### `wdio:safaridriverOptions`

Safari தொடங்கும்போது அதற்கு அனுப்பப்படும் குறிப்பிட்ட விருப்பங்கள்.

#### `wdio:maxInstances`

குறிப்பிட்ட உலாவி/திறனுக்கான அதிகபட்ச மொத்த இணை இயங்கும் பணியாளர்களின் எண்ணிக்கை. [maxInstances](#configuration#maxInstances) மற்றும் [maxInstancesPerCapability](configuration/#maxinstancespercapability) ஆகியவற்றை விட முன்னுரிமை பெறுகிறது.

வகை: `number`

#### `wdio:specs`

அந்த உலாவி/திறனுக்கான சோதனை செயல்பாட்டிற்கான விவரக்குறிப்புகளை வரையறுக்கவும். [வழக்கமான `specs` கட்டமைப்பு விருப்பத்தைப்](configuration#specs) போலவே, ஆனால் உலாவி/திறனுக்கு குறிப்பிட்டது. `specs` மேல் முன்னுரிமை பெறுகிறது.

வகை: `(String | String[])[]`

#### `wdio:exclude`

அந்த உலாவி/திறனுக்கான சோதனை செயல்பாட்டிலிருந்து விவரக்குறிப்புகளை விலக்கவும். [வழக்கமான `exclude` கட்டமைப்பு விருப்பத்தைப்](configuration#exclude) போலவே, ஆனால் உலாவி/திறனுக்கு குறிப்பிட்டது. உலகளாவிய `exclude` கட்டமைப்பு விருப்பம் பயன்படுத்தப்பட்ட பிறகு விலக்குகிறது.

வகை: `String[]`

#### `wdio:enforceWebDriverClassic`

இயல்பாக, WebdriverIO ஒரு WebDriver Bidi அமர்வை நிறுவ முயற்சிக்கிறது. நீங்கள் அதை விரும்பவில்லை என்றால், இந்த நடத்தையை முடக்க இந்தக் கொடியை அமைக்கலாம்.

வகை: `boolean`

#### பொதுவான இயக்கி விருப்பங்கள்

அனைத்து இயக்கிகளும் கட்டமைப்புக்கான வெவ்வேறு அளவுருக்களை வழங்கும் போது, WebdriverIO புரிந்து கொண்டு உங்கள் இயக்கி அல்லது உலாவியை அமைக்கப் பயன்படுத்தும் சில பொதுவானவை உள்ளன:

##### `cacheDir`

தற்காலிக நினைவகத்தின் ரூட்டிற்கான பாதை. அமர்வைத் தொடங்க முயற்சிக்கும் போது பதிவிறக்கப்படும் அனைத்து இயக்கிகளையும் சேமிக்க இந்த அடைவு பயன்படுத்தப்படுகிறது.

வகை: `string`<br />
இயல்புநிலை: `process.env.WEBDRIVER_CACHE_DIR || os.tmpdir()`

##### `binary`

தனிப்பயன் இயக்கி பைனரிக்கான பாதை. அமைக்கப்பட்டால் WebdriverIO ஒரு இயக்கியை பதிவிறக்க முயற்சிக்காது, ஆனால் இந்த பாதையால் வழங்கப்படும் ஒன்றைப் பயன்படுத்தும். இயக்கி நீங்கள் பயன்படுத்தும் உலாவியுடன் பொருந்துகிறதா என்பதை உறுதிப்படுத்தவும்.

இந்த பாதையை `CHROMEDRIVER_PATH`, `GECKODRIVER_PATH` அல்லது `EDGEDRIVER_PATH` சுற்றுச்சூழல் மாறிகள் மூலம் வழங்கலாம்.

வகை: `string`

:::caution

இயக்கி `binary` அமைக்கப்பட்டிருந்தால், WebdriverIO ஒரு இயக்கியை பதிவிறக்க முயற்சிக்காது, ஆனால் இந்த பாதையால் வழங்கப்படும் ஒன்றைப் பயன்படுத்தும். இயக்கி நீங்கள் பயன்படுத்தும் உலாவியுடன் பொருந்துகிறதா என்பதை உறுதிப்படுத்தவும்.

:::

#### உலாவி குறிப்பிட்ட இயக்கி விருப்பங்கள்

இயக்கிக்கு விருப்பங்களைப் பரப்புவதற்கு, பின்வரும் தனிப்பயன் திறன்களைப் பயன்படுத்தலாம்:

- Chrome அல்லது Chromium: `wdio:chromedriverOptions`
- Firefox: `wdio:geckodriverOptions`
- Microsoft Egde: `wdio:edgedriverOptions`
- Safari: `wdio:safaridriverOptions`

<Tabs
  defaultValue="chrome"
  values={[
    {label: 'wdio:chromedriverOptions', value: 'chrome'},
    {label: 'wdio:geckodriverOptions', value: 'firefox'},
    {label: 'wdio:edgedriverOptions', value: 'msedge'},
    {label: 'wdio:safaridriverOptions', value: 'safari'},
  ]
}>
<TabItem value="chrome">

##### adbPort
ADB இயக்கி இயங்க வேண்டிய போர்ட்.

எடுத்துக்காட்டு: `9515`

வகை: `number`

##### urlBase
கட்டளைகளுக்கான அடிப்படை URL பாதை முன்னொட்டு, எ.கா. `wd/url`.

எடுத்துக்காட்டு: `/`

வகை: `string`

##### logPath
சர்வர் பதிவை stderr-க்குப் பதிலாக கோப்பில் எழுதவும், பதிவு நிலையை `INFO`-க்கு அதிகரிக்கிறது

வகை: `string`

##### logLevel
பதிவு நிலையை அமைக்கவும். சாத்தியமான விருப்பங்கள் `ALL`, `DEBUG`, `INFO`, `WARNING`, `SEVERE`, `OFF`.

வகை: `string`

##### verbose
விரிவாக பதிவு செய்யவும் (`--log-level=ALL`-க்கு சமமானது)

வகை: `boolean`

##### silent
எதையும் பதிவு செய்யாதே (`--log-level=OFF`-க்கு சமமானது)

வகை: `boolean`

##### appendLog
பதிவு கோப்பை மறுஎழுதுவதற்குப் பதிலாக சேர்க்கவும்.

வகை: `boolean`

##### replayable
விரிவாக பதிவு செய்யவும் மற்றும் நீண்ட சரங்களை துண்டிக்க வேண்டாம், அதனால் பதிவை மீண்டும் இயக்கலாம் (பரிசோதனை).

வகை: `boolean`

##### readableTimestamp
படிக்கக்கூடிய நேர முத்திரைகளை பதிவுக்குச் சேர்க்கவும்.

வகை: `boolean`

##### enableChromeLogs
உலாவியிலிருந்து பதிவுகளைக் காட்டவும் (மற்ற பதிவு விருப்பங்களை மேலெழுதுகிறது).

வகை: `boolean`

##### bidiMapperPath
தனிப்பயன் bidi மேப்பர் பாதை.

வகை: `string`

##### allowedIps
EdgeDriver-க்கு இணைக்க அனுமதிக்கப்பட்ட தொலை IP முகவரிகளின் காற்புள்ளியால் பிரிக்கப்பட்ட அனுமதிப் பட்டியல்.

வகை: `string[]`<br />
இயல்புநிலை: `['']`

##### allowedOrigins
EdgeDriver-க்கு இணைக்க அனுமதிக்கப்பட்ட கோரிக்கை தோற்றங்களின் காற்புள்ளியால் பிரிக்கப்பட்ட அனுமதிப் பட்டியல். எந்த ஹோஸ்ட் தோற்றத்தையும் அனுமதிக்க `*` ஐப் பயன்படுத்துவது ஆபத்தானது!

வகை: `string[]`<br />
இயல்புநிலை: `['*']`

##### spawnOpts
இயக்கி செயல்முறைக்கு அனுப்பப்பட வேண்டிய விருப்பங்கள்.

வகை: `SpawnOptionsWithoutStdio | SpawnOptionsWithStdioTuple<StdioOption, StdioOption, StdioOption>`<br />
இயல்புநிலை: `undefined`

</TabItem>
<TabItem value="firefox">

அதிகாரப்பூர்வ [இயக்கி பேக்கேஜில்](https://github.com/webdriverio-community/node-geckodriver#options) அனைத்து Geckodriver விருப்பங்களையும் காணலாம்.

</TabItem>
<TabItem value="msedge">

அதிகாரப்பூர்வ [இயக்கி பேக்கேஜில்](https://github.com/webdriverio-community/node-edgedriver#options) அனைத்து Edgedriver விருப்பங்களையும் காணலாம்.

</TabItem>
<TabItem value="safari">

அதிகாரப்பூர்வ [இயக்கி பேக்கேஜில்](https://github.com/webdriverio-community/node-safaridriver#options) அனைத்து Safaridriver விருப்பங்களையும் காணலாம்.

</TabItem>
</Tabs>

## குறிப்பிட்ட பயன்பாட்டு வழக்குகளுக்கான சிறப்பு திறன்கள்

இது குறிப்பிட்ட பயன்பாட்டு வழக்கை அடைவதற்கு எந்த திறன்களை பயன்படுத்த வேண்டும் என்பதைக் காட்டும் எடுத்துக்காட்டுகளின் பட்டியல்.

### ஹெட்லெஸ் உலாவியை இயக்கவும்

ஹெட்லெஸ் உலாவியை இயக்குவது என்பது சாளரம் அல்லது UI இல்லாமல் உலாவி நிகழ்வை இயக்குவதாகும். இது பெரும்பாலும் காட்சி பயன்படுத்தப்படாத CI/CD சூழல்களில் பயன்படுத்தப்படுகிறது. உலாவியை ஹெட்லெஸ் முறையில் இயக்க, பின்வரும் திறன்களைப் பயன்படுத்தவும்:

<Tabs
  defaultValue="chrome"
  values={[
    {label: 'Chrome', value: 'chrome'},
    {label: 'Firefox', value: 'firefox'},
    {label: 'Microsoft Edge', value: 'msedge'},
    {label: 'Safari', value: 'safari'},
  ]
}>
<TabItem value="chrome">

```ts
{
    browserName: 'chrome',   // அல்லது 'chromium'
    'goog:chromeOptions': {
        args: ['headless', 'disable-gpu']
    }
}
```

</TabItem>
<TabItem value="firefox">

```ts
    browserName: 'firefox',
    'moz:firefoxOptions': {
        args: ['-headless']
    }
```

</TabItem>
<TabItem value="msedge">

```ts
    browserName: 'msedge',
    'ms:edgeOptions': {
        args: ['--headless']
    }
```

</TabItem>
<TabItem value="safari">

Safari ஹெட்லெஸ் முறையில் இயங்குவதை [ஆதரிப்பதாகத் தெரியவில்லை](https://discussions.apple.com/thread/251837694).

</TabItem>
</Tabs>

### வெவ்வேறு உலாவி சேனல்களை தானியக்கப்படுத்தவும்

நிலையானதாக வெளியிடப்படாத உலாவி பதிப்பை, எ.கா. Chrome Canary, சோதிக்க விரும்பினால், நீங்கள் திறன்களை அமைத்து நீங்கள் தொடங்க விரும்பும் உலாவியைக் குறிக்கலாம், எ.கா.:

<Tabs
  defaultValue="chrome"
  values={[
    {label: 'Chrome', value: 'chrome'},
    {label: 'Firefox', value: 'firefox'},
    {label: 'Microsoft Edge', value: 'msedge'},
    {label: 'Safari', value: 'safari'},
  ]
}>
<TabItem value="chrome">

Chrome-இல் சோதிக்கும் போது, WebdriverIO வரையறுக்கப்பட்ட `browserVersion` அடிப்படையில் விரும்பிய உலாவி பதிப்பு மற்றும் இயக்கியை தானாகவே பதிவிறக்கும், எ.கா.:

```ts
{
    browserName: 'chrome', // அல்லது 'chromium'
    browserVersion: '116' // அல்லது '116.0.5845.96', 'stable', 'dev', 'canary', 'beta' அல்லது 'latest' ('canary' போல)
}
```

கைமுறையாக பதிவிறக்கப்பட்ட உலாவியை சோதிக்க விரும்பினால், உலாவிக்கு பைனரி பாதையை வழங்கலாம்:

```ts
{
    browserName: 'chrome',  // அல்லது 'chromium'
    'goog:chromeOptions': {
        binary: '/Applications/Google\ Chrome\ Canary.app/Contents/MacOS/Google\ Chrome\ Canary'
    }
}
```

கூடுதலாக, கைமுறையாக பதிவிறக்கப்பட்ட இயக்கியைப் பயன்படுத்த விரும்பினால், இயக்கிக்கு பைனரி பாதையை வழங்கலாம்:

```ts
{
    browserName: 'chrome', // அல்லது 'chromium'
    'wdio:chromedriverOptions': {
        binary: '/path/to/chromdriver'
    }
}
```

</TabItem>
<TabItem value="firefox">

Firefox-இல் சோதிக்கும் போது, WebdriverIO வரையறுக்கப்பட்ட `browserVersion` அடிப்படையில் விரும்பிய உலாவி பதிப்பு மற்றும் இயக்கியை தானாகவே பதிவிறக்கும், எ.கா.:

```ts
{
    browserName: 'firefox',
    browserVersion: '119.0a1' // அல்லது 'latest'
}
```

கைமுறையாக பதிவிறக்கப்பட்ட பதிப்பை சோதிக்க விரும்பினால், உலாவிக்கு பைனரி பாதையை வழங்கலாம்:

```ts
{
    browserName: 'firefox',
    'moz:firefoxOptions': {
        binary: '/Applications/Firefox\ Nightly.app/Contents/MacOS/firefox'
    }
}
```

கூடுதலாக, கைமுறையாக பதிவிறக்கப்பட்ட இயக்கியைப் பயன்படுத்த விரும்பினால், இயக்கிக்கு பைனரி பாதையை வழங்கலாம்:

```ts
{
    browserName: 'firefox',
    'wdio:geckodriverOptions': {
        binary: '/path/to/geckodriver'
    }
}
```

</TabItem>
<TabItem value="msedge">

Microsoft Edge-இல் சோதிக்கும் போது, உங்கள் இயந்திரத்தில் விரும்பிய உலாவி பதிப்பு நிறுவப்பட்டுள்ளதா என்பதை உறுதிப்படுத்தவும். உலாவியை இயக்குவதற்கு WebdriverIO-ஐக் குறிக்கலாம்:

```ts
{
    browserName: 'msedge',
    'ms:edgeOptions': {
        binary: '/Applications/Microsoft\ Edge\ Canary.app/Contents/MacOS/Microsoft\ Edge\ Canary'
    }
}
```

WebdriverIO வரையறுக்கப்பட்ட `browserVersion` அடிப்படையில் விரும்பிய இயக்கி பதிப்பை தானாகவே பதிவிறக்கும், எ.கா.:

```ts
{
    browserName: 'msedge',
    browserVersion: '109' // அல்லது '109.0.1467.0', 'stable', 'dev', 'canary', 'beta'
}
```

கூடுதலாக, கைமுறையாக பதிவிறக்கப்பட்ட இயக்கியைப் பயன்படுத்த விரும்பினால், இயக்கிக்கு பைனரி பாதையை வழங்கலாம்:

```ts
{
    browserName: 'msedge',
    'wdio:edgedriverOptions': {
        binary: '/path/to/msedgedriver'
    }
}
```

</TabItem>
<TabItem value="safari">

Safari-இல் சோதிக்கும் போது, உங்கள் இயந்திரத்தில் [Safari Technology Preview](https://developer.apple.com/safari/technology-preview/) நிறுவப்பட்டுள்ளதா என்பதை உறுதிப்படுத்தவும். அந்த பதிப்பை WebdriverIO மூலம் குறிக்கலாம்:

```ts
{
    browserName: 'safari technology preview'
}
```

</TabItem>
</Tabs>

## தனிப்பயன் திறன்களை நீட்டிக்கவும்

உங்கள் சொந்த திறன்களின் தொகுப்பை வரையறுக்க விரும்பினால், எ.கா. அந்த குறிப்பிட்ட திறனுக்கான சோதனைகளுக்குள் பயன்படுத்த தன்னிச்சையான தரவை சேமிக்க, நீங்கள் அமைப்பதன் மூலம் அவ்வாறு செய்யலாம், எ.கா.:

```js title=wdio.conf.ts
export const config = {
    // ...
    capabilities: [{
        browserName: 'chrome',
        'custom:caps': {
            // தனிப்பயன் கட்டமைப்புகள்
        }
    }]
}
```

திறன் பெயரிடலுக்கு [W3C நெறிமுறையைப்](https://w3c.github.io/webdriver/#dfn-extension-capability) பின்பற்ற அறிவுறுத்தப்படுகிறது, இது அமலாக்க குறிப்பிட்ட பெயர்வெளியைக் குறிக்கும் `:` (காற்புள்ளி) எழுத்தைக் கொண்டிருக்க வேண்டும். உங்கள் சோதனைகளில் உங்கள் தனிப்பயன் திறனை அணுகலாம், எ.கா.:

```ts
browser.capabilities['custom:caps']
```

வகை பாதுகாப்பை உறுதிப்படுத்த, WebdriverIO-இன் திறன் இடைமுகத்தை நீட்டிக்கலாம்:

```ts
declare global {
    namespace WebdriverIO {
        interface Capabilities {
            'custom:caps': {
                // ...
            }
        }
    }
}
```