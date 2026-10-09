---
id: session
title: wdio session
description: छोटे wdio session कमांड के साथ शेल से ब्राउज़र, मोबाइल ऐप या डेस्कटॉप ऐप चलाएँ, फिर चरणों को टेस्ट के रूप में एक्सपोर्ट करें।
---

`wdio session` कई छोटे शेल कमांड के दौरान एक WebdriverIO सेशन को चालू रखता है। इसका उपयोग UI को एक्सप्लोर करने, किसी बदलाव की जाँच करने और काम करने वाले चरणों को टेस्ट में बदलने के लिए करें। यह `@wdio/cli` (WebdriverIO v10) का हिस्सा है।

```sh
npx wdio session open chrome http://localhost:3000
npx wdio session snapshot --interactive
npx wdio session click e3
npx wdio session export --out test/specs/cart.e2e.ts
npx wdio session close
```

सेशन का नाम `default` है। `-s <name>` केवल तभी पास करें जब आपको एक साथ दो सेशन की आवश्यकता हो। [targets](/docs/session/targets) पेज एक Expo guinea pig को हेडेड Chrome विंडो में और एक Electron विंडो में, दोनों को डेस्कटॉप आकार में चलाता है। उसी ऐप के लिए Android और iOS कमांड उसी पेज पर हैं।

## इंस्टॉल करें

`wdio session` WebdriverIO CLI का हिस्सा है। `npx wdio` अनस्कोप्ड [`wdio`](https://www.npmjs.com/package/wdio) पैकेज को इंस्टॉल करता है और उस CLI को चलाता है। आपको `@wdio/session` स्वयं इंस्टॉल नहीं करना पड़ता।

```sh
npx wdio session --help
npx wdio session click --help
```

`--help` वर्कफ़्लो, समूह के अनुसार एक्शन, ग्लोबल फ़्लैग और एग्ज़िट कोड प्रिंट करता है। `<action> --help` उस एक्शन के आर्गुमेंट, फ़्लैग, प्लेटफ़ॉर्म, उदाहरण और संबंधित एक्शन प्रिंट करता है। यही टेक्स्ट [commands](/docs/session-commands) पेज पर है। एजेंट स्किल केवल मुख्य लूप रखती है और बाकी के लिए एजेंटों को `--help` पर भेजती है, ताकि CLI बदलने पर यह पुरानी न पड़े।

इसके साथ एक प्रोजेक्ट स्कैफ़ोल्ड करें:

```sh
npm init wdio@latest
```

`.agents/skills/wdio-session/SKILL.md`, एक `AGENTS.md` सेक्शन और एक `.wdio/session/` gitignore एंट्री लिखने के लिए "Set up coding agent support" स्वीकार करें। स्किल को बाद में इसके साथ इंस्टॉल करें:

```sh
npx wdio session skill --install .
```

`npx wdio session doctor` Node.js, ब्राउज़र, Appium, SDK और क्लाउड क्रेडेंशियल की जाँच करता है। `doctor <target>` केवल उन्हीं चीज़ों की जाँच करता है जिनकी उस टारगेट को आवश्यकता है। कोई जाँच विफल होने पर प्रोसेस 1 के साथ एग्ज़िट होता है।

## एक पेज खोलें और उस पर एक्शन करें

हेडलेस Chrome खोलें (विंडो दिखाने के लिए `--headed` जोड़ें)। `open` पेज के इंटरैक्टिव एलिमेंट प्रिंट करता है:

```sh
npx wdio session open chrome http://localhost:3000
```

एक एलिमेंट `button "Add to cart" [ref=e3]` जैसा दिखता है। उस ref का उपयोग करें। हर एक्शन रिपोर्ट करता है कि उसने पेज पर क्या बदला, नए एलिमेंट के ref के साथ, इसलिए आपको शायद ही कभी अलग `snapshot` की आवश्यकता होती है:

```sh
npx wdio session click e3
npx wdio session exec -e "await expect($('aria/Cart (1)')).toBeDisplayed()"
```

`open firefox`, `open edge` और `open safari` वही URL लेते हैं। Chrome, Firefox और Edge इंस्टॉल न होने पर पहली बार उपयोग करते समय डाउनलोड किए जाते हैं। Safari के लिए macOS आवश्यक है।

### Android

Android और iOS, Appium 3 के माध्यम से चलते हैं। `doctor android` गुम सर्वर या ड्राइवर को इंस्टॉल कमांड के साथ रिपोर्ट करता है।

```sh
npx wdio session doctor android
npx wdio session open android --app ./shop.apk
npx wdio session snapshot --interactive
npx wdio session tap e3
```

iOS: `open ios --bundle-id com.example.shop`। नेटिव डेस्कटॉप: `open macos --bundle-id com.example.shop` और `open windows --app Root`।

### Electron

```sh
npx wdio session open electron ./main.js
npx wdio session snapshot --interactive
npx wdio session click e2
```

`open tauri ./my-app` और `open dioxus ./my-app` के लिए उनका ड्राइवर `PATH` पर होना चाहिए। `DISPLAY` या `WAYLAND_DISPLAY` के बिना Linux पर, Xvfb या weston इंस्टॉल करें।

## ऑब्ज़र्वेशन और refs

| कमांड | इसका उपयोग किसके लिए करें |
| --- | --- |
| `snapshot --interactive` | वे एलिमेंट जिन पर आप एक्शन कर सकते हैं, प्रत्येक एक ref के साथ |
| `snapshot --compact` | वही ट्री, बिना नाम वाले खाली रैपर हटाकर |
| `snapshot --urls` | प्रत्येक लिंक पर लिंक के पते |
| `find "Add to cart"` | एक नए स्नैपशॉट से एक पंक्ति |
| `diff` | पिछले स्नैपशॉट के बाद क्या बदला |
| `screenshot` | लेआउट। जब स्नैपशॉट से सवाल का जवाब मिल जाए तो इसे छोड़ दें |
| `pdf` | वर्तमान पेज की एक PDF (`pdf report.pdf`)। BiDi सेशन हेडेड और हेडलेस दोनों में प्रिंट करते हैं |
| `source` | पेज का HTML या नेटिव XML |

Refs नवीनतम स्नैपशॉट से आते हैं। नेविगेशन के बाद, फिर से स्नैपशॉट लें। पुराना ref `REF_STALE` के साथ विफल होता है। अज्ञात ref `REF_NOT_FOUND` के साथ विफल होता है।

## `exec`

`exec` WebdriverIO कोड चलाता है। कमांड को हमेशा `await` करें। `$` एक एलिमेंट लौटाता है और उसके न मिलने पर एरर थ्रो करता है। कोई sync मोड नहीं है और कोई `browser.element` नहीं है।

```sh
npx wdio session exec -e "await browser.getTitle()"
npx wdio session <<'JS'
await $('aria/Cart (1)').waitForDisplayed()
JS
```

`expect-webdriverio` के साथ असर्शन `exec` में रखें। जब सवाल यह हो कि स्क्रीन कैसी दिखती है, तो `visual check <tag>` का उपयोग करें (इसके लिए `@wdio/visual-service` आवश्यक है)।

## एक्सपोर्ट

`export` रिकॉर्ड किए गए चरणों से एक स्पेक लिखता है। Refs को स्थिर सेलेक्टर से बदल दिया जाता है।

```sh
npx wdio session export --out test/specs/cart.e2e.ts
npx wdio run wdio.conf.ts --spec test/specs/cart.e2e.ts
npx wdio session close
```

`open firefox`, `open edge` और `open safari` वही URL लेते हैं। अन्य टारगेट, स्नैपशॉट, `exec`, एक्सपोर्ट और रोका गया टेस्ट रन इस सेक्शन में अलग-अलग पेज हैं।

## यह सेक्शन

| पेज | इसका उपयोग किसके लिए करें |
| --- | --- |
| [Targets](/docs/session/targets) | ब्राउज़र, Android, iOS, डेस्कटॉप, Electron, Tauri, Dioxus और क्लाउड डिवाइस, जिसमें Chrome, Android और Electron में डेमो ऐप शामिल है |
| [Snapshots and refs](/docs/session/snapshots) | स्क्रीन पर क्या है, और वे refs जिन पर आप क्लिक करते हैं |
| [Run code](/docs/session/exec) | `exec`, असर्शन और विज़ुअल जाँच |
| [Export a test](/docs/session/export) | स्पेक, पेज ऑब्जेक्ट और `.wdio/helpers` |
| [Debug a test](/docs/session/debug) | `wdio run --debug=agent` और `wdio repl --session` |
| [Commands](/docs/session-commands) | हर एक्शन और फ़्लैग |

## समस्या निवारण

| संदेश | क्या करें |
| --- | --- |
| `SESSION_EXISTS` | यह नाम पहले से चल रहा है। `-s` के साथ कोई दूसरा नाम उपयोग करें, या `open --replace`। |
| `REF_STALE` / `REF_NOT_FOUND` | `snapshot` फिर से चलाएँ और उस आउटपुट के ref का उपयोग करें। |
| `NOT_EDITABLE` | `fill` टारगेट एक संपादन योग्य फ़ील्ड नहीं है और उसके अंदर (या `aria-controls`/`aria-owns`/label के पीछे) कोई एकल संपादन योग्य फ़ील्ड नहीं है। `snapshot --scope <target>` चलाएँ और फ़ील्ड ref को fill करें। |
| `MISSING_DEPENDENCY` | एरर में बताए गए पैकेज को इंस्टॉल करें, या `wdio session doctor <target>` चलाएँ। |
| `MISSING_APPIUM_DRIVER` | एरर से `npx appium driver install …` लाइन चलाएँ। |
| `MISSING_CREDENTIALS` | बताए गए वेरिएबल एक्सपोर्ट करें। Doctor कभी भी उनके मान प्रिंट नहीं करता। |
| `Session closed from wdio session` | डीबग सेशन बंद कर दिया गया था। जब टेस्ट को जारी रहना चाहिए तो close के बजाय resume करें। |

एग्ज़िट कोड: 0 सफलता, 1 एक्शन विफल हुआ, 2 उपयोग (usage), 3 कोई गुम डिपेंडेंसी या क्रेडेंशियल, 4 उस नाम का कोई सेशन नहीं।

## अगले चरण

- [Targets](/docs/session/targets) — एक ब्राउज़र, एक Android या iOS ऐप, या एक Electron विंडो खोलें
- [WebdriverIO for Coding Agents](/docs/ai-agents) — स्किल, डॉक्स और प्रोजेक्ट नियम
- [wdio session commands](/docs/session-commands) — हर एक्शन और फ़्लैग