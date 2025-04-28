---
id: accept
title: قبول
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/dialog/accept.ts
---

يتم الرجوع عندما يتم قبول الحوار.

##### الاستخدام

```js
await dialog.accept(promptText)
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
      <td><code><var>promptText</var></code><br /><span className="label labelWarning">اختياري</span></td>
      <td>`string`</td>
      <td>نص يتم إدخاله في المطالبة. لا يسبب أي تأثيرات إذا لم يكن نوع الحوار مطالبة.</td>
    </tr>
  </tbody>
</table>

##### مثال

```js title="dialogAccept.js"
await dialog.accept();
await dialog.accept(promptText);
```