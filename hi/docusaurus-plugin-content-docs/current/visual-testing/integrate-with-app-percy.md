---
id: integrate-with-app-percy
title: मोबाइल एप्लिकेशन के लिए
description: "विज़ुअल टेस्टिंग के लिए WebdriverIO मोबाइल ऐप टेस्ट को BrowserStack App Percy के साथ इंटीग्रेट करें, जिसकी शुरुआत आपके PERCY_TOKEN को सेट करने से होती है।"
---

## अपने WebdriverIO टेस्ट को App Percy के साथ इंटीग्रेट करें

इंटीग्रेशन से पहले, आप [WebdriverIO के लिए App Percy का सैंपल बिल्ड ट्यूटोरियल](https://www.browserstack.com/docs/app-percy/sample-build/webdriverio-javascript/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation) देख सकते हैं।
अपने टेस्ट सूट को BrowserStack App Percy के साथ इंटीग्रेट करें। इंटीग्रेशन के चरणों का एक संक्षिप्त विवरण यहाँ दिया गया है:

### चरण 1: Percy डैशबोर्ड पर नया ऐप प्रोजेक्ट बनाएं

Percy में [साइन इन](https://percy.io/signup/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation) करें और [एक नया ऐप टाइप प्रोजेक्ट बनाएं](https://www.browserstack.com/docs/app-percy/get-started/create-project/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation)। प्रोजेक्ट बनाने के बाद, आपको एक `PERCY_TOKEN` एनवायरनमेंट वेरिएबल दिखाया जाएगा। Percy यह जानने के लिए `PERCY_TOKEN` का उपयोग करेगा कि स्क्रीनशॉट किस ऑर्गनाइज़ेशन और प्रोजेक्ट में अपलोड करने हैं। अगले चरणों में आपको इस `PERCY_TOKEN` की आवश्यकता होगी।

### चरण 2: प्रोजेक्ट टोकन को एनवायरनमेंट वेरिएबल के रूप में सेट करें

PERCY_TOKEN को एनवायरनमेंट वेरिएबल के रूप में सेट करने के लिए दिया गया कमांड चलाएं:

```sh
export PERCY_TOKEN="<your token here>"   // macOS या Linux
$Env:PERCY_TOKEN="<your token here>"    // Windows PowerShell
set PERCY_TOKEN="<your token here>"    // Windows CMD
```

### चरण 3: Percy पैकेज इंस्टॉल करें

अपने टेस्ट सूट के लिए इंटीग्रेशन एनवायरनमेंट स्थापित करने के लिए आवश्यक कंपोनेंट्स इंस्टॉल करें।
डिपेंडेंसीज़ इंस्टॉल करने के लिए, निम्नलिखित कमांड चलाएं:

```sh
npm install --save-dev @percy/cli
```

### चरण 4: डिपेंडेंसीज़ इंस्टॉल करें

Percy Appium ऐप इंस्टॉल करें

```sh
npm install --save-dev @percy/appium-app
```

### चरण 5: टेस्ट स्क्रिप्ट अपडेट करें
सुनिश्चित करें कि आप अपने कोड में @percy/appium-app को इम्पोर्ट करें।

नीचे percyScreenshot फ़ंक्शन का उपयोग करते हुए एक उदाहरण टेस्ट दिया गया है। जहाँ भी आपको स्क्रीनशॉट लेना हो, वहाँ इस फ़ंक्शन का उपयोग करें।

```sh
import percyScreenshot from '@percy/appium-app';
describe('Appium webdriverio test example', function() {
  it('takes a screenshot', async () => {
    await percyScreenshot('Appium JS example');
  });
});
```
हम percyScreenshot मेथड में आवश्यक आर्ग्युमेंट्स पास कर रहे हैं।

स्क्रीनशॉट मेथड के आर्ग्युमेंट्स ये हैं:

```sh
percyScreenshot(driver, name[, options])
```
### चरण 6: अपनी टेस्ट स्क्रिप्ट चलाएं

`percy app:exec` का उपयोग करके अपने टेस्ट चलाएं।

यदि आप percy app:exec कमांड का उपयोग करने में असमर्थ हैं या IDE रन विकल्पों का उपयोग करके अपने टेस्ट चलाना पसंद करते हैं, तो आप percy app:exec:start और percy app:exec:stop कमांड का उपयोग कर सकते हैं। अधिक जानने के लिए, [Run Percy](https://www.browserstack.com/docs/app-percy/references/commands/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation) देखें।

```sh
$ percy app:exec -- appium test command
```
यह कमांड Percy को शुरू करता है, एक नया Percy बिल्ड बनाता है, स्नैपशॉट लेता है और उन्हें आपके प्रोजेक्ट में अपलोड करता है, और फिर Percy को बंद कर देता है:


```sh
[percy] Percy has started!
[percy] Created build #1: https://percy.io/[your-project]
[percy] Snapshot taken "Appium WebdriverIO Example"
[percy] Stopping percy...
[percy] Finalized build #1: https://percy.io/[your-project]
[percy] Done!
```

## अधिक जानकारी के लिए निम्नलिखित पेज देखें:
- [अपने WebdriverIO टेस्ट को Percy के साथ इंटीग्रेट करें](https://www.browserstack.com/docs/app-percy/integrate/webdriverio-javascript/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation)
- [एनवायरनमेंट वेरिएबल पेज](https://www.browserstack.com/docs/app-percy/get-started/set-env-var/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation)
- यदि आप BrowserStack Automate का उपयोग कर रहे हैं, तो [BrowserStack SDK का उपयोग करके इंटीग्रेट करें](https://www.browserstack.com/docs/app-percy/integrate-bstack-sdk/webdriverio/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation)।


| संसाधन                                                                                                                                                            | विवरण                       |
|---------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------|
| [आधिकारिक डॉक्स](https://www.browserstack.com/docs/app-percy/integrate/webdriverio-javascript/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation)             | App Percy का WebdriverIO डॉक्यूमेंटेशन |
| [सैंपल बिल्ड - ट्यूटोरियल](https://www.browserstack.com/docs/app-percy/sample-build/webdriverio-javascript/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation) | App Percy का WebdriverIO ट्यूटोरियल      |
| [आधिकारिक वीडियो](https://youtu.be/a4I_RGFdwvc/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation)                                              | App Percy के साथ विज़ुअल टेस्टिंग         |
| [ब्लॉग](https://www.browserstack.com/blog/product-launch-app-percy/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation)                    | मिलिए App Percy से: नेटिव ऐप्स के लिए AI-संचालित ऑटोमेटेड विज़ुअल टेस्टिंग प्लेटफ़ॉर्म    |