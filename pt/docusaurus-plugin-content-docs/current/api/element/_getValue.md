---
id: getValue
title: getValue
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/getValue.ts
---

Obtenha o valor de um `<textarea>`, `<select>` ou `<input>` de texto encontrado pelo seletor fornecido.
Se vários elementos forem encontrados através do seletor fornecido, um array de valores é retornado.
Para inputs do tipo checkbox ou radio, use isSelected.

##### Uso

```js
$(selector).getValue()
```

##### Exemplos

```html title="index.html"
<input type="text" value="John Doe" id="username">
```

```js title="getValue.js"
it('should demonstrate the getValue command', async () => {
    const inputUser = await $('#username');
    const value = await inputUser.getValue();
    console.log(value); // outputs: "John Doe"
});
```

##### Retorna

- **&lt;String&gt;**
            **<code><var>return</var></code>:**   valor do(s) elemento(s) solicitado(s)