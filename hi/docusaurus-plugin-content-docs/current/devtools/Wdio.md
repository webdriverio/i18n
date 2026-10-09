---
id: wdio
title: WebDriverIO DevTools
description: "DOM रीप्ले, स्क्रीनशॉट, नेटवर्क और कंसोल कैप्चर तथा स्क्रीनकास्ट के साथ टेस्ट डीबग करने के लिए WebdriverIO DevTools सर्विस इंस्टॉल और कॉन्फ़िगर करें।"
---

एक WebdriverIO सर्विस जो ब्राउज़र ऑटोमेशन टेस्ट चलाने, डीबग करने और जाँचने के लिए डेवलपर टूल्स UI प्रदान करती है। इसकी विशेषताओं में DOM म्यूटेशन रीप्ले, प्रति-कमांड स्क्रीनशॉट, नेटवर्क रिक्वेस्ट निरीक्षण, कंसोल लॉग कैप्चर और सेशन स्क्रीनकास्ट रिकॉर्डिंग शामिल हैं।

## इंस्टॉलेशन

```sh
npm install @wdio/devtools-service --save-dev
```

## उपयोग

### टेस्ट रनर

```ts
// wdio.conf.ts
export const config = {
  services: ['devtools'],
}
```

### स्टैंडअलोन

```ts
import { remote } from 'webdriverio'
import { setupForDevtools } from '@wdio/devtools-service'

const browser = await remote(setupForDevtools({
  capabilities: { browserName: 'chrome' }
}))
await browser.url('https://example.com')
await browser.deleteSession()
```

## सर्विस विकल्प

```ts
services: [['devtools', options]]
```

| विकल्प | प्रकार | डिफ़ॉल्ट | विवरण |
|---|---|---|---|
| `port` | `number` | रैंडम | वह पोर्ट जिस पर DevTools UI सर्वर सुनता है |
| `hostname` | `string` | `'localhost'` | वह होस्टनेम जिससे DevTools UI सर्वर बाइंड होता है |
| `devtoolsCapabilities` | `Capabilities` | Chrome 1600x1200 | DevTools UI विंडो खोलने के लिए उपयोग की जाने वाली capabilities |
| `screencast` | `ScreencastOptions` | - | सेशन वीडियो रिकॉर्डिंग ([स्क्रीनकास्ट देखें](/docs/devtools/wdio/screencast)) |
| `mode` | `'live' \| 'trace'` | `'live'` | `live` DevTools UI खोलता है; `trace` इसे छोड़ देता है और इसके बजाय एक पोर्टेबल आर्टिफ़ैक्ट लिखता है ([ट्रेस मोड देखें](/docs/devtools/wdio/trace-mode)) |
| `traceFormat` | `'zip' \| 'ndjson-directory'` | `'zip'` | ट्रेस आर्टिफ़ैक्ट लेआउट — एकल आर्काइव बनाम अनपैक्ड डायरेक्टरी। केवल `mode: 'trace'` होने पर लागू होता है |
| `traceGranularity` | `'session' \| 'spec' \| 'test'` | `'session'` | प्रति सेशन / स्पेक फ़ाइल / टेस्ट एक ट्रेस। `'test'` प्रत्येक को `test-results/<spec>-<title>-<browser>[-retryN]/trace.zip` में लिखता है। केवल `mode: 'trace'` होने पर लागू होता है ([ट्रेस मोड देखें](/docs/devtools/wdio/trace-mode#trace-granularity--tracegranularity)) |
| `tracePolicy` | `'on' \| 'retain-on-failure' \| 'retain-on-first-failure' \| 'on-first-retry' \| 'on-all-retries' \| 'retain-on-failure-and-retries'` | `'on'` | कौन से ट्रेस रखने हैं। `traceGranularity: 'test'` के साथ जोड़ा जाता है। केवल `mode: 'trace'` होने पर लागू होता है |
| `filmstrip` | `boolean` | `true` | प्लेयर में सहज, स्क्रब करने योग्य प्लेबैक के लिए ट्रेस *के अंदर* एक सघन, निरंतर स्क्रीनकास्ट फ़िल्मस्ट्रिप रिकॉर्ड करता है — प्रति-एक्शन फ़्रेम के साथ सघन फ़्रेम, जिन्हें एक्सपोर्ट के समय कम किया जाता है और content-addressed किया जाता है। केवल `mode: 'trace'` होने पर लागू होता है |
| `screenshot` | `'off' \| 'on' \| 'only-on-failure'` | `'off'` | प्रति-टेस्ट स्क्रीनशॉट, Allure में इनलाइन संलग्न (`image/png`)। `mode: 'trace'` + `traceGranularity: 'test'` आवश्यक है |
| `video` | `'off' \| TraceRetentionPolicy` | `'off'` | प्रति-टेस्ट स्क्रीनकास्ट वीडियो, दी गई पॉलिसी के अनुसार रखा जाता है और Allure में इनलाइन संलग्न होता है (`video/webm`)। `mode: 'trace'` + `traceGranularity: 'test'` आवश्यक है |
| `emitArtifactsManifest` | `boolean` | `false` | `devtools-artifacts-<sessionId>.json` लिखता है — रिपोर्टर्स/CI के लिए हर उत्पन्न आर्टिफ़ैक्ट और प्रत्येक टेस्ट की स्थिति का एक सामान्य इंडेक्स। कॉन्फ़िग में `@wdio/allure-reporter` होने पर स्वतः सक्षम हो जाता है। केवल `mode: 'trace'` होने पर लागू होता है |
| `captureAssertions` | `boolean` | `true` | असर्शन को ट्रेस एक्शन पंक्तियों के रूप में कैप्चर करता है — `node:assert` तथा पास/फ़ेल होने वाले `expect(...)` matchers। इससे बाहर निकलने के लिए `false` सेट करें |

## शुरुआत करें

1. अपने WebdriverIO टेस्ट चलाएँ
2. DevTools UI स्वचालित रूप से एक बाहरी ब्राउज़र विंडो में खुलता है
3. टेस्ट रियल-टाइम विज़ुअलाइज़ेशन के साथ तुरंत चलने लगते हैं
4. लाइव ब्राउज़र प्रीव्यू, टेस्ट प्रगति और कमांड निष्पादन देखें
5. प्रारंभिक रन पूरा होने के बाद, अलग-अलग टेस्ट या सूट दोबारा चलाने के लिए प्ले बटन का उपयोग करें
6. चल रहे टेस्ट को समाप्त करने के लिए किसी भी समय स्टॉप बटन पर क्लिक करें
7. वर्कबेंच टैब में एक्शन, मेटाडेटा, कंसोल लॉग और सोर्स कोड एक्सप्लोर करें

## विशेषताएँ

WebDriverIO DevTools की विशेषताओं को विस्तार से जानें:

- **[इंटरैक्टिव टेस्ट रीरनिंग और विज़ुअलाइज़ेशन](/docs/devtools/wdio/interactive-test-rerunning)** - टेस्ट रीरनिंग के साथ रियल-टाइम ब्राउज़र प्रीव्यू
- **[प्रिज़र्व और रीरन (तुलना)](/docs/devtools/wdio/preserve-and-rerun)** - फ़ेल होने वाले टेस्ट का स्नैपशॉट लें, उसे दोबारा चलाएँ, और दोनों रन का साथ-साथ अंतर देखें
- **[मल्टी-फ़्रेमवर्क सपोर्ट](/docs/devtools/wdio/multi-framework-support)** - Mocha, Jasmine और Cucumber के साथ काम करता है
- **[कंसोल लॉग](/docs/devtools/wdio/console-logs)** - ब्राउज़र कंसोल आउटपुट कैप्चर करें और जाँचें
- **[नेटवर्क लॉग](/docs/devtools/wdio/network-logs)** - API कॉल और नेटवर्क गतिविधि की निगरानी करें
- **[मेटाडेटा](/docs/devtools/wdio/metadata)** - प्रति ब्राउज़र सेशन सेशन capabilities, एनवायरनमेंट और टाइमिंग
- **[TestLens](/docs/devtools/wdio/testlens)** - इंटेलिजेंट कोड नेविगेशन के साथ सोर्स कोड पर जाएँ
- **[सेशन स्क्रीनकास्ट](/docs/devtools/wdio/screencast)** - ब्राउज़र सेशन की स्वचालित वीडियो रिकॉर्डिंग
- **[ट्रेस मोड](/docs/devtools/wdio/trace-mode)** - हेडलेस कैप्चर पाथ जो एक पोर्टेबल `trace.zip` आर्टिफ़ैक्ट बनाता है (कोई UI विंडो नहीं); `zip` और `ndjson-directory` आउटपुट फ़ॉर्मेट, प्रति-सेशन/स्पेक/टेस्ट ग्रैन्युलैरिटी, रीट्राई-अवेयर रिटेंशन पॉलिसी और एक वैकल्पिक सघन `filmstrip` का समर्थन करता है, जिन्हें फ़र्स्ट-पार्टी `show-trace` प्लेयर में देखा जा सकता है

## ट्रेस प्लेयर

`mode: 'trace'` के साथ रिकॉर्ड किया गया ट्रेस फ़र्स्ट-पार्टी `show-trace` प्लेयर (`npx show-trace path/to/trace.zip`) में खुलता है — DOM टाइम-ट्रैवल, A11y टैब और pick-locator एलिमेंट ओवरले, Copy-for-LLM के साथ Transcript टैब, Errors / Console / Network / Source टैब, और एक स्क्रब करने योग्य टाइमलाइन (सघन फ़िल्मस्ट्रिप, Cucumber Feature → Scenario → Step नेस्टिंग)।

पूरे वॉकथ्रू और अन्य संगत व्यूअर्स के लिए **[ट्रेस प्लेयर](/docs/devtools/trace-player)** पेज देखें।

## Allure रिपोर्टिंग

कॉन्फ़िग में `@wdio/allure-reporter` होने पर, ट्रेस-मोड आर्टिफ़ैक्ट (ट्रेस zip, तथा `traceGranularity: 'test'` पर प्रति-टेस्ट स्क्रीनशॉट और वीडियो) स्वचालित रूप से Allure रिपोर्ट से संलग्न हो जाते हैं, और `emitArtifactsManifest` स्वतः सक्षम हो जाता है।

अटैचमेंट विवरण और रिपोर्टर स्टेप-साइलेंसिंग विकल्पों के लिए **[Allure इंटीग्रेशन](/docs/devtools/allure)** देखें।