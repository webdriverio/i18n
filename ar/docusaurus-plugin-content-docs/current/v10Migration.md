---
id: v10-migration
title: من v9 إلى v10
description: ترقية مشروع WebdriverIO من الإصدار v9 إلى v10، مع شرح كل تغيير جذري، ومهارة لوكيل البرمجة تطبّق هذا الدليل.
---

يجمع هذا الدليل التغييرات الجذرية في WebdriverIO `v10`، وما يجب عليك فعله حيال كل منها.

على عكس الإصدارات الرئيسية السابقة، لا يستطيع [codemod](https://github.com/webdriverio/codemod) الخاص بـ WebdriverIO تطبيق معظم هذه التغييرات، لأنها تعتمد على ما تعنيه اختباراتك فعلًا. [توقيعات الأوامر القديمة](#legacy-command-signatures) أدناه هي استبدالات آلية. ويشرح كل قسم آخر كيفية العثور على المواضع المتأثرة في مجموعة اختباراتك.

## الترحيل باستخدام وكيل برمجة {#migrate-with-a-coding-agent}

أعطِ وكيلك مهارة الترحيل إلى v10، واطلب منه ترحيل مجموعة الاختبارات إلى WebdriverIO v10 باتباع هذه الصفحة. تحدد المهارة الإجراء: ما الذي يجب البحث عنه، وأي codemod يجب تشغيله، ومتى يجب التوقف. أما هذه الصفحة فهي المرجع الأساسي لكل تغيير جذري.

ثبّت المهارة من داخل المشروع الذي تقوم بترقيته. تقرأ [أداة skills CLI](https://skills.sh) الملف [`.agents/skills/wdio-v10-migration/SKILL.md`](https://github.com/webdriverio/webdriverio/blob/main/.agents/skills/wdio-v10-migration/SKILL.md) من هذا المستودع، وتكتبه في مجلد المهارات الخاص بالوكلاء الذين تختارهم:

```sh
npx skills add webdriverio/webdriverio --skill wdio-v10-migration
```

يثبّت الخيار `--skill wdio-v10-migration` هذه المهارة. أما المهارات المخصصة للعمل على مستودع WebdriverIO فهي معلَّمة على أنها داخلية ولا تُعرض. تسألك أداة CLI عن الوكلاء الذين تريد التثبيت لهم، ثم تكتب المهارة في مجلد المشروع الخاص بكل وكيل. يمكنك أيضًا إرفاق هذا الملف بالمحادثة.

لا تظهر المحددات الصارمة وقوائم `specs` / `exclude` المجردة في الـ capabilities إلا عند تشغيل مجموعة الاختبارات. ولا تستطيع المهارة الحكم عليها من الشيفرة المصدرية وحدها.

## Node.js

يتطلب WebdriverIO v10 الإصدار Node.js 22.19.0 أو أحدث. لم يعد Node.js 18 و20 مدعومين. يغطي نظام CI الإصدارات Node.js 22 و24 و26.

## اختبارات المكوّنات

لا يزال مشغّل المتصفح يعمل على Chrome 90 وEdge 90 وFirefox 90 وSafari 14.1 أو أحدث. راجع [دعم المتصفحات](/docs/component-testing#browser-support).

تبقى الشيفرة المُمرَّرة إلى `browser.execute` عند مستوى ES2021، حتى تتمكن من العمل في المتصفحات الأقدم قيد الاختبار. لم يتغير هذا الحد الأدنى.

## Mocha

تعتمد الحزمتان `@wdio/mocha-framework` و`@wdio/browser-runner` على [Mocha 12](https://mochajs.org/blog/mocha-12-stable/). يحتاج Mocha 12 إلى Node.js `^20.19.0 || >=22.12.0`، وهو ما يغطيه الحد الأدنى لـ v10 وهو 22.19.0.

```diff
- mochaOpts: { compilers: ['ts:ts-node/register'] }
+ mochaOpts: { require: ['ts-node/register'] }
```

أُزيل `mochaOpts.compilers`. فقد أزال Mocha الخيار `--compilers` المهمل منذ زمن طويل، لذا تُتجاهل أي تعيينات متبقية للمترجمات. حمّل المترجمات (transpilers) أو ملفات الإعداد الأخرى باستخدام `mochaOpts.require`.

القيمة الافتراضية لـ `failHookAffectedTests` هي `true`. أي أن فشل خطاف `before` أو `beforeEach` يُفشل الاختبارات التي تخطاها ذلك الخطاف. اضبط `mochaOpts.failHookAffectedTests` على `false` للإبلاغ عن الخطاف فقط.

استخدم `expect-webdriverio` 8، راجع [expect-webdriverio 8](#expect-webdriverio-8). قد يحمّل Mocha هذه الحزمة مرتين في عملية واحدة؛ وهي تشارك حالة التأكيدات بين هاتين النسختين ([expect-webdriverio#2221](https://github.com/webdriverio/expect-webdriverio/pull/2221)).

تغييرات Mocha 12 التي قد تتسرب عبر `mochaOpts`:

- يقبل `grep` أعلام RegExp الحديثة.
- لا يزال `ui` إحدى القيم `bdd` أو `tdd` أو `qunit` أو `exports`. يجب أن تحتفظ الواجهات المخصصة باللاحقة `*-bdd` أو `*-tdd` أو `*-qunit`.
- لا يزال `parallel` غير مدعوم. يتولى WDIO التوازي على مستوى ملفات الاختبار؛ وسيُطلق مجمع العمال الخاص بـ Mocha خطأً إذا فعّلته.

Mocha 12 يعتمد ESM أولًا (`"type": "module"`). لا يزال الاستدعاء البرمجي `require('mocha')` يعمل على Node 22 عبر `require(esm)`. لم تتغير واجهة سطر أوامر WDIO الخاصة بـ Mocha (`wdio run … --mochaOpts.*`)؛ أما واجهة سطر الأوامر الخاصة بـ Mocha نفسه فتستخدم الآن `util.parseArgs` بدلًا من yargs.

## Cucumber

تعتمد الحزمة `@wdio/cucumber-framework` على [`@cucumber/cucumber` 13](https://github.com/cucumber/cucumber-js/blob/main/UPGRADING.md#1300).

يتطلب Cucumber 13 الإصدار Node.js 22 أو 24 أو 26 أو أحدث. ولا يعمل على Node.js 20 أو 23 أو 25. تعلن حزمة إطار العمل النطاق نفسه، بدءًا من الحد الأدنى لـ v10 وهو 22.19.0.

```diff
- cucumberOpts: { tagExpression: '@smoke' }
+ cucumberOpts: { tags: '@smoke' }
```

ليس لـ `tagExpression` اسم بديل. ضبطه يُطلق خطأً، حتى لا يتسبب مرشّح متبقٍ في تشغيل كل السيناريوهات بصمت.

لم يعد Cucumber 13 يصدّر `Cli`. تمر عمليات التشغيل البرمجية عبر `runCucumber` من `@cucumber/cucumber/api`، وهو ما يستخدمه المحوّل بالفعل.

التغييرات الجذرية الأخرى في Cucumber 13 (مسارات المنسّقات الملتبسة، والعمال المتوازيون، و`BeforeAll` / `AfterAll`) موضحة في [دليل الترقية الخاص بـ Cucumber](https://github.com/cucumber/cucumber-js/blob/main/UPGRADING.md#1300).

## Jasmine

تعتمد الحزمة `@wdio/jasmine-framework` على [Jasmine 6](https://jasmine.github.io/upgrade-guides/6.0). يُختبر Jasmine 6 على Node.js 20 و22 و24. والحد الأدنى لـ v10 وهو 22.19.0 يغطي هذا النطاق بالفعل.

أُزيل `jasmineNodeOpts`. اضبط Jasmine باستخدام `jasmineOpts`. ضبط `jasmineNodeOpts` يُطلق الخطأ:

```text
The option "jasmineNodeOpts" was removed in WebdriverIO v10. Use "jasmineOpts" instead.
```

```diff
- jasmineNodeOpts: { defaultTimeoutInterval: 60000 }
+ jasmineOpts: { defaultTimeoutInterval: 60000 }
```

لم يعد `jasmineOpts.failFast` يُقرأ. استخدم `jasmineOpts.stopOnSpecFailure`. أي `failFast` متبقٍ لا يوقف مجموعة الاختبارات. أما `failFast` الخاص بـ Cucumber فهو خيار مختلف ولا يزال يعمل.

```diff
- jasmineOpts: { failFast: true }
+ jasmineOpts: { stopOnSpecFailure: true }
```

أُزيل `jasmineOpts.stopSpecOnExpectationFailure`. استخدم `jasmineOpts.oneFailurePerSpec`. ضبط المفتاح القديم يُطلق الخطأ:

```text
The option "jasmineOpts.stopSpecOnExpectationFailure" was removed in WebdriverIO v10. Use "jasmineOpts.oneFailurePerSpec" instead.
```

```diff
- jasmineOpts: { stopSpecOnExpectationFailure: true }
+ jasmineOpts: { oneFailurePerSpec: true }
```

عادت المطابِقات المتزامنة في Jasmine متزامنةً من جديد. في v9، كان `expect` العام هو `expectAsync` الخاص بـ Jasmine، لذا كان `expect(1).toBe(1)` يُرجع promise. في v10، تُرجع المطابِقات المدمجة في Jasmine والمطابِقات التي تضيفها عبر `jasmine.addMatchers` القيمة `undefined`. أما مطابِقات WebdriverIO، والمطابِقات غير المتزامنة في Jasmine، ومطابِقات `jasmine.addAsyncMatchers` فلا تزال تُرجع promise، لذا استمر في استخدام `await` معها. لا تحتاج إلى تغيير `await expect($('#logo')).toBeDisplayed()` إلى `expectAsync()`: فـ `expect` العام يرسل مطابِقات WebdriverIO إلى `expectAsync` نيابةً عنك. ويستمر `await expect(1).toBe(1)` في العمل.

أصبح التأكيد المتزامن الفاشل دون `await` يُفشل ملف الاختبار الآن. في v9، كان promise مرفوضًا: فإذا لم ينتظره شيء، قد ينجح الاختبار، مع ظهور رفض غير معالَج في السجل فقط. بعد الترقية، انظر إلى الاختبارات التي تبدأ بالفشل. فقد كان فيها فشل خفي في v9، والإصلاح يكون في الاختبار أو في التطبيق، لا في استدعاء `expect`:

```js
it('saves the form', async () => {
    const onSave = jasmine.createSpy('onSave')
    await submitForm(onSave)
    // v9: ينجح حتى عندما لا يُستدعى `onSave`
    // v10: يفشل عندما لا يُستدعى `onSave`
    expect(onSave).toHaveBeenCalled()
})
```

نتيجة المطابِق المتزامن أصبحت الآن `undefined`، لذا فإن استدعاء `.then()` أو `.catch()` عليها يُطلق `TypeError`:

```diff
- expect(total).toBe(3).then(() => log('ok'))
+ expect(total).toBe(3)
+ log('ok')
```

آثار أخرى لهذا التغيير:

- يوقف `oneFailurePerSpec` الآن الاختبار عند أول تأكيد فاشل: فورًا في حالة المطابِق المتزامن، وعند استقرار الـ promise في حالة المطابِق غير المتزامن المنتظَر.
- تعمل مطابِقات الجواسيس (spy) في Jasmine دون `await`. في v9، كانت `toHaveBeenCalled` و`toHaveSpyInteractions` و`toHaveNoOtherSpyInteractions` تفشل برسالة "Does not take arguments"، وكان الجاسوس غير المستدعى ينجح دون `await`.
- لم يعد `jasmine.addMatchers` يُستبدل، لذا لم يعد Jasmine يعرض تحذيره "Monkey patching detected".

للمطابِق `toHaveSize` معنيان. على قيمة WebdriverIO، يكون هو مطابِق WebdriverIO ويتحقق من حجم العنصر: عنصر، أو مصفوفة عناصر (بما في ذلك نتيجة `$$().filter()`)، أو `Element[]`، أو عنصر multi-remote، أو متصفح، أو سياق تصفح، أو mock، أو الغلاف `some()`، أو promise مثل `$()` القابل للتسلسل. أما على أي قيمة أخرى، فيكون هو مطابِق Jasmine ويتحقق من الطول. في v9، كان مطابِق Jasmine هو الذي يعمل دائمًا.

```js
expect([1, 2]).toHaveSize(2)                                   // Jasmine، متزامن
await expect($('#logo')).toHaveSize({ width: 32, height: 32 }) // WebdriverIO، غير متزامن
```

تتبع الأنواع القواعد نفسها. تُعرّف `@wdio/jasmine-framework` الآن نوع `expect` العام بمطابِقات Jasmine، بالإضافة إلى مطابِقات WebdriverIO والمطابِقات غير المتزامنة في Jasmine، التي تُرجع promise. أزل `expect-webdriverio/jasmine-wdio-expect-async` من `types` في ملف `tsconfig.json`، لأنه يعرّف كل مطابِق على أنه غير متزامن. وأضف `jasmine` إن لم يكن موجودًا:

```diff title="tsconfig.json"
 {
     "compilerOptions": {
-        "types": ["node", "@wdio/globals/types", "expect-webdriverio/jasmine-wdio-expect-async", "@wdio/jasmine-framework"]
+        "types": ["node", "jasmine", "@wdio/globals/types", "@wdio/jasmine-framework"]
     }
 }
```

يعمل `expect.oneOf()` و`expect.multiRemote()` الآن أيضًا في اختبارات Jasmine. سابقًا، لم يكونا موجودين على `expect` الخاص بـ Jasmine وقت التشغيل.

## expect-webdriverio 8 {#expect-webdriverio-8}

تتطلب الحزم `@wdio/globals` و`@wdio/runner` و`@wdio/browser-runner` الحزمة `expect-webdriverio` 8 كاعتمادية نظيرة (peer dependency). في v9، كانت `expect-webdriverio` 7. إذا كان ملف `package.json` يتضمن `expect-webdriverio`، فحدّثه إلى الإصدار 8 في التغيير نفسه الذي تحدّث فيه حزم `@wdio/*`.

لـ `expect-webdriverio` 8 تغييراته الجذرية الخاصة. يسرد [دليل الترحيل من v7 إلى v8](https://github.com/webdriverio/expect-webdriverio/blob/main/docs/Migrations.md#migration-guide-v7-to-v8) الخاص به كل تغيير وبديله. هذه التغييرات هي الأكثر احتمالًا للتأثير على مجموعة الاختبارات:

- يقارن `toHaveText` على `$$()` العناصر فهرسًا بفهرس. المصفوفة المتوقعة بترتيب مختلف عن ترتيب الصفحة تفشل. استخدم ترتيب الصفحة، أو `expect.oneOf()` أو `expect.arrayContaining()`.
- مصفوفة من القيم المتوقعة على عنصر واحد تُفشل `toHaveText` و`toHaveHTML` و`toHaveComputedLabel` و`toHaveComputedRole`. استخدم `expect.oneOf()`.
- أُزيل `setFeatureFlags()` والخيار `featureFlags`.
- أُزيلت واجهات البرمجة المهملة التالية: `setOptions` (استخدم `setDefaultOptions`)، و`getConfig` (استخدم `getDefaultOptions`)، و`matchers` (استخدم `wdioCustomMatchers`)، و`toHaveAttr` (استخدم `toHaveAttribute`)، و`toHaveClass` (استخدم `toHaveElementClass`)، و`toBeRequestedWithResponse()` (استخدم `toBeRequestedWith({ response })`)، و`expect-webdriverio/types` (استخدم `expect-webdriverio/expect-global`).
- يحصل الخطافان `beforeAssertion` و`afterAssertion` على اسم الاسم البديل الذي استدعاه الاختبار، بالنسبة لـ `toBeExisting` و`toBePresent` و`toHaveLink` و`toHaveValue` و`toBeRequested`. في v9، كانا يحصلان على اسم المطابِق الذي يقف خلف الاسم البديل، مثل `toExist` بالنسبة لـ `toBeExisting`.
- على متصفح multi-remote، مرّر نتيجة `$$()` إلى `expect`. لا تُعرف المصفوفة العادية مثل `[...elements]` أو `Array.from(elements)` على أنها عناصر، ويفشل التأكيد.

على متصفح multi-remote، يتحقق تأكيد واحد من كل النسخ، ويعطي `expect.multiRemote()` قيمة متوقعة واحدة لكل نسخة. راجع [تأكيدات Multiremote](/docs/multiremote#assertions).

## المتغير العام لـ Multi-remote

أُزيل المتغير العام `multiremotebrowser` بالأحرف الصغيرة، من `@wdio/globals` ومن المتغيرات العامة في `eslint-plugin-wdio` أيضًا. استخدم `multiRemoteBrowser`.

```diff
- import { multiremotebrowser } from '@wdio/globals'
+ import { multiRemoteBrowser } from '@wdio/globals'
```

## Capabilities

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

تبقى مفاتيح الإعداد في المستوى الأعلى `specs` و`exclude`. القائمة المجردة المتبقية في capability لا تختار ملفات لتلك الـ capability. وعندها تستخدم الـ capability القيمتين `specs` و`exclude` من المستوى الأعلى.

أُزيل الاسمان البديلان `tunnelIdentifier` و`parentTunnel` من أنواع خيارات Sauce Labs. استخدم `tunnelName` و`tunnelOwner`.

## TypeScript

أُزيلت الأنواع `Element` و`MultiRemoteBrowser` و`MultiRemoteElement` التي كانت تصدّرها `webdriverio`. استخدم مساحة الأسماء العامة `WebdriverIO`.

```diff
- import type { Element } from 'webdriverio'
- const elem: Element = await $('#foo')
+ const elem: WebdriverIO.Element = await $('#foo')
```

يعلن `ChainablePromiseElement` الآن عن `then`، ويعلن `ChainablePromiseArray` عن `then` و`catch` و`finally`. تصف الأنواع القابلة للتسلسل القيمة قبل `await`. ولم تعد تناسب القيمة المنتظَرة:

```ts
let elem: ChainablePromiseElement
elem = await $('h1')
// TS2741: Property 'then' is missing in type 'Element' but required in type 'ChainablePromiseElement'.

let elems: ChainablePromiseArray
elems = await $$('li')
// TS2322: Type 'ElementArray' is not assignable to type 'ChainablePromiseArray'.
```

عرّف نوع القيمة المنتظَرة على أنه `WebdriverIO.Element` أو `WebdriverIO.ElementArray`:

```diff
- let elem: ChainablePromiseElement = await $('h1')
- let elems: ChainablePromiseArray = await $$('li')
+ let elem: WebdriverIO.Element = await $('h1')
+ let elems: WebdriverIO.ElementArray = await $$('li')
```

يطابق كلا النوعين القابلين للتسلسل الآن `T extends PromiseLike<unknown>`. النوع الشرطي الذي يتحقق من `PromiseLike` يسلك فرعًا مختلفًا لـ `$()` و`$$()` عمّا كان في v9. على سبيل المثال، أصبح `Awaited<ChainablePromiseElement>` الآن `WebdriverIO.Element`، و`Awaited<ChainablePromiseArray>` أصبح `WebdriverIO.ElementArray`.

تغيّر نوع خصائص `$$()` غير المنتظَر. فهي متاحة فورًا، قبل حل الاستعلام، لذا اقرأها دون `await` أو `.then()`:

| الخاصية | v9 | v10 |
|---|---|---|
| `selector` | `Promise<Selector>` | `Selector \| undefined` |
| `parent` | `Promise<...>` | العنصر الأب، وليس promise (انظر أدناه) |
| `foundWith` | غير موجودة | الأمر الذي عثر على القائمة، مثل `$$` أو `custom$$` |
| `props` | غير موجودة | الوسائط الإضافية لذلك الأمر |

```diff
- const selector = await $$('li').selector
+ const selector = $$('li').selector
```

في استعلام متسلسل مثل `$('form').$$('input')`، يكون `parent` هو `$('form')` القابل للتسلسل إلى أن تُحل القائمة، ثم يصبح العنصر المحلول بعد ذلك. انتظر القائمة قبل أن تستخدم `parent` كعنصر.

وقت التشغيل، تُرجع `filter()` و`filterSeries()` و`slice()` على قائمة `$$()` قائمة عناصر، لا مصفوفة عادية. وتحتفظ النتيجة بـ `selector` و`foundWith` و`parent` و`props` الخاصة بالقائمة المصدر. في v9، كانت `filter()` تُرجع مصفوفة عادية بدون هذه الخصائص. لا تُظهر الأنواع هذا بعد: إذ تُعلَن `filter()` و`filterSeries()` على أنها تُرجع `Promise<WebdriverIO.Element[]>`، وتُرجع `slice()` النوع `WebdriverIO.Element[]`، لذا يُبلغ TypeScript عن خطأ عندما تقرأ هذه الخصائص على النتيجة.

لا يعيد WebdriverIO تشغيل الاستعلام للقائمة المشتقة نفسها: فالفهرس الذي يتجاوز نهايتها لا ينتظر المزيد من التطابقات، ولا يُرجع أبدًا عنصرًا استبعده المرشّح. لا يزال أعضاؤها هم عناصر الاستعلام المصدر، بقيم `selector` و`index` الأصلية. إذا أصبح أحد الأعضاء قديمًا (stale)، يجلبه WebdriverIO مجددًا من الاستعلام المصدر عند ذلك الفهرس، وقد يكون عنصرًا آخر إذا تغيرت الصفحة. الشيفرة التي تعيد تشغيل استعلام القائمة من خصائصها، مثل `parent[foundWith](selector, ...props)`، تحصل على القائمة الكاملة، لا المرشَّحة.

تضبط الحزم المنشورة `typeScriptVersion` على 6.0.3، بما يطابق إصدار TypeScript الذي يُترجم به هذا المستودع.

يقبل `browser.mock()` الكائن `URLPattern` من `urlpattern-polyfill` و`URLPattern` الأصلي (المتاح عالميًا في Node.js 24، والمعرَّف النوع في مكتبة `dom` الخاصة بـ TypeScript 6).

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

يغيّر TypeScript 6 أيضًا القيمة الافتراضية لـ `types` إلى `[]`، لذا لم يعد يحمّل كل حزم `@types/*` المثبتة. إذا لم يكن في ملف `tsconfig.json` قائمة `types`، فستفشل المتغيرات العامة مثل `describe` و`it` الخاصة بـ Mocha برسالة `Cannot find name`. اذكر حزم الأنواع التي تستخدمها اختباراتك، كما يفعل `create-wdio`. على سبيل المثال، مع Mocha:

```diff title="tsconfig.json"
 {
     "compilerOptions": {
+        "types": ["node", "@wdio/globals/types", "@wdio/mocha-framework"]
     }
 }
```

يكتب `npm create wdio@latest` القيمتين `compilerOptions.target` و`compilerOptions.lib` على أنهما `es2024`. يحتاج التحقق من أنواع ذلك الملف إلى TypeScript 5.7 أو أحدث. لا يتحقق `tsx`، الذي يشغّل الإعدادات والاختبارات، من الأنواع، لذا لا يهم المترجم الأقدم إلا عندما تشغّل `tsc` بنفسك.

لا يُعاد كتابة ملف `tsconfig.json` القائم. والإعداد المولَّد الذي يوسّع إعدادًا آخر يحتفظ بقيمتي `target` و`lib` من الإعداد الأب.

في الخطاف `afterAssertion`، أصبح نوع `params.result` الآن `{ pass, message }`، كما تعطيه المطابِقات. في v9، كان النوع `{ result, message }`، لكن `params.result.result` كانت دائمًا `undefined` وقت التشغيل. اقرأ `params.result.pass`:

```diff
  afterAssertion (params) {
-     console.log(params.matcherName, params.result.result)
+     console.log(params.matcherName, params.result.pass)
  }
```

تكون `pass` بقيمة `true` عندما تطابق القيمة القيمة المتوقعة، حتى مع `.not`. وبالتالي مع `.not`، ينجح التأكيد عندما تكون `pass` بقيمة `false`. ولا يخبرك الخطاف ما إذا كان الاختبار قد استخدم `.not`.

## المُبلِّغات (Reporters)

يُمرَّر حدث `result` الخاص بالمتصفح إلى المُبلِّغات على شكل `client:afterCommand`. لم تعد تلك الحمولة ولا النوع `AfterCommandArgs` تحتوي على الخاصية `name`. اقرأ `command` بدلًا منها. كانت الأوامر المخصصة ترسل `command` بالفعل.

```diff
  onAfterCommand(args) {
-     console.log(args.name)
+     console.log(args.command)
  }
```

### Allure

أُزيل `addEnvironment(name, value)` من `@wdio/allure-reporter`. لم يكن له أي تأثير. اضبط صفوف البيئة باستخدام [`reportedEnvironmentVars`](/docs/allure-reporter) في خيارات مُبلِّغ Allure.

## `$` صارم

يمثل `$` الآن __عنصرًا واحدًا بالضبط__. إذا طابق المحدد أكثر من عنصر واحد، يُطلق الأمر `StrictSelectorError` بدلًا من استخدام أول تطابق بصمت:

```js
// v9 — ينقر على أول زر، حتى لو كان هناك 12 زرًا
await $('button').click()

// v10
await $('button').click()
// StrictSelectorError: strict mode violation: `$("button")` resolved to 12 elements, expected 1.
// Use `$$("button")` to work with all matches, `$$("button")[0]` if you explicitly want the first one,
// or narrow down the selector so it matches a single element.
```

يتوافق هذا مع [محددات Playwright](https://playwright.dev/docs/locators#strictness). أما Cypress فيختلف: إذ يمكن أن تُحل استعلاماته إلى عدة عناصر، وأوامر الإجراءات مثل [`.click()`](https://docs.cypress.io/api/commands/click#Click-all-elements-with-id-starting-with-btn) هي التي ترفض افتراضيًا موضوعًا متعدد العناصر. المحدد الذي يطابق عدة عناصر بصمت يكاد يكون دائمًا خللًا كامنًا: فهو ينجح اليوم، ثم يتفاعل مع العنصر الخطأ بمجرد أن يضيف أحدهم زرًا ثانيًا إلى الصفحة.

تنطبق القاعدة على كل خطوة في السلسلة (`$('form').$('input')`) وعلى كل نوع من المحددات التي يقبلها `$` — المحددات النصية (بما في ذلك تلك التي تخترق shadow DOM)، ودوال JS، ومحددات الهاتف المحمول، ومراجع الاستراتيجيات المخصصة.

### ما الذي لم يتغير

- لا يزال `$$` يُرجع صفرًا أو أكثر من العناصر. منذ v10 أصبحت هذه القائمة [`ElementArray`](/docs/api/browser/$$): مصفوفة حقيقية يمكنك انتظارها بـ `await`، مع إتاحة `for await` و`map` / `filter` غير المتزامنتين قبل حلّها. `await $$('button').length` هو العدد. أما `$$('button').length > 0` فليس كذلك، لأن `length` يكون promise إلى أن تُحل القائمة. `for (const el of $$('button'))` يُطلق خطأً إلى أن تنتظر القائمة؛ استخدم `for await`، أو `for...of` بعد `await`.
- الأوامر المساعدة المخصصة `custom$` و`shadow$` و`react$` ليست صارمة — فلا تزال تُرجع أول تطابق، وكذلك نظيراتها من `$$`.
- المحدد الذي لا يطابق شيئًا لا يزال يُرجع عنصرًا يُحل بشكل كسول، لذا يتصرف `waitForExist` و[الانتظار التلقائي](/docs/autowait) كما في السابق.
- تمرير مرجع عنصر، مثل `$(await browser.getActiveElement())`، يشير دائمًا إلى عقدة واحدة ولا يُتحقق منه أبدًا.

### كيف تراجع مجموعة اختباراتك

لا يوجد codemod لهذا: فأنت وحدك من يستطيع تحديد ما إذا كان التطابق الثاني خللًا أم مقصودًا. هناك طريقتان عمليتان:

1. __شغّل مجموعة اختباراتك.__ كل مخالفة تُطلق خطأً يتضمن المحدد وعدد التطابقات، وهذا عادةً كافٍ لإصلاحها فورًا.
2. __تحقق من المحددات العامة مسبقًا.__ لكل `$(...)` عام في كائنات الصفحات لديك، اطبع عدد العناصر التي يطابقها فعلًا:

   ```js
   console.log(await $$('button').length) // 12 → `$('button')` عام أكثر من اللازم
   ```

ثم إما أن تضيّق المحدد — ويُفضَّل نحو استعلام موجه للمستخدم مثل `$('button=Submit')` أو `$('aria/Submit')`، راجع [المحددات](/docs/selectors) — أو أن تصرّح بوضوح بأنك تريد أول تطابق:

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

يتذكر العنصر الطريقة التي استُعلم بها، لذا فإن إعادة جلبه — بعد مرجع عنصر قديم، أو عبر `waitForExist` — تحافظ على صرامة الاستدعاء الأصلي.

:::info

خلف الكواليس، يرسل `$` الصارم طلب `findElements` بدلًا من `findElement`، لأن عدّ التطابقات هو الطريقة الوحيدة لفرض القاعدة. هي رحلة ذهاب وإياب واحدة في كلتا الحالتين، لكنها مرئية للخدمات المخصصة ولمحاكيات WebDriver التي تعتمد على الأمر `findElement`.

:::

## توقيعات الأوامر القديمة {#legacy-command-signatures}

كان v9 لا يزال يقبل الصيغ الموضعية الأقدم مع إصدار تحذير. أما v10 فيقبل كائن الخيارات فقط.

يعيد [codemod](https://github.com/webdriverio/codemod) الخاص بـ v10 كتابة `addCommand` و`overwriteCommand` عندما يكون الوسيط الثالث قيمة منطقية، و`getHTML(true)` و`getHTML(false)`، و`getCookies` عندما يكون المرشّح نصًا أو مصفوفة من عنصر واحد. يُترك استدعاء `getCookies` بأكثر من اسم واحد دون تغيير، لأن المرشّح الواحد يطابق اسمًا واحدًا.

ثبّت الـ codemod أولًا. WebdriverIO لا يعتمد عليه.

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

الوسيط الثالث المنطقي يُعد خطأً في TypeScript. ووقت التشغيل يُطلق:

```
Passing a boolean as the third argument to `addCommand` was removed in WebdriverIO v10. Use `addCommand(name, fn, { attachToElement: true })`.
```

ينتمي `proto` و`instances` إلى كائن الخيارات نفسه. احذف الوسيط الثالث لإرفاق أمر بالمتصفح.

### `getCookies`

تُرفض المرشّحات النصية ومصفوفات النصوص. مرّر [كائن مرشّح ملفات تعريف الارتباط](https://w3c.github.io/webdriver-bidi/#type-storage-CookieFilter). يرشّح الاستدعاء الواحد اسمًا واحدًا؛ استدعه مجددًا لاسم آخر.

```diff
- await browser.getCookies('session')
- await browser.getCookies(['session', 'auth'])
+ await browser.getCookies({ name: 'session' })
+ await browser.getCookies({ name: 'auth' })
```

لا يزال `getCookies()` بدون وسائط يُرجع كل ملفات تعريف الارتباط المرئية للصفحة.

### `getHTML`

```diff
- await $('h1').getHTML(false)
+ await $('h1').getHTML({ includeSelectorTag: false })
```

لا يزال `getHTML()` بدون وسائط يتضمن وسم العنصر نفسه.

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

### `startActivity`

لا يُقبل إلا كائن الخيارات. أُزيل `appWaitPackage` و`appWaitActivity` و`optionalIntentArguments`. كانت تنطبق فقط على نقطة نهاية HTTP المُزالة في Appium. لا يقبلها `mobile: startActivity`، وتمريرها يُطلق خطأً.

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

أُزيل `browser.throttle` وأوامر `touchAction` المهملة.

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

أُزيل `browser.uploadFile()`. كان يضغط ملفًا محليًا ويرسله إلى نقطة النهاية `file` في Selenium، وهي ليست جزءًا من WebDriver ولا WebDriver BiDi. اضبط حقل إدخال الملف باستخدام [`element.setFiles()`](/docs/api/element/setFiles).

```diff
- const remotePath = await browser.uploadFile('/path/to/file.png')
- await $('#file-upload').setValue(remotePath)
+ await $('#file-upload').setFiles('/path/to/file.png')
+ await $('#file-upload').setFiles(['/path/to/a.png', '/path/to/b.png'])
```

يحتاج `setFiles` إلى جلسة BiDi. يفتح المتصفح المسارات. ويُحل المسار النسبي بالنسبة إلى `process.cwd()`. تجهيز الملفات في Selenium Grid ليس جزءًا من v10. على مجموعة الاختبارات التي كانت تعتمد على `uploadFile` لدفع البيانات إلى عقدة أن تضع الملف حيث يستطيع المتصفح قراءته، ثم تستدعي `setFiles`.

في جلسة كلاسيكية محلية، لا يزال `element.setValue('/local/path')` يكتب مسارًا يستطيع المتصفح المحلي رؤيته بالفعل. وتبقى نقطة نهاية Selenium الخام هي `browser.file()` لمستخدمي Grid الذين يستدعونها مباشرة.

## `executeAsync`

أُزيل `browser.executeAsync` و`element.executeAsync`. مرّر دالة `async` إلى [`execute`](/docs/api/browser/execute). القيمة المُرجعة من الدالة، بما في ذلك الـ promise المُرجع، هي نتيجة الأمر. ولا تزال مهلة `script` سارية.

```ts
const result = await browser.execute(async (a, b) => {
    await new Promise((resolve) => setTimeout(resolve, 1000))
    return a + b
}, 1, 2)
```

تخلّص من دالة الاستدعاء `done` الخاصة بـ WebDriver. على السكربت النصي الذي كان يتوقع دالة الاستدعاء هذه كوسيط أخير أن يُرجع promise بدلًا من ذلك. ووقت التشغيل، `executeAsync` ليست دالة.

## `switchToFrame`

لم يعد `browser.switchToFrame` أمرًا عامًا.

في جلسة WebDriver BiDi، يُطلق `switchFrame` و`switchWindow` خطأً. علامة التبويب والنافذة والإطار هي `WebdriverIO.BrowsingContext` تحتفظ به. ينتقل `browser.url()` في السياق الأولي ذي المستوى الأعلى للجلسة ويُرجعه. يُرجع `browser.newWindow()` السياق الجديد ولا ينتقل إليه. يُرجع `context.frame()` إطارًا فرعيًا. و`context.parent` هو الإطار الذي فتحته منه.

```ts
const page = await browser.url('https://example.com')
const other = await browser.newWindow('https://webdriver.io', { type: 'tab' })
console.log(await page.getTitle())
const frame = await page.frame('iframe')
console.log(await frame.$('h1').getText())
const pages = await browser.browsingContexts()
```

`context.url` هو نص عنوان URL للمستند. انتقل في سياق محتفَظ به باستخدام `context.navigate(url)`. وبيانات التحميل الوصفية من `browser.url()` هي `context.request`.

في جلسة Classic، استمر في استدعاء `switchFrame` مع عنصر، أو `null` للإطار العلوي. يُرفض النص أو الدالة هناك.

```diff
- await browser.switchToFrame(await $('iframe'))
- await browser.switchToFrame(null)
+ await browser.switchFrame($('iframe'))
+ await browser.switchFrame(null)
```

## `setTimeout` {#settimeout}

يُرفض مفتاح JSON Wire Protocol `page load`. استخدم `pageLoad`.

```diff
- await browser.setTimeout({ 'page load': 10000 })
+ await browser.setTimeout({ pageLoad: 10000 })
```

لم يتغير `implicit` و`script`.

## الوصول إلى نسخ Multi-remote

لم يعد متصفح multi-remote يخزن كل جلسة كخاصية خاصة به. والأمر نفسه ينطبق على عنصر multi-remote. `getInstance` و`select` هما وسيلتك لمخاطبة جلسة واحدة.

```diff
- await browser.myChromeBrowser.url('https://webdriver.io')
- await (await browser.$('button')).myChromeBrowser.click()
+ await browser.getInstance('myChromeBrowser').url('https://webdriver.io')
+ await (await browser.$('button')).getInstance('myChromeBrowser').click()
```

لم يعد توسيع TypeScript الذي يضيف `myChromeBrowser: WebdriverIO.Browser` إلى `WebdriverIO.MultiRemoteBrowser` يطابق خاصية موجودة وقت التشغيل. احذف ذلك التوسيع واستدعِ `getInstance`.

مع مشغّل الاختبارات وترك `injectGlobals` مفعّلًا، يبقى اسم النسخة متغيرًا عامًا (`myChromeBrowser.url(...)`). ذلك المتغير العام هو الجلسة المنفردة. وهو ليس `browser.myChromeBrowser`.

تبقى نتائج الأوامر بترتيب الـ capabilities: الإدخال الأول يخص المفتاح الأول في كائن الـ capabilities.

يُرجع `browser.$$()` على متصفح multi-remote القيمة `WebdriverIO.MultiRemoteElementArray`، لا `MultiRemoteElement[]` عادية. لا تزال مصفوفة، لذا تستمر القراءة بالفهرس مثل `elements[0]` في العمل.

توابعها `map` و`filter` و`forEach` و`find` و`findIndex` و`some` و`every` و`reduce` غير متزامنة، كما في `WebdriverIO.ElementArray`، وتُرجع promise، حتى بعد `await`. والأمر نفسه ينطبق على القوائم التي تُرجعها `custom$$()` و`react$$()` و`shadow$$()`. في v9 كانت هذه هي التوابع المتزامنة لمصفوفة عادية:

```diff
  const items = await browser.$$('li')
- const ids = items.map((item) => item.selector)
+ const ids = await items.map((item) => item.selector)
```

تُرجع `custom$()` و`react$()`، وعلى عنصر `shadow$()` و`nextElement()` و`previousElement()` و`parentElement()`، كائن `WebdriverIO.MultiRemoteElement` واحدًا، كما يفعل `$()`. في v9 كانت تُرجع عنصرًا واحدًا لكل نسخة في مصفوفة عادية. اقرأ عنصر متصفح واحد باستخدام `getInstance`:

```diff
- const [chromeHost, firefoxHost] = await browser.custom$('byTestId', 'host')
- await chromeHost.click()
+ const host = await browser.custom$('byTestId', 'host')
+ await host.getInstance('myChromeBrowser').click()
```

تُرجع `custom$$()` و`react$$()`، وعلى عنصر `shadow$$()`، كائن `WebdriverIO.MultiRemoteElementArray` واحدًا، كما يفعل `$$()`. في v9 كانت تُرجع قائمة واحدة لكل نسخة في مصفوفة عادية. كل إدخال يخاطب كل النسخ. والنسخة التي تجد عناصر أقل ليس لديها عنصر عند ذلك الفهرس:

```diff
- const [chromeItems, firefoxItems] = await browser.custom$$('byTestId', 'item')
- await chromeItems[0].click()
+ const items = await browser.custom$$('byTestId', 'item')
+ await items[0].getInstance('myChromeBrowser').click()
```

أصبح لـ `WebdriverIO.MultiRemoteElement['selector']` النوع `Selector`، كما هو الحال في `WebdriverIO.Element['selector']`. في v9 كان نوعه `string`، لكن القيمة قد تكون أيضًا دالة أو مرجع استراتيجية مخصصة. يجب على شيفرة TypeScript التي تستخدمه كنص، مثل `element.selector.includes('…')`، أن تتحقق من النوع أولًا.

أُزيل `WDIO_ENABLE_MULTI_REMOTE_SELECT` و`WDIO_ENABLE_MULTI_REMOTE_ELEMENT_ARRAY`. أصبح `select()` متاحًا دائمًا، ويُرجع `$$()` دائمًا مصفوفة العناصر المذكورة أعلاه. احذف كلا المتغيرين.

## استجابات المحاكاة الثنائية

يقبل `mock.respond()` و`mock.respondOnce()` حمولات `Uint8Array` و`ArrayBuffer`، بما في ذلك `Buffer` المُضاف عبر polyfill في اختبارات المكوّنات التي لا يوجد فيها `Buffer` عام.

أصبح نوع `mock.getBinaryResponse()` الآن `Uint8Array | null`. لا يزال يُرجع `Buffer` في Node.js، لكنه يُرجع `Uint8Array` في المتصفح. لاستخدام توابع خاصة بـ Buffer في Node.js، حوّل النتيجة غير الفارغة أولًا:

```diff
- const base64 = mock.getBinaryResponse(requestId)?.toString('base64')
+ const bytes = mock.getBinaryResponse(requestId)
+ const base64 = bytes === null ? undefined : Buffer.from(bytes).toString('base64')
```

## محاكاة الشبكة في Multi-remote

يُرجع `browser.mock()` على متصفح multi-remote الكائن `WebdriverIO.MultiRemoteMock`، لا مصفوفة من المحاكيات. تعمل `respond` و`restore` وتوابع المحاكاة الأخرى على كل النسخ. اقرأ الطلبات الملتقطة من محاكاة متصفح واحد. استخدم النوع `WebdriverIO.MultiRemoteMock` من مساحة الأسماء العامة `WebdriverIO`.

```diff
- const [chromeMock, firefoxMock] = await browser.mock('*/api')
- expect(chromeMock.calls).toHaveLength(1)
+ const mock = await browser.mock('*/api')
+ mock.respond({ ok: true })
+ expect(mock.getInstance('myChromeBrowser').calls).toHaveLength(1)
+ expect(mock.instances).toEqual(['myChromeBrowser', 'myFirefoxBrowser'])
```

يُطلق `getInstance` الخطأ `Multi-remote object has no instance named "<name>"` عندما لا يكون الاسم أحد قيم `instances`. المحاكاة الناتجة من `browser.select('myFirefoxBrowser', 'myChromeBrowser')` تسرد تلك النسخ بذلك الترتيب، الذي قد يختلف عن `browser.instances`. لا تفترض أن `mocks[0]` متصفح بعينه.

## استجابات المحاكاة التي تتخطى الخادم الخلفي

لا يستدعي `mock.respond(..., { fetchResponse: false })` الخادم الخلفي. في v9، كانت المحاكاة التي ترشّح أيضًا على `statusCode` أو `responseHeaders` تتجاهل ذلك المرشّح وتستمر في الرد على كل طلب مطابق. في v10، يُطلق `respond()` و`respondOnce()` خطأً، لأن تلك المرشّحات لا يمكن تقريرها إلا من استجابة الخادم الخلفي.

```diff
- const mock = await browser.mock('**/users', { statusCode: 200 })
- mock.respond({ name: 'Ada' }, { fetchResponse: false })
+ const mock = await browser.mock('**/users')
+ mock.respond({ name: 'Ada' }, { fetchResponse: false })
```

للإبقاء على المرشّح، احذف `fetchResponse` حتى تجلب المحاكاة الاستجابة، وتتحقق من الحالة أو الترويسات، ثم تستبدل المحتوى.

## مراجع العناصر {#element-references}

تستخدم معرّفات العناصر مفتاح W3C WebDriver `element-6066-11e4-a52e-4f735466cecf` والخاصية `elementId`. لم يعد حقل JSON Wire Protocol `ELEMENT` جزءًا من عقد العنصر.

لم يعد `WebdriverIO.Element` يعلن عن `ELEMENT`. اقرأ `element.elementId`، الذي تعرضه نسخ العناصر بالفعل.

يمرر `browser.execute`، والسكربتات المدمجة التي ترسل عنصرًا إلى الصفحة (`getHTML` و`isClickable` و`isDisplayed` و`scrollIntoView` وغيرها)، مرجع W3C فقط:

```diff
- await browser.execute((el) => el.ELEMENT, elem)
+ await browser.execute(
+     (el) => el['element-6066-11e4-a52e-4f735466cecf'],
+     elem
+ )
```

محتوى find-element الذي يحتوي فقط على `{ ELEMENT: '...' }` ليس عنصرًا. ضمّن مفتاح W3C. إذا كان كلا المفتاحين موجودين، يستخدم WebdriverIO معرّف W3C.

يطبع Jasmine نتيجة `$()` المتسلسلة عبر `toJSON`. وتلك القيمة هي مرجع W3C نفسه، `{ 'element-6066-11e4-a52e-4f735466cecf': elementId }`.

مع WebDriver BiDi، السكربت الذي يُرجع `NodeList` (مثلًا من `querySelectorAll`) أو `HTMLCollection` (مثلًا `element.children`) يعطي الآن قائمة من مراجع العناصر، كما يفعل WebDriver Classic. في v9 كان يعطي قيم BiDi خامًا، لذا كان `browser.execute` يُرجع كائنات ليست عناصر، ولم تكن استراتيجية `custom$` أو `custom$$` التي تُرجع `querySelectorAll(...)` تجد أي عنصر. لا يزال حل التفاف مثل `Array.from(document.querySelectorAll(...))` يعمل، ويمكنك إزالته:

```diff
  browser.addLocatorStrategy('byCss', (selector) =>
-     Array.from(document.querySelectorAll(selector))
+     document.querySelectorAll(selector)
  )
```

## محددات React

يعمل `react$` و`react$$` الآن مع React من 16 إلى 19، للتطبيق الذي يبدأ باستخدام `createRoot` أو `ReactDOM.render`. سابقًا، كان `browser.react$` و`browser.react$$` يفشلان مع React 18 وما بعده (`Could not find the root element of your application`)، وفي كل الإصدارات قد تأتي النتيجة من التصيير الذي سبق آخر تحديث، لذا لم يكن يُعثر على مكوّن أضافه تغيير في الحالة.

على صفحة لم يصيّر فيها React جذرًا بعد، تنتظر الأوامر الآن حتى 5 ثوانٍ قبل أن تفشل. سابقًا، كانت تفشل فورًا، لذا لم يكن يُعثر على تطبيق بدأ متأخرًا.

لم تعد الأوامر تستخدم مكتبة [resq](https://github.com/baruchvlz/resq)، ولم يعد WebdriverIO يثبّتها. لم تتغير قواعد المحددات (راجع [محددات React](/docs/selectors#react-selectors))، باستثناء ما يلي:

- يعثر `react$` مع كل من `props` و`state` على مكوّن يطابق الاثنين. سابقًا، كان يتجاهل `props` عندما تُعطى `state` أيضًا.
- يعطي `react$$` كل عقدة DOM مرة واحدة. سابقًا، كان المكوّن عالي الرتبة وابنه يعطيان العنصر نفسه مرتين في بعض المتصفحات.
- الـ fragment الذي يحتوي على fragment يعطي قائمة مسطحة واحدة من العقد. سابقًا، قد يُرجع `react$` قائمة.
- يعمل المرشّح ذو القيمة `null`. سابقًا، كان يفشل برسالة `Cannot convert undefined or null to object`.
- دون نطاق عنصر، تبحث الأوامر في كل جذور React في الصفحة، بترتيب المستند، بما في ذلك الجذور داخل جذور أخرى والجذور داخل shadow roots المفتوحة. يعطي `react$` أول تطابق. سابقًا، كانت تبحث في الجذر الأول فقط، حتى لو كان React لم يصيّره بعد أو أزاله، ولم تكن تبحث في shadow roots. على صفحة بأكثر من جذر، قد يعطي `react$$` الآن عناصر أكثر: للبحث في جذر واحد فقط، استدعِ الأمر على حاويته، مثل `$('#root').react$$('MyComponent')`.
- على حاوية جذر داخل جذر آخر، تبحث الأوامر في الجذر الداخلي. سابقًا، كانت تبحث في الجذر الخارجي.
- على سياق تصفح إطار، وعلى عنصر في إطار، تعمل الأوامر. سابقًا، كان أمر السياق يفشل برسالة `this.executeScript is not a function`، وأمر العنصر يفشل برسالة `Could not find instance of React in given element`.

أُزيل السكربت الداخلي `webdriverio/scripts/resq`.

## اختبار المكوّنات

يعيد `@wdio/browser-runner` تصدير `fn` و`spyOn` وأنواع المحاكاة من `@vitest/spy` 5 (سابقًا 3). المحاكاة التي تستدعيها شيفرتك باستخدام `new` تحتاج إلى تنفيذ بـ `function` أو `class`. الدالة السهمية تُطلق `is not a constructor`، ويُطلق `mockReturnValue` خطأً عندما تُستدعى المحاكاة باستخدام `new`.

```diff
- const Client = fn(() => ({ close: fn() }))
+ const Client = fn(function () { return { close: fn() } })
```

لتغييرات الجواسيس الأخرى، راجع [دليل الترحيل الخاص بـ Vitest](https://vitest.dev/guide/migration).

## Puppeteer

يقبل `webdriverio` الحزمة `puppeteer-core` بالنطاق `>=24 <26`، بما في ذلك Puppeteer 25. يُختبر `getPuppeteer()` و`@wdio/lighthouse-service` مقابل هذا الخط.

## ESLint

يتطلب `eslint-plugin-wdio` الإصدار ESLint 10. وصل ESLint 9 إلى [نهاية دعمه](https://eslint.org/version-support/) في 2026-08-06 ولم يعد مدعومًا. مع TypeScript، استخدم `typescript-eslint` 8.56.0 أو أحدث.

```sh
npm install --save-dev eslint@10 eslint-plugin-wdio
```

يصدّر `eslint-plugin-wdio` الإعداد المسطح `flat/recommended` فقط. أُزيل اسم eslintrc `plugin:wdio/recommended`.

```js
import { configs as wdioConfig } from 'eslint-plugin-wdio'

export default [
    wdioConfig['flat/recommended'],
]
```

ينتقل الإعداد الموصى به إلى القاعدة `wdio/no-floating-promise` الواعية بالأنواع، بدلًا من `wdio/await-expect`، عندما تكون الحزمة `typescript-eslint` مثبتة. تثبيت `@typescript-eslint/eslint-plugin` وحدها لا يكفي.

```sh
npm install --save-dev typescript typescript-eslint
```

في هذا الوضع، يحلل الإعداد كل ملف يطابقه باستخدام خدمة مشروع TypeScript. قيّده بملفات TypeScript، وتأكد من أنها جزء من ملف `tsconfig.json`:

```js
import { configs as wdioConfig } from 'eslint-plugin-wdio'

export default [
    { files: ['**/*.{ts,mts,cts,tsx}'], ...wdioConfig['flat/recommended'] },
]
```

ملف JavaScript مطابق ليس ضمن مشروع TypeScript، مثل `wdio.conf.js`، يفشل برسالة "was not found by the project service". لفحص ملفات JavaScript أيضًا، اضبط `"allowJs": true`، وأضفها إلى `include` في `tsconfig.json`، ووسّع النمط إلى `**/*.{js,mjs,cjs,ts,mts,cts,tsx}`.

## أطر العمل المخصصة

لم يعد `setupExpect` في محوّل إطار عمل مخصص يقبل `Map` من المطابِقات، ولم يعد المشغّل يضيف التابع `entries` إلى كائن المطابِقات. كرّر باستخدام `Object.entries(wdioMatchers)`.

## ملف تعريف Firefox

لم تعد `@wdio/firefox-profile-service` تعامل `legacy` كخيار للخدمة. كان ذلك العلم ينطبق فقط على Firefox 55 وما قبله. احذفه. أي `legacy: true` متبقٍ يُكتب في ملف التعريف كتفضيل باسم `legacy`.

## بروتوكول WebDriver

كل جلسة هي جلسة [W3C WebDriver](https://w3c.github.io/webdriver/). لا يتحدث WebdriverIO بروتوكول JSON Wire ولا بروتوكول Mobile JSON Wire. أزال v9 تلك الأوامر. ويتخلى v10 أيضًا عن غلاف الاستجابة الذي كانت تستخدمه تلك البروتوكولات، لذا فإن الخادم الذي لا يزال يُرجعه لا يستطيع بدء جلسة.

أُزيل `browser.isW3C`، بما في ذلك القيمة التي كانت تُمرَّر سابقًا في رسالة العامل `sessionStarted`. يُتجاهل تمرير `isW3C` إلى `attach`. تبقى مجموعة أوامر BiDi على العميل. ولا يزال اتصال BiDi الحي يعتمد على `webSocketUrl`.

### `browser.back()` و`browser.forward()` على BiDi

تبقى مواضع الاستدعاء `await browser.back()` و`await browser.forward()`. لا يأخذ أي من الأمرين وسيطًا ولا يُرجع قيمة.

في جلسة BiDi، تستدعي هذه الأوامر `browsingContext.traverseHistory` مع `delta` بقيمة `-1` أو `1` على سياق التصفح ذي المستوى الأعلى، ثم تنتظر جاهزية المستند التي يقابلها `pageLoadStrategy`. القيمة `none` تعود عندما يُقبل أمر التنقل. و`eager` تنتظر `browsingContext.domContentLoaded`. و`normal`، الافتراضية، تنتظر `browsingContext.load`. استعادة الصفحة من ذاكرة back-forward المؤقتة لا تُطلق تلك الأحداث؛ يعود الأمر عندما تكون قيمة `readyState` للمستند المعتمد مطابقة للاستراتيجية بالفعل. يستخدم الانتظار مهلة تحميل الصفحة للجلسة (`timeouts.pageLoad`، أي 300000 مللي ثانية إن لم تُضبط). ولا تزال الجلسات الكلاسيكية ترسل إلى `POST /session/:sessionId/back` و`POST /session/:sessionId/forward`.

لا يزال إدخال السجل المفقود يؤدي إلى الرفض. على BiDi تأتي الرسالة من `browsingContext.traverseHistory` وتحتوي على `no such history entry`، بدلًا من نص خطأ WebDriver الكلاسيكي. والتنقل الذي لا يصل أبدًا إلى الجاهزية المتوقعة يُرفض برسالة `History traversal timed out after <ms>ms waiting for browsingContext.domContentLoaded` أو `browsingContext.load`.

### استجابة الجلسة الجديدة

يجب أن يُرجع Create Session محتوى W3C. يقرأ WebdriverIO القيمتين `value.sessionId` و`value.capabilities`:

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

يُرفض محتوى JSON Wire Protocol. فذلك المحتوى يضع `sessionId` و`status` بجانب `value`، ويضع الـ capabilities في `value` نفسها:

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

لا يزال كائن الـ capabilities المسطح في إعداداتك صالحًا. يغلّف WebdriverIO `{ browserName: 'chrome' }` داخل `alwaysMatch` قبل إرسال الطلب. ولا تزال المفاتيح ذات بادئة المورّد الممزوجة بمفاتيح خارج مجموعة capabilities الخاصة بـ W3C مرفوضة. ضع إعدادات المورّد في `sauce:options` أو `bstack:options` أو `appium:options` أو مفتاح آخر ذي بادئة.

### استجابات الأوامر

نتيجة الأمر هي `{ "value": … }`. استجابة HTTP 200 دون `error` في `value` تعني النجاح. العنصر المفقود هو HTTP 404 مع ضبط `value.error` على `"no such element"`، وهو ما لا يزال يسمح بالبحث الكسول عن العنصر. يُتجاهل أي `status` رقمي في المحتوى، بما في ذلك `status: 0` والرمز القديم `status: 7` ("no such element"). أرسل كائن خطأ W3C بدلًا من ذلك.

أصبح نوع الخطأ المُصدَّر `JSONWPCommandError` الآن `SessionRequestError`.

### الخوادم

المشغّلات (drivers) التي يعمل WebdriverIO مقابلها تتحدث W3C بالفعل على اتصال العميل:

- ChromeDriver يعتمد W3C افتراضيًا منذ Chrome 75. وEdge المبني على Chromium يطابقه. لا يزال ChromeDriver الحالي يقبل `goog:chromeOptions.w3c: false`، الذي يعيد تلك الجلسة الواحدة إلى البروتوكول القديم. لا يدعم WebdriverIO هذا التبديل.
- geckodriver وsafaridriver من Apple يدعمان W3C فقط. واستجابة Safari التي تُغفل `platformName` أو `browserVersion` لا تزال W3C.
- Selenium 4 وGrid 4 يتحدثان W3C. توقف Grid عن ترجمة JSON Wire Protocol في الإصدار 4.9.
- تخلى Appium 2 عن JSON Wire Protocol وMobile JSON Wire Protocol. وتخلى Appium 3 أيضًا عن أشكال المعاملات المتبقية. يتطلب v10 الإصدار Appium 3، كما هو موضح أدناه. والجلسة المحمولة التي تُغفل `setWindowRect` لا تزال W3C؛ فتلك الـ capability تعني أن الجهاز لا يستطيع تغيير حجم النافذة.

هذه الخوادم لا تزال تتحدث JSON Wire Protocol وليست مدعومة: Selenium 3، وPhantomJS، وEdgeHTML (`--jwp`)، وWinAppDriver عند الاتصال به مباشرة. يبقى مشغّل Appium Windows مدعومًا كعميل W3C. فهو يترجم الأوامر إلى WinAppDriver، بما في ذلك ترجمة Get Element Property إلى نقطة نهاية الخاصية (attribute). وجّه WebdriverIO إلى Appium، لا إلى منفذ WinAppDriver.

لا تجعل [`@wdio/jsonwp-service`](https://www.npmjs.com/package/@wdio/jsonwp-service) تلك الخوادم تعمل مع v10. فبدء الجلسة لا يزال يتطلب محتوى W3C المذكور أعلاه، ولا تزال نتائج الأوامر تتجاهل `status` الرقمي. ابقَ على WebdriverIO 9 إذا كان ذلك الخادم لا يزال مطلوبًا.

لم يعد `webdriver.remote.sessionid` يحدد جلسة Selenium مستقلة. ولا يزال Selenium Grid 4 يُكتشف من خلال `se:cdp`.

مفتاح المهلة `page load` مشروح تحت [`setTimeout`](#settimeout). ومعرّفات العناصر مشروحة تحت [مراجع العناصر](#element-references). على سطح المكتب، `[name="..."]` محدد CSS. وتبقى استراتيجية تحديد المواقع `name` لجلسات الهاتف المحمول.

## Appium

يتطلب WebdriverIO 10 الإصدار **Appium 3** والمشغّلات الرسمية الحالية (UiAutomator2 وXCUITest وEspresso وWindows وMac2 وغيرها). الإصداران Appium 1.x و2.x غير مدعومين. ابقَ على WebdriverIO 9 إذا كنت لا تستطيع ترقية الخادم.

```sh
npm i -D appium@^3
appium driver update installed
```

تعلن `@wdio/appium-service` عن اعتمادية نظيرة اختيارية `appium` بالنطاق `>=3` وترفض تشغيل خادم أقدم. يثبّت `create-wdio` الحزمة `appium@^3` عندما يكون Appium مفقودًا أو أقدم من 3.

مزودو الخدمات السحابية الذين لا يزالون يقدمون Appium 2 يحتاجون إلى صورة Appium 3، أو عليك البقاء على WebdriverIO 9.

### لم تعد أوامر الهاتف المحمول ترجع إلى HTTP

في v9، كانت العديد من أدوات الهاتف المحمول المساعدة تجرب `browser.execute('mobile: …')`، وعند خطأ التابع غير المعروف، ترجع إلى نقطة نهاية HTTP مُزالة في Appium. في v10 أُزيل هذا الرجوع: الخطأ نفسه يطلب منك الترقية إلى Appium 3. فضّل أوامر الهاتف المحمول في WebdriverIO (`browser.lock()` و`browser.shake()` و…) أو `browser.execute('mobile: …')` مباشرة.

### أوامر البروتوكول المُزالة

[أزال Appium 3 العديد من نقاط النهاية المهملة في المشغّل الأساسي](https://appium.io/docs/en/latest/guides/migrating-2-to-3/). لم يعد WebdriverIO يعرض توابع العميل لمعظم تلك المسارات (مثل `appiumLock` و`touchPerform` وخريطة Mobile JSON Wire Protocol). استخدم W3C Actions، أو أمر الهاتف المحمول المقابل، أو تابع `mobile:` الخاص بالمشغّل بدلًا من ذلك.

### نطاق `--allow-insecure` في Appium

يتطلب Appium 3 بادئة نطاق للمشغّل أو `*` على ميزات `--allow-insecure`، مثل `uiautomator2:adb_shell` أو `*:adb_shell`.

### لم تعد capabilities الخاصة بـ Appium دون بادئة تختار جلسة Appium

لم تعد `automationName` و`deviceName` و`appiumVersion` دون البادئة `appium:` تخبر WebdriverIO بتخطي مشغّل المتصفح وإرفاق خدمة Appium. استخدم الـ capability ذات البادئة، أو ضعها داخل `appium:options`:

```diff
- capabilities: { platformName: 'Android', automationName: 'UiAutomator2', deviceName: 'emulator' }
+ capabilities: {
+     platformName: 'Android',
+     'appium:automationName': 'UiAutomator2',
+     'appium:deviceName': 'emulator'
+ }
```

يُخرج `wdio repl` الآن تلك المفاتيح ذات البادئة، بما في ذلك `appium:app` و`appium:platformVersion` و`appium:udid`.

### `getValue` على الهاتف المحمول يقرأ خاصية العنصر

يستدعي `element.getValue()` الأمر Get Element Property في كل جلسة، بما في ذلك Appium 3. في جلسة الهاتف المحمول كان يستدعي سابقًا Get Element Attribute.

### توقيع `stopRecordingScreen` متوافق مع `startRecordingScreen`

يقبل `driver.stopRecordingScreen` الآن وسيط `options` واحدًا فقط، بدلًا من الوسائط الأربعة السابقة، متوافقًا مع `driver.startRecordingScreen`. انقل الوسائط الفردية إلى داخل كائن:

```diff
- driver.stopRecordingScreen('webdriver.io', undefined, undefined, 'POST')
+ driver.stopRecordingScreen({ remotePath: 'webdriver.io', method: 'POST' })
```

## تسمية Multi-remote

واجهات البرمجة المكتوبة `multiremote` أو `Multiremote` أصبحت الآن بصيغة camelCase / PascalCase أي `multiRemote` / `MultiRemote`. ليس للأسماء القديمة أسماء بديلة.

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

ابحث عن `multiremote` و`Multiremote` (مع مراعاة حالة الأحرف) واستبدل كل تطابق. تُعلّم تقارير Allure أيضًا اختبارات multi-remote بـ `isMultiRemote` بدلًا من `isMultiremote`.

## الشاشات الافتراضية على Linux

استُبدلت `@wdio/xvfb` بـ `@wdio/display-server`. بدلًا من تغليف كل عامل داخل `xvfb-run`، يبدأ مشغّل الاختبارات خادم عرض واحدًا للتشغيل بأكمله، قبل خطاف `onPrepare` لأي خدمة. ويفضّل Weston في الوضع دون واجهة (headless) ويرجع إلى Xvfb. راجع [Headless وخوادم العرض](/docs/headless-and-display-servers) للتفاصيل.

أُعيدت تسمية الخيارات. لا تزال الأسماء القديمة تعمل في v10 لكنها تسجّل تحذير إهمال، وستُزال في v11. إذا ضبطت كلا الاسمين، فالجديد هو الذي يُعتمد:

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

ليس لـ `xvfbMaxRetries` و`xvfbRetryDelay` أي تأثير، وسيُزالان أيضًا في v11. لم يعد بدء التشغيل يُعاد: إذا فشل Weston في البدء، يجرب مشغّل الاختبارات Xvfb، وإذا لم يبدأ أي منهما، يستمر التشغيل دون شاشة.

الإعداد الذي يضبط أحد الخيارات الأربعة المُعاد تسميتها دون بديله، ولا يضبط `displayServer`، يستمر في استخدام Xvfb كما في v9. وما لم يُطفئ خادم العرض، فإنه يسجّل أيضًا `Preferring Xvfb, as v9 did, because the config sets v9 display keys`. بمجرد إعادة تسمية الخيارات، أضف `displayServer: 'xvfb'` للإبقاء على Xvfb، أو اتركه لتفضيل Weston. في الوضع التلقائي، يعمل أمر التثبيت المخصص لـ Weston أولًا، ثم مرة أخرى لـ Xvfb فقط إذا ظل Weston غير متاح أو فشل في البدء وكان Xvfb لا يزال مفقودًا، لذا اضبط `displayServer` على الخادم الذي يثبّته الأمر لتخطي محاولة الخادم الآخر.

لم يعد التثبيت التلقائي يدعم `yum`، الذي كان v9 يستخدمه على الأجهزة التي لا تحتوي على `dnf`. يكتشف v10 فقط `apt-get` و`dnf` و`zypper` و`pacman` و`apk` و`xbps-install`، لذا ثبّت Xvfb بنفسك على جهاز لا يحتوي إلا على `yum`.

كانت مصفوفة `xvfbAutoInstallCommand` تعمل عبر shell في v9، لذا كانت عناصر مثل `&&` أو `VAR=value` تعمل. أصبحت المصفوفات الآن تعمل دون shell تحت أي من اسمي الخيار، لذا استخدم نصًا لصيغة shell.

تغييرات أخرى قد تلاحظها:

- يتشارك كل العمال شاشة واحدة. في v9، كان لكل عامل شاشته الخاصة. قد تفتقر صفحات Chrome وEdge الآن إلى التركيز، راجع [تركيز النافذة](/docs/headless-and-display-servers#window-focus).
- رقم شاشة Xvfb ليس ثابتًا. اقرأه من `DISPLAY` بدلًا من افتراض `:99`.
- الجهاز الذي لا يحتوي إلا على `WAYLAND_DISPLAY` مضبوطًا يُعتبر الآن أن لديه شاشة. كان v9 يشغّل العمال تحت Xvfb هناك، لأن `DISPLAY` لم يكن مضبوطًا. أما v10 فلا يبدأ شيئًا، ويفتح نوافذ المتصفح على المُركِّب (compositor) لديك، ويضبط `XDG_SESSION_TYPE` و`GDK_BACKEND` و`ELECTRON_OZONE_PLATFORM_HINT` على `wayland` طوال التشغيل. لتشغيلها تحت Xvfb كما في السابق، ألغِ ضبط `WAYLAND_DISPLAY` واضبط `displayServer: 'xvfb'`.
- الشاشة الافتراضية بدقة 1920x1080. كان v9 يستخدم القيمة الافتراضية لـ `xvfb-run`، وهي 1280x1024 على Debian وUbuntu و640x480 على Fedora وRHEL وArch. للإبقاء على الحجم الذي تستخدمه صورك المرجعية، اضبط `displayServerWidth` و`displayServerHeight` عليه.
- تختار المتصفحات Wayland أو X11 بناءً على `XDG_SESSION_TYPE` الذي يضبطه خادم العرض. تحت Weston، يضيف WebdriverIO أيضًا `--ozone-platform=wayland` إلى Chrome وEdge اللذين يشغّلهما، لأن Chrome وEdge قبل الإصدار 140 (وChrome for Testing قبل 135) يتجاهلان `XDG_SESSION_TYPE`. لا يوفر Weston قيمة `DISPLAY`، لذا إذا كانت اختباراتك أو أدواتك تحتاج إلى X11، فاضبط `displayServer: 'xvfb'`.
- إذا كنت تستخدم `XvfbManager` أو نسخة `xvfb` من `@wdio/xvfb` مباشرة، فاستخدم `DisplayServerManager` من `@wdio/display-server` بدلًا من ذلك. حيث كنت تشغّل `xvfb.init()` وتغلّف الأوامر داخل `xvfb-run`، أو تُنشئ العمليات عبر `ProcessFactory`، ابدأ شاشة ومرّر بيئتها إلى العمليات التي تحتاجها. يستخدم المثال Xvfb بدقة 1280x1024، كما كان v9 يفعل على Debian وUbuntu. على جهاز لا يحتوي إلا على `WAYLAND_DISPLAY` مضبوطًا، ألغِ ضبطه أولًا، وإلا فلن يبدأ `startDaemon()` أي شيء:

  ```js
  import { spawn } from 'node:child_process'
  import { once } from 'node:events'
  import { DisplayServerManager } from '@wdio/display-server'

  const manager = new DisplayServerManager({ displayServer: 'xvfb' })
  const daemon = await manager.startDaemon({ width: 1280, height: 1024 })
  // يُرجع startDaemon() أيضًا null عندما تكون هناك شاشة موجودة بالفعل
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

يقود `browser.emulate()` وحدة المحاكاة في WebDriver BiDi لسياق التصفح الحالي ذي المستوى الأعلى. كان v9 يحقن سكربت تحميل مسبق يعدّل `navigator.geolocation.getCurrentPosition` و`navigator.userAgent` و`window.matchMedia` و`navigator.onLine`. أُزيلت تلك السكربتات. لا يزال `browser.emulate('clock', …)` يثبّت مؤقتات وهمية في الصفحة الحالية وفي الصفحات التي تُفتح بعد ذلك.

لم تعد إعادة التحميل مطلوبة لنطاقات BiDi.

```diff
  await browser.emulate('onLine', false)
- // تغيّر `navigator.onLine` فقط؛ واستمرت حركة البيانات
+ // سياق التصفح غير متصل، بما في ذلك fetch وWebSocket وWebTransport
```

- يستدعي `onLine: false` الأمر `emulation.setNetworkConditions` مع `{ type: 'offline' }`. القيمة `true` واستعادة النطاق تمسحانه. ويبقى معدل النقل وزمن الاستجابة ضمن `browser.throttleNetwork()`.
- يضبط `colorScheme` ميزة الوسائط `prefers-color-scheme`، لذا يتبع CSS `@media (prefers-color-scheme)` نتيجة `matchMedia`.
- `userAgent` هو تجاوز وكيل المستخدم في المتصفح، وليس خاصية `navigator.userAgent` معدّلة.
- يستخدم `geolocation` منظومة تحديد الموقع الجغرافي في المتصفح. قد تحتاج الصفحة مع ذلك إلى `browser.setPermissions({ name: 'geolocation' }, 'granted')`. ويُبلغ `{ error: 'positionUnavailable' }` عن ذلك الخطأ بدلًا من الإحداثيات.
- يتشارك `colorScheme` و`media` خريطة ميزات وسائط واحدة. يستبدل الاستدعاء اللاحق الخريطة بأكملها، واستعادة أي من النطاقين تمسحها.
- يضبط `device` وكيل المستخدم، ومنفذ العرض، واللمس، وتخطيط النص للهاتف المحمول، وvieweport meta من واصف الجهاز. ولا يغيّر `screen` أو `orientation`.

النطاقات الجديدة هي `media` و`locale` و`timezone` و`touch` و`orientation` و`screen` و`viewportMeta` و`textLayout` و`scripting` و`scrollbar` و`forcedColors`. المتصفح الذي لا ينفّذ أمرًا ما يرفض الاستدعاء بخطئه الخاص (`unknown command` أو `unsupported operation`). لا يرجع WebdriverIO إلى سكربت تحميل مسبق ولا إلى CDP. إذا رُفض `device` في منتصف الطريق، تُعاد القيم السابقة لوكيل المستخدم ومنفذ العرض واللمس وتخطيط النص وviewport meta.

يقبل `wdio session emulate` النطاقات نفسها. ولم يعد يطلب منك إعادة التحميل لتجاوز يُطبَّق فورًا. لم تتغير الإعدادات المسبقة لـ `emulate network` ولا `emulate cpu` وتبقى خاصة بـ Chromium. راجع [المحاكاة](/docs/emulation).

## الخطوات التالية

- انسخ [مهارة الترحيل](#migrate-with-a-coding-agent) إلى المشروع واطلب من وكيل تطبيقها.
- [WebdriverIO لوكلاء البرمجة](/docs/ai-agents) لكتابة اختبارات v10 جديدة.
- [Headless وخوادم العرض](/docs/headless-and-display-servers) عندما تعمل مجموعة الاختبارات على Linux.