---
id: getText
title: getText 获取文本
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/getText.ts
---

从DOM元素获取文本内容。请确保您要请求文本的元素[是可交互的](http://www.w3.org/TR/webdriver/#interactable)，
否则您将得到一个空字符串作为返回值。如果元素被禁用或不可见，但您仍然想接收文本内容，
可以使用[getHTML](https://webdriver.io/docs/api/element/getHTML)作为解决方法。

##### 用法

```js
$(selector).getText()
```

##### 示例

```html title="index.html"
<div id="elem">
    Lorem ipsum <strong>dolor</strong> sit amet,<br />
    consetetur sadipscing elitr
</div>
<span style="display: none">I am invisible</span>
```

```js title="getText.js"
it('should demonstrate the getText function', async () => {
    const elem = await $('#elem');
    console.log(await elem.getText());
    // outputs the following:
    // "Lorem ipsum dolor sit amet,consetetur sadipscing elitr"

    const span = await $('span');
    console.log(await span.getText());
    // outputs "" (empty string) since element is not interactable
});
it('get content from table cell', async () => {
    await browser.url('http://the-internet.herokuapp.com/tables');
    const rows = await $$('#table1 tr');
    const columns = await rows[1].$$('td'); // get columns of 2nd row
    console.log(await columns[2].getText()); // get text of 3rd column
});
```

##### 返回值

- **&lt;String&gt;**
            **<code><var>return</var></code>:**  所选元素的内容（所有HTML标签都被移除）