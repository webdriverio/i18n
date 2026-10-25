---
id: trace-mode
title: ट्रेस मोड
description: "DevTools ट्रेस मोड के साथ हेडलेस ट्रेस आर्टिफ़ैक्ट कैप्चर करें और फ़ॉर्मेट, ग्रैन्युलैरिटी, रिटेंशन, स्क्रीनशॉट, वीडियो और असर्शन कॉन्फ़िगर करें।"
---

हेडलेस कैप्चर पाथ — कोई DevTools UI विंडो नहीं खुलती। सेशन के अंत में एडैप्टर ट्रेस आर्टिफ़ैक्ट्स को एक `test-results/` फ़ोल्डर में लिखता है: WebdriverIO के लिए `outputDir` (या `rootDir`) के अंतर्गत, और Selenium तथा Nightwatch के लिए टेस्ट फ़ाइल के बगल में; ऐसा न हो पाने पर कॉन्फ़िग डायरेक्टरी में, और फिर वर्तमान डायरेक्टरी में। `session` / `spec` ग्रैन्युलैरिटी के लिए यह एक `trace-<sessionId>.zip` (या एक `trace-<sessionId>/` डायरेक्टरी) होता है; `test` ग्रैन्युलैरिटी के लिए हर टेस्ट को अपना अलग सबफ़ोल्डर मिलता है ([ट्रेस ग्रैन्युलैरिटी](#trace-granularity--tracegranularity) देखें)। यह आर्टिफ़ैक्ट पोर्टेबल है और ऑफ़लाइन रीप्ले, AI-एजेंट डिफ़िंग, या किसी भी ऐसे उपभोक्ता के लिए आवश्यक सब कुछ साथ रखता है जो लाइव UI के बजाय फ़ाइल को प्राथमिकता देता है।

ट्रेस मोड **लाइव मोड के साथ परस्पर अनन्य है**। प्रति सेशन एक चुनें: इंटरैक्टिव रूप से डिबग करने वाले मनुष्यों को लाइव मोड चाहिए; रन की तुलना (diff) करने वाले एजेंट या आर्टिफ़ैक्ट्स एकत्र करने वाले CI बॉट्स को ट्रेस मोड चाहिए।

## सक्षम करें

```ts
// wdio.conf.ts
services: [
  [
    'devtools',
    {
      mode: 'trace',
      traceFormat: 'zip' // optional; 'zip' (default) | 'ndjson-directory'
    }
  ]
]
```

ट्रेस मोड के लिए WebDriver BiDi (Chrome 114+, Firefox 130+) आवश्यक है, जिसे WebdriverIO स्वचालित रूप से सक्षम करता है।

इसे आज़माने के लिए, mocha उदाहरण को ट्रेस मोड में `DEVTOOLS_MODE=trace pnpm demo:wdio:mocha` के साथ चलाएँ; प्रति-टेस्ट रिटेंशन के लिए `DEVTOOLS_TRACE_GRANULARITY=test DEVTOOLS_TRACE_POLICY=retain-on-failure` जोड़ें। कॉन्फ़िग [`examples/wdio/mocha/wdio.conf.ts`](https://github.com/webdriverio/devtools/blob/main/examples/wdio/mocha/wdio.conf.ts) है।

Selenium और Nightwatch भी यही ट्रेस पाइपलाइन प्रदान करते हैं — फ़्रेमवर्क-विशिष्ट सक्षम करने के सिंटैक्स के लिए उनके एडैप्टर पेज देखें: [Selenium](/docs/devtools/selenium#trace-mode) · [Nightwatch](/docs/devtools/nightwatch#trace-mode)।

## आर्टिफ़ैक्ट के अंदर क्या है

| फ़ाइल | सामग्री |
|---|---|
| `trace.trace` | NDJSON `context-options` + `before` / `after` एक्शन इवेंट्स; प्रति रिकॉर्ड एक पंक्ति |
| `trace.network` | HAR-शैली की नेटवर्क एंट्रीज़, प्रति पंक्ति एक; पेज के Resource Timing बफ़र से पढ़ी गई एंट्री (BiDi नहीं, जैसे Safari या Appium) में `_source: "resource-timing"` और `_resourceType` होते हैं |
| `trace.mutations` | DOM टाइम-ट्रैवल के पीछे की NDJSON DOM म्यूटेशन स्ट्रीम; कुछ भी कैप्चर न होने पर छोड़ दी जाती है |
| `transcript.md` | मनुष्य/LLM द्वारा पढ़ा जा सकने वाला Markdown सारांश, जिसमें टाइमिंग, सेलेक्टर्स और वैल्यू एनोटेशन होते हैं |
| `resources/page@<id>-<ts>.jpeg` | प्रत्येक यूज़र-फ़ेसिंग एक्शन पर लिया गया स्क्रीनशॉट |
| `resources/page@<id>-<ts>-elements.json` | उस एक्शन पर इंटरैक्ट करने योग्य एलिमेंट्स की फ़्लैट सूची |
| `resources/page@<id>-<ts>-snapshot.txt` | गहराई के अनुसार इंडेंट किया गया एक्सेसिबिलिटी-ट्री स्नैपशॉट (AI-अनुकूल) |
| `resources/<sha1>.jpeg` | सघन फ़िल्मस्ट्रिप फ़्रेम, कंटेंट-एड्रेस्ड |
| `resources/src@<sha1>.txt` | Source टैब के लिए कैप्चर किया गया टेस्ट सोर्स |
| `resources/<sha1>` | नेटवर्क रिस्पॉन्स बॉडीज़, कंटेंट-एड्रेस्ड |

### "एक्शन" किसे माना जाता है

ट्रेस एंट्रीज़ बनाने से पहले कमांड्स को एक allow-list से फ़िल्टर किया जाता है। ट्रेस में आने वाले उदाहरण:

- `url` / `get` → `Page.navigate`
- `click` → `Element.click`
- `setValue` / `sendKeys` → `Element.fill`
- `submit`, `clear`, `selectByVisibleText`, …

लोकेटर रिज़ॉल्यूशन (`$`, `$$`, `findElement(s)`), Selenium की `executeScript` पोलिंग और `setValue` द्वारा आंतरिक रूप से चलाया जाने वाला `clearValue` जानबूझकर बाहर रखे गए हैं: ये यूज़र-फ़ेसिंग इरादे को नहीं दर्शाते और टाइमलाइन में अनावश्यक शोर पैदा करेंगे। स्पष्ट वेट्स (`waitFor*`, `waitUntil`, Nightwatch `waitForElement*`), एलिमेंट रीड्स (`getText`, `isDisplayed`, …) और `execute` दिखाई देते हैं। allow-list [`packages/shared/src/trace-actions.ts`](https://github.com/webdriverio/devtools/blob/main/packages/shared/src/trace-actions.ts) में `ACTION_MAP` है।

## आउटपुट फ़ॉर्मेट — `traceFormat`

```ts
{
  mode: 'trace',
  traceFormat: 'zip' | 'ndjson-directory'  // default: 'zip'
}
```

- **`zip`** (डिफ़ॉल्ट) — `test-results/trace-<sessionId>.zip` पर एक एकल आर्काइव।
- **`ndjson-directory`** — वही फ़ाइलें `test-results/trace-<sessionId>/` में अनपैक की हुई। स्क्रिप्टेड या एजेंटिक उपभोक्ताओं के लिए unzip का एक चरण कम, जो NDJSON को सीधे grep / stream करना चाहते हैं।

`zip` फ़र्स्ट-पार्टी [`show-trace` प्लेयर](/docs/devtools/trace-player) में खुलता है; `ndjson-directory` ट्रेस अन्य संगत ट्रेस व्यूअर्स में खुलता है, या `show-trace` में खोलने के लिए पहले उसे zip करें।

## ट्रेस ग्रैन्युलैरिटी — `traceGranularity`

एक रन कितने ट्रेस आर्टिफ़ैक्ट्स बनाता है:

```ts
{
  mode: 'trace',
  traceGranularity: 'session' | 'spec' | 'test' // default: 'session'
}
```

| वैल्यू | आउटपुट |
|---|---|
| `session` (डिफ़ॉल्ट) | प्रति वर्कर/सेशन एक ट्रेस — `test-results/trace-<sessionId>.zip`। |
| `spec` | प्रति spec फ़ाइल एक ट्रेस, `test-results/trace-<spec>-<hash>-<sessionId8>.zip` पर। छोटा, नेविगेट करने में आसान। |
| `test` | **प्रति टेस्ट** एक ट्रेस, प्रत्येक अपने फ़ोल्डर में: `test-results/<spec>-<title>-<browser>[-retry<N>]/trace.zip`। |

`test` ग्रैन्युलैरिटी के लिए फ़ोल्डर का नाम spec के बेसनेम, टेस्ट टाइटल के slug, ब्राउज़र, और रीट्राई किए गए प्रयासों पर `-retry<N>` प्रत्यय से बनाया जाता है — जैसे `test-results/login_e2e-logs-in-chrome/trace.zip`, और पहला रीट्राई `test-results/login_e2e-logs-in-chrome-retry1/trace.zip` पर। प्रति-टेस्ट ट्रेस सबसे अधिक नेविगेट करने योग्य होते हैं और रिटेंशन पॉलिसी के साथ सबसे अच्छे काम करते हैं, ताकि केवल वही ट्रेस लिखे जाएँ जिनकी आपको परवाह है।

## रिटेंशन — `tracePolicy`

डिफ़ॉल्ट रूप से हर ट्रेस रखा जाता है (`'on'`)। केवल दिलचस्प ट्रेस रखने के लिए — `traceGranularity: 'test'` के साथ आदर्श:

```ts
{
  mode: 'trace',
  traceGranularity: 'test',
  tracePolicy: 'retain-on-failure' // default: 'on'
}
```

| पॉलिसी | ट्रेस तब रखा जाता है जब… |
|---|---|
| `'on'` (डिफ़ॉल्ट) | हमेशा — हर ट्रेस लिखा जाता है। |
| `'retain-on-failure'` | टेस्ट का **अंतिम** प्रयास विफल हुआ। fail-then-pass रीट्राई क्रम `passed` पर समाप्त होता है, इसलिए वह *नहीं* रखा जाता — आप उस flaky टेस्ट को अनावश्यक रूप से नहीं रखते जो अंततः पास हो गया। |
| `'retain-on-first-failure'` | **प्रयास 0** विफल हुआ, भले ही बाद का रीट्राई पास हुआ हो या नहीं। |
| `'on-first-retry'` | टेस्ट को कम से कम एक बार रीट्राई किया गया (प्रयास 1 मौजूद है)। |
| `'on-all-retries'` | कोई भी रीट्राई किया गया प्रयास (प्रयास ≥ 1) मौजूद है। |
| `'retain-on-failure-and-retries'` | अंतिम प्रयास विफल हुआ **या** टेस्ट को रीट्राई किया गया। |

जिस स्लाइस को न रखने का निर्णय होता है, वह कभी डिस्क पर नहीं लिखा जाता। रीट्राई-अवेयर पॉलिसियाँ प्रति-प्रयास एक **आउटकम लेजर** पर आधारित होती हैं, जिसे एडैप्टर प्रत्येक रीट्राई-स्थिर टेस्ट id के लिए रखता है, ताकि `retain-on-failure` और `retain-on-first-failure` सही प्रयास का मूल्यांकन करें। जहाँ कोई रनर प्रति-प्रयास रीट्राई जानकारी उजागर नहीं करता, वहाँ `retain-on-failure` को छोड़कर हर पॉलिसी `retain-on-failure` में बदल जाती है; जिस रन में कोई परिणाम दर्ज नहीं होता (जैसे एक साधारण स्टैंडअलोन स्क्रिप्ट), वह **open** फ़ेल होता है और ट्रेस रख लेता है, बजाय इसके कि आपको जिसकी ज़रूरत हो उसे खोने का जोखिम लिया जाए।

> रीट्राई-अवेयर रिटेंशन **WebdriverIO** (mocha / cucumber) और **Selenium** (mocha) के लिए एंड-टू-एंड सत्यापित है। **Nightwatch** के लिए, `retain-on-failure` काम करता है, लेकिन अन्य रीट्राई-अवेयर पॉलिसियाँ इसी में बदल जाती हैं क्योंकि Nightwatch का `--retries` प्रति-टेस्ट हुक्स को दोबारा चलाए बिना टेस्टकेस को आंतरिक रूप से फिर से चलाता है। WDIO का क्रॉस-प्रोसेस `specFileRetries` भी (प्रति-वर्कर) लेजर के दायरे से बाहर है। विशिष्ट विवरण के लिए [Nightwatch एडैप्टर पेज](/docs/devtools/nightwatch#trace-mode) देखें।

## सघन फ़िल्मस्ट्रिप — `filmstrip`

**डिफ़ॉल्ट रूप से** ट्रेस एक **सघन, निरंतर** स्क्रीनकास्ट रिकॉर्ड करता है ताकि प्लेयर फ़्रेम-दर-फ़्रेम कूदने के बजाय सुचारू प्लेबैक स्क्रब करे। सघन फ़्रेम प्रति-एक्शन फ़्रेम्स (जिनमें DOM स्नैपशॉट होते हैं) के साथ रहते हैं। प्रति एक्शन केवल एक फ़्रेम रिकॉर्ड करने के लिए `filmstrip: false` सेट करें — बिना निरंतर रिकॉर्डर के एक छोटा ट्रेस:

```ts
{
  mode: 'trace',
  filmstrip: false // opt out — one frame per action (default is true)
}
```

- सघन फ़्रेम प्रति-एक्शन फ़्रेम्स (जिनमें DOM स्नैपशॉट होते हैं) के **साथ** जोड़े जाते हैं, इसलिए कोई DOM डेटा नहीं खोता — जब सघन फ़्रेम मौजूद होते हैं तो स्क्रबिंग के लिए वे विरल प्रति-एक्शन फ़िल्मस्ट्रिप का स्थान ले लेते हैं।
- एक्सपोर्ट के समय फ़्रेम्स को कम किया जाता है (≥100 ms के अंतर पर) और कंटेंट-एड्रेस्ड किया जाता है, इसलिए समान फ़्रेम (एक स्थिर वेट) एक ही रिसोर्स में सिमट जाते हैं। लाइव सेशन बफ़र `screencast.maxBufferFrames` (डिफ़ॉल्ट 2000) द्वारा सीमित है।
- रिकॉर्डिंग स्क्रीनकास्ट रिकॉर्डर का उपयोग करती है — Chrome/Chromium पर CDP push, अन्यत्र स्क्रीनशॉट पोलिंग। गैर-Chrome ब्राउज़र्स पर पोलिंग कई `takeScreenshot` कमांड्स जारी करती है; इसे अपने रिपोर्टर के स्टेप-साइलेंसिंग विकल्प के साथ उपयोग करें ([Allure इंटीग्रेशन](/docs/devtools/allure) देखें)।

`filmstrip` तीनों एडैप्टर्स (WebdriverIO / Selenium / Nightwatch) पर उपलब्ध है।

## प्रति-टेस्ट स्क्रीनशॉट और वीडियो — `screenshot` / `video`

`traceGranularity: 'test'` पर प्रत्येक टेस्ट एक स्टैंडअलोन स्क्रीनशॉट और/या एक प्रति-टेस्ट वीडियो स्लाइस भी बना सकता है, जो परिचित screenshot/video-on-failure सुविधा के समान है:

```ts
{
  mode: 'trace',
  traceGranularity: 'test',
  screenshot: 'only-on-failure', // 'off' (default) | 'on' | 'only-on-failure'
  video: 'retain-on-failure'     // 'off' (default) | any tracePolicy value
}
```

| विकल्प | वैल्यूज़ | व्यवहार |
|---|---|---|
| `screenshot` | `'off'` (डिफ़ॉल्ट) · `'on'` · `'only-on-failure'` | `'on'` हर टेस्ट के बाद कैप्चर करता है; `'only-on-failure'` केवल विफल टेस्ट के बाद। PNG। |
| `video` | `'off'` (डिफ़ॉल्ट) · कोई भी `tracePolicy` वैल्यू | स्क्रीनकास्ट को निरंतर रिकॉर्ड करता है और प्रत्येक टेस्ट के स्लाइस को `tracePolicy` के समान रिटेंशन नियमों के अनुसार रखता है। WebM; एन्कोडिंग के लिए `PATH` पर `ffmpeg` आवश्यक है। गैर-`off` वैल्यू सेट करने से रिकॉर्डर अपने आप शुरू हो जाता है — आपको अलग से `filmstrip` या `screencast.enabled` की ज़रूरत नहीं है। |

दोनों ट्रेस मोड + `traceGranularity: 'test'` (वह प्रति-टेस्ट दायरा जिससे ये जुड़ते हैं) तक सीमित हैं। अधिक मोटी ग्रैन्युलैरिटी पर ये कुछ नहीं करते।

- **WebdriverIO** — `screenshot` / `video` सर्विस विकल्प हैं; `@wdio/allure-reporter` मौजूद होने पर Allure में इनलाइन संलग्न किए जाते हैं।
- **Selenium** — इसके `DevToolsOptions` पर वही विकल्प; Allure रनर एडैप्टर सक्रिय होने पर `allure-js-commons` के माध्यम से Allure में इनलाइन संलग्न किए जाते हैं।
- **Nightwatch** — **केवल-उत्पादन**: फ़ाइलें ट्रेस आउटपुट डायरेक्टरी में लिखी जाती हैं (और मैनिफ़ेस्ट में सूचीबद्ध होती हैं), लेकिन Allure में इनलाइन संलग्न नहीं की जातीं — Nightwatch के पास कोई लाइव Allure attach API नहीं है। [ट्रेस मोड की सीमाएँ](/docs/devtools/limitations) देखें।

> `screencast.enabled` अलग **लाइव-मोड** निरंतर `.webm` रिकॉर्डिंग है और ट्रेस मोड में अनदेखा किया जाता है। ट्रेस मोड में `filmstrip` (ट्रेस में सघन फ़्रेम) या प्रति-टेस्ट `video` का उपयोग करें; स्क्रीनकास्ट ट्यूनिंग फ़ील्ड्स (`quality`, `maxWidth`, `pollIntervalMs`, …) फिर भी जो भी रिकॉर्डर चलता है उस पर लागू होते हैं।

## आर्टिफ़ैक्ट्स मैनिफ़ेस्ट — `emitArtifactsManifest`

ट्रेस के बगल में एक `devtools-artifacts-<sessionId>.json` लिखता है — एक सामान्य इंडेक्स जिसका उपयोग रिपोर्टर्स और CI उत्पादित आर्टिफ़ैक्ट्स (हर ट्रेस / स्क्रीनशॉट / वीडियो, साथ ही प्रत्येक टेस्ट की स्थिति) खोजने के लिए करते हैं:

```ts
{
  mode: 'trace',
  emitArtifactsManifest: true // default: off; auto-on when Allure is detected
}
```

- **डिफ़ॉल्ट रूप से बंद।** Allure रिपोर्टर का पता चलने पर यह **स्वचालित रूप से सक्षम** हो जाता है — कॉन्फ़िग में WebdriverIO का `@wdio/allure-reporter`, या एक सक्रिय Selenium `allure-js-commons` रनटाइम।
- **Nightwatch में ऑप्ट-इन है**: इसके पास स्वतः पता लगाने के लिए कोई लाइव Allure संकेत नहीं है (`nightwatch-allure` बाद में चलता है), इसलिए यह कभी स्वचालित रूप से सक्षम नहीं होता — यदि आपको मैनिफ़ेस्ट चाहिए तो इसे स्पष्ट रूप से सेट करें।

## असर्शन — `captureAssertions`

असर्शन ट्रेस में प्रथम-श्रेणी की एक्शन पंक्तियों के रूप में दिखाई देते हैं (डिफ़ॉल्ट रूप से चालू; बंद करने के लिए `captureAssertions: false` सेट करें):

- **`node:assert`** — तीनों एडैप्टर्स में `assert.<method>` पंक्तियों के रूप में कैप्चर किया जाता है।
- **WebdriverIO `expect`** — पास *और* फ़ेल होने वाले `expect(...)` मैचर्स (`expect($el).toHaveText(...)`, `toBeExisting()`, …) `expect.<matcher>` पंक्तियों के रूप में दिखाई देते हैं, जिनमें अपेक्षित वैल्यू, एलिमेंट का सोर्स लोकेशन और एक स्नैपशॉट होता है; मैचर की आंतरिक पोलिंग कमांड्स दबा दी जाती हैं ताकि केवल असर्शन दिखे।
- **Nightwatch `browser.assert.*` / `browser.verify.*`** — नेटिव असर्शन `assert.<m>` / `verify.<m>` पंक्तियों के रूप में दिखाई देते हैं।

पास होने वाले असर्शन हरे रंग में दिखते हैं; विफल होने वाले त्रुटि संदेश के साथ लाल रंग में दिखते हैं।

## मोबाइल टेस्टिंग

Appium सेशन लाइव और ट्रेस मोड में कैप्चर किए जाते हैं। भेद करने वाला कारक कैपेबिलिटीज़ में **ब्राउज़र नाम** है, डिवाइस नहीं:

- **मोबाइल वेब** (Android पर Chrome, iOS पर Safari): डेस्कटॉप जैसी ही DOM-आधारित स्नैपशॉट पाइपलाइन।
- **नेटिव ऐप** (कोई `browserName` नहीं): पेज में इंजेक्ट की जाने वाली DOM स्क्रिप्ट्स बंद रहती हैं; इसके बजाय Appium XML ट्री स्नैपशॉट सीरियलाइज़र को डेटा देता है।
- **हाइब्रिड ऐप**: केवल WebdriverIO सेशन को उसके webview में फ़ॉलो करता है; अन्य एडैप्टर्स स्टार्टअप कैपेबिलिटीज़ से निर्णय लेते हैं।

ट्रेस का `context-options` प्लेटफ़ॉर्म, मॉडल और OS संस्करण रिकॉर्ड करता है ताकि व्यूअर फ़्रेम्स को सही ढंग से लेबल करे। उदाहरण `pnpm demo:wdio:mobile` (साथ ही `:selenium:mobile`, `:nightwatch:mobile`, `:python:mobile`) के साथ चलाएँ। पूर्ण संदर्भ के लिए **[मोबाइल टेस्टिंग](/docs/devtools/mobile)** देखें।

## आर्टिफ़ैक्ट देखना

ट्रेस को फ़र्स्ट-पार्टी **[Trace Player](/docs/devtools/trace-player)** में खोलें — एक समर्पित रीड-ओनली प्लेयर मोड में WebdriverIO DevTools UI:

```sh
show-trace trace-<sessionId>.zip          # bin on PATH after install
npx show-trace trace-<sessionId>.zip      # or via npx
```

प्लेयर आपको DOM टाइम-ट्रैवल, A11y टैब और pick-locator ओवरले, Copy-for-LLM के साथ Transcript टैब, Errors / Console / Network / Source डॉक टैब्स, और एक स्क्रब करने योग्य टाइमलाइन देता है। वही पोर्टेबल `.zip` अन्य स्टैंडअलोन ट्रेस व्यूअर्स में और Allure रिपोर्ट के एम्बेडेड व्यूअर के अंदर भी खुलता है। पूरे walkthrough, सुविधाओं और कीबोर्ड शॉर्टकट्स के लिए **[Trace Player](/docs/devtools/trace-player)** पेज देखें।

## A11y टैब में लोकेटर्स

प्रत्येक एडैप्टर द्वारा प्रदान किया गया `show-trace` bin उसी आर्काइव को DevTools प्लेयर में खोलता है, जो अतिरिक्त रूप से एक **A11y टैब** उपलब्ध कराता है: प्रति एक्शन कैप्चर किया गया एक्सेसिबिलिटी ट्री, जहाँ किसी पंक्ति पर क्लिक करने से उस एलिमेंट का लोकेटर कॉपी हो जाता है।

ये लोकेटर्स रिकॉर्ड करने वाले रनर की अपनी शैली में लिखे जाते हैं, इसलिए इन्हें सीधे उसी फ़्रेमवर्क में पेस्ट किया जा सकता है जिसने ट्रेस बनाया। केवल अपने टेक्स्ट से पहचाना जाने वाला एलिमेंट WebdriverIO में `a*=Logout` और Selenium में `//a[contains(., "Logout")]` होता है — इसे रिज़ॉल्व करने वाले कॉल `By.xpath()` के कैप्शन के साथ। Nightwatch `button[type="submit"]` जैसे नेटिव CSS लोकेटर को प्राथमिकता देता है, क्योंकि यह एकमात्र रनर है जो डिफ़ॉल्ट CSS स्ट्रैटेजी के तहत एक साधारण सेलेक्टर स्ट्रिंग पढ़ता है, और केवल तभी XPath (कैप्शन `useXpath()` / `locateStrategy: 'xpath'`) पर लौटता है जब कोई अद्वितीय CSS लोकेटर मौजूद न हो। अन्य सभी लोकेटर्स पोर्टेबल CSS हैं।

LLM / एजेंट द्वारा उपयोग के लिए, सीधे `transcript.md` पढ़ें — यह सेलेक्टर्स और वैल्यूज़ के साथ एक्शन्स का संक्षिप्त Markdown रेंडरिंग है।

## और जानें

- **[Trace Player](/docs/devtools/trace-player)** — पूरा `show-trace` प्लेयर walkthrough, सुविधाएँ और कीबोर्ड शॉर्टकट्स।
- **[Allure इंटीग्रेशन](/docs/devtools/allure)** — ट्रेस / स्क्रीनशॉट / वीडियो आर्टिफ़ैक्ट्स Allure रिपोर्ट से कैसे जुड़ते हैं।
- **[क्रॉस-फ़्रेमवर्क सपोर्ट](/docs/devtools/cross-framework)** — प्रति-एडैप्टर क्षमता मैट्रिक्स (WebdriverIO / Selenium / Nightwatch)।
- **[ट्रेस मोड की सीमाएँ](/docs/devtools/limitations)** — ट्रेस मोड क्या छोड़ता है और प्रति-एडैप्टर ज्ञात कमियाँ।
- **[कॉन्फ़िगरेशन संदर्भ](/docs/devtools/reference)** — एक नज़र में हर विकल्प।