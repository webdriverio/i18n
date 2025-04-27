---
id: setWindowSize
title: setWindowSize
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/setWindowSize.ts
---

Resizes browser window outer size according to provided width and height. Based on your operating
system some browser windows might now allow you so have a smaller width than `500px`. If you want
to mimic the viewport of e.g. an iPhone you should consider using the `setViewport` command.

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
      <td>browser will be resized to provided width</td>
    </tr>
    <tr>
      <td><code><var>height</var></code></td>
      <td>`number`</td>
      <td>browser will be resized to provided height</td>
    </tr>
  </tbody>
</table>

##### Returns

- **&lt;Null|Object&gt;**
            **<code><var>return</var></code>:**  Null for *NO*W3C browser and Object `{x, y, width, height}` for W3C browser    

