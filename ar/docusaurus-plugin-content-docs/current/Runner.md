---
id: runner
title: المُشغّل
---

import CodeBlock from '@theme/CodeBlock';

المُشغّل في WebdriverIO ينظم كيف وأين يتم تشغيل الاختبارات عند استخدام مشغّل الاختبار. يدعم WebdriverIO حاليًا نوعين مختلفين من المشغلات: المشغّل المحلي ومشغّل المتصفح.

## المشغّل المحلي

يبدأ [المشغّل المحلي](https://www.npmjs.com/package/@wdio/local-runner) إطار العمل الخاص بك (مثل Mocha أو Jasmine أو Cucumber) ضمن عملية عامل ويشغّل جميع ملفات الاختبار الخاصة بك في بيئة Node.js. يتم تشغيل كل ملف اختبار في عملية عامل منفصلة لكل قدرة مما يسمح بأقصى قدر من التزامن. تستخدم كل عملية عامل نسخة واحدة من المتصفح وبالتالي تدير جلسة المتصفح الخاصة بها مما يسمح بأقصى قدر من العزل.

نظرًا لأن كل اختبار يتم تشغيله في عملية معزولة خاصة به، فإنه من غير الممكن مشاركة البيانات عبر ملفات الاختبار. هناك طريقتان للتغلب على هذا:

- استخدم [`@wdio/shared-store-service`](https://www.npmjs.com/package/@wdio/shared-store-service) لمشاركة البيانات عبر جميع العمال
- تجميع ملفات المواصفات (اقرأ المزيد في [تنظيم مجموعة الاختبار](https://webdriver.io/docs/organizingsuites#grouping-test-specs-to-run-sequentially))

إذا لم يتم تحديد أي شيء آخر في ملف `wdio.conf.js`، فإن المشغّل المحلي هو المشغّل الافتراضي في WebdriverIO.

### التثبيت

لاستخدام المشغّل المحلي، يمكنك تثبيته عبر:

```sh
npm install --save-dev @wdio/local-runner
```

### الإعداد

المشغّل المحلي هو المشغّل الافتراضي في WebdriverIO لذا لا داعي لتحديده ضمن ملف `wdio.conf.js`. إذا كنت ترغب في تعيينه بشكل صريح، يمكنك تعريفه على النحو التالي:

```js
// wdio.conf.js
export const {
    // ...
    runner: 'local',
    // ...
}
```

## مشغّل المتصفح

على عكس [المشغّل المحلي](https://www.npmjs.com/package/@wdio/local-runner)، فإن [مشغّل المتصفح](https://www.npmjs.com/package/@wdio/browser-runner) يبدأ وينفذ الإطار داخل المتصفح. هذا يسمح لك بتشغيل اختبارات الوحدة أو اختبارات المكونات في متصفح حقيقي بدلاً من JSDOM مثل العديد من أطر الاختبار الأخرى.

في حين أن [JSDOM](https://www.npmjs.com/package/jsdom) يستخدم على نطاق واسع لأغراض الاختبار، إلا أنه في النهاية ليس متصفحًا حقيقيًا ولا يمكنك محاكاة بيئات الجوال معه. باستخدام هذا المشغّل، يتيح لك WebdriverIO تشغيل اختباراتك في المتصفح بسهولة واستخدام أوامر WebDriver للتفاعل مع العناصر المعروضة على الصفحة.

فيما يلي نظرة عامة على تشغيل الاختبارات داخل JSDOM مقابل مشغّل المتصفح WebdriverIO

| | JSDOM | مشغّل متصفح WebdriverIO |
|-|-------|----------------------------|
|1.| يشغّل اختباراتك داخل Node.js باستخدام إعادة تنفيذ معايير الويب، وخاصة WHATWG DOM ومعايير HTML | ينفذ اختبارك في متصفح حقيقي ويشغّل الكود في بيئة يستخدمها المستخدمون |
|2.| يمكن فقط محاكاة التفاعلات مع المكونات عبر JavaScript | يمكنك استخدام [واجهة برمجة تطبيقات WebdriverIO](api) للتفاعل مع العناصر من خلال بروتوكول WebDriver |
|3.| دعم Canvas يتطلب [تبعيات إضافية](https://www.npmjs.com/package/canvas) و[له قيود](https://github.com/Automattic/node-canvas/issues) | لديك وصول إلى [واجهة برمجة تطبيقات Canvas](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API) الحقيقية |
|4.| لدى JSDOM بعض [الملاحظات](https://github.com/jsdom/jsdom#caveats) وواجهات برمجة الويب غير المدعومة | جميع واجهات برمجة الويب مدعومة لأن الاختبار يتم في متصفح حقيقي |
|5.| من المستحيل اكتشاف الأخطاء عبر المتصفحات المختلفة | دعم لجميع المتصفحات بما في ذلك متصفحات الجوال |
|6.| __لا يمكن__ اختبار حالات العناصر الزائفة | دعم للحالات الزائفة مثل `:hover` أو `:active` |

يستخدم هذا المشغّل [Vite](https://vitejs.dev/) لتجميع كود الاختبار الخاص بك وتحميله في المتصفح. ويأتي مع إعدادات مسبقة لأطر عمل المكونات التالية:

- React
- Preact
- Vue.js
- Svelte
- SolidJS
- Stencil

يتم تشغيل كل ملف اختبار / مجموعة ملفات اختبار داخل صفحة واحدة، مما يعني أنه بين كل اختبار يتم إعادة تحميل الصفحة لضمان العزل بين الاختبارات.

### التثبيت

لاستخدام مشغّل المتصفح يمكنك تثبيته عبر:

```sh
npm install --save-dev @wdio/browser-runner
```

### الإعداد

لاستخدام مشغّل المتصفح، يجب عليك تحديد خاصية `runner` داخل ملف `wdio.conf.js` الخاص بك، على سبيل المثال:

```js
// wdio.conf.js
export const {
    // ...
    runner: 'browser',
    // ...
}
```

### خيارات المشغّل

يسمح مشغّل المتصفح بالتكوينات التالية:

#### `preset`

إذا كنت تختبر مكونات باستخدام إحدى الأطر المذكورة أعلاه، يمكنك تحديد إعداد مسبق يضمن تكوين كل شيء من البداية. لا يمكن استخدام هذا الخيار مع `viteConfig`.

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

حدد [تكوين Vite](https://vitejs.dev/config/) الخاص بك. يمكنك إما تمرير كائن مخصص أو استيراد ملف `vite.conf.ts` موجود إذا كنت تستخدم Vite.js للتطوير. لاحظ أن WebdriverIO يحتفظ بتكوينات Vite المخصصة لإعداد بيئة الاختبار.

__النوع:__ `string` أو [`UserConfig`](https://github.com/vitejs/vite/blob/52e64eb43287d241f3fd547c332e16bd9e301e95/packages/vite/src/node/config.ts#L119-L272) أو `(env: ConfigEnv) => UserConfig | Promise<UserConfig>`<br />
__مثال:__

```js title="wdio.conf.ts"
import viteConfig from '../vite.config.ts'

export const {
    // ...
    runner: ['browser', { viteConfig }],
    // or just:
    runner: ['browser', { viteConfig: '../vites.config.ts' }],
    // or use a function if your vite config contains a lot of plugins
    // which you only want to resolve when value is read
    runner: ['browser', {
        viteConfig: () => ({
            // ...
        })
    }],
    // ...
}
```

#### `headless`

إذا تم تعيينه إلى `true`، سيقوم المشغّل بتحديث القدرات لتشغيل الاختبارات بدون واجهة. بشكل افتراضي، يتم تمكين هذا في بيئات CI حيث يتم تعيين متغير بيئة `CI` إلى `'1'` أو `'true'`.

__النوع:__ `boolean`<br />
__الافتراضي:__ `false`، يتم تعيينه إلى `true` إذا تم تعيين متغير البيئة `CI`

#### `rootDir`

دليل جذر المشروع.

__النوع:__ `string`<br />
__الافتراضي:__ `process.cwd()`

#### `coverage`

يدعم WebdriverIO تقارير تغطية الاختبار من خلال [`istanbul`](https://istanbul.js.org/). انظر [خيارات التغطية](#خيارات-التغطية) لمزيد من التفاصيل.

__النوع:__ `object`<br />
__الافتراضي:__ `undefined`

### خيارات التغطية

تسمح الخيارات التالية بتكوين تقارير التغطية.

#### `enabled`

يمكّن جمع التغطية.

__النوع:__ `boolean`<br />
__الافتراضي:__ `false`

#### `include`

قائمة الملفات المضمنة في التغطية كأنماط شاملة.

__النوع:__ `string[]`<br />
__الافتراضي:__ `[**]`

#### `exclude`

قائمة الملفات المستبعدة من التغطية كأنماط شاملة.

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

الدليل لكتابة تقرير التغطية إليه.

__النوع:__ `string`<br />
__الافتراضي:__ `./coverage`

#### `reporter`

مراسلي التغطية لاستخدامها. راجع [وثائق istanbul](https://istanbul.js.org/docs/advanced/alternative-reporters/) للحصول على قائمة مفصلة بجميع المراسلين.

__النوع:__ `string[]`<br />
__الافتراضي:__ `['text', 'html', 'clover', 'json-summary']`

#### `perFile`

التحقق من الحدود لكل ملف. انظر `lines` و `functions` و `branches` و `statements` للحدود الفعلية.

__النوع:__ `boolean`<br />
__الافتراضي:__ `false`

#### `clean`

تنظيف نتائج التغطية قبل تشغيل الاختبارات.

__النوع:__ `boolean`<br />
__الافتراضي:__ `true`

#### `lines`

حد للسطور.

__النوع:__ `number`<br />
__الافتراضي:__ `undefined`

#### `functions`

حد للوظائف.

__النوع:__ `number`<br />
__الافتراضي:__ `undefined`

#### `branches`

حد للفروع.

__النوع:__ `number`<br />
__الافتراضي:__ `undefined`

#### `statements`

حد للبيانات.

__النوع:__ `number`<br />
__الافتراضي:__ `undefined`

### القيود

عند استخدام مشغّل متصفح WebdriverIO، من المهم ملاحظة أنه لا يمكن استخدام مربعات الحوار التي تحظر المؤشر مثل `alert` أو `confirm` بشكل أصلي. هذا لأنها تحظر صفحة الويب، مما يعني أن WebdriverIO لا يمكنه الاستمرار في التواصل مع الصفحة، مما يتسبب في تعليق التنفيذ.

في مثل هذه الحالات، يوفر WebdriverIO نماذج محاكاة افتراضية بقيم عائدة افتراضية لواجهات برمجة التطبيقات هذه. هذا يضمن أنه إذا استخدم المستخدم عن طريق الخطأ واجهات برمجة تطبيقات الويب المتزامنة للنوافذ المنبثقة، فلن يتوقف التنفيذ. ومع ذلك، لا يزال يُنصح المستخدم بمحاكاة واجهات برمجة تطبيقات الويب هذه للحصول على تجربة أفضل. اقرأ المزيد في [المحاكاة](/docs/component-testing/mocking).

### أمثلة

تأكد من الاطلاع على المستندات حول [اختبار المكونات](https://webdriver.io/docs/component-testing) وإلقاء نظرة على [مستودع الأمثلة](https://github.com/webdriverio/component-testing-examples) للحصول على أمثلة باستخدام هذه الأطر وأطر أخرى متنوعة.