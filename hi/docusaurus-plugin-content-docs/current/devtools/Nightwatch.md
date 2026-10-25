---
id: nightwatch
title: Nightwatch DevTools
description: "टेस्ट बदले बिना Nightwatch टेस्ट सूट में DevTools डिबगिंग UI जोड़ें, और स्क्रीनकास्ट, BiDi कैप्चर तथा ट्रेस मोड कॉन्फ़िगर करें।"
---

[WebdriverIO DevTools](https://github.com/webdriverio/devtools) के लिए Nightwatch एडैप्टर - आपके टेस्ट कोड में कोई बदलाव किए बिना आपके Nightwatch टेस्ट सूट में वही विज़ुअल डिबगिंग UI लाता है।

## इंस्टॉलेशन

```bash
npm install @wdio/nightwatch-devtools
```

Nightwatch 3 या उसके बाद का संस्करण आवश्यक है। Cucumber के लिए, आपके प्रोजेक्ट में `@cucumber/cucumber` इंस्टॉल होना चाहिए; एडैप्टर अपनी कॉपी बंडल करने के बजाय आपकी कॉपी का उपयोग करता है।

## सेटअप

### स्टैंडर्ड Nightwatch (mocha-स्टाइल)

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

अपने टेस्ट सामान्य रूप से चलाएँ - DevTools UI अपने आप एक नई ब्राउज़र विंडो में खुल जाता है:

```bash
nightwatch
```

> आपकी टेस्ट फ़ाइलों में किसी बदलाव की आवश्यकता नहीं है।

लाइव मोड में आपके टेस्ट समाप्त होने के बाद भी रन खुला रहता है ताकि आप परिणामों की समीक्षा कर सकें। इसे समाप्त करने के लिए DevTools विंडो बंद करें, या बाहर निकलने और विंडो खुली छोड़ने के लिए Ctrl+C दबाएँ।

### Cucumber / BDD

मुख्य एक्सपोर्ट के साथ `cucumberHooksPath` इम्पोर्ट करें और इसे Cucumber के `require` विकल्प में पास करें। यह `Before` / `After` सिनेरियो हुक और `BeforeStep` / `AfterStep` स्टेप हुक रजिस्टर करता है, जो WebdriverIO सर्विस के `beforeScenario` / `afterScenario` व्यवहार की नकल करते हैं। एक pre-quit `After` हुक प्रत्येक सिनेरियो के ट्रेस को तब फ़्लश करता है जब उसका ब्राउज़र सेशन अभी भी सक्रिय होता है।

```js
// nightwatch.conf.cjs
const nightwatchDevtools = require('@wdio/nightwatch-devtools').default
const { cucumberHooksPath } = require('@wdio/nightwatch-devtools')

module.exports = {
  src_folders: ['features/step_definitions'],

  test_runner: {
    type: 'cucumber',
    options: {
      feature_path: 'features',
      require: [cucumberHooksPath] // <-- DevTools Cucumber हुक रजिस्टर करें
    }
  },

  test_settings: {
    default: {
      desiredCapabilities: {
        browserName: 'chrome',
        'goog:loggingPrefs': { performance: 'ALL' }
      },
      globals: nightwatchDevtools({ port: 3000 })
    }
  }
}
```

## कॉन्फ़िगरेशन विकल्प

| विकल्प | टाइप | डिफ़ॉल्ट | विवरण |
|--------|------|---------|-------------|
| `port` | `number` | `3000` | DevTools बैकएंड सर्वर के लिए पोर्ट। यदि पहले से उपयोग में हो तो अपने आप बढ़ा दिया जाता है। |
| `hostname` | `string` | `'localhost'` | होस्टनेम जिससे बैकएंड सर्वर बाइंड होता है। |
| `screencast` | `ScreencastOptions` | `{ enabled: false }` | प्रति-सेशन `.webm` वीडियो रिकॉर्डिंग, केवल लाइव मोड में। ट्रेस मोड में `filmstrip` / `video` का उपयोग करें। नीचे [Screencast](#screencast) देखें। |
| `bidi` | `boolean` | `false` | ब्राउज़र कंसोल + JS एक्सेप्शन + नेटवर्क के लिए WebDriver BiDi कैप्चर चुनें। आपकी capabilities में `webSocketUrl: true` और BiDi-सक्षम chromedriver आवश्यक है। अटैच होने पर, प्रति-कमांड Chrome perf-log नेटवर्क पाथ बंद कर दिया जाता है ताकि रिक्वेस्ट डुप्लिकेट न हों। |
| `mode` | `'live' \| 'trace'` | `'live'` | `live` DevTools UI खोलता है; `trace` इसे छोड़ देता है और इसके बजाय एक पोर्टेबल आर्टिफ़ैक्ट लिखता है। [Trace Mode](/docs/devtools/wdio/trace-mode) देखें। |
| `traceFormat` | `'zip' \| 'ndjson-directory'` | `'zip'` | ट्रेस आर्टिफ़ैक्ट लेआउट। केवल `mode: 'trace'` होने पर लागू होता है। |
| `traceGranularity` | `'session' \| 'spec' \| 'test'` | `'session'` | प्रति सेशन / स्पेक फ़ाइल / टेस्ट एक ट्रेस। `'test'` प्रत्येक को `test-results/<spec>-<title>-<browser>[-retryN]/trace.zip` में लिखता है। केवल `mode: 'trace'` होने पर लागू होता है। [Trace Mode](/docs/devtools/wdio/trace-mode#trace-granularity--tracegranularity) देखें। **चेतावनी:** BDD `describe/it` इंटरफ़ेस एक ही सेशन-स्कोप्ड स्लाइस में सिमट जाता है ([Per-test slicing](#per-test-slicing--the-bdd-describeit-caveat) देखें)। |
| `tracePolicy` | `'on' \| 'retain-on-failure' \| 'retain-on-first-failure' \| 'on-first-retry' \| 'on-all-retries' \| 'retain-on-failure-and-retries'` | `'on'` | कौन-से ट्रेस रखने हैं। `traceGranularity: 'test'` के साथ जोड़ा जाता है। केवल `mode: 'trace'` होने पर लागू होता है; ट्रेस मोड के बाहर इसे सेट करने पर एक चेतावनी लॉग होती है। **चेतावनी:** Nightwatch पर केवल `'retain-on-failure'` विश्वसनीय है। अन्य retry-aware पॉलिसी इसी में बदल जाती हैं, क्योंकि `--retries` प्लगइन के प्रति-टेस्ट हुक को दोबारा फ़ायर किए बिना टेस्टकेस को आंतरिक रूप से फिर से चलाता है। |
| `filmstrip` | `boolean` | `true` | ट्रेस प्लेयर में स्क्रब करने योग्य प्लेबैक के लिए ट्रेस में एक घना, निरंतर स्क्रीनकास्ट फ़िल्मस्ट्रिप रिकॉर्ड करें — केवल प्रति एक्शन एक फ़्रेम नहीं। सेशन के लिए स्क्रीनकास्ट रिकॉर्डर (Nightwatch पर पोलिंग मोड) चलाता है। केवल `mode: 'trace'` होने पर लागू होता है। |
| `screenshot` | `'off' \| 'on' \| 'only-on-failure'` | `'off'` | प्रति-टेस्ट स्क्रीनशॉट। केवल ट्रेस मोड + `traceGranularity: 'test'`। **केवल-उत्पादन** — PNG ट्रेस आउटपुट डायरेक्टरी में लिखा जाता है (और `emitArtifactsManifest: true` होने पर मैनिफ़ेस्ट में); Allure में इनलाइन अटैच नहीं होता (नीचे नोट देखें)। |
| `video` | `'off' \| TraceRetentionPolicy` | `'off'` | प्रति-टेस्ट वीडियो स्लाइस, दी गई पॉलिसी के अनुसार रखा जाता है (जैसे `'retain-on-failure'`)। केवल ट्रेस मोड + `traceGranularity: 'test'`। गैर-`off` मान स्वयं स्क्रीनकास्ट रिकॉर्डर शुरू करता है — आपको `filmstrip` या `screencast.enabled` की भी **आवश्यकता नहीं** है। **केवल-उत्पादन** — `.webm` ट्रेस आउटपुट डायरेक्टरी में लिखा जाता है (और `emitArtifactsManifest: true` होने पर मैनिफ़ेस्ट में); Allure में इनलाइन अटैच नहीं होता। |
| `emitArtifactsManifest` | `boolean` | `false` | ट्रेस के बगल में `devtools-artifacts-<sessionId>.json` मैनिफ़ेस्ट लिखें (वह सामान्य इंडेक्स जिसे रिपोर्टर/CI उत्पादित आर्टिफ़ैक्ट खोजने के लिए उपयोग करते हैं)। **Nightwatch के लिए ऑप्ट-इन** — इसके पास ऑटो-डिटेक्ट करने के लिए कोई लाइव Allure संकेत नहीं है, इसलिए WDIO/Selenium के विपरीत यह कभी अपने आप सक्षम नहीं होता। केवल `mode: 'trace'` होने पर लागू होता है। |
| `captureAssertions` | `boolean` | `true` | असर्शन को ट्रेस एक्शन पंक्तियों के रूप में कैप्चर करें — `node:assert` तथा नेटिव `browser.assert`/`browser.verify`, जिसमें नकारात्मक `.not.*` मैचर भी शामिल हैं। ऑप्ट आउट करने के लिए `false` सेट करें। |

> **Nightwatch के लिए इनलाइन Allure अटैचमेंट समर्थित नहीं है।** इसका आधिकारिक `nightwatch-allure` रिपोर्टर post-hoc है (कोई लाइव अटैच API नहीं), और `allure-js-commons` का `attachment()` Nightwatch रन में कुछ नहीं करता। इसलिए `screenshot` / `video` आर्टिफ़ैक्ट ट्रेस आउटपुट डायरेक्टरी में *उत्पादित* होते हैं (फ़ाइलें, साथ ही `emitArtifactsManifest: true` होने पर आर्टिफ़ैक्ट मैनिफ़ेस्ट) लेकिन किसी Allure टेस्ट से अटैच नहीं होते। प्रति-टेस्ट स्लाइसिंग — और इसलिए ये आर्टिफ़ैक्ट — Cucumber और exports-object इंटरफ़ेस के लिए सार्थक हैं; BDD `describe/it` इंटरफ़ेस सेशन ग्रैन्युलैरिटी में सिमट जाता है, इसलिए वहाँ प्रति-टेस्ट गेट कुछ नहीं करता।

```js
globals: nightwatchDevtools({
  port: 3000,
  hostname: 'localhost',
  screencast: { enabled: true },
  bidi: true
})
```

## स्क्रीनकास्ट

ब्राउज़र सेशन का एक निरंतर `.webm` वीडियो रिकॉर्ड करें। प्रत्येक WebDriver सेशन को अपनी रिकॉर्डिंग मिलती है: रन के बीच में `browser.end()`, या Cucumber में प्रति-सिनेरियो ब्राउज़र quit, वर्तमान वीडियो को अंतिम रूप देता है और अगले सेशन के लिए एक नया वीडियो शुरू करता है। अंतिम रिकॉर्डिंग Nightwatch के `after()` हुक में अंतिम रूप दी जाती है, और प्रत्येक रिकॉर्डिंग को Screencast टैब के ड्रॉपडाउन से चुना जा सकता है।

**केवल पोलिंग मोड।** Nightwatch WebdriverIO (`browser.getPuppeteer()`) और Selenium (`driver.createCDPConnection`) की तरह कोई स्थिर CDP escape hatch उपलब्ध नहीं कराता, इसलिए स्क्रीनकास्ट एक निश्चित अंतराल पर WebDriver स्क्रीनशॉट का अनुरोध करके फ़्रेम कैप्चर करता है। अनुरोध सीधे WebDriver HTTP ट्रांसपोर्ट पर जाता है, Nightwatch की कमांड क्यू को बायपास करते हुए, इसलिए यह कभी भी आपके टेस्ट की कमांड के पीछे प्रतीक्षा नहीं करता। Nightwatch द्वारा समर्थित हर ब्राउज़र पर काम करता है।

```js
globals: nightwatchDevtools({
  port: 3000,
  screencast: { enabled: true, pollIntervalMs: 200 }
})
```

| विकल्प | टाइप | डिफ़ॉल्ट | नोट्स |
|--------|------|---------|-------|
| `enabled` | `boolean` | `false` | मास्टर स्विच। |
| `pollIntervalMs` | `number` | `200` | स्क्रीनशॉट अंतराल (ms)। कम = अधिक स्मूथ वीडियो, अधिक WebDriver राउंड-ट्रिप। 200 ms ≈ 5 fps। |
| `captureFormat` | `'jpeg' \| 'png'` | `'jpeg'` | अंतिम `.webm` mux से पहले ffmpeg एनकोडर को सौंपा गया प्रति-फ़्रेम पिक्सेल फ़ॉर्मेट। पोलिंग मोड में स्रोत स्क्रीनशॉट हमेशा PNG के रूप में कैप्चर होते हैं, इसलिए यह कैप्चर को **नहीं** बदलता - केवल वह फ़ॉर्मेट जो एनकोडर प्रति फ़्रेम प्राप्त करता है। |
| `maxBufferFrames` | `number` | `2000` | मेमोरी में रखे गए फ़्रेम की सीमा। इससे अधिक होने पर बफ़र को उसी स्थान पर पतला किया जाता है, पहले और अंतिम फ़्रेम को रखते हुए। |
| `maxWidth` / `maxHeight` / `quality` | - | - | केवल-CDP विकल्प, पोलिंग मोड में अनदेखे किए जाते हैं। WDIO/Selenium एडैप्टर के साथ संरचना-संगतता के लिए सूचीबद्ध। |

**पूर्वापेक्षाएँ:** `fluent-ffmpeg` (पैकेज की पहले से एक runtime dependency) तथा PATH पर `ffmpeg` बाइनरी। macOS: `brew install ffmpeg`। Linux: `apt install ffmpeg`। ffmpeg के बिना रिकॉर्डर फिर भी चलता है लेकिन एनकोड चरण एक चेतावनी लॉग करता है और फ़ाइल लिखना छोड़ देता है।

**आउटपुट:** `nightwatch-video-<sessionId>.webm` अभी-अभी चली टेस्ट फ़ाइल के बगल में एक `test-results/` फ़ोल्डर में लिखा जाता है, विकल्प के रूप में `nightwatch.conf.*` डायरेक्टरी, फिर `process.cwd()` का उपयोग होता है। `node_modules/` के अंतर्गत डायरेक्टरी छोड़ दी जाती हैं, और यदि चुनी गई डायरेक्टरी लिखने योग्य नहीं है तो फ़ाइल OS की temp डायरेक्टरी में जाती है। पूरा पाथ Nightwatch लॉग लाइन `📹 Screencast video: <path>` में दिखाई देता है और वीडियो डैशबोर्ड के Screencast टैब पर भी स्ट्रीम किया जाता है।

पूर्ण स्क्रीनकास्ट फ़ीचर संदर्भ (ब्राउज़र समर्थन, तीनों एडैप्टर में आउटपुट पाथ) के लिए, [Screencast पेज](/docs/devtools/wdio/screencast) देखें।

## BiDi कैप्चर (ऑप्ट-इन)

ब्राउज़र कंसोल संदेशों, JS एक्सेप्शन और नेटवर्क रिक्वेस्ट के लिए WebDriver BiDi कैप्चर सक्षम करें। यह उसी पाथ के समतुल्य है जिसका उपयोग selenium-devtools करता है - दोनों एडैप्टर `@wdio/devtools-core` में एक ही अटैच लॉजिक साझा करते हैं।

```js
globals: nightwatchDevtools({
  port: 3000,
  bidi: true
})
```

आपको अपनी capabilities में `webSocketUrl: true` की भी आवश्यकता है ताकि chromedriver वास्तव में BiDi चैनल उपलब्ध कराए:

```js
desiredCapabilities: {
  browserName: 'chrome',
  webSocketUrl: true,                           // ← BiDi सक्षम करता है
  'goog:chromeOptions': { /* ... */ }
}
```

जब BiDi अटैच होता है, तो प्रति-कमांड Chrome performance-log नेटवर्क कैप्चर पाथ बंद कर दिया जाता है ताकि रिक्वेस्ट डैशबोर्ड में दो बार दिखाई न दें। यदि `webSocketUrl` अनुपस्थित है या chromedriver संस्करण BiDi उपलब्ध नहीं कराता, तो अटैच एक चेतावनी लॉग करता है और perf-log फ़ॉलबैक काम करता रहता है। इंजेक्ट किया गया कलेक्टर भी हर रिक्वेस्ट को सूचीबद्ध करता है, पेज के अपने दो स्रोतों से: एक `fetch` / `XMLHttpRequest` कॉल इसके पैच से होकर जाती है और method, headers, status और body रखती है, और हर अन्य लोड पेज के Resource Timing बफ़र से उसकी टाइमिंग और आकार के साथ आता है। Chrome पर performance log फिर उन Resource Timing पंक्तियों को उसी स्थान पर headers और status के साथ अपग्रेड करता है; Safari पर, या Appium द्वारा सर्व किए गए किसी भी सेशन पर, वे वैसे ही रहती हैं जैसे पेज ने उन्हें देखा, बिना headers या bodies के, और Safari पर बिना status के। [Network Logs](/docs/devtools/wdio/network-logs#without-webdriver-bidi) देखें।

**`bidi: true` के बिना भी `webSocketUrl: true` सेट करें।** इसके साथ, एडैप्टर हर पेज पर document start पर अपना पेज कलेक्टर रजिस्टर करता है, इसलिए DOM time-travel नेविगेशन के दौरान सटीक रहता है। इसके बिना, एडैप्टर हर नेविगेशन के बाद कलेक्टर इंजेक्ट करने पर निर्भर रहता है, जो नए पेज के शुरुआती क्षणों को छोड़ सकता है।

## ट्रेस मोड

हेडलेस कैप्चर पाथ — कोई DevTools UI विंडो नहीं खुलती। सेशन के अंत में एडैप्टर एक पोर्टेबल `trace-<sessionId>.zip` (या डायरेक्टरी) एक `test-results/` फ़ोल्डर में लिखता है (resolved टेस्ट / config डायरेक्टरी के बगल में), जिसकी संरचना WebdriverIO ट्रेस आर्टिफ़ैक्ट जैसी ही होती है।

```js
globals: nightwatchDevtools({
  mode: 'trace',
  traceFormat: 'ndjson-directory'  // वैकल्पिक; डिफ़ॉल्ट 'zip'
})
```

### ग्रैन्युलैरिटी और Cucumber

`traceGranularity` चुनता है कि एक आर्टिफ़ैक्ट क्या कवर करता है — `'session'` (डिफ़ॉल्ट), `'spec'`, या `'test'`।

Nightwatch हर Cucumber सिनेरियो के बाद ब्राउज़र बंद कर देता है। एक `'session'` ट्रेस इसे फैलाता है: पूरे रन के लिए एक zip, जिसमें हर सिनेरियो उसके फ़ीचर के अंतर्गत नेस्टेड होता है। `'test'` प्रति सिनेरियो एक zip उसके अपने फ़ोल्डर में लिखता है, जो Cucumber के लिए अनुशंसा है — छोटे आर्टिफ़ैक्ट, और वह ग्रैन्युलैरिटी जिस पर `tracePolicy` retention आधारित होता है।

```js
globals: nightwatchDevtools({
  mode: 'trace',
  traceGranularity: 'test'  // प्रति Cucumber सिनेरियो एक ट्रेस
})
```

BDD `describe/it` इंटरफ़ेस पर, `'test'` एक ही सेशन-स्कोप्ड स्लाइस में सिमट जाता है: Nightwatch प्रत्येक `it()` को आंतरिक रूप से चलाता है और प्लगइन का प्रति-टेस्ट हुक प्रति मॉड्यूल केवल एक बार फ़ायर करता है। एक्शन ट्री फिर भी प्रत्येक `it` को उसके अपने ग्रुप के रूप में दिखाता है।

ट्रेस मोड में बैकएंड पोर्ट-बाइंड और UI विंडो छोड़ दिए जाते हैं, और `screencast.enabled` को अनदेखा किया जाता है (जब किसी और चीज़ को रिकॉर्डर की आवश्यकता नहीं होती तो एक चेतावनी लॉग होती है)। ट्रेस मोड इसके बजाय डिफ़ॉल्ट रूप से घना `filmstrip` रिकॉर्ड करता है, और स्क्रीनकास्ट ट्यूनिंग फ़ील्ड (`pollIntervalMs`, `captureFormat`, `maxBufferFrames`) उस रिकॉर्डर पर अभी भी लागू होते हैं। पूर्ण फ़ीचर संदर्भ (आर्टिफ़ैक्ट सामग्री, व्यूअर, मोबाइल टेस्टिंग, `zip` बनाम `ndjson-directory` कब चुनें) के लिए, [Trace Mode पेज](/docs/devtools/wdio/trace-mode) देखें।

Nightwatch WebdriverIO और Selenium एडैप्टर के समान ट्रेस पाइपलाइन साझा करता है, इसलिए आर्टिफ़ैक्ट की संरचना एक जैसी होती है चाहे उसे किसी भी एडैप्टर ने बनाया हो। एक Nightwatch ट्रेस पूर्ण प्रति-एक्शन कैप्चर रखता है — एक स्क्रीनशॉट, गहराई-इंडेंटेड accessibility-tree स्नैपशॉट, इंटरैक्ट करने योग्य एलिमेंट सूची, और Markdown ट्रांसक्रिप्ट — इसलिए यह `show-trace` प्लेयर में DOM/स्नैपशॉट time-travel, **A11y**, **Transcript** और **Errors** टैब (jump-to-source के साथ विफलताएँ), pick-locator एलिमेंट ओवरले, और (Cucumber के लिए) **Feature → Scenario** नेस्टिंग के साथ खुलता है। स्टेप लाइव डैशबोर्ड में ट्रैक किए जाते हैं लेकिन अभी तक ट्रेस में उनके अपने ग्रुप के रूप में नेस्टेड नहीं होते। कॉपी किए गए लोकेटर सादे CSS को प्राथमिकता देते हैं, जिसे Nightwatch डिफ़ॉल्ट रूप से पढ़ता है; केवल तभी जब कोई अद्वितीय CSS सेलेक्टर मौजूद न हो, प्लेयर आपको XPath देता है, जिसके साथ `useXpath()` / `locateStrategy: 'xpath'` कैप्शन होता है।

`@wdio/nightwatch-devtools` के साथ आने वाले `show-trace` bin से ट्रेस खोलें (कोई अतिरिक्त dependency नहीं):

```sh
npx show-trace test-results/trace-<sessionId>.zip   # in a project that installs the adapter
pnpm show-trace test-results/trace-<sessionId>.zip  # from the devtools monorepo
```

पूर्ण walkthrough और कीबोर्ड शॉर्टकट के लिए [Trace Player](/docs/devtools/trace-player) पेज देखें।

### प्रति-टेस्ट स्लाइसिंग और BDD `describe/it` चेतावनी

प्रति-टेस्ट विकल्पों — `traceGranularity: 'test'`, और इसके साथ जुड़ने वाले `tracePolicy`, `screenshot`, और `video` विकल्पों — को प्रत्येक टेस्ट का स्लाइस काटने के लिए एक प्रति-टेस्ट हुक की आवश्यकता होती है। **exports-object (mocha-स्टाइल)** इंटरफ़ेस और **Cucumber** (प्रति-सिनेरियो हुक) एक हुक उपलब्ध कराते हैं, इसलिए उन्हें वास्तविक प्रति-टेस्ट स्लाइसिंग मिलती है। **BDD `describe/it`** इंटरफ़ेस अपवाद है: Nightwatch प्रत्येक `it()` को आंतरिक रूप से चलाता है और प्लगइन का प्रति-टेस्ट हुक प्रति मॉड्यूल केवल एक बार फ़ायर करता है, इसलिए `traceGranularity: 'test'` पहले टेस्ट से जुड़े एक ही **सेशन-स्कोप्ड** स्लाइस में सिमट जाता है। आर्टिफ़ैक्ट मैनिफ़ेस्ट फिर भी हर टेस्टकेस को उसकी सही स्थिति के साथ सूचीबद्ध करता है; केवल प्रति-टेस्ट स्लाइस/आर्टिफ़ैक्ट कीइंग सिमटती है। सेशन- और स्पेक-ग्रैन्युलैरिटी ट्रेस अप्रभावित रहते हैं।

## उदाहरण

कार्यशील उदाहरण रिपॉज़िटरी की टॉप-लेवल `examples/` डायरेक्टरी में हैं। वर्कस्पेस को एक बार बिल्ड करें (`pnpm install && pnpm build`), फिर रिपॉज़िटरी रूट से चलाएँ:

| डायरेक्टरी | रनर | कमांड |
|-----------|--------|---------|
| [`examples/nightwatch/`](https://github.com/webdriverio/devtools/tree/main/examples/nightwatch) | Nightwatch BDD `describe/it` (डिफ़ॉल्ट रूप से ट्रेस मोड; UI के लिए `DEVTOOLS_MODE=live`) | `pnpm demo:nightwatch` (`pnpm demo:nightwatch:retry` `--retries 1` जोड़ता है) |
| [`examples/nightwatch/cucumber/`](https://github.com/webdriverio/devtools/tree/main/examples/nightwatch/cucumber) | Nightwatch + Cucumber | `pnpm --filter @wdio/nightwatch-devtools example:cucumber` |
| [`examples/nightwatch/`](https://github.com/webdriverio/devtools/tree/main/examples/nightwatch) (`nightwatch.mobile.conf.cjs`) | Appium (Android Clock ऐप; `DEVTOOLS_MOBILE_PLATFORM=ios` के साथ iOS Settings) | `pnpm demo:nightwatch:mobile` |

## मोबाइल (Appium)

Appium सेशन लाइव और ट्रेस मोड में कैप्चर किए जाते हैं। Appium को `selenium` के अंतर्गत `use_appium: true`, `start_process: false` और `default_path_prefix: ''` के साथ घोषित करें। नेटिव ऐप के लिए `browserName: null` सेट करें; अन्यथा Nightwatch Firefox भर देता है और एडैप्टर सेशन को वेब पेज वाला मानता है। `bidi` बंद रखें, क्योंकि Appium कोई BiDi सर्व नहीं करता। नेटिव ऐप का नेटवर्क तब कैप्चर होता है जब `desiredCapabilities` में `'appium:intercept': true` सेट हो और Appium appium-interceptor प्लगइन चलाए; [Native app network](/docs/devtools/mobile#native-app-network) देखें।

```js
// nightwatch.mobile.conf.cjs
const nightwatchDevtools = require('@wdio/nightwatch-devtools').default

module.exports = {
  selenium: {
    start_process: false,
    use_appium: true,
    host: '127.0.0.1',
    port: 4723,
    default_path_prefix: ''
  },
  test_settings: {
    default: {
      desiredCapabilities: {
        browserName: null,
        platformName: 'Android',
        'appium:automationName': 'UiAutomator2'
      },
      globals: nightwatchDevtools({ mode: 'trace', bidi: false })
    }
  }
}
```

नेटिव सेशन प्लेटफ़ॉर्म के XML ट्री से कमांड, स्क्रीनशॉट और एलिमेंट डेटा रिकॉर्ड करते हैं, बिना DOM के। हाइब्रिड ऐप का webview ऐसे कैप्चर होता है मानो वह अभी भी नेटिव हो। इसे `pnpm demo:nightwatch:mobile` के साथ आज़माएँ, devtools रिपॉज़िटरी के बिल्ड किए गए चेकआउट के रूट से चलाकर (सेटअप चरण [Running an example](/docs/devtools/mobile#running-an-example) में)। पूर्ण मोबाइल संदर्भ के लिए [Mobile Testing पेज](/docs/devtools/mobile) देखें।

## फ़ीचर्स

Nightwatch एडैप्टर WebdriverIO के समान DevTools UI अनुभव प्रदान करता है। नीचे दिया गया हर फ़ीचर बेस `globals: nightwatchDevtools({ port: 3000 })` सेटअप के साथ अपने आप कैप्चर होता है — किसी प्रति-फ़ीचर कॉन्फ़िग की आवश्यकता नहीं (नेटवर्क लॉग के लिए अतिरिक्त रूप से `'goog:loggingPrefs': { performance: 'ALL' }` की आवश्यकता है, जो [Setup](#setup) में दिखाया गया है)। लिंक प्रत्येक फ़ीचर के पूर्ण संदर्भ पर ले जाते हैं।

- **[Interactive Test Rerunning & Visualization](/docs/devtools/wdio/interactive-test-rerunning)** - लाइव ब्राउज़र प्रीव्यू, प्रति-कमांड स्क्रीनशॉट, और एक-क्लिक टेस्ट/सूट रीरनिंग
- **[Preserve & Rerun (Compare)](/docs/devtools/wdio/preserve-and-rerun)** - एक विफल टेस्ट का स्नैपशॉट लें, उसे फिर से चलाएँ, और दोनों रन की साथ-साथ तुलना करें। Nightwatch रीरन `DEVTOOLS_RERUN_LABEL` सेट करके आपके कॉन्फ़िग को फिर से लॉन्च करते हैं और उस टेस्ट तक फ़िल्टर करते हैं; इन्हें एक खोजने योग्य `nightwatch.conf.*` की आवश्यकता होती है, जिसके बिना प्लगइन चेतावनी देता है और रीरन उपलब्ध नहीं होता
- **[Multi-Framework Support](/docs/devtools/wdio/multi-framework-support)** - स्टैंडर्ड (mocha-स्टाइल) और Cucumber/BDD रनर
- **[Console Logs](/docs/devtools/wdio/console-logs)** - ब्राउज़र कंसोल आउटपुट कैप्चर और निरीक्षण करें (`bidi: true` के साथ रियल-टाइम)
- **[Network Logs](/docs/devtools/wdio/network-logs)** - API कॉल और नेटवर्क गतिविधि की निगरानी करें
- **[Metadata](/docs/devtools/wdio/metadata)** - प्रति ब्राउज़र सेशन सेशन capabilities, एनवायरनमेंट, और टाइमिंग
- **[TestLens](/docs/devtools/wdio/testlens)** - किसी भी कमांड से उस सोर्स लाइन पर जाएँ जिसने उसे ट्रिगर किया
- **[Session Screencast](/docs/devtools/wdio/screencast)** - ब्राउज़र सेशन की निरंतर `.webm` रिकॉर्डिंग
- **[Trace Mode](/docs/devtools/wdio/trace-mode)** - पोर्टेबल `trace.zip` बनाने वाला हेडलेस कैप्चर (कोई UI विंडो नहीं)

स्क्रीनकास्ट एकमात्र फ़ीचर है जिसके अपने विकल्प हैं (पूरी सूची [Screencast](#screencast) के अंतर्गत):

```js
globals: nightwatchDevtools({ port: 3000, screencast: { enabled: true, pollIntervalMs: 200 } })
```

## सीमाएँ

Nightwatch WebdriverIO जितनी गहराई के फ़्रेमवर्क हुक प्रदान नहीं करता, इसलिए WDIO DevTools सर्विस से कुछ अंतर हैं:

| सीमा | विवरण |
|-----------|--------|
| कोई नेटिव कमांड हुक नहीं | Nightwatch में कोई `beforeCommand` / `afterCommand` हुक नहीं है। इसके बजाय कमांड एक ब्राउज़र प्रॉक्सी रैपर के माध्यम से इंटरसेप्ट किए जाते हैं। |
| सीमित टेस्ट संदर्भ | `browser.currentTest` WDIO रनर संदर्भ की तुलना में कम मेटाडेटा प्रदान करता है; टेस्ट नाम और फ़ाइल पाथ के लिए अतिरिक्त heuristics की आवश्यकता होती है। |
| सपाट सूट नेस्टिंग | Nightwatch मूल रूप से बहु-स्तरीय नेस्टेड `describe` ब्लॉक का समर्थन नहीं करता; प्लगइन अधिकतम दो स्तर रिपोर्ट करता है। |
| परिणामों की विलंबित उपलब्धता | टेस्ट परिणाम केवल `afterEach` में अंतिम रूप दिए जाते हैं, टेस्ट के बीच में उपलब्ध नहीं होते। |
| स्क्रीनकास्ट केवल पोलिंग मोड में | WDIO (`browser.getPuppeteer()` के माध्यम से CDP push) और Selenium (`driver.createCDPConnection` के माध्यम से CDP push) के विपरीत, Nightwatch में कोई स्थिर CDP escape hatch नहीं है, इसलिए फ़्रेम WebDriver स्क्रीनशॉट एंडपॉइंट को पोल करके कैप्चर किए जाते हैं। Nightwatch द्वारा समर्थित हर ब्राउज़र पर काम करता है; पोलिंग अंतराल के अनुपात में छोटी प्रति-फ़्रेम लागत। |
| प्रति-टेस्ट ट्रेस स्लाइसिंग (BDD `describe/it`) | BDD इंटरफ़ेस प्लगइन का प्रति-टेस्ट हुक प्रति मॉड्यूल एक बार फ़ायर करता है, इसलिए `traceGranularity: 'test'` एक सेशन-स्कोप्ड स्लाइस में सिमट जाता है। exports-object (mocha-स्टाइल) और Cucumber इंटरफ़ेस को वास्तविक प्रति-टेस्ट स्लाइसिंग मिलती है। [Per-test slicing](#per-test-slicing--the-bdd-describeit-caveat) देखें। |
| Retry-aware retention | केवल `tracePolicy: 'retain-on-failure'` विश्वसनीय है; अन्य retry-aware पॉलिसी इसी में बदल जाती हैं। |
| केवल-उत्पादन ट्रेस आर्टिफ़ैक्ट | प्रति-टेस्ट `screenshot` / `video` फ़ाइलें ट्रेस आउटपुट डायरेक्टरी में लिखी जाती हैं (और `emitArtifactsManifest: true` होने पर मैनिफ़ेस्ट में) लेकिन Allure में इनलाइन अटैच नहीं होतीं — Nightwatch के पास कोई लाइव Allure अटैच API नहीं है। |

WebdriverIO DevTools सर्विस के साथ समग्र फ़ीचर समानता लगभग **80-90%** है।