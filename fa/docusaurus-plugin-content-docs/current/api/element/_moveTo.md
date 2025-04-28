---
id: moveTo
title: انتقال به
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/moveTo.ts
---

ماوس را با آفستی از عنصر مشخص شده حرکت دهید. اگر هیچ عنصری مشخص نشده باشد،
حرکت نسبت به مکان فعلی نشانگر ماوس خواهد بود. اگر یک عنصر ارائه شده اما
هیچ آفستی مشخص نشده باشد، ماوس به مرکز عنصر منتقل می‌شود. اگر عنصر
قابل مشاهده نیست، به حالت قابل مشاهده اسکرول خواهد شد.

##### استفاده

```js
$(selector).moveTo({ xOffset, yOffset })
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
      <td><code><var>options</var></code><br /><span className="label labelWarning">اختیاری</span></td>
      <td>`MoveToOptions`</td>
      <td>گزینه‌های دستور moveTo</td>
    </tr>
    <tr>
      <td><code><var>options.xOffset</var></code><br /><span className="label labelWarning">اختیاری</span></td>
      <td>`Number`</td>
      <td>آفست X برای حرکت، نسبت به مرکز عنصر. اگر مشخص نشده باشد، ماوس به مرکز عنصر حرکت خواهد کرد.</td>
    </tr>
    <tr>
      <td><code><var>options.yOffset</var></code><br /><span className="label labelWarning">اختیاری</span></td>
      <td>`Number`</td>
      <td>آفست Y برای حرکت، نسبت به مرکز عنصر. اگر مشخص نشده باشد، ماوس به مرکز عنصر حرکت خواهد کرد.</td>
    </tr>
  </tbody>
</table>
```