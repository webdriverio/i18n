---
id: trace-mode
title: ट्रेस मोड
description: "DevTools ट्रेस मोड के साथ हेडलेस ट्रेस आर्टिफैक्ट्स कैप्चर करें और फ़ॉर्मेट, ग्रैन्युलैरिटी, रिटेंशन, स्क्रीनशॉट, वीडियो और असर्शन कॉन्फ़िगर करें।"
---

हेडलेस कैप्चर पाथ — कोई DevTools UI विंडो नहीं खुलती। सेशन के अंत में एडैप्टर आपकी spec / config डायरेक्टरी के बगल में एक `test-results/` फ़ोल्डर में ट्रेस आर्टिफैक्ट्स लिखता है। `session` / `spec` ग्रैन्युलैरिटी के लिए यह एक `trace-<sessionId>.zip` (या एक `trace-<sessionId>/` डायरेक्टरी) होता है; `test` ग्रैन्युलैरिटी के लिए हर टेस्ट को अपना अलग सबफ़ोल्डर मिलता है (देखें [ट्रेस ग्रैन्युलैरिटी](#trace-granularity--tracegranularity))। यह आर्टिफैक्ट पोर्टेबल है और इसमें ऑफ़लाइन रीप्ले, AI-एजेंट डिफ़िंग, या किसी भी ऐसे उपभोक्ता के लिए आवश्यक सब कुछ शामिल होता है जो लाइव UI के बजाय फ़ाइल को प्राथमिकता देता है।

ट्रेस मोड **लाइव मोड के साथ परस्पर अनन्य (mutually exclusive)** है। प्रति सेशन एक चुनें: इंटरैक्टिव रूप से डीबग करने वाले लोगों को लाइव मोड चाहिए; रन की तुलना करने वाले एजेंट्स या आर्टिफैक्ट्स इकट्ठा करने वाले CI बॉट्स को ट्रेस मोड चाहिए।

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

एक पूर्ण, कॉपी-पेस्ट करने योग्य रेफ़रेंस कॉन्फ़िग [`examples/wdio/wdio.trace.conf.ts`](https://github.com/webdriverio/devtools/blob/main/examples/wdio/wdio.trace.conf.ts) पर उपलब्ध है।

Selenium और Nightwatch भी वही ट्रेस पाइपलाइन प्रदान करते हैं — फ़्रेमवर्क-विशिष्ट सक्षम करने के सिंटैक्स के लिए उनके एडैप्टर पेज देखें: [Selenium](/docs/devtools/selenium#trace-mode) · [Nightwatch](/docs/devtools/nightwatch#trace-mode)।

## आर्टिफैक्ट के अंदर क्या है

| फ़ाइल | सामग्री |
|---|---|
| `trace.trace` | NDJSON `context-options` + `before` / `after` एक्शन इवेंट्स; प्रति रिकॉर्ड एक लाइन |
| `trace.network` | HAR-शैली की नेटवर्क एंट्रीज़, प्रति लाइन एक |
| `transcript.md` | टाइमिंग, सेलेक्टर्स, वैल्यू एनोटेशन के साथ मनुष्य/LLM द्वारा पढ़ने योग्य Markdown सारांश |
| `resources/page@<id>-<ts>.jpeg` | हर यूज़र-फ़ेसिंग एक्शन पर लिया गया स्क्रीनशॉट |
| `resources/page@<id>-<ts>-elements.json` | उस एक्शन पर इंटरैक्ट करने योग्य एलिमेंट्स की फ़्लैट सूची |
| `resources/page@<id>-<ts>-snapshot.txt` | डेप्थ-इंडेंटेड एक्सेसिबिलिटी-ट्री स्नैपशॉट (AI-अनुकूल) |

### "एक्शन" किसे माना जाता है

ट्रेस एंट्रीज़ बनाने से पहले कमांड्स को एक अलाउ-लिस्ट से फ़िल्टर किया जाता है। ट्रेस में आने वाले उदाहरण:

- `url` / `get` → `Page.navigate`
- `click` → `Element.click`
- `setValue` / `sendKeys` → `Element.fill`
- `submit`, `clear`, `selectByVisibleText`, …

`findElement`, `waitUntil`, `executeScript` जैसे आंतरिक कमांड्स को जानबूझकर बाहर रखा गया है — वे यूज़र-फ़ेसिंग इरादे को नहीं दर्शाते और टाइमलाइन में अनावश्यक शोर बढ़ाते। पूरी अलाउ-लिस्ट [`@wdio/devtools-core/action-mapping.ts`](https://github.com/webdriverio/devtools/blob/main/packages/core/src/action-mapping.ts) में है।

## आउटपुट फ़ॉर्मेट — `traceFormat`

```ts
{
  mode: 'trace',
  traceFormat: 'zip' | 'ndjson-directory'  // default: 'zip'
}
```

- **`zip`** (डिफ़ॉल्ट) — `test-results/trace-<sessionId>.zip` पर एक एकल आर्काइव।
- **`ndjson-directory`** — वही फ़ाइलें `test-results/trace-<sessionId>/` में अनपैक की हुई। स्क्रिप्टेड या एजेंटिक उपभोक्ताओं के लिए एक unzip स्टेप कम, जो NDJSON को सीधे grep / स्ट्रीम करना चाहते हैं।

दोनों फ़ॉर्मेट फ़र्स्ट-पार्टी [`show-trace` प्लेयर](/docs/devtools/trace-player) और अन्य संगत ट्रेस व्यूअर्स में खुलते हैं।

## ट्रेस ग्रैन्युलैरिटी — `traceGranularity`

एक रन कितने ट्रेस आर्टिफैक्ट्स बनाता है:

```ts
{
  mode: 'trace',
  traceGranularity: 'session' | 'spec' | 'test' // default: 'session'
}
```

| वैल्यू | आउटपुट |
|---|---|
| `session` (डिफ़ॉल्ट) | प्रति वर्कर/सेशन एक ट्रेस — `test-results/trace-<sessionId>.zip`। |
| `spec` | प्रति spec फ़ाइल एक ट्रेस। छोटा, नेविगेट करने में आसान। |
| `test` | **प्रति टेस्ट** एक ट्रेस, हर एक अपने फ़ोल्डर में: `test-results/<spec>-<title>-<browser>[-retry<N>]/trace.zip`। |

`test` ग्रैन्युलैरिटी के लिए फ़ोल्डर का नाम spec के बेसनेम, टेस्ट टाइटल के स्लग, ब्राउज़र, और दोबारा किए गए प्रयासों पर `-retry<N>` सफ़िक्स से बनता है — उदा. `test-results/login_e2e-logs-in-chrome/trace.zip`, और पहला retry `test-results/login_e2e-logs-in-chrome-retry1/trace.zip` पर। प्रति-टेस्ट ट्रेस सबसे अधिक नेविगेट करने योग्य होते हैं और रिटेंशन पॉलिसी के साथ सबसे अच्छे काम करते हैं, ताकि केवल वही ट्रेस लिखे जाएँ जिनकी आपको परवाह है।

## रिटेंशन — `tracePolicy`

डिफ़ॉल्ट रूप से हर ट्रेस रखा जाता है (`'on'`)। केवल रोचक ट्रेस रखने के लिए — `traceGranularity: 'test'` के साथ आदर्श:

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
| `'retain-on-failure'` | टेस्ट का **अंतिम** प्रयास विफल हुआ। fail-then-pass retry क्रम `passed` पर समाप्त होता है, इसलिए उसे *नहीं* रखा जाता — आप ऐसे flake को ज़रूरत से ज़्यादा नहीं रखते जो अंततः सफल हो गया। |
| `'retain-on-first-failure'` | **प्रयास 0** विफल हुआ, चाहे बाद का retry सफल हुआ हो या नहीं। |
| `'on-first-retry'` | टेस्ट को कम से कम एक बार दोबारा चलाया गया (प्रयास 1 मौजूद है)। |
| `'on-all-retries'` | कोई भी दोबारा किया गया प्रयास (प्रयास ≥ 1) मौजूद है। |
| `'retain-on-failure-and-retries'` | अंतिम प्रयास विफल हुआ **या** टेस्ट को दोबारा चलाया गया। |

न रखे जाने वाले स्लाइस का निर्णय पहले ही हो जाता है और उसे कभी डिस्क पर नहीं लिखा जाता। retry-अवेयर पॉलिसीज़ एक प्रति-प्रयास **outcome ledger** पर आधारित होती हैं जिसे एडैप्टर हर retry-स्थिर टेस्ट id के लिए रखता है, ताकि `retain-on-failure` और `retain-on-first-failure` सही प्रयास का मूल्यांकन करें। जहाँ कोई रनर प्रति-प्रयास retry जानकारी उपलब्ध नहीं कराता, वहाँ `retain-on-failure` को छोड़कर हर पॉलिसी `retain-on-failure` में बदल जाती है; जिस रन में कोई परिणाम दर्ज नहीं हुआ (उदा. एक साधारण स्टैंडअलोन स्क्रिप्ट) वह **open** विफल होता है और ज़रूरी ट्रेस खोने का जोखिम उठाने के बजाय ट्रेस को रख लेता है।

> retry-अवेयर रिटेंशन को **WebdriverIO** (mocha / cucumber) और **Selenium** (mocha) के लिए एंड-टू-एंड सत्यापित किया गया है। **Nightwatch** के लिए `retain-on-failure` काम करता है, लेकिन अन्य retry-अवेयर पॉलिसीज़ उसी में बदल जाती हैं क्योंकि Nightwatch का `--retries` प्रति-टेस्ट हुक्स को दोबारा ट्रिगर किए बिना टेस्टकेस को आंतरिक रूप से दोबारा चलाता है। WDIO का क्रॉस-प्रोसेस `specFileRetries` भी (प्रति-वर्कर) ledger के दायरे से बाहर है। विवरण के लिए [Nightwatch एडैप्टर पेज](/docs/devtools/nightwatch#trace-mode) देखें।

## सघन फ़िल्मस्ट्रिप — `filmstrip`

**डिफ़ॉल्ट रूप से** ट्रेस एक **सघन, निरंतर** स्क्रीनकास्ट रिकॉर्ड करता है ताकि प्लेयर फ़्रेम-दर-फ़्रेम कूदने के बजाय सहज प्लेबैक के साथ स्क्रब करे। सघन फ़्रेम्स प्रति-एक्शन फ़्रेम्स (जिनमें DOM स्नैपशॉट होते हैं) के साथ मौजूद रहते हैं। केवल प्रति एक्शन एक फ़्रेम रिकॉर्ड करने के लिए `filmstrip: false` सेट करें — बिना निरंतर रिकॉर्डर के एक छोटा ट्रेस:

```ts
{
  mode: 'trace',
  filmstrip: false // opt out — one frame per action (default is true)
}
```

- सघन फ़्रेम्स प्रति-एक्शन फ़्रेम्स (जिनमें DOM स्नैपशॉट होते हैं) के **साथ-साथ** जोड़े जाते हैं, इसलिए कोई DOM डेटा नहीं खोता — जब सघन फ़्रेम्स मौजूद होते हैं तो स्क्रबिंग के लिए वे विरल प्रति-एक्शन फ़िल्मस्ट्रिप का स्थान ले लेते हैं।
- एक्सपोर्ट के समय फ़्रेम्स को कम किया जाता है (≥100 ms के अंतर पर) और कंटेंट-एड्रेस किया जाता है, इसलिए एक जैसे फ़्रेम्स (एक स्थिर प्रतीक्षा) एक ही रिसोर्स में सिमट जाते हैं। लाइव सेशन बफ़र `screencast.maxBufferFrames` (डिफ़ॉल्ट 2000) द्वारा सीमित है।
- रिकॉर्डिंग स्क्रीनकास्ट रिकॉर्डर का उपयोग करती है — Chrome/Chromium पर CDP push, अन्यत्र स्क्रीनशॉट पोलिंग। गैर-Chrome ब्राउज़र्स पर पोलिंग कई `takeScreenshot` कमांड्स भेजती है; इसे अपने रिपोर्टर के स्टेप-साइलेंसिंग विकल्प के साथ उपयोग करें (देखें [Allure इंटीग्रेशन](/docs/devtools/allure))।

`filmstrip` तीनों एडैप्टर्स (WebdriverIO / Selenium / Nightwatch) पर उपलब्ध है।

## प्रति-टेस्ट स्क्रीनशॉट और वीडियो — `screenshot` / `video`

`traceGranularity: 'test'` पर हर टेस्ट एक स्टैंडअलोन स्क्रीनशॉट और/या एक प्रति-टेस्ट वीडियो स्लाइस भी बना सकता है, जो परिचित screenshot/video-on-failure सुविधा के समान है:

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
| `video` | `'off'` (डिफ़ॉल्ट) · कोई भी `tracePolicy` वैल्यू | स्क्रीनकास्ट को निरंतर रिकॉर्ड करता है और हर टेस्ट का स्लाइस `tracePolicy` के समान रिटेंशन नियमों के अनुसार रखता है। WebM। गैर-`off` वैल्यू सेट करने पर रिकॉर्डर अपने आप शुरू हो जाता है — आपको `filmstrip` या `screencast.enabled` की अलग से ज़रूरत नहीं है। |

दोनों ट्रेस मोड + `traceGranularity: 'test'` (वह प्रति-टेस्ट स्कोप जिससे ये जुड़ते हैं) तक सीमित हैं। मोटी ग्रैन्युलैरिटी पर ये कुछ नहीं करते।

- **WebdriverIO** — `screenshot` / `video` सर्विस विकल्प हैं; `@wdio/allure-reporter` मौजूद होने पर Allure से इनलाइन जुड़ जाते हैं।
- **Selenium** — इसके `DevToolsOptions` पर वही विकल्प; Allure रनर एडैप्टर सक्रिय होने पर `allure-js-commons` के माध्यम से Allure से इनलाइन जुड़ जाते हैं।
- **Nightwatch** — **केवल-उत्पादन (produce-only)**: फ़ाइलें ट्रेस आउटपुट डायरेक्टरी में लिखी जाती हैं (और मैनिफ़ेस्ट में सूचीबद्ध होती हैं), लेकिन Allure से इनलाइन नहीं जुड़तीं — Nightwatch में कोई लाइव Allure attach API नहीं है। देखें [ट्रेस मोड की सीमाएँ](/docs/devtools/limitations)।

> `screencast.enabled` एक अलग **लाइव-मोड** निरंतर `.webm` रिकॉर्डिंग है और ट्रेस मोड में इसे अनदेखा किया जाता है। ट्रेस मोड में `filmstrip` (ट्रेस में सघन फ़्रेम्स) या प्रति-टेस्ट `video` का उपयोग करें; स्क्रीनकास्ट ट्यूनिंग फ़ील्ड्स (`quality`, `maxWidth`, `pollIntervalMs`, …) अभी भी उसी रिकॉर्डर पर लागू होते हैं जो चल रहा हो।

## आर्टिफैक्ट्स मैनिफ़ेस्ट — `emitArtifactsManifest`

ट्रेस के बगल में एक `devtools-artifacts-<sessionId>.json` लिखता है — एक सामान्य इंडेक्स जिसका उपयोग रिपोर्टर्स और CI बनाए गए आर्टिफैक्ट्स (हर ट्रेस / स्क्रीनशॉट / वीडियो, और हर टेस्ट की स्थिति) खोजने के लिए करते हैं:

```ts
{
  mode: 'trace',
  emitArtifactsManifest: true // default: off; auto-on when Allure is detected
}
```

- **डिफ़ॉल्ट रूप से बंद।** Allure रिपोर्टर का पता चलने पर यह **अपने आप सक्षम** हो जाता है — कॉन्फ़िग में WebdriverIO का `@wdio/allure-reporter`, या एक सक्रिय Selenium `allure-js-commons` रनटाइम।
- **Nightwatch के लिए स्वयं चालू करना होता है (opt-in)**: इसमें स्वतः पता लगाने के लिए कोई लाइव Allure संकेत नहीं है (`nightwatch-allure` बाद में चलता है), इसलिए यह कभी अपने आप सक्षम नहीं होता — यदि आप मैनिफ़ेस्ट चाहते हैं तो इसे स्पष्ट रूप से सेट करें।

## असर्शन — `captureAssertions`

असर्शन ट्रेस में प्रथम-श्रेणी की एक्शन पंक्तियों के रूप में दिखाई देते हैं (डिफ़ॉल्ट रूप से चालू; बंद करने के लिए `captureAssertions: false` सेट करें):

- **`node:assert`** — तीनों एडैप्टर्स में `assert.<method>` पंक्तियों के रूप में कैप्चर होता है।
- **WebdriverIO `expect`** — सफल *और* विफल `expect(...)` मैचर्स (`expect($el).toHaveText(...)`, `toBeExisting()`, …) `expect.<matcher>` पंक्तियों के रूप में दिखाई देते हैं, जिनमें अपेक्षित वैल्यू, एलिमेंट का सोर्स लोकेशन और एक स्नैपशॉट होता है; मैचर के आंतरिक पोलिंग कमांड्स दबा दिए जाते हैं ताकि केवल असर्शन दिखे।
- **Nightwatch `browser.assert.*` / `browser.verify.*`** — नेटिव असर्शन `assert.<m>` / `verify.<m>` पंक्तियों के रूप में दिखाई देते हैं।

सफल असर्शन हरे रंग में दिखते हैं; विफल असर्शन त्रुटि संदेश के साथ लाल रंग में दिखते हैं।

## मोबाइल टेस्टिंग

ट्रेस मोड `platformName: 'android' | 'ios'` (केस-असंवेदनशील) के माध्यम से मोबाइल सेशन्स का पता लगाता है और इस प्रकार समायोजित होता है:

- **मोबाइल वेब** (Android पर Chrome, iOS पर Safari): डेस्कटॉप जैसी ही DOM-आधारित स्नैपशॉट पाइपलाइन।
- **नेटिव मोबाइल**: पेज में इंजेक्ट की जाने वाली DOM स्क्रिप्ट्स बंद रखी जाती हैं; Appium XML ट्री प्राप्त करने के लिए `getPageSource()` का उपयोग किया जाता है, जो इसके बजाय स्नैपशॉट सीरियलाइज़र को डेटा देता है।

ट्रेस का `context-options` `title: 'android — <deviceName>'` / `'ios — <deviceName>'` रिकॉर्ड करता है ताकि व्यूअर फ़्रेम्स को सही लेबल दे। Appium के माध्यम से Android Chrome के लिए एक रेफ़रेंस WDIO कॉन्फ़िग [`examples/wdio/wdio.mobile.conf.ts`](https://github.com/webdriverio/devtools/blob/main/examples/wdio/wdio.mobile.conf.ts) पर उपलब्ध है।

## आर्टिफैक्ट देखना

फ़र्स्ट-पार्टी **[Trace Player](/docs/devtools/trace-player)** में ट्रेस खोलें — एक समर्पित रीड-ओनली प्लेयर मोड में WebdriverIO DevTools UI:

```sh
show-trace trace-<sessionId>.zip          # bin on PATH after install
npx show-trace trace-<sessionId>.zip      # or via npx
```

प्लेयर आपको DOM टाइम-ट्रैवल, A11y टैब और पिक-लोकेटर ओवरले, Copy-for-LLM के साथ Transcript टैब, Errors / Console / Network / Source डॉक टैब्स, और एक स्क्रब करने योग्य टाइमलाइन देता है। वही पोर्टेबल `.zip` अन्य स्टैंडअलोन ट्रेस व्यूअर्स में और Allure रिपोर्ट के एम्बेडेड व्यूअर के अंदर भी खुलता है। पूर्ण मार्गदर्शन, सुविधाओं और कीबोर्ड शॉर्टकट्स के लिए **[Trace Player](/docs/devtools/trace-player)** पेज देखें।

## और जानें
हर एडैप्टर द्वारा प्रदान किया गया `show-trace` bin उसी आर्काइव को DevTools प्लेयर में खोलता है, जो अतिरिक्त रूप से एक **A11y टैब** भी दिखाता है: प्रति एक्शन कैप्चर किया गया एक्सेसिबिलिटी ट्री, जहाँ किसी पंक्ति पर क्लिक करने से उस एलिमेंट का लोकेटर कॉपी हो जाता है।

ये लोकेटर रिकॉर्ड करने वाले रनर की अपनी शैली में लिखे जाते हैं, इसलिए इन्हें सीधे उसी फ़्रेमवर्क में पेस्ट किया जा सकता है जिसने ट्रेस बनाया। केवल अपने टेक्स्ट से पहचाना जाने वाला एलिमेंट WebdriverIO में `a*=Logout` और Selenium में `//a[contains(., "Logout")]` होता है — उसे resolve करने वाली कॉल `By.xpath()` के कैप्शन के साथ। Nightwatch `button[type="submit"]` जैसे नेटिव CSS लोकेटर को प्राथमिकता देता है, क्योंकि यही एकमात्र रनर है जो डिफ़ॉल्ट CSS रणनीति के तहत सीधी सेलेक्टर स्ट्रिंग पढ़ता है, और केवल तभी XPath (कैप्शन `useXpath()` / `locateStrategy: 'xpath'`) पर लौटता है जब कोई अद्वितीय CSS लोकेटर मौजूद न हो। बाकी हर लोकेटर पोर्टेबल CSS होता है।

LLM / एजेंट उपयोग के लिए, `transcript.md` को सीधे पढ़ें — यह सेलेक्टर्स और वैल्यूज़ के साथ एक्शन्स का संक्षिप्त Markdown रूप है।

- **[Trace Player](/docs/devtools/trace-player)** — पूर्ण `show-trace` प्लेयर मार्गदर्शन, सुविधाएँ और कीबोर्ड शॉर्टकट्स।
- **[Allure इंटीग्रेशन](/docs/devtools/allure)** — ट्रेस / स्क्रीनशॉट / वीडियो आर्टिफैक्ट्स Allure रिपोर्ट से कैसे जुड़ते हैं।
- **[क्रॉस-फ़्रेमवर्क सपोर्ट](/docs/devtools/cross-framework)** — प्रति-एडैप्टर क्षमता मैट्रिक्स (WebdriverIO / Selenium / Nightwatch)।
- **[ट्रेस मोड की सीमाएँ](/docs/devtools/limitations)** — ट्रेस मोड क्या छोड़ देता है और प्रति-एडैप्टर ज्ञात कमियाँ।
- **[कॉन्फ़िगरेशन रेफ़रेंस](/docs/devtools/reference)** — एक नज़र में हर विकल्प।