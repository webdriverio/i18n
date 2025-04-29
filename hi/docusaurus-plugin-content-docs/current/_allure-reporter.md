---
id: allure-reporter
title: एलूर रिपोर्टर
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-allure-reporter/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> WebdriverIO रिपोर्टर प्लगइन [Allure टेस्ट रिपोर्ट](https://allurereport.org/docs/webdriverio/) बनाने के लिए।

![Allure Reporter Example](/img/allure.png)

## इंस्टालेशन

सबसे आसान तरीका है अपने `package.json` में `@wdio/allure-reporter` को devDependency के रूप में शामिल करना।

```json
{
  "devDependencies": {
    "@wdio/allure-reporter": "^7.0.0"
  }
}
```

आप इसे सरलता से इस तरह कर सकते हैं:

```sh
npm install @wdio/allure-reporter --save-dev
```

## कॉन्फिगरेशन

अपनी wdio.conf.js फ़ाइल में आउटपुट डायरेक्टरी को कॉन्फिगर करें:

```js
export const config = {
    // ...
    reporters: [['allure', {
        outputDir: 'allure-results',
        disableWebdriverStepsReporting: true,
        disableWebdriverScreenshotsReporting: true,
    }]],
    // ...
}
```
- `outputDir` डिफॉल्ट रूप से `./allure-results` है। टेस्ट रन पूरा होने के बाद, आप पाएंगे कि इस डायरेक्टरी में प्रत्येक स्पेक के लिए एक `.xml` फ़ाइल के साथ-साथ कई `.txt` और `.png` फ़ाइलें और अन्य अटैचमेंट हैं।
- `disableWebdriverStepsReporting` - वैकल्पिक पैरामीटर (डिफॉल्ट रूप से `false`), रिपोर्टर में केवल कस्टम स्टेप्स को लॉग करने के लिए।
- `issueLinkTemplate` - वैकल्पिक पैरामीटर, इश्यू लिंक पैटर्न निर्दिष्ट करने के लिए। रिपोर्टर `{}` प्लेसहोल्डर को `addIssue(value)` कॉल पैरामीटर में निर्दिष्ट मान से बदल देगा। यही लॉजिक Cucumber का उपयोग करने पर लागू होता है और यदि किसी भी स्तर पर टैग `issue` सेट किया गया है, तो इसे रिपोर्ट में लिंक में परिवर्तित कर दिया जाएगा। पैरामीटर मान उदाहरण:
  ```
  https://example.org/issue/{}
  ```
- `tmsLinkTemplate` - वैकल्पिक पैरामीटर, TMS (Test Management System) लिंक पैटर्न निर्दिष्ट करने के लिए। रिपोर्टर `{}` प्लेसहोल्डर को `addTestId(value)` कॉल पैरामीटर में निर्दिष्ट मान से बदल देगा। यही लॉजिक Cucumber का उपयोग करने पर लागू होता है और यदि किसी भी स्तर पर टैग `testId` सेट किया गया है, तो इसे रिपोर्ट में लिंक में परिवर्तित कर दिया जाएगा। पैरामीटर मान उदाहरण:
  ```
  https://example.org/tms/{}
  ```
- `disableWebdriverScreenshotsReporting` - वैकल्पिक पैरामीटर (डिफॉल्ट रूप से `false`), रिपोर्टर में स्क्रीनशॉट अटैच न करने के लिए।
- `useCucumberStepReporter` - वैकल्पिक पैरामीटर (डिफॉल्ट रूप से `false`), इसे true पर सेट करें ताकि cucumber का उपयोग करते समय रिपोर्ट हायरार्की बदली जा सके। इसे स्वयं आजमाएँ और देखें कि यह कैसा दिखता है।
- `disableMochaHooks` - वैकल्पिक पैरामीटर (डिफॉल्ट रूप से `false`), इसे true पर सेट करें ताकि Allure रिपोर्टर में `before/after` स्टैकट्रेस/स्क्रीनशॉट/रिजल्ट हुक्स को न लाया जाए।
- `addConsoleLogs` - वैकल्पिक पैरामीटर (डिफॉल्ट रूप से `false`), रिपोर्टर में स्टेप से कंसोल लॉग अटैच करने के लिए true पर सेट करें।
- `reportedEnvironmentVars` (**टाइप:** `Record<string, string>`) - रिपोर्ट में पर्यावरण चर प्रदर्शित करने के लिए इस विकल्प को सेट करें। ध्यान दें कि इसे सेट करने से वास्तविक पर्यावरण चर संशोधित नहीं होते हैं।

## समर्थित Allure API
* `addLabel(name, value)` - टेस्ट को कस्टम लेबल असाइन करें
* `addFeature(featureName)` – टेस्ट को फीचर्स असाइन करें
* `addStory(storyName)` – टेस्ट को यूजर स्टोरी असाइन करें
* `addSeverity(value)` – टेस्ट को सेवेरिटी असाइन करें, इनमें से एक मान स्वीकार करता है: blocker, critical, normal, minor, trivial
* `addTag(value)` – टेस्ट को टैग लेबल असाइन करें
* `addEpic(value)` – टेस्ट को एपिक लेबल असाइन करें
* `addOwner(value)` – टेस्ट को ओनर लेबल असाइन करें
* `addSuite(value)` – टेस्ट को सूट लेबल असाइन करें
* `addSubSuite(value)` – टेस्ट को सब सूट लेबल असाइन करें
* `addParentSuite(value)` – टेस्ट को पेरेंट सूट लेबल असाइन करें
* `addIssue(value)` – टेस्ट को इश्यू आईडी असाइन करें
* `addAllureId(value)` – टेस्ट को allure टेस्ट ऑप्स आईडी लेबल असाइन करें
* `addTestId(value)` – टेस्ट को TMS टेस्ट आईडी असाइन करें
* ~~`addEnvironment(name, value)` ~~ – एक डेप्रिकेटेड फंक्शन जो अब काम नहीं करता। इसके बजाय `reportedEnvironmentVars` का उपयोग करें
* `addAttachment(name, content, [type])` – टेस्ट में अटैचमेंट सेव करें।
    * `name` (*String*) - अटैचमेंट नाम।
    * `content` – अटैचमेंट कंटेंट।
    * `type` (*String*, वैकल्पिक) – अटैचमेंट MIME-type, डिफॉल्ट रूप से `text/plain` 
* `addArgument(name, value)` - टेस्ट में एक अतिरिक्त आर्गुमेंट जोड़ें
* `addDescription(description, [type])` – टेस्ट में विवरण जोड़ें।
    * `description` (*String*) - टेस्ट का विवरण।
    * `type` (*String*, वैकल्पिक) – विवरण का प्रकार, डिफॉल्ट रूप से `text`। मान ['text', 'html','markdown']
* `addStep(title, [{content, name = 'attachment'}], [status])` - टेस्ट में स्टेप जोड़ें।
    * `title` (*String*) - स्टेप का नाम।
    * `content` (*String*, वैकल्पिक) - स्टेप अटैचमेंट
    * `name` (*String*, वैकल्पिक) - स्टेप अटैचमेंट नाम, डिफॉल्ट रूप से `attachment`।
    * `status` (*String*, वैकल्पिक) - स्टेप स्टेटस, डिफॉल्ट रूप से `passed`। "failed", "passed" या "broken" होना चाहिए
* `startStep(title)` - एक स्टेप से शुरू करें
    * `title` (*String*) - स्टेप का नाम।
* `endStep(status)` - एक स्टेप के साथ समाप्त करें
    * `status` (*String*, वैकल्पिक) - स्टेप स्टेटस, डिफॉल्ट रूप से `passed`। "failed", "passed" या "broken" होना चाहिए
* `step(name, body)` - अंदर कंटेंट फंक्शन के साथ स्टेप शुरू करता है। अनंत पदानुक्रम के साथ स्टेप्स बनाने की अनुमति देता है
    * `body` (*Function*) - स्टेप बॉडी async फंक्शन

### उपयोग
Allure API तक इस प्रकार पहुंचा जा सकता है:

CJS

```js
const allureReporter = require('@wdio/allure-reporter').default
```

ESM

```js
import allureReporter from '@wdio/allure-reporter'
```

Mocha उदाहरण

```js
describe('Suite', () => {
    it('Case', () => {
        allureReporter.addFeature('Feature')
    })
})
```

#### Cucumber

बेसिक Cucumber उदाहरण:

```js
Given('I include feature and story name', () => {
    allureReporter.addFeature('Feature_name');
    allureReporter.addStory('Story_name');
})
```

#### कस्टम स्टेप्स

`step` मेथड स्टेप्स के साथ काम करना सरल बनाती है क्योंकि प्रत्येक स्टेप एक async फंक्शन के रूप में प्रस्तुत होता है जिसमें अंदर कोई भी कंटेंट हो सकता है।
फंक्शन का पहला आर्गुमेंट वर्तमान स्टेप है, जिसमें अधिकांश allure API मेथड्स (जैसे `label`, `epic`, `attach` आदि) हैं:

```js
allureReporter.step('my step name', async (s1) => {
    s1.label('foo', 'bar')
    await s1.step('my child step name', async (s2) => {
        // you can add any combination of steps in the body function
    })
})
```

##### Cucumber टैग्स

विशेष नामों (`issue` और `testId`) वाले Cucumber टैग लिंक में परिवर्तित किए जाते हैं (संबंधित लिंक टेम्प्लेट्स को पहले कॉन्फिगर किया जाना चाहिए):
```gherkin
@issue=BUG-1
@testId=TST-2
Feature: This is a feature with global tags that will be converted to Allure links

  @issue=BUG-3
  @testId=TST-4
  Scenario: This is a scenario with tags that will be converted to Allure links
    Given I do something
```

विशेष नामों (`feature`) वाले Cucumber टैग Allure लेबल्स में मैप किए जाते हैं:

```gherkin
Feature: Test user role

  @feature=login
  Scenario: Login
    Given I test login
```

## रिपोर्ट प्रदर्शित करना

परिणामों को Allure द्वारा प्रदान किए गए किसी भी [रिपोर्टिंग टूल](https://allurereport.org/) द्वारा उपयोग किया जा सकता है। उदाहरण के लिए:

### कमांड-लाइन

[Allure कमांड-लाइन टूल](https://www.npmjs.com/package/allure-commandline) इंस्टॉल करें, और परिणाम डायरेक्टरी प्रोसेस करें:

```sh
allure generate [allure_output_dir] && allure open
```

यह एक रिपोर्ट जनरेट करेगा (डिफॉल्ट रूप से `./allure-report` में), और इसे आपके ब्राउज़र में खोलेगा।

### ऑटोजनरेट रिपोर्ट

आप प्रोग्रामैटिक रूप से Allure कमांड लाइन टूल का उपयोग करके रिपोर्ट भी ऑटो-जनरेट कर सकते हैं। ऐसा करने के लिए अपने प्रोजेक्ट में पैकेज इंस्टॉल करें:

```sh
npm i allure-commandline
```

फिर अपने `onComplete` हुक को जोड़ें या विस्तारित करें या इसके लिए [कस्टम सर्विस](/docs/customservices) बनाएँ:

```js
// wdio.conf.js
const allure = require('allure-commandline')

export const config = {
    // ...
    onComplete: function() {
        const reportError = new Error('Could not generate Allure report')
        const generation = allure(['generate', 'allure-results', '--clean'])
        return new Promise((resolve, reject) => {
            const generationTimeout = setTimeout(
                () => reject(reportError),
                5000)

            generation.on('exit', function(exitCode) {
                clearTimeout(generationTimeout)

                if (exitCode !== 0) {
                    return reject(reportError)
                }

                console.log('Allure report successfully generated')
                resolve()
            })
        })
    }
    // ...
}
```

### Jenkins

[Allure Jenkins प्लगइन](https://allurereport.org/docs/integrations-jenkins/) इंस्टॉल और कॉन्फिगर करें

## स्क्रीनशॉट जोड़ें

Mocha और Jasmine के लिए `afterTest` हुक या Cucumber के लिए `afterStep` हुक में WebDriverIO से `takeScreenshot` फंक्शन का उपयोग करके स्क्रीनशॉट रिपोर्ट से जोड़े जा सकते हैं।
पहले रिपोर्टर विकल्पों में `disableWebdriverScreenshotsReporting: false` सेट करें, फिर afterStep हुक में जोड़ें:

### Mocha / Jasmine

```js title="wdio.conf.js"
afterTest: async function(test, context, { error, result, duration, passed, retries }) {
    if (error) {
        await browser.takeScreenshot();
    }
}
```

### Cucumber

```js title="wdio.conf.js"
afterStep: async function (step, scenario, { error, duration, passed }, context) {
  if (error) {
    await browser.takeScreenshot();
  }
}
```

जैसा कि ऊपर दिए गए उदाहरण में दिखाया गया है, जब इस फंक्शन को कॉल किया जाता है, तो एक स्क्रीनशॉट इमेज allure रिपोर्ट से जुड़ जाएगी।