---
id: getElement
title: getElement
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/getElement.ts
---

要素参照から `WebdriverIO.Element` のプロパティ（`selector` や `elementId` など）にアクセスします。

##### 使用法

```js
$(selector).getElement()
```

##### 例

```ts title="getElement.ts"
it('should allow me to inspect WebdriverIO.Element properties', async () => {
    const elem = await $('#elem').getElement();
    console.log(elem.selector); // outputs: '#elem'
});
```

##### 戻り値

- **&lt;WebdriverIO.Element&gt;**