---
id: boilerplates
title: बॉयलरप्लेट प्रोजेक्ट्स
---

समय के साथ, हमारे समुदाय ने कई प्रोजेक्ट्स विकसित किए हैं जिन्हें आप अपने खुद के टेस्ट सूट को सेट करने के लिए प्रेरणा के रूप में उपयोग कर सकते हैं।

# v9 बॉयलरप्लेट प्रोजेक्ट्स

## [webdriverio/cucumber-boilerplate](https://github.com/webdriverio/cucumber-boilerplate)

हमारा अपना Cucumber टेस्ट सूट के लिए बॉयलरप्लेट। हमने आपके लिए 150 से अधिक पूर्वनिर्धारित स्टेप परिभाषाएँ बनाई हैं, ताकि आप अपने प्रोजेक्ट में तुरंत फीचर फाइलें लिखना शुरू कर सकें।

- फ्रेमवर्क:
    - Cucumber
    - WebdriverIO
- विशेषताएँ:
    - 150 से अधिक पूर्वनिर्धारित स्टेप्स जो लगभग हर चीज को कवर करते हैं जिनकी आपको आवश्यकता है
    - WebdriverIO की मल्टीरिमोट फंक्शनैलिटी को एकीकृत करता है
    - खुद का डेमो ऐप

## [webdriverio/jasmine-boilerplate](https://github.com/webdriverio/jasmine-boilerplate)
बेबल फीचर्स और पेज ऑब्जेक्ट्स पैटर्न का उपयोग करके जैस्मीन के साथ WebdriverIO टेस्ट चलाने के लिए बॉयलरप्लेट प्रोजेक्ट।

- फ्रेमवर्क्स
    - WebdriverIO
    - Jasmine
- विशेषताएँ
    - पेज ऑब्जेक्ट पैटर्न
    - सॉस लैब्स इंटीग्रेशन

## [webdriverio/electron-boilerplate](https://github.com/webdriverio/electron-boilerplate)
एक न्यूनतम इलेक्ट्रॉन एप्लिकेशन पर WebdriverIO टेस्ट चलाने के लिए बॉयलरप्लेट प्रोजेक्ट।

- फ्रेमवर्क्स
    - WebdriverIO
    - Mocha
- विशेषताएँ
    - इलेक्ट्रॉन API मॉकिंग

## [amiya-pattnaik/wdio-testgen-from-gherkin-js](https://github.com/amiya-pattnaik/wdio-testgen-from-gherkin-js)
## [amiya-pattnaik/wdio-testgen-from-gherkin-ts](https://github.com/amiya-pattnaik/wdio-testgen-from-gherkin-ts)
स्वचालित रूप से Gherkin .feature फाइलों से WebdriverIO पेज ऑब्जेक्ट क्लासेस और Mocha टेस्ट स्पेक्स जनरेट करें — मैनुअल प्रयास को कम करके, निरंतरता में सुधार करके, और QA ऑटोमेशन को तेज़ करके। यह प्रोजेक्ट न केवल webdriver.io के साथ संगत कोड उत्पन्न करता है, बल्कि webdriver.io की सभी कार्यक्षमताओं को भी बढ़ाता है। हमने दो प्रकार बनाए हैं, एक JavaScript उपयोगकर्ताओं के लिए और दूसरा TypeScript उपयोगकर्ताओं के लिए। लेकिन दोनों प्रोजेक्ट एक ही तरह से काम करते हैं।

***यह कैसे काम करता है?***
- यह प्रक्रिया दो-चरण ऑटोमेशन का पालन करती है:
- स्टेप 1: Gherkin से stepMap (stepMap.json फाइलें जनरेट करें)
  - stepMap.json फाइलें जनरेट करें:
    - Gherkin सिंटैक्स में लिखी गई .feature फाइलों को पार्स करता है।
    - सिनेरियो और स्टेप्स निकालता है।
    - एक संरचित .stepMap.json फाइल उत्पन्न करता है जिसमें शामिल हैं:
      - करने के लिए एक्शन (जैसे, click, setText, assertVisible)
      - तार्किक मैपिंग के लिए selectorName
      - DOM एलिमेंट के लिए selector
      - वैल्यू या एसर्शन के लिए नोट
- स्टेप 2: stepMap से कोड (WebdriverIO कोड जनरेट करें)।
  stepMap.json का उपयोग करके जनरेट करता है:
  - शेयर्ड मेथड्स और browser.url() सेटअप के साथ बेस page.js क्लास जनरेट करता है।
  - test/pageobjects/ के अंदर प्रति फीचर WebdriverIO-संगत पेज ऑब्जेक्ट मॉडल (POM) क्लासेस जनरेट करता है।
  - Mocha-आधारित टेस्ट स्पेक्स जनरेट करता है।
- JavaScript / TypeScript के लिए डायरेक्टरी स्ट्रक्चर का उदाहरण। नीचे JS वर्जन के लिए है, TS वर्जन में भी समान स्ट्रक्चर है।
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
# v8 बॉयलरप्लेट प्रोजेक्ट्स

## [amiya-pattnaik/webdriverIO-with-cucumberBDD](https://github.com/amiya-pattnaik/webdriverIO-with-cucumberBDD)

- फ्रेमवर्क: WDIO-V8 with Cucumber (V8x).
- विशेषताएँ:
    - पेज ऑब्जेक्ट्स मॉडल ES6/ES7 स्टाइल क्लास बेस्ड अप्रोच और TypeScript सपोर्ट के साथ
    - एक ही समय में एक से अधिक सेलेक्टर के साथ एलिमेंट को क्वेरी करने के लिए मल्टी सेलेक्टर विकल्प के उदाहरण
    - क्रोम और फायरफॉक्स का उपयोग करके मल्टी ब्राउज़र और हेडलेस ब्राउज़र एक्जीक्यूशन के उदाहरण
    - BrowserStack, Sauce Labs, LambdaTest के साथ क्लाउड टेस्टिंग इंटीग्रेशन
    - बाहरी डेटा स्रोतों से आसान टेस्ट डेटा प्रबंधन के लिए MS-Excel से डेटा पढ़ने/लिखने के उदाहरण
    - किसी भी RDBMS (Oracle, MySql, TeraData, Vertica आदि) के लिए डेटाबेस समर्थन, किसी भी क्वेरी का निष्पादन / परिणाम सेट प्राप्त करना आदि। E2E परीक्षण के लिए उदाहरणों के साथ
    - मल्टीपल रिपोर्टिंग (Spec, Xunit/Junit, Allure, JSON) और वेबसर्वर पर Allure और Xunit/Junit रिपोर्टिंग होस्टिंग।
    - डेमो ऐप के साथ उदाहरण https://search.yahoo.com/ और http://the-internet.herokuapp.com.
    - BrowserStack, Sauce Labs, LambdaTest और Appium विशिष्ट `.config` फाइल (मोबाइल डिवाइस पर प्लेबैक के लिए)। iOS और Android के लिए स्थानीय मशीन पर वन क्लिक Appium सेटअप के लिए [appium-setup-made-easy-OSX](https://github.com/amiya-pattnaik/appium-setup-made-easy-OSX) देखें।

## [amiya-pattnaik/webdriverIO-with-mochaBDD](https://github.com/amiya-pattnaik/webdriverIO-with-mochaBDD)

- फ्रेमवर्क: WDIO-V8 with Mocha (V10x).
- विशेषताएँ:
    -  पेज ऑब्जेक्ट्स मॉडल ES6/ES7 स्टाइल क्लास बेस्ड अप्रोच और TypeScript सपोर्ट के साथ
    -  डेमो ऐप के साथ उदाहरण https://search.yahoo.com और http://the-internet.herokuapp.com
    -  क्रोम और फायरफॉक्स का उपयोग करके मल्टी ब्राउज़र और हेडलेस ब्राउज़र एक्जीक्यूशन के उदाहरण
    -  BrowserStack, Sauce Labs, LambdaTest के साथ क्लाउड टेस्टिंग इंटीग्रेशन
    -  मल्टीपल रिपोर्टिंग (Spec, Xunit/Junit, Allure, JSON) और वेबसर्वर पर Allure और Xunit/Junit रिपोर्टिंग होस्टिंग।
    -  बाहरी डेटा स्रोतों से आसान टेस्ट डेटा प्रबंधन के लिए MS-Excel से डेटा पढ़ने/लिखने के उदाहरण
    -  किसी भी RDBMS (Oracle, MySql, TeraData, Vertica आदि) से DB कनेक्ट के उदाहरण, किसी भी क्वेरी का निष्पादन / परिणाम सेट प्राप्त करना आदि। E2E परीक्षण के लिए उदाहरणों के साथ
    -  BrowserStack, Sauce Labs, LambdaTest और Appium विशिष्ट `.config` फाइल (मोबाइल डिवाइस पर प्लेबैक के लिए)। iOS और Android के लिए स्थानीय मशीन पर वन क्लिक Appium सेटअप के लिए [appium-setup-made-easy-OSX](https://github.com/amiya-pattnaik/appium-setup-made-easy-OSX) देखें।

## [amiya-pattnaik/webdriverIO-with-jasmineBDD](https://github.com/amiya-pattnaik/webdriverIO-with-jasmineBDD)

- फ्रेमवर्क: WDIO-V8 with Jasmine (V4x).
- विशेषताएँ:
    -  पेज ऑब्जेक्ट्स मॉडल ES6/ES7 स्टाइल क्लास बेस्ड अप्रोच और TypeScript सपोर्ट के साथ
    -  डेमो ऐप के साथ उदाहरण https://search.yahoo.com और http://the-internet.herokuapp.com
    -  क्रोम और फायरफॉक्स का उपयोग करके मल्टी ब्राउज़र और हेडलेस ब्राउज़र एक्जीक्यूशन के उदाहरण
    -  BrowserStack, Sauce Labs, LambdaTest के साथ क्लाउड टेस्टिंग इंटीग्रेशन
    -  मल्टीपल रिपोर्टिंग (Spec, Xunit/Junit, Allure, JSON) और वेबसर्वर पर Allure और Xunit/Junit रिपोर्टिंग होस्टिंग।
    -  बाहरी डेटा स्रोतों से आसान टेस्ट डेटा प्रबंधन के लिए MS-Excel से डेटा पढ़ने/लिखने के उदाहरण
    -  किसी भी RDBMS (Oracle, MySql, TeraData, Vertica आदि) से DB कनेक्ट के उदाहरण, किसी भी क्वेरी का निष्पादन / परिणाम सेट प्राप्त करना आदि। E2E परीक्षण के लिए उदाहरणों के साथ
    -  BrowserStack, Sauce Labs, LambdaTest और Appium विशिष्ट `.config` फाइल (मोबाइल डिवाइस पर प्लेबैक के लिए)। iOS और Android के लिए स्थानीय मशीन पर वन क्लिक Appium सेटअप के लिए [appium-setup-made-easy-OSX](https://github.com/amiya-pattnaik/appium-setup-made-easy-OSX) देखें।

## [syamphaneendra/webdriverio-web-mobile-boilerplate](https://github.com/syamphaneendra/webdriverio-web-mobile-boilerplate)

इस बॉयलरप्लेट प्रोजेक्ट में पेज ऑब्जेक्ट्स पैटर्न के अनुसार, WebdriverIO 8 टेस्ट्स cucumber और typescript के साथ हैं।

- फ्रेमवर्क्स:
    - WebdriverIO v8
    - Cucumber v8

- विशेषताएँ:
    - Typescript v5
    - पेज ऑब्जेक्ट पैटर्न
    - Prettier
    - मल्टी ब्राउज़र सपोर्ट
      - Chrome
      - Firefox
      - Edge
      - Safari
      - Standalone
    - क्रॉसब्राउज़र पैरेलल एक्जीक्यूशन
    - Appium
    - BrowserStack और Sauce Labs के साथ क्लाउड टेस्टिंग इंटीग्रेशन
    - Docker सर्विस
    - शेयर डेटा सर्विस
    - प्रत्येक सेवा के लिए अलग कॉन्फिग फाइलें
    - टेस्टडाटा मैनेजमेंट और यूजर टाइप द्वारा पढ़ना
    - रिपोर्टिंग
      - Dot
      - Spec
      - फेलियर स्क्रीनशॉट्स के साथ मल्टीपल cucumber html रिपोर्ट
    - Gitlab रिपॉजिटरी के लिए Gitlab पाइपलाइन्स
    - Github रिपॉजिटरी के लिए Github एक्शन्स
    - डॉकर हब सेटअप के लिए डॉकर कंपोज
    - AXE का उपयोग करके एक्सेसिबिलिटी टेस्टिंग
    - Applitools का उपयोग करके विज़ुअल टेस्टिंग
    - लॉग मैकेनिज्म


## [klassijs/klassi-js (cucumber-template)](https://github.com/klassijs/klassi-example-test-suite.git)

- फ्रेमवर्क्स
    - WebdriverIO (v8)
    - Cucumber (v8)

- विशेषताएँ
    - cucumber में सैंपल टेस्ट सिनेरियो शामिल है
    - फेलियर्स पर एम्बेडेड वीडियो के साथ इंटीग्रेटेड cucumber html रिपोर्ट्स
    - इंटीग्रेटेड Lambdatest और CircleCI सर्विसेज
    - इंटीग्रेटेड विज़ुअल, एक्सेसिबिलिटी और API टेस्टिंग
    - इंटीग्रेटेड ईमेल फंक्शनैलिटी
    - टेस्ट रिपोर्ट्स स्टोरेज और रिट्रीवल के लिए इंटीग्रेटेड s3 बकेट

## [serenity-js/serenity-js-mocha-webdriverio-template/](https://github.com/serenity-js/serenity-js-mocha-webdriverio-template/)

[Serenity/JS](https://serenity-js.org?pk_campaign=wdio8&pk_source=webdriver.io) टेम्प्लेट प्रोजेक्ट जो आपको नवीनतम WebdriverIO, Mocha, और Serenity/JS का उपयोग करके अपने वेब एप्लिकेशन के एक्सेप्टेंस टेस्टिंग शुरू करने में मदद करता है।

- फ्रेमवर्क्स
    - WebdriverIO (v8)
    - Mocha (v10)
    - Serenity/JS (v3)
    - Serenity BDD रिपोर्टिंग

- विशेषताएँ
    - [स्क्रीनप्ले पैटर्न](https://serenity-js.org/handbook/design/screenplay-pattern/?pk_campaign=wdio8&pk_source=webdriver.io)
    - टेस्ट फेलियर पर ऑटोमेटिक स्क्रीनशॉट्स, रिपोर्ट में एम्बेडेड
    - [GitHub Actions](https://github.com/serenity-js/serenity-js-mocha-webdriverio-template/blob/main/.github/workflows/main.yml) का उपयोग करके कंटीन्यूअस इंटीग्रेशन (CI) सेटअप
    - GitHub Pages पर प्रकाशित [डेमो Serenity BDD रिपोर्ट्स](https://serenity-js.github.io/serenity-js-mocha-webdriverio-template/)
    - TypeScript
    - ESLint

## [serenity-js/serenity-js-cucumber-webdriverio-template/](https://github.com/serenity-js/serenity-js-cucumber-webdriverio-template/)

[Serenity/JS](https://serenity-js.org?pk_campaign=wdio8&pk_source=webdriver.io) टेम्प्लेट प्रोजेक्ट जो आपको नवीनतम WebdriverIO, Cucumber, और Serenity/JS का उपयोग करके अपने वेब एप्लिकेशन के एक्सेप्टेंस टेस्टिंग शुरू करने में मदद करता है।

- फ्रेमवर्क्स
    - WebdriverIO (v8)
    - Cucumber (v9)
    - Serenity/JS (v3)
    - Serenity BDD रिपोर्टिंग

- विशेषताएँ
    - [स्क्रीनप्ले पैटर्न](https://serenity-js.org/handbook/design/screenplay-pattern/?pk_campaign=wdio8&pk_source=webdriver.io)
    - टेस्ट फेलियर पर ऑटोमेटिक स्क्रीनशॉट्स, रिपोर्ट में एम्बेडेड
    - [GitHub Actions](https://github.com/serenity-js/serenity-js-cucumber-webdriverio-template/blob/main/.github/workflows/main.yml) का उपयोग करके कंटीन्यूअस इंटीग्रेशन (CI) सेटअप
    - GitHub Pages पर प्रकाशित [डेमो Serenity BDD रिपोर्ट्स](https://serenity-js.github.io/serenity-js-mocha-webdriverio-template/)
    - TypeScript
    - ESLint

## [Muralijc/wdio-headspin-boilerplate](https://github.com/Muralijc/Wdio-Headspin-boilerplate/)
Cucumber फीचर्स और पेज ऑब्जेक्ट्स पैटर्न का उपयोग करके Headspin Cloud (https://www.headspin.io/) में WebdriverIO टेस्ट चलाने के लिए बॉयलरप्लेट प्रोजेक्ट।
- फ्रेमवर्क्स
    - WebdriverIO (v8)
    - Cucumber (v8)

- विशेषताएँ
    - [Headspin](https://www.headspin.io/) के साथ क्लाउड इंटीग्रेशन
    - पेज ऑब्जेक्ट मॉडल का समर्थन करता है
    - BDD के डिक्लेरेटिव स्टाइल में लिखे गए सैंपल सिनेरियो शामिल हैं
    - इंटीग्रेटेड cucumber html रिपोर्ट्स

# v7 बॉयलरप्लेट प्रोजेक्ट्स
---

## [webdriverio/appium-boilerplate](https://github.com/webdriverio/appium-boilerplate/)

इनके लिए WebdriverIO के साथ Appium टेस्ट चलाने के लिए बॉयलरप्लेट प्रोजेक्ट:

- iOS/Android नेटिव ऐप्स
- iOS/Android हाइब्रिड ऐप्स
- Android Chrome और iOS Safari ब्राउज़र

इस बॉयलरप्लेट में निम्नलिखित शामिल हैं:

- फ्रेमवर्क: Mocha
- विशेषताएँ:
    - इनके लिए कॉन्फिग्स:
        - iOS और Android ऐप
        - iOS और Android ब्राउज़र्स
    - इनके लिए हेल्पर्स:
        - WebView
        - जेस्चर्स
        - नेटिव अलर्ट्स
        - पिकर्स
     - इनके लिए टेस्ट उदाहरण:
        - WebView
        - लॉगिन
        - फॉर्म्स
        - स्वाइप
        - ब्राउज़र्स

## [serhatbolsu/webdriverio-mocha-uiautomation-boiler](https://github.com/serhatbolsu/webdriverio-mocha-uiautomation-boiler)
Mocha, WebdriverIO v6 के साथ PageObject के साथ ATDD WEB टेस्ट्स

- फ्रेमवर्क्स
  - WebdriverIO (v7)
  - Mocha
- विशेषताएँ
  - [पेज ऑब्जेक्ट](pageobjects) मॉडल
  - [Sauce Service](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-sauce-service/README.md) के साथ Sauce Labs इंटीग्रेशन
  - Allure रिपोर्ट
  - फेलिंग टेस्ट्स के लिए ऑटोमैटिक स्क्रीनशॉट्स कैप्चर
  - CircleCI उदाहरण
  - ESLint

## [WarleyGabriel/demo-webdriverio-mocha](https://github.com/WarleyGabriel/demo-webdriverio-mocha)

Mocha के साथ E2E टेस्ट चलाने के लिए बॉयलरप्लेट प्रोजेक्ट।

- फ्रेमवर्क्स:
    - WebdriverIO (v7)
    - Mocha
- विशेषताएँ:
    -   TypeScript
    -   [Expect-webdriverio](https://github.com/webdriverio/expect-webdriverio)
    -   [विज़ुअल रिग्रेशन टेस्ट्स](https://github.com/wswebcreation/wdio-image-comparison-service)
    -   पेज ऑब्जेक्ट पैटर्न
    -   [कमिट लिंट](https://github.com/conventional-changelog/commitlint) और [Commitizen](https://github.com/commitizen/cz-cli#making-your-repo-commitizen-friendly)
    -   ESlint
    -   Prettier
    -   Husky
    -   Github Actions उदाहरण
    -   Allure रिपोर्ट (फेलियर पर स्क्रीनशॉट्स)

## [17thSep/WebdriverIO_Master](https://github.com/17thSep/WebdriverIO_Master)

निम्नलिखित के लिए **WebdriverIO v7** टेस्ट चलाने के लिए बॉयलरप्लेट प्रोजेक्ट:

[Cucumber फ्रेमवर्क में TypeScript के साथ WDIO 7 स्क्रिप्ट्स](https://github.com/17thSep/WebdriverIO_Master/tree/master/TypeScript/Cucumber)
[Mocha फ्रेमवर्क में TypeScript के साथ WDIO 7 स्क्रिप्ट्स](https://github.com/17thSep/WebdriverIO_Master/tree/master/TypeScript/Mocha)
[Docker में WDIO 7 स्क्रिप्ट चलाएँ](https://github.com/17thSep/WebdriverIO_Master/tree/master/TypeScript/Docker)
[नेटवर्क लॉग्स](https://github.com/17thSep/MonitorNetworkLogs/)

इनके लिए बॉयलर प्लेट प्रोजेक्ट:

- नेटवर्क लॉग्स कैप्चर करें
- सभी GET/POST कॉल्स या विशिष्ट REST API कैप्चर करें
- रिक्वेस्ट पैरामीटर्स एसर्ट करें
- रिस्पॉन्स पैरामीटर्स एसर्ट करें
- सभी रिस्पॉन्स को एक अलग फाइल में स्टोर करें

## [Arjun-Ar91/Wdio7-appium-cucumber](https://github.com/Arjun-Ar91/Wdio7-appium-cucumber.git)

पेज ऑब्जेक्ट पैटर्न के साथ cucumber v7 और wdio v7 का उपयोग करके नेटिव और मोबाइल ब्राउज़र के लिए appium टेस्ट चलाने के लिए बॉयलरप्लेट प्रोजेक्ट।

- फ्रेमवर्क्स
    - WebdriverIO v7
    - Cucumber v7
    - Appium

- विशेषताएँ
    - नेटिव Android और iOS ऐप्स
    - Android Chrome ब्राउज़र
    - iOS Safari ब्राउज़र
    - पेज ऑब्जेक्ट मॉडल
    - cucumber में सैंपल टेस्ट सिनेरियो शामिल हैं
    - मल्टीपल cucumber html रिपोर्ट्स के साथ इंटीग्रेटेड

## [praveendvd/webdriverIODockerBoilerplate/](https://github.com/praveendvd/webdriverIODockerBoilerplate)

यह एक टेम्प्लेट प्रोजेक्ट है जो आपको दिखाता है कि आप नवीनतम WebdriverIO और Cucumber फ्रेमवर्क का उपयोग करके वेब एप्लिकेशन से webdriverio टेस्ट कैसे चला सकते हैं। इस प्रोजेक्ट का उद्देश्य एक बेसलाइन इमेज के रूप में कार्य करना है जिसका उपयोग आप यह समझने के लिए कर सकते हैं कि डॉकर में WebdriverIO टेस्ट कैसे चलाया जाए।

इस प्रोजेक्ट में शामिल हैं:

- DockerFile
- cucumber प्रोजेक्ट

अधिक जानकारी यहां पढ़ें: [Medium Blog](https://praveendavidmathew.medium.com/running-webdriverio-in-wsl2-windows-91d3a0dc7746)

## [praveendvd/WebdriverIO_electronAppAutomation_boilerplate/](https://github.com/praveendvd/WebdriverIO_electronAppAutomation_boilerplate)

यह एक टेम्प्लेट प्रोजेक्ट है जो आपको दिखाता है कि आप WebdriverIO का उपयोग करके electronJS टेस्ट कैसे चला सकते हैं। इस प्रोजेक्ट का उद्देश्य एक बेसलाइन इमेज के रूप में कार्य करना है जिसका उपयोग आप यह समझने के लिए कर सकते हैं कि WebdriverIO electronJS टेस्ट कैसे चलाए जाते हैं।

इस प्रोजेक्ट में शामिल हैं:

- सैंपल electronjs ऐप
- सैंपल cucumber टेस्ट स्क्रिप्ट्स

अधिक जानकारी यहां पढ़ें: [Medium Blog](https://praveendavidmathew.medium.com/first-step-into-automation-of-electronjs-applications-ef89b7423ddd)

## [praveendvd/webdriverIO_winappdriver_boilerplate/](https://github.com/praveendvd/webdriverIO_winappdriver_boilerplate)

यह एक टेम्प्लेट प्रोजेक्ट है जो आपको दिखाता है कि आप winappdriver और WebdriverIO का उपयोग करके विंडोज एप्लिकेशन को कैसे ऑटोमेट कर सकते हैं। इस प्रोजेक्ट का उद्देश्य एक बेसलाइन इमेज के रूप में कार्य करना है जिसका उपयोग आप यह समझने के लिए कर सकते हैं कि windappdriver और WebdriverIO टेस्ट कैसे चलाए जाते हैं।

अधिक जानकारी यहां पढ़ें: [Medium Blog](https://praveendavidmathew.medium.com/winappdriver-first-step-into-windows-app-test-automation-using-webdriverio-and-winappdriver-46320d89570b)

## [praveendvd/appium-chromedriver-multiremote-wdio-boilerplate/](https://github.com/praveendvd/appium-chromedriver-multiremote-wdio-boilerplate)


यह एक टेम्प्लेट प्रोजेक्ट है जो आपको दिखाता है कि आप नवीनतम WebdriverIO और Jasmine फ्रेमवर्क के साथ webdriverio मल्टीरिमोट क्षमता कैसे चला सकते हैं। इस प्रोजेक्ट का उद्देश्य एक बेसलाइन इमेज के रूप में कार्य करना है जिसका उपयोग आप यह समझने के लिए कर सकते हैं कि डॉकर में WebdriverIO टेस्ट कैसे चलाया जाए।

इस प्रोजेक्ट में उपयोग किया गया है:
     - chromedriver
     - jasmine
     - appium

## [webdriverio-roku-appium-boilerplate](https://github.com/AntonKostenko/webdriverIO-roku-appium)

पेज ऑब्जेक्ट पैटर्न के साथ mocha का उपयोग करके वास्तविक Roku डिवाइसों पर appium टेस्ट चलाने के लिए टेम्प्लेट प्रोजेक्ट।

- फ्रेमवर्क्स
    - WebdriverIO Async v7
    - Appium 2.0
    - Mocha v7
    - Allure Reporting

- विशेषताएँ
    - पेज ऑब्जेक्ट मॉडल
    - Typescript
    - फेलियर पर स्क्रीनशॉट
    - सैंपल Roku चैनल का उपयोग करके उदाहरण टेस्ट

## [krishnapollu/wdio-cucumber-poc](https://github.com/krishnapollu/wdio-cucumber-poc)

E2E मल्टीरिमोट Cucumber टेस्ट के साथ-साथ डेटा ड्रिवेन Mocha टेस्ट के लिए PoC प्रोजेक्ट

- फ्रेमवर्क:
    - Cucumber (v8)
    - WebdriverIO (v8)
    - Mocha (v8)

- विशेषताएँ:
    - Cucumber आधारित E2E टेस्ट्स
    - Mocha आधारित डेटा ड्रिवेन टेस्ट्स
    - केवल वेब टेस्ट्स - स्थानीय के साथ-साथ क्लाउड प्लेटफॉर्म्स में
    - केवल मोबाइल टेस्ट्स - स्थानीय के साथ-साथ रिमोट क्लाउड इम्युलेटर्स (या डिवाइसेस)
    - वेब + मोबाइल टेस्ट्स - मल्टीरिमोट - स्थानीय के साथ-साथ क्लाउड प्लेटफॉर्म्स
    - Allure सहित मल्टीपल रिपोर्ट्स इंटीग्रेटेड
    - टेस्ट डेटा (JSON / XLSX) ग्लोबली हैंडल किया जाता है ताकि टेस्ट एक्जीक्यूशन के बाद डेटा (ऑन द फ्लाई बनाया गया) को फाइल में लिखा जा सके
    - टेस्ट चलाने और allure रिपोर्ट अपलोड करने के लिए Github वर्कफ्लो

## [Rondleysg/wdio-multiremote-appium-chromedriver-boilerplate](https://github.com/Rondleysg/wdio-multiremote-appium-chromedriver-boilerplate)

यह एक बॉयलरप्लेट प्रोजेक्ट है जो नवीनतम WebdriverIO के साथ appium और chromedriver सर्विस का उपयोग करके webdriverio मल्टी-रिमोट कैसे चलाना है, यह दिखाने में मदद करता है।

- फ्रेमवर्क्स
  - WebdriverIO (v9)
  - Appium (v2)
  - Mocha

- विशेषताएँ
  - [पेज ऑब्जेक्ट](pageobjects) मॉडल
  - Typescript
  - वेब + मोबाइल टेस्ट्स - मल्टीरिमोट
  - नेटिव Android और iOS ऐप्स
  - Appium
  - Chromedriver
  - ESLint
  - http://the-internet.herokuapp.com में लॉगिन और [WebdriverIO नेटिव डेमो ऐप](https://github.com/webdriverio/native-demo-app) के लिए टेस्ट उदाहरण