---
id: getValue
title: getValue
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/getValue.ts
---

Pobierz wartość elementu `<textarea>`, `<select>` lub tekstowego `<input>` znalezionego za pomocą podanego selektora.
Jeśli zostanie znalezionych wiele elementów za pomocą podanego selektora, zwracana jest tablica wartości.
Dla inputów typu checkbox lub radio użyj isSelected.

##### Użycie

```js
$(selector).getValue()
```

##### Przykłady

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

##### Zwraca

- **&lt;String&gt;**
            **<code><var>return</var></code>:**   wartość żądanego elementu(ów)