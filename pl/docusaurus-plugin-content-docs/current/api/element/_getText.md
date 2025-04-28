---
id: getText
title: getText
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/getText.ts
---

Pobierz zawartość tekstową z elementu DOM. Upewnij się, że element,
z którego chcesz pobrać tekst [może wchodzić w interakcje](http://www.w3.org/TR/webdriver/#interactable),
w przeciwnym razie otrzymasz pusty ciąg znaków jako wartość zwrotną. Jeśli element jest wyłączony lub nie
jest widoczny, a nadal chcesz otrzymać zawartość tekstową, użyj [getHTML](https://webdriver.io/docs/api/element/getHTML)
jako obejścia.

##### Użycie

```js
$(selector).getText()
```

##### Przykłady

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

##### Zwraca

- **&lt;String&gt;**
            **<code><var>return</var></code>:**  zawartość wybranego elementu (wszystkie tagi HTML są usuwane)