---
id: getWindowSize
title: getWindowSize
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/getWindowSize.ts
---

Gibt die Fenstergröße des Browsers zurück.

##### Verwendung

```js
browser.getWindowSize()
```

##### Beispiel

```js title="getWindowSize.js"
it('should return browser window size', async () => {
    const windowSize = await browser.getWindowSize();
    console.log(windowSize);
    // outputs `{ width: 1280, height: 767 }`
});
```

##### Rückgabewert

- **&lt;Object&gt;**
            **<code><var>return</var></code>:**  `{ x, y, width, height }` für W3C oder `{ width, height }` für nicht-W3C Browser
