---
id: getWindowSize
title: getWindowSize
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/getWindowSize.ts
---

Возвращает размер окна браузера.

##### Использование

```js
browser.getWindowSize()
```

##### Пример

```js title="getWindowSize.js"
it('should return browser window size', async () => {
    const windowSize = await browser.getWindowSize();
    console.log(windowSize);
    // outputs `{ width: 1280, height: 767 }`
});
```

##### Возвращает

- **&lt;Object&gt;**
            **<code><var>return</var></code>:**  `{ x, y, width, height }` для W3C или `{ width, height }` для не W3C браузеров