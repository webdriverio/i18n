---
id: snapshots
title: स्नैपशॉट और refs
description: wdio session snapshot से पेज पढ़ें, फिर उसके द्वारा प्रिंट किए गए refs पर कार्रवाई करें।
---

क्लिक करने से पहले एक स्नैपशॉट लें। स्नैपशॉट उन एलिमेंट्स की सूची है जिन पर आप कार्रवाई कर सकते हैं। हर इंटरैक्टिव लाइन `[ref=e3]` जैसे किसी ref के साथ ख़त्म होती है।

```sh
npx wdio session open chrome http://localhost:3000
npx wdio session snapshot --interactive
```

एक लाइन `button "Add to cart" [ref=e3]` जैसी दिखती है। अगली कमांड उस ref का उपयोग करती है:

```sh
npx wdio session click e3
```

Refs नवीनतम स्नैपशॉट से आते हैं। नेविगेशन के बाद, फिर से स्नैपशॉट लें। पुराना ref `REF_STALE` के साथ विफल होता है। अज्ञात ref `REF_NOT_FOUND` के साथ विफल होता है।

:::caution प्रायोगिक

स्नैपशॉट का टेक्स्ट लेआउट, और `--json` उसके लिए जो आकार प्रिंट करता है, प्रायोगिक हैं: कोई माइनर रिलीज़ इन्हें बदल सकती है, उदाहरण के लिए [DevTools trace](/docs/devtools/wdio/trace-mode) के साथ एक ही स्नैपशॉट इंजन साझा करने के लिए। ref सिंटैक्स (`e3`, `@e3`), ref लेने वाली actions और उनके द्वारा रिकॉर्ड किया गया कोड स्थिर रहते हैं। स्नैपशॉट से refs लें और उसकी बाकी लाइनों को पार्स न करें।

:::

## क्या चलाएँ

| कमांड | इसका उपयोग किसके लिए करें |
| --- | --- |
| `snapshot --interactive` | वे एलिमेंट्स जिन पर आप कार्रवाई कर सकते हैं, हर एक ref के साथ |
| `find "Add to cart"` | हर मैच अपने आस-पास के नोड के साथ, जैसे पूरा list item, ताकि मैच के बगल वाली वैल्यू भी साथ आ जाए। `-A`, `-B` और `-C` grep की तरह सादा लाइन संदर्भ प्रिंट करते हैं |
| `diff` | पिछले स्नैपशॉट के बाद से क्या बदला |
| `screenshot` | लेआउट। जब स्नैपशॉट से सवाल का जवाब मिल जाए तो इसे छोड़ दें |
| `source` | पेज का HTML या नेटिव XML |

`--interactive` के बिना `snapshot` ट्री का अधिक हिस्सा शामिल करता है। जब आप क्लिक या टाइप करने वाले हों, तो `--interactive` को प्राथमिकता दें।

## किसी action ने क्या बदला

वेब सेशन में, `open` उस पेज का इंटरैक्टिव स्नैपशॉट प्रिंट करता है जिसे उसने खोला, और हर action जो पेज बदल सकता है (`click`, `fill`, `type`, `press`, `select`, `check`, `navigate`, `frame`, …) बताता है कि क्या बदला:

```text
Clicked e6 (button "Start subscription")
Changes:
+ - status "Subscription started. Confirmation code: 4F2A9C"
```

जब action ने कोई टैब खोला हो, तो रिपोर्ट यह बताती है (`Opened a new tab [1]: https://…`); जब तक आप `tabs switch` नहीं चलाते, सेशन वर्तमान टैब पर ही रहता है। जब पेज साइट के बजाय कोई बॉट जाँच (Cloudflare, DataDome, Akamai, …) हो, तो रिपोर्ट यह भी बताती है, हर पेज पर एक बार। सेशन इसे पार करने की कोशिश नहीं करता; headless ब्राउज़र में यह `--headed` के साथ फिर से खोलने का सुझाव देता है।

उसी पेज पर आपको नई या बदली हुई लाइनें उनके refs के साथ मिलती हैं, जिसमें वह टेक्स्ट भी शामिल है जो इंटरैक्टिव नहीं है, जैसे ऊपर वाला status। नेविगेशन के बाद आपको नए पेज के इंटरैक्टिव एलिमेंट्स मिलते हैं, या बड़े पेज के लिए एक-लाइन का सारांश जो `find` की ओर इशारा करता है। इसलिए किसी action के बाद आपको शायद ही कभी अलग से `snapshot` की ज़रूरत पड़ती है। रिपोर्ट बंद करने के लिए `WDIO_SESSION_CHANGES=0` सेट करें, और `open` के बाद स्नैपशॉट छोड़ने के लिए `open --no-snapshot` पास करें।

## Frames

WebDriver BiDi सेशन में स्नैपशॉट पेज के iframes की सामग्री दिखाता है, cross-origin वाले भी शामिल हैं, उस iframe के नीचे जिसमें वे हैं:

```text
- iframe "Payment" [ref=e4]
  - textbox "Card number" [ref=e5]
  - button "Pay" [ref=e6]
```

इन refs पर actions फ़्रेम में प्रवेश करती हैं, कार्रवाई करती हैं, और पेज पर वापस आ जाती हैं, और प्रिंट किया गया कोड भी यही करता है। अधिकतम पाँच iframes दिखाए जाते हैं, हर एक 300 एलिमेंट्स पर काट दिया जाता है; `frame e4` और `snapshot` किसी कटे हुए फ़्रेम का पूरा हिस्सा दिखाते हैं। 100 वर्ग पिक्सेल से छोटे iframes, जैसे tracking pixels, छोड़ दिए जाते हैं।

## Shadow DOM और बिना role वाले क्लिक करने योग्य एलिमेंट्स

WebDriver BiDi के साथ, स्नैपशॉट closed shadow roots को भी कवर करता है, और जिन एलिमेंट्स में केवल click listener होता है (`addEventListener` से जुड़ा कोई आइकन) उन्हें भी ref मिलता है। ऐसे एलिमेंट का कोई accessible name नहीं होता, इसलिए स्नैपशॉट उसके बजाय उसका विवरण देता है:

```text
- generic [ref=e8] (icon 3 of 3 in "Invoice #1002 · Contoso Ltd · $860.00")
```

Android, iOS, macOS और Windows पर स्नैपशॉट Appium page source से आता है। एक ही accessibility id साझा करने वाले दो कंट्रोल अलग-अलग refs बने रहते हैं जब उनके बाकी selectors अलग हों। `snapshot --scope e3` ट्री को उस ref तक सीमित करता है।

## दोहराए गए कंट्रोल

जब कई कंट्रोल एक ही role और name साझा करते हैं, जैसे किसी product table की हर पंक्ति का "Add to cart" बटन, तो ref लाइन `∈ "<text>"` के साथ ख़त्म होती है, जो उस पंक्ति, कार्ड या list item का टेक्स्ट है जिसमें वह कंट्रोल है और उसी नाम का कोई दूसरा नहीं:

```text
- button "Add to cart" [ref=e9] ∈ "Desk lamp · Brass · In stock · $49.00"
```

टेक्स्ट 80 अक्षरों पर काट दिया जाता है। जिस कंट्रोल का item कोई page landmark हो (header और footer दोनों में एक "Sign in" लिंक), उसे यह नहीं मिलता। किसी दिखने वाले form control का label सूचीबद्ध नहीं होता: कंट्रोल ही name रखता है।

## नेटिव taps

वेब सेशन `click` का उपयोग करते हैं। मोबाइल और नेटिव डेस्कटॉप सेशन उसी ref पर `tap` का उपयोग करते हैं:

```sh
npx wdio session open android --app ./shop.apk
npx wdio session snapshot --interactive
npx wdio session tap e3
```

## समस्या निवारण

| संदेश | क्या करें |
| --- | --- |
| `REF_STALE` | पिछले स्नैपशॉट का एलिमेंट चला गया है। `snapshot` चलाएँ और नया ref उपयोग करें। |
| `REF_NOT_FOUND` | वह id इस सेशन में कभी नहीं था। आपकी कमांड का ref नवीनतम स्नैपशॉट से मेल नहीं खाता। |
| `NO_MATCH` | `find` को वह टेक्स्ट नहीं दिखा। स्नैपशॉट लें और वे नाम पढ़ें जो वास्तव में वहाँ हैं। |
| `NOT_EDITABLE` | `fill` का लक्ष्य कोई editable field नहीं है और उसके अंदर (या `aria-controls`/`aria-owns`/label के पीछे) कोई एकल editable field नहीं है। `snapshot --scope <target>` चलाएँ और field ref को fill करें। |

## अगले कदम

- [कोड चलाएँ](/docs/session/exec) — assertions और ऐसे steps जो एक से अधिक कमांड के हैं
- [कमांड्स](/docs/session-commands) — `snapshot`, `find`, `diff`, `screenshot` और `source` flags