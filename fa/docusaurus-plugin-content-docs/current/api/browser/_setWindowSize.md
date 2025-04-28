---
id: setWindowSize
title: تنظیم اندازه پنجره
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/setWindowSize.ts
---

تغییر اندازه خارجی پنجره مرورگر بر اساس عرض و ارتفاع ارائه شده. بر اساس سیستم عامل شما، برخی از پنجره‌های مرورگر ممکن است اجازه ندهند عرض کمتر از `500px` داشته باشید. اگر می‌خواهید نمای (viewport) یک دستگاه مثل آیفون را شبیه‌سازی کنید، بهتر است از دستور `setViewport` استفاده کنید.

##### استفاده

```js
browser.setWindowSize(width, height)
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
      <td><code><var>width</var></code></td>
      <td>`number`</td>
      <td>مرورگر به عرض ارائه شده تغییر اندازه می‌دهد</td>
    </tr>
    <tr>
      <td><code><var>height</var></code></td>
      <td>`number`</td>
      <td>مرورگر به ارتفاع ارائه شده تغییر اندازه می‌دهد</td>
    </tr>
  </tbody>
</table>

##### مقادیر بازگشتی

- **&lt;Null|Object&gt;**
            **<code><var>return</var></code>:**  Null برای مرورگرهای غیر W3C و Object با ساختار `{x, y, width, height}` برای مرورگرهای W3C