---
id: wdio-html-nice-reporter
title: HTML रिपोर्टर
custom_edit_url: https://github.com/rpii/wdio-html-reporter/edit/master/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-html-nice-reporter एक तीसरे पक्ष का पैकेज है, अधिक जानकारी के लिए कृपया देखें [GitHub](https://github.com/rpii/wdio-html-reporter) | [npm](https://www.npmjs.com/package/wdio-html-nice-reporter)
 # wdio-html-nice-reporter

webdriver.io के लिए एक रिपोर्टर जो एक अच्छी HTML रिपोर्ट उत्पन्न करता है।  
नाम मूर्खतापूर्ण है लेकिन webdriverio के साथ एकीकरण प्रदान करता है

### नया: अब बीटा नहीं है।

### नया: सफाई की गई और लॉगिंग को wdio-logging पर स्विच किया गया। उदाहरण अपडेट किए गए हैं।
    आपको अपने कॉन्फिग से log4Js लॉगर इनिशियलाइजेशन को हटाना होगा

### नया: webdriverio 8 संगतता के लिए ES मॉड्यूल के रूप में पुनर्लिखित।
    आपको अपने टेस्ट ऐप में परिवर्तन करने की आवश्यकता हो सकती है

### बग फिक्स: webdriverio json async write के बीच में बंद हो रहा था।

### बग फिक्स: json write के लिए सही तरीके से अवेट नहीं किया जा रहा था

### बेहतरीन नया सुधार: json.stringify के कारण अब मेमोरी एरर नहीं आएगा

### बेहतरीन नई सुविधा: प्रत्येक परीक्षण का वीडियो लें


## [चेंजलॉग](https://github.com/rpii/wdio-html-reporter/blob/master/changes.md)

## जानकारी

यह प्रोजेक्ट [@rpii/wdio-html-reporter](https://www.npmjs.com/package/wdio-html-reporter) का पुनर्लेखन है
यह TypeScript में कई सुधारों के साथ लिखा गया है।



## कॉन्फिगरेशन

### WDIO.config.ts

निम्नलिखित कोड डिफ़ॉल्ट wdio टेस्ट रनर कॉन्फिगरेशन दिखाता है। बस एक HtmlReporter ऑब्जेक्ट को रिपोर्टर्स ऐरे में जोड़ें:

### एक कार्यशील wdio.config.ts [/samples/wdio.config.ts](https://github.com/rpii/wdio-html-reporter/blob/master//samples/wdio.config.ts) में उपलब्ध है

नीचे उस फ़ाइल से स्निपेट दिए गए हैं।

```typescript

// wdio.config.ts
import {ReportGenerator, HtmlReporter} from 'wdio-html-nice-reporter';
let reportAggregator: ReportGenerator;

const BaseConfig: WebdriverIO.Config = {
    
  reporters: ['spec',
        ["html-nice", {
            outputDir: './reports/html-reports/',
            filename: 'report.html',
            reportTitle: 'Test Report Title',
            linkScreenshots: true,
            //to show the report in a browser when done
            showInBrowser: true,
            collapseTests: false,
            //to turn on screenshots after every test
            useOnAfterCommandForScreenshot: false
        }
        ]
    ]
    
 
};
```
## कॉन्फिगरेशन विकल्प:
  
### सभी सूट्स के लिए मास्टर रिपोर्ट जनरेट करने के लिए

webdriver.io प्रत्येक टेस्ट सूट के लिए रिपोर्टर को कॉल करेगा। यह रिपोर्ट्स को एकत्रित नहीं करता है। ऐसा करने के लिए, अपने wdio.config.js में निम्नलिखित इवेंट हैंडलर जोड़ें

ब्राउज़र कॉन्फिग फ़ाइल में जोड़ें:
```
let reportAggregator : ReportAggregator;
```
ब्राउज़र कॉन्फिग ऑब्जेक्ट में जोड़ें:
```javascript
    onPrepare: function(config, capabilities) {

    reportAggregator = new ReportGenerator({
        outputDir: './reports/html-reports/',
        filename: 'master-report.html',
        reportTitle: 'Master Report',
        browserName: capabilities.browserName,
        collapseTests: true
    });
    reportAggregator.clean();
}


onComplete: function (exitCode, config, capabilities, results) {
    (async () => {
        await reportAggregator.createReport();
    })();
}


``` 


  
### इस रिपोर्ट से pdf फ़ाइल जनरेट करने के लिए

उन लोगों के लिए जिन्हें इसकी आवश्यकता नहीं है, समर्थन को हल्का रखने के लिए एक अतिरिक्त प्लगइन की आवश्यकता होती है।
देखें [@rpii/wdio-html-reporter-pdf](https://www.npmjs.com/package/@rpii/wdio-html-reporter-pdf)


## सैंपल आउटपुट:

![Report Screenshot](https://github.com/rpii/wdio-html-reporter/blob/master/TestReport.png)

## browserName

इसे मैन्युअल रूप से सेट किया जाना चाहिए। यह कॉन्फिगरेशन समय पर उपलब्ध नहीं है क्योंकि ब्राउज़र ऑब्जेक्ट तब तक मौजूद नहीं होता जब तक आप एक सत्र शुरू नहीं करते।