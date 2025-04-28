---
id: deleteCookies
title: deleteCookies
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/deleteCookies.ts
---

現在のページで表示されているクッキーを削除します。クッキー名を指定すると、
その単一のクッキーのみを削除するか、複数の名前が渡された場合はより多くのクッキーを削除します。

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
      <td>フィルタープロパティを使用して、一致する条件に基づいて特定のクッキーを識別して削除します。</td>
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