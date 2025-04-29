---
id: wdio-cleanuptotal-service
title: क्लीनअप-टोटल सर्विस
custom_edit_url: https://github.com/tzurp/cleanup-total/edit/master/README.md
---


> wdio-cleanuptotal-service एक तीसरे पक्ष का पैकेज है, अधिक जानकारी के लिए कृपया देखें [GitHub](https://github.com/tzurp/cleanup-total) | [npm](https://www.npmjs.com/package/wdio-cleanuptotal-service)

[webdriver.io](https://webdriver.io/) के लिए `cleanup-total` सेवा के साथ, आप प्रत्येक परीक्षण के बाद उचित सफाई सुनिश्चित कर सकते हैं। यह सेवा तुरंत निर्माण के बाद हटाने के लिए इकाइयों को चिह्नित करने का एक व्यवस्थित तरीका प्रदान करती है। यह विशेष रूप से उपयोगी है जब परीक्षणों में जटिल संरचनाओं का निर्माण शामिल होता है, जैसे कि निवेश योजना और जमा के साथ एक बैंक खाता। उचित सफाई के बिना, खाता हटाने का प्रयास त्रुटियों के परिणामस्वरूप हो सकता है, जैसे कि खाता खाली नहीं होने के कारण अस्वीकार किया जाना। हालांकि, __cleanup-total__ के साथ, इकाइयां सही क्रम में हटा दी जाती हैं, यह सुनिश्चित करते हुए कि परीक्षण अपने आप के बाद सफाई करें और एक-दूसरे के साथ हस्तक्षेप न करें।

## इंस्टालेशन
इस मॉड्यूल को (dev-)निर्भरता के रूप में इंस्टॉल करने का सबसे आसान तरीका निम्न कमांड का उपयोग करके है:

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
        // Use a custom logger function to write messages to the test report
        customLoggerMethod: console.log(), // TODO: replace with your own logger function if needed

        // Only write to the log when an error occurs to reduce clutter
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

  // Create an account and add it to the cleanup list for deletion after the test
  const accountId = createAccount("John Blow");
  cleanupTotal.addCleanup(async () => {
    await deleteAccount(accountId);
  });

  // Add an investment plan to the account and add it to the cleanup list
  addInvestmentPlan(accountId, "ModRisk");
  cleanupTotal.addCleanup(async () => {
    await removeInvestmentPlan(accountId);
  });

  // Deposit funds into the account and add it to the cleanup list
  deposit(accountId, 1000000);
  cleanupTotal.addCleanup(async () => {
    await undoDeposit(accountId);
  });

  // ...

});

// Note that the actual cleanup code will be executed after the test is complete
```

## टाइपस्क्रिप्ट समर्थन

इस प्लगइन के लिए टाइपस्क्रिप्ट समर्थित है।

## समर्थन

समर्थन और सुझावों के लिए, मुझसे [tzur.paldi@outlook.com](https://github.com/tzurp/cleanup-total/blob/master/mailto:tzur.paldi@outlook.com) पर संपर्क करने के लिए स्वतंत्र महसूस करें।