---
id: deleteCookies
title: deleteCookies
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/deleteCookies.ts
---

Elimina las cookies visibles para la página actual. Al proporcionar un nombre de cookie,
solo elimina la cookie individual o más cuando se pasan múltiples nombres.

##### Uso

```js
browser.deleteCookies(filter)
```

##### Parámetros

<table>
  <thead>
    <tr>
      <th>Nombre</th><th>Tipo</th><th>Detalles</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>filter</var></code></td>
      <td>`StorageCookieFilter[]`</td>
      <td>Utilice la propiedad de filtro para identificar y eliminar cookies específicas según criterios de coincidencia.</td>
    </tr>
  </tbody>
</table>

##### Ejemplos

```js reference title="example.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/deleteCookies/example.js#L9-L29
```

```js reference title="example.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/deleteCookies/example.js#L31-L35
```