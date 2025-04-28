---
id: retry
title: إعادة تشغيل الاختبارات غير المستقرة
---

يمكنك إعادة تشغيل بعض الاختبارات باستخدام أداة اختبار WebdriverIO التي تكون غير مستقرة بسبب أشياء مثل شبكة غير مستقرة أو ظروف سباق. (ومع ذلك، لا يُنصح ببساطة زيادة معدل إعادة التشغيل إذا أصبحت الاختبارات غير مستقرة!)

## إعادة تشغيل مجموعات الاختبارات في Mocha

منذ الإصدار 3 من Mocha، يمكنك إعادة تشغيل مجموعات الاختبار بأكملها (كل شيء داخل كتلة `describe`). إذا كنت تستخدم Mocha، يجب أن تفضل آلية إعادة المحاولة هذه بدلاً من تنفيذ WebdriverIO الذي يسمح لك فقط بإعادة تشغيل كتل اختبار معينة (كل شيء ضمن كتلة `it`). من أجل استخدام طريقة `this.retries()`، يجب أن تستخدم كتلة المجموعة `describe` دالة غير مرتبطة `function(){}` بدلاً من دالة السهم `() => {}`، كما هو موضح في [وثائق Mocha](https://mochajs.org/#arrow-functions). باستخدام Mocha، يمكنك أيضًا تعيين عدد إعادة المحاولات لجميع المواصفات باستخدام `mochaOpts.retries` في ملف `wdio.conf.js` الخاص بك.

إليك مثال:

```js
describe('retries', function () {
    // Retry all tests in this suite up to 4 times
    this.retries(4)

    beforeEach(async () => {
        await browser.url('http://www.yahoo.com')
    })

    it('should succeed on the 3rd try', async function () {
        // Specify this test to only retry up to 2 times
        this.retries(2)
        console.log('run')
        await expect($('.foo')).toBeDisplayed()
    })
})
```

## إعادة تشغيل الاختبارات الفردية في Jasmine أو Mocha

لإعادة تشغيل كتلة اختبار معينة، يمكنك ببساطة تطبيق عدد إعادة التشغيل كآخر معامل بعد دالة كتلة الاختبار:

<Tabs
  defaultValue="mocha"
  values={[
    {label: 'Mocha', value: 'mocha'},
    {label: 'Jasmine', value: 'jasmine'},
  ]
}>
<TabItem value="mocha">

```js
describe('my flaky app', () => {
    /**
     * spec that runs max 4 times (1 actual run + 3 reruns)
     */
    it('should rerun a test at least 3 times', async function () {
        console.log(this.wdioRetries) // returns number of retries
        // ...
    }, 3)
})
```

نفس الشيء يعمل مع الخطافات أيضًا:

```js
describe('my flaky app', () => {
    /**
     * hook that runs max 2 times (1 actual run + 1 rerun)
     */
    beforeEach(async () => {
        // ...
    }, 1)

    // ...
})
```

</TabItem>
<TabItem value="jasmine">

```js
describe('my flaky app', () => {
    /**
     * spec that runs max 4 times (1 actual run + 3 reruns)
     */
    it('should rerun a test at least 3 times', async function () {
        console.log(this.wdioRetries) // returns number of retries
        // ...
    }, jasmine.DEFAULT_TIMEOUT_INTERVAL, 3)
})
```

نفس الشيء يعمل مع الخطافات أيضًا:

```js
describe('my flaky app', () => {
    /**
     * hook that runs max 2 times (1 actual run + 1 rerun)
     */
    beforeEach(async () => {
        // ...
    }, jasmine.DEFAULT_TIMEOUT_INTERVAL, 1)

    // ...
})
```

إذا كنت تستخدم Jasmine، فإن المعامل الثاني محجوز للمهلة. لتطبيق معامل إعادة المحاولة، تحتاج إلى تعيين المهلة إلى قيمتها الافتراضية `jasmine.DEFAULT_TIMEOUT_INTERVAL` ثم تطبيق عدد إعادة المحاولات.

</TabItem>
</Tabs>

تسمح آلية إعادة المحاولة هذه فقط بإعادة تشغيل الخطافات الفردية أو كتل الاختبار. إذا كان اختبارك مصحوبًا بخطاف لإعداد تطبيقك، فلن يتم تشغيل هذا الخطاف. [يقدم Mocha](https://mochajs.org/#retry-tests) إعادة محاولات الاختبار الأصلية التي توفر هذا السلوك بينما لا يقدمها Jasmine. يمكنك الوصول إلى عدد إعادة المحاولات المنفذة في خطاف `afterTest`.

## إعادة التشغيل في Cucumber

### إعادة تشغيل المجموعات الكاملة في Cucumber

بالنسبة لـ cucumber >=6 يمكنك توفير خيار التكوين [`retry`](https://github.com/cucumber/cucumber-js/blob/master/docs/cli.md#retry-failing-tests) مع معامل `retryTagFilter` اختياري للحصول على بعض أو كل السيناريوهات الفاشلة وإعادة محاولات إضافية حتى تنجح. لكي تعمل هذه الميزة، تحتاج إلى تعيين `scenarioLevelReporter` إلى `true`.

### إعادة تشغيل تعريفات الخطوات في Cucumber

لتحديد معدل إعادة تشغيل لتعريفات خطوة معينة، قم ببساطة بتطبيق خيار إعادة المحاولة عليها، مثل:

```js
export default function () {
    /**
     * step definition that runs max 3 times (1 actual run + 2 reruns)
     */
    this.Given(/^some step definition$/, { wrapperOptions: { retry: 2 } }, async () => {
        // ...
    })
    // ...
})
```

يمكن تحديد إعادة التشغيل فقط في ملف تعريفات الخطوات الخاص بك، وليس أبدًا في ملف الميزات الخاص بك.

## إضافة إعادة المحاولات على أساس ملف مواصفات معين

سابقًا، كانت إعادة المحاولات متاحة فقط على مستوى الاختبار والمجموعة، وهي مناسبة في معظم الحالات.

ولكن في أي اختبارات تتضمن حالة (مثل على خادم أو في قاعدة بيانات)، قد تظل الحالة غير صالحة بعد فشل الاختبار الأول. قد لا تتاح لأي إعادة محاولات لاحقة أي فرصة للنجاح، بسبب الحالة غير الصالحة التي ستبدأ بها.

يتم إنشاء مثيل `browser` جديد لكل ملف مواصفات، مما يجعل هذا مكانًا مثاليًا للتعليق وإعداد أي حالات أخرى (خادم، قواعد بيانات). تعني إعادة المحاولات على هذا المستوى أنه سيتم ببساطة تكرار عملية الإعداد بأكملها، تمامًا كما لو كانت لملف مواصفات جديد.

```js title="wdio.conf.js"
export const config = {
    // ...
    /**
     * The number of times to retry the entire specfile when it fails as a whole
     */
    specFileRetries: 1,
    /**
     * Delay in seconds between the spec file retry attempts
     */
    specFileRetriesDelay: 0,
    /**
     * Retried specfiles are inserted at the beginning of the queue and retried immediately
     */
    specFileRetriesDeferred: false
}
```

## تشغيل اختبار محدد عدة مرات

هذا للمساعدة في منع إدخال اختبارات غير مستقرة في قاعدة التعليمات البرمجية. من خلال إضافة خيار سطر الأوامر `--repeat`، سيتم تشغيل المواصفات أو المجموعات المحددة N مرة. عند استخدام هذا العلم في سطر الأوامر، يجب أيضًا تحديد علم `--spec` أو `--suite`.

عند إضافة اختبارات جديدة إلى قاعدة التعليمات البرمجية، خاصة من خلال عملية CI/CD، يمكن أن تمر الاختبارات ويتم دمجها ولكنها قد تصبح غير مستقرة لاحقًا. يمكن أن تأتي هذه العدم استقرار من عدد من الأشياء مثل مشاكل الشبكة، تحميل الخادم، حجم قاعدة البيانات، إلخ. استخدام علم `--repeat` في عملية CI/CD يمكن أن يساعد في اكتشاف هذه الاختبارات غير المستقرة قبل دمجها في قاعدة التعليمات البرمجية الرئيسية.

إحدى الاستراتيجيات التي يمكن استخدامها هي تشغيل اختباراتك بشكل عادي في عملية CI/CD، ولكن إذا كنت تقدم اختبارًا جديدًا، يمكنك بعد ذلك تشغيل مجموعة أخرى من الاختبارات مع تحديد المواصفات الجديدة في `--spec` جنبًا إلى جنب مع `--repeat` حتى يتم تشغيل الاختبار الجديد عدد x من المرات. إذا فشل الاختبار في أي من تلك المرات، فلن يتم دمج الاختبار وسيحتاج إلى النظر في سبب فشله.

```sh
# This will run the example.e2e.js spec 5 times
npx wdio run ./wdio.conf.js --spec example.e2e.js --repeat 5
```