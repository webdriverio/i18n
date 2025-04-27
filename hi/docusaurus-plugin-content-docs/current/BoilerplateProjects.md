---
id: boilerplates
title: बॉयलरप्लेट प्रोजेक्ट्स
---

समय के साथ, हमारे समुदाय ने कई परियोजनाएँ विकसित की हैं जिन्हें आप अपना खुद का परीक्षण सूट स्थापित करने के लिए प्रेरणा के रूप में उपयोग कर सकते हैं।

# v8 बॉयलरप्लेट प्रोजेक्ट्स

## [webdriverio/cucumber-boilerplate](https://github.com/webdriverio/cucumber-boilerplate)

हमारा अपना Cucumber परीक्षण सूट के लिए बॉयलरप्लेट। हमने आपके लिए 150 से अधिक पूर्वनिर्धारित चरण परिभाषाएँ बनाई हैं, ताकि आप अपने प्रोजेक्ट में तुरंत फीचर फाइलें लिखना शुरू कर सकें।

- फ्रेमवर्क:
    - Cucumber
    - WebdriverIO
- विशेषताएँ:
    - 150 से अधिक पूर्वनिर्धारित चरण जो लगभग सभी चीजों को कवर करते हैं जिनकी आपको आवश्यकता है
    - WebdriverIO की Multiremote कार्यक्षमता को एकीकृत करता है
    - अपना डेमो ऐप

## [webdriverio/jasmine-boilerplate](https://github.com/webdriverio/jasmine-boilerplate)
Babel सुविधाओं और पेज ऑब्जेक्ट्स पैटर्न का उपयोग करके Jasmine के साथ WebdriverIO परीक्षण चलाने के लिए बॉयलरप्लेट प्रोजेक्ट।

- फ्रेमवर्क्स
    - WebdriverIO
    - Jasmine
- विशेषताएँ
    - पेज ऑब्जेक्ट पैटर्न
    - Sauce Labs एकीकरण

## [webdriverio/electron-boilerplate](https://github.com/webdriverio/electron-boilerplate)
एक न्यूनतम Electron अनुप्रयोग पर WebdriverIO परीक्षण चलाने के लिए बॉयलरप्लेट प्रोजेक्ट।

- फ्रेमवर्क्स
    - WebdriverIO
    - Mocha
- विशेषताएँ
    - Electron API मॉकिंग

## [syamphaneendra/webdriverio-web-mobile-boilerplate](https://github.com/syamphaneendra/webdriverio-web-mobile-boilerplate)

इस बॉयलरप्लेट प्रोजेक्ट में WebdriverIO 8 परीक्षण हैं जिनमें cucumber और typescript का उपयोग किया गया है, इसके बाद पेज ऑब्जेक्ट्स पैटर्न का पालन किया गया है।

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
    - क्रॉसब्राउज़र पैरलल एक्ज़ीक्यूशन
    - Appium
    - BrowserStack और Sauce Labs के साथ क्लाउड टेस्टिंग इंटीग्रेशन
    - Docker सर्विस
    - शेयर डेटा सर्विस
    - प्रत्येक सेवा के लिए अलग-अलग कॉन्फिग फाइलें
    - टेस्ट डेटा प्रबंधन और यूजर टाइप द्वारा पढ़ना
    - रिपोर्टिंग
      - Dot
      - Spec
      - विफलता स्क्रीनशॉट के साथ एकाधिक cucumber html रिपोर्ट
    - Gitlab रिपॉजिटरी के लिए Gitlab पाइपलाइंस
    - Github रिपॉजिटरी के लिए Github actions
    - Docker hub सेटअप के लिए Docker compose
    - AXE का उपयोग करके एक्सेसिबिलिटी टेस्टिंग
    - Applitools का उपयोग करके विजुअल टेस्टिंग
    - लॉग तंत्र

## [amiya-pattnaik/webdriverIO-with-cucumberBDD](https://github.com/amiya-pattnaik/webdriverIO-with-cucumberBDD)

- फ्रेमवर्क: WDIO-V8 with Cucumber (V8x).
- विशेषताएँ:
    - पेज ऑब्जेक्ट्स मॉडल ES6 /ES7 स्टाइल क्लास बेस अप्रोच और TypeScript सपोर्ट के साथ उपयोग करता है
    - एक समय में एक से अधिक सेलेक्टर के साथ एलिमेंट क्वेरी करने के लिए मल्टी सेलेक्टर विकल्प के उदाहरण
    - Chrome और Firefox का उपयोग करके मल्टी ब्राउज़र और हेडलेस ब्राउज़र एक्ज़ीक्यूशन के उदाहरण
    - BrowserStack, Sauce Labs, LambdaTest के साथ क्लाउड टेस्टिंग इंटीग्रेशन
    - आसान टेस्ट डेटा प्रबंधन के लिए बाहरी डेटा स्रोतों से MS-Excel से डेटा पढ़ने/लिखने के उदाहरण
    - E2E टेस्टिंग के लिए उदाहरणों के साथ किसी भी RDBMS (Oracle, MySql, TeraData, Vertica आदि) के लिए डेटाबेस सपोर्ट, किसी भी क्वेरी का निष्पादन / रिजल्ट सेट प्राप्त करना आदि
    - मल्टीपल रिपोर्टिंग (Spec, Xunit/Junit, Allure, JSON) और वेबसर्वर पर Allure और Xunit/Junit रिपोर्टिंग होस्टिंग
    - डेमो ऐप https://search.yahoo.com/ और http://the-internet.herokuapp.com के साथ उदाहरण
    - BrowserStack, Sauce Labs, LambdaTest और Appium विशिष्ट `.config` फाइल (मोबाइल डिवाइस पर प्लेबैक के लिए)। iOS और Android के लिए लोकल मशीन पर वन क्लिक Appium सेटअप के लिए [appium-setup-made-easy-OSX](https://github.com/amiya-pattnaik/appium-setup-made-easy-OSX) देखें।

## [amiya-pattnaik/webdriverIO-with-mochaBDD](https://github.com/amiya-pattnaik/webdriverIO-with-mochaBDD)

- फ्रेमवर्क: WDIO-V8 with Mocha (V10x).
- विशेषताएँ:
    -  पेज ऑब्जेक्ट्स मॉडल ES6 /ES7 स्टाइल क्लास बेस अप्रोच और TypeScript सपोर्ट के साथ उपयोग करता है
    -  डेमो ऐप https://search.yahoo.com और http://the-internet.herokuapp.com के साथ उदाहरण
    -  Chrome और Firefox का उपयोग करके मल्टी ब्राउज़र और हेडलेस ब्राउज़र एक्ज़ीक्यूशन के उदाहरण
    -  BrowserStack, Sauce Labs, LambdaTest के साथ क्लाउड टेस्टिंग इंटीग्रेशन
    -  मल्टीपल रिपोर्टिंग (Spec, Xunit/Junit, Allure, JSON) और वेबसर्वर पर Allure और Xunit/Junit रिपोर्टिंग होस्टिंग
    -  आसान टेस्ट डेटा प्रबंधन के लिए बाहरी डेटा स्रोतों से MS-Excel से डेटा पढ़ने/लिखने के उदाहरण
    -  E2E टेस्टिंग के लिए उदाहरणों के साथ किसी भी RDBMS (Oracle, MySql, TeraData, Vertica आदि) से DB कनेक्ट करने, किसी भी क्वेरी का निष्पादन / रिजल्ट सेट प्राप्त करना आदि के उदाहरण
    -  BrowserStack, Sauce Labs, LambdaTest और Appium विशिष्ट `.config` फाइल (मोबाइल डिवाइस पर प्लेबैक के लिए)। iOS और Android के लिए लोकल मशीन पर वन क्लिक Appium सेटअप के लिए [appium-setup-made-easy-OSX](https://github.com/amiya-pattnaik/appium-setup-made-easy-OSX) देखें।

## [amiya-pattnaik/webdriverIO-with-jasmineBDD](https://github.com/amiya-pattnaik/webdriverIO-with-jasmineBDD)

- फ्रेमवर्क: WDIO-V8 with Jasmine (V4x).
- विशेषताएँ:
    -  पेज ऑब्जेक्ट्स मॉडल ES6 /ES7 स्टाइल क्लास बेस अप्रोच और TypeScript सपोर्ट के साथ उपयोग करता है
    -  डेमो ऐप https://search.yahoo.com और http://the-internet.herokuapp.com के साथ उदाहरण
    -  Chrome और Firefox का उपयोग करके मल्टी ब्राउज़र और हेडलेस ब्राउज़र एक्ज़ीक्यूशन के उदाहरण
    -  BrowserStack, Sauce Labs, LambdaTest के साथ क्लाउड टेस्टिंग इंटीग्रेशन
    -  मल्टीपल रिपोर्टिंग (Spec, Xunit/Junit, Allure, JSON) और वेबसर्वर पर Allure और Xunit/Junit रिपोर्टिंग होस्टिंग
    -  आसान टेस्ट डेटा प्रबंधन के लिए बाहरी डेटा स्रोतों से MS-Excel से डेटा पढ़ने/लिखने के उदाहरण
    -  E2E टेस्टिंग के लिए उदाहरणों के साथ किसी भी RDBMS (Oracle, MySql, TeraData, Vertica आदि) से DB कनेक्ट करने, किसी भी क्वेरी का निष्पादन / रिजल्ट सेट प्राप्त करना आदि के उदाहरण
    -  BrowserStack, Sauce Labs, LambdaTest और Appium विशिष्ट `.config` फाइल (मोबाइल डिवाइस पर प्लेबैक के लिए)। iOS और Android के लिए लोकल मशीन पर वन क्लिक Appium सेटअप के लिए [appium-setup-made-easy-OSX](https://github.com/amiya-pattnaik/appium-setup-made-easy-OSX) देखें।

## [klassijs/klassi-js (cucumber-template)](https://github.com/klassijs/klassi-example-test-suite.git)

- फ्रेमवर्क्स
    - WebdriverIO (v8)
    - Cucumber (v8)

- विशेषताएँ
    - cucumber में नमूना परीक्षण परिदृश्य शामिल हैं
    - विफलताओं पर एम्बेडेड वीडियो के साथ integrated cucumber html रिपोर्ट
    - Lambdatest और CircleCI सेवाओं के साथ एकीकृत
    - विजुअल, एक्सेसिबिलिटी और API टेस्टिंग एकीकृत
    - ईमेल कार्यक्षमता एकीकृत
    - टेस्ट रिपोर्ट्स स्टोरेज और पुनर्प्राप्ति के लिए s3 बकेट एकीकृत

## [serenity-js/serenity-js-mocha-webdriverio-template/](https://github.com/serenity-js/serenity-js-mocha-webdriverio-template/)

[Serenity/JS](https://serenity-js.org?pk_campaign=wdio8&pk_source=webdriver.io) टेम्पलेट प्रोजेक्ट जो आपको नवीनतम WebdriverIO, Mocha, और Serenity/JS का उपयोग करके अपने वेब एप्लिकेशन के स्वीकृति परीक्षण के साथ आरंभ करने में मदद करता है।

- फ्रेमवर्क्स
    - WebdriverIO (v8)
    - Mocha (v10)
    - Serenity/JS (v3)
    - Serenity BDD रिपोर्टिंग

- विशेषताएँ
    - [स्क्रीनप्ले पैटर्न](https://serenity-js.org/handbook/design/screenplay-pattern/?pk_campaign=wdio8&pk_source=webdriver.io)
    - परीक्षण विफलता पर स्वचालित स्क्रीनशॉट, रिपोर्ट में एम्बेडेड
    - [GitHub Actions](https://github.com/serenity-js/serenity-js-mocha-webdriverio-template/blob/main/.github/workflows/main.yml) का उपयोग करके कंटीन्यूअस इंटीग्रेशन (CI) सेटअप
    - GitHub Pages पर प्रकाशित [डेमो Serenity BDD रिपोर्ट](https://serenity-js.github.io/serenity-js-mocha-webdriverio-template/)
    - TypeScript
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
    - परीक्षण विफलता पर स्वचालित स्क्रीनशॉट, रिपोर्ट में एम्बेडेड
    - [GitHub Actions](https://github.com/serenity-js/serenity-js-cucumber-webdriverio-template/blob/main/.github/workflows/main.yml) का उपयोग करके कंटीन्यूअस इंटीग्रेशन (CI) सेटअप
    - GitHub Pages पर प्रकाशित [डेमो Serenity BDD रिपोर्ट](https://serenity-js.github.io/serenity-js-mocha-webdriverio-template/)
    - TypeScript
    - ESLint

## [Muralijc/wdio-headspin-boilerplate](https://github.com/Muralijc/Wdio-Headspin-boilerplate/)
Headspin Cloud (https://www.headspin.io/) में Cucumber फीचर्स और पेज ऑब्जेक्ट्स पैटर्न का उपयोग करके WebdriverIO परीक्षण चलाने के लिए बॉयलरप्लेट प्रोजेक्ट।
- फ्रेमवर्क्स
    - WebdriverIO (v8)
    - Cucumber (v8)

- विशेषताएँ
    - [Headspin](https://www.headspin.io/) के साथ क्लाउड इंटीग्रेशन
    - पेज ऑब्जेक्ट मॉडल का समर्थन करता है
    - BDD के घोषणात्मक शैली में लिखे गए नमूना परिदृश्य शामिल हैं
    - एकीकृत cucumber html रिपोर्ट

# v7 बॉयलरप्लेट प्रोजेक्ट्स

## [webdriverio/appium-boilerplate](https://github.com/webdriverio/appium-boilerplate/)

WebdriverIO के साथ Appium परीक्षण चलाने के लिए बॉयलरप्लेट प्रोजेक्ट:

- iOS/Android नेटिव ऐप्स
- iOS/Android हाइब्रिड ऐप्स
- Android Chrome और iOS Safari ब्राउज़र

इस बॉयलरप्लेट में निम्नलिखित शामिल हैं:

- फ्रेमवर्क: Mocha
- विशेषताएँ:
    - इनके लिए कॉन्फ़िग:
        - iOS और Android ऐप
        - iOS और Android ब्राउज़र
    - इनके लिए हेल्पर्स:
        - WebView
        - जेस्चर
        - नेटिव अलर्ट्स
        - पिकर्स
     - इनके लिए टेस्ट उदाहरण:
        - WebView
        - लॉगिन
        - फॉर्म्स
        - स्वाइप
        - ब्राउज़र्स

## [serhatbolsu/webdriverio-mocha-uiautomation-boiler](https://github.com/serhatbolsu/webdriverio-mocha-uiautomation-boiler)
PageObject के साथ Mocha, WebdriverIO v6 के साथ ATDD वेब परीक्षण

- फ्रेमवर्क्स
  - WebdriverIO (v7)
  - Mocha
- विशेषताएँ
  - [पेज ऑब्जेक्ट](pageobjects) मॉडल
  - [Sauce Service](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-sauce-service/README.md) के साथ Sauce Labs इंटीग्रेशन
  - Allure रिपोर्ट
  - विफल परीक्षणों के लिए स्वचालित स्क्रीनशॉट कैप्चर
  - CircleCI उदाहरण
  - ESLint

## [WarleyGabriel/demo-webdriverio-mocha](https://github.com/WarleyGabriel/demo-webdriverio-mocha)

Mocha के साथ E2E परीक्षण चलाने के लिए बॉयलरप्लेट प्रोजेक्ट।

- फ्रेमवर्क्स:
    - WebdriverIO (v7)
    - Mocha
- विशेषताएँ:
    -   TypeScript
    -   [Expect-webdriverio](https://github.com/webdriverio/expect-webdriverio)
    -   [विजुअल रिग्रेशन टेस्ट](https://github.com/wswebcreation/wdio-image-comparison-service)
    -   पेज ऑब्जेक्ट पैटर्न
    -   [कमिट लिंट](https://github.com/conventional-changelog/commitlint) और [Commitizen](https://github.com/commitizen/cz-cli#making-your-repo-commitizen-friendly)
    -   ESlint
    -   Prettier
    -   Husky
    -   Github Actions उदाहरण
    -   Allure रिपोर्ट (विफलता पर स्क्रीनशॉट)

## [17thSep/WebdriverIO_Master](https://github.com/17thSep/WebdriverIO_Master)

निम्नलिखित के लिए **WebdriverIO v7** परीक्षण चलाने के लिए बॉयलरप्लेट प्रोजेक्ट:

[Cucumber फ्रेमवर्क में TypeScript के साथ WDIO 7 स्क्रिप्ट](https://github.com/17thSep/WebdriverIO_Master/tree/master/TypeScript/Cucumber)
[Mocha फ्रेमवर्क में TypeScript के साथ WDIO 7 स्क्रिप्ट](https://github.com/17thSep/WebdriverIO_Master/tree/master/TypeScript/Mocha)
[WDIO 7 स्क्रिप्ट Docker में चलाएँ](https://github.com/17thSep/WebdriverIO_Master/tree/master/TypeScript/Docker)
[नेटवर्क लॉग](https://github.com/17thSep/MonitorNetworkLogs/)

इनके लिए बॉयलर प्लेट प्रोजेक्ट:

- नेटवर्क लॉग कैप्चर करें
- सभी GET/POST कॉल या एक विशिष्ट REST API कैप्चर करें
- अनुरोध पैरामीटर को एसर्ट करें
- प्रतिक्रिया पैरामीटर को एसर्ट करें
- सभी प्रतिक्रियाओं को एक अलग फ़ाइल में स्टोर करें

## [Arjun-Ar91/Wdio7-appium-cucumber](https://github.com/Arjun-Ar91/Wdio7-appium-cucumber.git)

पेज ऑब्जेक्ट पैटर्न का उपयोग करके cucumber v7 और wdio v7 के साथ नेटिव और मोबाइल ब्राउज़र के लिए appium परीक्षण चलाने के लिए बॉयलरप्लेट प्रोजेक्ट।

- फ्रेमवर्क्स
    - WebdriverIO v7
    - Cucumber v7
    - Appium

- विशेषताएँ
    - नेटिव Android और iOS ऐप्स
    - Android Chrome ब्राउज़र
    - iOS Safari ब्राउज़र
    - पेज ऑब्जेक्ट मॉडल
    - cucumber में नमूना परीक्षण परिदृश्य शामिल हैं
    - एकाधिक cucumber html रिपोर्टों के साथ एकीकृत

## [praveendvd/webdriverIODockerBoilerplate/](https://github.com/praveendvd/webdriverIODockerBoilerplate)

यह एक टेम्पलेट प्रोजेक्ट है जो आपको यह दिखाने में मदद करता है कि आप नवीनतम WebdriverIO और Cucumber फ्रेमवर्क का उपयोग करके वेब एप्लिकेशन से webdriverio टेस्ट कैसे चला सकते हैं। इस प्रोजेक्ट का उद्देश्य एक बेसलाइन इमेज के रूप में कार्य करना है जिसका उपयोग आप यह समझने के लिए कर सकते हैं कि docker में WebdriverIO परीक्षण कैसे चलाए जाते हैं

इस प्रोजेक्ट में शामिल हैं:

- DockerFile
- cucumber प्रोजेक्ट

अधिक जानकारी पढ़ें: [Medium Blog](https://praveendavidmathew.medium.com/running-webdriverio-in-wsl2-windows-91d3a0dc7746)

## [praveendvd/WebdriverIO_electronAppAutomation_boilerplate/](https://github.com/praveendvd/WebdriverIO_electronAppAutomation_boilerplate)

यह एक टेम्पलेट प्रोजेक्ट है जो आपको यह दिखाने में मदद करता है कि आप WebdriverIO का उपयोग करके electronJS परीक्षण कैसे चला सकते हैं। इस प्रोजेक्ट का उद्देश्य एक बेसलाइन इमेज के रूप में कार्य करना है जिसका उपयोग आप यह समझने के लिए कर सकते हैं कि WebdriverIO electronJS परीक्षण कैसे चलाए जाते हैं।

इस प्रोजेक्ट में शामिल हैं:

- नमूना electronjs ऐप
- नमूना cucumber टेस्ट स्क्रिप्ट

अधिक जानकारी पढ़ें: [Medium Blog](https://praveendavidmathew.medium.com/first-step-into-automation-of-electronjs-applications-ef89b7423ddd)

## [praveendvd/webdriverIO_winappdriver_boilerplate/](https://github.com/praveendvd/webdriverIO_winappdriver_boilerplate)

यह एक टेम्पलेट प्रोजेक्ट है जो आपको यह दिखाने में मदद करता है कि आप winappdriver और WebdriverIO का उपयोग करके विंडोज़ एप्लिकेशन को कैसे ऑटोमेट कर सकते हैं। इस प्रोजेक्ट का उद्देश्य एक बेसलाइन इमेज के रूप में कार्य करना है जिसका उपयोग आप यह समझने के लिए कर सकते हैं कि windappdriver और WebdriverIO परीक्षण कैसे चलाए जाते हैं।

अधिक जानकारी पढ़ें: [Medium Blog](https://praveendavidmathew.medium.com/winappdriver-first-step-into-windows-app-test-automation-using-webdriverio-and-winappdriver-46320d89570b)

## [praveendvd/appium-chromedriver-multiremote-wdio-boilerplate/](https://github.com/praveendvd/appium-chromedriver-multiremote-wdio-boilerplate)


यह एक टेम्पलेट प्रोजेक्ट है जो आपको यह दिखाने में मदद करता है कि आप नवीनतम WebdriverIO और Jasmine फ्रेमवर्क के साथ webdriverio मल्टीरिमोट क्षमता कैसे चला सकते हैं। इस प्रोजेक्ट का उद्देश्य एक बेसलाइन इमेज के रूप में कार्य करना है जिसका उपयोग आप यह समझने के लिए कर सकते हैं कि docker में WebdriverIO परीक्षण कैसे चलाए जाते हैं

इस प्रोजेक्ट में निम्न का उपयोग किया गया है:
     - chromedriver
     - jasmine
     - appium

## [webdriverio-roku-appium-boilerplate](https://github.com/AntonKostenko/webdriverIO-roku-appium)

पेज ऑब्जेक्ट पैटर्न के साथ mocha का उपयोग करके वास्तविक Roku डिवाइसों पर appium परीक्षण चलाने के लिए टेम्पलेट प्रोजेक्ट।

- फ्रेमवर्क्स
    - WebdriverIO Async v7
    - Appium 2.0
    - Mocha v7
    - Allure रिपोर्टिंग

- विशेषताएँ
    - पेज ऑब्जेक्ट मॉडल
    - Typescript
    - विफलता पर स्क्रीनशॉट
    - एक नमूना Roku चैनल का उपयोग करके उदाहरण परीक्षण

## [krishnapollu/wdio-cucumber-poc](https://github.com/krishnapollu/wdio-cucumber-poc)

E2E मल्टीरिमोट Cucumber परीक्षणों के साथ-साथ डेटा संचालित Mocha परीक्षणों के लिए PoC प्रोजेक्ट

- फ्रेमवर्क:
    - Cucumber (v8)
    - WebdriverIO (v8)
    - Mocha (v8)

- विशेषताएँ:
    - Cucumber आधारित E2E परीक्षण
    - Mocha आधारित डेटा संचालित परीक्षण
    - केवल वेब परीक्षण - स्थानीय के साथ-साथ क्लाउड प्लेटफॉर्म में
    - केवल मोबाइल परीक्षण - स्थानीय और रिमोट क्लाउड एमुलेटर (या डिवाइस) दोनों
    - वेब + मोबाइल परीक्षण - मल्टीरिमोट - स्थानीय और क्लाउड प्लेटफॉर्म दोनों
    - Allure सहित एकाधिक रिपोर्ट एकीकृत
    - टेस्ट डेटा (JSON / XLSX) को वैश्विक रूप से हैंडल किया जाता है ताकि परीक्षण निष्पादन के बाद डेटा (ऑन द फ्लाई बनाया गया) को फ़ाइल में लिखा जा सके
    - परीक्षण चलाने और Allure रिपोर्ट अपलोड करने के लिए Github वर्कफ़्लो

## [Rondleysg/wdio-multiremote-appium-chromedriver-boilerplate](https://github.com/Rondleysg/wdio-multiremote-appium-chromedriver-boilerplate)

यह एक बॉयलरप्लेट प्रोजेक्ट है जो नवीनतम WebdriverIO के साथ appium और chromedriver सेवा का उपयोग करके webdriverio मल्टी-रिमोट चलाने का तरीका दिखाने में मदद करता है।

- फ्रेमवर्क्स
  - WebdriverIO (v9)
  - Appium (v2)
  - Mocha

- विशेषताएँ
  - [पेज ऑब्जेक्ट](pageobjects) मॉडल
  - Typescript
  - वेब + मोबाइल परीक्षण - मल्टीरिमोट
  - नेटिव Android और iOS ऐप्स
  - Appium
  - Chromedriver
  - ESLint
  - http://the-internet.herokuapp.com और [WebdriverIO नेटिव डेमो ऐप](https://github.com/webdriverio/native-demo-app) में लॉगिन के लिए परीक्षण उदाहरण