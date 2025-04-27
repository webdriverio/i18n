---
id: deleteCookies
title: deleteCookies
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/deleteCookies.ts
---

Видалення файлів cookie, видимих на поточній сторінці. Надавши ім'я cookie, 
функція видаляє окремий cookie або декілька, коли передано кілька імен.

##### Usage

```js
browser.deleteCookies(filter)
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
      <td><code><var>filter</var></code></td>
      <td>`StorageCookieFilter[]`</td>
      <td>Використовуйте властивість фільтра для ідентифікації та видалення конкретних файлів cookie на основі критеріїв відповідності.</td>
    </tr>
  </tbody>
</table>

##### Examples

```js reference title="example.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/deleteCookies/example.js#L9-L29
```

```js reference title="example.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/deleteCookies/example.js#L31-L35
```