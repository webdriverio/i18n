---
id: previousElement
title: 前の要素
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/previousElement.ts
---

選択したDOM要素の前の兄弟要素を返します。

##### 使用法

```js
$(selector).previousElement()
```

##### 例

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

##### 戻り値

- **&lt;WebdriverIO.Element&gt;**