---
id: isEqual
title: isEqual
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/isEqual.ts
---

Retourne vrai si l'élément sélectionné correspond à celui fourni.

##### Usage

```js
$(selector).isEqual(el)
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
      <td><code><var>el</var></code></td>
      <td>`Element`</td>
      <td>élément à comparer</td>
    </tr>
  </tbody>
</table>

##### Example

```js title="isEqual.js"
it('should detect if an element is clickable', async () => {
    const el = await $('#el')
    const sameEl = await $('#el')
    const anotherEl = await $('#anotherEl')

    el.isEqual(sameEl) // outputs: true

    el.isEqual(anotherEl) // outputs: false
});
```

##### Returns

- **&lt;Boolean&gt;**
            **<code><var>return</var></code>:**    vrai si les éléments sont égaux