---
id: deleteCookies
title: deleteCookies
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/deleteCookies.ts
---

Delete cookies visible to the current page. By providing a cookie name it
just removes the single cookie or more when multiple names are passed.

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
      <td>Use the filter property to identify and delete specific cookies based on matching criteria.</td>
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

