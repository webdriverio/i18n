---
id: getText
title: getText
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/getText.ts
---

Obtiene el contenido de texto de un elemento DOM. Asegúrate de que el elemento
del que quieres solicitar el texto [sea interactuable](http://www.w3.org/TR/webdriver/#interactable),
de lo contrario, obtendrás una cadena vacía como valor de retorno. Si el elemento está deshabilitado o no
es visible y aún deseas recibir el contenido de texto, usa [getHTML](https://webdriver.io/docs/api/element/getHTML)
como solución alternativa.

##### Uso

```js
$(selector).getText()
```

##### Ejemplos

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
            **<code><var>return</var></code>:** contenido del elemento seleccionado (todas las etiquetas HTML son eliminadas)