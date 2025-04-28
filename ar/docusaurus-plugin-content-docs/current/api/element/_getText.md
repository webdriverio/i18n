---
id: getText
title: الحصول على النص
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/getText.ts
---

الحصول على محتوى النص من عنصر DOM. تأكد من أن العنصر 
الذي تريد طلب النص منه [قابل للتفاعل](http://www.w3.org/TR/webdriver/#interactable)
وإلا ستحصل على سلسلة فارغة كقيمة إرجاع. إذا كان العنصر معطلًا أو غير
مرئي وما زلت ترغب في تلقي محتوى النص استخدم [getHTML](https://webdriver.io/docs/api/element/getHTML)
كحل بديل.

##### الاستخدام

```js
$(selector).getText()
```

##### أمثلة

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

##### الإرجاع

- **&lt;String&gt;**
            **<code><var>return</var></code>:**  محتوى العنصر المحدد (تتم إزالة جميع علامات HTML)