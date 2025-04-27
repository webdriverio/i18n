---
id: getValue
title: obtenerValor
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/getValue.ts
description: Obtener el valor de un elemento
---

Obtiene el valor de un `<textarea>`, `<select>` o `<input>` de texto encontrado por el selector dado.
Si se encuentran múltiples elementos a través del selector dado, se devuelve un array de valores en su lugar.
Para inputs con tipo checkbox o radio, use isSelected.

##### Uso

```js
$(selector).getValue()
```

##### Ejemplos

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

##### Devuelve

- **&lt;String&gt;**
            **<code><var>return</var></code>:**   valor del elemento(s) solicitado