---
id: wdio-ywinappdriver-service
title: ywinappdriver சேவை
custom_edit_url: https://github.com/licanhua/wdio-ywinappdriver-service/edit/main/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-ywinappdriver-service என்பது ஒரு மூன்றாம் தரப்பு தொகுப்பாகும், மேலும் தகவலுக்கு [GitHub](https://github.com/licanhua/wdio-ywinappdriver-service) | [npm](https://www.npmjs.com/package/wdio-ywinappdriver-service) பார்க்கவும்

இந்த சேவை [WDIO testrunner](https://webdriver.io/guide/testrunner/gettingstarted.html) உடன் சோதனைகளை இயக்கும்போது ywinappdriver சேவையகத்தை தடையற்று இயக்க உதவுகிறது. இது [ywinappdriver](https://github.com/licanhua/YWinAppDriver)-ஐ துணை செயல்முறையில் தொடங்குகிறது.

## நிறுவல்

```bash
npm install wdio-ywinappdriver-service --save-dev
```

`WebdriverIO`-வை எவ்வாறு நிறுவுவது என்ற வழிமுறைகளை [இங்கே](https://webdriver.io/docs/gettingstarted.html) காணலாம்.

## கட்டமைப்பு

சேவையைப் பயன்படுத்த, உங்கள் சேவை வரிசையில் `ywinappdriver`-ஐ சேர்க்க வேண்டும்:

```js
// wdio.conf.js
export.config = {
    // ...
    services: ['ywinappdriver'],
    // ...
};
```

## விருப்பங்கள்

பின்வரும் விருப்பங்களை wdio.conf.js கோப்பில் சேர்க்கலாம். சேவைக்கான விருப்பங்களை வரையறுக்க, சேவையை `services` பட்டியலில் பின்வரும் வழியில் சேர்க்க வேண்டும்:

```js
// wdio.conf.js
export.config = {
    // ...
    services: [
        ['ywinappdriver', {
            // ywinappdriver service options here
            // ...
        }]
    ],
    // ...
};
```

### logPath

ywinappdriver சேவையகத்திலிருந்து அனைத்து பதிவுகளும் சேமிக்கப்பட வேண்டிய பாதை.

வகை: `String`

உதாரணம்:

```js
export.config = {
    // ...
    services: [
        ['ywinappdriver', {
            logPath : './'
        }]
    ],
    // ...
}
```

### command

உங்கள் சொந்த winappdriver நிறுவலைப் பயன்படுத்த, எ.கா. உலகளாவிய நிறுவப்பட்ட, தொடங்கப்பட வேண்டிய கட்டளையைக் குறிப்பிடவும்.

வகை: `String`

உதாரணம்:

```js
export.config = {
    // ...
    services: [
        ['ywinappdriver', {
            command : 'c:\\xx\\ywinappdriver.exe'
        }]
    ],
    // ...
}
```

### args

`ywinappdriver`-க்கு நேரடியாக அனுப்பப்படும் வாதங்களின் பட்டியல்.

சாத்தியமான வாதங்களுக்கு [ஆவணத்தைப்](https://github.com/licanhua/ywinappdriver) பார்க்கவும்.

வகை: `Array`

இயல்புநிலை: `[]`

உதாரணம்:

```js
export.config = {
    // ...
    services: [
        ['ywinappdriver', {
            args: ['--urls' 'http://127.0.0.1:4723' '--basepath' '/wd/hub']
        }]
    ],
    // ...
}
```