---
id: getting-started
title: शुरुआत करें
description: "WebdriverIO DevTools इंस्टॉल करें और DOM, स्क्रीनशॉट, नेटवर्क और कंसोल आउटपुट को रीप्ले करने के लिए अपना पहला टेस्ट लाइव मोड या ट्रेस मोड में चलाएं।"
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

WebdriverIO DevTools आपके end-to-end ब्राउज़र टेस्ट को ऑटोमेशन चलाने, डीबग करने और जांचने के लिए एक developer-tools UI देता है — DOM रीप्ले, प्रति-कमांड स्क्रीनशॉट, नेटवर्क और कंसोल कैप्चर, और सेशन स्क्रीनकास्ट। यह दो मोड में चलता है। **लाइव मोड** आपके टेस्ट चलने के दौरान एक ब्राउज़र विंडो में इंटरैक्टिव [डैशबोर्ड](/docs/devtools/dashboard) खोलता है, ताकि आप उन्हें रियल टाइम में देख सकें और दोबारा चला सकें। **ट्रेस मोड** UI को छोड़ देता है और एक पोर्टेबल, ऑफ़लाइन [ट्रेस आर्टिफैक्ट](/docs/devtools/wdio/trace-mode) (`trace.zip`) लिखता है जिसे आप बाद में `show-trace` प्लेयर में खोल सकते हैं — CI के लिए आदर्श। यह पेज आपको जल्दी से लाइव मोड में ले जाता है; ट्रेस मोड बस एक विकल्प की दूरी पर है।

## इंस्टॉल और पहला रन

अपना एडैप्टर चुनें, उसे इंस्टॉल करें, और नीचे दी गई न्यूनतम वायरिंग जोड़ें। अपने टेस्ट हमेशा की तरह चलाएं — DevTools डैशबोर्ड अपने आप एक नई ब्राउज़र विंडो में खुल जाता है।

<Tabs
defaultValue="wdio"
values={[
{label: 'WebdriverIO', value: 'wdio'},
{label: 'Selenium', value: 'selenium'},
{label: 'Nightwatch', value: 'nightwatch'},
{label: 'Python', value: 'python'},
]}
>
<TabItem value="wdio">

सर्विस इंस्टॉल करें:

```sh
npm install @wdio/devtools-service --save-dev
```

इसे अपने test-runner कॉन्फ़िग में जोड़ें:

```ts
// wdio.conf.ts
export const config = {
  services: ['devtools'],
}
```

अपने WebdriverIO टेस्ट सामान्य रूप से चलाएं — DevTools UI अपने आप खुल जाता है और टेस्ट तुरंत विज़ुअलाइज़ होने लगते हैं।

</TabItem>
<TabItem value="selenium">

Mocha, Jest, Cucumber, या एक साधारण `node` स्क्रिप्ट के साथ काम करता है — प्लगइन रनर को अपने आप पहचान लेता है। इसे इंस्टॉल करें:

```bash
npm install @wdio/selenium-devtools
```

अपनी टेस्ट फ़ाइल के शीर्ष पर एक import और एक `configure` कॉल जोड़ें (Mocha दिखाया गया है):

```js
// tests/example.test.js
import { Builder, By, until } from 'selenium-webdriver'
import { DevTools } from '@wdio/selenium-devtools'

DevTools.configure({
  screencast: { enabled: true, quality: 70, maxWidth: 1280, maxHeight: 720 }
})

describe('smoke test', function () {
  let driver

  before(async function () {
    driver = await new Builder().forBrowser('chrome').build()
  })

  after(async function () {
    if (driver) {
      await driver.quit()
    }
  })

  it('loads example.com', async function () {
    await driver.get('https://example.com')
    await driver.wait(until.elementLocated(By.css('h1')), 10000)
  })
})
```

इसे चलाएं — DevTools UI एक नई Chrome विंडो में खुल जाता है:

```bash
mocha --timeout 60000 tests/example.test.js
```

Jest, Cucumber, और साधारण Node सेटअप के लिए [Selenium पेज](/docs/devtools/selenium) देखें।

</TabItem>
<TabItem value="nightwatch">

एडैप्टर इंस्टॉल करें:

```bash
npm install @wdio/nightwatch-devtools
```

इसे `globals` के ज़रिए अपने Nightwatch कॉन्फ़िग में जोड़ें — टेस्ट फ़ाइलों में किसी बदलाव की ज़रूरत नहीं:

```js
// nightwatch.conf.cjs
const nightwatchDevtools = require('@wdio/nightwatch-devtools').default

module.exports = {
  src_folders: ['tests'],

  test_settings: {
    default: {
      desiredCapabilities: {
        browserName: 'chrome',
        // नेटवर्क रिक्वेस्ट कैप्चर के लिए आवश्यक
        'goog:loggingPrefs': { performance: 'ALL' }
      },
      globals: nightwatchDevtools({ port: 3000 })
    }
  }
}
```

अपने टेस्ट सामान्य रूप से चलाएं — DevTools UI अपने आप खुल जाता है:

```bash
nightwatch
```

Cucumber/BDD सेटअप के लिए [Nightwatch पेज](/docs/devtools/nightwatch) देखें।

</TabItem>
<TabItem value="python">

Python 3.10+, `selenium>=4.44`, और `PATH` पर Node.js 22.19+ की आवश्यकता है (डैशबोर्ड बैकएंड एक Node एप्लिकेशन है)। एडैप्टर इंस्टॉल करें, फिर एक बार बैकएंड इंस्टॉल करें:

```bash
pip install selenium-devtools-py
selenium-devtools install-backend
```

pytest के तहत आपकी टेस्ट फ़ाइलों में कुछ भी नहीं जोड़ना पड़ता। एक फ़्लैग के साथ कैप्चर चालू करें:

```bash
pytest --devtools tests/          # लाइव डैशबोर्ड
pytest --devtools-trace tests/    # इसके बजाय एक ट्रेस आर्काइव लिखें
```

साधारण स्क्रिप्ट, ini विकल्पों और एनवायरनमेंट वेरिएबल्स के लिए [Selenium पेज](/docs/devtools/selenium) पर Python टैब देखें।

</TabItem>
</Tabs>

## अगले कदम

- **[ट्रेस मोड](/docs/devtools/wdio/trace-mode)** — UI को छोड़ने और CI के लिए एक पोर्टेबल, ऑफ़लाइन ट्रेस आर्टिफैक्ट बनाने के लिए `mode: 'trace'` सेट करें।
- **[कॉन्फ़िगरेशन संदर्भ](/docs/devtools/reference)**: सभी एडैप्टर्स के हर विकल्प।
- **[मोबाइल टेस्टिंग](/docs/devtools/mobile)**: Appium सेशन कैप्चर करें।
- **फ़्रेमवर्क** — प्रति-एडैप्टर पूर्ण गाइड: [WebdriverIO](/docs/devtools/wdio), [Selenium](/docs/devtools/selenium), [Nightwatch](/docs/devtools/nightwatch)।