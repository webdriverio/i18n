---
id: deleteCookies
title: 删除Cookies
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/deleteCookies.ts
---

删除当前页面可见的cookies。通过提供cookie名称，它可以删除单个cookie，如果传递多个名称则可以删除更多cookie。

##### 用法

```js
browser.deleteCookies(filter)
```

##### 参数

<table>
  <thead>
    <tr>
      <th>名称</th><th>类型</th><th>详情</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>filter</var></code></td>
      <td>`StorageCookieFilter[]`</td>
      <td>使用filter属性基于匹配条件来识别和删除特定的cookies。</td>
    </tr>
  </tbody>
</table>

##### 示例

```js reference title="example.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/deleteCookies/example.js#L9-L29
```

```js reference title="example.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/deleteCookies/example.js#L31-L35
```