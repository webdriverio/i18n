---
id: appium-service
title: Appium சேவை
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-appium-service/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Appium சர்வரை கையாள்வது உண்மையான WebdriverIO திட்டத்தின் நோக்கத்திற்கு அப்பாற்பட்டது. இந்த சேவை [WDIO டெஸ்ட்ரன்னருடன்](https://webdriver.io/docs/clioptions) சோதனைகளை இயக்கும்போது Appium சர்வரை தடையின்றி இயக்க உதவுகிறது. இது [Appium சர்வரை](https://appium.github.io/appium.io/docs/en/about-appium/getting-started/index.html#starting-appium) ஒரு துணை செயலாக்கத்தில் தொடங்குகிறது.

## நிறுவல்

எளிதான வழி `@wdio/appium-service` ஐ உங்கள் `package.json` இல் ஒரு devDependency ஆக வைத்திருப்பது, இதன் மூலம்:

```sh
npm install @wdio/appium-service --save-dev
```

`WebdriverIO` ஐ எவ்வாறு நிறுவுவது என்பதற்கான அறிவுறுத்தல்களை [இங்கே](https://webdriver.io/docs/gettingstarted) காணலாம்.

## கட்டமைப்பு

சேவையைப் பயன்படுத்த, நீங்கள் உங்கள் சேவை அரேயில் `appium` ஐச் சேர்க்க வேண்டும்:

```js
// wdio.conf.js
export const config = {
    // ...
    port: 4723, // default appium port
    services: ['appium'],
    // ...
};
```

## விருப்பங்கள்

பின்வரும் விருப்பங்களை wdio.conf.js கோப்பில் சேர்க்கலாம். சேவைக்கான விருப்பங்களை வரையறுக்க, நீங்கள் பின்வரும் வழியில் `services` பட்டியலில் சேவையைச் சேர்க்க வேண்டும்:

```js
// wdio.conf.js
export const config = {
    // ...
    port: 4723, // default appium port
    services: [
        ['appium', {
            // Appium service options here
            // ...
        }]
    ],
    // ...
};
```

### logPath
Appium சர்வரிலிருந்து வரும் அனைத்து பதிவுகளும் சேமிக்கப்பட வேண்டிய பாதை.

வகை: `String`

உதாரணம்:
```js
export const config = {
    // ...
    services: [
        ['appium', {
            logPath : './'
        }]
    ],
    // ...
}
```

### command
உங்கள் Appium நிறுவலைப் பயன்படுத்த, எ.கா. உலகளாவிய அளவில் நிறுவப்பட்ட, தொடங்கப்பட வேண்டிய கட்டளையைக் குறிப்பிடவும்.

வகை: `String`

உதாரணம்:
```js
export const config = {
    // ...
    services: [
        ['appium', {
            command : 'appium'
        }]
    ],
    // ...
}
```

### args
Appium சர்வருக்கான வாதங்களின் வரைபடம், நேரடியாக `appium` க்கு அனுப்பப்படுகிறது.

சாத்தியமான வாதங்களுக்கு [ஆவணங்களைப்](https://github.com/appium/appium/blob/master/packages/appium/docs/en/cli/args.md) பார்க்கவும்.
வாதங்கள் லோயர் கேமல் கேஸில் வழங்கப்படுகின்றன. உதாரணமாக, `debugLogSpacing: true` என்பது `--debug-log-spacing` ஆக மாற்றப்படுகிறது, அல்லது Appium ஆவணங்களில் விவரிக்கப்பட்டுள்ளபடி அவை வழங்கப்படலாம்.

வகை: `Object`

இயல்பு: `{}`

உதாரணம்:
```js
export const config = {
    // ...
    services: [
        ['appium', {
            args: {
                // ...
                debugLogSpacing: true,
                platformName: 'iOS'
                // ...
            }
        }]
    ],
    // ...
}
```
**குறிப்பு:** எளிதாக்கப்பட்ட பெயர்களைப் பயன்படுத்துவது ஊக்கமளிக்கப்படவில்லை மற்றும் ஆதரிக்கப்படவில்லை. அதற்கு பதிலாக, லோயர் கேமல் கேஸில் முழு பண்பு பெயரைப் பயன்படுத்தவும்.

----

WebdriverIO பற்றிய கூடுதல் தகவலுக்கு [முகப்புப் பக்கத்தைப்](https://webdriver.io) பார்க்கவும்.