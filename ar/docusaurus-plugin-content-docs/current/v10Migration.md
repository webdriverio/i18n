---
id: v10-migration
title: من v9 إلى v10
description: حدِّث مشروع WebdriverIO من v9 إلى v10، بما في ذلك كل تغيير كاسر للتوافق، ومهارة لوكيل البرمجة تطبّق هذا الدليل.
---

يجمع هذا الدليل التغييرات الكاسرة للتوافق في WebdriverIO `v10` وما يجب عليك فعله حيالها.

على عكس الإصدارات الرئيسية السابقة، لا يستطيع [codemod](https://github.com/webdriverio/codemod) الخاص بـ WebdriverIO تطبيق معظم هذه التغييرات، لأنها تعتمد على المعنى الفعلي لاختباراتك. [تواقيع الأوامر القديمة](#legacy-command-signatures) أدناه هي استبدالات آلية. أما كل قسم آخر فيصف كيفية العثور على المواضع المتأثرة في مجموعة اختباراتك.

## الترحيل باستخدام وكيل برمجة

أعطِ وكيلك مهارة الترحيل إلى v10 واطلب منه ترحيل مجموعة الاختبارات إلى WebdriverIO v10 باتباع هذه الصفحة. المهارة هي الإجراء: ما الذي يجب البحث عنه، وأي codemod يجب تشغيله، ومتى يجب التوقف. وهذه الصفحة هي المرجع الأساسي لكل تغيير كاسر.

ثبّتها من المشروع الذي تقوم بترقيته. تقرأ [أداة skills CLI](https://skills.sh) الملف [`.agents/skills/wdio-v10-migration/SKILL.md`](https://github.com/webdriverio/webdriverio/blob/main/.agents/skills/wdio-v10-migration/SKILL.md) من هذا المستودع وتكتبه في مجلد المهارات الخاص بالوكلاء الذين تختارهم:

```sh
npx skills add webdriverio/webdriverio --skill wdio-v10-migration
```

يثبّت `--skill wdio-v10-migration` هذه المهارة. المهارات المخصصة للعمل على مستودع WebdriverIO نفسه مُعلَّمة كمهارات داخلية ولا تُعرض. تسألك الأداة عن الوكلاء الذين تريد التثبيت لهم، وتكتب المهارة في مجلد المشروع الخاص بكل وكيل. يمكنك أيضًا إرفاق ذلك الملف بالمحادثة.

لا تظهر المحددات الصارمة وقوائم `specs` / `exclude` المجردة في الـ capabilities إلا عند تشغيل مجموعة الاختبارات. لا تستطيع المهارة الحكم عليها من الشيفرة المصدرية وحدها.

## Node.js

يتطلب WebdriverIO v10 الإصدار Node.js 22.19.0 أو أحدث. لم يعد Node.js 18 و20 مدعومين. يغطي CI الإصدارات Node.js 22 و24 و26.

## اختبارات المكوّنات

لا يزال مشغّل المتصفح يعمل في Chrome 90 وEdge 90 وFirefox 90 وSafari 14.1 أو أحدث. راجع [دعم المتصفحات](/docs/component-testing#browser-support).

تبقى الشيفرة المُمرَّرة إلى `browser.execute` على مستوى ES2021، حتى تتمكن من العمل في المتصفحات الأقدم قيد الاختبار. هذا الحد الأدنى لم يتغير.

## Mocha

يعتمد `@wdio/mocha-framework` و`@wdio/browser-runner` على [Mocha 12](https://mochajs.org/blog/mocha-12-stable/). يحتاج Mocha 12 إلى Node.js `^20.19.0 || >=22.12.0`، وهو ما يغطيه الحد الأدنى لـ v10 وهو 22.19.0.

```diff
- mochaOpts: { compilers: ['ts:ts-node/register'] }
+ mochaOpts: { require: ['ts-node/register'] }
```

أُزيل `mochaOpts.compilers`. أزال Mocha الخيار `--compilers` المُهمَل منذ زمن طويل، لذا يتم تجاهل أي تعيينات متبقية للمترجمات. حمّل المحوّلات (transpilers) أو ملفات الإعداد الأخرى باستخدام `mochaOpts.require`.

يتبع WebdriverIO مهلة Mocha: `this.timeout()` في اختبار أو hook، و`mochaOpts.timeout: 0` الذي يعطّل المهلة. في v9، كان WebdriverIO يتجاهل `this.timeout()` داخل الاختبار، ومنذ 9.22 كان `mochaOpts.timeout: 0` يُفشل كل اختبار ("Timeout after -3ms"). لا يعيد الوسيط `retry` في WebdriverIO تشغيل الاختبار بعد انتهاء المهلة. راجع [مهلات Mocha وhooks في WebdriverIO](./Timeouts.md#mocha-timeouts-and-the-webdriverio-hooks)، وكذلك بخصوص `mochaOpts.parallelMode`. جديد في v10: [الاختبارات المتوازية في ملف spec واحد](./ParallelTests.md) باستخدام `mochaOpts.parallelMode` أو `cucumberOpts.parallelMode`.

القيمة الافتراضية لـ `failHookAffectedTests` هي `true`. يؤدي فشل hook من نوع `before` أو `beforeEach` إلى فشل الاختبارات التي تخطّاها ذلك الـ hook. اضبط `mochaOpts.failHookAffectedTests` على `false` للإبلاغ عن الـ hook فقط.

استخدم `expect-webdriverio` 8، راجع [expect-webdriverio 8](#expect-webdriverio-8). يمكن لـ Mocha تحميل تلك الحزمة مرتين في عملية واحدة؛ وهي تشارك حالة التأكيدات بين هاتين النسختين ([expect-webdriverio#2221](https://github.com/webdriverio/expect-webdriverio/pull/2221)).

تغييرات Mocha 12 التي قد تتسرب عبر `mochaOpts`:

- يقبل `grep` رايات RegExp الحديثة.
- لا يزال `ui` إحدى القيم `bdd` أو `tdd` أو `qunit` أو `exports`. يجب أن تحتفظ الواجهات المخصصة باللاحقة `*-bdd` أو `*-tdd` أو `*-qunit`.
- لا يزال `parallel` غير مدعوم. يتولى WDIO توازي ملفات spec؛ وسيُطلق مجمّع العمال (worker pool) الخاص بـ Mocha خطأً إذا فعّلته.

Mocha 12 يعتمد على ESM أولًا (`"type": "module"`). لا يزال `require('mocha')` البرمجي يعمل على Node 22 عبر `require(esm)`. واجهة سطر أوامر WDIO لـ Mocha (`wdio run … --mochaOpts.*`) لم تتغير؛ أما واجهة سطر أوامر Mocha نفسها فتستخدم الآن `util.parseArgs` بدلًا من yargs.

## Cucumber

يعتمد `@wdio/cucumber-framework` على [`@cucumber/cucumber` 13](https://github.com/cucumber/cucumber-js/blob/main/UPGRADING.md#1300).

يتطلب Cucumber 13 الإصدار Node.js 22 أو 24 أو 26 أو أحدث. لا يعمل على Node.js 20 أو 23 أو 25. تعلن حزمة إطار العمل عن النطاق نفسه، بدءًا من الحد الأدنى لـ v10 وهو 22.19.0.

```diff
- cucumberOpts: { tagExpression: '@smoke' }
+ cucumberOpts: { tags: '@smoke' }
```

لا يوجد اسم بديل لـ `tagExpression`. يؤدي ضبطه إلى إطلاق خطأ، حتى لا يتسبب مرشّح متبقٍّ في تشغيل كل السيناريوهات بصمت.

لم يعد Cucumber 13 يصدّر `Cli`. تمر عمليات التشغيل البرمجية عبر `runCucumber` من `@cucumber/cucumber/api`، وهو ما يستخدمه المحوّل (adapter) بالفعل.

التغييرات الكاسرة الأخرى في Cucumber 13 (مسارات المنسّقات الملتبسة، والعمال المتوازيون، و`BeforeAll` / `AfterAll`) موصوفة في [دليل الترقية الخاص بـ Cucumber](https://github.com/cucumber/cucumber-js/blob/main/UPGRADING.md#1300).

## Jasmine

يعتمد `@wdio/jasmine-framework` على [Jasmine 6](https://jasmine.github.io/upgrade-guides/6.0). تم اختبار Jasmine 6 على Node.js 20 و22 و24. ويغطي الحد الأدنى لـ v10 وهو 22.19.0 هذا النطاق بالفعل.

أُزيل `jasmineNodeOpts`. اضبط Jasmine باستخدام `jasmineOpts`. يؤدي ضبط `jasmineNodeOpts` إلى إطلاق الخطأ:

```text
The option "jasmineNodeOpts" was removed in WebdriverIO v10. Use "jasmineOpts" instead.
```

```diff
- jasmineNodeOpts: { defaultTimeoutInterval: 60000 }
+ jasmineOpts: { defaultTimeoutInterval: 60000 }
```

لم يعد `jasmineOpts.failFast` يُقرأ. استخدم `jasmineOpts.stopOnSpecFailure`. لا يوقف `failFast` المتبقي مجموعة الاختبارات. الخيار `failFast` الخاص بـ Cucumber خيار مختلف ولا يزال يعمل.

```diff
- jasmineOpts: { failFast: true }
+ jasmineOpts: { stopOnSpecFailure: true }
```

أُزيل `jasmineOpts.stopSpecOnExpectationFailure`. استخدم `jasmineOpts.oneFailurePerSpec`. يؤدي ضبط المفتاح القديم إلى إطلاق الخطأ:

```text
The option "jasmineOpts.stopSpecOnExpectationFailure" was removed in WebdriverIO v10. Use "jasmineOpts.oneFailurePerSpec" instead.
```

```diff
- jasmineOpts: { stopSpecOnExpectationFailure: true }
+ jasmineOpts: { oneFailurePerSpec: true }
```

أصبحت المطابِقات (matchers) المتزامنة في Jasmine متزامنة مجددًا. في v9، كان `expect` العام هو `expectAsync` الخاص بـ Jasmine، لذا كان `expect(1).toBe(1)` يعيد promise. في v10، تعيد المطابِقات المدمجة في Jasmine والمطابِقات التي تضيفها باستخدام `jasmine.addMatchers` القيمة `undefined`. لا تزال مطابِقات WebdriverIO، والمطابِقات غير المتزامنة في Jasmine، ومطابِقات `jasmine.addAsyncMatchers` تعيد promise، لذا استمر في استخدام `await` معها. لا تحتاج إلى تغيير `await expect($('#logo')).toBeDisplayed()` إلى `expectAsync()`: فـ `expect` العام يرسل مطابِقات WebdriverIO إلى `expectAsync` نيابة عنك. ويستمر `await expect(1).toBe(1)` في العمل.

أصبح التأكيد المتزامن الفاشل بدون `await` يُفشل الـ spec الآن. في v9، كان promise مرفوضًا: إذا لم ينتظره شيء، كان يمكن أن ينجح الـ spec، مع ظهور رفض غير معالَج في السجل فقط. بعد الترقية، انظر إلى ملفات spec التي تبدأ بالفشل. كان فيها فشل مخفي في v9، والإصلاح يكون في الاختبار أو في التطبيق، وليس في استدعاء `expect`:

```js
it('saves the form', async () => {
    const onSave = jasmine.createSpy('onSave')
    await submitForm(onSave)
    // v9: ينجح حتى عندما لا يتم استدعاء `onSave`
    // v10: يفشل عندما لا يتم استدعاء `onSave`
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

- يوقف `oneFailurePerSpec` الآن الـ spec عند أول تأكيد فاشل: فورًا بالنسبة للمطابِق المتزامن، وعند استقرار الـ promise بالنسبة للمطابِق غير المتزامن المُنتظَر.
- تعمل مطابِقات الـ spy في Jasmine بدون `await`. في v9، كانت `toHaveBeenCalled` و`toHaveSpyInteractions` و`toHaveNoOtherSpyInteractions` تفشل برسالة "Does not take arguments"، وكان الـ spy غير المُستدعى ينجح بدون `await`.
- لم يعد `jasmine.addMatchers` يُستبدل، لذا لم يعد Jasmine يعرض تحذير "Monkey patching detected".

للمطابِق `toHaveSize` معنيان. على قيمة من WebdriverIO، يكون هو مطابِق WebdriverIO ويتحقق من حجم العنصر: عنصر، أو مصفوفة عناصر (بما في ذلك نتيجة `$$().filter()`)، أو `Element[]`، أو عنصر multi-remote، أو متصفح، أو browsing context، أو mock، أو المغلِّف `some()`، أو promise مثل `$()` قابل للتسلسل. على أي قيمة أخرى، يكون هو مطابِق Jasmine ويتحقق من الطول. في v9، كان مطابِق Jasmine هو الذي يعمل دائمًا.

```js
expect([1, 2]).toHaveSize(2)                                   // Jasmine، متزامن
await expect($('#logo')).toHaveSize({ width: 32, height: 32 }) // WebdriverIO، غير متزامن
```

تتبع الأنواع (types) القواعد نفسها. يعرّف `@wdio/jasmine-framework` الآن نوع `expect` العام بمطابِقات Jasmine، بالإضافة إلى مطابِقات WebdriverIO والمطابِقات غير المتزامنة في Jasmine، والتي تعيد promise. أزل `expect-webdriverio/jasmine-wdio-expect-async` من `types` في ملف `tsconfig.json`، لأنه يعرّف كل مطابِق على أنه غير متزامن. أضف `jasmine` إن لم يكن موجودًا:

```diff title="tsconfig.json"
 {
     "compilerOptions": {
-        "types": ["node", "@wdio/globals/types", "expect-webdriverio/jasmine-wdio-expect-async", "@wdio/jasmine-framework"]
+        "types": ["node", "jasmine", "@wdio/globals/types", "@wdio/jasmine-framework"]
     }
 }
```

يعمل `expect.oneOf()` و`expect.multiRemote()` الآن أيضًا في ملفات spec الخاصة بـ Jasmine. في السابق، لم يكونا موجودين على `expect` الخاص بـ Jasmine وقت التشغيل.

## expect-webdriverio 8

تتطلب `@wdio/globals` و`@wdio/runner` و`@wdio/browser-runner` الحزمة `expect-webdriverio` 8 كاعتمادية نظيرة (peer dependency). في v9، كانت `expect-webdriverio` 5 أو 6 أو 7. إذا كان ملف `package.json` يدرج `expect-webdriverio`، فحدّثه إلى الإصدار 8 في التغيير نفسه الذي تحدّث فيه حزم `@wdio/*`.

لـ `expect-webdriverio` 8 تغييراته الكاسرة الخاصة. يسرد [دليل الترحيل من v7 إلى v8](https://github.com/webdriverio/expect-webdriverio/blob/main/docs/Migrations.md#migration-guide-v7-to-v8) الخاص به كل تغيير وبديله. إذا كنت قادمًا من `expect-webdriverio` 5 أو 6، فاقرأ أيضًا [دليل الترحيل من v5 إلى v6](https://github.com/webdriverio/expect-webdriverio/blob/main/docs/Migrations.md#migration-guide-v5-to-v6): يزيل الإصدار 8 واجهات API التي أُهملت من 5.6.9 إلى 6.0.0. ليس للإصدار 7 دليل ترحيل. فهو يضيف دعم multi-remote، وأصبح `toMatchSnapshot()` و`toMatchInlineSnapshot()` على `$$()` يخزّنان `outerHTML` لكل عنصر: حدّث تلك اللقطات (snapshots). هذه التغييرات هي الأكثر احتمالًا للتأثير على مجموعة الاختبارات:

- يقارن `toHaveText` على `$$()` العناصر فهرسًا بفهرس. تفشل المصفوفة المتوقعة إذا كانت بترتيب مختلف عن ترتيب الصفحة. استخدم ترتيب الصفحة، أو `expect.oneOf()` أو `expect.arrayContaining()`.
- تؤدي مصفوفة من القيم المتوقعة على عنصر واحد إلى فشل `toHaveText` و`toHaveHTML` و`toHaveComputedLabel` و`toHaveComputedRole` و`toHaveElementClass`. استخدم `expect.oneOf()`. بالنسبة لـ `toHaveElementClass`، كانت المصفوفة تعني "يحتوي على أي من هذه الأصناف": استخدم `expect.oneOf()`، أو تأكيدًا واحدًا لكل صنف عندما يجب أن يحتوي العنصر عليها جميعًا.
- يطلق مطابِق القوائم (`expect.arrayContaining()`، `expect.arrayOf()`) على عنصر واحد، أو مع `some()`، خطأً. أما على `$$()`، فيقارن قيم جميع العناصر دفعة واحدة.
- لا تتطابق السمة أو الخاصية المفقودة أبدًا، ولا حتى مع مطابِق يقبل غياب القيمة، مثل `expect.not.stringContaining()`.
- تُقارَن قيم `URL` و`Set` و`Map` والقيم الثنائية بمحتواها. يمكن الآن أن يفشل تأكيد كان ينجح عن طريق الخطأ.
- لم تعد الأنواع المساعدة عامة. يفشل الملف الذي يستخدم `Test` أو `TestResult` أو `Scenario` أو `WdioCustomMatchers` بدون import برسالة `Cannot find name`: استخدم `Frameworks.Test` و`Frameworks.TestResult` و`Frameworks.Scenario` من `@wdio/types`، و`ExpectWebdriverIO.Matchers`.
- أُزيل `setFeatureFlags()` والخيار `featureFlags`.
- أُزيلت واجهات API المُهمَلة التالية: `setOptions` (استخدم `setDefaultOptions`)، و`getConfig` (استخدم `getDefaultOptions`)، و`matchers` (استخدم `wdioCustomMatchers`)، و`toHaveAttr` (استخدم `toHaveAttribute`)، و`toHaveClass` (استخدم `toHaveElementClass`)، و`toBeRequestedWithResponse()` (استخدم `toBeRequestedWith({ response })`)، و`expect-webdriverio/types` (استخدم `expect-webdriverio/expect-global`).
- يحصل الـ hookان `beforeAssertion` و`afterAssertion` على اسم الاسم البديل الذي استدعاه الاختبار، بالنسبة لـ `toBeExisting` و`toBePresent` و`toHaveLink` و`toHaveValue` و`toBeRequested`. في v9، كانا يحصلان على اسم المطابِق الذي يقف خلف الاسم البديل، مثل `toExist` بالنسبة لـ `toBeExisting`.
- على متصفح multi-remote، مرّر نتيجة `$$()` إلى `expect`. لا يتم التعرّف على مصفوفة عادية مثل `[...elements]` أو `Array.from(elements)` كعناصر، ويفشل التأكيد.

على متصفح multi-remote، يتحقق تأكيد واحد من كل نسخة، ويعطي `expect.multiRemote()` قيمة متوقعة واحدة لكل نسخة. راجع [تأكيدات Multiremote](/docs/multiremote#assertions).

## حزم المشغّلات (Drivers)

يشغّل WebdriverIO v10 متصفحات Firefox وEdge وSafari باستخدام `geckodriver` 8 و`edgedriver` 8 و`safaridriver` 3. في v9، كان يستخدم `geckodriver` و`edgedriver` 6 أو 7، و`safaridriver` 1 أو 2. يثبّتها WebdriverIO، لذا لا تحتاج إلى إدراجها بنفسك. إذا كان ملف `package.json` يدرج أحدها، فحدّثه في التغيير نفسه الذي تحدّث فيه حزم `@wdio/*`.

يأخذ `geckodriver` و`edgedriver` الحزمة `@wdio/logger` كاعتمادية نظيرة، لذا يسجّلان عبر المسجّل (logger) الخاص بتثبيت WebdriverIO لديك. في v9، كان `geckodriver` و`edgedriver` يجلبان نسختهما الخاصة من `@wdio/logger`، وكانت تلك النسخة الثانية تُفرغ ملف السجل في `outputDir`. شغّل `npm ls @wdio/logger`: يجب أن تكون كل نسخة من الإصدار 10. أي إضافة أو خدمة لا تزال تعتمد على الإصدار 9 لها التأثير نفسه.

تسرد [ملاحظات ترقية المشغّلات](https://github.com/webdriverio/driver#upgrading-to-geckodriver-8-edgedriver-8-and-safaridriver-3) كل تغيير. يمكن أن تؤثر هذه التغييرات على مشروع WebdriverIO:

- تستخدم عمليات تنزيل المشغّلات `HTTPS_PROXY` و`HTTP_PROXY`. في v9، كانت عمليات تنزيل `geckodriver` و`edgedriver` تتجاهلهما. إذا كان هناك proxy مضبوط في بيئتك لكن يجب الوصول إلى CDN المشغّل مباشرة، فأضف المضيف الخاص به إلى `NO_PROXY`.
- لم يعد `geckodriver` يقرأ `GECKODRIVER_FILEPATH`. استخدم `GECKODRIVER_PATH`.
- يقبل `wdio:edgedriverOptions` و`wdio:safaridriverOptions` الخيار `spawnOpts`، كما يفعل `wdio:chromedriverOptions`.

## تنزيلات المتصفحات

في v9، كان WebdriverIO يستخرج ملفات zip الخاصة بـ Chrome وChromium وChromedriver بنفسه. في v10 يستخدم أمر النظام `unzip` على Linux وmacOS (و`tar.exe` أو PowerShell على Windows). صور Docker المصغّرة، مثل `node:24-slim`، لا تحتوي عليه: ثبّته، راجع [Docker](/docs/docker#images-where-webdriverio-downloads-the-browser).

في v9، كانت تنزيلات Chrome وChromium وFirefox وChromedriver تستخدم `HTTPS_PROXY` و`HTTP_PROXY`. في v10 لا تستخدمهما إلا عندما تكون `proxy-agent` مثبّتة في مشروعك، أو عندما يعمل Node.js مع `NODE_USE_ENV_PROXY=1` (Node.js 22.21.0 / 24.5.0 أو أحدث). يسجّل WebdriverIO تحذيرًا عندما يكون متغير proxy مضبوطًا لكن التنزيل سيتجاهله. راجع [Proxy لتنزيلات المتصفحات والمشغّلات](/docs/proxy#proxy-for-browser-and-driver-downloads).

## المتغير العام لـ Multi-remote

أُزيل المتغير العام `multiremotebrowser` بالأحرف الصغيرة، من `@wdio/globals` ومن المتغيرات العامة في `eslint-plugin-wdio` أيضًا. استخدم `multiRemoteBrowser`.

```diff
- import { multiremotebrowser } from '@wdio/globals'
+ import { multiRemoteBrowser } from '@wdio/globals'
```

## الـ Capabilities

لم يعد `specs` و`exclude` داخل الـ capabilities يُقرآن. استخدم `wdio:specs` و`wdio:exclude`.

```diff
  capabilities: [{
      browserName: 'chrome',
-     specs: ['./test/specs/chrome/**/*.js'],
-     exclude: ['./test/specs/chrome/skip.js']
+     'wdio:specs': ['./test/specs/chrome/**/*.js'],
+     'wdio:exclude': ['./test/specs/chrome/skip.js']
  }]
```

تبقى مفاتيح الإعداد على المستوى الأعلى `specs` و`exclude`. لا تختار القائمة المجردة المتبقية على capability أي ملفات لتلك الـ capability. وتستخدم الـ capability حينها `specs` و`exclude` الموجودين على المستوى الأعلى.

أُزيل الاسمان البديلان `tunnelIdentifier` و`parentTunnel` من أنواع خيارات Sauce Labs. استخدم `tunnelName` و`tunnelOwner`.

## TypeScript

أُزيلت الأنواع `Element` و`MultiRemoteBrowser` و`MultiRemoteElement` التي كان يصدّرها `webdriverio`. استخدم مساحة الأسماء العامة `WebdriverIO`.

```diff
- import type { Element } from 'webdriverio'
- const elem: Element = await $('#foo')
+ const elem: WebdriverIO.Element = await $('#foo')
```

يعرّف `ChainablePromiseElement` الآن `then`، ويعرّف `ChainablePromiseArray` كلًّا من `then` و`catch` و`finally`. تصف الأنواع القابلة للتسلسل القيمة قبل `await`. ولم تعد تناسب القيمة المُنتظَرة:

```ts
let elem: ChainablePromiseElement
elem = await $('h1')
// TS2741: Property 'then' is missing in type 'Element' but required in type 'ChainablePromiseElement'.

let elems: ChainablePromiseArray
elems = await $$('li')
// TS2322: Type 'ElementArray' is not assignable to type 'ChainablePromiseArray'.
```

حدّد نوع القيمة المُنتظَرة بـ `WebdriverIO.Element` أو `WebdriverIO.ElementArray`:

```diff
- let elem: ChainablePromiseElement = await $('h1')
- let elems: ChainablePromiseArray = await $$('li')
+ let elem: WebdriverIO.Element = await $('h1')
+ let elems: WebdriverIO.ElementArray = await $$('li')
```

كلا النوعين القابلين للتسلسل يطابقان الآن `T extends PromiseLike<unknown>`. النوع الشرطي الذي يتحقق من `PromiseLike` يسلك فرعًا مختلفًا لـ `$()` و`$$()` عمّا كان عليه في v9. على سبيل المثال، أصبح `Awaited<ChainablePromiseElement>` الآن `WebdriverIO.Element`، و`Awaited<ChainablePromiseArray>` هو `WebdriverIO.ElementArray`.

تغيّر نوع خصائص `$$()` غير المُنتظَر. فهي متاحة فورًا، قبل أن يُحَل الاستعلام، لذا اقرأها بدون `await` أو `.then()`:

| الخاصية | v9 | v10 |
|---|---|---|
| `selector` | `Promise<Selector>` | `Selector \| undefined` |
| `parent` | `Promise<...>` | العنصر الأب، وليس promise (انظر أدناه) |
| `foundWith` | لا شيء | الأمر الذي عثر على القائمة، مثل `$$` أو `custom$$` |
| `props` | لا شيء | الوسائط الإضافية لذلك الأمر |

```diff
- const selector = await $$('li').selector
+ const selector = $$('li').selector
```

في استعلام متسلسل مثل `$('form').$$('input')`، تكون `parent` هي `$('form')` القابلة للتسلسل إلى أن تُحَل القائمة، ثم العنصر المحلول بعد ذلك. انتظر القائمة قبل استخدام `parent` كعنصر.

وقت التشغيل، تعيد `filter()` و`filterSeries()` و`slice()` على قائمة `$$()` قائمة عناصر، وليس مصفوفة عادية. تحتفظ النتيجة بـ `selector` و`foundWith` و`parent` و`props` الخاصة بالقائمة المصدر. في v9، كانت `filter()` تعيد مصفوفة عادية بدون هذه الخصائص. لا تُظهر الأنواع هذا بعد: `filter()` و`filterSeries()` مُعرَّفتان على أنهما تعيدان `Promise<WebdriverIO.Element[]>`، و`slice()` تعيد `WebdriverIO.Element[]`، لذا يُبلغ TypeScript عن خطأ عند قراءة هذه الخصائص على النتيجة.

لا يعيد WebdriverIO تشغيل الاستعلام للقائمة المشتقة نفسها: الفهرس الذي يتجاوز نهايتها لا ينتظر مزيدًا من التطابقات، ولا يعيد أبدًا عنصرًا استبعده المرشّح. ولا يزال أعضاؤها هم عناصر الاستعلام المصدر، مع `selector` و`index` الأصليين. إذا أصبح أحد الأعضاء قديمًا (stale)، يجلبه WebdriverIO مجددًا من الاستعلام المصدر عند ذلك الفهرس، وقد يكون عنصرًا آخر إذا تغيّرت الصفحة. الشيفرة التي تعيد تشغيل استعلام القائمة من خصائصها، مثل `parent[foundWith](selector, ...props)`، تحصل على القائمة الكاملة، وليس القائمة المُرشَّحة.

تضبط الحزم المنشورة `typeScriptVersion` على 6.0.3، بما يطابق إصدار TypeScript الذي يُترجَم به هذا المستودع.

يقبل `browser.mock()` كائن `URLPattern` من `urlpattern-polyfill` وكذلك `URLPattern` الأصلي (عام في Node.js 24، ومُعرَّف النوع في مكتبة `dom` الخاصة بـ TypeScript 6).

يُهمل TypeScript 6 الخيارين `"moduleResolution": "node"` و`"baseUrl"`، ويجعل `strict` هو الافتراضي. يولّد `create-wdio` الآن `"moduleResolution": "bundler"` لمشاريع ESM و`"NodeNext"` لمشاريع CommonJS. إذا حدّثت TypeScript في مشروع قائم، فغيّر هذه الخيارات في ملف `tsconfig.json`.

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

يكتب `npm create wdio@latest` كلًّا من `compilerOptions.target` و`compilerOptions.lib` بالقيمة `es2024`. يحتاج التحقق من أنواع ذلك الملف إلى TypeScript 5.7 أو أحدث. لا يقوم `tsx`، الذي يشغّل الإعداد والاختبارات، بالتحقق من الأنواع، لذا لا يهم المترجم الأقدم إلا عندما تشغّل `tsc` بنفسك.

لا تُعاد كتابة ملف `tsconfig.json` القائم. والإعداد المُولَّد الذي يمتد من إعداد آخر يحتفظ بـ `target` و`lib` الخاصين بالإعداد الأب.

في الـ hook المسمّى `afterAssertion`، أصبح نوع `params.result` الآن `{ pass, message }`، كما تعطيه المطابِقات. في v9، كان النوع `{ result, message }`، لكن `params.result.result` كان دائمًا `undefined` وقت التشغيل. اقرأ `params.result.pass`:

```diff
  afterAssertion (params) {
-     console.log(params.matcherName, params.result.result)
+     console.log(params.matcherName, params.result.pass)
  }
```

تكون `pass` بالقيمة `true` عندما تطابق القيمة القيمة المتوقعة، حتى مع `.not`. وبالتالي مع `.not`، ينجح التأكيد عندما تكون `pass` بالقيمة `false`. لا يخبرك الـ hook ما إذا كان الاختبار قد استخدم `.not`.

## hooks الأوامر

يشغّل أمر العنصر الـ hookين `beforeCommand` و`afterCommand` مرة واحدة، مع وسائط الأمر. في v9، كان يشغّلهما مرتين أو ثلاث مرات، وكان الاستدعاء الأول يحصل على `[]` كـ `args`. الأمر الذي يعمل داخل أمر آخر (مثل `getElementText` داخل `getText`) لا يزال له زوجه الخاص. لا تعمل الـ hooks لدالة الحدث `emit`. الـ hook الذي يعدّ الأوامر أو يقيس زمنها يرى كل أمر مرة واحدة.

بالنسبة لأمر العنصر، يعمل `beforeCommand` قبل أن ينتظر WebdriverIO العنصر، لذا قد يكون العنصر لا يزال مفقودًا هناك. يعمل `afterCommand` بعد الانتظار وأي إعادة محاولة، مع نتيجة أو خطأ المحاولة الأخيرة. الـ hook الذي يحتاج إلى العنصر الذي تم العثور عليه يستخدم `afterCommand`.

الأمر الذي تم تغييره باستخدام `overwriteCommand()`، والاستعلام المتسلسل على promise (`$('a').$('b')`)، لا يزالان قادرين على تشغيل الـ hooks أكثر من مرة.

## المُبلِّغات (Reporters)

يُمرَّر حدث `result` الخاص بالمتصفح إلى المُبلِّغات على أنه `client:afterCommand`. لم تعد تلك الحمولة ولا النوع `AfterCommandArgs` يحتويان على الخاصية `name`. اقرأ `command` بدلًا منها. كانت الأوامر المخصصة ترسل `command` بالفعل.

```diff
  onAfterCommand(args) {
-     console.log(args.name)
+     console.log(args.command)
  }
```

### Allure

أُزيل `addEnvironment(name, value)` من `@wdio/allure-reporter`. لم يكن له أي تأثير. اضبط صفوف البيئة باستخدام [`reportedEnvironmentVars`](/docs/allure-reporter) في خيارات مُبلِّغ Allure.

## `$` صارم

يمثّل `$` الآن عنصرًا __واحدًا بالضبط__. إذا حُلّ المحدِّد إلى أكثر من عنصر، يطلق الأمر `StrictSelectorError` بدلًا من استخدام أول تطابق بصمت:

```js
// v9 — ينقر على الزر الأول، حتى لو كان هناك 12 زرًا
await $('button').click()

// v10
await $('button').click()
// StrictSelectorError: strict mode violation: `$("button")` resolved to 12 elements, expected 1.
// Use `$$("button")` to work with all matches, `$$("button")[0]` if you explicitly want the first one,
// or narrow down the selector so it matches a single element.
```

هذا يطابق [محدِّدات Playwright](https://playwright.dev/docs/locators#strictness). أما Cypress فيختلف: قد تُحَل استعلاماته إلى عدة عناصر، وأوامر الإجراءات مثل [`.click()`](https://docs.cypress.io/api/commands/click#Click-all-elements-with-id-starting-with-btn) هي التي ترفض افتراضيًا موضوعًا متعدد العناصر. المحدِّد الذي يُحَل بهدوء إلى عدة عناصر يكاد يكون دائمًا خطأً كامنًا: فهو ينجح اليوم، ثم يتفاعل مع العنصر الخطأ بمجرد أن يضيف أحدهم زرًا ثانيًا إلى الصفحة.

تنطبق القاعدة على كل خطوة في السلسلة (`$('form').$('input')`) وعلى كل نوع محدِّد يقبله `$` — المحدِّدات النصية (بما فيها تلك التي تخترق shadow DOM)، ودوال JS، ومحدِّدات الأجهزة المحمولة، ومراجع الاستراتيجيات المخصصة.

### ما الذي لم يتغير

- لا يزال `$$` يعيد صفرًا أو عدة عناصر.
- أوامر المساعدة المخصصة `custom$` و`shadow$` و`react$` ليست صارمة — فهي لا تزال تعيد أول تطابق، وكذلك نظيراتها من `$$`.
- المحدِّد الذي لا يطابق شيئًا لا يزال يعيد عنصرًا يُحَل بشكل كسول، لذا يتصرف `waitForExist` و[الانتظار التلقائي](/docs/autowait) كما كان من قبل.
- تمرير مرجع عنصر، مثل `$(await browser.getActiveElement())`، يشير دائمًا إلى عقدة واحدة ولا يتم فحصه أبدًا.

### كيفية تدقيق مجموعة اختباراتك

لا يوجد codemod لهذا: أنت وحدك من يستطيع تحديد ما إذا كان التطابق الثاني خطأً أم مقصودًا. طريقتان عمليتان:

1. __شغّل مجموعة اختباراتك.__ كل انتهاك يطلق خطأً مع المحدِّد وعدد التطابقات، وهذا عادةً يكفي لإصلاحه على الفور.
2. __افحص المحدِّدات الواسعة مسبقًا.__ لكل `$(...)` عام في كائنات الصفحات (page objects)، اطبع عدد العناصر التي يطابقها فعلًا:

   ```js
   console.log(await $$('button').length) // 12 ← `$('button')` واسع جدًا
   ```

ثم إما أن تضيّق المحدِّد — ويفضّل أن يكون باتجاه استعلام موجّه للمستخدم مثل `$('button=Submit')` أو `$('aria/Submit')`، راجع [المحدِّدات](/docs/selectors) — أو أن تصرّح بوضوح بأنك تريد أول تطابق:

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

لمشروع كامل، لاستعادة سلوك v9:

```js title="wdio.conf.js"
export const config = {
    // ...
    strictSelectors: false
}
```

يتذكر العنصر كيف تم الاستعلام عنه، لذا فإن إعادة جلبه — بعد مرجع عنصر قديم، أو عبر `waitForExist` — تحافظ على صرامة الاستدعاء الأصلي.

:::info

في الخلفية، يُصدر `$` الصارم طلب `findElements` بدلًا من `findElement`، لأن عدّ التطابقات هو الطريقة الوحيدة لفرض القاعدة. هذه رحلة ذهاب وإياب واحدة في كلتا الحالتين، لكنها مرئية للخدمات المخصصة ولـ mocks الخاصة بـ WebDriver التي تعتمد على الأمر `findElement`.

:::

## قوائم العناصر قبل `await`

منذ v10، يعيد `$$()` كائن [`ElementArray`](/docs/api/browser/$$): مصفوفة حقيقية يمكنك استخدام `await` معها. في v9، كان `$$()` الذي لم تنتظره promise.

| `$$('li')` قبل `await` | v9 | v10 |
| --- | --- | --- |
| `instanceof Promise` | `true` | `false` |
| `Array.isArray()` | `false` | `true` |
| `then`، `catch`، `finally` | دوال | دوال، إلى أن يتم تحميل القائمة |

إلى أن يتم تحميل القائمة، تكون `length` عبارة عن promise، وتطلق `[...list]` و`Array.from(list)` و`for...of` الخطأ `Cannot synchronously iterate over an element list that has not resolved yet`.

ينطبق الشيء نفسه على `custom$$` و`shadow$$` و`react$$`، وعلى `$$()` في متصفح multi-remote. أما `$()` الذي لم تنتظره فلا يزال promise.

يعطي `await` القائمة نفسها، محمّلة وبدون `then`. عندها تكون `length` رقمًا، وتعمل `for...of` و`[...list]` و`Array.from()`. قبل `await`، يمكنك استخدام `for await`، أو فهرس (`$$('li')[0]`)، أو `at()`، أو `slice()`، وتوابع التكرار غير المتزامنة (`map`، `filter`، `forEach`، ...). تعطي هذه التوابع promise: انتظر نتيجة `filter()` قبل قراءة فهرس.

الفهرس الذي يتجاوز نهاية قائمة `$$(selector)` ليس `undefined`، حتى بعد `await`. إنه عنصر ينتظر أن تصل القائمة إلى ذلك الفهرس، كما يفعل `$$('li')[5]` قبل `await`: يعطي `isExisting()` القيمة `false` ويطلق أمر مثل `getText()` الخطأ `Index out of bounds`، كلاهما بعد `waitforTimeout`. في v9، كان `(await $$('li'))[5]` يساوي `undefined`. لذا فإن `if (list[5])` صحيح دائمًا، و`list.at(5)` ليس `undefined` أبدًا. قارن الفهرس بـ `length`، التي لا تنتظر:

```diff
  const list = await $$('li')
- if (list[5]) {
+ if (list.length > 5) {
```

بعد `await`، يعطي الفهرس السالب، والقائمة الناتجة عن `slice()` أو `filter()`، القيمة `undefined` بعد النهاية. قبل `await`، يعطي `list[i]` بفهرس صحيح يساوي 0 أو أكثر، و`at()`، promise، وهو دائمًا قيمة صادقة (truthy).

الشيفرة التي تنتظر قيمة فقط عندما تكون `Promise`، أو التي تقرأ `length` بدون `await`، لا تطلق خطأً. بل تقرأ promise على أنه الطول: يرى `list.length > 0` وحلقة مثل `for (let i = 0; i < list.length; i++)` القيمة `false`، لكن `if (list.length)` و`list.length !== 0` يريان `true`. انتظر القيمة دائمًا باستخدام `await`. استخدام `await` على قيمة محمّلة بالفعل يعطي تلك القيمة:

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

## تواقيع الأوامر القديمة

كان v9 لا يزال يقبل الصيغ الموضعية الأقدم ويطلق تحذيرًا. أما v10 فيقبل كائن الخيارات فقط.

يعيد [codemod](https://github.com/webdriverio/codemod) الخاص بـ v10 كتابة `addCommand` و`overwriteCommand` عندما يكون الوسيط الثالث قيمة منطقية، و`getHTML(true)` و`getHTML(false)`، و`getCookies` عندما يكون المرشّح نصًا أو مصفوفة من عنصر واحد. يُترك استدعاء `getCookies` الذي يحتوي على أكثر من اسم دون تغيير، لأن المرشّح الواحد يطابق اسمًا واحدًا.

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

الوسيط الثالث المنطقي خطأ في TypeScript. ووقت التشغيل يطلق:

```
Passing a boolean as the third argument to `addCommand` was removed in WebdriverIO v10. Use `addCommand(name, fn, { attachToElement: true })`.
```

ينتمي `proto` و`instances` إلى كائن الخيارات نفسه. احذف الوسيط الثالث لإرفاق أمر بالمتصفح.

### `getCookies`

تُرفض المرشّحات النصية ومصفوفات النصوص. مرّر [كائن مرشّح ملفات تعريف الارتباط](https://w3c.github.io/webdriver-bidi/#type-storage-CookieFilter). يرشّح الاستدعاء الواحد اسمًا واحدًا؛ استدعه مرة أخرى لاسم آخر.

```diff
- await browser.getCookies('session')
- await browser.getCookies(['session', 'auth'])
+ await browser.getCookies({ name: 'session' })
+ await browser.getCookies({ name: 'auth' })
```

لا يزال `getCookies()` بدون وسائط يعيد كل ملفات تعريف الارتباط المرئية للصفحة.

### `getHTML`

```diff
- await $('h1').getHTML(false)
+ await $('h1').getHTML({ includeSelectorTag: false })
```

لا يزال `getHTML()` بدون وسائط يتضمن الوسم الخاص بالعنصر نفسه.

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

في جلسة WebDriver BiDi، يعيد `newWindow()` [سياق التصفح](/docs/api/browsingContext) الجديد ولا ينتقل إليه. في v9 كان ينتقل إليه. وبالتالي فإن `browser.closeWindow()` بعد `newWindow()` يغلق الآن علامة التبويب الأولى، وليس الجديدة. شغّل أوامر علامة التبويب الجديدة على السياق الذي يعيده `newWindow()`، وأغلقها باستخدام `closeWindow()` على ذلك السياق:

```diff
- await browser.newWindow('https://webdriver.io', { type: 'tab' })
- console.log(await browser.getTitle())
- await browser.closeWindow()
+ const tab = await browser.newWindow('https://webdriver.io', { type: 'tab' })
+ console.log(await tab.getTitle())
+ await tab.closeWindow()
```

في TypeScript، يكون نوع النتيجة `WebdriverIO.BrowsingContext | { handle, type }`، لأن جلسة WebDriver Classic تعيد مقبض النافذة. في جلسة BiDi، ضيّق النوع: `await browser.newWindow(url, { type: 'tab' }) as WebdriverIO.BrowsingContext`.

يبقى المتصفح على علامة التبويب الأولى. أزل أي استدعاء لـ `switchWindow()` كان يعود إليها: يطلق `switchWindow` خطأً في جلسة BiDi. راجع [`switchToFrame`](#switchtoframe) لمعرفة نموذج سياق التصفح.

### `startActivity`

يُقبل كائن الخيارات فقط. أُزيل `appWaitPackage` و`appWaitActivity` و`optionalIntentArguments`. كانت تنطبق فقط على نقطة نهاية Appium HTTP المُزالة. لا يقبلها `mobile: startActivity`، وتمريرها يطلق خطأً.

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
| `browser.touchAction(...)` / `element.touchAction(...)` | [Actions API](/docs/api/browser/action) مع مؤشر لمس، أو أوامر الأجهزة المحمولة [`tap`](/docs/api/mobile/tap) و[`swipe`](/docs/api/mobile/swipe) |

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

أُزيل `browser.uploadFile()`. كان يضغط ملفًا محليًا ويرسله إلى نقطة النهاية `file` في Selenium، وهي ليست جزءًا من WebDriver أو WebDriver BiDi. اضبط حقل إدخال الملفات باستخدام [`element.setFiles()`](/docs/api/element/setFiles).

```diff
- const remotePath = await browser.uploadFile('/path/to/file.png')
- await $('#file-upload').setValue(remotePath)
+ await $('#file-upload').setFiles('/path/to/file.png')
+ await $('#file-upload').setFiles(['/path/to/a.png', '/path/to/b.png'])
```

يحتاج `setFiles` إلى جلسة BiDi. يفتح المتصفح المسارات. يُحَل المسار النسبي بالنسبة إلى `process.cwd()`. تجهيز الملفات في Selenium Grid ليس جزءًا من v10. على مجموعة الاختبارات التي كانت تعتمد على `uploadFile` لدفع البايتات إلى عقدة أن تضع الملف حيث يمكن للمتصفح قراءته، ثم تستدعي `setFiles`.

في جلسة كلاسيكية محلية، لا يزال `element.setValue('/local/path')` يكتب مسارًا يستطيع المتصفح المحلي رؤيته بالفعل. وتبقى نقطة نهاية Selenium الخام هي `browser.file()` لمستخدمي Grid الذين يستدعونها مباشرة.

## `executeAsync`

أُزيل `browser.executeAsync` و`element.executeAsync`. مرّر دالة `async` إلى [`execute`](/docs/api/browser/execute). القيمة المُعادة من الدالة، بما في ذلك promise مُعاد، هي نتيجة الأمر. لا تزال مهلة `script` سارية، حتى في جلسة WebDriver BiDi: السكربت الذي يعمل لفترة أطول يفشل بخطأ `script timeout`. لمهلة `script` أطول من [`bidiResponseTimeout`](/docs/configuration#bidiresponsetimeout) (180 ثانية افتراضيًا)، قم بزيادة كليهما.

```ts
const result = await browser.execute(async (a, b) => {
    await new Promise((resolve) => setTimeout(resolve, 1000))
    return a + b
}, 1, 2)
```

تخلّص من دالة الاستدعاء `done` الخاصة بـ WebDriver. يجب على السكربت النصي الذي كان يتوقع تلك الدالة كوسيطه الأخير أن يعيد promise بدلًا من ذلك. وقت التشغيل، `executeAsync` ليست دالة.

## `switchToFrame`

لم يعد `browser.switchToFrame` أمرًا عامًا.

في جلسة WebDriver BiDi، يطلق `switchFrame` و`switchWindow` خطأً. علامة التبويب والنافذة والإطار كلها `WebdriverIO.BrowsingContext` تحتفظ به. ينتقل `browser.url()` في سياق المستوى الأعلى الأولي للجلسة ويعيده. يعيد `browser.newWindow()` السياق الجديد ولا ينتقل إليه. يعيد `context.frame()` إطارًا فرعيًا. و`context.parent` هو الإطار الذي فتحته منه.

```ts
const page = await browser.url('https://example.com')
const other = await browser.newWindow('https://webdriver.io', { type: 'tab' })
console.log(await page.getTitle())
const frame = await page.frame('iframe')
console.log(await frame.$('h1').getText())
const pages = await browser.browsingContexts()
```

`context.url` هو نص عنوان URL للمستند. للتنقل في سياق محتفَظ به استخدم `context.navigate(url)`. بيانات التحميل الوصفية من `browser.url()` هي `context.request`.

في جلسة Classic، استمر في استدعاء `switchFrame` مع عنصر، أو `null` للإطار العلوي. يُرفض النص أو الدالة هناك.

```diff
- await browser.switchToFrame(await $('iframe'))
- await browser.switchToFrame(null)
+ await browser.switchFrame($('iframe'))
+ await browser.switchFrame(null)
```

## `setTimeout`

يُرفض مفتاح JSON Wire Protocol المسمّى `page load`. استخدم `pageLoad`.

```diff
- await browser.setTimeout({ 'page load': 10000 })
+ await browser.setTimeout({ pageLoad: 10000 })
```

لم يتغير `implicit` و`script`.

## الوصول إلى نسخ Multi-remote

لم يعد متصفح multi-remote يخزّن كل جلسة كخاصية مستقلة. وينطبق الشيء نفسه على عنصر multi-remote. `getInstance` و`select` هما الطريقة لمخاطبة جلسة واحدة.

```diff
- await browser.myChromeBrowser.url('https://webdriver.io')
- await (await browser.$('button')).myChromeBrowser.click()
+ await browser.getInstance('myChromeBrowser').url('https://webdriver.io')
+ await (await browser.$('button')).getInstance('myChromeBrowser').click()
```

لم يعد توسيع TypeScript الذي يضيف `myChromeBrowser: WebdriverIO.Browser` إلى `WebdriverIO.MultiRemoteBrowser` يطابق خاصية موجودة وقت التشغيل. احذف ذلك التوسيع واستدعِ `getInstance`.

مع مشغّل الاختبارات وترك `injectGlobals` مفعّلًا، لا يزال اسم النسخة متغيرًا عامًا (`myChromeBrowser.url(...)`). هذا المتغير العام هو الجلسة المنفردة. وليس `browser.myChromeBrowser`.

تبقى نتائج الأوامر بترتيب الـ capabilities: الإدخال الأول يعود إلى المفتاح الأول في كائن الـ capabilities.

يعيد `browser.$$()` على متصفح multi-remote كائن `WebdriverIO.MultiRemoteElementArray`، وليس `MultiRemoteElement[]` عادية. لا يزال مصفوفة، لذا تستمر قراءة الفهرس مثل `elements[0]` في العمل.

توابعه `map` و`filter` و`forEach` و`find` و`findIndex` و`some` و`every` و`reduce` غير متزامنة، كما في `WebdriverIO.ElementArray`، وتعيد promise، حتى بعد `await`. وينطبق الشيء نفسه على القوائم التي تعيدها `custom$$()` و`react$$()` و`shadow$$()`. في v9 كانت هذه هي التوابع المتزامنة لمصفوفة عادية:

```diff
  const items = await browser.$$('li')
- const ids = items.map((item) => item.selector)
+ const ids = await items.map((item) => item.selector)
```

تعيد `custom$()` و`react$()`، وعلى عنصر، `shadow$()` و`nextElement()` و`previousElement()` و`parentElement()` كائن `WebdriverIO.MultiRemoteElement` واحدًا، كما يفعل `$()`. في v9 كانت تعيد عنصرًا واحدًا لكل نسخة في مصفوفة عادية. اقرأ عنصر متصفح واحد باستخدام `getInstance`:

```diff
- const [chromeHost, firefoxHost] = await browser.custom$('byTestId', 'host')
- await chromeHost.click()
+ const host = await browser.custom$('byTestId', 'host')
+ await host.getInstance('myChromeBrowser').click()
```

تعيد `custom$$()` و`react$$()`، وعلى عنصر، `shadow$$()` كائن `WebdriverIO.MultiRemoteElementArray` واحدًا، كما يفعل `$$()`. في v9 كانت تعيد قائمة واحدة لكل نسخة في مصفوفة عادية. كل إدخال يخاطب كل النسخ. النسخة التي تعثر على عناصر أقل ليس لها عنصر عند ذلك الفهرس:

```diff
- const [chromeItems, firefoxItems] = await browser.custom$$('byTestId', 'item')
- await chromeItems[0].click()
+ const items = await browser.custom$$('byTestId', 'item')
+ await items[0].getInstance('myChromeBrowser').click()
```

نوع `WebdriverIO.MultiRemoteElement['selector']` هو `Selector`، كما هو الحال في `WebdriverIO.Element['selector']`. في v9 كان نوعه `string`، لكن القيمة كان يمكن أن تكون أيضًا دالة أو مرجع استراتيجية مخصصة. يجب على شيفرة TypeScript التي تستخدمه كنص، مثل `element.selector.includes('…')`، أن تتحقق من النوع أولًا.

أُزيل `WDIO_ENABLE_MULTI_REMOTE_SELECT` و`WDIO_ENABLE_MULTI_REMOTE_ELEMENT_ARRAY`. أصبح `select()` متاحًا دائمًا، ويعيد `$$()` دائمًا مصفوفة العناصر المذكورة أعلاه. احذف كلا المتغيرين.

## استجابات Mock الثنائية

يقبل `mock.respond()` و`mock.respondOnce()` حمولات من نوع `Uint8Array` و`ArrayBuffer`، بما في ذلك `Buffer` مُكمَّل (polyfilled) في اختبارات المكوّنات التي لا تحتوي على `Buffer` عام.

أصبح نوع `mock.getBinaryResponse()` الآن `Uint8Array | null`. لا يزال يعيد `Buffer` في Node.js، لكنه يعيد `Uint8Array` في المتصفح. لاستخدام التوابع الخاصة بـ Buffer في Node.js، حوّل النتيجة غير الفارغة أولًا:

```diff
- const base64 = mock.getBinaryResponse(requestId)?.toString('base64')
+ const bytes = mock.getBinaryResponse(requestId)
+ const base64 = bytes === null ? undefined : Buffer.from(bytes).toString('base64')
```

## Mocks الشبكة في Multi-remote

يعيد `browser.mock()` على متصفح multi-remote كائن `WebdriverIO.MultiRemoteMock`، وليس مصفوفة من الـ mocks. تعمل `respond` و`restore` وتوابع الـ mock الأخرى على كل نسخة. اقرأ الطلبات الملتقطة من الـ mock لمتصفح واحد. استخدم النوع `WebdriverIO.MultiRemoteMock` من مساحة الأسماء العامة `WebdriverIO`.

```diff
- const [chromeMock, firefoxMock] = await browser.mock('*/api')
- expect(chromeMock.calls).toHaveLength(1)
+ const mock = await browser.mock('*/api')
+ mock.respond({ ok: true })
+ expect(mock.getInstance('myChromeBrowser').calls).toHaveLength(1)
+ expect(mock.instances).toEqual(['myChromeBrowser', 'myFirefoxBrowser'])
```

يطلق `getInstance` الخطأ `Multi-remote object has no instance named "<name>"` عندما لا يكون الاسم أحد `instances`. الـ mock الناتج عن `browser.select('myFirefoxBrowser', 'myChromeBrowser')` يسرد تلك النسخ بهذا الترتيب، الذي قد يختلف عن `browser.instances`. لا تفترض أن `mocks[0]` متصفح معيّن.

## استجابات Mock التي تتخطى الواجهة الخلفية

لا يستدعي `mock.respond(..., { fetchResponse: false })` الواجهة الخلفية. في v9، كان الـ mock الذي يرشّح أيضًا على `statusCode` أو `responseHeaders` يتجاهل ذلك المرشّح ويستمر في الإجابة على كل طلب مطابق. في v10، يطلق `respond()` و`respondOnce()` خطأً، لأن تلك المرشّحات لا يمكن الحكم عليها إلا من استجابة الواجهة الخلفية.

```diff
- const mock = await browser.mock('**/users', { statusCode: 200 })
- mock.respond({ name: 'Ada' }, { fetchResponse: false })
+ const mock = await browser.mock('**/users')
+ mock.respond({ name: 'Ada' }, { fetchResponse: false })
```

للاحتفاظ بالمرشّح، احذف `fetchResponse` حتى يجلب الـ mock الاستجابة، ويتحقق من الحالة أو الترويسات، ثم يستبدل المحتوى.

## مراجع العناصر

تستخدم معرّفات العناصر مفتاح W3C WebDriver وهو `element-6066-11e4-a52e-4f735466cecf` والخاصية `elementId`. لم يعد حقل JSON Wire Protocol المسمّى `ELEMENT` جزءًا من عقد العنصر.

لم يعد `WebdriverIO.Element` يعرّف `ELEMENT`. اقرأ `element.elementId`، الذي تكشفه نسخ العناصر بالفعل.

يمرّر `browser.execute`، والسكربتات المدمجة التي ترسل عنصرًا إلى الصفحة (`getHTML` و`isClickable` و`isDisplayed` و`scrollIntoView` والبقية)، مرجع W3C فقط:

```diff
- await browser.execute((el) => el.ELEMENT, elem)
+ await browser.execute(
+     (el) => el['element-6066-11e4-a52e-4f735466cecf'],
+     elem
+ )
```

محتوى استجابة find-element الذي يحتوي فقط على `{ ELEMENT: '...' }` ليس عنصرًا. أدرج مفتاح W3C. إذا وُجد المفتاحان، يستخدم WebdriverIO معرّف W3C.

يطبع Jasmine نتيجة `$()` المتسلسلة عبر `toJSON`. تلك القيمة هي مرجع W3C نفسه، `{ 'element-6066-11e4-a52e-4f735466cecf': elementId }`.

مع WebDriver BiDi، السكربت الذي يعيد `NodeList` (مثلًا من `querySelectorAll`) أو `HTMLCollection` (مثلًا `element.children`) يعطي الآن قائمة من مراجع العناصر، كما يفعل WebDriver Classic. في v9 كان يعطي قيم BiDi خامًا، لذا كان `browser.execute` يعيد كائنات ليست عناصر، ولم تكن استراتيجية `custom$` أو `custom$$` التي تعيد `querySelectorAll(...)` تعثر على أي عنصر. لا يزال الحل البديل مثل `Array.from(document.querySelectorAll(...))` يعمل، ويمكنك إزالته:

```diff
  browser.addLocatorStrategy('byCss', (selector) =>
-     Array.from(document.querySelectorAll(selector))
+     document.querySelectorAll(selector)
  )
```

## محدِّدات React

يعمل `react$` و`react$$` الآن مع React من 16 إلى 19، للتطبيق الذي يبدأ باستخدام `createRoot` أو `ReactDOM.render`. في السابق، كان `browser.react$` و`browser.react$$` يفشلان مع React 18 وما بعده (`Could not find the root element of your application`)، وفي كل الإصدارات كان يمكن أن تأتي النتيجة من التصيير الذي سبق آخر تحديث، لذا لم يكن يُعثر على مكوّن أضافه تغيير في الحالة.

على صفحة لم يصيّر فيها React جذرًا بعد، تنتظر الأوامر الآن حتى 5 ثوانٍ قبل أن تفشل. في السابق، كانت تفشل فورًا، لذا لم يكن يُعثر على تطبيق يبدأ متأخرًا.

لم تعد الأوامر تستخدم مكتبة [resq](https://github.com/baruchvlz/resq)، ولم يعد WebdriverIO يثبّتها. لا تتغير قواعد المحدِّدات (راجع [محدِّدات React](/docs/selectors#react-selectors))، باستثناء ما يلي:

- يعثر `react$` مع كلٍّ من `props` و`state` على مكوّن يطابق كليهما. في السابق، كان يتجاهل `props` عند إعطاء `state` أيضًا.
- يعطي `react$$` كل عقدة DOM مرة واحدة. في السابق، كان المكوّن عالي الرتبة وابنه يعطيان العنصر نفسه مرتين في بعض المتصفحات.
- الـ fragment الذي يحتوي على fragment يعطي قائمة مسطّحة واحدة من العقد. في السابق، كان يمكن أن يعيد `react$` قائمة.
- يعمل المرشّح ذو القيمة `null`. في السابق، كان يفشل برسالة `Cannot convert undefined or null to object`.
- بدون نطاق عنصر، تبحث الأوامر في كل جذور React في الصفحة، بترتيب المستند، بما في ذلك الجذور الموجودة داخل جذور أخرى والجذور في shadow roots المفتوحة. يعطي `react$` أول تطابق. في السابق، كانت تبحث في الجذر الأول فقط، حتى لو كان React لم يصيّره بعد أو أزاله، ولم تكن تبحث في shadow roots. على صفحة تحتوي على أكثر من جذر، قد يعطي `react$$` الآن عناصر أكثر: للبحث في جذر واحد فقط، استدعِ الأمر على حاويته، مثل `$('#root').react$$('MyComponent')`.
- على حاوية جذر موجود داخل جذر آخر، تبحث الأوامر في الجذر الداخلي. في السابق، كانت تبحث في الجذر الخارجي.
- على سياق التصفح الخاص بإطار، وعلى عنصر في إطار، تعمل الأوامر. في السابق، كان أمر السياق يفشل برسالة `this.executeScript is not a function`، وكان أمر العنصر يفشل برسالة `Could not find instance of React in given element`.

أُزيل السكربت الداخلي `webdriverio/scripts/resq`.

## اختبار المكوّنات

يعيد `@wdio/browser-runner` تصدير `fn` و`spyOn` وأنواع الـ mock من `@vitest/spy` 5 (سابقًا 3). الـ mock الذي تستدعيه شيفرتك باستخدام `new` يحتاج إلى تطبيق من نوع `function` أو `class`. تطلق الدالة السهمية الخطأ `is not a constructor`، ويطلق `mockReturnValue` خطأً عندما يُستدعى الـ mock باستخدام `new`.

```diff
- const Client = fn(() => ({ close: fn() }))
+ const Client = fn(function () { return { close: fn() } })
```

لتغييرات الـ spy الأخرى، راجع [دليل الترحيل الخاص بـ Vitest](https://vitest.dev/guide/migration).

## Puppeteer

يقبل `webdriverio` الحزمة `puppeteer-core` بالنطاق `>=24 <26`، بما في ذلك Puppeteer 25. يتم اختبار `getPuppeteer()` و`@wdio/lighthouse-service` على هذا الخط.

## ESLint

يتطلب `eslint-plugin-wdio` الإصدار ESLint 10. وصل ESLint 9 إلى [نهاية عمره](https://eslint.org/version-support/) في 2026-08-06 ولم يعد مدعومًا. مع TypeScript، استخدم `typescript-eslint` 8.56.0 أو أحدث.

```sh
npm install --save-dev eslint@10 eslint-plugin-wdio
```

يصدّر `eslint-plugin-wdio` فقط الإعداد المسطّح `flat/recommended`. أُزيل اسم eslintrc وهو `plugin:wdio/recommended`.

```js
import { configs as wdioConfig } from 'eslint-plugin-wdio'

export default [
    wdioConfig['flat/recommended'],
]
```

ينتقل الإعداد الموصى به إلى القاعدة `wdio/no-floating-promise` الواعية بالأنواع، بدلًا من `wdio/await-expect`، عندما تكون الحزمة `typescript-eslint` مثبّتة. لا يكفي تثبيت `@typescript-eslint/eslint-plugin` وحدها.

```sh
npm install --save-dev typescript typescript-eslint
```

في هذا الوضع، يحلّل الإعداد كل ملف يطابقه باستخدام خدمة مشروع TypeScript. اقصره على ملفات TypeScript، وتأكد من أنها جزء من `tsconfig.json`:

```js
import { configs as wdioConfig } from 'eslint-plugin-wdio'

export default [
    { files: ['**/*.{ts,mts,cts,tsx}'], ...wdioConfig['flat/recommended'] },
]
```

ملف JavaScript المطابَق الذي ليس ضمن مشروع TypeScript، مثل `wdio.conf.js`، يفشل برسالة "was not found by the project service". لفحص ملفات JavaScript أيضًا، اضبط `"allowJs": true`، وأضفها إلى `include` في `tsconfig.json`، ووسّع النمط إلى `**/*.{js,mjs,cjs,ts,mts,cts,tsx}`.

## أطر العمل المخصصة

لم يعد `setupExpect` في محوّل إطار عمل مخصص يقبل `Map` من المطابِقات، ولم يعد المشغّل يضيف تابع `entries` إلى كائن المطابِقات. كرّر باستخدام `Object.entries(wdioMatchers)`.

## ملف تعريف Firefox

لم يعد `@wdio/firefox-profile-service` يتعامل مع `legacy` كخيار للخدمة. كانت تلك الراية تنطبق فقط على Firefox 55 وما قبله. احذفها. يُكتب `legacy: true` المتبقي في ملف التعريف كتفضيل باسم `legacy`.

## بروتوكول WebDriver

كل جلسة هي جلسة [W3C WebDriver](https://w3c.github.io/webdriver/). لا يتحدث WebdriverIO بروتوكول JSON Wire Protocol ولا Mobile JSON Wire Protocol. أزال v9 تلك الأوامر. ويتخلى v10 أيضًا عن غلاف الاستجابة الذي كانت تستخدمه تلك البروتوكولات، لذا لا يمكن للخادم الذي لا يزال يعيده أن يبدأ جلسة.

أُزيل `browser.isW3C`، بما في ذلك القيمة التي كانت تُمرَّر سابقًا في رسالة `sessionStarted` الخاصة بالعامل. يتم تجاهل تمرير `isW3C` إلى `attach`. تبقى مجموعة أوامر BiDi على العميل. ولا يزال اتصال BiDi الحي يعتمد على `webSocketUrl`.

### `browser.back()` و`browser.forward()` في BiDi

تبقى مواضع الاستدعاء `await browser.back()` و`await browser.forward()`. لا يأخذ أيٌّ من الأمرين وسيطًا ولا يعيد قيمة.

في جلسة BiDi، يستدعي هذان الأمران `browsingContext.traverseHistory` مع `delta` بالقيمة `-1` أو `1` على سياق التصفح ذي المستوى الأعلى، ثم ينتظران جاهزية المستند التي يُعيَّن إليها `pageLoadStrategy`. تعود `none` عندما يُقبل أمر التنقل. وتنتظر `eager` الحدث `browsingContext.domContentLoaded`. وتنتظر `normal`، وهي الافتراضية، الحدث `browsingContext.load`. لا تُطلق استعادة ذاكرة التخزين المؤقت للرجوع والتقدم (back-forward cache) تلك الأحداث؛ يعود الأمر عندما تطابق `readyState` للمستند المُلتزَم الاستراتيجية بالفعل. يستخدم الانتظار مهلة تحميل الصفحة للجلسة (`timeouts.pageLoad`، 300000 ms عند عدم ضبطها). لا تزال الجلسات الكلاسيكية ترسل إلى `POST /session/:sessionId/back` و`POST /session/:sessionId/forward`.

لا يزال إدخال السجل المفقود يؤدي إلى الرفض. في BiDi تأتي الرسالة من `browsingContext.traverseHistory` وتحتوي على `no such history entry`، بدلًا من نص خطأ WebDriver الكلاسيكي. التنقل الذي لا يصل أبدًا إلى الجاهزية المتوقعة يُرفض برسالة `History traversal timed out after <ms>ms waiting for browsingContext.domContentLoaded` أو `browsingContext.load`.

### استجابة الجلسة الجديدة

يجب أن يعيد Create Session محتوى W3C. يقرأ WebdriverIO كلًّا من `value.sessionId` و`value.capabilities`:

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

يُرفض محتوى JSON Wire Protocol. ذلك المحتوى يضع `sessionId` و`status` بجوار `value`، ويضع الـ capabilities في `value` نفسها:

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

عندها يطلق إنشاء الجلسة الخطأ `WebDriver new session response is missing a session id or capabilities. WebdriverIO requires a W3C WebDriver server.` ويُطلق الخطأ نفسه عندما يكون `value.capabilities` مفقودًا، حتى لو كان `value.sessionId` موجودًا.

لا يزال كائن capability المسطّح في إعدادك صالحًا. يغلّف WebdriverIO الكائن `{ browserName: 'chrome' }` داخل `alwaysMatch` قبل إرسال الطلب. لا تزال المفاتيح ذات بادئة المورِّد الممزوجة بمفاتيح خارج مجموعة capabilities الخاصة بـ W3C مرفوضة. ضع إعدادات المورِّد في `sauce:options` أو `bstack:options` أو `appium:options` أو مفتاح آخر ذي بادئة.

### استجابات الأوامر

نتيجة الأمر هي `{ "value": … }`. HTTP 200 بدون `error` في `value` يعني النجاح. العنصر المفقود هو HTTP 404 مع ضبط `value.error` على `"no such element"`، وهو ما لا يزال يسمح بالبحث الكسول عن العنصر. يتم تجاهل `status` الرقمي في المحتوى، بما في ذلك `status: 0` والرمز القديم `status: 7` ("no such element"). أرسل كائن خطأ W3C بدلًا من ذلك.

أصبح نوع الخطأ المُصدَّر `JSONWPCommandError` الآن `SessionRequestError`.

### الخوادم

المشغّلات التي يعمل WebdriverIO عليها تتحدث W3C بالفعل في اتصال العميل:

- أصبح ChromeDriver يستخدم W3C افتراضيًا منذ Chrome 75. ويطابقه Edge المبني على Chromium. لا يزال ChromeDriver الحالي يقبل `goog:chromeOptions.w3c: false`، الذي يعيد تلك الجلسة الواحدة إلى البروتوكول القديم. لا يدعم WebdriverIO ذلك التحويل.
- geckodriver وsafaridriver الخاص بـ Apple يدعمان W3C فقط. استجابة Safari التي تحذف `platformName` أو `browserVersion` لا تزال W3C.
- Selenium 4 وGrid 4 يتحدثان W3C. توقف Grid عن ترجمة JSON Wire Protocol في 4.9.
- تخلى Appium 2 عن JSON Wire Protocol وMobile JSON Wire Protocol. وتخلى Appium 3 أيضًا عن أشكال المعاملات المتبقية. يتطلب v10 الإصدار Appium 3، كما هو موضح أدناه. جلسة الأجهزة المحمولة التي تحذف `setWindowRect` لا تزال W3C؛ تعني تلك الـ capability أن الجهاز لا يستطيع تغيير حجم النافذة.

هذه الخوادم لا تزال تتحدث JSON Wire Protocol وهي غير مدعومة: Selenium 3 وPhantomJS وEdgeHTML (`--jwp`) وWinAppDriver عند الاتصال به مباشرة. يبقى مشغّل Appium الخاص بـ Windows مدعومًا كعميل W3C. فهو يترجم الأوامر إلى WinAppDriver، بما في ذلك Get Element Property إلى نقطة نهاية السمات. وجّه WebdriverIO إلى Appium، وليس إلى منفذ WinAppDriver.

لا تجعل [`@wdio/jsonwp-service`](https://www.npmjs.com/package/@wdio/jsonwp-service) تلك الخوادم تعمل مع v10. لا يزال بدء الجلسة يتطلب محتوى W3C المذكور أعلاه، ولا تزال نتائج الأوامر تتجاهل `status` الرقمي. ابقَ على WebdriverIO 9 إذا كان ذلك الخادم لا يزال مطلوبًا.

لم يعد `webdriver.remote.sessionid` يميّز جلسة Selenium standalone. لا يزال يتم اكتشاف Selenium Grid 4 من `se:cdp`.

مفتاح المهلة `page load` مغطّى في قسم [`setTimeout`](#settimeout). ومعرّفات العناصر مغطّاة في قسم [مراجع العناصر](#element-references). على سطح المكتب، `[name="..."]` محدِّد CSS. وتبقى استراتيجية التحديد `name` لجلسات الأجهزة المحمولة.

## Appium

يتطلب WebdriverIO 10 الإصدار **Appium 3** والمشغّلات الرسمية الحالية (UiAutomator2 وXCUITest وEspresso وWindows وMac2 وغيرها). Appium 1.x و2.x غير مدعومين. ابقَ على WebdriverIO 9 إذا لم تتمكن من ترقية الخادم.

```sh
npm i -D appium@^3
appium driver update installed
```

يعلن `@wdio/appium-service` عن اعتمادية نظيرة اختيارية `appium` بالنطاق `>=3` ويرفض تشغيل خادم أقدم. يثبّت `create-wdio` الحزمة `appium@^3` عندما يكون Appium مفقودًا أو أقدم من 3.

مزوّدو الخدمات السحابية الذين لا يزالون يوفّرون Appium 2 يحتاجون إلى صورة Appium 3، وإلا عليك البقاء على WebdriverIO 9.

### لم تعد أوامر الأجهزة المحمولة تتراجع إلى HTTP

في v9، كانت العديد من مساعدات الأجهزة المحمولة تحاول `browser.execute('mobile: …')`، وعند حدوث خطأ تابع غير معروف، كانت تتراجع إلى نقطة نهاية Appium HTTP مُزالة. في v10 أُزيل هذا التراجع: الخطأ نفسه يطلب منك الترقية إلى Appium 3. فضّل أوامر الأجهزة المحمولة في WebdriverIO (`browser.lock()`، `browser.shake()`، …) أو `browser.execute('mobile: …')` مباشرة.

### أوامر البروتوكول المُزالة

[أزال Appium 3 العديد من نقاط النهاية المُهمَلة في المشغّل الأساسي](https://appium.io/docs/en/latest/guides/migrating-2-to-3/). لم يعد WebdriverIO يكشف توابع العميل لمعظم تلك المسارات (مثل `appiumLock` و`touchPerform` وخريطة Mobile JSON Wire Protocol). استخدم W3C Actions، أو أمر الأجهزة المحمولة المقابل، أو تابع execute من نوع `mobile:` الخاص بالمشغّل بدلًا من ذلك.

### نطاق `--allow-insecure` في Appium

يتطلب Appium 3 بادئة نطاق للمشغّل أو `*` في ميزات `--allow-insecure`، مثل `uiautomator2:adb_shell` أو `*:adb_shell`.

### لم تعد capabilities الخاصة بـ Appium غير المسبوقة ببادئة تختار جلسة Appium

لم تعد `automationName` و`deviceName` و`appiumVersion` بدون البادئة `appium:` تخبر WebdriverIO بتخطي مشغّل المتصفح وإرفاق خدمة Appium. استخدم الـ capability ذات البادئة، أو ضعها داخل `appium:options`:

```diff
- capabilities: { platformName: 'Android', automationName: 'UiAutomator2', deviceName: 'emulator' }
+ capabilities: {
+     platformName: 'Android',
+     'appium:automationName': 'UiAutomator2',
+     'appium:deviceName': 'emulator'
+ }
```

يُصدر `wdio repl` الآن تلك المفاتيح ذات البادئة، بما في ذلك `appium:app` و`appium:platformVersion` و`appium:udid`.

### `getValue` على الأجهزة المحمولة يقرأ خاصية العنصر

يستدعي `element.getValue()` الأمر Get Element Property في كل جلسة، بما في ذلك Appium 3. في جلسة الأجهزة المحمولة كان يستدعي سابقًا Get Element Attribute.

### توحيد توقيع `stopRecordingScreen` مع `startRecordingScreen`

أصبح `driver.stopRecordingScreen` الآن يقبل وسيطًا واحدًا فقط هو `options`، بدلًا من الوسائط الأربعة السابقة، بما يتماشى مع `driver.startRecordingScreen`. انقل الوسائط الفردية إلى داخل كائن:

```diff
- driver.stopRecordingScreen('webdriver.io', undefined, undefined, 'POST')
+ driver.stopRecordingScreen({ remotePath: 'webdriver.io', method: 'POST' })
```

## تسمية Multi-remote

واجهات API المكتوبة بـ `multiremote` أو `Multiremote` أصبحت الآن بصيغة camelCase / PascalCase أي `multiRemote` / `MultiRemote`. لا توجد أسماء بديلة للأسماء القديمة.

| v9 | v10 |
|----|-----|
| `multiremote()` (`webdriverio`) | `multiRemote()` |
| `WebdriverIO.MultiremoteConfig` | `WebdriverIO.MultiRemoteConfig` |
| `isMultiremote` على المتصفح ونتائج `$` و`$$` | `isMultiRemote` |
| `Capabilities.RequestedMultiremoteCapabilities` | `Capabilities.RequestedMultiRemoteCapabilities` |
| `Capabilities.WithRequestedMultiremoteCapabilities` | `Capabilities.WithRequestedMultiRemoteCapabilities` |
| `runner.isMultiremote` (المُبلِّغات) | `runner.isMultiRemote` |
| `Launcher#isMultiremote`، `Launcher#isParallelMultiremote` (`@wdio/cli`) | `isMultiRemote`، `isParallelMultiRemote` |
| `isMultiremote` في `Workers.WorkerMessage` و`WorkerInstance` (`@wdio/local-runner`) و`SpecReporter#getTestLink()` | `isMultiRemote` |
| `browser.multiremoteFetch()` (`@wdio/webdriver-mock-service`) | `browser.multiRemoteFetch()` |

ابحث عن `multiremote` و`Multiremote` (مع مراعاة حالة الأحرف) واستبدل كل تطابق. تصنّف تقارير Allure أيضًا اختبارات multi-remote بـ `isMultiRemote` بدلًا من `isMultiremote`.

## الشاشات الافتراضية على Linux

استُبدلت `@wdio/xvfb` بـ `@wdio/display-server`. بدلًا من تغليف كل عامل في `xvfb-run`، يبدأ مشغّل الاختبارات خادم عرض واحدًا للتشغيل بأكمله، قبل الـ hook المسمّى `onPrepare` لأي خدمة. يفضّل Weston في الوضع الخفي (headless) ويتراجع إلى Xvfb. راجع [الوضع الخفي وخوادم العرض](/docs/headless-and-display-servers) للتفاصيل.

أُعيدت تسمية الخيارات. لا تزال الأسماء القديمة تعمل في v10 لكنها تسجّل تحذير إهمال، وستُزال في v11. إذا ضبطت كلا الاسمين، فالاسم الجديد هو الذي يُعتمد:

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

ليس لـ `xvfbMaxRetries` و`xvfbRetryDelay` أي تأثير، وسيُزالان أيضًا في v11. لم تعد عملية البدء تُعاد: إذا فشل Weston في البدء، يحاول مشغّل الاختبارات Xvfb، وإذا لم يبدأ أيٌّ منهما، يستمر التشغيل بدون شاشة.

الإعداد الذي يضبط أحد الخيارات الأربعة المُعاد تسميتها بدون بديله، ولا يضبط `displayServer`، يستمر في استخدام Xvfb كما كان في v9. وما لم يُعطّل خادم العرض، فإنه يسجّل أيضًا `Preferring Xvfb, as v9 did, because the config sets v9 display keys`. بمجرد إعادة تسمية الخيارات، أضف `displayServer: 'xvfb'` للاحتفاظ بـ Xvfb، أو اتركه لتفضيل Weston. في الوضع التلقائي يعمل أمر التثبيت المخصص لـ Weston أولًا، ومرة أخرى لـ Xvfb فقط إذا ظل Weston غير متاح أو فشل في البدء وظل Xvfb مفقودًا، لذا اضبط `displayServer` على الخادم الذي يثبّته الأمر لتخطي محاولة الخادم الآخر.

لم يعد التثبيت التلقائي يدعم `yum`، الذي كان v9 يستخدمه على المضيفات التي لا تحتوي على `dnf`. يكتشف v10 فقط `apt-get` و`dnf` و`zypper` و`pacman` و`apk` و`xbps-install`، لذا ثبّت Xvfb بنفسك على مضيف لا يحتوي إلا على `yum`.

كانت مصفوفة `xvfbAutoInstallCommand` تعمل عبر shell في v9، لذا كانت عناصر مثل `&&` أو `VAR=value` تعمل. تعمل المصفوفات الآن بدون shell تحت أي من اسمي الخيار، لذا استخدم نصًا لصياغة الـ shell.

تغييرات أخرى قد تلاحظها:

- يتشارك جميع العمال شاشة واحدة. في v9، كان لكل عامل شاشته الخاصة. قد تفتقر صفحات Chrome وEdge الآن إلى التركيز، راجع [تركيز النافذة](/docs/headless-and-display-servers#window-focus).
- رقم شاشة Xvfb ليس ثابتًا. اقرأه من `DISPLAY` بدلًا من افتراض `:99`.
- المضيف الذي لم يُضبط فيه سوى `WAYLAND_DISPLAY` يُعتبر الآن مضيفًا لديه شاشة. كان v9 يشغّل العمال تحت Xvfb هناك، لأن `DISPLAY` لم يكن مضبوطًا. لا يبدأ v10 شيئًا، ويفتح نوافذ المتصفح على الـ compositor الخاص بك، ويضبط `XDG_SESSION_TYPE` و`GDK_BACKEND` و`ELECTRON_OZONE_PLATFORM_HINT` على `wayland` للتشغيل. لتشغيلها تحت Xvfb كما في السابق، ألغِ ضبط `WAYLAND_DISPLAY` واضبط `displayServer: 'xvfb'`.
- الشاشة الافتراضية بحجم 1920x1080. كان v9 يستخدم الحجم الافتراضي لـ `xvfb-run`، وهو 1280x1024 على Debian وUbuntu و640x480 على Fedora وRHEL وArch. للحفاظ على الحجم الذي تستخدمه صورك المرجعية، اضبط `displayServerWidth` و`displayServerHeight` عليه.
- تختار المتصفحات Wayland أو X11 بناءً على `XDG_SESSION_TYPE` الذي يضبطه خادم العرض. تحت Weston، يضيف WebdriverIO أيضًا `--ozone-platform=wayland` إلى Chrome وEdge اللذين يشغّلهما، لأن Chrome وEdge قبل 140 (وChrome for Testing قبل 135) يتجاهلان `XDG_SESSION_TYPE`. لا يوفّر Weston أي `DISPLAY`، لذا إذا كانت اختباراتك أو أدواتك تحتاج إلى X11، فاضبط `displayServer: 'xvfb'`.
- إذا كنت تستخدم `XvfbManager` أو نسخة `xvfb` من `@wdio/xvfb` مباشرة، فاستخدم `DisplayServerManager` من `@wdio/display-server` بدلًا منها. حيثما كنت تشغّل `xvfb.init()` وتغلّف الأوامر في `xvfb-run`، أو تُنشئ العمليات عبر `ProcessFactory`، ابدأ شاشة ومرّر بيئتها إلى العمليات التي تحتاجها. يستخدم المثال Xvfb بحجم 1280x1024، كما كان v9 يفعل على Debian وUbuntu. على مضيف لم يُضبط فيه سوى `WAYLAND_DISPLAY`، ألغِ ضبطه أولًا، وإلا فلن يبدأ `startDaemon()` أي شيء:

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

يقود `browser.emulate()` وحدة المحاكاة في WebDriver BiDi لسياق التصفح ذي المستوى الأعلى الحالي. كان v9 يحقن سكربت تحميل مسبق يعدّل `navigator.geolocation.getCurrentPosition` و`navigator.userAgent` و`window.matchMedia` و`navigator.onLine`. أُزيلت تلك السكربتات. لا يزال `browser.emulate('clock', …)` يثبّت مؤقتات وهمية في الصفحة الحالية وفي الصفحات التي تُفتح بعدها.

لم تعد إعادة التحميل مطلوبة لنطاقات BiDi.

```diff
  await browser.emulate('onLine', false)
- // تغيّر `navigator.onLine` فقط؛ واستمرت حركة المرور
+ // سياق التصفح غير متصل، بما في ذلك fetch وWebSocket وWebTransport
```

- يستدعي `onLine: false` الأمر `emulation.setNetworkConditions` مع `{ type: 'offline' }`. تؤدي `true` واستعادة النطاق إلى مسحه. يبقى التحكم في الإنتاجية وزمن الاستجابة عبر `browser.throttleNetwork()`.
- يضبط `colorScheme` ميزة الوسائط `prefers-color-scheme`، لذا يتبع CSS `@media (prefers-color-scheme)` نتيجة `matchMedia`.
- `userAgent` هو تجاوز user-agent الخاص بالمتصفح، وليس خاصية `navigator.userAgent` معدّلة.
- يستخدم `geolocation` مكدّس تحديد الموقع الجغرافي الخاص بالمتصفح. قد تظل الصفحة بحاجة إلى `browser.setPermissions({ name: 'geolocation' }, 'granted')`. يُبلغ `{ error: 'positionUnavailable' }` عن ذلك الخطأ بدلًا من الإحداثيات.
- يتشارك `colorScheme` و`media` خريطة ميزات وسائط واحدة. يستبدل الاستدعاء اللاحق الخريطة بالكامل، واستعادة أي من النطاقين تمسحها.
- يضبط `device` وكيل المستخدم، ومنفذ العرض، واللمس، وتخطيط النص للأجهزة المحمولة، وviewport meta من واصف الجهاز. ولا يغيّر `screen` أو `orientation`.

النطاقات الجديدة هي `media` و`locale` و`timezone` و`touch` و`orientation` و`screen` و`viewportMeta` و`textLayout` و`scripting` و`scrollbar` و`forcedColors`. المتصفح الذي لا يطبّق أمرًا يرفض الاستدعاء بخطئه الخاص (`unknown command` أو `unsupported operation`). لا يتراجع WebdriverIO إلى سكربت تحميل مسبق أو إلى CDP. إذا رُفض `device` في منتصف العملية، تُعاد قيم وكيل المستخدم ومنفذ العرض واللمس وتخطيط النص وviewport meta السابقة.

يقبل `wdio session emulate` النطاقات نفسها. ولم يعد يطلب منك إعادة التحميل لتجاوز يُطبَّق فورًا. إعدادات `emulate network` المسبقة و`emulate cpu` لم تتغير وتبقى خاصة بـ Chromium فقط. راجع [المحاكاة](/docs/emulation).

## الخطوات التالية

- انسخ [مهارة الترحيل](#migrate-with-a-coding-agent) إلى المشروع واطلب من وكيل تطبيقها.
- [WebdriverIO لوكلاء البرمجة](/docs/ai-agents) لكتابة اختبارات v10 جديدة.
- [الوضع الخفي وخوادم العرض](/docs/headless-and-display-servers) عندما تعمل مجموعة الاختبارات على Linux.