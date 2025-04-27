---
id: getWindowSize
title: विंडो का आकार प्राप्त करें
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/getWindowSize.ts
---

ब्राउज़र विंडो का आकार लौटाता है।

##### उपयोग

```js
browser.getWindowSize()
```

##### उदाहरण

```js title="getWindowSize.js"
it('should return browser window size', async () => {
    const windowSize = await browser.getWindowSize();
    console.log(windowSize);
    // outputs `{ width: 1280, height: 767 }`
});
```

##### रिटर्न्स

- **&lt;Object&gt;**
            **<code><var>return</var></code>:**  W3C के लिए `{ x, y, width, height }` या गैर W3C ब्राउज़र के लिए `{ width, height }`    