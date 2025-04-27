---
id: getElement
title: getElement
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/getElement.ts
---

访问 `WebdriverIO.Element` 属性，如元素引用中的 `selector` 或 `elementId`。

##### 用法

```js
$(selector).getElement()
```

##### 示例

```ts title="getElement.ts"
it('should allow me to inspect WebdriverIO.Element properties', async () => {
    const elem = await $('#elem').getElement();
    console.log(elem.selector); // outputs: '#elem'
});
```

##### 返回值

- **&lt;WebdriverIO.Element&gt;**