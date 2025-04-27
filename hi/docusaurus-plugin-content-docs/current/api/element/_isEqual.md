---
id: isEqual
title: isEqual
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/isEqual.ts
---

चयनित तत्व प्रदान किए गए तत्व से मेल खाता है तो सत्य (true) लौटाता है।

##### उपयोग

```js
$(selector).isEqual(el)
```

##### पैरामीटर्स

<table>
  <thead>
    <tr>
      <th>नाम</th><th>प्रकार</th><th>विवरण</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>el</var></code></td>
      <td>`Element`</td>
      <td>तुलना करने के लिए तत्व</td>
    </tr>
  </tbody>
</table>

##### उदाहरण

```js title="isEqual.js"
it('should detect if an element is clickable', async () => {
    const el = await $('#el')
    const sameEl = await $('#el')
    const anotherEl = await $('#anotherEl')

    el.isEqual(sameEl) // outputs: true

    el.isEqual(anotherEl) // outputs: false
});
```

##### रिटर्न्स

- **&lt;Boolean&gt;**
            **<code><var>return</var></code>:**    तत्व समान होने पर true