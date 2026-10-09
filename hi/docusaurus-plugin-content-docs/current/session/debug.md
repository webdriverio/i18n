---
id: debug
title: सेशन के साथ टेस्ट को डीबग करें
description: एक विफल WebdriverIO रन को रोकें और wdio session के साथ उसका निरीक्षण करें, फिर उसे फिर से शुरू करें या बंद करें।
---

`wdio run --debug=agent` वर्कर को `await browser.debug()` पर और किसी टेस्ट के विफल होने के बाद रोक देता है, और फ्रेमवर्क टाइमआउट को 24 घंटे तक बढ़ा देता है। यह पॉज़ Mocha टेस्ट और Cucumber स्टेप्स दोनों पर लागू होता है। रन सेशन का नाम प्रिंट करता है (पहले वर्कर के लिए `debug-0-0`):

```sh
npx wdio run wdio.conf.ts --debug=agent
npx wdio session -s debug-0-0 snapshot
npx wdio session -s debug-0-0 exec -e "await browser.getTitle()"
npx wdio session -s debug-0-0 resume
```

उस सेशन पर `close` करने से रुका हुआ टेस्ट `Session closed from wdio session` के साथ विफल हो जाता है। जब टेस्ट को जारी रखना हो, तब resume करें। जब आप चाहते हैं कि रन पॉज़ पर ही विफल हो जाए, तब close करें।

`--debug=agent` के बिना `browser.debug()` अभी भी टेस्ट के अंदर [REPL](/docs/repl) खोलता है। `--debug=agent` वह तरीका है जो किसी अन्य प्रोसेस को, जिसमें कोडिंग एजेंट भी शामिल है, `wdio session` के साथ रुके हुए वर्कर को नियंत्रित करने देता है।

## REPL अटैच करें

`wdio repl --session <name>` पहले से खुले हुए सेशन से जुड़ता है और जब आप बाहर निकलते हैं तो उसे चलता हुआ छोड़ देता है:

```sh
npx wdio session open chrome https://webdriver.io
npx wdio repl --session default
```

हर REPL लाइन `wdio session exec` के रूप में चलती है। `.exit` प्रिंट करता है `Detached from "default" (still running)`।

## Doctor

`npx wdio session doctor` सेशन खोलने से पहले Node.js, ब्राउज़र, Appium, SDKs और क्लाउड क्रेडेंशियल्स की जाँच करता है। `doctor <target>` केवल वही जाँचता है जिसकी उस टारगेट को ज़रूरत है। कोई जाँच विफल होने पर प्रोसेस 1 के साथ बाहर निकलता है। जो सेशन अभी भी शुरू हो रहा है, उसे वैसे ही छोड़ दिया जाता है। जिस सेशन का प्रोसेस समाप्त हो चुका है, उसे हटा दिया जाता है।

## समस्या निवारण

| संदेश | क्या करें |
| --- | --- |
| `Session closed from wdio session` | आपने डीबग सेशन बंद कर दिया। जब टेस्ट को जारी रखना हो, तब `resume` का उपयोग करें। |
| कोई `debug-0-0` सेशन नहीं | रन अभी तक रुका नहीं है, या उसने किसी अलग वर्कर id का उपयोग किया है। `wdio session list` नाम प्रिंट करता है। |
| पॉज़ कभी नहीं होता | कमांड `wdio run --debug=agent` होनी चाहिए। पास होने वाला टेस्ट तब तक नहीं रुकता जब तक वह `browser.debug()` को कॉल न करे। |

## अगले कदम

- [डीबगिंग](/docs/debugging) — `browser.debug()`, ब्रेकपॉइंट्स और फ्लेकी टेस्ट
- [REPL](/docs/repl) — इंटरैक्टिव शेल
- [wdio session](/docs/session) — ऐसा सेशन खोलें जो किसी टेस्ट रन से जुड़ा न हो