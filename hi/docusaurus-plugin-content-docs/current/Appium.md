---
id: appium
title: Appium सेटअप
description: "WebdriverIO के साथ नेटिव मोबाइल, हाइब्रिड और डेस्कटॉप ऐप्स का परीक्षण करने के लिए appium-installer टूलकिट से Appium और उसके ड्राइवर सेट अप करें।"
---

WebdriverIO के साथ आप न केवल ब्राउज़र में वेब एप्लिकेशन का परीक्षण कर सकते हैं, बल्कि अन्य प्लेटफ़ॉर्म का भी, जैसे:

- 📱 iOS, Android या Tizen पर मोबाइल एप्लिकेशन
- 🖥️ macOS या Windows पर डेस्कटॉप एप्लिकेशन
- 📺 साथ ही Roku, tvOS, Android TV और Samsung के लिए TV ऐप्स

इस प्रकार के परीक्षणों को आसान बनाने के लिए हम [Appium](https://appium.io/) का उपयोग करने की सलाह देते हैं। आप Appium का अवलोकन उनके [आधिकारिक दस्तावेज़ पृष्ठ](https://appium.io/docs/en/latest/intro/) पर प्राप्त कर सकते हैं।

सही एनवायरनमेंट सेट अप करना आसान नहीं है। सौभाग्य से, Appium इकोसिस्टम में आपकी मदद के लिए इसके आसपास बेहतरीन टूलिंग उपलब्ध है। ऊपर दिए गए किसी एक एनवायरनमेंट को सेट अप करने के लिए, बस यह चलाएँ:

```sh
$ npx appium-installer
```

यह [appium-installer](https://github.com/AppiumTestDistribution/appium-installer) टूलकिट शुरू करेगा, जो सेटअप प्रक्रिया में आपका मार्गदर्शन करता है।