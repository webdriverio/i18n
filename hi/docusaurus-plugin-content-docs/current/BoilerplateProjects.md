---
id: boilerplates
title: बॉयलरप्लेट प्रोजेक्ट्स
description: "अपना टेस्ट सूट शुरू करने के लिए Mocha, Jasmine, Cucumber, Electron और मोबाइल सेटअप के साथ WebdriverIO के लिए कम्युनिटी बॉयलरप्लेट प्रोजेक्ट्स देखें।"
---

समय के साथ, हमारी कम्युनिटी ने कई प्रोजेक्ट्स विकसित किए हैं जिनसे आप अपना टेस्ट सूट सेट अप करने के लिए प्रेरणा ले सकते हैं।

# v9 बॉयलरप्लेट प्रोजेक्ट्स

## [webdriverio/cucumber-boilerplate](https://github.com/webdriverio/cucumber-boilerplate)

Cucumber टेस्ट सूट्स के लिए हमारा अपना बॉयलरप्लेट। हमने आपके लिए 150 से अधिक पूर्वनिर्धारित स्टेप डेफिनिशन बनाई हैं, ताकि आप अपने प्रोजेक्ट में तुरंत फ़ीचर फ़ाइलें लिखना शुरू कर सकें।

- फ्रेमवर्क:
    - Cucumber
    - WebdriverIO
- विशेषताएँ:
    - 150 से अधिक पूर्वनिर्धारित स्टेप्स जो आपकी ज़रूरत की लगभग हर चीज़ को कवर करते हैं
    - WebdriverIO की मल्टी-रिमोट कार्यक्षमता को इंटीग्रेट करता है
    - अपना डेमो ऐप

## [webdriverio/jasmine-boilerplate](https://github.com/webdriverio/jasmine-boilerplate)
Babel फ़ीचर्स और पेज ऑब्जेक्ट्स पैटर्न का उपयोग करके Jasmine के साथ WebdriverIO टेस्ट चलाने के लिए बॉयलरप्लेट प्रोजेक्ट।

- फ्रेमवर्क
    - WebdriverIO
    - Jasmine
- विशेषताएँ
    - पेज ऑब्जेक्ट पैटर्न
    - Sauce Labs इंटीग्रेशन

## [webdriverio/electron-boilerplate](https://github.com/webdriverio/electron-boilerplate)
एक न्यूनतम Electron एप्लिकेशन पर WebdriverIO टेस्ट चलाने के लिए बॉयलरप्लेट प्रोजेक्ट।

- फ्रेमवर्क
    - WebdriverIO
    - Mocha
- विशेषताएँ
    - Electron API मॉकिंग

## [syamphaneendra/webdriverio9-boilerplate](https://github.com/syamphaneendra/webdriverio9-boilerplate)

इस बॉयलरप्लेट प्रोजेक्ट में Android और iOS प्लेटफ़ॉर्म के लिए Cucumber, TypeScript और Appium के साथ WebdriverIO 9 मोबाइल टेस्ट हैं, जो पेज ऑब्जेक्ट मॉडल पैटर्न का पालन करते हैं। इसमें व्यापक लॉगिंग, रिपोर्टिंग, मोबाइल जेस्चर, ऐप-से-वेब नेविगेशन और CI/CD इंटीग्रेशन शामिल हैं।

- फ्रेमवर्क:
    - WebdriverIO v9
    - Cucumber v9
    - Appium v2.5
    - TypeScript v5

- विशेषताएँ:
    - मल्टी-प्लेटफ़ॉर्म सपोर्ट
      - Android (UiAutomator2)
      - iOS (XCUITest)
    - मोबाइल जेस्चर
      - स्क्रॉल
      - स्वाइप
      - लॉन्ग प्रेस
      - कीबोर्ड छिपाना
    - ऐप-से-वेब नेविगेशन
      - कॉन्टेक्स्ट स्विचिंग
      - WebView सपोर्ट
      - ब्राउज़र ऑटोमेशन (Chrome/Safari)
    - नई ऐप स्थिति
      - सिनेरियो के बीच स्वचालित ऐप रीसेट
      - कॉन्फ़िगर करने योग्य रीसेट व्यवहार (noReset, fullReset)
    - डिवाइस कॉन्फ़िगरेशन
      - केंद्रीकृत डिवाइस प्रबंधन
      - आसान प्लेटफ़ॉर्म स्विचिंग
    - JavaScript / TypeScript के लिए डायरेक्टरी संरचना का उदाहरण। नीचे JS संस्करण के लिए है, TS संस्करण की संरचना भी समान है।

## [amiya-pattnaik/wdio-testgen-from-gherkin-js](https://github.com/amiya-pattnaik/wdio-testgen-from-gherkin-js)
## [amiya-pattnaik/wdio-testgen-from-gherkin-ts](https://github.com/amiya-pattnaik/wdio-testgen-from-gherkin-ts)
Gherkin .feature फ़ाइलों से WebdriverIO पेज ऑब्जेक्ट क्लासेस और Mocha टेस्ट स्पेक्स स्वचालित रूप से जनरेट करें — मैन्युअल प्रयास कम करें, एकरूपता बढ़ाएँ और QA ऑटोमेशन को तेज़ करें। यह प्रोजेक्ट न केवल webdriver.io के साथ संगत कोड बनाता है, बल्कि webdriver.io की सभी कार्यक्षमताओं को भी बेहतर बनाता है। हमने दो संस्करण बनाए हैं, एक JavaScript उपयोगकर्ताओं के लिए और दूसरा TypeScript उपयोगकर्ताओं के लिए। लेकिन दोनों प्रोजेक्ट एक ही तरीके से काम करते हैं।

***यह कैसे काम करता है?***
- यह प्रक्रिया दो-चरणीय ऑटोमेशन का पालन करती है:
- चरण 1: Gherkin से stepMap (stepMap.json फ़ाइलें जनरेट करें)
  - stepMap.json फ़ाइलें जनरेट करें:
    - Gherkin सिंटैक्स में लिखी .feature फ़ाइलों को पार्स करता है।
    - सिनेरियो और स्टेप्स निकालता है।
    - एक संरचित .stepMap.json फ़ाइल बनाता है जिसमें शामिल हैं:
      - करने के लिए action (जैसे, click, setText, assertVisible)
      - लॉजिकल मैपिंग के लिए selectorName
      - DOM एलिमेंट के लिए selector
      - वैल्यूज़ या असर्शन के लिए note
- चरण 2: stepMap से कोड (WebdriverIO कोड जनरेट करें)।
  stepMap.json का उपयोग करके जनरेट करता है:
  - साझा मेथड्स और browser.url() सेटअप के साथ एक बेस page.js क्लास जनरेट करें।
  - test/pageobjects/ के अंदर प्रत्येक फ़ीचर के लिए WebdriverIO-संगत पेज ऑब्जेक्ट मॉडल (POM) क्लासेस जनरेट करें।
  - Mocha-आधारित टेस्ट स्पेक्स जनरेट करें।
- JavaScript / TypeScript के लिए डायरेक्टरी संरचना का उदाहरण। नीचे JS संस्करण के लिए है, TS संस्करण की संरचना भी समान है।
```
project-root/
├── features/                   # Gherkin .feature फ़ाइलें (उपयोगकर्ता इनपुट / स्रोत फ़ाइल)
├── stepMaps/                   # स्वतः-जनरेटेड .stepMap.json फ़ाइलें
├── test/
│   ├── pageobjects/            # स्वतः-जनरेटेड WebdriverIO टेस्ट पेज ऑब्जेक्ट मॉडल क्लासेस
│   └── specs/                  # स्वतः-जनरेटेड Mocha टेस्ट स्पेक्स
├── src/
│   ├── cli.js                  # मुख्य CLI लॉजिक
│   ├── generateStepsMap.js     # फ़ीचर-से-stepMap जनरेटर
│   ├── generateTestsFromMap.js # stepMap-से-page/spec जनरेटर
│   ├── utils.js                # हेल्पर मेथड्स
│   └── config.js               # पाथ, फ़ॉलबैक सेलेक्टर, एलियास
│   └── __tests__/              # यूनिट टेस्ट (Vitest)
├── testgen.js                  # CLI एंट्री पॉइंट
│── wdio.config.js              # WebdriverIO कॉन्फ़िगरेशन
├── package.json                # स्क्रिप्ट्स और डिपेंडेंसीज़
├── selector-aliases.json       # वैकल्पिक उपयोगकर्ता-परिभाषित सेलेक्टर जो प्राथमिक सेलेक्टर को ओवरराइड करता है
```
---
# v8 बॉयलरप्लेट प्रोजेक्ट्स

## [amiya-pattnaik/webdriverIO-with-cucumberBDD](https://github.com/amiya-pattnaik/webdriverIO-with-cucumberBDD)

- फ्रेमवर्क: Cucumber (V8x) के साथ WDIO-V8।
- विशेषताएँ:
    - ES6 /ES7 स्टाइल क्लास-आधारित दृष्टिकोण और TypeScript सपोर्ट के साथ पेज ऑब्जेक्ट्स मॉडल का उपयोग
    - एक साथ एक से अधिक सेलेक्टर के साथ एलिमेंट क्वेरी करने के लिए मल्टी सेलेक्टर विकल्प के उदाहरण
    - Chrome और Firefox का उपयोग करके मल्टी ब्राउज़र और हेडलेस ब्राउज़र एक्ज़ीक्यूशन के उदाहरण
    - BrowserStack, Sauce Labs, TestMu AI (पूर्व में LambdaTest) के साथ क्लाउड टेस्टिंग इंटीग्रेशन
    - बाहरी डेटा स्रोतों से आसान टेस्ट डेटा प्रबंधन के लिए MS-Excel से डेटा पढ़ने/लिखने के उदाहरण
    - किसी भी RDBMS (Oracle, MySql, TeraData, Vertica आदि) के लिए डेटाबेस सपोर्ट, E2E टेस्टिंग के उदाहरणों के साथ कोई भी क्वेरी चलाना / रिज़ल्ट सेट प्राप्त करना आदि
    - मल्टीपल रिपोर्टिंग (Spec, Xunit/Junit, Allure, JSON) और WebServer पर Allure और Xunit/Junit रिपोर्टिंग होस्ट करना।
    - डेमो ऐप https://search.yahoo.com/ और http://the-internet.herokuapp.com के साथ उदाहरण।
    - BrowserStack, Sauce Labs, TestMu AI (पूर्व में LambdaTest) और Appium विशिष्ट `.config` फ़ाइल (मोबाइल डिवाइस पर प्लेबैक के लिए)। iOS और Android के लिए लोकल मशीन पर वन क्लिक Appium सेटअप के लिए [appium-setup-made-easy-OSX](https://github.com/amiya-pattnaik/appium-setup-made-easy-OSX) देखें।

## [amiya-pattnaik/webdriverIO-with-mochaBDD](https://github.com/amiya-pattnaik/webdriverIO-with-mochaBDD)

- फ्रेमवर्क: Mocha (V10x) के साथ WDIO-V8।
- विशेषताएँ:
    -  ES6 /ES7 स्टाइल क्लास-आधारित दृष्टिकोण और TypeScript सपोर्ट के साथ पेज ऑब्जेक्ट्स मॉडल का उपयोग
    -  डेमो ऐप https://search.yahoo.com और http://the-internet.herokuapp.com के साथ उदाहरण
    -  Chrome और Firefox का उपयोग करके मल्टी ब्राउज़र और हेडलेस ब्राउज़र एक्ज़ीक्यूशन के उदाहरण
    -  BrowserStack, Sauce Labs, TestMu AI (पूर्व में LambdaTest) के साथ क्लाउड टेस्टिंग इंटीग्रेशन
    -  मल्टीपल रिपोर्टिंग (Spec, Xunit/Junit, Allure, JSON) और WebServer पर Allure और Xunit/Junit रिपोर्टिंग होस्ट करना।
    -  बाहरी डेटा स्रोतों से आसान टेस्ट डेटा प्रबंधन के लिए MS-Excel से डेटा पढ़ने/लिखने के उदाहरण
    -  किसी भी RDBMS (Oracle, MySql, TeraData, Vertica आदि) से DB कनेक्ट करने, कोई भी क्वेरी चलाने / रिज़ल्ट सेट प्राप्त करने आदि के उदाहरण, E2E टेस्टिंग के उदाहरणों के साथ
    -  BrowserStack, Sauce Labs, TestMu AI (पूर्व में LambdaTest) और Appium विशिष्ट `.config` फ़ाइल (मोबाइल डिवाइस पर प्लेबैक के लिए)। iOS और Android के लिए लोकल मशीन पर वन क्लिक Appium सेटअप के लिए [appium-setup-made-easy-OSX](https://github.com/amiya-pattnaik/appium-setup-made-easy-OSX) देखें।

## [amiya-pattnaik/webdriverIO-with-jasmineBDD](https://github.com/amiya-pattnaik/webdriverIO-with-jasmineBDD)

- फ्रेमवर्क: Jasmine (V4x) के साथ WDIO-V8।
- विशेषताएँ:
    -  ES6 /ES7 स्टाइल क्लास-आधारित दृष्टिकोण और TypeScript सपोर्ट के साथ पेज ऑब्जेक्ट्स मॉडल का उपयोग
    -  डेमो ऐप https://search.yahoo.com और http://the-internet.herokuapp.com के साथ उदाहरण
    -  Chrome और Firefox का उपयोग करके मल्टी ब्राउज़र और हेडलेस ब्राउज़र एक्ज़ीक्यूशन के उदाहरण
    -  BrowserStack, Sauce Labs, TestMu AI (पूर्व में LambdaTest) के साथ क्लाउड टेस्टिंग इंटीग्रेशन
    -  मल्टीपल रिपोर्टिंग (Spec, Xunit/Junit, Allure, JSON) और WebServer पर Allure और Xunit/Junit रिपोर्टिंग होस्ट करना।
    -  बाहरी डेटा स्रोतों से आसान टेस्ट डेटा प्रबंधन के लिए MS-Excel से डेटा पढ़ने/लिखने के उदाहरण
    -  किसी भी RDBMS (Oracle, MySql, TeraData, Vertica आदि) से DB कनेक्ट करने, कोई भी क्वेरी चलाने / रिज़ल्ट सेट प्राप्त करने आदि के उदाहरण, E2E टेस्टिंग के उदाहरणों के साथ
    -  BrowserStack, Sauce Labs, TestMu AI (पूर्व में LambdaTest) और Appium विशिष्ट `.config` फ़ाइल (मोबाइल डिवाइस पर प्लेबैक के लिए)। iOS और Android के लिए लोकल मशीन पर वन क्लिक Appium सेटअप के लिए [appium-setup-made-easy-OSX](https://github.com/amiya-pattnaik/appium-setup-made-easy-OSX) देखें।

## [syamphaneendra/webdriverio-web-mobile-boilerplate](https://github.com/syamphaneendra/webdriverio-web-mobile-boilerplate)

इस बॉयलरप्लेट प्रोजेक्ट में cucumber और typescript के साथ WebdriverIO 8 टेस्ट हैं, जो पेज ऑब्जेक्ट्स पैटर्न का पालन करते हैं।

- फ्रेमवर्क:
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
    - क्रॉसब्राउज़र पैरेलल एक्ज़ीक्यूशन
    - Appium
    - BrowserStack और Sauce Labs के साथ क्लाउड टेस्टिंग इंटीग्रेशन
    - Docker सर्विस
    - डेटा साझा करने की सर्विस
    - प्रत्येक सर्विस के लिए अलग कॉन्फ़िग फ़ाइलें
    - टेस्टडेटा प्रबंधन और उपयोगकर्ता प्रकार के अनुसार पढ़ना
    - रिपोर्टिंग
      - Dot
      - Spec
      - विफलता स्क्रीनशॉट के साथ मल्टीपल cucumber html रिपोर्ट
    - Gitlab रिपॉज़िटरी के लिए Gitlab पाइपलाइन्स
    - Github रिपॉज़िटरी के लिए Github actions
    - docker hub सेट अप करने के लिए Docker compose
    - AXE का उपयोग करके एक्सेसिबिलिटी टेस्टिंग
    - Applitools का उपयोग करके विज़ुअल टेस्टिंग
    - लॉग मैकेनिज़्म


## [klassijs/klassi-js (cucumber-template)](https://github.com/klassijs/klassi-example-test-suite.git)

- फ्रेमवर्क
    - WebdriverIO (v8)
    - Cucumber (v8)

- विशेषताएँ
    - cucumber में नमूना टेस्ट सिनेरियो शामिल है
    - विफलताओं पर एम्बेडेड वीडियो के साथ इंटीग्रेटेड cucumber html रिपोर्ट्स
    - इंटीग्रेटेड Lambdatest और CircleCI सर्विसेज़
    - इंटीग्रेटेड विज़ुअल, एक्सेसिबिलिटी और API टेस्टिंग
    - इंटीग्रेटेड ईमेल कार्यक्षमता
    - टेस्ट रिपोर्ट्स के भंडारण और पुनर्प्राप्ति के लिए इंटीग्रेटेड s3 बकेट

## [serenity-js/serenity-js-mocha-webdriverio-template/](https://github.com/serenity-js/serenity-js-mocha-webdriverio-template/)

नवीनतम WebdriverIO, Mocha और Serenity/JS का उपयोग करके अपने वेब एप्लिकेशन की एक्सेप्टेंस टेस्टिंग शुरू करने में मदद के लिए [Serenity/JS](https://serenity-js.org?pk_campaign=wdio8&pk_source=webdriver.io) टेम्पलेट प्रोजेक्ट।

- फ्रेमवर्क
    - WebdriverIO (v8)
    - Mocha (v10)
    - Serenity/JS (v3)
    - Serenity BDD रिपोर्टिंग

- विशेषताएँ
    - [Screenplay Pattern](https://serenity-js.org/handbook/design/screenplay-pattern/?pk_campaign=wdio8&pk_source=webdriver.io)
    - टेस्ट विफलता पर स्वचालित स्क्रीनशॉट, रिपोर्ट्स में एम्बेडेड
    - [GitHub Actions](https://github.com/serenity-js/serenity-js-mocha-webdriverio-template/blob/main/.github/workflows/main.yml) का उपयोग करके कंटीन्यूअस इंटीग्रेशन (CI) सेटअप
    - GitHub Pages पर प्रकाशित [Demo Serenity BDD reports](https://serenity-js.github.io/serenity-js-mocha-webdriverio-template/)
    - TypeScript
    - ESLint

## [serenity-js/serenity-js-cucumber-webdriverio-template/](https://github.com/serenity-js/serenity-js-cucumber-webdriverio-template/)

नवीनतम WebdriverIO, Cucumber और Serenity/JS का उपयोग करके अपने वेब एप्लिकेशन की एक्सेप्टेंस टेस्टिंग शुरू करने में मदद के लिए [Serenity/JS](https://serenity-js.org?pk_campaign=wdio8&pk_source=webdriver.io) टेम्पलेट प्रोजेक्ट।

- फ्रेमवर्क
    - WebdriverIO (v8)
    - Cucumber (v9)
    - Serenity/JS (v3)
    - Serenity BDD रिपोर्टिंग

- विशेषताएँ
    - [Screenplay Pattern](https://serenity-js.org/handbook/design/screenplay-pattern/?pk_campaign=wdio8&pk_source=webdriver.io)
    - टेस्ट विफलता पर स्वचालित स्क्रीनशॉट, रिपोर्ट्स में एम्बेडेड
    - [GitHub Actions](https://github.com/serenity-js/serenity-js-cucumber-webdriverio-template/blob/main/.github/workflows/main.yml) का उपयोग करके कंटीन्यूअस इंटीग्रेशन (CI) सेटअप
    - GitHub Pages पर प्रकाशित [Demo Serenity BDD reports](https://serenity-js.github.io/serenity-js-mocha-webdriverio-template/)
    - TypeScript
    - ESLint

## [Muralijc/wdio-headspin-boilerplate](https://github.com/Muralijc/Wdio-Headspin-boilerplate/)
Cucumber फ़ीचर्स और पेज ऑब्जेक्ट्स पैटर्न का उपयोग करके Headspin Cloud (https://www.headspin.io/) में WebdriverIO टेस्ट चलाने के लिए बॉयलरप्लेट प्रोजेक्ट।
- फ्रेमवर्क
    - WebdriverIO (v8)
    - Cucumber (v8)

- विशेषताएँ
    - [Headspin](https://www.headspin.io/) के साथ क्लाउड इंटीग्रेशन
    - पेज ऑब्जेक्ट मॉडल को सपोर्ट करता है
    - BDD की डिक्लेरेटिव शैली में लिखे नमूना सिनेरियो शामिल हैं
    - इंटीग्रेटेड cucumber html रिपोर्ट्स

# v7 बॉयलरप्लेट प्रोजेक्ट्स
---

## [webdriverio/appium-boilerplate](https://github.com/webdriverio/appium-boilerplate/)

निम्नलिखित के लिए WebdriverIO के साथ Appium टेस्ट चलाने के लिए बॉयलरप्लेट प्रोजेक्ट:

- iOS/Android नेटिव ऐप्स
- iOS/Android हाइब्रिड ऐप्स
- Android Chrome और iOS Safari ब्राउज़र

इस बॉयलरप्लेट में निम्नलिखित शामिल हैं:

- फ्रेमवर्क: Mocha
- विशेषताएँ:
    - इनके लिए कॉन्फ़िग्स:
        - iOS और Android ऐप
        - iOS और Android ब्राउज़र
    - इनके लिए हेल्पर्स:
        - WebView
        - जेस्चर
        - नेटिव अलर्ट
        - पिकर्स
     - इनके लिए टेस्ट उदाहरण:
        - WebView
        - लॉगिन
        - फ़ॉर्म्स
        - स्वाइप
        - ब्राउज़र

## [serhatbolsu/webdriverio-mocha-uiautomation-boiler](https://github.com/serhatbolsu/webdriverio-mocha-uiautomation-boiler)
PageObject के साथ Mocha, WebdriverIO v6 के साथ ATDD वेब टेस्ट

- फ्रेमवर्क
  - WebdriverIO (v7)
  - Mocha
- विशेषताएँ
  - [Page Object](pageobjects) मॉडल
  - [Sauce Service](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-sauce-service/README.md) के साथ Sauce Labs इंटीग्रेशन
  - Allure रिपोर्ट
  - विफल टेस्ट के लिए स्वचालित स्क्रीनशॉट कैप्चर
  - CircleCI उदाहरण
  - ESLint

## [WarleyGabriel/demo-webdriverio-mocha](https://github.com/WarleyGabriel/demo-webdriverio-mocha)

Mocha के साथ E2E टेस्ट चलाने के लिए बॉयलरप्लेट प्रोजेक्ट।

- फ्रेमवर्क:
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

[WDIO 7 scripts with TypeScript in Cucumber Framework](https://github.com/17thSep/WebdriverIO_Master/tree/master/TypeScript/Cucumber)
[WDIO 7 scripts with TypeScript in Mocha Framework](https://github.com/17thSep/WebdriverIO_Master/tree/master/TypeScript/Mocha)
[Run WDIO 7 script in Docker](https://github.com/17thSep/WebdriverIO_Master/tree/master/TypeScript/Docker)
[Network logs](https://github.com/17thSep/MonitorNetworkLogs/)

इनके लिए बॉयलरप्लेट प्रोजेक्ट:

- नेटवर्क लॉग्स कैप्चर करना
- सभी GET/POST कॉल्स या किसी विशिष्ट REST API को कैप्चर करना
- रिक्वेस्ट पैरामीटर्स को असर्ट करना
- रिस्पॉन्स पैरामीटर्स को असर्ट करना
- सभी रिस्पॉन्स को एक अलग फ़ाइल में संग्रहीत करना

## [Arjun-Ar91/Wdio7-appium-cucumber](https://github.com/Arjun-Ar91/Wdio7-appium-cucumber.git)

पेज ऑब्जेक्ट पैटर्न के साथ cucumber v7 और wdio v7 का उपयोग करके नेटिव और मोबाइल ब्राउज़र के लिए appium टेस्ट चलाने के लिए बॉयलरप्लेट प्रोजेक्ट।

- फ्रेमवर्क
    - WebdriverIO v7
    - Cucumber v7
    - Appium

- विशेषताएँ
    - नेटिव Android और iOS ऐप्स
    - Android Chrome ब्राउज़र
    - iOS Safari ब्राउज़र
    - पेज ऑब्जेक्ट मॉडल
    - cucumber में नमूना टेस्ट सिनेरियो शामिल हैं
    - मल्टीपल cucumber html रिपोर्ट्स के साथ इंटीग्रेटेड

## [praveendvd/webdriverIODockerBoilerplate/](https://github.com/praveendvd/webdriverIODockerBoilerplate)

यह एक टेम्पलेट प्रोजेक्ट है जो यह दिखाने में मदद करता है कि आप नवीनतम WebdriverIO और Cucumber फ्रेमवर्क का उपयोग करके वेब एप्लिकेशन से webdriverio टेस्ट कैसे चला सकते हैं। इस प्रोजेक्ट का उद्देश्य एक बेसलाइन इमेज के रूप में काम करना है जिसका उपयोग आप यह समझने के लिए कर सकते हैं कि docker में WebdriverIO टेस्ट कैसे चलाएँ

इस प्रोजेक्ट में शामिल हैं:

- DockerFile
- cucumber प्रोजेक्ट

अधिक पढ़ें: [Medium Blog](https://praveendavidmathew.medium.com/running-webdriverio-in-wsl2-windows-91d3a0dc7746)

## [praveendvd/WebdriverIO_electronAppAutomation_boilerplate/](https://github.com/praveendvd/WebdriverIO_electronAppAutomation_boilerplate)

यह एक टेम्पलेट प्रोजेक्ट है जो यह दिखाने में मदद करता है कि आप WebdriverIO का उपयोग करके electronJS टेस्ट कैसे चला सकते हैं। इस प्रोजेक्ट का उद्देश्य एक बेसलाइन इमेज के रूप में काम करना है जिसका उपयोग आप यह समझने के लिए कर सकते हैं कि WebdriverIO electronJS टेस्ट कैसे चलाएँ।

इस प्रोजेक्ट में शामिल हैं:

- नमूना electronjs ऐप
- नमूना cucumber टेस्ट स्क्रिप्ट्स

अधिक पढ़ें: [Medium Blog](https://praveendavidmathew.medium.com/first-step-into-automation-of-electronjs-applications-ef89b7423ddd)

## [praveendvd/webdriverIO_winappdriver_boilerplate/](https://github.com/praveendvd/webdriverIO_winappdriver_boilerplate)

यह एक टेम्पलेट प्रोजेक्ट है जो यह दिखाने में मदद करता है कि आप winappdriver और WebdriverIO का उपयोग करके विंडोज़ एप्लिकेशन को कैसे ऑटोमेट कर सकते हैं। इस प्रोजेक्ट का उद्देश्य एक बेसलाइन इमेज के रूप में काम करना है जिसका उपयोग आप यह समझने के लिए कर सकते हैं कि windappdriver और WebdriverIO टेस्ट कैसे चलाएँ।

अधिक पढ़ें: [Medium Blog](https://praveendavidmathew.medium.com/winappdriver-first-step-into-windows-app-test-automation-using-webdriverio-and-winappdriver-46320d89570b)

## [praveendvd/appium-chromedriver-multiremote-wdio-boilerplate/](https://github.com/praveendvd/appium-chromedriver-multiremote-wdio-boilerplate)


यह एक टेम्पलेट प्रोजेक्ट है जो यह दिखाने में मदद करता है कि आप नवीनतम WebdriverIO और Jasmine फ्रेमवर्क के साथ webdriverio मल्टी-रिमोट क्षमता कैसे चला सकते हैं। इस प्रोजेक्ट का उद्देश्य एक बेसलाइन इमेज के रूप में काम करना है जिसका उपयोग आप यह समझने के लिए कर सकते हैं कि docker में WebdriverIO टेस्ट कैसे चलाएँ

यह प्रोजेक्ट उपयोग करता है:
     - chromedriver
     - jasmine
     - appium

## [webdriverio-roku-appium-boilerplate](https://github.com/AntonKostenko/webdriverIO-roku-appium)

पेज ऑब्जेक्ट पैटर्न के साथ mocha का उपयोग करके वास्तविक Roku डिवाइस पर appium टेस्ट चलाने के लिए टेम्पलेट प्रोजेक्ट।

- फ्रेमवर्क
    - WebdriverIO Async v7
    - Appium 3.0
    - Mocha v7
    - Allure रिपोर्टिंग

- विशेषताएँ
    - पेज ऑब्जेक्ट मॉडल
    - Typescript
    - विफलता पर स्क्रीनशॉट
    - एक नमूना Roku चैनल का उपयोग करके उदाहरण टेस्ट

## [krishnapollu/wdio-cucumber-poc](https://github.com/krishnapollu/wdio-cucumber-poc)

E2E मल्टी-रिमोट Cucumber टेस्ट और साथ ही डेटा ड्रिवन Mocha टेस्ट के लिए PoC प्रोजेक्ट

- फ्रेमवर्क:
    - Cucumber (v8)
    - WebdriverIO (v8)
    - Mocha (v8)

- विशेषताएँ:
    - Cucumber आधारित E2E टेस्ट
    - Mocha आधारित डेटा ड्रिवन टेस्ट
    - केवल वेब टेस्ट - लोकल और क्लाउड प्लेटफ़ॉर्म दोनों पर
    - केवल मोबाइल टेस्ट - लोकल और रिमोट क्लाउड एमुलेटर (या डिवाइस) दोनों पर
    - वेब + मोबाइल टेस्ट - मल्टी-रिमोट - लोकल और क्लाउड प्लेटफ़ॉर्म दोनों पर
    - Allure सहित मल्टीपल रिपोर्ट्स इंटीग्रेटेड
    - टेस्ट डेटा ( JSON / XLSX ) को ग्लोबली हैंडल किया जाता है ताकि टेस्ट एक्ज़ीक्यूशन के बाद (तुरंत बनाया गया) डेटा एक फ़ाइल में लिखा जा सके
    - टेस्ट चलाने और allure रिपोर्ट अपलोड करने के लिए Github वर्कफ़्लो

## [Rondleysg/wdio-multiremote-appium-chromedriver-boilerplate](https://github.com/Rondleysg/wdio-multiremote-appium-chromedriver-boilerplate)

यह एक बॉयलरप्लेट प्रोजेक्ट है जो यह दिखाने में मदद करता है कि नवीनतम WebdriverIO के साथ appium और chromedriver सर्विस का उपयोग करके webdriverio मल्टी-रिमोट कैसे चलाएँ।

- फ्रेमवर्क
  - WebdriverIO (v9)
  - Appium (v2)
  - Mocha

- विशेषताएँ
  - [Page Object](pageobjects) मॉडल
  - Typescript
  - वेब + मोबाइल टेस्ट - मल्टी-रिमोट
  - नेटिव Android और iOS ऐप्स
  - Appium
  - Chromedriver
  - ESLint
  - http://the-internet.herokuapp.com और [WebdriverIO native demo app](https://github.com/webdriverio/native-demo-app) में लॉगिन के लिए टेस्ट उदाहरण