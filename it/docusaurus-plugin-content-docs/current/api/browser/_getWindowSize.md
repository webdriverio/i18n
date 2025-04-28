---
id: getWindowSize
title: getWindowSize
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/getWindowSize.ts
---

Restituisce la dimensione della finestra del browser.

##### Utilizzo

```js
browser.getWindowSize()
```

##### Esempio

```js title="getWindowSize.js"
it('should return browser window size', async () => {
    const windowSize = await browser.getWindowSize();
    console.log(windowSize);
    // outputs `{ width: 1280, height: 767 }`
});
```

##### Restituisce

- **&lt;Object&gt;**
            **<code><var>return</var></code>:**  `{ x, y, width, height }` per browser W3C o `{ width, height }` per browser non W3C