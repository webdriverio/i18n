---
id: boilerplates
title: பாய்லர்பிளேட் திட்டங்கள்
description: "உங்கள் சொந்த டெஸ்ட் தொகுப்பைத் தொடங்க, Mocha, Jasmine, Cucumber, Electron மற்றும் மொபைல் அமைப்புகளுடன் கூடிய WebdriverIO-க்கான சமூக பாய்லர்பிளேட் திட்டங்களை உலாவுங்கள்."
---

காலப்போக்கில், எங்கள் சமூகம் பல திட்டங்களை உருவாக்கியுள்ளது. உங்கள் சொந்த டெஸ்ட் தொகுப்பை அமைக்க அவற்றை முன்மாதிரியாகப் பயன்படுத்தலாம்.

# v9 பாய்லர்பிளேட் திட்டங்கள்

## [webdriverio/cucumber-boilerplate](https://github.com/webdriverio/cucumber-boilerplate)

Cucumber டெஸ்ட் தொகுப்புகளுக்கான எங்களின் சொந்த பாய்லர்பிளேட் இது. உங்களுக்காக 150-க்கும் மேற்பட்ட முன்வரையறுக்கப்பட்ட step definitions-ஐ உருவாக்கியுள்ளோம். எனவே உங்கள் திட்டத்தில் உடனடியாக feature கோப்புகளை எழுதத் தொடங்கலாம்.

- Framework:
    - Cucumber
    - WebdriverIO
- அம்சங்கள்:
    - உங்களுக்குத் தேவையான கிட்டத்தட்ட அனைத்தையும் உள்ளடக்கிய 150-க்கும் மேற்பட்ட முன்வரையறுக்கப்பட்ட steps
    - WebdriverIO-வின் multi-remote செயல்பாட்டை ஒருங்கிணைக்கிறது
    - சொந்த டெமோ ஆப்

## [webdriverio/jasmine-boilerplate](https://github.com/webdriverio/jasmine-boilerplate)
Babel அம்சங்கள் மற்றும் page objects pattern-ஐப் பயன்படுத்தி Jasmine உடன் WebdriverIO டெஸ்ட்களை இயக்குவதற்கான பாய்லர்பிளேட் திட்டம்.

- Frameworks
    - WebdriverIO
    - Jasmine
- அம்சங்கள்
    - Page Object Pattern
    - Sauce Labs ஒருங்கிணைப்பு

## [webdriverio/electron-boilerplate](https://github.com/webdriverio/electron-boilerplate)
குறைந்தபட்ச Electron பயன்பாட்டில் WebdriverIO டெஸ்ட்களை இயக்குவதற்கான பாய்லர்பிளேட் திட்டம்.

- Frameworks
    - WebdriverIO
    - Mocha
- அம்சங்கள்
    - Electron API mocking

## [syamphaneendra/webdriverio9-boilerplate](https://github.com/syamphaneendra/webdriverio9-boilerplate)

இந்த பாய்லர்பிளேட் திட்டம் Page Object Model pattern-ஐப் பின்பற்றி, Android மற்றும் iOS தளங்களுக்கான Cucumber, TypeScript மற்றும் Appium உடன் கூடிய WebdriverIO 9 மொபைல் டெஸ்ட்களைக் கொண்டுள்ளது. விரிவான logging, reporting, மொபைல் gestures, app-to-web navigation மற்றும் CI/CD ஒருங்கிணைப்பு ஆகியவற்றைக் கொண்டுள்ளது.

- Frameworks:
    - WebdriverIO v9
    - Cucumber v9
    - Appium v2.5
    - TypeScript v5

- அம்சங்கள்:
    - பல-தள ஆதரவு
      - Android (UiAutomator2)
      - iOS (XCUITest)
    - மொபைல் Gestures
      - Scroll
      - Swipe
      - Long press
      - Keyboard-ஐ மறைத்தல்
    - App-to-Web Navigation
      - Context switching
      - WebView ஆதரவு
      - Browser automation (Chrome/Safari)
    - புதிய App நிலை
      - scenarios-களுக்கு இடையே தானியங்கி app reset
      - கட்டமைக்கக்கூடிய reset நடத்தை (noReset, fullReset)
    - சாதன கட்டமைப்பு
      - மையப்படுத்தப்பட்ட சாதன மேலாண்மை
      - எளிதான தள மாற்றம்
    - JavaScript / TypeScript-க்கான Directory அமைப்பின் எடுத்துக்காட்டு. கீழே உள்ளது JS பதிப்புக்கானது, TS பதிப்பும் அதே அமைப்பைக் கொண்டுள்ளது.

## [amiya-pattnaik/wdio-testgen-from-gherkin-js](https://github.com/amiya-pattnaik/wdio-testgen-from-gherkin-js)
## [amiya-pattnaik/wdio-testgen-from-gherkin-ts](https://github.com/amiya-pattnaik/wdio-testgen-from-gherkin-ts)
Gherkin .feature கோப்புகளிலிருந்து WebdriverIO Page Object classes மற்றும் Mocha test specs-ஐத் தானாக உருவாக்குகிறது — இது கைமுறை முயற்சியைக் குறைத்து, சீரான தன்மையை மேம்படுத்தி, QA automation-ஐ விரைவுபடுத்துகிறது. இந்தத் திட்டம் webdriver.io உடன் இணக்கமான code-ஐ உருவாக்குவது மட்டுமல்லாமல், webdriver.io-வின் அனைத்து செயல்பாடுகளையும் மேம்படுத்துகிறது. நாங்கள் இரண்டு வகைகளை உருவாக்கியுள்ளோம்: ஒன்று JavaScript பயனர்களுக்கு, மற்றொன்று TypeScript பயனர்களுக்கு. ஆனால் இரண்டு திட்டங்களும் ஒரே விதத்தில் செயல்படுகின்றன.

***இது எப்படி வேலை செய்கிறது?***
- இந்தச் செயல்முறை இரண்டு-படி automation-ஐப் பின்பற்றுகிறது:
- படி 1: Gherkin-இலிருந்து stepMap (stepMap.json கோப்புகளை உருவாக்குதல்)
  - stepMap.json கோப்புகளை உருவாக்குதல்:
    - Gherkin syntax-இல் எழுதப்பட்ட .feature கோப்புகளை parse செய்கிறது.
    - scenarios மற்றும் steps-ஐப் பிரித்தெடுக்கிறது.
    - பின்வருவனவற்றைக் கொண்ட கட்டமைக்கப்பட்ட .stepMap.json கோப்பை உருவாக்குகிறது:
      - செய்ய வேண்டிய action (எ.கா., click, setText, assertVisible)
      - தர்க்கரீதியான mapping-க்கான selectorName
      - DOM element-க்கான selector
      - மதிப்புகள் அல்லது assertion-க்கான note
- படி 2: stepMap-இலிருந்து Code (WebdriverIO Code-ஐ உருவாக்குதல்).
  பின்வருவனவற்றை உருவாக்க stepMap.json-ஐப் பயன்படுத்துகிறது:
  - பகிரப்பட்ட methods மற்றும் browser.url() அமைப்புடன் கூடிய அடிப்படை page.js class-ஐ உருவாக்குதல்.
  - test/pageobjects/ உள்ளே ஒவ்வொரு feature-க்கும் WebdriverIO-இணக்கமான Page Object Model (POM) classes-ஐ உருவாக்குதல்.
  - Mocha-அடிப்படையிலான test specs-ஐ உருவாக்குதல்.
- JavaScript / TypeScript-க்கான Directory அமைப்பின் எடுத்துக்காட்டு. கீழே உள்ளது JS பதிப்புக்கானது, TS பதிப்பும் அதே அமைப்பைக் கொண்டுள்ளது.
```
project-root/
├── features/                   # Gherkin .feature கோப்புகள் (பயனர் உள்ளீடு / மூலக் கோப்பு)
├── stepMaps/                   # தானாக உருவாக்கப்பட்ட .stepMap.json கோப்புகள்
├── test/
│   ├── pageobjects/            # தானாக உருவாக்கப்பட்ட WebdriverIO tests Page Object Model classes
│   └── specs/                  # தானாக உருவாக்கப்பட்ட Mocha test specs
├── src/
│   ├── cli.js                  # முதன்மை CLI தர்க்கம்
│   ├── generateStepsMap.js     # Feature-இலிருந்து stepMap generator
│   ├── generateTestsFromMap.js # stepMap-இலிருந்து page/spec generator
│   ├── utils.js                # உதவி methods
│   └── config.js               # Paths, fallback selectors, aliases
│   └── __tests__/              # Unit tests (Vitest)
├── testgen.js                  # CLI நுழைவுப் புள்ளி
│── wdio.config.js              # WebdriverIO கட்டமைப்பு
├── package.json                # Scripts மற்றும் dependencies
├── selector-aliases.json       # விருப்பத்தேர்வு: முதன்மை selector-ஐ மேலெழுதும் பயனர்-வரையறுத்த selector
```
---
# v8 பாய்லர்பிளேட் திட்டங்கள்

## [amiya-pattnaik/webdriverIO-with-cucumberBDD](https://github.com/amiya-pattnaik/webdriverIO-with-cucumberBDD)

- Framework: Cucumber (V8x) உடன் WDIO-V8.
- அம்சங்கள்:
    - ES6 /ES7 பாணி class அடிப்படையிலான அணுகுமுறை மற்றும் TypeScript ஆதரவுடன் Page Objects Model பயன்பாடு
    - ஒரே நேரத்தில் ஒன்றுக்கும் மேற்பட்ட selector-களைக் கொண்டு element-ஐ query செய்யும் multi selector விருப்பத்தின் எடுத்துக்காட்டுகள்
    - Chrome மற்றும் Firefox பயன்படுத்தி multi browser மற்றும் headless browser இயக்கத்தின் எடுத்துக்காட்டுகள்
    - BrowserStack, Sauce Labs, TestMu AI (முன்பு LambdaTest) உடன் Cloud testing ஒருங்கிணைப்பு
    - வெளிப்புறத் தரவு மூலங்களிலிருந்து எளிதான test data மேலாண்மைக்காக MS-Excel-இலிருந்து தரவைப் படிக்க/எழுதுவதற்கான எடுத்துக்காட்டுகள்
    - E2E testing-க்கான எடுத்துக்காட்டுகளுடன், எந்த RDBMS-க்கும் (Oracle, MySql, TeraData, Vertica போன்றவை) Database ஆதரவு, எந்த queries-ஐயும் இயக்குதல் / result set-ஐப் பெறுதல் போன்றவை
    - பல reporting (Spec, Xunit/Junit, Allure, JSON) மற்றும் WebServer-இல் Allure மற்றும் Xunit/Junit reporting-ஐ hosting செய்தல்.
    - https://search.yahoo.com/  மற்றும் http://the-internet.herokuapp.com டெமோ ஆப் உடன் எடுத்துக்காட்டுகள்.
    - BrowserStack, Sauce Labs, TestMu AI (முன்பு LambdaTest) மற்றும் Appium-க்கான குறிப்பிட்ட `.config` கோப்பு (மொபைல் சாதனத்தில் playback செய்ய). iOS மற்றும் Android-க்கான local machine-இல் ஒரே கிளிக்கில் Appium அமைப்புக்கு [appium-setup-made-easy-OSX](https://github.com/amiya-pattnaik/appium-setup-made-easy-OSX)-ஐப் பார்க்கவும்.

## [amiya-pattnaik/webdriverIO-with-mochaBDD](https://github.com/amiya-pattnaik/webdriverIO-with-mochaBDD)

- Framework: Mocha (V10x) உடன் WDIO-V8.
- அம்சங்கள்:
    -  ES6 /ES7 பாணி class அடிப்படையிலான அணுகுமுறை மற்றும் TypeScript ஆதரவுடன் Page Objects Model பயன்பாடு
    -  https://search.yahoo.com  மற்றும் http://the-internet.herokuapp.com டெமோ ஆப் உடன் எடுத்துக்காட்டுகள்
    -  Chrome மற்றும் Firefox பயன்படுத்தி multi browser மற்றும் headless browser இயக்கத்தின் எடுத்துக்காட்டுகள்
    -  BrowserStack, Sauce Labs, TestMu AI (முன்பு LambdaTest) உடன் Cloud testing ஒருங்கிணைப்பு
    -  பல reporting (Spec, Xunit/Junit, Allure, JSON) மற்றும் WebServer-இல் Allure மற்றும் Xunit/Junit reporting-ஐ hosting செய்தல்.
    -  வெளிப்புறத் தரவு மூலங்களிலிருந்து எளிதான test data மேலாண்மைக்காக MS-Excel-இலிருந்து தரவைப் படிக்க/எழுதுவதற்கான எடுத்துக்காட்டுகள்
    -  E2E testing-க்கான எடுத்துக்காட்டுகளுடன், எந்த RDBMS-உடனும் (Oracle, MySql, TeraData, Vertica போன்றவை) DB இணைப்பு, எந்த query-ஐயும் இயக்குதல் / result set-ஐப் பெறுதல் போன்றவற்றின் எடுத்துக்காட்டுகள்
    -  BrowserStack, Sauce Labs, TestMu AI (முன்பு LambdaTest) மற்றும் Appium-க்கான குறிப்பிட்ட `.config` கோப்பு (மொபைல் சாதனத்தில் playback செய்ய). iOS மற்றும் Android-க்கான local machine-இல் ஒரே கிளிக்கில் Appium அமைப்புக்கு [appium-setup-made-easy-OSX](https://github.com/amiya-pattnaik/appium-setup-made-easy-OSX)-ஐப் பார்க்கவும்.

## [amiya-pattnaik/webdriverIO-with-jasmineBDD](https://github.com/amiya-pattnaik/webdriverIO-with-jasmineBDD)

- Framework: Jasmine (V4x) உடன் WDIO-V8.
- அம்சங்கள்:
    -  ES6 /ES7 பாணி class அடிப்படையிலான அணுகுமுறை மற்றும் TypeScript ஆதரவுடன் Page Objects Model பயன்பாடு
    -  https://search.yahoo.com  மற்றும் http://the-internet.herokuapp.com டெமோ ஆப் உடன் எடுத்துக்காட்டுகள்
    -  Chrome மற்றும் Firefox பயன்படுத்தி multi browser மற்றும் headless browser இயக்கத்தின் எடுத்துக்காட்டுகள்
    -  BrowserStack, Sauce Labs, TestMu AI (முன்பு LambdaTest) உடன் Cloud testing ஒருங்கிணைப்பு
    -  பல reporting (Spec, Xunit/Junit, Allure, JSON) மற்றும் WebServer-இல் Allure மற்றும் Xunit/Junit reporting-ஐ hosting செய்தல்.
    -  வெளிப்புறத் தரவு மூலங்களிலிருந்து எளிதான test data மேலாண்மைக்காக MS-Excel-இலிருந்து தரவைப் படிக்க/எழுதுவதற்கான எடுத்துக்காட்டுகள்
    -  E2E testing-க்கான எடுத்துக்காட்டுகளுடன், எந்த RDBMS-உடனும் (Oracle, MySql, TeraData, Vertica போன்றவை) DB இணைப்பு, எந்த query-ஐயும் இயக்குதல் / result set-ஐப் பெறுதல் போன்றவற்றின் எடுத்துக்காட்டுகள்
    -  BrowserStack, Sauce Labs, TestMu AI (முன்பு LambdaTest) மற்றும் Appium-க்கான குறிப்பிட்ட `.config` கோப்பு ( மொபைல் சாதனத்தில் playback செய்ய). iOS மற்றும் Android-க்கான local machine-இல் ஒரே கிளிக்கில் Appium அமைப்புக்கு [appium-setup-made-easy-OSX](https://github.com/amiya-pattnaik/appium-setup-made-easy-OSX)-ஐப் பார்க்கவும்.

## [syamphaneendra/webdriverio-web-mobile-boilerplate](https://github.com/syamphaneendra/webdriverio-web-mobile-boilerplate)

இந்த பாய்லர்பிளேட் திட்டம் page objects pattern-ஐப் பின்பற்றி, cucumber மற்றும் typescript உடன் கூடிய WebdriverIO 8 டெஸ்ட்களைக் கொண்டுள்ளது.

- Frameworks:
    - WebdriverIO v8
    - Cucumber v8

- அம்சங்கள்:
    - Typescript v5
    - Page Object Pattern
    - Prettier
    - Multi browser ஆதரவு
      - Chrome
      - Firefox
      - Edge
      - Safari
      - Standalone
    - Crossbrowser parallel இயக்கம்
    - Appium
    - BrowserStack & Sauce Labs உடன் Cloud testing ஒருங்கிணைப்பு
    - Docker service
    - Share data service
    - ஒவ்வொரு service-க்கும் தனித்தனி config கோப்புகள்
    - Testdata மேலாண்மை & பயனர் வகையின்படி படித்தல்
    - Reporting
      - Dot
      - Spec
      - தோல்வி screenshots உடன் கூடிய Multiple cucumber html report
    - Gitlab repository-க்கான Gitlab pipelines
    - Github repository-க்கான Github actions
    - docker hub-ஐ அமைப்பதற்கான Docker compose
    - AXE பயன்படுத்தி Accessibility testing
    - Applitools பயன்படுத்தி Visual testing
    - Log பொறிமுறை


## [klassijs/klassi-js (cucumber-template)](https://github.com/klassijs/klassi-example-test-suite.git)

- Frameworks
    - WebdriverIO (v8)
    - Cucumber (v8)

- அம்சங்கள்
    - cucumber-இல் மாதிரி test scenario-வைக் கொண்டுள்ளது
    - தோல்விகளின் போது உட்பொதிக்கப்பட்ட வீடியோக்களுடன் ஒருங்கிணைக்கப்பட்ட cucumber html reports
    - ஒருங்கிணைக்கப்பட்ட Lambdatest மற்றும் CircleCI services
    - ஒருங்கிணைக்கப்பட்ட Visual, Accessibility மற்றும் API testing
    - ஒருங்கிணைக்கப்பட்ட Email செயல்பாடு
    - test reports சேமிப்பு மற்றும் மீட்டெடுப்புக்கான ஒருங்கிணைக்கப்பட்ட s3 bucket

## [serenity-js/serenity-js-mocha-webdriverio-template/](https://github.com/serenity-js/serenity-js-mocha-webdriverio-template/)

சமீபத்திய WebdriverIO, Mocha மற்றும் Serenity/JS-ஐப் பயன்படுத்தி உங்கள் web பயன்பாடுகளின் acceptance testing-ஐத் தொடங்க உதவும் [Serenity/JS](https://serenity-js.org?pk_campaign=wdio8&pk_source=webdriver.io) template திட்டம்.

- Frameworks
    - WebdriverIO (v8)
    - Mocha (v10)
    - Serenity/JS (v3)
    - Serenity BDD reporting

- அம்சங்கள்
    - [Screenplay Pattern](https://serenity-js.org/handbook/design/screenplay-pattern/?pk_campaign=wdio8&pk_source=webdriver.io)
    - டெஸ்ட் தோல்வியின் போது தானியங்கி screenshots, reports-இல் உட்பொதிக்கப்பட்டவை
    - [GitHub Actions](https://github.com/serenity-js/serenity-js-mocha-webdriverio-template/blob/main/.github/workflows/main.yml) பயன்படுத்தி Continuous Integration (CI) அமைப்பு
    - GitHub Pages-இல் வெளியிடப்பட்ட [டெமோ Serenity BDD reports](https://serenity-js.github.io/serenity-js-mocha-webdriverio-template/)
    - TypeScript
    - ESLint

## [serenity-js/serenity-js-cucumber-webdriverio-template/](https://github.com/serenity-js/serenity-js-cucumber-webdriverio-template/)

சமீபத்திய WebdriverIO, Cucumber மற்றும் Serenity/JS-ஐப் பயன்படுத்தி உங்கள் web பயன்பாடுகளின் acceptance testing-ஐத் தொடங்க உதவும் [Serenity/JS](https://serenity-js.org?pk_campaign=wdio8&pk_source=webdriver.io) template திட்டம்.

- Frameworks
    - WebdriverIO (v8)
    - Cucumber (v9)
    - Serenity/JS (v3)
    - Serenity BDD reporting

- அம்சங்கள்
    - [Screenplay Pattern](https://serenity-js.org/handbook/design/screenplay-pattern/?pk_campaign=wdio8&pk_source=webdriver.io)
    - டெஸ்ட் தோல்வியின் போது தானியங்கி screenshots, reports-இல் உட்பொதிக்கப்பட்டவை
    - [GitHub Actions](https://github.com/serenity-js/serenity-js-cucumber-webdriverio-template/blob/main/.github/workflows/main.yml) பயன்படுத்தி Continuous Integration (CI) அமைப்பு
    - GitHub Pages-இல் வெளியிடப்பட்ட [டெமோ Serenity BDD reports](https://serenity-js.github.io/serenity-js-mocha-webdriverio-template/)
    - TypeScript
    - ESLint

## [Muralijc/wdio-headspin-boilerplate](https://github.com/Muralijc/Wdio-Headspin-boilerplate/)
Cucumber features மற்றும் page objects pattern-ஐப் பயன்படுத்தி Headspin Cloud-இல் (https://www.headspin.io/) WebdriverIO டெஸ்ட்களை இயக்குவதற்கான பாய்லர்பிளேட் திட்டம்.
- Frameworks
    - WebdriverIO (v8)
    - Cucumber (v8)

- அம்சங்கள்
    - [Headspin](https://www.headspin.io/) உடன் Cloud ஒருங்கிணைப்பு
    - Page Object Model-ஐ ஆதரிக்கிறது
    - BDD-யின் Declarative பாணியில் எழுதப்பட்ட மாதிரி Scenarios-ஐக் கொண்டுள்ளது
    - ஒருங்கிணைக்கப்பட்ட cucumber html reports

# v7 பாய்லர்பிளேட் திட்டங்கள்
---

## [webdriverio/appium-boilerplate](https://github.com/webdriverio/appium-boilerplate/)

பின்வருவனவற்றுக்கு WebdriverIO உடன் Appium டெஸ்ட்களை இயக்குவதற்கான பாய்லர்பிளேட் திட்டம்:

- iOS/Android Native Apps
- iOS/Android Hybrid Apps
- Android Chrome மற்றும் iOS Safari browser

இந்த பாய்லர்பிளேட் பின்வருவனவற்றை உள்ளடக்கியது:

- Framework: Mocha
- அம்சங்கள்:
    - இவற்றுக்கான Configs:
        - iOS மற்றும் Android app
        - iOS மற்றும் Android browsers
    - இவற்றுக்கான Helpers:
        - WebView
        - Gestures
        - Native alerts
        - Pickers
     - இவற்றுக்கான டெஸ்ட் எடுத்துக்காட்டுகள்:
        - WebView
        - Login
        - Forms
        - Swipe
        - Browsers

## [serhatbolsu/webdriverio-mocha-uiautomation-boiler](https://github.com/serhatbolsu/webdriverio-mocha-uiautomation-boiler)
PageObject உடன் Mocha, WebdriverIO v6 கொண்ட ATDD WEB டெஸ்ட்கள்

- Frameworks
  - WebdriverIO (v7)
  - Mocha
- அம்சங்கள்
  - [Page Object](pageobjects) Model
  - [Sauce Service](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-sauce-service/README.md) உடன் Sauce Labs ஒருங்கிணைப்பு
  - Allure Report
  - தோல்வியடையும் டெஸ்ட்களுக்கான தானியங்கி screenshots பிடிப்பு
  - CircleCI எடுத்துக்காட்டு
  - ESLint

## [WarleyGabriel/demo-webdriverio-mocha](https://github.com/WarleyGabriel/demo-webdriverio-mocha)

Mocha உடன் E2E டெஸ்ட்களை இயக்குவதற்கான பாய்லர்பிளேட் திட்டம்.

- Frameworks:
    - WebdriverIO (v7)
    - Mocha
- அம்சங்கள்:
    -   TypeScript
    -   [Expect-webdriverio](https://github.com/webdriverio/expect-webdriverio)
    -   [Visual regression டெஸ்ட்கள்](https://github.com/wswebcreation/wdio-image-comparison-service)
    -   Page Object Pattern
    -   [Commit lint](https://github.com/conventional-changelog/commitlint) மற்றும் [Commitizen](https://github.com/commitizen/cz-cli#making-your-repo-commitizen-friendly)
    -   ESlint
    -   Prettier
    -   Husky
    -   Github Actions எடுத்துக்காட்டு
    -   Allure report (தோல்வியின் போது screenshots)

## [17thSep/WebdriverIO_Master](https://github.com/17thSep/WebdriverIO_Master)

பின்வருவனவற்றுக்கு **WebdriverIO v7** டெஸ்ட்களை இயக்குவதற்கான பாய்லர்பிளேட் திட்டம்:

[Cucumber Framework-இல் TypeScript உடன் WDIO 7 scripts](https://github.com/17thSep/WebdriverIO_Master/tree/master/TypeScript/Cucumber)
[Mocha Framework-இல் TypeScript உடன் WDIO 7 scripts](https://github.com/17thSep/WebdriverIO_Master/tree/master/TypeScript/Mocha)
[Docker-இல் WDIO 7 script-ஐ இயக்குதல்](https://github.com/17thSep/WebdriverIO_Master/tree/master/TypeScript/Docker)
[Network logs](https://github.com/17thSep/MonitorNetworkLogs/)

பின்வருவனவற்றுக்கான பாய்லர்பிளேட் திட்டம்:

- Network Logs-ஐப் பிடித்தல்
- அனைத்து GET/POST அழைப்புகளையும் அல்லது ஒரு குறிப்பிட்ட REST API-ஐப் பிடித்தல்
- Request parameters-ஐ assert செய்தல்
- Response parameters-ஐ assert செய்தல்
- அனைத்து response-களையும் ஒரு தனி கோப்பில் சேமித்தல்

## [Arjun-Ar91/Wdio7-appium-cucumber](https://github.com/Arjun-Ar91/Wdio7-appium-cucumber.git)

page object pattern உடன் cucumber v7 மற்றும் wdio v7-ஐப் பயன்படுத்தி native மற்றும் mobile browser-க்கான appium டெஸ்ட்களை இயக்குவதற்கான பாய்லர்பிளேட் திட்டம்.

- Frameworks
    - WebdriverIO v7
    - Cucumber v7
    - Appium

- அம்சங்கள்
    - Native Android மற்றும் iOS apps
    - Android Chrome browser
    - iOS Safari browser
    - Page Object Model
    - cucumber-இல் மாதிரி test scenarios-ஐக் கொண்டுள்ளது
    - multiple cucumber html reports உடன் ஒருங்கிணைக்கப்பட்டது

## [praveendvd/webdriverIODockerBoilerplate/](https://github.com/praveendvd/webdriverIODockerBoilerplate)

சமீபத்திய WebdriverIO மற்றும் Cucumber framework-ஐப் பயன்படுத்தி Web பயன்பாடுகளில் webdriverio டெஸ்ட்டை எப்படி இயக்கலாம் என்பதைக் காட்ட உதவும் template திட்டம் இது. docker-இல் WebdriverIO டெஸ்ட்களை எப்படி இயக்குவது என்பதைப் புரிந்துகொள்ள நீங்கள் பயன்படுத்தக்கூடிய அடிப்படை image-ஆக இந்தத் திட்டம் செயல்பட நோக்கமாகக் கொண்டுள்ளது

இந்தத் திட்டம் பின்வருவனவற்றை உள்ளடக்கியது:

- DockerFile
- cucumber திட்டம்

மேலும் படிக்க: [Medium வலைப்பதிவு](https://praveendavidmathew.medium.com/running-webdriverio-in-wsl2-windows-91d3a0dc7746)

## [praveendvd/WebdriverIO_electronAppAutomation_boilerplate/](https://github.com/praveendvd/WebdriverIO_electronAppAutomation_boilerplate)

WebdriverIO-ஐப் பயன்படுத்தி electronJS டெஸ்ட்களை எப்படி இயக்கலாம் என்பதைக் காட்ட உதவும் template திட்டம் இது. WebdriverIO electronJS டெஸ்ட்களை எப்படி இயக்குவது என்பதைப் புரிந்துகொள்ள நீங்கள் பயன்படுத்தக்கூடிய அடிப்படை image-ஆக இந்தத் திட்டம் செயல்பட நோக்கமாகக் கொண்டுள்ளது.

இந்தத் திட்டம் பின்வருவனவற்றை உள்ளடக்கியது:

- மாதிரி electronjs app
- மாதிரி cucumber test scripts

மேலும் படிக்க: [Medium வலைப்பதிவு](https://praveendavidmathew.medium.com/first-step-into-automation-of-electronjs-applications-ef89b7423ddd)

## [praveendvd/webdriverIO_winappdriver_boilerplate/](https://github.com/praveendvd/webdriverIO_winappdriver_boilerplate)

winappdriver மற்றும்  WebdriverIO-ஐப் பயன்படுத்தி windows பயன்பாட்டை எப்படி automate செய்யலாம் என்பதைக் காட்ட உதவும் template திட்டம் இது. windappdriver மற்றும் WebdriverIO டெஸ்ட்களை எப்படி இயக்குவது என்பதைப் புரிந்துகொள்ள நீங்கள் பயன்படுத்தக்கூடிய அடிப்படை image-ஆக இந்தத் திட்டம் செயல்பட நோக்கமாகக் கொண்டுள்ளது.

மேலும் படிக்க: [Medium வலைப்பதிவு](https://praveendavidmathew.medium.com/winappdriver-first-step-into-windows-app-test-automation-using-webdriverio-and-winappdriver-46320d89570b)

## [praveendvd/appium-chromedriver-multiremote-wdio-boilerplate/](https://github.com/praveendvd/appium-chromedriver-multiremote-wdio-boilerplate)


சமீபத்திய WebdriverIO மற்றும் Jasmine framework உடன் webdriverio multi-remote திறனை எப்படி இயக்கலாம் என்பதைக் காட்ட உதவும் template திட்டம் இது. docker-இல் WebdriverIO டெஸ்ட்களை எப்படி இயக்குவது என்பதைப் புரிந்துகொள்ள நீங்கள் பயன்படுத்தக்கூடிய அடிப்படை image-ஆக இந்தத் திட்டம் செயல்பட நோக்கமாகக் கொண்டுள்ளது

இந்தத் திட்டம் பின்வருவனவற்றைப் பயன்படுத்துகிறது:
     - chromedriver
     - jasmine
     - appium

## [webdriverio-roku-appium-boilerplate](https://github.com/AntonKostenko/webdriverIO-roku-appium)

page object pattern உடன் mocha-வைப் பயன்படுத்தி உண்மையான Roku சாதனங்களில் appium டெஸ்ட்களை இயக்குவதற்கான template திட்டம்.

- Frameworks
    - WebdriverIO Async v7
    - Appium 3.0
    - Mocha v7
    - Allure Reporting

- அம்சங்கள்
    - Page Object Model
    - Typescript
    - தோல்வியின் போது Screenshot
    - மாதிரி Roku channel-ஐப் பயன்படுத்தும் டெஸ்ட் எடுத்துக்காட்டுகள்

## [krishnapollu/wdio-cucumber-poc](https://github.com/krishnapollu/wdio-cucumber-poc)

E2E multi-remote Cucumber டெஸ்ட்கள் மற்றும் Data driven Mocha டெஸ்ட்களுக்கான PoC திட்டம்

- Framework:
    - Cucumber (v8)
    - WebdriverIO (v8)
    - Mocha (v8)

- அம்சங்கள்:
    - Cucumber அடிப்படையிலான E2E டெஸ்ட்கள்
    - Mocha அடிப்படையிலான Data Driven டெஸ்ட்கள்
    - Web மட்டும் டெஸ்ட்கள் - Local மற்றும் cloud தளங்களில்
    - Mobile மட்டும் டெஸ்ட்கள் - local மற்றும் remote cloud emulators (அல்லது சாதனங்கள்)
    - Web + Mobile டெஸ்ட்கள் - multi-remote - local மற்றும் cloud தளங்களில்
    - Allure உட்பட ஒருங்கிணைக்கப்பட்ட பல Reports
    - டெஸ்ட் இயக்கத்திற்குப் பிறகு (உடனுக்குடன் உருவாக்கப்பட்ட) தரவை ஒரு கோப்பில் எழுதும் வகையில் Test Data ( JSON / XLSX ) உலகளாவிய ரீதியில் கையாளப்படுகிறது
    - டெஸ்ட்டை இயக்கி allure report-ஐ upload செய்வதற்கான Github workflow

## [Rondleysg/wdio-multiremote-appium-chromedriver-boilerplate](https://github.com/Rondleysg/wdio-multiremote-appium-chromedriver-boilerplate)

சமீபத்திய WebdriverIO உடன் appium மற்றும் chromedriver service-ஐப் பயன்படுத்தி webdriverio multi-remote-ஐ எப்படி இயக்குவது என்பதைக் காட்ட உதவும் பாய்லர்பிளேட் திட்டம் இது.

- Frameworks
  - WebdriverIO (v9)
  - Appium (v2)
  - Mocha

- அம்சங்கள்
  - [Page Object](pageobjects) Model
  - Typescript
  - Web + Mobile டெஸ்ட்கள் - multi-remote
  - Native Android மற்றும் iOS apps
  - Appium
  - Chromedriver
  - ESLint
  - http://the-internet.herokuapp.com மற்றும் [WebdriverIO native demo app](https://github.com/webdriverio/native-demo-app)-இல் Login-க்கான டெஸ்ட் எடுத்துக்காட்டுகள்