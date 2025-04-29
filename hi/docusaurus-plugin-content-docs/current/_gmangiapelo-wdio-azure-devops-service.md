---
id: gmangiapelo-wdio-azure-devops-service
title: Azure DevOps टेस्ट प्लान्स सर्विस
custom_edit_url: https://github.com/gianlucamangiapelo/wdio-azure-devops-service/edit/main/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> @gmangiapelo/wdio-azure-devops-service एक तृतीय पक्ष पैकेज है, अधिक जानकारी के लिए कृपया देखें [GitHub](https://github.com/gianlucamangiapelo/wdio-azure-devops-service) | [npm](https://www.npmjs.com/package/@gmangiapelo/wdio-azure-devops-service)

[![version](https://img.shields.io/npm/v/@gmangiapelo/wdio-azure-devops-service.svg)](https://www.npmjs.com/package/@gmangiapelo/wdio-azure-devops-service)
[![downloads](https://img.shields.io/npm/dt/@gmangiapelo/wdio-azure-devops-service.svg)](https://www.npmjs.com/package/@gmangiapelo/wdio-azure-devops-service)

[WebdriverIO](https://webdriver.io/) परिणामों को Azure DevOps टेस्ट प्लान्स पर प्रकाशित करता है।

मुख्य विशेषताएं:

* Jasmine/Jest/Mocha और Cucumber रनटाइम फ्रेमवर्क के लिए समर्थन
* यदि आप अधिक स्पेक(टेस्ट) फाइलें निष्पादित कर रहे हैं और वे एक ही सूट से संबंधित हैं, तो परीक्षण परिणाम उसी टेस्ट रन के अंतर्गत समेकित किए जाते हैं
* परिणाम एकल परीक्षण निष्पादन के बाद तुरंत रिपोर्ट किए जाते हैं (रियल-टाइम रिपोर्टिंग)
* अंतिम स्पेक(टेस्ट) फाइल समाप्त होने के बाद टेस्ट रन बंद हो जाता है
* मल्टी सूट का समर्थन


## इंस्टालेशन

इस मॉड्यूल को स्थानीय रूप से निम्न कमांड के साथ इंस्टॉल करें ताकि इसे (dev-)डिपेंडेंसी के रूप में उपयोग किया जा सके:

```shell
npm install --save @gmangiapelo/wdio-azure-devops-service
npm install --save-dev @gmangiapelo/wdio-azure-devops-service
```

`WebdriverIO` को कैसे इंस्टॉल करें, इस पर निर्देश [यहां मिल सकते हैं।](https://webdriver.io/docs/gettingstarted)

## उपयोग

> _wdio-azure-devops-service_ **NodeJS 8 या उच्चतर** का समर्थन करता है

> _wdio-azure-devops-service_ **commonjs** और **esm** का समर्थन करता है

### कॉन्फिगरेशन

चूंकि `@gmangiapelo/wdio-azure-devops-service` एक सेवा है, आप इसे अपनी `wdio.conf.js` फाइल में निम्न प्रकार से सेट कर सकते हैं

```js
import AzureDevopsService from "@gmangiapelo/wdio-azure-devops-service";
// wdio.conf.js
exports.config = {
    // ...
    // =====
    // Setup
    // =====
    services: [
        [
              AzureDevopsService,
              {
                  pat: '3qaPw0PnOyQ6mb8gwN7n9aIQtccn8FtsZ2s1tSIzo6yAt6eK9BInJQGJ99BDACAAAAAu9TDCAAASAZDO2Onn',
                  organizationUrl: 'https://dev.azure.com/gianlucamangiapelo',
                  projectId: '8b3c68ac-f69d-41c6-bbad-921d8bae9819',
                  planId: 263072,
                  suiteId: 263073,
                  caseIdRegex: '@?[ref](https://github.com/gianlucamangiapelo/wdio-azure-devops-service/blob/main/\\d+)',
                  runName: 'FE regression tests for TestPlan',
              },
          ],
    ],
    // ...
};
```

### टेस्ट केस सेटअप

आपके WDIO टेस्ट में आपके Azure टेस्ट केस की ID शामिल होनी चाहिए। सुनिश्चित करें कि आपके टेस्ट केस IDs आपके टेस्ट शीर्षकों से अलग हैं:

**Mocha स्टाइल:**
```Javascript
// अच्छा:
it("C123 Can authenticate a valid user", ...

// बुरा:
it("C123Can authenticate a valid user", ...
it("Can authenticate a valid user C123", ...
```

**Cucumber स्टाइल:**
```Gherkin
## अच्छा:
@C123
Scenario Can authenticate a valid user
@c123
Scenario Can authenticate a valid user,

## बुरा:
@c123stringTest
Scenario Can authenticate a valid user
```

### Azure DevOps रिपोर्ट उदाहरण

यह एक टेस्ट रन के दौरान AZ टेस्ट प्लान्स पर पुश किए गए परिणामों का एक उदाहरण है
![AzureDevops Test Plans example](https://github.com/gianlucamangiapelo/wdio-azure-devops-service/blob/main/./img/AZ-DevOps-example.png)

<br />

## सर्विस विकल्प

### pat

Azure DevOps में API अनुमति सेट के साथ उत्पन्न पर्सनल एक्सेस टोकन।

उदाहरण: `"3qaPw0PnOyQ6mb8gwN7n9aIQtccn8FtsZ2s1tSIzo6yAt6eK9BInJQGJ99BDACAAAAAu9TDCAAASAZDO2Onn"`

प्रकार: `string`

आवश्यक: `true`

### organizationUrl

आपके Azure DevOps इंस्टेंस का बेस URL।

उदाहरण: `"https://dev.azure.com/gianlucamangiapelo"`

प्रकार: `string`

आवश्यक: `true`

### projectId

Azure DevOps में प्रोजेक्ट की ID।

projectId खोजने के लिए `GET {organizationUrl}/_apis/projects?api-version=6.0` का उपयोग करें और उचित `id` को कॉपी करें।

उदाहरण: `"3cf7dbc9-cb1e-4240-93f2-9a5960ab3945"`

प्रकार: `string`

आवश्यक: `true`

### planId

टेस्ट planId जिसे आप Azure DevOps टेस्ट प्लान सेक्शन में प्राप्त कर सकते हैं।

उदाहरण: `124`

प्रकार: `integer`

आवश्यक: `true`

### suiteId

suiteId जिसे आप Azure DevOps टेस्ट प्लान सेक्शन में प्राप्त कर सकते हैं, नेस्टेड सूट्स के मामले में, रूट suiteId प्राप्त करें, सर्विस सभी चाइल्ड सूट्स पर पुनरावृत्ति करती है।

उदाहरण: `21`

प्रकार: `integer`

आवश्यक: `true`

### runName

टेस्ट रन के लिए एक विवरणात्मक नाम।

उदाहरण: `"FE regression tests run"`

प्रकार: `string`

आवश्यक: `true`

### caseIdRegex

टैग या टाइटल टेस्ट केस से testCaseId मैच करने के लिए कस्टम रेगुलर एक्सप्रेशन।

प्रकार: `string`

डिफॉल्ट: `"@?[cC](https://github.com/gianlucamangiapelo/wdio-azure-devops-service/blob/main/\d+)"`

आवश्यक: `false`

## लेखक
Gianluca Mangiapelo - [github](https://github.com/gianlucamangiapelo)