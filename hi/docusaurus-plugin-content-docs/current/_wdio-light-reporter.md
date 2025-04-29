---
id: wdio-light-reporter
title: लाइट रिपोर्टर रिपोर्टर
custom_edit_url: https://github.com/sarfrajadstreaks/wdio-light-reporter/edit/main/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-light-reporter एक तृतीय पक्ष पैकेज है, अधिक जानकारी के लिए कृपया देखें [GitHub](https://github.com/sarfrajadstreaks/wdio-light-reporter) | [npm](https://www.npmjs.com/package/wdio-light-reporter)

## HTML और Mochawesome रिपोर्टर से प्रेरित

!दर्शन:

> यह रिपोर्टर cucumber रिपोर्ट पुनर्निर्माण का समर्थन नहीं करता है और bdd और mocha फ्रेमवर्क को ध्यान में रखकर विकसित किया गया है।
> यहां, `describe()` अनुभाग को टेस्ट सिनारियो और `it()` को टेस्ट सिनारियो के अंदर टेस्टकेस के रूप में माना जाता है।

## विशेषताएँ

1. आसान सेटअप
2. उन्नत यूआई
3. एचटीएमएल रिपोर्ट में एम्बेडेड स्क्रीनशॉट
4. स्टेप्स कॉन्टेक्स्ट या नाम शामिल करने के लिए addLabel()


## रिलीज
V 0.1.9 - प्रारंभिक रिलीज
V 0.2.6 - (नवीनतम)
  1. कई पर्यावरण रन शामिल करें और पर्यावरण के आधार पर अलग करें।
  2. बग्स फिक्स
  3. बेहतर प्रदर्शन।


## उदाहरण

![Example](https://github.com/sarfrajadstreaks/wdio-light-reporter/blob/main/./ReadME/example_1.png)
![Example](https://github.com/sarfrajadstreaks/wdio-light-reporter/blob/main/./ReadME/example_2.png)
![Example](https://github.com/sarfrajadstreaks/wdio-light-reporter/blob/main/./ReadME/example_3.png)

## इंस्टॉलेशन

NPM

```sh
npm install wdio-light-reporter --save-dev
```

## कॉन्फिगरेशन

```
reporters: ['dot', ['light',{
      outputDir: './Results',
      outputFile:`demo${new Date()}`,    // html report file will be name this 
      addScreenshots: false,   // to add screenshots in report make it as true. Default is false
  }]
],
```

## स्क्रीनशॉट

रिपोर्टर के पास स्क्रीनशॉट लेने के लिए स्वचालित रूप से कॉन्फिगर करने की क्षमता नहीं है, लेकिन हालांकि अगर मैन्युअल रूप से कॉन्फिगर किया गया है, तो यह इवेंट को सुनता है और HTML रिपोर्ट में स्क्रीनशॉट अटैच करता है।
**रिपोर्ट में स्क्रीनशॉट शामिल करने के लिए wdio conf फाइल में afterTest() हुक में नीचे दिया गया कोड जोड़ें।**

```
afterTest: async function (test,context,{ error, result, duration, passed, retries }) {
    if (!passed) {await browser.takeScreenshot()}
},
```

## रिजल्टफाइल्स

प्रत्येक रन प्रत्येक स्पेक फाइल के लिए json रिपोर्ट को फिर से जनरेट करता है, संयुक्त json और HTML रिपोर्ट जनरेट करने के लिए, wdio conf फाइल में **onComplete()** हुक में नीचे दिया गया कोड जोड़ें

```
 onComplete: function (exitCode, config, capabilities, results) {
    const mergeResults = require("wdio-light-reporter/src/mergeResults"); //you can add this on top of the file
    mergeResults("./Results");
 },
```

> अगर आप अपने टेस्ट को बिना किसी --suite विकल्प के चलाते हैं तो यह डिफॉल्ट रूप से सूट मानता है
> यदि आप रन करते समय सूट्स के रूप में कई पैरामीटर देते हैं तो रिपोर्टर काम नहीं करता है।
> wdio run `wdio.conf.js --suite firstSuite` - **(अच्छा काम करता है)** :)  
>  wdio run `wdio.conf.js --suite firstSuite --suite secondSuite` **(काम नहीं करता)** :(

## कंटेक्स्ट जोड़ना

> आप किसी भी स्टेप के लिए कंटेक्स्ट जोड़ने के लिए या इसे स्टेप्स के रूप में शामिल करने के लिए `useLabel()` का उपयोग कर सकते हैं।

```
const { addLabel } = require("wdio-light-reporter").default;
describe("Show how to use addLabel ", () => {
  it("report will added this a steps/context in report", async () => {
      addLabel("Log Example 1 as step 1")
      console.log("Log Example 1 )
      addLabel("Log Example 2 as step 2")
      console.log("Log Example 2 )
  })
})


```
## अपडेट्स
```
 reporters: ['dot', ['light',{
      outputDir: './Results',
      outputFile:"demo",    // html report file will be name this 
      addScreenshots: false,   // to add screenshots in report make it as true. Default is false
      //autoClean:false       // removed autoClean and include the same functionality as default in mergeResult function
  }]
],
```
## लाइसेंस

MIT
**फ्री, बिल्कुल!**