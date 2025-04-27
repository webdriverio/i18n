---
id: setWindowSize
title: setWindowSize
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/setWindowSize.ts
---

Ändert die äußere Größe des Browserfensters entsprechend der angegebenen Breite und Höhe. Abhängig von Ihrem Betriebssystem erlauben einige Browserfenster möglicherweise keine geringere Breite als `500px`. Wenn Sie den Viewport z.B. eines iPhones nachahmen möchten, sollten Sie den Befehl `setViewport` in Betracht ziehen.

##### Usage

```js
browser.setWindowSize(width, height)
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
      <td><code><var>width</var></code></td>
      <td>`number`</td>
      <td>Browser wird auf die angegebene Breite skaliert</td>
    </tr>
    <tr>
      <td><code><var>height</var></code></td>
      <td>`number`</td>
      <td>Browser wird auf die angegebene Höhe skaliert</td>
    </tr>
  </tbody>
</table>

##### Returns

- **&lt;Null|Object&gt;**
            **<code><var>return</var></code>:** Null für *NO*W3C Browser und Objekt `{x, y, width, height}` für W3C Browser
```