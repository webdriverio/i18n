---
id: getLocation
title: getLocation
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/getLocation.ts
---

Определить расположение элемента на странице. Точка (0, 0) соответствует
верхнему левому углу страницы.

##### Usage

```js
$(selector).getLocation(prop)
```

##### Parameters

<table>
  <thead>
    <tr>
      <th>Name</th><th>Type</th><th>Details</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>prop</var></code></td>
      <td>`string`</td>
      <td>может быть "x" или "y" для получения значения результата напрямую для более легких утверждений</td>
    </tr>
  </tbody>
</table>

##### Example

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

##### Returns

- **&lt;Object|Number&gt;**
            **<code><var>return</var></code>:**   Координаты X и Y для элемента на странице `{x:number, y:number}`