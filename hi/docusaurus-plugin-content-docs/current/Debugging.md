---
id: debugging
title: डिबगिंग
description: "browser.debug, VS Code या WebStorm ब्रेकपॉइंट्स के साथ WebdriverIO टेस्ट डिबग करें, फ्लेकी टेस्ट्स के लिए रणनीतियाँ, और CPU तथा हीप प्रोफाइलिंग।"
---

जब कई प्रोसेस कई ब्राउज़रों में दर्जनों टेस्ट चलाते हैं, तो डिबगिंग काफी अधिक कठिन हो जाती है।

<iframe width="560" height="315" src="https://www.youtube.com/embed/_bw_VWn5IzU" frameborder="0" allowFullScreen></iframe>

शुरुआत के लिए, `maxInstances` को `1` पर सेट करके पैरेललिज़्म को सीमित करना, और केवल उन्हीं स्पेक्स और ब्राउज़रों को लक्षित करना जिन्हें डिबग करने की आवश्यकता है, बेहद सहायक होता है।

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

## डिबग कमांड

कई मामलों में, आप अपने टेस्ट को रोकने और ब्राउज़र का निरीक्षण करने के लिए [`browser.debug()`](/docs/api/browser/debug) का उपयोग कर सकते हैं।

आपका कमांड लाइन इंटरफ़ेस भी REPL मोड में बदल जाएगा। यह मोड आपको पेज पर कमांड्स और एलिमेंट्स के साथ प्रयोग करने की अनुमति देता है। REPL मोड में, आप `browser` ऑब्जेक्ट&mdash;या `$` और `$$` फ़ंक्शन&mdash;को वैसे ही एक्सेस कर सकते हैं जैसे आप अपने टेस्ट्स में करते हैं।

`browser.debug()` का उपयोग करते समय, आपको संभवतः टेस्ट रनर का टाइमआउट बढ़ाने की आवश्यकता होगी ताकि टेस्ट रनर बहुत अधिक समय लेने के कारण टेस्ट को विफल न करे। उदाहरण के लिए:

`wdio.conf` में:

```js
jasmineOpts: {
    defaultTimeoutInterval: (24 * 60 * 60 * 1000)
}
```

अन्य फ्रेमवर्क्स का उपयोग करके ऐसा कैसे करें, इसकी अधिक जानकारी के लिए [timeouts](timeouts) देखें।

डिबगिंग के बाद टेस्ट्स को आगे बढ़ाने के लिए, शेल में `^C` शॉर्टकट या `.exit` कमांड का उपयोग करें।

### कोडिंग एजेंट के लिए रोकें (`--debug=agent`)

`wdio run --debug=agent` फ्रेमवर्क टाइमआउट को 24 घंटे तक बढ़ा देता है और जब कोई स्पेक `await browser.debug()` को कॉल करता है या कोई टेस्ट विफल होता है, तो वर्कर को रोक देता है। रन इस तरह की एक पंक्ति प्रिंट करता है:

```text
Paused in cart.e2e.ts › adds a blue t-shirt. Inspect with `wdio session -s debug-0-0 snapshot`, continue with `wdio session -s debug-0-0 resume`.
```

रुके हुए ब्राउज़र का [`wdio session`](/docs/session/debug) (`snapshot`, `exec`, …) के साथ निरीक्षण करें, फिर जारी रखने के लिए `wdio session -s debug-0-0 resume` चलाएँ। `wdio session -s debug-0-0 close` रुके हुए टेस्ट को `Session closed from wdio session` के साथ विफल कर देता है। सेशन का नाम `debug-<cid>` होता है (पहले वर्कर के लिए `debug-0-0`)। इस वर्कफ़्लो का बाकी हिस्सा [WebdriverIO Session](/docs/session) अनुभाग में है।
## डायनामिक कॉन्फ़िगरेशन

ध्यान दें कि `wdio.conf.js` में Javascript हो सकता है। चूँकि आप संभवतः अपने टाइमआउट मान को स्थायी रूप से 1 दिन पर नहीं बदलना चाहेंगे, इसलिए एनवायरनमेंट वेरिएबल का उपयोग करके कमांड लाइन से इन सेटिंग्स को बदलना अक्सर सहायक हो सकता है।

इस तकनीक का उपयोग करके, आप कॉन्फ़िगरेशन को डायनामिक रूप से बदल सकते हैं:

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

फिर आप `wdio` कमांड से पहले `debug` फ़्लैग लगा सकते हैं:

```
$ DEBUG=true npx wdio wdio.conf.js --spec ./tests/e2e/myspec.test.js
```

...और DevTools के साथ अपनी स्पेक फ़ाइल को डिबग करें!

## Visual Studio Code (VSCode) के साथ डिबगिंग

यदि आप नवीनतम VSCode में ब्रेकपॉइंट्स के साथ अपने टेस्ट्स को डिबग करना चाहते हैं, तो डिबगर शुरू करने के लिए आपके पास दो विकल्प हैं, जिनमें से विकल्प 1 सबसे आसान तरीका है:
 1. डिबगर को स्वचालित रूप से अटैच करना
 2. कॉन्फ़िगरेशन फ़ाइल का उपयोग करके डिबगर को अटैच करना

### VSCode Toggle Auto Attach

आप VSCode में इन चरणों का पालन करके डिबगर को स्वचालित रूप से अटैच कर सकते हैं:
 - CMD + Shift + P (Linux और Macos) या CTRL + Shift + P (Windows) दबाएँ
 - इनपुट फ़ील्ड में "attach" टाइप करें
 - "Debug: Toggle Auto Attach" चुनें
 - "Only With Flag" चुनें

 बस इतना ही! अब जब आप अपने टेस्ट्स चलाएँगे (याद रखें कि आपको अपने कॉन्फ़िग में --inspect फ़्लैग सेट करने की आवश्यकता होगी, जैसा कि पहले दिखाया गया है), तो यह स्वचालित रूप से डिबगर शुरू कर देगा और पहुँचने वाले पहले ब्रेकपॉइंट पर रुक जाएगा।

### VSCode कॉन्फ़िगरेशन फ़ाइल

सभी या चयनित स्पेक फ़ाइल(लों) को चलाना संभव है। डिबग कॉन्फ़िगरेशन(न्स) को `.vscode/launch.json` में जोड़ना होगा, चयनित स्पेक को डिबग करने के लिए निम्नलिखित कॉन्फ़िग जोड़ें:
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

सभी स्पेक फ़ाइलें चलाने के लिए `"args"` से `"--spec", "${file}"` हटा दें

उदाहरण: [.vscode/launch.json](https://github.com/mgrybyk/webdriverio-devtools/blob/master/.vscode/launch.json)

अतिरिक्त जानकारी: https://code.visualstudio.com/docs/nodejs/nodejs-debugging

## Atom के साथ डायनामिक Repl

यदि आप [Atom](https://atom.io/) हैकर हैं, तो आप [@kurtharriger](https://github.com/kurtharriger) द्वारा बनाया गया [`wdio-repl`](https://github.com/kurtharriger/wdio-repl) आज़मा सकते हैं, जो एक डायनामिक repl है जो आपको Atom में कोड की एकल पंक्तियाँ निष्पादित करने की अनुमति देता है। डेमो देखने के लिए [यह](https://www.youtube.com/watch?v=kdM05ChhLQE) YouTube वीडियो देखें।

## WebStorm / Intellij के साथ डिबगिंग
आप इस तरह एक node.js डिबग कॉन्फ़िगरेशन बना सकते हैं:
![Screenshot from 2021-05-29 17-33-33](https://user-images.githubusercontent.com/18728354/120088460-81844c00-c0a5-11eb-916b-50f21c8472a8.png)
कॉन्फ़िगरेशन कैसे बनाएँ, इसके बारे में अधिक जानकारी के लिए यह [YouTube वीडियो](https://www.youtube.com/watch?v=Qcqnmle6Wu8) देखें।

## फ्लेकी टेस्ट्स की डिबगिंग

फ्लेकी टेस्ट्स को डिबग करना वास्तव में कठिन हो सकता है, इसलिए यहाँ कुछ सुझाव दिए गए हैं कि आप अपने CI में मिले फ्लेकी परिणाम को स्थानीय रूप से कैसे पुनः उत्पन्न करने का प्रयास कर सकते हैं।

### नेटवर्क
नेटवर्क से संबंधित फ्लेकीनेस को डिबग करने के लिए [throttleNetwork](https://webdriver.io/docs/api/browser/throttleNetwork) कमांड का उपयोग करें।
```js
await browser.throttleNetwork('Regular3G')
```

### रेंडरिंग गति
डिवाइस की गति से संबंधित फ्लेकीनेस को डिबग करने के लिए [throttleCPU](https://webdriver.io/docs/api/browser/throttleCPU) कमांड का उपयोग करें।
इससे आपके पेज धीमे रेंडर होंगे, जो कई कारणों से हो सकता है, जैसे आपके CI में कई प्रोसेस चलना जो आपके टेस्ट्स को धीमा कर सकते हैं।
```js
await browser.throttleCPU(4)
```

### टेस्ट निष्पादन गति

यदि आपके टेस्ट्स प्रभावित होते हुए नहीं दिखते, तो संभव है कि WebdriverIO फ्रंटएंड फ्रेमवर्क / ब्राउज़र के अपडेट से तेज़ हो। ऐसा सिंक्रोनस एसर्शन्स का उपयोग करते समय होता है, क्योंकि WebdriverIO के पास इन एसर्शन्स को दोबारा आज़माने का कोई मौका नहीं रहता। ऐसे कोड के कुछ उदाहरण जो इसके कारण टूट सकते हैं:
```js
expect(elementList.length).toEqual(7) // एसर्शन के समय सूची शायद भरी न हो
expect(await elem.getText()).toEqual('this button was clicked 3 times') // एसर्शन के समय टेक्स्ट शायद अभी अपडेट न हुआ हो, जिससे त्रुटि होगी ("this button was clicked 2 times" अपेक्षित "this button was clicked 3 times" से मेल नहीं खाता)
expect(await elem.isDisplayed()).toBe(true) // शायद अभी प्रदर्शित न हुआ हो
```
इस समस्या को हल करने के लिए, इसके बजाय एसिंक्रोनस एसर्शन्स का उपयोग किया जाना चाहिए। उपरोक्त उदाहरण इस तरह दिखेंगे:
```js
await expect(elementList).toBeElementsArrayOfSize(7)
await expect(elem).toHaveText('this button was clicked 3 times')
await expect(elem).toBeDisplayed()
```
इन एसर्शन्स का उपयोग करने पर, WebdriverIO स्वचालित रूप से तब तक प्रतीक्षा करेगा जब तक शर्त पूरी न हो जाए। टेक्स्ट का एसर्शन करते समय इसका अर्थ है कि एलिमेंट का अस्तित्व होना चाहिए और टेक्स्ट अपेक्षित मान के बराबर होना चाहिए।
हम इसके बारे में अपनी [Best Practices Guide](https://webdriver.io/docs/bestpractices#use-the-built-in-assertions) में और बात करते हैं।

## परफ़ॉर्मेंस प्रोफाइलिंग

WebdriverIO आपको अपने टेस्ट निष्पादन में बाधाओं या मेमोरी लीक की पहचान करने के लिए अपने टेस्ट्स की परफ़ॉर्मेंस प्रोफाइल कैप्चर करने की अनुमति देता है। यह Node.js की नेटिव प्रोफाइलिंग क्षमताओं का उपयोग करता है।

### CPU प्रोफाइलिंग

CPU प्रोफाइल कैप्चर करने के लिए, आप `--cpu-prof` CLI फ़्लैग का उपयोग कर सकते हैं या अपने कॉन्फ़िगरेशन में `cpuProf: true` सेट कर सकते हैं।

```bash
npx wdio run wdio.conf.js --cpu-prof
```

यह प्रत्येक वर्कर प्रोसेस के लिए `./profiles` डायरेक्टरी (डिफ़ॉल्ट) में एक `.cpuprofile` फ़ाइल जनरेट करेगा। निष्पादन का विश्लेषण करने के लिए आप इस फ़ाइल को **Chrome DevTools > Performance > Load Profile** में लोड कर सकते हैं।

### हीप प्रोफाइलिंग

हीप प्रोफाइल कैप्चर करने के लिए, `--heap-prof` CLI फ़्लैग का उपयोग करें या अपने कॉन्फ़िगरेशन में `heapProf: true` सेट करें।

```bash
npx wdio run wdio.conf.js --heap-prof
```

यह `./profiles` डायरेक्टरी में एक `.heapprofile` फ़ाइल जनरेट करता है (सैंपलिंग हीप प्रोफाइलर का उपयोग करता है)। मेमोरी उपयोग का विश्लेषण करने के लिए आप इसे **Chrome DevTools > Memory > Load** में लोड कर सकते हैं।

### टाइमिंग मेट्रिक्स

जब प्रोफाइलिंग सक्षम होती है, तो WebdriverIO आपके टेस्ट के सेटअप, निष्पादन और टियरडाउन चरणों के लिए टाइमिंग मेट्रिक्स भी स्वचालित रूप से लॉग करता है, जिससे आपको यह समझने में मदद मिलती है कि समय कहाँ खर्च हो रहा है।

```
📊 Performance Metrics:
────────────────────────────────────────
  Setup:     1.25s
  Execution: 3.42s
  Teardown:  0.15s
```