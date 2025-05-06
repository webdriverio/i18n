---
id: boilerplates
title: வார்ப்புரு திட்டங்கள்
---

காலப்போக்கில், நமது சமூகம் உங்கள் சொந்த சோதனை தொகுப்பை அமைக்க உதவியாக பல திட்டங்களை உருவாக்கியுள்ளது.

# v9 வார்ப்புரு திட்டங்கள்

## [webdriverio/cucumber-boilerplate](https://github.com/webdriverio/cucumber-boilerplate)

Cucumber சோதனை தொகுப்புகளுக்கான எங்களின் சொந்த வார்ப்புரு. உங்களுக்காக 150க்கும் மேற்பட்ட முன்வரையறுக்கப்பட்ட படி விளக்கங்களை நாங்கள் உருவாக்கியுள்ளோம், எனவே உங்கள் திட்டத்தில் அம்சக் கோப்புகளை உடனடியாக எழுதத் தொடங்கலாம்.

- கட்டமைப்பு:
    - Cucumber
    - WebdriverIO
- அம்சங்கள்:
    - உங்களுக்குத் தேவைப்படும் கிட்டத்தட்ட அனைத்தையும் உள்ளடக்கிய 150க்கும் மேற்பட்ட முன்வரையறுக்கப்பட்ட படிகள்
    - WebdriverIO இன் மல்டிரிமோட் செயல்பாட்டை ஒருங்கிணைக்கிறது
    - சொந்த டெமோ ஆப்

## [webdriverio/jasmine-boilerplate](https://github.com/webdriverio/jasmine-boilerplate)
Babel அம்சங்கள் மற்றும் பக்க பொருள்கள் முறையைப் பயன்படுத்தி Jasmine உடன் WebdriverIO சோதனைகளை இயக்குவதற்கான வார்ப்புரு திட்டம்.

- கட்டமைப்புகள்
    - WebdriverIO
    - Jasmine
- அம்சங்கள்
    - பக்க பொருள் முறை
    - Sauce Labs ஒருங்கிணைப்பு

## [webdriverio/electron-boilerplate](https://github.com/webdriverio/electron-boilerplate)
குறைந்தபட்ச Electron பயன்பாட்டில் WebdriverIO சோதனைகளை இயக்குவதற்கான வார்ப்புரு திட்டம்.

- கட்டமைப்புகள்
    - WebdriverIO
    - Mocha
- அம்சங்கள்
    - Electron API மாதிரியாக்கம்

## [amiya-pattnaik/gherkin-to-webdriverIO-test-generator](https://github.com/amiya-pattnaik/gherkin-to-webdriverIO-test-generator)
Gherkin .feature கோப்புகளிலிருந்து WebdriverIO பக்க பொருள் வகுப்புகள் மற்றும் Mocha சோதனை விவரக்குறிப்புகளை தானாகவே உருவாக்குங்கள் - கைமுறை முயற்சியைக் குறைத்து, நிலைத்தன்மையை மேம்படுத்தி, QA தானியக்கத்தை விரைவுபடுத்துகிறது. இந்த திட்டம் webdriver.io உடன் இணக்கமான குறியீடுகளை உருவாக்குவதோடு மட்டுமல்லாமல், webdriver.io இன் அனைத்து செயல்பாடுகளையும் மேம்படுத்துகிறது.

***இது எப்படி செயல்படுகிறது?***
- இந்த செயல்முறை இரண்டு படி தானியக்கத்தைப் பின்பற்றுகிறது:
- படி 1: Gherkin முதல் stepMap வரை (stepMap.json கோப்புகளை உருவாக்குதல்)
  - stepMap.json கோப்புகளை உருவாக்குதல்:
    - Gherkin தொடரியலில் எழுதப்பட்ட .feature கோப்புகளை பகுப்பாய்வு செய்கிறது.
    - சூழல்கள் மற்றும் படிகளை பிரித்தெடுக்கிறது.
    - பின்வருவனவற்றைக் கொண்ட கட்டமைக்கப்பட்ட .stepMap.json கோப்பை உருவாக்குகிறது:
      - செயல்படுத்த வேண்டிய செயல் (எ.கா., click, setText, assertVisible)
      - தருக்க மேப்பிங்கிற்கான selectorName
      - DOM உறுப்புக்கான தேர்வுநிலை
      - மதிப்புகள் அல்லது உறுதிப்படுத்தலுக்கான குறிப்பு
- படி 2: stepMap முதல் குறியீடு வரை (WebdriverIO குறியீட்டை உருவாக்குதல்).
  பின்வருவனவற்றை உருவாக்க stepMap.json ஐப் பயன்படுத்துகிறது:
  - பகிரப்பட்ட முறைகள் மற்றும் browser.url() அமைப்புடன் அடிப்படை page.js வகுப்பை உருவாக்கவும்.
  - test/pageobjects/ க்குள் ஒவ்வொரு அம்சத்திற்கும் WebdriverIO-இணக்கமான பக்க பொருள் மாதிரி (POM) வகுப்புகளை உருவாக்கவும்.
  - Mocha-அடிப்படையிலான சோதனை விவரக்குறிப்புகளை உருவாக்கவும்.
- கோப்பக அமைப்பு
```
project-root/
├── features/               # Input Gherkin feature files
├── stepMaps/               # Generated step maps (JSON)
├── test/
│   ├── pageobjects/        # Generated base Page class, Page Object classes
│   └── specs/              # Generated test specs
├── generateStepMap.js      # StepMap generator script
├── generateTestsFromMap.js # PageObject + test spec generator script
├── package.json
├── README.md
└── wdio.conf.js
```
---
# v8 வார்ப்புரு திட்டங்கள்

## [amiya-pattnaik/webdriverIO-with-cucumberBDD](https://github.com/amiya-pattnaik/webdriverIO-with-cucumberBDD)

- கட்டமைப்பு: WDIO-V8 with Cucumber (V8x).
- அம்சங்கள்:
    - ES6 /ES7 ஸ்டைல் வகுப்பு அடிப்படை அணுகுமுறை மற்றும் TypeScript ஆதரவுடன் பக்க பொருள்கள் மாதிரி பயன்படுத்தப்படுகிறது
    - ஒரே நேரத்தில் ஒன்றுக்கு மேற்பட்ட தேர்வுநிலையுடன் உறுப்பை வினவுவதற்கான பல தேர்வுநிலை விருப்பத்தின் எடுத்துக்காட்டுகள்
    - Chrome மற்றும் Firefox ஐப் பயன்படுத்தி பல உலாவி மற்றும் தலைப்பில்லாத உலாவி செயல்பாட்டின் எடுத்துக்காட்டுகள்
    - BrowserStack, Sauce Labs, LambdaTest உடன் கிளவுட் சோதனை ஒருங்கிணைப்பு
    - வெளிப்புற தரவு மூலங்களிலிருந்து எளிதான சோதனை தரவு மேலாண்மைக்கு எடுத்துக்காட்டுகளுடன் MS-Excel இலிருந்து தரவைப் படிக்க/எழுத எடுத்துக்காட்டுகள்
    - E2E சோதனைக்கான எடுத்துக்காட்டுகளுடன் எந்த RDBMS (Oracle, MySql, TeraData, Vertica போன்றவை), எந்த வினவல்களையும் செயல்படுத்துதல் / முடிவு தொகுப்பைப் பெறுதல் போன்றவற்றுக்கான தரவுத்தள ஆதரவு
    - பல அறிக்கையிடல் (Spec, Xunit/Junit, Allure, JSON) மற்றும் Allure மற்றும் Xunit/Junit அறிக்கைகளை WebServer இல் ஹோஸ்டிங் செய்தல்.
    - https://search.yahoo.com/ மற்றும் http://the-internet.herokuapp.com டெமோ ஆப்களுடன் எடுத்துக்காட்டுகள்.
    - BrowserStack, Sauce Labs, LambdaTest மற்றும் Appium குறிப்பிட்ட `.config` கோப்பு (மொபைல் சாதனத்தில் பிளேபேக்கிற்கு). iOS மற்றும் Android க்கான உள்ளூர் இயந்திரத்தில் ஒரு கிளிக் Appium அமைப்பிற்கு [appium-setup-made-easy-OSX](https://github.com/amiya-pattnaik/appium-setup-made-easy-OSX) ஐப் பார்க்கவும்.

## [amiya-pattnaik/webdriverIO-with-mochaBDD](https://github.com/amiya-pattnaik/webdriverIO-with-mochaBDD)

- கட்டமைப்பு: WDIO-V8 with Mocha (V10x).
- அம்சங்கள்:
    -  ES6 /ES7 ஸ்டைல் வகுப்பு அடிப்படை அணுகுமுறை மற்றும் TypeScript ஆதரவுடன் பக்க பொருள்கள் மாதிரி பயன்படுத்தப்படுகிறது
    -  https://search.yahoo.com மற்றும் http://the-internet.herokuapp.com டெமோ ஆப்களுடன் எடுத்துக்காட்டுகள்
    -  Chrome மற்றும் Firefox ஐப் பயன்படுத்தி பல உலாவி மற்றும் தலைப்பில்லாத உலாவி செயல்பாட்டின் எடுத்துக்காட்டுகள்
    -  BrowserStack, Sauce Labs, LambdaTest உடன் கிளவுட் சோதனை ஒருங்கிணைப்பு
    -  பல அறிக்கையிடல் (Spec, Xunit/Junit, Allure, JSON) மற்றும் Allure மற்றும் Xunit/Junit அறிக்கைகளை WebServer இல் ஹோஸ்டிங் செய்தல்.
    -  வெளிப்புற தரவு மூலங்களிலிருந்து எளிதான சோதனை தரவு மேலாண்மைக்கு எடுத்துக்காட்டுகளுடன் MS-Excel இலிருந்து தரவைப் படிக்க/எழுத எடுத்துக்காட்டுகள்
    -  E2E சோதனைக்கான எடுத்துக்காட்டுகளுடன் எந்த RDBMS (Oracle, MySql, TeraData, Vertica போன்றவை), எந்த வினவல்களையும் செயல்படுத்துதல் / முடிவு தொகுப்பைப் பெறுதல் போன்றவற்றுக்கான DB இணைப்பின் எடுத்துக்காட்டுகள்
    -  BrowserStack, Sauce Labs, LambdaTest மற்றும் Appium குறிப்பிட்ட `.config` கோப்பு (மொபைல் சாதனத்தில் பிளேபேக்கிற்கு). iOS மற்றும் Android க்கான உள்ளூர் இயந்திரத்தில் ஒரு கிளிக் Appium அமைப்பிற்கு [appium-setup-made-easy-OSX](https://github.com/amiya-pattnaik/appium-setup-made-easy-OSX) ஐப் பார்க்கவும்.

## [amiya-pattnaik/webdriverIO-with-jasmineBDD](https://github.com/amiya-pattnaik/webdriverIO-with-jasmineBDD)

- கட்டமைப்பு: WDIO-V8 with Jasmine (V4x).
- அம்சங்கள்:
    -  ES6 /ES7 ஸ்டைல் வகுப்பு அடிப்படை அணுகுமுறை மற்றும் TypeScript ஆதரவுடன் பக்க பொருள்கள் மாதிரி பயன்படுத்தப்படுகிறது
    -  https://search.yahoo.com மற்றும் http://the-internet.herokuapp.com டெமோ ஆப்களுடன் எடுத்துக்காட்டுகள்
    -  Chrome மற்றும் Firefox ஐப் பயன்படுத்தி பல உலாவி மற்றும் தலைப்பில்லாத உலாவி செயல்பாட்டின் எடுத்துக்காட்டுகள்
    -  BrowserStack, Sauce Labs, LambdaTest உடன் கிளவுட் சோதனை ஒருங்கிணைப்பு
    -  பல அறிக்கையிடல் (Spec, Xunit/Junit, Allure, JSON) மற்றும் Allure மற்றும் Xunit/Junit அறிக்கைகளை WebServer இல் ஹோஸ்டிங் செய்தல்.
    -  வெளிப்புற தரவு மூலங்களிலிருந்து எளிதான சோதனை தரவு மேலாண்மைக்கு எடுத்துக்காட்டுகளுடன் MS-Excel இலிருந்து தரவைப் படிக்க/எழுத எடுத்துக்காட்டுகள்
    -  E2E சோதனைக்கான எடுத்துக்காட்டுகளுடன் எந்த RDBMS (Oracle, MySql, TeraData, Vertica போன்றவை), எந்த வினவல்களையும் செயல்படுத்துதல் / முடிவு தொகுப்பைப் பெறுதல் போன்றவற்றுக்கான DB இணைப்பின் எடுத்துக்காட்டுகள்
    -  BrowserStack, Sauce Labs, LambdaTest மற்றும் Appium குறிப்பிட்ட `.config` கோப்பு (மொபைல் சாதனத்தில் பிளேபேக்கிற்கு). iOS மற்றும் Android க்கான உள்ளூர் இயந்திரத்தில் ஒரு கிளிக் Appium அமைப்பிற்கு [appium-setup-made-easy-OSX](https://github.com/amiya-pattnaik/appium-setup-made-easy-OSX) ஐப் பார்க்கவும்.

## [syamphaneendra/webdriverio-web-mobile-boilerplate](https://github.com/syamphaneendra/webdriverio-web-mobile-boilerplate)

இந்த வார்ப்புரு திட்டம் cucumber மற்றும் typescript உடன் WebdriverIO 8 சோதனைகளைக் கொண்டுள்ளது, அதைத் தொடர்ந்து பக்க பொருள்கள் முறை பின்பற்றப்படுகிறது.

- கட்டமைப்புகள்:
    - WebdriverIO v8
    - Cucumber v8

- அம்சங்கள்:
    - Typescript v5
    - பக்க பொருள் முறை
    - Prettier
    - பல உலாவி ஆதரவு
      - Chrome
      - Firefox
      - Edge
      - Safari
      - Standalone
    - குறுக்கு உலாவி இணை செயல்பாடு
    - Appium
    - BrowserStack & Sauce Labs உடன் கிளவுட் சோதனை ஒருங்கிணைப்பு
    - Docker சேவை
    - தரவு சேவையைப் பகிரவும்
    - ஒவ்வொரு சேவைக்கும் தனி கட்டமைப்பு கோப்புகள்
    - சோதனை தரவு மேலாண்மை & பயனர் வகை மூலம் படிக்கவும்
    - அறிக்கையிடல்
      - Dot
      - Spec
      - தோல்வி ஸ்கிரீன்ஷாட்களுடன் பல செவ்விளனி html அறிக்கை
    - Gitlab களஞ்சியத்திற்கான Gitlab பைப்லைன்கள்
    - Github களஞ்சியத்திற்கான Github செயல்கள்
    - Docker hub ஐ அமைப்பதற்கான Docker compose
    - AXE ஐப் பயன்படுத்தி அணுகல் சோதனை
    - Applitools ஐப் பயன்படுத்தி காட்சி சோதனை
    - பதிவு செய்யும் முறை


## [klassijs/klassi-js (cucumber-template)](https://github.com/klassijs/klassi-example-test-suite.git)

- கட்டமைப்புகள்
    - WebdriverIO (v8)
    - Cucumber (v8)

- அம்சங்கள்
    - cucumber இல் மாதிரி சோதனை சூழலைக் கொண்டுள்ளது
    - தோல்விகளில் உட்பொதிக்கப்பட்ட வீடியோக்களுடன் ஒருங்கிணைந்த cucumber html அறிக்கைகள்
    - ஒருங்கிணைந்த Lambdatest மற்றும் CircleCI சேவைகள்
    - ஒருங்கிணைந்த காட்சி, அணுகல் மற்றும் API சோதனை
    - ஒருங்கிணைந்த மின்னஞ்சல் செயல்பாடு
    - சோதனை அறிக்கைகள் சேமிப்பு மற்றும் மீட்டெடுப்புக்கான ஒருங்கிணைந்த s3 பக்கெட்

## [serenity-js/serenity-js-mocha-webdriverio-template/](https://github.com/serenity-js/serenity-js-mocha-webdriverio-template/)

சமீபத்திய WebdriverIO, Mocha மற்றும் Serenity/JS ஐப் பயன்படுத்தி உங்கள் வலை பயன்பாடுகளின் ஏற்பு சோதனையைத் தொடங்க உதவும் [Serenity/JS](https://serenity-js.org?pk_campaign=wdio8&pk_source=webdriver.io) வார்ப்புரு திட்டம்.

- கட்டமைப்புகள்
    - WebdriverIO (v8)
    - Mocha (v10)
    - Serenity/JS (v3)
    - Serenity BDD அறிக்கையிடல்

- அம்சங்கள்
    - [Screenplay Pattern](https://serenity-js.org/handbook/design/screenplay-pattern/?pk_campaign=wdio8&pk_source=webdriver.io)
    - சோதனை தோல்வியில் தானியங்கி ஸ்கிரீன்ஷாட்கள், அறிக்கைகளில் உட்பொதிக்கப்பட்டுள்ளன
    - [GitHub Actions](https://github.com/serenity-js/serenity-js-mocha-webdriverio-template/blob/main/.github/workflows/main.yml) ஐப் பயன்படுத்தி தொடர்ச்சியான ஒருங்கிணைப்பு (CI) அமைப்பு
    - GitHub Pages இல் வெளியிடப்பட்ட [டெமோ Serenity BDD அறிக்கைகள்](https://serenity-js.github.io/serenity-js-mocha-webdriverio-template/)
    - TypeScript
    - ESLint

## [serenity-js/serenity-js-cucumber-webdriverio-template/](https://github.com/serenity-js/serenity-js-cucumber-webdriverio-template/)

சமீபத்திய WebdriverIO, Cucumber மற்றும் Serenity/JS ஐப் பயன்படுத்தி உங்கள் வலை பயன்பாடுகளின் ஏற்பு சோதனையைத் தொடங்க உதவும் [Serenity/JS](https://serenity-js.org?pk_campaign=wdio8&pk_source=webdriver.io) வார்ப்புரு திட்டம்.

- கட்டமைப்புகள்
    - WebdriverIO (v8)
    - Cucumber (v9)
    - Serenity/JS (v3)
    - Serenity BDD அறிக்கையிடல்

- அம்சங்கள்
    - [Screenplay Pattern](https://serenity-js.org/handbook/design/screenplay-pattern/?pk_campaign=wdio8&pk_source=webdriver.io)
    - சோதனை தோல்வியில் தானியங்கி ஸ்கிரீன்ஷாட்கள், அறிக்கைகளில் உட்பொதிக்கப்பட்டுள்ளன
    - [GitHub Actions](https://github.com/serenity-js/serenity-js-cucumber-webdriverio-template/blob/main/.github/workflows/main.yml) ஐப் பயன்படுத்தி தொடர்ச்சியான ஒருங்கிணைப்பு (CI) அமைப்பு
    - GitHub Pages இல் வெளியிடப்பட்ட [டெமோ Serenity BDD அறிக்கைகள்](https://serenity-js.github.io/serenity-js-mocha-webdriverio-template/)
    - TypeScript
    - ESLint

## [Muralijc/wdio-headspin-boilerplate](https://github.com/Muralijc/Wdio-Headspin-boilerplate/)
Cucumber அம்சங்கள் மற்றும் பக்க பொருள்கள் முறையைப் பயன்படுத்தி Headspin Cloud (https://www.headspin.io/) இல் WebdriverIO சோதனைகளை இயக்குவதற்கான வார்ப்புரு திட்டம்.
- கட்டமைப்புகள்
    - WebdriverIO (v8)
    - Cucumber (v8)

- அம்சங்கள்
    - [Headspin](https://www.headspin.io/) உடன் கிளவுட் ஒருங்கிணைப்பு
    - பக்க பொருள் மாதிரியை ஆதரிக்கிறது
    - BDD இன் விளக்க பாணியில் எழுதப்பட்ட மாதிரி சூழல்களைக் கொண்டுள்ளது
    - ஒருங்கிணைந்த cucumber html அறிக்கைகள்

# v7 வார்ப்புரு திட்டங்கள்
---

## [webdriverio/appium-boilerplate](https://github.com/webdriverio/appium-boilerplate/)

இவற்றிற்கு WebdriverIO உடன் Appium சோதனைகளை இயக்குவதற்கான வார்ப்புரு திட்டம்:

- iOS/Android நேட்டிவ் ஆப்ஸ்
- iOS/Android ஹைப்ரிட் ஆப்ஸ்
- ஆண்ட்ராய்டு Chrome மற்றும் iOS Safari உலாவி

இந்த வார்ப்புரு பின்வருவனவற்றை உள்ளடக்கியது:

- கட்டமைப்பு: Mocha
- அம்சங்கள்:
    - இவற்றிற்கான கட்டமைப்புகள்:
        - iOS மற்றும் Android ஆப்
        - iOS மற்றும் Android உலாவிகள்
    - இவற்றிற்கான உதவியாளர்கள்:
        - WebView
        - சைகைகள்
        - நேட்டிவ் எச்சரிக்கைகள்
        - பிக்கர்கள்
     - இவற்றிற்கான சோதனை எடுத்துக்காட்டுகள்:
        - WebView
        - உள்நுழைவு
        - படிவங்கள்
        - ஸ்வைப்
        - உலாவிகள்

## [serhatbolsu/webdriverio-mocha-uiautomation-boiler](https://github.com/serhatbolsu/webdriverio-mocha-uiautomation-boiler)
PageObject உடன் Mocha, WebdriverIO v6 உடன் ATDD WEB சோதனைகள்

- கட்டமைப்புகள்
  - WebdriverIO (v7)
  - Mocha
- அம்சங்கள்
  - [Page Object](pageobjects) மாதிரி
  - [Sauce Service](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-sauce-service/README.md) உடன் Sauce Labs ஒருங்கிணைப்பு
  - Allure அறிக்கை
  - தோல்வியடையும் சோதனைகளுக்கான தானியங்கி ஸ்கிரீன்ஷாட் எடுப்பு
  - CircleCI எடுத்துக்காட்டு
  - ESLint

## [WarleyGabriel/demo-webdriverio-mocha](https://github.com/WarleyGabriel/demo-webdriverio-mocha)

Mocha உடன் E2E சோதனைகளை இயக்குவதற்கான வார்ப்புரு திட்டம்.

- கட்டமைப்புகள்:
    - WebdriverIO (v7)
    - Mocha
- அம்சங்கள்:
    -   TypeScript
    -   [Expect-webdriverio](https://github.com/webdriverio/expect-webdriverio)
    -   [Visual regression tests](https://github.com/wswebcreation/wdio-image-comparison-service)
    -   பக்க பொருள் முறை
    -   [Commit lint](https://github.com/conventional-changelog/commitlint) மற்றும் [Commitizen](https://github.com/commitizen/cz-cli#making-your-repo-commitizen-friendly)
    -   ESlint
    -   Prettier
    -   Husky
    -   Github Actions எடுத்துக்காட்டு
    -   Allure அறிக்கை (தோல்வியில் ஸ்கிரீன்ஷாட்கள்)

## [17thSep/WebdriverIO_Master](https://github.com/17thSep/WebdriverIO_Master)

பின்வருவனவற்றிற்கான **WebdriverIO v7** சோதனைகளை இயக்குவதற்கான வார்ப்புரு திட்டம்:

[WDIO 7 scripts with TypeScript in Cucumber Framework](https://github.com/17thSep/WebdriverIO_Master/tree/master/TypeScript/Cucumber)
[WDIO 7 scripts with TypeScript in Mocha Framework](https://github.com/17thSep/WebdriverIO_Master/tree/master/TypeScript/Mocha)
[Run WDIO 7 script in Docker](https://github.com/17thSep/WebdriverIO_Master/tree/master/TypeScript/Docker)
[Network logs](https://github.com/17thSep/MonitorNetworkLogs/)

இவற்றிற்கான வார்ப்புரு திட்டம்:

- நெட்வொர்க் பதிவுகளைக் கைப்பற்றுதல்
- அனைத்து GET/POST அழைப்புகளையும் அல்லது ஒரு குறிப்பிட்ட REST API ஐக் கைப்பற்றுதல்
- கோரிக்கை அளவுருக்களை உறுதிப்படுத்துதல்
- பதில் அளவுருக்களை உறுதிப்படுத்துதல்
- அனைத்து பதில்களையும் தனி கோப்பில் சேமிக்கவும்

## [Arjun-Ar91/Wdio7-appium-cucumber](https://github.com/Arjun-Ar91/Wdio7-appium-cucumber.git)

Cucumber v7 மற்றும் wdio v7 ஐப் பயன்படுத்தி பக்க பொருள் முறையுடன் நேட்டிவ் மற்றும் மொபைல் உலாவிக்கு appium சோதனைகளை இயக்குவதற்கான வார்ப்புரு திட்டம்.

- கட்டமைப்புகள்
    - WebdriverIO v7
    - Cucumber v7
    - Appium

- அம்சங்கள்
    - நேட்டிவ் Android மற்றும் iOS ஆப்ஸ்
    - ஆண்ட்ராய்டு Chrome உலாவி
    - iOS Safari உலாவி
    - பக்க பொருள் மாதிரி
    - Cucumber இல் மாதிரி சோதனை சூழல்களைக் கொண்டுள்ளது
    - பல cucumber html அறிக்கைகளுடன் ஒருங்கிணைக்கப்பட்டுள்ளது

## [praveendvd/webdriverIODockerBoilerplate/](https://github.com/praveendvd/webdriverIODockerBoilerplate)

இது சமீபத்திய WebdriverIO மற்றும் Cucumber கட்டமைப்பைப் பயன்படுத்தி வலை பயன்பாடுகளிலிருந்து webdriverio சோதனையை எவ்வாறு இயக்கலாம் என்பதைக் காட்ட உதவும் ஒரு வார்ப்புரு திட்டம். docker இல் WebdriverIO சோதனைகளை எவ்வாறு இயக்குவது என்பதைப் புரிந்துகொள்ள நீங்கள் பயன்படுத்தக்கூடிய அடிப்படை படத்தைச் செயல்படுத்துவதே இந்த திட்டத்தின் நோக்கம்

இந்த திட்டம் பின்வருவனவற்றை உள்ளடக்கியது:

- DockerFile
- cucumber திட்டம்

மேலும் படிக்க: [Medium Blog](https://praveendavidmathew.medium.com/running-webdriverio-in-wsl2-windows-91d3a0dc7746)

## [praveendvd/WebdriverIO_electronAppAutomation_boilerplate/](https://github.com/praveendvd/WebdriverIO_electronAppAutomation_boilerplate)

இது WebdriverIO ஐப் பயன்படுத்தி electronJS சோதனைகளை எவ்வாறு இயக்கலாம் என்பதைக் காட்ட உதவும் ஒரு வார்ப்புரு திட்டம். WebdriverIO electronJS சோதனைகளை எவ்வாறு இயக்குவது என்பதைப் புரிந்துகொள்ள நீங்கள் பயன்படுத்தக்கூடிய அடிப்படை படத்தைச் செயல்படுத்துவதே இந்த திட்டத்தின் நோக்கம்.

இந்த திட்டம் பின்வருவனவற்றை உள்ளடக்கியது:

- மாதிரி electronjs ஆப்
- மாதிரி cucumber சோதனை ஸ்கிரிப்ட்கள்

மேலும் படிக்க: [Medium Blog](https://praveendavidmathew.medium.com/first-step-into-automation-of-electronjs-applications-ef89b7423ddd)

## [praveendvd/webdriverIO_winappdriver_boilerplate/](https://github.com/praveendvd/webdriverIO_winappdriver_boilerplate)

இது winappdriver மற்றும் WebdriverIO ஐப் பயன்படுத்தி Windows பயன்பாட்டை எவ்வாறு தானியக்கப்படுத்தலாம் என்பதைக் காட்ட உதவும் ஒரு வார்ப்புரு திட்டம். windappdriver மற்றும் WebdriverIO சோதனைகளை எவ்வாறு இயக்குவது என்பதைப் புரிந்துகொள்ள நீங்கள் பயன்படுத்தக்கூடிய அடிப்படை படத்தைச் செயல்படுத்துவதே இந்த திட்டத்தின் நோக்கம்.

மேலும் படிக்க: [Medium Blog](https://praveendavidmathew.medium.com/winappdriver-first-step-into-windows-app-test-automation-using-webdriverio-and-winappdriver-46320d89570b)

## [praveendvd/appium-chromedriver-multiremote-wdio-boilerplate/](https://github.com/praveendvd/appium-chromedriver-multiremote-wdio-boilerplate)


இது சமீபத்திய WebdriverIO மற்றும் Jasmine கட்டமைப்புடன் webdriverio multiremote திறனை எவ்வாறு இயக்குவது என்பதைக் காட்ட உதவும் ஒரு வார்ப்புரு திட்டம். docker இல் WebdriverIO சோதனைகளை எவ்வாறு இயக்குவது என்பதைப் புரிந்துகொள்ள நீங்கள் பயன்படுத்தக்கூடிய அடிப்படை படத்தைச் செயல்படுத்துவதே இந்த திட்டத்தின் நோக்கம்

இந்த திட்டம் பின்வருவனவற்றைப் பயன்படுத்துகிறது:
     - chromedriver
     - jasmine
     - appium

## [webdriverio-roku-appium-boilerplate](https://github.com/AntonKostenko/webdriverIO-roku-appium)

பக்க பொருள் முறையுடன் mocha ஐப் பயன்படுத்தி உண்மையான Roku சாதனங்களில் appium சோதனைகளை இயக்குவதற்கான வார்ப்புரு திட்டம்.

- கட்டமைப்புகள்
    - WebdriverIO Async v7
    - Appium 2.0
    - Mocha v7
    - Allure Reporting

- அம்சங்கள்
    - பக்க பொருள் மாதிரி
    - Typescript
    - தோல்வியில் ஸ்கிரீன்ஷாட்
    - மாதிரி Roku சேனலைப் பயன்படுத்தி சோதனை எடுத்துக்காட்டுகள்

## [krishnapollu/wdio-cucumber-poc](https://github.com/krishnapollu/wdio-cucumber-poc)

E2E Multiremote Cucumber சோதனைகள் மற்றும் தரவு இயக்க Mocha சோதனைகளுக்கான PoC திட்டம்

- கட்டமைப்பு:
    - Cucumber (v8)
    - WebdriverIO (v8)
    - Mocha (v8)

- அம்சங்கள்:
    - Cucumber அடிப்படையிலான E2E சோதனைகள்
    - Mocha அடிப்படையிலான தரவு இயக்க சோதனைகள்
    - வலை மட்டும் சோதனைகள் - உள்ளூர் மற்றும் கிளவுட் தளங்கள் இரண்டிலும்
    - மொபைல் மட்டும் சோதனைகள் - உள்ளூர் மற்றும் தொலைநிலை கிளவுட் எமுலேட்டர்கள் (அல்லது சாதனங்கள்)
    - வலை + மொபைல் சோதனைகள் - Multiremote - உள்ளூர் மற்றும் கிளவுட் தளங்கள்
    - Allure உட்பட பல அறிக்கைகள் ஒருங்கிணைக்கப்பட்டுள்ளன
    - சோதனை செயல்பாட்டுக்குப் பிறகு கோப்பில் தரவை (ஓட்டத்தில் உருவாக்கப்பட்டது) எழுதுவதற்கு சோதனை தரவு (JSON / XLSX) உலகளாவிய ரீதியில் கையாளப்படுகிறது
    - சோதனையை இயக்கி allure அறிக்கையை பதிவேற்றும் Github workflow

## [Rondleysg/wdio-multiremote-appium-chromedriver-boilerplate](https://github.com/Rondleysg/wdio-multiremote-appium-chromedriver-boilerplate)

சமீபத்திய WebdriverIO உடன் appium மற்றும் chromedriver சேவையைப் பயன்படுத்தி webdriverio multi-remote ஐ எவ்வாறு இயக்குவது என்பதைக் காட்ட உதவும் ஒரு வார்ப்புரு திட்டம் இது.

- கட்டமைப்புகள்
  - WebdriverIO (v9)
  - Appium (v2)
  - Mocha

- அம்சங்கள்
  - [Page Object](pageobjects) மாதிரி
  - Typescript
  - வலை + மொபைல் சோதனைகள் - Multiremote
  - நேட்டிவ் Android மற்றும் iOS ஆப்ஸ்
  - Appium
  - Chromedriver
  - ESLint
  - http://the-internet.herokuapp.com மற்றும் [WebdriverIO native demo app](https://github.com/webdriverio/native-demo-app) இல் உள்நுழைவதற்கான சோதனை எடுத்துக்காட்டுகள்