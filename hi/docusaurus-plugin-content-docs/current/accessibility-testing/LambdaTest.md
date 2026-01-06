---
id: lambdatest
title: LambdaTest एक्सेसिबिलिटी टेस्टिंग
---

# LambdaTest एक्सेसिबिलिटी टेस्टिंग

आप अपने WebdriverIO टेस्ट सूट्स में [LambdaTest एक्सेसिबिलिटी टेस्टिंग](https://www.lambdatest.com/support/docs/accessibility-automation-settings/) का उपयोग करके आसानी से एक्सेसिबिलिटी टेस्ट को एकीकृत कर सकते हैं।

## LambdaTest एक्सेसिबिलिटी टेस्टिंग के फायदे

LambdaTest एक्सेसिबिलिटी टेस्टिंग आपको वेब एप्लिकेशन में एक्सेसिबिलिटी समस्याओं की पहचान करने और उन्हें ठीक करने में मदद करता है। निम्नलिखित प्रमुख फायदे हैं:

* आपके मौजूदा WebdriverIO टेस्ट ऑटोमेशन के साथ आसानी से एकीकृत होता है।
* टेस्ट निष्पादन के दौरान स्वचालित एक्सेसिबिलिटी स्कैनिंग।
* व्यापक WCAG अनुपालन रिपोर्टिंग।
* विस्तृत समस्या ट्रैकिंग के साथ समाधान मार्गदर्शन।
* कई WCAG मानकों (WCAG 2.0, WCAG 2.1, WCAG 2.2) के लिए समर्थन।
* LambdaTest डैशबोर्ड में रीयल-टाइम एक्सेसिबिलिटी अंतर्दृष्टि।

## LambdaTest एक्सेसिबिलिटी टेस्टिंग के साथ शुरू करें

LambdaTest की एक्सेसिबिलिटी टेस्टिंग के साथ अपने WebdriverIO टेस्ट सूट्स को एकीकृत करने के लिए इन चरणों का पालन करें:

1. LambdaTest WebdriverIO सेवा पैकेज स्थापित करें।

```bash npm2yarn
npm install --save-dev @lambdatest/wdio-lambdatest-service
```

2. अपने `wdio.conf.js` कॉन्फिगरेशन फाइल को अपडेट करें।

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

3. अपने टेस्ट को सामान्य रूप से चलाएं। LambdaTest टेस्ट निष्पादन के दौरान स्वचालित रूप से एक्सेसिबिलिटी समस्याओं को स्कैन करेगा।

```bash
npx wdio run wdio.conf.js
```

## कॉन्फिगरेशन विकल्प

`accessibilityOptions` ऑब्जेक्ट निम्नलिखित पैरामीटर्स का समर्थन करता है:

* **wcagVersion**: परीक्षण के लिए WCAG मानक संस्करण निर्दिष्ट करें
  - `wcag20` - WCAG 2.0 लेवल A
  - `wcag21a` - WCAG 2.1 लेवल A
  - `wcag21aa` - WCAG 2.1 लेवल AA (डिफ़ॉल्ट)
  - `wcag22aa` - WCAG 2.2 लेवल AA

* **bestPractice**: सर्वोत्तम प्रथा अनुशंसाओं को शामिल करें (डिफ़ॉल्ट: `false`)

* **needsReview**: ऐसी समस्याओं को शामिल करें जिन्हें मैनुअल समीक्षा की आवश्यकता है (डिफ़ॉल्ट: `true`)

## एक्सेसिबिलिटी रिपोर्ट देखना

आपके टेस्ट पूरे होने के बाद, आप [LambdaTest डैशबोर्ड](https://automation.lambdatest.com/) में विस्तृत एक्सेसिबिलिटी रिपोर्ट देख सकते हैं:

1. अपने टेस्ट निष्पादन पर नेविगेट करें
2. "एक्सेसिबिलिटी" टैब पर क्लिक करें
3. गंभीरता स्तरों के साथ पहचानी गई समस्याओं की समीक्षा करें
4. प्रत्येक समस्या के लिए समाधान मार्गदर्शन प्राप्त करें

अधिक विस्तृत जानकारी के लिए, [LambdaTest एक्सेसिबिलिटी ऑटोमेशन डॉक्यूमेंटेशन](https://www.lambdatest.com/support/docs/accessibility-automation-settings/) पर जाएं।