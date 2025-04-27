---
id: getValue
title: getValue
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/getValue.ts
---

Holt den Wert eines `<textarea>`, `<select>` oder Text `<input>` Elements, das durch den angegebenen Selektor gefunden wurde.
Wenn mehrere Elemente über den angegebenen Selektor gefunden werden, wird stattdessen ein Array von Werten zurückgegeben.
Für Eingabefelder mit Checkbox oder Radio-Typ verwenden Sie isSelected.

##### Verwendung

```js
$(selector).getValue()
```

##### Beispiele

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

##### Rückgabewert

- **&lt;String&gt;**
            **<code><var>return</var></code>:**   Wert des/der angeforderten Elements/Elemente