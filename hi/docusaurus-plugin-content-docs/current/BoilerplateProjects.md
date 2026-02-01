---
id: boilerplates
title: बॉयलरप्लेट प्रोजेक्ट्स
---

समय के साथ, हमारे समुदाय ने कई प्रोजेक्ट्स विकसित किए हैं जिन्हें आप अपना खुद का टेस्ट सूट स्थापित करने के लिए प्रेरणा के रूप में उपयोग कर सकते हैं।

# v9 बॉयलरप्लेट प्रोजेक्ट्स

## [webdriverio/cucumber-boilerplate](https://github.com/webdriverio/cucumber-boilerplate)

Cucumber टेस्ट सूट के लिए हमारा अपना बॉयलरप्लेट। हमने आपके लिए 150 से अधिक पूर्वनिर्धारित स्टेप डेफिनिशन बनाई हैं, ताकि आप अपने प्रोजेक्ट में तुरंत फीचर फाइलें लिखना शुरू कर सकें।

- फ्रेमवर्क:
    - Cucumber
    - WebdriverIO
- विशेषताएं:
    - 150 से अधिक पूर्वनिर्धारित स्टेप्स जो लगभग सभी आवश्यकताओं को कवर करते हैं
    - WebdriverIO की मल्टिरिमोट कार्यक्षमता को एकीकृत करता है
    - खुद का डेमो ऐप

## [webdriverio/jasmine-boilerplate](https://github.com/webdriverio/jasmine-boilerplate)
Babel फीचर्स और पेज ऑब्जेक्ट्स पैटर्न का उपयोग करके Jasmine के साथ WebdriverIO टेस्ट चलाने के लिए बॉयलरप्लेट प्रोजेक्ट।

- फ्रेमवर्क्स
    - WebdriverIO
    - Jasmine
- विशेषताएं
    - पेज ऑब्जेक्ट पैटर्न
    - Sauce Labs एकीकरण

## [webdriverio/electron-boilerplate](https://github.com/webdriverio/electron-boilerplate)
एक मिनिमल इलेक्ट्रॉन एप्लिकेशन पर WebdriverIO टेस्ट चलाने के लिए बॉयलरप्लेट प्रोजेक्ट।

- फ्रेमवर्क्स
    - WebdriverIO
    - Mocha
- विशेषताएं
    - इलेक्ट्रॉन API मॉकिंग
 
## [syamphaneendra/webdriverio9-boilerplate](https://github.com/syamphaneendra/webdriverio9-boilerplate)

यह बॉयलरप्लेट प्रोजेक्ट में WebdriverIO 9 मोबाइल टेस्ट Cucumber, TypeScript और Appium के साथ Android और iOS प्लेटफॉर्म के लिए है, जो पेज ऑब्जेक्ट मॉडल पैटर्न का पालन करता है। इसमें व्यापक लॉगिंग, रिपोर्टिंग, मोबाइल जेस्चर, एप-टू-वेब नेविगेशन और CI/CD एकीकरण शामिल है।

- फ्रेमवर्क्स:
    - WebdriverIO v9
    - Cucumber v9
    - Appium v2.5
    - TypeScript v5

- विशेषताएं:
    - मल्टी-प्लेटफॉर्म समर्थन
      - Android (UiAutomator2)
      - iOS (XCUITest)
    - मोबाइल जेस्चर्स
      - स्क्रॉल
      - स्वाइप
      - लॉन्ग प्रेस
      - कीबोर्ड छिपाना
    - ऐप-टू-वेब नेविगेशन
      - कॉन्टेक्स्ट स्विचिंग
      - WebView समर्थन
      - ब्राउज़र ऑटोमेशन (Chrome/Safari)
    - ताज़ा ऐप स्टेट
      - स्वचालित ऐप रीसेट सिनारियो के बीच
      - कॉन्फ़िगरेबल रीसेट व्यवहार (noReset, fullReset)
    - डिवाइस कॉन्फ़िगरेशन
      - केंद्रीकृत डिवाइस प्रबंधन
      - आसान प्लेटफॉर्म स्विचिंग
    - JavaScript / TypeScript के लिए डायरेक्टरी संरचना का उदाहरण। नीचे JS संस्करण के लिए है, TS संस्करण में भी एक ही संरचना है।

## [amiya-pattnaik/wdio-testgen-from-gherkin-js](https://github.com/amiya-pattnaik/wdio-testgen-from-gherkin-js)
## [amiya-pattnaik/wdio-testgen-from-gherkin-ts](https://github.com/amiya-pattnaik/wdio-testgen-from-gherkin-ts)
Gherkin .feature फाइलों से WebdriverIO पेज ऑब्जेक्ट क्लासेस और Mocha टेस्ट स्पेक्स स्वचालित रूप से जेनरेट करें — मैन्युअल प्रयास को कम करके, सुसंगतता में सुधार और QA ऑटोमेशन को तेज़ करें। यह प्रोजेक्ट न केवल webdriver.io के साथ संगत कोड उत्पन्न करता है बल्कि webdriver.io की सभी कार्यक्षमताओं को भी बढ़ाता है। हमने दो प्रकार बनाए हैं, एक JavaScript उपयोगकर्ताओं के लिए और दूसरा TypeScript उपयोगकर्ताओं के लिए। लेकिन दोनों प्रोजेक्ट एक ही तरह से काम करते हैं।

***यह कैसे काम करता है?***
- प्रक्रिया दो-चरण ऑटोमेशन का अनुसरण करती है:
- स्टेप 1: Gherkin से stepMap (stepMap.json फाइलें जेनरेट करना)
  - stepMap.json फाइलें जेनरेट करें:
    - Gherkin सिंटैक्स में लिखी .feature फाइलों को पार्स करता है।
    - सिनारियो और स्टेप्स को निकालता है।
    - एक संरचित .stepMap.json फाइल उत्पन्न करता है जिसमें शामिल होता है:
      - एक्शन परफॉर्म करने के लिए (जैसे, click, setText, assertVisible)
      - लॉजिकल मैपिंग के लिए selectorName
      - DOM एलिमेंट के लिए सेलेक्टर
      - वैल्यूज या एसर्शन के लिए नोट
- स्टेप 2: stepMap से कोड (WebdriverIO कोड जेनरेट करना)
  stepMap.json का उपयोग निम्न को जेनरेट करने के लिए करता है:
  - शेयर्ड मेथड्स और browser.url() सेटअप के साथ बेस page.js क्लास जेनरेट करें।
  - test/pageobjects/ के अंदर फीचर के अनुसार WebdriverIO-संगत पेज ऑब्जेक्ट मॉडल (POM) क्लासेज जेनरेट करें।
  - Mocha-आधारित टेस्ट स्पेक्स जेनरेट करें।
- JavaScript / TypeScript के लिए डायरेक्टरी संरचना का उदाहरण। नीचे JS संस्करण के लिए है, TS संस्करण में भी एक ही संरचना है।
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
- विशेषताएं:
    - पेज ऑब्जेक्ट्स मॉडल ES6/ES7 स्टाइल क्लास बेस एप्रोच और TypeScript समर्थन के साथ उपयोग करता है
    - एक बार में एक से अधिक सेलेक्टर के साथ एलिमेंट क्वेरी करने के लिए मल्टी सेलेक्टर विकल्प के उदाहरण
    - क्रोम और फायरफॉक्स का उपयोग करके मल्टी ब्राउज़र और हेडलेस ब्राउज़र एक्सिक्यूशन के उदाहरण
    - BrowserStack, Sauce Labs, LambdaTest के साथ क्लाउड टेस्टिंग इंटिग्रेशन
    - आसान टेस्ट डेटा प्रबंधन के लिए MS-Excel से डेटा पढ़ने/लिखने के उदाहरण के साथ बाहरी डेटा स्रोतों से उदाहरण
    - किसी भी RDBMS (Oracle, MySql, TeraData, Vertica आदि) के लिए डेटाबेस समर्थन, E2E टेस्टिंग के लिए उदाहरणों के साथ किसी भी क्वेरी / परिणाम सेट को फेच करना आदि
    - मल्टीपल रिपोर्टिंग (Spec, Xunit/Junit, Allure, JSON) और WebServer पर Allure और Xunit/Junit रिपोर्टिंग होस्टिंग
    - डेमो ऐप https://search.yahoo.com/ और http://the-internet.herokuapp.com के साथ उदाहरण
    - BrowserStack, Sauce Labs, LambdaTest और Appium स्पेसिफिक `.config` फाइल (मोबाइल डिवाइस पर प्लेबैक के लिए)। iOS और Android के लिए लोकल मशीन पर वन क्लिक Appium सेटअप के लिए [appium-setup-made-easy-OSX](https://github.com/amiya-pattnaik/appium-setup-made-easy-OSX) देखें।

## [amiya-pattnaik/webdriverIO-with-mochaBDD](https://github.com/amiya-pattnaik/webdriverIO-with-mochaBDD)

- फ्रेमवर्क: WDIO-V8 with Mocha (V10x).
- विशेषताएं:
    -  पेज ऑब्जेक्ट्स मॉडल ES6/ES7 स्टाइल क्लास बेस एप्रोच और TypeScript समर्थन के साथ उपयोग करता है
    -  डेमो ऐप https://search.yahoo.com और http://the-internet.herokuapp.com के साथ उदाहरण
    -  क्रोम और फायरफॉक्स का उपयोग करके मल्टी ब्राउज़र और हेडलेस ब्राउज़र एक्सिक्यूशन के उदाहरण
    -  BrowserStack, Sauce Labs, LambdaTest के साथ क्लाउड टेस्टिंग इंटिग्रेशन
    -  मल्टीपल रिपोर्टिंग (Spec, Xunit/Junit, Allure, JSON) और WebServer पर Allure और Xunit/Junit रिपोर्टिंग होस्टिंग
    -  आसान टेस्ट डेटा प्रबंधन के लिए MS-Excel से डेटा पढ़ने/लिखने के उदाहरण के साथ बाहरी डेटा स्रोतों से उदाहरण
    -  E2E टेस्टिंग के लिए उदाहरणों के साथ किसी भी RDBMS (Oracle, MySql, TeraData, Vertica आदि) से DB कनेक्ट करने, कोई क्वेरी एक्सिक्यूशन / परिणाम सेट फेचिंग आदि के उदाहरण
    -  BrowserStack, Sauce Labs, LambdaTest और Appium स्पेसिफिक `.config` फाइल (मोबाइल डिवाइस पर प्लेबैक के लिए)। iOS और Android के लिए लोकल मशीन पर वन क्लिक Appium सेटअप के लिए [appium-setup-made-easy-OSX](https://github.com/amiya-pattnaik/appium-setup-made-easy-OSX) देखें।

## [amiya-pattnaik/webdriverIO-with-jasmineBDD](https://github.com/amiya-pattnaik/webdriverIO-with-jasmineBDD)

- फ्रेमवर्क: WDIO-V8 with Jasmine (V4x).
- विशेषताएं:
    -  पेज ऑब्जेक्ट्स मॉडल ES6/ES7 स्टाइल क्लास बेस एप्रोच और TypeScript समर्थन के साथ उपयोग करता है
    -  डेमो ऐप https://search.yahoo.com और http://the-internet.herokuapp.com के साथ उदाहरण
    -  क्रोम और फायरफॉक्स का उपयोग करके मल्टी ब्राउज़र और हेडलेस ब्राउज़र एक्सिक्यूशन के उदाहरण
    -  BrowserStack, Sauce Labs, LambdaTest के साथ क्लाउड टेस्टिंग इंटिग्रेशन
    -  मल्टीपल रिपोर्टिंग (Spec, Xunit/Junit, Allure, JSON) और WebServer पर Allure और Xunit/Junit रिपोर्टिंग होस्टिंग
    -  आसान टेस्ट डेटा प्रबंधन के लिए MS-Excel से डेटा पढ़ने/लिखने के उदाहरण के साथ बाहरी डेटा स्रोतों से उदाहरण
    -  E2E टेस्टिंग के लिए उदाहरणों के साथ किसी भी RDBMS (Oracle, MySql, TeraData, Vertica आदि) से DB कनेक्ट करने, कोई क्वेरी एक्सिक्यूशन / परिणाम सेट फेचिंग आदि के उदाहरण
    -  BrowserStack, Sauce Labs, LambdaTest और Appium स्पेसिफिक `.config` फाइल (मोबाइल डिवाइस पर प्लेबैक के लिए)। iOS और Android के लिए लोकल मशीन पर वन क्लिक Appium सेटअप के लिए [appium-setup-made-easy-OSX](https://github.com/amiya-pattnaik/appium-setup-made-easy-OSX) देखें।

## [syamphaneendra/webdriverio-web-mobile-boilerplate](https://github.com/syamphaneendra/webdriverio-web-mobile-boilerplate)

यह बॉयलरप्लेट प्रोजेक्ट में WebdriverIO 8 टेस्ट cucumber और typescript के साथ है, जिसके बाद पेज ऑब्जेक्ट्स पैटर्न है।

- फ्रेमवर्क्स:
    - WebdriverIO v8
    - Cucumber v8

- विशेषताएं:
    - Typescript v5
    - पेज ऑब्जेक्ट पैटर्न
    - प्रेटियर
    - मल्टी ब्राउज़र समर्थन
      - Chrome
      - Firefox
      - Edge
      - Safari
      - Standalone
    - क्रॉसब्राउज़र पैरेलल एक्सिक्यूशन
    - Appium
    - BrowserStack और Sauce Labs के साथ क्लाउड टेस्टिंग इंटिग्रेशन
    - डॉकर सर्विस
    - शेयर डेटा सर्विस
    - प्रत्येक सर्विस के लिए अलग कॉन्फिग फाइलें
    - टेस्टडेटा प्रबंधन और यूजर टाइप द्वारा पढ़ना
    - रिपोर्टिंग
      - Dot
      - Spec
      - विफलता स्क्रीनशॉट के साथ मल्टीपल cucumber html रिपोर्ट
    - Gitlab रिपोजिटरी के लिए Gitlab पाइपलाइन्स
    - Github रिपोजिटरी के लिए Github एक्शन्स
    - डॉकर हब सेट करने के लिए Docker compose
    - AXE का उपयोग करके एक्सेसिबिलिटी टेस्टिंग
    - Applitools का उपयोग करके विजुअल टेस्टिंग
    - लॉग मैकेनिज्म


## [klassijs/klassi-js (cucumber-template)](https://github.com/klassijs/klassi-example-test-suite.git)

- फ्रेमवर्क्स
    - WebdriverIO (v8)
    - Cucumber (v8)

- विशेषताएं
    - Cucumber में सैंपल टेस्ट सिनारियो शामिल है
    - विफलताओं पर एम्बेडेड वीडियो के साथ एकीकृत cucumber html रिपोर्ट्स
    - एकीकृत Lambdatest और CircleCI सेवाएं
    - एकीकृत विजुअल, एक्सेसिबिलिटी और API टेस्टिंग
    - एकीकृत ईमेल कार्यक्षमता
    - टेस्ट रिपोर्ट्स के स्टोरेज और रिट्रीवल के लिए एकीकृत s3 बकेट

## [serenity-js/serenity-js-mocha-webdriverio-template/](https://github.com/serenity-js/serenity-js-mocha-webdriverio-template/)

[Serenity/JS](https://serenity-js.org?pk_campaign=wdio8&pk_source=webdriver.io) टेम्पलेट प्रोजेक्ट जो आपको नवीनतम WebdriverIO, Mocha, और Serenity/JS का उपयोग करके अपने वेब एप्लिकेशन के लिए स्वीकृति परीक्षण शुरू करने में मदद करता है।

- फ्रेमवर्क्स
    - WebdriverIO (v8)
    - Mocha (v10)
    - Serenity/JS (v3)
    - Serenity BDD रिपोर्टिंग

- विशेषताएं
    - [स्क्रिप्टप्ले पैटर्न](https://serenity-js.org/handbook/design/screenplay-pattern/?pk_campaign=wdio8&pk_source=webdriver.io)
    - टेस्ट विफलता पर स्वचालित स्क्रीनशॉट, रिपोर्ट में एम्बेडेड
    - [GitHub Actions](https://github.com/serenity-js/serenity-js-mocha-webdriverio-template/blob/main/.github/workflows/main.yml) का उपयोग करके कंटिन्युअस इंटिग्रेशन (CI) सेटअप
    - GitHub Pages पर प्रकाशित [डेमो Serenity BDD रिपोर्ट्स](https://serenity-js.github.io/serenity-js-mocha-webdriverio-template/)
    - TypeScript
    - ESLint

## [serenity-js/serenity-js-cucumber-webdriverio-template/](https://github.com/serenity-js/serenity-js-cucumber-webdriverio-template/)

[Serenity/JS](https://serenity-js.org?pk_campaign=wdio8&pk_source=webdriver.io) टेम्पलेट प्रोजेक्ट जो आपको नवीनतम WebdriverIO, Cucumber, और Serenity/JS का उपयोग करके अपने वेब एप्लिकेशन के लिए स्वीकृति परीक्षण शुरू करने में मदद करता है।

- फ्रेमवर्क्स
    - WebdriverIO (v8)
    - Cucumber (v9)
    - Serenity/JS (v3)
    - Serenity BDD रिपोर्टिंग

- विशेषताएं
    - [स्क्रिप्टप्ले पैटर्न](https://serenity-js.org/handbook/design/screenplay-pattern/?pk_campaign=wdio8&pk_source=webdriver.io)
    - टेस्ट विफलता पर स्वचालित स्क्रीनशॉट, रिपोर्ट में एम्बेडेड
    - [GitHub Actions](https://github.com/serenity-js/serenity-js-cucumber-webdriverio-template/blob/main/.github/workflows/main.yml) का उपयोग करके कंटिन्युअस इंटिग्रेशन (CI) सेटअप
    - GitHub Pages पर प्रकाशित [डेमो Serenity BDD रिपोर्ट्स](https://serenity-js.github.io/serenity-js-mocha-webdriverio-template/)
    - TypeScript
    - ESLint

## [Muralijc/wdio-headspin-boilerplate](https://github.com/Muralijc/Wdio-Headspin-boilerplate/)
Headspin क्लाउड (https://www.headspin.io/) में Cucumber फीचर्स और पेज ऑब्जेक्ट्स पैटर्न का उपयोग करके WebdriverIO टेस्ट चलाने के लिए बॉयलरप्लेट प्रोजेक्ट।
- फ्रेमवर्क्स
    - WebdriverIO (v8)
    - Cucumber (v8)

- विशेषताएं
    - [Headspin](https://www.headspin.io/) के साथ क्लाउड इंटिग्रेशन
    - पेज ऑब्जेक्ट मॉडल का समर्थन करता है
    - BDD के डेक्लेरेटिव स्टाइल में लिखे गए सैंपल सिनारियो शामिल हैं
    - एकीकृत cucumber html रिपोर्ट्स

# v7 बॉयलरप्लेट प्रोजेक्ट्स
---

## [webdriverio/appium-boilerplate](https://github.com/webdriverio/appium-boilerplate/)

निम्नलिखित के लिए WebdriverIO के साथ Appium टेस्ट चलाने के लिए बॉयलरप्लेट प्रोजेक्ट:

- iOS/Android नेटिव ऐप्स
- iOS/Android हाइब्रिड ऐप्स
- Android Chrome और iOS Safari ब्राउज़र

इस बॉयलरप्लेट में निम्नलिखित शामिल हैं:

- फ्रेमवर्क: Mocha
- विशेषताएं:
    - इनके लिए कॉन्फिग:
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
Mocha, WebdriverIO v6 के साथ PageObject के साथ ATDD WEB टेस्ट

- फ्रेमवर्क्स
  - WebdriverIO (v7)
  - Mocha
- विशेषताएं
  - [पेज ऑब्जेक्ट](pageobjects) मॉडल
  - [Sauce Service](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-sauce-service/README.md) के साथ Sauce Labs इंटिग्रेशन
  - Allure रिपोर्ट
  - फेल टेस्ट के लिए स्वचालित स्क्रीनशॉट कैप्चर
  - CircleCI उदाहरण
  - ESLint

## [WarleyGabriel/demo-webdriverio-mocha](https://github.com/WarleyGabriel/demo-webdriverio-mocha)

Mocha के साथ E2E टेस्ट चलाने के लिए बॉयलरप्लेट प्रोजेक्ट।

- फ्रेमवर्क्स:
    - WebdriverIO (v7)
    - Mocha
- विशेषताएं:
    -   TypeScript
    -   [Expect-webdriverio](https://github.com/webdriverio/expect-webdriverio)
    -   [विजुअल रिग्रेशन टेस्ट्स](https://github.com/wswebcreation/wdio-image-comparison-service)
    -   पेज ऑब्जेक्ट पैटर्न
    -   [कमिट लिंट](https://github.com/conventional-changelog/commitlint) और [कमिटिज़ेन](https://github.com/commitizen/cz-cli#making-your-repo-commitizen-friendly)
    -   ESlint
    -   प्रेटियर
    -   हस्की
    -   Github एक्शन्स उदाहरण
    -   Allure रिपोर्ट (विफलता पर स्क्रीनशॉट)

## [17thSep/WebdriverIO_Master](https://github.com/17thSep/WebdriverIO_Master)

निम्नलिखित के लिए **WebdriverIO v7** टेस्ट चलाने के लिए बॉयलरप्लेट प्रोजेक्ट:

[Cucumber फ्रेमवर्क में TypeScript के साथ WDIO 7 स्क्रिप्ट](https://github.com/17thSep/WebdriverIO_Master/tree/master/TypeScript/Cucumber)
[Mocha फ्रेमवर्क में TypeScript के साथ WDIO 7 स्क्रिप्ट](https://github.com/17thSep/WebdriverIO_Master/tree/master/TypeScript/Mocha)
[डॉकर में WDIO 7 स्क्रिप्ट चलाएं](https://github.com/17thSep/WebdriverIO_Master/tree/master/TypeScript/Docker)
[नेटवर्क लॉग्स](https://github.com/17thSep/MonitorNetworkLogs/)

इनके लिए बॉयलर प्लेट प्रोजेक्ट:

- नेटवर्क लॉग्स कैप्चर करें
- सभी GET/POST कॉल या किसी विशिष्ट REST API को कैप्चर करें
- रिक्वेस्ट पैरामीटर्स का एसर्शन करें
- रिस्पांस पैरामीटर्स का एसर्शन करें
- सभी रिस्पांस को अलग फाइल में स्टोर करें

## [Arjun-Ar91/Wdio7-appium-cucumber](https://github.com/Arjun-Ar91/Wdio7-appium-cucumber.git)

पेज ऑब्जेक्ट पैटर्न के साथ cucumber v7 और wdio v7 का उपयोग करके नेटिव और मोबाइल ब्राउज़र के लिए appium टेस्ट चलाने के लिए बॉयलरप्लेट प्रोजेक्ट।

- फ्रेमवर्क्स
    - WebdriverIO v7
    - Cucumber v7
    - Appium

- विशेषताएं
    - नेटिव Android और iOS ऐप्स
    - Android Chrome ब्राउज़र
    - iOS Safari ब्राउज़र
    - पेज ऑब्जेक्ट मॉडल
    - cucumber में सैंपल टेस्ट सिनारियो शामिल हैं
    - मल्टीपल cucumber html रिपोर्ट्स के साथ एकीकृत

## [praveendvd/webdriverIODockerBoilerplate/](https://github.com/praveendvd/webdriverIODockerBoilerplate)

यह एक टेम्पलेट प्रोजेक्ट है जो आपको दिखाने में मदद करता है कि आप नवीनतम WebdriverIO और Cucumber फ्रेमवर्क का उपयोग करके वेब एप्लिकेशन से webdriverio टेस्ट कैसे चला सकते हैं। यह प्रोजेक्ट एक बेसलाइन इमेज के रूप में कार्य करना चाहता है जिसका उपयोग आप यह समझने के लिए कर सकते हैं कि डॉकर में WebdriverIO टेस्ट कैसे चलाएं।

इस प्रोजेक्ट में शामिल हैं:

- DockerFile
- cucumber प्रोजेक्ट

अधिक पढ़ें: [Medium Blog](https://praveendavidmathew.medium.com/running-webdriverio-in-wsl2-windows-91d3a0dc7746)

## [praveendvd/WebdriverIO_electronAppAutomation_boilerplate/](https://github.com/praveendvd/WebdriverIO_electronAppAutomation_boilerplate)

यह एक टेम्पलेट प्रोजेक्ट है जो आपको दिखाने में मदद करता है कि आप WebdriverIO का उपयोग करके electronJS टेस्ट कैसे चला सकते हैं। यह प्रोजेक्ट एक बेसलाइन इमेज के रूप में कार्य करना चाहता है जिसका उपयोग आप यह समझने के लिए कर सकते हैं कि WebdriverIO electronJS टेस्ट कैसे चलाएं।

इस प्रोजेक्ट में शामिल है:

- सैंपल electronjs ऐप
- सैंपल cucumber टेस्ट स्क्रिप्ट

अधिक पढ़ें: [Medium Blog](https://praveendavidmathew.medium.com/first-step-into-automation-of-electronjs-applications-ef89b7423ddd)

## [praveendvd/webdriverIO_winappdriver_boilerplate/](https://github.com/praveendvd/webdriverIO_winappdriver_boilerplate)

यह एक टेम्पलेट प्रोजेक्ट है जो आपको दिखाने में मदद करता है कि आप winappdriver और WebdriverIO का उपयोग करके विंडोज एप्लिकेशन को कैसे ऑटोमेट कर सकते हैं। यह प्रोजेक्ट एक बेसलाइन इमेज के रूप में कार्य करना चाहता है जिसका उपयोग आप यह समझने के लिए कर सकते हैं कि windappdriver और WebdriverIO टेस्ट कैसे चलाएं।

अधिक पढ़ें: [Medium Blog](https://praveendavidmathew.medium.com/winappdriver-first-step-into-windows-app-test-automation-using-webdriverio-and-winappdriver-46320d89570b)

## [praveendvd/appium-chromedriver-multiremote-wdio-boilerplate/](https://github.com/praveendvd/appium-chromedriver-multiremote-wdio-boilerplate)


यह एक टेम्पलेट प्रोजेक्ट है जो आपको दिखाने में मदद करता है कि आप नवीनतम WebdriverIO और Jasmine फ्रेमवर्क के साथ webdriverio मल्टिरिमोट क्षमता कैसे चला सकते हैं। यह प्रोजेक्ट एक बेसलाइन इमेज के रूप में कार्य करना चाहता है जिसका उपयोग आप यह समझने के लिए कर सकते हैं कि डॉकर में WebdriverIO टेस्ट कैसे चलाएं।

इस प्रोजेक्ट में उपयोग होता है:
     - chromedriver
     - jasmine
     - appium

## [webdriverio-roku-appium-boilerplate](https://github.com/AntonKostenko/webdriverIO-roku-appium)

पेज ऑब्जेक्ट पैटर्न के साथ mocha का उपयोग करके वास्तविक Roku डिवाइसों पर appium टेस्ट चलाने के लिए टेम्पलेट प्रोजेक्ट।

- फ्रेमवर्क्स
    - WebdriverIO Async v7
    - Appium 2.0
    - Mocha v7
    - Allure रिपोर्टिंग

- विशेषताएं
    - पेज ऑब्जेक्ट मॉडल
    - Typescript
    - विफलता पर स्क्रीनशॉट
    - एक सैंपल Roku चैनल का उपयोग करके उदाहरण टेस्ट

## [krishnapollu/wdio-cucumber-poc](https://github.com/krishnapollu/wdio-cucumber-poc)

E2E मल्टिरिमोट Cucumber टेस्ट के साथ-साथ डेटा ड्रिवन Mocha टेस्ट के लिए PoC प्रोजेक्ट

- फ्रेमवर्क:
    - Cucumber (v8)
    - WebdriverIO (v8)
    - Mocha (v8)

- विशेषताएं:
    - Cucumber आधारित E2E टेस्ट
    - Mocha आधारित डेटा ड्रिवन टेस्ट
    - केवल वेब टेस्ट - स्थानीय और क्लाउड प्लेटफार्मों में
    - केवल मोबाइल टेस्ट - स्थानीय और रिमोट क्लाउड एमुलेटर (या डिवाइस)
    - वेब + मोबाइल टेस्ट - मल्टिरिमोट - स्थानीय और क्लाउड प्लेटफार्म
    - Allure सहित एकीकृत कई रिपोर्ट्स
    - टेस्ट डेटा (JSON / XLSX) को ग्लोबल रूप से हैंडल किया गया है ताकि टेस्ट एक्सिक्यूशन के बाद डेटा (फ्लाई पर बनाया गया) को फाइल में लिखा जा सके
    - टेस्ट चलाने और allure रिपोर्ट अपलोड करने के लिए Github वर्कफ़्लो

## [Rondleysg/wdio-multiremote-appium-chromedriver-boilerplate](https://github.com/Rondleysg/wdio-multiremote-appium-chromedriver-boilerplate)

यह नवीनतम WebdriverIO के साथ appium और chromedriver सर्विस का उपयोग करके webdriverio मल्टी-रिमोट चलाने का तरीका दिखाने के लिए एक बॉयलरप्लेट प्रोजेक्ट है।

- फ्रेमवर्क्स
  - WebdriverIO (v9)
  - Appium (v2)
  - Mocha

- विशेषताएं
  - [पेज ऑब्जेक्ट](pageobjects) मॉडल
  - Typescript
  - वेब + मोबाइल टेस्ट - मल्टिरिमोट
  - नेटिव Android और iOS ऐप्स
  - Appium
  - Chromedriver
  - ESLint
  - http://the-internet.herokuapp.com और [WebdriverIO नेटिव डेमो ऐप](https://github.com/webdriverio/native-demo-app) में लॉगिन के लिए टेस्ट उदाहरण