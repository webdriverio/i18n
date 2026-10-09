---
id: cross-framework
title: क्रॉस-फ्रेमवर्क सपोर्ट
description: "तुलना करें कि DevTools ट्रेस मोड WebdriverIO, Selenium और Nightwatch रन को कितनी पूर्णता से कैप्चर करता है, और प्रत्येक एडेप्टर में क्या कमियाँ हैं।"
---

ट्रेस फ़ॉर्मेट और `show-trace` प्लेयर WebdriverIO / Selenium / Nightwatch में एक समान हैं; यह पेज दिखाता है कि कैप्चर की पूर्णता कहाँ भिन्न होती है। पूर्ण ट्रेस-मोड संदर्भ के लिए, [Trace Mode](/docs/devtools/wdio/trace-mode) देखें।

ट्रेस बनाने वाले ट्रांसफ़ॉर्म [`@wdio/devtools-trace`](https://github.com/webdriverio/devtools/tree/main/packages/trace) में रहते हैं, जो एडेप्टर से एक लेयर नीचे है, इसलिए **ट्रेस फ़ॉर्मेट और `show-trace` प्लेयर हर एडेप्टर के लिए एक समान हैं** — वही `.zip` (या डायरेक्टरी) उसी प्लेयर में खुलती है, चाहे उसे किसी ने भी बनाया हो। नीचे दिए गए तीनों एडेप्टर अतिरिक्त रूप से मुख्य ऑप्शन (`mode`, `traceGranularity`, `tracePolicy`, `traceFormat`, `filmstrip`, `emitArtifactsManifest`, `captureAssertions`) भी साझा करते हैं।

हालाँकि, **कैप्चर की पूर्णता एडेप्टर के अनुसार भिन्न होती है** — WebdriverIO सबसे पूर्ण है; Selenium और Nightwatch मुख्य फ़्लो को कवर करते हैं, नीचे बताई गई कमियों के साथ। फ्रेमवर्क-विशिष्ट enable सिंटैक्स प्रत्येक एडेप्टर पेज पर है — [Selenium](/docs/devtools/selenium#trace-mode) और [Nightwatch](/docs/devtools/nightwatch#trace-mode) देखें।

Python एडेप्टर ([Selenium](/docs/devtools/selenium) पेज पर **Python** टैब देखें) वही आर्काइव लिखता है और उसी प्लेयर में खुलता है, लेकिन यह इस तालिका में शामिल नहीं है: यह टेस्ट प्रोसेस में कोई JavaScript नहीं चलाता, इसलिए एडेप्टर द्वारा इन-प्रोसेस ट्रेस बनाने के बजाय बैकएंड कैप्चर की गई स्ट्रीम से ट्रेस बनाता है। Granularity और retention के Python समकक्ष मौजूद हैं — `--devtools-trace-granularity session|test` और `--devtools-trace-policy`, जिसमें बाद वाले के retry-aware मान `retain-on-failure` में बदल जाते हैं क्योंकि उस वायर पर कुछ भी attempt नंबर नहीं ले जाता। जिन पंक्तियों का कोई Python समकक्ष नहीं है, वे प्रति-टेस्ट-आर्टिफ़ैक्ट वाली हैं: `screenshot`, `video` और inline Allure attach। यह क्या कैप्चर करता है - DOM time-travel, घना filmstrip, A11y ट्री और element overlay, कमांड, console, network, assertions, run controls और Preserve & Rerun - यह उसके अपने पेज पर है।

| क्षमता | WebdriverIO | Selenium | Nightwatch |
|---|---|---|---|
| ट्रेस मोड + `show-trace` प्लेयर | ✅ | ✅ | ✅ |
| DOM time-travel (mutation कैप्चर) | ✅ | ✅ ¹ | ✅ |
| A11y टैब + pick-locator overlay (ट्रेस प्लेयर) | ✅ | ✅ | ✅ |
| Transcript + Copy-for-LLM | ✅ | ✅ | ✅ |
| प्रति-टेस्ट `screenshot` / `video` | ✅ inline Allure | ✅ inline Allure | ⚠️ केवल produce ² |
| `emitArtifactsManifest` auto-detect | ✅ | ✅ | ⚠️ केवल opt-in |
| Retry-aware `tracePolicy` | ✅ | ✅ | ⚠️ केवल `retain-on-failure` ³ |
| `traceGranularity: 'test'` | ✅ | ✅ | ⚠️ Cucumber / exports-object; BDD `describe/it` एक session slice में सिमट जाता है |
| Cucumber Feature→Scenario→Step nesting | Scenario→Step ⁴ | ✅ पूर्ण | Feature→Scenario ⁵ |
| BiDi कैप्चर (console / network / exceptions) | ✅ auto | ✅ auto | ⚠️ opt-in (`bidi: true` + `webSocketUrl`) |
| Screencast (filmstrip / video) | CDP push | CDP push | केवल polling |
| Live-dashboard A11y टैब + overlay | ✅ | केवल ट्रेस प्लेयर | केवल ट्रेस प्लेयर |

¹ Selenium प्रत्येक नेविगेशन पर DOM को पुनर्निर्मित करता है; anchor timing अनुमानित है (किसी नेविगेशन का स्नैपशॉट उसे ट्रिगर करने वाले कमांड से पीछे रह सकता है)।
² Nightwatch में कोई live Allure attach API नहीं है, इसलिए प्रति-टेस्ट आर्टिफ़ैक्ट ट्रेस आउटपुट डायरेक्टरी में लिखे जाते हैं और manifest में सूचीबद्ध होते हैं, लेकिन किसी Allure टेस्ट से attach नहीं किए जाते।
³ Nightwatch का `--retries` प्लगइन के प्रति-टेस्ट hooks को दोबारा फ़ायर किए बिना टेस्ट को आंतरिक रूप से दोबारा चलाता है, इसलिए retry-aware policies (`on-first-retry`, `retain-on-first-failure`, …) `retain-on-failure` में बदल जाती हैं।
⁴ WebdriverIO अभी feature-level ancestry नहीं रखता, इसलिए इसकी Cucumber nesting Scenario→Step है।
⁵ Nightwatch अभी प्रति-step nesting stamp नहीं करता (केवल Feature→Scenario)।