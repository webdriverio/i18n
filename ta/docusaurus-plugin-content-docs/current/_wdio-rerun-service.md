---
id: wdio-rerun-service
title: மறு-இயக்கம் சேவை
custom_edit_url: https://github.com/jwplayer/wdio-rerun-service/edit/master/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-rerun-service என்பது ஒரு மூன்றாம் தரப்பு தொகுப்பு, மேலும் தகவலுக்கு [GitHub](https://github.com/jwplayer/wdio-rerun-service) | [npm](https://www.npmjs.com/package/wdio-rerun-service) பார்க்கவும்

[![wdio-rerun-service CI](https://github.com/webdriverio-community/wdio-rerun-service/actions/workflows/node.js.yml/badge.svg)](https://github.com/webdriverio-community/wdio-rerun-service/actions/workflows/node.js.yml)
![npm](https://img.shields.io/npm/dm/wdio-rerun-service)
![npm bundle size](https://img.shields.io/bundlephobia/min/wdio-rerun-service)
![GitHub issues](https://img.shields.io/github/issues/webdriverio-community/wdio-rerun-service)

இந்த சேவை [WebdriverIO](https://webdriver.io) சோதனை கட்டமைப்பில் செயல்படுத்தப்படும் தோல்வியுறும் Mocha அல்லது Jasmine சோதனைகள் மற்றும் Cucumber காட்சிகளை கண்காணிக்கிறது. இது தோல்வியுறும் அல்லது நிலையற்ற சோதனைகள் அல்லது காட்சிகளை மீண்டும் இயக்க அனுமதிக்கும்.

_குறிப்பு_: WebdriverIO பதிப்புகள் `5.x` மற்றும் `6.x` இயக்கும் Cucumber Framework பயனர்கள் பதிப்பு `1.6.x` பயன்படுத்த வேண்டும். நீங்கள் சமீபத்திய முக்கிய பதிப்பான `7.x` இல் இருந்தால், இந்த சேவையின் சமீபத்திய `1.7.x` பதிப்பைப் பயன்படுத்தவும்.

## மறு-இயக்கம் vs. மறுமுயற்சி

Cucumber மற்றும் Mocha/Jasmine க்கான WebdriverIO இல் உள்ள `retry` தர்க்கம் Cucumber மற்றும் Mocha/Jasmine இல் நிலையற்ற படிகளை கையாள உதவுகிறது. ஒவ்வொரு கட்டமைப்பிலும் மறுமுயற்சி செய்வதற்கு எச்சரிக்கைகள் உள்ளன:
* Cucumber: சில படிகள் ஒரு சோதனையின் நடுவில் மறுமுயற்சி செய்ய முடியாது என்பதைக் கணக்கில் கொள்ளாது. ஒரு படியை இரண்டு முறை இயக்குவது மீதமுள்ள காட்சியை உடைக்கலாம் அல்லது சோதனை சூழலில் அது சாத்தியமில்லாமல் போகலாம்.
* Mocha/Jasmine: `retry` தர்க்கம் ஒரு தனிப்பட்ட சோதனைக்கு பயன்படுத்தப்படலாம், இருப்பினும், இது இன்னும் நிகழ்நேரத்தில் செய்யப்படுகிறது மற்றும் தற்காலிக சிக்கல்கள் அல்லது நெட்வொர்க் இணைப்பு சிக்கல்களை கணக்கில் கொள்ளாமல் இருக்கலாம்.

`மறு-இயக்க` முக்கிய வேறுபாடுகள்:
* முழு தனிப்பட்ட Cucumber காட்சியை மறு-இயக்கும், ஒரு தனி படியை மட்டும் அல்ல
* முக்கிய சோதனை செயல்பாடு முடிந்த பிறகு முழு spec கோப்பையும் மறு-இயக்க இயலுமைப்படுத்துகிறது
* உள்ளூரில் நகலெடுத்து செயல்படுத்தலாம் (`retry` முடியாது)
* `retry` முறைகளுடன் இன்னும் பயன்படுத்தலாம்
* நிலையற்ற அல்லது சிக்கலான சோதனைகளுக்கு `retry` தர்க்கத்தைப் பயன்படுத்த எந்த குறியீட்டு மாற்றமும் தேவையில்லை

இருக்கும் விருப்பங்களை மதிப்பீடு செய்ய சிறிது நேரம் எடுத்துக்கொள்ள பரிந்துரைக்கப்படுகிறது. ஒரு கலப்பின தீர்வு சிறந்த உண்மையான மற்றும் செயல்படுத்தக்கூடிய சோதனை முடிவுகளை வழங்க சிறந்த தீர்வாக இருக்கலாம்.

## நிறுவல்

எளிதான வழி `wdio-rerun-service` ஐ உங்கள் `package.json` இல் `devDependencies` க்கு சேர்ப்பதாகும்.

```json
{
    "devDependencies": {
        "wdio-rerun-service": "^1.6.2"
    }
}
```

`npm` ஐப் பயன்படுத்தி நிறுவலாம்:

```bash
npm install wdio-rerun-service
```

தொகுப்பு நிறுவல் முடிந்தபின், அதை `wdio.conf.js` இல் `services` அரேவில் சேர்க்கவும்:

```js
// wdio.conf.js
const RerunService = require('wdio-rerun-service');
export.config = {
    // ...
    services: [RerunService, {
        // ...
    }]
};
```

`WebdriverIO` எவ்வாறு நிறுவுவது என்பதற்கான அறிவுறுத்தல்கள் [இங்கே](https://webdriver.io/docs/gettingstarted.html) காணப்படும்.

## கட்டமைப்பு

பின்வரும் விருப்பங்களை wdio.conf.js கோப்பில் சேர்க்கலாம். சேவைக்கான விருப்பங்களை வரையறுக்க, நீங்கள் பின்வரும் வழியில் `services` பட்டியலில் சேவையைச் சேர்க்க வேண்டும்:

```js
// wdio.conf.js
const RerunService = require('wdio-rerun-service');
export.config = {
    // ...
    services: [
        [RerunService, {
            // Re-run service options here...
        }]
    ],
    // ...
};
```

### rerunDataDir
செயல்பாட்டின் போது எல்லா மறு-இயக்க JSON தரவும் வைக்கப்படும் கோப்பகம்.

வகை: `String`

இயல்பு: `./results/rerun`

உதாரணம்:
```js
const RerunService = require('wdio-rerun-service');
export.config = {
    // ...
    services: [
        [RerunService, {
            rerunDataDir: './custom-rerun-directory'
        }]
    ],
    // ...
}
```

### rerunScriptPath
மறு-இயக்க Bash ஸ்கிரிப்ட் எழுதுவதற்கான பாதை.

வகை: `String`

இயல்பு: `./rerun.sh`

உதாரணம்:
```js
const RerunService = require('wdio-rerun-service');
export.config = {
    // ...
    services: [
        [RerunService, {
            rerunScriptPath: './custom-path-for-rerun.sh'
        }]
    ],
    // ...
}
```

### ignoredTags
(Cucumber-மட்டும்) விலக்க வேண்டிய Cucumber குறிச்சொற்களின் தொகுப்பு. காட்சியில் ஒரு குறிச்சொல் இருந்தால், மறு-இயக்க சேவை பகுப்பாய்வைத் தவிர்க்கும்.

வகை: `Array`

இயல்பு: `[]`

உதாரணம்:
```js
const RerunService = require('wdio-rerun-service');
export.config = {
    // ...
    services: [
        [RerunService, {
            ignoredTags: ['@known_bug']
        }]
    ],
    // ...
}
```

### commandPrefix
உருவாக்கப்பட்ட மறு-இயக்க கட்டளைக்கு சேர்க்கப்படும் முன்னொட்டு.

வகை: `String`

இயல்பு: `''`

உதாரணம்:
```js
const RerunService = require('wdio-rerun-service');
export.config = {
    // ...
    services: [
        [RerunService, {
            commandPrefix: "VARIABLE=true"
        }]
    ],
    // ...
}
```
----