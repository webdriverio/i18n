---
id: getLocation
title: getLocation
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/getLocation.ts
---

Визначення розташування елемента на сторінці. Точка (0, 0) відповідає
верхньому лівому куту сторінки.

##### Використання

```js
$(selector).getLocation(prop)
```

##### Параметри

<table>
  <thead>
    <tr>
      <th>Назва</th><th>Тип</th><th>Деталі</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>prop</var></code></td>
      <td>`string`</td>
      <td>може бути "x" або "y", щоб отримати значення результату безпосередньо для простіших тверджень</td>
    </tr>
  </tbody>
</table>

##### Приклад

```js title="getLocation.js"
it('should demonstrate the getLocation function', async () => {
    await browser.url('http://github.com');
    const logo = await $('.octicon-mark-github')
    const location = await logo.getLocation();
    console.log(location); // outputs: { x: 150, y: 20 }

    const xLocation = await logo.getLocation('x')
    console.log(xLocation); // outputs: 150

    const yLocation = await logo.getLocation('y')
    console.log(yLocation); // outputs: 20
});
```

##### Повертає

- **&lt;Object|Number&gt;**
            **<code><var>return</var></code>:**   Координати X та Y для елемента на сторінці `{x:number, y:number}`