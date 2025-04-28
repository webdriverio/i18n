---
id: mock
title: محاكاة
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/mock.ts
---

قم بمحاكاة استجابة طلب. يمكنك تحديد محاكاة استنادًا إلى نمط URL متطابق
[URLPattern](https://developer.mozilla.org/en-US/docs/Web/API/URLPattern)
والرأس ورمز الحالة المقابلين. استدعاء طريقة المحاكاة
يعيد كائن stub يمكنك استخدامه لتعديل استجابة
مورد الويب.

باستخدام كائن stub، يمكنك بعد ذلك إما إرجاع استجابة مخصصة أو
جعل الطلب يفشل.

هناك 3 طرق لتعديل الاستجابة:
- إرجاع كائن JSON مخصص (لمحاكاة طلب API)
- استبدال مورد الويب بملف محلي (تقديم ملف JavaScript معدّل) أو
- إعادة توجيه المورد إلى عنوان URL مختلف

:::info

لاحظ أن استخدام أمر `mock` يتطلب دعمًا لـ WebDriver Bidi. وهذا
عادة ما يكون هو الحال عند تشغيل الاختبارات محليًا في متصفح يعتمد على Chromium أو على
Firefox وكذلك إذا كنت تستخدم Selenium Grid v4 أو أعلى. إذا كنت تشغل اختبارات
في السحابة، تأكد من أن مزود السحابة الخاص بك يدعم WebDriver Bidi.

:::

:::info

`URLPattern` عبارة عن تقنية تجريبية وليست مدعومة بعد في بعض البيئات، على سبيل المثال Node.js.
نوصي باستيراد [polyfill](https://www.npmjs.com/package/urlpattern-polyfill)
حتى يتم دعم الميزة على نطاق أوسع.

:::

##### الاستخدام

```js
browser.mock(url, { method, requestHeaders, responseHeaders, postData, statusCode })
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
      <td><code><var>url</var></code></td>
      <td>`String`</td>
      <td>عنوان URL المراد محاكاته</td>
    </tr>
    <tr>
      <td><code><var>filterOptions</var></code><br /><span className="label labelWarning">اختياري</span></td>
      <td>`MockFilterOptions`</td>
      <td>تصفية مورد المحاكاة حسب خيارات إضافية</td>
    </tr>
    <tr>
      <td><code><var>filterOptions.method</var></code><br /><span className="label labelWarning">اختياري</span></td>
      <td>`String, Function`</td>
      <td>تصفية المورد حسب طريقة HTTP</td>
    </tr>
    <tr>
      <td><code><var>filterOptions.requestHeaders</var></code><br /><span className="label labelWarning">اختياري</span></td>
      <td>`Object, Function`</td>
      <td>تصفية المورد حسب رؤوس طلب محددة</td>
    </tr>
    <tr>
      <td><code><var>filterOptions.responseHeaders</var></code><br /><span className="label labelWarning">اختياري</span></td>
      <td>`Object, Function`</td>
      <td>تصفية المورد حسب رؤوس استجابة محددة</td>
    </tr>
    <tr>
      <td><code><var>filterOptions.postData</var></code><br /><span className="label labelWarning">اختياري</span></td>
      <td>`String, Function`</td>
      <td>تصفية المورد حسب بيانات الإرسال في الطلب</td>
    </tr>
    <tr>
      <td><code><var>filterOptions.statusCode</var></code><br /><span className="label labelWarning">اختياري</span></td>
      <td>`Number, Function`</td>
      <td>تصفية المورد حسب رمز حالة الاستجابة</td>
    </tr>
  </tbody>
</table>

##### مثال

```js title="mock.js"
it('should mock network resources', async () => {
    // via static string
    const userListMock = await browser.mock('**' + '/users/list')
    // or as regular expression
    const userListMock = await browser.mock(/https:\/\/(domainA|domainB)\.com\/.+/)
    // you can also specifying the mock even more by filtering resources
    // by request or response headers, status code, postData, e.g. mock only responses with specific
    // header set and statusCode
    const strictMock = await browser.mock('**', {
        // mock all json responses
        statusCode: 200,
        requestHeaders: { 'Content-Type': 'application/json' },
        responseHeaders: { 'Cache-Control': 'no-cache' },
        postData: 'foobar'
    })

    // comparator function
    const apiV1Mock = await browser.mock('**' + '/api/v1', {
        statusCode: (statusCode) => statusCode >= 200 && statusCode <= 203,
        requestHeaders: (headers) => headers['Authorization'] && headers['Authorization'].startsWith('Bearer '),
        responseHeaders: (headers) => headers['Impersonation'],
        postData: (data) => typeof data === 'string' && data.includes('foo')
    })
})

it('should modify API responses', async () => {
    // filter by method
    const todoMock = await browser.mock('**' + '/todos', {
        method: 'get'
    })

    // mock an endpoint with a fixed fixture
    todoMock.respond([{
        title: 'Injected Todo',
        order: null,
        completed: false,
        url: "http://todo-backend-express-knex.herokuapp.com/916"
    }])

    // respond with different status code or header
    todoMock.respond([{
        title: 'Injected Todo',
        order: null,
        completed: false,
        url: "http://todo-backend-express-knex.herokuapp.com/916"
    }], {
        statusCode: 404,
        headers: {
            'x-custom-header': 'foobar'
        }
    })
})

it('should modify text assets', async () => {
    const scriptMock = await browser.mock('**' + '/script.min.js')
    scriptMock.respond('./tests/fixtures/script.js')
})

it('should redirect web resources', async () => {
    const headerMock = await browser.mock('**' + '/header.png')
    headerMock.respond('https://media.giphy.com/media/F9hQLAVhWnL56/giphy.gif')

    const pageMock = await browser.mock('https://google.com/')
    pageMock.respond('https://webdriver.io')
    await browser.url('https://google.com')
    console.log(await browser.getTitle()) // returns "WebdriverIO · Next-gen browser and mobile automation test framework for Node.js"
})
```

##### القيمة المرجعة

- **&lt;Mock&gt;**
            **<code><var>return</var></code>:**                                                كائن محاكاة لتعديل الاستجابة