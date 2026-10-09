---
id: record
title: टेस्ट रिकॉर्ड करें
description: "Chrome DevTools Recorder के साथ यूज़र फ़्लो रिकॉर्ड करें और उन्हें WebdriverIO टेस्ट के रूप में एक्सपोर्ट करें।"
---

Chrome DevTools में एक _Recorder_ पैनल है जो उपयोगकर्ताओं को Chrome के भीतर स्वचालित चरणों को रिकॉर्ड और प्लेबैक करने की अनुमति देता है। इन चरणों को [एक एक्सटेंशन के साथ WebdriverIO टेस्ट में एक्सपोर्ट किया जा सकता है](https://chrome.google.com/webstore/detail/webdriverio-chrome-record/pllimkccefnbmghgcikpjkmmcadeddfn?hl=en), जिससे टेस्ट लिखना बहुत आसान हो जाता है।

## Chrome DevTools Recorder क्या है

[Chrome DevTools Recorder](https://developer.chrome.com/docs/devtools/recorder/) एक ऐसा टूल है जो आपको टेस्ट क्रियाओं को सीधे ब्राउज़र में रिकॉर्ड और रीप्ले करने की अनुमति देता है और उन्हें JSON के रूप में एक्सपोर्ट (या e2e टेस्ट में एक्सपोर्ट) करने के साथ-साथ टेस्ट प्रदर्शन को मापने की सुविधा भी देता है।

यह टूल सरल है, और चूंकि यह ब्राउज़र में ही जुड़ा हुआ है, इसलिए हमें संदर्भ बदलने या किसी थर्ड-पार्टी टूल से निपटने की ज़रूरत नहीं पड़ती।

## Chrome DevTools Recorder के साथ टेस्ट कैसे रिकॉर्ड करें

यदि आपके पास नवीनतम Chrome है तो Recorder पहले से ही इंस्टॉल और आपके लिए उपलब्ध होगा। बस कोई भी वेबसाइट खोलें, राइट-क्लिक करें और _"Inspect"_ चुनें। DevTools के भीतर आप `CMD/Control` + `Shift` + `p` दबाकर और _"Show Recorder"_ दर्ज करके Recorder खोल सकते हैं।

![Chrome DevTools Recorder](/img/recorder/recorder.png)

किसी यूज़र जर्नी को रिकॉर्ड करना शुरू करने के लिए, _"Start new recording"_ पर क्लिक करें, अपने टेस्ट को एक नाम दें और फिर अपना टेस्ट रिकॉर्ड करने के लिए ब्राउज़र का उपयोग करें:

![Chrome DevTools Recorder](/img/recorder/demo.gif)

अगले चरण में, यह जांचने के लिए _"Replay"_ पर क्लिक करें कि रिकॉर्डिंग सफल रही या नहीं और वह वही करती है जो आप करना चाहते थे। यदि सब कुछ ठीक है, तो [export](https://developer.chrome.com/docs/devtools/recorder/reference/#recorder-extension) आइकन पर क्लिक करें और _"Export as a WebdriverIO Test Script"_ चुनें:

_"Export as a WebdriverIO Test Script"_ विकल्प केवल तभी उपलब्ध होता है जब आप [WebdriverIO Chrome Recorder](https://chrome.google.com/webstore/detail/webdriverio-chrome-record/pllimkccefnbmghgcikpjkmmcadeddfn) एक्सटेंशन इंस्टॉल करते हैं।


![Chrome DevTools Recorder](/img/recorder/export.gif)

बस इतना ही!

## रिकॉर्डिंग एक्सपोर्ट करें

यदि आपने फ़्लो को WebdriverIO टेस्ट स्क्रिप्ट के रूप में एक्सपोर्ट किया है, तो इससे एक स्क्रिप्ट डाउनलोड होनी चाहिए जिसे आप अपने टेस्ट सूट में कॉपी और पेस्ट कर सकते हैं। उदाहरण के लिए, ऊपर दी गई रिकॉर्डिंग इस प्रकार दिखती है:

```ts
describe("My WebdriverIO Test", function () {
  it("tests My WebdriverIO Test", function () {
    await browser.setWindowSize(1026, 688)
    await browser.url("https://webdriver.io/")
    await browser.$("#__docusaurus > div.main-wrapper > header > div").click()
    await browser.$("#__docusaurus > nav > div.navbar__inner > div:nth-child(1) > a:nth-child(3)").click()rec
    await browser.$("#__docusaurus > div.main-wrapper.docs-wrapper.docs-doc-page > div > aside > div > nav > ul > li:nth-child(4) > div > a").click()
    await browser.$("#__docusaurus > div.main-wrapper.docs-wrapper.docs-doc-page > div > aside > div > nav > ul > li:nth-child(4) > ul > li:nth-child(2) > a").click()
    await browser.$("#__docusaurus > nav > div.navbar__inner > div.navbar__items.navbar__items--right > div.searchBox_qEbK > button > span.DocSearch-Button-Container > span").click()
    await browser.$("#docsearch-input").setValue("click")
    await browser.$("#docsearch-item-0 > a > div > div.DocSearch-Hit-content-wrapper > span").click()
  });
});
```

सुनिश्चित करें कि आप कुछ लोकेटर्स की दोबारा समीक्षा करें और यदि आवश्यक हो तो उन्हें अधिक मज़बूत [सेलेक्टर प्रकारों](/docs/selectors) से बदलें। आप फ़्लो को JSON फ़ाइल के रूप में भी एक्सपोर्ट कर सकते हैं और इसे वास्तविक टेस्ट स्क्रिप्ट में बदलने के लिए [`@wdio/chrome-recorder`](https://github.com/webdriverio/chrome-recorder) पैकेज का उपयोग कर सकते हैं।

## अगले चरण

आप इस फ़्लो का उपयोग करके अपने एप्लिकेशन के लिए आसानी से टेस्ट बना सकते हैं। Chrome DevTools Recorder में कई अतिरिक्त सुविधाएं हैं, जैसे:

- [धीमे नेटवर्क का अनुकरण करें](https://developer.chrome.com/docs/devtools/recorder/#simulate-slow-network) या
- [अपने टेस्ट के प्रदर्शन को मापें](https://developer.chrome.com/docs/devtools/recorder/#measure)

उनके [डॉक्स](https://developer.chrome.com/docs/devtools/recorder) अवश्य देखें।