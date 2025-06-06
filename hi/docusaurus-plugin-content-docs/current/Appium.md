---
id: appium
title: Appium सेटअप
---

WebdriverIO के साथ आप न केवल ब्राउज़र में वेब एप्लिकेशन का परीक्षण कर सकते हैं, बल्कि अन्य प्लेटफॉर्म का भी परीक्षण कर सकते हैं जैसे:

- 📱 iOS, Android या Tizen पर मोबाइल एप्लिकेशन
- 🖥️ macOS या Windows पर डेस्कटॉप एप्लिकेशन
- 📺 साथ ही Roku, tvOS, Android TV और Samsung के लिए TV ऐप्स

हम इन प्रकार के परीक्षणों को सुविधाजनक बनाने के लिए [Appium](https://appium.io/) का उपयोग करने की अनुशंसा करते हैं। आप उनके [आधिकारिक दस्तावेज़ पेज](https://appium.io/docs/en/latest/intro/) पर Appium का अवलोकन प्राप्त कर सकते हैं।

सही वातावरण स्थापित करना सीधा नहीं है। सौभाग्य से, Appium इकोसिस्टम में इसमें आपकी मदद करने के लिए बेहतरीन टूल हैं। उपरोक्त में से किसी एक वातावरण को सेट-अप करने के लिए, बस चलाएँ:

```sh
$ npx appium-installer
```

यह [appium-installer](https://github.com/AppiumTestDistribution/appium-installer) टूलकिट शुरू करेगा जो आपको सेटअप प्रक्रिया के माध्यम से मार्गदर्शन करेगा।