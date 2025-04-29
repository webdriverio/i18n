---
id: wdio-novus-visual-regression-service
title: நோவஸ் விஷுவல் ரிகிரஷன் சேவை
custom_edit_url: https://github.com/Jnegrier/wdio-novus-visual-regression-service/edit/master/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-novus-visual-regression-service என்பது ஒரு மூன்றாம் தரப்பு தொகுப்பாகும், மேலும் தகவலுக்கு [GitHub](https://github.com/Jnegrier/wdio-novus-visual-regression-service) | [npm](https://www.npmjs.com/package/wdio-novus-visual-regression-service) ஐப் பார்க்கவும்

[![Build Status](https://travis-ci.com/Jnegrier/wdio-novus-visual-regression-service.svg?branch=master)](https://travis-ci.com/Jnegrier/wdio-novus-visual-regression-service)

> WebdriverIO க்கான விஷுவல் ரிகிரஷன் சோதனை

Jan-André Zinser இன் [wdio-visual-regression-service](https://github.com/zinserjan/wdio-visual-regression-service) மற்றும் [wdio-screenshot](https://github.com/zinserjan/wdio-screenshot) பணியின் அடிப்படையில் உருவாக்கப்பட்டது

## நிறுவல்

நீங்கள் wdio-novus-visual-regression-service ஐ வழக்கம் போல் NPM மூலம் நிறுவலாம்:

```sh
$ npm install wdio-novus-visual-regression-service --save-dev
```

`WebdriverIO` ஐ எவ்வாறு நிறுவுவது என்பதற்கான வழிமுறைகளை [இங்கே](https://webdriver.io/docs/gettingstarted) காணலாம்.

## கட்டமைப்பு
உங்கள் WebdriverIO கட்டமைப்பின் சேவை பிரிவில் `novus-visual-regression` ஐச் சேர்த்து, சேவை விருப்பங்களில் உங்கள் விரும்பிய ஒப்பீட்டு உத்தியை வரையறுத்து wdio-novus-visual-regression-service ஐ அமைக்கவும்.

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

### விருப்பங்கள்
உங்கள் wdio.config.js இல் `visualRegression` என்ற கீ இன் கீழ் பின்வரும் அமைப்புடன் ஒரு கட்டமைப்பு பொருளை அனுப்பலாம்:

* **compare** `Object` <br />
திரைப்பிடிப்பு ஒப்பீட்டு முறை, [Compare Methods](#compare-methods) ஐப் பார்க்கவும்

* **viewportChangePause**  `Number`  ( இயல்புநிலை: 100 ) <br />
திரைக்காட்சி மாற்றத்திற்குப் பிறகு x மில்லி வினாடிகள் காத்திருக்கவும். உலாவி மறுபடியும் வரைவதற்கு சிறிது நேரம் ஆகலாம். இது ரெண்டரிங் சிக்கல்களுக்கு வழிவகுத்து, ரன்களுக்கு இடையில் முரண்பட்ட முடிவுகளை உருவாக்கும்.

* **viewports** `Object[{ width: Number, height: Number }]`  ( இயல்புநிலை: *[current-viewport]* ) (**desktop மட்டும்**)<br />
   அனைத்து திரைப்பிடிப்புகளும் வெவ்வேறு திரைக்காட்சி பரிமாணங்களில் எடுக்கப்படும் (எ.கா. ரெஸ்பான்சிவ் டிசைன் சோதனைகளுக்கு)

* **orientations** `String[] {landscape, portrait}`  ( இயல்புநிலை: *[current-orientation]* ) (**mobile மட்டும்**)<br />
    அனைத்து திரைப்பிடிப்புகளும் வெவ்வேறு திரை திசைகளில் எடுக்கப்படும் (எ.கா. ரெஸ்பான்சிவ் டிசைன் சோதனைகளுக்கு)

### ஒப்பீட்டு முறைகள்
wdio-novus-visual-regression-service வெவ்வேறு திரைப்பிடிப்பு ஒப்பீட்டு முறைகளைப் பயன்படுத்த அனுமதிக்கிறது.

#### VisualRegressionCompare.LocalCompare
அதன் பெயர் குறிப்பிடுவது போல் *LocalCompare* உங்கள் கணினியில் உள்ளூரில் திரைப்பிடிப்புகளைக் கைப்பற்றி, முந்தைய ரன்களுடன் ஒப்பிடுகிறது.

அதன் கன்ஸ்ட்ரக்டருக்கு பின்வரும் விருப்பங்களை ஒரு பொருளாக அனுப்பலாம்:

* **referenceName** `Function` <br />
மாதிரி திரைப்பிடிப்புக்கான கோப்பு பெயரை திருப்பி அளிக்கும் செயல்பாட்டை அனுப்பவும். செயல்பாடானது முதல் அளவுருவாக கட்டளையைப் பற்றிய அனைத்து தொடர்புடைய தகவல்களையும் கொண்ட ஒரு *context* பொருளைப் பெறுகிறது.

* **screenshotName** `Function` <br />
தற்போதைய திரைப்பிடிப்புக்கான கோப்பு பெயரை திருப்பி அளிக்கும் செயல்பாட்டை அனுப்பவும். செயல்பாடானது முதல் அளவுருவாக கட்டளையைப் பற்றிய அனைத்து தொடர்புடைய தகவல்களையும் கொண்ட ஒரு *context* பொருளைப் பெறுகிறது.

* **diffName** `Function` <br />
வேறுபாடு திரைப்பிடிப்புக்கான கோப்பு பெயரை திருப்பி அளிக்கும் செயல்பாட்டை அனுப்பவும். செயல்பாடானது முதல் அளவுருவாக கட்டளையைப் பற்றிய அனைத்து தொடர்புடைய தகவல்களையும் கொண்ட ஒரு *context* பொருளைப் பெறுகிறது.

* **misMatchTolerance** `Number`  ( இயல்புநிலை: 0.01 ) <br />
0 மற்றும் 100 க்கு இடையில் ஒரு எண், இது இரண்டு படங்களை ஒரே மாதிரியாகக் கருதுவதற்கான பொருத்தமின்மையின் அளவை வரையறுக்கிறது, இந்த மதிப்பை அதிகரிப்பது சோதனை கவரேஜை குறைக்கும்.

* **ignoreComparison** `String`  ( இயல்புநிலை: nothing ) <br />
ஒப்பீடு முறையைச் சரிசெய்ய `nothing`, `colors` அல்லது `antialiasing` மதிப்புடன் ஒரு சரம் அனுப்பவும்.

தற்போதைய சோதனைப் பெயரைப் பொறுத்து திரைப்பிடிப்பு கோப்புப் பெயர்களை உருவாக்குவதற்கான எடுத்துக்காட்டிற்கு, [Configuration](#configuration) இன் மாதிரி குறியீட்டைப் பார்க்கவும்.

#### VisualRegressionCompare.SaveScreenshot
இந்த முறையானது `VisualRegressionCompare.LocalCompare` இன் மாற்றப்பட்ட வகையாகும், இது திரைப்பிடிப்புகளை மட்டும் கைப்பற்றுகிறது. நீங்கள் வேறுபாடுகளைக் காண்பிக்காமல் மாதிரி திரைப்பிடிப்புகளை உருவாக்கி முந்தையதை மேலெழுத விரும்பும்போது இது மிகவும் பயனுள்ளதாக இருக்கும்.

அதன் கன்ஸ்ட்ரக்டருக்கு பின்வரும் விருப்பங்களை ஒரு பொருளாக அனுப்பலாம்:

* **screenshotName** `Function` <br />
தற்போதைய திரைப்பிடிப்புக்கான கோப்பு பெயரை திருப்பி அளிக்கும் செயல்பாட்டை அனுப்பவும். செயல்பாடானது முதல் அளவுருவாக கட்டளையைப் பற்றிய அனைத்து தொடர்புடைய தகவல்களையும் கொண்ட ஒரு *context* பொருளைப் பெறுகிறது.

#### VisualRegressionCompare.Spectre
இந்த முறையானது [Spectre](https://github.com/wearefriday/spectre) வலை பயன்பாட்டிற்கு திரைப்பிடிப்புகளை பதிவேற்றுவதற்கு பயன்படுத்தப்படுகிறது.
Spectre என்பது விஷுவல் ரிகிரஷன் சோதனைக்கான ஒரு UI ஆகும். இது திரைப்பிடிப்புகளை சேமித்து ஒப்பிடுகிறது, இது தொடர்ச்சியான ஒருங்கிணைப்புக்கு மிகவும் பயனுள்ளதாக இருக்கும்.

அதன் கன்ஸ்ட்ரக்டருக்கு பின்வரும் விருப்பங்களை ஒரு பொருளாக அனுப்பலாம்:

* **url** `String` <br />
ஒரு spectre வெப்சர்விஸ் url ஐ அனுப்பவும்.

* **project** `String` <br />
உங்கள் திட்டத்திற்கு ஒரு பெயரை அனுப்பவும்.

* **suite** `String` <br />
உங்கள் சோதனை தொகுப்புக்கு ஒரு பெயரை அனுப்பவும். ஒரு திட்டத்தில் பல தொகுப்புகள் இருக்கலாம்.

* **test** `Function` <br />
திரைப்பிடிப்புக்கான சோதனை பெயரைத் திருப்பும் செயல்பாட்டை அனுப்பவும். செயல்பாடானது முதல் அளவுருவாக கட்டளையைப் பற்றிய அனைத்து தொடர்புடைய தகவல்களையும் கொண்ட ஒரு *context* பொருளைப் பெறுகிறது.

* **browser** `Function` <br />
திரைப்பிடிப்புக்கான உலாவியைத் திருப்பும் செயல்பாட்டை அனுப்பவும். செயல்பாடானது முதல் அளவுருவாக கட்டளையைப் பற்றிய அனைத்து தொடர்புடைய தகவல்களையும் கொண்ட ஒரு *context* பொருளைப் பெறுகிறது.

* **size** `Function` <br />
திரைப்பிடிப்புக்கான அளவைத் திருப்பும் செயல்பாட்டை அனுப்பவும். செயல்பாடானது முதல் அளவுருவாக கட்டளையைப் பற்றிய அனைத்து தொடர்புடைய தகவல்களையும் கொண்ட ஒரு *context* பொருளைப் பெறுகிறது.

* **fuzzLevel** `Number`  ( இயல்புநிலை: 30 ) <br />
Spectre இன் படம் ஒப்பீட்டு முறையின் fuzz காரணியை வரையறுக்கும் 0 மற்றும் 100 க்கு இடையில் ஒரு எண். மேலும் விவரங்களுக்கு [Spectre documentation](https://github.com/wearefriday/spectre) ஐப் பார்க்கவும்.

**எடுத்துக்காட்டு**
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

## பயன்பாடு
wdio-novus-visual-regression-service ஒரு WebdriverIO நிகழ்வை பின்வரும் கட்டளைகளுடன் மேம்படுத்துகிறது:
* `browser.checkViewport([{options}]);`
* `browser.checkDocument([{options}]);`
* `browser.checkElement(elementSelector, [{options}]);`


இவை அனைத்தும் வெவ்வேறு பரிமாணங்களில் திரைப்பிடிப்புகளைக் கைப்பற்ற அல்லது தொடர்பற்ற பகுதிகளை விலக்க (எ.கா. உள்ளடக்கம்) உதவும் விருப்பங்களை வழங்குகின்றன. பின்வரும் விருப்பங்கள் உள்ளன:


* **exclude** `String[]|Object[]` (**இன்னும் செயல்படுத்தப்படவில்லை**)<br />
  உங்கள் திரைப்பிடிப்பில் அடிக்கடி மாறும் பகுதிகளை விலக்கவும், ஒன்று அல்லது பல கூறுகளை வினவும் அனைத்து வகையான வெவ்வேறு [WebdriverIO தேர்வு உத்திகளை](http://webdriver.io/guide/usage/selectors.html) அனுப்பலாம் அல்லது ஒரு செவ்வகம் அல்லது பல்கோணத்தை விரிக்கும் x மற்றும் y மதிப்புகளை வரையறுக்கலாம்

* **hide** `Object[]`<br />
  அனைத்து வகையான வெவ்வேறு [WebdriverIO தேர்வு உத்திகளால்](http://webdriver.io/guide/usage/selectors.html) வினவப்பட்ட அனைத்து உறுப்புகளையும் மறைக்கிறது (via `visibility: hidden`)

* **remove** `Object[]`<br />
  அனைத்து வகையான வெவ்வேறு [WebdriverIO தேர்வு உத்திகளால்](http://webdriver.io/guide/usage/selectors.html) வினவப்பட்ட அனைத்து உறுப்புகளையும் அகற்றுகிறது (via `display: none`)

* **viewports** `Object[{ width: Number, height: Number }]` (**desktop மட்டும்**)<br />
     இந்த கட்டளைக்கான உலகளாவிய *viewports* மதிப்பை மேலெழுதுகிறது. அனைத்து திரைப்பிடிப்புகளும் வெவ்வேறு திரைக்காட்சி பரிமாணங்களில் எடுக்கப்படும் (எ.கா. ரெஸ்பான்சிவ் டிசைன் சோதனைகளுக்கு)

* **orientations** `String[] {landscape, portrait}` (**mobile மட்டும்**)<br />
    இந்த கட்டளைக்கான உலகளாவிய *orientations* மதிப்பை மேலெழுதுகிறது. அனைத்து திரைப்பிடிப்புகளும் வெவ்வேறு திரை திசைகளில் எடுக்கப்படும் (எ.கா. ரெஸ்பான்சிவ் டிசைன் சோதனைகளுக்கு)

* **misMatchTolerance** `Number` <br />
    இந்த கட்டளைக்கான உலகளாவிய *misMatchTolerance* மதிப்பை மேலெழுதுகிறது. இரண்டு படங்களை ஒரே மாதிரியாகக் கருதுவதற்கான பொருத்தமின்மையின் அளவை வரையறுக்கும் 0 மற்றும் 100 க்கு இடையில் ஒரு எண்ணை அனுப்பவும்.

* **fuzzLevel** `Number` <br />
    இந்த கட்டளைக்கான உலகளாவிய *fuzzLevel* மதிப்பை மேலெழுதுகிறது. Spectre இன் படம் ஒப்பீட்டு முறையின் fuzz காரணியை வரையறுக்கும் 0 மற்றும் 100 க்கு இடையில் ஒரு எண்ணை அனுப்பவும்.

* **ignoreComparison** `String` <br />
    இந்த கட்டளைக்கான உலகளாவிய *ignoreComparison* மதிப்பை மேலெழுதுகிறது. ஒப்பீடு முறையைச் சரிசெய்ய `nothing`, `colors` அல்லது `antialiasing` மதிப்புடன் ஒரு சரம் அனுப்பவும்.

* **viewportChangePause**  `Number` <br />
    இந்த கட்டளைக்கான உலகளாவிய *viewportChangePause* மதிப்பை மேலெழுதுகிறது. திரைக்காட்சி மாற்றத்திற்குப் பிறகு x மில்லி வினாடிகள் காத்திருக்கவும்.

### உரிமம்

MIT