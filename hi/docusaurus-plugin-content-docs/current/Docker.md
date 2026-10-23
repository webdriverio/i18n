---
id: docker
title: डॉकर
description: "सभी मशीनों पर एक जैसे परिणामों के लिए अपने WebdriverIO टेस्ट सूट को पहले से इंस्टॉल ब्राउज़र वाले Docker कंटेनर के अंदर चलाएँ।"
---

Docker एक शक्तिशाली कंटेनराइज़ेशन तकनीक है जो आपके टेस्ट सूट को एक कंटेनर में समाहित करने की अनुमति देती है जो हर सिस्टम पर एक जैसा व्यवहार करता है। इससे अलग-अलग ब्राउज़र या प्लेटफ़ॉर्म संस्करणों के कारण होने वाली अस्थिरता (flakiness) से बचा जा सकता है। अपने टेस्ट को कंटेनर के भीतर चलाने के लिए, अपनी प्रोजेक्ट डायरेक्टरी में एक `Dockerfile` बनाएँ, उदाहरण के लिए:

```Dockerfile
FROM selenium/standalone-chrome:134.0-20250323 # अपनी आवश्यकताओं के अनुसार ब्राउज़र और संस्करण बदलें
WORKDIR /app
ADD . /app

RUN npm install

CMD npx wdio
```

सुनिश्चित करें कि आप अपनी Docker इमेज में अपने `node_modules` शामिल न करें और इमेज बनाते समय इन्हें इंस्टॉल करें। इसके लिए निम्नलिखित सामग्री के साथ एक `.dockerignore` फ़ाइल जोड़ें:

```
node_modules
```

:::info
हम यहाँ एक ऐसी Docker इमेज का उपयोग कर रहे हैं जिसमें Selenium और Google Chrome पहले से इंस्टॉल आते हैं। अलग-अलग ब्राउज़र सेटअप और ब्राउज़र संस्करणों के साथ कई इमेज उपलब्ध हैं। Selenium प्रोजेक्ट द्वारा अनुरक्षित इमेज [Docker Hub पर](https://hub.docker.com/u/selenium) देखें।
:::

चूँकि हम अपने Docker कंटेनर में Google Chrome को केवल हेडलेस मोड में ही चला सकते हैं, इसलिए यह सुनिश्चित करने के लिए हमें अपनी `wdio.conf.js` को संशोधित करना होगा:

```js title="wdio.conf.js"
export const config = {
    // ...
    capabilities: [{
        maxInstances: 1,
        browserName: 'chrome',
        'goog:chromeOptions': {
            args: [
                '--no-sandbox',
                '--disable-infobars',
                '--headless',
                '--disable-gpu',
                '--window-size=1440,735'
            ],
        }
    }],
    // ...
}
```

जैसा कि [ऑटोमेशन प्रोटोकॉल](/docs/automationProtocols) में बताया गया है, आप WebdriverIO को WebDriver प्रोटोकॉल या WebDriver BiDi प्रोटोकॉल का उपयोग करके चला सकते हैं। सुनिश्चित करें कि आपकी इमेज पर इंस्टॉल Chrome संस्करण आपके `package.json` में परिभाषित [Chromedriver](https://www.npmjs.com/package/chromedriver) संस्करण से मेल खाता हो।

Docker कंटेनर बनाने के लिए आप यह चला सकते हैं:

```sh
docker build -t mytest -f Dockerfile .
```

फिर टेस्ट चलाने के लिए, यह निष्पादित करें:

```sh
docker run -it mytest
```

Docker इमेज को कॉन्फ़िगर करने के बारे में अधिक जानकारी के लिए, [Docker डॉक्स](https://docs.docker.com/) देखें।

## ऐसी इमेज जहाँ WebdriverIO ब्राउज़र डाउनलोड करता है

जब इमेज में कोई ब्राउज़र नहीं होता, तो WebdriverIO स्वयं Chrome, Chromium, Firefox और Chromedriver डाउनलोड करता है। Chrome, Chromium और Chromedriver zip फ़ाइलों के रूप में आते हैं, और WebdriverIO उन्हें Linux और macOS पर `unzip` कमांड से (Windows पर `tar.exe` या PowerShell से) एक्सट्रैक्ट करता है। स्लिम इमेज, जैसे `node:24-slim`, और न्यूनतम Alpine इमेज में `unzip` नहीं होता, इसलिए इसे अपनी `Dockerfile` में इंस्टॉल करें:

```Dockerfile
FROM node:24-slim
RUN apt-get update && apt-get install -y --no-install-recommends unzip && rm -rf /var/lib/apt/lists/*
```

Alpine पर, `RUN apk add --no-cache unzip` का उपयोग करें। इसके बिना, डाउनलोड `Extraction failed: no zip archiver is available` त्रुटि के साथ विफल हो जाता है।