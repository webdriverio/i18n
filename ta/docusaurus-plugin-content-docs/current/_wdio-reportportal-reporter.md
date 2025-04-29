---
id: wdio-reportportal-reporter
title: ரிப்போர்ட் போர்டல் ரிப்போர்ட்டர்
custom_edit_url: https://github.com/borisosipov/wdio-reportportal-reporter/edit/master/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-reportportal-reporter is a 3rd party package, for more information please see [GitHub](https://github.com/borisosipov/wdio-reportportal-reporter) | [npm](https://www.npmjs.com/package/wdio-reportportal-reporter)


![npm](https://img.shields.io/npm/v/wdio-reportportal-reporter)
![npm](https://img.shields.io/npm/dm/wdio-reportportal-reporter)
> A WebdriverIO reporter plugin to report results to Report Portal([http://reportportal.io/](http://reportportal.io/)).

## நிறுவல்

`wdio-reportportal-reporter` மற்றும் `wdio-reportportal-service` ஐ உங்கள் `package.json` இல் devDependency ஆக வைத்திருப்பதே எளிதான வழியாகும்.

```json
{
  "devDependencies": {
    "wdio-reportportal-reporter": "^7.0.0",
    "wdio-reportportal-service": "^7.0.0"
  }
}
```

`WebdriverIO` ஐ எவ்வாறு நிறுவுவது என்பதற்கான வழிமுறைகளை [இங்கே](https://webdriver.io/docs/gettingstarted.html) காணலாம்.

## கட்டமைப்பு

உங்கள் wdio.conf.js கோப்பில் வெளியீட்டு அடைவை கட்டமைக்கவும்:

```js
const reportportal = require('wdio-reportportal-reporter');
const RpService = require("wdio-reportportal-service");

const conf = {
  reportPortalClientConfig: { // report portal settings
    token: '00000000-0000-0000-0000-00000000000',
    endpoint: 'https://reportportal-url/api/v1',
    launch: 'launch_name',
    project: 'project_name',
    mode: 'DEFAULT',
    debug: false,
    description: "Launch description text",
    attributes: [{key:"tag", value: "foo"}],
    headers: {"foo": "bar"}, // optional headers for internal http client
    restClientConfig: { // axios like http client config - https://github.com/axios/axios#request-config
      proxy: {
        protocol: 'https',
        host: '127.0.0.1',
        port: 9000,
        auth: {
          username: 'mikeymike',
          password: 'rapunz3l'
        }
      },
      timeout: 60000
    }
  },
  reportSeleniumCommands: false, // add selenium commands to log
  seleniumCommandsLogLevel: 'debug', // log level for selenium commands
  autoAttachScreenshots: false, // automatically add screenshots
  screenshotsLogLevel: 'info', // log level for screenshots
  parseTagsFromTestTitle: false, // parse strings like `@foo` from titles and add to Report Portal
  cucumberNestedSteps: false, // report cucumber steps as Report Portal steps
  autoAttachCucumberFeatureToScenario: false, // requires cucumberNestedSteps to be true for use
  sanitizeErrorMessages: true, // strip color ascii characters from error stacktrace
  sauceLabOptions : {
    enabled: true, // automatically add SauseLab ID to rp tags.
    sldc: "US" // automatically add SauseLab region to rp tags.
  }
};

exports.config = {
  // ...
  services: [[RpService, {}]],
  reporters: [[reportportal, conf]],
  // ...
};
```

# கூடுதல் API

API முறைகளை பின்வருமாறு அணுகலாம்:

```js
const reporter = require('wdio-reportportal-reporter')
```

### முறைகளின் விளக்கம்

* `reporter.addAttribute({key, value})` – தற்போதைய சோதனைக்கு ஒரு பண்புக்கூறைச் சேர்க்கவும்.
  * `key` (*string*, optional) - பண்புக்கூறு விசை. இது வெற்று அல்லாத சரமாக இருக்க வேண்டும்.
  * `value` (*string*, required)– பண்புக்கூறு மதிப்பு. இது வெற்று அல்லாத சரமாக இருக்க வேண்டும்.
* `reporter.addAttributeToCurrentSuite({key, value})` - தற்போதைய சூட்சுக்கு ஒரு பண்புக்கூறைச் சேர்க்கவும்.
  * `key` (*string*, optional) - பண்புக்கூறு விசை. இது வெற்று அல்லாத சரமாக இருக்க வேண்டும்.
  * `value` (*string*, required)– பண்புக்கூறு மதிப்பு. இது வெற்று அல்லாத சரமாக இருக்க வேண்டும்.
* `reporter.addDescriptionToCurrentSuite(description)` - தற்போதைய சூட்சுக்கு சில சரத்தைச் சேர்க்கவும்.
  * `description` (*string*) - விளக்க உள்ளடக்கம். உரையை மார்க்டவுன் மூலம் வடிவமைக்கலாம்.
* `reporter.addDescriptionToAllSuites(description)` - வரவிருக்கும் அனைத்து சூட்களுக்கும் சில சரத்தைச் சேர்க்கவும். (முன்பு எல்லா hooks இலும் பயன்படுத்தவும், எனவே ஒவ்வொரு சூட்சுக்கும் ஒரே விளக்கம் கிடைக்கும்)
  * `description` (*string*) - விளக்க உள்ளடக்கம். உரையை மார்க்டவுன் மூலம் வடிவமைக்கலாம்.
* `reporter.sendLog(level, message)` – தற்போதைய சூட்சு\சோதனை பொருளுக்கு பதிவை அனுப்பவும்.
  * `level` (*string*) - பதிவு நிலை. மதிப்புகள் ['trace', 'debug', 'info', 'warn', 'error'].
  * `message` (*string*)– பதிவு செய்தி உள்ளடக்கம்.
* `reporter.sendFile(level, name, content, [type])` – தற்போதைய சூட்சு\சோதனை பொருளுக்கு கோப்பை அனுப்பவும்.
  * `level` (*string*) - பதிவு நிலை. மதிப்புகள் ['trace', 'debug', 'info', 'warn', 'error'].
  * `name` (*string*)– கோப்பு பெயர்.
  * `content` (*string*) – இணைப்பு உள்ளடக்கம்
  * `type` (*string*, optional) – இணைப்பு MIME-வகை, இயல்பாக `image/png`
  * `message` (*string*)– பதிவு செய்தி உள்ளடக்கம்.
* `reporter.sendLogToTest(test, level, message)` - குறிப்பிட்ட சோதனைக்கு பதிவை அனுப்பவும்.
  * `test` (*object*) - `afterTest\afterStep` wdio hook இலிருந்து சோதனை பொருள்
  * `level` (*string*) - பதிவு நிலை. மதிப்புகள் ['trace', 'debug', 'info', 'warn', 'error'].
  * `message` (*string*)– பதிவு செய்தி உள்ளடக்கம்.
* `reporter.sendFileToTest(test, level, name, content, [type])` – குறிப்பிட்ட சோதனைக்கு கோப்பை அனுப்பவும்.
  * `test` (*object*) - `afterTest\afterStep` wdio hook இலிருந்து சோதனை பொருள்
  * `level` (*string*) - பதிவு நிலை. மதிப்புகள் ['trace', 'debug', 'info', 'warn', 'error'].
  * `name` (*string*)– கோப்பு பெயர்.
  * `content` (*string*) – இணைப்பு உள்ளடக்கம்
  * `type` (*string*, optional) – இணைப்பு MIME-வகை, இயல்பாக `image/png`
  * `message` (*string*)– பதிவு செய்தி உள்ளடக்கம்.

கவனம் செலுத்துங்கள்: `sendLog`\\`sendFile` பதிவை **தற்போது இயங்கும் சோதனை பொருளுக்கு** அனுப்புகிறது. அது செயலில் உள்ள சோதனை இல்லாமல் பதிவை அனுப்பினால் (எ.கா hooks இலிருந்து அல்லது சூட் நிலையில்) அது Report Portal UI இல் அறிக்கை செய்யப்படாது.

`sendLogToTest`\\`sendFileToTest` முறைகள் wdio afterTest hook இலிருந்து தோல்வியடைந்த சோதனை பொருளுக்கு திரைப்பிடிப்புகள் அல்லது பதிவுகளை அனுப்ப வேண்டியிருக்கும்போது பயனுள்ளதாக இருக்கும்.

Mocha உதாரணம்:

```js
const reportportal = require('wdio-reportportal-reporter');
const path = require('path');
const fs = require('fs');

exports.config = {
...
  async afterTest(test) {
    if (test.passed === false) {
      const filename = "screnshot.png";
      const outputFile = path.join(__dirname, filename);
      await browser.saveScreenshot(outputFile);
      reportportal.sendFileToTest(test, 'info', filename, fs.readFileSync(outputFile));
    }
  }
...
```

Jasmine உதாரணம்:

```js
const reportportal = require('wdio-reportportal-reporter');
const path = require('path');
const fs = require('fs');

exports.config = {
...
  async afterTest(test) {
    if (test.passed === false) {
      const filename = "screnshot.png";
      const outputFile = path.join(__dirname, filename);
      await browser.saveScreenshot(outputFile);
      //!!
      Object.assign(test, {title: test.description}}
      reportportal.sendFileToTest(test, 'info', filename, fs.readFileSync(outputFile));
    }
  }
...
```

WDIO Cucumber "5.14.3+" உதாரணம்:

```js
const reportportal = require('wdio-reportportal-reporter');

exports.config = {
...
   afterStep: async function (uri, feature, { error, result, duration, passed }, stepData, context) {
     if (!passed) {
        let failureObject = {};
        failureObject.type = 'afterStep';
        failureObject.error = error;
        failureObject.title = `${stepData.step.keyword}${stepData.step.text}`;
        const screenShot = await global.browser.takeScreenshot();
        let attachment = Buffer.from(screenShot, 'base64');
        reportportal.sendFileToTest(failureObject, 'error', "screnshot.png", attachment);
    }
  }
...
}
```

## Report Portal UI இணைப்பை பெறுதல்

```js
const RpService = require("wdio-reportportal-service");
...
    onComplete: async function (_, config) {
        const link = await RpService.getLaunchUrl(config);
        console.log(`Report portal link ${link}`)
    }
...
```

அல்லது மிகவும் சிக்கலான வழி

```js
const RpService = require("wdio-reportportal-service");
...
    onComplete: async function (_, config) {
        const protocol = 'http:';
        const hostname = 'example.com';
        const port = ':8080'; // or empty string for default 80/443 ports
        const link = await RpService.getLaunchUrlByParams(protocol, hostname, port, config);
        console.log(`Report portal link ${link}`)
    }
...
```

## ஏற்கனவே உள்ள தொடக்கத்திற்கு சோதனையை அறிக்கை செய்தல்

நீங்கள் ஏற்கனவே உள்ள செயலில் உள்ள தொடக்கத்திற்கு சோதனையை அறிக்கை செய்ய விரும்பினால், அதை சுற்றுச்சூழல் மாறி `REPORT_PORTAL_LAUNCH_ID` மூலம் ரிப்போர்ட்டருக்கு அனுப்பலாம்
அத்தகைய தொடக்கத்தை தொடங்குவது போலவே அதை முடிப்பதற்கும் நீங்கள் பொறுப்பாளி.

```sh
export REPORT_PORTAL_LAUNCH_ID=SomeLaunchId
npm run wdio
```

## உரிமம்

இந்த திட்டம் MIT உரிமத்தின் கீழ் உரிமம் பெற்றுள்ளது - விவரங்களுக்கு [LICENSE.md](https://github.com/BorisOsipov/wdio-reportportal-reporter/blob/master/LICENSE) கோப்பைப் பார்க்கவும்