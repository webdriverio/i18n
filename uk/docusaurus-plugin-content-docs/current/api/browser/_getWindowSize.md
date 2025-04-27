---
id: getWindowSize
title: Отримання розміру вікна
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/getWindowSize.ts
---

Повертає розмір вікна браузера.

##### Використання

```js
browser.getWindowSize()
```

##### Приклад

```js title="getWindowSize.js"
it('should return browser window size', async () => {
    const windowSize = await browser.getWindowSize();
    console.log(windowSize);
    // outputs `{ width: 1280, height: 767 }`
});
```

##### Повертає

- **&lt;Object&gt;**
            **<code><var>return</var></code>:**  `{ x, y, width, height }` для W3C або `{ width, height }` для браузерів, які не підтримують W3C