---
id: isFocused
title: isFocused
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/isFocused.ts
---

बताएं कि चयनित DOM-एलिमेंट में वर्तमान में फोकस है या नहीं। यदि सेलेक्टर कई एलिमेंट्स से मेल खाता है, तो यह true देगा यदि एलिमेंट्स में से एक में फोकस है।

##### उपयोग

```js
$(selector).isFocused()
```

##### उदाहरण

```html title="index.html"
<input name="login" autofocus="" />
```

```js title="hasFocus.js"
it('should detect the focus of an element', async () => {
    await browser.url('/');
    const loginInput = await $('[name="login"]');
    console.log(await loginInput.isFocused()); // outputs: false

    await loginInput.click();
    console.log(await loginInput.isFocused()); // outputs: true
})
```

##### रिटर्न्स

- **&lt;Boolean&gt;**
            **<code><var>return</var></code>:**          true यदि मेल खाने वाले एलिमेंट्स में से एक में फोकस है