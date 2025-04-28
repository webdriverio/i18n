---
id: getTagName
title: getTagName
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/getTagName.ts
---

DOM要素のタグ名を取得します。

##### 使用方法

```js
$(selector).getTagName()
```

##### 例

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

##### 戻り値

- **&lt;String&gt;**
            **<code><var>return</var></code>:** 要素のタグ名（小文字の文字列として）