---
id: keys
title: المفاتيح
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/keys.ts
---

إرسال سلسلة من ضغطات المفاتيح إلى العنصر "النشط". يمكنك جعل عنصر الإدخال نشطًا بمجرد النقر عليه. لاستخدام أحرف مثل "السهم الأيسر" أو "زر المسافة الخلفية"، قم باستيراد كائن `Key` من حزمة WebdriverIO.

المفاتيح المعدلة مثل `Control` و`Shift` و`Alt` و`Command` ستبقى مضغوطة لذلك تحتاج إلى الضغط عليها مرة أخرى لتحريرها. ومع ذلك، فإن تعديل النقر يتطلب منك استخدام واجهة برمجة تطبيقات الإجراءات في WebDriver من خلال طريقة [performActions](https://webdriver.io/docs/api/webdriver#performactions).

:::info

تختلف مفاتيح التحكم بناءً على نظام التشغيل الذي يعمل عليه المتصفح، على سبيل المثال: MacOS: `Command` و Windows: `Control`.
يوفر WebdriverIO مفتاح تحكم معدل متوافق مع جميع المتصفحات يسمى `Ctrl` (انظر المثال أدناه).

:::

##### الاستخدام

```js
browser.keys(value)
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
      <td><code><var>value</var></code></td>
      <td>`String, String[]`</td>
      <td>سلسلة المفاتيح للكتابة. يجب توفير مصفوفة أو سلسلة نصية.</td>
    </tr>
  </tbody>
</table>

##### مثال

```js reference title="keys.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/355434bdef13d29608d6d5fbfbeaa034c8a2aa74/keys/keys.js#L1-L17
```