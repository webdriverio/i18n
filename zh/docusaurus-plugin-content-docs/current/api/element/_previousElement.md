---
id: previousElement
title: 上一个元素
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/previousElement.ts
---

返回所选DOM元素的前一个兄弟元素。

##### 用法

```js
$(selector).previousElement()
```

##### 示例

```html title="index.html"
<div class="parent">
    <p>Sibling One</p>
    <p>Sibling Two</p>
    <p>Sibling Three</p>
</div>
```

```js title="previousElement.js"
it('should get text from previous sibling element', async () => {
    const elem = await $$('p');
    const previousElem = await elem[1].previousElement()
    console.log(await previousElem.getText()); // outputs: "Sibling One"
});
```

##### 返回

- **&lt;WebdriverIO.Element&gt;**