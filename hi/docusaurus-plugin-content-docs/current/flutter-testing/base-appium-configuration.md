---
id: base-appium-configuration
title: बेस Appium कॉन्फ़िगरेशन
description: "WebdriverIO के साथ Flutter ऐप्स का परीक्षण करने के लिए Appium सर्विस और Flutter finder पैकेज इंस्टॉल करें और बेस Appium सेटअप कॉन्फ़िगर करें।"
---

WebdriverIO मोबाइल एमुलेटर, सिम्युलेटर और वास्तविक डिवाइसों पर टेस्ट चलाने के लिए Appium का उपयोग करता है। `@wdio/appium-service` टेस्ट निष्पादन के दौरान Appium सर्वर के लाइफ़साइकिल को स्वचालित रूप से प्रबंधित करती है।

सामान्य Appium सेटअप और capability विकल्पों के लिए, [Appium Service Documentation](https://webdriver.io/docs/appium-service/) देखें।

## डिपेंडेंसी इंस्टॉल करना

Flutter एप्लिकेशन का परीक्षण करने के लिए, Appium सर्विस और Flutter finder पैकेज इंस्टॉल करें:

```bash
npm install --save-dev @wdio/appium-service appium appium-flutter-finder
```

### Appium Flutter Driver इंस्टॉल करना

आप Appium Flutter Driver (`appium-flutter-driver`) को दो में से किसी एक तरीके से इंस्टॉल कर सकते हैं:

#### विकल्प 1: Dev Dependency के रूप में (CI/CD के लिए अनुशंसित)

ड्राइवर को सीधे अपनी `devDependencies` में जोड़ने से यह सुनिश्चित होता है कि टीम के सभी सदस्यों और CI/CD पाइपलाइनों में अतिरिक्त सेटअप चरणों की आवश्यकता के बिना ड्राइवर स्वचालित रूप से इंस्टॉल हो जाए:

```bash
npm install --save-dev appium-flutter-driver
```

> आप सभी आवश्यक पैकेजों को एक ही कमांड में एक साथ भी इंस्टॉल कर सकते हैं:
> ```bash
> npm install --save-dev @wdio/appium-service appium appium-flutter-finder appium-flutter-driver
> ```

#### विकल्प 2: Appium CLI के माध्यम से (लोकल सेटअप)

वैकल्पिक रूप से, आप Appium CLI का उपयोग करके ड्राइवर को अपने Appium एनवायरनमेंट में लोकली इंस्टॉल कर सकते हैं:

```bash
npx appium driver install flutter
```

### पैकेज अवलोकन

ये पैकेज निम्नलिखित प्रदान करते हैं:
- **`@wdio/appium-service` और `appium`**: टेस्ट रन के दौरान Appium सर्वर को शुरू और प्रबंधित करते हैं।
- **`appium-flutter-driver`**: Flutter के टेस्ट एक्सटेंशन के साथ संचार करने के लिए ज़िम्मेदार Appium ड्राइवर।
- **`appium-flutter-finder`**: Flutter-विशिष्ट लोकेटर रणनीतियाँ (`byValueKey`, `byText`, `byTooltip`) प्रदान करने वाली हेल्पर लाइब्रेरी।