---
id: wdio-testrail-reporter
title: Testrail Reporter அறிக்கையாளர்
custom_edit_url: https://github.com/webdriverio-community/wdio-testrail-reporter/edit/main/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> @wdio/testrail-reporter is a 3rd party package, for more information please see [GitHub](https://github.com/webdriverio-community/wdio-testrail-reporter) | [npm](https://www.npmjs.com/package/@wdio/testrail-reporter)

இந்த அறிக்கையாளர் TestRail அறிக்கைகளை உருவாக்குகிறது. முதலில் நீங்கள் செய்ய வேண்டியது, அறிக்கை TestRail உடன் தொடர்பு கொண்டு சோதனை முடிவுகளை அனுப்ப TestRail API ஐ இயக்குவதாகும். அதற்கு, உங்கள் TestRail கணக்கில் உள்நுழைந்து, நிர்வாகம் > தள அமைப்புகள் > API க்குச் சென்று API ஐ இயக்கு என்பதற்கு அருகிலுள்ள சரிபார்ப்பு பெட்டியைக் கிளிக் செய்ய உறுதிப்படுத்திக் கொள்ளவும்.

சோதனை விளக்கத்தில் TestRail சோதனை அடையாள எண்ணைச் சேர்க்கவும். எ.கா.
```javascript
it("C123456 Page loads correctly", async () => {
```
இது பல வழக்கு ஐடிகளையும் ஆதரிக்கிறது. எ.கா.
```javascript
it("C123456 C678910 Page loads correctly", async () => {
```

## நிறுவல்

அறிக்கையாளரைப் பயன்படுத்த, அதை உங்கள் `package.json` இல் சேர்க்கவும்:

```sh
npm i --save-dev @wdio/testrail-reporter
```

## பயன்பாடு

அறிக்கையாளரை உங்கள் WDIO உள்ளமைவு கோப்பில் சேர்க்கவும்.

புதிய சோதனை ஓட்டத்தை உருவாக்க விரும்பும்போது எடுத்துக்காட்டு:

```javascript
export const config = {
    // ...
    reporters:
        [
            ['testrail', {
                projectId: 1,
                suiteId: 1,
                domain: 'xxxxx.testrail.io',
                username: process.env.TESTRAIL_USERNAME,
                apiToken: process.env.TESTRAIL_API_TOKEN,
                runName: 'name for the test run',
                oneReport: true,
                includeAll: false,
                caseIdTagPrefix: '' // used only for multi-platform Cucumber Scenarios
            }
        ]
    ],
    // ...
}
```

ஏற்கனவே உள்ள சோதனை ஓட்டத்தைப் புதுப்பிக்க விரும்பும்போது எடுத்துக்காட்டு:

```javascript
export const config = {
    // ...
    reporters:
        [
            ['testrail', {
                projectId: 1,
                suiteId: 1,
                domain: 'xxxxx.testrail.io',
                username: process.env.TESTRAIL_USERNAME,
                apiToken: process.env.TESTRAIL_API_TOKEN,
                existingRunId: 2345,
                oneReport: true,
                includeAll: false
            }
        ]
    ],
    // ...
}
```

செயல்படுத்த வேண்டிய சோதனை தொகுப்பின் அடிப்படையில் வெவ்வேறு திட்ட மற்றும்/அல்லது தொகுப்பு ஐடிகள் தேவைப்படும்போது எடுத்துக்காட்டு:

```javascript
export const config = {
    // ...
    reporters:
        [
            ['testrail', {
                projectId: process.env.TESTRAIL_PROJECT_NAME == 'PROJECT_A' ? 1 : 2,
                suiteId: process.env.TESTRAIL_SUITE_NAME == 'SUITE_A' ? 10 : 20,
                domain: 'xxxxx.testrail.io',
                username: process.env.TESTRAIL_USERNAME,
                apiToken: process.env.TESTRAIL_API_TOKEN,
                runName: 'name for the test run',
                oneReport: true,
                includeAll: false
            }
        ]
    ],
    // ...
}
```


## விருப்பங்கள்

### `projectId`

testrail திட்டத்தின் ஐடி.

வகை: `string`

### `suiteId`

தொகுப்பின் ஐடி, தொகுப்பு 1 இயல்புநிலை.

வகை: `string`

### `domain`

உங்கள் testrail நிகழ்வின் டொமைன், எ.கா. `your-domain.testrail.io`.

வகை: `string`

### `username`

உங்கள் testrail நிகழ்வின் பயனர்பெயர்.

வகை: `string`

### `apiToken`

உங்கள் testrail நிகழ்வின் API டோக்கன்.

வகை: `string`

### `runName`

சோதனை ஓட்டத்திற்கான தனிப்பயன் பெயர்.

வகை: `string`

### `existingRunId`

புதுப்பிக்க ஏற்கனவே உள்ள சோதனை ஓட்டத்தின் ஐடி.

வகை: `string`

### `oneReport`

ஒற்றை சோதனை ஓட்டத்தை உருவாக்கவும்.

வகை: `boolean`

### `includeAll`

சோதனை ஓட்டத்தில் தொகுப்பின் அனைத்து சோதனைகளையும் சேர்க்கவும்.

வகை: `boolean`

### `caseIdTagPrefix`

Cucumber குறிச்சொற்களில் வழக்கு ஐடியைக் கண்டறிய பயன்படுத்தப்படும் முன்னொட்டு, பல-தளங்களில் Cucumber சிற்றுணவு செயல்படுத்தலுக்கு பயனுள்ளதாக இருக்கும்

வகை: `string`

### `useCucumber`

சோதனைகள் Cucumber கட்டமைப்பைப் பயன்படுத்தி எழுதப்பட்டுள்ளதைக் குறிக்கிறது. இயல்பாக, இது `false` என அமைக்கப்பட்டுள்ளது.

வகை: `boolean`

---

WebdriverIO பற்றிய கூடுதல் தகவலுக்கு [முகப்புப்பக்கத்தைப்](https://webdriver.io) பார்க்கவும்.