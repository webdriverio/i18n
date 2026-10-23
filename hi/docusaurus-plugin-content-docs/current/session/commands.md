---
id: session-commands
title: wdio session कमांड्स
description: open से लेकर doctor और skill तक, हर wdio session एक्शन और फ़्लैग।
slug: /session-commands
---

<!-- Generated from packages/wdio-session/src/actions/specs.ts by `pnpm run docs:session-commands`. Do not edit by hand. -->

हर `wdio session` एक्शन। ग्लोबल फ़्लैग सभी एक्शन्स पर लागू होते हैं। यही टेक्स्ट `npx wdio session <action> --help` से भी प्रिंट होता है। [WebdriverIO Session](/docs/session) सेक्शन का बाकी हिस्सा [targets](/docs/session/targets), [snapshots](/docs/session/snapshots), [`exec`](/docs/session/exec), [export](/docs/session/export) और [debugging](/docs/session/debug) को कवर करता है।

```sh
npx wdio session <action> [arguments] [flags]
```

## ग्लोबल फ़्लैग

| फ़्लैग | विवरण |
| --- | --- |
| `-s, --session` | सेशन का नाम (env WDIO_SESSION, डिफ़ॉल्ट "default") |
| `--json` | एक JSON ऑब्जेक्ट प्रिंट करें (env WDIO_SESSION_JSON=1) |
| `--timeout` | ms में रिक्वेस्ट टाइमआउट (wait को छोड़कर अधिकतम 60000) |
| `-q, --quiet` | सफल होने पर माँगे गए डेटा के अलावा कुछ भी प्रिंट न करें |
| `--color` | रंग बंद करने के लिए --no-color का उपयोग करें |

एग्ज़िट कोड: 0 सफलता, 1 एक्शन या आपका कोड विफल हुआ, 2 उपयोग संबंधी त्रुटि, 3 कोई डिपेंडेंसी या क्रेडेंशियल्स मौजूद नहीं, 4 उस नाम का कोई सेशन नहीं।

## `open`

एक सेशन शुरू करें: browser, android, ios, macos, windows, electron, tauri, dioxus या एक wdio config फ़ाइल।

एक बैकग्राउंड daemon शुरू करता है जो सेशन को `close` तक, या --idle-timeout (डिफ़ॉल्ट 30m) तक निष्क्रिय रहने तक जीवित रखता है। जब तक आप --headed पास न करें, ब्राउज़र headless चलते हैं। सेशन का नाम, टार्गेट, artifacts डायरेक्टरी जहाँ snapshots, screenshots और exports जाते हैं, और किसी URL पर खोले गए ब्राउज़र के लिए उस पेज का interactive snapshot प्रिंट करता है।

प्रति नाम एक सेशन। पहले से चल रहे नाम को खोलना विफल होता है; उसका उपयोग करें, उसे बंद करें, या --replace पास करें। `-s <name>` केवल तभी पास करें जब आपको एक साथ दो सेशन चाहिए हों।

```sh
npx wdio session open <target> [url]
```

**आर्ग्युमेंट्स**

| नाम | आवश्यक | विवरण |
| --- | --- | --- |
| `target` | हाँ | chrome \| firefox \| edge \| safari \| android \| ios \| macos \| windows \| electron `<app>` \| tauri `<app>` \| dioxus `<app>` \| `<wdio.conf>` |
| `url` | नहीं | खोलने के लिए URL (ब्राउज़र), ऐप पाथ (डेस्कटॉप ऐप्स) या capability (config) |

**फ़्लैग**

| फ़्लैग | विवरण |
| --- | --- |
| `--replace` | पहले उसी नाम के चल रहे सेशन को बंद करें |
| `--launch-timeout <n>` | सेशन के तैयार होने तक प्रतीक्षा के मिलीसेकंड |
| `--idle-timeout <value>` | इतनी देर तक कोई रिक्वेस्ट न आने पर बंद करें (जैसे 30m, 0 इसे बंद करता है) |
| `--capabilities <value>` | JSON के रूप में या JSON फ़ाइल के पाथ के रूप में अतिरिक्त capabilities |
| `--hostname <value>` | रिमोट WebDriver होस्ट |
| `--port <n>` | रिमोट WebDriver पोर्ट |
| `--path <value>` | रिमोट WebDriver पाथ |
| `--protocol <value>` | रिमोट WebDriver प्रोटोकॉल |
| `--log-level <value>` | daemon.log में लिखा जाने वाला WebdriverIO लॉग लेवल |
| `--bidi` | WebDriver BiDi का अनुरोध करें (बंद करने के लिए --no-bidi का उपयोग करें) |
| `--headed` | ब्राउज़र विंडो दिखाएँ |
| `--headless` | बिना विंडो के चलाएँ (ब्राउज़र के लिए डिफ़ॉल्ट; --headed को ओवरराइड करता है) |
| `--snapshot` | खोले गए पेज का interactive snapshot प्रिंट करें (छोड़ने के लिए --no-snapshot का उपयोग करें) |
| `--viewport <value>` | प्रारंभिक viewport, जैसे 1280x720 |
| `--browser-version <value>` | ब्राउज़र वर्ज़न |
| `--binary <value>` | ब्राउज़र बाइनरी |
| `--arg <value>` | अतिरिक्त ब्राउज़र आर्ग्युमेंट। `-` से शुरू होने वाले मान के लिए `=` चाहिए, जैसे `--arg=--disable-gpu` (दोहराया जा सकता है) |
| `--profile <value>` | स्थायी प्रोफ़ाइल डायरेक्टरी |
| `--attach <value>` | चल रहे Chrome/Edge से जुड़ें (debugging पोर्ट या URL) |
| `--app <value>` | ऐप फ़ाइल या क्लाउड ऐप URL |
| `--package <value>` | Android ऐप package |
| `--activity <value>` | Android ऐप activity |
| `--bundle-id <value>` | iOS/macOS bundle id |
| `--browser <value>` | मोबाइल वेब ब्राउज़र (chrome, safari) |
| `--device <value>` | डिवाइस का नाम |
| `--platform-version <value>` | प्लेटफ़ॉर्म वर्ज़न |
| `--udid <value>` | डिवाइस UDID |
| `--reset` | ऐप की स्थिति बनाए रखने के लिए --no-reset का उपयोग करें (appium:noReset) |
| `--full-reset` | appium:fullReset |
| `--orientation <portrait\|landscape>` | प्रारंभिक orientation |
| `--appium-url <value>` | चल रहे Appium सर्वर का उपयोग करें |
| `--app-arg <value>` | डेस्कटॉप ऐप को पास किया गया आर्ग्युमेंट। `-` से शुरू होने वाले मान के लिए `=` चाहिए, जैसे `--app-arg=--no-sandbox` (दोहराया जा सकता है) |
| `--chromedriver <value>` | Electron: Chromedriver बाइनरी |
| `--electron-version <value>` | Electron: वर्ज़न डिटेक्शन को ओवरराइड करें |
| `--provider <browserstack\|saucelabs\|testingbot\|testmu>` | क्लाउड प्रोवाइडर |
| `--os <value>` | क्लाउड: डेस्कटॉप OS |
| `--os-version <value>` | क्लाउड: डेस्कटॉप OS वर्ज़न |
| `--region <value>` | क्लाउड: Sauce Labs region |
| `--tunnel <value>` | क्लाउड: प्रोवाइडर टनल शुरू करें (या "external") |
| `--tunnel-name <value>` | क्लाउड: टनल पहचानकर्ता |
| `--project <value>` | क्लाउड: प्रोजेक्ट लेबल |
| `--build <value>` | क्लाउड: बिल्ड लेबल |
| `--name <value>` | क्लाउड: सेशन नाम लेबल |

**उदाहरण**

```sh
# लोकल ऐप पर headless Chrome खोलें
npx wdio session open chrome http://localhost:3000

# दिखाई देने वाली विंडो के साथ Firefox खोलें
npx wdio session open firefox http://localhost:3000 --headed

# Appium के माध्यम से Android ऐप खोलें
npx wdio session open android --app ./app.apk

# इंस्टॉल किया हुआ iOS ऐप खोलें
npx wdio session open ios --bundle-id com.example.shop

# Electron ऐप खोलें
npx wdio session open electron ./main.js

# config की पहली capability खोलें
npx wdio session open ./wdio.conf.ts 0

# क्लाउड ग्रिड में Chrome खोलें
npx wdio session open chrome https://example.com --provider browserstack
```

यह भी देखें: [`snapshot`](#snapshot), [`close`](#close), [`doctor`](#doctor)।

## `close`

सेशन समाप्त करें और उसका daemon रोकें।

`wdio run --debug=agent` द्वारा खोले गए सेशन पर यह रुके हुए टेस्ट को विफल कर देता है; उसे जारी रखने के लिए `resume` का उपयोग करें।

```sh
npx wdio session close
```

**फ़्लैग**

| फ़्लैग | विवरण |
| --- | --- |
| `--all` | हर सेशन बंद करें |
| `--clean` | artifacts डायरेक्टरी भी हटाएँ |

**उदाहरण**

```sh
# डिफ़ॉल्ट सेशन बंद करें
npx wdio session close

# हर सेशन बंद करें और उनके artifacts हटाएँ
npx wdio session close --all --clean
```

यह भी देखें: [`open`](#open), [`list`](#list)।

## `list`

चल रहे सेशन की सूची दिखाएँ।

प्रति सेशन एक पंक्ति प्रिंट करता है: नाम, टार्गेट, URL और उम्र। बंद हो चुके सेशन द्वारा छोड़ी गई स्थिति को हटाता है।

```sh
npx wdio session list
```

**उदाहरण**

```sh
# हर चल रहा सेशन दिखाएँ
npx wdio session list
```

यह भी देखें: [`info`](#info), [`status`](#status)।

## `info`

सेशन का विवरण दिखाएँ।

टार्गेट, ब्राउज़र और वर्ज़न, BiDi सपोर्ट, artifacts डायरेक्टरी, और वर्तमान URL, title, विंडो का आकार और frame (वेब) या context और activity (मोबाइल) प्रिंट करता है।

```sh
npx wdio session info
```

**उदाहरण**

```sh
# दिखाएँ कि सेशन कहाँ है और क्या चला रहा है
npx wdio session info
```

यह भी देखें: [`list`](#list), [`get`](#get)।

## `restart`

उसी टार्गेट और फ़्लैग के साथ बंद करें और फिर से खोलें।

रिकॉर्ड की गई history बनाए रखता है, इसलिए `export` अभी भी restart से पहले के चरणों को कवर करता है।

```sh
npx wdio session restart
```

**उदाहरण**

```sh
# नए ब्राउज़र के साथ फिर से शुरू करें
npx wdio session restart
```

यह भी देखें: [`open`](#open), [`close`](#close)।

## `status`

यदि सेशन चल रहा है तो 0 से, नहीं तो 4 से exit करता है।

```sh
npx wdio session status
```

**उदाहरण**

```sh
# सेशन केवल तभी खोलें जब कोई न चल रहा हो
npx wdio session status || npx wdio session open chrome http://localhost:3000
```

यह भी देखें: [`list`](#list), [`open`](#open)।

## `exec`

stdin, -e या किसी फ़ाइल से WebdriverIO कोड चलाएँ।

`browser`, `$`, `$$`, `expect` और `ref('e3')` के scope में होने के साथ एक async function के रूप में चलता है। टॉप-लेवल वेरिएबल कॉल्स के बीच बने रहते हैं। बिना एक्शन के `wdio session`, stdin पर कोड pipe किए जाने पर `exec` चलाता है।

कमांड्स को हमेशा `await` करें। `$` ठीक एक एलिमेंट लौटाता है और एक से अधिक मेल खाने पर StrictSelectorError फेंकता है। जब एक ही एक्शन (click, fill, …) काम कर दे तो उसे प्राथमिकता दें; loops, conditions और assertions के लिए `exec` का उपयोग करें।

```sh
npx wdio session exec [file]
```

**आर्ग्युमेंट्स**

| नाम | आवश्यक | विवरण |
| --- | --- | --- |
| `file` | नहीं | स्क्रिप्ट फ़ाइल (.js, .ts, .mjs) |

**फ़्लैग**

| फ़्लैग | विवरण |
| --- | --- |
| `-e, --eval <value>` | चलाने के लिए कोड |
| `--history` | कोड को history में रिकॉर्ड करें (छोड़ने के लिए --no-history का उपयोग करें) |

**उदाहरण**

```sh
# एक-पंक्ति का कोड चलाएँ
npx wdio session exec -e "await browser.getTitle()"

# पेज पर assert करें (single quotes शेल को $ से दूर रखते हैं)
npx wdio session exec -e 'await expect($("h1")).toHaveText("Cart")'

# stdin पर कई चरण pipe करें
npx wdio session <<'JS'
await $('aria/Sign in').click()
await expect(browser).toHaveUrl(expect.stringContaining('/dashboard'))
JS

# स्क्रिप्ट फ़ाइल चलाएँ
npx wdio session exec ./scripts/login.ts
```

यह भी देखें: [`helpers`](#helpers), [`history`](#history), [`export`](#export)।

## `helpers`

.wdio/helpers से प्रोजेक्ट helpers की सूची दिखाएँ।

.wdio/helpers के अंतर्गत हर फ़ाइल एक function को default-export करती है जो browser प्राप्त करता है और addCommand के साथ custom commands रजिस्टर करता है। सेशन खुलने पर helpers लोड होते हैं, और export किए गए टेस्ट में वे custom commands बन जाते हैं।

```sh
npx wdio session helpers
```

**फ़्लैग**

| फ़्लैग | विवरण |
| --- | --- |
| `--reload` | helpers को फिर से import करें |

**उदाहरण**

```sh
# helpers और उनके द्वारा जोड़े गए commands की सूची दिखाएँ
npx wdio session helpers

# किसी helper में किए गए बदलाव लागू करें
npx wdio session helpers --reload
```

यह भी देखें: [`exec`](#exec), [`export`](#export)।

## `snapshot`

refs के साथ Accessibility snapshot। वेब, native mobile, native desktop पर लागू।

accessibility tree प्रिंट करता है, प्रति पंक्ति एक node, जैसे `button "Add to cart" [ref=e3]`। click, fill, get और अन्य एक्शन्स को एक ref पास करें। जब तक एलिमेंट मौजूद है, refs मान्य रहते हैं; हटाए गए एलिमेंट पर एक्शन REF_STALE के साथ विफल होता है।

हर snapshot artifacts डायरेक्टरी में लिखा जाता है। --max-chars से लंबा आउटपुट भागों में प्रिंट होता है: पहला भाग, फिर अगले भाग के लिए `--offset <line>`। `find` पूरे में खोजता है।

टेक्स्ट लेआउट और --json का स्वरूप प्रायोगिक हैं और किसी minor रिलीज़ में बदल सकते हैं। ref सिंटैक्स और ref लेने वाले एक्शन्स स्थिर रहते हैं।

```sh
npx wdio session snapshot
```

**फ़्लैग**

| फ़्लैग | विवरण |
| --- | --- |
| `--depth <n>` | अधिकतम गहराई |
| `--scope <value>` | केवल इस ref या selector के नीचे का snapshot लें |
| `-i, --interactive` | केवल interactive एलिमेंट्स |
| `--all` | छिपे हुए एलिमेंट्स शामिल करें |
| `--boxes` | bounding boxes जोड़ें |
| `--viewport` | केवल वही जो viewport में है (वेब: diff baseline को अपडेट नहीं करता) |
| `--selectors` | हर ref पंक्ति को उसके सबसे अच्छे selector के साथ समाप्त करें |
| `--compact` | बिना नाम वाले ऐसे nodes हटाएँ जिनमें कोई content नहीं है |
| `-u, --urls` | लिंक hrefs शामिल करें |
| `--file-only` | केवल फ़ाइल लिखें |
| `--max-chars <n>` | एक बार में अधिकतम इतने अक्षर प्रिंट करें (डिफ़ॉल्ट 8000) |
| `--offset <n>` | लंबे snapshot के अगले भाग के लिए, इस पंक्ति से आगे प्रिंट करें |

**उदाहरण**

```sh
# केवल interactive एलिमेंट्स, सामान्य पहली झलक
npx wdio session snapshot -i

# लिंक टार्गेट्स के साथ पूरा पेज
npx wdio session snapshot --compact --urls

# पेज का केवल एक हिस्सा
npx wdio session snapshot --scope "#checkout" --depth 4

# अभी स्क्रीन पर क्या है
npx wdio session snapshot --viewport -i

# टेस्ट में डालने के लिए selector के साथ हर ref
npx wdio session snapshot --selectors -i

# एक्शन करें, फिर दोबारा देखें
npx wdio session click e3 && npx wdio session snapshot -i
```

यह भी देखें: [`find`](#find), [`diff`](#diff), [`screenshot`](#screenshot)।

## `read`

पेज का टेक्स्ट Markdown के रूप में पढ़ें। वेब पर लागू।

Headings, paragraphs, list items, table rows और उनके URL के साथ links, मुख्य content से जब पेज उसे चिह्नित करता है (main, article), अन्यथा पूरे पेज से; navigation, footers और छिपा हुआ टेक्स्ट छोड़ दिया जाता है। --max-chars (डिफ़ॉल्ट 6000) पर काटा जाता है; कटौती बताती है कि कौन-सा --offset अगला भाग पढ़ता है। --scope के साथ, सेक्शन को स्क्रॉल करके दृश्य में लाया जाता है। "पेज क्या कहता है" का उत्तर देने के लिए इसका उपयोग करें; एक्शन के लिए refs पाने हेतु snapshot या find का उपयोग करें।

```sh
npx wdio session read
```

**फ़्लैग**

| फ़्लैग | विवरण |
| --- | --- |
| `--scope <value>` | केवल इस ref या selector के नीचे पढ़ें |
| `--max-chars <n>` | अधिकतम इतने अक्षर प्रिंट करें (डिफ़ॉल्ट 6000) |
| `--offset <n>` | लंबे पेज के अगले भाग के लिए, टेक्स्ट के इस अक्षर से शुरू करें |

**उदाहरण**

```sh
# मुख्य content पढ़ें
npx wdio session read

# एक सेक्शन पढ़ें
npx wdio session read --scope e12
```

यह भी देखें: [`find`](#find), [`snapshot`](#snapshot), [`get`](#get)।

## `find`

एक नए snapshot में टेक्स्ट खोजें। वेब, native mobile, native desktop पर लागू।

एक नया snapshot लेता है और हर मिलान को उसके आसपास के node के साथ प्रिंट करता है (जैसे पूरा list item, ताकि मिलान के पास का मान भी शामिल हो), पंक्ति संख्याओं और refs के साथ, और पहले मिलान को स्क्रॉल करके दृश्य में लाता है। मिलान पहले case को अनदेखा करता है, फिर spaces को ("SO2" से "SO 2" मिलता है), फिर सभी शब्दों और उनके जैसे शब्दों को खोजता है। जो टेक्स्ट केवल पेज के छिपे हिस्सों (बंद menus, tabs, "Show more") में है, उसे वैसा ही चिह्नित करके सूचीबद्ध किया जाता है। किसी बड़े पेज का पूरा snapshot पढ़ने से सस्ता। -A/-B/-C इसके बजाय grep की तरह सादा पंक्ति संदर्भ प्रिंट करते हैं।

```sh
npx wdio session find <text>
```

**आर्ग्युमेंट्स**

| नाम | आवश्यक | विवरण |
| --- | --- | --- |
| `text` | हाँ | खोजने के लिए टेक्स्ट |

**फ़्लैग**

| फ़्लैग | विवरण |
| --- | --- |
| `--regex` | टेक्स्ट को regular expression के रूप में मानें |
| `--scope <value>` | केवल इस ref या selector के नीचे खोजें |
| `-C, --context <n>` | आसपास के node के बजाय पहले और बाद की संदर्भ पंक्तियाँ |
| `-A, --after-context <n>` | हर मिलान के बाद की संदर्भ पंक्तियाँ |
| `-B, --before-context <n>` | हर मिलान से पहले की संदर्भ पंक्तियाँ |
| `--offset <n>` | आउटपुट कटने पर अगले मिलानों के लिए, इतने मिलान छोड़ें |

**उदाहरण**

```sh
# किसी बटन का ref खोजें
npx wdio session find "Add to cart"

# हर लिंक की सूची दिखाएँ
npx wdio session find "^\s*link" --regex --context 0
```

यह भी देखें: [`snapshot`](#snapshot), [`wait`](#wait)।

## `diff`

एक नए snapshot की पिछले snapshot से तुलना करें। वेब, native mobile, native desktop पर लागू।

पिछले snapshot के बाद से क्या बदला, उसका unified diff प्रिंट करता है, या "No changes"। पहली कॉल एक baseline संग्रहीत करती है। पूरे पेज को दोबारा पढ़े बिना यह देखने के लिए कि एक्शन ने क्या किया, किसी एक्शन के बाद इसका उपयोग करें। वेब पर baseline वह आखिरी snapshot है जो `--viewport` के बिना लिया गया था।

```sh
npx wdio session diff
```

**फ़्लैग**

| फ़्लैग | विवरण |
| --- | --- |
| `--baseline <value>` | तुलना करने के लिए snapshot फ़ाइल |
| `--scope <value>` | केवल इस ref या selector के भीतर snapshot लें, `snapshot --scope` की तरह |
| `--interactive` | केवल interactive एलिमेंट्स, `snapshot -i` की तरह |

**उदाहरण**

```sh
# देखें कि एक click ने क्या बदला
npx wdio session click e7 && npx wdio session diff

# सहेजे गए snapshot से तुलना करें
npx wdio session diff --baseline before.yml
```

यह भी देखें: [`snapshot`](#snapshot), [`find`](#find)।

## `screenshot`

viewport, किसी एलिमेंट या पूरे पेज का PNG सहेजें। वेब, native mobile, native desktop पर लागू।

फ़ाइल पाथ और इमेज का आकार प्रिंट करता है। जब प्रश्न लेआउट या दिखावट के बारे में हो तो screenshot लें; टेक्स्ट और स्थिति `snapshot` और `get` से पढ़ें।

```sh
npx wdio session screenshot [target]
```

**आर्ग्युमेंट्स**

| नाम | आवश्यक | विवरण |
| --- | --- | --- |
| `target` | नहीं | कैप्चर किए जाने वाले एलिमेंट का ref या selector |

**फ़्लैग**

| फ़्लैग | विवरण |
| --- | --- |
| `--full` | पूरा पेज (वेब) |
| `--path <value>` | आउटपुट फ़ाइल |

**उदाहरण**

```sh
# viewport कैप्चर करें
npx wdio session screenshot

# एक एलिमेंट कैप्चर करें
npx wdio session screenshot e5 --path card.png

# पूरा पेज कैप्चर करें
npx wdio session screenshot --full
```

यह भी देखें: [`visual`](#visual), [`pdf`](#pdf), [`snapshot`](#snapshot)।

## `pdf`

वर्तमान पेज को PDF के रूप में सहेजें। वेब पर लागू।

`browser.savePDF` को कॉल करता है। एक BiDi सेशन Chrome, Edge और Firefox में, headed या headless, `browsingContext.print` के साथ प्रिंट करता है। एक Classic सेशन `printPage` का उपयोग करता है, जिसे पुराना Chrome केवल headless में सपोर्ट करता है।

```sh
npx wdio session pdf [file]
```

**आर्ग्युमेंट्स**

| नाम | आवश्यक | विवरण |
| --- | --- | --- |
| `file` | नहीं | आउटपुट फ़ाइल (.pdf पर समाप्त होनी चाहिए) |

**फ़्लैग**

| फ़्लैग | विवरण |
| --- | --- |
| `--path <value>` | आउटपुट फ़ाइल (.pdf पर समाप्त होनी चाहिए) |

**उदाहरण**

```sh
# वर्तमान डायरेक्टरी में report.pdf लिखें
npx wdio session pdf report.pdf
```

यह भी देखें: [`screenshot`](#screenshot)।

## `source`

पेज का HTML या ऐप का XML सहेजें। वेब, native mobile, native desktop पर लागू।

फ़ाइल लिखता है और उसका पाथ और आकार प्रिंट करता है। जब snapshot वह छिपा दे जिसकी आपको ज़रूरत है, जैसे selector के लिए attributes, तब इसका उपयोग करें।

```sh
npx wdio session source
```

**फ़्लैग**

| फ़्लैग | विवरण |
| --- | --- |
| `--path <value>` | आउटपुट फ़ाइल |

**उदाहरण**

```sh
# HTML को अपने पास सहेजें
npx wdio session source --path page.html
```

यह भी देखें: [`snapshot`](#snapshot), [`get`](#get)।

## `get`

text, html, value, कोई attribute, title, URL, कोई count या box पढ़ें। वेब पर लागू।

मान प्रिंट करता है, फिर वह WebdriverIO कोड जो उसने चलाया (`→ …`)। केवल मान प्रिंट करने के लिए -q पास करें, जैसे उसे किसी shell वेरिएबल में कैप्चर करने के लिए। किसी मान के लिए assertion लिखने से पहले उसे पढ़ें।

```sh
npx wdio session get <sub> [target] [name]
```

**आर्ग्युमेंट्स**

| नाम | आवश्यक | विवरण |
| --- | --- | --- |
| `sub` | हाँ | text \| html \| value \| attr \| title \| url \| count \| box |
| `target` | नहीं | Ref या selector (title और url के लिए उपयोग नहीं होता) |
| `name` | नहीं | Attribute का नाम (केवल attr) |

**उदाहरण**

```sh
# किसी ref का टेक्स्ट
npx wdio session get text e1

# वर्तमान URL
npx wdio session get url

# shell वेरिएबल के लिए केवल मान
url=$(npx wdio session get url -q)

# किसी लिंक का href
npx wdio session get attr e3 href

# कितने एलिमेंट्स मेल खाते हैं
npx wdio session get count "aria/Remove"
```

यह भी देखें: [`is`](#is), [`wait`](#wait), [`exec`](#exec)।

## `is`

जाँचें कि कोई एलिमेंट visible, enabled या checked है या नहीं। वेब पर लागू।

true या false प्रिंट करता है, फिर वह WebdriverIO कोड जो उसने चलाया; केवल मान प्रिंट करने के लिए -q पास करें। दोनों स्थितियों में exit code 0 होता है।

```sh
npx wdio session is <sub> <target>
```

**आर्ग्युमेंट्स**

| नाम | आवश्यक | विवरण |
| --- | --- | --- |
| `sub` | हाँ | visible \| enabled \| checked |
| `target` | हाँ | Ref या selector |

**उदाहरण**

```sh
# true या false प्रिंट करें
npx wdio session is visible e1

# किसी बटन को उसके label से जाँचें
npx wdio session is enabled "aria/Place order"
```

यह भी देखें: [`get`](#get), [`wait`](#wait)।

## `logs`

पिछली कॉल के बाद से console, page error, network और device लॉग प्रिंट करें। वेब, native mobile पर लागू।

हर कॉल एक read cursor को आगे बढ़ाती है, इसलिए अगली कॉल केवल नई प्रविष्टियाँ दिखाती है। किसी एक्शन से हुई त्रुटियाँ देखने के लिए उस एक्शन के बाद इसे चलाएँ।

```sh
npx wdio session logs
```

**फ़्लैग**

| फ़्लैग | विवरण |
| --- | --- |
| `--errors` | केवल त्रुटियाँ |
| `--network` | केवल network प्रविष्टियाँ |
| `--since <value>` | केवल इस अवधि से नई प्रविष्टियाँ (जैसे 30s) |
| `--peek` | read cursor को आगे न बढ़ाएँ |
| `--source <browser\|driver\|logcat\|syslog\|main>` | लॉग स्रोत |

**उदाहरण**

```sh
# एक click से हुई त्रुटियाँ
npx wdio session click e4 && npx wdio session logs --errors

# हाल की प्रविष्टियाँ, उन्हें अगली कॉल के लिए रखें
npx wdio session logs --since 30s --peek
```

यह भी देखें: [`requests`](#requests)।

## `navigate`

एक URL खोलें। वेब पर लागू।

`example.com`, पूर्ण URLs और baseUrl के सापेक्ष पाथ स्वीकार करता है। पहले किसी भी frame से बाहर निकलता है। नया URL और title प्रिंट करता है।

```sh
npx wdio session navigate <url>
```

**आर्ग्युमेंट्स**

| नाम | आवश्यक | विवरण |
| --- | --- | --- |
| `url` | हाँ | URL (सापेक्ष URLs baseUrl का उपयोग करते हैं) |

**उदाहरण**

```sh
# किसी पेज पर जाएँ और उसे देखें
npx wdio session navigate /cart && npx wdio session snapshot -i

# दूसरी साइट खोलें
npx wdio session navigate example.com
```

यह भी देखें: [`back`](#back), [`reload`](#reload), [`wait`](#wait)।

## `back`

पीछे जाएँ। वेब पर लागू।

```sh
npx wdio session back
```

**उदाहरण**

```sh
# एक पेज पीछे जाएँ
npx wdio session back
```

यह भी देखें: [`forward`](#forward), [`navigate`](#navigate)।

## `forward`

आगे जाएँ। वेब पर लागू।

```sh
npx wdio session forward
```

**उदाहरण**

```sh
# एक पेज आगे जाएँ
npx wdio session forward
```

यह भी देखें: [`back`](#back), [`navigate`](#navigate)।

## `reload`

पेज को रीलोड करें। वेब पर लागू।

```sh
npx wdio session reload
```

**उदाहरण**

```sh
# रीलोड करें और network शांत होने तक प्रतीक्षा करें
npx wdio session reload && npx wdio session wait --load networkidle
```

यह भी देखें: [`navigate`](#navigate), [`wait`](#wait)।

## `wait`

किसी एलिमेंट, टेक्स्ट, URL, load state, condition या कुछ मिलीसेकंड की प्रतीक्षा करें। वेब पर लागू।

इनमें से ठीक एक पास करें: कोई ref या selector, --text, --url, --load, --fn, या मिलीसेकंड। --limit के बाद exit code 1 के साथ विफल होता है।

यहाँ और किसी chain में `sleep` की तुलना में, pause के बजाय condition को प्राथमिकता दें। 30 सेकंड से लंबा pause अस्वीकार कर दिया जाता है।

```sh
npx wdio session wait [target]
```

**आर्ग्युमेंट्स**

| नाम | आवश्यक | विवरण |
| --- | --- | --- |
| `target` | नहीं | Ref, selector या मिलीसेकंड |

**फ़्लैग**

| फ़्लैग | विवरण |
| --- | --- |
| `--text <value>` | पेज में यह टेक्स्ट आने तक प्रतीक्षा करें |
| `--url <value>` | URL मेल खाने तक प्रतीक्षा करें (substring, या * और ** globs) |
| `--load <value>` | domcontentloaded, load या networkidle |
| `--fn <value>` | यह JavaScript expression true होने तक प्रतीक्षा करें |
| `--state <value>` | target के साथ: visible (डिफ़ॉल्ट), hidden, enabled या disabled |
| `--limit <n>` | प्रतीक्षा के मिलीसेकंड (डिफ़ॉल्ट 10000) |

**उदाहरण**

```sh
# किसी ref के visible होने तक प्रतीक्षा करें
npx wdio session wait e1

# spinner के गायब होने तक प्रतीक्षा करें
npx wdio session wait "aria/Loading" --state hidden

# एक्शन करें, परिणाम की प्रतीक्षा करें, दोबारा देखें
npx wdio session click e3 && npx wdio session wait --text "Cart (1)" && npx wdio session snapshot -i

# किसी URL की प्रतीक्षा करें
npx wdio session wait --url "**/dashboard"

# कोई रिक्वेस्ट चालू न रहने तक प्रतीक्षा करें
npx wdio session wait --load networkidle

# 500ms रुकें
npx wdio session wait 500
```

यह भी देखें: [`find`](#find), [`is`](#is), [`get`](#get)।

## `click`

किसी एलिमेंट पर click करें। वेब, native mobile, native desktop पर लागू।

प्रिंट करता है कि किस पर click किया गया और, जब click से navigation हुआ, तो नया URL। अगले पेज पर refs का उपयोग करने से पहले नया snapshot लें। छिपा हुआ या ढका हुआ एलिमेंट तुरंत विफल होता है, यह बताते हुए कि रास्ते में क्या है। `x,y` viewport के किसी बिंदु पर click करता है (screenshot की तरह, ऊपर बाएँ से पिक्सेल), उस चीज़ के लिए जिसका कोई ref नहीं है, जैसे canvas या map।

```sh
npx wdio session click <target>
```

**आर्ग्युमेंट्स**

| नाम | आवश्यक | विवरण |
| --- | --- | --- |
| `target` | हाँ | Ref (e12), WebdriverIO selector, या x,y viewport निर्देशांक |

**फ़्लैग**

| फ़्लैग | विवरण |
| --- | --- |
| `--double` | Double click |
| `--right` | Right click |
| `--new-tab` | लिंक को नए tab में खोलें और उस पर स्विच करें |

**उदाहरण**

```sh
# नवीनतम snapshot के किसी ref पर click करें
npx wdio session click e3

# accessible name से click करें
npx wdio session click "aria/Add to cart"

# click करें, प्रतीक्षा करें, दोबारा देखें
npx wdio session click e3 && npx wdio session wait --load networkidle && npx wdio session snapshot -i

# लिंक को नए tab में खोलें
npx wdio session click e8 --new-tab

# viewport के किसी बिंदु पर click करें, जैसे map पर
npx wdio session click 320,480
```

यह भी देखें: [`tap`](#tap), [`fill`](#fill), [`wait`](#wait), [`snapshot`](#snapshot)।

## `tap`

किसी एलिमेंट पर tap करें (मोबाइल)। native mobile पर लागू।

```sh
npx wdio session tap <target>
```

**आर्ग्युमेंट्स**

| नाम | आवश्यक | विवरण |
| --- | --- | --- |
| `target` | हाँ | Ref (e12) या WebdriverIO selector |

**उदाहरण**

```sh
# नवीनतम snapshot के किसी ref पर tap करें
npx wdio session tap e2
```

यह भी देखें: [`click`](#click), [`long-press`](#long-press), [`swipe`](#swipe)।

## `fill`

किसी input का मान बदलें। वेब, native mobile, native desktop पर लागू।

पहले फ़ील्ड को खाली करता है। जिस पर भी focus है उसमें टाइप करने के लिए `type` का उपयोग करें; Enter जैसी keys भेजने के लिए `press` का उपयोग करें।

```sh
npx wdio session fill <target> <text..>
```

**आर्ग्युमेंट्स**

| नाम | आवश्यक | विवरण |
| --- | --- | --- |
| `target` | हाँ | Ref (e12) या WebdriverIO selector |
| `text` | हाँ | टेक्स्ट (target के बाद के शब्द spaces से जोड़े जाते हैं) |

**उदाहरण**

```sh
# एक फ़ील्ड भरें
npx wdio session fill e2 ada@example.com

# एक फ़ॉर्म भरें और उसे submit करें
npx wdio session fill e2 ada@example.com && npx wdio session fill e4 secret && npx wdio session press Enter
```

यह भी देखें: [`type`](#type), [`press`](#press), [`select`](#select), [`check`](#check)।

## `type`

किसी एलिमेंट या focused एलिमेंट में टाइप करें। वेब, native mobile, native desktop पर लागू।

कुछ भी खाली किए बिना टेक्स्ट को key presses के रूप में भेजता है: `type e2 Ada` e2 में टाइप करता है, `type Ada` उसमें जिस पर भी focus है। किसी मान को बदलने के लिए `fill` का उपयोग करें।

```sh
npx wdio session type <text..>
```

**आर्ग्युमेंट्स**

| नाम | आवश्यक | विवरण |
| --- | --- | --- |
| `text` | हाँ | टेक्स्ट (शब्द spaces से जोड़े जाते हैं)। focused एलिमेंट के बजाय किसी एलिमेंट में टाइप करने के लिए ref से शुरू करें, जैसे `type e2 Ada` |

**उदाहरण**

```sh
# किसी फ़ील्ड में टाइप करें
npx wdio session type e5 hello

# जिस पर भी focus है उसमें टाइप करें
npx wdio session focus e5 && npx wdio session type "hello"
```

यह भी देखें: [`fill`](#fill), [`press`](#press), [`focus`](#focus)।

## `press`

keys दबाएँ, जैसे Enter, Control+a। वेब, native desktop पर लागू।

keys को + से जोड़ें। नाम case को अनदेखा करते हैं; ctrl, cmd, esc, up, down, left और right संक्षिप्त रूपों के रूप में स्वीकार किए जाते हैं।

```sh
npx wdio session press <keys>
```

**आर्ग्युमेंट्स**

| नाम | आवश्यक | विवरण |
| --- | --- | --- |
| `keys` | हाँ | Key संयोजन |

**फ़्लैग**

| फ़्लैग | विवरण |
| --- | --- |
| `--times <n>` | इसे इतनी बार दबाएँ (100 तक), जैसे किसी slider को खिसकाने के लिए |

**उदाहरण**

```sh
# एक फ़ॉर्म submit करें
npx wdio session press Enter

# focused slider को पाँच कदम खिसकाएँ
npx wdio session press ArrowRight --times 5

# सब चुनें
npx wdio session press Control+a

# focus को पीछे ले जाएँ
npx wdio session press Shift+Tab
```

यह भी देखें: [`type`](#type), [`fill`](#fill)।

## `select`

किसी `<select>` का एक option चुनें। वेब पर लागू।

```sh
npx wdio session select <target> <value>
```

**आर्ग्युमेंट्स**

| नाम | आवश्यक | विवरण |
| --- | --- | --- |
| `target` | हाँ | Ref (e12) या WebdriverIO selector |
| `value` | हाँ | Option का टेक्स्ट, value या index |

**फ़्लैग**

| फ़्लैग | विवरण |
| --- | --- |
| `--by <text\|value\|index>` | option का मिलान कैसे करें (डिफ़ॉल्ट text) |

**उदाहरण**

```sh
# दिखने वाले टेक्स्ट से चुनें
npx wdio session select e6 Germany

# value से चुनें
npx wdio session select e6 de --by value
```

यह भी देखें: [`fill`](#fill), [`check`](#check)।

## `upload`

एक file input सेट करें। वेब पर लागू।

पाथ आपकी working directory के सापेक्ष होता है। picker खोलने वाले बटन को नहीं, बल्कि स्वयं `<input type="file">` को टार्गेट करें।

```sh
npx wdio session upload <target> <file>
```

**आर्ग्युमेंट्स**

| नाम | आवश्यक | विवरण |
| --- | --- | --- |
| `target` | हाँ | Ref (e12) या WebdriverIO selector |
| `file` | हाँ | अपलोड करने के लिए फ़ाइल |

**उदाहरण**

```sh
# एक फ़ाइल संलग्न करें
npx wdio session upload e9 ./fixtures/avatar.png
```

यह भी देखें: [`fill`](#fill)।

## `hover`

pointer को किसी एलिमेंट के ऊपर ले जाएँ। वेब, native desktop पर लागू।

```sh
npx wdio session hover <target>
```

**आर्ग्युमेंट्स**

| नाम | आवश्यक | विवरण |
| --- | --- | --- |
| `target` | हाँ | Ref (e12) या WebdriverIO selector |

**उदाहरण**

```sh
# एक hover menu खोलें और उसे देखें
npx wdio session hover e4 && npx wdio session snapshot -i
```

यह भी देखें: [`click`](#click)।

## `focus`

किसी एलिमेंट पर focus करें। वेब पर लागू।

```sh
npx wdio session focus <target>
```

**आर्ग्युमेंट्स**

| नाम | आवश्यक | विवरण |
| --- | --- | --- |
| `target` | हाँ | Ref (e12) या WebdriverIO selector |

**उदाहरण**

```sh
# `type` से पहले किसी फ़ील्ड पर focus करें
npx wdio session focus e5
```

यह भी देखें: [`type`](#type), [`press`](#press)।

## `check`

किसी checkbox या radio को check करें। वेब पर लागू।

जब यह पहले से checked हो तो कुछ नहीं करता, और जब यह अंत में checked न हो तो विफल होता है।

```sh
npx wdio session check <target>
```

**आर्ग्युमेंट्स**

| नाम | आवश्यक | विवरण |
| --- | --- | --- |
| `target` | हाँ | Ref (e12) या WebdriverIO selector |

**उदाहरण**

```sh
# शर्तें स्वीकार करें
npx wdio session check e7
```

यह भी देखें: [`uncheck`](#uncheck), [`is`](#is)।

## `uncheck`

किसी checkbox को uncheck करें। वेब पर लागू।

जब यह पहले से unchecked हो तो कुछ नहीं करता। चुने गए radio button को uncheck नहीं किया जा सकता।

```sh
npx wdio session uncheck <target>
```

**आर्ग्युमेंट्स**

| नाम | आवश्यक | विवरण |
| --- | --- | --- |
| `target` | हाँ | Ref (e12) या WebdriverIO selector |

**उदाहरण**

```sh
# newsletter से बाहर निकलें
npx wdio session uncheck e7
```

यह भी देखें: [`check`](#check), [`is`](#is)।

## `drag`

किसी एलिमेंट को दूसरे पर drag करें। वेब, native mobile, native desktop पर लागू।

```sh
npx wdio session drag <from> <to>
```

**आर्ग्युमेंट्स**

| नाम | आवश्यक | विवरण |
| --- | --- | --- |
| `from` | हाँ | drag करने के लिए Ref या selector |
| `to` | हाँ | जिस पर drop करना है उसका Ref या selector |

**उदाहरण**

```sh
# एक card को दूसरे column में ले जाएँ
npx wdio session drag e3 e9
```

यह भी देखें: [`scroll`](#scroll)।

## `scroll`

किसी एलिमेंट को स्क्रॉल करके दृश्य में लाएँ या पेज को स्क्रॉल करें। वेब पर लागू।

बिना target के यह 600px नीचे स्क्रॉल करता है। Lazy-loaded content अगले snapshot में दिखाई देता है।

```sh
npx wdio session scroll [target]
```

**आर्ग्युमेंट्स**

| नाम | आवश्यक | विवरण |
| --- | --- | --- |
| `target` | नहीं | Ref, selector, up, down, top या bottom |

**फ़्लैग**

| फ़्लैग | विवरण |
| --- | --- |
| `--px <n>` | up/down के लिए पिक्सेल (डिफ़ॉल्ट 600) |

**उदाहरण**

```sh
# किसी एलिमेंट को दृश्य में लाएँ
npx wdio session scroll e40

# और परिणाम लोड करें और उन्हें देखें
npx wdio session scroll bottom && npx wdio session snapshot -i

# दो स्क्रीन स्क्रॉल करें
npx wdio session scroll down --px 1200
```

यह भी देखें: [`swipe`](#swipe), [`snapshot`](#snapshot)।

## `swipe`

स्क्रीन को swipe करें (मोबाइल)। native mobile पर लागू।

```sh
npx wdio session swipe <direction>
```

**आर्ग्युमेंट्स**

| नाम | आवश्यक | विवरण |
| --- | --- | --- |
| `direction` | हाँ | up \| down \| left \| right |

**फ़्लैग**

| फ़्लैग | विवरण |
| --- | --- |
| `--percent <n>` | Swipe की लंबाई 0..1 |

**उदाहरण**

```sh
# एक सूची स्क्रॉल करें और उसे देखें
npx wdio session swipe up && npx wdio session snapshot
```

यह भी देखें: [`scroll`](#scroll), [`tap`](#tap)।

## `long-press`

किसी एलिमेंट को देर तक दबाएँ (मोबाइल)। native mobile पर लागू।

```sh
npx wdio session long-press <target>
```

**आर्ग्युमेंट्स**

| नाम | आवश्यक | विवरण |
| --- | --- | --- |
| `target` | हाँ | Ref (e12) या WebdriverIO selector |

**फ़्लैग**

| फ़्लैग | विवरण |
| --- | --- |
| `--duration <n>` | मिलीसेकंड |

**उदाहरण**

```sh
# एक context menu खोलें
npx wdio session long-press e4 --duration 1500
```

यह भी देखें: [`tap`](#tap)।

## `tabs`

tabs की सूची दिखाएँ, खोलें, स्विच करें या बंद करें। वेब पर लागू।

बिना subcommand के यह tabs को उनके index के साथ सूचीबद्ध करता है; वर्तमान tab चिह्नित होता है। `new` एक tab खोलता है और उस पर स्विच करता है। `switch` और `close` एक index या handle लेते हैं।

```sh
npx wdio session tabs [sub] [arg]
```

**आर्ग्युमेंट्स**

| नाम | आवश्यक | विवरण |
| --- | --- | --- |
| `sub` | नहीं | switch \| new \| close |
| `arg` | नहीं | Index, handle या URL |

**उदाहरण**

```sh
# tabs की सूची दिखाएँ
npx wdio session tabs

# एक tab खोलें
npx wdio session tabs new http://localhost:3000/help

# पहले tab पर वापस जाएँ
npx wdio session tabs switch 0

# दूसरा tab बंद करें
npx wdio session tabs close 1
```

यह भी देखें: [`windows`](#windows), [`frame`](#frame)।

## `windows`

windows की सूची दिखाएँ या स्विच करें। वेब, native desktop पर लागू।

```sh
npx wdio session windows [sub] [arg]
```

**आर्ग्युमेंट्स**

| नाम | आवश्यक | विवरण |
| --- | --- | --- |
| `sub` | नहीं | switch |
| `arg` | नहीं | Index या handle |

**उदाहरण**

```sh
# windows की सूची दिखाएँ
npx wdio session windows

# दूसरी window पर स्विच करें
npx wdio session windows switch 1
```

यह भी देखें: [`tabs`](#tabs)।

## `frame`

किसी iframe में, parent पर या top पर स्विच करें। वेब पर लागू।

पेज snapshot पहले से ही अपने iframes का content दिखाता है, ऐसे refs के साथ जिन्हें एक्शन्स सीधे उपयोग करते हैं, इसलिए `frame` की ज़रूरत केवल तब होती है जब कुछ समय तक एक frame के अंदर काम करना हो या कोई ऐसा frame देखना हो जिसे snapshot ने छोटा कर दिया। जब तक आप वापस स्विच नहीं करते, snapshots और एक्शन्स वर्तमान frame पर लागू होते हैं। `navigate` top document पर लौटता है।

```sh
npx wdio session frame <target>
```

**आर्ग्युमेंट्स**

| नाम | आवश्यक | विवरण |
| --- | --- | --- |
| `target` | हाँ | Ref, selector, parent या top |

**उदाहरण**

```sh
# किसी iframe में प्रवेश करें और अंदर देखें
npx wdio session frame e12 && npx wdio session snapshot -i

# पेज पर वापस जाएँ
npx wdio session frame top
```

यह भी देखें: [`tabs`](#tabs), [`snapshot`](#snapshot)।

## `contexts`

native/webview contexts की सूची दिखाएँ या स्विच करें। native mobile पर लागू।

```sh
npx wdio session contexts [sub] [name]
```

**आर्ग्युमेंट्स**

| नाम | आवश्यक | विवरण |
| --- | --- | --- |
| `sub` | नहीं | switch |
| `name` | नहीं | Context का नाम |

**उदाहरण**

```sh
# NATIVE_APP और WEBVIEW contexts की सूची दिखाएँ
npx wdio session contexts

# webview को नियंत्रित करें
npx wdio session contexts switch WEBVIEW_com.example.shop
```

यह भी देखें: [`snapshot`](#snapshot)।

## `dialog`

किसी खुले dialog को स्वीकार करें, खारिज करें या उसकी रिपोर्ट करें। वेब, native mobile पर लागू।

एक खुला alert, confirm या prompt अन्य एक्शन्स को रोकता है, जो इसे चलाने के संकेत के साथ विफल होते हैं।

```sh
npx wdio session dialog <sub>
```

**आर्ग्युमेंट्स**

| नाम | आवश्यक | विवरण |
| --- | --- | --- |
| `sub` | हाँ | accept \| dismiss \| status |

**फ़्लैग**

| फ़्लैग | विवरण |
| --- | --- |
| `--text <value>` | Prompt टेक्स्ट (केवल accept) |

**उदाहरण**

```sh
# खुला dialog दिखाएँ
npx wdio session dialog status

# पुष्टि करें
npx wdio session dialog accept

# किसी prompt का उत्तर दें
npx wdio session dialog accept --text "Ada"
```

यह भी देखें: [`click`](#click)।

## `app`

किसी ऐप को launch, terminate, install या query करें। native mobile, native desktop पर लागू।

```sh
npx wdio session app <sub> <id>
```

**आर्ग्युमेंट्स**

| नाम | आवश्यक | विवरण |
| --- | --- | --- |
| `sub` | हाँ | launch \| terminate \| install \| state |
| `id` | हाँ | App id, bundle id या फ़ाइल |

**उदाहरण**

```sh
# ऐप को restart करें
npx wdio session app terminate com.example.shop && npx wdio session app launch com.example.shop

# क्या यह चल रहा है?
npx wdio session app state com.example.shop
```

यह भी देखें: [`deeplink`](#deeplink), [`background`](#background)।

## `deeplink`

एक deep link खोलें। native mobile पर लागू।

```sh
npx wdio session deeplink <url>
```

**आर्ग्युमेंट्स**

| नाम | आवश्यक | विवरण |
| --- | --- | --- |
| `url` | हाँ | URL |

**फ़्लैग**

| फ़्लैग | विवरण |
| --- | --- |
| `--package <value>` | Android package या iOS bundle id |

**उदाहरण**

```sh
# एक product स्क्रीन खोलें
npx wdio session deeplink shop://product/42 --package com.example.shop
```

यह भी देखें: [`app`](#app)।

## `rotate`

डिवाइस को घुमाएँ। native mobile पर लागू।

```sh
npx wdio session rotate <orientation>
```

**आर्ग्युमेंट्स**

| नाम | आवश्यक | विवरण |
| --- | --- | --- |
| `orientation` | हाँ | portrait \| landscape |

**उदाहरण**

```sh
# डिवाइस को आड़ा करें
npx wdio session rotate landscape
```

## `keyboard`

on-screen keyboard छिपाएँ। native mobile पर लागू।

```sh
npx wdio session keyboard <sub>
```

**आर्ग्युमेंट्स**

| नाम | आवश्यक | विवरण |
| --- | --- | --- |
| `sub` | हाँ | hide |

**उदाहरण**

```sh
# keyboard के नीचे के एलिमेंट्स को खोलें
npx wdio session keyboard hide
```

## `background`

ऐप को background में भेजें। native mobile पर लागू।

```sh
npx wdio session background <seconds>
```

**आर्ग्युमेंट्स**

| नाम | आवश्यक | विवरण |
| --- | --- | --- |
| `seconds` | हाँ | सेकंड (-1 इसे वहीं रखता है) |

**उदाहरण**

```sh
# ऐप को 3 सेकंड के लिए background में भेजें
npx wdio session background 3
```

यह भी देखें: [`app`](#app)।

## `lock`

डिवाइस को lock करें। native mobile पर लागू।

```sh
npx wdio session lock
```

**उदाहरण**

```sh
# स्क्रीन lock करें
npx wdio session lock
```

यह भी देखें: [`unlock`](#unlock)।

## `unlock`

डिवाइस को unlock करें। native mobile पर लागू।

```sh
npx wdio session unlock
```

**उदाहरण**

```sh
# स्क्रीन unlock करें
npx wdio session unlock
```

यह भी देखें: [`lock`](#lock)।

## `geolocation`

geolocation सेट करें। वेब, native mobile पर लागू।

```sh
npx wdio session geolocation <lat> <lon>
```

**आर्ग्युमेंट्स**

| नाम | आवश्यक | विवरण |
| --- | --- | --- |
| `lat` | हाँ | अक्षांश |
| `lon` | हाँ | देशांतर |

**फ़्लैग**

| फ़्लैग | विवरण |
| --- | --- |
| `--accuracy <n>` | मीटर में सटीकता |

**उदाहरण**

```sh
# Berlin में होने का दिखावा करें
npx wdio session geolocation 52.52 13.405
```

यह भी देखें: [`emulate`](#emulate)।

## `emulate`

किसी device, viewport, network, cpu, clock या BiDi emulation scope का emulation करें। वेब पर लागू।

एक emulation `emulate reset` या सेशन समाप्त होने तक बना रहता है; उसी प्रकार को दोबारा सेट करने से वह बदल जाता है। बिना मान के `emulate device` device नामों की सूची दिखाता है। Network presets और cpu throttling के लिए Chromium ब्राउज़र चाहिए।

```sh
npx wdio session emulate <sub> [value]
```

**आर्ग्युमेंट्स**

| नाम | आवश्यक | विवरण |
| --- | --- | --- |
| `sub` | हाँ | device \| viewport \| network \| cpu \| clock \| color-scheme \| user-agent \| media \| locale \| timezone \| touch \| orientation \| screen \| viewport-meta \| text-layout \| scripting \| scrollbar \| forced-colors \| reset |
| `value` | नहीं | emulation के लिए मान |

**फ़्लैग**

| फ़्लैग | विवरण |
| --- | --- |
| `--dpr <n>` | Device pixel ratio (viewport) |
| `--tick <n>` | emulated clock को ms से आगे बढ़ाएँ (clock) |

**उदाहरण**

```sh
# एक फ़ोन का emulation करें
npx wdio session emulate device "iPhone 15"

# एक viewport सेट करें
npx wdio session emulate viewport 375x812 --dpr 3

# offline हो जाएँ
npx wdio session emulate network offline

# Dark mode
npx wdio session emulate color-scheme dark

# तारीख को स्थिर करें
npx wdio session emulate clock 2030-01-01T00:00:00Z

# motion कम करें
npx wdio session emulate media prefersReducedMotion=reduce

# हर emulation को पूर्ववत करें
npx wdio session emulate reset
```

यह भी देखें: [`geolocation`](#geolocation), [`screenshot`](#screenshot)।

## `requests`

कैप्चर किए गए network requests की सूची दिखाएँ (BiDi)। वेब पर लागू।

```sh
npx wdio session requests
```

**फ़्लैग**

| फ़्लैग | विवरण |
| --- | --- |
| `--filter <value>` | Substring या glob |
| `--failed` | केवल विफल requests |
| `--since <value>` | केवल इस अवधि से नए requests |
| `--limit <n>` | अधिकतम पंक्तियाँ (डिफ़ॉल्ट 50) |

**उदाहरण**

```sh
# केवल API कॉल्स
npx wdio session requests --filter "**/api/**"

# वे requests जिन्हें एक click ने तोड़ा
npx wdio session click e3 && npx wdio session requests --failed --since 10s
```

यह भी देखें: [`mock`](#mock), [`logs`](#logs)।

## `mock`

किसी URL pattern के लिए responses को mock करें (BiDi)। वेब पर लागू।

mock id (m1, m2, …) प्रिंट करता है। उसी pattern को दोबारा mock करने से पिछला mock बदल जाता है।

```sh
npx wdio session mock <pattern>
```

**आर्ग्युमेंट्स**

| नाम | आवश्यक | विवरण |
| --- | --- | --- |
| `pattern` | हाँ | URL pattern |

**फ़्लैग**

| फ़्लैग | विवरण |
| --- | --- |
| `--status <n>` | Status code |
| `--body <value>` | JSON/text के रूप में body या फ़ाइल पाथ |
| `--header <value>` | Header k:v (दोहराया जा सकता है) |
| `--abort` | मेल खाने वाले requests को abort करें |
| `--method <value>` | केवल यह method |
| `--once` | केवल अगला request |

**उदाहरण**

```sh
# निश्चित JSON लौटाएँ
npx wdio session mock "**/api/user" --body '{"name":"Mocked"}'

# अगले request को विफल करें
npx wdio session mock "**/api/cart" --status 500 --once

# images को block करें
npx wdio session mock "**/*.png" --abort
```

यह भी देखें: [`unmock`](#unmock), [`requests`](#requests)।

## `unmock`

mocks हटाएँ। वेब पर लागू।

```sh
npx wdio session unmock [pattern]
```

**आर्ग्युमेंट्स**

| नाम | आवश्यक | विवरण |
| --- | --- | --- |
| `pattern` | नहीं | Pattern या mock id |

**फ़्लैग**

| फ़्लैग | विवरण |
| --- | --- |
| `--all` | सभी mocks हटाएँ |

**उदाहरण**

```sh
# एक mock हटाएँ
npx wdio session unmock m1

# हर mock हटाएँ
npx wdio session unmock --all
```

यह भी देखें: [`mock`](#mock)।

## `cookies`

cookies प्राप्त करें, सेट करें या साफ़ करें। वेब पर लागू।

बिना subcommand के यह हर cookie को name=value के रूप में प्रिंट करता है। बिना नाम के `clear` सभी cookies हटा देता है।

```sh
npx wdio session cookies [sub] [name] [value]
```

**आर्ग्युमेंट्स**

| नाम | आवश्यक | विवरण |
| --- | --- | --- |
| `sub` | नहीं | get \| set \| clear |
| `name` | नहीं | Cookie का नाम |
| `value` | नहीं | Cookie का मान |

**फ़्लैग**

| फ़्लैग | विवरण |
| --- | --- |
| `--domain <value>` | Cookie domain (set) |
| `--path <value>` | Cookie path (set) |
| `--http-only` | HttpOnly cookie (set) |
| `--secure` | Secure cookie (set) |
| `--same-site <value>` | lax, strict, none या default (set) |
| `--expiry <n>` | सेकंड में Unix timestamp के रूप में समाप्ति (set) |

**उदाहरण**

```sh
# cookies की सूची दिखाएँ
npx wdio session cookies

# एक cookie का मान
npx wdio session cookies get session

# एक cookie सेट करें और रीलोड करें
npx wdio session cookies set session abc && npx wdio session reload

# सभी cookies हटाएँ
npx wdio session cookies clear
```

यह भी देखें: [`storage`](#storage), [`state`](#state)।

## `storage`

localStorage (या sessionStorage) प्राप्त करें, सेट करें या साफ़ करें। वेब पर लागू।

बिना subcommand के यह हर प्रविष्टि प्रिंट करता है। बिना key के `clear` store को खाली कर देता है।

```sh
npx wdio session storage [sub] [key] [value]
```

**आर्ग्युमेंट्स**

| नाम | आवश्यक | विवरण |
| --- | --- | --- |
| `sub` | नहीं | get \| set \| clear |
| `key` | नहीं | Key |
| `value` | नहीं | मान |

**फ़्लैग**

| फ़्लैग | विवरण |
| --- | --- |
| `--session-storage` | sessionStorage का उपयोग करें |

**उदाहरण**

```sh
# localStorage की सूची दिखाएँ
npx wdio session storage

# एक key सेट करें
npx wdio session storage set token abc

# sessionStorage खाली करें
npx wdio session storage clear --session-storage
```

यह भी देखें: [`cookies`](#cookies), [`state`](#state)।

## `state`

cookies और storage सहेजें या लोड करें। वेब पर लागू।

`save` वर्तमान origin की cookies, localStorage और sessionStorage को एक JSON फ़ाइल में लिखता है। `load` उस origin को खोलता है और उन्हें पुनर्स्थापित करता है, जैसे login छोड़ने के लिए।

```sh
npx wdio session state <sub> <file>
```

**आर्ग्युमेंट्स**

| नाम | आवश्यक | विवरण |
| --- | --- | --- |
| `sub` | हाँ | save \| load |
| `file` | हाँ | State फ़ाइल |

**उदाहरण**

```sh
# logged-in स्थिति सहेजें
npx wdio session state save .wdio/logged-in.json

# logged in अवस्था में शुरू करें
npx wdio session state load .wdio/logged-in.json && npx wdio session reload
```

यह भी देखें: [`cookies`](#cookies), [`storage`](#storage)।

## `visual`

@wdio/visual-service के माध्यम से visual snapshots। वेब, native mobile, native desktop पर लागू।

`save` .wdio/visual/baseline के अंतर्गत एक baseline संग्रहीत करता है, `check` उससे तुलना करता है और mismatch प्रिंट करता है, `accept` आखिरी actual image को baseline बना देता है, `list` tags दिखाता है। प्रोजेक्ट में @wdio/visual-service की आवश्यकता है।

```sh
npx wdio session visual <sub> [tag]
```

**आर्ग्युमेंट्स**

| नाम | आवश्यक | विवरण |
| --- | --- | --- |
| `sub` | हाँ | save \| check \| accept \| list |
| `tag` | नहीं | Image tag |

**फ़्लैग**

| फ़्लैग | विवरण |
| --- | --- |
| `--element <value>` | केवल यह एलिमेंट |
| `--full` | पूरा पेज |
| `--tabbable` | Tabbable पेज |
| `--threshold <n>` | प्रतिशत में अनुमत mismatch (डिफ़ॉल्ट 0) |
| `--all` | accept: हर tag |

**उदाहरण**

```sh
# एक baseline संग्रहीत करें
npx wdio session visual save cart

# उससे तुलना करें
npx wdio session visual check cart --threshold 0.5

# एक इच्छित बदलाव स्वीकार करें
npx wdio session visual accept cart
```

यह भी देखें: [`screenshot`](#screenshot)।

## `trace`

हर चरण को screenshots और snapshots के साथ रिकॉर्ड करें।

`stop` trace डायरेक्टरी और चरणों का transcript प्रिंट करता है।

```sh
npx wdio session trace <sub>
```

**आर्ग्युमेंट्स**

| नाम | आवश्यक | विवरण |
| --- | --- | --- |
| `sub` | हाँ | start \| stop |

**फ़्लैग**

| फ़्लैग | विवरण |
| --- | --- |
| `--screenshots` | हर चरण के बाद screenshot (छोड़ने के लिए --no-screenshots का उपयोग करें) |
| `--snapshots` | हर चरण के बाद snapshot (छोड़ने के लिए --no-snapshots का उपयोग करें) |

**उदाहरण**

```sh
# tracing शुरू करें
npx wdio session trace start

# रोकें और transcript प्रिंट करें
npx wdio session trace stop
```

यह भी देखें: [`record`](#record), [`history`](#history)।

## `record`

एक वीडियो रिकॉर्ड करें। वेब, native mobile पर लागू।

```sh
npx wdio session record <sub>
```

**आर्ग्युमेंट्स**

| नाम | आवश्यक | विवरण |
| --- | --- | --- |
| `sub` | हाँ | start \| stop |

**फ़्लैग**

| फ़्लैग | विवरण |
| --- | --- |
| `--fps <n>` | प्रति सेकंड फ़्रेम (डिफ़ॉल्ट 5) |
| `--path <value>` | आउटपुट फ़ाइल |

**उदाहरण**

```sh
# रिकॉर्डिंग शुरू करें
npx wdio session record start

# रोकें और वीडियो सहेजें
npx wdio session record stop --path checkout.mp4
```

यह भी देखें: [`trace`](#trace), [`screenshot`](#screenshot)।

## `history`

रिकॉर्ड किए गए चरण प्रिंट करें।

पेज को बदलने वाला हर एक्शन वह WebdriverIO कोड रिकॉर्ड करता है जो उसने चलाया। `export` इस history को एक spec में बदल देता है।

```sh
npx wdio session history
```

**फ़्लैग**

| फ़्लैग | विवरण |
| --- | --- |
| `--clear` | history साफ़ करें |

**उदाहरण**

```sh
# अब तक के चरण दिखाएँ
npx wdio session history

# जिन चरणों को रखना है उनसे पहले रिकॉर्डिंग फिर से शुरू करें
npx wdio session history --clear
```

यह भी देखें: [`export`](#export), [`exec`](#exec)।

## `export`

history से एक spec बनाएँ।

रिकॉर्ड किए गए चरणों के साथ एक describe/it spec लिखता है। Refs स्थिर selectors बन जाते हैं और helpers custom commands बन जाते हैं। --out के बिना फ़ाइल artifacts डायरेक्टरी में जाती है। यह पुष्टि करने के लिए कि यह पास होता है, इसे `wdio run` के साथ चलाएँ।

```sh
npx wdio session export
```

**फ़्लैग**

| फ़्लैग | विवरण |
| --- | --- |
| `--out <value>` | आउटपुट फ़ाइल |
| `--title <value>` | Suite का शीर्षक |
| `--page-objects` | page objects बनाएँ |
| `--framework <mocha\|jasmine>` | Framework (डिफ़ॉल्ट mocha) |

**उदाहरण**

```sh
# spec लिखें
npx wdio session export --out test/specs/cart.e2e.ts

# spec लिखें और उसे चलाएँ
npx wdio session export --out test/specs/cart.e2e.ts && npx wdio run wdio.conf.ts --spec test/specs/cart.e2e.ts
```

यह भी देखें: [`history`](#history), [`helpers`](#helpers)।

## `resume`

wdio run --debug=agent द्वारा रोके गए टेस्ट को जारी रखें।

`wdio run --debug=agent` एक विफल टेस्ट को रोकता है और उसे सेशन debug-`<worker>` के रूप में उपलब्ध कराता है। किसी भी एक्शन से इसकी जाँच करें, फिर resume करें। उस सेशन पर `close` इसके बजाय टेस्ट को विफल कर देता है।

```sh
npx wdio session resume
```

**उदाहरण**

```sh
# रुके हुए टेस्ट को देखें, फिर उसे जारी रहने दें
npx wdio session -s debug-0-0 snapshot -i && npx wdio session -s debug-0-0 resume
```

यह भी देखें: [`close`](#close), [`list`](#list)।

## `doctor`

अपने environment की जाँच करें।

प्रति जाँच एक पंक्ति प्रिंट करता है, हर विफलता के लिए एक समाधान के साथ। कोई जाँच विफल होने पर 1 से exit करता है।

```sh
npx wdio session doctor [target]
```

**आर्ग्युमेंट्स**

| नाम | आवश्यक | विवरण |
| --- | --- | --- |
| `target` | नहीं | केवल वही जाँचें जो इस target को चाहिए |

**उदाहरण**

```sh
# सब कुछ जाँचें
npx wdio session doctor

# जाँचें कि Android सेशन को क्या चाहिए
npx wdio session doctor android
```

यह भी देखें: [`open`](#open)।

## `skill`

agent skill प्रिंट करें।

```sh
npx wdio session skill
```

**फ़्लैग**

| फ़्लैग | विवरण |
| --- | --- |
| `--install <value>` | इसे .agents/skills/wdio-session/SKILL.md (या इस डायरेक्टरी) में लिखें |

**उदाहरण**

```sh
# skill प्रिंट करें
npx wdio session skill

# इसे इस प्रोजेक्ट में जोड़ें
npx wdio session skill --install .
```