---
id: file-download
title: फ़ाइल डाउनलोड
description: "Chrome, Firefox और Edge के लिए डाउनलोड डायरेक्टरी कॉन्फ़िगर करें, डाउनलोड पूरा होने की प्रतीक्षा करें और सभी ब्राउज़र में डाउनलोड की गई फ़ाइलों को सत्यापित करें।"
---

वेब टेस्टिंग में फ़ाइल डाउनलोड को स्वचालित करते समय, विश्वसनीय टेस्ट निष्पादन सुनिश्चित करने के लिए विभिन्न ब्राउज़रों में उन्हें एक समान तरीके से संभालना आवश्यक है।

यहाँ, हम फ़ाइल डाउनलोड के लिए सर्वोत्तम प्रथाएँ प्रदान करते हैं और दिखाते हैं कि **Google Chrome**, **Mozilla Firefox**, और **Microsoft Edge** के लिए डाउनलोड डायरेक्टरी कैसे कॉन्फ़िगर करें।

## डाउनलोड पाथ

टेस्ट स्क्रिप्ट में डाउनलोड पाथ को **हार्डकोड** करने से रखरखाव संबंधी समस्याएँ और पोर्टेबिलिटी की समस्याएँ हो सकती हैं। विभिन्न वातावरणों में पोर्टेबिलिटी और संगतता सुनिश्चित करने के लिए डाउनलोड डायरेक्टरी के लिए **रिलेटिव पाथ** का उपयोग करें।

```javascript
// 👎
// हार्डकोडेड डाउनलोड पाथ
const downloadPath = '/path/to/downloads';

// 👍
// रिलेटिव डाउनलोड पाथ
const downloadPath = path.join(__dirname, 'downloads');
```

## प्रतीक्षा रणनीतियाँ

उचित प्रतीक्षा रणनीतियों को लागू न करने से रेस कंडीशन या अविश्वसनीय टेस्ट हो सकते हैं, विशेष रूप से डाउनलोड पूरा होने के मामले में। टेस्ट चरणों के बीच सिंक्रनाइज़ेशन सुनिश्चित करते हुए, फ़ाइल डाउनलोड पूरा होने की प्रतीक्षा करने के लिए **स्पष्ट (explicit)** प्रतीक्षा रणनीतियाँ लागू करें।

```javascript
// 👎
// डाउनलोड पूरा होने के लिए कोई स्पष्ट प्रतीक्षा नहीं
await browser.pause(5000);

// 👍
// फ़ाइल डाउनलोड पूरा होने की प्रतीक्षा करें
await waitUntil(async ()=> await fs.existsSync(downloadPath), 5000);
```

## डाउनलोड डायरेक्टरी कॉन्फ़िगर करना

**Google Chrome**, **Mozilla Firefox**, और **Microsoft Edge** के लिए फ़ाइल डाउनलोड व्यवहार को ओवरराइड करने हेतु, WebDriverIO capabilities में डाउनलोड डायरेक्टरी प्रदान करें:

<Tabs
defaultValue="chrome"
values={[
{label: 'Chrome', value: 'chrome'},
{label: 'Firefox', value: 'firefox'},
{label: 'Microsoft Edge', value: 'edge'},
]
}>

<TabItem value='chrome'>

```javascript reference title="wdio.conf.js"

https://github.com/webdriverio/example-recipes/blob/84dda93011234d0b2a34ee0cfb3cdfa2a06136a5/testDownloadBehavior/wdio.conf.js#L8-L16

```

</TabItem>

<TabItem value='firefox'>

```javascript reference title="wdio.conf.js"

https://github.com/webdriverio/example-recipes/blob/84dda93011234d0b2a34ee0cfb3cdfa2a06136a5/testDownloadBehavior/wdio.conf.js#L20-L32

```

</TabItem>

<TabItem value='edge'>

```javascript reference title="wdio.conf.js"

https://github.com/webdriverio/example-recipes/blob/84dda93011234d0b2a34ee0cfb3cdfa2a06136a5/testDownloadBehavior/wdio.conf.js#L36-L44

```

</TabItem>

</Tabs>

एक उदाहरण कार्यान्वयन के लिए, [WebdriverIO Test Download Behavior Recipe](https://github.com/webdriverio/example-recipes/tree/main/testDownloadBehavior) देखें।

## Chromium ब्राउज़र डाउनलोड कॉन्फ़िगर करना

__Chromium-आधारित__ ब्राउज़रों (जैसे Chrome, Edge, Brave, आदि) के लिए डाउनलोड पाथ बदलने हेतु, Chrome DevTools तक पहुँचने के लिए WebDriverIO की `getPuppeteer` मेथड का उपयोग करें।

```javascript
const page = await browser.getPuppeteer();
// एक CDP सेशन शुरू करें:
const cdpSession = await page.target().createCDPSession();
// डाउनलोड पाथ सेट करें:
await cdpSession.send('Browser.setDownloadBehavior', { behavior: 'allow', downloadPath: downloadPath });
```

## एकाधिक फ़ाइल डाउनलोड संभालना

एकाधिक फ़ाइल डाउनलोड वाले परिदृश्यों से निपटते समय, प्रत्येक डाउनलोड को प्रभावी ढंग से प्रबंधित और सत्यापित करने के लिए रणनीतियाँ लागू करना आवश्यक है। निम्नलिखित दृष्टिकोणों पर विचार करें:

__क्रमिक डाउनलोड हैंडलिंग:__ व्यवस्थित निष्पादन और सटीक सत्यापन सुनिश्चित करने के लिए फ़ाइलों को एक-एक करके डाउनलोड करें और अगला डाउनलोड शुरू करने से पहले प्रत्येक डाउनलोड को सत्यापित करें।

__समानांतर डाउनलोड हैंडलिंग:__ टेस्ट निष्पादन समय को अनुकूलित करते हुए, एक साथ कई फ़ाइल डाउनलोड शुरू करने के लिए एसिंक्रोनस प्रोग्रामिंग तकनीकों का उपयोग करें। पूरा होने पर सभी डाउनलोड को सत्यापित करने के लिए मज़बूत सत्यापन तंत्र लागू करें।

## क्रॉस-ब्राउज़र संगतता संबंधी विचार

हालाँकि WebDriverIO ब्राउज़र ऑटोमेशन के लिए एक एकीकृत इंटरफ़ेस प्रदान करता है, फिर भी ब्राउज़र के व्यवहार और क्षमताओं में भिन्नताओं को ध्यान में रखना आवश्यक है। संगतता और एकरूपता सुनिश्चित करने के लिए विभिन्न ब्राउज़रों में अपनी फ़ाइल डाउनलोड कार्यक्षमता का परीक्षण करने पर विचार करें।

__ब्राउज़र-विशिष्ट कॉन्फ़िगरेशन:__ Chrome, Firefox, Edge और अन्य समर्थित ब्राउज़रों में ब्राउज़र के व्यवहार और प्राथमिकताओं में अंतर को समायोजित करने के लिए डाउनलोड पाथ सेटिंग्स और प्रतीक्षा रणनीतियों को अनुकूलित करें।

__ब्राउज़र संस्करण संगतता:__ अपने मौजूदा टेस्ट सूट के साथ संगतता सुनिश्चित करते हुए नवीनतम सुविधाओं और सुधारों का लाभ उठाने के लिए अपने WebDriverIO और ब्राउज़र संस्करणों को नियमित रूप से अपडेट करें।