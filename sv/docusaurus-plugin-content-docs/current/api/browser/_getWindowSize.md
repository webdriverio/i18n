---
id: getWindowSize
title: getWindowSize
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/getWindowSize.ts
---

Returnerar webbläsarens fönsterstorlek.

##### Användning

```js
browser.getWindowSize()
```

##### Exempel

```js title="getWindowSize.js"
it('should return browser window size', async () => {
    const windowSize = await browser.getWindowSize();
    console.log(windowSize);
    // outputs `{ width: 1280, height: 767 }`
});
```

##### Returnerar

- **&lt;Object&gt;**
            **<code><var>return</var></code>:**  `{ x, y, width, height }` för W3C eller `{ width, height }` för icke-W3C webbläsare