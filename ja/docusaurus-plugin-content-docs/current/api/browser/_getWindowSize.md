---
id: getWindowSize
title: getWindowSize
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/getWindowSize.ts
---

ブラウザウィンドウのサイズを返します。

##### 使用法

```js
browser.getWindowSize()
```

##### 例

```js title="getWindowSize.js"
it('should return browser window size', async () => {
    const windowSize = await browser.getWindowSize();
    console.log(windowSize);
    // outputs `{ width: 1280, height: 767 }`
});
```

##### 戻り値

- **&lt;Object&gt;**
            **<code><var>return</var></code>:**  W3C対応ブラウザでは `{ x, y, width, height }`、非W3Cブラウザでは `{ width, height }`    