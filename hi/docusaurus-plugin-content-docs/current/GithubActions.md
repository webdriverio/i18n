---
id: githubactions
title: Github Actions
description: "अपनी रिपॉज़िटरी में एक वर्कफ़्लो फ़ाइल जोड़कर GitHub Actions पर अपने WebdriverIO टेस्ट चलाएँ।"
---

यदि आपकी रिपॉज़िटरी Github पर होस्ट की गई है, तो आप Github के इंफ्रास्ट्रक्चर पर अपने टेस्ट चलाने के लिए [Github Actions](https://docs.github.com/en/actions) का उपयोग कर सकते हैं।

1. हर बार जब आप बदलाव पुश करते हैं
2. हर पुल रिक्वेस्ट बनाए जाने पर
3. निर्धारित समय पर
4. मैन्युअल ट्रिगर द्वारा

अपनी रिपॉज़िटरी के रूट में, एक `.github/workflows` डायरेक्टरी बनाएँ। एक Yaml फ़ाइल जोड़ें, उदाहरण के लिए `.github/workflows/ci.yaml`। उसमें आप कॉन्फ़िगर करेंगे कि अपने टेस्ट कैसे चलाने हैं।

संदर्भ कार्यान्वयन के लिए [jasmine-boilerplate](https://github.com/webdriverio/jasmine-boilerplate/blob/master/.github/workflows/ci.yaml) देखें, और [सैंपल टेस्ट रन](https://github.com/webdriverio/jasmine-boilerplate/actions?query=workflow%3ACI) भी देखें।

```yaml reference
https://github.com/webdriverio/jasmine-boilerplate/blob/master/.github/workflows/ci.yaml
```

वर्कफ़्लो फ़ाइलें बनाने के बारे में अधिक जानकारी के लिए [Github Docs](https://docs.github.com/en/actions/managing-workflow-runs-and-deployments/managing-workflow-runs/manually-running-a-workflow?tool=cli) देखें।