---
id: request
title: الطلب
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/mock/request.ts
---

يسمح لك بتعديل الطلبات التي يقوم بها المتصفح خلال الجلسة. يمكن أن يكون هذا مفيدًا للحالات التالية:

- التحقق من صحة إرسال تطبيقك لحمولات الطلب الصحيحة
- تمرير رؤوس التفويض لاختبار الموارد المحمية
- تعيين ملفات تعريف الارتباط للجلسة لاختبار مصادقة المستخدم
- تعديل الطلبات لاختبار الحالات الحرجة

##### الاستخدام

```js
mock.request({ header, cookies, method, url, header, statusCode, fetchResponse })
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
      <td><code><var>overwrites</var></code></td>
      <td>`MockOverwrite`</td>
      <td>حمولة لاستبدال الاستجابة</td>
    </tr>
    <tr>
      <td><code><var>overwrites.header</var></code></td>
      <td>`Record<string,string>`</td>
      <td>استبدال رؤوس محددة</td>
    </tr>
    <tr>
      <td><code><var>overwrites.cookies</var></code></td>
      <td>`Record<string,string>`</td>
      <td>استبدال ملفات تعريف الارتباط للطلب</td>
    </tr>
    <tr>
      <td><code><var>overwrites.method</var></code></td>
      <td>`string`</td>
      <td>استبدال طريقة الطلب</td>
    </tr>
    <tr>
      <td><code><var>overwrites.url</var></code></td>
      <td>`string`</td>
      <td>استبدال عنوان URL للطلب لبدء إعادة توجيه</td>
    </tr>
    <tr>
      <td><code><var>params</var></code><br /><span className="label labelWarning">اختياري</span></td>
      <td>`MockResponseParams`</td>
      <td>معلمات استجابة إضافية للاستبدال</td>
    </tr>
    <tr>
      <td><code><var>params.header</var></code><br /><span className="label labelWarning">اختياري</span></td>
      <td>`Object`</td>
      <td>استبدال رؤوس محددة</td>
    </tr>
    <tr>
      <td><code><var>params.statusCode</var></code><br /><span className="label labelWarning">اختياري</span></td>
      <td>`Number`</td>
      <td>استبدال رمز حالة الاستجابة</td>
    </tr>
    <tr>
      <td><code><var>params.fetchResponse</var></code><br /><span className="label labelWarning">اختياري</span></td>
      <td>`Boolean`</td>
      <td>جلب الاستجابة الحقيقية قبل الرد بالبيانات المزيفة</td>
    </tr>
  </tbody>
</table>

##### مثال

```js title="respond.js"
it('adds an auth header to my API requests', async () => {
    const mock = await browser.mock('https://application.com/api', {
        method: 'get'
    })

    mock.request({
        headers: { 'Authorization': 'Bearer token' }
    })

    await browser.url('https://application.com')
    // ...
})
```