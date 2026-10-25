---
id: v10-migration
title: من v9 إلى v10
description: تحديث مشروع WebdriverIO من v9 إلى v10، مع جميع التغييرات الجذرية ومهارة لوكيل البرمجة تطبّق هذا الدليل.
---

يجمع هذا الدليل التغييرات الجذرية في WebdriverIO `v10` وما يجب عليك فعله حيالها.

على عكس الإصدارات الرئيسية السابقة، لا يمكن تطبيق معظم هذه التغييرات باستخدام [codemod](https://github.com/webdriverio/codemod) الخاص بـ WebdriverIO، لأنها تعتمد على المعنى الفعلي لاختباراتك. أما [توقيعات الأوامر القديمة](#legacy-command-signatures) أدناه فهي استبدالات آلية. ويصف كل قسم آخر كيفية العثور على المواضع المتأثرة في مجموعة اختباراتك.

## الترحيل باستخدام وكيل برمجة

أعطِ وكيلك مهارة الترحيل إلى v10 واطلب منه ترحيل مجموعة الاختبارات إلى WebdriverIO v10 باتباع هذه الصفحة. المهارة هي الإجراء: ما الذي يجب البحث عنه، وأي codemod يجب تشغيله، ومتى يجب التوقف. وهذه الصفحة هي المرجع الموثوق لكل تغيير جذري.

ثبّتها من المشروع الذي تقوم بترقيته. تقرأ [أداة سطر أوامر المهارات](https://skills.sh) الملف [`.agents/skills/wdio-v10-migration/SKILL.md`](https://github.com/webdriverio/webdriverio/blob/main/.agents/skills/wdio-v10-migration/SKILL.md) من هذا المستودع وتكتبه في مجلد المهارات الخاص بالوكلاء الذين تختارهم:

```sh
npx skills add webdriverio/webdriverio --skill wdio-v10-migration
```

يثبّت الخيار `--skill wdio-v10-migration` هذه المهارة. أما مهارات العمل على مستودع WebdriverIO فهي معلّمة بأنها داخلية ولا تُعرض. تسألك أداة سطر الأوامر عن الوكلاء الذين تريد التثبيت لهم وتكتب المهارة في مجلد المشروع الخاص بكل وكيل. يمكنك أيضًا إرفاق ذلك الملف بالمحادثة.

لا تظهر المحددات الصارمة وقوائم `specs` / `exclude` المجردة في القدرات (capabilities) إلا عند تشغيل مجموعة الاختبارات. لا تستطيع المهارة الحسم فيها من الشيفرة المصدرية وحدها.

## Node.js

يتطلب WebdriverIO v10 الإصدار Node.js 22.23.4 أو 24.22.1 أو 26.12.1، أو إصدارًا لاحقًا من هذه الخطوط. هذه هي أول الإصدارات التي تتضمن [مخزن CA المحدَّث](https://nodejs.org/en/blog/vulnerability/october-2026-security-releases) بسبب اختراق شهادة CA الوسيطة الخاصة بـ eMudhra. لم يعد Node.js 18 و20 مدعومين، كما أن Node.js 23 و25 غير مدعومين. يغطي CI الإصدارات Node.js 22 و24 و26.

## اختبارات المكوّنات

لا يزال مشغّل المتصفح يعمل في Chrome 90 وEdge 90 وFirefox 90 وSafari 14.1 أو أحدث. راجع [دعم المتصفحات](/docs/component-testing#browser-support).

تبقى الشيفرة الممرَّرة إلى `browser.execute` عند ES2021، حتى يمكن تشغيلها في المتصفحات الأقدم قيد الاختبار. لم يتغير هذا الحد الأدنى.

## Mocha

تعتمد الحزمتان `@wdio/mocha-framework` و`@wdio/browser-runner` على [Mocha 12](https://mochajs.org/blog/mocha-12-stable/). يحتاج Mocha 12 إلى Node.js `^20.19.0 || >=22.12.0`، وهو ما يغطيه الحد الأدنى لـ v10 وهو Node.js 22.23.4.

```diff
- mochaOpts: { compilers: ['ts:ts-node/register'] }
+ mochaOpts: { require: ['ts-node/register'] }
```

أُزيل `mochaOpts.compilers`. أزال Mocha الخيار `--compilers` المهمَل منذ زمن طويل، لذا يتم تجاهل أي تعيينات متبقية للمترجمات. حمّل أدوات التحويل (transpilers) أو ملفات الإعداد الأخرى باستخدام `mochaOpts.require`.

يتبع WebdriverIO مهلة Mocha: `this.timeout()` في اختبار أو خطّاف (hook)، و`mochaOpts.timeout: 0` الذي يعطّل المهلة. في v9، كان WebdriverIO يتجاهل `this.timeout()` داخل الاختبار، ومنذ 9.22 كان `mochaOpts.timeout: 0` يُفشل كل اختبار ("Timeout after -3ms"). لا تعيد وسيطة `retry` الخاصة بـ WebdriverIO تشغيل الاختبار بعد انتهاء المهلة. راجع [مهل Mocha وخطّافات WebdriverIO](./Timeouts.md#mocha-timeouts-and-the-webdriverio-hooks)، وأيضًا بخصوص `mochaOpts.parallelMode`. جديد في v10: [الاختبارات المتوازية داخل ملف مواصفات](./ParallelTests.md) باستخدام `mochaOpts.parallelMode` أو `cucumberOpts.parallelMode`.

القيمة الافتراضية لـ `failHookAffectedTests` هي `true`. يؤدي فشل خطّاف `before` أو `beforeEach` إلى إفشال الاختبارات التي تخطّاها ذلك الخطّاف. اضبط `mochaOpts.failHookAffectedTests` على `false` للإبلاغ عن الخطّاف فقط.

يحمل عنوان الخطّاف الوصف أو اسم دالة الخطّاف، كما في Mocha: `"before each" hook: login for "my test"` لـ `beforeEach('login', fn)` أو `beforeEach(function login () {})`، أو بدون اسم للخطّاف المجهول: `"before each" hook for "my test"`. في v9 كان يحمل `wrappedHook`، وهو اسم الغلاف الخاص بـ WebdriverIO. سترى هذا العنوان في خطأ الاختبار الذي تخطّاه خطّاف فاشل، وفي أسماء الخطّافات على مستوى الجذر، مثلًا في Allure.

استخدم `expect-webdriverio` 8، راجع [expect-webdriverio 8](#expect-webdriverio-8). يمكن لـ Mocha تحميل هذه الحزمة مرتين في عملية واحدة؛ وهي تشارك حالة التأكيدات بين هاتين النسختين ([expect-webdriverio#2221](https://github.com/webdriverio/expect-webdriverio/pull/2221)).

تغييرات Mocha 12 التي قد تتسرّب عبر `mochaOpts`:

- يقبل `grep` رايات RegExp الحديثة.
- لا يزال `ui` إحدى القيم `bdd` أو `tdd` أو `qunit` أو `exports`. يجب أن تحتفظ الواجهات المخصصة باللاحقة `*-bdd` أو `*-tdd` أو `*-qunit`.
- لا يزال `parallel` غير مدعوم. تتولى WDIO التوازي بين ملفات المواصفات؛ وسيُطلق مجمّع العمال الخاص بـ Mocha خطأً إذا فعّلته.

Mocha 12 يعتمد ESM أولًا (`"type": "module"`). لا يزال `require('mocha')` البرمجي يعمل على Node 22 عبر `require(esm)`. لم تتغير واجهة سطر أوامر WDIO لـ Mocha (`wdio run … --mochaOpts.*`)؛ أما واجهة سطر الأوامر الخاصة بـ Mocha فتستخدم الآن `util.parseArgs` بدلًا من yargs.

## Cucumber

تعتمد `@wdio/cucumber-framework` على [`@cucumber/cucumber` 13](https://github.com/cucumber/cucumber-js/blob/main/UPGRADING.md#1300).

يتطلب Cucumber 13 الإصدار Node.js 22 أو 24 أو 26 أو أحدث. لا يعمل على Node.js 20 أو 23 أو 25. تعلن حزمة إطار العمل عن نطاق v10، الذي يستبعد أيضًا Node.js 23 و25.

```diff
- cucumberOpts: { tagExpression: '@smoke' }
+ cucumberOpts: { tags: '@smoke' }
```

لا يوجد اسم بديل لـ `tagExpression`. ضبطه يطلق خطأً، حتى لا يؤدي مرشّح متبقٍّ إلى تشغيل كل السيناريوهات بصمت.

لم يعد Cucumber 13 يصدّر `Cli`. تمر عمليات التشغيل البرمجية عبر `runCucumber` من `@cucumber/cucumber/api`، وهو ما يستخدمه المحوّل بالفعل.

التغييرات الجذرية الأخرى في Cucumber 13 (مسارات المنسّقات الملتبسة، والعمال المتوازيون، و`BeforeAll` / `AfterAll`) موصوفة في [دليل الترقية الخاص بـ Cucumber](https://github.com/cucumber/cucumber-js/blob/main/UPGRADING.md#1300).

### uid الميزة

uid ميزة Cucumber هو مسار ملف الميزة انطلاقًا من `rootDir`، وليس اسم الملف: `features/admin/login.feature:1:1` بدلًا من `login.feature:1:1`. لم يعد ملفا ميزة بالاسم نفسه في مجلدين مختلفين يتشاركان uid واحدًا. يستخدم `parent` و`fullTitle` الخاصان بالسيناريو هذا الـ uid. تُرمَّز الأحرف `%` و`:` و`#` في المسار إلى `%25` و`%3A` و`%23`، لذا يظل `uid.split(':')[1]` هو رقم السطر ولا تبدأ `#` إلا رقم جزء. في المواصفات المجمّعة ذات الترتيب العشوائي، يكون uid المجموعة للميزة التي تبدأ مجددًا هو `<uid>#2`.

مع `scenarioLevelReporter: true`، يأتي `historyId` في Allure من `fullTitle`، لذا يبدأ سجل Allure لكل سيناريو من جديد مع هذا التغيير. ويبدأ من جديد أيضًا عند تغيّر `rootDir` أو مسار ملف الميزة. للاحتفاظ بسجل واحد لملفات إعداد في مجلدات مختلفة، اضبط `rootDir` نفسه في كل منها.

## Jasmine

تعتمد `@wdio/jasmine-framework` على [Jasmine 6](https://jasmine.github.io/upgrade-guides/6.0). يُختبَر Jasmine 6 على Node.js 20 و22 و24. ويغطي الحد الأدنى لـ v10 وهو Node.js 22.23.4 هذا النطاق بالفعل.

أُزيل `jasmineNodeOpts`. اضبط Jasmine باستخدام `jasmineOpts`. ضبط `jasmineNodeOpts` يطلق خطأً:

```text
The option "jasmineNodeOpts" was removed in WebdriverIO v10. Use "jasmineOpts" instead.
```

```diff
- jasmineNodeOpts: { defaultTimeoutInterval: 60000 }
+ jasmineOpts: { defaultTimeoutInterval: 60000 }
```

لم يعد `jasmineOpts.failFast` يُقرأ. استخدم `jasmineOpts.stopOnSpecFailure`. لا يوقف `failFast` المتبقي مجموعة الاختبارات. أما `failFast` الخاص بـ Cucumber فهو خيار مختلف ولا يزال يعمل.

```diff
- jasmineOpts: { failFast: true }
+ jasmineOpts: { stopOnSpecFailure: true }
```

أُزيل `jasmineOpts.stopSpecOnExpectationFailure`. استخدم `jasmineOpts.oneFailurePerSpec`. ضبط المفتاح القديم يطلق خطأً:

```text
The option "jasmineOpts.stopSpecOnExpectationFailure" was removed in WebdriverIO v10. Use "jasmineOpts.oneFailurePerSpec" instead.
```

```diff
- jasmineOpts: { stopSpecOnExpectationFailure: true }
+ jasmineOpts: { oneFailurePerSpec: true }
```

عادت المطابِقات المتزامنة في Jasmine متزامنةً من جديد. في v9، كان `expect` العام هو `expectAsync` الخاص بـ Jasmine، لذا كان `expect(1).toBe(1)` يعيد وعدًا (promise). في v10، تعيد المطابِقات المدمجة في Jasmine والمطابِقات التي تضيفها باستخدام `jasmine.addMatchers` القيمة `undefined`. أما مطابِقات WebdriverIO ومطابِقات Jasmine غير المتزامنة ومطابِقات `jasmine.addAsyncMatchers` فلا تزال تعيد وعدًا، لذا استمر في استخدام `await` معها. لا تحتاج إلى تغيير `await expect($('#logo')).toBeDisplayed()` إلى `expectAsync()`: فـ `expect` العام يرسل مطابِقات WebdriverIO إلى `expectAsync` نيابةً عنك. ويستمر `await expect(1).toBe(1)` في العمل.

أصبح التأكيد المتزامن الفاشل بدون `await` يُفشل المواصفة الآن. في v9، كان وعدًا مرفوضًا: إذا لم ينتظره شيء، كان يمكن أن تنجح المواصفة، مع ظهور رفض غير معالج في السجل فقط. بعد الترقية، انظر إلى المواصفات التي تبدأ بالفشل. كان فيها فشل مخفي في v9، والإصلاح يكون في الاختبار أو في التطبيق، وليس في استدعاء `expect`:

```js
it('saves the form', async () => {
    const onSave = jasmine.createSpy('onSave')
    await submitForm(onSave)
    // v9: كان ينجح حتى عندما لا تُستدعى `onSave`
    // v10: يفشل عندما لا تُستدعى `onSave`
    expect(onSave).toHaveBeenCalled()
})
```

نتيجة المطابِق المتزامن أصبحت الآن `undefined`، لذا فإن استدعاء `.then()` أو `.catch()` عليها يطلق `TypeError`:

```diff
- expect(total).toBe(3).then(() => log('ok'))
+ expect(total).toBe(3)
+ log('ok')
```

تأثيرات أخرى لهذا التغيير:

- أصبح `oneFailurePerSpec` يوقف المواصفة عند أول تأكيد فاشل: فورًا في حالة المطابِق المتزامن، وعند استقرار الوعد في حالة المطابِق غير المتزامن المنتظَر.
- تعمل مطابِقات الجواسيس (spy) في Jasmine بدون `await`. في v9، كانت `toHaveBeenCalled` و`toHaveSpyInteractions` و`toHaveNoOtherSpyInteractions` تفشل بالرسالة "Does not take arguments"، وكان الجاسوس غير المستدعى ينجح بدون `await`.
- لم يعد `jasmine.addMatchers` يُستبدل، لذا لم يعد Jasmine يعرض تحذير "Monkey patching detected".

للمطابِق `toHaveSize` معنيان. على قيمة WebdriverIO، يكون مطابِق WebdriverIO ويتحقق من حجم العنصر: عنصر، أو مصفوفة عناصر (بما في ذلك نتيجة `$$().filter()`)، أو `Element[]`، أو عنصر متعدد البعد (multi-remote)، أو متصفح، أو سياق تصفح، أو mock، أو غلاف `some()`، أو وعد مثل `$()` القابل للتسلسل. وعلى أي قيمة أخرى، يكون مطابِق Jasmine ويتحقق من الطول. في v9، كان مطابِق Jasmine يعمل دائمًا.

```js
expect([1, 2]).toHaveSize(2)                                   // Jasmine، متزامن
await expect($('#logo')).toHaveSize({ width: 32, height: 32 }) // WebdriverIO، غير متزامن
```

تتبع الأنواع القواعد نفسها. أصبحت `@wdio/jasmine-framework` تعرّف نوع `expect` العام بمطابِقات Jasmine، إضافةً إلى مطابِقات WebdriverIO ومطابِقات Jasmine غير المتزامنة، التي تعيد وعدًا. أزل `expect-webdriverio/jasmine-wdio-expect-async` من `types` في ملف `tsconfig.json`، لأنه يعرّف كل مطابِق على أنه غير متزامن. وأضف `jasmine` إن لم يكن موجودًا:

```diff title="tsconfig.json"
 {
     "compilerOptions": {
-        "types": ["node", "@wdio/globals/types", "expect-webdriverio/jasmine-wdio-expect-async", "@wdio/jasmine-framework"]
+        "types": ["node", "jasmine", "@wdio/globals/types", "@wdio/jasmine-framework"]
     }
 }
```

أصبح `expect.oneOf()` و`expect.multiRemote()` يعملان أيضًا في مواصفات Jasmine. في السابق، لم يكونا موجودين على `expect` الخاص بـ Jasmine وقت التشغيل.

## expect-webdriverio 8

تتطلب `@wdio/globals` و`@wdio/runner` و`@wdio/browser-runner` الحزمة `expect-webdriverio` 8 كاعتمادية نظيرة (peer dependency). في v9، كانت `expect-webdriverio` 5 أو 6 أو 7. إذا كان ملف `package.json` يدرج `expect-webdriverio`، فحدّثها إلى الإصدار 8 في التغيير نفسه مع حزم `@wdio/*`.

لـ `expect-webdriverio` 8 تغييراتها الجذرية الخاصة. يسرد [دليل الترحيل من v7 إلى v8](https://github.com/webdriverio/expect-webdriverio/blob/main/docs/Migrations.md#migration-guide-v7-to-v8) الخاص بها كل تغيير وبديله. إذا كنت تستخدم `expect-webdriverio` 5 أو 6، فاقرأ أيضًا [دليل الترحيل من v5 إلى v6](https://github.com/webdriverio/expect-webdriverio/blob/main/docs/Migrations.md#migration-guide-v5-to-v6): يزيل الإصدار 8 واجهات البرمجة التي أُهملت من 5.6.9 إلى 6.0.0. لا يوجد دليل ترحيل للإصدار 7. فهو يضيف دعم multi-remote، وأصبح `toMatchSnapshot()` و`toMatchInlineSnapshot()` على `$$()` يخزّنان `outerHTML` لكل عنصر: حدّث تلك اللقطات. هذه التغييرات هي الأكثر احتمالًا للتأثير على مجموعة اختبارات:

- يقارن `toHaveText` على `$$()` العناصر فهرسًا بفهرس. تفشل المصفوفة المتوقعة إذا كانت بترتيب مختلف عن الصفحة. استخدم ترتيب الصفحة، أو `expect.oneOf()` أو `expect.arrayContaining()`.
- تفشل مصفوفة من القيم المتوقعة على عنصر واحد في `toHaveText` و`toHaveHTML` و`toHaveComputedLabel` و`toHaveComputedRole` و`toHaveElementClass`. استخدم `expect.oneOf()`. بالنسبة إلى `toHaveElementClass`، كانت المصفوفة تعني "يملك أيًّا من هذه الأصناف": استخدم `expect.oneOf()`، أو تأكيدًا واحدًا لكل صنف عندما يجب أن يملك العنصر جميعها.
- يطلق مطابِق القوائم (`expect.arrayContaining()`، `expect.arrayOf()`) على عنصر واحد، أو مع `some()`، خطأً. وعلى `$$()`، يقارن قيم جميع العناصر دفعة واحدة.
- السمة (attribute) أو الخاصية المفقودة لا تتطابق أبدًا، ولا حتى مع مطابِق يقبل غياب القيمة، مثل `expect.not.stringContaining()`.
- تُقارن قيم `URL` و`Set` و`Map` والقيم الثنائية بحسب محتواها. قد يفشل الآن تأكيد كان ينجح عن طريق الخطأ.
- لم تعد الأنواع المساعدة عامة. يفشل الملف الذي يستخدم `Test` أو `TestResult` أو `Scenario` أو `WdioCustomMatchers` بدون استيراد بالخطأ `Cannot find name`: استخدم `Frameworks.Test` و`Frameworks.TestResult` و`Frameworks.Scenario` من `@wdio/types`، و`ExpectWebdriverIO.Matchers`.
- أُزيل `setFeatureFlags()` والخيار `featureFlags`.
- أُزيلت واجهات البرمجة المهملة التالية: `setOptions` (استخدم `setDefaultOptions`)، و`getConfig` (استخدم `getDefaultOptions`)، و`matchers` (استخدم `wdioCustomMatchers`)، و`toHaveAttr` (استخدم `toHaveAttribute`)، و`toHaveClass` (استخدم `toHaveElementClass`)، و`toBeRequestedWithResponse()` (استخدم `toBeRequestedWith({ response })`)، و`expect-webdriverio/types` (استخدم `expect-webdriverio/expect-global`).
- يحصل الخطّافان `beforeAssertion` و`afterAssertion` على اسم الاسم البديل الذي استدعاه الاختبار، بالنسبة إلى `toBeExisting` و`toBePresent` و`toHaveLink` و`toHaveValue` و`toBeRequested`. في v9، كانا يحصلان على اسم المطابِق الذي يقف خلف الاسم البديل، مثلًا `toExist` بدلًا من `toBeExisting`.
- على متصفح multi-remote، مرّر نتيجة `$$()` إلى `expect`. لا يُتعرّف على مصفوفة عادية مثل `[...elements]` أو `Array.from(elements)` على أنها عناصر، ويفشل التأكيد.

على متصفح multi-remote، يتحقق تأكيد واحد من كل نسخة، ويعطي `expect.multiRemote()` قيمة متوقعة واحدة لكل نسخة. راجع [تأكيدات Multiremote](/docs/multiremote#assertions).

## حزم المشغّلات (Drivers)

يشغّل WebdriverIO v10 متصفحات Firefox وEdge وSafari باستخدام `geckodriver` 8 و`edgedriver` 8 و`safaridriver` 3. في v9، كان يستخدم `geckodriver` و`edgedriver` 6 أو 7، و`safaridriver` 1 أو 2. يثبّتها WebdriverIO، لذا لا تدرجها بنفسك. إذا كان ملف `package.json` يدرج أحدها، فحدّثه في التغيير نفسه مع حزم `@wdio/*`.

تأخذ `geckodriver` و`edgedriver` الحزمة `@wdio/logger` كاعتمادية نظيرة، لذا تسجّلان عبر المسجّل الخاص بتثبيت WebdriverIO لديك. في v9، كانت `geckodriver` و`edgedriver` تجلبان نسختهما الخاصة من `@wdio/logger`، وكانت تلك النسخة الثانية تفرّغ ملف السجل في `outputDir`. شغّل `npm ls @wdio/logger`: يجب أن تكون كل نسخة بالإصدار 10. أي إضافة أو خدمة لا تزال تعتمد على الإصدار 9 لها التأثير نفسه.

تسرد [ملاحظات ترقية المشغّلات](https://github.com/webdriverio/driver#upgrading-to-geckodriver-8-edgedriver-8-and-safaridriver-3) كل تغيير. قد تؤثر هذه التغييرات على مشروع WebdriverIO:

- تستخدم تنزيلات المشغّلات `HTTPS_PROXY` و`HTTP_PROXY`. في v9، كانت تنزيلات `geckodriver` و`edgedriver` تتجاهلهما. إذا كان هناك وكيل (proxy) مضبوط في بيئتك لكن يجب الوصول إلى CDN المشغّل مباشرة، فأضف مضيفه إلى `NO_PROXY`.
- لم يعد `geckodriver` يقرأ `GECKODRIVER_FILEPATH`. استخدم `GECKODRIVER_PATH`.
- يقبل `wdio:edgedriverOptions` و`wdio:safaridriverOptions` الخيار `spawnOpts`، كما يفعل `wdio:chromedriverOptions`.

## تنزيلات المتصفحات

في v9، كان WebdriverIO يفك ضغط ملفات zip الخاصة بـ Chrome وChromium وChromedriver بنفسه. في v10 يستخدم أمر النظام `unzip` على Linux وmacOS (`tar.exe` أو PowerShell على Windows). صور Docker المصغّرة، مثل `node:24-slim`، لا تحتويه: ثبّته، راجع [Docker](/docs/docker#images-where-webdriverio-downloads-the-browser).

في v9، كانت تنزيلات Chrome وChromium وFirefox وChromedriver تستخدم `HTTPS_PROXY` و`HTTP_PROXY`. في v10 تستخدمهما فقط عندما تكون `proxy-agent` مثبتة في مشروعك، أو عندما يعمل Node.js مع `NODE_USE_ENV_PROXY=1`. يسجّل WebdriverIO تحذيرًا عندما يكون متغير وكيل مضبوطًا لكن التنزيل سيتجاهله. راجع [الوكيل لتنزيلات المتصفحات والمشغّلات](/docs/proxy#proxy-for-browser-and-driver-downloads).

## المتغير العام لـ Multi-remote

أُزيل المتغير العام `multiremotebrowser` ذو الأحرف الصغيرة، من `@wdio/globals` ومن المتغيرات العامة في `eslint-plugin-wdio` أيضًا. استخدم `multiRemoteBrowser`.

```diff
- import { multiremotebrowser } from '@wdio/globals'
+ import { multiRemoteBrowser } from '@wdio/globals'
```

## القدرات (Capabilities)

لم يعد `specs` و`exclude` في القدرات يُقرآن. استخدم `wdio:specs` و`wdio:exclude`.

```diff
  capabilities: [{
      browserName: 'chrome',
-     specs: ['./test/specs/chrome/**/*.js'],
-     exclude: ['./test/specs/chrome/skip.js']
+     'wdio:specs': ['./test/specs/chrome/**/*.js'],
+     'wdio:exclude': ['./test/specs/chrome/skip.js']
  }]
```

تبقى مفاتيح الإعداد في المستوى الأعلى `specs` و`exclude`. لا تحدد القائمة المجردة المتبقية على قدرةٍ ما الملفاتَ لتلك القدرة. فتستخدم القدرة حينها `specs` و`exclude` في المستوى الأعلى.

أُزيل الاسمان البديلان `tunnelIdentifier` و`parentTunnel` من أنواع خيارات Sauce Labs. استخدم `tunnelName` و`tunnelOwner`.

## TypeScript

أُزيلت الأنواع `Element` و`MultiRemoteBrowser` و`MultiRemoteElement` التي كانت تصدّرها `webdriverio`. استخدم مساحة الأسماء العامة `WebdriverIO`.

```diff
- import type { Element } from 'webdriverio'
- const elem: Element = await $('#foo')
+ const elem: WebdriverIO.Element = await $('#foo')
```

أصبح `ChainablePromiseElement` يعلن عن `then`، ويعلن `ChainablePromiseArray` عن `then` و`catch` و`finally`. تصف الأنواع القابلة للتسلسل القيمة قبل `await`. ولم تعد تناسب القيمة المنتظَرة:

```ts
let elem: ChainablePromiseElement
elem = await $('h1')
// TS2741: Property 'then' is missing in type 'Element' but required in type 'ChainablePromiseElement'.

let elems: ChainablePromiseArray
elems = await $$('li')
// TS2322: Type 'ElementArray' is not assignable to type 'ChainablePromiseArray'.
```

حدّد نوع القيمة المنتظَرة على أنه `WebdriverIO.Element` أو `WebdriverIO.ElementArray`:

```diff
- let elem: ChainablePromiseElement = await $('h1')
- let elems: ChainablePromiseArray = await $$('li')
+ let elem: WebdriverIO.Element = await $('h1')
+ let elems: WebdriverIO.ElementArray = await $$('li')
```

يطابق كلا النوعين القابلين للتسلسل الآن `T extends PromiseLike<unknown>`. يأخذ النوع الشرطي الذي يتحقق من `PromiseLike` فرعًا مختلفًا لـ `$()` و`$$()` عمّا كان في v9. على سبيل المثال، أصبح `Awaited<ChainablePromiseElement>` الآن `WebdriverIO.Element`، و`Awaited<ChainablePromiseArray>` هو `WebdriverIO.ElementArray`.

تغيّر نوع خصائص `$$()` غير المنتظَر. فهي متاحة فورًا، قبل أن يُحل الاستعلام، لذا اقرأها بدون `await` أو `.then()`:

| الخاصية | v9 | v10 |
|---|---|---|
| `selector` | `Promise<Selector>` | `Selector \| undefined` |
| `parent` | `Promise<...>` | العنصر الأب، وليس وعدًا (انظر أدناه) |
| `foundWith` | لا يوجد | الأمر الذي وجد القائمة، مثل `$$` أو `custom$$` |
| `props` | لا يوجد | الوسيطات الإضافية لذلك الأمر |

```diff
- const selector = await $$('li').selector
+ const selector = $$('li').selector
```

في استعلام متسلسل مثل `$('form').$$('input')`، يكون `parent` هو `$('form')` القابل للتسلسل إلى أن تُحل القائمة، ثم العنصر المحلول بعد ذلك. انتظر القائمة قبل أن تستخدم `parent` كعنصر.

وقت التشغيل، تعيد `filter()` و`filterSeries()` و`slice()` على قائمة `$$()` قائمة عناصر، وليس مصفوفة عادية. وتحتفظ النتيجة بـ `selector` و`foundWith` و`parent` و`props` الخاصة بالقائمة المصدر. في v9، كانت `filter()` تعيد مصفوفة عادية بدون هذه الخصائص. لا تُظهر الأنواع ذلك بعد: إذ يُعلَن أن `filter()` و`filterSeries()` تعيدان `Promise<WebdriverIO.Element[]>`، وأن `slice()` تعيد `WebdriverIO.Element[]`، لذا يبلغ TypeScript عن خطأ عندما تقرأ هذه الخصائص على النتيجة.

لا يعيد WebdriverIO تشغيل الاستعلام للقائمة المشتقة نفسها: فالفهرس الذي يتجاوز نهايتها لا ينتظر مزيدًا من التطابقات، ولا يعيد أبدًا عنصرًا استبعده المرشّح. أعضاؤها لا يزالون عناصر الاستعلام المصدر، بقيم `selector` و`index` الأصلية. إذا أصبح أحد الأعضاء قديمًا (stale)، يجلبه WebdriverIO مجددًا من الاستعلام المصدر عند ذلك الفهرس، وقد يكون عنصرًا آخر إذا تغيّرت الصفحة. الشيفرة التي تعيد تشغيل استعلام القائمة من خصائصها، مثلًا `parent[foundWith](selector, ...props)`، تحصل على القائمة الكاملة، وليس المرشَّحة.

تضبط الحزم المنشورة `typeScriptVersion` على 6.0.3، بما يطابق إصدار TypeScript الذي يُترجَم به هذا المستودع.

يقبل `browser.mock()` كائن `URLPattern` من `urlpattern-polyfill` و`URLPattern` الأصلي (العام في Node.js 24، والمعرّف نوعه في مكتبة `dom` الخاصة بـ TypeScript 6).

يُهمل TypeScript 6 كلًّا من `"moduleResolution": "node"` و`"baseUrl"`، ويجعل `strict` هو الافتراضي. أصبح `create-wdio` يولّد `"moduleResolution": "bundler"` لمشاريع ESM و`"NodeNext"` لمشاريع CommonJS. إذا حدّثت TypeScript في مشروع قائم، فغيّر هذه الخيارات في ملف `tsconfig.json`.

لمشروع ESM:

```diff title="tsconfig.json"
 {
     "compilerOptions": {
-        "moduleResolution": "node",
+        "moduleResolution": "bundler",
         "module": "ESNext"
     }
 }
```

لمشروع CommonJS، استخدم `NodeNext` لكلا الخيارين، كما يفعل `create-wdio`:

```diff title="tsconfig.json"
 {
     "compilerOptions": {
-        "moduleResolution": "node",
-        "module": "CommonJS"
+        "moduleResolution": "NodeNext",
+        "module": "NodeNext"
     }
 }
```

يغيّر TypeScript 6 أيضًا القيمة الافتراضية لـ `types` إلى `[]`، لذا لم يعد يحمّل كل حزم `@types/*` المثبتة. إذا لم يكن في ملف `tsconfig.json` قائمة `types`، تفشل المتغيرات العامة مثل `describe` و`it` الخاصة بـ Mocha بالخطأ `Cannot find name`. أدرج حزم الأنواع التي تستخدمها اختباراتك، كما يفعل `create-wdio`. على سبيل المثال، مع Mocha:

```diff title="tsconfig.json"
 {
     "compilerOptions": {
+        "types": ["node", "@wdio/globals/types", "@wdio/mocha-framework"]
     }
 }
```

يكتب `npm create wdio@latest` القيمتين `compilerOptions.target` و`compilerOptions.lib` على أنهما `es2024`. يحتاج التحقق من أنواع هذا الملف إلى TypeScript 5.7 أو أحدث. لا يتحقق `tsx`، الذي يشغّل الإعداد والاختبارات، من الأنواع، لذا لا يهم المترجم الأقدم إلا عندما تشغّل `tsc` بنفسك.

لا يُعاد كتابة ملف `tsconfig.json` القائم. ويحتفظ الإعداد المولَّد الذي يمتد من إعداد آخر بقيمتي `target` و`lib` الخاصتين بالإعداد الأب.

في الخطّاف `afterAssertion`، أصبح نوع `params.result` الآن `{ pass, message }`، كما تعطيه المطابِقات. في v9، كان النوع `{ result, message }`، لكن `params.result.result` كان دائمًا `undefined` وقت التشغيل. اقرأ `params.result.pass`:

```diff
  afterAssertion (params) {
-     console.log(params.matcherName, params.result.result)
+     console.log(params.matcherName, params.result.pass)
  }
```

تكون `pass` بقيمة `true` عندما تطابق القيمة القيمة المتوقعة، حتى مع `.not`. وبالتالي مع `.not`، ينجح التأكيد عندما تكون `pass` بقيمة `false`. لا يخبرك الخطّاف ما إذا كان الاختبار قد استخدم `.not`.

## خطّافات الأوامر

يشغّل أمر العنصر الخطّافين `beforeCommand` و`afterCommand` مرة واحدة، مع وسيطات الأمر. في v9، كان يشغّلهما مرتين أو ثلاثًا، وكان الاستدعاء الأول يحصل على `[]` كقيمة لـ `args`. الأمر الذي يعمل داخل أمر آخر (مثلًا `getElementText` داخل `getText`) لا يزال له زوجه الخاص. لا تعمل الخطّافات لدالة الحدث `emit`. والخطّاف الذي يعدّ الأوامر أو يقيس وقتها يرى كل أمر مرة واحدة.

بالنسبة لأمر العنصر، يعمل `beforeCommand` قبل أن ينتظر WebdriverIO العنصر، لذا قد يكون العنصر لا يزال مفقودًا عندها. ويعمل `afterCommand` بعد الانتظار وأي إعادة محاولة، مع نتيجة المحاولة الأخيرة أو خطئها. الخطّاف الذي يحتاج إلى العنصر الذي عُثر عليه يستخدم `afterCommand`.

الأمر المعدّل باستخدام `overwriteCommand()`، والاستعلام المتسلسل على وعد (`$('a').$('b')`)، لا يزالان قادرين على تشغيل الخطّافات أكثر من مرة.

## المُبلِّغات (Reporters)

يُمرَّر حدث `result` الخاص بالمتصفح إلى المبلِّغات على أنه `client:afterCommand`. لم تعد تلك الحمولة ولا النوع `AfterCommandArgs` تحتوي على الخاصية `name`. اقرأ `command` بدلًا منها. كانت الأوامر المخصصة ترسل `command` بالفعل.

```diff
  onAfterCommand(args) {
-     console.log(args.name)
+     console.log(args.command)
  }
```

### Allure

أُزيلت `addEnvironment(name, value)` من `@wdio/allure-reporter`. لم يكن لها أي تأثير. اضبط صفوف البيئة باستخدام [`reportedEnvironmentVars`](/docs/allure-reporter) في خيارات مبلِّغ Allure.

### مبلِّغ Cucumber JSON

انتقلت `wdio-cucumberjs-json-reporter` إلى مستودع WebdriverIO باسم [`@wdio/cucumberjs-json-reporter`](/docs/cucumberjs-json-reporter). حزمة المجتمع مخصصة لـ v9 فقط: فهي تثبّت `@wdio/reporter` 9 و`@wdio/logger` 9.

```sh
npm uninstall wdio-cucumberjs-json-reporter
npm install @wdio/cucumberjs-json-reporter --save-dev
```

يبقى `reporters: ['cucumberjs-json']` كما هو: يحمّل WebdriverIO الحزمة `@wdio/cucumberjs-json-reporter` لهذا الاسم. استبدل الاستيرادات في ملفات الخطوات:

```diff
- import cucumberJson from 'wdio-cucumberjs-json-reporter'
+ import cucumberJson from '@wdio/cucumberjs-json-reporter'
```

الخيارات هي نفسها. تتبع ملفات JSON تنسيق Cucumber JSON بشكل أدق. تحقق من الأدوات والسكربتات التي تقرأها:

- `id` السيناريو هو `<feature id>;<scenario id>`، و`<feature id>;<rule id>;<scenario id>` لسيناريو داخل `Rule:`، كما في تنسيق Cucumber JSON. في السابق، لم يكن بين الأجزاء فاصل.
- يحتفظ `id` الميزة بأحرف مثل `:` و`/` (تصبح المسافات فقط `-`)، كما في تنسيق Cucumber JSON. لا تتغير أسماء ملفات JSON، لكن جزء الميزة الذي يزيد عن 200 بايت (مثلًا أحرف كثيرة غير ASCII) يُقطع وينتهي بتجزئة (hash) (يسمح Linux بـ 255 بايت في اسم الملف)، واسم جهاز Windows مثل `con` يبدأ بـ `_`.
- `keyword` الميزة والسيناريو هي الكلمات المفتاحية في الملف، مثلًا `Scenario Outline` أو `Fonctionnalité`، كما في تنسيق Cucumber JSON. في السابق، كانت دائمًا `Feature` و`Scenario`.
- للسيناريوهات والخطوات `line`.
- الوسوم هي `{ name, line }`، كما في تنسيق Cucumber JSON؛ وتحصل وسوم السيناريو على سطر ملف الميزة. في السابق، كانت كائنات Cucumber داخلية تحتوي `location` أو `id` أو `astNodeId` (عشوائي في كل تشغيل)، ولم يكن لوسوم السيناريو سطر.
- الخطّافات هي خطوات تحمل `hidden: true` وبدون `name`. في السابق، كان للخطّاف `name` فارغ.
- وسيطة doc string هي `{ content, line }`. في السابق، كانت نص الـ doc string.
- الخطّاف الذي يتخطّاه Cucumber (بعد خطّاف فاشل، أو خطّاف يعيد `'skipped'`) حالته `skipped`، والخطّاف الذي يعيد `'pending'` حالته `pending`، كما في تنسيق Cucumber JSON. في السابق، كانت `passed`.
- حالة الخطوة الملتبسة هي `ambiguous`، كما في تنسيق Cucumber JSON، ويسرد `error_message` الخاص بها تعريفات الخطوات المطابِقة. في السابق، كانت `skipped` بدون سبب، أو `failed` مع `cucumberOpts.failAmbiguousDefinitions`.
- حالة الخطوة غير المعرّفة هي `undefined`. في السابق، كانت `failed`، أو `pending` مع `cucumberOpts.ignoreUndefinedDefinitions`.
- السيناريو الذي يعيد Cucumber تشغيله (`cucumberOpts.retry`) لا يحتوي إلا خطوات محاولته الأخيرة. في السابق، كان يحتوي خطوات جميع المحاولات.
- مع `cucumberOpts.tagsInTitle`، لا تحتوي أسماء الميزات والسيناريوهات والمعرّفات وأسماء الملفات على وسوم.
- عندما يشغّل عامل عدة ملفات ميزات (مواصفات مجمّعة)، يكتب المبلِّغ ملفًا واحدًا لكل ميزة. في السابق، كانت جميع السيناريوهات تذهب إلى ملف الميزة الأولى.
- في جلسة multi-remote، تأتي البيانات الوصفية من النسخة الأولى.

كانت هذه مفقودة أو خاطئة في السابق: خطوات `*`، والكلمة المفتاحية لخطوات `But`، والمرفقات من خطّاف `before` الخاص بـ WebdriverIO، والكائن المرفق بنوع `text/plain` (أصبح نص JSON، وليس `[object Object]`)، وسلسلة JSON المرفقة بنوع `application/json` (تبقى كما هي، ولا تُرمَّز مرة ثانية). تتبع الكلمات المفتاحية للخطوات ترويسة `# language:` في ملف الميزة، ثم `cucumberOpts.language` (ثم خيار `language` الخاص بالمبلِّغ فقط عندما لا يكون `cucumberOpts.language` مضبوطًا). مع `cucumberOpts.scenarioLevelReporter: true`، لا يكتب المبلِّغ أي ملف ويسجّل تحذيرًا: فالتنسيق يحتاج إلى الخطوات.

### مبلِّغ الفيديو

انتقلت `wdio-video-reporter` إلى مستودع WebdriverIO باسم [`@wdio/video-reporter`](/docs/video-reporter). حزمة المجتمع مخصصة لـ v9 فقط: فهي تثبّت `@wdio/reporter` 9 و`@wdio/logger` 9.

```sh
npm uninstall wdio-video-reporter
npm install @wdio/video-reporter --save-dev
```

كانت حزمة المجتمع تثبّت ffmpeg بنفسها. أما `@wdio/video-reporter` فلا تفعل ذلك: [ثبّت ffmpeg](/docs/video-reporter#install-ffmpeg) على كل جهاز يشغّل الاختبارات، بما في ذلك CI وصور Docker، أو اضبط الخيار `ffmpegPath` أو متغير البيئة `FFMPEG_PATH`. بدون ffmpeg، يسجّل المبلِّغ تحذيرًا ولا ينشئ أي فيديو.

```sh
brew install ffmpeg                                         # macOS
sudo apt-get update && sudo apt-get install -y ffmpeg       # Ubuntu، Debian
winget install --id Gyan.FFmpeg -e                          # Windows
```

يبقى `reporters: ['video']` كما هو: يحمّل WebdriverIO الحزمة `@wdio/video-reporter` لهذا الاسم. استبدل الاستيرادات من `wdio-video-reporter` بـ `@wdio/video-reporter`. الخيارات هي نفسها، مع هذه التغييرات:

- يستخدم `snapshotCommands` الجزء الأخير من نقاط نهاية W3C WebDriver. كانت القائمة الافتراضية القديمة تدرج أيضًا أسماء JSON Wire Protocol مثل `buttonup` أو `moveto` أو `keys` أو `accept_alert`. هذه الأسماء لا تطابق أبدًا أي أمر في v10. استخدم أسماء [القائمة الافتراضية](/docs/video-reporter#snapshotcommands)، مثلًا `actions` أو `value` أو `accept`.
- في جلسة WebDriver BiDi، يلتقط المبلِّغ أيضًا إطارًا بعد `url` و`back` و`forward` و`refresh` و`actions`.
- في جلسة WebDriver BiDi، يلتقط المبلِّغ الإطارات باستخدام WebDriver BiDi، وينتظر الأمر التالي إطار الأمر الذي قبله (حوالي 50 إلى 70 مللي ثانية في Chrome)، بحيث يُظهر كل إطار صفحة أمره. في السابق، في Chrome، كانت لقطة الشاشة في بداية تنقل WebDriver BiDi قد تجعل الاختبار ينتظر 10 ثوانٍ.
- في جلسة multi-remote، لا تلتقط إطارًا إلا أوامر النسخة الأولى. في السابق، كانت أوامر كل نسخة تلتقط إطارًا من النسخة الأولى.
- أمر `GET` يقرأ الصفحة فقط، لذا لا يعطي إطارًا، إلا مع `recordAllActions`. في السابق، كانت `getUrl` أو `getSize` أو `getValue` تعطي إطارًا، لأن الجزء الأخير من نقطة نهايتها (`url`، `rect`، `value`) موجود في `snapshotCommands`.
- التاريخ في أسماء ملفات الفيديو هو `YYYY-MM-DD--HH-MM-SS-mmm` على كل جهاز. في السابق، كان يستخدم إعدادات اللغة المحلية للجهاز.
- يقبل `videoFormat` القيمتين `webm` (الافتراضية) و`mp4`. في السابق، كان `videoFormat: 'default'` ينشئ مقاطع mp4؛ أما الآن فيسجّل تحذيرًا وينشئ مقاطع webm. استخدم `videoFormat: 'mp4'`.
- مع مبلِّغ Allure، لم يعد الاختبار الذي ليس له فيديو يحصل على مرفق فيديو فارغ.

### مبلِّغ HTML

انتقلت `wdio-html-nice-reporter` إلى مستودع WebdriverIO باسم [`@wdio/html-reporter`](/docs/html-reporter). الحزمة القديمة مخصصة لـ v9 فقط.

```sh
npm uninstall wdio-html-nice-reporter
npm install @wdio/html-reporter --save-dev
```

اسم المبلِّغ هو `html`. غيّر الاسم في `reporters` والاستيرادات:

```diff
- import { ReportAggregator } from 'wdio-html-nice-reporter'
+ import { ReportAggregator } from '@wdio/html-reporter'

  reporters: [
-     ['html-nice', { outputDir: './reports/html-reports/' }]
+     ['html', { outputDir: './reports/html-reports/' }]
  ]
```

الخيارات هي نفسها. غيّر أيضًا ما يلي:

- يأتي `ReportEvents` من `@wdio/html-reporter`. تعمل الاختبارات التي لا تزال تستخدم `@rpii/wdio-report-events`، لأن كليهما يرسل الأحداث نفسها.
- سكربت سطر الأوامر هو `node_modules/@wdio/html-reporter/build/makeReport.js`. وكان `node_modules/wdio-html-nice-reporter/lib/makeReport.js`.
- مع Cucumber، يعدّ التقرير السيناريوهات، وليس الخطوات، ويعدّ فقط المحاولة الأخيرة للسيناريو المعاد تشغيله.

## `$` صارم

يمثل `$` الآن __عنصرًا واحدًا بالضبط__. إذا حُلّ المحدد إلى أكثر من عنصر واحد، يطلق الأمر `StrictSelectorError` بدلًا من استخدام أول تطابق بصمت:

```js
// v9 — ينقر على الزر الأول، حتى لو كان هناك 12 زرًا
await $('button').click()

// v10
await $('button').click()
// StrictSelectorError: strict mode violation: `$("button")` resolved to 12 elements, expected 1.
// Use `$$("button")` to work with all matches, `$$("button")[0]` if you explicitly want the first one,
// or narrow down the selector so it matches a single element.
```

هذا يطابق [محددات Playwright](https://playwright.dev/docs/locators#strictness). يختلف Cypress: فاستعلاماته قد تُحل إلى عدة عناصر، وأوامر الإجراءات مثل [`.click()`](https://docs.cypress.io/api/commands/click#Click-all-elements-with-id-starting-with-btn) هي التي ترفض الموضوع متعدد العناصر افتراضيًا. المحدد الذي يُحل بهدوء إلى عدة عناصر هو غالبًا خلل كامن: ينجح اليوم ويتفاعل مع العنصر الخطأ بمجرد أن يضيف أحدهم زرًا ثانيًا إلى الصفحة.

تنطبق القاعدة على كل خطوة في السلسلة (`$('form').$('input')`) وعلى كل نوع محدد يقبله `$` — محددات السلاسل النصية (بما فيها التي تخترق shadow DOM)، ودوال JS، ومحددات الجوال، ومراجع الاستراتيجيات المخصصة.

### ما الذي لم يتغير

- لا يزال `$$` يعيد صفرًا أو عدة عناصر.
- الأوامر المساعدة المخصصة `custom$` و`shadow$` و`react$` ليست صارمة — فهي لا تزال تعيد أول تطابق، وكذلك نظائرها من `$$`.
- المحدد الذي لا يطابق شيئًا لا يزال يعيد عنصرًا يُحل بشكل كسول، لذا يتصرف `waitForExist` و[الانتظار التلقائي](/docs/autowait) كما في السابق.
- تمرير مرجع عنصر، مثل `$(await browser.getActiveElement())`، يشير دائمًا إلى عقدة واحدة ولا يُفحص أبدًا.

### كيفية تدقيق مجموعة اختباراتك

لا يوجد codemod لهذا: أنت وحدك من يستطيع أن يحدد ما إذا كان التطابق الثاني خللًا أم مقصودًا. هناك نهجان عمليان:

1. __شغّل مجموعة اختباراتك.__ كل مخالفة تطلق خطأً يتضمن المحدد وعدد التطابقات، وهو ما يكفي عادةً لإصلاحها على الفور.
2. __افحص المحددات الواسعة مسبقًا.__ لكل `$(...)` عام في كائنات الصفحات لديك، اطبع عدد العناصر التي يطابقها فعلًا:

   ```js
   console.log(await $$('button').length) // 12 ← `$('button')` واسع جدًا
   ```

ثم إما أن تضيّق المحدد — ويفضّل نحو استعلام يواجه المستخدم مثل `$('button=Submit')` أو `$('aria/Submit')`، راجع [المحددات](/docs/selectors) — أو أن تصرّح صراحةً بأنك تريد التطابق الأول:

```js
await $('button[type="submit"]').click()
// ...أو، إذا كان الأول هو ما تقصده فعلًا
await $$('button')[0].click()
```

### إلغاء الاشتراك

لاستعلام واحد:

```js
await $('button', { strict: false }).click()
```

لمشروع كامل، مع استعادة سلوك v9:

```js title="wdio.conf.js"
export const config = {
    // ...
    strictSelectors: false
}
```

يتذكر العنصر كيف استُعلم عنه، لذا فإن إعادة جلبه — بعد مرجع عنصر قديم، أو عبر `waitForExist` — تحافظ على صرامة الاستدعاء الأصلي.

:::info

داخليًا، يرسل `$` الصارم طلب `findElements` بدلًا من `findElement`، لأن عدّ التطابقات هو الطريقة الوحيدة لفرض القاعدة. إنها رحلة ذهاب وإياب واحدة في كلتا الحالتين، لكنها مرئية للخدمات المخصصة ومحاكيات WebDriver التي تعتمد على الأمر `findElement`.

:::

## قوائم العناصر قبل `await`

منذ v10، يعيد `$$()` كائن [`ElementArray`](/docs/api/browser/$$): مصفوفة حقيقية يمكنك استخدام `await` معها. في v9، كان `$$()` الذي لم تنتظره وعدًا.

| `$$('li')` قبل `await` | v9 | v10 |
| --- | --- | --- |
| `instanceof Promise` | `true` | `false` |
| `Array.isArray()` | `false` | `true` |
| `then`، `catch`، `finally` | دوال | دوال، حتى تُحمَّل القائمة |

حتى تُحمَّل القائمة، يكون `length` وعدًا، وتطلق `[...list]` و`Array.from(list)` و`for...of` الخطأ `Cannot synchronously iterate over an element list that has not resolved yet`.

ينطبق الأمر نفسه على `custom$$` و`shadow$$` و`react$$`، وعلى `$$()` في متصفح multi-remote. أما `$()` الذي لم تنتظره فلا يزال وعدًا.

يعطي `await` القائمة نفسها، محمَّلة وبدون `then`. عندها يكون `length` رقمًا، وتعمل `for...of` و`[...list]` و`Array.from()`. قبل `await`، يمكنك استخدام `for await`، والفهرس (`$$('li')[0]`)، و`at()`، و`slice()`، وطرق التكرار غير المتزامنة (`map`، `filter`، `forEach`، ...). تعطي هذه الطرق وعدًا: انتظر نتيجة `filter()` بـ `await` قبل أن تقرأ فهرسًا.

الفهرس الذي يتجاوز نهاية قائمة `$$(selector)` ليس `undefined`، حتى بعد `await`. إنه عنصر ينتظر أن تصل القائمة إلى ذلك الفهرس، كما يفعل `$$('li')[5]` قبل `await`: يعطي `isExisting()` القيمة `false` ويطلق أمر مثل `getText()` الخطأ `Index out of bounds`، كلاهما بعد `waitforTimeout`. في v9، كان `(await $$('li'))[5]` يساوي `undefined`. لذا فإن `if (list[5])` صحيح دائمًا، و`list.at(5)` ليس `undefined` أبدًا. قارن الفهرس بـ `length`، الذي لا ينتظر:

```diff
  const list = await $$('li')
- if (list[5]) {
+ if (list.length > 5) {
```

بعد `await`، يعطي الفهرس السالب، والقائمة الناتجة من `slice()` أو `filter()`، القيمة `undefined` بعد النهاية. قبل `await`، يعطي `list[i]` بفهرس صحيح يساوي 0 أو أكثر، و`at()`، وعدًا، وهو دائمًا قيمة صادقة (truthy).

الشيفرة التي تنتظر قيمة فقط عندما تكون `Promise`، أو التي تقرأ `length` بدون `await`، لا تطلق خطأً. بل تقرأ وعدًا على أنه الطول: يرى `list.length > 0` وحلقة مثل `for (let i = 0; i < list.length; i++)` القيمة `false`، لكن `if (list.length)` و`list.length !== 0` يريان `true`. انتظر القيمة دائمًا بـ `await`. فاستخدام `await` على قيمة محمّلة مسبقًا يعطي تلك القيمة:

```diff
- if (value instanceof Promise) {
-     value = await value
- }
+ value = await value
```

```diff
- if ($$('button').length > 0) {
+ if (await $$('button').length > 0) {
```

## توقيعات الأوامر القديمة

كان v9 لا يزال يقبل الصيغ الموضعية القديمة مع تحذير. أما v10 فيقبل كائن الخيارات فقط.

يعيد [codemod](https://github.com/webdriverio/codemod) الخاص بـ v10 كتابة `addCommand` و`overwriteCommand` عندما تكون الوسيطة الثالثة قيمة منطقية، و`getHTML(true)` و`getHTML(false)`، و`getCookies` عندما يكون المرشّح سلسلة نصية أو مصفوفة من عنصر واحد. يُترك استدعاء `getCookies` الذي يحتوي أكثر من اسم دون تغيير، لأن المرشّح الواحد يطابق اسمًا واحدًا.

ثبّت الـ codemod أولًا. لا يعتمد WebdriverIO عليه.

```sh
npm install jscodeshift @wdio/codemod
npx jscodeshift -t ./node_modules/@wdio/codemod/v10 ./e2e/
```

استخدم `--parser=tsx` لملفات TypeScript.

### `addCommand` و`overwriteCommand`

```diff
- browser.addCommand('myFn', fn, true)
+ browser.addCommand('myFn', fn, { attachToElement: true })

- browser.overwriteCommand('click', fn, true)
+ browser.overwriteCommand('click', fn, { attachToElement: true })
```

الوسيطة الثالثة المنطقية خطأ في TypeScript. ووقت التشغيل تطلق الخطأ:

```
Passing a boolean as the third argument to `addCommand` was removed in WebdriverIO v10. Use `addCommand(name, fn, { attachToElement: true })`.
```

ينتمي `proto` و`instances` إلى كائن الخيارات نفسه. احذف الوسيطة الثالثة لإرفاق أمر بالمتصفح.

### `getCookies`

تُرفض المرشّحات من نوع السلسلة النصية ومصفوفة السلاسل النصية. مرّر [كائن مرشّح ملفات تعريف الارتباط](https://w3c.github.io/webdriver-bidi/#type-storage-CookieFilter). يرشّح الاستدعاء الواحد اسمًا واحدًا؛ استدعه مرة أخرى لاسم آخر.

```diff
- await browser.getCookies('session')
- await browser.getCookies(['session', 'auth'])
+ await browser.getCookies({ name: 'session' })
+ await browser.getCookies({ name: 'auth' })
```

لا يزال `getCookies()` بدون وسيطات يعيد كل ملفات تعريف الارتباط المرئية للصفحة.

### `getHTML`

```diff
- await $('h1').getHTML(false)
+ await $('h1').getHTML({ includeSelectorTag: false })
```

لا يزال `getHTML()` بدون وسيطات يتضمن وسم العنصر نفسه.

### `newWindow`

أُزيل `windowName` و`windowFeatures`. كانا ينطبقان فقط على WebDriver Classic. لا يزال الأمر يقبل `type`:

```diff
- await browser.newWindow('https://webdriver.io', {
-     windowName: 'WebdriverIO window',
-     windowFeatures: 'width=420,height=230,resizable,scrollbars=yes,status=1',
- })
+ await browser.newWindow('https://webdriver.io', { type: 'window' })
```

استخدم `type: 'tab'` لفتح علامة تبويب.

في جلسة WebDriver BiDi، يعيد `newWindow()` [سياق التصفح](/docs/api/browsingContext) الجديد ولا ينتقل إليه. في v9 كان ينتقل. وبالتالي فإن `browser.closeWindow()` بعد `newWindow()` يغلق الآن علامة التبويب الأولى، وليس الجديدة. شغّل أوامر علامة التبويب الجديدة على السياق الذي يعيده `newWindow()`، وأغلقها باستخدام `closeWindow()` على ذلك السياق:

```diff
- await browser.newWindow('https://webdriver.io', { type: 'tab' })
- console.log(await browser.getTitle())
- await browser.closeWindow()
+ const tab = await browser.newWindow('https://webdriver.io', { type: 'tab' })
+ console.log(await tab.getTitle())
+ await tab.closeWindow()
```

في TypeScript، نوع النتيجة هو `WebdriverIO.BrowsingContext | { handle, type }`، لأن جلسة WebDriver Classic تعيد مقبض النافذة. في جلسة BiDi، ضيّق النوع: `await browser.newWindow(url, { type: 'tab' }) as WebdriverIO.BrowsingContext`.

يبقى المتصفح على علامة التبويب الأولى. أزل أي استدعاء `switchWindow()` كان يعود إليها: إذ يطلق `switchWindow` خطأً في جلسة BiDi. راجع [`switchToFrame`](#switchtoframe) لمعرفة نموذج سياق التصفح.

### `startActivity`

لا يُقبل إلا كائن الخيارات. أُزيلت `appWaitPackage` و`appWaitActivity` و`optionalIntentArguments`. كانت تنطبق فقط على نقطة نهاية Appium HTTP المزالة. لا يقبلها `mobile: startActivity`، وتمريرها يطلق خطأً.

```diff
- await browser.startActivity('com.example.app', '.MainActivity')
- await browser.startActivity({
-     appPackage: 'com.example.app',
-     appActivity: '.MainActivity',
-     appWaitPackage: 'com.example.app',
-     appWaitActivity: '.MainActivity',
-     optionalIntentArguments: '--ez extra true',
- })
+ await browser.startActivity({
+     appPackage: 'com.example.app',
+     appActivity: '.MainActivity',
+ })
```

## الأوامر المزالة

أُزيل `browser.throttle` وأوامر `touchAction` المهملة.

| v9 | v10 |
| --- | --- |
| `browser.throttle('Regular3G')` | [`browser.throttleNetwork('Regular3G')`](/docs/api/browser/throttleNetwork) |
| `browser.touchAction(...)` / `element.touchAction(...)` | [واجهة Actions API](/docs/api/browser/action) مع مؤشر لمس، أو أوامر الجوال [`tap`](/docs/api/mobile/tap) و[`swipe`](/docs/api/mobile/swipe) |

إيماءة لمس باستخدام Actions API:

```js
await browser.action('pointer', { parameters: { pointerType: 'touch' } })
    .move({ x: 100, y: 500 })
    .down()
    .move({ x: 100, y: 100, duration: 300 })
    .up()
    .perform()
```

## `uploadFile`

أُزيل `browser.uploadFile()`. كان يضغط ملفًا محليًا ويرسله إلى نقطة النهاية `file` الخاصة بـ Selenium، وهي ليست جزءًا من WebDriver ولا WebDriver BiDi. اضبط حقل إدخال الملف باستخدام [`element.setFiles()`](/docs/api/element/setFiles).

```diff
- const remotePath = await browser.uploadFile('/path/to/file.png')
- await $('#file-upload').setValue(remotePath)
+ await $('#file-upload').setFiles('/path/to/file.png')
+ await $('#file-upload').setFiles(['/path/to/a.png', '/path/to/b.png'])
```

يحتاج `setFiles` إلى جلسة BiDi. يفتح المتصفح المسارات. يُحل المسار النسبي بالنسبة إلى `process.cwd()`. تجهيز الملفات في Selenium Grid ليس جزءًا من v10. على مجموعة الاختبارات التي كانت تعتمد على `uploadFile` لدفع البايتات إلى عقدة أن تضع الملف حيث يستطيع المتصفح قراءته، ثم تستدعي `setFiles`.

في جلسة محلية كلاسيكية، لا يزال `element.setValue('/local/path')` يكتب مسارًا يستطيع المتصفح المحلي رؤيته بالفعل. وتبقى نقطة نهاية Selenium الخام `browser.file()` لمستخدمي Grid الذين يستدعونها مباشرة.

## `executeAsync`

أُزيل `browser.executeAsync` و`element.executeAsync`. مرّر دالة `async` إلى [`execute`](/docs/api/browser/execute). القيمة المعادة من الدالة، بما في ذلك الوعد المعاد، هي نتيجة الأمر. لا تزال مهلة `script` تنطبق، حتى في جلسة WebDriver BiDi: يفشل السكربت الذي يعمل لمدة أطول بخطأ `script timeout`. لمهلة `script` أطول من [`bidiResponseTimeout`](/docs/configuration#bidiresponsetimeout) (180 ثانية افتراضيًا)، زِد كلتيهما.

```ts
const result = await browser.execute(async (a, b) => {
    await new Promise((resolve) => setTimeout(resolve, 1000))
    return a + b
}, 1, 2)
```

تخلَّ عن دالة الاستدعاء `done` الخاصة بـ WebDriver. على السكربت النصي الذي كان يتوقع دالة الاستدعاء هذه كوسيطته الأخيرة أن يعيد وعدًا بدلًا من ذلك. ووقت التشغيل، لم يعد `executeAsync` دالة.

## `switchToFrame`

لم يعد `browser.switchToFrame` أمرًا عامًا.

في جلسة WebDriver BiDi، يطلق `switchFrame` و`switchWindow` خطأً. علامة التبويب والنافذة والإطار هي `WebdriverIO.BrowsingContext` تحتفظ به. ينتقل `browser.url()` في سياق المستوى الأعلى الأولي للجلسة ويعيده. ويعيد `browser.newWindow()` السياق الجديد ولا ينتقل إليه. ويعيد `context.frame()` إطارًا فرعيًا. و`context.parent` هو الإطار الذي فتحته منه.

```ts
const page = await browser.url('https://example.com')
const other = await browser.newWindow('https://webdriver.io', { type: 'tab' })
console.log(await page.getTitle())
const frame = await page.frame('iframe')
console.log(await frame.$('h1').getText())
const pages = await browser.browsingContexts()
```

`context.url` هو سلسلة عنوان URL للمستند. تنقّل في سياق محتفظ به باستخدام `context.navigate(url)`. وبيانات التحميل الوصفية من `browser.url()` هي `context.request`.

في جلسة Classic، استمر في استدعاء `switchFrame` مع عنصر، أو `null` للإطار العلوي. تُرفض السلسلة النصية أو الدالة هناك.

```diff
- await browser.switchToFrame(await $('iframe'))
- await browser.switchToFrame(null)
+ await browser.switchFrame($('iframe'))
+ await browser.switchFrame(null)
```

## `setTimeout`

يُرفض مفتاح JSON Wire Protocol `page load`. استخدم `pageLoad`.

```diff
- await browser.setTimeout({ 'page load': 10000 })
+ await browser.setTimeout({ pageLoad: 10000 })
```

لم يتغير `implicit` و`script`.

## الوصول إلى نسخ Multi-remote

لم يعد متصفح multi-remote يخزّن كل جلسة كخاصية مستقلة. وينطبق الأمر نفسه على عنصر multi-remote. `getInstance` و`select` هما الطريقة لمخاطبة جلسة واحدة.

```diff
- await browser.myChromeBrowser.url('https://webdriver.io')
- await (await browser.$('button')).myChromeBrowser.click()
+ await browser.getInstance('myChromeBrowser').url('https://webdriver.io')
+ await (await browser.$('button')).getInstance('myChromeBrowser').click()
```

لم يعد توسيع TypeScript الذي يضيف `myChromeBrowser: WebdriverIO.Browser` إلى `WebdriverIO.MultiRemoteBrowser` يطابق خاصية في وقت التشغيل. احذف ذلك التوسيع واستدعِ `getInstance`.

مع مشغّل الاختبارات وترك `injectGlobals` مفعّلًا، لا يزال اسم النسخة متغيرًا عامًا (`myChromeBrowser.url(...)`). ذلك المتغير العام هو الجلسة المفردة. وهو ليس `browser.myChromeBrowser`.

تبقى نتائج الأوامر بترتيب القدرات: يعود الإدخال الأول إلى المفتاح الأول في كائن القدرات.

يعيد `browser.$$()` على متصفح multi-remote كائن `WebdriverIO.MultiRemoteElementArray`، وليس `MultiRemoteElement[]` عاديًا. لا يزال مصفوفة، لذا تستمر قراءة الفهرس مثل `elements[0]` في العمل.

طرقه `map` و`filter` و`forEach` و`find` و`findIndex` و`some` و`every` و`reduce` غير متزامنة، كما في `WebdriverIO.ElementArray`، وتعيد وعدًا، حتى بعد `await`. وينطبق الأمر نفسه على القوائم التي تعيدها `custom$$()` و`react$$()` و`shadow$$()`. في v9 كانت هذه الطرق المتزامنة لمصفوفة عادية:

```diff
  const items = await browser.$$('li')
- const ids = items.map((item) => item.selector)
+ const ids = await items.map((item) => item.selector)
```

تعيد `custom$()` و`react$()`، وعلى العنصر `shadow$()` و`nextElement()` و`previousElement()` و`parentElement()`، كائن `WebdriverIO.MultiRemoteElement` واحدًا، كما يفعل `$()`. في v9 كانت تعيد عنصرًا لكل نسخة في مصفوفة عادية. اقرأ عنصر متصفح واحد باستخدام `getInstance`:

```diff
- const [chromeHost, firefoxHost] = await browser.custom$('byTestId', 'host')
- await chromeHost.click()
+ const host = await browser.custom$('byTestId', 'host')
+ await host.getInstance('myChromeBrowser').click()
```

تعيد `custom$$()` و`react$$()`، وعلى العنصر `shadow$$()`، كائن `WebdriverIO.MultiRemoteElementArray` واحدًا، كما يفعل `$$()`. في v9 كانت تعيد قائمة لكل نسخة في مصفوفة عادية. يخاطب كل إدخال جميع النسخ. والنسخة التي تجد عناصر أقل ليس لها عنصر عند ذلك الفهرس:

```diff
- const [chromeItems, firefoxItems] = await browser.custom$$('byTestId', 'item')
- await chromeItems[0].click()
+ const items = await browser.custom$$('byTestId', 'item')
+ await items[0].getInstance('myChromeBrowser').click()
```

نوع `WebdriverIO.MultiRemoteElement['selector']` هو `Selector`، كما هو الحال في `WebdriverIO.Element['selector']`. في v9 كان نوعه `string`، لكن القيمة قد تكون أيضًا دالة أو مرجع استراتيجية مخصصة. يجب على شيفرة TypeScript التي تستخدمه كسلسلة نصية، مثل `element.selector.includes('…')`، أن تتحقق من النوع أولًا.

أُزيل `WDIO_ENABLE_MULTI_REMOTE_SELECT` و`WDIO_ENABLE_MULTI_REMOTE_ELEMENT_ARRAY`. `select()` متاح دائمًا، و`$$()` يعيد دائمًا مصفوفة العناصر المذكورة أعلاه. احذف كلا المتغيرين.

## استجابات Mock الثنائية

يقبل `mock.respond()` و`mock.respondOnce()` حمولات `Uint8Array` و`ArrayBuffer`، بما في ذلك `Buffer` المعوَّض (polyfilled) في اختبارات المكوّنات التي لا تحتوي `Buffer` عامًا.

أصبح نوع `mock.getBinaryResponse()` الآن `Uint8Array | null`. لا يزال يعيد `Buffer` في Node.js، لكنه يعيد `Uint8Array` في المتصفح. لاستخدام الطرق الخاصة بـ Buffer في Node.js، حوّل النتيجة غير الفارغة أولًا:

```diff
- const base64 = mock.getBinaryResponse(requestId)?.toString('base64')
+ const bytes = mock.getBinaryResponse(requestId)
+ const base64 = bytes === null ? undefined : Buffer.from(bytes).toString('base64')
```

## محاكيات الشبكة في Multi-remote

يعيد `browser.mock()` على متصفح multi-remote كائن `WebdriverIO.MultiRemoteMock`، وليس مصفوفة من المحاكيات. تعمل `respond` و`restore` وطرق المحاكاة الأخرى على كل نسخة. اقرأ الطلبات الملتقطة من المحاكي الخاص بمتصفح واحد. استخدم النوع `WebdriverIO.MultiRemoteMock` من مساحة الأسماء العامة `WebdriverIO`.

```diff
- const [chromeMock, firefoxMock] = await browser.mock('*/api')
- expect(chromeMock.calls).toHaveLength(1)
+ const mock = await browser.mock('*/api')
+ mock.respond({ ok: true })
+ expect(mock.getInstance('myChromeBrowser').calls).toHaveLength(1)
+ expect(mock.instances).toEqual(['myChromeBrowser', 'myFirefoxBrowser'])
```

يطلق `getInstance` الخطأ `Multi-remote object has no instance named "<name>"` عندما لا يكون الاسم أحد `instances`. يدرج المحاكي الناتج من `browser.select('myFirefoxBrowser', 'myChromeBrowser')` تلك النسخ بذلك الترتيب، الذي قد يختلف عن `browser.instances`. لا تفترض أن `mocks[0]` هو متصفح بعينه.

## استجابات Mock التي تتخطى الخادم الخلفي

لا يستدعي `mock.respond(..., { fetchResponse: false })` الخادم الخلفي. في v9، كان المحاكي الذي يرشّح أيضًا على `statusCode` أو `responseHeaders` يتجاهل ذلك المرشّح ويستمر في الرد على كل طلب مطابق. في v10، يطلق `respond()` و`respondOnce()` خطأً، لأن هذه المرشّحات لا يمكن الحسم فيها إلا من استجابة الخادم الخلفي.

```diff
- const mock = await browser.mock('**/users', { statusCode: 200 })
- mock.respond({ name: 'Ada' }, { fetchResponse: false })
+ const mock = await browser.mock('**/users')
+ mock.respond({ name: 'Ada' }, { fetchResponse: false })
```

للإبقاء على المرشّح، احذف `fetchResponse` حتى يجلب المحاكي الاستجابة، ويتحقق من الحالة أو الترويسات، ثم يستبدل المحتوى.

## مراجع العناصر

تستخدم معرّفات العناصر مفتاح W3C WebDriver وهو `element-6066-11e4-a52e-4f735466cecf` والخاصية `elementId`. لم يعد حقل JSON Wire Protocol `ELEMENT` جزءًا من عقد العنصر.

لم يعد `WebdriverIO.Element` يعلن عن `ELEMENT`. اقرأ `element.elementId`، الذي تكشفه نسخ العناصر بالفعل.

يمرّر `browser.execute`، والسكربتات المدمجة التي ترسل عنصرًا إلى الصفحة (`getHTML`، `isClickable`، `isDisplayed`، `scrollIntoView`، وغيرها)، مرجع W3C فقط:

```diff
- await browser.execute((el) => el.ELEMENT, elem)
+ await browser.execute(
+     (el) => el['element-6066-11e4-a52e-4f735466cecf'],
+     elem
+ )
```

جسم find-element الذي يحتوي فقط على `{ ELEMENT: '...' }` ليس عنصرًا. أدرج مفتاح W3C. إذا وُجد المفتاحان كلاهما، يستخدم WebdriverIO معرّف W3C.

يطبع Jasmine نتيجة `$()` المتسلسلة عبر `toJSON`. وتلك القيمة هي مرجع W3C نفسه، `{ 'element-6066-11e4-a52e-4f735466cecf': elementId }`.

مع WebDriver BiDi، أصبح السكربت الذي يعيد `NodeList` (مثلًا من `querySelectorAll`) أو `HTMLCollection` (مثلًا `element.children`) يعطي قائمة مراجع عناصر، كما يفعل WebDriver Classic. في v9 كان يعطي قيم BiDi خامًا، لذا كان `browser.execute` يعيد كائنات ليست عناصر، ولم تكن استراتيجية `custom$` أو `custom$$` التي تعيد `querySelectorAll(...)` تجد أي عنصر. لا يزال حل التفافي مثل `Array.from(document.querySelectorAll(...))` يعمل، ويمكنك إزالته:

```diff
  browser.addLocatorStrategy('byCss', (selector) =>
-     Array.from(document.querySelectorAll(selector))
+     document.querySelectorAll(selector)
  )
```

## محددات React

أصبح `react$` و`react$$` يعملان الآن مع React من 16 إلى 19، لتطبيق يبدأ باستخدام `createRoot` أو `ReactDOM.render`. في السابق، كان `browser.react$` و`browser.react$$` يفشلان مع React 18 وما بعده (`Could not find the root element of your application`)، وفي كل إصدار كانت النتيجة قد تأتي من التصيير السابق لآخر تحديث، لذا لم يكن يُعثر على مكوّن أضافه تغيير في الحالة.

على صفحة لم يصيّر فيها React جذرًا بعد، تنتظر الأوامر الآن حتى 5 ثوانٍ قبل أن تفشل. في السابق، كانت تفشل فورًا، لذا لم يكن يُعثر على تطبيق بدأ متأخرًا.

لم تعد الأوامر تستخدم مكتبة [resq](https://github.com/baruchvlz/resq)، ولم يعد WebdriverIO يثبّتها. لا تتغير قواعد المحددات (راجع [محددات React](/docs/selectors#react-selectors))، مع هذه الاستثناءات:

- يجد `react$` مع كلٍّ من `props` و`state` مكوّنًا يطابق كليهما. في السابق، كان يتجاهل `props` عندما تُعطى `state` أيضًا.
- يعطي `react$$` كل عقدة DOM مرة واحدة. في السابق، كان المكوّن عالي الرتبة وابنه يعطيان العنصر نفسه مرتين في بعض المتصفحات.
- يعطي الـ fragment الذي يحتوي fragment آخر قائمة مسطحة واحدة من العقد. في السابق، كان `react$` قد يعيد قائمة.
- يعمل المرشّح ذو القيمة `null`. في السابق، كان يفشل بالخطأ `Cannot convert undefined or null to object`.
- بدون نطاق عنصر، تبحث الأوامر في جميع جذور React في الصفحة، بترتيب المستند، بما في ذلك الجذور داخل جذور أخرى والجذور داخل shadow roots المفتوحة. يعطي `react$` أول تطابق. في السابق، كانت تبحث في الجذر الأول فقط، حتى لو لم يصيّره React بعد أو أزاله، ولم تكن تبحث في shadow roots. على صفحة تحتوي أكثر من جذر، قد يعطي `react$$` الآن عناصر أكثر: للبحث في جذر واحد فقط، استدعِ الأمر على حاويته، مثلًا `$('#root').react$$('MyComponent')`.
- على حاوية جذر داخل جذر آخر، تبحث الأوامر في الجذر الداخلي. في السابق، كانت تبحث في الجذر الخارجي.
- على سياق التصفح لإطار، وعلى عنصر داخل إطار، تعمل الأوامر. في السابق، كان أمر السياق يفشل بالخطأ `this.executeScript is not a function`، وكان أمر العنصر يفشل بالخطأ `Could not find instance of React in given element`.

أُزيل السكربت الداخلي `webdriverio/scripts/resq`.

## اختبار المكوّنات

تعيد `@wdio/browser-runner` تصدير `fn` و`spyOn` وأنواع المحاكاة من `@vitest/spy` 5 (سابقًا 3). يحتاج المحاكي الذي تستدعيه شيفرتك باستخدام `new` إلى تنفيذ من نوع `function` أو `class`. تطلق الدالة السهمية الخطأ `is not a constructor`، ويطلق `mockReturnValue` خطأً عندما يُستدعى المحاكي باستخدام `new`.

```diff
- const Client = fn(() => ({ close: fn() }))
+ const Client = fn(function () { return { close: fn() } })
```

لتغييرات الجواسيس الأخرى، راجع [دليل ترحيل Vitest](https://vitest.dev/guide/migration).

## Puppeteer

تقبل `webdriverio` الحزمة `puppeteer-core` بالنطاق `>=24 <26`، بما في ذلك Puppeteer 25. يُختبر `getPuppeteer()` و`@wdio/lighthouse-service` على هذا الخط.

## ESLint

تتطلب `eslint-plugin-wdio` الإصدار ESLint 10. وصل ESLint 9 إلى [نهاية عمره](https://eslint.org/version-support/) في 2026-08-06 ولم يعد مدعومًا. مع TypeScript، استخدم `typescript-eslint` 8.56.0 أو أحدث.

```sh
npm install --save-dev eslint@10 eslint-plugin-wdio
```

تصدّر `eslint-plugin-wdio` فقط الإعداد المسطح `flat/recommended`. أُزيل اسم eslintrc `plugin:wdio/recommended`.

```js
import { configs as wdioConfig } from 'eslint-plugin-wdio'

export default [
    wdioConfig['flat/recommended'],
]
```

ينتقل الإعداد الموصى به إلى القاعدة المدركة للأنواع `wdio/no-floating-promise`، بدلًا من `wdio/await-expect`، عندما تكون حزمة `typescript-eslint` مثبتة. تثبيت `@typescript-eslint/eslint-plugin` وحدها لا يكفي.

```sh
npm install --save-dev typescript typescript-eslint
```

في هذا الوضع، يحلّل الإعداد كل ملف يطابقه باستخدام خدمة مشروع TypeScript. قيّده بملفات TypeScript، وتأكد من أنها جزء من ملف `tsconfig.json`:

```js
import { configs as wdioConfig } from 'eslint-plugin-wdio'

export default [
    { files: ['**/*.{ts,mts,cts,tsx}'], ...wdioConfig['flat/recommended'] },
]
```

يفشل ملف JavaScript مطابَق ليس ضمن مشروع TypeScript، مثل `wdio.conf.js`، بالرسالة "was not found by the project service". لفحص ملفات JavaScript أيضًا، اضبط `"allowJs": true`، وأضفها إلى `include` في `tsconfig.json`، ووسّع النمط إلى `**/*.{js,mjs,cjs,ts,mts,cts,tsx}`.

## أطر العمل المخصصة

لم يعد `setupExpect` في محوّل إطار عمل مخصص يقبل `Map` من المطابِقات، ولم يعد المشغّل يضيف طريقة `entries` إلى كائن المطابِقات. كرّر باستخدام `Object.entries(wdioMatchers)`.

## ملف تعريف Firefox

لم تعد `@wdio/firefox-profile-service` تعامل `legacy` كخيار خدمة. كانت تلك الراية تنطبق فقط على Firefox 55 وما قبله. احذفها. يُكتب `legacy: true` المتبقي في ملف التعريف كتفضيل باسم `legacy`.

## بروتوكول WebDriver

كل جلسة هي جلسة [W3C WebDriver](https://w3c.github.io/webdriver/). لا يتحدث WebdriverIO بروتوكول JSON Wire Protocol ولا Mobile JSON Wire Protocol. أزال v9 تلك الأوامر. ويتخلى v10 أيضًا عن غلاف الاستجابة الذي كانت تستخدمه تلك البروتوكولات، لذا لا يستطيع الخادم الذي لا يزال يعيده بدء جلسة.

أُزيل `browser.isW3C`، بما في ذلك القيمة التي كانت تُمرَّر سابقًا في رسالة العامل `sessionStarted`. يُتجاهل تمرير `isW3C` إلى `attach`. تبقى مجموعة أوامر BiDi على العميل. ولا يزال اتصال BiDi الحي يعتمد على `webSocketUrl`.

### `browser.back()` و`browser.forward()` على BiDi

تبقى مواضع الاستدعاء `await browser.back()` و`await browser.forward()`. لا يأخذ أي من الأمرين وسيطة ولا يعيد قيمة.

في جلسة BiDi، يستدعي هذان الأمران `browsingContext.traverseHistory` مع `delta` بقيمة `-1` أو `1` على سياق التصفح في المستوى الأعلى، ثم ينتظران جاهزية المستند التي يقابلها `pageLoadStrategy`. تعود `none` عندما يُقبل أمر التنقل. وتنتظر `eager` الحدث `browsingContext.domContentLoaded`. وتنتظر `normal`، الافتراضية، الحدث `browsingContext.load`. لا تُطلق الاستعادة من ذاكرة التخزين المؤقت للخلف والأمام (back-forward cache) تلك الأحداث؛ يعود الأمر عندما تطابق قيمة `readyState` للمستند الملتزَم الاستراتيجية بالفعل. يستخدم الانتظار مهلة تحميل الصفحة للجلسة (`timeouts.pageLoad`، 300000 مللي ثانية عند عدم ضبطها). أما جلسات Classic فلا تزال ترسل إلى `POST /session/:sessionId/back` و`POST /session/:sessionId/forward`.

لا يزال إدخال السجل المفقود يؤدي إلى الرفض. في BiDi تأتي الرسالة من `browsingContext.traverseHistory` وتحتوي على `no such history entry`، بدلًا من نص خطأ WebDriver الكلاسيكي. والتنقل الذي لا يصل أبدًا إلى الجاهزية المتوقعة يُرفض بالرسالة `History traversal timed out after <ms>ms waiting for browsingContext.domContentLoaded` أو `browsingContext.load`.

### استجابة الجلسة الجديدة

يجب أن يعيد Create Session جسم W3C. يقرأ WebdriverIO القيمتين `value.sessionId` و`value.capabilities`:

```json
{
  "value": {
    "sessionId": "8e8a5c2e",
    "capabilities": {
      "browserName": "chrome",
      "browserVersion": "131.0.6778.85"
    }
  }
}
```

يُرفض جسم JSON Wire Protocol. هذا الجسم يضع `sessionId` و`status` بجوار `value`، ويضع القدرات في `value` نفسها:

```json
{
  "sessionId": "8e8a5c2e",
  "status": 0,
  "value": {
    "browserName": "chrome",
    "version": "131.0"
  }
}
```

عندها يطلق إنشاء الجلسة الخطأ `WebDriver new session response is missing a session id or capabilities. WebdriverIO requires a W3C WebDriver server.` ويُطلق الخطأ نفسه عندما تكون `value.capabilities` مفقودة، حتى لو كانت `value.sessionId` موجودة.

لا يزال كائن القدرات المسطح في إعدادك صالحًا. يغلّف WebdriverIO الكائن `{ browserName: 'chrome' }` داخل `alwaysMatch` قبل أن يرسل الطلب. لا تزال المفاتيح ذات بادئة المورّد الممزوجة بمفاتيح خارج مجموعة قدرات W3C تُرفض. ضع إعدادات المورّد في `sauce:options` أو `bstack:options` أو `appium:options` أو مفتاح آخر ذي بادئة.

### استجابات الأوامر

نتيجة الأمر هي `{ "value": … }`. يعني HTTP 200 بدون `error` في `value` النجاح. العنصر المفقود هو HTTP 404 مع ضبط `value.error` على `"no such element"`، وهو ما لا يزال يسمح بالبحث الكسول عن العنصر. يُتجاهل `status` الرقمي في الجسم، بما في ذلك `status: 0` والرمز القديم `status: 7` ("no such element"). أرسل كائن خطأ W3C بدلًا من ذلك.

أصبح نوع الخطأ المصدَّر `JSONWPCommandError` الآن `SessionRequestError`.

### الخوادم

المشغّلات التي يعمل عليها WebdriverIO تتحدث بالفعل W3C على اتصال العميل:

- ChromeDriver يعمل بـ W3C افتراضيًا منذ Chrome 75. ويطابقه Edge المبني على Chromium. لا يزال ChromeDriver الحالي يقبل `goog:chromeOptions.w3c: false`، الذي يعيد تلك الجلسة الواحدة إلى البروتوكول القديم. لا يدعم WebdriverIO هذا التبديل.
- يعمل geckodriver وsafaridriver الخاص بـ Apple بـ W3C فقط. واستجابة Safari التي تحذف `platformName` أو `browserVersion` لا تزال W3C.
- يتحدث Selenium 4 وGrid 4 بروتوكول W3C. توقف Grid عن ترجمة JSON Wire Protocol في 4.9.
- تخلى Appium 2 عن JSON Wire Protocol وMobile JSON Wire Protocol. وتخلى Appium 3 أيضًا عن أشكال المعاملات المتبقية. يتطلب v10 الإصدار Appium 3، كما هو موضح أدناه. جلسة الجوال التي تحذف `setWindowRect` لا تزال W3C؛ فهذه القدرة تعني أن الجهاز لا يستطيع تغيير حجم النافذة.

هذه الخوادم لا تزال تتحدث JSON Wire Protocol وهي غير مدعومة: Selenium 3 وPhantomJS وEdgeHTML (`--jwp`) وWinAppDriver عند الاتصال به مباشرة. يبقى مشغّل Appium Windows مدعومًا كعميل W3C. فهو يترجم الأوامر إلى WinAppDriver، بما في ذلك Get Element Property إلى نقطة نهاية السمة. وجّه WebdriverIO إلى Appium، وليس إلى منفذ WinAppDriver.

لا تجعل [`@wdio/jsonwp-service`](https://www.npmjs.com/package/@wdio/jsonwp-service) تلك الخوادم تعمل مع v10. لا يزال بدء الجلسة يتطلب جسم W3C المذكور أعلاه، ولا تزال نتائج الأوامر تتجاهل `status` الرقمي. ابقَ على WebdriverIO 9 إذا كان ذلك الخادم لا يزال مطلوبًا.

لم يعد `webdriver.remote.sessionid` يميّز جلسة Selenium المستقلة. لا يزال Selenium Grid 4 يُكتشف من `se:cdp`.

مفتاح المهلة `page load` موضّح تحت [`setTimeout`](#settimeout). ومعرّفات العناصر موضّحة تحت [مراجع العناصر](#element-references). على سطح المكتب، `[name="..."]` محدد CSS. وتبقى استراتيجية المحدد `name` لجلسات الجوال.

## Appium

يتطلب WebdriverIO 10 الإصدار **Appium 3** والمشغّلات الرسمية الحالية (UiAutomator2 وXCUITest وEspresso وWindows وMac2 وغيرها). الإصداران Appium 1.x و2.x غير مدعومين. ابقَ على WebdriverIO 9 إذا لم تستطع ترقية الخادم.

```sh
npm i -D appium@^3
appium driver update installed
```

تعلن `@wdio/appium-service` عن اعتمادية نظيرة اختيارية `appium` بالنطاق `>=3` وترفض تشغيل خادم أقدم. يثبّت `create-wdio` الحزمة `appium@^3` عندما يكون Appium مفقودًا أو أقدم من 3.

يحتاج مورّدو السحابة الذين لا يزالون يوفرون Appium 2 إلى صورة Appium 3، وإلا فعليك البقاء على WebdriverIO 9.

### لم تعد أوامر الجوال ترجع إلى HTTP

في v9، كانت كثير من مساعدات الجوال تحاول `browser.execute('mobile: …')` وعند خطأ "طريقة غير معروفة" ترجع إلى نقطة نهاية Appium HTTP مزالة. في v10 أُزيل هذا الرجوع: يخبرك الخطأ نفسه بالترقية إلى Appium 3. فضّل أوامر الجوال الخاصة بـ WebdriverIO (`browser.lock()`، `browser.shake()`، …) أو `browser.execute('mobile: …')` مباشرة.

### أوامر البروتوكول المزالة

[أزال Appium 3 كثيرًا من نقاط نهاية المشغّل الأساسي المهملة](https://appium.io/docs/en/latest/guides/migrating-2-to-3/). لم يعد WebdriverIO يوفر طرق عميل لمعظم تلك المسارات (مثل `appiumLock` و`touchPerform` وخريطة Mobile JSON Wire Protocol). استخدم W3C Actions، أو أمر الجوال المقابل، أو طريقة تنفيذ `mobile:` الخاصة بالمشغّل بدلًا من ذلك.

### نطاق `--allow-insecure` في Appium

يتطلب Appium 3 بادئة نطاق للمشغّل أو `*` على ميزات `--allow-insecure`، مثل `uiautomator2:adb_shell` أو `*:adb_shell`.

### لم تعد قدرات Appium غير المسبوقة بالبادئة تختار جلسة Appium

لم تعد `automationName` و`deviceName` و`appiumVersion` بدون البادئة `appium:` تخبر WebdriverIO بتخطي مشغّل المتصفح وإرفاق خدمة Appium. استخدم القدرة ذات البادئة، أو ضعها داخل `appium:options`:

```diff
- capabilities: { platformName: 'Android', automationName: 'UiAutomator2', deviceName: 'emulator' }
+ capabilities: {
+     platformName: 'Android',
+     'appium:automationName': 'UiAutomator2',
+     'appium:deviceName': 'emulator'
+ }
```

أصبح `wdio repl` يُخرج تلك المفاتيح ذات البادئة، بما في ذلك `appium:app` و`appium:platformVersion` و`appium:udid`.

### `getValue` على الجوال يقرأ خاصية العنصر

يستدعي `element.getValue()` الأمر Get Element Property في كل جلسة، بما في ذلك Appium 3. في جلسة الجوال كان يستدعي سابقًا Get Element Attribute.

### توحيد توقيع `stopRecordingScreen` مع `startRecordingScreen`

أصبح `driver.stopRecordingScreen` يقبل الآن وسيطة `options` واحدة فقط، بدلًا من الوسيطات الأربع السابقة، بما يتوافق مع `driver.startRecordingScreen`. انقل الوسيطات الفردية إلى داخل كائن:

```diff
- driver.stopRecordingScreen('webdriver.io', undefined, undefined, 'POST')
+ driver.stopRecordingScreen({ remotePath: 'webdriver.io', method: 'POST' })
```

## تسمية Multi-remote

أصبحت واجهات البرمجة المكتوبة `multiremote` أو `Multiremote` الآن بصيغة camelCase / PascalCase على شكل `multiRemote` / `MultiRemote`. لا توجد أسماء بديلة للأسماء القديمة.

| v9 | v10 |
|----|-----|
| `multiremote()` (`webdriverio`) | `multiRemote()` |
| `WebdriverIO.MultiremoteConfig` | `WebdriverIO.MultiRemoteConfig` |
| `isMultiremote` على المتصفح ونتائج `$` و`$$` | `isMultiRemote` |
| `Capabilities.RequestedMultiremoteCapabilities` | `Capabilities.RequestedMultiRemoteCapabilities` |
| `Capabilities.WithRequestedMultiremoteCapabilities` | `Capabilities.WithRequestedMultiRemoteCapabilities` |
| `runner.isMultiremote` (المبلِّغات) | `runner.isMultiRemote` |
| `Launcher#isMultiremote`، `Launcher#isParallelMultiremote` (`@wdio/cli`) | `isMultiRemote`، `isParallelMultiRemote` |
| `isMultiremote` في `Workers.WorkerMessage` و`WorkerInstance` (`@wdio/local-runner`) و`SpecReporter#getTestLink()` | `isMultiRemote` |
| `browser.multiremoteFetch()` (`@wdio/webdriver-mock-service`) | `browser.multiRemoteFetch()` |

ابحث عن `multiremote` و`Multiremote` (مع مراعاة حالة الأحرف) واستبدل كل تطابق. تُعلّم تقارير Allure أيضًا اختبارات multi-remote بـ `isMultiRemote` بدلًا من `isMultiremote`.

## الشاشات الافتراضية على Linux

استُبدلت `@wdio/xvfb` بـ `@wdio/display-server`. بدلًا من تغليف كل عامل داخل `xvfb-run`، يبدأ مشغّل الاختبارات خادم عرض واحدًا للتشغيل كله، قبل خطّاف `onPrepare` لأي خدمة. يفضّل Weston في الوضع دون واجهة (headless) ويرجع إلى Xvfb. راجع [وضع Headless وخوادم العرض](/docs/headless-and-display-servers) للتفاصيل.

أُعيدت تسمية الخيارات. لا تزال الأسماء القديمة تعمل في v10 لكنها تسجّل تحذير إهمال، وستُزال في v11. إذا ضبطت الاسمين كليهما، يفوز الجديد:

```diff
- autoXvfb: false,
+ displayServerEnabled: false,
- xvfbAutoInstall: true,
+ displayServerAutoInstall: true,
- xvfbAutoInstallMode: 'sudo',
+ displayServerAutoInstallMode: 'sudo',
- xvfbAutoInstallCommand: 'my-install-command',
+ displayServerAutoInstallCommand: 'my-install-command',
```

لا تأثير لـ `xvfbMaxRetries` و`xvfbRetryDelay`، وستُزالان أيضًا في v11. لم يعد بدء التشغيل يُعاد: إذا فشل Weston في البدء، يجرّب مشغّل الاختبارات Xvfb، وإذا لم يبدأ أي منهما، يستمر التشغيل بدون شاشة.

الإعداد الذي يضبط أحد الخيارات الأربعة المعاد تسميتها بدون بديله، ولا يضبط `displayServer`، يستمر في استخدام Xvfb كما في v9. وما لم يعطّل خادم العرض، فإنه يسجّل أيضًا `Preferring Xvfb, as v9 did, because the config sets v9 display keys`. بعد إعادة تسمية الخيارات، أضف `displayServer: 'xvfb'` للإبقاء على Xvfb، أو اتركه لتفضيل Weston. في الوضع التلقائي، يعمل أمر التثبيت المخصص لـ Weston أولًا، ثم مرة أخرى لـ Xvfb فقط إذا ظل Weston غير متاح أو فشل في البدء وكان Xvfb لا يزال مفقودًا، لذا اضبط `displayServer` على الخادم الذي يثبّته الأمر لتخطي محاولة الخادم الآخر.

لم يعد التثبيت التلقائي يدعم `yum`، الذي كان v9 يستخدمه على المضيفات التي لا تحتوي `dnf`. يكتشف v10 فقط `apt-get` و`dnf` و`zypper` و`pacman` و`apk` و`xbps-install`، لذا ثبّت Xvfb بنفسك على مضيف لا يحتوي إلا `yum`.

كانت مصفوفة `xvfbAutoInstallCommand` تعمل عبر صدفة (shell) في v9، لذا كانت عناصر مثل `&&` أو `VAR=value` تعمل. أصبحت المصفوفات تعمل الآن بدون صدفة تحت أي من اسمي الخيار، لذا استخدم سلسلة نصية لصياغة الصدفة.

تغييرات أخرى قد تلاحظها:

- تتشارك جميع العمال شاشة واحدة. في v9، كان لكل عامل شاشته الخاصة. قد تفتقر صفحات Chrome وEdge الآن إلى التركيز، راجع [تركيز النافذة](/docs/headless-and-display-servers#window-focus).
- رقم شاشة Xvfb ليس ثابتًا. اقرأه من `DISPLAY` بدلًا من افتراض `:99`.
- أصبح المضيف الذي لا يحتوي إلا `WAYLAND_DISPLAY` مضبوطًا يُعد الآن مضيفًا ذا شاشة. كان v9 يشغّل العمال تحت Xvfb هناك، لأن `DISPLAY` لم يكن مضبوطًا. أما v10 فلا يبدأ شيئًا، ويفتح نوافذ المتصفح على المُركِّب (compositor) لديك، ويضبط `XDG_SESSION_TYPE` و`GDK_BACKEND` و`ELECTRON_OZONE_PLATFORM_HINT` على `wayland` طوال التشغيل. لتشغيلها تحت Xvfb كما في السابق، ألغِ ضبط `WAYLAND_DISPLAY` واضبط `displayServer: 'xvfb'`.
- الشاشة الافتراضية 1920x1080. كان v9 يستخدم القيمة الافتراضية لـ `xvfb-run`، وهي 1280x1024 على Debian وUbuntu و640x480 على Fedora وRHEL وArch. للإبقاء على الحجم الذي تستخدمه خطوط الأساس لديك، اضبط `displayServerWidth` و`displayServerHeight` عليه.
- تختار المتصفحات Wayland أو X11 من قيمة `XDG_SESSION_TYPE` التي يضبطها خادم العرض. تحت Weston، يضيف WebdriverIO أيضًا `--ozone-platform=wayland` إلى Chrome وEdge اللذين يشغّلهما، لأن Chrome وEdge قبل 140 (وChrome for Testing قبل 135) يتجاهلان `XDG_SESSION_TYPE`. لا يوفر Weston قيمة `DISPLAY`، لذا إذا كانت اختباراتك أو أدواتك تحتاج إلى X11، فاضبط `displayServer: 'xvfb'`.
- إذا كنت تستخدم `XvfbManager` أو نسخة `xvfb` من `@wdio/xvfb` مباشرة، فاستخدم `DisplayServerManager` من `@wdio/display-server` بدلًا منها. حيث كنت تشغّل `xvfb.init()` وتغلّف الأوامر داخل `xvfb-run`، أو تنشئ العمليات عبر `ProcessFactory`، ابدأ شاشة ومرّر بيئتها إلى العمليات التي تحتاجها. يستخدم المثال Xvfb بدقة 1280x1024، كما كان v9 يفعل على Debian وUbuntu. على مضيف لا يحتوي إلا `WAYLAND_DISPLAY` مضبوطًا، ألغِ ضبطه أولًا، وإلا فلن يبدأ `startDaemon()` شيئًا:

  ```js
  import { spawn } from 'node:child_process'
  import { once } from 'node:events'
  import { DisplayServerManager } from '@wdio/display-server'

  const manager = new DisplayServerManager({ displayServer: 'xvfb' })
  const daemon = await manager.startDaemon({ width: 1280, height: 1024 })
  // يعيد startDaemon() أيضًا null عندما تكون هناك شاشة موجودة بالفعل
  if (!daemon && manager.shouldRun()) {
      throw new Error('Xvfb could not be started')
  }
  try {
      const child = spawn('your-command', { shell: true, stdio: 'inherit', env: { ...process.env, ...daemon?.env } })
      const [code] = await once(child, 'exit')
      process.exitCode = code ?? 1
  } finally {
      await daemon?.stop()
  }
  ```

## المحاكاة (Emulation)

يقود `browser.emulate()` وحدة المحاكاة في WebDriver BiDi لسياق التصفح الحالي في المستوى الأعلى. كان v9 يحقن سكربت تحميل مسبق يعدّل `navigator.geolocation.getCurrentPosition` و`navigator.userAgent` و`window.matchMedia` و`navigator.onLine`. أُزيلت تلك السكربتات. لا يزال `browser.emulate('clock', …)` يثبّت مؤقتات مزيفة في الصفحة الحالية وفي الصفحات التي تُفتح بعدها.

لم تعد إعادة التحميل مطلوبة لنطاقات BiDi.

```diff
  await browser.emulate('onLine', false)
- // تغيّر `navigator.onLine` فقط؛ واستمرت حركة المرور في التدفق
+ // سياق التصفح غير متصل، بما في ذلك fetch وWebSocket وWebTransport
```

- يستدعي `onLine: false` الأمر `emulation.setNetworkConditions` مع `{ type: 'offline' }`. وتمسحه القيمة `true` واستعادة النطاق. يبقى معدل النقل وزمن الاستجابة مع `browser.throttleNetwork()`.
- يضبط `colorScheme` ميزة الوسائط `prefers-color-scheme`، لذا يتبع CSS `@media (prefers-color-scheme)` نتيجة `matchMedia`.
- `userAgent` هو تجاوز وكيل المستخدم في المتصفح، وليس خاصية `navigator.userAgent` معدّلة.
- يستخدم `geolocation` مكدس تحديد الموقع الجغرافي في المتصفح. قد تحتاج الصفحة مع ذلك إلى `browser.setPermissions({ name: 'geolocation' }, 'granted')`. ويبلغ `{ error: 'positionUnavailable' }` عن ذلك الخطأ بدلًا من الإحداثيات.
- يتشارك `colorScheme` و`media` خريطة واحدة لميزات الوسائط. يستبدل الاستدعاء اللاحق الخريطة كلها، واستعادة أي من النطاقين تمسحها.
- يضبط `device` وكيل المستخدم، ومنفذ العرض، واللمس، وتخطيط نص الجوال، ووسم meta لمنفذ العرض من واصف الجهاز. لا يغيّر `screen` ولا `orientation`.

النطاقات الجديدة هي `media` و`locale` و`timezone` و`touch` و`orientation` و`screen` و`viewportMeta` و`textLayout` و`scripting` و`scrollbar` و`forcedColors`. المتصفح الذي لا ينفّذ أمرًا يرفض الاستدعاء بخطئه الخاص (`unknown command` أو `unsupported operation`). لا يرجع WebdriverIO إلى سكربت تحميل مسبق ولا إلى CDP. إذا رُفض `device` في منتصف الطريق، تُعاد القيم السابقة لوكيل المستخدم ومنفذ العرض واللمس وتخطيط النص ووسم meta لمنفذ العرض.

يقبل `wdio session emulate` النطاقات نفسها. ولم يعد يطلب منك إعادة التحميل لتجاوز يُطبَّق فورًا. لم تتغير الإعدادات المسبقة لـ `emulate network` و`emulate cpu` وتبقى خاصة بـ Chromium. راجع [المحاكاة](/docs/emulation).

## الخطوات التالية

- انسخ [مهارة الترحيل](#migrate-with-a-coding-agent) إلى المشروع واطلب من وكيل تطبيقها.
- [WebdriverIO لوكلاء البرمجة](/docs/ai-agents) لكتابة اختبارات v10 جديدة.
- [وضع Headless وخوادم العرض](/docs/headless-and-display-servers) عندما تعمل مجموعة الاختبارات على Linux.