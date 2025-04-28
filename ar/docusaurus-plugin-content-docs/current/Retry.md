---
id: retry
title: إعادة تشغيل الاختبارات غير المستقرة
---

يمكنك إعادة تشغيل اختبارات معينة باستخدام مشغل اختبار WebdriverIO والتي قد تكون غير مستقرة بسبب أشياء مثل مشكلات في الشبكة أو حالات تسابق. (ومع ذلك، لا يُنصح بزيادة معدل إعادة التشغيل ببساطة إذا أصبحت الاختبارات غير مستقرة!)

## إعادة تشغيل مجموعات الاختبار في Mocha

منذ الإصدار 3 من Mocha، يمكنك إعادة تشغيل مجموعات الاختبار بالكامل (كل شيء داخل كتلة `describe`). إذا كنت تستخدم Mocha، يجب عليك تفضيل آلية إعادة المحاولة هذه بدلاً من تنفيذ WebdriverIO الذي يسمح لك فقط بإعادة تشغيل كتل اختبار معينة (كل شيء داخل كتلة `it`). من أجل استخدام طريقة `this.retries()`، يجب أن تستخدم كتلة المجموعة `describe` دالة غير مرتبطة `function(){}` بدلاً من دالة السهم `() => {}`، كما هو موضح في [وثائق Mocha](https://mochajs.org/#arrow-functions). باستخدام Mocha يمكنك أيضًا تعيين عدد إعادة المحاولات لجميع الاختبارات باستخدام `mochaOpts.retries` في ملف `wdio.conf.js` الخاص بك.

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

## إعادة تشغيل اختبارات فردية في Jasmine أو Mocha

لإعادة تشغيل كتلة اختبار معينة يمكنك فقط تطبيق عدد من إعادة التشغيل كآخر معلمة بعد دالة كتلة الاختبار:

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

إذا كنت تستخدم Jasmine، فإن المعلمة الثانية محجوزة للمهلة. لتطبيق معلمة إعادة المحاولة، تحتاج إلى تعيين المهلة إلى قيمتها الافتراضية `jasmine.DEFAULT_TIMEOUT_INTERVAL` ثم تطبيق عدد إعادة المحاولات.

</TabItem>
</Tabs>

تسمح آلية إعادة المحاولة هذه فقط بإعادة تشغيل خطافات أو كتل اختبار فردية. إذا كان اختبارك مصحوبًا بخطاف لإعداد تطبيقك، فلن يتم تشغيل هذا الخطاف. [يقدم Mocha](https://mochajs.org/#retry-tests) إعادة محاولات الاختبار الأصلية التي توفر هذا السلوك بينما لا يقدمها Jasmine. يمكنك الوصول إلى عدد إعادة المحاولات المنفذة في خطاف `afterTest`.

## إعادة التشغيل في Cucumber

### إعادة تشغيل المجموعات الكاملة في Cucumber

بالنسبة لـ cucumber >= 6 يمكنك توفير خيار التكوين [`retry`](https://github.com/cucumber/cucumber-js/blob/master/docs/cli.md#retry-failing-tests) جنبًا إلى جنب مع معلمة `retryTagFilter` الاختيارية لإعادة محاولة كل أو بعض السيناريوهات الفاشلة حتى تنجح. لكي تعمل هذه الميزة، تحتاج إلى تعيين `scenarioLevelReporter` إلى `true`.

### إعادة تشغيل تعريفات الخطوات في Cucumber

لتحديد معدل إعادة التشغيل لتعريفات خطوات معينة، قم فقط بتطبيق خيار إعادة المحاولة عليها، مثل:

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

يمكن تحديد إعادة التشغيل فقط في ملف تعريفات الخطوات الخاص بك، وليس أبدًا في ملف الميزة الخاص بك.

## إضافة إعادة المحاولات على أساس كل ملف اختبار

في السابق، كانت إعادة المحاولات متاحة فقط على مستوى الاختبار والمجموعة، وهذا جيد في معظم الحالات.

ولكن في أي اختبارات تتضمن حالة (مثل على خادم أو في قاعدة بيانات)، قد تظل الحالة غير صالحة بعد فشل الاختبار الأول. قد لا تكون أي محاولات لاحقة لها فرصة للنجاح، بسبب الحالة غير الصالحة التي ستبدأ بها.

يتم إنشاء مثيل `browser` جديد لكل ملف اختبار، مما يجعل هذا مكانًا مثاليًا للربط وإعداد أي حالات أخرى (خادم، قواعد بيانات). تعني إعادة المحاولات على هذا المستوى أنه سيتم تكرار عملية الإعداد بالكامل ببساطة، تمامًا كما لو كانت لملف اختبار جديد.

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

## تشغيل اختبار معين عدة مرات

يهدف هذا إلى المساعدة في منع دخول الاختبارات غير المستقرة إلى قاعدة الشفرة. من خلال إضافة خيار سطر الأوامر `--repeat`، سيتم تشغيل المواصفات أو المجموعات المحددة N مرة. عند استخدام هذا العلم، يجب أيضًا تحديد العلم `--spec` أو `--suite`.

عند إضافة اختبارات جديدة إلى قاعدة شفرة، خاصة من خلال عملية CI/CD، يمكن أن تنجح الاختبارات ويتم دمجها ولكنها قد تصبح غير مستقرة لاحقًا. يمكن أن يأتي عدم الاستقرار هذا من عدد من الأشياء مثل مشكلات الشبكة أو حمل الخادم أو حجم قاعدة البيانات وما إلى ذلك. يمكن أن يساعد استخدام العلم `--repeat` في عملية CD/CD الخاصة بك في اكتشاف هذه الاختبارات غير المستقرة قبل دمجها في قاعدة الشفرة الرئيسية.

إحدى الاستراتيجيات التي يمكن استخدامها هي تشغيل اختباراتك كالمعتاد في عملية CI/CD الخاصة بك، ولكن إذا كنت تقدم اختبارًا جديدًا، يمكنك بعد ذلك تشغيل مجموعة أخرى من الاختبارات مع المواصفات الجديدة المحددة في `--spec` جنبًا إلى جنب مع `--repeat` بحيث يتم تشغيل الاختبار الجديد x عدد من المرات. إذا فشل الاختبار في أي من هذه المرات، فلن يتم دمج الاختبار وسيحتاج إلى النظر في سبب فشله.

```sh
# This will run the example.e2e.js spec 5 times
npx wdio run ./wdio.conf.js --spec example.e2e.js --repeat 5
```