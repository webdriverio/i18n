---
id: web-extensions
title: வலை நீட்டிப்பு சோதனை
---

WebdriverIO என்பது உலாவியை தானியக்கமாக்க சிறந்த கருவியாகும். வலை நீட்டிப்புகள் உலாவியின் ஒரு பகுதியாகும் மற்றும் அதே முறையில் தானியக்கமாக்கப்படலாம். உங்கள் வலை நீட்டிப்பு வலைத்தளங்களில் JavaScript ஐ இயக்க உள்ளடக்க ஸ்கிரிப்ட்களைப் பயன்படுத்தினாலோ அல்லது பாப்அப் மோடல் வழங்கினாலோ, நீங்கள் WebdriverIO ஐப் பயன்படுத்தி அதற்கான e2e சோதனை இயக்கலாம்.

## உலாவியில் வலை நீட்டிப்பை ஏற்றுதல்

முதல் படியாக, நம் அமர்வின் ஒரு பகுதியாக சோதனையின் கீழ் உள்ள நீட்டிப்பை உலாவியில் ஏற்ற வேண்டும். இது Chrome மற்றும் Firefox இல் வெவ்வேறு முறையில் செயல்படுகிறது.

:::info

இந்த ஆவணங்கள் Safari வலை நீட்டிப்புகளை விட்டுவிடுகின்றன, ஏனெனில் அவற்றின் ஆதரவு மிகவும் பின்தங்கியுள்ளது மற்றும் பயனர் தேவை அதிகமாக இல்லை. நீங்கள் Safari க்கான வலை நீட்டிப்பை உருவாக்கினால், தயவுசெய்து [பிரச்சினையை எழுப்பவும்](https://github.com/webdriverio/webdriverio/issues/new?assignees=&labels=Docs+%F0%9F%93%96%2CNeeds+Triaging+%E2%8F%B3&template=documentation.yml&title=%5B%F0%9F%93%96+Docs%5D%3A+%3Ctitle%3E) மற்றும் இங்கேயும் சேர்க்க ஒத்துழைக்கவும்.

:::

### Chrome

Chrome இல் வலை நீட்டிப்பை ஏற்றுவது `crx` கோப்பின் `base64` குறியாக்கப்பட்ட சரம் அல்லது வலை நீட்டிப்பு கோப்புறையின் பாதை வழங்குவதன் மூலம் செய்யப்படலாம். பின்வருமாறு உங்கள் Chrome திறன்களை வரையறுப்பதன் மூலம் பின்னரை செய்வது மிகவும் எளிதானது:

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

நீங்கள் Chrome அல்லாத வேறு உலாவியை தானியக்கமாக்கினால், எ.கா. Brave, Edge அல்லது Opera, உலாவி விருப்பம் மேலே உள்ள உதாரணத்துடன் பொருந்தக்கூடும், ஆனால் வெவ்வேறு திறன் பெயரைப் பயன்படுத்தவும், எ.கா. `ms:edgeOptions`.

:::

நீங்கள் உங்கள் நீட்டிப்பை `.crx` கோப்பாக தொகுத்தால், எ.கா. [crx](https://www.npmjs.com/package/crx) NPM பேக்கேஜ் பயன்படுத்தி, நீங்கள் கட்டப்பட்ட நீட்டிப்பை பின்வருமாறு செலுத்தலாம்:

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

நீட்டிப்புகள் உள்ளடக்கிய Firefox சுயவிவரத்தை உருவாக்க, உங்கள் அமர்வை முறையாக அமைக்க [Firefox Profile Service](/docs/firefox-profile-service) ஐப் பயன்படுத்தலாம். இருப்பினும், கையொப்பமிடுதல் சிக்கல்கள் காரணமாக உங்கள் உள்ளூரில் உருவாக்கப்பட்ட நீட்டிப்பு ஏற்றப்பட முடியாத சிக்கல்களை நீங்கள் சந்திக்கலாம். இந்த நிலையில் நீங்கள் [`installAddOn`](/docs/api/gecko#installaddon) கட்டளை மூலம் `before` ஹூக்கில் ஒரு நீட்டிப்பை ஏற்றலாம்:

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

ஒரு `.xpi` கோப்பை உருவாக்க, [`web-ext`](https://www.npmjs.com/package/web-ext) NPM பேக்கேஜைப் பயன்படுத்த பரிந்துரைக்கப்படுகிறது. பின்வரும் உதாரண கட்டளையைப் பயன்படுத்தி உங்கள் நீட்டிப்பை கட்டலாம்:

```sh
npx web-ext build -s dist/ -a . -n web-extension-firefox.xpi
```

## குறிப்புகள் & தந்திரங்கள்

பின்வரும் பிரிவு வலை நீட்டிப்பை சோதிக்கும்போது பயனுள்ளதாக இருக்கும் பயனுள்ள குறிப்புகள் மற்றும் தந்திரங்களை கொண்டுள்ளது.

### Chrome இல் பாப்அப் மோடலை சோதித்தல்

உங்கள் [நீட்டிப்பு மேனிஃபெஸ்ட்டில்](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/manifest.json/browser_action) `default_popup` உலாவி செயல் உள்ளீட்டை வரையறுத்தால், நீங்கள் அந்த HTML பக்கத்தை நேரடியாக சோதிக்கலாம், ஏனெனில் உலாவியின் மேல் பட்டியில் உள்ள நீட்டிப்பு ஐகானைக் கிளிக் செய்வது வேலை செய்யாது. அதற்கு பதிலாக, பாப்அப் html கோப்பை நேரடியாகத் திறக்க வேண்டும்.

Chrome இல் இது நீட்டிப்பு ID ஐப் பெற்று `browser.url('...')` மூலம் பாப்அப் பக்கத்தைத் திறப்பதன் மூலம் செயல்படுகிறது. அந்த பக்கத்தில் உள்ள நடத்தை பாப்அப் உள்ளே உள்ளதைப் போலவே இருக்கும். இதைச் செய்ய பின்வரும் தனிப்பயன் கட்டளையை எழுத பரிந்துரைக்கிறோம்:

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

உங்கள் `wdio.conf.js` இல் நீங்கள் இந்த கோப்பை இறக்குமதி செய்து, உங்கள் `before` ஹூக்கில் தனிப்பயன் கட்டளையை பதிவு செய்யலாம், எ.கா:

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

இப்போது, உங்கள் சோதனையில், நீங்கள் பாப்அப் பக்கத்தை பின்வருமாறு அணுகலாம்:

```ts
await browser.openExtensionPopup('My Web Extension')
```