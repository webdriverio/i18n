---
id: junit-reporter
title: जूनिट रिपोर्टर
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-junit-reporter/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> एक WebdriverIO रिपोर्टर जो [Jenkins](http://jenkins-ci.org/) के अनुकूल XML आधारित JUnit रिपोर्ट बनाता है

## इंस्टालेशन

सबसे आसान तरीका है अपने `package.json` में `@wdio/junit-reporter` को devDependency के रूप में रखना, इस प्रकार:

```sh
npm install @wdio/junit-reporter --save-dev
```

`WebdriverIO` कैसे इंस्टॉल करें, इस पर निर्देश [यहां](https://webdriver.io/docs/gettingstarted) मिल सकते हैं।

## आउटपुट

यह रिपोर्टर प्रत्येक रनर के लिए एक रिपोर्ट आउटपुट करेगा, इसलिए आप प्रत्येक स्पेक फ़ाइल के लिए एक xml रिपोर्ट प्राप्त करेंगे। नीचे स्पेक फ़ाइल में विभिन्न परिदृश्यों को दिए गए XML आउटपुट के उदाहरण हैं।

### सिंगल डिस्क्राइब ब्लॉक
```javascript
describe('a test suite', () => {
    it('a test case', function () {
      // do something
      // assert something
    });
});
```
बन जाता है
```xml
<testsuites>
    <testsuite name="a test suite" timestamp="2019-04-18T13:45:21" time="11.735" tests="0" failures="0" errors="0" skipped="0">
        <properties>
          <property name="specId" value="0"/>
          <property name="suiteName" value="a test suite"/>
          <property name="capabilities" value="chrome"/>
          <property name="file" value=".\test\specs\asuite.spec.js"/>
        </properties>
        <testcase classname="chrome.a_test_case" name="a_test_suite_a_test_case" time="11.706"/>
    </testsuite>
</testsuites>
```

### नेस्टेड डिस्क्राइब ब्लॉक
```javascript
describe('a test suite', () => {
    describe('a nested test suite', function() {
        it('a test case', function () {
          // do something
          // assert something
        });
    });
});
```
बन जाता है
```xml
<testsuites>
    <testsuite name="a test suite" timestamp="2019-04-18T13:45:21" time="11.735" tests="0" failures="0" errors="0" skipped="0">
    <properties>
      <property name="specId" value="0"/>
      <property name="suiteName" value="a test suite"/>
      <property name="capabilities" value="chrome"/>
      <property name="file" value=".\test\specs\asuite.spec.js"/>
    </properties>
  </testsuite>
  <testsuite name="a nested test suite" timestamp="2019-04-18T13:45:21" time="11.735" tests="0" failures="0" errors="0" skipped="0">
    <properties>
      <property name="specId" value="0"/>
      <property name="suiteName" value="a nested test suite"/>
      <property name="capabilities" value="chrome"/>
      <property name="file" value=".\test\specs\asuite.spec.js"/>
    </properties>
    <testcase classname="chrome.a_test_case" name="a nested test suite a test case" time="11.706"/>
  </testsuite>
</testsuites>
```

### मल्टीपल डिस्क्राइब ब्लॉक
```javascript
describe('a test suite', () => {
    it('a test case', function () {
      // do something
      // assert something
    });
});
describe('a second test suite', () => {
    it('a second test case', function () {
      // do something
      // assert something
    });
});
```
बन जाता है
```xml
<testsuites>
    <testsuite name="a test suite" timestamp="2019-04-18T13:45:21" time="11.735" tests="0" failures="0" errors="0" skipped="0">
    <properties>
      <property name="specId" value="0"/>
      <property name="suiteName" value="a test suite"/>
      <property name="capabilities" value="chrome"/>
      <property name="file" value=".\test\specs\asuite.spec.js"/>
      <testcase classname="chrome.a_test_case" name="a nested test suite a test case" time="11.706"/>
    </properties>
  </testsuite>
  <testsuite name="a second test suite" timestamp="2019-04-18T13:45:21" time="11.735" tests="0" failures="0" errors="0" skipped="0">
    <properties>
      <property name="specId" value="0"/>
      <property name="suiteName" value="a second test suite"/>
      <property name="capabilities" value="chrome"/>
      <property name="file" value=".\test\specs\asuite.spec.js"/>
    </properties>
    <testcase classname="chrome.a_second_test_case" name="a_second_test_suite_a_second_test_case" time="11.706"/>
  </testsuite>
</testsuites>
```

### असफलताएं और त्रुटियां
सभी टेस्ट केस की असफलताओं को JUnit टेस्ट केस त्रुटियों के रूप में मैप किया जाता है। एक विफल परीक्षण केस ऐसा दिखेगा:

```xml
<testcase classname="chrome.a_test_case" name="a_test_suite_a_test_case" time="0.372">
  <failure message="Error: some error"/>
    <system-err>
        <![CDATA[
Error: some assertion failure
    at UserContext.<anonymous> (C:\repo\webdriver-example\test\specs/a_test_suite.spec.js:22:17)
]]>
  </system-err>
</testcase>
```

## कॉन्फिगरेशन

निम्नलिखित कोड डिफ़ॉल्ट wdio टेस्ट रनर कॉन्फिगरेशन दिखाता है। बस एरे में रिपोर्टर के रूप में `'junit'` जोड़ें। परीक्षण के दौरान कुछ आउटपुट प्राप्त करने के लिए आप [WDIO Dot Reporter](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-dot-reporter) और WDIO JUnit Reporter को एक साथ चला सकते हैं:

```js
// wdio.conf.js
module.exports = {
    // ...
    reporters: [
        'dot',
        ['junit', {
            outputDir: './',
            outputFileFormat: function(options) { // optional
                return `results-${options.cid}.${options.capabilities}.xml`
            }
        }]
    ],
    // ...
};
```

निम्नलिखित विकल्प समर्थित हैं:

### outputDir
एक डायरेक्टरी परिभाषित करें जहां आपकी xml फ़ाइलें स्टोर की जानी चाहिए।

प्रकार: `String`<br />
आवश्यक

### outputFileFormat
परीक्षण निष्पादन के बाद बनाई गई xml फ़ाइलों को परिभाषित करें।

प्रकार: `Object`<br />
डिफ़ॉल्ट: ``function (opts) { return `wdio-${this.cid}-${name}-reporter.log` }``

```
outputFileFormat: function (options) {
    return 'mycustomfilename.xml';
}
```

> ध्यान दें: `options.capabilities` उस रनर के लिए आपकी क्षमताओं का ऑब्जेक्ट है, इसलिए आपके स्ट्रिंग में `${options.capabilities}` निर्दिष्ट करने से [Object object] लौटेगा। आपको अपनी फ़ाइल नाम में क्षमताओं के किन गुणों को चाहते हैं, यह निर्दिष्ट करना होगा।

### suiteNameFormat

टेस्ट सूट नाम को फॉर्मेट करने के लिए कस्टम रेगेक्स प्रदान करने की क्षमता देता है (उदाहरण के लिए, आउटपुट xml में)।

प्रकार: `Regex`,<br />
डिफ़ॉल्ट: `/[^a-zA-Z0-9@]+/`

```js
// wdio.conf.js
module.exports = {
    // ...
    reporters: [
        'dot',
        ['junit', {
            outputDir: './',
            suiteNameFormat: /[^a-zA-Z0-9@]+/
            outputFileFormat: function(options) { // optional
                return `results-${options.cid}.${options.capabilities}.xml`
            }
        }]
    ],
    // ...
};
```

### addFileAttribute

प्रत्येक टेस्टकेस में फ़ाइल एट्रिब्यूट जोड़ता है। यह कॉन्फिग मुख्य रूप से CircleCI के लिए है। यह सेटिंग अधिक समृद्ध विवरण प्रदान करती है लेकिन अन्य CI प्लेटफार्मों पर टूट सकती है।

प्रकार: `Boolean`,<br />
डिफ़ॉल्ट: `false`


### packageName

आप `'packageName'` सेट करके पैकेज को एक अतिरिक्त स्तर से तोड़ सकते हैं। उदाहरण के लिए, यदि आप अलग-अलग पर्यावरण वेरिएबल सेट के साथ किसी टेस्ट सूट पर इटरेट करना चाहते हैं:

प्रकार: `String`<br />
उदाहरण:

```js
// wdio.conf.js
module.exports = {
    // ...
    reporters: [
        'dot',
        ['junit', {
            outputDir: './',
            packageName: process.env.USER_ROLE // chrome.41 - administrator
        }]
    ]
    // ...
};
```

### errorOptions

xml के अंदर त्रुटि सूचनाओं के विभिन्न संयोजनों को सेट करने की अनुमति देता है।<br />
एक जैस्मिन टेस्ट जैसे `expect(true).toBe(false, 'my custom message')` के लिए आपको यह टेस्ट त्रुटि मिलेगी:

```
{
    matcherName: 'toBe',
    message: 'Expected true to be false, \'my custom message\'.',
    stack: 'Error: Expected true to be false, \'my custom message\'.\n    at UserContext.it (/home/mcelotti/Workspace/WebstormProjects/forcebeatwio/test/marco/prova1.spec.js:3:22)',
    passed: false,
    expected: [ false, 'my custom message' ],
    actual: true
}
```

इसलिए आप चुन सकते हैं *कौन सी* की *कहां* उपयोग की जाएगी, नीचे दिए गए उदाहरण को देखें।

प्रकार: `Object`,<br />
डिफ़ॉल्ट: `errorOptions: { error: "message" }`<br />
उदाहरण:

```js
// wdio.conf.js
module.exports = {
    // ...
    reporters: [
        'dot',
        ['junit', {
            outputDir: './',
            errorOptions: {
                error: 'message',
                failure: 'message',
                stacktrace: 'stack'
            }
        }]
    ],
    // ...
};
```

### addWorkerLogs

वैकल्पिक पैरामीटर, रिपोर्टर में टेस्ट से कंसोल लॉग अटैच करने के लिए इस पैरामीटर को true पर सेट करें।

प्रकार: `Boolean`<br />
डिफ़ॉल्ट: `false`<br />
उदाहरण:

```js
// wdio.conf.js
module.exports = {
    // ...
    reporters: [
        'dot',
        ['junit', {
            outputDir: './',
            addWorkerLogs: true
        }]
    ],
    // ...
};
```

## टेस्टकेस में कस्टम प्रॉपर्टी जोड़ना

यह प्लगइन एक फंक्शन `addProperty(name, value)` प्रदान करता है। इस फंक्शन का उपयोग वर्तमान में चल रहे टेस्ट स्टेप में अतिरिक्त जूनिट टेस्टकेस प्रॉपर्टी जोड़ने के लिए किया जा सकता है। ये प्रॉपर्टीज़ रिजल्टिंग xml में `<property name="${name}" value="${value}" />` के रूप में रिपोर्ट की जाएंगी।

इसका एक प्रारूपिक उपयोग किसी इश्यू या टेस्टकेस से लिंक जोड़ना है।


### उपयोग उदाहरण

मोचा के लिए एक उदाहरण:

```js
import { addProperty } from '@wdio/junit-reporter'

describe('Suite', () => {
    it('Case', () => {
        addProperty('test_case', 'TC-1234')
    })
})
```

## जेंकिंस सेटअप

अंत में आपको अपने CI जॉब (जैसे जेंकिंस) को बताना होगा कि वह xml फ़ाइल कहां पा सकता है। ऐसा करने के लिए, अपने जॉब में एक पोस्ट-बिल्ड एक्शन जोड़ें जो टेस्ट चलने के बाद निष्पादित होता है और जेंकिंस (या आपके वांछित CI सिस्टम) को अपने XML टेस्ट परिणामों की ओर इशारा करें:

![Point Jenkins to XML files](https://webdriver.io/img/jenkins-postjob.png "Point Jenkins to XML files")

यदि आपके CI सिस्टम में ऐसा कोई पोस्ट-बिल्ड स्टेप नहीं है, तो इंटरनेट पर कहीं न कहीं उसके लिए एक प्लगइन है।

----

WebdriverIO पर अधिक जानकारी के लिए [होमपेज](https://webdriver.io) देखें।