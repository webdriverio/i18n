---
id: wdio-html-nice-reporter
title: HTML அறிக்கையாளர்
custom_edit_url: https://github.com/rpii/wdio-html-reporter/edit/master/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-html-nice-reporter என்பது ஒரு 3வது தரப்பு தொகுப்பு, மேலும் தகவலுக்கு [GitHub](https://github.com/rpii/wdio-html-reporter) | [npm](https://www.npmjs.com/package/wdio-html-nice-reporter) ஐப் பார்க்கவும்
 # wdio-html-nice-reporter

webdriver.io க்கான ஒரு அறிக்கையாளர், இது அழகான HTML அறிக்கையை உருவாக்குகிறது.  
பெயர் முட்டாள்தனமாக இருந்தாலும் webdriverio உடன் ஒருங்கிணைப்பை வழங்குகிறது

### புதியது: இனி பீட்டா அல்ல.

### புதியது: சுத்தப்படுத்தப்பட்டது மற்றும் பதிவுசெய்தல் wdio-logging க்கு மாற்றப்பட்டது. மாதிரிகள் புதுப்பிக்கப்பட்டுள்ளன.
    உங்கள் கட்டமைப்பிலிருந்து log4Js பதிவாளர் துவக்கத்தை நீக்க வேண்டும்

### புதியது: webdriverio 8 இணக்கத்திற்காக ES தொகுதியாக மீண்டும் எழுதப்பட்டது.
    உங்கள் சோதனை பயன்பாட்டில் மாற்றங்கள் தேவைப்படலாம்

### பிழை திருத்தம்: webdriverio ஆனது json async எழுதும் நடுவில் முடிந்துவிட்டது.

### பிழை திருத்தம்: json எழுதுதல் சரியாக காத்திருக்கவில்லை

### சிறந்த புதிய மேம்பாடு: json.stringify காரணமாக நினைவக பிழைகள் இனி ஏற்படாது

### சிறந்த புதிய அம்சம்: ஒவ்வொரு சோதனையின் வீடியோக்களை எடுக்கலாம்


## [மாற்ற பதிவு](https://github.com/rpii/wdio-html-reporter/blob/master/changes.md)

## தகவல்

இந்த திட்டம் [@rpii/wdio-html-reporter](https://www.npmjs.com/package/wdio-html-reporter) இன் மறுபதிப்பாகும்
இது பல மேம்படுத்தல்களுடன் டைப்ஸ்கிரிப்டில் எழுதப்பட்டுள்ளது.



## கட்டமைப்பு

### WDIO.config.ts

பின்வரும் குறியீடு இயல்புநிலை wdio சோதனை இயக்கி கட்டமைப்பைக் காட்டுகிறது. அறிக்கையாளர்கள் அரேக்கு மற்றொரு அறிக்கையாளராக HtmlReporter பொருளை சேர்க்கவும்:

### செயல்படும் wdio.config.ts [/samples/wdio.config.ts](https://github.com/rpii/wdio-html-reporter/blob/master//samples/wdio.config.ts) இல் வழங்கப்பட்டுள்ளது

கீழே அந்த கோப்பிலிருந்து சிறு பகுதிகள் உள்ளன.

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
## கட்டமைப்பு விருப்பங்கள்:
  
### அனைத்து தொகுப்புகளுக்கும் முதன்மை அறிக்கையை உருவாக்க

webdriver.io ஒவ்வொரு சோதனை தொகுப்புக்கும் அறிக்கையாளரை அழைக்கும். இது அறிக்கைகளை ஒன்றிணைக்காது. இதைச் செய்ய, உங்கள் wdio.config.js க்கு பின்வரும் நிகழ்வு கையாளுபவர்களைச் சேர்க்கவும்

உலாவி கட்டமைப்பு கோப்பில் சேர்க்கவும்:
```
let reportAggregator : ReportAggregator;
```
உலாவி கட்டமைப்பு பொருளில் சேர்க்கவும்:
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


  
### இந்த அறிக்கையிலிருந்து pdf கோப்பை உருவாக்க

விரும்பாதவர்களுக்கு ஆதரவு இலகுவாக இருக்க கூடுதல் செருகுநிரல் தேவை.
[@rpii/wdio-html-reporter-pdf](https://www.npmjs.com/package/@rpii/wdio-html-reporter-pdf) பார்க்கவும்


## மாதிரி வெளியீடு:

![Report Screenshot](https://github.com/rpii/wdio-html-reporter/blob/master/TestReport.png)

## browserName

இதை கைமுறையாக அமைக்க வேண்டும். கட்டமைப்பு நேரத்தில் இது கிடைக்காது ஏனெனில் நீங்கள் அமர்வைத் தொடங்கும் வரை உலாவி பொருள் இருக்காது.