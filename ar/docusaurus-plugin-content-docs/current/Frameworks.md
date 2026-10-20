---
id: frameworks
title: أطر العمل
description: "قم بتهيئة Mocha أو Jasmine أو Cucumber.js كإطار اختبار لمشغل اختبارات WDIO، أو ادمج أطر عمل خارجية مثل Serenity/JS."
---

يحتوي مشغل WebdriverIO على دعم مدمج لـ [Mocha](http://mochajs.org/) و[Jasmine](http://jasmine.github.io/) و[Cucumber.js](https://cucumber.io/). يمكنك أيضًا دمجه مع أطر عمل خارجية مفتوحة المصدر، مثل [Serenity/JS](#using-serenityjs).

:::tip دمج WebdriverIO مع أطر الاختبار
لدمج WebdriverIO مع إطار اختبار، تحتاج إلى حزمة محوّل (adapter) متاحة على NPM.
لاحظ أنه يجب تثبيت حزمة المحوّل في نفس الموقع الذي تم فيه تثبيت WebdriverIO.
لذلك، إذا قمت بتثبيت WebdriverIO بشكل عام (globally)، فتأكد من تثبيت حزمة المحوّل بشكل عام أيضًا.
:::

يتيح لك دمج WebdriverIO مع إطار اختبار الوصول إلى نسخة WebDriver باستخدام المتغير العام `browser`
في ملفات المواصفات (spec files) أو تعريفات الخطوات (step definitions).
لاحظ أن WebdriverIO سيتولى أيضًا إنشاء جلسة Selenium وإنهاءها، لذا لا تحتاج إلى القيام بذلك
بنفسك.

## استخدام Mocha

أولاً، قم بتثبيت حزمة المحوّل من NPM:

```bash npm2yarn
npm install @wdio/mocha-framework --save-dev
```

افتراضيًا، يوفر WebdriverIO [مكتبة تأكيدات](assertion) مدمجة يمكنك البدء باستخدامها على الفور:

```js
describe('my awesome website', () => {
    it('should do some assertions', async () => {
        await browser.url('https://webdriver.io')
        await expect(browser).toHaveTitle('WebdriverIO · Next-gen browser and mobile automation test framework for Node.js | WebdriverIO')
    })
})
```

يأتي WebdriverIO v10 مع [Mocha 12](https://mochajs.org/) ويدعم [واجهات](https://mochajs.org/#interfaces) Mocha وهي `BDD` (الافتراضية) و`TDD` و`QUnit`.

إذا كنت ترغب في كتابة مواصفاتك بأسلوب TDD، فاضبط الخاصية `ui` في إعدادات `mochaOpts` على `tdd`. الآن يجب أن تُكتب ملفات الاختبار الخاصة بك على النحو التالي:

```js
suite('my awesome website', () => {
    test('should do some assertions', async () => {
        await browser.url('https://webdriver.io')
        await expect(browser).toHaveTitle('WebdriverIO · Next-gen browser and mobile automation test framework for Node.js | WebdriverIO')
    })
})
```

إذا كنت تريد تحديد إعدادات أخرى خاصة بـ Mocha، يمكنك القيام بذلك باستخدام المفتاح `mochaOpts` في ملف الإعدادات الخاص بك. يمكن العثور على قائمة بجميع الخيارات على [موقع مشروع Mocha](https://mochajs.org/api/mocha).

__ملاحظة:__ لا يدعم WebdriverIO الاستخدام المهمل (deprecated) لدوال الاستدعاء `done` في Mocha:

```js
it('should test something', (done) => {
    done() // يطرح الخطأ "done is not a function"
})
```

### خيارات Mocha

يمكن تطبيق الخيارات التالية في ملف `wdio.conf.js` لتهيئة بيئة Mocha الخاصة بك. __ملاحظة:__ ليست كل خيارات Mocha مدعومة. لا يزال الخيار `parallel` تابعًا لمجموعة العمّال (worker pool) الخاصة بـ Mocha وسيؤدي إلى خطأ هنا — إذ يقوم مشغل اختبارات WDIO بالفعل بتشغيل المواصفات بالتوازي عبر القدرات (capabilities) والعمّال. لتشغيل اختبارات ملف مواصفات واحد في نفس الوقت، استخدم [`parallelMode`](#parallelmode). كما انتقلت واجهة سطر الأوامر في Mocha 12 من yargs إلى `util.parseArgs` الخاصة بـ Node؛ وهذا يؤثر فقط على الاستدعاء المباشر لـ `mocha`، وليس على `mochaOpts` الممررة عبر `wdio`. يمكنك تمرير خيارات إطار العمل هذه كوسائط، على سبيل المثال:

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

يكون الخيار `require` مفيدًا عندما تريد إضافة بعض الوظائف الأساسية أو توسيعها (خيار إطار عمل WebdriverIO).

</Option>

#### allowUncaught

<Option type="boolean" default="false">

نشر الأخطاء غير الملتقطة.

</Option>

#### bail

<Option type="boolean" default="false">

التوقف بعد أول فشل في الاختبار.

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

الإبلاغ عن كل اختبار تم تخطيه بسبب فشل الخطاف `before` أو `beforeEach` على أنه فاشل. يقوم WebdriverIO بتفعيل هذا الخيار بحيث يكون خطاف الإعداد المعطّل مرئيًا في كل مواصفة تم تخطيها. اضبطه على `false` للإبلاغ عن الخطاف فقط.

</Option>

#### fgrep

<Option type="string" default="null">

تصفية الاختبارات بناءً على سلسلة نصية معينة.

</Option>

#### forbidOnly

<Option type="boolean" default="false">

الاختبارات المعلّمة بـ `only` تؤدي إلى فشل المجموعة.

</Option>

#### forbidPending

<Option type="boolean" default="false">

الاختبارات المعلّقة تؤدي إلى فشل المجموعة.

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

تصفية الاختبارات بناءً على تعبير نمطي (regular expression) معين. يقبل Mocha 12 علامات RegExp الحديثة في هذا المرشح (على سبيل المثال `s` أو `d`).

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

تشغيل اختبارات ملف المواصفات في نفس الوقت، كل منها في سياق تصفح WebDriver BiDi خاص به. يشارك `'contexts'` ملفات تعريف الارتباط والتخزين بين الاختبارات، بينما يعزلها `'userContexts'`. يتطلب القدرة `'wdio:experimentalBiDiCommands': true`. الخياران `bail` و`retries` غير مدعومين في هذا الوضع. راجع [الاختبارات المتوازية في ملف مواصفات](./ParallelTests.md).

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

يمكنك بعد ذلك تهيئة بيئة Jasmine الخاصة بك عن طريق ضبط الخاصية `jasmineOpts` في ملف الإعدادات. يمكن العثور على قائمة بجميع الخيارات على [موقع مشروع Jasmine](https://jasmine.github.io/api/edge/Configuration.html).

### خيارات Jasmine

يمكن تطبيق الخيارات التالية في ملف `wdio.conf.js` لتهيئة بيئة Jasmine الخاصة بك باستخدام الخاصية `jasmineOpts`. لمزيد من المعلومات حول خيارات الإعداد هذه، راجع [وثائق Jasmine](https://jasmine.github.io/api/edge/Configuration). يمكنك تمرير خيارات إطار العمل هذه كوسائط، على سبيل المثال:

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

مصفوفة من مسارات الملفات (وأنماط glob) نسبةً إلى spec_dir ليتم تضمينها قبل مواصفات jasmine.

</Option>

#### requires

<Option type="string[]" default="[]">

يكون الخيار `requires` مفيدًا عندما تريد إضافة بعض الوظائف الأساسية أو توسيعها.

</Option>

#### random

<Option type="boolean" default="false">

ما إذا كان سيتم ترتيب تنفيذ المواصفات عشوائيًا. القيمة الافتراضية في Jasmine نفسه هي `true`، لكن WebdriverIO يشغّل المواصفات بالترتيب ما لم تضبط هذا الخيار.

</Option>

#### seed

<Option type="Function" default="null">

البذرة (seed) المستخدمة كأساس للعشوائية. القيمة Null تؤدي إلى تحديد البذرة عشوائيًا في بداية التنفيذ.

</Option>

#### failSpecWithNoExpectations

<Option type="boolean" default="false">

ما إذا كان سيتم إفشال المواصفة إذا لم تُنفّذ أي توقعات. افتراضيًا، يتم الإبلاغ عن المواصفة التي لم تُنفّذ أي توقعات على أنها ناجحة. ضبط هذا الخيار على true سيُبلغ عن هذه المواصفة على أنها فاشلة.

</Option>

#### oneFailurePerSpec

<Option type="boolean" default="false">

إيقاف المواصفة عند أول توقع فاشل. يوقف المطابِق (matcher) المتزامن الفاشل المواصفة على الفور، بينما يوقفها المطابِق غير المتزامن المنتظَر (awaited) عند استقرار وعده (promise). تستمر المواصفات الأخرى في العمل.

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

إذا كانت القيمة true، فإنه يعكس الاختبارات المطابقة ويشغّل فقط الاختبارات التي لا تتطابق مع التعبير المستخدم في `grep`. (ينطبق فقط إذا لم يتم تعيين دالة `specFilter` مخصصة)

</Option>

#### stopOnSpecFailure

<Option type="boolean" default="false">

إيقاف ملف المواصفات عند أول مواصفة فاشلة (`it`): لا يتم تشغيل المواصفات الأخرى في الملف، حتى في كتل `describe` الأخرى. تعمل ملفات المواصفات الأخرى في عمّالها الخاصين وتستمر.

</Option>

#### cleanStack

<Option type="boolean" default="true">

إزالة أسطر حزم `node_modules` من تتبعات المكدس الخاصة بحالات الفشل.

</Option>

#### expectationResultHandler

<Option type="Function" default="null">

يُستدعى مع `(passed, assertion)` لكل توقع، على سبيل المثال لالتقاط لقطة شاشة عند فشل توقع ما. إذا طرحت الدالة خطأً لتوقع ناجح، فإن التوقع يفشل بذلك الخطأ.

</Option>

### التأكيدات

مع Jasmine، تجمع الدالة العامة `expect` بين مطابِقات Jasmine و[مطابِقات WebdriverIO](/docs/api/expect-webdriverio):

- مطابِقات Jasmine (`toBe`، `toEqual`، `toHaveBeenCalled`، …) والمطابِقات التي تضيفها باستخدام `jasmine.addMatchers` هي متزامنة. فهي تُرجع `undefined`، لذا لا تحتاج إلى `await`.
- مطابِقات WebdriverIO، ومطابِقات Jasmine غير المتزامنة (`toBeResolved`، `toBeRejectedWith`، …) والمطابِقات التي تضيفها باستخدام `jasmine.addAsyncMatchers` تُرجع وعدًا (promise). استخدم `await` معها دائمًا.

استخدم `expect()` لكلا النوعين: فهي ترسل كل مطابِق إلى `expect` أو `expectAsync` الخاصة بـ Jasmine نيابةً عنك. كما أن `await expectAsync($('#logo')).toBeDisplayed()` يعمل أيضًا. بالنسبة لـ TypeScript، فإن إضافة `@wdio/jasmine-framework` في `types` تمنح `expectAsync()` أيضًا مطابِقات WebdriverIO.

```js
it('checks the page', async () => {
    expect([1, 2]).toHaveSize(2)                                   // Jasmine، متزامن
    await expect($('#logo')).toHaveSize({ width: 32, height: 32 }) // WebdriverIO، غير متزامن
    await expect(loadData()).toBeResolved()                        // مطابِق Jasmine غير متزامن
})
```

المطابِق `toHaveSize` موجود في كلتا المكتبتين. يعمل مطابِق WebdriverIO على قيم WebdriverIO: عنصر، أو مصفوفة عناصر أو `Element[]` (على سبيل المثال نتيجة `$$().filter()`)، أو عنصر متعدد التحكم عن بُعد (multi-remote)، أو متصفح، أو سياق تصفح، أو كائن محاكاة (mock)، أو الغلاف `some()`، أو وعد مثل `$()` القابل للتسلسل. أما مطابِق Jasmine فيعمل على كل القيم الأخرى.

تعمل المطابِقات غير المتماثلة (asymmetric matchers) لكلتا المكتبتين، في مطابِقات Jasmine وWebdriverIO على حد سواء: `jasmine.any()`، `jasmine.objectContaining()`، `jasmine.stringMatching()`، … و`expect.any()`، `expect.stringContaining()`، `expect.oneOf()`، `expect.multiRemote()`، `expect.not.stringContaining()`، …. لاستخدام `some()`، قم باستيرادها:

```js
import { some } from 'expect-webdriverio/api'

await expect(some($$('li'))).toHaveAttribute('data-state', 'on')
```

أجزاء Jest من `expect` غير متاحة مع Jasmine: المطابِقات الخاصة بـ Jest فقط مثل `toStrictEqual` أو `toHaveLength`، و`expect.soft()`. لإضافة مطابِق مخصص، استخدم `expect.extend()` في ملف مواصفات أو في الخطاف `before` (راجع [المطابِقات المخصصة](/docs/custommatchers))، أو `jasmine.addMatchers` للمطابِق المتزامن و`jasmine.addAsyncMatchers` للمطابِق غير المتزامن.

بالنسبة لـ TypeScript، أضف `jasmine` إلى `types`، راجع [إعداد TypeScript](/docs/typescript).

## استخدام Cucumber

أولاً، قم بتثبيت حزمة المحوّل من NPM:

```bash npm2yarn
npm install @wdio/cucumber-framework --save-dev
```

إذا كنت تريد استخدام Cucumber، فاضبط الخاصية `framework` على `cucumber` عن طريق إضافة `framework: 'cucumber'` إلى [ملف الإعدادات](configurationfile).

يمكن تحديد خيارات Cucumber في ملف الإعدادات باستخدام `cucumberOpts`. اطلع على القائمة الكاملة للخيارات [هنا](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-cucumber-framework#cucumberopts-options). يستخدم المحوّل Cucumber 13. تمت إزالة `tagExpression`؛ استخدم `tags` للتصفية. راجع [دليل الترحيل إلى v10](v10-migration#cucumber).

للبدء بسرعة مع Cucumber، ألقِ نظرة على مشروعنا [`cucumber-boilerplate`](https://github.com/webdriverio/cucumber-boilerplate) الذي يأتي مع جميع تعريفات الخطوات التي تحتاجها للبدء، وستتمكن من كتابة ملفات الميزات (feature files) على الفور.

### خيارات Cucumber

يمكن تطبيق الخيارات التالية في ملف `wdio.conf.js` لتهيئة بيئة Cucumber الخاصة بك باستخدام الخاصية `cucumberOpts`:

:::tip ضبط الخيارات عبر سطر الأوامر
يمكن تحديد `cucumberOpts`، مثل `tags` المخصصة لتصفية الاختبارات، عبر سطر الأوامر. ويتم ذلك باستخدام الصيغة `cucumberOpts.{optionName}="value"`.

على سبيل المثال، إذا كنت تريد تشغيل الاختبارات الموسومة بـ `@smoke` فقط، يمكنك استخدام الأمر التالي:

```sh
# عندما تريد تشغيل الاختبارات التي تحمل الوسم "@smoke" فقط
npx wdio run ./wdio.conf.js --cucumberOpts.tags="@smoke"
npx wdio run ./wdio.conf.js --cucumberOpts.name="some scenario name" --cucumberOpts.failFast
```

يضبط هذا الأمر الخيار `tags` في `cucumberOpts` على `@smoke`، مما يضمن تنفيذ الاختبارات التي تحمل هذا الوسم فقط.

:::

#### backtrace

<Option type="Boolean" default="true">

عرض التتبع الخلفي الكامل للأخطاء.

</Option>

#### requireModule

<Option type="string[]" default="[]">

تحميل الوحدات (modules) قبل تحميل أي ملفات دعم.

</Option>
مثال:

```js
cucumberOpts: {
    requireModule: ['@babel/register']
    // أو
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

تنفيذ السيناريوهات التي يتطابق اسمها مع التعبير فقط (قابل للتكرار).

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

المسارات إلى مكان وجود شيفرة الدعم الخاصة بك، لـ ESM.

</Option>
مثال:

```js
cucumberOpts: {
    import: [path.join(__dirname, 'step-definitions', 'my-steps.js')]
}
```

#### strict

<Option type="boolean" default="false">

الفشل في حال وجود أي خطوات غير معرّفة أو معلّقة.

</Option>

#### tags

<Option type="String" default="">

تنفيذ الميزات أو السيناريوهات التي تتطابق وسومها مع التعبير فقط.
يرجى مراجعة [وثائق Cucumber](https://docs.cucumber.io/cucumber/api/#tag-expressions) لمزيد من التفاصيل.

</Option>

#### timeout

<Option type="Number" default="30000">

المهلة الزمنية بالمللي ثانية لتعريفات الخطوات.

</Option>

#### retry

<Option type="Number" default="0">

تحديد عدد مرات إعادة محاولة حالات الاختبار الفاشلة.

</Option>

#### retryTagFilter

<Option type="RegExp">

إعادة محاولة الميزات أو السيناريوهات التي تتطابق وسومها مع التعبير فقط (قابل للتكرار). يتطلب هذا الخيار تحديد '--retry'.

</Option>

#### language

<Option type="String" default="en">

اللغة الافتراضية لملفات الميزات الخاصة بك

</Option>

#### order

<Option type="String" default="defined">

تشغيل الاختبارات بترتيب محدد / عشوائي

</Option>

#### format

<Option type="string[]">

اسم المُنسِّق (formatter) المراد استخدامه ومسار ملف الإخراج الخاص به.
يدعم WebdriverIO بشكل أساسي فقط [المُنسِّقات](https://github.com/cucumber/cucumber-js/blob/main/docs/formatters.md) التي تكتب المخرجات إلى ملف.

</Option>

#### formatOptions

<Option type="object">

الخيارات التي سيتم تمريرها إلى المُنسِّقات

</Option>

#### tagsInTitle

<Option type="Boolean" default="false">

إضافة وسوم cucumber إلى اسم الميزة أو السيناريو

</Option>
***يرجى ملاحظة أن هذا خيار خاص بـ @wdio/cucumber-framework ولا يتعرّف عليه cucumber-js نفسه***<br/>

#### ignoreUndefinedDefinitions

<Option type="Boolean" default="false">

معاملة التعريفات غير المعرّفة كتحذيرات.

</Option>
***يرجى ملاحظة أن هذا خيار خاص بـ @wdio/cucumber-framework ولا يتعرّف عليه cucumber-js نفسه***<br/>

#### failAmbiguousDefinitions

<Option type="Boolean" default="false">

معاملة التعريفات الغامضة كأخطاء.

</Option>
***يرجى ملاحظة أن هذا خيار خاص بـ @wdio/cucumber-framework ولا يتعرّف عليه cucumber-js نفسه***<br/>

#### profile

<Option type="string[]" default="[]">

تحديد الملف التعريفي (profile) المراد استخدامه.

</Option>
***يرجى ملاحظة أن قيمًا محددة فقط (worldParameters، name، retryTagFilter) مدعومة داخل الملفات التعريفية، إذ إن `cucumberOpts` له الأولوية. بالإضافة إلى ذلك، عند استخدام ملف تعريفي، تأكد من عدم الإعلان عن القيم المذكورة داخل `cucumberOpts`.***

#### parallelMode

<Option type="'contexts' | 'userContexts'" default="undefined">

تشغيل سيناريوهات ملف الميزة في نفس الوقت، كل منها في سياق تصفح WebDriver BiDi خاص به. يشارك `'contexts'` ملفات تعريف الارتباط والتخزين بين السيناريوهات، بينما يعزلها `'userContexts'`. يتطلب القدرة `'wdio:experimentalBiDiCommands': true`. راجع [الاختبارات المتوازية في ملف مواصفات](./ParallelTests.md).

</Option>
***يرجى ملاحظة أن هذا خيار خاص بـ @wdio/cucumber-framework ولا يتعرّف عليه cucumber-js نفسه***<br/>

#### maxParallelContexts

<Option type="number" default="os.cpus().length">

عدد السيناريوهات التي تعمل في نفس الوقت عند ضبط [`parallelMode`](#parallelmode-1). راجع [الاختبارات المتوازية في ملف مواصفات](./ParallelTests.md#options).

</Option>
***يرجى ملاحظة أن هذا خيار خاص بـ @wdio/cucumber-framework ولا يتعرّف عليه cucumber-js نفسه***<br/>

### تخطي الاختبارات في cucumber

لاحظ أنه إذا كنت تريد تخطي اختبار باستخدام إمكانيات تصفية اختبارات cucumber العادية المتاحة في `cucumberOpts`، فستقوم بذلك لجميع المتصفحات والأجهزة المُهيأة في القدرات (capabilities). لكي تتمكن من تخطي السيناريوهات لمجموعات قدرات محددة فقط دون بدء جلسة إذا لم تكن ضرورية، يوفر webdriverio صيغة الوسم الخاصة التالية لـ cucumber:

`@skip([condition])`

حيث يكون الشرط (condition) مزيجًا اختياريًا من خصائص القدرات مع قيمها، والتي عند تطابقها **جميعًا** تؤدي إلى تخطي السيناريو أو الميزة الموسومة. وبالطبع يمكنك إضافة عدة وسوم إلى السيناريوهات والميزات لتخطي اختبار ما في ظل عدة شروط مختلفة.

يمكنك أيضًا استخدام التعليق التوضيحي '@skip' لتخطي الاختبارات دون تغيير `tags`. في هذه الحالة، سيتم عرض الاختبارات التي تم تخطيها في تقرير الاختبار.

إليك بعض الأمثلة على هذه الصيغة:
- `@skip` أو `@skip()`: سيتخطى العنصر الموسوم دائمًا
- `@skip(browserName="chrome")`: لن يتم تنفيذ الاختبار على متصفحات chrome.
- `@skip(browserName="firefox";platformName="linux")`: سيتخطى الاختبار في عمليات تنفيذ firefox على linux.
- `@skip(browserName=["chrome","firefox"])`: سيتم تخطي العناصر الموسومة لكل من متصفحي chrome وfirefox.
- `@skip(browserName=/i.*explorer/)`: سيتم تخطي القدرات ذات المتصفحات المطابقة للتعبير النمطي (مثل `iexplorer`، `internet explorer`، `internet-explorer`، ...).

### استيراد مساعد تعريف الخطوات

لاستخدام مساعدات تعريف الخطوات مثل `Given` أو `When` أو `Then` أو الخطافات، يُفترض أن تستوردها من `@cucumber/cucumber`، على سبيل المثال هكذا:

```js
import { Given, When, Then } from '@cucumber/cucumber'
```

الآن، إذا كنت تستخدم Cucumber بالفعل لأنواع أخرى من الاختبارات غير المرتبطة بـ WebdriverIO وتستخدم لها إصدارًا محددًا، فستحتاج إلى استيراد هذه المساعدات في اختبارات e2e الخاصة بك من حزمة Cucumber الخاصة بـ WebdriverIO، على سبيل المثال:

```js
import { Given, When, Then, world, context } from '@wdio/cucumber-framework'
```

يضمن هذا أنك تستخدم المساعدات الصحيحة داخل إطار عمل WebdriverIO ويتيح لك استخدام إصدار مستقل من Cucumber لأنواع الاختبار الأخرى.

### نشر التقرير

يوفر Cucumber ميزة لنشر تقارير تشغيل الاختبارات الخاصة بك على `https://reports.cucumber.io/`، والتي يمكن التحكم فيها إما عن طريق ضبط العلامة `publish` في `cucumberOpts` أو عن طريق تهيئة متغير البيئة `CUCUMBER_PUBLISH_TOKEN`. ومع ذلك، عند استخدام `WebdriverIO` لتنفيذ الاختبارات، هناك قيد في هذا النهج. فهو يحدّث التقارير بشكل منفصل لكل ملف ميزة، مما يجعل من الصعب عرض تقرير موحد.

للتغلب على هذا القيد، قدمنا دالة قائمة على الوعود تسمى `publishCucumberReport` ضمن `@wdio/cucumber-framework`. يجب استدعاء هذه الدالة في الخطاف `onComplete`، وهو المكان الأمثل لاستدعائها. تتطلب `publishCucumberReport` إدخال مجلد التقارير حيث يتم تخزين تقارير رسائل cucumber.

يمكنك إنشاء تقارير `cucumber message` عن طريق تهيئة الخيار `format` في `cucumberOpts` الخاص بك. يُنصح بشدة بتوفير اسم ملف ديناميكي ضمن خيار تنسيق `cucumber message` لمنع الكتابة فوق التقارير وضمان تسجيل كل تشغيل للاختبار بدقة.

قبل استخدام هذه الدالة، تأكد من ضبط متغيرات البيئة التالية:
- CUCUMBER_PUBLISH_REPORT_URL: عنوان URL الذي تريد نشر تقرير Cucumber عليه. إذا لم يتم توفيره، فسيتم استخدام عنوان URL الافتراضي 'https://messages.cucumber.io/api/reports'.
- CUCUMBER_PUBLISH_REPORT_TOKEN: رمز التفويض المطلوب لنشر التقرير. إذا لم يتم تعيين هذا الرمز، فستنتهي الدالة دون نشر التقرير.

إليك مثالاً على الإعدادات الضرورية وعينات الشيفرة اللازمة للتنفيذ:

```javascript
import { v4 as uuidv4 } from 'uuid'
import { publishCucumberReport } from '@wdio/cucumber-framework';

export const config = {
    // ... خيارات الإعداد الأخرى
    cucumberOpts: {
        // ... إعداد خيارات Cucumber
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

يرجى ملاحظة أن `./reports/` هو المجلد الذي سيتم تخزين تقارير `cucumber message` فيه.

## استخدام Serenity/JS

[Serenity/JS](https://serenity-js.org?pk_campaign=wdio8&pk_source=webdriver.io) هو إطار عمل مفتوح المصدر مصمم لجعل اختبارات القبول والانحدار للأنظمة البرمجية المعقدة أسرع وأكثر تعاونًا وأسهل في التوسع.

بالنسبة لمجموعات اختبارات WebdriverIO، يقدم Serenity/JS:
- [تقارير محسّنة](https://serenity-js.org/handbook/reporting/?pk_campaign=wdio8&pk_source=webdriver.io) - يمكنك استخدام Serenity/JS
  كبديل مباشر لأي إطار عمل مدمج في WebdriverIO لإنتاج تقارير تفصيلية عن تنفيذ الاختبارات ووثائق حية لمشروعك.
- [واجهات برمجة نمط Screenplay](https://serenity-js.org/handbook/design/screenplay-pattern/?pk_campaign=wdio8&pk_source=webdriver.io) - لجعل شيفرة الاختبار الخاصة بك قابلة للنقل وإعادة الاستخدام عبر المشاريع والفرق،
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

### تهيئة Serenity/JS

لتفعيل التكامل مع Serenity/JS، قم بتهيئة WebdriverIO على النحو التالي:

<Tabs>
<TabItem value="wdio-conf-typescript" label="TypeScript" default>

```typescript title="wdio.conf.ts"
import { WebdriverIOConfig } from '@serenity-js/webdriverio';

export const config: WebdriverIOConfig = {

    // أخبر WebdriverIO باستخدام إطار عمل Serenity/JS
    framework: '@serenity-js/webdriverio',

    // إعدادات Serenity/JS
    serenity: {
        // قم بتهيئة Serenity/JS لاستخدام المحوّل المناسب لمشغل الاختبارات الخاص بك
        runner: 'cucumber',
        // runner: 'mocha',
        // runner: 'jasmine',

        // تسجيل خدمات التقارير الخاصة بـ Serenity/JS، والمعروفة أيضًا بـ "طاقم المسرح"
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

    // قم بتهيئة مشغل Cucumber الخاص بك
    cucumberOpts: {
        // راجع خيارات إعداد Cucumber أدناه
    },

    // ... أو مشغل Jasmine
    jasmineOpts: {
        // راجع خيارات إعداد Jasmine أدناه
    },

    // ... أو مشغل Mocha
    mochaOpts: {
        // راجع خيارات إعداد Mocha أدناه
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
        // قم بتهيئة Serenity/JS لاستخدام المحوّل المناسب لمشغل الاختبارات الخاص بك
        runner: 'cucumber',
        // runner: 'mocha',
        // runner: 'jasmine',

        // تسجيل خدمات التقارير الخاصة بـ Serenity/JS، والمعروفة أيضًا بـ "طاقم المسرح"
        crew: [
            '@serenity-js/console-reporter',
            '@serenity-js/serenity-bdd',
            [ '@serenity-js/core:ArtifactArchiver', { outputDirectory: 'target/site/serenity' } ],
            [ '@serenity-js/web:Photographer', { strategy: 'TakePhotosOfFailures' } ],
        ]
    },

    // قم بتهيئة مشغل Cucumber الخاص بك
    cucumberOpts: {
        // راجع خيارات إعداد Cucumber أدناه
    },

    // ... أو مشغل Jasmine
    jasmineOpts: {
        // راجع خيارات إعداد Jasmine أدناه
    },

    // ... أو مشغل Mocha
    mochaOpts: {
        // راجع خيارات إعداد Mocha أدناه
    },

    runner: 'local',

    // أي إعدادات أخرى لـ WebdriverIO
};
```

</TabItem>
</Tabs>

تعرّف على المزيد حول:
- [خيارات إعداد Cucumber في Serenity/JS](https://serenity-js.org/api/cucumber-adapter/interface/CucumberConfig/?pk_campaign=wdio8&pk_source=webdriver.io)
- [خيارات إعداد Jasmine في Serenity/JS](https://serenity-js.org/api/jasmine-adapter/interface/JasmineConfig/?pk_campaign=wdio8&pk_source=webdriver.io)
- [خيارات إعداد Mocha في Serenity/JS](https://serenity-js.org/api/mocha-adapter/interface/MochaConfig/?pk_campaign=wdio8&pk_source=webdriver.io)
- [ملف إعدادات WebdriverIO](configurationfile)

### إنتاج تقارير Serenity BDD والوثائق الحية

يتم إنشاء [تقارير Serenity BDD والوثائق الحية](https://serenity-bdd.github.io/docs/reporting/the_serenity_reports) بواسطة [Serenity BDD CLI](https://github.com/serenity-bdd/serenity-core/tree/main/serenity-cli)،
وهو برنامج Java يتم تنزيله وإدارته بواسطة الوحدة [`@serenity-js/serenity-bdd`](https://serenity-js.org/api/serenity-bdd/?pk_campaign=wdio8&pk_source=webdriver.io).

لإنتاج تقارير Serenity BDD، يجب على مجموعة الاختبارات الخاصة بك:
- تنزيل Serenity BDD CLI، عن طريق استدعاء `serenity-bdd update` الذي يخزّن ملف `jar` الخاص بواجهة سطر الأوامر مؤقتًا محليًا
- إنتاج تقارير Serenity BDD الوسيطة بصيغة `.json`، عن طريق تسجيل [`SerenityBDDReporter`](https://serenity-js.org/api/serenity-bdd/class/SerenityBDDReporter/?pk_campaign=wdio8&pk_source=webdriver.io) وفقًا لـ [تعليمات الإعداد](#configuring-serenityjs)
- استدعاء Serenity BDD CLI عندما تريد إنتاج التقرير، عن طريق استدعاء `serenity-bdd run`

يعتمد النمط المستخدم في جميع [قوالب مشاريع Serenity/JS](https://serenity-js.org/handbook/project-templates/?pk_campaign=wdio8&pk_source=webdriver.io#webdriverio)
على استخدام:
- سكربت NPM باسم [`postinstall`](https://docs.npmjs.com/cli/v9/using-npm/scripts#life-cycle-operation-order) لتنزيل Serenity BDD CLI
- [`npm-failsafe`](https://www.npmjs.com/package/npm-failsafe) لتشغيل عملية إعداد التقارير حتى لو فشلت مجموعة الاختبارات نفسها (وهو بالضبط الوقت الذي تحتاج فيه إلى تقارير الاختبار أكثر من أي وقت آخر...).
- [`rimraf`](https://www.npmjs.com/package/rimraf) كوسيلة مريحة لإزالة أي تقارير اختبار متبقية من التشغيل السابق

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
- أمثلة الإعداد في [وثائق API الخاصة بـ `SerenityBDDReporter`](https://serenity-js.org/api/serenity-bdd/class/SerenityBDDReporter/?pk_campaign=wdio8&pk_source=webdriver.io)،
- [أمثلة Serenity/JS على GitHub](https://github.com/serenity-js/serenity-js/tree/main/examples).

### استخدام واجهات برمجة نمط Screenplay في Serenity/JS

[نمط Screenplay](https://serenity-js.org/handbook/design/screenplay-pattern/?pk_campaign=wdio8&pk_source=webdriver.io) هو نهج مبتكر يتمحور حول المستخدم لكتابة اختبارات قبول مؤتمتة عالية الجودة. فهو يوجهك نحو استخدام فعال لطبقات التجريد،
ويساعد سيناريوهات الاختبار الخاصة بك على التقاط المصطلحات التجارية لمجالك، ويشجع على عادات جيدة في الاختبار وهندسة البرمجيات لدى فريقك.

افتراضيًا، عندما تسجّل `@serenity-js/webdriverio` كـ `framework` لـ WebdriverIO،
يقوم Serenity/JS بتهيئة [طاقم](https://serenity-js.org/api/core/class/Cast/?pk_campaign=wdio8&pk_source=webdriver.io) افتراضي من [الممثلين](https://serenity-js.org/api/core/class/Actor/?pk_campaign=wdio8&pk_source=webdriver.io)،
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