---
id: githubactions
title: गिटहब एक्शन्स
---

अगर आपका रिपॉजिटरी गिटहब पर होस्ट किया गया है, तो आप [Github Actions](https://docs.github.com/en/actions) का उपयोग गिटहब के इंफ्रास्ट्रक्चर पर अपने टेस्ट चलाने के लिए कर सकते हैं।

1. हर बार जब आप परिवर्तन पुश करते हैं
2. हर पुल रिक्वेस्ट बनाने पर
3. निर्धारित समय पर
4. मैनुअल ट्रिगर द्वारा

अपने रिपॉजिटरी के रूट में, एक `.github/workflows` डायरेक्टरी बनाएं। एक Yaml फ़ाइल जोड़ें, उदाहरण के लिए `.github/workflows/ci.yaml`। वहां आप कॉन्फ़िगर करेंगे कि अपने टेस्ट कैसे चलाना है।

संदर्भ कार्यान्वयन के लिए [jasmine-boilerplate](https://github.com/webdriverio/jasmine-boilerplate/blob/master/.github/workflows/ci.yaml) देखें, और [सैंपल टेस्ट रन्स](https://github.com/webdriverio/jasmine-boilerplate/actions?query=workflow%3ACI) देखें।

```yaml reference
https://github.com/webdriverio/jasmine-boilerplate/blob/master/.github/workflows/ci.yaml
```

वर्कफ़्लो फ़ाइलें बनाने के बारे में अधिक जानकारी के लिए [Github Docs](https://docs.github.com/en/actions/managing-workflow-runs-and-deployments/managing-workflow-runs/manually-running-a-workflow?tool=cli) में पता करें।