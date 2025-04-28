---
id: getElements
title: getElements
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/getElements.ts
---

要素参照から `WebdriverIO.ElementArray` プロパティ（`length` や `selector` など）にアクセスします。

##### 使用法

```js
$(selector).getElements()
```

##### 例

```ts title="getElements.ts"
it('should allow me to inspect WebdriverIO.Element properties', async () => {
    const divs = await $$('div').getElements();
    console.log(divs.length); // outputs: 43
});
```

##### 戻り値

- **&lt;WebdriverIO.ElementArray&gt;**
    