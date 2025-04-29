---
id: wdio-novus-visual-regression-service
title: नोवस विज़ुअल रिग्रेशन सर्विस
custom_edit_url: https://github.com/Jnegrier/wdio-novus-visual-regression-service/edit/master/README.md
---


> wdio-novus-visual-regression-service एक तृतीय पक्ष पैकेज है, अधिक जानकारी के लिए कृपया देखें [GitHub](https://github.com/Jnegrier/wdio-novus-visual-regression-service) | [npm](https://www.npmjs.com/package/wdio-novus-visual-regression-service)

[![Build Status](https://travis-ci.com/Jnegrier/wdio-novus-visual-regression-service.svg?branch=master)](https://travis-ci.com/Jnegrier/wdio-novus-visual-regression-service)

> WebdriverIO के लिए विज़ुअल रिग्रेशन टेस्टिंग

Jan-André Zinser के [wdio-visual-regression-service](https://github.com/zinserjan/wdio-visual-regression-service) और [wdio-screenshot](https://github.com/zinserjan/wdio-screenshot) पर किए गए कार्य पर आधारित

## इंस्टालेशन

आप wdio-novus-visual-regression-service को NPM के माध्यम से आमतौर पर इंस्टॉल कर सकते हैं:

```sh
$ npm install wdio-novus-visual-regression-service --save-dev
```

`WebdriverIO` को कैसे इंस्टॉल करें, इस पर निर्देश [यहां](https://webdriver.io/docs/gettingstarted) मिल सकते हैं।

## कॉन्फ़िगरेशन
अपने WebdriverIO कॉन्फिग के सर्विस सेक्शन में `novus-visual-regression` को जोड़कर wdio-novus-visual-regression-service को सेटअप करें और सर्विस विकल्पों में अपनी वांछित तुलना रणनीति को परिभाषित करें।

```js
// wdio.conf.js

var path = require('path');
var VisualRegressionCompare = require('wdio-novus-visual-regression-service/compare');

function getScreenshotName(basePath) {
  return function(context) {
    var type = context.type;
    var testName = context.test.title;
    var browserVersion = parseInt(context.browser.version, 10);
    var browserName = context.browser.name;
    var browserViewport = context.meta.viewport;
    var browserWidth = browserViewport.width;
    var browserHeight = browserViewport.height;

    return path.join(basePath, `${testName}_${type}_${browserName}_v${browserVersion}_${browserWidth}x${browserHeight}.png`);
  };
}

exports.config = {
  // ...
  services: [
    [
      'novus-visual-regression',
      {
        compare: new VisualRegressionCompare.LocalCompare({
          referenceName: getScreenshotName(path.join(process.cwd(), 'screenshots/reference')),
          screenshotName: getScreenshotName(path.join(process.cwd(), 'screenshots/screen')),
          diffName: getScreenshotName(path.join(process.cwd(), 'screenshots/diff')),
          misMatchTolerance: 0.01,
        }),
        viewportChangePause: 300,
        viewports: [{ width: 320, height: 480 }, { width: 480, height: 320 }, { width: 1024, height: 768 }],
        orientations: ['landscape', 'portrait'],
      }
    ]
  ],
  // ...
};
```

### विकल्प
आपके wdio.config.js में कुंजी `visualRegression` के तहत आप निम्नलिखित संरचना के साथ एक कॉन्फिगरेशन ऑब्जेक्ट पास कर सकते हैं:

* **compare** `Object` <br />
स्क्रीनशॉट तुलना विधि, देखें [Compare Methods](#compare-methods)

* **viewportChangePause**  `Number`  ( डिफ़ॉल्ट: 100 ) <br />
व्यूपोर्ट परिवर्तन के बाद x मिलीसेकंड इंतज़ार करें। ब्राउज़र को फिर से पेंट करने में समय लग सकता है। इससे रेंडरिंग में समस्याएं हो सकती हैं और रनों के बीच अनियमित परिणाम प्राप्त हो सकते हैं।

* **viewports** `Object[{ width: Number, height: Number }]`  ( डिफ़ॉल्ट: *[current-viewport]* ) (**केवल डेस्कटॉप**)<br />
   सभी स्क्रीनशॉट विभिन्न व्यूपोर्ट आयामों में लिए जाएंगे (जैसे रेस्पॉन्सिव डिज़ाइन परीक्षणों के लिए)

* **orientations** `String[] {landscape, portrait}`  ( डिफ़ॉल्ट: *[current-orientation]* ) (**केवल मोबाइल**)<br />
    सभी स्क्रीनशॉट विभिन्न स्क्रीन ओरिएंटेशन में लिए जाएंगे (जैसे रेस्पॉन्सिव डिज़ाइन परीक्षणों के लिए)

### तुलना विधियां
wdio-novus-visual-regression-service विभिन्न स्क्रीनशॉट तुलना विधियों का उपयोग करने की अनुमति देता है।

#### VisualRegressionCompare.LocalCompare
जैसा कि इसके नाम से पता चलता है, *LocalCompare* आपके कंप्यूटर पर स्थानीय रूप से स्क्रीनशॉट कैप्चर करता है और उनकी तुलना पिछले रनों से करता है।

आप इसके कंस्ट्रक्टर में निम्न विकल्पों को ऑब्जेक्ट के रूप में पास कर सकते हैं:

* **referenceName** `Function` <br />
एक फ़ंक्शन पास करें जो रेफ़रेंस स्क्रीनशॉट के लिए फ़ाइलनाम वापस करता है। फ़ंक्शन पहले पैरामीटर के रूप में कमांड के बारे में सभी प्रासंगिक जानकारी के साथ एक *context* ऑब्जेक्ट प्राप्त करता है।

* **screenshotName** `Function` <br />
एक फ़ंक्शन पास करें जो वर्तमान स्क्रीनशॉट के लिए फ़ाइलनाम वापस करता है। फ़ंक्शन पहले पैरामीटर के रूप में कमांड के बारे में सभी प्रासंगिक जानकारी के साथ एक *context* ऑब्जेक्ट प्राप्त करता है।

* **diffName** `Function` <br />
एक फ़ंक्शन पास करें जो डिफ स्क्रीनशॉट के लिए फ़ाइलनाम वापस करता है। फ़ंक्शन पहले पैरामीटर के रूप में कमांड के बारे में सभी प्रासंगिक जानकारी के साथ एक *context* ऑब्जेक्ट प्राप्त करता है।

* **misMatchTolerance** `Number`  ( डिफ़ॉल्ट: 0.01 ) <br />
0 से 100 के बीच का नंबर जो दो छवियों को समान मानने के लिए अनमेल की डिग्री को परिभाषित करता है, इस मूल्य को बढ़ाने से परीक्षण कवरेज कम हो जाएगा।

* **ignoreComparison** `String`  ( डिफ़ॉल्ट: nothing ) <br />
तुलना विधि को समायोजित करने के लिए `nothing`, `colors` या `antialiasing` मूल्य के साथ एक स्ट्रिंग पास करें।

वर्तमान परीक्षण नाम पर निर्भर स्क्रीनशॉट फ़ाइलनाम जेनरेट करने के उदाहरण के लिए, [Configuration](#configuration) के सैंपल कोड पर एक नज़र डालें।

#### VisualRegressionCompare.SaveScreenshot
यह विधि `VisualRegressionCompare.LocalCompare` का एक संक्षिप्त वेरिएंट है जो केवल स्क्रीनशॉट कैप्चर करने के लिए है। यह काफी उपयोगी है जब आप केवल रेफरेंस स्क्रीनशॉट बनाना चाहते हैं और डिफिंग के बिना पिछले को ओवरराइट करना चाहते हैं।

आप इसके कंस्ट्रक्टर में निम्न विकल्पों को ऑब्जेक्ट के रूप में पास कर सकते हैं:

* **screenshotName** `Function` <br />
एक फ़ंक्शन पास करें जो वर्तमान स्क्रीनशॉट के लिए फ़ाइलनाम वापस करता है। फ़ंक्शन पहले पैरामीटर के रूप में कमांड के बारे में सभी प्रासंगिक जानकारी के साथ एक *context* ऑब्जेक्ट प्राप्त करता है।

#### VisualRegressionCompare.Spectre
इस विधि का उपयोग स्क्रीनशॉट को वेब एप्लिकेशन [Spectre](https://github.com/wearefriday/spectre) पर अपलोड करने के लिए किया जाता है।
Spectre विज़ुअल रिग्रेशन टेस्टिंग के लिए एक यूआई है। यह स्क्रीनशॉट को स्टोर करता है और उनकी तुलना करता है जो निरंतर एकीकरण के लिए काफी उपयोगी है।

आप इसके कंस्ट्रक्टर में निम्न विकल्पों को ऑब्जेक्ट के रूप में पास कर सकते हैं:

* **url** `String` <br />
एक spectre वेबसर्विस url पास करें।

* **project** `String` <br />
अपने प्रोजेक्ट के लिए एक नाम पास करें।

* **suite** `String` <br />
अपने टेस्टसूट के लिए एक नाम पास करें। एक प्रोजेक्ट में कई सूट हो सकते हैं।

* **test** `Function` <br />
एक फ़ंक्शन पास करें जो स्क्रीनशॉट के लिए टेस्ट नाम वापस करता है। फ़ंक्शन पहले पैरामीटर के रूप में कमांड के बारे में सभी प्रासंगिक जानकारी के साथ एक *context* ऑब्जेक्ट प्राप्त करता है।

* **browser** `Function` <br />
एक फ़ंक्शन पास करें जो स्क्रीनशॉट के लिए ब्राउज़र वापस करता है। फ़ंक्शन पहले पैरामीटर के रूप में कमांड के बारे में सभी प्रासंगिक जानकारी के साथ एक *context* ऑब्जेक्ट प्राप्त करता है।

* **size** `Function` <br />
एक फ़ंक्शन पास करें जो स्क्रीनशॉट के लिए साइज़ वापस करता है। फ़ंक्शन पहले पैरामीटर के रूप में कमांड के बारे में सभी प्रासंगिक जानकारी के साथ एक *context* ऑब्जेक्ट प्राप्त करता है।

* **fuzzLevel** `Number`  ( डिफ़ॉल्ट: 30 ) <br />
0 से 100 के बीच का नंबर जो Spectre की इमेज तुलना विधि के फज फैक्टर को परिभाषित करता है। अधिक विवरण के लिए कृपया [Spectre documentation](https://github.com/wearefriday/spectre) पर एक नज़र डालें।

**उदाहरण**
```js
// wdio.conf.js

var path = require('path');
var VisualRegressionCompare = require('wdio-novus-visual-regression-service/compare');

exports.config = {
  // ...
  services: [
    [
      'novus-visual-regression',
      {
        compare: new VisualRegressionCompare.Spectre({
          url: 'http://localhost:3000',
          project: 'my project',
          suite: 'my test suite',
          test: function getTest(context) {
            return context.test.title;
          },
          browser: function getBrowser(context) {
            return context.browser.name;
          },
          size: function getSize(context) {
            return context.meta.viewport != null ? context.meta.viewport.width : context.meta.orientation;
          },
          fuzzLevel: 30
        }),
        viewportChangePause: 300,
        viewports: [{ width: 320, height: 480 }, { width: 480, height: 320 }, { width: 1024, height: 768 }],
        orientations: ['landscape', 'portrait'],
      }
    ]
  ],
  // ...
};
```

## उपयोग
wdio-novus-visual-regression-service एक WebdriverIO इंस्टेंस को निम्न कमांड्स के साथ बढ़ाता है:
* `browser.checkViewport([{options}]);`
* `browser.checkDocument([{options}]);`
* `browser.checkElement(elementSelector, [{options}]);`


ये सभी ऐसे विकल्प प्रदान करते हैं जो आपको विभिन्न आयामों में स्क्रीनशॉट कैप्चर करने या अप्रासंगिक भागों (जैसे सामग्री) को बाहर रखने में मदद करेंगे। निम्नलिखित विकल्प उपलब्ध हैं:


* **exclude** `String[]|Object[]` (**अभी तक लागू नहीं**)<br />
  अपने स्क्रीनशॉट के बार-बार बदलने वाले हिस्सों को बाहर रखें, आप या तो विभिन्न प्रकार के [WebdriverIO selector strategies](http://webdriver.io/guide/usage/selectors.html) पास कर सकते हैं
  जो एक या कई तत्वों की क्वेरी करता है या आप x और y मूल्य परिभाषित कर सकते हैं जो एक आयत या बहुभुज को फैलाते हैं

* **hide** `Object[]`<br />
  सभी प्रकार के विभिन्न [WebdriverIO selector strategies](http://webdriver.io/guide/usage/selectors.html) द्वारा क्वेरी किए गए सभी तत्वों को छिपाता है (`visibility: hidden` के माध्यम से)

* **remove** `Object[]`<br />
  सभी प्रकार के विभिन्न [WebdriverIO selector strategies](http://webdriver.io/guide/usage/selectors.html) द्वारा क्वेरी किए गए सभी तत्वों को हटाता है (`display: none` के माध्यम से)

* **viewports** `Object[{ width: Number, height: Number }]` (**केवल डेस्कटॉप**)<br />
     इस कमांड के लिए ग्लोबल *viewports* मूल्य को ओवरराइड करता है। सभी स्क्रीनशॉट विभिन्न व्यूपोर्ट आयामों में लिए जाएंगे (जैसे रेस्पॉन्सिव डिज़ाइन परीक्षणों के लिए)

* **orientations** `String[] {landscape, portrait}` (**केवल मोबाइल**)<br />
    इस कमांड के लिए ग्लोबल *orientations* मूल्य को ओवरराइड करता है। सभी स्क्रीनशॉट विभिन्न स्क्रीन ओरिएंटेशन में लिए जाएंगे (जैसे रेस्पॉन्सिव डिज़ाइन परीक्षणों के लिए)

* **misMatchTolerance** `Number` <br />
    इस कमांड के लिए ग्लोबल *misMatchTolerance* मूल्य को ओवरराइड करता है। 0 और 100 के बीच एक संख्या पास करें जो दो छवियों को समान मानने के लिए अनमेल की डिग्री को परिभाषित करता है।

* **fuzzLevel** `Number` <br />
    इस कमांड के लिए ग्लोबल *fuzzLevel* मूल्य को ओवरराइड करता है। 0 और 100 के बीच एक संख्या पास करें जो Spectre की इमेज तुलना विधि के फज फैक्टर को परिभाषित करता है।

* **ignoreComparison** `String` <br />
    इस कमांड के लिए ग्लोबल *ignoreComparison* मूल्य को ओवरराइड करता है। तुलना विधि को समायोजित करने के लिए `nothing`, `colors` या `antialiasing` मूल्य के साथ एक स्ट्रिंग पास करें।

* **viewportChangePause**  `Number` <br />
    इस कमांड के लिए ग्लोबल *viewportChangePause* मूल्य को ओवरराइड करता है। व्यूपोर्ट परिवर्तन के बाद x मिलीसेकंड इंतज़ार करें।

### लाइसेंस

MIT