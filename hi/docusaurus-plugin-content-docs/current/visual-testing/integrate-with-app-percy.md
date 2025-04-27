---
id: integrate-with-app-percy
title: मोबाइल एप्लिकेशन के लिए
---

## अपने WebdriverIO टेस्ट को App Percy के साथ एकीकृत करें

एकीकरण से पहले, आप [WebdriverIO के लिए App Percy के सैंपल बिल्ड ट्यूटोरियल](https://www.browserstack.com/docs/app-percy/sample-build/webdriverio-javascript/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation) का अन्वेषण कर सकते हैं।
अपने टेस्ट सूट को BrowserStack App Percy के साथ एकीकृत करें और यहां एकीकरण चरणों का अवलोकन है:

### चरण 1: Percy डैशबोर्ड पर नया ऐप प्रोजेक्ट बनाएँ

Percy में [साइन इन](https://percy.io/signup/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation) करें और [एक नया ऐप टाइप प्रोजेक्ट बनाएँ](https://www.browserstack.com/docs/app-percy/get-started/create-project/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation)। प्रोजेक्ट बनाने के बाद, आपको एक `PERCY_TOKEN` पर्यावरण वेरिएबल दिखाया जाएगा। Percy इस `PERCY_TOKEN` का उपयोग यह जानने के लिए करेगा कि किस संगठन और प्रोजेक्ट में स्क्रीनशॉट अपलोड करने हैं। आपको अगले चरणों में इस `PERCY_TOKEN` की आवश्यकता होगी।

### चरण 2: प्रोजेक्ट टोकन को पर्यावरण वेरिएबल के रूप में सेट करें

PERCY_TOKEN को पर्यावरण वेरिएबल के रूप में सेट करने के लिए दिए गए कमांड को चलाएँ:

```sh
export PERCY_TOKEN="<your token here>"   // macOS or Linux
$Env:PERCY_TOKEN="<your token here>"    // Windows PowerShell
set PERCY_TOKEN="<your token here>"    // Windows CMD
```

### चरण 3: Percy पैकेज इंस्टॉल करें

अपने टेस्ट सूट के लिए एकीकरण वातावरण स्थापित करने के लिए आवश्यक कंपोनेंट्स इंस्टॉल करें।
निर्भरताओं को इंस्टॉल करने के लिए, निम्न कमांड चलाएँ:

```sh
npm install --save-dev @percy/cli
```

### चरण 4: निर्भरताएँ इंस्टॉल करें

Percy Appium ऐप इंस्टॉल करें

```sh
npm install --save-dev @percy/appium-app
```

### चरण 5: टेस्ट स्क्रिप्ट अपडेट करें
सुनिश्चित करें कि आपने अपने कोड में @percy/appium-app को इम्पोर्ट किया है।

नीचे percyScreenshot फ़ंक्शन का उपयोग करते हुए एक उदाहरण टेस्ट दिया गया है। जहां भी आपको स्क्रीनशॉट लेना है, वहां इस फ़ंक्शन का उपयोग करें।

```sh
import percyScreenshot from '@percy/appium-app';
describe('Appium webdriverio test example', function() {
  it('takes a screenshot', async () => {
    await percyScreenshot('Appium JS example');
  });
});
```
हम आवश्यक आर्गुमेंट्स को percyScreenshot मेथड में पास कर रहे हैं।

स्क्रीनशॉट मेथड के आर्गुमेंट्स हैं:

```sh
percyScreenshot(driver, name[, options])
```
### चरण 6: अपनी टेस्ट स्क्रिप्ट चलाएं

अपने टेस्ट को `percy app:exec` का उपयोग करके चलाएं।

यदि आप percy app:exec कमांड का उपयोग नहीं कर सकते हैं या IDE रन विकल्पों का उपयोग करके अपने टेस्ट चलाना पसंद करते हैं, तो आप percy app:exec:start और percy app:exec:stop कमांड का उपयोग कर सकते हैं। अधिक जानने के लिए, [Run Percy](https://www.browserstack.com/docs/app-percy/references/commands/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation) पर जाएं।

```sh
$ percy app:exec -- appium test command
```
यह कमांड Percy को शुरू करता है, एक नया Percy बिल्ड बनाता है, स्नैपशॉट लेता है और उन्हें आपके प्रोजेक्ट में अपलोड करता है, और फिर Percy को बंद करता है:


```sh
[percy] Percy has started!
[percy] Created build #1: https://percy.io/[your-project]
[percy] Snapshot taken "Appium WebdriverIO Example"
[percy] Stopping percy...
[percy] Finalized build #1: https://percy.io/[your-project]
[percy] Done!
```

## अधिक जानकारी के लिए निम्न पृष्ठों पर जाएँ:
- [अपने WebdriverIO टेस्ट को Percy के साथ एकीकृत करें](https://www.browserstack.com/docs/app-percy/integrate/webdriverio-javascript/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation)
- [पर्यावरण वेरिएबल पेज](https://www.browserstack.com/docs/app-percy/get-started/set-env-var/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation)
- [BrowserStack SDK का उपयोग करके एकीकृत करें](https://www.browserstack.com/docs/app-percy/integrate-bstack-sdk/webdriverio/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation) यदि आप BrowserStack Automate का उपयोग कर रहे हैं।


| संसाधन                                                                                                                                                            | विवरण                       |
|---------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------|
| [आधिकारिक दस्तावेज़](https://www.browserstack.com/docs/app-percy/integrate/webdriverio-javascript/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation)             | App Percy की WebdriverIO दस्तावेज़ीकरण |
| [सैंपल बिल्ड - ट्यूटोरियल](https://www.browserstack.com/docs/app-percy/sample-build/webdriverio-javascript/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation) | App Percy का WebdriverIO ट्यूटोरियल      |
| [आधिकारिक वीडियो](https://youtu.be/a4I_RGFdwvc/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation)                                              | App Percy के साथ विज़ुअल टेस्टिंग         |
| [ब्लॉग](https://www.browserstack.com/blog/product-launch-app-percy/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation)                    | App Percy से मिलें: नेटिव ऐप्स के लिए AI-संचालित स्वचालित विज़ुअल टेस्टिंग प्लेटफॉर्म    |