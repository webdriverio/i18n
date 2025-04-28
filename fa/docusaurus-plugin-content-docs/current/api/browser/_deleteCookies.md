---
id: deleteCookies
title: حذف کوکی‌ها
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/deleteCookies.ts
---

حذف کوکی‌های قابل مشاهده در صفحه فعلی. با ارائه یک نام کوکی، فقط کوکی مورد نظر را حذف می‌کند یا در صورت ارسال چند نام، چندین کوکی را حذف می‌کند.

##### استفاده

```js
browser.deleteCookies(filter)
```

##### پارامترها

<table>
  <thead>
    <tr>
      <th>نام</th><th>نوع</th><th>جزئیات</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>filter</var></code></td>
      <td>`StorageCookieFilter[]`</td>
      <td>از ویژگی فیلتر برای شناسایی و حذف کوکی‌های خاص بر اساس معیارهای تطبیق استفاده کنید.</td>
    </tr>
  </tbody>
</table>

##### مثال‌ها

```js reference title="example.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/deleteCookies/example.js#L9-L29
```

```js reference title="example.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/deleteCookies/example.js#L31-L35
```