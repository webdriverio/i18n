---
id: v10-migration
title: من v9 إلى v10
description: تحديث مشروع WebdriverIO من الإصدار v9 إلى v10، مع جميع التغييرات الجذرية ومهارة لوكيل البرمجة تطبّق هذا الدليل.
---

يجمع هذا الدليل التغييرات الجذرية في WebdriverIO `v10` وما يجب عليك فعله حيالها.

على عكس الإصدارات الرئيسية السابقة، لا يستطيع [codemod](https://github.com/webdriverio/codemod) الخاص بـ WebdriverIO تطبيق معظم هذه التغييرات، لأنها تعتمد على المعنى الفعلي لاختباراتك. [توقيعات الأوامر القديمة](#legacy-command-signatures) أدناه هي استبدالات آلية. أما بقية الأقسام فيشرح كلٌّ منها كيفية العثور على المواضع المتأثرة في مجموعة اختباراتك.

## الترحيل باستخدام وكيل برمجة

أعطِ وكيلك مهارة الترحيل إلى v10، واطلب منه ترحيل مجموعة الاختبارات إلى WebdriverIO v10 باتباع هذه الصفحة. المهارة هي الإجراء: ما الذي يجب البحث عنه، وأي codemod يجب تشغيله، ومتى يجب التوقف. أما هذه الصفحة فهي المرجع الموثوق لكل تغيير جذري.

ثبّتها من المشروع الذي تُرقّيه. تقرأ [skills CLI](https://skills.sh) الملف [`.agents/skills/wdio-v10-migration/SKILL.md`](https://github.com/webdriverio/webdriverio/blob/main/.agents/skills/wdio-v10-migration/SKILL.md) من هذا المستودع، وتكتبه في مجلد المهارات الخاص بالوكلاء الذين تختارهم:

```sh
npx skills add webdriverio/webdriverio --skill wdio-v10-migration
```

يثبّت `--skill wdio-v10-migration` هذه المهارة. المهارات المخصصة للعمل على مستودع WebdriverIO مُعلَّمة بأنها داخلية ولا تُعرض. تسألك الأداة عن الوكلاء الذين تريد التثبيت لهم، وتكتب المهارة في مجلد المشروع الخاص بكل وكيل. يمكنك أيضًا إرفاق هذا الملف بالمحادثة.

لا تظهر المحدِّدات الصارمة وقوائم `specs` / `exclude` المجرّدة في الـ capabilities إلا عند تشغيل مجموعة الاختبارات. لا تستطيع المهارة الحكم عليها من الشيفرة المصدرية وحدها.

## Node.js

يتطلب WebdriverIO v10 الإصدار Node.js 22.19.0 أو أحدث. لم يعد Node.js 18 و20 مدعومين. يغطي CI الإصدارات Node.js 22 و24 و26.

## اختبارات المكوّنات

لا يزال مشغّل المتصفح يعمل على Chrome 90 وEdge 90 وFirefox 90 وSafari 14.1 أو أحدث. راجع [دعم المتصفحات](/docs/component-testing#browser-support).

تبقى الشيفرة الممرَّرة إلى `browser.execute` على مستوى ES2021، حتى تعمل في المتصفحات الأقدم قيد الاختبار. هذا الحد الأدنى لم يتغير.

## Mocha

يعتمد `@wdio/mocha-framework` و`@wdio/browser-runner` على [Mocha 12](https://mochajs.org/blog/mocha-12-stable/). يحتاج Mocha 12 إلى Node.js `^20.19.0 || >=22.12.0`، وهو ما يغطيه الحد الأدنى لـ v10 وهو 22.19.0.

```diff
- mochaOpts: { compilers: ['ts:ts-node/register'] }
+ mochaOpts: { require: ['ts-node/register'] }
```

أُزيل `mochaOpts.compilers`. أزال Mocha الخيار `--compilers` المُهمَل منذ زمن طويل، لذا تُتجاهَل أي تعيينات مترجِمات متبقية. حمّل المترجِمات (transpilers) أو ملفات الإعداد الأخرى باستخدام `mochaOpts.require`.

يتبع WebdriverIO مهلة Mocha: `this.timeout()` في اختبار أو hook، و`mochaOpts.timeout: 0` الذي يُعطّل المهلة. في v9، كان WebdriverIO يتجاهل `this.timeout()` داخل الاختبار، وابتداءً من 9.22 كان `mochaOpts.timeout: 0` يُفشل كل اختبار ("Timeout after -3ms"). لا يعيد وسيط `retry` في WebdriverIO تشغيل الاختبار بعد انتهاء المهلة. راجع [مهلات Mocha وhooks الخاصة بـ WebdriverIO](./Timeouts.md#mocha-timeouts-and-the-webdriverio-hooks)، وكذلك بالنسبة لـ `mochaOpts.parallelMode`. جديد في v10: [الاختبارات المتوازية داخل ملف spec](./ParallelTests.md) باستخدام `mochaOpts.parallelMode` أو `cucumberOpts.parallelMode`.

القيمة الافتراضية لـ `failHookAffectedTests` هي `true`. يؤدي فشل hook من نوع `before` أو `beforeEach` إلى إفشال الاختبارات التي تخطاها ذلك الـ hook. اضبط `mochaOpts.failHookAffectedTests` على `false` للإبلاغ عن الـ hook فقط.

استخدم `expect-webdriverio` 8، راجع [expect-webdriverio 8](#expect-webdriverio-8). يمكن لـ Mocha تحميل هذه الحزمة مرتين في عملية واحدة؛ وهي تشارك حالة التأكيدات بين النسختين ([expect-webdriverio#2221](https://github.com/webdriverio/expect-webdriverio/pull/2221)).

تغييرات Mocha 12 التي قد تتسرب عبر `mochaOpts`:

- يقبل `grep` رايات RegExp الحديثة.
- لا يزال `ui` إما `bdd` أو `tdd` أو `qunit` أو `exports`. يجب أن تحتفظ الواجهات المخصصة باللاحقة `*-bdd` أو `*-tdd` أو `*-qunit`.
- لا يزال `parallel` غير مدعوم. يتولى WDIO توازي ملفات spec؛ وسيُطلق مجمّع العمال (worker pool) في Mocha خطأً إذا فعّلته.

Mocha 12 يعتمد ESM أولًا (`"type": "module"`). لا يزال `require('mocha')` البرمجي يعمل على Node 22 عبر `require(esm)`. لم تتغير واجهة أوامر Mocha في WDIO (`wdio run … --mochaOpts.*`)؛ أما واجهة الأوامر الخاصة بـ Mocha نفسه فأصبحت تستخدم `util.parseArgs` بدلًا من yargs.

## Cucumber

يعتمد `@wdio/cucumber-framework` على [`@cucumber/cucumber` 13](https://github.com/cucumber/cucumber-js/blob/main/UPGRADING.md#1300).

يتطلب Cucumber 13 الإصدار Node.js 22 أو 24 أو 26 أو أحدث. لا يعمل على Node.js 20 أو 23 أو 25. تُعلن حزمة الإطار النطاق نفسه، بدءًا من الحد الأدنى لـ v10 وهو 22.19.0.

```diff
- cucumberOpts: { tagExpression: '@smoke' }
+ cucumberOpts: { tags: '@smoke' }
```

لا يوجد اسم بديل لـ `tagExpression`. ضبطه يُطلق خطأً، حتى لا يؤدي مرشّح متبقٍّ إلى تشغيل كل السيناريوهات بصمت.

لم يعد Cucumber 13 يُصدّر `Cli`. تمر عمليات التشغيل البرمجية عبر `runCucumber` من `@cucumber/cucumber/api`، وهو ما يستخدمه المحوّل (adapter) أصلًا.

التغييرات الجذرية الأخرى في Cucumber 13 (مسارات المنسّقات الملتبسة، والعمال المتوازيون، و`BeforeAll` / `AfterAll`) موصوفة في [دليل الترقية الخاص بـ Cucumber](https://github.com/cucumber/cucumber-js/blob/main/UPGRADING.md#1300).

### uid الخاص بالـ Feature

الـ uid الخاص بـ feature في Cucumber هو مسار ملف الـ feature بدءًا من `rootDir`، وليس اسم الملف: `features/admin/login.feature:1:1` بدلًا من `login.feature:1:1`. لم يعد ملفا feature يحملان الاسم نفسه في مجلدين مختلفين يتشاركان uid واحدًا. تستخدم `parent` و`fullTitle` الخاصتان بالسيناريو هذا الـ uid. تُرمَّز `%` و`:` و`#` في المسار بالصيغ `%25` و`%3A` و`%23`، بحيث يبقى `uid.split(':')[1]` هو رقم السطر، ولا تبدأ `#` إلا رقم جزء. في ملفات spec المجمّعة ذات الترتيب العشوائي، يحمل الـ feature الذي يبدأ من جديد الـ uid الخاص بالمجموعة `<uid>#2`.

مع `scenarioLevelReporter: true`، يأتي `historyId` الخاص بـ Allure من `fullTitle`، لذا يبدأ سجل Allure لكل سيناريو من جديد مع هذا التغيير. ويبدأ من جديد أيضًا عند تغيّر `rootDir` أو مسار ملف الـ feature. للاحتفاظ بسجل واحد لملفات config في مجلدات مختلفة، اضبط `rootDir` نفسه في كلٍّ منها.

## Jasmine

يعتمد `@wdio/jasmine-framework` على [Jasmine 6](https://jasmine.github.io/upgrade-guides/6.0). يُختبَر Jasmine 6 على Node.js 20 و22 و24. ويغطي الحد الأدنى لـ v10 وهو 22.19.0 هذا النطاق بالفعل.

أُزيل `jasmineNodeOpts`. اضبط Jasmine باستخدام `jasmineOpts`. ضبط `jasmineNodeOpts` يُطلق خطأً:

```text
The option "jasmineNodeOpts" was removed in WebdriverIO v10. Use "jasmineOpts" instead.
```

```diff
- jasmineNodeOpts: { defaultTimeoutInterval: 60000 }
+ jasmineOpts: { defaultTimeoutInterval: 60000 }
```

لم يعد `jasmineOpts.failFast` يُقرأ. استخدم `jasmineOpts.stopOnSpecFailure`. لا يؤدي `failFast` المتبقي إلى إيقاف مجموعة الاختبارات. أما `failFast` الخاص بـ Cucumber فهو خيار مختلف ولا يزال يعمل.

```diff
- jasmineOpts: { failFast: true }
+ jasmineOpts: { stopOnSpecFailure: true }
```

أُزيل `jasmineOpts.stopSpecOnExpectationFailure`. استخدم `jasmineOpts.oneFailurePerSpec`. ضبط المفتاح القديم يُطلق خطأً:

```text
The option "jasmineOpts.stopSpecOnExpectationFailure" was removed in WebdriverIO v10. Use "jasmineOpts.oneFailurePerSpec" instead.
```

```diff
- jasmineOpts: { stopSpecOnExpectationFailure: true }
+ jasmineOpts: { oneFailurePerSpec: true }
```

عادت المطابِقات (matchers) المتزامنة في Jasmine متزامنةً مرة أخرى. في v9، كان `expect` العام هو `expectAsync` الخاص بـ Jasmine، لذا كان `expect(1).toBe(1)` يُعيد promise. في v10، تُعيد المطابِقات المدمجة في Jasmine والمطابِقات التي تضيفها عبر `jasmine.addMatchers` القيمة `undefined`. أما مطابِقات WebdriverIO، والمطابِقات غير المتزامنة في Jasmine، ومطابِقات `jasmine.addAsyncMatchers` فلا تزال تُعيد promise، لذا واصل استخدام `await` معها. لا تحتاج إلى تغيير `await expect($('#logo')).toBeDisplayed()` إلى `expectAsync()`: فـ `expect` العام يوجّه مطابِقات WebdriverIO إلى `expectAsync` نيابةً عنك. ويستمر `await expect(1).toBe(1)` في العمل.

أصبح التأكيد المتزامن الفاشل دون `await` يُفشل الـ spec الآن. في v9، كان promise مرفوضًا: إذا لم ينتظره شيء، كان من الممكن أن ينجح الـ spec، مع مجرد رفض غير معالَج في السجل. بعد الترقية، انظر إلى ملفات spec التي بدأت تفشل. كان فيها فشل مخفي في v9، والإصلاح يكون في الاختبار أو في التطبيق، وليس في استدعاء `expect`:

```js
it('saves the form', async () => {
    const onSave = jasmine.createSpy('onSave')
    await submitForm(onSave)
    // v9: ينجح حتى عندما لم يُستدعَ `onSave`
    // v10: يفشل عندما لم يُستدعَ `onSave`
    expect(onSave).toHaveBeenCalled()
})
```

نتيجة المطابِق المتزامن الآن هي `undefined`، لذا فإن استدعاء `.then()` أو `.catch()` عليها يُطلق `TypeError`:

```diff
- expect(total).toBe(3).then(() => log('ok'))
+ expect(total).toBe(3)
+ log('ok')
```

آثار أخرى لهذا التغيير:

- يوقف `oneFailurePerSpec` الآن الـ spec عند أول تأكيد فاشل: فورًا بالنسبة للمطابِق المتزامن، وعند استقرار الـ promise بالنسبة للمطابِق غير المتزامن المنتظَر.
- تعمل مطابِقات spy في Jasmine دون `await`. في v9، كانت `toHaveBeenCalled` و`toHaveSpyInteractions` و`toHaveNoOtherSpyInteractions` تفشل برسالة "Does not take arguments"، وكان spy غير مُستدعى ينجح دون `await`.
- لم يعد `jasmine.addMatchers` يُستبدَل، لذا لم يعد Jasmine يعرض تحذير "Monkey patching detected".

للمطابِق `toHaveSize` معنيان. على قيمة WebdriverIO، يكون هو مطابِق WebdriverIO ويتحقق من حجم العنصر: عنصر، أو مصفوفة عناصر (بما في ذلك نتيجة `$$().filter()`)، أو `Element[]`، أو عنصر multi-remote، أو متصفح، أو سياق تصفح (browsing context)، أو mock، أو مغلّف `some()`، أو promise مثل `$()` القابل للتسلسل. أما على أي قيمة أخرى، فيكون مطابِق Jasmine ويتحقق من الطول. في v9، كان مطابِق Jasmine يعمل دائمًا.

```js
expect([1, 2]).toHaveSize(2)                                   // Jasmine، متزامن
await expect($('#logo')).toHaveSize({ width: 32, height: 32 }) // WebdriverIO، غير متزامن
```

تتبع الأنواع القواعد نفسها. يحدد `@wdio/jasmine-framework` الآن نوع `expect` العام بمطابِقات Jasmine، إضافةً إلى مطابِقات WebdriverIO ومطابِقات Jasmine غير المتزامنة التي تُعيد promise. أزل `expect-webdriverio/jasmine-wdio-expect-async` من `types` في ملف `tsconfig.json`، لأنه يحدد نوع كل مطابِق على أنه غير متزامن. وأضف `jasmine` إن لم يكن موجودًا:

```diff title="tsconfig.json"
 {
     "compilerOptions": {
-        "types": ["node", "@wdio/globals/types", "expect-webdriverio/jasmine-wdio-expect-async", "@wdio/jasmine-framework"]
+        "types": ["node", "jasmine", "@wdio/globals/types", "@wdio/jasmine-framework"]
     }
 }
```

أصبح `expect.oneOf()` و`expect.multiRemote()` يعملان الآن أيضًا في ملفات spec الخاصة بـ Jasmine. في السابق، لم يكونا موجودين على `expect` الخاص بـ Jasmine وقت التشغيل.

## expect-webdriverio 8

تتطلب `@wdio/globals` و`@wdio/runner` و`@wdio/browser-runner` الحزمة `expect-webdriverio` 8 كاعتمادية نظيرة (peer dependency). في v9، كانت `expect-webdriverio` 5 أو 6 أو 7. إذا كان ملف `package.json` يتضمن `expect-webdriverio`، فحدّثها إلى الإصدار 8 في التغيير نفسه الذي تحدّث فيه حزم `@wdio/*`.

لـ `expect-webdriverio` 8 تغييراتها الجذرية الخاصة. يسرد [دليل الترحيل من v7 إلى v8](https://github.com/webdriverio/expect-webdriverio/blob/main/docs/Migrations.md#migration-guide-v7-to-v8) الخاص بها كل تغيير وبديله. إذا كنت تنتقل من `expect-webdriverio` 5 أو 6، فاقرأ أيضًا [دليل الترحيل من v5 إلى v6](https://github.com/webdriverio/expect-webdriverio/blob/main/docs/Migrations.md#migration-guide-v5-to-v6): فالإصدار 8 يزيل الواجهات البرمجية التي أهملتها الإصدارات من 5.6.9 إلى 6.0.0. ليس للإصدار 7 دليل ترحيل. فهو يضيف دعم multi-remote، وأصبح `toMatchSnapshot()` و`toMatchInlineSnapshot()` على `$$()` يخزّنان `outerHTML` لكل عنصر: حدّث تلك اللقطات. هذه التغييرات هي الأكثر احتمالًا للتأثير على مجموعة الاختبارات:

- يقارن `toHaveText` على `$$()` العناصر فهرسًا بفهرس. تفشل مصفوفة متوقعة بترتيب مختلف عن ترتيب الصفحة. استخدم ترتيب الصفحة، أو `expect.oneOf()` أو `expect.arrayContaining()`.
- تؤدي مصفوفة من القيم المتوقعة على عنصر واحد إلى فشل `toHaveText` و`toHaveHTML` و`toHaveComputedLabel` و`toHaveComputedRole` و`toHaveElementClass`. استخدم `expect.oneOf()`. بالنسبة لـ `toHaveElementClass`، كانت المصفوفة تعني "يملك أيًّا من هذه الفئات": استخدم `expect.oneOf()`، أو تأكيدًا واحدًا لكل فئة عندما يجب أن يملك العنصر جميعها.
- يُطلق مطابِق القوائم (`expect.arrayContaining()`، `expect.arrayOf()`) خطأً على عنصر واحد أو مع `some()`. أما على `$$()`، فيقارن قيم جميع العناصر دفعة واحدة.
- لا تتطابق خاصية (attribute أو property) مفقودة أبدًا، ولا حتى مع مطابِق لا يقبل أي قيمة، مثل `expect.not.stringContaining()`.
- تُقارن قيم `URL` و`Set` و`Map` والقيم الثنائية حسب محتواها. قد يفشل الآن تأكيد كان ينجح عن طريق الخطأ.
- لم تعد الأنواع المساعدة عامة. يفشل الملف الذي يستخدم `Test` أو `TestResult` أو `Scenario` أو `WdioCustomMatchers` دون استيراد برسالة `Cannot find name`: استخدم `Frameworks.Test` و`Frameworks.TestResult` و`Frameworks.Scenario` من `@wdio/types`، و`ExpectWebdriverIO.Matchers`.
- أُزيل `setFeatureFlags()` وخيار `featureFlags`.
- أُزيلت هذه الواجهات المُهمَلة: `setOptions` (استخدم `setDefaultOptions`)، و`getConfig` (استخدم `getDefaultOptions`)، و`matchers` (استخدم `wdioCustomMatchers`)، و`toHaveAttr` (استخدم `toHaveAttribute`)، و`toHaveClass` (استخدم `toHaveElementClass`)، و`toBeRequestedWithResponse()` (استخدم `toBeRequestedWith({ response })`)، و`expect-webdriverio/types` (استخدم `expect-webdriverio/expect-global`).
- يحصل الـ hookان `beforeAssertion` و`afterAssertion` على اسم الاسم البديل (alias) الذي استدعاه الاختبار، بالنسبة لـ `toBeExisting` و`toBePresent` و`toHaveLink` و`toHaveValue` و`toBeRequested`. في v9، كانا يحصلان على اسم المطابِق الكامن وراء الاسم البديل، مثل `toExist` بدلًا من `toBeExisting`.
- على متصفح multi-remote، مرّر نتيجة `$$()` إلى `expect`. لا تُعرَف المصفوفة العادية مثل `[...elements]` أو `Array.from(elements)` على أنها عناصر، ويفشل التأكيد.

على متصفح multi-remote، يتحقق تأكيد واحد من كل النسخ، ويعطي `expect.multiRemote()` قيمة متوقعة واحدة لكل نسخة. راجع [تأكيدات Multiremote](/docs/multiremote#assertions).

## حزم المشغّلات (Driver)

يشغّل WebdriverIO v10 متصفحات Firefox وEdge وSafari باستخدام `geckodriver` 8 و`edgedriver` 8 و`safaridriver` 3. في v9، كان يستخدم `geckodriver` و`edgedriver` 6 أو 7، و`safaridriver` 1 أو 2. يثبّتها WebdriverIO بنفسه، لذا لا تحتاج إلى إدراجها بنفسك. إذا كان ملف `package.json` يتضمن إحداها، فحدّثها في التغيير نفسه الذي تحدّث فيه حزم `@wdio/*`.

تأخذ `geckodriver` و`edgedriver` الحزمة `@wdio/logger` كاعتمادية نظيرة، لذا تسجّل عبر المسجّل الخاص بتثبيت WebdriverIO لديك. في v9، كانت `geckodriver` و`edgedriver` تجلبان نسختهما الخاصة من `@wdio/logger`، وكانت تلك النسخة الثانية تُفرغ ملف السجل في `outputDir`. شغّل `npm ls @wdio/logger`: يجب أن تكون كل نسخة بالإصدار 10. الإضافة أو الخدمة التي لا تزال تعتمد على الإصدار 9 لها الأثر نفسه.

تسرد [ملاحظات ترقية المشغّلات](https://github.com/webdriverio/driver#upgrading-to-geckodriver-8-edgedriver-8-and-safaridriver-3) كل تغيير. يمكن لهذه التغييرات أن تؤثر على مشروع WebdriverIO:

- تستخدم عمليات تنزيل المشغّلات `HTTPS_PROXY` و`HTTP_PROXY`. في v9، كانت تنزيلات `geckodriver` و`edgedriver` تتجاهلهما. إذا كان هناك proxy مضبوط في بيئتك ولكن يجب الوصول إلى CDN المشغّل مباشرة، فأضف مضيفه إلى `NO_PROXY`.
- لم يعد `geckodriver` يقرأ `GECKODRIVER_FILEPATH`. استخدم `GECKODRIVER_PATH`.
- يقبل `wdio:edgedriverOptions` و`wdio:safaridriverOptions` الخيار `spawnOpts`، كما يفعل `wdio:chromedriverOptions`.

## تنزيلات المتصفح

في v9، كان WebdriverIO يستخرج ملفات zip الخاصة بـ Chrome وChromium وChromedriver بنفسه. في v10 يستخدم أمر النظام `unzip` على Linux وmacOS (و`tar.exe` أو PowerShell على Windows). صور Docker المصغّرة، مثل `node:24-slim`، لا تحتوي عليه: ثبّته، راجع [Docker](/docs/docker#images-where-webdriverio-downloads-the-browser).

في v9، كانت تنزيلات Chrome وChromium وFirefox وChromedriver تستخدم `HTTPS_PROXY` و`HTTP_PROXY`. في v10 لا تستخدمهما إلا عندما تكون `proxy-agent` مثبّتة في مشروعك، أو عندما يعمل Node.js مع `NODE_USE_ENV_PROXY=1` (Node.js 22.21.0 / 24.5.0 أو أحدث). يسجّل WebdriverIO تحذيرًا عندما يكون متغير proxy مضبوطًا لكن التنزيل سيتجاهله. راجع [Proxy لتنزيلات المتصفح والمشغّل](/docs/proxy#proxy-for-browser-and-driver-downloads).

## المتغير العام لـ Multi-remote

أُزيل المتغير العام `multiremotebrowser` ذو الأحرف الصغيرة، من `@wdio/globals` ومن المتغيرات العامة في `eslint-plugin-wdio` أيضًا. استخدم `multiRemoteBrowser`.

```diff
- import { multiremotebrowser } from '@wdio/globals'
+ import { multiRemoteBrowser } from '@wdio/globals'
```

## الـ Capabilities

لم تعد `specs` و`exclude` داخل الـ capabilities تُقرأ. استخدم `wdio:specs` و`wdio:exclude`.

```diff
  capabilities: [{
      browserName: 'chrome',
-     specs: ['./test/specs/chrome/**/*.js'],
-     exclude: ['./test/specs/chrome/skip.js']
+     'wdio:specs': ['./test/specs/chrome/**/*.js'],
+     'wdio:exclude': ['./test/specs/chrome/skip.js']
  }]
```

تبقى مفاتيح الإعداد في المستوى الأعلى `specs` و`exclude`. لا تختار القائمة المجرّدة المتبقية على capability أي ملفات لتلك الـ capability. وتستخدم الـ capability حينها `specs` و`exclude` من المستوى الأعلى.

أُزيل الاسمان البديلان `tunnelIdentifier` و`parentTunnel` من أنواع خيارات Sauce Labs. استخدم `tunnelName` و`tunnelOwner`.

## TypeScript

أُزيلت الأنواع `Element` و`MultiRemoteBrowser` و`MultiRemoteElement` المُصدَّرة من `webdriverio`. استخدم مساحة الأسماء العامة `WebdriverIO`.

```diff
- import type { Element } from 'webdriverio'
- const elem: Element = await $('#foo')
+ const elem: WebdriverIO.Element = await $('#foo')
```

أصبح `ChainablePromiseElement` يُعلن `then`، وأصبح `ChainablePromiseArray` يُعلن `then` و`catch` و`finally`. تصف الأنواع القابلة للتسلسل القيمة قبل `await`. ولم تعد تناسب القيمة المنتظَرة:

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

أصبح كلا النوعين القابلين للتسلسل يطابقان `T extends PromiseLike<unknown>`. يأخذ النوع الشرطي الذي يتحقق من `PromiseLike` فرعًا مختلفًا لـ `$()` و`$$()` عمّا كان في v9. على سبيل المثال، أصبح `Awaited<ChainablePromiseElement>` الآن `WebdriverIO.Element`، وأصبح `Awaited<ChainablePromiseArray>` هو `WebdriverIO.ElementArray`.

تغيّر نوع خصائص `$$()` غير المنتظَر. فهي متاحة فورًا، قبل أن يُحَل الاستعلام، لذا اقرأها دون `await` أو `.then()`:

| الخاصية | v9 | v10 |
|---|---|---|
| `selector` | `Promise<Selector>` | `Selector \| undefined` |
| `parent` | `Promise<...>` | العنصر الأب، وليس promise (انظر أدناه) |
| `foundWith` | لا يوجد | الأمر الذي عثر على القائمة، مثل `$$` أو `custom$$` |
| `props` | لا يوجد | الوسائط الإضافية لذلك الأمر |

```diff
- const selector = await $$('li').selector
+ const selector = $$('li').selector
```

في الاستعلام المتسلسل مثل `$('form').$$('input')`، يكون `parent` هو `$('form')` القابل للتسلسل إلى أن تُحَل القائمة، ثم العنصر المحلول بعد ذلك. انتظر القائمة قبل أن تستخدم `parent` كعنصر.

وقت التشغيل، تُعيد `filter()` و`filterSeries()` و`slice()` على قائمة `$$()` قائمة عناصر، وليس مصفوفة عادية. تحتفظ النتيجة بـ `selector` و`foundWith` و`parent` و`props` الخاصة بالقائمة المصدر. في v9، كانت `filter()` تُعيد مصفوفة عادية دون هذه الخصائص. لا تُظهر الأنواع ذلك بعد: إذ تُعلَن `filter()` و`filterSeries()` على أنها تُعيد `Promise<WebdriverIO.Element[]>`، وتُعيد `slice()` النوع `WebdriverIO.Element[]`، لذا يُبلغ TypeScript عن خطأ عندما تقرأ هذه الخصائص على النتيجة.

لا يعيد WebdriverIO تشغيل الاستعلام للقائمة المشتقة نفسها: الفهرس الذي يتجاوز نهايتها لا ينتظر مزيدًا من التطابقات، ولا يُعيد أبدًا عنصرًا استبعده المرشّح. لا يزال أعضاؤها هم عناصر الاستعلام المصدر، بـ `selector` و`index` الأصليين. إذا أصبح أحد الأعضاء قديمًا (stale)، يجلبه WebdriverIO مجددًا من الاستعلام المصدر عند ذلك الفهرس، وقد يكون عنصرًا آخر إذا تغيرت الصفحة. الشيفرة التي تعيد تشغيل استعلام القائمة من خصائصها، مثل `parent[foundWith](selector, ...props)`، تحصل على القائمة الكاملة، لا على القائمة المرشَّحة.

تضبط الحزم المنشورة `typeScriptVersion` على 6.0.3، بما يطابق إصدار TypeScript الذي يُترجَم به هذا المستودع.

يقبل `browser.mock()` كائن `URLPattern` من `urlpattern-polyfill` و`URLPattern` الأصلي (العام في Node.js 24، والمحدد نوعه في مكتبة `dom` الخاصة بـ TypeScript 6).

يُهمل TypeScript 6 كلًّا من `"moduleResolution": "node"` و`"baseUrl"`، ويجعل `strict` هو الافتراضي. يُنشئ `create-wdio` الآن `"moduleResolution": "bundler"` لمشاريع ESM و`"NodeNext"` لمشاريع CommonJS. إذا حدّثت TypeScript في مشروع قائم، فغيّر هذه الخيارات في ملف `tsconfig.json`.

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

يغيّر TypeScript 6 أيضًا القيمة الافتراضية لـ `types` إلى `[]`، لذا لم يعد يحمّل كل حزم `@types/*` المثبّتة. إذا لم يكن في ملف `tsconfig.json` قائمة `types`، فإن المتغيرات العامة مثل `describe` و`it` الخاصة بـ Mocha تفشل برسالة `Cannot find name`. أدرج حزم الأنواع التي تستخدمها اختباراتك، كما يفعل `create-wdio`. على سبيل المثال، مع Mocha:

```diff title="tsconfig.json"
 {
     "compilerOptions": {
+        "types": ["node", "@wdio/globals/types", "@wdio/mocha-framework"]
     }
 }
```

يكتب `npm create wdio@latest` القيمتين `compilerOptions.target` و`compilerOptions.lib` على أنهما `es2024`. يحتاج التحقق من أنواع هذا الملف إلى TypeScript 5.7 أو أحدث. لا يتحقق `tsx`، الذي يشغّل الإعداد والاختبارات، من الأنواع، لذا لا يهم المترجِم الأقدم إلا عندما تشغّل `tsc` بنفسك.

لا تُعاد كتابة ملف `tsconfig.json` الموجود. يحتفظ الإعداد المُنشأ الذي يمتد من إعداد آخر بـ `target` و`lib` الخاصين بالأب.

في الـ hook المسمى `afterAssertion`، أصبح نوع `params.result` الآن `{ pass, message }`، كما تعطيه المطابِقات. في v9، كان النوع `{ result, message }`، لكن `params.result.result` كان دائمًا `undefined` وقت التشغيل. اقرأ `params.result.pass`:

```diff
  afterAssertion (params) {
-     console.log(params.matcherName, params.result.result)
+     console.log(params.matcherName, params.result.pass)
  }
```

تكون `pass` بقيمة `true` عندما تطابق القيمة القيمة المتوقعة، وكذلك مع `.not`. وبالتالي مع `.not`، ينجح التأكيد عندما تكون `pass` بقيمة `false`. لا يخبرك الـ hook ما إذا كان الاختبار قد استخدم `.not`.

## Hooks الأوامر

يشغّل أمر العنصر الـ hookين `beforeCommand` و`afterCommand` مرة واحدة، مع وسائط الأمر. في v9، كان يشغّلهما مرتين أو 3 مرات، وكان الاستدعاء الأول يحصل على `[]` كقيمة لـ `args`. لا يزال للأمر الذي يعمل داخل أمر آخر (مثل `getElementText` داخل `getText`) زوجه الخاص. لا تعمل الـ hooks لدالة الحدث `emit`. الـ hook الذي يعدّ الأوامر أو يقيس وقتها يرى كل أمر مرة واحدة.

بالنسبة لأمر العنصر، يعمل `beforeCommand` قبل أن ينتظر WebdriverIO العنصر، لذا قد يكون العنصر مفقودًا هناك. ويعمل `afterCommand` بعد الانتظار وأي إعادة محاولة، مع النتيجة أو الخطأ الخاص بالمحاولة الأخيرة. الـ hook الذي يحتاج إلى العنصر المعثور عليه يستخدم `afterCommand`.

الأمر المُعدَّل بـ `overwriteCommand()`، والاستعلام المتسلسل على promise (`$('a').$('b')`)، قد يشغّلان الـ hooks أكثر من مرة.

## المُبلِّغون (Reporters)

يُمرَّر حدث `result` الخاص بالمتصفح إلى المُبلِّغين على أنه `client:afterCommand`. لم يعد لتلك الحمولة ولنوع `AfterCommandArgs` خاصية `name`. اقرأ `command` بدلًا منها. كانت الأوامر المخصصة ترسل `command` أصلًا.

```diff
  onAfterCommand(args) {
-     console.log(args.name)
+     console.log(args.command)
  }
```

### Allure

أُزيل `addEnvironment(name, value)` من `@wdio/allure-reporter`. لم يكن له أي تأثير. اضبط صفوف البيئة باستخدام [`reportedEnvironmentVars`](/docs/allure-reporter) في خيارات مُبلِّغ Allure.

### مُبلِّغ Cucumber JSON

انتقل `wdio-cucumberjs-json-reporter` إلى مستودع WebdriverIO باسم [`@wdio/cucumberjs-json-reporter`](/docs/cucumberjs-json-reporter). حزمة المجتمع مخصصة لـ v9 فقط: فهي تثبّت `@wdio/reporter` 9 و`@wdio/logger` 9.

```sh
npm uninstall wdio-cucumberjs-json-reporter
npm install @wdio/cucumberjs-json-reporter --save-dev
```

يبقى `reporters: ['cucumberjs-json']` كما هو: يحمّل WebdriverIO الحزمة `@wdio/cucumberjs-json-reporter` لهذا الاسم. استبدل الاستيرادات في ملفات الخطوات:

```diff
- import cucumberJson from 'wdio-cucumberjs-json-reporter'
+ import cucumberJson from '@wdio/cucumberjs-json-reporter'
```

الخيارات هي نفسها. تتبع ملفات JSON صيغة Cucumber JSON بدقة أكبر. تحقق من الأدوات والسكربتات التي تقرأها:

- الـ `id` الخاص بالسيناريو هو `<feature id>;<scenario id>`، و`<feature id>;<rule id>;<scenario id>` للسيناريو داخل `Rule:`، كما في صيغة Cucumber JSON. في السابق، لم يكن بين الأجزاء فاصل.
- يحتفظ الـ `id` الخاص بالـ feature بأحرف مثل `:` و`/` (تتحول المسافات فقط إلى `-`)، كما في صيغة Cucumber JSON. لا تتغير أسماء ملفات JSON، لكن جزء الـ feature الذي يزيد على 200 بايت (مثلًا كثير من الأحرف غير ASCII) يُقتطع وينتهي بقيمة hash (يسمح Linux بـ 255 بايت في اسم الملف)، ويبدأ اسم جهاز Windows مثل `con` بـ `_`.
- قيمة `keyword` للـ feature والسيناريو هي الكلمات المفتاحية الواردة في الملف، مثل `Scenario Outline` أو `Fonctionnalité`، كما في صيغة Cucumber JSON. في السابق، كانت دائمًا `Feature` و`Scenario`.
- للسيناريوهات والخطوات قيمة `line`.
- الوسوم بالصيغة `{ name, line }`، كما في صيغة Cucumber JSON؛ وتحصل وسوم السيناريو على السطر من ملف الـ feature. في السابق، كانت كائنات Cucumber داخلية تحتوي على `location` أو `id` أو `astNodeId` (عشوائي في كل تشغيل)، ولم يكن لوسوم السيناريو سطر.
- الـ hooks هي خطوات بقيمة `hidden: true` ودون `name`. في السابق، كان للـ hook قيمة `name` فارغة.
- وسيط doc string بالصيغة `{ content, line }`. في السابق، كان نص الـ doc string.
- الـ hook الذي يتخطاه Cucumber (بعد hook فاشل، أو hook يُعيد `'skipped'`) يحمل الحالة `skipped`، والـ hook الذي يُعيد `'pending'` يحمل `pending`، كما في صيغة Cucumber JSON. في السابق، كانت `passed`.
- حالة الخطوة الملتبسة هي `ambiguous`، كما في صيغة Cucumber JSON، ويسرد `error_message` الخاص بها تعريفات الخطوات المطابقة. في السابق، كانت `skipped` دون سبب، أو `failed` مع `cucumberOpts.failAmbiguousDefinitions`.
- حالة الخطوة غير المعرّفة هي `undefined`. في السابق، كانت `failed`، أو `pending` مع `cucumberOpts.ignoreUndefinedDefinitions`.
- السيناريو الذي يعيد Cucumber تشغيله (`cucumberOpts.retry`) يحتوي فقط على خطوات محاولته الأخيرة. في السابق، كان يحتوي على خطوات جميع المحاولات.
- مع `cucumberOpts.tagsInTitle`، لا تحتوي أسماء الـ feature والسيناريو والمعرّفات وأسماء الملفات على وسوم.
- عندما يشغّل عامل (worker) عدة ملفات feature (ملفات spec مجمّعة)، يكتب المُبلِّغ ملفًا واحدًا لكل feature. في السابق، كانت كل السيناريوهات تذهب إلى ملف الـ feature الأول.
- في جلسة multi-remote، تأتي البيانات الوصفية من النسخة الأولى.

هذه كانت مفقودة أو خاطئة سابقًا: خطوات `*`، والكلمة المفتاحية لخطوات `But`، والمرفقات من الـ hook المسمى `before` في WebdriverIO، والكائن المرفق كـ `text/plain` (أصبح نص JSON، وليس `[object Object]`)، وسلسلة JSON المرفقة كـ `application/json` (تبقى كما هي، ولا تُرمَّز مرة ثانية). تتبع الكلمات المفتاحية للخطوات ترويسة `# language:` في ملف الـ feature، ثم `cucumberOpts.language` (وخيار `language` الخاص بالمُبلِّغ فقط عندما لا يكون `cucumberOpts.language` مضبوطًا). مع `cucumberOpts.scenarioLevelReporter: true`، لا يكتب المُبلِّغ أي ملف ويسجّل تحذيرًا: فالصيغة تحتاج إلى الخطوات.

### مُبلِّغ الفيديو

انتقل `wdio-video-reporter` إلى مستودع WebdriverIO باسم [`@wdio/video-reporter`](/docs/video-reporter). حزمة المجتمع مخصصة لـ v9 فقط: فهي تثبّت `@wdio/reporter` 9 و`@wdio/logger` 9.

```sh
npm uninstall wdio-video-reporter
npm install @wdio/video-reporter --save-dev
```

كانت حزمة المجتمع تثبّت ffmpeg بنفسها. أما `@wdio/video-reporter` فلا تفعل: [ثبّت ffmpeg](/docs/video-reporter#install-ffmpeg) على كل جهاز يشغّل الاختبارات، بما في ذلك CI وصور Docker، أو اضبط الخيار `ffmpegPath` أو متغير البيئة `FFMPEG_PATH`. بدون ffmpeg، يسجّل المُبلِّغ تحذيرًا ولا يُنتج أي فيديو.

```sh
brew install ffmpeg                                         # macOS
sudo apt-get update && sudo apt-get install -y ffmpeg       # Ubuntu، Debian
winget install --id Gyan.FFmpeg -e                          # Windows
```

يبقى `reporters: ['video']` كما هو: يحمّل WebdriverIO الحزمة `@wdio/video-reporter` لهذا الاسم. استبدل الاستيرادات من `wdio-video-reporter` بـ `@wdio/video-reporter`. الخيارات هي نفسها، مع هذه التغييرات:

- يستخدم `snapshotCommands` الجزء الأخير من نقاط نهاية W3C WebDriver. كانت القيمة الافتراضية القديمة تسرد أيضًا أسماء JSON Wire Protocol مثل `buttonup` أو `moveto` أو `keys` أو `accept_alert`. هذه الأسماء لا تطابق أبدًا أي أمر في v10. استخدم أسماء [القائمة الافتراضية](/docs/video-reporter#snapshotcommands)، مثل `actions` أو `value` أو `accept`.
- في جلسة WebDriver BiDi، يلتقط المُبلِّغ أيضًا إطارًا بعد `url` و`back` و`forward` و`refresh` و`actions`.
- في جلسة WebDriver BiDi، يلتقط المُبلِّغ الإطارات باستخدام WebDriver BiDi، وينتظر الأمر التالي إطار الأمر الذي قبله (نحو 50 إلى 70 ms في Chrome)، بحيث يُظهر كل إطار صفحة أمره. في السابق، في Chrome، كانت لقطة الشاشة في بداية تنقّل WebDriver BiDi قد تجعل الاختبار ينتظر 10 ثوانٍ.
- في جلسة multi-remote، لا تلتقط إطارًا إلا أوامر النسخة الأولى. في السابق، كانت أوامر كل نسخة تلتقط إطارًا من النسخة الأولى.
- أمر `GET` يقرأ الصفحة فقط، لذا لا يعطي إطارًا، إلا مع `recordAllActions`. في السابق، كانت `getUrl` أو `getSize` أو `getValue` تعطي إطارًا، لأن الجزء الأخير من نقطة نهايتها (`url`، `rect`، `value`) موجود في `snapshotCommands`.
- التاريخ في أسماء ملفات الفيديو هو `YYYY-MM-DD--HH-MM-SS-mmm` على كل جهاز. في السابق، كان يستخدم الإعدادات المحلية للجهاز.
- يقبل `videoFormat` القيمتين `webm` (الافتراضية) و`mp4`. في السابق، كان `videoFormat: 'default'` يُنتج فيديوهات mp4؛ أما الآن فيسجّل تحذيرًا ويُنتج فيديوهات webm. استخدم `videoFormat: 'mp4'`.
- مع مُبلِّغ Allure، لم يعد الاختبار الذي لا فيديو له يحصل على مرفق فيديو فارغ.

### مُبلِّغ HTML

انتقل `wdio-html-nice-reporter` إلى مستودع WebdriverIO باسم [`@wdio/html-reporter`](/docs/html-reporter). الحزمة القديمة مخصصة لـ v9 فقط.

```sh
npm uninstall wdio-html-nice-reporter
npm install @wdio/html-reporter --save-dev
```

اسم المُبلِّغ هو `html`. غيّر الاسم في `reporters` وفي الاستيرادات:

```diff
- import { ReportAggregator } from 'wdio-html-nice-reporter'
+ import { ReportAggregator } from '@wdio/html-reporter'

  reporters: [
-     ['html-nice', { outputDir: './reports/html-reports/' }]
+     ['html', { outputDir: './reports/html-reports/' }]
  ]
```

الخيارات هي نفسها. غيّر أيضًا ما يلي:

- يأتي `ReportEvents` من `@wdio/html-reporter`. تعمل الاختبارات التي لا تزال تستخدم `@rpii/wdio-report-events`، لأن كلتيهما ترسلان الأحداث نفسها.
- سكربت سطر الأوامر هو `node_modules/@wdio/html-reporter/build/makeReport.js`. كان `node_modules/wdio-html-nice-reporter/lib/makeReport.js`.
- مع Cucumber، يعدّ التقرير السيناريوهات، لا الخطوات، ولا يعدّ إلا المحاولة الأخيرة للسيناريو المُعاد تشغيله.

## `$` صارم

يمثّل `$` الآن عنصرًا واحدًا __بالضبط__. إذا أشار المحدِّد إلى أكثر من عنصر، يُطلق الأمر `StrictSelectorError` بدلًا من استخدام أول تطابق بصمت:

```js
// v9 — ينقر على الزر الأول، حتى لو كان هناك 12 زرًا
await $('button').click()

// v10
await $('button').click()
// StrictSelectorError: strict mode violation: `$("button")` resolved to 12 elements, expected 1.
// Use `$$("button")` to work with all matches, `$$("button")[0]` if you explicitly want the first one,
// or narrow down the selector so it matches a single element.
```

يتوافق هذا مع [محدِّدات Playwright](https://playwright.dev/docs/locators#strictness). يختلف Cypress: فاستعلاماته قد تشير إلى عدة عناصر، وأوامر الإجراءات مثل [`.click()`](https://docs.cypress.io/api/commands/click#Click-all-elements-with-id-starting-with-btn) هي التي ترفض افتراضيًا موضوعًا متعدد العناصر. المحدِّد الذي يشير بصمت إلى عدة عناصر هو في الغالب خلل كامن: ينجح اليوم ثم يتفاعل مع العنصر الخطأ بمجرد أن يضيف أحدهم زرًا ثانيًا إلى الصفحة.

تنطبق القاعدة على كل خطوة من خطوات السلسلة (`$('form').$('input')`) وعلى كل نوع من أنواع المحدِّدات التي يقبلها `$` — المحدِّدات النصية (بما في ذلك تلك التي تخترق shadow DOM)، ودوال JS، ومحدِّدات الهاتف المحمول، ومراجع الاستراتيجيات المخصصة.

### ما الذي لم يتغير

- لا يزال `$$` يُعيد صفرًا أو أكثر من العناصر.
- الأوامر المساعدة المخصصة `custom$` و`shadow$` و`react$` ليست صارمة — فهي لا تزال تُعيد أول تطابق لها، وكذلك نظيراتها من `$$`.
- لا يزال المحدِّد الذي لا يطابق أي شيء يُعيد عنصرًا يُحَل بشكل كسول، لذا يتصرف `waitForExist` و[الانتظار التلقائي](/docs/autowait) كما في السابق.
- تمرير مرجع عنصر، مثل `$(await browser.getActiveElement())`، يشير دائمًا إلى عقدة واحدة ولا يُفحص أبدًا.

### كيفية تدقيق مجموعة اختباراتك

لا يوجد codemod لهذا: أنت وحدك من يستطيع تحديد ما إذا كان التطابق الثاني خللًا أم مقصودًا. هناك نهجان عمليان:

1. __شغّل مجموعة اختباراتك.__ كل مخالفة تُطلق خطأً يتضمن المحدِّد وعدد التطابقات، وهذا عادةً كافٍ لإصلاحها فورًا.
2. __افحص المحدِّدات الواسعة مسبقًا.__ لكل `$(...)` عام في كائنات الصفحات لديك، اطبع عدد العناصر التي يطابقها فعلًا:

   ```js
   console.log(await $$('button').length) // 12 → `$('button')` واسع جدًا
   ```

ثم إما أن تضيّق المحدِّد — ويُفضَّل أن يكون نحو استعلام موجّه للمستخدم مثل `$('button=Submit')` أو `$('aria/Submit')`، راجع [المحدِّدات](/docs/selectors) — أو أن تصرّح بوضوح بأنك تريد التطابق الأول:

```js
await $('button[type="submit"]').click()
// ...أو، إن كان الأول هو ما تقصده حقًا
await $$('button')[0].click()
```

### إلغاء الاشتراك

لاستعلام واحد:

```js
await $('button', { strict: false }).click()
```

لمشروع كامل، لاستعادة سلوك v9:

```js title="wdio.conf.js"
export const config = {
    // ...
    strictSelectors: false
}
```

يتذكر العنصر كيفية الاستعلام عنه، لذا فإن إعادة جلبه — بعد مرجع عنصر قديم، أو عبر `waitForExist` — تحتفظ بصرامة الاستدعاء الأصلي.

:::info

في الخلفية، يُرسل `$` الصارم طلب `findElements` بدلًا من `findElement`، إذ إن عدّ التطابقات هو الطريقة الوحيدة لفرض القاعدة. هي رحلة ذهاب وإياب واحدة في كلتا الحالتين، لكنها مرئية للخدمات المخصصة ونماذج WebDriver الوهمية (mocks) التي تعتمد على الأمر `findElement`.

:::

## قوائم العناصر قبل `await`

منذ v10، يُعيد `$$()` [`ElementArray`](/docs/api/browser/$$): مصفوفة حقيقية يمكنك استخدام `await` معها. في v9، كان `$$()` غير المنتظَر promise.

| `$$('li')` قبل `await` | v9 | v10 |
| --- | --- | --- |
| `instanceof Promise` | `true` | `false` |
| `Array.isArray()` | `false` | `true` |
| `then`، `catch`، `finally` | دوال | دوال، إلى أن تُحمَّل القائمة |

إلى أن تُحمَّل القائمة، يكون `length` عبارة عن promise، وتُطلق `[...list]` و`Array.from(list)` و`for...of` الخطأ `Cannot synchronously iterate over an element list that has not resolved yet`.

ينطبق الأمر نفسه على `custom$$` و`shadow$$` و`react$$`، وعلى `$$()` على متصفح multi-remote. أما `$()` غير المنتظَر فلا يزال promise.

يعطي `await` القائمة نفسها، محمَّلة ودون `then`. عندها يكون `length` رقمًا، وتعمل `for...of` و`[...list]` و`Array.from()`. قبل `await`، يمكنك استخدام `for await`، أو فهرس (`$$('li')[0]`)، أو `at()`، أو `slice()`، أو دوال التكرار غير المتزامنة (`map`، `filter`، `forEach`، ...). تعطي هذه الدوال promise: استخدم `await` مع نتيجة `filter()` قبل أن تقرأ فهرسًا.

الفهرس الذي يتجاوز نهاية قائمة `$$(selector)` ليس `undefined`، حتى بعد `await`. بل هو عنصر ينتظر أن تصل القائمة إلى ذلك الفهرس، كما يفعل `$$('li')[5]` قبل `await`: يعطي `isExisting()` القيمة `false` ويُطلق أمر مثل `getText()` الخطأ `Index out of bounds`، وكلاهما بعد `waitforTimeout`. في v9، كان `(await $$('li'))[5]` هو `undefined`. لذا فإن `if (list[5])` صحيح دائمًا، و`list.at(5)` ليس `undefined` أبدًا. قارن الفهرس بـ `length`، الذي لا ينتظر:

```diff
  const list = await $$('li')
- if (list[5]) {
+ if (list.length > 5) {
```

بعد `await`، يعطي الفهرس السالب، والقائمة الناتجة عن `slice()` أو `filter()`، القيمة `undefined` بعد النهاية. قبل `await`، يعطي `list[i]` مع فهرس صحيح يساوي 0 أو أكثر، و`at()`، promise، وهو دائمًا قيمة صادقة (truthy).

الشيفرة التي تنتظر قيمة فقط عندما تكون `Promise`، أو التي تقرأ `length` دون `await`، لا تُطلق خطأً. بل تقرأ promise على أنه الطول: يرى `list.length > 0` وحلقة مثل `for (let i = 0; i < list.length; i++)` القيمة `false`، لكن `if (list.length)` و`list.length !== 0` يريان `true`. استخدم `await` مع القيمة دائمًا. يعطي `await` على قيمة محمَّلة مسبقًا تلك القيمة نفسها:

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

كان v9 لا يزال يقبل الصيغ الموضعية القديمة مع تحذير. أما v10 فلا يقبل إلا كائن الخيارات.

يعيد [codemod](https://github.com/webdriverio/codemod) الخاص بـ v10 كتابة `addCommand` و`overwriteCommand` عندما يكون الوسيط الثالث قيمة منطقية، و`getHTML(true)` و`getHTML(false)`، و`getCookies` عندما يكون المرشّح سلسلة نصية أو مصفوفة من عنصر واحد. يُترك استدعاء `getCookies` الذي يتضمن أكثر من اسم دون تغيير، لأن المرشّح الواحد يطابق اسمًا واحدًا.

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

الوسيط الثالث المنطقي خطأ في TypeScript. ووقت التشغيل يُطلق:

```
Passing a boolean as the third argument to `addCommand` was removed in WebdriverIO v10. Use `addCommand(name, fn, { attachToElement: true })`.
```

ينتمي `proto` و`instances` إلى كائن الخيارات نفسه. احذف الوسيط الثالث لإلحاق أمر بالمتصفح.

### `getCookies`

تُرفض المرشّحات النصية ومصفوفات السلاسل النصية. مرّر [كائن مرشّح ملفات تعريف الارتباط](https://w3c.github.io/webdriver-bidi/#type-storage-CookieFilter). يرشّح الاستدعاء الواحد اسمًا واحدًا؛ استدعه مرة أخرى لاسم آخر.

```diff
- await browser.getCookies('session')
- await browser.getCookies(['session', 'auth'])
+ await browser.getCookies({ name: 'session' })
+ await browser.getCookies({ name: 'auth' })
```

لا يزال `getCookies()` دون وسائط يُعيد كل ملفات تعريف الارتباط المرئية للصفحة.

### `getHTML`

```diff
- await $('h1').getHTML(false)
+ await $('h1').getHTML({ includeSelectorTag: false })
```

لا يزال `getHTML()` دون وسائط يتضمن وسم العنصر نفسه.

### `newWindow`

أُزيل `windowName` و`windowFeatures`. كانا ينطبقان على WebDriver Classic فقط. لا يزال الأمر يقبل `type`:

```diff
- await browser.newWindow('https://webdriver.io', {
-     windowName: 'WebdriverIO window',
-     windowFeatures: 'width=420,height=230,resizable,scrollbars=yes,status=1',
- })
+ await browser.newWindow('https://webdriver.io', { type: 'window' })
```

استخدم `type: 'tab'` لفتح علامة تبويب.

في جلسة WebDriver BiDi، يُعيد `newWindow()` [سياق التصفح](/docs/api/browsingContext) الجديد ولا ينتقل إليه. في v9 كان ينتقل. وبالتالي فإن `browser.closeWindow()` بعد `newWindow()` يغلق الآن علامة التبويب الأولى، وليس الجديدة. شغّل أوامر علامة التبويب الجديدة على السياق الذي يُعيده `newWindow()`، وأغلقه باستخدام `closeWindow()` على ذلك السياق:

```diff
- await browser.newWindow('https://webdriver.io', { type: 'tab' })
- console.log(await browser.getTitle())
- await browser.closeWindow()
+ const tab = await browser.newWindow('https://webdriver.io', { type: 'tab' })
+ console.log(await tab.getTitle())
+ await tab.closeWindow()
```

في TypeScript، نوع النتيجة هو `WebdriverIO.BrowsingContext | { handle, type }`، لأن جلسة WebDriver Classic تُعيد مقبض النافذة. في جلسة BiDi، ضيّق النوع: `await browser.newWindow(url, { type: 'tab' }) as WebdriverIO.BrowsingContext`.

يبقى المتصفح على علامة التبويب الأولى. أزل استدعاء `switchWindow()` الذي كان يعود إليها: إذ يُطلق `switchWindow` خطأً في جلسة BiDi. راجع [`switchToFrame`](#switchtoframe) لنموذج سياق التصفح.

### `startActivity`

لا يُقبل إلا كائن الخيارات. أُزيلت `appWaitPackage` و`appWaitActivity` و`optionalIntentArguments`. كانت تنطبق فقط على نقطة نهاية HTTP الخاصة بـ Appium التي أُزيلت. لا يقبلها `mobile: startActivity`، وتمريرها يُطلق خطأً.

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

## الأوامر المُزالة

أُزيل `browser.throttle` وأوامر `touchAction` المُهمَلة.

| v9 | v10 |
| --- | --- |
| `browser.throttle('Regular3G')` | [`browser.throttleNetwork('Regular3G')`](/docs/api/browser/throttleNetwork) |
| `browser.touchAction(...)` / `element.touchAction(...)` | [واجهة Actions](/docs/api/browser/action) مع مؤشر لمس، أو أوامر الهاتف المحمول [`tap`](/docs/api/mobile/tap) و[`swipe`](/docs/api/mobile/swipe) |

إيماءة لمس باستخدام واجهة Actions:

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

يحتاج `setFiles` إلى جلسة BiDi. يفتح المتصفح المسارات. يُحَل المسار النسبي بالنسبة إلى `process.cwd()`. تجهيز الملفات في Selenium Grid ليس جزءًا من v10. يجب على مجموعة الاختبارات التي كانت تعتمد على `uploadFile` لدفع البايتات إلى عقدة ما أن تضع الملف في مكان يستطيع المتصفح قراءته منه، ثم تستدعي `setFiles`.

في جلسة classic محلية، لا يزال `element.setValue('/local/path')` يكتب مسارًا يستطيع المتصفح المحلي رؤيته بالفعل. وتبقى نقطة نهاية Selenium الخام `browser.file()` لمستخدمي Grid الذين يستدعونها مباشرة.

## `executeAsync`

أُزيل `browser.executeAsync` و`element.executeAsync`. مرّر دالة `async` إلى [`execute`](/docs/api/browser/execute). القيمة المُعادة من الدالة، بما في ذلك promise المُعاد، هي نتيجة الأمر. لا تزال مهلة `script` سارية، حتى في جلسة WebDriver BiDi: يفشل السكربت الذي يعمل لمدة أطول بخطأ `script timeout`. لمهلة `script` أطول من [`bidiResponseTimeout`](/docs/configuration#bidiresponsetimeout) (180 ثانية افتراضيًا)، زِد كلتيهما.

```ts
const result = await browser.execute(async (a, b) => {
    await new Promise((resolve) => setTimeout(resolve, 1000))
    return a + b
}, 1, 2)
```

تخلَّ عن دالة الاستدعاء `done` الخاصة بـ WebDriver. يجب على السكربت النصي الذي كان يتوقع دالة الاستدعاء تلك كوسيط أخير أن يُعيد promise بدلًا من ذلك. ووقت التشغيل، `executeAsync` ليست دالة.

## `switchToFrame`

لم يعد `browser.switchToFrame` أمرًا عامًا.

في جلسة WebDriver BiDi، يُطلق `switchFrame` و`switchWindow` خطأً. علامة التبويب والنافذة والإطار هي `WebdriverIO.BrowsingContext` تحتفظ به. يتنقّل `browser.url()` في السياق العلوي الأولي للجلسة ويُعيده. ويُعيد `browser.newWindow()` السياق الجديد ولا ينتقل إليه. ويُعيد `context.frame()` إطارًا فرعيًا. و`context.parent` هو الإطار الذي فتحته منه.

```ts
const page = await browser.url('https://example.com')
const other = await browser.newWindow('https://webdriver.io', { type: 'tab' })
console.log(await page.getTitle())
const frame = await page.frame('iframe')
console.log(await frame.$('h1').getText())
const pages = await browser.browsingContexts()
```

`context.url` هو سلسلة عنوان URL للمستند. تنقّل في سياق محتفَظ به باستخدام `context.navigate(url)`. بيانات التحميل الوصفية من `browser.url()` هي `context.request`.

في جلسة Classic، واصل استدعاء `switchFrame` مع عنصر، أو `null` للإطار العلوي. تُرفض هناك السلسلة النصية أو الدالة.

```diff
- await browser.switchToFrame(await $('iframe'))
- await browser.switchToFrame(null)
+ await browser.switchFrame($('iframe'))
+ await browser.switchFrame(null)
```

## `setTimeout`

يُرفض مفتاح JSON Wire Protocol المسمى `page load`. استخدم `pageLoad`.

```diff
- await browser.setTimeout({ 'page load': 10000 })
+ await browser.setTimeout({ pageLoad: 10000 })
```

لم يتغير `implicit` و`script`.

## الوصول إلى نسخ Multi-remote

لم يعد متصفح multi-remote يخزّن كل جلسة كخاصية مستقلة. وينطبق الأمر نفسه على عنصر multi-remote. `getInstance` و`select` هما وسيلتك لمخاطبة جلسة واحدة.

```diff
- await browser.myChromeBrowser.url('https://webdriver.io')
- await (await browser.$('button')).myChromeBrowser.click()
+ await browser.getInstance('myChromeBrowser').url('https://webdriver.io')
+ await (await browser.$('button')).getInstance('myChromeBrowser').click()
```

توسيع TypeScript الذي يضيف `myChromeBrowser: WebdriverIO.Browser` إلى `WebdriverIO.MultiRemoteBrowser` لم يعد يطابق خاصية وقت التشغيل. احذف ذلك التوسيع واستدعِ `getInstance`.

مع مشغّل الاختبارات وإبقاء `injectGlobals` مفعّلًا، لا يزال اسم النسخة متغيرًا عامًا (`myChromeBrowser.url(...)`). ذلك المتغير العام هو الجلسة المنفردة. وليس `browser.myChromeBrowser`.

تبقى نتائج الأوامر بترتيب الـ capabilities: الإدخال الأول يعود إلى المفتاح الأول في كائن الـ capabilities.

يُعيد `browser.$$()` على متصفح multi-remote القيمة `WebdriverIO.MultiRemoteElementArray`، وليس `MultiRemoteElement[]` عادية. لا تزال مصفوفة، لذا تستمر قراءة الفهرس مثل `elements[0]` في العمل.

دوالها `map` و`filter` و`forEach` و`find` و`findIndex` و`some` و`every` و`reduce` غير متزامنة، كما في `WebdriverIO.ElementArray`، وتُعيد promise، حتى بعد `await`. وينطبق الأمر نفسه على القوائم التي تُعيدها `custom$$()` و`react$$()` و`shadow$$()`. في v9 كانت هذه هي الدوال المتزامنة لمصفوفة عادية:

```diff
  const items = await browser.$$('li')
- const ids = items.map((item) => item.selector)
+ const ids = await items.map((item) => item.selector)
```

تُعيد `custom$()` و`react$()`، وعلى عنصر، `shadow$()` و`nextElement()` و`previousElement()` و`parentElement()`، قيمة `WebdriverIO.MultiRemoteElement` واحدة، كما يفعل `$()`. في v9 كانت تُعيد عنصرًا واحدًا لكل نسخة في مصفوفة عادية. اقرأ عنصر متصفح واحد باستخدام `getInstance`:

```diff
- const [chromeHost, firefoxHost] = await browser.custom$('byTestId', 'host')
- await chromeHost.click()
+ const host = await browser.custom$('byTestId', 'host')
+ await host.getInstance('myChromeBrowser').click()
```

تُعيد `custom$$()` و`react$$()`، وعلى عنصر، `shadow$$()`، قيمة `WebdriverIO.MultiRemoteElementArray` واحدة، كما يفعل `$$()`. في v9 كانت تُعيد قائمة واحدة لكل نسخة في مصفوفة عادية. كل إدخال يخاطب كل النسخ. النسخة التي تعثر على عناصر أقل ليس لها عنصر عند ذلك الفهرس:

```diff
- const [chromeItems, firefoxItems] = await browser.custom$$('byTestId', 'item')
- await chromeItems[0].click()
+ const items = await browser.custom$$('byTestId', 'item')
+ await items[0].getInstance('myChromeBrowser').click()
```

أصبح لـ `WebdriverIO.MultiRemoteElement['selector']` النوع `Selector`، كما لـ `WebdriverIO.Element['selector']`. في v9 كان له النوع `string`، لكن القيمة قد تكون أيضًا دالة أو مرجع استراتيجية مخصصة. يجب على شيفرة TypeScript التي تستخدمها كسلسلة نصية، مثل `element.selector.includes('…')`، أن تتحقق من النوع أولًا.

أُزيل `WDIO_ENABLE_MULTI_REMOTE_SELECT` و`WDIO_ENABLE_MULTI_REMOTE_ELEMENT_ARRAY`. أصبح `select()` متاحًا دائمًا، ويُعيد `$$()` دائمًا مصفوفة العناصر المذكورة أعلاه. احذف كلا المتغيرين.

## الاستجابات الثنائية الوهمية

يقبل `mock.respond()` و`mock.respondOnce()` حمولات `Uint8Array` و`ArrayBuffer`، بما في ذلك `Buffer` مُكمَّل (polyfilled) في اختبارات المكوّنات التي لا تحتوي على `Buffer` عام.

أصبح نوع `mock.getBinaryResponse()` الآن `Uint8Array | null`. لا يزال يُعيد `Buffer` في Node.js، لكنه يُعيد `Uint8Array` في المتصفح. لاستخدام الدوال الخاصة بـ Buffer في Node.js، حوّل النتيجة غير الفارغة أولًا:

```diff
- const base64 = mock.getBinaryResponse(requestId)?.toString('base64')
+ const bytes = mock.getBinaryResponse(requestId)
+ const base64 = bytes === null ? undefined : Buffer.from(bytes).toString('base64')
```

## نماذج الشبكة الوهمية في Multi-remote

يُعيد `browser.mock()` على متصفح multi-remote القيمة `WebdriverIO.MultiRemoteMock`، وليس مصفوفة من النماذج الوهمية. تعمل `respond` و`restore` ودوال النموذج الوهمي الأخرى على كل نسخة. اقرأ الطلبات الملتقطة من النموذج الوهمي لمتصفح واحد. استخدم النوع `WebdriverIO.MultiRemoteMock` من مساحة الأسماء العامة `WebdriverIO`.

```diff
- const [chromeMock, firefoxMock] = await browser.mock('*/api')
- expect(chromeMock.calls).toHaveLength(1)
+ const mock = await browser.mock('*/api')
+ mock.respond({ ok: true })
+ expect(mock.getInstance('myChromeBrowser').calls).toHaveLength(1)
+ expect(mock.instances).toEqual(['myChromeBrowser', 'myFirefoxBrowser'])
```

يُطلق `getInstance` الخطأ `Multi-remote object has no instance named "<name>"` عندما لا يكون الاسم ضمن `instances`. النموذج الوهمي الناتج عن `browser.select('myFirefoxBrowser', 'myChromeBrowser')` يسرد تلك النسخ بذلك الترتيب، والذي قد يختلف عن `browser.instances`. لا تفترض أن `mocks[0]` متصفح بعينه.

## الاستجابات الوهمية التي تتخطى الخادم الخلفي

لا يستدعي `mock.respond(..., { fetchResponse: false })` الخادم الخلفي. في v9، كان النموذج الوهمي الذي يرشّح أيضًا حسب `statusCode` أو `responseHeaders` يتجاهل ذلك المرشّح ويستمر في الرد على كل طلب مطابق. في v10، يُطلق `respond()` و`respondOnce()` خطأً، لأن تلك المرشّحات لا يمكن الحكم عليها إلا من استجابة الخادم الخلفي.

```diff
- const mock = await browser.mock('**/users', { statusCode: 200 })
- mock.respond({ name: 'Ada' }, { fetchResponse: false })
+ const mock = await browser.mock('**/users')
+ mock.respond({ name: 'Ada' }, { fetchResponse: false })
```

للاحتفاظ بالمرشّح، احذف `fetchResponse` حتى يجلب النموذج الوهمي الاستجابة، ويتحقق من الحالة أو الترويسات، ثم يستبدل المحتوى.

## مراجع العناصر

تستخدم معرّفات العناصر مفتاح W3C WebDriver المسمى `element-6066-11e4-a52e-4f735466cecf` والخاصية `elementId`. لم يعد الحقل `ELEMENT` الخاص بـ JSON Wire Protocol جزءًا من عقد العنصر.

لم يعد `WebdriverIO.Element` يُعلن `ELEMENT`. اقرأ `element.elementId`، الذي تكشفه نسخ العناصر بالفعل.

يمرّر `browser.execute`، والسكربتات المدمجة التي ترسل عنصرًا إلى الصفحة (`getHTML` و`isClickable` و`isDisplayed` و`scrollIntoView` وغيرها)، مرجع W3C فقط:

```diff
- await browser.execute((el) => el.ELEMENT, elem)
+ await browser.execute(
+     (el) => el['element-6066-11e4-a52e-4f735466cecf'],
+     elem
+ )
```

محتوى استجابة find-element الذي لا يحتوي إلا على `{ ELEMENT: '...' }` ليس عنصرًا. أدرج مفتاح W3C. إذا كان كلا المفتاحين موجودين، يستخدم WebdriverIO معرّف W3C.

يطبع Jasmine نتيجة `$()` المتسلسلة عبر `toJSON`. تلك القيمة هي مرجع W3C نفسه، `{ 'element-6066-11e4-a52e-4f735466cecf': elementId }`.

مع WebDriver BiDi، أصبح السكربت الذي يُعيد `NodeList` (مثلًا من `querySelectorAll`) أو `HTMLCollection` (مثلًا `element.children`) يعطي الآن قائمة من مراجع العناصر، كما يفعل WebDriver Classic. في v9 كان يعطي قيم BiDi خامًا، لذا كان `browser.execute` يُعيد كائنات ليست عناصر، ولم تكن استراتيجية `custom$` أو `custom$$` التي تُعيد `querySelectorAll(...)` تعثر على أي عنصر. لا يزال حل التفافي مثل `Array.from(document.querySelectorAll(...))` يعمل، ويمكنك إزالته:

```diff
  browser.addLocatorStrategy('byCss', (selector) =>
-     Array.from(document.querySelectorAll(selector))
+     document.querySelectorAll(selector)
  )
```

## محدِّدات React

يعمل `react$` و`react$$` الآن مع React من 16 إلى 19، للتطبيق الذي يبدأ بـ `createRoot` أو بـ `ReactDOM.render`. في السابق، كان `browser.react$` و`browser.react$$` يفشلان مع React 18 وما بعده (`Could not find the root element of your application`)، وفي كل الإصدارات كان من الممكن أن تأتي النتيجة من العرض الذي سبق التحديث الأخير، لذا لم يكن المكوّن الذي أضافه تغيير في الحالة يُعثَر عليه.

على صفحة لم يعرض فيها React جذرًا بعد، تنتظر الأوامر الآن حتى 5 ثوانٍ قبل أن تفشل. في السابق، كانت تفشل فورًا، لذا لم يكن التطبيق الذي يبدأ متأخرًا يُعثَر عليه.

لم تعد الأوامر تستخدم مكتبة [resq](https://github.com/baruchvlz/resq)، ولم يعد WebdriverIO يثبّتها. لا تتغير قواعد المحدِّدات (راجع [محدِّدات React](/docs/selectors#react-selectors))، مع هذه الاستثناءات:

- يعثر `react$` مع `props` و`state` معًا على مكوّن يطابق كليهما. في السابق، كان يتجاهل `props` عند إعطاء `state` أيضًا.
- يعطي `react$$` كل عقدة DOM مرة واحدة. في السابق، كان المكوّن عالي الرتبة وابنه يعطيان العنصر نفسه مرتين في بعض المتصفحات.
- يعطي fragment يحتوي على fragment قائمة مسطحة واحدة من العقد. في السابق، كان `react$` قد يُعيد قائمة.
- يعمل المرشّح الذي يحتوي على قيمة `null`. في السابق، كان يفشل برسالة `Cannot convert undefined or null to object`.
- دون نطاق عنصر، تبحث الأوامر في جميع جذور React في الصفحة، بترتيب المستند، بما في ذلك الجذور داخل جذور أخرى والجذور داخل shadow roots المفتوحة. يعطي `react$` أول تطابق. في السابق، كانت تبحث في الجذر الأول فقط، حتى لو لم يكن React قد عرضه بعد أو كان قد أزاله، ولم تكن تبحث في shadow roots. على صفحة تحتوي على أكثر من جذر، قد يعطي `react$$` الآن عناصر أكثر: للبحث في جذر واحد فقط، استدعِ الأمر على حاويته، مثل `$('#root').react$$('MyComponent')`.
- على حاوية جذر داخل جذر آخر، تبحث الأوامر في الجذر الداخلي. في السابق، كانت تبحث في الجذر الخارجي.
- على سياق التصفح لإطار، وعلى عنصر من إطار، تعمل الأوامر. في السابق، كان أمر السياق يفشل برسالة `this.executeScript is not a function`، وكان أمر العنصر يفشل برسالة `Could not find instance of React in given element`.

أُزيل السكربت الداخلي `webdriverio/scripts/resq`.

## اختبار المكوّنات

يعيد `@wdio/browser-runner` تصدير `fn` و`spyOn` وأنواع النماذج الوهمية من `@vitest/spy` 5 (سابقًا 3). النموذج الوهمي الذي تستدعيه شيفرتك مع `new` يحتاج إلى تنفيذ من نوع `function` أو `class`. تُطلق الدالة السهمية الخطأ `is not a constructor`، ويُطلق `mockReturnValue` خطأً عندما يُستدعى النموذج الوهمي مع `new`.

```diff
- const Client = fn(() => ({ close: fn() }))
+ const Client = fn(function () { return { close: fn() } })
```

لتغييرات spy الأخرى، راجع [دليل الترحيل الخاص بـ Vitest](https://vitest.dev/guide/migration).

## Puppeteer

يقبل `webdriverio` الحزمة `puppeteer-core` بالنطاق `>=24 <26`، بما في ذلك Puppeteer 25. يُختبَر `getPuppeteer()` و`@wdio/lighthouse-service` على هذا الخط.

## ESLint

يتطلب `eslint-plugin-wdio` الإصدار ESLint 10. وصل ESLint 9 إلى [نهاية دعمه](https://eslint.org/version-support/) في 2026-08-06 ولم يعد مدعومًا. مع TypeScript، استخدم `typescript-eslint` 8.56.0 أو أحدث.

```sh
npm install --save-dev eslint@10 eslint-plugin-wdio
```

يُصدّر `eslint-plugin-wdio` فقط الإعداد المسطح `flat/recommended`. أُزيل اسم eslintrc المسمى `plugin:wdio/recommended`.

```js
import { configs as wdioConfig } from 'eslint-plugin-wdio'

export default [
    wdioConfig['flat/recommended'],
]
```

ينتقل الإعداد الموصى به إلى القاعدة `wdio/no-floating-promise` المدركة للأنواع، بدلًا من `wdio/await-expect`، عندما تكون حزمة `typescript-eslint` مثبّتة. لا يكفي تثبيت `@typescript-eslint/eslint-plugin` وحده.

```sh
npm install --save-dev typescript typescript-eslint
```

في هذا الوضع، يحلّل الإعداد كل ملف يطابقه باستخدام خدمة مشروع TypeScript. اقصره على ملفات TypeScript، وتأكد من أنها جزء من ملف `tsconfig.json`:

```js
import { configs as wdioConfig } from 'eslint-plugin-wdio'

export default [
    { files: ['**/*.{ts,mts,cts,tsx}'], ...wdioConfig['flat/recommended'] },
]
```

يفشل ملف JavaScript مطابق ليس ضمن مشروع TypeScript، مثل `wdio.conf.js`، برسالة "was not found by the project service". لفحص ملفات JavaScript أيضًا، اضبط `"allowJs": true`، وأضفها إلى `include` في `tsconfig.json`، ووسّع النمط إلى `**/*.{js,mjs,cjs,ts,mts,cts,tsx}`.

## الأطر المخصصة

لم يعد `setupExpect` على محوّل إطار مخصص يقبل `Map` من المطابِقات، ولم يعد المشغّل يضيف دالة `entries` إلى كائن المطابِقات. كرّر باستخدام `Object.entries(wdioMatchers)`.

## ملف تعريف Firefox

لم يعد `@wdio/firefox-profile-service` يعامل `legacy` كخيار للخدمة. كانت تلك الراية تنطبق فقط على Firefox 55 وما قبله. احذفها. يُكتب `legacy: true` المتبقي في ملف التعريف كتفضيل باسم `legacy`.

## بروتوكول WebDriver

كل جلسة هي جلسة [W3C WebDriver](https://w3c.github.io/webdriver/). لا يتحدث WebdriverIO بروتوكول JSON Wire Protocol ولا Mobile JSON Wire Protocol. أزال v9 تلك الأوامر. ويتخلى v10 أيضًا عن غلاف الاستجابة الذي كانت تلك البروتوكولات تستخدمه، لذا لا يستطيع الخادم الذي لا يزال يُعيده بدء جلسة.

أُزيل `browser.isW3C`، بما في ذلك القيمة التي كانت تُمرَّر سابقًا في رسالة العامل `sessionStarted`. يُتجاهَل تمرير `isW3C` إلى `attach`. تبقى مجموعة أوامر BiDi على العميل. ولا يزال اتصال BiDi الحي يعتمد على `webSocketUrl`.

### `browser.back()` و`browser.forward()` على BiDi

تبقى مواضع الاستدعاء `await browser.back()` و`await browser.forward()`. لا يأخذ أي من الأمرين وسيطًا ولا يُعيد قيمة.

في جلسة BiDi، يستدعي هذان الأمران `browsingContext.traverseHistory` مع `delta` بقيمة `-1` أو `1` على سياق التصفح العلوي، ثم ينتظران جاهزية المستند التي يقابلها `pageLoadStrategy`. تعود `none` عند قبول أمر التنقل. وتنتظر `eager` الحدث `browsingContext.domContentLoaded`. وتنتظر `normal`، وهي الافتراضية، الحدث `browsingContext.load`. لا تُطلق استعادة back-forward cache تلك الأحداث؛ إذ يعود الأمر عندما تكون `readyState` للمستند المعتمَد مطابقة للاستراتيجية بالفعل. يستخدم الانتظار مهلة تحميل الصفحة للجلسة (`timeouts.pageLoad`، و300000 ms عند عدم ضبطها). لا تزال جلسات Classic ترسل إلى `POST /session/:sessionId/back` و`POST /session/:sessionId/forward`.

لا يزال إدخال السجل المفقود يؤدي إلى الرفض. على BiDi تأتي الرسالة من `browsingContext.traverseHistory` وتحتوي على `no such history entry`، بدلًا من نص خطأ WebDriver الكلاسيكي. التنقل الذي لا يصل أبدًا إلى الجاهزية المتوقعة يُرفض برسالة `History traversal timed out after <ms>ms waiting for browsingContext.domContentLoaded` أو `browsingContext.load`.

### استجابة الجلسة الجديدة

يجب أن يُعيد Create Session محتوى W3C. يقرأ WebdriverIO القيمتين `value.sessionId` و`value.capabilities`:

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

يُرفض محتوى JSON Wire Protocol. يضع ذلك المحتوى `sessionId` و`status` بجانب `value`، ويضع الـ capabilities داخل `value` نفسها:

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

عندها يُطلق إنشاء الجلسة الخطأ `WebDriver new session response is missing a session id or capabilities. WebdriverIO requires a W3C WebDriver server.` ويُطلق الخطأ نفسه عندما تكون `value.capabilities` مفقودة، حتى لو كانت `value.sessionId` موجودة.

لا يزال كائن capability المسطح في إعداداتك صالحًا. يغلّف WebdriverIO القيمة `{ browserName: 'chrome' }` داخل `alwaysMatch` قبل أن يرسل الطلب. لا تزال المفاتيح ذات بادئة المورّد الممزوجة بمفاتيح من خارج مجموعة W3C capabilities مرفوضة. ضع إعدادات المورّد في `sauce:options` أو `bstack:options` أو `appium:options` أو أي مفتاح آخر ذي بادئة.

### استجابات الأوامر

نتيجة الأمر هي `{ "value": … }`. يعني HTTP 200 دون `error` في `value` النجاح. العنصر المفقود هو HTTP 404 مع ضبط `value.error` على `"no such element"`، وهو ما لا يزال يسمح بالبحث الكسول عن العنصر. يُتجاهَل `status` الرقمي في المحتوى، بما في ذلك `status: 0` والرمز القديم `status: 7` ("no such element"). أرسل كائن خطأ W3C بدلًا من ذلك.

أصبح نوع الخطأ المُصدَّر `JSONWPCommandError` الآن `SessionRequestError`.

### الخوادم

المشغّلات التي يعمل WebdriverIO معها تتحدث W3C بالفعل على اتصال العميل:

- ChromeDriver يعمل بـ W3C افتراضيًا منذ Chrome 75. ويطابقه Edge المبني على Chromium. لا يزال ChromeDriver الحالي يقبل `goog:chromeOptions.w3c: false`، الذي يعيد تلك الجلسة الواحدة إلى البروتوكول القديم. لا يدعم WebdriverIO هذا التبديل.
- geckodriver وsafaridriver من Apple يعملان بـ W3C فقط. واستجابة Safari التي تحذف `platformName` أو `browserVersion` لا تزال W3C.
- يتحدث Selenium 4 وGrid 4 بروتوكول W3C. وتوقف Grid عن ترجمة JSON Wire Protocol في 4.9.
- تخلى Appium 2 عن JSON Wire Protocol وMobile JSON Wire Protocol. وتخلى Appium 3 أيضًا عن أشكال المعاملات المتبقية. يتطلب v10 الإصدار Appium 3، كما هو موضح أدناه. جلسة الهاتف المحمول التي تحذف `setWindowRect` لا تزال W3C؛ إذ تعني تلك الـ capability أن الجهاز لا يستطيع تغيير حجم النافذة.

هذه الخوادم لا تزال تتحدث JSON Wire Protocol وليست مدعومة: Selenium 3 وPhantomJS وEdgeHTML (`--jwp`) وWinAppDriver عند الاتصال به مباشرة. يبقى مشغّل Appium Windows مدعومًا كعميل W3C. فهو يترجم الأوامر إلى WinAppDriver، بما في ذلك ترجمة Get Element Property إلى نقطة نهاية الـ attribute. وجّه WebdriverIO إلى Appium، وليس إلى منفذ WinAppDriver.

لا تجعل [`@wdio/jsonwp-service`](https://www.npmjs.com/package/@wdio/jsonwp-service) تلك الخوادم تعمل مع v10. لا يزال بدء الجلسة يتطلب محتوى W3C المذكور أعلاه، ولا تزال نتائج الأوامر تتجاهل `status` الرقمي. ابقَ على WebdriverIO 9 إذا كان ذلك الخادم لا يزال مطلوبًا.

لم يعد `webdriver.remote.sessionid` يحدّد جلسة Selenium مستقلة. ولا يزال Selenium Grid 4 يُكتشَف من `se:cdp`.

مفتاح المهلة `page load` مشروح تحت [`setTimeout`](#settimeout). ومعرّفات العناصر مشروحة تحت [مراجع العناصر](#element-references). على سطح المكتب، `[name="..."]` محدِّد CSS. وتبقى استراتيجية المحدِّد `name` لجلسات الهاتف المحمول.

## Appium

يتطلب WebdriverIO 10 الإصدار **Appium 3** والمشغّلات الرسمية الحالية (UiAutomator2 وXCUITest وEspresso وWindows وMac2 وغيرها). Appium 1.x و2.x غير مدعومين. ابقَ على WebdriverIO 9 إذا لم تستطع ترقية الخادم.

```sh
npm i -D appium@^3
appium driver update installed
```

يُعلن `@wdio/appium-service` اعتمادية نظيرة اختيارية `appium` بالنطاق `>=3` ويرفض تشغيل خادم أقدم. يثبّت `create-wdio` الحزمة `appium@^3` عندما يكون Appium مفقودًا أو أقدم من 3.

يحتاج مزوّدو الخدمات السحابية الذين لا يزالون يوفّرون Appium 2 إلى صورة Appium 3، وإلا فعليك البقاء على WebdriverIO 9.

### لم تعد أوامر الهاتف المحمول ترجع إلى HTTP

في v9، كانت كثير من الأدوات المساعدة للهاتف المحمول تجرّب `browser.execute('mobile: …')`، وعند حدوث خطأ دالة غير معروفة، ترجع إلى نقطة نهاية HTTP في Appium تمت إزالتها. في v10 أُزيل هذا الرجوع: إذ يخبرك الخطأ نفسه بالترقية إلى Appium 3. فضّل أوامر الهاتف المحمول في WebdriverIO (`browser.lock()`، `browser.shake()`، …) أو `browser.execute('mobile: …')` مباشرة.

### أوامر البروتوكول المُزالة

[أزال Appium 3 كثيرًا من نقاط نهاية base-driver المُهمَلة](https://appium.io/docs/en/latest/guides/migrating-2-to-3/). لم يعد WebdriverIO يوفّر دوال عميل لمعظم تلك المسارات (مثل `appiumLock` و`touchPerform` وخريطة Mobile JSON Wire Protocol). استخدم W3C Actions، أو أمر الهاتف المحمول المقابل، أو دالة تنفيذ `mobile:` الخاصة بالمشغّل بدلًا من ذلك.

### نطاق `--allow-insecure` في Appium

يتطلب Appium 3 بادئة نطاق مشغّل أو `*` على ميزات `--allow-insecure`، مثل `uiautomator2:adb_shell` أو `*:adb_shell`.

### لم تعد capabilities الخاصة بـ Appium دون بادئة تختار جلسة Appium

لم تعد `automationName` و`deviceName` و`appiumVersion` دون البادئة `appium:` تخبر WebdriverIO بتخطي مشغّل المتصفح وإلحاق خدمة Appium. استخدم الـ capability ذات البادئة، أو ضعها داخل `appium:options`:

```diff
- capabilities: { platformName: 'Android', automationName: 'UiAutomator2', deviceName: 'emulator' }
+ capabilities: {
+     platformName: 'Android',
+     'appium:automationName': 'UiAutomator2',
+     'appium:deviceName': 'emulator'
+ }
```

أصبح `wdio repl` الآن يُصدر تلك المفاتيح ذات البادئة، بما في ذلك `appium:app` و`appium:platformVersion` و`appium:udid`.

### `getValue` على الهاتف المحمول يقرأ خاصية العنصر

يستدعي `element.getValue()` الأمر Get Element Property في كل جلسة، بما في ذلك Appium 3. في جلسة الهاتف المحمول كان يستدعي سابقًا Get Element Attribute.

### توحيد توقيع `stopRecordingScreen` مع `startRecordingScreen`

أصبح `driver.stopRecordingScreen` يقبل الآن وسيطًا واحدًا فقط هو `options`، بدلًا من الوسائط الأربعة السابقة، بما يتوافق مع `driver.startRecordingScreen`. انقل الوسائط الفردية إلى داخل كائن:

```diff
- driver.stopRecordingScreen('webdriver.io', undefined, undefined, 'POST')
+ driver.stopRecordingScreen({ remotePath: 'webdriver.io', method: 'POST' })
```

## تسمية Multi-remote

أصبحت الواجهات البرمجية المكتوبة بالصيغة `multiremote` أو `Multiremote` مكتوبة الآن بصيغة camelCase / PascalCase على شكل `multiRemote` / `MultiRemote`. لا توجد أسماء بديلة للأسماء القديمة.

| v9 | v10 |
|----|-----|
| `multiremote()` (`webdriverio`) | `multiRemote()` |
| `WebdriverIO.MultiremoteConfig` | `WebdriverIO.MultiRemoteConfig` |
| `isMultiremote` على المتصفح ونتائج `$` و`$$` | `isMultiRemote` |
| `Capabilities.RequestedMultiremoteCapabilities` | `Capabilities.RequestedMultiRemoteCapabilities` |
| `Capabilities.WithRequestedMultiremoteCapabilities` | `Capabilities.WithRequestedMultiRemoteCapabilities` |
| `runner.isMultiremote` (المُبلِّغون) | `runner.isMultiRemote` |
| `Launcher#isMultiremote`، `Launcher#isParallelMultiremote` (`@wdio/cli`) | `isMultiRemote`، `isParallelMultiRemote` |
| `isMultiremote` في `Workers.WorkerMessage` و`WorkerInstance` (`@wdio/local-runner`) و`SpecReporter#getTestLink()` | `isMultiRemote` |
| `browser.multiremoteFetch()` (`@wdio/webdriver-mock-service`) | `browser.multiRemoteFetch()` |

ابحث عن `multiremote` و`Multiremote` (مع مراعاة حالة الأحرف) واستبدل كل تطابق. كما تصنّف تقارير Allure اختبارات multi-remote بـ `isMultiRemote` بدلًا من `isMultiremote`.

## الشاشات الافتراضية على Linux

استُبدل `@wdio/xvfb` بـ `@wdio/display-server`. بدلًا من تغليف كل عامل داخل `xvfb-run`، يبدأ مشغّل الاختبارات خادم عرض واحدًا للتشغيل بأكمله، قبل الـ hook المسمى `onPrepare` لأي خدمة. يفضّل Weston في الوضع headless ويرجع إلى Xvfb. راجع [Headless وخوادم العرض](/docs/headless-and-display-servers) للتفاصيل.

أُعيدت تسمية الخيارات. لا تزال الأسماء القديمة تعمل في v10 لكنها تسجّل تحذير إهمال، وستُزال في v11. إذا ضبطت كلا الاسمين، يفوز الاسم الجديد:

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

ليس لـ `xvfbMaxRetries` و`xvfbRetryDelay` أي تأثير، وسيُزالان أيضًا في v11. لم يعد بدء التشغيل يُعاد: إذا فشل Weston في البدء، يجرّب مشغّل الاختبارات Xvfb، وإذا لم يبدأ أي منهما، يستمر التشغيل دون شاشة.

الإعداد الذي يضبط أحد الخيارات الأربعة المُعادة تسميتها دون بديله، ولا يضبط `displayServer`، يستمر في استخدام Xvfb كما في v9. وما لم يُعطّل خادم العرض، فإنه يسجّل أيضًا `Preferring Xvfb, as v9 did, because the config sets v9 display keys`. بمجرد إعادة تسمية الخيارات، أضف `displayServer: 'xvfb'` للإبقاء على Xvfb، أو احذفه لتفضيل Weston. في الوضع التلقائي، يعمل أمر التثبيت المخصص لـ Weston أولًا، ثم مرة أخرى لـ Xvfb فقط إذا ظل Weston غير متاح أو فشل في البدء وكان Xvfb لا يزال مفقودًا، لذا اضبط `displayServer` على الخادم الذي يثبّته الأمر لتخطي محاولة الخادم الآخر.

لم يعد التثبيت التلقائي يدعم `yum`، الذي كان v9 يستخدمه على المضيفات التي لا تحتوي على `dnf`. يكتشف v10 فقط `apt-get` و`dnf` و`zypper` و`pacman` و`apk` و`xbps-install`، لذا ثبّت Xvfb بنفسك على مضيف لا يحتوي إلا على `yum`.

كانت مصفوفة `xvfbAutoInstallCommand` تعمل عبر shell في v9، لذا كانت عناصر مثل `&&` أو `VAR=value` تعمل. أصبحت المصفوفات الآن تعمل دون shell تحت أي من اسمي الخيار، لذا استخدم سلسلة نصية لصيغة الـ shell.

تغييرات أخرى قد تلاحظها:

- تتشارك جميع العمال شاشة واحدة. في v9، كان لكل عامل شاشته الخاصة. قد تفتقر صفحات Chrome وEdge الآن إلى التركيز، راجع [تركيز النافذة](/docs/headless-and-display-servers#window-focus).
- رقم شاشة Xvfb ليس ثابتًا. اقرأه من `DISPLAY` بدلًا من افتراض `:99`.
- المضيف الذي لا يُضبط فيه إلا `WAYLAND_DISPLAY` يُعدّ الآن مضيفًا لديه شاشة. كان v9 يشغّل العمال تحت Xvfb هناك، لأن `DISPLAY` لم يكن مضبوطًا. لا يبدأ v10 شيئًا، ويفتح نوافذ المتصفح على الـ compositor الخاص بك، ويضبط `XDG_SESSION_TYPE` و`GDK_BACKEND` و`ELECTRON_OZONE_PLATFORM_HINT` على `wayland` طوال التشغيل. لتشغيلها تحت Xvfb كما في السابق، ألغِ ضبط `WAYLAND_DISPLAY` واضبط `displayServer: 'xvfb'`.
- الشاشة الافتراضية 1920x1080. كان v9 يستخدم القيمة الافتراضية لـ `xvfb-run`، وهي 1280x1024 على Debian وUbuntu و640x480 على Fedora وRHEL وArch. للإبقاء على الحجم الذي تستخدمه لقطاتك المرجعية، اضبط `displayServerWidth` و`displayServerHeight` عليه.
- تختار المتصفحات Wayland أو X11 بناءً على `XDG_SESSION_TYPE` الذي يضبطه خادم العرض. تحت Weston، يضيف WebdriverIO أيضًا `--ozone-platform=wayland` إلى Chrome وEdge اللذين يشغّلهما، لأن Chrome وEdge قبل 140 (وChrome for Testing قبل 135) يتجاهلان `XDG_SESSION_TYPE`. لا يوفّر Weston قيمة `DISPLAY`، لذا إذا كانت اختباراتك أو أدواتك تحتاج إلى X11، فاضبط `displayServer: 'xvfb'`.
- إذا كنت تستخدم `XvfbManager` أو نسخة `xvfb` من `@wdio/xvfb` مباشرة، فاستخدم `DisplayServerManager` من `@wdio/display-server` بدلًا منها. حيث كنت تشغّل `xvfb.init()` وتغلّف الأوامر داخل `xvfb-run`، أو تُنشئ العمليات عبر `ProcessFactory`، ابدأ شاشة ومرّر بيئتها إلى العمليات التي تحتاجها. يستخدم المثال Xvfb بدقة 1280x1024، كما كان v9 يفعل على Debian وUbuntu. على مضيف لا يُضبط فيه إلا `WAYLAND_DISPLAY`، ألغِ ضبطه أولًا، وإلا فلن يبدأ `startDaemon()` شيئًا:

  ```js
  import { spawn } from 'node:child_process'
  import { once } from 'node:events'
  import { DisplayServerManager } from '@wdio/display-server'

  const manager = new DisplayServerManager({ displayServer: 'xvfb' })
  const daemon = await manager.startDaemon({ width: 1280, height: 1024 })
  // يُعيد startDaemon() أيضًا null عندما تكون هناك شاشة موجودة بالفعل
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

## المحاكاة

يقود `browser.emulate()` وحدة المحاكاة في WebDriver BiDi لسياق التصفح العلوي الحالي. كان v9 يحقن سكربت تحميل مسبق يعدّل `navigator.geolocation.getCurrentPosition` و`navigator.userAgent` و`window.matchMedia` و`navigator.onLine`. أُزيلت تلك السكربتات. لا يزال `browser.emulate('clock', …)` يثبّت مؤقتات وهمية في الصفحة الحالية وفي الصفحات التي تُفتح بعدها.

لم تعد إعادة التحميل مطلوبة لنطاقات BiDi.

```diff
  await browser.emulate('onLine', false)
- // تغيّر `navigator.onLine` فقط؛ واستمرت حركة البيانات
+ // سياق التصفح غير متصل، بما في ذلك fetch وWebSocket وWebTransport
```

- يستدعي `onLine: false` الأمر `emulation.setNetworkConditions` مع `{ type: 'offline' }`. وتمسحه القيمة `true` واستعادة النطاق. يبقى معدل النقل وزمن الاستجابة ضمن `browser.throttleNetwork()`.
- يضبط `colorScheme` ميزة الوسائط `prefers-color-scheme`، لذا يتبع CSS `@media (prefers-color-scheme)` نتيجة `matchMedia`.
- `userAgent` هو تجاوز user-agent الخاص بالمتصفح، وليس خاصية `navigator.userAgent` معدّلة.
- يستخدم `geolocation` مكدس تحديد الموقع الجغرافي في المتصفح. قد تظل الصفحة بحاجة إلى `browser.setPermissions({ name: 'geolocation' }, 'granted')`. ويُبلغ `{ error: 'positionUnavailable' }` عن ذلك الخطأ بدلًا من الإحداثيات.
- يتشارك `colorScheme` و`media` خريطة ميزات وسائط واحدة. يستبدل الاستدعاء اللاحق الخريطة بأكملها، واستعادة أي من النطاقين تمسحها.
- يضبط `device` وكيل المستخدم ومنطقة العرض واللمس وتخطيط النص للهاتف المحمول وviewport meta بناءً على واصف الجهاز. ولا يغيّر `screen` ولا `orientation`.

النطاقات الجديدة هي `media` و`locale` و`timezone` و`touch` و`orientation` و`screen` و`viewportMeta` و`textLayout` و`scripting` و`scrollbar` و`forcedColors`. المتصفح الذي لا ينفّذ أمرًا ما يرفض الاستدعاء بخطئه الخاص (`unknown command` أو `unsupported operation`). لا يرجع WebdriverIO إلى سكربت تحميل مسبق أو إلى CDP. إذا رُفض `device` في منتصف الطريق، تُعاد القيم السابقة لوكيل المستخدم ومنطقة العرض واللمس وتخطيط النص وviewport meta.

يقبل `wdio session emulate` النطاقات نفسها. ولم يعد يطلب منك إعادة التحميل لتجاوز يُطبَّق فورًا. لم تتغير إعدادات `emulate network` المسبقة و`emulate cpu`، وتبقى خاصة بـ Chromium فقط. راجع [المحاكاة](/docs/emulation).

## الخطوات التالية

- انسخ [مهارة الترحيل](#migrate-with-a-coding-agent) إلى المشروع واطلب من وكيل تطبيقها.
- [WebdriverIO لوكلاء البرمجة](/docs/ai-agents) لكتابة اختبارات v10 جديدة.
- [Headless وخوادم العرض](/docs/headless-and-display-servers) عندما تعمل مجموعة الاختبارات على Linux.