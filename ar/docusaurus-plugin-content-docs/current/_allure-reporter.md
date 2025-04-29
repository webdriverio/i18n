---
id: allure-reporter
title: مُسجل التقارير Allure
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-allure-reporter/README.md
---


> إضافة مُسجل تقارير لـ WebdriverIO لإنشاء [تقارير اختبار Allure](https://allurereport.org/docs/webdriverio/).

![مثال على مُسجل تقارير Allure](/img/allure.png)

## التثبيت

الطريقة الأسهل هي تضمين `@wdio/allure-reporter` كتبعية تطوير في ملف `package.json` الخاص بك.

```json
{
  "devDependencies": {
    "@wdio/allure-reporter": "^7.0.0"
  }
}
```

يمكنك ببساطة القيام بذلك عن طريق:

```sh
npm install @wdio/allure-reporter --save-dev
```

## التكوين

قم بتكوين دليل الإخراج في ملف wdio.conf.js الخاص بك:

```js
export const config = {
    // ...
    reporters: [['allure', {
        outputDir: 'allure-results',
        disableWebdriverStepsReporting: true,
        disableWebdriverScreenshotsReporting: true,
    }]],
    // ...
}
```
- `outputDir` يكون افتراضيًا `./allure-results`. بعد اكتمال تشغيل الاختبار، ستجد أن هذا الدليل تم ملؤه بملف `.xml` لكل مواصفة، بالإضافة إلى عدد من ملفات `.txt` و `.png` ومرفقات أخرى.
- `disableWebdriverStepsReporting` - معلمة اختيارية (`false` بشكل افتراضي)، لتسجيل الخطوات المخصصة فقط في مُسجل التقارير.
- `issueLinkTemplate` - معلمة اختيارية، لتحديد نمط رابط المشكلة. سيقوم مُسجل التقارير باستبدال العنصر النائب `{}` بالقيمة المحددة في معلمة استدعاء `addIssue(value)`. يتم تطبيق نفس المنطق إذا تم استخدام Cucumber وتم تعيين علامة `issue` على أي مستوى، وسيتم تحويلها إلى رابط في التقرير. مثال قيمة المعلمة:
  ```
  https://example.org/issue/{}
  ```
- `tmsLinkTemplate` - معلمة اختيارية، لتحديد نمط رابط TMS (نظام إدارة الاختبار). سيقوم مُسجل التقارير باستبدال العنصر النائب `{}` بالقيمة المحددة في معلمة استدعاء `addTestId(value)`. يتم تطبيق نفس المنطق إذا تم استخدام Cucumber وتم تعيين علامة `testId` على أي مستوى، وسيتم تحويلها إلى رابط في التقرير. مثال قيمة المعلمة:
  ```
  https://example.org/tms/{}
  ```
- `disableWebdriverScreenshotsReporting` - معلمة اختيارية (`false` بشكل افتراضي)، لعدم إرفاق لقطات الشاشة بمُسجل التقارير.
- `useCucumberStepReporter` - معلمة اختيارية (`false` بشكل افتراضي)، قم بتعيينها إلى true لتغيير تسلسل التقرير عند استخدام cucumber. جربها بنفسك وانظر كيف تبدو.
- `disableMochaHooks` - معلمة اختيارية (`false` بشكل افتراضي)، قم بتعيينها إلى true لعدم جلب خطافات `before/after` stacktrace/screenshot/result إلى مُسجل تقارير Allure.
- `addConsoleLogs` - معلمة اختيارية (`false` بشكل افتراضي)، قم بتعيينها إلى true لإرفاق سجلات وحدة التحكم من الخطوة إلى مُسجل التقارير.
- `reportedEnvironmentVars` (**النوع:** `Record<string, string>`) - قم بتعيين هذا الخيار لعرض متغيرات البيئة في التقرير. لاحظ أن تعيين هذا لا يعدل متغيرات البيئة الفعلية.

## واجهة برمجة تطبيقات Allure المدعومة
* `addLabel(name, value)` - تعيين تسمية مخصصة للاختبار
* `addFeature(featureName)` – تعيين ميزات للاختبار
* `addStory(storyName)` – تعيين قصة مستخدم للاختبار
* `addSeverity(value)` – تعيين درجة الخطورة للاختبار، يقبل إحدى هذه القيم: blocker، critical، normal، minor، trivial
* `addTag(value)` – تعيين تسمية علامة للاختبار
* `addEpic(value)` – تعيين تسمية ملحمة للاختبار
* `addOwner(value)` – تعيين تسمية مالك للاختبار
* `addSuite(value)` – تعيين تسمية مجموعة للاختبار
* `addSubSuite(value)` – تعيين تسمية مجموعة فرعية للاختبار
* `addParentSuite(value)` – تعيين تسمية مجموعة أصل للاختبار
* `addIssue(value)` – تعيين معرف مشكلة للاختبار
* `addAllureId(value)` – تعيين تسمية معرف اختبار allure للاختبار
* `addTestId(value)` – تعيين معرف اختبار TMS للاختبار
* ~~`addEnvironment(name, value)` ~~ – وظيفة مهملة لم تعد تعمل. استخدم `reportedEnvironmentVars` بدلاً من ذلك
* `addAttachment(name, content, [type])` – حفظ مرفق للاختبار.
    * `name` (*String*) - اسم المرفق.
    * `content` – محتوى المرفق.
    * `type` (*String*، اختياري) – نوع MIME للمرفق، `text/plain` بشكل افتراضي
* `addArgument(name, value)` - إضافة وسيطة إضافية للاختبار
* `addDescription(description, [type])` – إضافة وصف للاختبار.
    * `description` (*String*) - وصف الاختبار.
    * `type` (*String*، اختياري) – نوع الوصف، `text` بشكل افتراضي. القيم ['text'، 'html'،'markdown']
* `addStep(title, [{content, name = 'attachment'}], [status])` - إضافة خطوة للاختبار.
    * `title` (*String*) - اسم الخطوة.
    * `content` (*String*، اختياري) - مرفق الخطوة
    * `name` (*String*، اختياري) - اسم مرفق الخطوة، `attachment` بشكل افتراضي.
    * `status` (*String*، اختياري) - حالة الخطوة، `passed` بشكل افتراضي. يجب أن تكون "failed" أو "passed" أو "broken"
* `startStep(title)` - البدء بخطوة
    * `title` (*String*) - اسم الخطوة.
* `endStep(status)` - الانتهاء من خطوة
    * `status` (*String*، اختياري) - حالة الخطوة، `passed` بشكل افتراضي. يجب أن تكون "failed" أو "passed" أو "broken"
* `step(name, body)` - يبدأ خطوة بدالة محتوى بالداخل. يسمح بإنشاء خطوات بتسلسل هرمي لا نهائي
    * `body` (*Function*) - دالة متزامنة لجسم الخطوة

### الاستخدام
يمكن الوصول إلى واجهة برمجة تطبيقات Allure باستخدام:

CJS

```js
const allureReporter = require('@wdio/allure-reporter').default
```

ESM

```js
import allureReporter from '@wdio/allure-reporter'
```

مثال Mocha

```js
describe('Suite', () => {
    it('Case', () => {
        allureReporter.addFeature('Feature')
    })
})
```

#### Cucumber

مثال أساسي على Cucumber:

```js
Given('I include feature and story name', () => {
    allureReporter.addFeature('Feature_name');
    allureReporter.addStory('Story_name');
})
```

#### خطوات مخصصة

تبسط طريقة `step` التعامل مع الخطوات لأن كل خطوة تقدم كدالة متزامنة مع أي محتوى بالداخل.
الوسيطة الأولى للدالة هي الخطوة الحالية، التي تحتوي على معظم طرق واجهة برمجة تطبيقات allure (مثل `label` و `epic` و `attach` إلخ):

```js
allureReporter.step('my step name', async (s1) => {
    s1.label('foo', 'bar')
    await s1.step('my child step name', async (s2) => {
        // you can add any combination of steps in the body function
    })
})
```

##### علامات Cucumber

يتم تحويل علامات Cucumber ذات الأسماء الخاصة (`issue` و `testId`) إلى روابط (يجب تكوين قوالب الروابط المقابلة مسبقًا):
```gherkin
@issue=BUG-1
@testId=TST-2
Feature: This is a feature with global tags that will be converted to Allure links

  @issue=BUG-3
  @testId=TST-4
  Scenario: This is a scenario with tags that will be converted to Allure links
    Given I do something
```

يتم تعيين علامات Cucumber ذات الأسماء الخاصة (`feature`) إلى تسميات Allure:

```gherkin
Feature: Test user role

  @feature=login
  Scenario: Login
    Given I test login
```

## عرض التقرير

يمكن استهلاك النتائج بواسطة أي من [أدوات إعداد التقارير](https://allurereport.org/) التي يقدمها Allure. على سبيل المثال:

### سطر الأوامر

قم بتثبيت [أداة سطر الأوامر Allure](https://www.npmjs.com/package/allure-commandline)، ومعالجة دليل النتائج:

```sh
allure generate [allure_output_dir] && allure open
```

سيقوم هذا بإنشاء تقرير (بشكل افتراضي في `./allure-report`)، وفتحه في متصفحك.

### إنشاء تقرير تلقائيًا

يمكنك أيضًا إنشاء التقرير تلقائيًا باستخدام أداة سطر الأوامر Allure برمجيًا. للقيام بذلك، قم بتثبيت الحزمة في مشروعك بواسطة:

```sh
npm i allure-commandline
```

ثم أضف أو قم بتوسيع خطاف `onComplete` الخاص بك أو قم بإنشاء [خدمة مخصصة](/docs/customservices) لهذا:

```js
// wdio.conf.js
const allure = require('allure-commandline')

export const config = {
    // ...
    onComplete: function() {
        const reportError = new Error('Could not generate Allure report')
        const generation = allure(['generate', 'allure-results', '--clean'])
        return new Promise((resolve, reject) => {
            const generationTimeout = setTimeout(
                () => reject(reportError),
                5000)

            generation.on('exit', function(exitCode) {
                clearTimeout(generationTimeout)

                if (exitCode !== 0) {
                    return reject(reportError)
                }

                console.log('Allure report successfully generated')
                resolve()
            })
        })
    }
    // ...
}
```

### Jenkins

قم بتثبيت وتكوين [إضافة Jenkins لـ Allure](https://allurereport.org/docs/integrations-jenkins/)

## إضافة لقطات الشاشة

يمكن إرفاق لقطات الشاشة بالتقرير باستخدام وظيفة `takeScreenshot` من WebDriverIO في خطاف `afterTest` لـ Mocha و Jasmine أو خطاف `afterStep` لـ Cucumber.
قم أولاً بتعيين `disableWebdriverScreenshotsReporting: false` في خيارات مسجل التقارير، ثم أضف في خطاف afterStep:

### Mocha / Jasmine

```js title="wdio.conf.js"
afterTest: async function(test, context, { error, result, duration, passed, retries }) {
    if (error) {
        await browser.takeScreenshot();
    }
}
```

### Cucumber

```js title="wdio.conf.js"
afterStep: async function (step, scenario, { error, duration, passed }, context) {
  if (error) {
    await browser.takeScreenshot();
  }
}
```

كما هو موضح في المثال أعلاه، عندما يتم استدعاء هذه الوظيفة، سيتم إرفاق صورة لقطة الشاشة بتقرير allure.