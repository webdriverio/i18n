---
id: wdio-cucumberjs-json-reporter
title: CucumberJS JSON அறிக்கையாளர்
custom_edit_url: https://github.com/wswebcreation/wdio-cucumberjs-json-reporter/edit/main/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-cucumberjs-json-reporter என்பது ஒரு மூன்றாம் தரப்பு தொகுப்பு, மேலும் தகவலுக்கு [GitHub](https://github.com/wswebcreation/wdio-cucumberjs-json-reporter) | [npm](https://nodei.co/npm/wdio-cucumberjs-json-reporter) ஐப் பார்க்கவும்

WebdriverIO v8 மற்றும் அதற்கு மேல் CucumberJS JSON கோப்புகளை உருவாக்கும் WDIO அறிக்கையாளர்.

[![NPM](https://nodei.co/npm/wdio-cucumberjs-json-reporter.png)](https://nodei.co/npm/wdio-cucumberjs-json-reporter/)

## இது என்ன செய்கிறது
இந்த அறிக்கையாளர் சோதிக்கப்படும் ஒவ்வொரு அம்சத்திற்கும் **Cucumber JSON கோப்பை** உருவாக்கும். உதாரணமாக [multiple-cucumber-html-reporter](https://github.com/wswebcreation/multiple-cucumber-html-reporter) போன்ற நீங்கள் பயன்படுத்த விரும்பும் எந்த அறிக்கையுடனும் JSON கோப்பைப் பயன்படுத்தலாம்.

இது இயங்கும் நிகழ்வைப் பற்றிய மெட்டாடேட்டாவை அம்ச கோப்பில் சேர்க்கும், மேலும் இறுதியாக, இது JSON வெளியீட்டில் இணைப்புகளைச் சேர்க்க உங்களுக்கு வாய்ப்பை வழங்கும்.

## நிறுவல்
`wdio-cucumberjs-json-reporter` ஐ உங்கள் `package.json` இல் devDependency ஆக வைத்திருப்பது எளிதான வழி.

```json
{
  "devDependencies": {
    "wdio-cucumberjs-json-reporter": "^5.0.0"
  }
}
```

நீங்கள் அதை எளிதாக செய்யலாம்:

```bash
npm install wdio-cucumberjs-json-reporter --save-dev
```

எனவே இது தானாகவே உங்கள் `package.json` இல் சேர்க்கப்படும்

`WebdriverIO` ஐ எவ்வாறு நிறுவுவது என்பதற்கான வழிமுறைகளை [இங்கே](https://webdriver.io/docs/gettingstarted) காணலாம்.

## கட்டமைப்பு
உங்கள் wdio.conf.js கோப்பில் வெளியீட்டு அடைவு மற்றும் மொழியை உள்ளமைக்கவும்:

```js
export const config = {
    // ...
    reporters: [
        // Like this with the default options, see the options below
        'cucumberjs-json',

        // OR like this if you want to set the folder and the language
        [ 'cucumberjs-json', {
                jsonFolder: '.tmp/new/',
                language: 'en',
            },
        ],
    ],
  // ...
}
```

> அறிக்கையாளரைச் சேர்ப்பதற்கான இரண்டு வழிகளையும் பயன்படுத்த வேண்டாம், இது வெறும் ஒரு எடுத்துக்காட்டு!

## விருப்பங்கள்
### `jsonFolder`
- **வகை:** `String`
- **கட்டாயம்:** இல்லை
- **இயல்புநிலை:** `.tmp/json/`

இந்த அறிக்கையால் உருவாக்கப்பட்ட JSON கோப்புகள் சேமிக்கப்படும் கோப்பகம், ஸ்கிரிப்ட் தொடங்கப்படும் இடத்திலிருந்து தொடர்புடையது.

**குறிப்பு:** நீங்கள் கட்டளை வரியிலிருந்து npm ஸ்கிரிப்டைப் பயன்படுத்தினால், எடுத்துக்காட்டாக `npm run test`, `jsonFolder` ஸ்கிரிப்ட் இயக்கப்படும் பாதையிலிருந்து தொடர்புடையதாக இருக்கும். உங்கள் திட்டத்தின் ரூட்டிலிருந்து அதை இயக்குவது உங்கள் திட்டத்தின் ரூட்டிலும் `jsonFolder` ஐ உருவாக்கும்.

### `language`
- **வகை:** `String`
- **கட்டாயம்:** இல்லை
- **இயல்புநிலை:** `en`

Gherkin சூழல்கள் எழுதப்பட்ட மொழி (இயல்பாக ஆங்கிலம்). மொழி குறியீடுகள் மற்றும் அதன் முக்கிய வார்த்தைகளின் பட்டியலை [இங்கே](https://cucumber.io/docs/gherkin/reference/#overview) காணலாம்.

### `disableHooks`
- **வகை:** `boolean`
- **கட்டாயம்:** இல்லை
- **இயல்புநிலை:** `false`

இந்த பண்பு `true` என அமைக்கப்பட்டால் ஹுக் விவரங்கள் உருவாக்கத்தின் ஒரு பகுதியாக இருக்காது.

### `reportFilePerRetry`
- **வகை:** `boolean`
- **கட்டாயம்:** இல்லை
- **இயல்புநிலை:** `true`

ஒரு ஸ்பெக் மறுமுயற்சி செய்யப்படும்போது, இந்த பண்பு `false` என அமைக்கப்பட்டிருந்தால், அறிக்கை முந்தைய முயற்சிகளில் இருந்து ஏற்கனவே உள்ள அறிக்கை கோப்பில் இணைக்கப்படும்.

**எடுத்துக்காட்டு**:
`['cucumberjs-json', { jsonFolder: '.tmp/new/', language: 'en', disableHooks:true}]`

## மெட்டாடேட்டா

> **குறிப்பு:**\
> நீங்கள் WebdriverIO V6 ஐப் பயன்படுத்தினால் இது தற்போது ஆதரிக்கப்படவில்லை, WebdriverIO V5 இன்னும் இதை ஆதரிக்கிறது மற்றும் WebdriverIO V7 மீண்டும் ஆதரிக்கிறது

சொன்னது போல், இந்த அறிக்கை தானாகவே அம்சம் செயல்படுத்தப்பட்ட தற்போதைய இயந்திரம் / சாதனத்தின் மெட்டாடேட்டாவை சேமிக்க முடியும்.

இதை விருப்பப்படுத்த, பின்வரும் பொருளை உங்கள் `capabilities` இல் சேர்க்கலாம்

```js
// Example wdio.conf.js
export const config = {
    //..
    capabilities: [
        {
            browserName: 'chrome',
            // Add this
            'cjson:metadata': {
                // For a browser
                browser: {
                    name: 'chrome',
                    version: '58',
                },
                // for an app
                app: {
                  name: 'name.of.app.ipa',
                  version: '1.2.3',
                },
                device: 'MacBook Pro 15',
                platform: {
                    name: 'OSX',
                    version: '10.12.6'
                }
            },
        },
    ],
};
```

> மெட்டாடேட்டா பொருளுக்கு `cjson` முன்னொட்டு இருக்க வேண்டும், இல்லையெனில் அது செயல்படாது!

### மெட்டாடேட்டா மதிப்புகள்
#### `metadata.app.name`
- **வகை:** `string`

**எ.கா.:** பயன்பாட்டின் பெயர்.

#### `metadata.app.version`
- **வகை:** `string`

**எ.கா.:** பயன்பாட்டின் பதிப்பு.

#### `metadata.browser.name`
- **வகை:** `string`
- **சாத்தியமான மதிப்புகள்:** `internet explorer | edge | chrome | firefox | safari`

#### `metadata.browser.version`
- **வகை:** `string`

**எ.கா.:** உலாவியின் பதிப்பு, இது கைமுறையாக சேர்க்கப்படலாம் அல்லது சோதனைகளின் செயல்பாட்டின் போது துல்லியமான பதிப்பு எண்ணைப் பெற பெறலாம்.

#### `metadata.device`
- **வகை:** `string`

**எ.கா.:** சாதன வகையைக் குறிக்கும் பெயர். உதாரணமாக, நீங்கள் அதை ஒரு மெய்நிகர் இயந்திரத்தில் இயக்கினால், அதை இங்கே `Virtual Machine` என வைக்கலாம்,
அல்லது மொபைலின் பெயர், உதாரணமாக `iPhone 7 Plus`.

#### `metadata.platform.name`
- **வகை:** `string`
- **சாத்தியமான மதிப்புகள்:** `windows | osx | linux | ubuntu | android | ios`

#### `metadata.platform.version`
- **வகை:** `string`

**எ.கா.:** தளத்தின் பதிப்பு

> நீங்கள் மெட்டாடேட்டாவில் `browser`-பொருளை வழங்கவில்லை என்றால், இந்த மாடியூல் தானாகவே அதை தீர்மானிக்கும். **இது எப்போதும் அது தீர்மானிக்கக்கூடிய மிகவும் சமீபத்திய மதிப்புடன் அதை மேலெழுதும்.**

> நீங்கள் `device` மற்றும்/அல்லது `platform`-பொருளை வழங்காவிட்டால், அது உங்களுக்கு இயல்பாக `not known` என அமைக்கப்படும்

> நீங்கள் `browser.name` அல்லது `browser.version` ஐ வழங்கவில்லை என்றால், மாடியூல் இதை தானாகவே தீர்மானிக்க முயற்சிக்கும்.

## இணைப்பு
இந்த ஹுக்ஸ் / படிகளில் அனைத்திலும் JSON கோப்பில் தரவை இணைக்க உங்களுக்கு விருப்பம் உள்ளது:

- Before(All)
- After(All)
- Given
- When
- Then
- And

நீங்கள் வழங்க வேண்டிய ஒரே விஷயம் உங்கள் படி கோப்புகளில் பின்வரும் குறியீடு.

ES Modules (ESM) க்கு
```js
import cucumberJson from 'wdio-cucumberjs-json-reporter';

// Attach a string (if no type is provided it will automatically default to `text/plain`
cucumberJson.attach('just a string');
cucumberJson.attach('just a second string', 'text/plain');

// Attach JSON
cucumberJson.attach({"json-string": true}, 'application/json');

// Attach a screenshot in a before hook
cucumberJson.attach(await browser.takeScreenshot(), 'image/png');
```
CommonJS (CJS) க்கு
```js
const { attach } = require("wdio-cucumberjs-json-reporter");

// Attach a string (if no type is provided it will automatically default to `text/plain`
attach('just a string');
attach('just a second string', 'text/plain');

// Attach JSON
attach({"json-string": true}, 'application/json');

// Attach a screenshot in a before hook
attach(await browser.takeScreenshot(), 'image/png');
```

## multiple-cucumber-html-reporter உடன் பயன்படுத்தவும்
WebdriverIO V4க்கான முந்தைய மாடியூல், [wdio-multiple-cucumber-html-reporter](https://github.com/webdriverio-community/wdio-multiple-cucumber-html-reporter),
[multiple-cucumber-html-reporter](https://github.com/wswebcreation/multiple-cucumber-html-reporter)-மாடியூலுடன் ஒரு உள்ளமைக்கப்பட்ட இணைப்பை கொண்டிருந்தது. **இந்த அறிக்கையாளருக்கு இது இல்லை**, ஏனெனில் WebdriverIO V5 இன் புதிய அமைப்பு `onPrepare` மற்றும் `onComplete` ஹுக்கைப் பயன்படுத்த அனுமதிக்காத ஒரு நிலையை அடிப்படையாகக் கொண்டுள்ளது.

நீங்கள் இன்னும் [multiple-cucumber-html-reporter](https://github.com/wswebcreation/multiple-cucumber-html-reporter)-மாடியூலைப் பயன்படுத்த விரும்பினால், உங்கள் கட்டமைப்பு கோப்பில் பின்வருவனவற்றைச் சேர்க்கலாம்.

- மாடியூலை இவ்வாறு நிறுவவும்

    ```bash
    npm install multiple-cucumber-html-reporter --save-dev
    ```

- இதை உங்கள் கட்டமைப்பு கோப்பில் சேர்க்கவும்

    ```js
    import fs from 'node:fs/promises'
    // Import the module
    import { generate } from 'multiple-cucumber-html-reporter'

    // Example wdio.conf.js
    export const config = {
      //..

      // =====
      // Hooks
      // =====
      /**
       * Gets executed once before all workers get launched.
       */
      onPrepare: () => {
        // Remove the `.tmp/` folder that holds the json and report files
        return fs.rm('.tmp/', { recursive: true });
      },
      /**
       * Gets executed after all workers got shut down and the process is about to exit.
       */
      onComplete: () => {
        // Generate the report when it all tests are done
        generate({
          // Required
          // This part needs to be the same path where you store the JSON files
          // default = '.tmp/json/'
          jsonDir: '.tmp/json/',
          reportPath: '.tmp/report/',
          // for more options see https://github.com/wswebcreation/multiple-cucumber-html-reporter#options
        });
      }
    }
    ```

## பழைய WebdriverIO பதிப்புகள்

> **இந்த தொகுதி WebdriverIO V8+ உடன் மட்டுமே வேலை செய்யும்!**\
> **V6 க்கு, [இங்கே](https://github.com/webdriverio-community/wdio-cucumberjs-json-reporter/tree/v6) ஆவணங்களைப் பார்த்து பதிப்பு 2.0.4 ஐப் பயன்படுத்தவும்**\
> **V5 க்கு, [இங்கே](https://github.com/webdriverio-community/wdio-cucumberjs-json-reporter/tree/v5) ஆவணங்களைப் பார்த்து பதிப்பு 1.3.0 ஐப் பயன்படுத்தவும்**

> **இந்த தொகுதி [wdio-multiple-cucumber-html-reporter](https://github.com/wswebcreation/wdio-multiple-cucumber-html-reporter) க்கு மாற்றாக இல்லை. அந்த தொகுதி WebdriverIO V4 ஐ மட்டுமே ஆதரிக்கிறது மற்றும் ஒரு அறிக்கையையும் உருவாக்குகிறது. இந்த தொகுதி ஒரு JSON ஐ மட்டுமே உருவாக்குகிறது, அறிக்கை இல்லை!!**