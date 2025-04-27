---
id: getWindowSize
title: சாளர அளவைப் பெறுதல்
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/getWindowSize.ts
---

உலாவி சாளரத்தின் அளவை திருப்பி அனுப்புகிறது.

##### பயன்பாடு

```js
browser.getWindowSize()
```

##### உதாரணம்

```js title="getWindowSize.js"
it('should return browser window size', async () => {
    const windowSize = await browser.getWindowSize();
    console.log(windowSize);
    // outputs `{ width: 1280, height: 767 }`
});
```

##### திருப்பி அனுப்புவது

- **&lt;Object&gt;**
            **<code><var>return</var></code>:**  W3C க்கு `{ x, y, width, height }` அல்லது W3C அல்லாத உலாவிக்கு `{ width, height }`