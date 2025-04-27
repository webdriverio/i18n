---
id: web-extensions
title: वेब एक्सटेंशन टेस्टिंग
---

WebdriverIO ब्राउज़र को स्वचालित करने के लिए एक आदर्श टूल है। वेब एक्सटेंशन ब्राउज़र का एक हिस्सा हैं और उसी तरह से स्वचालित किए जा सकते हैं। जब भी आपका वेब एक्सटेंशन वेबसाइटों पर JavaScript चलाने के लिए कंटेंट स्क्रिप्ट का उपयोग करता है या एक पॉपअप मॉडल प्रदान करता है, तो आप WebdriverIO का उपयोग करके उसके लिए e2e टेस्ट चला सकते हैं।

## ब्राउज़र में वेब एक्सटेंशन लोड करना

पहले कदम के रूप में हमें अपने सत्र के हिस्से के रूप में ब्राउज़र में परीक्षण के तहत एक्सटेंशन लोड करना होगा। यह Chrome और Firefox के लिए अलग-अलग तरीके से काम करता है।

:::info

ये दस्तावेज़ Safari वेब एक्सटेंशन को छोड़ देते हैं क्योंकि उनका समर्थन बहुत पीछे है और उपयोगकर्ता मांग ज्यादा नहीं है। यदि आप Safari के लिए वेब एक्सटेंशन बना रहे हैं, तो कृपया [मुद्दा उठाएं](https://github.com/webdriverio/webdriverio/issues/new?assignees=&labels=Docs+%F0%9F%93%96%2CNeeds+Triaging+%E2%8F%B3&template=documentation.yml&title=%5B%F0%9F%93%96+Docs%5D%3A+%3Ctitle%3E) और इसे यहां भी शामिल करने के लिए सहयोग करें।

:::

### Chrome

Chrome में वेब एक्सटेंशन लोड करना `crx` फ़ाइल की `base64` एन्कोडेड स्ट्रिंग प्रदान करके या वेब एक्सटेंशन फ़ोल्डर का पथ प्रदान करके किया जा सकता है। सबसे आसान तरीका है अपनी Chrome क्षमताओं को निम्नानुसार परिभाषित करके बाद वाला करना:

```js wdio.conf.js
import path from 'node:path'
import url from 'node:url'

const __dirname = url.fileURLToPath(new URL('.', import.meta.url))

export const config = {
    // ...
    capabilities: [{
        browserName,
        'goog:chromeOptions': {
            // given your wdio.conf.js is in the root directory and your compiled
            // web extension files are located in the `./dist` folder
            args: [`--load-extension=${path.join(__dirname, '..', '..', 'dist')}`]
        }
    }]
}
```

:::info

यदि आप Chrome के अलावा किसी अन्य ब्राउज़र को स्वचालित कर रहे हैं, जैसे Brave, Edge या Opera, तो संभावना है कि ब्राउज़र विकल्प ऊपर दिए गए उदाहरण से मेल खाते हैं, बस अलग क्षमता नाम का उपयोग करते हैं, जैसे `ms:edgeOptions`।

:::

यदि आप अपने एक्सटेंशन को `.crx` फ़ाइल के रूप में कंपाइल करते हैं, उदाहरण के लिए [crx](https://www.npmjs.com/package/crx) NPM पैकेज का उपयोग करके, तो आप बंडल किए गए एक्सटेंशन को भी इस तरह इंजेक्ट कर सकते हैं:

```js wdio.conf.js
import path from 'node:path'
import url from 'node:url'

const __dirname = url.fileURLToPath(new URL('.', import.meta.url))
const extPath = path.join(__dirname, `web-extension-chrome.crx`)
const chromeExtension = (await fs.readFile(extPath)).toString('base64')

export const config = {
    // ...
    capabilities: [{
        browserName,
        'goog:chromeOptions': {
            extensions: [chromeExtension]
        }
    }]
}
```

### Firefox

एक्सटेंशन शामिल करने वाले Firefox प्रोफ़ाइल बनाने के लिए आप अपने सत्र को तदनुसार सेट करने के लिए [Firefox Profile Service](/docs/firefox-profile-service) का उपयोग कर सकते हैं। हालांकि, आप ऐसी समस्याओं का सामना कर सकते हैं जहां साइनिंग समस्याओं के कारण आपका स्थानीय रूप से विकसित एक्सटेंशन लोड नहीं किया जा सकता है। इस स्थिति में आप `before` हुक में [`installAddOn`](/docs/api/gecko#installaddon) कमांड के माध्यम से भी एक्सटेंशन लोड कर सकते हैं, उदाहरण के लिए:

```js wdio.conf.js
import path from 'node:path'
import url from 'node:url'

const __dirname = url.fileURLToPath(new URL('.', import.meta.url))
const extensionPath = path.resolve(__dirname, `web-extension.xpi`)

export const config = {
    // ...
    before: async (capabilities) => {
        const browserName = (capabilities as WebdriverIO.Capabilities).browserName
        if (browserName === 'firefox') {
            const extension = await fs.readFile(extensionPath)
            await browser.installAddOn(extension.toString('base64'), true)
        }
    }
}
```

`.xpi` फ़ाइल बनाने के लिए, [`web-ext`](https://www.npmjs.com/package/web-ext) NPM पैकेज का उपयोग करने की सिफारिश की जाती है। आप निम्न उदाहरण कमांड का उपयोग करके अपने एक्सटेंशन को बंडल कर सकते हैं:

```sh
npx web-ext build -s dist/ -a . -n web-extension-firefox.xpi
```

## टिप्स और ट्रिक्स

निम्नलिखित खंड में उपयोगी टिप्स और ट्रिक्स का एक सेट है जो वेब एक्सटेंशन का परीक्षण करते समय मददगार हो सकता है।

### Chrome में पॉपअप मॉडल का परीक्षण करें

यदि आप अपने [एक्सटेंशन मैनिफेस्ट](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/manifest.json/browser_action) में `default_popup` ब्राउज़र एक्शन एंट्री परिभाषित करते हैं, तो आप उस HTML पेज का सीधे परीक्षण कर सकते हैं, क्योंकि ब्राउज़र के शीर्ष बार में एक्सटेंशन आइकन पर क्लिक करना काम नहीं करेगा। इसके बजाय, आपको पॉपअप HTML फ़ाइल को सीधे खोलना होगा।

Chrome में यह एक्सटेंशन ID प्राप्त करके और `browser.url('...')` के माध्यम से पॉपअप पेज खोलकर काम करता है। उस पेज पर व्यवहार पॉपअप के अंदर जैसा होगा। ऐसा करने के लिए हम निम्नलिखित कस्टम कमांड लिखने की अनुशंसा करते हैं:

```ts customCommand.ts
export async function openExtensionPopup (this: WebdriverIO.Browser, extensionName: string, popupUrl = 'index.html') {
  if ((this.capabilities as WebdriverIO.Capabilities).browserName !== 'chrome') {
    throw new Error('This command only works with Chrome')
  }
  await this.url('chrome://extensions/')

  const extensions = await this.$$('extensions-item')
  const extension = await extensions.find(async (ext) => (
    await ext.$('#name').getText()) === extensionName
  )

  if (!extension) {
    const installedExtensions = await extensions.map((ext) => ext.$('#name').getText())
    throw new Error(`Couldn't find extension "${extensionName}", available installed extensions are "${installedExtensions.join('", "')}"`)
  }

  const extId = await extension.getAttribute('id')
  await this.url(`chrome-extension://${extId}/popup/${popupUrl}`)
}

declare global {
  namespace WebdriverIO {
      interface Browser {
        openExtensionPopup: typeof openExtensionPopup
      }
  }
}
```

अपने `wdio.conf.js` में आप इस फ़ाइल को इम्पोर्ट कर सकते हैं और अपने `before` हुक में कस्टम कमांड रजिस्टर कर सकते हैं, उदाहरण के लिए:

```ts wdio.conf.ts
import { browser } from '@wdio/globals'

import { openExtensionPopup } from './support/customCommands'

export const config: WebdriverIO.Config = {
  // ...
  before: () => {
    browser.addCommand('openExtensionPopup', openExtensionPopup)
  }
}
```

अब, अपने टेस्ट में, आप पॉपअप पेज तक इस प्रकार पहुंच सकते हैं:

```ts
await browser.openExtensionPopup('My Web Extension')
```