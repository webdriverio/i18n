---
id: setWindowSize
title: setWindowSize
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/setWindowSize.ts
---

Ändrar webbläsarfönstrets yttre storlek enligt angiven bredd och höjd. Beroende på ditt operativsystem 
kan vissa webbläsarfönster inte tillåta en mindre bredd än `500px`. Om du vill efterlikna visningsporten 
för t.ex. en iPhone bör du överväga att använda kommandot `setViewport`.

##### Användning

```js
browser.setWindowSize(width, height)
```

##### Parametrar

<table>
  <thead>
    <tr>
      <th>Namn</th><th>Typ</th><th>Detaljer</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>width</var></code></td>
      <td>`number`</td>
      <td>webbläsaren kommer att storleksändras till angiven bredd</td>
    </tr>
    <tr>
      <td><code><var>height</var></code></td>
      <td>`number`</td>
      <td>webbläsaren kommer att storleksändras till angiven höjd</td>
    </tr>
  </tbody>
</table>

##### Returnerar

- **&lt;Null|Object&gt;**
            **<code><var>return</var></code>:** Null för *NO*W3C-webbläsare och Object `{x, y, width, height}` för W3C-webbläsare