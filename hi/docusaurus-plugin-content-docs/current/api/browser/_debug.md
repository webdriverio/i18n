---
id: debug
title: डीबग
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/debug.ts
---

यह कमांड आपको आपके इंटिग्रेशन टेस्ट को डीबग करने में मदद करता है। यह चल रहे ब्राउज़र को रोकता है और आपको समय देता है कि आप उसमें जाकर अपने एप्लिकेशन की स्थिति की जांच करें (जैसे डेव टूल्स का उपयोग करके)।
आपका टर्मिनल एक [REPL](https://en.wikipedia.org/wiki/Read%E2%80%93eval%E2%80%93print_loop) इंटरफेस में बदल जाता है जो आपको कुछ निश्चित कमांड आज़माने, एलिमेंट्स खोजने और उन पर एक्शन टेस्ट करने की अनुमति देगा।

[![WebdriverIO REPL](https://webdriver.io/img/repl.gif)](https://webdriver.io/img/repl.gif)

यदि आप WDIO टेस्टरनर चला रहे हैं तो सुनिश्चित करें कि आप उस टेस्ट फ्रेमवर्क के टाइमआउट प्रॉपर्टी को बढ़ाएं जिसका आप उपयोग कर रहे हैं (जैसे Mocha या Jasmine) ताकि टेस्ट टाइमआउट के कारण टेस्ट समाप्ति को रोका जा सके।
साथ ही एक ही समय में चल रही कई कैपेबिलिटीज़ के साथ कमांड चलाने से बचें।

<iframe width="560" height="315" src="https://www.youtube.com/embed/xWwP-3B_YyE" frameborder="0" allowFullScreen></iframe>

##### उपयोग

```js
browser.debug()
```

##### उदाहरण

```js title="debug.js"
it('should demonstrate the debug command', async () => {
    await $('#input').setValue('FOO')
    await browser.debug() // jumping into the browser and change value of #input to 'BAR'
    const value = await $('#input').getValue()
    console.log(value) // outputs: "BAR"
})
```