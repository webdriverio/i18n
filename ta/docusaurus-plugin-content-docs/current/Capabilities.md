---
id: capabilities
title: திறன்கள் (Capabilities)
description: "உங்கள் சோதனைகள் இயங்கும் உலாவி அல்லது மொபைல் சூழலைத் தேர்ந்தெடுக்க, தனிப்பயன் விற்பனையாளர் capabilities மற்றும் சிறப்புப் பயன்பாட்டு நிகழ்வுகள் உட்பட, capabilities-ஐ வரையறுக்கவும்."
---

ஒரு capability என்பது ஒரு தொலைநிலை இடைமுகத்திற்கான (remote interface) வரையறையாகும். உங்கள் சோதனைகளை எந்த உலாவி அல்லது மொபைல் சூழலில் இயக்க விரும்புகிறீர்கள் என்பதைப் புரிந்துகொள்ள இது WebdriverIO-க்கு உதவுகிறது. உள்ளூரில் சோதனைகளை உருவாக்கும்போது பெரும்பாலான நேரங்களில் நீங்கள் ஒரே தொலைநிலை இடைமுகத்தில் இயக்குவதால் capabilities அவ்வளவு முக்கியமானவை அல்ல, ஆனால் CI/CD-இல் பெரிய அளவிலான ஒருங்கிணைப்புச் சோதனைகளை இயக்கும்போது அவை மிகவும் முக்கியமானவையாகின்றன.

:::info

ஒரு capability object-இன் வடிவம் [WebDriver விவரக்குறிப்பால்](https://w3c.github.io/webdriver/#capabilities) தெளிவாக வரையறுக்கப்பட்டுள்ளது. பயனர் வரையறுத்த capabilities அந்த விவரக்குறிப்பைப் பின்பற்றவில்லை என்றால், WebdriverIO testrunner ஆரம்பத்திலேயே தோல்வியடையும்.

:::

## தனிப்பயன் Capabilities

நிலையாக வரையறுக்கப்பட்ட capabilities-இன் எண்ணிக்கை மிகக் குறைவாக இருந்தாலும், automation driver அல்லது தொலைநிலை இடைமுகத்திற்குக் குறிப்பிட்ட தனிப்பயன் capabilities-ஐ எவரும் வழங்கலாம் மற்றும் ஏற்கலாம்:

### உலாவி சார்ந்த Capability நீட்டிப்புகள்

- `goog:chromeOptions`: [Chromedriver](https://chromedriver.chromium.org/capabilities) நீட்டிப்புகள், Chrome-இல் சோதனை செய்வதற்கு மட்டுமே பொருந்தும்
- `moz:firefoxOptions`: [Geckodriver](https://firefox-source-docs.mozilla.org/testing/geckodriver/Capabilities.html) நீட்டிப்புகள், Firefox-இல் சோதனை செய்வதற்கு மட்டுமே பொருந்தும்
- `ms:edgeOptions`: Chromium Edge-ஐச் சோதிக்க EdgeDriver-ஐப் பயன்படுத்தும்போது சூழலைக் குறிப்பிடுவதற்கான [EdgeOptions](https://learn.microsoft.com/en-us/microsoft-edge/webdriver-chromium/capabilities-edge-options)

### Cloud விற்பனையாளர் Capability நீட்டிப்புகள்

- `sauce:options`: [Sauce Labs](https://docs.saucelabs.com/dev/test-configuration-options/#w3c-webdriver-browser-capabilities--optional)
- `bstack:options`: [BrowserStack](https://www.browserstack.com/docs/automate/selenium/organize-tests)
- `tb:options`: [TestingBot](https://testingbot.com/support/other/test-options)
- `LT:Options`: [LambdaTest](https://www.lambdatest.com/support/docs/webdriverio-with-selenium-running-webdriverio-automation-scripts-on-lambdatest-selenium-grid/)
- மேலும் பல...

### Automation Engine Capability நீட்டிப்புகள்

- `appium:xxx`: [Appium](https://appium.io/docs/en/latest/guides/caps/)
- `selenoid:xxx`: [Selenoid](https://github.com/aerokube/selenoid/blob/master/docs/special-capabilities.adoc)
- மேலும் பல...

### உலாவி driver விருப்பங்களை நிர்வகிப்பதற்கான WebdriverIO Capabilities

WebdriverIO உங்களுக்காக உலாவி driver-ஐ நிறுவுதல் மற்றும் இயக்குதலை நிர்வகிக்கிறது. Driver-க்கு அளவுருக்களை அனுப்ப உங்களை அனுமதிக்கும் ஒரு தனிப்பயன் capability-ஐ WebdriverIO பயன்படுத்துகிறது.

#### `wdio:chromedriverOptions`

Chromedriver-ஐத் தொடங்கும்போது அதற்கு அனுப்பப்படும் குறிப்பிட்ட விருப்பங்கள்.

#### `wdio:geckodriverOptions`

Geckodriver-ஐத் தொடங்கும்போது அதற்கு அனுப்பப்படும் குறிப்பிட்ட விருப்பங்கள்.

#### `wdio:edgedriverOptions`

Edgedriver-ஐத் தொடங்கும்போது அதற்கு அனுப்பப்படும் குறிப்பிட்ட விருப்பங்கள்.

#### `wdio:safaridriverOptions`

Safari-ஐத் தொடங்கும்போது அதற்கு அனுப்பப்படும் குறிப்பிட்ட விருப்பங்கள்.

#### `wdio:maxInstances`

<Option type="number">

குறிப்பிட்ட உலாவி/capability-க்கான இணையாக இயங்கும் workers-இன் அதிகபட்ச மொத்த எண்ணிக்கை. இது [maxInstances](#configuration#maxInstances) மற்றும் [maxInstancesPerCapability](configuration/#maxinstancespercapability) ஆகியவற்றை விட முன்னுரிமை பெறுகிறது.

</Option>

#### `wdio:specs`

<Option type="(String | String[])[]">

அந்த உலாவி/capability-க்கான சோதனை இயக்கத்திற்கான specs-ஐ வரையறுக்கவும். இது [வழக்கமான `specs` கட்டமைப்பு விருப்பத்தைப்](configuration#specs) போன்றதே, ஆனால் உலாவி/capability-க்குக் குறிப்பிட்டது. இது `specs`-ஐ விட முன்னுரிமை பெறுகிறது.

</Option>

#### `wdio:exclude`

<Option type="String[]">

அந்த உலாவி/capability-க்கான சோதனை இயக்கத்திலிருந்து specs-ஐ விலக்கவும். இது [வழக்கமான `exclude` கட்டமைப்பு விருப்பத்தைப்](configuration#exclude) போன்றதே, ஆனால் உலாவி/capability-க்குக் குறிப்பிட்டது. உலகளாவிய `exclude` கட்டமைப்பு விருப்பம் பயன்படுத்தப்பட்ட பிறகு விலக்குகிறது.

</Option>

#### `wdio:enforceWebDriverClassic`

<Option type="boolean">

இயல்பாக, WebdriverIO ஒரு WebDriver Bidi அமர்வை (session) நிறுவ முயற்சிக்கிறது. நீங்கள் அதை விரும்பவில்லை என்றால், இந்த நடத்தையை முடக்க இந்தக் கொடியை (flag) அமைக்கலாம்.

</Option>

#### `wdio:electronVersion`

<Option type="string">

`goog:chromeOptions.binary` ஆக அமைக்கப்பட்ட ஒரு Electron பயன்பாட்டைச் சோதிப்பதற்காக, Chrome for Testing-இலிருந்து வரும் Chromedriver-க்குப் பதிலாக இந்த Electron வெளியீட்டுடன் தொகுக்கப்பட்ட Chromedriver-ஐப் பதிவிறக்குகிறது. `browserVersion`-உம் அமைக்கப்பட்டிருந்தால், Electron வெளியீட்டைப் பதிவிறக்க முடியாதபோது அல்லது `CHROMEDRIVER_CDNURL` அமைக்கப்பட்டிருக்கும்போது, WebdriverIO அதற்குப் பதிலாக அந்தப் பதிப்பிற்கான Chromedriver-ஐப் பயன்படுத்துகிறது. Nightly பதிப்புகள் [electron/nightlies](https://github.com/electron/nightlies/releases)-இலிருந்து வருகின்றன. Electron service இதைப் பயன்பாட்டின் Electron பதிப்பிலிருந்து உங்களுக்காக அமைக்கிறது.

```ts
{
    browserName: 'chrome',
    'wdio:electronVersion': '33.2.1',
    // ஒரு BiDi அமர்வு பயன்பாட்டின் சாளரத்தை `data:,` கொண்டு மாற்றுகிறது
    'wdio:enforceWebDriverClassic': true,
    'goog:chromeOptions': {
        binary: './out/my-app-darwin-arm64/my-app.app/Contents/MacOS/my-app'
    }
}
```

</Option>

#### பொதுவான Driver விருப்பங்கள்

அனைத்து drivers-உம் கட்டமைப்பிற்கு வெவ்வேறு அளவுருக்களை வழங்கினாலும், உங்கள் driver அல்லது உலாவியை அமைப்பதற்கு WebdriverIO புரிந்துகொண்டு பயன்படுத்தும் சில பொதுவானவை உள்ளன:

##### `cacheDir`

<Option type="string" default="process.env.WEBDRIVER_CACHE_DIR || os.tmpdir()">

Cache கோப்பகத்தின் மூலத்திற்கான (root) பாதை. ஒரு அமர்வைத் தொடங்க முயற்சிக்கும்போது பதிவிறக்கப்படும் அனைத்து drivers-ஐயும் சேமிக்க இந்தக் கோப்பகம் பயன்படுத்தப்படுகிறது.

</Option>

##### `binary`

<Option type="string">

தனிப்பயன் driver binary-க்கான பாதை. இது அமைக்கப்பட்டால், WebdriverIO ஒரு driver-ஐப் பதிவிறக்க முயற்சிக்காது, மாறாக இந்தப் பாதையால் வழங்கப்படும் driver-ஐப் பயன்படுத்தும். நீங்கள் பயன்படுத்தும் உலாவியுடன் driver இணக்கமாக இருப்பதை உறுதிசெய்யவும்.

இந்தப் பாதையை `CHROMEDRIVER_PATH`, `GECKODRIVER_PATH` அல்லது `EDGEDRIVER_PATH` சூழல் மாறிகள் (environment variables) மூலம் வழங்கலாம்.

</Option>
:::caution

Driver `binary` அமைக்கப்பட்டிருந்தால், WebdriverIO ஒரு driver-ஐப் பதிவிறக்க முயற்சிக்காது, மாறாக இந்தப் பாதையால் வழங்கப்படும் driver-ஐப் பயன்படுத்தும். நீங்கள் பயன்படுத்தும் உலாவியுடன் driver இணக்கமாக இருப்பதை உறுதிசெய்யவும்.

:::

#### தனிப்பயன் Driver பதிவிறக்க Host

பொது driver CDN-களை உங்கள் சூழலிலிருந்து அணுக முடியவில்லை என்றால், எ.கா. நீங்கள் உங்கள் சோதனைகளை ஒரு நிறுவன proxy-க்குப் பின்னால் இயக்குவதால் அல்லது drivers-ஐ ஒரு உள் artifact registry-இல் mirror செய்வதால், பின்வரும் சூழல் மாறிகளைப் பயன்படுத்தி பதிவிறக்கத்தை ஒரு தனிப்பயன் host-க்குத் திருப்பலாம்:

- Chrome: `CHROMEDRIVER_CDNURL`, இயல்புநிலை `https://storage.googleapis.com/chrome-for-testing-public`
- Microsoft Edge: `EDGEDRIVER_CDNURL`, இயல்புநிலை `https://msedgedriver.microsoft.com`

Mirror ஆனது அசல் CDN-இன் அதே பாதைகளின் கீழ் driver archives-ஐ வழங்கும் என எதிர்பார்க்கப்படுகிறது, எ.கா. Chrome-க்கு:

```sh
CHROMEDRIVER_CDNURL=https://artifactory.company.com/chrome-for-testing npx wdio run wdio.conf.js
```

இது driver-ஐ `https://artifactory.company.com/chrome-for-testing/<buildId>/<platform>/chromedriver-<platform>.zip` எனத் தீர்க்கிறது, இங்கு `<platform>` என்பது `linux64`, `linux-arm64`, `mac-x64`, `mac-arm64`, `win32` அல்லது `win64` ஆகியவற்றில் ஒன்றாகும், எ.கா. `.../140.0.7339.207/mac-arm64/chromedriver-mac-arm64.zip`.

:::info முழுமையாக offline சூழல்கள்

இந்த மாறிகள் driver பதிவிறக்கத்தை மட்டுமே திசைதிருப்புகின்றன. WebdriverIO பொது இணையத்தை அணுகாமல் முற்றிலும் தடுக்க, மேலும் நான்கு நிபந்தனைகள் பூர்த்தி செய்யப்பட வேண்டும்:

- **ஒரு உலாவி உள்ளூரில் கிடைக்க வேண்டும்.** நிறுவப்பட்ட Chrome அல்லது Firefox-ஐ WebdriverIO கண்டுபிடிக்க முடியவில்லை என்றால், அது உலாவியையும் பதிவிறக்குகிறது, அந்தப் பதிவிறக்கம் இந்த மாறிகளைப் பின்பற்றாது. உலாவியை கணினியில் நிறுவவும் அல்லது `goog:chromeOptions.binary` / `moz:firefoxOptions.binary` மூலம் WebdriverIO-ஐ அதற்குச் சுட்டவும்.
- **முழு பதிப்பு எண்ணைப் பயன்படுத்தவும்.** `browserVersion` தவிர்க்கப்பட்டால், WebdriverIO உள்ளூர் உலாவியிலிருந்து சரியான பதிப்பைப் படிக்கிறது, மேலும் பதிப்புத் தேடல் தேவையில்லை. நீங்கள் அதை அமைத்தால், முழுமையான நான்கு பகுதி பதிப்பைப் பயன்படுத்தவும், எ.கா. `140.0.7339.207`. ஒரு வெளியீட்டு channel (`stable`), ஒரு milestone (`140`) அல்லது ஒரு பகுதி பதிப்பு (`140.0.7339`) ஆகியவற்றுக்கு, திசைதிருப்ப முடியாத ஒரு பொது Google endpoint-இல் பதிப்புத் தேடல் தேவைப்படுகிறது.
- **Chromedriver ஆனது Chrome for Testing-இலிருந்து வர வேண்டும்.** Linux ARM64-இல் `153.0.8001.0`-ஐ விடப் பழைய Chrome-க்கும், `browserVersion` இல்லாமல் `wdio:electronVersion` பயன்படுத்தும்போதும், Chromedriver ஆனது Electron-இன் GitHub வெளியீடுகளிலிருந்து பதிவிறக்கப்படுகிறது, அதை இந்த மாறிகள் திசைதிருப்புவதில்லை.
- **உங்களுக்குத் தேவையான பதிப்பு mirror-இல் உண்மையில் இருப்பதை உறுதிசெய்யவும்.** உங்கள் host-இலிருந்து driver-ஐப் பெற முடியவில்லை என்றால் — பதிப்பு mirror செய்யப்படாததால், அல்லது அதே அளவில் url தவறாக இருப்பதால் அல்லது நற்சான்றுகள் (credentials) நிராகரிக்கப்பட்டதால் — WebdriverIO ஒரு எச்சரிக்கையைப் பதிவுசெய்து, பின்னர் அறியப்பட்ட மிக நெருக்கமான நல்ல பதிப்பைத் தேடுகிறது, இது மீண்டும் பொது endpoint-ஐ வினவுகிறது. ஒரு இயக்கம் எதிர்பாராதவிதமாக இணையத்தை அணுகினால் அல்லது நீங்கள் கேட்காத பதிப்பைத் தேர்ந்தெடுத்தால், அது முயற்சித்த host-க்கான எச்சரிக்கையைச் சரிபார்க்கவும்.

:::

#### உலாவி சார்ந்த Driver விருப்பங்கள்

Driver-க்கு விருப்பங்களை அனுப்ப, பின்வரும் தனிப்பயன் capabilities-ஐப் பயன்படுத்தலாம்:

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

<Option type="number">

ADB driver இயங்க வேண்டிய port.

எடுத்துக்காட்டு: `9515`

</Option>

##### urlBase

<Option type="string">

கட்டளைகளுக்கான அடிப்படை URL பாதை முன்னொட்டு, எ.கா. `wd/url`.

எடுத்துக்காட்டு: `/`

</Option>

##### logPath

<Option type="string">

Server log-ஐ stderr-க்குப் பதிலாக கோப்பில் எழுதும், log நிலையை `INFO`-க்கு உயர்த்தும்

</Option>

##### logLevel

<Option type="string">

Log நிலையை அமைக்கவும். சாத்தியமான விருப்பங்கள் `ALL`, `DEBUG`, `INFO`, `WARNING`, `SEVERE`, `OFF`.

</Option>

##### verbose

<Option type="boolean">

விரிவாக log செய்யும் (`--log-level=ALL`-க்குச் சமமானது)

</Option>

##### silent

<Option type="boolean">

எதையும் log செய்யாது (`--log-level=OFF`-க்குச் சமமானது)

</Option>

##### appendLog

<Option type="boolean">

Log கோப்பை மீண்டும் எழுதுவதற்குப் பதிலாக அதில் சேர்க்கும்.

</Option>

##### replayable

<Option type="boolean">

Log-ஐ மீண்டும் இயக்க (replay) முடியும் வகையில், விரிவாக log செய்து நீண்ட strings-ஐச் சுருக்காமல் வைக்கும் (சோதனை நிலை).

</Option>

##### readableTimestamp

<Option type="boolean">

Log-இல் படிக்கக்கூடிய நேர முத்திரைகளைச் சேர்க்கும்.

</Option>

##### enableChromeLogs

<Option type="boolean">

உலாவியிலிருந்து வரும் logs-ஐக் காட்டும் (பிற logging விருப்பங்களை மேலெழுதும்).

</Option>

##### bidiMapperPath

<Option type="string">

தனிப்பயன் bidi mapper பாதை.

</Option>

##### allowedIps

<Option type="string[]" default="['']">

EdgeDriver-உடன் இணைக்க அனுமதிக்கப்பட்ட தொலைநிலை IP முகவரிகளின் காற்புள்ளியால் பிரிக்கப்பட்ட அனுமதிப் பட்டியல்.

</Option>

##### allowedOrigins

<Option type="string[]" default="['*']">

EdgeDriver-உடன் இணைக்க அனுமதிக்கப்பட்ட கோரிக்கை மூலங்களின் (request origins) காற்புள்ளியால் பிரிக்கப்பட்ட அனுமதிப் பட்டியல். எந்த host மூலத்தையும் அனுமதிக்க `*`-ஐப் பயன்படுத்துவது ஆபத்தானது!

</Option>

##### spawnOpts

<Option type="SpawnOptionsWithoutStdio | SpawnOptionsWithStdioTuple<StdioOption, StdioOption, StdioOption>" default="undefined">

Driver செயல்முறைக்கு (process) அனுப்பப்பட வேண்டிய விருப்பங்கள்.

</Option>
</TabItem>
<TabItem value="firefox">

அனைத்து Geckodriver விருப்பங்களையும் அதிகாரப்பூர்வ [driver package](https://github.com/webdriverio-community/node-geckodriver#options)-இல் பார்க்கவும்.

</TabItem>
<TabItem value="msedge">

அனைத்து Edgedriver விருப்பங்களையும் அதிகாரப்பூர்வ [driver package](https://github.com/webdriverio-community/node-edgedriver#options)-இல் பார்க்கவும்.

</TabItem>
<TabItem value="safari">

அனைத்து Safaridriver விருப்பங்களையும் அதிகாரப்பூர்வ [driver package](https://github.com/webdriverio-community/node-safaridriver#options)-இல் பார்க்கவும்.

</TabItem>
</Tabs>

## குறிப்பிட்ட பயன்பாட்டு நிகழ்வுகளுக்கான சிறப்பு Capabilities

ஒரு குறிப்பிட்ட பயன்பாட்டு நிகழ்வை அடைய எந்த capabilities பயன்படுத்தப்பட வேண்டும் என்பதைக் காட்டும் எடுத்துக்காட்டுகளின் பட்டியல் இது.

### உலாவியை Headless ஆக இயக்குதல்

Headless உலாவியை இயக்குவது என்பது சாளரம் அல்லது UI இல்லாமல் ஒரு உலாவி நிகழ்வை இயக்குவதாகும். காட்சித்திரை (display) பயன்படுத்தப்படாத CI/CD சூழல்களில் இது பெரும்பாலும் பயன்படுத்தப்படுகிறது. ஒரு உலாவியை headless பயன்முறையில் இயக்க, பின்வரும் capabilities-ஐப் பயன்படுத்தவும்:

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

Safari headless பயன்முறையில் இயங்குவதை [ஆதரிக்கவில்லை](https://discussions.apple.com/thread/251837694) எனத் தெரிகிறது.

</TabItem>
</Tabs>

### வெவ்வேறு உலாவி Channels-ஐ தானியக்கமாக்குதல்

இன்னும் stable ஆக வெளியிடப்படாத ஒரு உலாவி பதிப்பை, எ.கா. Chrome Canary, சோதிக்க விரும்பினால், capabilities-ஐ அமைத்து நீங்கள் தொடங்க விரும்பும் உலாவியைச் சுட்டுவதன் மூலம் அதைச் செய்யலாம், எ.கா.:

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

Chrome-இல் சோதிக்கும்போது, வரையறுக்கப்பட்ட `browserVersion`-ஐ அடிப்படையாகக் கொண்டு WebdriverIO விரும்பிய உலாவி பதிப்பையும் driver-ஐயும் உங்களுக்காகத் தானாகவே பதிவிறக்கும், எ.கா.:

```ts
{
    browserName: 'chrome', // அல்லது 'chromium'
    browserVersion: '116' // அல்லது '116.0.5845.96', 'stable', 'dev', 'canary', 'beta' அல்லது 'latest' ('canary'-ஐப் போன்றது)
}
```

கைமுறையாகப் பதிவிறக்கப்பட்ட உலாவியைச் சோதிக்க விரும்பினால், உலாவிக்கான binary பாதையை இவ்வாறு வழங்கலாம்:

```ts
{
    browserName: 'chrome',  // அல்லது 'chromium'
    'goog:chromeOptions': {
        binary: '/Applications/Google\ Chrome\ Canary.app/Contents/MacOS/Google\ Chrome\ Canary'
    }
}
```

கூடுதலாக, கைமுறையாகப் பதிவிறக்கப்பட்ட driver-ஐப் பயன்படுத்த விரும்பினால், driver-க்கான binary பாதையை இவ்வாறு வழங்கலாம்:

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

Firefox-இல் சோதிக்கும்போது, வரையறுக்கப்பட்ட `browserVersion`-ஐ அடிப்படையாகக் கொண்டு WebdriverIO விரும்பிய உலாவி பதிப்பையும் driver-ஐயும் உங்களுக்காகத் தானாகவே பதிவிறக்கும், எ.கா.:

```ts
{
    browserName: 'firefox',
    browserVersion: '119.0a1' // அல்லது 'latest'
}
```

கைமுறையாகப் பதிவிறக்கப்பட்ட பதிப்பைச் சோதிக்க விரும்பினால், உலாவிக்கான binary பாதையை இவ்வாறு வழங்கலாம்:

```ts
{
    browserName: 'firefox',
    'moz:firefoxOptions': {
        binary: '/Applications/Firefox\ Nightly.app/Contents/MacOS/firefox'
    }
}
```

கூடுதலாக, கைமுறையாகப் பதிவிறக்கப்பட்ட driver-ஐப் பயன்படுத்த விரும்பினால், driver-க்கான binary பாதையை இவ்வாறு வழங்கலாம்:

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

Microsoft Edge-இல் சோதிக்கும்போது, விரும்பிய உலாவி பதிப்பு உங்கள் கணினியில் நிறுவப்பட்டுள்ளதை உறுதிசெய்யவும். இயக்க வேண்டிய உலாவிக்கு WebdriverIO-ஐ இவ்வாறு சுட்டலாம்:

```ts
{
    browserName: 'msedge',
    'ms:edgeOptions': {
        binary: '/Applications/Microsoft\ Edge\ Canary.app/Contents/MacOS/Microsoft\ Edge\ Canary'
    }
}
```

வரையறுக்கப்பட்ட `browserVersion`-ஐ அடிப்படையாகக் கொண்டு WebdriverIO விரும்பிய driver பதிப்பை உங்களுக்காகத் தானாகவே பதிவிறக்கும், எ.கா.:

```ts
{
    browserName: 'msedge',
    browserVersion: '109' // அல்லது '109.0.1467.0', 'stable', 'dev', 'canary', 'beta'
}
```

கூடுதலாக, கைமுறையாகப் பதிவிறக்கப்பட்ட driver-ஐப் பயன்படுத்த விரும்பினால், driver-க்கான binary பாதையை இவ்வாறு வழங்கலாம்:

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

Safari-இல் சோதிக்கும்போது, [Safari Technology Preview](https://developer.apple.com/safari/technology-preview/) உங்கள் கணினியில் நிறுவப்பட்டுள்ளதை உறுதிசெய்யவும். அந்தப் பதிப்பிற்கு WebdriverIO-ஐ இவ்வாறு சுட்டலாம்:

```ts
{
    browserName: 'safari technology preview'
}
```

</TabItem>
</Tabs>

## தனிப்பயன் Capabilities-ஐ நீட்டித்தல்

உதாரணமாக, அந்தக் குறிப்பிட்ட capability-க்கான சோதனைகளுக்குள் பயன்படுத்தப்பட வேண்டிய தன்னிச்சையான தரவைச் சேமிப்பதற்காக, உங்கள் சொந்த capabilities தொகுப்பை வரையறுக்க விரும்பினால், அதை இவ்வாறு அமைப்பதன் மூலம் செய்யலாம்:

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

Capability பெயரிடுதலைப் பொறுத்தவரை [W3C நெறிமுறையைப்](https://w3c.github.io/webdriver/#dfn-extension-capability) பின்பற்ற அறிவுறுத்தப்படுகிறது, இதற்கு ஒரு செயலாக்கம் சார்ந்த namespace-ஐக் குறிக்கும் `:` (முக்காற்புள்ளி) எழுத்து தேவைப்படுகிறது. உங்கள் சோதனைகளுக்குள் உங்கள் தனிப்பயன் capability-ஐ இவ்வாறு அணுகலாம், எ.கா.:

```ts
browser.capabilities['custom:caps']
```

வகைப் பாதுகாப்பை (type safety) உறுதிசெய்ய, WebdriverIO-இன் capability interface-ஐ இவ்வாறு நீட்டிக்கலாம்:

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