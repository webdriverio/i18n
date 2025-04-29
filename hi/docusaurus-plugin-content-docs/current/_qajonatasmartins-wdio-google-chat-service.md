---
id: qajonatasmartins-wdio-google-chat-service
title: गूगल चैट सेवा
custom_edit_url: https://github.com/qajonatasmartins/wdio-google-chat-service/edit/main/README.md
---


> @qajonatasmartins/wdio-google-chat-service एक तृतीय पक्ष पैकेज है, अधिक जानकारी के लिए कृपया देखें [GitHub](https://github.com/qajonatasmartins/wdio-google-chat-service) | [npm](https://www.npmjs.com/package/wdio-google-chat-service)

Webdriverio लाइब्रेरी जो टेस्ट परिणामों को गूगल चैट स्पेसेस में नोटिफिकेशन/ऑफ मैसेज के रूप में भेजती है।

## इंस्टॉलेशन

`npm install wdio-google-chat-service --save-dev`

या

`yarn add wdio-google-chat-service`

## सेटिंग्स

सबसे पहले, सेवा को wdio कॉन्फिगरेशन फाइल `wdio.conf.js` में इम्पोर्ट करें

```
// wdio.conf.js
const GoogleChatService = require('wdio-google-chat-service');
```

सेवा का उपयोग करने के लिए आपको नोटिफिकेशन भेजने के लिए गूगल चैट वेबहुक url की आवश्यकता होती है और 'webhook' में url जोड़ना होगा

उदाहरण:

```
services: [[GoogleChatService, {
            webhookUrl: 'https://chat.googleapis.com/v1/spaces/xxxxxxxxx/messages?key=xxxxxxxx&token=xxxxxxxxx',
            notifyOnlyOnFailure: false //टेस्ट फेल होने पर ही नोटिफिकेशन भेजें
        }]
],
```

## गूगल चैट वेबहुक प्राप्त करना

नोट: गूगल चैट के पास केवल बिजनेस अकाउंट के लिए वेबहुक है। यदि आप व्यक्तिगत अकाउंट का उपयोग करते हैं तो आपके पास वेबहुक विकल्प नहीं होना चाहिए।

1. गूगल चैट पर एक स्पेस बनाएं
2. चैट स्पेस नाम पर तीर पर क्लिक करें
3. [Manage Webhooks] पर क्लिक करें
4. एक जोड़ें या प्रस्तुत वेबहुक Url को कॉपी करें।
5. वेबहुक के URL को सेवा के अंदर 'webhookUrl' विकल्प में पेस्ट करें जैसा कि ऊपर उदाहरण में है।

## फीचर्स

- मोचा रनर के लिए समर्थन
- एरर विवरण
- केवल टेस्ट फेल होने पर ही नोटिफिकेशन भेजें

## परिणाम

![Test pass and fail](https://github.com/qajonatasmartins/wdio-google-chat-service/blob/main/./img/testPassAndFail.png)