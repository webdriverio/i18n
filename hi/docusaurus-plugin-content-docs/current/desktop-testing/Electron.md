---
id: electron
title: Electron
description: "WebdriverIO Electron सर्विस के साथ Electron ऐप्स का परीक्षण करें, जो Chromedriver सेट अप करती है, आपकी ऐप बाइनरी का पता लगाती है और आपको Electron APIs को मॉक करने देती है।"
---

Electron, JavaScript, HTML और CSS का उपयोग करके डेस्कटॉप एप्लिकेशन बनाने के लिए एक फ्रेमवर्क है। अपनी बाइनरी में Chromium और Node.js को एम्बेड करके, Electron आपको एक ही JavaScript कोडबेस बनाए रखने और ऐसे क्रॉस-प्लेटफ़ॉर्म ऐप्स बनाने की सुविधा देता है जो Windows, macOS और Linux पर काम करते हैं — किसी नेटिव डेवलपमेंट अनुभव की आवश्यकता नहीं है।

WebdriverIO एक एकीकृत सर्विस प्रदान करता है जो आपके Electron ऐप के साथ इंटरैक्शन को सरल बनाती है और उसका परीक्षण करना बहुत आसान बना देती है। Electron एप्लिकेशन के परीक्षण के लिए WebdriverIO का उपयोग करने के लाभ हैं:

- 🚗 आवश्यक Chromedriver का ऑटो-सेटअप
- 📦 आपके Electron एप्लिकेशन के पाथ का स्वचालित पता लगाना - [Electron Forge](https://www.electronforge.io/) और [Electron Builder](https://www.electron.build/) को सपोर्ट करता है
- 🧩 अपने टेस्ट के भीतर Electron APIs तक पहुँच
- 🕵️ Vitest जैसी API के माध्यम से Electron APIs की मॉकिंग

शुरू करने के लिए आपको बस कुछ आसान चरणों की आवश्यकता है। [WebdriverIO YouTube](https://www.youtube.com/@webdriverio) चैनल से यह सरल चरण-दर-चरण शुरुआती वीडियो ट्यूटोरियल देखें:

<LiteYouTubeEmbed
    id="iQNxTdWedk0"
    title="Getting Started with ElectronJS Testing in WebdriverIO"
/>

या निम्नलिखित सेक्शन में दी गई गाइड का पालन करें।

## शुरुआत करना

एक नया WebdriverIO प्रोजेक्ट शुरू करने के लिए, यह चलाएँ:

```sh
npm create wdio@latest ./
```

एक इंस्टॉलेशन विज़ार्ड इस प्रक्रिया में आपका मार्गदर्शन करेगा। जब पूछा जाए कि आप किस प्रकार का परीक्षण करना चाहते हैं, तो _"Desktop Testing - of Electron, Tauri, or macOS Applications"_ चुनें, फिर फ्रेमवर्क प्रॉम्प्ट पर _Electron_ चुनें। इसके बाद अपने कंपाइल किए गए Electron एप्लिकेशन का पाथ दें, उदा. `./dist`, फिर बस डिफ़ॉल्ट विकल्प रखें या अपनी पसंद के अनुसार बदलें।

कॉन्फ़िगरेशन विज़ार्ड सभी आवश्यक पैकेज इंस्टॉल करेगा और आपके एप्लिकेशन का परीक्षण करने के लिए आवश्यक कॉन्फ़िगरेशन के साथ एक `wdio.conf.js` या `wdio.conf.ts` बनाएगा। यदि आप कुछ टेस्ट फ़ाइलें स्वचालित रूप से जनरेट करने के लिए सहमत होते हैं, तो आप `npm run wdio` के माध्यम से अपना पहला टेस्ट चला सकते हैं।

## मैनुअल सेटअप

यदि आप पहले से ही अपने प्रोजेक्ट में WebdriverIO का उपयोग कर रहे हैं, तो आप इंस्टॉलेशन विज़ार्ड को छोड़ सकते हैं और बस निम्नलिखित डिपेंडेंसी जोड़ सकते हैं:

```sh
npm install --save-dev @wdio/electron-service
```

फिर आप निम्नलिखित कॉन्फ़िगरेशन का उपयोग कर सकते हैं:

```ts
// wdio.conf.ts
export const config: WebdriverIO.Config = {
    // ...
    services: [['electron', {
        appEntryPoint: './path/to/bundled/electron/main.bundle.js',
        appArgs: [/** ... */],
    }]]
}
```

बस इतना ही 🎉

[Electron सर्विस को कॉन्फ़िगर करने](/docs/desktop-testing/electron/configuration), [Electron APIs को मॉक करने](/docs/desktop-testing/electron/api-reference) और [Electron APIs तक पहुँचने](/docs/desktop-testing/electron/api) के बारे में अधिक जानें।