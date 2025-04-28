---
id: isEqual
title: isEqual
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/isEqual.ts
---

Zwraca true, jeśli wybrany element zgadza się z dostarczonym elementem.

##### Użycie

```js
$(selector).isEqual(el)
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
      <td><code><var>el</var></code></td>
      <td>`Element`</td>
      <td>element do porównania</td>
    </tr>
  </tbody>
</table>

##### Przykład

```js title="isEqual.js"
it('should detect if an element is clickable', async () => {
    const el = await $('#el')
    const sameEl = await $('#el')
    const anotherEl = await $('#anotherEl')

    el.isEqual(sameEl) // outputs: true

    el.isEqual(anotherEl) // outputs: false
});
```

##### Zwraca

- **&lt;Boolean&gt;**
            **<code><var>return</var></code>:**    true jeśli elementy są równe