---
id: web-extensions
title: वेब एक्सटेंशन टेस्टिंग
description: "WebdriverIO सेशन के लिए Chrome या Firefox में वेब एक्सटेंशन लोड करें, जिसमें सेशन के बीच में BiDi के माध्यम से इंस्टॉल और अनइंस्टॉल करना भी शामिल है।"
---

WebdriverIO ब्राउज़र को ऑटोमेट करने के लिए एक आदर्श टूल है। वेब एक्सटेंशन ब्राउज़र का ही एक हिस्सा हैं और इन्हें भी उसी तरह ऑटोमेट किया जा सकता है। जब भी आपका वेब एक्सटेंशन वेबसाइटों पर JavaScript चलाने के लिए content scripts का उपयोग करता है या कोई popup modal प्रदान करता है, तो आप WebdriverIO का उपयोग करके उसके लिए e2e टेस्ट चला सकते हैं।

नीचे दिए गए capability सेटअप के साथ पहले नेविगेशन से पहले एक्सटेंशन लोड करें। किसी [WebDriver BiDi](https://w3c.github.io/webdriver-bidi/#module-webExtension) सेशन के बीच में एक्सटेंशन इंस्टॉल करने और हटाने के लिए, [`installExtension`](/docs/api/browser/installExtension) और [`uninstallExtension`](/docs/api/browser/uninstallExtension) का उपयोग करें।

## ब्राउज़र में वेब एक्सटेंशन लोड करना

पहले चरण के रूप में हमें टेस्ट किए जाने वाले एक्सटेंशन को अपने सेशन के हिस्से के रूप में ब्राउज़र में लोड करना होगा। यह Chrome और Firefox के लिए अलग-अलग तरीके से काम करता है।

:::info

ये डॉक्स Safari वेब एक्सटेंशन को शामिल नहीं करते क्योंकि इसके लिए उनका सपोर्ट काफी पीछे है और यूज़र की मांग भी अधिक नहीं है। Safari में WebDriver BiDi सेशन भी नहीं है, इसलिए [`installExtension`](/docs/api/browser/installExtension) Safari को कवर नहीं करता। यदि आप Safari के लिए वेब एक्सटेंशन बना रहे हैं, तो कृपया [एक issue दर्ज करें](https://github.com/webdriverio/webdriverio/issues/new?assignees=&labels=Docs+%F0%9F%93%96%2CNeeds+Triaging+%E2%8F%B3&template=documentation.yml&title=%5B%F0%9F%93%96+Docs%5D%3A+%3Ctitle%3E) और इसे यहाँ शामिल करने में सहयोग करें।

:::

### Chrome

Chrome में वेब एक्सटेंशन को `crx` फ़ाइल की `base64` एन्कोडेड स्ट्रिंग प्रदान करके या वेब एक्सटेंशन फ़ोल्डर का पाथ प्रदान करके लोड किया जा सकता है। सबसे आसान तरीका दूसरा वाला है, जिसमें आप अपनी Chrome capabilities को इस प्रकार परिभाषित करते हैं:

```js wdio.conf.js
import path from 'node:path'
import url from 'node:url'

const __dirname = url.fileURLToPath(new URL('.', import.meta.url))

export const config = {
    // ...
    capabilities: [{
        browserName,
        'goog:chromeOptions': {
            // मान लें कि आपकी wdio.conf.js रूट डायरेक्टरी में है और आपकी कंपाइल की गई
            // वेब एक्सटेंशन फ़ाइलें `./dist` फ़ोल्डर में स्थित हैं
            args: [`--load-extension=${path.join(__dirname, '..', '..', 'dist')}`]
        }
    }]
}
```

:::info

यदि आप Chrome के अलावा किसी अन्य ब्राउज़र को ऑटोमेट करते हैं, जैसे Brave, Edge या Opera, तो संभावना है कि ब्राउज़र विकल्प ऊपर दिए गए उदाहरण से मेल खाएँगे, बस एक अलग capability नाम का उपयोग होगा, जैसे `ms:edgeOptions`।

:::

यदि आप अपने एक्सटेंशन को उदाहरण के लिए [crx](https://www.npmjs.com/package/crx) NPM पैकेज का उपयोग करके `.crx` फ़ाइल के रूप में कंपाइल करते हैं, तो आप बंडल किए गए एक्सटेंशन को इस प्रकार भी इंजेक्ट कर सकते हैं:

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

एक्सटेंशन वाली Firefox प्रोफ़ाइल बनाने के लिए आप अपने सेशन को उसी के अनुसार सेट अप करने हेतु [Firefox Profile Service](/docs/firefox-profile-service) का उपयोग कर सकते हैं। हालाँकि, आपको ऐसी समस्याओं का सामना करना पड़ सकता है जहाँ आपका लोकल रूप से डेवलप किया गया एक्सटेंशन साइनिंग समस्याओं के कारण लोड नहीं हो पाता। ऐसी स्थिति में आप [`installAddOn`](/docs/api/gecko#installaddon) कमांड के माध्यम से `before` हुक में भी एक्सटेंशन लोड कर सकते हैं, जैसे:

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

`.xpi` फ़ाइल जनरेट करने के लिए, [`web-ext`](https://www.npmjs.com/package/web-ext) NPM पैकेज का उपयोग करने की सलाह दी जाती है। आप निम्नलिखित उदाहरण कमांड का उपयोग करके अपने एक्सटेंशन को बंडल कर सकते हैं:

```sh
npx web-ext build -s dist/ -a . -n web-extension-firefox.xpi
```

## सेशन के दौरान एक्सटेंशन इंस्टॉल करें

v10 से, [`browser.installExtension`](/docs/api/browser/installExtension) और [`browser.uninstallExtension`](/docs/api/browser/uninstallExtension) किसी WebDriver BiDi सेशन के बीच में वेब एक्सटेंशन इंस्टॉल करते हैं और उसकी id लौटाते हैं। इनका उपयोग तब करें जब एक्सटेंशन लॉन्च के समय मौजूद नहीं होना चाहिए, या जब एक ही टेस्ट उसे इंस्टॉल करता है, उसका परीक्षण करता है और उसे हटाता है।

ऊपर दिया गया capability सेटअप और `installAddOn` पहले नेविगेशन से पहले एक्सटेंशन लोड करने का तरीका बने रहते हैं। `installExtension` उनकी जगह नहीं लेता। जब आप [spec payload](https://w3c.github.io/webdriver-bidi/#command-webExtension-install) स्वयं भेजना चाहते हैं, तब के लिए `browser.webExtensionInstall` और `browser.webExtensionUninstall` उपलब्ध रहते हैं।

```ts title="test/specs/extension.e2e.ts"
import path from 'node:path'
import url from 'node:url'
import { browser, expect } from '@wdio/globals'

const extensionPath = path.resolve(
    path.dirname(url.fileURLToPath(import.meta.url)),
    '../../dist'
)

describe('web extension', () => {
    it('installs and removes the extension', async () => {
        const extensionId = await browser.installExtension(extensionPath)
        expect(extensionId).not.toEqual('')

        await browser.url('https://webdriver.io')
        await browser.uninstallExtension(extensionId)
    })
})
```

`installExtension` तीन प्रकार के इनपुट स्वीकार करता है:

| इनपुट | ब्राउज़र को भेजा गया payload |
| --- | --- |
| एक डायरेक्टरी पाथ | `path.resolve` के बाद `{ type: 'path', path }`। ब्राउज़र को उस डायरेक्टरी को पढ़ने में सक्षम होना चाहिए। |
| एक `.zip`, `.xpi`, या `.crx` पाथ | `path.resolve` के बाद `{ type: 'archivePath', path }`। |
| `{ base64: string }` | `{ type: 'base64', value }`। आर्काइव bytes। कोई भी अन्य ऑब्जेक्ट अस्वीकार कर दिया जाता है। |

स्ट्रिंग पाथ हमेशा टेस्ट रनर पर resolve किया जाता है। रिमोट सेशन पर — यानी `localhost`, `127.0.0.1`, या `::1` के अलावा कोई hostname, या क्लाउड `user` और `key` — वह पाथ ब्राउज़र मशीन पर मौजूद पाथ नहीं होता। कमांड आर्काइव को पढ़ती है, या डायरेक्टरी को मेमोरी में zip करती है, और `base64` भेजती है। आपको लोकल बनाम रिमोट के लिए स्वयं अलग-अलग लॉजिक लिखने की ज़रूरत नहीं है। लोकल सेशन `path` या `archivePath` भेजते हैं और bytes नहीं पढ़ते।

डायरेक्टरी को एक्सटेंशन रूट पर पॉइंट करें, यानी वह फ़ोल्डर जिसमें `manifest.json` मौजूद है।

सेशन को WebDriver BiDi सपोर्ट करना चाहिए। एक classic सेशन `installExtension requires a WebDriver BiDi session (webExtension.install)` एरर थ्रो करता है। जो ब्राउज़र BiDi को लागू करता है लेकिन इस मॉड्यूल को नहीं, उसमें कमांड `unsupported operation` (या मॉड्यूल अनुपस्थित होने पर `unknown command`) के साथ विफल होती है। खराब आर्काइव `invalid web extension` के साथ विफल होता है। किसी ऐसी id को अनइंस्टॉल करना जिसे ब्राउज़र नहीं जानता, `no such web extension` के साथ विफल होता है।

`uninstallExtension` वह id स्ट्रिंग लेता है जो `installExtension` ने लौटाई थी।

### Chromium

Chrome और Edge `webExtension.install` को लागू करते हैं, लेकिन इसे तब तक बंद रखते हैं जब तक आप ब्राउज़र को `--enable-unsafe-extension-debugging` और `--remote-debugging-pipe` के साथ शुरू नहीं करते। Chrome 136 और उससे नए वर्ज़न में, जब भी `--remote-debugging-pipe` सेट हो, `--user-data-dir` भी आवश्यक है। इन arguments के बिना कमांड `unknown error - Method not available` के साथ विफल होती है।

`--remote-debugging-pipe` ड्राइवर और ब्राउज़र के बीच का pipe है। BiDi सेशन अभी भी `webSocketUrl` का उपयोग करता है।

```ts title="wdio.conf.ts"
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'

const userDataDir = fs.mkdtempSync(path.join(os.tmpdir(), 'wdio-chrome-'))

export const config: WebdriverIO.Config = {
    // ...
    capabilities: [{
        browserName: 'chrome',
        'goog:chromeOptions': {
            args: [
                '--enable-unsafe-extension-debugging',
                '--remote-debugging-pipe',
                `--user-data-dir=${userDataDir}`
            ]
        }
    }]
}
```

Edge के लिए `ms:edgeOptions` का उपयोग करें। Firefox एक सामान्य BiDi सेशन में एक्सटेंशन लोड करता है और उसे इन arguments की आवश्यकता नहीं होती।

## टिप्स और ट्रिक्स

निम्नलिखित सेक्शन में कुछ उपयोगी टिप्स और ट्रिक्स दिए गए हैं जो वेब एक्सटेंशन की टेस्टिंग करते समय सहायक हो सकते हैं।

### Chrome में Popup Modal टेस्ट करें

यदि आप अपने [एक्सटेंशन manifest](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/manifest.json/browser_action) में `default_popup` browser action एंट्री परिभाषित करते हैं, तो आप उस HTML पेज को सीधे टेस्ट कर सकते हैं, क्योंकि ब्राउज़र के टॉप बार में एक्सटेंशन आइकन पर क्लिक करना काम नहीं करेगा। इसके बजाय, आपको popup html फ़ाइल को सीधे खोलना होगा।

Chrome में यह एक्सटेंशन ID प्राप्त करके और `browser.url('...')` के माध्यम से popup पेज खोलकर काम करता है। उस पेज पर व्यवहार वैसा ही होगा जैसा popup के भीतर होता है। ऐसा करने के लिए हम निम्नलिखित कस्टम कमांड लिखने की सलाह देते हैं:

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

अपनी `wdio.conf.js` में आप इस फ़ाइल को इम्पोर्ट कर सकते हैं और अपने `before` हुक में कस्टम कमांड रजिस्टर कर सकते हैं, जैसे:

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

अब, अपने टेस्ट में, आप popup पेज को इस प्रकार एक्सेस कर सकते हैं:

```ts
await browser.openExtensionPopup('My Web Extension')
```