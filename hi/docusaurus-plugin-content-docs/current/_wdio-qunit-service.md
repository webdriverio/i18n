---
id: wdio-qunit-service
title: क्यूनिट सेवा
custom_edit_url: https://github.com/mauriciolauffer/wdio-qunit-service/edit/main/README.md
---


> wdio-qunit-service एक तृतीय पक्ष पैकेज है, अधिक जानकारी के लिए कृपया देखें [GitHub](https://github.com/mauriciolauffer/wdio-qunit-service) | [npm](https://www.npmjs.com/package/wdio-qunit-service)

[![npm](https://img.shields.io/npm/v/wdio-qunit-service)](https://www.npmjs.com/package/wdio-qunit-service) [![test](https://github.com/mauriciolauffer/wdio-qunit-service/actions/workflows/test.yml/badge.svg)](https://github.com/mauriciolauffer/wdio-qunit-service/actions/workflows/test.yml)

[WebdriverIO](https://webdriver.io/) (wdio) सेवा [QUnit](https://qunitjs.com/) ब्राउज़र-आधारित परीक्षणों को चलाने और उन्हें गतिशील रूप से `wdio` परीक्षण सूट में परिवर्तित करने के लिए है।

## कर्मा को बदलना

`QUnit Service` उन लोगों के लिए एक ड्रॉप-इन रिप्लेसमेंट है जो अपने `QUnit` परीक्षणों को चलाने के लिए [Karma JS](https://karma-runner.github.io/latest/index.html) का उपयोग करते हैं ([karma-qunit](https://github.com/karma-runner/karma-qunit/), [karma-ui5](https://github.com/SAP/karma-ui5) या कर्मा और क्यूनिट का कोई अन्य संयोजन)। कर्मा [पदावनत](https://github.com/karma-runner/karma) है और लोगों को आधुनिक विकल्पों पर जाना चाहिए!

यदि आप अपने QUnit परीक्षणों को जैसे हैं वैसे ही रखना चाहते हैं, बिना किसी पुनर्लेखन और बिना किसी रीफैक्टरिंग के, `QUnit Service` वह सब कुछ है जिसकी आपको आवश्यकता है। यह आपके QUnit HTML फ़ाइलों को ब्राउज़र में चलाता है और सभी परिणामों को `wdio` प्रारूप में कैप्चर करता है।

इसके कारण, डेवलपर्स `QUnit Service` को `wdio` इकोसिस्टम में उपलब्ध अन्य सभी चीजों के साथ इस्तेमाल कर सकते हैं।

क्या आप परीक्षण चलाने को [वीडियो](https://webdriver.io/docs/wdio-video-reporter/) में रिकॉर्ड करना चाहते हैं? शायद [स्क्रीनशॉट](https://webdriver.io/docs/api/browser/saveScreenshot/) लें या इसे [PDF](https://webdriver.io/docs/api/browser/savePDF/) में सहेजें? [कोड कवरेज](https://www.npmjs.com/package/wdio-monocart-service) की जांच करें? परीक्षण परिणामों को [JUnit](https://webdriver.io/docs/junit-reporter) प्रारूप में सहेजें? आगे बढ़ें, `QUnit Service` आपके रास्ते में नहीं आती।

## स्थापना

`WebdriverIO` को कॉन्फ़िगर करने के बाद, अपनी `package.json` फ़ाइल में `wdio-qunit-service` को एक devDependency के रूप में स्थापित करें।

```shell
npm install wdio-qunit-service --save-dev
```

यदि आपने अभी तक `WebdriverIO` कॉन्फ़िगर नहीं किया है, तो आधिकारिक [दस्तावेज़ीकरण](https://webdriver.io/docs/gettingstarted) देखें।

## कॉन्फ़िगरेशन

`QUnit Service` का उपयोग करने के लिए आपको इसे अपनी `wdio.conf.js` फ़ाइल में `services` सूची में जोड़ने की आवश्यकता है। wdio दस्तावेज़ीकरण में [कॉन्फ़िगरेशन फ़ाइल](https://webdriver.io/docs/configurationfile) से संबंधित सभी जानकारी है:

```js
// wdio.conf.js
export const config = {
  // ...
  services: ["qunit"],
  // ...
};
```

## उपयोग

परीक्षण चलाने से पहले सुनिश्चित करें कि वेब सर्वर चालू और चल रहा है। `wdio` वेब सर्वर शुरू नहीं करेगा।

### .spec या .test फ़ाइलों के साथ

अपने WebdriverIO परीक्षण में, आपको QUnit HTML परीक्षण पृष्ठ को नेविगेट करने की आवश्यकता है, फिर `browser.getQUnitResults()` कॉल करें।

```js
describe("QUnit test page", () => {
  it("should pass QUnit tests", async () => {
    await browser.url("http://localhost:8080/test/unit/unitTests.qunit.html");
    await browser.getQUnitResults();
  });
});
```

प्रति QUnit HTML परीक्षण पृष्ठ एक WebdriverIO परीक्षण फ़ाइल रखने की सिफारिश की जाती है। यह सुनिश्चित करता है कि परीक्षण समानांतर में और पूरी तरह से अलग-अलग चलेंगे।

### केवल कॉन्फ़िगरेशन, कोई .spec या .test फ़ाइलें नहीं

यदि आप spec/test फ़ाइलें नहीं बनाना चाहते हैं, तो आप कॉन्फ़िगरेशन में QUnit HTML फ़ाइलों की एक सूची पास कर सकते हैं और परीक्षण स्वचालित रूप से उत्पन्न किए जाएंगे।

```js
// wdio.conf.js
export const config = {
  // ...
  baseUrl: 'http://localhost:8080',
  services: [
    ['qunit', {
      paths: [
        'unit-tests.html',
        'integration-tests.html',
        'test/qunit.html'
      ]
    }],
  // ...
};
```

### परीक्षण परिणाम

परीक्षण परिणाम इस प्रकार दिख सकते हैं:
![QUnit Service test results](https://github.com/mauriciolauffer/wdio-qunit-service/blob/main/./wdio-qunit-service-results.png?raw=true)

## उदाहरण

`javascript`, `typescript` और अधिक का उपयोग करके नमूनों के लिए [examples](https://github.com/mauriciolauffer/wdio-qunit-service/blob/main/./examples/) फ़ोल्डर देखें।

### SAP Fiori / UI5 ऐप्स में उपयोग

प्रसिद्ध [openui5-sample-app](https://github.com/SAP/openui5-sample-app) का उपयोग करके सीधा [उदाहरण](https://github.com/mauriciolauffer/wdio-qunit-service/blob/main/./examples/openui5-sample-app/):

- एक कॉन्फ़िगरेशन फ़ाइल बनाएं: [wdio.conf.js](https://github.com/mauriciolauffer/wdio-qunit-service/blob/main/./examples/openui5-sample-app/webapp/test/wdio.conf.js)

- `wdio` को बताएं कि QUnit परीक्षण फ़ाइलें कहां मिलेंगी:

- - QUnit फ़ाइलों को [सेवा कॉन्फ़िगरेशन](https://github.com/mauriciolauffer/wdio-qunit-service/blob/main/./examples/openui5-sample-app-no-specs/webapp/test/wdio.conf.js) में शामिल करें
- - या
- - [यूनिट टेस्ट](https://github.com/mauriciolauffer/wdio-qunit-service/blob/main/./examples/openui5-sample-app/webapp/test/unit/unit.test.js) के लिए एक WebdriverIO टेस्ट फ़ाइल और [OPA5 टेस्ट](https://github.com/mauriciolauffer/wdio-qunit-service/blob/main/./examples/openui5-sample-app/webapp/test/integration/opa.test.js) के लिए दूसरी फ़ाइल बनाएं

- परीक्षण चलाने से पहले वेब सर्वर चल रहा होना चाहिए

- चलाएं $ `wdio run webapp/test/wdio.conf.js`

## लेखक

Mauricio Lauffer

- LinkedIn: [https://www.linkedin.com/in/mauriciolauffer](https://www.linkedin.com/in/mauriciolauffer)

## लाइसेंस

यह प्रोजेक्ट MIT लाइसेंस के अंतर्गत लाइसेंस प्राप्त है - विवरण के लिए [LICENSE](https://github.com/mauriciolauffer/wdio-qunit-service/blob/main/LICENSE) फ़ाइल देखें।