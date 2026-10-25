---
id: reference
title: कॉन्फ़िगरेशन संदर्भ
description: "WebdriverIO, Selenium और Nightwatch एडेप्टर में live mode और trace mode के लिए हर DevTools विकल्प को उनके डिफ़ॉल्ट मानों के साथ देखें।"
---

तीनों एडेप्टर के सभी DevTools विकल्प एक नज़र में। साझा विकल्पों के **नाम, प्रकार और डिफ़ॉल्ट** हर एडेप्टर पर एक जैसे होते हैं; जहाँ व्यवहार या उपलब्धता में अंतर है, वहाँ इसका उल्लेख किया गया है, और केवल-एडेप्टर-विशिष्ट विकल्प अलग से सूचीबद्ध हैं। Python एडेप्टर कोई options ऑब्जेक्ट नहीं लेता; [Selenium](/docs/devtools/selenium#configuration-options) पेज पर Python टैब देखें। प्रत्येक trace विकल्प की पूरी व्याख्या के लिए [Trace Mode](/docs/devtools/wdio/trace-mode) पेज पर लिंक किया गया अनुभाग देखें।

विकल्पों को उसी तरह पास करें जैसे प्रत्येक एडेप्टर उन्हें लेता है:

- **WebdriverIO** — `services: [['devtools', { … }]]`
- **Selenium** — `DevTools.configure({ … })`
- **Nightwatch** — `globals: nightwatchDevtools({ … })`

## Mode और live-mode विकल्प

| विकल्प | प्रकार / मान | डिफ़ॉल्ट | टिप्पणियाँ |
|---|---|---|---|
| `mode` | `'live' \| 'trace'` | `'live'` | `'live'` DevTools UI डैशबोर्ड खोलता है; `'trace'` इसे छोड़ देता है और एक पोर्टेबल आर्टिफ़ैक्ट लिखता है। दोनों परस्पर अनन्य हैं। |
| `port` | `number` | `3000` (यदि यह व्यस्त है तो एक खाली पोर्ट उपयोग किया जाता है) | वह पोर्ट जिससे DevTools UI / बैकएंड बाइंड होता है। केवल live mode। |
| `hostname` | `string` | `'localhost'` | वह hostname जिससे सर्वर बाइंड होता है। केवल live mode। |
| `screencast` | `ScreencastOptions` | `{ enabled: false }` | निरंतर सेशन वीडियो (`.webm`)। केवल live mode — trace mode के लिए `video` का उपयोग करें। इसमें `maxBufferFrames` (डिफ़ॉल्ट `2000`) शामिल है, जो मेमोरी में रखे गए फ़्रेम की अधिकतम सीमा है। [Screencast](/docs/devtools/wdio/screencast) देखें। |
| `devtoolsCapabilities` | `Capabilities` | Chrome 1600×1200 | DevTools UI विंडो खोलने के लिए उपयोग की जाने वाली capabilities। WebdriverIO, केवल live mode। |

## Trace-mode विकल्प

केवल तब लागू होते हैं जब `mode: 'trace'` हो।

| विकल्प | प्रकार / मान | डिफ़ॉल्ट | विवरण |
|---|---|---|---|
| `traceFormat` | `'zip' \| 'ndjson-directory'` | `'zip'` | एकल आर्काइव बनाम अनपैक की गई डायरेक्टरी। [Output format](/docs/devtools/wdio/trace-mode#output-format--traceformat) |
| `traceGranularity` | `'session' \| 'spec' \| 'test'` | `'session'` | प्रति session / spec फ़ाइल / test एक trace। प्रति-test स्क्रीनशॉट/वीडियो और inline Allure attach के लिए `'test'` आवश्यक है। [Trace granularity](/docs/devtools/wdio/trace-mode#trace-granularity--tracegranularity) |
| `tracePolicy` | `'on' \| 'retain-on-failure' \| 'retain-on-first-failure' \| 'on-first-retry' \| 'on-all-retries' \| 'retain-on-failure-and-retries'` | `'on'` | कौन-से traces रखने हैं। `traceGranularity: 'test'` के साथ जोड़ा जाता है। [Retention](/docs/devtools/wdio/trace-mode#retention--tracepolicy) |
| `filmstrip` | `boolean` | `true` | सहज scrubbing के लिए trace में सघन, निरंतर screencast; `false` प्रति action एक फ़्रेम रिकॉर्ड करता है। export के समय कम से कम 100 ms के अंतराल वाले फ़्रेम तक घटाया जाता है, अधिकतम लगभग 600। [Dense filmstrip](/docs/devtools/wdio/trace-mode#dense-filmstrip--filmstrip) |
| `screenshot` | `'off' \| 'on' \| 'only-on-failure'` | `'off'` | प्रति-test स्क्रीनशॉट (`traceGranularity: 'test'` आवश्यक)। WebdriverIO और Selenium पर Allure में inline संलग्न; Nightwatch पर केवल उत्पन्न किया जाता है। [Per-test screenshot & video](/docs/devtools/wdio/trace-mode#per-test-screenshot--video--screenshot--video) |
| `video` | `'off' \| <tracePolicy value>` | `'off'` | प्रति-test वीडियो स्लाइस (`traceGranularity: 'test'` आवश्यक; एन्कोडिंग के लिए `PATH` पर `ffmpeg` आवश्यक)। WebdriverIO और Selenium पर Allure में inline संलग्न; Nightwatch पर केवल उत्पन्न किया जाता है। [Per-test screenshot & video](/docs/devtools/wdio/trace-mode#per-test-screenshot--video--screenshot--video) |
| `emitArtifactsManifest` | `boolean` | `false` | `devtools-artifacts-<sessionId>.json` लिखता है। Allure reporter का पता चलने पर स्वतः सक्षम (Nightwatch पर opt-in)। [Artifacts manifest](/docs/devtools/wdio/trace-mode#artifacts-manifest--emitartifactsmanifest) |
| `captureAssertions` | `boolean` | `true` | `node:assert` (और जहाँ समर्थित हो, फ़्रेमवर्क `expect` matchers) को trace actions के रूप में कैप्चर करता है। [Assertions](/docs/devtools/wdio/trace-mode#assertions--captureassertions) |

## केवल Selenium (Node.js)

| विकल्प | प्रकार / मान | डिफ़ॉल्ट | टिप्पणियाँ |
|---|---|---|---|
| `openUi` | `boolean` | `true` | डैशबोर्ड विंडो स्वचालित रूप से खोलता है। CI के लिए `false` सेट करें। |
| `headless` | `boolean` | `false` | टेस्ट ब्राउज़र को headless (`--headless=old`) चलाता है। डैशबोर्ड विंडो प्रभावित नहीं होती। |
| `rerunCommand` | `string` | auto | प्रति-test rerun के लिए कमांड टेम्पलेट; `{{testName}}` प्रतिस्थापित किया जाता है। छोड़े जाने पर runner के argv से प्राप्त किया जाता है। |

## केवल Nightwatch

| विकल्प | प्रकार / मान | डिफ़ॉल्ट | टिप्पणियाँ |
|---|---|---|---|
| `bidi` | `boolean` | `false` | WebDriver BiDi कैप्चर (console + JS exceptions + network) में opt-in करें। capabilities में `webSocketUrl: true` आवश्यक है। WebdriverIO और Selenium पर BiDi स्वतः संलग्न होता है। [Nightwatch → BiDi capture](/docs/devtools/nightwatch#bidi-capture-opt-in) देखें। |

## प्रति-एडेप्टर अंतर

कुछ trace क्षमताएँ कुछ एडेप्टर पर सीमित हो जाती हैं — पूरी जानकारी के लिए [cross-framework support matrix](/docs/devtools/cross-framework) देखें। उल्लेखनीय अंतर:

- **Nightwatch retry-aware retention** — केवल `retain-on-failure` विश्वसनीय है; अन्य `tracePolicy` मान इसी पर आ जाते हैं।
- **Nightwatch BDD `describe/it`** — `traceGranularity: 'test'` एक session-scoped स्लाइस में सिमट जाता है।
- **Nightwatch Allure attach** — प्रति-test `screenshot`/`video` केवल उत्पन्न किए जाते हैं (फ़ाइलें + manifest), inline संलग्न नहीं किए जाते।