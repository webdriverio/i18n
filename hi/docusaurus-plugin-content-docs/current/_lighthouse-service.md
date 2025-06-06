---
id: lighthouse-service
title: लाइटहाउस सर्विस
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-lighthouse-service/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> एक WebdriverIO सर्विस जो आपको [Google Lighthouse](https://developer.chrome.com/docs/lighthouse/overview) के साथ एक्सेसिबिलिटी और परफॉरमेंस टेस्ट चलाने की अनुमति देती है।

**नोट:** यह सर्विस वर्तमान में केवल Google Chrome या Chromium पर चलने वाले टेस्ट का समर्थन करती है! क्योंकि अधिकांश क्लाउड वेंडर Chrome DevTools प्रोटोकॉल तक पहुंच को एक्सपोज़ नहीं करते हैं, यह सर्विस आमतौर पर केवल तब काम करती है जब टेस्ट स्थानीय रूप से या [Selenium Grid](https://www.selenium.dev/documentation/grid/) v4 या उच्चतर के माध्यम से चलाए जाते हैं।

## इंस्टालेशन

सबसे आसान तरीका है `@wdio/lighthouse-service` को अपने `package.json` में एक dev dependency के रूप में रखना, इसके माध्यम से:

```sh
npm install @wdio/lighthouse-service --save-dev
```

`WebdriverIO` को कैसे इंस्टॉल करें, इस पर निर्देश [यहां](https://webdriver.io/docs/gettingstarted) मिल सकते हैं।

## कॉन्फिगरेशन

सर्विस का उपयोग करने के लिए आपको बस अपने `wdio.conf.js` में अपनी सर्विस लिस्ट में सर्विस को जोड़ना होगा, जैसे:

```js
// wdio.conf.js
export const config = {
    // ...
    services: ['lighthouse'],
    // ...
};
```

## उपयोग

`@wdio/lighthouse-service` आपको WebdriverIO के माध्यम से Google Lighthouse एक्सेसिबिलिटी और परफॉरमेंस टेस्ट चलाने की अनुमति देती है।

### परफॉरमेंस टेस्टिंग

Lighthouse सर्विस आपको हर पेज लोड या क्लिक के कारण होने वाले पेज ट्रांजिशन से परफॉरमेंस डेटा कैप्चर करने की अनुमति देती है। इसे सक्षम करने के लिए `browser.enablePerformanceAudits(<options>)` कॉल करें। सभी आवश्यक परफॉरमेंस डेटा कैप्चर करने के बाद थ्रॉटलिंग सेटिंग्स को रिवर्ट करने के लिए इसे अक्षम करें, उदाहरण के लिए:

```js
import assert from 'node:assert'

describe('JSON.org page', () => {
    before(async () => {
        await browser.enablePerformanceAudits()
    })

    it('should load within performance budget', async () => {
        /**
         * this page load will take a bit longer as the DevTools service will
         * capture all metrics in the background
         */
        await browser.url('http://json.org')

        let metrics = await browser.getMetrics()
        assert.ok(metrics.speedIndex < 1500) // check that speedIndex is below 1.5ms

        let score = await browser.getPerformanceScore() // get Lighthouse Performance score
        assert.ok(score >= .99) // Lighthouse Performance score is at 99% or higher

        $('=Esperanto').click()

        metrics = await browser.getMetrics()
        assert.ok(metrics.speedIndex < 1500)
        score = await browser.getPerformanceScore()
        assert.ok(score >= .99)
    })

    after(async () => {
        await browser.disablePerformanceAudits()
    })
})
```

निम्नलिखित कमांड अपने परिणामों के साथ उपलब्ध हैं:

#### `getMetrics`

सबसे अधिक इस्तेमाल किए जाने वाले परफॉरमेंस मेट्रिक्स प्राप्त करता है, उदाहरण के लिए:

```js
console.log(await browser.getMetrics())
/**
 * { timeToFirstByte: 566,
 *   serverResponseTime: 566,
 *   domContentLoaded: 3397,
 *   firstVisualChange: 2610,
 *   firstPaint: 2822,
 *   firstContentfulPaint: 2822,
 *   firstMeaningfulPaint: 2822,
 *   largestContentfulPaint: 2822,
 *   lastVisualChange: 15572,
 *   interactive: 6135,
 *   load: 8429,
 *   speedIndex: 3259,
 *   totalBlockingTime: 31,
 *   maxPotentialFID: 161,
 *   cumulativeLayoutShift: 2822 }
 */
```

#### `getDiagnostics`

पेज लोड के बारे में कुछ उपयोगी डायग्नोस्टिक्स प्राप्त करें।

```js
console.log(await browser.getDiagnostics())
/**
 * { numRequests: 8,
 *   numScripts: 0,
 *   numStylesheets: 0,
 *   numFonts: 0,
 *   numTasks: 237,
 *   numTasksOver10ms: 5,
 *   numTasksOver25ms: 2,
 *   numTasksOver50ms: 2,
 *   numTasksOver100ms: 0,
 *   numTasksOver500ms: 0,
 *   rtt: 147.20600000000002,
 *   throughput: 47729.68474448835,
 *   maxRtt: 176.085,
 *   maxServerLatency: 1016.813,
 *   totalByteWeight: 62929,
 *   totalTaskTime: 254.07899999999978,
 *   mainDocumentTransferSize: 8023 }
 */
```

#### getMainThreadWorkBreakdown

सभी मेन थ्रेड टास्क और उनकी कुल अवधि के ब्रेकडाउन के साथ एक सूची देता है।

```js
console.log(await browser.getMainThreadWorkBreakdown())
/**
 * [ { group: 'styleLayout', duration: 130.59099999999998 },
 *   { group: 'other', duration: 44.819 },
 *   { group: 'paintCompositeRender', duration: 13.732000000000005 },
 *   { group: 'parseHTML', duration: 3.9080000000000004 },
 *   { group: 'scriptEvaluation', duration: 2.437999999999999 },
 *   { group: 'scriptParseCompile', duration: 0.20800000000000002 } ]
 */
```

#### getPerformanceScore

[Lighthouse Performance Score](https://developers.google.com/web/tools/lighthouse/scoring) देता है जो निम्नलिखित मेट्रिक्स का भारित माध्य है: `firstContentfulPaint`, `speedIndex`, `largestContentfulPaint`, `cumulativeLayoutShift`, `totalBlockingTime`, `interactive`, `maxPotentialFID` या `cumulativeLayoutShift`।

```js
console.log(await browser.getPerformanceScore())
/**
 * 0.897826278457836
 */
```

#### enablePerformanceAudits

सभी पेज लोड के लिए ऑटो परफॉरमेंस ऑडिट को सक्षम करता है जो `url` कमांड को कॉल करने या किसी लिंक पर क्लिक करने या किसी भी चीज़ के कारण होता है जो पेज लोड का कारण बनता है। आप कुछ थ्रॉटलिंग विकल्पों को निर्धारित करने के लिए एक कॉन्फिग ऑब्जेक्ट पास कर सकते हैं। डिफ़ॉल्ट थ्रॉटलिंग प्रोफाइल 4x CPU थ्रॉटलिंग के साथ `Good 3G` नेटवर्क है।

```js
await browser.enablePerformanceAudits({
    networkThrottling: 'Good 3G',
    cpuThrottling: 4,
    cacheEnabled: true,
    formFactor: 'mobile'
})
```

निम्नलिखित नेटवर्क थ्रॉटलिंग प्रोफाइल उपलब्ध हैं: `offline`, `GPRS`, `Regular 2G`, `Good 2G`, `Regular 3G`, `Good 3G`, `Regular 4G`, `DSL`, `Wifi` और `online` (कोई थ्रॉटलिंग नहीं)।

### PWA टेस्टिंग

`checkPWA` कमांड के साथ, आप सत्यापित कर सकते हैं कि क्या आपका वेब ऐप प्रोग्रेसिव वेब ऐप्स के लिए नवीनतम वेब मानकों के अनुरूप है। यह जांचता है:

- क्या आपका ऐप इंस्टॉल करने योग्य है
- एक सर्विस वर्कर प्रदान करता है
- एक स्प्लैश स्क्रीन है
- Apple Touch और Maskable आइकन प्रदान करता है
- मोबाइल डिवाइस पर सर्व किया जा सकता है

यदि आप इनमें से किसी भी चेक में रुचि नहीं रखते हैं, तो आप उन चेक की सूची पास कर सकते हैं जिन्हें आप चलाना चाहते हैं। यदि सभी चेक पास होते हैं तो `passed` प्रॉपर्टी `true` देगी। यदि वे विफल होते हैं तो आप विफलता के विवरण के साथ अपने विफलता संदेश को समृद्ध करने के लिए `details` प्रॉपर्टी का उपयोग कर सकते हैं।

```js
// open page first
await browser.url('https://webdriver.io')
// validate PWA
const result = await browser.checkPWA()
expect(result.passed).toBe(true)
```

### `startTracing(categories, samplingFrequency)` कमांड

ब्राउज़र को ट्रेस करना शुरू करें। आप वैकल्पिक रूप से कस्टम ट्रेसिंग कैटेगरी (डिफ़ॉल्ट रूप से [इस सूची](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-lighthouse-service/src/constants.ts#L12-L56)) और सैंपलिंग फ्रीक्वेंसी (डिफ़ॉल्ट रूप से `10000`) पास कर सकते हैं।

```js
await browser.startTracing()
```

### `endTracing` कमांड

ब्राउज़र को ट्रेस करना बंद करें।

```js
await browser.endTracing()
```

### `getTraceLogs` कमांड

ट्रेसिंग अवधि के भीतर कैप्चर किए गए ट्रेस-लॉग देता है। आप Chrome DevTools इंटरफेस के माध्यम से ट्रेस का विश्लेषण करने के लिए फाइल सिस्टम पर ट्रेस लॉग स्टोर करने के लिए इस कमांड का उपयोग कर सकते हैं।

```js
import fs from 'node:fs/promises'

await browser.startTracing()
await browser.url('http://json.org')
await browser.endTracing()

await fs.writeFile('/path/to/tracelog.json', JSON.stringify(browser.getTraceLogs()))
```

### `getPageWeight` कमांड

अंतिम पेज लोड की पेज वेट जानकारी देता है।

```js
await browser.startTracing()
await browser.url('https://webdriver.io')
await browser.endTracing()

console.log(await browser.getPageWeight())
// outputs:
// { pageWeight: 2438485,
//   transferred: 1139136,
//   requestCount: 72,
//   details: {
//       Document: { size: 221705, encoded: 85386, count: 11 },
//       Stylesheet: { size: 52712, encoded: 50130, count: 2 },
//       Image: { size: 495023, encoded: 482433, count: 36 },
//       Script: { size: 1073597, encoded: 322854, count: 15 },
//       Font: { size: 84412, encoded: 84412, count: 5 },
//       Other: { size: 1790, encoded: 1790, count: 2 },
//       XHR: { size: 509246, encoded: 112131, count: 1 } }
// }
```

----

WebdriverIO पर अधिक जानकारी के लिए [होमपेज](https://webdriver.io) देखें।