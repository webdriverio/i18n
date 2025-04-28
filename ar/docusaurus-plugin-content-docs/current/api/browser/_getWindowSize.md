---
id: getWindowSize
title: الحصول على حجم النافذة
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/getWindowSize.ts
---

يُرجع حجم نافذة المتصفح.

##### الاستخدام

```js
browser.getWindowSize()
```

##### مثال

```js title="getWindowSize.js"
it('should return browser window size', async () => {
    const windowSize = await browser.getWindowSize();
    console.log(windowSize);
    // outputs `{ width: 1280, height: 767 }`
});
```

##### العائد

- **&lt;Object&gt;**
            **<code><var>return</var></code>:**  `{ x, y, width, height }` لـ W3C أو `{ width, height }` للمتصفحات غير W3C    