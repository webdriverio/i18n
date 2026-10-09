---
id: tauri
title: Tauri
description: "सेटअप विज़ार्ड या मैन्युअल कॉन्फ़िगरेशन का उपयोग करके, WebdriverIO Tauri सर्विस के साथ Windows, macOS और Linux पर Tauri डेस्कटॉप ऐप्स का परीक्षण करें।"
---

[Tauri](https://tauri.app/) एक फ्रेमवर्क है जिसका उपयोग Rust बैकएंड और ऑपरेटिंग सिस्टम के नेटिव वेबव्यू की मदद से हल्के, सुरक्षित, क्रॉस-प्लेटफ़ॉर्म डेस्कटॉप एप्लिकेशन बनाने के लिए किया जाता है। WebdriverIO की Tauri सर्विस Windows (WebView2), macOS (WKWebView) और Linux (WebKitGTK) पर Tauri ऐप्स को खोजने, लॉन्च करने और चलाने की प्रक्रिया को स्वचालित करती है, ताकि एक ही टेस्ट सूट हर जगह काम करे।

Tauri एप्लिकेशन के परीक्षण के लिए WebdriverIO का उपयोग करने के लाभ हैं:

- 🚗 WebDriver लेयर का स्वचालित प्रावधान — `tauri-driver`, CrabNebula ड्राइवर, या इन-ऐप एम्बेडेड प्लगइन में से चुनें
- 📦 क्रॉस-प्लेटफ़ॉर्म बाइनरी डिटेक्शन (Windows पर Edge WebView2 ड्राइवर बंडल किया गया है)
- 🧩 अधिक समृद्ध इन-वेबव्यू इंटीग्रेशन के लिए वैकल्पिक `@wdio/tauri-plugin` (`browser.tauri.execute`, मॉकिंग)
- 🔗 डीपलिंक + प्रोटोकॉल हैंडलर परीक्षण
- 🪵 Rust + फ्रंटएंड लॉग्स को WebdriverIO टेस्ट रिपोर्टर में फ़ॉरवर्ड करना

## शुरुआत करें

नया WebdriverIO प्रोजेक्ट शुरू करने के लिए, चलाएँ:

```sh
npm create wdio@latest ./
```

जब विज़ार्ड पूछे कि आप किस प्रकार का परीक्षण करना चाहते हैं, तो _"Desktop Testing - of Electron, Tauri, or macOS Applications"_ चुनें, फिर फ्रेमवर्क प्रॉम्प्ट पर _Tauri_ चुनें। इसके बाद विज़ार्ड पूछेगा कि आप कौन सा WebDriver प्रोवाइडर उपयोग करना चाहते हैं (आधिकारिक `tauri-driver`, CrabNebula, या एम्बेडेड प्लगइन) और क्या आप अधिक समृद्ध इंटीग्रेशन के लिए वैकल्पिक `@wdio/tauri-plugin` चाहते हैं।

विज़ार्ड npm पैकेज स्वचालित रूप से इंस्टॉल करता है और आवश्यक Cargo जोड़ों को stdout पर प्रिंट करता है, ताकि आप उन्हें अपनी `src-tauri/Cargo.toml` में पेस्ट कर सकें।

## मैन्युअल सेटअप

यदि आपके पास पहले से एक WebdriverIO प्रोजेक्ट है, तो सर्विस इंस्टॉल करें:

```sh
npm install --save-dev @wdio/tauri-service
# वैकल्पिक: अधिक समृद्ध इन-वेबव्यू इंटीग्रेशन
npm install --save-dev @wdio/tauri-plugin
```

एम्बेडेड WebDriver प्लगइन के लिए (अनुशंसित — W3C सर्वर को आपके ऐप के अंदर चलाता है, किसी बाहरी `tauri-driver` की आवश्यकता नहीं), Cargo crate को `src-tauri/Cargo.toml` में जोड़ें:

```toml
[dependencies]
tauri-plugin-wdio-webdriver = "1"
```

…और इसे `src-tauri/src/lib.rs` में रजिस्टर करें:

```rust
tauri::Builder::default()
    .plugin(tauri_plugin_wdio_webdriver::init())
    // ...
```

फिर सर्विस को अपने कॉन्फ़िग में जोड़ें:

```ts
// wdio.conf.ts
export const config: WebdriverIO.Config = {
    // ...
    services: [['tauri', {
        appBinaryPath: './src-tauri/target/release/my-tauri-app',
        driverProvider: 'embedded'
    }]]
}
```

बस इतना ही 🎉

[Tauri सर्विस को कॉन्फ़िगर करने](/docs/desktop-testing/tauri/configuration), [Tauri प्लगइन सेटअप](/docs/desktop-testing/tauri/plugin-setup), [प्लेटफ़ॉर्म-विशिष्ट नोट्स](/docs/desktop-testing/tauri/platform-support), और [सामान्य उपयोग पैटर्न](/docs/desktop-testing/tauri/usage-examples) के बारे में और जानें।