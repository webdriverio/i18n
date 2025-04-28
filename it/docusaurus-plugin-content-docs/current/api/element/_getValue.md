---
id: getValue
title: getValue
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/getValue.ts
---

Ottieni il valore di un `<textarea>`, `<select>` o di un `<input>` di testo trovato tramite il selettore specificato.
Se vengono trovati più elementi tramite il selettore specificato, viene restituito un array di valori.
Per input con tipo checkbox o radio, utilizza isSelected.

##### Utilizzo

```js
$(selector).getValue()
```

##### Esempi

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

##### Restituisce

- **&lt;String&gt;**
            **<code><var>return</var></code>:**   valore dell'elemento/i richiesto    