---
id: wdio-winappdriver-service
title: winappdriver சேவை
custom_edit_url: https://github.com/licanhua/wdio-winappdriver-service/edit/main/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-winappdriver-service என்பது ஒரு மூன்றாம் தரப்பு தொகுப்பு, மேலும் தகவலுக்கு [GitHub](https://github.com/licanhua/wdio-winappdriver-service) | [npm](https://www.npmjs.com/package/wdio-winappdriver-service) ஐப் பார்க்கவும்

இந்த சேவை [WDIO testrunner](https://webdriver.io/guide/testrunner/gettingstarted.html) உடன் சோதனைகளை இயக்கும்போது WinAppDriver சேவையகத்தை தடையின்றி இயக்க உதவுகிறது. இது [WinAppDriver](https://github.com/Microsoft/WinAppDriver) ஐ ஒரு துணை செயல்முறையில் தொடங்குகிறது.

## நிறுவல்

```bash
npm install wdio-winappdriver-service --save-dev
```

`WebdriverIO` எவ்வாறு நிறுவுவது என்பதற்கான வழிமுறைகள் [இங்கே](https://webdriver.io/docs/gettingstarted.html) காணலாம்.

## கட்டமைப்பு

சேவையைப் பயன்படுத்த உங்கள் சேவை வரிசையில் `winappdriver` சேர்க்க வேண்டும்:

```js
// wdio.conf.js
export.config = {
    // ...
    services: ['winappdriver'],
    // ...
};
```

## விருப்பங்கள்

பின்வரும் விருப்பங்களை wdio.conf.js கோப்பில் சேர்க்கலாம். சேவைக்கான விருப்பங்களை வரையறுக்க, பின்வரும் வழியில் சேவையை `services` பட்டியலில் சேர்க்க வேண்டும்:

```js
// wdio.conf.js
export.config = {
    // ...
    services: [
        ['winappdriver', {
            // WinAppDriver service options here
            // ...
        }]
    ],
    // ...
};
```

### logPath

winappdriver சேவையகத்திலிருந்து அனைத்து பதிவுகளும் சேமிக்கப்பட வேண்டிய பாதை.

வகை: `String`

உதாரணம்:

```js
export.config = {
    // ...
    services: [
        ['winappdriver', {
            logPath : './'
        }]
    ],
    // ...
}
```

### command

உங்கள் சொந்த WinAppDriver நிறுவலைப் பயன்படுத்த, எ.கா. உலகளாவிய நிறுவப்பட்ட, தொடங்க வேண்டிய கட்டளையை குறிப்பிடவும்.

வகை: `String`

உதாரணம்:

```js
export.config = {
    // ...
    services: [
        ['winappdriver', {
            command : 'c:\\Program Files (x86)\\Windows Application Driver\\WinAppDriver.exe'
        }]
    ],
    // ...
}
```

### args

`WinAppDriver`க்கு நேரடியாக அனுப்பப்படும் வாதங்களின் பட்டியல்.

சாத்தியமான வாதங்களுக்கு [ஆவணங்களைப்](https://github.com/Microsoft/WinAppDriver) பார்க்கவும்.

வகை: `Array`

இயல்புநிலை: `[]`

உதாரணம்:

```js
export.config = {
    // ...
    services: [
        ['winappdriver', {
            args: ['10.0.0.10', '4723/wd/hub']
        }]
    ],
    // ...
}
```