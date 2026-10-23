---
id: frameworks
title: أطر العمل
description: "قم بتكوين Mocha أو Jasmine أو Cucumber.js كإطار عمل للاختبار لمشغل اختبارات WDIO، أو ادمج أطر عمل خارجية مثل Serenity/JS."
---

يحتوي WebdriverIO Runner على دعم مدمج لـ [Mocha](http://mochajs.org/) و[Jasmine](http://jasmine.github.io/) و[Cucumber.js](https://cucumber.io/). يمكنك أيضًا دمجه مع أطر عمل خارجية مفتوحة المصدر، مثل [Serenity/JS](#using-serenityjs).

:::tip دمج WebdriverIO مع أطر عمل الاختبار
لدمج WebdriverIO مع إطار عمل اختبار، تحتاج إلى حزمة محوّل (adapter) متاحة على NPM.
لاحظ أنه يجب تثبيت حزمة المحوّل في نفس الموقع الذي تم فيه تثبيت WebdriverIO.
لذلك، إذا قمت بتثبيت WebdriverIO بشكل عام (globally)، فتأكد من تثبيت حزمة المحوّل بشكل عام أيضًا.
:::

يتيح لك دمج WebdriverIO مع إطار عمل اختبار الوصول إلى نسخة WebDriver باستخدام المتغير العام `browser`
في ملفات المواصفات (spec files) أو تعريفات الخطوات (step definitions).
لاحظ أن WebdriverIO سيتولى أيضًا إنشاء جلسة Selenium وإنهاءها، لذلك لا يتعين عليك القيام بذلك
بنفسك.

## استخدام Mocha

أولاً، قم بتثبيت حزمة المحوّل من NPM:

```bash npm2yarn
npm install @wdio/mocha-framework --save-dev
```

يوفر WebdriverIO افتراضيًا [مكتبة تأكيدات](assertion) مدمجة يمكنك البدء بها على الفور:

```js
describe('my awesome website', () => {
    it('should do some assertions', async () => {
        await browser.url('https://webdriver.io')
        await expect(browser).toHaveTitle('WebdriverIO · Next-gen browser and mobile automation test framework for Node.js | WebdriverIO')
    })
})
```

يأتي WebdriverIO v10 مع [Mocha 12](https://mochajs.org/) ويدعم [واجهات](https://mochajs.org/#interfaces) Mocha وهي `BDD` (الافتراضية) و`TDD` و`QUnit`.

إذا كنت ترغب في كتابة مواصفاتك بأسلوب TDD، فاضبط خاصية `ui` في إعدادات `mochaOpts` على `tdd`. الآن يجب كتابة ملفات الاختبار الخاصة بك على هذا النحو:

```js
suite('my awesome website', () => {
    test('should do some assertions', async () => {
        await browser.url('https://webdriver.io')
        await expect(browser).toHaveTitle('WebdriverIO · Next-gen browser and mobile automation test framework for Node.js | WebdriverIO')
    })
})
```

إذا كنت ترغب في تحديد إعدادات أخرى خاصة بـ Mocha، يمكنك القيام بذلك باستخدام المفتاح `mochaOpts` في ملف الإعدادات الخاص بك. يمكن العثور على قائمة بجميع الخيارات على [موقع مشروع Mocha](https://mochajs.org/api/mocha).

__ملاحظة:__ لا يدعم WebdriverIO الاستخدام المهمل (deprecated) لاستدعاءات `done` في Mocha:

```js
it('should test something', (done) => {
    done() // throws "done is not a function"
})
```

### خيارات Mocha

يمكن تطبيق الخيارات التالية في ملف `wdio.conf.js` لتكوين بيئة Mocha الخاصة بك. __ملاحظة:__ ليست كل خيارات Mocha مدعومة. لا يزال `parallel` ينتمي إلى مجموعة العمال (worker pool) الخاصة بـ Mocha وسيؤدي إلى خطأ هنا — إذ يقوم مشغل اختبارات WDIO بالفعل بتشغيل المواصفات بالتوازي عبر القدرات (capabilities) والعمال. لتشغيل اختبارات ملف مواصفات واحد في نفس الوقت، استخدم [`parallelMode`](#parallelmode). كما انتقلت واجهة سطر الأوامر في Mocha 12 من yargs إلى `util.parseArgs` الخاص بـ Node؛ وهذا يؤثر فقط على الاستدعاء المباشر لـ `mocha`، وليس على `mochaOpts` الممررة عبر `wdio`. يمكنك تمرير خيارات إطار العمل هذه كوسائط، على سبيل المثال:

```sh
wdio run wdio.conf.ts --mochaOpts.grep "my test" --mochaOpts.bail --no-mochaOpts.checkLeaks
```

سيؤدي هذا إلى تمرير خيارات Mocha التالية:

```ts
{
    grep: ['my-test'],
    bail: true
    checkLeacks: false
}
```

خيارات Mocha التالية مدعومة:

#### require

<Option type="string|string[]" default="[]">

يكون خيار `require` مفيدًا عندما تريد إضافة أو توسيع بعض الوظائف الأساسية (خيار إطار عمل WebdriverIO).

</Option>

#### allowUncaught

<Option type="boolean" default="false">

نشر الأخطاء غير الملتقطة.

</Option>

#### bail

<Option type="boolean" default="false">

التوقف بعد فشل أول اختبار.

</Option>

#### checkLeaks

<Option type="boolean" default="false">

التحقق من تسرب المتغيرات العامة.

</Option>

#### delay

<Option type="boolean" default="false">

تأخير تنفيذ المجموعة الجذرية (root suite).

</Option>

#### failHookAffectedTests

<Option type="boolean" default="true">

الإبلاغ عن كل اختبار تم تخطيه بسبب فشل خطاف `before` أو `beforeEach` على أنه فشل. يُفعّل WebdriverIO هذا الخيار بحيث يكون خطاف الإعداد المعطل مرئيًا في كل مواصفة تم تخطيها بسببه. اضبطه على `false` للإبلاغ عن الخطاف فقط.

</Option>

#### fgrep

<Option type="string" default="null">

تصفية الاختبارات بناءً على سلسلة نصية معطاة.

</Option>

#### forbidOnly

<Option type="boolean" default="false">

الاختبارات المميزة بـ `only` تؤدي إلى فشل المجموعة.

</Option>

#### forbidPending

<Option type="boolean" default="false">

الاختبارات المعلقة تؤدي إلى فشل المجموعة.

</Option>

#### fullTrace

<Option type="boolean" default="false">

تتبع كامل للمكدس (stacktrace) عند الفشل.

</Option>

#### global

<Option type="string[]" default="[]">

المتغيرات المتوقعة في النطاق العام.

</Option>

#### grep

<Option type="RegExp|string" default="null">

تصفية الاختبارات بناءً على تعبير نمطي معطى. يقبل Mocha 12 علامات RegExp الحديثة في هذا المرشح (على سبيل المثال `s` أو `d`).

</Option>

#### invert

<Option type="boolean" default="false">

عكس نتائج مطابقة مرشح الاختبارات.

</Option>

#### maxParallelContexts

<Option type="number" default="os.cpus().length">

عدد الاختبارات التي تعمل في نفس الوقت عند ضبط [`parallelMode`](#parallelmode). راجع [الاختبارات المتوازية في ملف مواصفات](./ParallelTests.md#options).

</Option>

#### parallelMode

<Option type="'contexts' | 'userContexts'" default="undefined">

تشغيل اختبارات ملف مواصفات في نفس الوقت، كل منها في سياق تصفح WebDriver BiDi خاص به. يشارك `'contexts'` ملفات تعريف الارتباط والتخزين بين الاختبارات، بينما يعزلها `'userContexts'`. يتطلب القدرة `'wdio:experimentalBiDiCommands': true`. الخياران `bail` و`retries` غير مدعومين في هذا الوضع. راجع [الاختبارات المتوازية في ملف مواصفات](./ParallelTests.md).

</Option>

#### retries

<Option type="number" default="0">

عدد مرات إعادة محاولة الاختبارات الفاشلة.

</Option>

#### timeout

<Option type="number" default="30000">

قيمة حد المهلة الزمنية (بالمللي ثانية).

</Option>

## استخدام Jasmine

أولاً، قم بتثبيت حزمة المحوّل من NPM:

```bash npm2yarn
npm install @wdio/jasmine-framework --save-dev
```

يمكنك بعد ذلك تكوين بيئة Jasmine الخاصة بك عن طريق تعيين خاصية `jasmineOpts` في إعداداتك. يمكن العثور على قائمة بجميع الخيارات على [موقع مشروع Jasmine](https://jasmine.github.io/api/edge/Configuration.html).

### خيارات Jasmine

يمكن تطبيق الخيارات التالية في ملف `wdio.conf.js` لتكوين بيئة Jasmine الخاصة بك باستخدام خاصية `jasmineOpts`. لمزيد من المعلومات حول خيارات التكوين هذه، راجع [وثائق Jasmine](https://jasmine.github.io/api/edge/Configuration). يمكنك تمرير خيارات إطار العمل هذه كوسائط، على سبيل المثال:

```sh
wdio run wdio.conf.ts --jasmineOpts.grep "my test" --jasmineOpts.failSpecWithNoExpectations --no-jasmineOpts.random
```

سيؤدي هذا إلى تمرير خيارات Jasmine التالية:

```ts
{
    grep: 'my test',
    failSpecWithNoExpectations: true,
    random: false
}
```

خيارات Jasmine التالية مدعومة:

#### defaultTimeoutInterval

<Option type="number" default="60000">

الفاصل الزمني الافتراضي للمهلة لعمليات Jasmine.

</Option>

#### helpers

<Option type="string[]" default="[]">

مصفوفة من مسارات الملفات (وأنماط glob) بالنسبة إلى spec_dir ليتم تضمينها قبل مواصفات jasmine.

</Option>

#### requires

<Option type="string[]" default="[]">

يكون خيار `requires` مفيدًا عندما تريد إضافة أو توسيع بعض الوظائف الأساسية.

</Option>

#### random

<Option type="boolean" default="false">

ما إذا كان سيتم ترتيب تنفيذ المواصفات عشوائيًا. القيمة الافتراضية في Jasmine نفسه هي `true`، لكن WebdriverIO يشغل المواصفات بالترتيب ما لم تقم بتعيين هذا الخيار.

</Option>

#### seed

<Option type="Function" default="null">

البذرة (seed) المستخدمة كأساس للترتيب العشوائي. القيمة Null تؤدي إلى تحديد البذرة عشوائيًا في بداية التنفيذ.

</Option>

#### failSpecWithNoExpectations

<Option type="boolean" default="false">

ما إذا كان سيتم إفشال المواصفة إذا لم تنفذ أي توقعات. افتراضيًا، يتم الإبلاغ عن المواصفة التي لم تنفذ أي توقعات على أنها ناجحة. تعيين هذا الخيار إلى true سيؤدي إلى الإبلاغ عن مثل هذه المواصفة على أنها فاشلة.

</Option>

#### oneFailurePerSpec

<Option type="boolean" default="false">

إيقاف المواصفة عند أول توقع فاشل. يوقف المطابِق المتزامن الفاشل المواصفة فورًا، ويوقفها المطابِق غير المتزامن المنتظَر (awaited) عند استقرار الوعد (promise) الخاص به. تستمر المواصفات الأخرى في العمل.

</Option>

#### specFilter

<Option type="Function" default="(spec) => true">

دالة تُستخدم لتصفية المواصفات.

</Option>

#### grep

<Option type="string|Regexp" default="null">

تشغيل الاختبارات المطابقة لهذه السلسلة النصية أو التعبير النمطي فقط. (ينطبق فقط إذا لم يتم تعيين دالة `specFilter` مخصصة)

</Option>

#### invertGrep

<Option type="boolean" default="false">

إذا كانت القيمة true فإنها تعكس الاختبارات المطابقة وتشغل فقط الاختبارات التي لا تطابق التعبير المستخدم في `grep`. (ينطبق فقط إذا لم يتم تعيين دالة `specFilter` مخصصة)

</Option>

#### stopOnSpecFailure

<Option type="boolean" default="false">

إيقاف ملف المواصفات عند أول مواصفة فاشلة (`it`): لا يتم تشغيل المواصفات الأخرى في الملف، بما في ذلك تلك الموجودة في كتل `describe` الأخرى. تعمل ملفات المواصفات الأخرى في عمالها الخاصين وتستمر.

</Option>

#### cleanStack

<Option type="boolean" default="true">

إزالة أسطر حزم `node_modules` من تتبعات المكدس الخاصة بحالات الفشل.

</Option>

#### expectationResultHandler

<Option type="Function" default="null">

يتم استدعاؤها مع `(passed, assertion)` لكل توقع، على سبيل المثال لالتقاط لقطة شاشة عند فشل توقع ما. إذا ألقت الدالة خطأً لتوقع ناجح، فسيفشل التوقع بذلك الخطأ.

</Option>

### التأكيدات

مع Jasmine، يجمع `expect` العام بين مطابِقات Jasmine و[مطابِقات WebdriverIO](/docs/api/expect-webdriverio):

- مطابِقات Jasmine (`toBe`، `toEqual`، `toHaveBeenCalled`، …) والمطابِقات التي تضيفها باستخدام `jasmine.addMatchers` متزامنة. فهي تُرجع `undefined`، لذا لا تحتاج إلى `await`.
- مطابِقات WebdriverIO، ومطابِقات Jasmine غير المتزامنة (`toBeResolved`، `toBeRejectedWith`، …) والمطابِقات التي تضيفها باستخدام `jasmine.addAsyncMatchers` تُرجع وعدًا (promise). استخدم دائمًا `await` معها.

استخدم `expect()` لكلا النوعين: فهي ترسل كل مطابِق إلى `expect` أو `expectAsync` الخاصين بـ Jasmine نيابةً عنك. كما يعمل `await expectAsync($('#logo')).toBeDisplayed()` أيضًا. بالنسبة لـ TypeScript، فإن إضافة `@wdio/jasmine-framework` في `types` تمنح أيضًا `expectAsync()` مطابِقات WebdriverIO.

```js
it('checks the page', async () => {
    expect([1, 2]).toHaveSize(2)                                   // Jasmine, sync
    await expect($('#logo')).toHaveSize({ width: 32, height: 32 }) // WebdriverIO, async
    await expect(loadData()).toBeResolved()                        // Jasmine async matcher
})
```

يوجد `toHaveSize` في كلتا المكتبتين. يعمل مطابِق WebdriverIO على قيم WebdriverIO: عنصر، أو مصفوفة عناصر أو `Element[]` (على سبيل المثال نتيجة `$$().filter()`)، أو عنصر multi-remote، أو متصفح، أو سياق تصفح، أو mock، أو المغلِّف `some()`، أو وعد مثل `$()` القابل للتسلسل. يعمل مطابِق Jasmine على كل القيم الأخرى.

تعمل المطابِقات غير المتماثلة (asymmetric matchers) لكلتا المكتبتين، في Jasmine وفي مطابِقات WebdriverIO: `jasmine.any()`، `jasmine.objectContaining()`، `jasmine.stringMatching()`، … و`expect.any()`، `expect.stringContaining()`، `expect.oneOf()`، `expect.multiRemote()`، `expect.not.stringContaining()`، …. لاستخدام `some()`، قم باستيرادها:

```js
import { some } from 'expect-webdriverio/api'

await expect(some($$('li'))).toHaveAttribute('data-state', 'on')
```

أجزاء Jest من `expect` غير متاحة مع Jasmine: المطابِقات الخاصة بـ Jest فقط مثل `toStrictEqual` أو `toHaveLength`، و`expect.soft()`. لإضافة مطابِق مخصص، استخدم `expect.extend()` في ملف مواصفات أو في خطاف `before` (راجع [المطابِقات المخصصة](/docs/custommatchers))، أو `jasmine.addMatchers` لمطابِق متزامن و`jasmine.addAsyncMatchers` لمطابِق غير متزامن.

بالنسبة لـ TypeScript، أضف `jasmine` إلى `types`، راجع [إعداد TypeScript](/docs/typescript).

## استخدام Cucumber

أولاً، قم بتثبيت حزمة المحوّل من NPM:

```bash npm2yarn
npm install @wdio/cucumber-framework --save-dev
```

إذا كنت ترغب في استخدام Cucumber، فاضبط خاصية `framework` على `cucumber` عن طريق إضافة `framework: 'cucumber'` إلى [ملف الإعدادات](configurationfile).

يمكن تحديد خيارات Cucumber في ملف الإعدادات باستخدام `cucumberOpts`. اطلع على القائمة الكاملة للخيارات [هنا](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-cucumber-framework#cucumberopts-options). يستخدم المحوّل Cucumber 13. تمت إزالة `tagExpression`؛ استخدم `tags` للتصفية. راجع [دليل الترحيل إلى v10](v10-migration#cucumber).

للبدء بسرعة مع Cucumber، ألقِ نظرة على مشروعنا [`cucumber-boilerplate`](https://github.com/webdriverio/cucumber-boilerplate) الذي يأتي مع جميع تعريفات الخطوات التي تحتاجها للبدء، وستتمكن من كتابة ملفات الميزات (feature files) على الفور.

### خيارات Cucumber

يمكن تطبيق الخيارات التالية في ملف `wdio.conf.js` لتكوين بيئة Cucumber الخاصة بك باستخدام خاصية `cucumberOpts`:

:::tip تعديل الخيارات عبر سطر الأوامر
يمكن تحديد `cucumberOpts`، مثل `tags` المخصصة لتصفية الاختبارات، عبر سطر الأوامر. يتم ذلك باستخدام الصيغة `cucumberOpts.{optionName}="value"`.

على سبيل المثال، إذا كنت تريد تشغيل الاختبارات الموسومة بـ `@smoke` فقط، يمكنك استخدام الأمر التالي:

```sh
# When you only want to run tests that hold the tag "@smoke"
npx wdio run ./wdio.conf.js --cucumberOpts.tags="@smoke"
npx wdio run ./wdio.conf.js --cucumberOpts.name="some scenario name" --cucumberOpts.failFast
```

يضبط هذا الأمر خيار `tags` في `cucumberOpts` على `@smoke`، مما يضمن تنفيذ الاختبارات التي تحمل هذا الوسم فقط.

:::

#### backtrace

<Option type="Boolean" default="false">

عرض التتبع الكامل للأخطاء.

</Option>

#### requireModule

<Option type="string[]" default="[]">

تحميل الوحدات (modules) قبل تحميل أي ملفات دعم.

</Option>
مثال:

```js
cucumberOpts: {
    requireModule: ['@babel/register']
    // or
    requireModule: [
        [
            '@babel/register',
            {
                rootMode: 'upward',
                ignore: ['node_modules']
            }
        ]
    ]
 }
 ```

#### failFast

<Option type="boolean" default="false">

إيقاف التشغيل عند أول فشل.

</Option>

#### name

<Option type="RegExp[]" default="[]">

تنفيذ السيناريوهات التي يطابق اسمها التعبير فقط (قابل للتكرار).

</Option>

#### require

<Option type="string[]" default="[]">

تحميل الملفات التي تحتوي على تعريفات الخطوات قبل تنفيذ الميزات. يمكنك أيضًا تحديد نمط glob لتعريفات الخطوات الخاصة بك.

</Option>
مثال:

```js
cucumberOpts: {
    require: [path.join(__dirname, 'step-definitions', 'my-steps.js')]
}
```

#### import

<Option type="String[]" default="[]">

المسارات إلى مكان وجود كود الدعم الخاص بك، لـ ESM.

</Option>
مثال:

```js
cucumberOpts: {
    import: [path.join(__dirname, 'step-definitions', 'my-steps.js')]
}
```

#### strict

<Option type="boolean" default="false">

إفشال التشغيل عند وجود خطوة معلقة. تؤدي الخطوة غير المعرّفة إلى إفشال التشغيل حتى بدون `strict`، ما لم تكن قيمة [`ignoreUndefinedDefinitions`](#ignoreundefineddefinitions) هي `true`.

</Option>

#### tags

<Option type="String" default="">

تنفيذ الميزات أو السيناريوهات التي تطابق وسومها التعبير فقط. يتم الإبلاغ عن ملف الميزة الذي لا يحتوي على سيناريو مطابق على أنه متخطى ولا يبدأ أي جلسة متصفح.
يرجى مراجعة [وثائق Cucumber](https://docs.cucumber.io/cucumber/api/#tag-expressions) لمزيد من التفاصيل.

</Option>

#### timeout

<Option type="Number" default="60000">

المهلة الزمنية بالمللي ثانية لتعريفات الخطوات.

</Option>

#### retry

<Option type="Number" default="0">

تحديد عدد مرات إعادة محاولة حالات الاختبار الفاشلة.

</Option>

#### retryTagFilter

<Option type="String">

إعادة محاولة السيناريوهات التي تطابق وسومها تعبير الوسم فقط. يتطلب [`retry`](#retry).

</Option>

#### language

<Option type="String" default="en">

اللغة الافتراضية لملفات الميزات الخاصة بك

</Option>

#### order

<Option type="String" default="defined">

تشغيل السيناريوهات بترتيب ملفات الميزات (`'defined'`) أو بترتيب عشوائي (`'random'`). مع `'random:<seed>'`، على سبيل المثال `'random:42'`، يكون الترتيب العشوائي هو نفسه في كل تشغيل. مع `'random'`، يعرض السجل بذرة التشغيل (`Random order using seed: 42`).

</Option>

#### format

<Option type="string[]">

اسم ومسار ملف الإخراج للمنسّق (formatter) المراد استخدامه.
يدعم WebdriverIO بشكل أساسي فقط [المنسّقات](https://github.com/cucumber/cucumber-js/blob/main/docs/formatters.md) التي تكتب الإخراج إلى ملف. لا تعمل المنسّقات مع [`parallelMode`](#parallelmode-1).

</Option>

#### formatOptions

<Option type="object">

الخيارات التي سيتم توفيرها للمنسّقات

</Option>

#### tagsInTitle

<Option type="Boolean" default="false">

إضافة وسوم cucumber إلى اسم الميزة أو السيناريو

</Option>
***يرجى ملاحظة أن هذا خيار خاص بـ @wdio/cucumber-framework ولا يتعرف عليه cucumber-js نفسه***<br/>

#### ignoreUndefinedDefinitions

<Option type="Boolean" default="false">

الإبلاغ عن الخطوة غير المعرّفة على أنها معلقة، مع إضافة ` (undefined step)` في نهاية عنوانها، وعدم إفشال التشغيل بسببها.

</Option>
***يرجى ملاحظة أن هذا خيار خاص بـ @wdio/cucumber-framework ولا يتعرف عليه cucumber-js نفسه***<br/>

#### failAmbiguousDefinitions

<Option type="Boolean" default="false">

الإبلاغ عن الخطوة الغامضة (خطوة تطابق أكثر من تعريف خطوة واحد) على أنها فاشلة، مع قائمة تعريفات الخطوات المطابقة. مع `false`، يتم الإبلاغ عن الخطوة على أنها متخطاة، مع القائمة كسبب لذلك. في كلتا الحالتين، يفشل التشغيل. استثناء: بدون `parallelMode`، ينجح التشغيل مع `ignoreUndefinedDefinitions: true` و`failAmbiguousDefinitions: false`.

</Option>
***يرجى ملاحظة أن هذا خيار خاص بـ @wdio/cucumber-framework ولا يتعرف عليه cucumber-js نفسه***<br/>

#### profiles

<Option type="string[]" default="[]">

ملفات التعريف (profiles) الخاصة بملف إعدادات Cucumber المراد استخدامها.

</Option>
***يرجى ملاحظة أن قيمًا محددة فقط (worldParameters، name، retryTagFilter) مدعومة داخل ملفات التعريف، لأن `cucumberOpts` لها الأولوية. بالإضافة إلى ذلك، عند استخدام ملف تعريف، تأكد من عدم تعريف القيم المذكورة داخل `cucumberOpts`.***

#### file

<Option type="string | false" default="undefined">

مسار ملف إعدادات Cucumber المراد تحميله، أو `false` لعدم تحميل أي ملف. بدونه، يبحث Cucumber عن ملفات الإعدادات الافتراضية الخاصة به.

</Option>

#### dryRun

<Option type="Boolean" default="false">

عدم تشغيل أي خطوة أو خطاف: يقوم Cucumber فقط بمطابقة كل خطوة مع تعريفات الخطوات الخاصة بها، لذلك لا يزال يتم الإبلاغ عن الخطوات غير المعرّفة والغامضة. لا يفشل التشغيل.

</Option>

#### worldParameters

<Option type="object" default="{}">

معلمات World الخاص بك، على هيئة `this.parameters`.

</Option>

#### scenarioLevelReporter

<Option type="Boolean" default="false">

الإبلاغ عن كل سيناريو كاختبار واحد. لا يتم الإبلاغ عن خطواته وخطافاته.

</Option>
***يرجى ملاحظة أن هذا خيار خاص بـ @wdio/cucumber-framework ولا يتعرف عليه cucumber-js نفسه***<br/>

#### parallelMode

<Option type="'contexts' | 'userContexts'" default="undefined">

تشغيل سيناريوهات ملف الميزة في نفس الوقت، كل منها في سياق تصفح WebDriver BiDi خاص به. يشارك `'contexts'` ملفات تعريف الارتباط والتخزين بين السيناريوهات، بينما يعزلها `'userContexts'`. يتطلب القدرة `'wdio:experimentalBiDiCommands': true`. راجع [الاختبارات المتوازية في ملف مواصفات](./ParallelTests.md).

</Option>
***يرجى ملاحظة أن هذا خيار خاص بـ @wdio/cucumber-framework ولا يتعرف عليه cucumber-js نفسه***<br/>

#### maxParallelContexts

<Option type="number" default="os.cpus().length">

عدد السيناريوهات التي تعمل في نفس الوقت عند ضبط [`parallelMode`](#parallelmode-1). راجع [الاختبارات المتوازية في ملف مواصفات](./ParallelTests.md#options).

</Option>
***يرجى ملاحظة أن هذا خيار خاص بـ @wdio/cucumber-framework ولا يتعرف عليه cucumber-js نفسه***<br/>

### تخطي الاختبارات في cucumber

لاحظ أنه إذا كنت تريد تخطي اختبار باستخدام إمكانيات تصفية اختبارات cucumber العادية المتاحة في `cucumberOpts`، فستقوم بذلك لجميع المتصفحات والأجهزة المكوّنة في القدرات (capabilities). لكي تتمكن من تخطي السيناريوهات لمجموعات قدرات محددة فقط دون بدء جلسة إذا لم يكن ذلك ضروريًا، يوفر webdriverio صيغة الوسم الخاصة التالية لـ cucumber:

`@skip([condition])`

حيث يكون الشرط (condition) مزيجًا اختياريًا من خصائص القدرات مع قيمها، والتي عند مطابقتها **جميعًا** ستؤدي إلى تخطي السيناريو أو الميزة الموسومة. بالطبع يمكنك إضافة عدة وسوم إلى السيناريوهات والميزات لتخطي الاختبارات في ظل عدة شروط مختلفة.

يمكنك أيضًا استخدام التعليق التوضيحي '@skip' لتخطي الاختبارات دون تغيير `tags`. في هذه الحالة سيتم عرض الاختبارات المتخطاة في تقرير الاختبار.

إليك بعض الأمثلة على هذه الصيغة:
- `@skip` أو `@skip()`: سيتخطى العنصر الموسوم دائمًا
- `@skip(browserName="chrome")`: لن يتم تنفيذ الاختبار على متصفحات chrome.
- `@skip(browserName="firefox";platformName="linux")`: سيتخطى الاختبار في عمليات تنفيذ firefox على linux.
- `@skip(browserName=["chrome","firefox"])`: سيتم تخطي العناصر الموسومة لكل من متصفحي chrome وfirefox.
- `@skip(browserName=/i.*explorer/)`: سيتم تخطي القدرات ذات المتصفحات المطابقة للتعبير النمطي (مثل `iexplorer`، `internet explorer`، `internet-explorer`، ...).

### استيراد مساعد تعريف الخطوات

لاستخدام مساعد تعريف الخطوات مثل `Given` أو `When` أو `Then` أو الخطافات، يُفترض أن تستوردها من `@cucumber/cucumber`، على سبيل المثال هكذا:

```js
import { Given, When, Then } from '@cucumber/cucumber'
```

الآن، إذا كنت تستخدم Cucumber بالفعل لأنواع أخرى من الاختبارات غير المتعلقة بـ WebdriverIO والتي تستخدم لها إصدارًا محددًا، فأنت بحاجة إلى استيراد هذه المساعدات في اختبارات e2e الخاصة بك من حزمة WebdriverIO Cucumber، على سبيل المثال:

```js
import { Given, When, Then, world, context } from '@wdio/cucumber-framework'
```

يضمن هذا استخدامك للمساعدات الصحيحة داخل إطار عمل WebdriverIO ويتيح لك استخدام إصدار Cucumber مستقل لأنواع أخرى من الاختبارات.

### نشر التقرير

يوفر Cucumber ميزة لنشر تقارير تشغيل الاختبارات الخاصة بك إلى `https://reports.cucumber.io/`، والتي يمكن التحكم فيها إما عن طريق تعيين علامة `publish` في `cucumberOpts` أو عن طريق تكوين متغير البيئة `CUCUMBER_PUBLISH_TOKEN`. ومع ذلك، عند استخدام `WebdriverIO` لتنفيذ الاختبارات، هناك قيد في هذا النهج. فهو يحدّث التقارير بشكل منفصل لكل ملف ميزة، مما يجعل من الصعب عرض تقرير موحد.

للتغلب على هذا القيد، قدمنا دالة قائمة على الوعود (promise) تسمى `publishCucumberReport` ضمن `@wdio/cucumber-framework`. يجب استدعاء هذه الدالة في خطاف `onComplete`، وهو المكان الأمثل لاستدعائها. تتطلب `publishCucumberReport` إدخال دليل التقارير حيث يتم تخزين تقارير رسائل cucumber.

يمكنك إنشاء تقارير `cucumber message` عن طريق تكوين خيار `format` في `cucumberOpts` الخاصة بك. يوصى بشدة بتوفير اسم ملف ديناميكي ضمن خيار تنسيق `cucumber message` لمنع الكتابة فوق التقارير وضمان تسجيل كل تشغيل اختبار بدقة.

قبل استخدام هذه الدالة، تأكد من تعيين متغيرات البيئة التالية:
- CUCUMBER_PUBLISH_REPORT_URL: عنوان URL الذي تريد نشر تقرير Cucumber عليه. إذا لم يتم توفيره، فسيتم استخدام عنوان URL الافتراضي 'https://messages.cucumber.io/api/reports'.
- CUCUMBER_PUBLISH_REPORT_TOKEN: رمز التفويض المطلوب لنشر التقرير. إذا لم يتم تعيين هذا الرمز، فستنتهي الدالة دون نشر التقرير.

إليك مثال على التكوينات الضرورية وعينات الكود للتنفيذ:

```javascript
import { v4 as uuidv4 } from 'uuid'
import { publishCucumberReport } from '@wdio/cucumber-framework';

export const config = {
    // ... Other Configuration Options
    cucumberOpts: {
        // ... Cucumber Options Configuration
        format: [
            ['message', `./reports/${uuidv4()}.ndjson`],
            ['json', './reports/test-report.json']
        ]
    },
    async onComplete() {
        await publishCucumberReport('./reports');
    }
}
```

يرجى ملاحظة أن `./reports/` هو الدليل الذي سيتم فيه تخزين تقارير `cucumber message`.

## استخدام Serenity/JS

[Serenity/JS](https://serenity-js.org?pk_campaign=wdio8&pk_source=webdriver.io) هو إطار عمل مفتوح المصدر مصمم لجعل اختبارات القبول والانحدار للأنظمة البرمجية المعقدة أسرع وأكثر تعاونية وأسهل في التوسع.

بالنسبة لمجموعات اختبارات WebdriverIO، يوفر Serenity/JS:
- [تقارير محسّنة](https://serenity-js.org/handbook/reporting/?pk_campaign=wdio8&pk_source=webdriver.io) - يمكنك استخدام Serenity/JS
  كبديل مباشر لأي إطار عمل مدمج في WebdriverIO لإنتاج تقارير تنفيذ اختبارات متعمقة ووثائق حية لمشروعك.
- [واجهات برمجة نمط Screenplay](https://serenity-js.org/handbook/design/screenplay-pattern/?pk_campaign=wdio8&pk_source=webdriver.io) - لجعل كود الاختبار الخاص بك قابلاً للنقل وإعادة الاستخدام عبر المشاريع والفرق،
  يمنحك Serenity/JS [طبقة تجريد](https://serenity-js.org/api/webdriverio?pk_campaign=wdio8&pk_source=webdriver.io) اختيارية فوق واجهات برمجة WebdriverIO الأصلية.
- [مكتبات التكامل](https://serenity-js.org/api/core/?pk_campaign=wdio8&pk_source=webdriver.io) - بالنسبة لمجموعات الاختبار التي تتبع نمط Screenplay،
  يوفر Serenity/JS أيضًا مكتبات تكامل اختيارية لمساعدتك في كتابة [اختبارات API](https://serenity-js.org/api/rest/?pk_campaign=wdio8&pk_source=webdriver.io)،
  و[إدارة الخوادم المحلية](https://serenity-js.org/api/local-server/?pk_campaign=wdio8&pk_source=webdriver.io)، و[إجراء التأكيدات](https://serenity-js.org/api/assertions/?pk_campaign=wdio8&pk_source=webdriver.io)، والمزيد!

![Serenity BDD Report Example](/img/serenity-bdd-reporter.png)

### تثبيت Serenity/JS

لإضافة Serenity/JS إلى [مشروع WebdriverIO موجود](https://webdriver.io/docs/gettingstarted)، قم بتثبيت وحدات Serenity/JS التالية من NPM:

```sh npm2yarn
npm install @serenity-js/{core,web,webdriverio,assertions,console-reporter,serenity-bdd} --save-dev
```

تعرّف على المزيد حول وحدات Serenity/JS:
- [`@serenity-js/core`](https://serenity-js.org/api/core/?pk_campaign=wdio8&pk_source=webdriver.io)
- [`@serenity-js/web`](https://serenity-js.org/api/web/?pk_campaign=wdio8&pk_source=webdriver.io)
- [`@serenity-js/webdriverio`](https://serenity-js.org/api/webdriverio/?pk_campaign=wdio8&pk_source=webdriver.io)
- [`@serenity-js/assertions`](https://serenity-js.org/api/assertions/?pk_campaign=wdio8&pk_source=webdriver.io)
- [`@serenity-js/console-reporter`](https://serenity-js.org/api/console-reporter/?pk_campaign=wdio8&pk_source=webdriver.io)
- [`@serenity-js/serenity-bdd`](https://serenity-js.org/api/serenity-bdd/?pk_campaign=wdio8&pk_source=webdriver.io)

### تكوين Serenity/JS

لتمكين التكامل مع Serenity/JS، قم بتكوين WebdriverIO على النحو التالي:

<Tabs>
<TabItem value="wdio-conf-typescript" label="TypeScript" default>

```typescript title="wdio.conf.ts"
import { WebdriverIOConfig } from '@serenity-js/webdriverio';

export const config: WebdriverIOConfig = {

    // أخبر WebdriverIO باستخدام إطار عمل Serenity/JS
    framework: '@serenity-js/webdriverio',

    // إعدادات Serenity/JS
    serenity: {
        // قم بتكوين Serenity/JS لاستخدام المحوّل المناسب لمشغل الاختبارات الخاص بك
        runner: 'cucumber',
        // runner: 'mocha',
        // runner: 'jasmine',

        // سجّل خدمات التقارير في Serenity/JS، والمعروفة أيضًا باسم "طاقم المسرح"
        crew: [
            // اختياري، طباعة نتائج تنفيذ الاختبارات إلى المخرجات القياسية
            '@serenity-js/console-reporter',

            // اختياري، إنتاج تقارير Serenity BDD ووثائق حية (HTML)
            '@serenity-js/serenity-bdd',
            [ '@serenity-js/core:ArtifactArchiver', { outputDirectory: 'target/site/serenity' } ],

            // اختياري، التقاط لقطات الشاشة تلقائيًا عند فشل التفاعل
            [ '@serenity-js/web:Photographer', { strategy: 'TakePhotosOfFailures' } ],
        ]
    },

    // قم بتكوين مشغل Cucumber الخاص بك
    cucumberOpts: {
        // راجع خيارات تكوين Cucumber أدناه
    },

    // ... أو مشغل Jasmine
    jasmineOpts: {
        // راجع خيارات تكوين Jasmine أدناه
    },

    // ... أو مشغل Mocha
    mochaOpts: {
        // راجع خيارات تكوين Mocha أدناه
    },

    runner: 'local',

    // أي إعدادات أخرى لـ WebdriverIO
};
```

</TabItem>
<TabItem value="wdio-conf-javascript" label="JavaScript">

```typescript title="wdio.conf.js"
export const config = {

    // أخبر WebdriverIO باستخدام إطار عمل Serenity/JS
    framework: '@serenity-js/webdriverio',

    // إعدادات Serenity/JS
    serenity: {
        // قم بتكوين Serenity/JS لاستخدام المحوّل المناسب لمشغل الاختبارات الخاص بك
        runner: 'cucumber',
        // runner: 'mocha',
        // runner: 'jasmine',

        // سجّل خدمات التقارير في Serenity/JS، والمعروفة أيضًا باسم "طاقم المسرح"
        crew: [
            '@serenity-js/console-reporter',
            '@serenity-js/serenity-bdd',
            [ '@serenity-js/core:ArtifactArchiver', { outputDirectory: 'target/site/serenity' } ],
            [ '@serenity-js/web:Photographer', { strategy: 'TakePhotosOfFailures' } ],
        ]
    },

    // قم بتكوين مشغل Cucumber الخاص بك
    cucumberOpts: {
        // راجع خيارات تكوين Cucumber أدناه
    },

    // ... أو مشغل Jasmine
    jasmineOpts: {
        // راجع خيارات تكوين Jasmine أدناه
    },

    // ... أو مشغل Mocha
    mochaOpts: {
        // راجع خيارات تكوين Mocha أدناه
    },

    runner: 'local',

    // أي إعدادات أخرى لـ WebdriverIO
};
```

</TabItem>
</Tabs>

تعرّف على المزيد حول:
- [خيارات تكوين Cucumber في Serenity/JS](https://serenity-js.org/api/cucumber-adapter/interface/CucumberConfig/?pk_campaign=wdio8&pk_source=webdriver.io)
- [خيارات تكوين Jasmine في Serenity/JS](https://serenity-js.org/api/jasmine-adapter/interface/JasmineConfig/?pk_campaign=wdio8&pk_source=webdriver.io)
- [خيارات تكوين Mocha في Serenity/JS](https://serenity-js.org/api/mocha-adapter/interface/MochaConfig/?pk_campaign=wdio8&pk_source=webdriver.io)
- [ملف إعدادات WebdriverIO](configurationfile)

### إنتاج تقارير Serenity BDD والوثائق الحية

يتم إنشاء [تقارير Serenity BDD والوثائق الحية](https://serenity-bdd.github.io/docs/reporting/the_serenity_reports) بواسطة [Serenity BDD CLI](https://github.com/serenity-bdd/serenity-core/tree/main/serenity-cli)،
وهو برنامج Java يتم تنزيله وإدارته بواسطة الوحدة [`@serenity-js/serenity-bdd`](https://serenity-js.org/api/serenity-bdd/?pk_campaign=wdio8&pk_source=webdriver.io).

لإنتاج تقارير Serenity BDD، يجب على مجموعة الاختبارات الخاصة بك:
- تنزيل Serenity BDD CLI، عن طريق استدعاء `serenity-bdd update` الذي يخزن ملف `jar` الخاص بالـ CLI محليًا
- إنتاج تقارير Serenity BDD الوسيطة بصيغة `.json`، عن طريق تسجيل [`SerenityBDDReporter`](https://serenity-js.org/api/serenity-bdd/class/SerenityBDDReporter/?pk_campaign=wdio8&pk_source=webdriver.io) وفقًا لـ [تعليمات التكوين](#configuring-serenityjs)
- استدعاء Serenity BDD CLI عندما تريد إنتاج التقرير، عن طريق استدعاء `serenity-bdd run`

يعتمد النمط المستخدم في جميع [قوالب مشاريع Serenity/JS](https://serenity-js.org/handbook/project-templates/?pk_campaign=wdio8&pk_source=webdriver.io#webdriverio)
على استخدام:
- سكريبت NPM من نوع [`postinstall`](https://docs.npmjs.com/cli/v9/using-npm/scripts#life-cycle-operation-order) لتنزيل Serenity BDD CLI
- [`npm-failsafe`](https://www.npmjs.com/package/npm-failsafe) لتشغيل عملية إعداد التقارير حتى لو فشلت مجموعة الاختبارات نفسها (وهو بالضبط الوقت الذي تحتاج فيه إلى تقارير الاختبار أكثر من أي وقت آخر...).
- [`rimraf`](https://www.npmjs.com/package/rimraf) كطريقة ملائمة لإزالة أي تقارير اختبار متبقية من التشغيل السابق

```json title="package.json"
{
  "scripts": {
    "postinstall": "serenity-bdd update",
    "clean": "rimraf target",
    "test": "failsafe clean test:execute test:report",
    "test:execute": "wdio wdio.conf.ts",
    "test:report": "serenity-bdd run"
  }
}
```

لمعرفة المزيد حول `SerenityBDDReporter`، يرجى مراجعة:
- تعليمات التثبيت في [وثائق `@serenity-js/serenity-bdd`](https://serenity-js.org/api/serenity-bdd/?pk_campaign=wdio8&pk_source=webdriver.io)،
- أمثلة التكوين في [وثائق API الخاصة بـ `SerenityBDDReporter`](https://serenity-js.org/api/serenity-bdd/class/SerenityBDDReporter/?pk_campaign=wdio8&pk_source=webdriver.io)،
- [أمثلة Serenity/JS على GitHub](https://github.com/serenity-js/serenity-js/tree/main/examples).

### استخدام واجهات برمجة نمط Screenplay في Serenity/JS

يُعد [نمط Screenplay](https://serenity-js.org/handbook/design/screenplay-pattern/?pk_campaign=wdio8&pk_source=webdriver.io) نهجًا مبتكرًا يتمحور حول المستخدم لكتابة اختبارات قبول آلية عالية الجودة. فهو يوجهك نحو الاستخدام الفعال لطبقات التجريد،
ويساعد سيناريوهات الاختبار الخاصة بك على التقاط المصطلحات التجارية لمجالك، ويشجع على عادات جيدة في الاختبار وهندسة البرمجيات لدى فريقك.

افتراضيًا، عند تسجيل `@serenity-js/webdriverio` كـ `framework` في WebdriverIO،
يقوم Serenity/JS بتكوين [طاقم](https://serenity-js.org/api/core/class/Cast/?pk_campaign=wdio8&pk_source=webdriver.io) افتراضي من [الممثلين](https://serenity-js.org/api/core/class/Actor/?pk_campaign=wdio8&pk_source=webdriver.io)،
حيث يمكن لكل ممثل:
- [`BrowseTheWebWithWebdriverIO`](https://serenity-js.org/api/webdriverio/class/BrowseTheWebWithWebdriverIO/?pk_campaign=wdio8&pk_source=webdriver.io)
- [`TakeNotes.usingAnEmptyNotepad()`](https://serenity-js.org/api/core/class/TakeNotes/?pk_campaign=wdio8&pk_source=webdriver.io)

يجب أن يكون هذا كافيًا لمساعدتك على البدء في إدخال سيناريوهات اختبار تتبع نمط Screenplay حتى إلى مجموعة اختبارات موجودة، على سبيل المثال:

```typescript title="specs/example.spec.ts"
import { actorCalled } from '@serenity-js/core'
import { Navigate, Page } from '@serenity-js/web'
import { Ensure, equals } from '@serenity-js/assertions'

describe('My awesome website', () => {
    it('can have test scenarios that follow the Screenplay Pattern', async () => {
        await actorCalled('Alice').attemptsTo(
            Navigate.to(`https://webdriver.io`),
            Ensure.that(
                Page.current().title(),
                equals(`WebdriverIO · Next-gen browser and mobile automation test framework for Node.js | WebdriverIO`)
            ),
        )
    })

    it('can have non-Screenplay scenarios too', async () => {
        await browser.url('https://webdriver.io')
        await expect(browser)
            .toHaveTitle('WebdriverIO · Next-gen browser and mobile automation test framework for Node.js | WebdriverIO')
    })
})
```

لمعرفة المزيد حول نمط Screenplay، اطلع على:
- [نمط Screenplay](https://serenity-js.org/handbook/design/screenplay-pattern/?pk_campaign=wdio8&pk_source=webdriver.io)
- [اختبار الويب باستخدام Serenity/JS](https://serenity-js.org/handbook/web-testing/?pk_campaign=wdio8&pk_source=webdriver.io)
- ["BDD in Action, Second Edition"](https://www.manning.com/books/bdd-in-action-second-edition)