---
id: qajonatasmartins-wdio-google-chat-service
title: गूगल चैट सेवा
custom_edit_url: https://github.com/qajonatasmartins/wdio-google-chat-service/edit/main/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> @qajonatasmartins/wdio-google-chat-service एक तृतीय पक्ष पैकेज है, अधिक जानकारी के लिए कृपया देखें [GitHub](https://github.com/qajonatasmartins/wdio-google-chat-service) | [npm](https://www.npmjs.com/package/wdio-google-chat-service)

वेबड्राइवरआईओ लाइब्रेरी जो गूगल चैट स्पेसेस में परीक्षण परिणामों को सूचना/संदेश के रूप में भेजती है।

## इंस्टालेशन

`npm install wdio-google-chat-service --save-dev`

या

`yarn add wdio-google-chat-service`

## सेटिंग्स

सबसे पहले, सेवा को wdio कॉन्फ़िगरेशन फ़ाइल `wdio.conf.js` में इम्पोर्ट करें

```
// wdio.conf.js
const GoogleChatService = require('wdio-google-chat-service');
```

सेवा का उपयोग करने के लिए आपको सूचना भेजने के लिए गूगल चैट वेबहुक URL की आवश्यकता होगी और 'webhook' में URL जोड़ना होगा

उदाहरण:

```
services: [[GoogleChatService, {
            webhookUrl: 'https://chat.googleapis.com/v1/spaces/xxxxxxxxx/messages?key=xxxxxxxx&token=xxxxxxxxx',
            notifyOnlyOnFailure: false //परीक्षण विफलता के मामले में ही सूचना भेजें
        }]
],
```

## गूगल चैट वेबहुक प्राप्त करना

नोट: गूगल चैट में वेबहुक केवल बिजनेस अकाउंट के लिए उपलब्ध है। यदि आप व्यक्तिगत अकाउंट का उपयोग करते हैं तो आपके पास वेबहुक विकल्प नहीं होगा।

1. गूगल चैट पर एक स्पेस बनाएं
2. चैट स्पेस नाम पर तीर पर क्लिक करें
3. [Manage Webhooks] पर क्लिक करें
4. एक जोड़ें या प्रस्तुत वेबहुक URL को कॉपी करें।
5. वेबहुक का URL सेवा के अंदर 'webhookUrl' विकल्प में पेस्ट करें जैसा कि ऊपर दिए गए उदाहरण में है।

## विशेषताएं

- मोचा रनर के लिए समर्थन
- त्रुटि विवरण
- परीक्षण विफलता के मामले में ही सूचना भेजें

## परिणाम

![Test pass and fail](https://github.com/qajonatasmartins/wdio-google-chat-service/blob/main/./img/testPassAndFail.png)