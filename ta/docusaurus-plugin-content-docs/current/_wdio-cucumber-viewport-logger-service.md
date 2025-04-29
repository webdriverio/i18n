---
id: wdio-cucumber-viewport-logger-service
title: கியூகம்பர் வியூபோர்ட் லாகர் சேவை
custom_edit_url: https://github.com/viktor-silakov/wdio-cucumber-viewport-logger-service/edit/main/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-cucumber-viewport-logger-service is a 3rd party package, for more information please see [GitHub](https://github.com/viktor-silakov/wdio-cucumber-viewport-logger-service) | [npm](https://www.npmjs.com/package/wdio-cucumber-viewport-logger-service)
## Cucumber Viewport Logger Service for WebdriverIO

இந்த சேவை உங்கள் கியூகம்பர் படிகளையும் மற்ற பிழைத்திருத்த தகவல்களையும் உங்கள் WebdriverIO அடிப்படையிலான தீர்வில் நேரடியாக உங்கள் உலாவி சாளரத்தில் பதிவு செய்ய வாய்ப்பை சேர்க்கிறது. குறிப்பாக, சாதனங்கள் அல்லது மெய்நிகர் இயந்திரங்களை நேரடி *உடல்* அணுகல் இல்லாமல் மற்றும் உங்கள் e2e சோதனைகளை ஆழமாக பிழைத்திருத்த ஊடாடும் அமர்வை அமைக்க முடியாத சூழ்நிலைகளில் இது பயனுள்ளதாக இருக்கும்.

![demo](https://github.com/viktor-silakov/wdio-cucumber-viewport-logger-service/raw/main/img/demo.gif)

### விரைவான தொடக்கம்

பேக்கேஜை நிறுவவும்:

```bash
npm install wdio-cucumber-viewport-logger-service --save-dev
```

உங்கள் `services` கான்ஃபிக் பிரிவில் சேவையைச் சேர்க்கவும், எ.கா:

```js
  services: [
    //...
    'cucumber-viewport-logger',
    //...
]
```

### சேவை விருப்பங்கள்

| விருப்பம்  | விளக்கம் | வகை | இயல்புநிலை மதிப்பு |
| --- | --- | --- | --- |
| `numberOfSteps`  | வியூபோர்டில் இருக்கும் படிகளின் எண்ணிக்கை  | number |3 |
| `enabled`  | சேவையை இயக்கு/முடக்கு | boolean |true |
| `styles`  | பதிவாளர் ரேப்பர், *படி கீவேர்ட்* மற்றும் *படி உரை* க்கான CSS பாணிகள், கீழே உள்ள உதாரணத்தைப் பார்க்கவும்  | object |{} |

```js
// wdio.conf.js
exports.config = {
    // ...
    services: [
        ['cucumber-viewport-logger', {
            numberOfSteps: 5,
            enabled: process.env.VP_LOGGER === '1', // service will be enabled only when you set `VP_LOGGER` enviroment variable to `1`
            // set CSS custom styles for particular elements
            styles: {
                wrapper: { backgroundColor: 'white' },
                keyword: { color: 'red' },
                text: {
                    fontSize: '30px',
                    color: 'green',
                },
                closeButton: {
                    color: 'red',
                },
            },
        },]
    ]
    // ...
};
```

### API

> `logToViewport(message, styles)` - தனிப்பயன் CSS பாணியுடன் (கட்டாயமற்றது) தனிப்பயன் செய்தியை காட்டுகிறது, இதை உங்கள் படி வரையறைகளில் பயன்படுத்தலாம்
எ.கா:
>```js
>When(/^I render message: "([^"]*)"$/, { timeout: 120000 }, function (message) {
>    browser.logToViewport(message, { text: { color: 'green' } });
>});
>```


> `removeViewportLogMessage()` - வியூபோர்ட் செய்திகள் பிரிவை அகற்றுகிறது, உதாரணமாக காட்சி சரிபார்ப்புக்கு பயனுள்ளதாக இருக்கலாம்

### pointerEvents: 'none'

இயல்பாக, அனைத்து சுட்டி நிகழ்வுகளும் (கிளிக் செய்தல், ஹோவரிங், போன்றவை) செய்தி பிரிவின் வழியாக செல்கின்றன, உதாரணமாக: செய்தி பிரிவில் கிளிக் செய்வதற்கு பதிலாக உங்கள் கிளிக் செய்தி அருகில் உள்ள உறுப்புக்கு (உங்கள் பயன்பாட்டு உறுப்பு) "செல்கிறது", இந்த நடத்தையை மாற்ற விரும்பினால் ரேப்பர் பாணி 'pointerEvents' விருப்பத்தை 'auto' என அமைக்கவும், எ.கா:
```js

/ wdio.conf.js
exports.config = {
    // ...
    services: [
        ['cucumber-viewport-logger', {
     
            styles: {
                wrapper: { pointerEvents: 'auto' },
            },
        },]
    ]
    // ...
};
```