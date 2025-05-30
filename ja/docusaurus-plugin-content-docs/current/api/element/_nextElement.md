---
id: nextElement
title: 次の要素
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/nextElement.ts
---

選択されたDOM要素の次の兄弟要素を返します。

##### 使用方法

```js
$(selector).nextElement()
```

##### 例

```html title="index.html"
<div class="parent">
    <p>Sibling One</p>
    <p>Sibling Two</p>
    <p>Sibling Three</p>
</div>
```

```js title="nextElement.js"
it('should get text from next sibling element', async () => {
    const elem = await $$('p');
    const nextElement = await elem[1].nextElement()
    console.log(await nextElement.getText()); // outputs: "Sibling Three"
});
```

##### 戻り値

- **&lt;WebdriverIO.Element&gt;**