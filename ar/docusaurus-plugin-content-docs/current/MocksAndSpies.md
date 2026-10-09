---
id: mocksandspies
title: محاكاة الطلبات والتجسس عليها
description: "قم بمحاكاة طلبات الشبكة واستجاباتها في اختباراتك باستخدام browser.mock، وأوقف الطلبات وافحص الاستدعاءات باستخدام الجواسيس (spies)."
---

يأتي WebdriverIO مع دعم مدمج لتعديل استجابات الشبكة، مما يتيح لك التركيز على اختبار تطبيق الواجهة الأمامية دون الحاجة إلى إعداد الواجهة الخلفية أو خادم محاكاة. يمكنك تحديد استجابات مخصصة لموارد الويب مثل طلبات REST API في اختبارك وتعديلها ديناميكيًا.

:::info

لاحظ أن استخدام الأمر `mock` يتطلب دعم WebDriver Bidi. وهذا هو الحال عادةً عند تشغيل الاختبارات محليًا في متصفح قائم على Chromium أو على Firefox، وكذلك إذا كنت تستخدم Selenium Grid الإصدار 4 أو أعلى. إذا كنت تشغّل الاختبارات في السحابة، فتأكد من أن مزود الخدمة السحابية لديك يدعم WebDriver Bidi.

:::

## إنشاء محاكاة

قبل أن تتمكن من تعديل أي استجابات، يجب عليك تحديد محاكاة أولاً. توصف هذه المحاكاة بعنوان URL للمورد ويمكن تصفيتها حسب [طريقة الطلب](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods) أو [الترويسات](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers). تتم مطابقة المورد باستخدام [`URLPattern`](https://developer.mozilla.org/en-US/docs/Web/API/URLPattern)، حيث يطابق `*` أي تسلسل من الأحرف. أما عنوان URL الذي لا يحتوي على بروتوكول فتتم مطابقته مع مسار الطلب فقط، لذا فإن `*/users/list` يطابق ذلك المسار على أي مصدر:

```js
// محاكاة جميع الموارد التي تنتهي بـ "/users/list"
const userListMock = await browser.mock('*/users/list')

// أو يمكنك تحديد المحاكاة عن طريق تصفية الموارد حسب الترويسات أو
// رمز الحالة، ومحاكاة الطلبات الناجحة لموارد json فقط
const strictMock = await browser.mock('*', {
    // محاكاة جميع استجابات json
    requestHeaders: { 'Content-Type': 'application/json' },
    // التي كانت ناجحة
    statusCode: 200
})

// بدلاً من سلسلة نصية يمكنك أيضًا تمرير `URLPattern`؛ يعمل الـ polyfill
// أيضًا في بيئات التشغيل التي لا تدعم URLPattern بشكل أصلي
import { URLPattern } from 'urlpattern-polyfill'
const patternMock = await browser.mock(new URLPattern({ pathname: '/users/list' }))
```

:::warning

استخدم `*` واحدة لأحرف البدل في عناوين URL؛ فهي تطابق `/` أيضًا. يمكن أن تتسبب أحرف البدل المتتالية قبل نص ثابت، مثل `**/api/**` أو `**/data.json`، في تراجع مفرط للتعبيرات النمطية (regex backtracking) على عناوين URL غير ذات صلة وتجميد الاختبار. راجع [المشكلة #13548](https://github.com/webdriverio/webdriverio/issues/13548). في اختبارات المكونات، استخدم أيضًا بروتوكولًا واسم مضيف ثابتين لإبقاء حركة مرور المشغّل خارج نطاق الاعتراض؛ راجع [محاكاة الطلبات في اختبار المكونات](/docs/component-testing/mocking#requests).

:::

## تحديد استجابات مخصصة

بمجرد تحديد محاكاة، يمكنك تحديد استجابات مخصصة لها. يمكن أن تكون هذه الاستجابات المخصصة إما كائنًا للرد بـ JSON، أو ملفًا محليًا للرد ببيانات ثابتة (fixture) مخصصة، أو موردًا من الويب لاستبدال الاستجابة بمورد من الإنترنت.

### محاكاة طلبات API

لمحاكاة طلبات API التي تتوقع فيها استجابة JSON، كل ما عليك فعله هو استدعاء `respond` على كائن المحاكاة مع أي كائن تريد إرجاعه، على سبيل المثال:

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
// المخرجات: "[ 'Injected (non) completed Todo', 'Injected completed Todo' ]"
```

يمكنك أيضًا تعديل ترويسات الاستجابة وكذلك رمز الحالة عن طريق تمرير بعض معاملات استجابة المحاكاة على النحو التالي:

```js
mock.respond({ ... }, {
    // الرد برمز الحالة 404
    statusCode: 404,
    // دمج ترويسات الاستجابة مع الترويسات التالية
    headers: { 'x-custom-header': 'foobar' }
})
```

إذا كنت تريد ألا تستدعي المحاكاة الواجهة الخلفية على الإطلاق، يمكنك تمرير `false` للعلامة `fetchResponse`.

```js
mock.respond({ ... }, {
    // عدم استدعاء الواجهة الخلفية الفعلية
    fetchResponse: false
})
```

لا يستدعي `fetchResponse: false` الواجهة الخلفية أبدًا. أما المحاكاة التي تم إنشاؤها بمرشح `statusCode` أو `responseHeaders` فتحتاج إلى تلك الاستجابة لتحديد ما إذا كانت مطابقة، لذا فإن `respond()` و`respondOnce()` يطرحان خطأً إذا جمعت بينهما. احذف مرشح الاستجابة، أو اترك `fetchResponse` دون تعيين حتى تتمكن المحاكاة من قراءة استجابة الواجهة الخلفية ثم استبدالها.

يوصى بتخزين الاستجابات المخصصة في ملفات بيانات ثابتة (fixtures) حتى تتمكن من استيرادها في اختبارك على النحو التالي:

```js
// يتطلب Node.js الإصدار v16.14.0 أو أعلى لدعم تأكيدات استيراد JSON
import responseFixture from './__fixtures__/apiResponse.json' assert { type: 'json' }
mock.respond(responseFixture)
```

### محاكاة الموارد النصية

إذا كنت ترغب في تعديل الموارد النصية مثل ملفات JavaScript أو CSS أو غيرها من الموارد النصية، يمكنك ببساطة تمرير مسار ملف وسيستبدل WebdriverIO المورد الأصلي به، على سبيل المثال:

```js
const scriptMock = await browser.mock('*/script.min.js')
scriptMock.respond('./tests/fixtures/script.js')

// أو الرد بكود JS مخصص خاص بك
scriptMock.respond('alert("I am a mocked resource")')
```

### إعادة توجيه موارد الويب

يمكنك أيضًا ببساطة استبدال مورد ويب بمورد ويب آخر إذا كانت الاستجابة المطلوبة مستضافة بالفعل على الويب. يعمل هذا مع موارد الصفحة الفردية وكذلك مع صفحة الويب نفسها، على سبيل المثال:

```js
const pageMock = await browser.mock('https://google.com/')
await pageMock.respond('https://webdriver.io')
await browser.url('https://google.com')
console.log(await browser.getTitle()) // يُرجع "WebdriverIO · Next-gen browser and mobile automation test framework for Node.js"
```

### الاستجابات الديناميكية

إذا كانت استجابة المحاكاة تعتمد على استجابة المورد الأصلية، يمكنك أيضًا تعديل المورد ديناميكيًا عن طريق تمرير دالة تتلقى الاستجابة الأصلية كمعامل وتعيّن المحاكاة بناءً على القيمة المُرجعة، على سبيل المثال:

```js
const mock = await browser.mock('https://todo-backend-express-knex.herokuapp.com/', {
    method: 'get'
})

mock.respond((req) => {
    // استبدال محتوى المهام برقمها في القائمة
    return req.body.map((item, i) => ({ ...item, title: i }))
})

await browser.url('https://todobackend.com/client/index.html?https://todo-backend-express-knex.herokuapp.com/')

await $('#todo-list li').waitForExist()
console.log(await $$('#todo-list li label').map((el) => el.getText()))
// يُرجع
// [
//   '0',  '1',  '2',  '19', '20',
//   '21', '3',  '4',  '5',  '6',
//   '7',  '8',  '9',  '10', '11',
//   '12', '13', '14', '15', '16',
//   '17', '18', '22'
// ]
```

## إيقاف المحاكاة

بدلاً من إرجاع استجابة مخصصة، يمكنك أيضًا ببساطة إيقاف الطلب بأحد أخطاء HTTP التالية:

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

هذا مفيد جدًا إذا كنت تريد حظر نصوص الجهات الخارجية من صفحتك التي لها تأثير سلبي على اختبارك الوظيفي. يمكنك إيقاف محاكاة ببساطة عن طريق استدعاء `abort` أو `abortOnce`، على سبيل المثال:

```js
const mock = await browser.mock('https://www.google-analytics.com/*')
mock.abort('Failed')
```

## الجواسيس (Spies)

كل محاكاة هي تلقائيًا جاسوس يحسب عدد الطلبات التي أرسلها المتصفح إلى ذلك المورد. إذا لم تطبق استجابة مخصصة أو سببًا للإيقاف على المحاكاة، فإنها تستمر بالاستجابة الافتراضية التي ستتلقاها عادةً. يتيح لك ذلك التحقق من عدد المرات التي أرسل فيها المتصفح الطلب، على سبيل المثال إلى نقطة نهاية API معينة.

```js
const mock = await browser.mock('*/user', { method: 'post' })
console.log(mock.calls.length) // يُرجع 0

// تسجيل المستخدم
await $('#username').setValue('randomUser')
await $('password').setValue('password123')
await $('password_repeat').setValue('password123')
await $('button[type="submit"]').click()

// التحقق مما إذا تم إرسال طلب API
expect(mock.calls.length).toBe(1)

// التحقق من الاستجابة
expect(mock.calls[0].body).toEqual({ success: true })
```

إذا كنت بحاجة إلى الانتظار حتى يتم الرد على طلب مطابق، فاستخدم `mock.waitForResponse(options)`. راجع مرجع API: [waitForResponse](/docs/api/mock/waitForResponse).

## التحكم المتعدد عن بُعد (Multi-remote)

في متصفح [متعدد التحكم عن بُعد](/docs/multiremote)، يُرجع `mock()` كائن `MultiRemoteMock` بدلاً من `Mock` واحد. تعمل التوابع مثل `respond()` و`restore()` على كل نسخة. ينتظر `waitForResponse()` حتى تحصل كل نسخة على استجابة مطابقة. تبقى الطلبات الملتقطة على المحاكاة الخاصة بذلك المتصفح:

```ts
const mock = await browser.mock('*/user', { method: 'post' })
mock.respond({ success: true })

// تسجيل مستخدم في كل متصفح بحيث ترسل كل جلسة الطلب
await browser.$('#username').setValue('randomUser')
await browser.$('#password').setValue('password123')
await browser.$('#password_repeat').setValue('password123')
await browser.$('button[type="submit"]').click()

await mock.waitForResponse()

expect(mock.getInstance('myChromeBrowser').calls).toHaveLength(1)
expect(mock.getInstance('myFirefoxBrowser').calls).toHaveLength(1)
```

يسرد `mock.instances` تلك الأسماء بالترتيب الذي أُنشئت به المحاكاة. يطرح `getInstance` الخطأ `Multi-remote object has no instance named "<name>"` عندما لا يكون الاسم موجودًا في تلك القائمة. المحاكاة التي تم إنشاؤها من `browser.select('myFirefoxBrowser', 'myChromeBrowser')` تسرد Firefox أولاً، وقد يختلف ذلك عن `browser.instances`.

لمحاكاة متصفح واحد فقط، استدعِ `mock()` على تلك النسخة:

```ts
const chromeOnly = await browser.getInstance('myChromeBrowser').mock('*/user')
```