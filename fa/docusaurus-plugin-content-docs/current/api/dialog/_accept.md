---
id: accept
title: پذیرفتن
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/dialog/accept.ts
---

زمانی که گفتگو پذیرفته شده باشد، برمی‌گردد.

##### استفاده

```js
await dialog.accept(promptText)
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
      <td><code><var>promptText</var></code><br /><span className="label labelWarning">اختیاری</span></td>
      <td>`string`</td>
      <td>متنی برای وارد کردن در پنجره پیام. اگر نوع گفتگو پیام نباشد، هیچ تاثیری ندارد.</td>
    </tr>
  </tbody>
</table>

##### مثال

```js title="dialogAccept.js"
await dialog.accept();
await dialog.accept(promptText);
```