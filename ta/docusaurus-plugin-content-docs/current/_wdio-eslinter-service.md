---
id: wdio-eslinter-service
title: eslint சேவை மூலம் தானாக காணாமல் போன இறக்குமதிகளைக் கண்டறிதல்
custom_edit_url: https://github.com/jamesmortensen/wdio-eslinter-service/edit/main/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-eslinter-service என்பது ஒரு மூன்றாம் தரப்பு தொகுப்பாகும், மேலும் தகவலுக்கு [GitHub](https://github.com/jamesmortensen/wdio-eslinter-service) | [npm](https://www.npmjs.com/package/wdio-eslinter-service) ஐப் பார்க்கவும்

நீங்கள் உங்கள் e2e சோதனைகளை இயக்கி, 10, 15 அல்லது 30 நிமிடங்களுக்குப் பிறகு சோதனை ஓட்டத்தின் நடுப்பகுதியில் தான் தெரிய வந்த காணாமல் போன/தவறாக உச்சரிக்கப்பட்ட இறக்குமதி இருப்பதைக் கண்டறிந்ததுண்டா? இது நடக்கும்போது, சோதனை இயக்கி இந்த சோதனைகளை உடைந்ததாக அறிக்கையிடுகிறது.

eslint என்பது இயக்க நேரத்திற்கு முன் பல்வேறு பிழைகளைக் கண்டறிவதற்கான சிறந்த கருவியாகும், மேலும் இந்த சேவை eslint கருவியை, WebdriverIO சோதனைகளை செயல்படுத்துவதற்கு முன், கைமுறையாக செய்வதற்கு பதிலாக தானியங்கி படியாக இயக்குகிறது.

பிரச்சனைகளை பின்னர் சரிசெய்வதை விட விரைவாக தோல்வியுற்று விரைவாக சரிசெய்வது நல்லது.

பரிந்துரைக்கப்பட்ட கட்டமைப்பு காணாமல் போன இறக்குமதிகளை மட்டும் சரிபார்க்க தீர்க்கப்படாத இயக்கியைப் பயன்படுத்துவதாகும், ஆனால் விரும்பினால், npm அல்லது yarn இயக்கியைப் பயன்படுத்தி உங்கள் திட்டத்தில் eslinter ஐ இயக்குவதற்கு சேவையை கட்டமைக்கலாம், அல்லது சிஸ்டம் உங்கள் .eslintrc கட்டமைப்பையும் பயன்படுத்த வேண்டும் என்று சொல்லும் கொடியை அனுப்புவதன் மூலம் செய்யலாம்.

## நிறுவல்

wdio-eslinter-service ஐ நிறுவவும்:

```
$ npm i wdio-eslinter-service --save-dev 
```


### விரைவு தொடக்கம் - காணாமல் போன அல்லது தீர்க்கப்படாத இறக்குமதிகளை மட்டும் சரிபார்க்கவும்

இந்த குறைந்தபட்ச கட்டமைப்பின் இயல்புநிலையில், "unresolved" இயக்கி, தீர்க்கப்படாத require இறக்குமதிகளைச் சரிபார்த்து, தீர்க்கப்படாத இறக்குமதிகள் காணப்பட்டால் பிழை ஏற்படுகிறது. பின்னர் சேவை செயல்பாட்டை நிறுத்துகிறது. விரும்பினால் "npm" அல்லது "yarn" இயக்கிகளைப் பயன்படுத்தி மேலும் சோதனைகளைச் செய்ய .eslintrc.js ஐ தனிப்பயனாக்கலாம். மேலும் விவரங்களுக்கு [eslint](https://www.npmjs.com/package/eslint) ஐப் பார்க்கவும்.

உங்கள் திட்டத்தில் `.eslintrc.js` கட்டமைப்பு இல்லை என்றால், சோதனைகளை இயக்குவதற்கு முன் காணாமல் போன இறக்குமதிகளை மட்டும் சரிபார்க்கும் இயல்புநிலை ஒன்றைப் பயன்படுத்த wdio-eslinter-service ஐ கட்டமைக்கலாம். தவறான இறக்குமதிகளைப் பற்றி பின்னர் அறிவதை விட விரைவாக அறிய இது உதவுகிறது. இதைக் கட்டமைக்க, பின்வரும் eslinter கட்டமைப்பை உங்கள் சேவைகள் வரிசையில் சேர்க்கவும் (நீங்கள் ஏற்கனவே chromedriver சேவையைப் பயன்படுத்துகிறீர்கள் என்று கருதுவோம்; இல்லையெனில், அந்த பகுதியை விட்டுவிடுங்கள்):

**wdio.conf.js:**
```
    services: ['chromedriver', [
        'eslinter',
        {
            runnerType: 'unresolved'
        }
    ]],
```

இந்த நிலையில், சோதனைகளை இயக்கத் தொடங்குங்கள், காணாமல் போன அல்லது தவறான இறக்குமதி இருந்தால், WebdriverIO அதைப் பதிவுசெய்து உடனடியாக சோதனை ஓட்டத்தை நிறுத்தும்:

```
$ npx wdio
```


#### விருப்பத்தேர்வு - module-alias பயன்படுத்தினால்

சாபேக்ஷ பாதைகளுக்கு பதிலாக செயற்பெயர்களை உள்ளமைக்க அனுமதிக்கும் [module-alias](https://www.npmjs.com/package/module-alias) தொகுதியைப் பயன்படுத்தினால், eslint-import-resolver-custom-alias செருகுநிரலைப் பயன்படுத்தி அதை eslinter உள்ளமைப்பில் அனுப்ப வேண்டும். கீழே ஒரு உதாரணம் உள்ளது:

```
    services: ['chromedriver', [
        'eslinter',
        {
            runnerType: 'unresolved',
            eslintOverride: {
                "settings": {
                    "import/resolver": {
                        "eslint-import-resolver-custom-alias": {
                            "alias": {
                                "@utils": "./utils",
                                "@specs": "./test-sync/specs",
                                "@pageobjects": "./test-sync/pageobjects",
                                "@": "./"
                            }
                        }
                    }
                }
            }
        }
    ]],
```

உங்கள் திட்டத்தில் செருகுநிரலை நிறுவவும்:

```
$ npm i eslint-import-resolver-custom-alias
```

சோதனைகளை இயக்கி, தொகுதி செயற்பெயர்களைப் பயன்படுத்தும் தவறான இறக்குமதிகளை கண்டறியும் திறன் உள்ளதா என சரிபார்க்கவும்:

```
$ npx wdio
```

#### சோதனை முறை - உங்கள் திட்டத்தில் ஏற்கனவே உள்ள eslintrc கட்டமைப்புடன் சேர்த்து பயன்படுத்தவும்

உங்கள் திட்டத்தில் ஏற்கனவே உள்ள eslintrc கட்டமைப்பைப் பயன்படுத்த eslinter சேவைக்கும், wdio.conf.js உள்ளமைப்பு சேவைகள் வரிசையில் `includeProjectEslintrc` ஐ true என அமைக்கவும்.

முரண்பட்ட செருகுநிரல்களுடன் பிரச்சனைகளை நான் அனுபவித்துள்ளேன். உங்கள் திட்ட eslint அமைப்பும் தீர்க்கப்படாத இறக்குமதிகளைத் தேடுகிறது என்றால், இது வேலை செய்யாமல் போகலாம் மற்றும் உங்கள் .eslintrc.js க்கு சரிசெய்தல்கள் தேவைப்படலாம். இது தற்போது பரிந்துரைக்கப்படவில்லை.


### மேம்பட்ட மாற்றுகள் - npm மற்றும் yarn இயக்கிகளைப் பயன்படுத்துதல்

npm மற்றும் yarn இயக்கிகள் உங்கள் திட்டத்தில் ஏற்கனவே உள்ள eslinter அமைப்பை இயக்குவதற்கு கூடுதல் கட்டுப்பாட்டை வழங்க உதவுகின்றன. இந்த கட்டமைப்புடன், உங்கள் package.json இல் run-scripts பிரிவில் கூடுதல் கட்டளைகளை வரையறுக்கலாம்:

உங்கள் `package.json` உள்ளே, இதை உங்கள் run scripts க்கு சேர்க்கவும்:

```json
{
    "scripts": {
        "eslint": "eslint ."
    }
}
```

**குறிப்பு: npm அல்லது yarn இயக்கிகளைப் பயன்படுத்தும்போது சேவை செயல்பட package.json இல் eslint சேர்ப்பது அவசியம்.**

உங்களிடம் ஏற்கனவே eslint நிறுவப்பட்டு கட்டமைக்கப்படவில்லை என்றால், அதை உங்கள் திட்டத்தில் நிறுவி கட்டமைக்க வேண்டும், மேலும் eslint-plugin-import போன்ற எந்த செருகுநிரல்களையும் நீங்கள் பயன்படுத்துகிறீர்கள்:

```
$ npm i eslint eslint-plugin-import
```

தொகுதி செயற்பெயர்களை அவற்றின் உண்மையான பாதைகளுடன் தொடர்புபடுத்த eslint-import-resolver-custom-alias செருகுநிரலைப் பயன்படுத்துகிறீர்கள் என்றால், அதையும் நிறுவ வேண்டும்:

```
$ npm i eslint-import-resolver-custom-alias
```

உங்கள் திட்டத்தில் eslintrc கட்டமைப்பு கோப்புகளில் ஒன்று ஏற்கனவே இல்லை என்றால், நீங்கள் ஒரு `.eslintrc.js` கோப்பை உருவாக்க வேண்டும். இங்கே தீர்க்கப்படாத இறக்குமதிகளை மட்டும் தேட ஒரு அடிப்படை அமைப்பு உள்ளது, மேலும் சோதனைகளை இயக்குவதற்கு முன் மற்ற குறியீட்டு தர சரிபார்ப்புகளைச் செல்லுபடியாக்க இந்த உள்ளமைப்பை விரிவாக்கலாம்:

```
// .eslintrc.js
module.exports = {
    "parserOptions": {
        "ecmaVersion": 2022
    },
    "plugins": [
        "import"
    ],
    "rules": {
        "import/no-unresolved": [
            2,
            {
                "commonjs": true,
                "amd": false,
                "caseSensitive": true
            }
        ]
    }
}
```

இறுதியாக, `wdio.conf.js` இல் சேவைகள் வரிசையில் `eslinter` சேவையைச் சேர்க்கவும்:

```javascript
    services: ['eslinter']
```

பிழைகளைச் சரிபார்க்க `npm run eslint` ஐ இயக்கவும்.

நீங்கள் `yarn` பயன்படுத்தினால் `runnerType` சேவை விருப்பத்தை கட்டமைக்கலாம்:

```javascript
    services: [
        ['eslinter', { runnerType: 'yarn' }]
    ]
```

நீங்கள் ஏற்கனவே மீண்டும் பயன்படுத்த விரும்பும் linter ஸ்கிரிப்ட் (`eslint`க்கு பதிலாக) இருந்தால், `scriptName` சேவை விருப்பத்தை கட்டமைக்கலாம்:

```javascript
    services: [
        ['eslinter', { scriptName: 'eslint:check' }]
    ]
```

## WebdriverIO இல் பயன்படுத்துதல்

WebdriverIO இன் சோதனை இயக்கியை வழக்கம் போல் தொடங்கவும். eslint குறியீட்டைச் சரிபார்க்கும். பிழைகள் கண்டறியப்பட்டால், செயல்பாடு உடனடியாக நின்றுவிடும்.

```bash
$ npx wdio
```


**உதாரணம்:**

```bash
$ npx wdio --spec ./test/specs/example.e2e.js 

Execution of 1 spec files started at 2021-05-15T12:04:05.388Z

2021-05-15T12:04:05.793Z WARN wdio-eslinter-service: initialize wdio-eslint-service using npm runner.
Deleted files and directories:
 /Users/jem/Dev/wdio-example/allure-results

/Users/jem/Dev/wdio-example/test/specs/login.js
  1:22  error  Unable to resolve path to module '.../pageObjects/Auth.page'  import/no-unresolved

✖ 1 problem (1 error, 0 warnings)

2021-05-15T12:04:08.581Z ERROR wdio-eslinter-service: SEVERE: Code contains eslint errors or eslint not installed.
```