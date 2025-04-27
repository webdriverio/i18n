---
id: getValue
title: getValue
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/getValue.ts
---

Получение значения `<textarea>`, `<select>` или текстового `<input>`, найденного по заданному селектору.
Если по указанному селектору найдено несколько элементов, вместо этого возвращается массив значений.
Для инпутов с типом checkbox или radio используйте isSelected.

##### Использование

```js
$(selector).getValue()
```

##### Примеры

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

##### Возвращает

- **&lt;String&gt;**
            **<code><var>return</var></code>:**   значение запрошенного элемента(ов)