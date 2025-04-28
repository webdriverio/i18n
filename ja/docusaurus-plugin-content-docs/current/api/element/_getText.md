---
id: getText
title: getText
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/getText.ts
---

DOM要素からテキストコンテンツを取得します。テキストを取得したい要素が[操作可能](http://www.w3.org/TR/webdriver/#interactable)であることを確認してください。そうでない場合は、戻り値として空の文字列が返されます。要素が無効化されているか表示されていない場合でも、テキストコンテンツを受け取りたい場合は、回避策として[getHTML](https://webdriver.io/docs/api/element/getHTML)を使用してください。

##### Usage

```js
$(selector).getText()
```

##### Examples

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

##### Returns

- **&lt;String&gt;**
            **<code><var>return</var></code>:**  選択した要素のコンテンツ（すべてのHTMLタグは削除されます）