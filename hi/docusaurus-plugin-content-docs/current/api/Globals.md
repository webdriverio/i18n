---
id: globals
title: ग्लोबल्स
---

आपकी परीक्षण फाइलों में, WebdriverIO इन सभी विधियों और ऑब्जेक्ट्स को ग्लोबल एनवायरनमेंट में डालता है। इन्हें उपयोग करने के लिए आपको कुछ भी इम्पोर्ट करने की आवश्यकता नहीं है। हालांकि, यदि आप स्पष्ट इम्पोर्ट पसंद करते हैं, तो आप `import { browser, $, $$, expect } from '@wdio/globals'` कर सकते हैं और अपने WDIO कॉन्फिगरेशन में `injectGlobals: false` सेट कर सकते हैं।

निम्नलिखित ग्लोबल ऑब्जेक्ट्स सेट किए जाते हैं यदि अन्यथा कॉन्फिगर नहीं किया गया है:

- `browser`: WebdriverIO [Browser object](https://webdriver.io/docs/api/browser)
- `driver`: `browser` का उपनाम (मोबाइल टेस्ट चलाते समय उपयोग किया जाता है)
- `multiRemoteBrowser`: `browser` या `driver` का उपनाम लेकिन केवल [Multiremote](/docs/multiremote) सत्रों के लिए सेट किया जाता है
- `$`: एक एलिमेंट को लाने के लिए कमांड (अधिक जानकारी [API docs](/docs/api/browser/$) में देखें)
- `$$`: एलिमेंट्स को लाने के लिए कमांड (अधिक जानकारी [API docs](/docs/api/browser/$$) में देखें)
- `expect`: WebdriverIO के लिए असर्शन फ्रेमवर्क (देखें [API docs](/docs/api/expect-webdriverio))

__नोट:__ WebdriverIO का उपयोग किए गए फ्रेमवर्क (जैसे Mocha या Jasmine) पर कोई नियंत्रण नहीं है जो अपने एनवायरनमेंट को बूटस्ट्रैप करते समय ग्लोबल वेरिएबल्स सेट करते हैं।