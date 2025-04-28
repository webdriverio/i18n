---
id: getLocation
title: getLocation
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/getLocation.ts
---

Ustal położenie elementu na stronie. Punkt (0, 0) odnosi się do
lewego górnego rogu strony.

##### Użycie

```js
$(selector).getLocation(prop)
```

##### Parametry

<table>
  <thead>
    <tr>
      <th>Nazwa</th><th>Typ</th><th>Szczegóły</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>prop</var></code></td>
      <td>`string`</td>
      <td>może być "x" lub "y", aby bezpośrednio uzyskać wartość wyniku dla łatwiejszych asercji</td>
    </tr>
  </tbody>
</table>

##### Przykład

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

##### Zwraca

- **&lt;Object|Number&gt;**
            **<code><var>return</var></code>:**   Współrzędne X i Y elementu na stronie `{x:number, y:number}`