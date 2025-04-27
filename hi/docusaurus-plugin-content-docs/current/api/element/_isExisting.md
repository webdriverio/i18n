---
id: isExisting
title: isExisting (मौजूद है)
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/isExisting.ts
---

यह रिटर्न करता है कि एलिमेंट DOM में मौजूद है या नहीं।

:::info

अन्य एलिमेंट कमांड्स के विपरीत, WebdriverIO इस कमांड को निष्पादित करने के लिए एलिमेंट के मौजूद होने का इंतजार नहीं करेगा।

:::

##### उपयोग

```js
$(selector).isExisting()
```

##### उदाहरण

```html title="index.html"
<div id="notDisplayed" style="display: none"></div>
<div id="notVisible" style="visibility: hidden"></div>
<div id="notInViewport" style="position:absolute; left: 9999999"></div>
<div id="zeroOpacity" style="opacity: 0"></div>
```

```js title="isExisting.js"
it('should detect if elements are existing', async () => {
    let elem = await $('#someRandomNonExistingElement')
    let isExisting = await elem.isExisting()
    console.log(isExisting); // outputs: false

    elem = await $('#notDisplayed')
    isExisting = await elem.isExisting()
    console.log(isExisting); // outputs: true

    elem = await $('#notVisible')
    isExisting = await elem.isExisting()
    console.log(isExisting); // outputs: true

    elem = await $('#notInViewport')
    isExisting = await elem.isExisting()
    console.log(isExisting); // outputs: true

    elem = await $('#zeroOpacity')
    isExisting = await elem.isExisting()
    console.log(isExisting); // outputs: true
});
```

##### रिटर्न

- **&lt;Boolean&gt;**
            **<code><var>return</var></code>:**             यदि एलिमेंट(एलिमेंट्स) मौजूद [है|हैं] तो true