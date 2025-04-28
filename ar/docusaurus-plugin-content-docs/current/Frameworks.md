---
id: frameworks
title: الأطر
---

يتمتع مشغل WebdriverIO بدعم مدمج لـ [Mocha](http://mochajs.org/) و [Jasmine](http://jasmine.github.io/) و [Cucumber.js](https://cucumber.io/). يمكنك أيضًا دمجه مع أطر عمل مفتوحة المصدر من جهات خارجية، مثل [Serenity/JS](#using-serenityjs).

:::tip دمج WebdriverIO مع أطر الاختبار
لدمج WebdriverIO مع إطار اختبار، تحتاج إلى حزمة محول متوفرة على NPM.
لاحظ أنه يجب تثبيت حزمة المحول في نفس موقع تثبيت WebdriverIO.
لذلك، إذا قمت بتثبيت WebdriverIO عالميًا، فتأكد من تثبيت حزمة المحول عالميًا أيضًا.
:::

يتيح لك دمج WebdriverIO مع إطار اختبار الوصول إلى مثيل WebDriver باستخدام المتغير العالمي `browser`
في ملفات المواصفات أو تعريفات الخطوات الخاصة بك.
لاحظ أن WebdriverIO سيتعامل أيضًا مع بدء وإنهاء جلسة Selenium، لذلك لا تحتاج إلى القيام بذلك
بنفسك.

## استخدام Mocha

أولاً، قم بتثبيت حزمة المحول من NPM:

```bash npm2yarn
npm install @wdio/mocha-framework --save-dev
```

افتراضيًا، يوفر WebdriverIO [مكتبة تأكيد](assertion) مدمجة يمكنك البدء بها على الفور:

```js
describe('my awesome website', () => {
    it('should do some assertions', async () => {
        await browser.url('https://webdriver.io')
        await expect(browser).toHaveTitle('WebdriverIO · Next-gen browser and mobile automation test framework for Node.js | WebdriverIO')
    })
})
```

يدعم WebdriverIO واجهات Mocha `BDD` (افتراضيًا) و `TDD` و `QUnit` [interfaces](https://mochajs.org/#interfaces).

إذا كنت ترغب في كتابة المواصفات الخاصة بك بنمط TDD، قم بتعيين خاصية `ui` في تكوين `mochaOpts` الخاص بك إلى `tdd`. الآن يجب كتابة ملفات الاختبار الخاصة بك كما يلي:

```js
suite('my awesome website', () => {
    test('should do some assertions', async () => {
        await browser.url('https://webdriver.io')
        await expect(browser).toHaveTitle('WebdriverIO · Next-gen browser and mobile automation test framework for Node.js | WebdriverIO')
    })
})
```

إذا كنت تريد تحديد إعدادات أخرى خاصة بـ Mocha، يمكنك القيام بذلك باستخدام المفتاح `mochaOpts` في ملف التكوين الخاص بك. يمكن العثور على قائمة بجميع الخيارات على [موقع مشروع Mocha](https://mochajs.org/api/mocha).

__ملاحظة:__ لا يدعم WebdriverIO الاستخدام المهمل لمكالمات استدعاء `done` في Mocha:

```js
it('should test something', (done) => {
    done() // يلقي خطأ "done is not a function"
})
```

### خيارات Mocha

يمكن تطبيق الخيارات التالية في ملف `wdio.conf.js` الخاص بك لتكوين بيئة Mocha الخاصة بك. __ملاحظة:__ ليست كل الخيارات مدعومة، على سبيل المثال، سيؤدي تطبيق خيار `parallel` إلى حدوث خطأ لأن مشغل اختبار WDIO له طريقته الخاصة لتشغيل الاختبارات بالتوازي. يمكنك تمرير خيارات الإطار هذه كمعاملات، على سبيل المثال:

```sh
wdio run wdio.conf.ts --mochaOpts.grep "my test" --mochaOpts.bail --no-mochaOpts.checkLeaks
```

سيمرر هذا خيارات Mocha التالية:

```ts
{
    grep: ['my-test'],
    bail: true
    checkLeacks: false
}
```

يتم دعم خيارات Mocha التالية:

#### require
خيار `require` مفيد عندما تريد إضافة أو توسيع بعض الوظائف الأساسية (خيار إطار عمل WebdriverIO).

النوع: `string|string[]`<br />
الافتراضي: `[]`

#### compilers
استخدم الوحدة (الوحدات) المعطاة لتجميع الملفات. سيتم تضمين المجمعات قبل المتطلبات (خيار إطار عمل WebdriverIO).

النوع: `string[]`<br />
الافتراضي: `[]`

#### allowUncaught
نشر الأخطاء غير المعالجة.

النوع: `boolean`<br />
الافتراضي: `false`

#### bail
الخروج بعد فشل الاختبار الأول.

النوع: `boolean`<br />
الافتراضي: `false`

#### checkLeaks
التحقق من تسربات المتغيرات العالمية.

النوع: `boolean`<br />
الافتراضي: `false`

#### delay
تأخير تنفيذ المجموعة الرئيسية.

النوع: `boolean`<br />
الافتراضي: `false`

#### fgrep
تصفية الاختبار بالسلسلة المعطاة.

النوع: `string`<br />
الافتراضي: `null`

#### forbidOnly
الاختبارات المميزة بـ `only` تفشل المجموعة.

النوع: `boolean`<br />
الافتراضي: `false`

#### forbidPending
الاختبارات المعلقة تفشل المجموعة.

النوع: `boolean`<br />
الافتراضي: `false`

#### fullTrace
تتبع كامل للمكدس عند الفشل.

النوع: `boolean`<br />
الافتراضي: `false`

#### global
المتغيرات المتوقعة في النطاق العالمي.

النوع: `string[]`<br />
الافتراضي: `[]`

#### grep
تصفية الاختبار باستخدام التعبير العادي المعطى.

النوع: `RegExp|string`<br />
الافتراضي: `null`

#### invert
عكس مطابقات مرشح الاختبار.

النوع: `boolean`<br />
الافتراضي: `false`

#### retries
عدد مرات إعادة محاولة الاختبارات الفاشلة.

النوع: `number`<br />
الافتراضي: `0`

#### timeout
قيمة عتبة المهلة (بالمللي ثانية).

النوع: `number`<br />
الافتراضي: `30000`

## استخدام Jasmine

أولاً، قم بتثبيت حزمة المحول من NPM:

```bash npm2yarn
npm install @wdio/jasmine-framework --save-dev
```

يمكنك بعد ذلك تكوين بيئة Jasmine الخاصة بك عن طريق تعيين خاصية `jasmineOpts` في التكوين الخاص بك. يمكن العثور على قائمة بجميع الخيارات على [موقع مشروع Jasmine](https://jasmine.github.io/api/3.5/Configuration.html).

### خيارات Jasmine

يمكن تطبيق الخيارات التالية في ملف `wdio.conf.js` الخاص بك لتكوين بيئة Jasmine الخاصة بك باستخدام خاصية `jasmineOpts`. لمزيد من المعلومات حول خيارات التكوين هذه، تحقق من [وثائق Jasmine](https://jasmine.github.io/api/edge/Configuration). يمكنك تمرير خيارات الإطار هذه كمعاملات، على سبيل المثال:

```sh
wdio run wdio.conf.ts --jasmineOpts.grep "my test" --jasmineOpts.failSpecWithNoExpectations --no-jasmineOpts.random
```

سيمرر هذا خيارات Mocha التالية:

```ts
{
    grep: ['my-test'],
    bail: true
    checkLeacks: false
}
```

يتم دعم خيارات Jasmine التالية:

#### defaultTimeoutInterval
فترة المهلة الافتراضية لعمليات Jasmine.

النوع: `number`<br />
الافتراضي: `60000`

#### helpers
مصفوفة من مسارات الملفات (وأنماط glob) بالنسبة إلى spec_dir لتضمينها قبل مواصفات jasmine.

النوع: `string[]`<br />
الافتراضي: `[]`

#### requires
خيار `requires` مفيد عندما تريد إضافة أو توسيع بعض الوظائف الأساسية.

النوع: `string[]`<br />
الافتراضي: `[]`

#### random
ما إذا كان سيتم تنفيذ المواصفات بترتيب عشوائي.

النوع: `boolean`<br />
الافتراضي: `true`

#### seed
البذرة التي ستستخدم كأساس للعشوائية. تتسبب البذرة الفارغة في تحديد البذرة بشكل عشوائي في بداية التنفيذ.

النوع: `Function`<br />
الافتراضي: `null`

#### failSpecWithNoExpectations
ما إذا كان سيتم إفشال المواصفات إذا لم تقم بتشغيل أي توقعات. افتراضيًا، يتم الإبلاغ عن المواصفات التي لم تقم بتشغيل أي توقعات على أنها نجحت. سيؤدي تعيين هذا الخيار إلى `true` إلى الإبلاغ عن هذه المواصفات كفشل.

النوع: `boolean`<br />
الافتراضي: `false`

#### oneFailurePerSpec
ما إذا كان سيتم التسبب في أن يكون للمواصفات فشل توقع واحد فقط.

النوع: `boolean`<br />
الافتراضي: `false`

#### specFilter
الدالة المستخدمة لتصفية المواصفات.

النوع: `Function`<br />
الافتراضي: `(spec) => true`

#### grep
تشغيل الاختبارات التي تطابق هذه السلسلة أو التعبير العادي فقط. (ينطبق فقط إذا لم يتم تعيين دالة `specFilter` مخصصة)

النوع: `string|Regexp`<br />
الافتراضي: `null`

#### invertGrep
إذا كانت قيمتها `true`، فإنها تعكس الاختبارات المطابقة وتقوم فقط بتشغيل الاختبارات التي لا تتطابق مع التعبير المستخدم في `grep`. (ينطبق فقط إذا لم يتم تعيين دالة `specFilter` مخصصة)

النوع: `boolean`<br />
الافتراضي: `false`

## استخدام Cucumber

أولاً، قم بتثبيت حزمة المحول من NPM:

```bash npm2yarn
npm install @wdio/cucumber-framework --save-dev
```

إذا كنت ترغب في استخدام Cucumber، قم بتعيين خاصية `framework` إلى `cucumber` عن طريق إضافة `framework: 'cucumber'` إلى [ملف التكوين](configurationfile).

يمكن تقديم خيارات لـ Cucumber في ملف التكوين بـ `cucumberOpts`. تحقق من القائمة الكاملة للخيارات [هنا](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-cucumber-framework#cucumberopts-options).

للبدء بسرعة مع Cucumber، ألق نظرة على مشروع [`cucumber-boilerplate`](https://github.com/webdriverio/cucumber-boilerplate) الذي يأتي مع جميع تعريفات الخطوات التي تحتاجها للبدء، وستكتب ملفات الميزات على الفور.

### خيارات Cucumber

يمكن تطبيق الخيارات التالية في ملف `wdio.conf.js` الخاص بك لتكوين بيئة Cucumber باستخدام خاصية `cucumberOpts`:

:::tip ضبط الخيارات من خلال سطر الأوامر
يمكن تحديد `cucumberOpts`، مثل `tags` المخصصة لتصفية الاختبارات، من خلال سطر الأوامر. يتم تحقيق ذلك باستخدام تنسيق `cucumberOpts.{optionName}="value"`.

على سبيل المثال، إذا كنت تريد تشغيل الاختبارات التي تحمل العلامة `@smoke` فقط، يمكنك استخدام الأمر التالي:

```sh
# عندما تريد فقط تشغيل الاختبارات التي تحمل العلامة "@smoke"
npx wdio run ./wdio.conf.js --cucumberOpts.tags="@smoke"
npx wdio run ./wdio.conf.js --cucumberOpts.name="some scenario name" --cucumberOpts.failFast
```

يقوم هذا الأمر بتعيين خيار `tags` في `cucumberOpts` إلى `@smoke`، مما يضمن تنفيذ الاختبارات التي تحمل هذه العلامة فقط.

:::

#### backtrace
إظهار التتبع الكامل للأخطاء.

النوع: `Boolean`<br />
الافتراضي: `true`

#### requireModule
طلب الوحدات قبل طلب أي ملفات دعم.

النوع: `string[]`<br />
الافتراضي: `[]`<br />
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
إيقاف التشغيل عند أول فشل.

النوع: `boolean`<br />
الافتراضي: `false`

#### name
تنفيذ السيناريوهات التي يتطابق اسمها مع التعبير فقط (قابل للتكرار).

النوع: `RegExp[]`<br />
الافتراضي: `[]`

#### require
طلب الملفات التي تحتوي على تعريفات الخطوات الخاصة بك قبل تنفيذ الميزات. يمكنك أيضًا تحديد نمط عام لتعريفات الخطوات الخاصة بك.

النوع: `string[]`<br />
الافتراضي: `[]`
مثال:

```js
cucumberOpts: {
    require: [path.join(__dirname, 'step-definitions', 'my-steps.js')]
}
```

#### import
المسارات إلى حيث يوجد رمز الدعم الخاص بك، لـ ESM.

النوع: `String[]`<br />
الافتراضي: `[]`
مثال:

```js
cucumberOpts: {
    import: [path.join(__dirname, 'step-definitions', 'my-steps.js')]
}
```

#### strict
الفشل إذا كانت هناك أي خطوات غير محددة أو معلقة.

النوع: `boolean`<br />
الافتراضي: `false`

#### tags
تنفيذ الميزات أو السيناريوهات التي تحتوي على علامات تطابق التعبير فقط.
يرجى الاطلاع على [وثائق Cucumber](https://docs.cucumber.io/cucumber/api/#tag-expressions) لمزيد من التفاصيل.

النوع: `String`<br />
الافتراضي: ``

#### timeout
المهلة بالمللي ثانية لتعريفات الخطوات.

النوع: `Number`<br />
الافتراضي: `30000`

#### retry
تحديد عدد مرات إعادة محاولة حالات الاختبار الفاشلة.

النوع: `Number`<br />
الافتراضي: `0`

#### retryTagFilter
إعادة محاولة الميزات أو السيناريوهات التي تحتوي على علامات تطابق التعبير فقط (قابل للتكرار). يتطلب هذا الخيار تحديد '--retry'.

النوع: `RegExp`

#### language
اللغة الافتراضية لملفات الميزات الخاصة بك

النوع: `String`<br />
الافتراضي: `en`

#### order
تشغيل الاختبارات بترتيب محدد / عشوائي

النوع: `String`<br />
الافتراضي: `defined`

#### format
اسم ومسار ملف الإخراج للمنسق المراد استخدامه.
يدعم WebdriverIO بشكل أساسي فقط [المنسقات](https://github.com/cucumber/cucumber-js/blob/main/docs/formatters.md) التي تكتب الإخراج إلى ملف.

النوع: `string[]`<br />

#### formatOptions
الخيارات التي سيتم توفيرها للمنسقين

النوع: `object`<br />

#### tagsInTitle
إضافة علامات cucumber إلى اسم الميزة أو السيناريو

النوع: `Boolean`<br />
الافتراضي: `false`

***يرجى ملاحظة أن هذا خيار خاص بـ @wdio/cucumber-framework وغير معترف به من قبل cucumber-js نفسه***<br/>

#### ignoreUndefinedDefinitions
التعامل مع التعريفات غير المحددة كتحذيرات.

النوع: `Boolean`<br />
الافتراضي: `false`

***يرجى ملاحظة أن هذا خيار خاص بـ @wdio/cucumber-framework وغير معترف به من قبل cucumber-js نفسه***<br/>

#### failAmbiguousDefinitions
التعامل مع التعريفات الغامضة كأخطاء.

النوع: `Boolean`<br />
الافتراضي: `false`

***يرجى ملاحظة أن هذا خيار خاص بـ @wdio/cucumber-framework وغير معترف به من قبل cucumber-js نفسه***<br/>

#### tagExpression
تنفيذ الميزات أو السيناريوهات التي تحتوي على علامات تطابق التعبير فقط.
يرجى الاطلاع على [وثائق Cucumber](https://docs.cucumber.io/cucumber/api/#tag-expressions) لمزيد من التفاصيل.

النوع: `String`<br />
الافتراضي: ``

***يرجى ملاحظة أن هذا الخيار سيتم إهماله في المستقبل. استخدم خاصية التكوين [`tags`](#tags) بدلاً من ذلك***

#### profile
تحديد الملف الشخصي المراد استخدامه.

النوع: `string[]`<br />
الافتراضي: `[]`

***يرجى ملاحظة أنه يتم دعم قيم محددة فقط (worldParameters و name و retryTagFilter) داخل الملفات الشخصية، حيث أن `cucumberOpts` لها الأولوية. بالإضافة إلى ذلك، عند استخدام ملف شخصي، تأكد من عدم الإعلان عن القيم المذكورة داخل `cucumberOpts`.***

### تخطي الاختبارات في cucumber

لاحظ أنه إذا كنت تريد تخطي اختبار باستخدام قدرات تصفية اختبار cucumber العادية المتوفرة في `cucumberOpts`، فستفعل ذلك لجميع المتصفحات والأجهزة المكونة في القدرات. من أجل أن تكون قادرًا على تخطي السيناريوهات فقط لمجموعات قدرات محددة دون بدء جلسة إذا لم تكن ضرورية، يوفر webdriverio بناء العلامة المحدد التالي لـ cucumber:

`@skip([condition])`

حيث تكون الشرط عبارة عن مجموعة اختيارية من خصائص القدرات مع قيمها التي عندما تتطابق **جميعها** مع السيناريو المميز بالعلامة أو الميزة سيتم تخطيها. بالطبع يمكنك إضافة العديد من العلامات إلى السيناريوهات والميزات لتخطي الاختبارات في ظل ظروف مختلفة.

يمكنك أيضًا استخدام التعليق التوضيحي '@skip' لتخطي الاختبارات دون تغيير `tagExpression'. في هذه الحالة سيتم عرض الاختبارات المتخطاة في تقرير الاختبار.

إليك بعض الأمثلة على هذا البناء:
- `@skip` أو `@skip()`: سيتم دائمًا تخطي العنصر المميز بالعلامة
- `@skip(browserName="chrome")`: لن يتم تنفيذ الاختبار على متصفحات chrome.
- `@skip(browserName="firefox";platformName="linux")`: سيتم تخطي الاختبار في تنفيذات firefox على linux.
- `@skip(browserName=["chrome","firefox"])`: سيتم تخطي العناصر المميزة بالعلامة لكل من متصفحات chrome و firefox.
- `@skip(browserName=/i.*explorer/)`: سيتم تخطي القدرات ذات المتصفحات التي تطابق التعبير العادي (مثل `iexplorer` و `internet explorer` و `internet-explorer` وما إلى ذلك).

### استيراد مساعد تعريف الخطوة

لاستخدام مساعد تعريف الخطوة مثل `Given` و `When` أو `Then` أو الخطافات، من المفترض أن تقوم باستيرادها من `@cucumber/cucumber`، على سبيل المثال:

```js
import { Given, When, Then } from '@cucumber/cucumber'
```

الآن، إذا كنت تستخدم Cucumber بالفعل لأنواع أخرى من الاختبارات غير المرتبطة بـ WebdriverIO والتي تستخدم إصدارًا محددًا، فأنت بحاجة إلى استيراد هذه المساعدات في اختبارات e2e الخاصة بك من حزمة WebdriverIO Cucumber، على سبيل المثال:

```js
import { Given, When, Then, world, context } from '@wdio/cucumber-framework'
```

هذا يضمن أنك تستخدم المساعدين المناسبين ضمن إطار عمل WebdriverIO ويسمح لك باستخدام إصدار Cucumber مستقل لأنواع أخرى من الاختبارات.

### نشر التقرير

يوفر Cucumber ميزة لنشر تقارير تشغيل الاختبار الخاصة بك على `https://reports.cucumber.io/`، والتي يمكن التحكم فيها إما عن طريق تعيين علامة `publish` في `cucumberOpts` أو عن طريق تكوين متغير البيئة `CUCUMBER_PUBLISH_TOKEN`. ومع ذلك، عندما تستخدم `WebdriverIO` لتنفيذ الاختبار، هناك قيد في هذا النهج. فهو يقوم بتحديث التقارير بشكل منفصل لكل ملف ميزة، مما يجعل من الصعب عرض تقرير موحد.

للتغلب على هذا القيد، قدمنا طريقة تعتمد على الوعود تسمى `publishCucumberReport` ضمن `@wdio/cucumber-framework`. يجب استدعاء هذه الطريقة في مُعالج `onComplete`، وهو المكان الأمثل لاستدعائها. تتطلب `publishCucumberReport` إدخال دليل التقرير حيث يتم تخزين تقارير رسائل cucumber.

يمكنك إنشاء تقارير `cucumber message` عن طريق تكوين خيار `format` في `cucumberOpts` الخاص بك. يُنصح بشدة بتوفير اسم ملف ديناميكي ضمن خيار تنسيق `cucumber message` لمنع الكتابة فوق التقارير وضمان تسجيل كل تشغيل اختبار بدقة.

قبل استخدام هذه الوظيفة، تأكد من تعيين متغيرات البيئة التالية:
- CUCUMBER_PUBLISH_REPORT_URL: عنوان URL حيث تريد نشر تقرير Cucumber. إذا لم يتم توفيره، سيتم استخدام عنوان URL الافتراضي 'https://messages.cucumber.io/api/reports'.
- CUCUMBER_PUBLISH_REPORT_TOKEN: رمز التفويض المطلوب لنشر التقرير. إذا لم يتم تعيين هذا الرمز، فستخرج الوظيفة دون نشر التقرير.

إليك مثال على التكوينات والعينات الرمزية اللازمة للتنفيذ:

```javascript
import { v4 as uuidv4 } from 'uuid'
import { publishCucumberReport } from '@wdio/cucumber-framework';

export const config = {
    // ... خيارات التكوين الأخرى
    cucumberOpts: {
        // ... تكوين خيارات Cucumber
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

[Serenity/JS](https://serenity-js.org?pk_campaign=wdio8&pk_source=webdriver.io) هو إطار عمل مفتوح المصدر مصمم لجعل اختبار القبول والانحدار للأنظمة البرمجية المعقدة أسرع وأكثر تعاونًا وأسهل في التوسع.

بالنسبة لمجموعات اختبار WebdriverIO، يقدم Serenity/JS:
- [تقارير محسنة](https://serenity-js.org/handbook/reporting/?pk_campaign=wdio8&pk_source=webdriver.io) - يمكنك استخدام Serenity/JS
  كبديل مباشر لأي إطار عمل WebdriverIO مدمج لإنتاج تقارير تنفيذ اختبار متعمقة ووثائق حية لمشروعك.
- [واجهات برمجة تطبيقات نمط السيناريو](https://serenity-js.org/handbook/design/screenplay-pattern/?pk_campaign=wdio8&pk_source=webdriver.io) - لجعل رمز الاختبار الخاص بك قابلاً للنقل وإعادة الاستخدام عبر المشاريع والفرق،
  يمنحك Serenity/JS [طبقة تجريد](https://serenity-js.org/api/webdriverio?pk_campaign=wdio8&pk_source=webdriver.io) اختيارية فوق واجهات برمجة تطبيقات WebdriverIO الأصلية.
- [مكتبات التكامل](https://serenity-js.org/api/core/?pk_campaign=wdio8&pk_source=webdriver.io) - بالنسبة لمجموعات الاختبار التي تتبع نمط السيناريو،
  يوفر Serenity/JS أيضًا مكتبات تكامل اختيارية لمساعدتك في كتابة [اختبارات API](https://serenity-js.org/api/rest/?pk_campaign=wdio8&pk_source=webdriver.io)،
  [إدارة الخوادم المحلية](https://serenity-js.org/api/local-server/?pk_campaign=wdio8&pk_source=webdriver.io)، [إجراء تأكيدات](https://serenity-js.org/api/assertions/?pk_campaign=wdio8&pk_source=webdriver.io)، والمزيد!

![مثال تقرير Serenity BDD](/img/serenity-bdd-reporter.png)

### تثبيت Serenity/JS

لإضافة Serenity/JS إلى [مشروع WebdriverIO موجود](https://webdriver.io/docs/gettingstarted)، قم بتثبيت وحدات Serenity/JS التالية من NPM:

```sh npm2yarn
npm install @serenity-js/{core,web,webdriverio,assertions,console-reporter,serenity-bdd} --save-dev
```

تعرف على المزيد حول وحدات Serenity/JS:
- [`@serenity-js/core`](https://serenity-js.org/api/core/?pk_campaign=wdio8&pk_source=webdriver.io)
- [`@serenity-js/web`](https://serenity-js.org/api/web/?pk_campaign=wdio8&pk_source=webdriver.io)
- [`@serenity-js/webdriverio`](https://serenity-js.org/api/webdriverio/?pk_campaign=wdio8&pk_source=webdriver.io)
- [`@serenity-js/assertions`](https://serenity-js.org/api/assertions/?pk_campaign=wdio8&pk_source=webdriver.io)
- [`@serenity-js/console-reporter`](https://serenity-js.org/api/console-reporter/?pk_campaign=wdio8&pk_source=webdriver.io)
- [`@serenity-js/serenity-bdd`](https://serenity-js.org/api/serenity-bdd/?pk_campaign=wdio8&pk_source=webdriver.io)

### تكوين Serenity/JS

لتمكين التكامل مع Serenity/JS، قم بتكوين WebdriverIO كما يلي:

<Tabs>
<TabItem value="wdio-conf-typescript" label="TypeScript" default>

```typescript title="wdio.conf.ts"
import { WebdriverIOConfig } from '@serenity-js/webdriverio';

export const config: WebdriverIOConfig = {

    // أخبر WebdriverIO باستخدام إطار عمل Serenity/JS
    framework: '@serenity-js/webdriverio',

    // تكوين Serenity/JS
    serenity: {
        // قم بتكوين Serenity/JS لاستخدام المحول المناسب لمشغل الاختبار الخاص بك
        runner: 'cucumber',
        // runner: 'mocha',
        // runner: 'jasmine',

        // تسجيل خدمات تقارير Serenity/JS، المعروفة أيضًا باسم "stage crew"
        crew: [
            // اختياري، طباعة نتائج تنفيذ الاختبار إلى المخرجات القياسية
            '@serenity-js/console-reporter',

            // اختياري، إنتاج تقارير Serenity BDD ووثائق حية (HTML)
            '@serenity-js/serenity-bdd',
            [ '@serenity-js/core:ArtifactArchiver', { outputDirectory: 'target/site/serenity' } ],

            // اختياري، التقاط لقطات شاشة تلقائيًا عند فشل التفاعل
            [ '@serenity-js/web:Photographer', { strategy: 'TakePhotosOfFailures' } ],
        ]
    },

    // تكوين مشغل Cucumber الخاص بك
    cucumberOpts: {
        // انظر خيارات تكوين Cucumber أدناه
    },


    // ... أو مشغل Jasmine
    jasmineOpts: {
        // انظر خيارات تكوين Jasmine أدناه
    },

    // ... أو مشغل Mocha
    mochaOpts: {
        // انظر خيارات تكوين Mocha أدناه
    },

    runner: 'local',

    // أي تكوين WebdriverIO آخر
};
```

</TabItem>
<TabItem value="wdio-conf-javascript" label="JavaScript">

```typescript title="wdio.conf.js"
export const config = {

    // أخبر WebdriverIO باستخدام إطار عمل Serenity/JS
    framework: '@serenity-js/webdriverio',

    // تكوين Serenity/JS
    serenity: {
        // قم بتكوين Serenity/JS لاستخدام المحول المناسب لمشغل الاختبار الخاص بك
        runner: 'cucumber',
        // runner: 'mocha',
        // runner: 'jasmine',

        // تسجيل خدمات تقارير Serenity/JS، المعروفة أيضًا باسم "stage crew"
        crew: [
            '@serenity-js/console-reporter',
            '@serenity-js/serenity-bdd',
            [ '@serenity-js/core:ArtifactArchiver', { outputDirectory: 'target/site/serenity' } ],
            [ '@serenity-js/web:Photographer', { strategy: 'TakePhotosOfFailures' } ],
        ]
    },

    // تكوين مشغل Cucumber الخاص بك
    cucumberOpts: {
        // انظر خيارات تكوين Cucumber أدناه
    },


    // ... أو مشغل Jasmine
    jasmineOpts: {
        // انظر خيارات تكوين Jasmine أدناه
    },

    // ... أو مشغل Mocha
    mochaOpts: {
        // انظر خيارات تكوين Mocha أدناه
    },

    runner: 'local',

    // أي تكوين WebdriverIO آخر
};
```

</TabItem>
</Tabs>

تعرف على المزيد حول:
- [خيارات تكوين Serenity/JS Cucumber](https://serenity-js.org/api/cucumber-adapter/interface/CucumberConfig/?pk_campaign=wdio8&pk_source=webdriver.io)
- [خيارات تكوين Serenity/JS Jasmine](https://serenity-js.org/api/jasmine-adapter/interface/JasmineConfig/?pk_campaign=wdio8&pk_source=webdriver.io)
- [خيارات تكوين Serenity/JS Mocha](https://serenity-js.org/api/mocha-adapter/interface/MochaConfig/?pk_campaign=wdio8&pk_source=webdriver.io)
- [ملف تكوين WebdriverIO](configurationfile)

### إنتاج تقارير Serenity BDD ووثائق حية

يتم إنشاء [تقارير Serenity BDD والوثائق الحية](https://serenity-bdd.github.io/docs/reporting/the_serenity_reports) بواسطة [Serenity BDD CLI](https://github.com/serenity-bdd/serenity-core/tree/main/serenity-cli)،
وهو برنامج Java يتم تنزيله وإدارته بواسطة وحدة [`@serenity-js/serenity-bdd`](https://serenity-js.org/api/serenity-bdd/?pk_campaign=wdio8&pk_source=webdriver.io).

لإنتاج تقارير Serenity BDD، يجب على مجموعة الاختبار الخاصة بك:
- تنزيل Serenity BDD CLI، عن طريق استدعاء `serenity-bdd update` الذي يخزن CLI `jar` محليًا
- إنتاج تقارير Serenity BDD `.json` وسيطة، عن طريق تسجيل [`SerenityBDDReporter`](https://serenity-js.org/api/serenity-bdd/class/SerenityBDDReporter/?pk_campaign=wdio8&pk_source=webdriver.io) وفقًا لـ [تعليمات التكوين](#configuring-serenityjs)
- استدعاء Serenity BDD CLI عندما تريد إنتاج التقرير، عن طريق استدعاء `serenity-bdd run`

النمط المستخدم من قبل جميع [قوالب مشروع Serenity/JS](https://serenity-js.org/handbook/project-templates/?pk_campaign=wdio8&pk_source=webdriver.io#webdriverio) يعتمد
على استخدام:
- سكريبت NPM [`postinstall`](https://docs.npmjs.com/cli/v9/using-npm/scripts#life-cycle-operation-order) لتنزيل Serenity BDD CLI
- [`npm-failsafe`](https://www.npmjs.com/package/npm-failsafe) لتشغيل عملية إعداد التقارير حتى لو فشلت مجموعة الاختبار نفسها (وهذا هو بالضبط عندما تحتاج إلى تقارير الاختبار أكثر...).
- [`rimraf`](https://www.npmjs.com/package/rimraf) كطريقة مريحة لإزالة أي تقارير اختبار متبقية من التشغيل السابق

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

لمعرفة المزيد عن `SerenityBDDReporter`، يرجى الرجوع إلى:
- تعليمات التثبيت في [وثائق `@serenity-js/serenity-bdd`](https://serenity-js.org/api/serenity-bdd/?pk_campaign=wdio8&pk_source=webdriver.io)،
- أمثلة التكوين في [وثائق API `SerenityBDDReporter`](https://serenity-js.org/api/serenity-bdd/class/SerenityBDDReporter/?pk_campaign=wdio8&pk_source=webdriver.io)،
- [أمثلة Serenity/JS على GitHub](https://github.com/serenity-js/serenity-js/tree/main/examples).

### استخدام واجهات برمجة تطبيقات نمط السيناريو Serenity/JS

[نمط السيناريو](https://serenity-js.org/handbook/design/screenplay-pattern/?pk_campaign=wdio8&pk_source=webdriver.io) هو نهج مبتكر يركز على المستخدم لكتابة اختبارات قبول آلية عالية الجودة. إنه يوجهك نحو استخدام فعال لطبقات التجريد،
يساعد سيناريوهات الاختبار الخاصة بك على التقاط المصطلحات التجارية لمجالك، ويشجع على عادات اختبار وهندسة برمجيات جيدة في فريقك.

بشكل افتراضي، عندما تسجل `@serenity-js/webdriverio` كـ `framework` الخاص بـ WebdriverIO،
يقوم Serenity/JS بتكوين [cast](https://serenity-js.org/api/core/class/Cast/?pk_campaign=wdio8&pk_source=webdriver.io) افتراضي من [actors](https://serenity-js.org/api/core/class/Actor/?pk_campaign=wdio8&pk_source=webdriver.io)،
حيث يمكن لكل ممثل:
- [`BrowseTheWebWithWebdriverIO`](https://serenity-js.org/api/webdriverio/class/BrowseTheWebWithWebdriverIO/?pk_campaign=wdio8&pk_source=webdriver.io)
- [`TakeNotes.usingAnEmptyNotepad()`](https://serenity-js.org/api/core/class/TakeNotes/?pk_campaign=wdio8&pk_source=webdriver.io)

يجب أن يكون هذا كافيًا لمساعدتك على البدء في تقديم سيناريوهات اختبار تتبع نمط السيناريو حتى لمجموعة اختبار موجودة، على سبيل المثال:

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

لمعرفة المزيد عن نمط السيناريو، تحقق من:
- [نمط السيناريو](https://serenity-js.org/handbook/design/screenplay-pattern/?pk_campaign=wdio8&pk_source=webdriver.io)
- [اختبار الويب مع Serenity/JS](https://serenity-js.org/handbook/web-testing/?pk_campaign=wdio8&pk_source=webdriver.io)
- ["BDD in Action, Second Edition"](https://www.manning.com/books/bdd-in-action-second-edition)