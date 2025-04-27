---
id: globals
title: ग्लोबल्स
---

आपकी परीक्षण फ़ाइलों में, WebdriverIO इन विधियों और वस्तुओं में से प्रत्येक को वैश्विक वातावरण में डालता है। उन्हें उपयोग करने के लिए आपको कुछ भी आयात करने की आवश्यकता नहीं है। हालांकि, यदि आप स्पष्ट आयात पसंद करते हैं, तो आप `import { browser, $, $$, expect } from '@wdio/globals'` कर सकते हैं और अपने WDIO कॉन्फिगरेशन में `injectGlobals: false` सेट कर सकते हैं।

निम्नलिखित वैश्विक वस्तुएँ सेट हैं यदि अन्यथा कॉन्फ़िगर नहीं की गई हैं:

- `browser`: WebdriverIO [Browser object](https://webdriver.io/docs/api/browser)
- `driver`: `browser` का उपनाम (मोबाइल परीक्षण चलाते समय उपयोग किया जाता है)
- `multiremotebrowser`: `browser` या `driver` का उपनाम लेकिन केवल [Multiremote](/docs/multiremote) सत्रों के लिए सेट किया गया है
- `$`: एक तत्व को प्राप्त करने के लिए कमांड (अधिक जानकारी [API docs](/docs/api/browser/$) में देखें)
- `$$`: तत्वों को प्राप्त करने के लिए कमांड (अधिक जानकारी [API docs](/docs/api/browser/$$) में देखें)
- `expect`: WebdriverIO के लिए असर्शन फ्रेमवर्क (देखें [API docs](/docs/api/expect-webdriverio))

__नोट:__ WebdriverIO का उपयोग किए गए फ्रेमवर्क्स (जैसे Mocha या Jasmine) पर कोई नियंत्रण नहीं है जो अपने वातावरण को बूटस्ट्रैप करते समय वैश्विक चर सेट करते हैं।