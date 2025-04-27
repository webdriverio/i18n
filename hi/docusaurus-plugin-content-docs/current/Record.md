---
id: record
title: रिकॉर्ड टेस्ट
---

Chrome DevTools में एक _Recorder_ पैनल है जो उपयोगकर्ताओं को Chrome के भीतर स्वचालित कदमों को रिकॉर्ड और प्लेबैक करने की अनुमति देता है। इन कदमों को [एक एक्सटेंशन के साथ WebdriverIO टेस्ट में निर्यात किया जा सकता है](https://chrome.google.com/webstore/detail/webdriverio-chrome-record/pllimkccefnbmghgcikpjkmmcadeddfn?hl=en) जिससे टेस्ट लिखना बहुत आसान हो जाता है।

## Chrome DevTools Recorder क्या है

[Chrome DevTools Recorder](https://developer.chrome.com/docs/devtools/recorder/) एक ऐसा टूल है जो आपको सीधे ब्राउज़र में टेस्ट एक्शन रिकॉर्ड और रीप्ले करने की अनुमति देता है और उन्हें JSON के रूप में निर्यात करने (या उन्हें e2e टेस्ट में निर्यात करने) के साथ-साथ टेस्ट प्रदर्शन को मापने की भी अनुमति देता है।

यह टूल सरल है, और चूंकि यह ब्राउज़र में प्लग इन किया गया है, हमें कॉन्टेक्स्ट बदलने या किसी थर्ड-पार्टी टूल से निपटने की परेशानी नहीं होती है।

## Chrome DevTools Recorder के साथ टेस्ट रिकॉर्ड कैसे करें

अगर आपके पास नवीनतम Chrome है, तो Recorder पहले से ही इंस्टॉल और आपके लिए उपलब्ध होगा। बस किसी भी वेबसाइट को खोलें, राइट-क्लिक करें और _"Inspect"_ चुनें। DevTools के भीतर आप `CMD/Control` + `Shift` + `p` दबाकर और _"Show Recorder"_ दर्ज करके Recorder खोल सकते हैं।

![Chrome DevTools Recorder](/img/recorder/recorder.png)

यूजर जर्नी रिकॉर्ड करना शुरू करने के लिए, _"Start new recording"_ पर क्लिक करें, अपने टेस्ट को एक नाम दें और फिर अपना टेस्ट रिकॉर्ड करने के लिए ब्राउज़र का उपयोग करें:

![Chrome DevTools Recorder](/img/recorder/demo.gif)

अगले चरण में, यह जांचने के लिए _"Replay"_ पर क्लिक करें कि रिकॉर्डिंग सफल रही और वह वही करती है जो आप चाहते थे। अगर सब कुछ ठीक है, तो [export](https://developer.chrome.com/docs/devtools/recorder/reference/#recorder-extension) आइकन पर क्लिक करें और _"Export as a WebdriverIO Test Script"_ चुनें:

_"Export as a WebdriverIO Test Script"_ विकल्प केवल तभी उपलब्ध होता है जब आप [WebdriverIO Chrome Recorder](https://chrome.google.com/webstore/detail/webdriverio-chrome-record/pllimkccefnbmghgcikpjkmmcadeddfn) एक्सटेंशन इंस्टॉल करते हैं।

![Chrome DevTools Recorder](/img/recorder/export.gif)

बस इतना ही!

## रिकॉर्डिंग निर्यात करें

अगर आपने फ़्लो को WebdriverIO टेस्ट स्क्रिप्ट के रूप में निर्यात किया है, तो यह एक स्क्रिप्ट डाउनलोड करेगा जिसे आप अपने टेस्ट सूट में कॉपी और पेस्ट कर सकते हैं। उदाहरण के लिए, उपरोक्त रिकॉर्डिंग निम्नानुसार दिखाई देती है:

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

यदि आवश्यक हो तो कुछ लोकेटर्स को दोबारा देखें और उन्हें अधिक मजबूत [सिलेक्टर प्रकारों](/docs/selectors) से बदलें। आप फ़्लो को JSON फ़ाइल के रूप में भी निर्यात कर सकते हैं और [`@wdio/chrome-recorder`](https://github.com/webdriverio/chrome-recorder) पैकेज का उपयोग करके इसे एक वास्तविक टेस्ट स्क्रिप्ट में परिवर्तित कर सकते हैं।

## अगले कदम

आप इस फ़्लो का उपयोग अपने एप्लिकेशन के लिए आसानी से टेस्ट बनाने के लिए कर सकते हैं। Chrome DevTools Recorder में विभिन्न अतिरिक्त सुविधाएँ हैं, जैसे:

- [धीमे नेटवर्क का सिमुलेशन](https://developer.chrome.com/docs/devtools/recorder/#simulate-slow-network) या
- [अपने टेस्ट के प्रदर्शन को मापें](https://developer.chrome.com/docs/devtools/recorder/#measure)

उनके [दस्तावेज़ों](https://developer.chrome.com/docs/devtools/recorder) को जरूर देखें।