---
id: relaunchActiveApp
title: relaunchActiveApp
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/mobile/relaunchActiveApp.ts
---

सक्रिय नेटिव ऐप का पुनः प्रारंभ निम्न प्रकार से करता है:

- सक्रिय ऐप को समाप्त करना
- पहले सक्रिय ऐप को पुनः लॉन्च करना

:::important
यह कमांड वर्तमान सक्रिय ऐप को पुनः आरंभ करेगा (समाप्त/बंद करना और लॉन्च/शुरू करना) और ऐप की स्थिति को रीसेट नहीं करेगा। Appium ऐप को हार्ड रीसेट नहीं कर सकता जब तक:

- आप एक नया सेशन शुरू करते हैं और सेशन हैंडलर ऐप स्टेट को हटाता है/डिवाइस को साफ करता है
- आपके ऐप में ऐप स्टेट को रीसेट करने के लिए एक बैकडोर है और Appium इस बैकडोर को कॉल कर सकता है

यदि आप Android या iOS के लिए ऐप स्टेट को रीसेट करना चाहते हैं, तो आपको अपनी स्क्रिप्ट में अपना खुद का रीसेट तंत्र/कमांड बनाना होगा। विकल्प हो सकते हैं:

- Android: ऐप डेटा को साफ करने के लिए `adb` कमांड का उपयोग करें: `adb shell pm clear <appPackage>`
- iOS: `mobile: installApp` कमांड का उपयोग करके ऐप को पुनः इंस्टॉल करें
- ....
- इस कमांड का उपयोग न करें

आपके पास जो विकल्प हैं, वे प्लेटफॉर्म, ऐप और स्थान (स्थानीय, जहां अधिकतर समय डिवाइस तक पूर्ण पहुंच होती है, या क्लाउड में, जहां कम पहुंच होती है) पर निर्भर करते हैं जहां आप परीक्षण कर रहे हैं।

:::

##### Example

```js title="restart.app.js"
it('should restart the app with default options', async () => {
    await browser.relaunchActiveApp()
})
```