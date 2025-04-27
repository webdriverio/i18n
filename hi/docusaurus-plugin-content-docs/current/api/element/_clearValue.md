---
id: clearValue
title: मान साफ़ करें
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/clearValue.ts
---

इनपुट या टेक्स्टएरिया तत्व का मान साफ़ करें। इस कमांड का उपयोग करने से पहले सुनिश्चित करें कि आप तत्व के साथ इंटरैक्ट कर सकते हैं। आप एक इनपुट तत्व को साफ़ नहीं कर सकते जो अक्षम है या केवल पढ़ने वाली मोड में है।

##### उपयोग

```js
$(selector).clearValue()
```

##### उदाहरण

```js title="clearValue.js"
it('should demonstrate the clearValue command', async () => {
    const elem = await $('.input')
    await elem.setValue('test123')

    const value = await elem.getValue()
    console.log(value) // returns 'test123'

    await elem.clearValue()
    value = await elem.getValue()
    assert(value === ''); // true
})
```