---
id: dioxus
title: Dioxus
description: "सेटअप विज़ार्ड या मैनुअल कॉन्फ़िगरेशन का उपयोग करके, WebdriverIO Dioxus सर्विस के साथ Windows, macOS और Linux पर Dioxus डेस्कटॉप ऐप्स का परीक्षण करें।"
---

[Dioxus](https://dioxuslabs.com/) एक Rust फ्रेमवर्क है जो एक ही कोडबेस से क्रॉस-प्लेटफ़ॉर्म ऐप्स बनाने के लिए उपयोग किया जाता है। इसके डेस्कटॉप ऐप्स ऑपरेटिंग सिस्टम के नेटिव वेबव्यू (Wry) में रेंडर होते हैं, और WebdriverIO की Dioxus सर्विस Windows (WebView2), macOS (WKWebView), और Linux (WebKitGTK) पर उनकी खोज, लॉन्च और संचालन को स्वचालित करती है, ताकि एक ही टेस्ट सूट हर जगह काम करे।

Dioxus एप्लिकेशन के परीक्षण के लिए WebdriverIO का उपयोग करने के लाभ हैं:

- 🚗 WebDriver लेयर का ऑटो-प्रोविज़निंग — अनुशंसित एम्बेडेड इन-प्रोसेस ड्राइवर को किसी भी प्लेटफ़ॉर्म पर किसी बाहरी ड्राइवर बाइनरी की आवश्यकता नहीं होती
- 📦 क्रॉस-प्लेटफ़ॉर्म बाइनरी डिटेक्शन (`external` प्रोवाइडर के लिए Windows पर Edge WebView2 ड्राइवर बंडल किया गया है)
- 🧩 `browser.dioxus.execute()`, मॉकिंग और विंडो मैनेजमेंट, जो सर्विस द्वारा `wdio-dioxus-bridge` क्रेट के माध्यम से प्रदान किए जाते हैं
- 🔗 डीपलिंक + प्रोटोकॉल हैंडलर परीक्षण
- 🪵 Rust + फ्रंटएंड लॉग्स को WebdriverIO टेस्ट रिपोर्टर में फ़ॉरवर्ड करना

## शुरुआत करना

एक नया WebdriverIO प्रोजेक्ट शुरू करने के लिए, चलाएँ:

```sh
npm create wdio@latest ./
```

जब विज़ार्ड पूछे कि आप किस प्रकार का परीक्षण करना चाहते हैं, तो _"Desktop Testing - of Electron, Tauri, Dioxus, or macOS Applications"_ चुनें, फिर फ्रेमवर्क प्रॉम्प्ट पर _Dioxus_ चुनें। इसके बाद विज़ार्ड पूछेगा कि आप कौन सा WebDriver प्रोवाइडर उपयोग करना चाहते हैं (अनुशंसित एम्बेडेड इन-प्रोसेस ड्राइवर, या केवल Windows के लिए external ड्राइवर) और आपकी बिल्ट डीबग बाइनरी का पाथ क्या है।

विज़ार्ड npm पैकेज स्वचालित रूप से इंस्टॉल करता है और आवश्यक Cargo जोड़ों को stdout पर प्रिंट करता है, ताकि आप उन्हें अपनी `Cargo.toml` में पेस्ट कर सकें।

## मैनुअल सेटअप

यदि आपके पास पहले से एक WebdriverIO प्रोजेक्ट है, तो सर्विस इंस्टॉल करें:

```sh
npm install --save-dev @wdio/dioxus-service
```

परीक्षण के लिए `wdio-dioxus-bridge` क्रेट आवश्यक है — यह `browser.dioxus.execute()`, मॉकिंग और लॉग कैप्चर को सक्षम करता है। इसे अपनी `Cargo.toml` में जोड़ें:

```toml
[dependencies]
wdio-dioxus-bridge = "1"
```

…और इसे `src/main.rs` में अपने Dioxus डेस्कटॉप कॉन्फ़िग में इंस्टॉल करें। `#[cfg(debug_assertions)]` गार्ड ब्रिज को रिलीज़ बिल्ड से बाहर रखता है:

```rust
fn main() {
    let mut config = dioxus::desktop::Config::new();

    #[cfg(debug_assertions)]
    {
        config = wdio_dioxus_bridge::install(config);
    }

    dioxus::LaunchBuilder::desktop()
        .with_cfg(config)
        .launch(App);
}
```

परीक्षण के लिए ऐप बिल्ड करें (डीबग बिल्ड ब्रिज को सक्रिय रखता है):

```sh
cargo build
```

फिर अपने कॉन्फ़िग में सर्विस और कैपेबिलिटीज़ जोड़ें:

```ts
// wdio.conf.ts
export const config: WebdriverIO.Config = {
    // ...
    services: [['dioxus', { driverProvider: 'embedded' }]],
    capabilities: [{
        browserName: 'dioxus',
        'dioxus:options': {
            application: './target/debug/my-app'
        }
    }]
}
```

बस इतना ही 🎉

[Dioxus सर्विस को कॉन्फ़िगर करने](/docs/desktop-testing/dioxus/configuration), [ब्रिज सेटअप](/docs/desktop-testing/dioxus/plugin-setup), [प्लेटफ़ॉर्म-विशिष्ट नोट्स](/docs/desktop-testing/dioxus/platform-support), और [सामान्य उपयोग पैटर्न](/docs/desktop-testing/dioxus/usage-examples) के बारे में और जानें।