---
id: boilerplates
title: बॉयलरप्लेट प्रोजेक्ट्स
---

समय के साथ, हमारे समुदाय ने कई प्रोजेक्ट्स विकसित किए हैं जिन्हें आप अपना स्वयं का टेस्ट सूट सेट करने के लिए प्रेरणा के रूप में उपयोग कर सकते हैं।

# v9 बॉयलरप्लेट प्रोजेक्ट्स

## [webdriverio/cucumber-boilerplate](https://github.com/webdriverio/cucumber-boilerplate)

हमारा अपना बॉयलरप्लेट Cucumber टेस्ट सूट के लिए। हमने आपके लिए 150 से अधिक पूर्वनिर्धारित स्टेप परिभाषाएँ बनाई हैं, ताकि आप अपने प्रोजेक्ट में तुरंत फीचर फाइलें लिखना शुरू कर सकें।

- फ्रेमवर्क:
    - Cucumber
    - WebdriverIO
- विशेषताएँ:
    - 150 से अधिक पूर्वनिर्धारित स्टेप्स जो लगभग सब कुछ कवर करते हैं जिनकी आपको आवश्यकता है
    - WebdriverIO की Multiremote कार्यक्षमता को एकीकृत करता है
    - अपना खुद का डेमो ऐप

## [webdriverio/jasmine-boilerplate](https://github.com/webdriverio/jasmine-boilerplate)
Babel विशेषताओं और पेज ऑब्जेक्ट पैटर्न का उपयोग करके Jasmine के साथ WebdriverIO टेस्ट चलाने के लिए बॉयलरप्लेट प्रोजेक्ट।

- फ्रेमवर्क
    - WebdriverIO
    - Jasmine
- विशेषताएँ
    - पेज ऑब्जेक्ट पैटर्न
    - Sauce Labs एकीकरण

## [webdriverio/electron-boilerplate](https://github.com/webdriverio/electron-boilerplate)
एक न्यूनतम Electron एप्लिकेशन पर WebdriverIO टेस्ट चलाने के लिए बॉयलरप्लेट प्रोजेक्ट।

- फ्रेमवर्क
    - WebdriverIO
    - Mocha
- विशेषताएँ
    - Electron API मॉकिंग

## [amiya-pattnaik/gherkin-to-webdriverIO-test-generator](https://github.com/amiya-pattnaik/gherkin-to-webdriverIO-test-generator)
Gherkin .feature फाइलों से स्वचालित रूप से WebdriverIO पेज ऑब्जेक्ट क्लासेस और Mocha टेस्ट स्पेक्स जनरेट करें - मैनुअल प्रयास कम करें, सुसंगतता बढ़ाएं, और QA ऑटोमेशन को तेज करें। यह प्रोजेक्ट न केवल webdriver.io के साथ संगत कोड उत्पन्न करता है, बल्कि webdriver.io की सभी कार्यक्षमताओं को भी बढ़ाता है।

***यह कैसे काम करता है?***
- प्रक्रिया दो-चरण ऑटोमेशन का पालन करती है:
- स्टेप 1: Gherkin से stepMap (stepMap.json फ़ाइलें जनरेट करें)
  - stepMap.json फाइलें जनरेट करें:
    - Gherkin सिंटैक्स में लिखी .feature फाइलों को पार्स करता है।
    - सिनेरियो और स्टेप्स निकालता है।
    - एक संरचित .stepMap.json फ़ाइल उत्पन्न करता है जिसमें शामिल हैं:
      - कार्य करने के लिए एक्शन (जैसे, click, setText, assertVisible)
      - लॉजिकल मैपिंग के लिए selectorName
      - DOM एलिमेंट के लिए selector
      - मान या असर्शन के लिए नोट
- स्टेप 2: stepMap से कोड (WebdriverIO कोड जनरेट करें)
  stepMap.json का उपयोग करके जनरेट करें:
  - साझा किए गए मेथड्स और browser.url() सेटअप के साथ एक बेस page.js क्लास जनरेट करें।
  - test/pageobjects/ के अंदर प्रति फीचर WebdriverIO-कम्पैटिबल पेज ऑब्जेक्ट मॉडल (POM) क्लासेस जनरेट करें।
  - Mocha-आधारित टेस्ट स्पेक्स जनरेट करें।
- डायरेक्टरी स्ट्रक्चर
```
project-root/
├── features/               # इनपुट Gherkin फीचर फाइलें
├── stepMaps/               # जनरेटेड स्टेप मैप्स (JSON)
├── test/
│   ├── pageobjects/        # जनरेटेड बेस पेज क्लास, पेज ऑब्जेक्ट क्लासेस
│   └── specs/              # जनरेटेड टेस्ट स्पेक्स
├── generateStepMap.js      # StepMap जनरेटर स्क्रिप्ट
├── generateTestsFromMap.js # PageObject + टेस्ट स्पेक स्क्रिप्ट जनरेटर
├── package.json
├── README.md
└── wdio.conf.js
```
---
# v8 बॉयलरप्लेट प्रोजेक्ट्स

## [amiya-pattnaik/webdriverIO-with-cucumberBDD](https://github.com/amiya-pattnaik/webdriverIO-with-cucumberBDD)

- फ्रेमवर्क: WDIO-V8 with Cucumber (V8x)
- विशेषताएँ:
    - पेज ऑब्जेक्ट्स मॉडल ES6 /ES7 स्टाइल क्लास बेस अप्रोच और TypeScript सपोर्ट का उपयोग करता है
    - एक ही समय में एक से अधिक सिलेक्टर के साथ एलिमेंट क्वेरी करने के लिए मल्टी सिलेक्टर विकल्प के उदाहरण
    - Chrome और Firefox का उपयोग करके मल्टी ब्राउज़र और हेडलेस ब्राउज़र एक्जीक्यूशन के उदाहरण
    - BrowserStack, Sauce Labs, LambdaTest के साथ क्लाउड टेस्टिंग एकीकरण
    - E2E टेस्टिंग के लिए उदाहरणों के साथ बाहरी डेटा स्रोतों से आसान टेस्ट डेटा प्रबंधन के लिए MS-Excel से डेटा पढ़ने/लिखने के उदाहरण
    - किसी भी RDBMS (Oracle, MySql, TeraData, Vertica आदि) के लिए डेटाबेस सपोर्ट, किसी भी क्वेरी को एक्जीक्यूट करना / रिजल्ट सेट प्राप्त करना आदि E2E टेस्टिंग के लिए उदाहरणों के साथ
    - मल्टीपल रिपोर्टिंग (Spec, Xunit/Junit, Allure, JSON) और WebServer पर Allure और Xunit/Junit रिपोर्टिंग होस्टिंग।
    - डेमो ऐप https://search.yahoo.com/ और http://the-internet.herokuapp.com के साथ उदाहरण।
    - BrowserStack, Sauce Labs, LambdaTest और Appium विशिष्ट `.config` फाइल (मोबाइल डिवाइस पर प्लेबैक के लिए)। iOS और Android के लिए लोकल मशीन पर वन क्लिक Appium सेटअप के लिए [appium-setup-made-easy-OSX](https://github.com/amiya-pattnaik/appium-setup-made-easy-OSX) देखें।

## [amiya-pattnaik/webdriverIO-with-mochaBDD](https://github.com/amiya-pattnaik/webdriverIO-with-mochaBDD)

- फ्रेमवर्क: WDIO-V8 with Mocha (V10x)
- विशेषताएँ:
    - पेज ऑब्जेक्ट्स मॉडल ES6 /ES7 स्टाइल क्लास बेस अप्रोच और TypeScript सपोर्ट का उपयोग करता है
    - डेमो ऐप https://search.yahoo.com और http://the-internet.herokuapp.com के साथ उदाहरण
    - Chrome और Firefox का उपयोग करके मल्टी ब्राउज़र और हेडलेस ब्राउज़र एक्जीक्यूशन के उदाहरण
    - BrowserStack, Sauce Labs, LambdaTest के साथ क्लाउड टेस्टिंग एकीकरण
    - मल्टीपल रिपोर्टिंग (Spec, Xunit/Junit, Allure, JSON) और WebServer पर Allure और Xunit/Junit रिपोर्टिंग होस्टिंग।
    - बाहरी डेटा स्रोतों से आसान टेस्ट डेटा प्रबंधन के लिए MS-Excel से डेटा पढ़ने/लिखने के उदाहरण
    - E2E टेस्टिंग के लिए उदाहरणों के साथ किसी भी RDBMS (Oracle, MySql, TeraData, Vertica आदि) से DB कनेक्ट करने, किसी भी क्वेरी को एक्जीक्यूट करने / रिजल्ट सेट प्राप्त करने आदि के उदाहरण
    - BrowserStack, Sauce Labs, LambdaTest और Appium विशिष्ट `.config` फाइल (मोबाइल डिवाइस पर प्लेबैक के लिए)। iOS और Android के लिए लोकल मशीन पर वन क्लिक Appium सेटअप के लिए [appium-setup-made-easy-OSX](https://github.com/amiya-pattnaik/appium-setup-made-easy-OSX) देखें।

## [amiya-pattnaik/webdriverIO-with-jasmineBDD](https://github.com/amiya-pattnaik/webdriverIO-with-jasmineBDD)

- फ्रेमवर्क: WDIO-V8 with Jasmine (V4x)
- विशेषताएँ:
    - पेज ऑब्जेक्ट्स मॉडल ES6 /ES7 स्टाइल क्लास बेस अप्रोच और TypeScript सपोर्ट का उपयोग करता है
    - डेमो ऐप https://search.yahoo.com और http://the-internet.herokuapp.com के साथ उदाहरण
    - Chrome और Firefox का उपयोग करके मल्टी ब्राउज़र और हेडलेस ब्राउज़र एक्जीक्यूशन के उदाहरण
    - BrowserStack, Sauce Labs, LambdaTest के साथ क्लाउड टेस्टिंग एकीकरण
    - मल्टीपल रिपोर्टिंग (Spec, Xunit/Junit, Allure, JSON) और WebServer पर Allure और Xunit/Junit रिपोर्टिंग होस्टिंग।
    - बाहरी डेटा स्रोतों से आसान टेस्ट डेटा प्रबंधन के लिए MS-Excel से डेटा पढ़ने/लिखने के उदाहरण
    - E2E टेस्टिंग के लिए उदाहरणों के साथ किसी भी RDBMS (Oracle, MySql, TeraData, Vertica आदि) से DB कनेक्ट करने, किसी भी क्वेरी को एक्जीक्यूट करने / रिजल्ट सेट प्राप्त करने आदि के उदाहरण
    - BrowserStack, Sauce Labs, LambdaTest और Appium विशिष्ट `.config` फाइल (मोबाइल डिवाइस पर प्लेबैक के लिए)। iOS और Android के लिए लोकल मशीन पर वन क्लिक Appium सेटअप के लिए [appium-setup-made-easy-OSX](https://github.com/amiya-pattnaik/appium-setup-made-easy-OSX) देखें।

## [syamphaneendra/webdriverio-web-mobile-boilerplate](https://github.com/syamphaneendra/webdriverio-web-mobile-boilerplate)

इस बॉयलरप्लेट प्रोजेक्ट में पेज ऑब्जेक्ट्स पैटर्न का पालन करते हुए cucumber और typescript के साथ WebdriverIO 8 टेस्ट हैं।

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
    - क्रॉसब्राउज़र पैरेलल एक्जीक्यूशन
    - Appium
    - BrowserStack और Sauce Labs के साथ क्लाउड टेस्टिंग एकीकरण
    - Docker सर्विस
    - शेयर डेटा सर्विस
    - प्रत्येक सर्विस के लिए अलग कॉन्फिग फाइलें
    - टेस्टडेटा प्रबंधन और यूजर टाइप द्वारा रीड
    - रिपोर्टिंग
      - Dot
      - Spec
      - फेलियर स्क्रीनशॉट के साथ मल्टीपल cucumber HTML रिपोर्ट
    - Gitlab रिपॉजिटरी के लिए Gitlab पाइपलाइन्स
    - Github रिपॉजिटरी के लिए Github एक्शन्स
    - Docker हब सेटअप के लिए Docker कंपोज
    - AXE का उपयोग करके एक्सेसिबिलिटी टेस्टिंग
    - Applitools का उपयोग करके विजुअल टेस्टिंग
    - लॉग मैकेनिज़म


## [klassijs/klassi-js (cucumber-template)](https://github.com/klassijs/klassi-example-test-suite.git)

- फ्रेमवर्क
    - WebdriverIO (v8)
    - Cucumber (v8)

- विशेषताएँ
    - cucumber में सैंपल टेस्ट सिनेरियो शामिल है
    - फेलियर पर एम्बेडेड वीडियो के साथ एकीकृत cucumber HTML रिपोर्ट्स
    - Lambdatest और CircleCI सर्विसेज एकीकृत
    - विजुअल, एक्सेसिबिलिटी और API टेस्टिंग एकीकृत
    - ईमेल फंक्शनैलिटी एकीकृत
    - टेस्ट रिपोर्ट्स स्टोरेज और रिट्रीवल के लिए s3 बकेट एकीकृत

## [serenity-js/serenity-js-mocha-webdriverio-template/](https://github.com/serenity-js/serenity-js-mocha-webdriverio-template/)

[Serenity/JS](https://serenity-js.org?pk_campaign=wdio8&pk_source=webdriver.io) टेम्पलेट प्रोजेक्ट आपको नवीनतम WebdriverIO, Mocha, और Serenity/JS का उपयोग करके अपने वेब एप्लिकेशन के स्वीकृति परीक्षण शुरू करने में मदद करता है।

- फ्रेमवर्क
    - WebdriverIO (v8)
    - Mocha (v10)
    - Serenity/JS (v3)
    - Serenity BDD रिपोर्टिंग

- विशेषताएँ
    - [स्क्रीनप्ले पैटर्न](https://serenity-js.org/handbook/design/screenplay-pattern/?pk_campaign=wdio8&pk_source=webdriver.io)
    - टेस्ट फेलियर पर स्वचालित स्क्रीनशॉट, रिपोर्ट्स में एम्बेडेड
    - [GitHub Actions](https://github.com/serenity-js/serenity-js-mocha-webdriverio-template/blob/main/.github/workflows/main.yml) का उपयोग करके कंटिन्यूअस इंटीग्रेशन (CI) सेटअप
    - GitHub Pages पर प्रकाशित [डेमो Serenity BDD रिपोर्ट्स](https://serenity-js.github.io/serenity-js-mocha-webdriverio-template/)
    - TypeScript
    - ESLint

## [serenity-js/serenity-js-cucumber-webdriverio-template/](https://github.com/serenity-js/serenity-js-cucumber-webdriverio-template/)

[Serenity/JS](https://serenity-js.org?pk_campaign=wdio8&pk_source=webdriver.io) टेम्पलेट प्रोजेक्ट आपको नवीनतम WebdriverIO, Cucumber, और Serenity/JS का उपयोग करके अपने वेब एप्लिकेशन के स्वीकृति परीक्षण शुरू करने में मदद करता है।

- फ्रेमवर्क
    - WebdriverIO (v8)
    - Cucumber (v9)
    - Serenity/JS (v3)
    - Serenity BDD रिपोर्टिंग

- विशेषताएँ
    - [स्क्रीनप्ले पैटर्न](https://serenity-js.org/handbook/design/screenplay-pattern/?pk_campaign=wdio8&pk_source=webdriver.io)
    - टेस्ट फेलियर पर स्वचालित स्क्रीनशॉट, रिपोर्ट्स में एम्बेडेड
    - [GitHub Actions](https://github.com/serenity-js/serenity-js-cucumber-webdriverio-template/blob/main/.github/workflows/main.yml) का उपयोग करके कंटिन्यूअस इंटीग्रेशन (CI) सेटअप
    - GitHub Pages पर प्रकाशित [डेमो Serenity BDD रिपोर्ट्स](https://serenity-js.github.io/serenity-js-mocha-webdriverio-template/)
    - TypeScript
    - ESLint

## [Muralijc/wdio-headspin-boilerplate](https://github.com/Muralijc/Wdio-Headspin-boilerplate/)
Cucumber फीचर्स और पेज ऑब्जेक्ट्स पैटर्न का उपयोग करके Headspin Cloud (https://www.headspin.io/) में WebdriverIO टेस्ट चलाने के लिए बॉयलरप्लेट प्रोजेक्ट।
- फ्रेमवर्क
    - WebdriverIO (v8)
    - Cucumber (v8)

- विशेषताएँ
    - [Headspin](https://www.headspin.io/) के साथ क्लाउड एकीकरण
    - पेज ऑब्जेक्ट मॉडल का समर्थन करता है
    - BDD के डिक्लेरेटिव स्टाइल में लिखे गए सैंपल सिनेरियो शामिल हैं
    - एकीकृत cucumber HTML रिपोर्ट्स

# v7 बॉयलरप्लेट प्रोजेक्ट्स
---

## [webdriverio/appium-boilerplate](https://github.com/webdriverio/appium-boilerplate/)

WebdriverIO के साथ Appium टेस्ट चलाने के लिए बॉयलरप्लेट प्रोजेक्ट:

- iOS/Android नेटिव ऐप्स
- iOS/Android हाइब्रिड ऐप्स
- Android Chrome और iOS Safari ब्राउज़र

इस बॉयलरप्लेट में निम्नलिखित शामिल हैं:

- फ्रेमवर्क: Mocha
- विशेषताएँ:
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
PageObject के साथ Mocha, WebdriverIO v6 वाले ATDD WEB टेस्ट

- फ्रेमवर्क
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

- फ्रेमवर्क:
    - WebdriverIO (v7)
    - Mocha
- विशेषताएँ:
    -   TypeScript
    -   [Expect-webdriverio](https://github.com/webdriverio/expect-webdriverio)
    -   [विजुअल रिग्रेशन टेस्ट](https://github.com/wswebcreation/wdio-image-comparison-service)
    -   पेज ऑब्जेक्ट पैटर्न
    -   [Commit lint](https://github.com/conventional-changelog/commitlint) और [Commitizen](https://github.com/commitizen/cz-cli#making-your-repo-commitizen-friendly)
    -   ESlint
    -   Prettier
    -   Husky
    -   Github Actions उदाहरण
    -   Allure रिपोर्ट (फेलियर पर स्क्रीनशॉट)

## [17thSep/WebdriverIO_Master](https://github.com/17thSep/WebdriverIO_Master)

निम्नलिखित के लिए **WebdriverIO v7** टेस्ट चलाने के लिए बॉयलरप्लेट प्रोजेक्ट:

[WDIO 7 scripts with TypeScript in Cucumber Framework](https://github.com/17thSep/WebdriverIO_Master/tree/master/TypeScript/Cucumber)
[WDIO 7 scripts with TypeScript in Mocha Framework](https://github.com/17thSep/WebdriverIO_Master/tree/master/TypeScript/Mocha)
[Run WDIO 7 script in Docker](https://github.com/17thSep/WebdriverIO_Master/tree/master/TypeScript/Docker)
[Network logs](https://github.com/17thSep/MonitorNetworkLogs/)

इसके लिए बॉयलर प्लेट प्रोजेक्ट:

- नेटवर्क लॉग्स कैप्चर करें
- सभी GET/POST कॉल्स या किसी विशिष्ट REST API को कैप्चर करें
- रिक्वेस्ट पैरामीटर्स असर्ट करें
- रिस्पॉन्स पैरामीटर्स असर्ट करें
- सभी रिस्पॉन्स को अलग फाइल में स्टोर करें

## [Arjun-Ar91/Wdio7-appium-cucumber](https://github.com/Arjun-Ar91/Wdio7-appium-cucumber.git)

पेज ऑब्जेक्ट पैटर्न का उपयोग करके cucumber v7 और wdio v7 के साथ नेटिव और मोबाइल ब्राउज़र के लिए appium टेस्ट चलाने के लिए बॉयलरप्लेट प्रोजेक्ट।

- फ्रेमवर्क
    - WebdriverIO v7
    - Cucumber v7
    - Appium

- विशेषताएँ
    - नेटिव Android और iOS ऐप्स
    - Android Chrome ब्राउज़र
    - iOS Safari ब्राउज़र
    - पेज ऑब्जेक्ट मॉडल
    - cucumber में सैंपल टेस्ट सिनेरियो शामिल हैं
    - मल्टिपल cucumber HTML रिपोर्ट्स के साथ एकीकृत

## [praveendvd/webdriverIODockerBoilerplate/](https://github.com/praveendvd/webdriverIODockerBoilerplate)

यह एक टेम्पलेट प्रोजेक्ट है जो आपको यह दिखाने में मदद करता है कि आप नवीनतम WebdriverIO और Cucumber फ्रेमवर्क का उपयोग करके वेब एप्लिकेशन से webdriverio टेस्ट कैसे चला सकते हैं। इस प्रोजेक्ट का उद्देश्य आपको एक बेसलाइन इमेज प्रदान करना है जिसका उपयोग आप यह समझने के लिए कर सकते हैं कि docker में WebdriverIO टेस्ट कैसे चलाएं।

इस प्रोजेक्ट में शामिल हैं:

- DockerFile
- cucumber प्रोजेक्ट

अधिक जानकारी: [Medium Blog](https://praveendavidmathew.medium.com/running-webdriverio-in-wsl2-windows-91d3a0dc7746)

## [praveendvd/WebdriverIO_electronAppAutomation_boilerplate/](https://github.com/praveendvd/WebdriverIO_electronAppAutomation_boilerplate)

यह एक टेम्पलेट प्रोजेक्ट है जो आपको यह दिखाने में मदद करता है कि आप WebdriverIO का उपयोग करके electronJS टेस्ट कैसे चला सकते हैं। इस प्रोजेक्ट का उद्देश्य आपको एक बेसलाइन इमेज प्रदान करना है जिसका उपयोग आप यह समझने के लिए कर सकते हैं कि WebdriverIO electronJS टेस्ट कैसे चलाएं।

इस प्रोजेक्ट में शामिल हैं:

- सैंपल electronjs ऐप
- सैंपल cucumber टेस्ट स्क्रिप्ट्स

अधिक जानकारी: [Medium Blog](https://praveendavidmathew.medium.com/first-step-into-automation-of-electronjs-applications-ef89b7423ddd)

## [praveendvd/webdriverIO_winappdriver_boilerplate/](https://github.com/praveendvd/webdriverIO_winappdriver_boilerplate)

यह एक टेम्पलेट प्रोजेक्ट है जो आपको यह दिखाने में मदद करता है कि आप winappdriver और WebdriverIO का उपयोग करके विंडोज एप्लिकेशन को कैसे ऑटोमेट कर सकते हैं। इस प्रोजेक्ट का उद्देश्य आपको एक बेसलाइन इमेज प्रदान करना है जिसका उपयोग आप यह समझने के लिए कर सकते हैं कि windappdriver और WebdriverIO टेस्ट कैसे चलाएं।

अधिक जानकारी: [Medium Blog](https://praveendavidmathew.medium.com/winappdriver-first-step-into-windows-app-test-automation-using-webdriverio-and-winappdriver-46320d89570b)

## [praveendvd/appium-chromedriver-multiremote-wdio-boilerplate/](https://github.com/praveendvd/appium-chromedriver-multiremote-wdio-boilerplate)


यह एक टेम्पलेट प्रोजेक्ट है जो आपको यह दिखाने में मदद करता है कि आप नवीनतम WebdriverIO और Jasmine फ्रेमवर्क के साथ webdriverio मल्टीरिमोट क्षमता कैसे चला सकते हैं। इस प्रोजेक्ट का उद्देश्य आपको एक बेसलाइन इमेज प्रदान करना है जिसका उपयोग आप यह समझने के लिए कर सकते हैं कि docker में WebdriverIO टेस्ट कैसे चलाएं।

इस प्रोजेक्ट में उपयोग होता है:
     - chromedriver
     - jasmine
     - appium

## [webdriverio-roku-appium-boilerplate](https://github.com/AntonKostenko/webdriverIO-roku-appium)

पेज ऑब्जेक्ट पैटर्न के साथ mocha का उपयोग करके वास्तविक Roku डिवाइसों पर appium टेस्ट चलाने के लिए टेम्पलेट प्रोजेक्ट।

- फ्रेमवर्क
    - WebdriverIO Async v7
    - Appium 2.0
    - Mocha v7
    - Allure रिपोर्टिंग

- विशेषताएँ
    - पेज ऑब्जेक्ट मॉडल
    - टाइपस्क्रिप्ट
    - फेलियर पर स्क्रीनशॉट
    - सैंपल Roku चैनल का उपयोग करके उदाहरण टेस्ट

## [krishnapollu/wdio-cucumber-poc](https://github.com/krishnapollu/wdio-cucumber-poc)

E2E मल्टीरिमोट Cucumber टेस्ट और डेटा ड्रिवन Mocha टेस्ट के लिए PoC प्रोजेक्ट

- फ्रेमवर्क:
    - Cucumber (v8)
    - WebdriverIO (v8)
    - Mocha (v8)

- विशेषताएँ:
    - Cucumber आधारित E2E टेस्ट
    - Mocha आधारित डेटा ड्रिवन टेस्ट
    - केवल वेब टेस्ट - लोकल और क्लाउड प्लेटफॉर्म दोनों में
    - केवल मोबाइल टेस्ट - लोकल और रिमोट क्लाउड एमुलेटर (या डिवाइस)
    - वेब + मोबाइल टेस्ट - मल्टीरिमोट - लोकल और क्लाउड प्लेटफॉर्म दोनों
    - Allure सहित एकीकृत मल्टिपल रिपोर्ट्स
    - टेस्ट डेटा (JSON / XLSX) ग्लोबली हैंडल किया जाता है ताकि टेस्ट एक्जीक्यूशन के बाद फाइल में डेटा (ऑन द फ्लाई बनाया गया) लिखा जा सके
    - टेस्ट चलाने और allure रिपोर्ट अपलोड करने के लिए Github वर्कफ्लो

## [Rondleysg/wdio-multiremote-appium-chromedriver-boilerplate](https://github.com/Rondleysg/wdio-multiremote-appium-chromedriver-boilerplate)

यह एक बॉयलरप्लेट प्रोजेक्ट है जो नवीनतम WebdriverIO के साथ appium और chromedriver सर्विस का उपयोग करके webdriverio मल्टी-रिमोट कैसे चलाना है, यह दिखाने में मदद करता है।

- फ्रेमवर्क
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
  - http://the-internet.herokuapp.com और [WebdriverIO नेटिव डेमो ऐप](https://github.com/webdriverio/native-demo-app) में लॉगिन के लिए टेस्ट उदाहरण