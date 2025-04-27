---
id: getWindowSize
title: getWindowSize
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/getWindowSize.ts
---

Renvoie la taille de la fenêtre du navigateur.

##### Usage

```js
browser.getWindowSize()
```

##### Example

```js title="getWindowSize.js"
it('should return browser window size', async () => {
    const windowSize = await browser.getWindowSize();
    console.log(windowSize);
    // outputs `{ width: 1280, height: 767 }`
});
```

##### Returns

- **&lt;Object&gt;**
            **<code><var>return</var></code>:**  `{ x, y, width, height }` pour W3C ou `{ width, height }` pour les navigateurs non W3C