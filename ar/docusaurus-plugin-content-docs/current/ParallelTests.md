---
id: parallel-tests
title: الاختبارات المتوازية في ملف المواصفات
description: "شغّل اختبارات Mocha أو سيناريوهات Cucumber الخاصة بملف مواصفات واحد في الوقت نفسه، كلٌّ منها في سياق تصفح WebDriver BiDi خاص به، باستخدام mochaOpts.parallelMode أو cucumberOpts.parallelMode، وهو شكل من أشكال تجميع المتصفحات (browser pooling) يشبه خيار fullyParallel في Playwright."
---

منذ الإصدار v10، يستطيع WebdriverIO تشغيل اختبارات ملف مواصفات واحد في الوقت نفسه. يحصل كل اختبار `it()` في Mocha أو كل سيناريو في Cucumber على نافذة متصفح خاصة به ([سياق تصفح](https://w3c.github.io/webdriver-bidi/#browsing-context) في WebDriver BiDi) ضمن عامل (worker) واحد وجلسة متصفح واحدة. استخدمه لملفات المواصفات التي تحتوي على كثير من الاختبارات المستقلة: فهي تنتهي أسرع، ولا تحتاج إلى مزيد من عمليات العمّال أو جلسات المتصفح، لأن كل اختبار لا يتحمّل سوى كلفة فتح نافذة.

إنه شكل من أشكال تجميع المتصفحات: تتشارك الاختبارات مجموعة من النوافذ في متصفح واحد، لا مجموعة من المتصفحات. إذا كنت قادمًا من Playwright، فإن `parallelMode: 'userContexts'` هو أقرب مكافئ لـ [`fullyParallel: true`](https://playwright.dev/docs/test-parallel#parallelize-tests-in-a-single-file): إذ يحصل كل اختبار على سياق معزول خاص به. الفرق هو أن Playwright يوزّع اختبارات الملف على عمليات عمّال متعددة، لكلٍّ منها متصفحها الخاص، بينما يشغّلها WebdriverIO في الوقت نفسه ضمن عامل واحد ومتصفح واحد.

هذا منفصل عن [`maxInstances`](./OrganizingTestSuites.md)، الذي يشغّل ملفات مواصفات كاملة بالتوازي، بعامل واحد وجلسة واحدة لكل ملف مواصفات. يمكنك الجمع بين الاثنين: يحدد `maxInstances` عدد ملفات المواصفات التي تعمل في الوقت نفسه، ويحدد `maxParallelContexts` عدد الاختبارات التي تعمل في الوقت نفسه داخل كل ملف من تلك الملفات.

:::warning تجريبي
يتطلب الوضع المتوازي القدرة التجريبية `'wdio:experimentalBiDiCommands'`، التي تغيّر طريقة تنفيذ أوامر العناصر في كل الاختبارات، لا في الاختبارات المتوازية فقط. راجع [تغييرات سلوك أوامر عناصر BiDi](#behavior-changes-of-the-bidi-element-commands).
:::

## تفعيل الوضع المتوازي

تحتاج إلى:

- جلسة WebDriver BiDi (وهي الافتراضية، ما لم تضبط `'wdio:enforceWebDriverClassic': true`)،
- القدرة `'wdio:experimentalBiDiCommands': true`،
- `@wdio/mocha-framework` أو `@wdio/cucumber-framework`. لا يدعم Jasmine الوضع المتوازي.

إذا كانت الجلسة لا تستخدم BiDi، أو كانت القدرة مفقودة، يسجّل WebdriverIO تحذيرًا ويشغّل الاختبارات واحدًا تلو الآخر. بدون `parallelMode`، لا يتغير شيء.

### Mocha

```ts title="wdio.conf.ts"
export const config: WebdriverIO.Config = {
    specs: ['./test/specs/**/*.e2e.ts'],
    maxInstances: 1,
    capabilities: [{
        browserName: 'chrome',
        'wdio:experimentalBiDiCommands': true
    }],
    framework: 'mocha',
    mochaOpts: {
        ui: 'bdd',
        timeout: 60000,
        parallelMode: 'contexts',
        maxParallelContexts: 4
    }
}
```

لا يحتاج ملف المواصفات إلى أي تغييرات:

```ts title="test/specs/pages.e2e.ts"
import { browser, $, expect } from '@wdio/globals'

describe('webdriver.io', () => {
    it('shows the API page', async () => {
        await browser.url('https://webdriver.io/docs/api')
        await expect($('h1')).toHaveText('Introduction')
    })

    it('shows the getting started page', async () => {
        await browser.url('https://webdriver.io/docs/gettingstarted')
        await expect($('h1')).toHaveText('Getting Started')
    })
})
```

يعمل الاختباران في الوقت نفسه، كلٌّ في نافذته الخاصة. تعمل `browser.url()` و`$()` و`expect()` على نافذة الاختبار الذي يستدعيها.

### Cucumber

```ts title="wdio.conf.ts"
export const config: WebdriverIO.Config = {
    specs: ['./features/**/*.feature'],
    capabilities: [{
        browserName: 'chrome',
        'wdio:experimentalBiDiCommands': true
    }],
    framework: 'cucumber',
    cucumberOpts: {
        require: ['./features/step-definitions/**/*.ts'],
        parallelMode: 'contexts',
        maxParallelContexts: 4
    }
}
```

يعمل كل سيناريو من ملف الميزة (feature file) في نافذته الخاصة. تعمل الملفات الشخصية (`cucumberOpts.profiles` و`cucumberOpts.file`) والخيارات `tags` و`name` و`strict` و`dryRun` و`failFast` و`retry` و`retryTagFilter` كما في التشغيل التسلسلي.

## الخيارات

| الخيار | القيم | الافتراضي | الوصف |
| --- | --- | --- | --- |
| `parallelMode` | `'contexts'`، `'userContexts'` | غير مضبوط (تسلسلي) | يفعّل الوضع المتوازي ويحدد مقدار ما تتشاركه الاختبارات. |
| `maxParallelContexts` | رقم | `os.cpus().length` | عدد الاختبارات التي تعمل في الوقت نفسه. |

اضبط كليهما في `mochaOpts` أو في `cucumberOpts`.

يحدد `maxParallelContexts` عدد الخانات (slots). تشغّل كل خانة اختبارًا واحدًا في كل مرة، وتفتح النافذة لاختبارها التالي أثناء تشغيل الاختبار الحالي، وتغلق النافذة السابقة في الخلفية. لذلك قد يكون ما يصل إلى 3 × `maxParallelContexts` نافذة، إضافة إلى النافذة الأولى للجلسة، مفتوحًا لفترة قصيرة: إذ يمكن لكل خانة أن تحمل نافذة نشطة ونافذة مُجهّزة مسبقًا ونافذة قيد الإغلاق. لا يغلق الوضع المتوازي إلا النوافذ التي فتحها.

## الاختيار بين `contexts` و`userContexts`

| | `'contexts'` | `'userContexts'` |
| --- | --- | --- |
| نافذة لكل اختبار | نعم | نعم |
| ملفات تعريف الارتباط و`localStorage` وعمّال الخدمة (service workers) | مشتركة بين كل الاختبارات | معزولة لكل اختبار ([سياق المستخدم](https://w3c.github.io/webdriver-bidi/#user-context)) |
| تسجيل الدخول | مرة واحدة، إذا أعادت الاختبارات استخدام ملف تعريف ارتباط الجلسة | في كل اختبار |
| دعم برنامج التشغيل | أي متصفح يدعم BiDi | يحتاج إلى دعم `browser.createUserContext()`، وإلا يفشل التشغيل |

اختر `'contexts'` افتراضيًا. اختر `'userContexts'` عندما يجب ألا ترى الاختبارات ملفات تعريف الارتباط أو التخزين الخاصة ببعضها، مثل الاختبارات التي تسجّل الدخول بمستخدمين مختلفين. وكما في `'contexts'`، يعود `'userContexts'` إلى التشغيل التسلسلي مع تحذير عندما لا تكون الجلسة WebDriver BiDi أو عندما تكون `'wdio:experimentalBiDiCommands'` مفقودة من القدرات. إذا كان برنامج التشغيل لا يدعم `browser.createUserContext`، يفشل التشغيل بدلًا من العودة إلى الوضع التسلسلي.

تفتح `browser.newWindow()` النافذة في سياق المستخدم الافتراضي، لذا فإن النافذة المفتوحة بهذه الطريقة تقع خارج عزل ملفات تعريف الارتباط والتخزين الخاص بالاختبار.

## ما يملكه كل اختبار

داخل الاختبار المتوازي، تعمل هذه الأوامر على نافذة الاختبار الخاصة:

- التنقل: `url`، `back`، `forward`، `refresh`، `getUrl`، `getTitle`
- أوامر العناصر: `$`، `$$`، `shadow$`، `click`، `setValue`، `getText`، أوامر `waitFor*`، وغيرها
- `execute`، `actions`، `addInitScript`
- ملفات تعريف الارتباط: تستخدم `getCookies` و`setCookies` و`deleteCookies` قسم ملفات تعريف الارتباط الخاص بالاختبار
- `mock()`: المحاكاة التي تُنشأ في اختبار متوازٍ لا تعترض ولا تسجّل إلا طلبات نافذة ذلك الاختبار وإطاراتها، لذا يمكن لاختبارين محاكاة عنوان URL نفسه
- لقطات الشاشة: `saveScreenshot`، `takeElementScreenshot`

## الأوامر التي ترمي خطأً في الوضع المتوازي

بعض الأوامر تعمل على المتصفح بأكمله أو الجلسة بأكملها، لذا لا يمكنها استهداف نافذة اختبار واحد. داخل الاختبار المتوازي، ترمي هذه الأوامر خطأً بدلًا من التأثير في اختبار آخر:

| الأوامر | السبب | البديل |
| --- | --- | --- |
| `getWindowSize`، `setWindowSize` | نافذة نظام التشغيل مشتركة | استخدم `browser.setViewport()` لتحديد حجم صفحة الاختبار. تتشارك الاختبارات المتوازية نافذة نظام تشغيل واحدة |
| `throttleNetwork`، `throttleCPU` | تنطبق على المتصفح بأكمله | شغّل تلك الاختبارات بدون الوضع المتوازي |
| `closeWindow`، `switchToParentFrame` | تغيّر النافذة المركّز عليها، التي تتشاركها كل الاختبارات | أبقِ كل اختبار في نافذته الخاصة |
| `reloadSession`، `setTimeout` | تغيّر الجلسة التي تتشاركها كل الاختبارات | استدعها في الخطاف `before` في `wdio.conf.ts` |
| `acceptAlert`، `dismissAlert`، `getAlertText`، `sendAlertText` | التنبيهات تنتمي إلى سياق تصفح | استدعها على السياق الذي تُرجعه `browser.url()`: `const page = await browser.url('https://webdriver.io'); await page.acceptAlert()`. استخدم `page.acceptAlert(text)` بدلًا من `sendAlertText(text)`. تعمل `dismissAlert()` و`getAlertText()` على السياق أيضًا |
| `getComputedRole`، `getComputedLabel` | لا يستطيع WebDriver BiDi قراءتها | شغّل تلك الاختبارات بدون الوضع المتوازي |

أُزيل `switchWindow` لكل جلسات WebDriver BiDi في الإصدار v10، لا في الوضع المتوازي فقط. وهو يرمي الخطأ ``switchWindow` was removed for WebDriver BiDi sessions in WebdriverIO v10. Hold the browsing context returned by `browser.url()` or `browser.newWindow()`, or find one with `browser.browsingContexts()`.`` احتفظ بكائن السياق بدلًا من التبديل إليه.

يرفض WebdriverIO مربعات الحوار (prompts) تلقائيًا ما لم يكن هناك ما يستمع إلى حدث `dialog`، لذا سجّل مستمعًا (`browser.on('dialog', () => {})`) قبل أن ترد على مربع حوار من داخل اختبار.

كل أوامر WebDriver Classic الأخرى ترمي خطأً أيضًا. لا يُسمح إلا بـ `status` و`getTimeouts` و`getWindowHandles`. إذا عاد أحد أوامر WebdriverIO إلى WebDriver Classic في الوضع المتوازي دون أن تستدعي أمرًا من Classic، فيُرجى [الإبلاغ عن ذلك](https://github.com/webdriverio/webdriverio/issues/new/choose).

## الخطافات والمهلات

### Mocha

- تعمل `before()` و`after()` في ملف المواصفات **مرة واحدة لكل اختبار**، لا مرة واحدة لكل `describe`، لأن لكل اختبار نافذته الخاصة. يشغّل كل اختبار `before` و`beforeEach` والاختبار نفسه و`afterEach` و`after` في نافذته. ضع الإعداد الذي يجب أن يعمل مرة واحدة لكل ملف مواصفات في الخطافين `beforeSuite` / `afterSuite` في `wdio.conf.ts`. يعمل هذان مرة واحدة، خارج أي نافذة اختبار.
- لا ينطبق إلا `mochaOpts.timeout`. يرمي `this.timeout()` في اختبار أو خطاف خطأً، ويُتجاهل `it(...).timeout()` أو مهلة `describe` مع تحذير. راجع [مهلات Mocha وخطافات WebdriverIO](./Timeouts.md#mocha-timeouts-and-the-webdriverio-hooks).
- لا يُدعم `mochaOpts.bail` و`mochaOpts.retries` ويؤديان إلى فشل التشغيل. يرمي `this.retries()` خطأً.
- تعمل `.only()` و`this.skip()` و`grep` و`fgrep` و`invert` كما في التشغيل التسلسلي.

### Cucumber

- تعمل `BeforeAll` / `AfterAll` والخطافان `beforeFeature` / `afterFeature` في `wdio.conf.ts` مرة واحدة لكل عامل، لا مرة واحدة لكل ميزة. يتلقى `beforeFeature` / `afterFeature` الـ uri والميزة الخاصين بملف الميزة الأول فقط، وهذا مهم عندما يشغّل عامل واحد عدة ملفات ميزات، مثل المواصفات المجمّعة. تعمل خارج نافذة أي سيناريو، لذا يجب ألا تستخدم أوامر تحتاج إلى نافذة.
- تعمل `Before` / `After` و`BeforeStep` / `AfterStep` وخطافات السيناريو والخطوة في `wdio.conf.ts` لكل سيناريو، في نافذة ذلك السيناريو.
- القيمة الافتراضية لـ `cucumberOpts.strict` هي `false` في WebdriverIO. لا تؤدي الخطوة المعلّقة (pending) إلى فشل السيناريو إلا مع `strict: true`.

### كلا الإطارين

تُغلق نافذة الاختبار بمجرد انتهاء الاختبار. لا تبدأ مؤقتات أو وعودًا (promises) تستمر في العمل بعد انتهاء الاختبار.

## تغييرات سلوك أوامر عناصر BiDi

تستبدل `'wdio:experimentalBiDiCommands': true` تنفيذ عدة أوامر عناصر في كل اختبارات الجلسة، تسلسلية كانت أم متوازية:

- يرسل `addValue` و`clearValue` أحداث DOM اصطناعية، لا أحداث مفاتيح موثوقة.
- يتبع `getAttribute` قواعد WebDriver لقيم الخصائص والسمات.
- يُرسل `click` عبر Actions API.

شغّل مجموعة اختباراتك مرة واحدة مع القدرة وبدون `parallelMode` لاكتشاف الاختبارات التي تعتمد على سلوك Classic.

## المُبلِّغات (Reporters)

المُبلِّغات التي توسّع [`@wdio/reporter`](./CustomReporter.md) تُبلّغ عن الاختبارات المتوازية تحت المجموعة الصحيحة، وتربط كل أمر بالاختبار الذي أرسل سياقُ تصفحه ذلك الأمر.

لا يدعم `@wdio/allure-reporter` و`@wdio/junit-reporter` الوضع المتوازي بعد. فهما يتتبعان اختبارًا حاليًا واحدًا لكل عامل، لذا عندما تتداخل الاختبارات، قد تقع نتائج Allure وخطواته ومرفقاته، وخصائص JUnit وسجلات العامل، تحت الاختبار الخطأ. استخدمهما مع التشغيل التسلسلي. ومع `addConsoleLogs`، لا ينسب `@wdio/spec-reporter` مخرجات وحدة التحكم للاختبارات المتداخلة بشكل موثوق.

يجب ألا يفترض المُبلِّغ المخصص أن الاختبار ينتهي قبل أن يبدأ الاختبار التالي. راجع [المُبلِّغات والاختبارات المتوازية](./CustomReporter.md#reporters-and-parallel-tests).

## استكشاف الأخطاء وإصلاحها

### `parallelMode: "contexts" requires 'wdio:experimentalBiDiCommands': true to be set in capabilities`

أضف `'wdio:experimentalBiDiCommands': true` إلى القدرة. بدونها، تعمل الاختبارات واحدًا تلو الآخر. مع Cucumber، تكون الرسالة `Parallel mode (cucumberOpts.parallelMode: "contexts") requires "wdio:experimentalBiDiCommands" to be set in capabilities`.

### `... is set but the browser session does not support WebDriver Bidi`

تستخدم الجلسة WebDriver Classic. أزل `'wdio:enforceWebDriverClassic': true` من القدرة، أو استخدم متصفحًا وبرنامج تشغيل يدعمان WebDriver BiDi. مع Cucumber، تكون الرسالة `Parallel mode (cucumberOpts.parallelMode: "contexts") requires a WebDriver Bidi session. Falling back to sequential execution.`

### `parallelMode: "userContexts" requires browser.createUserContext and browser.removeUserContext, which this driver does not support`

لا يستطيع برنامج التشغيل إنشاء سياقات مستخدم. استخدم `parallelMode: 'contexts'` أو حدّث المتصفح وبرنامج التشغيل. مع Cucumber، تكون الرسالة `cucumberOpts.parallelMode "userContexts" requires browser.createUserContext, which this driver does not provide. Use a driver with BiDi user context support or set parallelMode to "contexts" (shares cookies and storage between scenarios).`

### `... is not supported inside parallel mode tests because ...` or `... is not supported in parallel mode`

استدعى الاختبار أمرًا من [الأوامر التي ترمي خطأً في الوضع المتوازي](#commands-that-throw-in-parallel-mode). استخدم البديل الموجود في الجدول.

### `bail is not supported in parallel mode` / `retries is not supported in parallel mode`

أزل `mochaOpts.bail` أو `mochaOpts.retries`، أو شغّل ملف المواصفات بدون `parallelMode`.

### `Suite-level hooks (before()/after()) run once per test in parallel mode`

يحتوي ملف المواصفات على خطافات `before()` أو `after()`. وهي تعمل لكل اختبار. انقل الإعداد الذي يجب أن يعمل مرة واحدة فقط إلى `beforeSuite` / `afterSuite` في `wdio.conf.ts`.

## صفحات ذات صلة

- [تنظيم مجموعات الاختبار](./OrganizingTestSuites.md): شغّل ملفات المواصفات بالتوازي باستخدام `maxInstances`
- [التقسيم (Sharding)](./Sharding.md): وزّع مجموعة الاختبارات على عدة أجهزة
- [الأطر](./Frameworks.md): كل خيارات Mocha وCucumber
- [بروتوكولات الأتمتة](./AutomationProtocols.md): WebDriver BiDi وWebDriver Classic