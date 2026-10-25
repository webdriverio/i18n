---
id: apps-and-extensions
title: एक्सटेंशन और एडिटर
description: WebdriverIO सेशन में ब्राउज़र एक्सटेंशन या VS Code एक्सटेंशन लोड करें और उसका एंड-टू-एंड परीक्षण करें।
---

WebdriverIO ब्राउज़र एक्सटेंशन और एडिटर एक्सटेंशन को वास्तविक होस्ट एप्लिकेशन में लोड करके उनका परीक्षण करता है। ब्राउज़र (वेब) एक्सटेंशन Chrome या Firefox के अंदर चलते हैं। आप उन्हें ब्राउज़र capabilities के माध्यम से लोड करते हैं: Chrome में `--load-extension` या `goog:chromeOptions` के ज़रिए base64 `.crx`, या Firefox में `.xpi` के लिए `browser.installAddOn()`। WebDriver BiDi सेशन में आप `browser.installExtension()` और `browser.uninstallExtension()` के साथ सेशन के बीच में भी एक्सटेंशन इंस्टॉल और हटा सकते हैं। Safari में कोई BiDi सेशन नहीं होता, इसलिए यह कमांड Safari को कवर नहीं करता। इसके बाद, आप सामान्य WebDriver कमांड के साथ content scripts और popup पेजों का परीक्षण करते हैं। VS Code एक्सटेंशन का परीक्षण कम्युनिटी [`wdio-vscode-service`](/docs/wdio-vscode-service) के साथ किया जाता है। यह VS Code (stable, insiders या कोई विशिष्ट संस्करण) और उससे मेल खाने वाला Chromedriver डाउनलोड करता है, फिर आपके एक्सटेंशन और कस्टम यूज़र सेटिंग्स के साथ VS Code शुरू करता है। workbench के लिए page objects `browser.getWorkbench()` के माध्यम से उपलब्ध हैं, और `browser.executeWorkbench()` VS Code API पर कोड चलाता है। यही सर्विस वेब एक्सटेंशन का परीक्षण करने के लिए VS Code को ब्राउज़र में भी चला सकती है। Obsidian प्लगइन्स के लिए भी एक कम्युनिटी सर्विस है।

## त्वरित शुरुआत

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

अपने एक्सटेंशन को एक फ़ोल्डर (यहाँ `./dist`) में बिल्ड करें और उसे `--load-extension` Chrome argument के साथ लोड करें:

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
        // इसे उस एलिमेंट से बदलें जिसे आपका content script पेज में जोड़ता है
        await expect($('#my-extension-root')).toBeExisting()
    })
})
```

टूलबार में एक्सटेंशन आइकन पर क्लिक करना काम नहीं करता। `default_popup` का परीक्षण करने के लिए, `chrome://extensions/` पर एक्सटेंशन id खोजें और `browser.url()` के साथ `chrome-extension://<id>/<popup>.html` खोलें। [वेब एक्सटेंशन गाइड](/docs/extension-testing/web-extensions#test-popup-modal-in-chrome) में इसके लिए एक तैयार `openExtensionPopup` कस्टम कमांड है।

### VS Code एक्सटेंशन

```sh
npm install --save-dev wdio-vscode-service
```

`tsconfig.json` में `types` array में `"wdio-vscode-service"` जोड़ें।

```ts title="wdio.conf.ts"
import url from 'node:url'

const __dirname = url.fileURLToPath(new URL('.', import.meta.url))

export const config: WebdriverIO.Config = {
    runner: 'local',
    specs: ['./test/specs/**/*.ts'],
    capabilities: [{
        browserName: 'vscode',
        browserVersion: 'stable', // यह भी संभव है: "insiders" या कोई विशिष्ट संस्करण, उदा. "1.80.0"
        'wdio:vscodeOptions': {
            // उस डायरेक्टरी की ओर इंगित करता है जहाँ एक्सटेंशन का package.json स्थित है
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

एक्सटेंशन को VS Code वेब एक्सटेंशन के रूप में परीक्षण करने के लिए, `browserName: 'chrome'` सेट करें और `wdio:vscodeOptions` बनाए रखें। उस मोड में, `browserVersion` केवल `stable` या `insiders` हो सकता है। "VS Code Extension Testing" के साथ `npm create wdio@latest ./` आपके लिए यह सेटअप जनरेट करता है।

## अपना रास्ता चुनें

- [वेब एक्सटेंशन परीक्षण](/docs/extension-testing/web-extensions): Chrome (फ़ोल्डर या `.crx`) और Firefox ([`installAddOn`](/docs/api/gecko#installaddon) के ज़रिए `.xpi`) में एक्सटेंशन लोड करें, या [`installExtension`](/docs/api/browser/installExtension) के साथ सेशन के बीच में एक्सटेंशन इंस्टॉल करें और हटाएँ। Safari वेब एक्सटेंशन कवर नहीं किए गए हैं।
- [Firefox Profile Service](/docs/firefox-profile-service): एक्सटेंशन सहित Firefox प्रोफ़ाइल बनाएँ।
- [VS Code एक्सटेंशन परीक्षण](/docs/extension-testing/vscode-extensions): कॉन्फ़िगरेशन, TypeScript सेटअप, workbench page objects और `executeWorkbench`।
- [VS Code Service](/docs/wdio-vscode-service): सर्विस के सभी विकल्प, जैसे `cachePath`, और कस्टम page objects कैसे लिखें।
- [Obsidian Plugin Testing Service](/docs/wdio-obsidian-service): एक कम्युनिटी सर्विस जो Windows, macOS, Linux और Android पर विभिन्न Obsidian संस्करणों में Obsidian प्लगइन्स का परीक्षण करती है।
- [कस्टम कमांड](/docs/customcommands): पुन: उपयोग के लिए `openExtensionPopup` जैसे helpers को पैकेज करें।

वेब एक्सटेंशन परीक्षण एक सामान्य Chrome या Firefox सेशन में चलते हैं, इसलिए [वेब ब्राउज़र](/docs/platforms/web) पर दी गई हर बात लागू होती है, जिसमें selectors, network mocking और visual testing शामिल हैं।

## समस्या निवारण

- Firefox साइनिंग के कारण स्थानीय रूप से बिल्ड किए गए एक्सटेंशन को अस्वीकार करता है: इसे प्रोफ़ाइल के बजाय `before` hook में `browser.installAddOn(extension.toString('base64'), true)` के साथ इंस्टॉल करें। `.xpi` को `npx web-ext build` के साथ बिल्ड करें।
- Chrome के बजाय Edge, Brave या Opera का उपयोग कर रहे हैं: वही arguments आमतौर पर उस ब्राउज़र की options capability के साथ काम करते हैं, उदा. `ms:edgeOptions`।
- VS Code और Chromedriver बाइनरी एक cache डायरेक्टरी में डाउनलोड की जाती हैं। वे कहाँ संग्रहीत हों, इसे नियंत्रित करने के लिए, उदा. CI में उन्हें cache करने के लिए, `services: [['vscode', { cachePath: __dirname }]]` सेट करें।
- TypeScript को `getWorkbench` या `executeWorkbench` नहीं मिल रहा: `compilerOptions.types` में `wdio-vscode-service` जोड़ें।

## अगले कदम

- हर `wdio.conf.ts` विकल्प के लिए [कॉन्फ़िगरेशन](/docs/configuration) संदर्भ।
- Chromium पर बने पूर्ण डेस्कटॉप ऐप्स के परीक्षण के लिए [Electron](/docs/desktop-testing/electron)।
- अन्य प्लेटफ़ॉर्म: [वेब ब्राउज़र](/docs/platforms/web), [मोबाइल ऐप्स](/docs/platforms/mobile), [डेस्कटॉप ऐप्स](/docs/platforms/desktop)।