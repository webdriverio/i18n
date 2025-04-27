---
id: getComputedLabel
title: getComputedLabel
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/getComputedLabel.ts
---

获取元素的计算 WAI-ARIA 标签。

##### 用法

```js
$(selector).getComputedLabel()
```

##### 示例

```js title="getComputedLabel.js"
it('should demonstrate the getComputedLabel command', async () => {
    await browser.url('https://www.google.com/ncr')
    const elem = await $('*[name="q"]');
    console.log(await elem.getComputedLabel()); // outputs: "Search"
})
```

##### 返回值

- **&lt;String&gt;**
            **<code><var>return</var></code>:** 计算得出的 WAI-ARIA 标签