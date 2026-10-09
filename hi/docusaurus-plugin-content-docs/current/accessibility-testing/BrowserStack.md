---
id: browserstack
title: BrowserStack एक्सेसिबिलिटी टेस्टिंग
description: "BrowserStack Automate पर चल रहे WebdriverIO टेस्ट में स्वचालित एक्सेसिबिलिटी स्कैन जोड़ें और BrowserStack रिपोर्ट में पाई गई समस्याओं की समीक्षा करें।"
---

# BrowserStack एक्सेसिबिलिटी टेस्टिंग

आप [BrowserStack एक्सेसिबिलिटी टेस्टिंग के स्वचालित टेस्ट फीचर](https://www.browserstack.com/docs/accessibility/automated-tests?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation) का उपयोग करके अपने WebdriverIO टेस्ट सूट में एक्सेसिबिलिटी टेस्ट आसानी से इंटीग्रेट कर सकते हैं।

## BrowserStack एक्सेसिबिलिटी टेस्टिंग में स्वचालित टेस्ट के लाभ

BrowserStack एक्सेसिबिलिटी टेस्टिंग में स्वचालित टेस्ट का उपयोग करने के लिए, आपके टेस्ट BrowserStack Automate पर चलने चाहिए।

स्वचालित टेस्ट के लाभ निम्नलिखित हैं:

* आपके पहले से मौजूद ऑटोमेशन टेस्ट सूट में सहजता से इंटीग्रेट हो जाता है।
* टेस्ट केस में किसी कोड बदलाव की आवश्यकता नहीं है।
* एक्सेसिबिलिटी टेस्टिंग के लिए किसी अतिरिक्त रखरखाव की आवश्यकता नहीं है।
* ऐतिहासिक रुझानों को समझें और टेस्ट-केस संबंधी इनसाइट्स प्राप्त करें।

## BrowserStack एक्सेसिबिलिटी टेस्टिंग के साथ शुरुआत करें

अपने WebdriverIO टेस्ट सूट को BrowserStack की एक्सेसिबिलिटी टेस्टिंग के साथ इंटीग्रेट करने के लिए इन चरणों का पालन करें:

1. `@wdio/browserstack-service` npm पैकेज इंस्टॉल करें।

```bash npm2yarn
npm install --save-dev @wdio/browserstack-service
```

2. `wdio.conf.js` कॉन्फ़िग फ़ाइल को अपडेट करें।

```javascript
exports.config = {
    //...
    user: '<browserstack_username>' || process.env.BROWSERSTACK_USERNAME,
    key: '<browserstack_access_key>' || process.env.BROWSERSTACK_ACCESS_KEY,
    commonCapabilities: {
      'bstack:options': {
        projectName: "Your static project name goes here",
        buildName: "Your static build/job name goes here"
      }
    },
    services: [
      ['browserstack', {
        accessibility: true,
        // वैकल्पिक कॉन्फ़िगरेशन विकल्प
        accessibilityOptions: {
          'wcagVersion': 'wcag21a',
          'includeIssueType': {
            'bestPractice': false,
            'needsReview': true
          },
          'includeTagsInTestingScope': ['Specify tags of test cases to be included'],
          'excludeTagsInTestingScope': ['Specify tags of test cases to be excluded']
        },
      }]
    ],
    //...
  };
```

आप विस्तृत निर्देश [यहाँ](https://www.browserstack.com/docs/accessibility/automated-tests/get-started/webdriverio?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation) देख सकते हैं।