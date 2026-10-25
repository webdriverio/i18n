---
id: trace-player
title: ट्रेस प्लेयर
description: "ऑफ़लाइन रीप्ले और समीक्षा के लिए ट्रेस-मोड आर्टिफ़ैक्ट्स को show-trace प्लेयर में खोलें, या उन्हें अन्य ट्रेस व्यूअर्स में लोड करें।"
---

`show-trace` प्लेयर [Trace Mode](/docs/devtools/wdio/trace-mode) में बनाए गए किसी भी ट्रेस को स्वयं WebdriverIO DevTools UI में खोलता है — यह ऑफ़लाइन रीप्ले, समीक्षा और AI-एजेंट डिफ़िंग के लिए एक समर्पित, केवल-पढ़ने योग्य **player** मोड है।

## डेमो

![Trace Player Demo](/img/devtools/trace-player.gif)

## `show-trace` — फ़र्स्ट-पार्टी प्लेयर

DevTools UI में एक ट्रेस खोलें:

```sh
show-trace trace-<sessionId>.zip          # bin on PATH after install
npx show-trace trace-<sessionId>.zip      # or via npx
pnpm show-trace trace-<sessionId>.zip     # from the devtools monorepo
```

`show-trace` bin हर एडेप्टर (`@wdio/devtools-service`, `@wdio/nightwatch-devtools`, `@wdio/selenium-devtools`) के साथ आता है, इसलिए यह किसी भी ऐसे प्रोजेक्ट में उपलब्ध है जो इनमें से कोई एक इंस्टॉल करता है, बिना किसी अतिरिक्त डिपेंडेंसी के। यह स्वयं `@wdio/devtools-backend` का भी एक bin है, इसलिए बिना JavaScript एडेप्टर वाला प्रोजेक्ट (उदाहरण के लिए Python वाला) `npx -p @wdio/devtools-backend show-trace <trace.zip>` चला सकता है। यह उसी DevTools UI को एक समर्पित **player** मोड में बूट करता है और उसे आपके ब्राउज़र में खोलता है:

- **Action list** (बाएँ) — कैप्चर किए गए कमांड्स, साथ में एक **Metadata** टैब।
- **Browser pane** (बीच में) — चयनित एक्शन के लिए पुनर्निर्मित पेज (नीचे [DOM time-travel](#trace-player-features) देखें)। जब ट्रेस में फ़िल्मस्ट्रिप/वीडियो होता है, तो एक **Snapshot / Screencast** टॉगल रिकॉर्ड किए गए वीडियो पर स्विच कर देता है।
- **Timeline strip** (ऊपर) — थंबनेल्स की एक फ़िल्मस्ट्रिप, जो उनकी वॉल-क्लॉक स्थितियों पर होती है, साथ में खींचने योग्य प्लेहेड वाला एक स्क्रब बार। सीक करने के लिए किसी थंबनेल पर क्लिक करें या कहीं भी ड्रैग करें।
- **Controls bar** — प्ले/पॉज़, स्टेप और स्पीड।
- **Dock tabs** (नीचे) — **Source**, **Log**, **Console**, **Network**, **Errors** (हर एक पर उसकी गिनती का बैज), साथ ही केवल प्लेयर में उपलब्ध **A11y** और **Transcript** टैब। अनुरोध का विवरण (हेडर्स, टाइमिंग, स्टेटस) देखने के लिए किसी **Network** पंक्ति पर क्लिक करें।
- **Keyboard shortcuts** — `Space` प्ले/पॉज़, `←`/`→` एक्शन्स के बीच स्टेप, `Home`/`End` पहले/अंतिम पर जाएँ, `,`/`.` स्पीड बदलें, `/` फ़िल्टर पर फ़ोकस, `?` सभी शॉर्टकट्स दिखाएँ।

> केवल `.zip` स्वीकार करता है; पहले `ndjson-directory` ट्रेस को zip करें, या उसे किसी अन्य संगत व्यूअर में खोलें। यही शॉर्टकट्स लाइव डैशबोर्ड में भी काम करते हैं (`←`/`→` कमांड सूची में आगे-पीछे जाते हैं, `?` सहायता दिखाता है)।

### ट्रेस प्लेयर की विशेषताएँ

स्थिर फ़्रेम स्टेपिंग से आगे बढ़कर, प्लेयर रन को पुनर्निर्मित और क्रॉस-रेफ़रेंस करता है:

- **DOM time-travel** — ब्राउज़र पेन कैप्चर की गई DOM-mutation स्ट्रीम (और फ़ॉर्म फ़ील्ड-स्टेट — input `value`, checkbox `checked`, जिसमें वापस खाली किए गए फ़ील्ड भी शामिल हैं) को रीप्ले करता है ताकि चयनित एक्शन के समय के अनुसार *वास्तविक* DOM को फिर से बनाया जा सके, न कि केवल एक स्क्रीनशॉट। जिन बिंदुओं पर कोई कैप्चर किया गया फ़्रेम नहीं होता (assertions, static waits), वे भी पेज की सही स्थिति दिखाते हैं।
- **A11y टैब + एलिमेंट ओवरले ("pick locator")** — **A11y** टैब चयनित कमांड के लिए कैप्चर किया गया accessibility tree (roles + accessible names) दिखाता है। टेस्ट द्वारा इंटरैक्ट किए गए हर एलिमेंट की रूपरेखा दिखाने के लिए ब्राउज़र क्रोम में एलिमेंट ओवरले को टॉगल करें; A11y tree में किसी बॉक्स की पंक्ति को हाइलाइट करने के लिए उस पर **hover** करें, और एक मज़बूत लोकेटर कॉपी करने के लिए **click** करें। लोकेटर्स रिकॉर्डिंग रनर की शैली में लिखे जाते हैं: WebdriverIO में `a*=Logout`, Selenium में `By.xpath()` कैप्शन के साथ `//a[contains(., "Logout")]`, और Nightwatch में XPath फ़ॉलबैक के साथ सामान्य CSS। नेटिव Appium सेशन पर वे `android=new UiSelector()…` या `-ios predicate string:…` के रूप में दिखते हैं। यह लिंक द्विदिशीय है — tree की किसी पंक्ति पर hover करने से स्नैपशॉट में संबंधित एलिमेंट हाइलाइट हो जाता है।
- **Transcript टैब + Copy-for-LLM** — **Transcript** टैब रन की `transcript.md` (निष्पादन क्रम में एक मानव/LLM-पठनीय सारांश) को रेंडर करता है। एक-क्लिक **Copy** ट्रांसक्रिप्ट को किसी भी विफल-कमांड त्रुटियों के साथ जोड़कर LLM के लिए पेस्ट करने योग्य संदर्भ के रूप में तैयार करता है।
- **Timeline input markers** — हर एक्शन को स्क्रब बार पर उसके प्रकार के अनुसार चिह्नित किया जाता है: कीबोर्ड एक्शन्स हरे बार के रूप में, पॉइंटर एक्शन्स (जिनमें एक हिट पॉइंट होता है) नीले बिंदु के रूप में, और बाकी सामान्य टिक के रूप में — ताकि आप एक नज़र में इंटरैक्शन की लय पढ़ सकें।
- **Cucumber nesting** — Cucumber रन एक्शन ट्री में अपने scenario के अंतर्गत नेस्ट होते हैं। गहराई एडेप्टर के अनुसार भिन्न होती है (Selenium में Feature → Scenario → Step, WebdriverIO में Scenario → Step, Nightwatch में Feature → Scenario); देखें [Cross-Framework Support](/docs/devtools/cross-framework)।
- **Dense filmstrip scrubbing** — [`filmstrip`](/docs/devtools/wdio/trace-mode#dense-filmstrip--filmstrip) सक्षम होने पर, टाइमलाइन प्रति-एक्शन एक-फ़्रेम वाली छलाँगों के बजाय सहज स्क्रबिंग के लिए घने फ़्रेम्स को समेटती है।

## अन्य ट्रेस व्यूअर्स

चूँकि आर्टिफ़ैक्ट एक पोर्टेबल, मानक ट्रेस-व्यूअर ऑन-डिस्क फ़ॉर्मेट का उपयोग करता है, वही `.zip` (या डायरेक्टरी) संगत **standalone trace viewers** में भी खुलती है, और — उसी फ़ॉर्मेट को साझा करने के कारण — **Allure report के embedded trace viewer** (Allure ≥ 2.35) के अंदर भी। ये रेंडर करते हैं:
- टाइमिंग्स के साथ एक्शन्स की टाइमलाइन
- प्रति-एक्शन स्क्रीनशॉट्स
- एलिमेंट स्नैपशॉट्स
- नेटवर्क वॉटरफ़ॉल
- कंसोल इवेंट्स

LLM / एजेंट के उपयोग के लिए, सीधे `transcript.md` पढ़ें — यह सेलेक्टर्स और वैल्यूज़ के साथ एक्शन्स का एक संक्षिप्त Markdown रूप है।

ट्रेस पाइपलाइन (action-mapping, snapshot serializers, NDJSON writer, zip / directory writer) [`@wdio/devtools-trace`](https://github.com/webdriverio/devtools/tree/main/packages/trace) के माध्यम से सभी एडेप्टर्स में साझा की जाती है, इसलिए आर्टिफ़ैक्ट की संरचना एक जैसी रहती है, चाहे उसे किसी भी एडेप्टर ने बनाया हो — देखें [Cross-Framework Support](/docs/devtools/cross-framework)।