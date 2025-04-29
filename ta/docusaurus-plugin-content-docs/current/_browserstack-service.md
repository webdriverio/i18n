---
id: browserstack-service
title: பிரௌசர்ஸ்டாக் சேவை
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-browserstack-service/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> BrowserStack பயனர்களுக்கான உள்ளூர் டன்னல் மற்றும் வேலை மெட்டாடேட்டாவை நிர்வகிக்கும் WebdriverIO சேவை.

## நிறுவுதல்


எளிதான வழி `@wdio/browserstack-service` ஐ உங்கள் `package.json` இல் devDependency ஆக வைத்திருப்பது, இதன் மூலம்:

```sh
npm install @wdio/browserstack-service --save-dev
```

`WebdriverIO` ஐ எவ்வாறு நிறுவுவது என்பது பற்றிய விளக்கங்களை [இங்கே](https://webdriver.io/docs/gettingstarted) காணலாம்.


## கட்டமைப்பு

WebdriverIO க்கு BrowserStack ஆதரவு இயல்பாகவே உள்ளது. நீங்கள் உங்கள் `wdio.conf.js` கோப்பில் `user` மற்றும் `key` ஐ அமைக்க வேண்டும். இந்த சேவை செருகுநிரல் [BrowserStack Tunnel](https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/local-testing) க்கு ஆதரவை வழங்குகிறது. இந்த அம்சத்தை செயல்படுத்த `browserstackLocal: true` ஐயும் அமைக்கவும்.
BrowserStack இல் அமர்வு நிலை அறிக்கை Cucumber விருப்பங்களின் `strict` அமைப்பை மதிக்கும்.

```js
// wdio.conf.js
export const config = {
    // ...
    user: process.env.BROWSERSTACK_USERNAME,
    key: process.env.BROWSERSTACK_ACCESS_KEY,
    services: [
        ['browserstack', {
            testObservability: true,
            testObservabilityOptions: {
                projectName: "Your project name goes here",
                buildName: "The static build job name goes here e.g. Nightly regression"
            },
            browserstackLocal: true
        }]
    ],
    // ...
};
```

## விருப்பங்கள்

BrowserStack சேவைக்கு அங்கீகாரம் பெற உங்கள் கட்டமைப்பில் [`user`](https://webdriver.io/docs/options#user) மற்றும் [`key`](https://webdriver.io/docs/options#key) விருப்பம் இருக்க வேண்டும்.

### testObservability

Test Observability என்பது உங்கள் தானியங்கி சோதனைகளை மேம்படுத்த உதவும் மற்றும் விரைவாக பிழைத்திருத்த உதவும் மேம்பட்ட சோதனை அறிக்கை கருவியாகும். இது browserstack-service இன் அனைத்து பயனர்களுக்கும் `testObservability`​ கொடியை `true` ஆக அமைப்பதன் மூலம் இயல்பாகவே இயக்கப்பட்டுள்ளது. `testObservability`​ கொடியை `false` ஆக அமைப்பதன் மூலம் நீங்கள் இதை முடக்கலாம்.

உங்கள் சோதனைகள் முடிந்ததும், [Test Observability](https://observability.browserstack.com/) க்கு சென்று தனித்துவமான பிழை பகுப்பாய்வு, தானியங்கி நிலையற்ற சோதனை கண்டறிதல் போன்ற கூடுதல் நுண்ணறிவுகளுடன் உங்கள் உருவாக்கங்களை பிழைத்திருத்தலாம்.

நீங்கள் உங்கள் சோதனைகளை BrowserStack உள்கட்டமைப்பில் இயக்காவிட்டாலும் நீங்கள் Test Observability ஐப் பயன்படுத்தலாம். நீங்கள் உங்கள் சோதனைகளை CI இல், உள்ளூர் இயந்திரத்தில், அல்லது பிற கிளவுட் சேவை வழங்குநர்களில் இயக்கினாலும், Test Observability இன்னும் உங்கள் சோதனைகளில் புத்திசாலித்தனமான சோதனை அறிக்கைகள் மற்றும் மேம்பட்ட பகுப்பாய்வுகளை உருவாக்க முடியும்.

நீங்கள் BrowserStack உள்கட்டமைப்பில் உங்கள் சோதனைகளை இயக்காமல் Test Observability ஐப் பயன்படுத்த விரும்பினால், உங்கள் கட்டமைப்பை பின்வருமாறு அமைக்கலாம்:


```js
// wdio.conf.js
export const config = {
    // ...
    services: [
        ['browserstack', {
            testObservability: true,
            testObservabilityOptions: {
                user: process.env.BROWSERSTACK_USERNAME,
                key: process.env.BROWSERSTACK_ACCESS_KEY,
                projectName: "Your project name goes here",
                buildName: "The static build job name goes here e.g. Nightly regression"
            }
        }]
    ],
    // ...
};
```

நீங்கள் Test Observability இன் அனைத்து அம்சங்களையும் [இந்த சாண்ட்பாக்ஸில்](https://observability-demo.browserstack.com/) ஆராயலாம் அல்லது [இங்கே](https://www.browserstack.com/docs/test-observability/overview/what-is-test-observability) இதைப் பற்றி மேலும் படிக்கலாம்.

### browserstackLocal
BrowserStack கிளவுடிலிருந்து உங்கள் கணினி வழியாக இணைப்புகளை ரவுட் செய்ய இதை true என அமைக்கவும்.

வகை: `Boolean`<br />
இயல்புநிலை: `false`

### forcedStop
BrowserStack Local நிறுத்து கால்பேக் அழைக்கப்படுவதற்காக காத்திருக்காமல், முடிவில் BrowserStack Local செயல்முறையை கொல்ல இதை true என அமைக்கவும். இது சோதனை முறையானது மற்றும் அனைவராலும் பயன்படுத்தப்படக்கூடாது. பெரும்பாலும் [இந்த சிக்கலுக்கான](https://github.com/browserstack/browserstack-local-nodejs/issues/41) ஒரு தற்காலிக தீர்வாக அவசியம்.

வகை: `Boolean`<br />
இயல்புநிலை: `false`

### app

[Appium](https://appium.io/) - அப்பியம் அமர்வுகளுக்கு [சோதனைக்கான பயன்பாடாக](https://www.browserstack.com/docs/app-automate/appium/set-up-tests/specify-app) பயன்படுத்த, உங்கள் இயந்திரத்தில் உள்ளூரில் கிடைக்கக்கூடிய ஆப் கோப்பு பாதையை இதனுடன் அமைக்கவும்.

வகை: `String` அல்லது `JsonObject`<br />
இயல்புநிலை: `undefined`

கிடைக்கக்கூடிய ஆப் மதிப்புகளின் பட்டியல்:

#### path
அப்பியத்திற்கான சோதனைக்கான பயன்பாடாக உள்ளூரில் கிடைக்கக்கூடிய ஆப் கோப்பு பாதையைப் பயன்படுத்தவும்.

```js
services: [
  ['browserstack', {
    app: '/path/to/local/app.apk'
    // OR
    app: {
      path: '/path/to/local/app.apk'
    }
  }]
]
```

ஆப் பதிவேற்றும் போது custom_id ஐ அனுப்பவும்.

```js
services: [
  ['browserstack', {
    app: {
      path: '/path/to/local/app.apk',
      custom_id: 'custom_id'
    }
  }]
]
```

#### id
ஆப்பை BrowserStack க்கு பதிவேற்றிய பிறகு திருப்பி அனுப்பப்பட்ட ஆப் URL ஐப் பயன்படுத்தவும்.

```js
services: [
  ['browserstack', {
    app: 'bs://<app-id>'
    // OR
    app: {
      id: 'bs://<app-id>'
    }
  }]
]
```

#### custom_id

ஏற்கனவே பதிவேற்றப்பட்ட ஆப்களின் custom_id ஐப் பயன்படுத்தவும்

```js
services: [
  ['browserstack', {
    app: 'custom_id'
    // OR
    app: {
      custom_id: 'custom_id'
    }
  }]
]
```

#### shareable_id

ஏற்கனவே பதிவேற்றப்பட்ட ஆப்களின் shareable_id ஐப் பயன்படுத்தவும்

```js
services: [
  ['browserstack', {
    app: 'username/custom_id'
    // OR
    app: {
      shareable_id: 'username/custom_id'
    }
  }]
]
```

### preferScenarioName

Cucumber மட்டும். ஒரே ஒரு சிற்றுக்காட்சி இயங்கினால் BrowserStack Automate அமர்வு பெயரை சிற்றுக்காட்சி பெயருக்கு அமைக்கவும்.
[wdio-cucumber-parallel-execution](https://github.com/SimitTomar/wdio-cucumber-parallel-execution) உடன் இணையாக இயங்கும் போது பயனுள்ளதாக இருக்கும்.

வகை: `Boolean`<br />
இயல்புநிலை: `false`

### sessionNameFormat

BrowserStack Automate அமர்வு பெயர் வடிவமைப்பை தனிப்பயனாக்கவும்.

வகை: `Function`<br />
இயல்புநிலை (Cucumber/Jasmine): `(config, capabilities, suiteTitle) => suiteTitle`<br />
இயல்புநிலை (Mocha): `(config, capabilities, suiteTitle, testTitle) => suiteTitle + ' - ' + testTitle`

### sessionNameOmitTestTitle

Mocha மட்டும். BrowserStack Automate அமர்வு பெயருக்கு சோதனை தலைப்பை சேர்க்க வேண்டாம்.

வகை: `Boolean`<br />
இயல்புநிலை: `false`

### sessionNamePrependTopLevelSuiteTitle

Mocha மட்டும். BrowserStack Automate அமர்வு பெயருக்கு முன் உயர் நிலை தொகுப்பு தலைப்பை சேர்க்கவும்.

வகை: `Boolean`<br />
இயல்புநிலை: `false`

### setSessionName

BrowserStack Automate அமர்வு பெயரை தானாகவே அமைக்கவும்.

வகை: `Boolean`<br />
இயல்புநிலை: `true`

### setSessionStatus

BrowserStack Automate அமர்வு நிலையை (passed/failed) தானாகவே அமைக்கவும்.

வகை: `Boolean`<br />
இயல்புநிலை: `true`

### buildIdentifier

**buildIdentifier** என்பது ஒவ்வொரு செயலாக்கத்தையும் வேறுபடுத்தும் தனித்துவமான ஐடி ஆகும், இது buildName உடன் இணைக்கப்படுகிறது. கிடைக்கக்கூடிய வெளிப்பாடுகளிலிருந்து உங்கள் buildIdentifier வடிவத்தைத் தேர்ந்தெடுக்கவும்:
* `BUILD_NUMBER`: ஒவ்வொரு செயலாக்கத்துடனும் ஒரு அதிகரிக்கும் எண்ணிக்கையை உருவாக்குகிறது
* `DATE_TIME`: ஒவ்வொரு செயலாக்கத்துடனும் ஒரு டைம்ஸ்டாம்ப் உருவாக்குகிறது. எ.கா. 05-Nov-19:30

```js
services: [
  ['browserstack', {
    buildIdentifier: '#${BUILD_NUMBER}'
  }]
]
```
Build Identifier தனிப்பயன் வடிவமைப்பு விருப்பங்களை இயக்கும் வேறு எந்த எழுத்துக்களுடனும் ஒன்று அல்லது இரண்டு வெளிப்பாடுகளின் பயன்பாட்டை ஆதரிக்கிறது.

### opts

BrowserStack Local விருப்பங்கள்.

வகை: `Object`<br />
இயல்புநிலை: `{}`

opts ஆக அனுப்பப்படும் கிடைக்கக்கூடிய உள்ளூர் சோதனை மாற்றிகளின் பட்டியல்:

#### Local Identifier

ஒரே நேரத்தில் பல உள்ளூர் சோதனை இணைப்புகளைச் செய்தால், இதை வெவ்வேறு செயல்முறைகளுக்கு தனித்துவமாக அமைக்கவும் -

```js
opts = { localIdentifier: "randomstring" };
```

#### Verbose Logging

விரிவான பதிவை இயக்க -

```js
opts = { verbose: "true" };
```

குறிப்பு - 'verbose' மாற்றியின் சாத்தியமான மதிப்புகள் '1', '2', '3' மற்றும் 'true'

#### Force Local

அனைத்து போக்குவரத்தையும் உள்ளூர் (உங்கள்) இயந்திரம் வழியாக ரூட் செய்ய -

```js
opts = { forceLocal: "true" };
```

#### Folder Testing

உள் சேவையகத்திற்கு பதிலாக உள்ளூர் கோப்புறையை சோதிக்க, இந்த விருப்பத்தின் மதிப்பாக கோப்புறைக்கான பாதையை வழங்கவும் -

```js
opts = { f: "/my/awesome/folder" };
```

#### Force Start

மற்ற இயங்கும் BrowserStack Local நிகழ்வுகளை கொல்ல -

```js
opts = { force: "true" };
```

#### Only Automate

Live மற்றும் Screenshots க்கான உள்ளூர் சோதனையை முடக்கி, Automate மட்டும் இயக்க -

```js
opts = { onlyAutomate: "true" };
```

#### Proxy

உள்ளூர் சோதனைக்கு ப்ராக்ஸி பயன்படுத்த -

- proxyHost: ப்ராக்ஸியின் ஹோஸ்ட்நேம்/IP, இந்த விருப்பம் இல்லையெனில் மீதமுள்ள ப்ராக்ஸி விருப்பங்கள் புறக்கணிக்கப்படும்
- proxyPort: ப்ராக்ஸிக்கான போர்ட், -proxyHost பயன்படுத்தப்படும்போது 3128 க்கு இயல்பாக அமைக்கப்படும்
- proxyUser: ப்ராக்ஸியுடன் இணைப்பதற்கான பயனர்பெயர் (அடிப்படை அங்கீகாரம் மட்டும்)
- proxyPass: USERNAME க்கான கடவுச்சொல், USERNAME காலியாக இருந்தால் அல்லது குறிப்பிடப்படவில்லை என்றால் புறக்கணிக்கப்படும்

```js
opts = {
  proxyHost: "127.0.0.1",
  proxyPort: "8000",
  proxyUser: "user",
  proxyPass: "password",
};
```

#### Local Proxy

உள்ளூர் சோதனையில் உள்ளூர் ப்ராக்ஸி பயன்படுத்த -

- localProxyHost: ப்ராக்ஸியின் ஹோஸ்ட்நேம்/IP, இந்த விருப்பம் இல்லையெனில் மீதமுள்ள ப்ராக்ஸி விருப்பங்கள் புறக்கணிக்கப்படும்
- localProxyPort: ப்ராக்ஸிக்கான போர்ட், -localProxyHost பயன்படுத்தப்படும்போது 8081 க்கு இயல்பாக அமைக்கப்படும்
- localProxyUser: ப்ராக்ஸியுடன் இணைப்பதற்கான பயனர்பெயர் (அடிப்படை அங்கீகாரம் மட்டும்)
- localProxyPass: USERNAME க்கான கடவுச்சொல், USERNAME காலியாக இருந்தால் அல்லது குறிப்பிடப்படவில்லை என்றால் புறக்கணிக்கப்படும்

```js
opts = {
  localProxyHost: "127.0.0.1",
  localProxyPort: "8000",
  localProxyUser: "user",
  localProxyPass: "password",
};
```

#### PAC (Proxy Auto-Configuration)

உள்ளூர் சோதனையில் PAC (Proxy Auto-Configuration) பயன்படுத்த -

- pac-file: PAC (Proxy Auto-Configuration) கோப்பின் முழுமையான பாதை

```js
opts = { "pac-file": "<pac_file_abs_path>" };
```

#### Binary Path

இயல்பாக, BrowserStack உள்ளூர் ரேப்பர்கள் BrowserStack பைனரியின் சமீபத்திய பதிப்பை ~/ .browserstack அல்லது தற்போதைய பணி அடைவு அல்லது tmp கோப்புறையில் பதிவிறக்கம் செய்து செயல்படுத்த முயற்சிக்கின்றன. ஆனால் -binarypath வாதத்தை அனுப்புவதன் மூலம் நீங்கள் இவற்றை மேலெழுதலாம்.
உள்ளூர் பைனரி பாதையைக் குறிப்பிட பாதை -

```js
opts = { binarypath: "/path/to/binary" };
```

#### Logfile

'-v' வாதத்துடன் இயக்கும் போது பதிவுகளை கோப்பில் சேமிக்க, நீங்கள் கோப்பின் பாதையைக் குறிப்பிடலாம். இயல்பாக பதிவுகள் தற்போதைய பணி அடைவில் உள்ள local.log கோப்பில் சேமிக்கப்படுகின்றன.
பதிவுகள் சேமிக்கப்படும் கோப்பிற்கான பாதையைக் குறிப்பிட -

```js
opts = { verbose: "true", logFile: "./local.log" };
```

----

WebdriverIO பற்றிய மேலும் தகவலுக்கு [முகப்புப் பக்கத்தைப்](https://webdriver.io) பார்க்கவும்.