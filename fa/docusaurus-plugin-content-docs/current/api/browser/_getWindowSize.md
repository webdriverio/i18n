---
id: getWindowSize
title: دریافت اندازه پنجره
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/getWindowSize.ts
---

اندازه پنجره مرورگر را برمی‌گرداند.

##### استفاده

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

##### مقادیر بازگشتی

- **&lt;Object&gt;**
            **<code><var>return</var></code>:**  `{ x, y, width, height }` برای مرورگرهای W3C یا `{ width, height }` برای مرورگرهای غیر W3C