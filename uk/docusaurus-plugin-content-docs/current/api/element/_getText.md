---
id: getText
title: getText
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/getText.ts
---

Отримати текстовий вміст DOM-елемента. Переконайтеся, що елемент, 
з якого ви хочете отримати текст, [є інтерактивним](http://www.w3.org/TR/webdriver/#interactable), 
інакше ви отримаєте порожній рядок як значення, що повертається. Якщо елемент відключений або не 
видимий, і ви все ще хочете отримати текстовий вміст, використовуйте [getHTML](https://webdriver.io/docs/api/element/getHTML) 
як обхідний шлях.

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
            **<code><var>return</var></code>:**  вміст вибраного елемента (всі HTML-теги видаляються)