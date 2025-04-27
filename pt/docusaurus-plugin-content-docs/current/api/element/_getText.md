---
id: getText
title: getText
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/getText.ts
---

Obtenha o conteúdo de texto de um elemento DOM. Certifique-se de que o elemento
do qual você deseja solicitar o texto [seja interativo](http://www.w3.org/TR/webdriver/#interactable),
caso contrário, você receberá uma string vazia como valor de retorno. Se o elemento estiver desativado ou não
visível e você ainda quiser receber o conteúdo de texto, use [getHTML](https://webdriver.io/docs/api/element/getHTML)
como uma solução alternativa.

##### Uso

```js
$(selector).getText()
```

##### Exemplos

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

##### Retorna

- **&lt;String&gt;**
            **<code><var>return</var></code>:**  conteúdo do elemento selecionado (todas as tags HTML são removidas)