---
id: browserstack
title: ब्राउज़रस्टैक एक्सेसिबिलिटी टेस्टिंग
---

# ब्राउज़रस्टैक एक्सेसिबिलिटी टेस्टिंग

आप अपने WebdriverIO टेस्ट सूट में [ब्राउज़रस्टैक एक्सेसिबिलिटी टेस्टिंग की ऑटोमेटेड टेस्ट फीचर](https://www.browserstack.com/docs/accessibility/automated-tests?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation) का उपयोग करके आसानी से एक्सेसिबिलिटी टेस्ट को एकीकृत कर सकते हैं।

## ब्राउज़रस्टैक एक्सेसिबिलिटी टेस्टिंग में ऑटोमेटेड टेस्ट के फायदे

ब्राउज़रस्टैक एक्सेसिबिलिटी टेस्टिंग में ऑटोमेटेड टेस्ट का उपयोग करने के लिए, आपके टेस्ट BrowserStack Automate पर चल रहे होने चाहिए।

ऑटोमेटेड टेस्ट के निम्नलिखित फायदे हैं:

* आपके पहले से मौजूद ऑटोमेशन टेस्ट सूट में सहजता से एकीकृत होता है।
* टेस्ट केसेस में कोई कोड परिवर्तन की आवश्यकता नहीं है।
* एक्सेसिबिलिटी टेस्टिंग के लिए शून्य अतिरिक्त रखरखाव की आवश्यकता है।
* ऐतिहासिक रुझानों को समझें और टेस्ट-केस अंतर्दृष्टि प्राप्त करें।

## ब्राउज़रस्टैक एक्सेसिबिलिटी टेस्टिंग के साथ शुरुआत करें

अपने WebdriverIO टेस्ट सूट को ब्राउज़रस्टैक की एक्सेसिबिलिटी टेस्टिंग के साथ एकीकृत करने के लिए इन चरणों का पालन करें:

1. `@wdio/browserstack-service` npm पैकेज इंस्टॉल करें।

```bash npm2yarn
npm install --save-dev @wdio/browserstack-service
```

2. `wdio.conf.js` कॉन्फिग फाइल अपडेट करें।

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
        // Optional configuration options
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

आप विस्तृत निर्देश [यहां](https://www.browserstack.com/docs/accessibility/automated-tests/get-started/webdriverio?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation) देख सकते हैं।