---
id: isClickable
title: isClickable
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/isClickable.ts
---

当满足以下条件时，一个元素被认为是可点击的：

- 元素存在
- 元素是可见的
- 元素未被禁用
- 元素在视口内
- 元素可以被滚动到视口内
- 元素的中心未被其他元素覆盖

否则返回 false。

:::info

请注意，`isClickable` 只在网页浏览器和移动端的网页视图中有效，
在移动应用原生环境中不起作用。另外，与其他元素命令不同，
WebdriverIO 在执行此命令时不会等待元素存在。

:::

##### 用法

```js
$(selector).isClickable()
```

##### 示例

```js title="isClickable.js"
it('should detect if an element is clickable', async () => {
    const el = await $('#el')
    let clickable = await el.isClickable();
    console.log(clickable); // outputs: true or false

    // wait for element to be clickable
    await browser.waitUntil(() => el.isClickable())
});
```

##### 返回值

- **&lt;Boolean&gt;**
            **<code><var>return</var></code>:**             如果元素可点击则为 true