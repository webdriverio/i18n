---
id: redirect
title: إعادة التوجيه
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/mock/redirect.ts
---

يقوم بإعداد إعادة توجيه لمحاكاة معينة. هذا يسمح لك بإعادة توجيه طلب إلى عنوان URL آخر.
ملاحظة: تنطبق عمليات إعادة التوجيه هذه فقط على الطلبات التي يتم إجراؤها بواسطة برنامج نصي في المتصفح، وليس عند استدعاء أمر `url`.

##### الاستخدام

```js
mock.redirect(url)
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
      <td><code><var>url</var></code></td>
      <td>`string`</td>
      <td>المورد المستهدف لإعادة توجيه الطلبات إليه</td>
    </tr>
  </tbody>
</table>

##### مثال

```js title="respond.js"
it('redirects all my API request to my staging server', async () => {
    const mock = await browser.mock('https://application.com/api/*')
    mock.redirect('https://staging.application.com/api/*')

    // is the same as
    mock.request({ url: 'https://staging.application.com/api/*' })

    // ...
})
```