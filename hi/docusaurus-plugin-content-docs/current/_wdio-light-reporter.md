---
id: wdio-light-reporter
title: लाइट रिपोर्टर रिपोर्टर
custom_edit_url: https://github.com/sarfrajadstreaks/wdio-light-reporter/edit/main/README.md
---


> wdio-light-reporter एक तृतीय पक्ष पैकेज है, अधिक जानकारी के लिए कृपया देखें [GitHub](https://github.com/sarfrajadstreaks/wdio-light-reporter) | [npm](https://www.npmjs.com/package/wdio-light-reporter)

## HTML और Mochawesome रिपोर्टर से प्रेरित

!दर्शन:

> यह रिपोर्टर cucumber रिपोर्ट पुनर्निर्माण का समर्थन नहीं करता है और इसे bdd और mocha फ्रेमवर्क को ध्यान में रखकर विकसित किया गया है।
> यहां, `describe()` सेक्शन को टेस्ट सिनेरियो और `it()` को टेस्ट सिनेरियो के अंदर टेस्टकेस के रूप में माना जाता है।

## विशेषताएं

1. आसान सेटअप
2. उन्नत UI
3. HTML रिपोर्ट में एम्बेडेड स्क्रीनशॉट
4. स्टेप्स कॉन्टेक्स्ट या नाम शामिल करने के लिए addLabel()


## रिलीज़
V 0.1.9 - प्रारंभिक रिलीज़
V 0.2.6 - (नवीनतम)
  1. एकाधिक पर्यावरण रन शामिल करें और पर्यावरण के आधार पर अलग करें।
  2. बग फिक्स
  3. बेहतर प्रदर्शन।


## उदाहरण

![Example](https://github.com/sarfrajadstreaks/wdio-light-reporter/blob/main/./ReadME/example_1.png)
![Example](https://github.com/sarfrajadstreaks/wdio-light-reporter/blob/main/./ReadME/example_2.png)
![Example](https://github.com/sarfrajadstreaks/wdio-light-reporter/blob/main/./ReadME/example_3.png)

## इंस्टालेशन

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

रिपोर्टर में स्वचालित रूप से स्क्रीनशॉट लेने के लिए कॉन्फिगर करने की क्षमता नहीं है, लेकिन हालांकि अगर मैन्युअल रूप से कॉन्फिगर किया जाता है, तो यह इवेंट को सुनता है और HTML रिपोर्ट में स्क्रीनशॉट संलग्न करता है।
**रिपोर्ट में स्क्रीनशॉट शामिल करने के लिए wdio conf फाइल में afterTest() हुक में नीचे दिए गए कोड को जोड़ें।**

```
afterTest: async function (test,context,{ error, result, duration, passed, retries }) {
    if (!passed) {await browser.takeScreenshot()}
},
```

## रिजल्टफाइल्स

प्रत्येक रन प्रत्येक स्पेक फाइल के लिए json रिपोर्ट को पुनर्जनित करता है, संयुक्त json और HTML रिपोर्ट उत्पन्न करने के लिए, wdio conf फाइल में **onComplete()** हुक में नीचे दिए गए कोड को जोड़ें

```
 onComplete: function (exitCode, config, capabilities, results) {
    const mergeResults = require("wdio-light-reporter/src/mergeResults"); //you can add this on top of the file
    mergeResults("./Results");
 },
```

> अगर आप अपने टेस्ट को किसी भी --suite विकल्प के बिना चलाते हैं तो यह डिफॉल्ट को सूट के रूप में मानता है
> यदि आप चलाते समय सूट के रूप में कई पैरामीटर देते हैं तो रिपोर्टर काम नहीं करता है।
> wdio run `wdio.conf.js --suite firstSuite` - **(अच्छी तरह से काम करता है)** :)  
>  wdio run `wdio.conf.js --suite firstSuite --suite secondSuite` **(काम नहीं करता)** :(

## कॉन्टेक्स्ट जोड़ना

> आप किसी भी स्टेप में कॉन्टेक्स्ट जोड़ने के लिए या इसे स्टेप्स के रूप में शामिल करने के लिए `useLabel()` का उपयोग कर सकते हैं।

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
## अपडेट
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
**फ्री, हां, बिल्कुल!**