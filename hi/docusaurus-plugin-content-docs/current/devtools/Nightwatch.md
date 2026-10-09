---
id: nightwatch
title: Nightwatch DevTools
description: "टेस्ट बदले बिना किसी Nightwatch टेस्ट सूट में DevTools डीबगिंग UI जोड़ें, और स्क्रीनकास्ट, BiDi कैप्चर और ट्रेस मोड कॉन्फ़िगर करें।"
---

[WebdriverIO DevTools](https://github.com/webdriverio/devtools) के लिए Nightwatch एडॉप्टर - आपके टेस्ट कोड में कोई बदलाव किए बिना आपके Nightwatch टेस्ट सूट में वही विज़ुअल डीबगिंग UI लाता है।

## इंस्टॉलेशन

```bash
npm install @wdio/nightwatch-devtools
```

## सेटअप

### स्टैंडर्ड Nightwatch (mocha-style)

```js
// nightwatch.conf.cjs
const nightwatchDevtools = require('@wdio/nightwatch-devtools').default

module.exports = {
  src_folders: ['tests'],

  test_settings: {
    default: {
      desiredCapabilities: {
        browserName: 'chrome',
        // Required for network request capture
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

> आपकी टेस्ट फ़ाइलों में किसी बदलाव की ज़रूरत नहीं है।

### Cucumber / BDD

मुख्य export के साथ `cucumberHooksPath` को import करें और इसे Cucumber के `require` विकल्प में पास करें। यह `Before` / `After` scenario हुक रजिस्टर करता है जो WebdriverIO सर्विस के `beforeScenario` / `afterScenario` व्यवहार की नकल करते हैं।

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
      require: [cucumberHooksPath] // <-- register DevTools Cucumber hooks
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

| विकल्प | प्रकार | डिफ़ॉल्ट | विवरण |
|--------|------|---------|-------------|
| `port` | `number` | `3000` | DevTools बैकएंड सर्वर के लिए पोर्ट। यदि पहले से उपयोग में है तो अपने आप बढ़ा दिया जाता है। |
| `hostname` | `string` | `'localhost'` | वह hostname जिससे बैकएंड सर्वर bind होता है। |
| `screencast` | `ScreencastOptions` | `{ enabled: false }` | प्रति-सेशन `.webm` वीडियो रिकॉर्डिंग। नीचे [Screencast](#screencast) देखें। |
| `bidi` | `boolean` | `false` | ब्राउज़र कंसोल + JS exceptions + नेटवर्क के लिए WebDriver BiDi कैप्चर चालू करें। इसके लिए आपकी capabilities में `webSocketUrl: true` और BiDi-सक्षम chromedriver आवश्यक है। अटैच होने पर, प्रति-कमांड Chrome perf-log नेटवर्क पाथ बंद कर दिया जाता है ताकि रिक्वेस्ट डुप्लिकेट न हों। |
| `mode` | `'live' \| 'trace'` | `'live'` | `live` DevTools UI खोलता है; `trace` इसे छोड़ देता है और इसके बजाय एक पोर्टेबल आर्टिफ़ैक्ट लिखता है। [Trace Mode](/docs/devtools/wdio/trace-mode) देखें। |
| `traceFormat` | `'zip' \| 'ndjson-directory'` | `'zip'` | ट्रेस आर्टिफ़ैक्ट का लेआउट। केवल `mode: 'trace'` होने पर लागू होता है। |
| `traceGranularity` | `'session' \| 'spec' \| 'test'` | `'session'` | प्रति सेशन / spec फ़ाइल / टेस्ट एक ट्रेस। `'test'` हर एक को `test-results/<spec>-<title>-<browser>[-retryN]/trace.zip` में लिखता है। केवल `mode: 'trace'` होने पर लागू होता है। [Trace Mode](/docs/devtools/wdio/trace-mode#trace-granularity--tracegranularity) देखें। **चेतावनी:** BDD `describe/it` इंटरफ़ेस एक ही session-scoped स्लाइस में सिमट जाता है ([Per-test slicing](#per-test-slicing--the-bdd-describeit-caveat) देखें)। |
| `tracePolicy` | `'on' \| 'retain-on-failure' \| 'retain-on-first-failure' \| 'on-first-retry' \| 'on-all-retries' \| 'retain-on-failure-and-retries'` | `'on'` | कौन-से ट्रेस रखने हैं। `traceGranularity: 'test'` के साथ जोड़ा जाता है। केवल `mode: 'trace'` होने पर लागू होता है। |
| `filmstrip` | `boolean` | `true` | ट्रेस प्लेयर में scrub करने योग्य प्लेबैक के लिए ट्रेस में एक सघन, निरंतर स्क्रीनकास्ट फ़िल्मस्ट्रिप रिकॉर्ड करें — केवल प्रति एक्शन एक फ़्रेम नहीं। सेशन के लिए स्क्रीनकास्ट रिकॉर्डर (Nightwatch पर polling मोड) चलाता है। केवल `mode: 'trace'` होने पर लागू होता है। |
| `screenshot` | `'off' \| 'on' \| 'only-on-failure'` | `'off'` | प्रति-टेस्ट स्क्रीनशॉट। केवल ट्रेस मोड + `traceGranularity: 'test'`। **केवल-उत्पादन** — PNG ट्रेस आउटपुट डायरेक्टरी में लिखा जाता है (और `emitArtifactsManifest: true` होने पर manifest में); Allure से inline अटैच नहीं होता (नीचे नोट देखें)। |
| `video` | `'off' \| TraceRetentionPolicy` | `'off'` | प्रति-टेस्ट वीडियो स्लाइस, दी गई policy के अनुसार रखा जाता है (जैसे `'retain-on-failure'`)। केवल ट्रेस मोड + `traceGranularity: 'test'`। गैर-`off` मान स्वयं स्क्रीनकास्ट रिकॉर्डर शुरू कर देता है — आपको `filmstrip` या `screencast.enabled` की अलग से ज़रूरत **नहीं** है। **केवल-उत्पादन** — `.webm` ट्रेस आउटपुट डायरेक्टरी में लिखा जाता है (और `emitArtifactsManifest: true` होने पर manifest में); Allure से inline अटैच नहीं होता। |
| `emitArtifactsManifest` | `boolean` | `false` | ट्रेस के बगल में `devtools-artifacts-<sessionId>.json` manifest लिखें (वह सामान्य इंडेक्स जिसे reporters/CI उत्पादित आर्टिफ़ैक्ट खोजने के लिए उपयोग करते हैं)। **Nightwatch के लिए opt-in** — इसके पास auto-detect करने के लिए कोई live Allure सिग्नल नहीं है, इसलिए WDIO/Selenium के विपरीत यह कभी अपने आप सक्षम नहीं होता। केवल `mode: 'trace'` होने पर लागू होता है। |
| `captureAssertions` | `boolean` | `true` | assertions को ट्रेस एक्शन पंक्तियों के रूप में कैप्चर करें — `node:assert` तथा native `browser.assert`/`browser.verify`, नकारात्मक `.not.*` matchers सहित। बंद करने के लिए `false` सेट करें। |

> **Nightwatch के लिए inline Allure अटैचमेंट समर्थित नहीं है।** इसका आधिकारिक `nightwatch-allure` reporter post-hoc है (कोई live attach API नहीं), और Nightwatch रन में `allure-js-commons` का `attachment()` कुछ नहीं करता। इसलिए `screenshot` / `video` आर्टिफ़ैक्ट ट्रेस आउटपुट डायरेक्टरी में *उत्पादित* होते हैं (फ़ाइलें, तथा `emitArtifactsManifest: true` होने पर artifacts manifest) लेकिन किसी Allure टेस्ट से अटैच नहीं होते। प्रति-टेस्ट स्लाइसिंग — और इसलिए ये आर्टिफ़ैक्ट — Cucumber और exports-object इंटरफ़ेस के लिए सार्थक हैं; BDD `describe/it` इंटरफ़ेस session granularity में सिमट जाता है, इसलिए वहाँ प्रति-टेस्ट gate कुछ नहीं करता।

```js
globals: nightwatchDevtools({
  port: 3000,
  hostname: 'localhost',
  screencast: { enabled: true },
  bidi: true
})
```

## स्क्रीनकास्ट

ब्राउज़र सेशन का एक निरंतर `.webm` वीडियो रिकॉर्ड करें। रिकॉर्डिंग प्लगइन द्वारा देखे गए पहले सेशन पर शुरू होती है और Nightwatch के `after()` हुक में अंतिम रूप दी जाती है।

**केवल polling मोड।** Nightwatch, WebdriverIO (`browser.getPuppeteer()`) और Selenium (`driver.createCDPConnection`) की तरह कोई स्थिर CDP escape hatch उपलब्ध नहीं कराता, इसलिए स्क्रीनकास्ट एक निश्चित अंतराल पर `browser.takeScreenshot()` कॉल करके फ़्रेम कैप्चर करता है। यह Nightwatch द्वारा समर्थित हर ब्राउज़र पर काम करता है।

```js
globals: nightwatchDevtools({
  port: 3000,
  screencast: { enabled: true, pollIntervalMs: 200 }
})
```

| विकल्प | प्रकार | डिफ़ॉल्ट | नोट्स |
|--------|------|---------|-------|
| `enabled` | `boolean` | `false` | मुख्य स्विच। |
| `pollIntervalMs` | `number` | `200` | स्क्रीनशॉट अंतराल (ms)। कम = ज़्यादा स्मूद वीडियो, ज़्यादा WebDriver round-trips। 200 ms ≈ 5 fps। |
| `captureFormat` | `'jpeg' \| 'png'` | `'jpeg'` | अंतिम `.webm` mux से पहले ffmpeg encoder को दिया जाने वाला प्रति-फ़्रेम pixel format। polling मोड में स्रोत स्क्रीनशॉट हमेशा PNG के रूप में कैप्चर होते हैं, इसलिए यह कैप्चर को **नहीं** बदलता - केवल वह format बदलता है जो encoder को प्रति फ़्रेम मिलता है। |
| `maxWidth` / `maxHeight` / `quality` | - | - | केवल-CDP विकल्प, polling मोड में अनदेखा किए जाते हैं। WDIO/Selenium एडॉप्टर के साथ shape compatibility के लिए सूचीबद्ध हैं। |

**पूर्वापेक्षाएँ:** `fluent-ffmpeg` (पहले से ही पैकेज की runtime dependency) तथा PATH पर `ffmpeg` बाइनरी। macOS: `brew install ffmpeg`। Linux: `apt install ffmpeg`। ffmpeg के बिना भी रिकॉर्डर चलता है, लेकिन encode चरण एक चेतावनी लॉग करता है और फ़ाइल लिखना छोड़ देता है।

**आउटपुट:** वीडियो फ़ाइल अभी-अभी चली टेस्ट फ़ाइल के बगल में लिखी जाती है (fallback के रूप में `nightwatch.conf.*` डायरेक्टरी, फिर अंतिम उपाय के रूप में `process.cwd()`)। पूरा पाथ Nightwatch लॉग लाइन `📹 Screencast video: <path>` में दिखता है और वीडियो डैशबोर्ड के Screencast टैब में भी स्ट्रीम होता है।

स्क्रीनकास्ट फ़ीचर के पूर्ण संदर्भ (ब्राउज़र समर्थन, तीनों एडॉप्टर में आउटपुट पाथ) के लिए [Screencast पेज](/docs/devtools/wdio/screencast) देखें।

## BiDi कैप्चर (opt-in)

ब्राउज़र कंसोल संदेशों, JS exceptions और नेटवर्क रिक्वेस्ट के लिए WebDriver BiDi कैप्चर सक्षम करें। यह selenium-devtools द्वारा उपयोग किए जाने वाले पाथ के समतुल्य है - दोनों एडॉप्टर `@wdio/devtools-core` में एक ही attach लॉजिक साझा करते हैं।

```js
globals: nightwatchDevtools({
  port: 3000,
  bidi: true
})
```

आपको अपनी capabilities में `webSocketUrl: true` भी चाहिए ताकि chromedriver वास्तव में BiDi चैनल उपलब्ध कराए:

```js
desiredCapabilities: {
  browserName: 'chrome',
  webSocketUrl: true,                           // ← enables BiDi
  'goog:chromeOptions': { /* ... */ }
}
```

जब BiDi अटैच होता है, तो प्रति-कमांड Chrome performance-log नेटवर्क कैप्चर पाथ बंद कर दिया जाता है ताकि रिक्वेस्ट डैशबोर्ड में दो बार न दिखें। यदि `webSocketUrl` मौजूद नहीं है या chromedriver संस्करण BiDi उपलब्ध नहीं कराता, तो attach चुपचाप विफल हो जाता है और perf-log fallback काम करता रहता है।

## ट्रेस मोड

Headless कैप्चर पाथ — कोई DevTools UI विंडो नहीं खुलती। सेशन के अंत में एडॉप्टर एक पोर्टेबल `trace-<sessionId>.zip` (या डायरेक्टरी) को `test-results/` फ़ोल्डर में (resolved टेस्ट / config डायरेक्टरी के बगल में) लिखता है, जिसका shape WebdriverIO ट्रेस आर्टिफ़ैक्ट जैसा ही होता है।

```js
globals: nightwatchDevtools({
  mode: 'trace',
  traceFormat: 'ndjson-directory'  // optional; default 'zip'
})
```

### Granularity और Cucumber

`traceGranularity` यह चुनता है कि एक आर्टिफ़ैक्ट किसे कवर करता है — `'session'` (डिफ़ॉल्ट), `'spec'`, या `'test'`।

Nightwatch हर Cucumber scenario के बाद ब्राउज़र बंद कर देता है। एक `'session'` ट्रेस इन सबको समेटता है: पूरे रन के लिए एक zip, जिसमें हर scenario अपने feature के अंतर्गत nested होता है। `'test'` प्रति scenario एक zip उसके अपने फ़ोल्डर में लिखता है, जो Cucumber के लिए अनुशंसित है — छोटे आर्टिफ़ैक्ट, और वही granularity जिस पर `tracePolicy` retention आधारित होता है।

```js
globals: nightwatchDevtools({
  mode: 'trace',
  traceGranularity: 'test'  // one trace per Cucumber scenario
})
```

BDD `describe/it` इंटरफ़ेस पर, `'test'` एक ही session-scoped स्लाइस में सिमट जाता है: Nightwatch हर `it()` को आंतरिक रूप से चलाता है और प्लगइन के प्रति-टेस्ट हुक को प्रति मॉड्यूल केवल एक बार ट्रिगर करता है। एक्शन ट्री फिर भी हर `it` को उसके अपने समूह के रूप में दिखाती है।

ट्रेस मोड में बैकएंड port-bind, UI विंडो, और `screencast` विकल्प सभी छोड़ दिए जाते हैं। पूर्ण फ़ीचर संदर्भ (आर्टिफ़ैक्ट की सामग्री, viewer, मोबाइल टेस्टिंग, `zip` बनाम `ndjson-directory` कब चुनें) के लिए [Trace Mode पेज](/docs/devtools/wdio/trace-mode) देखें।

Nightwatch, WebdriverIO और Selenium एडॉप्टर के साथ एक ही ट्रेस पाइपलाइन साझा करता है, इसलिए आर्टिफ़ैक्ट का shape समान रहता है, चाहे उसे किसी भी एडॉप्टर ने बनाया हो। एक Nightwatch ट्रेस में पूरा प्रति-एक्शन कैप्चर होता है — एक स्क्रीनशॉट, depth-indented accessibility-tree स्नैपशॉट, interactable-element सूची, और Markdown ट्रांसक्रिप्ट — इसलिए यह `show-trace` प्लेयर में DOM/snapshot time-travel, **A11y** और **Transcript** टैब, pick-locator element overlay, और (Cucumber के लिए) **Feature → Scenario → Step** nesting के साथ खुलता है।

`@wdio/nightwatch-devtools` के साथ आने वाले `show-trace` bin से ट्रेस खोलें (किसी अतिरिक्त dependency की ज़रूरत नहीं):

```sh
npx show-trace test-results/trace-<sessionId>.zip   # in a project that installs the adapter
pnpm show-trace test-results/trace-<sessionId>.zip  # from the devtools monorepo
```

पूरी walkthrough और कीबोर्ड शॉर्टकट के लिए [Trace Player](/docs/devtools/trace-player) पेज देखें।

### प्रति-टेस्ट स्लाइसिंग और BDD `describe/it` चेतावनी

प्रति-टेस्ट विकल्पों — `traceGranularity: 'test'`, और इसके साथ जोड़े जाने वाले `tracePolicy`, `screenshot` और `video` विकल्पों — को हर टेस्ट का स्लाइस काटने के लिए एक प्रति-टेस्ट हुक की ज़रूरत होती है। **exports-object (mocha-style)** इंटरफ़ेस और **Cucumber** (प्रति-scenario हुक) यह उपलब्ध कराते हैं, इसलिए उन्हें वास्तविक प्रति-टेस्ट स्लाइसिंग मिलती है। **BDD `describe/it`** इंटरफ़ेस अपवाद है: Nightwatch हर `it()` को आंतरिक रूप से चलाता है और प्लगइन के प्रति-टेस्ट हुक को प्रति मॉड्यूल केवल एक बार ट्रिगर करता है, इसलिए `traceGranularity: 'test'` पहले टेस्ट से जुड़े एक ही **session-scoped** स्लाइस में सिमट जाता है। artifacts manifest फिर भी हर testcase को उसकी सही स्थिति के साथ सूचीबद्ध करता है; केवल प्रति-टेस्ट स्लाइस/आर्टिफ़ैक्ट keying सिमटती है। Session- और spec-granularity ट्रेस प्रभावित नहीं होते।

## उदाहरण

काम करने वाले उदाहरण repo की top-level `examples/` डायरेक्टरी में हैं। workspace को एक बार build करें (`pnpm install && pnpm build`), फिर repo root से चलाएँ:

| डायरेक्टरी | Runner | कमांड |
|-----------|--------|---------|
| [`examples/nightwatch/`](https://github.com/webdriverio/devtools/tree/main/examples/nightwatch) | Nightwatch mocha-style | `pnpm demo:nightwatch` |

## फ़ीचर्स

Nightwatch एडॉप्टर WebdriverIO जैसा ही DevTools UI अनुभव प्रदान करता है। नीचे दिया गया हर फ़ीचर बुनियादी `globals: nightwatchDevtools({ port: 3000 })` सेटअप के साथ अपने आप कैप्चर होता है — किसी प्रति-फ़ीचर config की ज़रूरत नहीं (नेटवर्क लॉग के लिए अतिरिक्त रूप से `'goog:loggingPrefs': { performance: 'ALL' }` चाहिए, जो [Setup](#setup) में दिखाया गया है)। लिंक हर फ़ीचर के पूर्ण संदर्भ पर ले जाते हैं।

- **[Interactive Test Rerunning & Visualization](/docs/devtools/wdio/interactive-test-rerunning)** - लाइव ब्राउज़र प्रीव्यू, प्रति-कमांड स्क्रीनशॉट, और एक-क्लिक में टेस्ट/सूट दोबारा चलाना
- **[Preserve & Rerun (Compare)](/docs/devtools/wdio/preserve-and-rerun)** - किसी विफल टेस्ट का स्नैपशॉट लें, उसे दोबारा चलाएँ, और दोनों रन का साथ-साथ diff देखें
- **[Multi-Framework Support](/docs/devtools/wdio/multi-framework-support)** - स्टैंडर्ड (mocha-style) और Cucumber/BDD runners
- **[Console Logs](/docs/devtools/wdio/console-logs)** - ब्राउज़र कंसोल आउटपुट कैप्चर और निरीक्षण करें (`bidi: true` के साथ रियल-टाइम)
- **[Network Logs](/docs/devtools/wdio/network-logs)** - API कॉल और नेटवर्क गतिविधि की निगरानी करें
- **[Metadata](/docs/devtools/wdio/metadata)** - प्रति ब्राउज़र सेशन session capabilities, environment, और timing
- **[TestLens](/docs/devtools/wdio/testlens)** - किसी भी कमांड से उस source line पर जाएँ जिसने उसे ट्रिगर किया
- **[Session Screencast](/docs/devtools/wdio/screencast)** - ब्राउज़र सेशन की निरंतर `.webm` रिकॉर्डिंग
- **[Trace Mode](/docs/devtools/wdio/trace-mode)** - Headless कैप्चर जो एक पोर्टेबल `trace.zip` बनाता है (कोई UI विंडो नहीं)

स्क्रीनकास्ट एकमात्र फ़ीचर है जिसके अपने विकल्प हैं (पूरी सूची [Screencast](#screencast) के अंतर्गत):

```js
globals: nightwatchDevtools({ port: 3000, screencast: { enabled: true, pollIntervalMs: 200 } })
```

## सीमाएँ

Nightwatch, WebdriverIO जितनी गहराई वाले framework हुक प्रदान नहीं करता, इसलिए WDIO DevTools सर्विस से कुछ अंतर हैं:

| सीमा | विवरण |
|-----------|--------|
| कोई native command हुक नहीं | Nightwatch में कोई `beforeCommand` / `afterCommand` हुक नहीं है। इसके बजाय कमांड एक browser proxy wrapper के माध्यम से intercept किए जाते हैं। |
| सीमित टेस्ट context | `browser.currentTest` WDIO runner context की तुलना में कम metadata देता है; टेस्ट नाम और फ़ाइल पाथ के लिए अतिरिक्त heuristics की ज़रूरत होती है। |
| सपाट suite nesting | Nightwatch मूल रूप से कई स्तरों तक nested `describe` blocks का समर्थन नहीं करता; प्लगइन अधिकतम दो स्तर रिपोर्ट करता है। |
| परिणामों की विलंबित उपलब्धता | टेस्ट परिणाम केवल `afterEach` में अंतिम रूप लेते हैं, टेस्ट के बीच में उपलब्ध नहीं होते। |
| स्क्रीनकास्ट केवल polling मोड में | WDIO (`browser.getPuppeteer()` के माध्यम से CDP push) और Selenium (`driver.createCDPConnection` के माध्यम से CDP push) के विपरीत, Nightwatch में स्थिर CDP escape hatch नहीं है, इसलिए फ़्रेम `browser.takeScreenshot()` की polling से कैप्चर होते हैं। Nightwatch द्वारा समर्थित हर ब्राउज़र पर काम करता है; polling अंतराल के अनुपात में प्रति-फ़्रेम थोड़ी लागत आती है। |
| प्रति-टेस्ट ट्रेस स्लाइसिंग (BDD `describe/it`) | BDD इंटरफ़ेस प्लगइन के प्रति-टेस्ट हुक को प्रति मॉड्यूल एक बार ट्रिगर करता है, इसलिए `traceGranularity: 'test'` एक session-scoped स्लाइस में सिमट जाता है। exports-object (mocha-style) और Cucumber इंटरफ़ेस को वास्तविक प्रति-टेस्ट स्लाइसिंग मिलती है। [Per-test slicing](#per-test-slicing--the-bdd-describeit-caveat) देखें। |
| केवल-उत्पादन ट्रेस आर्टिफ़ैक्ट | प्रति-टेस्ट `screenshot` / `video` फ़ाइलें ट्रेस आउटपुट डायरेक्टरी में लिखी जाती हैं (और `emitArtifactsManifest: true` होने पर manifest में) लेकिन Allure से inline अटैच नहीं होतीं — Nightwatch के पास कोई live Allure attach API नहीं है। |

WebdriverIO DevTools सर्विस के साथ कुल फ़ीचर समानता लगभग **80-90%** है।