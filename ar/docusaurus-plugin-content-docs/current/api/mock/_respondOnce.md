---
id: respondOnce
title: الاستجابة مرة واحدة
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/mock/respondOnce.ts
---

الاستجابة مرة واحدة فقط مع التعديل المحدد. يمكنك استدعاء `respondOnce` عدة مرات متتالية وسيبدأ بالاستجابة التي حددتها أخيرًا. إذا كنت تستخدم `respondOnce` فقط وتم استدعاء المورد أكثر من عدد المرات التي تم فيها تعريف مُحاكاة، فإنه يعود إلى المورد الأصلي.

##### الاستخدام

```js
mock.respondOnce(overwrites, { header, statusCode, fetchResponse })
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
      <td><code><var>overwrites</var></code></td>
      <td>`MockOverwrite`</td>
      <td>بيانات لتعديل الاستجابة</td>
    </tr>
    <tr>
      <td><code><var>params</var></code><br /><span className="label labelWarning">اختياري</span></td>
      <td>`MockResponseParams`</td>
      <td>معاملات استجابة إضافية للتعديل</td>
    </tr>
    <tr>
      <td><code><var>params.header</var></code><br /><span className="label labelWarning">اختياري</span></td>
      <td>`Object`</td>
      <td>تعديل رؤوس محددة</td>
    </tr>
    <tr>
      <td><code><var>params.statusCode</var></code><br /><span className="label labelWarning">اختياري</span></td>
      <td>`Number`</td>
      <td>تعديل رمز حالة الاستجابة</td>
    </tr>
    <tr>
      <td><code><var>params.fetchResponse</var></code><br /><span className="label labelWarning">اختياري</span></td>
      <td>`Boolean`</td>
      <td>جلب الاستجابة الحقيقية قبل الرد بالبيانات المحاكاة</td>
    </tr>
  </tbody>
</table>

##### مثال

```js title="respondOnce.js"
async function getToDos () {
    await $('#todo-list li').waitForExist()
    return $$('#todo-list li').map(el => el.getText())
}

it('should demonstrate the respondOnce command', async () => {
    const mock = await browser.mock('https://todo-backend-express-knex.herokuapp.com/', {
        method: 'get'
    })

    mock.respondOnce([{
        title: '3'
    }, {
        title: '2'
    }, {
        title: '1'
    }])

    mock.respondOnce([{
        title: '2'
    }, {
        title: '1'
    }])

    mock.respondOnce([{
        title: '1'
    }])

    await browser.url('https://todobackend.com/client/index.html?https://todo-backend-express-knex.herokuapp.com/')
    console.log(await getToDos()) // outputs [ '3', '2', '1' ]
    await browser.url('https://todobackend.com/client/index.html?https://todo-backend-express-knex.herokuapp.com/')
    console.log(await getToDos()) // outputs [ '2', '1' ]
    await browser.url('https://todobackend.com/client/index.html?https://todo-backend-express-knex.herokuapp.com/')
    console.log(await getToDos()) // outputs [ '1' ]
    await browser.url('https://todobackend.com/client/index.html?https://todo-backend-express-knex.herokuapp.com/')
    console.log(await getToDos()) // outputs actual resource response
})
```