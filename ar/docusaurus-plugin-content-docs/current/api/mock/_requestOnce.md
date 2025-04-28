---
id: requestOnce
title: طلب مرة واحدة
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/mock/requestOnce.ts
---

قم بتغيير معلمة الطلب مرة واحدة فقط باستخدام الكتابة المحددة للطلب التالي. يمكنك استدعاء `requestOnce` عدة مرات متتالية وسيقوم بتطبيق التغييرات بالترتيب. إذا كنت تستخدم `requestOnce` فقط ويتم استدعاء المورد أكثر من مرة تم فيها تعريف المحاكاة، فإنه يعود افتراضيًا إلى المورد الأصلي.

##### الاستخدام

```js
mock.requestOnce({ header, cookies, method, url, header, statusCode, fetchResponse })
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
      <td>حمولة لإعادة كتابة الاستجابة</td>
    </tr>
    <tr>
      <td><code><var>overwrites.header</var></code></td>
      <td>`Record<string, string>`</td>
      <td>إعادة كتابة رؤوس محددة</td>
    </tr>
    <tr>
      <td><code><var>overwrites.cookies</var></code></td>
      <td>`Record<string, string>`</td>
      <td>إعادة كتابة ملفات تعريف الارتباط للطلب</td>
    </tr>
    <tr>
      <td><code><var>overwrites.method</var></code></td>
      <td>`string`</td>
      <td>إعادة كتابة طريقة الطلب</td>
    </tr>
    <tr>
      <td><code><var>overwrites.url</var></code></td>
      <td>`string`</td>
      <td>إعادة كتابة عنوان URL للطلب لبدء عملية إعادة توجيه</td>
    </tr>
    <tr>
      <td><code><var>params</var></code><br /><span className="label labelWarning">اختياري</span></td>
      <td>`MockResponseParams`</td>
      <td>معلمات استجابة إضافية لإعادة كتابتها</td>
    </tr>
    <tr>
      <td><code><var>params.header</var></code><br /><span className="label labelWarning">اختياري</span></td>
      <td>`Object`</td>
      <td>إعادة كتابة رؤوس محددة</td>
    </tr>
    <tr>
      <td><code><var>params.statusCode</var></code><br /><span className="label labelWarning">اختياري</span></td>
      <td>`Number`</td>
      <td>إعادة كتابة رمز حالة الاستجابة</td>
    </tr>
    <tr>
      <td><code><var>params.fetchResponse</var></code><br /><span className="label labelWarning">اختياري</span></td>
      <td>`Boolean`</td>
      <td>جلب الاستجابة الحقيقية قبل الرد بالبيانات المحاكاة</td>
    </tr>
  </tbody>
</table>

##### مثال

```js title="respond.js"
it('adds different auth headers to my API requests', async () => {
    const mock = await browser.mock('https://application.com/api', {
        method: 'get'
    })

    mock.requestOnce({
        headers: { 'Authorization': 'Bearer token' }
    })
    mock.requestOnce({
        headers: { 'Authorization': 'Another bearer token' }
    })

    await browser.url('https://application.com')
    // ...
})
```