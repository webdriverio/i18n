---
id: lighthouse-service
title: ஒளிக்கலங்கரை சேவை
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-lighthouse-service/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> [Google Lighthouse](https://developer.chrome.com/docs/lighthouse/overview) மூலம் அணுகல் மற்றும் செயல்திறன் சோதனைகளை இயக்க அனுமதிக்கும் WebdriverIO சேவை.

**குறிப்பு:** இந்த சேவை தற்போது Google Chrome அல்லது Chromium இல் இயங்கும் சோதனைகளை மட்டுமே ஆதரிக்கிறது! பெரும்பாலான கிளவுட் விற்பனையாளர்கள் Chrome DevTools Protocol-க்கான அணுகலை வெளிப்படுத்தாததால், இந்த சேவை பொதுவாக உள்ளூரில் அல்லது [Selenium Grid](https://www.selenium.dev/documentation/grid/) v4 அல்லது அதற்கு மேற்பட்ட பதிப்பு மூலம் சோதனைகளை இயக்கும்போது மட்டுமே செயல்படுகிறது.

## நிறுவல்

மிக எளிதான வழி `@wdio/lighthouse-service` ஐ உங்கள் `package.json` இல் dev சார்பாக வைத்திருப்பது:

```sh
npm install @wdio/lighthouse-service --save-dev
```

`WebdriverIO` ஐ எவ்வாறு நிறுவுவது என்பது பற்றிய வழிமுறைகளை [இங்கே](https://webdriver.io/docs/gettingstarted) காணலாம்.

## உள்ளமைவு

சேவையைப் பயன்படுத்த, நீங்கள் உங்கள் `wdio.conf.js` இல் உங்கள் சேவைப் பட்டியலில் சேவையைச் சேர்க்க வேண்டும், அதாவது:

```js
// wdio.conf.js
export const config = {
    // ...
    services: ['lighthouse'],
    // ...
};
```

## பயன்பாடு

`@wdio/lighthouse-service` மூலம் Google Lighthouse அணுகல் மற்றும் செயல்திறன் சோதனைகளை WebdriverIO மூலம் இயக்க முடியும்.

### செயல்திறன் சோதனை

Lighthouse சேவை ஒவ்வொரு பக்கம் ஏற்றப்படும்போது அல்லது கிளிக் மூலம் ஏற்படும் பக்க மாற்றத்திலிருந்து செயல்திறன் தரவைப் பிடிக்க அனுமதிக்கிறது. இதை இயக்க `browser.enablePerformanceAudits(<options>)` ஐ அழைக்கவும். தேவையான அனைத்து செயல்திறன் தரவையும் பிடித்த பிறகு, திரட்டல் அமைப்புகளை மீட்டமைக்க அதை முடக்கவும், எ.கா.:

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

பின்வரும் கட்டளைகள் மற்றும் அவற்றின் முடிவுகள் கிடைக்கின்றன:

#### `getMetrics`

பொதுவாகப் பயன்படுத்தப்படும் செயல்திறன் அளவீடுகளைப் பெறுகிறது, எ.கா.:

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

பக்கம் ஏற்றுதல் பற்றிய சில பயனுள்ள கண்டறிதல்களைப் பெறுகிறது.

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

அனைத்து முக்கிய தொகுப்பு பணிகள் மற்றும் அவற்றின் மொத்த காலத்தின் பிரிப்புடன் ஒரு பட்டியலைத் திருப்பியளிக்கிறது.

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

[Lighthouse செயல்திறன் மதிப்பெண்ணை](https://developers.google.com/web/tools/lighthouse/scoring) திருப்பியளிக்கிறது, இது பின்வரும் அளவீடுகளின் எடையிடப்பட்ட சராசரி: `firstContentfulPaint`, `speedIndex`, `largestContentfulPaint`, `cumulativeLayoutShift`, `totalBlockingTime`, `interactive`, `maxPotentialFID` அல்லது `cumulativeLayoutShift`.

```js
console.log(await browser.getPerformanceScore())
/**
 * 0.897826278457836
 */
```

#### enablePerformanceAudits

`url` கட்டளையை அழைப்பதால் அல்லது இணைப்பைக் கிளிக் செய்வதால் அல்லது பக்கம் ஏற்றத்தை ஏற்படுத்தும் எதையும் அழைப்பதால் ஏற்படும் அனைத்து பக்க ஏற்றங்களுக்கும் தானியங்கி செயல்திறன் தணிக்கைகளை இயக்குகிறது. சில திரட்டல் விருப்பங்களைத் தீர்மானிக்க நீங்கள் கட்டமைப்பு பொருளை அனுப்பலாம். இயல்புநிலை திரட்டல் சுயவிவரம் `Good 3G` நெட்வொர்க் 4x CPU திரட்டுதலுடன்.

```js
await browser.enablePerformanceAudits({
    networkThrottling: 'Good 3G',
    cpuThrottling: 4,
    cacheEnabled: true,
    formFactor: 'mobile'
})
```

பின்வரும் நெட்வொர்க் திரட்டல் சுயவிவரங்கள் கிடைக்கின்றன: `offline`, `GPRS`, `Regular 2G`, `Good 2G`, `Regular 3G`, `Good 3G`, `Regular 4G`, `DSL`, `Wifi` மற்றும் `online` (திரட்டல் இல்லை).

### PWA சோதனை

`checkPWA` கட்டளையுடன், உங்கள் வலை பயன்பாடு முற்போக்கான வலை பயன்பாடுகளைப் பொறுத்தவரை சமீபத்திய வலை தரநிலைகளுக்கு இணங்குகிறதா என்பதை நீங்கள் சரிபார்க்கலாம். இது சரிபார்க்கிறது:

- உங்கள் பயன்பாட்டை நிறுவ முடியுமா
- ஒரு சேவை பணியாளரை வழங்குகிறதா
- ஒரு ஸ்பிளாஷ் திரையை வழங்குகிறதா
- Apple Touch மற்றும் Maskable ஐகான்களை வழங்குகிறதா
- மொபைல் சாதனங்களில் சேவை செய்ய முடியுமா

இந்த சோதனைகளில் ஒன்றில் நீங்கள் ஆர்வமாக இல்லை என்றால், நீங்கள் இயக்க விரும்பும் சோதனைகளின் பட்டியலை உள்ளிடலாம். அனைத்து சோதனைகளும் தேர்ச்சி பெற்றால் `passed` பண்பு `true` ஐ திருப்பி அளிக்கும். அவை தோல்வியடைந்தால், தோல்வியின் விவரங்களுடன் உங்கள் தோல்வி செய்தியை மேம்படுத்த `details` பண்பைப் பயன்படுத்தலாம்.

```js
// open page first
await browser.url('https://webdriver.io')
// validate PWA
const result = await browser.checkPWA()
expect(result.passed).toBe(true)
```

### `startTracing(categories, samplingFrequency)` கட்டளை

உலாவியைத் தடமறியத் தொடங்குகிறது. நீங்கள் விருப்பமாக தனிப்பயன் தடமறிதல் வகைகளை ([இந்த பட்டியலுக்கு](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-lighthouse-service/src/constants.ts#L12-L56) இயல்புநிலை) மற்றும் மாதிரி அதிர்வெண்ணை (இயல்புநிலை `10000`) அனுப்பலாம்.

```js
await browser.startTracing()
```

### `endTracing` கட்டளை

உலாவியைத் தடமறிவதை நிறுத்துகிறது.

```js
await browser.endTracing()
```

### `getTraceLogs` கட்டளை

தடமறிதல் காலத்திற்குள் பிடிக்கப்பட்ட தடப்பதிவுகளைத் திருப்பியளிக்கிறது. Chrome DevTools இடைமுகம் மூலம் டிரேஸை ஆய்வு செய்ய கோப்பு முறைமையில் டிரேஸ் பதிவுகளை சேமிக்க இந்த கட்டளையைப் பயன்படுத்தலாம்.

```js
import fs from 'node:fs/promises'

await browser.startTracing()
await browser.url('http://json.org')
await browser.endTracing()

await fs.writeFile('/path/to/tracelog.json', JSON.stringify(browser.getTraceLogs()))
```

### `getPageWeight` கட்டளை

கடைசி பக்கம் ஏற்றப்பட்டதின் பக்க எடை தகவலை திருப்பி அளிக்கிறது.

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

WebdriverIO பற்றிய கூடுதல் தகவலுக்கு [முகப்புப் பக்கத்தைப்](https://webdriver.io) பார்க்கவும்.