---
id: runner
title: المشغّل
description: "اختر بين المشغّل المحلي ومشغّل المتصفح، وقم بتهيئة خيارات مشغّل المتصفح مثل الإعدادات المسبقة وتهيئة Vite والتغطية."
---

import CodeBlock from '@theme/CodeBlock';

ينظّم المشغّل (runner) في WebdriverIO كيفية تشغيل الاختبارات ومكان تشغيلها عند استخدام مشغّل الاختبارات (testrunner). يدعم WebdriverIO حاليًا نوعين مختلفين من المشغّلات: المشغّل المحلي ومشغّل المتصفح.

## المشغّل المحلي

يقوم [المشغّل المحلي](https://www.npmjs.com/package/@wdio/local-runner) بتهيئة إطار العمل الخاص بك (مثل Mocha أو Jasmine أو Cucumber) داخل عملية عامل (worker process) ويشغّل جميع ملفات الاختبار ضمن بيئة Node.js الخاصة بك. يتم تشغيل كل ملف اختبار في عملية عامل منفصلة لكل قدرة (capability) مما يتيح أقصى قدر من التزامن. تستخدم كل عملية عامل نسخة متصفح واحدة، وبالتالي تشغّل جلسة المتصفح الخاصة بها مما يتيح أقصى قدر من العزل.

نظرًا لأن كل اختبار يعمل في عمليته المعزولة الخاصة، فلا يمكن مشاركة البيانات بين ملفات الاختبار. هناك طريقتان للتغلب على ذلك:

- استخدام [`@wdio/shared-store-service`](https://www.npmjs.com/package/@wdio/shared-store-service) لمشاركة البيانات بين جميع العمّال
- تجميع ملفات المواصفات (اقرأ المزيد في [تنظيم مجموعة الاختبارات](https://webdriver.io/docs/organizingsuites#grouping-test-specs-to-run-sequentially))

إذا لم يتم تحديد أي شيء آخر في `wdio.conf.js` فإن المشغّل المحلي هو المشغّل الافتراضي في WebdriverIO.

### التثبيت

لاستخدام المشغّل المحلي يمكنك تثبيته عبر:

```sh
npm install --save-dev @wdio/local-runner
```

### الإعداد

المشغّل المحلي هو المشغّل الافتراضي في WebdriverIO لذا لا حاجة لتعريفه داخل ملف `wdio.conf.js` الخاص بك. إذا كنت تريد تعيينه بشكل صريح، يمكنك تعريفه كما يلي:

```js
// wdio.conf.js
export const {
    // ...
    runner: 'local',
    // ...
}
```

## مشغّل المتصفح

على عكس [المشغّل المحلي](https://www.npmjs.com/package/@wdio/local-runner)، يقوم [مشغّل المتصفح](https://www.npmjs.com/package/@wdio/browser-runner) بتهيئة إطار العمل وتنفيذه داخل المتصفح. يتيح لك ذلك تشغيل اختبارات الوحدة أو اختبارات المكوّنات في متصفح حقيقي بدلاً من JSDOM كما تفعل العديد من أطر الاختبار الأخرى. تعمل حزمة الاختبار على Chrome 90 وEdge 90 وFirefox 90 وSafari 14.1 أو أحدث. راجع [دعم المتصفحات](/docs/component-testing#browser-support).

على الرغم من أن [JSDOM](https://www.npmjs.com/package/jsdom) يُستخدم على نطاق واسع لأغراض الاختبار، إلا أنه في النهاية ليس متصفحًا حقيقيًا ولا يمكنك محاكاة بيئات الأجهزة المحمولة باستخدامه. مع هذا المشغّل، يمكّنك WebdriverIO من تشغيل اختباراتك بسهولة في المتصفح واستخدام أوامر WebDriver للتفاعل مع العناصر المعروضة على الصفحة.

فيما يلي نظرة عامة على تشغيل الاختبارات داخل JSDOM مقابل مشغّل المتصفح في WebdriverIO

| | JSDOM | مشغّل المتصفح في WebdriverIO |
|-|-------|----------------------------|
|1.| يشغّل اختباراتك داخل Node.js باستخدام إعادة تنفيذ لمعايير الويب، لا سيما معايير WHATWG DOM وHTML | ينفّذ اختبارك في متصفح حقيقي ويشغّل الشيفرة في بيئة يستخدمها مستخدموك |
|2.| لا يمكن محاكاة التفاعلات مع المكوّنات إلا عبر JavaScript | يمكنك استخدام [واجهة برمجة WebdriverIO](api) للتفاعل مع العناصر عبر بروتوكول WebDriver |
|3.| يتطلب دعم Canvas [تبعيات إضافية](https://www.npmjs.com/package/canvas) و[له قيود](https://github.com/Automattic/node-canvas/issues) | لديك وصول إلى [واجهة Canvas API](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API) الحقيقية |
|4.| لدى JSDOM بعض [التحفظات](https://github.com/jsdom/jsdom#caveats) وواجهات Web API غير مدعومة | جميع واجهات Web API مدعومة لأن الاختبار يعمل في متصفح حقيقي |
|5.| من المستحيل اكتشاف الأخطاء عبر المتصفحات المختلفة | دعم جميع المتصفحات بما في ذلك متصفحات الأجهزة المحمولة |
|6.| __لا__ يمكن اختبار الحالات الزائفة للعناصر | دعم الحالات الزائفة مثل `:hover` أو `:active` |

يستخدم هذا المشغّل [Vite](https://vitejs.dev/) لتجميع شيفرة الاختبار الخاصة بك وتحميلها في المتصفح. ويأتي مع إعدادات مسبقة لأطر المكوّنات التالية:

- React
- Preact
- Vue.js
- Svelte
- SolidJS
- Stencil

يعمل كل ملف اختبار / مجموعة ملفات اختبار داخل صفحة واحدة، مما يعني أنه يتم إعادة تحميل الصفحة بين كل اختبار وآخر لضمان العزل بين الاختبارات.

### التثبيت

لاستخدام مشغّل المتصفح يمكنك تثبيته عبر:

```sh
npm install --save-dev @wdio/browser-runner
```

### الإعداد

لاستخدام مشغّل المتصفح، يجب عليك تعريف خاصية `runner` داخل ملف `wdio.conf.js` الخاص بك، على سبيل المثال:

```js
// wdio.conf.js
export const {
    // ...
    runner: 'browser',
    // ...
}
```

### خيارات المشغّل

يتيح مشغّل المتصفح التهيئات التالية:

#### `preset`

إذا كنت تختبر المكوّنات باستخدام أحد الأطر المذكورة أعلاه، يمكنك تحديد إعداد مسبق يضمن تهيئة كل شيء بشكل جاهز. لا يمكن استخدام هذا الخيار مع `viteConfig`.

__النوع:__ `vue` | `svelte` | `solid` | `react` | `preact` | `stencil`<br />
__مثال:__

```js title="wdio.conf.js"
export const {
    // ...
    runner: ['browser', {
        preset: 'svelte'
    }],
    // ...
}
```

#### `viteConfig`

حدّد [تهيئة Vite](https://vitejs.dev/config/) الخاصة بك. يمكنك إما تمرير كائن مخصص أو استيراد ملف `vite.conf.ts` موجود إذا كنت تستخدم Vite.js للتطوير. لاحظ أن WebdriverIO يحتفظ بتهيئات Vite المخصصة لإعداد بيئة الاختبار.

__النوع:__ `string` أو [`UserConfig`](https://github.com/vitejs/vite/blob/52e64eb43287d241f3fd547c332e16bd9e301e95/packages/vite/src/node/config.ts#L119-L272) أو `(env: ConfigEnv) => UserConfig | Promise<UserConfig>`<br />
__مثال:__

```js title="wdio.conf.ts"
import viteConfig from '../vite.config.ts'

export const {
    // ...
    runner: ['browser', { viteConfig }],
    // أو ببساطة:
    runner: ['browser', { viteConfig: '../vites.config.ts' }],
    // أو استخدم دالة إذا كانت تهيئة vite تحتوي على الكثير من الإضافات
    // التي تريد حلّها فقط عند قراءة القيمة
    runner: ['browser', {
        viteConfig: () => ({
            // ...
        })
    }],
    // ...
}
```

#### `headless`

إذا تم تعيينه إلى `true` فسيقوم المشغّل بتحديث القدرات لتشغيل الاختبارات بدون واجهة (headless). يكون هذا مفعّلاً افتراضيًا داخل بيئات CI حيث يتم تعيين متغير البيئة `CI` إلى `'1'` أو `'true'`.

__النوع:__ `boolean`<br />
__الافتراضي:__ `false`، ويُعيَّن إلى `true` إذا تم تعيين متغير البيئة `CI`

#### `rootDir`

الدليل الجذري للمشروع.

__النوع:__ `string`<br />
__الافتراضي:__ `process.cwd()`

#### `coverage`

يدعم WebdriverIO تقارير تغطية الاختبار عبر [`istanbul`](https://istanbul.js.org/). راجع [خيارات التغطية](#coverage-options) لمزيد من التفاصيل.

__النوع:__ `object`<br />
__الافتراضي:__ `undefined`

### خيارات التغطية

تتيح الخيارات التالية تهيئة تقارير التغطية.

#### `enabled`

يفعّل جمع بيانات التغطية.

__النوع:__ `boolean`<br />
__الافتراضي:__ `false`

#### `include`

قائمة الملفات المضمّنة في التغطية كأنماط glob.

__النوع:__ `string[]`<br />
__الافتراضي:__ `[**]`

#### `exclude`

قائمة الملفات المستبعدة من التغطية كأنماط glob.

__النوع:__ `string[]`<br />
__الافتراضي:__

```
[
  'coverage/**',
  'dist/**',
  'packages/*/test{,s}/**',
  '**/*.d.ts',
  'cypress/**',
  'test{,s}/**',
  'test{,-*}.{js,cjs,mjs,ts,tsx,jsx}',
  '**/*{.,-}test.{js,cjs,mjs,ts,tsx,jsx}',
  '**/*{.,-}spec.{js,cjs,mjs,ts,tsx,jsx}',
  '**/__tests__/**',
  '**/{karma,rollup,webpack,vite,vitest,jest,ava,babel,nyc,cypress,tsup,build}.config.*',
  '**/.{eslint,mocha,prettier}rc.{js,cjs,yml}',
]
```

#### `extension`

قائمة امتدادات الملفات التي يجب أن يتضمنها التقرير.

__النوع:__ `string | string[]`<br />
__الافتراضي:__ `['.js', '.cjs', '.mjs', '.ts', '.mts', '.cts', '.tsx', '.jsx', '.vue', '.svelte']`

#### `reportsDirectory`

الدليل الذي سيُكتب فيه تقرير التغطية.

__النوع:__ `string`<br />
__الافتراضي:__ `./coverage`

#### `reporter`

مُعِدّو تقارير التغطية المراد استخدامهم. راجع [توثيق istanbul](https://istanbul.js.org/docs/advanced/alternative-reporters/) للاطلاع على قائمة مفصلة بجميع مُعِدّي التقارير.

__النوع:__ `string[]`<br />
__الافتراضي:__ `['text', 'html', 'clover', 'json-summary']`

#### `perFile`

التحقق من العتبات لكل ملف. راجع `lines` و`functions` و`branches` و`statements` للاطلاع على العتبات الفعلية.

__النوع:__ `boolean`<br />
__الافتراضي:__ `false`

#### `clean`

تنظيف نتائج التغطية قبل تشغيل الاختبارات.

__النوع:__ `boolean`<br />
__الافتراضي:__ `true`

#### `lines`

العتبة الخاصة بالأسطر.

__النوع:__ `number`<br />
__الافتراضي:__ `undefined`

#### `functions`

العتبة الخاصة بالدوال.

__النوع:__ `number`<br />
__الافتراضي:__ `undefined`

#### `branches`

العتبة الخاصة بالفروع.

__النوع:__ `number`<br />
__الافتراضي:__ `undefined`

#### `statements`

العتبة الخاصة بالتعليمات.

__النوع:__ `number`<br />
__الافتراضي:__ `undefined`

### القيود

عند استخدام مشغّل المتصفح في WebdriverIO، من المهم ملاحظة أن مربعات الحوار التي تحجب الخيط (thread) مثل `alert` أو `confirm` لا يمكن استخدامها بشكل أصلي. وذلك لأنها تحجب صفحة الويب، مما يعني أن WebdriverIO لا يمكنه مواصلة التواصل مع الصفحة، مما يتسبب في توقف التنفيذ.

في مثل هذه الحالات، يوفر WebdriverIO محاكاة افتراضية (mocks) بقيم مُرجعة افتراضية لهذه الواجهات. يضمن ذلك عدم توقف التنفيذ إذا استخدم المستخدم عن طريق الخطأ واجهات الويب للنوافذ المنبثقة المتزامنة. ومع ذلك، لا يزال يُوصى بأن يقوم المستخدم بمحاكاة هذه الواجهات للحصول على تجربة أفضل. اقرأ المزيد في [المحاكاة](/docs/component-testing/mocking).

### أمثلة

تأكد من الاطلاع على التوثيق المتعلق بـ[اختبار المكوّنات](https://webdriver.io/docs/component-testing) وإلقاء نظرة على [مستودع الأمثلة](https://github.com/webdriverio/component-testing-examples) للحصول على أمثلة تستخدم هذه الأطر وأطرًا أخرى متنوعة.