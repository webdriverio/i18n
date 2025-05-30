---
id: autocompletion
title: स्वतः पूर्णता
---

## IntelliJ

स्वतः पूर्णता IDEA और WebStorm में बिना किसी अतिरिक्त सेटअप के काम करती है।

अगर आप काफी समय से प्रोग्राम कोड लिख रहे हैं, तो संभवतः आपको स्वतः पूर्णता पसंद होगी। कई कोड एडिटर्स में स्वतः पूर्णता बिना किसी अतिरिक्त सेटअप के उपलब्ध है।

![Autocompletion](/img/autocompletion/0.png)

कोड के दस्तावेज़ीकरण के लिए [JSDoc](http://usejsdoc.org/) पर आधारित टाइप परिभाषाएँ उपयोग की जाती हैं। यह पैरामीटर्स और उनके प्रकारों के बारे में अधिक अतिरिक्त विवरण देखने में मदद करता है।

![Autocompletion](/img/autocompletion/1.png)

उपलब्ध दस्तावेज़ देखने के लिए IntelliJ प्लेटफॉर्म पर मानक शॉर्टकट <kbd>⇧ + ⌥ + SPACE</kbd> का उपयोग करें:

![Autocompletion](/img/autocompletion/2.png)

## Visual Studio Code (VSCode)

Visual Studio Code में आमतौर पर टाइप सपोर्ट स्वचालित रूप से एकीकृत होता है और इसके लिए कोई अतिरिक्त कार्रवाई की आवश्यकता नहीं होती है।

![Autocompletion](/img/autocompletion/14.png)

यदि आप वैनिला JavaScript का उपयोग करते हैं और उचित टाइप सपोर्ट चाहते हैं, तो आपको अपने प्रोजेक्ट रूट में एक `jsconfig.json` बनाना होगा और उपयोग किए गए wdio पैकेज का संदर्भ देना होगा, उदाहरण के लिए:

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