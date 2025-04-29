---
id: docker
title: डॉकर
---

डॉकर एक शक्तिशाली कंटेनराइजेशन तकनीक है जो आपकी टेस्ट सूट को एक कंटेनर में संकुचित करने की अनुमति देती है जो हर सिस्टम पर एक जैसा व्यवहार करता है। इससे विभिन्न ब्राउज़र या प्लेटफॉर्म संस्करणों के कारण होने वाली अस्थिरता से बचा जा सकता है। अपने टेस्ट को कंटेनर के अंदर चलाने के लिए, अपनी प्रोजेक्ट डायरेक्टरी में एक `Dockerfile` बनाएं, उदाहरण के लिए:

```Dockerfile
FROM selenium/standalone-chrome:134.0-20250323 # Change the browser and version according to your needs
WORKDIR /app
ADD . /app

RUN npm install

CMD npx wdio
```

सुनिश्चित करें कि आप अपने डॉकर इमेज में अपने `node_modules` शामिल न करें और इमेज बनाते समय इन्हें इंस्टॉल करें। इसके लिए निम्नलिखित सामग्री के साथ एक `.dockerignore` फ़ाइल जोड़ें:

```
node_modules
```

:::info
हम यहां एक डॉकर इमेज का उपयोग कर रहे हैं जिसमें सेलेनियम और गूगल क्रोम पहले से इंस्टॉल हैं। विभिन्न ब्राउज़र सेटअप और ब्राउज़र संस्करणों के साथ विभिन्न इमेज उपलब्ध हैं। सेलेनियम प्रोजेक्ट द्वारा बनाए गए इमेज को [डॉकर हब पर](https://hub.docker.com/u/selenium) देखें।
:::

चूंकि हम अपने डॉकर कंटेनर में गूगल क्रोम को केवल हेडलेस मोड में चला सकते हैं, हमें यह सुनिश्चित करने के लिए अपने `wdio.conf.js` को संशोधित करना होगा:

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

जैसा कि [ऑटोमेशन प्रोटोकॉल](/docs/automationProtocols) में उल्लेख किया गया है, आप वेबड्राइवर प्रोटोकॉल या वेबड्राइवर BiDi प्रोटोकॉल का उपयोग करके WebdriverIO चला सकते हैं। सुनिश्चित करें कि आपके इमेज पर इंस्टॉल किए गए क्रोम का वर्जन आपके `package.json` में परिभाषित [Chromedriver](https://www.npmjs.com/package/chromedriver) वर्जन से मेल खाता है।

डॉकर कंटेनर बनाने के लिए आप चला सकते हैं:

```sh
docker build -t mytest -f Dockerfile .
```

फिर टेस्ट चलाने के लिए, निष्पादित करें:

```sh
docker run -it mytest
```

डॉकर इमेज को कॉन्फ़िगर करने के तरीके पर अधिक जानकारी के लिए, [डॉकर डॉक्स](https://docs.docker.com/) देखें।