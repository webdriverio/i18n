---
id: isEqual
title: isEqual
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/isEqual.ts
---

Gibt true zurück, wenn das ausgewählte Element mit dem bereitgestellten Element übereinstimmt.

##### Verwendung

```js
$(selector).isEqual(el)
```

##### Parameter

<table>
  <thead>
    <tr>
      <th>Name</th><th>Type</th><th>Details</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>el</var></code></td>
      <td>`Element`</td>
      <td>Element zum Vergleichen</td>
    </tr>
  </tbody>
</table>

##### Beispiel

```js title="isEqual.js"
it('should detect if an element is clickable', async () => {
    const el = await $('#el')
    const sameEl = await $('#el')
    const anotherEl = await $('#anotherEl')

    el.isEqual(sameEl) // outputs: true

    el.isEqual(anotherEl) // outputs: false
});
```

##### Rückgabewert

- **&lt;Boolean&gt;**
            **<code><var>return</var></code>:**    true wenn Elemente gleich sind