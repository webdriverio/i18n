---
id: getWindowSize
title: 获取窗口尺寸
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/getWindowSize.ts
---

返回浏览器窗口大小。

##### 用法

```js
browser.getWindowSize()
```

##### 示例

```js title="getWindowSize.js"
it('should return browser window size', async () => {
    const windowSize = await browser.getWindowSize();
    console.log(windowSize);
    // outputs `{ width: 1280, height: 767 }`
});
```

##### 返回值

- **&lt;Object&gt;**
            **<code><var>return</var></code>:**  对于W3C浏览器返回 `{ x, y, width, height }`，对于非W3C浏览器返回 `{ width, height }`