---
id: boilerplates
title: மாதிரி திட்டங்கள்
---

காலப்போக்கில், நமது சமூகம் உங்கள் சொந்த சோதனை தொகுப்பை அமைக்க நீங்கள் உத்வேகமாகப் பயன்படுத்தக்கூடிய பல திட்டங்களை உருவாக்கியுள்ளது.

# v9 மாதிரி திட்டங்கள்

## [webdriverio/cucumber-boilerplate](https://github.com/webdriverio/cucumber-boilerplate)

குக்கும்பர் சோதனை தொகுப்புகளுக்கான எங்களின் சொந்த மாதிரி. உங்களுக்காக 150க்கும் மேற்பட்ட முன்வரையறுக்கப்பட்ட படி விளக்கங்களை நாங்கள் உருவாக்கியுள்ளோம், எனவே உங்கள் திட்டத்தில் அம்ச கோப்புகளை உடனடியாக எழுத ஆரம்பிக்கலாம்.

- கட்டமைப்பு:
    - Cucumber
    - WebdriverIO
- அம்சங்கள்:
    - உங்களுக்குத் தேவையான அனைத்தையும் கிட்டத்தட்ட உள்ளடக்கிய 150க்கும் மேற்பட்ட முன்வரையறுக்கப்பட்ட படிகள்
    - WebdriverIO இன் Multiremote செயல்பாட்டை ஒருங்கிணைக்கிறது
    - சொந்த டெமோ ஆப்

## [webdriverio/jasmine-boilerplate](https://github.com/webdriverio/jasmine-boilerplate)
பாபெல் அம்சங்கள் மற்றும் பக்க பொருட்கள் முறையைப் பயன்படுத்தி ஜாஸ்மின் பயன்படுத்தி WebdriverIO சோதனைகளை இயக்குவதற்கான மாதிரித் திட்டம்.

- கட்டமைப்புகள்
    - WebdriverIO
    - Jasmine
- அம்சங்கள்
    - பக்க பொருள் முறை
    - Sauce Labs ஒருங்கிணைப்பு

## [webdriverio/electron-boilerplate](https://github.com/webdriverio/electron-boilerplate)
குறைந்தபட்ச எலெக்ட்ரான் பயன்பாட்டில் WebdriverIO சோதனைகளை இயக்குவதற்கான மாதிரித் திட்டம்.

- கட்டமைப்புகள்
    - WebdriverIO
    - Mocha
- அம்சங்கள்
    - Electron API பொய்மை

## [amiya-pattnaik/wdio-testgen-from-gherkin-js](https://github.com/amiya-pattnaik/wdio-testgen-from-gherkin-js)
## [amiya-pattnaik/wdio-testgen-from-gherkin-ts](https://github.com/amiya-pattnaik/wdio-testgen-from-gherkin-ts)
Gherkin .feature கோப்புகளிலிருந்து WebdriverIO பக்க பொருள் வகுப்புகள் மற்றும் Mocha சோதனை ஸ்பெக்களை தானாகவே உருவாக்கவும் - கைமுறை முயற்சியைக் குறைக்கிறது, நிலைத்தன்மையை மேம்படுத்துகிறது, மற்றும் QA தானியக்கத்தை விரைவுபடுத்துகிறது. இந்த திட்டம் webdriver.io உடன் இணக்கமான குறியீடுகளை உருவாக்குவதோடு மட்டுமல்லாமல், webdriver.io இன் அனைத்து செயல்பாடுகளையும் மேம்படுத்துகிறது. நாங்கள் ஜாவாஸ்கிரிப்ட் பயனர்களுக்கு ஒன்றும், டைப்ஸ்கிரிப்ட் பயனர்களுக்கு மற்றொன்றும் என இரண்டு வகைகளை உருவாக்கியுள்ளோம். ஆனால் இரண்டு திட்டங்களும் ஒரே மாதிரி செயல்படுகின்றன.

***இது எப்படி செயல்படுகிறது?***
- இந்த செயல்முறை இரண்டு-படி தானியக்கத்தைப் பின்பற்றுகிறது:
- படி 1: Gherkin முதல் stepMap வரை (stepMap.json கோப்புகளை உருவாக்கவும்)
  - stepMap.json கோப்புகளை உருவாக்கவும்:
    - Gherkin தொடரியலில் எழுதப்பட்ட .feature கோப்புகளை பகுப்பாய்வு செய்கிறது.
    - காட்சிகள் மற்றும் படிகளை பிரித்தெடுக்கிறது.
    - பின்வருவனவற்றைக் கொண்ட கட்டமைக்கப்பட்ட .stepMap.json கோப்பை உருவாக்குகிறது:
      - செயல்படுத்த வேண்டிய செயல் (எ.கா., click, setText, assertVisible)
      - தர்க்க மேப்பிங்கிற்கான selectorName
      - DOM உறுப்புக்கான selector
      - மதிப்புகள் அல்லது உறுதிப்படுத்தலுக்கான குறிப்பு
- படி 2: stepMap முதல் குறியீடு வரை (WebdriverIO குறியீட்டை உருவாக்கவும்).
  பின்வருவனவற்றை உருவாக்க stepMap.json ஐப் பயன்படுத்துகிறது:
  - பகிரப்பட்ட முறைகள் மற்றும் browser.url() அமைப்புடன் ஒரு அடிப்படை page.js வகுப்பை உருவாக்குகிறது.
  - test/pageobjects/ உள்ளே அம்சத்திற்கு ஏற்ப WebdriverIO-இணக்கமான பக்க பொருள் மாடல் (POM) வகுப்புகளை உருவாக்குகிறது.
  - Mocha-அடிப்படையிலான சோதனை ஸ்பெக்களை உருவாக்குகிறது.
- JavaScript / TypeScript க்கான கோப்பகக் கட்டமைப்பின் எடுத்துக்காட்டு. கீழே JS பதிப்புக்கானது, TS பதிப்பும் அதே கட்டமைப்பைக் கொண்டுள்ளது.
```
project-root/
├── features/                   # Gherkin .feature files (user input / source file)
├── stepMaps/                   # Auto-generated .stepMap.json files
├── test/                 
│   ├── pageobjects/            # Auto-generated WebdriverIO tests Page Object Model classes
│   └── specs/                  # Auto-generated Mocha test specs
├── src/
│   ├── cli.js                  # Main CLI logic
│   ├── generateStepsMap.js     # Feature-to-stepMap generator
│   ├── generateTestsFromMap.js # stepMap-to-page/spec generator
│   ├── utils.js                # Helper methods
│   └── config.js               # Paths, fallback selectors, aliases
│   └── __tests__/              # Unit tests (Vitest)
├── testgen.js                  # CLI entry point
│── wdio.config.js              # WebdriverIO configuration
├── package.json                # Scripts and dependencies
├── selector-aliases.json       # Optional user-defined selector overrides the primary selector
```
---
# v8 மாதிரி திட்டங்கள்

## [amiya-pattnaik/webdriverIO-with-cucumberBDD](https://github.com/amiya-pattnaik/webdriverIO-with-cucumberBDD)

- கட்டமைப்பு: WDIO-V8 with Cucumber (V8x).
- அம்சங்கள்:
    - ES6 /ES7 வகுப்பு அடிப்படையிலான அணுகுமுறை மற்றும் TypeScript ஆதரவுடன் பக்க பொருட்கள் மாடல் பயன்படுத்துகிறது
    - ஒரே நேரத்தில் ஒன்றுக்கு மேற்பட்ட தேர்வாளர்களுடன் உறுப்பு வினவல் மல்டி செலக்டர் விருப்பத்தின் எடுத்துக்காட்டுகள்
    - மல்டி பிரவுசர் மற்றும் ஹெட்லெஸ் பிரவுசர் செயலாக்கத்தின் எடுத்துக்காட்டுகள் - Chrome மற்றும் Firefox ஐப் பயன்படுத்துதல்
    - BrowserStack, Sauce Labs, LambdaTest உடன் கிளவுட் டெஸ்டிங் ஒருங்கிணைப்பு
    - வெளிப்புற தரவு மூலங்களிலிருந்து எளிதான சோதனை தரவு மேலாண்மைக்கு எடுத்துக்காட்டுகளுடன் MS-Excel இலிருந்து தரவை படிக்க/எழுத எடுத்துக்காட்டுகள்
    - எந்த RDBMS (Oracle, MySql, TeraData, Vertica போன்றவை) க்கும் தரவுத்தள ஆதரவு, எந்த வினவல்களையும் செயல்படுத்துதல் / முடிவு தொகுப்பு போன்றவற்றை பெறுதல். E2E சோதனைக்கான எடுத்துக்காட்டுகளுடன்
    - பல அறிக்கையிடல் (Spec, Xunit/Junit, Allure, JSON) மற்றும் Allure மற்றும் Xunit/Junit அறிக்கையை WebServer இல் ஹோஸ்டிங் செய்தல்.
    - https://search.yahoo.com/ மற்றும் http://the-internet.herokuapp.com ஆகியவற்றில் டெமோ ஆப்களுடன் எடுத்துக்காட்டுகள்.
    - BrowserStack, Sauce Labs, LambdaTest மற்றும் Appium குறிப்பிட்ட `.config` கோப்பு (மொபைல் சாதனத்தில் பிளேபேக்கிற்கு). iOS மற்றும் Android க்கான உள்ளூர் இயந்திரத்தில் ஒரு கிளிக் Appium அமைப்புக்கு [appium-setup-made-easy-OSX](https://github.com/amiya-pattnaik/appium-setup-made-easy-OSX) ஐப் பார்க்கவும்.

## [amiya-pattnaik/webdriverIO-with-mochaBDD](https://github.com/amiya-pattnaik/webdriverIO-with-mochaBDD)

- கட்டமைப்பு: WDIO-V8 with Mocha (V10x).
- அம்சங்கள்:
    -  ES6 /ES7 வகுப்பு அடிப்படையிலான அணுகுமுறை மற்றும் TypeScript ஆதரவுடன் பக்க பொருட்கள் மாடல் பயன்படுத்துகிறது
    -  https://search.yahoo.com மற்றும் http://the-internet.herokuapp.com ஆகியவற்றில் டெமோ ஆப்களுடன் எடுத்துக்காட்டுகள்
    -  Chrome மற்றும் Firefox ஐப் பயன்படுத்தி மல்டி பிரவுசர் மற்றும் ஹெட்லெஸ் பிரவுசர் செயலாக்கத்தின் எடுத்துக்காட்டுகள்
    -  BrowserStack, Sauce Labs, LambdaTest உடன் கிளவுட் டெஸ்டிங் ஒருங்கிணைப்பு
    -  பல அறிக்கையிடல் (Spec, Xunit/Junit, Allure, JSON) மற்றும் Allure மற்றும் Xunit/Junit அறிக்கையை WebServer இல் ஹோஸ்டிங் செய்தல்.
    -  வெளிப்புற தரவு மூலங்களிலிருந்து எளிதான சோதனை தரவு மேலாண்மைக்கு எடுத்துக்காட்டுகளுடன் MS-Excel இலிருந்து தரவை படிக்க/எழுத எடுத்துக்காட்டுகள்
    -  எந்த RDBMS (Oracle, MySql, TeraData, Vertica போன்றவை) க்கும் DB இணைப்பு, எந்த வினவல் செயலாக்கம் / முடிவு தொகுப்பு போன்றவற்றைப் பெறுதல். E2E சோதனைக்கான எடுத்துக்காட்டுகளுடன்
    -  BrowserStack, Sauce Labs, LambdaTest மற்றும் Appium குறிப்பிட்ட `.config` கோப்பு (மொபைல் சாதனத்தில் பிளேபேக்கிற்கு). iOS மற்றும் Android க்கான உள்ளூர் இயந்திரத்தில் ஒரு கிளிக் Appium அமைப்புக்கு [appium-setup-made-easy-OSX](https://github.com/amiya-pattnaik/appium-setup-made-easy-OSX) ஐப் பார்க்கவும்.

## [amiya-pattnaik/webdriverIO-with-jasmineBDD](https://github.com/amiya-pattnaik/webdriverIO-with-jasmineBDD)

- கட்டமைப்பு: WDIO-V8 with Jasmine (V4x).
- அம்சங்கள்:
    -  ES6 /ES7 வகுப்பு அடிப்படையிலான அணுகுமுறை மற்றும் TypeScript ஆதரவுடன் பக்க பொருட்கள் மாடல் பயன்படுத்துகிறது
    -  https://search.yahoo.com மற்றும் http://the-internet.herokuapp.com ஆகியவற்றில் டெமோ ஆப்களுடன் எடுத்துக்காட்டுகள்
    -  Chrome மற்றும் Firefox ஐப் பயன்படுத்தி மல்டி பிரவுசர் மற்றும் ஹெட்லெஸ் பிரவுசர் செயலாக்கத்தின் எடுத்துக்காட்டுகள்
    -  BrowserStack, Sauce Labs, LambdaTest உடன் கிளவுட் டெஸ்டிங் ஒருங்கிணைப்பு
    -  பல அறிக்கையிடல் (Spec, Xunit/Junit, Allure, JSON) மற்றும் Allure மற்றும் Xunit/Junit அறிக்கையை WebServer இல் ஹோஸ்டிங் செய்தல்.
    -  வெளிப்புற தரவு மூலங்களிலிருந்து எளிதான சோதனை தரவு மேலாண்மைக்கு எடுத்துக்காட்டுகளுடன் MS-Excel இலிருந்து தரவை படிக்க/எழுத எடுத்துக்காட்டுகள்
    -  எந்த RDBMS (Oracle, MySql, TeraData, Vertica போன்றவை) க்கும் DB இணைப்பு, எந்த வினவல் செயலாக்கம் / முடிவு தொகுப்பு போன்றவற்றைப் பெறுதல். E2E சோதனைக்கான எடுத்துக்காட்டுகளுடன்
    -  BrowserStack, Sauce Labs, LambdaTest மற்றும் Appium குறிப்பிட்ட `.config` கோப்பு ( மொபைல் சாதனத்தில் பிளேபேக்கிற்கு). iOS மற்றும் Android க்கான உள்ளூர் இயந்திரத்தில் ஒரு கிளிக் Appium அமைப்புக்கு [appium-setup-made-easy-OSX](https://github.com/amiya-pattnaik/appium-setup-made-easy-OSX) ஐப் பார்க்கவும்.

## [syamphaneendra/webdriverio-web-mobile-boilerplate](https://github.com/syamphaneendra/webdriverio-web-mobile-boilerplate)

இந்த மாதிரித் திட்டத்தில் குக்கும்பர் மற்றும் டைப்ஸ்கிரிப்ட் கொண்ட WebdriverIO 8 சோதனைகள் உள்ளன, அதைத் தொடர்ந்து பக்க பொருட்கள் முறை.

- கட்டமைப்புகள்:
    - WebdriverIO v8
    - Cucumber v8

- அம்சங்கள்:
    - Typescript v5
    - Page Object Pattern
    - Prettier
    - Multi browser support
      - Chrome
      - Firefox
      - Edge
      - Safari
      - Standalone
    - Crossbrowser parallel execution
    - Appium
    - Cloud testing Integration with BrowserStack & Sauce Labs
    - Docker service
    - Share data service
    - Separate config files for each service
    - Testdata management & read by user type
    - Reporting
      - Dot
      - Spec
      - Multiple cucumber html report with failure screenshots
    - Gitlab pipelines for Gitlab repository
    - Github actions for Github repository
    - Docker compose for setting up the docker hub
    - Accessibility testing using AXE
    - Visual testing using Applitools
    - Log mechansim


## [klassijs/klassi-js (cucumber-template)](https://github.com/klassijs/klassi-example-test-suite.git)

- கட்டமைப்புகள்
    - WebdriverIO (v8)
    - Cucumber (v8)

- அம்சங்கள்
    - குக்கும்பரில் மாதிரி சோதனை சூழ்நிலையைக் கொண்டிருக்கிறது
    - தோல்விகளில் உட்பொதிக்கப்பட்ட வீடியோக்களுடன் ஒருங்கிணைக்கப்பட்ட குக்கும்பர் html அறிக்கைகள்
    - Lambdatest மற்றும் CircleCI சேவைகள் ஒருங்கிணைக்கப்பட்டுள்ளன
    - Visual, Accessibility மற்றும் API சோதனைகள் ஒருங்கிணைக்கப்பட்டுள்ளன
    - மின்னஞ்சல் செயல்பாடு ஒருங்கிணைக்கப்பட்டுள்ளது
    - சோதனை அறிக்கைகளைச் சேமிப்பதற்கும் மீட்டெடுப்பதற்கும் s3 பக்கெட் ஒருங்கிணைக்கப்பட்டுள்ளது

## [serenity-js/serenity-js-mocha-webdriverio-template/](https://github.com/serenity-js/serenity-js-mocha-webdriverio-template/)

சமீபத்திய WebdriverIO, Mocha மற்றும் Serenity/JS ஐப் பயன்படுத்தி உங்கள் வலை பயன்பாடுகளை ஏற்பு சோதனை செய்ய ஆரம்பிக்க உதவும் [Serenity/JS](https://serenity-js.org?pk_campaign=wdio8&pk_source=webdriver.io) டெம்ப்ளேட் திட்டம்.

- கட்டமைப்புகள்
    - WebdriverIO (v8)
    - Mocha (v10)
    - Serenity/JS (v3)
    - Serenity BDD reporting

- அம்சங்கள்
    - [Screenplay Pattern](https://serenity-js.org/handbook/design/screenplay-pattern/?pk_campaign=wdio8&pk_source=webdriver.io)
    - சோதனை தோல்வியின் போது தானியங்கி ஸ்கிரீன்ஷாட்கள், அறிக்கைகளில் உட்பொதிக்கப்பட்டுள்ளன
    - [GitHub Actions](https://github.com/serenity-js/serenity-js-mocha-webdriverio-template/blob/main/.github/workflows/main.yml) ஐப் பயன்படுத்தி தொடர்ச்சியான ஒருங்கிணைப்பு (CI) அமைப்பு
    - GitHub Pages இல் வெளியிடப்பட்ட [Demo Serenity BDD reports](https://serenity-js.github.io/serenity-js-mocha-webdriverio-template/)
    - TypeScript
    - ESLint

## [serenity-js/serenity-js-cucumber-webdriverio-template/](https://github.com/serenity-js/serenity-js-cucumber-webdriverio-template/)

சமீபத்திய WebdriverIO, Cucumber மற்றும் Serenity/JS ஐப் பயன்படுத்தி உங்கள் வலை பயன்பாடுகளை ஏற்பு சோதனை செய்ய ஆரம்பிக்க உதவும் [Serenity/JS](https://serenity-js.org?pk_campaign=wdio8&pk_source=webdriver.io) டெம்ப்ளேட் திட்டம்.

- கட்டமைப்புகள்
    - WebdriverIO (v8)
    - Cucumber (v9)
    - Serenity/JS (v3)
    - Serenity BDD reporting

- அம்சங்கள்
    - [Screenplay Pattern](https://serenity-js.org/handbook/design/screenplay-pattern/?pk_campaign=wdio8&pk_source=webdriver.io)
    - சோதனை தோல்வியின் போது தானியங்கி ஸ்கிரீன்ஷாட்கள், அறிக்கைகளில் உட்பொதிக்கப்பட்டுள்ளன
    - [GitHub Actions](https://github.com/serenity-js/serenity-js-cucumber-webdriverio-template/blob/main/.github/workflows/main.yml) ஐப் பயன்படுத்தி தொடர்ச்சியான ஒருங்கிணைப்பு (CI) அமைப்பு
    - GitHub Pages இல் வெளியிடப்பட்ட [Demo Serenity BDD reports](https://serenity-js.github.io/serenity-js-mocha-webdriverio-template/)
    - TypeScript
    - ESLint

## [Muralijc/wdio-headspin-boilerplate](https://github.com/Muralijc/Wdio-Headspin-boilerplate/)
Cucumber அம்சங்கள் மற்றும் பக்க பொருட்கள் முறையைப் பயன்படுத்தி Headspin Cloud (https://www.headspin.io/) இல் WebdriverIO சோதனைகளை இயக்குவதற்கான மாதிரித் திட்டம்.
- கட்டமைப்புகள்
    - WebdriverIO (v8)
    - Cucumber (v8)

- அம்சங்கள்
    - [Headspin](https://www.headspin.io/) உடன் க்ளவுட் ஒருங்கிணைப்பு
    - Page Object Model ஐ ஆதரிக்கிறது
    - BDD இன் விளக்க பாணியில் எழுதப்பட்ட மாதிரி சூழ்நிலைகளைக் கொண்டுள்ளது
    - குக்கும்பர் html அறிக்கைகள் ஒருங்கிணைக்கப்பட்டுள்ளன

# v7 மாதிரி திட்டங்கள்
---

## [webdriverio/appium-boilerplate](https://github.com/webdriverio/appium-boilerplate/)

WebdriverIO உடன் Appium சோதனைகளை இயக்குவதற்கான மாதிரித் திட்டம்:

- iOS/Android Native Apps
- iOS/Android Hybrid Apps
- Android Chrome மற்றும் iOS Safari உலாவி

இந்த மாதிரி பின்வருவனவற்றை உள்ளடக்கியது:

- கட்டமைப்பு: Mocha
- அம்சங்கள்:
    - இவற்றுக்கான கான்ஃபிக்கள்:
        - iOS மற்றும் Android ஆப்
        - iOS மற்றும் Android உலாவிகள்
    - இவற்றுக்கான உதவிகள்:
        - WebView
        - ஜெஸ்ச்சர்கள்
        - நேட்டிவ் அலர்ட்கள்
        - பிக்கர்கள்
     - இவற்றுக்கான சோதனை எடுத்துக்காட்டுகள்:
        - WebView
        - லாகின்
        - ஃபார்ம்கள்
        - ஸ்வைப்
        - உலாவிகள்

## [serhatbolsu/webdriverio-mocha-uiautomation-boiler](https://github.com/serhatbolsu/webdriverio-mocha-uiautomation-boiler)
PageObject உடன் Mocha, WebdriverIO v6 பயன்படுத்தி ATDD WEB சோதனைகள்

- கட்டமைப்புகள்
  - WebdriverIO (v7)
  - Mocha
- அம்சங்கள்
  - [Page Object](pageobjects) Model
  - [Sauce Service](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-sauce-service/README.md) உடன் Sauce Labs ஒருங்கிணைப்பு
  - Allure Report
  - தோல்வியடையும் சோதனைகளுக்கான தானியங்கி ஸ்கிரீன்ஷாட் கேப்சர்
  - CircleCI எடுத்துக்காட்டு
  - ESLint

## [WarleyGabriel/demo-webdriverio-mocha](https://github.com/WarleyGabriel/demo-webdriverio-mocha)

Mocha உடன் E2E சோதனைகளை இயக்குவதற்கான மாதிரித் திட்டம்.

- கட்டமைப்புகள்:
    - WebdriverIO (v7)
    - Mocha
- அம்சங்கள்:
    -   TypeScript
    -   [Expect-webdriverio](https://github.com/webdriverio/expect-webdriverio)
    -   [Visual regression tests](https://github.com/wswebcreation/wdio-image-comparison-service)
    -   Page Object Pattern
    -   [Commit lint](https://github.com/conventional-changelog/commitlint) மற்றும் [Commitizen](https://github.com/commitizen/cz-cli#making-your-repo-commitizen-friendly)
    -   ESlint
    -   Prettier
    -   Husky
    -   Github Actions எடுத்துக்காட்டு
    -   Allure report (தோல்வியின் போது ஸ்கிரீன்ஷாட்கள்)

## [17thSep/WebdriverIO_Master](https://github.com/17thSep/WebdriverIO_Master)

பின்வருவனவற்றுக்கான **WebdriverIO v7** சோதனைகளை இயக்குவதற்கான மாதிரித் திட்டம்:

[WDIO 7 scripts with TypeScript in Cucumber Framework](https://github.com/17thSep/WebdriverIO_Master/tree/master/TypeScript/Cucumber)
[WDIO 7 scripts with TypeScript in Mocha Framework](https://github.com/17thSep/WebdriverIO_Master/tree/master/TypeScript/Mocha)
[Run WDIO 7 script in Docker](https://github.com/17thSep/WebdriverIO_Master/tree/master/TypeScript/Docker)
[Network logs](https://github.com/17thSep/MonitorNetworkLogs/)

இவற்றுக்கான மாதிரி திட்டம்:

- நெட்வொர்க் லாக்களை கேப்சர் செய்தல்
- அனைத்து GET/POST கால்களையும் அல்லது குறிப்பிட்ட REST API ஐ கேப்சர் செய்தல்
- கோரிக்கை அளவுருக்களை உறுதிப்படுத்தல்
- பதில் அளவுருக்களை உறுதிப்படுத்தல்
- அனைத்து பதில்களையும் தனி கோப்பில் சேமித்தல்

## [Arjun-Ar91/Wdio7-appium-cucumber](https://github.com/Arjun-Ar91/Wdio7-appium-cucumber.git)

பக்க பொருள் முறை கொண்ட cucumber v7 மற்றும் wdio v7 ஐப் பயன்படுத்தி நேட்டிவ் மற்றும் மொபைல் உலாவிக்கான appium சோதனைகளை இயக்க மாதிரித் திட்டம்.

- கட்டமைப்புகள்
    - WebdriverIO v7
    - Cucumber v7
    - Appium

- அம்சங்கள்
    - Native Android மற்றும் iOS ஆப்ஸ்
    - Android Chrome உலாவி
    - iOS Safari உலாவி
    - Page Object Model
    - குக்கும்பரில் மாதிரி சோதனை சூழ்நிலைகளைக் கொண்டுள்ளது
    - பல குக்கும்பர் html அறிக்கைகளுடன் ஒருங்கிணைக்கப்பட்டுள்ளது

## [praveendvd/webdriverIODockerBoilerplate/](https://github.com/praveendvd/webdriverIODockerBoilerplate)

இது சமீபத்திய WebdriverIO மற்றும் Cucumber கட்டமைப்பைப் பயன்படுத்தி வலை பயன்பாடுகளிலிருந்து webdriverio சோதனையை எவ்வாறு இயக்கலாம் என்பதைக் காட்ட உதவும் ஒரு டெம்ப்ளேட் திட்டம். WebdriverIO சோதனைகளை Docker இல் எவ்வாறு இயக்குவது என்பதைப் புரிந்துகொள்ள நீங்கள் பயன்படுத்தக்கூடிய அடிப்படை படிமம் ஆக இந்தத் திட்டம் செயல்பட உத்தேசிக்கிறது

இந்தத் திட்டத்தில் அடங்கியவை:

- DockerFile
- cucumber Project

மேலும் படிக்க: [Medium Blog](https://praveendavidmathew.medium.com/running-webdriverio-in-wsl2-windows-91d3a0dc7746)

## [praveendvd/WebdriverIO_electronAppAutomation_boilerplate/](https://github.com/praveendvd/WebdriverIO_electronAppAutomation_boilerplate)

WebdriverIO ஐப் பயன்படுத்தி electronJS சோதனைகளை எவ்வாறு இயக்கலாம் என்பதைக் காட்ட உதவும் டெம்ப்ளேட் திட்டம். WebdriverIO electronJS சோதனைகளை எவ்வாறு இயக்குவது என்பதைப் புரிந்துகொள்ள நீங்கள் பயன்படுத்தக்கூடிய அடிப்படை படிமம் ஆக இந்தத் திட்டம் செயல்பட உத்தேசிக்கிறது.

இந்தத் திட்டத்தில் அடங்கியவை:

- Sample electronjs app
- Sample cucumber test scripts

மேலும் படிக்க: [Medium Blog](https://praveendavidmathew.medium.com/first-step-into-automation-of-electronjs-applications-ef89b7423ddd)

## [praveendvd/webdriverIO_winappdriver_boilerplate/](https://github.com/praveendvd/webdriverIO_winappdriver_boilerplate)

இது winappdriver மற்றும் WebdriverIO ஐப் பயன்படுத்தி விண்டோஸ் பயன்பாட்டை எவ்வாறு தானியக்கமாக்கலாம் என்பதைக் காட்ட உதவும் டெம்ப்ளேட் திட்டம். windappdriver மற்றும் WebdriverIO சோதனைகளை எவ்வாறு இயக்குவது என்பதைப் புரிந்துகொள்ள நீங்கள் பயன்படுத்தக்கூடிய அடிப்படை படிமம் ஆக இந்தத் திட்டம் செயல்பட உத்தேசிக்கிறது.

மேலும் படிக்க: [Medium Blog](https://praveendavidmathew.medium.com/winappdriver-first-step-into-windows-app-test-automation-using-webdriverio-and-winappdriver-46320d89570b)

## [praveendvd/appium-chromedriver-multiremote-wdio-boilerplate/](https://github.com/praveendvd/appium-chromedriver-multiremote-wdio-boilerplate)


இது சமீபத்திய WebdriverIO, மற்றும் Jasmine கட்டமைப்புடன் webdriverio multiremote திறனை எவ்வாறு இயக்குவது என்பதைக் காட்ட உதவும் டெம்ப்ளேட் திட்டம். WebdriverIO சோதனைகளை Docker இல் எவ்வாறு இயக்குவது என்பதைப் புரிந்துகொள்ள நீங்கள் பயன்படுத்தக்கூடிய அடிப்படை படிமம் ஆக இந்தத் திட்டம் செயல்பட உத்தேசிக்கிறது

இந்தத் திட்டம் பயன்படுத்துவது:
     - chromedriver
     - jasmine
     - appium

## [webdriverio-roku-appium-boilerplate](https://github.com/AntonKostenko/webdriverIO-roku-appium)

பக்க பொருள் முறையுடன் மோகா பயன்படுத்தி உண்மையான Roku சாதனங்களில் appium சோதனைகளை இயக்குவதற்கான டெம்ப்ளேட் திட்டம்.

- கட்டமைப்புகள்
    - WebdriverIO Async v7
    - Appium 2.0
    - Mocha v7
    - Allure Reporting

- அம்சங்கள்
    - Page Object Model
    - Typescript
    - தோல்வியின் போது ஸ்கிரீன்ஷாட்
    - மாதிரி Roku சேனலைப் பயன்படுத்தி சோதனை எடுத்துக்காட்டுகள்

## [krishnapollu/wdio-cucumber-poc](https://github.com/krishnapollu/wdio-cucumber-poc)

E2E Multiremote Cucumber சோதனைகள் மற்றும் Data driven Mocha சோதனைகளுக்கான PoC திட்டம்

- கட்டமைப்பு:
    - Cucumber (v8)
    - WebdriverIO (v8)
    - Mocha (v8)

- அம்சங்கள்:
    - Cucumber அடிப்படையிலான E2E சோதனைகள்
    - Mocha அடிப்படையிலான டேட்டா டிரிவன் சோதனைகள்
    - உள்ளூர் மற்றும் கிளவுட் பிளாட்ஃபார்ம்களில் வலை மட்டும் சோதனைகள்
    - மொபைல் மட்டும் சோதனைகள் - உள்ளூர் மற்றும் தொலைநிலை கிளவுட் எமுலேட்டர்கள் (அல்லது சாதனங்கள்)
    - வலை + மொபைல் சோதனைகள் - Multiremote - உள்ளூர் மற்றும் கிளவுட் பிளாட்ஃபார்ம்கள்
    - Allure உட்பட பல அறிக்கைகள் ஒருங்கிணைக்கப்பட்டுள்ளன
    - சோதனை தரவு (JSON / XLSX) சோதனை செயல்பாட்டுக்குப் பிறகு கோப்பில் (ஓடும் போது உருவாக்கப்பட்ட) தரவை எழுதுவதற்காக உலகளாவிய ரீதியில் கையாளப்படுகிறது
    - சோதனையை இயக்கவும் allure அறிக்கையை பதிவேற்றவும் Github workflow

## [Rondleysg/wdio-multiremote-appium-chromedriver-boilerplate](https://github.com/Rondleysg/wdio-multiremote-appium-chromedriver-boilerplate)

இது சமீபத்திய WebdriverIO உடன் appium மற்றும் chromedriver சேவையைப் பயன்படுத்தி webdriverio multi-remote ஐ எவ்வாறு இயக்குவது என்பதைக் காட்ட உதவும் மாதிரித் திட்டம்.

- கட்டமைப்புகள்
  - WebdriverIO (v9)
  - Appium (v2)
  - Mocha

- அம்சங்கள்
  - [Page Object](pageobjects) Model
  - Typescript
  - வலை + மொபைல் சோதனைகள் - Multiremote
  - Native Android மற்றும் iOS ஆப்ஸ்
  - Appium
  - Chromedriver
  - ESLint
  - http://the-internet.herokuapp.com மற்றும் [WebdriverIO native demo app](https://github.com/webdriverio/native-demo-app) இல் லாகின் செய்வதற்கான சோதனை எடுத்துக்காட்டுகள்
