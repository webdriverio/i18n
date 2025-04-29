---
id: wdio-testrail-reporter
title: टेस्टरेल रिपोर्टर रिपोर्टर
custom_edit_url: https://github.com/webdriverio-community/wdio-testrail-reporter/edit/main/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> @wdio/testrail-reporter एक तृतीय पक्ष पैकेज है, अधिक जानकारी के लिए कृपया देखें [GitHub](https://github.com/webdriverio-community/wdio-testrail-reporter) | [npm](https://www.npmjs.com/package/@wdio/testrail-reporter)

यह रिपोर्टर TestRail रिपोर्ट बनाता है। सबसे पहले आपको TestRail API को सक्षम करने की आवश्यकता है ताकि रिपोर्ट TestRail के साथ संवाद कर सके और परीक्षण परिणामों को पुश कर सके। ऐसा करने के लिए, अपने TestRail खाते में लॉग इन करें और Administration > Site Settings > API पर जाएं और सुनिश्चित करें कि आप Enable API के पास के चेकबॉक्स पर क्लिक करें।

परीक्षण विवरण में TestRail के टेस्ट केस ID जोड़ें। उदाहरण के लिए
```javascript
it("C123456 Page loads correctly", async () => {
```
यह कई केस आईडी का भी समर्थन करता है। उदाहरण के लिए
```javascript
it("C123456 C678910 Page loads correctly", async () => {
```

## इंस्टॉल

रिपोर्टर का उपयोग करने के लिए, इसे अपने `package.json` में जोड़ें:

```sh
npm i --save-dev @wdio/testrail-reporter
```

## उपयोग

अपने WDIO कॉन्फिग फ़ाइल में रिपोर्टर जोड़ें।

जब आप एक नया टेस्ट रन बनाना चाहते हैं तब उदाहरण:

```javascript
export const config = {
    // ...
    reporters:
        [
            ['testrail', {
                projectId: 1,
                suiteId: 1,
                domain: 'xxxxx.testrail.io',
                username: process.env.TESTRAIL_USERNAME,
                apiToken: process.env.TESTRAIL_API_TOKEN,
                runName: 'name for the test run',
                oneReport: true,
                includeAll: false,
                caseIdTagPrefix: '' // used only for multi-platform Cucumber Scenarios
            }
        ]
    ],
    // ...
}
```

जब आप मौजूदा टेस्ट रन को अपडेट करना चाहते हैं तब उदाहरण:

```javascript
export const config = {
    // ...
    reporters:
        [
            ['testrail', {
                projectId: 1,
                suiteId: 1,
                domain: 'xxxxx.testrail.io',
                username: process.env.TESTRAIL_USERNAME,
                apiToken: process.env.TESTRAIL_API_TOKEN,
                existingRunId: 2345,
                oneReport: true,
                includeAll: false
            }
        ]
    ],
    // ...
}
```

जब आपको निष्पादित करने के लिए टेस्ट सूट के आधार पर अलग-अलग प्रोजेक्ट और/या सूट आईडी की आवश्यकता होती है तब उदाहरण:

```javascript
export const config = {
    // ...
    reporters:
        [
            ['testrail', {
                projectId: process.env.TESTRAIL_PROJECT_NAME == 'PROJECT_A' ? 1 : 2,
                suiteId: process.env.TESTRAIL_SUITE_NAME == 'SUITE_A' ? 10 : 20,
                domain: 'xxxxx.testrail.io',
                username: process.env.TESTRAIL_USERNAME,
                apiToken: process.env.TESTRAIL_API_TOKEN,
                runName: 'name for the test run',
                oneReport: true,
                includeAll: false
            }
        ]
    ],
    // ...
}
```


## विकल्प

### `projectId`

टेस्टरेल प्रोजेक्ट का ID।

प्रकार: `string`

### `suiteId`

सूट का ID, सूट 1 डिफ़ॉल्ट है।

प्रकार: `string`

### `domain`

आपके टेस्टरेल इंस्टेंस का डोमेन, जैसे `your-domain.testrail.io`।

प्रकार: `string`

### `username`

आपके टेस्टरेल इंस्टेंस का उपयोगकर्तानाम।

प्रकार: `string`

### `apiToken`

आपके टेस्टरेल इंस्टेंस का API टोकन।

प्रकार: `string`

### `runName`

टेस्ट रन के लिए कस्टम नाम।

प्रकार: `string`

### `existingRunId`

अपडेट करने के लिए मौजूदा टेस्ट रन का Id।

प्रकार: `string`

### `oneReport`

एक एकल टेस्ट रन बनाएं।

प्रकार: `boolean`

### `includeAll`

टेस्ट रन में सूट के सभी परीक्षणों को शामिल करें।

प्रकार: `boolean`

### `caseIdTagPrefix`

Cucumber टैग में केस ID को ढूँढने के लिए उपयोग किया जाने वाला प्रीफिक्स, मल्टी-प्लेटफॉर्म Cucumber सेनारियो के निष्पादन के लिए उपयोगी है।

प्रकार: `string`

### `useCucumber`

इंगित करता है कि परीक्षण Cucumber फ्रेमवर्क का उपयोग करके लिखे गए हैं या नहीं। डिफ़ॉल्ट रूप से, यह `false` पर सेट है।

प्रकार: `boolean`

---

WebdriverIO पर अधिक जानकारी के लिए [होमपेज](https://webdriver.io) देखें।