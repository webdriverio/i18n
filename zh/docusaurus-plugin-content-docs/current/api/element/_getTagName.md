---
id: getTagName
title: 获取标签名称
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/getTagName.ts
---

获取DOM元素的标签名称。

##### 用法

```js
$(selector).getTagName()
```

##### 示例

```html title="index.html"
<div id="elem">Lorem ipsum</div>

```

```js title="getTagName.js"
it('should demonstrate the getTagName command', async () => {
    const elem = await $('#elem');

    const tagName = await elem.getTagName();
    console.log(tagName); // outputs: "div"
})
```

##### 返回值

- **&lt;String&gt;**
            **<code><var>return</var></code>:** 元素的标签名称，以小写字符串形式返回