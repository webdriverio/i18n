---
id: debugging
title: डीबगिंग
---

कई प्रक्रियाएँ जब अनेक ब्राउज़रों में दर्जनों परीक्षण चलाती हैं, तब डीबगिंग काफी मुश्किल हो जाती है।

<iframe width="560" height="315" src="https://www.youtube.com/embed/_bw_VWn5IzU" frameborder="0" allowFullScreen></iframe>

शुरू करने के लिए, `maxInstances` को `1` पर सेट करके समानांतरता को सीमित करना और केवल उन स्पेक्स और ब्राउज़रों को लक्षित करना बहुत मददगार होता है, जिन्हें डीबग करने की आवश्यकता है।

`wdio.conf` में:

```js
export const config = {
    // ...
    maxInstances: 1,
    specs: [
        '**/myspec.spec.js'
    ],
    capabilities: [{
        browserName: 'firefox'
    }],
    // ...
}
```

## डीबग कमांड

कई मामलों में, आप अपने परीक्षण को रोकने और ब्राउज़र का निरीक्षण करने के लिए [`browser.debug()`](/docs/api/browser/debug) का उपयोग कर सकते हैं।

आपका कमांड लाइन इंटरफेस भी REPL मोड में स्विच हो जाएगा। यह मोड आपको पेज पर कमांड और एलिमेंट्स के साथ खेलने की अनुमति देता है। REPL मोड में, आप `browser` ऑब्जेक्ट—या `$` और `$$` फंक्शन—तक उसी तरह पहुंच सकते हैं जैसे आप अपने परीक्षणों में करते हैं।

जब `browser.debug()` का उपयोग करते हैं, तो आपको परीक्षण रनर के टाइमआउट को बढ़ाने की आवश्यकता होगी ताकि परीक्षण रनर अधिक समय लेने के कारण परीक्षण को विफल न करे। उदाहरण के लिए:

`wdio.conf` में:

```js
jasmineOpts: {
    defaultTimeoutInterval: (24 * 60 * 60 * 1000)
}
```

अन्य फ्रेमवर्क का उपयोग करके ऐसा करने के तरीके के बारे में अधिक जानकारी के लिए [timeouts](timeouts) देखें।

डीबगिंग के बाद परीक्षण जारी रखने के लिए, शेल में `^C` शॉर्टकट या `.exit` कमांड का उपयोग करें।
## डायनामिक कॉन्फिगरेशन

ध्यान दें कि `wdio.conf.js` जावास्क्रिप्ट युक्त हो सकता है। चूंकि आप शायद अपने टाइमआउट मान को स्थायी रूप से 1 दिन में बदलना नहीं चाहते हैं, इसलिए अक्सर इन सेटिंग्स को कमांड लाइन से पर्यावरण चर (environment variable) का उपयोग करके बदलना सहायक हो सकता है।

इस तकनीक का उपयोग करके, आप कॉन्फिगरेशन को गतिशील रूप से बदल सकते हैं:

```js
const debug = process.env.DEBUG
const defaultCapabilities = ...
const defaultTimeoutInterval = ...
const defaultSpecs = ...

export const config = {
    // ...
    maxInstances: debug ? 1 : 100,
    capabilities: debug ? [{ browserName: 'chrome' }] : defaultCapabilities,
    execArgv: debug ? ['--inspect'] : [],
    jasmineOpts: {
      defaultTimeoutInterval: debug ? (24 * 60 * 60 * 1000) : defaultTimeoutInterval
    }
    // ...
}
```

आप फिर `wdio` कमांड को `debug` फ्लैग के साथ प्रिफिक्स कर सकते हैं:

```
$ DEBUG=true npx wdio wdio.conf.js --spec ./tests/e2e/myspec.test.js
```

...और DevTools के साथ अपनी स्पेक फ़ाइल डीबग करें!

## विजुअल स्टूडियो कोड (VSCode) के साथ डीबगिंग

यदि आप अपने परीक्षणों को नवीनतम VSCode में ब्रेकपॉइंट्स के साथ डीबग करना चाहते हैं, तो डिबगर शुरू करने के लिए आपके पास दो विकल्प हैं, जिनमें से विकल्प 1 सबसे आसान तरीका है:
 1. स्वचालित रूप से डिबगर को अटैच करना
 2. कॉन्फिगरेशन फ़ाइल का उपयोग करके डिबगर को अटैच करना

### VSCode टॉगल ऑटो अटैच

आप VSCode में इन चरणों का पालन करके स्वचालित रूप से डिबगर को अटैच कर सकते हैं:
 - CMD + Shift + P (Linux और Macos) या CTRL + Shift + P (Windows) दबाएं
 - इनपुट फील्ड में "attach" टाइप करें
 - "Debug: Toggle Auto Attach" चुनें
 - "Only With Flag" चुनें

 बस इतना ही! अब जब आप अपने परीक्षण चलाते हैं (याद रखें कि आपको --inspect फ्लैग को अपने कॉन्फिग में सेट करने की आवश्यकता होगी जैसा कि पहले दिखाया गया है) तो यह स्वचालित रूप से डिबगर शुरू कर देगा और पहले ब्रेकपॉइंट पर रुक जाएगा जिस पर यह पहुंचता है।

### VSCode कॉन्फिगरेशन फ़ाइल

सभी या चयनित स्पेक फ़ाइल(ें) चलाना संभव है। डीबग कॉन्फिगरेशन(ें) को `.vscode/launch.json` में जोड़ा जाना चाहिए, चयनित स्पेक को डीबग करने के लिए निम्नलिखित कॉन्फिग जोड़ें:
```
{
    "name": "run select spec",
    "type": "node",
    "request": "launch",
    "args": ["wdio.conf.js", "--spec", "${file}"],
    "cwd": "${workspaceFolder}",
    "autoAttachChildProcesses": true,
    "program": "${workspaceRoot}/node_modules/@wdio/cli/bin/wdio.js",
    "console": "integratedTerminal",
    "skipFiles": [
        "${workspaceFolder}/node_modules/**/*.js",
        "${workspaceFolder}/lib/**/*.js",
        "<node_internals>/**/*.js"
    ]
},
```

सभी स्पेक फ़ाइलें चलाने के लिए `"args"` से `"--spec", "${file}"` हटाएं

उदाहरण: [.vscode/launch.json](https://github.com/mgrybyk/webdriverio-devtools/blob/master/.vscode/launch.json)

अतिरिक्त जानकारी: https://code.visualstudio.com/docs/nodejs/nodejs-debugging

## एटम के साथ डायनामिक REPL

यदि आप [Atom](https://atom.io/) के हैकर हैं तो आप [@kurtharriger](https://github.com/kurtharriger) द्वारा [`wdio-repl`](https://github.com/kurtharriger/wdio-repl) आज़मा सकते हैं, जो एक डायनामिक REPL है जो आपको Atom में एकल कोड लाइन निष्पादित करने की अनुमति देता है। डेमो देखने के लिए [this](https://www.youtube.com/watch?v=kdM05ChhLQE) YouTube वीडियो देखें।

## WebStorm / Intellij के साथ डीबगिंग
आप इस तरह से एक node.js डीबग कॉन्फिगरेशन बना सकते हैं:
![Screenshot from 2021-05-29 17-33-33](https://user-images.githubusercontent.com/18728354/120088460-81844c00-c0a5-11eb-916b-50f21c8472a8.png)
एक कॉन्फिगरेशन बनाने के बारे में अधिक जानकारी के लिए यह [YouTube वीडियो](https://www.youtube.com/watch?v=Qcqnmle6Wu8) देखें।

## अस्थिर परीक्षणों की डीबगिंग

अस्थिर परीक्षणों को डीबग करना वास्तव में मुश्किल हो सकता है, इसलिए यहां कुछ सुझाव दिए गए हैं कि आप कैसे अपने CI में प्राप्त अस्थिर परिणाम को स्थानीय रूप से पुन: उत्पन्न करने का प्रयास कर सकते हैं।

### नेटवर्क
नेटवर्क संबंधित अस्थिरता का डीबग करने के लिए [throttleNetwork](https://webdriver.io/docs/api/browser/throttleNetwork) कमांड का उपयोग करें।
```js
await browser.throttleNetwork('Regular3G')
```

### रेंडरिंग स्पीड
डिवाइस स्पीड संबंधित अस्थिरता का डीबग करने के लिए [throttleCPU](https://webdriver.io/docs/api/browser/throttleCPU) कमांड का उपयोग करें।
इससे आपके पेज धीमी गति से रेंडर होंगे, जो कई चीजों से हो सकता है जैसे आपके CI में कई प्रक्रियाओं को चलाना जो आपके परीक्षणों को धीमा कर सकता है।
```js
await browser.throttleCPU(4)
```

### परीक्षण निष्पादन गति

यदि आपके परीक्षण प्रभावित नहीं होते हैं, तो यह संभव है कि WebdriverIO फ्रंटएंड फ्रेमवर्क / ब्राउज़र से अपडेट की तुलना में तेज़ है। यह सिंक्रोनस अभिकथनों (assertions) का उपयोग करते समय होता है क्योंकि WebdriverIO के पास इन अभिकथनों को फिर से प्रयास करने का कोई मौका नहीं होता है। ऐसे कोड के कुछ उदाहरण जो इसके कारण टूट सकते हैं:
```js
expect(elementList.length).toEqual(7) // अभिकथन के समय सूची अभी तक भरी नहीं गई हो सकती है
expect(await elem.getText()).toEqual('this button was clicked 3 times') // अभिकथन के समय टेक्स्ट अभी तक अपडेट नहीं किया गया हो सकता है, जिससे त्रुटि होती है ("this button was clicked 2 times" अपेक्षित "this button was clicked 3 times" से मेल नहीं खाता)
expect(await elem.isDisplayed()).toBe(true) // अभी तक प्रदर्शित नहीं किया गया हो सकता है
```
इस समस्या को हल करने के लिए, असिंक्रोनस अभिकथनों का उपयोग किया जाना चाहिए। उपरोक्त उदाहरण इस प्रकार दिखेंगे:
```js
await expect(elementList).toBeElementsArrayOfSize(7)
await expect(elem).toHaveText('this button was clicked 3 times')
await expect(elem).toBeDisplayed()
```
इन अभिकथनों का उपयोग करके, WebdriverIO स्वचालित रूप से तब तक इंतजार करेगा जब तक शर्त मेल नहीं खाती। टेक्स्ट की अभिकथन करते समय इसका मतलब है कि एलिमेंट को मौजूद होना चाहिए और टेक्स्ट को अपेक्षित मूल्य के बराबर होना चाहिए।
हम इस बारे में अपने [बेस्ट प्रैक्टिसेज गाइड](https://webdriver.io/docs/bestpractices#use-the-built-in-assertions) में अधिक बात करते हैं।