---
id: cross-framework
title: क्रॉस-फ्रेमवर्क सपोर्ट
description: "तुलना करें कि DevTools ट्रेस मोड WebdriverIO, Selenium और Nightwatch रन को कितनी पूर्णता से कैप्चर करता है, और प्रत्येक एडैप्टर में कौन-सी कमियाँ हैं।"
---

ट्रेस फ़ॉर्मेट और `show-trace` प्लेयर WebdriverIO / Selenium / Nightwatch में एक समान हैं; यह पेज दिखाता है कि कैप्चर की पूर्णता कहाँ भिन्न होती है। पूर्ण ट्रेस-मोड संदर्भ के लिए, [Trace Mode](/docs/devtools/wdio/trace-mode) देखें।

ट्रेस बनाने वाले ट्रांसफ़ॉर्म [`@wdio/devtools-trace`](https://github.com/webdriverio/devtools/tree/main/packages/trace) में रहते हैं, जो एडैप्टरों से एक लेयर नीचे है, इसलिए **ट्रेस फ़ॉर्मेट और `show-trace` प्लेयर हर एडैप्टर के लिए एक समान हैं** — एक ही `.zip` (या डायरेक्टरी) उसी प्लेयर में खुलती है, चाहे उसे किसी ने भी बनाया हो। नीचे दिए गए तीनों एडैप्टर अतिरिक्त रूप से मुख्य विकल्प (`mode`, `traceGranularity`, `tracePolicy`, `traceFormat`, `filmstrip`, `emitArtifactsManifest`, `captureAssertions`) साझा करते हैं।

**हालाँकि, कैप्चर की पूर्णता एडैप्टर के अनुसार भिन्न होती है** — WebdriverIO सबसे पूर्ण है; Selenium और Nightwatch मुख्य फ़्लो को कवर करते हैं, जिनकी कमियाँ नीचे दी गई हैं। फ्रेमवर्क-विशिष्ट सक्षम करने का सिंटैक्स प्रत्येक एडैप्टर पेज पर है — [Selenium](/docs/devtools/selenium#trace-mode) और [Nightwatch](/docs/devtools/nightwatch#trace-mode) देखें।

Python एडैप्टर ([Selenium](/docs/devtools/selenium) पेज पर **Python** टैब देखें) वही आर्काइव लिखता है और उसी प्लेयर में खुलता है, लेकिन यह इस तालिका में नहीं है: यह टेस्ट प्रोसेस में कोई JavaScript नहीं चलाता, इसलिए एडैप्टर द्वारा इन-प्रोसेस ट्रेस बनाने के बजाय बैकएंड कैप्चर की गई स्ट्रीम से ट्रेस बनाता है। ग्रैन्युलैरिटी और रिटेंशन के Python समकक्ष मौजूद हैं — `--devtools-trace-granularity session|test` और `--devtools-trace-policy`, जिसमें बाद वाले के retry-aware मान `retain-on-failure` में बदल जाते हैं क्योंकि उस वायर पर कुछ भी attempt नंबर नहीं ले जाता। जिन पंक्तियों का कोई Python समकक्ष नहीं है, वे प्रति-टेस्ट-आर्टिफ़ैक्ट वाली हैं: `screenshot`, `video` और इनलाइन Allure attach। यह क्या कैप्चर करता है - DOM time-travel, घना filmstrip, A11y ट्री और एलिमेंट ओवरले, कमांड, कंसोल, नेटवर्क, असर्शन, रन कंट्रोल और Preserve & Rerun - यह उसके अपने पेज पर है।

| क्षमता | WebdriverIO | Selenium | Nightwatch |
|---|---|---|---|
| ट्रेस मोड + `show-trace` प्लेयर | ✅ | ✅ | ✅ |
| DOM time-travel (म्यूटेशन कैप्चर) | ✅ | ✅ ¹ | ✅ |
| A11y टैब + pick-locator ओवरले (ट्रेस प्लेयर) | ✅ | ✅ | ✅ |
| नेटिव Appium सेशन का पता लगाना | ✅ | ✅ | ✅ |
| हाइब्रिड ऐप को उसके webview में फ़ॉलो करना | ✅ | ⚠️ केवल स्टार्टअप caps | ⚠️ केवल स्टार्टअप caps |
| Transcript + Copy-for-LLM | ✅ | ✅ | ✅ |
| प्रति-टेस्ट `screenshot` / `video` | ✅ इनलाइन Allure | ✅ इनलाइन Allure | ⚠️ केवल produce ² |
| Retry-aware `tracePolicy` | ✅ | ✅ | ⚠️ केवल `retain-on-failure` ³ |
| `traceGranularity: 'test'` | ✅ | ✅ | ⚠️ Cucumber / exports-object; BDD `describe/it` एक सेशन स्लाइस में सिमट जाता है |
| Cucumber Feature→Scenario→Step नेस्टिंग | Scenario→Step ⁴ | ✅ पूर्ण | Feature→Scenario ⁵ |
| BiDi कैप्चर (console / network / exceptions) | ✅ स्वचालित | ✅ स्वचालित | ⚠️ opt-in (`bidi: true` + `webSocketUrl`) |
| Screencast (filmstrip / video) | CDP push | CDP push | केवल polling |
| A11y और Transcript टैब | केवल ट्रेस प्लेयर | केवल ट्रेस प्लेयर | केवल ट्रेस प्लेयर |

¹ BiDi के साथ, Selenium पेज कलेक्टर को document start पर रजिस्टर करता है, इसलिए हर डॉक्यूमेंट WebdriverIO की तरह अपने स्वयं के DOM को एंकर करता है। BiDi के बिना यह हर नेविगेशन के बाद कलेक्टर इंजेक्ट करने पर वापस आ जाता है, और वहाँ किसी नेविगेशन का स्नैपशॉट उसे ट्रिगर करने वाली कमांड से पीछे रह सकता है।
² Nightwatch में कोई लाइव Allure attach API नहीं है, इसलिए प्रति-टेस्ट आर्टिफ़ैक्ट ट्रेस आउटपुट डायरेक्टरी में लिखे जाते हैं और manifest में सूचीबद्ध होते हैं, लेकिन किसी Allure टेस्ट से अटैच नहीं किए जाते।
³ Nightwatch का `--retries` प्लगइन के प्रति-टेस्ट hooks को दोबारा फ़ायर किए बिना टेस्ट को आंतरिक रूप से फिर से चलाता है, इसलिए retry-aware पॉलिसी (`on-first-retry`, `retain-on-first-failure`, …) `retain-on-failure` में बदल जाती हैं।
⁴ WebdriverIO अभी feature-स्तर की ancestry नहीं रखता, इसलिए इसकी Cucumber नेस्टिंग Scenario→Step है।
⁵ Nightwatch अभी प्रति-step नेस्टिंग स्टैम्प नहीं करता (केवल Feature→Scenario)।