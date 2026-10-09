---
id: integrate-with-percy
title: वेब एप्लिकेशन के लिए
description: "विज़ुअल टेस्टिंग के लिए वेब एप्लिकेशन के WebdriverIO टेस्ट को BrowserStack Percy के साथ इंटीग्रेट करें, प्रोजेक्ट बनाने से लेकर बिल्ड चलाने तक।"
---

## अपने WebdriverIO टेस्ट को Percy के साथ इंटीग्रेट करें

इंटीग्रेशन से पहले, आप [WebdriverIO के लिए Percy का सैंपल बिल्ड ट्यूटोरियल](https://www.browserstack.com/docs/percy/sample-build/webdriverio/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation) देख सकते हैं।
अपने WebdriverIO ऑटोमेटेड टेस्ट को BrowserStack Percy के साथ इंटीग्रेट करें। इंटीग्रेशन चरणों का संक्षिप्त विवरण यहाँ दिया गया है:

### चरण 1: एक Percy प्रोजेक्ट बनाएँ
Percy में [साइन इन](https://percy.io/signup/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation) करें। Percy में, Web टाइप का एक प्रोजेक्ट बनाएँ, और फिर प्रोजेक्ट को एक नाम दें। प्रोजेक्ट बनने के बाद, Percy एक टोकन जनरेट करता है। इसे नोट कर लें। अगले चरण में अपना एनवायरनमेंट वेरिएबल सेट करने के लिए आपको इसका उपयोग करना होगा।

प्रोजेक्ट बनाने के विवरण के लिए, [Percy प्रोजेक्ट बनाएँ](https://www.browserstack.com/docs/percy/get-started/create-project/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation) देखें।

### चरण 2: प्रोजेक्ट टोकन को एनवायरनमेंट वेरिएबल के रूप में सेट करें

PERCY_TOKEN को एनवायरनमेंट वेरिएबल के रूप में सेट करने के लिए दिया गया कमांड चलाएँ:

```sh
export PERCY_TOKEN="<your token here>"   // macOS or Linux
$Env:PERCY_TOKEN="<your token here>"   // Windows PowerShell
set PERCY_TOKEN="<your token here>"    // Windows CMD
```

### चरण 3: Percy डिपेंडेंसी इंस्टॉल करें

अपने टेस्ट सूट के लिए इंटीग्रेशन एनवायरनमेंट स्थापित करने के लिए आवश्यक कंपोनेंट्स इंस्टॉल करें।

डिपेंडेंसी इंस्टॉल करने के लिए, निम्नलिखित कमांड चलाएँ:

```sh
npm install --save-dev @percy/cli @percy/webdriverio
```

### चरण 4: अपनी टेस्ट स्क्रिप्ट अपडेट करें

स्क्रीनशॉट लेने के लिए आवश्यक मेथड और एट्रिब्यूट्स का उपयोग करने हेतु Percy लाइब्रेरी को इम्पोर्ट करें।
निम्नलिखित उदाहरण async मोड में percySnapshot() फ़ंक्शन का उपयोग करता है:

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

WebdriverIO को [स्टैंडअलोन मोड](https://webdriver.io/docs/setuptypes.html/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation) में उपयोग करते समय, `percySnapshot` फ़ंक्शन के पहले आर्गुमेंट के रूप में browser ऑब्जेक्ट प्रदान करें:

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
// स्टैंडअलोन मोड में browser ऑब्जेक्ट आवश्यक है
percySnapshot(browser, 'WebdriverIO at DuckDuckGo');
await browser.deleteSession();
```
स्नैपशॉट मेथड के आर्गुमेंट्स हैं:

```sh
percySnapshot(name[, options])
```
### स्टैंडअलोन मोड

```sh
percySnapshot(browser, name[, options])
```

- browser (आवश्यक) - WebdriverIO browser ऑब्जेक्ट
- name (आवश्यक) - स्नैपशॉट का नाम; प्रत्येक स्नैपशॉट के लिए यूनिक होना चाहिए
- options - प्रति-स्नैपशॉट कॉन्फ़िगरेशन विकल्प देखें

अधिक जानने के लिए, [Percy स्नैपशॉट](https://www.browserstack.com/docs/percy/take-percy-snapshots/overview/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation) देखें।

### चरण 5: Percy चलाएँ
नीचे दिखाए अनुसार `percy exec` कमांड का उपयोग करके अपने टेस्ट चलाएँ:

यदि आप `percy:exec` कमांड का उपयोग करने में असमर्थ हैं या IDE रन विकल्पों का उपयोग करके अपने टेस्ट चलाना पसंद करते हैं, तो आप `percy:exec:start` और `percy:exec:stop` कमांड का उपयोग कर सकते हैं। अधिक जानने के लिए, [Percy चलाएँ](https://www.browserstack.com/docs/percy/integrate/webdriverio/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation) पर जाएँ।

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

## अधिक विवरण के लिए निम्नलिखित पेज देखें:
- [अपने WebdriverIO टेस्ट को Percy के साथ इंटीग्रेट करें](https://www.browserstack.com/docs/percy/integrate/webdriverio/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation)
- [एनवायरनमेंट वेरिएबल पेज](https://www.browserstack.com/docs/percy/get-started/set-env-var/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation)
- यदि आप BrowserStack Automate का उपयोग कर रहे हैं, तो [BrowserStack SDK का उपयोग करके इंटीग्रेट करें](https://www.browserstack.com/docs/percy/integrate-bstack-sdk/webdriverio/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation)।


| संसाधन                                                                                                                                                            | विवरण                       |
|---------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------|
| [आधिकारिक डॉक्स](https://www.browserstack.com/docs/percy/integrate/webdriverio/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation)             | Percy का WebdriverIO डॉक्यूमेंटेशन |
| [सैंपल बिल्ड - ट्यूटोरियल](https://www.browserstack.com/docs/percy/sample-build/webdriverio/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation) | Percy का WebdriverIO ट्यूटोरियल      |
| [आधिकारिक वीडियो](https://youtu.be/1Sr_h9_3MI0/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation)                                              | Percy के साथ विज़ुअल टेस्टिंग         |
| [ब्लॉग](https://www.browserstack.com/blog/introducing-visual-reviews-2-0/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation)                    | Visual Reviews 2.0 का परिचय    |