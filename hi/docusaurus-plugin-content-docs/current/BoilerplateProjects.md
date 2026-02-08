---
id: boilerplates
title: बॉयलरप्लेट प्रोजेक्ट्स
---

समय के साथ, हमारे समुदाय ने कई परियोजनाओं को विकसित किया है जिन्हें आप अपने स्वयं के टेस्ट सूट को स्थापित करने के लिए प्रेरणा के रूप में उपयोग कर सकते हैं।

# v9 बॉयलरप्लेट प्रोजेक्ट्स

## [webdriverio/cucumber-boilerplate](https://github.com/webdriverio/cucumber-boilerplate)

हमारा अपना Cucumber टेस्ट सूट के लिए बॉयलरप्लेट। हमने आपके लिए 150 से अधिक पूर्वनिर्धारित स्टेप परिभाषाएँ बनाई हैं, ताकि आप अपने प्रोजेक्ट में तुरंत फीचर फाइलें लिखना शुरू कर सकें।

- फ्रेमवर्क:
    - Cucumber
    - WebdriverIO
- विशेषताएँ:
    - 150 से अधिक पूर्वनिर्धारित स्टेप्स जो लगभग सब कुछ कवर करते हैं जिनकी आपको आवश्यकता होगी
    - WebdriverIO की मल्टीरिमोट कार्यक्षमता को एकीकृत करता है
    - स्वयं का डेमो ऐप

## [webdriverio/jasmine-boilerplate](https://github.com/webdriverio/jasmine-boilerplate)
Babel विशेषताओं और पेज ऑब्जेक्ट्स पैटर्न का उपयोग करके Jasmine के साथ WebdriverIO टेस्ट चलाने के लिए बॉयलरप्लेट प्रोजेक्ट।

- फ्रेमवर्क्स
    - WebdriverIO
    - Jasmine
- विशेषताएँ
    - पेज ऑब्जेक्ट पैटर्न
    - सॉस लैब्स एकीकरण

## [webdriverio/electron-boilerplate](https://github.com/webdriverio/electron-boilerplate)
एक न्यूनतम इलेक्ट्रॉन एप्लिकेशन पर WebdriverIO टेस्ट चलाने के लिए बॉयलरप्लेट प्रोजेक्ट।

- फ्रेमवर्क्स
    - WebdriverIO
    - Mocha
- विशेषताएँ
    - इलेक्ट्रॉन API मॉकिंग

## [syamphaneendra/webdriverio9-boilerplate](https://github.com/syamphaneendra/webdriverio9-boilerplate)

इस बॉयलरप्लेट प्रोजेक्ट में WebdriverIO 9 मोबाइल टेस्ट है जो Cucumber, TypeScript और Android और iOS प्लेटफॉर्म के लिए Appium के साथ है, जो पेज ऑब्जेक्ट मॉडल पैटर्न का पालन करता है। इसमें व्यापक लॉगिंग, रिपोर्टिंग, मोबाइल जेस्चर, ऐप-टू-वेब नेविगेशन और CI/CD एकीकरण की सुविधाएँ हैं।

- फ्रेमवर्क्स:
    - WebdriverIO v9
    - Cucumber v9
    - Appium v2.5
    - TypeScript v5

- विशेषताएँ:
    - मल्टी-प्लेटफॉर्म समर्थन
      - Android (UiAutomator2)
      - iOS (XCUITest)
    - मोबाइल जेस्चर्स
      - स्क्रॉल
      - स्वाइप
      - लॉन्ग प्रेस
      - कीबोर्ड छिपाना
    - ऐप-से-वेब नेविगेशन
      - कॉन्टेक्स्ट स्विचिंग
      - वेबव्यू समर्थन
      - ब्राउज़र ऑटोमेशन (Chrome/Safari)
    - ताजा ऐप स्टेट
      - सिनारियो के बीच स्वचालित ऐप रीसेट
      - कॉन्फ़िगर करने योग्य रीसेट व्यवहार (noReset, fullReset)
    - डिवाइस कॉन्फ़िगरेशन
      - केंद्रीकृत डिवाइस प्रबंधन
      - आसान प्लेटफॉर्म स्विचिंग
    - JavaScript / TypeScript के लिए डायरेक्टरी स्ट्रक्चर का उदाहरण। नीचे JS वर्जन के लिए है, TS वर्जन में भी एक ही स्ट्रक्चर है।

## [amiya-pattnaik/wdio-testgen-from-gherkin-js](https://github.com/amiya-pattnaik/wdio-testgen-from-gherkin-js)
## [amiya-pattnaik/wdio-testgen-from-gherkin-ts](https://github.com/amiya-pattnaik/wdio-testgen-from-gherkin-ts)
Gherkin .feature फाइलों से WebdriverIO पेज ऑब्जेक्ट क्लासेज और Mocha टेस्ट स्पेक्स को स्वचालित रूप से जनरेट करें - मैन्युअल प्रयास को कम करके, कंसिस्टेंसी में सुधार करके, और QA ऑटोमेशन को तेज करें। यह प्रोजेक्ट न केवल webdriver.io के साथ संगत कोड प्रोड्यूस करता है, बल्कि webdriver.io की सभी कार्यक्षमताओं को बढ़ाता है। हमने दो फ्लेवर बनाए हैं, एक JavaScript उपयोगकर्ताओं के लिए और दूसरा TypeScript उपयोगकर्ताओं के लिए। लेकिन दोनों प्रोजेक्ट एक ही तरह से काम करते हैं।

***यह कैसे काम करता है?***
- प्रक्रिया दो-चरण ऑटोमेशन का पालन करती है:
- चरण 1: Gherkin से stepMap (stepMap.json फाइलें जनरेट करें)
  - stepMap.json फाइलें जनरेट करें:
    - Gherkin सिंटैक्स में लिखी गई .feature फाइलों को पार्स करता है।
    - सिनारियो और स्टेप्स निकालता है।
    - एक स्ट्रक्चर्ड .stepMap.json फाइल प्रोड्यूस करता है जिसमें शामिल हैं:
      - क्रिया करने के लिए (जैसे, क्लिक, setText, assertVisible)
      - लॉजिकल मैपिंग के लिए selectorName
      - DOM एलिमेंट के लिए selector
      - वैल्यू या एसर्शन के लिए नोट
- चरण 2: stepMap से कोड (WebdriverIO कोड जनरेट करें)
  stepMap.json का उपयोग करके जनरेट करता है:
  - shared methods और browser.url() सेटअप के साथ एक base page.js क्लास जनरेट करें।
  - test/pageobjects/ के अंदर प्रति feature WebdriverIO-कंपैटिबल पेज ऑब्जेक्ट मॉडल (POM) क्लासेज जनरेट करें।
  - Mocha-आधारित टेस्ट स्पेक्स जनरेट करें।
- JavaScript / TypeScript के लिए डायरेक्टरी स्ट्रक्चर का उदाहरण। नीचे JS वर्जन के लिए है, TS वर्जन में भी एक ही स्ट्रक्चर है।
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

- फ्रेमवर्क: WDIO-V8 with Cucumber (V8x)
- विशेषताएँ:
    - पेज ऑब्जेक्ट्स मॉडल ES6 /ES7 स्टाइल क्लास बेस अप्रोच और TypeScript समर्थन के साथ उपयोग करता है
    - एक बार में एक से अधिक सेलेक्टर के साथ एलिमेंट क्वेरी करने के लिए मल्टी सेलेक्टर ऑप्शन के उदाहरण
    - मल्टी ब्राउज़र और हेडलेस ब्राउज़र एक्सीक्यूशन के उदाहरण - Chrome और Firefox का उपयोग करके
    - BrowserStack, Sauce Labs, TestMu AI (पूर्व में LambdaTest) के साथ क्लाउड टेस्टिंग एकीकरण
    - E2E टेस्टिंग के लिए उदाहरणों के साथ बाहरी डेटा स्रोतों से आसान टेस्ट डेटा प्रबंधन के लिए MS-Excel से डेटा पढ़ने/लिखने के उदाहरण
    - किसी भी RDBMS (Oracle, MySql, TeraData, Vertica आदि) को डेटाबेस समर्थन, किसी भी क्वेरी को निष्पादित करना / परिणाम सेट आदि प्राप्त करना, E2E टेस्टिंग के लिए उदाहरणों के साथ
    - मल्टीपल रिपोर्टिंग (Spec, Xunit/Junit, Allure, JSON) और WebServer पर Allure और Xunit/Junit रिपोर्टिंग होस्टिंग
    - डेमो ऐप https://search.yahoo.com/ और http://the-internet.herokuapp.com के साथ उदाहरण
    - BrowserStack, Sauce Labs, TestMu AI (पूर्व में LambdaTest) और Appium विशिष्ट `.config` फाइल (मोबाइल डिवाइस पर प्लेबैक के लिए)। iOS और Android के लिए लोकल मशीन पर वन क्लिक Appium सेटअप के लिए [appium-setup-made-easy-OSX](https://github.com/amiya-pattnaik/appium-setup-made-easy-OSX) देखें।

## [amiya-pattnaik/webdriverIO-with-mochaBDD](https://github.com/amiya-pattnaik/webdriverIO-with-mochaBDD)

- फ्रेमवर्क: WDIO-V8 with Mocha (V10x)
- विशेषताएँ:
    - पेज ऑब्जेक्ट्स मॉडल ES6 /ES7 स्टाइल क्लास बेस अप्रोच और TypeScript समर्थन के साथ उपयोग करता है
    - डेमो ऐप https://search.yahoo.com और http://the-internet.herokuapp.com के साथ उदाहरण
    - मल्टी ब्राउज़र और हेडलेस ब्राउज़र एक्सीक्यूशन के उदाहरण - Chrome और Firefox का उपयोग करके
    - BrowserStack, Sauce Labs, TestMu AI (पूर्व में LambdaTest) के साथ क्लाउड टेस्टिंग एकीकरण
    - मल्टीपल रिपोर्टिंग (Spec, Xunit/Junit, Allure, JSON) और WebServer पर Allure और Xunit/Junit रिपोर्टिंग होस्टिंग
    - E2E टेस्टिंग के लिए उदाहरणों के साथ बाहरी डेटा स्रोतों से आसान टेस्ट डेटा प्रबंधन के लिए MS-Excel से डेटा पढ़ने/लिखने के उदाहरण
    - E2E टेस्टिंग के लिए उदाहरणों के साथ किसी भी RDBMS (Oracle, MySql, TeraData, Vertica आदि) से DB कनेक्ट करने, किसी भी क्वेरी निष्पादन / परिणाम सेट प्राप्त करने आदि के उदाहरण
    - BrowserStack, Sauce Labs, TestMu AI (पूर्व में LambdaTest) और Appium विशिष्ट `.config` फाइल (मोबाइल डिवाइस पर प्लेबैक के लिए)। iOS और Android के लिए लोकल मशीन पर वन क्लिक Appium सेटअप के लिए [appium-setup-made-easy-OSX](https://github.com/amiya-pattnaik/appium-setup-made-easy-OSX) देखें।

## [amiya-pattnaik/webdriverIO-with-jasmineBDD](https://github.com/amiya-pattnaik/webdriverIO-with-jasmineBDD)

- फ्रेमवर्क: WDIO-V8 with Jasmine (V4x)
- विशेषताएँ:
    - पेज ऑब्जेक्ट्स मॉडल ES6 /ES7 स्टाइल क्लास बेस अप्रोच और TypeScript समर्थन के साथ उपयोग करता है
    - डेमो ऐप https://search.yahoo.com और http://the-internet.herokuapp.com के साथ उदाहरण
    - मल्टी ब्राउज़र और हेडलेस ब्राउज़र एक्सीक्यूशन के उदाहरण - Chrome और Firefox का उपयोग करके
    - BrowserStack, Sauce Labs, TestMu AI (पूर्व में LambdaTest) के साथ क्लाउड टेस्टिंग एकीकरण
    - मल्टीपल रिपोर्टिंग (Spec, Xunit/Junit, Allure, JSON) और WebServer पर Allure और Xunit/Junit रिपोर्टिंग होस्टिंग
    - E2E टेस्टिंग के लिए उदाहरणों के साथ बाहरी डेटा स्रोतों से आसान टेस्ट डेटा प्रबंधन के लिए MS-Excel से डेटा पढ़ने/लिखने के उदाहरण
    - E2E टेस्टिंग के लिए उदाहरणों के साथ किसी भी RDBMS (Oracle, MySql, TeraData, Vertica आदि) से DB कनेक्ट करने, किसी भी क्वेरी निष्पादन / परिणाम सेट प्राप्त करने आदि के उदाहरण
    - BrowserStack, Sauce Labs, TestMu AI (पूर्व में LambdaTest) और Appium विशिष्ट `.config` फाइल (मोबाइल डिवाइस पर प्लेबैक के लिए)। iOS और Android के लिए लोकल मशीन पर वन क्लिक Appium सेटअप के लिए [appium-setup-made-easy-OSX](https://github.com/amiya-pattnaik/appium-setup-made-easy-OSX) देखें।

## [syamphaneendra/webdriverio-web-mobile-boilerplate](https://github.com/syamphaneendra/webdriverio-web-mobile-boilerplate)

इस बॉयलरप्लेट प्रोजेक्ट में cucumber और typescript के साथ WebdriverIO 8 टेस्ट हैं, जो पेज ऑब्जेक्ट्स पैटर्न का पालन करते हैं।

- फ्रेमवर्क्स:
    - WebdriverIO v8
    - Cucumber v8

- विशेषताएँ:
    - Typescript v5
    - Page Object Pattern
    - Prettier
    - मल्टी ब्राउज़र सपोर्ट
      - Chrome
      - Firefox
      - Edge
      - Safari
      - Standalone
    - क्रॉसब्राउजर पैरेलल एक्सीक्यूशन
    - Appium
    - BrowserStack और Sauce Labs के साथ क्लाउड टेस्टिंग एकीकरण
    - डॉकर सर्विस
    - शेयर डेटा सर्विस
    - प्रत्येक सर्विस के लिए अलग कॉन्फिग फाइल्स
    - यूजर टाइप द्वारा टेस्टडेटा मैनेजमेंट और रीड
    - रिपोर्टिंग
      - Dot
      - Spec
      - फेलियर स्क्रीनशॉट के साथ मल्टीपल cucumber html रिपोर्ट
    - गिटलैब रिपॉजिटरी के लिए गिटलैब पाइपलाइन्स
    - गिटहब रिपॉजिटरी के लिए गिटहब एक्शन्स
    - डॉकर हब सेट करने के लिए डॉकर कम्पोज
    - AXE का उपयोग करके एक्सेसिबिलिटी टेस्टिंग
    - Applitools का उपयोग करके विजुअल टेस्टिंग
    - लॉग मैकेनिज्म

## [klassijs/klassi-js (cucumber-template)](https://github.com/klassijs/klassi-example-test-suite.git)

- फ्रेमवर्क्स
    - WebdriverIO (v8)
    - Cucumber (v8)

- विशेषताएँ
    - cucumber में सैंपल टेस्ट सिनारियो शामिल हैं
    - असफलताओं पर एम्बेडेड वीडियो के साथ एकीकृत cucumber html रिपोर्ट
    - Lambdatest और CircleCI सेविस एकीकृत
    - एकीकृत विजुअल, एक्सेसिबिलिटी और API टेस्टिंग
    - एकीकृत ईमेल फंक्शनैलिटी
    - टेस्ट रिपोर्ट स्टोरेज और रिट्रीवल के लिए एकीकृत s3 बकेट

## [serenity-js/serenity-js-mocha-webdriverio-template/](https://github.com/serenity-js/serenity-js-mocha-webdriverio-template/)

[Serenity/JS](https://serenity-js.org?pk_campaign=wdio8&pk_source=webdriver.io) टेम्पलेट प्रोजेक्ट जो आपको नवीनतम WebdriverIO, Mocha, और Serenity/JS का उपयोग करके अपने वेब एप्लिकेशन के स्वीकृति परीक्षण के साथ आरंभ करने में मदद करता है।

- फ्रेमवर्क्स
    - WebdriverIO (v8)
    - Mocha (v10)
    - Serenity/JS (v3)
    - Serenity BDD रिपोर्टिंग

- विशेषताएँ
    - [स्क्रीनप्ले पैटर्न](https://serenity-js.org/handbook/design/screenplay-pattern/?pk_campaign=wdio8&pk_source=webdriver.io)
    - टेस्ट विफलता पर स्वचालित स्क्रीनशॉट, रिपोर्ट में एम्बेडेड
    - [GitHub Actions](https://github.com/serenity-js/serenity-js-mocha-webdriverio-template/blob/main/.github/workflows/main.yml) का उपयोग करके कंटिन्युअस इंटीग्रेशन (CI) सेटअप
    - GitHub Pages पर प्रकाशित [डेमो Serenity BDD रिपोर्ट](https://serenity-js.github.io/serenity-js-mocha-webdriverio-template/)
    - टाइपस्क्रिप्ट
    - ESLint

## [serenity-js/serenity-js-cucumber-webdriverio-template/](https://github.com/serenity-js/serenity-js-cucumber-webdriverio-template/)

[Serenity/JS](https://serenity-js.org?pk_campaign=wdio8&pk_source=webdriver.io) टेम्पलेट प्रोजेक्ट जो आपको नवीनतम WebdriverIO, Cucumber, और Serenity/JS का उपयोग करके अपने वेब एप्लिकेशन के स्वीकृति परीक्षण के साथ आरंभ करने में मदद करता है।

- फ्रेमवर्क्स
    - WebdriverIO (v8)
    - Cucumber (v9)
    - Serenity/JS (v3)
    - Serenity BDD रिपोर्टिंग

- विशेषताएँ
    - [स्क्रीनप्ले पैटर्न](https://serenity-js.org/handbook/design/screenplay-pattern/?pk_campaign=wdio8&pk_source=webdriver.io)
    - टेस्ट विफलता पर स्वचालित स्क्रीनशॉट, रिपोर्ट में एम्बेडेड
    - [GitHub Actions](https://github.com/serenity-js/serenity-js-cucumber-webdriverio-template/blob/main/.github/workflows/main.yml) का उपयोग करके कंटिन्युअस इंटीग्रेशन (CI) सेटअप
    - GitHub Pages पर प्रकाशित [डेमो Serenity BDD रिपोर्ट](https://serenity-js.github.io/serenity-js-mocha-webdriverio-template/)
    - टाइपस्क्रिप्ट
    - ESLint

## [Muralijc/wdio-headspin-boilerplate](https://github.com/Muralijc/Wdio-Headspin-boilerplate/)
Cucumber features और पेज ऑब्जेक्ट्स पैटर्न का उपयोग करके Headspin Cloud (https://www.headspin.io/) में WebdriverIO टेस्ट चलाने के लिए बॉयलरप्लेट प्रोजेक्ट।
- फ्रेमवर्क्स
    - WebdriverIO (v8)
    - Cucumber (v8)

- विशेषताएँ
    - [Headspin](https://www.headspin.io/) के साथ क्लाउड एकीकरण
    - पेज ऑब्जेक्ट मॉडल का समर्थन करता है
    - BDD के घोषणात्मक शैली में लिखे गए नमूना सिनारियो शामिल हैं
    - एकीकृत cucumber html रिपोर्ट

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
        - वेबव्यू
        - जेस्चर्स
        - नेटिव अलर्ट्स
        - पिकर्स
     - इनके लिए टेस्ट उदाहरण:
        - वेबव्यू
        - लॉगिन
        - फॉर्म्स
        - स्वाइप
        - ब्राउज़र्स

## [serhatbolsu/webdriverio-mocha-uiautomation-boiler](https://github.com/serhatbolsu/webdriverio-mocha-uiautomation-boiler)
Mocha, WebdriverIO v6 के साथ पेजऑब्जेक्ट के साथ ATDD WEB टेस्ट

- फ्रेमवर्क्स
  - WebdriverIO (v7)
  - Mocha
- विशेषताएँ
  - [पेज ऑब्जेक्ट](pageobjects) मॉडल
  - [Sauce Service](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-sauce-service/README.md) के साथ Sauce Labs एकीकरण
  - Allure रिपोर्ट
  - फेल होने वाले टेस्ट के लिए स्वचालित स्क्रीनशॉट कैप्चर
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
    -   [Visual regression tests](https://github.com/wswebcreation/wdio-image-comparison-service)
    -   पेज ऑब्जेक्ट पैटर्न
    -   [Commit lint](https://github.com/conventional-changelog/commitlint) और [Commitizen](https://github.com/commitizen/cz-cli#making-your-repo-commitizen-friendly)
    -   ESlint
    -   Prettier
    -   Husky
    -   Github Actions उदाहरण
    -   Allure रिपोर्ट (विफलता पर स्क्रीनशॉट)

## [17thSep/WebdriverIO_Master](https://github.com/17thSep/WebdriverIO_Master)

निम्नलिखित के लिए **WebdriverIO v7** टेस्ट चलाने के लिए बॉयलरप्लेट प्रोजेक्ट:

[Cucumber Framework में TypeScript के साथ WDIO 7 स्क्रिप्ट्स](https://github.com/17thSep/WebdriverIO_Master/tree/master/TypeScript/Cucumber)
[Mocha Framework में TypeScript के साथ WDIO 7 स्क्रिप्ट्स](https://github.com/17thSep/WebdriverIO_Master/tree/master/TypeScript/Mocha)
[Docker में WDIO 7 स्क्रिप्ट चलाएँ](https://github.com/17thSep/WebdriverIO_Master/tree/master/TypeScript/Docker)
[नेटवर्क लॉग्स](https://github.com/17thSep/MonitorNetworkLogs/)

इसके लिए बॉयलर प्लेट प्रोजेक्ट:

- नेटवर्क लॉग्स कैप्चर करें
- सभी GET/POST कॉल या एक विशिष्ट REST API कैप्चर करें
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
    - cucumber में सैंपल टेस्ट सिनारियो शामिल हैं
    - मल्टिपल cucumber html रिपोर्ट के साथ एकीकृत

## [praveendvd/webdriverIODockerBoilerplate/](https://github.com/praveendvd/webdriverIODockerBoilerplate)

यह एक टेम्प्लेट प्रोजेक्ट है जो आपको दिखाता है कि आप नवीनतम WebdriverIO और Cucumber फ्रेमवर्क का उपयोग करके वेब एप्लिकेशन से webdriverio टेस्ट कैसे चला सकते हैं। यह प्रोजेक्ट एक बेसलाइन इमेज के रूप में कार्य करने का इरादा रखता है जिसका उपयोग आप डॉकर में WebdriverIO टेस्ट कैसे चलाए जाते हैं, यह समझने के लिए कर सकते हैं।

इस प्रोजेक्ट में शामिल हैं:

- DockerFile
- cucumber प्रोजेक्ट

अधिक पढ़ें: [Medium Blog](https://praveendavidmathew.medium.com/running-webdriverio-in-wsl2-windows-91d3a0dc7746)

## [praveendvd/WebdriverIO_electronAppAutomation_boilerplate/](https://github.com/praveendvd/WebdriverIO_electronAppAutomation_boilerplate)

यह एक टेम्प्लेट प्रोजेक्ट है जो आपको दिखाता है कि आप WebdriverIO का उपयोग करके electronJS टेस्ट कैसे चला सकते हैं। यह प्रोजेक्ट एक बेसलाइन इमेज के रूप में कार्य करने का इरादा रखता है जिसका उपयोग आप WebdriverIO electronJS टेस्ट कैसे चलाए जाते हैं, यह समझने के लिए कर सकते हैं।

इस प्रोजेक्ट में शामिल हैं:

- सैंपल electronjs ऐप
- सैंपल cucumber टेस्ट स्क्रिप्ट्स

अधिक पढ़ें: [Medium Blog](https://praveendavidmathew.medium.com/first-step-into-automation-of-electronjs-applications-ef89b7423ddd)

## [praveendvd/webdriverIO_winappdriver_boilerplate/](https://github.com/praveendvd/webdriverIO_winappdriver_boilerplate)

यह एक टेम्प्लेट प्रोजेक्ट है जो आपको दिखाता है कि आप winappdriver और WebdriverIO का उपयोग करके विंडोज एप्लिकेशन को कैसे ऑटोमेट कर सकते हैं। यह प्रोजेक्ट एक बेसलाइन इमेज के रूप में कार्य करने का इरादा रखता है जिसका उपयोग आप windappdriver और WebdriverIO टेस्ट कैसे चलाए जाते हैं, यह समझने के लिए कर सकते हैं।

अधिक पढ़ें: [Medium Blog](https://praveendavidmathew.medium.com/winappdriver-first-step-into-windows-app-test-automation-using-webdriverio-and-winappdriver-46320d89570b)

## [praveendvd/appium-chromedriver-multiremote-wdio-boilerplate/](https://github.com/praveendvd/appium-chromedriver-multiremote-wdio-boilerplate)

यह एक टेम्प्लेट प्रोजेक्ट है जो आपको दिखाता है कि आप नवीनतम WebdriverIO और Jasmine फ्रेमवर्क के साथ webdriverio मल्टीरिमोट क्षमता कैसे चला सकते हैं। यह प्रोजेक्ट एक बेसलाइन इमेज के रूप में कार्य करने का इरादा रखता है जिसका उपयोग आप डॉकर में WebdriverIO टेस्ट कैसे चलाए जाते हैं, यह समझने के लिए कर सकते हैं।

इस प्रोजेक्ट में उपयोग किया गया है:
     - chromedriver
     - jasmine
     - appium

## [webdriverio-roku-appium-boilerplate](https://github.com/AntonKostenko/webdriverIO-roku-appium)

पेज ऑब्जेक्ट पैटर्न के साथ mocha का उपयोग करके असली Roku डिवाइस पर appium टेस्ट चलाने के लिए टेम्प्लेट प्रोजेक्ट।

- फ्रेमवर्क्स
    - WebdriverIO Async v7
    - Appium 2.0
    - Mocha v7
    - Allure रिपोर्टिंग

- विशेषताएँ
    - पेज ऑब्जेक्ट मॉडल
    - टाइपस्क्रिप्ट
    - विफलता पर स्क्रीनशॉट
    - एक सैंपल Roku चैनल का उपयोग करके उदाहरण टेस्ट

## [krishnapollu/wdio-cucumber-poc](https://github.com/krishnapollu/wdio-cucumber-poc)

E2E मल्टीरिमोट Cucumber टेस्ट के साथ-साथ डेटा ड्रिवन Mocha टेस्ट के लिए PoC प्रोजेक्ट

- फ्रेमवर्क:
    - Cucumber (v8)
    - WebdriverIO (v8)
    - Mocha (v8)

- विशेषताएँ:
    - Cucumber आधारित E2E टेस्ट
    - Mocha आधारित डेटा ड्रिवन टेस्ट
    - वेब-केवल टेस्ट - लोकल के साथ-साथ क्लाउड प्लेटफॉर्म में
    - मोबाइल-केवल टेस्ट - लोकल के साथ-साथ रिमोट क्लाउड एम्युलेटर्स (या डिवाइस)
    - वेब + मोबाइल टेस्ट - मल्टीरिमोट - लोकल के साथ-साथ क्लाउड प्लेटफॉर्म
    - Allure सहित एकीकृत कई रिपोर्ट
    - टेस्ट डेटा (JSON / XLSX) को वैश्विक रूप से संभाला जाता है ताकि टेस्ट निष्पादन के बाद डेटा (ऑन-द-फ्लाई बनाया गया) को फाइल में लिखा जा सके
    - टेस्ट चलाने और allure रिपोर्ट अपलोड करने के लिए गिटहब वर्कफ़्लो

## [Rondleysg/wdio-multiremote-appium-chromedriver-boilerplate](https://github.com/Rondleysg/wdio-multiremote-appium-chromedriver-boilerplate)

यह एक बॉयलरप्लेट प्रोजेक्ट है जो नवीनतम WebdriverIO का उपयोग करके appium और chromedriver सर्विस के साथ वेबड्राइवरआईओ मल्टी-रिमोट को कैसे चलाया जाए, यह दिखाने में मदद करता है।

- फ्रेमवर्क्स
  - WebdriverIO (v9)
  - Appium (v2)
  - Mocha

- विशेषताएँ
  - [पेज ऑब्जेक्ट](pageobjects) मॉडल
  - टाइपस्क्रिप्ट
  - वेब + मोबाइल टेस्ट - मल्टीरिमोट
  - नेटिव Android और iOS ऐप्स
  - Appium
  - Chromedriver
  - ESLint
  - http://the-internet.herokuapp.com में लॉगिन और [WebdriverIO नेटिव डेमो ऐप](https://github.com/webdriverio/native-demo-app) के लिए टेस्ट उदाहरण