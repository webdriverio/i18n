---
id: autocompletion
title: ऑटोकम्प्लीशन
description: "IntelliJ, WebStorm और Visual Studio Code में WebdriverIO कमांड्स के लिए ऑटोकम्प्लीशन और इनलाइन API डॉक्यूमेंटेशन प्राप्त करें।"
---

## IntelliJ

IDEA और WebStorm में ऑटोकम्प्लीशन बिना किसी अतिरिक्त सेटअप के काम करता है।

यदि आप कुछ समय से प्रोग्राम कोड लिख रहे हैं, तो शायद आपको ऑटोकम्प्लीशन पसंद होगा। कई कोड एडिटर्स में ऑटोकम्प्लीट बिना किसी अतिरिक्त सेटअप के उपलब्ध होता है।

![Autocompletion](/img/autocompletion/0.png)

कोड को डॉक्यूमेंट करने के लिए [JSDoc](http://usejsdoc.org/) पर आधारित टाइप डेफिनिशन्स का उपयोग किया जाता है। इससे पैरामीटर्स और उनके टाइप्स के बारे में अधिक विवरण देखने में मदद मिलती है।

![Autocompletion](/img/autocompletion/1.png)

उपलब्ध डॉक्यूमेंटेशन देखने के लिए IntelliJ प्लेटफ़ॉर्म पर स्टैंडर्ड शॉर्टकट <kbd>⇧ + ⌥ + SPACE</kbd> का उपयोग करें:

![Autocompletion](/img/autocompletion/2.png)

## Visual Studio Code (VSCode)

Visual Studio Code में आमतौर पर टाइप सपोर्ट स्वचालित रूप से इंटीग्रेटेड होता है और कोई कार्रवाई करने की आवश्यकता नहीं होती है।

![Autocompletion](/img/autocompletion/14.png)

यदि आप वैनिला JavaScript का उपयोग करते हैं और उचित टाइप सपोर्ट चाहते हैं, तो आपको अपने प्रोजेक्ट रूट में एक `jsconfig.json` बनानी होगी और उपयोग किए गए wdio पैकेजों को रेफर करना होगा, उदाहरण के लिए:

```json title="jsconfig.json"
{
    "compilerOptions": {
        "types": [
            "node",
            "@wdio/globals/types",
            "@wdio/mocha-framework"
        ]
    }
}
```