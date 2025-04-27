---
id: restore
title: पुनर्स्थापित करें
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/mock/restore.ts
---

यह वह सब कुछ करता है जो `mock.clear()` करता है, और साथ ही किसी भी मॉक किए गए रिटर्न वैल्यू या कार्यान्वयन को हटा देता है।
पुनर्स्थापित मॉक इवेंट्स नहीं भेजता है और प्रतिक्रियाओं को मॉक नहीं कर सकता है।

##### उपयोग

```js
mock.restore()
```

##### उदाहरण

```js title="addValue.js"
it('should demonstrate the addValue command', async () => {
    const mock = await browser.mock('**\/googlelogo_color_272x92dp.png')
    mock.respond('https://webdriver.io/img/webdriverio.png')
    await browser.url('https://google.com') // shows WebdriverIO logo instead of Google

    await mock.restore()
    await browser.url('https://google.com') // shows normal Google logo again
})
```