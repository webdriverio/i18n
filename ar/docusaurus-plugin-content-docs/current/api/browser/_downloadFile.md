---
id: downloadFile
title: تنزيل الملف
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/downloadFile.ts
---

قم بتنزيل ملف من الكمبيوتر البعيد الذي يشغل عقدة Selenium إلى نظام الملفات المحلي
باستخدام أمر [`downloadFile`](https://webdriver.io/docs/api/selenium#downloadFile).

:::info
لاحظ أن هذا الأمر مدعوم فقط إذا كنت تستخدم
[Selenium Grid](https://www.selenium.dev/documentation/en/grid/) مع Chrome أو Edge أو Firefox
ولديك علامة `se:downloadsEnabled` محددة في الإمكانيات.
:::

##### الاستخدام

```js
browser.downloadFile(fileName, targetDirectory)
```

##### المعلمات

<table>
  <thead>
    <tr>
      <th>الاسم</th><th>النوع</th><th>التفاصيل</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>fileName</var></code></td>
      <td>`string`</td>
      <td>المسار البعيد للملف</td>
    </tr>
    <tr>
      <td><code><var>targetDirectory</var></code></td>
      <td>`string`</td>
      <td>موقع الهدف على الكمبيوتر المحلي</td>
    </tr>
  </tbody>
</table>