---
id: exec
title: सेशन में कोड चलाएँ
description: exec के साथ एक लाइव wdio सेशन में WebdriverIO कोड और असर्शन चलाएँ।
---

`exec` खुले सेशन में WebdriverIO कोड चलाता है। इसका उपयोग तब करें जब कोई स्टेप एक अकेले `click` या `fill` से अधिक हो, और हर असर्शन के लिए भी।

```sh
npx wdio session exec -e "await browser.getTitle()"
npx wdio session <<'JS'
await $('aria/Cart (1)').waitForDisplayed()
JS
```

कमांड्स को हमेशा `await` करें। `$` एक एलिमेंट लौटाता है और एलिमेंट न मिलने पर एरर थ्रो करता है। `$$` एक लिस्ट लौटाता है। कोई sync मोड नहीं है और कोई `browser.element` नहीं है।

आपके द्वारा डिक्लेयर किए गए नाम अगले `exec` में भी उपलब्ध रहते हैं। टॉप-लेवल `import` प्रोजेक्ट डायरेक्टरी से लोड होता है।

## असर्शन

असर्शन को `expect-webdriverio` के साथ `exec` में रखें। इसे अपने प्रोजेक्ट में इंस्टॉल करें। इसके बिना, `expect(...)` इंस्टॉल करने के संकेत के साथ विफल हो जाता है।

```sh
npx wdio session exec -e "await expect($('h1')).toHaveText('Cart')"
```

जब सवाल यह हो कि स्क्रीन कैसी दिखती है, तब `visual check <tag>` का उपयोग करें। इस कमांड के लिए `@wdio/visual-service` आवश्यक है:

```sh
npx wdio session visual check cart
```

`visual accept cart` उस टैग की नवीनतम वास्तविक इमेज को बेसलाइन पर कॉपी कर देता है। यह उन पुरानी इमेजों को कॉपी नहीं करता जो समान टैग प्रीफ़िक्स साझा करती हैं।

## इसके बजाय शॉर्टकट का उपयोग कब करें

एक इंटरैक्शन के लिए `click`, `fill`, `type`, `press` और `tap` `exec` से छोटे हैं, और वे चलाई गई WebdriverIO लाइन को प्रिंट करते हैं। नवीनतम [स्नैपशॉट](/docs/session/snapshots) से मिले ref के साथ इन्हें प्राथमिकता दें। वेट, असर्शन और ऐसी किसी भी चीज़ के लिए `exec` का उपयोग करें जिसमें एक से अधिक कमांड की आवश्यकता हो।

## अगले कदम

- [टेस्ट एक्सपोर्ट करें](/docs/session/export) — `exec` सहित स्टेप्स सेव करें
- [कमांड्स](/docs/session-commands) — `exec` और `visual` फ़्लैग