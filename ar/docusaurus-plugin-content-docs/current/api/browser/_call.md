---
id: call
title: استدعاء
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/call.ts
---

يمكنك استخدام `call` لتنفيذ أي إجراء غير متزامن داخل مواصفات الاختبار الخاصة بك.
يقبل الوعود (promises) ويوقف التنفيذ حتى يتم حل الوعد.

:::info

مع إلغاء WebdriverIO للاستخدام المتزامن (انظر [RFC](https://github.com/webdriverio/webdriverio/discussions/6702))
لم يعد هذا الأمر مفيدًا كثيرًا.

:::

##### الاستخدام

```js
browser.call(callback)
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
      <td><code><var>callback</var></code></td>
      <td>`Function`</td>
      <td>الدالة المراد استدعاؤها</td>
    </tr>
  </tbody>
</table>

##### مثال

```js title="call.js"
it('some testing here', async () => {
    await browser.url('http://google.com')
    // make an asynchronous call using any 3rd party library supporting promises
    // e.g. call to backend or db to inject fixture data
    await browser.call(() => {
        return somePromiseLibrary.someMethod().then(() => {
            // ...
        })
    })

    // example for async call to 3rd party library that doesn't support promises
    const result = await browser.call(() => {
        return new Promise((resolve, reject) => {
            someOtherNodeLibrary.someMethod(param1, (err, res) => {
                if (err) {
                    return reject(err)
                }
                resolve(res)
            })
        })
    })
});
```