---
id: reference
title: कॉन्फ़िगरेशन संदर्भ
description: "WebdriverIO, Selenium और Nightwatch एडेप्टर्स में लाइव मोड और ट्रेस मोड के लिए हर DevTools विकल्प को उनके डिफ़ॉल्ट मानों के साथ देखें।"
---

तीनों एडेप्टर्स में सभी DevTools विकल्प एक नज़र में। विकल्पों के **नाम, प्रकार और डिफ़ॉल्ट मान** हर एडेप्टर पर **एक समान** हैं; जहाँ व्यवहार अलग है, वहाँ इसका उल्लेख किया गया है। प्रत्येक ट्रेस विकल्प की पूरी व्याख्या के लिए [Trace Mode](/docs/devtools/wdio/trace-mode) पेज पर लिंक किया गया सेक्शन देखें।

विकल्पों को उसी तरह पास करें जैसे प्रत्येक एडेप्टर उन्हें लेता है:

- **WebdriverIO** — `services: [['devtools', { … }]]`
- **Selenium** — `DevTools.configure({ … })`
- **Nightwatch** — `globals: nightwatchDevtools({ … })`

## मोड और लाइव-मोड विकल्प

| विकल्प | प्रकार / मान | डिफ़ॉल्ट | नोट्स |
|---|---|---|---|
| `mode` | `'live' \| 'trace'` | `'live'` | `'live'` DevTools UI डैशबोर्ड खोलता है; `'trace'` इसे छोड़ देता है और एक पोर्टेबल आर्टिफ़ैक्ट लिखता है। दोनों परस्पर अनन्य हैं। |
| `port` | `number` | रैंडम | वह पोर्ट जिससे DevTools UI / बैकएंड बाइंड होता है। केवल लाइव मोड। |
| `hostname` | `string` | `'localhost'` | वह होस्टनेम जिससे सर्वर बाइंड होता है। केवल लाइव मोड। |
| `screencast` | `ScreencastOptions` | `{ enabled: false }` | निरंतर सेशन वीडियो (`.webm`)। केवल लाइव मोड — ट्रेस मोड के लिए `video` का उपयोग करें। देखें [Screencast](/docs/devtools/wdio/screencast)। |
| `devtoolsCapabilities` | `Capabilities` | Chrome 1600×1200 | DevTools UI विंडो खोलने के लिए उपयोग की जाने वाली capabilities। WebdriverIO, केवल लाइव मोड। |

## ट्रेस-मोड विकल्प

केवल तभी लागू होते हैं जब `mode: 'trace'` हो।

| विकल्प | प्रकार / मान | डिफ़ॉल्ट | विवरण |
|---|---|---|---|
| `traceFormat` | `'zip' \| 'ndjson-directory'` | `'zip'` | एकल आर्काइव बनाम एक अनपैक्ड डायरेक्टरी। [Output format](/docs/devtools/wdio/trace-mode#output-format--traceformat) |
| `traceGranularity` | `'session' \| 'spec' \| 'test'` | `'session'` | प्रति सेशन / spec फ़ाइल / टेस्ट एक ट्रेस। प्रति-टेस्ट स्क्रीनशॉट/वीडियो और इनलाइन Allure अटैच के लिए `'test'` आवश्यक है। [Trace granularity](/docs/devtools/wdio/trace-mode#trace-granularity--tracegranularity) |
| `tracePolicy` | `'on' \| 'retain-on-failure' \| 'retain-on-first-failure' \| 'on-first-retry' \| 'on-all-retries' \| 'retain-on-failure-and-retries'` | `'on'` | कौन से ट्रेस रखने हैं। `traceGranularity: 'test'` के साथ जोड़ा जाता है। [Retention](/docs/devtools/wdio/trace-mode#retention--tracepolicy) |
| `filmstrip` | `boolean` | `true` | सहज स्क्रबिंग के लिए ट्रेस में सघन, निरंतर स्क्रीनकास्ट; `false` प्रति एक्शन एक फ़्रेम रिकॉर्ड करता है। [Dense filmstrip](/docs/devtools/wdio/trace-mode#dense-filmstrip--filmstrip) |
| `screenshot` | `'off' \| 'on' \| 'only-on-failure'` | `'off'` | प्रति-टेस्ट स्क्रीनशॉट (`traceGranularity: 'test'` आवश्यक)। WebdriverIO सर्विस विकल्प। [Per-test screenshot & video](/docs/devtools/wdio/trace-mode#per-test-screenshot--video--screenshot--video) |
| `video` | `'off' \| <tracePolicy value>` | `'off'` | प्रति-टेस्ट वीडियो स्लाइस (`traceGranularity: 'test'` आवश्यक)। WebdriverIO सर्विस विकल्प। [Per-test screenshot & video](/docs/devtools/wdio/trace-mode#per-test-screenshot--video--screenshot--video) |
| `emitArtifactsManifest` | `boolean` | `false` | `devtools-artifacts-<sessionId>.json` लिखता है। Allure रिपोर्टर का पता चलने पर स्वतः सक्षम हो जाता है (Nightwatch पर ऑप्ट-इन)। [Artifacts manifest](/docs/devtools/wdio/trace-mode#artifacts-manifest--emitartifactsmanifest) |
| `captureAssertions` | `boolean` | `true` | `node:assert` (और जहाँ समर्थित हो, फ़्रेमवर्क `expect` matchers) को ट्रेस एक्शन के रूप में कैप्चर करता है। [Assertions](/docs/devtools/wdio/trace-mode#assertions--captureassertions) |

## केवल Nightwatch

| विकल्प | प्रकार / मान | डिफ़ॉल्ट | नोट्स |
|---|---|---|---|
| `bidi` | `boolean` | `false` | WebDriver BiDi कैप्चर (console + JS exceptions + network) में ऑप्ट-इन करें। capabilities में `webSocketUrl: true` आवश्यक है। WebdriverIO और Selenium पर, BiDi स्वतः अटैच हो जाता है। देखें [Nightwatch → BiDi capture](/docs/devtools/nightwatch#bidi-capture-opt-in)। |

## प्रति-एडेप्टर अंतर

कुछ ट्रेस क्षमताएँ कुछ एडेप्टर्स पर सीमित हो जाती हैं — पूरी जानकारी के लिए [cross-framework support matrix](/docs/devtools/cross-framework) देखें। उल्लेखनीय अंतर:

- **Nightwatch retry-aware retention** — केवल `retain-on-failure` विश्वसनीय है; अन्य `tracePolicy` मान इसी पर लौट आते हैं।
- **Nightwatch BDD `describe/it`** — `traceGranularity: 'test'` एक सेशन-स्कोप्ड स्लाइस में सिमट जाता है।
- **Nightwatch Allure attach** — प्रति-टेस्ट `screenshot`/`video` केवल उत्पन्न किए जाते हैं (फ़ाइलें + मैनिफ़ेस्ट), इनलाइन अटैच नहीं किए जाते।