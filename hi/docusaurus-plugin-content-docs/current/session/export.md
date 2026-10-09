---
id: export
title: सत्र को टेस्ट के रूप में एक्सपोर्ट करें
description: wdio session में चलाए गए चरणों को एक spec, page objects और custom commands में बदलें।
---

`export` रिकॉर्ड किए गए चरणों से एक spec लिखता है। Refs को स्थिर selectors से बदल दिया जाता है। किसी वेब पेज के लिए, निम्नलिखित में से पहला वह selector उपयोग किया जाता है जो ठीक एक element से मेल खाता है: एक test id (`data-testid`, `data-test`, `data-qa`), एक [role selector](/docs/selectors#role-selector) जैसे `role/button[name="Add to cart"]`, एक accessible name (`aria/Add to cart`), एक id, किसी button या link का टेक्स्ट, किसी form field का नाम, और अंत में एक CSS path।

```sh
npx wdio session export --out test/specs/cart.e2e.ts
npx wdio run wdio.conf.ts --spec test/specs/cart.e2e.ts
```

`history` एक्सपोर्ट करने से पहले चरणों को प्रिंट करता है। `history clear` उन्हें हटा देता है।

## Page objects

`--page-objects` spec के बगल में एक page object लिखता है। Selectors को उस path के अनुसार समूहित किया जाता है जिस पर वे चले थे। किसी रिकॉर्ड किए गए चरण में एक literal `$('…')` एक getter बन जाता है। `$$`, ऐसी strings जिनमें संयोग से `$('…')` शामिल हो, और एक dynamic `$(selector)` जैसे हैं वैसे ही रहते हैं।

```sh
npx wdio session export --page-objects --out test/specs/cart.e2e.ts
```

यह कमांड आउटपुट डायरेक्टरी में पहले से मौजूद page object को overwrite करने से इनकार करती है। पहले `--out` बदलें या उस फ़ाइल को हटा दें। Spec फ़ाइल स्वयं फिर से लिखी जाती है।

किसी `exec` चरण के शीर्ष पर मौजूद `import` को spec के शीर्ष पर, test function के बाहर, hoist कर दिया जाता है।

## Helpers

जब कोई चरण `exec` के लिए बहुत लंबा हो, तो `.wdio/helpers/` के अंतर्गत एक फ़ाइल जोड़ें। प्रत्येक फ़ाइल एक function को default-export करती है जो browser प्राप्त करता है और `addCommand` के साथ commands रजिस्टर करता है। Relative imports उसी फ़ाइल के सापेक्ष रहते हैं। Bare package imports प्रोजेक्ट से resolve होते हैं।

```js title=".wdio/helpers/login.js"
import { mark } from './util.js'

export default function login (browser) {
    browser.addCommand('fillLogin', async (email) => {
        await browser.$('#email').setValue(email + mark)
    })
}
```

Helpers सत्र खुलने पर लोड होते हैं और `npx wdio session helpers --reload` के साथ फिर से लोड होते हैं। यदि `.wdio/helpers` अभी मौजूद नहीं है, तो सत्र उसके बनने पर नज़र रखता है। एक्सपोर्ट किए गए टेस्ट में Helpers custom commands बन जाते हैं।

## अगले चरण

- [कोड चलाएँ](/docs/session/exec) — वे चरण जिन्हें `export` रिकॉर्ड करता है
- [Commands](/docs/session-commands) — `export`, `history` और `helpers` flags