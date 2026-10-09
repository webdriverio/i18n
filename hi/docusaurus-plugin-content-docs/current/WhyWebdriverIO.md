---
id: why-webdriverio
title: WebdriverIO क्यों?
description: WebdriverIO को अन्य टेस्ट ऑटोमेशन टूल्स से क्या अलग बनाता है - हर प्लेटफ़ॉर्म के लिए एक API, वेब स्टैंडर्ड्स, ओपन गवर्नेंस और कोडिंग एजेंट्स के लिए फ़र्स्ट-क्लास सपोर्ट।
---

WebdriverIO, Node.js के लिए एक ओपन सोर्स टेस्ट ऑटोमेशन फ़्रेमवर्क है। एक टेस्ट रनर और एक API के साथ आप वेब ब्राउज़र, नेटिव और हाइब्रिड मोबाइल ऐप्स, डेस्कटॉप ऐप्स और एडिटर एक्सटेंशन्स को ऑटोमेट कर सकते हैं, और इसके ऊपर विज़ुअल, एक्सेसिबिलिटी और कंपोनेंट टेस्टिंग भी जोड़ सकते हैं। इसे [OpenJS Foundation](https://openjsf.org/) के अंतर्गत इसका समुदाय चलाता है।

## हर प्लेटफ़ॉर्म के लिए एक फ़्रेमवर्क

अधिकांश टीमें केवल एक वेबसाइट से कहीं अधिक शिप करती हैं। WebdriverIO आपको उन सभी को समान सेलेक्टर्स, असर्शन्स, रिपोर्टर्स और CI सेटअप के साथ टेस्ट करने देता है:

| प्लेटफ़ॉर्म | WebdriverIO इसे कैसे ऑटोमेट करता है | यहाँ से शुरू करें |
| --- | --- | --- |
| वेब ब्राउज़र | Chrome, Firefox, Safari और Edge में WebDriver और WebDriver BiDi | [Web Browsers](/docs/platforms/web) |
| वेब कंपोनेंट्स | React, Vue, Svelte, Solid, Preact, Lit और Stencil के लिए वास्तविक ब्राउज़र में कंपोनेंट टेस्ट | [Component Testing](/docs/component-testing) |
| मोबाइल ऐप्स | Appium के माध्यम से iOS और Android पर नेटिव, हाइब्रिड और मोबाइल वेब, जिसमें Flutter भी शामिल है | [Mobile Apps](/docs/platforms/mobile) |
| डेस्कटॉप ऐप्स | macOS, Windows और Linux पर Electron, Tauri और Dioxus ऐप्स, Appium के माध्यम से नेटिव macOS ऐप्स | [Desktop Apps](/docs/platforms/desktop) |
| एडिटर्स और एक्सटेंशन्स | VS Code एक्सटेंशन्स और ब्राउज़र एक्सटेंशन्स | [Extensions & Editors](/docs/platforms/apps-and-extensions) |
| विज़ुअल रिग्रेशन्स | वेब और मोबाइल के लिए स्क्रीन, एलिमेंट और फ़ुल-पेज तुलनाएँ | [Visual Testing](/docs/visual-testing) |

एक ही टेस्ट [multi-remote](/docs/multiremote) के साथ इनमें से कई को एक साथ भी चला सकता है, जैसे एक ही परिदृश्य में एक मोबाइल ऐप और एक वेब डैशबोर्ड।

## वेब स्टैंडर्ड्स पर निर्मित

WebdriverIO ब्राउज़रों को [WebDriver](https://w3c.github.io/webdriver/) और [WebDriver BiDi](https://w3c.github.io/webdriver-bidi/) के माध्यम से ऑटोमेट करता है, जो W3C स्टैंडर्ड्स हैं जिन्हें हर ब्राउज़र वेंडर लागू करता है और [टेस्ट](https://wpt.fyi/results/webdriver/tests) करता है। आपके टेस्ट उन्हीं ब्राउज़र बिल्ड्स पर चलते हैं जो आपके उपयोगकर्ताओं के पास हैं, और क्लिक तथा की प्रेस जैसे इंटरैक्शन JavaScript से इम्युलेट किए जाने के बजाय स्वयं ब्राउज़र द्वारा डिस्पैच किए जाते हैं। WebDriver BiDi केवल Chromium ही नहीं, बल्कि सभी ब्राउज़रों में नेटवर्क मॉकिंग, कंसोल और लॉग इवेंट्स और भी बहुत कुछ जोड़ता है।

जब आपको ब्राउज़र-विशिष्ट क्षमताओं की आवश्यकता होती है, तो WebdriverIO आपको [Puppeteer](/docs/api/browser/getPuppeteer) के माध्यम से Chrome DevTools Protocol तक पहुँच देता है। [Automation Protocols](/docs/automationProtocols) में और पढ़ें।

## समुदाय द्वारा संचालित और खुले रूप से शासित

WebdriverIO किसी टेस्टिंग वेंडर का उत्पाद नहीं है। यह प्रोजेक्ट:

- [OpenJS Foundation](https://openjsf.org/) के स्वामित्व में है, जो एक वेंडर-न्यूट्रल गैर-लाभकारी संस्था है, और यह इसे कानूनी रूप से अपने सभी उपयोगकर्ताओं के हितों की सेवा करने के लिए बाध्य करती है
- एक सार्वजनिक [गवर्नेंस मॉडल](https://github.com/webdriverio/webdriverio/blob/main/GOVERNANCE.md) का पालन करता है: कोई भी योगदान दे सकता है, और कमिटर्स तथा Technical Steering Committee समुदाय से ही उभरते हैं
- इसका कोई पेड टियर और कोई फ़ीचर गेट नहीं है; हर फ़ीचर मुफ़्त है और आप अपने टेस्ट कहीं भी चला सकते हैं, लोकली या किसी भी क्लाउड प्रोवाइडर पर
- [कॉन्ट्रिब्यूटर स्टाइपेंड प्रोग्राम](/blog/2024/02/15/new-contributor-stipend-program) के माध्यम से स्पॉन्सरशिप को उन लोगों तक वापस पहुँचाता है जो इसे बनाते हैं
- [Discord](https://discord.webdriver.io) और [GitHub Discussions](https://github.com/webdriverio/webdriverio/discussions) पर मुफ़्त सामुदायिक सहायता प्रदान करता है

## कोडिंग एजेंट्स के लिए तैयार

डॉक्स, टूलिंग और टेस्ट आर्टिफ़ैक्ट्स इस तरह डिज़ाइन किए गए हैं कि कोडिंग एजेंट्स स्वयं WebdriverIO के साथ काम कर सकें:

- **एजेंट-रेडी डॉक्स**: हर पेज Markdown के रूप में उपलब्ध है, एक क्यूरेटेड [`llms.txt`](https://webdriver.io/llms.txt) है और `https://webdriver.io/mcp` पर एक डॉक्स MCP सर्वर है।
- **WebdriverIO MCP**: [`@wdio/mcp`](/docs/mcp) सर्वर एक एजेंट को आपके UI को एक्सप्लोर करने और सेलेक्टर्स को वेरिफ़ाई करने के लिए ब्राउज़र और मोबाइल ऐप्स चलाने देता है।
- **ट्रेसेज़**: [DevTools trace mode](/docs/devtools/wdio/trace-mode) हर फ़ेल होने वाले टेस्ट के लिए एक Markdown ट्रांसक्रिप्ट, स्क्रीनशॉट्स और एक्सेसिबिलिटी स्नैपशॉट्स लिखता है।

सेटअप के लिए [WebdriverIO for Coding Agents](/docs/ai-agents) देखें।

## सब कुछ शामिल, विस्तार करना आसान

- Mocha, Jasmine और Cucumber सपोर्ट, पैरेलल एक्ज़िक्यूशन, [शार्डिंग](/docs/sharding), [रीट्राइज़](/docs/retry) और [वॉच मोड](/docs/watcher) के साथ एक [टेस्ट रनर](/docs/testrunner)
- हर इंटरैक्शन के लिए [ऑटो-वेटिंग](/docs/autowait) और एक बिल्ट-इन [असर्शन लाइब्रेरी](/docs/assertion)
- [नेटवर्क मॉकिंग](/docs/mocksandspies), [इम्युलेशन](/docs/emulation) और [स्नैपशॉट टेस्टिंग](/docs/snapshot)
- एक [डिबगिंग डैशबोर्ड और ट्रेस व्यूअर](/docs/devtools)
- क्लाउड्स, फ़्रेमवर्क्स और CI के लिए [70+ सर्विसेज़ और रिपोर्टर्स](/docs/ecosystem), साथ ही अपने स्वयं के [कमांड्स](/docs/customcommands), [सर्विसेज़](/docs/customservices) और [रिपोर्टर्स](/docs/customreporter) लिखने के लिए सरल APIs

## कब कुछ और चुनें

WebdriverIO तब उपयुक्त है जब आप एक से अधिक प्लेटफ़ॉर्म टेस्ट करते हैं, वास्तविक ब्राउज़रों और डिवाइसेज़ पर टेस्ट चलाना चाहते हैं, या एक स्वतंत्र, समुदाय-स्वामित्व वाले टूल को महत्व देते हैं। यदि आप केवल एक ही ब्राउज़र में एक ही वेब ऐप टेस्ट करते हैं और आपको मोबाइल, डेस्कटॉप या क्लाउड डिवाइसेज़ की आवश्यकता नहीं है, तो शुरुआत में केवल-ब्राउज़र वाला टूल हल्का लग सकता है। यदि आप अनिश्चित हैं, तो `npm init wdio@latest` के साथ [एक प्रोजेक्ट बनाएँ](/docs/gettingstarted) और इसे आज़माएँ: सेटअप में लगभग एक मिनट लगता है।

## अगले कदम

- [Getting Started](/docs/gettingstarted) - एक प्रोजेक्ट बनाएँ और अपना पहला टेस्ट चलाएँ
- [Setup Types](/docs/setuptypes) - टेस्ट रनर या स्टैंडअलोन मोड
- [WebdriverIO for Coding Agents](/docs/ai-agents) - अपना एजेंट सेट अप करें