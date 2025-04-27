---
id: getElements
title: getElements
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/getElements.ts
---

从元素引用中访问 `WebdriverIO.ElementArray` 属性，如 `length` 或 `selector`。

##### 用法

```js
$(selector).getElements()
```

##### 示例

```ts title="getElements.ts"
it('should allow me to inspect WebdriverIO.Element properties', async () => {
    const divs = await $$('div').getElements();
    console.log(divs.length); // outputs: 43
});
```

##### 返回

- **&lt;WebdriverIO.ElementArray&gt;**
    