---
id: getText
title: دریافت متن
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/getText.ts
---

دریافت محتوای متنی از یک عنصر DOM. اطمینان حاصل کنید که عنصری 
که می‌خواهید متن آن را درخواست کنید [قابل تعامل باشد](http://www.w3.org/TR/webdriver/#interactable)
در غیر این صورت یک رشته خالی به عنوان مقدار بازگشتی دریافت خواهید کرد. اگر عنصر غیرفعال یا غیرقابل 
مشاهده است و شما همچنان می‌خواهید محتوای متنی را دریافت کنید، از [getHTML](https://webdriver.io/docs/api/element/getHTML)
به عنوان یک راه حل جایگزین استفاده کنید.

##### استفاده

```js
$(selector).getText()
```

##### مثال‌ها

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

##### مقادیر برگشتی

- **&lt;String&gt;**
            **<code><var>return</var></code>:** محتوای عنصر انتخاب شده (تمام تگ‌های HTML حذف می‌شوند)