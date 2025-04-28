---
id: downloadFile
title: دانلود فایل
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/downloadFile.ts
---

دانلود یک فایل از کامپیوتر راه دور که سلنیوم روی آن اجرا می‌شود به سیستم فایل محلی
با استفاده از دستور [`downloadFile`](https://webdriver.io/docs/api/selenium#downloadFile).

:::info
توجه داشته باشید که این دستور فقط زمانی پشتیبانی می‌شود که از 
[Selenium Grid](https://www.selenium.dev/documentation/en/grid/) با کروم، اج یا فایرفاکس
استفاده کنید و پرچم `se:downloadsEnabled` را در قابلیت‌ها تنظیم کرده باشید.
:::

##### استفاده

```js
browser.downloadFile(fileName, targetDirectory)
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
      <td><code><var>fileName</var></code></td>
      <td>`string`</td>
      <td>مسیر راه دور به فایل</td>
    </tr>
    <tr>
      <td><code><var>targetDirectory</var></code></td>
      <td>`string`</td>
      <td>مکان هدف در کامپیوتر محلی</td>
    </tr>
  </tbody>
</table>