---
id: autowait
title: स्वचालित प्रतीक्षा
---

जब ऐसे कमांड का उपयोग करते हैं जो सीधे किसी एलिमेंट के साथ इंटरैक्ट करते हैं, तो WebdriverIO स्वचालित रूप से एलिमेंट के दृश्यमान और इंटरैक्टेबल होने तक प्रतीक्षा करेगा, कमांड्स (जैसे click, setValue आदि) का उपयोग करते समय मैन्युअल प्रतीक्षा की आवश्यकता नहीं होती है।
एक एलिमेंट को इंटरैक्टेबल तब माना जाता है जब [isClickable](https://webdriver.io/docs/api/element/isClickable) की शर्तें पूरी होती हैं।

जबकि WebdriverIO स्वचालित रूप से एलिमेंट्स के इंटरैक्टेबल होने की प्रतीक्षा करता है, कुछ दुर्लभ मामले हो सकते हैं जिनके लिए आपको मैन्युअल रूप से प्रतीक्षा करने की आवश्यकता हो सकती है। इन दुर्लभ मामलों के लिए हम [`waitForDisplayed`](/docs/api/element/waitForDisplayed) जैसे कमांड्स प्रदान करते हैं।


## इम्प्लिसिट टाइमआउट (अनुशंसित नहीं)

हम इसका उपयोग करने की अनुशंसा नहीं करते हैं, लेकिन WebDriver प्रोटोकॉल [implicit timeouts](https://w3c.github.io/webdriver/#timeouts) प्रदान करता है जो यह निर्दिष्ट करने की अनुमति देता है कि ड्राइवर को किसी एलिमेंट के दिखाई देने तक कितनी देर तक प्रतीक्षा करनी चाहिए। डिफ़ॉल्ट रूप से यह टाइमआउट `0` पर सेट होता है, इसलिए यदि पेज पर कोई एलिमेंट नहीं मिल सकता है तो ड्राइवर तुरंत `no such element` त्रुटि के साथ लौटता है। [`setTimeout`](/docs/api/browser/setTimeout) का उपयोग करके इस टाइमआउट को बढ़ाने से ड्राइवर प्रतीक्षा करेगा और इस बात की संभावना बढ़ जाती है कि एलिमेंट अंततः दिखाई दे।

:::note

WebDriver और फ्रेमवर्क संबंधित टाइमआउट के बारे में अधिक जानकारी [timeouts guide](/docs/timeouts) में पढ़ें

:::