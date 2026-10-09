---
id: apps-and-extensions
title: एक्सटेंशन और एडिटर
description: WebdriverIO सेशन में ब्राउज़र एक्सटेंशन या VS Code एक्सटेंशन लोड करें और उसे एंड-टू-एंड टेस्ट करें।
---

WebdriverIO ब्राउज़र एक्सटेंशन और एडिटर एक्सटेंशन को असली होस्ट एप्लिकेशन में लोड करके टेस्ट करता है। ब्राउज़र (वेब) एक्सटेंशन Chrome या Firefox के अंदर चलते हैं। आप उन्हें ब्राउज़र capabilities के ज़रिए लोड करते हैं: Chrome में `goog:chromeOptions` के माध्यम से `--load-extension` या base64 `.crx`, या Firefox में `.xpi` के लिए `browser.installAddOn()`। WebDriver BiDi सेशन में आप `browser.installExtension()` और `browser.uninstallExtension()` से सेशन के बीच में भी एक्सटेंशन इंस्टॉल और हटा सकते हैं। Safari में BiDi सेशन नहीं होता, इसलिए यह कमांड Safari को कवर नहीं करती। इसके बाद, आप सामान्य WebDriver कमांड्स से content scripts और popup पेजों को टेस्ट करते हैं। VS Code एक्सटेंशन को कम्युनिटी [`wdio-vscode-service`](/docs/wdio-vscode-service) से टेस्ट किया जाता है। यह VS Code (stable, insiders या कोई विशिष्ट वर्ज़न) और उससे मेल खाने वाला Chromedriver डाउनलोड करता है, फिर आपके एक्सटेंशन और कस्टम यूज़र सेटिंग्स के साथ VS Code शुरू करता है। वर्कबेंच के लिए page objects `browser.getWorkbench()` के ज़रिए उपलब्ध हैं, और `browser.executeWorkbench()` VS Code API के विरुद्ध कोड चलाता है। यही सर्विस वेब एक्सटेंशन टेस्ट करने के लिए VS Code को ब्राउज़र में भी सर्व कर सकती है। Obsidian प्लगइन्स के लिए भी एक कम्युनिटी सर्विस है।

## क्विक स्टार्ट

पहले testrunner और TypeScript सपोर्ट इंस्टॉल करें:

```sh
npm install --save-dev @wdio/cli @wdio/local-runner @wdio/mocha-framework @wdio/spec-reporter tsx
```

```json title="tsconfig.json"
{
    "compilerOptions": {
        "types": ["node", "@wdio/globals/types", "@wdio/mocha-framework"]
    }
}
```

### Chrome एक्सटेंशन

अपने एक्सटेंशन को एक फ़ोल्डर (यहाँ `./dist`) में बिल्ड करें और उसे `--load-extension` Chrome आर्गुमेंट से लोड करें:

```ts title="wdio.conf.ts"
import path from 'node:path'
import url from 'node:url'

const __dirname = url.fileURLToPath(new URL('.', import.meta.url))

export const config: WebdriverIO.Config = {
    runner: 'local',
    specs: ['./test/specs/**/*.ts'],
    capabilities: [{
        browserName: 'chrome',
        'goog:chromeOptions': {
            args: [`--load-extension=${path.join(__dirname, 'dist')}`]
        }
    }],
    framework: 'mocha',
    reporters: ['spec'],
    mochaOpts: {
        ui: 'bdd',
        timeout: 60000
    }
}
```

```ts title="test/specs/extension.e2e.ts"
import { expect, browser, $ } from '@wdio/globals'

describe('My Web Extension', () => {
    it('should inject its content script', async () => {
        await browser.url('https://webdriver.io')
        // इसे उस एलिमेंट से बदलें जिसे आपकी content script पेज में जोड़ती है
        await expect($('#my-extension-root')).toBeExisting()
    })
})
```

टूलबार में एक्सटेंशन आइकन पर क्लिक करना काम नहीं करता। `default_popup` टेस्ट करने के लिए, `chrome://extensions/` पर एक्सटेंशन id ढूंढें और `browser.url()` से `chrome-extension://<id>/<popup>.html` खोलें। [Web Extension गाइड](/docs/extension-testing/web-extensions#test-popup-modal-in-chrome) में इसके लिए एक तैयार `openExtensionPopup` कस्टम कमांड है।

### VS Code एक्सटेंशन

```sh
npm install --save-dev wdio-vscode-service
```

`tsconfig.json` में `types` ऐरे में `"wdio-vscode-service"` जोड़ें।

```ts title="wdio.conf.ts"
import url from 'node:url'

const __dirname = url.fileURLToPath(new URL('.', import.meta.url))

export const config: WebdriverIO.Config = {
    runner: 'local',
    specs: ['./test/specs/**/*.ts'],
    capabilities: [{
        browserName: 'vscode',
        browserVersion: 'stable', // यह भी संभव है: "insiders" या कोई विशिष्ट वर्ज़न जैसे "1.80.0"
        'wdio:vscodeOptions': {
            // उस डायरेक्टरी की ओर इशारा करता है जहाँ एक्सटेंशन का package.json स्थित है
            extensionPath: __dirname,
            userSettings: {
                'editor.fontSize': 14
            }
        }
    }],
    services: ['vscode'],
    framework: 'mocha',
    reporters: ['spec'],
    mochaOpts: {
        ui: 'bdd',
        timeout: 60000
    }
}
```

```ts title="test/specs/vscode.e2e.ts"
import { browser, expect } from '@wdio/globals'

describe('VS Code Extension Testing', () => {
    it('should be able to load VSCode', async () => {
        const workbench = await browser.getWorkbench()
        expect(await workbench.getTitleBar().getTitle())
            .toContain('[Extension Development Host]')
    })
})
```

एक्सटेंशन को VS Code वेब एक्सटेंशन के रूप में टेस्ट करने के लिए, `browserName: 'chrome'` सेट करें और `wdio:vscodeOptions` को बनाए रखें। इस मोड में, `browserVersion` केवल `stable` या `insiders` हो सकता है। "VS Code Extension Testing" के साथ `npm create wdio@latest ./` आपके लिए यह सेटअप जनरेट कर देता है।

## अपना रास्ता चुनें

- [Web Extension Testing](/docs/extension-testing/web-extensions): Chrome (फ़ोल्डर या `.crx`) और Firefox ([`installAddOn`](/docs/api/gecko#installaddon) के ज़रिए `.xpi`) में एक्सटेंशन लोड करें, या [`installExtension`](/docs/api/browser/installExtension) से सेशन के बीच में एक्सटेंशन इंस्टॉल करें और हटाएँ। Safari वेब एक्सटेंशन कवर नहीं किए गए हैं।
- [Firefox Profile Service](/docs/firefox-profile-service): एक्सटेंशन सहित एक Firefox प्रोफ़ाइल बनाएँ।
- [VS Code Extension Testing](/docs/extension-testing/vscode-extensions): कॉन्फ़िगरेशन, TypeScript सेटअप, वर्कबेंच page objects और `executeWorkbench`।
- [VS Code Service](/docs/wdio-vscode-service): सर्विस के सभी विकल्प, जैसे `cachePath`, और कस्टम page objects कैसे लिखें।
- [Obsidian Plugin Testing Service](/docs/wdio-obsidian-service): एक कम्युनिटी सर्विस जो Windows, macOS, Linux और Android पर विभिन्न Obsidian वर्ज़न में Obsidian प्लगइन्स को टेस्ट करती है।
- [Custom Commands](/docs/customcommands): `openExtensionPopup` जैसे हेल्पर्स को दोबारा उपयोग के लिए पैकेज करें।

वेब एक्सटेंशन टेस्ट सामान्य Chrome या Firefox सेशन में चलते हैं, इसलिए [Web Browsers](/docs/platforms/web) पर दी गई हर बात लागू होती है, जिसमें selectors, network mocking और visual testing शामिल हैं।

## समस्या निवारण

- Firefox साइनिंग की वजह से लोकली बिल्ड किए गए एक्सटेंशन को अस्वीकार करता है: इसे प्रोफ़ाइल के बजाय `before` हुक में `browser.installAddOn(extension.toString('base64'), true)` से इंस्टॉल करें। `.xpi` को `npx web-ext build` से बिल्ड करें।
- Chrome के बजाय Edge, Brave या Opera का उपयोग कर रहे हैं: आमतौर पर वही आर्गुमेंट उस ब्राउज़र की options capability के साथ काम करते हैं, जैसे `ms:edgeOptions`।
- VS Code और Chromedriver बाइनरी एक कैश डायरेक्टरी में डाउनलोड होती हैं। वे कहाँ स्टोर हों, इसे नियंत्रित करने के लिए, जैसे CI में उन्हें कैश करने के लिए, `services: [['vscode', { cachePath: __dirname }]]` सेट करें।
- TypeScript को `getWorkbench` या `executeWorkbench` नहीं मिल रहा: `compilerOptions.types` में `wdio-vscode-service` जोड़ें।

## अगले कदम

- हर `wdio.conf.ts` विकल्प के लिए [Configuration](/docs/configuration) संदर्भ।
- Chromium पर बने पूर्ण डेस्कटॉप ऐप्स को टेस्ट करने के लिए [Electron](/docs/desktop-testing/electron)।
- अन्य प्लेटफ़ॉर्म: [Web Browsers](/docs/platforms/web), [Mobile Apps](/docs/platforms/mobile), [Desktop Apps](/docs/platforms/desktop)।