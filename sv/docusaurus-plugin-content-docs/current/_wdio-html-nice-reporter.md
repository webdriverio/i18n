---
id: wdio-html-nice-reporter
title: HTML-rapportör
custom_edit_url: https://github.com/rpii/wdio-html-reporter/edit/master/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-html-nice-reporter is a 3rd party package, for more information please see [GitHub](https://github.com/rpii/wdio-html-reporter) | [npm](https://www.npmjs.com/package/wdio-html-nice-reporter)
 # wdio-html-nice-reporter

A reporter for webdriver.io which generates a nice HTML report.  
The name is silly but provides integration with webdriverio

### New:  no longer beta.

### New:  cleaned up and switched logging to wdio-logging. Samples are updated.
    You need to remove the log4Js logger initialization from your config

### New:  rewritten as an ES module for webdriverio 8 compatibility.
    You may need changes in your test app

### Bug fix:  webdriverio was shutting down in the middle of json async write.

### Bug fix:  json write was not awaited for correctly

### Great new improvement:  no more out of memory errors due to json.stringify

### Great new feature:  take videos of each test


## [Changelog](https://github.com/rpii/wdio-html-reporter/blob/master/changes.md)

## Information

This project is a rewrite of [@rpii/wdio-html-reporter](https://www.npmjs.com/package/wdio-html-reporter)
It is written in typescript with many enhancements.



## Configuration

### WDIO.config.ts

The following code shows the default wdio test runner configuration. Just add an HtmlReporter object as another reporter to the reporters array:

### A functioning wdio.config.ts is provided in the [/samples/wdio.config.ts](https://github.com/rpii/wdio-html-reporter/blob/master//samples/wdio.config.ts)

below are snippets from that file.

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
## Configuration Options:
  
### To generate a master report for all suites

webdriver.io will call the reporter for each test suite.  It does not aggregate the reports.  To do this, add the following event handlers to your wdio.config.js

Add to browser config file:
```
let reportAggregator : ReportAggregator;
```
Add to browser config object:
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


  
### To generate a pdf file from this report

Requires an additional plugin to keep the support lightweight for those that dont want it.
see [@rpii/wdio-html-reporter-pdf](https://www.npmjs.com/package/@rpii/wdio-html-reporter-pdf)


## Sample Output:

![Report Screenshot](https://github.com/rpii/wdio-html-reporter/blob/master/TestReport.png)

## browserName

This must be set manually.  Its not available at config time since the browser object doesnt exist until you start a session.