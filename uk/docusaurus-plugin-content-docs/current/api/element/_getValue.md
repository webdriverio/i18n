---
id: getValue
title: getValue
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/getValue.ts
---

Отримати значення елемента `<textarea>`, `<select>` або текстового `<input>`, знайденого за вказаним селектором.
Якщо за вказаним селектором знайдено кілька елементів, замість цього повертається масив значень.
Для полів вводу з типом checkbox або radio використовуйте isSelected.

##### Використання

```js
$(selector).getValue()
```

##### Приклади

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

##### Повертає

- **&lt;String&gt;**
            **<code><var>return</var></code>:**   значення запитаного елемента(ів)