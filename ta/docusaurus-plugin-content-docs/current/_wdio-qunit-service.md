---
id: wdio-qunit-service
title: QUnit சேவை
custom_edit_url: https://github.com/mauriciolauffer/wdio-qunit-service/edit/main/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-qunit-service is a 3rd party package, for more information please see [GitHub](https://github.com/mauriciolauffer/wdio-qunit-service) | [npm](https://www.npmjs.com/package/wdio-qunit-service)

[![npm](https://img.shields.io/npm/v/wdio-qunit-service)](https://www.npmjs.com/package/wdio-qunit-service) [![test](https://github.com/mauriciolauffer/wdio-qunit-service/actions/workflows/test.yml/badge.svg)](https://github.com/mauriciolauffer/wdio-qunit-service/actions/workflows/test.yml)

[WebdriverIO](https://webdriver.io/) (wdio) சேவை [QUnit](https://qunitjs.com/) உலாவி அடிப்படையிலான சோதனைகளை இயக்குவதற்கும் அவற்றை தானாகவே `wdio` சோதனை தொகுப்புகளாக மாற்றுவதற்கும்.

## Karma-க்கு பதிலாக

`QUnit Service` என்பது [Karma JS](https://karma-runner.github.io/latest/index.html) பயன்படுத்தி `QUnit` சோதனைகளை ([karma-qunit](https://github.com/karma-runner/karma-qunit/), [karma-ui5](https://github.com/SAP/karma-ui5) அல்லது Karma மற்றும் QUnit-ன் வேறு எந்த கலவையையும்) இயக்குபவர்களுக்கான நேரடி மாற்று ஆகும். Karma [காலாவதியானது](https://github.com/karma-runner/karma) மற்றும் மக்கள் நவீன மாற்றுகளுக்கு மாற வேண்டும்!

உங்கள் QUnit சோதனைகளை அவை இருப்பது போலவே வைத்திருக்க விரும்பினால், எந்த மறுஎழுத்தும் இல்லாமல் மற்றும் மறுவடிவமைப்பு இல்லாமல், `QUnit Service` உங்களுக்குத் தேவையான அனைத்தும் ஆகும். இது உங்கள் QUnit HTML கோப்புகளை உலாவியில் இயக்கி, அனைத்து முடிவுகளையும் `wdio` வடிவத்தில் பிடிக்கிறது.

இதனால், டெவலப்பர்கள் `wdio` சூழலில் கிடைக்கும் மற்ற அனைத்துடனும் `QUnit Service` ஐப் பயன்படுத்த முடியும்.

சோதனை ஓட்டத்தை [வீடியோவில்](https://webdriver.io/docs/wdio-video-reporter/) பதிவு செய்ய விரும்புகிறீர்களா? ஒருவேளை [ஸ்கிரீன்ஷாட்](https://webdriver.io/docs/api/browser/saveScreenshot/) எடுக்க அல்லது [PDF](https://webdriver.io/docs/api/browser/savePDF/)-இல் சேமிக்கவா? [கோட் கவரேஜ்](https://www.npmjs.com/package/wdio-monocart-service) பார்க்கவா? சோதனை முடிவுகளை [JUnit](https://webdriver.io/docs/junit-reporter) வடிவத்தில் சேமிக்கவா? செய்யுங்கள், `QUnit Service` உங்கள் வழியில் குறுக்கிடாது.

## நிறுவல்

`WebdriverIO`-ஐ உள்ளமைத்த பிறகு, உங்கள் `package.json` கோப்பில் `wdio-qunit-service`-ஐ devDependency-ஆக நிறுவவும்.

```shell
npm install wdio-qunit-service --save-dev
```

நீங்கள் இன்னும் `WebdriverIO`-ஐ உள்ளமைக்கவில்லை என்றால், அதிகாரப்பூர்வ [ஆவணங்களைப்](https://webdriver.io/docs/gettingstarted) பார்க்கவும்.

## கட்டமைப்பு

`QUnit Service` ஐப் பயன்படுத்த, அதை உங்கள் `wdio.conf.js` கோப்பில் உள்ள `services` பட்டியலில் சேர்க்க வேண்டும். wdio ஆவணங்கள் [கட்டமைப்பு கோப்பு](https://webdriver.io/docs/configurationfile) தொடர்பான அனைத்து தகவல்களையும் கொண்டுள்ளது:

```js
// wdio.conf.js
export const config = {
  // ...
  services: ["qunit"],
  // ...
};
```

## பயன்பாடு

சோதனைகளை செயல்படுத்துவதற்கு முன் வலை சேவையகம் இயங்குகிறதா என்பதை உறுதிப்படுத்தவும். `wdio` வலை சேவையகத்தைத் தொடங்காது.

### .spec அல்லது .test கோப்புகளுடன்

உங்கள் WebdriverIO சோதனையில், நீங்கள் QUnit HTML சோதனை பக்கத்திற்கு செல்ல வேண்டும், பின்னர் `browser.getQUnitResults()` அழைக்க வேண்டும்.

```js
describe("QUnit test page", () => {
  it("should pass QUnit tests", async () => {
    await browser.url("http://localhost:8080/test/unit/unitTests.qunit.html");
    await browser.getQUnitResults();
  });
});
```

ஒவ்வொரு QUnit HTML சோதனை பக்கத்திற்கும் ஒரு WebdriverIO சோதனை கோப்பு வைத்திருப்பது பரிந்துரைக்கப்படுகிறது. இது சோதனைகள் இணையாகவும் முழுமையாக தனிமைப்படுத்தப்பட்டும் இயங்கும் என்பதை உறுதி செய்கிறது.

### கட்டமைப்பு மட்டுமே, .spec அல்லது .test கோப்புகள் இல்லை

நீங்கள் spec/test கோப்புகளை உருவாக்க விரும்பவில்லை என்றால், கட்டமைப்பிற்கு QUnit HTML கோப்புகளின் பட்டியலை அனுப்பலாம், சோதனைகள் தானாகவே உருவாக்கப்படும்.

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

### சோதனை முடிவுகள்

சோதனை முடிவுகள் இப்படி இருக்கலாம்:
![QUnit Service test results](https://github.com/mauriciolauffer/wdio-qunit-service/blob/main/./wdio-qunit-service-results.png?raw=true)

## உதாரணங்கள்

`javascript`, `typescript` மற்றும் பலவற்றைப் பயன்படுத்திய மாதிரிகளுக்கு [examples](https://github.com/mauriciolauffer/wdio-qunit-service/blob/main/./examples/) கோப்புறையைப் பார்க்கவும்.

### SAP Fiori / UI5 பயன்பாடுகளில் பயன்பாடு

நன்கு அறியப்பட்ட [openui5-sample-app](https://github.com/SAP/openui5-sample-app) ஐப் பயன்படுத்தி நேரடி [உதாரணம்](https://github.com/mauriciolauffer/wdio-qunit-service/blob/main/./examples/openui5-sample-app/):

- கட்டமைப்பு கோப்பை உருவாக்கவும்: [wdio.conf.js](https://github.com/mauriciolauffer/wdio-qunit-service/blob/main/./examples/openui5-sample-app/webapp/test/wdio.conf.js)

- QUnit சோதனை கோப்புகளை எங்கே கண்டுபிடிப்பது என்பதை `wdio`-க்கு தெரிவிக்கவும்:

- - QUnit கோப்புகளை [சேவை கட்டமைப்பில்](https://github.com/mauriciolauffer/wdio-qunit-service/blob/main/./examples/openui5-sample-app-no-specs/webapp/test/wdio.conf.js) சேர்க்கவும்
- - அல்லது
- - [யூனிட் டெஸ்ட்களுக்கு](https://github.com/mauriciolauffer/wdio-qunit-service/blob/main/./examples/openui5-sample-app/webapp/test/unit/unit.test.js) WebdriverIO சோதனை கோப்பை உருவாக்கவும் மற்றும் [OPA5 டெஸ்ட்களுக்கு](https://github.com/mauriciolauffer/wdio-qunit-service/blob/main/./examples/openui5-sample-app/webapp/test/integration/opa.test.js) மற்றொன்றை உருவாக்கவும்

- சோதனைகளை செயல்படுத்துவதற்கு முன் வலை சேவையகம் இயங்க வேண்டும்

- இயக்கவும் $ `wdio run webapp/test/wdio.conf.js`

## ஆசிரியர்

Mauricio Lauffer

- லிங்க்ட்இன்: [https://www.linkedin.com/in/mauriciolauffer](https://www.linkedin.com/in/mauriciolauffer)

## உரிமம்

இந்த திட்டம் MIT உரிமத்தின் கீழ் உரிமம் பெற்றது - விவரங்களுக்கு [LICENSE](https://github.com/mauriciolauffer/wdio-qunit-service/blob/main/LICENSE) கோப்பைப் பார்க்கவும்.