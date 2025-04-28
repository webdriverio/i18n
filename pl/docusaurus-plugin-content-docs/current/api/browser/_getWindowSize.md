---
id: getWindowSize
title: getWindowSize
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/getWindowSize.ts
---

Zwraca rozmiar okna przeglądarki.

##### Użycie

```js
browser.getWindowSize()
```

##### Przykład

```js title="getWindowSize.js"
it('should return browser window size', async () => {
    const windowSize = await browser.getWindowSize();
    console.log(windowSize);
    // outputs `{ width: 1280, height: 767 }`
});
```

##### Zwraca

- **&lt;Object&gt;**
            **<code><var>return</var></code>:**  `{ x, y, width, height }` dla przeglądarek W3C lub `{ width, height }` dla przeglądarek nie-W3C