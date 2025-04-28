---
id: getText
title: getText
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/getText.ts
---

Ottieni il contenuto testuale da un elemento DOM. Assicurati che l'elemento
da cui vuoi richiedere il testo [sia interagibile](http://www.w3.org/TR/webdriver/#interactable)
altrimenti otterrai una stringa vuota come valore di ritorno. Se l'elemento è disabilitato o non
visibile e vuoi comunque ricevere il contenuto testuale, usa [getHTML](https://webdriver.io/docs/api/element/getHTML)
come soluzione alternativa.

##### Utilizzo

```js
$(selector).getText()
```

##### Esempi

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

##### Restituisce

- **&lt;String&gt;**
            **<code><var>return</var></code>:** contenuto dell'elemento selezionato (tutti i tag HTML vengono rimossi)