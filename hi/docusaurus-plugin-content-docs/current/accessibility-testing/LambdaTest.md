---
id: testmuai
title: TestMu AI (पूर्व में LambdaTest) एक्सेसिबिलिटी टेस्टिंग
---

# TestMu AI एक्सेसिबिलिटी टेस्टिंग

आप अपने WebdriverIO टेस्ट सूट्स में [TestMu AI एक्सेसिबिलिटी टेस्टिंग](https://www.testmuai.com/support/docs/accessibility-automation-settings/) का उपयोग करके आसानी से एक्सेसिबिलिटी टेस्ट एकीकृत कर सकते हैं।

## TestMu AI एक्सेसिबिलिटी टेस्टिंग के फायदे

TestMu AI एक्सेसिबिलिटी टेस्टिंग आपकी वेब एप्लिकेशन में एक्सेसिबिलिटी समस्याओं को पहचानने और ठीक करने में मदद करती है। निम्नलिखित प्रमुख फायदे हैं:

* आपके मौजूदा WebdriverIO टेस्ट ऑटोमेशन के साथ निर्बाध एकीकरण।
* टेस्ट निष्पादन के दौरान स्वचालित एक्सेसिबिलिटी स्कैनिंग।
* व्यापक WCAG अनुपालन रिपोर्टिंग।
* उपचार मार्गदर्शन के साथ विस्तृत समस्या ट्रैकिंग।
* कई WCAG मानकों (WCAG 2.0, WCAG 2.1, WCAG 2.2) के लिए समर्थन।
* TestMu AI डैशबोर्ड में रीयल-टाइम एक्सेसिबिलिटी इनसाइट्स।

## TestMu AI एक्सेसिबिलिटी टेस्टिंग के साथ शुरू करें

अपने WebdriverIO टेस्ट सूट्स को TestMu AI की एक्सेसिबिलिटी टेस्टिंग के साथ एकीकृत करने के लिए इन चरणों का पालन करें:

1. TestMu AI WebdriverIO सर्विस पैकेज इंस्टॉल करें।

```bash npm2yarn
npm install --save-dev @lambdatest/wdio-lambdatest-service
```

2. अपनी `wdio.conf.js` कॉन्फिगरेशन फ़ाइल अपडेट करें।

```javascript
exports.config = {
    //...
    user: process.env.LT_USERNAME || '<lambdatest_username>',
    key: process.env.LT_ACCESS_KEY || '<lambdatest_access_key>',

    capabilities: [{
        browserName: 'chrome',
        'LT:Options': {
            platform: 'Windows 10',
            version: 'latest',
            accessibility: true, // Enable accessibility testing
            accessibilityOptions: {
                wcagVersion: 'wcag21a', // WCAG version (wcag20, wcag21a, wcag21aa, wcag22aa)
                bestPractice: false,
                needsReview: true
            }
        }
    }],

    services: [
        ['lambdatest', {
            tunnel: false
        }]
    ],
    //...
};
```

3. अपने टेस्ट सामान्य रूप से चलाएं। TestMu AI टेस्ट निष्पादन के दौरान स्वचालित रूप से एक्सेसिबिलिटी समस्याओं के लिए स्कैन करेगा।

```bash
npx wdio run wdio.conf.js
```

## कॉन्फ़िगरेशन विकल्प

`accessibilityOptions` ऑब्जेक्ट निम्नलिखित पैरामीटर्स का समर्थन करता है:

* **wcagVersion**: टेस्ट के लिए WCAG मानक संस्करण निर्दिष्ट करें
  - `wcag20` - WCAG 2.0 लेवल A
  - `wcag21a` - WCAG 2.1 लेवल A
  - `wcag21aa` - WCAG 2.1 लेवल AA (डिफ़ॉल्ट)
  - `wcag22aa` - WCAG 2.2 लेवल AA

* **bestPractice**: सर्वोत्तम अभ्यास अनुशंसाएँ शामिल करें (डिफ़ॉल्ट: `false`)

* **needsReview**: मैनुअल समीक्षा की आवश्यकता वाली समस्याओं को शामिल करें (डिफ़ॉल्ट: `true`)

## एक्सेसिबिलिटी रिपोर्ट देखना

आपके टेस्ट पूरा होने के बाद, आप [TestMu AI डैशबोर्ड](https://automation.lambdatest.com/) में विस्तृत एक्सेसिबिलिटी रिपोर्ट देख सकते हैं:

1. अपने टेस्ट एक्जिक्यूशन पर नेविगेट करें
2. "एक्सेसिबिलिटी" टैब पर क्लिक करें
3. गंभीरता स्तरों के साथ पहचानी गई समस्याओं की समीक्षा करें
4. प्रत्येक समस्या के लिए उपचार मार्गदर्शन प्राप्त करें

अधिक विस्तृत जानकारी के लिए, [TestMu AI एक्सेसिबिलिटी ऑटोमेशन दस्तावेज़ीकरण](https://www.testmuai.com/support/docs/accessibility-automation-settings/) देखें।