---
id: keys
title: المفاتيح
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/keys.ts
---

إرسال سلسلة من ضغطات المفاتيح إلى العنصر "النشط". يمكنك جعل عنصر الإدخال نشطًا عن طريق النقر عليه. لاستخدام الأحرف مثل "السهم الأيسر" أو "مفتاح الرجوع"، قم باستيراد كائن `Key` من حزمة WebdriverIO.

ستظل مفاتيح التعديل مثل `Control` و`Shift` و`Alt` و`Command` مضغوطة، لذا تحتاج إلى الضغط عليها مرة أخرى لتحريرها. ومع ذلك، يتطلب تعديل النقر استخدام واجهة برمجة تطبيقات WebDriver Actions من خلال طريقة [performActions](https://webdriver.io/docs/api/webdriver#performactions).

:::info

تختلف مفاتيح التحكم حسب نظام التشغيل الذي يعمل عليه المتصفح، على سبيل المثال MacOS: `Command` و Windows: `Control`.
توفر WebdriverIO مفتاح تحكم متوافق مع مختلف المتصفحات يسمى `Ctrl` (انظر المثال أدناه).

:::

##### الاستخدام

```js
browser.keys(value)
```

##### المعاملات

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
      <td>سلسلة المفاتيح المراد كتابتها. يجب توفير مصفوفة أو سلسلة نصية.</td>
    </tr>
  </tbody>
</table>

##### مثال

```js reference title="keys.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/355434bdef13d29608d6d5fbfbeaa034c8a2aa74/keys/keys.js#L1-L17
```