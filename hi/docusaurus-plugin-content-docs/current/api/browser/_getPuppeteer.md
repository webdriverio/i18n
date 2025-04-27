---
id: getPuppeteer
title: getPuppeteer
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/getPuppeteer.ts
---

[Puppeteer Browser इंस्टेंस](https://pptr.dev/#?product=Puppeteer&version=v5.1.0&show=api-class-browser) प्राप्त करें
जिससे Puppeteer के साथ कमांड्स चलाई जा सकें। ध्यान दें कि सभी Puppeteer कमांड्स
डिफ़ॉल्ट रूप से अतुल्यकालिक (asynchronous) हैं, इसलिए सिंक और अतुल्यकालिक
एक्ज़ीक्यूशन के बीच इंटरचेंज करने के लिए, सुनिश्चित करें कि आपके Puppeteer कॉल्स को
`browser.call` कमांड के भीतर रैप किया गया है, जैसा कि उदाहरण में दिखाया गया है।

:::info

ध्यान दें कि Puppeteer का उपयोग करने के लिए Chrome DevTools प्रोटोकॉल के समर्थन की आवश्यकता होती है और उदाहरण के लिए
इसका उपयोग क्लाउड में स्वचालित परीक्षण चलाते समय नहीं किया जा सकता है। Chrome DevTools प्रोटोकॉल डिफ़ॉल्ट रूप से इंस्टॉल नहीं होता है,
इसे इंस्टॉल करने के लिए `npm install puppeteer-core` का उपयोग करें।
[ऑटोमेशन प्रोटोकॉल्स](/docs/automationProtocols) अनुभाग में अधिक जानकारी प्राप्त करें।

:::

:::info

नोट: Puppeteer वर्तमान में [कंपोनेंट टेस्ट](/docs/component-testing) चलाते समय __समर्थित नहीं__ है।

:::

##### उपयोग

```js
browser.getPuppeteer()
```

##### उदाहरण

```js title="getPuppeteer.test.js"
it('should allow me to use Puppeteer', async () => {
    // WebDriver command
    await browser.url('https://webdriver.io')

    const puppeteerBrowser = await browser.getPuppeteer()
    // switch to Puppeteer
    const metrics = await browser.call(async () => {
        const pages = await puppeteerBrowser.pages()
        pages[0].setGeolocation({ latitude: 59.95, longitude: 30.31667 })
        return pages[0].metrics()
    })

    console.log(metrics.LayoutCount) // returns LayoutCount value
})
```

##### रिटर्न्स

- **&lt;PuppeteerBrowser&gt;**
            **<code><var>return</var></code>:**   ब्राउज़र से जुड़ा शुरू किया गया puppeteer इंस्टेंस