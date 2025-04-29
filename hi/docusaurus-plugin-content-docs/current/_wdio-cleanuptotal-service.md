---
id: wdio-cleanuptotal-service
title: क्लीनअपटोटल सर्विस
custom_edit_url: https://github.com/tzurp/cleanup-total/edit/master/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-cleanuptotal-service एक तृतीय पक्ष पैकेज है, अधिक जानकारी के लिए कृपया देखें [GitHub](https://github.com/tzurp/cleanup-total) | [npm](https://www.npmjs.com/package/wdio-cleanuptotal-service)

[webdriver.io](https://webdriver.io/) के लिए `cleanup-total` सेवा के साथ, आप प्रत्येक परीक्षण के बाद उचित क्लीनअप सुनिश्चित कर सकते हैं। यह सेवा तुरंत निर्माण के बाद हटाने के लिए इकाइयों को चिह्नित करने का एक व्यवस्थित तरीका प्रदान करती है। यह विशेष रूप से तब उपयोगी होता है जब परीक्षणों में जटिल संरचनाओं का निर्माण शामिल होता है, जैसे कि निवेश योजना और जमा के साथ एक बैंक खाता। उचित क्लीनअप के बिना, खाते को हटाने का प्रयास त्रुटियों का कारण बन सकता है, जैसे कि खाता खाली नहीं होने के कारण अस्वीकृति। हालांकि, __cleanup-total__ के साथ, इकाइयां सही क्रम में हटा दी जाती हैं, यह सुनिश्चित करते हुए कि परीक्षण अपने आप के बाद सफाई करें और एक-दूसरे के साथ हस्तक्षेप न करें।

## इंस्टॉलेशन
इस मॉड्यूल को (dev-)dependency के रूप में इंस्टॉल करने का सबसे आसान तरीका निम्न कमांड का उपयोग करके है:

```
npm install wdio-cleanuptotal-service --save-dev
```

## उपयोग

अपने `wdio.conf.ts` में wdio-cleanuptotal-service जोड़ें:

```typescript
export const config: WebdriverIO.Config = {
  // ... other options

  services: ['cleanuptotal']

  // ... other options
};
```

या सेवा विकल्पों के साथ:

```typescript
export const config: WebdriverIO.Config = {
  // ... other options

  services: [
    [
      'cleanuptotal',
      {
        // टेस्ट रिपोर्ट में संदेश लिखने के लिए कस्टम लॉगर फंक्शन का उपयोग करें
        customLoggerMethod: console.log(), // TODO: replace with your own logger function if needed

        // भीड़ कम करने के लिए केवल त्रुटि होने पर लॉग में लिखें
        logErrorsOnly: false, // TODO: consider changing to 'true' if you have too many messages in the report
      }
    ]
  ]

  // ... other options
};
```

## परीक्षण में उपयोग

आप __cleanuptotal__ सेवा को जहां भी आवश्यक हो आयात कर सकते हैं, चाहे वह आपकी परीक्षण फ़ाइल में हो या किसी अन्य क्लास में।

```typescript
import { cleanuptotal } from "wdio-cleanuptotal-service";

it("should keep things tidy", () => {
  // ...

  // एक खाता बनाएं और परीक्षण के बाद हटाने के लिए इसे क्लीनअप सूची में जोड़ें
  const accountId = createAccount("John Blow");
  cleanupTotal.addCleanup(async () => {
    await deleteAccount(accountId);
  });

  // खाते में एक निवेश योजना जोड़ें और इसे क्लीनअप सूची में जोड़ें
  addInvestmentPlan(accountId, "ModRisk");
  cleanupTotal.addCleanup(async () => {
    await removeInvestmentPlan(accountId);
  });

  // खाते में धनराशि जमा करें और इसे क्लीनअप सूची में जोड़ें
  deposit(accountId, 1000000);
  cleanupTotal.addCleanup(async () => {
    await undoDeposit(accountId);
  });

  // ...

});

// ध्यान दें कि वास्तविक क्लीनअप कोड परीक्षण पूरा होने के बाद निष्पादित किया जाएगा
```

## टाइपस्क्रिप्ट समर्थन

इस प्लगइन के लिए टाइपस्क्रिप्ट समर्थित है।

## सहायता

समर्थन और सुझावों के लिए, बेझिझक मुझसे [tzur.paldi@outlook.com](https://github.com/tzurp/cleanup-total/blob/master/mailto:tzur.paldi@outlook.com) पर संपर्क करें।