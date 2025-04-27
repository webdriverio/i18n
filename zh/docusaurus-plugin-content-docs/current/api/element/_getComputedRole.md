---
id: getComputedRole
title: 获取计算角色
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/getComputedRole.ts
---

获取元素的计算WAI-ARIA标签。

##### 用法

```js
$(selector).getComputedRole()
```

##### 示例

```js title="getComputedRole.js"
it('should demonstrate the getComputedRole command', async () => {
    await browser.url('https://www.google.com/ncr')
    const elem = await $('*[name="q"]');
    console.log(await elem.getComputedRole()); // outputs: "combobox"
})
```

##### 返回值

- **&lt;String&gt;**
            **<code><var>return</var></code>:**  计算的WAI-ARIA标签