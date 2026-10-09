---
id: session-commands
title: wdio session कमांड्स
description: open से लेकर doctor और skill तक, हर wdio session ऐक्शन और फ़्लैग।
slug: /session-commands
---

<!-- Generated from packages/wdio-session/src/actions/specs.ts by `pnpm run docs:session-commands`. Do not edit by hand. -->

यहाँ हर `wdio session` ऐक्शन दिया गया है। ग्लोबल फ़्लैग सभी ऐक्शन पर लागू होते हैं। यही टेक्स्ट `npx wdio session <action> --help` भी प्रिंट करता है। [WebdriverIO Session](/docs/session) सेक्शन के बाकी पेज [टारगेट](/docs/session/targets), [स्नैपशॉट](/docs/session/snapshots), [`exec`](/docs/session/exec), [एक्सपोर्ट](/docs/session/export) और [डीबगिंग](/docs/session/debug) के बारे में बताते हैं।

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

एग्ज़िट कोड: 0 सफलता, 1 ऐक्शन या आपका कोड विफल हुआ, 2 उपयोग में त्रुटि, 3 कोई डिपेंडेंसी या क्रेडेंशियल मौजूद नहीं, 4 उस नाम का कोई सेशन नहीं।

## `open`

एक सेशन शुरू करें: browser, android, ios, macos, windows, electron, tauri, dioxus या कोई wdio कॉन्फ़िग फ़ाइल।

एक बैकग्राउंड डेमन शुरू करता है जो सेशन को `close` तक, या --idle-timeout (डिफ़ॉल्ट 30m) तक निष्क्रिय रहने तक चालू रखता है। जब तक आप --headed पास नहीं करते, ब्राउज़र headless चलते हैं। यह सेशन का नाम, टारगेट, वह आर्टिफ़ैक्ट्स डायरेक्टरी जहाँ स्नैपशॉट, स्क्रीनशॉट और एक्सपोर्ट जाते हैं, और किसी URL पर खोले गए ब्राउज़र के लिए उस पेज का इंटरैक्टिव स्नैपशॉट प्रिंट करता है।

हर नाम के लिए एक सेशन। पहले से चल रहे नाम को खोलना विफल होता है; उसका उपयोग करें, उसे बंद करें, या --replace पास करें। `-s <name>` केवल तभी पास करें जब आपको एक साथ दो सेशन चाहिए।

```sh
npx wdio session open <target> [url]
```

**आर्ग्युमेंट्स**

| नाम | आवश्यक | विवरण |
| --- | --- | --- |
| `target` | हाँ | chrome \| firefox \| edge \| safari \| android \| ios \| macos \| windows \| electron `<app>` \| tauri `<app>` \| dioxus `<app>` \| `<wdio.conf>` |
| `url` | नहीं | खोलने के लिए URL (ब्राउज़र), ऐप पाथ (डेस्कटॉप ऐप) या capability (कॉन्फ़िग) |

**फ़्लैग**

| फ़्लैग | विवरण |
| --- | --- |
| `--replace` | पहले उसी नाम का चल रहा सेशन बंद करें |
| `--launch-timeout <n>` | सेशन के तैयार होने तक प्रतीक्षा करने के मिलीसेकंड |
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
| `--snapshot` | खोले गए पेज का इंटरैक्टिव स्नैपशॉट प्रिंट करें (छोड़ने के लिए --no-snapshot का उपयोग करें) |
| `--viewport <value>` | शुरुआती viewport, जैसे 1280x720 |
| `--browser-version <value>` | ब्राउज़र वर्ज़न |
| `--binary <value>` | ब्राउज़र बाइनरी |
| `--arg <value>` | अतिरिक्त ब्राउज़र आर्ग्युमेंट। `-` से शुरू होने वाली वैल्यू के लिए `=` चाहिए, जैसे `--arg=--disable-gpu` (दोहराया जा सकता है) |
| `--profile <value>` | स्थायी प्रोफ़ाइल डायरेक्टरी |
| `--attach <value>` | चल रहे Chrome/Edge से जुड़ें (डीबगिंग पोर्ट या URL) |
| `--app <value>` | ऐप फ़ाइल या क्लाउड ऐप URL |
| `--package <value>` | Android ऐप पैकेज |
| `--activity <value>` | Android ऐप activity |
| `--bundle-id <value>` | iOS/macOS bundle id |
| `--browser <value>` | मोबाइल वेब ब्राउज़र (chrome, safari) |
| `--device <value>` | डिवाइस का नाम |
| `--platform-version <value>` | प्लेटफ़ॉर्म वर्ज़न |
| `--udid <value>` | डिवाइस UDID |
| `--reset` | ऐप की स्टेट बनाए रखने के लिए --no-reset का उपयोग करें (appium:noReset) |
| `--full-reset` | appium:fullReset |
| `--orientation <portrait\|landscape>` | शुरुआती ओरिएंटेशन |
| `--appium-url <value>` | चल रहे Appium सर्वर का उपयोग करें |
| `--app-arg <value>` | डेस्कटॉप ऐप को पास किया जाने वाला आर्ग्युमेंट। `-` से शुरू होने वाली वैल्यू के लिए `=` चाहिए, जैसे `--app-arg=--no-sandbox` (दोहराया जा सकता है) |
| `--chromedriver <value>` | Electron: Chromedriver बाइनरी |
| `--electron-version <value>` | Electron: वर्ज़न पहचान को ओवरराइड करें |
| `--provider <browserstack\|saucelabs\|testingbot\|testmu>` | क्लाउड प्रोवाइडर |
| `--os <value>` | क्लाउड: डेस्कटॉप OS |
| `--os-version <value>` | क्लाउड: डेस्कटॉप OS वर्ज़न |
| `--region <value>` | क्लाउड: Sauce Labs रीजन |
| `--tunnel <value>` | क्लाउड: प्रोवाइडर टनल शुरू करें (या "external") |
| `--tunnel-name <value>` | क्लाउड: टनल आइडेंटिफ़ायर |
| `--project <value>` | क्लाउड: प्रोजेक्ट लेबल |
| `--build <value>` | क्लाउड: बिल्ड लेबल |
| `--name <value>` | क्लाउड: सेशन नाम लेबल |

**उदाहरण**

```sh
# लोकल ऐप पर headless Chrome खोलें
npx wdio session open chrome http://localhost:3000

# दिखने वाली विंडो के साथ Firefox खोलें
npx wdio session open firefox http://localhost:3000 --headed

# Appium के ज़रिए Android ऐप खोलें
npx wdio session open android --app ./app.apk

# इंस्टॉल किया हुआ iOS ऐप खोलें
npx wdio session open ios --bundle-id com.example.shop

# Electron ऐप खोलें
npx wdio session open electron ./main.js

# कॉन्फ़िग की पहली capability खोलें
npx wdio session open ./wdio.conf.ts 0

# क्लाउड ग्रिड में Chrome खोलें
npx wdio session open chrome https://example.com --provider browserstack
```

यह भी देखें: [`snapshot`](#snapshot), [`close`](#close), [`doctor`](#doctor)।

## `close`

सेशन समाप्त करें और उसका डेमन रोकें।

`wdio run --debug=agent` द्वारा खोले गए सेशन पर यह रुके हुए टेस्ट को विफल कर देता है; उसे जारी रखने के लिए `resume` का उपयोग करें।

```sh
npx wdio session close
```

**फ़्लैग**

| फ़्लैग | विवरण |
| --- | --- |
| `--all` | हर सेशन बंद करें |
| `--clean` | आर्टिफ़ैक्ट्स डायरेक्टरी भी डिलीट करें |

**उदाहरण**

```sh
# डिफ़ॉल्ट सेशन बंद करें
npx wdio session close

# हर सेशन बंद करें और उनके आर्टिफ़ैक्ट्स डिलीट करें
npx wdio session close --all --clean
```

यह भी देखें: [`open`](#open), [`list`](#list)।

## `list`

चल रहे सेशन की सूची दिखाएँ।

हर सेशन के लिए एक लाइन प्रिंट करता है: नाम, टारगेट, URL और उम्र। बंद हो चुके सेशन द्वारा छोड़ी गई स्टेट को हटा देता है।

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

टारगेट, ब्राउज़र और वर्ज़न, BiDi सपोर्ट, आर्टिफ़ैक्ट्स डायरेक्टरी, और मौजूदा URL, टाइटल, विंडो का आकार और फ़्रेम (वेब) या context और activity (मोबाइल) प्रिंट करता है।

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

उसी टारगेट और फ़्लैग के साथ बंद करें और फिर से खोलें।

रिकॉर्ड की गई हिस्ट्री बनी रहती है, इसलिए `export` अब भी restart से पहले के स्टेप्स को शामिल करता है।

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

सेशन चल रहा हो तो 0 के साथ, न चल रहा हो तो 4 के साथ एग्ज़िट करें।

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

यह एक async फ़ंक्शन के रूप में चलता है, जिसके स्कोप में `browser`, `$`, `$$`, `expect` और `ref('e3')` होते हैं। टॉप-लेवल वेरिएबल कॉल्स के बीच बने रहते हैं। जब stdin पर कोड पाइप किया जाता है, तो बिना ऐक्शन के `wdio session` `exec` चलाता है।

कमांड्स को हमेशा `await` करें। `$` ठीक एक एलिमेंट लौटाता है और एक से ज़्यादा मैच होने पर StrictSelectorError थ्रो करता है। जब एक ही ऐक्शन (click, fill, …) से काम हो जाए तो उसे प्राथमिकता दें; लूप, शर्तों और assertions के लिए `exec` का उपयोग करें।

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
| `--history` | कोड को हिस्ट्री में रिकॉर्ड करें (छोड़ने के लिए --no-history का उपयोग करें) |

**उदाहरण**

```sh
# एक-लाइन कोड चलाएँ
npx wdio session exec -e "await browser.getTitle()"

# पेज पर assert करें (सिंगल कोट्स शेल को $ से दूर रखते हैं)
npx wdio session exec -e 'await expect($("h1")).toHaveText("Cart")'

# stdin पर कई स्टेप्स पाइप करें
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

.wdio/helpers के अंतर्गत हर फ़ाइल डिफ़ॉल्ट रूप से एक फ़ंक्शन एक्सपोर्ट करती है जो browser प्राप्त करता है और addCommand से कस्टम कमांड रजिस्टर करता है। सेशन खुलने पर helpers लोड होते हैं, और एक्सपोर्ट किए गए टेस्ट में वे कस्टम कमांड बन जाते हैं।

```sh
npx wdio session helpers
```

**फ़्लैग**

| फ़्लैग | विवरण |
| --- | --- |
| `--reload` | helpers को फिर से इम्पोर्ट करें |

**उदाहरण**

```sh
# helpers और उनके जोड़े गए कमांड की सूची दिखाएँ
npx wdio session helpers

# किसी helper में किए गए बदलाव लागू करें
npx wdio session helpers --reload
```

यह भी देखें: [`exec`](#exec), [`export`](#export)।

## `snapshot`

refs के साथ एक्सेसिबिलिटी स्नैपशॉट। वेब, नेटिव मोबाइल, नेटिव डेस्कटॉप पर लागू।

एक्सेसिबिलिटी ट्री प्रिंट करता है, हर लाइन में एक नोड, जैसे `button "Add to cart" [ref=e3]`। click, fill, get और अन्य ऐक्शन को एक ref पास करें। जब तक एलिमेंट मौजूद है, refs मान्य रहते हैं; हटाए गए एलिमेंट पर ऐक्शन REF_STALE के साथ विफल होता है।

हर स्नैपशॉट आर्टिफ़ैक्ट्स डायरेक्टरी में लिखा जाता है। --max-chars से लंबा आउटपुट हिस्सों में प्रिंट होता है: पहला हिस्सा, फिर अगले हिस्से के लिए `--offset <line>`। `find` पूरे में खोजता है।

टेक्स्ट लेआउट और --json का स्वरूप प्रयोगात्मक हैं और किसी माइनर रिलीज़ में बदल सकते हैं। ref सिंटैक्स और ref लेने वाले ऐक्शन स्थिर रहते हैं।

```sh
npx wdio session snapshot
```

**फ़्लैग**

| फ़्लैग | विवरण |
| --- | --- |
| `--depth <n>` | अधिकतम गहराई |
| `--scope <value>` | केवल इस ref या selector के नीचे का स्नैपशॉट लें |
| `-i, --interactive` | केवल इंटरैक्टिव एलिमेंट |
| `--all` | छिपे हुए एलिमेंट शामिल करें |
| `--boxes` | बाउंडिंग बॉक्स जोड़ें |
| `--viewport` | केवल वही जो viewport में है (वेब: diff बेसलाइन को अपडेट नहीं करता) |
| `--selectors` | हर ref लाइन को उसके सबसे अच्छे selector के साथ समाप्त करें |
| `--compact` | बिना नाम वाले उन नोड्स को हटाएँ जिनमें कोई कंटेंट नहीं है |
| `-u, --urls` | लिंक hrefs शामिल करें |
| `--file-only` | केवल फ़ाइल लिखें |
| `--max-chars <n>` | एक बार में अधिकतम इतने अक्षर प्रिंट करें (डिफ़ॉल्ट 8000) |
| `--offset <n>` | लंबे स्नैपशॉट के अगले हिस्से के लिए इस लाइन से आगे प्रिंट करें |

**उदाहरण**

```sh
# केवल इंटरैक्टिव एलिमेंट, आम तौर पर पहली नज़र
npx wdio session snapshot -i

# लिंक टारगेट के साथ पूरा पेज
npx wdio session snapshot --compact --urls

# पेज का केवल एक हिस्सा
npx wdio session snapshot --scope "#checkout" --depth 4

# अभी स्क्रीन पर क्या है
npx wdio session snapshot --viewport -i

# टेस्ट में डालने के लिए हर ref के साथ एक selector
npx wdio session snapshot --selectors -i

# ऐक्शन करें, फिर दोबारा देखें
npx wdio session click e3 && npx wdio session snapshot -i
```

यह भी देखें: [`find`](#find), [`diff`](#diff), [`screenshot`](#screenshot)।

## `read`

पेज के टेक्स्ट को Markdown के रूप में पढ़ें। वेब पर लागू।

हेडिंग, पैराग्राफ़, लिस्ट आइटम, टेबल रो और लिंक उनके URL के साथ — जब पेज मुख्य कंटेंट को चिह्नित करता है (main, article) तो उसी से, वरना पूरे पेज से; नेविगेशन, फ़ुटर और छिपा हुआ टेक्स्ट छोड़ दिया जाता है। --max-chars (डिफ़ॉल्ट 6000) पर काटा जाता है; कटौती बताती है कि कौन-सा --offset अगला हिस्सा पढ़ता है। --scope के साथ, वह सेक्शन स्क्रॉल करके दिखाया जाता है। "पेज क्या कहता है" का जवाब देने के लिए इसका उपयोग करें; ऐक्शन करने के लिए refs चाहिए तो snapshot या find का उपयोग करें।

```sh
npx wdio session read
```

**फ़्लैग**

| फ़्लैग | विवरण |
| --- | --- |
| `--scope <value>` | केवल इस ref या selector के नीचे पढ़ें |
| `--max-chars <n>` | अधिकतम इतने अक्षर प्रिंट करें (डिफ़ॉल्ट 6000) |
| `--offset <n>` | लंबे पेज के अगले हिस्से के लिए टेक्स्ट के इस अक्षर से शुरू करें |

**उदाहरण**

```sh
# मुख्य कंटेंट पढ़ें
npx wdio session read

# एक सेक्शन पढ़ें
npx wdio session read --scope e12
```

यह भी देखें: [`find`](#find), [`snapshot`](#snapshot), [`get`](#get)।

## `find`

किसी टेक्स्ट के लिए नए स्नैपशॉट में खोजें। वेब, नेटिव मोबाइल, नेटिव डेस्कटॉप पर लागू।

एक नया स्नैपशॉट लेता है और हर मैच को उसके आसपास के नोड के साथ (जैसे पूरा लिस्ट आइटम, ताकि मैच के बगल की वैल्यू भी शामिल हो), लाइन नंबर और refs के साथ प्रिंट करता है, और पहले मैच को स्क्रॉल करके दिखाता है। मिलान में पहले केस को नज़रअंदाज़ किया जाता है, फिर स्पेस को ("SO2" से "SO 2" मिलता है), फिर सभी शब्दों और उनसे मिलते-जुलते शब्दों को खोजा जाता है। जो टेक्स्ट केवल पेज के छिपे हिस्सों (बंद मेन्यू, टैब, "Show more") में है, उसे उसी रूप में सूचीबद्ध किया जाता है। बड़े पेज का पूरा स्नैपशॉट पढ़ने से सस्ता है। -A/-B/-C इसके बजाय grep की तरह सामान्य लाइन संदर्भ प्रिंट करते हैं।

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
| `--regex` | टेक्स्ट को रेगुलर एक्सप्रेशन मानें |
| `--scope <value>` | केवल इस ref या selector के नीचे खोजें |
| `-C, --context <n>` | आसपास के नोड के बजाय पहले और बाद की संदर्भ लाइनें |
| `-A, --after-context <n>` | हर मैच के बाद की संदर्भ लाइनें |
| `-B, --before-context <n>` | हर मैच से पहले की संदर्भ लाइनें |
| `--offset <n>` | इतने मैच छोड़ दें, आउटपुट कटने पर अगले मैच देखने के लिए |

**उदाहरण**

```sh
# किसी बटन का ref खोजें
npx wdio session find "Add to cart"

# हर लिंक की सूची दिखाएँ
npx wdio session find "^\s*link" --regex --context 0
```

यह भी देखें: [`snapshot`](#snapshot), [`wait`](#wait)।

## `diff`

नए स्नैपशॉट की पिछले स्नैपशॉट से तुलना करें। वेब, नेटिव मोबाइल, नेटिव डेस्कटॉप पर लागू।

पिछले स्नैपशॉट के बाद से जो बदला है उसका unified diff प्रिंट करता है, या "No changes"। पहली कॉल एक बेसलाइन सहेजती है। किसी ऐक्शन के बाद इसका उपयोग करें ताकि पूरा पेज दोबारा पढ़े बिना देख सकें कि ऐक्शन ने क्या किया। वेब पर बेसलाइन वह आखिरी स्नैपशॉट है जो `--viewport` के बिना लिया गया था।

```sh
npx wdio session diff
```

**फ़्लैग**

| फ़्लैग | विवरण |
| --- | --- |
| `--baseline <value>` | तुलना के लिए स्नैपशॉट फ़ाइल |
| `--scope <value>` | `snapshot --scope` की तरह, केवल इस ref या selector के भीतर का स्नैपशॉट लें |
| `--interactive` | `snapshot -i` की तरह, केवल इंटरैक्टिव एलिमेंट |

**उदाहरण**

```sh
# देखें कि एक click ने क्या बदला
npx wdio session click e7 && npx wdio session diff

# सहेजे गए स्नैपशॉट से तुलना करें
npx wdio session diff --baseline before.yml
```

यह भी देखें: [`snapshot`](#snapshot), [`find`](#find)।

## `screenshot`

viewport, किसी एलिमेंट या पूरे पेज का PNG सहेजें। वेब, नेटिव मोबाइल, नेटिव डेस्कटॉप पर लागू।

फ़ाइल पाथ और इमेज का आकार प्रिंट करता है। जब सवाल लेआउट या दिखावट के बारे में हो तब स्क्रीनशॉट लें; टेक्स्ट और स्टेट `snapshot` और `get` से पढ़ें।

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

मौजूदा पेज को PDF के रूप में सहेजें। वेब पर लागू।

`browser.savePDF` को कॉल करता है। BiDi सेशन Chrome, Edge और Firefox में, headed या headless, `browsingContext.print` से प्रिंट करता है। Classic सेशन `printPage` का उपयोग करता है, जिसे पुराना Chrome केवल headless में सपोर्ट करता है।

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
# मौजूदा डायरेक्टरी में report.pdf लिखें
npx wdio session pdf report.pdf
```

यह भी देखें: [`screenshot`](#screenshot)।

## `source`

पेज का HTML या ऐप का XML सहेजें। वेब, नेटिव मोबाइल, नेटिव डेस्कटॉप पर लागू।

फ़ाइल लिखता है और उसका पाथ और आकार प्रिंट करता है। इसका उपयोग तब करें जब स्नैपशॉट वह छिपा देता है जो आपको चाहिए, जैसे किसी selector के लिए attributes।

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

text, html, value, कोई attribute, टाइटल, URL, गिनती या box पढ़ें। वेब पर लागू।

वैल्यू प्रिंट करता है, फिर वह WebdriverIO कोड जो इसने चलाया (`→ …`)। केवल वैल्यू प्रिंट करने के लिए -q पास करें, जैसे उसे किसी शेल वेरिएबल में कैप्चर करने के लिए। किसी वैल्यू के लिए assertion लिखने से पहले उसे पढ़ें।

```sh
npx wdio session get <sub> [target] [name]
```

**आर्ग्युमेंट्स**

| नाम | आवश्यक | विवरण |
| --- | --- | --- |
| `sub` | हाँ | text \| html \| value \| attr \| title \| url \| count \| box |
| `target` | नहीं | ref या selector (title और url के लिए उपयोग नहीं होता) |
| `name` | नहीं | attribute का नाम (केवल attr) |

**उदाहरण**

```sh
# किसी ref का टेक्स्ट
npx wdio session get text e1

# मौजूदा URL
npx wdio session get url

# केवल वैल्यू, शेल वेरिएबल के लिए
url=$(npx wdio session get url -q)

# किसी लिंक का href
npx wdio session get attr e3 href

# कितने एलिमेंट मैच करते हैं
npx wdio session get count "aria/Remove"
```

यह भी देखें: [`is`](#is), [`wait`](#wait), [`exec`](#exec)।

## `is`

जाँचें कि कोई एलिमेंट visible, enabled या checked है या नहीं। वेब पर लागू।

true या false प्रिंट करता है, फिर वह WebdriverIO कोड जो इसने चलाया; केवल वैल्यू प्रिंट करने के लिए -q पास करें। दोनों ही स्थितियों में एग्ज़िट कोड 0 होता है।

```sh
npx wdio session is <sub> <target>
```

**आर्ग्युमेंट्स**

| नाम | आवश्यक | विवरण |
| --- | --- | --- |
| `sub` | हाँ | visible \| enabled \| checked |
| `target` | हाँ | ref या selector |

**उदाहरण**

```sh
# true या false प्रिंट करें
npx wdio session is visible e1

# किसी बटन को उसके लेबल से जाँचें
npx wdio session is enabled "aria/Place order"
```

यह भी देखें: [`get`](#get), [`wait`](#wait)।

## `logs`

पिछली कॉल के बाद से console, page error, network और device लॉग प्रिंट करें। वेब, नेटिव मोबाइल पर लागू।

हर कॉल एक रीड कर्सर को आगे बढ़ाती है, इसलिए अगली कॉल केवल नई एंट्री दिखाती है। किसी ऐक्शन के बाद इसे चलाएँ ताकि उस ऐक्शन से हुई त्रुटियाँ देख सकें।

```sh
npx wdio session logs
```

**फ़्लैग**

| फ़्लैग | विवरण |
| --- | --- |
| `--errors` | केवल त्रुटियाँ |
| `--network` | केवल नेटवर्क एंट्री |
| `--since <value>` | केवल इस अवधि से नई एंट्री (जैसे 30s) |
| `--peek` | रीड कर्सर को आगे न बढ़ाएँ |
| `--source <browser\|driver\|logcat\|syslog\|main>` | लॉग स्रोत |

**उदाहरण**

```sh
# किसी click से हुई त्रुटियाँ
npx wdio session click e4 && npx wdio session logs --errors

# हाल की एंट्री, उन्हें अगली कॉल के लिए रखें
npx wdio session logs --since 30s --peek
```

यह भी देखें: [`requests`](#requests)।

## `navigate`

कोई URL खोलें। वेब पर लागू।

`example.com`, पूरे URL और baseUrl के सापेक्ष पाथ स्वीकार करता है। पहले किसी भी फ़्रेम से बाहर निकलता है। नया URL और टाइटल प्रिंट करता है।

```sh
npx wdio session navigate <url>
```

**आर्ग्युमेंट्स**

| नाम | आवश्यक | विवरण |
| --- | --- | --- |
| `url` | हाँ | URL (सापेक्ष URL baseUrl का उपयोग करते हैं) |

**उदाहरण**

```sh
# किसी पेज पर जाएँ और उसे देखें
npx wdio session navigate /cart && npx wdio session snapshot -i

# कोई दूसरी साइट खोलें
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

पेज रीलोड करें। वेब पर लागू।

```sh
npx wdio session reload
```

**उदाहरण**

```sh
# रीलोड करें और नेटवर्क शांत होने तक प्रतीक्षा करें
npx wdio session reload && npx wdio session wait --load networkidle
```

यह भी देखें: [`navigate`](#navigate), [`wait`](#wait)।

## `wait`

किसी एलिमेंट, टेक्स्ट, URL, लोड स्टेट, शर्त या कुछ मिलीसेकंड के लिए प्रतीक्षा करें। वेब पर लागू।

इनमें से ठीक एक पास करें: कोई ref या selector, --text, --url, --load, --fn, या मिलीसेकंड। --limit के बाद एग्ज़िट कोड 1 के साथ विफल होता है।

यहाँ भी और किसी चेन में `sleep` के बजाय भी, पॉज़ की जगह शर्त को प्राथमिकता दें। 30 सेकंड से लंबा पॉज़ अस्वीकार कर दिया जाता है।

```sh
npx wdio session wait [target]
```

**आर्ग्युमेंट्स**

| नाम | आवश्यक | विवरण |
| --- | --- | --- |
| `target` | नहीं | ref, selector या मिलीसेकंड |

**फ़्लैग**

| फ़्लैग | विवरण |
| --- | --- |
| `--text <value>` | तब तक प्रतीक्षा करें जब तक पेज में यह टेक्स्ट न हो |
| `--url <value>` | तब तक प्रतीक्षा करें जब तक URL मैच न करे (सबस्ट्रिंग, या * और ** globs) |
| `--load <value>` | domcontentloaded, load या networkidle |
| `--fn <value>` | तब तक प्रतीक्षा करें जब तक यह JavaScript एक्सप्रेशन true न हो |
| `--state <value>` | टारगेट के साथ: visible (डिफ़ॉल्ट), hidden, enabled या disabled |
| `--limit <n>` | प्रतीक्षा करने के मिलीसेकंड (डिफ़ॉल्ट 10000) |

**उदाहरण**

```sh
# किसी ref के visible होने तक प्रतीक्षा करें
npx wdio session wait e1

# स्पिनर के गायब होने तक प्रतीक्षा करें
npx wdio session wait "aria/Loading" --state hidden

# ऐक्शन करें, परिणाम की प्रतीक्षा करें, दोबारा देखें
npx wdio session click e3 && npx wdio session wait --text "Cart (1)" && npx wdio session snapshot -i

# किसी URL की प्रतीक्षा करें
npx wdio session wait --url "**/dashboard"

# तब तक प्रतीक्षा करें जब तक कोई रिक्वेस्ट चालू न हो
npx wdio session wait --load networkidle

# 500ms रुकें
npx wdio session wait 500
```

यह भी देखें: [`find`](#find), [`is`](#is), [`get`](#get)।

## `click`

किसी एलिमेंट पर click करें। वेब, नेटिव मोबाइल, नेटिव डेस्कटॉप पर लागू।

प्रिंट करता है कि किस पर click किया गया और, अगर click से नेविगेशन हुआ, तो नया URL। अगले पेज पर refs का उपयोग करने से पहले नया स्नैपशॉट लें। छिपा हुआ या ढका हुआ एलिमेंट तुरंत विफल होता है और बताता है कि रास्ते में क्या है। `x,y` viewport के किसी बिंदु पर click करता है (स्क्रीनशॉट की तरह, ऊपर बाएँ से पिक्सेल), उन चीज़ों के लिए जिनका कोई ref नहीं है, जैसे canvas या मैप।

```sh
npx wdio session click <target>
```

**आर्ग्युमेंट्स**

| नाम | आवश्यक | विवरण |
| --- | --- | --- |
| `target` | हाँ | ref (e12), WebdriverIO selector, या x,y viewport निर्देशांक |

**फ़्लैग**

| फ़्लैग | विवरण |
| --- | --- |
| `--double` | डबल click |
| `--right` | राइट click |
| `--new-tab` | लिंक को नए टैब में खोलें और उस पर स्विच करें |

**उदाहरण**

```sh
# नवीनतम स्नैपशॉट के किसी ref पर click करें
npx wdio session click e3

# accessible name से click करें
npx wdio session click "aria/Add to cart"

# click करें, प्रतीक्षा करें, दोबारा देखें
npx wdio session click e3 && npx wdio session wait --load networkidle && npx wdio session snapshot -i

# किसी लिंक को नए टैब में खोलें
npx wdio session click e8 --new-tab

# viewport के किसी बिंदु पर click करें, जैसे किसी मैप पर
npx wdio session click 320,480
```

यह भी देखें: [`tap`](#tap), [`fill`](#fill), [`wait`](#wait), [`snapshot`](#snapshot)।

## `tap`

किसी एलिमेंट पर tap करें (मोबाइल)। नेटिव मोबाइल पर लागू।

```sh
npx wdio session tap <target>
```

**आर्ग्युमेंट्स**

| नाम | आवश्यक | विवरण |
| --- | --- | --- |
| `target` | हाँ | ref (e12) या WebdriverIO selector |

**उदाहरण**

```sh
# नवीनतम स्नैपशॉट के किसी ref पर tap करें
npx wdio session tap e2
```

यह भी देखें: [`click`](#click), [`long-press`](#long-press), [`swipe`](#swipe)।

## `fill`

किसी input की वैल्यू बदलें। वेब, नेटिव मोबाइल, नेटिव डेस्कटॉप पर लागू।

पहले फ़ील्ड को खाली करता है। जिस पर भी फ़ोकस है उसमें टाइप करने के लिए `type` का उपयोग करें; Enter जैसी कीज़ भेजने के लिए `press` का उपयोग करें।

```sh
npx wdio session fill <target> <text..>
```

**आर्ग्युमेंट्स**

| नाम | आवश्यक | विवरण |
| --- | --- | --- |
| `target` | हाँ | ref (e12) या WebdriverIO selector |
| `text` | हाँ | टेक्स्ट (टारगेट के बाद के शब्द स्पेस से जोड़े जाते हैं) |

**उदाहरण**

```sh
# एक फ़ील्ड भरें
npx wdio session fill e2 ada@example.com

# एक फ़ॉर्म भरें और उसे सबमिट करें
npx wdio session fill e2 ada@example.com && npx wdio session fill e4 secret && npx wdio session press Enter
```

यह भी देखें: [`type`](#type), [`press`](#press), [`select`](#select), [`check`](#check)।

## `type`

किसी एलिमेंट या फ़ोकस किए गए एलिमेंट में टाइप करें। वेब, नेटिव मोबाइल, नेटिव डेस्कटॉप पर लागू।

कुछ भी खाली किए बिना टेक्स्ट को key presses के रूप में भेजता है: `type e2 Ada` e2 में टाइप करता है, `type Ada` उसमें जिस पर फ़ोकस है। किसी वैल्यू को बदलने के लिए `fill` का उपयोग करें।

```sh
npx wdio session type <text..>
```

**आर्ग्युमेंट्स**

| नाम | आवश्यक | विवरण |
| --- | --- | --- |
| `text` | हाँ | टेक्स्ट (शब्द स्पेस से जोड़े जाते हैं)। फ़ोकस किए गए एलिमेंट के बजाय किसी खास एलिमेंट में टाइप करने के लिए ref से शुरू करें, जैसे `type e2 Ada` |

**उदाहरण**

```sh
# किसी फ़ील्ड में टाइप करें
npx wdio session type e5 hello

# जिस पर फ़ोकस है उसमें टाइप करें
npx wdio session focus e5 && npx wdio session type "hello"
```

यह भी देखें: [`fill`](#fill), [`press`](#press), [`focus`](#focus)।

## `press`

कीज़ दबाएँ, जैसे Enter, Control+a। वेब, नेटिव डेस्कटॉप पर लागू।

कीज़ को + से जोड़ें। नामों में केस मायने नहीं रखता; ctrl, cmd, esc, up, down, left और right छोटे रूपों के रूप में स्वीकार किए जाते हैं।

```sh
npx wdio session press <keys>
```

**आर्ग्युमेंट्स**

| नाम | आवश्यक | विवरण |
| --- | --- | --- |
| `keys` | हाँ | की कॉम्बिनेशन |

**फ़्लैग**

| फ़्लैग | विवरण |
| --- | --- |
| `--times <n>` | इसे इतनी बार दबाएँ (अधिकतम 100), जैसे किसी स्लाइडर को खिसकाने के लिए |

**उदाहरण**

```sh
# एक फ़ॉर्म सबमिट करें
npx wdio session press Enter

# फ़ोकस किए गए स्लाइडर को पाँच स्टेप खिसकाएँ
npx wdio session press ArrowRight --times 5

# सब चुनें
npx wdio session press Control+a

# फ़ोकस वापस ले जाएँ
npx wdio session press Shift+Tab
```

यह भी देखें: [`type`](#type), [`fill`](#fill)।

## `select`

किसी `<select>` का कोई विकल्प चुनें। वेब पर लागू।

```sh
npx wdio session select <target> <value>
```

**आर्ग्युमेंट्स**

| नाम | आवश्यक | विवरण |
| --- | --- | --- |
| `target` | हाँ | ref (e12) या WebdriverIO selector |
| `value` | हाँ | विकल्प का टेक्स्ट, वैल्यू या इंडेक्स |

**फ़्लैग**

| फ़्लैग | विवरण |
| --- | --- |
| `--by <text\|value\|index>` | विकल्प का मिलान कैसे करें (डिफ़ॉल्ट text) |

**उदाहरण**

```sh
# दिखने वाले टेक्स्ट से चुनें
npx wdio session select e6 Germany

# वैल्यू से चुनें
npx wdio session select e6 de --by value
```

यह भी देखें: [`fill`](#fill), [`check`](#check)।

## `upload`

कोई फ़ाइल input सेट करें। वेब पर लागू।

पाथ आपकी वर्किंग डायरेक्टरी के सापेक्ष होता है। स्वयं `<input type="file">` को टारगेट करें, न कि उस बटन को जो पिकर खोलता है।

```sh
npx wdio session upload <target> <file>
```

**आर्ग्युमेंट्स**

| नाम | आवश्यक | विवरण |
| --- | --- | --- |
| `target` | हाँ | ref (e12) या WebdriverIO selector |
| `file` | हाँ | अपलोड करने के लिए फ़ाइल |

**उदाहरण**

```sh
# एक फ़ाइल अटैच करें
npx wdio session upload e9 ./fixtures/avatar.png
```

यह भी देखें: [`fill`](#fill)।

## `hover`

पॉइंटर को किसी एलिमेंट पर ले जाएँ। वेब, नेटिव डेस्कटॉप पर लागू।

```sh
npx wdio session hover <target>
```

**आर्ग्युमेंट्स**

| नाम | आवश्यक | विवरण |
| --- | --- | --- |
| `target` | हाँ | ref (e12) या WebdriverIO selector |

**उदाहरण**

```sh
# hover मेन्यू खोलें और उसे देखें
npx wdio session hover e4 && npx wdio session snapshot -i
```

यह भी देखें: [`click`](#click)।

## `focus`

किसी एलिमेंट पर फ़ोकस करें। वेब पर लागू।

```sh
npx wdio session focus <target>
```

**आर्ग्युमेंट्स**

| नाम | आवश्यक | विवरण |
| --- | --- | --- |
| `target` | हाँ | ref (e12) या WebdriverIO selector |

**उदाहरण**

```sh
# `type` से पहले किसी फ़ील्ड पर फ़ोकस करें
npx wdio session focus e5
```

यह भी देखें: [`type`](#type), [`press`](#press)।

## `check`

किसी checkbox या radio को check करें। वेब पर लागू।

अगर यह पहले से checked है तो कुछ नहीं करता, और अगर अंत में checked नहीं होता तो विफल होता है।

```sh
npx wdio session check <target>
```

**आर्ग्युमेंट्स**

| नाम | आवश्यक | विवरण |
| --- | --- | --- |
| `target` | हाँ | ref (e12) या WebdriverIO selector |

**उदाहरण**

```sh
# शर्तें स्वीकार करें
npx wdio session check e7
```

यह भी देखें: [`uncheck`](#uncheck), [`is`](#is)।

## `uncheck`

किसी checkbox को uncheck करें। वेब पर लागू।

अगर यह पहले से unchecked है तो कुछ नहीं करता। चुने गए radio बटन को uncheck नहीं किया जा सकता।

```sh
npx wdio session uncheck <target>
```

**आर्ग्युमेंट्स**

| नाम | आवश्यक | विवरण |
| --- | --- | --- |
| `target` | हाँ | ref (e12) या WebdriverIO selector |

**उदाहरण**

```sh
# न्यूज़लेटर से ऑप्ट आउट करें
npx wdio session uncheck e7
```

यह भी देखें: [`check`](#check), [`is`](#is)।

## `drag`

किसी एलिमेंट को दूसरे पर ड्रैग करें। वेब, नेटिव मोबाइल, नेटिव डेस्कटॉप पर लागू।

```sh
npx wdio session drag <from> <to>
```

**आर्ग्युमेंट्स**

| नाम | आवश्यक | विवरण |
| --- | --- | --- |
| `from` | हाँ | ड्रैग करने के लिए ref या selector |
| `to` | हाँ | जिस पर ड्रॉप करना है उसका ref या selector |

**उदाहरण**

```sh
# किसी कार्ड को दूसरे कॉलम में ले जाएँ
npx wdio session drag e3 e9
```

यह भी देखें: [`scroll`](#scroll)।

## `scroll`

किसी एलिमेंट को स्क्रॉल करके दिखाएँ या पेज को स्क्रॉल करें। वेब पर लागू।

टारगेट के बिना यह 600px नीचे स्क्रॉल करता है। lazy-loaded कंटेंट अगले स्नैपशॉट में दिखाई देता है।

```sh
npx wdio session scroll [target]
```

**आर्ग्युमेंट्स**

| नाम | आवश्यक | विवरण |
| --- | --- | --- |
| `target` | नहीं | ref, selector, up, down, top या bottom |

**फ़्लैग**

| फ़्लैग | विवरण |
| --- | --- |
| `--px <n>` | up/down के लिए पिक्सेल (डिफ़ॉल्ट 600) |

**उदाहरण**

```sh
# किसी एलिमेंट को स्क्रॉल करके दिखाएँ
npx wdio session scroll e40

# और परिणाम लोड करें और उन्हें देखें
npx wdio session scroll bottom && npx wdio session snapshot -i

# दो स्क्रीन स्क्रॉल करें
npx wdio session scroll down --px 1200
```

यह भी देखें: [`swipe`](#swipe), [`snapshot`](#snapshot)।

## `swipe`

स्क्रीन को swipe करें (मोबाइल)। नेटिव मोबाइल पर लागू।

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
| `--percent <n>` | swipe की लंबाई 0..1 |

**उदाहरण**

```sh
# किसी सूची को स्क्रॉल करें और उसे देखें
npx wdio session swipe up && npx wdio session snapshot
```

यह भी देखें: [`scroll`](#scroll), [`tap`](#tap)।

## `long-press`

किसी एलिमेंट पर long press करें (मोबाइल)। नेटिव मोबाइल पर लागू।

```sh
npx wdio session long-press <target>
```

**आर्ग्युमेंट्स**

| नाम | आवश्यक | विवरण |
| --- | --- | --- |
| `target` | हाँ | ref (e12) या WebdriverIO selector |

**फ़्लैग**

| फ़्लैग | विवरण |
| --- | --- |
| `--duration <n>` | मिलीसेकंड |

**उदाहरण**

```sh
# कॉन्टेक्स्ट मेन्यू खोलें
npx wdio session long-press e4 --duration 1500
```

यह भी देखें: [`tap`](#tap)।

## `tabs`

टैब की सूची दिखाएँ, खोलें, स्विच करें या बंद करें। वेब पर लागू।

सबकमांड के बिना यह टैब को उनके इंडेक्स के साथ सूचीबद्ध करता है; मौजूदा टैब चिह्नित होता है। `new` एक टैब खोलता है और उस पर स्विच करता है। `switch` और `close` एक इंडेक्स या हैंडल लेते हैं।

```sh
npx wdio session tabs [sub] [arg]
```

**आर्ग्युमेंट्स**

| नाम | आवश्यक | विवरण |
| --- | --- | --- |
| `sub` | नहीं | switch \| new \| close |
| `arg` | नहीं | इंडेक्स, हैंडल या URL |

**उदाहरण**

```sh
# टैब की सूची दिखाएँ
npx wdio session tabs

# एक टैब खोलें
npx wdio session tabs new http://localhost:3000/help

# पहले टैब पर वापस जाएँ
npx wdio session tabs switch 0

# दूसरा टैब बंद करें
npx wdio session tabs close 1
```

यह भी देखें: [`windows`](#windows), [`frame`](#frame)।

## `windows`

विंडो की सूची दिखाएँ या स्विच करें। वेब, नेटिव डेस्कटॉप पर लागू।

```sh
npx wdio session windows [sub] [arg]
```

**आर्ग्युमेंट्स**

| नाम | आवश्यक | विवरण |
| --- | --- | --- |
| `sub` | नहीं | switch |
| `arg` | नहीं | इंडेक्स या हैंडल |

**उदाहरण**

```sh
# विंडो की सूची दिखाएँ
npx wdio session windows

# दूसरी विंडो पर स्विच करें
npx wdio session windows switch 1
```

यह भी देखें: [`tabs`](#tabs)।

## `frame`

किसी iframe में, पैरेंट पर या टॉप पर स्विच करें। वेब पर लागू।

पेज स्नैपशॉट पहले से ही उसके iframes का कंटेंट दिखाता है, ऐसे refs के साथ जिन्हें ऐक्शन सीधे उपयोग करते हैं, इसलिए `frame` की ज़रूरत केवल तब होती है जब कुछ समय तक किसी एक फ़्रेम के अंदर काम करना हो या ऐसा फ़्रेम देखना हो जिसे स्नैपशॉट ने छोटा कर दिया। जब तक आप वापस स्विच नहीं करते, स्नैपशॉट और ऐक्शन मौजूदा फ़्रेम पर लागू होते हैं। `navigate` टॉप डॉक्यूमेंट पर लौट आता है।

```sh
npx wdio session frame <target>
```

**आर्ग्युमेंट्स**

| नाम | आवश्यक | विवरण |
| --- | --- | --- |
| `target` | हाँ | ref, selector, parent या top |

**उदाहरण**

```sh
# किसी iframe में जाएँ और अंदर देखें
npx wdio session frame e12 && npx wdio session snapshot -i

# पेज पर वापस जाएँ
npx wdio session frame top
```

यह भी देखें: [`tabs`](#tabs), [`snapshot`](#snapshot)।

## `contexts`

native/webview contexts की सूची दिखाएँ या स्विच करें। नेटिव मोबाइल पर लागू।

```sh
npx wdio session contexts [sub] [name]
```

**आर्ग्युमेंट्स**

| नाम | आवश्यक | विवरण |
| --- | --- | --- |
| `sub` | नहीं | switch |
| `name` | नहीं | context का नाम |

**उदाहरण**

```sh
# NATIVE_APP और WEBVIEW contexts की सूची दिखाएँ
npx wdio session contexts

# webview को चलाएँ
npx wdio session contexts switch WEBVIEW_com.example.shop
```

यह भी देखें: [`snapshot`](#snapshot)।

## `dialog`

किसी खुले dialog को स्वीकार करें, खारिज करें या उसकी रिपोर्ट दें। वेब, नेटिव मोबाइल पर लागू।

खुला alert, confirm या prompt अन्य ऐक्शन को रोकता है, जो इसे चलाने के संकेत के साथ विफल होते हैं।

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
| `--text <value>` | prompt टेक्स्ट (केवल accept) |

**उदाहरण**

```sh
# खुला dialog दिखाएँ
npx wdio session dialog status

# पुष्टि करें
npx wdio session dialog accept

# किसी prompt का जवाब दें
npx wdio session dialog accept --text "Ada"
```

यह भी देखें: [`click`](#click)।

## `app`

किसी ऐप को लॉन्च, बंद, इंस्टॉल करें या उसकी स्थिति पूछें। नेटिव मोबाइल, नेटिव डेस्कटॉप पर लागू।

```sh
npx wdio session app <sub> <id>
```

**आर्ग्युमेंट्स**

| नाम | आवश्यक | विवरण |
| --- | --- | --- |
| `sub` | हाँ | launch \| terminate \| install \| state |
| `id` | हाँ | ऐप id, bundle id या फ़ाइल |

**उदाहरण**

```sh
# ऐप को रीस्टार्ट करें
npx wdio session app terminate com.example.shop && npx wdio session app launch com.example.shop

# क्या यह चल रहा है?
npx wdio session app state com.example.shop
```

यह भी देखें: [`deeplink`](#deeplink), [`background`](#background)।

## `deeplink`

कोई deep link खोलें। नेटिव मोबाइल पर लागू।

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
| `--package <value>` | Android पैकेज या iOS bundle id |

**उदाहरण**

```sh
# किसी प्रोडक्ट की स्क्रीन खोलें
npx wdio session deeplink shop://product/42 --package com.example.shop
```

यह भी देखें: [`app`](#app)।

## `rotate`

डिवाइस को घुमाएँ। नेटिव मोबाइल पर लागू।

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

ऑन-स्क्रीन कीबोर्ड छिपाएँ। नेटिव मोबाइल पर लागू।

```sh
npx wdio session keyboard <sub>
```

**आर्ग्युमेंट्स**

| नाम | आवश्यक | विवरण |
| --- | --- | --- |
| `sub` | हाँ | hide |

**उदाहरण**

```sh
# कीबोर्ड के नीचे के एलिमेंट दिखाएँ
npx wdio session keyboard hide
```

## `background`

ऐप को बैकग्राउंड में भेजें। नेटिव मोबाइल पर लागू।

```sh
npx wdio session background <seconds>
```

**आर्ग्युमेंट्स**

| नाम | आवश्यक | विवरण |
| --- | --- | --- |
| `seconds` | हाँ | सेकंड (-1 इसे वहीं रखता है) |

**उदाहरण**

```sh
# ऐप को 3 सेकंड के लिए बैकग्राउंड में भेजें
npx wdio session background 3
```

यह भी देखें: [`app`](#app)।

## `lock`

डिवाइस लॉक करें। नेटिव मोबाइल पर लागू।

```sh
npx wdio session lock
```

**उदाहरण**

```sh
# स्क्रीन लॉक करें
npx wdio session lock
```

यह भी देखें: [`unlock`](#unlock)।

## `unlock`

डिवाइस अनलॉक करें। नेटिव मोबाइल पर लागू।

```sh
npx wdio session unlock
```

**उदाहरण**

```sh
# स्क्रीन अनलॉक करें
npx wdio session unlock
```

यह भी देखें: [`lock`](#lock)।

## `geolocation`

जियोलोकेशन सेट करें। वेब, नेटिव मोबाइल पर लागू।

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
# बर्लिन में होने का दिखावा करें
npx wdio session geolocation 52.52 13.405
```

यह भी देखें: [`emulate`](#emulate)।

## `emulate`

किसी डिवाइस, viewport, नेटवर्क, cpu, clock या BiDi emulation स्कोप का emulation करें। वेब पर लागू।

emulation तब तक बना रहता है जब तक `emulate reset` न हो या सेशन समाप्त न हो; उसी प्रकार को फिर से सेट करने पर वह बदल जाता है। बिना वैल्यू के `emulate device` डिवाइस के नामों की सूची दिखाता है। नेटवर्क प्रीसेट और cpu throttling के लिए Chromium ब्राउज़र चाहिए।

```sh
npx wdio session emulate <sub> [value]
```

**आर्ग्युमेंट्स**

| नाम | आवश्यक | विवरण |
| --- | --- | --- |
| `sub` | हाँ | device \| viewport \| network \| cpu \| clock \| color-scheme \| user-agent \| media \| locale \| timezone \| touch \| orientation \| screen \| viewport-meta \| text-layout \| scripting \| scrollbar \| forced-colors \| reset |
| `value` | नहीं | emulation के लिए वैल्यू |

**फ़्लैग**

| फ़्लैग | विवरण |
| --- | --- |
| `--dpr <n>` | डिवाइस पिक्सेल रेशियो (viewport) |
| `--tick <n>` | emulated clock को ms से आगे बढ़ाएँ (clock) |

**उदाहरण**

```sh
# एक फ़ोन का emulation करें
npx wdio session emulate device "iPhone 15"

# viewport सेट करें
npx wdio session emulate viewport 375x812 --dpr 3

# ऑफ़लाइन जाएँ
npx wdio session emulate network offline

# डार्क मोड
npx wdio session emulate color-scheme dark

# तारीख को स्थिर करें
npx wdio session emulate clock 2030-01-01T00:00:00Z

# मोशन कम करें
npx wdio session emulate media prefersReducedMotion=reduce

# हर emulation को पूर्ववत करें
npx wdio session emulate reset
```

यह भी देखें: [`geolocation`](#geolocation), [`screenshot`](#screenshot)।

## `requests`

कैप्चर किए गए नेटवर्क रिक्वेस्ट की सूची दिखाएँ (BiDi)। वेब पर लागू।

```sh
npx wdio session requests
```

**फ़्लैग**

| फ़्लैग | विवरण |
| --- | --- |
| `--filter <value>` | सबस्ट्रिंग या glob |
| `--failed` | केवल विफल रिक्वेस्ट |
| `--since <value>` | केवल इस अवधि से नए रिक्वेस्ट |
| `--limit <n>` | अधिकतम लाइनें (डिफ़ॉल्ट 50) |

**उदाहरण**

```sh
# केवल API कॉल
npx wdio session requests --filter "**/api/**"

# वे रिक्वेस्ट जिन्हें एक click ने तोड़ दिया
npx wdio session click e3 && npx wdio session requests --failed --since 10s
```

यह भी देखें: [`mock`](#mock), [`logs`](#logs)।

## `mock`

किसी URL पैटर्न के लिए responses को mock करें (BiDi)। वेब पर लागू।

mock id (m1, m2, …) प्रिंट करता है। उसी पैटर्न को फिर से mock करने पर पहले वाला mock बदल जाता है।

```sh
npx wdio session mock <pattern>
```

**आर्ग्युमेंट्स**

| नाम | आवश्यक | विवरण |
| --- | --- | --- |
| `pattern` | हाँ | URL पैटर्न |

**फ़्लैग**

| फ़्लैग | विवरण |
| --- | --- |
| `--status <n>` | स्टेटस कोड |
| `--body <value>` | JSON/टेक्स्ट के रूप में body या कोई फ़ाइल पाथ |
| `--header <value>` | हेडर k:v (दोहराया जा सकता है) |
| `--abort` | मैच करने वाले रिक्वेस्ट रद्द करें |
| `--method <value>` | केवल यह method |
| `--once` | केवल अगला रिक्वेस्ट |

**उदाहरण**

```sh
# निश्चित JSON लौटाएँ
npx wdio session mock "**/api/user" --body '{"name":"Mocked"}'

# अगले रिक्वेस्ट को विफल करें
npx wdio session mock "**/api/cart" --status 500 --once

# इमेज ब्लॉक करें
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
| `pattern` | नहीं | पैटर्न या mock id |

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

सबकमांड के बिना यह हर cookie को name=value के रूप में प्रिंट करता है। बिना नाम के `clear` सभी cookies डिलीट करता है।

```sh
npx wdio session cookies [sub] [name] [value]
```

**आर्ग्युमेंट्स**

| नाम | आवश्यक | विवरण |
| --- | --- | --- |
| `sub` | नहीं | get \| set \| clear |
| `name` | नहीं | cookie का नाम |
| `value` | नहीं | cookie की वैल्यू |

**फ़्लैग**

| फ़्लैग | विवरण |
| --- | --- |
| `--domain <value>` | cookie डोमेन (set) |
| `--path <value>` | cookie पाथ (set) |
| `--http-only` | HttpOnly cookie (set) |
| `--secure` | Secure cookie (set) |
| `--same-site <value>` | lax, strict, none या default (set) |
| `--expiry <n>` | सेकंड में Unix टाइमस्टैम्प के रूप में समाप्ति (set) |

**उदाहरण**

```sh
# cookies की सूची दिखाएँ
npx wdio session cookies

# एक cookie की वैल्यू
npx wdio session cookies get session

# एक cookie सेट करें और रीलोड करें
npx wdio session cookies set session abc && npx wdio session reload

# सभी cookies डिलीट करें
npx wdio session cookies clear
```

यह भी देखें: [`storage`](#storage), [`state`](#state)।

## `storage`

localStorage (या sessionStorage) प्राप्त करें, सेट करें या साफ़ करें। वेब पर लागू।

सबकमांड के बिना यह हर एंट्री प्रिंट करता है। बिना key के `clear` स्टोर को खाली कर देता है।

```sh
npx wdio session storage [sub] [key] [value]
```

**आर्ग्युमेंट्स**

| नाम | आवश्यक | विवरण |
| --- | --- | --- |
| `sub` | नहीं | get \| set \| clear |
| `key` | नहीं | key |
| `value` | नहीं | वैल्यू |

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

`save` मौजूदा origin की cookies, localStorage और sessionStorage को एक JSON फ़ाइल में लिखता है। `load` उस origin को खोलता है और उन्हें बहाल करता है, जैसे लॉगिन छोड़ने के लिए।

```sh
npx wdio session state <sub> <file>
```

**आर्ग्युमेंट्स**

| नाम | आवश्यक | विवरण |
| --- | --- | --- |
| `sub` | हाँ | save \| load |
| `file` | हाँ | स्टेट फ़ाइल |

**उदाहरण**

```sh
# लॉग-इन की हुई स्टेट सहेजें
npx wdio session state save .wdio/logged-in.json

# लॉग-इन स्थिति में शुरू करें
npx wdio session state load .wdio/logged-in.json && npx wdio session reload
```

यह भी देखें: [`cookies`](#cookies), [`storage`](#storage)।

## `visual`

@wdio/visual-service के ज़रिए विज़ुअल स्नैपशॉट। वेब, नेटिव मोबाइल, नेटिव डेस्कटॉप पर लागू।

`save` .wdio/visual/baseline के अंतर्गत एक बेसलाइन सहेजता है, `check` उससे तुलना करता है और अंतर प्रिंट करता है, `accept` आखिरी वास्तविक इमेज को बेसलाइन बना देता है, `list` टैग दिखाता है। प्रोजेक्ट में @wdio/visual-service होना ज़रूरी है।

```sh
npx wdio session visual <sub> [tag]
```

**आर्ग्युमेंट्स**

| नाम | आवश्यक | विवरण |
| --- | --- | --- |
| `sub` | हाँ | save \| check \| accept \| list |
| `tag` | नहीं | इमेज टैग |

**फ़्लैग**

| फ़्लैग | विवरण |
| --- | --- |
| `--element <value>` | केवल यह एलिमेंट |
| `--full` | पूरा पेज |
| `--tabbable` | tabbable पेज |
| `--threshold <n>` | प्रतिशत में अनुमत अंतर (डिफ़ॉल्ट 0) |
| `--all` | accept: हर टैग |

**उदाहरण**

```sh
# एक बेसलाइन सहेजें
npx wdio session visual save cart

# उससे तुलना करें
npx wdio session visual check cart --threshold 0.5

# इच्छित बदलाव स्वीकार करें
npx wdio session visual accept cart
```

यह भी देखें: [`screenshot`](#screenshot)।

## `trace`

हर स्टेप को स्क्रीनशॉट और स्नैपशॉट के साथ रिकॉर्ड करें।

`stop` ट्रेस डायरेक्टरी और स्टेप्स का ट्रांसक्रिप्ट प्रिंट करता है।

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
| `--screenshots` | हर स्टेप के बाद स्क्रीनशॉट (छोड़ने के लिए --no-screenshots का उपयोग करें) |
| `--snapshots` | हर स्टेप के बाद स्नैपशॉट (छोड़ने के लिए --no-snapshots का उपयोग करें) |

**उदाहरण**

```sh
# ट्रेसिंग शुरू करें
npx wdio session trace start

# रोकें और ट्रांसक्रिप्ट प्रिंट करें
npx wdio session trace stop
```

यह भी देखें: [`record`](#record), [`history`](#history)।

## `record`

एक वीडियो रिकॉर्ड करें। वेब, नेटिव मोबाइल पर लागू।

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

रिकॉर्ड किए गए स्टेप्स प्रिंट करें।

पेज को बदलने वाला हर ऐक्शन वह WebdriverIO कोड रिकॉर्ड करता है जो उसने चलाया। `export` इस हिस्ट्री को एक spec में बदल देता है।

```sh
npx wdio session history
```

**फ़्लैग**

| फ़्लैग | विवरण |
| --- | --- |
| `--clear` | हिस्ट्री साफ़ करें |

**उदाहरण**

```sh
# अब तक के स्टेप्स दिखाएँ
npx wdio session history

# जिन स्टेप्स को रखना है उनसे पहले रिकॉर्डिंग फिर से शुरू करें
npx wdio session history --clear
```

यह भी देखें: [`export`](#export), [`exec`](#exec)।

## `export`

हिस्ट्री से एक spec बनाएँ।

रिकॉर्ड किए गए स्टेप्स के साथ एक describe/it spec लिखता है। refs स्थिर selectors बन जाते हैं और helpers कस्टम कमांड बन जाते हैं। --out के बिना फ़ाइल आर्टिफ़ैक्ट्स डायरेक्टरी में जाती है। यह पुष्टि करने के लिए कि यह पास होता है, इसे `wdio run` से चलाएँ।

```sh
npx wdio session export
```

**फ़्लैग**

| फ़्लैग | विवरण |
| --- | --- |
| `--out <value>` | आउटपुट फ़ाइल |
| `--title <value>` | सुइट टाइटल |
| `--page-objects` | page objects बनाएँ |
| `--framework <mocha\|jasmine>` | फ़्रेमवर्क (डिफ़ॉल्ट mocha) |

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

`wdio run --debug=agent` विफल हो रहे टेस्ट को रोक देता है और उसे सेशन debug-`<worker>` के रूप में उपलब्ध कराता है। किसी भी ऐक्शन से उसकी जाँच करें, फिर resume करें। उस सेशन पर `close` करने से इसके बजाय टेस्ट विफल हो जाता है।

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

अपने एनवायरनमेंट की जाँच करें।

हर जाँच के लिए एक लाइन प्रिंट करता है, साथ में हर विफलता का समाधान। कोई जाँच विफल होने पर 1 के साथ एग्ज़िट करता है।

```sh
npx wdio session doctor [target]
```

**आर्ग्युमेंट्स**

| नाम | आवश्यक | विवरण |
| --- | --- | --- |
| `target` | नहीं | केवल वही जाँचें जो इस टारगेट को चाहिए |

**उदाहरण**

```sh
# सब कुछ जाँचें
npx wdio session doctor

# जाँचें कि Android सेशन को क्या चाहिए
npx wdio session doctor android
```

यह भी देखें: [`open`](#open)।

## `skill`

एजेंट skill प्रिंट करें।

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