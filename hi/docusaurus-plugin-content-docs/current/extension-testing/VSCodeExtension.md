---
id: vscode-extensions
title: VS Code एक्सटेंशन टेस्टिंग
description: "WebdriverIO और VS Code सर्विस के साथ डेस्कटॉप IDE में या वेब एक्सटेंशन के रूप में VS Code एक्सटेंशन का एंड टू एंड परीक्षण करें।"
---

WebdriverIO आपको अपने [VS Code](https://code.visualstudio.com/) एक्सटेंशन का VS Code Desktop IDE में या वेब एक्सटेंशन के रूप में एंड टू एंड सहजता से परीक्षण करने की सुविधा देता है। आपको केवल अपने एक्सटेंशन का पाथ देना होता है और बाकी काम फ्रेमवर्क कर देता है। [`wdio-vscode-service`](https://www.npmjs.com/package/wdio-vscode-service) के साथ हर चीज़ का ध्यान रखा जाता है और इसके अलावा भी बहुत कुछ:

- 🏗️ VSCode इंस्टॉल करना (stable, insiders या कोई निर्दिष्ट वर्शन)
- ⬇️ दिए गए VSCode वर्शन के लिए विशिष्ट Chromedriver डाउनलोड करना
- 🚀 आपको अपने टेस्ट से VSCode API तक पहुँचने में सक्षम बनाता है
- 🖥️ कस्टम यूज़र सेटिंग्स के साथ VSCode शुरू करना (Ubuntu, MacOS और Windows पर VSCode के सपोर्ट सहित)
- 🌐 या वेब एक्सटेंशन के परीक्षण के लिए किसी भी ब्राउज़र द्वारा एक्सेस किए जाने हेतु सर्वर से VSCode सर्व करना
- 📔 आपके VSCode वर्शन से मेल खाते लोकेटर्स के साथ पेज ऑब्जेक्ट्स को बूटस्ट्रैप करना

## शुरुआत करना

एक नया WebdriverIO प्रोजेक्ट शुरू करने के लिए, चलाएँ:

```sh
npm create wdio@latest ./
```

एक इंस्टॉलेशन विज़ार्ड इस प्रक्रिया में आपका मार्गदर्शन करेगा। जब यह पूछे कि आप किस प्रकार का परीक्षण करना चाहते हैं, तो _"VS Code Extension Testing"_ चुनना सुनिश्चित करें, इसके बाद बस डिफ़ॉल्ट रहने दें या अपनी पसंद के अनुसार बदलाव करें।

## उदाहरण कॉन्फ़िगरेशन

सर्विस का उपयोग करने के लिए आपको अपनी सर्विसेज़ की सूची में `vscode` जोड़ना होगा, जिसके बाद वैकल्पिक रूप से एक कॉन्फ़िगरेशन ऑब्जेक्ट दिया जा सकता है। इससे WebdriverIO दिए गए VSCode बाइनरी और उपयुक्त Chromedriver वर्शन डाउनलोड करेगा:

```js
// wdio.conf.ts
export const config = {
    outputDir: 'trace',
    // ...
    capabilities: [{
        browserName: 'vscode',
        browserVersion: '1.71.0', // "insiders" or "stable" for latest VSCode version
        'wdio:vscodeOptions': {
            extensionPath: __dirname,
            userSettings: {
                "editor.fontSize": 14
            }
        }
    }],
    services: ['vscode'],
    /**
     * वैकल्पिक रूप से आप वह पाथ निर्धारित कर सकते हैं जहाँ WebdriverIO सभी
     * VSCode और Chromedriver बाइनरी स्टोर करता है, उदाहरण:
     * services: [['vscode', { cachePath: __dirname }]]
     */
    // ...
};
```

यदि आप `wdio:vscodeOptions` को `vscode` के अलावा किसी अन्य `browserName` के साथ परिभाषित करते हैं, जैसे `chrome`, तो सर्विस एक्सटेंशन को वेब एक्सटेंशन के रूप में सर्व करेगी। यदि आप Chrome पर परीक्षण करते हैं तो किसी अतिरिक्त ड्राइवर सर्विस की आवश्यकता नहीं है, उदाहरण:

```js
// wdio.conf.ts
export const config = {
    outputDir: 'trace',
    // ...
    capabilities: [{
        browserName: 'chrome',
        'wdio:vscodeOptions': {
            extensionPath: __dirname
        }
    }],
    services: ['vscode'],
    // ...
};
```

_नोट:_ वेब एक्सटेंशन का परीक्षण करते समय आप `browserVersion` के रूप में केवल `stable` या `insiders` में से चुन सकते हैं।

### TypeScript सेटअप

अपनी `tsconfig.json` में अपनी types की सूची में `wdio-vscode-service` जोड़ना सुनिश्चित करें:

```json
{
    "compilerOptions": {
        "types": [
            "node",
            "webdriverio/async",
            "@wdio/mocha-framework",
            "expect-webdriverio",
            "wdio-vscode-service"
        ],
        "target": "es2020",
        "moduleResolution": "node16"
    }
}
```

## उपयोग

फिर आप अपने इच्छित VSCode वर्शन से मेल खाते लोकेटर्स के पेज ऑब्जेक्ट्स तक पहुँचने के लिए `getWorkbench` मेथड का उपयोग कर सकते हैं:

```ts
describe('WDIO VSCode Service', () => {
    it('should be able to load VSCode', async () => {
        const workbench = await browser.getWorkbench()
        expect(await workbench.getTitleBar().getTitle())
            .toBe('[Extension Development Host] - README.md - wdio-vscode-service - Visual Studio Code')
    })
})
```

वहाँ से आप सही पेज ऑब्जेक्ट मेथड्स का उपयोग करके सभी पेज ऑब्जेक्ट्स तक पहुँच सकते हैं। सभी उपलब्ध पेज ऑब्जेक्ट्स और उनके मेथड्स के बारे में अधिक जानकारी [पेज ऑब्जेक्ट डॉक्स](https://webdriverio-community.github.io/wdio-vscode-service/) में प्राप्त करें।

### VSCode APIs तक पहुँचना

यदि आप [VSCode API](https://code.visualstudio.com/api/references/vscode-api) के माध्यम से कोई विशेष ऑटोमेशन निष्पादित करना चाहते हैं, तो आप कस्टम `executeWorkbench` कमांड के ज़रिए रिमोट कमांड चलाकर ऐसा कर सकते हैं। यह कमांड आपको अपने टेस्ट से VSCode एनवायरनमेंट के अंदर कोड को रिमोट रूप से निष्पादित करने और VSCode API तक पहुँचने की सुविधा देती है। आप फ़ंक्शन में मनचाहे पैरामीटर पास कर सकते हैं जो फिर फ़ंक्शन में प्रसारित हो जाएँगे। `vscode` ऑब्जेक्ट हमेशा पहले आर्गुमेंट के रूप में पास किया जाएगा, जिसके बाद बाहरी फ़ंक्शन पैरामीटर आएँगे। ध्यान दें कि आप फ़ंक्शन के स्कोप के बाहर के वेरिएबल्स तक नहीं पहुँच सकते क्योंकि कॉलबैक रिमोट रूप से निष्पादित होता है। यहाँ एक उदाहरण है:

```ts
const workbench = await browser.getWorkbench()
await browser.executeWorkbench((vscode, param1, param2) => {
    vscode.window.showInformationMessage(`I am an ${param1} ${param2}!`)
}, 'API', 'call')

const notifs = await workbench.getNotifications()
console.log(await notifs[0].getMessage()) // आउटपुट: "I am an API call!"
```

पूर्ण पेज ऑब्जेक्ट डॉक्यूमेंटेशन के लिए, [डॉक्स](https://webdriverio-community.github.io/wdio-vscode-service/modules.html) देखें। आप इस [प्रोजेक्ट के टेस्ट सूट](https://github.com/webdriverio-community/wdio-vscode-service/blob/main/test/specs) में उपयोग के विभिन्न उदाहरण पा सकते हैं।

## अधिक जानकारी

आप [`wdio-vscode-service`](https://www.npmjs.com/package/wdio-vscode-service) को कॉन्फ़िगर करने और कस्टम पेज ऑब्जेक्ट्स बनाने के बारे में [सर्विस डॉक्स](/docs/wdio-vscode-service) में अधिक जान सकते हैं। आप [Christian Bromann](https://twitter.com/bromann) की [_Testing Complex VSCode Extensions With the Power of Web Standards_](https://www.youtube.com/watch?v=PhGNTioBUiU) पर निम्नलिखित टॉक भी देख सकते हैं:

<LiteYouTubeEmbed
    id="PhGNTioBUiU"
    title="Testing Complex VSCode Extensions With the Power of Web Standards"
/>