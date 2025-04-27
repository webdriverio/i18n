---
id: getText
title: getText
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/getText.ts
---

Получение текстового содержимого DOM-элемента. Убедитесь, что элемент, 
из которого вы хотите получить текст, [является интерактивным](http://www.w3.org/TR/webdriver/#interactable),
иначе вы получите пустую строку в качестве возвращаемого значения. Если элемент отключен или не
виден, и вы всё равно хотите получить текстовое содержимое, используйте [getHTML](https://webdriver.io/docs/api/element/getHTML)
в качестве обходного решения.

##### Использование

```js
$(selector).getText()
```

##### Примеры

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

##### Возвращает

- **&lt;String&gt;**
            **<code><var>return</var></code>:**  содержимое выбранного элемента (все HTML-теги удаляются)