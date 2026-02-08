---
id: mocksandspies
title: محاكاة الطلبات والتجسس
---

يأتي WebdriverIO مع دعم مدمج لتعديل استجابات الشبكة مما يسمح لك بالتركيز على اختبار تطبيق الواجهة الأمامية دون الحاجة إلى إعداد الخلفية أو خادم محاكاة. يمكنك تحديد استجابات مخصصة لموارد الويب مثل طلبات واجهة برمجة التطبيقات REST في اختبارك وتعديلها ديناميكيًا.

:::info

لاحظ أن استخدام أمر `mock` يتطلب دعمًا لبروتوكول Chrome DevTools. يتوفر هذا الدعم إذا كنت تقوم بتشغيل الاختبارات محليًا في متصفح يعتمد على Chromium، أو عبر Selenium Grid v4 أو أعلى، أو من خلال مزود سحابي يدعم بروتوكول Chrome DevTools (مثل SauceLabs، BrowserStack، TestMu AI (سابقًا LambdaTest)). سيتوفر الدعم الكامل للمتصفحات المتعددة بمجرد أن تتوفر البنية الأساسية المطلوبة في [Webdriver Bidi](https://wpt.fyi/results/webdriver/tests/bidi/network?label=experimental&label=master&aligned) ويتم تنفيذها في المتصفحات المعنية.

:::

## إنشاء محاكاة

قبل أن تتمكن من تعديل أي استجابات، يجب عليك أولاً تحديد محاكاة. يتم وصف هذه المحاكاة بواسطة عنوان URL للمورد ويمكن تصفيتها حسب [طريقة الطلب](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods) أو [الرؤوس](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers). يدعم المورد تعبيرات glob بواسطة [minimatch](https://www.npmjs.com/package/minimatch):

```js
// mock all resources ending with "/users/list"
const userListMock = await browser.mock('**/users/list')

// or you can specify the mock by filtering resources by headers or
// status code, only mock successful requests to json resources
const strictMock = await browser.mock('**', {
    // mock all json responses
    requestHeaders: { 'Content-Type': 'application/json' },
    // that were successful
    statusCode: 200
})
```

## تحديد استجابات مخصصة

بمجرد تحديد محاكاة، يمكنك تعريف استجابات مخصصة لها. يمكن أن تكون هذه الاستجابات المخصصة إما كائنًا للرد على JSON، أو ملفًا محليًا للرد باستخدام عنصر ثابت مخصص، أو مورد ويب لاستبدال الاستجابة بمورد من الإنترنت.

### محاكاة طلبات API

لمحاكاة طلبات API حيث تتوقع استجابة JSON، كل ما عليك فعله هو استدعاء `respond` على كائن المحاكاة مع كائن عشوائي تريد إرجاعه، على سبيل المثال:

```js
const mock = await browser.mock('https://todo-backend-express-knex.herokuapp.com/')

mock.respond([{
    title: 'Injected (non) completed Todo',
    order: null,
    completed: false
}, {
    title: 'Injected completed Todo',
    order: null,
    completed: true
}], {
    headers: {
        'Access-Control-Allow-Origin': '*'
    },
    fetchResponse: false
})

await browser.url('https://todobackend.com/client/index.html?https://todo-backend-express-knex.herokuapp.com/')

await $('#todo-list li').waitForExist()
console.log(await $$('#todo-list li').map(el => el.getText()))
// outputs: "[ 'Injected (non) completed Todo', 'Injected completed Todo' ]"
```

يمكنك أيضًا تعديل رؤوس الاستجابة وكذلك رمز الحالة من خلال تمرير بعض معلمات استجابة المحاكاة كما يلي:

```js
mock.respond({ ... }, {
    // respond with status code 404
    statusCode: 404,
    // merge response headers with following headers
    headers: { 'x-custom-header': 'foobar' }
})
```

إذا كنت تريد أن المحاكاة لا تتصل بالخلفية على الإطلاق، يمكنك تمرير `false` لعلامة `fetchResponse`.

```js
mock.respond({ ... }, {
    // do not call the actual backend
    fetchResponse: false
})
```

يوصى بتخزين الاستجابات المخصصة في ملفات ثابتة حتى تتمكن من استدعائها في اختبارك كما يلي:

```js
// requires Node.js v16.14.0 or higher to support JSON import assertions
import responseFixture from './__fixtures__/apiResponse.json' assert { type: 'json' }
mock.respond(responseFixture)
```

### محاكاة موارد النص

إذا كنت ترغب في تعديل موارد النص مثل JavaScript أو ملفات CSS أو غيرها من الموارد القائمة على النص، يمكنك تمرير مسار ملف وسيقوم WebdriverIO باستبدال المورد الأصلي به، على سبيل المثال:

```js
const scriptMock = await browser.mock('**/script.min.js')
scriptMock.respond('./tests/fixtures/script.js')

// or respond with your custom JS
scriptMock.respond('alert("I am a mocked resource")')
```

### إعادة توجيه موارد الويب

يمكنك أيضًا استبدال مورد ويب بمورد ويب آخر إذا كانت الاستجابة المطلوبة متوفرة بالفعل على الويب. يعمل هذا مع موارد الصفحة الفردية وكذلك مع صفحة ويب نفسها، على سبيل المثال:

```js
const pageMock = await browser.mock('https://google.com/')
await pageMock.respond('https://webdriver.io')
await browser.url('https://google.com')
console.log(await browser.getTitle()) // returns "WebdriverIO · Next-gen browser and mobile automation test framework for Node.js"
```

### استجابات ديناميكية

إذا كانت استجابة المحاكاة الخاصة بك تعتمد على استجابة المورد الأصلي، يمكنك أيضًا تعديل المورد ديناميكيًا عن طريق تمرير دالة تتلقى الاستجابة الأصلية كمعلمة وتعيين المحاكاة بناءً على قيمة الإرجاع، على سبيل المثال:

```js
const mock = await browser.mock('https://todo-backend-express-knex.herokuapp.com/', {
    method: 'get'
})

mock.respond((req) => {
    // replace todo content with their list number
    return req.body.map((item, i) => ({ ...item, title: i }))
})

await browser.url('https://todobackend.com/client/index.html?https://todo-backend-express-knex.herokuapp.com/')

await $('#todo-list li').waitForExist()
console.log(await $$('#todo-list li label').map((el) => el.getText()))
// returns
// [
//   '0',  '1',  '2',  '19', '20',
//   '21', '3',  '4',  '5',  '6',
//   '7',  '8',  '9',  '10', '11',
//   '12', '13', '14', '15', '16',
//   '17', '18', '22'
// ]
```

## إلغاء المحاكاة

بدلاً من إرجاع استجابة مخصصة، يمكنك أيضًا إلغاء الطلب مع أحد أخطاء HTTP التالية:

- Failed
- Aborted
- TimedOut
- AccessDenied
- ConnectionClosed
- ConnectionReset
- ConnectionRefused
- ConnectionAborted
- ConnectionFailed
- NameNotResolved
- InternetDisconnected
- AddressUnreachable
- BlockedByClient
- BlockedByResponse

هذا مفيد جدًا إذا كنت تريد منع نص الطرف الثالث من صفحتك الذي له تأثير سلبي على اختبار الوظائف الخاص بك. يمكنك إلغاء محاكاة عن طريق استدعاء `abort` أو `abortOnce`، على سبيل المثال:

```js
const mock = await browser.mock('https://www.google-analytics.com/**')
mock.abort('Failed')
```

## التجسس

كل محاكاة هي تلقائيًا جاسوس يحسب عدد الطلبات التي قام بها المتصفح لهذا المورد. إذا لم تطبق استجابة مخصصة أو سبب إلغاء على المحاكاة، فإنه يستمر مع الاستجابة الافتراضية التي تتلقاها عادة. وهذا يتيح لك التحقق من عدد المرات التي أرسل فيها المتصفح الطلب، على سبيل المثال إلى نقطة نهاية API معينة.

```js
const mock = await browser.mock('**/user', { method: 'post' })
console.log(mock.calls.length) // returns 0

// register user
await $('#username').setValue('randomUser')
await $('password').setValue('password123')
await $('password_repeat').setValue('password123')
await $('button[type="submit"]').click()

// check if API request was made
expect(mock.calls.length).toBe(1)

// assert response
expect(mock.calls[0].body).toEqual({ success: true })
```

إذا كنت بحاجة إلى الانتظار حتى يتم الرد على طلب مطابق، استخدم `mock.waitForResponse(options)`. راجع مرجع واجهة برمجة التطبيقات: [waitForResponse](/docs/api/mock/waitForResponse).