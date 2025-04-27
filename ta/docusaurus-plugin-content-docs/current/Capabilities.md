---
id: capabilities
title: திறன்கள்
---

ஒரு திறன் என்பது ஒரு தொலைதூர இடைமுகத்திற்கான வரையறை ஆகும். இது WebdriverIO நீங்கள் எந்த உலாவி அல்லது மொபைல் சூழலில் உங்கள் சோதனைகளை இயக்க விரும்புகிறீர்கள் என்பதை புரிந்துகொள்ள உதவுகிறது. திறன்கள் உள்ளூரில் சோதனைகளை உருவாக்கும்போது மிகவும் முக்கியமானதாக இல்லை, ஏனெனில் நீங்கள் பெரும்பாலும் ஒரு தொலைதூர இடைமுகத்தில் இயக்குகிறீர்கள், ஆனால் CI/CD இல் பெரிய அளவிலான ஒருங்கிணைப்பு சோதனைகளை இயக்கும்போது முக்கியமானதாக மாறுகிறது.

:::info

திறன் பொருள்களின் வடிவம் [WebDriver விவரக்குறிப்பு](https://w3c.github.io/webdriver/#capabilities) மூலம் நன்கு வரையறுக்கப்பட்டுள்ளது. பயனர் வரையறுக்கப்பட்ட திறன்கள் அந்த விவரக்குறிப்பை கடைப்பிடிக்கவில்லை என்றால் WebdriverIO சோதனை இயக்கி முன்கூட்டியே தோல்வியடையும்.

:::

## தனிப்பயன் திறன்கள்

நிலையான வரையறுக்கப்பட்ட திறன்களின் எண்ணிக்கை மிகக் குறைவாக இருந்தாலும், ஒவ்வொருவரும் தானியக்க இயக்கி அல்லது தொலைதூர இடைமுகத்திற்கு குறிப்பிட்ட தனிப்பயன் திறன்களை வழங்கவும் ஏற்றுக்கொள்ளவும் முடியும்:

### உலாவி குறிப்பிட்ட திறன் நீட்டிப்புகள்

- `goog:chromeOptions`: [Chromedriver](https://chromedriver.chromium.org/capabilities) நீட்டிப்புகள், Chrome இல் சோதிப்பதற்கு மட்டுமே பொருந்தும்
- `moz:firefoxOptions`: [Geckodriver](https://firefox-source-docs.mozilla.org/testing/geckodriver/Capabilities.html) நீட்டிப்புகள், Firefox இல் சோதிப்பதற்கு மட்டுமே பொருந்தும்
- `ms:edgeOptions`: [EdgeOptions](https://learn.microsoft.com/en-us/microsoft-edge/webdriver-chromium/capabilities-edge-options) Chromium Edge ஐ சோதிக்க EdgeDriver ஐப் பயன்படுத்தும்போது சூழலைக் குறிப்பிடுவதற்கு

### கிளவுட் விற்பனையாளர் திறன் நீட்டிப்புகள்

- `sauce:options`: [Sauce Labs](https://docs.saucelabs.com/dev/test-configuration-options/#w3c-webdriver-browser-capabilities--optional)
- `bstack:options`: [BrowserStack](https://www.browserstack.com/docs/automate/selenium/organize-tests)
- `tb:options`: [TestingBot](https://testingbot.com/support/other/test-options)
- மற்றும் பல...

### தானியக்க இயந்திர திறன் நீட்டிப்புகள்

- `appium:xxx`: [Appium](https://appium.github.io/appium.io/docs/en/writing-running-appium/caps/)
- `selenoid:xxx`: [Selenoid](https://github.com/aerokube/selenoid/blob/master/docs/special-capabilities.adoc)
- மற்றும் பல...

### உலாவி இயக்கி விருப்பங்களை நிர்வகிக்க WebdriverIO திறன்கள்

WebdriverIO உங்களுக்காக உலாவி இயக்கியை நிறுவுதல் மற்றும் இயக்குதலை நிர்வகிக்கிறது. WebdriverIO இயக்கிக்கு அளவுருக்களை அனுப்ப அனுமதிக்கும் தனிப்பயன் திறனைப் பயன்படுத்துகிறது.

#### `wdio:chromedriverOptions`

Chromedriver ஐத் தொடங்கும்போது குறிப்பிட்ட விருப்பங்கள் அதற்குள் அனுப்பப்படுகின்றன.

#### `wdio:geckodriverOptions`

Geckodriver ஐத் தொடங்கும்போது குறிப்பிட்ட விருப்பங்கள் அதற்குள் அனுப்பப்படுகின்றன.

#### `wdio:edgedriverOptions`

Edgedriver ஐத் தொடங்கும்போது குறிப்பிட்ட விருப்பங்கள் அதற்குள் அனுப்பப்படுகின்றன.

#### `wdio:safaridriverOptions`

Safari ஐத் தொடங்கும்போது குறிப்பிட்ட விருப்பங்கள் அதற்குள் அனுப்பப்படுகின்றன.

#### `wdio:maxInstances`

குறிப்பிட்ட உலாவி/திறனுக்கான மொத்த இணையான இயங்கும் பணியாளர்களின் அதிகபட்ச எண்ணிக்கை. [maxInstances](#configuration#maxInstances) மற்றும் [maxInstancesPerCapability](configuration/#maxinstancespercapability) ஐ விட முன்னுரிமை எடுக்கிறது.

வகை: `number`

#### `wdio:specs`

அந்த உலாவி/திறனுக்கான சோதனை செயல்பாட்டிற்கான விவரக்குறிப்புகளை வரையறுக்கவும். [வழக்கமான `specs` கட்டமைப்பு விருப்பம்](configuration#specs) போலவே, ஆனால் குறிப்பிட்ட உலாவி/திறனுக்கானது. `specs` ஐ விட முன்னுரிமை பெறுகிறது.

வகை: `(String | String[])[]`

#### `wdio:exclude`

அந்த உலாவி/திறனுக்கான சோதனை செயல்பாட்டிலிருந்து விவரக்குறிப்புகளை விலக்கவும். [வழக்கமான `exclude` கட்டமைப்பு விருப்பம்](configuration#exclude) போலவே, ஆனால் குறிப்பிட்ட உலாவி/திறனுக்கானது. `exclude` ஐ விட முன்னுரிமை பெறுகிறது.

வகை: `String[]`

#### `wdio:enforceWebDriverClassic`

இயல்பாக, WebdriverIO ஒரு WebDriver Bidi அமர்வை நிறுவ முயற்சிக்கிறது. நீங்கள் அதை விரும்பவில்லை என்றால், இந்த நடத்தையை முடக்க இந்தக் கொடியை அமைக்கலாம்.

வகை: `boolean`

#### பொதுவான இயக்கி விருப்பங்கள்

அனைத்து இயக்கிகளும் உள்ளமைவுக்கான வெவ்வேறு அளவுருக்களை வழங்கும் அதே வேளையில், WebdriverIO புரிந்துகொள்ளும் சில பொதுவானவை உள்ளன மற்றும் உங்கள் இயக்கி அல்லது உலாவியை அமைக்க பயன்படுத்துகிறது:

##### `cacheDir`

தற்காலிக கோப்பகத்தின் வேரிற்கான பாதை. இந்த கோப்பகம் ஒரு அமர்வைத் தொடங்க முயற்சிக்கும்போது பதிவிறக்கப்படும் அனைத்து இயக்கிகளையும் சேமிக்கப் பயன்படுகிறது.

வகை: `string`<br />
இயல்புநிலை: `process.env.WEBDRIVER_CACHE_DIR || os.tmpdir()`

##### `binary`

தனிப்பயன் இயக்கி நிரலுக்கான பாதை. அமைக்கப்பட்டால் WebdriverIO ஒரு இயக்கியைப் பதிவிறக்க முயற்சிக்காது, ஆனால் இந்த பாதையால் வழங்கப்படும் ஒன்றைப் பயன்படுத்தும். இயக்கி நீங்கள் பயன்படுத்தும் உலாவியுடன் இணக்கமானதாக இருப்பதை உறுதிசெய்க.

இந்த பாதையை `CHROMEDRIVER_PATH`, `GECKODRIVER_PATH` அல்லது `EDGEDRIVER_PATH` சுற்றுச்சூழல் மாறிகள் மூலம் வழங்கலாம்.

வகை: `string`

:::caution

இயக்கி `binary` அமைக்கப்பட்டால், WebdriverIO ஒரு இயக்கியைப் பதிவிறக்க முயற்சிக்காது, ஆனால் இந்த பாதையால் வழங்கப்படும் ஒன்றைப் பயன்படுத்தும். இயக்கி நீங்கள் பயன்படுத்தும் உலாவியுடன் இணக்கமானதாக இருப்பதை உறுதிசெய்க.

:::

#### உலாவி குறிப்பிட்ட இயக்கி விருப்பங்கள்

இயக்கிக்கு விருப்பங்களை பரப்புவதற்கு, பின்வரும் தனிப்பயன் திறன்களைப் பயன்படுத்தலாம்:

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

உதாரணம்: `9515`

வகை: `number`

##### urlBase
கட்டளைகளுக்கான அடிப்படை URL பாதை முன்னொட்டு, எ.கா. `wd/url`.

உதாரணம்: `/`

வகை: `string`

##### logPath
stderr க்குப் பதிலாக கோப்பில் சேவையக பதிவை எழுதுங்கள், பதிவு நிலையை `INFO` க்கு அதிகரிக்கிறது

வகை: `string`

##### logLevel
பதிவு நிலையை அமைக்கவும். சாத்தியமான விருப்பங்கள் `ALL`, `DEBUG`, `INFO`, `WARNING`, `SEVERE`, `OFF`.

வகை: `string`

##### verbose
வெர்போஸாக பதிவு செய்யவும் (`--log-level=ALL` க்கு சமமானது)

வகை: `boolean`

##### silent
எதையும் பதிவு செய்ய வேண்டாம் (`--log-level=OFF` க்கு சமமானது)

வகை: `boolean`

##### appendLog
பதிவு கோப்பை மறுஎழுதுவதற்குப் பதிலாக சேர்க்கவும்.

வகை: `boolean`

##### replayable
வெர்போஸாக பதிவு செய்து நீண்ட சரங்களை துண்டிக்க வேண்டாம், இதனால் பதிவை மீண்டும் இயக்க முடியும் (சோதனை).

வகை: `boolean`

##### readableTimestamp
பதிவில் படிக்கக்கூடிய நேர முத்திரைகளைச் சேர்க்கவும்.

வகை: `boolean`

##### enableChromeLogs
உலாவியில் இருந்து பதிவுகளைக் காட்டு (பிற பதிவு விருப்பங்களை மீறுகிறது).

வகை: `boolean`

##### bidiMapperPath
தனிப்பயன் bidi மேப்பர் பாதை.

வகை: `string`

##### allowedIps
EdgeDriver உடன் இணைக்க அனுமதிக்கப்பட்ட தொலைநிலை IP முகவரிகளின் காற்புள்ளியால் பிரிக்கப்பட்ட அனுமதிப்பட்டியல்.

வகை: `string[]`<br />
இயல்புநிலை: `['']`

##### allowedOrigins
EdgeDriver உடன் இணைக்க அனுமதிக்கப்பட்ட கோரிக்கை தொடக்கங்களின் காற்புள்ளியால் பிரிக்கப்பட்ட அனுமதிப்பட்டியல். எந்த ஹோஸ்ட் தொடக்கத்தையும் அனுமதிக்க `*` ஐப் பயன்படுத்துவது ஆபத்தானது!

வகை: `string[]`<br />
இயல்புநிலை: `['*']`

##### spawnOpts
இயக்கி செயல்முறைக்கு அனுப்பப்படும் விருப்பங்கள்.

வகை: `SpawnOptionsWithoutStdio | SpawnOptionsWithStdioTuple<StdioOption, StdioOption, StdioOption>`<br />
இயல்புநிலை: `undefined`

</TabItem>
<TabItem value="firefox">

அதிகாரப்பூர்வ [இயக்கி தொகுப்பில்](https://github.com/webdriverio-community/node-geckodriver#options) அனைத்து Geckodriver விருப்பங்களையும் காண்க.

</TabItem>
<TabItem value="msedge">

அதிகாரப்பூர்வ [இயக்கி தொகுப்பில்](https://github.com/webdriverio-community/node-edgedriver#options) அனைத்து Edgedriver விருப்பங்களையும் காண்க.

</TabItem>
<TabItem value="safari">

அதிகாரப்பூர்வ [இயக்கி தொகுப்பில்](https://github.com/webdriverio-community/node-safaridriver#options) அனைத்து Safaridriver விருப்பங்களையும் காண்க.

</TabItem>
</Tabs>

## குறிப்பிட்ட பயன்பாட்டு வழக்குகளுக்கான சிறப்பு திறன்கள்

இது ஒரு குறிப்பிட்ட பயன்பாட்டு வழக்கை அடைய எந்த திறன்களை பயன்படுத்த வேண்டும் என்பதைக் காட்டும் உதாரணங்களின் பட்டியல்.

### உலாவியை தலைப்பில்லாமல் இயக்கவும்

தலைப்பில்லாத உலாவியை இயக்குவது என்பது சாளரம் அல்லது UI இல்லாமல் ஒரு உலாவி நிகழ்வை இயக்குவதாகும். இது பெரும்பாலும் காட்சி பயன்படுத்தப்படாத CI/CD சூழல்களில் பயன்படுத்தப்படுகிறது. உலாவியை தலைப்பில்லாத முறையில் இயக்க, பின்வரும் திறன்களைப் பயன்படுத்தவும்:

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
    browserName: 'chrome',   // or 'chromium'
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

Safari தலைப்பில்லாத முறையில் இயக்க [ஆதரிக்காது](https://discussions.apple.com/thread/251837694) போல் தெரிகிறது.

</TabItem>
</Tabs>

### வெவ்வேறு உலாவி சேனல்களை தானியங்குபடுத்தல்

நிலையானதாக வெளியிடப்படாத உலாவி பதிப்பு, எ.கா. Chrome Canary ஐ நீங்கள் சோதிக்க விரும்பினால், திறன்களை அமைத்து நீங்கள் தொடங்க விரும்பும் உலாவியைச் சுட்டிக்காட்டி அவ்வாறு செய்யலாம், எ.கா.:

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

Chrome இல் சோதிக்கும் போது, WebdriverIO வரையறுக்கப்பட்ட `browserVersion` அடிப்படையில் விரும்பிய உலாவி பதிப்பு மற்றும் இயக்கியை தானாகவே பதிவிறக்கும், எ.கா.:

```ts
{
    browserName: 'chrome', // or 'chromium'
    browserVersion: '116' // or '116.0.5845.96', 'stable', 'dev', 'canary', 'beta' or 'latest' (same as 'canary')
}
```

கைமுறையாக பதிவிறக்கப்பட்ட உலாவியை நீங்கள் சோதிக்க விரும்பினால், பின்வரும் மூலம் உலாவிக்கான இருமை பாதையை வழங்கலாம்:

```ts
{
    browserName: 'chrome',  // or 'chromium'
    'goog:chromeOptions': {
        binary: '/Applications/Google\ Chrome\ Canary.app/Contents/MacOS/Google\ Chrome\ Canary'
    }
}
```

கூடுதலாக, கைமுறையாக பதிவிறக்கப்பட்ட இயக்கியைப் பயன்படுத்த விரும்பினால், பின்வரும் மூலம் இயக்கிக்கான இருமை பாதையை வழங்கலாம்:

```ts
{
    browserName: 'chrome', // or 'chromium'
    'wdio:chromedriverOptions': {
        binary: '/path/to/chromdriver'
    }
}
```

</TabItem>
<TabItem value="firefox">

Firefox இல் சோதிக்கும் போது, WebdriverIO வரையறுக்கப்பட்ட `browserVersion` அடிப்படையில் விரும்பிய உலாவி பதிப்பு மற்றும் இயக்கியை தானாகவே பதிவிறக்கும், எ.கா.:

```ts
{
    browserName: 'firefox',
    browserVersion: '119.0a1' // or 'latest'
}
```

கைமுறையாகப் பதிவிறக்கப்பட்ட பதிப்பைச் சோதிக்க விரும்பினால், பின்வரும் மூலம் உலாவிக்கான இருமை பாதையை வழங்கலாம்:

```ts
{
    browserName: 'firefox',
    'moz:firefoxOptions': {
        binary: '/Applications/Firefox\ Nightly.app/Contents/MacOS/firefox'
    }
}
```

கூடுதலாக, கைமுறையாக பதிவிறக்கப்பட்ட இயக்கியைப் பயன்படுத்த விரும்பினால், பின்வரும் மூலம் இயக்கிக்கான இருமை பாதையை வழங்கலாம்:

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

Microsoft Edge இல் சோதிக்கும் போது, உங்கள் கணினியில் விரும்பிய உலாவி பதிப்பு நிறுவப்பட்டுள்ளதா என்பதை உறுதிப்படுத்தவும். பின்வரும் மூலம் செயல்படுத்துவதற்கான உலாவிக்கு WebdriverIO ஐ இணைக்கலாம்:

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
    browserVersion: '109' // or '109.0.1467.0', 'stable', 'dev', 'canary', 'beta'
}
```

கூடுதலாக, கைமுறையாக பதிவிறக்கப்பட்ட இயக்கியைப் பயன்படுத்த விரும்பினால், பின்வரும் மூலம் இயக்கிக்கான இருமை பாதையை வழங்கலாம்:

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

Safari இல் சோதிக்கும் போது, உங்கள் கணினியில் [Safari Technology Preview](https://developer.apple.com/safari/technology-preview/) நிறுவப்பட்டுள்ளதா என்பதை உறுதிப்படுத்தவும். பின்வரும் மூலம் அந்த பதிப்பை WebdriverIO குறிப்பிடலாம்:

```ts
{
    browserName: 'safari technology preview'
}
```

</TabItem>
</Tabs>

## தனிப்பயன் திறன்களை நீட்டிக்கவும்

நீங்கள் உங்கள் சொந்த திறன்களின் தொகுப்பை வரையறுக்க விரும்பினால், எ.கா. குறிப்பிட்ட திறனுக்கான சோதனைகளுக்குள் பயன்படுத்தப்படும் தன்னிச்சையான தரவை சேமிக்க, நீங்கள் அவ்வாறு செய்யலாம்:

```js title=wdio.conf.ts
export const config = {
    // ...
    capabilities: [{
        browserName: 'chrome',
        'custom:caps': {
            // custom configurations
        }
    }]
}
```

திறன் பெயரிடுதலைப் பொறுத்தவரை [W3C நெறிமுறையைப்](https://w3c.github.io/webdriver/#dfn-extension-capability) பின்பற்றுவது அறிவுறுத்தப்படுகிறது, இது ஒரு `:` (காற்புள்ளி) எழுத்தைக் கொண்டிருக்க வேண்டும், இது ஒரு குறிப்பிட்ட இடைவெளியைக் குறிக்கிறது. உங்கள் சோதனைகளுக்குள், உங்கள் தனிப்பயன் திறனை பின்வரும் மூலம் அணுகலாம்:

```ts
browser.capabilities['custom:caps']
```

வகை பாதுகாப்பை உறுதிசெய்ய, WebdriverIO திறன் இடைமுகத்தை பின்வருமாறு நீட்டிக்கலாம்:

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