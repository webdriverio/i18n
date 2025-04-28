---
id: setWindowSize
title: setWindowSize
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/setWindowSize.ts
---

Ändrar webbläsarens yttre fönsterstorlek enligt angiven bredd och höjd. Beroende på ditt operativsystem 
kan vissa webbläsarfönster inte tillåta dig att ha en mindre bredd än `500px`. Om du vill 
efterlikna visningsområdet för t.ex. en iPhone bör du överväga att använda kommandot `setViewport`.

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
      <td>webbläsaren kommer att ändra storlek till angiven bredd</td>
    </tr>
    <tr>
      <td><code><var>height</var></code></td>
      <td>`number`</td>
      <td>webbläsaren kommer att ändra storlek till angiven höjd</td>
    </tr>
  </tbody>
</table>

##### Returns

- **&lt;Null|Object&gt;**
            **<code><var>return</var></code>:**  Null för *NO*W3C-webbläsare och Object `{x, y, width, height}` för W3C-webbläsare