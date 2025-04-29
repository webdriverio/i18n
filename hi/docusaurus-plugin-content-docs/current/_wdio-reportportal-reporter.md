---
id: wdio-reportportal-reporter
title: रिपोर्ट पोर्टल रिपोर्टर
custom_edit_url: https://github.com/borisosipov/wdio-reportportal-reporter/edit/master/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-reportportal-reporter एक तृतीय पक्ष पैकेज है, अधिक जानकारी के लिए कृपया देखें [GitHub](https://github.com/borisosipov/wdio-reportportal-reporter) | [npm](https://www.npmjs.com/package/wdio-reportportal-reporter)


![npm](https://img.shields.io/npm/v/wdio-reportportal-reporter)
![npm](https://img.shields.io/npm/dm/wdio-reportportal-reporter)
> एक WebdriverIO रिपोर्टर प्लगइन जो परिणामों को रिपोर्ट पोर्टल([http://reportportal.io/](http://reportportal.io/)) पर रिपोर्ट करता है।

## इंस्टालेशन

सबसे आसान तरीका है `wdio-reportportal-reporter` और `wdio-reportportal-service` को अपने `package.json` में devDependency के रूप में रखना।

```json
{
  "devDependencies": {
    "wdio-reportportal-reporter": "^7.0.0",
    "wdio-reportportal-service": "^7.0.0"
  }
}
```

`WebdriverIO` को कैसे इंस्टॉल करें, इस पर निर्देश [यहां](https://webdriver.io/docs/gettingstarted.html) पाए जा सकते हैं।

## कॉन्फिगरेशन

अपनी wdio.conf.js फ़ाइल में आउटपुट निर्देशिका को कॉन्फ़िगर करें:

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

# अतिरिक्त API

Api मेथड्स का उपयोग इस प्रकार किया जा सकता है:

```js
const reporter = require('wdio-reportportal-reporter')
```

### मेथड्स का विवरण

* `reporter.addAttribute({key, value})` – वर्तमान टेस्ट में एक एट्रिब्यूट जोड़ें।
  * `key` (*string*, वैकल्पिक) - एट्रिब्यूट की। यह गैर-रिक्त स्ट्रिंग होनी चाहिए।
  * `value` (*string*, आवश्यक) – एट्रिब्यूट वैल्यू। यह गैर-रिक्त स्ट्रिंग होनी चाहिए।
* `reporter.addAttributeToCurrentSuite({key, value})` - वर्तमान सूट में एक एट्रिब्यूट जोड़ें।
  * `key` (*string*, वैकल्पिक) - एट्रिब्यूट की। यह गैर-रिक्त स्ट्रिंग होनी चाहिए।
  * `value` (*string*, आवश्यक) – एट्रिब्यूट वैल्यू। यह गैर-रिक्त स्ट्रिंग होनी चाहिए।
* `reporter.addDescriptionToCurrentSuite(description)` - वर्तमान सूट में कुछ स्ट्रिंग जोड़ें।
  * `description` (*string*) - विवरण सामग्री। टेक्स्ट को मार्कडाउन के साथ फॉर्मेट किया जा सकता है।
* `reporter.addDescriptionToAllSuites(description)` - सभी आगामी सूट्स में कुछ स्ट्रिंग जोड़ें। (इसे सभी हुक से पहले उपयोग करें, ताकि हर सूट को समान विवरण मिले)
  * `description` (*string*) - विवरण सामग्री। टेक्स्ट को मार्कडाउन के साथ फॉर्मेट किया जा सकता है।
* `reporter.sendLog(level, message)` – वर्तमान सूट/टेस्ट आइटम में लॉग भेजें।
  * `level` (*string*) - लॉग लेवल। वैल्यूज ['trace', 'debug', 'info', 'warn', 'error']।
  * `message` (*string*) – लॉग संदेश सामग्री।
* `reporter.sendFile(level, name, content, [type])` – वर्तमान सूट/टेस्ट आइटम में फ़ाइल भेजें।
  * `level` (*string*) - लॉग लेवल। वैल्यूज ['trace', 'debug', 'info', 'warn', 'error']।
  * `name` (*string*) – फ़ाइल नाम।
  * `content` (*string*) – अटैचमेंट सामग्री
  * `type` (*string*, वैकल्पिक) – अटैचमेंट MIME-type, डिफ़ॉल्ट `image/png` है
  * `message` (*string*) – लॉग संदेश सामग्री।
* `reporter.sendLogToTest(test, level, message)` - विशिष्ट टेस्ट में लॉग भेजें।
  * `test` (*object*) - `afterTest\afterStep` wdio हुक से टेस्ट ऑब्जेक्ट
  * `level` (*string*) - लॉग लेवल। वैल्यूज ['trace', 'debug', 'info', 'warn', 'error']।
  * `message` (*string*) – लॉग संदेश सामग्री।
* `reporter.sendFileToTest(test, level, name, content, [type])` – विशिष्ट टेस्ट में फ़ाइल भेजें।
  * `test` (*object*) - `afterTest\afterStep` wdio हुक से टेस्ट ऑब्जेक्ट
  * `level` (*string*) - लॉग लेवल। वैल्यूज ['trace', 'debug', 'info', 'warn', 'error']।
  * `name` (*string*) – फ़ाइल नाम।
  * `content` (*string*) – अटैचमेंट सामग्री
  * `type` (*string*, वैकल्पिक) – अटैचमेंट MIME-type, डिफ़ॉल्ट `image/png` है
  * `message` (*string*) – लॉग संदेश सामग्री।

ध्यान दें: `sendLog`\\`sendFile` लॉग को **वर्तमान चल रहे टेस्ट आइटम** में भेजता है। इसका मतलब है कि अगर आप सक्रिय टेस्ट के बिना लॉग भेजते हैं (जैसे हुक्स से या सूट लेवल पर) तो यह रिपोर्ट पोर्टल UI में रिपोर्ट नहीं किया जाएगा।

`sendLogToTest`\\`sendFileToTest` मेथड्स तब उपयोगी होते हैं जब आपको wdio afterTest हुक से विफल टेस्ट आइटम में स्क्रीनशॉट या लॉग भेजने की आवश्यकता होती है।

Mocha उदाहरण:

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

Jasmine उदाहरण:

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

WDIO Cucumber "5.14.3+" उदाहरण:

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

## रिपोर्ट पोर्टल UI लॉन्च पेज का लिंक प्राप्त करना

```js
const RpService = require("wdio-reportportal-service");
...
    onComplete: async function (_, config) {
        const link = await RpService.getLaunchUrl(config);
        console.log(`Report portal link ${link}`)
    }
...
```

या अधिक जटिल तरीके से

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

## मौजूदा लॉन्च में टेस्ट रिपोर्ट करना

यदि आप टेस्ट को मौजूदा सक्रिय लॉन्च में रिपोर्ट करना चाहते हैं तो आप इसे पर्यावरण चर `REPORT_PORTAL_LAUNCH_ID` के माध्यम से रिपोर्टर को पास कर सकते हैं
आप ऐसे लॉन्च को शुरू करने के साथ-साथ समाप्त करने के लिए भी जिम्मेदार हैं।

```sh
export REPORT_PORTAL_LAUNCH_ID=SomeLaunchId
npm run wdio
```

## लाइसेंस

यह प्रोजेक्ट MIT लाइसेंस के तहत लाइसेंस प्राप्त है - विवरण के लिए [LICENSE.md](https://github.com/BorisOsipov/wdio-reportportal-reporter/blob/master/LICENSE) फ़ाइल देखें