---
id: integrate-with-percy
title: वेब एप्लिकेशन के लिए
---

## अपने WebdriverIO टेस्ट को Percy के साथ एकीकृत करें

एकीकरण से पहले, आप [WebdriverIO के लिए Percy के नमूना बिल्ड ट्यूटोरियल](https://www.browserstack.com/docs/percy/sample-build/webdriverio/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation) का अन्वेषण कर सकते हैं।
अपने WebdriverIO स्वचालित परीक्षणों को BrowserStack Percy के साथ एकीकृत करें और यहां एकीकरण चरणों का अवलोकन है:

### चरण 1: Percy प्रोजेक्ट बनाएं
Percy में [साइन इन](https://percy.io/signup/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation) करें। Percy में, वेब प्रकार का एक प्रोजेक्ट बनाएं, और फिर प्रोजेक्ट का नाम दें। प्रोजेक्ट बनने के बाद, Percy एक टोकन जनरेट करता है। इसे नोट कर लें। अगले चरण में अपना पर्यावरण चर सेट करने के लिए आपको इसका उपयोग करना होगा।

प्रोजेक्ट बनाने के विवरण के लिए, [Percy प्रोजेक्ट बनाएं](https://www.browserstack.com/docs/percy/get-started/create-project/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation) देखें।

### चरण 2: प्रोजेक्ट टोकन को पर्यावरण चर के रूप में सेट करें

PERCY_TOKEN को पर्यावरण चर के रूप में सेट करने के लिए दिए गए कमांड को चलाएं:

```sh
export PERCY_TOKEN="<your token here>"   // macOS or Linux
$Env:PERCY_TOKEN="<your token here>"   // Windows PowerShell
set PERCY_TOKEN="<your token here>"    // Windows CMD
```

### चरण 3: Percy निर्भरताएँ इंस्टॉल करें

अपने टेस्ट सूट के लिए एकीकरण वातावरण स्थापित करने के लिए आवश्यक घटकों को इंस्टॉल करें।

निर्भरताओं को इंस्टॉल करने के लिए, निम्नलिखित कमांड चलाएं:

```sh
npm install --save-dev @percy/cli @percy/webdriverio
```

### चरण 4: अपनी टेस्ट स्क्रिप्ट अपडेट करें

स्क्रीनशॉट लेने के लिए आवश्यक विधि और विशेषताओं का उपयोग करने के लिए Percy लाइब्रेरी को इम्पोर्ट करें।
निम्नलिखित उदाहरण async मोड में percySnapshot() फंक्शन का उपयोग करता है:

```sh
import percySnapshot from '@percy/webdriverio';
describe('webdriver.io page', () => {
  it('should have the right title', async () => {
    await browser.url('https://webdriver.io');
    await expect(browser).toHaveTitle('WebdriverIO · Next-gen browser and mobile automation test framework for Node.js');
    await percySnapshot('webdriver.io page');
  });
});
```

WebdriverIO का उपयोग [स्टैंडअलोन मोड](https://webdriver.io/docs/setuptypes.html/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation) में करते समय, `percySnapshot` फंक्शन के पहले आर्गुमेंट के रूप में ब्राउज़र ऑब्जेक्ट प्रदान करें:

```sh
import { remote } from 'webdriverio'

import percySnapshot from '@percy/webdriverio';

const browser = await remote({
  logLevel: 'trace',
  capabilities: {
    browserName: 'chrome'
  }
});

await browser.url('https://duckduckgo.com');
const inputElem = await browser.$('#search_form_input_homepage');
await inputElem.setValue('WebdriverIO');
const submitBtn = await browser.$('#search_button_homepage');
await submitBtn.click();
// the browser object is required in standalone mode
percySnapshot(browser, 'WebdriverIO at DuckDuckGo');
await browser.deleteSession();
```
स्नैपशॉट मेथड आर्गुमेंट हैं:

```sh
percySnapshot(name[, options])
```
### स्टैंडअलोन मोड

```sh
percySnapshot(browser, name[, options])
```

- browser (आवश्यक) - WebdriverIO ब्राउज़र ऑब्जेक्ट
- name (आवश्यक) - स्नैपशॉट का नाम; प्रत्येक स्नैपशॉट के लिए अद्वितीय होना चाहिए
- options - प्रति-स्नैपशॉट कॉन्फ़िगरेशन विकल्प देखें

अधिक जानने के लिए, [Percy स्नैपशॉट](https://www.browserstack.com/docs/percy/take-percy-snapshots/overview/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation) देखें।

### चरण 5: Percy चलाएं
नीचे दिखाए गए अनुसार `percy exec` कमांड का उपयोग करके अपने टेस्ट चलाएं:

यदि आप `percy:exec` कमांड का उपयोग करने में असमर्थ हैं या IDE रन विकल्पों का उपयोग करके अपने टेस्ट चलाना पसंद करते हैं, तो आप `percy:exec:start` और `percy:exec:stop` कमांड का उपयोग कर सकते हैं। अधिक जानने के लिए, [Run Percy](https://www.browserstack.com/docs/percy/integrate/webdriverio/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation) पर जाएं।

```sh
percy exec -- wdio wdio.conf.js
```

```sh
[percy] Percy has started!
[percy] Created build #1: https://percy.io/[your-project]
[percy] Running "wdio wdio.conf.js"
...
[...] webdriver.io page
[percy] Snapshot taken "webdriver.io page"
[...]    ✓ should have the right title
...
[percy] Stopping percy...
[percy] Finalized build #1: https://percy.io/[your-project]
[percy] Done!

```

## अधिक विवरण के लिए निम्न पृष्ठों पर जाएं:
- [अपने WebdriverIO टेस्ट को Percy के साथ एकीकृत करें](https://www.browserstack.com/docs/percy/integrate/webdriverio/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation)
- [पर्यावरण चर पृष्ठ](https://www.browserstack.com/docs/percy/get-started/set-env-var/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation)
- [BrowserStack SDK का उपयोग करके एकीकृत करें](https://www.browserstack.com/docs/percy/integrate-bstack-sdk/webdriverio/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation) यदि आप BrowserStack Automate का उपयोग कर रहे हैं।


| संसाधन                                                                                                                                                               | विवरण                             |
|---------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------|
| [आधिकारिक दस्तावेज़](https://www.browserstack.com/docs/percy/integrate/webdriverio/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation)           | Percy का WebdriverIO दस्तावेज़ीकरण |
| [नमूना बिल्ड - ट्यूटोरियल](https://www.browserstack.com/docs/percy/sample-build/webdriverio/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation) | Percy का WebdriverIO ट्यूटोरियल   |
| [आधिकारिक वीडियो](https://youtu.be/1Sr_h9_3MI0/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation)                                              | Percy के साथ विजुअल टेस्टिंग       |
| [ब्लॉग](https://www.browserstack.com/blog/introducing-visual-reviews-2-0/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation)                     | विजुअल रिव्यू 2.0 का परिचय         |